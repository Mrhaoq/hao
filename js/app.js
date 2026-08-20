const App = (function () {
  const PT = PERSONALITY_TEST;
  let mode = 'full';
  let activeQuestions = [];
  let currentIndex = 0;
  let answers = {};
  let result = null;

  const views = { home: '#view-home', test: '#view-test', result: '#view-result' };

  function $(sel) { return document.querySelector(sel); }
  function showView(name) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    $(views[name]).classList.add('active');
    Storage.saveProgress(answers, mode, currentIndex, name);
  }

  function getQuestionsForMode(m) {
    if (m === 'quick') return PT.questions.filter(q => PT.quickModules.includes(q.module));
    return PT.questions;
  }

  function renderModuleList() {
    const el = $('#module-list');
    el.innerHTML = '<h2>测评模块</h2><ul>' + PT.modules.map(m =>
      `<li><strong>${m.name}</strong><span>${m.desc} · ${PT.questions.filter(q=>q.module===m.id).length} 题</span></li>`
    ).join('') + '</ul>';
  }

  function checkResume() {
    const saved = Storage.load();
    const hint = $('#resume-hint');
    if (saved && saved.answers && Object.keys(saved.answers).length > 0) {
      hint.classList.remove('hidden');
      hint.textContent = `检测到未完成记录（${Object.keys(saved.answers).length} 题已答），点击「开始测试」将继续。`;
    }
  }

  function startTest(resume) {
    mode = document.querySelector('input[name="mode"]:checked').value;
    activeQuestions = getQuestionsForMode(mode);
    if (resume) {
      const saved = Storage.load();
      if (saved && saved.mode === mode && saved.answers) {
        answers = saved.answers;
        currentIndex = Math.min(saved.currentIndex || 0, activeQuestions.length - 1);
        if (saved.result && Object.keys(answers).length >= activeQuestions.length * 0.95) {
          result = saved.result;
          renderResult();
          showView('result');
          return;
        }
      } else {
        answers = {};
        currentIndex = 0;
      }
    } else {
      answers = {};
      currentIndex = 0;
      result = null;
    }
    showView('test');
    renderQuestion();
  }

  function renderQuestion() {
    const q = activeQuestions[currentIndex];
    const mod = PT.modules.find(m => m.id === q.module);
    $('#question-num').textContent = `第 ${currentIndex + 1} / ${activeQuestions.length} 题`;
    $('#question-text').textContent = q.text;
    $('#module-badge').textContent = mod ? mod.name : q.module;
    $('#progress-fill').style.width = ((currentIndex + 1) / activeQuestions.length * 100) + '%';
    $('#progress-text').textContent = `${currentIndex + 1} / ${activeQuestions.length}`;

    const opts = $('#likert-options');
    opts.innerHTML = PT.likertLabels.map((label, i) => {
      const val = i + 1;
      const checked = answers[q.id] == val ? 'checked' : '';
      return `<label class="likert-opt ${checked}"><input type="radio" name="answer" value="${val}" ${checked ? 'checked' : ''} /><span class="num">${val}</span><span class="lbl">${label}</span></label>`;
    }).join('');

    opts.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        answers[q.id] = Number(input.value);
        Storage.saveProgress(answers, mode, currentIndex, 'test');
        opts.querySelectorAll('.likert-opt').forEach(l => l.classList.remove('checked'));
        input.closest('.likert-opt').classList.add('checked');
      });
    });

    $('#btn-prev').disabled = currentIndex === 0;
    $('#btn-next').textContent = currentIndex === activeQuestions.length - 1 ? '查看结果' : '下一题';
  }

  function nextQuestion() {
    const q = activeQuestions[currentIndex];
    if (!answers[q.id]) { alert('请选择一个选项'); return; }
    if (currentIndex < activeQuestions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      finishTest();
    }
  }

  function finishTest() {
    const unanswered = activeQuestions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      if (!confirm(`还有 ${unanswered.length} 题未作答，是否仍要提交？`)) return;
    }
    result = Scoring.computeAll(activeQuestions, answers);
    Storage.saveResult(result, answers, mode);
    renderResult();
    showView('result');
  }

  function renderResult() {
    if (!result) {
      const saved = Storage.load();
      result = saved?.result;
      answers = saved?.answers || {};
      activeQuestions = getQuestionsForMode(saved?.mode || 'full');
    }
    if (!result) return;

    const interp = PT.interpretations;
    const mbtiInfo = interp.mbti[result.mbti.type] || {};
    $('#result-type').textContent = `${result.fullType} · ${mbtiInfo.name || ''}`;

    const banner = $('#consistency-banner');
    banner.classList.toggle('hidden', result.consistency.reliable);
    banner.classList.toggle('warn', !result.consistency.reliable);
    banner.textContent = result.consistency.msg;

    const d = result.mbti.dimensions;
    Charts.drawRadar($('#chart-mbti'), ['E','S','T','J'], [d.EI.pctA, d.SN.pctA, d.TF.pctA, d.JP.pctA]);
    Charts.drawBars($('#mbti-bars'), [
      { label: `外向 E ${d.EI.pctA}%`, value: d.EI.pctA },
      { label: `感觉 S ${d.SN.pctA}%`, value: d.SN.pctA },
      { label: `思考 T ${d.TF.pctA}%`, value: d.TF.pctA },
      { label: `判断 J ${d.JP.pctA}%`, value: d.JP.pctA },
    ]);

    let mbtiDetail = '';
    ['EI','SN','TF','JP'].forEach(k => {
      const dim = d[k];
      if (dim.ambiguous) mbtiDetail += `<p class="tag">${dim.labelA}/${dim.labelB} 双型倾向</p>`;
    });
    $('#mbti-detail').innerHTML = mbtiDetail;

    const ol = interp.oceanLabels;
    Charts.drawRadar($('#chart-ocean'), Object.values(ol), Object.keys(result.ocean).map(k => result.ocean[k].pct));
    Charts.drawBars($('#ocean-bars'), Object.entries(result.ocean).map(([k,v]) => ({
      label: `${ol[k]} ${v.pct}% (${v.level})`, value: v.pct,
      color: v.level === '高' ? '#6366f1' : v.level === '低' ? '#94a3b8' : '#818cf8'
    })));

    const en = interp.enneagram[result.ennea.primary] || {};
    const discP = interp.disc[result.disc.primary] || {};
    const discS = interp.disc[result.disc.secondary] || {};
    $('#other-results').innerHTML = `
      <div class="result-item"><span class="label">九型人格</span><strong>${result.ennea.wingLabel}</strong> ${en.name || ''}</div>
      <div class="result-item"><span class="label">A/T 维度</span><strong>${result.at.label}</strong></div>
      <div class="result-item"><span class="label">DISC</span><strong>${result.disc.primary} / ${result.disc.secondary}</strong> ${discP.name} + ${discS.name}</div>
      <div class="result-item"><span class="label">霍兰德</span><strong>${result.riasec.code}</strong> ${result.riasec.top3.map(t=>interp.riasec[t.type]).join(' · ')}</div>
    `;

    const facets = Object.entries(result.facets).map(([k,f]) => `<span class="facet-tag">${f.label} ${f.pct}%</span>`).join('');
    $('#interpretation').innerHTML = `
      <h3>${result.mbti.type} ${mbtiInfo.name || ''}</h3>
      <p>${mbtiInfo.summary || ''}</p>
      <p><strong>优势：</strong>${(mbtiInfo.strengths||[]).join('、')}</p>
      <p><strong>发展建议：</strong>${(mbtiInfo.growth||[]).join('、')}</p>
      <h3>九型：${en.name || ''}</h3><p>${en.summary || ''}</p>
      <h3>Step II 子维度</h3><div class="facet-wrap">${facets}</div>
      <p class="meta">以上结果为自研算法计算，仅供自我探索参考。同一人格类型在不同情境下表现会有差异。</p>
    `;
  }

  function copyMarkdown() {
    if (!result) return;
    const t = PT.interpretations.mbti[result.mbti.type];
    const md = `# 人格测评结果\n\n- **类型**: ${result.fullType} (${t?.name||''})\n- **九型**: ${result.ennea.wingLabel}\n- **DISC**: ${result.disc.primary}/${result.disc.secondary}\n- **霍兰德**: ${result.riasec.code}\n- **A/T**: ${result.at.label}\n\n## MBTI\n- E ${result.mbti.dimensions.EI.pctA}% / I ${result.mbti.dimensions.EI.pctB}%\n- S ${result.mbti.dimensions.SN.pctA}% / N ${result.mbti.dimensions.SN.pctB}%\n- T ${result.mbti.dimensions.TF.pctA}% / F ${result.mbti.dimensions.TF.pctB}%\n- J ${result.mbti.dimensions.JP.pctA}% / P ${result.mbti.dimensions.JP.pctB}%\n\n${t?.summary||''}\n`;
    navigator.clipboard.writeText(md).then(() => alert('已复制到剪贴板'));
  }

  function bindEvents() {
    $('#btn-start').addEventListener('click', () => startTest(true));
    $('#btn-pdf-book').addEventListener('click', () => PDFExport.downloadQuestionnaire(PT.questions, PT.modules));
    $('#btn-export').addEventListener('click', () => { if (!Storage.exportJSON()) alert('暂无保存记录'); });
    $('#btn-import').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const data = await Storage.importJSON(file);
        if (data.result) { result = data.result; answers = data.answers; mode = data.mode; renderResult(); showView('result'); }
        else { checkResume(); alert('备份已导入'); }
      } catch { alert('导入失败，请检查文件格式'); }
    });
    $('#btn-clear').addEventListener('click', () => { if (confirm('确定清除所有本地记录？')) { Storage.clear(); checkResume(); } });
    $('#btn-back-home').addEventListener('click', () => showView('home'));
    $('#btn-prev').addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; renderQuestion(); } });
    $('#btn-next').addEventListener('click', nextQuestion);
    $('#btn-pdf-result').addEventListener('click', () => PDFExport.downloadResult(result, PT.interpretations));
    $('#btn-copy-md').addEventListener('click', copyMarkdown);
    $('#btn-export-result').addEventListener('click', () => Storage.exportJSON());
    $('#btn-retest').addEventListener('click', () => { Storage.clear(); startTest(false); });
    $('#btn-home-result').addEventListener('click', () => showView('home'));
  }

  function init() {
    renderModuleList();
    checkResume();
    bindEvents();
    const saved = Storage.load();
    if (saved?.view === 'result' && saved.result) {
      result = saved.result;
      answers = saved.answers || {};
      mode = saved.mode || 'full';
      renderResult();
      showView('result');
    } else if (saved?.view === 'test' && saved.answers) {
      mode = saved.mode || 'full';
      activeQuestions = getQuestionsForMode(mode);
      answers = saved.answers;
      currentIndex = saved.currentIndex || 0;
      showView('test');
      renderQuestion();
    }
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
