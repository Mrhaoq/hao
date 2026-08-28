const SensMath = (function () {
  const DPI_STEPS = [400, 800, 1600, 3200];

  function num(v) {
    const n = Number(v);
    return isFinite(n) ? n : NaN;
  }

  function cm360(dpi, sens, yaw) {
    const d = num(dpi);
    const s = num(sens);
    const y = num(yaw);
    if (!(d > 0 && s > 0 && y > 0)) return null;
    return (360 * 2.54) / (d * s * y);
  }

  function convert(fromDpi, fromSens, fromYaw, toDpi, toYaw) {
    const fd = num(fromDpi);
    const fs = num(fromSens);
    const fy = num(fromYaw);
    const td = num(toDpi);
    const ty = num(toYaw);
    if (!(fd > 0 && fs > 0 && fy > 0 && td > 0 && ty > 0)) return null;
    return (fd * fs * fy) / (td * ty);
  }

  function edpi(dpi, sens) {
    const d = num(dpi);
    const s = num(sens);
    if (!(d > 0 && s > 0)) return null;
    return d * s;
  }

  function sensFromCm360(dpi, cm, yaw) {
    const d = num(dpi);
    const c = num(cm);
    const y = num(yaw);
    if (!(d > 0 && c > 0 && y > 0)) return null;
    return (360 * 2.54) / (d * c * y);
  }

  function dpiTable(cm, yaw, dpis) {
    const steps = dpis || DPI_STEPS;
    return steps.map(function (dpi) {
      const sens = sensFromCm360(dpi, cm, yaw);
      return {
        dpi: dpi,
        sens: sens,
        edpi: sens == null ? null : edpi(dpi, sens)
      };
    });
  }

  function formatSens(value) {
    if (value == null || !isFinite(value)) return '—';
    return value.toFixed(6);
  }

  function formatCm(value) {
    if (value == null || !isFinite(value)) return '—';
    return value.toFixed(2) + ' cm';
  }

  function formatEdpi(value) {
    if (value == null || !isFinite(value)) return '—';
    return value.toFixed(1);
  }

  return {
    DPI_STEPS: DPI_STEPS,
    cm360: cm360,
    convert: convert,
    edpi: edpi,
    sensFromCm360: sensFromCm360,
    dpiTable: dpiTable,
    formatSens: formatSens,
    formatCm: formatCm,
    formatEdpi: formatEdpi
  };
})();
