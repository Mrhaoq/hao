const AimTimer = (function () {
  function create(durationMs) {
    return {
      durationMs: Number(durationMs) || 0,
      remainingMs: Number(durationMs) || 0,
      running: false,
      paused: false,
      startAt: 0,
      pauseAccum: 0,
      pauseStartedAt: 0
    };
  }

  function start(state, now) {
    now = now == null ? performance.now() : now;
    state.running = true;
    state.paused = false;
    state.startAt = now;
    state.pauseAccum = 0;
    state.pauseStartedAt = 0;
    state.remainingMs = state.durationMs;
  }

  function pause(state, now) {
    now = now == null ? performance.now() : now;
    if (!state.running || state.paused) return;
    tick(state, now);
    state.paused = true;
    state.pauseStartedAt = now;
  }

  function resume(state, now) {
    now = now == null ? performance.now() : now;
    if (!state.running || !state.paused) return;
    state.pauseAccum += now - state.pauseStartedAt;
    state.paused = false;
    state.pauseStartedAt = 0;
  }

  function tick(state, now) {
    now = now == null ? performance.now() : now;
    if (!state.running || state.paused) return state.remainingMs;
    const elapsed = now - state.startAt - state.pauseAccum;
    state.remainingMs = Math.max(0, state.durationMs - elapsed);
    return state.remainingMs;
  }

  function isDone(state) {
    return !!(state.running && !state.paused && state.remainingMs <= 0);
  }

  function format(ms) {
    const total = Math.max(0, ms) / 1000;
    const whole = Math.floor(total);
    const frac = Math.floor((total - whole) * 10);
    const m = Math.floor(whole / 60);
    const r = whole % 60;
    return m + ':' + String(r).padStart(2, '0') + '.' + frac;
  }

  return {
    create: create,
    start: start,
    pause: pause,
    resume: resume,
    tick: tick,
    isDone: isDone,
    format: format
  };
})();
