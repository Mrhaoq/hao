const ValSensStorage = (function () {
  const KEY = 'hao.valorant-sens.v1';
  const HISTORY_MAX = 10;

  function empty() {
    return {
      lastInputs: null,
      lastConvert: null,
      psaSession: null,
      lastTune: null,
      profile: null,
      wizardSession: null,
      finalSens: null,
      history: [],
      savedAt: null
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return empty();
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return empty();
      if (!Array.isArray(data.history)) data.history = [];
      data.history.forEach(function (item, i) {
        if (!item.id) item.id = 'h' + i + '-' + String(item.date || i);
      });
      return data;
    } catch {
      return empty();
    }
  }

  function save(data) {
    const payload = Object.assign({}, empty(), data, {
      savedAt: new Date().toISOString()
    });
    localStorage.setItem(KEY, JSON.stringify(payload));
    return payload;
  }

  function patch(partial) {
    return save(Object.assign({}, load(), partial));
  }

  function addHistory(entry) {
    const data = load();
    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: new Date().toISOString(),
      finalSens: entry.finalSens,
      dpi: entry.dpi,
      cm360: entry.cm360,
      source: entry.source || 'convert'
    };
    data.history = [item].concat(data.history).slice(0, HISTORY_MAX);
    save(data);
    return item;
  }

  function removeHistory(id) {
    const data = load();
    data.history = data.history.filter(function (h) { return h.id !== id; });
    save(data);
  }

  function exportJSON() {
    const data = load();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hao-valorant-sens-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '.json';
    a.click();
    URL.revokeObjectURL(url);
    return true;
  }

  function importJSON(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const data = JSON.parse(e.target.result);
          if (!data || typeof data !== 'object') throw new Error('invalid');
          if (!Array.isArray(data.history)) data.history = [];
          save(data);
          resolve(load());
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  return {
    KEY: KEY,
    load: load,
    save: save,
    patch: patch,
    addHistory: addHistory,
    removeHistory: removeHistory,
    exportJSON: exportJSON,
    importJSON: importJSON
  };
})();
