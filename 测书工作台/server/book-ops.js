import { CONTINUE_DEFAULT_WORDS, continueWordsMessage, countWords } from "./playbook.js";
import { addPendingCards, allMilestones, confirmPending, rejectPending } from "./cards.js";
import * as store from "./store.js";
import { nowIso } from "./store.js";

function bad(message, status = 400) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function findBook(data, bookId) {
  const book = data.books.find((item) => item.id === Number(bookId));
  if (!book) throw bad("找不到这本书。", 404);
  return book;
}

const CHAPTER_FIELDS = [
  "title",
  "goal",
  "body",
  "accepted",
  "character_ids",
  "world_ids",
  "foreshadow_ids",
  "relation_ids",
  "place_ids",
  "item_ids",
];

/** Edits a chapter. Real body edits mark it dirty; first acceptance promotes card suggestions to pending. */
export function patchChapter(bookId, chapterId, fields) {
  return store.mutate((data) => {
    const book = findBook(data, bookId);
    const row = (book.chapters || []).find((item) => item.id === Number(chapterId));
    if (!row) throw bad("找不到这一章。", 404);
    const oldBody = String(row.body || "");
    const bodyChanged = fields.body != null && String(fields.body) !== oldBody;
    const acceptNow = fields.accepted === true && !row.accepted;
    for (const key of CHAPTER_FIELDS) if (fields[key] !== undefined) row[key] = fields[key];
    row.word_count = countWords(row.body);
    if (bodyChanged && countWords(oldBody) >= 20) row.dirty = true;
    let promoted = 0;
    if (acceptNow && (row.card_suggestions || []).length) {
      promoted = addPendingCards(book, row.card_suggestions, () => data.childSeq++, `第${row.number}章验收`);
      row.card_suggestions = [];
    }
    book.updated_at = nowIso();
    return { row, promoted };
  });
}

export function confirmCards(bookId, ids) {
  return store.mutate((data) => {
    const book = findBook(data, bookId);
    const count = confirmPending(book, ids, () => data.childSeq++);
    book.updated_at = nowIso();
    return count;
  });
}

export function rejectCards(bookId, ids) {
  return store.mutate((data) => {
    const book = findBook(data, bookId);
    const count = rejectPending(book, ids);
    book.updated_at = nowIso();
    return count;
  });
}

function milestoneOwner(book, { beat_id, segment_id }) {
  if (beat_id != null) return (book.beats || []).find((item) => item.id === Number(beat_id));
  if (segment_id != null) return (book.segments || []).find((item) => item.id === Number(segment_id));
  return null;
}

export function addMilestone(bookId, body) {
  return store.mutate((data) => {
    const book = findBook(data, bookId);
    const owner = milestoneOwner(book, body);
    if (!owner) throw bad("找不到这个阶段或续写段。", 404);
    const text = String(body.text || "").trim();
    if (!text) throw bad("里程碑不能空。");
    if (!Array.isArray(owner.milestones)) owner.milestones = [];
    const row = { id: data.childSeq++, text, target_words: Number(body.target_words) || 0, done: false };
    owner.milestones.push(row);
    book.updated_at = nowIso();
    return row;
  });
}

export function patchMilestone(bookId, milestoneId, fields) {
  return store.mutate((data) => {
    const book = findBook(data, bookId);
    const hit = allMilestones(book).find((item) => item.milestone.id === Number(milestoneId));
    if (!hit) throw bad("找不到这个里程碑。", 404);
    if (fields.text != null) hit.milestone.text = String(fields.text).trim();
    if (fields.target_words != null) hit.milestone.target_words = Number(fields.target_words) || 0;
    if (fields.done != null) hit.milestone.done = Boolean(fields.done);
    book.updated_at = nowIso();
    return hit.milestone;
  });
}

export function deleteMilestone(bookId, milestoneId) {
  return store.mutate((data) => {
    const book = findBook(data, bookId);
    const hit = allMilestones(book).find((item) => item.milestone.id === Number(milestoneId));
    if (!hit) return false;
    hit.owner.milestones = hit.owner.milestones.filter((item) => item.id !== Number(milestoneId));
    book.updated_at = nowIso();
    return true;
  });
}

export function recordDecision(bookId, entry) {
  return store.mutate((data) => {
    const book = findBook(data, bookId);
    if (!Array.isArray(book.decisions)) book.decisions = [];
    book.decisions.push({ at: nowIso(), ...entry });
    return book.decisions;
  });
}

/** Opens a continuation segment; cost cap stays unchanged. */
export function continueBook(bookId, { words, note = "" }) {
  const amount = words == null || words === "" ? CONTINUE_DEFAULT_WORDS : Number(words);
  const message = continueWordsMessage(amount);
  if (message) throw bad(message);
  const current = store.getBook(bookId);
  return store.mutate((data) => {
    const book = findBook(data, bookId);
    const start = current.word_count;
    const end = Number(book.word_cap) + amount;
    if (!Array.isArray(book.segments)) book.segments = [];
    book.segments.push({
      id: data.childSeq++,
      start_words: start,
      end_words: end,
      goal: "",
      summary: "",
      milestones: [],
      outlined: false,
      closed: false,
    });
    book.word_cap = end;
    book.status = "drafting";
    book.recommendation = "continue";
    book.decision_note = note;
    if (!Array.isArray(book.decisions)) book.decisions = [];
    book.decisions.push({ at: nowIso(), decision: "continue", words: amount, word_count: start, note });
    book.updated_at = nowIso();
    return store.enrich(book);
  });
}
