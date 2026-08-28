const ValSensApp = (function () {
  let hipfire = {
    dpi: 800,
    sens: 0.35,
    yaw: 0.07,
    gameId: 'valorant',
    cm360: null
  };

  function $(id) { return document.getElementById(id); }

  function setHipfire(next) {
    hipfire = Object.assign({}, hipfire, next);
    ValSensStorage.patch({ lastConvert: hipfire });
  }

  function getHipfire() {
    return hipfire;
  }

  function copyText(text, hintId) {
    if (!text || text === '—') return;
    function done() {
      const el = hintId ? $(hintId) : null;
      if (el) {
        el.hidden = false;
        el.textContent = '已复制';
        setTimeout(function () { el.hidden = true; }, 1500);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        window.prompt('复制灵敏度', text);
      });
    } else {
      window.prompt('复制灵敏度', text);
    }
  }

  function showTab(name) {
    document.querySelectorAll('.vs-tab').forEach(function (btn) {
      const on = btn.getAttribute('data-tab') === name;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('.vs-panel').forEach(function (panel) {
      const on = panel.id === 'tab-' + name;
      panel.classList.toggle('is-active', on);
      panel.hidden = !on;
    });
    if (name !== 'play' && AimEngine.isRunning()) {
      AimEngine.pause('tab');
    }
  }

  function sourceLabel(source) {
    if (source === 'wizard') return '打靶向导';
    if (source === 'ab') return 'A/B';
    if (source === 'psa') return 'PSA';
    if (source === 'tune') return '微调';
    return '换算';
  }

  function renderHistory() {
    const list = $('hist-list');
    list.replaceChildren();
    const history = ValSensStorage.load().history || [];
    if (!history.length) {
      const li = document.createElement('li');
      li.textContent = '还没有保存记录。';
      list.appendChild(li);
      return;
    }
    history.forEach(function (item) {
      const li = document.createElement('li');
      const meta = document.createElement('span');
      const when = item.date ? item.date.slice(0, 10) : '';
      meta.textContent = when + ' · ' + sourceLabel(item.source) + ' · ' +
        SensMath.formatSensGame(item.finalSens) + ' @ ' + item.dpi + ' DPI · ' +
        SensMath.formatCm(item.cm360);
      const del = document.createElement('button');
      del.type = 'button';
      del.textContent = '删除';
      del.addEventListener('click', function () {
        ValSensStorage.removeHistory(item.id);
        renderHistory();
      });
      li.appendChild(meta);
      li.appendChild(del);
      list.appendChild(li);
    });
  }

  function renderResult() {
    const saved = ValSensStorage.load().finalSens;
    const src = saved || (hipfire.sens ? {
      sens: hipfire.sens,
      dpi: hipfire.dpi,
      cm360: hipfire.cm360 || SensMath.cm360(hipfire.dpi, hipfire.sens, hipfire.yaw),
      source: 'wizard',
      log: []
    } : null);
    if (!src || src.sens == null) {
      $('rs-sens').textContent = '—';
      $('rs-sens-full').textContent = '—';
      $('rs-dpi').textContent = '—';
      $('rs-edpi').textContent = '—';
      $('rs-cm').textContent = '—';
      $('rs-source').textContent = '尚未生成';
      $('rs-rounds').replaceChildren();
      return;
    }
    $('rs-sens').textContent = SensMath.formatSensGame(src.sens);
    $('rs-sens-full').textContent = SensMath.formatSens(src.sens);
    $('rs-dpi').textContent = String(src.dpi);
    $('rs-edpi').textContent = SensMath.formatEdpi(SensMath.edpi(src.dpi, src.sens));
    $('rs-cm').textContent = SensMath.formatCm(src.cm360);
    $('rs-source').textContent = sourceLabel(src.source);
    const ol = $('rs-rounds');
    ol.replaceChildren();
    const log = src.log || [];
    if (!log.length) {
      const li = document.createElement('li');
      li.textContent = '没有轮次记录。';
      ol.appendChild(li);
      return;
    }
    log.forEach(function (row) {
      const li = document.createElement('li');
      if (row.round === 'A/B') {
        li.textContent = 'A/B：选' + (row.pick === 'higher' ? '偏高' : '偏低') +
          '（低 ' + SensMath.formatSensGame(row.lower) + ' / 高 ' +
          SensMath.formatSensGame(row.higher) + '）';
      } else {
        const dir = row.combined > 0.12 ? '建议升高' : row.combined < -0.12 ? '建议降低' : '接近合适';
        li.textContent = '第 ' + row.round + ' 轮 ' + dir + ' → ' + SensMath.formatSensGame(row.next);
      }
      ol.appendChild(li);
    });
  }

  function init() {
    Shell.inject();
    const saved = ValSensStorage.load();
    if (saved.lastConvert && saved.lastConvert.sens) {
      hipfire = Object.assign({}, hipfire, saved.lastConvert);
    }
    if (saved.finalSens && saved.finalSens.sens) {
      hipfire.sens = saved.finalSens.sens;
      hipfire.dpi = saved.finalSens.dpi;
      hipfire.cm360 = saved.finalSens.cm360;
    }

    document.querySelectorAll('.vs-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showTab(btn.getAttribute('data-tab'));
      });
    });

    $('hist-export').addEventListener('click', function () {
      ValSensStorage.exportJSON();
    });
    $('hist-import').addEventListener('change', function (e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      ValSensStorage.importJSON(file).then(function () {
        e.target.value = '';
        window.location.reload();
      }).catch(function () {
        window.alert('导入失败，请确认是本工具导出的 JSON。');
      });
    });

    $('rs-copy').addEventListener('click', function () {
      const savedFinal = ValSensStorage.load().finalSens;
      const sens = (savedFinal && savedFinal.sens) || hipfire.sens;
      copyText(SensMath.formatSensGame(sens), 'rs-copy-hint');
    });
    $('rs-to-tune').addEventListener('click', function () {
      const savedFinal = ValSensStorage.load().finalSens;
      const sens = (savedFinal && savedFinal.sens) || hipfire.sens;
      const dpi = (savedFinal && savedFinal.dpi) || hipfire.dpi;
      ValSensTune.importCenter(sens, dpi);
      showTab('toolbox');
    });
    $('rs-retune').addEventListener('click', function () {
      ValSensWizard.beginRetune();
    });

    AimEngine.attach({
      canvas: $('aim-canvas'),
      stage: $('play-stage'),
      overlay: $('play-overlay'),
      overlayTitle: $('play-overlay-title'),
      overlaySub: $('play-overlay-sub'),
      overlayBtn: $('play-overlay-btn')
    });

    ValSensConverter.init();
    ValSensTune.init();
    ValSensWizard.init();
    ValSensAb.init();
    renderHistory();
    renderResult();
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    setHipfire: setHipfire,
    getHipfire: getHipfire,
    copyText: copyText,
    showTab: showTab,
    renderHistory: renderHistory,
    renderResult: renderResult
  };
})();
