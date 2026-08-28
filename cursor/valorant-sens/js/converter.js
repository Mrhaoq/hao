const ValSensConverter = (function () {
  function $(id) { return document.getElementById(id); }

  function fillGames() {
    const games = SensGames.list();
    ['cv-source-game', 'cv-target-game'].forEach(function (id) {
      const sel = $(id);
      sel.replaceChildren();
      games.forEach(function (g) {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = g.name;
        sel.appendChild(opt);
      });
    });
    $('cv-source-game').value = 'cs2';
    $('cv-target-game').value = 'valorant';
  }

  function sourceYaw() {
    const custom = $('cv-source-yaw').value;
    if (custom) return Number(custom);
    return SensGames.get($('cv-source-game').value).yaw;
  }

  function targetYaw() {
    const custom = $('cv-target-yaw').value;
    if (custom) return Number(custom);
    return SensGames.get($('cv-target-game').value).yaw;
  }

  function syncYawPlaceholders() {
    const src = SensGames.get($('cv-source-game').value);
    const tgt = SensGames.get($('cv-target-game').value);
    $('cv-source-yaw').placeholder = String(src.yaw);
    $('cv-target-yaw').placeholder = String(tgt.yaw);
    $('cv-yaw-hint').textContent = '默认系数核对日期 ' + SensGames.CHECKED_AT +
      '。' + src.name + ' yaw=' + src.yaw + '，' + tgt.name + ' yaw=' + tgt.yaw + '。留空则用默认值。';
  }

  function persistInputs() {
    ValSensStorage.patch({
      lastInputs: {
        sourceGame: $('cv-source-game').value,
        sourceDpi: $('cv-source-dpi').value,
        sourceSens: $('cv-source-sens').value,
        targetGame: $('cv-target-game').value,
        targetDpi: $('cv-target-dpi').value,
        sameDpi: $('cv-same-dpi').checked,
        sourceYaw: $('cv-source-yaw').value,
        targetYaw: $('cv-target-yaw').value
      }
    });
  }

  function restoreInputs() {
    const saved = ValSensStorage.load().lastInputs;
    if (!saved) return;
    if (saved.sourceGame) $('cv-source-game').value = saved.sourceGame;
    if (saved.sourceDpi) $('cv-source-dpi').value = saved.sourceDpi;
    if (saved.sourceSens) $('cv-source-sens').value = saved.sourceSens;
    if (saved.targetGame) $('cv-target-game').value = saved.targetGame;
    if (saved.targetDpi) $('cv-target-dpi').value = saved.targetDpi;
    if (typeof saved.sameDpi === 'boolean') $('cv-same-dpi').checked = saved.sameDpi;
    if (saved.sourceYaw) $('cv-source-yaw').value = saved.sourceYaw;
    if (saved.targetYaw) $('cv-target-yaw').value = saved.targetYaw;
  }

  function currentResult() {
    if ($('cv-same-dpi').checked) {
      $('cv-target-dpi').value = $('cv-source-dpi').value;
    }
    const fromDpi = Number($('cv-source-dpi').value);
    const fromSens = Number($('cv-source-sens').value);
    const toDpi = Number($('cv-target-dpi').value);
    const fy = sourceYaw();
    const ty = targetYaw();
    const tgtGame = SensGames.get($('cv-target-game').value);
    const srcGame = SensGames.get($('cv-source-game').value);
    const sens = SensMath.convert(fromDpi, fromSens, fy, toDpi, ty);
    const srcCm = SensMath.cm360(fromDpi, fromSens, fy);
    const tgtCm = SensMath.cm360(toDpi, sens, ty);
    return {
      sourceGame: srcGame,
      targetGame: tgtGame,
      fromDpi: fromDpi,
      fromSens: fromSens,
      toDpi: toDpi,
      toSens: sens,
      fromYaw: fy,
      toYaw: ty,
      srcEdpi: SensMath.edpi(fromDpi, fromSens),
      tgtEdpi: SensMath.edpi(toDpi, sens),
      srcCm: srcCm,
      tgtCm: tgtCm
    };
  }

  function renderDpiTable(cm, yaw) {
    const tbody = $('cv-dpi-table');
    tbody.replaceChildren();
    SensMath.dpiTable(cm, yaw).forEach(function (row) {
      const tr = document.createElement('tr');
      [String(row.dpi), SensMath.formatSens(row.sens), SensMath.formatEdpi(row.edpi)].forEach(function (text) {
        const td = document.createElement('td');
        td.textContent = text;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  function render() {
    syncYawPlaceholders();
    $('cv-target-dpi').disabled = $('cv-same-dpi').checked;
    const r = currentResult();
    $('cv-out-sens').textContent = SensMath.formatSens(r.toSens);
    $('cv-out-game').textContent = r.targetGame.name + ' · 腰射';
    $('cv-out-src-edpi').textContent = SensMath.formatEdpi(r.srcEdpi);
    $('cv-out-tgt-edpi').textContent = SensMath.formatEdpi(r.tgtEdpi);
    $('cv-out-src-cm').textContent = SensMath.formatCm(r.srcCm);
    $('cv-out-tgt-cm').textContent = SensMath.formatCm(r.tgtCm);
    renderDpiTable(r.tgtCm, r.toYaw);
    const valYaw = SensGames.get('valorant').yaw;
    const valSens = SensMath.convert(r.fromDpi, r.fromSens, r.fromYaw, r.toDpi, valYaw);
    if (valSens != null) {
      ValSensApp.setHipfire({
        dpi: r.toDpi,
        sens: valSens,
        yaw: valYaw,
        gameId: 'valorant',
        cm360: SensMath.cm360(r.toDpi, valSens, valYaw)
      });
    }
    persistInputs();
  }

  function init() {
    fillGames();
    restoreInputs();
    ['cv-source-game', 'cv-target-game', 'cv-source-dpi', 'cv-source-sens', 'cv-target-dpi',
      'cv-source-yaw', 'cv-target-yaw', 'cv-same-dpi'].forEach(function (id) {
      $(id).addEventListener('input', render);
      $(id).addEventListener('change', render);
    });
    $('cv-copy').addEventListener('click', function () {
      const r = currentResult();
      ValSensApp.copyText(SensMath.formatSens(r.toSens), 'cv-copy-hint');
    });
    $('cv-to-psa').addEventListener('click', function () {
      const hip = ValSensApp.getHipfire();
      if (!hip || hip.sens == null) return;
      ValSensPsa.importBase(hip.sens, hip.dpi);
      ValSensApp.showTab('psa');
    });
    $('cv-save').addEventListener('click', function () {
      const r = currentResult();
      if (r.toSens == null) return;
      ValSensStorage.addHistory({
        finalSens: r.toSens,
        dpi: r.toDpi,
        cm360: r.tgtCm,
        source: 'convert'
      });
      ValSensApp.renderHistory();
    });
    render();
  }

  return { init: init, currentResult: currentResult };
})();
