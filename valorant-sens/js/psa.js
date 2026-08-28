const ValSensPsa = (function () {
  const TOTAL = 7;
  const MIN_SENS = 0.001;
  const MAX_SENS = 20;
  const VAL_YAW = 0.07;

  function $(id) { return document.getElementById(id); }

  function clamp(n) {
    return Math.min(MAX_SENS, Math.max(MIN_SENS, n));
  }

  function candidates(session) {
    return {
      lower: clamp(session.estimate - session.range),
      higher: clamp(session.estimate + session.range)
    };
  }

  function startSession(baseSens, dpi) {
    const estimate = clamp(Number(baseSens));
    return {
      round: 1,
      estimate: estimate,
      range: estimate * 0.5,
      baseSens: estimate,
      dpi: Number(dpi) || 800,
      yaw: VAL_YAW,
      choices: [],
      done: false,
      finalSens: null
    };
  }

  function applyPick(session, which) {
    const c = candidates(session);
    const chosen = which === 'higher' ? c.higher : c.lower;
    const nextEstimate = clamp((session.estimate + chosen) / 2);
    const nextRange = session.range / 2;
    const choices = session.choices.concat([{
      round: session.round,
      pick: which,
      lower: c.lower,
      higher: c.higher,
      estimate: session.estimate
    }]);
    const finished = session.round >= TOTAL;
    return {
      round: finished ? session.round : session.round + 1,
      estimate: nextEstimate,
      range: nextRange,
      baseSens: session.baseSens,
      dpi: session.dpi,
      yaw: session.yaw,
      choices: choices,
      done: finished,
      finalSens: finished ? nextEstimate : null
    };
  }

  function persist(session) {
    ValSensStorage.patch({ psaSession: session });
  }

  function renderChoices(session) {
    const ol = $('psa-choices');
    ol.replaceChildren();
    if (!session || !session.choices.length) {
      const li = document.createElement('li');
      li.textContent = '还没有选择。';
      ol.appendChild(li);
      return;
    }
    session.choices.forEach(function (c) {
      const li = document.createElement('li');
      li.textContent = '第 ' + c.round + ' 轮：选' + (c.pick === 'higher' ? '偏高' : '偏低') +
        '（低 ' + SensMath.formatSens(c.lower) + ' / 高 ' + SensMath.formatSens(c.higher) + '）';
      ol.appendChild(li);
    });
  }

  function showDone(session) {
    const done = !!(session && session.done);
    $('psa-done-card').hidden = !done;
    if (!done) return;
    const cm = SensMath.cm360(session.dpi, session.finalSens, session.yaw);
    $('psa-final-sens').textContent = SensMath.formatSens(session.finalSens);
    $('psa-final-dpi').textContent = String(session.dpi);
    $('psa-final-edpi').textContent = SensMath.formatEdpi(SensMath.edpi(session.dpi, session.finalSens));
    $('psa-final-cm').textContent = SensMath.formatCm(cm);
    ValSensApp.setHipfire({
      dpi: session.dpi,
      sens: session.finalSens,
      yaw: session.yaw,
      gameId: 'valorant',
      cm360: cm
    });
  }

  function render(session) {
    if (!session) {
      $('psa-round-text').textContent = '尚未开始';
      $('psa-estimate').textContent = '—';
      $('psa-lower').textContent = '—';
      $('psa-higher').textContent = '—';
      $('psa-cm').textContent = '—';
      $('psa-pick-lower').disabled = true;
      $('psa-pick-higher').disabled = true;
      $('psa-done-card').hidden = true;
      renderChoices(null);
      return;
    }
    const c = candidates(session);
    const remaining = session.done ? 0 : (TOTAL - session.round + 1);
    $('psa-round-text').textContent = session.done
      ? '已完成 7 轮'
      : ('第 ' + session.round + ' / ' + TOTAL + ' 轮 · 剩余 ' + remaining + ' 轮');
    $('psa-estimate').textContent = SensMath.formatSens(session.estimate);
    $('psa-lower').textContent = SensMath.formatSens(c.lower);
    $('psa-higher').textContent = SensMath.formatSens(c.higher);
    $('psa-cm').textContent = SensMath.formatCm(SensMath.cm360(session.dpi, session.estimate, session.yaw));
    $('psa-pick-lower').disabled = session.done;
    $('psa-pick-higher').disabled = session.done;
    renderChoices(session);
    showDone(session);
  }

  function begin() {
    const session = startSession($('psa-base').value, $('psa-dpi').value);
    persist(session);
    render(session);
  }

  function pick(which) {
    const session = ValSensStorage.load().psaSession;
    if (!session || session.done) return;
    const next = applyPick(session, which);
    persist(next);
    render(next);
    if (next.done) {
      ValSensStorage.addHistory({
        finalSens: next.finalSens,
        dpi: next.dpi,
        cm360: SensMath.cm360(next.dpi, next.finalSens, next.yaw),
        source: 'psa'
      });
      ValSensApp.renderHistory();
    }
  }

  function importBase(sens, dpi) {
    $('psa-base').value = Number(sens).toFixed(6);
    $('psa-dpi').value = String(dpi);
  }

  function init() {
    const saved = ValSensStorage.load();
    if (saved.psaSession && saved.psaSession.baseSens) {
      $('psa-base').value = saved.psaSession.baseSens;
      $('psa-dpi').value = saved.psaSession.dpi;
    }
    $('psa-start').addEventListener('click', begin);
    $('psa-import').addEventListener('click', function () {
      const hip = ValSensApp.getHipfire();
      if (hip && hip.sens) importBase(hip.sens, hip.dpi);
    });
    $('psa-pick-lower').addEventListener('click', function () { pick('lower'); });
    $('psa-pick-higher').addEventListener('click', function () { pick('higher'); });
    $('psa-copy').addEventListener('click', function () {
      const s = ValSensStorage.load().psaSession;
      if (s && s.finalSens) ValSensApp.copyText(SensMath.formatSens(s.finalSens));
    });
    $('psa-to-tune').addEventListener('click', function () {
      const s = ValSensStorage.load().psaSession;
      if (s && s.finalSens) ValSensTune.importCenter(s.finalSens, s.dpi);
      ValSensApp.showTab('tune');
    });
    render(saved.psaSession);
  }

  return { init: init, importBase: importBase };
})();
