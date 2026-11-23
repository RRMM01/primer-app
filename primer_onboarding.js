(function (global) {
  "use strict";

  const ALL_TABS = [
    { id: "path", label: "Dashboard", group: "Core", locked: true },
    { id: "constellation", label: "Constellation Map", group: "Core" },
    { id: "work", label: "Work Studio", group: "Core" },
    { id: "exam", label: "Exam Mode", group: "Core" },
    { id: "forge", label: "Code Studio", group: "Core" },
    { id: "myvault", label: "My Vault", group: "Core" },
    { id: "tutor", label: "Smart Tutor", group: "Practice" },
    { id: "memorize", label: "Memorize Vault", group: "Practice" },
    { id: "gym", label: "Speed Gym", group: "Practice" },
    { id: "lab", label: "Playgrounds", group: "Practice" },
    { id: "traps", label: "Traps & Bosses", group: "Resources" },
    { id: "cheatsheet", label: "Reference Guide", group: "Resources" }
  ];

  const ALL_SUBJECTS = [
    { id: "subject:math", label: "Math (Foundations → Calculus)" },
    { id: "subject:ai_tech", label: "Coding, DSA & AI" },
    { id: "subject:stem", label: "Physics, Chem, Bio & Earth" },
    { id: "subject:ph_fil", label: "PH History & Filipino Wika" },
    { id: "subject:shapes_logic", label: "Logic, Verbal & Abstract Shapes" },
    { id: "subject:shs_life", label: "Economics, Philosophy & Life" },
    { id: "subject:exam_prep", label: "PH Exam Mastery (World 25)" }
  ];

  const ACCENT_SWATCHES = [
    { id: "", label: "Palette Default", hex: "" },
    { id: "#8eb8a3", label: "Eucalyptus Sage", hex: "#8eb8a3" },
    { id: "#78b4f5", label: "Obsidian Cobalt", hex: "#78b4f5" },
    { id: "#d98296", label: "Kyoto Rose", hex: "#d98296" },
    { id: "#e5e5ea", label: "Pure Titanium", hex: "#e5e5ea" },
    { id: "#d4a24c", label: "Amber Gold", hex: "#d4a24c" },
    { id: "#a78bfa", label: "Prism Violet", hex: "#a78bfa" },
    { id: "#64c2c8", label: "Arctic Teal", hex: "#64c2c8" }
  ];

  const DEFAULT_STUDIO_CONFIG = {
    displayName: "",
    archetype: "balanced",
    density: "balanced",
    fontScale: 100,
    cardRadius: "modern",
    accentCustom: "",
    splashMode: "cinematic",
    reducedMotion: false,
    landingTab: "path",
    showConfidenceBar: true,
    defaultFocusMin: 25,
    defaultAudioMode: "off",
    widgets: {
      telemetryHud: false,
      dailySession: true,
      unfairEdge: true,
      quickGuide: true,
      zeroShelf: true,
      examBanner: true,
      focusWidget: true,
      topbarMetrics: true,
      navBadges: true,
      footer: true,
      browseAllWorlds: false
    },
    hiddenTabs: [],
    hiddenSubjects: []
  };

  const ARCHETYPES = [
    {
      id: "zen",
      badge: "MINIMALIST · DISTRACTION-FREE",
      title: "Ultra-Clean Zen",
      tagline: "Quiet obsidian canvas with zero clutter — just your next lesson, core subjects, and pure focus.",
      bloatScore: 22,
      bloatLabel: "Ultra-Clean",
      patchConfig: {
        archetype: "zen",
        density: "spacious",
        cardRadius: "modern",
        fontScale: 100,
        splashMode: "fast",
        showConfidenceBar: false,
        defaultFocusMin: 25,
        defaultAudioMode: "off",
        widgets: {
          telemetryHud: false,
          dailySession: false,
          unfairEdge: false,
          quickGuide: false,
          zeroShelf: false,
          examBanner: false,
          focusWidget: false,
          topbarMetrics: false,
          navBadges: false,
          footer: false,
          browseAllWorlds: false
        },
        hiddenTabs: ["traps", "cheatsheet", "gym", "memorize"]
      },
      patchState: {
        paperTheme: "monochrome",
        hideHowItWorks: true,
        pathBrowseAll: false,
        chillMode: true,
        instantAdvance: true
      }
    },
    {
      id: "balanced",
      badge: "RECOMMENDED · DAILY RHYTHM",
      title: "Balanced Studio",
      tagline: "The signature Primer workflow: Today's 15m Loop, Unfair Edge tools, Focus Timer & clean Subject Library.",
      bloatScore: 62,
      bloatLabel: "Balanced",
      patchConfig: {
        archetype: "balanced",
        density: "balanced",
        cardRadius: "modern",
        fontScale: 100,
        splashMode: "cinematic",
        showConfidenceBar: true,
        defaultFocusMin: 25,
        defaultAudioMode: "off",
        widgets: {
          telemetryHud: false,
          dailySession: true,
          unfairEdge: true,
          quickGuide: true,
          zeroShelf: true,
          examBanner: true,
          focusWidget: true,
          topbarMetrics: true,
          navBadges: true,
          footer: true,
          browseAllWorlds: false
        },
        hiddenTabs: []
      },
      patchState: {
        paperTheme: "noir",
        hideHowItWorks: false,
        pathBrowseAll: false,
        chillMode: true,
        instantAdvance: true
      }
    },
    {
      id: "exam_grinder",
      badge: "HIGH-YIELD · DOST · UPCAT · CSE · NMAT",
      title: "Exam Grinder",
      tagline: "Compact cockpit tuned for competitive exams: Telemetry HUD, Calibration Radar, ROI Sniper & CBT Simulators.",
      bloatScore: 84,
      bloatLabel: "Pro Dense",
      patchConfig: {
        archetype: "exam_grinder",
        density: "compact",
        cardRadius: "sharp",
        fontScale: 100,
        splashMode: "fast",
        showConfidenceBar: true,
        defaultFocusMin: 25,
        defaultAudioMode: "brown",
        widgets: {
          telemetryHud: true,
          dailySession: true,
          unfairEdge: true,
          quickGuide: false,
          zeroShelf: false,
          examBanner: true,
          focusWidget: true,
          topbarMetrics: true,
          navBadges: true,
          footer: true,
          browseAllWorlds: false
        },
        hiddenTabs: []
      },
      patchState: {
        paperTheme: "carbon",
        hideHowItWorks: true,
        pathBrowseAll: false,
        strictPrereqs: true,
        chillMode: true,
        instantAdvance: true,
        edgeInterleavePreset: "ph_exams"
      }
    },
    {
      id: "command_center",
      badge: "MAX DENSITY · EVERYTHING UNLOCKED",
      title: "Max Command Center",
      tagline: "Full-throttle power-user HUD: every widget, live telemetry strip, all 25 worlds expanded & all 256 skills unlocked.",
      bloatScore: 100,
      bloatLabel: "Max Bloated",
      patchConfig: {
        archetype: "command_center",
        density: "compact",
        cardRadius: "sharp",
        fontScale: 90,
        splashMode: "cinematic",
        showConfidenceBar: true,
        defaultFocusMin: 50,
        defaultAudioMode: "gamma40",
        widgets: {
          telemetryHud: true,
          dailySession: true,
          unfairEdge: true,
          quickGuide: true,
          zeroShelf: true,
          examBanner: true,
          focusWidget: true,
          topbarMetrics: true,
          navBadges: true,
          footer: true,
          browseAllWorlds: true
        },
        hiddenTabs: []
      },
      patchState: {
        paperTheme: "kyoto",
        hideHowItWorks: false,
        pathBrowseAll: true,
        strictPrereqs: false,
        chillMode: true,
        instantAdvance: true,
        edgeInterleavePreset: "smart"
      }
    }
  ];

  function cloneWidgets(w) {
    return Object.assign({}, DEFAULT_STUDIO_CONFIG.widgets, w || {});
  }

  function ensureStudioConfig(state) {
    if (!state || typeof state !== "object") return DEFAULT_STUDIO_CONFIG;
    if (!state.studioConfig || typeof state.studioConfig !== "object") {
      state.studioConfig = Object.assign({}, DEFAULT_STUDIO_CONFIG, {
        widgets: cloneWidgets(),
        hiddenTabs: [],
        hiddenSubjects: []
      });
    } else {
      const sc = state.studioConfig;
      sc.displayName = typeof sc.displayName === "string" ? sc.displayName.slice(0, 32) : "";
      sc.archetype = typeof sc.archetype === "string" ? sc.archetype : "balanced";
      sc.density = ["spacious", "balanced", "compact"].includes(sc.density) ? sc.density : "balanced";
      sc.fontScale = [90, 100, 110, 120].includes(Number(sc.fontScale)) ? Number(sc.fontScale) : 100;
      sc.cardRadius = ["sharp", "modern", "soft"].includes(sc.cardRadius) ? sc.cardRadius : "modern";
      sc.accentCustom = typeof sc.accentCustom === "string" && /^#[0-9a-fA-F]{6}$/.test(sc.accentCustom) ? sc.accentCustom : "";
      sc.splashMode = ["cinematic", "fast", "off"].includes(sc.splashMode) ? sc.splashMode : "cinematic";
      sc.reducedMotion = !!sc.reducedMotion;
      sc.landingTab = ALL_TABS.some((t) => t.id === sc.landingTab) ? sc.landingTab : "path";
      sc.showConfidenceBar = sc.showConfidenceBar !== false;
      sc.defaultFocusMin = [15, 25, 50].includes(Number(sc.defaultFocusMin)) ? Number(sc.defaultFocusMin) : 25;
      sc.defaultAudioMode = ["off", "brown", "gamma40", "rain"].includes(sc.defaultAudioMode) ? sc.defaultAudioMode : "off";
      sc.widgets = cloneWidgets(sc.widgets);
      sc.hiddenTabs = Array.isArray(sc.hiddenTabs) ? sc.hiddenTabs.filter((id) => id !== "path" && ALL_TABS.some((t) => t.id === id)) : [];
      sc.hiddenSubjects = Array.isArray(sc.hiddenSubjects) ? sc.hiddenSubjects.filter((id) => ALL_SUBJECTS.some((s) => s.id === id)) : [];
    }
    if (typeof state.onboardingCompleted !== "boolean") {
      // Existing active learners who already have progress are migrated smoothly; brand-new / reset profiles enter Intro!
      const hasProgress = (Number(state.xp) || 0) > 0 ||
        Object.keys(state.nodeMastery || {}).length > 0 ||
        Object.keys(state.forgeSolved || {}).length > 0 ||
        (Array.isArray(state.examHistory) && state.examHistory.length > 0);
      state.onboardingCompleted = hasProgress;
    }
    return state.studioConfig;
  }

  function applyArchetypeToState(state, archetypeId) {
    ensureStudioConfig(state);
    const arch = ARCHETYPES.find((a) => a.id === archetypeId);
    if (!arch) return state;
    const sc = state.studioConfig;
    const prevName = sc.displayName;
    const prevHiddenSubjects = sc.hiddenSubjects.slice();
    Object.assign(sc, arch.patchConfig, {
      displayName: prevName,
      widgets: cloneWidgets(arch.patchConfig.widgets),
      hiddenTabs: (arch.patchConfig.hiddenTabs || []).slice(),
      hiddenSubjects: prevHiddenSubjects
    });
    Object.assign(state, arch.patchState);
    // Ensure chosen palette & emblem are unlocked
    if (!Array.isArray(state.ownedThemes)) state.ownedThemes = ["noir"];
    if (!state.ownedThemes.includes(state.paperTheme)) state.ownedThemes.push(state.paperTheme);
    if (!Array.isArray(state.ownedAccessories)) state.ownedAccessories = ["none"];
    return state;
  }

  function computeBloatMetrics(state) {
    const sc = ensureStudioConfig(state);
    const widgetKeys = Object.keys(DEFAULT_STUDIO_CONFIG.widgets);
    const activeWidgets = widgetKeys.filter((k) => !!sc.widgets[k]).length;
    const visibleTabs = ALL_TABS.length - (sc.hiddenTabs || []).length;
    const densityBonus = sc.density === "compact" ? 12 : sc.density === "spacious" ? -10 : 0;
    const rawPct = Math.round(((activeWidgets / widgetKeys.length) * 70) + ((visibleTabs / ALL_TABS.length) * 30) + densityBonus);
    const score = Math.max(5, Math.min(100, rawPct));
    let label = "Balanced Studio";
    if (score <= 32) label = "Ultra-Clean Zen";
    else if (score <= 55) label = "Clean & Focused";
    else if (score <= 78) label = "Balanced Power";
    else if (score <= 92) label = "High-Density Pro";
    else label = "Max Command Center";
    return { score, label, activeWidgets, totalWidgets: widgetKeys.length, visibleTabs, totalTabs: ALL_TABS.length };
  }

  function hexToRgb(hex) {
    const clean = String(hex || "").replace("#", "");
    if (clean.length !== 6) return null;
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    if ([r, g, b].some((v) => Number.isNaN(v))) return null;
    return { r, g, b };
  }

  function applyStudioConfigToDom(state) {
    if (typeof document === "undefined" || !document.body) return;
    const sc = ensureStudioConfig(state);
    const body = document.body;

    body.classList.remove(
      "pr-density-spacious", "pr-density-compact",
      "pr-radius-sharp", "pr-radius-soft",
      "pr-scale-90", "pr-scale-110", "pr-scale-120",
      "pr-motion-reduced", "pr-hide-nav-badges", "pr-hide-footer"
    );

    if (sc.density === "spacious") body.classList.add("pr-density-spacious");
    else if (sc.density === "compact") body.classList.add("pr-density-compact");

    if (sc.cardRadius === "sharp") body.classList.add("pr-radius-sharp");
    else if (sc.cardRadius === "soft") body.classList.add("pr-radius-soft");

    if (sc.fontScale === 90) body.classList.add("pr-scale-90");
    else if (sc.fontScale === 110) body.classList.add("pr-scale-110");
    else if (sc.fontScale === 120) body.classList.add("pr-scale-120");

    if (sc.reducedMotion) body.classList.add("pr-motion-reduced");
    if (!sc.widgets.navBadges) body.classList.add("pr-hide-nav-badges");
    if (!sc.widgets.footer) body.classList.add("pr-hide-footer");

    // Apply custom OLED accent override cleanly on body (never :root!)
    if (sc.accentCustom && /^#[0-9a-fA-F]{6}$/.test(sc.accentCustom)) {
      const rgb = hexToRgb(sc.accentCustom);
      if (rgb) {
        body.style.setProperty("--ml-primary", sc.accentCustom);
        body.style.setProperty("--ml-primary-fill", sc.accentCustom);
        body.style.setProperty("--ml-primary-hover", sc.accentCustom);
        body.style.setProperty("--ml-primary-soft", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.13)`);
        body.style.setProperty("--ml-primary-border", `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.34)`);
      }
    } else {
      body.style.removeProperty("--ml-primary");
      body.style.removeProperty("--ml-primary-fill");
      body.style.removeProperty("--ml-primary-hover");
      body.style.removeProperty("--ml-primary-soft");
      body.style.removeProperty("--ml-primary-border");
    }
  }

  function mergeStudioConfig(base, inc) {
    const b = ensureStudioConfig(Object.assign({}, base));
    const i = ensureStudioConfig(Object.assign({}, inc));
    return {
      onboardingCompleted: !!(base && base.onboardingCompleted) || !!(inc && inc.onboardingCompleted),
      studioConfig: Object.assign({}, b, i.displayName ? { displayName: i.displayName } : {}, {
        widgets: cloneWidgets(b.widgets),
        hiddenTabs: (b.hiddenTabs || []).slice(),
        hiddenSubjects: (b.hiddenSubjects || []).slice()
      })
    };
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ==================== BOOT SPLASH SCREEN ====================
  function runBootSplash(state, buildInfo, onDone) {
    if (typeof document === "undefined") {
      if (onDone) onDone();
      return;
    }
    const sc = ensureStudioConfig(state);
    const el = document.getElementById("primer-boot-splash");
    if (!el) {
      if (onDone) onDone();
      return;
    }

    if (sc.splashMode === "off" || sc.reducedMotion) {
      el.classList.add("is-gone");
      if (onDone) onDone();
      return;
    }

    const durationMs = sc.splashMode === "fast" ? 420 : 980;
    const ver = (buildInfo && buildInfo.version) || "3.3.0";
    const codename = (buildInfo && buildInfo.codename) || "Flagship Studio";
    const nameLine = sc.displayName ? `Welcome back, ${sc.displayName}` : "First-Principles Learning OS";

    el.innerHTML = `
      <div class="pr-splash-grid" aria-hidden="true"></div>
      <div class="pr-splash-bloom" aria-hidden="true"></div>
      <div class="pr-splash-core">
        <div class="pr-splash-mark">
          <svg width="74" height="74" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <path class="pr-splash-hex" d="M50 14 L81 32 L81 68 L50 86 L19 68 L19 32 Z" stroke="var(--ml-primary)" stroke-width="3.6" stroke-linejoin="round" fill="var(--ml-primary-soft)"/>
            <path class="pr-splash-rays" d="M50 14 L50 50 M81 32 L50 50 M19 32 L50 50 M50 50 L50 86" stroke="rgba(255,255,255,0.42)" stroke-width="2.2" stroke-linecap="round"/>
            <circle class="pr-splash-node" cx="50" cy="50" r="7.5" fill="var(--ml-primary)"/>
            <circle cx="50" cy="14" r="4" fill="#f7f7f9"/>
            <circle cx="81" cy="32" r="4" fill="#f7f7f9"/>
            <circle cx="19" cy="32" r="4" fill="#f7f7f9"/>
          </svg>
        </div>
        <div class="pr-splash-wordmark">PRIMER STUDIO</div>
        <div class="pr-splash-sub">${esc(nameLine)} · v${esc(ver)}</div>
        <div class="pr-splash-bar"><div class="pr-splash-bar-fill" style="animation-duration:${durationMs}ms;"></div></div>
        <div class="pr-splash-telemetry">
          <span>25 Worlds</span><span>·</span><span>256 Skills</span><span>·</span><span>28 Playgrounds</span><span>·</span><span>10 PH Exams</span><span>·</span><span>${esc(codename)}</span>
        </div>
        <div class="pr-splash-skip">Click or press any key to skip</div>
      </div>
    `;
    el.classList.remove("is-gone", "is-leaving");

    let finished = false;
    let timerId = null;

    function dismiss() {
      if (finished) return;
      finished = true;
      if (timerId) clearTimeout(timerId);
      el.removeEventListener("click", dismiss);
      document.removeEventListener("keydown", onKey);
      el.classList.add("is-leaving");
      setTimeout(() => {
        el.classList.add("is-gone");
        if (onDone) onDone();
      }, 260);
    }

    function onKey(e) {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        dismiss();
      }
    }

    el.addEventListener("click", dismiss);
    document.addEventListener("keydown", onKey);
    timerId = setTimeout(dismiss, durationMs);
  }

  // ==================== FLAGSHIP INTRO & ADVANCED STUDIO CONFIGURATOR ====================
  function openIntroStudio(opts) {
    if (typeof document === "undefined") return;
    const {
      state,
      DATA,
      EDGE,
      BUILD,
      renderStudioMarkSvg,
      applyThemeClass,
      onComplete,
      onOpenBackup,
      startStep,
      isResetFlow
    } = opts;

    ensureStudioConfig(state);
    // Unlock all 4 Obsidian palettes & emblems freely for studio customization!
    state.ownedThemes = ["noir", "carbon", "kyoto", "monochrome"];
    state.ownedAccessories = ["none", "mortarboard", "goggles", "monocle"];

    let overlay = document.getElementById("primer-intro-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "primer-intro-overlay";
      overlay.className = "pr-intro-overlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Primer Studio Intro and Setup");
      document.body.appendChild(overlay);
    }
    overlay.classList.remove("hidden");

    const ui = {
      step: startStep || "hero", // "hero" | "config"
      configTab: "layout" // "identity" | "layout" | "aesthetics" | "engine"
    };

    function syncLivePreviewAndTheme() {
      applyThemeClass();
      applyStudioConfigToDom(state);
    }

    function closeAndLaunch(markComplete) {
      if (markComplete) {
        state.onboardingCompleted = true;
        const sc = ensureStudioConfig(state);
        state.hideHowItWorks = !sc.widgets.quickGuide;
        state.pathBrowseAll = !!sc.widgets.browseAllWorlds;
        if (sc.landingTab && ALL_TABS.some((t) => t.id === sc.landingTab)) {
          state.activeTab = sc.landingTab;
        }
      }
      syncLivePreviewAndTheme();
      overlay.classList.add("pr-intro-leaving");
      setTimeout(() => {
        overlay.classList.add("hidden");
        overlay.classList.remove("pr-intro-leaving");
        if (onComplete) onComplete(state);
      }, 210);
    }

    function renderMiniWireframe(arch) {
      const w = arch.patchConfig.widgets;
      const dense = arch.patchConfig.density === "compact";
      return `
        <div class="pr-wireframe ${dense ? "dense" : ""}">
          <div class="pr-wf-side">
            <span class="pr-wf-dot active"></span>
            <span class="pr-wf-dot"></span>
            <span class="pr-wf-dot"></span>
            ${(arch.patchConfig.hiddenTabs || []).length === 0 ? `<span class="pr-wf-dot"></span><span class="pr-wf-dot"></span>` : ""}
            ${w.focusWidget ? `<span class="pr-wf-timer"></span>` : ""}
          </div>
          <div class="pr-wf-main">
            ${w.telemetryHud ? `<div class="pr-wf-hud"></div>` : ""}
            <div class="pr-wf-hero"><span></span><span></span></div>
            ${w.dailySession ? `<div class="pr-wf-strip"></div>` : ""}
            ${w.unfairEdge ? `<div class="pr-wf-cols"><span></span><span></span></div>` : ""}
            <div class="pr-wf-grid"><span></span><span></span><span></span></div>
          </div>
        </div>
      `;
    }

    function renderLiveBlueprintPreview() {
      const sc = ensureStudioConfig(state);
      const bloat = computeBloatMetrics(state);
      const visibleTabs = ALL_TABS.filter((t) => !(sc.hiddenTabs || []).includes(t.id));
      const goals = (EDGE && EDGE.EXAM_GOALS) || [{ id: "auto", short: "Polymath" }];
      const activeGoal = goals.find((g) => g.id === (state.examTarget && state.examTarget.goalId)) || goals[0];
      const greeting = sc.displayName ? `Welcome, ${sc.displayName}` : "Your Custom Studio";

      return `
        <div class="pr-cfg-preview-card">
          <div class="pr-cfg-preview-head">
            <div style="display:flex; align-items:center; gap:9px;">
              ${renderStudioMarkSvg ? renderStudioMarkSvg(28) : ""}
              <div>
                <div class="pr-cfg-prev-kicker">LIVE WORKSPACE BLUEPRINT</div>
                <strong>${esc(greeting)}</strong>
              </div>
            </div>
            <span class="pr-cfg-bloat-pill">${esc(bloat.label)} · ${bloat.score}%</span>
          </div>

          <div class="pr-cfg-meter-wrap">
            <div class="pr-cfg-meter-labels">
              <span>Clean Zen</span>
              <span>${bloat.activeWidgets}/${bloat.totalWidgets} widgets · ${bloat.visibleTabs}/${bloat.totalTabs} tabs</span>
              <span>Max Bloated</span>
            </div>
            <div class="pr-cfg-meter-track">
              <div class="pr-cfg-meter-fill" style="width:${bloat.score}%;"></div>
            </div>
          </div>

          <div class="pr-live-mini-shell density-${esc(sc.density)} radius-${esc(sc.cardRadius)}">
            <div class="pr-lm-side">
              <div class="pr-lm-brand"></div>
              <div class="pr-lm-nav">
                ${visibleTabs.slice(0, 8).map((t, i) => `<div class="pr-lm-nav-item ${i === 0 ? "active" : ""}"><span>${esc(t.label.split(" ")[0])}</span>${sc.widgets.navBadges && i < 4 ? `<i class="pr-lm-b"></i>` : ""}</div>`).join("")}
                ${visibleTabs.length > 8 ? `<div class="pr-lm-more">+${visibleTabs.length - 8} more</div>` : ""}
              </div>
              ${sc.widgets.focusWidget ? `<div class="pr-lm-focus">${sc.defaultFocusMin}m · ${esc(sc.defaultAudioMode)}</div>` : ""}
            </div>
            <div class="pr-lm-body">
              <div class="pr-lm-top">
                <span>${esc(activeGoal.short || "Studio")}</span>
                ${sc.widgets.topbarMetrics ? `<span class="pr-lm-metrics">🔥1 · ★0 · ◆100</span>` : `<span class="pr-lm-metrics muted">Minimal Bar</span>`}
              </div>
              ${sc.widgets.telemetryHud ? `<div class="pr-lm-block hud">Telemetry HUD · Elo · Cal% · ROI · Hotbar</div>` : ""}
              <div class="pr-lm-hero">
                <div><strong>${esc(sc.displayName || "Primer")}</strong><span>Hero + Next Lesson</span></div>
                <div><span>${state.strictPrereqs ? "🔒 Skill Tree" : "🔓 256 Unlocked"}</span></div>
              </div>
              ${sc.widgets.dailySession ? `<div class="pr-lm-block">Today's 15m Loop (3 Steps)</div>` : ""}
              ${sc.widgets.unfairEdge ? `<div class="pr-lm-block accent">Unfair Edge · Blind Mix + 80/20 ROI</div>` : ""}
              ${sc.widgets.quickGuide ? `<div class="pr-lm-block subtle">3-Step Quick Guide</div>` : ""}
              ${sc.widgets.zeroShelf ? `<div class="pr-lm-block subtle">Start from Zero Shelf</div>` : ""}
              ${sc.widgets.examBanner ? `<div class="pr-lm-block subtle">Exam Mode CBT Banner</div>` : ""}
              <div class="pr-lm-block lib">${sc.widgets.browseAllWorlds ? "Library: All 25 Worlds Expanded" : `Library: ${ALL_SUBJECTS.length - sc.hiddenSubjects.length} Subject Cards`}</div>
            </div>
          </div>

          <div class="pr-cfg-prev-specs">
            <div><span>Palette</span><strong>${esc(sc.accentCustom || state.paperTheme)}</strong></div>
            <div><span>Density</span><strong>${esc(sc.density)} · ${sc.fontScale}%</strong></div>
            <div><span>Quizzes</span><strong>${sc.showConfidenceBar ? "Calibration ON" : "Clean Quiz"}</strong></div>
            <div><span>Splash</span><strong>${esc(sc.splashMode)}</strong></div>
          </div>

          <button type="button" class="ml-btn-primary pr-cfg-launch-btn" id="pr-intro-launch-final">
            Launch My Configured Studio →
          </button>
          <div class="pr-cfg-prev-foot">
            <button type="button" class="pr-intro-link-btn" id="pr-intro-reset-cfg">Reset Setup Defaults</button>
            <button type="button" class="pr-intro-link-btn" id="pr-intro-open-backup-cfg">Restore Save Code</button>
          </div>
        </div>
      `;
    }

    function renderConfigPanel() {
      const sc = ensureStudioConfig(state);
      const goals = (EDGE && EDGE.EXAM_GOALS) || [{ id: "auto", label: "All-Around Polymath", desc: "" }];
      const interleavePresets = (EDGE && EDGE.INTERLEAVE_PRESETS) || [{ id: "smart", label: "Smart 80/20 Mix" }];
      const curGoalId = (state.examTarget && state.examTarget.goalId) || "auto";
      const curDateIso = (state.examTarget && state.examTarget.dateIso) || "";

      if (ui.configTab === "identity") {
        return `
          <div class="pr-cfg-section">
            <div class="pr-cfg-sec-head">
              <h3>01 · Identity, Mission &amp; Focus Subjects</h3>
              <p>Tell Primer who you are and what you're aiming for — everything from greetings to the 80/20 ROI Sniper adapts live.</p>
            </div>

            <div class="pr-cfg-field-grid">
              <label class="pr-cfg-field">
                <span>Your Name or Callsign</span>
                <input type="text" id="pr-cfg-name" class="pr-cfg-input" maxlength="32" placeholder="e.g. Alex, Future Iskolar, Dev..." value="${esc(sc.displayName)}" />
              </label>

              <label class="pr-cfg-field">
                <span>Default Landing Tab on Open</span>
                <select id="pr-cfg-landing" class="pr-cfg-select">
                  ${ALL_TABS.map((t) => `<option value="${t.id}" ${sc.landingTab === t.id ? "selected" : ""}>${esc(t.label)}</option>`).join("")}
                </select>
              </label>
            </div>

            <div class="pr-cfg-field-grid">
              <label class="pr-cfg-field">
                <span>Primary Mission / Target Exam</span>
                <select id="pr-cfg-goal" class="pr-cfg-select">
                  ${goals.map((g) => `<option value="${g.id}" ${curGoalId === g.id ? "selected" : ""}>${esc(g.label)}</option>`).join("")}
                </select>
              </label>

              <label class="pr-cfg-field">
                <span>Target Exam / Milestone Date (Optional)</span>
                <input type="date" id="pr-cfg-date" class="pr-cfg-input" value="${esc(curDateIso)}" />
              </label>
            </div>

            <div class="pr-cfg-subblock">
              <div class="pr-cfg-subblock-head">
                <strong>Visible Dashboard Subject Libraries</strong>
                <button type="button" class="pr-intro-mini-btn" id="pr-cfg-all-subjects">Show All 7</button>
              </div>
              <div class="pr-cfg-chip-grid">
                ${ALL_SUBJECTS.map((subj) => {
                  const active = !(sc.hiddenSubjects || []).includes(subj.id);
                  return `<button type="button" class="pr-cfg-toggle-chip ${active ? "active" : ""}" data-cfg-subject="${subj.id}"><span>${active ? "✓" : "+"}</span>${esc(subj.label)}</button>`;
                }).join("")}
              </div>
            </div>
          </div>
        `;
      }

      if (ui.configTab === "layout") {
        const widgetDefs = [
          { key: "telemetryHud", title: "Pro Telemetry HUD Strip", desc: "Top command cockpit: Live Elo, Calibration %, Illusions, Focus Mins, Exam Countdown & Quick-Launch Hotbar." },
          { key: "dailySession", title: "Today's 15-Minute Session", desc: "3-step daily habit loop (Recall Warmup → Deep Focus → 45s Speed Sprint)." },
          { key: "unfairEdge", title: "Unfair Advantage Engine Deck", desc: "Blind-Topic Interleaving, Confidence Calibration Radar & 80/20 ROI Bottleneck Sniper." },
          { key: "examBanner", title: "Exam Mode CBT Showcase Banner", desc: "1-click DOST-SEI, UPCAT, CSE, NMAT & ACET quick-launch ribbon on Dashboard." },
          { key: "zeroShelf", title: "Start from Zero Shelf", desc: "4 beginner-friendly starting cards (Coding, Math, Web, Science)." },
          { key: "quickGuide", title: "3-Step Quick Guide Strip", desc: "Short onboarding explainer strip on the Dashboard." },
          { key: "browseAllWorlds", title: "Expand All 25 Worlds by Default", desc: "Show the full 25-world skill grid immediately instead of clean Subject Cards." },
          { key: "focusWidget", title: "Sidebar Focus Timer & Soundscapes", desc: "Persistent Pomodoro clock + offline Brown Noise / 40Hz Gamma / Rain audio in sidebar." },
          { key: "topbarMetrics", title: "Topbar Metrics Capsule", desc: "Show Streak flame, XP, Gems & Studio Shop button in the header." },
          { key: "navBadges", title: "Sidebar Counters & Badges", desc: "Show live counts (due cards, quests solved, mistakes) next to navigation tabs." },
          { key: "footer", title: "Workspace Footer", desc: "Show compact studio build info footer at the bottom of the workspace." }
        ];

        return `
          <div class="pr-cfg-section">
            <div class="pr-cfg-sec-head">
              <h3>02 · Clean ↔ Bloated Layout &amp; Module Control</h3>
              <p>Dial Primer anywhere from an ultra-clean zero-clutter study sheet to a full-throttle 100% power-user command center.</p>
            </div>

            <div class="pr-cfg-preset-strip">
              ${ARCHETYPES.map((a) => `
                <button type="button" class="pr-cfg-preset-btn ${sc.archetype === a.id ? "active" : ""}" data-cfg-arch="${a.id}">
                  <strong>${esc(a.title)}</strong>
                  <span>${esc(a.bloatLabel)}</span>
                </button>
              `).join("")}
            </div>

            <div class="pr-cfg-subblock">
              <div class="pr-cfg-subblock-head">
                <strong>Dashboard &amp; Workspace Modules (${Object.values(sc.widgets).filter(Boolean).length}/${widgetDefs.length} ON)</strong>
                <div style="display:flex; gap:6px;">
                  <button type="button" class="pr-intro-mini-btn" id="pr-cfg-widgets-none">Strip Clean</button>
                  <button type="button" class="pr-intro-mini-btn" id="pr-cfg-widgets-all">Enable Everything</button>
                </div>
              </div>
              <div class="pr-cfg-switch-list">
                ${widgetDefs.map((wd) => {
                  const on = !!sc.widgets[wd.key];
                  return `
                    <button type="button" class="pr-cfg-switch-row ${on ? "on" : ""}" data-cfg-widget="${wd.key}" role="switch" aria-checked="${on}">
                      <span class="pr-cfg-sw-copy">
                        <strong>${esc(wd.title)}</strong>
                        <span>${esc(wd.desc)}</span>
                      </span>
                      <span class="pr-cfg-sw-pill"><span class="pr-cfg-sw-knob"></span></span>
                    </button>
                  `;
                }).join("")}
              </div>
            </div>

            <div class="pr-cfg-subblock">
              <div class="pr-cfg-subblock-head">
                <strong>Sidebar Navigation Tabs (${ALL_TABS.length - sc.hiddenTabs.length}/${ALL_TABS.length} Visible)</strong>
                <button type="button" class="pr-intro-mini-btn" id="pr-cfg-tabs-all">Show All 12</button>
              </div>
              <div class="pr-cfg-chip-grid">
                ${ALL_TABS.map((t) => {
                  const visible = !(sc.hiddenTabs || []).includes(t.id);
                  return `<button type="button" class="pr-cfg-toggle-chip ${visible ? "active" : ""} ${t.locked ? "locked" : ""}" data-cfg-tab-vis="${t.id}" ${t.locked ? "disabled" : ""}><span>${t.locked ? "●" : visible ? "✓" : "+"}</span>${esc(t.label)}</button>`;
                }).join("")}
              </div>
            </div>
          </div>
        `;
      }

      if (ui.configTab === "aesthetics") {
        const palettes = [
          { id: "noir", label: "Obsidian Sage", swatch: "#8eb8a3", desc: "Calm pitch-black + eucalyptus sage" },
          { id: "carbon", label: "Obsidian Cobalt", swatch: "#78b4f5", desc: "Deep carbon + crisp engineering blue" },
          { id: "kyoto", label: "Kyoto Crimson", swatch: "#d98296", desc: "Ink black + muted crimson rose" },
          { id: "monochrome", label: "Pure Monochrome", swatch: "#e5e5ea", desc: "Zero-distraction black & titanium" }
        ];
        const emblems = [
          { id: "none", label: "Prism" },
          { id: "mortarboard", label: "Orbital" },
          { id: "goggles", label: "Matrix" },
          { id: "monocle", label: "Aperture" }
        ];

        return `
          <div class="pr-cfg-section">
            <div class="pr-cfg-sec-head">
              <h3>03 · OLED Aesthetics, Typography &amp; Boot Splash</h3>
              <p>Every palette, custom accent color, emblem mark, corner geometry, and font scale applies live as you click.</p>
            </div>

            <div class="pr-cfg-subblock">
              <div class="pr-cfg-subblock-head"><strong>Obsidian Base Palette</strong></div>
              <div class="pr-cfg-palette-grid">
                ${palettes.map((p) => `
                  <button type="button" class="pr-cfg-pal-card ${state.paperTheme === p.id && !sc.accentCustom ? "active" : ""}" data-cfg-theme="${p.id}">
                    <span class="pr-cfg-pal-dot" style="background:${p.swatch};"></span>
                    <div><strong>${esc(p.label)}</strong><span>${esc(p.desc)}</span></div>
                  </button>
                `).join("")}
              </div>
            </div>

            <div class="pr-cfg-subblock">
              <div class="pr-cfg-subblock-head">
                <strong>Custom Accent Color Override</strong>
                <label class="pr-cfg-color-pick-lbl">
                  <span>Custom Hex</span>
                  <input type="color" id="pr-cfg-custom-color" value="${esc(sc.accentCustom || "#8eb8a3")}" />
                </label>
              </div>
              <div class="pr-cfg-swatch-row">
                ${ACCENT_SWATCHES.map((sw) => `
                  <button type="button" class="pr-cfg-swatch-btn ${(sc.accentCustom || "") === sw.id ? "active" : ""}" data-cfg-accent="${esc(sw.id)}">
                    ${sw.hex ? `<span class="pr-cfg-sw-dot" style="background:${sw.hex};"></span>` : `<span class="pr-cfg-sw-dot auto"></span>`}
                    <span>${esc(sw.label)}</span>
                  </button>
                `).join("")}
              </div>
            </div>

            <div class="pr-cfg-field-grid">
              <div class="pr-cfg-subblock">
                <div class="pr-cfg-subblock-head"><strong>Studio Emblem Mark</strong></div>
                <div class="pr-cfg-seg-row">
                  ${emblems.map((em) => `
                    <button type="button" class="pr-cfg-seg-btn ${(state.pipAccessory || "none") === em.id ? "active" : ""}" data-cfg-emblem="${em.id}">
                      ${renderStudioMarkSvg ? renderStudioMarkSvg(20, em.id) : ""}
                      <span>${esc(em.label)}</span>
                    </button>
                  `).join("")}
                </div>
              </div>

              <div class="pr-cfg-subblock">
                <div class="pr-cfg-subblock-head"><strong>Spacing Density</strong></div>
                <div class="pr-cfg-seg-row">
                  ${[
                    { id: "spacious", label: "Spacious" },
                    { id: "balanced", label: "Balanced" },
                    { id: "compact", label: "Compact" }
                  ].map((d) => `<button type="button" class="pr-cfg-seg-btn ${sc.density === d.id ? "active" : ""}" data-cfg-density="${d.id}">${d.label}</button>`).join("")}
                </div>
              </div>
            </div>

            <div class="pr-cfg-field-grid">
              <div class="pr-cfg-subblock">
                <div class="pr-cfg-subblock-head"><strong>Typography Scale</strong></div>
                <div class="pr-cfg-seg-row">
                  ${[90, 100, 110, 120].map((fs) => `<button type="button" class="pr-cfg-seg-btn ${sc.fontScale === fs ? "active" : ""}" data-cfg-font="${fs}">${fs}%</button>`).join("")}
                </div>
              </div>

              <div class="pr-cfg-subblock">
                <div class="pr-cfg-subblock-head"><strong>Corner Geometry</strong></div>
                <div class="pr-cfg-seg-row">
                  ${[
                    { id: "sharp", label: "Sharp" },
                    { id: "modern", label: "Modern" },
                    { id: "soft", label: "Soft" }
                  ].map((r) => `<button type="button" class="pr-cfg-seg-btn ${sc.cardRadius === r.id ? "active" : ""}" data-cfg-radius="${r.id}">${r.label}</button>`).join("")}
                </div>
              </div>
            </div>

            <div class="pr-cfg-field-grid">
              <div class="pr-cfg-subblock">
                <div class="pr-cfg-subblock-head"><strong>Boot Splash Screen</strong></div>
                <div class="pr-cfg-seg-row">
                  ${[
                    { id: "cinematic", label: "Cinematic (0.9s)" },
                    { id: "fast", label: "Snappy (0.4s)" },
                    { id: "off", label: "Skip Splash" }
                  ].map((sp) => `<button type="button" class="pr-cfg-seg-btn ${sc.splashMode === sp.id ? "active" : ""}" data-cfg-splash="${sp.id}">${sp.label}</button>`).join("")}
                </div>
              </div>

              <div class="pr-cfg-subblock">
                <div class="pr-cfg-subblock-head"><strong>Motion Preference</strong></div>
                <button type="button" class="pr-cfg-switch-row ${sc.reducedMotion ? "on" : ""}" id="pr-cfg-reduced-motion" role="switch" aria-checked="${sc.reducedMotion}">
                  <span class="pr-cfg-sw-copy"><strong>Reduced Motion</strong><span>Disable ambient glow &amp; transitions</span></span>
                  <span class="pr-cfg-sw-pill"><span class="pr-cfg-sw-knob"></span></span>
                </button>
              </div>
            </div>
          </div>
        `;
      }

      // ui.configTab === "engine"
      return `
        <div class="pr-cfg-section">
          <div class="pr-cfg-sec-head">
            <h3>04 · Learning Mechanics &amp; Unfair Advantage Engine</h3>
            <p>Tune prerequisite unlocking, quiz pressure, confidence calibration, and your default focus environment.</p>
          </div>

          <div class="pr-cfg-switch-list">
            <button type="button" class="pr-cfg-switch-row ${state.strictPrereqs === false ? "on" : ""}" id="pr-cfg-unlock-all" role="switch" aria-checked="${state.strictPrereqs === false}">
              <span class="pr-cfg-sw-copy">
                <strong>Sandbox Mode — Unlock All 256 Lessons Immediately</strong>
                <span>OFF = structured prerequisite skill tree · ON = jump freely to any topic from Calculus to AI &amp; DSA.</span>
              </span>
              <span class="pr-cfg-sw-pill"><span class="pr-cfg-sw-knob"></span></span>
            </button>

            <button type="button" class="pr-cfg-switch-row ${state.chillMode !== false ? "on" : ""}" id="pr-cfg-chill" role="switch" aria-checked="${state.chillMode !== false}">
              <span class="pr-cfg-sw-copy">
                <strong>Infinite Chill Mode (♾️ No Heart Penalties)</strong>
                <span>OFF = 5-Heart arcade challenge mode · ON = stress-free unlimited practice.</span>
              </span>
              <span class="pr-cfg-sw-pill"><span class="pr-cfg-sw-knob"></span></span>
            </button>

            <button type="button" class="pr-cfg-switch-row ${state.instantAdvance !== false ? "on" : ""}" id="pr-cfg-instant" role="switch" aria-checked="${state.instantAdvance !== false}">
              <span class="pr-cfg-sw-copy">
                <strong>Instant Auto-Advance on Correct Answers</strong>
                <span>Flow rapidly through questions you know; still pauses on mistakes &amp; lucky guesses.</span>
              </span>
              <span class="pr-cfg-sw-pill"><span class="pr-cfg-sw-knob"></span></span>
            </button>

            <button type="button" class="pr-cfg-switch-row ${sc.showConfidenceBar ? "on" : ""}" id="pr-cfg-confbar" role="switch" aria-checked="${sc.showConfidenceBar}">
              <span class="pr-cfg-sw-copy">
                <strong>Confidence Calibration Bar in Quizzes (Sure [Z] · 50/50 [X] · Guess [C])</strong>
                <span>Catches Mastery Illusions &amp; computes personalized UPCAT R − ¼W guessing advice.</span>
              </span>
              <span class="pr-cfg-sw-pill"><span class="pr-cfg-sw-knob"></span></span>
            </button>

            <button type="button" class="pr-cfg-switch-row ${!state.muted ? "on" : ""}" id="pr-cfg-sound" role="switch" aria-checked="${!state.muted}">
              <span class="pr-cfg-sw-copy">
                <strong>Tactile UI Sound Effects</strong>
                <span>Subtle synthesized WebAudio chimes on taps, correct answers &amp; completions.</span>
              </span>
              <span class="pr-cfg-sw-pill"><span class="pr-cfg-sw-knob"></span></span>
            </button>
          </div>

          <div class="pr-cfg-field-grid" style="margin-top:12px;">
            <div class="pr-cfg-subblock">
              <div class="pr-cfg-subblock-head"><strong>Default Focus Block</strong></div>
              <div class="pr-cfg-seg-row">
                ${[15, 25, 50].map((m) => `<button type="button" class="pr-cfg-seg-btn ${sc.defaultFocusMin === m ? "active" : ""}" data-cfg-focusmin="${m}">${m} min</button>`).join("")}
              </div>
            </div>

            <div class="pr-cfg-subblock">
              <div class="pr-cfg-subblock-head"><strong>Default Offline Focus Audio</strong></div>
              <div class="pr-cfg-seg-row">
                ${[
                  { id: "off", lbl: "Quiet" },
                  { id: "brown", lbl: "Brown" },
                  { id: "gamma40", lbl: "40Hz" },
                  { id: "rain", lbl: "Rain" }
                ].map((a) => `<button type="button" class="pr-cfg-seg-btn ${sc.defaultAudioMode === a.id ? "active" : ""}" data-cfg-audio="${a.id}">${a.lbl}</button>`).join("")}
              </div>
            </div>
          </div>

          <div class="pr-cfg-subblock" style="margin-top:12px;">
            <div class="pr-cfg-subblock-head"><strong>Default Blind Interleave Mix</strong></div>
            <div class="pr-cfg-chip-grid">
              ${interleavePresets.map((p) => `<button type="button" class="pr-cfg-toggle-chip ${(state.edgeInterleavePreset || "smart") === p.id ? "active" : ""}" data-cfg-interleave="${p.id}">${esc(p.label)}</button>`).join("")}
            </div>
          </div>
        </div>
      `;
    }

    function renderOverlay() {
      syncLivePreviewAndTheme();
      const sc = ensureStudioConfig(state);
      const ver = (BUILD && BUILD.version) || "3.3.0";
      const nodeCount = DATA && DATA.NODES ? DATA.NODES.length : 222;
      const worldCount = DATA && DATA.WORLDS ? DATA.WORLDS.length : 25;

      const topBarHtml = `
        <header class="pr-intro-topbar">
          <div class="pr-intro-brand">
            ${renderStudioMarkSvg ? renderStudioMarkSvg(30) : ""}
            <span>Primer Studio</span>
            <span class="pr-intro-ver-pill">v${esc(ver)} · Offline OS</span>
          </div>
          <div class="pr-intro-mode-switch" role="tablist" aria-label="Intro views">
            <button type="button" class="pr-intro-mode-btn ${ui.step === "hero" ? "active" : ""}" data-intro-step="hero">Overview</button>
            <button type="button" class="pr-intro-mode-btn ${ui.step === "config" ? "active" : ""}" data-intro-step="config">Deep Configurator</button>
          </div>
          <div class="pr-intro-top-actions">
            <button type="button" class="ml-btn-mini" id="pr-intro-top-backup">Restore Save</button>
            <button type="button" class="ml-btn-mini" id="pr-intro-top-skip">${state.onboardingCompleted ? "Close ✕" : "Skip →"}</button>
          </div>
        </header>
      `;

      let bodyHtml = "";
      if (ui.step === "hero") {
        bodyHtml = `
          <div class="pr-intro-hero-wrap">
            ${isResetFlow ? `<div class="pr-intro-reset-banner">↺ Workspace freshly reset — rebuild your ideal studio from scratch below.</div>` : ""}

            <section class="pr-intro-hero">
              <div class="pr-intro-kicker-pill">
                <span class="pr-intro-pulse" aria-hidden="true"></span>
                <span>FIRST-PRINCIPLES LEARNING OS · ${worldCount} WORLDS · ${nodeCount} SKILLS · 100% LOCAL</span>
              </div>
              <h1 class="pr-intro-headline">
                Make your workspace<br /><span>as clean or as powerful</span> as you want.
              </h1>
              <p class="pr-intro-lead">
                Strip Primer down to a serene pitch-black zen desk, or unlock a dense pro command center with Blind-Topic Interleaving, Confidence Calibration, 80/20 ROI Sniping, Feynman Checks, Code IDE &amp; 10 PH Exam Simulators.
              </p>
              <div class="pr-intro-hero-ctas">
                <button type="button" class="ml-btn-primary pr-intro-cta-lg" id="pr-intro-go-config">
                  Customize Everything Freely →
                </button>
                <button type="button" class="ml-btn-secondary pr-intro-cta-lg" id="pr-intro-quick-launch">
                  Launch Default Studio
                </button>
              </div>
            </section>

            <section class="pr-intro-arch-section">
              <div class="pr-intro-sec-label">
                <span>CHOOSE A STARTING ARCHETYPE — THEN TWEAK EVERY SWITCH</span>
                <span>Clean Zen ←──────────→ Max Command Center</span>
              </div>
              <div class="pr-intro-arch-grid">
                ${ARCHETYPES.map((a) => `
                  <div class="pr-intro-arch-card ${sc.archetype === a.id ? "selected" : ""}">
                    <div class="pr-arch-top">
                      <span class="pr-arch-badge">${esc(a.badge)}</span>
                      <span class="pr-arch-score">${esc(a.bloatLabel)}</span>
                    </div>
                    <h3>${esc(a.title)}</h3>
                    <p>${esc(a.tagline)}</p>
                    ${renderMiniWireframe(a)}
                    <div class="pr-arch-actions">
                      <button type="button" class="ml-btn-primary" data-arch-launch="${a.id}">Use &amp; Launch →</button>
                      <button type="button" class="ml-btn-mini" data-arch-tweak="${a.id}">Customize</button>
                    </div>
                  </div>
                `).join("")}
              </div>
            </section>

            <section class="pr-intro-caps">
              <div class="pr-intro-cap-item"><strong>256</strong><span>Visual-First Lessons</span></div>
              <div class="pr-intro-cap-item"><strong>28</strong><span>Live Playgrounds</span></div>
              <div class="pr-intro-cap-item"><strong>36</strong><span>Code Studio Quests</span></div>
              <div class="pr-intro-cap-item"><strong>36+</strong><span>Work Studio Proofs</span></div>
              <div class="pr-intro-cap-item"><strong>10</strong><span>PH CBT Exam Sims</span></div>
              <div class="pr-intro-cap-item"><strong>0</strong><span>Accounts / Cloud Trackers</span></div>
            </section>
          </div>
        `;
      } else {
        const tabs = [
          { id: "layout", num: "01", label: "Clean ↔ Bloated" },
          { id: "identity", num: "02", label: "Identity & Mission" },
          { id: "aesthetics", num: "03", label: "OLED Aesthetics" },
          { id: "engine", num: "04", label: "Learning Engine" }
        ];
        bodyHtml = `
          <div class="pr-cfg-layout">
            <div class="pr-cfg-main">
              <div class="pr-cfg-tabs" role="tablist">
                ${tabs.map((t) => `
                  <button type="button" class="pr-cfg-tab-btn ${ui.configTab === t.id ? "active" : ""}" data-cfg-tab="${t.id}">
                    <span class="pr-cfg-tab-num">${t.num}</span>
                    <span>${esc(t.label)}</span>
                  </button>
                `).join("")}
              </div>
              ${renderConfigPanel()}
            </div>
            <aside class="pr-cfg-aside">
              ${renderLiveBlueprintPreview()}
            </aside>
          </div>
        `;
      }

      overlay.innerHTML = `
        <div class="pr-intro-bg-grid" aria-hidden="true"></div>
        <div class="pr-intro-bg-bloom" aria-hidden="true"></div>
        <div class="pr-intro-frame">
          ${topBarHtml}
          <div class="pr-intro-scroll">
            ${bodyHtml}
          </div>
        </div>
      `;

      // Bind Topbar
      overlay.querySelectorAll("[data-intro-step]").forEach((btn) => {
        btn.addEventListener("click", () => {
          ui.step = btn.dataset.introStep;
          renderOverlay();
        });
      });
      const topSkip = document.getElementById("pr-intro-top-skip");
      if (topSkip) topSkip.addEventListener("click", () => closeAndLaunch(true));
      const topBackup = document.getElementById("pr-intro-top-backup");
      if (topBackup) {
        topBackup.addEventListener("click", () => {
          overlay.classList.add("hidden");
          if (onOpenBackup) onOpenBackup();
        });
      }

      // Bind Hero
      const goConfig = document.getElementById("pr-intro-go-config");
      if (goConfig) {
        goConfig.addEventListener("click", () => {
          ui.step = "config";
          renderOverlay();
        });
      }
      const quickLaunch = document.getElementById("pr-intro-quick-launch");
      if (quickLaunch) quickLaunch.addEventListener("click", () => closeAndLaunch(true));

      overlay.querySelectorAll("[data-arch-launch]").forEach((btn) => {
        btn.addEventListener("click", () => {
          applyArchetypeToState(state, btn.dataset.archLaunch);
          closeAndLaunch(true);
        });
      });
      overlay.querySelectorAll("[data-arch-tweak]").forEach((btn) => {
        btn.addEventListener("click", () => {
          applyArchetypeToState(state, btn.dataset.archTweak);
          ui.step = "config";
          ui.configTab = "layout";
          renderOverlay();
        });
      });

      // Bind Config Tabs
      overlay.querySelectorAll("[data-cfg-tab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          ui.configTab = btn.dataset.cfgTab;
          renderOverlay();
        });
      });

      // Bind Identity
      const nameInp = document.getElementById("pr-cfg-name");
      if (nameInp) {
        nameInp.addEventListener("input", () => {
          sc.displayName = nameInp.value.slice(0, 32);
          const strong = overlay.querySelector(".pr-cfg-preview-head strong");
          if (strong) strong.textContent = sc.displayName ? `Welcome, ${sc.displayName}` : "Your Custom Studio";
          const heroStrong = overlay.querySelector(".pr-lm-hero strong");
          if (heroStrong) heroStrong.textContent = sc.displayName || "Primer";
        });
      }
      const landSel = document.getElementById("pr-cfg-landing");
      if (landSel) {
        landSel.addEventListener("change", () => {
          sc.landingTab = landSel.value;
          renderOverlay();
        });
      }
      const goalSel = document.getElementById("pr-cfg-goal");
      if (goalSel) {
        goalSel.addEventListener("change", () => {
          if (!state.examTarget) state.examTarget = { goalId: "auto", label: "", dateIso: "" };
          state.examTarget.goalId = goalSel.value;
          renderOverlay();
        });
      }
      const dateInp = document.getElementById("pr-cfg-date");
      if (dateInp) {
        dateInp.addEventListener("change", () => {
          if (!state.examTarget) state.examTarget = { goalId: "auto", label: "", dateIso: "" };
          state.examTarget.dateIso = dateInp.value || "";
          renderOverlay();
        });
      }
      overlay.querySelectorAll("[data-cfg-subject]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const sid = btn.dataset.cfgSubject;
          const idx = sc.hiddenSubjects.indexOf(sid);
          if (idx >= 0) sc.hiddenSubjects.splice(idx, 1);
          else if (sc.hiddenSubjects.length < ALL_SUBJECTS.length - 1) sc.hiddenSubjects.push(sid);
          sc.archetype = "custom";
          renderOverlay();
        });
      });
      const allSubjBtn = document.getElementById("pr-cfg-all-subjects");
      if (allSubjBtn) {
        allSubjBtn.addEventListener("click", () => {
          sc.hiddenSubjects = [];
          renderOverlay();
        });
      }

      // Bind Layout & Bloated <-> Clean Controls
      overlay.querySelectorAll("[data-cfg-arch]").forEach((btn) => {
        btn.addEventListener("click", () => {
          applyArchetypeToState(state, btn.dataset.cfgArch);
          renderOverlay();
        });
      });
      overlay.querySelectorAll("[data-cfg-widget]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const k = btn.dataset.cfgWidget;
          sc.widgets[k] = !sc.widgets[k];
          sc.archetype = "custom";
          renderOverlay();
        });
      });
      const wNone = document.getElementById("pr-cfg-widgets-none");
      if (wNone) {
        wNone.addEventListener("click", () => {
          for (const k of Object.keys(sc.widgets)) sc.widgets[k] = false;
          sc.archetype = "custom";
          renderOverlay();
        });
      }
      const wAll = document.getElementById("pr-cfg-widgets-all");
      if (wAll) {
        wAll.addEventListener("click", () => {
          for (const k of Object.keys(sc.widgets)) sc.widgets[k] = true;
          sc.archetype = "custom";
          renderOverlay();
        });
      }
      overlay.querySelectorAll("[data-cfg-tab-vis]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const tid = btn.dataset.cfgTabVis;
          if (tid === "path") return;
          const idx = sc.hiddenTabs.indexOf(tid);
          if (idx >= 0) sc.hiddenTabs.splice(idx, 1);
          else sc.hiddenTabs.push(tid);
          sc.archetype = "custom";
          renderOverlay();
        });
      });
      const tabsAllBtn = document.getElementById("pr-cfg-tabs-all");
      if (tabsAllBtn) {
        tabsAllBtn.addEventListener("click", () => {
          sc.hiddenTabs = [];
          renderOverlay();
        });
      }

      // Bind Aesthetics
      overlay.querySelectorAll("[data-cfg-theme]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.paperTheme = btn.dataset.cfgTheme;
          sc.accentCustom = "";
          renderOverlay();
        });
      });
      overlay.querySelectorAll("[data-cfg-accent]").forEach((btn) => {
        btn.addEventListener("click", () => {
          sc.accentCustom = btn.dataset.cfgAccent;
          renderOverlay();
        });
      });
      const colorInp = document.getElementById("pr-cfg-custom-color");
      if (colorInp) {
        colorInp.addEventListener("input", () => {
          sc.accentCustom = colorInp.value;
          syncLivePreviewAndTheme();
        });
      }
      overlay.querySelectorAll("[data-cfg-emblem]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.pipAccessory = btn.dataset.cfgEmblem;
          renderOverlay();
        });
      });
      overlay.querySelectorAll("[data-cfg-density]").forEach((btn) => {
        btn.addEventListener("click", () => {
          sc.density = btn.dataset.cfgDensity;
          sc.archetype = "custom";
          renderOverlay();
        });
      });
      overlay.querySelectorAll("[data-cfg-font]").forEach((btn) => {
        btn.addEventListener("click", () => {
          sc.fontScale = parseInt(btn.dataset.cfgFont, 10) || 100;
          renderOverlay();
        });
      });
      overlay.querySelectorAll("[data-cfg-radius]").forEach((btn) => {
        btn.addEventListener("click", () => {
          sc.cardRadius = btn.dataset.cfgRadius;
          renderOverlay();
        });
      });
      overlay.querySelectorAll("[data-cfg-splash]").forEach((btn) => {
        btn.addEventListener("click", () => {
          sc.splashMode = btn.dataset.cfgSplash;
          renderOverlay();
        });
      });
      const redMot = document.getElementById("pr-cfg-reduced-motion");
      if (redMot) {
        redMot.addEventListener("click", () => {
          sc.reducedMotion = !sc.reducedMotion;
          renderOverlay();
        });
      }

      // Bind Learning Engine
      const unlockAll = document.getElementById("pr-cfg-unlock-all");
      if (unlockAll) {
        unlockAll.addEventListener("click", () => {
          state.strictPrereqs = state.strictPrereqs === false;
          renderOverlay();
        });
      }
      const chillSw = document.getElementById("pr-cfg-chill");
      if (chillSw) {
        chillSw.addEventListener("click", () => {
          state.chillMode = state.chillMode === false;
          renderOverlay();
        });
      }
      const instSw = document.getElementById("pr-cfg-instant");
      if (instSw) {
        instSw.addEventListener("click", () => {
          state.instantAdvance = state.instantAdvance === false;
          renderOverlay();
        });
      }
      const confSw = document.getElementById("pr-cfg-confbar");
      if (confSw) {
        confSw.addEventListener("click", () => {
          sc.showConfidenceBar = !sc.showConfidenceBar;
          renderOverlay();
        });
      }
      const sndSw = document.getElementById("pr-cfg-sound");
      if (sndSw) {
        sndSw.addEventListener("click", () => {
          state.muted = !state.muted;
          renderOverlay();
        });
      }
      overlay.querySelectorAll("[data-cfg-focusmin]").forEach((btn) => {
        btn.addEventListener("click", () => {
          sc.defaultFocusMin = parseInt(btn.dataset.cfgFocusmin, 10) || 25;
          renderOverlay();
        });
      });
      overlay.querySelectorAll("[data-cfg-audio]").forEach((btn) => {
        btn.addEventListener("click", () => {
          sc.defaultAudioMode = btn.dataset.cfgAudio;
          renderOverlay();
        });
      });
      overlay.querySelectorAll("[data-cfg-interleave]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.edgeInterleavePreset = btn.dataset.cfgInterleave;
          renderOverlay();
        });
      });

      // Bind Launch & Footer
      const launchFinal = document.getElementById("pr-intro-launch-final");
      if (launchFinal) launchFinal.addEventListener("click", () => closeAndLaunch(true));
      const resetCfg = document.getElementById("pr-intro-reset-cfg");
      if (resetCfg) {
        resetCfg.addEventListener("click", () => {
          applyArchetypeToState(state, "balanced");
          sc.accentCustom = "";
          sc.displayName = "";
          sc.hiddenSubjects = [];
          renderOverlay();
        });
      }
      const bkCfg = document.getElementById("pr-intro-open-backup-cfg");
      if (bkCfg) {
        bkCfg.addEventListener("click", () => {
          overlay.classList.add("hidden");
          if (onOpenBackup) onOpenBackup();
        });
      }
    }

    renderOverlay();
  }

  global.PRIMER_ONBOARDING = {
    ALL_TABS,
    ALL_SUBJECTS,
    ACCENT_SWATCHES,
    ARCHETYPES,
    DEFAULT_STUDIO_CONFIG,
    ensureStudioConfig,
    applyArchetypeToState,
    computeBloatMetrics,
    applyStudioConfigToDom,
    mergeStudioConfig,
    runBootSplash,
    openIntroStudio
  };
})(typeof window !== "undefined" ? window : globalThis);
