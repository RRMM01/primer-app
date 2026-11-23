(function () {
  "use strict";

  const DATA = window.MATHLINGO_DATA;
  const VIZ = window.MATHLINGO_VISUALIZERS;
  const MEM = window.MATHLINGO_MEMORIZE;
  const TUTOR = window.MATHLINGO_TUTOR;
  const LATEX = window.MATHLINGO_LATEX;
  const CODE_ENGINE = window.EVERYLINGO_CODE_ENGINE;
  const CODE_FORGE = window.EVERYLINGO_CODE_FORGE;
  const EXAM_MODE = window.EVERYLINGO_EXAM_MODE;
  const WHITEBOARD = window.PRIMER_WHITEBOARD;
  const WORK_STUDIO = window.PRIMER_WORK_STUDIO;
  const MY_VAULT = window.PRIMER_MY_VAULT;
  const CONSTELLATION = window.PRIMER_CONSTELLATION;
  const EDGE = window.PRIMER_EDGE;
  const ONBOARDING = window.PRIMER_ONBOARDING;
  // Expose universal Primer & legacy aliases
  window.PRIMER_DATA = DATA;
  window.EVERYLINGO_DATA = DATA;
  window.EVERYLINGO_VISUALIZERS = VIZ;
  window.EVERYLINGO_MEMORIZE = MEM;
  window.EVERYLINGO_TUTOR = TUTOR;
  window.EVERYLINGO_LATEX = LATEX;
  const BUILD = window.PRIMER_BUILD || window.EVERYLINGO_BUILD || {
    version: "3.0.0",
    codename: "Primer Studio",
    buildHash: "dev",
    builtAt: "",
    runtime: "workspace",
    releases: []
  };
  const CURRENT_BUILD_KEY = `${BUILD.version}+${BUILD.buildHash}`;
  const PRIMER_STORAGE_KEY = "primer_v1_state";
  const PRIMARY_STORAGE_KEY = "everylingo_v1_state";
  const STORAGE_KEY = "mathlingo_v2_state";
  const LEGACY_KEY = "mathlingo_v1_state";
  let deferredInstallPrompt = null;

  const defaultState = {
    xp: 0,
    gems: 100,
    streak: 1,
    dailyStreak: 1,
    lastStudiedDate: null,
    streakFreezes: 0,
    studyLog: {},
    paperTheme: "noir",
    ownedThemes: ["noir"],
    uiThemeVersion: 3,
    lastSeenBuildKey: null,
    strictPrereqs: true,
    pathStatusFilter: "all",
    pipAccessory: "none",
    ownedAccessories: ["none"],
    hearts: 5,
    chillMode: true,
    bestCombo: 0,
    muted: false,
    lightTheme: false,
    instantAdvance: true,
    nodeMastery: {},
    multMastered: {},
    trapBusted: {},
    synthSolved: {},
    trapsSubTab: "traps",
    mistakes: [],
    resolvedMistakesCount: 0,
    gymBest: {},
    badges: [],
    diagnosticNodeId: null,
    diagnosticSummary: null,
    diagnosticCracks: [],
    activeTab: "path",
    eraFilter: "all",
    pathBrowseAll: false,
    hideHowItWorks: false,
    activeLabId: "aiNeuralLab",
    labCategory: "all",
    pathQuery: "",
    cheatQuery: "",
    forgeSolved: {},
    forgeCode: {},
    forgeActiveQuestId: "zero-hello-print",
    forgeTrack: "zero",
    forgeView: "library",
    activeExamId: "dost_sei",
    examHistory: [],
    userBookmarks: [],
    userNotes: {},
    userDecks: [],
    derivationsSolved: {},
    dailyChecklist: {},
    focusLog: {},
    focusMinutesTotal: 0,
    edgeInterleavePreset: "smart",
    confidenceLog: { sureRight: 0, sureWrong: 0, halfRight: 0, halfWrong: 0, guessRight: 0, guessWrong: 0, illusions: [], luckyHits: [] },
    feynmanVerified: {},
    examTarget: { goalId: "auto", label: "", dateIso: "" },
    edgeStats: { interleaveRuns: 0, interleaveBestPct: 0, interleaveMedianSec: null, feynmanCount: 0 },
    onboardingCompleted: false,
    studioConfig: null
  };

  let storageAvailable = (function () {
    try {
      const k = "__ml_probe__";
      window.localStorage.setItem(k, "1");
      window.localStorage.removeItem(k);
      return true;
    } catch (_e) {
      return false;
    }
  })();

  let state = loadState();
  if (TUTOR) TUTOR.ensureTelemetry(state);
  if (EDGE) EDGE.ensureEdgeState(state);
  if (ONBOARDING) ONBOARDING.ensureStudioConfig(state);
  let pendingExternalSprint = null;
  let pendingBootEdgeAction = null;
  let pendingBootIntro = false;
  let activeProcSynth = null;
  let synthFeedbackMap = {};

  function loadState() {
    try {
      const raw = window.localStorage.getItem(PRIMER_STORAGE_KEY) || window.localStorage.getItem(PRIMARY_STORAGE_KEY) || window.localStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(LEGACY_KEY);
      if (!raw) return Object.assign({}, defaultState);
      const parsed = JSON.parse(raw);
      const merged = Object.assign({}, defaultState, parsed);
      const validDarkThemes = ["noir", "carbon", "kyoto", "monochrome"];
      const owned = new Set(Array.isArray(merged.ownedThemes) ? merged.ownedThemes.filter((k) => validDarkThemes.includes(k)) : []);
      owned.add("noir");
      merged.ownedThemes = Array.from(owned);
      // Enforce pitch-black dark mode only (migrate away from deprecated light themes)
      merged.uiThemeVersion = 3;
      merged.lightTheme = false;
      if (!validDarkThemes.includes(merged.paperTheme)) {
        merged.paperTheme = "noir";
      }
      if (typeof parsed.strictPrereqs !== "boolean") {
        merged.strictPrereqs = true;
      }
      // Smoothly migrate fresh learners away from the old advanced default quest to Start-from-Zero Lesson 1
      const forgeDoneCount = Object.keys(merged.forgeSolved || {}).length;
      if (forgeDoneCount === 0 && merged.forgeActiveQuestId === "py-rpg-damage" && !(merged.forgeCode && merged.forgeCode["py-rpg-damage"])) {
        merged.forgeActiveQuestId = "zero-hello-print";
        merged.forgeTrack = "zero";
        merged.forgeView = "library";
      }
      if (!merged.forgeView) merged.forgeView = "library";
      if (!Array.isArray(merged.userBookmarks)) merged.userBookmarks = [];
      if (!merged.userNotes || typeof merged.userNotes !== "object") merged.userNotes = {};
      if (!Array.isArray(merged.userDecks)) merged.userDecks = [];
      if (!merged.derivationsSolved || typeof merged.derivationsSolved !== "object") merged.derivationsSolved = {};
      if (!merged.dailyChecklist || typeof merged.dailyChecklist !== "object") merged.dailyChecklist = {};
      if (!merged.focusLog || typeof merged.focusLog !== "object") merged.focusLog = {};
      if (typeof merged.focusMinutesTotal !== "number") merged.focusMinutesTotal = 0;
      return merged;
    } catch (_e) {
      return Object.assign({}, defaultState);
    }
  }

  function saveState() {
    try {
      const serialized = JSON.stringify(state);
      window.localStorage.setItem(PRIMER_STORAGE_KEY, serialized);
      window.localStorage.setItem(PRIMARY_STORAGE_KEY, serialized);
    } catch (_e) {}
  }

  // PWA Service Worker & Install Prompt (http/https workspace only; silently skipped in standalone HTML)
  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (ev) => {
      ev.preventDefault();
      deferredInstallPrompt = ev;
      renderNavTabs();
    });
    window.addEventListener("appinstalled", () => {
      deferredInstallPrompt = null;
      renderNavTabs();
    });
    if (
      "serviceWorker" in navigator &&
      BUILD.runtime !== "standalone" &&
      (window.location.protocol === "https:" || window.location.protocol === "http:")
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch(() => {});
      });
    }
    try {
      const qsParams = new URLSearchParams(window.location.search);
      const urlTab = qsParams.get("tab");
      const allowedTabs = ["path", "constellation", "work", "exam", "forge", "myvault", "tutor", "memorize", "gym", "lab", "traps", "cheatsheet"];
      if (urlTab && allowedTabs.includes(urlTab)) {
        state.activeTab = urlTab;
      }
      const urlEdge = qsParams.get("edge");
      if (urlEdge === "interleave" || urlEdge === "feynman" || urlEdge === "illusions") {
        pendingBootEdgeAction = urlEdge;
      }
      if (qsParams.get("intro") === "1" || qsParams.get("setup") === "1") {
        pendingBootIntro = true;
      }
    } catch (_e) {}
  }

  const AudioFX = (function () {
    let ctx = null;
    function getCtx() {
      if (state.muted) return null;
      try {
        if (!ctx) {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (AC) ctx = new AC();
        }
        if (ctx && ctx.state === "suspended") ctx.resume();
        return ctx;
      } catch (_e) {
        return null;
      }
    }
    function tone(freq, dur, type, delay) {
      const c = getCtx();
      if (!c) return;
      try {
        const now = c.currentTime + (delay || 0);
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = type || "sine";
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now);
        osc.stop(now + dur);
      } catch (_e) {}
    }
    return {
      playTap: () => tone(520, 0.05, "triangle", 0),
      playCorrect: () => {
        tone(523.25, 0.11, "triangle", 0);
        tone(659.25, 0.14, "triangle", 0.08);
        tone(783.99, 0.18, "triangle", 0.16);
      },
      playWrong: () => {
        tone(240, 0.16, "sawtooth", 0);
        tone(185, 0.22, "sawtooth", 0.12);
      },
      playLevelUp: () => {
        tone(523.25, 0.12, "triangle", 0);
        tone(659.25, 0.12, "triangle", 0.1);
        tone(783.99, 0.12, "triangle", 0.2);
        tone(1046.5, 0.3, "triangle", 0.3);
      }
    };
  })();

  let session = null;

  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fmtMath(str, display) {
    return LATEX ? LATEX.formatMath(str, display) : escapeHtml(str);
  }

  function normalizeAnswer(str) {
    return String(str || "")
      .trim()
      .toLowerCase()
      .replace(/−/g, "-")
      .replace(/\s+/g, "");
  }

  function isFinePointer() {
    return typeof window === "undefined" || !window.matchMedia || !window.matchMedia("(pointer: coarse)").matches;
  }

  function getTodayIso() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function recordStudyActivity(reps) {
    const today = getTodayIso();
    if (!state.studyLog || typeof state.studyLog !== "object") state.studyLog = {};
    state.studyLog[today] = (state.studyLog[today] || 0) + (reps || 1);

    if (state.lastStudiedDate !== today) {
      if (!state.lastStudiedDate) {
        state.dailyStreak = Math.max(1, state.dailyStreak || 1);
      } else {
        const prev = new Date(state.lastStudiedDate + "T00:00:00");
        const cur = new Date(today + "T00:00:00");
        const diffDays = Math.round((cur - prev) / (24 * 60 * 60 * 1000));
        if (diffDays === 1) {
          state.dailyStreak = (state.dailyStreak || 1) + 1;
        } else if (diffDays === 2 && (state.streakFreezes || 0) > 0) {
          state.streakFreezes--;
          state.dailyStreak = (state.dailyStreak || 1) + 1;
        } else if (diffDays > 1) {
          state.dailyStreak = 1;
        }
      }
      state.lastStudiedDate = today;
      state.streak = state.dailyStreak;
    }
  }

  function markDailyStep(stepKey) {
    if (!stepKey) return;
    const today = getTodayIso();
    if (!state.dailyChecklist || typeof state.dailyChecklist !== "object") state.dailyChecklist = {};
    if (!state.dailyChecklist[today] || typeof state.dailyChecklist[today] !== "object") {
      state.dailyChecklist[today] = {};
    }
    state.dailyChecklist[today][stepKey] = true;
    // Keep only the last 14 days so localStorage and sync links stay compact
    const keys = Object.keys(state.dailyChecklist).sort();
    while (keys.length > 14) {
      delete state.dailyChecklist[keys.shift()];
    }
  }

  // ==================== PERSISTENT FOCUS TIMER (POMODORO) ====================
  const focusTimer = {
    presetMin: 25,
    isBreak: false,
    remainingSec: 25 * 60,
    running: false,
    intervalId: null,
    doneNotice: ""
  };

  function formatFocusMMSS(sec) {
    const s = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function updateFocusDomDisplays() {
    const formatted = formatFocusMMSS(focusTimer.remainingSec);
    const sideTime = document.getElementById("ml-focus-time-side");
    if (sideTime) sideTime.textContent = formatted;
    const topTime = document.getElementById("ml-focus-time-top");
    if (topTime) topTime.textContent = formatted;
  }

  function stopFocusInterval() {
    if (focusTimer.intervalId) {
      clearInterval(focusTimer.intervalId);
      focusTimer.intervalId = null;
    }
    focusTimer.running = false;
  }

  function setFocusPreset(minutes, isBreak) {
    stopFocusInterval();
    focusTimer.presetMin = minutes;
    focusTimer.isBreak = !!isBreak;
    focusTimer.remainingSec = minutes * 60;
    focusTimer.doneNotice = "";
    renderTopBar();
    renderNavTabs();
  }

  function toggleFocusTimer() {
    if (focusTimer.running) {
      stopFocusInterval();
      renderTopBar();
      renderNavTabs();
      return;
    }
    if (focusTimer.remainingSec <= 0) {
      focusTimer.remainingSec = focusTimer.presetMin * 60;
    }
    focusTimer.doneNotice = "";
    focusTimer.running = true;
    focusTimer.intervalId = setInterval(() => {
      if (!focusTimer.running) return;
      focusTimer.remainingSec = Math.max(0, focusTimer.remainingSec - 1);
      updateFocusDomDisplays();
      if (focusTimer.remainingSec <= 0) {
        stopFocusInterval();
        const today = getTodayIso();
        if (!focusTimer.isBreak) {
          if (!state.focusLog || typeof state.focusLog !== "object") state.focusLog = {};
          state.focusLog[today] = (state.focusLog[today] || 0) + 1;
          state.focusMinutesTotal = (state.focusMinutesTotal || 0) + focusTimer.presetMin;
          state.xp += Math.max(10, Math.round(focusTimer.presetMin * 0.8));
          recordStudyActivity(2);
          saveState();
          focusTimer.doneNotice = `✓ ${focusTimer.presetMin}m focus complete! Take a 5m break.`;
        } else {
          focusTimer.doneNotice = "✓ Break finished — ready for your next block.";
        }
        AudioFX.playLevelUp();
        renderTopBar();
        renderNavTabs();
      }
    }, 1000);
    renderTopBar();
    renderNavTabs();
  }

  function pickGymModeForWorld(worldId) {
    const map = {
      nursery: "arith",
      elementary: "mult",
      junior: "alg",
      senior: "trig-log",
      college: "deriv",
      physics: "physics-blitz",
      chemistry: "chem-blitz",
      biology: "bio-blitz",
      "verbal-logic": "cse-civics-series-blitz",
      wica: "wica-career-blitz",
      persdev: "wica-career-blitz",
      wellness: "wica-career-blitz",
      ph_history: "ph-history-blitz",
      filipino: "filipino-wika-blitz",
      abstract_shapes: "abstract-shapes-blitz",
      ai_ml: "ai-ml-blitz",
      web_coding: "web-html-css-blitz",
      python_tech: "python-tech-blitz",
      earth_space: "earth-blitz",
      econ_finance: "econ-blitz",
      philosophy_logic: "phil-blitz",
      dsa_mastery: "dsa-bigo-blitz",
      backend_sql_dev: "sql-backend-blitz",
      js_ts_architecture: "js-ts-async-blitz",
      exam_mastery: "dost-mech-sci-blitz"
    };
    return map[worldId] || "alg";
  }

  function buildDailySessionPlan(curState, recNode, dueSrsCount) {
    const s = curState || state;
    const today = getTodayIso();
    const checks = (s.dailyChecklist && s.dailyChecklist[today]) || {};
    const vaultSum = MY_VAULT ? MY_VAULT.getVaultSummary(s) : { dueCount: 0, cardCount: 0 };
    const mistakeLen = (s.mistakes || []).length;
    const rec = recNode || getRecommendedNode();

    // Step 1: Recall Warmup
    let recallTitle = "Quick Recall Warmup";
    let recallMeta = "Open Memorize Vault to lock key facts";
    let recallAction = "memorize";
    if (vaultSum.dueCount > 0) {
      recallTitle = `Review ${vaultSum.dueCount} Due Vault Card${vaultSum.dueCount === 1 ? "" : "s"}`;
      recallMeta = "SM-2 spaced repetition in My Vault";
      recallAction = "vault_due";
    } else if (dueSrsCount > 0) {
      recallTitle = `Refresh ${dueSrsCount} Due Skill${dueSrsCount === 1 ? "" : "s"}`;
      recallMeta = "Smart Tutor SM-2 decay shield";
      recallAction = "srs";
    } else if (mistakeLen > 0) {
      recallTitle = `Patch ${mistakeLen} Logged Mistake${mistakeLen === 1 ? "" : "s"}`;
      recallMeta = "Clear your mistake repair queue";
      recallAction = "mistakes";
    }

    // Step 2: Deep Learn or Work Studio derivation
    const workProbs = WORK_STUDIO && Array.isArray(WORK_STUDIO.PROBLEMS) ? WORK_STUDIO.PROBLEMS : [];
    const nextWork = workProbs.find((p) => !(s.derivationsSolved && s.derivationsSolved[p.id])) || workProbs[0] || null;
    const learnTitle = rec ? rec.title : "Next Skill Lesson";
    const learnMeta = nextWork
      ? `Tutorial + quiz · or derive "${nextWork.title}" in Work Studio`
      : "Plain-English visual tutorial + practice";

    // Step 3: 45s Speed Sprint
    const sprintModeId = pickGymModeForWorld(rec ? rec.worldId : "junior");
    const gymDef = MEM && Array.isArray(MEM.GYM_MODES) ? MEM.GYM_MODES.find((g) => g.id === sprintModeId) : null;
    const sprintTitle = gymDef ? `45s Sprint: ${gymDef.title}` : "45s Speed Gym Warm-Down";
    const sprintMeta = "Lock speed & recall fluency";

    const steps = [
      { key: "recall", label: "1. Recall Warmup", title: recallTitle, meta: recallMeta, action: recallAction, done: !!checks.recall },
      { key: "learn", label: "2. Deep Focus", title: learnTitle, meta: learnMeta, action: "lesson", payload: rec ? rec.id : null, done: !!checks.learn },
      { key: "sprint", label: "3. Speed Sprint", title: sprintTitle, meta: sprintMeta, action: "sprint", payload: sprintModeId, done: !!checks.sprint }
    ];
    const doneCount = steps.filter((st) => st.done).length;
    const nextStep = steps.find((st) => !st.done) || steps[1];
    return { today, steps, doneCount, total: steps.length, nextStep };
  }

  function renderQuickPadHtml(prefix) {
    const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "-", "0", "/", ".", "space", "back", "clear"];
    return `
      <div class="ml-touch-numpad">
        <div class="ml-numpad-grid">
          ${keys.map((k) => {
            const label = k === "back" ? "⌫" : k === "clear" ? "Clear" : k === "space" ? "␣ Space" : k;
            return `<button type="button" class="ml-numpad-btn" data-${prefix}-pad="${k}">${label}</button>`;
          }).join("")}
        </div>
        <button type="button" class="ml-btn-primary big ml-numpad-lock" data-${prefix}-pad="submit">Lock Answer ↵</button>
      </div>
    `;
  }

  function bindQuickPad(container, prefix, inpEl, onLock) {
    if (!inpEl) return;
    container.querySelectorAll(`[data-${prefix}-pad]`).forEach((btn) => {
      btn.addEventListener("click", () => {
        const act = btn.getAttribute(`data-${prefix}-pad`);
        if (act === "submit") {
          onLock();
          return;
        }
        if (act === "clear") inpEl.value = "";
        else if (act === "back") inpEl.value = (inpEl.value || "").slice(0, -1);
        else if (act === "space") inpEl.value = (inpEl.value || "") + " ";
        else inpEl.value = (inpEl.value || "") + act;
        if (session) session.selectedOpt = inpEl.value;
      });
    });
  }

  const UI_ICONS = {
    path: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="3.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17.5 14l3.5 3.5-3.5 3.5-3.5-3.5z"/></svg>`,
    tutor: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z"/></svg>`,
    memorize: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6"/><path d="M9 11h4"/></svg>`,
    gym: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="13" r="8"/><path d="M13 9v4l2.5 1.5"/><path d="M11 2h4"/><path d="M3 10h3"/><path d="M2 14h4"/></svg>`,
    lab: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 4 20 12 6 20 6 4"/><path d="M10 9l5 3-5 3V9z"/></svg>`,
    forge: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>`,
    exam: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>`,
    work: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/><path d="M4 7h6"/><path d="M7 4v6"/></svg>`,
    constellation: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><circle cx="11" cy="11" r="2.5"/><path d="m7.6 16.4 2-3.5M13 10l3.4-2.8M12.7 12.8l3.7 3.7"/></svg>`,
    myvault: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
    install: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>`,
    traps: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 10-12h-7l0-8z"/></svg>`,
    cheatsheet: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    search: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7.5"/><path d="m20 20-3.8-3.8"/></svg>`,
    flame: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.7 2.4c.3 3.1-1.7 5-3.2 6.6-1.4 1.5-2.5 2.9-2.5 5.1 0 3.1 2.4 5.9 5.5 5.9 3.6 0 6.5-2.9 6.5-6.9 0-3.2-1.8-6.4-4.2-8.8-.4-.4-1-.1-1 .4-.1 1.4-.6 2.5-1.5 3.2.5-1.9.6-3.7.4-5.5 0-.4-.6-.5-1 0z"/></svg>`,
    star: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.85 5.78 6.38.93-4.61 4.5 1.09 6.35L12 17.06l-5.71 3 1.09-6.35-4.61-4.5 6.38-.93L12 2.5z"/></svg>`,
    gem: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 3h11L22 9.2 12 21 2 9.2 6.5 3z"/></svg>`,
    plus: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
    user: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>`,
    soundOn: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.8 5.2a9.5 9.5 0 0 1 0 13.6"/></svg>`,
    soundOff: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>`,
    save: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
    heart: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20.4 4.6a5.5 5.5 0 0 0-7.8 0L12 5.2l-.6-.6a5.5 5.5 0 0 0-7.8 7.8l.6.6L12 21l7.8-8 .6-.6a5.5 5.5 0 0 0 0-7.8z"/></svg>`,
    infinity: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round"><path d="M18.2 8a4 4 0 1 1 0 8c-3 0-5.2-8-8.4-8a4 4 0 1 0 0 8c3.2 0 5.4-8 8.4-8z"/></svg>`,
    all: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
    math: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round"><path d="M5 7h6M8 4v6M14 7h6M5 17l5-5M10 17l-5-5M14 15h6M14 19h6"/></svg>`,
    stem: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="2.2"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(-30 12 12)"/></svg>`,
    ai_tech: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 20h8M12 18v2M8 9l3 2.5L8 14M13 14h3"/></svg>`,
    ph_fil: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
    shapes_logic: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><polygon points="12 3 21 9.5 17.5 20 6.5 20 3 9.5 12 3"/></svg>`,
    shs_life: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l-2.5 5.5a3 3 0 0 0 5 0L5 7z"/><path d="M19 7l-2.5 5.5a3 3 0 0 0 5 0L19 7z"/></svg>`,
    lock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
    unlock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.6-1.6"/></svg>`,
    arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    tutorBot: `<svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect x="4" y="10" width="32" height="24" rx="8" fill="#14161c" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/><rect x="10" y="16" width="20" height="10" rx="4" fill="#050507" stroke="rgba(255,255,255,0.12)" stroke-width="1"/><circle cx="15.5" cy="21" r="2.2" fill="var(--ml-primary)"/><circle cx="24.5" cy="21" r="2.2" fill="var(--ml-primary)"/><path d="M20 5v5" stroke="rgba(255,255,255,0.38)" stroke-width="1.8" stroke-linecap="round"/><circle cx="20" cy="4.5" r="2" fill="var(--ml-primary)"/><path d="M16 30h8" stroke="rgba(255,255,255,0.26)" stroke-width="1.5" stroke-linecap="round"/></svg>`
  };

  function renderStudioMarkSvg(size, variant) {
    const s = size || 34;
    const v = variant || state.pipAccessory || "none";
    let inner = `
      <path d="M50 18 L77 34 L77 66 L50 82 L23 66 L23 34 Z" stroke="var(--ml-primary)" stroke-width="4.2" stroke-linejoin="round" fill="var(--ml-primary-soft)"/>
      <path d="M50 18 L50 50 M77 34 L50 50 M23 34 L50 50 M50 50 L50 82" stroke="rgba(255,255,255,0.32)" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="50" cy="50" r="8" fill="var(--ml-primary)"/>
      <circle cx="50" cy="18" r="4.5" fill="#f7f7f9"/>
      <circle cx="77" cy="34" r="4.5" fill="#f7f7f9"/>
      <circle cx="23" cy="34" r="4.5" fill="#f7f7f9"/>
    `;
    if (v === "mortarboard") {
      inner = `
        <circle cx="50" cy="50" r="30" stroke="var(--ml-primary)" stroke-width="3.6" fill="var(--ml-primary-soft)"/>
        <ellipse cx="50" cy="50" rx="33" ry="13" transform="rotate(-26 50 50)" stroke="rgba(255,255,255,0.55)" stroke-width="2.6"/>
        <circle cx="50" cy="50" r="8.5" fill="var(--ml-primary)"/>
        <circle cx="77" cy="36" r="4.5" fill="#f7f7f9"/>
      `;
    } else if (v === "goggles") {
      inner = `
        <rect x="22" y="22" width="22" height="22" rx="6" stroke="var(--ml-primary)" stroke-width="3.6" fill="var(--ml-primary-soft)"/>
        <rect x="56" y="22" width="22" height="22" rx="6" stroke="rgba(255,255,255,0.55)" stroke-width="3.6"/>
        <rect x="22" y="56" width="22" height="22" rx="6" stroke="rgba(255,255,255,0.55)" stroke-width="3.6"/>
        <rect x="56" y="56" width="22" height="22" rx="6" stroke="var(--ml-primary)" stroke-width="3.6" fill="var(--ml-primary-soft)"/>
        <path d="M44 33h12M33 44v12M67 44v12M44 67h12" stroke="var(--ml-primary)" stroke-width="2.8" stroke-linecap="round"/>
      `;
    } else if (v === "monocle") {
      inner = `
        <polygon points="50,15 62,38 85,50 62,62 50,85 38,62 15,50 38,38" stroke="var(--ml-primary)" stroke-width="3.6" stroke-linejoin="round" fill="var(--ml-primary-soft)"/>
        <circle cx="50" cy="50" r="9" fill="#f7f7f9"/>
        <circle cx="50" cy="50" r="4.2" fill="#050507"/>
      `;
    } else if (v === "crown") {
      inner = `
        <path d="M22 72 L30 30 L50 48 L70 30 L78 72 Z" stroke="var(--ml-primary)" stroke-width="4" stroke-linejoin="round" fill="var(--ml-primary-soft)"/>
        <line x1="22" y1="80" x2="78" y2="80" stroke="rgba(255,255,255,0.55)" stroke-width="3.8" stroke-linecap="round"/>
        <circle cx="30" cy="24" r="4.5" fill="#f7f7f9"/>
        <circle cx="50" cy="20" r="5" fill="var(--ml-primary)"/>
        <circle cx="70" cy="24" r="4.5" fill="#f7f7f9"/>
      `;
    }
    return `
      <svg width="${s}" height="${s}" viewBox="0 0 100 100" fill="none" aria-label="Primer Studio mark">
        <rect width="100" height="100" rx="24" fill="#08090c"/>
        <rect x="2" y="2" width="96" height="96" rx="22" stroke="rgba(255,255,255,0.14)" stroke-width="2.5"/>
        ${inner}
      </svg>
    `;
  }

  function getMasteryStage(level) {
    return DATA.MASTERY_STAGES[level || 0] || DATA.MASTERY_STAGES[0];
  }

  function getWorld(worldId) {
    return DATA.WORLDS.find((w) => w.id === worldId) || DATA.WORLDS[0];
  }

  function getUnlockInfo(nodeId) {
    if (TUTOR && typeof TUTOR.getUnlockStatus === "function") {
      return TUTOR.getUnlockStatus(state, nodeId, DATA);
    }
    return {
      nodeId,
      prereqs: [],
      missingPrereqs: [],
      prereqsMet: true,
      locked: false,
      strict: false,
      chain: [],
      nextActionablePrereq: null,
      unlocks: [],
      unlocksCount: 0
    };
  }

  function getRecommendedNode() {
    if (state.diagnosticNodeId && (state.nodeMastery[state.diagnosticNodeId] || 0) < 2) {
      const diagNode = DATA.NODES.find((n) => n.id === state.diagnosticNodeId);
      if (diagNode) {
        const info = getUnlockInfo(diagNode.id);
        if (!info.locked) return diagNode;
        if (info.nextActionablePrereq && info.nextActionablePrereq.node) return info.nextActionablePrereq.node;
      }
    }
    // Prefer an unlocked, unmastered skill (level 0) first so learners smoothly advance the skill tree
    for (const node of DATA.NODES) {
      if ((state.nodeMastery[node.id] || 0) === 0 && !getUnlockInfo(node.id).locked) return node;
    }
    for (const node of DATA.NODES) {
      if ((state.nodeMastery[node.id] || 0) < 3 && !getUnlockInfo(node.id).locked) return node;
    }
    return DATA.NODES[0];
  }

  function getOverallStats() {
    const totalNodes = DATA.NODES.length;
    let totalPoints = 0;
    let masteredCount = 0;
    for (const n of DATA.NODES) {
      const m = state.nodeMastery[n.id] || 0;
      totalPoints += m;
      if (m >= 1) masteredCount++;
    }
    const pct = Math.round((totalPoints / (totalNodes * 3)) * 100);
    return {
      totalNodes,
      masteredCount,
      pct,
      trapsDone: Object.keys(state.trapBusted).length
    };
  }

  function evaluateBadges(extras) {
    const unlocked = new Set(state.badges || []);
    const stats = getOverallStats();
    if (stats.masteredCount >= 1) unlocked.add("first_step");
    if (extras && extras.perfect) unlocked.add("sniper");
    if ((state.nodeMastery["even-odd-skip"] || 0) >= 1 || (state.nodeMastery["primes-factors-lcm"] || 0) >= 1) {
      unlocked.add("pattern_spotter");
    }
    if (Object.keys(state.gymBest || {}).length >= 1) unlocked.add("tables_master");
    if ((state.nodeMastery["fractions-trenchcoat"] || 0) >= 1 && (state.nodeMastery["decimals-percents"] || 0) >= 1) {
      unlocked.add("fraction_slayer");
    }
    if ((state.nodeMastery["logarithms-unlocked"] || 0) >= 1) unlocked.add("log_destroyer");
    if (DATA.NODES.some((n) => n.worldId === "college" && (state.nodeMastery[n.id] || 0) >= 1)) {
      unlocked.add("calc_flex");
    }
    if (stats.trapsDone >= 5) unlocked.add("trap_hunter");
    if (state.resolvedMistakesCount > 0 || state.diagnosticSummary) unlocked.add("crack_patcher");
    const mathWorlds = DATA.WORLDS.filter((w) => w.subject === "math");
    const allEras = mathWorlds.every((w) =>
      DATA.NODES.some((n) => n.worldId === w.id && (state.nodeMastery[n.id] || 0) >= 1)
    );
    if (allEras) unlocked.add("five_eras");

    const hasPhys = DATA.NODES.some((n) => n.worldId === "physics" && (state.nodeMastery[n.id] || 0) >= 1);
    const hasChem = DATA.NODES.some((n) => n.worldId === "chemistry" && (state.nodeMastery[n.id] || 0) >= 1);
    const hasBio = DATA.NODES.some((n) => n.worldId === "biology" && (state.nodeMastery[n.id] || 0) >= 1);
    const hasMath = DATA.NODES.some((n) => getWorld(n.worldId).subject === "math" && (state.nodeMastery[n.id] || 0) >= 1);
    if (hasPhys) unlocked.add("newton_jr");
    if (hasChem) unlocked.add("mad_scientist");
    if (hasBio) unlocked.add("life_hacker");
    if (hasMath && hasPhys && hasChem && hasBio) unlocked.add("stem_polymath");

    for (const b of DATA.BADGES) {
      if (typeof b.check === "function" && b.check(state)) {
        unlocked.add(b.id);
      }
    }

    state.badges = Array.from(unlocked);
  }

  function recordMistake(nodeId, q) {
    const key = `${nodeId}::${q.prompt}`;
    if (!state.mistakes.some((m) => m.key === key)) {
      state.mistakes.unshift({
        key,
        nodeId,
        type: q.type,
        prompt: q.prompt,
        options: q.options || null,
        answer: q.answer,
        hint: q.hint,
        whyEasy: q.whyEasy
      });
      if (state.mistakes.length > 30) state.mistakes.length = 30;
    }
  }

  // ==================== HEADER, SIDEBAR & PITCH-BLACK THEMES ====================
  const STUDIO_EMBLEMS = {
    none: { label: "Prism Core", desc: "Isometric knowledge hexagon & core node", cost: 0 },
    mortarboard: { label: "Orbital Ring", desc: "Orbital mechanics vector emblem", cost: 65 },
    goggles: { label: "Neural Grid", desc: "4-node connected matrix lattice", cost: 75 },
    monocle: { label: "Polar Star", desc: "Eight-point compass navigation seal", cost: 85 },
    crown: { label: "Apex Crown", desc: "Geometric polymath summit mark", cost: 110 }
  };

  const STUDIO_THEMES = {
    noir: { label: "Pitch Black · Sage", desc: "Pure #000000 OLED black with calm eucalyptus-sage controls", swatch: "#8da69a", cost: 0 },
    carbon: { label: "Pitch Black · Cobalt", desc: "Pure #000000 OLED black with sharp cobalt-sapphire highlights", swatch: "#60a5fa", cost: 80 },
    kyoto: { label: "Pitch Black · Crimson", desc: "Deep ink black with warm vermilion seal accents", swatch: "#e06d5a", cost: 100 },
    monochrome: { label: "Pitch Black · Stark", desc: "Pure #000000 black with crisp monochrome white controls", swatch: "#f4f4f6", cost: 90 }
  };

  const TAB_TITLES = {
    path: "Dashboard",
    exam: "Exam Mode",
    forge: "Code Studio",
    tutor: "Smart Tutor",
    memorize: "Memorize Vault",
    gym: "Speed Gym & Scan",
    lab: "Playgrounds",
    traps: "Traps & Bosses",
    cheatsheet: "Reference Guide"
  };

  const TAB_SHORT_TITLES = {
    path: "Home",
    exam: "Exams",
    forge: "Studio",
    tutor: "Tutor",
    memorize: "Vault",
    gym: "Gym",
    lab: "Labs",
    traps: "Traps",
    cheatsheet: "Guide"
  };

  function applyThemeClass() {
    document.body.classList.remove("theme-light", "theme-carbon", "paper-botanical", "paper-blueprint", "paper-kyoto", "theme-monochrome");
    if (state.paperTheme === "carbon") document.body.classList.add("theme-carbon");
    else if (state.paperTheme === "kyoto") document.body.classList.add("paper-kyoto");
    else if (state.paperTheme === "monochrome") document.body.classList.add("theme-monochrome");
    if (ONBOARDING && typeof ONBOARDING.applyStudioConfigToDom === "function") {
      ONBOARDING.applyStudioConfigToDom(state);
    }
  }

  function openStudioIntro(startStep, isResetFlow) {
    if (!ONBOARDING || typeof ONBOARDING.openIntroStudio !== "function") return;
    ONBOARDING.openIntroStudio({
      state,
      DATA,
      EDGE,
      BUILD,
      renderStudioMarkSvg,
      applyThemeClass,
      startStep: startStep || "hero",
      isResetFlow: !!isResetFlow,
      onOpenBackup: () => {
        session = { mode: "backup", phase: "backup", statusMsg: "", confirmReset: false };
        renderModal();
      },
      onComplete: () => {
        const sc = ONBOARDING.ensureStudioConfig(state);
        if (sc.defaultFocusMin && !focusTimer.running) {
          focusTimer.presetMin = sc.defaultFocusMin;
          focusTimer.isBreak = false;
          focusTimer.remainingSec = sc.defaultFocusMin * 60;
        }
        if (EDGE && EDGE.AudioFocus && sc.defaultAudioMode && sc.defaultAudioMode !== "off") {
          EDGE.AudioFocus.setMode(sc.defaultAudioMode);
        }
        saveState();
        renderApp();
      }
    });
  }

  function renderTopBar() {
    const stats = getOverallStats();
    const topbar = document.getElementById("ml-topbar");
    if (!topbar) return;
    const dStreak = Math.max(1, state.dailyStreak || state.streak || 1);
    const pageTitle = TAB_TITLES[state.activeTab] || "Main Dashboard";
    const shortTitle = TAB_SHORT_TITLES[state.activeTab] || "Studio";

    const sc = ONBOARDING ? ONBOARDING.ensureStudioConfig(state) : null;
    const showTopMetrics = !sc || sc.widgets.topbarMetrics !== false;

    topbar.innerHTML = `
      <div class="ml-topbar-left">
        <button type="button" id="ml-mobile-home-btn" class="ml-mobile-brand" aria-label="Go to Main Dashboard">
          ${renderStudioMarkSvg(26)}
        </button>
        <h1 class="ml-page-heading">
          <span class="ml-page-heading-full">${escapeHtml(pageTitle)}</span>
          <span class="ml-page-heading-short">${escapeHtml(shortTitle)}</span>
        </h1>
      </div>

      <div class="ml-topbar-right">
        ${focusTimer.running || focusTimer.remainingSec < focusTimer.presetMin * 60 ? `
          <button type="button" id="ml-top-focus-pill" class="ml-top-focus-pill ${focusTimer.running ? "running" : "paused"} ${focusTimer.isBreak ? "is-break" : ""}" title="Click to ${focusTimer.running ? "pause" : "resume"} Focus Timer">
            <span class="ml-focus-dot" aria-hidden="true"></span>
            <span class="ml-focus-mode-lbl">${focusTimer.isBreak ? "Break" : "Focus"}</span>
            <strong id="ml-focus-time-top">${formatFocusMMSS(focusTimer.remainingSec)}</strong>
          </button>
        ` : ""}
        ${showTopMetrics ? `
          <div class="ml-metrics-capsule" role="group" aria-label="Study metrics">
            <div class="ml-metric-item streak" title="Daily Study Streak${state.streakFreezes ? ` (${state.streakFreezes} Freeze ready)` : ""}">
              <span class="ml-metric-ico">${UI_ICONS.flame}</span>
              <strong>${dStreak}</strong>
            </div>
            <div class="ml-metric-item xp" title="Experience Points">
              <span class="ml-metric-ico">${UI_ICONS.star}</span>
              <strong>${state.xp}</strong>
            </div>
            <div class="ml-metric-item gems" title="Studio Gems">
              <span class="ml-metric-ico">${UI_ICONS.gem}</span>
              <strong>${state.gems}</strong>
            </div>
            <button type="button" id="ml-shop-btn" class="ml-capsule-add-btn" title="Open Studio Shop (Themes, Emblem Marks, Freezes, Hearts)" aria-label="Open Studio Shop">
              ${UI_ICONS.plus}
            </button>
          </div>
        ` : ""}

        <button type="button" id="ml-global-search-btn" class="ml-top-search-btn" title="Instant Search across lessons, formulas, playgrounds & traps (Ctrl+K or /)">
          <span class="ml-search-ico">${UI_ICONS.search}</span>
          <span class="ml-search-placeholder">Search</span>
          <kbd class="ml-kbd-hint">⌘K</kbd>
        </button>

        ${ONBOARDING ? `
          <button type="button" id="ml-studio-setup-btn" class="ml-profile-btn pr-setup-top-btn" title="Customize Studio (Clean Zen ↔ Max Command Center, Themes, Widgets & Intro)">
            <span class="ml-profile-avatar">✦</span>
          </button>
        ` : ""}

        <button type="button" id="ml-backup-btn" class="ml-profile-btn" title="${storageAvailable ? `Mastered ${stats.masteredCount}/${stats.totalNodes} · Backup, Save Code & Reset` : "LocalStorage restricted here — open Save Code backup"}">
          <span class="ml-profile-avatar">${UI_ICONS.user}</span>
        </button>
      </div>
    `;

    const mobileHome = document.getElementById("ml-mobile-home-btn");
    if (mobileHome) {
      mobileHome.addEventListener("click", () => {
        AudioFX.playTap();
        if (MEM && MEM.isSprintActive()) MEM.stopSprint();
        state.activeTab = "path";
        saveState();
        renderApp();
      });
    }

    const topFocusPill = document.getElementById("ml-top-focus-pill");
    if (topFocusPill) {
      topFocusPill.addEventListener("click", () => {
        AudioFX.playTap();
        toggleFocusTimer();
      });
    }

    const shopTopBtn = document.getElementById("ml-shop-btn");
    if (shopTopBtn) {
      shopTopBtn.addEventListener("click", () => {
        AudioFX.playTap();
        session = { mode: "shop", phase: "shop", statusMsg: "" };
        renderModal();
      });
    }

    const setupTopBtn = document.getElementById("ml-studio-setup-btn");
    if (setupTopBtn && ONBOARDING) {
      setupTopBtn.addEventListener("click", () => {
        AudioFX.playTap();
        openStudioIntro("config", false);
      });
    }

    document.getElementById("ml-global-search-btn").addEventListener("click", () => {
      AudioFX.playTap();
      openGlobalSearch("");
    });

    document.getElementById("ml-backup-btn").addEventListener("click", () => {
      AudioFX.playTap();
      session = { mode: "backup", phase: "backup", statusMsg: "", confirmReset: false };
      renderModal();
    });
  }

  function renderNavTabs() {
    const brandSlot = document.getElementById("ml-brand-slot");
    const nav = document.getElementById("ml-nav");
    const foot = document.getElementById("ml-sidebar-foot");
    const errCount = (state.mistakes || []).length;
    const stats = getOverallStats();
    const isFreshUpdate = state.lastSeenBuildKey !== CURRENT_BUILD_KEY;
    const shortHash = BUILD.buildHash ? `#${BUILD.buildHash}` : "";

    if (brandSlot) {
      brandSlot.innerHTML = `
        <button type="button" id="ml-brand-home-btn" class="ml-brand-btn" title="Primer Studio — First-Principles Learning OS">
          <span class="ml-brand-mark">${renderStudioMarkSvg(32)}</span>
          <span class="ml-brand-name">Primer Studio</span>
        </button>
      `;
      const brandBtn = document.getElementById("ml-brand-home-btn");
      if (brandBtn) {
        brandBtn.addEventListener("click", () => {
          AudioFX.playTap();
          if (MEM && MEM.isSprintActive()) MEM.stopSprint();
          if (EXAM_MODE && EXAM_MODE.stopExamTimer) EXAM_MODE.stopExamTimer();
          state.activeTab = "path";
          saveState();
          renderApp();
        });
      }
    }

    if (nav) {
      const forgeCleared = Object.keys(state.forgeSolved || {}).length;
      const forgeTotal = CODE_FORGE && CODE_FORGE.QUESTS ? CODE_FORGE.QUESTS.length : 36;
      const workSolved = Object.keys(state.derivationsSolved || {}).length;
      const workTotal = WORK_STUDIO && WORK_STUDIO.PROBLEMS ? WORK_STUDIO.PROBLEMS.length : 24;
      const vaultSum = MY_VAULT ? MY_VAULT.getVaultSummary(state) : { dueCount: 0, cardCount: 0, noteCount: 0, bookmarkCount: 0 };
      const examCount = EXAM_MODE && EXAM_MODE.EXAMS ? EXAM_MODE.EXAMS.length : 10;
      const examRuns = (state.examHistory || []).length;

      const primaryTabs = [
        { id: "path", icon: UI_ICONS.path, label: "Dashboard", short: "Home" },
        { id: "constellation", icon: UI_ICONS.constellation, label: "Constellation", short: "Map" },
        { id: "work", icon: UI_ICONS.work, label: "Work Studio", short: "Work" },
        { id: "exam", icon: UI_ICONS.exam, label: "Exam Mode", short: "Exams" },
        { id: "forge", icon: UI_ICONS.forge, label: "Code Studio", short: "Code" },
        { id: "myvault", icon: UI_ICONS.myvault, label: "My Vault", short: "Vault" }
      ];
      const practiceTabs = [
        { id: "tutor", icon: UI_ICONS.tutor, label: "Smart Tutor", short: "Tutor" },
        { id: "memorize", icon: UI_ICONS.memorize, label: "Memorize Vault", short: "Memory" },
        { id: "gym", icon: UI_ICONS.gym, label: "Speed Gym", short: "Gym" },
        { id: "lab", icon: UI_ICONS.lab, label: "Playgrounds", short: "Labs" }
      ];
      const secondaryTabs = [
        { id: "traps", icon: UI_ICONS.traps, label: "Traps & Bosses", short: "Traps" },
        { id: "cheatsheet", icon: UI_ICONS.cheatsheet, label: "Reference Guide", short: "Guide" }
      ];

      const renderItem = (t) => `
        <button type="button" class="ml-nav-btn ${state.activeTab === t.id ? "active" : ""}" data-tab="${t.id}">
          <span class="ml-nav-ico">${t.icon}</span>
          <span class="ml-nav-lbl-full">${t.label}</span>
          <span class="ml-nav-lbl-short">${t.short}</span>
          ${t.id === "path" && errCount > 0 ? `<span class="ml-nav-badge">${errCount}</span>` : ""}
          ${t.id === "work" && workSolved > 0 ? `<span class="ml-nav-badge forge">${workSolved}/${workTotal}</span>` : ""}
          ${t.id === "exam" ? `<span class="ml-nav-badge forge">${examRuns > 0 ? examRuns + "✓" : examCount}</span>` : ""}
          ${t.id === "forge" ? `<span class="ml-nav-badge forge">${forgeCleared}/${forgeTotal}</span>` : ""}
          ${t.id === "myvault" && vaultSum.dueCount > 0 ? `<span class="ml-nav-badge">${vaultSum.dueCount}</span>` : ""}
        </button>
      `;

      const scNav = ONBOARDING ? ONBOARDING.ensureStudioConfig(state) : null;
      const hiddenTabs = new Set((scNav && scNav.hiddenTabs) || []);
      const visPrimary = primaryTabs.filter((t) => t.id === "path" || !hiddenTabs.has(t.id));
      const visPractice = practiceTabs.filter((t) => !hiddenTabs.has(t.id));
      const visSecondary = secondaryTabs.filter((t) => !hiddenTabs.has(t.id));

      nav.innerHTML = `
        <div class="ml-nav-group">${visPrimary.map(renderItem).join("")}</div>
        ${visPractice.length ? `
          <div class="ml-nav-divider" aria-hidden="true"></div>
          <div class="ml-nav-section-lbl">Practice</div>
          <div class="ml-nav-group">${visPractice.map(renderItem).join("")}</div>
        ` : ""}
        ${visSecondary.length ? `
          <div class="ml-nav-divider" aria-hidden="true"></div>
          <div class="ml-nav-section-lbl">Resources</div>
          <div class="ml-nav-group">${visSecondary.map(renderItem).join("")}</div>
        ` : ""}
      `;

      nav.querySelectorAll(".ml-nav-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          if (MEM && MEM.isSprintActive()) MEM.stopSprint();
          const targetTab = btn.dataset.tab;
          if (targetTab !== "exam" && EXAM_MODE && EXAM_MODE.stopExamTimer) EXAM_MODE.stopExamTimer();
          if (targetTab === "forge" && state.activeTab === "forge") {
            state.forgeView = "library";
          } else if (targetTab === "path" && state.activeTab === "path") {
            state.eraFilter = "all";
            state.pathBrowseAll = false;
            state.pathQuery = "";
          }
          state.activeTab = targetTab;
          saveState();
          renderApp();
          window.scrollTo(0, 0);
        });
      });
    }

    if (foot) {
      const todayIso = getTodayIso();
      const focusToday = (state.focusLog && state.focusLog[todayIso]) || 0;
      const scFoot = ONBOARDING ? ONBOARDING.ensureStudioConfig(state) : null;
      const showFocusWidget = !scFoot || scFoot.widgets.focusWidget !== false;
      foot.innerHTML = `
        ${showFocusWidget ? `
        <div class="ml-focus-widget ${focusTimer.running ? "running" : ""}" aria-label="Focus Timer">
          <div class="ml-focus-head">
            <span class="ml-focus-title">${focusTimer.isBreak ? "Break Timer" : "Focus Timer"}</span>
            <strong id="ml-focus-time-side" class="ml-focus-clock">${formatFocusMMSS(focusTimer.remainingSec)}</strong>
          </div>
          <div class="ml-focus-presets">
            ${[
              { m: 15, brk: false, lbl: "15m" },
              { m: 25, brk: false, lbl: "25m" },
              { m: 50, brk: false, lbl: "50m" },
              { m: 5, brk: true, lbl: "5m Brk" }
            ].map((p) => `<button type="button" class="ml-focus-chip ${focusTimer.presetMin === p.m && focusTimer.isBreak === p.brk ? "active" : ""}" data-focus-min="${p.m}" data-focus-brk="${p.brk ? "1" : "0"}">${p.lbl}</button>`).join("")}
          </div>
          <div class="ml-focus-actions">
            <button type="button" id="ml-focus-toggle-btn" class="ml-focus-go-btn">${focusTimer.running ? "Pause" : focusTimer.remainingSec < focusTimer.presetMin * 60 ? "Resume" : "Start"}</button>
            <button type="button" id="ml-focus-reset-btn" class="ml-focus-rst-btn" title="Reset timer">↺</button>
            <span class="ml-focus-count" title="Completed focus blocks today">${focusToday}✓</span>
          </div>
          ${EDGE && EDGE.AudioFocus ? (() => {
            const curAudio = EDGE.AudioFocus.getMode();
            return `
              <div class="ml-focus-audio-row" role="group" aria-label="Offline focus soundscape">
                ${[
                  { id: "off", lbl: "Quiet" },
                  { id: "brown", lbl: "Brown" },
                  { id: "gamma40", lbl: "40Hz" },
                  { id: "rain", lbl: "Rain" }
                ].map((a) => `<button type="button" class="ml-focus-audio-chip ${curAudio === a.id ? "active" : ""}" data-focus-audio="${a.id}" title="Offline WebAudio ${a.lbl} focus soundscape">${a.lbl}</button>`).join("")}
              </div>
            `;
          })() : ""}
          ${focusTimer.doneNotice ? `<div class="ml-focus-done-msg">${escapeHtml(focusTimer.doneNotice)}</div>` : ""}
        </div>
        ` : ""}
        <div class="ml-side-meta">
          <span>Mastered</span>
          <strong>${stats.masteredCount} / ${stats.totalNodes}</strong>
        </div>
        <div class="ml-side-controls">
          <button type="button" id="ml-chill-btn" class="ml-side-util-btn ${state.chillMode ? "is-chill" : "is-hearts"}" title="Toggle Infinite Chill Mode vs 5 Hearts">
            <span>${state.chillMode ? UI_ICONS.infinity : UI_ICONS.heart}</span>
            <span>${state.chillMode ? "Chill" : state.hearts + "/5"}</span>
          </button>
          <button type="button" id="ml-mute-btn" class="ml-side-icon-btn" title="${state.muted ? "Unmute sound effects" : "Mute sound effects"}" aria-label="Toggle sound">
            ${state.muted ? UI_ICONS.soundOff : UI_ICONS.soundOn}
          </button>
          <button type="button" id="ml-side-backup-btn" class="ml-side-icon-btn" title="Export / Import Save File & Backup" aria-label="Backup and Save">
            ${UI_ICONS.save}
          </button>
        </div>
        ${ONBOARDING ? `
          <button type="button" id="ml-side-customize-btn" class="ml-side-install-btn pr-side-custom-btn" title="Open Flagship Intro & Deep Studio Configurator (Clean Zen ↔ Max Command Center)">
            <span>✦</span><span>Customize Studio</span>
          </button>
        ` : ""}
        ${deferredInstallPrompt ? `
          <button type="button" id="ml-pwa-install-btn" class="ml-side-install-btn" title="Install Primer Studio for full offline access">
            ${UI_ICONS.install}<span>Install Offline App</span>
          </button>
        ` : ""}
        <button type="button" id="ml-version-btn" class="ml-side-version-btn ${isFreshUpdate ? "fresh" : ""}" title="Primer Studio v${escapeHtml(BUILD.version)} (${escapeHtml(BUILD.codename)}) · Build ${escapeHtml(shortHash)} · Inspect release notes">
          <span class="ml-version-left">
            ${isFreshUpdate ? `<span class="ml-version-dot" aria-hidden="true"></span>` : ""}
            <span>v${escapeHtml(BUILD.version)}</span>
          </span>
          ${shortHash ? `<span class="ml-version-hash">${escapeHtml(shortHash)}</span>` : ""}
        </button>
      `;

      const pwaBtn = document.getElementById("ml-pwa-install-btn");
      if (pwaBtn && deferredInstallPrompt) {
        pwaBtn.addEventListener("click", () => {
          AudioFX.playTap();
          deferredInstallPrompt.prompt();
          deferredInstallPrompt.userChoice.then(() => {
            deferredInstallPrompt = null;
            renderNavTabs();
          }).catch(() => {});
        });
      }

      const chillBtn = document.getElementById("ml-chill-btn");
      if (chillBtn) {
        chillBtn.addEventListener("click", () => {
          AudioFX.playTap();
          state.chillMode = !state.chillMode;
          if (!state.chillMode && state.hearts <= 0) state.hearts = 5;
          saveState();
          renderNavTabs();
        });
      }

      const muteBtn = document.getElementById("ml-mute-btn");
      if (muteBtn) {
        muteBtn.addEventListener("click", () => {
          state.muted = !state.muted;
          saveState();
          renderNavTabs();
          if (!state.muted) AudioFX.playTap();
        });
      }

      const sideBkBtn = document.getElementById("ml-side-backup-btn");
      if (sideBkBtn) {
        sideBkBtn.addEventListener("click", () => {
          AudioFX.playTap();
          session = { mode: "backup", phase: "backup", statusMsg: "", confirmReset: false };
          renderModal();
        });
      }

      const verBtn = document.getElementById("ml-version-btn");
      if (verBtn) {
        verBtn.addEventListener("click", () => {
          AudioFX.playTap();
          openChangelogModal();
        });
      }

      const sideCustomBtn = document.getElementById("ml-side-customize-btn");
      if (sideCustomBtn && ONBOARDING) {
        sideCustomBtn.addEventListener("click", () => {
          AudioFX.playTap();
          openStudioIntro("config", false);
        });
      }

      foot.querySelectorAll("[data-focus-min]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          setFocusPreset(parseInt(btn.dataset.focusMin, 10) || 25, btn.dataset.focusBrk === "1");
        });
      });
      const focusToggle = document.getElementById("ml-focus-toggle-btn");
      if (focusToggle) {
        focusToggle.addEventListener("click", () => {
          AudioFX.playTap();
          toggleFocusTimer();
        });
      }
      const focusReset = document.getElementById("ml-focus-reset-btn");
      if (focusReset) {
        focusReset.addEventListener("click", () => {
          AudioFX.playTap();
          setFocusPreset(focusTimer.presetMin, focusTimer.isBreak);
        });
      }
      if (EDGE && EDGE.AudioFocus) {
        foot.querySelectorAll("[data-focus-audio]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const nextMode = btn.dataset.focusAudio;
            const curMode = EDGE.AudioFocus.getMode();
            EDGE.AudioFocus.setMode(nextMode === curMode && nextMode !== "off" ? "off" : nextMode);
            renderNavTabs();
          });
        });
      }
    }
  }

  // ==================== TAB 1: SKILL PATH (MAIN DASHBOARD) ====================
  function renderPathView(main) {
    const stats = getOverallStats();
    const rec = getRecommendedNode();
    const mistakes = state.mistakes || [];
    const tAnalysis = TUTOR ? TUTOR.analyzeLearner(state, DATA) : null;
    const dueCount = tAnalysis ? (tAnalysis.decayingNodes || []).length : 0;
    const forgeCleared = Object.keys(state.forgeSolved || {}).length;
    const forgeTotal = CODE_FORGE && CODE_FORGE.QUESTS ? CODE_FORGE.QUESTS.length : 36;
    const isBrandNew = stats.masteredCount === 0 && forgeCleared === 0;

    const sc = ONBOARDING ? ONBOARDING.ensureStudioConfig(state) : null;
    const wCfg = (sc && sc.widgets) || {};
    const hiddenSubjects = new Set((sc && sc.hiddenSubjects) || []);
    const displayName = sc && sc.displayName ? sc.displayName.trim() : "";

    function getDashGreeting() {
      const suffix = displayName ? `, ${displayName}` : "";
      if (isBrandNew) return `Welcome to Primer${suffix}`;
      const h = new Date().getHours();
      if (h < 12) return `Good morning${suffix}`;
      if (h < 18) return `Good afternoon${suffix}`;
      return `Good evening${suffix}`;
    }

    const aiCodingWorlds = ["ai_ml", "web_coding", "python_tech", "dsa_mastery", "backend_sql_dev", "js_ts_architecture"];
    const subjectLibraries = [
      {
        id: "subject:math",
        icon: UI_ICONS.math,
        title: "Math",
        desc: "From simple counting and fractions up to algebra, trig, and calculus.",
        startHint: "Counting & Instant Chunks",
        worldIds: ["nursery", "elementary", "junior", "senior", "college"]
      },
      {
        id: "subject:ai_tech",
        icon: UI_ICONS.ai_tech,
        title: "Coding & AI",
        desc: "Python, HTML/CSS, JavaScript, SQL, algorithms, and how AI works.",
        startHint: "Python Basics & HTML",
        worldIds: aiCodingWorlds,
        extraMeta: `Includes ${forgeTotal} live exercises in Code Studio`
      },
      {
        id: "subject:stem",
        icon: UI_ICONS.stem,
        title: "Science & Earth",
        desc: "Biology, physics, chemistry, weather, and space explained visually.",
        startHint: "Cells as Tiny Cities",
        worldIds: ["physics", "chemistry", "biology", "earth_space"]
      },
      {
        id: "subject:ph_fil",
        icon: UI_ICONS.ph_fil,
        title: "History & Filipino",
        desc: "Philippine history, civics, and clear Filipino grammar & accents.",
        startHint: "Pre-Colonial Philippines",
        worldIds: ["ph_history", "filipino"]
      },
      {
        id: "subject:shapes_logic",
        icon: UI_ICONS.shapes_logic,
        title: "Logic, Verbal & Shapes",
        desc: "Grammar clarity, reading deduction, and visual spatial puzzles.",
        startHint: "Grammar & Shape Rotations",
        worldIds: ["abstract_shapes", "verbal-logic"]
      },
      {
        id: "subject:shs_life",
        icon: UI_ICONS.shs_life,
        title: "Life, Econ & Thinking",
        desc: "Personal finance, economics, critical thinking, and study habits.",
        startHint: "Knowing Oneself & Scarcity",
        worldIds: ["econ_finance", "philosophy_logic", "wica", "persdev", "wellness"]
      },
      {
        id: "subject:exam_prep",
        icon: UI_ICONS.exam,
        title: "PH Exam Mastery",
        desc: "Specialized DOST Mechanical & Space, Graphs, Series, Work/Mixture, RA 6713, Clerical Filing & NMAT Psych/Perceptual.",
        startHint: "DOST Mechanical-Technical",
        worldIds: ["exam_mastery"]
      }
    ].filter((lib) => !hiddenSubjects.has(lib.id)).map((lib) => {
      const nodes = DATA.NODES.filter((n) => lib.worldIds.includes(n.worldId));
      const done = nodes.filter((n) => (state.nodeMastery[n.id] || 0) >= 1).length;
      return Object.assign({}, lib, { count: nodes.length, done });
    });

    const categoryGroups = [
      { id: "all", icon: UI_ICONS.all, title: "All", count: DATA.NODES.length, worldIds: null },
      ...subjectLibraries
    ];

    const activeCatObj = categoryGroups.find((g) => g.id === state.eraFilter)
      || categoryGroups.find((g) => g.worldIds && g.worldIds.includes(state.eraFilter))
      || categoryGroups[0];
    const subWorlds = activeCatObj.worldIds
      ? DATA.WORLDS.filter((w) => activeCatObj.worldIds.includes(w.id))
      : [];

    const worldsToShow = state.eraFilter === "all"
      ? DATA.WORLDS
      : categoryGroups.some((g) => g.id === state.eraFilter)
      ? DATA.WORLDS.filter((w) => activeCatObj.worldIds.includes(w.id))
      : DATA.WORLDS.filter((w) => w.id === state.eraFilter);

    const treeSummary = TUTOR && TUTOR.getSkillTreeSummary
      ? TUTOR.getSkillTreeSummary(state, DATA)
      : { total: DATA.NODES.length, mastered: stats.masteredCount, ready: DATA.NODES.length - stats.masteredCount, locked: 0 };
    const strictOn = state.strictPrereqs !== false;
    const statusFilter = state.pathStatusFilter || "all";
    const hasSearch = Boolean((state.pathQuery || "").trim());
    const showSubjectOverview = state.eraFilter === "all" && !state.pathBrowseAll && !hasSearch;
    const showGuide = !state.hideHowItWorks && wCfg.quickGuide !== false;

    const teleHudHtml = wCfg.telemetryHud ? (() => {
      const elo = (state.telemetry && Math.round(state.telemetry.eloRating || 1000)) || 1000;
      const calM = EDGE ? EDGE.getCalibrationMetrics(state) : null;
      const roiM = EDGE ? EDGE.computeRoiTargets(state, DATA, TUTOR, 2) : null;
      const vaultSum = MY_VAULT ? MY_VAULT.getVaultSummary(state) : { dueCount: 0 };
      const feynCnt = Object.keys(state.feynmanVerified || {}).length;
      return `
        <section class="pr-tele-hud" aria-label="Pro Telemetry Command HUD">
          <div class="pr-tele-metrics">
            <div class="pr-tele-stat"><span>ELO</span><strong>${elo}</strong></div>
            <div class="pr-tele-stat"><span>CALIBRATION</span><strong>${calM && calM.calibrationScore !== null ? calM.calibrationScore + "%" : "—"}</strong></div>
            <div class="pr-tele-stat ${calM && calM.illusionCount > 0 ? "warn" : ""}"><span>ILLUSIONS</span><strong>${calM ? calM.illusionCount : 0}</strong></div>
            <div class="pr-tele-stat"><span>FEYNMAN</span><strong>${feynCnt}</strong></div>
            <div class="pr-tele-stat"><span>VAULT DUE</span><strong>${vaultSum.dueCount || 0}</strong></div>
            <div class="pr-tele-stat"><span>FOCUS</span><strong>${state.focusMinutesTotal || 0}m</strong></div>
            ${roiM ? `<div class="pr-tele-stat"><span>${escapeHtml(roiM.goal.short || "TARGET")}</span><strong>${roiM.readinessPct}%${roiM.daysLeft !== null ? ` · ${roiM.daysLeft}d` : ""}</strong></div>` : ""}
          </div>
          <div class="pr-tele-hotbar">
            <button type="button" class="pr-tele-btn" data-tele-act="blind">🕶️ Blind Mix</button>
            <button type="button" class="pr-tele-btn" data-tele-act="exam">🎯 Exams</button>
            <button type="button" class="pr-tele-btn" data-tele-act="work">✏️ Work</button>
            <button type="button" class="pr-tele-btn" data-tele-act="constellation">🌌 Map</button>
            <button type="button" class="pr-tele-btn accent" data-tele-act="customize">✦ Layout</button>
          </div>
        </section>
      `;
    })() : "";

    const zeroStarters = [
      {
        action: "forge",
        target: "zero-hello-print",
        tag: "Code Studio · Lesson 1",
        title: "Coding from Zero",
        desc: "Never coded before? Read a 1-minute guide and run your first print() line."
      },
      {
        action: "node",
        target: "counting-subitizing",
        tag: "Math · Lesson 1",
        title: "Math from Scratch",
        desc: "See numbers as simple visual chunks before touching any formulas."
      },
      {
        action: "node",
        target: "code-html-anatomy-semantics",
        tag: "Web · Lesson 1",
        title: "How Websites Work",
        desc: "Understand plain HTML tags and how every web page is structured."
      },
      {
        action: "node",
        target: "bio-cells-organelles",
        tag: "Science · Lesson 1",
        title: "Science Basics",
        desc: "Learn how living cells work using a simple everyday city analogy."
      }
    ];

    let html = `
      ${teleHudHtml}
      <section class="ml-bento-grid ml-dash-hero">
        <div class="ml-bento-card ml-welcome-card">
          <div class="ml-bento-eyebrow">${escapeHtml(getDashGreeting())}</div>
          <h2 class="ml-journey-title">
            ${isBrandNew ? "Learn from zero, one simple step at a time." : "Ready for your next calm step?"}
          </h2>
          <p class="ml-journey-desc">
            Every topic opens with a plain-English visual tutorial before any practice questions — no background required.
          </p>

          <div class="ml-journey-progress">
            <div class="ml-journey-progress-row">
              <span><strong>${stats.masteredCount}</strong> of ${stats.totalNodes} lessons completed</span>
              <span class="ml-muted-paren">${forgeCleared}/${forgeTotal} in Code Studio</span>
            </div>
            <div class="ml-progress-track">
              <div class="ml-progress-fill" style="width:${Math.max(stats.pct > 0 ? 3 : 0, stats.pct)}%"></div>
            </div>
          </div>

          <div class="ml-welcome-actions">
            <button type="button" class="ml-status-chip ${showGuide ? "active" : ""}" id="ml-toggle-guide-btn">
              ${showGuide ? "Hide quick guide" : "How this studio works"}
            </button>
            ${dueCount > 0 ? `<button type="button" class="ml-status-chip accent" id="ml-open-srs-review">Review Due (${dueCount})</button>` : ""}
            ${mistakes.length > 0 ? `<button type="button" class="ml-status-chip danger" id="ml-repair-mistakes">Review ${mistakes.length} Mistake${mistakes.length === 1 ? "" : "s"}</button>` : ""}
            ${mistakes.length > 0 && WHITEBOARD ? `<button type="button" class="ml-status-chip" id="ml-print-mistakes">🖨️ Print Mistakes</button>` : ""}
          </div>
        </div>

        <div class="ml-bento-card ml-nextup-card ml-dash-rec-card">
          <div class="ml-nextup-head">
            <span class="ml-bento-eyebrow">${isBrandNew ? "Recommended First Lesson" : "Continue Learning"}</span>
            <span class="ml-dash-rec-pill">Tutorial First</span>
          </div>

          <div class="ml-nextup-main">
            <div class="ml-nextup-title-row">
              <span class="ml-nextup-glyph" aria-hidden="true">${rec.icon}</span>
              <h3 class="ml-nextup-title">${fmtMath(rec.title)}</h3>
            </div>
            <p class="ml-nextup-sub">${fmtMath(rec.tagline)}</p>
          </div>

          <div class="ml-dash-rec-foot">
            <button type="button" class="ml-btn-primary ml-nextup-cta" data-launch-node="${rec.id}" data-mode="lesson">
              <span>Read Tutorial & Start</span>
              ${UI_ICONS.arrowRight}
            </button>
            <button type="button" class="ml-dash-quiet-link" data-inspect-tree="${rec.id}">
              Preview learning path →
            </button>
          </div>
        </div>
      </section>
    `;

    const dailyPlan = buildDailySessionPlan(state, rec, dueCount);
    const dailyPct = Math.round((dailyPlan.doneCount / dailyPlan.total) * 100);
    if (showSubjectOverview && wCfg.dailySession !== false) {
      html += `
        <section class="ml-daily-session-card" aria-label="Today's study session">
          <div class="ml-daily-head">
            <div>
              <div class="ml-bento-eyebrow">TODAY'S 15-MINUTE SESSION · ${dailyPlan.doneCount}/${dailyPlan.total} DONE</div>
              <h3 class="ml-daily-title">${dailyPlan.doneCount === dailyPlan.total ? "Daily loop complete — solid momentum." : "One clear path: recall, learn, and lock speed."}</h3>
            </div>
            <div class="ml-daily-cta-grp">
              <button type="button" class="ml-btn-primary" id="ml-daily-next-cta" data-daily-action="${escapeHtml(dailyPlan.nextStep.action)}" data-daily-payload="${escapeHtml(dailyPlan.nextStep.payload || "")}">
                <span>${dailyPlan.doneCount === dailyPlan.total ? "Bonus Practice" : `Start ${dailyPlan.nextStep.label.split(". ")[1]}`}</span>
                ${UI_ICONS.arrowRight}
              </button>
              <button type="button" class="ml-btn-mini" id="ml-daily-open-work" title="Practice step-by-step derivations">Work Studio →</button>
            </div>
          </div>
          <div class="ml-progress-track ml-daily-track">
            <div class="ml-progress-fill" style="width:${Math.max(dailyPct > 0 ? 6 : 0, dailyPct)}%"></div>
          </div>
          <div class="ml-daily-steps">
            ${dailyPlan.steps.map((st) => `
              <button type="button" class="ml-daily-step ${st.done ? "is-done" : ""}" data-daily-action="${escapeHtml(st.action)}" data-daily-payload="${escapeHtml(st.payload || "")}">
                <span class="ml-daily-check" aria-hidden="true">${st.done ? "✓" : "○"}</span>
                <span class="ml-daily-step-body">
                  <span class="ml-daily-step-kicker">${escapeHtml(st.label)}</span>
                  <strong>${fmtMath(st.title)}</strong>
                  <span class="ml-daily-step-meta">${escapeHtml(st.meta)}</span>
                </span>
                <span class="ml-daily-go" aria-hidden="true">→</span>
              </button>
            `).join("")}
          </div>
        </section>
      `;
    }

    if (showSubjectOverview && EDGE && wCfg.unfairEdge !== false) {
      const cal = EDGE.getCalibrationMetrics(state);
      const roi = EDGE.computeRoiTargets(state, DATA, TUTOR, 4);
      const activePreset = state.edgeInterleavePreset || "smart";
      const feynmanDone = Object.keys(state.feynmanVerified || {}).length;
      const runs = (state.edgeStats && state.edgeStats.interleaveRuns) || 0;
      const bestMed = state.edgeStats && state.edgeStats.interleaveMedianSec ? `${state.edgeStats.interleaveMedianSec}s/Q` : "—";

      html += `
        <section class="pr-edge-deck" aria-label="Unfair Advantage Engine">
          <div class="pr-edge-head">
            <div>
              <div class="ml-bento-eyebrow">UNFAIR ADVANTAGE ENGINE · METACOGNITION &amp; 80/20 LEVERAGE</div>
              <h3 class="pr-edge-title">Train the hidden skills real exams actually test.</h3>
            </div>
            <div class="pr-edge-kpis">
              <span class="pr-edge-kpi" title="Confidence calibration accuracy">Calibration <strong>${cal.calibrationScore !== null ? cal.calibrationScore + "%" : "—"}</strong></span>
              <span class="pr-edge-kpi ${cal.illusionCount > 0 ? "warn" : ""}" title="High-confidence wrong answers caught">Illusions <strong>${cal.illusionCount}</strong></span>
              <span class="pr-edge-kpi" title="Concepts verified via Feynman plain-English check">Feynman <strong>${feynmanDone}</strong></span>
              <span class="pr-edge-kpi" title="Best cold-recognition median speed in Blind Interleave">Cold Speed <strong>${bestMed}</strong></span>
            </div>
          </div>

          <div class="pr-edge-grid">
            <div class="pr-edge-card">
              <div class="pr-edge-card-kicker">1 · BLIND-TOPIC INTERLEAVING${runs > 0 ? ` · ${runs} RUN${runs === 1 ? "" : "S"}` : ""}</div>
              <h4>No-Labels Cold Recognition</h4>
              <p class="pr-edge-card-desc">Real exams never tell you the chapter. Solve 10 unlabeled mixed questions across 5+ worlds — topic &amp; cheat code reveal only after you lock.</p>
              <div class="pr-edge-preset-row">
                ${EDGE.INTERLEAVE_PRESETS.map((p) => `
                  <button type="button" class="pr-edge-pill ${activePreset === p.id ? "active" : ""}" data-edge-preset="${p.id}" title="${escapeHtml(p.desc)}">
                    ${escapeHtml(p.label)}${p.id === "illusions" && (cal.illusionCount + cal.luckyCount) > 0 ? ` (${cal.illusionCount + cal.luckyCount})` : ""}
                  </button>
                `).join("")}
              </div>
              <div class="pr-edge-card-foot">
                <button type="button" class="ml-btn-primary" id="pr-edge-start-blind">
                  <span>Start 10Q Blind Drill</span>
                  ${UI_ICONS.arrowRight}
                </button>
                <button type="button" class="ml-btn-mini" id="pr-edge-open-feynman" title="Explain a concept like I'm 12 — offline semantic checker">🧠 Feynman Check</button>
              </div>
              <div class="pr-edge-cal-strip">
                <strong>UPCAT / Exam Calibration:</strong> ${escapeHtml(cal.upcatAdvice)}
              </div>
            </div>

            <div class="pr-edge-card">
              <div class="pr-edge-card-kicker">2 · 80/20 ROI BOTTLENECK SNIPER</div>
              <div class="pr-edge-roi-top">
                <select id="pr-edge-goal-sel" class="pr-edge-select" aria-label="Target exam or goal">
                  ${EDGE.EXAM_GOALS.map((g) => `<option value="${g.id}" ${roi.goal.id === g.id ? "selected" : ""}>${escapeHtml(g.label)}</option>`).join("")}
                </select>
                <input type="date" id="pr-edge-date-inp" class="pr-edge-date" value="${escapeHtml(roi.dateIso)}" aria-label="Target exam date" title="Optional target exam date for daily quota countdown" />
              </div>
              <div class="pr-edge-readiness-bar">
                <div class="pr-edge-readiness-meta">
                  <span><strong>${roi.readinessPct}%</strong> target coverage (${roi.masteredInGoal}/${roi.totalInGoal})</span>
                  <span>${roi.daysLeft !== null ? `<strong>${roi.daysLeft}d left</strong> · ${roi.dailyQuota} skill${roi.dailyQuota === 1 ? "" : "s"}/day` : "Set date for daily pace"}</span>
                </div>
                <div class="ml-progress-track">
                  <div class="ml-progress-fill" style="width:${Math.max(roi.readinessPct > 0 ? 4 : 0, roi.readinessPct)}%"></div>
                </div>
              </div>
              <div class="pr-edge-roi-list">
                ${roi.targets.map((t) => `
                  <div class="pr-edge-roi-item">
                    <button type="button" class="pr-edge-roi-main" data-edge-roi-node="${t.node.id}">
                      <span class="pr-edge-roi-ico">${t.node.icon}</span>
                      <span class="pr-edge-roi-copy">
                        <strong>${fmtMath(t.node.title)}</strong>
                        <span class="pr-edge-roi-why ${t.hasIllusion ? "warn" : ""}">${escapeHtml(t.reason)}</span>
                      </span>
                    </button>
                    <button type="button" class="ml-btn-mini" data-edge-feynman-node="${t.node.id}" title="Test yourself with a Feynman Check">🧠</button>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </section>
      `;
    }

    if (showGuide) {
      html += `
        <section class="ml-howto-strip" aria-label="How Primer works">
          <div class="ml-howto-item">
            <span class="ml-howto-num">1</span>
            <div>
              <strong>Start from zero</strong>
              <p>Pick any beginner card or subject below — no prerequisites needed.</p>
            </div>
          </div>
          <div class="ml-howto-item">
            <span class="ml-howto-num">2</span>
            <div>
              <strong>Read the tutorial first</strong>
              <p>Short visual slides explain the core idea in plain language before any quiz.</p>
            </div>
          </div>
          <div class="ml-howto-item">
            <span class="ml-howto-num">3</span>
            <div>
              <strong>Practice at your pace</strong>
              <p>Try gentle questions or write your first lines of code in Code Studio.</p>
            </div>
          </div>
        </section>
      `;
    }

    if (wCfg.zeroShelf !== false) {
      html += `
        <section class="ml-zero-shelf">
          <div class="ml-section-head">
            <div>
              <h3 class="ml-section-title">Start from Zero</h3>
              <p class="ml-section-sub">Recommended starting points for complete beginners — each begins with an explanation.</p>
            </div>
            <button type="button" class="ml-dash-quiet-link" id="ml-open-studio-lib">Open Code Studio Library →</button>
          </div>
          <div class="ml-zero-grid">
            ${zeroStarters.map((st) => `
              <button type="button" class="ml-zero-card" data-zero-action="${st.action}" data-zero-target="${st.target}">
                <span class="ml-zero-tag">${escapeHtml(st.tag)}</span>
                <strong>${escapeHtml(st.title)}</strong>
                <p>${escapeHtml(st.desc)}</p>
                <span class="ml-zero-go">Read tutorial →</span>
              </button>
            `).join("")}
          </div>
        </section>
      `;
    }

    if (wCfg.examBanner !== false) {
      html += `
        <section class="ml-ex-dash-banner">
          <div class="ml-ex-dash-left">
            <span class="ml-bento-eyebrow">NEW · TAILORED CBT SIMULATOR</span>
            <h3>Exam Mode — DOST-SEI, UPCAT, Civil Service, NMAT & Big 4</h3>
            <p>Run authentic separately-timed mocks with official scoring rules (UPCAT R − ¼W & UPG, CSE 80% gate, NMAT 200–800 PR) and 1-click lesson remediation.</p>
          </div>
          <div class="ml-ex-dash-pills">
            <button type="button" class="ml-btn-mini" data-dash-exam="dost_sei">🔬 DOST-SEI</button>
            <button type="button" class="ml-btn-mini" data-dash-exam="upcat">🌻 UPCAT</button>
            <button type="button" class="ml-btn-mini" data-dash-exam="cse_pro">🏛️ CSE Pro</button>
            <button type="button" class="ml-btn-mini" data-dash-exam="nmat">🩺 NMAT</button>
            <button type="button" class="ml-btn-mini" data-dash-exam="acet">🦅 ACET</button>
            <button type="button" class="ml-btn-primary" id="ml-dash-open-exam-hub">Open All 10 Exams →</button>
          </div>
        </section>
      `;
    }

    html += `
      <section class="ml-library-section">
        <div class="ml-library-bar">
          <div>
            <h3 class="ml-section-title">Library</h3>
            <p class="ml-section-sub">Browse cleanly by subject, or search any lesson, formula, or coding topic.</p>
          </div>
          <div class="ml-library-controls">
            <div class="ml-lib-mode-toggle" role="tablist" aria-label="Library view mode">
              <button type="button" class="ml-lib-mode-btn ${showSubjectOverview ? "active" : ""}" id="ml-lib-mode-subjects">Subjects</button>
              <button type="button" class="ml-lib-mode-btn ${!showSubjectOverview ? "active" : ""}" id="ml-lib-mode-all">All Lessons</button>
            </div>
            <div class="ml-path-search-bar ml-lib-search-compact">
              <span class="ml-path-search-ico">${UI_ICONS.search}</span>
              <input type="search" id="ml-path-search" class="ml-path-search-input" placeholder="Search any topic..." value="${escapeHtml(state.pathQuery || "")}" />
              <button type="button" class="ml-search-inline-btn" id="ml-path-all-search" title="Global Search (Ctrl+K)">⌘K</button>
            </div>
          </div>
        </div>
    `;

    function buildSubjectOverviewHtml() {
      return `
        <div class="ml-subject-grid">
          ${subjectLibraries.map((lib) => {
            const pct = lib.count ? Math.round((lib.done / lib.count) * 100) : 0;
            return `
              <button type="button" class="ml-subject-card" data-era="${lib.id}">
                <div class="ml-subject-card-top">
                  <span class="ml-subject-ico">${lib.icon}</span>
                  <span class="ml-subject-count">${lib.done}/${lib.count} lessons</span>
                </div>
                <h4 class="ml-subject-title">${escapeHtml(lib.title)}</h4>
                <p class="ml-subject-desc">${escapeHtml(lib.desc)}</p>
                <div class="ml-progress-track ml-subject-track">
                  <div class="ml-progress-fill" style="width:${pct}%"></div>
                </div>
                <div class="ml-subject-foot">
                  <span>Starts with: ${escapeHtml(lib.startHint)}</span>
                  <span class="ml-subject-arrow">Browse →</span>
                </div>
              </button>
            `;
          }).join("")}
        </div>
      `;
    }

    function buildWorldsHtml(queryRaw) {
      const q = (queryRaw || "").toLowerCase().trim();
      if (!q && state.eraFilter === "all" && !state.pathBrowseAll) {
        return buildSubjectOverviewHtml();
      }
      const targetWorlds = q ? DATA.WORLDS : worldsToShow;
      const curStatusFilter = state.pathStatusFilter || "all";
      let out = "";
      let shownNodes = 0;

      if (!q) {
        out += `
          <div class="ml-lib-drill-bar">
            <div class="ml-lib-drill-left">
              <button type="button" class="ml-btn-mini" id="ml-lib-back-subjects">← All Subjects</button>
              ${subWorlds.length > 0 ? `
                <button type="button" class="ml-btn-mini ${state.eraFilter === activeCatObj.id ? "active" : ""}" data-era="${activeCatObj.id}">All in ${escapeHtml(activeCatObj.title)}</button>
                ${subWorlds.map((w) => `
                  <button type="button" class="ml-btn-mini ${state.eraFilter === w.id ? "active" : ""}" data-era="${w.id}">
                    ${escapeHtml(w.title.split(":")[0])}
                  </button>
                `).join("")}
              ` : `
                <span class="ml-lib-all-lbl">Browsing all ${DATA.NODES.length} lessons</span>
              `}
            </div>
            <div class="ml-lib-drill-right">
              <button type="button" class="ml-status-chip ${statusFilter === "all" ? "active" : ""}" data-status-filter="all">All</button>
              <button type="button" class="ml-status-chip ${statusFilter === "ready" ? "active" : ""}" data-status-filter="ready">Ready (${treeSummary.ready})</button>
              <button type="button" class="ml-status-chip ${statusFilter === "mastered" ? "active" : ""}" data-status-filter="mastered">Done (${treeSummary.mastered})</button>
              ${strictOn ? `<button type="button" class="ml-status-chip ${statusFilter === "locked" ? "active" : ""}" data-status-filter="locked">Locked (${treeSummary.locked})</button>` : ""}
              <button type="button" id="ml-toggle-prereq-mode" class="ml-tree-pill-toggle ${strictOn ? "active" : ""}" title="${strictOn ? "Guided order ON: complete basics to unlock advanced topics" : "Free Explore: every lesson unlocked"}">
                <span class="ml-tree-dot"></span>
                <span>${strictOn ? "Guided Order" : "Free Explore"}</span>
              </button>
            </div>
          </div>
        `;
      }

      for (const world of targetWorlds) {
        let nodes = DATA.NODES.filter((n) => n.worldId === world.id);
        if (q) {
          nodes = nodes.filter((n) => {
            const stepsText = (n.microSteps || []).map((s) => `${s.label} ${s.text}`).join(" ").toLowerCase();
            return (
              n.title.toLowerCase().includes(q) ||
              n.tagline.toLowerCase().includes(q) ||
              n.cheatCode.toLowerCase().includes(q) ||
              n.easyTruth.toLowerCase().includes(q) ||
              n.scaryVersion.toLowerCase().includes(q) ||
              world.title.toLowerCase().includes(q) ||
              stepsText.includes(q)
            );
          });
        }
        if (curStatusFilter !== "all") {
          nodes = nodes.filter((n) => {
            const m = state.nodeMastery[n.id] || 0;
            const info = getUnlockInfo(n.id);
            if (curStatusFilter === "mastered") return m >= 1;
            if (curStatusFilter === "ready") return m === 0 && !info.locked;
            if (curStatusFilter === "locked") return m === 0 && info.locked;
            return true;
          });
        }
        if (nodes.length === 0) continue;
        shownNodes += nodes.length;
        const allWorldNodes = DATA.NODES.filter((n) => n.worldId === world.id);
        const doneInWorld = allWorldNodes.filter((n) => (state.nodeMastery[n.id] || 0) >= 1).length;

        out += `
          <section class="ml-world-section" style="--world-color:${world.color}; --world-dark:${world.colorDark}; --world-soft:${world.bgSoft}; --world-border:${world.borderSoft};">
            <div class="ml-world-header">
              <div class="ml-world-badge">${world.icon}</div>
              <div class="ml-world-meta">
                <h2>${escapeHtml(world.title)}</h2>
                <p>${escapeHtml(world.subtitle)}</p>
              </div>
              <div class="ml-world-right">
                <button type="button" class="ml-btn-mini" data-skip-world="${world.id}" title="Already know this topic? Pass a quick check to unlock downstream lessons">
                  Test Out
                </button>
                <div class="ml-world-count">${doneInWorld}/${allWorldNodes.length}</div>
              </div>
            </div>

            <div class="ml-node-grid">
              ${nodes.map((node) => {
                const lvl = state.nodeMastery[node.id] || 0;
                const stage = getMasteryStage(lvl);
                const uInfo = getUnlockInfo(node.id);
                const isLocked = uInfo.locked;
                const pillClass = isLocked ? "locked" : (lvl === 0 ? "ready" : `level-${lvl}`);
                const pillText = isLocked ? "Locked" : (lvl === 0 ? "Start" : stage.short);

                const prereqChipsHtml = uInfo.prereqs.length > 0 ? `
                  <div class="ml-prereq-strip">
                    <span class="ml-prereq-lbl">${isLocked ? "Requires" : "Builds on"}</span>
                    ${uInfo.prereqs.slice(0, 2).map((p) => {
                      const pTitle = p.node ? p.node.title : p.id;
                      const shortTitle = pTitle.length > 24 ? pTitle.slice(0, 22) + "…" : pTitle;
                      return `
                        <button type="button" class="ml-prereq-chip ${p.met ? "met" : "missing"}" data-inspect-tree="${p.id}" title="${escapeHtml(pTitle)} — ${p.met ? "Completed" : "Recommended first"}">
                          <span>${p.met ? "✓" : "•"}</span>
                          <span>${escapeHtml(shortTitle)}</span>
                        </button>
                      `;
                    }).join("")}
                  </div>
                ` : `
                  <div class="ml-prereq-strip">
                    <span class="ml-prereq-chip root">Start from Zero</span>
                  </div>
                `;

                return `
                  <article class="ml-node-card level-${lvl} ${isLocked ? "is-locked" : ""}">
                    <div class="ml-node-top">
                      <div class="ml-node-icon-ring">${isLocked ? UI_ICONS.lock : node.icon}</div>
                      <div class="ml-node-top-right">
                        <div class="ml-node-stage-pill ${pillClass}">
                          <span>${escapeHtml(pillText)}</span>
                        </div>
                      </div>
                    </div>
                    <h3 class="ml-node-title">${fmtMath(node.title)}</h3>
                    <p class="ml-node-tagline">${fmtMath(node.tagline)}</p>
                    ${prereqChipsHtml}
                    <div class="ml-node-actions">
                      ${isLocked ? `
                        <button type="button" class="ml-btn-locked-path" data-inspect-tree="${node.id}">
                          See Prerequisites (${uInfo.missingPrereqs.length})
                        </button>
                        <button type="button" class="ml-btn-drill" data-testout-node="${node.id}" title="Already know the basics? Take a quick quiz to unlock">
                          Test Out
                        </button>
                      ` : `
                        <button type="button" class="ml-btn-node" data-launch-node="${node.id}" data-mode="lesson">
                          Read & Learn
                        </button>
                        <button type="button" class="ml-btn-drill" data-launch-node="${node.id}" data-mode="drill" title="5 quick practice questions">
                          Practice
                        </button>
                        ${node.bruteforce ? `<button type="button" class="ml-btn-bruteforce-mini" data-launch-bf="${node.id}" title="Endless quick memorization drill">Drill</button>` : ""}
                      `}
                    </div>
                  </article>
                `;
              }).join("")}
            </div>
          </section>
        `;
      }

      if (shownNodes === 0) {
        return `<div class="ml-mem-card" style="text-align:center; padding:32px;">No lessons matched this filter${queryRaw ? ` ("<strong>${escapeHtml(queryRaw)}</strong>")` : ""}. Try switching to <strong>All</strong> or pressing <strong>Ctrl+K</strong> for global search.</div>`;
      }
      return out;
    }

    html += `<div id="ml-path-worlds-wrap">${buildWorldsHtml(state.pathQuery || "")}</div></section>`;

    main.innerHTML = html;

    function bindWorldCardActions(scopeEl) {
      if (!scopeEl) return;
      scopeEl.querySelectorAll("[data-era]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          state.eraFilter = btn.dataset.era;
          state.pathBrowseAll = false;
          state.pathQuery = "";
          saveState();
          renderPathView(main);
        });
      });
      const backBtn = scopeEl.querySelector("#ml-lib-back-subjects");
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          AudioFX.playTap();
          state.eraFilter = "all";
          state.pathBrowseAll = false;
          state.pathQuery = "";
          saveState();
          renderPathView(main);
        });
      }
      scopeEl.querySelectorAll("[data-status-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          state.pathStatusFilter = btn.dataset.statusFilter;
          saveState();
          renderPathView(main);
        });
      });
      const prereqToggleBtn = scopeEl.querySelector("#ml-toggle-prereq-mode");
      if (prereqToggleBtn) {
        prereqToggleBtn.addEventListener("click", () => {
          AudioFX.playTap();
          state.strictPrereqs = state.strictPrereqs === false;
          if (!state.strictPrereqs && state.pathStatusFilter === "locked") {
            state.pathStatusFilter = "all";
          }
          saveState();
          renderPathView(main);
        });
      }
      scopeEl.querySelectorAll("[data-skip-world]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          startEraSkipSession(btn.dataset.skipWorld);
        });
      });
      scopeEl.querySelectorAll("[data-launch-node]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          startNodeSession(btn.dataset.launchNode, btn.dataset.mode);
        });
      });
      scopeEl.querySelectorAll("[data-launch-bf]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          openBruteforceLauncher(btn.dataset.launchBf);
        });
      });
      scopeEl.querySelectorAll("[data-inspect-tree]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          openPrereqModal(btn.dataset.inspectTree);
        });
      });
      scopeEl.querySelectorAll("[data-testout-node]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          startPrereqTestOutSession(btn.dataset.testoutNode);
        });
      });
    }

    const pathWorldsWrap = document.getElementById("ml-path-worlds-wrap");
    bindWorldCardActions(pathWorldsWrap);

    // Bind Recommended Hero CTA & preview path
    const heroRecLaunch = main.querySelector(".ml-nextup-card [data-launch-node]");
    if (heroRecLaunch) {
      heroRecLaunch.addEventListener("click", () => {
        AudioFX.playTap();
        startNodeSession(heroRecLaunch.dataset.launchNode, heroRecLaunch.dataset.mode || "lesson");
      });
    }
    main.querySelectorAll(".ml-nextup-card [data-inspect-tree]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        openPrereqModal(btn.dataset.inspectTree);
      });
    });

    const toggleGuideBtn = document.getElementById("ml-toggle-guide-btn");
    if (toggleGuideBtn) {
      toggleGuideBtn.addEventListener("click", () => {
        AudioFX.playTap();
        state.hideHowItWorks = !state.hideHowItWorks;
        if (ONBOARDING) {
          const scNow = ONBOARDING.ensureStudioConfig(state);
          scNow.widgets.quickGuide = !state.hideHowItWorks;
        }
        saveState();
        renderPathView(main);
      });
    }

    main.querySelectorAll("[data-tele-act]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        const act = btn.dataset.teleAct;
        if (act === "blind") startBlindInterleaveSession(state.edgeInterleavePreset || "smart", 10);
        else if (act === "customize") openStudioIntro("config", false);
        else if (act === "exam" || act === "work" || act === "constellation") {
          state.activeTab = act;
          saveState();
          renderApp();
        }
      });
    });

    // Bind Start-from-Zero starter cards
    main.querySelectorAll("[data-zero-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        const act = btn.dataset.zeroAction;
        const target = btn.dataset.zeroTarget;
        if (act === "forge") {
          state.forgeActiveQuestId = target || "zero-hello-print";
          state.forgeTrack = "zero";
          state.forgeView = "workspace";
          if (CODE_FORGE && CODE_FORGE.openWorkspace) CODE_FORGE.openWorkspace(state.forgeActiveQuestId);
          state.activeTab = "forge";
          saveState();
          renderApp();
          window.scrollTo(0, 0);
        } else {
          startNodeSession(target, "lesson");
        }
      });
    });

    const openStudioLibBtn = document.getElementById("ml-open-studio-lib");
    if (openStudioLibBtn) {
      openStudioLibBtn.addEventListener("click", () => {
        AudioFX.playTap();
        state.forgeView = "library";
        state.activeTab = "forge";
        saveState();
        renderApp();
        window.scrollTo(0, 0);
      });
    }

    main.querySelectorAll("[data-dash-exam]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        const exId = btn.dataset.dashExam;
        if (EXAM_MODE && EXAM_MODE.openExamDossier) EXAM_MODE.openExamDossier(exId, state);
        state.activeExamId = exId;
        state.activeTab = "exam";
        saveState();
        renderApp();
        window.scrollTo(0, 0);
      });
    });
    const openExamHubBtn = document.getElementById("ml-dash-open-exam-hub");
    if (openExamHubBtn) {
      openExamHubBtn.addEventListener("click", () => {
        AudioFX.playTap();
        state.activeTab = "exam";
        saveState();
        renderApp();
        window.scrollTo(0, 0);
      });
    }

    const modeSubjectsBtn = document.getElementById("ml-lib-mode-subjects");
    if (modeSubjectsBtn) {
      modeSubjectsBtn.addEventListener("click", () => {
        AudioFX.playTap();
        state.eraFilter = "all";
        state.pathBrowseAll = false;
        state.pathQuery = "";
        saveState();
        renderPathView(main);
      });
    }
    const modeAllBtn = document.getElementById("ml-lib-mode-all");
    if (modeAllBtn) {
      modeAllBtn.addEventListener("click", () => {
        AudioFX.playTap();
        state.eraFilter = "all";
        state.pathBrowseAll = true;
        saveState();
        renderPathView(main);
      });
    }

    const pathSearchInp = document.getElementById("ml-path-search");
    if (pathSearchInp) {
      pathSearchInp.addEventListener("input", () => {
        state.pathQuery = pathSearchInp.value;
        if (pathWorldsWrap) {
          pathWorldsWrap.innerHTML = buildWorldsHtml(state.pathQuery);
          bindWorldCardActions(pathWorldsWrap);
        }
      });
    }

    const pathAllSearchBtn = document.getElementById("ml-path-all-search");
    if (pathAllSearchBtn) {
      pathAllSearchBtn.addEventListener("click", () => {
        AudioFX.playTap();
        openGlobalSearch(state.pathQuery || "");
      });
    }

    const srsBtn = document.getElementById("ml-open-srs-review");
    if (srsBtn) {
      srsBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startSrsReviewSession();
      });
    }
    const repairBtn = document.getElementById("ml-repair-mistakes");
    if (repairBtn) {
      repairBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startMistakeRepairSession();
      });
    }
    const printMistakesBtn = document.getElementById("ml-print-mistakes");
    if (printMistakesBtn && WHITEBOARD) {
      printMistakesBtn.addEventListener("click", () => {
        AudioFX.playTap();
        const nodeMap = new Map(DATA.NODES.map((n) => [n.id, n]));
        WHITEBOARD.printMistakesSheet(state.mistakes || [], nodeMap);
      });
    }

    function launchDailyAction(action, payload) {
      AudioFX.playTap();
      if (action === "vault_due" && MY_VAULT) {
        MY_VAULT.openFirstDueDeck(state);
        state.activeTab = "myvault";
        saveState();
        renderApp();
      } else if (action === "srs") {
        startSrsReviewSession();
      } else if (action === "mistakes") {
        startMistakeRepairSession();
      } else if (action === "memorize") {
        state.activeTab = "memorize";
        saveState();
        renderApp();
      } else if (action === "lesson" && payload) {
        startNodeSession(payload, "lesson");
      } else if (action === "sprint") {
        pendingExternalSprint = { modeId: payload || "alg" };
        state.activeTab = "gym";
        saveState();
        renderApp();
      }
    }

    main.querySelectorAll("[data-daily-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        launchDailyAction(btn.dataset.dailyAction, btn.dataset.dailyPayload);
      });
    });

    const dailyWorkBtn = document.getElementById("ml-daily-open-work");
    if (dailyWorkBtn) {
      dailyWorkBtn.addEventListener("click", () => {
        AudioFX.playTap();
        state.activeTab = "work";
        saveState();
        renderApp();
      });
    }

    if (EDGE) {
      main.querySelectorAll("[data-edge-preset]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          state.edgeInterleavePreset = btn.dataset.edgePreset;
          saveState();
          renderPathView(main);
        });
      });
      const startBlindBtn = document.getElementById("pr-edge-start-blind");
      if (startBlindBtn) {
        startBlindBtn.addEventListener("click", () => {
          AudioFX.playTap();
          startBlindInterleaveSession(state.edgeInterleavePreset || "smart", 10);
        });
      }
      const openFeynBtn = document.getElementById("pr-edge-open-feynman");
      if (openFeynBtn) {
        openFeynBtn.addEventListener("click", () => {
          AudioFX.playTap();
          openFeynmanModal(rec ? rec.id : (DATA.NODES[0] && DATA.NODES[0].id));
        });
      }
      const goalSel = document.getElementById("pr-edge-goal-sel");
      if (goalSel) {
        goalSel.addEventListener("change", () => {
          AudioFX.playTap();
          EDGE.ensureEdgeState(state);
          state.examTarget.goalId = goalSel.value;
          saveState();
          renderPathView(main);
        });
      }
      const dateInp = document.getElementById("pr-edge-date-inp");
      if (dateInp) {
        dateInp.addEventListener("change", () => {
          EDGE.ensureEdgeState(state);
          state.examTarget.dateIso = dateInp.value || "";
          saveState();
          renderPathView(main);
        });
      }
      main.querySelectorAll("[data-edge-roi-node]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          startNodeSession(btn.dataset.edgeRoiNode, "lesson");
        });
      });
      main.querySelectorAll("[data-edge-feynman-node]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          openFeynmanModal(btn.dataset.edgeFeynmanNode);
        });
      });
    }
  }

  function executeTutorAction(actionType, payload) {
    if (actionType === "srs-review") {
      startSrsReviewSession();
    } else if (actionType === "repair") {
      if ((state.mistakes || []).length > 0) startMistakeRepairSession();
      else startNodeSession("pemdas-grammar", "lesson");
    } else if (actionType === "mult-bruteforce") {
      MEM.openMultBruteforce(payload || "hard15");
      state.activeTab = "memorize";
      saveState();
      renderApp();
    } else if (actionType === "mult-course") {
      MEM.openMultCourse();
      state.activeTab = "memorize";
      saveState();
      renderApp();
    } else if (actionType === "node-bruteforce") {
      openBruteforceLauncher(payload);
    } else if (actionType === "lesson") {
      startNodeSession(payload, "lesson");
    } else if (actionType === "sprint") {
      pendingExternalSprint = payload || "mult";
      state.activeTab = "gym";
      saveState();
      renderApp();
    } else {
      state.activeTab = "tutor";
      saveState();
      renderApp();
    }
  }

  // ==================== TAB: SMART TUTOR HQ ====================
  function renderTutorTab(main) {
    if (!TUTOR) return;
    TUTOR.renderTutorView(main, state, {
      onTap: () => AudioFX.playTap(),
      onCorrect: (xpGain) => {
        AudioFX.playCorrect();
        recordStudyActivity(1);
        if (xpGain) {
          state.xp += xpGain;
          evaluateBadges();
          saveState();
          renderTopBar();
        }
      },
      onWrong: () => {
        AudioFX.playWrong();
        recordStudyActivity(1);
        saveState();
      },
      onSaveState: () => saveState(),
      onGauntletFinish: (correctCount) => {
        state.xp += correctCount * 10 + 20;
        state.gems += 15;
        evaluateBadges();
        saveState();
        renderTopBar();
        AudioFX.playLevelUp();
      },
      onExecuteAction: (act, payload) => executeTutorAction(act, payload)
    });
  }

  // ==================== TAB 2: MEMORIZE VAULT ====================
  function renderMemorizeTab(main) {
    if (!state.multMastered) state.multMastered = {};
    MEM.renderMemorizeView(main, state, {
      onTap: () => AudioFX.playTap(),
      onCorrect: (xpGain) => {
        AudioFX.playCorrect();
        if (xpGain) {
          state.xp += xpGain;
          evaluateBadges();
          saveState();
          renderTopBar();
        }
      },
      onWrong: () => AudioFX.playWrong(),
      onRecordAttempt: (evt) => {
        if (TUTOR) {
          TUTOR.recordAttempt(state, evt);
          saveState();
        }
      },
      onSaveMultFact: (a, b, streak) => {
        const k = `${Math.min(a, b)}x${Math.max(a, b)}`;
        state.multMastered[k] = Math.max(state.multMastered[k] || 0, streak);
        saveState();
      },
      onCompleteMultStage: (stage) => {
        const list = stage.unlockPairs || stage.pairs || [];
        for (const pair of list) {
          const k = `${Math.min(pair[0], pair[1])}x${Math.max(pair[0], pair[1])}`;
          state.multMastered[k] = 2;
        }
        state.xp += 40;
        state.gems += 20;
        const unlocked = new Set(state.badges || []);
        unlocked.add("tables_master");
        state.badges = Array.from(unlocked);
        evaluateBadges();
        saveState();
        renderTopBar();
        AudioFX.playLevelUp();
      },
      onLaunchSprint: (modeId) => {
        AudioFX.playTap();
        pendingExternalSprint = modeId;
        state.activeTab = "gym";
        saveState();
        renderApp();
      }
    });
  }

  // ==================== TAB 3: SPEED GYM & DIAGNOSTIC ====================
  function renderGymTab(main) {
    const hooks = {
      onTap: () => AudioFX.playTap(),
      onCorrect: (xpGain) => {
        AudioFX.playCorrect();
        if (xpGain) {
          state.xp += xpGain;
          saveState();
          renderTopBar();
        }
      },
      onWrong: () => AudioFX.playWrong(),
      onRerender: () => renderGymTab(main),
      onLaunchNode: (nodeId) => startNodeSession(nodeId, "lesson"),
      onSaveDiagnostic: (nodeId, summary, cracks) => {
        state.diagnosticNodeId = nodeId;
        state.diagnosticSummary = summary;
        state.diagnosticCracks = cracks || [];
        for (const c of state.diagnosticCracks) {
          if (c && c.q) recordMistake(c.nodeId, c.q);
        }
        state.xp += 25;
        state.gems += 15;
        evaluateBadges();
        saveState();
        renderTopBar();
      },
      onQueueAllCracks: (cracks) => {
        for (const c of (cracks || [])) {
          if (c && c.q) recordMistake(c.nodeId, c.q);
        }
        saveState();
        renderTopBar();
        startMistakeRepairSession();
      },
      onSprintFinish: (modeId, score, _total) => {
        const prev = (state.gymBest && state.gymBest[modeId]) || 0;
        if (score > prev) state.gymBest[modeId] = score;
        const xpGain = Math.max(10, score * 4);
        const gemGain = Math.max(5, Math.floor(score / 2) + 5);
        state.xp += xpGain;
        state.gems += gemGain;
        markDailyStep("sprint");
        recordStudyActivity(1);
        evaluateBadges();
        saveState();
        renderTopBar();
        AudioFX.playLevelUp();
      }
    };

    if (pendingExternalSprint) {
      const mId = pendingExternalSprint;
      pendingExternalSprint = null;
      MEM.launchExternalSprint(mId, main, state, hooks);
    } else {
      MEM.renderGymView(main, state, hooks);
    }
  }

  // ==================== TAB 4: GRADE 12 TRAPS & SYNTHESIS BOSSES ====================
  function renderSynthesisCardHtml(p, isProcedural) {
    const solved = !isProcedural && !!(state.synthSolved && state.synthSolved[p.id]);
    const fb = synthFeedbackMap[p.id] || null;
    const showChain = solved || (fb && fb.reveal);
    const concepts = p.concepts || p.topics || [];
    const badgeText = p.badge || p.subject || (concepts.length ? "🏆 " + concepts[0] : "Boss");
    const statusText = p.subject || (concepts.length ? concepts.join(" · ") : "Boss");
    const trapWarn = p.trapWarning || "";
    const whyText = p.whyEasy || (Array.isArray(p.stepsChain) && p.stepsChain.length ? p.stepsChain[p.stepsChain.length - 1] : "See the step-by-step chain below.");
    return `
      <article class="ml-synth-card ${solved ? "busted" : ""}" id="synth-${p.id}">
        <div class="ml-trap-head">
          <div>
            <span class="ml-mini-tag">${escapeHtml(badgeText)}</span>
            <h3 style="margin:4px 0 0;">${fmtMath(p.title)}</h3>
          </div>
          <span class="ml-trap-status">${solved ? "✅ Solved" : escapeHtml(statusText)}</span>
        </div>

        <div class="ml-synth-concepts">
          ${concepts.map((c) => `<span class="ml-pill" style="cursor:default; padding:4px 10px;">${escapeHtml(c)}</span>`).join("")}
        </div>

        ${trapWarn ? `
          <div class="ml-trap-wrong" style="margin:10px 0; border-radius:10px;">
            <strong>⚠️ ${fmtMath(trapWarn)}</strong>
          </div>
        ` : ""}

        <div class="ml-trap-q-prompt" style="font-size:14.5px; line-height:1.5; margin-bottom:10px;">
          ${fmtMath(p.prompt)}
        </div>

        <div class="ml-synth-footer">
          <div class="ml-trap-q-opts">
            ${p.options.map((opt) => {
              let cls = "ml-trap-opt";
              if (fb && fb.chosen) {
                if (opt === p.answer) cls += " correct";
                else if (opt === fb.chosen && !fb.ok) cls += " wrong";
              }
              return `<button type="button" class="${cls}" data-synth-id="${p.id}" data-synth-proc="${isProcedural ? "1" : "0"}" data-synth-opt="${escapeHtml(opt)}">${fmtMath(opt)}</button>`;
            }).join("")}
          </div>

          <div class="ml-synth-action-row">
            <button type="button" class="ml-btn-mini" data-synth-chain="${p.id}">${showChain ? "Hide Step Chain" : "Reveal Step-by-Step Chain"}</button>
            ${fb ? `<div class="ml-trap-feedback ${fb.ok ? "ok" : "nope"}" style="margin:0;"><strong>${fb.ok ? "Clean Synthesis · " : "Trap Triggered · "}</strong>${fmtMath(whyText)}</div>` : ""}
          </div>

          ${showChain ? `
            <div class="ml-synth-chain">
              ${(p.stepsChain || []).map((st) => `<div>${fmtMath(st)}</div>`).join("")}
            </div>
          ` : ""}
        </div>
      </article>
    `;
  }

  function renderTrapsView(main) {
    const bustedCount = Object.keys(state.trapBusted).length;
    const synthList = DATA.SYNTHESIS_PROBLEMS || [];
    const synthCount = Object.keys(state.synthSolved || {}).length;
    const sub = state.trapsSubTab === "synthesis" ? "synthesis" : "traps";

    let bodyHtml = "";
    if (sub === "synthesis") {
      if (!activeProcSynth && DATA.generateSynthesisProblem) {
        activeProcSynth = DATA.generateSynthesisProblem();
      }
      bodyHtml = `
        <div class="ml-mem-card ml-card-warn" style="margin-bottom:16px;">
          <div class="ml-mem-toolbar">
            <div>
              <h3 style="margin:0;">🎲 Infinite Multi-Step Exam Problem Generator</h3>
              <p class="ml-viz-sub" style="margin:0;">Combines unit traps (g→kg, km/h→m/s, °C→K), ratios & equations dynamically.</p>
            </div>
            <button type="button" class="ml-btn-primary" id="ml-new-proc-synth">🎲 New Multi-Step Boss →</button>
          </div>
          ${activeProcSynth ? renderSynthesisCardHtml(activeProcSynth, true) : ""}
        </div>

        <div class="ml-traps-grid">
          ${synthList.map((p) => renderSynthesisCardHtml(p, false)).join("")}
        </div>
      `;
    } else {
      bodyHtml = `
        <div class="ml-traps-grid">
          ${DATA.GRADE12_TRAPS.map((trap) => {
            const isBusted = !!state.trapBusted[trap.id];
            return `
              <article class="ml-trap-card ${isBusted ? "busted" : ""}" id="card-${trap.id}">
                <div class="ml-trap-head">
                  <h3>${escapeHtml(trap.title)}</h3>
                  <span class="ml-trap-status">${isBusted ? "✅ Busted" : "⚠️ Watch Out"}</span>
                </div>
                <div class="ml-trap-expr">${fmtMath(trap.trapExpression, true)}</div>
                <div class="ml-trap-compare">
                  <div class="ml-trap-wrong">
                    <span class="ml-mini-tag">❌ Common Trap</span>
                    <strong>${fmtMath(trap.wrongGuess)}</strong>
                  </div>
                  <div class="ml-trap-right">
                    <span class="ml-mini-tag">✅ Actual Truth</span>
                    <strong>${fmtMath(trap.rightAnswer)}</strong>
                  </div>
                </div>
                <p class="ml-trap-why">${fmtMath(trap.whyItHappens)}</p>
                <div class="ml-trap-rule"><strong>Golden Rule:</strong> ${fmtMath(trap.quickRule)}</div>

                <div class="ml-trap-quiz-box" data-trap-quiz="${trap.id}">
                  <div class="ml-trap-q-prompt">🎯 Quick Check: ${fmtMath(trap.quiz.prompt)}</div>
                  <div class="ml-trap-q-opts">
                    ${trap.quiz.options.map((opt) => `
                      <button type="button" class="ml-trap-opt" data-trap="${trap.id}" data-opt="${escapeHtml(opt)}">
                        ${fmtMath(opt)}
                      </button>
                    `).join("")}
                  </div>
                  <div class="ml-trap-feedback" id="fb-${trap.id}"></div>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      `;
    }

    main.innerHTML = `
      <div class="ml-section-banner">
        <div>
          <h2>Classic Traps (${bustedCount}/${DATA.GRADE12_TRAPS.length}) & Multi-Step Bosses (${synthCount}/${synthList.length})</h2>
          <p>Spot single-line pitfalls across Math, Physics, AI, HTML/CSS, Python, PH History, Filipino & Shapes — or solve multi-concept synthesis bosses.</p>
        </div>
        <div class="ml-viz-tabs">
          <button type="button" class="ml-filter-pill ${sub === "traps" ? "active" : ""}" data-trap-sub="traps">
            ${DATA.GRADE12_TRAPS.length} Trap Busters
          </button>
          <button type="button" class="ml-filter-pill ${sub === "synthesis" ? "active" : ""}" data-trap-sub="synthesis">
            Multi-Step Synthesis (${synthList.length} + Infinite)
          </button>
        </div>
      </div>

      ${bodyHtml}
    `;

    main.querySelectorAll("[data-trap-sub]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        state.trapsSubTab = btn.dataset.trapSub;
        saveState();
        renderTrapsView(main);
      });
    });

    const newSynthBtn = document.getElementById("ml-new-proc-synth");
    if (newSynthBtn) {
      newSynthBtn.addEventListener("click", () => {
        AudioFX.playTap();
        activeProcSynth = DATA.generateSynthesisProblem();
        delete synthFeedbackMap[activeProcSynth.id];
        renderTrapsView(main);
      });
    }

    main.querySelectorAll("[data-synth-chain]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        const sid = btn.dataset.synthChain;
        const cur = synthFeedbackMap[sid] || {};
        synthFeedbackMap[sid] = Object.assign({}, cur, { reveal: !cur.reveal });
        renderTrapsView(main);
      });
    });

    main.querySelectorAll("[data-synth-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sid = btn.dataset.synthId;
        const chosen = btn.dataset.synthOpt;
        const isProc = btn.dataset.synthProc === "1";
        const prob = isProc && activeProcSynth && activeProcSynth.id === sid
          ? activeProcSynth
          : synthList.find((x) => x.id === sid);
        if (!prob) return;

        const ok = chosen === prob.answer;
        synthFeedbackMap[sid] = { chosen, ok, reveal: true };
        if (ok) {
          AudioFX.playCorrect();
          if (isProc) {
            state.xp += 15;
            state.gems += 5;
          } else {
            if (!state.synthSolved) state.synthSolved = {};
            if (!state.synthSolved[sid]) {
              state.synthSolved[sid] = true;
              state.xp += 25;
              state.gems += 10;
            }
          }
          evaluateBadges();
          saveState();
          renderTopBar();
        } else {
          AudioFX.playWrong();
        }
        renderTrapsView(main);
      });
    });

    main.querySelectorAll("[data-trap]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const trapId = btn.dataset.trap;
        const chosen = btn.dataset.opt;
        const trap = DATA.GRADE12_TRAPS.find((t) => t.id === trapId);
        if (!trap) return;

        const box = main.querySelector(`[data-trap-quiz="${trapId}"]`);
        const fb = document.getElementById(`fb-${trapId}`);
        box.querySelectorAll(".ml-trap-opt").forEach((b) => {
          b.classList.remove("correct", "wrong");
          if (b.dataset.opt === trap.quiz.answer) b.classList.add("correct");
        });

        if (chosen === trap.quiz.answer) {
          AudioFX.playCorrect();
          if (!state.trapBusted[trapId]) {
            state.trapBusted[trapId] = true;
            state.xp += 20;
            state.gems += 5;
            evaluateBadges();
            saveState();
            renderTopBar();
            const card = document.getElementById(`card-${trapId}`);
            if (card) {
              card.classList.add("busted");
              card.querySelector(".ml-trap-status").textContent = "✅ Busted";
            }
          }
          fb.className = "ml-trap-feedback ok";
          fb.innerHTML = `<strong>Wait, that's so clean! (+20 XP)</strong> ${fmtMath(trap.quiz.explanation || trap.quickRule)}`;
        } else {
          AudioFX.playWrong();
          btn.classList.add("wrong");
          fb.className = "ml-trap-feedback nope";
          fb.innerHTML = `<strong>Almost!</strong> ${fmtMath(trap.quiz.explanation || trap.quickRule)}`;
        }
      });
    });
  }

  // ==================== TAB 5: INTERACTIVE VISUAL PLAYGROUNDS ====================
  function renderLabView(main) {
    const cat = state.labCategory || "all";
    const cats = [
      { id: "all", label: `All (${VIZ.list.length})` },
      { id: "ai_code", label: "AI & Coding" },
      { id: "humanities_shapes", label: "Shapes & Humanities" },
      { id: "physics", label: "Physics & Earth" },
      { id: "math", label: "Math & Calculus" },
      { id: "stem", label: "Chem & Bio" }
    ];
    const shownLabs = cat === "all" ? VIZ.list : VIZ.list.filter((item) => item.category === cat);
    if (!shownLabs.some((x) => x.id === state.activeLabId) && shownLabs.length > 0) {
      state.activeLabId = shownLabs[0].id;
    }

    main.innerHTML = `
      <div class="ml-lab-head-bar">
        <div class="ml-viz-tabs" role="tablist" aria-label="Playground categories">
          ${cats.map((c) => `
            <button type="button" class="ml-pill ${cat === c.id ? "active" : ""}" data-lab-cat="${c.id}">
              ${escapeHtml(c.label)}
            </button>
          `).join("")}
        </div>
        <select id="ml-lab-mobile-select" class="ml-lab-mobile-select" aria-label="Choose interactive playground">
          ${shownLabs.map((item) => `
            <option value="${item.id}" ${state.activeLabId === item.id ? "selected" : ""}>${escapeHtml(item.title)}</option>
          `).join("")}
        </select>
      </div>

      <div class="ml-lab-workspace">
        <aside class="ml-lab-rail" aria-label="Interactive studios">
          <div class="ml-lab-rail-head">
            <span>Studios</span>
            <span class="ml-muted-paren">${shownLabs.length}</span>
          </div>
          <div class="ml-lab-rail-list">
            ${shownLabs.map((item) => {
              const parts = item.title.match(/^(\d+)\.\s*(.*)$/);
              const num = parts ? parts[1].padStart(2, "0") : "";
              const cleanTitle = parts ? parts[2] : item.title;
              return `
                <button type="button" class="ml-lab-rail-btn ${state.activeLabId === item.id ? "active" : ""}" data-lab="${item.id}">
                  ${num ? `<span class="ml-lab-num">${num}</span>` : ""}
                  <span class="ml-lab-rail-lbl">${escapeHtml(cleanTitle)}</span>
                </button>
              `;
            }).join("")}
          </div>
        </aside>
        <div class="ml-lab-stage" id="ml-lab-mount"></div>
      </div>
    `;

    VIZ.mountVisualizer(state.activeLabId, document.getElementById("ml-lab-mount"));

    const mobSel = document.getElementById("ml-lab-mobile-select");
    if (mobSel) {
      mobSel.addEventListener("change", () => {
        AudioFX.playTap();
        state.activeLabId = mobSel.value;
        saveState();
        renderLabView(main);
      });
    }

    main.querySelectorAll("[data-lab-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        state.labCategory = btn.dataset.labCat;
        saveState();
        renderLabView(main);
      });
    });

    main.querySelectorAll("[data-lab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        state.activeLabId = btn.dataset.lab;
        saveState();
        renderLabView(main);
      });
    });
  }

  // ==================== TAB 6: EVERYTHING SIMPLY & BADGES ====================
  function renderCheatSheetView(main) {
    const unlockedSet = new Set(state.badges || []);

    function buildCheatCardsHtml(queryRaw) {
      const q = (queryRaw || "").toLowerCase().trim();
      const filtered = DATA.NODES.filter((n) => {
        if (!q) return true;
        return (
          n.title.toLowerCase().includes(q) ||
          n.easyTruth.toLowerCase().includes(q) ||
          n.cheatCode.toLowerCase().includes(q) ||
          n.tagline.toLowerCase().includes(q) ||
          n.worldId.toLowerCase().includes(q)
        );
      });
      if (filtered.length === 0) {
        return `<div class="ml-mem-card" style="text-align:center; padding:28px;">No topics matched "<strong>${escapeHtml(queryRaw)}</strong>". Try searching <em>relu, flexbox, python, rizal, nang, xor, kepler, or capacitor</em>.</div>`;
      }
      return filtered.map((n) => {
        const w = getWorld(n.worldId);
        const uInfo = getUnlockInfo(n.id);
        return `
          <article class="ml-cheat-card">
            <div class="ml-cheat-head">
              <span class="ml-cheat-era" style="--world-color:${w.color}; --world-soft:${w.bgSoft}; --world-border:${w.borderSoft};">
                ${w.icon} ${escapeHtml(w.title.split(":")[0])}
              </span>
              <button type="button" class="ml-btn-mini" data-jump-node="${n.id}">${uInfo.locked ? "🔒 Unlock Path →" : "Practice →"}</button>
            </div>
            <h3>${n.icon} ${fmtMath(n.title)}</h3>
            <div class="ml-cheat-cols">
              <div class="ml-scary-box">
                <span class="ml-mini-tag">Textbook Jargon</span>
                <div class="ml-scary-strike">${fmtMath(n.scaryVersion)}</div>
              </div>
              <div class="ml-easy-box">
                <span class="ml-mini-tag">Plain-English Truth</span>
                <div>${fmtMath(n.easyTruth)}</div>
              </div>
            </div>
            <div class="ml-cheat-code-strip">
              <strong>Cheat Code:</strong> ${fmtMath(n.cheatCode)}
            </div>
          </article>
        `;
      }).join("");
    }

    main.innerHTML = `
      <div class="ml-section-banner">
        <div>
          <h2>"Everything Simply" Reference Guide (${DATA.NODES.length} Topics)</h2>
          <p>Every concept across Math, Physics Laws, STEM, AI, HTML/CSS/Python, PH History, Filipino, Abstract Shapes & Career distilled into plain intuition.</p>
        </div>
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <input type="search" id="ml-cheat-search" class="ml-search-input" placeholder="Search (e.g. relu, flexbox, python, rizal, nang, xor, kepler)..." value="${escapeHtml(state.cheatQuery || "")}" />
          ${WHITEBOARD ? `<button type="button" class="ml-btn-secondary" id="ml-cheat-print">🖨️ Print Cram Sheet (PDF)</button>` : ""}
        </div>
      </div>

      <div class="ml-cheat-list" id="ml-cheat-list-wrap">
        ${buildCheatCardsHtml(state.cheatQuery || "")}
      </div>

      <div class="ml-section-banner" style="margin-top:28px;">
        <div>
          <h2>Achievements (${unlockedSet.size}/${DATA.BADGES.length})</h2>
          <p>Earn milestones across Foundations, Calculus, SHS STEM Handouts, and Career Readiness.</p>
        </div>
      </div>

      <div class="ml-badges-grid">
        ${DATA.BADGES.map((b) => {
          const ok = unlockedSet.has(b.id);
          return `
            <div class="ml-badge-card ${ok ? "unlocked" : ""}">
              <div class="ml-badge-emoji">${ok ? (b.emoji || "★") : "🔒"}</div>
              <div>
                <div class="ml-badge-title">${escapeHtml(b.title)}</div>
                <div class="ml-badge-desc">${escapeHtml(b.description || "")}</div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    const listWrap = document.getElementById("ml-cheat-list-wrap");
    function bindJumpBtns() {
      if (!listWrap) return;
      listWrap.querySelectorAll("[data-jump-node]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          startNodeSession(btn.dataset.jumpNode, "lesson");
        });
      });
    }
    bindJumpBtns();

    const searchInp = document.getElementById("ml-cheat-search");
    searchInp.addEventListener("input", () => {
      state.cheatQuery = searchInp.value;
      if (listWrap) {
        listWrap.innerHTML = buildCheatCardsHtml(state.cheatQuery);
        bindJumpBtns();
      }
    });

    const printCheatBtn = document.getElementById("ml-cheat-print");
    if (printCheatBtn && WHITEBOARD) {
      printCheatBtn.addEventListener("click", () => {
        AudioFX.playTap();
        const q = (state.cheatQuery || "").toLowerCase().trim();
        const list = DATA.NODES.filter((n) => {
          if (!q) return true;
          return (
            n.title.toLowerCase().includes(q) ||
            n.easyTruth.toLowerCase().includes(q) ||
            n.cheatCode.toLowerCase().includes(q) ||
            n.tagline.toLowerCase().includes(q) ||
            n.worldId.toLowerCase().includes(q)
          );
        });
        WHITEBOARD.printReferenceCramSheet(list, getWorld, state.cheatQuery || "");
      });
    }
  }

  // ==================== LESSON / DRILL / REPAIR / SKIP / PREREQ MODAL ====================
  function openPrereqModal(nodeId) {
    const node = DATA.NODES.find((n) => n.id === nodeId);
    if (!node) return;
    session = {
      mode: "prereqs",
      phase: "prereqs",
      node
    };
    renderModal();
  }

  function startPrereqTestOutSession(targetNodeId) {
    const targetNode = DATA.NODES.find((n) => n.id === targetNodeId);
    if (!targetNode) return;
    const uInfo = getUnlockInfo(targetNodeId);
    if (!uInfo.locked) {
      startNodeSession(targetNodeId, "lesson");
      return;
    }

    // Build a focused placement test from missing prerequisites:
    // Include ALL direct missing prerequisites first, plus earliest missing ancestors (up to 6 Qs total).
    const directMissing = uInfo.missingPrereqs.map((p) => p.node).filter(Boolean);
    const chainMissing = uInfo.chain.map((c) => c.node).filter(Boolean);
    const chosenMap = new Map();
    for (const dn of directMissing) chosenMap.set(dn.id, dn);
    for (const cn of chainMissing) {
      if (chosenMap.size >= 6) break;
      if (!chosenMap.has(cn.id)) chosenMap.set(cn.id, cn);
    }
    const testedNodes = Array.from(chosenMap.values());
    if (testedNodes.length === 0) {
      startNodeSession(targetNodeId, "lesson", true);
      return;
    }

    // If only 1–2 missing prerequisites, sample 2 questions per prereq (min 3 Qs) so Test-Out proves real fluency
    const qs = [];
    const perNode = testedNodes.length <= 2 ? 2 : 1;
    for (const pn of testedNodes) {
      for (let i = 0; i < perNode; i++) {
        const pq = DATA.generateProceduralQuestion(pn.id);
        qs.push(Object.assign({ isRetry: false, sourceNodeId: pn.id, sourceTitle: pn.title }, pq));
      }
    }

    session = {
      node: {
        id: "testout-" + targetNode.id,
        worldId: targetNode.worldId,
        title: `Prerequisite Test-Out → ${targetNode.title}`,
        icon: "⚡"
      },
      mode: "prereq_testout",
      targetUnlockNodeId: targetNode.id,
      testedPrereqIds: testedNodes.map((n) => n.id),
      directMissingIds: directMissing.map((n) => n.id),
      worldToSkip: null,
      phase: "quiz",
      questions: qs,
      originalCount: qs.length,
      firstTryCorrect: 0,
      idx: 0,
      correctCount: 0,
      combo: 0,
      maxCombo: 0,
      xpEarned: 0,
      gemsEarned: 0,
      selectedOpt: null,
      checked: false,
      isCorrect: false,
      lastFlash: null,
      showHint: false,
      questionStart: Date.now()
    };
    renderModal();
  }

  function startBlindInterleaveSession(presetId, count) {
    if (!EDGE) {
      startSrsReviewSession();
      return;
    }
    const built = EDGE.buildBlindInterleave(state, DATA, TUTOR, presetId || state.edgeInterleavePreset || "smart", count || 10);
    if (!built || !built.questions || !built.questions.length) {
      startSrsReviewSession();
      return;
    }
    session = {
      node: {
        id: "blind-interleave",
        worldId: "interleave",
        title: `Blind Interleave · ${built.preset.label} (${built.distinctWorlds} Worlds)`,
        icon: "🕶️"
      },
      mode: "blind_interleave",
      blindTopic: true,
      interleavePreset: built.preset.id,
      phase: "quiz",
      questions: built.questions.map((q) => Object.assign({ isRetry: false }, q)),
      originalCount: built.questions.length,
      firstTryCorrect: 0,
      idx: 0,
      correctCount: 0,
      combo: 0,
      maxCombo: 0,
      xpEarned: 0,
      gemsEarned: 0,
      selectedOpt: null,
      confidence: "sure",
      lastConfidenceOutcome: null,
      blindTimesMs: [],
      checked: false,
      isCorrect: false,
      lastFlash: null,
      showHint: false,
      questionStart: Date.now()
    };
    renderModal();
  }

  function openFeynmanModal(nodeId) {
    if (!EDGE) return;
    const node = DATA.NODES.find((n) => n.id === nodeId) || getRecommendedNode() || DATA.NODES[0];
    if (!node) return;
    EDGE.ensureEdgeState(state);
    const saved = state.feynmanVerified && state.feynmanVerified[node.id];
    session = {
      mode: "feynman",
      phase: "feynman",
      node,
      feynmanText: saved ? saved.text : "",
      feynmanResult: saved && saved.text ? EDGE.evaluateFeynman(node, saved.text) : null,
      feynmanSavedNotice: ""
    };
    renderModal();
  }

  function renderFeynmanModal(modal) {
    const n = session.node;
    const w = getWorld(n.worldId);
    const anchors = EDGE ? EDGE.extractNodeAnchors(n) : [];
    const res = session.feynmanResult;

    modal.innerHTML = `
      <div class="ml-modal-shell">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-brief-pill" style="--world-color:${w.color}; --world-soft:${w.bgSoft}; --world-border:${w.borderSoft};">
            🧠 Feynman Active-Recall Check · ${n.icon} ${escapeHtml(n.title)}
          </div>
          <div style="display:flex; gap:6px;">
            <button type="button" class="ml-btn-mini" id="pr-feyn-open-lesson">📖 Review Lesson</button>
          </div>
        </div>
        <div class="ml-brief-body pr-feynman-body">
          <div class="pr-feynman-prompt-box">
            <div class="ml-bento-eyebrow">EXPLAIN IT LIKE I'M 12 (NO PEEKING)</div>
            <h3 style="margin:4px 0 6px;">How does <strong>${escapeHtml(n.title)}</strong> work in plain English?</h3>
            <p class="ml-viz-sub" style="margin:0;">Write 2–4 simple sentences explaining the core mechanism <em>why</em> it works, plus a quick 1-line example. Graded 100% offline against the lesson's key concept anchors.</p>
          </div>

          <textarea id="pr-feyn-ta" class="pr-vault-ta pr-feynman-ta" rows="5" placeholder="Example: Imagine... it works because... for example...">${escapeHtml(session.feynmanText || "")}</textarea>

          <div class="pr-feynman-actions">
            <button type="button" class="ml-btn-primary" id="pr-feyn-grade-btn">Grade My Explanation →</button>
            <button type="button" class="ml-btn-secondary" id="pr-feyn-peek-btn">${session.feynmanPeek ? "Hide Cheat Code" : "👁️ Peek Cheat Code"}</button>
            <span class="ml-viz-sub" id="pr-feyn-wc">${(session.feynmanText || "").trim() ? (session.feynmanText || "").trim().split(/\s+/).length : 0} words</span>
          </div>

          ${session.feynmanPeek ? `
            <div class="ml-cheat-code-strip" style="margin-top:10px;">
              <strong>⚡ Reference Truth:</strong> ${fmtMath(n.easyTruth || n.cheatCode)}
            </div>
          ` : ""}

          ${res ? `
            <div class="pr-feynman-result ${res.passed ? "passed" : "growing"}">
              <div class="pr-feynman-score-row">
                <div>
                  <div class="ml-bento-eyebrow">${escapeHtml(res.grade)}</div>
                  <strong>${res.score}% Clarity Score</strong>
                </div>
                <span class="ml-mini-tag">${res.hasExample ? "✓ Example/Analogy detected" : "Tip: Add a 1-line example (+12%)"}</span>
              </div>
              <p style="margin:6px 0 10px;">${escapeHtml(res.feedback)}</p>
              <div class="pr-feynman-anchors">
                ${res.matched.map((m) => `<span class="pr-feyn-chip hit">✓ ${escapeHtml(m)}</span>`).join("")}
                ${res.missing.map((m) => `<span class="pr-feyn-chip miss">○ ${escapeHtml(m)}</span>`).join("")}
              </div>
              <div class="pr-feynman-save-row">
                <button type="button" class="ml-btn-primary" id="pr-feyn-save-btn">Save to My Vault &amp; Claim +30 XP</button>
                <button type="button" class="ml-btn-mini" id="pr-feyn-drill-btn">⚡ Test with 5Q Drill</button>
              </div>
              ${session.feynmanSavedNotice ? `<div class="pr-feynman-saved">${escapeHtml(session.feynmanSavedNotice)}</div>` : ""}
            </div>
          ` : `
            <div class="pr-feynman-hint-foot">
              Checking against ${anchors.length} hidden conceptual anchors + example/analogy signal.
            </div>
          `}
        </div>
      </div>
    `;

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);
    const openLesBtn = document.getElementById("pr-feyn-open-lesson");
    if (openLesBtn) {
      openLesBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startNodeSession(n.id, "lesson", true);
      });
    }
    const ta = document.getElementById("pr-feyn-ta");
    const wc = document.getElementById("pr-feyn-wc");
    if (ta) {
      ta.addEventListener("input", () => {
        session.feynmanText = ta.value;
        if (wc) {
          const words = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
          wc.textContent = `${words} word${words === 1 ? "" : "s"}`;
        }
      });
      if (isFinePointer()) ta.focus();
    }
    const gradeBtn = document.getElementById("pr-feyn-grade-btn");
    if (gradeBtn) {
      gradeBtn.addEventListener("click", () => {
        AudioFX.playTap();
        session.feynmanResult = EDGE.evaluateFeynman(n, session.feynmanText || "");
        session.feynmanSavedNotice = "";
        if (session.feynmanResult.passed) AudioFX.playCorrect();
        renderFeynmanModal(modal);
      });
    }
    const peekBtn = document.getElementById("pr-feyn-peek-btn");
    if (peekBtn) {
      peekBtn.addEventListener("click", () => {
        AudioFX.playTap();
        session.feynmanPeek = !session.feynmanPeek;
        renderFeynmanModal(modal);
      });
    }
    const saveBtn = document.getElementById("pr-feyn-save-btn");
    if (saveBtn && res) {
      saveBtn.addEventListener("click", () => {
        const firstTime = !(state.feynmanVerified && state.feynmanVerified[n.id]);
        EDGE.saveFeynmanCheck(state, n, session.feynmanText || "", res, MY_VAULT);
        if (firstTime || res.passed) {
          state.xp += firstTime ? 30 : 10;
          recordStudyActivity(1);
        }
        markDailyStep("learn");
        saveState();
        renderTopBar();
        AudioFX.playLevelUp();
        session.feynmanSavedNotice = `✓ Saved to My Vault Notes (${res.score}% clarity)${firstTime ? " · +30 XP awarded!" : " · +10 XP!"}`;
        renderFeynmanModal(modal);
      });
    }
    const drillBtn = document.getElementById("pr-feyn-drill-btn");
    if (drillBtn) {
      drillBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startNodeSession(n.id, "drill", true);
      });
    }
  }

  function startNodeSession(nodeId, mode, bypassLock) {
    const node = DATA.NODES.find((n) => n.id === nodeId);
    if (!node) return;

    if (!bypassLock) {
      const uInfo = getUnlockInfo(nodeId);
      if (uInfo.locked) {
        openPrereqModal(nodeId);
        return;
      }
    }

    const questions = mode === "drill"
      ? Array.from({ length: 5 }, () => Object.assign({ isRetry: false }, DATA.generateProceduralQuestion(nodeId)))
      : node.questions.map((q) => Object.assign({ isRetry: false }, q));

    session = {
      node,
      mode, // "lesson" | "drill" | "repair" | "skip" | "prereq_testout"
      worldToSkip: null,
      phase: mode === "drill" ? "quiz" : "briefing",
      briefSlideIdx: 0,
      workedStepsShown: 1,
      briefAllView: false,
      questions,
      originalCount: questions.length,
      firstTryCorrect: 0,
      idx: 0,
      correctCount: 0,
      combo: 0,
      maxCombo: 0,
      xpEarned: 0,
      gemsEarned: 0,
      selectedOpt: null,
      checked: false,
      isCorrect: false,
      lastFlash: null,
      showHint: false,
      questionStart: Date.now()
    };

    renderModal();
  }

  function startMistakeRepairSession() {
    const list = (state.mistakes || []).slice(0, 6);
    if (list.length === 0) return;

    session = {
      node: { id: "crack-repair", worldId: "junior", title: "Crack Repair Lab", icon: "🛠️" },
      mode: "repair",
      worldToSkip: null,
      phase: "quiz",
      questions: list.map((m) => Object.assign({ isRetry: false, mistakeKey: m.key }, m)),
      originalCount: list.length,
      firstTryCorrect: 0,
      idx: 0,
      correctCount: 0,
      combo: 0,
      maxCombo: 0,
      xpEarned: 0,
      gemsEarned: 0,
      selectedOpt: null,
      checked: false,
      isCorrect: false,
      lastFlash: null,
      showHint: false,
      questionStart: Date.now()
    };
    renderModal();
  }

  function startSrsReviewSession() {
    const analysis = TUTOR ? TUTOR.analyzeLearner(state, DATA) : null;
    const dueReports = analysis && analysis.decayingNodes && analysis.decayingNodes.length
      ? analysis.decayingNodes
      : DATA.NODES.slice(0, 6).map((node) => ({ node }));
    const qs = dueReports.slice(0, 8).map((r) => {
      const q = DATA.generateProceduralQuestion(r.node.id);
      return Object.assign({ isRetry: false, sourceNodeId: r.node.id }, q);
    });
    session = {
      node: { id: "srs-review", worldId: "srs", title: `SM-2 Daily Review (${qs.length} Due Skills)`, icon: "🧠" },
      mode: "srs_review",
      phase: "quiz",
      questions: qs,
      originalCount: qs.length,
      firstTryCorrect: 0,
      idx: 0,
      correctCount: 0,
      combo: 0,
      maxCombo: 0,
      xpEarned: 0,
      gemsEarned: 0,
      selectedOpt: null,
      checked: false,
      isCorrect: false,
      lastFlash: null,
      showHint: false,
      questionStart: Date.now()
    };
    renderModal();
  }

  function startEraSkipSession(worldId) {
    const world = getWorld(worldId);
    const eraNodes = DATA.NODES.filter((n) => n.worldId === worldId);
    // Stratified sampling across the ENTIRE world (early, middle, and final advanced skills!)
    const targetCount = Math.min(eraNodes.length, Math.max(5, Math.min(10, Math.ceil(eraNodes.length * 0.45))));
    const sampledNodes = [];
    if (eraNodes.length <= targetCount) {
      sampledNodes.push(...eraNodes);
    } else {
      for (let i = 0; i < targetCount; i++) {
        const idx = Math.min(eraNodes.length - 1, Math.round((i * (eraNodes.length - 1)) / (targetCount - 1)));
        if (!sampledNodes.includes(eraNodes[idx])) sampledNodes.push(eraNodes[idx]);
      }
    }
    const qs = sampledNodes.map((n) => {
      const q = n.questions[n.questions.length - 1] || n.questions[0];
      return Object.assign({ isRetry: false, sourceNodeId: n.id }, q);
    });

    session = {
      node: { id: "skip-" + worldId, worldId, title: `Full-World Skip Check (${qs.length}Q): ${world.title}`, icon: "⏭️" },
      mode: "skip",
      worldToSkip: worldId,
      phase: "quiz",
      questions: qs,
      originalCount: qs.length,
      firstTryCorrect: 0,
      idx: 0,
      correctCount: 0,
      combo: 0,
      maxCombo: 0,
      xpEarned: 0,
      gemsEarned: 0,
      selectedOpt: null,
      checked: false,
      isCorrect: false,
      lastFlash: null,
      showHint: false,
      questionStart: Date.now()
    };
    renderModal();
  }

  function closeSession() {
    session = null;
    const modal = document.getElementById("ml-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.innerHTML = "";
    }
    renderApp();
  }

  function encodeSaveCode(obj) {
    try {
      return window.btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
    } catch (_e) {
      return JSON.stringify(obj);
    }
  }

  function decodeSaveCode(raw) {
    const txt = String(raw || "").trim();
    if (!txt) throw new Error("Empty backup text.");
    const json = txt.startsWith("{") ? txt : decodeURIComponent(escape(window.atob(txt)));
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") throw new Error("Invalid backup object.");
    return parsed;
  }

  function bytesToBase64Url(bytes) {
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return window.btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function base64UrlToBytes(b64url) {
    let b64 = String(b64url || "").replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = window.atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  async function compressSavePayload(obj) {
    const json = JSON.stringify(obj);
    if (typeof CompressionStream === "function" && typeof TextEncoder === "function") {
      try {
        const stream = new Blob([new TextEncoder().encode(json)]).stream().pipeThrough(new CompressionStream("gzip"));
        const buf = await new Response(stream).arrayBuffer();
        return "p1z." + bytesToBase64Url(new Uint8Array(buf));
      } catch (_e) {}
    }
    return encodeSaveCode(obj);
  }

  async function decompressSavePayload(rawInput) {
    let txt = String(rawInput || "").trim();
    if (!txt) throw new Error("Empty backup or sync link.");
    const hashIdx = txt.indexOf("#primer-sync=");
    if (hashIdx >= 0) {
      txt = txt.slice(hashIdx + "#primer-sync=".length).trim();
    } else if (txt.startsWith("primer-sync=")) {
      txt = txt.slice("primer-sync=".length).trim();
    }
    if (txt.startsWith("p1z.")) {
      if (typeof DecompressionStream !== "function") {
        throw new Error("This browser does not support gzip sync links — use a .json backup file instead.");
      }
      const bytes = base64UrlToBytes(txt.slice(4));
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
      const json = await new Response(stream).text();
      const parsed = JSON.parse(json);
      if (!parsed || typeof parsed !== "object") throw new Error("Invalid compressed sync payload.");
      return parsed;
    }
    return decodeSaveCode(txt);
  }

  function mergeNumericMapMax(a, b) {
    const out = Object.assign({}, a || {});
    for (const [k, v] of Object.entries(b || {})) {
      const nv = Number(v) || 0;
      out[k] = Math.max(Number(out[k]) || 0, nv);
    }
    return out;
  }

  function mergeTruthyMap(a, b) {
    const out = Object.assign({}, a || {});
    for (const [k, v] of Object.entries(b || {})) {
      if (v && !out[k]) out[k] = v;
      else if (v && typeof v === "object" && out[k] && typeof out[k] === "object") {
        const ta = Number(out[k].solvedAt || out[k].updatedAt || 0);
        const tb = Number(v.solvedAt || v.updatedAt || 0);
        if (tb >= ta) out[k] = Object.assign({}, out[k], v);
      }
    }
    return out;
  }

  function mergeUniqueStrings(a, b) {
    const set = new Set();
    const out = [];
    for (const item of [...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])]) {
      if (typeof item === "string" && !set.has(item)) {
        set.add(item);
        out.push(item);
      }
    }
    return out;
  }

  function mergeImportedState(baseState, incomingState) {
    const base = Object.assign({}, defaultState, baseState || {});
    const inc = incomingState && typeof incomingState === "object" ? incomingState : {};
    const merged = Object.assign({}, base);

    merged.xp = Math.max(Number(base.xp) || 0, Number(inc.xp) || 0);
    merged.gems = Math.max(Number(base.gems) || 0, Number(inc.gems) || 0);
    merged.dailyStreak = Math.max(Number(base.dailyStreak) || 1, Number(inc.dailyStreak) || 1);
    merged.streak = Math.max(Number(base.streak) || 1, Number(inc.streak) || 1, merged.dailyStreak);
    merged.streakFreezes = Math.max(Number(base.streakFreezes) || 0, Number(inc.streakFreezes) || 0);
    merged.bestCombo = Math.max(Number(base.bestCombo) || 0, Number(inc.bestCombo) || 0);
    merged.resolvedMistakesCount = Math.max(Number(base.resolvedMistakesCount) || 0, Number(inc.resolvedMistakesCount) || 0);
    merged.focusMinutesTotal = Math.max(Number(base.focusMinutesTotal) || 0, Number(inc.focusMinutesTotal) || 0);

    if (inc.lastStudiedDate && (!base.lastStudiedDate || String(inc.lastStudiedDate) > String(base.lastStudiedDate))) {
      merged.lastStudiedDate = inc.lastStudiedDate;
    }

    merged.studyLog = mergeNumericMapMax(base.studyLog, inc.studyLog);
    merged.focusLog = mergeNumericMapMax(base.focusLog, inc.focusLog);
    merged.nodeMastery = mergeNumericMapMax(base.nodeMastery, inc.nodeMastery);
    merged.multMastered = mergeNumericMapMax(base.multMastered, inc.multMastered);
    merged.gymBest = mergeNumericMapMax(base.gymBest, inc.gymBest);

    merged.trapBusted = mergeTruthyMap(base.trapBusted, inc.trapBusted);
    merged.synthSolved = mergeTruthyMap(base.synthSolved, inc.synthSolved);
    merged.derivationsSolved = mergeTruthyMap(base.derivationsSolved, inc.derivationsSolved);
    merged.forgeSolved = mergeTruthyMap(base.forgeSolved, inc.forgeSolved);

    // Daily checklist union per date
    const mergedDaily = {};
    for (const src of [base.dailyChecklist, inc.dailyChecklist]) {
      if (!src || typeof src !== "object") continue;
      for (const [day, obj] of Object.entries(src)) {
        if (!obj || typeof obj !== "object") continue;
        mergedDaily[day] = Object.assign({}, mergedDaily[day] || {}, {
          recall: Boolean((mergedDaily[day] && mergedDaily[day].recall) || obj.recall),
          learn: Boolean((mergedDaily[day] && mergedDaily[day].learn) || obj.learn),
          sprint: Boolean((mergedDaily[day] && mergedDaily[day].sprint) || obj.sprint)
        });
      }
    }
    merged.dailyChecklist = mergedDaily;

    // Code Studio drafts: keep non-empty, prefer longer/non-blank if one side missing
    const mergedCode = Object.assign({}, base.forgeCode || {});
    for (const [k, v] of Object.entries(inc.forgeCode || {})) {
      if (typeof v === "string" && v.trim() && (!mergedCode[k] || !String(mergedCode[k]).trim())) {
        mergedCode[k] = v;
      }
    }
    merged.forgeCode = mergedCode;

    merged.badges = mergeUniqueStrings(base.badges, inc.badges);
    merged.ownedThemes = mergeUniqueStrings(base.ownedThemes, inc.ownedThemes);
    merged.ownedAccessories = mergeUniqueStrings(base.ownedAccessories, inc.ownedAccessories);
    merged.userBookmarks = mergeUniqueStrings(base.userBookmarks, inc.userBookmarks);

    // Notes: keep newest updatedAt per key
    const notes = Object.assign({}, base.userNotes || {});
    for (const [k, v] of Object.entries(inc.userNotes || {})) {
      if (!v || typeof v !== "object") continue;
      const cur = notes[k];
      if (!cur || (Number(v.updatedAt) || 0) > (Number(cur.updatedAt) || 0) || ((Number(v.updatedAt) || 0) === (Number(cur.updatedAt) || 0) && String(v.text || "").length > String(cur.text || "").length)) {
        notes[k] = Object.assign({}, v);
      }
    }
    merged.userNotes = notes;

    // Decks & SM-2 cards: union by deck id, merge cards by id (prefer higher reps / later dueAt)
    const deckMap = new Map();
    for (const d of (Array.isArray(base.userDecks) ? base.userDecks : [])) {
      if (d && d.id) deckMap.set(d.id, Object.assign({}, d, { cards: Array.isArray(d.cards) ? d.cards.map((c) => Object.assign({}, c)) : [] }));
    }
    for (const d of (Array.isArray(inc.userDecks) ? inc.userDecks : [])) {
      if (!d || !d.id) continue;
      if (!deckMap.has(d.id)) {
        deckMap.set(d.id, Object.assign({}, d, { cards: Array.isArray(d.cards) ? d.cards.map((c) => Object.assign({}, c)) : [] }));
      } else {
        const target = deckMap.get(d.id);
        const cardMap = new Map(target.cards.map((c) => [c.id, c]));
        const frontSet = new Set(target.cards.map((c) => String(c.front || "").trim().toLowerCase()));
        for (const c of (Array.isArray(d.cards) ? d.cards : [])) {
          if (!c) continue;
          if (c.id && cardMap.has(c.id)) {
            const ex = cardMap.get(c.id);
            if ((Number(c.reps) || 0) > (Number(ex.reps) || 0) || ((Number(c.reps) || 0) === (Number(ex.reps) || 0) && (Number(c.dueAt) || 0) > (Number(ex.dueAt) || 0))) {
              cardMap.set(c.id, Object.assign({}, c));
            }
          } else {
            const fk = String(c.front || "").trim().toLowerCase();
            if (!fk || !frontSet.has(fk)) {
              if (fk) frontSet.add(fk);
              cardMap.set(c.id || `m_${cardMap.size}`, Object.assign({}, c));
            }
          }
        }
        target.cards = Array.from(cardMap.values());
      }
    }
    merged.userDecks = Array.from(deckMap.values());

    // Exam history: dedupe by id or finishedAt + examId
    const exMap = new Map();
    for (const h of [...(Array.isArray(base.examHistory) ? base.examHistory : []), ...(Array.isArray(inc.examHistory) ? inc.examHistory : [])]) {
      if (!h) continue;
      const key = h.id || `${h.examId || ""}_${h.finishedAt || h.date || ""}_${h.rawPct || ""}`;
      if (!exMap.has(key)) exMap.set(key, h);
    }
    merged.examHistory = Array.from(exMap.values()).sort((x, y) => (Number(y.finishedAt) || 0) - (Number(x.finishedAt) || 0)).slice(0, 60);

    // Mistakes: dedupe by nodeId + prompt
    const misMap = new Map();
    for (const m of [...(Array.isArray(base.mistakes) ? base.mistakes : []), ...(Array.isArray(inc.mistakes) ? inc.mistakes : [])]) {
      if (!m) continue;
      const key = `${m.nodeId || ""}::${m.q && m.q.prompt ? m.q.prompt : m.prompt || ""}`;
      if (!misMap.has(key)) misMap.set(key, m);
    }
    merged.mistakes = Array.from(misMap.values()).slice(0, 80);

    // Smart Tutor telemetry skills merge
    if (base.telemetry || inc.telemetry) {
      const bt = base.telemetry || {};
      const it = inc.telemetry || {};
      const skills = Object.assign({}, bt.skills || {});
      for (const [sid, sk] of Object.entries(it.skills || {})) {
        const cur = skills[sid];
        if (!cur || (Number(sk.lastSeen) || 0) > (Number(cur.lastSeen) || 0) || (Number(sk.attempts) || 0) > (Number(cur.attempts) || 0)) {
          skills[sid] = Object.assign({}, sk);
        }
      }
      merged.telemetry = Object.assign({}, bt, it, {
        eloRating: Math.max(Number(bt.eloRating) || 1000, Number(it.eloRating) || 1000),
        skills
      });
    }

    if (EDGE && typeof EDGE.mergeEdgeState === "function") {
      Object.assign(merged, EDGE.mergeEdgeState(base, inc));
    }
    if (ONBOARDING && typeof ONBOARDING.mergeStudioConfig === "function") {
      Object.assign(merged, ONBOARDING.mergeStudioConfig(base, inc));
    }

    return merged;
  }

  function applyImportedState(parsed, mode) {
    if (mode === "merge") {
      state = mergeImportedState(state, parsed);
    } else {
      state = Object.assign({}, defaultState, parsed);
    }
    if (TUTOR) TUTOR.ensureTelemetry(state);
    if (EDGE) EDGE.ensureEdgeState(state);
    if (ONBOARDING) ONBOARDING.ensureStudioConfig(state);
    applyThemeClass();
    saveState();
  }

  function summarizeProfile(obj) {
    const o = obj || {};
    const mastered = Object.values(o.nodeMastery || {}).filter((v) => v >= 1).length;
    const decks = Array.isArray(o.userDecks) ? o.userDecks.length : 0;
    const notes = o.userNotes && typeof o.userNotes === "object" ? Object.keys(o.userNotes).length : 0;
    const exams = Array.isArray(o.examHistory) ? o.examHistory.length : 0;
    const work = o.derivationsSolved && typeof o.derivationsSolved === "object" ? Object.keys(o.derivationsSolved).length : 0;
    return {
      xp: Number(o.xp) || 0,
      mastered,
      decks,
      notes,
      exams,
      work
    };
  }

  function renderBackupModal(modal) {
    const code = encodeSaveCode(state);
    const multDone = Object.values(state.multMastered || {}).filter((v) => v >= 2).length;
    const eloNow = state.telemetry && state.telemetry.eloRating ? state.telemetry.eloRating : 1000;
    const stats = getOverallStats();
    const pendingImport = session.pendingImport || null;
    const incSum = pendingImport ? summarizeProfile(pendingImport) : null;

    modal.innerHTML = `
      <div class="ml-modal-shell">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-brief-pill">💾 Local Backup &amp; Offline Device Sync</div>
        </div>

        <div class="ml-backup-box">
          ${!storageAvailable ? `
            <div class="ml-trap-feedback nope" style="display:block; margin-bottom:12px;">
              <strong>⚠️ Browser LocalStorage is blocked or Private/Incognito here!</strong> Download a JSON backup or copy your Sync Link before closing this tab.
            </div>
          ` : ""}

          <div class="ml-easy-box" style="margin-bottom:14px;">
            <strong>This Device:</strong> ${state.xp} XP • ${stats.masteredCount}/${stats.totalNodes} Skills • ${multDone}/78 × Facts • ${eloNow} Elo • ${(state.userDecks || []).length} Decks • ${Object.keys(state.userNotes || {}).length} Notes • ${(state.examHistory || []).length} Exams<br />
            <span style="font-size:12px; color:var(--ml-ink-muted);">Running <strong>Primer Studio v${escapeHtml(BUILD.version)}</strong> (${escapeHtml(BUILD.codename)}) · Build <code>#${escapeHtml(BUILD.buildHash || "dev")}</code> · 100% Offline &amp; Local</span>
          </div>

          ${pendingImport ? `
            <div class="ml-sync-preview-card">
              <div class="ml-bento-eyebrow">FILE / LINK READY TO IMPORT</div>
              <div class="ml-sync-compare-row">
                <div><strong>This Device:</strong> ${state.xp} XP · ${stats.masteredCount} skills · ${(state.userDecks || []).length} decks · ${Object.keys(state.userNotes || {}).length} notes</div>
                <div><strong>Incoming:</strong> ${incSum.xp} XP · ${incSum.mastered} skills · ${incSum.decks} decks · ${incSum.notes} notes · ${incSum.exams} exams</div>
              </div>
              <div class="ml-sync-preview-actions">
                <button type="button" class="ml-btn-primary" id="ml-bk-pending-merge">✨ Smart Merge (Keep Both Devices)</button>
                <button type="button" class="ml-btn-danger" id="ml-bk-pending-replace">♻️ Replace Local With Incoming</button>
                <button type="button" class="ml-btn-mini" id="ml-bk-pending-cancel">Cancel</button>
              </div>
            </div>
          ` : ""}

          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
            <button type="button" class="ml-btn-primary" id="ml-bk-synclink">🔗 Copy Instant Sync Link</button>
            <button type="button" class="ml-btn-secondary" id="ml-bk-download">📥 Download .json</button>
            <label class="ml-btn-secondary" style="cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
              📤 Import .json File
              <input type="file" id="ml-bk-file" accept=".json,application/json" style="display:none;" />
            </label>
            <button type="button" class="ml-btn-secondary" id="ml-bk-copy">📋 Copy Save Code</button>
          </div>

          <div class="ml-sync-lan-tip">
            <strong>Home Wi-Fi Phone Sync (Zero Accounts):</strong> Run <code>./launch_primer.sh --lan</code> on your PC, open the LAN URL on your phone, then send yourself an <strong>Instant Sync Link</strong> (or <code>.json</code> file) and choose <strong>Smart Merge</strong> so neither device loses progress.
          </div>

          <div class="ml-micro-label" style="margin:12px 0 6px;">Portable Save Code or Sync Link (paste from another device below):</div>
          <textarea id="ml-bk-textarea" class="ml-search-input" rows="4" style="width:100%; min-width:0; font-family:monospace; font-size:12px; padding:10px;">${escapeHtml(session.compactCode || code)}</textarea>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:12px;">
            <div style="font-size:13px;">${session.statusMsg ? escapeHtml(session.statusMsg) : "Smart Merge combines skills, decks, notes &amp; streaks from both devices safely."}</div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button type="button" class="ml-btn-secondary" id="ml-bk-reset">${session.confirmReset ? "⚠️ Click Again to Confirm FULL Reset" : "🗑️ Reset"}</button>
              <button type="button" class="ml-btn-primary" id="ml-bk-merge">✨ Smart Merge</button>
              <button type="button" class="ml-btn-danger" id="ml-bk-restore">♻️ Replace</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);

    const pendingMergeBtn = document.getElementById("ml-bk-pending-merge");
    if (pendingMergeBtn && pendingImport) {
      pendingMergeBtn.addEventListener("click", () => {
        applyImportedState(pendingImport, "merge");
        AudioFX.playLevelUp();
        closeSession();
      });
    }
    const pendingReplaceBtn = document.getElementById("ml-bk-pending-replace");
    if (pendingReplaceBtn && pendingImport) {
      pendingReplaceBtn.addEventListener("click", () => {
        applyImportedState(pendingImport, "replace");
        AudioFX.playLevelUp();
        closeSession();
      });
    }
    const pendingCancelBtn = document.getElementById("ml-bk-pending-cancel");
    if (pendingCancelBtn) {
      pendingCancelBtn.addEventListener("click", () => {
        session.pendingImport = null;
        session.statusMsg = "Import cancelled.";
        renderBackupModal(modal);
      });
    }

    document.getElementById("ml-bk-synclink").addEventListener("click", async () => {
      AudioFX.playTap();
      try {
        const packed = await compressSavePayload(state);
        const baseUrl = window.location.protocol === "file:"
          ? window.location.href.split("#")[0]
          : `${window.location.origin}${window.location.pathname}`;
        const syncUrl = `${baseUrl}#primer-sync=${packed}`;
        session.compactCode = packed;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(syncUrl).catch(() => {});
        }
        AudioFX.playCorrect();
        session.statusMsg = `✅ Copied compressed Sync Link (${packed.length} chars)! Open it on your phone/other browser to Smart Merge.`;
        renderBackupModal(modal);
      } catch (err) {
        session.statusMsg = "⚠️ Could not build Sync Link: " + err.message;
        renderBackupModal(modal);
      }
    });

    document.getElementById("ml-bk-download").addEventListener("click", () => {
      AudioFX.playTap();
      try {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `primer_backup_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        session.statusMsg = "✅ Downloaded Primer backup JSON (includes decks, notes & bookmarks)!";
        renderBackupModal(modal);
      } catch (_e) {
        session.statusMsg = "⚠️ Download blocked by viewer — use Copy Save Code instead!";
        renderBackupModal(modal);
      }
    });

    document.getElementById("ml-bk-copy").addEventListener("click", async () => {
      const packed = await compressSavePayload(state).catch(() => code);
      session.compactCode = packed;
      const ta = document.getElementById("ml-bk-textarea");
      if (ta) ta.value = packed;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(packed).catch(() => {});
      } else if (ta) {
        ta.select();
        try { document.execCommand("copy"); } catch (_e) {}
      }
      AudioFX.playCorrect();
      session.statusMsg = `✅ Copied compact Save Code (${packed.length} chars) to clipboard!`;
      renderBackupModal(modal);
    });

    document.getElementById("ml-bk-file").addEventListener("change", (ev) => {
      const file = ev.target.files && ev.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const parsed = await decompressSavePayload(reader.result);
          session.pendingImport = parsed;
          session.statusMsg = `Loaded "${file.name}" — choose Smart Merge (keep both) or Replace above.`;
          AudioFX.playCorrect();
          renderBackupModal(modal);
        } catch (err) {
          session.statusMsg = "❌ Could not parse file: " + err.message;
          renderBackupModal(modal);
        }
      };
      reader.readAsText(file);
    });

    document.getElementById("ml-bk-reset").addEventListener("click", () => {
      if (!session.confirmReset) {
        AudioFX.playTap();
        session.confirmReset = true;
        session.statusMsg = "⚠️ Are you sure? Click 'Confirm FULL Reset' again to wipe XP, mastery, streak & telemetry.";
        renderBackupModal(modal);
        return;
      }
      state = Object.assign({}, defaultState, {
        studyLog: {}, nodeMastery: {}, multMastered: {}, trapBusted: {}, synthSolved: {},
        mistakes: [], gymBest: {}, badges: [], ownedThemes: ["noir", "carbon", "kyoto", "monochrome"],
        ownedAccessories: ["none", "mortarboard", "goggles", "monocle"], userBookmarks: [], userNotes: {},
        userDecks: [], derivationsSolved: {}, examHistory: [], forgeSolved: {}, forgeCode: {},
        dailyChecklist: {}, focusLog: {}, focusMinutesTotal: 0,
        onboardingCompleted: false, studioConfig: null,
        confidenceLog: { sureRight: 0, sureWrong: 0, halfRight: 0, halfWrong: 0, guessRight: 0, guessWrong: 0, illusions: [], luckyHits: [] },
        feynmanVerified: {}, examTarget: { goalId: "auto", label: "", dateIso: "" },
        edgeStats: { interleaveRuns: 0, interleaveBestPct: 0, interleaveMedianSec: null, feynmanCount: 0 }
      });
      if (TUTOR) TUTOR.ensureTelemetry(state);
      if (EDGE) EDGE.ensureEdgeState(state);
      if (ONBOARDING) ONBOARDING.ensureStudioConfig(state);
      applyThemeClass();
      saveState();
      AudioFX.playTap();
      closeSession();
      if (ONBOARDING) openStudioIntro("hero", true);
    });

    document.getElementById("ml-bk-merge").addEventListener("click", async () => {
      const ta = document.getElementById("ml-bk-textarea");
      try {
        const parsed = await decompressSavePayload(ta ? ta.value : "");
        applyImportedState(parsed, "merge");
        AudioFX.playLevelUp();
        closeSession();
      } catch (err) {
        AudioFX.playWrong();
        session.statusMsg = "❌ Invalid Save Code / Sync Link: " + err.message;
        renderBackupModal(modal);
      }
    });

    document.getElementById("ml-bk-restore").addEventListener("click", async () => {
      const ta = document.getElementById("ml-bk-textarea");
      try {
        const parsed = await decompressSavePayload(ta ? ta.value : "");
        applyImportedState(parsed, "replace");
        AudioFX.playLevelUp();
        closeSession();
      } catch (err) {
        AudioFX.playWrong();
        session.statusMsg = "❌ Invalid Save Code / Sync Link: " + err.message;
        renderBackupModal(modal);
      }
    });
  }

  function renderSyncIncomingModal(modal) {
    const incoming = session && session.incomingState ? session.incomingState : null;
    if (!incoming) {
      closeSession();
      return;
    }
    const loc = summarizeProfile(state);
    const inc = summarizeProfile(incoming);
    const previewMerged = summarizeProfile(mergeImportedState(state, incoming));

    modal.innerHTML = `
      <div class="ml-modal-shell">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-brief-pill">🔗 Incoming Local Sync Link</div>
        </div>
        <div class="ml-backup-box">
          <h3 style="margin:0 0 8px;">Sync Progress From Your Other Device</h3>
          <p class="ml-viz-sub" style="margin:0 0 14px;">Everything stays 100% local in your browser. Choose <strong>Smart Merge</strong> to keep the best progress, notes &amp; decks from both devices.</p>

          <div class="ml-sync-grid">
            <div class="ml-sync-col">
              <div class="ml-bento-eyebrow">THIS DEVICE</div>
              <ul>
                <li><strong>${loc.xp}</strong> XP</li>
                <li><strong>${loc.mastered}</strong> Skills mastered</li>
                <li><strong>${loc.decks}</strong> Vault decks · <strong>${loc.notes}</strong> notes</li>
                <li><strong>${loc.exams}</strong> Exam runs · <strong>${loc.work}</strong> proofs</li>
              </ul>
            </div>
            <div class="ml-sync-col">
              <div class="ml-bento-eyebrow">INCOMING LINK</div>
              <ul>
                <li><strong>${inc.xp}</strong> XP</li>
                <li><strong>${inc.mastered}</strong> Skills mastered</li>
                <li><strong>${inc.decks}</strong> Vault decks · <strong>${inc.notes}</strong> notes</li>
                <li><strong>${inc.exams}</strong> Exam runs · <strong>${inc.work}</strong> proofs</li>
              </ul>
            </div>
            <div class="ml-sync-col is-merged">
              <div class="ml-bento-eyebrow">AFTER SMART MERGE</div>
              <ul>
                <li><strong>${previewMerged.xp}</strong> XP</li>
                <li><strong>${previewMerged.mastered}</strong> Skills mastered</li>
                <li><strong>${previewMerged.decks}</strong> Vault decks · <strong>${previewMerged.notes}</strong> notes</li>
                <li><strong>${previewMerged.exams}</strong> Exam runs · <strong>${previewMerged.work}</strong> proofs</li>
              </ul>
            </div>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:flex-end; margin-top:16px;">
            <button type="button" class="ml-btn-secondary" id="ml-sync-cancel">Dismiss</button>
            <button type="button" class="ml-btn-danger" id="ml-sync-replace">♻️ Replace Local</button>
            <button type="button" class="ml-btn-primary" id="ml-sync-merge">✨ Smart Merge (Recommended)</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);
    document.getElementById("ml-sync-cancel").addEventListener("click", closeSession);
    document.getElementById("ml-sync-merge").addEventListener("click", () => {
      applyImportedState(incoming, "merge");
      AudioFX.playLevelUp();
      launchConfetti();
      closeSession();
    });
    document.getElementById("ml-sync-replace").addEventListener("click", () => {
      applyImportedState(incoming, "replace");
      AudioFX.playLevelUp();
      closeSession();
    });
  }

  function checkIncomingSyncHash() {
    if (typeof window === "undefined" || !window.location || !window.location.hash) return;
    const h = window.location.hash;
    if (!h.startsWith("#primer-sync=")) return;
    const raw = h.slice("#primer-sync=".length);
    try {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    } catch (_e) {}
    decompressSavePayload(raw)
      .then((parsed) => {
        session = { mode: "sync_incoming", phase: "sync_incoming", incomingState: parsed };
        renderModal();
      })
      .catch(() => {});
  }

  function renderShopModal(modal) {
    const ownedThemes = Array.isArray(state.ownedThemes) ? state.ownedThemes : ["noir"];
    const ownedAcc = Array.isArray(state.ownedAccessories) ? state.ownedAccessories : ["none"];
    modal.innerHTML = `
      <div class="ml-modal-shell">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-brief-pill">◆ Studio Shop · Balance: <strong>${state.gems} ◆</strong></div>
        </div>
        <div class="ml-brief-body">
          ${session.statusMsg ? `<div class="ml-easy-box" style="margin-bottom:12px;">${escapeHtml(session.statusMsg)}</div>` : ""}

          <div class="ml-micro-label" style="margin-bottom:8px;">Consumables & Protections</div>
          <div class="ml-shop-grid" style="margin-bottom:16px;">
            <div class="ml-shop-card">
              <strong>Refill 5/5 Hearts</strong>
              <p class="ml-viz-sub">Current: ${state.hearts}/5 Hearts (for Hearts Mode).</p>
              <button type="button" class="ml-btn-primary" data-shop-buy="hearts" ${state.hearts >= 5 || state.gems < 30 ? "disabled" : ""}>${state.hearts >= 5 ? "Hearts Full" : "Buy · 30 ◆"}</button>
            </div>
            <div class="ml-shop-card">
              <strong>Streak Freeze</strong>
              <p class="ml-viz-sub">Protects your daily streak if you miss 1 day (Owned: ${state.streakFreezes || 0}).</p>
              <button type="button" class="ml-btn-primary" data-shop-buy="freeze" ${state.gems < 60 ? "disabled" : ""}>Buy · 60 ◆</button>
            </div>
          </div>

          <div class="ml-micro-label" style="margin-bottom:8px;">Pitch-Black Accent Palettes</div>
          <div class="ml-shop-grid" style="margin-bottom:16px;">
            ${Object.entries(STUDIO_THEMES).map(([key, th]) => {
              const owned = ownedThemes.includes(key);
              const active = (state.paperTheme || "noir") === key;
              return `
                <div class="ml-shop-card ${active ? "active" : ""}">
                  <div class="ml-shop-swatch-row">
                    <span class="ml-shop-swatch" style="background:${th.swatch};"></span>
                    <strong>${th.label}</strong>
                  </div>
                  <p class="ml-viz-sub">${th.desc}</p>
                  <button type="button" class="${active ? "ml-btn-secondary" : "ml-btn-primary"}" data-shop-theme="${key}" ${!owned && state.gems < th.cost ? "disabled" : ""}>
                    ${active ? "✓ Equipped" : owned ? "Equip" : `Unlock · ${th.cost} ◆`}
                  </button>
                </div>
              `;
            }).join("")}
          </div>

          <div class="ml-micro-label" style="margin-bottom:8px;">Geometric Studio Emblems</div>
          <div class="ml-shop-grid">
            ${Object.entries(STUDIO_EMBLEMS).map(([key, acc]) => {
              const owned = ownedAcc.includes(key);
              const active = (state.pipAccessory || "none") === key;
              return `
                <div class="ml-shop-card ${active ? "active" : ""}">
                  <div style="margin-bottom:2px;">${renderStudioMarkSvg(36, key)}</div>
                  <strong>${acc.label}</strong>
                  <p class="ml-viz-sub">${acc.desc}</p>
                  <button type="button" class="${active ? "ml-btn-secondary" : "ml-btn-primary"}" data-shop-acc="${key}" ${!owned && state.gems < acc.cost ? "disabled" : ""}>
                    ${active ? "✓ Equipped" : owned ? "Equip" : `Unlock · ${acc.cost} ◆`}
                  </button>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);
    modal.querySelectorAll("[data-shop-buy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.dataset.shopBuy;
        if (item === "hearts" && state.gems >= 30 && state.hearts < 5) {
          state.gems -= 30;
          state.hearts = 5;
          session.statusMsg = "Refilled to 5/5 Hearts.";
        } else if (item === "freeze" && state.gems >= 60) {
          state.gems -= 60;
          state.streakFreezes = (state.streakFreezes || 0) + 1;
          session.statusMsg = "Added +1 Streak Freeze to your vault.";
        }
        AudioFX.playLevelUp();
        saveState();
        renderTopBar();
        renderNavTabs();
        renderShopModal(modal);
      });
    });
    modal.querySelectorAll("[data-shop-theme]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.shopTheme;
        const th = STUDIO_THEMES[key];
        if (!th) return;
        if (!Array.isArray(state.ownedThemes)) state.ownedThemes = ["noir"];
        if (!state.ownedThemes.includes(key)) {
          if (state.gems < th.cost) return;
          state.gems -= th.cost;
          state.ownedThemes.push(key);
          session.statusMsg = `Unlocked & equipped ${th.label}.`;
        } else {
          session.statusMsg = `Switched studio accent to ${th.label}.`;
        }
        state.paperTheme = key;
        state.lightTheme = false;
        applyThemeClass();
        AudioFX.playCorrect();
        saveState();
        renderTopBar();
        renderNavTabs();
        renderShopModal(modal);
      });
    });
    modal.querySelectorAll("[data-shop-acc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.shopAcc;
        const acc = STUDIO_EMBLEMS[key];
        if (!acc) return;
        if (!Array.isArray(state.ownedAccessories)) state.ownedAccessories = ["none"];
        if (!state.ownedAccessories.includes(key)) {
          if (state.gems < acc.cost) return;
          state.gems -= acc.cost;
          state.ownedAccessories.push(key);
          session.statusMsg = `Unlocked & equipped ${acc.label}.`;
        } else {
          session.statusMsg = `Equipped ${acc.label} studio emblem.`;
        }
        state.pipAccessory = key;
        AudioFX.playCorrect();
        saveState();
        renderTopBar();
        renderNavTabs();
        renderShopModal(modal);
      });
    });
  }

  function openGlobalSearch(initialQuery) {
    session = {
      mode: "search",
      phase: "search",
      query: initialQuery || ""
    };
    renderModal();
  }

  function buildFormulaSearchPool() {
    const m = DATA.MEMORIZE_DATA || {};
    const out = [];
    for (const f of (m.scienceFormulas || [])) {
      out.push({
        cat: String(f.subject || f.name || "Formula"),
        title: String(f.eq || f.formula || ""),
        detail: String(f.meaning || f.desc || ""),
        memSubTab: "science"
      });
    }
    for (const f of (m.physicsLawsCards || [])) out.push({ cat: String(f.law || "Law"), title: String(f.eq || ""), detail: String(f.key || ""), memSubTab: "ai_laws" });
    for (const c of (m.aiCards || [])) out.push({ cat: "AI · " + String(c.cat || ""), title: String(c.term || ""), detail: String(c.meaning || ""), memSubTab: "ai_laws" });
    for (const c of (m.codingCards || [])) out.push({ cat: "Code · " + String(c.cat || ""), title: "`" + String(c.syntax || "") + "`", detail: String(c.meaning || ""), memSubTab: "coding" });
    for (const c of (m.phHistoryCards || [])) out.push({ cat: "PH · " + String(c.era || ""), title: String(c.title || ""), detail: String(c.detail || ""), memSubTab: "ph_history" });
    for (const c of (m.filipinoCards || [])) out.push({ cat: "Filipino · " + String(c.cat || ""), title: String(c.front || ""), detail: String(c.back || ""), memSubTab: "filipino" });
    for (const c of (m.earthEconPhilCards || [])) out.push({ cat: String(c.cat || "Vault"), title: String(c.front || ""), detail: String(c.back || ""), memSubTab: "earth_econ" });
    for (const c of (m.examPrepCards || [])) out.push({ cat: String(c.cat || "Exam Vault"), title: String(c.front || ""), detail: String(c.back || ""), memSubTab: "exam_prep" });
    return out;
  }

  function renderSearchModal(modal) {
    const formulaPool = buildFormulaSearchPool();
    const quickChips = ["dost", "upcat", "cse", "nmat", "pulley", "ra 6713", "python", "fractions", "cells", "sql", "relu"];
    const lc = (v) => String(v == null ? "" : v).toLowerCase();

    function buildResultsHtml(rawQ) {
      const q = lc(rawQ).trim();
      const powerCommands = [
        { id: "open_intro_cfg", icon: "✦", label: "Customize Studio & Intro (Clean Zen ↔ Max Command Center)", hint: "Layout, theme, tabs & engine" },
        { id: "preset_zen", icon: "🧘", label: "Switch Instantly to Ultra-Clean Zen Mode", hint: "Zero clutter canvas" },
        { id: "preset_max", icon: "🛸", label: "Switch Instantly to Max Command Center (Bloated Pro HUD)", hint: "All widgets + 256 unlocked" },
        { id: "blind_smart", icon: "🕶️", label: "Start Blind Interleave Drill (10 Unlabeled Qs)", hint: "Cold topic recognition" },
        { id: "blind_illusions", icon: "🎯", label: "Launch Illusion Hunter (High-Confidence Errors)", hint: "Patch blind spots" },
        { id: "feynman_rec", icon: "🧠", label: "Open Feynman Active-Recall Check", hint: "Explain like I'm 12" },
        { id: "toggle_focus", icon: "⏱️", label: focusTimer.running ? "Pause Focus Timer" : "Start Focus Timer", hint: formatFocusMMSS(focusTimer.remainingSec) },
        { id: "audio_brown", icon: "🎧", label: EDGE && EDGE.AudioFocus && EDGE.AudioFocus.getMode() === "brown" ? "Stop Brown Noise" : "Play Offline Brown Noise", hint: "WebAudio focus" },
        { id: "audio_gamma", icon: "⚡", label: EDGE && EDGE.AudioFocus && EDGE.AudioFocus.getMode() === "gamma40" ? "Stop 40Hz Gamma Focus" : "Play 40Hz Gamma Focus Beat", hint: "Binaural focus" }
      ];

      if (!q || q.startsWith(">")) {
        const cmdQuery = q.startsWith(">") ? q.slice(1).trim() : "";
        const filteredCmds = cmdQuery
          ? powerCommands.filter((c) => lc(c.label).includes(cmdQuery) || lc(c.hint).includes(cmdQuery))
          : powerCommands;
        const qCnt = CODE_FORGE && CODE_FORGE.QUESTS ? CODE_FORGE.QUESTS.length : 0;
        const wkCnt = WORK_STUDIO && WORK_STUDIO.PROBLEMS ? WORK_STUDIO.PROBLEMS.length : 24;
        const exCnt = EXAM_MODE && EXAM_MODE.EXAMS ? EXAM_MODE.EXAMS.length : 10;
        return `
          <div class="ml-search-group" style="margin-bottom:14px;">
            <div class="ml-micro-label">⚡ Quick Power Commands (type <code>&gt;</code> to filter)</div>
            <div class="ml-search-list">
              ${filteredCmds.map((c) => `
                <button type="button" class="ml-search-item" data-gs-cmd="${c.id}">
                  <span><strong>${c.icon} ${escapeHtml(c.label)}</strong></span>
                  <span class="ml-mini-tag">${escapeHtml(c.hint)}</span>
                </button>
              `).join("")}
            </div>
          </div>
          ${!q ? `
            <div class="ml-viz-note" style="margin-bottom:10px;">Search across <strong>${exCnt} Exam blueprints</strong>, <strong>${wkCnt} Work Studio derivations</strong>, <strong>${DATA.NODES.length} lessons</strong>, <strong>${qCnt} Code Studio exercises</strong>, <strong>${VIZ.list.length} playgrounds</strong>, and your <strong>My Vault</strong> decks &amp; notes:</div>
            <div class="ml-viz-tabs">
              ${quickChips.map((chip) => `<button type="button" class="ml-pill" data-sq-chip="${chip}">🔍 ${chip}</button>`).join("")}
            </div>
          ` : ""}
        `;
      }

      const matchingExams = (EXAM_MODE && EXAM_MODE.EXAMS ? EXAM_MODE.EXAMS : []).filter((ex) =>
        lc(ex.shortName).includes(q) || lc(ex.title).includes(q) || lc(ex.tagline).includes(q) || lc(ex.org).includes(q) || lc(ex.categoryLabel).includes(q)
      ).slice(0, 6);

      const matchingWork = (WORK_STUDIO && WORK_STUDIO.PROBLEMS ? WORK_STUDIO.PROBLEMS : []).filter((wp) =>
        lc(wp.title).includes(q) || lc(wp.track).includes(q) || lc(wp.goal).includes(q) || lc(wp.given).includes(q)
      ).slice(0, 6);

      const matchingDecks = (state.userDecks || []).filter((d) =>
        lc(d.title).includes(q) || lc(d.description).includes(q) || (d.cards || []).some((c) => lc(c.front).includes(q) || lc(c.back).includes(q))
      ).slice(0, 5);

      const matchingNotes = Object.values(state.userNotes || {}).filter((nt) =>
        lc(nt.title).includes(q) || lc(nt.text).includes(q)
      ).slice(0, 5);

      const matchingQuests = (CODE_FORGE && CODE_FORGE.QUESTS ? CODE_FORGE.QUESTS : []).filter((cq) =>
        lc(cq.title).includes(q) || lc(cq.track).includes(q) || lc(cq.lang).includes(q) || lc(cq.objective).includes(q) || lc(cq.difficulty).includes(q)
      ).slice(0, 6);

      const matchingLabs = VIZ.list.filter((v) =>
        lc(v.title).includes(q) || lc(v.id).includes(q) || lc(v.category).includes(q)
      ).slice(0, 5);

      const matchingNodes = DATA.NODES.filter((n) => {
        const w = getWorld(n.worldId);
        const stepsText = (n.microSteps || []).map((s) => `${s.label || ""} ${s.text || ""}`).join(" ").toLowerCase();
        return (
          lc(n.title).includes(q) ||
          lc(n.tagline).includes(q) ||
          lc(n.cheatCode).includes(q) ||
          lc(n.easyTruth).includes(q) ||
          lc(n.scaryVersion).includes(q) ||
          lc(w && w.title).includes(q) ||
          stepsText.includes(q)
        );
      }).slice(0, 12);

      const matchingFormulas = formulaPool.filter((f) =>
        lc(f.cat).includes(q) || lc(f.title).includes(q) || lc(f.detail).includes(q)
      ).slice(0, 8);

      const matchingTraps = (DATA.GRADE12_TRAPS || []).filter((t) =>
        lc(t.title).includes(q) ||
        lc(t.trapExpression).includes(q) ||
        lc(t.quickRule).includes(q) ||
        lc(t.whyItHappens).includes(q)
      ).slice(0, 6);

      const total = matchingExams.length + matchingWork.length + matchingDecks.length + matchingNotes.length + matchingQuests.length + matchingLabs.length + matchingNodes.length + matchingFormulas.length + matchingTraps.length;
      if (total === 0) {
        return `<div class="ml-micro-card" style="text-align:center;">No matches for "<strong>${escapeHtml(rawQ)}</strong>". Try shorter keywords like <em>dost, upcat, nmat, ra 6713, pulley, sql, or lens</em>.</div>`;
      }

      let out = "";
      if (matchingExams.length) {
        out += `
          <div class="ml-search-group">
            <div class="ml-micro-label">🎯 Exam Mode Blueprints (${matchingExams.length})</div>
            <div class="ml-search-list">
              ${matchingExams.map((ex) => `
                <button type="button" class="ml-search-item" data-gs-exam="${ex.id}">
                  <div style="text-align:left; min-width:0; flex:1;">
                    <strong>${ex.icon} ${escapeHtml(ex.title)}</strong>
                    <div class="ml-viz-sub">${escapeHtml(ex.scoringBadge)}</div>
                  </div>
                  <span class="ml-mini-tag">Open Exam Mode →</span>
                </button>
              `).join("")}
            </div>
          </div>
        `;
      }
      if (matchingWork.length) {
        out += `
          <div class="ml-search-group">
            <div class="ml-micro-label">✏️ Work Studio Derivations (${matchingWork.length})</div>
            <div class="ml-search-list">
              ${matchingWork.map((wp) => `
                <button type="button" class="ml-search-item" data-gs-work="${escapeHtml(wp.id)}">
                  <div style="text-align:left; min-width:0; flex:1;">
                    <strong>${escapeHtml(wp.title)}</strong>
                    <div class="ml-viz-sub">${escapeHtml(wp.track.toUpperCase())} · ${wp.steps.length} steps · +${wp.xp} XP</div>
                  </div>
                  <span class="ml-mini-tag">Show Work →</span>
                </button>
              `).join("")}
            </div>
          </div>
        `;
      }
      if (matchingDecks.length || matchingNotes.length) {
        out += `
          <div class="ml-search-group">
            <div class="ml-micro-label">🔖 My Vault Decks &amp; Notes (${matchingDecks.length + matchingNotes.length})</div>
            <div class="ml-search-list">
              ${matchingDecks.map((d) => `
                <button type="button" class="ml-search-item" data-gs-deck="${escapeHtml(d.id)}">
                  <div style="text-align:left; min-width:0; flex:1;">
                    <strong>🃏 ${escapeHtml(d.title)}</strong>
                    <div class="ml-viz-sub">${(d.cards || []).length} custom SM-2 cards</div>
                  </div>
                  <span class="ml-mini-tag">Open Deck →</span>
                </button>
              `).join("")}
              ${matchingNotes.map((nt) => `
                <button type="button" class="ml-search-item" data-gs-note="${escapeHtml(nt.id)}">
                  <div style="text-align:left; min-width:0; flex:1;">
                    <strong>📝 ${escapeHtml(nt.title || "Note")}</strong>
                    <div class="ml-viz-sub">${escapeHtml((nt.text || "").slice(0, 72))}</div>
                  </div>
                  <span class="ml-mini-tag">Open Note →</span>
                </button>
              `).join("")}
            </div>
          </div>
        `;
      }
      if (matchingQuests.length) {
        out += `
          <div class="ml-search-group">
            <div class="ml-micro-label">⚔️ Code Forge Coding Quests (${matchingQuests.length})</div>
            <div class="ml-search-list">
              ${matchingQuests.map((cq) => `
                <button type="button" class="ml-search-item" data-gs-forge="${cq.id}">
                  <div style="text-align:left; min-width:0; flex:1;">
                    <strong>#${cq.order} ${escapeHtml(cq.title)}</strong>
                    <div class="ml-viz-sub">${escapeHtml(cq.lang.toUpperCase())} · ${escapeHtml(cq.difficulty)} · +${cq.xp} XP</div>
                  </div>
                  <span class="ml-mini-tag">Open IDE →</span>
                </button>
              `).join("")}
            </div>
          </div>
        `;
      }
      if (matchingLabs.length) {
        out += `
          <div class="ml-search-group">
            <div class="ml-micro-label">🧪 Visual Playgrounds (${matchingLabs.length})</div>
            <div class="ml-search-list">
              ${matchingLabs.map((v) => `
                <button type="button" class="ml-search-item" data-gs-lab="${v.id}">
                  <span><strong>${v.icon} ${escapeHtml(v.title)}</strong></span>
                  <span class="ml-mini-tag">Open Playground →</span>
                </button>
              `).join("")}
            </div>
          </div>
        `;
      }

      if (matchingNodes.length) {
        out += `
          <div class="ml-search-group">
            <div class="ml-micro-label">🗺️ Lessons (${matchingNodes.length})</div>
            <div class="ml-search-list">
              ${matchingNodes.map((n) => {
                const w = getWorld(n.worldId);
                const uInfo = getUnlockInfo(n.id);
                return `
                  <div class="ml-search-item static">
                    <div style="min-width:0; flex:1;">
                      <div class="ml-search-world-tag" style="--world-color:${w.color};">${w.icon} ${escapeHtml(w.title.split(":")[0])}${uInfo.locked ? " · 🔒 Prereqs Required" : ""}</div>
                      <div style="font-weight:800; font-size:14.5px;">${uInfo.locked ? "🔒" : n.icon} ${fmtMath(n.title)}</div>
                      <div class="ml-viz-sub" style="margin-top:2px;">${fmtMath(n.tagline)}</div>
                    </div>
                    <div style="display:flex; gap:6px; flex-shrink:0;">
                      ${uInfo.locked ? `
                        <button type="button" class="ml-btn-mini" data-gs-tree="${n.id}">🔒 Unlock Path</button>
                      ` : `
                        <button type="button" class="ml-btn-mini" data-gs-node="${n.id}" data-gs-mode="lesson">📖 Open</button>
                        <button type="button" class="ml-btn-mini" data-gs-node="${n.id}" data-gs-mode="drill">⚡ Drill</button>
                      `}
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      }

      if (matchingFormulas.length) {
        out += `
          <div class="ml-search-group">
            <div class="ml-micro-label">📐 Formulas & Cheat Cards (${matchingFormulas.length})</div>
            <div class="ml-search-list">
              ${matchingFormulas.map((f) => `
                <button type="button" class="ml-search-item" data-gs-memtab="${escapeHtml(f.memSubTab || "science")}">
                  <div style="text-align:left; min-width:0; flex:1;">
                    <div class="ml-mini-tag">${escapeHtml(f.cat)}</div>
                    <div style="font-weight:800; margin:2px 0;">${fmtMath(f.title)}</div>
                    <div class="ml-viz-sub">${fmtMath(f.detail)}</div>
                  </div>
                  <span class="ml-mini-tag">Open Vault →</span>
                </button>
              `).join("")}
            </div>
          </div>
        `;
      }

      if (matchingTraps.length) {
        out += `
          <div class="ml-search-group">
            <div class="ml-micro-label">⚡ Classic Traps (${matchingTraps.length})</div>
            <div class="ml-search-list">
              ${matchingTraps.map((t) => `
                <button type="button" class="ml-search-item" data-gs-trap="${t.id}">
                  <div style="text-align:left; min-width:0; flex:1;">
                    <strong>${fmtMath(t.title)}</strong>
                    <div class="ml-viz-sub">${fmtMath(t.quickRule)}</div>
                  </div>
                  <span class="ml-mini-tag">View Trap →</span>
                </button>
              `).join("")}
            </div>
          </div>
        `;
      }
      return out;
    }

    modal.innerHTML = `
      <div class="ml-modal-shell">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-brief-pill">🔍 Primer Universal Search (Lessons · Derivations · Decks · Labs · Traps)</div>
        </div>
        <div class="ml-brief-body">
          <input type="search" id="ml-gs-input" class="ml-search-input" style="width:100%; font-size:15px; padding:12px 14px;"
            placeholder="Search anything: convex, concave, mirror, bernoulli, binomial, relu, python, rizal..." value="${escapeHtml(session.query || "")}" autocomplete="off" />
          <div id="ml-gs-results" style="margin-top:14px;">${buildResultsHtml(session.query || "")}</div>
        </div>
      </div>
    `;

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);
    const gsInp = document.getElementById("ml-gs-input");
    const gsRes = document.getElementById("ml-gs-results");

    function bindResultClicks() {
      gsRes.querySelectorAll("[data-gs-cmd]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          const cmd = btn.dataset.gsCmd;
          if (cmd === "open_intro_cfg" && ONBOARDING) {
            closeSession();
            openStudioIntro("config", false);
          } else if (cmd === "preset_zen" && ONBOARDING) {
            ONBOARDING.applyArchetypeToState(state, "zen");
            saveState();
            closeSession();
          } else if (cmd === "preset_max" && ONBOARDING) {
            ONBOARDING.applyArchetypeToState(state, "command_center");
            saveState();
            closeSession();
          } else if (cmd === "blind_smart") {
            startBlindInterleaveSession("smart", 10);
          } else if (cmd === "blind_illusions") {
            startBlindInterleaveSession("illusions", 10);
          } else if (cmd === "feynman_rec") {
            const rec = getRecommendedNode();
            openFeynmanModal(rec ? rec.id : DATA.NODES[0].id);
          } else if (cmd === "toggle_focus") {
            toggleFocusTimer();
            closeSession();
          } else if (cmd === "audio_brown" && EDGE && EDGE.AudioFocus) {
            EDGE.AudioFocus.setMode(EDGE.AudioFocus.getMode() === "brown" ? "off" : "brown");
            renderNavTabs();
            closeSession();
          } else if (cmd === "audio_gamma" && EDGE && EDGE.AudioFocus) {
            EDGE.AudioFocus.setMode(EDGE.AudioFocus.getMode() === "gamma40" ? "off" : "gamma40");
            renderNavTabs();
            closeSession();
          }
        });
      });
      gsRes.querySelectorAll("[data-sq-chip]").forEach((btn) => {
        btn.addEventListener("click", () => {
          session.query = btn.dataset.sqChip;
          gsInp.value = session.query;
          gsRes.innerHTML = buildResultsHtml(session.query);
          bindResultClicks();
          gsInp.focus();
        });
      });
      gsRes.querySelectorAll("[data-gs-exam]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          const exId = btn.dataset.gsExam;
          if (EXAM_MODE && EXAM_MODE.openExamDossier) EXAM_MODE.openExamDossier(exId, state);
          state.activeExamId = exId;
          state.activeTab = "exam";
          saveState();
          closeSession();
        });
      });
      gsRes.querySelectorAll("[data-gs-work]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          if (WORK_STUDIO && WORK_STUDIO.selectProblemById) WORK_STUDIO.selectProblemById(btn.dataset.gsWork);
          state.activeTab = "work";
          saveState();
          closeSession();
        });
      });
      gsRes.querySelectorAll("[data-gs-deck]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          if (MY_VAULT && MY_VAULT.openDeckById) MY_VAULT.openDeckById(btn.dataset.gsDeck);
          state.activeTab = "myvault";
          saveState();
          closeSession();
        });
      });
      gsRes.querySelectorAll("[data-gs-note]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          const nt = state.userNotes && state.userNotes[btn.dataset.gsNote];
          if (nt && nt.nodeId) {
            const nd = DATA.NODES.find((x) => x.id === nt.nodeId);
            if (nd && MY_VAULT) MY_VAULT.openNoteForLesson(state, nd);
          }
          state.activeTab = "myvault";
          saveState();
          closeSession();
        });
      });
      gsRes.querySelectorAll("[data-gs-forge]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          state.forgeActiveQuestId = btn.dataset.gsForge;
          state.forgeView = "workspace";
          if (CODE_FORGE && CODE_FORGE.openWorkspace) CODE_FORGE.openWorkspace(state.forgeActiveQuestId);
          state.activeTab = "forge";
          saveState();
          closeSession();
        });
      });
      gsRes.querySelectorAll("[data-gs-lab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          state.activeLabId = btn.dataset.gsLab;
          state.labCategory = "all";
          state.activeTab = "lab";
          saveState();
          closeSession();
        });
      });
      gsRes.querySelectorAll("[data-gs-node]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          startNodeSession(btn.dataset.gsNode, btn.dataset.gsMode || "lesson");
        });
      });
      gsRes.querySelectorAll("[data-gs-tree]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          openPrereqModal(btn.dataset.gsTree);
        });
      });
      gsRes.querySelectorAll("[data-gs-memtab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          const sub = btn.dataset.gsMemtab || "science";
          if (MEM && typeof MEM.openSubTab === "function") MEM.openSubTab(sub);
          state.activeTab = "memorize";
          saveState();
          closeSession();
        });
      });
      gsRes.querySelectorAll("[data-gs-trap]").forEach((btn) => {
        btn.addEventListener("click", () => {
          AudioFX.playTap();
          const tid = btn.dataset.gsTrap;
          state.activeTab = "traps";
          state.trapsSubTab = "traps";
          saveState();
          closeSession();
          setTimeout(() => {
            const card = document.getElementById(`card-${tid}`);
            if (card && card.scrollIntoView) card.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 60);
        });
      });
    }

    bindResultClicks();
    if (gsInp) {
      if (isFinePointer()) gsInp.focus();
      gsInp.addEventListener("input", () => {
        session.query = gsInp.value;
        gsRes.innerHTML = buildResultsHtml(session.query);
        bindResultClicks();
      });
    }
  }

  function renderPrereqTreeModal(modal) {
    const n = session.node;
    const w = getWorld(n.worldId);
    const lvl = state.nodeMastery[n.id] || 0;
    const stage = getMasteryStage(lvl);
    const uInfo = getUnlockInfo(n.id);
    const isLocked = uInfo.locked;
    const nextReady = uInfo.nextActionablePrereq;

    const prereqCardsHtml = uInfo.prereqs.length > 0
      ? uInfo.prereqs.map((p) => {
          const pn = p.node;
          if (!pn) return "";
          const pw = getWorld(pn.worldId);
          const pUnlock = getUnlockInfo(pn.id);
          const bridgeWhy = TUTOR && TUTOR.getBridgeReason ? TUTOR.getBridgeReason(pn.id, n.id, DATA) : "";
          return `
            <div class="ml-dep-card ${p.met ? "met" : (pUnlock.locked ? "deep-locked" : "actionable")}">
              <div class="ml-dep-card-head">
                <div class="ml-dep-card-meta">
                  <span class="ml-dep-status-pill ${p.met ? "met" : (pUnlock.locked ? "locked" : "ready")}">
                    ${p.met ? "✓ Understood" : (pUnlock.locked ? `🔒 Needs ${pUnlock.missingPrereqs.length} earlier` : "✨ Ready Now")}
                  </span>
                  <span class="ml-dep-world-mini" style="--world-color:${pw.color};">${pw.icon} ${escapeHtml(pw.title.split(":")[0])}</span>
                </div>
                <div class="ml-dep-card-actions">
                  ${p.met ? `
                    <button type="button" class="ml-btn-mini" data-dep-launch="${pn.id}">Review</button>
                  ` : pUnlock.locked ? `
                    <button type="button" class="ml-btn-mini" data-dep-inspect="${pn.id}">View Its Prereqs →</button>
                  ` : `
                    <button type="button" class="ml-btn-primary ml-btn-xs" data-dep-launch="${pn.id}">Start Skill →</button>
                  `}
                </div>
              </div>
              <div class="ml-dep-card-title">${pn.icon} ${fmtMath(pn.title)}</div>
              <div class="ml-dep-bridge"><strong>Why you need this first:</strong> ${escapeHtml(bridgeWhy)}</div>
            </div>
          `;
        }).join("")
      : `<div class="ml-dep-empty">🌱 <strong>Root Foundation Skill!</strong> No prerequisites required — you can dive right into this topic from zero.</div>`;

    // Show multi-step roadmap if indirect ancestors are also missing
    const hasDeepChain = isLocked && uInfo.chain.length > uInfo.missingPrereqs.length;
    const roadmapHtml = hasDeepChain ? `
      <div class="ml-dep-roadmap">
        <div class="ml-micro-label" style="margin-bottom:8px;">🗺️ Complete Step-by-Step Unlock Chain (${uInfo.chain.length} skills to reach this)</div>
        <div class="ml-roadmap-list">
          ${uInfo.chain.map((step, i) => {
            const sn = step.node;
            if (!sn) return "";
            return `
              <button type="button" class="ml-roadmap-step ${step.ready ? "ready" : ""}" data-dep-${step.ready ? "launch" : "inspect"}="${sn.id}">
                <span class="ml-roadmap-num">${i + 1}</span>
                <span class="ml-roadmap-copy">
                  <strong>${sn.icon} ${escapeHtml(sn.title)}</strong>
                  <span>${step.ready ? "✨ Unlocked & ready right now — start here!" : (step.isDirect ? "Direct prerequisite" : "Earlier foundation")}</span>
                </span>
                <span class="ml-roadmap-cta">${step.ready ? "Start →" : "Inspect"}</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    ` : "";

    const unlocksHtml = uInfo.unlocks.length > 0
      ? `
        <div class="ml-dep-children-grid">
          ${uInfo.unlocks.map((u) => {
            const cn = u.node;
            const cw = getWorld(cn.worldId);
            return `
              <button type="button" class="ml-dep-child-chip ${u.mastery >= 1 ? "done" : ""}" data-dep-inspect="${cn.id}">
                <span class="ml-dep-child-ico">${cn.icon}</span>
                <span class="ml-dep-child-body">
                  <strong>${escapeHtml(cn.title)}</strong>
                  <span style="--world-color:${cw.color};">${cw.icon} ${escapeHtml(cw.title.split(":")[0])}${u.mastery >= 1 ? " · ✓ Done" : u.otherMissingCount > 0 ? ` · +${u.otherMissingCount} other prereq` : " · Unlocks immediately!"}</span>
                </span>
                <span class="ml-dep-child-arrow">→</span>
              </button>
            `;
          }).join("")}
        </div>
      `
      : `<div class="ml-dep-empty">🏆 <strong>Capstone Mastery Skill!</strong> This is an apex topic at the frontier of its branch.</div>`;

    modal.innerHTML = `
      <div class="ml-modal-shell ml-dep-modal">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-brief-pill" style="--world-color:${w.color}; --world-soft:${w.bgSoft}; --world-border:${w.borderSoft};">
            🔗 Knowledge Tree · ${w.icon} ${escapeHtml(w.title.split(":")[0])}
          </div>
          ${isLocked ? `<span class="ml-node-stage-pill locked">🔒 Locked (${uInfo.missingPrereqs.length} prereq${uInfo.missingPrereqs.length === 1 ? "" : "s"} missing)</span>` : `<span class="ml-node-stage-pill ${lvl === 0 ? "ready" : `level-${lvl}`}">${lvl === 0 ? "✨ Ready" : `${stage.badge} ${escapeHtml(stage.short)}`}</span>`}
        </div>

        <div class="ml-brief-body">
          <div class="ml-dep-stage">
            <div class="ml-dep-stage-label">1. Required Foundations (Understand These First)</div>
            <div class="ml-dep-cards-stack">
              ${prereqCardsHtml}
            </div>
          </div>

          ${roadmapHtml}

          <div class="ml-dep-connector" aria-hidden="true"><span>↓ builds into ↓</span></div>

          <div class="ml-dep-target-card ${isLocked ? "locked" : "unlocked"}" style="--world-color:${w.color}; --world-soft:${w.bgSoft}; --world-border:${w.borderSoft};">
            <div class="ml-dep-target-head">
              <div class="ml-node-icon-ring">${isLocked ? "🔒" : n.icon}</div>
              <div style="flex:1; min-width:0;">
                <div class="ml-node-order">Target Skill #${n.order}</div>
                <h3 class="ml-dep-target-title">${fmtMath(n.title)}</h3>
              </div>
            </div>
            <p class="ml-dep-target-sub">${fmtMath(n.tagline)}</p>
            <div class="ml-dep-target-actions">
              ${isLocked ? `
                ${nextReady && nextReady.node ? `
                  <button type="button" class="ml-btn-primary" id="ml-dep-start-next" data-dep-launch="${nextReady.node.id}">
                    ▶️ Start Next Required Skill: ${escapeHtml(nextReady.node.title)} →
                  </button>
                ` : ""}
                <button type="button" class="ml-btn-secondary" id="ml-dep-testout-btn" title="Pass an 80%+ placement quiz across missing prerequisites to prove you already know them">
                  ⚡ Test Out of Prerequisites
                </button>
              ` : `
                <button type="button" class="ml-btn-primary" id="ml-dep-open-target">
                  📖 Open Intuition Lesson →
                </button>
                <button type="button" class="ml-btn-secondary" id="ml-dep-drill-target">
                  ⚡ 5-Q Procedural Drill
                </button>
              `}
            </div>
          </div>

          <div class="ml-dep-connector" aria-hidden="true"><span>↓ unlocks next ↓</span></div>

          <div class="ml-dep-stage">
            <div class="ml-dep-stage-label">3. What Mastering This Unlocks (${uInfo.unlocksCount})</div>
            ${unlocksHtml}
          </div>
        </div>
      </div>
    `;

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);

    modal.querySelectorAll("[data-dep-launch]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        startNodeSession(btn.dataset.depLaunch, "lesson");
      });
    });

    modal.querySelectorAll("[data-dep-inspect]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        openPrereqModal(btn.dataset.depInspect);
      });
    });

    const testOutBtn = document.getElementById("ml-dep-testout-btn");
    if (testOutBtn) {
      testOutBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startPrereqTestOutSession(n.id);
      });
    }

    const openTargetBtn = document.getElementById("ml-dep-open-target");
    if (openTargetBtn) {
      openTargetBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startNodeSession(n.id, "lesson");
      });
    }

    const drillTargetBtn = document.getElementById("ml-dep-drill-target");
    if (drillTargetBtn) {
      drillTargetBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startNodeSession(n.id, "drill");
      });
    }
  }

  function openChangelogModal() {
    if (state.lastSeenBuildKey !== CURRENT_BUILD_KEY) {
      state.lastSeenBuildKey = CURRENT_BUILD_KEY;
      saveState();
      renderTopBar();
      renderNavTabs();
    }
    session = { mode: "changelog", phase: "changelog", statusMsg: "" };
    renderModal();
  }

  function renderChangelogModal(modal) {
    const releases = Array.isArray(BUILD.releases) && BUILD.releases.length
      ? BUILD.releases
      : [{
          version: BUILD.version,
          codename: BUILD.codename,
          date: BUILD.builtAt || "Current",
          changes: [
            "Pitch-Black Obsidian Studio UI with persistent left sidebar navigation, unified topbar metrics, and 2-column Bento Dashboard.",
            "Removed light mode & legacy owl mascot in favor of pure black OLED surfaces and crisp geometric studio iconography."
          ]
        }];
    const runtimeLabel = BUILD.runtime === "standalone" ? "📦 Standalone HTML Bundle" : "🗂️ Live Workspace Files";
    const buildStamp = `Primer Studio v${BUILD.version} (${BUILD.codename}) · Build #${BUILD.buildHash || "dev"}${BUILD.builtAt ? " · " + BUILD.builtAt : ""} · ${DATA.WORLDS.length}W/${DATA.NODES.length}L/${VIZ.list.length}Labs`;

    modal.innerHTML = `
      <div class="ml-modal-shell">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-brief-pill">🏷️ Version & Build Info · v${escapeHtml(BUILD.version)}</div>
          <button type="button" class="ml-btn-mini" id="ml-copy-build-btn">📋 Copy Build Tag</button>
        </div>

        <div class="ml-brief-body">
          ${session.statusMsg ? `<div class="ml-easy-box">${escapeHtml(session.statusMsg)}</div>` : ""}

          <div class="ml-build-grid">
            <div class="ml-build-stat">
              <span>Current Version</span>
              <strong>v${escapeHtml(BUILD.version)} · ${escapeHtml(BUILD.codename)}</strong>
            </div>
            <div class="ml-build-stat">
              <span>Build Fingerprint</span>
              <code>#${escapeHtml(BUILD.buildHash || "dev")}</code>
            </div>
            <div class="ml-build-stat">
              <span>Built At</span>
              <strong>${escapeHtml(BUILD.builtAt || "Local Dev")}</strong>
            </div>
            <div class="ml-build-stat">
              <span>Runtime & Content</span>
              <strong>${runtimeLabel} · ${DATA.WORLDS.length}W · ${DATA.NODES.length}L · ${VIZ.list.length} Labs</strong>
            </div>
          </div>

          <div class="ml-micro-card">
            <div class="ml-micro-label">✅ How to verify you're on the latest copy</div>
            <p>
              Every rebuild generates a new 7-character fingerprint hash (currently <code>#${escapeHtml(BUILD.buildHash || "dev")}</code>). If you open a saved standalone file or browser tab and the version or hash doesn't match, hard-refresh (<code>Ctrl+Shift+R</code>) or open the newest <code>primer.standalone.html</code>.
            </p>
          </div>

          <div class="ml-micro-label" style="margin-top:4px;">📜 Release History</div>
          <div class="ml-release-list">
            ${releases.map((rel, idx) => `
              <div class="ml-release-card ${idx === 0 ? "current" : ""}">
                <div class="ml-release-head">
                  <strong>v${escapeHtml(rel.version)} — ${escapeHtml(rel.codename || "Update")}</strong>
                  <span class="ml-mini-tag">${idx === 0 ? "Current · " : ""}${escapeHtml(rel.date || "")}</span>
                </div>
                <ul class="ml-release-ul">
                  ${(rel.changes || []).map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
                </ul>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);
    const copyBtn = document.getElementById("ml-copy-build-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        AudioFX.playTap();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(buildStamp).then(() => {
            session.statusMsg = `✅ Copied: ${buildStamp}`;
            renderChangelogModal(modal);
          }).catch(() => {
            session.statusMsg = `Build Tag: ${buildStamp}`;
            renderChangelogModal(modal);
          });
        } else {
          session.statusMsg = `Build Tag: ${buildStamp}`;
          renderChangelogModal(modal);
        }
      });
    }
  }

  function renderModal() {
    const modal = document.getElementById("ml-modal");
    if (!modal || !session) return;
    modal.classList.remove("hidden");

    if (session.phase === "search") renderSearchModal(modal);
    else if (session.phase === "shop") renderShopModal(modal);
    else if (session.phase === "backup") renderBackupModal(modal);
    else if (session.phase === "sync_incoming") renderSyncIncomingModal(modal);
    else if (session.phase === "changelog") renderChangelogModal(modal);
    else if (session.phase === "prereqs") renderPrereqTreeModal(modal);
    else if (session.phase === "feynman") renderFeynmanModal(modal);
    else if (session.phase === "bf-picker") renderBruteforcePicker(modal);
    else if (session.phase === "bruteforce") renderBruteforceRunner(modal);
    else if (session.phase === "briefing") renderBriefingPhase(modal);
    else if (session.phase === "quiz") renderQuizPhase(modal);
    else renderVictoryPhase(modal);
  }

  // Click dark backdrop outside modal shell to dismiss non-quiz overlays cleanly
  const modalRootEl = document.getElementById("ml-modal");
  if (modalRootEl) {
    modalRootEl.addEventListener("click", (e) => {
      if (e.target === modalRootEl && session && ["search", "shop", "backup", "sync_incoming", "changelog", "prereqs", "feynman", "bf-picker", "briefing"].includes(session.phase)) {
        closeSession();
      }
    });
  }

  // ==================== BRUTEFORCE ENDLESS MEMORIZE MODE ====================
  function openBruteforceLauncher(preselectId) {
    const bfNodes = DATA.NODES.filter((n) => n.bruteforce);
    const defaultIds = preselectId && bfNodes.some((n) => n.id === preselectId)
      ? [preselectId]
      : ["logarithms-unlocked"];

    session = {
      mode: "bf-picker",
      phase: "bf-picker",
      selectedIds: new Set(defaultIds),
      goalStreak: 10,
      instantCheck: true
    };
    renderModal();
  }

  function renderBruteforcePicker(modal) {
    const bfNodes = DATA.NODES.filter((n) => n.bruteforce);
    const goals = [
      { val: 10, label: "🔥 10-In-A-Row Lock", desc: "Miss resets streak to 0 until you nail 10 straight!" },
      { val: 20, label: "💀 20-In-A-Row Lock", desc: "Hardcore muscle-memory lock!" },
      { val: 0, label: "♾️ Pure Endless Loop", desc: "Infinite reps until YOU decide it's burned in!" }
    ];

    modal.innerHTML = `
      <div class="ml-modal-shell">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-brief-pill" style="background:var(--ml-danger-soft); color:var(--ml-danger);">
            🔨 Endless Bruteforce Mode • Selected Memorizable Lessons (${bfNodes.length})
          </div>
        </div>

        <div class="ml-brief-body">
          <p class="ml-hero-desc" style="margin-bottom:12px;">
            Stuck on a hard lesson? Bruteforce Mode throws endless reps at you and <strong>resets your streak + loops missed items right back</strong> until your brain locks it in automatically.
          </p>

          <div class="ml-micro-card" style="margin-bottom:14px;">
            <div class="ml-micro-label">1. Choose Lock Goal</div>
            <div class="ml-bf-goals">
              ${goals.map((g) => `
                <button type="button" class="ml-bf-goal-btn ${session.goalStreak === g.val ? "active" : ""}" data-bf-goal="${g.val}">
                  <strong>${g.label}</strong>
                  <span>${g.desc}</span>
                </button>
              `).join("")}
            </div>
            <label class="ml-bf-toggle">
              <input type="checkbox" id="ml-bf-instant-chk" ${session.instantCheck ? "checked" : ""} />
              <span>⚡ Instant-Check on Click (faster reps!)</span>
            </label>
          </div>

          <div class="ml-micro-card">
            <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:8px; margin-bottom:10px;">
              <div class="ml-micro-label" style="margin:0;">2. Pick 1 or More Lessons (${session.selectedIds.size} selected)</div>
              <div style="display:flex; flex-wrap:wrap; gap:6px;">
                <button type="button" class="ml-btn-mini" data-bf-preset="ai_code">🤖 AI + Coding</button>
                <button type="button" class="ml-btn-mini" data-bf-preset="ph_hum">🇵🇭 PH + Filipino + Shapes</button>
                <button type="button" class="ml-btn-mini" data-bf-preset="phys_laws">🌌 Physics Laws</button>
                <button type="button" class="ml-btn-mini" data-bf-preset="grade12">🚀 Gr 12 Math</button>
                <button type="button" class="ml-btn-mini" data-bf-preset="basics">🧱 Basics (× ÷ √ %)</button>
                <button type="button" class="ml-btn-mini" data-bf-preset="stem">⚛️ Phys+Chem+Bio</button>
              </div>
            </div>
            <div class="ml-bf-pick-grid">
              ${bfNodes.map((n) => {
                const picked = session.selectedIds.has(n.id);
                return `
                  <button type="button" class="ml-bf-pick-chip ${picked ? "picked" : ""}" data-bf-pick="${n.id}">
                    <span>${n.icon}</span>
                    <span>${escapeHtml(n.title)}</span>
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        </div>

        <div class="ml-modal-footer">
          <button type="button" class="ml-btn-danger big" id="ml-bf-launch-btn" ${session.selectedIds.size === 0 ? "disabled" : ""}>
            🔨 Start Endless Bruteforce (${session.selectedIds.size} Topic${session.selectedIds.size === 1 ? "" : "s"}) →
          </button>
        </div>
      </div>
    `;

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);

    modal.querySelectorAll("[data-bf-goal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        session.goalStreak = parseInt(btn.dataset.bfGoal, 10);
        renderBruteforcePicker(modal);
      });
    });

    document.getElementById("ml-bf-instant-chk").addEventListener("change", (e) => {
      session.instantCheck = !!e.target.checked;
    });

    modal.querySelectorAll("[data-bf-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        const p = btn.dataset.bfPreset;
        if (p === "ai_code") session.selectedIds = new Set(["ai-perceptron-neural-nets", "ai-transformers-self-attention", "code-css-box-model-units", "py-lists-dicts-slicing", "tech-binary-bits-hex-memory"]);
        else if (p === "ph_hum") session.selectedIds = new Set(["ph-propaganda-katipunan-rev", "ph-constitution-three-branches", "fil-ng-nang-din-rin-traps", "abs-rotations-reflections", "abs-3d-cube-folding-nets"]);
        else if (p === "phys_laws") session.selectedIds = new Set(["physics-universal-gravitation-kepler", "physics-shm-pendulums-resonance", "physics-thermo-four-laws-engines", "physics-faraday-induction-ac-maxwell", "physics-quantum-photoelectric-nuclear"]);
        else if (p === "grade12") session.selectedIds = new Set(["logarithms-unlocked", "trig-unit-circle", "derivatives-speedometer", "integrals-area"]);
        else if (p === "basics") session.selectedIds = new Set(["rect-multiplication", "reverse-division", "squares-cubes-roots", "decimals-percents", "math-estimation-mental-shortcuts"]);
        else session.selectedIds = new Set(["physics-kinematics", "physics-newton-forces", "chem-moles-stoich", "chem-acids-bases-ph", "bio-dna-rna-proteins"]);
        renderBruteforcePicker(modal);
      });
    });

    modal.querySelectorAll("[data-bf-pick]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        const id = btn.dataset.bfPick;
        if (session.selectedIds.has(id)) {
          if (session.selectedIds.size > 1) session.selectedIds.delete(id);
        } else {
          session.selectedIds.add(id);
        }
        renderBruteforcePicker(modal);
      });
    });

    document.getElementById("ml-bf-launch-btn").addEventListener("click", () => {
      if (session.selectedIds.size === 0) return;
      AudioFX.playTap();
      startBruteforceSession(Array.from(session.selectedIds), session.goalStreak, session.instantCheck);
    });
  }

  function startBruteforceSession(nodeIds, goalStreak, instantCheck) {
    const validNodes = nodeIds
      .map((id) => DATA.NODES.find((n) => n.id === id && n.bruteforce))
      .filter(Boolean);
    if (validNodes.length === 0) return;

    const curatedQueues = {};
    for (const n of validNodes) {
      curatedQueues[n.id] = n.questions.slice();
    }

    session = {
      mode: "bruteforce",
      phase: "bruteforce",
      node: validNodes.length === 1
        ? validNodes[0]
        : { id: "bf-mix", worldId: validNodes[0].worldId, title: `Bruteforce Mix (${validNodes.length} Topics)`, icon: "🔨" },
      bfNodes: validNodes,
      bfCuratedQueues: curatedQueues,
      bfRetryQueue: [],
      bfGoal: goalStreak || 0,
      bfInstant: instantCheck !== false,
      bfStreak: 0,
      bfBestStreak: 0,
      bfReps: 0,
      bfCorrect: 0,
      xpEarned: 0,
      gemsEarned: 0,
      maxCombo: 0,
      originalCount: 1,
      firstTryCorrect: 0,
      currentQ: null,
      selectedOpt: null,
      checked: false,
      isCorrect: false,
      lastFlash: null,
      showCheat: false,
      questionStart: Date.now()
    };

    session.currentQ = pullNextBruteforceQuestion();
    renderModal();
  }

  function pullNextBruteforceQuestion() {
    if (!session || session.mode !== "bruteforce") return null;
    const dueIdx = session.bfRetryQueue.findIndex((item) => item.dueRep <= session.bfReps);
    if (dueIdx !== -1) {
      const [due] = session.bfRetryQueue.splice(dueIdx, 1);
      return Object.assign({ isRetry: true }, due.q);
    }

    const pickNode = session.bfNodes[Math.floor(Math.random() * session.bfNodes.length)];
    const queue = session.bfCuratedQueues[pickNode.id];
    let q;
    if (queue && queue.length > 0) {
      q = Object.assign({}, queue.shift(), { sourceNode: pickNode, isRetry: false });
    } else {
      q = Object.assign({}, DATA.generateProceduralQuestion(pickNode.id), { sourceNode: pickNode, isRetry: false });
    }
    return q;
  }

  function renderBruteforceRunner(modal) {
    const q = session.currentQ;
    const src = q.sourceNode || session.node;
    const hasGoal = session.bfGoal > 0;
    const lockPct = hasGoal ? Math.min(100, Math.round((session.bfStreak / session.bfGoal) * 100)) : 100;

    let inputBlock = "";
    if (q.type === "mc") {
      inputBlock = `
        <div class="${q.optionSvgs ? "ml-opt-grid-svg" : "ml-options-grid"}">
          ${q.options.map((opt, idx) => {
            let cls = q.optionSvgs ? "ml-option-btn ml-opt-svg-btn" : "ml-option-btn";
            if (session.checked) {
              if (opt === q.answer) cls += " correct";
              else if (opt === session.selectedOpt && !session.isCorrect) cls += " wrong";
            } else if (opt === session.selectedOpt) {
              cls += " selected";
            }
            const svgTile = q.optionSvgs && q.optionSvgs[opt] ? `<span class="ml-opt-svg-wrap">${q.optionSvgs[opt]}</span>` : "";
            return `
              <button type="button" class="${cls}" data-bf-opt="${idx}" ${session.checked ? "disabled" : ""}>
                <span class="ml-key-num">${idx + 1}</span>
                ${svgTile}
                <span class="${q.optionSvgs ? "ml-opt-svg-lbl" : "ml-opt-text"}">${fmtMath(opt)}</span>
              </button>
            `;
          }).join("")}
        </div>
      `;
    } else {
      inputBlock = `
        <div class="ml-input-answer-wrap">
          <input type="text" id="ml-bf-text" class="ml-answer-input ${session.checked ? (session.isCorrect ? "correct" : "wrong") : ""}"
            placeholder="Type answer & press Enter..." value="${escapeHtml(session.selectedOpt || "")}" ${session.checked ? "disabled" : ""} autocomplete="off" />
        </div>
        ${!session.checked ? renderQuickPadHtml("bf") : ""}
      `;
    }

    let bottomBanner = "";
    if (!session.checked) {
      bottomBanner = `
        <div class="ml-quiz-footer neutral">
          <button type="button" class="ml-btn-secondary" id="ml-bf-cheat-btn">🧠 ${session.showCheat ? "Hide Rule" : "Peek Cheat Rule"}</button>
          <div style="display:flex; gap:8px;">
            <button type="button" class="ml-btn-secondary" id="ml-bf-finish-early">✅ Lock & Finish (${session.bfCorrect} right)</button>
            ${q.type !== "mc" || !session.bfInstant ? `<button type="button" class="ml-btn-primary" id="ml-bf-check">Lock Answer ↵</button>` : ""}
          </div>
        </div>
      `;
    } else if (session.isCorrect) {
      bottomBanner = `
        <div class="ml-quiz-footer correct">
          <div class="ml-fb-copy">
            <div class="ml-fb-title">🔥 Streak: ${session.bfStreak}${hasGoal ? "/" + session.bfGoal : ""} (+8 XP)</div>
            <div class="ml-fb-desc">${fmtMath(q.whyEasy)}</div>
          </div>
          <button type="button" class="ml-btn-primary" id="ml-bf-next">Next Rep →</button>
        </div>
      `;
    } else {
      bottomBanner = `
        <div class="ml-quiz-footer wrong">
          <div class="ml-fb-copy">
            <div class="ml-fb-title">🔨 Streak Reset! Answer: <strong>${fmtMath(q.answer)}</strong> (Queued back in 2 turns!)</div>
            <div class="ml-fb-desc"><strong>Rule:</strong> ${fmtMath(src.cheatCode || q.whyEasy)}</div>
          </div>
          <button type="button" class="ml-btn-danger" id="ml-bf-next">Hammer It Again →</button>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="ml-modal-shell quiz-mode">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-quiz-progress-track">
            <div class="ml-quiz-progress-fill" style="width:${hasGoal ? Math.max(4, lockPct) : 100}%; background:${hasGoal ? "var(--ml-danger, #b23b31)" : "var(--ml-plum, #725385)"};"></div>
          </div>
          <div class="ml-quiz-badges">
            <span class="ml-combo-badge">${hasGoal ? `🔨 ${session.bfStreak}/${session.bfGoal}` : `♾️ Rep #${session.bfReps + 1}`}</span>
            <button type="button" class="ml-btn-mini" id="ml-bf-toggle-inst">${session.bfInstant ? "⚡ Instant" : "👌 Manual"}</button>
          </div>
        </div>

        <div class="ml-quiz-body">
          <div class="ml-quiz-meta">
            <span>${src.icon} ${escapeHtml(src.title)} ${q.isRetry ? "• 🔁 RESCUE REPEAT" : ""}</span>
            <span>Reps: ${session.bfReps} • Best Streak: ${session.bfBestStreak}</span>
          </div>

          ${!session.checked && session.lastFlash ? `<div class="ml-instant-toast ${session.lastFlash.ok ? "ok" : "nope"}">${fmtMath(session.lastFlash.msg)}</div>` : ""}

          <h2 class="ml-question-prompt">${fmtMath(q.prompt)}</h2>
          ${q.visualSvg ? `<div class="ml-q-visual">${q.visualSvg}</div>` : ""}
          ${q.codeBlock ? (CODE_ENGINE ? CODE_ENGINE.renderCodeCardHtml(q.codeBlock) : `<pre class="ml-q-code"><code>${escapeHtml(q.codeBlock)}</code></pre>`) : ""}

          ${session.showCheat ? `
            <div class="ml-easy-box" style="margin-bottom:14px;">
              <strong>🧠 Cheat Rule:</strong> ${fmtMath(src.cheatCode)}<br />
              <span class="ml-viz-sub">${fmtMath(q.hint)}</span>
            </div>
          ` : ""}

          ${inputBlock}
        </div>

        ${bottomBanner}
      </div>
    `;

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);
    document.getElementById("ml-bf-toggle-inst").addEventListener("click", () => {
      session.bfInstant = !session.bfInstant;
      renderBruteforceRunner(modal);
    });

    const cheatBtn = document.getElementById("ml-bf-cheat-btn");
    if (cheatBtn) {
      cheatBtn.addEventListener("click", () => {
        session.showCheat = !session.showCheat;
        renderBruteforceRunner(modal);
      });
    }

    const finEarlyBtn = document.getElementById("ml-bf-finish-early");
    if (finEarlyBtn) {
      finEarlyBtn.addEventListener("click", finishBruteforceSession);
    }

    if (q.type === "mc") {
      modal.querySelectorAll("[data-bf-opt]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (session.checked) return;
          session.selectedOpt = q.options[parseInt(btn.dataset.bfOpt, 10)];
          if (session.bfInstant) gradeBruteforceAnswer();
          else renderBruteforceRunner(modal);
        });
      });
    } else {
      const inp = document.getElementById("ml-bf-text");
      if (inp && !session.checked) {
        if (isFinePointer()) inp.focus();
        inp.addEventListener("input", () => { session.selectedOpt = inp.value; });
        bindQuickPad(modal, "bf", inp, gradeBruteforceAnswer);
      }
    }

    const checkBtn = document.getElementById("ml-bf-check");
    if (checkBtn) checkBtn.addEventListener("click", gradeBruteforceAnswer);

    const nextBtn = document.getElementById("ml-bf-next");
    if (nextBtn) nextBtn.addEventListener("click", advanceBruteforce);
  }

  function gradeBruteforceAnswer() {
    if (!session || session.phase !== "bruteforce" || session.checked) return;
    const q = session.currentQ;
    const raw = session.selectedOpt;
    if (raw === null || String(raw).trim() === "") return;

    const correct = q.type === "mc"
      ? raw === q.answer
      : (DATA.answersMatch ? DATA.answersMatch(raw, q.answer) : normalizeAnswer(raw) === normalizeAnswer(q.answer));
    const elapsedMs = session.questionStart ? Math.max(250, Date.now() - session.questionStart) : 3500;

    session.checked = true;
    session.isCorrect = correct;
    session.bfReps++;

    if (TUTOR) {
      const targetId = (q.sourceNode && q.sourceNode.id) || (session.node && session.node.id !== "bf-mix" ? session.node.id : null);
      if (targetId) {
        TUTOR.recordAttempt(state, { nodeId: targetId, correct, elapsedMs, mode: "node_bruteforce", prompt: q.prompt });
      }
    }

    const src = q.sourceNode || session.node;
    if (correct) {
      AudioFX.playCorrect();
      session.bfCorrect++;
      session.bfStreak++;
      if (session.bfStreak > session.bfBestStreak) session.bfBestStreak = session.bfStreak;
      if (session.bfStreak > session.maxCombo) session.maxCombo = session.bfStreak;
      if (session.bfStreak > state.bestCombo) state.bestCombo = session.bfStreak;
      session.xpEarned += 8;
      state.xp += 8;
      session.lastFlash = {
        ok: true,
        msg: `🔥 +8 XP • ${q.answer} (Streak ${session.bfStreak}${session.bfGoal ? "/" + session.bfGoal : ""})`
      };
      saveState();
      renderTopBar();

      if (session.bfGoal > 0 && session.bfStreak >= session.bfGoal) {
        finishBruteforceSession(true);
        return;
      }
    } else {
      AudioFX.playWrong();
      session.bfStreak = 0;
      session.bfRetryQueue.push({ q, dueRep: session.bfReps + 2 });
      session.lastFlash = {
        ok: false,
        msg: `💡 Ans: ${q.answer} — ${src.cheatCode || q.whyEasy}`
      };
      saveState();
    }
    recordStudyActivity(1);
    saveState();
    if (correct && session.bfInstant) {
      advanceBruteforce();
      return;
    }
    renderModal();
  }

  function advanceBruteforce() {
    if (!session || session.phase !== "bruteforce") return;
    AudioFX.playTap();
    session.currentQ = pullNextBruteforceQuestion();
    session.selectedOpt = null;
    session.checked = false;
    session.isCorrect = false;
    session.showCheat = false;
    session.questionStart = Date.now();
    renderModal();
  }

  function finishBruteforceSession(hitLock) {
    const lockBonus = hitLock ? 30 : 0;
    const gemBonus = hitLock ? 18 : Math.min(15, Math.floor(session.bfCorrect / 2) + 3);
    session.xpEarned += lockBonus;
    session.gemsEarned = gemBonus;
    state.xp += lockBonus;
    state.gems += gemBonus;

    session.originalCount = Math.max(1, session.bfReps);
    session.firstTryCorrect = session.bfCorrect;

    const prevMastery = Object.assign({}, state.nodeMastery);

    for (const n of session.bfNodes) {
      const cur = state.nodeMastery[n.id] || 0;
      if (hitLock || session.bfBestStreak >= 8) state.nodeMastery[n.id] = Math.max(cur, 3);
      else if (session.bfCorrect >= 4) state.nodeMastery[n.id] = Math.max(cur, 2);
    }

    session.newlyUnlocked = TUTOR && typeof TUTOR.getNewlyUnlockedNodes === "function"
      ? TUTOR.getNewlyUnlockedNodes(prevMastery, state.nodeMastery, DATA)
      : [];

    if (hitLock && session.bfGoal >= 10) {
      const bSet = new Set(state.badges || []);
      bSet.add("bruteforce_survivor");
      state.badges = Array.from(bSet);
    }

    evaluateBadges({ perfect: false });
    saveState();
    renderTopBar();
    AudioFX.playLevelUp();
    session.phase = "victory";
    renderModal();
    launchConfetti();
  }

  function renderBriefingPhase(modal) {
    const n = session.node;
    const w = getWorld(n.worldId);
    const lvl = state.nodeMastery[n.id] || 0;
    const stage = getMasteryStage(lvl);
    const slides = LATEX && LATEX.getTutorialSlides ? LATEX.getTutorialSlides(n) : [];
    const idx = Math.max(0, Math.min(slides.length - 1, session.briefSlideIdx || 0));
    const showAll = !!session.briefAllView;

    const uInfo = getUnlockInfo(n.id);
    const linkedForgeQuestId = n.forgeQuestId || (CODE_FORGE && CODE_FORGE.QUESTS ? (CODE_FORGE.QUESTS.find((q) => q.linkedNodeId === n.id) || {}).id : null);

    function buildSlideHtml(slide, sIdx) {
      if (slide.id === "secret") {
        const hasConns = uInfo.prereqs.length > 0 || uInfo.unlocks.length > 0;
        return `
          <div class="ml-tut-slide">
            <div class="ml-hero-kicker">${escapeHtml(slide.kicker)}</div>
            <h3 class="ml-tut-heading">${n.icon} ${escapeHtml(slide.title)}</h3>
            <div class="ml-easy-box" style="font-size:15px; line-height:1.6;">
              ${fmtMath(slide.easyTruth)}
            </div>
            <div class="ml-hero-formula-box">
              <div class="ml-mini-tag">✨ Core Formula / Pattern</div>
              ${fmtMath(slide.heroFormula, true)}
            </div>
            ${n.codeExample && CODE_ENGINE ? `
              <div style="margin-top:12px;">
                ${CODE_ENGINE.renderCodeCardHtml(n.codeExample.code, n.codeExample.lang, { fileName: n.codeExample.fileName })}
                ${n.codeExample.output ? `<div class="ml-code-out-strip"><span>Output:</span><code>${escapeHtml(n.codeExample.output)}</code></div>` : ""}
              </div>
            ` : ""}
            ${hasConns ? `
              <div class="ml-brief-conn-box">
                ${uInfo.prereqs.length > 0 ? `
                  <div class="ml-brief-conn-row">
                    <span class="ml-prereq-lbl">Builds on:</span>
                    ${uInfo.prereqs.map((p) => p.node ? `<button type="button" class="ml-prereq-chip ${p.met ? "met" : "missing"}" data-brief-tree="${p.id}">${p.met ? "✓" : "🔒"} ${escapeHtml(p.node.title)}</button>` : "").join("")}
                  </div>
                ` : ""}
                ${uInfo.unlocks.length > 0 ? `
                  <div class="ml-brief-conn-row">
                    <span class="ml-prereq-lbl">Unlocks next:</span>
                    ${uInfo.unlocks.slice(0, 4).map((u) => `<button type="button" class="ml-prereq-chip unlocks-next" data-brief-tree="${u.id}">🔓 ${escapeHtml(u.node.title)}</button>`).join("")}
                    ${uInfo.unlocks.length > 4 ? `<button type="button" class="ml-prereq-chip unlocks-next" data-brief-tree="${n.id}">+${uInfo.unlocks.length - 4} more →</button>` : ""}
                  </div>
                ` : ""}
              </div>
            ` : ""}
            <details class="ml-scary-toggle">
              <summary>😵 Want a laugh? See how textbooks make this sound scary</summary>
              <div class="ml-scary-strike" style="margin-top:8px;">${fmtMath(slide.scaryVersion)}</div>
            </details>
          </div>
        `;
      }
      if (slide.id === "core") {
        return `
          <div class="ml-tut-slide">
            <div class="ml-hero-kicker">${escapeHtml(slide.kicker)}</div>
            <h3 class="ml-tut-heading">${escapeHtml(slide.title)}</h3>
            <div class="ml-micro-card" style="font-size:15px; line-height:1.65;">
              ${fmtMath(slide.bodyText)}
            </div>
            <div class="ml-hero-formula-box" style="margin-top:12px;">
              <div class="ml-mini-tag">🔍 Concrete Example</div>
              ${fmtMath(slide.highlightFormula, true)}
              ${slide.highlightWhy ? `<div class="ml-viz-sub" style="margin-top:6px;">${fmtMath(slide.highlightWhy)}</div>` : ""}
            </div>
          </div>
        `;
      }
      if (slide.id === "shortcut") {
        return `
          <div class="ml-tut-slide">
            <div class="ml-hero-kicker">${escapeHtml(slide.kicker)}</div>
            <h3 class="ml-tut-heading">${escapeHtml(slide.title)}</h3>
            <div class="ml-micro-card" style="font-size:15px; line-height:1.65; margin-bottom:10px;">
              <div class="ml-micro-label">${escapeHtml(slide.stepA.label)}</div>
              <p style="margin:4px 0 0;">${fmtMath(slide.stepA.text)}</p>
            </div>
            ${slide.stepB ? `
              <div class="ml-micro-card" style="font-size:15px; line-height:1.65; margin-bottom:12px;">
                <div class="ml-micro-label">${escapeHtml(slide.stepB.label)}</div>
                <p style="margin:4px 0 0;">${fmtMath(slide.stepB.text)}</p>
              </div>
            ` : ""}
            <div class="ml-cheat-code-strip">
              <strong>⚡ Golden Cheat Code:</strong> ${fmtMath(slide.cheatCode)}
            </div>
          </div>
        `;
      }
      if (slide.id === "example") {
        const wEx = slide.worked;
        const maxSteps = wEx.steps.length;
        const shown = showAll ? maxSteps : Math.min(maxSteps, Math.max(1, session.workedStepsShown || 1));
        return `
          <div class="ml-tut-slide">
            <div class="ml-hero-kicker">${escapeHtml(slide.kicker)}</div>
            <h3 class="ml-tut-heading">${escapeHtml(wEx.title)}</h3>
            <div class="ml-hero-formula-box">
              <div class="ml-mini-tag">📌 Worked Problem</div>
              ${fmtMath(wEx.problemLatex, true)}
            </div>
            <div class="ml-worked-box">
              ${wEx.steps.slice(0, shown).map((st, stIdx) => `
                <div class="ml-worked-step">
                  <div class="ml-worked-num">${stIdx + 1}</div>
                  <div class="ml-worked-copy">
                    <div class="ml-worked-label">${escapeHtml(st.label)}</div>
                    <div class="ml-worked-math">${fmtMath(st.mathLatex)}</div>
                    <div class="ml-worked-why">${fmtMath(st.plainWhy)}</div>
                  </div>
                </div>
              `).join("")}
              ${!showAll && shown < maxSteps ? `
                <button type="button" class="ml-btn-secondary" id="ml-reveal-ex-step" style="width:100%;">
                  ➕ Reveal Step ${shown + 1} of ${maxSteps} →
                </button>
              ` : `
                <div class="ml-worked-answer">
                  <div class="ml-mini-tag">🎯 Final Clean Answer</div>
                  ${fmtMath(wEx.answerLatex, true)}
                </div>
                ${wEx.commonTrap ? `<div class="ml-cheat-code-strip" style="margin-top:8px;"><strong>⚠️ Watch Out:</strong> ${fmtMath(wEx.commonTrap)}</div>` : ""}
              `}
            </div>
          </div>
        `;
      }
      return `
        <div class="ml-tut-slide">
          <div class="ml-hero-kicker">${escapeHtml(slide.kicker)}</div>
          <h3 class="ml-tut-heading">${escapeHtml(slide.title)}</h3>
          <p class="ml-viz-sub" style="margin:0 0 10px;">${escapeHtml(slide.subtitle)}</p>
          <div class="ml-brief-viz-box">
            <div id="ml-brief-viz-mount"></div>
          </div>
        </div>
      `;
    }

    const slideBodyHtml = slides.length
      ? (showAll ? slides.map((sl, i) => buildSlideHtml(sl, i)).join("") : buildSlideHtml(slides[idx], idx))
      : `<div class="ml-easy-box">${fmtMath(n.easyTruth)}</div>`;

    const isLastSlide = idx >= slides.length - 1;
    const footerHtml = showAll || isLastSlide
      ? `
        ${!showAll && idx > 0 ? `<button type="button" class="ml-btn-secondary" id="ml-brief-prev">← Back</button>` : ""}
        <button type="button" class="ml-btn-primary big" id="ml-start-quiz-btn">
          🚀 Start 5-Question Challenge →
        </button>
      `
      : `
        <button type="button" class="ml-btn-secondary" id="ml-brief-prev" ${idx === 0 ? "disabled" : ""}>← Back</button>
        <button type="button" class="ml-btn-primary" id="ml-brief-next">
          Next: ${escapeHtml(slides[idx + 1].pill)} →
        </button>
      `;

    const isBm = MY_VAULT ? MY_VAULT.isBookmarked(state, n.id) : false;
    const existingNote = MY_VAULT ? MY_VAULT.getLessonNote(state, n.id) : null;
    const noteDrawerOpen = !!session.briefNoteOpen;

    modal.innerHTML = `
      <div class="ml-modal-shell">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-brief-pill" style="--world-color:${w.color}; --world-soft:${w.bgSoft}; --world-border:${w.borderSoft};">
            ${n.icon} ${escapeHtml(n.title)} • ${stage.badge} ${escapeHtml(stage.short)}
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${MY_VAULT ? `<button type="button" class="ml-btn-mini ${isBm ? "active" : ""}" id="ml-brief-bm" title="Bookmark lesson in My Vault">${isBm ? "★" : "☆"}</button>` : ""}
            ${MY_VAULT ? `<button type="button" class="ml-btn-mini ${noteDrawerOpen || existingNote ? "active" : ""}" id="ml-brief-note-toggle" title="Personal Markdown + LaTeX lesson note">📝 ${existingNote ? "Note" : "+ Note"}</button>` : ""}
            ${EDGE ? `<button type="button" class="ml-btn-mini ${state.feynmanVerified && state.feynmanVerified[n.id] ? "active" : ""}" id="ml-brief-feynman" title="Explain this concept in plain English (Feynman Check)">🧠 ${state.feynmanVerified && state.feynmanVerified[n.id] ? "Feynman ✓" : "Feynman"}</button>` : ""}
            ${linkedForgeQuestId && CODE_FORGE ? `<button type="button" class="ml-btn-forge-mini" id="ml-brief-open-forge" title="Try the matching hands-on exercise in Code Studio">Code Studio</button>` : ""}
            <button type="button" class="ml-btn-mini" id="ml-brief-open-tree" title="View prerequisite tree & downstream skills">🔗 Tree</button>
            ${n.bruteforce ? `<button type="button" class="ml-btn-bruteforce-mini" id="ml-brief-bf">🔨 Bruteforce</button>` : ""}
            <button type="button" class="ml-btn-mini" id="ml-brief-toggle-all">${showAll ? "🪜 Step View" : "📄 All Steps"}</button>
            <button type="button" class="ml-btn-mini" id="ml-skip-to-drill">⚡ Drill</button>
            <button type="button" class="ml-btn-mini" id="ml-start-quiz-btn-top">Quiz →</button>
          </div>
        </div>

        ${noteDrawerOpen && MY_VAULT ? `
          <div class="pr-brief-note-drawer">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:6px;">
              <strong style="font-size:12.5px;">📝 Personal Note for ${escapeHtml(n.title)} (Markdown &amp; $LaTeX$)</strong>
              <button type="button" class="ml-btn-mini" id="ml-brief-note-vault">Open in My Vault →</button>
            </div>
            <textarea id="ml-brief-note-ta" class="pr-vault-ta" rows="4" placeholder="Jot your own intuition, mnemonic, or formula takeaway...">${escapeHtml(existingNote ? existingNote.text : "")}</textarea>
          </div>
        ` : ""}

        ${slides.length && !showAll ? `
          <div class="ml-tut-stepper">
            ${slides.map((sl, i) => `
              <button type="button" class="ml-tut-step-pill ${i === idx ? "active" : i < idx ? "done" : ""}" data-brief-step="${i}">
                ${escapeHtml(sl.pill)}
              </button>
            `).join("")}
          </div>
        ` : ""}

        <div class="ml-brief-body">
          ${slideBodyHtml}
        </div>

        <div class="ml-modal-footer" style="display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap;">
          ${footerHtml}
        </div>
      </div>
    `;

    const vizMount = document.getElementById("ml-brief-viz-mount");
    if (vizMount && VIZ) {
      VIZ.mountVisualizer(n.visualizerId, vizMount);
    }

    function goQuiz() {
      AudioFX.playTap();
      session.phase = "quiz";
      session.questionStart = Date.now();
      renderModal();
    }

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);

    const bmBriefBtn = document.getElementById("ml-brief-bm");
    if (bmBriefBtn && MY_VAULT) {
      bmBriefBtn.addEventListener("click", () => {
        AudioFX.playTap();
        MY_VAULT.toggleBookmark(state, n.id);
        saveState();
        renderBriefingPhase(modal);
      });
    }
    const noteToggleBtn = document.getElementById("ml-brief-note-toggle");
    if (noteToggleBtn && MY_VAULT) {
      noteToggleBtn.addEventListener("click", () => {
        AudioFX.playTap();
        session.briefNoteOpen = !session.briefNoteOpen;
        renderBriefingPhase(modal);
      });
    }
    const briefNoteTa = document.getElementById("ml-brief-note-ta");
    if (briefNoteTa && MY_VAULT) {
      briefNoteTa.addEventListener("input", () => {
        MY_VAULT.saveLessonNote(state, n.id, n.title, briefNoteTa.value);
        saveState();
      });
    }
    const briefNoteVaultBtn = document.getElementById("ml-brief-note-vault");
    if (briefNoteVaultBtn && MY_VAULT) {
      briefNoteVaultBtn.addEventListener("click", () => {
        AudioFX.playTap();
        MY_VAULT.openNoteForLesson(state, n);
        state.activeTab = "myvault";
        saveState();
        closeSession();
      });
    }

    const topQuizBtn = document.getElementById("ml-start-quiz-btn-top");
    if (topQuizBtn) topQuizBtn.addEventListener("click", goQuiz);
    const botQuizBtn = document.getElementById("ml-start-quiz-btn");
    if (botQuizBtn) botQuizBtn.addEventListener("click", goQuiz);

    document.getElementById("ml-skip-to-drill").addEventListener("click", () => {
      AudioFX.playTap();
      startNodeSession(n.id, "drill");
    });

    const bfBriefBtn = document.getElementById("ml-brief-bf");
    if (bfBriefBtn) {
      bfBriefBtn.addEventListener("click", () => {
        AudioFX.playTap();
        openBruteforceLauncher(n.id);
      });
    }

    const treeBriefBtn = document.getElementById("ml-brief-open-tree");
    if (treeBriefBtn) {
      treeBriefBtn.addEventListener("click", () => {
        AudioFX.playTap();
        openPrereqModal(n.id);
      });
    }
    const feynBriefBtn = document.getElementById("ml-brief-feynman");
    if (feynBriefBtn && EDGE) {
      feynBriefBtn.addEventListener("click", () => {
        AudioFX.playTap();
        openFeynmanModal(n.id);
      });
    }
    const forgeBriefBtn = document.getElementById("ml-brief-open-forge");
    if (forgeBriefBtn && linkedForgeQuestId) {
      forgeBriefBtn.addEventListener("click", () => {
        AudioFX.playTap();
        state.forgeActiveQuestId = linkedForgeQuestId;
        state.forgeView = "workspace";
        if (CODE_FORGE && CODE_FORGE.openWorkspace) CODE_FORGE.openWorkspace(state.forgeActiveQuestId);
        state.activeTab = "forge";
        saveState();
        closeSession();
      });
    }
    modal.querySelectorAll("[data-copy-code]").forEach((btn) => {
      btn.addEventListener("click", () => {
        try {
          if (navigator.clipboard) navigator.clipboard.writeText(btn.dataset.copyCode);
          btn.textContent = "Copied!";
          setTimeout(() => { btn.textContent = "Copy"; }, 1200);
        } catch (_e) {}
      });
    });

    modal.querySelectorAll("[data-brief-tree]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        openPrereqModal(btn.dataset.briefTree);
      });
    });

    const allToggleBtn = document.getElementById("ml-brief-toggle-all");
    if (allToggleBtn) {
      allToggleBtn.addEventListener("click", () => {
        AudioFX.playTap();
        session.briefAllView = !session.briefAllView;
        renderBriefingPhase(modal);
      });
    }

    modal.querySelectorAll("[data-brief-step]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        session.briefAllView = false;
        session.briefSlideIdx = parseInt(btn.dataset.briefStep, 10);
        renderBriefingPhase(modal);
      });
    });

    const prevBtn = document.getElementById("ml-brief-prev");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if ((session.briefSlideIdx || 0) <= 0) return;
        AudioFX.playTap();
        session.briefSlideIdx--;
        renderBriefingPhase(modal);
      });
    }

    const nextBtn = document.getElementById("ml-brief-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        AudioFX.playTap();
        session.briefSlideIdx = Math.min(slides.length - 1, (session.briefSlideIdx || 0) + 1);
        renderBriefingPhase(modal);
      });
    }

    const revBtn = document.getElementById("ml-reveal-ex-step");
    if (revBtn) {
      revBtn.addEventListener("click", () => {
        AudioFX.playTap();
        session.workedStepsShown = (session.workedStepsShown || 1) + 1;
        renderBriefingPhase(modal);
      });
    }
  }

  function renderQuizPhase(modal) {
    const q = session.questions[session.idx];
    const progressPct = Math.round(((session.idx + (session.checked ? 1 : 0)) / session.questions.length) * 100);
    const heartsBlocked = !state.chillMode && state.hearts <= 0 && !session.checked;

    let inputBlock = "";
    if (q.type === "mc") {
      inputBlock = `
        <div class="${q.optionSvgs ? "ml-opt-grid-svg" : "ml-options-grid"}">
          ${q.options.map((opt, idx) => {
            let cls = q.optionSvgs ? "ml-option-btn ml-opt-svg-btn" : "ml-option-btn";
            if (session.checked) {
              if (opt === q.answer) cls += " correct";
              else if (opt === session.selectedOpt && !session.isCorrect) cls += " wrong";
            } else if (opt === session.selectedOpt) {
              cls += " selected";
            }
            const svgTile = q.optionSvgs && q.optionSvgs[opt] ? `<span class="ml-opt-svg-wrap">${q.optionSvgs[opt]}</span>` : "";
            return `
              <button type="button" class="${cls}" data-opt-idx="${idx}" ${session.checked || heartsBlocked ? "disabled" : ""}>
                <span class="ml-key-num">${idx + 1}</span>
                ${svgTile}
                <span class="${q.optionSvgs ? "ml-opt-svg-lbl" : "ml-opt-text"}">${fmtMath(opt)}</span>
              </button>
            `;
          }).join("")}
        </div>
      `;
    } else {
      inputBlock = `
        <div class="ml-input-answer-wrap">
          <input type="text" id="ml-text-answer" class="ml-answer-input ${session.checked ? (session.isCorrect ? "correct" : "wrong") : ""}"
            placeholder="Type your answer..." value="${escapeHtml(session.selectedOpt || "")}" ${session.checked || heartsBlocked ? "disabled" : ""} autocomplete="off" />
          <div class="ml-input-tip">Tip: Press <strong>Enter</strong> or tap digits to lock!</div>
        </div>
        ${!session.checked && !heartsBlocked ? renderQuickPadHtml("qz") : ""}
      `;
    }

    const activeConf = session.confidence || "sure";
    const confFeedback = session.checked && session.lastConfidenceOutcome ? session.lastConfidenceOutcome : null;
    const isBlindLocked = !!session.blindTopic && !session.checked;
    const blindRevealHtml = session.blindTopic && session.checked && q.sourceTitle ? `
      <div class="pr-blind-reveal">
        <span class="pr-blind-tag">🕶️ Hidden Topic Revealed</span>
        <strong>${q.sourceIcon || "◆"} ${escapeHtml(q.sourceTitle)}</strong>
        ${q.sourceWorldTitle ? `<span class="ml-mini-tag">${escapeHtml(q.sourceWorldTitle)}</span>` : ""}
        ${q.sourceCheatCode ? `<div class="pr-blind-cheat">⚡ ${fmtMath(q.sourceCheatCode)}</div>` : ""}
      </div>
    ` : "";

    let bottomBanner = "";
    if (!session.checked) {
      bottomBanner = `
        <div class="ml-quiz-footer neutral">
          <button type="button" class="ml-btn-secondary" id="ml-hint-btn">💡 ${session.showHint ? "Hide Hint" : "Show Hint"}</button>
          <button type="button" class="ml-btn-primary" id="ml-check-btn" ${heartsBlocked ? "disabled" : ""}>Lock Answer ↵</button>
        </div>
      `;
    } else if (session.isCorrect) {
      bottomBanner = `
        <div class="ml-quiz-footer correct" role="status" aria-live="polite">
          <div class="ml-fb-copy">
            <div class="ml-fb-title">✅ Nice! Wait, see how easy?! (+${15 + Math.min(10, (session.combo - 1) * 3)} XP)${confFeedback && confFeedback.tag === "lucky" ? ` <span class="pr-conf-badge lucky">🎲 ${escapeHtml(confFeedback.headline)}</span>` : ""}</div>
            <div class="ml-fb-desc">${fmtMath(q.whyEasy)}${confFeedback && confFeedback.tag === "lucky" ? ` — ${escapeHtml(confFeedback.detail)}` : ""}</div>
          </div>
          <button type="button" class="ml-btn-primary" id="ml-next-btn">
            ${session.idx + 1 >= session.questions.length ? "Finish Round →" : "Continue →"}
          </button>
        </div>
      `;
    } else {
      bottomBanner = `
        <div class="ml-quiz-footer wrong" role="status" aria-live="polite">
          <div class="ml-fb-copy">
            <div class="ml-fb-title">💡 Answer: <strong>${fmtMath(q.answer)}</strong> ${session.mode === "lesson" ? "(Queued at end to nail it!)" : ""}${confFeedback && confFeedback.tag === "illusion" ? ` <span class="pr-conf-badge illusion">⚠️ ${escapeHtml(confFeedback.headline)}</span>` : confFeedback && confFeedback.tag === "honest_miss" ? ` <span class="pr-conf-badge honest">🧭 ${escapeHtml(confFeedback.headline)}</span>` : ""}</div>
            <div class="ml-fb-desc">${fmtMath(q.whyEasy)}${confFeedback && (confFeedback.tag === "illusion" || confFeedback.tag === "honest_miss") ? ` — ${escapeHtml(confFeedback.detail)}` : ""}</div>
          </div>
          <button type="button" class="ml-btn-danger" id="ml-next-btn">
            ${session.idx + 1 >= session.questions.length ? "See Summary →" : "Got It →"}
          </button>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="ml-modal-shell quiz-mode">
        <div class="ml-modal-top">
          <button type="button" class="ml-close-btn" id="ml-modal-close">✕</button>
          <div class="ml-quiz-progress-track">
            <div class="ml-quiz-progress-fill" style="width:${Math.max(8, progressPct)}%"></div>
          </div>
          <div class="ml-quiz-badges">
            ${q.isRetry ? `<span class="ml-combo-badge">🔁 Retry</span>` : ""}
            ${session.combo >= 2 ? `<span class="ml-combo-badge">🔥 ${session.combo}x</span>` : ""}
            ${WHITEBOARD ? `<button type="button" class="ml-btn-mini ${session.showBoard ? "active" : ""}" id="ml-quiz-toggle-wb" title="Toggle Freehand Whiteboard Scratchpad">✏️ Board</button>` : ""}
            <button type="button" class="ml-btn-mini" id="ml-quiz-toggle-inst">${state.instantAdvance !== false ? "⚡ Instant" : "⏸️ Pause"}</button>
            <span class="ml-heart-badge">${state.chillMode ? "♾️" : "❤️ " + state.hearts}</span>
          </div>
        </div>

        <div class="ml-quiz-body">
          <div class="ml-quiz-meta">
            <span>${isBlindLocked ? "🕶️ <strong>Blind Topic</strong> · Cold Recognition (Identify the concept first)" : `${session.node.icon} ${escapeHtml(session.node.title)}${q.sourceTitle ? ` · Testing: <strong>${escapeHtml(q.sourceTitle)}</strong>` : ""}`}</span>
            <span>${session.mode === "blind_interleave" ? "🕶️ Cold Mix" : session.mode === "drill" ? "⚡ Fresh Procedural Drill" : session.mode === "prereq_testout" ? "⚡ Prereq Test-Out (Need ≥80%)" : "Question"} ${session.idx + 1} / ${session.questions.length}</span>
          </div>

          ${!session.checked && session.lastFlash ? `<div class="ml-instant-toast ${session.lastFlash.ok ? "ok" : "nope"}">${fmtMath(session.lastFlash.msg)}</div>` : ""}

          <h2 class="ml-question-prompt">${fmtMath(q.prompt)}</h2>
          ${q.visualSvg ? `<div class="ml-q-visual">${q.visualSvg}</div>` : ""}
          ${q.codeBlock ? (CODE_ENGINE ? CODE_ENGINE.renderCodeCardHtml(q.codeBlock) : `<pre class="ml-q-code"><code>${escapeHtml(q.codeBlock)}</code></pre>`) : ""}

          ${session.showBoard && WHITEBOARD ? `<div id="ml-quiz-wb-mount" style="margin:10px 0;"></div>` : ""}

          ${session.showHint ? `<div class="ml-hint-box">💡 <strong>Hint:</strong> ${fmtMath(q.hint)}</div>` : ""}

          ${blindRevealHtml}

          ${EDGE && (!ONBOARDING || ONBOARDING.ensureStudioConfig(state).showConfidenceBar !== false) && !session.checked && !heartsBlocked ? `
            <div class="pr-conf-bar" role="group" aria-label="Confidence calibration">
              <span class="pr-conf-lbl">Confidence</span>
              <div class="pr-conf-pills">
                <button type="button" class="pr-conf-btn ${activeConf === "sure" ? "active sure" : ""}" data-conf-lvl="sure" title="Confident — wrong answers here get flagged as Mastery Illusions [Z]">● Sure <kbd>Z</kbd></button>
                <button type="button" class="pr-conf-btn ${activeConf === "half" ? "active half" : ""}" data-conf-lvl="half" title="50/50 narrowed down [X]">◐ 50/50 <kbd>X</kbd></button>
                <button type="button" class="pr-conf-btn ${activeConf === "guess" ? "active guess" : ""}" data-conf-lvl="guess" title="Unsure guess — lucky hits get queued for verification [C]">? Guess <kbd>C</kbd></button>
              </div>
            </div>
          ` : ""}

          ${inputBlock}

          ${!state.chillMode && state.hearts <= 0 ? `
            <div class="ml-out-of-hearts" role="alert">
              <span><strong>💔 0/5 Hearts!</strong> Refill with Gems or switch to <strong>♾️ Chill Mode</strong> to continue:</span>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" class="ml-btn-mini" id="ml-buy-hearts" ${state.gems < 30 ? "disabled" : ""}>◆ Refill 5 Hearts (30◆)</button>
                <button type="button" class="ml-btn-mini" id="ml-enable-chill">Turn On ♾️ Chill Mode</button>
              </div>
            </div>
          ` : ""}
        </div>

        ${bottomBanner}
      </div>
    `;

    document.getElementById("ml-modal-close").addEventListener("click", closeSession);

    const qInstBtn = document.getElementById("ml-quiz-toggle-inst");
    if (qInstBtn) {
      qInstBtn.addEventListener("click", () => {
        state.instantAdvance = state.instantAdvance === false;
        saveState();
        renderQuizPhase(modal);
      });
    }

    const buyHeartsBtn = document.getElementById("ml-buy-hearts");
    if (buyHeartsBtn) {
      buyHeartsBtn.addEventListener("click", () => {
        if (state.gems < 30) return;
        state.gems -= 30;
        state.hearts = 5;
        AudioFX.playLevelUp();
        saveState();
        renderTopBar();
        renderQuizPhase(modal);
      });
    }

    const chillBtn = document.getElementById("ml-enable-chill");
    if (chillBtn) {
      chillBtn.addEventListener("click", () => {
        state.chillMode = true;
        saveState();
        renderTopBar();
        renderQuizPhase(modal);
      });
    }

    if (q.type === "mc") {
      modal.querySelectorAll("[data-opt-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (session.checked || (!state.chillMode && state.hearts <= 0)) return;
          AudioFX.playTap();
          session.selectedOpt = q.options[parseInt(btn.dataset.optIdx, 10)];
          if (state.instantAdvance !== false) submitCurrentAnswer();
          else renderQuizPhase(modal);
        });
      });
    } else {
      const inp = document.getElementById("ml-text-answer");
      if (inp && !session.checked && !heartsBlocked) {
        if (isFinePointer()) inp.focus();
        inp.addEventListener("input", () => {
          session.selectedOpt = inp.value;
        });
        bindQuickPad(modal, "qz", inp, submitCurrentAnswer);
      }
    }

    const hintBtn = document.getElementById("ml-hint-btn");
    if (hintBtn) {
      hintBtn.addEventListener("click", () => {
        AudioFX.playTap();
        session.showHint = !session.showHint;
        renderQuizPhase(modal);
      });
    }

    const qWbBtn = document.getElementById("ml-quiz-toggle-wb");
    if (qWbBtn) {
      qWbBtn.addEventListener("click", () => {
        AudioFX.playTap();
        session.showBoard = !session.showBoard;
        renderQuizPhase(modal);
      });
    }
    const qWbMount = document.getElementById("ml-quiz-wb-mount");
    if (qWbMount && WHITEBOARD) {
      if (!session.wbStrokesByQ) session.wbStrokesByQ = {};
      const qKey = `${session.idx}`;
      WHITEBOARD.mountWhiteboard(qWbMount, {
        height: 195,
        compact: true,
        grid: "dots",
        strokes: session.wbStrokesByQ[qKey] || [],
        onChange: (strokes) => {
          session.wbStrokesByQ[qKey] = strokes;
        }
      });
    }

    const checkBtn = document.getElementById("ml-check-btn");
    if (checkBtn) checkBtn.addEventListener("click", submitCurrentAnswer);

    const nextBtn = document.getElementById("ml-next-btn");
    if (nextBtn) nextBtn.addEventListener("click", advanceQuiz);

    modal.querySelectorAll("[data-conf-lvl]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        session.confidence = btn.dataset.confLvl;
        renderQuizPhase(modal);
      });
    });
  }

  function submitCurrentAnswer() {
    if (!session || session.phase !== "quiz" || session.checked) return;
    if (!state.chillMode && state.hearts <= 0) return;
    const q = session.questions[session.idx];
    const raw = session.selectedOpt;
    if (raw === null || String(raw).trim() === "") return;

    const correct = q.type === "mc"
      ? raw === q.answer
      : (DATA.answersMatch ? DATA.answersMatch(raw, q.answer) : normalizeAnswer(raw) === normalizeAnswer(q.answer));
    const elapsedMs = session.questionStart ? Math.max(250, Date.now() - session.questionStart) : 4000;

    session.checked = true;
    session.isCorrect = correct;

    if (TUTOR) {
      const nid = q.nodeId || q.sourceNodeId || (session.node && session.node.id !== "crack-repair" && !session.node.id.startsWith("skip-") && session.node.id !== "blind-interleave" ? session.node.id : null);
      if (nid) {
        TUTOR.recordAttempt(state, { nodeId: nid, correct, elapsedMs, mode: session.mode, prompt: q.prompt });
      }
    }

    if (session.blindTopic) {
      if (!Array.isArray(session.blindTimesMs)) session.blindTimesMs = [];
      session.blindTimesMs.push(elapsedMs);
    }

    session.lastConfidenceOutcome = null;
    if (EDGE && typeof EDGE.recordConfidenceOutcome === "function") {
      const confNid = q.nodeId || q.sourceNodeId || (session.node && session.node.id) || "";
      const confTitle = q.sourceTitle || (session.node && session.node.title) || "";
      session.lastConfidenceOutcome = EDGE.recordConfidenceOutcome(state, {
        nodeId: confNid,
        nodeTitle: confTitle,
        prompt: q.prompt,
        answer: q.answer,
        confidence: session.confidence || "sure",
        correct,
        elapsedMs
      });
    }

    if (correct) {
      AudioFX.playCorrect();
      session.correctCount++;
      if (!q.isRetry) session.firstTryCorrect++;
      session.combo++;
      if (session.combo > session.maxCombo) session.maxCombo = session.combo;
      if (session.combo > state.bestCombo) state.bestCombo = session.combo;
      const gained = 15 + Math.min(10, (session.combo - 1) * 3);
      session.xpEarned += gained;
      state.xp += gained;
      session.lastFlash = { ok: true, msg: `✅ +${gained} XP! Ans: ${q.answer}` };

      if (session.mode === "repair" && q.mistakeKey) {
        state.mistakes = (state.mistakes || []).filter((m) => m.key !== q.mistakeKey);
        state.resolvedMistakesCount++;
      }
    } else {
      AudioFX.playWrong();
      session.combo = 0;
      session.lastFlash = { ok: false, msg: `💡 Ans: ${q.answer} — ${q.whyEasy}` };
      if (!state.chillMode && state.hearts > 0) state.hearts--;
      if (!q.isRetry && session.mode !== "repair") {
        recordMistake(session.node.id, q);
      }
      if (session.mode === "lesson" && !q.isRetry && session.questions.length < 9) {
        session.questions.push(Object.assign({}, q, { isRetry: true }));
      }
    }

    recordStudyActivity(1);
    saveState();
    renderTopBar();
    // Auto-advance ONLY on calibrated CORRECT answers (pause on wrong, blind-topic reveal, or lucky-guess callout!)
    const shouldPauseForMetacognition = session.blindTopic || (session.lastConfidenceOutcome && session.lastConfidenceOutcome.tag === "lucky");
    if (correct && state.instantAdvance !== false && !shouldPauseForMetacognition) {
      advanceQuiz();
      return;
    }
    renderModal();
  }

  function advanceQuiz() {
    if (!session) return;
    AudioFX.playTap();
    if (session.idx + 1 >= session.questions.length) {
      finishSession();
    } else {
      session.idx++;
      session.selectedOpt = null;
      session.confidence = "sure";
      session.lastConfidenceOutcome = null;
      session.checked = false;
      session.isCorrect = false;
      session.showHint = false;
      session.questionStart = Date.now();
      renderModal();
    }
  }

  function finishSession() {
    session.phase = "victory";
    const pct = Math.round((session.firstTryCorrect / Math.max(1, session.originalCount)) * 100);
    const bonus = pct === 100 ? 25 : pct >= 60 ? 10 : 0;
    const gemBonus = pct === 100 ? 20 : pct >= 60 ? 12 : 6;
    session.xpEarned += bonus;
    session.gemsEarned = gemBonus;
    state.xp += bonus;
    state.gems += gemBonus;

    const prevMastery = Object.assign({}, state.nodeMastery);

    if (session.mode === "skip" && session.worldToSkip) {
      if (pct >= 80) {
        for (const n of DATA.NODES) {
          if (n.worldId === session.worldToSkip) {
            state.nodeMastery[n.id] = Math.max(state.nodeMastery[n.id] || 0, 2);
          }
        }
      }
    } else if (session.mode === "prereq_testout") {
      if (pct >= 80) {
        const toCredit = new Set([...(session.testedPrereqIds || []), ...(session.directMissingIds || [])]);
        for (const pid of toCredit) {
          state.nodeMastery[pid] = Math.max(state.nodeMastery[pid] || 0, 1);
        }
        session.testOutPassed = true;
      } else {
        session.testOutPassed = false;
      }
    } else if (session.mode === "lesson" || session.mode === "drill") {
      const currentLvl = state.nodeMastery[session.node.id] || 0;
      let earnedLvl = currentLvl;
      if (pct === 100) earnedLvl = Math.max(currentLvl, 3);
      else if (pct >= 80) earnedLvl = Math.max(currentLvl, 2);
      else if (pct >= 40) earnedLvl = Math.max(currentLvl, 1);
      state.nodeMastery[session.node.id] = earnedLvl;
    }

    session.newlyUnlocked = TUTOR && typeof TUTOR.getNewlyUnlockedNodes === "function"
      ? TUTOR.getNewlyUnlockedNodes(prevMastery, state.nodeMastery, DATA)
      : [];

    if (session.mode === "blind_interleave" && EDGE) {
      EDGE.ensureEdgeState(state);
      state.edgeStats.interleaveRuns = (state.edgeStats.interleaveRuns || 0) + 1;
      state.edgeStats.interleaveBestPct = Math.max(state.edgeStats.interleaveBestPct || 0, pct);
      if (Array.isArray(session.blindTimesMs) && session.blindTimesMs.length) {
        const sorted = session.blindTimesMs.slice().sort((a, b) => a - b);
        const mid = sorted[Math.floor(sorted.length / 2)];
        const medSec = Math.max(1, Math.round(mid / 100) / 10);
        session.blindMedianSec = medSec;
        if (state.edgeStats.interleaveMedianSec == null || medSec < state.edgeStats.interleaveMedianSec) {
          state.edgeStats.interleaveMedianSec = medSec;
        }
      }
      markDailyStep("recall");
    } else if (session.mode === "srs" || session.mode === "srs_review" || session.mode === "mistakes" || session.mode === "repair") {
      markDailyStep("recall");
    } else if (session.mode === "lesson" || session.mode === "drill" || session.mode === "skip" || session.mode === "prereq_testout") {
      markDailyStep("learn");
    }

    evaluateBadges({ perfect: pct === 100 });
    saveState();
    renderTopBar();
    AudioFX.playLevelUp();
    renderModal();
    launchConfetti();
  }

  function renderVictoryPhase(modal) {
    const pct = Math.round((session.firstTryCorrect / Math.max(1, session.originalCount)) * 100);
    const canRate = session.mode === "lesson" || session.mode === "drill";
    const currentLvl = canRate ? (state.nodeMastery[session.node.id] || 1) : 3;
    const stage = getMasteryStage(currentLvl);
    const newlyUnlocked = Array.isArray(session.newlyUnlocked) ? session.newlyUnlocked : [];
    const targetUnlockNode = session.targetUnlockNodeId
      ? DATA.NODES.find((x) => x.id === session.targetUnlockNodeId)
      : null;

    let headline = pct >= 80 ? "Mastery Locked In." : "Solid Warmup — Momentum Unlocked";
    if (session.mode === "skip") {
      headline = pct >= 80 ? "Era Skip Check Passed" : "Almost — Patch 1-2 Skills in This Era";
    } else if (session.mode === "prereq_testout") {
      headline = session.testOutPassed
        ? `Prerequisites Cleared — ${targetUnlockNode ? targetUnlockNode.title : "Skill"} Unlocked`
        : "Not Quite 80% Yet — Build the Foundation First";
    } else if (session.mode === "repair") {
      headline = "Hidden Cracks Patched";
    } else if (session.mode === "blind_interleave") {
      headline = pct >= 80
        ? `Cold-Recognition Mastery (${session.blindMedianSec ? session.blindMedianSec + "s/Q" : pct + "%"})`
        : `Blind Interleave Complete${session.blindMedianSec ? ` · ${session.blindMedianSec}s/Q Cold Speed` : ""}`;
    } else if (session.mode === "bruteforce") {
      headline = session.bfGoal > 0 && session.bfStreak >= session.bfGoal
        ? `Bruteforce ${session.bfGoal}-Streak Locked In`
        : `Bruteforce Run Complete (${session.bfCorrect} Locked)`;
    }

    modal.innerHTML = `
      <div class="ml-modal-shell victory-mode">
        <canvas id="ml-confetti" class="ml-confetti-canvas"></canvas>
        <div class="ml-victory-body">
          <div class="ml-victory-emblem-wrap">
            ${renderStudioMarkSvg(76)}
          </div>
          <h2>${headline}</h2>
          <p class="ml-victory-sub">${escapeHtml(session.node.title)} • ${escapeHtml(stage.reaction)}</p>

          <div class="ml-victory-stats">
            <div class="ml-vstat">
              <span>⚡ XP & Gems</span>
              <strong>+${session.xpEarned} / +${session.gemsEarned}💎</strong>
            </div>
            <div class="ml-vstat">
              <span>🎯 1st-Try Accuracy</span>
              <strong>${pct}%</strong>
            </div>
            <div class="ml-vstat">
              <span>🔥 Best Combo</span>
              <strong>${session.maxCombo}x</strong>
            </div>
          </div>

          ${newlyUnlocked.length > 0 ? `
            <div class="ml-unlocked-celebration">
              <div class="ml-unlocked-head">🔓 ${newlyUnlocked.length} New Skill${newlyUnlocked.length === 1 ? "" : "s"} Unlocked!</div>
              <div class="ml-unlocked-chips">
                ${newlyUnlocked.slice(0, 6).map((un) => `
                  <button type="button" class="ml-unlocked-btn" data-victory-launch="${un.id}">
                    <span>${un.icon} ${escapeHtml(un.title)}</span>
                    <span class="ml-unlocked-go">Start →</span>
                  </button>
                `).join("")}
              </div>
              ${newlyUnlocked.length > 6 ? `<div class="ml-viz-sub" style="margin-top:6px;">+${newlyUnlocked.length - 6} more skills unlocked on your Skill Path!</div>` : ""}
            </div>
          ` : ""}

          ${canRate ? `
            <div class="ml-self-rate-box">
              <div class="ml-self-rate-title">How does this topic feel now? Stamp your reaction:</div>
              <div class="ml-self-rate-btns">
                ${[1, 2, 3].map((lvlId) => {
                  const st = getMasteryStage(lvlId);
                  return `
                    <button type="button" class="ml-rate-btn ${currentLvl === lvlId ? "active" : ""}" data-rate-lvl="${lvlId}">
                      <span>${st.badge}</span>
                      <span>${escapeHtml(st.label)}</span>
                    </button>
                  `;
                }).join("")}
              </div>
            </div>
          ` : ""}

          <div class="ml-victory-actions">
            ${session.mode === "prereq_testout" && session.testOutPassed && targetUnlockNode ? `
              <button type="button" class="ml-btn-primary" id="ml-launch-unlocked-target">
                🚀 Launch ${escapeHtml(targetUnlockNode.title)} →
              </button>
            ` : ""}
            ${session.mode === "prereq_testout" && !session.testOutPassed && targetUnlockNode ? `
              <button type="button" class="ml-btn-secondary" id="ml-view-target-roadmap">
                🗺️ View Step-by-Step Foundation Path
              </button>
            ` : ""}
            ${canRate ? `<button type="button" class="ml-btn-secondary" id="ml-replay-drill">⚡ 5 Fresh Questions (Procedural)</button>` : ""}
            ${canRate && EDGE ? `<button type="button" class="ml-btn-secondary" id="ml-victory-feynman">🧠 Feynman Check (+30 XP)</button>` : ""}
            ${session.mode === "blind_interleave" ? `<button type="button" class="ml-btn-secondary" id="ml-replay-blind">🕶️ Another 10Q Blind Mix</button>` : ""}
            ${session.mode === "bruteforce" ? `<button type="button" class="ml-btn-secondary" id="ml-replay-bf">🔁 Bruteforce Again</button>` : ""}
            <button type="button" class="${session.mode === "prereq_testout" && session.testOutPassed ? "ml-btn-secondary" : "ml-btn-primary"}" id="ml-victory-done">Back to Skill Path →</button>
          </div>
        </div>
      </div>
    `;

    modal.querySelectorAll("[data-victory-launch]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        startNodeSession(btn.dataset.victoryLaunch, "lesson");
      });
    });

    const launchUnlockedBtn = document.getElementById("ml-launch-unlocked-target");
    if (launchUnlockedBtn && targetUnlockNode) {
      launchUnlockedBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startNodeSession(targetUnlockNode.id, "lesson");
      });
    }

    const viewRoadmapBtn = document.getElementById("ml-view-target-roadmap");
    if (viewRoadmapBtn && targetUnlockNode) {
      viewRoadmapBtn.addEventListener("click", () => {
        AudioFX.playTap();
        openPrereqModal(targetUnlockNode.id);
      });
    }

    modal.querySelectorAll("[data-rate-lvl]").forEach((btn) => {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        const prev = Object.assign({}, state.nodeMastery);
        state.nodeMastery[session.node.id] = parseInt(btn.dataset.rateLvl, 10);
        const extraUnlocked = TUTOR && TUTOR.getNewlyUnlockedNodes ? TUTOR.getNewlyUnlockedNodes(prev, state.nodeMastery, DATA) : [];
        if (extraUnlocked.length) {
          const seen = new Set((session.newlyUnlocked || []).map((x) => x.id));
          for (const ex of extraUnlocked) if (!seen.has(ex.id)) session.newlyUnlocked.push(ex);
        }
        saveState();
        renderVictoryPhase(modal);
      });
    });

    const replayBtn = document.getElementById("ml-replay-drill");
    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startNodeSession(session.node.id, "drill");
      });
    }

    const vicFeynBtn = document.getElementById("ml-victory-feynman");
    if (vicFeynBtn && EDGE) {
      vicFeynBtn.addEventListener("click", () => {
        AudioFX.playTap();
        openFeynmanModal(session.node.id);
      });
    }

    const replayBlindBtn = document.getElementById("ml-replay-blind");
    if (replayBlindBtn && EDGE) {
      replayBlindBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startBlindInterleaveSession(session.interleavePreset || "smart", 10);
      });
    }

    const replayBfBtn = document.getElementById("ml-replay-bf");
    if (replayBfBtn) {
      replayBfBtn.addEventListener("click", () => {
        AudioFX.playTap();
        startBruteforceSession(session.bfNodes.map((n) => n.id), session.bfGoal, session.bfInstant);
      });
    }

    document.getElementById("ml-victory-done").addEventListener("click", () => {
      AudioFX.playTap();
      closeSession();
    });
  }

  function launchConfetti() {
    const canvas = document.getElementById("ml-confetti");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth || 600;
    canvas.height = canvas.offsetHeight || 420;
    const colors = ["#2d6a4f", "#35628c", "#b36a22", "#9e4765", "#725385", "#c88b32"];
    const pieces = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 80,
      w: 7 + Math.random() * 6,
      h: 5 + Math.random() * 5,
      vy: 2 + Math.random() * 3.5,
      vx: -1.5 + Math.random() * 3,
      rot: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    let frames = 0;
    function tick() {
      if (!document.getElementById("ml-confetti") || frames > 120) return;
      frames++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += 0.08;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  document.addEventListener("keydown", (e) => {
    // Global Instant Search Shortcut: Ctrl+K / Cmd+K (or '/' when not typing in an input)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (session && session.phase === "search") closeSession();
      else openGlobalSearch("");
      return;
    }
    const tag = e.target && e.target.tagName;
    if (!session && e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      openGlobalSearch("");
      return;
    }

    if (session && (session.phase === "search" || session.phase === "shop" || session.phase === "backup" || session.phase === "bf-picker" || session.phase === "feynman")) {
      if (e.key === "Escape") {
        closeSession();
      }
      return;
    }

    if (session && session.phase === "briefing") {
      if (e.key === "Escape") {
        closeSession();
        return;
      }
      const modal = document.getElementById("ml-modal");
      if (e.key === "ArrowLeft" && (session.briefSlideIdx || 0) > 0) {
        e.preventDefault();
        session.briefSlideIdx--;
        renderBriefingPhase(modal);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextB = document.getElementById("ml-brief-next") || document.getElementById("ml-start-quiz-btn");
        if (nextB) nextB.click();
        return;
      }
      if (e.key === "Enter" && (!e.target || e.target.tagName !== "SUMMARY")) {
        const rev = document.getElementById("ml-reveal-ex-step");
        if (rev) {
          e.preventDefault();
          rev.click();
          return;
        }
        const go = document.getElementById("ml-brief-next") || document.getElementById("ml-start-quiz-btn");
        if (go) {
          e.preventDefault();
          go.click();
        }
      }
      return;
    }

    if (session && session.phase === "bruteforce") {
      const q = session.currentQ;
      if (e.key === "Escape") {
        closeSession();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (!session.checked) gradeBruteforceAnswer();
        else advanceBruteforce();
        return;
      }
      if (q && q.type === "mc" && !session.checked && ["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (q.options[idx] !== undefined) {
          AudioFX.playTap();
          session.selectedOpt = q.options[idx];
          if (session.bfInstant) gradeBruteforceAnswer();
          else renderBruteforceRunner(document.getElementById("ml-modal"));
        }
      }
      return;
    }

    if (session && session.phase === "quiz") {
      const q = session.questions[session.idx];
      if (e.key === "Escape") {
        closeSession();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (!session.checked) submitCurrentAnswer();
        else advanceQuiz();
        return;
      }
      if (q.type === "mc" && !session.checked && (state.chillMode || state.hearts > 0) && ["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (q.options[idx] !== undefined) {
          AudioFX.playTap();
          session.selectedOpt = q.options[idx];
          if (state.instantAdvance !== false) submitCurrentAnswer();
          else renderModal();
        }
      }
      if (EDGE && !session.checked && tag !== "INPUT" && tag !== "TEXTAREA") {
        const kLow = e.key.toLowerCase();
        if (kLow === "z" || kLow === "x" || kLow === "c") {
          AudioFX.playTap();
          session.confidence = kLow === "z" ? "sure" : kLow === "x" ? "half" : "guess";
          renderModal();
        }
      }
      return;
    }

    if (state.activeTab === "memorize" && MEM && ((MEM.isMultBfTypingActive && MEM.isMultBfTypingActive()) || (MEM.isCourseTypingActive && MEM.isCourseTypingActive()))) {
      const inpId = MEM.isMultBfTypingActive() ? "ml-mbf-type-inp" : "ml-mc-type-inp";
      const formId = MEM.isMultBfTypingActive() ? "ml-mbf-type-form" : "ml-mc-type-form";
      const inp = document.getElementById(inpId);
      if (inp && document.activeElement !== inp) {
        if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          inp.value = (inp.value || "") + e.key;
          return;
        }
        if (e.key === "Backspace") {
          e.preventDefault();
          inp.value = (inp.value || "").slice(0, -1);
          return;
        }
        if (e.key === "Enter") {
          e.preventDefault();
          const form = document.getElementById(formId);
          if (form) form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
          return;
        }
      }
    }

    if (state.activeTab === "gym" && MEM && MEM.isSprintActive() && ["1", "2", "3", "4"].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const btn = document.querySelector(`[data-sp-opt="${idx}"]`);
      if (btn) btn.click();
      return;
    }

    if (state.activeTab === "memorize" && MEM && MEM.isCourseChoicesActive() && ["1", "2", "3", "4"].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const btns = document.querySelectorAll("[data-mc-opt]");
      if (btns[idx]) btns[idx].click();
      return;
    }

    if (state.activeTab === "memorize" && MEM && MEM.isMultBfChoicesActive() && ["1", "2", "3", "4"].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const btns = document.querySelectorAll("[data-mbf-opt]");
      if (btns[idx]) btns[idx].click();
      return;
    }

    if (state.activeTab === "exam" && EXAM_MODE && EXAM_MODE.isRunnerActive && EXAM_MODE.isRunnerActive()) {
      const mainEl = document.getElementById("ml-main");
      if (mainEl && EXAM_MODE.handleKeydown(e, mainEl, state, DATA, { onTap: () => AudioFX.playTap() })) {
        return;
      }
    }

    if (state.activeTab === "myvault" && MY_VAULT && MY_VAULT.handleKeydown) {
      const mainEl = document.getElementById("ml-main");
      if (mainEl && MY_VAULT.handleKeydown(e, mainEl, state, DATA, {
        onTap: () => AudioFX.playTap(),
        onSave: () => { saveState(); renderNavTabs(); },
        onCardReviewed: (q) => {
          if (q >= 3) AudioFX.playCorrect();
          else AudioFX.playTap();
          state.xp += q >= 3 ? 6 : 2;
          recordStudyActivity(1);
          saveState();
          renderTopBar();
          renderNavTabs();
        }
      })) {
        return;
      }
    }

    if (state.activeTab === "tutor" && TUTOR && TUTOR.isGauntletActive() && ["1", "2", "3", "4"].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const btn = document.querySelector(`[data-g-opt="${idx}"]`);
      if (btn) btn.click();
    }
  });

  function renderFooter() {
    const footer = document.getElementById("ml-footer");
    if (!footer) return;
    const modeTag = BUILD.runtime === "standalone" ? "Standalone HTML" : "Workspace";
    footer.innerHTML = `
      <div class="ml-footer-left">
        <strong>Primer Studio v${escapeHtml(BUILD.version)}</strong>
        <span>· ${escapeHtml(BUILD.codename)}</span>
        <span>· Build <code>#${escapeHtml(BUILD.buildHash || "dev")}</code></span>
        ${BUILD.builtAt ? `<span>· ${escapeHtml(BUILD.builtAt)}</span>` : ""}
        <span>· ${modeTag}</span>
      </div>
      <button type="button" class="ml-footer-btn" id="ml-footer-ver-btn">What's New & Build Info →</button>
    `;
    const btn = document.getElementById("ml-footer-ver-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        AudioFX.playTap();
        openChangelogModal();
      });
    }
  }

  function renderForgeTab(main) {
    if (!CODE_FORGE) {
      main.innerHTML = `<div class="ml-viz-card"><p>Code Forge module is loading...</p></div>`;
      return;
    }
    CODE_FORGE.renderCodeForgeView(main, state, DATA, {
      onSave: () => saveState(),
      onQuestCleared: (quest, firstClear) => {
        AudioFX.playLevelUp();
        if (firstClear) {
          state.xp += quest.xp || 50;
          state.gems += quest.gems || 12;
          recordStudyActivity(2);
          evaluateBadges();
          launchConfetti();
        }
        saveState();
        renderTopBar();
        renderNavTabs();
      },
      onQuestFail: () => {
        AudioFX.playWrong();
      },
      onOpenNode: (nodeId) => {
        AudioFX.playTap();
        startNodeSession(nodeId, "lesson");
      }
    });
  }

  function renderExamTab(main) {
    if (!EXAM_MODE) {
      main.innerHTML = `<div class="ml-viz-card"><p>Exam Mode module is loading...</p></div>`;
      return;
    }
    EXAM_MODE.renderExamModeView(main, state, DATA, {
      onTap: () => AudioFX.playTap(),
      onSave: () => saveState(),
      onOpenNode: (nodeId) => {
        AudioFX.playTap();
        startNodeSession(nodeId, "lesson", true);
      },
      onOpenVaultDeck: (deckId) => {
        AudioFX.playTap();
        if (MY_VAULT && MY_VAULT.openDeckStudyById) {
          MY_VAULT.openDeckStudyById(state, deckId);
        } else if (MY_VAULT && MY_VAULT.openDeckById) {
          MY_VAULT.openDeckById(deckId);
        }
        state.activeTab = "myvault";
        saveState();
        renderApp();
      },
      onExamComplete: (grade, logMistakes) => {
        AudioFX.playLevelUp();
        state.xp += Math.max(30, grade.totalCorrect * 8);
        state.gems += Math.max(10, Math.round(grade.rawPct / 4));
        recordStudyActivity(Math.max(2, Math.round(grade.totalItems / 4)));
        if (logMistakes && Array.isArray(grade.itemReviews)) {
          for (const item of grade.itemReviews) {
            if (item.status === "wrong" && item.q && item.q.linkedNodeId) {
              recordMistake(item.q.linkedNodeId, item.q);
            }
            if (TUTOR && item.q && item.q.linkedNodeId && item.status !== "blank") {
              TUTOR.recordAttempt(state, {
                nodeId: item.q.linkedNodeId,
                correct: item.status === "correct",
                elapsedMs: Math.max(2500, (grade.avgSecPerItem || 12) * 1000),
                mode: "exam_mock",
                prompt: item.q.prompt
              });
            }
          }
        }
        evaluateBadges();
        if (grade.verdictTone === "green") launchConfetti();
        saveState();
        renderTopBar();
        renderNavTabs();
      }
    });
  }

  function renderConstellationTab(main) {
    if (!CONSTELLATION) {
      main.innerHTML = `<div class="ml-viz-card"><p>Constellation Map module is loading...</p></div>`;
      return;
    }
    CONSTELLATION.renderConstellationView(main, state, DATA, TUTOR, {
      onTap: () => AudioFX.playTap(),
      onSave: () => {
        saveState();
        renderNavTabs();
      },
      onOpenNode: (nodeId) => {
        AudioFX.playTap();
        const u = getUnlockInfo(nodeId);
        if (u.locked) openPrereqModal(nodeId);
        else startNodeSession(nodeId, "lesson");
      },
      onOpenLessonNote: (node) => {
        AudioFX.playTap();
        if (MY_VAULT) MY_VAULT.openNoteForLesson(state, node);
        state.activeTab = "myvault";
        saveState();
        renderApp();
      },
      onOpenMistakes: () => {
        AudioFX.playTap();
        startMistakeRepairSession();
      }
    });
  }

  function renderWorkStudioTab(main) {
    if (!WORK_STUDIO) {
      main.innerHTML = `<div class="ml-viz-card"><p>Work Studio module is loading...</p></div>`;
      return;
    }
    WORK_STUDIO.renderWorkStudioView(main, state, DATA, {
      onTap: () => AudioFX.playTap(),
      onStepOk: () => AudioFX.playCorrect(),
      onStepFail: () => AudioFX.playWrong(),
      onOpenNode: (nodeId) => {
        AudioFX.playTap();
        startNodeSession(nodeId, "lesson", true);
      },
      onSolved: (prob, firstClear) => {
        AudioFX.playLevelUp();
        markDailyStep("learn");
        if (firstClear || prob.procedural) {
          state.xp += prob.xp || 40;
          state.gems += prob.gems || 9;
          recordStudyActivity(2);
          evaluateBadges();
          launchConfetti();
        }
        saveState();
        renderTopBar();
        renderNavTabs();
      }
    });
  }

  function renderMyVaultTab(main) {
    if (!MY_VAULT) {
      main.innerHTML = `<div class="ml-viz-card"><p>My Vault module is loading...</p></div>`;
      return;
    }
    MY_VAULT.renderMyVaultView(main, state, DATA, {
      onTap: () => AudioFX.playTap(),
      onSave: () => {
        saveState();
        renderNavTabs();
      },
      onOpenNode: (nodeId) => {
        AudioFX.playTap();
        startNodeSession(nodeId, "lesson", true);
      },
      onCardReviewed: (q) => {
        if (q >= 3) AudioFX.playCorrect();
        else AudioFX.playTap();
        state.xp += q >= 3 ? 6 : 2;
        markDailyStep("recall");
        recordStudyActivity(1);
        saveState();
        renderTopBar();
        renderNavTabs();
      }
    });
  }

  function renderApp() {
    applyThemeClass();
    renderTopBar();
    renderNavTabs();
    renderFooter();
    const main = document.getElementById("ml-main");
    if (!main) return;
    if (state.activeTab === "constellation") renderConstellationTab(main);
    else if (state.activeTab === "work") renderWorkStudioTab(main);
    else if (state.activeTab === "myvault") renderMyVaultTab(main);
    else if (state.activeTab === "exam") renderExamTab(main);
    else if (state.activeTab === "forge") renderForgeTab(main);
    else if (state.activeTab === "tutor") renderTutorTab(main);
    else if (state.activeTab === "memorize") renderMemorizeTab(main);
    else if (state.activeTab === "gym") renderGymTab(main);
    else if (state.activeTab === "traps") renderTrapsView(main);
    else if (state.activeTab === "lab") renderLabView(main);
    else if (state.activeTab === "cheatsheet") renderCheatSheetView(main);
    else renderPathView(main);
  }

  window.PRIMER_PERSONAL = {
    mergeImportedState,
    encodeSaveCode,
    decodeSaveCode,
    compressSavePayload,
    decompressSavePayload,
    pickGymModeForWorld,
    buildDailySessionPlan
  };

  function bootApp() {
    if (ONBOARDING) {
      const scBoot = ONBOARDING.ensureStudioConfig(state);
      if (scBoot.defaultFocusMin && !focusTimer.running) {
        focusTimer.presetMin = scBoot.defaultFocusMin;
        focusTimer.remainingSec = scBoot.defaultFocusMin * 60;
      }
      if (!new URLSearchParams(window.location.search).get("tab") && scBoot.landingTab && state.onboardingCompleted) {
        state.activeTab = scBoot.landingTab;
      }
    }
    renderApp();
    checkIncomingSyncHash();

    const finishBoot = () => {
      if (ONBOARDING && (!state.onboardingCompleted || pendingBootIntro)) {
        pendingBootIntro = false;
        openStudioIntro("hero", false);
        return;
      }
      if (pendingBootEdgeAction && EDGE) {
        const act = pendingBootEdgeAction;
        pendingBootEdgeAction = null;
        if (act === "interleave") startBlindInterleaveSession("smart", 10);
        else if (act === "illusions") startBlindInterleaveSession("illusions", 10);
        else if (act === "feynman") {
          const rec = getRecommendedNode();
          openFeynmanModal(rec ? rec.id : (DATA.NODES[0] && DATA.NODES[0].id));
        }
      }
    };

    if (ONBOARDING && typeof ONBOARDING.runBootSplash === "function") {
      ONBOARDING.runBootSplash(state, BUILD, finishBoot);
    } else {
      finishBoot();
    }

    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("hashchange", checkIncomingSyncHash);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootApp);
  } else {
    bootApp();
  }
})();
