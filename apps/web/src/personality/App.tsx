import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Shell } from '../shared/shell/Shell';
import { drawRadar, type BarItem } from './lib/charts';
import { PDFExport } from './lib/pdf';
import { computeAll, type Answers, type PersonalityResult } from './lib/scoring';
import { PersonalityStorage } from './lib/storage';
import type { PersonalityTestData } from './data/types';
import './styles.css';

type View = 'home' | 'test' | 'result';

function BarList({ items }: { items: BarItem[] }) {
  return (
    <div className="bars">
      {items.map((item) => (
        <div className="bar-row" key={item.label}>
          <span className="bar-label">{item.label}</span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ width: `${item.value}%`, background: item.color || '#6366f1' }}
            />
          </div>
          <span className="bar-value">{item.value}%</span>
        </div>
      ))}
    </div>
  );
}

function Radar({ labels, values }: { labels: string[]; values: number[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) drawRadar(ref.current, labels, values);
  }, [labels, values]);
  return <canvas ref={ref} width={280} height={280} />;
}

export function PersonalityApp() {
  const [dataset, setDataset] = useState<PersonalityTestData | null>(null);
  const [loadError, setLoadError] = useState('');
  const [view, setView] = useState<View>('home');
  const [mode, setMode] = useState<'full' | 'quick'>('full');
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<PersonalityResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('./data/questions')
      .then((mod) => {
        if (!cancelled) setDataset(mod.PERSONALITY_TEST);
      })
      .catch(() => {
        if (!cancelled) setLoadError('题库加载失败，请刷新重试。');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeQuestions = useMemo(() => {
    if (!dataset) return [];
    if (mode === 'quick') return dataset.questions.filter((q) => dataset.quickModules.includes(q.module));
    return dataset.questions;
  }, [dataset, mode]);

  const persistView = useCallback(
    (nextView: View, nextAnswers = answers, nextIndex = currentIndex, nextMode = mode) => {
      PersonalityStorage.saveProgress(nextAnswers, nextMode, nextIndex, nextView);
      setView(nextView);
    },
    [answers, currentIndex, mode]
  );

  useEffect(() => {
    if (!dataset) return;
    const saved = PersonalityStorage.load();
    if (saved?.view === 'result' && saved.result) {
      setResult(saved.result);
      setAnswers(saved.answers || {});
      setMode(saved.mode || 'full');
      setView('result');
    } else if (saved?.view === 'test' && saved.answers) {
      setMode(saved.mode || 'full');
      setAnswers(saved.answers);
      setCurrentIndex(saved.currentIndex || 0);
      setView('test');
    }
  }, [dataset]);

  const saved = PersonalityStorage.load();
  const answeredCount = saved?.answers ? Object.keys(saved.answers).length : 0;

  function startTest(resume: boolean) {
    if (!dataset) return;
    const qs = mode === 'quick'
      ? dataset.questions.filter((q) => dataset.quickModules.includes(q.module))
      : dataset.questions;
    if (resume) {
      const data = PersonalityStorage.load();
      if (data && data.mode === mode && data.answers) {
        setAnswers(data.answers);
        setCurrentIndex(Math.min(data.currentIndex || 0, qs.length - 1));
        if (data.result && Object.keys(data.answers).length >= qs.length * 0.95) {
          setResult(data.result);
          persistView('result', data.answers, 0, mode);
          return;
        }
      } else {
        setAnswers({});
        setCurrentIndex(0);
      }
    } else {
      setAnswers({});
      setCurrentIndex(0);
      setResult(null);
    }
    persistView('test', resume ? (PersonalityStorage.load()?.answers || {}) : {}, resume ? (PersonalityStorage.load()?.currentIndex || 0) : 0);
  }

  function onAnswer(value: number) {
    const q = activeQuestions[currentIndex];
    if (!q) return;
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    PersonalityStorage.saveProgress(next, mode, currentIndex, 'test');
  }

  function nextQuestion() {
    const q = activeQuestions[currentIndex];
    if (!q) return;
    if (!answers[q.id]) {
      window.alert('请选择一个选项');
      return;
    }
    if (currentIndex < activeQuestions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      PersonalityStorage.saveProgress(answers, mode, nextIndex, 'test');
    } else {
      finishTest();
    }
  }

  function finishTest() {
    const unanswered = activeQuestions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      if (!window.confirm(`还有 ${unanswered.length} 题未作答，是否仍要提交？`)) return;
    }
    const computed = computeAll(activeQuestions, answers);
    setResult(computed);
    PersonalityStorage.saveResult(computed, answers, mode);
    setView('result');
  }

  async function onImport(file: File) {
    try {
      const data = await PersonalityStorage.importJSON(file);
      if (data.result) {
        setResult(data.result);
        setAnswers(data.answers || {});
        setMode(data.mode || 'full');
        setView('result');
      } else {
        window.alert('备份已导入');
      }
    } catch {
      window.alert('导入失败，请检查文件格式');
    }
  }

  function copyMarkdown() {
    if (!result || !dataset) return;
    const t = dataset.interpretations.mbti[result.mbti.type];
    const md = `# 人格测评结果\n\n- **类型**: ${result.fullType} (${t?.name || ''})\n- **九型**: ${result.ennea.wingLabel}\n- **DISC**: ${result.disc.primary}/${result.disc.secondary}\n- **霍兰德**: ${result.riasec.code}\n- **A/T**: ${result.at.label}\n\n## MBTI\n- E ${result.mbti.dimensions.EI.pctA}% / I ${result.mbti.dimensions.EI.pctB}%\n- S ${result.mbti.dimensions.SN.pctA}% / N ${result.mbti.dimensions.SN.pctB}%\n- T ${result.mbti.dimensions.TF.pctA}% / F ${result.mbti.dimensions.TF.pctB}%\n- J ${result.mbti.dimensions.JP.pctA}% / P ${result.mbti.dimensions.JP.pctB}%\n\n${t?.summary || ''}\n`;
    navigator.clipboard.writeText(md).then(() => window.alert('已复制到剪贴板'));
  }

  const q = activeQuestions[currentIndex];
  const mod = dataset && q ? dataset.modules.find((m) => m.id === q.module) : null;

  return (
    <Shell>
      <div id="app">
        {loadError ? <p className="hint">{loadError}</p> : null}

        {view === 'home' ? (
          <section className="view active">
            <header className="hero">
              <h1>多维度人格测评</h1>
              <p className="subtitle">五档 Likert · 7 大体系 · 约 220 题 · 90–120 分钟</p>
            </header>
            <div className="card-grid">
              <div className="card">
                <h2>测评模块</h2>
                <ul>
                  {(dataset?.modules || []).map((m) => (
                    <li key={m.id}>
                      <strong>{m.name}</strong>
                      <span>
                        {m.desc} · {(dataset?.questions.filter((item) => item.module === m.id).length) || m.count} 题
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card actions-card">
                <h2>开始测试</h2>
                <label className="mode-toggle">
                  <input type="radio" name="mode" value="full" checked={mode === 'full'} onChange={() => setMode('full')} />
                  完整版（7 模块 · ~220 题）
                </label>
                <label className="mode-toggle">
                  <input type="radio" name="mode" value="quick" checked={mode === 'quick'} onChange={() => setMode('quick')} />
                  快速版（16型 + 大五 · ~115 题）
                </label>
                <div className="btn-row">
                  <button className="btn primary" type="button" disabled={!dataset} onClick={() => startTest(true)}>
                    开始测试
                  </button>
                  <button
                    className="btn secondary"
                    type="button"
                    disabled={!dataset}
                    onClick={() => dataset && PDFExport.downloadQuestionnaire(dataset.questions, dataset.modules)}
                  >
                    下载题本 PDF
                  </button>
                </div>
                <hr />
                <h3>本地数据</h3>
                <div className="btn-row">
                  <button className="btn secondary" type="button" onClick={() => { if (!PersonalityStorage.exportJSON()) window.alert('暂无保存记录'); }}>
                    导出 JSON 备份
                  </button>
                  <label className="btn secondary file-btn">
                    导入备份
                    <input
                      type="file"
                      accept=".json"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void onImport(file);
                        e.target.value = '';
                      }}
                    />
                  </label>
                  <button
                    className="btn ghost"
                    type="button"
                    onClick={() => {
                      if (window.confirm('确定清除所有本地记录？')) {
                        PersonalityStorage.clear();
                        setAnswers({});
                        setResult(null);
                        setCurrentIndex(0);
                      }
                    }}
                  >
                    清除记录
                  </button>
                </div>
                {answeredCount > 0 ? (
                  <p className="hint">检测到未完成记录（{answeredCount} 题已答），点击「开始测试」将继续。</p>
                ) : null}
              </div>
            </div>
            <footer className="disclaimer">
              <p>本测评为自研倾向工具，基于 Jung 类型理论等公开框架，<strong>非 MBTI® 官方产品</strong>。结果仅供参考，不能替代专业心理咨询。</p>
            </footer>
          </section>
        ) : null}

        {view === 'test' && q && dataset ? (
          <section className="view active">
            <header className="test-header">
              <button className="btn ghost" type="button" onClick={() => persistView('home')}>← 返回</button>
              <div className="progress-wrap">
                <div className="progress-bar">
                  <div id="progress-fill" style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }} />
                </div>
                <span id="progress-text">{currentIndex + 1} / {activeQuestions.length}</span>
              </div>
              <span className="badge">{mod ? mod.name : q.module}</span>
            </header>
            <div className="question-card">
              <p className="q-num">第 {currentIndex + 1} / {activeQuestions.length} 题</p>
              <h2 id="question-text">{q.text}</h2>
              <div className="likert">
                {dataset.likertLabels.map((label, i) => {
                  const val = i + 1;
                  const checked = answers[q.id] === val;
                  return (
                    <label key={val} className={`likert-opt${checked ? ' checked' : ''}`}>
                      <input type="radio" name="answer" value={val} checked={checked} onChange={() => onAnswer(val)} />
                      <span className="num">{val}</span>
                      <span className="lbl">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="nav-row">
              <button className="btn secondary" type="button" disabled={currentIndex === 0} onClick={() => {
                const nextIndex = currentIndex - 1;
                setCurrentIndex(nextIndex);
                PersonalityStorage.saveProgress(answers, mode, nextIndex, 'test');
              }}>
                上一题
              </button>
              <button className="btn primary" type="button" onClick={nextQuestion}>
                {currentIndex === activeQuestions.length - 1 ? '查看结果' : '下一题'}
              </button>
            </div>
          </section>
        ) : null}

        {view === 'result' && result && dataset ? (
          <ResultView
            result={result}
            dataset={dataset}
            onPdf={() => PDFExport.downloadResult(result, dataset.interpretations)}
            onCopy={copyMarkdown}
            onExport={() => PersonalityStorage.exportJSON()}
            onRetest={() => {
              PersonalityStorage.clear();
              setAnswers({});
              setResult(null);
              setCurrentIndex(0);
              persistView('test', {}, 0);
            }}
            onHome={() => persistView('home')}
          />
        ) : null}
      </div>
    </Shell>
  );
}

function ResultView({
  result,
  dataset,
  onPdf,
  onCopy,
  onExport,
  onRetest,
  onHome
}: {
  result: PersonalityResult;
  dataset: PersonalityTestData;
  onPdf: () => void;
  onCopy: () => void;
  onExport: () => void;
  onRetest: () => void;
  onHome: () => void;
}) {
  const interp = dataset.interpretations;
  const mbtiInfo = interp.mbti[result.mbti.type] || { name: '', summary: '' };
  const d = result.mbti.dimensions;
  const ol = interp.oceanLabels;
  const en = interp.enneagram[result.ennea.primary] || { name: '', summary: '' };
  const discP = interp.disc[result.disc.primary] || { name: '' };
  const discS = interp.disc[result.disc.secondary] || { name: '' };

  return (
    <section className="view active">
      <header className="hero compact">
        <h1>测评结果</h1>
        <p className="type-badge">{result.fullType} · {mbtiInfo.name || ''}</p>
      </header>
      {!result.consistency.reliable ? (
        <div className="banner warn">{result.consistency.msg}</div>
      ) : null}
      <div className="result-grid">
        <div className="card">
          <h2>16 型人格</h2>
          <Radar labels={['E', 'S', 'T', 'J']} values={[d.EI.pctA, d.SN.pctA, d.TF.pctA, d.JP.pctA]} />
          <BarList items={[
            { label: `外向 E ${d.EI.pctA}%`, value: d.EI.pctA },
            { label: `感觉 S ${d.SN.pctA}%`, value: d.SN.pctA },
            { label: `思考 T ${d.TF.pctA}%`, value: d.TF.pctA },
            { label: `判断 J ${d.JP.pctA}%`, value: d.JP.pctA }
          ]} />
          <div className="detail">
            {(['EI', 'SN', 'TF', 'JP'] as const).map((k) => {
              const dim = d[k];
              return dim.ambiguous ? <p className="tag" key={k}>{dim.labelA}/{dim.labelB} 双型倾向</p> : null;
            })}
          </div>
        </div>
        <div className="card">
          <h2>大五人格 OCEAN</h2>
          <Radar labels={Object.values(ol)} values={Object.keys(result.ocean).map((k) => result.ocean[k].pct)} />
          <BarList items={Object.entries(result.ocean).map(([k, v]) => ({
            label: `${ol[k]} ${v.pct}% (${v.level})`,
            value: v.pct,
            color: v.level === '高' ? '#6366f1' : v.level === '低' ? '#94a3b8' : '#818cf8'
          }))} />
        </div>
        <div className="card">
          <h2>其他维度</h2>
          <div className="result-item"><span className="label">九型人格</span><strong>{result.ennea.wingLabel}</strong> {en.name || ''}</div>
          <div className="result-item"><span className="label">A/T 维度</span><strong>{result.at.label}</strong></div>
          <div className="result-item"><span className="label">DISC</span><strong>{result.disc.primary} / {result.disc.secondary}</strong> {discP.name} + {discS.name}</div>
          <div className="result-item"><span className="label">霍兰德</span><strong>{result.riasec.code}</strong> {result.riasec.top3.map((t) => interp.riasec[t.type]).join(' · ')}</div>
        </div>
        <div className="card full-width">
          <h2>详细解读</h2>
          <h3>{result.mbti.type} {mbtiInfo.name || ''}</h3>
          <p>{mbtiInfo.summary || ''}</p>
          <p><strong>优势：</strong>{(mbtiInfo.strengths || []).join('、')}</p>
          <p><strong>发展建议：</strong>{(mbtiInfo.growth || []).join('、')}</p>
          <h3>九型：{en.name || ''}</h3>
          <p>{en.summary || ''}</p>
          <h3>Step II 子维度</h3>
          <div className="facet-wrap">
            {Object.values(result.facets).map((f) => (
              <span className="facet-tag" key={f.label}>{f.label} {f.pct}%</span>
            ))}
          </div>
          <p className="meta">以上结果为自研算法计算，仅供自我探索参考。同一人格类型在不同情境下表现会有差异。</p>
        </div>
      </div>
      <div className="btn-row center">
        <button className="btn primary" type="button" onClick={onPdf}>下载结果 PDF</button>
        <button className="btn secondary" type="button" onClick={onCopy}>复制 Markdown</button>
        <button className="btn secondary" type="button" onClick={onExport}>导出 JSON</button>
        <button className="btn ghost" type="button" onClick={onRetest}>重新测试</button>
        <button className="btn ghost" type="button" onClick={onHome}>返回首页</button>
      </div>
    </section>
  );
}
