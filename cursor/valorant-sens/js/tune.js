const ValSensTune = (function () {
  const VAL_YAW = 0.07;

  function $(id) { return document.getElementById(id); }

  function currentSens() {
    const center = Number($('tune-center').value);
    const pct = Number($('tune-slider').value) / 100;
    if (!(center > 0)) return null;
    return center * (1 + pct);
  }

  function persist() {
    ValSensStorage.patch({
      lastTune: {
        center: $('tune-center').value,
        dpi: $('tune-dpi').value,
        slider: $('tune-slider').value,
        targetCm: $('tune-target-cm').value,
        targetDpi: $('tune-target-dpi').value
      }
    });
  }

  function renderSlider() {
    const pct = Number($('tune-slider').value);
    const sign = pct > 0 ? '+' : '';
    $('tune-pct').textContent = sign + pct + '%';
    const dpi = Number($('tune-dpi').value);
    const sens = currentSens();
    const cm = SensMath.cm360(dpi, sens, VAL_YAW);
    $('tune-sens').textContent = SensMath.formatSens(sens);
    $('tune-edpi').textContent = SensMath.formatEdpi(SensMath.edpi(dpi, sens));
    $('tune-cm').textContent = SensMath.formatCm(cm);
    persist();
  }

  function renderFromCm() {
    const dpi = Number($('tune-target-dpi').value);
    const cm = Number($('tune-target-cm').value);
    const sens = SensMath.sensFromCm360(dpi, cm, VAL_YAW);
    $('tune-from-cm').textContent = SensMath.formatSens(sens);
    persist();
    return { dpi: dpi, sens: sens, cm: cm };
  }

  function importCenter(sens, dpi) {
    $('tune-center').value = Number(sens).toFixed(6);
    $('tune-dpi').value = String(dpi);
    $('tune-slider').value = '0';
    renderSlider();
  }

  function init() {
    const saved = ValSensStorage.load().lastTune;
    if (saved) {
      if (saved.center) $('tune-center').value = saved.center;
      if (saved.dpi) $('tune-dpi').value = saved.dpi;
      if (saved.slider) $('tune-slider').value = saved.slider;
      if (saved.targetCm) $('tune-target-cm').value = saved.targetCm;
      if (saved.targetDpi) $('tune-target-dpi').value = saved.targetDpi;
    } else {
      const hip = ValSensApp.getHipfire();
      if (hip && hip.sens) importCenter(hip.sens, hip.dpi);
    }
    ['tune-center', 'tune-dpi', 'tune-slider'].forEach(function (id) {
      $(id).addEventListener('input', renderSlider);
    });
    ['tune-target-cm', 'tune-target-dpi'].forEach(function (id) {
      $(id).addEventListener('input', renderFromCm);
    });
    $('tune-copy').addEventListener('click', function () {
      ValSensApp.copyText(SensMath.formatSensGame(currentSens()));
    });
    $('tune-save').addEventListener('click', function () {
      const dpi = Number($('tune-dpi').value);
      const sens = currentSens();
      ValSensStorage.addHistory({
        finalSens: sens,
        dpi: dpi,
        cm360: SensMath.cm360(dpi, sens, VAL_YAW),
        source: 'tune'
      });
      ValSensApp.renderHistory();
    });
    $('tune-use-cm').addEventListener('click', function () {
      const r = renderFromCm();
      if (r.sens) importCenter(r.sens, r.dpi);
    });
    $('tune-copy-cm').addEventListener('click', function () {
      const r = renderFromCm();
      ValSensApp.copyText(SensMath.formatSensGame(r.sens));
    });
    renderSlider();
    renderFromCm();
  }

  return { init: init, importCenter: importCenter };
})();
