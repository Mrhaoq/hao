const Storage = (function () {
  const KEY = 'personality_test_v1';

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify({ ...data, savedAt: new Date().toISOString() }));
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  function saveProgress(answers, mode, currentIndex, view) {
    const existing = load() || {};
    save({ ...existing, answers, mode, currentIndex, view, result: existing.result || null });
  }

  function saveResult(result, answers, mode) {
    save({ answers, result, mode, view: 'result', currentIndex: 0 });
  }

  function exportJSON() {
    const data = load();
    if (!data) return false;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personality-backup-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  }

  function importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          save(data);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  return { load, save, clear, saveProgress, saveResult, exportJSON, importJSON, KEY };
})();
