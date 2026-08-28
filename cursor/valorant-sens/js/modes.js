const AimModes = (function () {
  const FOV_H = 103;

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function wrapDeg(d) {
    d = d % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  }

  function fovV(aspect) {
    const h = FOV_H * Math.PI / 180;
    return (2 * Math.atan(Math.tan(h / 2) / aspect)) * 180 / Math.PI;
  }

  function project(target, camera, w, h) {
    const aspect = w / h;
    const fv = fovV(aspect);
    const dx = wrapDeg(target.yaw - camera.yaw);
    const dy = target.pitch - camera.pitch;
    return {
      x: w / 2 + (dx / FOV_H) * w,
      y: h / 2 + (dy / fv) * h,
      dx: dx,
      dy: dy
    };
  }

  function distToCross(p, w, h) {
    const x = p.x - w / 2;
    const y = p.y - h / 2;
    return Math.hypot(x, y);
  }

  function spawnOffset(camera, spec, avoid, w, h) {
    const aspect = w / h;
    const fv = fovV(aspect);
    let yaw;
    let pitch;
    let tries = 0;
    do {
      const ang = rand(spec.minDeg, spec.maxDeg);
      const dir = rand(0, Math.PI * 2);
      yaw = camera.yaw + Math.cos(dir) * ang;
      pitch = camera.pitch + Math.sin(dir) * ang * (fv / FOV_H);
      pitch = Math.max(-fv * 0.42, Math.min(fv * 0.42, pitch));
      tries += 1;
    } while (tries < 12 && tooClose(yaw, pitch, avoid, spec.sepDeg));
    return { yaw: yaw, pitch: pitch, r: spec.radius, spawnedAt: 0, minDist: 1e9, close: false };
  }

  function tooClose(yaw, pitch, avoid, sep) {
    if (!avoid || !avoid.length) return false;
    for (let i = 0; i < avoid.length; i += 1) {
      const a = avoid[i];
      if (Math.hypot(wrapDeg(yaw - a.yaw), pitch - a.pitch) < sep) return true;
    }
    return false;
  }

  function drawOrb(ctx, x, y, r, hitFlash) {
    const g = ctx.createRadialGradient(x - r * 0.25, y - r * 0.3, r * 0.1, x, y, r);
    g.addColorStop(0, hitFlash ? '#fff7ed' : '#fdba74');
    g.addColorStop(0.45, hitFlash ? '#fb923c' : '#f97316');
    g.addColorStop(1, '#7c2d12');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }

  function emptyStats() {
    return {
      hits: 0,
      overshoots: 0,
      slashHits: 0,
      sumTime: 0,
      timeN: 0,
      onFrames: 0,
      offFrames: 0,
      enters: 0,
      lagSum: 0,
      lagN: 0,
      lastMove: 0
    };
  }

  function signalFromStats(kind, stats, durationMs) {
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
      const tps = stats.hits / seconds;
      const avgT = stats.timeN ? stats.sumTime / stats.timeN : 0.9;
      const over = stats.hits ? stats.overshoots / Math.max(1, stats.hits) : (stats.overshoots > 0 ? 1 : 0);
      const slash = stats.hits ? stats.slashHits / stats.hits : 0;
      tooHigh = Math.min(1, over * 0.7 + slash * 0.5);
      tooLow = Math.min(1, Math.max(0, (0.55 - tps) / 0.55) * 0.6 + Math.max(0, (avgT - 0.38) / 0.7) * 0.5);
      if (stats.hits === 0) tooLow = 1;
    }

    const combined = Math.max(-1, Math.min(1, tooLow - tooHigh));
    return {
      tooHigh: tooHigh,
      tooLow: tooLow,
      combined: combined,
      hits: stats.hits,
      overshoots: stats.overshoots
    };
  }

  function makeFlickMode(spec) {
    return function create(camera, w, h) {
      const targets = [];
      const stats = emptyStats();
      let wasOn = false;
      const count = spec.count;

      function refill(now, cam, width, height) {
        while (targets.length < count) {
          const t = spawnOffset(cam, spec, targets, width, height);
          t.spawnedAt = now;
          targets.push(t);
        }
      }

      refill(0, camera, w, h);

      return {
        label: spec.label,
        kind: spec.kind,
        update: function (dt, now, cameraNow, wNow, hNow, moveLen) {
          stats.lastMove = moveLen;
          refill(now, cameraNow, wNow, hNow);
          const cx = wNow / 2;
          const cy = hNow / 2;
          let anyOn = false;
          for (let i = targets.length - 1; i >= 0; i -= 1) {
            const t = targets[i];
            const p = project(t, cameraNow, wNow, hNow);
            const d = Math.hypot(p.x - cx, p.y - cy);
            if (d < t.minDist) t.minDist = d;
            if (d < t.r * 1.85) t.close = true;
            if (t.close && d > t.r * 2.3) {
              stats.overshoots += 1;
              t.close = false;
            }
            if (d <= t.r) {
              stats.hits += 1;
              stats.sumTime += Math.max(0, (now - t.spawnedAt) / 1000);
              stats.timeN += 1;
              if (moveLen > t.r * 1.15) stats.slashHits += 1;
              targets.splice(i, 1);
              anyOn = true;
            }
          }
          if (anyOn && !wasOn) stats.enters += 1;
          wasOn = anyOn;
        },
        draw: function (ctx, cameraNow, wNow, hNow) {
          targets.forEach(function (t) {
            const p = project(t, cameraNow, wNow, hNow);
            drawOrb(ctx, p.x, p.y, t.r, false);
          });
        },
        stats: function () { return stats; }
      };
    };
  }

  function makeTracking() {
    return function create(camera, w, h) {
      const fv = fovV(w / h);
      const origin = { yaw: camera.yaw, pitch: camera.pitch };
      const target = {
        yaw: camera.yaw,
        pitch: camera.pitch,
        r: 34,
        vx: 0,
        vy: 0
      };
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
        update: function (dt, now, cameraNow, wNow, hNow, moveLen) {
          stats.lastMove = moveLen;
          t += dt;
          const ny = origin.yaw + Math.sin(t * 1.05) * ampY;
          const np = origin.pitch + Math.sin(t * 1.55 + 0.4) * ampP;
          target.vx = ny - target.yaw;
          target.vy = np - target.pitch;
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
            const tdx = p.x - (wNow / 2);
            const tdy = p.y - (hNow / 2);
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
        draw: function (ctx, cameraNow, wNow, hNow) {
          const p = project(target, cameraNow, wNow, hNow);
          drawOrb(ctx, p.x, p.y, target.r, wasOn);
        },
        stats: function () { return stats; }
      };
    };
  }

  const factories = {
    gridshot: makeFlickMode({
      kind: 'gridshot',
      label: 'Gridshot',
      count: 3,
      minDeg: 8,
      maxDeg: 22,
      sepDeg: 7,
      radius: 30
    }),
    tracking: makeTracking(),
    micro: makeFlickMode({
      kind: 'micro',
      label: '微修正 Micro',
      count: 1,
      minDeg: 2.4,
      maxDeg: 7.5,
      sepDeg: 2,
      radius: 16
    })
  };

  function create(kind, camera, w, h) {
    const fn = factories[kind] || factories.gridshot;
    return fn(camera, w, h);
  }

  function duration(kind) {
    if (kind === 'tracking') return 20000;
    if (kind === 'micro') return 20000;
    return 25000;
  }

  return {
    FOV_H: FOV_H,
    fovV: fovV,
    create: create,
    duration: duration,
    signalFromStats: signalFromStats,
    wrapDeg: wrapDeg
  };
})();
