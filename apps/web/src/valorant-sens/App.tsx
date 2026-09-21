import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Shell } from '../shared/shell/Shell';
import { AimEngine, type AimEndResult } from './lib/aim-engine';
import { SensGames } from './lib/games';
import { SensMath, VAL_YAW } from './lib/math';
import { type Hipfire, ValSensStorage } from './lib/storage';
import {
  avgHs,
  currentModeKind,
  currentTestSens,
  emptySession,
  MAX_ROUNDS,
  modeTitle,
  onModeEnd,
  startSensFromProfile,
  sumField,
  summaryLine,
  type Habits,
  type WizardSession
} from './lib/wizard';
import { AimModes, type AimSignal } from './lib/modes';
import './styles.css';

type Tab = 'wizard' | 'play' | 'result' | 'toolbox';

function copyText(text: string, setHint?: (v: string) => void) {
  if (!text || text === '—') return;
  const done = () => {
    setHint?.('已复制');
    setTimeout(() => setHint?.(''), 1500);
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => window.prompt('复制灵敏度', text));
  } else {
    window.prompt('复制灵敏度', text);
  }
}

function sourceLabel(source?: string) {
  if (source === 'wizard') return '打靶向导';
  if (source === 'ab') return 'A/B';
  if (source === 'psa') return 'PSA';
  if (source === 'tune') return '微调';
  return '换算';
}

const GAMES = SensGames.list();

export function ValorantSensApp() {
  const saved = ValSensStorage.load();
  const [tab, setTab] = useState<Tab>('wizard');
  const [tick, setTick] = useState(0);
  const refresh = () => setTick((n) => n + 1);

  const [dpi, setDpi] = useState(Number(saved.profile?.dpi) || 800);
  const [oldSens, setOldSens] = useState(saved.profile?.oldSens || '');
  const [habits, setHabits] = useState<Habits>(saved.profile?.habits || {});
  const [hipfire, setHipfireState] = useState<Hipfire>(() => {
    const h = saved.lastConvert || saved.finalSens;
    return {
      dpi: h?.dpi || 800,
      sens: h?.sens || 0.35,
      yaw: VAL_YAW,
      gameId: 'valorant',
      cm360: h?.cm360 ?? SensMath.cm360(h?.dpi || 800, h?.sens || 0.35, VAL_YAW)
    };
  });

  const [playMeta, setPlayMeta] = useState('尚未开始');
  const [playSensLine, setPlaySensLine] = useState('当前灵敏度 —');
  const sessionRef = useRef<WizardSession | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayTitleRef = useRef<HTMLParagraphElement>(null);
  const overlaySubRef = useRef<HTMLParagraphElement>(null);
  const overlayBtnRef = useRef<HTMLButtonElement>(null);

  const [cv, setCv] = useState(() => {
    const i = saved.lastInputs || {};
    return {
      sourceGame: String(i.sourceGame || 'cs2'),
      sourceDpi: String(i.sourceDpi || '800'),
      sourceSens: String(i.sourceSens || '1'),
      targetGame: String(i.targetGame || 'valorant'),
      targetDpi: String(i.targetDpi || '800'),
      sameDpi: i.sameDpi !== false,
      sourceYaw: String(i.sourceYaw || ''),
      targetYaw: String(i.targetYaw || '')
    };
  });

  const [tune, setTune] = useState(() => {
    const t = saved.lastTune || {};
    return {
      center: t.center || String(hipfire.sens || 0.35),
      dpi: t.dpi || String(hipfire.dpi || 800),
      slider: t.slider || '0',
      targetCm: t.targetCm || '45',
      targetDpi: t.targetDpi || String(hipfire.dpi || 800)
    };
  });

  const [ab, setAb] = useState({
    lower: '0.30',
    higher: '0.40',
    dpi: String(hipfire.dpi || 800),
    status: '尚未开始'
  });
  const [copyHint, setCopyHint] = useState('');
  const [cvHint, setCvHint] = useState('');

  const startSens = startSensFromProfile(dpi, Number(oldSens), habits);
  const startCm = SensMath.cm360(dpi, startSens, VAL_YAW);

  useEffect(() => {
    ValSensStorage.patch({
      profile: { dpi: String(dpi), oldSens, habits }
    });
  }, [dpi, oldSens, habits]);

  const setHipfire = useCallback((next: Partial<Hipfire>) => {
    setHipfireState((prev) => {
      const merged = { ...prev, ...next };
      ValSensStorage.patch({ lastConvert: merged });
      return merged;
    });
  }, []);

  function showTab(name: Tab) {
    setTab(name);
    if (name !== 'play' && AimEngine.isRunning()) AimEngine.pause('tab');
  }

  const finishSession = useCallback((session: WizardSession, source: string) => {
    session.done = true;
    session.finalSens = session.estimate;
    ValSensStorage.patch({ wizardSession: session });
    const cm = SensMath.cm360(session.dpi, session.finalSens, VAL_YAW);
    setHipfire({
      dpi: session.dpi,
      sens: session.finalSens,
      yaw: VAL_YAW,
      gameId: 'valorant',
      cm360: cm
    });
    ValSensStorage.patch({
      finalSens: {
        sens: session.finalSens,
        dpi: session.dpi,
        cm360: cm,
        source: source || 'wizard',
        log: session.log,
        hsRate: avgHs(session),
        headshots: sumField(session, 'headshots'),
        shots: sumField(session, 'shots')
      }
    });
    ValSensStorage.addHistory({
      finalSens: session.finalSens,
      dpi: session.dpi,
      cm360: cm,
      source: source || 'wizard'
    });
    AimEngine.stop();
    showTab('result');
    refresh();
  }, [setHipfire]);

  const launchCurrent = useCallback((session: WizardSession) => {
    sessionRef.current = session;
    ValSensStorage.patch({ wizardSession: session });
    showTab('play');
    setPlayMeta(modeTitle(session));
    const testSens = currentTestSens(session);
    const kind = currentModeKind(session);
    if (session.kind === 'ab' && session.ab) {
      setPlaySensLine((session.ab.phase === 'b' ? '偏高 ' : '偏低 ') +
        SensMath.formatSensGame(testSens) + ' @ ' + session.dpi + ' DPI');
    } else {
      setPlaySensLine('当前灵敏度 ' + SensMath.formatSensGame(session.estimate) +
        ' @ ' + session.dpi + ' DPI');
    }
    AimEngine.setHudTitle(modeTitle(session));
    AimEngine.start({
      kind,
      sens: testSens,
      durationMs: session.kind === 'ab' ? 20000 : AimModes.duration(kind),
      title: modeTitle(session),
      overlayTitle: '点击锁定鼠标并开始',
      overlaySub: AimModes.fireHint(kind) + '。倒计时在锁定后开始。',
      onEnd(result: AimEndResult) {
        const next = sessionRef.current;
        if (!next) return;
        const action = onModeEnd(next, result);
        if (action === 'free-done') {
          ValSensStorage.patch({ wizardSession: null });
          if (overlayTitleRef.current) overlayTitleRef.current.textContent = '自由训练结束';
          const last = (next as WizardSession & { lastFreeSig?: AimSignal }).lastFreeSig;
          if (overlaySubRef.current && last) overlaySubRef.current.textContent = summaryLine(last);
          if (overlayBtnRef.current) {
            overlayBtnRef.current.hidden = false;
            overlayBtnRef.current.textContent = '返回向导';
          }
          AimEngine.setOverlayAction(() => {
            AimEngine.stop();
            showTab('wizard');
          });
          if (overlayRef.current) overlayRef.current.hidden = false;
          return;
        }
        if (action === 'finish') {
          finishSession(next, next.kind === 'ab' && next.fromToolbox ? 'ab' : 'wizard');
          return;
        }
        launchCurrent(next);
      }
    });
  }, [finishSession]);

  useEffect(() => {
    if (!canvasRef.current || !stageRef.current || !overlayRef.current || !overlayTitleRef.current || !overlaySubRef.current || !overlayBtnRef.current) return;
    AimEngine.attach({
      canvas: canvasRef.current,
      stage: stageRef.current,
      overlay: overlayRef.current,
      overlayTitle: overlayTitleRef.current,
      overlaySub: overlaySubRef.current,
      overlayBtn: overlayBtnRef.current
    });
  }, []);

  function toggleHabit(key: string) {
    setHabits((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === 'wrist' && next.wrist) next.arm = false;
      if (key === 'arm' && next.arm) next.wrist = false;
      return next;
    });
  }

  function beginFull() {
    const session = emptySession('full', dpi, startSens, 0.35);
    launchCurrent(session);
  }

  function beginRetune() {
    const estimate = hipfire.sens || startSens;
    const session = emptySession('full', hipfire.dpi || dpi, estimate, 0.08);
    session.round = MAX_ROUNDS;
    session.retune = true;
    launchCurrent(session);
  }

  function beginFree(kind: string) {
    const session = emptySession('free', dpi, startSens, 0);
    session.freeKind = kind;
    const idx = ['placement', 'flick', 'micro'].indexOf(kind);
    session.modeIndex = idx >= 0 ? idx : 0;
    launchCurrent(session);
  }

  function beginAb(lower: number, higher: number, abDpi: number) {
    const session = emptySession('ab', abDpi || 800, (lower + higher) / 2, 0.05);
    session.fromToolbox = true;
    session.ab = { phase: 'a', lower, higher };
    setAb((s) => ({ ...s, status: '正在测试偏低候选…' }));
    launchCurrent(session);
  }

  function abortPlay() {
    AimEngine.stop();
    ValSensStorage.patch({ wizardSession: null });
    showTab('wizard');
  }

  const history = ValSensStorage.load().history || [];
  const finalSens = ValSensStorage.load().finalSens;
  const resultSrc = finalSens || (hipfire.sens ? {
    sens: hipfire.sens,
    dpi: hipfire.dpi,
    cm360: hipfire.cm360 || SensMath.cm360(hipfire.dpi, hipfire.sens, hipfire.yaw),
    source: 'wizard',
    log: [] as Record<string, unknown>[]
  } : null);

  const sourceGame = SensGames.get(cv.sourceGame);
  const targetGame = SensGames.get(cv.targetGame);
  const fromYaw = cv.sourceYaw ? Number(cv.sourceYaw) : sourceGame.yaw;
  const toYaw = cv.targetYaw ? Number(cv.targetYaw) : targetGame.yaw;
  const fromDpi = Number(cv.sourceDpi);
  const fromSens = Number(cv.sourceSens);
  const toDpi = cv.sameDpi ? fromDpi : Number(cv.targetDpi);
  const toSens = SensMath.convert(fromDpi, fromSens, fromYaw, toDpi, toYaw);
  const srcCm = SensMath.cm360(fromDpi, fromSens, fromYaw);
  const tgtCm = SensMath.cm360(toDpi, toSens, toYaw);
  const dpiRows = SensMath.dpiTable(tgtCm, toYaw);

  useEffect(() => {
    ValSensStorage.patch({
      lastInputs: { ...cv, sameDpi: cv.sameDpi }
    });
    if (toSens != null) {
      const valSens = SensMath.convert(fromDpi, fromSens, fromYaw, toDpi, VAL_YAW);
      if (valSens != null) {
        setHipfire({
          dpi: toDpi,
          sens: valSens,
          yaw: VAL_YAW,
          gameId: 'valorant',
          cm360: SensMath.cm360(toDpi, valSens, VAL_YAW)
        });
      }
    }
  }, [cv, fromDpi, fromSens, fromYaw, toDpi, toSens, setHipfire]);

  useEffect(() => {
    ValSensStorage.patch({ lastTune: tune });
  }, [tune]);

  const tunePct = Number(tune.slider);
  const tuneSens = Number(tune.center) > 0 ? Number(tune.center) * (1 + tunePct / 100) : null;
  const fromCmSens = SensMath.sensFromCm360(Number(tune.targetDpi), Number(tune.targetCm), VAL_YAW);

  const log = (resultSrc && 'log' in resultSrc ? resultSrc.log : []) as Record<string, unknown>[];

  return (
    <Shell>
      <main className="vs-main">
        <header className="vs-hero">
          <h1>无畏契约灵敏度工坊</h1>
          <p>用爆头点射测手感，生成可直接填进游戏的腰射灵敏度。甩枪左键开火，打头部才算爆头。</p>
        </header>

        <nav className="vs-tabs" role="tablist">
          {([
            ['wizard', '生成向导'],
            ['play', '测试画布'],
            ['result', '结果'],
            ['toolbox', '工具箱']
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`vs-tab${tab === id ? ' is-active' : ''}`}
              role="tab"
              aria-selected={tab === id}
              onClick={() => showTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <section className={`vs-panel${tab === 'wizard' ? ' is-active' : ''}`} hidden={tab !== 'wizard'}>
          <div className="vs-card vs-checklist">
            <h2>使用前检查</h2>
            <ul>
              <li>Windows 指针速度设为 6/11（中间档）</li>
              <li>关闭「提高指针精确度」（鼠标加速）</li>
              <li>无畏契约开启原始输入缓冲</li>
              <li>鼠标驱动 DPI 与下方填写值一致</li>
              <li>请在电脑上测（需要鼠标锁定）</li>
            </ul>
          </div>
          <div className="vs-card">
            <h2>建档</h2>
            <div className="vs-form-grid">
              <label>鼠标 DPI
                <input type="number" min={50} max={32000} step={50} value={dpi} onChange={(e) => setDpi(Number(e.target.value) || 800)} />
              </label>
              <label>已有灵敏度（可选）
                <input type="number" min={0} max={5} step={0.001} placeholder="没有可留空" value={oldSens} onChange={(e) => setOldSens(e.target.value)} />
              </label>
            </div>
            <p className="vs-note">习惯标签只影响起始区间，最终灵敏度由爆头点射结果收敛。</p>
            <div className="vs-chip-row">
              {[['flick', '甩枪'], ['track', '跟枪'], ['wrist', '腕控'], ['arm', '臂控']].map(([key, label]) => (
                <button key={key} type="button" className={`vs-chip${habits[key] ? ' is-on' : ''}`} onClick={() => toggleHabit(key)}>{label}</button>
              ))}
            </div>
            <dl className="vs-stats">
              <div><dt>起始灵敏度</dt><dd>{SensMath.formatSensGame(startSens)}</dd></div>
              <div><dt>约 cm/360</dt><dd>{SensMath.formatCm(startCm)}</dd></div>
            </dl>
            <div className="vs-btn-row">
              <button type="button" className="vs-btn vs-btn-primary" onClick={beginFull}>开始完整流程</button>
            </div>
            <p className="vs-note">完整流程：头线点射 / 甩头 / 爆头微点（左键开火）→ 网页 A/B → 输出最合适的通用灵敏度。</p>
          </div>
          <div className="vs-card">
            <h2>自由训练</h2>
            <p className="vs-note">单关练习，不改最终结果。点射关左键开火；跟枪只需贴住。</p>
            <div className="vs-btn-row">
              <button type="button" className="vs-btn vs-btn-secondary" onClick={() => beginFree('placement')}>头线点射</button>
              <button type="button" className="vs-btn vs-btn-secondary" onClick={() => beginFree('flick')}>甩头 Flick</button>
              <button type="button" className="vs-btn vs-btn-secondary" onClick={() => beginFree('micro')}>爆头微点</button>
              <button type="button" className="vs-btn vs-btn-secondary" onClick={() => beginFree('tracking')}>跟枪 Tracking</button>
            </div>
          </div>
        </section>

        <section className={`vs-panel${tab === 'play' ? ' is-active' : ''}`} hidden={tab !== 'play'}>
          <div className="vs-card vs-stage-card">
            <div className="vs-play-meta">
              <p className="vs-round-meta">{playMeta}</p>
              <p className="vs-note">{playSensLine}</p>
            </div>
            <div className="vs-stage" ref={stageRef}>
              <canvas ref={canvasRef} width={960} height={540} tabIndex={0} />
              <div className="vs-stage-overlay" ref={overlayRef}>
                <p className="vs-overlay-title" ref={overlayTitleRef}>点击开始</p>
                <p className="vs-note" ref={overlaySubRef}>锁定鼠标后，左键开火打头部。跟枪关只需贴住。</p>
                <button type="button" className="vs-btn vs-btn-primary" ref={overlayBtnRef}>锁定鼠标并开始</button>
              </div>
            </div>
            <div className="vs-btn-row">
              <button type="button" className="vs-btn vs-btn-secondary" onClick={abortPlay}>结束并返回</button>
            </div>
          </div>
        </section>

        <section className={`vs-panel${tab === 'result' ? ' is-active' : ''}`} hidden={tab !== 'result'}>
          <div className="vs-card">
            <h2>填入无畏契约</h2>
            <p className="vs-result-sens"><span>{resultSrc ? SensMath.formatSensGame(resultSrc.sens) : '—'}</span></p>
            <p className="vs-result-label">设置 → 灵敏度：通用（腰射）。内部精度 {resultSrc ? SensMath.formatSens(resultSrc.sens) : '—'}</p>
            <dl className="vs-stats">
              <div><dt>DPI</dt><dd>{resultSrc ? String(resultSrc.dpi) : '—'}</dd></div>
              <div><dt>eDPI</dt><dd>{resultSrc ? SensMath.formatEdpi(SensMath.edpi(resultSrc.dpi, resultSrc.sens)) : '—'}</dd></div>
              <div><dt>约 cm/360</dt><dd>{resultSrc ? SensMath.formatCm(resultSrc.cm360) : '—'}</dd></div>
              <div><dt>来源</dt><dd>{resultSrc ? sourceLabel(resultSrc.source) : '尚未生成'}</dd></div>
              <div><dt>测试爆头率</dt><dd>{finalSens?.hsRate != null ? Math.round(finalSens.hsRate * 100) + '%' : '—'}</dd></div>
            </dl>
            <div className="vs-btn-row">
              <button type="button" className="vs-btn vs-btn-primary" onClick={() => copyText(SensMath.formatSensGame((finalSens && finalSens.sens) || hipfire.sens), setCopyHint)}>复制灵敏度</button>
              <button type="button" className="vs-btn vs-btn-secondary" onClick={() => {
                const s = (finalSens && finalSens.sens) || hipfire.sens;
                const d = (finalSens && finalSens.dpi) || hipfire.dpi;
                setTune((t) => ({ ...t, center: Number(s).toFixed(6), dpi: String(d), slider: '0' }));
                showTab('toolbox');
              }}>送到微调</button>
              <button type="button" className="vs-btn vs-btn-secondary" onClick={beginRetune}>再测一轮微调</button>
            </div>
            {copyHint ? <p className="vs-hint">{copyHint}</p> : null}
            <p className="vs-note">网页 FOV 与游戏不会完全一致，但 yaw=0.07 与 DPI 对齐后，该数字可直接用于通用灵敏度。推荐值按爆头点射收敛，请再进训练场确认。</p>
          </div>
          <div className="vs-card">
            <h2>本轮测试摘要</h2>
            <ol className="vs-history-list">
              {!log.length ? <li>没有轮次记录。</li> : log.map((row, i) => {
                if (row.round === 'A/B') {
                  return <li key={i}>A/B：选{row.pick === 'higher' ? '偏高' : '偏低'}（低 {SensMath.formatSensGame(Number(row.lower))} / 高 {SensMath.formatSensGame(Number(row.higher))}）</li>;
                }
                const combined = Number(row.combined);
                const dir = combined > 0.12 ? '建议升高' : combined < -0.12 ? '建议降低' : '接近合适';
                const signals = (row.signals as { headshots?: number; hits?: number }[] | undefined) || [];
                let heads = 0;
                let hits = 0;
                signals.forEach((s) => { heads += Number(s.headshots) || 0; hits += Number(s.hits) || 0; });
                const hs = hits ? ' · 爆头率 ' + Math.round(heads / hits * 100) + '%' : '';
                return <li key={i}>第 {String(row.round)} 轮 {dir} → {SensMath.formatSensGame(Number(row.next))}{hs}</li>;
              })}
            </ol>
          </div>
        </section>

        <section className={`vs-panel${tab === 'toolbox' ? ' is-active' : ''}`} hidden={tab !== 'toolbox'}>
          <div className="vs-card">
            <h2>网页 A/B 对比</h2>
            <p className="vs-note">两个候选各打一轮短甩头点射。爆头率更高的一侧作为最终灵敏度。</p>
            <div className="vs-form-grid">
              <label>偏低候选<input type="number" min={0.05} max={5} step={0.001} value={ab.lower} onChange={(e) => setAb({ ...ab, lower: e.target.value })} /></label>
              <label>偏高候选<input type="number" min={0.05} max={5} step={0.001} value={ab.higher} onChange={(e) => setAb({ ...ab, higher: e.target.value })} /></label>
              <label>DPI<input type="number" min={50} max={32000} step={50} value={ab.dpi} onChange={(e) => setAb({ ...ab, dpi: e.target.value })} /></label>
            </div>
            <div className="vs-btn-row">
              <button type="button" className="vs-btn vs-btn-primary" onClick={() => beginAb(Number(ab.lower), Number(ab.higher), Number(ab.dpi))}>开始 A/B</button>
              <button type="button" className="vs-btn vs-btn-secondary" onClick={() => {
                const s = hipfire.sens || 0.35;
                setAb({ ...ab, dpi: String(hipfire.dpi || 800), lower: (s * 0.95).toFixed(3), higher: (s * 1.05).toFixed(3) });
              }}>从结果导入 ±5%</button>
            </div>
            <p className="vs-round-meta">{ab.status}</p>
          </div>

          <div className="vs-card vs-checklist">
            <h2>跨游戏换算</h2>
            <ul><li>当前仅换算腰射。ADS / 狙击开镜需在游戏内单独微调。</li></ul>
          </div>
          <div className="vs-card">
            <h2>输入</h2>
            <div className="vs-form-grid">
              <label>源游戏
                <select value={cv.sourceGame} onChange={(e) => setCv({ ...cv, sourceGame: e.target.value })}>
                  {GAMES.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </label>
              <label>源 DPI<input type="number" min={50} max={32000} step={50} value={cv.sourceDpi} onChange={(e) => setCv({ ...cv, sourceDpi: e.target.value })} /></label>
              <label>源灵敏度<input type="number" min={0.001} max={50} step={0.001} value={cv.sourceSens} onChange={(e) => setCv({ ...cv, sourceSens: e.target.value })} /></label>
              <label>目标游戏
                <select value={cv.targetGame} onChange={(e) => setCv({ ...cv, targetGame: e.target.value })}>
                  {GAMES.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </label>
              <label>目标 DPI<input type="number" min={50} max={32000} step={50} value={cv.sameDpi ? cv.sourceDpi : cv.targetDpi} disabled={cv.sameDpi} onChange={(e) => setCv({ ...cv, targetDpi: e.target.value })} /></label>
            </div>
            <label className="vs-check">
              <input type="checkbox" checked={cv.sameDpi} onChange={(e) => setCv({ ...cv, sameDpi: e.target.checked })} />
              目标 DPI 与源 DPI 相同
            </label>
            <details className="vs-advanced">
              <summary>高级：手动覆盖 yaw</summary>
              <p className="vs-note">默认系数核对日期 {SensGames.CHECKED_AT}。{sourceGame.name} yaw={sourceGame.yaw}，{targetGame.name} yaw={targetGame.yaw}。留空则用默认值。</p>
              <div className="vs-form-grid">
                <label>源 yaw<input type="number" min={0.0001} max={1} step={0.0001} placeholder={String(sourceGame.yaw)} value={cv.sourceYaw} onChange={(e) => setCv({ ...cv, sourceYaw: e.target.value })} /></label>
                <label>目标 yaw<input type="number" min={0.0001} max={1} step={0.0001} placeholder={String(targetGame.yaw)} value={cv.targetYaw} onChange={(e) => setCv({ ...cv, targetYaw: e.target.value })} /></label>
              </div>
            </details>
          </div>
          <div className="vs-card">
            <h2>换算结果（腰射）</h2>
            <p className="vs-result-sens"><span>{targetGame.id === 'valorant' ? SensMath.formatSensGame(toSens) : SensMath.formatSens(toSens)}</span></p>
            <p className="vs-result-label">{targetGame.name} · 腰射</p>
            <dl className="vs-stats">
              <div><dt>源 eDPI</dt><dd>{SensMath.formatEdpi(SensMath.edpi(fromDpi, fromSens))}</dd></div>
              <div><dt>目标 eDPI</dt><dd>{SensMath.formatEdpi(SensMath.edpi(toDpi, toSens))}</dd></div>
              <div><dt>源 cm/360</dt><dd>{SensMath.formatCm(srcCm)}</dd></div>
              <div><dt>目标 cm/360</dt><dd>{SensMath.formatCm(tgtCm)}</dd></div>
            </dl>
            <div className="vs-btn-row">
              <button type="button" className="vs-btn vs-btn-primary" onClick={() => copyText(targetGame.id === 'valorant' ? SensMath.formatSensGame(toSens) : SensMath.formatSens(toSens), setCvHint)}>复制灵敏度</button>
              <button type="button" className="vs-btn vs-btn-secondary" onClick={() => {
                setDpi(hipfire.dpi);
                setOldSens(Number(hipfire.sens).toFixed(3));
                showTab('wizard');
              }}>用作测试基准</button>
              <button type="button" className="vs-btn vs-btn-secondary" onClick={() => {
                if (toSens == null) return;
                ValSensStorage.addHistory({ finalSens: toSens, dpi: toDpi, cm360: tgtCm, source: 'convert' });
                refresh();
              }}>保存到历史</button>
            </div>
            {cvHint ? <p className="vs-hint">{cvHint}</p> : null}
          </div>
          <div className="vs-card">
            <h2>同 cm/360 的 DPI 等效表</h2>
            <p className="vs-note">保持目标游戏转身距离不变，换 DPI 时用对应灵敏度。</p>
            <div className="vs-table-wrap">
              <table className="vs-table">
                <thead><tr><th>DPI</th><th>灵敏度</th><th>eDPI</th></tr></thead>
                <tbody>
                  {dpiRows.map((row) => (
                    <tr key={row.dpi}><td>{row.dpi}</td><td>{SensMath.formatSens(row.sens)}</td><td>{SensMath.formatEdpi(row.edpi)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="vs-card">
            <h2>在结果附近微调（±10%）</h2>
            <label>中心灵敏度<input type="number" min={0.001} max={20} step={0.001} value={tune.center} onChange={(e) => setTune({ ...tune, center: e.target.value })} /></label>
            <label>DPI<input type="number" min={50} max={32000} step={50} value={tune.dpi} onChange={(e) => setTune({ ...tune, dpi: e.target.value })} /></label>
            <label className="vs-slider-label">微调 {tunePct > 0 ? '+' : ''}{tunePct}%
              <input type="range" min={-10} max={10} step={0.5} value={tune.slider} onChange={(e) => setTune({ ...tune, slider: e.target.value })} />
            </label>
            <p className="vs-result-sens"><span>{SensMath.formatSens(tuneSens)}</span></p>
            <dl className="vs-stats">
              <div><dt>eDPI</dt><dd>{SensMath.formatEdpi(SensMath.edpi(Number(tune.dpi), tuneSens))}</dd></div>
              <div><dt>约 cm/360</dt><dd>{SensMath.formatCm(SensMath.cm360(Number(tune.dpi), tuneSens, VAL_YAW))}</dd></div>
            </dl>
            <div className="vs-btn-row">
              <button type="button" className="vs-btn vs-btn-primary" onClick={() => copyText(SensMath.formatSensGame(tuneSens))}>复制灵敏度</button>
              <button type="button" className="vs-btn vs-btn-secondary" onClick={() => {
                if (tuneSens == null) return;
                ValSensStorage.addHistory({ finalSens: tuneSens, dpi: Number(tune.dpi), cm360: SensMath.cm360(Number(tune.dpi), tuneSens, VAL_YAW), source: 'tune' });
                refresh();
              }}>保存到历史</button>
            </div>
          </div>
          <div className="vs-card">
            <h2>按目标 cm/360 反推</h2>
            <p className="vs-note">多数竞技玩家约在 25–55 cm 转一圈。低敏更稳，高敏转身更快。</p>
            <div className="vs-form-grid">
              <label>目标 cm/360<input type="number" min={5} max={200} step={0.1} value={tune.targetCm} onChange={(e) => setTune({ ...tune, targetCm: e.target.value })} /></label>
              <label>DPI<input type="number" min={50} max={32000} step={50} value={tune.targetDpi} onChange={(e) => setTune({ ...tune, targetDpi: e.target.value })} /></label>
            </div>
            <p className="vs-result-sens vs-result-sens-sm"><span>{SensMath.formatSens(fromCmSens)}</span></p>
            <div className="vs-btn-row">
              <button type="button" className="vs-btn vs-btn-secondary" onClick={() => { if (fromCmSens) setTune({ ...tune, center: Number(fromCmSens).toFixed(6), dpi: tune.targetDpi, slider: '0' }); }}>用作微调中心</button>
              <button type="button" className="vs-btn vs-btn-primary" onClick={() => copyText(SensMath.formatSensGame(fromCmSens))}>复制灵敏度</button>
            </div>
          </div>
        </section>

        <section className="vs-card">
          <h2>本机历史</h2>
          <p className="vs-note">保存在本浏览器，键名 hao.valorant-sens.v1。换设备请先导出。</p>
          <div className="vs-btn-row">
            <button type="button" className="vs-btn vs-btn-secondary" onClick={() => ValSensStorage.exportJSON()}>导出 JSON</button>
            <label className="vs-btn vs-btn-secondary vs-file-btn">导入 JSON
              <input type="file" accept="application/json,.json" hidden onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                ValSensStorage.importJSON(file).then(() => window.location.reload()).catch(() => window.alert('导入失败，请确认是本工具导出的 JSON。'));
                e.target.value = '';
              }} />
            </label>
          </div>
          <ul className="vs-history-list">
            {!history.length ? <li>还没有保存记录。</li> : history.map((item) => (
              <li key={item.id}>
                <span>{item.date ? item.date.slice(0, 10) : ''} · {sourceLabel(item.source)} · {SensMath.formatSensGame(item.finalSens)} @ {item.dpi} DPI · {SensMath.formatCm(item.cm360)}</span>
                <button type="button" onClick={() => { ValSensStorage.removeHistory(item.id); refresh(); }}>删除</button>
              </li>
            ))}
          </ul>
        </section>

        <footer className="vs-disclaimer">
          <p>非官方工具。腰射 yaw=0.07（社区实测）。输出对应游戏「灵敏度：通用」。网页测试用于收敛手感，大版本更新后请以训练场为准。</p>
        </footer>
      </main>
    </Shell>
  );
}
