const ValSensAb = (function () {
  function $(id) { return document.getElementById(id); }

  function fillFromResult() {
    const hip = ValSensApp.getHipfire();
    const dpi = (hip && hip.dpi) || 800;
    const sens = (hip && hip.sens) || 0.35;
    $('ab-dpi').value = String(dpi);
    $('ab-lower').value = (sens * 0.95).toFixed(3);
    $('ab-higher').value = (sens * 1.05).toFixed(3);
  }

  function init() {
    const hip = ValSensApp.getHipfire();
    if (hip && hip.dpi) $('ab-dpi').value = String(hip.dpi);
    $('ab-from-result').addEventListener('click', fillFromResult);
    $('ab-start').addEventListener('click', function () {
      $('ab-status').textContent = '正在测试偏低候选…';
      ValSensWizard.beginAb($('ab-lower').value, $('ab-higher').value, $('ab-dpi').value);
    });
  }

  return { init: init, fillFromResult: fillFromResult };
})();
