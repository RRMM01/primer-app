// Primer Studio — Interactive 2D Skill Constellation Map (256-Node Prerequisite Graph)
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

  function fmtMath(text) {
    if (global.MATHLINGO_LATEX && typeof global.MATHLINGO_LATEX.formatMath === "function") {
      return global.MATHLINGO_LATEX.formatMath(String(text == null ? "" : text), false);
    }
    return escapeHtml(text == null ? "" : text);
  }

  const SECTORS = [
    {
      id: "math",
      label: "MATH CORE",
      color: "#8eb8a3",
      worlds: ["nursery", "elementary", "junior", "senior", "college"]
    },
    {
      id: "science",
      label: "NATURAL SCIENCES",
      color: "#78b4f5",
      worlds: ["physics", "chemistry", "biology", "earth_space"]
    },
    {
      id: "code_ai",
      label: "CODE, CS & AI",
      color: "#b794f4",
      worlds: ["ai_ml", "web_coding", "python_tech", "dsa_mastery", "backend_sql_dev", "js_ts_architecture"]
    },
    {
      id: "humanities",
      label: "HUMANITIES & LIFE",
      color: "#e09f63",
      worlds: ["verbal-logic", "wica", "persdev", "wellness", "ph_history", "filipino", "abstract_shapes", "econ_finance", "philosophy_logic"]
    },
    {
      id: "exams",
      label: "PH EXAMS",
      color: "#e07663",
      worlds: ["exam_mastery"]
    }
  ];

  const WORLD_TO_SECTOR = {};
  SECTORS.forEach((sec, sIdx) => {
    sec.worlds.forEach((wId) => {
      WORLD_TO_SECTOR[wId] = sIdx;
    });
  });

  // Deterministic radial-topological layout with gentle anti-overlap relaxation
  function computeConstellationLayout(DATA, TUTOR) {
    const nodes = DATA && Array.isArray(DATA.NODES) ? DATA.NODES : [];
    const worlds = DATA && Array.isArray(DATA.WORLDS) ? DATA.WORLDS : [];
    const worldOrder = new Map(worlds.map((w, idx) => [w.id, typeof w.order === "number" ? w.order : idx]));
    const graph = (TUTOR && TUTOR.DEPENDENCY_GRAPH) || {};
    const nodeById = new Map(nodes.map((n) => [n.id, n]));

    // 1. Compute topological depth (longest path from roots)
    const depthMemo = new Map();
    function getDepth(id, stack) {
      if (depthMemo.has(id)) return depthMemo.get(id);
      const visiting = stack || new Set();
      if (visiting.has(id)) return 0;
      visiting.add(id);
      const entry = graph[id];
      const prereqs = entry && Array.isArray(entry.prereqs) ? entry.prereqs : [];
      let d = 0;
      for (const p of prereqs) {
        if (nodeById.has(p)) {
          d = Math.max(d, 1 + getDepth(p, visiting));
        }
      }
      visiting.delete(id);
      depthMemo.set(id, d);
      return d;
    }
    nodes.forEach((n) => getDepth(n.id));

    // 2. Bucket nodes into sectors & radial rings
    const sectorBuckets = SECTORS.map(() => []);
    nodes.forEach((n) => {
      const sIdx = WORLD_TO_SECTOR[n.worldId] != null ? WORLD_TO_SECTOR[n.worldId] : 3;
      sectorBuckets[sIdx].push(n);
    });

    const positioned = [];
    const posById = new Map();

    // Allocate angular spans proportional to sector size (with healthy min span)
    const totalNodes = Math.max(1, nodes.length);
    const rawWeights = sectorBuckets.map((b) => Math.max(18, b.length));
    const weightSum = rawWeights.reduce((a, b) => a + b, 0);
    const gapRad = 0.14;
    const usableArc = Math.PI * 2 - gapRad * SECTORS.length;

    let curAngle = -Math.PI / 2;
    const sectorArcs = [];

    sectorBuckets.forEach((bucket, sIdx) => {
      const span = (rawWeights[sIdx] / weightSum) * usableArc;
      const startAngle = curAngle;
      const endAngle = startAngle + span;
      sectorArcs.push({
        sector: SECTORS[sIdx],
        startAngle,
        endAngle,
        midAngle: (startAngle + endAngle) / 2
      });
      curAngle = endAngle + gapRad;

      // Group bucket by depth (clamped into clean rings)
      const byRing = new Map();
      bucket.sort((a, b) => {
        const wa = worldOrder.get(a.worldId) || 0;
        const wb = worldOrder.get(b.worldId) || 0;
        if (wa !== wb) return wa - wb;
        return a.id.localeCompare(b.id);
      });

      bucket.forEach((n) => {
        const d = depthMemo.get(n.id) || 0;
        const ring = Math.min(7, d);
        if (!byRing.has(ring)) byRing.set(ring, []);
        byRing.get(ring).push(n);
      });

      const rings = Array.from(byRing.keys()).sort((a, b) => a - b);
      rings.forEach((ring, rPos) => {
        const ringNodes = byRing.get(ring);
        const baseR = 135 + ring * 92 + (rPos === 0 ? 0 : 12);
        const count = ringNodes.length;
        // Split crowded rings into 2 staggered sub-bands
        const subBands = count > 11 ? 2 : 1;
        ringNodes.forEach((n, idx) => {
          const band = idx % subBands;
          const slot = Math.floor(idx / subBands);
          const slotsInBand = Math.ceil(count / subBands);
          const frac = slotsInBand <= 1 ? 0.5 : (slot + 0.5) / slotsInBand;
          const angle = startAngle + frac * span;
          const radius = baseR + band * 44 + ((idx % 3) - 1) * 8;
          const item = {
            id: n.id,
            node: n,
            sectorIdx: sIdx,
            depth: depthMemo.get(n.id) || 0,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            radius: 10
          };
          positioned.push(item);
          posById.set(n.id, item);
        });
      });
    });

    // 3. Deterministic anti-overlap relaxation (14 passes)
    const minDist = 36;
    for (let iter = 0; iter < 14; iter++) {
      for (let i = 0; i < positioned.length; i++) {
        for (let j = i + 1; j < positioned.length; j++) {
          const a = positioned[i];
          const b = positioned[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 0.01 && d2 < minDist * minDist) {
            const dist = Math.sqrt(d2);
            const push = (minDist - dist) * 0.42;
            const nx = dx / dist;
            const ny = dy / dist;
            a.x -= nx * push;
            a.y -= ny * push;
            b.x += nx * push;
            b.y += ny * push;
          }
        }
      }
    }

    // 4. Build directed edges list (prereq -> node)
    const edges = [];
    for (const item of positioned) {
      const entry = graph[item.id];
      const prereqs = entry && Array.isArray(entry.prereqs) ? entry.prereqs : [];
      for (const pId of prereqs) {
        const src = posById.get(pId);
        if (src) {
          edges.push({
            from: src,
            to: item,
            crossSector: src.sectorIdx !== item.sectorIdx
          });
        }
      }
    }

    // Compute bounds
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const p of positioned) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }

    return {
      nodes: positioned,
      posById,
      edges,
      sectorArcs,
      bounds: { minX, maxX, minY, maxY },
      totalNodes
    };
  }

  function collectChainSets(nodeId, TUTOR) {
    const ancestors = new Set();
    const descendants = new Set();
    if (!nodeId || !TUTOR) return { ancestors, descendants };

    const upQueue = [nodeId];
    while (upQueue.length > 0) {
      const cur = upQueue.shift();
      const prereqs = TUTOR.getPrereqs ? TUTOR.getPrereqs(cur) : [];
      for (const p of prereqs) {
        if (!ancestors.has(p)) {
          ancestors.add(p);
          upQueue.push(p);
        }
      }
    }

    const downQueue = [nodeId];
    while (downQueue.length > 0) {
      const cur = downQueue.shift();
      const deps = TUTOR.getDependents ? TUTOR.getDependents(cur) : [];
      for (const d of deps) {
        if (!descendants.has(d)) {
          descendants.add(d);
          downQueue.push(d);
        }
      }
    }

    return { ancestors, descendants };
  }

  // ==================== INTERACTIVE CONSTELLATION VIEW ====================
  let cachedLayout = null;
  let ui = {
    filterValue: "all", // "all" | "preset:<id>" | "world:<id>"
    searchQuery: "",
    selectedId: null,
    hoveredId: null,
    camX: 0,
    camY: 0,
    zoom: 0.56,
    initializedCam: false
  };

  function buildMistakeMap(state) {
    const map = new Map();
    const list = (state && Array.isArray(state.mistakes)) ? state.mistakes : [];
    for (const m of list) {
      if (!m || !m.nodeId) continue;
      map.set(m.nodeId, (map.get(m.nodeId) || 0) + 1);
    }
    return map;
  }

  function getSpotlightSet(filterValue, state, DATA, TUTOR) {
    if (!filterValue || filterValue === "all") return null;
    const set = new Set();
    if (filterValue === "weak") {
      const mMap = buildMistakeMap(state);
      mMap.forEach((_cnt, id) => set.add(id));
      const analysis = TUTOR && TUTOR.analyzeLearner ? TUTOR.analyzeLearner(state, DATA) : { decayingNodes: [] };
      for (const d of (analysis.decayingNodes || [])) {
        if (d && d.nodeId) set.add(d.nodeId);
      }
      return set.size > 0 ? set : null;
    }
    if (filterValue.startsWith("world:")) {
      const wId = filterValue.slice(6);
      DATA.NODES.forEach((n) => {
        if (n.worldId === wId) set.add(n.id);
      });
      return set;
    }
    if (filterValue.startsWith("preset:") && TUTOR && TUTOR.generateStudyPlan) {
      const presetId = filterValue.slice(7);
      const plan = TUTOR.generateStudyPlan(state, DATA, presetId);
      const roots = (plan.steps || []).filter((s) => s.actionType === "lesson" && s.payload).map((s) => s.payload);
      for (const rId of roots) {
        set.add(rId);
        const { ancestors } = collectChainSets(rId, TUTOR);
        ancestors.forEach((a) => set.add(a));
      }
      return set;
    }
    return null;
  }

  function renderConstellationView(container, state, DATA, TUTOR, hooks) {
    if (!container || !DATA) return;
    if (!cachedLayout || cachedLayout.totalNodes !== DATA.NODES.length) {
      cachedLayout = computeConstellationLayout(DATA, TUTOR);
    }
    const layout = cachedLayout;
    const analysis = TUTOR && TUTOR.analyzeLearner ? TUTOR.analyzeLearner(state, DATA) : { decayingNodes: [] };
    const decayingSet = new Set((analysis.decayingNodes || []).map((d) => d.nodeId));
    const mistakeMap = buildMistakeMap(state);
    const weakUnionCount = new Set([...decayingSet, ...mistakeMap.keys()]).size;
    const bookmarkSet = new Set(Array.isArray(state.userBookmarks) ? state.userBookmarks : []);
    const worldMap = new Map(DATA.WORLDS.map((w) => [w.id, w]));

    // Build preset options
    const presetList =
      TUTOR && TUTOR.generateStudyPlan
        ? (TUTOR.generateStudyPlan(state, DATA, "auto").allPresets || [])
        : [];

    // Status classifier for every node
    const statusMap = new Map();
    let countMastered = 0;
    let countReady = 0;
    let countDecay = 0;
    let countLocked = 0;

    for (const item of layout.nodes) {
      const lvl = (state.nodeMastery && state.nodeMastery[item.id]) || 0;
      const unlock = TUTOR && TUTOR.getUnlockStatus ? TUTOR.getUnlockStatus(state, item.id, DATA) : { unlocked: true };
      let st = "locked";
      if (lvl >= 1 && decayingSet.has(item.id)) {
        st = "decay";
        countDecay++;
      } else if (lvl >= 1) {
        st = "mastered";
        countMastered++;
      } else if (unlock.unlocked || state.strictPrereqs === false) {
        st = "ready";
        countReady++;
      } else {
        st = "locked";
        countLocked++;
      }
      statusMap.set(item.id, { st, lvl, unlock });
    }

    const spotlightSet = getSpotlightSet(ui.filterValue, state, DATA, TUTOR);

    container.innerHTML = `
      <div class="pr-const-shell">
        <header class="pr-const-toolbar">
          <div class="pr-const-title-block">
            <div class="ml-hero-kicker">INTERACTIVE SKILL CONSTELLATION · ${layout.nodes.length} NODES · ${layout.edges.length} PREREQ LINKS</div>
            <h1 class="pr-const-heading">Knowledge Star Chart</h1>
          </div>
          <div class="pr-const-controls">
            <input type="search" id="pr-co-search" class="ml-search-input pr-co-search" placeholder="Find star (e.g. calculus, sql, rizal, pulley)..." value="${escapeHtml(ui.searchQuery)}" />
            <select id="pr-co-filter" class="ml-search-input pr-co-select" aria-label="Spotlight track or world">
              <option value="all" ${ui.filterValue === "all" ? "selected" : ""}>All 25 Worlds (${layout.nodes.length})</option>
              ${weakUnionCount > 0 ? `<option value="weak" ${ui.filterValue === "weak" ? "selected" : ""}>Needs Review &amp; Mistakes (${weakUnionCount})</option>` : ""}
              <optgroup label="Study Goal Tracks (Highlights Full Prereq Chain)">
                ${presetList.map((p) => `<option value="preset:${escapeHtml(p.id)}" ${ui.filterValue === "preset:" + p.id ? "selected" : ""}>${escapeHtml(p.title)}</option>`).join("")}
              </optgroup>
              <optgroup label="Individual Worlds">
                ${DATA.WORLDS.map((w) => `<option value="world:${escapeHtml(w.id)}" ${ui.filterValue === "world:" + w.id ? "selected" : ""}>${escapeHtml(w.title)}</option>`).join("")}
              </optgroup>
            </select>
            <div class="pr-co-zoom-grp">
              <button type="button" class="ml-btn-mini" id="pr-co-zout" title="Zoom out">−</button>
              <button type="button" class="ml-btn-mini" id="pr-co-zin" title="Zoom in">+</button>
              <button type="button" class="ml-btn-mini" id="pr-co-fit" title="Fit all 256 nodes">Fit</button>
              <button type="button" class="ml-btn-mini" id="pr-co-next" title="Pan to next recommended unlocked skill">Focus Next</button>
            </div>
          </div>
        </header>

        <div class="pr-const-legend">
          <span><i class="pr-dot mastered"></i>Mastered (${countMastered})</span>
          <span><i class="pr-dot decay"></i>Due Review (${countDecay})</span>
          ${mistakeMap.size > 0 ? `<span><i class="pr-dot weak"></i>Mistakes (${mistakeMap.size})</span>` : ""}
          <span><i class="pr-dot ready"></i>Unlocked Ready (${countReady})</span>
          <span><i class="pr-dot locked"></i>Locked (${countLocked})</span>
          <span><i class="pr-dot star"></i>Bookmarked (${bookmarkSet.size})</span>
          <span class="pr-const-tip">Scroll to zoom · Drag to pan · Hover traces prereqs &amp; unlocks</span>
        </div>

        <div class="pr-const-stage-wrap">
          <div class="pr-const-canvas-box" id="pr-co-canvas-box">
            <canvas id="pr-co-canvas" class="pr-const-canvas"></canvas>
            <div id="pr-co-tooltip" class="pr-const-tooltip hidden"></div>
          </div>
          <aside class="pr-const-inspector" id="pr-co-inspector"></aside>
        </div>
      </div>
    `;

    const box = document.getElementById("pr-co-canvas-box");
    const canvas = document.getElementById("pr-co-canvas");
    const tooltipEl = document.getElementById("pr-co-tooltip");
    const inspectorEl = document.getElementById("pr-co-inspector");
    const ctx = canvas.getContext("2d");

    let cssW = 700;
    let cssH = 540;

    function fitCamera() {
      const pad = 110;
      const bw = Math.max(200, layout.bounds.maxX - layout.bounds.minX + pad * 2);
      const bh = Math.max(200, layout.bounds.maxY - layout.bounds.minY + pad * 2);
      ui.zoom = Math.max(0.24, Math.min(1.15, Math.min(cssW / bw, cssH / bh)));
      ui.camX = (layout.bounds.minX + layout.bounds.maxX) / 2;
      ui.camY = (layout.bounds.minY + layout.bounds.maxY) / 2;
    }

    function worldToScreen(wx, wy) {
      return {
        sx: (wx - ui.camX) * ui.zoom + cssW / 2,
        sy: (wy - ui.camY) * ui.zoom + cssH / 2
      };
    }

    function screenToWorld(sx, sy) {
      return {
        wx: (sx - cssW / 2) / ui.zoom + ui.camX,
        wy: (sy - cssH / 2) / ui.zoom + ui.camY
      };
    }

    function renderInspector() {
      if (!inspectorEl) return;
      const focusId = ui.selectedId;
      if (!focusId || !layout.posById.has(focusId)) {
        // Show quick summary + ready-to-start recommendations
        const readySample = layout.nodes.filter((it) => statusMap.get(it.id).st === "ready").slice(0, 6);
        inspectorEl.innerHTML = `
          <div class="pr-co-insp-empty">
            <div class="ml-hero-kicker">NODE INSPECTOR</div>
            <h3>Click any star to inspect its skill lineage</h3>
            <p class="ml-viz-sub">Hovering traces every prerequisite feeding into a topic (Cobalt) and every advanced skill it unlocks (Sage).</p>
            ${
              readySample.length > 0
                ? `
              <div class="pr-co-insp-sec">
                <div class="pr-field-lbl">Unlocked &amp; Ready Right Now</div>
                <div class="pr-co-chip-col">
                  ${readySample
                    .map(
                      (it) => `
                    <button type="button" class="pr-co-jump-chip" data-co-focus="${escapeHtml(it.id)}">
                      <span>${it.node.icon} ${escapeHtml(it.node.title)}</span>
                      <span>→</span>
                    </button>
                  `
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }
          </div>
        `;
        inspectorEl.querySelectorAll("[data-co-focus]").forEach((b) => {
          b.addEventListener("click", () => focusNode(b.dataset.coFocus, true));
        });
        return;
      }

      const item = layout.posById.get(focusId);
      const n = item.node;
      const w = worldMap.get(n.worldId) || { title: n.worldId, color: "#8eb8a3" };
      const stInfo = statusMap.get(n.id);
      const prereqIds = TUTOR && TUTOR.getPrereqs ? TUTOR.getPrereqs(n.id) : [];
      const depIds = TUTOR && TUTOR.getDependents ? TUTOR.getDependents(n.id) : [];
      const isBm = bookmarkSet.has(n.id);
      const hasNote = !!(global.PRIMER_MY_VAULT && global.PRIMER_MY_VAULT.getLessonNote(state, n.id));

      const statusLabel =
        stInfo.st === "mastered"
          ? `Mastered (Lv ${stInfo.lvl}/3)`
          : stInfo.st === "decay"
            ? `Due SM-2 Review (Lv ${stInfo.lvl}/3)`
            : stInfo.st === "ready"
              ? "Unlocked · Ready to Learn"
              : "Locked · Complete Prereqs";

      const mistakeCnt = mistakeMap.get(n.id) || 0;
      inspectorEl.innerHTML = `
        <div class="pr-co-insp-card">
          <div class="pr-co-insp-top">
            <span class="pr-work-tag">${escapeHtml(w.title.split(":")[0])}</span>
            <button type="button" class="ml-btn-mini ${isBm ? "active" : ""}" id="pr-co-bm-btn" title="Toggle Bookmark">${isBm ? "★ Starred" : "☆ Bookmark"}</button>
          </div>
          <h3 class="pr-co-insp-title">${n.icon} ${fmtMath(n.title)}</h3>
          <div class="pr-co-status-pill is-${stInfo.st}">${escapeHtml(statusLabel)}</div>
          ${mistakeCnt > 0 ? `<div class="pr-co-status-pill is-weak">⚠ ${mistakeCnt} logged mistake${mistakeCnt === 1 ? "" : "s"} in queue</div>` : ""}
          <p class="pr-co-insp-tag">${fmtMath(n.tagline)}</p>
          <div class="pr-co-insp-cheat"><strong>Cheat Code:</strong> ${fmtMath(n.cheatCode)}</div>

          <div class="pr-co-insp-actions">
            <button type="button" class="ml-btn-primary" id="pr-co-open-lesson">${stInfo.st === "locked" ? "Inspect Unlock Path →" : "Open Lesson →"}</button>
            <button type="button" class="ml-btn-mini" id="pr-co-open-note">${hasNote ? "📝 View Note" : "+ Note"}</button>
            ${mistakeCnt > 0 && hooks && hooks.onOpenMistakes ? `<button type="button" class="ml-btn-mini" id="pr-co-drill-mistakes">Drill Mistakes</button>` : ""}
          </div>

          <div class="pr-co-insp-sec">
            <div class="pr-field-lbl">Prerequisites (${prereqIds.length})</div>
            ${
              prereqIds.length === 0
                ? `<div class="ml-viz-sub">Root foundation — no prerequisites required!</div>`
                : `<div class="pr-co-chip-col">
                    ${prereqIds
                      .map((pid) => {
                        const pn = layout.posById.get(pid);
                        const pst = statusMap.get(pid);
                        if (!pn) return "";
                        const met = pst && (pst.st === "mastered" || pst.st === "decay");
                        return `<button type="button" class="pr-co-jump-chip ${met ? "met" : ""}" data-co-focus="${escapeHtml(pid)}"><span>${met ? "✓" : "○"} ${escapeHtml(pn.node.title)}</span><span>↗</span></button>`;
                      })
                      .join("")}
                  </div>`
            }
          </div>

          <div class="pr-co-insp-sec">
            <div class="pr-field-lbl">Unlocks Next (${depIds.length})</div>
            ${
              depIds.length === 0
                ? `<div class="ml-viz-sub">Apex skill in this branch!</div>`
                : `<div class="pr-co-chip-col">
                    ${depIds
                      .slice(0, 7)
                      .map((did) => {
                        const dn = layout.posById.get(did);
                        if (!dn) return "";
                        return `<button type="button" class="pr-co-jump-chip" data-co-focus="${escapeHtml(did)}"><span>→ ${escapeHtml(dn.node.title)}</span><span>↗</span></button>`;
                      })
                      .join("")}
                  </div>`
            }
          </div>
        </div>
      `;

      const openBtn = document.getElementById("pr-co-open-lesson");
      if (openBtn && hooks && hooks.onOpenNode) {
        openBtn.addEventListener("click", () => hooks.onOpenNode(n.id));
      }
      const bmBtn = document.getElementById("pr-co-bm-btn");
      if (bmBtn && global.PRIMER_MY_VAULT) {
        bmBtn.addEventListener("click", () => {
          if (hooks && hooks.onTap) hooks.onTap();
          const nowStarred = global.PRIMER_MY_VAULT.toggleBookmark(state, n.id);
          if (nowStarred) bookmarkSet.add(n.id);
          else bookmarkSet.delete(n.id);
          if (hooks && hooks.onSave) hooks.onSave();
          renderInspector();
          draw();
        });
      }
      const noteBtn = document.getElementById("pr-co-open-note");
      if (noteBtn && hooks && hooks.onOpenLessonNote) {
        noteBtn.addEventListener("click", () => hooks.onOpenLessonNote(n));
      }
      const drillMisBtn = document.getElementById("pr-co-drill-mistakes");
      if (drillMisBtn && hooks && hooks.onOpenMistakes) {
        drillMisBtn.addEventListener("click", () => hooks.onOpenMistakes());
      }
      inspectorEl.querySelectorAll("[data-co-focus]").forEach((b) => {
        b.addEventListener("click", () => focusNode(b.dataset.coFocus, true));
      });
    }

    function draw() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = box.getBoundingClientRect();
      cssW = Math.max(260, Math.round(rect.width || 700));
      cssH = Math.max(360, Math.round(rect.height || 540));
      if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
      }
      if (!ui.initializedCam) {
        fitCamera();
        ui.initializedCam = true;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#040407";
      ctx.fillRect(0, 0, cssW, cssH);

      // Subtle concentric depth rings + sector labels in world space
      ctx.save();
      ctx.translate(cssW / 2, cssH / 2);
      ctx.scale(ui.zoom, ui.zoom);
      ctx.translate(-ui.camX, -ui.camY);

      // Faint polar rings
      ctx.strokeStyle = "rgba(255,255,255,0.035)";
      ctx.lineWidth = 1 / ui.zoom;
      for (let r = 140; r <= 820; r += 135) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Sector labels
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${Math.max(13, Math.round(14 / Math.min(1, ui.zoom)))}px Inter, system-ui, sans-serif`;
      for (const sa of layout.sectorArcs) {
        const lx = Math.cos(sa.midAngle) * 860;
        const ly = Math.sin(sa.midAngle) * 860;
        ctx.fillStyle = "rgba(255,255,255,0.16)";
        ctx.fillText(sa.sector.label, lx, ly);
      }

      const activeId = ui.hoveredId || ui.selectedId;
      const chains = activeId ? collectChainSets(activeId, TUTOR) : { ancestors: new Set(), descendants: new Set() };
      const q = (ui.searchQuery || "").toLowerCase().trim();
      const searchMatches = q
        ? new Set(layout.nodes.filter((it) => it.node.title.toLowerCase().includes(q) || it.id.toLowerCase().includes(q) || it.node.worldId.toLowerCase().includes(q)).map((it) => it.id))
        : null;

      // 1. Draw prerequisite edges
      for (const e of layout.edges) {
        const isUpEdge = activeId && (e.to.id === activeId || chains.ancestors.has(e.to.id)) && (chains.ancestors.has(e.from.id) || e.from.id === activeId);
        const isDownEdge = activeId && (e.from.id === activeId || chains.descendants.has(e.from.id)) && (chains.descendants.has(e.to.id) || e.to.id === activeId);
        const inSpot = !spotlightSet || (spotlightSet.has(e.from.id) && spotlightSet.has(e.to.id));

        if (activeId && !isUpEdge && !isDownEdge && !inSpot) continue;

        ctx.beginPath();
        const mx = (e.from.x + e.to.x) / 2;
        const my = (e.from.y + e.to.y) / 2;
        const curveOffset = e.crossSector ? 0.12 : 0.06;
        const cx = mx - (e.to.y - e.from.y) * curveOffset;
        const cy = my + (e.to.x - e.from.x) * curveOffset;
        ctx.moveTo(e.from.x, e.from.y);
        ctx.quadraticCurveTo(cx, cy, e.to.x, e.to.y);

        if (isUpEdge) {
          ctx.strokeStyle = "rgba(120, 180, 245, 0.78)";
          ctx.lineWidth = 2.2 / Math.max(0.45, ui.zoom);
        } else if (isDownEdge) {
          ctx.strokeStyle = "rgba(142, 184, 163, 0.78)";
          ctx.lineWidth = 2.2 / Math.max(0.45, ui.zoom);
        } else if (spotlightSet && inSpot) {
          ctx.strokeStyle = "rgba(142, 184, 163, 0.34)";
          ctx.lineWidth = 1.4 / Math.max(0.5, ui.zoom);
        } else {
          ctx.strokeStyle = e.crossSector ? "rgba(142,184,163,0.055)" : "rgba(255,255,255,0.09)";
          ctx.lineWidth = 1 / Math.max(0.55, ui.zoom);
        }
        ctx.stroke();
      }

      // 2. Draw star nodes
      for (const item of layout.nodes) {
        const st = statusMap.get(item.id).st;
        const isFocus = item.id === activeId;
        const isSel = item.id === ui.selectedId;
        const isAnc = chains.ancestors.has(item.id);
        const isDesc = chains.descendants.has(item.id);
        const inSpot = !spotlightSet || spotlightSet.has(item.id);
        const inSearch = !searchMatches || searchMatches.has(item.id);

        let alpha = 1;
        if (spotlightSet && !inSpot) alpha = 0.14;
        if (searchMatches && !inSearch) alpha = Math.min(alpha, 0.16);
        if (activeId && !isFocus && !isAnc && !isDesc) alpha = Math.min(alpha, 0.22);

        const baseRadius = isFocus || isSel ? 12.5 : st === "mastered" ? 9.5 : st === "ready" ? 8.5 : 7;
        let fill = "#2b2f3a";
        let stroke = "rgba(255,255,255,0.22)";
        let glow = null;

        if (st === "mastered") {
          fill = "#8eb8a3";
          stroke = "#d7f0e2";
          glow = "rgba(142,184,163,0.45)";
        } else if (st === "decay") {
          fill = "#eab349";
          stroke = "#fef08a";
          glow = "rgba(234,179,73,0.5)";
        } else if (st === "ready") {
          fill = "#162134";
          stroke = "#78b4f5";
          glow = "rgba(120,180,245,0.35)";
        }
        if (isAnc) {
          stroke = "#78b4f5";
          glow = "rgba(120,180,245,0.5)";
        } else if (isDesc) {
          stroke = "#8eb8a3";
          glow = "rgba(142,184,163,0.45)";
        }

        ctx.save();
        ctx.globalAlpha = alpha;

        if ((glow && (isFocus || isSel || st === "mastered" || st === "decay")) || (searchMatches && inSearch)) {
          ctx.beginPath();
          ctx.arc(item.x, item.y, baseRadius + 6, 0, Math.PI * 2);
          ctx.fillStyle = glow || "rgba(120,180,245,0.3)";
          ctx.fill();
        }

        if (bookmarkSet.has(item.id)) {
          ctx.beginPath();
          ctx.arc(item.x, item.y, baseRadius + 4.5, 0, Math.PI * 2);
          ctx.strokeStyle = "#eab349";
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }

        if (mistakeMap.has(item.id)) {
          ctx.beginPath();
          ctx.arc(item.x, item.y, baseRadius + 7.5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(232, 121, 121, 0.85)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(item.x, item.y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = isFocus || isSel ? 2.6 : 1.5;
        ctx.stroke();

        // Draw crisp node labels when zoomed in or focused/highlighted
        if (ui.zoom >= 0.85 || isFocus || isSel || (searchMatches && inSearch && searchMatches.size <= 12) || (spotlightSet && inSpot && spotlightSet.size <= 16)) {
          ctx.font = `${isFocus || isSel ? "700" : "500"} ${Math.max(10, Math.round(11 / Math.min(1.1, ui.zoom)))}px Inter, system-ui, sans-serif`;
          ctx.fillStyle = isFocus || isSel ? "#ffffff" : "rgba(240,242,246,0.86)";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          const shortTitle = item.node.title.length > 26 ? item.node.title.slice(0, 24) + "…" : item.node.title;
          ctx.fillText(shortTitle, item.x, item.y + baseRadius + 5);
        }
        ctx.restore();
      }

      ctx.restore();
    }

    function hitTest(sx, sy) {
      const { wx, wy } = screenToWorld(sx, sy);
      const hitRad = Math.max(16, 18 / Math.max(0.35, ui.zoom));
      let best = null;
      let bestD2 = hitRad * hitRad;
      for (const item of layout.nodes) {
        const dx = item.x - wx;
        const dy = item.y - wy;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD2) {
          bestD2 = d2;
          best = item;
        }
      }
      return best;
    }

    function focusNode(nodeId, select) {
      const it = layout.posById.get(nodeId);
      if (!it) return;
      ui.camX = it.x;
      ui.camY = it.y;
      ui.zoom = Math.max(ui.zoom, 0.95);
      if (select) ui.selectedId = nodeId;
      renderInspector();
      draw();
    }

    // Pointer pan & click
    let dragging = false;
    let moved = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener("pointerdown", (ev) => {
      if (ev.button && ev.button !== 0) return;
      dragging = true;
      moved = false;
      lastX = ev.clientX;
      lastY = ev.clientY;
      if (canvas.setPointerCapture) {
        try {
          canvas.setPointerCapture(ev.pointerId);
        } catch (_e) {}
      }
    });

    canvas.addEventListener("pointermove", (ev) => {
      const rect = canvas.getBoundingClientRect();
      const sx = ev.clientX - rect.left;
      const sy = ev.clientY - rect.top;

      if (dragging) {
        const dx = ev.clientX - lastX;
        const dy = ev.clientY - lastY;
        if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
        ui.camX -= dx / ui.zoom;
        ui.camY -= dy / ui.zoom;
        lastX = ev.clientX;
        lastY = ev.clientY;
        draw();
        return;
      }

      const hit = hitTest(sx, sy);
      const nextHover = hit ? hit.id : null;
      if (nextHover !== ui.hoveredId) {
        ui.hoveredId = nextHover;
        canvas.style.cursor = hit ? "pointer" : "grab";
        draw();
      }
      if (tooltipEl) {
        if (hit) {
          const st = statusMap.get(hit.id);
          const w = worldMap.get(hit.node.worldId);
          tooltipEl.innerHTML = `<strong>${hit.node.icon} ${escapeHtml(hit.node.title)}</strong><span>${escapeHtml(w ? w.title.split(":")[0] : hit.node.worldId)} · ${st.st.toUpperCase()}</span>`;
          tooltipEl.style.left = `${Math.min(cssW - 210, Math.max(10, sx + 14))}px`;
          tooltipEl.style.top = `${Math.max(10, sy - 44)}px`;
          tooltipEl.classList.remove("hidden");
        } else {
          tooltipEl.classList.add("hidden");
        }
      }
    });

    canvas.addEventListener("pointerup", (ev) => {
      if (!dragging) return;
      dragging = false;
      if (!moved) {
        const rect = canvas.getBoundingClientRect();
        const hit = hitTest(ev.clientX - rect.left, ev.clientY - rect.top);
        if (hit) {
          if (hooks && hooks.onTap) hooks.onTap();
          ui.selectedId = hit.id;
          renderInspector();
          draw();
        }
      }
    });

    canvas.addEventListener("pointerleave", () => {
      dragging = false;
      if (ui.hoveredId) {
        ui.hoveredId = null;
        draw();
      }
      if (tooltipEl) tooltipEl.classList.add("hidden");
    });

    // Wheel zoom centered at pointer
    canvas.addEventListener(
      "wheel",
      (ev) => {
        ev.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const sx = ev.clientX - rect.left;
        const sy = ev.clientY - rect.top;
        const before = screenToWorld(sx, sy);
        const factor = ev.deltaY < 0 ? 1.14 : 0.88;
        ui.zoom = Math.max(0.22, Math.min(2.4, ui.zoom * factor));
        const after = screenToWorld(sx, sy);
        ui.camX += before.wx - after.wx;
        ui.camY += before.wy - after.wy;
        draw();
      },
      { passive: false }
    );

    // Controls bindings
    const searchEl = document.getElementById("pr-co-search");
    if (searchEl) {
      searchEl.addEventListener("input", () => {
        ui.searchQuery = searchEl.value;
        const q = ui.searchQuery.toLowerCase().trim();
        if (q.length >= 2) {
          const match = layout.nodes.find((it) => it.node.title.toLowerCase().includes(q) || it.id.toLowerCase().includes(q));
          if (match) {
            ui.selectedId = match.id;
            ui.camX = match.x;
            ui.camY = match.y;
            ui.zoom = Math.max(ui.zoom, 0.9);
            renderInspector();
          }
        }
        draw();
      });
    }

    const filterEl = document.getElementById("pr-co-filter");
    if (filterEl) {
      filterEl.addEventListener("change", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        ui.filterValue = filterEl.value;
        renderConstellationView(container, state, DATA, TUTOR, hooks);
      });
    }

    const zin = document.getElementById("pr-co-zin");
    if (zin) {
      zin.addEventListener("click", () => {
        ui.zoom = Math.min(2.4, ui.zoom * 1.25);
        draw();
      });
    }
    const zout = document.getElementById("pr-co-zout");
    if (zout) {
      zout.addEventListener("click", () => {
        ui.zoom = Math.max(0.22, ui.zoom * 0.8);
        draw();
      });
    }
    const fitBtn = document.getElementById("pr-co-fit");
    if (fitBtn) {
      fitBtn.addEventListener("click", () => {
        fitCamera();
        draw();
      });
    }
    const nextBtn = document.getElementById("pr-co-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const nextReady = layout.nodes.find((it) => statusMap.get(it.id).st === "decay") || layout.nodes.find((it) => statusMap.get(it.id).st === "ready");
        if (nextReady) focusNode(nextReady.id, true);
      });
    }

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => draw());
      ro.observe(box);
    }

    renderInspector();
    if (typeof requestAnimationFrame !== "undefined") {
      requestAnimationFrame(draw);
    } else {
      draw();
    }
  }

  global.PRIMER_CONSTELLATION = {
    SECTORS,
    computeConstellationLayout,
    collectChainSets,
    focusNodeId(nodeId) {
      ui.selectedId = nodeId;
    },
    renderConstellationView
  };
})(typeof window !== "undefined" ? window : globalThis);
