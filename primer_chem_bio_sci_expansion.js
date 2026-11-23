// Primer Studio — Deep Equations & Formulas Expansion II: Chemistry (+7), Biology (+6) & General/Earth/Space Science (+6)
// Adds 19 ultra-detailed, friendly, formula-rich lessons (orders 238–256), 95 curated questions,
// 19 procedural generators, 19 LaTeX worked examples, 8 classic traps, 30 formula cards & 6 Work Studio derivations.
(function (root) {
  "use strict";

  const DATA = root.MATHLINGO_DATA;
  const LATEX = root.MATHLINGO_LATEX;
  const WORK_STUDIO = root.PRIMER_WORK_STUDIO;
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
    const it = pick(items);
    return {
      type: "mc",
      prompt: it.prompt,
      options: shuffle(it.options),
      answer: it.answer,
      hint: it.hint,
      whyEasy: it.whyEasy
    };
  }

  function numOpts(ans, deltas, fmt) {
    const format = fmt || ((v) => String(v));
    const s = new Set([format(ans)]);
    for (const d of shuffle(deltas || [-3, -2, -1, 1, 2, 3, 4])) {
      if (s.size >= 4) break;
      const cand = Math.round((ans + d) * 1000) / 1000;
      if (cand !== ans) s.add(format(cand));
    }
    let k = 1;
    while (s.size < 4) {
      s.add(format(Math.round((ans + k) * 1000) / 1000));
      k++;
    }
    return shuffle(Array.from(s));
  }

  // ==================== 19 NEW CHEM, BIO & SCIENCE NODES (ORDERS 238–256) ====================
  const CHEM_BIO_SCI_NODES = [
    // ---------- CHEMISTRY (+7 NODES: 238–244) ----------
    {
      id: "chem-buffers-titration-henderson",
      worldId: "chemistry",
      order: 238,
      title: "Buffers, Titrations & Henderson-Hasselbalch Equation",
      icon: "🧪",
      tagline: "How your blood holds pH 7.40 against sour foods & lactic acid — pH = pK_a + log([A⁻]/[HA]) decoded!",
      scaryVersion: "Weak acid-base equilibria (Ka, Kb, Kw), Henderson-Hasselbalch buffer capacity, and titration curve equivalence landmarks.",
      easyTruth: "Drop a tiny bit of lemon juice into plain water and the pH plunges from 7 to 3! Drop it into your blood and the pH barely nudges by 0.01! Why? A **Buffer** is a chemical bodyguard team made of a weak acid (`HA`, which neutralizes added base) AND its conjugate base (`A⁻`, which soaks up added acid) swimming together in harmony!",
      microSteps: [
        { label: "Step 1: Weak Acids (`K_a`), Weak Bases (`K_b`) & `K_a · K_b = 10⁻¹⁴`", text: "Unlike strong acids (HCl, HNO₃) that split 100%, weak acids only partially ionize: `HA ⇌ H⁺ + A⁻` with **`K_a = [H⁺][A⁻] / [HA]`**. Take `−log` to get the friendly scale **`pK_a = −log K_a`** (smaller `pK_a` = stronger acid!). For any conjugate pair at `25°C`, **`K_a · K_b = K_w = 10⁻¹⁴`** and **`pK_a + pK_b = 14`**!" },
        { label: "Step 2: Henderson-Hasselbalch (`pH = pK_a + log([A⁻]/[HA])`)", text: "Taking `−log` of `K_a` gives the superstar buffer equation: **`pH = pK_a + log([A⁻] / [HA])`**! Look how intuitive it is: when `[A⁻] = [HA]` (50/50 split), `log(1) = 0` so **`pH = pK_a`**! If base is `10×` more abundant (`10:1`), `pH = pK_a + 1`; if acid is `10×` more abundant (`1:10`), `pH = pK_a − 1`!" },
        { label: "Step 3: Titration Curve Landmarks (Half-Equivalence vs Equivalence)", text: "When titrating a weak acid `HA` with strong base `NaOH`: 1) At the **Half-Equivalence Point** (half of `HA` converted to `A⁻`), `[A⁻] = [HA]` so **`pH = pK_a`** (maximum buffer resistance!). 2) At the **Equivalence Point** (`mol acid = mol base`, `M₁V₁ = M₂V₂`), ONLY conjugate base `A⁻` remains — so a weak acid + strong base equivalence point is ALWAYS **BASIC (`pH > 7`)**!" },
        { label: "Step 4: Choosing a Buffer & Your Blood's Bicarbonate Shield", text: "A buffer works best within **`pH = pK_a ± 1`** (`[A⁻]/[HA]` between `0.1` and `10`). Human blood uses the carbonic acid / bicarbonate buffer (`H₂CO₃ / HCO₃⁻`, effective `pK_a ≈ 6.1` with a `20:1` ratio) to lock blood strictly at `pH 7.35–7.45`!" }
      ],
      cheatCode: "pH = pK_a + log([A⁻]/[HA]). Equal [A⁻]=[HA] → pH = pK_a (half-equivalence!). Best buffer zone: pK_a ± 1. Weak acid + strong base equiv point: pH > 7. pK_a + pK_b = 14!",
      visualizerId: "chemistryAtomPhLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "A buffer has `pK_a = 4.74` with `[A⁻] = 1.0 M` and `[HA] = 0.10 M` (`10:1` ratio). What is its exact `pH`?", options: ["5.74 (4.74 + log 10 = 4.74 + 1)", "3.74", "4.74", "6.74"], answer: "5.74 (4.74 + log 10 = 4.74 + 1)", hint: "Plug `[A⁻]/[HA] = 10` into `pH = pK_a + log(10)`!", whyEasy: "`log(10) = +1`, so `pH = 4.74 + 1 = 5.74`!" },
        { type: "mc", prompt: "During a titration of weak acetic acid (`pK_a = 4.76`) with `NaOH`, what is the `pH` right at the **Half-Equivalence Point**?", options: ["4.76 (pH = pK_a because [A⁻] = [HA]!)", "7.00", "9.24", "2.38"], answer: "4.76 (pH = pK_a because [A⁻] = [HA]!)", hint: "Half the acid has turned into conjugate base, so `[A⁻]/[HA] = 1`!", whyEasy: "`log(1) = 0`, making `pH = pK_a = 4.76` instantly!" },
        { type: "mc", prompt: "At the **Equivalence Point** of titrating a WEAK acid (`HF`) with a STRONG base (`NaOH`), the `pH` of the solution is:", options: ["Greater than 7 (basic, because conjugate base F⁻ hydrolyzes water!)", "Exactly 7.00", "Less than 7 (acidic)", "Equal to pK_a"], answer: "Greater than 7 (basic, because conjugate base F⁻ hydrolyzes water!)", hint: "Once all `HF` reacts with `NaOH`, what species is left swimming in the flask?", whyEasy: "Only weak conjugate base `F⁻` remains, which grabs `H⁺` from water to release `OH⁻` (`pH > 7`)!" },
        { type: "mc", prompt: "If a weak acid has `pK_a = 5.0` at `25°C`, what is the `pK_b` of its conjugate base `A⁻`?", options: ["9.0 (pK_a + pK_b = 14)", "5.0", "19.0", "2.8"], answer: "9.0 (pK_a + pK_b = 14)", hint: "Conjugate pairs obey `pK_a + pK_b = 14` at `25°C`!", whyEasy: "`14 − 5.0 = 9.0`!" },
        { type: "mc", prompt: "Which weak acid is the BEST choice to build a buffer centered at `pH = 7.2`?", options: ["H₂PO₄⁻ (pK_a = 7.21 — right on target!)", "Acetic acid (pK_a = 4.76)", "Formic acid (pK_a = 3.75)", "Ammonium NH₄⁺ (pK_a = 9.25)"], answer: "H₂PO₄⁻ (pK_a = 7.21 — right on target!)", hint: "Pick the acid whose `pK_a` is closest to your desired `pH` (within `±1`)!", whyEasy: "Phosphate's `pK_a = 7.21` sits right on `7.2`, maximizing buffering against both acids and bases!" }
      ]
    },
    {
      id: "chem-electrochemistry-nernst-faraday",
      worldId: "chemistry",
      order: 239,
      title: "Electrochemistry: Cell Voltage E°, Nernst & Faraday's Law",
      icon: "🔋",
      tagline: "How lithium batteries generate voltage, why dead batteries hit Q = K & how electricity plates solid gold onto jewelry!",
      scaryVersion: "Standard reduction potentials, galvanic/electrolytic thermodynamics (ΔG° = −nFE°), Nernst non-standard cell potentials, and Faraday's electrolysis.",
      easyTruth: "A battery is just a redox tug-of-war split into two separate rooms connected by a wire! The metal that wants electrons MORE (**Cathode — Reduction**) pulls electrons through your phone from the metal willing to give them up (**Anode — Oxidation**). **Nernst** tells you how voltage drops as the battery drains, and **Faraday** counts exact grams of metal plated by electric current!",
      microSteps: [
        { label: "Step 1: Galvanic Cell Voltage (`E°_cell = E°_cathode − E°_anode`)", text: "Remember **AN OX** (Anode = Oxidation) and **RED CAT** (Reduction = Cathode)! Electrons ALWAYS flow Anode → Cathode. Using standard reduction potentials: **`E°_cell = E°_red(cathode) − E°_red(anode)`**. Crucial rule: **NEVER multiply `E°` by stoichiometric coefficients** (voltage is intensive, like density!). Positive `E°_cell > 0` = spontaneous battery!" },
        { label: "Step 2: Linking Electricity to Gibbs Free Energy (`ΔG° = −nFE°`)", text: "Electrical work equals `−ΔG°`: **`ΔG° = −n F E°_cell`**, where `n` = moles of electrons transferred and Faraday's constant **`F = 96,485 C/mol e⁻`**! Notice the minus sign: spontaneous reactions have **`E° > 0`**, **`ΔG° < 0`**, and **`K > 1`**! Linking to `ΔG° = −RT ln K` at `25°C` gives **`E°_cell = (0.0592 / n) log K`**." },
        { label: "Step 3: The Nernst Equation (`E = E° − (0.0592 / n) log Q`)", text: "Batteries don't stay at `1 M` standard concentrations forever! At `298 K`, **`E = E° − (0.0592 / n) log Q`**. As products pile up (`Q ↑`), voltage `E` steadily falls. When the battery finally dies (`E = 0`), `Q = K` — chemical equilibrium! Raising reactant concentration (`Q ↓`) actually *boosts* voltage above `E°`!" },
        { label: "Step 4: Faraday's Law of Electrolysis (`m = I·t·M / (n·F)`)", text: "Running electricity backward forces non-spontaneous reactions (charging a phone or electroplating silver!). Total charge `Q = I · t` (Amps × seconds = Coulombs). Moles of electrons = `Q / F`, so moles of metal plated = `Q / (n F)`, and mass plated is **`m = (I · t · M) / (n · F)`**!" }
      ],
      cheatCode: "E°_cell = E°_cat − E°_an (NEVER multiply E°!). ΔG° = −nFE° (E°>0 ⇔ ΔG°<0 ⇔ K>1). Nernst (298K): E = E° − (0.0592/n) log Q. Electrolysis: m = I·t·M / (n·F), F = 96,485 C/mol!",
      visualizerId: "electroMagLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Given `Cu²⁺ + 2e⁻ → Cu` (`E° = +0.34 V`) and `Zn²⁺ + 2e⁻ → Zn` (`E° = −0.76 V`), what is `E°_cell` for the spontaneous Zn–Cu galvanic battery?", options: ["+1.10 V (+0.34 − (−0.76))", "−0.42 V", "+0.42 V", "−1.10 V"], answer: "+1.10 V (+0.34 − (−0.76))", hint: "Higher `E°` (`Cu²⁺`) is Cathode; subtract `E°_cathode − E°_anode`!", whyEasy: "`0.34 − (−0.76) = +1.10 V` (the classic Daniell Cell!)!" },
        { type: "mc", prompt: "In a galvanic cell, if you double a balanced half-reaction (`2 Ag⁺ + 2e⁻ → 2 Ag`), what happens to its standard reduction potential `E° = +0.80 V`?", options: ["Stays exactly +0.80 V (voltage is an INTENSIVE property!)", "Doubles to +1.60 V", "Cuts in half to +0.40 V", "Squares to +0.64 V"], answer: "Stays exactly +0.80 V (voltage is an INTENSIVE property!)", hint: "Does wiring two identical AA batteries in parallel double their 1.5 V potential?", whyEasy: "`E° = J/C` is energy PER coulomb — doubling moles doubles both J and C, so `E°` stays `+0.80 V`!" },
        { type: "mc", prompt: "When a galvanic battery has completely run DEAD (`E_cell = 0 V`), what is true about its reaction quotient `Q`?", options: ["Q = K (the reaction has reached equilibrium!)", "Q = 0", "E°_cell has become 0", "n = 0"], answer: "Q = K (the reaction has reached equilibrium!)", hint: "Plug `E = 0` into `E = E° − (0.0592/n) log Q`!", whyEasy: "At `Q = K`, forward and reverse driving forces tie (`ΔG = 0`), so voltage hits `0 V`!" },
        { type: "mc", prompt: "A cell with `n = 2` electrons has `E° = +1.00 V`. Using `E = E° − (0.0592/n) log Q`, what is `E` when `Q = 100` (`log 100 = 2`)?", options: ["+0.941 V (1.00 − 0.0592)", "+1.059 V", "+0.882 V", "+1.000 V"], answer: "+0.941 V (1.00 − 0.0592)", hint: "Compute `(0.0592 / 2) × 2 = 0.0592` and subtract from `1.00`!", whyEasy: "`1.00 − (0.0592/2)(2) = 1.00 − 0.0592 ≈ 0.941 V`!" },
        { type: "mc", prompt: "Passing `2.0` moles of electrons (`2F` Coulombs) through molten `Al³⁺` (`Al³⁺ + 3e⁻ → Al`) plates how many moles of solid aluminum?", options: ["2/3 mol (each Al atom needs 3 electrons!)", "2 mol", "6 mol", "3 mol"], answer: "2/3 mol (each Al atom needs 3 electrons!)", hint: "Divide moles of electrons by `n = 3`!", whyEasy: "`mol Al = (mol e⁻) / 3 = 2/3 mol`!" }
      ]
    },
    {
      id: "chem-solubility-ksp-common-ion",
      worldId: "chemistry",
      order: 240,
      title: "Solubility Equilibria (K_sp), Precipitates & Common-Ion Effect",
      icon: "💎",
      tagline: "Predict whether cloudy crystals will crash out of solution (Q vs K_sp) & master the 1:1 (s²), 1:2 (4s³) & 1:3 (27s⁴) shortcuts!",
      scaryVersion: "Heterogeneous solubility product constants Ksp, stoichiometric molar solubility conversion, precipitation reaction quotient Qsp, and common-ion suppression.",
      easyTruth: "Even 'insoluble' chalk or silver chloride secretly dissolves just a tiny whisper of ions into water until the water gets saturated! **`K_sp`** is the saturation speed-limit: multiply the dissolved ion concentrations — if your current mix **`Q_sp > K_sp`**, the water is overcrowded and solid crystals immediately snow out as a precipitate!",
      microSteps: [
        { label: "Step 1: Writing `K_sp` (Solids NEVER Appear!)", text: "For any sparingly soluble salt `A_a B_b (s) ⇌ a A^(b+) (aq) + b B^(a−) (aq)`, the pure solid is omitted so **`K_sp = [A]^a [B]^b`**. Example: `PbCl₂(s) ⇌ Pb²⁺ + 2 Cl⁻` gives `K_sp = [Pb²⁺][Cl⁻]²`. Don't forget BOTH the coefficient AND the exponent!" },
        { label: "Step 2: Converting `K_sp ↔` Molar Solubility `s` (3 Golden Shortcuts)", text: "Let `s` = moles of solid dissolved per liter (`mol/L`): 1) **1:1 salt** (`AgCl → s, s`): **`K_sp = s²`** (`s = √K_sp`). 2) **1:2 salt** (`PbCl₂ → s, 2s`): `K_sp = (s)(2s)² =` **`4s³`**! 3) **1:3 salt** (`Fe(OH)₃ → s, 3s`): `K_sp = (s)(3s)³ =` **`27s⁴`**! Never compare `K_sp` values directly unless the salts have the SAME ion ratio!" },
        { label: "Step 3: Precipitate Predictor (`Q_sp` vs `K_sp`)", text: "Compute the Ion Product `Q_sp` using current mixed concentrations: • **`Q_sp < K_sp`**: unsaturated (no precipitate, more can dissolve). • **`Q_sp = K_sp`**: saturated equilibrium. • **`Q_sp > K_sp`**: supersaturated → **PRECIPITATE FORMS** until `Q` falls back to `K_sp`!" },
        { label: "Step 4: Common-Ion Effect & Acid/pH Boost", text: "Try dissolving `AgCl` in salty `NaCl` water instead of pure water: the extra `Cl⁻` (common ion) pushes equilibrium LEFT by Le Chatelier, **dramatically LOWERING solubility** (even though `K_sp` itself stays constant at fixed `T`!). Conversely, adding **acid** (`H⁺`) eats up basic anions like `OH⁻`, `CO₃²⁻`, or `F⁻`, pulling equilibrium RIGHT and **increasing solubility**!" }
      ],
      cheatCode: "Solids omitted! 1:1 → K_sp = s²; 1:2 → K_sp = 4s³; 1:3 → K_sp = 27s⁴. Q_sp > K_sp → PRECIPITATE! Common ion ↓ solubility (K_sp unchanged). Acid ↑ solubility of basic salts!",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "For the 1:2 salt `CaF₂(s) ⇌ Ca²⁺ + 2 F⁻` with molar solubility `s`, what is `K_sp` in terms of `s`?", options: ["4s³ ((s)(2s)² = 4s³!)", "2s³", "s³", "4s²"], answer: "4s³ ((s)(2s)² = 4s³!)", hint: "`[Ca²⁺] = s` and `[F⁻] = 2s`, so plug into `[Ca²⁺][F⁻]²`!", whyEasy: "`(s)(2s)² = s · 4s² = 4s³` — remember to square the `2` as well as the `s`!" },
        { type: "mc", prompt: "Silver chloride (`AgCl`, 1:1 salt) has `K_sp = 1.6 × 10⁻¹⁰` (approximated cleanly as `1.6 × 10⁻¹⁰`). What is its molar solubility `s` in pure water?", options: ["1.26 × 10⁻⁵ M (√(1.6 × 10⁻¹⁰))", "1.6 × 10⁻¹⁰ M", "8.0 × 10⁻⁶ M", "4.0 × 10⁻⁵ M"], answer: "1.26 × 10⁻⁵ M (√(1.6 × 10⁻¹⁰))", hint: "For a 1:1 salt, `K_sp = s² → s = √(K_sp)` (`√1.6 ≈ 1.26` and `√10⁻¹⁰ = 10⁻⁵`)!", whyEasy: "`√(1.6 × 10⁻¹⁰) ≈ 1.26 × 10⁻⁵ M`!" },
        { type: "mc", prompt: "You mix two clear solutions and calculate `Q_sp = 5 × 10⁻⁶`, while `K_sp = 1 × 10⁻⁸`. What happens immediately?", options: ["A solid PRECIPITATE forms (Q_sp > K_sp!)", "The solution stays completely clear and unsaturated", "More solid dissolves rapidly", "K_sp increases to match Q_sp"], answer: "A solid PRECIPITATE forms (Q_sp > K_sp!)", hint: "Compare `5 × 10⁻⁶` vs `1 × 10⁻⁸` (`10⁻⁶` is 500× larger than `10⁻⁸`!)!", whyEasy: "Since `Q_sp > K_sp`, the water is overcrowded with ions and precipitates solid crystals!" },
        { type: "mc", prompt: "What happens when you try to dissolve solid `AgCl` in `0.10 M NaCl` instead of pure water?", options: ["AgCl becomes LESS soluble (Common-Ion Effect from Cl⁻), while K_sp stays unchanged!", "AgCl dissolves much faster", "K_sp decreases by 10×", "Na⁺ forces Cl⁻ to evaporate"], answer: "AgCl becomes LESS soluble (Common-Ion Effect from Cl⁻), while K_sp stays unchanged!", hint: "Extra `Cl⁻` shifts `AgCl(s) ⇌ Ag⁺ + Cl⁻` to the LEFT, and only temperature changes `K_sp`!", whyEasy: "The common ion `Cl⁻` suppresses dissolving via Le Chatelier, while `K_sp` depends strictly on temperature!" },
        { type: "mc", prompt: "Why does adding strong acid (`HCl`) dramatically INCREASE the solubility of chalk (`CaCO₃`) and tooth enamel (`Ca₅(PO₄)₃OH`)?", options: ["H⁺ neutralizes the basic anion (CO₃²⁻ / OH⁻), removing product and pulling equilibrium RIGHT!", "H⁺ raises K_sp permanently", "Acid increases common-ion Cl⁻", "Acid turns water nonpolar"], answer: "H⁺ neutralizes the basic anion (CO₃²⁻ / OH⁻), removing product and pulling equilibrium RIGHT!", hint: "What happens when you remove a product from an equilibrium?", whyEasy: "By Le Chatelier, consuming `CO₃²⁻` or `OH⁻` pulls more solid salt into solution to replace it!" }
      ]
    },
    {
      id: "chem-hess-calorimetry-bond-enthalpy",
      worldId: "chemistry",
      order: 241,
      title: "Thermochemistry: Calorimetry, Hess's Law & Bond Enthalpies",
      icon: "🌡️",
      tagline: "Track every Joule of heat — q = mcΔT, heating curves, Hess's Products−Reactants & 'Broken minus Formed'!",
      scaryVersion: "Constant-pressure/volume calorimetry, latent heat phase plateaus, Hess's law state-function summation, and mean bond dissociation enthalpies.",
      easyTruth: "Energy is like money in a bank account: it NEVER disappears, it only moves between the reaction (**System**) and the water bath (**Surroundings**): `q_sys = −q_surr`! And because Enthalpy `H` is a **State Function** (only start and finish matter, like elevation gain up a mountain!), **Hess's Law** lets you add tiny known reactions like LEGO bricks to measure any reaction's heat!",
      microSteps: [
        { label: "Step 1: Calorimetry (`q = m c ΔT`) & Latent Heat (`q = m L`)", text: "Warming a substance without changing phase uses **`q = m c ΔT`** (water's huge specific heat `c = 4.184 J/(g·°C)`!). Melting or boiling happens at **CONSTANT temperature (`ΔT = 0`)** using **`q = m L_f`** (fusion) or **`q = m L_v`** (vaporization). In a coffee-cup calorimeter: **`q_rxn = −q_water = −m c ΔT`** (if water warms up, the reaction is **Exothermic, `ΔH < 0`**!)." },
        { label: "Step 2: Hess's Law (3 Simple Rules for Stacking Reactions)", text: "1) **Reverse** a reaction → **flip the sign** of `ΔH`. 2) **Multiply** a reaction by `k` → **multiply `ΔH` by `k`**. 3) **Add** two reactions → **add their `ΔH` values** (canceling intermediates on opposite sides)!" },
        { label: "Step 3: Standard Enthalpy of Formation (`Products − Reactants`)", text: "Using tabulated `ΔH°_f` (heat to build 1 mole from pure elements in standard states — remember **`ΔH°_f = 0`** for pure elements like `O₂(g)`, `N₂(g)`, `C(graphite)`!): **`ΔH°_rxn = Σ n ΔH°_f(Products) − Σ m ΔH°_f(Reactants)`**." },
        { label: "Step 4: Bond Enthalpies (`Broken − Formed` — Watch the Flip!)", text: "Breaking a bond ALWAYS costs energy (`+`, endothermic — like snapping a magnet apart!). Forming a bond ALWAYS releases energy (`−`, exothermic!). So **`ΔH_rxn ≈ Σ D(Bonds BROKEN in Reactants) − Σ D(Bonds FORMED in Products)`**! Notice it's **Reactants − Products** here — the exact reverse of `ΔH°_f`!" }
      ],
      cheatCode: "q = mcΔT (phase flat: q = mL); q_rxn = −q_water. Hess: ΔH°_rxn = ΣΔH°_f(Prod) − ΣΔH°_f(React) (elements = 0!). Bond Enthalpy FLIPS: ΔH ≈ Σ(Broken) − Σ(Formed)!",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "You dissolve a salt in a water calorimeter and the thermometer temperature **RISES** from `22°C` to `30°C`. What is true about the dissolving reaction?", options: ["Exothermic (ΔH < 0) — the reaction released heat INTO the water!", "Endothermic (ΔH > 0)", "ΔH = 0", "Water lost heat to the reaction"], answer: "Exothermic (ΔH < 0) — the reaction released heat INTO the water!", hint: "You are measuring the WATER (surroundings), so `q_rxn = −q_water`!", whyEasy: "Water gained heat (`q_water > 0`), which means the reaction gave off heat (`q_rxn < 0`, exothermic)!" },
        { type: "mc", prompt: "When computing `ΔH_rxn` from **Bond Enthalpies**, which subtraction order is physically correct?", options: ["Σ D(Bonds BROKEN) − Σ D(Bonds FORMED)", "Σ D(Bonds FORMED) − Σ D(Bonds BROKEN)", "Σ D(Products) + Σ D(Reactants)", "Products divided by Reactants"], answer: "Σ D(Bonds BROKEN) − Σ D(Bonds FORMED)", hint: "Breaking bonds costs `+` energy; forming bonds pays back `−` energy!", whyEasy: "Always **`Broken − Formed`** (Reactants minus Products) — if new bonds are stronger, `ΔH < 0` (exothermic)!" },
        { type: "mc", prompt: "Which substance has a Standard Enthalpy of Formation `ΔH°_f` equal to **EXACTLY ZERO** at `25°C, 1 atm`?", options: ["O₂(g) (pure element in its most stable standard state!)", "H₂O(l)", "CO₂(g)", "O₃(g) (ozone)"], answer: "O₂(g) (pure element in its most stable standard state!)", hint: "Zero heat is needed to form an element from itself in its most stable form!", whyEasy: "`O₂(g)` is oxygen's standard reference form (`ΔH°_f = 0`); `O₃(g)` and compounds are non-zero!" },
        { type: "input", prompt: "How many Joules (`q = m c ΔT`) heat `50 g` of water (`c = 4.2 J/(g·°C)`) by `ΔT = 10°C`?", answer: "2100", hint: "Multiply `50 × 4.2 × 10`!", whyEasy: "`50 × 10 = 500`, and `500 × 4.2 = 2100 J` (`2.1 kJ`)!" },
        { type: "mc", prompt: "If reaction `A → B` has `ΔH = −120 kJ`, what is `ΔH` for the reversed and doubled reaction `2 B → 2 A`?", options: ["+240 kJ (flip sign AND multiply by 2!)", "−240 kJ", "+60 kJ", "−60 kJ"], answer: "+240 kJ (flip sign AND multiply by 2!)", hint: "Reversing flips `−` to `+`; doubling scales magnitude by `2×`!", whyEasy: "`−(−120) × 2 = +240 kJ`!" }
      ]
    },
    {
      id: "chem-arrhenius-integrated-rate-laws",
      worldId: "chemistry",
      order: 242,
      title: "Integrated Rate Laws, Half-Lives & Arrhenius Equation",
      icon: "⏱️",
      tagline: "Predict exact concentrations after any time t, spot 0th/1st/2nd order straight-line plots & unlock k = A e^(−E_a/RT)!",
      scaryVersion: "Zero-, first-, and second-order integrated rate equations, concentration-dependent half-lives, and Arrhenius activation energy kinetics.",
      easyTruth: "Differential rate laws tell you speed *right now*, while **Integrated Rate Laws** act like a crystal ball telling you how much chemical is left after 10 minutes or 5,000 years! Even cooler: ONLY **1st-order** reactions (like radioactive decay & most drug clearances in your body!) have a **constant half-life `t_(1/2) = 0.693/k`** no matter how much you start with!",
      microSteps: [
        { label: "Step 1: The Big 3 Integrated Rate Laws & Linear Graphs", text: "Each order turns into a straight line `y = mx + b` on its signature plot! • **0th Order**: `[A]_t = [A]₀ − kt` (`[A]` vs `t` is linear, slope `−k`). • **1st Order**: `ln[A]_t = ln[A]₀ − kt` (`ln[A]` vs `t` is linear, slope `−k`, i.e., `[A]_t = [A]₀ e^(−kt)`). • **2nd Order**: `1/[A]_t = 1/[A]₀ + kt` (`1/[A]` vs `t` is linear, POSITIVE slope `+k`!)." },
        { label: "Step 2: Half-Life `t_(1/2)` Fingerprints (How to Tell Order Instantly!)", text: "• **0th Order**: `t_(1/2) = [A]₀ / (2k)` (half-life SHRINKS as `[A]` drops). • **1st Order**: **`t_(1/2) = ln(2)/k ≈ 0.693 / k`** (**INDEPENDENT of `[A]₀`** — every halving takes the exact same time!). • **2nd Order**: `t_(1/2) = 1 / (k [A]₀)` (half-life DOUBLES every time `[A]` halves!)." },
        { label: "Step 3: Arrhenius Equation (`k = A e^(−E_a / RT)`)", text: "Why does warming soup spoil food faster while a fridge preserves it? Rate constant `k` grows exponentially with temperature: **`k = A e^(−E_a / RT)`** (`A` = collision orientation factor, `E_a` = activation energy hill, `R = 8.314 J/(mol·K)`, `T` in **Kelvin**!). Higher `T` OR lower `E_a` (via a **catalyst**!) makes `k` skyrocket!" },
        { label: "Step 4: Two-Point Arrhenius & Linear Slope (`ln k` vs `1/T`)", text: "Taking `ln` gives **`ln k = −(E_a / R)(1/T) + ln A`** — so plotting `ln k` against `1/T` gives a straight line with slope **`−E_a / R`**! Comparing two temperatures directly: **`ln(k₂ / k₁) = (E_a / R)(1/T₁ − 1/T₂)`**!" }
      ],
      cheatCode: "Linear plots: 0th=[A], 1st=ln[A], 2nd=1/[A] (+k!). 1st-order half-life: t_(1/2) = 0.693/k (CONSTANT!). Arrhenius: k = A e^(−E_a/RT); slope of ln(k) vs 1/T = −E_a/R!",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "A lab student plots `1/[A]` versus time `t` and gets a razor-straight line with a **positive slope `+k`**. What is the reaction order?", options: ["2nd Order (1/[A]_t = 1/[A]₀ + kt!)", "1st Order", "0th Order", "3rd Order"], answer: "2nd Order (1/[A]_t = 1/[A]₀ + kt!)", hint: "Match linear y-axes: `0th → [A]`, `1st → ln[A]`, `2nd → 1/[A]`!", whyEasy: "Only 2nd-order kinetics yields a straight line with positive slope `+k` when plotting `1/[A]` vs `t`!" },
        { type: "mc", prompt: "A 1st-order drug in the bloodstream has rate constant `k = 0.0693 hr⁻¹`. What is its half-life `t_(1/2)`?", options: ["10 hours (0.693 / 0.0693)", "0.1 hours", "5 hours", "20 hours"], answer: "10 hours (0.693 / 0.0693)", hint: "Use `t_(1/2) = 0.693 / k`!", whyEasy: "`0.693 / 0.0693 = 10 hours` — constant regardless of initial dose!" },
        { type: "mc", prompt: "In an Arrhenius plot of `ln(k)` versus `1/T`, the straight line has slope `m = −5000 K`. What is the activation energy `E_a` (with `R = 8.314 J/(mol·K)`)?", options: ["41.6 kJ/mol (−m × R = 5000 × 8.314 J/mol)", "601 J/mol", "−41.6 kJ/mol", "5.0 kJ/mol"], answer: "41.6 kJ/mol (−m × R = 5000 × 8.314 J/mol)", hint: "Remember `slope = −E_a / R`, so `E_a = −(slope) × R`!", whyEasy: "`E_a = 5000 × 8.314 ≈ 41,570 J/mol ≈ 41.6 kJ/mol` (always positive!)!" },
        { type: "mc", prompt: "A reaction's first half-life takes `20 s`, and the NEXT half-life (from 50% down to 25%) takes `40 s` (twice as long!). What order is this reaction?", options: ["2nd Order (t_(1/2) = 1/(k[A]₀) doubles as [A] halves!)", "1st Order (constant half-life)", "0th Order (half-life shrinks)", "Cannot be determined"], answer: "2nd Order (t_(1/2) = 1/(k[A]₀) doubles as [A] halves!)", hint: "When `[A]₀` drops in half, `1/(k[A]₀)` DOUBLES!", whyEasy: "Half-life gets longer as reactants thin out → classic 2nd-order fingerprint!" },
        { type: "mc", prompt: "How does a **Catalyst** speed up rate constant `k = A e^(−E_a / RT)`?", options: ["Provides an alternate pathway with a LOWER activation energy E_a!", "Raises the temperature T of the flask", "Increases ΔH of the reaction", "Shifts equilibrium constant K to favor products"], answer: "Provides an alternate pathway with a LOWER activation energy E_a!", hint: "A catalyst lowers the mountain pass without changing start/finish elevations!", whyEasy: "Lower `E_a` makes the negative exponent less negative, making `k` jump exponentially!" }
      ]
    },
    {
      id: "chem-real-gases-dalton-graham",
      worldId: "chemistry",
      order: 243,
      title: "Gas Laws Deep Dive: Dalton, Graham, KMT & Van der Waals",
      icon: "🎈",
      tagline: "Why helium balloons deflate 3× faster than air balloons, how gas speed scales with √(3RT/M) & when real gases break PV = nRT!",
      scaryVersion: "Gas density and molar mass, Dalton's partial pressures, kinetic molecular RMS velocity, Graham's effusion law, and Van der Waals non-ideal corrections.",
      easyTruth: "Ideal gases pretend molecules are tiny weightless ghosts that never stick to each other — awesome at room temperature! Look closer and you unlock superpowers: **Dalton** lets mixed gases act independently, **Graham** proves lighter molecules zip way faster (`∝ 1/√M`), and **Van der Waals** adds two honest real-world corrections when you squeeze gases cold and tight!",
      microSteps: [
        { label: "Step 1: Gas Density & Molar Mass (`d = PM / RT`)", text: "Swap `n = m/M` into `PV = nRT` and rearrange for density `d = m/V`: **`d = (P M) / (R T)`** (and Molar Mass **`M = d R T / P`**)! Memory trick: **'Molar mass = Dirty Pee (`dRT/P`)'**! Hot air (`T ↑`) has lower density (`d ↓`) so hot-air balloons float; heavy `CO₂` (`M = 44`) sinks below air (`M ≈ 29`)!" },
        { label: "Step 2: Dalton's Law of Partial Pressures (`P_i = X_i P_total`)", text: "In a mixture of non-reacting gases, total pressure is simply the sum of each gas's solo pressure: **`P_total = P₁ + P₂ + P₃ + ...`**, and each gas's share equals its mole fraction `X_i = n_i / n_total` times total pressure: **`P_i = X_i P_total`**! (Lab classic: collecting gas over water → `P_dry = P_total − P_water`!)" },
        { label: "Step 3: Kinetic Theory (`v_rms = √(3RT/M)`) & Graham's Law", text: "At the same temperature `T`, ALL gases share the **exact same average kinetic energy** `KE_avg = (3/2)RT` per mole! So lightweight molecules MUST move faster: **`v_rms = √(3RT / M)`** (`M` in `kg/mol`!). Comparing two gases escaping a pinhole gives **Graham's Law**: **`r₁ / r₂ = √(M₂ / M₁)`** — `He` (`M=4`) leaks `√(32/4) = √8 ≈ 2.83×` faster than `O₂` (`M=32`)!" },
        { label: "Step 4: Real Gases & Van der Waals (`(P + an²/V²)(V − nb) = nRT`)", text: "Real gases deviate MOST from ideal behavior at **HIGH Pressure** (molecules get crowded — finite volume `b` matters!) and **LOW Temperature** (molecules move slow enough for sticky IMFs `a` to pull them inward!). Van der Waals fixes both: **`+ an²/V²`** corrects attractive IMF pull, and **`− nb`** subtracts molecular volume!" }
      ],
      cheatCode: "d = PM/(RT) ('M = dRT/P'). Dalton: P_i = X_i P_tot. v_rms = √(3RT/M); Graham: r₁/r₂ = √(M₂/M₁). Real gases deviate at HIGH P & LOW T: (P + an²/V²)(V − nb) = nRT!",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Compare effusion rates of Helium (`He`, `M = 4 g/mol`) and Methane (`CH₄`, `M = 16 g/mol`) at the same temperature using Graham's Law (`r₁/r₂ = √(M₂/M₁)`).", options: ["He effuses 2× faster than CH₄ (√(16/4) = 2!)", "He effuses 4× faster", "CH₄ effuses 2× faster", "Both effuse at the exact same rate"], answer: "He effuses 2× faster than CH₄ (√(16/4) = 2!)", hint: "Take the square root of the inverse molar mass ratio `√(16 / 4)`!", whyEasy: "`√(16/4) = √4 = 2` — lighter `He` zips out twice as fast!" },
        { type: "mc", prompt: "A tank holds `2 mol` of `N₂` and `3 mol` of `O₂` at total pressure `P_total = 10 atm`. What is the partial pressure of `N₂` (`P_i = X_i P_total`)?", options: ["4 atm (2/5 × 10 atm)", "6 atm", "2 atm", "5 atm"], answer: "4 atm (2/5 × 10 atm)", hint: "Total moles = `2 + 3 = 5`, so `X_(N₂) = 2/5`!", whyEasy: "`(2/5) × 10 atm = 4 atm` (and `O₂` provides the remaining `6 atm`)!" },
        { type: "mc", prompt: "Under which conditions does a real gas deviate **MOST** from the Ideal Gas Law `PV = nRT`?", options: ["HIGH pressure and LOW temperature (crowded & slow/sticky!)", "LOW pressure and HIGH temperature", "Vacuum and ultra-high temperature", "At all temperatures identically"], answer: "HIGH pressure and LOW temperature (crowded & slow/sticky!)", hint: "When do molecular size (`b`) and intermolecular stickiness (`a`) become impossible to ignore?", whyEasy: "High `P` packs molecules shoulder-to-shoulder; low `T` lets attractive IMFs tug them together!" },
        { type: "mc", prompt: "At `300 K`, a flask holds both `H₂` (`M = 2`) and `O₂` (`M = 32`). How do their **average kinetic energies** compare?", options: ["IDENTICAL — average KE depends ONLY on Kelvin temperature (KE_avg = 3/2 RT)!", "H₂ has 16× higher average KE", "O₂ has 16× higher average KE", "H₂ has 4× higher average KE"], answer: "IDENTICAL — average KE depends ONLY on Kelvin temperature (KE_avg = 3/2 RT)!", hint: "Don't confuse average *speed* (`v_rms`) with average *kinetic energy*!", whyEasy: "Same `T` = exact same average kinetic energy! `H₂` just moves `4×` faster to make up for being `16×` lighter!" },
        { type: "mc", prompt: "In the Van der Waals equation `(P + an²/V²)(V − nb) = nRT`, what physical effect does the constant **`a`** correct for?", options: ["Attractive intermolecular forces (IMFs) pulling gas molecules inward!", "The physical size/volume of the molecules", "Gravitational acceleration", "Nuclear binding energy"], answer: "Attractive intermolecular forces (IMFs) pulling gas molecules inward!", hint: "`a` = **A**ttractions; `b` = **B**ulk/size!", whyEasy: "Easy mnemonic: **`a`** = **A**ttractions (IMFs reduce wall pressure), **`b`** = **B**ody volume!" }
      ]
    },
    {
      id: "chem-spectroscopy-beer-lambert-nuclear",
      worldId: "chemistry",
      order: 244,
      title: "Beer-Lambert Law, Spectroscopy & Nuclear Decay Equations",
      icon: "☢️",
      tagline: "Measure mystery concentration with a beam of light (A = εbc), decode E = hc/λ & balance α, β⁻, β⁺ nuclear reactions!",
      scaryVersion: "UV-Vis Beer-Lambert spectrophotometry, electromagnetic photon energetics, nuclear decay kinetics, and mass-defect binding energy.",
      easyTruth: "Ever noticed how concentrated iced tea looks dark brown while diluted tea looks pale amber? **Beer-Lambert's Law (`A = ε b c`)** turns that exact intuition into a precision laser lab tool! Meanwhile, deep inside the atom's core, **Nuclear Equations** balance protons & nucleons while converting tiny slivers of missing mass (`Δm`) into colossal star-power via `E = Δm c²`!",
      microSteps: [
        { label: "Step 1: Beer-Lambert Law (`A = ε b c`) & Spectrophotometry", text: "Shine a beam of light through a colored solution of path length `b` (usually `1.0 cm` cuvette) and molarity `c`: Absorbance **`A = ε b c`** (`ε` = molar absorptivity at the peak wavelength `λ_max`)! Double the concentration → **double the Absorbance**! Bonus: Transmittance `T = I/I₀` links via `A = −log₁₀(T)` (so `A = 1` means `10%` light transmits; `A = 2` means `1%`!)." },
        { label: "Step 2: Photon Energy Ladder (`E = hν = hc / λ`)", text: "Electromagnetic waves carry quantized energy packets: **`E = hν = h c / λ`** (`h = 6.626 × 10⁻³⁴ J·s`, `c = 3.0 × 10⁸ m/s`). Radio → Microwave → IR (vibrates bonds!) → Visible (excites outer electrons!) → UV → X-ray → Gamma (nuclear!). Shorter wavelength `λ` ALWAYS means HIGHER frequency `ν` and HIGHER energy `E`!" },
        { label: "Step 3: Nuclear Decay Balancing (`α, β⁻, β⁺, γ`)", text: "Conserve BOTH **top mass number `A`** (protons + neutrons) AND **bottom atomic number `Z`** (charge)! • **Alpha (`⁴₂He`)**: `A − 4, Z − 2`. • **Beta-minus (`⁰₋₁e`)**: neutron turns into proton → **`A` unchanged, `Z + 1`**! • **Positron (`⁰₊₁e`) / Electron Capture**: **`A` unchanged, `Z − 1`**. • **Gamma (`⁰₀γ`)**: high-energy photon only (`A` and `Z` unchanged!)." },
        { label: "Step 4: Radioactive Half-Life (`N = N₀ (½)^(t / t_(1/2))`) & Mass Defect", text: "After `k = t / t_(1/2)` half-lives, remaining nuclei equal **`N(t) = N₀ (1/2)^k = N₀ e^(−λt)`** (where `λ = 0.693 / t_(1/2)`). And why is a helium nucleus slightly LIGHTER than 2 protons + 2 neutrons separately? The missing **Mass Defect `Δm`** was radiated away as **Nuclear Binding Energy `E_b = Δm c²`** (iron-56 sits at the peak stability summit!)." }
      ],
      cheatCode: "Beer-Lambert: A = εbc (A ∝ c; A = −log T). Photon: E = hν = hc/λ. Decay: α(−4,−2), β⁻(0,+1), β⁺(0,−1), γ(0,0). Half-life: N = N₀(½)^(t/t½). Binding: E_b = Δmc²!",
      visualizerId: "chemistryAtomPhLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "A `0.20 M` blue copper sulfate sample reads Absorbance `A = 0.40` in a `1 cm` cuvette (`A = εbc`). What concentration gives `A = 0.60` in the same cuvette?", options: ["0.30 M (directly proportional: 0.60/0.40 × 0.20)", "0.40 M", "0.10 M", "0.80 M"], answer: "0.30 M (directly proportional: 0.60/0.40 × 0.20)", hint: "Since `ε` and `b` stay constant, `A₁/c₁ = A₂/c₂`!", whyEasy: "`0.60` is `1.5×` larger than `0.40`, so concentration is `1.5 × 0.20 = 0.30 M`!" },
        { type: "mc", prompt: "Carbon-14 (`¹⁴₆C`) undergoes **Beta-minus (`⁰₋₁e`) decay**. What daughter nucleus is produced?", options: ["¹⁴₇N (mass stays 14, atomic number jumps 6 → 7!)", "¹⁰₄Be", "¹⁴₅B", "¹³₆C"], answer: "¹⁴₇N (mass stays 14, atomic number jumps 6 → 7!)", hint: "Check bottom conservation: `6 = Z + (−1) → Z = 7` (Nitrogen)!", whyEasy: "A neutron turns into a proton + emitted electron, keeping `A = 14` and bumping `Z = 6 → 7` (`¹⁴₇N`)!" },
        { type: "mc", prompt: "A `160 g` sample of a radioisotope has a half-life of `5 days`. How much remains after `20 days`?", options: ["10 g (4 half-lives: 160 → 80 → 40 → 20 → 10)", "40 g", "20 g", "5 g"], answer: "10 g (4 half-lives: 160 → 80 → 40 → 20 → 10)", hint: "Count half-lives: `20 / 5 = 4`, then divide `160` by `2⁴ = 16`!", whyEasy: "`160 × (1/2)⁴ = 160 / 16 = 10 g`!" },
        { type: "mc", prompt: "Uranium-238 (`²³⁸₉₂U`) emits an **Alpha particle (`⁴₂He`)**. What is the daughter isotope?", options: ["²³⁴₉₀Th (A − 4, Z − 2)", "²³⁸₉₃Np", "²³⁴₉₂U", "²³⁶₉₀Th"], answer: "²³⁴₉₀Th (A − 4, Z − 2)", hint: "Subtract `4` from `238` and `2` from `92`!", whyEasy: "`238 − 4 = 234` and `92 − 2 = 90` (Thorium-234)!" },
        { type: "mc", prompt: "If a solution lets only `10%` of light pass through (`T = 0.10`), what is its Absorbance `A = −log₁₀(T)`?", options: ["A = 1.0", "A = 0.10", "A = 2.0", "A = 0.90"], answer: "A = 1.0", hint: "`log₁₀(0.10) = log₁₀(10⁻¹) = −1`!", whyEasy: "`A = −(−1) = 1.0` (and `1%` transmittance gives `A = 2.0`)!" }
      ]
    },

    // ---------- BIOLOGY (+6 NODES: 245–250) ----------
    {
      id: "bio-hardy-weinberg-population-genetics",
      worldId: "biology",
      order: 245,
      title: "Hardy-Weinberg Equilibrium & Chi-Square Genetics Math",
      icon: "🧬",
      tagline: "Count hidden genetic carriers from just ONE number (p + q = 1, p² + 2pq + q² = 1) & test Mendelian ratios with χ²!",
      scaryVersion: "Hardy-Weinberg allele and genotype frequency invariance, five evolutionary equilibrium assumptions, and Pearson Chi-Square goodness-of-fit.",
      easyTruth: "How can doctors know that 1 in 25 people silently carries a recessive gene when only 1 in 2,500 shows the trait? **Hardy-Weinberg** is just Punnett-square FOIL scaled up to an entire population: `(p + q)² = p² + 2pq + q² = 1`! Grab the recessive fraction `q²`, take its square root to get `q`, and EVERY other frequency unlocks like dominoes!",
      microSteps: [
        { label: "Step 1: Two Sacred Equations (`p + q = 1` & `p² + 2pq + q² = 1`)", text: "For a 2-allele gene (`A` dominant, `a` recessive): **`p`** = frequency of `A` allele; **`q`** = frequency of `a` allele (**`p + q = 1`**). Genotype frequencies in the population: **`p²`** = homozygous dominant (`AA`), **`2pq`** = heterozygous carriers (`Aa`), and **`q²`** = homozygous recessive (`aa`). Together, **`p² + 2pq + q² = 1`**!" },
        { label: "Step 2: The Golden 4-Step Carrier Shortcut (Start at `q²`!)", text: "Because `AA` and `Aa` look identical on the outside, **ALWAYS start with the recessive phenotype (`aa = q²`)**! Example: if `9%` (`0.09`) of a population has the recessive trait: 1) `q² = 0.09` → 2) **`q = √0.09 = 0.3`** → 3) **`p = 1 − 0.3 = 0.7`** → 4) Carriers `2pq = 2(0.7)(0.3) =` **`0.42` (42%!)**!" },
        { label: "Step 3: The 5 No-Evolution Conditions (When Hardy-Weinberg Holds)", text: "Allele frequencies stay frozen ONLY when ALL 5 rules hold (**'Large Random No-No-No'**): 1) **Very Large population** (no genetic drift), 2) **Random mating**, 3) **No mutations**, 4) **No gene flow** (migration), and 5) **No natural selection**! If real data breaks Hardy-Weinberg, **evolution is actively happening!**" },
        { label: "Step 4: Chi-Square Goodness-of-Fit (`χ² = Σ (O − E)² / E`)", text: "Did your pea cross (`70` tall : `30` short) truly follow a `3:1` Mendelian ratio (`75 : 25`) or was it just random luck? Compute **`χ² = Σ (Observed − Expected)² / Expected`** with degrees of freedom **`df = categories − 1`** (`df = 1` critical value at `p = 0.05` is **`3.84`**). If `χ² < 3.84`, fail to reject the null hypothesis (difference is just chance!)!" }
      ],
      cheatCode: "p + q = 1; p² + 2pq + q² = 1. ALWAYS start from recessive q² → q = √q² → p = 1−q → carriers = 2pq! Chi-Square: χ² = Σ(O−E)²/E, df = classes−1 (df=1 cutoff: 3.84)!",
      visualizerId: "biologyDnaPunnettLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "In a Hardy-Weinberg population, `16%` (`0.16`) show a recessive trait (`aa`). What is the frequency of the recessive allele `q`?", options: ["0.40 (q = √0.16)", "0.16", "0.84", "0.08"], answer: "0.40 (q = √0.16)", hint: "Recessive phenotype frequency equals `q²`, NOT `q` — take the square root!", whyEasy: "`q² = 0.16 → q = √0.16 = 0.40` (and `p = 0.60`)!" },
        { type: "mc", prompt: "Continuing from `q = 0.40` and `p = 0.60`, what percentage of the population are **heterozygous carriers (`Aa = 2pq`)**?", options: ["48% (2 × 0.60 × 0.40 = 0.48)", "24%", "36%", "16%"], answer: "48% (2 × 0.60 × 0.40 = 0.48)", hint: "Don't forget the factor of `2` in `2pq`!", whyEasy: "`2pq = 2(0.6)(0.4) = 0.48 = 48%` — check: `0.36 + 0.48 + 0.16 = 1.00` ✓!" },
        { type: "mc", prompt: "In a Mendelian `1:1` testcross of `100` flies, you expect `50:50` but observe `60:40`. Calculate `χ² = Σ (O − E)² / E`.", options: ["4.0 ((10²/50) + (−10)²/50 = 2 + 2)", "2.0", "20.0", "0.4"], answer: "4.0 ((10²/50) + (−10)²/50 = 2 + 2)", hint: "Compute `(60−50)²/50 + (40−50)²/50`!", whyEasy: "`100/50 + 100/50 = 2 + 2 = 4.0` (slightly above `3.84`, hinting non-random deviation at `p < 0.05`)!" },
        { type: "mc", prompt: "Which of the following will **BREAK** Hardy-Weinberg equilibrium and cause evolution?", options: ["A tiny founder population of 12 birds blown onto an island (genetic drift!)", "Random mating across a million beetles", "Zero mutation and zero migration", "Equal survival & reproduction of all genotypes"], answer: "A tiny founder population of 12 birds blown onto an island (genetic drift!)", hint: "Hardy-Weinberg requires a VERY LARGE population!", whyEasy: "Small populations experience random allele swings (**Genetic Drift / Founder Effect**)!" },
        { type: "mc", prompt: "For a dihybrid cross with 4 phenotypic classes (`9:3:3:1`), how many **degrees of freedom (`df`)** do you use in a Chi-Square test?", options: ["df = 3 (categories − 1 = 4 − 1)", "df = 4", "df = 16", "df = 1"], answer: "df = 3 (categories − 1 = 4 − 1)", hint: "Always subtract `1` from the number of categories!", whyEasy: "`4 − 1 = 3` degrees of freedom!" }
      ]
    },
    {
      id: "bio-enzyme-kinetics-michaelis-menten",
      worldId: "biology",
      order: 246,
      title: "Enzyme Kinetics: Michaelis-Menten, K_m, V_max & Inhibitors",
      icon: "⚙️",
      tagline: "How enzymes hit top speed V_max, why LOW K_m means high sticky affinity & how drugs block enzymes cleanly!",
      scaryVersion: "Michaelis-Menten hyperbolic saturation kinetics, kcat/Km catalytic efficiency, Lineweaver-Burk linearization, and reversible inhibition mechanisms.",
      easyTruth: "Picture an enzyme like a fast-food cashier ringing up substrate customers! When the store is empty, adding customers speeds up service linearly. Once every cashier is busy, the store hits its absolute speed limit (**`V_max`**)! And **`K_m`** is the exact crowd size needed to hit half-speed (`½ V_max`): a **LOW `K_m`** means the enzyme grabs its substrate eagerly even when scarce!",
      microSteps: [
        { label: "Step 1: The Michaelis-Menten Equation (`v = V_max [S] / (K_m + [S])`)", text: "Reaction speed `v` follows a smooth saturation curve: **`v = (V_max · [S]) / (K_m + [S])`**. Check the 3 golden checkpoints: • Tiny `[S] ≪ K_m`: `v ≈ (V_max/K_m)[S]` (linear, 1st-order!). • Huge `[S] ≫ K_m`: `v → V_max` (saturated plateau, 0th-order!). • **`[S] = K_m`**: `v = V_max · K_m / (2 K_m) =` **`½ V_max`**!" },
        { label: "Step 2: Meaning of `K_m`, Turnover Number `k_cat` & Efficiency", text: "**LOW `K_m` = HIGH affinity** (doesn't take much substrate to hit half-speed!); **HIGH `K_m` = LOW affinity**. Turnover number **`k_cat = V_max / [E]_total`** counts molecules processed per enzyme per second. Overall enzyme superpower is **Catalytic Efficiency `= k_cat / K_m`** (top 'catalytically perfect' enzymes hit `~10⁸–10⁹ M⁻¹s⁻¹` — literally as fast as molecules can diffuse!)." },
        { label: "Step 3: Reversible Enzyme Inhibitors (The Exam Master Table!)", text: "• **Competitive** (looks like substrate, fights for the ACTIVE site): you can out-muscle it by flooding high `[S]`, so **`V_max` stays UNCHANGED**, while apparent **`K_m` INCREASES (`↑`)**! • **Noncompetitive** (binds an ALLOSTERIC site, breaking enzymes permanently during binding): flooding `[S]` can't fix broken cashiers, so **`V_max` DECREASES (`↓`)**, while **`K_m` stays UNCHANGED**! • **Uncompetitive** (binds ONLY the `ES` complex): BOTH **`V_max ↓` AND `K_m ↓`**!" },
        { label: "Step 4: Lineweaver-Burk Double-Reciprocal Plot (`1/v` vs `1/[S]`)", text: "Flipping Michaelis-Menten upside-down turns the curve into a straight line: **`1/v = (K_m / V_max)(1/[S]) + 1/V_max`**! Read both constants right off the axes: **y-intercept = `1 / V_max`**, **x-intercept = `−1 / K_m`**, and **slope = `K_m / V_max`**! Competitive lines cross on the y-axis; noncompetitive lines cross on the x-axis; uncompetitive lines are **parallel**!" }
      ],
      cheatCode: "v = V_max[S]/(K_m+[S]); at [S]=K_m, v = ½V_max. LOW K_m = HIGH affinity! Competitive: K_m↑, V_max same. Noncompetitive: V_max↓, K_m same. Uncompetitive: both ↓ (parallel LB lines)!",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "An enzyme has `V_max = 100 μM/s` and `K_m = 5 mM`. What is the reaction velocity `v` when `[S] = 5 mM`?", options: ["50 μM/s (when [S] = K_m, v is ALWAYS exactly ½ V_max!)", "100 μM/s", "25 μM/s", "20 μM/s"], answer: "50 μM/s (when [S] = K_m, v is ALWAYS exactly ½ V_max!)", hint: "Plug `[S] = K_m = 5` into `v = V_max[S] / (K_m + [S])`!", whyEasy: "`100 × 5 / (5 + 5) = 500 / 10 = 50 μM/s`!" },
        { type: "mc", prompt: "Enzyme X has `K_m = 0.02 mM` while Enzyme Y has `K_m = 8.0 mM` for glucose. Which enzyme has HIGHER binding affinity for glucose?", options: ["Enzyme X (LOWER K_m = tighter affinity!)", "Enzyme Y (higher K_m)", "Both have identical affinity", "Affinity depends only on V_max"], answer: "Enzyme X (LOWER K_m = tighter affinity!)", hint: "`K_m` is the concentration needed to reach half-speed — less needed means stickier!", whyEasy: "Enzyme X hits half-speed with 400× less glucose (`0.02 mM`) — way higher affinity!" },
        { type: "mc", prompt: "Adding a **Competitive Inhibitor** (competing for the active site) does what to apparent `K_m` and `V_max`?", options: ["Increases apparent K_m (↑), leaves V_max UNCHANGED", "Decreases V_max (↓), leaves K_m UNCHANGED", "Decreases BOTH K_m and V_max", "Increases BOTH K_m and V_max"], answer: "Increases apparent K_m (↑), leaves V_max UNCHANGED", hint: "Can flooding huge `[S]` eventually outcompete the blocker?", whyEasy: "Huge `[S]` wins the active site back (same `V_max`), you just need MORE `[S]` to reach half-speed (`K_m ↑`)!" },
        { type: "mc", prompt: "On a Lineweaver-Burk plot (`1/v` vs `1/[S]`), what does the **y-intercept** represent?", options: ["1 / V_max", "−1 / K_m", "K_m / V_max", "V_max"], answer: "1 / V_max", hint: "Set `1/[S] = 0` in `1/v = (K_m/V_max)(1/[S]) + 1/V_max`!", whyEasy: "At `1/[S] = 0` (infinite substrate), `1/v = 1/V_max`!" },
        { type: "mc", prompt: "An enzyme has `V_max = 120 μM/s` and `K_m = 10 mM`. Compute `v` when `[S] = 30 mM` (`3 × K_m`).", options: ["90 μM/s (3/4 of V_max!)", "60 μM/s", "40 μM/s", "100 μM/s"], answer: "90 μM/s (3/4 of V_max!)", hint: "Compute `120 × 30 / (10 + 30) = 3600 / 40`!", whyEasy: "`30 / (10 + 30) = 3/4`, and `3/4 × 120 = 90 μM/s`!" }
      ]
    },
    {
      id: "bio-water-potential-nernst-neurophysiology",
      worldId: "biology",
      order: 247,
      title: "Biophysics: Plant Water Potential (Ψ) & Neuron Action Potentials",
      icon: "⚡",
      tagline: "How giant redwood trees suck water 100 m skyward (Ψ = Ψ_s + Ψ_p) & how neurons fire 100 m/s electric spikes!",
      scaryVersion: "Osmotic and turgor water potential (Ψ = Ψs + Ψp, Ψs = −iCRT), neuronal Nernst equilibrium potential, and voltage-gated action potential dynamics.",
      easyTruth: "Both towering trees and your firing brain run on the exact same physical engine: **free-energy gradients**! Water ALWAYS slides downhill from **HIGH Water Potential `Ψ` → LOW `Ψ`** (adding solutes drops `Ψ` negative!). Inside your neurons, ion pumps build a `-70 mV` battery that snaps open sodium gates for a crisp all-or-none **Action Potential**!",
      microSteps: [
        { label: "Step 1: Plant Water Potential (`Ψ = Ψ_s + Ψ_p` & `Ψ_s = −iCRT`)", text: "Pure open water at sea level has **`Ψ = 0 bars`**. Total water potential is **`Ψ = Ψ_s + Ψ_p`**, where **Solute Potential `Ψ_s = −i C R T`** (`i` = van 't Hoff ionization constant: `1` for sucrose, `2` for NaCl; `C` = molarity; `R = 0.0831 L·bar/(mol·K)`; `T` in Kelvin — ALWAYS `≤ 0`!) and **Pressure Potential `Ψ_p`** is wall turgor push (`+` in crisp turgid cells, `0` in open beakers!). **Water ALWAYS moves from HIGHER (less negative) `Ψ` to LOWER (more negative) `Ψ`!**" },
        { label: "Step 2: Resting Membrane Potential (`−70 mV`) & `Na⁺/K⁺` ATPase", text: "A resting neuron sits near **`−70 mV`** (negative inside!). Two heroes maintain it: 1) The **`Na⁺/K⁺` ATPase pump** burns 1 ATP to push **`3 Na⁺ OUT`** and pull **`2 K⁺ IN`** (keeping `Na⁺` high outside, `K⁺` high inside!). 2) Leaky `K⁺` channels let `K⁺` drift out toward potassium's Nernst balance (`~−90 mV`)." },
        { label: "Step 3: Nernst Ion Equilibrium Potential (`E_ion = (61.5/z) log([out]/[in])`)", text: "At body temperature (`37°C = 310 K`), the voltage that perfectly balances a single ion's concentration gradient is **`E_ion = (61.5 mV / z) log₁₀([ion]_out / [ion]_in)`** (`z` = ion charge, `+1` for `Na⁺/K⁺`, `−1` for `Cl⁻`). For `Na⁺` (`10×` higher outside): `+61.5 × log(10) ≈ +61.5 mV`; for `K⁺` (`~30×` higher inside): `−90 mV`!" },
        { label: "Step 4: The All-or-None Action Potential & Saltatory Conduction", text: "1) Stimulus lifts voltage past **Threshold (`−55 mV`)** → voltage-gated **`Na⁺` channels snap OPEN** → `Na⁺` rushes **IN** → rapid **Depolarization** up to `+30 to +40 mV`! 2) `Na⁺` gates inactivate & voltage-gated **`K⁺` channels open** → `K⁺` rushes **OUT** → **Repolarization** & brief **Hyperpolarization** (Refractory Period prevents backward firing!). 3) **Myelin sheaths** let spikes leap node-to-node (**Saltatory Conduction**) up to `120 m/s`!" }
      ],
      cheatCode: "Ψ = Ψ_s + Ψ_p; Ψ_s = −iCRT (water flows HIGH Ψ → LOW Ψ!). Na⁺/K⁺ pump: 3 Na⁺ OUT / 2 K⁺ IN. Nernst (37°C): E = (61.5/z) log([out]/[in]). Action Potential: −70 → −55 threshold → Na⁺ IN (+35) → K⁺ OUT!",
      visualizerId: "chemistryAtomPhLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "A plant cell has `Ψ_s = −8.0 bars` and turgor pressure `Ψ_p = +3.0 bars`. It is dropped into an open beaker with `Ψ = −2.0 bars`. Which way does water flow?", options: ["INTO the cell (from −2.0 bars → −5.0 bars!)", "OUT of the cell", "No net movement (at equilibrium)", "Water moves against the Ψ gradient"], answer: "INTO the cell (from −2.0 bars → −5.0 bars!)", hint: "Compute cell `Ψ = −8.0 + 3.0 = −5.0 bars`, then flow HIGH → LOW!", whyEasy: "`−2.0 > −5.0`, so water flows from the beaker (`−2.0`) INTO the cell (`−5.0`)!" },
        { type: "mc", prompt: "During the rapid rising **Depolarization** spike of a neuron's Action Potential (from `−55 mV` to `+35 mV`), which ion rushes across the membrane?", options: ["Na⁺ rushes INTO the cell through voltage-gated Na⁺ channels!", "K⁺ rushes OUT of the cell", "Cl⁻ rushes OUT of the cell", "Ca²⁺ pumps out via ATP"], answer: "Na⁺ rushes INTO the cell through voltage-gated Na⁺ channels!", hint: "Positive ions entering make the inside rapidly positive!", whyEasy: "`Na⁺` is concentrated outside and negative inside attracts it — opening `Na⁺` gates drives voltage shooting toward `+60 mV`!" },
        { type: "mc", prompt: "Using the physiological Nernst equation `E = (61.5 mV / z) log([out]/[in])`, what is `E_ion` for a `+1` cation that is `10×` more concentrated OUTSIDE than inside?", options: ["+61.5 mV", "−61.5 mV", "+6.15 mV", "0 mV"], answer: "+61.5 mV", hint: "`z = +1` and `log₁₀(10) = +1`!", whyEasy: "`(61.5 / 1) × log(10) = +61.5 mV`!" },
        { type: "mc", prompt: "Each cycle of the **`Na⁺/K⁺` ATPase pump** moves which ions across the plasma membrane?", options: ["3 Na⁺ OUT and 2 K⁺ IN (costing 1 ATP)", "2 Na⁺ OUT and 3 K⁺ IN", "3 K⁺ OUT and 2 Na⁺ IN", "2 Na⁺ IN and 2 K⁺ OUT passively"], answer: "3 Na⁺ OUT and 2 K⁺ IN (costing 1 ATP)", hint: "Remember **'3-2-1 NOKIA'**: 3 `Na⁺` Out, 2 `K⁺` In, 1 ATP!", whyEasy: "Exporting 3 positive charges for every 2 imported even makes the pump directly electrogenic (negative inside)!" },
        { type: "mc", prompt: "In `Ψ_s = −iCRT`, why does a `0.5 M NaCl` solution have TWICE as negative a solute potential as `0.5 M` sucrose at the same temperature?", options: ["NaCl splits into 2 ions (i = 2), whereas covalent sucrose stays 1 particle (i = 1)!", "NaCl is heavier than sucrose", "Sucrose raises R", "NaCl creates positive Ψ_p"], answer: "NaCl splits into 2 ions (i = 2), whereas covalent sucrose stays 1 particle (i = 1)!", hint: "Osmotic pull counts *dissolved particles* (`i`), not grams!", whyEasy: "Ionization factor `i = 2` doubles the particle count and doubles `|Ψ_s|`!" }
      ]
    },
    {
      id: "bio-ecology-population-growth-energy",
      worldId: "biology",
      order: 248,
      title: "Quantitative Ecology: Growth, Mark-Recapture, Diversity & 10% Rule",
      icon: "🌿",
      tagline: "Count wild fish without draining the lake (N = MC/R), track logistic limits & follow energy up trophic pyramids!",
      scaryVersion: "Per-capita exponential and logistic population dynamics, Lincoln-Petersen mark-recapture, Shannon diversity index, and ecosystem productivity.",
      easyTruth: "Ecologists can't ask every deer in a forest to line up for roll call! Instead, they use clever mathematical shortcuts: tag a sample and see what fraction shows up later (**Lincoln-Petersen**), compute how close a population sits to food limits (**Logistic `K`**), and follow sunlight through the **10% Rule** explaining why hawks are always far rarer than grasshoppers!",
      microSteps: [
        { label: "Step 1: Population Growth — Exponential vs Logistic (`K`)", text: "Per-capita growth rate **`r = (Births − Deaths) / N = b − d`**. With unlimited food, growth explodes: **`dN/dt = r_max N`** (J-curve). With real resource ceilings (Carrying Capacity **`K`**), **`dN/dt = r_max N ((K − N) / K)`** (S-curve!). When `N = K`, `(K − N)/K = 0` so growth halts; maximum sustainable harvest happens at **`N = K/2`**!" },
        { label: "Step 2: Lincoln-Petersen Mark-Recapture (`N = (M · C) / R`)", text: "Catch and tag **`M`** animals, release them to mix, later catch **`C`** animals, and count **`R`** that carry your tag! By clean proportion `R / C = M / N`, total population is **`N = (M × C) / R`**! Example: tag `50` frogs, later catch `40` and `10` are tagged → `N = (50 × 40) / 10 = 200` frogs!" },
        { label: "Step 3: Ecosystem Productivity (`NPP = GPP − R`) & 10% Rule", text: "Plants capture total solar energy as **Gross Primary Productivity (`GPP`)**, spend some running their own cellular respiration (`R`), and leave **`NPP = GPP − R`** as edible plant biomass! Moving UP each trophic level (Producer → Primary → Secondary → Tertiary Consumer), roughly **only `10%`** transfers — **`90%` is lost as heat/metabolism**!" },
        { label: "Step 4: Biodiversity — Shannon Index (`H' = −Σ p_i ln p_i`) & `r/K` Life Strategies", text: "**Species Richness** counts how many species exist; **Shannon Index `H' = −Σ p_i ln(p_i)`** rewards BOTH richness AND evenness (higher `H'` = healthier, more balanced community!). **r-selected** species (mosquitoes, weeds) have tons of babies fast in unstable habitats; **K-selected** species (elephants, humans) invest heavy parental care near `K`." }
      ],
      cheatCode: "Logistic: dN/dt = rN(K−N)/K (max at K/2). Mark-Recapture: N = M·C/R. NPP = GPP − R. 10% Rule: ÷10 energy per trophic jump! Shannon H' = −Σ p_i ln(p_i) (higher = more diverse)!",
      visualizerId: "earthSpaceEconLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "Biologists tag `M = 60` sea turtles, release them, and next month catch `C = 50` turtles of which `R = 15` are tagged. Estimate total population `N = (M × C) / R`.", answer: "200", hint: "Multiply `60 × 50 = 3000`, then divide by `15`!", whyEasy: "`(60 × 50) / 15 = 3000 / 15 = 200` turtles!" },
        { type: "mc", prompt: "Grass producers store `50,000 kcal` of Net Primary Productivity. By the **10% Trophic Transfer Rule**, how much energy reaches **Tertiary Consumers** (3 jumps up: Grass → Rabbit → Snake → Hawk)?", options: ["50 kcal (50,000 → 5,000 → 500 → 50)", "5,000 kcal", "500 kcal", "5 kcal"], answer: "50 kcal (50,000 → 5,000 → 500 → 50)", hint: "Divide by `10` three times (`10³ = 1000`)!", whyEasy: "Primary = `5,000`, Secondary = `500`, Tertiary = `50 kcal` — why food chains rarely exceed 4–5 levels!" },
        { type: "mc", prompt: "A rainforest captures `GPP = 2400 g C/(m²·yr)` via photosynthesis and plants spend `R = 1100 g C/(m²·yr)` on cellular respiration. What is its `NPP`?", options: ["1300 g C/(m²·yr) (NPP = GPP − R)", "3500 g C/(m²·yr)", "1100 g C/(m²·yr)", "2.18 g C/(m²·yr)"], answer: "1300 g C/(m²·yr) (NPP = GPP − R)", hint: "Subtract plant respiration from gross capture: `NPP = GPP − R`!", whyEasy: "`2400 − 1100 = 1300 g C/(m²·yr)` stored as new plant growth!" },
        { type: "mc", prompt: "In logistic growth `dN/dt = r N ((K − N)/K)` with `r = 0.5`, `K = 1000`, and current `N = 800`, what is the current growth rate `dN/dt`?", options: ["80 individuals/yr (0.5 × 800 × 0.2)", "400 individuals/yr", "200 individuals/yr", "100 individuals/yr"], answer: "80 individuals/yr (0.5 × 800 × 0.2)", hint: "Compute `(K − N)/K = 200/1000 = 0.2`, then multiply `0.5 × 800 × 0.2`!", whyEasy: "`0.5 × 800 = 400`, times `0.2` remaining room = `80` per year!" },
        { type: "mc", prompt: "Two reefs each have 4 fish species (same richness = 4). Reef A has `25%, 25%, 25%, 25%`; Reef B has `94%, 2%, 2%, 2%`. Which has the HIGHER Shannon Diversity Index `H'`?", options: ["Reef A (higher evenness → higher H' = ln 4 ≈ 1.39!)", "Reef B", "Both have identical H' because richness = 4", "Neither can be compared"], answer: "Reef A (higher evenness → higher H' = ln 4 ≈ 1.39!)", hint: "Shannon `H'` maximizes when all species are equally abundant!", whyEasy: "Balanced evenness maximizes uncertainty/diversity (`H'_max = ln S`), so Reef A wins decisively!" }
      ]
    },
    {
      id: "bio-immunology-vaccines-microbiology",
      worldId: "biology",
      order: 249,
      title: "Immunology & Microbiology: Antibodies, Bacterial Growth & Herd Immunity",
      icon: "🛡️",
      tagline: "How B-cells & T-cells defeat viruses, count bacterial doublings (N = N₀·2ⁿ) & calculate Herd Immunity (p_c = 1 − 1/R₀)!",
      scaryVersion: "Innate vs adaptive humoral/cell-mediated immunity, MHC presentation, exponential microbial generation time, and epidemiological herd immunity threshold.",
      easyTruth: "Your immune system is a two-layer defense force: **Innate Immunity** is the instant skin-and-phagocyte border patrol (fast, generic), while **Adaptive Immunity** is elite intelligence (B-cells crafting custom Y-shaped Antibody missiles + T-cells sniping infected cells + Memory cells that lock onto a returning germ 10× faster!). And simple math predicts both bacterial explosions AND how vaccines halt outbreaks!",
      microSteps: [
        { label: "Step 1: Innate vs Adaptive Immunity (Humoral B vs Cell-Mediated T)", text: "**Innate** (1st/2nd line: skin, stomach acid, fever, macrophages, NK cells) fights *anything* immediately with no memory. **Adaptive** (3rd line, specific + memory!): **B-cells** turn into Plasma cells secreting **Antibodies** (`IgG` crosses placenta & long-term memory, `IgM` first responder, `IgA` mucosa/milk, `IgE` allergies/parasites). **Helper T-cells (`CD4⁺`)** activate both B & T teams (reads **`MHC-II`**); **Cytotoxic T-cells (`CD8⁺`)** destroy virus-infected/cancer body cells (reads **`MHC-I`** on all nucleated cells!)." },
        { label: "Step 2: Active vs Passive Immunity & Primary vs Secondary Response", text: "**Active Immunity** trains YOUR own B/T memory cells (infection OR **vaccine** → long-lasting!). **Passive Immunity** borrows ready-made antibodies (mother's `IgG`/`IgA` breastmilk or antivenom shot → instant protection, fades in weeks, no memory!). On a 2nd exposure, Memory cells launch a **Secondary Response** that is faster, stronger, and mostly `IgG`!" },
        { label: "Step 3: Bacterial Binary Fission (`N = N₀ · 2ⁿ`, `n = t / g`)", text: "Under ideal food & warmth (Log Phase), bacteria double every generation time `g`: **`N(t) = N₀ · 2^(t / g)`**! Example: `E. coli` doubles every `20 min` — in just `2 hours` (`n = 6` doublings), `100` cells explode to `100 × 2⁶ = 6,400` cells! Four bacterial growth phases: **Lag → Log (exponential) → Stationary → Death**." },
        { label: "Step 4: Epidemiology — Basic Reproduction `R₀` & Herd Immunity (`p_c = 1 − 1/R₀`)", text: "**`R₀`** is the average number of people ONE sick person infects in an unprotected crowd (`R₀ > 1` grows; `R₀ < 1` dies out!). To stop an outbreak, the **Herd Immunity Threshold** — fraction needing immunity — is **`p_c = 1 − 1 / R₀`**! Example: if `R₀ = 4`, `p_c = 1 − 1/4 = 75%`; for ultra-contagious Measles (`R₀ ≈ 15`), `p_c = 1 − 1/15 ≈ 93.3%`!" }
      ],
      cheatCode: "MHC-I → CD8⁺ Cytotoxic (all nucleated cells); MHC-II → CD4⁺ Helper (APCs). Active = own memory; Passive = borrowed antibodies. Bacteria: N = N₀·2^(t/g). Herd Immunity: p_c = 1 − 1/R₀!",
      visualizerId: "biologyDnaPunnettLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "A bacterial culture starts with `N₀ = 50` cells and doubles every `g = 30 min`. How many cells exist after `2 hours` (`120 min`)?", answer: "800", hint: "Count doublings: `n = 120 / 30 = 4`, then compute `50 × 2⁴`!", whyEasy: "`2⁴ = 16`, so `50 × 16 = 800` bacteria!" },
        { type: "mc", prompt: "A new respiratory virus has Basic Reproduction Number `R₀ = 5`. What is the **Herd Immunity Threshold `p_c = 1 − 1/R₀`** required to halt spread?", options: ["80% (1 − 1/5 = 0.80)", "20%", "50%", "95%"], answer: "80% (1 − 1/5 = 0.80)", hint: "Plug `R₀ = 5` into `1 − 1/R₀`!", whyEasy: "`1 − 0.20 = 0.80 = 80%` — once 4 out of 5 contacts are immune, each case averages `< 1` new infection!" },
        { type: "mc", prompt: "Which immune cell directly kills virus-infected host cells by recognizing foreign peptides displayed on **`MHC-I`** molecules?", options: ["Cytotoxic T-cell (CD8⁺)", "B-cell (plasma cell)", "Red blood cell", "Platelet"], answer: "Cytotoxic T-cell (CD8⁺)", hint: "Easy multiplication rule of 8: **`MHC-I × CD8 = 8`** and **`MHC-II × CD4 = 8`**!", whyEasy: "The Rule of 8 never fails: `CD8⁺` cytotoxic T-cells bind `MHC-I`; `CD4⁺` helper T-cells bind `MHC-II`!" },
        { type: "mc", prompt: "A snakebite victim receives purified horse-derived **antivenom antibodies** in the ER. What type of immunity is this?", options: ["Artificially acquired PASSIVE immunity (instant protection, no memory cells!)", "Artificially acquired ACTIVE immunity", "Naturally acquired ACTIVE immunity", "Innate barrier immunity"], answer: "Artificially acquired PASSIVE immunity (instant protection, no memory cells!)", hint: "Did the patient's own B-cells make these antibodies, or were they borrowed ready-made?", whyEasy: "Ready-made antibodies neutralize venom immediately (Passive), whereas vaccines train your own memory cells (Active)!" },
        { type: "mc", prompt: "Which antibody class is the ONLY one able to cross the human **placenta** to protect a newborn baby AND dominates the long-term secondary immune response?", options: ["IgG", "IgM", "IgE", "IgD"], answer: "IgG", hint: "Think **`G`** for '**G**estation / **G**eneral champion' (most abundant in blood)!", whyEasy: "`IgG` is the most abundant blood antibody and crosses the placenta; `IgM` appears first; `IgA` protects breastmilk & mucus!" }
      ]
    },
    {
      id: "bio-cardiorespiratory-renal-physiology",
      worldId: "biology",
      order: 250,
      title: "Quantitative Physiology: Cardiac Output, Spirometry, Bohr & Kidneys",
      icon: "❤️",
      tagline: "Calculate Cardiac Output (CO = HR × SV), Blood Pressure (MAP), Lung Volumes, Hemoglobin Bohr Shift & Renal Clearance!",
      scaryVersion: "Hemodynamic cardiac output and mean arterial pressure, spirometric pulmonary capacities, Fick diffusion, oxyhemoglobin Bohr shift, and renal clearance.",
      easyTruth: "Your body is a masterpiece of living engineering running clean physics equations 24/7! Your heart pumps `~5 L/min` (`CO = HR × SV`), your lungs obey **Fick's Diffusion Law** across a tennis-court-sized alveolar membrane, hemoglobin smartly dumps MORE oxygen right where working muscles make acid (**Bohr Effect**), and your kidneys filter `180 L/day` to reclaim `99%` of your water!",
      microSteps: [
        { label: "Step 1: Heart Math — Cardiac Output (`CO = HR × SV`) & `MAP`", text: "**Cardiac Output `CO = HR × SV`** (Heart Rate × Stroke Volume — rest: `70 bpm × 70 mL ≈ 4.9 L/min`!). **Mean Arterial Pressure** (average pressure pushing blood to organs): **`MAP = CO × TPR`** (Total Peripheral Resistance), estimated from a BP cuff (`SP / DP`, e.g. `120/80`) by **`MAP ≈ DP + ⅓(SP − DP)`** (because the heart spends ~2/3 of each beat relaxing in diastole! `80 + ⅓(40) ≈ 93 mmHg`!)." },
        { label: "Step 2: Lung Spirometry Volumes & Fick's Diffusion Law", text: "• **Tidal Volume (`TV`, ~500 mL)**: normal quiet breath. • **Vital Capacity (`VC = TV + IRV + ERV`)**: maximum air you can inhale & exhale. • **Total Lung Capacity (`TLC = VC + RV`)**, where **Residual Volume (`RV`)** keeps lungs from collapsing! Gas transfer follows **Fick's Law**: **`J = −D A (ΔC / Δx)`** — lungs maximize surface area `A` (300 million alveoli!) and minimize thickness `Δx`!" },
        { label: "Step 3: Hemoglobin-Oxygen Curve & The **Bohr Effect**", text: "Hemoglobin's S-shaped (sigmoidal) binding curve comes from **cooperative binding** (1st `O₂` makes the next 3 bind easier!). During hard exercise, working muscles create **HIGH `CO₂`, LOW `pH` (acid), and HIGH Temp** — shifting the curve **RIGHT ('CADET, face RIGHT!')**, lowering Hb's grip so it **UNLOADS extra `O₂`** right where muscles need it most!" },
        { label: "Step 4: Kidney Math — Nephron Flow & Renal Clearance (`C = U·V / P`)", text: "The nephron runs 3 steps: **Filtration** (glomerulus → Bowman's capsule), **Reabsorption** (taking glucose/water/salts BACK into blood), and **Secretion** (dumping extra wastes/drugs into urine). **Renal Clearance `C = (U × V) / P`** (`U` = urine conc., `V` = urine flow mL/min, `P` = plasma conc.) measures blood volume cleaned per minute — inulin/creatinine clearance estimates **GFR (`~125 mL/min`)**!" }
      ],
      cheatCode: "CO = HR × SV; MAP ≈ DP + ⅓(SP−DP) = CO × TPR. VC = TV + IRV + ERV; TLC = VC + RV. Bohr RIGHT shift (↑CO₂, ↓pH, ↑T → unloads O₂!). Renal Clearance: C = U·V / P!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "An athlete's heart beats at `HR = 150 bpm` with Stroke Volume `SV = 100 mL/beat`. What is their Cardiac Output `CO = HR × SV` in **Liters per minute**?", options: ["15 L/min (15,000 mL/min)", "1.5 L/min", "25 L/min", "150 L/min"], answer: "15 L/min (15,000 mL/min)", hint: "Multiply `150 × 100 mL` and divide by `1000 mL/L`!", whyEasy: "`150 × 0.10 L = 15 L/min` — 3× resting flow!" },
        { type: "input", prompt: "A patient's blood pressure is `120 / 90 mmHg` (`SP = 120, DP = 90`). Compute Mean Arterial Pressure `MAP = DP + (SP − DP)/3` in `mmHg`.", answer: "100", hint: "Pulse pressure `SP − DP = 30`; add `30 / 3 = 10` to `DP = 90`!", whyEasy: "`MAP = 90 + 30/3 = 90 + 10 = 100 mmHg`!" },
        { type: "mc", prompt: "During intense sprinting, rising lactic acid (`pH ↓`) and `CO₂ ↑` cause the Hemoglobin-`O₂` dissociation curve to shift **RIGHT** (Bohr Effect). What does this helpfully achieve?", options: ["Decreases Hb's affinity for O₂ so it UNLOADS more oxygen into hard-working muscles!", "Locks O₂ permanently onto hemoglobin", "Stops CO₂ from leaving tissues", "Eliminates residual lung volume"], answer: "Decreases Hb's affinity for O₂ so it UNLOADS more oxygen into hard-working muscles!", hint: "Right shift = easier release of `O₂` at active tissues!", whyEasy: "Working muscles signal 'send oxygen here!' with `↑CO₂`, `↓pH`, and `↑Temp` — Bohr shift delivers!" },
        { type: "mc", prompt: "A patient has urine substance concentration `U = 50 mg/mL`, urine flow `V = 2 mL/min`, and plasma concentration `P = 1 mg/mL`. What is the Renal Clearance `C = (U × V) / P`?", options: ["100 mL/min", "25 mL/min", "52 mL/min", "50 mL/min"], answer: "100 mL/min", hint: "Compute `(50 × 2) / 1`!", whyEasy: "`C = (50 × 2) / 1 = 100 mL/min` of plasma cleared completely!" },
        { type: "mc", prompt: "Which lung volume formula correctly defines **Vital Capacity (`VC`)** — the maximum volume of air you can forcefully exhale after a deepest breath?", options: ["VC = TV + IRV + ERV (excludes Residual Volume RV!)", "VC = TV + RV", "VC = TLC + RV", "VC = IRV − ERV"], answer: "VC = TV + IRV + ERV (excludes Residual Volume RV!)", hint: "You can NEVER exhale Residual Volume (`RV`)!", whyEasy: "`VC = TV + IRV + ERV`, and adding un-exhalable `RV` gives Total Lung Capacity (`TLC = VC + RV`)!" }
      ]
    },

    // ---------- EARTH, SPACE & GENERAL SCIENCE (+6 NODES: 251–256) ----------
    {
      id: "sci-astrophysics-luminosity-hubble-parallax",
      worldId: "earth_space",
      order: 251,
      title: "Astrophysics Formulas: Parallax, Luminosity, Hubble & Black Holes",
      icon: "🌌",
      tagline: "Measure light-years with triangles (d = 1/p), weigh galaxies, time the Big Bang (t₀ ≈ 1/H₀) & size Black Holes (R_s = 2GM/c²)!",
      scaryVersion: "Trigonometric stellar parallax, Stefan-Boltzmann stellar luminosity, inverse-square apparent flux, cosmological Hubble redshift, and Schwarzschild radius.",
      easyTruth: "Astronomers can never fly a tape measure to a distant star — yet they know its exact distance, temperature, size, and speed! How? With five breathtakingly clean equations: **Parallax** triangulates nearby stars, **Luminosity `L = 4πR²σT⁴`** measures star wattage, **Inverse-Square `b = L/(4πd²)`** turns brightness into distance, and **Hubble's Law `v = H₀d`** rewinds the expanding universe right back to the Big Bang!",
      microSteps: [
        { label: "Step 1: Stellar Parallax (`d = 1 / p`) — Cosmic Triangulation", text: "Hold your thumb in front of your face and blink left/right eye: it shifts! As Earth orbits the Sun, nearby stars shift by a tiny angle `p` (in arcseconds). Distance in **parsecs** (`1 pc ≈ 3.26 light-years`) is simply **`d(pc) = 1 / p(arcsec)`**! Half the parallax angle = **TWICE as far away**!" },
        { label: "Step 2: Luminosity (`L = 4πR²σT⁴`) & Apparent Brightness (`b = L / 4πd²`)", text: "A star's true total wattage (**Luminosity `L`**) depends on surface area (`R²`) and temperature (`T⁴`): **`L = 4π R² σ T⁴`** — why a cool Red Supergiant with huge `R` can outshine a tiny hot White Dwarf! What we actually SEE from Earth is **Apparent Brightness `b = L / (4π d²)`**: moving a star `3×` farther dims it by **`3² = 9×`**!" },
        { label: "Step 3: Cosmological Redshift (`z`) & Hubble's Law (`v = H₀ d`)", text: "Distant galaxies stretch light toward red: **`z = Δλ / λ₀ ≈ v / c`** (for `v ≪ c`). Edwin Hubble discovered that farther galaxies flee faster: **`v = H₀ d`** (`H₀ ≈ 70 km/(s·Mpc)`). Rewinding expansion (`t = d / v`) gives the **Hubble Age of the Universe**: **`t₀ ≈ 1 / H₀ ≈ 13.8 billion years`**!" },
        { label: "Step 4: Black Holes & Schwarzschild Radius (`R_s = 2GM / c²`)", text: "Set escape velocity `√(2GM/R)` equal to the speed of light `c` and solve for `R`! You instantly derive the Event Horizon radius of a non-spinning black hole: **`R_s = 2 G M / c²`** (notice `R_s` is directly proportional to mass `M`! Sun's `R_s ≈ 3 km`; Earth's `R_s ≈ 9 mm` — size of a peanut!)." }
      ],
      cheatCode: "Parallax: d(pc) = 1/p(\"). Luminosity: L = 4πR²σT⁴; Brightness: b = L/(4πd²). Hubble: v = H₀d (age ≈ 1/H₀). Redshift: z = Δλ/λ₀. Black hole: R_s = 2GM/c²!",
      visualizerId: "physicsLawsPlayground",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "A nearby star shows a parallax angle of `p = 0.25` arcseconds. How far away is it in **parsecs** (`d = 1 / p`)?", answer: "4", hint: "Take the reciprocal `1 / 0.25`!", whyEasy: "`d = 1 / 0.25 = 4 parsecs` (`≈ 13 light-years`)!" },
        { type: "mc", prompt: "Star A and Star B have the EXACT same surface temperature `T`, but Star A has **3× the radius** (`R_A = 3 R_B`). How does Star A's luminosity `L = 4πR²σT⁴` compare?", options: ["9× more luminous (3² = 9!)", "3× more luminous", "81× more luminous", "27× more luminous"], answer: "9× more luminous (3² = 9!)", hint: "Luminosity scales with surface area `R²`!", whyEasy: "Same `T`, `3×` radius → `3² = 9×` surface area → `9×` luminosity!" },
        { type: "mc", prompt: "By Hubble's Law (`v = H₀ d`, with `H₀ = 70 km/(s·Mpc)`), how fast is a galaxy receding if it lies `100 Mpc` away?", options: ["7,000 km/s", "700 km/s", "0.7 km/s", "70,000 km/s"], answer: "7,000 km/s", hint: "Multiply `70 × 100`!", whyEasy: "`v = 70 × 100 = 7,000 km/s` (about `2.3%` the speed of light)!" },
        { type: "mc", prompt: "If Black Hole X has **5× the mass** of Black Hole Y, how does its Schwarzschild event horizon radius (`R_s = 2GM / c²`) compare?", options: ["5× larger radius (linear in M!)", "25× larger", "√5 × larger", "1/5 as large"], answer: "5× larger radius (linear in M!)", hint: "`M` appears to the first power (`M¹`) in `R_s = 2GM/c²`!", whyEasy: "Event horizon radius grows straight-line with mass (`R_s ∝ M`) → `5×` mass = `5×` radius!" },
        { type: "mc", prompt: "Two identical stars have the same luminosity `L`, but Star Far is **4× farther** than Star Near. How does Star Far's apparent brightness `b = L/(4πd²)` compare?", options: ["1/16 as bright (4² = 16!)", "1/4 as bright", "1/8 as bright", "4× brighter"], answer: "1/16 as bright (4² = 16!)", hint: "Light spreads over a sphere of area `4πd²` (inverse-square law)!", whyEasy: "`1 / 4² = 1/16` as bright!" }
      ]
    },
    {
      id: "sci-radiometric-dating-seismology-richter",
      worldId: "earth_space",
      order: 252,
      title: "Geophysics Math: Radiometric Dating, Seismic Waves & Magnitude",
      icon: "🌋",
      tagline: "Clock-date dinosaur rocks & ancient fossils, triangulate earthquake epicenters & feel the 31.6× seismic energy jump!",
      scaryVersion: "Isotopic radiometric age determination, P/S seismic wave travel-time epicentral distance, and logarithmic Richter/Moment magnitude energy scaling.",
      easyTruth: "How do geologists know Earth is `4.54 billion years` old, or pinpoint an earthquake epicenter under Manila Bay in 10 seconds? Inside rocks sit atomic hourglasses (**Radiometric Dating**), and every earthquake fires a fast Sprinter wave (**P-wave**) and a slower Runner (**S-wave**) — the gap between their arrival times immediately tells you the exact distance to the fault!",
      microSteps: [
        { label: "Step 1: Radiometric Dating (`N/N₀ = (½)^(t / t_(1/2))`)", text: "Every half-life `t_(1/2)`, half the **Parent** isotope decays into stable **Daughter** atoms (`Parent + Daughter = Original Parent N₀`!). • **Carbon-14** (`t_(1/2) = 5,730 yr`): dates once-living organic bones/wood up to `~50,000 yr` (NOT dinosaur rocks!). • **Uranium-238 → Lead-206** (`t_(1/2) = 4.47 billion yr`) & **Potassium-40**: date billion-year igneous rocks and meteorites!" },
        { label: "Step 2: Reading Parent : Daughter Ratios Instantly!", text: "Watch this exam trick! • `1 : 1` (50% parent left) = **1 half-life**. • `1 : 3` (25% = `1/4` parent left) = **2 half-lives**. • `1 : 7` (12.5% = `1/8` parent left) = **3 half-lives**. • `1 : 15` (`1/16` parent left) = **4 half-lives**! Always remember: `Parent fraction = P / (P + D)`!" },
        { label: "Step 3: Seismic P-Waves vs S-Waves & Epicenter Distance (`d`)", text: "**P-waves** (Primary, compressional push-pull) are FASTEST (`~6–8 km/s` in crust) and travel through **solids AND liquids**! **S-waves** (Secondary, sideways shear) are SLOWER (`~3.5–4.5 km/s`) and **CANNOT travel through liquids** (how we proved Earth's Outer Core is liquid!). Arrival lag `Δt = t_S − t_P = d(1/v_S − 1/v_P)` gives distance **`d = Δt / (1/v_S − 1/v_P)`** — draw 3 circles from 3 stations to pinpoint the epicenter (**Triangulation**)!" },
        { label: "Step 4: Earthquake Magnitude Logarithmic Scaling (`10×` Amp, `31.6×` Energy!)", text: "Every **`+1.0`** jump in Moment/Richter Magnitude (`M 6 → M 7`) multiplies ground wave **AMPLITUDE by `10×`** (`10^(ΔM)`) and multiplies **ENERGY RELEASED by `10^(1.5) ≈ 31.6×`**! So a **`+2.0`** jump (`M 5 → M 7`) releases **`10^(1.5 × 2) = 10³ = 1,000×` MORE ENERGY**!" }
      ],
      cheatCode: "Radiometric: Parent/(P+D) = (½)^k (1:3 → 2 half-lives; 1:7 → 3). P-waves = fastest, solid+liquid; S-waves = solid ONLY. Epicenter: 3 stations. +1 Magnitude = 10× amplitude, ~31.6× energy (+2 = 1,000× energy)!",
      visualizerId: "earthSpaceEconLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "An ancient wooden boat fragment has `1/8` of its original Carbon-14 remaining (`t_(1/2) = 5,730 years`). How old is the boat?", options: ["17,190 years (3 half-lives: 3 × 5,730)", "5,730 years", "11,460 years", "45,840 years"], answer: "17,190 years (3 half-lives: 3 × 5,730)", hint: "`(1/2)³ = 1/8` → 3 half-lives!", whyEasy: "`3 × 5,730 = 17,190 years`!" },
        { type: "mc", prompt: "A granite sample contains a `1 : 3` ratio of radioactive Parent atoms to stable Daughter atoms (`1` parent for every `3` daughters). How many half-lives have elapsed?", options: ["2 half-lives (1/(1+3) = 1/4 = (1/2)²!)", "3 half-lives", "1 half-life", "4 half-lives"], answer: "2 half-lives (1/(1+3) = 1/4 = (1/2)²!)", hint: "Total original parent = `1 + 3 = 4`, so fraction remaining = `1/4`!", whyEasy: "`1/4 = (1/2)²` = exactly **2 half-lives**!" },
        { type: "mc", prompt: "How much MORE seismic **energy** does a **Magnitude 8.0** earthquake release compared to a **Magnitude 6.0** earthquake (`ΔM = 2.0`)?", options: ["1,000× more energy (10^(1.5 × 2) = 10³!)", "100× more energy", "2× more energy", "31.6× more energy"], answer: "1,000× more energy (10^(1.5 × 2) = 10³!)", hint: "Wave amplitude jumps `10² = 100×`, while ENERGY jumps `31.6² ≈ 1,000×`!", whyEasy: "`+1` magnitude ≈ `31.6×` energy; `+2` magnitude = `10³ = 1,000×` energy!" },
        { type: "mc", prompt: "How did seismologists prove that Earth's **Outer Core is LIQUID**?", options: ["Shear S-waves disappear completely in the outer core (creating an S-wave shadow zone!)", "P-waves bounce straight back into space", "Volcanoes erupt liquid iron from the outer core", "Earth's crust stopped vibrating"], answer: "Shear S-waves disappear completely in the outer core (creating an S-wave shadow zone!)", hint: "Which seismic wave cannot propagate through liquids?", whyEasy: "Liquids have zero shear stiffness, so S-waves stop dead at the core-mantle boundary!" },
        { type: "mc", prompt: "Why can't scientists use **Carbon-14 (`t_(1/2) = 5,730 yr`)** to date a `65-million-year-old` dinosaur fossil rock?", options: ["After ~50,000–60,000 years (>10 half-lives), virtually zero measurable C-14 remains (use U-238/K-40 instead)!", "Dinosaurs contained no carbon", "C-14 only forms underwater", "C-14 has too long a half-life"], answer: "After ~50,000–60,000 years (>10 half-lives), virtually zero measurable C-14 remains (use U-238/K-40 instead)!", hint: "How many `5,730`-year half-lives fit inside 65 million years?", whyEasy: "`65 million / 5,730 > 11,000` half-lives — not a single C-14 atom would survive! Geologists date surrounding volcanic ash with `U-238` or `K-40`." }
      ]
    },
    {
      id: "sci-oceanography-atmospheric-lapse-coriolis",
      worldId: "earth_space",
      order: 253,
      title: "Atmospheric & Ocean Science: Lapse Rates, Coriolis & Tsunamis",
      icon: "🌀",
      tagline: "Why Baguio stays cool, why Northern typhoons spin counterclockwise & why tsunamis race across oceans at jet speed (√(gh))!",
      scaryVersion: "Dry and moist adiabatic lapse rates, relative humidity and dew point, Coriolis deflection dynamics, and shallow-water tsunami wave kinematics.",
      easyTruth: "Weather and oceans aren't random magic — they're giant heat engines obeying simple fluid math! Air rising up a mountain expands and cools by **`9.8°C/km`** (making mountain cities crisp and dumping rain on the windward slope!), Earth's spin twists typhoon winds via the **Coriolis Effect**, and a tsunami's speed depends strictly on **ocean depth `h`** (`v = √(gh)`)!",
      microSteps: [
        { label: "Step 1: Dry (`9.8°C/km`) vs Moist (`~5–6°C/km`) Adiabatic Lapse Rates", text: "When an air parcel rises, lower pressure makes it expand and cool with NO heat exchange (adiabatic!). Unsaturated dry air cools fast at the **Dry Adiabatic Lapse Rate (`~9.8°C/km` ≈ `10°C/km`)**. Once it hits the **Dew Point** (`100%` humidity) and forms clouds, condensing water releases latent heat — slowing cooling to the **Moist Lapse Rate (`~5–6°C/km`)**! Descending on the far side warms dry air fast, creating a warm, dry **Rain Shadow**!" },
        { label: "Step 2: Relative Humidity (`RH = (e / e_s) × 100%`) & Dew Point", text: "**Relative Humidity** compares actual water vapor `e` to the maximum vapor warm air can hold (`e_s`): **`RH = (e / e_s) × 100%`**. Crucial twist: warm air holds EXPONENTIALLY more moisture (Clausius-Clapeyron: `~7%` more per `+1°C`!). So cooling air at night raises `RH` until it hits `100%` at the **Dew Point**, forming fog or morning dew!" },
        { label: "Step 3: Coriolis Effect & Typhoon Rotation Direction", text: "Because Earth spins eastward (`~1,670 km/h` at the Equator, `0` at the Poles), moving air/water deflects to the **RIGHT in the Northern Hemisphere** and **LEFT in the Southern Hemisphere** (zero right at the Equator — why typhoons can't form within `~5°` of `0°` latitude!). Winds rushing into a Northern Low-Pressure eye deflect right → spiraling **COUNTERCLOCKWISE** (Clockwise in Southern!)." },
        { label: "Step 4: Ocean Waves & Tsunami Speed (`v = √(g h)`)", text: "Regular wind waves in deep water move at `v = √(gλ / 2π)` (longer waves go faster). A **Tsunami** has a `100+ km` wavelength — far longer than the `4 km` ocean depth — so it behaves as a **shallow-water wave**: **`v = √(g h)`**! In `4,000 m` deep Pacific water: `v = √(9.8 × 4000) ≈ 200 m/s ≈ 720 km/h` (jetliner speed!). Approaching shallow coasts (`h ↓`), `v` slows down and energy piles UP into a towering wall of water!" }
      ],
      cheatCode: "Dry lapse ≈ 9.8°C/km; Moist ≈ 5–6°C/km. RH = (e/e_s)×100% (cooling raises RH!). Coriolis: RIGHT in North → CCW typhoons; LEFT in South → CW. Tsunami speed: v = √(gh) (shallow coast → slows & towers UP)!",
      visualizerId: "earthSpaceEconLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Warm sea-level air at `30°C` rises `1.5 km` up a mountain (dry, unsaturated, lapse rate `≈ 10°C/km`). About what temperature is the air at `1.5 km` elevation?", options: ["15°C (30 − 15°C)", "45°C", "25°C", "0°C"], answer: "15°C (30 − 15°C)", hint: "Dry rising air cools roughly `10°C` per kilometer!", whyEasy: "`1.5 km × 10°C/km = 15°C` cooler → `30 − 15 = 15°C` (just like Baguio's crisp mountain climate!)!" },
        { type: "mc", prompt: "Why do Philippine typhoons (Northern Hemisphere Low-Pressure systems) ALWAYS spin **Counterclockwise** when viewed from space?", options: ["Air rushing inward toward Low pressure deflects to the RIGHT by Coriolis, curling counterclockwise!", "Air deflects left in the Northern Hemisphere", "The Moon pulls typhoons counterclockwise", "Mountain ranges spin them"], answer: "Air rushing inward toward Low pressure deflects to the RIGHT by Coriolis, curling counterclockwise!", hint: "Draw inward arrows toward a center and bend every arrow slightly RIGHT!", whyEasy: "Inward pressure gradient + rightward Coriolis deflection locks Northern cyclones into a counterclockwise spiral!" },
        { type: "mc", prompt: "Compute the open-ocean speed of a tsunami (`v = √(g h)`) over a `4,000 m` deep abyssal plain (use `g = 10 m/s²`).", options: ["200 m/s (~720 km/h — commercial jet speed!)", "40 m/s", "20 m/s", "4,000 m/s"], answer: "200 m/s (~720 km/h — commercial jet speed!)", hint: "Compute `√(10 × 4000) = √40,000`!", whyEasy: "`√40,000 = 200 m/s = 720 km/h` — barely 1 meter tall in deep ocean, then slows & shoots upward at the beach!" },
        { type: "mc", prompt: "If the amount of water vapor in a sealed room stays CONSTANT while you turn ON the air conditioner (lowering temperature), what happens to **Relative Humidity (`RH`)**?", options: ["RH INCREASES (cooler air has lower saturation capacity e_s!)", "RH decreases", "RH stays strictly unchanged", "Water vapor disappears"], answer: "RH INCREASES (cooler air has lower saturation capacity e_s!)", hint: "In `RH = (e / e_s) × 100%`, cooler air shrinks the denominator `e_s`!", whyEasy: "Same moisture `e` inside a smaller capacity `e_s` pushes `RH` up toward `100%` (Dew Point)!" },
        { type: "mc", prompt: "Why do tropical cyclones / typhoons almost NEVER form directly on the **Equator (`0°` latitude)**?", options: ["The horizontal Coriolis force is ZERO at the Equator, so storms cannot develop spin!", "The Equator's ocean water is too cold", "Gravity is zero at the Equator", "There is no atmospheric pressure at the Equator"], answer: "The horizontal Coriolis force is ZERO at the Equator, so storms cannot develop spin!", hint: "Coriolis scales with `sin(latitude)`, and `sin(0°) = 0`!", whyEasy: "Warm oceans exist at `0°`, but without Coriolis twist (`> 5°` latitude), inflowing air just fills the low without spinning!" }
      ]
    },
    {
      id: "sci-measurement-error-sigfigs-dimensional",
      worldId: "earth_space",
      order: 254,
      title: "Lab Science Mastery: Dimensional Analysis, Sig Figs & Error Math",
      icon: "📏",
      tagline: "Never lose lab points again — bulletproof unit-canceling chains, sig-fig precision rules & error propagation!",
      scaryVersion: "Factor-label dimensional homogeneity, significant figure rounding rules, percent error, accuracy/precision, and uncertainty propagation.",
      easyTruth: "Even a NASA Mars orbiter crashed in 1999 because one team used pounds and the other used Newtons! **Dimensional Analysis** lets you treat units like algebra variables that cancel right off the page — so you can tell if a formula is right or wrong BEFORE even touching a calculator! Add **Sig Figs** and **Error Propagation**, and every science lab becomes effortless!",
      microSteps: [
        { label: "Step 1: Factor-Label Dimensional Analysis (Units Are Algebra!)", text: "Multiply by conversion fractions equal to `1` so unwanted units cancel top-to-bottom! Example: `72 km/h × (1000 m / 1 km) × (1 h / 3600 s) = 20 m/s` (**Golden shortcut: `km/h ÷ 3.6 = m/s`!**). Warning on **squared/cubed units**: `1 m² = (100 cm)² = 10,000 cm²` and `1 m³ = 1,000,000 cm³ = 1,000 L`!" },
        { label: "Step 2: Significant Figures — Counting & The 2 Operation Rules", text: "Leading zeros (`0.0045` → 2 sf) NEVER count; sandwiched zeros (`1005` → 4 sf) ALWAYS count; trailing zeros ONLY count if there is a decimal point (`4.500` → 4 sf; `4500` → 2 sf). • **Add / Subtract**: round to fewest **DECIMAL PLACES** (`12.11 + 3.2 = 15.3`). • **Multiply / Divide**: round to fewest **TOTAL SIG FIGS** (`2.5 × 3.42 = 8.6`, 2 sf)!" },
        { label: "Step 3: Accuracy vs Precision & Percent Error", text: "**Accuracy** = how close to the true bullseye (**`% Error = |Experimental − True| / |True| × 100%`**). **Precision** = how tightly clustered repeated shots are to *each other*! A scale that always reads `+2.0 g` too high (`102.0, 102.1, 101.9` for a `100 g` weight) has **HIGH precision, LOW accuracy** (a **Systematic Error** — fixable by calibration, unlike Random Error!)." },
        { label: "Step 4: Uncertainty / Error Propagation (Two Golden Rules)", text: "When combining uncertain measurements `A ± ΔA` and `B ± ΔB`: 1) **Adding or Subtracting (`A ± B`)**: ALWAYS **ADD absolute errors**: **`ΔZ = ΔA + ΔB`** (even when subtracting!). 2) **Multiplying or Dividing (`A × B` or `A / B`)**: **ADD relative (%) errors**: **`ΔZ/Z = ΔA/A + ΔB/B`**! And for powers `Z = Aⁿ`: **`ΔZ/Z = |n| · (ΔA/A)`**!" }
      ],
      cheatCode: "km/h ÷ 3.6 = m/s; 1 m² = 10⁴ cm². Sig Figs: +/− → fewest decimal places; ×/÷ → fewest total sig figs! %Error = |Exp−True|/True × 100%. Errors: +/− add absolute Δ; ×/÷ add % errors!",
      visualizerId: "algebraBalanceScale",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "Convert `108 km/h` to `m/s` cleanly using dimensional analysis (`÷ 3.6`).", answer: "30", hint: "`108 / 3.6 = 1080 / 36`!", whyEasy: "`108 ÷ 3.6 = 30 m/s` (check: `30 × 3600 = 108,000 m = 108 km`)!" },
        { type: "mc", prompt: "How many **Significant Figures** are in the measurement **`0.004050 kg`**?", options: ["4 sig figs (the 4, 0, 5, and trailing 0 after decimal!)", "7 sig figs", "3 sig figs", "2 sig figs"], answer: "4 sig figs (the 4, 0, 5, and trailing 0 after decimal!)", hint: "Leading zeros (`0.00`) are placeholders only; captive and trailing decimal zeros count!", whyEasy: "Drop leading `0.00`, keep `4-0-5-0` → **4 significant figures**!" },
        { type: "mc", prompt: "Compute `14.52 + 2.1` and round cleanly using the **Addition/Subtraction** sig-fig rule.", options: ["16.6 (1 decimal place, matching 2.1!)", "16.62", "17", "16.60"], answer: "16.6 (1 decimal place, matching 2.1!)", hint: "Addition/Subtraction tracks fewest **decimal places**, NOT total sig figs!", whyEasy: "`14.52` has 2 decimal places, `2.1` has 1 decimal place → round `16.62` to **`16.6`**!" },
        { type: "mc", prompt: "You measure a cube's side length `L` with a `2%` uncertainty (`ΔL/L = 2%`). What is the percent uncertainty in its **Volume `V = L³`**?", options: ["6% (3 × 2% — power rule!)", "2%", "8%", "0.67%"], answer: "6% (3 × 2% — power rule!)", hint: "`V = L × L × L` multiplies three `2%` uncertainties → `2% + 2% + 2%`!", whyEasy: "For `Z = Aⁿ`, relative error multiplies by `|n|`: `3 × 2% = 6%`!" },
        { type: "mc", prompt: "You measure gravity as `g = 9.31 m/s²` when the true local value is `9.80 m/s²`. What is your **Percent Error**?", options: ["5.0% (|9.31 − 9.80| / 9.80 × 100%)", "0.49%", "9.5%", "4.9%"], answer: "5.0% (|9.31 − 9.80| / 9.80 × 100%)", hint: "`0.49 / 9.80 = 49 / 980 = 1 / 20`!", whyEasy: "`0.49 / 9.80 = 0.05 = 5.0%` error!" }
      ]
    },
    {
      id: "sci-energy-balance-albedo-carbon-budget",
      worldId: "earth_space",
      order: 255,
      title: "Planetary Energy Balance: Solar Flux, Albedo & Climate Math",
      icon: "🌍",
      tagline: "Derive Earth's temperature from sunlight & albedo ((1−α)S₀/4 = σT⁴), decode 33°C greenhouse warming & master kWh/MJ!",
      scaryVersion: "Planetary radiative equilibrium with albedo, cross-sectional solar interception factor (1/4), logarithmic CO2 radiative forcing, and energy efficiency metrics.",
      easyTruth: "Why is Earth a cozy `+15°C` instead of a frozen `-18°C` snowball? Just balance the planet's energy checkbook: **Sunlight In = Infrared Glow Out**! A single clean equation — **`(1 − α)(S₀/4) = σ T⁴`** — predicts the bare-rock temperature of ANY planet in the galaxy, and immediately reveals the `+33°C` blanket provided by Earth's natural greenhouse atmosphere!",
      microSteps: [
        { label: "Step 1: Solar Constant (`S₀`), Albedo (`α`) & The `1/4` Sphere Factor", text: "Sunlight hits Earth's top atmosphere at **`S₀ ≈ 1,361 W/m²`**. Two geometric trims happen before it warms the ground: 1) Earth intercepts a flat disk (`πR²`) but spreads heat over a full spinning sphere (`4πR²`), dividing by **`4`** (`1361 / 4 ≈ 340 W/m²`)! 2) Bright clouds, snow, and ice reflect fraction **`α`** (**Albedo**, Earth `α ≈ 0.30`, fresh snow `~0.85`, dark ocean `~0.06`), leaving **`(1 − α)(S₀/4) ≈ 238 W/m²`** absorbed!" },
        { label: "Step 2: Planetary Equilibrium Temperature (`(1 − α) S₀ / 4 = σ T_eq⁴`)", text: "Setting absorbed sunlight equal to Stefan-Boltzmann outgoing infrared glow gives **`T_eq = [(1 − α) S₀ / (4σ)]^(1/4)`**! Plugging Earth's numbers gives **`T_eq ≈ 255 K = −18°C`** — way below freezing! Our actual average surface is **`288 K = +15°C`** thanks to **`+33°C`** of natural Greenhouse trapping (`H₂O, CO₂, CH₄`)!" },
        { label: "Step 3: Radiative Forcing (`ΔF ≈ 5.35 ln(C / C₀)`) & Ice-Albedo Feedback", text: "Extra greenhouse gas slows outgoing IR escape, creating positive **Radiative Forcing `ΔF` (in `W/m²`)**. For `CO₂`, **`ΔF ≈ 5.35 ln(C / C₀)`** — every **doubling** of `CO₂` (`C/C₀ = 2`) adds **`5.35 × 0.693 ≈ +3.7 W/m²`**! Melting bright Arctic ice exposes dark ocean (`α ↓`), absorbing MORE sun and melting MORE ice (**Positive Ice-Albedo Feedback Loop**!)." },
        { label: "Step 4: Energy, Power & Grid Math (`1 kWh = 3.6 MJ`)", text: "**Power** (`Watts = J/s`) is the *rate*; **Energy** (`Joules` or `kWh`) is the *total* (`E = P × t`). **`1 kWh = 1,000 J/s × 3,600 s = 3.6 MJ`**! **Capacity Factor** = `(Actual Energy Generated) / (Max Rated Power × Total Time)` (nuclear `~90%`, solar `~20–25%`), and **EROI** = `Energy Out / Energy Invested` (must be `> 1` to yield net energy!)." }
      ],
      cheatCode: "Earth balance: (1−α)S₀/4 = σT_eq⁴ (α=0.30 → −18°C bare vs +15°C greenhouse = +33°C!). CO₂ forcing: ΔF ≈ 5.35 ln(C/C₀) (2×CO₂ → +3.7 W/m²). 1 kWh = 3.6 MJ!",
      visualizerId: "earthSpaceEconLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "In the planetary energy balance `(1 − α)(S₀ / 4) = σ T⁴`, WHY is the solar constant `S₀` divided by **`4`**?", options: ["A planet catches sunlight on a flat circular disk (πR²) but radiates heat from its entire spherical surface (4πR²)!", "Earth only gets sunlight 1/4 of the year", "The Moon blocks 3/4 of sunlight", "There are 4 seasons"], answer: "A planet catches sunlight on a flat circular disk (πR²) but radiates heat from its entire spherical surface (4πR²)!", hint: "Compare circle area `πR²` to sphere surface area `4πR²`!", whyEasy: "`πR² / (4πR²) = 1/4` — pure 3D geometry!" },
        { type: "mc", prompt: "Which surface has the **HIGHEST Albedo (`α`)** — reflecting the most incoming sunlight back to space?", options: ["Fresh white snow & Arctic sea ice (α ≈ 0.80–0.90)", "Dark deep ocean water (α ≈ 0.06)", "Black asphalt road (α ≈ 0.05)", "Dense dark evergreen forest (α ≈ 0.10)"], answer: "Fresh white snow & Arctic sea ice (α ≈ 0.80–0.90)", hint: "Albedo = fraction of sunlight REFLECTED (`0` = pure black, `1` = pure mirror)!", whyEasy: "Bright white snow acts like a planetary mirror, reflecting up to 90% of sunlight!" },
        { type: "mc", prompt: "Melting white sea ice reveals dark ocean water (`α` drops from `0.8` to `0.06`), absorbing MORE heat and melting even more ice. What type of system loop is this?", options: ["Positive (amplifying) feedback loop!", "Negative (stabilizing) feedback loop", "Zero-energy equilibrium", "Coriolis deflection"], answer: "Positive (amplifying) feedback loop!", hint: "'Positive' in systems science means *self-reinforcing / snowballing*, NOT 'good'!", whyEasy: "Warming → less ice → lower albedo → more absorbed sunlight → even MORE warming (amplifying loop)!" },
        { type: "input", prompt: "A `1,500 W` (`1.5 kW`) electric kettle runs for `2 hours`. How many **kWh** of electrical energy does it consume (`E = P × t`)?", answer: "3", hint: "Multiply power in kW (`1.5`) by hours (`2`)!", whyEasy: "`1.5 kW × 2 h = 3 kWh` (which equals `3 × 3.6 = 10.8 MJ`)!" },
        { type: "mc", prompt: "Without Earth's natural greenhouse atmosphere, `(1 − α)S₀/4 = σT⁴` predicts an equilibrium temperature of `−18°C`, while Earth's true average is `+15°C`. How much natural greenhouse warming keeps our oceans liquid?", options: ["+33°C (from −18°C up to +15°C!)", "+15°C", "+18°C", "+3°C"], answer: "+33°C (from −18°C up to +15°C!)", hint: "Compute `15 − (−18)`!", whyEasy: "`15 − (−18) = +33°C` — Earth's natural greenhouse effect makes complex life possible!" }
      ]
    },
    {
      id: "sci-environmental-biogeochemical-ecology-math",
      worldId: "earth_space",
      order: 256,
      title: "Environmental Science Math: Rule of 70, IPAT, Cycles & Water Quality",
      icon: "💧",
      tagline: "Forecast population doubling in 2 seconds (70/r), decode I = P × A × T, Nitrogen/Carbon cycles & Dissolved Oxygen sag!",
      scaryVersion: "Exponential doubling time approximation, IPAT environmental impact identity, biogeochemical reservoir fluxes, eutrophication BOD/DO dynamics, and residence time.",
      easyTruth: "Environmental science connects chemistry, biology, and human choices into crystal-clear numbers! Want to know when a city's water demand doubles? Divide `70` by its `%` growth rate! Want to know why fertilizer runoff kills fish in a lake? Algae boom, die, and bacteria burn up **Dissolved Oxygen (`DO`)**! And **Residence Time (`τ = Stock / Flux`)** tells you how fast a polluted lake or atmosphere cleans itself!",
      microSteps: [
        { label: "Step 1: The Rule of 70 (`t_d ≈ 70 / r%`) & Residence Time (`τ = Stock / Flux`)", text: "Any quantity growing at steady rate `r%` per year doubles in **`t_d ≈ 70 / r`** years (from `ln(2) ≈ 0.693`)! Example: `2%` annual growth doubles in `70 / 2 = 35 years`; `7%` doubles in just `10 years`! And in any steady reservoir (lake, aquifer, atmosphere), average **Residence Time** is **`τ = Reservoir Size / Flow Rate`** (e.g., `1000 m³` pond with `50 m³/day` inflow flushes in `20 days`!)." },
        { label: "Step 2: The IPAT Identity (`I = P × A × T`) & Ecological Footprint", text: "Total environmental **Impact (`I`)** = **Population (`P`) × Affluence/Consumption (`A`) × Technology intensity (`T`)**! Cleaner technology (like LEDs or solar panels lowering `T` per dollar) can cut `I` even as `P` and `A` grow!" },
        { label: "Step 3: Biogeochemical Cycles — Carbon, Nitrogen & Phosphorus", text: "• **Carbon Cycle**: Photosynthesis (`CO₂ → glucose`) pulls C out; Respiration + Fossil Combustion push C in; oceans absorb `~25–30%` forming carbonic acid (`H₂CO₃` → **Ocean Acidification, `pH ↓`**!). • **Nitrogen Cycle**: `N₂` air (78%) is unusable until **Nitrogen-Fixing bacteria** (`Rhizobium` in legumes) turn `N₂ → NH₃` (ammonia), **Nitrification** turns `NH₃ → NO₃⁻` (nitrates for plants), and **Denitrification** returns `NO₃⁻ → N₂`! • **Phosphorus Cycle**: has **NO atmospheric gas phase** — locked in rocks and eroded slowly!" },
        { label: "Step 4: Eutrophication, BOD & Dissolved Oxygen (`DO`) Sag Curve", text: "Excess Nitrogen/Phosphorus fertilizer washes into rivers → explosive **Algal Bloom** → algae die and sink → aerobic decomposers feast on dead algae, creating huge **Biochemical Oxygen Demand (`BOD ↑`)** → **Dissolved Oxygen (`DO`) crashes** → hypoxic **Dead Zone** suffocates fish! Note: **warmer water ALSO holds LESS dissolved `O₂`** (thermal pollution worsens dead zones!)." }
      ],
      cheatCode: "Rule of 70: t_d ≈ 70 / r(%). Residence Time: τ = Stock / Flux. Impact: I = P × A × T. Phosphorus = NO gas phase! Eutrophication: N/P runoff → Algae → Decomposers → ↑BOD → ↓DO (Dead Zone)!",
      visualizerId: "earthSpaceEconLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "A city's electricity demand grows at `3.5%` per year. Using the **Rule of 70 (`t_d ≈ 70 / r`)**, in how many years will demand DOUBLE?", answer: "20", hint: "Divide `70` by `3.5`!", whyEasy: "`70 / 3.5 = 20 years`!" },
        { type: "mc", prompt: "Which major biogeochemical cycle has **NO significant atmospheric gas phase** and moves primarily through rocks, soil, and water?", options: ["Phosphorus cycle", "Carbon cycle", "Nitrogen cycle", "Water (hydrologic) cycle"], answer: "Phosphorus cycle", hint: "Phosphate (`PO₄³⁻`) stays bound in rock minerals rather than floating as gas!", whyEasy: "Carbon (`CO₂`), Nitrogen (`N₂`), and Water (`H₂O` vapor) all cycle through air — **Phosphorus** does NOT!" },
        { type: "mc", prompt: "What DIRECTLY causes fish to suffocate during nutrient-driven **Eutrophication** after an algal bloom?", options: ["Aerobic decomposer bacteria break down dead algae, spiking BOD and depleting Dissolved Oxygen (DO)!", "Live algae consume all oxygen during sunny daytime", "Nitrogen fertilizer directly poisons gills immediately", "Water turns solid at the surface"], answer: "Aerobic decomposer bacteria break down dead algae, spiking BOD and depleting Dissolved Oxygen (DO)!", hint: "Follow the chain: excess N/P → bloom → die-off → bacterial decomposition!", whyEasy: "Decomposers devour dead algae via aerobic respiration, crashing `DO` into a hypoxic dead zone!" },
        { type: "mc", prompt: "A reservoir holds `600,000 m³` of water, with a steady river inflow (and equal outflow) of `15,000 m³/day`. What is the water's **Residence Time `τ = Stock / Flux`**?", options: ["40 days (600,000 / 15,000)", "4 days", "400 days", "0.025 days"], answer: "40 days (600,000 / 15,000)", hint: "Divide reservoir volume by daily flow rate!", whyEasy: "`600,000 / 15,000 = 40 days` average stay per water molecule!" },
        { type: "mc", prompt: "Which bacteria-driven step of the **Nitrogen Cycle** converts unusable atmospheric `N₂` gas into plant-accessible ammonia (`NH₃ / NH₄⁺`)?", options: ["Nitrogen Fixation (e.g., Rhizobium in legume root nodules!)", "Denitrification", "Transpiration", "Sedimentation"], answer: "Nitrogen Fixation (e.g., Rhizobium in legume root nodules!)", hint: "'Fixing' locks floating air `N₂` into solid/dissolved soil compounds!", whyEasy: "Nitrogen-fixing bacteria crack the triple bond in `N≡N` to make ammonia `NH₃`!" }
      ]
    }
  ];

  // Append all 19 new nodes cleanly (237 + 19 = 256!)
  DATA.NODES.push(...CHEM_BIO_SCI_NODES);

  // ==================== +8 CLASSIC CHEM, BIO & SCIENCE TRAPS ====================
  DATA.GRADE12_TRAPS.push(
    {
      id: "trap-electrochem-multiply-e0",
      title: "Multiplying E° Voltage When Balancing a Half-Reaction",
      trapExpression: "2 × (Ag⁺ + e⁻ → Ag, E° = +0.80 V) → E° = +1.60 V?",
      wrongGuess: "+1.60 V (multiplied E° by 2!)",
      rightAnswer: "+0.80 V (NEVER multiply E° — voltage is intensive!)",
      whyItHappens: "In Hess's Law you multiply `ΔH` by coefficients, so students accidentally do the same to `E°`.",
      quickRule: "Multiply `ΔH` and `ΔG`, NEVER `E°`! Voltage is Joules PER Coulomb (`J/C`) — the multiplier cancels!",
      quiz: {
        prompt: "If `Fe³⁺ + e⁻ → Fe²⁺` has `E° = +0.77 V`, what is `E°` for `3 Fe³⁺ + 3e⁻ → 3 Fe²⁺`?",
        options: ["+0.77 V (unchanged!)", "+2.31 V", "+0.26 V", "−0.77 V"],
        answer: "+0.77 V (unchanged!)",
        explanation: "Standard reduction potential `E°` is an intensive property and NEVER scales with reaction coefficients!"
      }
    },
    {
      id: "trap-bond-enthalpy-sign-order",
      title: "Subtracting 'Products − Reactants' for Bond Enthalpies",
      trapExpression: "ΔH_rxn from Bond Energies = Formed − Broken?",
      wrongGuess: "Formed − Broken (Products − Reactants)",
      rightAnswer: "BROKEN − FORMED (Reactants − Products!)",
      whyItHappens: "Formation enthalpies (`ΔH°_f`) use `Products − Reactants`, so students apply the same order to Bond Energies by habit!",
      quickRule: "`ΔH°_f` → **Products − Reactants**. Bond Energies → **BROKEN − FORMED** (breaking costs `+`, forming releases `−`)!",
      quiz: {
        prompt: "Breaking reactant bonds costs `500 kJ` and forming stronger product bonds releases `650 kJ`. What is `ΔH_rxn`?",
        options: ["−150 kJ (500 − 650, Exothermic!)", "+150 kJ", "+1150 kJ", "−1150 kJ"],
        answer: "−150 kJ (500 − 650, Exothermic!)",
        explanation: "`Broken − Formed = 500 − 650 = −150 kJ` (net heat released because product bonds are stronger)!"
      }
    },
    {
      id: "trap-ksp-missing-coefficient-square",
      title: "Writing K_sp = 2s³ Instead of 4s³ for MX₂ Salts",
      trapExpression: "PbCl₂(s) ⇌ Pb²⁺ + 2Cl⁻ → K_sp = (s)(2s²) = 2s³?",
      wrongGuess: "2s³ (forgot to square the 2!)",
      rightAnswer: "4s³ ((s)(2s)² = s · 4s² = 4s³!)",
      whyItHappens: "Students raise `s` to the 2nd power but leave the coefficient `2` outside the exponent!",
      quickRule: "Put `2s` INSIDE parentheses before squaring: `(2s)² = 4s² → 4s³`! And for 1:3 salts: `(3s)³ = 27s³ → 27s⁴`!",
      quiz: {
        prompt: "For `Mg(OH)₂(s) ⇌ Mg²⁺ + 2 OH⁻`, what is the correct expression for `K_sp` in terms of molar solubility `s`?",
        options: ["4s³", "2s³", "s³", "8s³"],
        answer: "4s³",
        explanation: "`[Mg²⁺] = s` and `[OH⁻] = 2s`, so `K_sp = (s)(2s)² = 4s³`!"
      }
    },
    {
      id: "trap-hardy-weinberg-q-vs-q2",
      title: "Setting Recessive Phenotype Frequency Equal to q Instead of q²",
      trapExpression: "4% of people have recessive trait aa → q = 0.04?",
      wrongGuess: "q = 0.04 (and carriers = 2(0.96)(0.04) = 7.7%)",
      rightAnswer: "q² = 0.04 → q = √0.04 = 0.20 (and carriers = 2(0.8)(0.2) = 32%!)",
      whyItHappens: "People see a percentage of individuals (`aa`) and forget individuals have TWO alleles (`q × q = q²`)!",
      quickRule: "Individuals = `p², 2pq, q²`. Alleles = `p, q`. ALWAYS take `√` of recessive phenotype `%` to get `q`!",
      quiz: {
        prompt: "If `1%` (`0.01`) of a Hardy-Weinberg population expresses a recessive trait (`aa`), what is the recessive allele frequency `q`?",
        options: ["0.10 (√0.01 = 0.10!)", "0.01", "0.99", "0.0001"],
        answer: "0.10 (√0.01 = 0.10!)",
        explanation: "`q² = 0.01 → q = √0.01 = 0.10`, meaning `18%` (`2 × 0.9 × 0.1`) are hidden carriers!"
      }
    },
    {
      id: "trap-km-high-vs-low-affinity",
      title: "Thinking HIGHER K_m Means Higher Enzyme Affinity",
      trapExpression: "Enzyme A: K_m = 50 mM vs Enzyme B: K_m = 0.5 mM — which binds tighter?",
      wrongGuess: "Enzyme A (bigger K_m = stronger binding!)",
      rightAnswer: "Enzyme B (SMALLER K_m = tighter affinity!)",
      whyItHappens: "In everyday life 'higher number = better', so students forget `K_m` is the *concentration needed* to half-saturate!",
      quickRule: "**LOW `K_m` = HIGH affinity** (takes barely any substrate to grab on and hit `½ V_max`!).",
      quiz: {
        prompt: "Hexokinase (`K_m = 0.1 mM`) and Glucokinase (`K_m = 10 mM`) both bind glucose. Which binds glucose MUCH more tightly at low blood sugar?",
        options: ["Hexokinase (100× lower K_m = much higher affinity!)", "Glucokinase", "Both bind equally tightly", "Neither binds below 10 mM"],
        answer: "Hexokinase (100× lower K_m = much higher affinity!)",
        explanation: "Lower `K_m` means Hexokinase reaches half-max speed at just `0.1 mM` glucose!"
      }
    },
    {
      id: "trap-water-potential-more-negative",
      title: "Forgetting Negative Number Ordering in Water Potential (Ψ)",
      trapExpression: "Side A: Ψ = −2 bars vs Side B: Ψ = −6 bars — which way does water flow?",
      wrongGuess: "From −6 toward −2 (6 > 2!)",
      rightAnswer: "From −2 TOWARD −6 (−2 is HIGHER than −6!)",
      whyItHappens: "Looking at magnitudes (`6 > 2`) tricks brains into forgetting both numbers are negative!",
      quickRule: "Water ALWAYS flows from **LESS negative → MORE negative** (`0 > −2 > −6`), just like heat from `−2°C → −6°C`!",
      quiz: {
        prompt: "Cell X has `Ψ = −3.5 bars` and neighboring Cell Y has `Ψ = −7.0 bars`. Which direction is net osmosis?",
        options: ["From Cell X (−3.5) INTO Cell Y (−7.0)!", "From Cell Y into Cell X", "Zero net water flow", "Out of both cells"],
        answer: "From Cell X (−3.5) INTO Cell Y (−7.0)!",
        explanation: "`−3.5` is higher than `−7.0`, so water moves downhill from Cell X into saltier Cell Y!"
      }
    },
    {
      id: "trap-richter-magnitude-linear",
      title: "Thinking Magnitude 7 Is Only 1.4× Stronger Than Magnitude 5",
      trapExpression: "M 7.0 vs M 5.0 earthquake: how much more energy?",
      wrongGuess: "2× or 1.4× more energy",
      rightAnswer: "1,000× MORE ENERGY (and 100× bigger seismic waves!)",
      whyItHappens: "The magnitude scale looks like plain numbers 1–9, hiding its exponential base-10 / base-31.6 power!",
      quickRule: "`+1` magnitude = **`10×` wave amplitude** & **`~31.6×` energy**; `+2` magnitude = **`100×` amplitude** & **`1,000×` energy**!",
      quiz: {
        prompt: "A Magnitude `8.0` quake releases roughly how many times more energy than a Magnitude `7.0` quake?",
        options: ["~31.6× more energy (10^1.5)", "10× more energy", "2× more energy", "1.14× more energy"],
        answer: "~31.6× more energy (10^1.5)",
        explanation: "Every `+1.0` step multiplies seismic wave amplitude by `10×` and energy by `10^1.5 ≈ 31.6×`!"
      }
    },
    {
      id: "trap-sigfigs-add-vs-mult",
      title: "Using Total Sig Figs Instead of Decimal Places When Adding",
      trapExpression: "100.5 + 2.34 =? (round to 3 sig figs = 103?)",
      wrongGuess: "103 (counted 3 total sig figs from 2.34!)",
      rightAnswer: "102.8 (1 decimal place, matching 100.5!)",
      whyItHappens: "The Multiply/Divide rule (fewest total sig figs) gets misapplied to Addition/Subtraction.",
      quickRule: "**`+ / −`** → line up the dot, keep **fewest DECIMAL PLACES**! **`× / ÷`** → keep **fewest TOTAL SIG FIGS**!",
      quiz: {
        prompt: "What is `25.4 + 1.234` rounded cleanly by the significant-figure addition rule?",
        options: ["26.6 (1 decimal place, matching 25.4!)", "26.63", "27", "26.634"],
        answer: "26.6 (1 decimal place, matching 25.4!)",
        explanation: "`25.4` stops at the tenths place (1 decimal place), so `26.634` rounds cleanly to `26.6`!"
      }
    }
  );

  // ==================== +30 SCIENCE FORMULA CARDS (CHEM, BIO, EARTH & SPACE) ====================
  if (DATA.MEMORIZE_DATA && Array.isArray(DATA.MEMORIZE_DATA.scienceFormulas)) {
    DATA.MEMORIZE_DATA.scienceFormulas.push(
      { subject: "Chem", eq: "pH = pK_a + log([A⁻]/[HA])", meaning: "Henderson-Hasselbalch Buffer: when [A⁻] = [HA], pH = pK_a (half-equivalence!)" },
      { subject: "Chem", eq: "K_a · K_b = K_w = 10⁻¹⁴  |  pK_a + pK_b = 14", meaning: "Conjugate acid-base link at 25°C (stronger acid → weaker conjugate base)" },
      { subject: "Chem", eq: "E°_cell = E°_cathode − E°_anode", meaning: "Galvanic cell voltage (NEVER multiply E° by coefficients! E° > 0 = spontaneous)" },
      { subject: "Chem", eq: "ΔG° = −n F E°_cell  (F = 96,485 C/mol)", meaning: "Links voltage to Gibbs energy & equilibrium (E° = (0.0592/n) log K at 298 K)" },
      { subject: "Chem", eq: "E = E° − (0.0592 / n) log Q", meaning: "Nernst Equation (298 K): battery drains as Q grows until dead at Q = K (E = 0)" },
      { subject: "Chem", eq: "m = (I · t · M) / (n · F)", meaning: "Faraday's Electrolysis Law: exact grams of metal plated by current I over time t" },
      { subject: "Chem", eq: "K_sp: 1:1 → s² | 1:2 → 4s³ | 1:3 → 27s⁴", meaning: "Molar solubility s shortcuts; Q_sp > K_sp precipitates; common ion lowers s" },
      { subject: "Chem", eq: "ΔH°_rxn = ΣΔH°_f(Prod) − ΣΔH°_f(React)", meaning: "Hess's Formation Law (pure standard elements like O₂(g) have ΔH°_f = 0!)" },
      { subject: "Chem", eq: "ΔH_rxn ≈ ΣD(Broken) − ΣD(Formed)", meaning: "Bond Enthalpy FLIPS order (Reactants − Products): breaking costs +, forming pays −" },
      { subject: "Chem", eq: "0th: [A] | 1st: ln[A] | 2nd: 1/[A] (+k)", meaning: "Integrated rate law linear plots; ONLY 1st-order has constant t_(1/2) = 0.693/k!" },
      { subject: "Chem", eq: "k = A e^(−E_a / RT)  |  slope = −E_a/R", meaning: "Arrhenius kinetics: higher T or catalyst (lower E_a) boosts k exponentially" },
      { subject: "Chem", eq: "d = PM/(RT)  |  P_i = X_i P_total", meaning: "Gas density ('M = dRT/P') & Dalton's partial pressure mole-fraction law" },
      { subject: "Chem", eq: "v_rms = √(3RT/M)  |  r₁/r₂ = √(M₂/M₁)", meaning: "Graham's Effusion: lighter gas zips faster (He is 2× faster than CH₄!)" },
      { subject: "Chem", eq: "(P + an²/V²)(V − nb) = nRT", meaning: "Van der Waals real gas (a = IMF attractions, b = volume; deviates at high P, low T)" },
      { subject: "Chem", eq: "A = ε b c  |  A = −log₁₀(T)", meaning: "Beer-Lambert spectrophotometry: absorbance is directly proportional to molarity c" },
      { subject: "Bio", eq: "p + q = 1  |  p² + 2pq + q² = 1", meaning: "Hardy-Weinberg: start from recessive q² → q = √q² → p = 1−q → carriers = 2pq" },
      { subject: "Bio", eq: "χ² = Σ (O − E)² / E  (df = classes − 1)", meaning: "Chi-Square genetics test (df = 1 critical cutoff at p = 0.05 is 3.84)" },
      { subject: "Bio", eq: "v = V_max[S] / (K_m + [S])", meaning: "Michaelis-Menten: at [S] = K_m, v = ½V_max; LOW K_m = HIGH substrate affinity!" },
      { subject: "Bio", eq: "Ψ = Ψ_s + Ψ_p  |  Ψ_s = −i C R T", meaning: "Plant Water Potential: water ALWAYS flows from HIGHER (less −) Ψ to LOWER (more −) Ψ!" },
      { subject: "Bio", eq: "E_ion = (61.5 mV / z) log([out]/[in])", meaning: "Physiological Nernst (37°C): balances ion gradient; resting neuron ≈ −70 mV" },
      { subject: "Bio", eq: "N = (M · C) / R  |  NPP = GPP − R", meaning: "Lincoln-Petersen mark-recapture population estimate & Net Primary Productivity" },
      { subject: "Bio", eq: "N(t) = N₀ · 2^(t/g)  |  p_c = 1 − 1/R₀", meaning: "Bacterial exponential binary fission & Epidemiological Herd Immunity threshold" },
      { subject: "Bio", eq: "CO = HR × SV  |  MAP ≈ DP + ⅓(SP − DP)", meaning: "Cardiac Output (~5 L/min rest) & Mean Arterial Pressure (= CO × TPR)" },
      { subject: "Bio", eq: "VC = TV + IRV + ERV  |  C = (U · V) / P", meaning: "Lung Vital Capacity (TLC = VC + RV) & Renal Clearance (mL plasma cleaned/min)" },
      { subject: "Earth", eq: "d(pc) = 1/p(\")  |  L = 4πR²σT⁴  |  b = L/(4πd²)", meaning: "Stellar parallax (1 pc = 3.26 ly), star wattage & inverse-square brightness" },
      { subject: "Earth", eq: "v = H₀ d  |  t₀ ≈ 1/H₀  |  R_s = 2GM/c²", meaning: "Hubble expanding universe (~13.8 Gyr age) & Schwarzschild Black Hole radius" },
      { subject: "Earth", eq: "ΔM = +1 → 10× Amp, 31.6× Energy", meaning: "Seismic logarithmic scale (+2 magnitude = 100× amplitude & 1,000× energy!)" },
      { subject: "Earth", eq: "v_tsunami = √(g h)  |  Dry Lapse ≈ 9.8°C/km", meaning: "Shallow-water tsunami speed (jet speed in deep ocean) & rising-air mountain cooling" },
      { subject: "Earth", eq: "(1 − α) S₀ / 4 = σ T_eq⁴", meaning: "Planetary energy balance (Earth α = 0.30 → −18°C bare rock vs +15°C greenhouse)" },
      { subject: "Earth", eq: "t_d ≈ 70 / r(%)  |  τ = Stock/Flux  |  I = P·A·T", meaning: "Rule of 70 doubling time, reservoir residence time & IPAT environmental impact" }
    );
  }

  // ==================== +6 WORK STUDIO DERIVATIONS (CHEM, BIO & SCIENCE) ====================
  if (WORK_STUDIO && Array.isArray(WORK_STUDIO.PROBLEMS)) {
    WORK_STUDIO.PROBLEMS.push(
      {
        id: "wk-chem-henderson-buffer",
        track: "chemistry",
        difficulty: "Core",
        xp: 45,
        gems: 10,
        linkedNodeId: "chem-buffers-titration-henderson",
        title: "Compute Buffer pH via Henderson-Hasselbalch Equation",
        given: "pK_a = 4.74,\\quad [\\text{CH}_3\\text{COO}^-] = 0.50\\text{ M},\\quad [\\text{CH}_3\\text{COOH}] = 0.050\\text{ M}",
        goal: "Compute the base-to-acid ratio, its base-10 log, and the final buffer $\\text{pH}$.",
        steps: [
          {
            prompt: "Step 1: Compute the conjugate-base to weak-acid ratio $[A^-]/[HA]$.",
            rule: "Buffer Ratio",
            result: "10",
            accepted: ["10", "10/1", "10.0"],
            numericTarget: 10,
            hint: "Divide $0.50\\text{ M}$ by $0.050\\text{ M}$.",
            why: "$[A^-]/[HA] = 0.50 / 0.050 = 10$ (ten times more conjugate base than acid).",
            choices: [
              { expr: "10", correct: true },
              { expr: "0.1", correct: false, trapReason: "Upside-down ratio! Put conjugate BASE $[A^-]$ on TOP and ACID $[HA]$ on BOTTOM." },
              { expr: "0.45", correct: false, trapReason: "Divide $[A^-]/[HA]$, never subtract them!" },
              { expr: "100", correct: false, trapReason: "$0.50 / 0.050 = 10$, not $100$." }
            ]
          },
          {
            prompt: "Step 2: Take $\\log_{10}(10)$ and add to $pK_a = 4.74$ to get $\\text{pH}$.",
            rule: "Henderson-Hasselbalch Formula",
            result: "pH = 5.74",
            accepted: ["ph=5.74", "5.74"],
            numericTarget: 5.74,
            hint: "$\\log_{10}(10) = 1$, so $4.74 + 1 = ?$",
            why: "$\\text{pH} = 4.74 + \\log(10) = 4.74 + 1.00 = 5.74$ (higher than $pK_a$ because base dominates ✓!).",
            choices: [
              { expr: "pH = 5.74", correct: true },
              { expr: "pH = 3.74", correct: false, trapReason: "Sign flip: with MORE base than acid, $\\text{pH}$ must rise ABOVE $pK_a$!" },
              { expr: "pH = 14.74", correct: false, trapReason: "Take $\\log_{10}(10) = 1$ first — don't add $10$ directly to $pK_a$!" },
              { expr: "pH = 4.74", correct: false, trapReason: "$\\text{pH} = pK_a$ only when $[A^-] = [HA]$ ($1:1$ ratio)." }
            ]
          }
        ]
      },
      {
        id: "wk-chem-nernst-cell",
        track: "chemistry",
        difficulty: "Pro",
        xp: 50,
        gems: 11,
        linkedNodeId: "chem-electrochemistry-nernst-faraday",
        title: "Solve Non-Standard Battery Voltage with Nernst Equation",
        given: "E^{\\circ}_{\\text{cat}} = +0.80\\text{ V},\\quad E^{\\circ}_{\\text{an}} = -0.20\\text{ V},\\quad n = 2,\\quad Q = 100",
        goal: "Compute $E^{\\circ}_{\\text{cell}}$ and non-standard voltage $E$ at $298\\text{ K}$ ($0.0592\\text{ V}$ factor).",
        steps: [
          {
            prompt: "Step 1: Compute standard cell voltage $E^{\\circ}_{\\text{cell}} = E^{\\circ}_{\\text{cat}} - E^{\\circ}_{\\text{an}}$.",
            rule: "Galvanic Standard Potential",
            result: "1.00 V",
            accepted: ["1.00v", "1v", "1.0v", "1", "1.00", "e=1"],
            numericTarget: 1.0,
            hint: "$+0.80 - (-0.20) = ?$",
            why: "$E^{\\circ}_{\\text{cell}} = 0.80 - (-0.20) = +1.00\\text{ V}$.",
            choices: [
              { expr: "1.00 V", correct: true },
              { expr: "0.60 V", correct: false, trapReason: "Sign trap: subtracting a negative ADDS: $0.80 - (-0.20) = 1.00\\text{ V}$!" },
              { expr: "-1.00 V", correct: false, trapReason: "Always put Cathode minus Anode so spontaneous batteries have $E^{\\circ} > 0$!" },
              { expr: "2.00 V", correct: false, trapReason: "NEVER multiply $E^{\\circ}$ by $n = 2$!" }
            ]
          },
          {
            prompt: "Step 2: Evaluate the Nernst correction term $\\frac{0.0592}{n}\\log Q$ for $n = 2, Q = 100$.",
            rule: "Nernst Log-Quotient Term",
            result: "0.0592 V",
            accepted: ["0.0592v", "0.0592", "0.059v", "0.059"],
            numericTarget: 0.0592,
            tol: 0.002,
            hint: "$\\log_{10}(100) = 2$, and the $2$'s cancel cleanly: $(0.0592/2) \\times 2$!",
            why: "$(0.0592 / 2) \\times 2 = 0.0592\\text{ V}$.",
            choices: [
              { expr: "0.0592 V", correct: true },
              { expr: "0.0296 V", correct: false, trapReason: "Remember to multiply by $\\log_{10}(100) = 2$!" },
              { expr: "2.96 V", correct: false, trapReason: "Take $\\log_{10}(100) = 2$, don't multiply directly by $100$!" },
              { expr: "0.1184 V", correct: false, trapReason: "Divide by $n = 2$ as well as multiplying by $\\log 100 = 2$." }
            ]
          },
          {
            prompt: "Step 3: Compute $E = E^{\\circ}_{\\text{cell}} - 0.0592\\text{ V}$ (rounded to 3 decimals).",
            rule: "Non-Standard Cell Voltage",
            result: "0.941 V",
            accepted: ["0.941v", "0.941", "0.9408v", "0.9408", "0.94v", "0.94"],
            numericTarget: 0.9408,
            tol: 0.003,
            hint: "$1.0000 - 0.0592 = 0.9408 \\approx 0.941\\text{ V}$.",
            why: "Because $Q = 100 > 1$ (products built up), voltage dropped from $1.000\\text{ V}$ down to $0.941\\text{ V}$!",
            choices: [
              { expr: "0.941 V", correct: true },
              { expr: "1.059 V", correct: false, trapReason: "Nernst has a MINUS sign: $Q > 1$ drains voltage BELOW $E^{\\circ}$!" },
              { expr: "0.408 V", correct: false, trapReason: "Decimal shift error: $1.000 - 0.0592 = 0.9408$, not $0.408$." },
              { expr: "0.970 V", correct: false, trapReason: "Subtract $0.0592$, not $0.0296$." }
            ]
          }
        ]
      },
      {
        id: "wk-chem-ksp-1to2",
        track: "chemistry",
        difficulty: "Core",
        xp: 45,
        gems: 10,
        linkedNodeId: "chem-solubility-ksp-common-ion",
        title: "Solve Molar Solubility s of a 1:2 Salt from K_sp",
        given: "\\text{PbCl}_2(s) \\rightleftharpoons \\text{Pb}^{2+} + 2\\text{Cl}^-,\\quad K_{sp} = 3.2\\times 10^{-5}",
        goal: "Write $K_{sp}$ in terms of $s$, isolate $s^3$, and take the cube root to find molar solubility $s$.",
        steps: [
          {
            prompt: "Step 1: Express $K_{sp} = [\\text{Pb}^{2+}][\\text{Cl}^-]^2$ in terms of molar solubility $s$.",
            rule: "1:2 Salt K_sp Expression",
            result: "4s^3",
            accepted: ["4s^3", "ksp=4s^3", "4s3"],
            hint: "$[\\text{Pb}^{2+}] = s$ and $[\\text{Cl}^-] = 2s \\implies (s)(2s)^2$.",
            why: "$(s)(2s)^2 = s(4s^2) = 4s^3$.",
            choices: [
              { expr: "4s^3", correct: true },
              { expr: "2s^3", correct: false, trapReason: "Square the coefficient $2$ too: $(2s)^2 = 4s^2$, not $2s^2$!" },
              { expr: "s^3", correct: false, trapReason: "Two chloride ions form per formula unit, so $[\\text{Cl}^-] = 2s$." },
              { expr: "4s^2", correct: false, trapReason: "Multiply $s \\times 4s^2 = 4s^3$ (cubic, not quadratic!)." }
            ]
          },
          {
            prompt: "Step 2: Divide $K_{sp} = 3.2 \\times 10^{-5}$ by $4$ to find $s^3$.",
            rule: "Isolate s³",
            result: "8e-6",
            accepted: ["8e-6", "8x10^-6", "8*10^-6", "0.000008", "s^3=8e-6"],
            numericTarget: 0.000008,
            tol: 0.000001,
            hint: "Rewrite $3.2 \\times 10^{-5} = 32 \\times 10^{-6}$, then divide by $4$!",
            why: "$32 \\times 10^{-6} / 4 = 8 \\times 10^{-6}$ (a clean perfect cube!).",
            choices: [
              { expr: "8e-6", correct: true },
              { expr: "8e-5", correct: false, trapReason: "$3.2/4 = 0.8$, and $0.8 \\times 10^{-5} = 8 \\times 10^{-6}$ (not $10^{-5}$)!" },
              { expr: "1.28e-4", correct: false, trapReason: "Divide by $4$, don't multiply by $4$!" },
              { expr: "1.6e-5", correct: false, trapReason: "Divide by $4$, not by $2$." }
            ]
          },
          {
            prompt: "Step 3: Take the cube root of $8 \\times 10^{-6}$ to find molar solubility $s$.",
            rule: "Cube Root Extraction",
            result: "0.02 M",
            accepted: ["0.02m", "0.02", "2e-2", "2e-2m", "s=0.02"],
            numericTarget: 0.02,
            tol: 0.001,
            hint: "$\\sqrt[3]{8} = 2$ and $\\sqrt[3]{10^{-6}} = 10^{-2}$.",
            why: "$s = 2 \\times 10^{-2} = 0.02\\text{ M}$ (and $[\\text{Cl}^-] = 2s = 0.04\\text{ M}$ ✓!).",
            choices: [
              { expr: "0.02 M", correct: true },
              { expr: "0.002 M", correct: false, trapReason: "Divide exponent $-6$ by $3$ to get $10^{-2} = 0.01$, giving $0.02\\text{ M}$!" },
              { expr: "0.0028 M", correct: false, trapReason: "Take the CUBE root ($\\sqrt[3]{\\cdot}$), not the square root!" },
              { expr: "0.2 M", correct: false, trapReason: "$0.2^3 = 0.008$, which is $1000\\times$ too big!" }
            ]
          }
        ]
      },
      {
        id: "wk-chem-bond-enthalpy",
        track: "chemistry",
        difficulty: "Core",
        xp: 45,
        gems: 10,
        linkedNodeId: "chem-hess-calorimetry-bond-enthalpy",
        title: "Estimate Reaction ΔH for H₂ + Cl₂ → 2 HCl via Bond Enthalpies",
        given: "\\text{H}_2 + \\text{Cl}_2 \\to 2\\,\\text{HCl};\\quad D(\\text{H-H})=436,\\; D(\\text{Cl-Cl})=243,\\; D(\\text{H-Cl})=431\\text{ kJ/mol}",
        goal: "Sum broken reactant bonds, sum formed product bonds, and compute $\\Delta H = \\text{Broken} - \\text{Formed}$.",
        steps: [
          {
            prompt: "Step 1: Compute total energy required to BREAK reactant bonds (`1 H–H + 1 Cl–Cl`).",
            rule: "Endothermic Bond Breaking (+)",
            result: "679 kJ",
            accepted: ["679kj", "679", "+679kj", "+679"],
            numericTarget: 679,
            hint: "Add $436 + 243$.",
            why: "Breaking 1 mol `H–H` and 1 mol `Cl–Cl` costs $+679\\text{ kJ}$.",
            choices: [
              { expr: "679 kJ", correct: true },
              { expr: "193 kJ", correct: false, trapReason: "ADD both broken bonds ($436 + 243$), don't subtract them!" },
              { expr: "862 kJ", correct: false, trapReason: "$862\\text{ kJ}$ is the energy of the two product `H–Cl` bonds!" },
              { expr: "436 kJ", correct: false, trapReason: "Don't forget to also break the `Cl–Cl` bond ($243\\text{ kJ}$)!" }
            ]
          },
          {
            prompt: "Step 2: Compute total energy released when FORMING `2 mol H–Cl` product bonds.",
            rule: "Exothermic Bond Forming (×2 Stoichiometry)",
            result: "862 kJ",
            accepted: ["862kj", "862"],
            numericTarget: 862,
            hint: "Multiply $2 \\times 431\\text{ kJ}$.",
            why: "Forming 2 moles of `H–Cl` bonds releases $2(431) = 862\\text{ kJ}$.",
            choices: [
              { expr: "862 kJ", correct: true },
              { expr: "431 kJ", correct: false, trapReason: "Stoichiometry trap: the balanced equation makes **2** `HCl` molecules!" },
              { expr: "1293 kJ", correct: false, trapReason: "Multiply by $2$, not $3$." },
              { expr: "679 kJ", correct: false, trapReason: "$679\\text{ kJ}$ was the reactant bonds broken." }
            ]
          },
          {
            prompt: "Step 3: Compute $\\Delta H_{\\text{rxn}} = \\Sigma D(\\text{Broken}) - \\Sigma D(\\text{Formed})$.",
            rule: "Broken Minus Formed",
            result: "-183 kJ",
            accepted: ["-183kj", "-183", "dh=-183"],
            numericTarget: -183,
            hint: "Subtract $679 - 862$.",
            why: "$\\Delta H = 679 - 862 = -183\\text{ kJ/mol}$ — strongly exothermic because `H–Cl` bonds are super strong!",
            choices: [
              { expr: "-183 kJ", correct: true },
              { expr: "+183 kJ", correct: false, trapReason: "Order trap! Bond enthalpies ALWAYS use **Broken − Formed** (`679 − 862 = −183`)!" },
              { expr: "-1541 kJ", correct: false, trapReason: "Subtract formed from broken, don't add them!" },
              { expr: "+248 kJ", correct: false, trapReason: "You forgot the coefficient `2` on `2 HCl` ($679 - 431 = +248$)." }
            ]
          }
        ]
      },
      {
        id: "wk-chem-first-order-halflife",
        track: "chemistry",
        difficulty: "Core",
        xp: 45,
        gems: 10,
        linkedNodeId: "chem-arrhenius-integrated-rate-laws",
        title: "First-Order Half-Life & Concentration After 3 Half-Lives",
        given: "[A]_0 = 0.80\\text{ M},\\quad k = 0.03465\\text{ min}^{-1},\\quad t = 60\\text{ min}",
        goal: "Compute 1st-order half-life $t_{1/2}$, count elapsed half-lives, and find $[A]_{60}$.",
        steps: [
          {
            prompt: "Step 1: Compute 1st-order half-life $t_{1/2} = \\frac{0.693}{k}$.",
            rule: "First-Order Constant Half-Life",
            result: "20 min",
            accepted: ["20min", "20", "t=20"],
            numericTarget: 20,
            hint: "Divide $0.693 / 0.03465$ (notice $0.693 = 20 \\times 0.03465$!).",
            why: "$t_{1/2} = 0.693 / 0.03465 = 20\\text{ min}$ (completely independent of $[A]_0$!).",
            choices: [
              { expr: "20 min", correct: true },
              { expr: "10 min", correct: false, trapReason: "$0.693 / 0.03465 = 20$, not $10$." },
              { expr: "11.5 min", correct: false, trapReason: "Don't use the 0th-order formula $[A]_0/(2k)$ for a 1st-order reaction!" },
              { expr: "28.9 min", correct: false, trapReason: "Use $\\ln(2) = 0.693$ on top, NOT $1$ ($1/k$ is the mean lifetime, not half-life)." }
            ]
          },
          {
            prompt: "Step 2: Find remaining concentration $[A]$ after $60\\text{ min}$ ($60/20 = 3$ half-lives).",
            rule: "Exponential Halving [A]₀(½)ⁿ",
            result: "0.10 M",
            accepted: ["0.10m", "0.1m", "0.10", "0.1"],
            numericTarget: 0.1,
            hint: "Divide $0.80\\text{ M}$ by $2^3 = 8$.",
            why: "$0.80 \\to 0.40 \\to 0.20 \\to 0.10\\text{ M}$ — exact 1st-order decay!",
            choices: [
              { expr: "0.10 M", correct: true },
              { expr: "0.20 M", correct: false, trapReason: "That's only 2 half-lives ($40\\text{ min}$) — halve one more time!" },
              { expr: "0.27 M", correct: false, trapReason: "Divide by $2^3 = 8$, NOT by $3$!" },
              { expr: "0.05 M", correct: false, trapReason: "That's 4 half-lives ($80\\text{ min}$)." }
            ]
          }
        ]
      },
      {
        id: "wk-bio-hardy-weinberg-carriers",
        track: "algebra",
        difficulty: "Core",
        xp: 40,
        gems: 9,
        linkedNodeId: "bio-hardy-weinberg-population-genetics",
        title: "Hardy-Weinberg Carrier Frequency from Recessive Phenotypes",
        given: "\\text{Recessive trait } (aa): 9\\% \\text{ of population } (q^2 = 0.09)",
        goal: "Derive $q$, $p$, and heterozygous carrier frequency $2pq$.",
        steps: [
          {
            prompt: "Step 1: Extract recessive allele frequency $q = \\sqrt{q^2}$.",
            rule: "Allele Frequency from Recessive Homozygotes",
            result: "q = 0.3",
            accepted: ["q=0.3", "q=0.30", "0.3", "0.30"],
            numericTarget: 0.3,
            hint: "Take $\\sqrt{0.09}$.",
            why: "$q = \\sqrt{0.09} = 0.30$ (30% of alleles in the gene pool are recessive $a$).",
            choices: [
              { expr: "q = 0.3", correct: true },
              { expr: "q = 0.09", correct: false, trapReason: "$0.09$ is $q^2$ (genotype $aa$), NOT $q$ — take the square root!" },
              { expr: "q = 0.03", correct: false, trapReason: "$0.03^2 = 0.0009$, not $0.09$! $\\sqrt{0.09} = 0.3$." },
              { expr: "q = 0.91", correct: false, trapReason: "Take $\\sqrt{0.09}$ first before subtracting from $1$!" }
            ]
          },
          {
            prompt: "Step 2: Compute dominant allele frequency $p = 1 - q$.",
            rule: "Allele Conservation (p + q = 1)",
            result: "p = 0.7",
            accepted: ["p=0.7", "p=0.70", "0.7", "0.70"],
            numericTarget: 0.7,
            hint: "$1 - 0.3 = ?$",
            why: "$p = 1 - 0.3 = 0.7$.",
            choices: [
              { expr: "p = 0.7", correct: true },
              { expr: "p = 0.91", correct: false, trapReason: "Subtract $q = 0.3$ from $1$, NOT $q^2 = 0.09$!" },
              { expr: "p = 0.49", correct: false, trapReason: "$0.49$ is $p^2$ ($AA$ individuals), not $p$." },
              { expr: "p = 0.3", correct: false, trapReason: "$0.3$ is $q$; $p = 1 - q = 0.7$." }
            ]
          },
          {
            prompt: "Step 3: Compute heterozygous carrier frequency $2pq$.",
            rule: "Heterozygote Frequency (2pq)",
            result: "0.42",
            accepted: ["0.42", "42%", "2pq=0.42"],
            numericTarget: 0.42,
            hint: "Multiply $2 \\times 0.7 \\times 0.3$.",
            why: "$2pq = 2(0.7)(0.3) = 0.42$ ($42\\%$ of the population are silent carriers — check: $0.49 + 0.42 + 0.09 = 1.00$ ✓!).",
            choices: [
              { expr: "0.42", correct: true },
              { expr: "0.21", correct: false, trapReason: "Missing-two trap: there are TWO ways to be heterozygous ($Aa$ and $aA$), so multiply by $2$!" },
              { expr: "0.49", correct: false, trapReason: "$0.49 = p^2$ is homozygous dominant $AA$, not carriers." },
              { expr: "0.60", correct: false, trapReason: "Multiply $2 \\times 0.7 \\times 0.3 = 0.42$." }
            ]
          }
        ]
      }
    );
  }

  // ==================== 19 PROCEDURAL GENERATORS (DATA.registerProceduralMap) ====================
  if (typeof DATA.registerProceduralMap === "function") {
    DATA.registerProceduralMap({
      "chem-buffers-titration-henderson": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const pka = pick([3.75, 4.74, 6.35, 7.21, 9.25]);
          const shift = pick([-1, 0, 1, 2]);
          const ratioStr = shift === -1 ? "1 : 10" : shift === 0 ? "1 : 1" : shift === 1 ? "10 : 1" : "100 : 1";
          const ans = +(pka + shift).toFixed(2);
          return {
            type: "mc",
            prompt: `A buffer has \`pK_a = ${pka}\` and base-to-acid ratio \`[A⁻] : [HA] = ${ratioStr}\`. Calculate its \`pH\`.`,
            options: numOpts(ans, [-2, -1, 1, 2], (v) => v.toFixed(2)),
            answer: ans.toFixed(2),
            hint: `Use \`pH = pK_a + log([A⁻]/[HA])\` (\`log(${ratioStr.split(" : ")[0]}/${ratioStr.split(" : ")[1]}) = ${shift}\`)!`,
            whyEasy: `\`pH = ${pka} + (${shift}) = ${ans.toFixed(2)}\`!`
          };
        }
        const pka = pick([3.2, 4.5, 5.8, 6.4, 8.1, 9.3]);
        const pkb = +(14 - pka).toFixed(1);
        return {
          type: "mc",
          prompt: `A weak acid has \`pK_a = ${pka}\` at \`25°C\`. What is the \`pK_b\` of its conjugate base?`,
          options: numOpts(pkb, [-2, -1, 1, 2], (v) => v.toFixed(1)),
          answer: pkb.toFixed(1),
          hint: "At `25°C`, `pK_a + pK_b = 14`!",
          whyEasy: `\`14.0 − ${pka} = ${pkb.toFixed(1)}\`!`
        };
      },

      "chem-electrochemistry-nernst-faraday": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const pairs = [
            { cat: "Ag⁺/Ag (+0.80 V)", an: "Cu²⁺/Cu (+0.34 V)", e: "+0.46 V", w: ["+1.14 V", "−0.46 V", "+1.26 V"] },
            { cat: "Ag⁺/Ag (+0.80 V)", an: "Zn²⁺/Zn (−0.76 V)", e: "+1.56 V", w: ["+0.04 V", "−1.56 V", "+2.36 V"] },
            { cat: "Cu²⁺/Cu (+0.34 V)", an: "Fe²⁺/Fe (−0.44 V)", e: "+0.78 V", w: ["−0.10 V", "−0.78 V", "+0.10 V"] },
            { cat: "Fe³⁺/Fe²⁺ (+0.77 V)", an: "Zn²⁺/Zn (−0.76 V)", e: "+1.53 V", w: ["+0.01 V", "−1.53 V", "+0.77 V"] }
          ];
          const p = pick(pairs);
          return {
            type: "mc",
            prompt: `Compute \`E°_cell\` for a spontaneous galvanic cell built from \`${p.cat}\` and \`${p.an}\`.`,
            options: shuffle([p.e, ...p.w]),
            answer: p.e,
            hint: "Higher `E°` is Cathode; compute `E°_cathode − E°_anode` (never multiply!)!",
            whyEasy: `Subtracting anode from cathode gives \`${p.e}\`!`
          };
        }
        return bankQ([
          { prompt: "In `ΔG° = −nFE°_cell`, a spontaneous galvanic cell ALWAYS has:", options: ["E°_cell > 0, ΔG° < 0, and K > 1", "E°_cell < 0, ΔG° < 0, and K < 1", "E°_cell > 0, ΔG° > 0, and K < 1", "E°_cell = 0 and ΔG° = 0"], answer: "E°_cell > 0, ΔG° < 0, and K > 1", hint: "Notice the minus sign in `ΔG° = −nFE°`!", whyEasy: "Positive voltage drives negative `ΔG°` and favors products (`K > 1`)!" },
          { prompt: "In a galvanic battery, electrons ALWAYS flow through the external wire:", options: ["From Anode (oxidation) → Cathode (reduction)", "From Cathode → Anode", "Through the salt bridge only", "In both directions equally"], answer: "From Anode (oxidation) → Cathode (reduction)", hint: "Remember **'FAT CAT'** (From Anode To CAThode)!", whyEasy: "Oxidation releases electrons at the Anode; Reduction consumes them at the Cathode!" },
          { prompt: "What is the role of the **Salt Bridge** in a galvanic cell?", options: ["Maintains electrical neutrality by migrating spectator ions so charge doesn't build up!", "Carries free electrons between metals", "Doubles E°_cell", "Acts as a catalyst"], answer: "Maintains electrical neutrality by migrating spectator ions so charge doesn't build up!", hint: "Without ion balance, voltage dies instantly!", whyEasy: "Anions migrate toward the anode and cations toward the cathode to keep both beakers neutral!" },
          { prompt: "How many moles of solid `Cu` (`Cu²⁺ + 2e⁻ → Cu`) are plated by `4.0` moles of electrons (`4F` Coulombs)?", options: ["2.0 mol", "4.0 mol", "8.0 mol", "1.0 mol"], answer: "2.0 mol", hint: "Divide `4.0 mol e⁻` by `n = 2`!", whyEasy: "Each copper atom requires 2 electrons → `4 / 2 = 2.0 mol Cu`!" }
        ]);
      },

      "chem-solubility-ksp-common-ion": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const salts = [
            { formula: "AgBr (1:1)", expr: "s²", wrong: ["2s²", "4s³", "27s⁴"] },
            { formula: "PbI₂ (1:2)", expr: "4s³", wrong: ["2s³", "s³", "27s⁴"] },
            { formula: "Ag₂CrO₄ (2:1)", expr: "4s³", wrong: ["2s³", "s²", "27s⁴"] },
            { formula: "Al(OH)₃ (1:3)", expr: "27s⁴", wrong: ["3s⁴", "9s⁴", "4s³"] }
          ];
          const sl = pick(salts);
          return {
            type: "mc",
            prompt: `Express \`K_sp\` in terms of molar solubility \`s\` for the salt \`${sl.formula}\`.`,
            options: shuffle([sl.expr, ...sl.wrong]),
            answer: sl.expr,
            hint: "Remember: 1:1 → `s²`, 1:2 or 2:1 → `(s)(2s)² = 4s³`, 1:3 → `(s)(3s)³ = 27s⁴`!",
            whyEasy: `Raising BOTH coefficient and \`s\` to the stoichiometric power gives \`${sl.expr}\`!`
          };
        }
        return bankQ([
          { prompt: "If ion product `Q_sp` is LESS than `K_sp` (`Q_sp < K_sp`), what happens in the beaker?", options: ["Unsaturated — NO precipitate forms (more solid can still dissolve!)", "Heavy precipitate forms immediately", "Solution boils", "K_sp shrinks to match Q_sp"], answer: "Unsaturated — NO precipitate forms (more solid can still dissolve!)", hint: "`Q_sp` hasn't reached the saturation ceiling `K_sp` yet!", whyEasy: "Below saturation, the equilibrium runs forward to dissolve more salt!" },
          { prompt: "Adding `NaF` to a saturated solution of `CaF₂` (common ion `F⁻`) does what to `CaF₂`'s molar solubility `s` and its constant `K_sp`?", options: ["Solubility s DECREASES, while K_sp stays UNCHANGED!", "Both s and K_sp decrease", "Solubility s increases", "Both stay unchanged"], answer: "Solubility s DECREASES, while K_sp stays UNCHANGED!", hint: "Only temperature can change an equilibrium constant `K_sp`!", whyEasy: "Extra `F⁻` shifts dissolution left (`s ↓`), while `K_sp` remains constant at fixed temperature!" },
          { prompt: "Which salt has solubility that INCREASES sharply when you add strong acid (`HNO₃`)?", options: ["Mg(OH)₂ (basic OH⁻ anion is neutralized by H⁺!)", "AgCl (Cl⁻ is conjugate of strong acid HCl)", "AgBr", "AgI"], answer: "Mg(OH)₂ (basic OH⁻ anion is neutralized by H⁺!)", hint: "Acid pulls dissolution right when the anion is a weak/strong base (like `OH⁻, CO₃²⁻, F⁻`)!", whyEasy: "`H⁺` removes `OH⁻` into water, pulling `Mg(OH)₂` rapidly into solution!" },
          { prompt: "A 1:1 salt has `K_sp = 9.0 × 10⁻¹⁰`. What is its molar solubility `s = √(K_sp)`?", options: ["3.0 × 10⁻⁵ M", "9.0 × 10⁻⁵ M", "3.0 × 10⁻¹⁰ M", "4.5 × 10⁻¹⁰ M"], answer: "3.0 × 10⁻⁵ M", hint: "`√9 = 3` and `√(10⁻¹⁰) = 10⁻⁵`!", whyEasy: "`s = √(9 × 10⁻¹⁰) = 3.0 × 10⁻⁵ M`!" }
        ]);
      },

      "chem-hess-calorimetry-bond-enthalpy": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const m = pick([20, 40, 50, 100]);
          const dt = pick([5, 10, 15, 20]);
          const q = Math.round(m * 4.2 * dt);
          return {
            type: "mc",
            prompt: `How much heat \`q = m c ΔT\` raises \`${m} g\` of water (\`c = 4.2 J/(g·°C)\`) by \`ΔT = ${dt}°C\`?`,
            options: numOpts(q, [-q / 2, q / 2, 200, -200].filter((d) => q + d > 0)).map((v) => `${v} J`),
            answer: `${q} J`,
            hint: "Multiply `m × 4.2 × ΔT`!",
            whyEasy: `\`${m} × 4.2 × ${dt} = ${q} J\`!`
          };
        }
        const broken = pick([500, 600, 750, 800]);
        const formed = broken + pick([-150, -100, 120, 200]);
        const dh = broken - formed;
        const sign = dh > 0 ? `+${dh} kJ` : `${dh} kJ`;
        return {
          type: "mc",
          prompt: `A reaction breaks bonds costing \`${broken} kJ\` and forms new bonds releasing \`${formed} kJ\`. Estimate \`ΔH = Broken − Formed\`.`,
          options: shuffle([sign, dh > 0 ? `${-dh} kJ` : `+${-dh} kJ`, `+${broken + formed} kJ`, `−${broken + formed} kJ`]),
          answer: sign,
          hint: "Always subtract `Broken − Formed`!",
          whyEasy: `\`${broken} − ${formed} = ${sign}\` (${dh < 0 ? "exothermic" : "endothermic"})!`
        };
      },

      "chem-arrhenius-integrated-rate-laws": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const tHalf = pick([5, 10, 15, 20, 30]);
          const n = pick([2, 3, 4]);
          const start = pick([80, 160, 320]);
          const left = start / Math.pow(2, n);
          return {
            type: "mc",
            prompt: `A 1st-order reactant has half-life \`${tHalf} min\`. Starting with \`${start} mg\`, how much remains after \`${tHalf * n} min\`?`,
            options: numOpts(left, [left, -left / 2, left * 2, 5].filter((d) => left + d > 0)).map((v) => `${v} mg`),
            answer: `${left} mg`,
            hint: `Count half-lives: \`${tHalf * n} / ${tHalf} = ${n}\`, then divide \`${start}\` by \`2^${n}\`!`,
            whyEasy: `\`${start} / ${Math.pow(2, n)} = ${left} mg\`!`
          };
        }
        return bankQ([
          { prompt: "Which plot gives a straight line ONLY for a **1st-Order** reaction?", options: ["ln[A] vs time t (slope = −k)", "[A] vs time t", "1/[A] vs time t", "[A]² vs time t"], answer: "ln[A] vs time t (slope = −k)", hint: "1st order solves to `ln[A]_t = ln[A]₀ − kt`!", whyEasy: "0th → `[A]`; **1st → `ln[A]`**; 2nd → `1/[A]`!" },
          { prompt: "Which reaction order has a half-life `t_(1/2)` that is **COMPLETELY INDEPENDENT** of initial concentration `[A]₀`?", options: ["1st Order (t_(1/2) = 0.693 / k)", "0th Order", "2nd Order", "All reaction orders"], answer: "1st Order (t_(1/2) = 0.693 / k)", hint: "Notice `[A]₀` does NOT appear in `0.693 / k`!", whyEasy: "Radioactive decay and 1st-order chemistry halve on a steady metronome!" },
          { prompt: "On an Arrhenius graph (`ln k` vs `1/T`), a STEEPER negative slope means the reaction has:", options: ["A HIGHER activation energy E_a (more sensitive to temperature!)", "A lower activation energy E_a", "Zero activation energy", "Negative activation energy"], answer: "A HIGHER activation energy E_a (more sensitive to temperature!)", hint: "`slope = −E_a / R`!", whyEasy: "Steeper slope = larger `E_a` = bigger rate boost when you heat it up!" },
          { prompt: "For a **0th-Order** reaction (`t_(1/2) = [A]₀ / (2k)`), cutting initial concentration `[A]₀` in HALF makes the half-life:", options: ["Cut in HALF too!", "Stay constant", "Double", "Quadruple"], answer: "Cut in HALF too!", hint: "`[A]₀` sits directly in the numerator of `[A]₀ / (2k)`!", whyEasy: "Constant speed eating half as much food finishes in half the time!" }
        ]);
      },

      "chem-real-gases-dalton-graham": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const pairs = [
            { g1: "H₂ (M = 2)", g2: "O₂ (M = 32)", ratio: "4× faster (√(32/2) = 4)", w: ["16× faster", "2× faster", "4× slower"] },
            { g1: "He (M = 4)", g2: "SO₂ (M = 64)", ratio: "4× faster (√(64/4) = 4)", w: ["16× faster", "8× faster", "2× faster"] },
            { g1: "CH₄ (M = 16)", g2: "SO₂ (M = 64)", ratio: "2× faster (√(64/16) = 2)", w: ["4× faster", "8× faster", "2× slower"] },
            { g1: "H₂ (M = 2)", g2: "CH₄ (M = 16)", ratio: "2.83× faster (√8 ≈ 2.83)", w: ["8× faster", "4× faster", "2× faster"] }
          ];
          const p = pick(pairs);
          return {
            type: "mc",
            prompt: `By Graham's Law (\`r₁/r₂ = √(M₂/M₁)\`), how fast does \`${p.g1}\` effuse compared to \`${p.g2}\`?`,
            options: shuffle([p.ratio, ...p.w]),
            answer: p.ratio,
            hint: "Take the square root of `M₂ / M₁` — lighter gas is ALWAYS faster!",
            whyEasy: `\`√(M₂/M₁)\` gives \`${p.ratio}\`!`
          };
        }
        const n1 = randInt(1, 4);
        const n2 = randInt(1, 4);
        const ptot = (n1 + n2) * pick([2, 3, 4]);
        const p1 = (n1 * ptot) / (n1 + n2);
        return {
          type: "mc",
          prompt: `A tank mixes \`${n1} mol\` of Ar and \`${n2} mol\` of N₂ at total pressure \`${ptot} atm\`. What is the partial pressure of Ar?`,
          options: numOpts(p1, [-2, -1, 1, 2, 3].filter((d) => p1 + d > 0)).map((v) => `${v} atm`),
          answer: `${p1} atm`,
          hint: `Multiply \`(${n1} / ${n1 + n2}) × ${ptot}\`!`,
          whyEasy: `Mole fraction \`${n1}/${n1 + n2}\` of \`${ptot} atm\` equals \`${p1} atm\`!`
        };
      },

      "chem-spectroscopy-beer-lambert-nuclear": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const c1 = pick([0.1, 0.2, 0.4]);
          const a1 = +(c1 * 2).toFixed(2);
          const mult = pick([2, 3, 4]);
          const a2 = +(a1 * mult).toFixed(2);
          const c2 = +(c1 * mult).toFixed(2);
          return {
            type: "mc",
            prompt: `In Beer-Lambert spectrophotometry (\`A = εbc\`), a \`${c1} M\` standard reads \`A = ${a1}\`. What molarity gives \`A = ${a2}\` in the same cuvette?`,
            options: numOpts(c2, [-0.1, 0.1, 0.2, 0.3].filter((d) => c2 + d > 0), (v) => `${v.toFixed(2)} M`),
            answer: `${c2.toFixed(2)} M`,
            hint: "Absorbance `A` is directly proportional to concentration `c`!",
            whyEasy: `\`${a2} / ${a1} = ${mult}×\`, so \`c = ${mult} × ${c1} = ${c2.toFixed(2)} M\`!`
          };
        }
        return bankQ([
          { prompt: "What happens to a nucleus's mass number `A` and atomic number `Z` during **Alpha (`⁴₂He`) decay**?", options: ["A decreases by 4, Z decreases by 2", "A stays the same, Z increases by 1", "A stays the same, Z decreases by 1", "Neither A nor Z changes"], answer: "A decreases by 4, Z decreases by 2", hint: "An alpha particle carries 2 protons + 2 neutrons (`⁴₂He`)!", whyEasy: "Conserving top and bottom numbers gives `A − 4` and `Z − 2`!" },
          { prompt: "During **Beta-minus (`⁰₋₁e`) decay**, a neutron converts into a proton + emitted electron. How do `A` and `Z` change?", options: ["A stays unchanged, Z INCREASES by +1!", "A drops by 1, Z drops by 1", "A stays unchanged, Z decreases by −1", "A increases by 1, Z stays unchanged"], answer: "A stays unchanged, Z INCREASES by +1!", hint: "Gain 1 proton, lose 1 neutron → total nucleons `A` stays constant!", whyEasy: "`Z + 1` balances the `−1` charge of the emitted electron!" },
          { prompt: "Why does **Gamma (`⁰₀γ`) emission** leave both `A` and `Z` completely unchanged?", options: ["Gamma is pure high-energy electromagnetic radiation (a photon) with zero mass and zero charge!", "Gamma adds 1 proton and removes 1 proton", "Gamma only happens in chemical bonds", "Gamma doubles neutrons"], answer: "Gamma is pure high-energy electromagnetic radiation (a photon) with zero mass and zero charge!", hint: "An excited nucleus simply relaxes to a lower energy state by firing a photon!", whyEasy: "Zero nucleons and zero charge leave the element identity untouched!" },
          { prompt: "Which electromagnetic wave carries the **HIGHEST photon energy** (`E = hc / λ`)?", options: ["Gamma rays (shortest λ, highest frequency!)", "Infrared radiation", "Visible red light", "Radio waves"], answer: "Gamma rays (shortest λ, highest frequency!)", hint: "Energy is INVERSELY proportional to wavelength `λ`!", whyEasy: "Shortest wavelength = highest frequency = highest photon energy!" }
        ]);
      },

      "bio-hardy-weinberg-population-genetics": () => {
        const cases = [
          { q: 0.1, p: 0.9, q2: "1%", het: "18%", p2: "81%" },
          { q: 0.2, p: 0.8, q2: "4%", het: "32%", p2: "64%" },
          { q: 0.3, p: 0.7, q2: "9%", het: "42%", p2: "49%" },
          { q: 0.4, p: 0.6, q2: "16%", het: "48%", p2: "36%" },
          { q: 0.5, p: 0.5, q2: "25%", het: "50%", p2: "25%" }
        ];
        const c = pick(cases);
        if (randInt(0, 1) === 0) {
          const opts = new Set([c.het, c.p2, c.q2, `${Math.round(c.p * c.q * 100)}%`, "75%", "10%"]);
          const arr = Array.from(opts).slice(0, 4);
          return {
            type: "mc",
            prompt: `In a Hardy-Weinberg population, \`${c.q2}\` express a recessive trait (\`aa = q²\`). What percent are **heterozygous carriers (\`2pq\`)**?`,
            options: shuffle(arr),
            answer: c.het,
            hint: `Find \`q = ${c.q}\`, \`p = ${c.p}\`, then compute \`2pq\`!`,
            whyEasy: `\`2 × ${c.p} × ${c.q} = ${c.het}\` carriers!`
          };
        }
        const opts2 = new Set([c.p2, c.het, c.q2, `${Math.round(c.p * 100)}%`, "10%", "75%"]);
        const arr2 = Array.from(opts2).slice(0, 4);
        return {
          type: "mc",
          prompt: `If the recessive allele frequency in a Hardy-Weinberg population is \`q = ${c.q}\`, what percent are **homozygous dominant (\`AA = p²\`)**?`,
          options: shuffle(arr2),
          answer: c.p2,
          hint: `First find \`p = 1 − ${c.q} = ${c.p}\`, then square it (\`p²\`)!`,
          whyEasy: `\`p² = (${c.p})² = ${c.p2}\`!`
        };
      },

      "bio-enzyme-kinetics-michaelis-menten": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const vmax = pick([60, 80, 100, 120, 200]);
          const km = pick([2, 4, 5, 10]);
          const mult = pick([1, 3, 4]);
          const s = km * mult;
          const v = Math.round((vmax * s) / (km + s));
          return {
            type: "mc",
            prompt: `An enzyme has \`V_max = ${vmax} μM/s\` and \`K_m = ${km} mM\`. Calculate velocity \`v = V_max[S]/(K_m + [S])\` at \`[S] = ${s} mM\`.`,
            options: numOpts(v, [-20, -10, 10, 20].filter((d) => v + d > 0 && v + d <= vmax)).map((x) => `${x} μM/s`),
            answer: `${v} μM/s`,
            hint: `Plug into \`${vmax} × ${s} / (${km} + ${s})\`!`,
            whyEasy: `\`${vmax} × (${mult}/${mult + 1}) = ${v} μM/s\`!`
          };
        }
        return bankQ([
          { prompt: "A **Noncompetitive Inhibitor** binds an allosteric site away from the active site. How do `V_max` and `K_m` change?", options: ["V_max DECREASES (↓), while K_m stays UNCHANGED!", "K_m increases, V_max stays unchanged", "Both V_max and K_m increase", "Both V_max and K_m decrease"], answer: "V_max DECREASES (↓), while K_m stays UNCHANGED!", hint: "Adding more substrate CANNOT outcompete an allosteric blocker!", whyEasy: "Fewer working enzymes lower top speed (`V_max ↓`), while remaining active enzymes keep identical affinity (`K_m` unchanged)!" },
          { prompt: "An **Uncompetitive Inhibitor** binds ONLY to the enzyme-substrate (`ES`) complex. How do `V_max` and apparent `K_m` change?", options: ["BOTH V_max and K_m DECREASE (parallel Lineweaver-Burk lines!)", "V_max stays constant, K_m increases", "V_max decreases, K_m stays constant", "Both increase"], answer: "BOTH V_max and K_m DECREASE (parallel Lineweaver-Burk lines!)", hint: "Locking `ES` pulls binding forward (`K_m ↓`) while stalling catalysis (`V_max ↓`)!", whyEasy: "Both drop by the same factor, keeping slope `K_m/V_max` constant (parallel lines)!" },
          { prompt: "What does the ratio **`k_cat / K_m`** measure in enzyme kinetics?", options: ["Catalytic efficiency (combining speed AND substrate affinity!)", "Total enzyme concentration", "Inhibitor concentration", "Equilibrium pH"], answer: "Catalytic efficiency (combining speed AND substrate affinity!)", hint: "High turnover `k_cat` + low `K_m` (tight affinity) = huge ratio!", whyEasy: "Catalytic efficiency `k_cat/K_m` is the ultimate report card of an enzyme!" },
          { prompt: "On a Lineweaver-Burk plot (`1/v` vs `1/[S]`), what does the **x-intercept** equal?", options: ["−1 / K_m", "1 / V_max", "K_m / V_max", "+K_m"], answer: "−1 / K_m", hint: "Set `1/v = 0` in `1/v = (K_m/V_max)(1/[S]) + 1/V_max`!", whyEasy: "Solving `(K_m/V_max)x + 1/V_max = 0` gives `x = −1/K_m`!" }
        ]);
      },

      "bio-water-potential-nernst-neurophysiology": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const psiS = -randInt(4, 10);
          const psiP = randInt(1, 3);
          const cellPsi = psiS + psiP;
          return {
            type: "mc",
            prompt: `A plant cell has \`Ψ_s = ${psiS} bars\` and turgor \`Ψ_p = +${psiP} bars\`. What is its total Water Potential \`Ψ = Ψ_s + Ψ_p\`?`,
            options: numOpts(cellPsi, [-2, -1, 1, 2, -psiP * 2]).map((v) => `${v} bars`),
            answer: `${cellPsi} bars`,
            hint: "Simply add `Ψ_s + Ψ_p` (watching signs!)!",
            whyEasy: `\`${psiS} + ${psiP} = ${cellPsi} bars\`!`
          };
        }
        return bankQ([
          { prompt: "During the **Repolarization** downstroke of an Action Potential (falling from `+35 mV` back to `−70 mV`), which ion channel opens?", options: ["Voltage-gated K⁺ channels open, letting K⁺ rush OUT of the neuron!", "Na⁺ rushes into the neuron", "Cl⁻ rushes out", "ATP pumps stop forever"], answer: "Voltage-gated K⁺ channels open, letting K⁺ rush OUT of the neuron!", hint: "Positive ions EXITING pull inside voltage rapidly back negative!", whyEasy: "`K⁺` efflux restores negative resting voltage (even overshooting briefly into hyperpolarization)!" },
          { prompt: "Why does a **myelinated axon** conduct Action Potentials up to `10×` faster than an unmyelinated axon?", options: ["Myelin insulates the membrane so impulses leap rapidly from Node of Ranvier to Node (Saltatory Conduction)!", "Myelin adds extra Na⁺ pumps everywhere", "Myelin widens the synapse", "Myelin eliminates K⁺"], answer: "Myelin insulates the membrane so impulses leap rapidly from Node of Ranvier to Node (Saltatory Conduction)!", hint: "Latin *saltare* = 'to leap'!", whyEasy: "Jumping node-to-node skips regenerating the spike along insulated stretches!" },
          { prompt: "What stops an Action Potential from bouncing **BACKWARD** up the axon?", options: ["The Absolute Refractory Period (inactivated Na⁺ channels cannot immediately reopen!)", "Gravity pulls ions downward", "Myelin acts as a one-way valve", "K⁺ blocks the soma"], answer: "The Absolute Refractory Period (inactivated Na⁺ channels cannot immediately reopen!)", hint: "Just-fired `Na⁺` channels snap into a brief inactivated lock!", whyEasy: "Because behind the wave `Na⁺` gates are temporarily locked, the spike can only propagate forward!" },
          { prompt: "A flaccid plant cell (`Ψ_p = 0, Ψ_s = −6 bars`) sits in pure distilled water (`Ψ = 0`). At equilibrium, what will its turgor pressure `Ψ_p` rise to?", options: ["+6 bars (making total Ψ = −6 + 6 = 0!)", "0 bars", "−6 bars", "+12 bars"], answer: "+6 bars (making total Ψ = −6 + 6 = 0!)", hint: "Water enters until the cell's total `Ψ` matches pure water (`0`)!", whyEasy: "`Ψ_s + Ψ_p = 0 → −6 + Ψ_p = 0 → Ψ_p = +6 bars` (crisp, turgid cell!)!" }
        ]);
      },

      "bio-ecology-population-growth-energy": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const M = pick([20, 30, 40, 50, 60]);
          const R = pick([5, 10]);
          const C = R * pick([3, 4, 5]);
          const N = Math.round((M * C) / R);
          return {
            type: "mc",
            prompt: `Mark-Recapture: You tag \`M = ${M}\` fish, later catch \`C = ${C}\` fish, and \`R = ${R}\` carry tags. Estimate population \`N = (M·C)/R\`.`,
            options: numOpts(N, [-40, -20, 20, 40, 60].filter((d) => N + d > 0)),
            answer: String(N),
            hint: "Multiply `M × C` and divide by recaptures `R`!",
            whyEasy: `\`(${M} × ${C}) / ${R} = ${N}\` fish!`
          };
        }
        const gpp = pick([1500, 2000, 2500, 3000]);
        const resp = pick([600, 800, 900, 1100]);
        const npp = gpp - resp;
        return {
          type: "mc",
          prompt: `A wetland has \`GPP = ${gpp} kcal/(m²·yr)\` and plant respiration \`R = ${resp} kcal/(m²·yr)\`. Compute \`NPP = GPP − R\`.`,
          options: numOpts(npp, [-200, -100, 100, 200, gpp + resp - npp]).map((v) => `${v} kcal/(m²·yr)`),
          answer: `${npp} kcal/(m²·yr)`,
          hint: "Subtract plant respiration `R` from Gross Primary Productivity!",
          whyEasy: `\`${gpp} − ${resp} = ${npp} kcal/(m²·yr)\`!`
        };
      },

      "bio-immunology-vaccines-microbiology": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const r0 = pick([2, 4, 5, 10]);
          const pc = Math.round((1 - 1 / r0) * 100);
          return {
            type: "mc",
            prompt: `A pathogen has Basic Reproduction Number \`R₀ = ${r0}\`. Calculate the Herd Immunity Threshold \`p_c = 1 − 1/R₀\`.`,
            options: numOpts(pc, [-15, -10, 5, 10, 100 - pc * 2].filter((d) => pc + d > 0 && pc + d < 100)).map((v) => `${v}%`),
            answer: `${pc}%`,
            hint: `Compute \`1 − 1/${r0}\` and convert to percent!`,
            whyEasy: `\`1 − 1/${r0} = ${pc}%\`!`
          };
        }
        const n0 = pick([10, 25, 50, 100]);
        const gens = pick([3, 4, 5]);
        const ans = n0 * Math.pow(2, gens);
        return {
          type: "mc",
          prompt: `Starting with \`N₀ = ${n0}\` bacteria, how many cells exist after \`${gens}\` binary fission doublings (\`N₀ · 2ⁿ\`)?`,
          options: numOpts(ans, [-ans / 2, ans, n0 * gens - ans, 20].filter((d) => ans + d > 0)),
          answer: String(ans),
          hint: `Multiply \`${n0} × 2^${gens}\`!`,
          whyEasy: `\`${n0} × ${Math.pow(2, gens)} = ${ans}\` bacteria!`
        };
      },

      "bio-cardiorespiratory-renal-physiology": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const dp = pick([70, 80, 90]);
          const diff = pick([30, 45, 60]);
          const sp = dp + diff;
          const map = dp + diff / 3;
          return {
            type: "mc",
            prompt: `A patient's blood pressure is \`${sp} / ${dp} mmHg\`. Calculate Mean Arterial Pressure \`MAP = DP + (SP − DP)/3\`.`,
            options: numOpts(map, [-5, 5, 10, Math.round((sp + dp) / 2) - map]).map((v) => `${v} mmHg`),
            answer: `${map} mmHg`,
            hint: `Add 1/3 of pulse pressure (\`${diff}/3 = ${diff / 3}\`) to diastolic \`${dp}\`!`,
            whyEasy: `\`${dp} + ${diff}/3 = ${map} mmHg\`!`
          };
        }
        const hr = pick([60, 80, 100, 120]);
        const sv = pick([50, 75, 100]);
        const coL = (hr * sv) / 1000;
        return {
          type: "mc",
          prompt: `Compute Cardiac Output \`CO = HR × SV\` in **L/min** for \`HR = ${hr} bpm\` and \`SV = ${sv} mL/beat\`.`,
          options: numOpts(coL, [-2, -1, 1, 2, 3].filter((d) => coL + d > 0)).map((v) => `${v} L/min`),
          answer: `${coL} L/min`,
          hint: "Multiply `HR × SV` in mL/min, then divide by `1000`!",
          whyEasy: `\`${hr} × ${sv} = ${hr * sv} mL/min = ${coL} L/min\`!`
        };
      },

      "sci-astrophysics-luminosity-hubble-parallax": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const p = pick([0.5, 0.25, 0.2, 0.1, 0.05]);
          const d = Math.round(1 / p);
          return {
            type: "mc",
            prompt: `A star has parallax angle \`p = ${p} arcsec\`. How far away is it in **parsecs** (\`d = 1/p\`)?`,
            options: numOpts(d, [-2, -1, 1, 2, 5].filter((x) => d + x > 0)).map((v) => `${v} pc`),
            answer: `${d} pc`,
            hint: "Take the reciprocal `1 / p`!",
            whyEasy: `\`1 / ${p} = ${d} parsecs\`!`
          };
        }
        const distMpc = pick([20, 50, 100, 200, 300]);
        const vel = 70 * distMpc;
        return {
          type: "mc",
          prompt: `Using Hubble's Law (\`v = H₀ d\`, \`H₀ = 70 km/(s·Mpc)\`), how fast is a galaxy receding at \`d = ${distMpc} Mpc\`?`,
          options: numOpts(vel, [-700, 700, 1400, -1400].filter((x) => vel + x > 0)).map((v) => `${v} km/s`),
          answer: `${vel} km/s`,
          hint: "Multiply `70 × d`!",
          whyEasy: `\`70 × ${distMpc} = ${vel} km/s\`!`
        };
      },

      "sci-radiometric-dating-seismology-richter": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const cases = [
            { ratio: "1 : 1 (50% parent)", n: 1 },
            { ratio: "1 : 3 (25% parent)", n: 2 },
            { ratio: "1 : 7 (12.5% parent)", n: 3 },
            { ratio: "1 : 15 (6.25% parent)", n: 4 }
          ];
          const c = pick(cases);
          const hl = pick([100, 200, 500, 1000]);
          const age = c.n * hl;
          return {
            type: "mc",
            prompt: `A rock has Parent : Daughter ratio \`${c.ratio}\` for an isotope with half-life \`${hl} Myr\`. How old is the rock?`,
            options: numOpts(age, [-hl, hl, hl * 2, 50].filter((d) => age + d > 0)).map((v) => `${v} Myr`),
            answer: `${age} Myr`,
            hint: `Count how many half-lives leave \`${c.ratio}\`, then multiply by \`${hl} Myr\`!`,
            whyEasy: `\`${c.n} half-lives × ${hl} Myr = ${age} Myr\`!`
          };
        }
        return bankQ([
          { prompt: "How many times LARGER is the seismic wave **amplitude** of a Magnitude `7.0` quake vs a Magnitude `5.0` quake (`ΔM = 2`)?", options: ["100× larger amplitude (10²)", "1,000× larger amplitude", "20× larger amplitude", "2× larger amplitude"], answer: "100× larger amplitude (10²)", hint: "Wave amplitude scales as `10^(ΔM)` (energy scales as `10^(1.5 ΔM)`)!", whyEasy: "`10² = 100×` amplitude (and `1,000×` energy)!" },
          { prompt: "How many minimum seismic stations are needed to pinpoint an earthquake's exact **epicenter** by drawing distance circles?", options: ["3 stations (Triangulation!)", "1 station", "2 stations", "10 stations"], answer: "3 stations (Triangulation!)", hint: "Two circles intersect at 2 spots; the 3rd circle locks the single unique point!", whyEasy: "Three overlapping distance circles meet at ONE unique epicenter!" },
          { prompt: "Which seismic wave arrives **FIRST** at a seismograph station after an earthquake?", options: ["P-wave (Primary compressional wave — fastest!)", "S-wave (Secondary shear wave)", "Love surface wave", "Rayleigh wave"], answer: "P-wave (Primary compressional wave — fastest!)", hint: "**P** = **P**rimary (arrives first); **S** = **S**econdary!", whyEasy: "Compressional P-waves outrun S-waves and surface waves every time!" },
          { prompt: "A longer lag time (`t_S − t_P`) between P-wave and S-wave arrival means the earthquake epicenter is:", options: ["FARTHER away from the station!", "Closer to the station", "Directly underneath the station", "Higher in magnitude"], answer: "FARTHER away from the station!", hint: "The farther a fast runner and slow runner race, the wider the gap between them!", whyEasy: "Wider `S − P` time lag = greater distance `d` from the fault!" }
        ]);
      },

      "sci-oceanography-atmospheric-lapse-coriolis": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const baseT = pick([28, 30, 32, 34]);
          const km = pick([1, 1.5, 2, 2.5]);
          const topT = baseT - Math.round(km * 10);
          return {
            type: "mc",
            prompt: `Unsaturated air at \`${baseT}°C\` rises \`${km} km\` up a mountain (dry lapse \`≈ 10°C/km\`). Estimate its new temperature.`,
            options: numOpts(topT, [-5, -3, 3, 5, 10]).map((v) => `${v}°C`),
            answer: `${topT}°C`,
            hint: `Subtract \`${km} × 10°C\` from \`${baseT}°C\`!`,
            whyEasy: `\`${baseT} − ${km * 10} = ${topT}°C\`!`
          };
        }
        return bankQ([
          { prompt: "In the **Southern Hemisphere** (e.g., Australia), which direction does the Coriolis Effect deflect moving winds & ocean currents?", options: ["To the LEFT (so Southern cyclones spin CLOCKWISE!)", "To the right", "Straight north", "No deflection occurs"], answer: "To the LEFT (so Southern cyclones spin CLOCKWISE!)", hint: "North = Right (CCW cyclones); South = Left (CW cyclones)!", whyEasy: "Coriolis reverses across the Equator: Left deflection spins Southern lows clockwise!" },
          { prompt: "Why does the **Moist Adiabatic Lapse Rate (`~5–6°C/km`)** cool SLOWER than the Dry Lapse Rate (`9.8°C/km`)?", options: ["Condensing water vapor into cloud droplets releases Latent Heat back into the air!", "Wet air is heavier than dry air", "Clouds absorb sunlight from below", "Gravity weakens inside clouds"], answer: "Condensing water vapor into cloud droplets releases Latent Heat back into the air!", hint: "Condensation (`gas → liquid`) is EXOTHERMIC!", whyEasy: "Released latent heat partially offsets expansion cooling!" },
          { prompt: "When a deep-ocean tsunami (`v = √(gh)`) enters shallow coastal water (`h` drops to `1/100`), its speed:", options: ["Drops to 1/10 (√(1/100)) and its wave height shoots sharply UPWARD!", "Increases 10×", "Stays unchanged at 720 km/h", "Drops to zero immediately"], answer: "Drops to 1/10 (√(1/100)) and its wave height shoots sharply UPWARD!", hint: "Smaller depth `h` shrinks `√(gh)`, compressing wave energy vertically!", whyEasy: "As the front slows down, trailing water piles up into a towering destructive surge!" },
          { prompt: "On the **leeward (downwind)** side of a coastal mountain range, descending air warms dryly and creates a:", options: ["Warm, dry Rain Shadow!", "Freezing glacier", "Permanent typhoon", "Tropical coral reef"], answer: "Warm, dry Rain Shadow!", hint: "Moisture already rained out on the windward slope!", whyEasy: "Dry air warms rapidly at `~10°C/km` on the way down, dropping relative humidity sharply!" }
        ]);
      },

      "sci-measurement-error-sigfigs-dimensional": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const ms = pick([10, 15, 20, 25, 30, 35]);
          const kmh = ms * 3.6;
          return {
            type: "mc",
            prompt: `Convert \`${kmh} km/h\` to \`m/s\` using factor-label dimensional analysis.`,
            options: numOpts(ms, [-5, -2, 2, 5, 10].filter((d) => ms + d > 0)).map((v) => `${v} m/s`),
            answer: `${ms} m/s`,
            hint: "Divide `km/h` by `3.6` (`1000 m / 3600 s`)!",
            whyEasy: `\`${kmh} ÷ 3.6 = ${ms} m/s\`!`
          };
        }
        return bankQ([
          { prompt: "Multiply `3.2` (2 sig figs) × `4.125` (4 sig figs) = `13.200`. Rounded by the **Multiplication** sig-fig rule, the answer is:", options: ["13 (2 total sig figs!)", "13.2", "13.20", "13.200"], answer: "13 (2 total sig figs!)", hint: "Multiplication/Division keeps the fewest **total significant figures**!", whyEasy: "`3.2` has 2 sig figs, so round `13.2` to **2 sig figs = `13`**!" },
          { prompt: "If `A = 10.0 ± 0.3` and `B = 4.0 ± 0.2`, what is the uncertainty in `A − B`?", options: ["± 0.5 (ALWAYS ADD absolute errors, even when subtracting!)", "± 0.1", "± 0.6", "± 0.25"], answer: "± 0.5 (ALWAYS ADD absolute errors, even when subtracting!)", hint: "Uncertainties NEVER cancel out when you subtract two noisy numbers!", whyEasy: "`0.3 + 0.2 = ±0.5` (`6.0 ± 0.5`)!" },
          { prompt: "How many square centimeters (`cm²`) are in **`1 m²`**?", options: ["10,000 cm² (100² = 10⁴!)", "100 cm²", "1,000 cm²", "1,000,000 cm²"], answer: "10,000 cm² (100² = 10⁴!)", hint: "Square the conversion factor: `(100 cm / 1 m)²`!", whyEasy: "`100 × 100 = 10,000 cm²`!" },
          { prompt: "Four repeated weighings of a `50.0 g` standard read `47.1, 47.0, 47.1, 47.0 g`. These measurements are:", options: ["HIGH precision, LOW accuracy (classic Systematic Error!)", "High accuracy, low precision", "High accuracy and high precision", "Purely random error"], answer: "HIGH precision, LOW accuracy (classic Systematic Error!)", hint: "Tightly clustered = high precision; consistently off by `−3 g` = low accuracy!", whyEasy: "The scale needs zero-calibration (`+3.0 g` bias), not more trials!" }
        ]);
      },

      "sci-energy-balance-albedo-carbon-budget": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const kw = pick([0.5, 1, 1.5, 2, 2.5, 3]);
          const hrs = pick([2, 4, 6, 8]);
          const kwh = kw * hrs;
          return {
            type: "mc",
            prompt: `An appliance rated at \`${kw} kW\` runs for \`${hrs} hours\`. How much electrical energy (in \`kWh\`) does it use?`,
            options: numOpts(kwh, [-2, -1, 1, 2, 4].filter((d) => kwh + d > 0)).map((v) => `${v} kWh`),
            answer: `${kwh} kWh`,
            hint: "Energy = Power (`kW`) × Time (`hours`)!",
            whyEasy: `\`${kw} kW × ${hrs} h = ${kwh} kWh\`!`
          };
        }
        return bankQ([
          { prompt: "How many Megajoules (`MJ`) are inside **`1 kWh`** of electrical energy?", options: ["3.6 MJ (1000 J/s × 3600 s)", "1.0 MJ", "60 MJ", "360 MJ"], answer: "3.6 MJ (1000 J/s × 3600 s)", hint: "`1 kW = 1,000 J/s` and `1 hour = 3,600 s`!", whyEasy: "`1,000 × 3,600 = 3,600,000 J = 3.6 MJ`!" },
          { prompt: "If a planet's Albedo `α` INCREASES (covered by more bright reflective snow & clouds), its equilibrium temperature `T_eq`:", options: ["DECREASES (more sunlight bounced away → less absorbed!)", "Increases", "Stays unchanged", "Doubles"], answer: "DECREASES (more sunlight bounced away → less absorbed!)", hint: "Look at `(1 − α)` in `(1 − α)S₀/4 = σT⁴`!", whyEasy: "Higher `α` shrinks `(1 − α)`, cooling the planet!" },
          { prompt: "By the logarithmic CO₂ forcing formula `ΔF ≈ 5.35 ln(C/C₀)`, doubling atmospheric `CO₂` (`C/C₀ = 2`) adds roughly how much radiative forcing?", options: ["+3.7 W/m² (5.35 × ln 2)", "+5.35 W/m²", "+10.7 W/m²", "+0.37 W/m²"], answer: "+3.7 W/m² (5.35 × ln 2)", hint: "Multiply `5.35 × 0.693`!", whyEasy: "`5.35 × 0.693 ≈ +3.7 W/m²` trapping extra infrared energy!" },
          { prompt: "A wind farm rated at `100 MW` produces an average of `35 MW` across the year. What is its **Capacity Factor**?", options: ["35% (Actual / Rated max)", "100%", "65%", "2.85%"], answer: "35% (Actual / Rated max)", hint: "Divide actual average output by peak nameplate rating!", whyEasy: "`35 / 100 = 35%` capacity factor!" }
        ]);
      },

      "sci-environmental-biogeochemical-ecology-math": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const r = pick([1, 2, 3.5, 5, 7, 10]);
          const td = Math.round(70 / r);
          return {
            type: "mc",
            prompt: `Using the **Rule of 70 (\`t_d ≈ 70 / r\`)**, how long does a population growing at \`${r}%\` per year take to DOUBLE?`,
            options: numOpts(td, [-5, -2, 2, 5, 10].filter((d) => td + d > 0)).map((v) => `${v} years`),
            answer: `${td} years`,
            hint: "Divide `70` by the percentage rate `r` (don't convert `%` to decimal)!",
            whyEasy: `\`70 / ${r} = ${td} years\`!`
          };
        }
        const flux = pick([20, 25, 50, 100]);
        const days = pick([10, 15, 20, 30, 40]);
        const stock = flux * days;
        return {
          type: "mc",
          prompt: `A pond holds \`${stock} m³\` of water with steady inflow/outflow \`${flux} m³/day\`. Compute its Residence Time \`τ = Stock / Flux\`.`,
          options: numOpts(days, [-5, -2, 2, 5, 10].filter((d) => days + d > 0)).map((v) => `${v} days`),
          answer: `${days} days`,
          hint: "Divide total stock volume by daily flow rate!",
          whyEasy: `\`${stock} / ${flux} = ${days} days\`!`
        };
      }
    });
  }

  // ==================== 19 CURATED OFFLINE-LATEX WORKED EXAMPLES ====================
  if (LATEX && typeof LATEX.registerWorkedExamples === "function") {
    LATEX.registerWorkedExamples({
      "chem-buffers-titration-henderson": {
        heroFormula: "$$\\text{pH} = \\text{p}K_a + \\log\\frac{[A^-]}{[HA]}, \\qquad K_a K_b = K_w = 10^{-14}$$",
        title: "Calculating Buffer pH with Henderson-Hasselbalch",
        problemLatex: "$$\\text{Buffer: } \\text{p}K_a = 4.74,\\; [A^-] = 0.30\\text{ M},\\; [HA] = 0.030\\text{ M} \\implies \\text{pH} = \\text{?}$$",
        steps: [
          { label: "Compute the Base-to-Acid ratio `[A⁻]/[HA]`", mathLatex: "$\\frac{[A^-]}{[HA]} = \\frac{0.30}{0.030} = \\mathbf{10}$", plainWhy: "Conjugate base is 10× more concentrated than weak acid." },
          { label: "Take base-10 log of the ratio", mathLatex: "$\\log_{10}(10) = \\mathbf{+1.00}$", plainWhy: "Positive log means pH shifts ABOVE `pK_a`." },
          { label: "Add cleanly to `pK_a`", mathLatex: "$\\text{pH} = 4.74 + 1.00 = \\mathbf{5.74}$", plainWhy: "Notice how `pH = pK_a` when `[A⁻] = [HA]`!" }
        ],
        answerLatex: "$$\\text{pH} = 5.74$$",
        commonTrap: "Never invert the ratio to `[HA]/[A⁻]` — conjugate BASE always sits on TOP!"
      },
      "chem-electrochemistry-nernst-faraday": {
        heroFormula: "$$E^{\\circ}_{\\text{cell}} = E^{\\circ}_{\\text{cat}} - E^{\\circ}_{\\text{an}}, \\qquad \\Delta G^{\\circ} = -nFE^{\\circ}, \\qquad E = E^{\\circ} - \\frac{0.0592}{n}\\log Q$$",
        title: "Computing Galvanic Voltage & Mass Plated via Faraday's Law",
        problemLatex: "$$\\text{Cu}^{2+} (+0.34\\text{ V}) \\text{ vs } \\text{Zn}^{2+} (-0.76\\text{ V});\\quad Q = 10^2,\\; n = 2 \\implies E = \\text{?}$$",
        steps: [
          { label: "Find standard cell voltage `E°_cell`", mathLatex: "$E^{\\circ}_{\\text{cell}} = 0.34 - (-0.76) = \\mathbf{+1.10\\text{ V}}$", plainWhy: "Higher `E°` (`Cu²⁺`) is Cathode; lower (`Zn²⁺`) is Anode." },
          { label: "Plug `n = 2` and `Q = 100` into Nernst (298 K)", mathLatex: "$E = 1.10 - \\frac{0.0592}{2}\\log(100) = 1.10 - (0.0296)(2)$", plainWhy: "`log(100) = 2`, canceling neatly with `n = 2`!" },
          { label: "Read live non-standard voltage", mathLatex: "$E = 1.10 - 0.0592 = \\mathbf{+1.04\\text{ V}}$", plainWhy: "Higher products (`Q > 1`) nudged voltage slightly below `1.10 V`." }
        ],
        answerLatex: "$$E = +1.04\\text{ V}$$",
        commonTrap: "NEVER multiply `E°` by balanced reaction coefficients — voltage is intensive (`J/C`)!"
      },
      "chem-solubility-ksp-common-ion": {
        heroFormula: "$$1\\text{:}1 \\implies K_{sp} = s^2, \\qquad 1\\text{:}2 \\implies K_{sp} = 4s^3, \\qquad 1\\text{:}3 \\implies K_{sp} = 27s^4$$",
        title: "Finding Molar Solubility `s` & Checking Precipitate Formation",
        problemLatex: "$$\\text{CaF}_2(s) \\rightleftharpoons \\text{Ca}^{2+} + 2\\text{F}^-,\\quad K_{sp} = 3.2\\times 10^{-11} \\implies s = \\text{?}$$",
        steps: [
          { label: "Write `K_sp` with `s` and `2s`", mathLatex: "$K_{sp} = [\\text{Ca}^{2+}][\\text{F}^-]^2 = (s)(2s)^2 = \\mathbf{4s^3}$", plainWhy: "Two fluoride ions dissolve per formula unit, so square `2s` completely!" },
          { label: "Divide `K_sp` by `4` cleanly", mathLatex: "$s^3 = \\frac{32\\times 10^{-12}}{4} = \\mathbf{8.0\\times 10^{-12}}$", plainWhy: "Shifting to `10⁻¹²` makes the exponent divisible by 3!" },
          { label: "Take the cube root", mathLatex: "$s = \\sqrt[3]{8.0\\times 10^{-12}} = \\mathbf{2.0\\times 10^{-4}\\text{ M}}$", plainWhy: "Only `0.0002` moles of `CaF₂` dissolve per liter of pure water!" }
        ],
        answerLatex: "$$s = 2.0\\times 10^{-4}\\text{ M}$$",
        commonTrap: "Never forget to square the `2` in `(2s)² = 4s²` — writing `2s³` instead of `4s³` is the #1 `K_sp` mistake!"
      },
      "chem-hess-calorimetry-bond-enthalpy": {
        heroFormula: "$$q = mc\\Delta T, \\qquad \\Delta H^{\\circ}_{\\text{rxn}} = \\sum \\Delta H^{\\circ}_f(\\text{Prod}) - \\sum \\Delta H^{\\circ}_f(\\text{React}), \\qquad \\Delta H \\approx \\sum D(\\text{Broken}) - \\sum D(\\text{Formed})$$",
        title: "Using Coffee-Cup Calorimetry to Find Molar `ΔH_rxn`",
        problemLatex: "$$0.050\\text{ mol reaction warms } 100\\text{ g water } (c=4.184) \\text{ by } +5.0^{\\circ}\\text{C} \\implies \\Delta H_{\\text{rxn}} = \\text{?}$$",
        steps: [
          { label: "Calculate heat gained by water `q_water = mcΔT`", mathLatex: "$q_{\\text{water}} = (100)(4.184)(5.0) = \\mathbf{+2092\\text{ J}} = +2.092\\text{ kJ}$", plainWhy: "Water warmed up, so water absorbed heat (`+`)." },
          { label: "Flip sign for the chemical system (`q_rxn = −q_water`)", mathLatex: "$q_{\\text{rxn}} = \\mathbf{-2.092\\text{ kJ}} \\;(\\text{Exothermic!})$", plainWhy: "Heat gained by surroundings came straight out of the reaction." },
          { label: "Divide by moles reacted for molar `ΔH`", mathLatex: "$\\Delta H = \\frac{-2.092\\text{ kJ}}{0.050\\text{ mol}} = \\mathbf{-41.8\\text{ kJ/mol}}$", plainWhy: "Always report molar enthalpy in `kJ/mol` with its sign!" }
        ],
        answerLatex: "$$\\Delta H_{\\text{rxn}} = -41.8\\text{ kJ/mol}$$",
        commonTrap: "Remember the flip: Formation Enthalpies = `Products − Reactants`, whereas Bond Enthalpies = `Broken − Formed` (`Reactants − Products`)!"
      },
      "chem-arrhenius-integrated-rate-laws": {
        heroFormula: "$$\\ln[A]_t = \\ln[A]_0 - kt, \\qquad t_{1/2} = \\frac{0.693}{k}, \\qquad k = A e^{-E_a/(RT)}$$",
        title: "Solving 1st-Order Decay Time & Arrhenius Activation Energy",
        problemLatex: "$$\\text{1st-order } k = 0.0693\\text{ min}^{-1}: \\text{ Time for } [A] \\text{ to drop } 1.6\\text{ M} \\to 0.20\\text{ M?}$$",
        steps: [
          { label: "Find constant 1st-order half-life `t_(1/2)`", mathLatex: "$t_{1/2} = \\frac{0.693}{0.0693} = \\mathbf{10\\text{ min}}$", plainWhy: "1st-order half-life depends ONLY on `k`!" },
          { label: "Count how many halvings reach `0.20 M`", mathLatex: "$1.6 \\xrightarrow{1} 0.8 \\xrightarrow{2} 0.4 \\xrightarrow{3} 0.2 \\implies \\mathbf{3\\text{ half-lives}}$", plainWhy: "`1.6 / 0.2 = 8 = 2³`." },
          { label: "Multiply half-lives by `10 min`", mathLatex: "$t = 3 \\times 10 = \\mathbf{30\\text{ min}}$", plainWhy: "Fast, exact, and zero calculator needed!" }
        ],
        answerLatex: "$$t = 30\\text{ min}$$",
        commonTrap: "Do NOT assume constant half-life for 0th-order or 2nd-order reactions — ONLY 1st-order has constant `t_(1/2)`!"
      },
      "chem-real-gases-dalton-graham": {
        heroFormula: "$$d = \\frac{PM}{RT}, \\qquad P_i = X_i P_{\\text{tot}}, \\qquad \\frac{r_1}{r_2} = \\sqrt{\\frac{M_2}{M_1}}, \\qquad \\left(P + \\frac{an^2}{V^2}\\right)(V - nb) = nRT$$",
        title: "Identifying an Unknown Gas Using Graham's Effusion Law",
        problemLatex: "$$\\text{Helium } (M = 4\\text{ g/mol}) \\text{ effuses } 3\\times \\text{ faster than Gas X} \\implies M_X = \\text{?}$$",
        steps: [
          { label: "Set up Graham's inverse square-root ratio", mathLatex: "$\\frac{r_{\\text{He}}}{r_X} = \\sqrt{\\frac{M_X}{M_{\\text{He}}}} \\implies 3 = \\sqrt{\\frac{M_X}{4}}$", plainWhy: "Slower gas (`X`) must be HEAVIER than Helium!" },
          { label: "Square both sides to clear the root", mathLatex: "$9 = \\frac{M_X}{4}$", plainWhy: "`3² = 9` — speed ratio `3×` means mass ratio `9×`!" },
          { label: "Solve for molar mass `M_X`", mathLatex: "$M_X = 9 \\times 4 = \\mathbf{36\\text{ g/mol}}$", plainWhy: "Matches `HCl` (`36.5 g/mol`) cleanly!" }
        ],
        answerLatex: "$$M_X = 36\\text{ g/mol}$$",
        commonTrap: "Don't forget to SQUARE the rate ratio when solving for molar mass — `3×` slower means `9×` heavier, NOT `3×` heavier!"
      },
      "chem-spectroscopy-beer-lambert-nuclear": {
        heroFormula: "$$A = \\varepsilon b c = -\\log_{10} T, \\qquad E = h\\nu = \\frac{hc}{\\lambda}, \\qquad N(t) = N_0\\left(\\frac{1}{2}\\right)^{t/t_{1/2}}$$",
        title: "Balancing a Multi-Step Alpha + Beta Nuclear Decay Chain",
        problemLatex: "$${}^{238}_{92}\\text{U} \\xrightarrow{\\alpha} X \\xrightarrow{\\beta^-} Y \\implies \\text{Identify } X \\text{ and } Y!$$",
        steps: [
          { label: "Apply Alpha decay (`−4` top, `−2` bottom)", mathLatex: "$X = {}^{238-4}_{92-2}\\text{Th} = \\mathbf{{}^{234}_{90}\\text{Th}}$", plainWhy: "Losing `⁴₂He` reduces mass by 4 and protons by 2." },
          { label: "Apply Beta-minus decay (`0` top, `+1` bottom)", mathLatex: "$Y = {}^{234}_{90+1}\\text{Pa} = \\mathbf{{}^{234}_{91}\\text{Pa}}$", plainWhy: "Emitting `⁰₋₁e` turns a neutron into a proton (`Z: 90 → 91`)!" },
          { label: "Verify total conservation across both steps", mathLatex: "$\\text{Top: } 234 + 4 + 0 = 238\\;\\checkmark; \\quad \\text{Bottom: } 91 + 2 - 1 = 92\\;\\checkmark$", plainWhy: "Every nucleon and electric charge is accounted for!" }
        ],
        answerLatex: "$$X = {}^{234}_{90}\\text{Th}, \\qquad Y = {}^{234}_{91}\\text{Pa}$$",
        commonTrap: "Beta-minus decay INCREASES atomic number `Z` by `+1` (not `−1`), because `90 = 91 + (−1)`!"
      },
      "bio-hardy-weinberg-population-genetics": {
        heroFormula: "$$p + q = 1, \\qquad p^2 + 2pq + q^2 = 1, \\qquad \\chi^2 = \\sum \\frac{(O - E)^2}{E}$$",
        title: "Finding Hidden Genetic Carriers in 3 Fast Steps",
        problemLatex: "$$\\text{Recessive condition affects } 1\\text{ in } 2500\\text{ births } (q^2 = 0.0004) \\implies \\text{Carrier rate } 2pq = \\text{?}$$",
        steps: [
          { label: "Take square root of `q²` to get recessive allele `q`", mathLatex: "$q = \\sqrt{0.0004} = \\sqrt{4\\times 10^{-4}} = \\mathbf{0.02} \\;(1\\text{ in }50)$", plainWhy: "Never plug `q²` directly into `2pq`!" },
          { label: "Find dominant allele `p = 1 − q`", mathLatex: "$p = 1 - 0.02 = \\mathbf{0.98}$", plainWhy: "98% of alleles are normal dominant." },
          { label: "Compute carrier fraction `2pq`", mathLatex: "$2pq = 2(0.98)(0.02) = \\mathbf{0.0392} \\approx \\mathbf{4\\%} \\;(\\approx 1\\text{ in }25!)$", plainWhy: "Even for a 1-in-2500 disease, nearly 1 in 25 people silently carries the allele!" }
        ],
        answerLatex: "$$2pq \\approx 3.92\\% \\;(\\approx 1\\text{ in }25\\text{ people})$$",
        commonTrap: "Always start at `q²` (recessive phenotype) and take its SQUARE ROOT to find `q` before doing anything else!"
      },
      "bio-enzyme-kinetics-michaelis-menten": {
        heroFormula: "$$v = \\frac{V_{\\max}[S]}{K_m + [S]}, \\qquad \\frac{1}{v} = \\frac{K_m}{V_{\\max}}\\frac{1}{[S]} + \\frac{1}{V_{\\max}}$$",
        title: "Computing Enzyme Velocity & Diagnosing Inhibition",
        problemLatex: "$$V_{\\max} = 80\\,\\mu\\text{M/s},\\; K_m = 4\\text{ mM},\\; [S] = 12\\text{ mM} \\implies v = \\text{?}$$",
        steps: [
          { label: "Plug `[S] = 12` and `K_m = 4` into Michaelis-Menten", mathLatex: "$v = \\frac{80 \\times 12}{4 + 12} = \\frac{80 \\times 12}{16}$", plainWhy: "Notice `[S]` is `3 × K_m`, so `12 / 16 = 3/4` of top speed!" },
          { label: "Simplify cleanly", mathLatex: "$v = 80 \\times \\frac{3}{4} = \\mathbf{60\\,\\mu\\text{M/s}}$", plainWhy: "75% of maximum velocity!" },
          { label: "Check Competitive vs Noncompetitive signature", mathLatex: "$\\text{Comp: } K_m\\uparrow,\\; V_{\\max}\\text{ same}; \\qquad \\text{Noncomp: } V_{\\max}\\downarrow,\\; K_m\\text{ same}$", plainWhy: "Always check whether high `[S]` can rescue `V_max`!" }
        ],
        answerLatex: "$$v = 60\\,\\mu\\text{M/s}$$",
        commonTrap: "NEVER forget that **LOW `K_m` = HIGH affinity**, and **HIGH `K_m` = LOW affinity**!"
      },
      "bio-water-potential-nernst-neurophysiology": {
        heroFormula: "$$\\Psi = \\Psi_s + \\Psi_p, \\qquad \\Psi_s = -iCRT, \\qquad E_{\\text{ion}} = \\frac{61.5\\text{ mV}}{z}\\log\\frac{[\\text{out}]}{[\\text{in}]}$$",
        title: "Predicting Osmosis via Water Potential `Ψ` & Neuronal Nernst",
        problemLatex: "$$\\text{Open } 0.2\\text{ M NaCl } (i=2,\\; T=300\\text{ K},\\; R=0.0831) \\implies \\Psi = \\text{?}$$",
        steps: [
          { label: "Identify pressure potential `Ψ_p` for an open beaker", mathLatex: "$\\Psi_p = \\mathbf{0\\text{ bars}} \\;(\\text{open to atmosphere})$", plainWhy: "Only walled cells or pressurized chambers have non-zero `Ψ_p`." },
          { label: "Compute solute potential `Ψ_s = −iCRT`", mathLatex: "$\\Psi_s = -(2)(0.2)(0.0831)(300) \\approx \\mathbf{-9.97\\text{ bars}}$", plainWhy: "Double check `i = 2` for `NaCl → Na⁺ + Cl⁻`!" },
          { label: "Sum for total water potential `Ψ`", mathLatex: "$\\Psi = -9.97 + 0 = \\mathbf{-9.97\\text{ bars}}$", plainWhy: "Any potato cell with `Ψ = −4 bars` (`−4 > −9.97`) will LOSE water into this salty beaker!" }
        ],
        answerLatex: "$$\\Psi \\approx -10.0\\text{ bars}$$",
        commonTrap: "Water ALWAYS flows from LESS negative (`−4`) to MORE negative (`−10`) — never flip the direction on negative numbers!"
      },
      "bio-ecology-population-growth-energy": {
        heroFormula: "$$\\frac{dN}{dt} = r_{\\max}N\\left(\\frac{K - N}{K}\\right), \\qquad N = \\frac{M\\cdot C}{R}, \\qquad \\text{NPP} = \\text{GPP} - R$$",
        title: "Estimating Wildlife Population & 10% Energy Pyramid",
        problemLatex: "$$\\text{Tagged } M = 80,\\; \\text{Recaught } C = 50,\\; \\text{Marked } R = 10 \\implies N = \\text{?}$$",
        steps: [
          { label: "Set up Lincoln-Petersen proportion", mathLatex: "$\\frac{R}{C} = \\frac{M}{N} \\implies \\frac{10}{50} = \\frac{80}{N}$", plainWhy: "Assuming thorough mixing, 20% of the lake carries your tag." },
          { label: "Solve for total population `N`", mathLatex: "$N = \\frac{M \\cdot C}{R} = \\frac{80 \\times 50}{10} = \\mathbf{400\\text{ animals}}$", plainWhy: "Since 80 animals represent 20% (`1/5`), total population is `5 × 80 = 400`!" },
          { label: "Cross-check logistic peak harvest", mathLatex: "$N_{\\text{max growth}} = \\frac{K}{2} \\;(\\text{fastest sustainable replenishment!})$", plainWhy: "Fisheries aim near `K/2` where `(K − N)/K` balances `N` for maximum `dN/dt`!" }
        ],
        answerLatex: "$$N = 400\\text{ individuals}$$",
        commonTrap: "If tagged animals become trap-shy (avoid recapture → `R` artificially too small), `N = MC/R` OVERESTIMATES the real population!"
      },
      "bio-immunology-vaccines-microbiology": {
        heroFormula: "$$N(t) = N_0 \\cdot 2^{t/g}, \\qquad p_c = 1 - \\frac{1}{R_0}, \\qquad \\text{MHC-I}\\times\\text{CD8} = \\text{MHC-II}\\times\\text{CD4} = 8$$",
        title: "Calculating Bacterial Doubling & Vaccine Herd Immunity",
        problemLatex: "$$\\text{(A) } N_0 = 200,\\; g = 30\\text{ min},\\; t = 2.5\\text{ h}; \\qquad \\text{(B) } R_0 = 10 \\implies p_c = \\text{?}$$",
        steps: [
          { label: "Count bacterial generations `n = t / g`", mathLatex: "$t = 150\\text{ min} \\implies n = \\frac{150}{30} = \\mathbf{5\\text{ doublings}}$", plainWhy: "Convert hours to minutes before dividing by `g`!" },
          { label: "Compute exponential bacterial count `N₀ · 2ⁿ`", mathLatex: "$N = 200 \\times 2^5 = 200 \\times 32 = \\mathbf{6{,}400\\text{ cells}}$", plainWhy: "Notice how fast Log-phase binary fission explodes!" },
          { label: "Compute Herd Immunity Threshold for `R₀ = 10`", mathLatex: "$p_c = 1 - \\frac{1}{10} = 0.90 = \\mathbf{90\\%}$", plainWhy: "With 90% immune, only `10%` of 10 contacts (`= 1`) can catch it, stopping epidemic growth!" }
        ],
        answerLatex: "$$N = 6{,}400\\text{ cells}; \\qquad p_c = 90\\%$$",
        commonTrap: "Don't confuse Passive immunity (ready-made antibodies, instant, short-lived) with Active immunity (vaccines/infection creating long-term memory cells)!"
      },
      "bio-cardiorespiratory-renal-physiology": {
        heroFormula: "$$\\text{CO} = \\text{HR}\\times\\text{SV}, \\qquad \\text{MAP} \\approx \\text{DP} + \\frac{\\text{SP} - \\text{DP}}{3}, \\qquad C = \\frac{U \\cdot V}{P}$$",
        title: "Computing Cardiac Output, MAP & Renal Clearance",
        problemLatex: "$$\\text{HR} = 80\\text{ bpm},\\; \\text{SV} = 75\\text{ mL},\\; \\text{BP} = 135/75\\text{ mmHg} \\implies \\text{CO and MAP?}$$",
        steps: [
          { label: "Compute Cardiac Output (`CO = HR × SV`)", mathLatex: "$\\text{CO} = 80 \\times 75\\text{ mL/min} = 6000\\text{ mL/min} = \\mathbf{6.0\\text{ L/min}}$", plainWhy: "Divide mL by 1000 to report cleanly in Liters per minute." },
          { label: "Find Pulse Pressure (`SP − DP`)", mathLatex: "$\\text{PP} = 135 - 75 = \\mathbf{60\\text{ mmHg}}$", plainWhy: "Pulse pressure is the systolic surge above baseline diastolic pressure." },
          { label: "Weight diastole `2/3` and systole `1/3` for `MAP`", mathLatex: "$\\text{MAP} = 75 + \\frac{60}{3} = 75 + 20 = \\mathbf{95\\text{ mmHg}}$", plainWhy: "Healthy organ perfusion requires `MAP ≥ 65 mmHg` (normal `70–100 mmHg`)!" }
        ],
        answerLatex: "$$\\text{CO} = 6.0\\text{ L/min}, \\qquad \\text{MAP} = 95\\text{ mmHg}$$",
        commonTrap: "Never simply average `(SP + DP)/2` for `MAP` — the heart spends ~2/3 of each cycle in diastole, so `MAP` sits closer to `DP`!"
      },
      "sci-astrophysics-luminosity-hubble-parallax": {
        heroFormula: "$$d(\\text{pc}) = \\frac{1}{p('')}, \\qquad L = 4\\pi R^2\\sigma T^4, \\qquad b = \\frac{L}{4\\pi d^2}, \\qquad v = H_0 d, \\qquad R_s = \\frac{2GM}{c^2}$$",
        title: "Comparing Luminosity of Two Stars via `L ∝ R² T⁴`",
        problemLatex: "$$\\text{Star A has } R_A = 2R_{\\text{Sun}} \\text{ and } T_A = 2T_{\\text{Sun}} \\implies L_A / L_{\\text{Sun}} = \\text{?}$$",
        steps: [
          { label: "Write the luminosity ratio canceling constants `4πσ`", mathLatex: "$\\frac{L_A}{L_{\\text{Sun}}} = \\left(\\frac{R_A}{R_{\\text{Sun}}}\\right)^2 \\left(\\frac{T_A}{T_{\\text{Sun}}}\\right)^4$", plainWhy: "Taking ratios avoids messy scientific notation completely!" },
          { label: "Plug in `2×` radius and `2×` temperature", mathLatex: "$\\frac{L_A}{L_{\\text{Sun}}} = (2)^2 \\cdot (2)^4 = 4 \\times 16$", plainWhy: "Area grows `4×` while glow per square meter jumps `16×`!" },
          { label: "Multiply for total wattage jump", mathLatex: "$L_A = \\mathbf{64\\,L_{\\text{Sun}}}$", plainWhy: "Doubling both size and Kelvin temperature makes a star 64× brighter!" }
        ],
        answerLatex: "$$L_A = 64\\,L_{\\text{Sun}}$$",
        commonTrap: "Don't confuse true wattage (**Luminosity `L`**) with how bright a star looks in our sky (**Apparent Brightness `b = L/(4πd²)`**)!"
      },
      "sci-radiometric-dating-seismology-richter": {
        heroFormula: "$$\\frac{N}{N_0} = \\left(\\frac{1}{2}\\right)^{t/t_{1/2}}, \\qquad \\frac{\\text{Amp}_2}{\\text{Amp}_1} = 10^{\\Delta M}, \\qquad \\frac{E_2}{E_1} = 10^{1.5\\,\\Delta M}$$",
        title: "Dating a Rock from Parent:Daughter Ratio & Scaling Quake Energy",
        problemLatex: "$$\\text{(A) Parent:Daughter} = 1\\text{:}7,\\; t_{1/2} = 700\\text{ Myr}; \\qquad \\text{(B) } M\\,7.5 \\text{ vs } M\\,5.5 \\text{ Energy?}$$",
        steps: [
          { label: "Convert Parent:Daughter `1:7` into surviving fraction", mathLatex: "$\\frac{P}{P + D} = \\frac{1}{1 + 7} = \\frac{1}{8} = \\left(\\frac{1}{2}\\right)^3 \\implies \\mathbf{3\\text{ half-lives}}$", plainWhy: "Never forget to add `P + D` in the denominator!" },
          { label: "Multiply by half-life for rock age", mathLatex: "$t = 3 \\times 700\\text{ Myr} = \\mathbf{2{,}100\\text{ Myr (2.1 billion yr)}}$", plainWhy: "Clean isotopic clock!" },
          { label: "Scale earthquake energy for `ΔM = 7.5 − 5.5 = 2.0`", mathLatex: "$\\frac{E_2}{E_1} = 10^{1.5(2.0)} = 10^3 = \\mathbf{1{,}000\\times\\text{ more energy!}}$", plainWhy: "Wave amplitude grew `10² = 100×`, while energy jumped `1,000×`!" }
        ],
        answerLatex: "$$\\text{Age} = 2.1\\text{ Gyr}; \\qquad 1{,}000\\times\\text{ energy}$$",
        commonTrap: "A `1:3` Parent:Daughter ratio is **2 half-lives** (`1/4`), NOT 3 half-lives — always divide `P / (P + D)`!"
      },
      "sci-oceanography-atmospheric-lapse-coriolis": {
        heroFormula: "$$\\Gamma_{\\text{dry}} \\approx 9.8^{\\circ}\\text{C/km}, \\qquad \\text{RH} = \\frac{e}{e_s}\\times 100\\%, \\qquad v_{\\text{tsunami}} = \\sqrt{gh}$$",
        title: "Predicting Mountain Cooling & Open-Ocean Tsunami Speed",
        problemLatex: "$$\\text{(A) } 32^{\\circ}\\text{C air climbs } 2\\text{ km dry}; \\qquad \\text{(B) Tsunami in } h = 1000\\text{ m water } (g=10)$$",
        steps: [
          { label: "Apply Dry Adiabatic Lapse Rate (`≈ 10°C/km`)", mathLatex: "$T_{\\text{top}} = 32^{\\circ}\\text{C} - (2\\text{ km})(10^{\\circ}\\text{C/km}) = \\mathbf{12^{\\circ}\\text{C}}$", plainWhy: "Expanding air does work against surrounding lower pressure and cools sharply." },
          { label: "Apply shallow-water tsunami wave speed `v = √(gh)`", mathLatex: "$v = \\sqrt{(10)(1000)} = \\sqrt{10{,}000} = \\mathbf{100\\text{ m/s}}$", plainWhy: "Convert to `km/h` by multiplying by `3.6`: `360 km/h`!" },
          { label: "Check coastal shoaling effect (`h ↓`)", mathLatex: "$h \\to 10\\text{ m} \\implies v = \\sqrt{100} = \\mathbf{10\\text{ m/s}} \\;(\\text{energy piles into tall wave!})$", plainWhy: "Slowing down by `10×` compresses wavelength and forces wave height dangerously upward!" }
        ],
        answerLatex: "$$T_{\\text{top}} \\approx 12^{\\circ}\\text{C}; \\qquad v = 100\\text{ m/s (360 km/h)}$$",
        commonTrap: "Tsunamis are NOT powered by wind and do NOT travel at deep-water speed `√(gλ/2π)` — their huge `100+ km` wavelength always feels the ocean floor (`v = √(gh)`)!"
      },
      "sci-measurement-error-sigfigs-dimensional": {
        heroFormula: "$$\\text{\\% Error} = \\frac{|\\text{Exp} - \\text{True}|}{|\\text{True}|}\\times 100\\%, \\qquad Z = A^n \\implies \\frac{\\Delta Z}{Z} = |n|\\frac{\\Delta A}{A}$$",
        title: "Chaining Dimensional Conversions & Power Uncertainty Propagation",
        problemLatex: "$$\\text{(A) Convert } 90\\text{ km/h} \\to \\text{m/s}; \\qquad \\text{(B) Sphere } V = \\frac{4}{3}\\pi r^3 \\text{ with } \\frac{\\Delta r}{r} = 1.5\\%$$",
        steps: [
          { label: "Cancel `km` and `h` with factor-label fractions", mathLatex: "$90\\frac{\\text{km}}{\\text{h}} \\times \\frac{1000\\text{ m}}{1\\text{ km}} \\times \\frac{1\\text{ h}}{3600\\text{ s}} = \\frac{90}{3.6} = \\mathbf{25\\text{ m/s}}$", plainWhy: "Writing units explicitly guarantees you never accidentally multiply when you should divide!" },
          { label: "Apply Power Uncertainty Rule (`V ∝ r³`)", mathLatex: "$\\frac{\\Delta V}{V} = 3 \\cdot \\frac{\\Delta r}{r} = 3(1.5\\%) = \\mathbf{4.5\\%}$", plainWhy: "Constants like `4/3` and `π` are exact (zero error), while `r³` triples the percent error!" },
          { label: "Verify sig-fig precision rule", mathLatex: "$\\text{Add/Sub} \\to \\text{decimal places}; \\qquad \\text{Mult/Div} \\to \\text{total sig figs}$", plainWhy: "Never mix the two rounding rules!" }
        ],
        answerLatex: "$$25\\text{ m/s}; \\qquad \\frac{\\Delta V}{V} = 4.5\\%$$",
        commonTrap: "When SUBTRACTING two measurements (`A − B`), you STILL **ADD** their uncertainties (`ΔA + ΔB`) — errors never subtract!"
      },
      "sci-energy-balance-albedo-carbon-budget": {
        heroFormula: "$$(1 - \\alpha)\\frac{S_0}{4} = \\sigma T_{\\text{eq}}^4, \\qquad \\Delta F \\approx 5.35\\ln\\left(\\frac{C}{C_0}\\right), \\qquad 1\\text{ kWh} = 3.6\\text{ MJ}$$",
        title: "Computing Earth's Absorbed Solar Flux & Household kWh Energy",
        problemLatex: "$$S_0 = 1360\\text{ W/m}^2,\\; \\alpha = 0.30 \\implies F_{\\text{absorbed}} = \\text{?}; \\quad 2\\text{ kW AC for } 5\\text{ h} = \\text{? MJ}$$",
        steps: [
          { label: "Average solar flux over Earth's full spherical area (`÷ 4`)", mathLatex: "$\\frac{S_0}{4} = \\frac{1360}{4} = \\mathbf{340\\text{ W/m}^2}$", plainWhy: "Ratio of intercepting circle `πR²` to radiating sphere `4πR²` is `1/4`." },
          { label: "Subtract reflected Albedo (`α = 0.30 → keep 70%`)", mathLatex: "$F_{\\text{abs}} = (1 - 0.30)(340) = 0.70(340) = \\mathbf{238\\text{ W/m}^2}$", plainWhy: "Earth must radiate `238 W/m²` of infrared back to space to stay in steady balance!" },
          { label: "Convert household `kWh` cleanly to Megajoules", mathLatex: "$E = 2\\text{ kW} \\times 5\\text{ h} = 10\\text{ kWh} = 10 \\times 3.6 = \\mathbf{36\\text{ MJ}}$", plainWhy: "Every `1 kWh` packs `3.6 million Joules`!" }
        ],
        answerLatex: "$$F_{\\text{abs}} = 238\\text{ W/m}^2; \\qquad E = 10\\text{ kWh} = 36\\text{ MJ}$$",
        commonTrap: "Never forget `1 − α` (the *absorbed* fraction, NOT reflected `α`) and the `1/4` sphere factor when solving planetary temperature!"
      },
      "sci-environmental-biogeochemical-ecology-math": {
        heroFormula: "$$t_d \\approx \\frac{70}{r(\\%)}, \\qquad \\tau = \\frac{\\text{Stock}}{\\text{Flux}}, \\qquad I = P \\times A \\times T$$",
        title: "Projecting Doubling Time & Lake Flushing Residence Time",
        problemLatex: "$$\\text{(A) Growth } r = 2\\%/\\text{yr} \\implies \\text{time to } 4\\times\\text{?}; \\qquad \\text{(B) Lake } 500{,}000\\text{ m}^3,\\; Q = 25{,}000\\text{ m}^3/\\text{day}$$",
        steps: [
          { label: "Find one doubling time using Rule of 70", mathLatex: "$t_d \\approx \\frac{70}{2} = \\mathbf{35\\text{ years}}$", plainWhy: "Keep `r` as a plain percentage number (`2`, NOT `0.02`)!" },
          { label: "Count doublings to reach `4×` (`2² = 4` → 2 doublings)", mathLatex: "$t_{4\\times} = 2 \\times 35 = \\mathbf{70\\text{ years}}$", plainWhy: "Exponential growth stacks doubling upon doubling!" },
          { label: "Compute lake Residence Time `τ = Stock / Flux`", mathLatex: "$\\tau = \\frac{500{,}000\\text{ m}^3}{25{,}000\\text{ m}^3/\\text{day}} = \\mathbf{20\\text{ days}}$", plainWhy: "On average, a pollutant molecule stays in the lake for 20 days before flushing out!" }
        ],
        answerLatex: "$$t_{4\\times} \\approx 70\\text{ years}; \\qquad \\tau = 20\\text{ days}$$",
        commonTrap: "Never plug decimal `0.02` into `70 / r` (you'd wrongly get `3500 years`!) — Rule of 70 ALWAYS takes the whole percent number (`2`)!"
      }
    });
  }
})(typeof window !== "undefined" ? window : globalThis);
