// Primer Studio — Freehand Canvas Whiteboard & Print-to-PDF Study Document Engine
(function (global) {
  "use strict";

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatMathSafe(text, block) {
    if (global.MATHLINGO_LATEX && typeof global.MATHLINGO_LATEX.formatMath === "function") {
      return global.MATHLINGO_LATEX.formatMath(String(text == null ? "" : text), !!block);
    }
    return escapeHtml(text == null ? "" : text);
  }

  const INKS = [
    { id: "chalk", label: "Chalk", color: "#f3f4f6" },
    { id: "sage", label: "Sage", color: "#8eb8a3" },
    { id: "cobalt", label: "Cobalt", color: "#78b4f5" },
    { id: "amber", label: "Amber", color: "#eab349" },
    { id: "coral", label: "Coral", color: "#e07663" }
  ];

  const SIZES = [
    { id: "fine", label: "S", width: 2 },
    { id: "med", label: "M", width: 4 },
    { id: "bold", label: "L", width: 7 }
  ];

  const GRIDS = [
    { id: "dots", label: "Dots" },
    { id: "grid", label: "Grid" },
    { id: "blank", label: "Blank" }
  ];

  function drawGridBackground(ctx, cssW, cssH, gridMode) {
    ctx.save();
    ctx.fillStyle = "#060609";
    ctx.fillRect(0, 0, cssW, cssH);
    if (gridMode === "dots") {
      ctx.fillStyle = "rgba(255,255,255,0.13)";
      const step = 20;
      for (let y = step; y < cssH; y += step) {
        for (let x = step; x < cssW; x += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (gridMode === "grid") {
      ctx.strokeStyle = "rgba(255,255,255,0.065)";
      ctx.lineWidth = 1;
      const step = 24;
      ctx.beginPath();
      for (let x = step; x < cssW; x += step) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, cssH);
      }
      for (let y = step; y < cssH; y += step) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(cssW, y + 0.5);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function renderStrokes(ctx, strokes, cssW, cssH, gridMode) {
    drawGridBackground(ctx, cssW, cssH, gridMode);
    if (!Array.isArray(strokes) || strokes.length === 0) return;

    // Render strokes onto an offscreen layer so eraser only removes ink, never the background grid
    let layerCanvas = null;
    if (typeof document !== "undefined") {
      layerCanvas = document.createElement("canvas");
      layerCanvas.width = Math.max(1, Math.round(cssW));
      layerCanvas.height = Math.max(1, Math.round(cssH));
    }
    const lctx = layerCanvas ? layerCanvas.getContext("2d") : ctx;
    if (!lctx) return;

    for (const s of strokes) {
      if (!s || !Array.isArray(s.pts) || s.pts.length === 0) continue;
      lctx.save();
      lctx.lineCap = "round";
      lctx.lineJoin = "round";
      if (s.tool === "eraser") {
        lctx.globalCompositeOperation = layerCanvas ? "destination-out" : "source-over";
        lctx.strokeStyle = layerCanvas ? "rgba(0,0,0,1)" : "#060609";
        lctx.lineWidth = (s.width || 4) * 3.8;
      } else {
        lctx.globalCompositeOperation = "source-over";
        lctx.strokeStyle = s.color || "#f3f4f6";
        lctx.lineWidth = s.width || 3;
      }

      const pts = s.pts;
      if (pts.length === 1) {
        lctx.fillStyle = lctx.strokeStyle;
        lctx.beginPath();
        lctx.arc(pts[0].x * cssW, pts[0].y * cssH, Math.max(1.2, lctx.lineWidth / 2), 0, Math.PI * 2);
        lctx.fill();
      } else {
        lctx.beginPath();
        lctx.moveTo(pts[0].x * cssW, pts[0].y * cssH);
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = ((pts[i].x + pts[i + 1].x) / 2) * cssW;
          const yc = ((pts[i].y + pts[i + 1].y) / 2) * cssH;
          lctx.quadraticCurveTo(pts[i].x * cssW, pts[i].y * cssH, xc, yc);
        }
        const last = pts[pts.length - 1];
        lctx.lineTo(last.x * cssW, last.y * cssH);
        lctx.stroke();
      }
      lctx.restore();
    }

    if (layerCanvas) {
      ctx.drawImage(layerCanvas, 0, 0, cssW, cssH);
    }
  }

  function mountWhiteboard(container, opts) {
    if (!container || typeof document === "undefined") return null;
    const cfg = Object.assign(
      {
        height: 240,
        strokes: [],
        grid: "dots",
        compact: false,
        title: "Whiteboard",
        onChange: null
      },
      opts || {}
    );

    const wbState = {
      strokes: Array.isArray(cfg.strokes) ? cfg.strokes.slice() : [],
      redoStack: [],
      tool: "pen",
      color: INKS[0].color,
      width: SIZES[1].width,
      grid: cfg.grid || "dots",
      drawing: false,
      activeStroke: null
    };

    container.innerHTML = `
      <div class="pr-wb-shell ${cfg.compact ? "compact" : ""}">
        <div class="pr-wb-bar">
          <div class="pr-wb-group">
            ${INKS.map(
              (ink, idx) => `
              <button type="button" class="pr-wb-swatch ${idx === 0 ? "active" : ""}" data-wb-color="${ink.color}" title="${ink.label} ink" style="--swatch:${ink.color};"></button>
            `
            ).join("")}
            <button type="button" class="pr-wb-btn" data-wb-tool="eraser" title="Eraser">⌫</button>
          </div>
          <div class="pr-wb-group">
            ${SIZES.map(
              (sz, idx) => `
              <button type="button" class="pr-wb-btn ${idx === 1 ? "active" : ""}" data-wb-size="${sz.width}" title="Stroke ${sz.label}">${sz.label}</button>
            `
            ).join("")}
          </div>
          <div class="pr-wb-group">
            <button type="button" class="pr-wb-btn" data-wb-grid-cycle title="Switch paper grid (${wbState.grid})">${wbState.grid === "dots" ? "⋯ Dots" : wbState.grid === "grid" ? "▦ Grid" : "▢ Blank"}</button>
            <button type="button" class="pr-wb-btn" data-wb-undo title="Undo stroke">↶</button>
            <button type="button" class="pr-wb-btn" data-wb-redo title="Redo stroke">↷</button>
            <button type="button" class="pr-wb-btn" data-wb-clear title="Clear board">Clear</button>
            <button type="button" class="pr-wb-btn" data-wb-png title="Download PNG sketch">PNG</button>
          </div>
        </div>
        <div class="pr-wb-stage" style="height:${cfg.height}px;">
          <canvas class="pr-wb-canvas"></canvas>
          <div class="pr-wb-hint">Sketch equations, free-body diagrams, or rough work with mouse, touch, or stylus</div>
        </div>
      </div>
    `;

    const stage = container.querySelector(".pr-wb-stage");
    const canvas = container.querySelector(".pr-wb-canvas");
    const hintEl = container.querySelector(".pr-wb-hint");
    const ctx = canvas.getContext("2d");

    let cssW = 300;
    let cssH = cfg.height;

    function syncHint() {
      if (hintEl) {
        hintEl.style.opacity = wbState.strokes.length > 0 || wbState.drawing ? "0" : "1";
      }
    }

    function notifyChange() {
      syncHint();
      if (typeof cfg.onChange === "function") {
        cfg.onChange(wbState.strokes.slice());
      }
    }

    function redraw() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = stage.getBoundingClientRect();
      cssW = Math.max(120, Math.round(rect.width || 320));
      cssH = Math.max(120, Math.round(rect.height || cfg.height));
      if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderStrokes(ctx, wbState.strokes, cssW, cssH, wbState.grid);
      syncHint();
    }

    function pointFromEvent(ev) {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      return {
        x: Math.max(0, Math.min(1, (ev.clientX - rect.left) / w)),
        y: Math.max(0, Math.min(1, (ev.clientY - rect.top) / h))
      };
    }

    canvas.addEventListener("pointerdown", (ev) => {
      if (ev.button && ev.button !== 0) return;
      ev.preventDefault();
      if (canvas.setPointerCapture) {
        try {
          canvas.setPointerCapture(ev.pointerId);
        } catch (_e) {}
      }
      wbState.drawing = true;
      wbState.redoStack = [];
      const pt = pointFromEvent(ev);
      wbState.activeStroke = {
        tool: wbState.tool,
        color: wbState.color,
        width: wbState.width,
        pts: [pt]
      };
      wbState.strokes.push(wbState.activeStroke);
      if (wbState.strokes.length > 120) {
        wbState.strokes = wbState.strokes.slice(-120);
      }
      redraw();
    });

    canvas.addEventListener("pointermove", (ev) => {
      if (!wbState.drawing || !wbState.activeStroke) return;
      ev.preventDefault();
      const pt = pointFromEvent(ev);
      const pts = wbState.activeStroke.pts;
      const prev = pts[pts.length - 1];
      const dx = (pt.x - prev.x) * cssW;
      const dy = (pt.y - prev.y) * cssH;
      if (dx * dx + dy * dy < 2.2) return;
      pts.push(pt);
      redraw();
    });

    function finishStroke() {
      if (!wbState.drawing) return;
      wbState.drawing = false;
      wbState.activeStroke = null;
      notifyChange();
    }

    canvas.addEventListener("pointerup", finishStroke);
    canvas.addEventListener("pointercancel", finishStroke);
    canvas.addEventListener("pointerleave", (ev) => {
      if (ev.buttons === 0) finishStroke();
    });

    // Toolbar interactions
    const swatches = container.querySelectorAll("[data-wb-color]");
    const eraserBtn = container.querySelector("[data-wb-tool='eraser']");
    swatches.forEach((btn) => {
      btn.addEventListener("click", () => {
        wbState.tool = "pen";
        wbState.color = btn.dataset.wbColor;
        swatches.forEach((b) => b.classList.toggle("active", b === btn));
        if (eraserBtn) eraserBtn.classList.remove("active");
      });
    });

    if (eraserBtn) {
      eraserBtn.addEventListener("click", () => {
        wbState.tool = wbState.tool === "eraser" ? "pen" : "eraser";
        eraserBtn.classList.toggle("active", wbState.tool === "eraser");
        swatches.forEach((b) => b.classList.toggle("active", wbState.tool === "pen" && b.dataset.wbColor === wbState.color));
      });
    }

    const sizeBtns = container.querySelectorAll("[data-wb-size]");
    sizeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        wbState.width = parseFloat(btn.dataset.wbSize) || 4;
        sizeBtns.forEach((b) => b.classList.toggle("active", b === btn));
      });
    });

    const gridBtn = container.querySelector("[data-wb-grid-cycle]");
    if (gridBtn) {
      gridBtn.addEventListener("click", () => {
        const idx = GRIDS.findIndex((g) => g.id === wbState.grid);
        const next = GRIDS[(idx + 1) % GRIDS.length];
        wbState.grid = next.id;
        gridBtn.textContent = next.id === "dots" ? "⋯ Dots" : next.id === "grid" ? "▦ Grid" : "▢ Blank";
        gridBtn.title = `Switch paper grid (${next.label})`;
        redraw();
      });
    }

    const undoBtn = container.querySelector("[data-wb-undo]");
    if (undoBtn) {
      undoBtn.addEventListener("click", () => {
        if (wbState.strokes.length === 0) return;
        wbState.redoStack.push(wbState.strokes.pop());
        redraw();
        notifyChange();
      });
    }

    const redoBtn = container.querySelector("[data-wb-redo]");
    if (redoBtn) {
      redoBtn.addEventListener("click", () => {
        if (wbState.redoStack.length === 0) return;
        wbState.strokes.push(wbState.redoStack.pop());
        redraw();
        notifyChange();
      });
    }

    const clearBtn = container.querySelector("[data-wb-clear]");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (wbState.strokes.length === 0) return;
        wbState.redoStack = [];
        wbState.strokes = [];
        redraw();
        notifyChange();
      });
    }

    const pngBtn = container.querySelector("[data-wb-png]");
    if (pngBtn) {
      pngBtn.addEventListener("click", () => {
        try {
          const url = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = url;
          a.download = `primer_sketch_${new Date().toISOString().slice(0, 10)}.png`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } catch (_e) {}
      });
    }

    let resizeObs = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObs = new ResizeObserver(() => redraw());
      resizeObs.observe(stage);
    }

    if (typeof requestAnimationFrame !== "undefined") {
      requestAnimationFrame(redraw);
    } else {
      redraw();
    }

    return {
      redraw,
      clear() {
        wbState.strokes = [];
        wbState.redoStack = [];
        redraw();
        notifyChange();
      },
      getStrokes() {
        return wbState.strokes.slice();
      },
      destroy() {
        if (resizeObs) resizeObs.disconnect();
      }
    };
  }

  // ==================== CLEAN PRINT-TO-PDF STUDY ENGINE ====================
  function ensurePrintRoot() {
    if (typeof document === "undefined") return null;
    let el = document.getElementById("primer-print-root");
    if (!el) {
      el = document.createElement("section");
      el.id = "primer-print-root";
      el.className = "pr-print-root";
      el.setAttribute("aria-hidden", "true");
      document.body.appendChild(el);
    }
    return el;
  }

  function printStudyDocument(docSpec) {
    if (typeof document === "undefined" || typeof window === "undefined") return false;
    const root = ensurePrintRoot();
    if (!root) return false;
    const dateStamp = new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    const buildVer = (global.PRIMER_BUILD || global.EVERYLINGO_BUILD || { version: "3.0.0" }).version;

    root.innerHTML = `
      <div class="pr-print-doc">
        <header class="pr-print-head">
          <div>
            <div class="pr-print-brand">PRIMER STUDIO v${escapeHtml(buildVer)} · FIRST-PRINCIPLES STUDY SHEET</div>
            <h1 class="pr-print-title">${escapeHtml(docSpec.title || "Primer Study Sheet")}</h1>
            ${docSpec.subtitle ? `<p class="pr-print-sub">${escapeHtml(docSpec.subtitle)}</p>` : ""}
          </div>
          <div class="pr-print-meta">
            <div>${escapeHtml(dateStamp)}</div>
            ${docSpec.meta ? `<div>${escapeHtml(docSpec.meta)}</div>` : ""}
          </div>
        </header>
        <div class="pr-print-body">
          ${docSpec.bodyHtml || ""}
        </div>
        <footer class="pr-print-foot">
          Generated offline by Primer Studio · Save as PDF via your browser print dialog
        </footer>
      </div>
    `;

    document.body.classList.add("pr-printing-doc");
    const cleanup = () => {
      document.body.classList.remove("pr-printing-doc");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);

    setTimeout(() => {
      try {
        window.print();
      } catch (_e) {}
      setTimeout(cleanup, 1200);
    }, 60);
    return true;
  }

  function printReferenceCramSheet(nodes, getWorld, query) {
    const list = Array.isArray(nodes) ? nodes : [];
    const cardsHtml = list
      .map((n) => {
        const w = typeof getWorld === "function" ? getWorld(n.worldId) : { title: n.worldId };
        return `
          <article class="pr-print-card">
            <div class="pr-print-card-top">
              <strong>${escapeHtml(n.title)}</strong>
              <span>${escapeHtml((w && w.title ? w.title.split(":")[0] : n.worldId) || "")}</span>
            </div>
            <p class="pr-print-truth">${formatMathSafe(n.easyTruth)}</p>
            <div class="pr-print-cheat"><strong>Cheat Code:</strong> ${formatMathSafe(n.cheatCode)}</div>
          </article>
        `;
      })
      .join("");

    return printStudyDocument({
      title: query ? `Reference Cram Sheet: "${query}"` : "Primer Complete Reference Cram Sheet",
      subtitle: "Plain-English truths and exam cheat codes distilled for high-retention review.",
      meta: `${list.length} topic${list.length === 1 ? "" : "s"}`,
      bodyHtml: `<div class="pr-print-cols-2">${cardsHtml}</div>`
    });
  }

  function printExamScoreReport(exam, grade, nodeMap) {
    const subRows = (grade.subtestResults || [])
      .map(
        (sr) => `
        <tr>
          <td><strong>${escapeHtml(sr.name)}</strong></td>
          <td>${sr.correct} / ${sr.total}</td>
          <td>${sr.rawPct}%</td>
          <td>${sr.wrong} wrong · ${sr.blank} blank</td>
        </tr>
      `
      )
      .join("");

    const priorityHtml =
      grade.priorityNodes && grade.priorityNodes.length > 0
        ? `
        <h2 class="pr-print-h2">Priority Remediation Plan</h2>
        <ul class="pr-print-list">
          ${grade.priorityNodes
            .map((pn) => {
              const nd = nodeMap && nodeMap.get ? nodeMap.get(pn.nodeId) : null;
              return `<li><strong>${escapeHtml(nd ? nd.title : pn.nodeId)}</strong> — ${pn.count} missed/blank item${pn.count > 1 ? "s" : ""}${nd && nd.cheatCode ? ` · <em>${formatMathSafe(nd.cheatCode)}</em>` : ""}</li>`;
            })
            .join("")}
        </ul>
      `
        : `<p>Flawless run — zero weak lessons flagged.</p>`;

    const missedItems = (grade.itemReviews || []).filter((r) => r.status !== "correct").slice(0, 40);
    const reviewHtml =
      missedItems.length > 0
        ? `
        <h2 class="pr-print-h2">Missed &amp; Blank Item Review (${missedItems.length})</h2>
        <div class="pr-print-review-list">
          ${missedItems
            .map(
              (r, i) => `
            <div class="pr-print-card">
              <div class="pr-print-card-top">
                <strong>#${i + 1} · ${escapeHtml(r.secName || "Item")}</strong>
                <span>${r.status === "blank" ? "Blank" : "Missed"}</span>
              </div>
              <p class="pr-print-truth">${formatMathSafe(r.q.prompt)}</p>
              <div class="pr-print-cheat">
                <strong>Your Answer:</strong> ${r.chosen != null ? formatMathSafe(r.chosen) : "(Blank)"} &nbsp;|&nbsp;
                <strong>Correct:</strong> ${formatMathSafe(r.q.answer)}
              </div>
              ${r.q.whyEasy ? `<p class="pr-print-note">${formatMathSafe(r.q.whyEasy)}</p>` : ""}
            </div>
          `
            )
            .join("")}
        </div>
      `
        : "";

    const bodyHtml = `
      <div class="pr-print-scorebox">
        <div>
          <div class="pr-print-kicker">${escapeHtml(grade.headlineLabel)}</div>
          <div class="pr-print-big">${escapeHtml(grade.headlineMetric)}</div>
        </div>
        <div>
          <div><strong>Verdict:</strong> ${escapeHtml(grade.verdictTitle)}</div>
          <div>${escapeHtml(grade.verdictDetail)}</div>
          <div>Correct: <strong>${grade.totalCorrect}</strong> · Wrong: <strong>${grade.totalWrong}</strong> · Blank: <strong>${grade.totalBlank}</strong> · Avg: <strong>${grade.avgSecPerItem}s/Q</strong></div>
        </div>
      </div>

      <h2 class="pr-print-h2">Per-Subtest Performance Breakdown</h2>
      <table class="pr-print-table">
        <thead><tr><th>Subtest</th><th>Score</th><th>Accuracy</th><th>Errors / Blanks</th></tr></thead>
        <tbody>${subRows}</tbody>
      </table>

      ${priorityHtml}
      ${reviewHtml}
    `;

    return printStudyDocument({
      title: `${exam.title} — Official Mock Score Report`,
      subtitle: exam.tagline || "Timed CBT Diagnostic Simulation",
      meta: `${grade.totalItems} items · ${grade.rawPct}% accuracy`,
      bodyHtml
    });
  }

  function printVaultDeck(deck) {
    const cards = Array.isArray(deck.cards) ? deck.cards : [];
    const bodyHtml = `
      <div class="pr-print-cols-2">
        ${cards
          .map(
            (c, idx) => `
          <article class="pr-print-card">
            <div class="pr-print-card-top">
              <strong>Card #${idx + 1}</strong>
              <span>${c.reps > 0 ? `Reviewed ${c.reps}×` : "New"}</span>
            </div>
            <p class="pr-print-truth"><strong>Q:</strong> ${formatMathSafe(c.front)}</p>
            <div class="pr-print-cheat"><strong>A:</strong> ${formatMathSafe(c.back)}</div>
          </article>
        `
          )
          .join("")}
      </div>
    `;
    return printStudyDocument({
      title: `Study Deck: ${deck.title}`,
      subtitle: deck.description || "Custom SM-2 Active Recall Flashcard Handout",
      meta: `${cards.length} cards`,
      bodyHtml
    });
  }

  function printVaultNotes(notesEntries) {
    const list = Array.isArray(notesEntries) ? notesEntries : [];
    const bodyHtml = list
      .map(
        (entry) => `
        <article class="pr-print-card" style="margin-bottom:10px;">
          <div class="pr-print-card-top">
            <strong>${escapeHtml(entry.title)}</strong>
            <span>${escapeHtml(entry.category || "Note")}</span>
          </div>
          <div class="pr-print-note">${entry.renderedHtml || formatMathSafe(entry.text)}</div>
        </article>
      `
      )
      .join("");
    return printStudyDocument({
      title: "Personal Study Notebook",
      subtitle: "Compiled lesson annotations and Markdown/LaTeX notes from My Vault.",
      meta: `${list.length} note${list.length === 1 ? "" : "s"}`,
      bodyHtml
    });
  }

  function printMistakesSheet(mistakes, nodeMap) {
    const list = Array.isArray(mistakes) ? mistakes : [];
    const bodyHtml = `
      <div class="pr-print-review-list">
        ${list
          .map((m, i) => {
            const nd = nodeMap && nodeMap.get ? nodeMap.get(m.nodeId) : null;
            return `
            <article class="pr-print-card">
              <div class="pr-print-card-top">
                <strong>Mistake #${i + 1}</strong>
                <span>${escapeHtml(nd ? nd.title : m.nodeId || "Review")}</span>
              </div>
              <p class="pr-print-truth">${formatMathSafe(m.prompt)}</p>
              <div class="pr-print-cheat"><strong>Correct Answer:</strong> ${formatMathSafe(m.answer)}</div>
              ${m.whyEasy ? `<p class="pr-print-note">${formatMathSafe(m.whyEasy)}</p>` : ""}
            </article>
          `;
          })
          .join("")}
      </div>
    `;
    return printStudyDocument({
      title: "Mistake Repair Drill Sheet",
      subtitle: "Targeted review of previously missed questions.",
      meta: `${list.length} item${list.length === 1 ? "" : "s"}`,
      bodyHtml
    });
  }

  global.PRIMER_WHITEBOARD = {
    INKS,
    SIZES,
    GRIDS,
    mountWhiteboard,
    printStudyDocument,
    printReferenceCramSheet,
    printExamScoreReport,
    printVaultDeck,
    printVaultNotes,
    printMistakesSheet
  };
})(typeof window !== "undefined" ? window : globalThis);
