export const VAL_YAW = 0.07;

export const DPI_STEPS = [400, 800, 1600, 3200];

function num(v: unknown) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

export function cm360(dpi: unknown, sens: unknown, yaw: unknown) {
  const d = num(dpi);
  const s = num(sens);
  const y = num(yaw);
  if (!(d > 0 && s > 0 && y > 0)) return null;
  return (360 * 2.54) / (d * s * y);
}

export function convert(fromDpi: unknown, fromSens: unknown, fromYaw: unknown, toDpi: unknown, toYaw: unknown) {
  const fd = num(fromDpi);
  const fs = num(fromSens);
  const fy = num(fromYaw);
  const td = num(toDpi);
  const ty = num(toYaw);
  if (!(fd > 0 && fs > 0 && fy > 0 && td > 0 && ty > 0)) return null;
  return (fd * fs * fy) / (td * ty);
}

export function edpi(dpi: unknown, sens: unknown) {
  const d = num(dpi);
  const s = num(sens);
  if (!(d > 0 && s > 0)) return null;
  return d * s;
}

export function sensFromCm360(dpi: unknown, cm: unknown, yaw: unknown) {
  const d = num(dpi);
  const c = num(cm);
  const y = num(yaw);
  if (!(d > 0 && c > 0 && y > 0)) return null;
  return (360 * 2.54) / (d * c * y);
}

export function dpiTable(cm: number | null, yaw: number, dpis?: number[]) {
  const steps = dpis || DPI_STEPS;
  return steps.map((dpi) => {
    const sens = sensFromCm360(dpi, cm, yaw);
    return {
      dpi,
      sens,
      edpi: sens == null ? null : edpi(dpi, sens)
    };
  });
}

export function formatSens(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return '—';
  return value.toFixed(6);
}

export function formatSensGame(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return '—';
  return Number(value).toFixed(3);
}

export function formatCm(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return '—';
  return value.toFixed(2) + ' cm';
}

export function formatEdpi(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return '—';
  return value.toFixed(1);
}

export const SensMath = {
  DPI_STEPS,
  cm360,
  convert,
  edpi,
  sensFromCm360,
  dpiTable,
  formatSens,
  formatSensGame,
  formatCm,
  formatEdpi
};
