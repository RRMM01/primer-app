# Primer Studio

**First-Principles Learning OS** — a zero-dependency, 100% offline-first polymath learning workspace built in pure vanilla HTML, CSS, and JavaScript. Runs locally, as an installable Offline PWA, over local Wi-Fi (`--lan`), or as a single portable file ([`primer.standalone.html`](primer.standalone.html)).

> **Current Release:** `v3.4.0` — *Deep Equations & Formulas Expansion* · Zero accounts, zero trackers, zero cloud lock-in.

---

## By the Numbers

| Metric | Count |
| --- | ---: |
| **Interactive Lessons** | **256** (across **25 Worlds**) |
| **Curated Questions + Procedural Engine** | **1,280** curated + infinite randomized generators (256/256 nodes) |
| **Interactive Visual Playgrounds** | **28** live simulations (Math, Physics, Chem, Bio, AI/LLMs, Python, SQL, Git, DSA, Optics) |
| **Work Studio Derivations** | **36** step-by-step "Show Your Work" proofs + 3 infinite procedural generators |
| **Code Studio Quests** | **36** interactive coding quests (6 Start-from-Zero + 30 Python, DSA, JS, SQL, Git/CLI, HTML/CSS) |
| **PH Competitive Exam CBT Simulators** | **10** (DOST-SEI, UPCAT, CSE Pro/Sub-Pro, NMAT, ACET, DCAT, USTET, PUPCET, PMAEE) |
| **Classic Exam & Formula Traps** | **91** high-frequency misconceptions with diagnostic quizzes |
| **Memorize Vault & Speed Gym** | **32** timed 45s sprints, 1×1→12×12 mastery course, **225** Bruteforce drills & **200+** formula/law flashcards |
| **Smart Tutor & 2D Skill Constellation** | **256-node** prerequisite DAG, SM-2 spaced repetition, per-domain Elo & **19** Study Plan presets |

---

## Core Modules

- **Visual-First Lesson Path (25 Worlds · 256 Skills)** — Every lesson pairs plain-English intuition (`easyTruth`), step-by-step equation breakdowns, an interactive visual playground, a 5-slide offline LaTeX worked example, Bruteforce infinite drills, and a built-in freehand Canvas Whiteboard.
- **Work Studio ("Show Your Work")** — Solve 36 multi-step Algebra, Calculus, Physics, Chemistry, and Genetics derivations in either *Guided Step Picker* mode (with surgical mistake diagnostics per wrong step) or *Type-Your-Step* symbolic/numeric mode.
- **Code Studio** — Split-pane in-browser coding environment with an offline Python interpreter & call-stack tracer, live SQL workbench, JavaScript/HTML/CSS runner, and automated unit-test diffs.
- **Exam Mode CBT Studio** — Authentic proctored exam runner with section countdown timers, section locks, OMR navigator grid, choice strike-through, UPCAT $R - \frac{1}{4}W$ penalty + UPG estimator, CSE 80.00% gate, NMAT 200–800 PR scaling, and 1-click *Save Missed → My Vault Deck*.
- **Unfair Advantage Engine** — Blind-Topic Interleaving (*No-Labels Cold Recognition*), Confidence Calibration & Mastery Illusion Detector (`Sure` / `50/50` / `Guess`), offline Feynman Active-Recall Grader (*Explain It Like I'm 12*), and 80/20 ROI Bottleneck Sniper.
- **2D Skill Constellation Map** — HiDPI interactive `<canvas>` graph of all 256 skills and prerequisite edges with zoom/pan, search-to-focus, 19 Study Track spotlights, and crimson decay/mistake halos.
- **My Vault (Personal Study Brain)** — Bookmark any lesson, attach Markdown + LaTeX notes, build custom SM-2 flashcard decks, import handouts (`::`, Markdown `##`, `Q:/A:`, TSV, CSV), and print ink-saving PDF cram sheets (`@media print`).
- **Modular Obsidian Workspace** — Pitch-black OLED UI (Sage, Cobalt, Crimson, Monochrome + custom hex accent), 4 workspace archetypes (*Ultra-Clean Zen* → *Max Command Center*), persistent Focus Timer with WebAudio focus soundscapes, `Ctrl+K` Universal Search, and lossless offline Smart Merge Sync.

---

## Curriculum Overview (25 Worlds · 256 Lessons)

| Domain | Worlds | Highlights |
| --- | --- | --- |
| **Mathematics** | Eras 1–5 (`nursery`, `elementary`, `junior`, `senior`, `college`) | Number sense, algebra, quadratics, trig, conics, parametric & polar curves, number theory (Euclidean GCD, Fermat, Euler $\phi$), Euler's formula & hyperbolics, Taylor/Maclaurin series & L'Hôpital, differential equations, eigenvalues & projections, vector calculus ($\nabla f, \nabla\cdot F, \nabla\times F$), probability distributions & CLT |
| **Physics** | `physics` (31 lessons) | Kinematics, Newton's laws, energy/momentum, gravitation & Kepler, rotational dynamics, SHM, sound/Doppler, 4 laws of thermodynamics, E&M, Kirchhoff, Faraday & Maxwell, mirrors/lenses, wave optics (double-slit, Malus, Brewster), elasticity & Young's modulus, Fourier/Stefan-Boltzmann/Wien heat transfer, RC/RL/RLC impedance & resonance, special relativity ($E^2=(pc)^2+(mc^2)^2$), quantum mechanics (de Broglie, Bohr, Heisenberg), Bernoulli & Poiseuille $r^4$ fluids |
| **Chemistry** | `chemistry` (22 lessons) | Atomic structure, VSEPR, stoichiometry, acids/bases, equilibrium, organic & polymers, IMFs, colligative properties, kinetics, Gibbs free energy, Henderson-Hasselbalch buffers, electrochemistry (Nernst & Faraday), $K_{sp}$ solubility & common-ion, Hess's Law & bond enthalpies, integrated rate laws & Arrhenius, real gases (Dalton, Graham, Van der Waals), Beer-Lambert & nuclear decay |
| **Biology** | `biology` (20 lessons) | Cells, osmosis, photosynthesis & respiration, DNA/RNA, genetics, pedigrees, recombinant DNA, evolution & cladistics, human & plant systems, Hardy-Weinberg & $\chi^2$, Michaelis-Menten enzyme kinetics, water potential ($\Psi$) & action potentials, quantitative ecology (Lincoln-Petersen, Shannon $H'$), immunology & herd immunity ($1 - 1/R_0$), cardiorespiratory & renal physiology |
| **Earth, Space & Science** | `earth_space` (13 lessons) | Plate tectonics, volcanoes/quakes, rock cycle, typhoons & monsoons, geologic time, moon/tides, climate & greenhouse, astrophysics (parallax, luminosity, Hubble, Schwarzschild), radiometric dating & seismic magnitude, adiabatic lapse rates, Coriolis & tsunamis ($\sqrt{gh}$), lab sig-figs & error propagation, planetary albedo balance, Rule of 70 & biogeochemical cycles |
| **AI, CS & Software Engineering** | `ai_ml`, `web_coding`, `python_tech`, `dsa_mastery`, `backend_sql_dev`, `js_ts_architecture` | Neural nets, backprop, transformers & agents; HTML/CSS/JS/HTTP; Python, binary & Big-O; hash maps, trees, graphs & DP; SQL, REST, JWT, Linux, Git & Docker; TypeScript, OOP/SOLID, TDD & concurrency |
| **Humanities, Logic & PH Exams** | `verbal-logic`, `wica`, `persdev`, `wellness`, `ph_history`, `filipino`, `abstract_shapes`, `econ_finance`, `philosophy_logic`, `exam_mastery` | Grammar, reading & deduction, PH History & 1987 Constitution, Filipino Wika (KWF Diin), SVG abstract shapes & 3D nets, Economics & PH finance, fallacies & biases, DOST/UPCAT/CSE/NMAT specialized mastery |

---

## Quick Start

### 1. Run Locally (Recommended — enables Offline PWA & Service Worker)
```bash
./launch_primer.sh
```
Open on your phone over the same home Wi-Fi:
```bash
./launch_primer.sh --lan
```
Or serve with any static server:
```bash
python3 -m http.server 8000
```

### 2. Zero-Install Single-File Mode
Open [`primer.standalone.html`](primer.standalone.html) directly in any modern browser — no server or internet connection required.

---

## Verification & Bundling

Every curriculum change, LaTeX expression, procedural generator, Work Studio proof, Code Studio quest, Exam blueprint, and CSS invariant is verified automatically by:

```bash
node verify_and_bundle.mjs
```

This runs the full empirical test suite (including 10,240+ procedural question checks, 0-leak LaTeX verification across all 256 nodes, DAG acyclicity checks, and 36 Code Studio test suites), auto-stamps `sw.js` and `build_info.js`, regenerates `primer_manifest.json`, and compiles the minified single-file `primer.standalone.html`.

---

## Project Architecture

- **`index.html` & `styles.css`** — Pitch-black OLED workspace shell, responsive layout, and `@media print` PDF study studio.
- **`curriculum.js`, `science_curriculum.js`, `exam_expansion.js`, `shs_handouts_expansion.js`** — Core Worlds 1–12.
- **`everylingo_*_expansion.js` & `everylingo_*_curriculum.js`** — Worlds 13–25 (Humanities, AI/Web/Python, STEM Laws, Earth/Econ/Phil, DSA/Backend/TS, PH Exams).
- **`primer_math_physics_expansion.js` & `primer_chem_bio_sci_expansion.js`** — Deep Equations & Formulas Expansion (+34 detailed STEM lessons, +16 traps, +42 formula cards, +12 Work Studio proofs).
- **`latex_tutorial.js`** — Offline LaTeX, 2D matrix, subscript, and inline-code renderer + 5-slide worked example builder.
- **`visualizers.js` & `everylingo_playgrounds.js`** — 28 interactive visual laboratories.
- **`primer_work_studio.js`, `everylingo_code_forge.js`, `everylingo_exam_mode.js`** — Work Studio, Code Studio & CBT Exam Simulator.
- **`primer_whiteboard.js`, `primer_my_vault.js`, `primer_constellation.js`, `primer_edge.js`, `primer_onboarding.js`** — Whiteboard, Personal Study Brain, 2D Skill Constellation, Unfair Advantage Engine & Modular Configurator.
- **`tutor.js`, `memorize.js`, `app.js`** — Smart Tutor DAG/SM-2/Elo engine, Speed Gym/Vault, and main workspace controller.
- **`manifest.webmanifest` & `sw.js`** — Installable Offline PWA manifest and auto-versioned Service Worker.
