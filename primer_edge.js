(function (global) {
  "use strict";

  const STOP_WORDS = new Set([
    "the", "and", "for", "with", "that", "this", "from", "into", "your", "you", "are", "was",
    "were", "have", "has", "had", "not", "but", "can", "will", "just", "than", "then", "them",
    "they", "their", "what", "when", "where", "which", "who", "why", "how", "all", "any", "each",
    "more", "most", "some", "such", "only", "same", "also", "very", "much", "many", "into", "onto",
    "over", "under", "about", "after", "before", "between", "through", "during", "without", "within",
    "always", "never", "often", "still", "like", "make", "makes", "made", "take", "takes", "give",
    "gives", "find", "finds", "use", "uses", "used", "using", "step", "steps", "rule", "trick",
    "easy", "hard", "scary", "think", "look", "looks", "see", "know", "means", "mean", "called",
    "number", "numbers", "thing", "things", "value", "values", "problem", "answer", "question",
    "one", "two", "three", "first", "second", "third", "every", "both", "either", "other", "another",
    "does", "done", "doing", "being", "been", "because", "while", "until", "since", "unless", "instead",
    "here", "there", "these", "those", "could", "would", "should", "might", "must", "need", "needs"
  ]);

  const EXAM_GOALS = [
    {
      id: "auto",
      label: "All-Around Polymath",
      short: "Polymath",
      worldIds: null,
      desc: "Prioritizes highest-leverage bottleneck skills across all 25 worlds."
    },
    {
      id: "dost_sei",
      label: "DOST-SEI Scholarship",
      short: "DOST-SEI",
      worldIds: ["junior", "senior", "college", "physics", "chemistry", "biology", "earth_space", "abstract_shapes", "verbal-logic", "exam_mastery"],
      desc: "STEM, Math, Mechanical-Technical, Science Graphs & Spatial reasoning."
    },
    {
      id: "upcat",
      label: "UPCAT & Big 4 CETs",
      short: "UPCAT / Big 4",
      worldIds: ["elementary", "junior", "senior", "physics", "chemistry", "biology", "earth_space", "verbal-logic", "filipino", "ph_history", "exam_mastery"],
      desc: "Bilingual Math, Science, Reading, Filipino Wika & R - 1/4W calibration."
    },
    {
      id: "cse_pro",
      label: "Civil Service Exam (Pro)",
      short: "CSE Pro",
      worldIds: ["elementary", "junior", "verbal-logic", "ph_history", "filipino", "philosophy_logic", "exam_mastery"],
      desc: "Numerical reasoning, Verbal/Grammar, Clerical, Logic & RA 6713/Constitution."
    },
    {
      id: "nmat",
      label: "NMAT Medical Track",
      short: "NMAT",
      worldIds: ["junior", "senior", "physics", "chemistry", "biology", "abstract_shapes", "verbal-logic", "philosophy_logic", "exam_mastery"],
      desc: "Perceptual Acuity, Inductive/Quantitative, Bio/Chem/Physics & Social Science."
    },
    {
      id: "coding_swe",
      label: "Software & AI Engineering",
      short: "Coding & AI",
      worldIds: ["ai_ml", "web_coding", "python_tech", "dsa_mastery", "backend_sql_dev", "js_ts_architecture", "college"],
      desc: "Python, DSA, SQL/Backend, JS/TS, Git/Linux & Neural Nets/LLMs."
    },
    {
      id: "shs_stem",
      label: "SHS Grade 11–12 STEM",
      short: "SHS STEM",
      worldIds: ["senior", "college", "physics", "chemistry", "biology", "earth_space", "philosophy_logic"],
      desc: "Pre-Calc, Basic Calc, Gen Physics 1–2, Gen Chem 1–2, Gen Bio 1–2 & Earth Sci."
    }
  ];

  const INTERLEAVE_PRESETS = [
    { id: "smart", label: "Smart 80/20 Mix", desc: "Unlabeled questions biased toward your weak, decaying & bottleneck skills across 5+ worlds." },
    { id: "ph_exams", label: "PH Exams Killer", desc: "Cold-recognition mix across DOST, UPCAT, CSE & NMAT subjects." },
    { id: "stem", label: "STEM Gauntlet", desc: "Unlabeled Math, Physics, Chemistry, Biology & Earth Science mix." },
    { id: "coding_ai", label: "CS, DSA & AI", desc: "Cold-recognition Python, DSA, SQL, Backend, JS/TS & AI/ML mix." },
    { id: "illusions", label: "Illusion Hunter", desc: "Targets Mastery Illusions (Sure + Wrong), Lucky Guesses & logged mistakes." }
  ];

  function ensureEdgeState(state) {
    if (!state || typeof state !== "object") return state;
    if (!state.confidenceLog || typeof state.confidenceLog !== "object") {
      state.confidenceLog = {
        sureRight: 0,
        sureWrong: 0,
        halfRight: 0,
        halfWrong: 0,
        guessRight: 0,
        guessWrong: 0,
        illusions: [],
        luckyHits: []
      };
    } else {
      const c = state.confidenceLog;
      c.sureRight = Number(c.sureRight) || 0;
      c.sureWrong = Number(c.sureWrong) || 0;
      c.halfRight = Number(c.halfRight) || 0;
      c.halfWrong = Number(c.halfWrong) || 0;
      c.guessRight = Number(c.guessRight) || 0;
      c.guessWrong = Number(c.guessWrong) || 0;
      if (!Array.isArray(c.illusions)) c.illusions = [];
      if (!Array.isArray(c.luckyHits)) c.luckyHits = [];
    }
    if (!state.feynmanVerified || typeof state.feynmanVerified !== "object") {
      state.feynmanVerified = {};
    }
    if (!state.examTarget || typeof state.examTarget !== "object") {
      state.examTarget = { goalId: "auto", label: "", dateIso: "" };
    }
    if (!state.edgeStats || typeof state.edgeStats !== "object") {
      state.edgeStats = {
        interleaveRuns: 0,
        interleaveBestPct: 0,
        interleaveMedianSec: null,
        feynmanCount: Object.keys(state.feynmanVerified).length
      };
    }
    return state;
  }

  function mergeEdgeState(base, inc) {
    const b = ensureEdgeState(Object.assign({}, base));
    const i = ensureEdgeState(Object.assign({}, inc));
    const bc = b.confidenceLog;
    const ic = i.confidenceLog;

    const dedupeByKey = (arrA, arrB, cap) => {
      const map = new Map();
      for (const item of [...(arrA || []), ...(arrB || [])]) {
        if (!item) continue;
        const k = `${item.nodeId || ""}::${String(item.prompt || "").slice(0, 90)}`;
        const prev = map.get(k);
        if (!prev || (Number(item.at) || 0) > (Number(prev.at) || 0)) {
          map.set(k, Object.assign({}, item));
        }
      }
      return Array.from(map.values())
        .sort((x, y) => (Number(y.at) || 0) - (Number(x.at) || 0))
        .slice(0, cap);
    };

    const confidenceLog = {
      sureRight: Math.max(bc.sureRight, ic.sureRight),
      sureWrong: Math.max(bc.sureWrong, ic.sureWrong),
      halfRight: Math.max(bc.halfRight, ic.halfRight),
      halfWrong: Math.max(bc.halfWrong, ic.halfWrong),
      guessRight: Math.max(bc.guessRight, ic.guessRight),
      guessWrong: Math.max(bc.guessWrong, ic.guessWrong),
      illusions: dedupeByKey(bc.illusions, ic.illusions, 40),
      luckyHits: dedupeByKey(bc.luckyHits, ic.luckyHits, 40)
    };

    const feynmanVerified = Object.assign({}, b.feynmanVerified || {});
    for (const [nid, rec] of Object.entries(i.feynmanVerified || {})) {
      if (!rec || typeof rec !== "object") continue;
      const cur = feynmanVerified[nid];
      if (!cur || (Number(rec.score) || 0) > (Number(cur.score) || 0) || (Number(rec.updatedAt) || 0) > (Number(cur.updatedAt) || 0)) {
        feynmanVerified[nid] = Object.assign({}, rec);
      }
    }

    const examTarget = (i.examTarget && i.examTarget.dateIso && (!b.examTarget || !b.examTarget.dateIso))
      ? Object.assign({}, i.examTarget)
      : Object.assign({}, b.examTarget || { goalId: "auto", label: "", dateIso: "" });

    const be = b.edgeStats || {};
    const ie = i.edgeStats || {};
    const edgeStats = {
      interleaveRuns: Math.max(Number(be.interleaveRuns) || 0, Number(ie.interleaveRuns) || 0),
      interleaveBestPct: Math.max(Number(be.interleaveBestPct) || 0, Number(ie.interleaveBestPct) || 0),
      interleaveMedianSec: be.interleaveMedianSec != null && ie.interleaveMedianSec != null
        ? Math.min(be.interleaveMedianSec, ie.interleaveMedianSec)
        : (be.interleaveMedianSec != null ? be.interleaveMedianSec : ie.interleaveMedianSec),
      feynmanCount: Object.keys(feynmanVerified).length
    };

    return { confidenceLog, feynmanVerified, examTarget, edgeStats };
  }

  // ==================== 1. CONFIDENCE CALIBRATION ENGINE ====================
  function recordConfidenceOutcome(state, opts) {
    ensureEdgeState(state);
    const c = state.confidenceLog;
    const conf = (opts && (opts.confidence === "half" || opts.confidence === "guess")) ? opts.confidence : "sure";
    const correct = !!(opts && opts.correct);
    const nodeId = (opts && opts.nodeId) || "";
    const nodeTitle = (opts && opts.nodeTitle) || "";
    const prompt = String((opts && opts.prompt) || "").slice(0, 180);
    const answer = String((opts && opts.answer) || "").slice(0, 120);
    const now = Date.now();
    const matchKey = `${nodeId}::${prompt.slice(0, 90)}`;

    if (conf === "sure") {
      if (correct) c.sureRight++;
      else c.sureWrong++;
    } else if (conf === "half") {
      if (correct) c.halfRight++;
      else c.halfWrong++;
    } else {
      if (correct) c.guessRight++;
      else c.guessWrong++;
    }

    if (conf === "sure" && !correct) {
      c.illusions = c.illusions.filter((x) => `${x.nodeId}::${String(x.prompt || "").slice(0, 90)}` !== matchKey);
      c.illusions.unshift({ nodeId, nodeTitle, prompt, answer, at: now });
      if (c.illusions.length > 40) c.illusions = c.illusions.slice(0, 40);
      return {
        tag: "illusion",
        headline: "Mastery Illusion Caught (Sure + Wrong)",
        detail: "High-confidence errors are gold — hypercorrection makes this stick 2x faster now. Queued in Illusion Hunter."
      };
    }

    if (conf === "sure" && correct) {
      if (nodeId) {
        c.illusions = c.illusions.filter((x) => `${x.nodeId}::${String(x.prompt || "").slice(0, 90)}` !== matchKey);
        c.luckyHits = c.luckyHits.filter((x) => `${x.nodeId}::${String(x.prompt || "").slice(0, 90)}` !== matchKey);
      }
      return {
        tag: "calibrated",
        headline: "Calibrated Mastery",
        detail: "Confident and accurate."
      };
    }

    if (correct) {
      c.luckyHits = c.luckyHits.filter((x) => `${x.nodeId}::${String(x.prompt || "").slice(0, 90)}` !== matchKey);
      c.luckyHits.unshift({ nodeId, nodeTitle, prompt, answer, confidence: conf, at: now });
      if (c.luckyHits.length > 40) c.luckyHits = c.luckyHits.slice(0, 40);
      return {
        tag: "lucky",
        headline: conf === "guess" ? "Lucky Guess Logged" : "Shaky 50/50 Hit Logged",
        detail: "You got it right, but flagged uncertainty — saved to Illusion Hunter so exam pressure cannot catch you off guard."
      };
    }

    return {
      tag: "honest_miss",
      headline: "Honest Uncertainty",
      detail: "Good metacognition — you knew you were unsure. On UPCAT (R - 1/4W), recognizing a true guess saves points."
    };
  }

  function getCalibrationMetrics(state) {
    ensureEdgeState(state);
    const c = state.confidenceLog;
    const sureTotal = c.sureRight + c.sureWrong;
    const halfTotal = c.halfRight + c.halfWrong;
    const guessTotal = c.guessRight + c.guessWrong;
    const total = sureTotal + halfTotal + guessTotal;

    const sureAcc = sureTotal > 0 ? Math.round((c.sureRight / sureTotal) * 100) : null;
    const halfAcc = halfTotal > 0 ? Math.round((c.halfRight / halfTotal) * 100) : null;
    const guessAcc = guessTotal > 0 ? Math.round((c.guessRight / guessTotal) * 100) : null;

    // Brier-inspired calibration score: ideal Sure -> 1.0, Half -> 0.5, Guess -> 0.25
    let calibrationScore = null;
    if (total > 0) {
      const brierSum =
        c.sureRight * 0 +
        c.sureWrong * 1.0 +
        c.halfRight * 0.25 +
        c.halfWrong * 0.25 +
        c.guessRight * 0.5625 +
        c.guessWrong * 0.0625;
      const meanErr = brierSum / total;
      calibrationScore = Math.max(0, Math.min(100, Math.round((1 - meanErr) * 100)));
    }

    let upcatAdvice = "Log 5+ quiz answers with Sure / 50-50 / Guess to unlock personalized UPCAT R - 1/4W guessing math.";
    if (total >= 5) {
      if (c.sureWrong >= 2 && sureAcc !== null && sureAcc < 80) {
        upcatAdvice = `Watch overconfidence: your "Sure" accuracy is ${sureAcc}%. Pause 2 seconds to check signs/units before locking.`;
      } else if (halfAcc !== null && halfTotal >= 3 && halfAcc >= 40) {
        upcatAdvice = `Your 50/50 instincts hit ${halfAcc}% (>20% breakeven) — mathematically +EV to answer 50/50s on UPCAT!`;
      } else if (guessAcc !== null && guessTotal >= 3 && guessAcc < 25) {
        upcatAdvice = `Pure guesses hit ${guessAcc}%. On UPCAT (R - 1/4W), skip blind guesses unless you eliminate at least 1 choice.`;
      } else {
        upcatAdvice = `Strong metacognition (${calibrationScore}% calibrated). Keep hunting Mastery Illusions before mock exams.`;
      }
    }

    return {
      total,
      sureTotal,
      halfTotal,
      guessTotal,
      sureAcc,
      halfAcc,
      guessAcc,
      calibrationScore,
      illusionCount: c.illusions.length,
      luckyCount: c.luckyHits.length,
      upcatAdvice
    };
  }

  // ==================== 2. BLIND INTERLEAVE EXAM MIX ====================
  function buildBlindInterleave(state, DATA, TUTOR, presetId, count) {
    ensureEdgeState(state);
    const targetCount = Math.max(4, Math.min(15, Number(count) || 10));
    const preset = INTERLEAVE_PRESETS.find((p) => p.id === presetId) || INTERLEAVE_PRESETS[0];
    const nodes = Array.isArray(DATA && DATA.NODES) ? DATA.NODES : [];
    const worldsById = new Map((Array.isArray(DATA && DATA.WORLDS) ? DATA.WORLDS : []).map((w) => [w.id, w]));

    const presetWorldMap = {
      ph_exams: new Set(["junior", "senior", "physics", "chemistry", "biology", "earth_space", "verbal-logic", "filipino", "ph_history", "abstract_shapes", "exam_mastery"]),
      stem: new Set(["elementary", "junior", "senior", "college", "physics", "chemistry", "biology", "earth_space"]),
      coding_ai: new Set(["ai_ml", "web_coding", "python_tech", "dsa_mastery", "backend_sql_dev", "js_ts_architecture"])
    };

    const illusionNodeIds = new Set((state.confidenceLog.illusions || []).map((x) => x.nodeId).filter(Boolean));
    const luckyNodeIds = new Set((state.confidenceLog.luckyHits || []).map((x) => x.nodeId).filter(Boolean));
    const mistakeNodeIds = new Set((state.mistakes || []).map((m) => m.nodeId).filter(Boolean));
    const decayingIds = new Set();
    if (TUTOR && typeof TUTOR.analyzeLearner === "function") {
      try {
        const analysis = TUTOR.analyzeLearner(state, DATA);
        for (const dn of (analysis && analysis.decayingNodes) || []) {
          if (dn && dn.id) decayingIds.add(dn.id);
        }
      } catch (_e) {}
    }

    let pool = nodes.slice();
    if (preset.id === "illusions") {
      const targeted = nodes.filter((n) => illusionNodeIds.has(n.id) || luckyNodeIds.has(n.id) || mistakeNodeIds.has(n.id));
      pool = targeted.length >= 4 ? targeted : nodes.slice();
    } else if (presetWorldMap[preset.id]) {
      const wSet = presetWorldMap[preset.id];
      const filtered = nodes.filter((n) => wSet.has(n.worldId));
      if (filtered.length >= 4) pool = filtered;
    }

    const scored = pool.map((n) => {
      const lvl = (state.nodeMastery && state.nodeMastery[n.id]) || 0;
      let weight = 10 + Math.random() * 8;
      if (illusionNodeIds.has(n.id)) weight += 26;
      if (luckyNodeIds.has(n.id)) weight += 18;
      if (mistakeNodeIds.has(n.id)) weight += 15;
      if (decayingIds.has(n.id)) weight += 14;
      if (lvl === 0) weight += 6;
      else if (lvl === 1) weight += 9;
      else if (lvl >= 3) weight -= 3;
      return { node: n, weight };
    }).sort((a, b) => b.weight - a.weight);

    // Greedily pick diverse worlds so consecutive questions force genuine cold-recognition switching
    const chosen = [];
    const usedIds = new Set();
    const worldCounts = {};
    for (let pass = 0; pass < 3 && chosen.length < targetCount; pass++) {
      for (const item of scored) {
        if (chosen.length >= targetCount) break;
        const n = item.node;
        if (usedIds.has(n.id)) continue;
        const wc = worldCounts[n.worldId] || 0;
        if (pass === 0 && wc >= 1) continue;
        if (pass === 1 && wc >= 2) continue;
        usedIds.add(n.id);
        worldCounts[n.worldId] = wc + 1;
        chosen.push(n);
      }
    }

    // Shuffle chosen so no two adjacent items share a world when possible
    for (let i = chosen.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = chosen[i];
      chosen[i] = chosen[j];
      chosen[j] = tmp;
    }
    for (let i = 1; i < chosen.length; i++) {
      if (chosen[i].worldId === chosen[i - 1].worldId) {
        const swapIdx = chosen.findIndex((c, idx) => idx > i && c.worldId !== chosen[i - 1].worldId);
        if (swapIdx !== -1) {
          const tmp = chosen[i];
          chosen[i] = chosen[swapIdx];
          chosen[swapIdx] = tmp;
        }
      }
    }

    const questions = [];
    for (const n of chosen) {
      let q = null;
      try {
        if (DATA && typeof DATA.generateProceduralQuestion === "function") {
          const gen = DATA.generateProceduralQuestion(n.id);
          if (gen && gen.prompt) q = Object.assign({}, gen);
        } else if (DATA && typeof DATA.generateProceduralQuestions === "function") {
          const gen = DATA.generateProceduralQuestions(n.id, 1);
          if (Array.isArray(gen) && gen.length > 0) q = Object.assign({}, gen[0]);
        }
      } catch (_e) {}
      if (!q && Array.isArray(n.questions) && n.questions.length > 0) {
        q = Object.assign({}, n.questions[Math.floor(Math.random() * n.questions.length)]);
      }
      if (!q) continue;
      if (q.type === "mc" && Array.isArray(q.options)) {
        const opts = q.options.slice();
        for (let i = opts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const t = opts[i];
          opts[i] = opts[j];
          opts[j] = t;
        }
        q.options = opts;
      }
      const w = worldsById.get(n.worldId);
      q.sourceNodeId = n.id;
      q.nodeId = n.id;
      q.sourceTitle = n.title;
      q.sourceIcon = n.icon || "◆";
      q.sourceWorldTitle = w ? w.title.split(":")[0] : n.worldId;
      q.sourceCheatCode = n.cheatCode || n.easyTruth || "";
      questions.push(q);
    }

    return {
      preset,
      questions,
      distinctWorlds: new Set(questions.map((x) => x.sourceWorldTitle)).size
    };
  }

  // ==================== 3. FEYNMAN ACTIVE-RECALL STUDIO ====================
  function cleanPlainText(raw) {
    return String(raw || "")
      .replace(/\$+/g, " ")
      .replace(/\\[a-zA-Z]+/g, " ")
      .replace(/[`*_~{}\[\]()]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function stemWord(word) {
    let w = String(word || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (w.length <= 3) return w;
    if (w.endsWith("ies") && w.length > 5) return w.slice(0, -3) + "y";
    if (w.endsWith("ing") && w.length > 6) return w.slice(0, -3);
    if (w.endsWith("tion") && w.length > 6) return w.slice(0, -4);
    if (w.endsWith("ed") && w.length > 5) return w.slice(0, -2);
    if (w.endsWith("es") && w.length > 5) return w.slice(0, -2);
    if (w.endsWith("s") && !w.endsWith("ss") && w.length > 4) return w.slice(0, -1);
    return w;
  }

  function extractNodeAnchors(node) {
    if (!node || typeof node !== "object") return [];
    const sources = [
      { text: node.cheatCode || "", weight: 4 },
      { text: node.easyTruth || "", weight: 3 },
      { text: node.title || "", weight: 2 },
      { text: node.tagline || "", weight: 2 },
      ...(Array.isArray(node.microSteps) ? node.microSteps.map((s) => ({
        text: `${s.label || ""} ${s.text || ""}`,
        weight: 2
      })) : [])
    ];

    const scores = new Map();
    const displayMap = new Map();

    for (const src of sources) {
      const cleaned = cleanPlainText(src.text);
      const tokens = cleaned.split(/[^a-zA-Z0-9%+\-=/]+/);
      for (const rawTok of tokens) {
        const lower = rawTok.toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "");
        if (!lower || lower.length < 3) continue;
        if (/^\d+$/.test(lower)) continue;
        if (STOP_WORDS.has(lower)) continue;
        const st = stemWord(lower);
        if (!st || st.length < 3 || STOP_WORDS.has(st)) continue;
        scores.set(st, (scores.get(st) || 0) + src.weight);
        if (!displayMap.has(st) || lower.length < displayMap.get(st).length) {
          displayMap.set(st, lower);
        }
      }
    }

    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 6)
      .map(([stem, weight]) => ({
        stem,
        label: displayMap.get(stem) || stem,
        weight
      }));
  }

  function evaluateFeynman(node, rawText) {
    const text = String(rawText || "").trim();
    const anchors = extractNodeAnchors(node);
    const words = text ? text.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;

    const userStems = new Set();
    const userRaw = text.toLowerCase();
    for (const tok of userRaw.split(/[^a-z0-9]+/)) {
      if (tok.length >= 2) {
        userStems.add(tok);
        userStems.add(stemWord(tok));
      }
    }

    const matched = [];
    const missing = [];
    for (const a of anchors) {
      const hit = userStems.has(a.stem) ||
        userStems.has(a.label) ||
        userRaw.includes(a.stem) ||
        (a.stem.length >= 5 && Array.from(userStems).some((u) => u.startsWith(a.stem.slice(0, 5))));
      if (hit) matched.push(a.label);
      else missing.push(a.label);
    }

    const hasExample = /\b(example|e\.g\.|for instance|imagine|like|suppose|if you|say we|means|because)\b/i.test(text) ||
      /[0-9]+\s*(=|\+|-|\*|\/|→|->|%)/.test(text);

    const anchorRatio = anchors.length > 0 ? matched.length / anchors.length : (wordCount >= 12 ? 1 : 0);
    const lengthScore = Math.min(1, wordCount / 22);
    const exampleBonus = hasExample ? 12 : 0;
    let score = Math.round(anchorRatio * 68 + lengthScore * 20 + exampleBonus);
    if (wordCount < 6) score = Math.min(score, 25);
    score = Math.max(0, Math.min(100, score));

    let grade = "Needs Deeper Intuition";
    let feedback = "Try explaining the 'why' in plain words without jargon, and add a quick 1-line example.";
    if (score >= 82) {
      grade = "Feynman Verified";
      feedback = "Crystal clear! You explained the core mechanism in plain English — this concept is locked into long-term memory.";
    } else if (score >= 60) {
      grade = "Solid Grasp (Patch 1–2 Blind Spots)";
      feedback = missing.length
        ? `Good intuition! Tighten it by weaving in: ${missing.slice(0, 3).join(", ")}.`
        : "Good intuition! Adding a 1-line concrete example will lock it at 100%.";
    } else if (wordCount >= 6 && missing.length) {
      feedback = `You're warming up. Ask yourself how these pieces connect: ${missing.slice(0, 4).join(", ")}.`;
    }

    return {
      score,
      grade,
      wordCount,
      matched,
      missing,
      hasExample,
      feedback,
      passed: score >= 65
    };
  }

  function saveFeynmanCheck(state, node, text, evalResult, MY_VAULT) {
    ensureEdgeState(state);
    if (!node || !node.id) return;
    const prev = state.feynmanVerified[node.id];
    const bestScore = Math.max(prev ? Number(prev.score) || 0 : 0, Number(evalResult && evalResult.score) || 0);
    state.feynmanVerified[node.id] = {
      score: bestScore,
      text: String(text || "").trim(),
      updatedAt: Date.now()
    };
    state.edgeStats.feynmanCount = Object.keys(state.feynmanVerified).length;
    if (MY_VAULT && typeof MY_VAULT.saveLessonNote === "function" && String(text || "").trim()) {
      const existing = state.userNotes && state.userNotes[node.id] ? String(state.userNotes[node.id].text || "") : "";
      const feynmanBlock = `**Feynman Check (${bestScore}%):** ${String(text || "").trim()}`;
      const combined = existing && !existing.includes(String(text || "").trim())
        ? `${existing}\n\n${feynmanBlock}`
        : (existing || feynmanBlock);
      MY_VAULT.saveLessonNote(state, node.id, node.title, combined);
    }
  }

  // ==================== 4. 80/20 ROI BOTTLENECK SNIPER ====================
  function computeDownstreamReach(TUTOR) {
    const graph = (TUTOR && TUTOR.DEPENDENCY_GRAPH) || {};
    const children = {};
    for (const [nodeId, prereqs] of Object.entries(graph)) {
      for (const p of (Array.isArray(prereqs) ? prereqs : [])) {
        if (!children[p]) children[p] = [];
        children[p].push(nodeId);
      }
    }
    const reachMap = {};
    for (const start of Object.keys(graph)) {
      const visited = new Set();
      const stack = (children[start] || []).slice();
      while (stack.length) {
        const cur = stack.pop();
        if (visited.has(cur)) continue;
        visited.add(cur);
        for (const nxt of (children[cur] || [])) {
          if (!visited.has(nxt)) stack.push(nxt);
        }
      }
      reachMap[start] = visited.size;
    }
    return reachMap;
  }

  function computeRoiTargets(state, DATA, TUTOR, limit) {
    ensureEdgeState(state);
    const maxItems = Math.max(1, Number(limit) || 4);
    const nodes = Array.isArray(DATA && DATA.NODES) ? DATA.NODES : [];
    const targetCfg = state.examTarget || { goalId: "auto", label: "", dateIso: "" };
    const goal = EXAM_GOALS.find((g) => g.id === targetCfg.goalId) || EXAM_GOALS[0];
    const goalWorlds = goal.worldIds ? new Set(goal.worldIds) : null;

    const reachMap = computeDownstreamReach(TUTOR);
    const graph = (TUTOR && TUTOR.DEPENDENCY_GRAPH) || {};
    const mastery = state.nodeMastery || {};
    const illusionSet = new Set((state.confidenceLog.illusions || []).map((x) => x.nodeId));
    const mistakeSet = new Set((state.mistakes || []).map((m) => m.nodeId));

    const goalNodes = goalWorlds ? nodes.filter((n) => goalWorlds.has(n.worldId)) : nodes;
    const masteredInGoal = goalNodes.filter((n) => (mastery[n.id] || 0) >= 1).length;
    const totalInGoal = goalNodes.length;
    const readinessPct = totalInGoal > 0 ? Math.round((masteredInGoal / totalInGoal) * 100) : 0;

    let daysLeft = null;
    let dailyQuota = null;
    if (targetCfg.dateIso && /^\d{4}-\d{2}-\d{2}$/.test(targetCfg.dateIso)) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(`${targetCfg.dateIso}T00:00:00`);
      const diff = Math.ceil((due.getTime() - today.getTime()) / 86400000);
      daysLeft = Math.max(0, diff);
      const remaining = Math.max(0, totalInGoal - masteredInGoal);
      dailyQuota = daysLeft > 0 ? Math.max(1, Math.ceil(remaining / daysLeft)) : remaining;
    }

    const candidates = [];
    for (const n of nodes) {
      const lvl = mastery[n.id] || 0;
      const hasIllusion = illusionSet.has(n.id);
      const hasMistake = mistakeSet.has(n.id);
      if (lvl >= 2 && !hasIllusion && !hasMistake) continue;
      if (goalWorlds && !goalWorlds.has(n.worldId) && !hasIllusion) continue;

      const reach = reachMap[n.id] || 0;
      const prereqs = Array.isArray(graph[n.id]) ? graph[n.id] : [];
      const prereqsMet = prereqs.every((p) => (mastery[p] || 0) >= 1);

      let roiScore = reach * 3.5 + (prereqsMet ? 14 : 0);
      if (goalWorlds && goalWorlds.has(n.worldId)) roiScore += 16;
      if (hasIllusion) roiScore += 24;
      if (hasMistake) roiScore += 12;
      if (lvl === 0) roiScore += 5;
      else if (lvl === 1) roiScore += 2;

      const reasons = [];
      if (hasIllusion) reasons.push("Mastery Illusion");
      if (reach > 0) reasons.push(`Unlocks ${reach} skill${reach === 1 ? "" : "s"}`);
      if (hasMistake && !hasIllusion) reasons.push("Active Mistake");
      if (prereqsMet && lvl === 0) reasons.push("Ready Now");
      if (!reasons.length) reasons.push("High-Yield Core");

      candidates.push({
        node: n,
        reach,
        prereqsMet,
        hasIllusion,
        hasMistake,
        roiScore: Math.round(roiScore),
        reason: reasons.slice(0, 2).join(" · ")
      });
    }

    candidates.sort((a, b) => b.roiScore - a.roiScore || b.reach - a.reach);
    return {
      goal,
      dateIso: targetCfg.dateIso || "",
      daysLeft,
      dailyQuota,
      readinessPct,
      masteredInGoal,
      totalInGoal,
      targets: candidates.slice(0, maxItems)
    };
  }

  // ==================== 5. OFFLINE WEBAUDIO FOCUS SOUNDSCAPES ====================
  const AudioFocus = (function () {
    let mode = "off";
    let ctx = null;
    let masterGain = null;
    let activeNodes = [];
    let volume = 0.16;

    function stopCurrent() {
      for (const n of activeNodes) {
        try {
          if (typeof n.stop === "function") n.stop();
          if (typeof n.disconnect === "function") n.disconnect();
        } catch (_e) {}
      }
      activeNodes = [];
    }

    function ensureCtx() {
      if (typeof window === "undefined") return null;
      try {
        if (!ctx) {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) return null;
          ctx = new AC();
          masterGain = ctx.createGain();
          masterGain.gain.value = volume;
          masterGain.connect(ctx.destination);
        }
        if (ctx.state === "suspended") ctx.resume();
        return ctx;
      } catch (_e) {
        return null;
      }
    }

    function makeNoiseBuffer(audioCtx, type) {
      const sampleRate = audioCtx.sampleRate || 44100;
      const length = sampleRate * 4;
      const buffer = audioCtx.createBuffer(2, length, sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = buffer.getChannelData(ch);
        let lastOut = 0;
        for (let i = 0; i < length; i++) {
          const white = Math.random() * 2 - 1;
          if (type === "brown") {
            lastOut = (lastOut + 0.02 * white) / 1.02;
            data[i] = lastOut * 3.2;
          } else {
            lastOut = 0.85 * lastOut + 0.15 * white;
            data[i] = lastOut * 1.4;
          }
        }
      }
      return buffer;
    }

    function setMode(nextMode) {
      const valid = ["off", "brown", "gamma40", "rain"];
      const target = valid.includes(nextMode) ? nextMode : "off";
      stopCurrent();
      mode = target;
      if (target === "off") return mode;

      const c = ensureCtx();
      if (!c || !masterGain) return mode;
      try {
        if (target === "brown") {
          const src = c.createBufferSource();
          src.buffer = makeNoiseBuffer(c, "brown");
          src.loop = true;
          const filter = c.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = 340;
          const g = c.createGain();
          g.gain.value = 0.85;
          src.connect(filter);
          filter.connect(g);
          g.connect(masterGain);
          src.start();
          activeNodes.push(src, filter, g);
        } else if (target === "rain") {
          const src = c.createBufferSource();
          src.buffer = makeNoiseBuffer(c, "rain");
          src.loop = true;
          const bp = c.createBiquadFilter();
          bp.type = "bandpass";
          bp.frequency.value = 1150;
          bp.Q.value = 0.7;
          const lfo = c.createOscillator();
          const lfoGain = c.createGain();
          lfo.frequency.value = 0.14;
          lfoGain.gain.value = 0.18;
          const rainGain = c.createGain();
          rainGain.gain.value = 0.55;
          lfo.connect(lfoGain);
          lfoGain.connect(rainGain.gain);
          src.connect(bp);
          bp.connect(rainGain);
          rainGain.connect(masterGain);
          src.start();
          lfo.start();
          activeNodes.push(src, bp, lfo, lfoGain, rainGain);
        } else if (target === "gamma40") {
          // Soft brown bed + gentle 200Hz L / 240Hz R binaural 40Hz focus tone
          const src = c.createBufferSource();
          src.buffer = makeNoiseBuffer(c, "brown");
          src.loop = true;
          const lp = c.createBiquadFilter();
          lp.type = "lowpass";
          lp.frequency.value = 260;
          const bedGain = c.createGain();
          bedGain.gain.value = 0.45;
          src.connect(lp);
          lp.connect(bedGain);
          bedGain.connect(masterGain);
          src.start();

          const oscL = c.createOscillator();
          const oscR = c.createOscillator();
          oscL.type = "sine";
          oscR.type = "sine";
          oscL.frequency.value = 200;
          oscR.frequency.value = 240;
          const toneGain = c.createGain();
          toneGain.gain.value = 0.16;

          if (typeof c.createStereoPanner === "function") {
            const panL = c.createStereoPanner();
            const panR = c.createStereoPanner();
            panL.pan.value = -0.8;
            panR.pan.value = 0.8;
            oscL.connect(panL);
            oscR.connect(panR);
            panL.connect(toneGain);
            panR.connect(toneGain);
            activeNodes.push(panL, panR);
          } else {
            oscL.connect(toneGain);
            oscR.connect(toneGain);
          }
          toneGain.connect(masterGain);
          oscL.start();
          oscR.start();
          activeNodes.push(src, lp, bedGain, oscL, oscR, toneGain);
        }
      } catch (_e) {}
      return mode;
    }

    return {
      setMode,
      getMode: () => mode,
      setVolume: (v) => {
        volume = Math.max(0.02, Math.min(0.45, Number(v) || 0.16));
        if (masterGain) masterGain.gain.value = volume;
      },
      stop: () => setMode("off")
    };
  })();

  global.PRIMER_EDGE = {
    EXAM_GOALS,
    INTERLEAVE_PRESETS,
    ensureEdgeState,
    mergeEdgeState,
    recordConfidenceOutcome,
    getCalibrationMetrics,
    buildBlindInterleave,
    extractNodeAnchors,
    evaluateFeynman,
    saveFeynmanCheck,
    computeDownstreamReach,
    computeRoiTargets,
    AudioFocus
  };
})(typeof window !== "undefined" ? window : globalThis);
