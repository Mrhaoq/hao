import { VAL_YAW, SensMath } from './math';
import { AimModes, type AimSignal } from './modes';
import type { AimEndResult } from './aim-engine';

export const MIN_SENS = 0.05;
export const MAX_SENS = 5;
export const MAX_ROUNDS = 3;
export const MODES = ['placement', 'flick', 'micro'] as const;
export const WEIGHT: Record<string, number> = { placement: 0.4, flick: 0.35, micro: 0.25 };

export type Habits = Record<string, boolean>;

export type WizardSession = {
  kind: 'full' | 'free' | 'ab';
  dpi: number;
  estimate: number;
  rangeFrac: number;
  round: number;
  modeIndex: number;
  roundSignals: AimSignal[];
  log: Record<string, unknown>[];
  ab: { phase: 'a' | 'b'; lower: number; higher: number; scoreA?: number; scoreB?: number } | null;
  done: boolean;
  finalSens: number | null;
  freeKind?: string;
  retune?: boolean;
  fromToolbox?: boolean;
};

export function clampSens(n: number) {
  return Math.min(MAX_SENS, Math.max(MIN_SENS, n));
}

export function summaryLine(sig: AimSignal) {
  const pct = Math.round((sig.hsRate || 0) * 100);
  const dir = sig.combined > 0.15 ? '略偏低敏' : sig.combined < -0.15 ? '略偏高敏' : '接近合适';
  if (sig.kind === 'tracking') {
    return '过冲 ' + sig.overshoots + ' · 信号 ' + dir;
  }
  return '爆头率 ' + pct + '%（' + (sig.headshots || 0) + '/' + (sig.hits || 0) +
    '）· 空枪 ' + (sig.misses || 0) + ' · ' + dir;
}

export function sumField(session: WizardSession, key: string) {
  let n = 0;
  (session.log || []).forEach((row) => {
    const signals = (row.signals as AimSignal[] | undefined) || [];
    signals.forEach((s) => {
      n += Number((s as unknown as Record<string, number>)[key]) || 0;
    });
  });
  return n;
}

export function avgHs(session: WizardSession) {
  let heads = 0;
  let hits = 0;
  (session.log || []).forEach((row) => {
    const signals = (row.signals as AimSignal[] | undefined) || [];
    signals.forEach((s) => {
      heads += Number(s.headshots) || 0;
      hits += Number(s.hits) || 0;
    });
  });
  if (!hits) return 0;
  return heads / hits;
}

export function baseCm(h: Habits) {
  let cm = 40;
  if (h.wrist && !h.arm) cm = 32;
  if (h.arm && !h.wrist) cm = 48;
  if (h.flick && !h.track) cm *= 0.9;
  if (h.track && !h.flick) cm *= 1.1;
  return cm;
}

export function startSensFromProfile(dpi: number, oldSens: number, habits: Habits) {
  if (oldSens > 0) return clampSens(oldSens);
  return clampSens(SensMath.sensFromCm360(dpi, baseCm(habits), VAL_YAW) || 0.35);
}

export function emptySession(kind: WizardSession['kind'], dpi: number, estimate: number, rangeFrac: number): WizardSession {
  return {
    kind: kind || 'full',
    dpi,
    estimate,
    rangeFrac,
    round: 1,
    modeIndex: 0,
    roundSignals: [],
    log: [],
    ab: null,
    done: false,
    finalSens: null
  };
}

export function modeTitle(session: WizardSession) {
  const names: Record<string, string> = {
    placement: '头线点射',
    flick: '甩头 Flick',
    gridshot: '甩头 Flick',
    micro: '爆头微点',
    tracking: '跟枪 Tracking'
  };
  const kind = session.kind === 'free' && session.freeKind
    ? session.freeKind
    : (session.kind === 'ab' ? 'flick' : MODES[session.modeIndex]);
  if (session.kind === 'free') return '自由训练 · ' + names[kind];
  if (session.kind === 'ab') return session.ab && session.ab.phase === 'b' ? 'A/B · 偏高候选' : 'A/B · 偏低候选';
  return '第 ' + session.round + ' / ' + MAX_ROUNDS + ' 轮 · ' + names[kind];
}

export function applyRound(session: WizardSession) {
  let combined = 0;
  session.roundSignals.forEach((s) => {
    combined += (WEIGHT[s.kind || ''] || 0.33) * s.combined;
  });
  combined = Math.max(-1, Math.min(1, combined));
  const next = clampSens(session.estimate * (1 + combined * session.rangeFrac));
  const nextRange = session.rangeFrac * 0.5;
  session.log.push({
    round: session.round,
    estimate: session.estimate,
    next,
    combined,
    signals: session.roundSignals.slice()
  });
  session.estimate = next;
  session.rangeFrac = nextRange;
  session.roundSignals = [];
  return combined;
}

export function currentModeKind(session: WizardSession) {
  if (session.kind === 'free' && session.freeKind) return session.freeKind;
  if (session.kind === 'ab') return 'flick';
  return MODES[session.modeIndex];
}

export function currentTestSens(session: WizardSession) {
  if (session.kind === 'ab' && session.ab) {
    return session.ab.phase === 'b' ? session.ab.higher : session.ab.lower;
  }
  return session.estimate;
}

export function onModeEnd(session: WizardSession, result: AimEndResult): 'continue' | 'finish' | 'free-done' {
  const sig = AimModes.signalFromStats(result.kind, result.stats || {
    hits: 0, headshots: 0, bodyshots: 0, shots: 0, misses: 0, overshoots: 0,
    slashHits: 0, sumTime: 0, timeN: 0, sumSync: 0, syncN: 0, onFrames: 0, offFrames: 0,
    enters: 0, lagSum: 0, lagN: 0, lastMove: 0
  }, result.durationMs);
  sig.kind = result.kind;
  sig.sens = result.sens;

  if (session.kind === 'free') {
    (session as WizardSession & { lastFreeSig?: AimSignal }).lastFreeSig = sig;
    return 'free-done';
  }

  if (session.kind === 'ab' && session.ab) {
    if (session.ab.phase === 'a') {
      session.ab.scoreA = sig.abScore != null ? sig.abScore : (sig.hits - sig.overshoots * 0.4);
      session.ab.phase = 'b';
      return 'continue';
    }
    session.ab.scoreB = sig.abScore != null ? sig.abScore : (sig.hits - sig.overshoots * 0.4);
    const pickHigh = (session.ab.scoreB || 0) >= (session.ab.scoreA || 0);
    session.estimate = clampSens(pickHigh ? session.ab.higher : session.ab.lower);
    session.log.push({
      round: 'A/B',
      pick: pickHigh ? 'higher' : 'lower',
      lower: session.ab.lower,
      higher: session.ab.higher,
      scoreA: session.ab.scoreA,
      scoreB: session.ab.scoreB
    });
    return 'finish';
  }

  session.roundSignals.push(sig);
  session.modeIndex += 1;
  if (session.modeIndex < MODES.length) return 'continue';
  applyRound(session);
  const converged = session.rangeFrac < 0.03;
  const lastRound = session.round >= MAX_ROUNDS;
  if (session.retune) return 'finish';
  if (!converged && !lastRound) {
    session.round += 1;
    session.modeIndex = 0;
    return 'continue';
  }
  session.kind = 'ab';
  session.ab = {
    phase: 'a',
    lower: clampSens(session.estimate * (1 - Math.max(0.04, session.rangeFrac))),
    higher: clampSens(session.estimate * (1 + Math.max(0.04, session.rangeFrac)))
  };
  return 'continue';
}

export { AimModes };
