// Primer Studio — My Vault: Personal Notes, Bookmarks & Custom SM-2 Flashcard Decks
(function (global) {
  "use strict";

  const DAY_MS = 24 * 60 * 60 * 1000;

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function fmtMath(text, block) {
    if (global.MATHLINGO_LATEX && typeof global.MATHLINGO_LATEX.formatMath === "function") {
      return global.MATHLINGO_LATEX.formatMath(String(text == null ? "" : text), !!block);
    }
    return escapeHtml(text == null ? "" : text);
  }

  function ensureVaultState(state) {
    if (!state) return;
    if (!Array.isArray(state.userBookmarks)) state.userBookmarks = [];
    if (!state.userNotes || typeof state.userNotes !== "object") state.userNotes = {};
    if (!Array.isArray(state.userDecks)) state.userDecks = [];
  }

  function uid(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  }

  // ==================== SM-2 SPACED REPETITION ENGINE ====================
  function createCard(front, back) {
    return {
      id: uid("card"),
      front: String(front || "").trim(),
      back: String(back || "").trim(),
      ease: 2.5,
      interval: 0,
      reps: 0,
      lapses: 0,
      dueAt: Date.now()
    };
  }

  function computeNextSM2(card, quality, nowMs) {
    const now = nowMs || Date.now();
    let ease = typeof card.ease === "number" ? card.ease : 2.5;
    let interval = typeof card.interval === "number" ? card.interval : 0;
    let reps = typeof card.reps === "number" ? card.reps : 0;
    let lapses = typeof card.lapses === "number" ? card.lapses : 0;
    let dueAt = now;

    if (quality === 1) {
      // Again — relearn in 10 minutes
      reps = 0;
      interval = 0;
      lapses += 1;
      ease = Math.max(1.3, ease - 0.2);
      dueAt = now + 10 * 60 * 1000;
    } else if (quality === 2) {
      // Hard
      ease = Math.max(1.3, ease - 0.15);
      if (reps === 0) {
        interval = 1;
        reps = 1;
      } else {
        interval = Math.max(1, Math.round(interval * 1.2));
        reps += 1;
      }
      dueAt = now + interval * DAY_MS;
    } else if (quality === 3) {
      // Good
      if (reps === 0) interval = 1;
      else if (reps === 1) interval = 6;
      else interval = Math.max(2, Math.round(interval * ease));
      reps += 1;
      dueAt = now + interval * DAY_MS;
    } else {
      // Easy (4)
      ease = Math.min(3.0, ease + 0.15);
      if (reps === 0) interval = 4;
      else if (reps === 1) interval = 8;
      else interval = Math.max(4, Math.round(interval * ease * 1.3));
      reps += 1;
      dueAt = now + interval * DAY_MS;
    }

    return { ease: Number(ease.toFixed(2)), interval, reps, lapses, dueAt };
  }

  function reviewCardSM2(card, quality, nowMs) {
    const next = computeNextSM2(card, quality, nowMs);
    Object.assign(card, next);
    return card;
  }

  function formatIntervalLabel(days, isTenMin) {
    if (isTenMin) return "10m";
    if (days < 1) return "<1d";
    if (days === 1) return "1d";
    if (days < 30) return `${days}d`;
    const mo = Math.round((days / 30) * 10) / 10;
    return `${mo}mo`;
  }

  function previewIntervals(card) {
    const now = Date.now();
    return {
      1: formatIntervalLabel(0, true),
      2: formatIntervalLabel(computeNextSM2(card, 2, now).interval, false),
      3: formatIntervalLabel(computeNextSM2(card, 3, now).interval, false),
      4: formatIntervalLabel(computeNextSM2(card, 4, now).interval, false)
    };
  }

  function countDueCards(deck, nowMs) {
    const now = nowMs || Date.now();
    return (deck.cards || []).filter((c) => (c.dueAt || 0) <= now).length;
  }

  // ==================== SMART HANDOUT / MARKDOWN / CSV / ANKI IMPORTER ====================
  function parseCsvRow(line) {
    const out = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          cur += ch;
        }
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        out.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    out.push(cur.trim());
    return out;
  }

  function parseCardsFromText(rawText) {
    const text = String(rawText == null ? "" : rawText).replace(/\r\n/g, "\n").trim();
    if (!text) return [];

    const cards = [];
    const seen = new Set();
    const pushCard = (f, b) => {
      const front = String(f || "").trim();
      const back = String(b || "").trim();
      if (!front || !back) return;
      const key = `${front.toLowerCase()}||${back.toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);
      cards.push({ front, back });
    };

    // 1. Check Q: ... / A: ... blocks
    if (/^Q\s*:/im.test(text) && /^A\s*:/im.test(text)) {
      const blocks = text.split(/(?=^Q\s*:)/im);
      for (const blk of blocks) {
        const m = blk.match(/^Q\s*:\s*([\s\S]*?)\nA\s*:\s*([\s\S]*)$/i);
        if (m) pushCard(m[1], m[2]);
      }
      if (cards.length > 0) return cards;
    }

    // 2. Check Markdown Headings (## Heading followed by body lines)
    if (/^#{2,3}\s+.+/m.test(text) && !text.includes("::")) {
      const sections = text.split(/(?=^#{2,3}\s+)/m);
      for (const sec of sections) {
        const lines = sec.trim().split("\n");
        if (lines.length < 2) continue;
        const head = lines[0].replace(/^#{2,3}\s+/, "").trim();
        const body = lines
          .slice(1)
          .map((l) => l.replace(/^\s*[-*•]\s+/, "").trim())
          .filter(Boolean)
          .join(" · ");
        if (head && body) pushCard(head, body);
      }
      if (cards.length > 0) return cards;
    }

    // 3. Line-by-line delimiters: "::", "\t", " | ", or CSV ","
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("#")) continue;

      if (line.includes("::")) {
        const idx = line.indexOf("::");
        pushCard(line.slice(0, idx), line.slice(idx + 2));
        continue;
      }
      if (line.includes("\t")) {
        const parts = line.split("\t");
        if (parts.length >= 2) {
          if (i === 0 && /^front|question|term$/i.test(parts[0].trim())) continue;
          pushCard(parts[0], parts.slice(1).join(" "));
        }
        continue;
      }
      if (line.includes("|")) {
        const parts = line.split("|").map((s) => s.trim()).filter(Boolean);
        if (parts.length >= 2 && !/^[-:]+$/.test(parts[0])) {
          if (i === 0 && /^front|question|term$/i.test(parts[0])) continue;
          pushCard(parts[0], parts.slice(1).join(" | "));
        }
        continue;
      }
      if (line.includes(",")) {
        const cols = parseCsvRow(line);
        if (cols.length >= 2) {
          if (i === 0 && /^front|question|term$/i.test(cols[0])) continue;
          pushCard(cols[0], cols.slice(1).join(", "));
        }
        continue;
      }
      // Fallback: "Term - Definition" or "Term: Definition"
      const colonIdx = line.indexOf(": ");
      if (colonIdx > 1 && colonIdx < 80) {
        pushCard(line.slice(0, colonIdx), line.slice(colonIdx + 2));
      }
    }

    return cards;
  }

  // ==================== SAFE MARKDOWN + LATEX NOTE RENDERER ====================
  function renderNoteMarkdown(raw) {
    const lines = String(raw == null ? "" : raw).replace(/\r\n/g, "\n").split("\n");
    const out = [];
    let inList = false;

    const closeList = () => {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
    };

    for (const line of lines) {
      const trim = line.trim();
      if (!trim) {
        closeList();
        continue;
      }
      if (/^###\s+/.test(trim)) {
        closeList();
        out.push(`<h4 class="pr-md-h4">${fmtMath(trim.replace(/^###\s+/, ""))}</h4>`);
      } else if (/^##\s+/.test(trim)) {
        closeList();
        out.push(`<h3 class="pr-md-h3">${fmtMath(trim.replace(/^##\s+/, ""))}</h3>`);
      } else if (/^[-*•]\s+/.test(trim)) {
        if (!inList) {
          out.push('<ul class="pr-md-ul">');
          inList = true;
        }
        out.push(`<li>${fmtMath(trim.replace(/^[-*•]\s+/, ""))}</li>`);
      } else {
        closeList();
        out.push(`<p class="pr-md-p">${fmtMath(trim)}</p>`);
      }
    }
    closeList();
    return out.join("") || `<p class="pr-md-empty">Empty note — click Edit to add Markdown &amp; $LaTeX$.</p>`;
  }

  const STARTER_DECK_TEMPLATE = {
    title: "PH CET & STEM High-Yield Starter",
    description: "8 essential high-frequency formulas, Filipino rules, and exam traps to test SM-2 recall right away.",
    cards: [
      { front: "UPCAT Guessing Penalty Rule", back: "$\\text{Net Score} = R - 0.25W$. Guessing is neutral with 4 options, positive once you eliminate $\\ge 1$ option." },
      { front: "Gibbs Free Energy Spontaneity ($\\Delta G$)", back: "$\\Delta G = \\Delta H - T\\Delta S$. Convert $\\Delta S$ from J/K to kJ/K ($\\div 1000$). $\\Delta G < 0$ is spontaneous." },
      { front: "Filipino: 'ng' vs 'nang'", back: "Use **ng** before nouns/objects (*kumain ng mangga*). Use **nang** for *when*, *so that*, adverbs (*tumakbo nang mabilis*), and repeated verbs (*takbo nang takbo*)." },
      { front: "Filipino KWF Malumi Stress Rule", back: "Penultimate stress + glottal stop at end; the grave accent (`paiwa`) ALWAYS sits on the **final vowel** (*batà, luhà, punò, tubò*)." },
      { front: "Parallel Resistors Shortcut ($R_1 \\parallel R_2$)", back: "$R_p = \\frac{R_1 R_2}{R_1 + R_2}$. Always smaller than the smallest branch resistor." },
      { front: "Kinematics Time-Free Equation", back: "$v_f^2 = v_0^2 + 2a\\Delta x$ — instant tool when time $t$ isn't given." },
      { front: "Work Rate Combined Formula", back: "Two workers taking $A$ and $B$ hours finish together in $\\frac{AB}{A + B}$ hours." },
      { front: "Civil Service Exam (CSE) Passing Gate", back: "Minimum **80.00%** general rating (both Professional & Sub-Professional)." }
    ]
  };

  // ==================== BOOKMARK & LESSON NOTE HELPERS ====================
  function isBookmarked(state, nodeId) {
    ensureVaultState(state);
    return state.userBookmarks.includes(nodeId);
  }

  function toggleBookmark(state, nodeId) {
    ensureVaultState(state);
    const idx = state.userBookmarks.indexOf(nodeId);
    if (idx >= 0) {
      state.userBookmarks.splice(idx, 1);
      return false;
    }
    state.userBookmarks.unshift(nodeId);
    return true;
  }

  function getLessonNote(state, nodeId) {
    ensureVaultState(state);
    return state.userNotes[`node:${nodeId}`] || null;
  }

  function saveLessonNote(state, nodeId, title, text) {
    ensureVaultState(state);
    const key = `node:${nodeId}`;
    const clean = String(text || "").trim();
    if (!clean) {
      delete state.userNotes[key];
      return null;
    }
    state.userNotes[key] = {
      id: key,
      nodeId,
      title: title || nodeId,
      text: clean,
      updatedAt: Date.now()
    };
    return state.userNotes[key];
  }

  function getVaultSummary(state) {
    ensureVaultState(state);
    const now = Date.now();
    let cardCount = 0;
    let dueCount = 0;
    for (const d of state.userDecks) {
      const list = d.cards || [];
      cardCount += list.length;
      dueCount += countDueCards(d, now);
    }
    return {
      deckCount: state.userDecks.length,
      cardCount,
      dueCount,
      noteCount: Object.keys(state.userNotes).length,
      bookmarkCount: state.userBookmarks.length
    };
  }

  // ==================== MY VAULT VIEW STATE & RENDERER ====================
  let ui = {
    subTab: "decks", // "decks" | "notes" | "bookmarks"
    activeDeckId: null,
    deckMode: "browse", // "browse" | "study" | "quiz" | "import" | "edit"
    studyQueue: [],
    studyIdx: 0,
    studyFlipped: false,
    studyDoneCount: 0,
    quizQueue: [],
    quizIdx: 0,
    quizScore: 0,
    quizAnswered: null,
    importText: "",
    importTitle: "",
    importDesc: "",
    importTargetDeckId: "__new__",
    activeNoteKey: null,
    notePreviewMode: false,
    noteSearch: ""
  };

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function startStudySession(deck, reviewAll) {
    const now = Date.now();
    const due = (deck.cards || []).filter((c) => reviewAll || (c.dueAt || 0) <= now);
    ui.activeDeckId = deck.id;
    ui.deckMode = "study";
    ui.studyQueue = shuffle(due.length > 0 ? due : (deck.cards || []));
    ui.studyIdx = 0;
    ui.studyFlipped = false;
    ui.studyDoneCount = 0;
  }

  function startQuizSession(deck) {
    const cards = deck.cards || [];
    if (cards.length < 4) return;
    const pool = shuffle(cards).slice(0, Math.min(12, cards.length));
    ui.quizQueue = pool.map((card) => {
      const wrongs = shuffle(cards.filter((c) => c.id !== card.id)).slice(0, 3).map((c) => c.back);
      return {
        card,
        options: shuffle([card.back, ...wrongs])
      };
    });
    ui.activeDeckId = deck.id;
    ui.deckMode = "quiz";
    ui.quizIdx = 0;
    ui.quizScore = 0;
    ui.quizAnswered = null;
  }

  function renderMyVaultView(container, state, DATA, hooks) {
    if (!container) return;
    ensureVaultState(state);
    const summary = getVaultSummary(state);
    const nodeMap = new Map((DATA && DATA.NODES ? DATA.NODES : []).map((n) => [n.id, n]));
    const worldMap = new Map((DATA && DATA.WORLDS ? DATA.WORLDS : []).map((w) => [w.id, w]));

    const activeDeck = state.userDecks.find((d) => d.id === ui.activeDeckId) || state.userDecks[0] || null;
    if (activeDeck && !ui.activeDeckId) ui.activeDeckId = activeDeck.id;

    let bodyHtml = "";

    if (ui.subTab === "decks") {
      if (ui.deckMode === "import") {
        const parsedPreview = parseCardsFromText(ui.importText);
        bodyHtml = `
          <div class="pr-vault-panel">
            <div class="pr-vault-panel-head">
              <div>
                <h2 class="pr-vault-h2">Create or Import Custom SM-2 Deck</h2>
                <p class="ml-viz-sub">Paste class handouts, Markdown headings, Anki TSV, CSV, <code>Front :: Back</code>, or <code>Q:/A:</code> — or upload a <code>.md / .txt / .csv</code> file.</p>
              </div>
              <button type="button" class="ml-btn-mini" id="pr-mv-cancel-import">← Back to Decks</button>
            </div>

            <div class="pr-import-grid">
              <div class="pr-import-form">
                <div class="pr-field-row">
                  <label class="pr-field-lbl">Destination Deck</label>
                  <select id="pr-mv-imp-target" class="ml-search-input">
                    <option value="__new__" ${ui.importTargetDeckId === "__new__" ? "selected" : ""}>+ Create Brand New Deck</option>
                    ${state.userDecks.map((d) => `<option value="${escapeHtml(d.id)}" ${ui.importTargetDeckId === d.id ? "selected" : ""}>Append to: ${escapeHtml(d.title)} (${(d.cards || []).length})</option>`).join("")}
                  </select>
                </div>

                ${
                  ui.importTargetDeckId === "__new__"
                    ? `
                  <div class="pr-field-row">
                    <label class="pr-field-lbl">Deck Title</label>
                    <input type="text" id="pr-mv-imp-title" class="ml-search-input" placeholder="e.g. BIO2 Genetics Handout, UPCAT Filipino Traps..." value="${escapeHtml(ui.importTitle)}" />
                  </div>
                  <div class="pr-field-row">
                    <label class="pr-field-lbl">Description (optional)</label>
                    <input type="text" id="pr-mv-imp-desc" class="ml-search-input" placeholder="Short description of what this deck covers" value="${escapeHtml(ui.importDesc)}" />
                  </div>
                `
                    : ""
                }

                <div class="pr-field-row">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                    <label class="pr-field-lbl">Paste Notes / Cards (supports $LaTeX$)</label>
                    <label class="ml-btn-mini" style="cursor:pointer;">
                      📄 Upload .md / .txt / .csv
                      <input type="file" id="pr-mv-imp-file" accept=".md,.txt,.csv,.tsv,text/plain,text/markdown,text/csv" style="display:none;" />
                    </label>
                  </div>
                  <textarea id="pr-mv-imp-text" class="pr-vault-ta" rows="10" placeholder="Examples:
Ohm's Law :: $V = IR$
Kinetic Energy :: $KE = \\frac{1}{2}mv^2$

OR Markdown:
## Mitosis
Cell division producing 2 identical diploid daughter cells.

OR Q:/A:
Q: What is the 1987 Constitution's Bill of Rights article?
A: Article III">${escapeHtml(ui.importText)}</textarea>
                </div>

                <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
                  <button type="button" class="ml-btn-primary" id="pr-mv-do-import" ${parsedPreview.length === 0 ? "disabled" : ""}>
                    Import ${parsedPreview.length} Card${parsedPreview.length === 1 ? "" : "s"} into Deck →
                  </button>
                  <button type="button" class="ml-btn-secondary" id="pr-mv-fill-example">Paste Format Example</button>
                </div>
              </div>

              <div class="pr-import-preview">
                <div class="pr-field-lbl" style="margin-bottom:8px;">Live Parse Preview (<strong id="pr-mv-prev-count">${parsedPreview.length}</strong> cards detected)</div>
                <div class="pr-preview-list" id="pr-mv-prev-list">
                  ${
                    parsedPreview.length === 0
                      ? `<div class="ml-viz-sub">Start typing or upload a file on the left — parsed cards appear here live.</div>`
                      : parsedPreview
                          .slice(0, 12)
                          .map(
                            (c, i) => `
                        <div class="pr-prev-card">
                          <div class="pr-prev-front"><span>#${i + 1}</span> ${fmtMath(c.front)}</div>
                          <div class="pr-prev-back">${fmtMath(c.back)}</div>
                        </div>
                      `
                          )
                          .join("") +
                        (parsedPreview.length > 12 ? `<div class="ml-viz-sub">+ ${parsedPreview.length - 12} more cards ready to import</div>` : "")
                  }
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (ui.deckMode === "study" && activeDeck) {
        const curCard = ui.studyQueue[ui.studyIdx] || null;
        if (!curCard) {
          bodyHtml = `
            <div class="pr-vault-panel" style="text-align:center; padding:34px 20px;">
              <div class="ml-hero-kicker">SM-2 SESSION COMPLETE</div>
              <h2 class="pr-vault-h2" style="margin-top:6px;">✓ Reviewed ${ui.studyDoneCount} Card${ui.studyDoneCount === 1 ? "" : "s"} in "${escapeHtml(activeDeck.title)}"</h2>
              <p class="ml-viz-sub" style="margin:8px auto 18px; max-width:480px;">Intervals have been scheduled via SM-2. Due cards will resurface right before your forgetting curve drops.</p>
              <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                <button type="button" class="ml-btn-primary" id="pr-mv-back-deck">← Back to Deck</button>
                <button type="button" class="ml-btn-secondary" id="pr-mv-study-all-again">↻ Practice Full Deck Again</button>
              </div>
            </div>
          `;
        } else {
          const ivals = previewIntervals(curCard);
          const pct = Math.round(((ui.studyIdx) / Math.max(1, ui.studyQueue.length)) * 100);
          bodyHtml = `
            <div class="pr-vault-panel">
              <div class="pr-vault-panel-head">
                <div>
                  <span class="ml-hero-kicker">SM-2 ACTIVE RECALL · ${escapeHtml(activeDeck.title)}</span>
                  <div class="ml-viz-sub">Card ${ui.studyIdx + 1} of ${ui.studyQueue.length} · Ease ${curCard.ease || 2.5} · Reps ${curCard.reps || 0}</div>
                </div>
                <button type="button" class="ml-btn-mini" id="pr-mv-back-deck">✕ Exit Study</button>
              </div>
              <div class="ml-progress-track" style="margin:10px 0 18px;"><div class="ml-progress-fill" style="width:${Math.max(5, pct)}%"></div></div>

              <div class="pr-flashcard ${ui.studyFlipped ? "flipped" : ""}" id="pr-mv-flashcard" tabindex="0" role="button" aria-label="Flip flashcard">
                <div class="pr-fc-side-lbl">${ui.studyFlipped ? "ANSWER / BACK" : "PROMPT / FRONT"}</div>
                <div class="pr-fc-front">${fmtMath(curCard.front)}</div>
                ${
                  ui.studyFlipped
                    ? `<div class="pr-fc-divider"></div><div class="pr-fc-back">${fmtMath(curCard.back)}</div>`
                    : `<div class="pr-fc-tap-hint">Click card or press <strong>Space</strong> to reveal answer</div>`
                }
              </div>

              ${
                ui.studyFlipped
                  ? `
                <div class="pr-sm2-bar">
                  <button type="button" class="pr-sm2-btn again" data-sm2-q="1"><strong>1 · Again</strong><span>${ivals[1]}</span></button>
                  <button type="button" class="pr-sm2-btn hard" data-sm2-q="2"><strong>2 · Hard</strong><span>${ivals[2]}</span></button>
                  <button type="button" class="pr-sm2-btn good" data-sm2-q="3"><strong>3 · Good</strong><span>${ivals[3]}</span></button>
                  <button type="button" class="pr-sm2-btn easy" data-sm2-q="4"><strong>4 · Easy</strong><span>${ivals[4]}</span></button>
                </div>
              `
                  : `
                <div style="display:flex; justify-content:center; margin-top:16px;">
                  <button type="button" class="ml-btn-primary big" id="pr-mv-reveal">Show Answer (Space)</button>
                </div>
              `
              }
            </div>
          `;
        }
      } else if (ui.deckMode === "quiz" && activeDeck) {
        const curQ = ui.quizQueue[ui.quizIdx] || null;
        if (!curQ) {
          const pct = Math.round((ui.quizScore / Math.max(1, ui.quizQueue.length)) * 100);
          bodyHtml = `
            <div class="pr-vault-panel" style="text-align:center; padding:34px 20px;">
              <div class="ml-hero-kicker">DECK AUTO-QUIZ COMPLETE</div>
              <h2 class="pr-vault-h2" style="margin-top:6px;">${ui.quizScore} / ${ui.quizQueue.length} Correct (${pct}%)</h2>
              <p class="ml-viz-sub" style="margin:8px auto 18px;">Auto-generated 4-choice drill from "${escapeHtml(activeDeck.title)}".</p>
              <div style="display:flex; gap:10px; justify-content:center;">
                <button type="button" class="ml-btn-primary" id="pr-mv-back-deck">← Back to Deck</button>
                <button type="button" class="ml-btn-secondary" id="pr-mv-quiz-retry">↻ New Auto-Quiz</button>
              </div>
            </div>
          `;
        } else {
          bodyHtml = `
            <div class="pr-vault-panel">
              <div class="pr-vault-panel-head">
                <div>
                  <span class="ml-hero-kicker">AUTO-QUIZ · ${escapeHtml(activeDeck.title)}</span>
                  <div class="ml-viz-sub">Question ${ui.quizIdx + 1} of ${ui.quizQueue.length} · Score: ${ui.quizScore}</div>
                </div>
                <button type="button" class="ml-btn-mini" id="pr-mv-back-deck">✕ Exit Quiz</button>
              </div>
              <h3 class="pr-vault-quiz-q">${fmtMath(curQ.card.front)}</h3>
              <div class="ml-options-grid">
                ${curQ.options
                  .map((opt, idx) => {
                    let cls = "ml-option-btn";
                    if (ui.quizAnswered !== null) {
                      if (opt === curQ.card.back) cls += " correct";
                      else if (idx === ui.quizAnswered) cls += " wrong";
                    }
                    return `
                    <button type="button" class="${cls}" data-mv-qopt="${idx}" ${ui.quizAnswered !== null ? "disabled" : ""}>
                      <span class="ml-key-num">${idx + 1}</span>
                      <span class="ml-opt-text">${fmtMath(opt)}</span>
                    </button>
                  `;
                  })
                  .join("")}
              </div>
              ${
                ui.quizAnswered !== null
                  ? `<div style="margin-top:14px; display:flex; justify-content:flex-end;">
                      <button type="button" class="ml-btn-primary" id="pr-mv-quiz-next">${ui.quizIdx + 1 >= ui.quizQueue.length ? "See Score →" : "Next Question →"}</button>
                    </div>`
                  : ""
              }
            </div>
          `;
        }
      } else {
        // Deck Library + Active Deck Cards Manager
        bodyHtml = `
          <div class="pr-vault-decks-layout">
            <aside class="pr-vault-deck-list">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:10px;">
                <strong style="font-size:13px;">Your Decks (${state.userDecks.length})</strong>
                <button type="button" class="ml-btn-mini" id="pr-mv-open-import">+ New / Import</button>
              </div>
              ${
                state.userDecks.length === 0
                  ? `
                <div class="pr-vault-empty-card">
                  <p>No custom decks yet. Import a class handout or load our PH CET starter pack.</p>
                  <div style="display:flex; flex-direction:column; gap:8px; margin-top:10px;">
                    <button type="button" class="ml-btn-primary" id="pr-mv-open-import-2">+ Import Handout / Create Deck</button>
                    <button type="button" class="ml-btn-secondary" id="pr-mv-load-starter">✨ Load PH CET Starter Deck (8 Cards)</button>
                  </div>
                </div>
              `
                  : state.userDecks
                      .map((d) => {
                        const due = countDueCards(d);
                        const active = activeDeck && activeDeck.id === d.id;
                        return `
                      <button type="button" class="pr-deck-item ${active ? "active" : ""}" data-mv-deck="${escapeHtml(d.id)}">
                        <div class="pr-deck-item-top">
                          <strong>${escapeHtml(d.title)}</strong>
                          <span class="pr-due-pill ${due > 0 ? "has-due" : ""}">${due > 0 ? `${due} due` : "All caught up"}</span>
                        </div>
                        <div class="pr-deck-item-sub">${(d.cards || []).length} cards${d.description ? ` · ${escapeHtml(d.description.slice(0, 48))}` : ""}</div>
                      </button>
                    `;
                      })
                      .join("")
              }
            </aside>

            <section class="pr-vault-deck-detail">
              ${
                activeDeck
                  ? `
                <div class="pr-vault-panel">
                  <div class="pr-vault-panel-head">
                    <div>
                      <h2 class="pr-vault-h2">${escapeHtml(activeDeck.title)}</h2>
                      <p class="ml-viz-sub">${escapeHtml(activeDeck.description || "Custom SM-2 spaced repetition deck")} · <strong>${(activeDeck.cards || []).length} cards</strong> (${countDueCards(activeDeck)} due now)</p>
                    </div>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                      <button type="button" class="ml-btn-primary" id="pr-mv-study-due" ${(activeDeck.cards || []).length === 0 ? "disabled" : ""}>▶ Study SM-2 (${countDueCards(activeDeck) > 0 ? countDueCards(activeDeck) + " Due" : "All"})</button>
                      <button type="button" class="ml-btn-secondary" id="pr-mv-start-quiz" ${(activeDeck.cards || []).length < 4 ? "disabled title='Need at least 4 cards for auto-quiz'" : ""}>⚡ Auto-Quiz</button>
                      <button type="button" class="ml-btn-mini" id="pr-mv-print-deck">🖨️ Print PDF</button>
                      <button type="button" class="ml-btn-mini" id="pr-mv-export-csv">⬇ CSV</button>
                      <button type="button" class="ml-btn-mini" id="pr-mv-del-deck" title="Delete this deck">🗑</button>
                    </div>
                  </div>

                  <form id="pr-mv-add-card-form" class="pr-quick-card-form">
                    <input type="text" id="pr-mv-new-front" class="ml-search-input" placeholder="Front prompt (supports $LaTeX$)..." required />
                    <input type="text" id="pr-mv-new-back" class="ml-search-input" placeholder="Back answer / explanation..." required />
                    <button type="submit" class="ml-btn-primary">+ Add Card</button>
                  </form>

                  <div class="pr-card-table">
                    ${
                      (activeDeck.cards || []).length === 0
                        ? `<div class="ml-viz-sub" style="padding:16px 0;">This deck is empty — add a card above or import from notes.</div>`
                        : (activeDeck.cards || [])
                            .map((c) => {
                              const isDue = (c.dueAt || 0) <= Date.now();
                              const daysLeft = Math.max(0, Math.ceil(((c.dueAt || 0) - Date.now()) / DAY_MS));
                              return `
                            <div class="pr-card-row">
                              <div class="pr-card-row-body">
                                <div class="pr-card-row-front">${fmtMath(c.front)}</div>
                                <div class="pr-card-row-back">${fmtMath(c.back)}</div>
                              </div>
                              <div class="pr-card-row-meta">
                                <span class="pr-due-pill ${isDue ? "has-due" : ""}">${isDue ? "Due" : `in ${daysLeft}d`}</span>
                                <button type="button" class="ml-btn-mini" data-mv-del-card="${escapeHtml(c.id)}" title="Delete card">✕</button>
                              </div>
                            </div>
                          `;
                            })
                            .join("")
                    }
                  </div>
                </div>
              `
                  : `
                <div class="pr-vault-panel" style="padding:32px; text-align:center;">
                  <h2 class="pr-vault-h2">Turn Any Handout into SM-2 Recall in 10 Seconds</h2>
                  <p class="ml-viz-sub" style="max-width:520px; margin:8px auto 18px;">Paste Markdown headings, CSV, Anki TSV, or <code>Term :: Definition</code> notes from your classes. Everything stays 100% offline and exports cleanly inside your Primer backup JSON.</p>
                  <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <button type="button" class="ml-btn-primary" id="pr-mv-open-import-3">+ Create or Import Deck</button>
                    <button type="button" class="ml-btn-secondary" id="pr-mv-load-starter-2">✨ Load Starter Deck</button>
                  </div>
                </div>
              `
              }
            </section>
          </div>
        `;
      }
    } else if (ui.subTab === "notes") {
      const allNotes = Object.values(state.userNotes).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      const q = (ui.noteSearch || "").toLowerCase().trim();
      const filteredNotes = q
        ? allNotes.filter((n) => (n.title || "").toLowerCase().includes(q) || (n.text || "").toLowerCase().includes(q))
        : allNotes;
      const activeNote = (ui.activeNoteKey && state.userNotes[ui.activeNoteKey]) || filteredNotes[0] || null;
      if (activeNote && !ui.activeNoteKey) ui.activeNoteKey = activeNote.id;

      bodyHtml = `
        <div class="pr-vault-decks-layout">
          <aside class="pr-vault-deck-list">
            <div style="display:flex; gap:6px; margin-bottom:10px;">
              <input type="search" id="pr-mv-note-search" class="ml-search-input" style="min-width:0; flex:1;" placeholder="Filter notes..." value="${escapeHtml(ui.noteSearch)}" />
              <button type="button" class="ml-btn-mini" id="pr-mv-new-note">+ Note</button>
            </div>
            ${
              filteredNotes.length === 0
                ? `<div class="pr-vault-empty-card"><p>No study notes yet. Click <strong>+ Note</strong> or press <strong>📝 Note</strong> inside any lesson to annotate it with Markdown &amp; $LaTeX$.</p></div>`
                : filteredNotes
                    .map(
                      (n) => `
                  <button type="button" class="pr-deck-item ${activeNote && activeNote.id === n.id ? "active" : ""}" data-mv-note="${escapeHtml(n.id)}">
                    <div class="pr-deck-item-top">
                      <strong>${escapeHtml(n.title || "Untitled Note")}</strong>
                      <span class="pr-due-pill">${n.nodeId ? "Lesson" : "Free"}</span>
                    </div>
                    <div class="pr-deck-item-sub">${escapeHtml((n.text || "").slice(0, 64))}</div>
                  </button>
                `
                    )
                    .join("")
            }
          </aside>

          <section class="pr-vault-deck-detail">
            ${
              activeNote
                ? `
              <div class="pr-vault-panel">
                <div class="pr-vault-panel-head">
                  <input type="text" id="pr-mv-note-title" class="pr-note-title-input" value="${escapeHtml(activeNote.title || "")}" placeholder="Note title..." />
                  <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    ${activeNote.nodeId ? `<button type="button" class="ml-btn-mini" id="pr-mv-note-open-node">Open Lesson →</button>` : ""}
                    <button type="button" class="ml-btn-mini ${ui.notePreviewMode ? "active" : ""}" id="pr-mv-note-preview">${ui.notePreviewMode ? "✎ Edit" : "👁 Preview"}</button>
                    <button type="button" class="ml-btn-mini" id="pr-mv-note-to-deck" title="Parse headings or :: lines into flashcards">⚡ Send to Deck</button>
                    <button type="button" class="ml-btn-mini" id="pr-mv-print-notes">🖨️ Print PDF</button>
                    <button type="button" class="ml-btn-mini" id="pr-mv-del-note">🗑</button>
                  </div>
                </div>
                ${
                  ui.notePreviewMode
                    ? `<div class="pr-note-preview-box">${renderNoteMarkdown(activeNote.text)}</div>`
                    : `<textarea id="pr-mv-note-body" class="pr-vault-ta" rows="15" placeholder="Write study notes using ## Headings, - bullets, and $LaTeX$ math like $F = ma$ or $\\int x^2 dx$...">${escapeHtml(activeNote.text || "")}</textarea>`
                }
                <div class="ml-viz-sub" style="margin-top:8px;">Auto-saved locally · Supports <code>## Headings</code>, <code>- bullets</code>, and <code>$LaTeX$</code> math.</div>
              </div>
            `
                : `
              <div class="pr-vault-panel" style="padding:32px; text-align:center;">
                <h2 class="pr-vault-h2">Your Personal Markdown + LaTeX Notebook</h2>
                <p class="ml-viz-sub" style="margin:8px auto 16px; max-width:480px;">Write clean formula summaries, attach annotations to any of the 222 lessons, and print them straight to PDF.</p>
                <button type="button" class="ml-btn-primary" id="pr-mv-new-note-2">+ Create Your First Note</button>
              </div>
            `
            }
          </section>
        </div>
      `;
    } else {
      // Bookmarks tab
      const starredNodes = state.userBookmarks.map((id) => nodeMap.get(id)).filter(Boolean);
      bodyHtml = `
        <div class="pr-vault-panel">
          <div class="pr-vault-panel-head">
            <div>
              <h2 class="pr-vault-h2">Bookmarked Lessons (${starredNodes.length})</h2>
              <p class="ml-viz-sub">Star any lesson from its briefing modal or the Constellation Map to pin it here for rapid review.</p>
            </div>
          </div>
          ${
            starredNodes.length === 0
              ? `<div class="ml-viz-sub" style="padding:24px 0; text-align:center;">No bookmarked lessons yet. Open any lesson and click <strong>★ Bookmark</strong>!</div>`
              : `
            <div class="pr-bm-grid">
              ${starredNodes
                .map((n) => {
                  const w = worldMap.get(n.worldId) || { title: n.worldId, color: "#8eb8a3" };
                  const lvl = (state.nodeMastery && state.nodeMastery[n.id]) || 0;
                  const note = getLessonNote(state, n.id);
                  return `
                  <article class="pr-bm-card">
                    <div class="pr-bm-top">
                      <span class="pr-work-tag">${escapeHtml(w.title.split(":")[0])}</span>
                      <span class="pr-due-pill">Lv ${lvl}/3</span>
                    </div>
                    <h3 class="pr-bm-title">${n.icon} ${fmtMath(n.title)}</h3>
                    <p class="pr-bm-sub">${fmtMath(n.tagline)}</p>
                    ${note ? `<div class="pr-bm-note-snip">📝 ${escapeHtml(note.text.slice(0, 90))}</div>` : ""}
                    <div class="pr-bm-actions">
                      <button type="button" class="ml-btn-primary" data-mv-open-node="${escapeHtml(n.id)}">Study →</button>
                      <button type="button" class="ml-btn-mini" data-mv-note-node="${escapeHtml(n.id)}">${note ? "Edit Note" : "+ Note"}</button>
                      <button type="button" class="ml-btn-mini" data-mv-unstar="${escapeHtml(n.id)}" title="Remove bookmark">★</button>
                    </div>
                  </article>
                `;
                })
                .join("")}
            </div>
          `
          }
        </div>
      `;
    }

    container.innerHTML = `
      <div class="pr-vault-shell">
        <header class="pr-studio-hero">
          <div>
            <div class="ml-hero-kicker">MY VAULT · PERSONAL KNOWLEDGE &amp; SM-2 DECKS</div>
            <h1 class="pr-studio-title">Your Own Study Brain, 100% Offline</h1>
            <p class="pr-studio-sub">Import class handouts into SM-2 flashcards, write Markdown + $LaTeX$ notes on any lesson, and pin high-yield topics—backed up inside your single save file.</p>
          </div>
          <div class="pr-studio-hero-actions">
            <div class="pr-stat-pill"><strong>${summary.dueCount}</strong><span>Cards Due</span></div>
            <div class="pr-stat-pill"><strong>${summary.noteCount}</strong><span>Notes</span></div>
            <div class="pr-stat-pill"><strong>${summary.bookmarkCount}</strong><span>Bookmarked</span></div>
          </div>
        </header>

        <div class="pr-vault-subtabs">
          <button type="button" class="pr-pill-btn ${ui.subTab === "decks" ? "active" : ""}" data-mv-tab="decks">🃏 Custom Decks (${summary.deckCount})</button>
          <button type="button" class="pr-pill-btn ${ui.subTab === "notes" ? "active" : ""}" data-mv-tab="notes">📝 Study Notebook (${summary.noteCount})</button>
          <button type="button" class="pr-pill-btn ${ui.subTab === "bookmarks" ? "active" : ""}" data-mv-tab="bookmarks">★ Bookmarks (${summary.bookmarkCount})</button>
        </div>

        ${bodyHtml}
      </div>
    `;

    const rerender = () => renderMyVaultView(container, state, DATA, hooks);
    const save = () => {
      if (hooks && hooks.onSave) hooks.onSave();
    };
    const tap = () => {
      if (hooks && hooks.onTap) hooks.onTap();
    };

    // Sub-tab switches
    container.querySelectorAll("[data-mv-tab]").forEach((b) => {
      b.addEventListener("click", () => {
        tap();
        ui.subTab = b.dataset.mvTab;
        if (ui.subTab === "decks" && ui.deckMode !== "browse") ui.deckMode = "browse";
        rerender();
      });
    });

    // Open Import
    ["pr-mv-open-import", "pr-mv-open-import-2", "pr-mv-open-import-3"].forEach((id) => {
      const b = document.getElementById(id);
      if (b) {
        b.addEventListener("click", () => {
          tap();
          ui.deckMode = "import";
          rerender();
        });
      }
    });

    // Load Starter Deck
    ["pr-mv-load-starter", "pr-mv-load-starter-2"].forEach((id) => {
      const b = document.getElementById(id);
      if (b) {
        b.addEventListener("click", () => {
          tap();
          const newDeck = {
            id: uid("deck"),
            title: STARTER_DECK_TEMPLATE.title,
            description: STARTER_DECK_TEMPLATE.description,
            createdAt: Date.now(),
            cards: STARTER_DECK_TEMPLATE.cards.map((c) => createCard(c.front, c.back))
          };
          state.userDecks.unshift(newDeck);
          ui.activeDeckId = newDeck.id;
          ui.deckMode = "browse";
          save();
          rerender();
        });
      }
    });

    // Deck select
    container.querySelectorAll("[data-mv-deck]").forEach((b) => {
      b.addEventListener("click", () => {
        tap();
        ui.activeDeckId = b.dataset.mvDeck;
        ui.deckMode = "browse";
        rerender();
      });
    });

    // Import mode bindings
    const cancelImp = document.getElementById("pr-mv-cancel-import");
    if (cancelImp) {
      cancelImp.addEventListener("click", () => {
        tap();
        ui.deckMode = "browse";
        rerender();
      });
    }

    const impTarget = document.getElementById("pr-mv-imp-target");
    if (impTarget) {
      impTarget.addEventListener("change", () => {
        ui.importTargetDeckId = impTarget.value;
        rerender();
      });
    }

    const impTitle = document.getElementById("pr-mv-imp-title");
    if (impTitle) {
      impTitle.addEventListener("input", () => {
        ui.importTitle = impTitle.value;
      });
    }
    const impDesc = document.getElementById("pr-mv-imp-desc");
    if (impDesc) {
      impDesc.addEventListener("input", () => {
        ui.importDesc = impDesc.value;
      });
    }

    const impText = document.getElementById("pr-mv-imp-text");
    const doImpBtn = document.getElementById("pr-mv-do-import");
    const prevCount = document.getElementById("pr-mv-prev-count");
    const prevList = document.getElementById("pr-mv-prev-list");
    function refreshImportPreview() {
      const parsed = parseCardsFromText(ui.importText);
      if (prevCount) prevCount.textContent = String(parsed.length);
      if (doImpBtn) {
        doImpBtn.disabled = parsed.length === 0;
        doImpBtn.textContent = `Import ${parsed.length} Card${parsed.length === 1 ? "" : "s"} into Deck →`;
      }
      if (prevList) {
        prevList.innerHTML =
          parsed.length === 0
            ? `<div class="ml-viz-sub">No cards recognized yet. Try <code>Term :: Definition</code> or <code>## Heading</code> + body.</div>`
            : parsed
                .slice(0, 12)
                .map(
                  (c, i) => `
              <div class="pr-prev-card">
                <div class="pr-prev-front"><span>#${i + 1}</span> ${fmtMath(c.front)}</div>
                <div class="pr-prev-back">${fmtMath(c.back)}</div>
              </div>
            `
                )
                .join("") + (parsed.length > 12 ? `<div class="ml-viz-sub">+ ${parsed.length - 12} more cards ready to import</div>` : "");
      }
    }

    if (impText) {
      impText.addEventListener("input", () => {
        ui.importText = impText.value;
        refreshImportPreview();
      });
    }

    const impFile = document.getElementById("pr-mv-imp-file");
    if (impFile) {
      impFile.addEventListener("change", (ev) => {
        const f = ev.target.files && ev.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => {
          ui.importText = String(reader.result || "");
          if (!ui.importTitle && ui.importTargetDeckId === "__new__") {
            ui.importTitle = f.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
          }
          rerender();
        };
        reader.readAsText(f);
      });
    }

    const fillEx = document.getElementById("pr-mv-fill-example");
    if (fillEx) {
      fillEx.addEventListener("click", () => {
        tap();
        ui.importTitle = ui.importTitle || "Physics & Calc Quick Sheet";
        ui.importText = [
          "Newton's 2nd Law :: $F_{\\text{net}} = ma$",
          "Chain Rule :: $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$",
          "Ideal Gas Law :: $PV = nRT$ (Temperature $T$ always in Kelvin!)",
          "Power in DC Circuit :: $P = VI = I^2R = V^2/R$"
        ].join("\n");
        rerender();
      });
    }

    if (doImpBtn) {
      doImpBtn.addEventListener("click", () => {
        const parsed = parseCardsFromText(ui.importText);
        if (parsed.length === 0) return;
        tap();
        const newCards = parsed.map((c) => createCard(c.front, c.back));
        if (ui.importTargetDeckId === "__new__") {
          const deck = {
            id: uid("deck"),
            title: (ui.importTitle || "").trim() || `Study Deck ${state.userDecks.length + 1}`,
            description: (ui.importDesc || "").trim(),
            createdAt: Date.now(),
            cards: newCards
          };
          state.userDecks.unshift(deck);
          ui.activeDeckId = deck.id;
        } else {
          const target = state.userDecks.find((d) => d.id === ui.importTargetDeckId);
          if (target) {
            target.cards = (target.cards || []).concat(newCards);
            ui.activeDeckId = target.id;
          }
        }
        ui.importText = "";
        ui.importTitle = "";
        ui.importDesc = "";
        ui.deckMode = "browse";
        save();
        rerender();
      });
    }

    // Active deck actions
    const addCardForm = document.getElementById("pr-mv-add-card-form");
    if (addCardForm && activeDeck) {
      addCardForm.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const fEl = document.getElementById("pr-mv-new-front");
        const bEl = document.getElementById("pr-mv-new-back");
        const f = fEl ? fEl.value.trim() : "";
        const b = bEl ? bEl.value.trim() : "";
        if (!f || !b) return;
        tap();
        activeDeck.cards = activeDeck.cards || [];
        activeDeck.cards.unshift(createCard(f, b));
        save();
        rerender();
      });
    }

    container.querySelectorAll("[data-mv-del-card]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!activeDeck) return;
        tap();
        activeDeck.cards = (activeDeck.cards || []).filter((c) => c.id !== btn.dataset.mvDelCard);
        save();
        rerender();
      });
    });

    const delDeckBtn = document.getElementById("pr-mv-del-deck");
    if (delDeckBtn && activeDeck) {
      delDeckBtn.addEventListener("click", () => {
        tap();
        state.userDecks = state.userDecks.filter((d) => d.id !== activeDeck.id);
        ui.activeDeckId = state.userDecks[0] ? state.userDecks[0].id : null;
        save();
        rerender();
      });
    }

    const studyDueBtn = document.getElementById("pr-mv-study-due");
    if (studyDueBtn && activeDeck) {
      studyDueBtn.addEventListener("click", () => {
        tap();
        startStudySession(activeDeck, false);
        rerender();
      });
    }

    const studyAllAgain = document.getElementById("pr-mv-study-all-again");
    if (studyAllAgain && activeDeck) {
      studyAllAgain.addEventListener("click", () => {
        tap();
        startStudySession(activeDeck, true);
        rerender();
      });
    }

    const startQuizBtn = document.getElementById("pr-mv-start-quiz");
    if (startQuizBtn && activeDeck) {
      startQuizBtn.addEventListener("click", () => {
        tap();
        startQuizSession(activeDeck);
        rerender();
      });
    }

    const printDeckBtn = document.getElementById("pr-mv-print-deck");
    if (printDeckBtn && activeDeck && global.PRIMER_WHITEBOARD) {
      printDeckBtn.addEventListener("click", () => {
        tap();
        global.PRIMER_WHITEBOARD.printVaultDeck(activeDeck);
      });
    }

    const exportCsvBtn = document.getElementById("pr-mv-export-csv");
    if (exportCsvBtn && activeDeck) {
      exportCsvBtn.addEventListener("click", () => {
        tap();
        const csvEsc = (v) => `"${String(v || "").replace(/"/g, '""')}"`;
        const rows = ["Front,Back", ...(activeDeck.cards || []).map((c) => `${csvEsc(c.front)},${csvEsc(c.back)}`)];
        try {
          const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${(activeDeck.title || "deck").toLowerCase().replace(/[^a-z0-9]+/g, "_")}.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        } catch (_e) {}
      });
    }

    // Study runner bindings
    const backDeckBtn = document.getElementById("pr-mv-back-deck");
    if (backDeckBtn) {
      backDeckBtn.addEventListener("click", () => {
        tap();
        ui.deckMode = "browse";
        rerender();
      });
    }

    const flipCard = () => {
      if (!ui.studyFlipped) {
        tap();
        ui.studyFlipped = true;
        rerender();
      }
    };
    const fcEl = document.getElementById("pr-mv-flashcard");
    if (fcEl) fcEl.addEventListener("click", flipCard);
    const revBtn = document.getElementById("pr-mv-reveal");
    if (revBtn) revBtn.addEventListener("click", flipCard);

    container.querySelectorAll("[data-sm2-q]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const q = parseInt(btn.dataset.sm2Q, 10);
        const card = ui.studyQueue[ui.studyIdx];
        if (!card) return;
        reviewCardSM2(card, q);
        ui.studyDoneCount += 1;
        if (q === 1) {
          // Re-queue "Again" card at end of current session
          ui.studyQueue.push(card);
        }
        ui.studyIdx += 1;
        ui.studyFlipped = false;
        save();
        if (hooks && hooks.onCardReviewed) hooks.onCardReviewed(q);
        rerender();
      });
    });

    // Quiz bindings
    container.querySelectorAll("[data-mv-qopt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (ui.quizAnswered !== null) return;
        const idx = parseInt(btn.dataset.mvQopt, 10);
        const curQ = ui.quizQueue[ui.quizIdx];
        if (!curQ) return;
        ui.quizAnswered = idx;
        const ok = curQ.options[idx] === curQ.card.back;
        if (ok) {
          ui.quizScore += 1;
          if (hooks && hooks.onCardReviewed) hooks.onCardReviewed(3);
        } else if (hooks && hooks.onCardReviewed) {
          hooks.onCardReviewed(1);
        }
        rerender();
      });
    });

    const quizNextBtn = document.getElementById("pr-mv-quiz-next");
    if (quizNextBtn) {
      quizNextBtn.addEventListener("click", () => {
        tap();
        ui.quizIdx += 1;
        ui.quizAnswered = null;
        rerender();
      });
    }
    const quizRetryBtn = document.getElementById("pr-mv-quiz-retry");
    if (quizRetryBtn && activeDeck) {
      quizRetryBtn.addEventListener("click", () => {
        tap();
        startQuizSession(activeDeck);
        rerender();
      });
    }

    // Notes bindings
    const noteSearchEl = document.getElementById("pr-mv-note-search");
    if (noteSearchEl) {
      noteSearchEl.addEventListener("input", () => {
        ui.noteSearch = noteSearchEl.value;
        rerender();
      });
    }

    const createFreeNote = () => {
      tap();
      const id = uid("note");
      state.userNotes[id] = {
        id,
        nodeId: null,
        title: `Study Note ${Object.keys(state.userNotes).length + 1}`,
        text: "## Key Idea\n- Write your first-principles note here\n- Math works inline too: $E = mc^2$",
        updatedAt: Date.now()
      };
      ui.activeNoteKey = id;
      ui.notePreviewMode = false;
      save();
      rerender();
    };
    const newNote1 = document.getElementById("pr-mv-new-note");
    if (newNote1) newNote1.addEventListener("click", createFreeNote);
    const newNote2 = document.getElementById("pr-mv-new-note-2");
    if (newNote2) newNote2.addEventListener("click", createFreeNote);

    container.querySelectorAll("[data-mv-note]").forEach((btn) => {
      btn.addEventListener("click", () => {
        tap();
        ui.activeNoteKey = btn.dataset.mvNote;
        rerender();
      });
    });

    const activeNoteNow = ui.activeNoteKey ? state.userNotes[ui.activeNoteKey] : null;
    const noteTitleInp = document.getElementById("pr-mv-note-title");
    if (noteTitleInp && activeNoteNow) {
      noteTitleInp.addEventListener("input", () => {
        activeNoteNow.title = noteTitleInp.value;
        activeNoteNow.updatedAt = Date.now();
        save();
      });
    }
    const noteBodyInp = document.getElementById("pr-mv-note-body");
    if (noteBodyInp && activeNoteNow) {
      noteBodyInp.addEventListener("input", () => {
        activeNoteNow.text = noteBodyInp.value;
        activeNoteNow.updatedAt = Date.now();
        save();
      });
    }
    const notePrevBtn = document.getElementById("pr-mv-note-preview");
    if (notePrevBtn) {
      notePrevBtn.addEventListener("click", () => {
        tap();
        ui.notePreviewMode = !ui.notePreviewMode;
        rerender();
      });
    }
    const noteOpenNode = document.getElementById("pr-mv-note-open-node");
    if (noteOpenNode && activeNoteNow && activeNoteNow.nodeId && hooks && hooks.onOpenNode) {
      noteOpenNode.addEventListener("click", () => hooks.onOpenNode(activeNoteNow.nodeId));
    }
    const noteToDeck = document.getElementById("pr-mv-note-to-deck");
    if (noteToDeck && activeNoteNow) {
      noteToDeck.addEventListener("click", () => {
        tap();
        ui.subTab = "decks";
        ui.deckMode = "import";
        ui.importTitle = activeNoteNow.title || "Imported Note Deck";
        ui.importText = activeNoteNow.text || "";
        ui.importTargetDeckId = "__new__";
        rerender();
      });
    }
    const printNotesBtn = document.getElementById("pr-mv-print-notes");
    if (printNotesBtn && global.PRIMER_WHITEBOARD) {
      printNotesBtn.addEventListener("click", () => {
        tap();
        const entries = Object.values(state.userNotes).map((n) => ({
          title: n.title || "Note",
          category: n.nodeId ? "Lesson Note" : "Free Note",
          renderedHtml: renderNoteMarkdown(n.text)
        }));
        global.PRIMER_WHITEBOARD.printVaultNotes(entries);
      });
    }
    const delNoteBtn = document.getElementById("pr-mv-del-note");
    if (delNoteBtn && activeNoteNow) {
      delNoteBtn.addEventListener("click", () => {
        tap();
        delete state.userNotes[activeNoteNow.id];
        const rem = Object.keys(state.userNotes);
        ui.activeNoteKey = rem[0] || null;
        save();
        rerender();
      });
    }

    // Bookmarks bindings
    container.querySelectorAll("[data-mv-open-node]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onOpenNode) hooks.onOpenNode(btn.dataset.mvOpenNode);
      });
    });
    container.querySelectorAll("[data-mv-note-node]").forEach((btn) => {
      btn.addEventListener("click", () => {
        tap();
        const nid = btn.dataset.mvNoteNode;
        const nd = nodeMap.get(nid);
        const key = `node:${nid}`;
        if (!state.userNotes[key]) {
          state.userNotes[key] = {
            id: key,
            nodeId: nid,
            title: nd ? nd.title : nid,
            text: `## ${nd ? nd.title : nid}\n- Core truth: ${nd ? nd.easyTruth : ""}\n- Cheat code: ${nd ? nd.cheatCode : ""}\n`,
            updatedAt: Date.now()
          };
          save();
        }
        ui.subTab = "notes";
        ui.activeNoteKey = key;
        ui.notePreviewMode = false;
        rerender();
      });
    });
    container.querySelectorAll("[data-mv-unstar]").forEach((btn) => {
      btn.addEventListener("click", () => {
        tap();
        toggleBookmark(state, btn.dataset.mvUnstar);
        save();
        rerender();
      });
    });
  }

  function handleKeydown(ev, container, state, DATA, hooks) {
    if (ui.subTab !== "decks" || ui.deckMode !== "study") return false;
    const tag = ev.target && ev.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return false;
    if (!ui.studyQueue[ui.studyIdx]) return false;

    if (ev.code === "Space" && !ui.studyFlipped) {
      ev.preventDefault();
      ui.studyFlipped = true;
      renderMyVaultView(container, state, DATA, hooks);
      return true;
    }
    if (ui.studyFlipped && ["1", "2", "3", "4"].includes(ev.key)) {
      ev.preventDefault();
      const q = parseInt(ev.key, 10);
      const card = ui.studyQueue[ui.studyIdx];
      reviewCardSM2(card, q);
      ui.studyDoneCount += 1;
      if (q === 1) ui.studyQueue.push(card);
      ui.studyIdx += 1;
      ui.studyFlipped = false;
      if (hooks && hooks.onSave) hooks.onSave();
      if (hooks && hooks.onCardReviewed) hooks.onCardReviewed(q);
      renderMyVaultView(container, state, DATA, hooks);
      return true;
    }
    return false;
  }

  global.PRIMER_MY_VAULT = {
    ensureVaultState,
    createCard,
    computeNextSM2,
    reviewCardSM2,
    previewIntervals,
    parseCardsFromText,
    renderNoteMarkdown,
    isBookmarked,
    toggleBookmark,
    getLessonNote,
    saveLessonNote,
    getVaultSummary,
    openNoteForLesson(state, node) {
      ensureVaultState(state);
      const key = `node:${node.id}`;
      if (!state.userNotes[key]) {
        state.userNotes[key] = {
          id: key,
          nodeId: node.id,
          title: node.title,
          text: `## ${node.title}\n- Cheat Code: ${node.cheatCode || ""}\n- My takeaway: `,
          updatedAt: Date.now()
        };
      }
      ui.subTab = "notes";
      ui.activeNoteKey = key;
      ui.notePreviewMode = false;
    },
    openDeckById(deckId) {
      ui.subTab = "decks";
      ui.activeDeckId = deckId;
      ui.deckMode = "browse";
    },
    renderMyVaultView,
    handleKeydown
  };
})(typeof window !== "undefined" ? window : globalThis);
