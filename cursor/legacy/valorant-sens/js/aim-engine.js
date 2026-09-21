const AimEngine = (function () {
  const YAW = 0.07;
  let canvas = null;
  let ctx = null;
  let stage = null;
  let overlay = null;
  let overlayTitle = null;
  let overlaySub = null;
  let overlayBtn = null;
  let running = false;
  let paused = false;
  let locked = false;
  let camera = { yaw: 0, pitch: 0 };
  let mode = null;
  let modeKind = 'gridshot';
  let timer = null;
  let sens = 0.35;
  let hud = { title: '', sub: '' };
  let lastTs = 0;
  let lastMove = 0;
  let raf = 0;
  let onEnd = null;
  let onPause = null;
  let wantResume = false;
  let overlayAction = null;
  let lockAt = 0;

  function sizeCanvas() {
    if (!canvas || !stage) return;
    const rect = stage.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w = Math.max(320, Math.floor(rect.width));
    const h = Math.max(180, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function cssSize() {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    return {
      w: canvas.width / dpr,
      h: canvas.height / dpr
    };
  }

  function showOverlay(title, sub, btnText, showBtn) {
    if (!overlay) return;
    overlay.hidden = false;
    overlayTitle.textContent = title;
    overlaySub.textContent = sub || '';
    overlayBtn.textContent = btnText || '锁定鼠标并开始';
    overlayBtn.hidden = showBtn === false;
  }

  function hideOverlay() {
    if (overlay) overlay.hidden = true;
  }

  function isPointerLocked() {
    return document.pointerLockElement === canvas;
  }

  function requestLock() {
    if (!canvas) return;
    let req;
    try {
      req = canvas.requestPointerLock({ unadjustedMovement: true });
    } catch (err) {
      req = canvas.requestPointerLock();
    }
    if (req && typeof req.then === 'function') {
      req.catch(function () {
        try {
          canvas.requestPointerLock();
        } catch (err2) {
          showOverlay('无法锁定鼠标', '请用电脑浏览器，并允许指针锁定后点开始。', '重试', true);
        }
      });
    }
  }

  function exitLock() {
    if (isPointerLocked() && document.exitPointerLock) document.exitPointerLock();
  }

  function onMouseMove(e) {
    if (!running || paused || !isPointerLocked()) return;
    const dx = e.movementX || 0;
    const dy = e.movementY || 0;
    lastMove = Math.hypot(dx, dy);
    camera.yaw += dx * sens * YAW;
    camera.pitch += dy * sens * YAW;
    const { h } = cssSize();
    const fv = AimModes.fovV(cssSize().w / h);
    const lim = fv * 0.48;
    if (camera.pitch > lim) camera.pitch = lim;
    if (camera.pitch < -lim) camera.pitch = -lim;
  }

  function onLockChange() {
    locked = isPointerLocked();
    if (stage) stage.classList.toggle('is-locked', locked);
    if (locked) {
      lockAt = performance.now();
      hideOverlay();
      if (wantResume && running && paused) {
        AimTimer.resume(timer);
        paused = false;
        wantResume = false;
      }
      return;
    }
    if (running && !paused) {
      pause('pointer');
    }
  }

  function onVisibility() {
    if (document.hidden && running && !paused) pause('hidden');
  }

  function pause(reason) {
    if (!running || paused) return;
    paused = true;
    AimTimer.pause(timer);
    exitLock();
    const why = reason === 'hidden' ? '页面在后台，倒计时已暂停。' : '鼠标锁定已解除，倒计时已暂停。';
    showOverlay('已暂停', why + ' 点击继续，剩余 ' + AimTimer.format(timer.remainingMs) + '。', '继续', true);
    if (onPause) onPause(reason);
  }

  function drawCrosshair(w, h) {
    const cx = w / 2;
    const cy = h / 2;
    ctx.save();
    ctx.strokeStyle = '#67e8f9';
    ctx.fillStyle = '#67e8f9';
    ctx.lineWidth = 2;
    const gap = 5;
    const len = 11;
    ctx.beginPath();
    ctx.moveTo(cx, cy - gap - len);
    ctx.lineTo(cx, cy - gap);
    ctx.moveTo(cx, cy + gap);
    ctx.lineTo(cx, cy + gap + len);
    ctx.moveTo(cx - gap - len, cy);
    ctx.lineTo(cx - gap, cy);
    ctx.moveTo(cx + gap, cy);
    ctx.lineTo(cx + gap + len, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawHud(w, remaining) {
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
    ctx.fillRect(0, 0, w, 44);
    ctx.fillRect(0, cssSize().h - 36, w, 36);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 14px system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(hud.title || modeKind, 12, 22);
    ctx.fillStyle = '#67e8f9';
    ctx.font = '700 22px ui-monospace, Consolas, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(AimTimer.format(remaining), w - 14, 22);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px system-ui, sans-serif';
    const st = mode && mode.stats ? mode.stats() : null;
    const needsFire = mode && mode.needsFire;
    let line = '灵敏度 ' + SensMath.formatSensGame(sens);
    if (needsFire && st) {
      const hs = st.headshots || 0;
      const shots = st.shots || 0;
      line = '爆头 ' + hs + ' / 开枪 ' + shots + '  ·  左键开火  ·  ' + line;
    } else if (st) {
      line = '贴住头部计分  ·  本关不用开枪  ·  ' + line;
    }
    ctx.fillText(line, 12, cssSize().h - 18);
    ctx.restore();
  }

  function drawBg(w, h) {
    ctx.fillStyle = '#070d18';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    const step = 48;
    for (let x = (w / 2) % step; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = (h / 2) % step; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  function loop(ts) {
    raf = requestAnimationFrame(loop);
    if (!ctx || !canvas) return;
    const { w, h } = cssSize();
    if (!lastTs) lastTs = ts;
    const dt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;

    const remaining = timer ? AimTimer.tick(timer, performance.now()) : 0;

    if (running && !paused && mode) {
      mode.update(dt, ts, camera, w, h, lastMove);
      lastMove *= 0.4;
    }

    drawBg(w, h);
    if (mode) mode.draw(ctx, camera, w, h);
    drawCrosshair(w, h);
    drawHud(w, remaining);

    if (running && !paused && timer && AimTimer.isDone(timer)) {
      finish();
    }
  }

  function finish() {
    running = false;
    paused = false;
    exitLock();
    const stats = mode ? mode.stats() : null;
    const kind = modeKind;
    const usedSens = sens;
    const durationMs = timer ? timer.durationMs : 0;
    showOverlay('本关结束', '正在结算…', '下一关', false);
    if (onEnd) onEnd({ kind: kind, stats: stats, sens: usedSens, durationMs: durationMs });
  }

  function start(opts) {
    opts = opts || {};
    sizeCanvas();
    const { w, h } = cssSize();
    camera = { yaw: 0, pitch: 0 };
    sens = Number(opts.sens) || 0.35;
    modeKind = opts.kind || 'gridshot';
    hud = { title: opts.title || modeKind, sub: opts.sub || '' };
    onEnd = opts.onEnd || null;
    onPause = opts.onPause || null;
    overlayAction = null;
    mode = AimModes.create(modeKind, camera, w, h);
    timer = AimTimer.create(opts.durationMs || AimModes.duration(modeKind));
    running = true;
    paused = true;
    wantResume = true;
    lastTs = 0;
    lastMove = 0;
    lockAt = 0;
    AimTimer.start(timer, performance.now());
    AimTimer.pause(timer, performance.now());
    const hint = AimModes.fireHint(modeKind);
    showOverlay(
      opts.overlayTitle || '点击锁定鼠标',
      opts.overlaySub || (hint + '。倒计时在锁定后才会走。'),
      '锁定鼠标并开始',
      true
    );
  }

  function stop() {
    running = false;
    paused = false;
    wantResume = false;
    mode = null;
    exitLock();
  }

  function tryBegin() {
    if (!running) return;
    wantResume = true;
    requestLock();
  }

  function attach(opts) {
    canvas = opts.canvas;
    stage = opts.stage;
    overlay = opts.overlay;
    overlayTitle = opts.overlayTitle;
    overlaySub = opts.overlaySub;
    overlayBtn = opts.overlayBtn;
    ctx = canvas.getContext('2d');
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);
    canvas.addEventListener('mousemove', onMouseMove);
    document.addEventListener('pointerlockchange', onLockChange);
    document.addEventListener('visibilitychange', onVisibility);
    overlayBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (overlayAction) {
        const fn = overlayAction;
        overlayAction = null;
        fn();
        return;
      }
      tryBegin();
    });
    overlay.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('button')) return;
      if (overlayAction) return;
      tryBegin();
    });
    canvas.addEventListener('click', function () {
      if (overlay && !overlay.hidden) tryBegin();
    });
    canvas.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      if (overlay && !overlay.hidden) return;
      if (!running || paused || !isPointerLocked()) return;
      if (performance.now() - lockAt < 280) return;
      if (mode && mode.fire) {
        const size = cssSize();
        mode.fire(performance.now(), camera, size.w, size.h, lastMove);
      }
    });
    canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    if (!raf) raf = requestAnimationFrame(loop);
  }

  function setHudTitle(text) {
    hud.title = text;
  }

  function setOverlayAction(fn) {
    overlayAction = fn;
  }

  return {
    attach: attach,
    start: start,
    stop: stop,
    pause: pause,
    tryBegin: tryBegin,
    setHudTitle: setHudTitle,
    setOverlayAction: setOverlayAction,
    isRunning: function () { return running; }
  };
})();
