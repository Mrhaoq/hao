/**
 * 多维度人格测试计分引擎
 */
const Scoring = (function () {
  const ENNEA_TYPES = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const DISC_TYPES = ['D', 'I', 'S', 'C'];
  const RIASEC_TYPES = ['R', 'I', 'A', 'S', 'E', 'C'];
  const OCEAN_DIMS = ['O', 'C', 'E', 'A', 'N'];

  function toPercent(a, b) {
    const total = a + b;
    if (total === 0) return 50;
    return Math.round((a / total) * 100);
  }

  function resolvePair(raw, labelA, labelB) {
    const pctA = toPercent(Math.max(0, raw.a), Math.max(0, raw.b));
    const pctB = 100 - pctA;
    const diff = Math.abs(pctA - 50);
    const letter = pctA >= pctB ? labelA : labelB;
    return { letter, pctA, pctB, labelA, labelB, ambiguous: diff <= 8, raw };
  }

  function scoreMBTI(questions, answers) {
    const raw = { EI: { a: 0, b: 0 }, SN: { a: 0, b: 0 }, TF: { a: 0, b: 0 }, JP: { a: 0, b: 0 } };
    questions
      .filter((q) => q.module === 'M1')
      .forEach((q) => {
        const ans = answers[q.id];
        if (!ans) return;
        const v = q.reverse ? 6 - Number(ans) : Number(ans);
        const weight = v - 3;
        const positive = ['E', 'S', 'T', 'J'].includes(q.pole);
        if (positive) raw[q.dimension].a += weight;
        else raw[q.dimension].b += weight;
      });
    const ei = resolvePair(raw.EI, 'E', 'I');
    const sn = resolvePair(raw.SN, 'S', 'N');
    const tf = resolvePair(raw.TF, 'T', 'F');
    const jp = resolvePair(raw.JP, 'J', 'P');
    return { type: ei.letter + sn.letter + tf.letter + jp.letter, dimensions: { EI: ei, SN: sn, TF: tf, JP: jp } };
  }

  function scoreFacets(questions, answers) {
    const facets = {};
    questions
      .filter((q) => q.module === 'M2')
      .forEach((q) => {
        const ans = answers[q.id];
        if (!ans) return;
        const v = q.reverse ? 6 - Number(ans) : Number(ans);
        if (!facets[q.facet]) facets[q.facet] = { sum: 0, count: 0, label: q.facetLabel };
        facets[q.facet].sum += v;
        facets[q.facet].count += 1;
      });
    Object.keys(facets).forEach((k) => {
      facets[k].avg = Math.round((facets[k].sum / facets[k].count) * 10) / 10;
      facets[k].pct = Math.round(((facets[k].avg - 1) / 4) * 100);
    });
    return facets;
  }

  function scoreAT(questions, answers) {
    let aScore = 0;
    let tScore = 0;
    questions
      .filter((q) => q.module === 'M3')
      .forEach((q) => {
        const ans = answers[q.id];
        if (!ans) return;
        const v = q.reverse ? 6 - Number(ans) : Number(ans);
        if (q.pole === 'A') aScore += v - 3;
        else tScore += v - 3;
      });
    return {
      letter: aScore >= tScore ? 'A' : 'T',
      label: aScore >= tScore ? '自信型 (Assertive)' : '动荡型 (Turbulent)',
      aScore,
      tScore,
    };
  }

  function sumDirect(questions, answers, types) {
    const scores = {};
    types.forEach((t) => (scores[t] = 0));
    questions.forEach((q) => {
      const ans = answers[q.id];
      if (!ans) return;
      const v = q.reverse ? 6 - Number(ans) : Number(ans);
      scores[q.pole] += v - 3;
    });
    return scores;
  }

  function scoreBigFive(questions, answers) {
    const qs = questions.filter((q) => q.module === 'M4');
    const scores = sumDirect(qs, answers, OCEAN_DIMS);
    const perDim = qs.filter((q) => q.pole === 'O').length || 8;
    const maxRaw = perDim * 2;
    const result = {};
    OCEAN_DIMS.forEach((d) => {
      const raw = scores[d];
      const pct = Math.round(((raw + maxRaw) / (maxRaw * 2)) * 100);
      result[d] = { raw, pct: Math.max(5, Math.min(95, pct)), level: pct >= 65 ? '高' : pct <= 35 ? '低' : '中' };
    });
    return result;
  }

  function scoreEnneagram(questions, answers) {
    const scores = sumDirect(
      questions.filter((q) => q.module === 'M5'),
      answers,
      ENNEA_TYPES
    );
    const sorted = ENNEA_TYPES.map((t) => ({ type: t, score: scores[t] })).sort((a, b) => b.score - a.score);
    const primary = sorted[0].type;
    const n = Number(primary);
    const left = String(n === 1 ? 9 : n - 1);
    const right = String(n === 9 ? 1 : n + 1);
    const wing = scores[left] >= scores[right] ? left : right;
    return { primary, wing, scores: sorted, wingLabel: `${primary}w${wing}` };
  }

  function scoreDISC(questions, answers) {
    const scores = sumDirect(questions.filter((q) => q.module === 'M6'), answers, DISC_TYPES);
    const sorted = DISC_TYPES.map((t) => ({ type: t, score: scores[t] })).sort((a, b) => b.score - a.score);
    return { primary: sorted[0].type, secondary: sorted[1].type, scores: sorted };
  }

  function scoreRIASEC(questions, answers) {
    const scores = sumDirect(questions.filter((q) => q.module === 'M7'), answers, RIASEC_TYPES);
    const sorted = RIASEC_TYPES.map((t) => ({ type: t, score: scores[t] })).sort((a, b) => b.score - a.score);
    return { code: sorted.slice(0, 3).map((s) => s.type).join(''), top3: sorted.slice(0, 3), scores: sorted };
  }

  function checkConsistency(questions, answers) {
    const pairs = questions.filter((q) => q.consistencyPair);
    let conflicts = 0;
    pairs.forEach((q) => {
      const v1 = q.reverse ? 6 - Number(answers[q.id]) : Number(answers[q.id]);
      const partner = questions.find((x) => x.id === q.consistencyPair);
      if (!answers[q.id] || !answers[q.consistencyPair] || !partner) return;
      const v2 = partner.reverse ? 6 - Number(answers[q.consistencyPair]) : Number(answers[q.consistencyPair]);
      if (Math.abs(v1 - v2) >= 3) conflicts += 1;
    });
    return {
      reliable: conflicts <= 2,
      conflicts,
      msg: conflicts <= 2 ? '作答一致性良好，结果可信度较高。' : '部分题目作答存在较大矛盾，建议谨慎解读或重新测试。',
    };
  }

  function computeAll(questions, answers) {
    const mbti = scoreMBTI(questions, answers);
    const at = scoreAT(questions, answers);
    return {
      mbti,
      fullType: mbti.type + '-' + at.letter,
      facets: scoreFacets(questions, answers),
      at,
      ocean: scoreBigFive(questions, answers),
      ennea: scoreEnneagram(questions, answers),
      disc: scoreDISC(questions, answers),
      riasec: scoreRIASEC(questions, answers),
      consistency: checkConsistency(questions, answers),
      computedAt: new Date().toISOString(),
    };
  }

  return { computeAll };
})();
