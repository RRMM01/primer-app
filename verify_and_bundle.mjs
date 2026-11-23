import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";

const dir = "/home/sibug/Math";

const APP_RELEASE = {
  version: "3.4.0",
  codename: "Deep Equations & Formulas Expansion",
  releases: [
    {
      version: "3.4.0",
      codename: "Deep Equations & Formulas Expansion",
      date: "2026-11-23",
      changes: [
        "Added 34 brand-new, deeply detailed, friendly formula-driven lessons across all 5 STEM domains (222 → 256 total lessons, +170 curated questions → 1,280 total, +1,360 procedural checks, 34 new 4-step offline-LaTeX worked examples & 100% 2D Skill Constellation wiring).",
        "Math (+8): Parametric & Polar Curves (r, θ), Number Theory (Euclidean GCD, Bézout, Fermat & Euler φ), Euler's Formula & Hyperbolic Functions (cosh/sinh), Taylor/Maclaurin Series & L'Hôpital, Differential Equations (Cooling, Logistic & 2nd-Order ODEs), Eigenvalues & Projections, Vector Calculus (Gradient, Divergence, Curl & Gauss/Stokes), and Probability Distributions (Binomial, Poisson, Geometric & CLT).",
        "Physics (+7): Wave Optics (Double-Slit, Diffraction, Thin Films, Malus & Brewster), Elasticity & Thermal Expansion (Young's Modulus & β ≈ 3α), Heat Transfer & Blackbody Radiation (Fourier, Stefan-Boltzmann T⁴ & Wien), RC/RL/RLC Impedance & Resonance, Special Relativity (Lorentz γ, Time Dilation, Length Contraction & E² = (pc)² + (mc²)²), Quantum Mechanics (de Broglie, Bohr Hydrogen, 1D Box & Heisenberg), and Real Fluids (Poiseuille r⁴ Law, Reynolds, Stokes & Capillarity).",
        "Chemistry (+7), Biology (+6) & General/Earth/Space Science (+6): Buffers & Henderson-Hasselbalch, Electrochemistry (Nernst & Faraday), Ksp Solubility & Common-Ion, Hess's Law & Bond Enthalpies, Integrated Rate Laws & Arrhenius, Real Gases (Dalton, Graham & Van der Waals), Beer-Lambert & Nuclear Decay; Hardy-Weinberg & Chi-Square, Michaelis-Menten Enzyme Kinetics, Water Potential Ψ & Action Potentials, Quantitative Ecology (Mark-Recapture & Shannon H'), Immunology & Herd Immunity, Cardiorespiratory/Renal Physiology; Astrophysics (Parallax, Luminosity, Hubble & Black Holes), Radiometric Dating & Seismology, Lapse Rates/Coriolis/Tsunamis, Lab Error & Sig Figs, Planetary Albedo Balance, and Environmental Science (Rule of 70, IPAT & Eutrophication).",
        "Expanded Memorize Vault (+42 formula & law cards), Classic Traps (+16 STEM traps → 91), Work Studio (+12 multi-step derivations → 36), and Offline LaTeX macros (\\Psi, \\chi, \\nu, \\sinh, \\cosh, \\gcd, \\lcm)."
      ]
    },
    {
      version: "3.3.0",
      codename: "Flagship Intro & Modular Studio",
      date: "2026-11-23",
      changes: [
        "Added Cinematic OLED Boot Splash Screen (#primer-boot-splash) with animated isometric Prism SVG stroke, ambient accent bloom, hairline load progress & 1-click/Esc skip (configurable: Cinematic 0.9s, Snappy 0.4s, or Skip Splash).",
        "Launched Flagship Modern Intro & Deep Studio Configurator for brand-new users, after Full Reset, or anytime via the Topbar (✦), Sidebar ('Customize Studio'), or Ctrl+K.",
        "Engineered full Clean-to-Bloated Workspace Customization: 4 flagship archetypes (Ultra-Clean Zen, Balanced Studio, Exam Grinder, Max Command Center) + 11 granular Dashboard/Chrome module switches, 12-tab Sidebar Visibility customizer, 7 Subject Library toggles, and a live Pro Telemetry Command HUD strip.",
        "Added Live Real-Time Blueprint Preview & Aesthetic Tuning: all 4 Obsidian palettes, 8 curated accent swatches + custom Hex color picker, 4 geometric emblems, Spacing Density (Spacious/Balanced/Compact), Typography Scale (90%–120%), Corner Geometry (Sharp/Modern/Soft), Reduced Motion, and Sandbox Unlock-All-222 toggle."
      ]
    },
    {
      version: "3.2.0",
      codename: "Unfair Advantage Engine",
      date: "2026-11-23",
      changes: [
        "Launched Blind-Topic Interleaving ('No-Labels Cold Recognition'): pulls 10 unlabeled mixed questions across 5+ worlds (Smart 80/20, PH Exams Killer, STEM Gauntlet, CS/AI, Illusion Hunter) and reveals the hidden topic + cheat code only after you lock, tracking your Cold Recognition Speed.",
        "Added Confidence Calibration & Mastery Illusion Detector in every quiz (Sure [Z] · 50/50 [X] · Guess [C]): catches High-Confidence Errors (Mastery Illusions), flags Lucky Guesses so they don't fool exam prep, and calculates personalized UPCAT R - 1/4W expected-value guessing advice.",
        "Launched Feynman Active-Recall Studio ('Explain It Like I'm 12') for all 222 lessons (100% offline semantic anchor checker): grades plain-English intuition + examples, highlights blind spots, awards +30 XP, and auto-saves directly into My Vault Notes.",
        "Added 80/20 ROI Bottleneck Sniper & Exam Countdown on the Dashboard: ranks unmastered skills by transitive downstream unlocks in the 222-node dependency graph, exam goal alignment & illusion urgency, with days-left daily pace tracking.",
        "Added Offline WebAudio Focus Soundscapes (Brown Noise · 40Hz Gamma Focus · Rain) inside the Sidebar Focus Timer, Ctrl+K Power Commands ('>'), and KDE Desktop Shortcut quick actions."
      ]
    },
    {
      version: "3.1.0",
      codename: "Personal Daily Studio",
      date: "2026-11-23",
      changes: [
        "Launched Today's 15-Minute Session on the Main Dashboard: auto-builds a 3-step daily loop (Recall Warmup → Deep Focus / Work Studio → Matched 45s Speed Sprint) with live completion tracking and a 1-click Start Next Step button.",
        "Added Persistent Focus Timer (Pomodoro 15m/25m/50m + 5m Break) in the sidebar footer and active topbar pill — ticks smoothly across every tab without interrupting quizzes or whiteboards and logs completed focus blocks to your study streak.",
        "Upgraded Local Backup & Multi-Device Sync (100% offline/local, zero accounts or tokens): added lossless Smart Merge (keeps the best skills, streaks, notes, SM-2 decks & exam runs from both devices), gzip-compressed Instant Sync Links (#primer-sync=p1z...) with an Incoming Sync Preview modal, and ./launch_primer.sh --lan for instant home Wi-Fi phone access.",
        "Closed the remediation loop across modules: 1-click 'Save Missed → My Vault Deck' on Exam Mode scorecards creates deduplicated SM-2 flashcard decks, and the 2D Skill Constellation now highlights active Mistake & Needs Review nodes with crimson halos, filter spotlight & direct Mistake Drill launch."
      ]
    },
    {
      version: "3.0.0",
      codename: "Primer Studio",
      date: "2026-11-22",
      changes: [
        "Rebranded to Primer Studio — First-Principles Learning OS with seamless localStorage progress migration, new isometric prism emblem (primer-icon.svg + 192/512 PNGs), and single minified primer.standalone.html bundle (retired duplicate legacy mathlingo/everylingo bundles and pruned 280+ lines of dead CSS).",
        "Launched Work Studio ('Show Your Work' Derivation Studio): 24 curated multi-step Math, Physics & Chemistry derivations + 3 infinite procedural generators (Linear, Quadratic, Kinematics) with Guided Step Picker (trap diagnostics per wrong step), Type-Your-Step symbolic/numeric checker, Proof Ledger & embedded Whiteboard.",
        "Added Freehand Canvas Whiteboard (mouse/touch/stylus Pointer Events, 5 obsidian inks, eraser, dot/math grids, undo/redo, PNG export) across Exam Mode scratchpad, Lesson Quizzes & Work Studio.",
        "Launched My Vault (Personal Study Brain): Bookmark any of the 222 lessons, attach Markdown + LaTeX notes inline inside lessons, create custom SM-2 spaced repetition flashcard decks, and import class handouts via Markdown headings, CSV, Anki TSV, Q:/A:, or :: syntax — all persisted inside your JSON backup.",
        "Launched Interactive 2D Skill Constellation Map visualizing all 222 nodes & prerequisite links with smooth zoom/pan, search-to-focus, 19 Study Track spotlights, mastery/decay coloring & live upstream/downstream lineage inspector.",
        "Shipped Installable Offline PWA (manifest.webmanifest + auto-versioned offline Service Worker + Install App prompt) and Ink-Saving Print-to-PDF Study Studio (@media print for Reference Cram Sheets, Exam Score Reports, Custom Decks, Study Notes & Mistake Drill Sheets)."
      ]
    },
    {
      version: "2.5.0",
      codename: "Exam Mode Studio",
      date: "2026-11-22",
      changes: [
        "Launched full Exam Mode CBT Simulator tailored to 10 authentic Philippine & competitive exams: DOST-SEI (RA 7687 & Merit), UPCAT (Bilingual EN/FIL + R − ¼W penalty + interactive UPG estimator), Civil Service Exam Pro & Sub-Pro (80.00% passing gate), NMAT (Part I & II, 200–800 score & PR), ACET (with Essay Prompt Studio), DCAT, USTET (balanced section gate), PUPCET & PMAEE.",
        "Engineered Proctored CBT Runner with per-section countdown timers, strict section locks, section intermissions, OMR navigator grid, choice strike-through elimination, blank-leave toggle, built-in scratchpad, post-exam analytics & 1-click weak-lesson remediation.",
        "Added World 25 (PH Competitive Exams & Specialized Mastery) closing 10 missing high-yield exam lessons (50 curated questions + infinite SVG/numeric procedural generators): DOST Mechanical-Technical (Pulleys/Gears/Levers), Astronomy & Star Evolution, Scientific Graphs & Experimental Design, Number/Letter Series, Work/Mixture/Age/Motion Word Problems, Paragraph Organization & SVA Error Spotting, NMAT Perceptual Acuity, NMAT Social Science (Psych/Soc/Anthro), CSE RA 6713 & PH Environmental Laws, and CSE Clerical Filing & Academic Vocab Roots — plus Playground #28, 8 exam traps, 18 Vault cards, 3 Speed Gym sprints, 4 Smart Tutor exam tracks & 5 exam badges."
      ]
    },
    {
      version: "2.4.0",
      codename: "Zero-to-One Studio",
      date: "2026-11-21",
      changes: [
        "Streamlined Main Dashboard: warm plain-English greeting, compact 3-step quick guide for new learners, dedicated 'Start from Zero' starter cards (Coding, Math, Web, Science), and a clean 6-card Subject Library instead of dumping all 212 lesson cards at once.",
        "Redesigned Code Studio into a clean Library + Tutorial-First Workspace: removed bloated RPG banners/rank ribbons, added a 6-lesson 'Start from Zero' beginner track starting with Print Your First Message (variables, simple math, functions, if/else, loops), and opened every coding exercise on a plain-English '1. Learn (Tutorial)' tab before '2. Practice'."
      ]
    },
    {
      version: "2.3.0",
      codename: "Code Forge Studio",
      date: "2026-11-21",
      changes: [
        "Launched Code Forge IDE: Boot.dev-inspired split-pane coding quest arena with 30 hands-on coding quests across Python/OOP, DSA, JavaScript/Async, SQL, Git/Linux CLI & HTML/CSS, RPG developer ranks, live syntax-highlighted editor, automated expected-vs-actual unit test diffs, Kernel progressive mentor hints, and an interactive Python Call-Stack & Memory Tracer on your own code.",
        "Expanded Coding & CS Curriculum with 3 brand-new Worlds (24 lessons, 120 curated questions, 10 coding traps, 24 reference cards, 3 Speed Gym sprints, 6 badges & Smart Tutor Backend Track): DSA Mastery, Backend/SQL/Git/DevOps & Modern JS/TypeScript/Architecture.",
        "Added 3 flagship interactive coding simulations (Playgrounds 25–27): DSA Sorting Arena & BFS/DFS/Dijkstra Grid Visualizer, Live SQL Workbench & B-Tree Index Speed Lab, and Git Commit DAG + JS Event Loop + REST/JWT/Cache Simulator."
      ]
    },
    {
      version: "2.2.0",
      codename: "Obsidian Studio",
      date: "2026-11-21",
      changes: [
        "Complete workspace UI modernization: persistent left sidebar navigation, sticky glass dashboard header with unified metrics capsule, and 2-column Bento Dashboard (Your Journey + Next Up with live Unlock Paths diagram).",
        "Pure Pitch-Black OLED dark mode architecture (removed light mode & paper themes) with 4 obsidian accent palettes (Sage, Cobalt, Crimson, Monochrome) and crisp hairline elevation.",
        "Retired cartoonish owl mascot & Duolingo-style chrome in favor of a geometric Studio emblem, clean vector monochrome icons, and streamlined Smart Tutor coach strip."
      ]
    },
    {
      version: "2.1.0",
      codename: "Noir Skill Tree",
      date: "2026-11-20",
      changes: [
        "Modern Black (Noir) default UI with pitch-black carbon layering, frosted glass masthead, sleek dark scrollbars, and Obsidian Cobalt theme.",
        "Prerequisite Skill Tree progression across all 188 skills: master required foundations to unlock advanced skills, inspect 'Why you need this first' bridges, or pass a quick Prereq Test-Out.",
        "Live Version Badge (v2.1.0 + auto SHA-256 build fingerprint), bottom version footer, and What's New build verifier modal."
      ]
    },
    {
      version: "2.0.0",
      codename: "Universal Polymath Studio",
      date: "2026-10-15",
      changes: [
        "Expanded to 21 Worlds & 188 interactive lessons including Earth & Space, Economics & PH Finance, Philosophy, AI/LLMs, Web Dev & Python.",
        "Added 24 live visual playgrounds, 26 Speed Gym sprints, SM-2 Spaced Repetition Smart Tutor, and Ctrl+K universal search."
      ]
    },
    {
      version: "1.9.0",
      codename: "Physics Laws & Humanities",
      date: "2026-09-10",
      changes: [
        "Added PH History & Civics, Filipino Wika (KWF Diin), Abstract Shapes SVG tiles, Optics/Fluids/Kepler physics laws, and 2D LaTeX matrix renderer."
      ]
    }
  ]
};

function assert(cond, msg) {
  if (!cond) {
    throw new Error("ASSERTION FAILED: " + msg);
  }
}

// 1. Load all EveryLingo curriculum, expansion, latex, tutor, visualizers, playgrounds, memorize & app files
const curriculumCode = fs.readFileSync(path.join(dir, "curriculum.js"), "utf8");
const scienceCode = fs.readFileSync(path.join(dir, "science_curriculum.js"), "utf8");
const expansionCode = fs.readFileSync(path.join(dir, "exam_expansion.js"), "utf8");
const latexCode = fs.readFileSync(path.join(dir, "latex_tutorial.js"), "utf8");
const shsCode = fs.readFileSync(path.join(dir, "shs_handouts_expansion.js"), "utf8");
const humanitiesCode = fs.readFileSync(path.join(dir, "everylingo_humanities_expansion.js"), "utf8");
const techAiCode = fs.readFileSync(path.join(dir, "everylingo_tech_ai_expansion.js"), "utf8");
const stemLawsCode = fs.readFileSync(path.join(dir, "everylingo_stem_laws_expansion.js"), "utf8");
const earthEconPhilCode = fs.readFileSync(path.join(dir, "everylingo_earth_econ_phil_expansion.js"), "utf8");
const codingEngineCode = fs.readFileSync(path.join(dir, "everylingo_coding_engine.js"), "utf8");
const codingCurrCode = fs.readFileSync(path.join(dir, "everylingo_coding_curriculum.js"), "utf8");
const examCurrCode = fs.readFileSync(path.join(dir, "everylingo_exam_curriculum.js"), "utf8");
const codeForgeCode = fs.readFileSync(path.join(dir, "everylingo_code_forge.js"), "utf8");
const examModeCode = fs.readFileSync(path.join(dir, "everylingo_exam_mode.js"), "utf8");
const whiteboardCode = fs.readFileSync(path.join(dir, "primer_whiteboard.js"), "utf8");
const workStudioCode = fs.readFileSync(path.join(dir, "primer_work_studio.js"), "utf8");
const mathPhysExpCode = fs.readFileSync(path.join(dir, "primer_math_physics_expansion.js"), "utf8");
const chemBioSciExpCode = fs.readFileSync(path.join(dir, "primer_chem_bio_sci_expansion.js"), "utf8");
const myVaultCode = fs.readFileSync(path.join(dir, "primer_my_vault.js"), "utf8");
const constellationCode = fs.readFileSync(path.join(dir, "primer_constellation.js"), "utf8");
const edgeCode = fs.readFileSync(path.join(dir, "primer_edge.js"), "utf8");
const onboardingCode = fs.readFileSync(path.join(dir, "primer_onboarding.js"), "utf8");
const tutorCode = fs.readFileSync(path.join(dir, "tutor.js"), "utf8");
const visualizersCode = fs.readFileSync(path.join(dir, "visualizers.js"), "utf8");
const playgroundsCode = fs.readFileSync(path.join(dir, "everylingo_playgrounds.js"), "utf8");
const memorizeCode = fs.readFileSync(path.join(dir, "memorize.js"), "utf8");
const appCode = fs.readFileSync(path.join(dir, "app.js"), "utf8");
const styles = fs.readFileSync(path.join(dir, "styles.css"), "utf8");

const context = { globalThis: {}, Math, Set, Array, String, Object, Number, Date, Map, RegExp, JSON, Error, parseInt, parseFloat, Boolean };
context.globalThis = context;
vm.runInNewContext(curriculumCode, context, { filename: "curriculum.js" });
vm.runInNewContext(scienceCode, context, { filename: "science_curriculum.js" });
vm.runInNewContext(expansionCode, context, { filename: "exam_expansion.js" });
vm.runInNewContext(latexCode, context, { filename: "latex_tutorial.js" });
vm.runInNewContext(shsCode, context, { filename: "shs_handouts_expansion.js" });
vm.runInNewContext(humanitiesCode, context, { filename: "everylingo_humanities_expansion.js" });
vm.runInNewContext(techAiCode, context, { filename: "everylingo_tech_ai_expansion.js" });
vm.runInNewContext(stemLawsCode, context, { filename: "everylingo_stem_laws_expansion.js" });
vm.runInNewContext(earthEconPhilCode, context, { filename: "everylingo_earth_econ_phil_expansion.js" });
vm.runInNewContext(codingEngineCode, context, { filename: "everylingo_coding_engine.js" });
vm.runInNewContext(codingCurrCode, context, { filename: "everylingo_coding_curriculum.js" });
vm.runInNewContext(examCurrCode, context, { filename: "everylingo_exam_curriculum.js" });
vm.runInNewContext(codeForgeCode, context, { filename: "everylingo_code_forge.js" });
vm.runInNewContext(examModeCode, context, { filename: "everylingo_exam_mode.js" });
vm.runInNewContext(whiteboardCode, context, { filename: "primer_whiteboard.js" });
vm.runInNewContext(workStudioCode, context, { filename: "primer_work_studio.js" });
vm.runInNewContext(mathPhysExpCode, context, { filename: "primer_math_physics_expansion.js" });
vm.runInNewContext(chemBioSciExpCode, context, { filename: "primer_chem_bio_sci_expansion.js" });
vm.runInNewContext(myVaultCode, context, { filename: "primer_my_vault.js" });
vm.runInNewContext(constellationCode, context, { filename: "primer_constellation.js" });
vm.runInNewContext(edgeCode, context, { filename: "primer_edge.js" });
vm.runInNewContext(onboardingCode, context, { filename: "primer_onboarding.js" });
vm.runInNewContext(tutorCode, context, { filename: "tutor.js" });
vm.runInNewContext(visualizersCode, context, { filename: "visualizers.js" });
vm.runInNewContext(playgroundsCode, context, { filename: "everylingo_playgrounds.js" });
vm.runInNewContext(memorizeCode, context, { filename: "memorize.js" });

const DATA = context.MATHLINGO_DATA;
const LATEX = context.MATHLINGO_LATEX;
const TUTOR = context.MATHLINGO_TUTOR;
const VIZ = context.MATHLINGO_VISUALIZERS;
const MEM = context.MATHLINGO_MEMORIZE;
const CODE_ENGINE = context.EVERYLINGO_CODE_ENGINE;
const CODE_FORGE = context.EVERYLINGO_CODE_FORGE;
const EXAM_MODE = context.EVERYLINGO_EXAM_MODE;
const WHITEBOARD = context.PRIMER_WHITEBOARD;
const WORK_STUDIO = context.PRIMER_WORK_STUDIO;
const MY_VAULT = context.PRIMER_MY_VAULT;
const CONSTELLATION = context.PRIMER_CONSTELLATION;
const EDGE = context.PRIMER_EDGE;
const ONBOARDING = context.PRIMER_ONBOARDING;

assert(DATA && typeof DATA === "object", "MATHLINGO_DATA missing");
assert(LATEX && typeof LATEX.formatMath === "function" && typeof LATEX.getTutorialSlides === "function", "MATHLINGO_LATEX missing");
assert(TUTOR && typeof TUTOR === "object", "MATHLINGO_TUTOR missing");
assert(VIZ && VIZ.registry && Array.isArray(VIZ.list), "MATHLINGO_VISUALIZERS missing");
assert(MEM && Array.isArray(MEM.GYM_MODES), "MATHLINGO_MEMORIZE missing");
assert(CODE_ENGINE && typeof CODE_ENGINE.runPythonTests === "function" && typeof CODE_ENGINE.runSql === "function", "EVERYLINGO_CODE_ENGINE missing");
assert(CODE_FORGE && Array.isArray(CODE_FORGE.QUESTS), "EVERYLINGO_CODE_FORGE missing");
assert(EXAM_MODE && Array.isArray(EXAM_MODE.EXAMS) && typeof EXAM_MODE.buildExamPaper === "function" && typeof EXAM_MODE.gradeExamAttempt === "function", "EVERYLINGO_EXAM_MODE missing");
assert(WHITEBOARD && typeof WHITEBOARD.mountWhiteboard === "function" && typeof WHITEBOARD.printStudyDocument === "function", "PRIMER_WHITEBOARD missing");
assert(WORK_STUDIO && Array.isArray(WORK_STUDIO.PROBLEMS) && typeof WORK_STUDIO.checkStepAnswer === "function", "PRIMER_WORK_STUDIO missing");
assert(MY_VAULT && typeof MY_VAULT.parseCardsFromText === "function" && typeof MY_VAULT.reviewCardSM2 === "function", "PRIMER_MY_VAULT missing");
assert(CONSTELLATION && typeof CONSTELLATION.computeConstellationLayout === "function", "PRIMER_CONSTELLATION missing");

// 2. Validate 25 Worlds, 4 Stages & 28 Interactive Visual Playgrounds
assert(Array.isArray(DATA.WORLDS) && DATA.WORLDS.length === 25, `Expected 25 worlds, got ${DATA.WORLDS?.length}`);
const worldIds = new Set(DATA.WORLDS.map((w) => w.id));
for (const w of DATA.WORLDS) {
  assert(typeof w.color === "string" && w.color.startsWith("#"), `World ${w.id} missing valid color`);
  assert(typeof w.colorDark === "string" && w.colorDark.startsWith("#"), `World ${w.id} missing valid colorDark`);
  assert(typeof w.bgSoft === "string" && w.bgSoft.length > 0, `World ${w.id} missing bgSoft`);
  assert(typeof w.borderSoft === "string" && w.borderSoft.length > 0, `World ${w.id} missing borderSoft`);
}
assert(Array.isArray(DATA.MASTERY_STAGES) && DATA.MASTERY_STAGES.length === 4, "Expected 4 mastery stages");
assert(VIZ.list.length === 28, `Expected 28 interactive visual playgrounds, got ${VIZ.list.length}`);
for (const v of VIZ.list) {
  assert(typeof VIZ.registry[v.id] === "function", `Visualizer list entry ${v.id} not in registry`);
  assert(v.category && typeof v.category === "string", `Visualizer ${v.id} missing category`);
}

// 3. Validate 256 Nodes, 1,280 Curated Questions & 100% Registered Visualizers
assert(Array.isArray(DATA.NODES) && DATA.NODES.length === 256, `Expected 256 nodes, got ${DATA.NODES?.length}`);
let totalQuestions = 0;
const nodeIds = new Set();

for (const node of DATA.NODES) {
  assert(node.id && !nodeIds.has(node.id), `Duplicate or missing node id: ${node.id}`);
  nodeIds.add(node.id);
  assert(worldIds.has(node.worldId), `Unknown worldId ${node.worldId} on ${node.id}`);
  assert(node.title && node.icon && node.tagline, `Missing metadata on ${node.id}`);
  assert(node.scaryVersion && node.easyTruth && node.cheatCode, `Missing explanations on ${node.id}`);
  assert(Array.isArray(node.microSteps) && node.microSteps.length >= 3, `Need >= 3 microSteps on ${node.id}`);
  assert(node.visualizerId && typeof VIZ.registry[node.visualizerId] === "function", `Unregistered visualizerId "${node.visualizerId}" on ${node.id}`);
  assert(Array.isArray(node.questions) && node.questions.length === 5, `Expected 5 questions on ${node.id}`);

  for (let i = 0; i < node.questions.length; i++) {
    const q = node.questions[i];
    totalQuestions++;
    assert(q.type === "mc" || q.type === "input", `Invalid question type on ${node.id}[${i}]`);
    assert(q.prompt && q.answer && q.hint && q.whyEasy, `Missing question fields on ${node.id}[${i}]`);
    if (q.type === "mc") {
      assert(Array.isArray(q.options) && q.options.length === 4, `Expected 4 options on ${node.id}[${i}]`);
      const unique = new Set(q.options);
      assert(unique.size === 4, `Duplicate options on ${node.id}[${i}]: ${JSON.stringify(q.options)}`);
      assert(unique.has(q.answer), `Answer "${q.answer}" not in options on ${node.id}[${i}]`);
    }
  }
}

// 4. Validate 91 Classic Traps
assert(Array.isArray(DATA.GRADE12_TRAPS) && DATA.GRADE12_TRAPS.length === 91, `Expected 91 traps, got ${DATA.GRADE12_TRAPS?.length}`);
for (const trap of DATA.GRADE12_TRAPS) {
  assert(trap.id && trap.title && trap.trapExpression && trap.wrongGuess && trap.rightAnswer, `Incomplete trap ${trap.id}`);
  assert(trap.whyItHappens && trap.quickRule && trap.quiz, `Missing quiz/why on ${trap.id}`);
  assert(typeof trap.quiz.explanation === "string" && trap.quiz.explanation.trim().length > 5, `Missing trap.quiz.explanation on ${trap.id}`);
  assert(Array.isArray(trap.quiz.options) && trap.quiz.options.length === 4, `Trap quiz needs 4 options on ${trap.id}`);
  const unique = new Set(trap.quiz.options);
  assert(unique.size === 4 && unique.has(trap.quiz.answer), `Trap quiz answer mismatch on ${trap.id}`);
}

// 5. Validate 40 Diagnostic Questions, 40 Badges, 225 Bruteforce Nodes, 34 Synthesis Bosses & Memorize Data
assert(totalQuestions === 1280, `Expected 1280 curated questions, got ${totalQuestions}`);
assert(Array.isArray(DATA.DIAGNOSTIC_QUESTIONS) && DATA.DIAGNOSTIC_QUESTIONS.length === 40, `Expected 40 diagnostic questions, got ${DATA.DIAGNOSTIC_QUESTIONS?.length}`);
for (const dq of DATA.DIAGNOSTIC_QUESTIONS) {
  assert(nodeIds.has(dq.targetNodeId), `Diagnostic targetNodeId missing: ${dq.targetNodeId}`);
  const u = new Set(dq.options);
  assert(u.size === 4 && u.has(dq.answer), `Diagnostic answer mismatch on ${dq.id}`);
}
assert(Array.isArray(DATA.BADGES) && DATA.BADGES.length === 40, `Expected 40 badges, got ${DATA.BADGES?.length}`);
for (const b of DATA.BADGES) {
  assert(b.id && b.title && b.description && b.emoji, `Incomplete badge schema on ${b.id}`);
}
const bfNodes = DATA.NODES.filter((n) => n.bruteforce === true);
assert(bfNodes.length === 225, `Expected 225 selected bruteforce lessons, got ${bfNodes.length}`);
assert(Array.isArray(DATA.SYNTHESIS_PROBLEMS) && DATA.SYNTHESIS_PROBLEMS.length === 34, `Expected 34 synthesis problems, got ${DATA.SYNTHESIS_PROBLEMS?.length}`);
for (const sp of DATA.SYNTHESIS_PROBLEMS) {
  assert(sp.id && sp.prompt && sp.answer && Array.isArray(sp.stepsChain) && sp.stepsChain.length >= 2, `Incomplete synthesis problem ${sp.id}`);
  const su = new Set(sp.options);
  assert(su.size === 4 && su.has(sp.answer), `Synthesis answer mismatch on ${sp.id}`);
}
for (let i = 0; i < 20; i++) {
  const gp = DATA.generateSynthesisProblem();
  const gu = new Set(gp.options);
  assert(gu.size === 4 && gu.has(gp.answer) && gp.stepsChain.length >= 2, `Generated synthesis invalid on iter ${i}`);
}
assert(DATA.answersMatch("x = 4", "4"), "answersMatch failed 'x = 4' === '4'");
assert(DATA.answersMatch("$80", "80"), "answersMatch failed '$80' === '80'");
assert(DATA.answersMatch("1/2", "0.5"), "answersMatch failed '1/2' === '0.5'");
assert(DATA.answersMatch("-1.5", "-3/2"), "answersMatch failed '-1.5' === '-3/2'");
assert(DATA.answersMatch("(x+3)(x+2)", "(x+2)(x+3)"), "answersMatch failed commuted binomial factors");
assert(!DATA.answersMatch("x = 5", "4"), "answersMatch false positive on 'x = 5' === '4'");
assert(!DATA.answersMatch("32", "3 2"), "answersMatch false positive on '32' === '3 2'");
assert(DATA.answersMatch("3 2", "3 2"), "answersMatch failed '3 2' === '3 2'");
assert(DATA.answersMatch("3, 2", "3 2"), "answersMatch failed '3, 2' === '3 2'");
assert(DATA.MEMORIZE_DATA.elements20.length === 20, "Expected 20 periodic elements");
assert(DATA.MEMORIZE_DATA.scienceFormulas.length === 54, `Expected 54 science formula cards, got ${DATA.MEMORIZE_DATA.scienceFormulas.length}`);
assert(DATA.MEMORIZE_DATA.phHistoryCards.length === 12, "Expected 12 PH History memorize cards");
assert(DATA.MEMORIZE_DATA.filipinoCards.length === 10, "Expected 10 Filipino memorize cards");
assert(DATA.MEMORIZE_DATA.codingCards.length === 36, `Expected 36 Coding/Tech memorize cards, got ${DATA.MEMORIZE_DATA.codingCards.length}`);
assert(DATA.MEMORIZE_DATA.aiCards.length === 8, "Expected 8 AI memorize cards");
assert(DATA.MEMORIZE_DATA.physicsLawsCards.length === 24, `Expected 24 Physics Laws & Formulas memorize cards, got ${DATA.MEMORIZE_DATA.physicsLawsCards.length}`);
assert(DATA.MEMORIZE_DATA.earthEconPhilCards.length === 18, "Expected 18 Earth/Econ/Phil memorize cards");
assert(DATA.MEMORIZE_DATA.examPrepCards.length === 18, `Expected 18 Exam Prep memorize cards, got ${DATA.MEMORIZE_DATA.examPrepCards?.length}`);
for (const [poolName, reqKeys] of [
  ["scienceFormulas", ["subject", "eq", "meaning"]],
  ["physicsLawsCards", ["law", "eq", "key"]],
  ["aiCards", ["cat", "term", "meaning"]],
  ["codingCards", ["cat", "syntax", "meaning"]],
  ["phHistoryCards", ["era", "title", "detail"]],
  ["filipinoCards", ["cat", "front", "back"]],
  ["earthEconPhilCards", ["cat", "front", "back"]],
  ["examPrepCards", ["cat", "front", "back"]]
]) {
  (DATA.MEMORIZE_DATA[poolName] || []).forEach((item, idx) => {
    for (const k of reqKeys) {
      assert(typeof item[k] === "string" && item[k].trim().length > 0, `MEMORIZE_DATA.${poolName}[${idx}].${k} missing or non-string`);
    }
  });
}

// Validate Guided 1x1 -> 12x12 Multiplication Course covers ALL 78 unique pairs = 144 cells!
const stages = DATA.MEMORIZE_DATA.multCourseStages;
assert(Array.isArray(stages) && stages.length === 10, `Expected 10 mult course stages, got ${stages?.length}`);
const coveredUnique = new Set();
for (const st of stages) {
  const list = st.unlockPairs || st.pairs;
  for (const [a, b] of list) {
    coveredUnique.add(`${Math.min(a, b)}x${Math.max(a, b)}`);
  }
}
for (let a = 1; a <= 12; a++) {
  for (let b = 1; b <= 12; b++) {
    assert(coveredUnique.has(`${Math.min(a, b)}x${Math.max(a, b)}`), `Mult course missing pair ${a}x${b}`);
    const tip = DATA.explainMultPair(a, b);
    assert(typeof tip === "string" && tip.length > 5, `Missing trick for ${a}x${b}`);
  }
}
console.log(`Verified Guided 1x1->12x12 Course: ${stages.length} stages covering all ${coveredUnique.size} unique pairs (144/144 cells).`);
console.log(`Verified ${DATA.WORLDS.length} worlds, ${DATA.NODES.length} skill nodes (${VIZ.list.length} playgrounds), ${totalQuestions} curated questions, ${DATA.GRADE12_TRAPS.length} traps, ${DATA.DIAGNOSTIC_QUESTIONS.length} scan questions, ${DATA.BADGES.length} badges.`);

// 6. Validate Procedural Generator across all 188 nodes x 40 iterations (and assert >= 4 unique prompts per node!)
let procCount = 0;
for (const node of DATA.NODES) {
  const uniquePrompts = new Set();
  for (let iter = 0; iter < 40; iter++) {
    const pq = DATA.generateProceduralQuestion(node.id);
    procCount++;
    assert(pq && pq.prompt && pq.answer && pq.hint && pq.whyEasy, `Procedural empty field on ${node.id}`);
    assert(pq.type === "mc", `Expected mc procedural question on ${node.id}`);
    assert(Array.isArray(pq.options) && pq.options.length === 4, `Procedural options != 4 on ${node.id}`);
    const u = new Set(pq.options);
    assert(u.size === 4, `Procedural duplicate options on ${node.id}: ${JSON.stringify(pq.options)}`);
    assert(u.has(pq.answer), `Procedural answer "${pq.answer}" missing from options on ${node.id}`);
    uniquePrompts.add(pq.prompt);
  }
  assert(uniquePrompts.size >= 4, `Procedural pool too thin on ${node.id}: only ${uniquePrompts.size} unique prompts across 40 runs`);
}

// 7. Validate all 32 Speed Gym modes x 20 iterations = 640 questions
let gymCount = 0;
assert(MEM.GYM_MODES.length === 32, `Expected 32 gym modes, got ${MEM.GYM_MODES.length}`);
for (const gm of MEM.GYM_MODES) {
  for (let iter = 0; iter < 20; iter++) {
    const gq = gm.gen();
    gymCount++;
    assert(gq && gq.prompt && gq.answer && gq.tip, `Gym empty field on ${gm.id}`);
    assert(Array.isArray(gq.options) && gq.options.length === 4, `Gym options != 4 on ${gm.id}`);
    const u = new Set(gq.options);
    assert(u.size === 4, `Gym duplicate options on ${gm.id}: ${JSON.stringify(gq.options)}`);
    assert(u.has(gq.answer), `Gym answer "${gq.answer}" missing from options on ${gm.id}`);
  }
}
console.log(`Verified procedural generator (${procCount} questions, all ${DATA.NODES.length} nodes >= 4 unique prompts) and ${MEM.GYM_MODES.length} Speed Gym generators (${gymCount} questions) with 0 errors.`);

// 7b. Validate Smart Tutor Dependency Graph, Telemetry (SM-2 + Domain Elo) & all 14 Study Plan Presets
assert(typeof MEM.openMultBruteforce === "function", "MEM.openMultBruteforce missing");
assert(typeof MEM.isMultBfChoicesActive === "function", "MEM.isMultBfChoicesActive missing");
const graphKeys = Object.keys(TUTOR.DEPENDENCY_GRAPH || {});
assert(graphKeys.length === 256, `Expected 256 nodes in TUTOR.DEPENDENCY_GRAPH, got ${graphKeys.length}`);
for (const nid of nodeIds) {
  const meta = TUTOR.DEPENDENCY_GRAPH[nid];
  assert(meta && Array.isArray(meta.prereqs) && typeof meta.elo === "number", `Invalid DEPENDENCY_GRAPH entry for ${nid}`);
  for (const pre of meta.prereqs) {
    assert(nodeIds.has(pre), `Unknown prereq "${pre}" referenced by ${nid}`);
  }
}
// Validate DAG acyclicity & Prerequisite Unlock Tree Engine
const visitColor = {};
function assertAcyclic(id, trail) {
  if (visitColor[id] === 1) throw new Error(`Cycle detected in DEPENDENCY_GRAPH: ${[...trail, id].join(" -> ")}`);
  if (visitColor[id] === 2) return;
  visitColor[id] = 1;
  for (const p of TUTOR.getPrereqs(id)) assertAcyclic(p, [...trail, id]);
  visitColor[id] = 2;
}
for (const nid of nodeIds) assertAcyclic(nid, []);

const emptyTreeState = { strictPrereqs: true, nodeMastery: {} };
const rootStatus = TUTOR.getUnlockStatus(emptyTreeState, "counting-subitizing", DATA);
assert(!rootStatus.locked && rootStatus.prereqs.length === 0 && rootStatus.unlocksCount >= 2, "Root node unlock status failed");
const calcStatus = TUTOR.getUnlockStatus(emptyTreeState, "derivatives-speedometer", DATA);
assert(calcStatus.locked && calcStatus.missingPrereqs.length === 3 && calcStatus.chain.length >= 6, "Advanced node lock/chain status failed");
assert(calcStatus.nextActionablePrereq && calcStatus.nextActionablePrereq.ready, "Missing actionable foundation prereq on locked skill");
const freeTreeState = { strictPrereqs: false, nodeMastery: {} };
assert(!TUTOR.getUnlockStatus(freeTreeState, "derivatives-speedometer", DATA).locked, "Free Explore mode should not lock skills");
const newlyAfterCount = TUTOR.getNewlyUnlockedNodes({}, { "counting-subitizing": 1 }, DATA).map((n) => n.id);
assert(newlyAfterCount.includes("even-odd-skip") && newlyAfterCount.includes("make-10-addition"), `Newly unlocked detection failed: ${newlyAfterCount}`);
const bridgeTxt = TUTOR.getBridgeReason("derivatives-speedometer", "ai-training-loss-backprop", DATA);
assert(typeof bridgeTxt === "string" && bridgeTxt.toLowerCase().includes("gradient"), `Bridge reason failed: ${bridgeTxt}`);
const treeSum = TUTOR.getSkillTreeSummary(emptyTreeState, DATA);
assert(treeSum.total === 256 && treeSum.ready >= 10 && treeSum.locked > 200 && treeSum.ready + treeSum.locked + treeSum.mastered === 256, `Skill tree summary mismatch: ${JSON.stringify(treeSum)}`);
assert(TUTOR.classifyNodeQuadrant({ attempts: 5, correct: 5, avgMs: 9000, currentStreak: 4 }, 2, "exam-mechanical-technical-reasoning").code === "automatic", "exam_mastery speed threshold failed");
assert(TUTOR.classifyNodeQuadrant({ attempts: 5, correct: 5, avgMs: 9000, currentStreak: 4 }, 2, "bio-cells-organelles").code === "automatic", "bio speed threshold failed");
assert(TUTOR.classifyNodeQuadrant({ attempts: 5, correct: 5, avgMs: 9000, currentStreak: 4 }, 2, "ai-transformers-self-attention").code === "automatic", "ai speed threshold failed");
assert(TUTOR.classifyNodeQuadrant({ attempts: 5, correct: 5, avgMs: 9000, currentStreak: 4 }, 2, "ph-constitution-three-branches").code === "automatic", "ph_history speed threshold failed");
assert(TUTOR.classifyNodeQuadrant({ attempts: 5, correct: 5, avgMs: 9000, currentStreak: 4 }, 2, "earth-plate-tectonics-faults").code === "automatic", "earth_space speed threshold failed");
assert(TUTOR.classifyNodeQuadrant({ attempts: 5, correct: 5, avgMs: 9000, currentStreak: 4 }, 2, "make-10-addition").code === "slow_accurate", "arith speed threshold failed");

const mockState = { nodeMastery: { "fractions-trenchcoat": 0 }, multMastered: {}, mistakes: [] };
TUTOR.ensureTelemetry(mockState);
TUTOR.recordAttempt(mockState, { nodeId: "fractions-trenchcoat", correct: false, elapsedMs: 6500, mode: "lesson", prompt: "1/2 + 1/3" });
TUTOR.recordAttempt(mockState, { multPair: [7, 8], correct: false, elapsedMs: 4200, mode: "mult_bruteforce", prompt: "7 × 8" });
TUTOR.recordAttempt(mockState, { nodeId: "ai-perceptron-neural-nets", correct: true, elapsedMs: 3200, mode: "node_bruteforce", prompt: "ReLU(-4)" });
assert(typeof mockState.telemetry.nodes["ai-perceptron-neural-nets"].nextReviewAt === "number", "SM-2 nextReviewAt missing");
const tutorAnalysis = TUTOR.analyzeLearner(mockState, DATA);
assert(tutorAnalysis && typeof tutorAnalysis.elo === "number" && tutorAnalysis.totalAnswered === 3 && tutorAnalysis.domainElo, "analyzeLearner failed smoke check");
const allPresets = [
  "auto",
  "dost_sei_scholar",
  "upcat_big4_prep",
  "cse_pro_passer",
  "nmat_med_track",
  "bootdev_backend_quest",
  "earth_nmat_science",
  "econ_phil_thinker",
  "ai_coding_bootcamp",
  "ph_cet_humanities",
  "physics_laws_mastery",
  "polymath_explorer",
  "shs_grade12_finals",
  "life_career_ready",
  "grade12_rescue",
  "mult_autopilot",
  "college_stem",
  "science_trifecta",
  "cet_full_exam"
];
for (const preset of allPresets) {
  const sp = TUTOR.generateStudyPlan(mockState, DATA, preset);
  assert(sp && sp.preset === preset && Array.isArray(sp.steps) && sp.steps.length >= 3, `Study plan "${preset}" incomplete`);
}
console.log(`Verified Smart Tutor engine: ${graphKeys.length} dependency-mapped skills & all ${allPresets.length} study plan presets.`);

// 7c. Validate Offline LaTeX + Inline Code Engine (Zero leaked macros, zero currency mangling, 5 slides x 164 nodes)
const sampleFmt = LATEX.formatMath("\\frac{x^2 - 9}{x - 3} + \\sqrt{16} + \\log_2(8) + \\cos(120^{\\circ})");
assert(sampleFmt.includes("ml-frac") && sampleFmt.includes("ml-sqrt") && !/\\[a-zA-Z]/.test(sampleFmt), `LaTeX formatting check failed: ${sampleFmt}`);
const currencyCheck = LATEX.formatMath("Think of a taxi meter: $5 base flag-down fee, plus $3 per kilometer. $120 − $24 = $96!");
assert(currencyCheck.includes("$5 base") && currencyCheck.includes("$120") && !currencyCheck.includes("ml-math"), `Currency mangling regression: ${currencyCheck}`);
const codeCheck = LATEX.formatMath("Use `<div class=\"card\">` and `x_val = 10 // 3` cleanly!");
assert(codeCheck.includes("ml-inline-code") && codeCheck.includes("&lt;div") && !codeCheck.includes("ml-sub"), `Inline code safety check failed: ${codeCheck}`);
for (const subExpr of ["t_(1/2)", "W_(a→b)", "C_nH_(2n+2)", "ΔH°_rxn", "η_max", "Φ_B", "S_∞", "P°_solvent"]) {
  const rendered = LATEX.formatMath(subExpr);
  assert(!rendered.includes("_") && rendered.includes("ml-sub"), `Raw underscore leaked in subscript "${subExpr}": ${rendered}`);
}
const matCheck = LATEX.formatMath(LATEX.getWorkedExample(DATA.NODES.find((n) => n.id === "linear-algebra-vectors")).heroFormula);
assert(matCheck.includes("ml-mat") && matCheck.includes(">c<") && matCheck.includes(">d<"), `2x2 determinant matrix check failed: ${matCheck}`);

for (const node of DATA.NODES) {
  const slides = LATEX.getTutorialSlides(node);
  const worked = LATEX.getWorkedExample(node);
  assert(Array.isArray(slides) && slides.length === 5, `Expected 5 tutorial slides on ${node.id}`);
  assert(worked && Array.isArray(worked.steps) && worked.steps.length >= 3, `Expected >= 3 worked steps on ${node.id}`);
  const fieldsToCheck = [
    worked.heroFormula,
    worked.problemLatex,
    worked.answerLatex,
    ...worked.steps.map((s) => s.mathLatex),
    node.easyTruth,
    node.cheatCode
  ];
  for (const field of fieldsToCheck) {
    const html = LATEX.formatMath(field || "");
    assert(!/[\uE000-\uE005]/.test(html), `LaTeX leaked internal token on ${node.id}: ${html}`);
    assert(!/\\[a-zA-Z]+|\\[%_]/.test(html), `LaTeX leaked raw command on ${node.id}: ${html}`);
  }
}
console.log(`Verified Offline LaTeX + Inline Code formatter (0 leaked commands, 0 currency bugs) & 5-slide worked examples across all ${DATA.NODES.length} nodes.`);

// 7d. Validate Code Studio (36 Lessons incl. 6 Start-from-Zero basics: starters must fail, solutions must pass 100%, tutorials present, linked nodes valid, syntax highlighter XSS-safe)
assert(CODE_FORGE.QUESTS.length === 36, `Expected 36 Code Studio lessons, got ${CODE_FORGE.QUESTS.length}`);
assert(CODE_FORGE.QUESTS[0].id === "zero-hello-print" && CODE_FORGE.QUESTS[0].track === "zero", "Lesson 1 must be Start-from-Zero hello print");
const zeroTrackCount = CODE_FORGE.QUESTS.filter((q) => q.track === "zero").length;
assert(zeroTrackCount === 6, `Expected 6 Start-from-Zero lessons, got ${zeroTrackCount}`);
const questIds = new Set();
let totalQuestTests = 0;
for (const q of CODE_FORGE.QUESTS) {
  assert(q.id && !questIds.has(q.id), `Duplicate or missing Code Studio lesson id: ${q.id}`);
  questIds.add(q.id);
  assert(nodeIds.has(q.linkedNodeId), `Code Studio lesson ${q.id} links unknown node: ${q.linkedNodeId}`);
  const tut = CODE_FORGE.getTutorial(q);
  assert(tut && typeof tut.summary === "string" && tut.summary.trim().length > 15 && Array.isArray(tut.steps) && tut.steps.length >= 2, `Missing plain-English tutorial on ${q.id}`);
  const stRes = CODE_FORGE.evaluateQuest(q, q.starterCode);
  assert(!stRes.ok, `Code Studio lesson ${q.id} starterCode unexpectedly passed all tests!`);
  const solRes = CODE_FORGE.evaluateQuest(q, q.solutionCode);
  assert(solRes.ok && solRes.passed === solRes.total && solRes.total >= 2, `Code Studio lesson ${q.id} solutionCode FAILED: ${JSON.stringify(solRes.results)}`);
  totalQuestTests += solRes.total;
}
const hlSafe = CODE_ENGINE.highlightCode("const x = '<img onerror=alert(1)>';", "javascript");
assert(!hlSafe.includes("<img") && hlSafe.includes("&lt;img"), `Syntax highlighter XSS escaping failed: ${hlSafe}`);
console.log(`Verified Code Studio: all ${CODE_FORGE.QUESTS.length} hands-on lessons (${zeroTrackCount} Start-from-Zero + 30 core, ${totalQuestTests} automated checks) verified 100% (36/36 starters fail, 36/36 solutions pass, 36/36 tutorials verified) & XSS-safe syntax highlighter.`);

// 7e. Validate Exam Mode Studio (10 Tailored Exams, Blueprint Integrity, Zero-Duplicate Paper Builder & Scoring Models)
assert(EXAM_MODE.EXAMS.length === 10, `Expected 10 Exam Mode blueprints, got ${EXAM_MODE.EXAMS.length}`);
const examIds = new Set();
let totalCustomExamQs = 0;
for (const ex of EXAM_MODE.EXAMS) {
  assert(ex.id && !examIds.has(ex.id), `Duplicate or missing exam id: ${ex.id}`);
  examIds.add(ex.id);
  assert(Array.isArray(ex.subtests) && ex.subtests.length >= 3, `Exam ${ex.id} needs >= 3 subtests`);
  for (const sub of ex.subtests) {
    assert(sub.id && sub.name && Array.isArray(sub.nodeIds) && sub.nodeIds.length >= 2, `Exam ${ex.id} subtest ${sub.id} invalid`);
    for (const nid of sub.nodeIds) {
      assert(nodeIds.has(nid), `Exam ${ex.id}/${sub.id} references unknown nodeId "${nid}"`);
    }
    const customList = EXAM_MODE.EXAM_CUSTOM_BANK[sub.id] || [];
    for (const cq of customList) {
      totalCustomExamQs++;
      assert(cq.prompt && cq.answer && cq.whyEasy && nodeIds.has(cq.linkedNodeId), `Invalid custom exam Q in ${sub.id}`);
      const u = new Set(cq.options || []);
      assert(u.size === 4 && u.has(cq.answer), `Custom exam Q options mismatch in ${sub.id}: ${cq.prompt}`);
      for (const field of [cq.prompt, cq.answer, cq.whyEasy, ...cq.options]) {
        const rendered = LATEX.formatMath(field || "");
        assert(!/[\uE000-\uE005]/.test(rendered) && !/\\[a-zA-Z]+/.test(rendered), `LaTeX leaked in EXAM_CUSTOM_BANK[${sub.id}]: ${rendered}`);
      }
    }
  }
  // Test Paper Builder across quick & half scales (verify zero duplicate prompts + valid options)
  for (const scale of ["quick", "half", "full"]) {
    const paper = EXAM_MODE.buildExamPaper(ex.id, { scale, proctorMode: true }, DATA);
    assert(paper && paper.sections.length === ex.subtests.length && paper.totalQuestions >= ex.subtests.length * 3, `Paper build failed for ${ex.id} (${scale})`);
    const seen = new Set();
    for (const sec of paper.sections) {
      assert(sec.timeLimitSec >= 180 && sec.questions.length >= 3, `Invalid section ${sec.id} in ${ex.id} (${scale})`);
      for (const q of sec.questions) {
        const key = q.prompt.trim().toLowerCase();
        assert(!seen.has(key), `Duplicate prompt generated in ${ex.id} (${scale}): ${q.prompt}`);
        seen.add(key);
        const u = new Set(q.options);
        assert(u.size === 4 && u.has(q.answer), `Generated exam Q option mismatch on ${ex.id}/${sec.id}`);
      }
    }
  }
}
// Empirical Scoring Engine Checks (UPCAT R - 0.25W + UPG, CSE 80% Gate, NMAT 200-800 PR, DOST-SEI)
const upcatExam = EXAM_MODE.getExamById("upcat");
const upcatPaper = EXAM_MODE.buildExamPaper("upcat", { scale: "quick" }, DATA);
const upcatQs = upcatPaper.sections.flatMap((s) => s.questions);
const upcatResp = {};
upcatQs.forEach((q, idx) => {
  if (idx < 12) upcatResp[q.id] = q.answer;
  else if (idx < 16) upcatResp[q.id] = q.options.find((o) => o !== q.answer);
  // remaining 4 left blank
});
const upcatGrade = EXAM_MODE.gradeExamAttempt(upcatExam, upcatPaper, upcatResp, { hsAvg: 94 });
assert(upcatGrade.totalCorrect === 12 && upcatGrade.totalWrong === 4 && upcatGrade.totalBlank === upcatQs.length - 16, `UPCAT counts mismatch: ${JSON.stringify(upcatGrade)}`);
assert(Math.abs(upcatGrade.netScore - 11.0) < 0.001 && Math.abs(upcatGrade.penaltyLost - 1.0) < 0.001, `UPCAT R - 0.25W math failed: net=${upcatGrade.netScore}, pen=${upcatGrade.penaltyLost}`);
assert(upcatGrade.upg >= 1.0 && upcatGrade.upg <= 5.0, `UPCAT UPG out of range: ${upcatGrade.upg}`);

const cseExam = EXAM_MODE.getExamById("cse_pro");
const csePaper = EXAM_MODE.buildExamPaper("cse_pro", { scale: "quick" }, DATA);
const cseQs = csePaper.sections.flatMap((s) => s.questions);
const csePassResp = {};
const cseFailResp = {};
cseQs.forEach((q, idx) => {
  csePassResp[q.id] = idx < Math.ceil(cseQs.length * 0.8) ? q.answer : q.options.find((o) => o !== q.answer);
  cseFailResp[q.id] = idx < Math.floor(cseQs.length * 0.75) ? q.answer : q.options.find((o) => o !== q.answer);
});
assert(EXAM_MODE.gradeExamAttempt(cseExam, csePaper, csePassResp).passed === true, "CSE 80% pass gate failed");
assert(EXAM_MODE.gradeExamAttempt(cseExam, csePaper, cseFailResp).passed === false, "CSE <80% fail gate failed");

const nmatExam = EXAM_MODE.getExamById("nmat");
const nmatPaper = EXAM_MODE.buildExamPaper("nmat", { scale: "quick" }, DATA);
const nmatQs = nmatPaper.sections.flatMap((s) => s.questions);
const nmatResp = Object.fromEntries(nmatQs.map((q) => [q.id, q.answer]));
const nmatGrade = EXAM_MODE.gradeExamAttempt(nmatExam, nmatPaper, nmatResp);
assert(nmatGrade.nmatScaled >= 700 && nmatGrade.nmatScaled <= 800 && nmatGrade.nmatPr >= 90 && nmatGrade.nmatPr <= 99, `NMAT scaling check failed: ${nmatGrade.nmatScaled} / ${nmatGrade.nmatPr}`);
console.log(`Verified Exam Mode Studio: ${EXAM_MODE.EXAMS.length} tailored blueprints (${totalCustomExamQs} exam-crafted items + zero-dup paper builder across quick/half/full + UPCAT R-0.25W/UPG, CSE 80% gate & NMAT 200-800 PR verified).`);

// 7c. Verify Primer v3.0.0 Flagship Modules (Work Studio, My Vault, Skill Constellation, PWA & Print)
assert(WORK_STUDIO.PROBLEMS.length === 36, `Expected 36 Work Studio curated derivations, got ${WORK_STUDIO.PROBLEMS.length}`);
for (const wp of WORK_STUDIO.PROBLEMS) {
  assert(wp.id && wp.track && wp.title && wp.given && wp.goal, `Incomplete Work Studio problem ${wp.id}`);
  assert(nodeIds.has(wp.linkedNodeId), `Work Studio problem ${wp.id} references unknown linkedNodeId ${wp.linkedNodeId}`);
  assert(Array.isArray(wp.steps) && wp.steps.length >= 2, `Work Studio problem ${wp.id} needs >= 2 steps`);
  for (let i = 0; i < wp.steps.length; i++) {
    const st = wp.steps[i];
    assert(st.prompt && st.rule && st.result && st.why, `Work Studio ${wp.id}[${i}] missing step fields`);
    assert(Array.isArray(st.choices) && st.choices.length === 4, `Work Studio ${wp.id}[${i}] needs 4 choices`);
    const rights = st.choices.filter((c) => c.correct);
    assert(rights.length === 1, `Work Studio ${wp.id}[${i}] must have exactly 1 correct choice`);
    for (const wrong of st.choices.filter((c) => !c.correct)) {
      assert(typeof wrong.trapReason === "string" && wrong.trapReason.length > 6, `Work Studio ${wp.id}[${i}] wrong choice missing trapReason`);
    }
    assert(WORK_STUDIO.checkStepAnswer(st, st.result).ok === true, `Work Studio checkStepAnswer failed exact match on ${wp.id}[${i}]`);
  }
}
const sampleStep = WORK_STUDIO.PROBLEMS[0].steps[2]; // x = 5
assert(WORK_STUDIO.checkStepAnswer(sampleStep, "5").ok === true, "Work Studio numeric shortcut check failed");
assert(WORK_STUDIO.checkStepAnswer(sampleStep, "5 = x").ok === true, "Work Studio flipped equation check failed");
assert(WORK_STUDIO.checkStepAnswer(sampleStep, "-5").ok === false && WORK_STUDIO.checkStepAnswer(sampleStep, "-5").diag.toLowerCase().includes("sign"), "Work Studio sign-flip diagnostic failed");
for (const procKind of ["linear", "quadratic", "kinematics"]) {
  const gp = WORK_STUDIO.generateProceduralDerivation(procKind);
  assert(gp && gp.steps.length >= 2 && gp.steps.every((s) => s.choices.length === 4), `Procedural Work Studio generator failed for ${procKind}`);
}

// My Vault Importer & SM-2 Verification
assert(MY_VAULT.parseCardsFromText("Ohm :: V=IR\nPower :: P=VI").length === 2, "My Vault :: parser failed");
assert(MY_VAULT.parseCardsFromText("## Mitosis\n2 diploid cells\n## Meiosis\n4 haploid gametes").length === 2, "My Vault Markdown parser failed");
assert(MY_VAULT.parseCardsFromText("Q: Capital of PH?\nA: Manila\nQ: Law of Inertia?\nA: Newton 1st").length === 2, "My Vault Q:/A: parser failed");
assert(MY_VAULT.parseCardsFromText("Front,Back\n\"Force\",\"F = ma\"\n\"Work\",\"W = Fd\"").length === 2, "My Vault CSV parser failed");
assert(MY_VAULT.parseCardsFromText("Acid\tProton donor\nBase\tProton acceptor").length === 2, "My Vault TSV parser failed");
const smCard = MY_VAULT.createCard("Test", "Answer");
MY_VAULT.reviewCardSM2(smCard, 3);
assert(smCard.reps === 1 && smCard.interval === 1, "My Vault SM-2 first Good interval failed");
MY_VAULT.reviewCardSM2(smCard, 3);
assert(smCard.reps === 2 && smCard.interval === 6, "My Vault SM-2 second Good interval failed");
MY_VAULT.reviewCardSM2(smCard, 1);
assert(smCard.reps === 0 && smCard.lapses === 1, "My Vault SM-2 Again reset failed");
assert(!MY_VAULT.renderNoteMarkdown("<script>alert(1)</script>").includes("<script>"), "My Vault Markdown XSS escape failed");

// 2D Constellation Layout Verification
const constLayout = CONSTELLATION.computeConstellationLayout(DATA, TUTOR);
assert(constLayout.nodes.length === DATA.NODES.length, `Constellation layout node mismatch: ${constLayout.nodes.length}`);
assert(constLayout.edges.length >= 150, `Constellation layout missing prerequisite edges: ${constLayout.edges.length}`);
for (const cn of constLayout.nodes) {
  assert(Number.isFinite(cn.x) && Number.isFinite(cn.y), `Constellation layout non-finite coord on ${cn.id}`);
}

// PWA & Print Verification
assert(/@media\s+print/.test(styles), "styles.css missing @media print stylesheet");
const pwaManifest = JSON.parse(fs.readFileSync(path.join(dir, "manifest.webmanifest"), "utf8"));
assert(pwaManifest.name && pwaManifest.short_name === "Primer" && Array.isArray(pwaManifest.icons) && pwaManifest.icons.length >= 3, "manifest.webmanifest invalid");
for (const reqAsset of ["sw.js", "primer-icon.svg", "primer-icon-192.png", "primer-icon-512.png", "launch_primer.sh"]) {
  assert(fs.existsSync(path.join(dir, reqAsset)), `Missing Primer asset: ${reqAsset}`);
}
const launcherSrc = fs.readFileSync(path.join(dir, "launch_primer.sh"), "utf8");
assert(launcherSrc.includes("--lan") && launcherSrc.includes("0.0.0.0"), "launch_primer.sh missing --lan Wi-Fi support");

// v3.1.0 Personal Daily Studio Verification (Smart Merge, Exam→Vault Deck, Daily Session Plan)
const appMemStore = new Map();
const appCtx = Object.assign({}, context, {
  window: null,
  document: {
    readyState: "loading",
    addEventListener: () => {},
    getElementById: () => null,
    body: { classList: { remove: () => {}, add: () => {} } }
  },
  navigator: {},
  location: { hash: "", origin: "http://localhost:8000", pathname: "/", protocol: "http:", href: "http://localhost:8000/" },
  history: { replaceState: () => {} },
  btoa: (s) => Buffer.from(String(s), "binary").toString("base64"),
  atob: (s) => Buffer.from(String(s), "base64").toString("binary"),
  localStorage: {
    getItem: (k) => (appMemStore.has(k) ? appMemStore.get(k) : null),
    setItem: (k, v) => appMemStore.set(k, String(v)),
    removeItem: (k) => appMemStore.delete(k)
  },
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: () => 1,
  clearTimeout: () => {},
  encodeURIComponent,
  decodeURIComponent,
  escape,
  unescape
});
appCtx.window = appCtx;
appCtx.globalThis = appCtx;
appCtx.addEventListener = () => {};
vm.runInNewContext(appCode, appCtx, { filename: "app.js" });

const PERSONAL = appCtx.window.PRIMER_PERSONAL;
assert(PERSONAL && typeof PERSONAL.mergeImportedState === "function", "PRIMER_PERSONAL.mergeImportedState missing");
const roundTripCode = PERSONAL.encodeSaveCode({ xp: 123, userNotes: { a: { text: "hello" } } });
const roundTripDec = PERSONAL.decodeSaveCode(roundTripCode);
assert(roundTripDec.xp === 123 && roundTripDec.userNotes.a.text === "hello", "Save code encode/decode round-trip failed");
const mergeRes = PERSONAL.mergeImportedState(
  {
    xp: 200,
    dailyStreak: 4,
    lastStudiedDate: "2026-11-22",
    nodeMastery: { "algebra-scale": 2, "slope-lines": 1 },
    userBookmarks: ["algebra-scale"],
    userNotes: { "node:algebra-scale": { id: "node:algebra-scale", nodeId: "algebra-scale", title: "Algebra", text: "Old note", updatedAt: 100 } },
    userDecks: [{ id: "deck_1", title: "Physics", cards: [{ id: "c1", front: "F=ma", back: "Newton 2nd", reps: 1, dueAt: 500 }] }],
    dailyChecklist: { "2026-11-23": { recall: true } },
    focusLog: { "2026-11-23": 1 }
  },
  {
    xp: 350,
    dailyStreak: 2,
    lastStudiedDate: "2026-11-23",
    nodeMastery: { "algebra-scale": 1, "slope-lines": 3, "limits-potholes": 2 },
    userBookmarks: ["limits-potholes", "algebra-scale"],
    userNotes: { "node:algebra-scale": { id: "node:algebra-scale", nodeId: "algebra-scale", title: "Algebra", text: "Newer note from phone", updatedAt: 200 } },
    userDecks: [{ id: "deck_1", title: "Physics", cards: [{ id: "c1", front: "F=ma", back: "Newton 2nd", reps: 3, dueAt: 900 }, { id: "c2", front: "V=IR", back: "Ohm", reps: 0, dueAt: 100 }] }],
    dailyChecklist: { "2026-11-23": { sprint: true } },
    focusLog: { "2026-11-23": 2 }
  }
);
assert(mergeRes.xp === 350 && mergeRes.dailyStreak === 4, "Smart Merge max xp/streak failed");
assert(mergeRes.nodeMastery["algebra-scale"] === 2 && mergeRes.nodeMastery["slope-lines"] === 3 && mergeRes.nodeMastery["limits-potholes"] === 2, "Smart Merge nodeMastery max failed");
assert(mergeRes.userBookmarks.length === 2, "Smart Merge bookmark union failed");
assert(mergeRes.userNotes["node:algebra-scale"].text === "Newer note from phone", "Smart Merge newest note failed");
assert(mergeRes.userDecks.length === 1 && mergeRes.userDecks[0].cards.length === 2 && mergeRes.userDecks[0].cards.find((c) => c.id === "c1").reps === 3, "Smart Merge SM-2 deck/card merge failed");
assert(mergeRes.dailyChecklist["2026-11-23"].recall && mergeRes.dailyChecklist["2026-11-23"].sprint, "Smart Merge dailyChecklist union failed");
assert(mergeRes.focusLog["2026-11-23"] === 2, "Smart Merge focusLog max failed");

// Exam Mode → My Vault Missed Deck Verification
const fakeVaultState = { userDecks: [], userNotes: {}, userBookmarks: [] };
const fakeExam = { id: "dost_sei", shortName: "DOST-SEI", title: "DOST-SEI Scholarship" };
const fakeGrade = {
  itemReviews: [
    { status: "wrong", sectionName: "Science", q: { prompt: "What is F?", answer: "ma", whyEasy: "Newton's 2nd law." } },
    { status: "blank", sectionName: "Math", q: { prompt: "Derivative of x^2?", answer: "2x", whyEasy: "Power rule." } },
    { status: "correct", sectionName: "Math", q: { prompt: "2+2?", answer: "4", whyEasy: "Addition." } }
  ]
};
const v1 = MY_VAULT.upsertExamMissedDeck(fakeVaultState, fakeExam, fakeGrade);
assert(v1.deck && v1.addedCount === 2 && v1.totalCards === 2, "upsertExamMissedDeck failed on initial insert");
const v2 = MY_VAULT.upsertExamMissedDeck(fakeVaultState, fakeExam, fakeGrade);
assert(v2.addedCount === 0 && v2.totalCards === 2, "upsertExamMissedDeck failed to deduplicate repeat misses");

// Daily Session Plan & World→Gym Matcher Verification
const dailyPlanTest = PERSONAL.buildDailySessionPlan({ dailyChecklist: {}, mistakes: [], userDecks: [], derivationsSolved: {} }, DATA.NODES[0], 0);
assert(dailyPlanTest.steps.length === 3 && dailyPlanTest.nextStep, "buildDailySessionPlan did not return 3 steps");
assert(MEM.GYM_MODES.some((g) => g.id === PERSONAL.pickGymModeForWorld("physics")), "pickGymModeForWorld returned unregistered gym mode");

// v3.2.0 Unfair Advantage Engine (PRIMER_EDGE) Empirical Verification
assert(EDGE && typeof EDGE === "object", "PRIMER_EDGE missing");
const edgeTestState = EDGE.ensureEdgeState({ nodeMastery: {}, mistakes: [] });
const illOut = EDGE.recordConfidenceOutcome(edgeTestState, { nodeId: "algebra-scale", nodeTitle: "Algebra Scale", prompt: "2x=10", answer: "5", confidence: "sure", correct: false });
assert(illOut.tag === "illusion" && edgeTestState.confidenceLog.illusions.length === 1, "Mastery Illusion detection failed");
const luckyOut = EDGE.recordConfidenceOutcome(edgeTestState, { nodeId: "slope-lines", nodeTitle: "Slope", prompt: "rise/run", answer: "2", confidence: "guess", correct: true });
assert(luckyOut.tag === "lucky" && edgeTestState.confidenceLog.luckyHits.length === 1, "Lucky guess logging failed");
for (let k = 0; k < 4; k++) {
  EDGE.recordConfidenceOutcome(edgeTestState, { nodeId: "make-10-addition", nodeTitle: "Make 10", prompt: `p${k}`, answer: "10", confidence: "sure", correct: true });
}
const calMetrics = EDGE.getCalibrationMetrics(edgeTestState);
assert(calMetrics.total === 6 && typeof calMetrics.calibrationScore === "number" && calMetrics.calibrationScore >= 0 && calMetrics.calibrationScore <= 100, "Calibration score calculation failed");

// Blind Interleave Verification across diverse worlds
for (const p of EDGE.INTERLEAVE_PRESETS) {
  const mix = EDGE.buildBlindInterleave(edgeTestState, DATA, TUTOR, p.id, 10);
  assert(mix && mix.questions.length === 10, `Blind Interleave preset ${p.id} did not produce 10 questions`);
  assert(mix.distinctWorlds >= 4, `Blind Interleave preset ${p.id} lacked world diversity (${mix.distinctWorlds})`);
  for (const mq of mix.questions) {
    assert(mq.prompt && mq.sourceNodeId && mq.sourceTitle, `Blind Interleave question missing source metadata in ${p.id}`);
  }
}

// Feynman Active-Recall Verification across ALL 222 nodes
for (const n of DATA.NODES) {
  const anchors = EDGE.extractNodeAnchors(n);
  assert(anchors.length >= 2, `Feynman anchor extraction too sparse for node ${n.id}`);
}
const sampleFeynNode = DATA.NODES.find((n) => n.id === "algebra-scale") || DATA.NODES[0];
const sampleAnchors = EDGE.extractNodeAnchors(sampleFeynNode);
const goodFeyn = EDGE.evaluateFeynman(sampleFeynNode, `Imagine a scale where both sides stay balanced because ${sampleAnchors.map((a) => a.label).join(" ")} for example 2x = 10 means x = 5.`);
const weakFeyn = EDGE.evaluateFeynman(sampleFeynNode, "idk");
assert(goodFeyn.score >= 70 && goodFeyn.passed, `Feynman evaluator scored solid explanation too low (${goodFeyn.score})`);
assert(weakFeyn.score <= 25 && !weakFeyn.passed, `Feynman evaluator scored empty/weak explanation too high (${weakFeyn.score})`);

// 80/20 ROI Bottleneck Sniper & Exam Countdown Verification
edgeTestState.examTarget = { goalId: "dost_sei", label: "", dateIso: "2027-01-15" };
const roiRes = EDGE.computeRoiTargets(edgeTestState, DATA, TUTOR, 4);
assert(roiRes.targets.length === 4 && roiRes.totalInGoal > 20 && roiRes.daysLeft !== null && roiRes.dailyQuota >= 1, "80/20 ROI Bottleneck Sniper failed");

// Edge Smart Merge Verification
const mergedEdge = EDGE.mergeEdgeState(edgeTestState, {
  confidenceLog: { sureRight: 10, sureWrong: 0, halfRight: 0, halfWrong: 0, guessRight: 0, guessWrong: 0, illusions: [], luckyHits: [] },
  feynmanVerified: { "algebra-scale": { score: 88, text: "Balance both sides", updatedAt: 500 } },
  edgeStats: { interleaveRuns: 3, interleaveBestPct: 90, interleaveMedianSec: 6.4 }
});
assert(mergedEdge.confidenceLog.sureRight === 10 && mergedEdge.feynmanVerified["algebra-scale"].score === 88 && mergedEdge.edgeStats.interleaveRuns === 3, "Edge Smart Merge failed");

// v3.3.0 Flagship Splash, Intro & Modular Studio Configurator Verification
assert(ONBOARDING && typeof ONBOARDING === "object", "PRIMER_ONBOARDING missing");
const freshState = { xp: 0, nodeMastery: {} };
ONBOARDING.ensureStudioConfig(freshState);
assert(freshState.onboardingCompleted === false, "Fresh profile should open Flagship Intro (onboardingCompleted=false)");
const veteranState = { xp: 120, nodeMastery: { "algebra-scale": 2 } };
ONBOARDING.ensureStudioConfig(veteranState);
assert(veteranState.onboardingCompleted === true, "Existing learner with progress should auto-migrate onboardingCompleted=true");

const archScores = {};
for (const arch of ONBOARDING.ARCHETYPES) {
  const s = { ownedThemes: ["noir"], ownedAccessories: ["none"] };
  ONBOARDING.applyArchetypeToState(s, arch.id);
  const bm = ONBOARDING.computeBloatMetrics(s);
  archScores[arch.id] = bm.score;
  assert(!s.studioConfig.hiddenTabs.includes("path"), `Archetype ${arch.id} must never hide Dashboard tab`);
}
assert(
  archScores.zen < archScores.balanced &&
  archScores.balanced < archScores.exam_grinder &&
  archScores.exam_grinder < archScores.command_center,
  `Archetype bloat progression invalid: ${JSON.stringify(archScores)}`
);
const guardedState = { studioConfig: { hiddenTabs: ["path", "gym"], fontScale: 110, accentCustom: "#78b4f5" } };
ONBOARDING.ensureStudioConfig(guardedState);
assert(!guardedState.studioConfig.hiddenTabs.includes("path") && guardedState.studioConfig.hiddenTabs.includes("gym"), "hiddenTabs sanitizer failed");

console.log(`Verified Primer v3.3.0 Flagship Intro & Modular Studio: Boot Splash + 4 Archetypes (Zen ${archScores.zen}% -> Balanced ${archScores.balanced}% -> Exam Grinder ${archScores.exam_grinder}% -> Max Command Center ${archScores.command_center}%), 11 granular module switches, 12-tab customizer, Blind Interleave, Calibration, Feynman (${DATA.NODES.length} nodes), 80/20 ROI & standalone bundle.`);

// 8. Check CSP, Zero :root, and ZERO Legacy Neon Hexes across all source files!
assert(!/:root\s*\{/.test(styles), "styles.css must not declare local fallbacks on :root");
const bannedNeons = ["#58cc02", "#1cb0f6", "#ff9600", "#ce82ff", "#ff4b4b", "#ffd900", "#ffc800"];
const allFiles = [
  ["styles.css", styles],
  ["curriculum.js", curriculumCode],
  ["science_curriculum.js", scienceCode],
  ["exam_expansion.js", expansionCode],
  ["latex_tutorial.js", latexCode],
  ["shs_handouts_expansion.js", shsCode],
  ["everylingo_humanities_expansion.js", humanitiesCode],
  ["everylingo_tech_ai_expansion.js", techAiCode],
  ["everylingo_stem_laws_expansion.js", stemLawsCode],
  ["everylingo_earth_econ_phil_expansion.js", earthEconPhilCode],
  ["everylingo_coding_engine.js", codingEngineCode],
  ["everylingo_coding_curriculum.js", codingCurrCode],
  ["everylingo_exam_curriculum.js", examCurrCode],
  ["everylingo_code_forge.js", codeForgeCode],
  ["everylingo_exam_mode.js", examModeCode],
  ["primer_whiteboard.js", whiteboardCode],
  ["primer_work_studio.js", workStudioCode],
  ["primer_math_physics_expansion.js", mathPhysExpCode],
  ["primer_chem_bio_sci_expansion.js", chemBioSciExpCode],
  ["primer_my_vault.js", myVaultCode],
  ["primer_constellation.js", constellationCode],
  ["primer_edge.js", edgeCode],
  ["primer_onboarding.js", onboardingCode],
  ["tutor.js", tutorCode],
  ["visualizers.js", visualizersCode],
  ["everylingo_playgrounds.js", playgroundsCode],
  ["memorize.js", memorizeCode],
  ["app.js", appCode]
];
for (const [name, code] of allFiles) {
  if (name.endsWith(".js")) {
    assert(!/<\/script/i.test(code), `${name} contains stray </script tag`);
  }
  const low = code.toLowerCase();
  for (const hex of bannedNeons) {
    assert(!low.includes(hex), `Legacy neon color ${hex} still found in ${name}!`);
  }
  assert(!/(bàta|lùha|pùno|tùbo|pù-no|tù-bo)/i.test(code), `Misplaced KWF Malumi diacritic found in ${name}!`);
}
console.log(`Verified 0 legacy Duolingo neon hex colors across all ${allFiles.length} source files.`);

// 8b. Compute deterministic SHA-256 build fingerprint & write auto-synced build_info.js
const hashBuilder = crypto.createHash("sha256");
for (const [name, code] of allFiles) {
  hashBuilder.update(name + "\n" + code + "\n");
}
const buildHash = hashBuilder.digest("hex").slice(0, 7);
const nowDate = new Date();
const pad2 = (n) => String(n).padStart(2, "0");
const builtAt = `${nowDate.getFullYear()}-${pad2(nowDate.getMonth() + 1)}-${pad2(nowDate.getDate())} ${pad2(nowDate.getHours())}:${pad2(nowDate.getMinutes())}`;

const buildInfoPayload = {
  version: APP_RELEASE.version,
  codename: APP_RELEASE.codename,
  buildHash,
  builtAt,
  runtime: "workspace",
  counts: {
    worlds: DATA.WORLDS.length,
    nodes: DATA.NODES.length,
    playgrounds: VIZ.list.length,
    traps: DATA.GRADE12_TRAPS.length
  },
  releases: APP_RELEASE.releases
};

const workspaceBuildJs = `// Auto-generated by verify_and_bundle.mjs — do not edit manually.\nwindow.PRIMER_BUILD = ${JSON.stringify(buildInfoPayload, null, 2)};\nwindow.EVERYLINGO_BUILD = window.PRIMER_BUILD;\n`;
fs.writeFileSync(path.join(dir, "build_info.js"), workspaceBuildJs, "utf8");

// Auto-stamp Service Worker cache key with build version + hash
const swPath = path.join(dir, "sw.js");
if (fs.existsSync(swPath)) {
  const swSrc = fs.readFileSync(swPath, "utf8").replace(/const CACHE_NAME = "[^"]+";/, `const CACHE_NAME = "primer-studio-v${APP_RELEASE.version}-${buildHash}";`);
  fs.writeFileSync(swPath, swSrc, "utf8");
}

function minifyCssSafe(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s*([{};,>~])\s*/g, "$1")
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim();
}

const standaloneCss = minifyCssSafe(styles);
const standaloneBuildJs = `window.PRIMER_BUILD = ${JSON.stringify(Object.assign({}, buildInfoPayload, { runtime: "standalone" }))}; window.EVERYLINGO_BUILD = window.PRIMER_BUILD;`;

const bundledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
  <meta name="theme-color" content="#050507" />
  <title>Primer Studio v${APP_RELEASE.version} — First-Principles Learning OS</title>
  <meta name="description" content="Primer Studio v${APP_RELEASE.version} (${APP_RELEASE.codename}, build #${buildHash}) — offline-first learning OS with ${DATA.NODES.length} lessons across ${DATA.WORLDS.length} worlds, ${VIZ.list.length} playgrounds, Work Studio, Code Studio, 2D Skill Constellation, My Vault SM-2 decks & ${EXAM_MODE.EXAMS.length} PH Exam simulators." />
  <style>${standaloneCss}</style>
</head>
<body>
  <div id="primer-boot-splash" class="pr-boot-splash" aria-label="Loading Primer Studio"></div>
  <div class="ml-app-shell">
    <aside id="ml-sidebar" class="ml-sidebar" aria-label="Studio sidebar">
      <div id="ml-brand-slot" class="ml-sidebar-brand"></div>
      <nav id="ml-nav" class="ml-nav" aria-label="Main navigation"></nav>
      <div id="ml-sidebar-foot" class="ml-sidebar-foot"></div>
    </aside>
    <div class="ml-workspace">
      <header id="ml-topbar" class="ml-topbar"></header>
      <main id="ml-main" class="ml-main"></main>
      <footer id="ml-footer" class="ml-footer"></footer>
    </div>
  </div>
  <div id="ml-modal" class="ml-modal hidden" role="dialog" aria-modal="true"></div>
  <section id="primer-print-root" class="pr-print-root" aria-hidden="true"></section>

  <script>
${curriculumCode}
  <\/script>
  <script>
${scienceCode}
  <\/script>
  <script>
${expansionCode}
  <\/script>
  <script>
${latexCode}
  <\/script>
  <script>
${shsCode}
  <\/script>
  <script>
${humanitiesCode}
  <\/script>
  <script>
${techAiCode}
  <\/script>
  <script>
${stemLawsCode}
  <\/script>
  <script>
${earthEconPhilCode}
  <\/script>
  <script>
${codingEngineCode}
  <\/script>
  <script>
${codingCurrCode}
  <\/script>
  <script>
${examCurrCode}
  <\/script>
  <script>
${codeForgeCode}
  <\/script>
  <script>
${examModeCode}
  <\/script>
  <script>
${whiteboardCode}
  <\/script>
  <script>
${workStudioCode}
  <\/script>
  <script>
${mathPhysExpCode}
  <\/script>
  <script>
${chemBioSciExpCode}
  <\/script>
  <script>
${myVaultCode}
  <\/script>
  <script>
${constellationCode}
  <\/script>
  <script>
${edgeCode}
  <\/script>
  <script>
${onboardingCode}
  <\/script>
  <script>
${tutorCode}
  <\/script>
  <script>
${visualizersCode}
  <\/script>
  <script>
${playgroundsCode}
  <\/script>
  <script>
${memorizeCode}
  <\/script>
  <script>
${standaloneBuildJs}
  <\/script>
  <script>
${appCode}
  <\/script>
</body>
</html>
`;

const primerBundlePath = path.join(dir, "primer.standalone.html");
fs.writeFileSync(primerBundlePath, bundledHtml, "utf8");

// 9. Auto-generate compact token-efficient workspace index (primer_manifest.json)
function findAnchorLine(src, pattern) {
  const lines = src.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i])) return i + 1;
  }
  return null;
}

const manifest = {
  generatedBy: "verify_and_bundle.mjs",
  brand: "Primer Studio",
  build: {
    version: APP_RELEASE.version,
    codename: APP_RELEASE.codename,
    buildHash,
    builtAt
  },
  counts: {
    worlds: DATA.WORLDS.length,
    nodes: DATA.NODES.length,
    curatedQuestions: totalQuestions,
    playgrounds: VIZ.list.length,
    codeForgeQuests: CODE_FORGE.QUESTS.length,
    workStudioDerivations: WORK_STUDIO.PROBLEMS.length,
    examBlueprints: EXAM_MODE.EXAMS.length,
    traps: DATA.GRADE12_TRAPS.length,
    synthesisBosses: DATA.SYNTHESIS_PROBLEMS.length,
    diagnosticQuestions: DATA.DIAGNOSTIC_QUESTIONS.length,
    badges: DATA.BADGES.length,
    bruteforceNodes: bfNodes.length,
    gymModes: MEM.GYM_MODES.length,
    tutorPresets: allPresets.length,
    constellationEdges: constLayout.edges.length
  },
  files: allFiles.map(([name, code]) => ({
    file: name,
    lines: code.split("\n").length,
    kb: Math.round(code.length / 1024)
  })),
  anchors: {
    app: {
      escapeHtml: findAnchorLine(appCode, /function escapeHtml/),
      renderTopBar: findAnchorLine(appCode, /function renderTopBar/),
      renderPathView: findAnchorLine(appCode, /function renderPathView/),
      renderSynthesisCardHtml: findAnchorLine(appCode, /function renderSynthesisCardHtml/),
      renderTrapsView: findAnchorLine(appCode, /function renderTrapsView/),
      renderLabView: findAnchorLine(appCode, /function renderLabView/),
      renderCheatSheetView: findAnchorLine(appCode, /function renderCheatSheetView/),
      renderSearchModal: findAnchorLine(appCode, /function renderSearchModal/),
      renderModal: findAnchorLine(appCode, /function renderModal/),
      keydown: findAnchorLine(appCode, /document\.addEventListener\("keydown"/)
    },
    tutor: {
      DEPENDENCY_GRAPH: findAnchorLine(tutorCode, /const DEPENDENCY_GRAPH/),
      TAG_LABELS: findAnchorLine(tutorCode, /const TAG_LABELS/),
      generateStudyPlan: findAnchorLine(tutorCode, /function generateStudyPlan/)
    },
    memorize: {
      GYM_MODES: findAnchorLine(memorizeCode, /const GYM_MODES/),
      renderMemorizeView: findAnchorLine(memorizeCode, /function renderMemorizeView/),
      renderGymView: findAnchorLine(memorizeCode, /function renderGymView/)
    },
    latex: {
      formatInner: findAnchorLine(latexCode, /function formatInner/),
      formatMath: findAnchorLine(latexCode, /function formatMath/)
    }
  },
  worlds: DATA.WORLDS.map((w) => ({
    id: w.id,
    order: w.order,
    title: w.title,
    nodes: DATA.NODES.filter((n) => n.worldId === w.id).map((n) => n.id)
  })),
  playgrounds: VIZ.list.map((v) => ({ id: v.id, category: v.category, title: v.title })),
  gymModes: MEM.GYM_MODES.map((g) => g.id),
  tutorPresets: allPresets
};

const manifestPath = path.join(dir, "primer_manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`Generated compact workspace manifest (${Math.round(fs.statSync(manifestPath).size / 1024)} KB) at ${manifestPath}.`);
console.log(`Build stamp: Primer Studio v${APP_RELEASE.version} (${APP_RELEASE.codename}) · #${buildHash} · ${builtAt}`);
console.log(`Successfully bundled single-file app (${Math.round(bundledHtml.length / 1024)} KB, CSS minified from ${Math.round(styles.length / 1024)} KB -> ${Math.round(standaloneCss.length / 1024)} KB) at ${primerBundlePath}.`);
