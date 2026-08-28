const ValSensWizard = (function () {
  const VAL_YAW = 0.07;
  const MIN_SENS = 0.05;
  const MAX_SENS = 5;
  const MAX_ROUNDS = 3;
  const MODES = ['gridshot', 'tracking', 'micro'];
  const WEIGHT = { gridshot: 0.35, tracking: 0.35, micro: 0.3 };

  function $(id) { return document.getElementById(id); }

  function clamp(n) {
    return Math.min(MAX_SENS, Math.max(MIN_SENS, n));
  }

  function habits() {
    const on = {};
    document.querySelectorAll('#wz-habits .vs-chip').forEach(function (btn) {
      on[btn.getAttribute('data-habit')] = btn.classList.contains('is-on');
    });
    return on;
  }

  function baseCm(h) {
    let cm = 40;
    if (h.wrist && !h.arm) cm = 32;
    if (h.arm && !h.wrist) cm = 48;
    if (h.flick && !h.track) cm *= 0.9;
    if (h.track && !h.flick) cm *= 1.1;
    return cm;
  }

  function startSensFromProfile() {
    const dpi = Number($('wz-dpi').value) || 800;
    const old = Number($('wz-old-sens').value);
    if (old > 0) return clamp(old);
    return clamp(SensMath.sensFromCm360(dpi, baseCm(habits()), VAL_YAW));
  }

  function persistProfile() {
    const h = habits();
    ValSensStorage.patch({
      profile: {
        dpi: $('wz-dpi').value,
        oldSens: $('wz-old-sens').value,
        habits: h
      }
    });
  }

  function renderPreview() {
    const dpi = Number($('wz-dpi').value) || 800;
    const sens = startSensFromProfile();
    $('wz-start-sens').textContent = SensMath.formatSensGame(sens);
    $('wz-start-cm').textContent = SensMath.formatCm(SensMath.cm360(dpi, sens, VAL_YAW));
    persistProfile();
  }

  function emptySession(kind, dpi, estimate, rangeFrac) {
    return {
      kind: kind || 'full',
      dpi: dpi,
      estimate: estimate,
      rangeFrac: rangeFrac,
      round: 1,
      modeIndex: 0,
      roundSignals: [],
      log: [],
      ab: null,
      done: false,
      finalSens: null
    };
  }

  function persistSession(session) {
    ValSensStorage.patch({ wizardSession: session });
  }

  function modeTitle(session) {
    const names = { gridshot: 'Gridshot', tracking: '跟枪 Tracking', micro: '微修正 Micro' };
    const kind = MODES[session.modeIndex];
    if (session.kind === 'free') return '自由训练 · ' + names[kind];
    if (session.kind === 'ab') return session.ab && session.ab.phase === 'b' ? 'A/B · 偏高候选' : 'A/B · 偏低候选';
    return '第 ' + session.round + ' / ' + MAX_ROUNDS + ' 轮 · ' + names[kind];
  }

  function applyRound(session) {
    let combined = 0;
    session.roundSignals.forEach(function (s) {
      combined += (WEIGHT[s.kind] || 0.33) * s.combined;
    });
    combined = Math.max(-1, Math.min(1, combined));
    const next = clamp(session.estimate * (1 + combined * session.rangeFrac));
    const nextRange = session.rangeFrac * 0.5;
    session.log.push({
      round: session.round,
      estimate: session.estimate,
      next: next,
      combined: combined,
      signals: session.roundSignals.slice()
    });
    session.estimate = next;
    session.rangeFrac = nextRange;
    session.roundSignals = [];
    return combined;
  }

  function finishSession(session, source) {
    session.done = true;
    session.finalSens = clamp(session.estimate);
    persistSession(session);
    const cm = SensMath.cm360(session.dpi, session.finalSens, VAL_YAW);
    ValSensApp.setHipfire({
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
        log: session.log
      }
    });
    ValSensStorage.addHistory({
      finalSens: session.finalSens,
      dpi: session.dpi,
      cm360: cm,
      source: source || 'wizard'
    });
    ValSensApp.renderHistory();
    ValSensApp.renderResult();
    AimEngine.stop();
    ValSensApp.showTab('result');
  }

  function launchCurrent(session) {
    persistSession(session);
    ValSensApp.showTab('play');
    $('play-meta').textContent = modeTitle(session);
    $('play-sens-line').textContent = '当前灵敏度 ' + SensMath.formatSensGame(session.estimate) +
      ' @ ' + session.dpi + ' DPI';
    let kind = MODES[session.modeIndex];
    let testSens = session.estimate;
    if (session.kind === 'ab' && session.ab) {
      kind = 'gridshot';
      testSens = session.ab.phase === 'b' ? session.ab.higher : session.ab.lower;
      $('play-sens-line').textContent = (session.ab.phase === 'b' ? '偏高 ' : '偏低 ') +
        SensMath.formatSensGame(testSens) + ' @ ' + session.dpi + ' DPI';
    }
    AimEngine.setHudTitle(modeTitle(session));
    AimEngine.start({
      kind: kind,
      sens: testSens,
      durationMs: session.kind === 'ab' ? 20000 : AimModes.duration(kind),
      title: modeTitle(session),
      overlayTitle: '点击锁定鼠标并开始',
      overlaySub: '准星碰到靶即命中，无需点击。倒计时在锁定后开始。',
      onEnd: function (result) {
        onModeEnd(session, result);
      }
    });
  }

  function onModeEnd(session, result) {
    const sig = AimModes.signalFromStats(result.kind, result.stats, result.durationMs);
    sig.kind = result.kind;
    sig.sens = result.sens;

    if (session.kind === 'free') {
      persistSession(null);
      const overlayTitle = document.getElementById('play-overlay-title');
      const overlaySub = document.getElementById('play-overlay-sub');
      const overlayBtn = document.getElementById('play-overlay-btn');
      overlayTitle.textContent = '自由训练结束';
      overlaySub.textContent = '命中 ' + sig.hits + ' · 过冲 ' + sig.overshoots +
        ' · 信号 ' + (sig.combined > 0.15 ? '略偏低敏' : sig.combined < -0.15 ? '略偏高敏' : '接近合适');
      overlayBtn.hidden = false;
      overlayBtn.textContent = '返回向导';
      AimEngine.setOverlayAction(function () {
        AimEngine.stop();
        ValSensApp.showTab('wizard');
      });
      document.getElementById('play-overlay').hidden = false;
      return;
    }

    if (session.kind === 'ab') {
      if (session.ab.phase === 'a') {
        session.ab.scoreA = sig.hits - sig.overshoots * 0.4 + (sig.combined > 0 ? 0 : 0.2);
        session.ab.phase = 'b';
        launchCurrent(session);
        return;
      }
      session.ab.scoreB = sig.hits - sig.overshoots * 0.4;
      const pickHigh = session.ab.scoreB >= session.ab.scoreA;
      session.estimate = clamp(pickHigh ? session.ab.higher : session.ab.lower);
      session.log.push({
        round: 'A/B',
        pick: pickHigh ? 'higher' : 'lower',
        lower: session.ab.lower,
        higher: session.ab.higher,
        scoreA: session.ab.scoreA,
        scoreB: session.ab.scoreB
      });
      finishSession(session, session.kind === 'ab' && session.fromToolbox ? 'ab' : 'wizard');
      return;
    }

    session.roundSignals.push(sig);
    session.modeIndex += 1;
    if (session.modeIndex < MODES.length) {
      launchCurrent(session);
      return;
    }
    applyRound(session);
    const converged = session.rangeFrac < 0.03;
    const lastRound = session.round >= MAX_ROUNDS;
    if (session.retune) {
      finishSession(session, 'wizard');
      return;
    }
    if (!converged && !lastRound) {
      session.round += 1;
      session.modeIndex = 0;
      launchCurrent(session);
      return;
    }
    session.kind = 'ab';
    session.ab = {
      phase: 'a',
      lower: clamp(session.estimate * (1 - Math.max(0.04, session.rangeFrac))),
      higher: clamp(session.estimate * (1 + Math.max(0.04, session.rangeFrac)))
    };
    launchCurrent(session);
  }

  function beginFull() {
    const dpi = Number($('wz-dpi').value) || 800;
    const estimate = startSensFromProfile();
    const session = emptySession('full', dpi, estimate, 0.35);
    launchCurrent(session);
  }

  function beginRetune() {
    const hip = ValSensApp.getHipfire();
    const dpi = (hip && hip.dpi) || Number($('wz-dpi').value) || 800;
    const estimate = clamp((hip && hip.sens) || startSensFromProfile());
    const session = emptySession('full', dpi, estimate, 0.08);
    session.round = MAX_ROUNDS;
    session.retune = true;
    launchCurrent(session);
  }

  function beginFree(kind) {
    const dpi = Number($('wz-dpi').value) || 800;
    const estimate = startSensFromProfile();
    const session = emptySession('free', dpi, estimate, 0);
    session.modeIndex = Math.max(0, MODES.indexOf(kind));
    launchCurrent(session);
  }

  function beginAb(lower, higher, dpi) {
    const session = emptySession('ab', Number(dpi) || 800, (Number(lower) + Number(higher)) / 2, 0.05);
    session.fromToolbox = true;
    session.ab = { phase: 'a', lower: clamp(Number(lower)), higher: clamp(Number(higher)) };
    launchCurrent(session);
  }

  function abort() {
    AimEngine.stop();
    persistSession(null);
    ValSensApp.showTab('wizard');
  }

  function importProfile(sens, dpi) {
    if (dpi) $('wz-dpi').value = String(dpi);
    if (sens) $('wz-old-sens').value = Number(sens).toFixed(3);
    renderPreview();
  }

  function restoreProfile() {
    const saved = ValSensStorage.load().profile;
    if (!saved) return;
    if (saved.dpi) $('wz-dpi').value = saved.dpi;
    if (saved.oldSens) $('wz-old-sens').value = saved.oldSens;
    if (saved.habits) {
      document.querySelectorAll('#wz-habits .vs-chip').forEach(function (btn) {
        const key = btn.getAttribute('data-habit');
        btn.classList.toggle('is-on', !!saved.habits[key]);
      });
    }
  }

  function init() {
    restoreProfile();
    document.querySelectorAll('#wz-habits .vs-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.getAttribute('data-habit');
        if (key === 'wrist') {
          document.querySelector('[data-habit="arm"]').classList.remove('is-on');
        }
        if (key === 'arm') {
          document.querySelector('[data-habit="wrist"]').classList.remove('is-on');
        }
        btn.classList.toggle('is-on');
        renderPreview();
      });
    });
    ['wz-dpi', 'wz-old-sens'].forEach(function (id) {
      $(id).addEventListener('input', renderPreview);
    });
    $('wz-start').addEventListener('click', beginFull);
    document.querySelectorAll('[data-free]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        beginFree(btn.getAttribute('data-free'));
      });
    });
    $('play-abort').addEventListener('click', abort);
    renderPreview();
  }

  return {
    init: init,
    importProfile: importProfile,
    beginRetune: beginRetune,
    beginAb: beginAb,
    startSensFromProfile: startSensFromProfile
  };
})();
