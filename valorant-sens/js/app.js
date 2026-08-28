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
  }

  function sourceLabel(source) {
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
        SensMath.formatSens(item.finalSens) + ' @ ' + item.dpi + ' DPI · ' +
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

  function init() {
    Shell.inject();
    const saved = ValSensStorage.load();
    if (saved.lastConvert && saved.lastConvert.sens) {
      hipfire = Object.assign({}, hipfire, saved.lastConvert);
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

    ValSensConverter.init();
    ValSensPsa.init();
    ValSensTune.init();
    renderHistory();
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    setHipfire: setHipfire,
    getHipfire: getHipfire,
    copyText: copyText,
    showTab: showTab,
    renderHistory: renderHistory
  };
})();
