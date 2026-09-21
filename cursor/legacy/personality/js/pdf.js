const PDFExport = (function () {
  function buildQuestionnaireHTML(questions, modules) {
    const opts = '1 非常不符合 · 2 较不符合 · 3 一般 · 4 较符合 · 5 非常符合';
    let html = `<div class="pdf-doc"><h1>多维度人格测评 — 完整题本</h1><p>共 ${questions.length} 题 · 五档 Likert · 预计 90–120 分钟</p><p class="small">本测评为自研倾向工具，非 MBTI® 官方产品，结果仅供参考。</p><hr/>`;
    let mod = '';
    questions.forEach((q, i) => {
      if (q.module !== mod) {
        mod = q.module;
        const m = modules.find((x) => x.id === mod);
        html += `<h2>${m ? m.name : mod}</h2>`;
      }
      html += `<div class="q"><p><b>${i + 1}.</b> ${q.text}</p><p class="small">${opts}</p><p>作答：____</p></div>`;
    });
    html += '</div>';
    return html;
  }

  function buildResultHTML(result, interpretations) {
    const t = interpretations.mbti[result.mbti.type] || {};
    const e = interpretations.enneagram[result.ennea.primary] || {};
    return `<div class="pdf-doc">
      <h1>多维度人格测评 — 结果报告</h1>
      <p>生成：${new Date(result.computedAt).toLocaleString('zh-CN')}</p>
      <h2>总览</h2>
      <p>16型：${result.fullType}（${t.name || ''}）</p>
      <p>九型：${result.ennea.wingLabel} — ${e.name || ''}</p>
      <p>DISC：${result.disc.primary} / ${result.disc.secondary}</p>
      <p>霍兰德：${result.riasec.code}</p>
      <p>A/T：${result.at.label}</p>
      <h2>MBTI 维度</h2>
      <p>E ${result.mbti.dimensions.EI.pctA}% / I ${result.mbti.dimensions.EI.pctB}% · S ${result.mbti.dimensions.SN.pctA}% / N ${result.mbti.dimensions.SN.pctB}% · T ${result.mbti.dimensions.TF.pctA}% / F ${result.mbti.dimensions.TF.pctB}% · J ${result.mbti.dimensions.JP.pctA}% / P ${result.mbti.dimensions.JP.pctB}%</p>
      <h2>大五 OCEAN</h2>
      <p>${Object.entries(result.ocean).map(([k, v]) => `${k}:${v.pct}%`).join(' · ')}</p>
      <h2>解读</h2><p>${t.summary || ''}</p>
      <p class="small">${result.consistency.msg}</p>
    </div>`;
  }

  function printHTML(html, title) {
    const win = window.open('', '_blank');
    if (!win) {
      alert('请允许弹出窗口，或使用 Ctrl+P 打印当前结果页');
      return;
    }
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
      <style>body{font-family:system-ui,sans-serif;padding:24px;line-height:1.6}h1{font-size:20px}h2{font-size:15px;color:#4338ca;margin-top:20px}.small{font-size:12px;color:#64748b}.q{margin:10px 0;border-bottom:1px solid #eee;padding-bottom:8px}</style>
      </head><body>${html}<script>window.onload=function(){window.print()}<\/script></body></html>`);
    win.document.close();
  }

  return {
    downloadQuestionnaire(questions, modules) {
      printHTML(buildQuestionnaireHTML(questions, modules), '人格测评题本');
    },
    downloadResult(result, interpretations) {
      printHTML(buildResultHTML(result, interpretations), '人格测评结果');
    },
  };
})();
