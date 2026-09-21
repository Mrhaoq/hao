import { SensMath } from './math';
import { AimModes, type AimMode, type AimStats, type Camera } from './modes';
import { AimTimer, type TimerState } from './timer';

const YAW = 0.07;

export type AimEndResult = {
  kind: string;
  stats: AimStats | null;
  sens: number;
  durationMs: number;
};

export type AimStartOpts = {
  kind: string;
  sens: number;
  durationMs?: number;
  title?: string;
  sub?: string;
  overlayTitle?: string;
  overlaySub?: string;
  onEnd?: (result: AimEndResult) => void;
  onPause?: (reason: string) => void;
};

type OverlayEls = {
  canvas: HTMLCanvasElement;
  stage: HTMLElement;
  overlay: HTMLElement;
  overlayTitle: HTMLElement;
  overlaySub: HTMLElement;
  overlayBtn: HTMLButtonElement;
};

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let stage: HTMLElement | null = null;
let overlay: HTMLElement | null = null;
let overlayTitle: HTMLElement | null = null;
let overlaySub: HTMLElement | null = null;
let overlayBtn: HTMLButtonElement | null = null;
let running = false;
let paused = false;
let camera: Camera = { yaw: 0, pitch: 0 };
let mode: AimMode | null = null;
let modeKind = 'gridshot';
let timer: TimerState | null = null;
let sens = 0.35;
let hud = { title: '', sub: '' };
let lastTs = 0;
let lastMove = 0;
let raf = 0;
let onEnd: ((result: AimEndResult) => void) | null = null;
let onPause: ((reason: string) => void) | null = null;
let wantResume = false;
let overlayAction: (() => void) | null = null;
let lockAt = 0;
let attached = false;

function sizeCanvas() {
  if (!canvas || !stage || !ctx) return;
  const rect = stage.getBoundingClientRect();
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const w = Math.max(320, Math.floor(rect.width));
  const h = Math.max(180, Math.floor(rect.height));
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function cssSize() {
  if (!canvas) return { w: 960, h: 540 };
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  return { w: canvas.width / dpr, h: canvas.height / dpr };
}

function showOverlay(title: string, sub: string, btnText: string, showBtn: boolean) {
  if (!overlay || !overlayTitle || !overlaySub || !overlayBtn) return;
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
  return canvas != null && document.pointerLockElement === canvas;
}

function requestLock() {
  if (!canvas) return;
  const el = canvas as HTMLCanvasElement & {
    requestPointerLock: (options?: { unadjustedMovement?: boolean }) => Promise<void> | void;
  };
  let req: Promise<void> | void;
  try {
    req = el.requestPointerLock({ unadjustedMovement: true });
  } catch {
    req = el.requestPointerLock();
  }
  if (req && typeof req.then === 'function') {
    req.catch(() => {
      try {
        el.requestPointerLock();
      } catch {
        showOverlay('无法锁定鼠标', '请用电脑浏览器，并允许指针锁定后点开始。', '重试', true);
      }
    });
  }
}

function exitLock() {
  if (isPointerLocked() && document.exitPointerLock) document.exitPointerLock();
}

function onMouseMove(e: MouseEvent) {
  if (!running || paused || !isPointerLocked()) return;
  const dx = e.movementX || 0;
  const dy = e.movementY || 0;
  lastMove = Math.hypot(dx, dy);
  camera.yaw += dx * sens * YAW;
  camera.pitch += dy * sens * YAW;
  const { w, h } = cssSize();
  const fv = AimModes.fovV(w / h);
  const lim = fv * 0.48;
  if (camera.pitch > lim) camera.pitch = lim;
  if (camera.pitch < -lim) camera.pitch = -lim;
}

function onLockChange() {
  const locked = isPointerLocked();
  if (stage) stage.classList.toggle('is-locked', locked);
  if (locked) {
    lockAt = performance.now();
    hideOverlay();
    if (wantResume && running && paused && timer) {
      AimTimer.resume(timer);
      paused = false;
      wantResume = false;
    }
    return;
  }
  if (running && !paused) pause('pointer');
}

function onVisibility() {
  if (document.hidden && running && !paused) pause('hidden');
}

function pause(reason: string) {
  if (!running || paused || !timer) return;
  paused = true;
  AimTimer.pause(timer);
  exitLock();
  const why = reason === 'hidden' ? '页面在后台，倒计时已暂停。' : '鼠标锁定已解除，倒计时已暂停。';
  showOverlay('已暂停', why + ' 点击继续，剩余 ' + AimTimer.format(timer.remainingMs) + '。', '继续', true);
  if (onPause) onPause(reason);
}

function drawCrosshair(w: number, h: number) {
  if (!ctx) return;
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

function drawHud(w: number, remaining: number) {
  if (!ctx) return;
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

function drawBg(w: number, h: number) {
  if (!ctx) return;
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

function loop(ts: number) {
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
  if (onEnd) onEnd({ kind, stats, sens: usedSens, durationMs });
}

function start(opts: AimStartOpts) {
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

function attach(opts: OverlayEls) {
  canvas = opts.canvas;
  stage = opts.stage;
  overlay = opts.overlay;
  overlayTitle = opts.overlayTitle;
  overlaySub = opts.overlaySub;
  overlayBtn = opts.overlayBtn;
  ctx = canvas.getContext('2d');
  sizeCanvas();
  if (attached) return;
  attached = true;
  window.addEventListener('resize', sizeCanvas);
  canvas.addEventListener('mousemove', onMouseMove);
  document.addEventListener('pointerlockchange', onLockChange);
  document.addEventListener('visibilitychange', onVisibility);
  overlayBtn.addEventListener('click', (e) => {
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
  overlay.addEventListener('click', (e) => {
    const t = e.target as HTMLElement | null;
    if (t && t.closest && t.closest('button')) return;
    if (overlayAction) return;
    tryBegin();
  });
  canvas.addEventListener('click', () => {
    if (overlay && !overlay.hidden) tryBegin();
  });
  canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (overlay && !overlay.hidden) return;
    if (!running || paused || !isPointerLocked()) return;
    if (performance.now() - lockAt < 280) return;
    if (mode && mode.fire) {
      const size = cssSize();
      mode.fire(performance.now(), camera, size.w, size.h, lastMove);
    }
  });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  if (!raf) raf = requestAnimationFrame(loop);
}

function setHudTitle(text: string) {
  hud.title = text;
}

function setOverlayAction(fn: () => void) {
  overlayAction = fn;
}

export const AimEngine = {
  attach,
  start,
  stop,
  pause,
  tryBegin,
  setHudTitle,
  setOverlayAction,
  isRunning: () => running
};
