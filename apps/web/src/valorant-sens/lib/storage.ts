export type HistoryItem = {
  id: string;
  date: string;
  finalSens: number;
  dpi: number;
  cm360: number | null;
  source?: string;
};

export type FinalSens = {
  sens: number;
  dpi: number;
  cm360: number | null;
  source?: string;
  log?: unknown[];
  hsRate?: number;
  headshots?: number;
  shots?: number;
};

export type Hipfire = {
  dpi: number;
  sens: number;
  yaw: number;
  gameId: string;
  cm360: number | null;
};

export type ValSensState = {
  lastInputs: Record<string, unknown> | null;
  lastConvert: Hipfire | null;
  psaSession: unknown;
  lastTune: Record<string, string> | null;
  profile: {
    dpi?: string;
    oldSens?: string;
    habits?: Record<string, boolean>;
  } | null;
  wizardSession: unknown;
  finalSens: FinalSens | null;
  history: HistoryItem[];
  savedAt: string | null;
};

const KEY = 'hao.valorant-sens.v1';
const HISTORY_MAX = 10;

function empty(): ValSensState {
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

function load(): ValSensState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const data = JSON.parse(raw) as ValSensState;
    if (!data || typeof data !== 'object') return empty();
    if (!Array.isArray(data.history)) data.history = [];
    data.history.forEach((item, i) => {
      if (!item.id) item.id = 'h' + i + '-' + String(item.date || i);
    });
    return data;
  } catch {
    return empty();
  }
}

function save(data: Partial<ValSensState>) {
  const payload = { ...empty(), ...data, savedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(payload));
  return payload;
}

function patch(partial: Partial<ValSensState>) {
  return save({ ...load(), ...partial });
}

function addHistory(entry: { finalSens: number; dpi: number; cm360: number | null; source?: string }) {
  const data = load();
  const item: HistoryItem = {
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

function removeHistory(id: string) {
  const data = load();
  data.history = data.history.filter((h) => h.id !== id);
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

function importJSON(file: File) {
  return new Promise<ValSensState>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(String(e.target?.result)) as ValSensState;
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

export const ValSensStorage = {
  KEY,
  load,
  save,
  patch,
  addHistory,
  removeHistory,
  exportJSON,
  importJSON
};
