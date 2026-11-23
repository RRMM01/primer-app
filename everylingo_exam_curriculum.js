// EveryLingo World 25: PH Competitive Exams & Specialized Mastery
// Dedicated curriculum closing every major gap for DOST-SEI, UPCAT, ACET, DCAT, USTET, PUPCET, CSE (Pro/Sub-Pro), NMAT & PMAEE
// Adds:
//   World 25: exam_mastery (10 detailed lessons, orders 213–222, 50 curated questions)
//   + 8 Classic Exam Traps (with full quiz.explanation)
//   + 4 Diagnostic Questions
//   + 4 Exam Synthesis Bosses (DOST-SEI, UPCAT, CSE, NMAT)
//   + 5 Exam Mode Badges
//   + 18 Exam Prep Memorize Vault Cards (examPrepCards)
//   + 10 Deep Procedural Generators (8–16+ unique variants each, incl. dynamic inline SVGs)
//   + 10 Detailed Offline-LaTeX Worked Examples
(function (root) {
  "use strict";

  const DATA = root.MATHLINGO_DATA;
  const LATEX = root.MATHLINGO_LATEX;
  if (!DATA) return;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(arr) {
    const c = arr.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = c[i];
      c[i] = c[j];
      c[j] = tmp;
    }
    return c;
  }

  function pick(arr) {
    return arr[randInt(0, arr.length - 1)];
  }

  function bankQ(items) {
    const p = pick(items);
    const out = {
      type: "mc",
      prompt: p.prompt,
      options: shuffle(p.options),
      answer: p.answer,
      hint: p.hint,
      whyEasy: p.whyEasy
    };
    if (p.visualSvg) out.visualSvg = p.visualSvg;
    return out;
  }

  function numOpts(ans, deltas, suffix, prefix) {
    const pre = prefix || "";
    const suf = suffix || "";
    const set = new Set([pre + String(ans) + suf]);
    for (const d of shuffle(deltas)) {
      const cand = ans + d;
      if (cand !== ans && cand > 0) set.add(pre + String(cand) + suf);
      if (set.size === 4) break;
    }
    let bump = 1;
    while (set.size < 4) {
      const cand = ans + bump++;
      if (cand !== ans) set.add(pre + String(cand) + suf);
    }
    return shuffle(Array.from(set));
  }

  // ==================== INLINE SVG HELPERS FOR EXAM QUESTIONS ====================
  function svgLever(dLeft, loadN, dRight, labelRight) {
    return `<svg viewBox="0 0 320 120" width="100%" height="120" aria-label="Lever balance diagram">
      <rect x="6" y="6" width="308" height="108" rx="10" fill="#0d0f14" stroke="rgba(255,255,255,0.14)"/>
      <line x1="36" y1="68" x2="284" y2="68" stroke="#8eb8a3" stroke-width="5" stroke-linecap="round"/>
      <polygon points="160,70 144,102 176,102" fill="#eab349"/>
      <rect x="44" y="34" width="44" height="32" rx="5" fill="rgba(120,180,245,0.22)" stroke="#78b4f5" stroke-width="1.6"/>
      <text x="66" y="54" text-anchor="middle" fill="#f7f7f9" font-size="12" font-weight="700">${loadN} N</text>
      <rect x="232" y="34" width="44" height="32" rx="5" fill="rgba(234,179,73,0.20)" stroke="#eab349" stroke-width="1.6"/>
      <text x="254" y="54" text-anchor="middle" fill="#eab349" font-size="12" font-weight="700">${labelRight}</text>
      <text x="112" y="88" text-anchor="middle" fill="#9a9aa6" font-size="11">${dLeft} m</text>
      <text x="208" y="88" text-anchor="middle" fill="#9a9aa6" font-size="11">${dRight} m</text>
      <text x="160" y="22" text-anchor="middle" fill="#9a9aa6" font-size="11">Fulcrum in equilibrium: F₁·d₁ = F₂·d₂</text>
    </svg>`;
  }

  function svgGears(t1, t2, dir1) {
    const arrow1 = dir1 === "CW" ? "↻ CW" : "↺ CCW";
    return `<svg viewBox="0 0 320 124" width="100%" height="124" aria-label="Meshing gears diagram">
      <rect x="6" y="6" width="308" height="112" rx="10" fill="#0d0f14" stroke="rgba(255,255,255,0.14)"/>
      <circle cx="106" cy="64" r="38" fill="rgba(120,180,245,0.14)" stroke="#78b4f5" stroke-width="3" stroke-dasharray="7 4"/>
      <circle cx="106" cy="64" r="6" fill="#78b4f5"/>
      <text x="106" y="56" text-anchor="middle" fill="#f7f7f9" font-size="11" font-weight="700">Gear A</text>
      <text x="106" y="84" text-anchor="middle" fill="#78b4f5" font-size="11">${t1} teeth (${arrow1})</text>
      <circle cx="182" cy="64" r="24" fill="rgba(142,184,163,0.16)" stroke="#8eb8a3" stroke-width="3" stroke-dasharray="6 4"/>
      <circle cx="182" cy="64" r="5" fill="#8eb8a3"/>
      <text x="256" y="56" text-anchor="middle" fill="#f7f7f9" font-size="11" font-weight="700">Gear B</text>
      <text x="256" y="74" text-anchor="middle" fill="#8eb8a3" font-size="11">${t2} teeth (?)</text>
      <text x="160" y="20" text-anchor="middle" fill="#9a9aa6" font-size="10.5">Directly meshing gears: N₁·T₁ = N₂·T₂</text>
    </svg>`;
  }

  function svgPulley(typeLabel, ropes, loadN) {
    return `<svg viewBox="0 0 320 130" width="100%" height="130" aria-label="Pulley mechanical advantage diagram">
      <rect x="6" y="6" width="308" height="118" rx="10" fill="#0d0f14" stroke="rgba(255,255,255,0.14)"/>
      <line x1="70" y1="22" x2="250" y2="22" stroke="rgba(255,255,255,0.4)" stroke-width="4"/>
      <circle cx="160" cy="48" r="16" fill="rgba(142,184,163,0.18)" stroke="#8eb8a3" stroke-width="2.5"/>
      ${ropes >= 2 ? `<circle cx="160" cy="86" r="14" fill="rgba(234,179,73,0.18)" stroke="#eab349" stroke-width="2.5"/>` : ""}
      <line x1="144" y1="22" x2="144" y2="86" stroke="#78b4f5" stroke-width="2"/>
      <line x1="176" y1="48" x2="176" y2="96" stroke="#78b4f5" stroke-width="2"/>
      <rect x="136" y="98" width="48" height="20" rx="4" fill="rgba(242,139,139,0.22)" stroke="#f28b8b"/>
      <text x="160" y="112" text-anchor="middle" fill="#f7f7f9" font-size="11" font-weight="700">${loadN} N</text>
      <text x="64" y="68" text-anchor="middle" fill="#eab349" font-size="11" font-weight="700">${typeLabel}</text>
      <text x="254" y="68" text-anchor="middle" fill="#8eb8a3" font-size="11">${ropes} supporting</text>
      <text x="254" y="83" text-anchor="middle" fill="#9a9aa6" font-size="10.5">strand${ropes > 1 ? "s" : ""}</text>
    </svg>`;
  }

  function svgDataChart(title, labels, vals, unit) {
    const maxV = Math.max(...vals, 10);
    const bars = vals.map((v, i) => {
      const h = Math.max(12, Math.round((v / maxV) * 66));
      const x = 44 + i * 64;
      const y = 96 - h;
      return `<rect x="${x}" y="${y}" width="38" height="${h}" rx="4" fill="${i === vals.length - 1 ? "#8eb8a3" : "#78b4f5"}" opacity="0.85"/>
        <text x="${x + 19}" y="${y - 5}" text-anchor="middle" fill="#f7f7f9" font-size="10.5" font-weight="700">${v}${unit}</text>
        <text x="${x + 19}" y="111" text-anchor="middle" fill="#9a9aa6" font-size="10">${labels[i]}</text>`;
    }).join("");
    return `<svg viewBox="0 0 320 124" width="100%" height="124" aria-label="Exam data bar chart">
      <rect x="6" y="6" width="308" height="112" rx="10" fill="#0d0f14" stroke="rgba(255,255,255,0.14)"/>
      <text x="160" y="21" text-anchor="middle" fill="#eab349" font-size="11" font-weight="700">${title}</text>
      <line x1="28" y1="96" x2="298" y2="96" stroke="rgba(255,255,255,0.22)" stroke-width="1.2"/>
      ${bars}
    </svg>`;
  }

  function svgMirrorPuzzle(label, shapePath) {
    return `<svg viewBox="0 0 320 112" width="100%" height="112" aria-label="NMAT perceptual mirror diagram">
      <rect x="6" y="6" width="308" height="100" rx="10" fill="#0d0f14" stroke="rgba(255,255,255,0.14)"/>
      <text x="86" y="22" text-anchor="middle" fill="#9a9aa6" font-size="10.5">Original Figure</text>
      <g transform="translate(46,32)">${shapePath}</g>
      <line x1="160" y1="18" x2="160" y2="96" stroke="#eab349" stroke-width="2" stroke-dasharray="5 4"/>
      <text x="160" y="103" text-anchor="middle" fill="#eab349" font-size="9.5">Vertical Mirror</text>
      <text x="236" y="62" text-anchor="middle" fill="#8eb8a3" font-size="12" font-weight="700">${label}</text>
    </svg>`;
  }

  // ==================== WORLD 25: PH COMPETITIVE EXAMS & SPECIALIZED MASTERY ====================
  DATA.WORLDS.push({
    id: "exam_mastery",
    subject: "exam_mastery",
    order: 25,
    icon: "🎯",
    color: "#3b7a9e",
    colorDark: "#265470",
    bgSoft: "rgba(59, 122, 158, 0.13)",
    borderSoft: "rgba(59, 122, 158, 0.34)",
    title: "PH Exams: DOST, UPCAT, CSE & NMAT Mastery",
    subtitle: "Specialized missing subtests: DOST Mechanical-Technical & Space, Graphs/Experiments, Work/Mixture/Series, Paragraph Org, NMAT Perceptual & Social Sci, CSE RA 6713 & Clerical Filing!"
  });

  // ==================== 10 NEW SKILL NODES (ORDERS 213–222) ====================
  const NEW_EXAM_MASTERY_NODES = [
    // 213: DOST-SEI Mechanical-Technical Reasoning
    {
      id: "exam-mechanical-technical-reasoning",
      worldId: "exam_mastery",
      order: 213,
      title: "Mechanical-Technical Reasoning (DOST-SEI)",
      icon: "⚙️",
      tagline: "Pulleys count supporting strands, meshing gears flip direction (small = faster!), levers balance F₁·d₁ = F₂·d₂, and fluids depend on DEPTH only!",
      scaryVersion: "Applied statics, simple-machine mechanical advantage, gear-train kinematics, and practical fluid/electrical diagnostics.",
      easyTruth: "DOST-SEI's famous **Mechanical-Technical** subtest rarely asks for messy algebra — it tests whether you *feel* how real machines work! A **fixed pulley** only flips pull direction (`MA = 1`), while a **movable pulley** splits load across supporting strands (`MA = # supporting strands`). Meshing gears ALWAYS spin in **opposite directions**, and the smaller gear spins **faster** (`N₁T₁ = N₂T₂`). On a seesaw/lever, multiply force by distance from the fulcrum (`F₁d₁ = F₂d₂`)!",
      microSteps: [
        { label: "Step 1: Pulleys & Levers (FLE 1-2-3 & Torque)", text: "**Fixed Pulley** = changes direction ONLY (`MA = 1`, pull equals weight). **Movable / Block-and-Tackle** = `MA` equals the number of rope segments pulling UP on the movable load (`Effort = Load ÷ MA`, but you pull `MA×` more rope!). **Lever Classes (`FLE 1-2-3` = what's in the MIDDLE)**: Class 1 = **F**ulcrum middle (seesaw, crowbar, scissors); Class 2 = **L**oad middle (wheelbarrow, nutcracker — ALWAYS `MA > 1`!); Class 3 = **E**ffort middle (tweezers, broom, human forearm — trades force for speed!). Balance rule: `F₁ · d₁ = F₂ · d₂`!" },
        { label: "Step 2: Meshing Gears, Belt Drives & Inclined Planes", text: "**Meshing Gears**: Adjacent gears ALWAYS turn in **opposite** directions! In a chain of `n` meshing gears, odd gears turn the SAME way and even gears turn the OPPOSITE way! Speed rule: `RPM₁ × Teeth₁ = RPM₂ × Teeth₂` (smaller gear spins proportionally FASTER!). **Open Belt Drive**: Both pulleys spin the **SAME** direction; **Crossed Belt**: **OPPOSITE** direction! **Inclined Plane**: Ideal `MA = Ramp Length ÷ Vertical Height` (`L/h`)!" },
        { label: "Step 3: Everyday Fluids, Center of Gravity & Simple Circuits", text: "**Water Pressure** `P = ρgh` depends ONLY on vertical **depth** `h` and fluid density `ρ` — NEVER on tank width or total water volume! **Pascal Hydraulic Lift**: `F₁/A₁ = F₂/A₂` (small piston × small force lifts a car on a huge piston!). **Stability**: Lower center of gravity + wider base = harder to tip! **Circuits**: Bulbs in **parallel** stay bright if one burns out; bulbs in **series** ALL go dark if one opens!" }
      ],
      cheatCode: "Fixed pulley MA=1; Movable MA=# supporting ropes! Meshing gears = OPPOSITE spin & N₁T₁ = N₂T₂ (smaller spins faster!). Lever FLE 1-2-3 & F₁d₁ = F₂d₂! Hydrostatic P = ρgh depends ONLY on depth!",
      visualizerId: "examMechPerceptualLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          visualSvg: svgLever(2, 60, 4, "F = ?"),
          prompt: "A `60 N` crate sits `2 m` left of a seesaw fulcrum. What downward force `F` placed `4 m` right of the fulcrum balances it perfectly?",
          options: ["30 N", "60 N", "120 N", "15 N"],
          answer: "30 N",
          hint: "Balance torque on both sides: `60 × 2 = F × 4`!",
          whyEasy: "`60 × 2 = 120 N·m`, divided by `4 m` gives `30 N` — doubling the lever arm halves the effort needed!"
        },
        {
          type: "mc",
          visualSvg: svgGears(36, 12, "CW"),
          prompt: "Driver Gear A (`36 teeth`) turns **clockwise** at `10 RPM` and meshes directly with Gear B (`12 teeth`). How does Gear B spin?",
          options: ["Counterclockwise at 30 RPM", "Clockwise at 30 RPM", "Counterclockwise at 3.3 RPM", "Clockwise at 10 RPM"],
          answer: "Counterclockwise at 30 RPM",
          hint: "Directly meshing gears ALWAYS flip direction, and `N₁T₁ = N₂T₂`!",
          whyEasy: "Direction flips CW → CCW, and `10 × 36 ÷ 12 = 30 RPM` (3× fewer teeth = 3× faster!)."
        },
        {
          type: "mc",
          visualSvg: svgPulley("Ideal Movable", 2, 100),
          prompt: "An ideal frictionless **single movable pulley** (`2` upward supporting strands) lifts a `100 N` load. What pulling force is needed (and how much rope must you pull to lift it `1 m`)?",
          options: ["50 N force; pull 2 m of rope", "100 N force; pull 1 m of rope", "50 N force; pull 0.5 m of rope", "25 N force; pull 4 m of rope"],
          answer: "50 N force; pull 2 m of rope",
          hint: "2 supporting strands split the `100 N` load in half (`MA = 2`), and Work `F × d` stays conserved!",
          whyEasy: "`MA = 2` cuts effort to `100 ÷ 2 = 50 N`, at the exact trade-off of pulling `2×` the distance (`2 m`)!"
        },
        {
          type: "mc",
          prompt: "Which tool is a **Class 2 Lever** (Load in the middle between Fulcrum and Effort, ALWAYS giving Mechanical Advantage `> 1`)?",
          options: ["Wheelbarrow (wheel = fulcrum, dirt = load, handles = effort)", "Tweezers", "Human forearm lifting a dumbbell", "Seesaw"],
          answer: "Wheelbarrow (wheel = fulcrum, dirt = load, handles = effort)",
          hint: "Use **FLE 1-2-3**: 1=Fulcrum middle, 2=Load middle, 3=Effort middle!",
          whyEasy: "In a wheelbarrow (and nutcracker), the Load sits between the wheel (Fulcrum) and your hands (Effort)!"
        },
        {
          type: "mc",
          prompt: "Tank A is a narrow `10 m`-tall vertical pipe filled with water; Tank B is a giant `50 m`-wide pool filled `10 m` deep with water. Compare water pressure at the bottom of both tanks:",
          options: ["EQUAL pressure — hydrostatic pressure `P = ρgh` depends ONLY on depth & density!", "Tank B has 50× higher pressure", "Tank A has higher pressure because it is squeezed", "Zero pressure at the bottom"],
          answer: "EQUAL pressure — hydrostatic pressure `P = ρgh` depends ONLY on depth & density!",
          hint: "Look at `P = ρgh` — does width or total water volume appear anywhere in the formula?",
          whyEasy: "Hydrostatic paradox: identical liquid (`ρ`) at identical depth (`h = 10 m`) produces identical bottom pressure!"
        }
      ]
    },

    // 214: Astronomy, Solar System & Stellar Evolution
    {
      id: "exam-astronomy-stars-cosmos",
      worldId: "exam_mastery",
      order: 214,
      title: "Astronomy, Solar System & Star Life Cycles (DOST/UPCAT)",
      icon: "🪐",
      tagline: "4 Rocky Terrestrial vs 4 Jovian Gas/Ice Giants, Main Sequence stars fuse H → He, Hot = Blue & Cool = Red, and Redshift proves cosmic expansion!",
      scaryVersion: "Planetary astrophysics, Hertzsprung–Russell stellar evolution, thermonuclear fusion, and observational cosmology.",
      easyTruth: "Space science shows up every single year on **DOST-SEI** and **UPCAT** — and almost every question reduces to 4 crisp facts: (1) Inner planets (`M-V-E-M`) are small, dense, rocky **Terrestrial** worlds; outer planets (`J-S-U-N`) are huge, low-density **Jovian** giants with rings & many moons! (2) **Blue stars are HOTTEST**, **Red stars are COOLEST** (`O-B-A-F-G-K-M`!). (3) Stars shine by **Nuclear Fusion** (`4H → He`), and mass decides their death (Sun → White Dwarf; Massive Star → Supernova → Neutron Star or Black Hole)! (4) Distant galaxies show **Redshift**, proving the Universe is expanding!",
      microSteps: [
        { label: "Step 1: Solar System Map & Planetary Extremes", text: "Order from Sun: **M**ercury, **V**enus, **E**arth, **M**ars | *Asteroid Belt* | **J**upiter, **S**aturn, **U**ranus, **N**eptune. **Key Exam Trivia**: **Venus** is the HOTTEST planet (runaway `CO₂` greenhouse — hotter than Mercury!) AND spins backwards (**retrograde**)! **Mars** is red from iron oxide (`Fe₂O₃`). **Jupiter** is the largest; **Saturn** is so low-density it would float in water! **1 AU** = Earth–Sun distance (`~150 million km`); **1 Light-Year** = **DISTANCE** light travels in 1 year (`~9.46 × 10¹² km`), NOT time!" },
        { label: "Step 2: H-R Diagram, Star Color & Stellar Evolution", text: "Star color = surface temperature: **Blue (`O, B`) = HOTTEST** (`>30,000 K`), **Yellow (`G`, our Sun!) = medium** (`~5,800 K`), **Red (`M`) = COOLEST** (`~3,000 K`). **90% of stars** sit on the diagonal **Main Sequence**, stably fusing **Hydrogen → Helium** in their cores. **Death by Mass**: Low/medium mass (Sun) → **Red Giant → Planetary Nebula → White Dwarf**! High mass (`>8 M_☉`) → **Red Supergiant → Supernova → Neutron Star or Black Hole**!" },
        { label: "Step 3: Comets, Meteors & Big Bang Evidence", text: "**Meteoroid** = rock in space; **Meteor** = glowing streak burning in Earth's Mesosphere; **Meteorite** = fragment hitting Earth's ground! **Comet** = 'dirty snowball' (ice + dust) whose tail ALWAYS points **AWAY from the Sun** (pushed by solar wind!). **Big Bang Evidence**: (1) **Hubble Redshift** (galaxies moving away stretch light toward longer/red wavelengths), (2) **Cosmic Microwave Background (CMB)** faint thermal afterglow everywhere in space!" }
      ],
      cheatCode: "Venus = hottest (runaway CO₂) & retrograde! Light-Year = DISTANCE! Star Temp: Blue = HOT, Red = COOL! Sun → Red Giant → White Dwarf; Huge Star → Supernova → Neutron Star/Black Hole! Redshift + CMB = Big Bang!",
      visualizerId: "physicsLawsPlayground",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Which planet in our Solar System has the **HOTTEST** average surface temperature (`~465°C`), even hotter than Mercury?",
          options: ["Venus (runaway CO₂ greenhouse atmosphere)", "Mercury (closest to the Sun)", "Mars", "Jupiter"],
          answer: "Venus (runaway CO₂ greenhouse atmosphere)",
          hint: "Mercury has almost no atmosphere to trap heat overnight, whereas Venus wears a crushing `96% CO₂` blanket!",
          whyEasy: "Venus's dense carbon dioxide atmosphere traps extreme thermal radiation day and night!"
        },
        {
          type: "mc",
          prompt: "On the Hertzsprung–Russell (H-R) Diagram, what do **Main Sequence** stars (including our Sun) fuse in their cores to generate energy?",
          options: ["Hydrogen nuclei fusing into Helium (`4H → He`)", "Uranium splitting by fission", "Coal burning with oxygen", "Iron fusing into Gold"],
          answer: "Hydrogen nuclei fusing into Helium (`4H → He`)",
          hint: "Stars are giant nuclear FUSION engines (NOT fission!).",
          whyEasy: "Main sequence stars balance inward gravity with outward pressure from Hydrogen → Helium nuclear fusion!"
        },
        {
          type: "mc",
          prompt: "Which star color indicates the **HIGHEST** surface temperature?",
          options: ["Blue / Blue-White (Class O & B)", "Red (Class M)", "Orange (Class K)", "Yellow (Class G)"],
          answer: "Blue / Blue-White (Class O & B)",
          hint: "Think of a Bunsen burner flame: cool tips glow red/orange; the hottest core glows BLUE!",
          whyEasy: "Shorter wavelength (blue) = higher photon energy & surface temperature (`Wien's Law`)!"
        },
        {
          type: "mc",
          prompt: "What is the expected final evolutionary remnant of a medium-mass star like **our Sun** after its Red Giant & Planetary Nebula stages?",
          options: ["White Dwarf", "Black Hole", "Neutron Star", "Supernova explosion"],
          answer: "White Dwarf",
          hint: "Our Sun is NOT massive enough (`< 8 solar masses`) to explode as a core-collapse supernova!",
          whyEasy: "Sun-like stars shed outer layers peacefully into a planetary nebula, leaving a dense glowing White Dwarf!"
        },
        {
          type: "mc",
          prompt: "What does a **Light-Year** measure in astronomy, and what does galactic **Redshift** prove?",
          options: ["DISTANCE light travels in 1 year; galaxies are receding (expanding Universe)", "TIME it takes Earth to orbit; Universe is shrinking", "Brightness of a star; Earth is stationary", "Mass of a galaxy; Sun is cooling"],
          answer: "DISTANCE light travels in 1 year; galaxies are receding (expanding Universe)",
          hint: "Light travels `300,000 km/s` for a whole year — that's a giant LENGTH!",
          whyEasy: "Light-year = distance (`~9.46 trillion km`); Doppler Redshift proves cosmic expansion (Big Bang)!"
        }
      ]
    },

    // 215: Scientific Graphs, Tables & Experimental Design
    {
      id: "exam-data-interpretation-experiments",
      worldId: "exam_mastery",
      order: 215,
      title: "Graphs, Tables & Scientific Experiments (DOST/UPCAT/CSE)",
      icon: "📈",
      tagline: "DRY MIX (Dependent = Y-axis, Manipulated/Independent = X-axis!), hold Controls constant, compute % change as (New − Old) ÷ Old!",
      scaryVersion: "Quantitative data interpretation, experimental methodology, control-group diagnostics, and bivariate trend extrapolation.",
      easyTruth: "Over 25% of **DOST-SEI Science**, **UPCAT Science**, and **CSE Analytical** questions don't require memorizing facts at all — they hand you a graph, table, or lab experiment right on the page! Lock in **DRY MIX**: the **M**anipulated (**I**ndependent) variable goes on the **X**-axis (what the scientist intentionally changes), while the **D**ependent (**R**esponding) variable goes on the **Y**-axis (what you measure as the outcome!). And for any percent-change chart question, ALWAYS divide by the **OLD (starting)** value!",
      microSteps: [
        { label: "Step 1: DRY MIX & Valid Experimental Controls", text: "**Independent Variable (IV / X-axis)** = the ONE factor you purposely change (e.g., fertilizer dose). **Dependent Variable (DV / Y-axis)** = the result you measure (e.g., plant height). **Controlled Variables (Constants)** = everything kept identical (sunlight, water, soil, species) so only the IV causes the change! **Control Group** = baseline group receiving ZERO treatment (or placebo) for comparison! Changing 2 variables at once creates a **Confounding Variable** (invalid experiment!)." },
        { label: "Step 2: Reading Trends, Slopes, Interpolation & Extrapolation", text: "**Steeper slope** = FASTER rate of change (`Δy / Δx`); **flat horizontal line** = zero change / plateau (e.g., enzyme saturation or phase change!). **Interpolation** = estimating a value **INSIDE** measured data points (reliable); **Extrapolation** = projecting **BEYOND** the measured range (riskier!). Beware truncated Y-axes that exaggerate tiny differences visually!" },
        { label: "Step 3: Percent Change, Ratios & CSE Data Sufficiency", text: "**Percent Change** = `(New − Old) ÷ Old × 100%` — NEVER divide by the New value! Example: going from `40 → 50` is `+10/40 = +25%`, while dropping `50 → 40` is `−10/50 = −20%`! In **Data Sufficiency**, ask ONLY: *'Can I determine ONE unique exact value?'* — you don't even have to finish messy arithmetic once uniqueness is guaranteed!" }
      ],
      cheatCode: "DRY MIX: Dependent/Responding = Y-axis; Manipulated/Independent = X-axis! Change ONLY 1 IV at a time! % Change = (New − Old) ÷ Old × 100%! Interpolation = inside data; Extrapolation = beyond data!",
      visualizerId: "earthSpaceEconLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          visualSvg: svgDataChart("Monthly Store Sales (₱ thousands)", ["Jan", "Feb", "Mar", "Apr"], [40, 50, 45, 60], "k"),
          prompt: "Based on the bar chart above, what was the **percent increase** in sales from **January (`40k`) to February (`50k`)**?",
          options: ["+25%", "+20%", "+10%", "+50%"],
          answer: "+25%",
          hint: "Percent change = `(New − Old) ÷ Old × 100% = (50 − 40) ÷ 40`!",
          whyEasy: "`10 ÷ 40 = 0.25 = +25%`! (Trap: dividing by 50 gives the wrong 20%!)"
        },
        {
          type: "mc",
          prompt: "A student tests how **water temperature** (`10°C, 25°C, 40°C, 60°C`) affects the **time for a sugar cube to dissolve**, using the same beaker size and stirring speed. Which is the **Dependent Variable (Y-axis)**?",
          options: ["Time taken for the sugar cube to dissolve", "Water temperature", "Beaker size", "Stirring speed"],
          answer: "Time taken for the sugar cube to dissolve",
          hint: "DRY MIX: What is the measured OUTCOME that responds to the change?",
          whyEasy: "Temperature is the Independent Variable (X-axis); dissolving time is the Dependent Variable (Y-axis)!"
        },
        {
          type: "mc",
          prompt: "A researcher wants to test Fertilizer X. Group A gets Fertilizer X AND 2× more sunlight; Group B gets no fertilizer and normal sunlight. Why is the experiment **INVALID**?",
          options: ["Two variables (fertilizer AND sunlight) changed at once — confounding the cause!", "Group B had no fertilizer", "Plants don't need sunlight", "Experiments must never have two groups"],
          answer: "Two variables (fertilizer AND sunlight) changed at once — confounding the cause!",
          hint: "If Group A grows taller, was it the fertilizer or the extra sunlight?",
          whyEasy: "A controlled experiment must isolate ONE independent variable while holding sunlight constant!"
        },
        {
          type: "mc",
          prompt: "An experiment records plant growth at `pH 5, 6, 7, 8`. Estimating growth at `pH 6.5` (between measured points) is called _____, while predicting growth at `pH 11` (outside the range) is _____:",
          options: ["Interpolation; Extrapolation", "Extrapolation; Interpolation", "Control; Hypothesis", "Correlation; Causation"],
          answer: "Interpolation; Extrapolation",
          hint: "`Inter-` = between/inside; `Extra-` = outside/beyond!",
          whyEasy: "Interpolating inside known bounds (`6.5`) is safer than extrapolating beyond data (`11`)!"
        },
        {
          type: "mc",
          prompt: "On an enzyme reaction-rate vs. substrate-concentration graph, the curve rises steeply at first and then becomes **completely flat (horizontal)**. What does the flat plateau mean?",
          options: ["Reaction rate has reached its maximum ceiling (all enzyme active sites are saturated!)", "The reaction stopped completely (`rate = 0`)", "Substrate disappeared", "Rate is still accelerating rapidly"],
          answer: "Reaction rate has reached its maximum ceiling (all enzyme active sites are saturated!)",
          hint: "Remember: the Y-axis is **RATE** (a positive constant value, NOT zero!).",
          whyEasy: "A horizontal line on a Rate graph means steady maximum speed (`V_max`), NOT zero reaction!"
        }
      ]
    },

    // 216: Number, Letter & Alphanumeric Series Patterns
    {
      id: "exam-number-letter-series-patterns",
      worldId: "exam_mastery",
      order: 216,
      title: "Number, Letter & Alphanumeric Series (CSE/ACET/NMAT)",
      icon: "🔢",
      tagline: "Check 1st differences → 2nd differences → ratios → alternating odd/even tracks → EJOTY (5-10-15-20-25) letter ranks!",
      scaryVersion: "Inductive numerical progression, second-order finite differences, interleaved subsequences, and modular alphabetic ciphers.",
      easyTruth: "Number and letter series appear in **CSE**, **NMAT Inductive Reasoning**, **ACET**, **USTET**, and **PMAEE** — and panicking wastes 3 minutes! Instead, run a **4-step radar scan** in 15 seconds: (1) Subtract consecutive terms (`1st difference`); (2) If uneven, subtract the differences (`2nd difference` — e.g. `+2, +4, +6, +8`); (3) If numbers jump up AND down wildly, split into **TWO interleaved alternating series** (odd positions vs even positions!); (4) For letters, memorize **EJOTY = 5, 10, 15, 20, 25** so you convert letters to numbers instantly!",
      microSteps: [
        { label: "Step 1: The 4-Check Number Series Radar", text: "**Check 1 — Constant Diff/Ratio**: `+d` or `×r` (e.g. `3, 6, 12, 24`). **Check 2 — Growing Differences (`2nd diff`)**: e.g., `2, 5, 10, 17, 26` → diffs are `+3, +5, +7, +9` → next `+11 = 37`! **Check 3 — Squares/Cubes ± Offset**: recognize `n²` (`1,4,9,16,25,36,49,64`) and `n³` (`1,8,27,64,125`) shifted by `±1`! **Check 4 — Multiply + Shift**: e.g., `×2 + 1` (`3 → 7 → 15 → 31 → 63`)!" },
        { label: "Step 2: Alternating (Interleaved) Twin Sequences", text: "Whenever a sequence zigzags (goes up, then down, then up — like `4, 20, 7, 17, 10, 14, ?`), NEVER compare neighbors! Circle positions `1, 3, 5, 7` (`4 → 7 → 10 → 13`, `+3`!) and underline positions `2, 4, 6` (`20 → 17 → 14`, `−3`!). Instant answer in 5 seconds!" },
        { label: "Step 3: Letter Series & EJOTY Speed Anchors", text: "Anchor every 5th letter: **`E=5, J=10, O=15, T=20, Y=25`**! Never recite `A-B-C...` from `A`! Also spot **Mirror Pairs** (`A↔Z, B↔Y, C↔X, M↔N` where ranks sum to `27`!) and **Multi-Letter Clusters** (`AZ, CX, EV, GT, ?` → track 1st letters `+2` and 2nd letters `−2` separately!)." }
      ],
      cheatCode: "1st Diff → 2nd Diff → Ratios/Squares → Zigzag = Split Odd/Even Twin Series! Letters: EJOTY = 5, 10, 15, 20, 25 & Mirror Pairs sum to 27 (A+Z=27)!",
      visualizerId: "numberPatternSieve",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Find the next number in the series: `3, 7, 13, 21, 31, ___`",
          options: ["43", "41", "45", "39"],
          answer: "43",
          hint: "Look at the jumps between consecutive terms: `+4, +6, +8, +10, ...`!",
          whyEasy: "Second-order difference is `+2`! Next jump is `+12`, so `31 + 12 = 43`!"
        },
        {
          type: "mc",
          prompt: "Find the next term in this alternating series: `5, 24, 9, 20, 13, 16, ___`",
          options: ["17", "12", "19", "14"],
          answer: "17",
          hint: "It zigzags! Split odd positions (`5, 9, 13, ?`) from even positions (`24, 20, 16`).",
          whyEasy: "The 7th term belongs to the odd track (`+4` each time): `13 + 4 = 17`!"
        },
        {
          type: "mc",
          prompt: "What comes next in the letter series: `B, E, H, K, N, ___`?",
          options: ["Q", "P", "R", "O"],
          answer: "Q",
          hint: "Convert to ranks: `B=2, E=5, H=8, K=11, N=14` (`+3` every step)!",
          whyEasy: "`14 + 3 = 17` (`O=15 → P=16 → Q=17`)!"
        },
        {
          type: "mc",
          prompt: "Find the next term: `2, 5, 11, 23, 47, ___`",
          options: ["95", "94", "71", "89"],
          answer: "95",
          hint: "Notice each term is slightly more than DOUBLE the previous term (`×2 + 1`)!",
          whyEasy: "`47 × 2 + 1 = 95`! (Differences also double: `+3, +6, +12, +24, +48`!)"
        },
        {
          type: "mc",
          prompt: "Find the next letter pair: `AZ, CX, EV, GT, ___`",
          options: ["IR", "HS", "JQ", "IQ"],
          answer: "IR",
          hint: "Track the 1st letter (`A, C, E, G → +2`) and 2nd letter (`Z, X, V, T → −2`) independently!",
          whyEasy: "`G(+2) = I` and `T(−2) = R` → `IR` (also a mirror pair: `9 + 18 = 27`!)."
        }
      ]
    },

    // 217: Exam Word Problems — Work, Age, Mixture & Motion
    {
      id: "exam-word-problems-work-mixture-motion",
      worldId: "exam_mastery",
      order: 217,
      title: "Exam Word Problems: Work, Age, Mixture & Motion",
      icon: "⏱️",
      tagline: "Work adds RATES (1/A + 1/B = 1/T), Mixtures balance C₁V₁ + C₂V₂, Motion adds/subtracts relative speeds, Age shifts BOTH people equally!",
      scaryVersion: "Applied linear algebraic modeling for combined rates, solute concentration conservation, and relative kinematics.",
      easyTruth: "Four classic word-problem archetypes make up over half of **CSE Numerical**, **ACET Math**, **DOST**, and **UPCAT** story problems — and every single one has a 10-second plug-and-play blueprint! Never average times on Work problems (if Ana takes `6h` and Ben takes `3h`, together they finish in `2h` — FASTER than either alone!). Never mix up successive discounts (`20%` then `10%` off is `28%`, NOT `30%`!).",
      microSteps: [
        { label: "Step 1: Combined Work Rate (`AB ÷ (A + B)`)", text: "If Machine A finishes a job in `A` hours and Machine B in `B` hours, add **RATES**: `1/A + 1/B = 1/T`, which simplifies instantly for 2 workers to **`T = (A × B) ÷ (A + B)`**! Drain pipe leaking out? **SUBTRACT** its rate: `1/A − 1/B = 1/T`! Quick sanity check: working together MUST take LESS time than the fastest worker alone!" },
        { label: "Step 2: Concentration Mixtures & Successive Discounts", text: "**Mixture Law**: `(Conc₁ × Vol₁) + (Conc₂ × Vol₂) = Conc_final × (Vol₁ + Vol₂)`. Pure water = `0%` salt/acid; Pure alcohol = `100%`! **Successive Discounts** (`d₁%` then `d₂%`): multiply remaining fractions! Example: `20%` off then `10%` off pays `0.80 × 0.90 = 0.72` → **`28%` total discount** (shortcut: `d₁ + d₂ − (d₁·d₂)/100`!)." },
        { label: "Step 3: Relative Motion & Age Timelines", text: "**Opposite directions** (toward or away): **ADD** speeds (`v_rel = v₁ + v₂`)! **Same direction** (chasing/overtaking): **SUBTRACT** speeds (`v_rel = |v₁ − v₂|`)! **Boat in river**: Downstream = `b + c`, Upstream = `b − c`! **Age Problems**: Age DIFFERENCE stays constant forever; in `t` years, add `+t` to **EVERY** person's age before setting ratios!" }
      ],
      cheatCode: "2-Worker Time = (A×B)/(A+B)! Mixture: C₁V₁ + C₂V₂ = C_f(V₁+V₂)! Opposite motion = v₁+v₂; Chase = |v₁−v₂|! Successive discounts: multiply (1−d₁)(1−d₂)!",
      visualizerId: "examMechPerceptualLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Pipe A fills a tank in `6 hours`, and Pipe B fills the same tank in `3 hours`. Working together, how many hours to fill the tank?",
          options: ["2 hours", "4.5 hours", "9 hours", "1.5 hours"],
          answer: "2 hours",
          hint: "Use the 2-worker shortcut `T = (A × B) ÷ (A + B)` — NEVER average 6 and 3!",
          whyEasy: "`(6 × 3) ÷ (6 + 3) = 18 ÷ 9 = 2 hours`! (Faster than Pipe B's 3 hours alone!)"
        },
        {
          type: "mc",
          prompt: "You mix `10 L` of a `20%` salt solution with `10 L` of a `50%` salt solution. What is the concentration of the resulting `20 L` mixture?",
          options: ["35%", "70%", "30%", "40%"],
          answer: "35%",
          hint: "Total salt = `0.20(10) + 0.50(10) = 2 + 5 = 7 L` out of `20 L` total!",
          whyEasy: "`7 ÷ 20 = 35%` (and since volumes are equal `10 L` each, it's cleanly the exact midpoint of 20% and 50%!)."
        },
        {
          type: "mc",
          prompt: "Two buses start `300 km` apart and drive **toward each other** at `60 km/h` and `90 km/h`. In how many hours will they meet?",
          options: ["2 hours", "5 hours", "10 hours", "3 hours"],
          answer: "2 hours",
          hint: "Moving toward each other closes the gap at their **SUM** speed `60 + 90`!",
          whyEasy: "Combined closing speed = `150 km/h` → `300 ÷ 150 = 2 hours`!"
        },
        {
          type: "mc",
          prompt: "A jacket gets a `20%` store sale discount, and then an EXTRA `10%` member discount on the sale price. What is the **single equivalent discount**?",
          options: ["28%", "30%", "25%", "32%"],
          answer: "28%",
          hint: "Multiply the remaining fractions: `0.80 × 0.90 = 0.72` paid!",
          whyEasy: "Paying `72%` means you saved `100% − 72% = 28%` (NEVER just add `20 + 10 = 30%`!)."
        },
        {
          type: "mc",
          prompt: "Maya is `3` times as old as Leo. In `6` years, Maya will be `2` times as old as Leo. How old is **Leo NOW**?",
          options: ["6 years old", "12 years old", "18 years old", "9 years old"],
          answer: "6 years old",
          hint: "Let Leo = `x`, Maya = `3x`. In 6 years: `3x + 6 = 2(x + 6)`!",
          whyEasy: "`3x + 6 = 2x + 12 → x = 6`! Check: now `18 & 6` (3×); in 6 yrs `24 & 12` (2×)!"
        }
      ]
    },

    // 218: Paragraph Organization, Error Recognition & Reading Tactics
    {
      id: "exam-paragraph-org-error-spotting",
      worldId: "exam_mastery",
      order: 218,
      title: "Paragraph Organization, Error Spotting & Reading (UPCAT/CSE)",
      icon: "📝",
      tagline: "Find the standalone Topic Sentence first, link pronoun chains ('This/However/Finally'), and crush SVA traps (neither...nor, the number of, dangling modifiers)!",
      scaryVersion: "Discourse cohesion sequencing, prescriptive syntax diagnostics, and timed inferential reading comprehension.",
      easyTruth: "**UPCAT**, **ACET**, **CSE**, and **PMAEE** love two verbal puzzles that sink unprepared examinees: **Paragraph Organization** (unscrambling 4–5 jumbled sentences) and **Error Identification** (spotting the exact broken grammar piece). Don't read all permutations! For Paragraph Org, lock Sentence #1 first (a broad standalone statement with NO orphan pronouns like *He, It, This, However, Therefore*), then chain matching noun→pronoun bridges! For Error Spotting, run the **Big-5 Grammar Checklist**: Subject-Verb Agreement, Pronoun Case/Agreement, Parallelism, Dangling Modifiers, and Tense Consistency!",
      microSteps: [
        { label: "Step 1: 10-Second Paragraph Organization Algorithm", text: "(1) **Spot the Opener**: NEVER starts with `However`, `Therefore`, `Also`, `For example`, `This`, or an unintroduced `He/She/They`! (2) **Lock Mandatory Pairs**: Pair a noun (`Dr. Rizal`) right before its pronoun (`He`), or `First...` before `Next...`, or Cause before `Consequently...`! (3) **Spot the Closer**: Summary markers (`In conclusion`, `Ultimately`, `Thus`) go LAST! Eliminate options immediately once your opener + 1 mandatory pair match!" },
        { label: "Step 2: Top 5 Exam Grammar Error Traps", text: "**(1) SVA Intervening Phrases**: Ignore `along with`, `as well as`, `together with` — *'The coach, along with the players, **is** ready.'* **(2) Either/Or & Neither/Nor**: Match the **CLOSER** subject! **(3) `The number of` = SINGULAR (`is`); `A number of` = PLURAL (`are`)!** **(4) Dangling Modifier**: *'Walking down the street, the trees looked tall'* (WRONG — trees aren't walking! Put the human right after the comma!). **(5) Parallelism**: *'likes swimming, biking, and **running**'* (NOT `to run`!)." },
        { label: "Step 3: Timed Reading Comprehension Strategy", text: "On long passages, **read the questions FIRST** (or skim Topic Sentence + Final Sentence of each paragraph) before deep reading! **Main Idea** must cover the WHOLE passage (reject choices that are *too narrow* [one detail] or *too broad* [extreme words like *always/never/all*]). For **Author's Tone**, watch adjective clues (objective/analytical vs. ironic/critical vs. optimistic)!" }
      ],
      cheatCode: "Paragraph Org = Standalone Opener + Pronoun/Transition Pairs! SVA: ignore 'as well as'; 'Neither/Nor' matches CLOSER subject; 'The number of' = IS, 'A number of' = ARE! Modifier must touch who does the action!",
      visualizerId: "grammarWritingLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Choose the grammatically CORRECT sentence: `'___ of applicants for the DOST scholarship ___ rising every year.'`",
          options: ["The number ... is", "The number ... are", "A number ... is", "Neither ... are"],
          answer: "The number ... is",
          hint: "`The number of` refers to ONE mathematical figure (singular); `A number of` means 'several' (plural)!",
          whyEasy: "`The number of applicants IS rising` (singular count); compare `A number of students ARE studying` (plural)!"
        },
        {
          type: "mc",
          prompt: "Choose the correct verb: `'Neither the principal nor the teachers ___ informed about the sudden schedule change.'`",
          options: ["were", "was", "is", "has been"],
          answer: "were",
          hint: "With `neither ... nor` / `either ... or`, match the subject **CLOSEST** to the verb!",
          whyEasy: "`teachers` (plural) is right next to the verb → use plural **`were`**!"
        },
        {
          type: "mc",
          prompt: "Order these 4 sentences into a coherent paragraph:\n(1) Consequently, coastal cities built higher seawalls.\n(2) Rising global temperatures accelerate polar ice melt.\n(3) Ultimately, reducing emissions remains the only lasting fix.\n(4) This melt pushes sea levels steadily upward.",
          options: ["2 – 4 – 1 – 3", "1 – 2 – 4 – 3", "4 – 2 – 1 – 3", "2 – 1 – 4 – 3"],
          answer: "2 – 4 – 1 – 3",
          hint: "Find the standalone opener (`2`), chain `'ice melt'` → `'This melt'` (`4`), then `'Consequently'` (`1`), and close with `'Ultimately'` (`3`)!",
          whyEasy: "Lexical chain: `ice melt (2) → This melt (4) → Consequently (1) → Ultimately (3)`!"
        },
        {
          type: "mc",
          prompt: "Identify the error in: `'Driving through the mountain pass, the breathtaking sunset amazed Maya and I.'` (Wait — spot the **dangling modifier** vs **pronoun** trap: which sentence fixes BOTH?)",
          options: ["Driving through the mountain pass, Maya and I were amazed by the breathtaking sunset.", "Driving through the mountain pass, the sunset amazed Maya and me.", "Driving through the mountain pass, the sunset was amazing.", "Maya and me drove through the mountain pass."],
          answer: "Driving through the mountain pass, Maya and I were amazed by the breathtaking sunset.",
          hint: "Who was driving? The sunset wasn't driving — **Maya and I** were! Put the driver right after the comma!",
          whyEasy: "Placing `Maya and I` right after the participial phrase eliminates the dangling modifier cleanly!"
        },
        {
          type: "mc",
          prompt: "Which sentence maintains proper **parallel structure**?",
          options: ["The scholar values discipline, curiosity, and perseverance.", "The scholar values discipline, being curious, and to persevere.", "The scholar values being disciplined, curiosity, and perseveres.", "The scholar values to be disciplined, curiosity, and perseverance."],
          answer: "The scholar values discipline, curiosity, and perseverance.",
          hint: "Every item in a list must wear the exact same grammatical shape (all nouns, all gerunds, or all infinitives)!",
          whyEasy: "`discipline` (noun), `curiosity` (noun), `perseverance` (noun) — crisp 3-part parallelism!"
        }
      ]
    },

    // 219: NMAT Perceptual Acuity (Hidden Figures, Mirrors & Proofreading)
    {
      id: "exam-nmat-perceptual-acuity",
      worldId: "exam_mastery",
      order: 219,
      title: "Perceptual Acuity: Hidden Figures, Mirrors & Proofreading (NMAT)",
      icon: "👁️",
      tagline: "NMAT's #1 speed booster: Mirror flips Left↔Right ONLY (keep Top/Bottom!), Hidden Figures preserve exact size & angle, Proofread backwards by chunks!",
      scaryVersion: "Embedded-figure visual discrimination, axial reflection parity, and high-speed clerical-orthographic verification.",
      easyTruth: "**Perceptual Acuity** is NMAT Part I's secret goldmine — 30 fast items that can skyrocket your Percentile Rank because it needs ZERO formulas, only laser-sharp visual algorithms! It has 3 fixed sections: **(1) Hidden Figures** (the target shape inside the maze keeps its EXACT size and orientation — never rotated or resized!), **(2) Mirror Images** (a vertical mirror swaps **Left ↔ Right** while keeping **Top and Bottom** identical!), and **(3) Identical Information** (compare line-by-line right-to-left or chunk-by-chunk for 1-character swaps like `ei/ie`, `rn/m`, commas, or ZIP digits!).",
      microSteps: [
        { label: "Step 1: Mirror Image Rules (Left ↔ Right Flip Only!)", text: "Across a **vertical mirror**, what was **closest** to the mirror stays **closest** to the mirror on the other side! Asymmetric letters flip horizontally (`b ↔ d`, `p ↔ q`, `R` faces left, `3` faces right!), while vertically symmetric letters (`A, H, I, M, O, T, U, V, W, X, Y`) look UNCHANGED! **Trap**: Rotating a shape `180°` turns it upside down — a vertical mirror NEVER flips Top↔Bottom!" },
        { label: "Step 2: Hidden Figures Anchor-Vertex Method", text: "In NMAT Hidden Figures, the target figure is embedded at the **EXACT SAME size and exact same orientation** (NO scaling, NO rotating!). Don't stare at the whole maze — lock onto the target's most **unique corner or diagonal angle** (e.g., a sharp `45°` triangle tip or horizontal base bar), scan choices for that exact anchor first, and trace the remaining edges!" },
        { label: "Step 3: Identical Information Speed-Proofreading", text: "When checking 4 dense name/address/code strings against a reference: **Scan in reverse / check the LAST 4 digits & punctuation FIRST** (exam writers hide ~65% of errors in the middle-to-end: swapped digits `4892 → 4982`, `St.` vs `St,`, double letters `ll` vs `l`, or `O` vs `0`!). Compare all 4 choices **vertically column-by-column** — the odd character pops out instantly!" }
      ],
      cheatCode: "Vertical Mirror = Left↔Right flip (Top/Bottom UNCHANGED; A,H,I,M,O,T,U,V,W,X,Y stay identical!). Hidden Figure = EXACT size & orientation! Proofread: scan columns vertically & check digits/punctuation first!",
      visualizerId: "examMechPerceptualLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          visualSvg: svgMirrorPuzzle("Vertical Mirror Image?", `<path d="M18,10 L18,62 L58,62 M18,10 L46,10" fill="none" stroke="#78b4f5" stroke-width="5" stroke-linecap="round"/><circle cx="52" cy="24" r="7" fill="#eab349"/>`),
          prompt: "In the vertical mirror diagram above, the original figure has a **vertical bar on the LEFT**, a **yellow dot at TOP-RIGHT**, and a **long foot pointing RIGHT**. Where do those appear in its **vertical mirror image**?",
          options: ["Vertical bar on the RIGHT, yellow dot at TOP-LEFT, long foot pointing LEFT", "Vertical bar on the RIGHT, yellow dot at BOTTOM-LEFT, long foot pointing LEFT", "Vertical bar on the LEFT, yellow dot at BOTTOM-RIGHT, long foot pointing RIGHT", "Unchanged on both sides"],
          answer: "Vertical bar on the RIGHT, yellow dot at TOP-LEFT, long foot pointing LEFT",
          hint: "A vertical mirror swaps Left ↔ Right ONLY — Top stays Top and Bottom stays Bottom!",
          whyEasy: "Dot moves Top-Right → Top-Left; bar moves Left → Right; foot flips Right → Left!"
        },
        {
          type: "mc",
          prompt: "Which capital English word looks **100% IDENTICAL** when reflected across a **vertical mirror** (spelling & every letter unchanged)?",
          options: ["MOM", "BOB", "DAD", "POP"],
          answer: "MOM",
          hint: "Both the word order must be a palindrome AND every letter must be vertically symmetric (`A,H,I,M,O,T,U,V,W,X,Y`)!",
          whyEasy: "`M` and `O` are vertically symmetric and `MOM` reads identically backwards — `B, D, P` all flip backwards!"
        },
        {
          type: "mc",
          prompt: "Identical Information — Which option matches the reference **EXACTLY**?\nReference: `Dr. Ma. Socorro V. Villanueva, 1489 Taft Ave., Malate 1004`",
          options: [
            "Dr. Ma. Socorro V. Villanueva, 1489 Taft Ave., Malate 1004",
            "Dr. Ma. Soccoro V. Villanueva, 1489 Taft Ave., Malate 1004",
            "Dr. Ma. Socorro V. Villanueva, 1498 Taft Ave., Malate 1004",
            "Dr. Ma. Socorro V. Villanueva, 1489 Taft Ave, Malate 1004"
          ],
          answer: "Dr. Ma. Socorro V. Villanueva, 1489 Taft Ave., Malate 1004",
          hint: "Watch double letters (`Socorro`), transposed digits (`1489` vs `1498`), and missing period (`Ave.` vs `Ave`)!",
          whyEasy: "Choice B misspelled `Soccoro`, C swapped `89→98`, D dropped the period after `Ave`!"
        },
        {
          type: "mc",
          prompt: "In NMAT **Hidden Figures**, you search for a target polygon inside 4 complex line-art figures. Which transformation is **NOT allowed** (meaning it's a trap distractor)?",
          options: ["Rotating or shrinking/enlarging the target shape", "Overlapping extra crossing lines through the shape", "Placing the exact shape near a corner of the box", "Sharing edges with larger triangles"],
          answer: "Rotating or shrinking/enlarging the target shape",
          hint: "True embedded figures preserve exact proportions AND exact angle orientation!",
          whyEasy: "NMAT hidden figures keep the EXACT same size and orientation — rotated lookalikes are classic distractors!"
        },
        {
          type: "mc",
          prompt: "An analog clock with NO numbers reads **`3:15`** in real life. What time does it appear to show in a flat **vertical wall mirror**?",
          options: ["8:45", "9:15", "3:45", "9:45"],
          answer: "8:45",
          hint: "Mirror clock shortcut: subtract the real time from **`11:60`** (i.e. `12:00`)!",
          whyEasy: "`11:60 − 3:15 = 8:45`! (The minute hand at 3 flips to 9 [`45`], and the hour hand just past 3 flips just before 9 [`8:45`]!)"
        }
      ]
    },

    // 220: NMAT Social Science — Psychology, Sociology & Anthropology
    {
      id: "exam-nmat-social-science-psych-soc",
      worldId: "exam_mastery",
      order: 220,
      title: "Social Science: Psychology, Sociology & Anthropology (NMAT)",
      icon: "🧠",
      tagline: "Freud (Id/Ego/Superego), Piaget/Erikson/Maslow, Negative Reinforcement ≠ Punishment, Durkheim/Marx/Weber & Cultural Relativism!",
      scaryVersion: "Foundational behavioral psychology, developmental stage theories, macrosociological paradigms, and cultural anthropology.",
      easyTruth: "**NMAT Part II Social Science** (30 full items — 25% of Part II!) blindsides STEM/Biology majors who never studied Psychology or Sociology! Master the **Core 4 Pillars**: (1) **Behaviorism**: Pavlov = Classical Conditioning (associating 2 stimuli, like bell + food); Skinner = Operant Conditioning (consequences — **Reinforcement ALWAYS INCREASES behavior**, **Punishment ALWAYS DECREASES behavior**; Positive = add something, Negative = remove something!). (2) **Development**: Freud (Id/Ego/Superego), Piaget (Sensorimotor → Preoperational → Concrete → Formal), Erikson (8 identity crises), Maslow (Physiological → Self-Actualization). (3) **Sociology Big 3**: Durkheim (Functionalism & Anomie), Marx (Conflict Theory), Mead (Symbolic Interactionism), Weber (Bureaucracy). (4) **Anthropology**: Ethnocentrism vs Cultural Relativism, Folkways vs Mores vs Taboos!",
      microSteps: [
        { label: "Step 1: Conditioning & Defense Mechanisms (Psychology)", text: "**Classical (Pavlov)**: Neutral bell + food → bell alone triggers salivation! **Operant (Skinner)**: *Positive Reinforcement* = ADD reward (bonus points → study more). *Negative Reinforcement* = REMOVE annoyance (buckling seatbelt stops loud beep → buckle more! **NOT punishment!**). *Punishment* = DECREASES behavior! **Freud**: **Id** (pleasure principle), **Ego** (reality mediator), **Superego** (moral conscience). Defense mechanisms: **Projection** (blaming your own flaw on others), **Displacement** (mad at boss → yell at dog), **Sublimation** (channeling rage into boxing/art — healthiest!)." },
        { label: "Step 2: Developmental Stages (Piaget, Erikson, Maslow)", text: "**Piaget**: (1) *Sensorimotor* (0–2: **Object Permanence**!), (2) *Preoperational* (2–7: **Egocentrism**, lacks conservation), (3) *Concrete Operational* (7–11: **Conservation** of volume/mass), (4) *Formal Operational* (12+: abstract hypothetical logic!). **Erikson**: Infancy (*Trust vs Mistrust*), Adolescence (*Identity vs Role Confusion*), Young Adult (*Intimacy vs Isolation*). **Maslow Pyramid** (bottom up): Physiological → Safety → Love/Belonging → Esteem → **Self-Actualization**!" },
        { label: "Step 3: Sociology & Cultural Anthropology", text: "**Functionalism (Durkheim)**: Society = interconnected organs; normlessness = **Anomie**. **Conflict Theory (Marx)**: Inequality & class power struggle (Bourgeoisie vs Proletariat). **Symbolic Interactionism (Mead/Cooley)**: Micro everyday symbols & *Looking-Glass Self*. **Culture**: **Ethnocentrism** = judging other cultures as inferior by your own standard; **Cultural Relativism** = understanding a culture in its own context! **Norms**: *Folkways* (casual etiquette), *Mores* (strong moral rules), *Taboos* (strictly forbidden, e.g., incest)!" }
      ],
      cheatCode: "Reinforcement = INCREASES behavior (Negative Reinf = REMOVE annoyance, NOT punishment!). Piaget: Sensorimotor (Object Perm) → Preop (Egocentrism) → Concrete (Conservation) → Formal! Functionalism=Durkheim, Conflict=Marx, Interactionism=Mead!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "A car plays an annoying loud beep until you fasten your seatbelt; fastening it **removes** the beep, so you buckle up faster every day. In Skinner's Operant Conditioning, this is:",
          options: ["Negative Reinforcement", "Positive Punishment", "Classical Extinction", "Negative Punishment"],
          answer: "Negative Reinforcement",
          hint: "Did buckling behavior INCREASE (Reinforcement) or DECREASE (Punishment)? Was a stimulus ADDED (+) or REMOVED (−)?",
          whyEasy: "Behavior INCREASED (Reinforcement) by REMOVING an unpleasant beep (Negative) → Negative Reinforcement!"
        },
        {
          type: "mc",
          prompt: "A 5-year-old watches water poured from a wide short glass into a tall narrow glass and insists the tall glass now has MORE water. In **Piaget's theory**, the child is in which stage?",
          options: ["Preoperational stage (lacks conservation)", "Concrete Operational stage", "Formal Operational stage", "Sensorimotor stage"],
          answer: "Preoperational stage (lacks conservation)",
          hint: "Mastering conservation of liquid/mass happens around age 7–11 (Concrete Operational).",
          whyEasy: "Preoperational children (ages 2–7) focus on height alone and haven't mastered Conservation yet!"
        },
        {
          type: "mc",
          prompt: "After being scolded unfairly by her boss, Carla comes home and snaps angrily at her little brother instead. Which **Freudian defense mechanism** is this?",
          options: ["Displacement", "Sublimation", "Regression", "Reaction Formation"],
          answer: "Displacement",
          hint: "Redirecting emotion from a dangerous/powerful target onto a safer substitute target!",
          whyEasy: "Displacement shifts hostility onto a less threatening target; Sublimation channels impulses constructively!"
        },
        {
          type: "mc",
          prompt: "Which sociological paradigm (associated with **Karl Marx**) views society as an arena of inequality where dominant groups maintain power over scarce resources?",
          options: ["Conflict Theory", "Structural Functionalism", "Symbolic Interactionism", "Cultural Relativism"],
          answer: "Conflict Theory",
          hint: "Functionalism = Durkheim (stability); Interactionism = Mead (everyday symbols); Power/Class struggle = Marx!",
          whyEasy: "Conflict Theory analyzes competition and power imbalances between social classes!"
        },
        {
          type: "mc",
          prompt: "An anthropologist suspends personal judgment to understand an unfamiliar community's rituals within that community's own history and values. This practice is called:",
          options: ["Cultural Relativism", "Ethnocentrism", "Xenocentrism", "Anomie"],
          answer: "Cultural Relativism",
          hint: "Opposite of **Ethnocentrism** (judging others as inferior using your own culture as the yardstick)!",
          whyEasy: "Cultural Relativism evaluates beliefs within their native cultural context rather than outside bias!"
        }
      ]
    },

    // 221: CSE General Info — RA 6713, Human Rights & PH Environmental Laws
    {
      id: "exam-cse-ra6713-civics-env-laws",
      worldId: "exam_mastery",
      order: 221,
      title: "CSE Gen Info: RA 6713, Human Rights & PH Environmental Laws",
      icon: "⚖️",
      tagline: "RA 6713 = 8 Norms + 15-working-day action + April 30 SALN! Plus RA 9003 Solid Waste, RA 8749 Clean Air, RA 9275 Clean Water & UDHR!",
      scaryVersion: "Philippine public administration ethics (Republic Act No. 6713), human rights instruments, and statutory environmental governance.",
      easyTruth: "**Civil Service Exam (Professional & Sub-Professional)** General Information is a guaranteed high-score section — because CSC pulls from the exact same 4 statutory pillars every year: **(1) 1987 Constitution**, **(2) RA 6713** (*Code of Conduct and Ethical Standards for Public Officials and Employees*), **(3) Peace & Human Rights**, and **(4) Environmental Management & Protection**! Memorize the numbers `15` working days, `30` days / `April 30` SALN, and the `9003 / 8749 / 9275 / 9729` environmental law IDs to sweep this subtest!",
      microSteps: [
        { label: "Step 1: RA 6713 — The 8 Norms of Conduct & Public Duties", text: "**RA 6713** mandates **8 Norms**: (1) Commitment to Public Interest, (2) Professionalism, (3) Justness & Sincerity, (4) **Political Neutrality** (serve ALL regardless of party!), (5) Responsiveness to the Public, (6) Nationalism & Patriotism, (7) Commitment to Democracy, (8) **Simple Living** (modest lifestyle proportionate to income!). **Hard Deadlines**: Act on public letters/requests within **`15 working days`**! Process documents within **`15 working days`** with **no more than 3 signatories**! Public officials CANNOT solicit/accept gifts connected to official duties!" },
        { label: "Step 2: SALN Deadlines & Divestment (RA 6713 Sec. 8–9)", text: "Every public official & employee must file a sworn **SALN** (*Statement of Assets, Liabilities, and Net Worth*): **(a)** within **`30 days`** after assumption of office, **(b)** on or before **`April 30`** of every year thereafter, and **(c)** within **`30 days`** after separation from service! When a **conflict of interest** arises, resign from any private business position within **`30 days`** and divest shareholdings within **`60 days`**!" },
        { label: "Step 3: Landmark PH Environmental Laws & Human Rights", text: "Memorize the Big 4 PH Green Laws: **RA 9003** = *Ecological Solid Waste Management Act* (3Rs, mandatory segregation, MRFs, bans open dumpsites!); **RA 8749** = *Philippine Clean Air Act* (bans incinerators, smoke-belching); **RA 9275** = *Philippine Clean Water Act*; **RA 9729** = *Climate Change Act*! **Human Rights**: **UDHR** (adopted Dec 10, 1948 — inherent, inalienable, universal rights); **CHR** (*Commission on Human Rights* — investigates civil & political rights violations under 1987 Art. XIII)!" }
      ],
      cheatCode: "RA 6713: 8 Norms, 15 working days reply, max 3 signatories! SALN = within 30d assumption, April 30 yearly, 30d separation! Green Laws: 9003=Solid Waste, 8749=Clean Air, 9275=Clean Water, 9729=Climate!",
      visualizerId: "phHistoryCivicsLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Under **RA 6713** (*Code of Conduct and Ethical Standards for Public Officials*), within how many working days must a government agency respond to letters, telegrams, or requests from the public?",
          options: ["15 working days", "30 calendar days", "5 working days", "60 working days"],
          answer: "15 working days",
          hint: "Both replying to public requests and acting on papers follow the exact same RA 6713 working-day ceiling!",
          whyEasy: "Section 5(a) of RA 6713 requires prompt action and reply within **15 working days** from receipt!"
        },
        {
          type: "mc",
          prompt: "When must Philippine government officials and employees file their **annual** Statement of Assets, Liabilities, and Net Worth (**SALN**) under RA 6713?",
          options: ["On or before April 30 of every year", "On or before January 15 of every year", "On or before December 31 of every year", "Only once upon retirement"],
          answer: "On or before April 30 of every year",
          hint: "Right after the April 15 income tax deadline — end of April!",
          whyEasy: "SALN deadlines: within 30 days of assumption, **on or before April 30** annually, and within 30 days of separation!"
        },
        {
          type: "mc",
          prompt: "Which Philippine law mandates waste segregation at source, Materials Recovery Facilities (MRFs), and the closure of open dumpsites?",
          options: ["RA 9003 (Ecological Solid Waste Management Act)", "RA 8749 (Clean Air Act)", "RA 9275 (Clean Water Act)", "RA 6713 (Code of Conduct)"],
          answer: "RA 9003 (Ecological Solid Waste Management Act)",
          hint: "Solid Waste = `9003`; Clean Air = `8749`; Clean Water = `9275`!",
          whyEasy: "RA 9003 (2000) is the cornerstone PH law for ecological solid waste management and 3Rs!"
        },
        {
          type: "mc",
          prompt: "A civil servant gives equally courteous, timely service to every citizen regardless of which political candidate the citizen supports. Which **RA 6713 Norm of Conduct** is demonstrated?",
          options: ["Political Neutrality", "Simple Living", "Nationalism and Patriotism", "Divestment"],
          answer: "Political Neutrality",
          hint: "Serving everyone without partisan bias!",
          whyEasy: "Political Neutrality requires providing service to everyone without unfair discrimination regardless of party affiliation!"
        },
        {
          type: "mc",
          prompt: "Which landmark Philippine law is known as the **Philippine Clean Air Act of 1999** (regulating vehicle emissions and banning toxic waste incineration)?",
          options: ["RA 8749", "RA 9003", "RA 9275", "RA 9729"],
          answer: "RA 8749",
          hint: "Remember chronologically: 8749 (1999 Air) → 9003 (2000 Waste) → 9275 (2004 Water) → 9729 (2009 Climate)!",
          whyEasy: "RA 8749 = Clean Air Act; RA 9003 = Solid Waste; RA 9275 = Clean Water; RA 9729 = Climate Change!"
        }
      ]
    },

    // 222: Clerical Operations, Alphabetical Filing & Academic Vocabulary
    {
      id: "exam-cse-clerical-filing-vocabulary",
      worldId: "exam_mastery",
      order: 222,
      title: "Clerical Filing, Spelling & Exam Vocabulary Roots (CSE/ACET)",
      icon: "🗂️",
      tagline: "Filing: Last Name first, 'Nothing comes before Something', ignore leading 'The' & titles! Decode hard vocab fast using Greek/Latin roots!",
      scaryVersion: "Standardized ARMA alphabetical indexing rules, orthographic error detection, and morphological etymology.",
      easyTruth: "On the **CSE Sub-Professional** exam, **Clerical Ability** (Alphabetical Filing + Spelling) is an entire dedicated subtest — and tiny filing tie-breakers trip people up every single test! Master 4 ironclad rules: (1) Always index people as **Last Name → First Name → Middle Initial**; (2) **'Nothing comes before something'** (`Cruz` comes BEFORE `Cruzado`, `Santos, A.` BEFORE `Santos, Ana`); (3) Treat prefixes (`De La Cruz`, `MacDonald`, `San Juan`) as ONE unit (`delacruz`, `macdonald`, `sanjuan`); (4) Ignore leading `The` in company names (`The Manila Times` → filed under **`M`**!) and ignore titles (`Dr.`, `Atty.`, `Prof.`) unless names are 100% identical! Pair that with Greek/Latin root decoding (`bene-`, `mal-`, `omni-`, `chron-`) to crush **ACET/UPCAT/NMAT** vocabulary too!",
      microSteps: [
        { label: "Step 1: Personal Name Alphabetical Filing Rules", text: "Always invert personal names: **`Surname, First Name, Middle Name/Initial`**. Compare unit by unit, letter by letter! **Nothing-Before-Something**: `Reyes, J.` precedes `Reyes, Jose` (`blank` beats `o`); `Lim` precedes `Lima`. **Prefixes**: `De Castro`, `Del Rosario`, `San Miguel`, `McDonald` are indexed as **one solid unit** ignoring spaces (`decastro` before `delrosario`!). **Titles (`Dr.`, `Engr.`, `Sr.`)**: ignored completely unless all name units are identical!" },
        { label: "Step 2: Business Names, Leading 'The' & Numbers", text: "In organization names, **NEVER invert** (`Ayala Land Inc.` stays `Ayala | Land | Inc.`), **EXCEPT** move a leading **`The`** to the end (`The Philippine Star` → `Philippine Star (The)`, filed under **`P`**!). Ignore punctuation/apostrophes (`St. Luke's` → `Saint Lukes` or `St Lukes` per unit). Spelled-out numbers file alphabetically (`First` under `F`); Arabic numerals (`7-Eleven`, `24-Hour`) file in **ascending numerical order BEFORE `A`**!" },
        { label: "Step 3: Classic Spelling Traps & High-Yield Vocab Roots", text: "**Top CSE/USTET Spelling Demons**: `accommodate` (2 c's, 2 m's!), `occurrence` (2 c's, 2 r's!), `definitely` (contains `finite` — NO `a`!), `separate` (there's `a rat` in sep**arat**e!), `embarrass` (2 r's, 2 s's!), `bureaucracy`, `privilege` (NO `d`!), `supersede` (`-sede`!). **High-Yield Exam Roots**: `bene-/eu-` (good), `mal-/cac-` (bad), `loqu-/dic-` (speak: *eloquent, loquacious*), `ephemer-` (short-lived), `ubiquit-` (everywhere), `amb-/amphi-` (both), `pan-/omni-` (all), `a-/an-` (without: *apathy, anomaly*)!" }
      ],
      cheatCode: "Filing: Surname first, Nothing-Before-Something (Cruz < Cruzado), merge prefixes (De La = dela), move leading 'The' to end! Spelling: aCCoMModate, oCCuRRence, deFINITEly, sepARATe! Vocab: bene=good, mal=bad, loqu=speak!",
      visualizerId: "grammarWritingLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Using standard alphabetical filing rules, which personal name should be filed **FIRST**?\n(1) Dr. Juan Dela Cruz · (2) Ana De Castro · (3) Maria Del Rosario · (4) Jose De Guzman",
          options: ["Ana De Castro", "Jose De Guzman", "Maria Del Rosario", "Dr. Juan Dela Cruz"],
          answer: "Ana De Castro",
          hint: "Index surnames merging prefixes as one unit (`decastro`, `deguzman`, `delacruz`, `delrosario`) and ignore `Dr.`!",
          whyEasy: "`decastro` (`d-e-c`) beats `deguzman` (`d-e-g`), `delacruz` (`d-e-l-a`), and `delrosario` (`d-e-l-r`)!"
        },
        {
          type: "mc",
          prompt: "Applying the **'Nothing Comes Before Something'** filing rule, what is the correct alphabetical order?",
          options: ["Santos, A. → Santos, Ana → Santos, Analyn → Santoso, Bea", "Santos, Ana → Santos, A. → Santos, Analyn → Santoso, Bea", "Santoso, Bea → Santos, A. → Santos, Ana → Santos, Analyn", "Santos, Analyn → Santos, Ana → Santos, A. → Santoso, Bea"],
          answer: "Santos, A. → Santos, Ana → Santos, Analyn → Santoso, Bea",
          hint: "Shorter exact prefix ALWAYS files BEFORE a longer continuation!",
          whyEasy: "`Santos` < `Santoso`, and within `Santos`, `A.` < `Ana` < `Analyn`!"
        },
        {
          type: "mc",
          prompt: "Under which letter should the business **`The Quezon City Bakery`** be filed in standard clerical indexing?",
          options: ["Q (`Quezon City Bakery, The`)", "T (`The Quezon City Bakery`)", "B (`Bakery, The Quezon City`)", "C (`City Bakery, Quezon`)"],
          answer: "Q (`Quezon City Bakery, The`)",
          hint: "Leading article `The` is ALWAYS moved to the end and ignored as the first filing unit!",
          whyEasy: "Companies are indexed as written EXCEPT moving a leading `The` to the back → filed under **Q**!"
        },
        {
          type: "mc",
          prompt: "Which group contains **ALL CORRECTLY SPELLED** words (zero spelling errors)?",
          options: ["accommodate, definitely, occurrence, separate", "acommodate, definately, occurence, seperate", "accommodate, definately, occurrence, separate", "accomodate, definitely, occurence, separate"],
          answer: "accommodate, definitely, occurrence, separate",
          hint: "Check `2 c's + 2 m's`, `de-FINITE-ly`, `2 c's + 2 r's`, and `sep-A-RAT-e`!",
          whyEasy: "All four classic spelling traps are spelled flawlessly in Choice 1!"
        },
        {
          type: "mc",
          prompt: "Using Latin/Greek roots, what does the academic exam word **LOQUACIOUS** (root `loqu-`, like *eloquent / soliloquy*) mean?",
          options: ["Very talkative / chatty", "Silent and shy", "Short-lived / fleeting", "Harmful / malicious"],
          answer: "Very talkative / chatty",
          hint: "`loqu-` = speak; `ephemeral` = short-lived; `malevolent` = harmful; `taciturn` = silent!",
          whyEasy: "`loqu-` means 'to speak' → `loquacious` means fond of talking (antonym: `taciturn` / `laconic`)!"
        }
      ]
    }
  ];

  DATA.NODES.push(...NEW_EXAM_MASTERY_NODES);

  // ==================== +8 CLASSIC EXAM TRAPS (TOTAL: 67 -> 75) ====================
  DATA.GRADE12_TRAPS.push(
    {
      id: "trap-fixed-pulley-ma",
      title: "DOST Mechanical Trap: A Single Fixed Pulley Does NOT Cut Weight in Half!",
      trapExpression: "1 Fixed Pulley + 100 N load ⇒ Effort = 100 N (MA = 1, NOT 50 N!)",
      wrongGuess: "Assuming ANY pulley automatically gives Mechanical Advantage = 2",
      rightAnswer: "A single FIXED pulley only changes pull direction (`MA = 1`). Only MOVABLE pulleys add supporting rope strands (`MA = 2, 3, 4...`)!",
      whyItHappens: "Students see two sides of a rope hanging off a ceiling wheel and wrongly count the downward pull strand as lifting the load.",
      quickRule: "Count ONLY rope segments pulling UPWARD on the movable load! Ignore a downward pull strand on a fixed pulley!",
      quiz: {
        prompt: "Using a single frictionless **FIXED** ceiling pulley, what downward force is needed to lift an `80 N` bucket at steady speed?",
        options: ["80 N (`MA = 1`)", "40 N (`MA = 2`)", "20 N (`MA = 4`)", "160 N (`MA = 0.5`)"],
        answer: "80 N (`MA = 1`)",
        explanation: "A single fixed pulley only redirects force downward (letting gravity help your body weight) — its ideal Mechanical Advantage is exactly 1!"
      }
    },
    {
      id: "trap-gear-speed-direction",
      title: "DOST Gear Trap: The SMALLER Meshing Gear Spins FASTER (and OPPOSITE)!",
      trapExpression: "30-tooth Gear (10 RPM CW) meshes with 10-tooth Gear ⇒ 30 RPM CCW!",
      wrongGuess: "Thinking the bigger gear spins faster or both meshing gears spin clockwise",
      rightAnswer: "Directly meshing teeth ALWAYS flip rotation direction, and fewer teeth must rotate MORE times to keep up (`N₁T₁ = N₂T₂`)!",
      whyItHappens: "Big objects feel 'more powerful', tricking intuition into confusing higher torque with higher RPM.",
      quickRule: "Meshing gears = OPPOSITE spin! Small gear = High RPM, Low Torque; Big gear = Low RPM, High Torque!",
      quiz: {
        prompt: "A `40-tooth` gear rotating **counterclockwise** at `15 RPM` drives a directly meshing `20-tooth` gear. How does the `20-tooth` gear turn?",
        options: ["Clockwise at 30 RPM", "Counterclockwise at 30 RPM", "Clockwise at 7.5 RPM", "Counterclockwise at 7.5 RPM"],
        answer: "Clockwise at 30 RPM",
        explanation: "Direction flips CCW → CW, and `15 × 40 ÷ 20 = 30 RPM` (half the teeth = double the speed)!"
      }
    },
    {
      id: "trap-combined-work-average",
      title: "CSE/UPCAT Work Trap: NEVER Average Two Workers' Times!",
      trapExpression: "Pipe A = 6h, Pipe B = 3h ⇒ Together = 2h (NOT 4.5h!)",
      wrongGuess: "Averaging `(6 + 3) ÷ 2 = 4.5 hours` when two workers team up",
      rightAnswer: "Add RATES (`1/6 + 1/3 = 1/2` job/hr → `2 hours`), or use `T = (A × B) ÷ (A + B)`. Together MUST be faster than the fastest solo worker!",
      whyItHappens: "Under time pressure, taking the arithmetic mean feels natural — even though `4.5h` would mean Pipe A slowed Pipe B down!",
      quickRule: "2-Worker Magic Formula: `T = (A × B) ÷ (A + B)`! Sanity check: answer MUST be smaller than `min(A, B)`!",
      quiz: {
        prompt: "Painter A finishes a room in `4 hours` and Painter B finishes it in `12 hours`. Working together, how long does it take?",
        options: ["3 hours", "8 hours", "6 hours", "16 hours"],
        answer: "3 hours",
        explanation: "`(4 × 12) ÷ (4 + 12) = 48 ÷ 16 = 3 hours` (faster than Painter A's 4 hours alone!)."
      }
    },
    {
      id: "trap-upcat-guessing-ev",
      title: "UPCAT Scoring Trap: Right-Minus-¼-Wrong Rewards Smart Elimination!",
      trapExpression: "Eliminate 1 choice (3 left) ⇒ EV = (1/3)(+1) + (2/3)(−0.25) = +0.17 pts!",
      wrongGuess: "Either guessing blindly on everything OR refusing to guess even when narrowed down to 2 choices",
      rightAnswer: "With 4 choices (`R − 0.25W`), eliminating **1 choice** gives `+0.17` expected points and eliminating **2 choices (50/50)** gives **`+0.375` expected points** — ALWAYS guess if you eliminate at least 1 option!",
      whyItHappens: "Students fear the `−0.25` penalty emotionally without calculating the actual expected value.",
      quickRule: "UPCAT 4-choice rule: 0 eliminated = tiny +0.06 (risky variance); 1 eliminated = +0.17 (GUESS!); 2 eliminated = +0.375 (DEFINITELY GUESS!)!",
      quiz: {
        prompt: "On a 4-choice UPCAT item (`+1` right, `−0.25` wrong, `0` blank), you confidently eliminate **2 wrong choices** (50/50 left). What is your mathematical Expected Value if you guess?",
        options: ["+0.375 points (strongly profitable to guess!)", "−0.25 points (leave blank)", "0.00 points (break even)", "−0.50 points"],
        answer: "+0.375 points (strongly profitable to guess!)",
        explanation: "`0.5 × (+1) + 0.5 × (−0.25) = 0.50 − 0.125 = +0.375` — crossing out 2 choices makes guessing hugely profitable!"
      }
    },
    {
      id: "trap-cse-saln-15days",
      title: "CSE RA 6713 Trap: 15 WORKING Days Reply vs. April 30 Annual SALN!",
      trapExpression: "Public Request Reply = 15 working days · Annual SALN = April 30 (NOT April 15!)",
      wrongGuess: "Confusing the BIR Income Tax deadline (April 15) with the SALN deadline (April 30), or 30 days with 15 working days",
      rightAnswer: "RA 6713 gives **15 working days** to respond to public requests (max 3 signatories) and sets annual SALN filing on or before **April 30**!",
      whyItHappens: "Both April 15 (ITR) and 30 days (assumption/separation SALN) float around in government trivia.",
      quickRule: "15 working days = public reply; 30 days = assumption/separation SALN; April 30 = annual SALN; 60 days = divestment!",
      quiz: {
        prompt: "Under RA 6713, what is the maximum number of **signatories** normally allowed on a government document/paper before action is taken within 15 working days?",
        options: ["3 signatories", "1 signatory", "5 signatories", "10 signatories"],
        answer: "3 signatories",
        explanation: "RA 6713 Section 5(a) explicitly limits processing of papers to 15 working days with **not more than three (3) signatories**!"
      }
    },
    {
      id: "trap-sva-neither-number",
      title: "UPCAT/CSE Grammar Trap: 'The Number Of' (IS) vs. 'A Number Of' (ARE)!",
      trapExpression: "THE number of students IS 40 · A number of students ARE absent!",
      wrongGuess: "Matching the verb to the plural word 'students' in both sentences",
      rightAnswer: "`The number of` = ONE specific quantity (**singular verb**); `A number of` = 'many/several' (**plural verb**)!",
      whyItHappens: "Plural nouns right before the verb hijack your ear if you don't spot `The` vs `A`.",
      quickRule: "`THE` number = 1 total = **IS/WAS**! `A` number = several = **ARE/WERE**! And `neither...nor` matches the CLOSER noun!",
      quiz: {
        prompt: "Pick the grammatically exact sentence:",
        options: ["A number of examinees ARE reviewing early, while the number of slots IS limited.", "A number of examinees IS reviewing early, while the number of slots ARE limited.", "Both take IS.", "Both take ARE."],
        answer: "A number of examinees ARE reviewing early, while the number of slots IS limited.",
        explanation: "`A number of` = plural (`ARE`); `The number of` = singular count (`IS`)!"
      }
    },
    {
      id: "trap-negative-reinforcement",
      title: "NMAT Psych Trap: Negative Reinforcement Is NOT Punishment!",
      trapExpression: "Negative = REMOVE stimulus · Reinforcement = INCREASES behavior!",
      wrongGuess: "Assuming 'Negative Reinforcement' means scolding or punishing someone",
      rightAnswer: "**Negative Reinforcement** INCREASES a good behavior by **REMOVING** an unpleasant stimulus (e.g., taking painkiller removes headache → you take painkillers again)!",
      whyItHappens: "In everyday speech 'negative' means 'bad', whereas in Skinner's Operant Conditioning '+' means ADD and '−' means SUBTRACT/REMOVE!",
      quickRule: "Step 1: Behavior goes UP = Reinforcement; DOWN = Punishment. Step 2: Stimulus ADDED = Positive; REMOVED = Negative!",
      quiz: {
        prompt: "Taking aspirin removes a pounding headache, making you more likely to take aspirin next time you have a headache. This is:",
        options: ["Negative Reinforcement", "Positive Punishment", "Negative Punishment", "Classical Conditioning"],
        answer: "Negative Reinforcement",
        explanation: "Behavior increases (Reinforcement) because an aversive headache is REMOVED (Negative)!"
      }
    },
    {
      id: "trap-percent-change-denominator",
      title: "Exam Data Trap: Percent Change ALWAYS Divides by OLD, Never NEW!",
      trapExpression: "40 → 50 is +25% (10/40) · 50 → 40 is −20% (10/50)!",
      wrongGuess: "Assuming a +25% rise followed by a −25% drop lands back at the starting value",
      rightAnswer: "Always compute `(New − Old) ÷ Old × 100%`! Going `+25%` (`1.25×`) then `−25%` (`0.75×`) lands at `0.9375×` (a net **−6.25% loss**!)!",
      whyItHappens: "The percentage base changes after the first jump — 25% of the bigger number is larger than 25% of the smaller number.",
      quickRule: "Denominator is ALWAYS the starting (OLD) number! And `+x%` then `−x%` ALWAYS drops by `(x²/100)%`!",
      quiz: {
        prompt: "A stock rises `+20%` on Monday and drops `−20%` on Tuesday. Compared to Sunday's price, the stock is now:",
        options: ["4% LOWER (`1.20 × 0.80 = 0.96`)", "Exactly the SAME (0% change)", "4% HIGHER", "2% LOWER"],
        answer: "4% LOWER (`1.20 × 0.80 = 0.96`)",
        explanation: "`100 → 120 → 96`! Multiplying `1.20 × 0.80 = 0.96` proves a net `−4%` drop!"
      }
    }
  );

  // ==================== +4 DIAGNOSTIC QUESTIONS (TOTAL: 36 -> 40) ====================
  DATA.DIAGNOSTIC_QUESTIONS.push(
    {
      id: "diag-dost-mech-space",
      topicLabel: "DOST Mechanical-Technical & Space Science",
      targetNodeId: "exam-mechanical-technical-reasoning",
      prompt: "DOST Quick Check: A `30-tooth` gear spinning CW at `10 RPM` meshes with a `10-tooth` gear (RPM & direction?), and which planet is the HOTTEST?",
      options: ["30 RPM CCW · Venus", "30 RPM CW · Mercury", "3.3 RPM CCW · Venus", "10 RPM CCW · Mars"],
      answer: "30 RPM CCW · Venus",
      whyItMatters: "Mechanical-Technical reasoning & Space Science are signature DOST-SEI Scholarship differentiators!"
    },
    {
      id: "diag-exam-work-series",
      topicLabel: "Exam Series, Graphs & Work-Rate Word Problems",
      targetNodeId: "exam-word-problems-work-mixture-motion",
      prompt: "CSE/ACET Quantitative Check: Pipe A fills in `6h`, Pipe B in `3h` → together takes ___? And next in `3, 7, 13, 21, 31, ___` is?",
      options: ["2 hours · 43", "4.5 hours · 41", "2 hours · 39", "4.5 hours · 43"],
      answer: "2 hours · 43",
      whyItMatters: "Combined rates and 2nd-order number series appear across CSE, ACET, UPCAT, DOST & NMAT!"
    },
    {
      id: "diag-cse-ra6713-filing",
      topicLabel: "CSE General Info (RA 6713) & Clerical Filing",
      targetNodeId: "exam-cse-ra6713-civics-env-laws",
      prompt: "Civil Service Check: Under RA 6713, annual SALN deadline is ___ and Ecological Solid Waste Management is ___:",
      options: ["April 30 · RA 9003", "April 15 · RA 8749", "December 31 · RA 9275", "April 30 · RA 8749"],
      answer: "April 30 · RA 9003",
      whyItMatters: "RA 6713 & PH Environmental Laws are guaranteed points toward the 80.00% Civil Service passing gate!"
    },
    {
      id: "diag-nmat-psych-perceptual",
      topicLabel: "NMAT Social Science & Perceptual Acuity",
      targetNodeId: "exam-nmat-social-science-psych-soc",
      prompt: "NMAT Dual Check: Removing an annoying seatbelt beep when you buckle up is ___, and `3:15` in a vertical mirror reads:",
      options: ["Negative Reinforcement · 8:45", "Positive Punishment · 9:15", "Negative Punishment · 8:45", "Negative Reinforcement · 9:15"],
      answer: "Negative Reinforcement · 8:45",
      whyItMatters: "Perceptual Acuity (Part I) and Social Science (Part II) account for 25% of the entire 240-item NMAT!"
    }
  );

  // ==================== +4 SYNTHESIS BOSSES (TOTAL: 30 -> 34) ====================
  DATA.SYNTHESIS_PROBLEMS.push(
    {
      id: "synth-dost-scholar-boss",
      title: "DOST-SEI Scholar Boss (Mechanical + Space + Work Rate)",
      topics: ["DOST Mechanical", "Astronomy", "Work Rate"],
      prompt: "Clear all 3 DOST-SEI parts: (1) Movable pulley with `2` supporting strands lifts `120 N` with ___ N effort? (2) Sun's final remnant is a ___? (3) Pipes of `4h` & `12h` fill together in ___ h?",
      options: ["60 N · White Dwarf · 3 h", "120 N · Black Hole · 8 h", "60 N · Neutron Star · 8 h", "30 N · White Dwarf · 3 h"],
      answer: "60 N · White Dwarf · 3 h",
      stepsChain: [
        "Movable pulley with 2 upward strands (`MA = 2`): `120 ÷ 2 = 60 N`!",
        "Medium-mass Sun (`< 8 M_☉`) evolves into Red Giant → Planetary Nebula → **White Dwarf**!",
        "Work rate shortcut: `(4 × 12) ÷ (4 + 12) = 48 ÷ 16 = 3 hours`!"
      ]
    },
    {
      id: "synth-upcat-isko-boss",
      title: "UPCAT Isko/Iska Boss (Grammar + Filipino + R − ¼W Math)",
      topics: ["UPCAT Scoring", "SVA Grammar", "Filipino Wika"],
      prompt: "Solve all 3 UPCAT essentials: (1) `40` right & `8` wrong gives Net `R − 0.25W` = ___? (2) `'The number of qualifiers ___ growing'` takes ___? (3) `'Tumakbo siya ___ mabilis'` uses ___?",
      options: ["38.0 · is · nang", "32.0 · are · ng", "38.0 · are · nang", "40.0 · is · ng"],
      answer: "38.0 · is · nang",
      stepsChain: [
        "UPCAT Net Score: `40 − (8 × 0.25) = 40 − 2 = 38.0`!",
        "`The number of` refers to a single numerical count → singular **`is`**!",
        "Modifies the verb `tumakbo` (how fast? adverb!) → **`nang`**!"
      ]
    },
    {
      id: "synth-cse-80-boss",
      title: "Civil Service 80% Passer Boss (RA 6713 + Series + Filing)",
      topics: ["RA 6713", "Number Series", "Clerical Filing"],
      prompt: "Pass all 3 CSE pillars: (1) RA 6713 reply limit = ___ working days? (2) Next in `4, 9, 16, 25, ___`? (3) `'The Manila Times'` files under letter ___?",
      options: ["15 · 36 · M", "30 · 34 · T", "15 · 36 · T", "7 · 35 · M"],
      answer: "15 · 36 · M",
      stepsChain: [
        "RA 6713 Sec. 5(a) requires prompt response within **15 working days**!",
        "Perfect squares `2², 3², 4², 5² → 6² = 36`!",
        "Leading `The` moves to the end (`Manila Times, The`) → filed under **M**!"
      ]
    },
    {
      id: "synth-nmat-90pr-boss",
      title: "NMAT 90+ PR Med Boss (Perceptual + Social Sci + Data)",
      topics: ["Perceptual Acuity", "Social Science", "Experimental Design"],
      prompt: "Ace all 3 NMAT pillars: (1) Vertically symmetric mirror word? (2) Piaget stage mastering liquid conservation? (3) Measured outcome on the Y-axis is the ___ variable?",
      options: ["MOM · Concrete Operational · Dependent", "DAD · Preoperational · Independent", "MOM · Sensorimotor · Dependent", "BOB · Formal Operational · Control"],
      answer: "MOM · Concrete Operational · Dependent",
      stepsChain: [
        "`M` and `O` are vertically symmetric palindromes → `MOM` stays unchanged in a vertical mirror!",
        "Conservation of volume/mass emerges in Piaget's **Concrete Operational** stage (ages 7–11)!",
        "DRY MIX: **D**ependent / **R**esponding variable ALWAYS sits on the **Y**-axis!"
      ]
    }
  );

  // ==================== +5 EXAM MODE BADGES (TOTAL: 35 -> 40) ====================
  DATA.BADGES.push(
    {
      id: "dost_contender",
      emoji: "🔬",
      title: "DOST-SEI Scholar Contender",
      description: "Score ≥ 75% on any DOST-SEI Mock Exam or master Mechanical-Technical & Astronomy lessons.",
      check: (st) =>
        ((st.examHistory || []).some((h) => h.examId === "dost_sei" && h.pct >= 75)) ||
        ((st.nodeMastery["exam-mechanical-technical-reasoning"] || 0) >= 2 && (st.nodeMastery["exam-astronomy-stars-cosmos"] || 0) >= 2)
    },
    {
      id: "upcat_tactician",
      emoji: "🌻",
      title: "UPCAT UPG Tactician",
      description: "Complete an UPCAT Mock Exam with projected UPG ≤ 2.30 or master Paragraph Org & Word Problems.",
      check: (st) =>
        ((st.examHistory || []).some((h) => h.examId === "upcat" && typeof h.upg === "number" && h.upg <= 2.30)) ||
        ((st.nodeMastery["exam-paragraph-org-error-spotting"] || 0) >= 2 && (st.nodeMastery["exam-word-problems-work-mixture-motion"] || 0) >= 2)
    },
    {
      id: "cse_passer_80",
      emoji: "🏛️",
      title: "Civil Service 80% Passer",
      description: "Pass a CSE Professional or Sub-Professional Mock Exam with ≥ 80.0% rating!",
      check: (st) => (st.examHistory || []).some((h) => (h.examId === "cse_pro" || h.examId === "cse_subpro") && h.pct >= 80)
    },
    {
      id: "nmat_90pr_med",
      emoji: "🩺",
      title: "NMAT 90+ PR Med Contender",
      description: "Reach projected ≥ 85 PR on an NMAT Mock Exam or master NMAT Perceptual & Social Science.",
      check: (st) =>
        ((st.examHistory || []).some((h) => h.examId === "nmat" && typeof h.pr === "number" && h.pr >= 85)) ||
        ((st.nodeMastery["exam-nmat-perceptual-acuity"] || 0) >= 2 && (st.nodeMastery["exam-nmat-social-science-psych-soc"] || 0) >= 2)
    },
    {
      id: "exam_mode_veteran",
      emoji: "🎯",
      title: "Exam Mode Veteran",
      description: "Complete 3 timed Mock Exams in Exam Mode across any target exam!",
      check: (st) => (st.examHistory || []).length >= 3
    }
  );

  // ==================== +18 EXAM PREP MEMORIZE VAULT CARDS ====================
  DATA.MEMORIZE_DATA.examPrepCards = [
    { cat: "DOST · Mech", front: "Fixed vs. Movable Pulley MA", back: "Fixed Pulley = MA 1 (changes direction only). Movable/Block-Tackle MA = # upward supporting strands!" },
    { cat: "DOST · Mech", front: "Meshing Gears & Lever FLE 1-2-3", back: "Meshing gears flip spin & N₁T₁ = N₂T₂ (smaller = faster!). FLE 1-2-3 = middle part; balance F₁d₁ = F₂d₂!" },
    { cat: "DOST · Space", front: "Star Color & H-R Evolution", back: "Blue (O/B) = HOTTEST, Red (M) = COOLEST! Sun → Red Giant → White Dwarf; >8 M_☉ → Supernova → Neutron Star/Black Hole!" },
    { cat: "DOST · Space", front: "Venus, 1 Light-Year & Redshift", back: "Venus = HOTTEST (CO₂ greenhouse) & retrograde! 1 Light-Year = DISTANCE! Redshift + CMB = expanding Big Bang!" },
    { cat: "DOST · Rules", front: "DOST-SEI Scoring & Stipend", back: "Separately timed sections (strict lock!), ZERO wrong-answer penalty (answer everything!), ₱8,000/mo + ₱40k/yr tuition + ₱10k books!" },
    { cat: "UPCAT · Rules", front: "UPCAT R − ¼W & 60/40 UPG", back: "Net = Right − 0.25×Wrong (Blank = 0). Eliminate ≥1 choice → positive EV! UPG ≈ 60% UPCAT + 40% G8–G11 Grades (1.00 best!)." },
    { cat: "UPCAT · Verbal", front: "SVA Traps: Neither/Nor & Number Of", back: "'The number of' = IS (singular); 'A number of' = ARE (plural); Neither/Nor matches CLOSER subject; ignore 'as well as'!" },
    { cat: "UPCAT · Reading", front: "Paragraph Organization Algorithm", back: "Find standalone Opener (no 'However/This/He'), lock noun→pronoun & transition pairs, place summary ('Ultimately/Thus') last!" },
    { cat: "Exam · Math", front: "Combined Work Rate & Mixtures", back: "2 Workers: T = (A×B)/(A+B)! Drain pipe = subtract rate! Mixture: C₁V₁ + C₂V₂ = C_f(V₁+V₂). Discounts: (1−d₁)(1−d₂)!" },
    { cat: "Exam · Math", front: "Relative Speed & % Change", back: "Opposite = v₁ + v₂; Same-direction chase = |v₁ − v₂|; Downstream = b + c. % Change = (New − Old) ÷ Old × 100%!" },
    { cat: "Exam · Data", front: "DRY MIX & Experiment Controls", back: "Dependent/Responding = Y-axis; Manipulated/Independent = X-axis. Change ONLY 1 IV; hold Controls constant! Inter=inside, Extra=beyond!" },
    { cat: "Exam · Series", front: "Series Radar & EJOTY (5–25)", back: "Check 1st Diff → 2nd Diff → Ratios/Squares → Zigzag = Twin Alternating Series! E=5, J=10, O=15, T=20, Y=25; Mirror A+Z=27!" },
    { cat: "CSE · RA 6713", front: "RA 6713: 8 Norms & 15-Day Rule", back: "Reply to public requests within 15 working days (max 3 signatories). 8 Norms incl. Political Neutrality & Simple Living!" },
    { cat: "CSE · SALN", front: "SALN Deadlines & Divestment", back: "File within 30d of assumption, on or before April 30 annually, and 30d after separation! Divest conflict shares within 60 days!" },
    { cat: "CSE · Green", front: "PH Environmental Laws (9003/8749/9275)", back: "RA 9003 = Solid Waste (3Rs/MRF); RA 8749 = Clean Air; RA 9275 = Clean Water; RA 9729 = Climate Change! CSE Passing = 80.00%!" },
    { cat: "CSE · Filing", front: "Alphabetical Filing & Spelling Demons", back: "Last Name first; Nothing-Before-Something (Cruz < Cruzado); merge De La/Mc; move leading 'The' to end! aCCoMModate, deFINITEly, sepARATe!" },
    { cat: "NMAT · Percept", front: "Mirror Clock (11:60) & Hidden Figs", back: "Vertical mirror flips Left↔Right ONLY (MOM unchanged; mirror clock = 11:60 − real time!). Hidden figures keep EXACT size & angle!" },
    { cat: "NMAT · SocSci", front: "Operant Conditioning, Piaget & Big 3", back: "Reinforcement = UP, Punishment = DOWN; Neg Reinf = REMOVE annoyance! Piaget: Sensori→Preop→Concrete(Conserv)→Formal! Durkheim/Marx/Mead!" }
  ];

  // ==================== REGISTER PROCEDURAL GENERATORS (ALL 10 NEW NODES, >= 8 VARIANTS EACH) ====================
  if (typeof DATA.registerProceduralMap === "function") {
    DATA.registerProceduralMap({
      "exam-mechanical-technical-reasoning": () => {
        const mode = randInt(0, 3);
        if (mode === 0) {
          const d1 = pick([2, 3, 4]);
          const d2 = pick([4, 6, 8]);
          const f2 = pick([10, 15, 20, 25, 30]);
          const f1 = (f2 * d2) / d1;
          if (Number.isInteger(f1) && f1 !== f2) {
            return {
              type: "mc",
              visualSvg: svgLever(d1, f1, d2, "F = ?"),
              prompt: `DOST Lever Balance: A \`${f1} N\` weight sits \`${d1} m\` left of the fulcrum. What force \`F\` at \`${d2} m\` right keeps the lever horizontal?`,
              options: numOpts(f2, [-10, -5, 5, 10, 15, 20], " N"),
              answer: `${f2} N`,
              hint: `Equilibrium torque: \`${f1} × ${d1} = F × ${d2}\`!`,
              whyEasy: `\`${f1 * d1} ÷ ${d2} = ${f2} N\`!`
            };
          }
        }
        if (mode === 1) {
          const ratio = pick([2, 3, 4]);
          const t2 = pick([10, 12, 15]);
          const t1 = t2 * ratio;
          const rpm1 = pick([6, 8, 10, 12]);
          const rpm2 = rpm1 * ratio;
          const dir1 = pick(["CW", "CCW"]);
          const ansDir = dir1 === "CW" ? "Counterclockwise" : "Clockwise";
          const wrongDir = dir1 === "CW" ? "Clockwise" : "Counterclockwise";
          const ans = `${ansDir} at ${rpm2} RPM`;
          return {
            type: "mc",
            visualSvg: svgGears(t1, t2, dir1),
            prompt: `DOST Gear Train: Driver Gear A (\`${t1} teeth\`) spins ${dir1 === "CW" ? "clockwise" : "counterclockwise"} at \`${rpm1} RPM\`, meshing directly with Gear B (\`${t2} teeth\`). How does Gear B turn?`,
            options: shuffle([ans, `${wrongDir} at ${rpm2} RPM`, `${ansDir} at ${Math.max(1, Math.round(rpm1 / ratio))} RPM`, `${wrongDir} at ${rpm1} RPM`]),
            answer: ans,
            hint: "Meshing gears flip direction and `RPM₁ × T₁ = RPM₂ × T₂`!",
            whyEasy: `Direction reverses to ${ansDir}, and \`${rpm1} × ${t1} ÷ ${t2} = ${rpm2} RPM\`!`
          };
        }
        if (mode === 2) {
          const ropes = pick([1, 2, 4]);
          const effort = pick([20, 25, 30, 40, 50]);
          const load = effort * ropes;
          const lbl = ropes === 1 ? "Single Fixed" : ropes === 2 ? "Single Movable" : "Block & Tackle";
          return {
            type: "mc",
            visualSvg: svgPulley(lbl, ropes, load),
            prompt: `DOST Pulley Check: An ideal frictionless **${lbl}** pulley system with \`${ropes}\` upward supporting strand${ropes > 1 ? "s" : ""} lifts a \`${load} N\` crate. What pulling effort is required?`,
            options: numOpts(effort, [-15, -10, 10, 20, 30, 40], " N"),
            answer: `${effort} N`,
            hint: `Ideal Mechanical Advantage = # supporting strands (\`${ropes}\`), so \`Effort = Load ÷ ${ropes}\`!`,
            whyEasy: `\`${load} N ÷ ${ropes} = ${effort} N\`!`
          };
        }
        return bankQ([
          { prompt: "In a chain of **5 directly meshing gears** in a row, Gear 1 spins **clockwise**. Which way does Gear 5 spin?", options: ["Clockwise (odd gears match Gear 1!)", "Counterclockwise", "It locks and cannot move", "Alternates every half-turn"], answer: "Clockwise (odd gears match Gear 1!)", hint: "1: CW → 2: CCW → 3: CW → 4: CCW → 5: ?", whyEasy: "Odd-numbered gears in a straight mesh chain always turn the SAME direction as Gear 1!" },
          { prompt: "Two pulleys are linked by an **OPEN (uncrossed) belt**. If Pulley A turns clockwise, how does Pulley B turn?", options: ["Clockwise (same direction!)", "Counterclockwise (opposite!)", "Does not turn", "Only oscillates"], answer: "Clockwise (same direction!)", hint: "Open belt = SAME direction; Crossed figure-8 belt = OPPOSITE direction!", whyEasy: "An uncrossed belt pulls both wheels around in the exact same direction!" },
          { prompt: "A hydraulic car lift has a small input piston (`A₁ = 2 cm²`) and large output piston (`A₂ = 200 cm²`). Pushing with `50 N` on the small piston lifts how much weight?", options: ["5,000 N (`100×` force multiplication!)", "500 N", "50 N", "10,000 N"], answer: "5,000 N (`100×` force multiplication!)", hint: "Pascal's Principle: `F₁/A₁ = F₂/A₂`!", whyEasy: "Area increases `100×`, so output force multiplies `100×`: `50 × 100 = 5,000 N`!" },
          { prompt: "Which simple machine is a **Class 3 Lever** (Effort in the middle — trading force for speed/reach)?", options: ["Tweezers / Human forearm", "Wheelbarrow", "Nutcracker", "Crowbar prying a nail"], answer: "Tweezers / Human forearm", hint: "FLE 1-2-3: 1=Fulcrum, 2=Load, 3=Effort in the middle!", whyEasy: "You squeeze tweezers in the middle between the hinged fulcrum and the tip load!" },
          { prompt: "Three identical bulbs are wired in **PARALLEL** to a 12V battery. If Bulb #2 burns out, what happens to Bulbs #1 and #3?", options: ["They stay ON at the exact same brightness!", "Both turn off completely", "Both get half as bright", "Both explode"], answer: "They stay ON at the exact same brightness!", hint: "Parallel branches each have their own independent path to 12V!", whyEasy: "Opening one parallel branch leaves the other branches' voltage (`12V`) untouched!" }
        ]);
      },

      "exam-astronomy-stars-cosmos": () => bankQ([
        { prompt: "Why is **Venus** hotter than Mercury even though Mercury orbits much closer to the Sun?", options: ["Venus's thick `CO₂` atmosphere causes a runaway greenhouse effect", "Venus has active nuclear fusion inside", "Mercury is covered in ice sheets", "Venus orbits inside the Sun's corona"], answer: "Venus's thick `CO₂` atmosphere causes a runaway greenhouse effect", hint: "Mercury has virtually zero atmosphere to retain heat!", whyEasy: "Venus traps solar heat under a `96% CO₂` atmospheric blanket (`~465°C`)!" },
        { prompt: "Rank star surface temperatures from **HOTTEST to COOLEST** by color:", options: ["Blue → White → Yellow → Orange → Red", "Red → Orange → Yellow → White → Blue", "Yellow → Red → Blue → White", "All stars have the same temperature"], answer: "Blue → White → Yellow → Orange → Red", hint: "Remember spectral order `O-B-A-F-G-K-M` (Blue = hottest, Red = coolest)!", whyEasy: "Higher temperature emits shorter, higher-energy blue wavelengths (`Wien's Law`)!" },
        { prompt: "Which nuclear reaction powers Main Sequence stars like our Sun?", options: ["Nuclear Fusion of Hydrogen into Helium (`4H → He`)", "Nuclear Fission of Uranium", "Combustion of Methane gas", "Radioactive Carbon-14 decay"], answer: "Nuclear Fusion of Hydrogen into Helium (`4H → He`)", hint: "Light nuclei combine under extreme core pressure & temperature!", whyEasy: "Every second the Sun fuses ~600 million tons of Hydrogen into Helium!" },
        { prompt: "Which final fate awaits a super-massive star (`> 20` solar masses) after a **Supernova** explosion?", options: ["Black Hole (or Neutron Star for `8–20 M_☉`)", "White Dwarf", "Terrestrial Rocky Planet", "Asteroid Belt"], answer: "Black Hole (or Neutron Star for `8–20 M_☉`)", hint: "Sun-like stars become White Dwarfs; giant stars undergo core-collapse Supernovae!", whyEasy: "Extreme gravity crushes a massive star's core past neutron degeneracy into a Black Hole!" },
        { prompt: "In which direction does a **comet's tail** ALWAYS point as it swings around the Sun?", options: ["Directly AWAY from the Sun (pushed by solar wind & radiation)", "Always directly behind its orbital motion", "Straight toward the Sun", "Toward Earth's North Pole"], answer: "Directly AWAY from the Sun (pushed by solar wind & radiation)", hint: "Solar wind blows ionized gas & dust radially outward from the Sun!", whyEasy: "Even as a comet moves away from the Sun, its tail streams *ahead* of it — always pointing away from the Sun!" },
        { prompt: "What is the difference between a **Meteor** and a **Meteorite**?", options: ["A meteor burns as a streak in the atmosphere; a meteorite survives and lands on Earth's surface!", "A meteorite orbits Jupiter; a meteor is a comet", "They are identical names for asteroids", "A meteor hits the ground; a meteorite stays in space"], answer: "A meteor burns as a streak in the atmosphere; a meteorite survives and lands on Earth's surface!", hint: "`-ite` = rock you can hold (like granite/pyrite)!", whyEasy: "Meteoroid (space) → Meteor (burning streak in Mesosphere) → Meteorite (rock on ground)!" },
        { prompt: "Which pair of observations provides the strongest empirical evidence for the **Big Bang Theory**?", options: ["Galactic Redshift (Hubble expansion) & Cosmic Microwave Background (CMB)", "Ocean tides & lunar eclipses", "Earth's seasons & trade winds", "Earthquakes & continental drift"], answer: "Galactic Redshift (Hubble expansion) & Cosmic Microwave Background (CMB)", hint: "Expansion of space + leftover thermal glow from the hot early Universe!", whyEasy: "Redshift shows galaxies receding everywhere, and CMB is the cooled afterglow of the early cosmos!" },
        { prompt: "Which 4 planets are the dense, rocky **Terrestrial** inner planets?", options: ["Mercury, Venus, Earth, Mars", "Jupiter, Saturn, Uranus, Neptune", "Venus, Earth, Saturn, Neptune", "Mercury, Mars, Jupiter, Pluto"], answer: "Mercury, Venus, Earth, Mars", hint: "The 4 worlds inside the Asteroid Belt!", whyEasy: "Inner 4 = Terrestrial (rocky/metal); Outer 4 = Jovian (gas/ice giants)!" }
      ]),

      "exam-data-interpretation-experiments": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const oldV = pick([20, 25, 40, 50, 80, 100]);
          const pct = pick([10, 20, 25, 40, 50]);
          const newV = oldV + (oldV * pct) / 100;
          if (Number.isInteger(newV)) {
            const v3 = Math.round(newV * 0.9);
            const v4 = Math.round(newV * 1.2);
            return {
              type: "mc",
              visualSvg: svgDataChart("Quarterly Output (units)", ["Q1", "Q2", "Q3", "Q4"], [oldV, newV, v3, v4], ""),
              prompt: `Chart Reading: Output rose from \`${oldV}\` in Q1 to \`${newV}\` in Q2. What is the **percent increase** from Q1 to Q2?`,
              options: numOpts(pct, [-10, -5, 5, 10, 15, 20], "%", "+"),
              answer: `+${pct}%`,
              hint: `Compute \`(${newV} − ${oldV}) ÷ ${oldV} × 100%\`!`,
              whyEasy: `\`${newV - oldV} ÷ ${oldV} = +${pct}%\` (always divide by the starting Q1 value)!`
            };
          }
        }
        return bankQ([
          { prompt: "In an experiment measuring how **study hours** affect **mock exam scores**, which variable is plotted on the **X-axis**?", options: ["Study hours (Independent / Manipulated Variable)", "Mock exam score (Dependent Variable)", "Room lighting (Controlled Variable)", "Student age"], answer: "Study hours (Independent / Manipulated Variable)", hint: "DRY MIX: Manipulated/Independent = X-axis; Dependent/Responding = Y-axis!", whyEasy: "The scientist/learner varies study hours (X) to observe the resulting exam score (Y)!" },
          { prompt: "Why does a clinical drug trial include a **Placebo Control Group**?", options: ["To provide a baseline separating real biological drug effects from psychological expectation!", "To save money on medicine", "To make the sample size smaller", "To eliminate the dependent variable"], answer: "To provide a baseline separating real biological drug effects from psychological expectation!", hint: "Without a baseline, you can't tell if patients improved naturally or from the drug!", whyEasy: "Control groups isolate the true effect of the single independent variable!" },
          { prompt: "A researcher measures bacterial growth at `10°C, 20°C, 30°C, 40°C` and predicts growth at `25°C`. Predicting **inside** the tested range is:", options: ["Interpolation", "Extrapolation", "Confounding", "Bias"], answer: "Interpolation", hint: "`Inter-` = between measured data points!", whyEasy: "`25°C` sits strictly between `20°C` and `30°C` → Interpolation!" },
          { prompt: "A chart shows ice cream sales and drowning accidents both spike every July (`r = +0.92`). What is the scientifically accurate conclusion?", options: ["Correlation does NOT prove causation — hot summer weather is a lurking confounding variable!", "Ice cream causes swimming cramps", "Drowning increases ice cream demand", "The data has zero correlation"], answer: "Correlation does NOT prove causation — hot summer weather is a lurking confounding variable!", hint: "Look for a hidden third variable driving BOTH lines upward!", whyEasy: "Summer heat drives both ice cream purchases and beach visits independently!" },
          { prompt: "Data Sufficiency (CSE/ACET): What is the exact value of positive integer `x`?\n(I) `x² = 16`\n(II) `x` is even", options: ["Statement (I) ALONE is sufficient, while (II) alone is not", "Both statements TOGETHER are needed", "Statement (II) ALONE is sufficient", "Neither statement is sufficient"], answer: "Statement (I) ALONE is sufficient, while (II) alone is not", hint: "The prompt ALREADY tells you `x` is a **positive** integer! So `x² = 16` leaves only `x = +4`!", whyEasy: "Because `x > 0`, Statement (I) uniquely pins down `x = 4` all by itself!" }
        ]);
      },

      "exam-number-letter-series-patterns": () => {
        const mode = randInt(0, 3);
        if (mode === 0) {
          const start = randInt(2, 9);
          const d0 = pick([2, 3, 4]);
          const step = pick([2, 3]);
          const seq = [start];
          for (let i = 0; i < 5; i++) seq.push(seq[seq.length - 1] + d0 + i * step);
          const ans = seq[5];
          return {
            type: "mc",
            prompt: `Number Series (2nd Diff): Find the next term in \`${seq.slice(0, 5).join(", ")}, ___\``,
            options: numOpts(ans, [-4, -2, -1, 1, 2, 4]),
            answer: String(ans),
            hint: `Differences grow by \`+${step}\` each time: \`+${d0}, +${d0 + step}, +${d0 + 2 * step}, +${d0 + 3 * step}, ...\`!`,
            whyEasy: `Next jump is \`+${d0 + 4 * step}\`, so \`${seq[4]} + ${d0 + 4 * step} = ${ans}\`!`
          };
        }
        if (mode === 1) {
          const a0 = randInt(3, 12);
          const da = pick([3, 4, 5]);
          const b0 = randInt(24, 40);
          const db = pick([2, 3, 4]);
          const shown = [a0, b0, a0 + da, b0 - db, a0 + 2 * da, b0 - 2 * db];
          const ans = a0 + 3 * da;
          return {
            type: "mc",
            prompt: `Alternating Series: Find the next term in \`${shown.join(", ")}, ___\``,
            options: numOpts(ans, [-5, -3, -2, 2, 3, 5]),
            answer: String(ans),
            hint: `Split odd positions (\`${a0}, ${a0 + da}, ${a0 + 2 * da}, ?\`) from even positions (\`${b0}, ${b0 - db}, ${b0 - 2 * db}\`)!`,
            whyEasy: `Position 7 is on the odd track (\`+${da}\`): \`${a0 + 2 * da} + ${da} = ${ans}\`!`
          };
        }
        if (mode === 2) {
          const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          const startIdx = randInt(0, 6);
          const jump = pick([2, 3, 4]);
          const shown = [0, 1, 2, 3, 4].map((k) => alpha[startIdx + k * jump]);
          const ansIdx = startIdx + 5 * jump;
          if (ansIdx < 26) {
            const ans = alpha[ansIdx];
            const optSet = new Set([ans]);
            for (const off of shuffle([-3, -2, -1, 1, 2, 3])) {
              const j = ansIdx + off;
              if (j >= 0 && j < 26) optSet.add(alpha[j]);
              if (optSet.size === 4) break;
            }
            return {
              type: "mc",
              prompt: `Letter Series: What letter comes next in \`${shown.join(", ")}, ___\`?`,
              options: shuffle(Array.from(optSet)),
              answer: ans,
              hint: `Convert to alphabet numbers (EJOTY = 5,10,15,20,25): constant jump of \`+${jump}\`!`,
              whyEasy: `Rank \`${ansIdx + 1}\` is **${ans}**!`
            };
          }
        }
        return bankQ([
          { prompt: "Find the next term: `1, 4, 9, 16, 25, 36, ___`", options: ["49", "45", "48", "51"], answer: "49", hint: "Perfect squares `1², 2², 3², 4², 5², 6², ...`!", whyEasy: "`7² = 49`!" },
          { prompt: "Find the next term: `1, 1, 2, 3, 5, 8, 13, ___`", options: ["21", "19", "20", "24"], answer: "21", hint: "Fibonacci: each term is the SUM of the previous two!", whyEasy: "`8 + 13 = 21`!" },
          { prompt: "Find the next term: `3, 6, 12, 24, 48, ___`", options: ["96", "72", "84", "92"], answer: "96", hint: "Geometric ratio `×2` every step!", whyEasy: "`48 × 2 = 96`!" },
          { prompt: "Find the next pair: `BY, DW, FU, HS, ___`", options: ["JQ", "IR", "KP", "JR"], answer: "JQ", hint: "1st letter `+2` (`B,D,F,H → J`), 2nd letter `−2` (`Y,W,U,S → Q`)!", whyEasy: "`J` (10) + `Q` (17) = 27 mirror pair → `JQ`!" },
          { prompt: "Find the next term: `2, 6, 14, 30, 62, ___`", options: ["126", "124", "94", "128"], answer: "126", hint: "Rule: `×2 + 2` (or `2ⁿ − 2`: 4−2, 8−2, 16−2, 32−2, 64−2)!", whyEasy: "`62 × 2 + 2 = 126`!" }
        ]);
      },

      "exam-word-problems-work-mixture-motion": () => {
        const mode = randInt(0, 3);
        if (mode === 0) {
          const pairs = [[6, 3, 2], [4, 12, 3], [6, 12, 4], [10, 15, 6], [12, 24, 8], [15, 30, 10]];
          const [a, b, t] = pick(pairs);
          return {
            type: "mc",
            prompt: `Work Rate: Machine A finishes a batch in \`${a} hours\` and Machine B finishes it in \`${b} hours\`. Running together, how many hours to finish 1 batch?`,
            options: numOpts(t, [-1, 1, 2, 3, Math.round((a + b) / 2) - t], " hours"),
            answer: `${t} hours`,
            hint: `Use \`T = (A × B) ÷ (A + B) = (${a} × ${b}) ÷ (${a + b})\`!`,
            whyEasy: `\`${a * b} ÷ ${a + b} = ${t} hours\` (always faster than the faster machine alone)!`
          };
        }
        if (mode === 1) {
          const v1 = pick([40, 50, 60, 70]);
          const v2 = pick([50, 60, 80, 90]);
          const hrs = pick([2, 3, 4, 5]);
          const dist = (v1 + v2) * hrs;
          return {
            type: "mc",
            prompt: `Relative Motion: Two cars start \`${dist} km\` apart and drive **toward each other** at \`${v1} km/h\` and \`${v2} km/h\`. In how many hours do they meet?`,
            options: numOpts(hrs, [-1, 1, 2, 3], " hours"),
            answer: `${hrs} hours`,
            hint: `Opposite directions ADD speeds: \`${v1} + ${v2} = ${v1 + v2} km/h\`!`,
            whyEasy: `\`${dist} ÷ ${v1 + v2} = ${hrs} hours\`!`
          };
        }
        if (mode === 2) {
          const d1 = pick([10, 20, 25, 30]);
          const d2 = pick([10, 20]);
          const net = d1 + d2 - (d1 * d2) / 100;
          if (Number.isInteger(net)) {
            return {
              type: "mc",
              prompt: `Successive Discounts: A laptop gets \`${d1}%\` off, followed by an extra \`${d2}%\` promo discount. What single total % discount is that?`,
              options: numOpts(net, [-4, -2, 2, d1 + d2 - net, 5], "%"),
              answer: `${net}%`,
              hint: `Pay fraction = \`(1 − ${d1 / 100}) × (1 − ${d2 / 100})\`, or use \`d₁ + d₂ − (d₁·d₂)/100\`!`,
              whyEasy: `\`${d1} + ${d2} − ${(d1 * d2) / 100} = ${net}%\` (never just add \`${d1 + d2}%\`!)`
            };
          }
        }
        return bankQ([
          { prompt: "A boat moves at `12 km/h` in still water on a river flowing at `3 km/h`. How long to travel `45 km` **downstream**?", options: ["3 hours", "5 hours", "3.75 hours", "4 hours"], answer: "3 hours", hint: "Downstream speed = `boat + current = 12 + 3 = 15 km/h`!", whyEasy: "`45 ÷ 15 = 3 hours`!" },
          { prompt: "You mix `20 L` of `10%` acid with `20 L` of `40%` acid. What is the final mixture's concentration?", options: ["25%", "50%", "20%", "30%"], answer: "25%", hint: "Total acid = `2 L + 8 L = 10 L` out of `40 L` total!", whyEasy: "`10 ÷ 40 = 25%` (exact average when volumes match)!" },
          { prompt: "Pipe A fills a tank in `4 hours`, while Drain B empties it in `12 hours`. With both open, how long to fill the tank?", options: ["6 hours", "3 hours", "8 hours", "16 hours"], answer: "6 hours", hint: "Drain SUBTRACTS rate: `1/4 − 1/12 = 2/12 = 1/6` per hour!", whyEasy: "Net rate `1/6` tank/hr → `6 hours` to fill!" },
          { prompt: "Carlo is `4` years older than Ana. In `5` years, the sum of their ages will be `34`. How old is **Ana NOW**?", options: ["10 years old", "14 years old", "12 years old", "15 years old"], answer: "10 years old", hint: "Sum of ages NOW = `34 − 10 = 24` (subtract 5 from BOTH!), so `a + (a + 4) = 24`!", whyEasy: "`2a = 20 → Ana = 10` (Carlo = `14`; in 5 yrs `15 + 19 = 34`)!" }
        ]);
      },

      "exam-paragraph-org-error-spotting": () => bankQ([
        { prompt: "Choose the correct verb: `'The team captain, together with all twelve players, ___ attending the national finals.'`", options: ["is", "are", "were", "have been"], answer: "is", hint: "Ignore intervening phrases like `together with` / `as well as` — true subject is **`captain`** (singular)!", whyEasy: "Singular subject `captain` requires singular verb **`is`**!" },
        { prompt: "Choose the correct verb: `'Neither the nurses nor the chief surgeon ___ available right now.'`", options: ["is", "are", "were", "have been"], answer: "is", hint: "With `neither...nor`, match the noun **CLOSEST** to the verb (`chief surgeon` = singular)!", whyEasy: "`chief surgeon` is singular → **`is`**!" },
        { prompt: "Choose the correct pair: `'___ of scholars ___ already submitted their DOST forms.'`", options: ["A number ... have", "A number ... has", "The number ... have", "Each ... have"], answer: "A number ... have", hint: "`A number of` means 'several' (plural verb); `The number of` means 'the count' (singular verb)!", whyEasy: "`A number of scholars HAVE` (plural)!" },
        { prompt: "Which sentence has **NO dangling modifier**?", options: ["Exhausted from the 4-hour mock test, Leo fell asleep immediately.", "Exhausted from the 4-hour mock test, the bed looked inviting to Leo.", "Exhausted from the 4-hour mock test, sleep came quickly.", "Exhausted from the 4-hour mock test, Leo's alarm failed to ring."], answer: "Exhausted from the 4-hour mock test, Leo fell asleep immediately.", hint: "Who was exhausted? **Leo** (not the bed, sleep, or alarm)!", whyEasy: "Placing `Leo` directly after the opening modifier fixes the dangling error!" },
        { prompt: "Select the sentence with **correct parallel structure**:", options: ["Good scientists observe carefully, record accurately, and analyze objectively.", "Good scientists observe carefully, recording accurately, and to analyze objectively.", "Good scientists are observing, record accurately, and objective analysis.", "Good scientists observe carefully, accurate records, and analyze."], answer: "Good scientists observe carefully, record accurately, and analyze objectively.", hint: "Match all 3 verbs in simple present + adverb!", whyEasy: "`observe carefully`, `record accurately`, `analyze objectively` — clean 3-part symmetry!" },
        { prompt: "In **Paragraph Organization**, which sentence is MOST LIKELY to be **Sentence #1 (the Topic Sentence)**?", options: ["Urban green roofs are rapidly transforming how tropical cities cool down.", "However, installation costs remain a barrier for small homes.", "This cooling effect can lower indoor heat by up to 4°C.", "Finally, city governments are offering tax rebates for adopters."], answer: "Urban green roofs are rapidly transforming how tropical cities cool down.", hint: "Reject any sentence starting with `However`, `This ...`, or `Finally`!", whyEasy: "A Topic Sentence stands independently and introduces the subject with zero dangling references!" },
        { prompt: "Spot the correct pronoun case: `'Between you and ___, this UPCAT math section was intense.'`", options: ["me", "I", "myself", "we"], answer: "me", hint: "`Between` is a preposition — prepositions ALWAYS take **object pronouns** (`me, him, her, us, them`)!", whyEasy: "`Between you and ME` (NEVER `between you and I` — classic exam trap!)!" }
      ]),

      "exam-nmat-perceptual-acuity": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const clocks = [
            ["2:20", "9:40"],
            ["3:15", "8:45"],
            ["4:10", "7:50"],
            ["1:35", "10:25"],
            ["5:40", "6:20"],
            ["10:15", "1:45"]
          ];
          const [realT, mirT] = pick(clocks);
          const [rh, rm] = realT.split(":").map(Number);
          const wrong1 = `${(12 - rh) || 12}:${String(rm).padStart(2, "0")}`;
          const wrong2 = `${rh}:${String(60 - rm).padStart(2, "0")}`;
          const wrong3 = `${Math.max(1, 11 - rh - 1)}:${String(60 - rm).padStart(2, "0")}`;
          const opts = Array.from(new Set([mirT, wrong1, wrong2, wrong3, "12:00"])).slice(0, 4);
          return {
            type: "mc",
            prompt: `NMAT Mirror Clock: An unnumbered wall clock shows **\`${realT}\`**. What time does its **vertical mirror reflection** display?`,
            options: shuffle(opts),
            answer: mirT,
            hint: "Subtract the real time from **`11:60`**!",
            whyEasy: `\`11:60 − ${realT} = ${mirT}\`!`
          };
        }
        return bankQ([
          { prompt: "Which word looks **100% UNCHANGED** in a vertical mirror (every letter vertically symmetric & palindrome)?", options: ["AHA", "BOB", "GAG", "SIS"], answer: "AHA", hint: "Check each letter against the symmetric set `{A, H, I, M, O, T, U, V, W, X, Y}`!", whyEasy: "`A` and `H` are vertically symmetric and `AHA` reads identically backwards!" },
          { prompt: "Which word stays **UNCHANGED** across a **HORIZONTAL mirror** (top-to-bottom flip)?", options: ["CODE", "MATH", "STAR", "QUIZ"], answer: "CODE", hint: "Horizontally symmetric capitals: `{B, C, D, E, H, I, K, O, X}`!", whyEasy: "Every single letter in `C-O-D-E` has top-to-bottom mirror symmetry!" },
          { prompt: "Identical Information — Which matches **`P.O. Box 4792-B, Makati City 1226`** EXACTLY?", options: ["P.O. Box 4792-B, Makati City 1226", "P.O. Box 4729-B, Makati City 1226", "P.O. Box 4792-B, Makati City, 1226", "P.0. Box 4792-B, Makati City 1226"], answer: "P.O. Box 4792-B, Makati City 1226", hint: "Check `4792` vs `4729`, extra comma after `City`, and zero `0` vs letter `O`!", whyEasy: "Choice 2 swaps `92→29`, Choice 3 adds an extra comma, Choice 4 puts zero `0` in `P.0.`!" },
          { prompt: "Identical Information — Which matches **`Dr. Rafael G. Concepcion-Mendoza, MD`** EXACTLY?", options: ["Dr. Rafael G. Concepcion-Mendoza, MD", "Dr. Raphael G. Concepcion-Mendoza, MD", "Dr. Rafael G. Conception-Mendoza, MD", "Dr. Rafael G. Concepcion-Mendoza MD"], answer: "Dr. Rafael G. Concepcion-Mendoza, MD", hint: "Scan `f` vs `ph`, `ci` vs `ti`, and the comma before `MD`!", whyEasy: "Watch phonetic traps (`Rafael/Raphael`, `Concepcion/Conception`) and punctuation!" },
          { prompt: "In NMAT Hidden Figures, why is the **Anchor-Vertex Method** faster than scanning the entire figure?", options: ["Pinpointing one distinctive corner/angle at exact size & orientation eliminates 2–3 wrong choices in seconds!", "Hidden figures are always rotated 90°", "All hidden figures are circles", "You can skip checking edge lengths"], answer: "Pinpointing one distinctive corner/angle at exact size & orientation eliminates 2–3 wrong choices in seconds!", hint: "NMAT hidden figures NEVER rotate or resize!", whyEasy: "Matching one unique vertex + slope immediately filters out distractors!" }
        ]);
      },

      "exam-nmat-social-science-psych-soc": () => bankQ([
        { prompt: "Pavlov's dogs salivated at the sound of a bell after repeated bell + food pairings. The **bell** after learning is the:", options: ["Conditioned Stimulus (CS)", "Unconditioned Stimulus (UCS)", "Unconditioned Response (UCR)", "Negative Reinforcer"], answer: "Conditioned Stimulus (CS)", hint: "Food = Unconditioned Stimulus; Bell starts neutral and becomes LEARNED (Conditioned)!", whyEasy: "Neutral stimulus + UCS → Conditioned Stimulus (CS) triggering Conditioned Response (CR)!" },
        { prompt: "A teen grounded from playing video games after sneaking out stops sneaking out. Removing a pleasant privilege to DECREASE behavior is:", options: ["Negative Punishment", "Negative Reinforcement", "Positive Punishment", "Positive Reinforcement"], answer: "Negative Punishment", hint: "Behavior DECREASES (Punishment) by REMOVING something liked (Negative)!", whyEasy: "Removing a reward to lower behavior = Negative Punishment (response cost)!" },
        { prompt: "In **Erikson's Psychosocial Stages**, what is the central developmental crisis of **Adolescence** (ages 12–18)?", options: ["Identity vs. Role Confusion", "Trust vs. Mistrust", "Intimacy vs. Isolation", "Generativity vs. Stagnation"], answer: "Identity vs. Role Confusion", hint: "Teens explore values, career, and 'Who am I?'", whyEasy: "Infancy = Trust; Adolescence = Identity; Young Adult = Intimacy; Middle Adult = Generativity!" },
        { prompt: "Which level sits at the **very base** of **Maslow's Hierarchy of Needs** (must be satisfied first)?", options: ["Physiological needs (food, water, air, sleep)", "Self-actualization", "Esteem needs", "Love and belonging"], answer: "Physiological needs (food, water, air, sleep)", hint: "Survival biology comes before safety, belonging, esteem, and self-actualization!", whyEasy: "Physiological → Safety → Belonging → Esteem → Self-Actualization!" },
        { prompt: "Émile Durkheim coined the term **ANOMIE** to describe:", options: ["A state of normlessness / breakdown of social rules during rapid upheaval", "Strict authoritarian bureaucracy", "Genetic evolution in primates", "Judging another culture as superior"], answer: "A state of normlessness / breakdown of social rules during rapid upheaval", hint: "Greek `a-` (without) + `nomos` (law/norms)!", whyEasy: "Durkheim linked rapid social change and normlessness (`anomie`) to alienation and rising suicide rates!" },
        { prompt: "In sociology, what distinguishes **Mores** from **Folkways**?", options: ["Mores carry strong moral significance (violating them draws severe outrage), while folkways are casual etiquette", "Folkways are strict criminal laws; mores are fashion trends", "Mores only exist in rural areas", "They are exact synonyms"], answer: "Mores carry strong moral significance (violating them draws severe outrage), while folkways are casual etiquette", hint: "Chewing with your mouth open = folkway; stealing or cheating = more!", whyEasy: "Norm strength scale: Folkways (polite custom) < Mores (moral duty) < Taboos (strictly forbidden)!" },
        { prompt: "In **Freud's personality structure**, which component acts as the **reality-testing mediator** balancing instinctual desires against moral guilt?", options: ["Ego", "Id", "Superego", "Libido"], answer: "Ego", hint: "Id = pleasure principle; Superego = moral perfection; Ego = reality principle!", whyEasy: "The Ego negotiates realistically between the impulsive Id and the strict Superego!" }
      ]),

      "exam-cse-ra6713-civics-env-laws": () => bankQ([
        { prompt: "Under **RA 6713**, newly appointed public officials must file their initial **SALN** within how many days after assuming office?", options: ["30 days", "15 days", "60 days", "90 days"], answer: "30 days", hint: "Assumption = 30 days · Annual = April 30 · Separation = 30 days!", whyEasy: "Section 8 of RA 6713 requires SALN filing within 30 days of assuming office!" },
        { prompt: "When a conflict of interest arises under **RA 6713**, a public official must divest shareholdings/business interest within how many days?", options: ["60 days from assumption of office", "15 days", "1 year", "10 days"], answer: "60 days from assumption of office", hint: "Resign from private post within `30 days`; divest financial shareholdings within `60 days`!", whyEasy: "RA 6713 Sec. 9 gives 30 days to resign from private business office and **60 days** to divest shareholdings!" },
        { prompt: "Which Philippine environmental law is the **Philippine Clean Water Act of 2004**?", options: ["RA 9275", "RA 9003", "RA 8749", "RA 9729"], answer: "RA 9275", hint: "8749 = Clean Air; 9003 = Solid Waste; 9275 = Clean Water; 9729 = Climate Change!", whyEasy: "RA 9275 protects Philippine bodies of water from land-based industrial & domestic pollution!" },
        { prompt: "Which RA 6713 Norm requires public officials and their families to lead **modest lives** appropriate to their income and avoid extravagant displays of wealth?", options: ["Simple Living", "Political Neutrality", "Professionalism", "Responsiveness to the Public"], answer: "Simple Living", hint: "One of the 8 Norms of Conduct in RA 6713 Sec. 4(h)!", whyEasy: "Simple Living guards against ostentatious wealth and corruption in government service!" },
        { prompt: "Which international milestone adopted by the UN General Assembly on **December 10, 1948** affirms universal, inalienable human rights?", options: ["Universal Declaration of Human Rights (UDHR)", "Kyoto Protocol", "ASEAN Charter", "Treaty of Paris"], answer: "Universal Declaration of Human Rights (UDHR)", hint: "Human Rights Day is celebrated every December 10 worldwide!", whyEasy: "The 1948 UDHR sets the global baseline for civil, political, economic, and social rights!" },
        { prompt: "What is the official passing General Rating required to pass both the **CSE Professional** and **CSE Sub-Professional** exams?", options: ["80.00%", "75.00%", "70.00%", "85.00%"], answer: "80.00%", hint: "Higher than typical 75% school passing marks!", whyEasy: "The Civil Service Commission requires at least an **80.00%** general rating for eligibility!" },
        { prompt: "Under **RA 9729** (*Climate Change Act of 2009*), which Philippine agency is mandated as the sole policy-making body on climate change programs?", options: ["Climate Change Commission (CCC)", "PAGASA only", "Department of Trade and Industry", "Commission on Elections"], answer: "Climate Change Commission (CCC)", hint: "Chaired by the President of the Philippines!", whyEasy: "RA 9729 created the Climate Change Commission to mainstream climate resilience across government!" }
      ]),

      "exam-cse-clerical-filing-vocabulary": () => bankQ([
        { prompt: "Which name files **FIRST** alphabetically?\n(1) Engr. Pedro Cruz · (2) Maria Cruzado · (3) Anna Cruz · (4) Paolo Cruz-Reyes", options: ["Anna Cruz", "Engr. Pedro Cruz", "Maria Cruzado", "Paolo Cruz-Reyes"], answer: "Anna Cruz", hint: "Ignore `Engr.`; `Cruz` beats `Cruzado` and `Cruz-Reyes`; then compare `Anna` vs `Pedro`!", whyEasy: "`Cruz, Anna` precedes `Cruz, Pedro`, `Cruzado`, and `Cruz-Reyes`!" },
        { prompt: "Under which letter is **`The Department of Science and Technology`** indexed in standard clerical filing?", options: ["D (`Department of Science and Technology, The`)", "T (`The ...`)", "S (`Science ...`)", "P (`Philippine ...`)"], answer: "D (`Department of Science and Technology, The`)", hint: "Move a leading `The` to the end — NEVER file under `T`!", whyEasy: "Omitting the initial article `The` puts `Department` first → filed under **D**!" },
        { prompt: "Which spelling is **100% CORRECT**?", options: ["embarrassment", "embarassment", "embarrasment", "embarraasment"], answer: "embarrassment", hint: "Remember: **2 r's AND 2 s's** (`em-baRRaSS-ment`)!", whyEasy: "`embarrass` / `embarrassment` always doubles both `r` and `s`!" },
        { prompt: "Which spelling is **100% CORRECT**?", options: ["privilege", "priviledge", "privelege", "privilige"], answer: "privilege", hint: "NO `d`, and `i-i-e-e` (`priv-i-lege`)!", whyEasy: "`privilege` comes from Latin *privus + lex* (law) — never spelled with a `d`!" },
        { prompt: "What does **EPHEMERAL** mean (classic UPCAT/ACET/NMAT vocabulary)?", options: ["Lasting for a very short time / fleeting", "Eternal and unchanging", "Extremely heavy", "Loud and boastful"], answer: "Lasting for a very short time / fleeting", hint: "Greek *ephemeros* = lasting only a day (like a mayfly or morning dew)!", whyEasy: "Ephemeral = brief, transient, short-lived (antonym: `perennial` / `perpetual`)!" },
        { prompt: "What does **UBIQUITOUS** mean?", options: ["Present or found everywhere at once", "Extremely rare and hidden", "Suspicious and secretive", "Outdated and obsolete"], answer: "Present or found everywhere at once", hint: "Latin *ubique* = everywhere (e.g., smartphones are ubiquitous today)!", whyEasy: "Ubiquitous = omnipresent, everywhere!" },
        { prompt: "How are **`San Jose, Luis`** and **`Santos, Anna`** ordered under strict prefix-merging alphabetical rules?", options: ["San Jose, Luis FIRST (`sanjose` < `santos`)", "Santos, Anna FIRST", "By first name only", "They tie identically"], answer: "San Jose, Luis FIRST (`sanjose` < `santos`)", hint: "Merge prefix `San Jose` → `sanjose`; compare `s-a-n-j` vs `s-a-n-t`!", whyEasy: "`j` comes before `t`, so `sanjose` files ahead of `santos`!" }
      ])
    });
  }

  // ==================== +10 CURATED OFFLINE-LATEX WORKED EXAMPLES ====================
  if (LATEX && typeof LATEX.registerWorkedExamples === "function") {
    LATEX.registerWorkedExamples({
      "exam-mechanical-technical-reasoning": {
        heroFormula: "$$F_1 d_1 = F_2 d_2, \\qquad N_1 T_1 = N_2 T_2, \\qquad \\text{MA}_{\\text{pulley}} = \\text{Supporting Strands}$$",
        title: "Solving a DOST-SEI Gear Ratio & Lever Torque Problem",
        problemLatex: "$$\\text{Gear A } (36\\text{ teeth}, 10\\text{ RPM CW}) \\leftrightarrow \\text{Gear B } (12\\text{ teeth}) \\implies N_B = ?$$",
        steps: [
          { label: "Determine direction flip", mathLatex: "$\\text{Directly meshing gears} \\implies \\text{CW} \\to \\mathbf{\\text{CCW}}$", plainWhy: "Interlocking teeth always push the adjacent gear in the opposite rotational sense." },
          { label: "Apply gear-tooth conservation", mathLatex: "$N_1 T_1 = N_2 T_2 \\implies 10(36) = N_B(12)$", plainWhy: "Every tooth passing the contact point on Gear A must advance one tooth on Gear B." },
          { label: "Solve for Gear B speed", mathLatex: "$N_B = \\frac{360}{12} = \\mathbf{30\\text{ RPM CCW}}$", plainWhy: "One-third the teeth means three times the rotational speed!" }
        ],
        answerLatex: "$$30\\text{ RPM Counterclockwise}$$",
        commonTrap: "Never forget that a single FIXED pulley has `MA = 1` (direction change only), NOT `MA = 2`!"
      },
      "exam-astronomy-stars-cosmos": {
        heroFormula: "$$4\\,^1\\text{H} \\longrightarrow \\,^4\\text{He} + \\text{Energy}, \\qquad T_{\\text{Blue (O)}} > T_{\\text{Yellow (G)}} > T_{\\text{Red (M)}}$$",
        title: "Predicting Star Fate & Surface Temperature on the H-R Diagram",
        problemLatex: "$$\\text{Compare } M = 1\\,M_{\\text{Sun}}\\text{ (Sun) vs. } M = 25\\,M_{\\text{Sun}}\\text{ Star Remnants}$$",
        steps: [
          { label: "Identify Main Sequence fuel", mathLatex: "$\\text{Core Fusion: } 4\\,\\text{H} \\to \\text{He}$", plainWhy: "Stars spend ~90% of their lives stably fusing hydrogen into helium." },
          { label: "Trace Sun-like low/medium mass fate", mathLatex: "$1\\,M_{\\text{Sun}} \\to \\text{Red Giant} \\to \\text{Planetary Nebula} \\to \\mathbf{\\text{White Dwarf}}$", plainWhy: "Below ~8 solar masses, stars shed outer gas peacefully without a supernova." },
          { label: "Trace massive star fate (> 8 solar masses)", mathLatex: "$25\\,M_{\\text{Sun}} \\to \\text{Red Supergiant} \\to \\text{Supernova} \\to \\mathbf{\\text{Black Hole}}$", plainWhy: "Core collapse triggers a supernova leaving a Neutron Star or Black Hole." }
        ],
        answerLatex: "$$\\text{Sun} \\to \\text{White Dwarf}; \\quad 25\\,M_{\\text{Sun}} \\to \\text{Supernova} \\to \\text{Black Hole}$$",
        commonTrap: "Red stars are the COOLEST, not hottest! Blue stars burn hottest and shortest!"
      },
      "exam-data-interpretation-experiments": {
        heroFormula: "$$\\text{\\% Change} = \\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100\\%, \\qquad \\text{DRY (Y)} \\; / \\; \\text{MIX (X)}$$",
        title: "Computing Chart Percent Change & Isolating Variables",
        problemLatex: "$$\\text{Sales rise } 40\\text{k} \\to 50\\text{k},\\text{ then drop } 50\\text{k} \\to 40\\text{k}$$",
        steps: [
          { label: "Compute % increase (Old = 40k)", mathLatex: "$\\frac{50 - 40}{40} \\times 100\\% = \\frac{10}{40} = \\mathbf{+25\\%}$", plainWhy: "Always divide by the starting value (`40k`)." },
          { label: "Compute % decrease (Old = 50k)", mathLatex: "$\\frac{40 - 50}{50} \\times 100\\% = \\frac{-10}{50} = \\mathbf{-20\\%}$", plainWhy: "Now the starting value is `50k`, so the same `10k` drop is only `−20%`!" },
          { label: "Check variable axis rule", mathLatex: "$\\text{X-axis} = \\text{Independent (Time)}, \\quad \\text{Y-axis} = \\text{Dependent (Sales)}$", plainWhy: "DRY MIX guarantees you never swap axes on DOST/UPCAT lab graphs." }
        ],
        answerLatex: "$$+25\\%\\text{ up}, \\quad -20\\%\\text{ down}$$",
        commonTrap: "Never divide percent change by the NEW value, and never change two independent variables at once!"
      },
      "exam-number-letter-series-patterns": {
        heroFormula: "$$\\Delta_1 = a_{n+1} - a_n, \\qquad \\Delta_2 = \\Delta_{1,n+1} - \\Delta_{1,n}, \\qquad \\text{EJOTY} = 5, 10, 15, 20, 25$$",
        title: "Cracking Second-Order & Interleaved Exam Series in 15 Seconds",
        problemLatex: "$$\\text{Find next: } 3,\\; 7,\\; 13,\\; 21,\\; 31,\\; \\text{?}$$",
        steps: [
          { label: "Compute first differences", mathLatex: "$7-3 = 4, \\quad 13-7 = 6, \\quad 21-13 = 8, \\quad 31-21 = 10$", plainWhy: "Differences are not constant yet, so check one level deeper." },
          { label: "Spot constant second difference", mathLatex: "$\\Delta_2 = +2 \\implies \\text{Next jump} = 10 + 2 = \\mathbf{+12}$", plainWhy: "Each jump grows neatly by `+2`." },
          { label: "Add jump to final term", mathLatex: "$31 + 12 = \\mathbf{43}$", plainWhy: "Verify quickly: `n² + n + 1` gives `3, 7, 13, 21, 31, 43`!" }
        ],
        answerLatex: "$$43$$",
        commonTrap: "When a series zigzags up and down (`5, 24, 9, 20...`), stop subtracting neighbors and split odd/even positions!"
      },
      "exam-word-problems-work-mixture-motion": {
        heroFormula: "$$\\frac{1}{A} + \\frac{1}{B} = \\frac{1}{T} \\implies T = \\frac{AB}{A + B}, \\qquad C_1 V_1 + C_2 V_2 = C_f(V_1 + V_2)$$",
        title: "Solving Combined Work Rate & Successive Discounts",
        problemLatex: "$$\\text{Pipe A} = 6\\text{ h}, \\; \\text{Pipe B} = 3\\text{ h} \\implies T_{\\text{together}} = ?$$",
        steps: [
          { label: "Convert solo times into hourly rates", mathLatex: "$r_A = \\frac{1}{6}\\text{ tank/h}, \\quad r_B = \\frac{1}{3}\\text{ tank/h}$", plainWhy: "You can NEVER add or average times — you must add rates!" },
          { label: "Add rates or plug into AB/(A+B)", mathLatex: "$T = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = \\mathbf{2\\text{ hours}}$", plainWhy: "Combined rate is `1/6 + 2/6 = 3/6 = 1/2` tank per hour → 2 hours!" },
          { label: "Sanity-check against faster pipe", mathLatex: "$2\\text{ h} < 3\\text{ h (Pipe B solo)} \\; \\checkmark$", plainWhy: "Working together must ALWAYS finish faster than the fastest solo worker." }
        ],
        answerLatex: "$$2\\text{ hours}$$",
        commonTrap: "Averaging `(6 + 3)/2 = 4.5 h` is the #1 CSE/UPCAT math mistake!"
      },
      "exam-paragraph-org-error-spotting": {
        heroFormula: "$$\\text{The number of } X \\implies \\mathbf{\\text{IS}}, \\qquad \\text{A number of } X \\implies \\mathbf{\\text{ARE}}$$",
        title: "Diagnosing Subject-Verb Agreement & Paragraph Cohesion",
        problemLatex: "$$\\text{Neither the coach nor the players (was / were) late.}$$",
        steps: [
          { label: "Identify correlative pair", mathLatex: "$\\text{Neither } S_1 \\text{ nor } S_2 \\implies \\text{Match } S_2\\text{ (closer subject)}$", plainWhy: "Proximity rule governs `neither...nor` and `either...or`." },
          { label: "Check number of closer subject", mathLatex: "$S_2 = \\text{players (plural)} \\implies \\mathbf{\\text{were}}$", plainWhy: "If reversed (`Neither the players nor the coach`), the verb would flip to singular `was`!" },
          { label: "Verify paragraph-order opener", mathLatex: "$\\text{Opener} \\neq \\{\\text{However, This, Therefore, He}\\}$", plainWhy: "Eliminate any option starting with a dangling transition or undefined pronoun." }
        ],
        answerLatex: "$$\\text{were (matches plural 'players')}$$",
        commonTrap: "Ignore `as well as` / `along with` phrases — they NEVER make a singular subject plural!"
      },
      "exam-nmat-perceptual-acuity": {
        heroFormula: "$$t_{\\text{mirror}} = 11\\text{:}60 - t_{\\text{real}}, \\qquad \\text{Vertical Mirror: } (x, y) \\to (-x, y)$$",
        title: "Solving NMAT Mirror Clocks & Reflection Parity Instantly",
        problemLatex: "$$\\text{Real Clock} = 3\\text{:}15 \\implies \\text{Vertical Mirror Time} = ?$$",
        steps: [
          { label: "Apply vertical reflection invariant", mathLatex: "$(x, y) \\to (-x, y) \\implies \\text{Left} \\leftrightarrow \\text{Right only}$", plainWhy: "Top (12) and Bottom (6) stay fixed; 3 swaps with 9." },
          { label: "Use the 11:60 mirror subtraction shortcut", mathLatex: "$11\\text{:}60 - 3\\text{:}15 = (11 - 3)\\text{:}(60 - 15)$", plainWhy: "Borrowing 60 minutes from 12:00 handles any non-zero minute cleanly." },
          { label: "Read reflected clock time", mathLatex: "$\\mathbf{8\\text{:}45}$", plainWhy: "Minute hand at 15 mirrors to 45; hour hand slightly past 3 mirrors slightly before 9 (8:45)!" }
        ],
        answerLatex: "$$8\\text{:}45$$",
        commonTrap: "Do NOT subtract from 12:00 and answer `9:45` — at 3:15 the hour hand has already moved a quarter past 3!"
      },
      "exam-nmat-social-science-psych-soc": {
        heroFormula: "$$\\text{Reinforcement} \\implies \\text{Behavior} \\uparrow, \\qquad \\text{Punishment} \\implies \\text{Behavior} \\downarrow$$",
        title: "Classifying Any Skinner Operant Conditioning Scenario in 2 Steps",
        problemLatex: "$$\\text{Fasten seatbelt} \\xrightarrow{\\text{stops loud beep}} \\text{Buckling increases}$$",
        steps: [
          { label: "Step 1: Check behavior direction", mathLatex: "$\\text{Buckling} \\uparrow \\implies \\mathbf{\\text{Reinforcement}}$", plainWhy: "Anything that strengthens or increases future behavior is Reinforcement." },
          { label: "Step 2: Check whether stimulus is added or removed", mathLatex: "$\\text{Loud beep REMOVED } (-) \\implies \\mathbf{\\text{Negative}}$", plainWhy: "In Operant Conditioning, `Positive = + (add)` and `Negative = − (remove)`." },
          { label: "Combine both labels", mathLatex: "$\\text{Negative} + \\text{Reinforcement} = \\mathbf{\\text{Negative Reinforcement}}$", plainWhy: "Never confuse Negative Reinforcement with Punishment!" }
        ],
        answerLatex: "$$\\text{Negative Reinforcement}$$",
        commonTrap: "Scolding someone is Positive Punishment (adds aversive stimulus to decrease behavior), NOT Negative Reinforcement!"
      },
      "exam-cse-ra6713-civics-env-laws": {
        heroFormula: "$$\\text{RA 6713: } 15\\text{ work days}, \\; \\text{SALN } \\le \\text{Apr 30}, \\quad \\text{CSE Pass} \\ge 80.00\\%$$",
        title: "Checking RA 6713 Statutory Deadlines & PH Environmental Laws",
        problemLatex: "$$\\text{Match: Public Reply, Annual SALN, Solid Waste, Clean Air, Clean Water}$$",
        steps: [
          { label: "Lock RA 6713 service & SALN windows", mathLatex: "$\\text{Reply} \\le 15\\text{ working days (max 3 signatories)}; \\; \\text{SALN} \\le \\text{April 30}$", plainWhy: "Assumption/separation SALN = 30 days; conflict-of-interest divestment = 60 days." },
          { label: "Map PH Environmental Republic Acts", mathLatex: "$\\text{8749 (Air)} \\to \\text{9003 (Waste)} \\to \\text{9275 (Water)} \\to \\text{9729 (Climate)}$", plainWhy: "Ascending law numbers match chronological enactment (1999 → 2000 → 2004 → 2009)!" },
          { label: "Verify CSE passing benchmark", mathLatex: "$\\text{General Rating} \\ge \\mathbf{80.00\\%}$", plainWhy: "Applies to both Professional (150 scored) and Sub-Professional (145 scored) tests." }
        ],
        answerLatex: "$$15\\text{d Reply} \\cdot \\text{Apr 30 SALN} \\cdot 8749/9003/9275/9729$$",
        commonTrap: "Do NOT confuse the April 15 BIR Income Tax deadline with the April 30 RA 6713 SALN deadline!"
      },
      "exam-cse-clerical-filing-vocabulary": {
        heroFormula: "$$\\text{Unit 1: Surname (merged prefix)} \\to \\text{Unit 2: First Name} \\to \\text{Unit 3: Middle}$$",
        title: "Indexing Tricky Filipino Names & Corporate Titles for CSE",
        problemLatex: "$$\\text{Order: Dr. Juan Dela Cruz, Ana De Castro, The Manila Bank}$$",
        steps: [
          { label: "Normalize personal names (invert & strip titles)", mathLatex: "$\\text{decastro, ana} \\quad \\text{vs.} \\quad \\text{delacruz, juan (Dr.)}$", plainWhy: "Merge prefixes (`De Castro` → `decastro`) as one solid unit and ignore `Dr.`." },
          { label: "Normalize corporate name (move leading 'The')", mathLatex: "$\\text{The Manila Bank} \\implies \\text{manila | bank | (the)}$", plainWhy: "Leading `The` is NEVER used as the first indexing unit." },
          { label: "Compare letter by letter", mathLatex: "$\\mathbf{1.}\\;\\text{decastro} \\; < \\; \\mathbf{2.}\\;\\text{delacruz} \\; < \\; \\mathbf{3.}\\;\\text{manila}$", plainWhy: "`d-e-c` precedes `d-e-l`, and both precede `m`!" }
        ],
        answerLatex: "$$\\text{Ana De Castro} \\to \\text{Dr. Juan Dela Cruz} \\to \\text{The Manila Bank}$$",
        commonTrap: "Never file `The Manila Bank` under `T`, and remember Nothing-Before-Something (`Cruz` < `Cruzado`)!"
      }
    });
  }
})(typeof window !== "undefined" ? window : globalThis);
