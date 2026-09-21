export const FOV_H = 103;

export type Camera = { yaw: number; pitch: number };

export type AimStats = {
  hits: number;
  headshots: number;
  bodyshots: number;
  shots: number;
  misses: number;
  overshoots: number;
  slashHits: number;
  sumTime: number;
  timeN: number;
  sumSync: number;
  syncN: number;
  onFrames: number;
  offFrames: number;
  enters: number;
  lagSum: number;
  lagN: number;
  lastMove: number;
};

export type AimSignal = {
  tooHigh: number;
  tooLow: number;
  combined: number;
  hits: number;
  headshots: number;
  bodyshots: number;
  shots: number;
  misses: number;
  overshoots: number;
  hsRate: number;
  abScore: number;
  kind?: string;
  sens?: number;
};

export type AimMode = {
  label: string;
  kind: string;
  needsFire: boolean;
  update: (dt: number, now: number, camera: Camera, w: number, h: number, moveLen: number) => void;
  fire?: (now: number, camera: Camera, w: number, h: number, moveLen: number) => string | null;
  draw: (ctx: CanvasRenderingContext2D, camera: Camera, w: number, h: number) => void;
  stats: () => AimStats;
};

type Bot = {
  yaw: number;
  pitch: number;
  headR: number;
  bodyW: number;
  bodyH: number;
  spawnedAt: number;
  minDist: number;
  close: boolean;
  onHeadSince: number;
};

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export function wrapDeg(d: number) {
  d = d % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

export function fovV(aspect: number) {
  const h = (FOV_H * Math.PI) / 180;
  return (2 * Math.atan(Math.tan(h / 2) / aspect) * 180) / Math.PI;
}

function project(target: { yaw: number; pitch: number }, camera: Camera, w: number, h: number) {
  const aspect = w / h;
  const fv = fovV(aspect);
  const dx = wrapDeg(target.yaw - camera.yaw);
  const dy = target.pitch - camera.pitch;
  return {
    x: w / 2 + (dx / FOV_H) * w,
    y: h / 2 + (dy / fv) * h,
    dx,
    dy
  };
}

function distToCross(p: { x: number; y: number }, w: number, h: number) {
  return Math.hypot(p.x - w / 2, p.y - h / 2);
}

function tooClose(yaw: number, pitch: number, avoid: Bot[], sep: number) {
  if (!avoid || !avoid.length) return false;
  for (let i = 0; i < avoid.length; i += 1) {
    const a = avoid[i];
    if (Math.hypot(wrapDeg(yaw - a.yaw), pitch - a.pitch) < sep) return true;
  }
  return false;
}

function spawnBot(
  camera: Camera,
  spec: { line?: boolean; minDeg: number; maxDeg: number; sepDeg: number; headR: number; bodyW: number; bodyH: number },
  avoid: Bot[],
  w: number,
  h: number
): Bot {
  const aspect = w / h;
  const fv = fovV(aspect);
  let yaw = 0;
  let pitch = 0;
  let tries = 0;
  do {
    if (spec.line) {
      const side = Math.random() < 0.5 ? -1 : 1;
      yaw = camera.yaw + side * rand(spec.minDeg, spec.maxDeg);
      pitch = camera.pitch + rand(-0.8, 0.8);
    } else {
      const ang = rand(spec.minDeg, spec.maxDeg);
      const dir = rand(0, Math.PI * 2);
      yaw = camera.yaw + Math.cos(dir) * ang;
      pitch = camera.pitch + Math.sin(dir) * ang * (fv / FOV_H);
    }
    pitch = Math.max(-fv * 0.38, Math.min(fv * 0.32, pitch));
    tries += 1;
  } while (tries < 12 && tooClose(yaw, pitch, avoid, spec.sepDeg));
  return {
    yaw,
    pitch,
    headR: spec.headR,
    bodyW: spec.bodyW,
    bodyH: spec.bodyH,
    spawnedAt: 0,
    minDist: 1e9,
    close: false,
    onHeadSince: 0
  };
}

function hitZone(bot: Bot, w: number, h: number, p: { x: number; y: number }) {
  const cx = w / 2;
  const cy = h / 2;
  const hx = p.x;
  const hy = p.y;
  const headD = Math.hypot(cx - hx, cy - hy);
  if (headD <= bot.headR) return 'head';
  const left = hx - bot.bodyW / 2;
  const top = hy + bot.headR * 0.12;
  if (cx >= left && cx <= left + bot.bodyW && cy >= top && cy <= top + bot.bodyH) return 'body';
  return null;
}

function drawBot(ctx: CanvasRenderingContext2D, p: { x: number; y: number }, bot: Bot, highlight: string | null) {
  const hx = p.x;
  const hy = p.y;
  ctx.save();
  ctx.fillStyle = highlight === 'body' ? '#fb923c' : '#475569';
  const x = hx - bot.bodyW / 2;
  const y = hy + bot.headR * 0.12;
  const r = 5;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + bot.bodyW - r, y);
  ctx.quadraticCurveTo(x + bot.bodyW, y, x + bot.bodyW, y + r);
  ctx.lineTo(x + bot.bodyW, y + bot.bodyH - r);
  ctx.quadraticCurveTo(x + bot.bodyW, y + bot.bodyH, x + bot.bodyW - r, y + bot.bodyH);
  ctx.lineTo(x + r, y + bot.bodyH);
  ctx.quadraticCurveTo(x, y + bot.bodyH, x, y + bot.bodyH - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.fill();
  const g = ctx.createRadialGradient(hx - bot.headR * 0.2, hy - bot.headR * 0.25, 2, hx, hy, bot.headR);
  g.addColorStop(0, highlight === 'head' ? '#fef08a' : '#fed7aa');
  g.addColorStop(1, highlight === 'head' ? '#f59e0b' : '#ea580c');
  ctx.beginPath();
  ctx.arc(hx, hy, bot.headR, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.restore();
}

function emptyStats(): AimStats {
  return {
    hits: 0,
    headshots: 0,
    bodyshots: 0,
    shots: 0,
    misses: 0,
    overshoots: 0,
    slashHits: 0,
    sumTime: 0,
    timeN: 0,
    sumSync: 0,
    syncN: 0,
    onFrames: 0,
    offFrames: 0,
    enters: 0,
    lagSum: 0,
    lagN: 0,
    lastMove: 0
  };
}

function hsRate(stats: AimStats) {
  const n = stats.headshots + stats.bodyshots;
  if (!n) return 0;
  return stats.headshots / n;
}

function abScore(stats: AimStats) {
  const hs = hsRate(stats);
  const shots = Math.max(1, stats.shots);
  return hs * 12 + stats.headshots * 1.2 + stats.bodyshots * 0.25 -
    stats.misses * 0.55 - stats.overshoots * 0.35 - (stats.misses / shots) * 2;
}

export function signalFromStats(kind: string, stats: AimStats, durationMs: number): AimSignal {
  const seconds = Math.max(0.001, durationMs / 1000);
  let tooHigh = 0;
  let tooLow = 0;

  if (kind === 'tracking') {
    const total = stats.onFrames + stats.offFrames;
    const onRatio = total ? stats.onFrames / total : 0;
    const jitter = stats.enters / seconds;
    const lag = stats.lagN ? stats.lagSum / stats.lagN : 0;
    tooHigh = Math.min(1, jitter / 6);
    tooLow = Math.min(1, (1 - onRatio) * 0.7 + Math.max(0, lag) * 0.6);
    if (onRatio > 0.72 && jitter < 2.5) {
      tooHigh *= 0.35;
      tooLow *= 0.35;
    }
  } else {
    const shots = Math.max(1, stats.shots);
    const tps = stats.hits / seconds;
    const avgT = stats.timeN ? stats.sumTime / stats.timeN : 0.95;
    const over = stats.overshoots / shots;
    const miss = stats.misses / shots;
    const bodyShare = stats.hits ? stats.bodyshots / stats.hits : 0;
    const hs = hsRate(stats);
    tooHigh = Math.min(1, over * 0.55 + miss * 0.35 + bodyShare * 0.35);
    tooLow = Math.min(1, Math.max(0, (0.42 - tps) / 0.42) * 0.55 +
      Math.max(0, (avgT - 0.42) / 0.75) * 0.45);
    if (stats.shots === 0) tooLow = 1;
    if (hs > 0.7 && miss < 0.25) {
      tooHigh *= 0.45;
      tooLow *= 0.45;
    }
  }

  const combined = Math.max(-1, Math.min(1, tooLow - tooHigh));
  return {
    tooHigh,
    tooLow,
    combined,
    hits: stats.hits,
    headshots: stats.headshots || 0,
    bodyshots: stats.bodyshots || 0,
    shots: stats.shots || 0,
    misses: stats.misses || 0,
    overshoots: stats.overshoots,
    hsRate: hsRate(stats),
    abScore: abScore(stats)
  };
}

function makeBotMode(spec: {
  kind: string;
  label: string;
  count: number;
  line?: boolean;
  minDeg: number;
  maxDeg: number;
  sepDeg: number;
  headR: number;
  bodyW: number;
  bodyH: number;
}) {
  return function create(camera: Camera, w: number, h: number): AimMode {
    const bots: Bot[] = [];
    const stats = emptyStats();
    const count = spec.count;

    function refill(now: number, cam: Camera, width: number, height: number) {
      while (bots.length < count) {
        const t = spawnBot(cam, spec, bots, width, height);
        t.spawnedAt = now;
        bots.push(t);
      }
    }

    refill(0, camera, w, h);

    return {
      label: spec.label,
      kind: spec.kind,
      needsFire: true,
      update(dt, now, cameraNow, wNow, hNow, moveLen) {
        stats.lastMove = moveLen;
        refill(now, cameraNow, wNow, hNow);
        const cx = wNow / 2;
        const cy = hNow / 2;
        bots.forEach((t) => {
          const p = project(t, cameraNow, wNow, hNow);
          const d = Math.hypot(p.x - cx, p.y - cy);
          if (d < t.minDist) t.minDist = d;
          const zone = hitZone(t, wNow, hNow, p);
          if (zone === 'head') {
            if (!t.onHeadSince) t.onHeadSince = now;
          } else {
            if (t.close && d > t.headR * 2.4) {
              stats.overshoots += 1;
              t.close = false;
            }
            t.onHeadSince = 0;
          }
          if (zone) t.close = true;
        });
      },
      fire(now, cameraNow, wNow, hNow, moveLen) {
        stats.shots += 1;
        for (let i = 0; i < bots.length; i += 1) {
          const t = bots[i];
          const p = project(t, cameraNow, wNow, hNow);
          const zone = hitZone(t, wNow, hNow, p);
          if (!zone) continue;
          stats.hits += 1;
          stats.sumTime += Math.max(0, (now - t.spawnedAt) / 1000);
          stats.timeN += 1;
          if (moveLen > t.headR * 1.4) stats.slashHits += 1;
          if (zone === 'head') {
            stats.headshots += 1;
            if (t.onHeadSince) {
              stats.sumSync += Math.max(0, (now - t.onHeadSince) / 1000);
              stats.syncN += 1;
            }
          } else {
            stats.bodyshots += 1;
          }
          bots.splice(i, 1);
          return zone;
        }
        stats.misses += 1;
        return null;
      },
      draw(ctx, cameraNow, wNow, hNow) {
        bots.forEach((t) => {
          const p = project(t, cameraNow, wNow, hNow);
          const zone = hitZone(t, wNow, hNow, p);
          drawBot(ctx, p, t, zone);
        });
      },
      stats() {
        return stats;
      }
    };
  };
}

function makeTracking() {
  return function create(camera: Camera, w: number, h: number): AimMode {
    const fv = fovV(w / h);
    const origin = { yaw: camera.yaw, pitch: camera.pitch };
    const target = { yaw: camera.yaw, pitch: camera.pitch, r: 34 };
    const stats = emptyStats();
    let t = 0;
    let prevX = 0;
    let prevY = 0;
    let wasOn = false;
    const ampY = FOV_H * 0.18;
    const ampP = fv * 0.14;

    return {
      label: '跟枪 Tracking',
      kind: 'tracking',
      needsFire: false,
      update(dt, now, cameraNow, wNow, hNow, moveLen) {
        stats.lastMove = moveLen;
        t += dt;
        const ny = origin.yaw + Math.sin(t * 1.05) * ampY;
        const np = origin.pitch + Math.sin(t * 1.55 + 0.4) * ampP;
        target.yaw = ny;
        target.pitch = np;
        const p = project(target, cameraNow, wNow, hNow);
        const d = distToCross(p, wNow, hNow);
        const on = d <= target.r;
        if (on) stats.onFrames += 1;
        else stats.offFrames += 1;
        if (on && !wasOn) stats.enters += 1;
        wasOn = on;
        if (!on) {
          const tdx = p.x - wNow / 2;
          const tdy = p.y - hNow / 2;
          const tvx = p.x - prevX;
          const tvy = p.y - prevY;
          const tspeed = Math.hypot(tvx, tvy);
          if (tspeed > 0.2) {
            const lag = -(tdx * tvx + tdy * tvy) / (tspeed * Math.max(1, d));
            stats.lagSum += lag;
            stats.lagN += 1;
          }
        }
        prevX = p.x;
        prevY = p.y;
      },
      draw(ctx, cameraNow, wNow, hNow) {
        const p = project(target, cameraNow, wNow, hNow);
        const g = ctx.createRadialGradient(p.x - 8, p.y - 10, 4, p.x, p.y, target.r);
        g.addColorStop(0, wasOn ? '#fff7ed' : '#fdba74');
        g.addColorStop(1, '#7c2d12');
        ctx.beginPath();
        ctx.arc(p.x, p.y, target.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      },
      stats() {
        return stats;
      }
    };
  };
}

const factories: Record<string, (camera: Camera, w: number, h: number) => AimMode> = {
  placement: makeBotMode({
    kind: 'placement', label: '头线点射', count: 4, line: true,
    minDeg: 6, maxDeg: 18, sepDeg: 5, headR: 15, bodyW: 24, bodyH: 42
  }),
  flick: makeBotMode({
    kind: 'flick', label: '甩头 Flick', count: 3,
    minDeg: 8, maxDeg: 22, sepDeg: 7, headR: 14, bodyW: 22, bodyH: 40
  }),
  gridshot: makeBotMode({
    kind: 'flick', label: '甩头 Flick', count: 3,
    minDeg: 8, maxDeg: 22, sepDeg: 7, headR: 14, bodyW: 22, bodyH: 40
  }),
  micro: makeBotMode({
    kind: 'micro', label: '爆头微点', count: 1,
    minDeg: 2.2, maxDeg: 7.2, sepDeg: 2, headR: 10, bodyW: 16, bodyH: 28
  }),
  tracking: makeTracking()
};

export function createAimMode(kind: string, camera: Camera, w: number, h: number) {
  const fn = factories[kind] || factories.flick;
  return fn(camera, w, h);
}

export function modeDuration(kind: string) {
  if (kind === 'tracking' || kind === 'micro') return 20000;
  return 25000;
}

export function fireHint(kind: string) {
  if (kind === 'tracking') return '贴住头部计分，本关不用开枪';
  return '左键开火，打头部才算爆头';
}

export const AimModes = {
  FOV_H,
  fovV,
  create: createAimMode,
  duration: modeDuration,
  fireHint,
  signalFromStats,
  wrapDeg
};
