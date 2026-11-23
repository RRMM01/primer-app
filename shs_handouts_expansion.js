// MathLingo SHS Grade 12 Handouts & STEM Bridge Expansion
// Covers 100% of PHYS2 (HO1–HO12 + LAG3/4), CHEM2 (L1–L12), BIO2 (L1–L12),
// WICA (HO1–HO12 + LAG3/4), PERSDEV (L1–L12), WLNS6 (L1–L6) + 4 Math/STEM Bridges.
(function (root) {
  "use strict";

  const DATA = root.MATHLINGO_DATA;
  const LATEX = root.MATHLINGO_LATEX;
  if (!DATA) return;

  // ==================== 3 NEW WORLDS (TOTAL: 12 WORLDS) ====================
  DATA.WORLDS.push(
    {
      id: "wica",
      subject: "wica",
      order: 10,
      icon: "💼",
      title: "WICA: Work Immersion, Career & Enterprise",
      subtitle: "4 K-12 Exits, PH business & job docs, 21st-century work, 4IR, STAR interviews, research & PM.",
      color: "#3e4f82",
      colorDark: "#2a375d",
      bgSoft: "rgba(62, 79, 130, 0.11)",
      borderSoft: "rgba(62, 79, 130, 0.30)"
    },
    {
      id: "persdev",
      subject: "persdev",
      order: 11,
      icon: "🧠",
      title: "PersDev: Brain, Emotions, Identity & Leadership",
      subtitle: "Self-concept, holistic growth, adolescent stress coping, neuroplasticity, EQ & relationships.",
      color: "#9c533c",
      colorDark: "#743a28",
      bgSoft: "rgba(156, 83, 60, 0.11)",
      borderSoft: "rgba(156, 83, 60, 0.30)"
    },
    {
      id: "wellness",
      subject: "wellness",
      order: 12,
      icon: "🌿",
      title: "Wellness: Fitness, Money & Purposeful Legacy",
      subtitle: "FITT physical health, excellence habits, personal finance compounding & values-driven leadership.",
      color: "#556b38",
      colorDark: "#3c4d26",
      bgSoft: "rgba(85, 107, 56, 0.11)",
      borderSoft: "rgba(85, 107, 56, 0.30)"
    }
  );

  // ==================== 32 NEW HANDOUT-FAITHFUL & STEM NODES (77–108) ====================
  const SHS_NODES = [
    // -------------------- PHYS2 (+6, HO1–HO12 + LAG3/4) --------------------
    {
      id: "phys2-coulomb-electric-field",
      worldId: "physics",
      order: 77,
      title: "PHYS2: Electric Charge, Charging & Coulomb's Law",
      icon: "⚡",
      tagline: "Like charges repel, opposites attract. Conduction = SAME sign; Induction = OPPOSITE sign! F = k|q₁q₂|/r².",
      scaryVersion: "Electrostatic charge quantization, triboelectric induction, and inverse-square Coulombic field vectors.",
      easyTruth: "Static electricity is just electrons hopping between materials — protons stay locked in the nucleus! Coulomb's Law works just like gravity, except charges can attract OR repel, and by Newton's 3rd Law BOTH charges always feel the exact same force magnitude!",
      microSteps: [
        { label: "Step 1: Conservation, Quantization & Charging Methods", text: "Charge is NEVER created or destroyed — rubbing only transfers electrons (1e = 1.6×10⁻¹⁹ C). Charging by CONDUCTION (direct touch) gives the SAME sign of charge; charging by INDUCTION (nearby field, NO touch) produces the OPPOSITE sign!" },
        { label: "Step 2: Coulomb's Law F = k|q₁q₂| / r²", text: "Constant k = 9.0 × 10⁹ N·m²/C². Always convert μC → ×10⁻⁶ C and cm → ÷100 m BEFORE squaring r! Use absolute values |q₁q₂| for magnitude; signs simply tell you Attract (−/+) vs Repel (+/+ or −/−)." },
        { label: "Step 3: Electric Field E = F / q (N/C)", text: "Electric field measures the force felt per 1 Coulomb of test charge at point P: E = F_e / q. Example: F = 0.25 N on q = 10⁻⁸ C gives E = 0.25 / 10⁻⁸ = 2.5 × 10⁷ N/C!" }
      ],
      cheatCode: "Conduction = Touch + Same sign; Induction = No touch + Opposite sign. F = k|q₁q₂|/r² (k = 9×10⁹; convert μC & cm!). E = F/q.",
      visualizerId: "electroMagLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "PHYS2 HO1 Sample: q₁ = 4 μC and q₂ = 1 μC sit r = 3 cm apart (k = 9×10⁹). Force F in Newtons?", answer: "40", hint: "Convert r = 0.03 m → r² = 9×10⁻⁴. Compute (9×10⁹)(4×10⁻⁶)(1×10⁻⁶) ÷ (9×10⁻⁴)!", whyEasy: "The 9s cancel cleanly: (4 × 10⁻³) ÷ 10⁻⁴ = 40 N (repulsive)!" },
        { type: "mc", prompt: "Charging a neutral metal sphere by INDUCTION (bringing a negative rod near WITHOUT touching, then grounding) leaves the sphere:", options: ["Negatively charged (same sign)", "Positively charged (opposite sign)", "Completely neutral", "Made of protons only"], answer: "Positively charged (opposite sign)", hint: "Conduction touches → same sign; Induction never touches → opposite sign!", whyEasy: "Repelled electrons escape to ground, leaving a net POSITIVE (opposite) charge!" },
        { type: "mc", prompt: "Charge A (+10 μC) sits near Charge B (+1 μC). Compare the Coulomb force A exerts on B vs B exerts on A:", options: ["A pushes B 10× harder", "B pushes A 10× harder", "Exact SAME magnitude, opposite directions!", "Zero on both"], answer: "Exact SAME magnitude, opposite directions!", hint: "Coulomb's Law obeys Newton's 3rd Law — notice F = k|q₁q₂|/r² is completely symmetric!", whyEasy: "Multiplying q₁·q₂ gives the exact same force magnitude on both charges!" },
        { type: "mc", prompt: "A test charge q = 10⁻⁸ C feels an electric force F = 0.25 N. What is the Electric Field strength E = F/q?", options: ["2.5 × 10⁷ N/C", "2.5 × 10⁻⁹ N/C", "4.0 × 10⁻⁸ N/C", "2.5 × 10⁵ N/C"], answer: "2.5 × 10⁷ N/C", hint: "Divide 0.25 by 10⁻⁸ (dividing by 10⁻⁸ multiplies by 10⁸!).", whyEasy: "0.25 × 10⁸ = 2.5 × 10⁷ N/C!" },
        { type: "mc", prompt: "If you TRIPLE the distance r between two point charges, the electric force between them becomes:", options: ["3× smaller (1/3)", "6× smaller (1/6)", "9× smaller (1/9)", "9× larger"], answer: "9× smaller (1/9)", hint: "Distance is SQUARED in the denominator of Coulomb's Law (3² = 9)!", whyEasy: "Inverse-square law: 1 / 3² = 1/9 of the original force!" }
      ]
    },
    {
      id: "phys2-electric-potential",
      worldId: "physics",
      order: 78,
      title: "PHYS2: Electric Potential Energy (U) vs. Voltage (V)",
      icon: "🔋",
      tagline: "U (Joules) is total energy; V = U/q (Volts = J/C) is energy PER charge — and BOTH scale as 1/r, NOT 1/r²!",
      scaryVersion: "Conservative electrostatic potential energy work-integrals and scalar potential gradients.",
      easyTruth: "Gravity drops balls from high elevation to low elevation. Electric fields push charges the exact same way! Moving ANY charge (+ or −) AGAINST the electric force stores more Potential Energy (U rises); moving WITH the electric force lowers U (W = −ΔU)!",
      microSteps: [
        { label: "Step 1: Work–Energy Rule (Works for + AND − Charges!)", text: "W_(a→b) = U_a − U_b = −ΔU. Universal rule: U INCREASES whenever a charge moves OPPOSITE to its electric force F_e, and DECREASES when moving WITH F_e. Moving along E-field lines always lowers electric potential V!" },
        { label: "Step 2: Point-Charge Energy U vs Voltage V (1/r NOT 1/r²!)", text: "Two charges: U = k·q·q₀ / r (in Joules, scalar — KEEP charge signs!). Single source voltage: V = U / q₀ = k·q / r (in Volts = J/C). Notice r is NOT squared here!" },
        { label: "Step 3: Halving Distance Doubles Voltage", text: "Because V = kq / r is strictly 1/r, cutting distance r in half DOUBLES voltage V! (Example from HO2: q = 8×10⁻¹¹ C gives 12 V at r = 0.06 m and 24 V at r = 0.03 m!)" }
      ],
      cheatCode: "U = kq₁q₂/r (Joules), V = kq/r = U/q₀ (Volts = J/C). Both are 1/r (NOT 1/r²!). Moving WITH F_e lowers U; along E lowers V!",
      visualizerId: "electroMagLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "What is the key formula difference between Electric Force (F) and Electric Potential (V) around a point charge?", options: ["F uses 1/r² while V uses 1/r (not squared!)", "V uses 1/r² while F uses 1/r", "Both use 1/r²", "V is a vector with direction"], answer: "F uses 1/r² while V uses 1/r (not squared!)", hint: "Energy/Voltage = Force × distance, which cancels one power of r!", whyEasy: "F = kq₁q₂/r² is a vector (1/r²), whereas V = kq/r is a scalar (1/r)!" },
        { type: "input", prompt: "A point charge creates V = 12 V at distance r = 0.06 m. At what distance (in cm) is V = 24 V?", answer: "3", hint: "V = kq/r is inversely proportional to r: doubling V cuts r in HALF!", whyEasy: "Half of 6 cm (0.06 m) is 3 cm (0.03 m) — exact HO2 sample problem!" },
        { type: "mc", prompt: "One Volt (1 V) of electric potential difference is defined identically as:", options: ["1 Newton per Coulomb (N/C)", "1 Joule per Coulomb (J/C)", "1 Coulomb per second (C/s)", "1 Joule per meter (J/m)"], answer: "1 Joule per Coulomb (J/C)", hint: "Check V = U / q₀ (Energy divided by Charge)!", whyEasy: "Voltage measures electric potential energy (Joules) carried by each Coulomb of charge!" },
        { type: "mc", prompt: "A NEGATIVE electron is forced to move IN THE SAME DIRECTION as an Electric Field E. Its potential energy U:", options: ["Increases (moving opposite to F_e!)", "Decreases", "Stays zero", "Becomes magnetic"], answer: "Increases (moving opposite to F_e!)", hint: "A negative charge feels force F_e OPPOSITE to E — so moving along E pushes it AGAINST F_e!", whyEasy: "Universal HO2 rule: moving opposite to F_e always INCREASES potential energy U!" },
        { type: "input", prompt: "Moving q = 2 C across a potential difference ΔV = 15 V changes its energy (ΔU = q·ΔV) by how many Joules?", answer: "30", hint: "Multiply charge (2 C) × voltage (15 J/C).", whyEasy: "2 C × 15 J/C = 30 Joules!" }
      ]
    },
    {
      id: "phys2-capacitors-dielectrics",
      worldId: "physics",
      order: 79,
      title: "PHYS2: Capacitors, Series/Parallel & Dielectrics",
      icon: "⚡",
      tagline: "C = Q/V. Series SHRINKS (1/C_S); Parallel ADDS (C_P)! Energy U = ½CV². Dielectric K boosts C & drops V!",
      scaryVersion: "Electrostatic capacitive networks, energy density storage, and polarized dielectric permittivity.",
      easyTruth: "Capacitors store separated +Q and −Q charge (net charge = 0!) like tiny electrical springs. CRITICAL OPPOSITE RULE: Capacitor formulas are the EXACT REVERSE of Resistor formulas — Parallel capacitors simply ADD (bigger plate area), while Series capacitors use RECIPROCALS (wider gap)!",
      microSteps: [
        { label: "Step 1: Capacitance C = Q/V & Series vs Parallel (OPPOSITE of Resistors!)", text: "1 Farad = 1 C/V (huge, so we use μF = 10⁻⁶ F, pF = 10⁻¹² F). PARALLEL: same V, C_P = C₁ + C₂ + ... (bigger than any single cap!). SERIES: same Q on every plate, 1/C_S = 1/C₁ + 1/C₂ + ... (ALWAYS smaller than the smallest cap — DON'T forget to invert at the end!)." },
        { label: "Step 2: Stored Energy U = ½QV = ½CV² = Q²/(2C)", text: "As a capacitor discharges, voltage drops linearly from V to 0, so average voltage is ½V → that's why there's a ½! (HO4 Defibrillator: C = 10 μF, V = 6000 V → U = ½(10×10⁻⁶)(6000)² = 180 J!)" },
        { label: "Step 3: Dielectrics (K = C/C₀ = V₀/V ≥ 1)", text: "Sliding an insulating dielectric slab between isolated plates keeps Q fixed, polarizes molecules against E, DROPS voltage (V = V₀/K), and BOOSTS capacitance by K (C = K·C₀). Remember: K is dimensionless!" }
      ],
      cheatCode: "Parallel C ADDS (C₁+C₂); Series uses 1/C_S (invert!). U = ½CV² = ½QV. Dielectric K = C/C₀ = V₀/V (C goes UP, V goes DOWN!).",
      visualizerId: "electroMagLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "PHYS2 LAG_3: Capacitors C₁ = 6 μF and C₂ = 12 μF are connected in SERIES. Total capacitance C_S (in μF)?", answer: "4", hint: "Series capacitors use reciprocals: 1/C_S = 1/6 + 1/12 = 3/12 — remember to FLIP at the end!", whyEasy: "1/6 + 1/12 = 3/12 = 1/4 → inverting gives C_S = 4 μF (smaller than 6 μF)!" },
        { type: "input", prompt: "PHYS2 LAG_3 Part 2: That 4 μF series combo connects to a 10 V battery. Total charge Q (in μC) stored?", answer: "40", hint: "Use Q = C_S × V (in μF × V = μC!).", whyEasy: "Q = (4 μF)(10 V) = 40 μC on EVERY capacitor in the series chain!" },
        { type: "input", prompt: "PHYS2 HO4 Defibrillator: C = 10 μF (10×10⁻⁶ F) charged to V = 6,000 V. Stored energy U = ½CV² in Joules?", answer: "180", hint: "Square 6,000 first (3.6 × 10⁷), multiply by 10×10⁻⁶ (= 360), then take HALF!", whyEasy: "½ × (10×10⁻⁶) × (3.6×10⁷) = ½ × 360 = 180 Joules!" },
        { type: "mc", prompt: "Inserting a dielectric slab into a DISCONNECTED charged capacitor (fixed Q) makes Voltage V and Capacitance C:", options: ["V decreases, C increases (by factor K)", "V increases, C decreases", "Both increase", "Both stay identical"], answer: "V decreases, C increases (by factor K)", hint: "Check K = V₀/V = C/C₀ where K > 1!", whyEasy: "Aligned dielectric molecules weaken the internal E-field → V drops (V₀/K) while C = Q/V climbs (K·C₀)!" },
        { type: "input", prompt: "HO4 Problem: Voltage drops from V₀ = 50 V to V = 25 V when a dielectric is inserted. Dielectric constant K?", answer: "2", hint: "K = V₀ ÷ V (initial over final, dimensionless!).", whyEasy: "K = 50 V ÷ 25 V = 2 (meaning capacitance doubled: C = 2·C₀)!" }
      ]
    },
    {
      id: "phys2-resistivity-ohms-dc",
      worldId: "physics",
      order: 80,
      title: "PHYS2: Resistivity (ρ), Temperature & DC Networks",
      icon: "🔌",
      tagline: "R = ρL/A (geometry + material). Metals resist MORE when hot (α > 0); Carbon resists LESS (α < 0)!",
      scaryVersion: "Ohmic microscopic conductivity, thermal resistivity coefficients, and composite series-parallel reduction.",
      easyTruth: "Think of wire resistance like drinking through a straw: a LONGER straw (↑ L) is harder to suck through (↑ R), while a WIDER straw (↑ area A) is easier (↓ R), and material stickiness is resistivity ρ! Heat shakes metal atoms harder (higher R), while carbon/semiconductors unlock more free carriers (lower R)!",
      microSteps: [
        { label: "Step 1: Current Direction & Resistance R = ρL / A", text: "Current I = ΔQ/Δt (1 A = 1 C/s). Conventional current flows + → −; actual electrons flow − → +. Resistance R (Ω) depends on shape & material (R = ρL/A), while Resistivity ρ (Ω·m) depends ONLY on material & temperature!" },
        { label: "Step 2: Temperature Rule R_T = R₀[1 + α(T − T₀)]", text: "Metals like Copper (α = +0.00393 /°C) INCREASE resistance when heated and drop when cooled. Semiconductors/Carbon (α = −0.0005 /°C) DECREASE resistance when heated! Superconductors crash suddenly to R = 0 below T_c!" },
        { label: "Step 3: Reducing Mixed Series–Parallel DC Circuits (HO6)", text: "Always collapse innermost Parallel branches FIRST (1/R_p = 1/R₂ + 1/R₃), then ADD Series pieces (R_eq = R₁ + R_p), find I_total = V/R_eq, and check that series voltage drops add back to battery voltage!" }
      ],
      cheatCode: "R = ρL/A (Ω vs ρ in Ω·m). R_T = R₀[1 + α(T − T₀)] (Metals α > 0, Carbon α < 0). Reduce Parallel first, then Series!",
      visualizerId: "physicsCircuitAndMotionLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "If you DOUBLE a copper wire's length L AND DOUBLE its cross-sectional area A, its resistance R = ρL/A:", options: ["Doubles", "Halves", "Stays the exact SAME!", "Quadruples"], answer: "Stays the exact SAME!", hint: "Check ρ(2L) / (2A) — the factors of 2 cancel!", whyEasy: "Longer wire doubles R while wider area halves R → net factor = 2/2 = 1!" },
        { type: "mc", prompt: "As temperature INCREASES, how does electrical resistivity behave in Metals vs Semiconductors (Carbon)?", options: ["Metals increase (α > 0); Semiconductors decrease (α < 0)", "Both always increase", "Both always decrease", "Metals drop to zero immediately"], answer: "Metals increase (α > 0); Semiconductors decrease (α < 0)", hint: "Hot metal lattice vibrations scatter electrons; heat frees extra charge carriers in semiconductors!", whyEasy: "Metals have positive α (+0.00393 for Cu), while Carbon has negative α (−0.0005)!" },
        { type: "input", prompt: "PHYS2 HO6 Circuit: 18 V battery in series with R₁ = 4 Ω and parallel pair (6 Ω ∥ 3 Ω). Total R_eq (Ω)?", answer: "6", hint: "Collapse parallel first: 1/6 + 1/3 = 3/6 = 1/2 → 2 Ω; then add series 4 Ω!", whyEasy: "Parallel pair gives 2 Ω, plus series 4 Ω = 6 Ω total equivalent resistance!" },
        { type: "input", prompt: "PHYS2 HO6 Part 2: In that 18 V circuit (R_eq = 6 Ω, R₁ = 4 Ω), what is the voltage drop V₁ across R₁ (in Volts)?", answer: "12", hint: "First find I_total = 18 V ÷ 6 Ω = 3 A, then multiply I × R₁!", whyEasy: "I = 3 A flows through R₁ = 4 Ω → V₁ = 3 × 4 = 12 V (leaving 6 V for the parallel pair)!" },
        { type: "mc", prompt: "What is the physical difference between Conventional Current and Electron Flow?", options: ["Conventional goes + to −; actual electrons in metals flow − to +", "They flow in the exact same direction", "Protons move through copper wires", "Conventional current has zero voltage"], answer: "Conventional goes + to −; actual electrons in metals flow − to +", hint: "Ben Franklin guessed + charges moved before electrons were discovered!", whyEasy: "Circuit diagrams use Conventional Current (+ → −), while negatively charged electrons physically drift − → +!" }
      ]
    },
    {
      id: "phys2-kirchhoff-circuits",
      worldId: "physics",
      order: 81,
      title: "PHYS2: Kirchhoff's Rules (KCL & KVL) & DC Loops",
      icon: "🔁",
      tagline: "KCL = charge can't pile up at a node (Σ I_in = Σ I_out). KVL = loop rises equal loop drops (Σ V = 0)!",
      scaryVersion: "Topological nodal current conservation, closed-mesh potential summation, and RC transient decay.",
      easyTruth: "Kirchhoff's two laws are just accounting! KCL (Junction Rule) says water entering a pipe tee MUST equal water leaving it (charge conservation). KVL (Loop Rule) says if you hike around any closed mountain loop and return to your tent, total climbs MUST equal total drops (energy conservation)!",
      microSteps: [
        { label: "Step 1: Nodes (Even Stretched Wires!), Branches & Loops", text: "A NODE connects 2+ elements — ideal wires have 0 Ω, so a stretched 'distributed node' with several branches is STILL ONE SINGLE NODE! A LOOP is any closed path that visits each node ONLY ONCE (loops CAN overlap!)." },
        { label: "Step 2: KCL Arrow-Flip Trick (HO7)", text: "Σ I_in = Σ I_out (or Σ I = 0 when all arrows point the same way). Got mixed IN/OUT arrows? Flip all IN arrows to OUT by reversing their sign (careful: −1 mA IN becomes +1 mA OUT!), then sum to 0! A negative result simply means current flows opposite your arrow." },
        { label: "Step 3: KVL Loop Check, EMF & RC Time Constant", text: "Around ANY closed loop (clockwise OR counterclockwise!), Σ V_rise = Σ V_drop (e.g. 20 V battery across 100, 200, 300, 400 Ω drops 2 + 4 + 6 + 8 = 20 V!). Real batteries have internal resistance r → terminal voltage V = ε − Ir. RC circuits charge/discharge on timescale τ = R·C!" }
      ],
      cheatCode: "KCL (Charge): Σ I_in = Σ I_out (watch double-negatives when flipping arrows!). KVL (Energy): Σ V = 0 around ANY loop. V_term = ε − Ir, τ = RC.",
      visualizerId: "physicsCircuitAndMotionLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "PHYS2 HO7 KCL: At a node, 5 mA and 1 mA flow IN; 2 mA and unknown i flow OUT. Find i (in mA):", answer: "4", hint: "Charge conservation: Total IN (5 + 1) must equal Total OUT (2 + i)!", whyEasy: "6 mA in = 2 mA + i out → i = 4 mA!" },
        { type: "input", prompt: "PHYS2 HO7 Problem 2: Five currents ALL point INTO a node: 1 mA, 4 mA, −2 mA, 3 mA, and i₅. Find i₅ (mA):", answer: "-6", hint: "When all arrows point IN, their algebraic sum equals 0: 1 + 4 + (−2) + 3 + i₅ = 0!", whyEasy: "6 + i₅ = 0 → i₅ = −6 mA (meaning 6 mA actually flows OUT of the node)!" },
        { type: "input", prompt: "PHYS2 HO7 Distributed Node: 4 mA IN, −1 mA IN, 6 mA OUT, −3 mA OUT, and i₃ OUT. Find i₃ (mA):", answer: "0", hint: "Sum IN = 4 + (−1) = 3 mA; Sum OUT = 6 + (−3) + i₃ = 3 + i₃!", whyEasy: "3 mA IN = (3 + i₃) mA OUT → i₃ = 0 mA! (Double-negative trap defeated!)" },
        { type: "input", prompt: "PHYS2 HO7 KVL Loop: 20 V battery powers 100 Ω, 200 Ω, 300 Ω, and 400 Ω in series. Voltage across the 300 Ω resistor (V)?", answer: "6", hint: "R_total = 1000 Ω → I = 20/1000 = 0.02 A (20 mA) → V₃ = 0.02 × 300!", whyEasy: "300 Ω is 30% of the 1000 Ω total, so it takes 30% of 20 V = 6 V (2+4+6+8 = 20 V)!" },
        { type: "mc", prompt: "Which two fundamental physics conservation laws are Kirchhoff's Current Law (KCL) and Voltage Law (KVL) based on?", options: ["KCL = Conservation of Charge; KVL = Conservation of Energy", "KCL = Gravity; KVL = Magnetism", "Both are Conservation of Mass", "KCL = Energy; KVL = Momentum"], answer: "KCL = Conservation of Charge; KVL = Conservation of Energy", hint: "Current counts flowing charges; Voltage measures energy per charge!", whyEasy: "Charge cannot vanish at a node (KCL) and energy cannot appear out of thin air around a loop (KVL)!" }
      ]
    },
    {
      id: "phys2-magnetism-lorentz-sources",
      worldId: "physics",
      order: 82,
      title: "PHYS2: Magnetism, Cyclotrons, Ampere & Biot-Savart",
      icon: "🧲",
      tagline: "F = |q|vB sin φ does ZERO work! Parallel currents ATTRACT! Wire has 2πr; Loop has 2R (no π!); Solenoid = μ₀nI.",
      scaryVersion: "Lorentz cross-product kinematics, cyclotron resonance, Ampèrian wire fields, and Biot–Savart integration.",
      easyTruth: "Magnetic force is strictly sideways (⊥ to BOTH v and B), so it can NEVER speed up or slow down a charge — it ONLY steers it into a circle (ZERO work done)! And unlike charges, parallel wires carrying current in the SAME direction ATTRACT each other!",
      microSteps: [
        { label: "Step 1: Lorentz Force & Zero-Work Cyclotron (HO9 & HO10)", text: "F = |q|vB sin φ (1 G = 10⁻⁴ T; stationary v = 0 or parallel φ = 0° gives F = 0!). Because F ⊥ v always, magnetic fields do ZERO work — uniform B bends charges into circles with R = mv/(|q|B) and cyclotron frequency f = |q|B/(2πm) (INDEPENDENT of speed v and radius R!)." },
        { label: "Step 2: Straight Wire & Parallel Conductors (HO11)", text: "Long straight wire (thumb = I, fingers curl = B): B = μ₀I / (2πr) with μ₀ = 4π×10⁻⁷ T·m/A. Two parallel wires: F/L = μ₀I₁I₂ / (2πr) — SAME direction currents ATTRACT; OPPOSITE currents REPEL!" },
        { label: "Step 3: Loop, Solenoid & Biot-Savart (HO12 + Handout Warning!)", text: "Circular N-turn coil center (fingers = I, thumb = B): B = μ₀NI / (2R) — notice NO π! Long Solenoid: B = μ₀nI (where n = N/L). Biot-Savart law: ΔB = (μ₀ / 4π)·(I·Δl·sin θ / r²). (Heads-up: HO12's header misprints 'Faraday's Law' and drops the '4' in 4π — always use μ₀/4π!)" }
      ],
      cheatCode: "F = |q|vB sin φ (0 work!). R = mv/qB, f = qB/2πm. Wire: μ₀I/2πr (same I ATTRACTS!). Loop: μ₀NI/2R (no π!). Solenoid: μ₀nI. Biot-Savart: μ₀/(4π).",
      visualizerId: "electroMagLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "PHYS2 HO10 Key Principle: Can a magnetic field alone EVER change the speed (kinetic energy) of a moving charge?", options: ["Yes, if B is strong enough", "No — F_B is always ⊥ to v, so magnetic force does ZERO work!", "Only in non-uniform fields", "Only for negative charges"], answer: "No — F_B is always ⊥ to v, so magnetic force does ZERO work!", hint: "Work W = F·d·cos(90°) = ?", whyEasy: "Perpendicular force ONLY bends direction into curves — speed stays constant (even in non-uniform B)!" },
        { type: "mc", prompt: "PHYS2 HO11 Trap: Two long parallel power cables carry current in the SAME direction. They:", options: ["REPEL each other (like charges)", "ATTRACT each other!", "Exert zero force", "Rotate 180°"], answer: "ATTRACT each other!", hint: "Opposite of electrostatics! Apply right-hand grip rule + I×B!", whyEasy: "Parallel currents in the SAME direction attract (F/L = μ₀I₁I₂ / 2πr); opposite currents repel!" },
        { type: "mc", prompt: "PHYS2 HO10 Cyclotron: If a deuteron's speed v DOUBLES inside a uniform B field, its orbit radius R and period τ:", options: ["R doubles, period τ stays the SAME!", "Both R and τ double", "R halves, τ doubles", "Both stay the same"], answer: "R doubles, period τ stays the SAME!", hint: "Check R = mv/(qB) vs τ = 2πm/(qB) — notice v cancels out of τ!", whyEasy: "Faster particles swing a wider circle (2× R) at 2× speed, so lap time τ = 2πm/(qB) is unchanged!" },
        { type: "mc", prompt: "PHYS2 HO11 Sample: A straight wire carries I = 100 A. At what distance r does B = 0.5×10⁻⁴ T (Earth's field)?", options: ["0.04 m", "0.4 m", "4.0 m", "0.004 m"], answer: "0.4 m", hint: "r = μ₀I / (2πB) = (4π×10⁻⁷ × 100) / (2π × 0.5×10⁻⁴) — watch 4π/2π = 2!", whyEasy: "(2 × 10⁻⁵) ÷ (0.5 × 10⁻⁴) = 4 × 10⁻¹ = 0.4 m!" },
        { type: "mc", prompt: "Compare B at distance r from a straight wire vs at the center of a circular loop (radius R):", options: ["Wire = μ₀I/(2πr); Loop = μ₀I/(2R) — Loop has NO π!", "Both have 2π in the denominator", "Wire = μ₀I/(2r); Loop = μ₀I/(2πR)", "Solenoid = μ₀I/r²"], answer: "Wire = μ₀I/(2πr); Loop = μ₀I/(2R) — Loop has NO π!", hint: "Integrating a full 2πR circle cancels the π in Biot-Savart's 4π!", whyEasy: "Straight wire divides by 2πr; Circular loop center divides by 2R (times N turns for a coil)!" }
      ]
    },

    // -------------------- CHEM2 (+6, L1–L12) --------------------
    {
      id: "chem2-organic-polymers",
      worldId: "chemistry",
      order: 83,
      title: "CHEM2: Organic Functional Groups, Isomers & Polymers",
      icon: "🧬",
      tagline: "Carbon ALWAYS makes 4 bonds! Functional groups pick personality; Polymers chain monomers by Addition or Condensation!",
      scaryVersion: "Hydrocarbon saturation series, structural isomerism, functional moieties & macromolecular polymerization.",
      easyTruth: "Organic chemistry is just carbon LEGOs (every Carbon forms 4 bonds!). Swap one H for an −OH group and a gas turns into an Alcohol; chain thousands of monomer LEGOs end-to-end and you build Plastics, Nylon, Starch, and DNA!",
      microSteps: [
        { label: "Step 1: Alkanes, Alkenes, Alkynes & Isomers", text: "Single bonds = AlkANE (C_nH_(2n+2), saturated). Double bond = AlkENE (C_nH_(2n)). Triple bond = AlkYNE (C_nH_(2n−2)). Structural ISOMERS share the exact SAME molecular formula (like C₄H₁₀) but connect atoms in different branched shapes!" },
        { label: "Step 2: 6 Must-Know Functional Groups", text: "Alcohol (−OH), Aldehyde (C=O at chain END), Ketone (C=O in MIDDLE), Carboxylic Acid (−COOH, sour vinegar!), Ester (−COO−, fruity smells!), Amine (−NH₂, nitrogen base)." },
        { label: "Step 3: Polymers — Addition vs Condensation & Thermoplastics", text: "ADDITION polymerization opens C=C double bonds with ZERO byproduct (e.g. ethylene → polyethylene). CONDENSATION links two groups and kicks out a small molecule like H₂O (nylon, polyester, proteins!). Thermoplastics soften & remelt; Thermosets stay permanently rigid due to cross-links!" }
      ],
      cheatCode: "Ane (2n+2), Ene (2n), Yne (2n−2). −OH Alcohol, −COOH Acid, −COO− Ester. Addition = opens C=C (no byproduct); Condensation = releases H₂O!",
      visualizerId: "chemistryAtomPhLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "What is the molecular formula of a 5-carbon ALKENE (1 double bond, C_nH_2n)?", options: ["C₅H₁₂", "C₅H₁₀", "C₅H₈", "C₅H₅"], answer: "C₅H₁₀", hint: "Alkanes = 2n + 2; Alkenes drop 2 H's to form the double bond → 2n!", whyEasy: "For n = 5 carbons: 2(5) = 10 hydrogens → C₅H₁₀ (pentene)!" },
        { type: "mc", prompt: "Which functional group gives vinegar (acetic acid, CH₃COOH) its acidic properties?", options: ["Alcohol (−OH)", "Carboxylic Acid (−COOH)", "Alkene (C=C)", "Ether (−O−)"], answer: "Carboxylic Acid (−COOH)", hint: "Look at the −COOH ending that donates an H⁺ proton!", whyEasy: "The carboxyl group (−COOH) identifies organic carboxylic acids!" },
        { type: "mc", prompt: "What distinguishes CONDENSATION polymerization from ADDITION polymerization?", options: ["Condensation releases a small byproduct like H₂O; Addition has zero byproduct", "Addition always makes proteins", "Condensation only uses metals", "They are identical"], answer: "Condensation releases a small byproduct like H₂O; Addition has zero byproduct", hint: "Think of 'condensing' water out when joining two monomer ends!", whyEasy: "Condensation kicks out H₂O (or HCl) per link, while Addition simply pops open C=C double bonds!" },
        { type: "mc", prompt: "Why can Thermoplastics (like PET water bottles) be melted and recycled while Thermosets (like epoxy) char instead?", options: ["Thermosets have strong covalent cross-links locking chains permanently", "Thermoplastics have no carbon", "Thermosets are liquids at room temp", "Thermoplastics contain ionic bonds"], answer: "Thermosets have strong covalent cross-links locking chains permanently", hint: "Cross-links act like welded rungs keeping chains from sliding past each other!", whyEasy: "Linear thermoplastic chains slide when heated; 3D cross-linked thermosets cannot melt!" },
        { type: "mc", prompt: "Butane (straight 4-C chain) and Isobutane (branched 4-C chain) both have formula C₄H₁₀. They are:", options: ["Isotopes", "Structural Isomers", "Polymers", "Allotropes"], answer: "Structural Isomers", hint: "Same molecular formula, DIFFERENT structural connectivity!", whyEasy: "Same atoms (C₄H₁₀), different blueprint → Structural Isomers (with different boiling points)!" }
      ]
    },
    {
      id: "chem2-imf-phases",
      worldId: "chemistry",
      order: 84,
      title: "CHEM2: Intermolecular Forces (IMFs), Liquids & Phase Diagrams",
      icon: "🧊",
      tagline: "Sticky IMFs = HIGH boiling point & viscosity, LOW vapor pressure! H-Bonds need H bonded to F, O, or N!",
      scaryVersion: "Kinetic molecular theory of condensed phases, van der Waals attractions & P–T phase equilibria.",
      easyTruth: "Boiling water does NOT break the O−H bonds inside H₂O — it overcomes the 'Velcro' Intermolecular Forces BETWEEN neighboring molecules! Stronger Velcro makes liquids thicker (higher viscosity), harder to boil (higher BP), and slower to evaporate (LOWER vapor pressure)!",
      microSteps: [
        { label: "Step 1: The IMF Strength Ladder", text: "Strongest → Weakest: (1) Ion–Dipole (salt in water) > (2) Hydrogen Bonding (H directly glued to F, O, or N — 'H-FON'!) > (3) Dipole–Dipole (polar molecules) > (4) London Dispersion Forces (LDF: in ALL molecules, grows with molar mass / electron cloud size!)." },
        { label: "Step 2: How Strong IMFs Affect Liquid Properties", text: "Stronger IMFs = HIGHER Boiling Point, HIGHER Surface Tension, HIGHER Viscosity — but LOWER Vapor Pressure (molecules refuse to escape into gas!)." },
        { label: "Step 3: Heating Curves & Phase Diagrams", text: "On Heating Curves: SLOPES raise temperature (q = mcΔT); FLAT PLATEAUS break IMFs during melting/boiling (ΔT = 0!). On P–T Phase Diagrams: Triple Point = all 3 phases coexist; Critical Point = liquid/gas merge; Water's solid-liquid line slopes LEFT (ice floats because solid water is LESS dense than liquid)!" }
      ],
      cheatCode: "IMF order: Ion-Dipole > H-Bond (H–F/O/N) > Dipole-Dipole > LDF. Stronger IMF → ↑BP, ↑Viscosity, ↓Vapor Pressure! Water's S–L line slopes LEFT!",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Which molecule can form HYDROGEN BONDS with itself (highest boiling point of the group)?", options: ["CH₄ (methane)", "H₂O (water)", "CO₂ (carbon dioxide)", "H₂S (hydrogen sulfide)"], answer: "H₂O (water)", hint: "Hydrogen bonding requires H covalently bonded directly to F, O, or N ('H-FON')!", whyEasy: "H₂O has H bonded directly to Oxygen (O), creating super-strong hydrogen bonds!" },
        { type: "mc", prompt: "Liquid A has MUCH STRONGER intermolecular forces than Liquid B. Compared to B, Liquid A has:", options: ["Higher boiling point & LOWER vapor pressure", "Lower boiling point & higher vapor pressure", "Higher boiling point & higher vapor pressure", "Zero surface tension"], answer: "Higher boiling point & LOWER vapor pressure", hint: "Sticky molecules hold tight — hard to boil AND few escape as vapor!", whyEasy: "Strong IMFs resist escaping into gas → higher BP and LOWER vapor pressure!" },
        { type: "mc", prompt: "Which intermolecular force is present in EVERY atom and molecule (even nonpolar He and CH₄)?", options: ["Ion–Dipole", "Hydrogen Bonding", "London Dispersion Forces (LDF)", "Metallic Bonding"], answer: "London Dispersion Forces (LDF)", hint: "Temporary fluctuating electron clouds induce tiny fleeting dipoles in everything!", whyEasy: "All atoms have moving electrons, so London Dispersion Forces exist universally!" },
        { type: "mc", prompt: "On a Pressure–Temperature (P–T) phase diagram, the TRIPLE POINT is where:", options: ["Boiling stops forever", "Solid, liquid, and gas coexist in equilibrium", "Pressure equals 3 atm", "The substance decomposes"], answer: "Solid, liquid, and gas coexist in equilibrium", hint: "All three boundary curves intersect at this unique (T, P) coordinate!", whyEasy: "At the Triple Point, solid, liquid, and gas phases exist simultaneously!" },
        { type: "mc", prompt: "Why does the Solid–Liquid boundary line on WATER's phase diagram slope backward (negative slope)?", options: ["Ice is LESS dense than liquid water (squeezing ice melts it!)", "Water never freezes under pressure", "Water has no hydrogen bonds", "Steam is denser than ice"], answer: "Ice is LESS dense than liquid water (squeezing ice melts it!)", hint: "Raising pressure favors the DENSER phase — for water, that's liquid!", whyEasy: "Open H-bonded ice crystals take up MORE space than liquid water → pressure melts ice!" }
      ]
    },
    {
      id: "chem2-solutions-concentration",
      worldId: "chemistry",
      order: 85,
      title: "CHEM2: Solutions, Concentration Units & Solubility",
      icon: "🧪",
      tagline: "Molarity M = mol/L solution; Molality m = mol/kg SOLVENT (temp-proof!). Gas solubility loves COLD & HIGH pressure!",
      scaryVersion: "Solution enthalpy thermodynamics, concentration interconversions, and Henry's Law gas dissolution.",
      easyTruth: "Making a solution works by 'Like Dissolves Like' (polar dissolves polar/ionic; nonpolar dissolves nonpolar). Know the sneaky spelling trap: Molarity (M) divides by Liters of TOTAL solution, while Molality (m) divides by Kilograms of SOLVENT ONLY (so it never changes when temperature expands volume)!",
      microSteps: [
        { label: "Step 1: Concentration Toolkit (M, m, X, % mass)", text: "Molarity M = mol solute / L solution. Molality m = mol solute / kg SOLVENT! Mole Fraction X_A = n_A / n_total (all fractions sum to 1!). % by mass = (mass solute / total mass solution) × 100%. Dilution ALWAYS obeys M₁V₁ = M₂V₂!" },
        { label: "Step 2: Saturation States & Solid Solubility", text: "Unsaturated (holds more), Saturated (exact equilibrium max), Supersaturated (unstable overload — drop 1 seed crystal and excess crashes out!). Most SOLIDS dissolve BETTER in HOT water." },
        { label: "Step 3: Gas Solubility & Henry's Law (S = k_H · P)", text: "GASES act OPPOSITE to solids! Warm soda goes flat fast because heating drives gas OUT (lower solubility at high T). Crank pressure UP (sealed bottle) and gas solubility rises proportionally: S = k_H · P!" }
      ],
      cheatCode: "M = mol/L solution; m = mol/kg SOLVENT! Dilution: M₁V₁ = M₂V₂. Gases dissolve best COLD & HIGH PRESSURE (Henry's Law: S = k_H·P)!",
      visualizerId: "chemistryAtomPhLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "You dissolve 0.5 mol of glucose in 250 g (0.25 kg) of pure water. What is the MOLALITY (m = mol/kg solvent)?", answer: "2", hint: "Convert 250 g solvent → 0.25 kg, then divide 0.5 mol ÷ 0.25 kg!", whyEasy: "0.5 ÷ 0.25 = 2.0 m (molal)!" },
        { type: "mc", prompt: "Why do chemists use MOLALITY (m) instead of Molarity (M) when temperature changes during boiling/freezing labs?", options: ["Mass (kg) does NOT expand or shrink with temperature, whereas Volume (L) does!", "Molality is always larger", "Molarity only works for gases", "Kilograms are metric and Liters aren't"], answer: "Mass (kg) does NOT expand or shrink with temperature, whereas Volume (L) does!", hint: "Hot liquids expand slightly in volume (changing L), while kg stays rock-solid!", whyEasy: "m = mol/kg is temperature-independent — essential for boiling/freezing colligative math!" },
        { type: "mc", prompt: "Under what conditions does CO₂ gas stay BEST dissolved inside a bottle of soda (highest gas solubility)?", options: ["Cold temperature & High pressure", "Hot temperature & Low pressure", "Hot temperature & High pressure", "Cold temperature & Zero pressure"], answer: "Cold temperature & High pressure", hint: "Think of an ice-cold sealed soda vs a warm open soda left in the sun!", whyEasy: "Low T slows escaping gas molecules and High P pushes gas in (Henry's Law: S = k_H·P)!" },
        { type: "input", prompt: "Dilution (M₁V₁ = M₂V₂): How many mL of 6 M HCl stock do you need to prepare 300 mL of 2 M HCl?", answer: "100", hint: "Set 6 · V₁ = 2 · 300 and solve for V₁!", whyEasy: "V₁ = 600 ÷ 6 = 100 mL of 6 M stock (topped up with water to 300 mL)!" },
        { type: "input", prompt: "A solution contains 2 mol Ethanol and 8 mol Water. What is the mole fraction X of Ethanol (decimal)?", answer: "0.2", hint: "X_ethanol = n_ethanol ÷ n_total = 2 ÷ (2 + 8).", whyEasy: "2 ÷ 10 = 0.2 (leaving 0.8 for water; 0.2 + 0.8 = 1.0)!" }
      ]
    },
    {
      id: "chem2-colligative-properties",
      worldId: "chemistry",
      order: 86,
      title: "CHEM2: Colligative Properties & van 't Hoff Factor (i)",
      icon: "🧂",
      tagline: "Colligative = COUNT particles, ignore identity! Salt widens the liquid range: BP goes UP (ΔT_b = iK_b m), FP goes DOWN (ΔT_f = iK_f m)!",
      scaryVersion: "Raoult vapor depression, ebullioscopic/cryoscopic shifts, osmotic pressure Π = iMRT & electrolytic dissociation.",
      easyTruth: "Why do snowy cities dump salt on icy roads? Dissolved solute particles get in the way of water molecules trying to freeze OR boil! Colligative properties ONLY care HOW MANY dissolved particles exist — so ionic salts that split into multiple ions (NaCl → 2, CaCl₂ → 3) pack 2×–3× the punch of sugar (i = 1)!",
      microSteps: [
        { label: "Step 1: Count Ions With van 't Hoff Factor (i)", text: "Nonelectrolytes (sugar C₆H₁₂O₆, urea) stay intact → i = 1. Ionic electrolytes split into separate ions: NaCl → Na⁺ + Cl⁻ (i = 2); CaCl₂ → Ca²⁺ + 2 Cl⁻ (i = 3); AlCl₃ → i = 4!" },
        { label: "Step 2: Boiling Point UP & Freezing Point DOWN", text: "ΔT_b = i · K_b · m → ADD ΔT_b to pure boiling point (100°C + ΔT_b). ΔT_f = i · K_f · m → SUBTRACT ΔT_f from pure freezing point (0°C − ΔT_f)! Adding solute ALWAYS widens the liquid temperature window!" },
        { label: "Step 3: Vapor Pressure Lowering & Osmotic Pressure", text: "Raoult's Law: solute blocks surface escape → Vapor Pressure DROPS (P_soln = X_solvent · P°_solvent). Osmotic Pressure pushes solvent across a membrane: Π = i · M · R · T!" }
      ],
      cheatCode: "Count particles via i (sugar=1, NaCl=2, CaCl₂=3)! BP goes UP (+iK_b m), FP goes DOWN (−iK_f m), Vapor Pressure DROPS, Π = iMRT!",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Which 1.0 m aqueous solution lowers the freezing point of water the MOST?", options: ["1.0 m Glucose (C₆H₁₂O₆, i = 1)", "1.0 m NaCl (i = 2)", "1.0 m CaCl₂ (i = 3)", "All three tie because molality is 1.0 m"], answer: "1.0 m CaCl₂ (i = 3)", hint: "Multiply i × m to count total dissolved particles!", whyEasy: "CaCl₂ splits into 3 ions (Ca²⁺ + 2 Cl⁻) → 3.0 m total particles → biggest freezing point drop!" },
        { type: "input", prompt: "Water has K_f = 1.86 °C/m. What is the NEW freezing point (°C) of a 1.0 m NaCl (i = 2) solution? (Include minus sign!)", answer: "-3.72", hint: "First find ΔT_f = i·K_f·m = 2 × 1.86 × 1.0 = 3.72, then SUBTRACT from 0°C!", whyEasy: "0°C − 3.72°C = −3.72°C! Always subtract ΔT_f for freezing point depression!" },
        { type: "mc", prompt: "Adding nonvolatile salt to pure water causes its Boiling Point and Freezing Point to:", options: ["Boiling point INCREASES, Freezing point DECREASES", "Both increase", "Both decrease", "Boiling point decreases, Freezing point increases"], answer: "Boiling point INCREASES, Freezing point DECREASES", hint: "Solute particles stabilize the liquid phase, stretching its range at BOTH ends!", whyEasy: "BP rises above 100°C and FP drops below 0°C — wider liquid range!" },
        { type: "input", prompt: "What is the ideal van 't Hoff factor (i) for Magnesium Chloride (MgCl₂) dissolved in water?", answer: "3", hint: "Write the dissociation: MgCl₂ → 1 Mg²⁺ + 2 Cl⁻ and count total ions!", whyEasy: "1 Mg²⁺ + 2 Cl⁻ = 3 dissolved ions → i = 3!" },
        { type: "mc", prompt: "Colligative properties of a solution depend strictly on:", options: ["The NUMBER of solute particles, NOT their chemical identity", "The color and odor of the solute", "Only the molar mass of the solute", "Whether the beaker is glass or plastic"], answer: "The NUMBER of solute particles, NOT their chemical identity", hint: "That's why 1 mol of glucose and 1 mol of urea give the exact same ΔT_f!", whyEasy: "Pure particle count (i × concentration) drives all 4 colligative effects!" }
      ]
    },
    {
      id: "chem2-kinetics-ratelaw",
      worldId: "chemistry",
      order: 87,
      title: "CHEM2: Reaction Rates, Rate Laws & Collision Theory",
      icon: "⏱️",
      tagline: "Rate = k[A]^m[B]^n — orders m, n come ONLY from experiments, NEVER the balanced equation! Half-life = 0.693/k.",
      scaryVersion: "Differential reaction kinetics, experimental method of initial rates, and Arrhenius collision dynamics.",
      easyTruth: "To react, molecules must SMASH together with (1) enough energy (≥ Activation Energy E_a) AND (2) the right angle/orientation! And NEVER copy balanced-equation coefficients into a Rate Law — test how doubling concentration affects speed experimentally!",
      microSteps: [
        { label: "Step 1: Reading Reaction Orders From Doubling Experiments", text: "In Rate = k[A]^m[B]^n, DOUBLE [A] while holding [B] constant: Rate ×1 (unchanged) → 0th order (2⁰ = 1); Rate ×2 → 1st order (2¹ = 2); Rate ×4 → 2nd order (2² = 4)! Total order = m + n." },
        { label: "Step 2: First-Order Half-Life & The Big Rate-Law Trap", text: "For 1st-order reactions (like radioactive decay), half-life t_(1/2) = 0.693 / k is CONSTANT — completely independent of starting amount! Trap: overall stoichiometric coefficients do NOT give m and n (only the slow rate-determining step does!)." },
        { label: "Step 3: Collision Theory & 4 Speed Boosters", text: "Effective collisions need Energy ≥ E_a AND proper Orientation. Speed up any reaction by: (1) Raising Temperature (faster & harder hits), (2) Higher Concentration/Surface Area (more hits), (3) Adding a Catalyst (provides an alternate pathway with LOWER E_a, leaving ΔH unchanged!)." }
      ],
      cheatCode: "Double [A]: ×1 = 0th, ×2 = 1st, ×4 = 2nd order! Orders come from DATA, not equation coeffs. 1st-order t_(1/2) = 0.693/k. Catalyst lowers E_a only!",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "When concentration [A] is DOUBLED (all else constant), the reaction rate QUADRUPLES (4×). What is the order in A?", options: ["0th order", "1st order", "2nd order", "4th order"], answer: "2nd order", hint: "Solve 2^m = 4 for the exponent m!", whyEasy: "2² = 4, so the reaction is 2nd order with respect to A ([A]²)!" },
        { type: "mc", prompt: "Given Rate = k[A]²[B]¹, what is the OVERALL reaction order?", options: ["1", "2", "3", "4"], answer: "3", hint: "Add all individual concentration exponents together: m + n!", whyEasy: "2 + 1 = 3rd order overall!" },
        { type: "mc", prompt: "For the balanced reaction 2A + 3B → C, can you automatically assume Rate = k[A]²[B]³?", options: ["Yes, always!", "NO — rate law exponents must be determined EXPERIMENTALLY!", "Only at 0°C", "Only if a catalyst is added"], answer: "NO — rate law exponents must be determined EXPERIMENTALLY!", hint: "Multi-step reactions depend ONLY on the slowest (rate-determining) step!", whyEasy: "Never copy overall equation coefficients into Rate Laws — always use experimental rate data!" },
        { type: "mc", prompt: "According to Collision Theory, what TWO requirements must a molecular collision satisfy to form products?", options: ["High pressure and cold walls", "Sufficient kinetic energy (≥ E_a) AND proper molecular orientation", "Equal molar masses and ionic bonds", "A catalyst and zero temperature"], answer: "Sufficient kinetic energy (≥ E_a) AND proper molecular orientation", hint: "Hitting hard enough isn't enough if the wrong ends of the molecules bump!", whyEasy: "Effective collisions require BOTH Energy ≥ E_a AND correct geometric alignment!" },
        { type: "input", prompt: "A 1st-order reaction has half-life t_(1/2) = 10 minutes. Starting with 80 g, how many grams remain after 30 minutes?", answer: "10", hint: "30 min ÷ 10 min = 3 half-lives → halve 80 three times (80 → 40 → 20 → ?).", whyEasy: "Three halvings: 80 → 40 → 20 → 10 g remain!" }
      ]
    },
    {
      id: "chem2-thermo-entropy-gibbs",
      worldId: "chemistry",
      order: 88,
      title: "CHEM2: 1st Law, Hess's Law, Entropy (ΔS) & Gibbs (ΔG)",
      icon: "🔥",
      tagline: "ΔU = q + w. Entropy ΔS = energy dispersal (Solid < Liquid < Gas). Spontaneous when ΔG = ΔH − TΔS < 0!",
      scaryVersion: "First and second laws of chemical thermodynamics, Hess enthalpy summation, and Gibbs spontaneity criteria.",
      easyTruth: "Nature loves two things: releasing heat (ΔH < 0) and spreading energy/disorder outward (ΔS > 0). Gibbs Free Energy (ΔG = ΔH − TΔS) acts as the ultimate referee — whenever ΔG is NEGATIVE, the reaction happens spontaneously on its own!",
      microSteps: [
        { label: "Step 1: First Law (ΔU = q + w) & Chem vs. Physics Sign Bridge!", text: "Energy is conserved: `ΔU = q + w` (IUPAC Chemistry convention: heat IN is `+q`, work done **ON** the system is `+w`, work done **BY** the system is `−w`). **SIGN-CONVENTION ALERT:** Physics/Engineering writes `ΔU = Q − W` because Physics defines `+W` as work done **BY** the engine! Both give the **exact same physics**: if a gas absorbs `500 J` and expands doing `200 J` of work, `ΔU = +300 J` in BOTH! Hess's Law says `ΔH` is a state function: flip reaction → flip `ΔH` sign; `ΔH°_rxn = Σ ΔH°_f(Products) − Σ ΔH°_f(Reactants)`!" },
        { label: "Step 2: Entropy (ΔS) = Microstates & Spread", text: "Entropy increases (ΔS > 0) when Solid → Liquid → Gas, when temperature rises, when solids dissolve, or when a reaction creates MORE moles of gas!" },
        { label: "Step 3: Gibbs Referee (ΔG = ΔH − TΔS) — 4 Sign Cases!", text: "ΔG < 0 = SPONTANEOUS; ΔG = 0 = Equilibrium; ΔG > 0 = Non-spontaneous! (1) ΔH < 0, ΔS > 0 → ALWAYS spontaneous. (2) ΔH > 0, ΔS < 0 → NEVER spontaneous. (3) Both + → spontaneous at HIGH T (like ice melting!). (4) Both − → spontaneous at LOW T (like water freezing!). WATCH UNITS: ΔH is usually kJ while ΔS is J/K (divide ΔS by 1,000)!" }
      ],
      cheatCode: "ΔU = q + w. ΔH_rxn = Products − Reactants. ΔG = ΔH − TΔS (convert T to Kelvin & match kJ vs J!): ΔG < 0 = Spontaneous!",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "A chemical process is ALWAYS spontaneous at EVERY temperature when:", options: ["ΔH < 0 (exothermic) and ΔS > 0 (more disorder)", "ΔH > 0 and ΔS < 0", "ΔH > 0 and ΔS > 0", "ΔH < 0 and ΔS < 0"], answer: "ΔH < 0 (exothermic) and ΔS > 0 (more disorder)", hint: "Test signs in ΔG = ΔH − TΔS: (−) − (+)(+) is ALWAYS negative!", whyEasy: "Negative ΔH minus positive TΔS guarantees ΔG < 0 at ALL temperatures!" },
        { type: "mc", prompt: "Which change produces a POSITIVE entropy change (ΔS > 0)?", options: ["Liquid water freezing into solid ice", "2 H₂(g) + O₂(g) → 2 H₂O(g) (3 gas mol → 2)", "Dry ice sublimating: CO₂(s) → CO₂(g)", "Compressing a gas into a smaller tank"], answer: "Dry ice sublimating: CO₂(s) → CO₂(g)", hint: "Gases spread out far more than rigid crystal solids (S_gas >> S_solid)!", whyEasy: "Jumping straight from ordered solid to free gas massively increases entropy (ΔS > 0)!" },
        { type: "input", prompt: "First Law (ΔU = q + w): A gas absorbs q = +500 J of heat and does 200 J of work ON its surroundings (w = −200 J). ΔU (J)?", answer: "300", hint: "Work done BY the system leaves the system (negative w = −200 J): 500 + (−200).", whyEasy: "+500 J in minus 200 J spent doing work leaves ΔU = +300 J!" },
        { type: "input", prompt: "Gibbs Unit-Trap Check! ΔH = +40 kJ, ΔS = +100 J/K = +0.1 kJ/K at T = 500 K. Find ΔG (in kJ):", answer: "-10", hint: "Convert ΔS to kJ/K (0.1) FIRST! Then compute ΔG = 40 − (500)(0.1).", whyEasy: "40 − 50 = −10 kJ → negative ΔG means SPONTANEOUS at 500 K!" },
        { type: "mc", prompt: "Ice melting (H₂O(s) → H₂O(l)) has ΔH > 0 and ΔS > 0. At what temperatures is it spontaneous?", options: ["High temperatures (when TΔS beats ΔH)", "Low temperatures only", "All temperatures", "Never spontaneous"], answer: "High temperatures (when TΔS beats ΔH)", hint: "You need the −TΔS term to grow large enough to overcome +ΔH!", whyEasy: "Above 273 K (0°C), TΔS > ΔH so ΔG turns negative and ice melts spontaneously!" }
      ]
    },

    // -------------------- BIO2 (+4, L1–L12) --------------------
    {
      id: "bio2-recombinant-dna",
      worldId: "biology",
      order: 89,
      title: "BIO2: Recombinant DNA, Plasmids, PCR & Biotech",
      icon: "🧬",
      tagline: "Restriction Enzymes = scissors, DNA Ligase = glue, Plasmid = delivery truck, PCR = DNA photocopier!",
      scaryVersion: "Molecular cloning via restriction endonucleases, plasmid vectors, polymerase chain reaction & electrophoresis.",
      easyTruth: "Genetic engineering works just like Cut–Copy–Paste in a document! Scientists cut a useful gene (like human insulin) with Restriction Enzyme scissors, paste it into a circular bacterial Plasmid using DNA Ligase glue, and let fast-dividing bacteria mass-produce life-saving medicine!",
      microSteps: [
        { label: "Step 1: Cut & Paste Toolkit (Scissors, Glue & Vector)", text: "RESTRICTION ENZYMES cut DNA at specific palindromic sequences, leaving overhanging 'sticky ends'. DNA LIGASE seals the sugar-phosphate backbone ('molecular glue'). Bacterial PLASMIDS (tiny circular DNA rings) act as vectors carrying the recombinant DNA into host cells via Transformation!" },
        { label: "Step 2: PCR (Photocopier) & Gel Electrophoresis (Sieve)", text: "PCR makes millions of DNA copies in 3 repeating heat steps: (1) Denature (unzip at ~95°C), (2) Anneal (primers attach), (3) Extend (heat-proof Taq polymerase builds new strands!). Gel Electrophoresis pulls negatively charged DNA toward the POSITIVE (+) pole — SMALLER fragments sprint FARTHER!" },
        { label: "Step 3: Real-World Biotech Wins", text: "Recombinant E. coli bacteria produce pure human INSULIN for diabetics; Golden Rice adds Vitamin A (beta-carotene); Bt corn resists pests naturally; Gene Therapy replaces faulty human alleles!" }
      ],
      cheatCode: "Restriction Enzyme = Scissors; Ligase = Glue; Plasmid = Vector. PCR = Denature → Anneal → Extend. Gel: DNA moves to (+), SMALL runs FAST!",
      visualizerId: "biologyDnaPunnettLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "In recombinant DNA technology, which two enzymes act as 'molecular scissors' and 'molecular glue'?", options: ["Restriction enzymes (scissors) & DNA ligase (glue)", "Amylase & Pepsin", "RNA polymerase & Helicase", "ATP synthase & Catalase"], answer: "Restriction enzymes (scissors) & DNA ligase (glue)", hint: "One cuts matching sticky ends; the other ligates (seals) the spliced strand!", whyEasy: "Restriction endonucleases cut specific DNA sites and DNA ligase glues the recombinant plasmid shut!" },
        { type: "mc", prompt: "During Gel Electrophoresis, why do DNA fragments migrate toward the POSITIVE (+) electrode, and which move farthest?", options: ["DNA is negatively charged (phosphates); SMALLEST fragments travel farthest", "DNA is positively charged; largest fragments move farthest", "DNA is neutral; magnets pull it", "Only RNA moves in gels"], answer: "DNA is negatively charged (phosphates); SMALLEST fragments travel farthest", hint: "Picture kids vs giants running through a dense forest mesh!", whyEasy: "Negative phosphate backbones chase the (+) pole, and tiny fragments weave through gel pores fastest!" },
        { type: "mc", prompt: "What is the correct repeating order of the 3 steps in PCR (Polymerase Chain Reaction)?", options: ["Extend → Anneal → Denature", "Denature (heat unzip) → Anneal (primers bind) → Extend (Taq builds)", "Transcribe → Translate → Fold", "Mitosis → Meiosis → Cytokinesis"], answer: "Denature (heat unzip) → Anneal (primers bind) → Extend (Taq builds)", hint: "Unzip the book → Place bookmarks (primers) → Copy the pages!", whyEasy: "Each Denature–Anneal–Extend cycle DOUBLES the DNA count (2 → 4 → 8 → millions)!" },
        { type: "mc", prompt: "What is a PLASMID in genetic engineering?", options: ["A small circular bacterial DNA ring used as a gene vector", "A plant chloroplast", "A red blood cell", "A protein-digesting acid"], answer: "A small circular bacterial DNA ring used as a gene vector", hint: "Acts as the delivery vehicle carrying recombinant genes into bacteria!", whyEasy: "Plasmids replicate independently inside bacteria, making ideal cloning vectors!" },
        { type: "mc", prompt: "Why can human insulin genes still be read accurately inside E. coli bacteria?", options: ["The genetic code (codons → amino acids) is virtually UNIVERSAL across life!", "Bacteria have human nuclei", "Insulin is a carbohydrate", "Restriction enzymes translate proteins"], answer: "The genetic code (codons → amino acids) is virtually UNIVERSAL across life!", hint: "AUG means Methionine in humans, bacteria, and plants alike!", whyEasy: "Universal codons allow bacteria to translate human mRNA into exact human insulin!" }
      ]
    },
    {
      id: "bio2-evolution-mechanisms",
      worldId: "biology",
      order: 90,
      title: "BIO2: Mechanisms, Evidence & Theories of Evolution",
      icon: "🦴",
      tagline: "Populations evolve, NOT individuals! Know the 5 mechanisms (Selection, Drift, Flow, Mutation, Mating) & Homologous vs Analogous!",
      scaryVersion: "Microevolutionary allele-frequency mechanics, comparative anatomy homology & allopatric speciation.",
      easyTruth: "Lamarck thought giraffes stretched their necks and passed stretched necks to babies (FALSE — acquired habits don't rewrite DNA!). Darwin showed that existing genetic variation + differential survival shifts a POPULATION's gene pool over generations!",
      microSteps: [
        { label: "Step 1: The 5 Mechanisms That Change Allele Frequencies", text: "(1) Natural Selection (ONLY mechanism that consistently drives adaptation!), (2) Genetic Drift (random luck in small populations: Bottleneck disaster or Founder island split!), (3) Gene Flow (migration mixing genes), (4) Mutation (ultimate source of NEW alleles!), (5) Non-random mating." },
        { label: "Step 2: Homologous vs Analogous vs Vestigial Evidence", text: "HOMOLOGOUS = SAME ancestor & bone layout, different jobs (human arm, whale flipper, bat wing → Divergent evolution!). ANALOGOUS = DIFFERENT ancestors, similar job (bird wing vs insect wing → Convergent evolution!). VESTIGIAL = shrunken leftover traits (whale hip bones, human appendix). DNA/protein sequence matching is the strongest modern proof!" },
        { label: "Step 3: Speciation & Reproductive Isolation", text: "ALLOPATRIC speciation splits a population via a physical barrier (river, mountain, island) until they can no longer interbreed. SYMPATRIC speciation happens in the SAME territory (e.g. polyploidy in plants or distinct mating songs)." }
      ],
      cheatCode: "Mutation = new alleles; Drift = random luck (Bottleneck/Founder); Selection = adaptation! Homologous = Same ancestor; Analogous = Same job only!",
      visualizerId: "biologyDnaPunnettLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "A hurricane wipes out 95% of an island beetle population at random, drastically shifting allele ratios. This is:", options: ["Natural Selection", "Genetic Drift — Bottleneck Effect", "Gene Flow", "Artificial Selection"], answer: "Genetic Drift — Bottleneck Effect", hint: "Survival was pure blind luck from a disaster squeezing the population tiny!", whyEasy: "A sudden random population crash is the classic Bottleneck Effect (Genetic Drift)!" },
        { type: "mc", prompt: "A whale's flipper, bat's wing, and human's arm share the exact same underlying bone pattern despite different functions. They are:", options: ["Homologous structures (common ancestor)", "Analogous structures", "Vestigial organs", "Acquired traits"], answer: "Homologous structures (common ancestor)", hint: "'Homo-' = same origin / shared vertebrate ancestor!", whyEasy: "Same ancestral anatomy adapted for different roles = Homologous structures (Divergent evolution)!" },
        { type: "mc", prompt: "Bird wings (feathers + bone) and butterfly wings (chitin) both enable flight but evolved independently. They are:", options: ["Homologous structures", "Analogous structures (convergent evolution)", "Vestigial structures", "Fossil artifacts"], answer: "Analogous structures (convergent evolution)", hint: "Similar function solving the same problem from totally unrelated lineages!", whyEasy: "Unrelated species evolving similar flight tools independently = Analogous (Convergent evolution)!" },
        { type: "mc", prompt: "Which evolutionary mechanism is the ONLY ultimate source of brand-new alleles in a gene pool?", options: ["Genetic drift", "Mutation", "Gene flow", "Stabilizing selection"], answer: "Mutation", hint: "Selection & drift only reshuffle existing alleles — what actually writes a NEW DNA sequence?", whyEasy: "Random DNA mutations create brand-new genetic variants for evolution to act upon!" },
        { type: "mc", prompt: "A newly formed canyon splits one squirrel species into two isolated halves that eventually become separate species. This is:", options: ["Allopatric speciation", "Sympatric speciation", "Lamarckian inheritance", "Genetic engineering"], answer: "Allopatric speciation", hint: "'Allo-' = other/different homeland (geographic barrier)!", whyEasy: "Physical geographic separation driving speciation = Allopatric speciation!" }
      ]
    },
    {
      id: "bio2-taxonomy-cladistics",
      worldId: "biology",
      order: 91,
      title: "BIO2: Systematics, Binomial Naming & Cladistics",
      icon: "🌳",
      tagline: "Genus species (Capitalized, italicized!). Read Cladograms by NODES (common ancestors), NEVER by left-to-right tip order!",
      scaryVersion: "Linnaean binomial nomenclature, cladistic synapomorphies, and phylogenetic tree topology.",
      easyTruth: "Taxonomy isn't just memorizing Latin labels — modern Systematics draws family trees (Cladograms) showing evolutionary ancestry! Two species are closer cousins if they share a MORE RECENT branching node, even if their labels are drawn far apart on paper!",
      microSteps: [
        { label: "Step 1: Binomial Nomenclature Rules (Carolus Linnaeus)", text: "Every species gets a 2-part Latin scientific name: Genus (ALWAYS Capitalized) + specific epithet (ALWAYS lowercase), BOTH italicized (or underlined when handwritten) — e.g. Homo sapiens, Panthera leo. Same Genus = close relatives!" },
        { label: "Step 2: 3 Domains & 6 Kingdoms", text: "Life splits at the top into 3 DOMAINS: Bacteria (prokaryotes, peptidoglycan cell walls), Archaea (extremophile prokaryotes, NO peptidoglycan!), and Eukarya (membrane-bound nucleus: Protista, Fungi, Plantae, Animalia)." },
        { label: "Step 3: Reading Cladograms & Dichotomous Keys", text: "Each fork (NODE) = Most Recent Common Ancestor. Tick marks on a branch = DERIVED CHARACTERS (synapomorphies) shared by EVERY organism above that mark! A Dichotomous Key identifies organisms via paired Yes/No trait choices." }
      ],
      cheatCode: "Genus species (Capital + lowercase, italicized!). 3 Domains: Bacteria, Archaea, Eukarya. Cladogram closeness = MOST RECENT NODE!",
      visualizerId: "biologyDnaPunnettLab",
      bruteforce: false,
      questions: [
        { type: "mc", prompt: "Which scientific name follows Carolus Linnaeus's Binomial Nomenclature rules PROPERLY?", options: ["homo Sapiens", "Homo Sapiens", "Homo sapiens (italicized)", "HOMO SAPIENS"], answer: "Homo sapiens (italicized)", hint: "First word (Genus) capitalized; second word (species epithet) lowercase; italicized!", whyEasy: "Only 'Homo sapiens' capitalizes Genus, lowercases epithet, and italicizes both!" },
        { type: "mc", prompt: "Which two animals are MOST closely related: Panthera leo, Panthera tigris, or Canis lupus?", options: ["Panthera leo & Panthera tigris", "Panthera leo & Canis lupus", "Panthera tigris & Canis lupus", "Impossible to tell"], answer: "Panthera leo & Panthera tigris", hint: "Compare their first word — the Genus!", whyEasy: "Sharing the same Genus (Panthera) proves lion and tiger share a much more recent common ancestor!" },
        { type: "mc", prompt: "Which Domain consists of prokaryotic extremophiles (living in boiling vents/salt lakes) WITHOUT peptidoglycan cell walls?", options: ["Bacteria", "Archaea", "Eukarya", "Fungi"], answer: "Archaea", hint: "Prokaryotes split into TWO domains — one lives in extreme habitats!", whyEasy: "Archaea are ancient extremophile prokaryotes genetically distinct from Bacteria!" },
        { type: "mc", prompt: "On a cladogram, how do you determine which two species are MOST closely related?", options: ["They share the most recent branching NODE (common ancestor)", "Their names sit alphabetically next to each other", "They look the same color", "They have the same body weight"], answer: "They share the most recent branching NODE (common ancestor)", hint: "Branches can rotate around nodes like a hanging mobile — trace down to the fork!", whyEasy: "Recency of common ancestry (the node where two lineages split) defines relatedness!" },
        { type: "mc", prompt: "A tool that identifies an unknown plant or insect using a step-by-step series of paired contrasting choices is a:", options: ["Punnett square", "Dichotomous key", "Food pyramid", "Thermometer"], answer: "Dichotomous key", hint: "'Di-' = two (always splitting into 2 contrasting choices at every step)!", whyEasy: "Dichotomous keys narrow down species identification through paired Either/Or questions!" }
      ]
    },
    {
      id: "bio2-plant-animal-systems",
      worldId: "biology",
      order: 92,
      title: "BIO2: Plant & Animal Organ Systems + Homeostasis",
      icon: "🌱",
      tagline: "Plants pull water up Xylem (transpiration) & bend toward light via Auxin! Homeostasis stabilizes via Negative Feedback!",
      scaryVersion: "Comparative plant-animal physiological transport, phytohormone tropisms, and homeostatic feedback loops.",
      easyTruth: "Both plants and animals solve the exact same engineering problems — moving fuel, exchanging gas, sensing danger, and staying balanced (Homeostasis)! Plants just do it silently using transpiration suction, sugar pressure-flow, and hormones like Auxin and Ethylene!",
      microSteps: [
        { label: "Step 1: Comparative Gas Exchange & Transport", text: "Gas exchange needs thin, moist, high-surface-area membranes: Alveoli (mammals), Gills (fish), Tracheae (insects), Stomata & Lenticels (plants). Transport: Xylem pulls water UP by Transpiration–Cohesion–Tension; Phloem ships sugars by Pressure-Flow; Vertebrates use Closed circulatory loops!" },
        { label: "Step 2: Plant Hormones & Tropisms", text: "AUXIN builds up on the SHADED side of a stem, elongating shaded cells so the shoot bends TOWARD light (Positive Phototropism)! ETHYLENE gas ripens fruit ('one bad apple spoils the bunch'). ABSCISIC ACID (ABA) closes stomata during drought & maintains seed dormancy." },
        { label: "Step 3: Negative vs Positive Feedback (Homeostasis)", text: "NEGATIVE FEEDBACK acts like a thermostat — it REVERSES change back to set-point (sweating cools fever; shivering warms cold; insulin/glucagon stabilize blood glucose). POSITIVE FEEDBACK amplifies a push until a big finish (oxytocin contractions in childbirth, blood clotting)!" }
      ],
      cheatCode: "Xylem = Transpiration-Cohesion UP; Phloem = Pressure-Flow. Auxin = light bending; Ethylene = ripening; ABA = drought stop. Negative Feedback = stabilizes!",
      visualizerId: "biologyDnaPunnettLab",
      bruteforce: false,
      questions: [
        { type: "mc", prompt: "Why does a houseplant stem bend toward a sunny window (Positive Phototropism)?", options: ["Auxin accumulates on the SHADED side, making shaded cells elongate faster!", "Roots push the stem sideways", "Ethylene melts the sunny side", "Chlorophyll pulls toward gravity"], answer: "Auxin accumulates on the SHADED side, making shaded cells elongate faster!", hint: "If the dark side grows LONGER than the lit side, which way does the stem curve?", whyEasy: "Auxin migrates away from light → longer cells on the shaded side bend the stem toward the sun!" },
        { type: "mc", prompt: "Putting a ripe banana in a paper bag with green mangoes speeds up ripening because the banana releases:", options: ["Auxin", "Ethylene gas", "Insulin", "Carbon monoxide"], answer: "Ethylene gas", hint: "The ONLY major gaseous plant hormone — famous for fruit ripening!", whyEasy: "Ethylene gas triggers rapid fruit ripening in nearby fruit!" },
        { type: "mc", prompt: "During a drought, which plant hormone signals guard cells to CLOSE stomata and conserve water?", options: ["Abscisic acid (ABA)", "Ethylene", "Gibberellin", "Oxytocin"], answer: "Abscisic acid (ABA)", hint: "Think of ABA as the plant's 'emergency stress brake'!", whyEasy: "Abscisic acid (ABA) triggers stomatal closure under drought stress!" },
        { type: "mc", prompt: "Sweating when your body overheats to bring temperature BACK down to 37°C is an example of:", options: ["Negative feedback (restores balance)", "Positive feedback (amplifies heat)", "Phototropism", "Genetic drift"], answer: "Negative feedback (restores balance)", hint: "Like an AC thermostat pushing temperature OPPOSITE to the deviation!", whyEasy: "Negative feedback counteracts the drift to restore normal homeostatic set-point!" },
        { type: "mc", prompt: "What physical force pulls water all the way to the top of a 100-meter redwood tree through Xylem?", options: ["Transpiration–Cohesion–Tension pull (evaporation at leaves pulls sticky water chain)", "A pumping heart in the roots", "Phloem gravity push", "Stomatal suction fans"], answer: "Transpiration–Cohesion–Tension pull (evaporation at leaves pulls sticky water chain)", hint: "Water evaporating from leaves tugs hydrogen-bonded water molecules upward like a rope!", whyEasy: "Cohesion (H-bonds) + Transpiration evaporation pull water continuously up Xylem!" }
      ]
    },

    // -------------------- WICA (+5, HO1–HO12 + LAG3/4) --------------------
    {
      id: "wica-exits-transition",
      worldId: "wica",
      order: 93,
      title: "WICA: The 4 K-12 Exits, PESO & PH Business Registration",
      icon: "🗝️",
      tagline: "RA 10533's 4 Exits are KEYS you can combine! Know TESDA TVET, Sole Prop/Corp, DTI→BIR permits & PESO (RA 8759)!",
      scaryVersion: "Philippine K-12 exit pathways, enterprise legal registration compliance & DOLE-PESO labor facilitation.",
      easyTruth: "Under RA 10533 (Enhanced Basic Education Act of 2013), the 4 SHS Exits — Higher Ed, Employment, Entrepreneurship, and Middle-Level Skills — are NOT mutually exclusive doors; they are KEYS you can carry together! And whether you start a business (age 18+, DTI/SEC → Brgy → Mayor → BIR) or seek jobs via PESO, knowing the exact agencies puts you miles ahead!",
      microSteps: [
        { label: "Step 1: The 4 K-12 Exits & Non-Cognitive Readiness (HO1)", text: "(1) Higher Ed: college readiness needs BOTH academics AND grit (Filipino 'sigasig' = persistence of effort, 'tiyaga' = constancy in work) + aspiration. (2) Employment: employers value Soft Skills (interpersonal, adaptable) alongside Hard Skills (quantifiable like coding). (3) Entrepreneurship: Gen Z leads with tech ease. (4) Middle-Level Skills: TESDA TVET (surprisingly, ~1/3 of enrollees are college grads!)." },
        { label: "Step 2: PH Business Ownership & 5 Registration Steps (HO2)", text: "Must be 18+ to register under your own name! Ownership: Sole Proprietorship (simplest, personal liability), Partnership (2+ pooling assets/profits), Corporation ('artificial being' with right of succession; Stock vs Non-stock [no dividends]; SEC). 5 Steps: (1) DTI (sole prop) or SEC (corp) → (2) Barangay Clearance → (3) Mayor's Permit → (4) BIR → (5) SSS, PhilHealth & Pag-IBIG (if hiring staff)!" },
        { label: "Step 3: PESO — Public Employment Service Office (RA 8759)", text: "Free multi-employment center under DOLE at the LGU level! Offers Job Fairs, OFW reintegration, career counseling, and special programs: SPESOS (Students & OSY), WAP (Work Appreciation), WHIP (Infrastructure hiring)." }
      ],
      cheatCode: "RA 10533 = 4 Exits (Keys!). Sigasig/Tiyaga = Grit. PH Reg: DTI/SEC → Brgy → Mayor → BIR → SSS/PhilHealth/Pag-IBIG. PESO = RA 8759 (DOLE)!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "WICA HO1: Which law created the K-12 SHS program and its 4 Exits (Higher Ed, Employment, Entrepreneurship, Middle-Level Skills)?", options: ["Republic Act 10533 (Enhanced Basic Education Act of 2013)", "Republic Act 8759 (PESO Act)", "DOLE Advisory No. 2", "Corporation Code"], answer: "Republic Act 10533 (Enhanced Basic Education Act of 2013)", hint: "Remember the K-12 Law passed in 2013 (watch out: HO1 has a typo dropping the leading '1'!).", whyEasy: "RA 10533 is the Enhanced Basic Education Act of 2013 establishing the 4 K-12 Exits!" },
        { type: "mc", prompt: "WICA HO1 Study (Paat et al.): Which Filipino concepts exemplify GRIT that boosts college readiness?", options: ["Bahala na & Ningas kugon", "Sigasig (persistence of effort) & Tiyaga (constancy in work)", "Diploma mentality only", "Hiya & Utang na loob"], answer: "Sigasig (persistence of effort) & Tiyaga (constancy in work)", hint: "Sustained effort + steady constancy even when coursework gets tough!", whyEasy: "Sigasig and tiyaga capture the two core pillars of grit alongside academic skill!" },
        { type: "mc", prompt: "WICA HO2: Where do you register the business name of a SOLE PROPRIETORSHIP vs a CORPORATION in the Philippines?", options: ["Sole Prop = DTI; Corporation = SEC", "Sole Prop = BIR; Corporation = Barangay", "Both register only at TESDA", "Sole Prop = SEC; Corporation = DTI"], answer: "Sole Prop = DTI; Corporation = SEC", hint: "Department of Trade and Industry (sole prop) vs Securities and Exchange Commission (corporations)!", whyEasy: "DTI handles sole proprietorship names, while SEC registers corporations (stock & non-stock)!" },
        { type: "mc", prompt: "WICA HO2: Which type of business ownership is an 'artificial being' created by law with a right of succession?", options: ["Sole Proprietorship", "Partnership", "Corporation", "Freelance gig"], answer: "Corporation", hint: "Exists legally separate from its individual founders and continues even if owners change!", whyEasy: "A Corporation is a legal artificial being with right of succession (Non-stock corps cannot distribute dividends)!" },
        { type: "mc", prompt: "WICA HO2: What is PESO (established under RA 8759) and which agency supervises it?", options: ["Public Employment Service Office under DOLE (free local job & livelihood center)", "Private Exam Screening Org under DepEd", "Philippine Export Security Office under DTI", "Personal Earnings Savings Office under BIR"], answer: "Public Employment Service Office under DOLE (free local job & livelihood center)", hint: "Runs Job Fairs, SPESOS, WAP, WHIP, and OFW reintegration for free!", whyEasy: "PESO (RA 8759) is DOLE's free local multi-employment facilitation facility!" }
      ]
    },
    {
      id: "wica-21st-work-4ir",
      worldId: "wica",
      order: 94,
      title: "WICA: 21st-Century Work, Flex Arrangements & 4IR (VUCA)",
      icon: "🤖",
      tagline: "Job Sharing (2 split 1 role) ≠ Work Sharing (cuts hours to stop layoffs)! Know 3 Skill Pillars, VUCA & 1IR→4IR!",
      scaryVersion: "Post-hierarchical organizational shifts, DOLE flexible schedules, technological displacement & 4IR convergence.",
      easyTruth: "Modern offices are ditching rigid ladders for flat teams, cloud tools, flexible schedules, and inspirational 'lead from the front' bosses (Jacob Morgan's 9 Shifts). In a VUCA Fourth Industrial Revolution (4IR), a college diploma alone won't shield you from automation — your 21st-century SKILLSET will!",
      microSteps: [
        { label: "Step 1: Flexible Work Arrangements — General vs DOLE Advisory No. 2 (HO3)", text: "EXAM TRAP: JOB SHARING = 2 people voluntarily split ONE full-time job (prorated pay); WORK SHARING = company reduces schedules/pay across staff to AVOID mass layoffs! Under DOLE Advisory No. 2 (s. 2009): Compressed Workweek (<6 days, still 48 hrs/wk), Reduction of Workdays (max 6 months), Job Rotation, Forced Leave, Broken-Time, Flexi-Holidays (no diminution of benefits)." },
        { label: "Step 2: 3 Categories of 21st-Century Skills & Smart Machines (HO4 + LAG4)", text: "3 Pillars: (1) Learning & Innovation (critical thinking, communication, collaboration, creativity), (2) Digital Literacy (information, media, ICT), (3) Career & Life (adaptability, initiative, cross-cultural, accountability). Fresh grads most often lack: Critical Thinking, Initiative & Effective Communication! Smart machines include autonomous vehicles, drones (UAVs), CUIs (chatbots), smartdust (MEMS), and smart robots." },
        { label: "Step 3: VUCA & The 4 Industrial Revolutions (HO7)", text: "VUCA = Volatility, Uncertainty, Complexity, Ambiguity. 1IR = Steam/Water mechanization; 2IR = Electricity & Mass Production; 3IR = Digital Computers/IT; 4IR (FIRe) = FUSION of Physical, Digital & Biological spheres (AI, biotech, robotics)! In the Philippines, AGRICULTURE holds the largest share of workers at high automation risk (alongside Finance, Mining & Construction)!" }
      ],
      cheatCode: "Job Sharing (2 share 1 role) ≠ Work Sharing (avoid layoffs)! DOLE Reduction max = 6 mos. 4IR = Physical + Digital + Biological fusion. VUCA!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "WICA HO3 Trap: What is the difference between JOB SHARING and WORK SHARING?", options: ["Job Sharing = 2 people split 1 role voluntarily; Work Sharing = company cuts hours/pay to avoid layoffs", "They mean the exact same thing", "Work Sharing is only for CEOs", "Job Sharing is illegal under DOLE"], answer: "Job Sharing = 2 people split 1 role voluntarily; Work Sharing = company cuts hours/pay to avoid layoffs", hint: "One splits a single JOB between two partners; the other shares WORK across a company during downturns!", whyEasy: "Job Sharing splits 1 position with prorated pay; Work Sharing spreads reduced hours to prevent mass layoffs!" },
        { type: "mc", prompt: "WICA HO3 (DOLE Advisory No. 2): What is the maximum duration allowed for 'Reduction of Workdays'?", options: ["1 month", "3 months", "6 months", "2 years"], answer: "6 months", hint: "DOLE caps temporary reduced workdays at half a year!", whyEasy: "Under DOLE Department Advisory No. 2 (s. 2009), Reduction of Workdays may not exceed 6 months!" },
        { type: "mc", prompt: "WICA HO4 / LAG_4: Which are the THREE main categories of 21st-Century Skills?", options: ["Learning & Innovation, Digital Literacy, Career & Life Skills", "Typing, Driving, and Cooking", "Math, Physics, and Chemistry only", "Filing, Faxing, and Archiving"], answer: "Learning & Innovation, Digital Literacy, Career & Life Skills", hint: "Covers thinking/creating, tech/media fluency, and adaptability/accountability!", whyEasy: "Those 3 pillars organize every core skill needed to thrive alongside AI & smart machines!" },
        { type: "mc", prompt: "WICA HO7: What uniquely defines the Fourth Industrial Revolution (4IR / FIRe) compared to 1IR–3IR?", options: ["Steam engines in textile mills", "Assembly lines and light bulbs", "Fusion of physical, digital, and biological spheres (AI, robotics, biotech)", "Handcrafted agriculture"], answer: "Fusion of physical, digital, and biological spheres (AI, robotics, biotech)", hint: "1IR = Steam, 2IR = Electricity, 3IR = Computers/IT, 4IR = blurring all 3 worlds!", whyEasy: "4IR merges physical, digital, and biological technologies — making continuous upskilling vital!" },
        { type: "mc", prompt: "WICA HO7 (PH Labor Data): Which Philippine sector has the LARGEST share of workers at high risk of 4IR automation?", options: ["Agriculture", "Medical surgery", "Art museums", "Psychotherapy"], answer: "Agriculture", hint: "Routine physical/repetitive labor in farming tops PH automation risk (with Finance, Mining, Construction)!", whyEasy: "Agriculture has the largest proportion of Philippine workers vulnerable to automation!" }
      ]
    },
    {
      id: "wica-growth-ethics",
      worldId: "wica",
      order: 95,
      title: "WICA: Professional Growth (PDP), SMART Goals & Work Ethics",
      icon: "🎯",
      tagline: "PDP = 5 parts (Experiential learning should be the MAJORITY!). Ethics = explicit dos/don'ts; Professionalism = personal conduct!",
      scaryVersion: "Continuous professional development planning, temporal SMART horizons & deontological workplace ethics.",
      easyTruth: "Landing a job is only Day 1 — staying valuable requires a living Professional Development Plan (PDP) built mostly on HANDS-ON experiential learning! And don't mix up Ethics vs Professionalism: Ethics are explicit rules/values ('what's right'), while Professionalism is how YOU show up and conduct yourself daily!",
      microSteps: [
        { label: "Step 1: The 5 Components of a Professional Development Plan (HO5)", text: "(1) Self-Assessment (compare current skills vs career target), (2) SMART Goals (Specific, Measurable, Achievable, Relevant, Timely), (3) Strategies (4 types: Experiential learning [hands-on — SHOULD BE THE MAJORITY!], Exposure, Education, Reflection), (4) Resources (CE institutions, associations, webinars), (5) Living Timelines (update as milestones change!)." },
        { label: "Step 2: Goal Time Horizons (Short, Mid, Long)", text: "Prioritize your highest-impact SMART goals across 3 clear horizons: Short-term = within 1 year; Mid-term = 1 to 2 years; Long-term = 3 to 5 years!" },
        { label: "Step 3: Work Ethics vs Professionalism (HO6 Core Exam Trap!)", text: "ETHICS = usually EXPLICIT guidelines of dos and don'ts reflecting moral character & integrity. PROFESSIONALISM = traits CULTIVATED PERSONALLY (a component of work ethic!) shown through punctuality, accountability (owning mistakes without blaming!), tidy organization, hygiene/appearance, diligence, and humility!" }
      ],
      cheatCode: "PDP: Self-Assess, SMART (1yr / 1-2yr / 3-5yr), Strategies (Experiential = MAJORITY!), Resources, Timeline. Ethics = rules; Professionalism = personal conduct!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: false,
      questions: [
        { type: "mc", prompt: "WICA HO5: Among the 4 PDP learning strategies (Experiential, Exposure, Education, Reflection), which should form the MAJORITY?", options: ["Experiential learning (learning by doing)", "Passive reading only", "Reflection only", "Attending one webinar"], answer: "Experiential learning (learning by doing)", hint: "Example in HO5: an aspiring vet actually volunteering at an animal shelter!", whyEasy: "Hands-on experiential practice builds real workplace competence fastest!" },
        { type: "mc", prompt: "WICA HO5: In a Professional Development Plan, a goal set for '3 to 5 years from now' is classified as:", options: ["Immediate", "Short-term (within 1 year)", "Mid-term (1–2 years)", "Long-term (3–5 years)"], answer: "Long-term (3–5 years)", hint: "Check the 3 PDP horizons: 1 yr (Short), 1–2 yrs (Mid), 3–5 yrs (Long)!", whyEasy: "3–5 years is the Long-term SMART goal horizon in HO5!" },
        { type: "mc", prompt: "WICA HO6 Distinction: How do ETHICS and PROFESSIONALISM differ?", options: ["Ethics are explicit guidelines (dos/don'ts); Professionalism is personally cultivated workplace conduct", "Ethics only apply to doctors; Professionalism applies to everyone", "Professionalism means wearing expensive brands", "They are exact opposites"], answer: "Ethics are explicit guidelines (dos/don'ts); Professionalism is personally cultivated workplace conduct", hint: "Ethics set external right/wrong standards; Professionalism is how you personally embody work ethic!", whyEasy: "Ethics outline explicit dos/don'ts, while Professionalism is a personal component of work ethic!" },
        { type: "mc", prompt: "WICA HO6: You notice a mistake in a report you submitted to your supervisor. What shows true professionalism?", options: ["Blame a teammate quietly", "Take accountability immediately, own the error, and propose a fix", "Delete the file and hide", "Ignore it and hope nobody reads it"], answer: "Take accountability immediately, own the error, and propose a fix", hint: "Accountability + honesty builds lasting workplace trust!", whyEasy: "Taking responsibility without blame is a core pillar of 21st-century professionalism!" },
        { type: "mc", prompt: "What does the acronym SMART stand for when setting professional development goals?", options: ["Simple, Massive, Automatic, Rapid, Tough", "Specific, Measurable, Achievable, Relevant, Timely", "Smart, Motivated, Active, Ready, Trained", "Short, Medium, Annual, Realistic, Tested"], answer: "Specific, Measurable, Achievable, Relevant, Timely", hint: "Every letter forces your goal to be clear, trackable, and deadline-bound!", whyEasy: "SMART = Specific, Measurable, Achievable, Relevant, Timely!" }
      ]
    },
    {
      id: "wica-jobs-resume-interview",
      worldId: "wica",
      order: 96,
      title: "WICA: Job Docs, Hiring Process, Résumés & STAR Interviews",
      icon: "📄",
      tagline: "PSA/SSS/NBI/PNP/BIR/PhilHealth! Real employers NEVER charge application fees! Ace behavioral questions with STAR!",
      scaryVersion: "Philippine pre-employment statutory documentation, ATS recruitment pipelines & STAR behavioral interviewing.",
      easyTruth: "Your résumé's ONLY job is to pass ATS software and earn you an interview — and your interview's job is to prove your value with concrete STAR stories! Know every Philippine government document's issuing agency and NEVER fall for fake job listings asking for payment!",
      microSteps: [
        { label: "Step 1: 8 PH Job Requirements & Spotting Scam Jobs (HO8)", text: "Know exact agencies: Birth Cert (PSA), Transcript/TOR (your school), SSS ID (Social Security System), NBI Clearance (NBI — no criminal charges), Police Clearance (PNP), TIN (BIR — taxpayer), PhilHealth (health), Résumé. Ways to find jobs: Listings, Networking (uncovers HIDDEN jobs!), Walk-ins (NOT for degree/license roles like ER nurse!). RED FLAG: Legitimate employers NEVER charge an application fee!" },
        { label: "Step 2: 11-Step Hiring, Résumé & Cover Letter Specs (HO9)", text: "Hiring runs: Apply → ATS (Applicant Tracking System) → Talent Tests → Interviews → Follow-Up → Drug/Background/Credit/Reference Checks (ALWAYS ask reference permission first!) → Offer → Paperwork. Résumé (5 parts, REVERSE-CHRONOLOGICAL — most recent first!): Header, Professional Summary (2–5 sentences), Work Experience, Skills, Education. Cover Letter: 1 page max, 3–4 paragraphs, Arial/Helvetica 10–12 pt, left-aligned, single-spaced, 1-inch margins!" },
        { label: "Step 3: Acing the Interview — STAR Method & Follow-Up", text: "3 Prep Pillars: Research, Planning, Practice. Answer behavioral questions ('Tell me about a time...') with STAR: Situation → Task → Action → Result! Send a thank-you email within 1 DAY; if no reply within 1 WEEK after closing, send a polite follow-up!" }
      ],
      cheatCode: "PSA/BIR(TIN)/NBI/PNP/SSS/PhilHealth. NO legit job charges a fee! Résumé = reverse-chronological. Cover letter = 1 pg, 1\" margins. STAR + 1-day thank you!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "WICA HO8: Which Philippine government agency issues your TIN (Tax Identification Number) vs your Birth Certificate?", options: ["TIN = BIR; Birth Certificate = PSA", "TIN = NBI; Birth Certificate = SSS", "TIN = PNP; Birth Certificate = DOLE", "TIN = PhilHealth; Birth Certificate = BIR"], answer: "TIN = BIR; Birth Certificate = PSA", hint: "Bureau of Internal Revenue handles taxes; Philippine Statistics Authority holds civil records!", whyEasy: "BIR issues TIN IDs/forms and PSA issues official Birth Certificates!" },
        { type: "mc", prompt: "WICA HO8 Scam Alert: Which is a MAJOR red flag that a job posting is fake or fraudulent?", options: ["It asks for a resume and interview", "It demands an 'application fee' or bank details upfront", "It lists minimum qualifications", "It has an official company website"], answer: "It demands an 'application fee' or bank details upfront", hint: "Unlike college entrance exams, legitimate employers NEVER charge you to apply!", whyEasy: "Real companies pay YOU to work — upfront 'application fees' are a classic job scam!" },
        { type: "mc", prompt: "WICA HO9: In a chronological résumé, what order should your Work Experience and Education appear in?", options: ["Reverse-chronological (MOST RECENT first!)", "Oldest elementary school first", "Alphabetical order", "Random order"], answer: "Reverse-chronological (MOST RECENT first!)", hint: "Recruiters scan top-down to see what you're capable of RIGHT NOW!", whyEasy: "Always put your most recent degree/experience at the top (reverse-chronological)!" },
        { type: "mc", prompt: "WICA HO9: What does the STAR method stand for when answering behavioral interview questions?", options: ["Study, Test, Apply, Repeat", "Situation, Task, Action, Result", "Skills, Training, Attitude, Resume", "Start, Talk, Ask, Respond"], answer: "Situation, Task, Action, Result", hint: "Set the scene → your role → what YOU did → measurable outcome!", whyEasy: "STAR structures crisp, persuasive interview stories proving real results!" },
        { type: "mc", prompt: "WICA HO9: When should you send a thank-you email after a job interview, and what must you ALWAYS do before listing references?", options: ["Thank-you within 1 day; ALWAYS ask references' permission first!", "Wait 1 month; surprise references so they sound authentic", "Never follow up; list celebrities", "Send thank-you before applying; skip references"], answer: "Thank-you within 1 day; ALWAYS ask references' permission first!", hint: "Prompt 24-hour gratitude + respectful heads-up to your references!", whyEasy: "Follow up within 1 day (and check in after 1 week if silent), and always get reference consent!" }
      ]
    },
    {
      id: "wica-research-pm-entrep",
      worldId: "wica",
      order: 97,
      title: "WICA: Research Designs, Project Management & Entrepreneurial BMC",
      icon: "📊",
      tagline: "Quant vs Qual vs Mixed! PM runs 5 Phases (Executing & Monitoring run SIMULTANEOUSLY!). Build ventures via the Business Model Canvas!",
      scaryVersion: "Empirical inquiry methodologies, PMBOK five-phase project lifecycles & Business Model Canvas prototyping.",
      easyTruth: "Whether you're writing a Capstone Research Paper, managing a team deadline, or launching an SHS Entrepreneurial Project, all three run on structured systems: pick the right Research Design, guide projects through 5 PM Phases (tracking live with Gantt/Kanban), and map how value becomes revenue on a Business Model Canvas!",
      microSteps: [
        { label: "Step 1: Research Methodologies & 4-Chapter Format (HO10)", text: "Creswell (2008): research collects & analyzes info to deepen understanding. QUANTITATIVE: Experimental (manipulates IV in SIPs!), Correlational (measures link, no manipulation), Causal-Comparative (after event happened), Survey. QUALITATIVE: Phenomenology (1st-person lived experience), Ethnography (cultural immersion), Grounded Theory (inductively builds theory), Case Study, Narrative. MIXED: Triangulation, Embedded, Explanatory, Exploratory. 4 Chapters: (1) Problem & Background, (2) Methodology, (3) Results & Discussion, (4) Summary, Conclusions & Recommendations." },
        { label: "Step 2: 5 Phases of Project Management (HO11)", text: "(1) Initiating (scope, overview, budget), (2) Planning (milestones, team selection, resources), (3) Executing (delivering work) — occurs SIMULTANEOUSLY with (4) Monitoring/Controlling ('where are we vs where should we be?' via Kanban boards, Gantt charts, stand-ups!), (5) Closing (final delivery, contracts closed, lessons-learned audit)!" },
        { label: "Step 3: Entrepreneurial Project & Business Model Canvas (HO12)", text: "5 Phases: Planning (motivation letter) → Starting (kick-off) → Business Model Development (BMC!) → Business Planning → Final Presentation. Key BMC blocks: Customer Segments (who?), Value Proposition (problem solved!), Channels, Customer Relationships, Revenue Streams, Key Activities, Key Resources, Key Partners! Creates a Product, Service, or Event solving a real community need." }
      ],
      cheatCode: "Phenomenology = lived experience; Ethnography = culture; Experimental = manipulate IV. PM: Executing + Monitoring happen TOGETHER! BMC = Value Prop + Segments + Revenue!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: false,
      questions: [
        { type: "mc", prompt: "WICA HO10: A researcher immerses themselves inside an indigenous community to understand its daily culture. Which Qualitative design is this?", options: ["Ethnography", "Experimental", "Survey", "Causal-comparative"], answer: "Ethnography", hint: "'Ethno-' = people/culture — immersion in the participants' natural cultural setting!", whyEasy: "Ethnography studies culture through deep immersion, whereas Phenomenology studies first-person consciousness!" },
        { type: "mc", prompt: "WICA HO10: In a 4-Chapter Research Manuscript, which chapter contains Research Design, Participants, and Instruments?", options: ["Chapter 1: Problem & Background", "Chapter 2: Methodology", "Chapter 3: Results & Discussion", "Chapter 4: Conclusions"], answer: "Chapter 2: Methodology", hint: "Methodology explains HOW you conducted the study!", whyEasy: "Chapter 2 (Methodology) covers design, participants, instruments, procedure, and data analysis!" },
        { type: "mc", prompt: "WICA HO11: Which TWO of the 5 Project Management phases occur SIMULTANEOUSLY?", options: ["Initiating & Closing", "Executing & Monitoring/Controlling", "Planning & Closing", "Initiating & Executing only"], answer: "Executing & Monitoring/Controlling", hint: "You track progress via Kanban/Gantt charts WHILE the team is building the deliverables!", whyEasy: "Monitoring/Controlling runs right alongside Executing to catch scope drift and keep timelines on track!" },
        { type: "mc", prompt: "WICA HO11: Which visual tools help teams monitor real-time task progress and schedules during Monitoring/Controlling?", options: ["Kanban boards, Gantt charts, and team stand-ups", "Only final audit invoices", "Motivation letters", "Tax receipts"], answer: "Kanban boards, Gantt charts, and team stand-ups", hint: "Card boards for workflow + horizontal timeline bars for schedules!", whyEasy: "Kanban boards, Gantt charts, and stand-ups answer 'where are we vs where should we be?' in real time!" },
        { type: "mc", prompt: "WICA HO12: On a Business Model Canvas (BMC), which block answers 'What customer problem are we solving and what value do we deliver?'", options: ["Value Proposition", "Key Partners", "Channels", "Customer Segments"], answer: "Value Proposition", hint: "The core 'VALUE' reason customers choose your product, service, or event!", whyEasy: "Value Proposition sits at the heart of the BMC — matching Customer Segments to real solutions!" }
      ]
    },

    // -------------------- PERSDEV (+4, L1–L12) --------------------
    {
      id: "persdev-self-whole-person",
      worldId: "persdev",
      order: 98,
      title: "PersDev: Knowing Oneself & Developing the Whole Person",
      icon: "🪞",
      tagline: "Actual Self (who you are) vs Ideal Self (who you aim to be). Thoughts → Feelings → Actions form one loop across 5 domains!",
      scaryVersion: "Self-concept congruence, Johari interpersonal awareness, and biopsychosocial-spiritual holistic integration.",
      easyTruth: "Personal development starts with honest self-awareness: seeing the gap between your Actual Self and your Ideal Self without shame, and realizing your Thoughts steer your Feelings, which drive your Behaviors across all 5 dimensions of being human!",
      microSteps: [
        { label: "Step 1: Actual Self, Ideal Self & Self-Concept (L1)", text: "ACTUAL SELF = who you truly are right now (strengths + flaws). IDEAL SELF = who you aspire to become. When both align closely, you experience Congruence & healthy self-esteem; a huge gap sparks distress OR growth motivation! Johari Window splits self-knowledge into Open, Blind Spot (others see it, you don't!), Hidden, and Unknown panes." },
        { label: "Step 2: The 5 Holistic Domains of a Whole Person (L2)", text: "True growth balances FIVE interconnected aspects: (1) Physiological (body/sleep/health), (2) Cognitive (thinking/learning), (3) Psychological (emotions/attitude), (4) Social (relationships/empathy), and (5) Spiritual (purpose/values/meaning)." },
        { label: "Step 3: The Cognitive Triangle (Thoughts ↔ Feelings ↔ Behaviors)", text: "Fail a quiz → Thought ('I'm hopeless') triggers Feeling (anxious/defeated) → Behavior (quit studying). Reframe the Thought ('I missed Step 2 — let's fix that gap') → Feeling (curious/calm) → Behavior (focused review)!" }
      ],
      cheatCode: "Actual vs Ideal Self → aim for Congruence. Johari Blind Spot = others see, you don't (ask feedback!). 5 Domains + Thoughts → Feelings → Behaviors!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: false,
      questions: [
        { type: "mc", prompt: "In the Johari Window, a habit that your friends clearly notice about you — but YOU don't realize — sits in your:", options: ["Open Area", "Blind Spot", "Hidden Facade", "Unknown Area"], answer: "Blind Spot", hint: "Known to others, unknown to self — just like a car mirror's blind spot!", whyEasy: "Constructive feedback shrinks your Blind Spot and expands your Open Area!" },
        { type: "mc", prompt: "What are the FIVE holistic domains of Developing the Whole Person?", options: ["Physiological, Cognitive, Psychological, Social, Spiritual", "Math, English, Science, PE, Music", "Money, Fame, Power, Looks, Luck", "Speed, Strength, Height, Weight, Age"], answer: "Physiological, Cognitive, Psychological, Social, Spiritual", hint: "Body, Mind, Emotions, Community, and Values/Purpose!", whyEasy: "Holistic development nurtures body, intellect, emotions, social bonds, and deeper values together!" },
        { type: "mc", prompt: "According to the Cognitive Triangle (Thoughts–Feelings–Behaviors), what is the fastest lever to shift an unhelpful reaction?", options: ["Reframing the automatic Thought behind the feeling", "Ignoring all emotions forever", "Blaming external weather", "Waiting 10 years"], answer: "Reframing the automatic Thought behind the feeling", hint: "Changing how you interpret an event directly changes your emotional & behavioral response!", whyEasy: "Thoughts, feelings, and behaviors reinforce each other — reframing the thought breaks the negative spiral!" },
        { type: "mc", prompt: "When your ACTUAL SELF aligns closely with your IDEAL SELF, psychologists call this healthy alignment:", options: ["Congruence", "Dissociation", "Denial", "Conformity"], answer: "Congruence", hint: "Think of matching/harmonious shapes in geometry!", whyEasy: "Congruence between who you are and your core values creates authentic confidence!" },
        { type: "mc", prompt: "Why does skipping sleep for 3 straight nights also hurt your mood, patience with friends, and focus in math?", options: ["All 5 holistic domains interact — Physiological exhaustion impacts Cognitive, Psychological & Social health!", "Sleep only affects muscles", "The brain shuts off completely", "Only stress matters"], answer: "All 5 holistic domains interact — Physiological exhaustion impacts Cognitive, Psychological & Social health!", hint: "Holistic means every domain is wired into the others!", whyEasy: "Physical deprivation ripples directly into cognitive sharpness, emotional stability, and social patience!" }
      ]
    },
    {
      id: "persdev-adolescence-stress",
      worldId: "persdev",
      order: 99,
      title: "PersDev: Adolescence, Mental Health & Stress Coping",
      icon: "🧘",
      tagline: "Erikson's quest: Identity vs. Role Confusion! Eustress motivates; Distress drains. Match Problem- vs Emotion-Focused coping!",
      scaryVersion: "Adolescent psychosocial developmental tasks, hypothalamic stress arousal & adaptive coping mechanisms.",
      easyTruth: "Middle and late adolescence isn't supposed to feel effortless — your core life task right now (Erikson) is forging an authentic Identity while gaining independence with support from Significant People! Not all stress is bad: small Eustress sharpens focus, while chronic Distress requires healthy coping instead of avoidance!",
      microSteps: [
        { label: "Step 1: Adolescent Developmental Tasks & Significant People (L3 & L4)", text: "Erik Erikson's adolescent stage = IDENTITY vs. ROLE CONFUSION ('Who am I and where am I going?'). Havighurst's tasks include accepting your maturing body, building mature peer bonds, achieving emotional independence from parents, and preparing for career/citizenship — shaped by Significant People (family, mentors, peers, community)." },
        { label: "Step 2: Eustress vs Distress & Mental Hygiene (L5 & L6)", text: "EUSTRESS = positive, short-term motivating challenge (game day, exciting project). DISTRESS = overwhelming, chronic pressure harming sleep/health. Mental Hygiene = daily preventative care (sleep, movement, journaling, social connection, asking for professional help early — ZERO stigma!)." },
        { label: "Step 3: Problem-Focused vs Emotion-Focused Coping", text: "Can you FIX the stressor? Use PROBLEM-FOCUSED coping (make a study plan, split a huge task, talk out a conflict). Is the stressor outside your control right now? Use EMOTION-FOCUSED coping (box breathing, mindfulness, reframing, talking to a trusted adult) — avoid maladaptive numbing/procrastination!" }
      ],
      cheatCode: "Erikson Teen Stage = Identity vs Role Confusion. Eustress = helpful fuel; Distress = drain. Controllable stressor → Problem-focused; Uncontrollable → Emotion-focused!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "In Erik Erikson's psychosocial stages, what is the central developmental conflict of Adolescence?", options: ["Trust vs. Mistrust", "Identity vs. Role Confusion", "Integrity vs. Despair", "Autonomy vs. Shame"], answer: "Identity vs. Role Confusion", hint: "Teens explore values, career paths, and personal beliefs to answer 'Who am I?'!", whyEasy: "Adolescence centers on building a coherent personal Identity vs Role Confusion!" },
        { type: "mc", prompt: "The energized focus you feel right before performing in a recital or athletic match is called:", options: ["Distress", "Eustress (positive motivating stress)", "Burnout", "Apathy"], answer: "Eustress (positive motivating stress)", hint: "'Eu-' means GOOD (like euphoria) — optimal challenge that boosts performance!", whyEasy: "Eustress sharpens focus and energy without overwhelming your coping capacity!" },
        { type: "mc", prompt: "You feel stressed because 3 big exams fall next week. Making a daily 30-minute study schedule is:", options: ["Problem-focused coping (fixing the root cause!)", "Avoidance coping", "Denial", "Distress amplification"], answer: "Problem-focused coping (fixing the root cause!)", hint: "You can directly control your preparation, so you tackle the source itself!", whyEasy: "Problem-focused coping targets and solves controllable stressors directly!" },
        { type: "mc", prompt: "Which habit is a genuine example of proactive MENTAL HYGIENE?", options: ["Pulling all-nighters before every test", "Consistent sleep, exercise, honest check-ins, and seeking support early", "Bottling up anxiety until finals", "Comparing yourself nonstop on social media"], answer: "Consistent sleep, exercise, honest check-ins, and seeking support early", hint: "Just like brushing teeth prevents cavities, mental hygiene maintains emotional resilience daily!", whyEasy: "Daily restorative routines and early support keep mental health strong!" },
        { type: "mc", prompt: "Why are 'Significant People' (parents, teachers, healthy peers, community mentors) vital during adolescence?", options: ["They provide feedback, modeling, emotional safety, and social identity anchors", "They must make every single choice for you forever", "Adolescents should isolate completely", "They replace self-awareness"], answer: "They provide feedback, modeling, emotional safety, and social identity anchors", hint: "Healthy independence grows FROM secure support, not total isolation!", whyEasy: "Supportive mentors and peers scaffold confidence, accountability, and belonging!" }
      ]
    },
    {
      id: "persdev-brain-emotions-eq",
      worldId: "persdev",
      order: 100,
      title: "PersDev: Power of the Brain, Emotions & Emotional Intelligence",
      icon: "🧠",
      tagline: "Amygdala = fast alarm; Prefrontal Cortex = wise CEO (still wiring in teens!). Master Goleman's 5 EQ Pillars!",
      scaryVersion: "Prefrontal-limbic neurodevelopment, synaptic neuroplasticity & Goleman emotional intelligence taxonomy.",
      easyTruth: "Ever snap in anger and regret it 10 seconds later? That's an AMYGDALA HIJACK — your fast emotional alarm fired before your slower Prefrontal Cortex (executive CEO, still maturing until ~25!) could think! Neuroplasticity proves your brain rewires like muscle every time you practice focus and Emotional Intelligence (EQ)!",
      microSteps: [
        { label: "Step 1: Brain Architecture & Neuroplasticity (L7)", text: "PREFRONTAL CORTEX (frontal lobe) = planning, impulse control, logic. AMYGDALA (limbic system) = instant threat/emotion alarm. HIPPOCAMPUS = converts short-term study into long-term memory (especially during SLEEP!). NEUROPLASTICITY = your brain physically strengthens neural pathways you practice repeatedly (Mind Mapping links visual + verbal networks!)." },
        { label: "Step 2: Nature of Emotions & The 6-Second Pause (L8)", text: "Emotions are biological signals, NOT character flaws! Anger signals a crossed boundary; fear signals risk; sadness signals loss. Naming an emotion ('I notice I'm feeling anxious') activates the Prefrontal Cortex and calms the Amygdala!" },
        { label: "Step 3: Daniel Goleman's 5 Pillars of Emotional Intelligence (EQ, L9)", text: "(1) Self-Awareness (spotting your feelings live), (2) Self-Regulation (pausing before reacting impulsively), (3) Motivation (internal drive & resilience), (4) Empathy (understanding others' feelings/perspectives), (5) Social Skills (communicating & resolving conflict cleanly)!" }
      ],
      cheatCode: "Prefrontal = CEO; Amygdala = Alarm; Hippocampus = Memory. Neuroplasticity = practice rewires brains! EQ = Aware, Regulate, Motivate, Empathy, Social!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Which brain region handles executive planning, judgment, and impulse control — and keeps maturing into your mid-20s?", options: ["Prefrontal Cortex", "Brainstem only", "Spinal cord", "Cerebellum only"], answer: "Prefrontal Cortex", hint: "Sits right behind your forehead — the brain's 'Chief Executive Officer'!", whyEasy: "The Prefrontal Cortex governs long-term planning and self-regulation!" },
        { type: "mc", prompt: "Snapping angrily at a comment before thinking is called an 'Amygdala Hijack' because the Amygdala:", options: ["Triggers a rapid emotional threat alarm faster than rational deliberation", "Stores multiplication tables", "Controls blood sugar", "Pumps oxygen"], answer: "Triggers a rapid emotional threat alarm faster than rational deliberation", hint: "Part of the fast limbic system built for survival alarms!", whyEasy: "A 6-second deep breath lets the Prefrontal Cortex catch up to the Amygdala!" },
        { type: "mc", prompt: "What does NEUROPLASTICITY prove about struggling with a hard subject like Physics or Calculus?", options: ["Intelligence is fixed at birth", "Focused practice physically rewires and strengthens neural connections at any age!", "Brains shrink when learning", "Only left-brained people can do math"], answer: "Focused practice physically rewires and strengthens neural connections at any age!", hint: "'Plastic' = moldable — neurons that fire together wire together!", whyEasy: "Every error you repair strengthens synaptic pathways (growth mindset backed by neuroscience)!" },
        { type: "mc", prompt: "Which of Daniel Goleman's 5 EQ pillars is demonstrated when you feel furious yet pause to breathe and respond calmly?", options: ["Self-Regulation", "Empathy", "Amnesia", "Conformity"], answer: "Self-Regulation", hint: "Managing and steering your emotional impulse instead of letting it drive!", whyEasy: "Self-Regulation is choosing a wise response in the gap between trigger and action!" },
        { type: "mc", prompt: "How does EMPATHY differ from SYMPATHY?", options: ["Empathy steps into another's perspective to feel WITH them; Sympathy feels pity from a distance", "They mean the exact opposite of kindness", "Empathy means always agreeing blindly", "Sympathy requires neuroscience"], answer: "Empathy steps into another's perspective to feel WITH them; Sympathy feels pity from a distance", hint: "Empathy builds genuine connection by truly listening to understand!", whyEasy: "Empathy ('feeling with') is a cornerstone of Goleman's EQ and strong leadership!" }
      ]
    },
    {
      id: "persdev-relationships-leadership",
      worldId: "persdev",
      order: 101,
      title: "PersDev: Personal Relationships, Social Influence & Leadership",
      icon: "🤝",
      tagline: "Sternberg's Love = Intimacy + Passion + Commitment! Distinguish Conformity vs Compliance vs Obedience, and lead by SERVING!",
      scaryVersion: "Interpersonal attachment boundaries, triarchic love theory, social influence & servant leadership.",
      easyTruth: "Healthy relationships thrive on trust, mutual respect, and clear boundaries — NEVER control or guilt! In groups, noticing the difference between Conformity, Compliance, and Obedience keeps you grounded, while Servant Leadership proves real influence lifts other people UP!",
      microSteps: [
        { label: "Step 1: Sternberg's Triangular Theory of Love & Healthy Boundaries (L10)", text: "Robert Sternberg's 3 components: INTIMACY (emotional closeness/trust), PASSION (attraction/energy), and COMMITMENT (conscious decision to stay loyal). All 3 together = Consummate Love! Healthy bonds honor personal boundaries, honest 'I-statements', and mutual freedom." },
        { label: "Step 2: Three Types of Social Influence (L12)", text: "CONFORMITY = changing behavior to match peer group norms (unspoken pressure). COMPLIANCE = saying yes to a direct request from an equal. OBEDIENCE = following direct orders from an authority figure!" },
        { label: "Step 3: Servant & Transformational Leadership (L11)", text: "Leadership is INFLUENCE and SERVICE, NOT bossing from a throne! SERVANT LEADERS put team growth and community needs first; TRANSFORMATIONAL LEADERS inspire shared vision and empower others to become leaders themselves!" }
      ],
      cheatCode: "Sternberg: Intimacy + Passion + Commitment = Consummate Love. Conformity (peers), Compliance (request), Obedience (authority). Lead by Serving!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: false,
      questions: [
        { type: "mc", prompt: "In Robert Sternberg's Triangular Theory of Love, what THREE components combine to form 'Consummate Love'?", options: ["Intimacy, Passion, and Commitment", "Money, Status, and Popularity", "Conformity, Obedience, and Fear", "Talent, Speed, and Luck"], answer: "Intimacy, Passion, and Commitment", hint: "Emotional closeness + attraction + loyal choice!", whyEasy: "Intimacy (warmth), Passion (drive), and Commitment (decision) form Sternberg's complete triangle!" },
        { type: "mc", prompt: "You start wearing a jacket style only because everyone in your friend group wears it (nobody asked you directly). This is:", options: ["Conformity", "Obedience", "Compliance", "Servant Leadership"], answer: "Conformity", hint: "Matching unspoken group norms without a direct order or request!", whyEasy: "Conformity adjusts to peer norms; Compliance answers a request; Obedience follows authority!" },
        { type: "mc", prompt: "Which statement is a healthy, non-defensive 'I-Statement' for resolving conflict?", options: ["'You ALWAYS ruin everything!'", "'I feel overwhelmed when deadlines slip because I worry we won't finish; can we split tasks?'", "'Fine, I'll never talk to you again.'", "'Whatever, it doesn't matter.'"], answer: "'I feel overwhelmed when deadlines slip because I worry we won't finish; can we split tasks?'", hint: "Shares YOUR feeling + specific behavior + constructive next step without attacking character!", whyEasy: "'I-statements' lower defensiveness and invite collaborative problem-solving!" },
        { type: "mc", prompt: "What defines a SERVANT LEADER compared to an authoritarian boss?", options: ["Prioritizes empowering, listening to, and growing the people they serve", "Controls every detail through fear", "Takes credit for team wins alone", "Refuses all feedback"], answer: "Prioritizes empowering, listening to, and growing the people they serve", hint: "Inverts the pyramid — asking 'How can I help my team succeed?'!", whyEasy: "Servant Leadership builds high trust, ownership, and lasting team excellence!" },
        { type: "mc", prompt: "What is a clear RED FLAG of an unhealthy relationship?", options: ["Encouraging each other's friendships and goals", "Isolating you from family/friends, monitoring your phone, or using guilt to control you", "Disagreeing respectfully and compromising", "Respecting personal study time"], answer: "Isolating you from family/friends, monitoring your phone, or using guilt to control you", hint: "Healthy love expands your safety and freedom — control shrinks it!", whyEasy: "Control, isolation, and disrespect of boundaries are classic warning signs of toxic dynamics!" }
      ]
    },

    // -------------------- WLNS6 (+3, L1–L6) --------------------
    {
      id: "wlns-fitness-excellence",
      worldId: "wellness",
      order: 102,
      title: "Wellness: Staying Fit (FITT) & The Habit of Excellence",
      icon: "🏃",
      tagline: "Design workouts with FITT (Frequency, Intensity, Time, Type)! Excellence = consistent daily systems, NOT perfectionism!",
      scaryVersion: "Exercise physiology FITT prescription, cardiovascular heart-rate zones & mastery-oriented habit architecture.",
      easyTruth: "Fitness isn't punishing 3-hour crash workouts — it's dialing the 4 FITT knobs sustainably alongside real sleep and hydration! And true Excellence isn't anxious Perfectionism (which freezes you from starting); it's showing up daily and making your work 1% sharper!",
      microSteps: [
        { label: "Step 1: The FITT Exercise Principle (L1)", text: "FREQUENCY (how many days/week, e.g. 3–5×), INTENSITY (how hard — moderate target heart rate is ~50–70% of Max HR = 220 − age!), TIME (minutes/session, e.g. 30–60 min), TYPE (Aerobic/cardio like brisk walking/swimming + Strength + Flexibility!)." },
        { label: "Step 2: Recovery Is When You Actually Grow", text: "Muscles and brains don't grow during stress — they rebuild stronger during SLEEP (7–9 hrs for teens!), balanced protein/whole-food nutrition, and steady hydration." },
        { label: "Step 3: Excellence vs Perfectionism (L2)", text: "PERFECTIONISM fears mistakes, procrastinates, and ties self-worth to flawlessness. EXCELLENCE loves learning, treats errors as data, finishes cleanly, and honors integrity even when nobody is watching!" }
      ],
      cheatCode: "FITT = Frequency, Intensity, Time, Type. Max HR ≈ 220 − age. Recovery (sleep!) builds strength. Excellence = daily craft, NOT perfectionism!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: false,
      questions: [
        { type: "mc", prompt: "What do the four letters of the FITT fitness principle stand for?", options: ["Fast, Intense, Tough, Training", "Frequency, Intensity, Time, Type", "Food, Intake, Track, Tone", "Flex, Interval, Tempo, Target"], answer: "Frequency, Intensity, Time, Type", hint: "How often, how hard, how long, and what kind of exercise!", whyEasy: "FITT lets you customize any safe, progressive workout plan!" },
        { type: "input", prompt: "Using the standard estimate Max Heart Rate = 220 − age, what is the estimated Max HR (bpm) for an 18-year-old?", answer: "202", hint: "Subtract 18 from 220!", whyEasy: "220 − 18 = 202 bpm (moderate zone 50–70% sits around 101–141 bpm)!" },
        { type: "mc", prompt: "Which type of exercise uses continuous oxygen over longer durations (like jogging, cycling, or swimming) to strengthen the heart?", options: ["Aerobic exercise", "Isometric holding only", "Zero-oxygen sprinting only", "Sitting"], answer: "Aerobic exercise", hint: "'Aero-' = air/oxygen!", whyEasy: "Aerobic cardio trains heart and lung endurance; pair it with strength & stretching!" },
        { type: "mc", prompt: "How does pursuing EXCELLENCE differ from toxic PERFECTIONISM?", options: ["Excellence focuses on steady growth and high craft; Perfectionism fears mistakes and fuels procrastination", "Excellence never makes a single mistake", "Perfectionism means being lazy", "They are identical"], answer: "Excellence focuses on steady growth and high craft; Perfectionism fears mistakes and fuels procrastination", hint: "Excellence asks 'How can I improve?'; Perfectionism fears 'What if I look foolish?'!", whyEasy: "Excellence builds momentum and pride in craft without fear-driven paralysis!" },
        { type: "mc", prompt: "When does your body actually repair muscle fibers and consolidate newly studied memories?", options: ["During quality sleep and rest recovery", "Only during all-nighters", "Only while drinking energy drinks", "Never"], answer: "During quality sleep and rest recovery", hint: "Training sends the signal; recovery builds the upgrade!", whyEasy: "Deep sleep repairs tissues, balances hormones, and locks study memories into long-term storage!" }
      ]
    },
    {
      id: "wlns-money-literacy",
      worldId: "wellness",
      order: 103,
      title: "Wellness: All About Money — Budgeting, Compounding & Debt",
      icon: "💰",
      tagline: "Pay Yourself First (50/30/20)! Compounding grows wealth exponentially — and destroys you in reverse on high-interest debt!",
      scaryVersion: "Personal cash-flow allocation, exponential compound interest dynamics, inflation erosion & liability management.",
      easyTruth: "Money obeys pure math: earn → save FIRST → invest to let Compound Interest earn interest ON its own interest! Watch out for the mirror twin: credit-card debt uses the EXACT same compounding math AGAINST you at 24%–36% per year!",
      microSteps: [
        { label: "Step 1: Needs vs Wants & The 50/30/20 Rule", text: "Don't save whatever is 'left over' (usually zero!) — PAY YOURSELF FIRST! A clean starter split: 50% Needs (food, transport, bills), 30% Wants (fun, treats), 20% Savings & Investing (build a 3–6 month Emergency Fund first!)." },
        { label: "Step 2: Simple vs Compound Interest & Inflation", text: "Simple interest only pays on original principal (I = Prt). COMPOUND interest pays on principal PLUS past interest: A = P(1 + r/n)^(nt) — time is your superpower when you start young! Meanwhile, INFLATION (~3–5%/yr) quietly shrinks the buying power of idle cash under a mattress." },
        { label: "Step 3: Assets vs Liabilities & The Debt Trap", text: "ASSETS put money into your pocket or grow in value (skills, productive business, diversified index funds). LIABILITIES drain cash out (impulse gadgets on installment, high-interest credit card balances). Always pay full statement balances — never just the 'minimum due'!" }
      ],
      cheatCode: "50% Needs / 30% Wants / 20% Pay-Yourself-First! Compound A = P(1 + r/n)^(nt) rewards early starters & punishes credit-card debt!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "Using the 50/30/20 budget rule on a ₱10,000 monthly allowance/income, how much (₱) goes to Savings/Investing (20%)?", answer: "2000", hint: "Compute 20% (one-fifth) of 10,000!", whyEasy: "0.20 × ₱10,000 = ₱2,000 saved FIRST before spending on wants!" },
        { type: "mc", prompt: "Why does starting to invest at age 20 beat starting at age 35 with the exact same yearly contribution?", options: ["Compound interest earns interest ON past interest exponentially over extra years!", "Older money doesn't earn interest", "Inflation disappears at age 20", "Simple interest is always bigger"], answer: "Compound interest earns interest ON past interest exponentially over extra years!", hint: "In A = P(1 + r)^t, time t sits in the EXPONENT!", whyEasy: "Extra years in the exponent create massive snowball growth!" },
        { type: "mc", prompt: "What silently erodes the purchasing power of cash sitting in a 0% piggy bank for 10 years?", options: ["Inflation (rising prices over time)", "Compounding gains", "Dividends", "Budgeting"], answer: "Inflation (rising prices over time)", hint: "Why a snack that cost ₱20 ten years ago costs ₱35 today!", whyEasy: "Inflation reduces what each peso can buy unless savings earn a return outpacing inflation!" },
        { type: "mc", prompt: "Why is paying ONLY the 'minimum due' on a 30% APR credit card dangerous?", options: ["Remaining balance compounds high interest monthly, trapping you paying far more than the original price!", "Credit cards charge 0% interest", "It automatically doubles your savings", "It cancels inflation"], answer: "Remaining balance compounds high interest monthly, trapping you paying far more than the original price!", hint: "High-APR debt is compound interest working in REVERSE against you!", whyEasy: "Always avoid consumer debt traps and pay full credit balances on time!" },
        { type: "mc", prompt: "What is the #1 first financial safety net you should build BEFORE risky investing?", options: ["An Emergency Fund (3–6 months of essential living expenses)", "A luxury watch on installment", "Random lottery tickets", "Maxing out three credit cards"], answer: "An Emergency Fund (3–6 months of essential living expenses)", hint: "Protects you from going into emergency debt when unexpected medical or family costs hit!", whyEasy: "A liquid Emergency Fund shields your life and investments from sudden shocks!" }
      ]
    },
    {
      id: "wlns-leadership-legacy-godpreneur",
      worldId: "wellness",
      order: 104,
      title: "Wellness: Leadership, Legacy & Purpose-Driven Enterprise",
      icon: "🌟",
      tagline: "True leadership multiplies others (Legacy!), and Purpose-Driven Entrepreneurship ('Godpreneur') aligns profit with integrity & service!",
      scaryVersion: "Stewardship leadership, intergenerational legacy formation & ethical social-impact entrepreneurship.",
      easyTruth: "A title can make people obey you temporarily, but CHARACTER and STEWARDSHIP earn lifelong trust! Whether you lead a school org or launch a values-driven enterprise ('Godpreneur'), lasting Legacy is measured by how many people grow stronger because of your service and integrity!",
      microSteps: [
        { label: "Step 1: Stewardship Leadership vs Positional Power (L4 & L5)", text: "Stewardship means treating your talents, team, time, and resources as a trust to multiply responsibly — leading with humility, courage, consistency, and accountability rather than ego." },
        { label: "Step 2: Building a Legacy (Multiplying Leaders)", text: "Success is what you achieve for yourself; LEGACY is what endures and multiplies in OTHER people after you step away — mentoring teammates, setting ethical culture, and solving durable community needs." },
        { label: "Step 3: Purpose-Driven Entrepreneurship / 'Godpreneur' (L6)", text: "Ethical entrepreneurs refuse shortcuts (no cheating customers, no exploiting workers!). They pair sharp financial discipline & innovation with higher purpose — creating products/services that genuinely bless customers, support fair livelihoods, and give back!" }
      ],
      cheatCode: "Title ≠ Leadership. Stewardship multiplies talents & people (Legacy!). Purpose-Driven Enterprise = Profit + Integrity + Genuine Service!",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: false,
      questions: [
        { type: "mc", prompt: "How does building a LEGACY differ from chasing short-term personal success?", options: ["Legacy multiplies lasting positive impact in other people beyond your own spotlight", "Legacy only means becoming famous online", "Legacy ignores ethics to win fast", "Success and legacy are opposites"], answer: "Legacy multiplies lasting positive impact in other people beyond your own spotlight", hint: "Ask: 'What good keeps growing even after I move on?'!", whyEasy: "True legacy invests in people, character, and systems that outlast personal applause!" },
        { type: "mc", prompt: "What core mindset defines a values- or purpose-driven entrepreneur ('Godpreneur')?", options: ["Serving real human needs with excellence, honesty, and stewardship alongside sustainable profit", "Cutting product safety to maximize short-term cash", "Avoiding budgets and planning", "Copying competitors blindly"], answer: "Serving real human needs with excellence, honesty, and stewardship alongside sustainable profit", hint: "Pairs smart business competence with unshakeable ethical purpose!", whyEasy: "Purpose-driven enterprise sees business as a vehicle for integrity, service, and shared flourishing!" },
        { type: "mc", prompt: "In stewardship leadership, what is the leader's main responsibility toward teammates' talents?", options: ["Hide their talent so you look smartest", "Recognize, mentor, and empower them to grow into leaders too", "Micromanage every breath", "Take sole credit for group ideas"], answer: "Recognize, mentor, and empower them to grow into leaders too", hint: "Great leaders grow MORE leaders, not dependent followers!", whyEasy: "Multiplying capability in others is the hallmark of stewardship and legacy!" },
        { type: "mc", prompt: "A customer accidentally overpays you by ₱500 at your startup booth. What choice builds long-term brand trust?", options: ["Keep it silently as extra profit", "Immediately return the ₱500 honestly — integrity creates lifelong loyal advocates", "Hide behind the counter", "Charge ₱500 more next time"], answer: "Immediately return the ₱500 honestly — integrity creates lifelong loyal advocates", hint: "Trust takes years to build and one dishonest moment to destroy!", whyEasy: "Honesty isn't just moral — it builds priceless reputation and repeat trust!" },
        { type: "mc", prompt: "Why do ethics and financial discipline BOTH matter in purpose-driven projects?", options: ["Purpose sets the mission; financial sustainability keeps the mission alive to keep serving!", "Good intentions pay bills automatically", "Profits are always unethical", "Neither matters if you have followers"], answer: "Purpose sets the mission; financial sustainability keeps the mission alive to keep serving!", hint: "No margin, no mission — wise stewardship balances heart AND math!", whyEasy: "Combining mission-driven ethics with sound finances lets your impact scale sustainably!" }
      ]
    },

    // -------------------- 4 EXTRA MATH & STEM BRIDGE GEMS --------------------
    {
      id: "math-vectors-3d-dot-cross",
      worldId: "college",
      order: 105,
      title: "Vectors: Components, Dot (cos θ) & Cross Product (sin θ)",
      icon: "🧭",
      tagline: "Split any angled arrow into (v cos θ, v sin θ)! Dot = AB cos θ (Work!); Cross = AB sin θ ⊥ (Torque & Lorentz F = qv×B)!",
      scaryVersion: "Euclidean vector resolution, inner scalar projection & right-handed 3D cross-product pseudovectors.",
      easyTruth: "This single lesson unlocks BOTH College Math and PHYS2! Dot Product measures how MUCH two arrows point TOGETHER (AB cos θ → max at 0°, zero at 90°). Cross Product measures how PERPENDICULAR two arrows are (AB sin θ → max at 90°, zero at 0°), popping out perpendicular via the Right-Hand Rule!",
      microSteps: [
        { label: "Step 1: Splitting Vectors Into X & Y Components", text: "Arrow of magnitude R at angle θ from the X-axis: R_x = R cos θ (adjacent), R_y = R sin θ (opposite). Recombine magnitude with Pythagoras: |R| = √(R_x² + R_y²)! (E.g. [3, 4] has length 5!)" },
        { label: "Step 2: Dot Product A·B = |A||B|cos θ (SCALAR Output)", text: "Computes parallel overlap: A_x B_x + A_y B_y + A_z B_z. Used for Physics Work W = F·d = Fd cos θ! If A ⊥ B (90°), cos 90° = 0 → Dot = 0!" },
        { label: "Step 3: Cross Product |A×B| = |A||B|sin θ (VECTOR Output ⊥ Both!)", text: "Used for Torque τ = r × F and Magnetic Force F = qv × B! Maximum at 90° (sin 90° = 1); ZERO when parallel (0° or 180°)! Order matters: A × B = −(B × A) (flips direction!)." }
      ],
      cheatCode: "Components: (R cos θ, R sin θ). Dot = AB cos θ (scalar, 0 at 90°). Cross = AB sin θ (⊥ vector, 0 at 0°/180°, A×B = −B×A)!",
      visualizerId: "geometryLogicLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "A vector has components v_x = 6 and v_y = 8. What is its magnitude |v| = √(v_x² + v_y²)?", answer: "10", hint: "Spot the scaled 3-4-5 right triangle: √(36 + 64)!", whyEasy: "√(6² + 8²) = √100 = 10!" },
        { type: "mc", prompt: "Vector A (length 4) and Vector B (length 5) meet at 90°. Compare |A · B| (Dot) vs |A × B| (Cross):", options: ["Dot = 0, Cross = 20", "Dot = 20, Cross = 0", "Both = 20", "Both = 0"], answer: "Dot = 0, Cross = 20", hint: "cos(90°) = 0 for Dot; sin(90°) = 1 for Cross!", whyEasy: "At 90°, parallel overlap (Dot) is 0 while perpendicular area (Cross) hits max 4 × 5 = 20!" },
        { type: "mc", prompt: "Two vectors point in the EXACT SAME direction (θ = 0°). What is their Cross Product A × B?", options: ["Zero vector (0)", "Maximum AB", "Negative AB", "Perpendicular"], answer: "Zero vector (0)", hint: "Check sin(0°) in |A||B|sin θ!", whyEasy: "sin(0°) = 0 — parallel vectors enclose zero area, which is why v ∥ B feels 0 magnetic force!" },
        { type: "mc", prompt: "A force of 10 N acts at 60° above the horizontal (cos 60° = 0.5). What is its horizontal X-component?", options: ["5 N", "10 N", "8.66 N", "20 N"], answer: "5 N", hint: "Horizontal component = F · cos(60°) = 10 × 0.5.", whyEasy: "F_x = 10 cos(60°) = 5 N!" },
        { type: "mc", prompt: "If A × B points straight UP (+z), which direction does B × A point?", options: ["Straight UP (+z)", "Straight DOWN (−z)", "Zero", "Sideways (+x)"], answer: "Straight DOWN (−z)", hint: "Cross product is anti-commutative: swapping order flips the Right-Hand Rule thumb!", whyEasy: "B × A = −(A × B) → flips 180° to straight DOWN (−z)!" }
      ]
    },
    {
      id: "math-trig-identities-laws",
      worldId: "senior",
      order: 106,
      title: "Trig Identities, Law of Sines & Law of Cosines",
      icon: "📐",
      tagline: "Pythagoras never retires: Law of Cosines (c² = a² + b² − 2ab cos C) handles ANY non-right triangle!",
      scaryVersion: "Trigonometric Pythagorean/double-angle identities and oblique-triangle laws of sines and cosines.",
      easyTruth: "What if a triangle has NO 90° angle? Two master laws crack EVERY triangle on Earth: Law of Sines matches opposite side/angle pairs (a/sin A = b/sin B), and Law of Cosines is literally Pythagoras with a tilt-correction term (−2ab cos C)!",
      microSteps: [
        { label: "Step 1: Pythagorean Twins (Divide sin² + cos² = 1!)", text: "Start from sin²θ + cos²θ = 1. Divide everything by cos²θ → tan²θ + 1 = sec²θ! Divide by sin²θ → 1 + cot²θ = csc²θ! Zero memorization needed — derive both in 2 seconds!" },
        { label: "Step 2: Double-Angle & Reciprocal Shortcuts", text: "sin(2θ) = 2 sin θ cos θ (crucial in projectile range!). cos(2θ) = cos²θ − sin²θ. Reciprocals pair opposite letters: csc = 1/sin ('S↔C'), sec = 1/cos ('C↔S'), cot = 1/tan!" },
        { label: "Step 3: Law of Sines vs Law of Cosines (Oblique Triangles)", text: "Have a matching opposite Side + Angle pair (ASA/AAS)? Use LAW OF SINES: a/sin A = b/sin B = c/sin C. Have SAS (two sides + squeezed angle) or SSS (all 3 sides)? Use LAW OF COSINES: c² = a² + b² − 2ab cos C (notice at C = 90°, cos 90° = 0 → collapses right back into a² + b² = c²!)." }
      ],
      cheatCode: "1 + tan² = sec². sin(2θ) = 2sinθcosθ. Opposite pair → Law of Sines; SAS/SSS → Law of Cosines c² = a² + b² − 2ab cos C!",
      visualizerId: "unitCircleAndGraphLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "When angle C = 90° inside the Law of Cosines (c² = a² + b² − 2ab cos C), what famous theorem appears?", options: ["Pythagorean Theorem (a² + b² = c²)", "Quadratic Formula", "Ohm's Law", "Logarithm Product Rule"], answer: "Pythagorean Theorem (a² + b² = c²)", hint: "What is cos(90°)?", whyEasy: "Since cos(90°) = 0, the −2ab cos C term vanishes leaving a² + b² = c²!" },
        { type: "input", prompt: "Triangle has sides a = 5, b = 8 with included angle C = 60° (cos 60° = 0.5). Find side c using Law of Cosines:", answer: "7", hint: "c² = 5² + 8² − 2(5)(8)(0.5) = 25 + 64 − 40 = 49!", whyEasy: "c² = 49 → c = √49 = 7!" },
        { type: "mc", prompt: "Divide sin²θ + cos²θ = 1 through by cos²θ. Which identity do you get?", options: ["tan²θ + 1 = sec²θ", "sin²θ + 1 = csc²θ", "tan θ = 1", "sec²θ + cos²θ = 1"], answer: "tan²θ + 1 = sec²θ", hint: "Remember sin/cos = tan and 1/cos = sec!", whyEasy: "(sin²/cos²) + (cos²/cos²) = 1/cos² → tan²θ + 1 = sec²θ!" },
        { type: "mc", prompt: "Which trigonometric function equals 1 / cos(θ)?", options: ["csc(θ)", "sec(θ)", "cot(θ)", "tan(θ)"], answer: "sec(θ)", hint: "Reciprocal names ALWAYS swap the starting letter: C ↔ S (cos ↔ sec, sin ↔ csc)!", whyEasy: "Secant (sec) = 1/cos, while Cosecant (csc) = 1/sin!" },
        { type: "mc", prompt: "Given two angles and one opposite side (AAS) in a non-right triangle, which law solves the missing side fastest?", options: ["Law of Sines (a/sin A = b/sin B)", "Pythagoras only", "Midpoint formula", "Slope formula"], answer: "Law of Sines (a/sin A = b/sin B)", hint: "You already have a complete opposite side/angle ratio pair!", whyEasy: "Whenever you know one opposite side–angle pair, Law of Sines solves it in one proportion!" }
      ]
    },
    {
      id: "math-integration-techniques",
      worldId: "college",
      order: 107,
      title: "Integration Mastery: u-Sub, By Parts (LIATE) & Area Between Curves",
      icon: "∫",
      tagline: "u-Sub reverses Chain Rule; Integration by Parts reverses Product Rule (∫u dv = uv − ∫v du); Area = ∫(Top − Bottom)!",
      scaryVersion: "Change-of-variable substitution, integration by parts via LIATE priority, and planar enclosed quadrature.",
      easyTruth: "Integration only looks intimidating until you realize its two biggest techniques are just reversing Chain Rule (u-Sub) and Product Rule (By Parts)! Pick u with the LIATE priority ladder and every product integral unravels cleanly!",
      microSteps: [
        { label: "Step 1: u-Substitution (Spot the Inside + Its Derivative!)", text: "In ∫ 3x²·e^(x³) dx, spot u = x³ whose derivative du = 3x² dx sits right next door! Swap to ∫ e^u du = e^u + C = e^(x³) + C! Constant off by a factor? Just divide it outside!" },
        { label: "Step 2: Integration by Parts (∫ u dv = uv − ∫ v du) + LIATE", text: "Pick u (the part you differentiate to make SIMPLER!) using LIATE order: Logs → Inverse trig → Algebraic (x, x²) → Trig (sin/cos) → Exponential (eˣ)! Example: ∫ x·eˣ dx picks u = x (Algebraic beats Exponential!) → x·eˣ − ∫ eˣ dx = x·eˣ − eˣ + C!" },
        { label: "Step 3: Area Between Two Curves = ∫ (Top − Bottom) dx", text: "Find where the curves cross (limits a and b), then integrate (Upper curve − Lower curve) from a to b! Always positive because Top ≥ Bottom!" }
      ],
      cheatCode: "u-Sub = undo Chain Rule. By Parts: ∫u dv = uv − ∫v du (pick u via LIATE!). Area between curves = ∫(Top − Bottom) dx!",
      visualizerId: "calculusSurferLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Using Integration by Parts (LIATE), what should you choose as u for ∫ x · ln(x) dx?", options: ["u = ln(x) (Logs beat Algebraic in LIATE!)", "u = x", "u = dx", "u = x · ln(x)"], answer: "u = ln(x) (Logs beat Algebraic in LIATE!)", hint: "L (Logs) sits at #1 in LIATE because d/dx[ln x] = 1/x kills the log!", whyEasy: "Differentiating ln(x) turns it into clean 1/x, making the remaining integral simple!" },
        { type: "mc", prompt: "Evaluate ∫ 2x · cos(x²) dx using u-substitution (u = x², du = 2x dx):", options: ["sin(x²) + C", "−sin(x²) + C", "2x · sin(x²) + C", "cos(x²) + C"], answer: "sin(x²) + C", hint: "du = 2x dx replaces 2x dx completely, leaving ∫ cos(u) du!", whyEasy: "∫ cos(u) du = sin(u) + C = sin(x²) + C (check: derivative is cos(x²)·2x ✓)!" },
        { type: "mc", prompt: "What is the result of Integration by Parts on ∫ x · eˣ dx (with u = x, dv = eˣ dx)?", options: ["x·eˣ − eˣ + C", "x²·eˣ / 2 + C", "eˣ + C", "x·eˣ + eˣ + C"], answer: "x·eˣ − eˣ + C", hint: "Apply uv − ∫ v du with u = x, du = dx, v = eˣ!", whyEasy: "uv − ∫ v du = x·eˣ − ∫ eˣ dx = x·eˣ − eˣ + C!" },
        { type: "input", prompt: "Find the area between Top line y = 4 and Bottom line y = 1 from x = 0 to x = 5: ∫₀⁵ (4 − 1) dx =", answer: "15", hint: "Height (Top − Bottom) = 3 across width 5!", whyEasy: "∫₀⁵ 3 dx = 3(5) − 3(0) = 15 square units!" },
        { type: "mc", prompt: "Which famous derivative rule does Integration by Parts (∫ u dv = uv − ∫ v du) run in reverse?", options: ["Product Rule", "Power Rule only", "Constant Rule", "L'Hôpital's Rule"], answer: "Product Rule", hint: "Integrate both sides of (u·v)' = u'v + uv'!", whyEasy: "Rearranging ∫(uv)' = ∫v du + ∫u dv yields ∫u dv = uv − ∫v du directly!" }
      ]
    },
    {
      id: "math-financial-compound-annuities",
      worldId: "senior",
      order: 108,
      title: "GenMath: Compound Interest, Rule of 72 & Truth Tables",
      icon: "🏦",
      tagline: "F = P(1 + r/m)^(mt)! Estimate doubling time in 1 second with Rule of 72 (72 ÷ r%)! Master p → q Truth Tables!",
      scaryVersion: "Discrete compounding financial mathematics, annuity valuation & propositional truth-table equivalence.",
      easyTruth: "Philippine SHS General Math puts two superpowers together: Financial Growth (where compounding frequency m slices annual rate r/m across m·t periods, and 72 ÷ rate% instantly tells you how many years it takes money to DOUBLE!) and Formal Propositional Logic (where p → q is ONLY false when a True promise breaks into a False result)!",
      microSteps: [
        { label: "Step 1: Compound Growth F = P(1 + r/m)^(m·t) & Present Value", text: "P = Principal (Present Value), F = Future Value, r = annual rate (decimal), m = compounds/yr (1 annual, 2 semi-annual, 4 quarterly, 12 monthly), t = years. Need P from F? Simply divide: P = F / (1 + r/m)^(mt)!" },
        { label: "Step 2: The Rule of 72 (Instant Doubling Mental Hack!)", text: "How many years for an investment at r% annual compound return to DOUBLE? Divide 72 by the percentage number r: at 8%/yr → 72 ÷ 8 = 9 years! At 12%/yr → 72 ÷ 12 = 6 years!" },
        { label: "Step 3: Propositional Logic Truth Tables (p → q)", text: "∧ = AND (true ONLY if BOTH true). ∨ = OR (false ONLY if BOTH false). Implication p → q ('If p then q') is ONLY FALSE in ONE row: when p is TRUE and q is FALSE (a broken promise)! And p → q is 100% logically identical to its Contrapositive (¬q → ¬p)!" }
      ],
      cheatCode: "F = P(1 + r/m)^(mt). Doubling years ≈ 72 ÷ r%. Truth table: p → q is FALSE ONLY when T → F! Equivalent twin = ¬q → ¬p.",
      visualizerId: "careerLifeWellnessLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "Rule of 72: About how many years does it take an investment earning 9% compounded annually to DOUBLE?", answer: "8", hint: "Divide 72 by the interest rate percentage (9)!", whyEasy: "72 ÷ 9 = 8 years to double your money!" },
        { type: "input", prompt: "₱1,000 earns 10% compounded ANNUALLY (m = 1) for t = 2 years. Future Value F = 1000(1.10)² in ₱?", answer: "1210", hint: "Year 1: ₱1,100; Year 2 earns 10% on ₱1,100 (+₱110)!", whyEasy: "1000 × 1.21 = ₱1,210 (₱10 extra interest earned ON Year 1's interest)!" },
        { type: "mc", prompt: "In a truth table, when is the conditional statement 'p → q' (If p, then q) FALSE?", options: ["ONLY when p is True and q is False", "Whenever p is False", "When both p and q are False", "Whenever q is True"], answer: "ONLY when p is True and q is False", hint: "Think of a promise: 'If you score 100 (p), I'll buy pizza (q)' — when did I break my promise?", whyEasy: "Only True → False breaks the promise; False → anything is vacuously True!" },
        { type: "mc", prompt: "If an interest rate of 12% per year is compounded QUARTERLY (m = 4), what is the interest rate PER PERIOD (j = r/m)?", options: ["12%", "6%", "3%", "1%"], answer: "3%", hint: "Split the 12% annual rate evenly across 4 quarters!", whyEasy: "12% ÷ 4 quarters = 3% (0.03) applied 4 times each year!" },
        { type: "mc", prompt: "Which statement is ALWAYS logically equivalent (identical truth table) to 'p → q'?", options: ["q → p (Converse)", "¬p → ¬q (Inverse)", "¬q → ¬p (Contrapositive)", "p ∧ ¬q"], answer: "¬q → ¬p (Contrapositive)", hint: "Flip BOTH sides AND negate BOTH sides!", whyEasy: "p → q and ¬q → ¬p share the exact same truth values in all 4 rows!" }
      ]
    }
  ];

  for (const node of SHS_NODES) {
    DATA.NODES.push(node);
  }

  // ==================== +8 NEW GRADE 12 TRAPS (25–32) ====================
  DATA.GRADE12_TRAPS.push(
    {
      id: "trap-25",
      title: "Trap #25 (PHYS2): Capacitor vs Resistor Series/Parallel Flip!",
      trapExpression: "Series 6 μF & 12 μF Capacitors = 18 μF??",
      wrongGuess: "18 μF (adding like series resistors!)",
      rightAnswer: "4 μF (1/6 + 1/12 = 3/12 → invert = 4 μF!)",
      whyItHappens: "Students memorize 'series adds' from resistors and apply it blindly to capacitors — but Capacitors are the EXACT OPPOSITE!",
      quickRule: "Resistors: Series adds, Parallel 1/R. Capacitors: PARALLEL adds (bigger area!), SERIES uses 1/C (wider gap!).",
      quiz: {
        prompt: "Two 10 μF capacitors are wired in SERIES. Equivalent capacitance?",
        options: ["20 μF", "5 μF", "10 μF", "100 μF"],
        answer: "5 μF",
        explanation: "Series capacitors use reciprocals (1/10 + 1/10 = 2/10 → invert = 5 μF) — always smaller than a single cap!"
      }
    },
    {
      id: "trap-26",
      title: "Trap #26 (PHYS2): Potential V Uses 1/r, NOT 1/r²!",
      trapExpression: "V = kq / r² ??",
      wrongGuess: "Squaring distance r in Electric Potential V or Energy U!",
      rightAnswer: "V = kq / r and U = kq₁q₂ / r (linear 1/r!)",
      whyItHappens: "Coulomb's Force F and Field E both divide by r², so students accidentally square r inside Voltage V and Energy U too.",
      quickRule: "Vectors (Force F, Field E) = 1/r². Scalars (Energy U, Voltage V) = 1/r!",
      quiz: {
        prompt: "If you HALVE the distance r from a point charge, its Electric Potential V becomes:",
        options: ["2× larger (1/r)", "4× larger (1/r²)", "Half as large", "Unchanged"],
        answer: "2× larger (1/r)",
        explanation: "Because V = kq/r scales linearly as 1/r (not 1/r²), halving distance simply doubles voltage!"
      }
    },
    {
      id: "trap-27",
      title: "Trap #27 (PHYS2): Parallel Currents ATTRACT (Opposite of Charges!)",
      trapExpression: "Two parallel wires with SAME current direction → Repel??",
      wrongGuess: "They repel (thinking 'like repels like'!)",
      rightAnswer: "They ATTRACT each other!",
      whyItHappens: "In electrostatics like charges repel — so students guess parallel currents in the same direction repel too, forgetting the Right-Hand Rule!",
      quickRule: "Charges: Like Repel. Parallel Currents: SAME direction ATTRACTS; OPPOSITE direction REPELS!",
      quiz: {
        prompt: "Two parallel copper power cables carry 100 A in the SAME direction. They experience a magnetic force that is:",
        options: ["Repulsive", "Attractive", "Zero", "Upward only"],
        answer: "Attractive",
        explanation: "Right-Hand Grip + I×B pulls same-direction parallel currents together (F/L = μ₀I₁I₂ / 2πr)!"
      }
    },
    {
      id: "trap-28",
      title: "Trap #28 (PHYS2 HO12): Missing '4' in Biot-Savart & Loop Has NO π!",
      trapExpression: "Loop Center B = μ₀I / (2πR) ??",
      wrongGuess: "Keeping π in the circular loop center formula (or dropping 4 in μ₀/4π!)",
      rightAnswer: "Wire = μ₀I / (2πr), Loop = μ₀I / (2R) (NO π!), Biot-Savart = μ₀ / (4π)!",
      whyItHappens: "Straight wire and circular loop look almost identical, and HO12 even has a printed typo dropping the '4' in Biot-Savart!",
      quickRule: "Straight wire keeps π (2πr). Circular loop cancels π (2R). Biot-Savart ALWAYS starts with μ₀/(4π)!",
      quiz: {
        prompt: "Which formula gives the magnetic field B at the CENTER of an N-turn circular coil of radius R?",
        options: ["μ₀NI / (2πR)", "μ₀NI / (2R)", "μ₀NI / R²", "μ₀I / (4πR)"],
        answer: "μ₀NI / (2R)",
        explanation: "Integrating around the full 2πR circumference cancels π cleanly, leaving B = μ₀NI / (2R)!"
      }
    },
    {
      id: "trap-29",
      title: "Trap #29 (CHEM2): Rate Law Orders ≠ Balanced Coefficients!",
      trapExpression: "2A + 3B → C  ⇒  Rate = k[A]²[B]³ ??",
      wrongGuess: "Copying 2 and 3 straight from the overall equation into the Rate Law!",
      rightAnswer: "Orders m and n MUST be found from experimental rate data!",
      whyItHappens: "Equilibrium constants (K_eq) DO use balanced coefficients as exponents, so students mistakenly do the same for Kinetics Rate Laws!",
      quickRule: "Equilibrium K_eq uses balanced coefficients; Kinetics Rate Law exponents come ONLY from experiment!",
      quiz: {
        prompt: "For 2 NO + O₂ → 2 NO₂, doubling [NO] quadruples rate and doubling [O₂] leaves rate unchanged. Rate Law?",
        options: ["Rate = k[NO]²[O₂]", "Rate = k[NO]²", "Rate = k[NO][O₂]", "Rate = k[NO]⁴"],
        answer: "Rate = k[NO]²",
        explanation: "2² = 4 (2nd order in NO) and 2⁰ = 1 (0th order in O₂ — drops out!) → Rate = k[NO]²!"
      }
    },
    {
      id: "trap-30",
      title: "Trap #30 (CHEM2): Forgetting van 't Hoff Factor (i) in Colligative Math!",
      trapExpression: "1 m NaCl & 1 m Sugar freeze at the same temp??",
      wrongGuess: "Using ΔT_f = K_f · m without multiplying by i!",
      rightAnswer: "ΔT_f = i · K_f · m → NaCl (i = 2) drops FP TWICE as much as sugar (i = 1)!",
      whyItHappens: "Students plug molality straight into K_f · m and forget that ionic electrolytes dissociate into multiple dissolved ions.",
      quickRule: "Always check Ionic vs Molecular FIRST: sugar/urea → i = 1; NaCl → i = 2; CaCl₂ → i = 3!",
      quiz: {
        prompt: "Which 0.5 m solution has the HIGHEST boiling point elevation ΔT_b?",
        options: ["0.5 m Glucose (i=1)", "0.5 m KBr (i=2)", "0.5 m AlCl₃ (i=4)", "Pure water"],
        answer: "0.5 m AlCl₃ (i=4)",
        explanation: "AlCl₃ splits into 4 ions (1 Al³⁺ + 3 Cl⁻), giving the largest effective particle concentration (4 × 0.5 = 2.0 m)!"
      }
    },
    {
      id: "trap-31",
      title: "Trap #31 (CHEM2): Gibbs ΔG Unit Crash (kJ vs J/K)!",
      trapExpression: "ΔG = 40 kJ − (300 K)(100 J/K) = −29,960 kJ??",
      wrongGuess: "Subtracting J/K directly from kJ without dividing ΔS by 1,000!",
      rightAnswer: "Convert ΔS = 100 J/K = 0.100 kJ/K first → 40 − 300(0.1) = +10 kJ!",
      whyItHappens: "Reference tables ALWAYS print ΔH in kJ/mol and ΔS in J/(mol·K) — a classic 1,000× exam trap!",
      quickRule: "Before computing ΔG = ΔH − TΔS, ALWAYS divide ΔS by 1,000 (to kJ/K) and convert T to Kelvin!",
      quiz: {
        prompt: "Given ΔH = +50 kJ, ΔS = +200 J/K, and T = 300 K, what is ΔG in kJ?",
        options: ["−59,950 kJ", "−10 kJ", "+10 kJ", "+110 kJ"],
        answer: "−10 kJ",
        explanation: "Convert ΔS = 200 J/K = 0.200 kJ/K first, then ΔG = 50 − (300)(0.200) = 50 − 60 = −10 kJ!"
      }
    },
    {
      id: "trap-32",
      title: "Trap #32 (WICA): Job Sharing ≠ Work Sharing!",
      trapExpression: "Company cuts everyone's hours to prevent layoffs = Job Sharing??",
      wrongGuess: "Calling layoff-prevention hour cuts 'Job Sharing'!",
      rightAnswer: "That's WORK SHARING! Job Sharing = 2 people voluntarily split 1 full-time role!",
      whyItHappens: "Both terms look almost identical on WICA HO3 exams — mixing them up costs easy points.",
      quickRule: "JOB Sharing = 2 partners split ONE job (prorated pay). WORK Sharing = company-wide reduced hours to avoid mass layoffs!",
      quiz: {
        prompt: "Two parents voluntarily split ONE full-time graphic designer role (each working half-week for prorated pay). This is:",
        options: ["Job Sharing", "Work Sharing", "Forced Leave", "Broken-Time Schedule"],
        answer: "Job Sharing",
        explanation: "Two people splitting ONE full-time role with prorated pay = Job Sharing (whereas Work Sharing cuts hours across staff to prevent layoffs)!"
      }
    }
  );

  // ==================== +4 NEW DIAGNOSTIC QUESTIONS (17–20) ====================
  DATA.DIAGNOSTIC_QUESTIONS.push(
    {
      id: "diag_17",
      eraId: "physics",
      targetNodeId: "phys2-capacitors-dielectrics",
      topicLabel: "PHYS2 Capacitors",
      prompt: "Two capacitors (6 μF and 12 μF) are connected in SERIES. What is their equivalent capacitance?",
      options: ["18 μF", "4 μF", "9 μF", "72 μF"],
      answer: "4 μF",
      whyItMatters: "Capacitors invert Resistor rules: Series uses 1/C_S = 1/6 + 1/12 = 3/12 → 4 μF!"
    },
    {
      id: "diag_18",
      eraId: "chemistry",
      targetNodeId: "chem2-thermo-entropy-gibbs",
      topicLabel: "CHEM2 Gibbs & Entropy",
      prompt: "A reaction has ΔH = +40 kJ and ΔS = +100 J/K (+0.1 kJ/K) at T = 500 K. Find ΔG and spontaneity:",
      options: ["ΔG = −10 kJ (Spontaneous)", "ΔG = +10 kJ (Non-spontaneous)", "ΔG = −49,960 kJ", "ΔG = +90 kJ"],
      answer: "ΔG = −10 kJ (Spontaneous)",
      whyItMatters: "Convert ΔS to kJ/K first (÷1000), then ΔG = 40 − 500(0.1) = −10 kJ < 0!"
    },
    {
      id: "diag_19",
      eraId: "biology",
      targetNodeId: "bio2-recombinant-dna",
      topicLabel: "BIO2 Recombinant DNA",
      prompt: "Which enzyme acts as 'molecular glue' to seal a human gene into a cut bacterial plasmid?",
      options: ["Restriction enzyme", "DNA ligase", "Pepsin", "ATP synthase"],
      answer: "DNA ligase",
      whyItMatters: "Restriction enzymes cut DNA; DNA ligase seals the spliced recombinant plasmid!"
    },
    {
      id: "diag_20",
      eraId: "wica",
      targetNodeId: "wica-jobs-resume-interview",
      topicLabel: "WICA Career Readiness",
      prompt: "Which Philippine agency issues your TIN (Tax Identification Number), and which method structures behavioral interview stories?",
      options: ["BIR & STAR Method", "PSA & FITT Method", "NBI & LIATE Method", "SSS & PEMDAS"],
      answer: "BIR & STAR Method",
      whyItMatters: "BIR issues TIN IDs, and STAR (Situation, Task, Action, Result) aces interviews!"
    }
  );

  // ==================== +4 NEW SYNTHESIS BOSSES (13–16) ====================
  DATA.SYNTHESIS_PROBLEMS.push(
    {
      id: "synth_13",
      subject: "PHYS2",
      title: "Mixed DC Network + Power Boss (HO6)",
      concepts: ["Parallel/Series Reduction", "Ohm's Law", "Power P = IV"],
      prompt: "An 18 V battery connects in series with R₁ = 4 Ω and a parallel branch (6 Ω ∥ 3 Ω). What is the TOTAL Power (Watts) delivered by the battery?",
      options: ["27 W", "54 W", "108 W", "18 W"],
      answer: "54 W",
      trapWarning: "Do NOT add 4 + 6 + 3 = 13 Ω! Collapse the parallel 6 Ω ∥ 3 Ω branch first!",
      stepsChain: [
        "Step 1 (Parallel Branch): 1/R_p = 1/6 + 1/3 = 3/6 → R_p = 2 Ω.",
        "Step 2 (Series Total): R_eq = 4 Ω + 2 Ω = 6 Ω.",
        "Step 3 (Current): I = V / R_eq = 18 V / 6 Ω = 3 A.",
        "Step 4 (Power): P = I · V = 3 A × 18 V = 54 W!"
      ]
    },
    {
      id: "synth_14",
      subject: "PHYS2",
      title: "Series Capacitors + Stored Defibrillator Energy (HO3 + HO4)",
      concepts: ["Series Capacitors", "Stored Energy U = ½CV²", "Unit Conversion μF"],
      prompt: "Two 8 μF capacitors are wired in SERIES across a 100 V power supply. How much total Energy U (in Joules) is stored in the combination?",
      options: ["0.02 J", "0.04 J", "0.08 J", "400 J"],
      answer: "0.02 J",
      trapWarning: "Two equal 8 μF capacitors in SERIES HALVE to 4 μF (NOT 16 μF!) — and remember the ½ in ½CV²!",
      stepsChain: [
        "Step 1 (Series C): 1/C_S = 1/8 + 1/8 = 2/8 → C_S = 4 μF = 4 × 10⁻⁶ F.",
        "Step 2 (Square Voltage): V² = 100² = 10,000 V².",
        "Step 3 (Energy): U = ½ · C_S · V² = ½(4 × 10⁻⁶)(10⁴) = 2 × 10⁻² = 0.02 J!"
      ]
    },
    {
      id: "synth_15",
      subject: "CHEM2",
      title: "Grams → Molality → Freezing Point Depression (L6 + L8)",
      concepts: ["Moles n = g/MM", "Molality (kg solvent)", "Colligative ΔT_f = iK_f m"],
      prompt: "Dissolve 58.5 g of NaCl (58.5 g/mol, i = 2) into 500 g of pure water (K_f = 1.86 °C/m). What is the new Freezing Point of the water?",
      options: ["−1.86 °C", "−3.72 °C", "−7.44 °C", "+7.44 °C"],
      answer: "−7.44 °C",
      trapWarning: "Three chained traps: convert 500 g → 0.5 kg solvent, multiply by i = 2 for NaCl, AND subtract from 0°C!",
      stepsChain: [
        "Step 1 (Moles): n = 58.5 g / 58.5 g/mol = 1.0 mol NaCl.",
        "Step 2 (Molality): m = 1.0 mol / 0.5 kg water = 2.0 m.",
        "Step 3 (Freezing Drop): ΔT_f = i · K_f · m = 2 × 1.86 × 2.0 = 7.44 °C.",
        "Step 4 (New FP): 0°C − 7.44°C = −7.44 °C!"
      ]
    },
    {
      id: "synth_16",
      subject: "CHEM2",
      title: "Gibbs Spontaneity Crossover Temperature (L11 + L12)",
      concepts: ["Unit Conversion kJ vs J", "ΔG = ΔH − TΔS", "Celsius ↔ Kelvin"],
      prompt: "A reaction has ΔH = +60 kJ and ΔS = +150 J/K. Above what Celsius temperature (°C) does it become spontaneous (ΔG < 0)?",
      options: ["400 °C", "127 °C", "273 °C", "27 °C"],
      answer: "127 °C",
      trapWarning: "T = ΔH / ΔS gives KELVIN (400 K) — don't forget to subtract 273 to convert to °C!",
      stepsChain: [
        "Step 1 (Match Units): ΔS = 150 J/K = 0.15 kJ/K.",
        "Step 2 (Set ΔG = 0): T = ΔH / ΔS = 60 / 0.15 = 400 K.",
        "Step 3 (Convert to °C): 400 K − 273 = 127 °C!"
      ]
    }
  );

  // ==================== +12 NEW FORMULA CARDS IN MEMORIZE VAULT (TOTAL: 24) ====================
  DATA.MEMORIZE_DATA.scienceFormulas.push(
    { subject: "Coulomb's Law (PHYS2)", eq: "F = k|q₁q₂| / r²", meaning: "k = 9×10⁹ N·m²/C²; convert μC→10⁻⁶ C & cm→m!" },
    { subject: "Electric Potential (PHYS2)", eq: "V = kq / r = U / q₀", meaning: "Scalar Volts (J/C) — linear 1/r, NOT 1/r²!" },
    { subject: "Capacitors & Energy", eq: "C = Q/V,  U = ½CV²", meaning: "Parallel ADDS (C₁+C₂); Series 1/C_S; Dielectric K = C/C₀ = V₀/V!" },
    { subject: "Resistivity & Temp", eq: "R = ρL/A,  R_T = R₀[1+αΔT]", meaning: "Metals α > 0 (hot = higher R); Carbon α < 0 (hot = lower R)!" },
    { subject: "Kirchhoff & RC", eq: "ΣI_in = ΣI_out,  ΣV = 0,  τ = RC", meaning: "KCL = Charge conserved; KVL = Energy conserved around any loop!" },
    { subject: "Lorentz & Cyclotron", eq: "F = |q|vB sin φ,  R = mv/(qB)", meaning: "Magnetic force does ZERO work! Period τ = 2πm/(qB) ignores v!" },
    { subject: "Wire, Loop & Solenoid", eq: "Wire μ₀I/2πr | Loop μ₀NI/2R | Sol μ₀nI", meaning: "Same parallel I ATTRACTS! Loop has NO π! Biot-Savart: μ₀/4π." },
    { subject: "Molality & Dilution", eq: "m = mol / kg solvent,  M₁V₁ = M₂V₂", meaning: "Molality is temp-independent; Gas solubility S = k_H·P (Henry)!" },
    { subject: "Colligative Shifts", eq: "ΔT_b = iK_b m,  ΔT_f = iK_f m,  Π = iMRT", meaning: "Count ions via i (sugar=1, NaCl=2, CaCl₂=3)! BP ↑, FP ↓!" },
    { subject: "1st-Order Half-Life", eq: "t_(1/2) = 0.693 / k", meaning: "Constant half-life! Rate Law exponents come ONLY from experiments!" },
    { subject: "Gibbs Free Energy", eq: "ΔG = ΔH − TΔS", meaning: "ΔG < 0 = Spontaneous! Divide ΔS (J/K) by 1,000 to match kJ & K!" },
    { subject: "Compound & Rule of 72", eq: "F = P(1 + r/m)^(mt),  t_double ≈ 72/r%", meaning: "Compounding builds wealth early & punishes high-APR credit debt!" }
  );

  // ==================== +3 NEW BADGES (TOTAL: 18) ====================
  DATA.BADGES.push(
    {
      id: "phys2_em_master",
      emoji: "🧲",
      title: "PHYS2 Electromagnetism Ace",
      description: "Master at least 4 of the 6 PHYS2 E&M lessons (Coulomb to Biot-Savart).",
      check: (st) => {
        const ids = [
          "phys2-coulomb-electric-field",
          "phys2-electric-potential",
          "phys2-capacitors-dielectrics",
          "phys2-resistivity-ohms-dc",
          "phys2-kirchhoff-circuits",
          "phys2-magnetism-lorentz-sources"
        ];
        return ids.filter((id) => (st.nodeMastery[id] || 0) >= 1).length >= 4;
      }
    },
    {
      id: "shs_stem_scholar",
      emoji: "🏛️",
      title: "SHS Grade 12 STEM Scholar",
      description: "Master at least 2 PHYS2, 2 CHEM2, and 2 BIO2 handout lessons.",
      check: (st) => {
        const count = (prefix) =>
          DATA.NODES.filter((n) => n.id.startsWith(prefix) && (st.nodeMastery[n.id] || 0) >= 1).length;
        return count("phys2-") >= 2 && count("chem2-") >= 2 && count("bio2-") >= 2;
      }
    },
    {
      id: "career_ready_pro",
      emoji: "💼",
      title: "Future-Ready Graduate",
      description: "Master at least 4 lessons across WICA, PersDev, and Wellness.",
      check: (st) => {
        const count = DATA.NODES.filter(
          (n) => (n.worldId === "wica" || n.worldId === "persdev" || n.worldId === "wellness") && (st.nodeMastery[n.id] || 0) >= 1
        ).length;
        return count >= 4;
      }
    }
  );

  // ==================== PROCEDURAL GENERATORS FOR ALL 32 NEW NODES ====================
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function makeUniqueOpts(correct, distractors) {
    const set = [String(correct)];
    for (const d of distractors) {
      const s = String(d);
      if (!set.includes(s)) set.push(s);
      if (set.length === 4) break;
    }
    let bump = 1;
    while (set.length < 4) {
      const candidate = `${correct} (alt ${bump++})`;
      if (!set.includes(candidate)) set.push(candidate);
    }
    for (let i = set.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = set[i];
      set[i] = set[j];
      set[j] = tmp;
    }
    return set;
  }

  const prevGen = DATA.generateProceduralQuestion;
  DATA.generateProceduralQuestion = function (nodeId) {
    switch (nodeId) {
      case "phys2-coulomb-electric-field": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const q1 = randInt(2, 6);
          const q2 = randInt(1, 5);
          const rCm = 3; // r^2 = 9e-4 cancels k=9e9 cleanly!
          const ans = q1 * q2 * 10;
          return {
            type: "mc",
            prompt: `Coulomb's Law: q₁ = ${q1} μC and q₂ = ${q2} μC sit ${rCm} cm apart (k = 9×10⁹). Force F?`,
            options: makeUniqueOpts(`${ans} N`, [`${ans / 10} N`, `${ans * 3} N`, `${q1 + q2} N`]),
            answer: `${ans} N`,
            hint: "r = 0.03 m → r² = 9×10⁻⁴ cancels the 9 in k = 9×10⁹, leaving q₁·q₂·10!",
            whyEasy: `(9×10⁹)(${q1}×10⁻⁶)(${q2}×10⁻⁶) ÷ (9×10⁻⁴) = ${ans} N!`
          };
        }
        if (mode === 1) {
          const mult = pick([2, 3, 4]);
          const ans = `1/${mult * mult} as strong`;
          return {
            type: "mc",
            prompt: `If the distance r between two point charges increases by ${mult}×, the electric force becomes:`,
            options: makeUniqueOpts(ans, [`1/${mult} as strong`, `${mult * mult}× stronger`, `${mult}× stronger`]),
            answer: ans,
            hint: "Coulomb's Law follows the inverse-square law (1/r²)!",
            whyEasy: `1 / (${mult})² = 1/${mult * mult} of the original force!`
          };
        }
        const f = pick([2, 4, 5, 8]);
        const qExp = pick([6, 7, 8]);
        const ans = `${f} × 10^${qExp} N/C`;
        return {
          type: "mc",
          prompt: `Test charge q = 10⁻${qExp} C experiences F = ${f} N. Electric field E = F / q?`,
          options: makeUniqueOpts(ans, [`${f} × 10^-${qExp} N/C`, `${f * 10} × 10^${qExp} N/C`, `${f} N/C`]),
          answer: ans,
          hint: `Dividing by 10⁻${qExp} multiplies by 10^${qExp}!`,
          whyEasy: `E = ${f} / 10⁻${qExp} = ${ans}!`
        };
      }

      case "phys2-electric-potential": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const q = randInt(2, 8);
          const v = randInt(5, 20);
          const u = q * v;
          return {
            type: "mc",
            prompt: `Moving q = ${q} C through ΔV = ${v} V changes electric potential energy (ΔU = q·ΔV) by:`,
            options: makeUniqueOpts(`${u} J`, [`${v + q} J`, `${Math.max(1, Math.round(v / q))} J`, `${u * 2} J`]),
            answer: `${u} J`,
            hint: "1 Volt = 1 Joule per Coulomb → ΔU = q × ΔV!",
            whyEasy: `${q} C × ${v} J/C = ${u} Joules!`
          };
        }
        const factor = pick([2, 3, 4]);
        const v0 = pick([12, 24, 36]);
        const ans = `${v0 * factor} V`;
        return {
          type: "mc",
          prompt: `Point charge voltage is ${v0} V at distance r. Move ${factor}× CLOSER (to r/${factor}). New Voltage V?`,
          options: makeUniqueOpts(ans, [`${v0 * factor * factor} V`, `${v0 / factor} V`, `${v0 + factor} V`]),
          answer: ans,
          hint: "V = kq / r scales as 1/r (NOT 1/r²!)!",
          whyEasy: `Cutting r by ${factor}× multiplies V by ${factor}× → ${ans}!`
        };
      }

      case "phys2-capacitors-dielectrics": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const pair = pick([[6, 12, 4], [6, 3, 2], [10, 10, 5], [12, 4, 3], [8, 8, 4]]);
          return {
            type: "mc",
            prompt: `Capacitors C₁ = ${pair[0]} μF and C₂ = ${pair[1]} μF are in SERIES. Equivalent C_S?`,
            options: makeUniqueOpts(`${pair[2]} μF`, [`${pair[0] + pair[1]} μF`, `${pair[2] * 2} μF`, `1/${pair[2]} μF`]),
            answer: `${pair[2]} μF`,
            hint: "Series capacitors use product ÷ sum = (C₁·C₂)/(C₁ + C₂)!",
            whyEasy: `(${pair[0]}×${pair[1]}) ÷ (${pair[0]}+${pair[1]}) = ${pair[2]} μF (always smaller than smallest)!`
          };
        }
        if (mode === 1) {
          const c = pick([2, 4, 6, 8]);
          const v = pick([10, 20]);
          const u = 0.5 * c * v * v;
          return {
            type: "mc",
            prompt: `A ${c} F supercapacitor is charged to ${v} V. Stored energy U = ½CV²?`,
            options: makeUniqueOpts(`${u} J`, [`${u * 2} J`, `${c * v} J`, `${u / 2} J`]),
            answer: `${u} J`,
            hint: "Square V first, multiply by C, then divide by 2!",
            whyEasy: `½(${c})(${v}²) = ${u} J!`
          };
        }
        const k = randInt(2, 6);
        const v0 = k * randInt(10, 20);
        const v = v0 / k;
        return {
          type: "mc",
          prompt: `Inserting a dielectric drops an isolated capacitor's voltage from ${v0} V to ${v} V. Dielectric constant K?`,
          options: makeUniqueOpts(`${k}`, [`1/${k}`, `${v0 - v}`, `${k * 2}`]),
          answer: `${k}`,
          hint: "K = V₀ / V (initial over final, dimensionless ≥ 1)!",
          whyEasy: `K = ${v0} ÷ ${v} = ${k}!`
        };
      }

      case "phys2-resistivity-ohms-dc": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const pair = pick([[6, 3, 2], [4, 4, 2], [12, 4, 3], [6, 6, 3]]);
          const r1 = randInt(2, 6);
          const req = r1 + pair[2];
          return {
            type: "mc",
            prompt: `DC Network: R₁ = ${r1} Ω in series with parallel (${pair[0]} Ω ∥ ${pair[1]} Ω). Total R_eq?`,
            options: makeUniqueOpts(`${req} Ω`, [`${r1 + pair[0] + pair[1]} Ω`, `${pair[2]} Ω`, `${req + 2} Ω`]),
            answer: `${req} Ω`,
            hint: `Collapse parallel first (${pair[0]} ∥ ${pair[1]} = ${pair[2]} Ω), then add series ${r1} Ω!`,
            whyEasy: `${pair[2]} Ω + ${r1} Ω = ${req} Ω!`
          };
        }
        const lMult = pick([2, 3, 4]);
        const aMult = pick([1, 2]);
        const ratio = lMult / aMult;
        const ans = ratio === 1 ? "Stays the same (1×)" : `${ratio}× original R`;
        return {
          type: "mc",
          prompt: `A wire's length L becomes ${lMult}× longer and its area A becomes ${aMult}× wider. New resistance R = ρL/A?`,
          options: makeUniqueOpts(ans, [`${lMult * aMult}× original R`, `1/${lMult}× original R`, `${lMult + aMult}× original R`]),
          answer: ans,
          hint: "Plug factors into R = ρ(L)/(A) → ratio = L_factor ÷ A_factor!",
          whyEasy: `${lMult} ÷ ${aMult} = ${ratio}×!`
        };
      }

      case "phys2-kirchhoff-circuits": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const i1 = randInt(3, 9);
          const i2 = randInt(2, 7);
          const out1 = randInt(2, i1);
          const ans = i1 + i2 - out1;
          return {
            type: "mc",
            prompt: `KCL Node: ${i1} mA and ${i2} mA enter a junction; ${out1} mA and unknown i leave. Find i:`,
            options: makeUniqueOpts(`${ans} mA`, [`${i1 + i2 + out1} mA`, `${Math.abs(i1 - i2)} mA`, `${ans + 2} mA`]),
            answer: `${ans} mA`,
            hint: "Total IN = Total OUT!",
            whyEasy: `${i1} + ${i2} = ${out1} + i → i = ${ans} mA!`
          };
        }
        const vs = pick([12, 20, 24, 30]);
        const v1 = randInt(3, Math.floor(vs / 3));
        const v2 = randInt(3, Math.floor(vs / 3));
        const v3 = vs - v1 - v2;
        return {
          type: "mc",
          prompt: `KVL Loop: A ${vs} V battery drives 3 series resistors. Drops across R₁ and R₂ are ${v1} V and ${v2} V. Drop across R₃?`,
          options: makeUniqueOpts(`${v3} V`, [`${vs + v1} V`, `${v1 + v2} V`, `${v3 + 3} V`]),
          answer: `${v3} V`,
          hint: "Loop drops must sum cleanly to battery rise!",
          whyEasy: `${vs} − (${v1} + ${v2}) = ${v3} V!`
        };
      }

      case "phys2-magnetism-lorentz-sources": {
        const bank = [
          { prompt: "A proton moves PARALLEL (φ = 0°) to a 5 T magnetic field. Magnetic force F = |q|vB sin φ?", ans: "0 N (Zero!)", d: ["5 N", "Maximum force", "Perpendicular 10 N"], hint: "Check sin(0°)!", why: "sin(0°) = 0 → charges moving along B feel zero magnetic force!" },
          { prompt: "Two parallel wires carry current in OPPOSITE directions. Their mutual magnetic force is:", ans: "Repulsive (push apart)", d: ["Attractive (pull together)", "Zero", "Always upward"], hint: "Same direction attracts; opposite direction...?", why: "Opposite parallel currents repel each other!" },
          { prompt: "Inside a uniform magnetic field, a particle moves 3× FASTER. Its cyclotron orbit radius R = mv/(qB) and period τ = 2πm/(qB):", ans: "R triples (3×), Period τ stays UNCHANGED", d: ["Both R and τ triple", "R shrinks to 1/3", "τ triples while R stays fixed"], hint: "Notice v is in R, NOT in τ!", why: "3× speed makes a 3× larger circle completed in the exact same period τ!" },
          { prompt: "Convert B = 200 Gauss (G) into Tesla (T), given 1 G = 10⁻⁴ T:", ans: "0.02 T", d: ["2,000,000 T", "2.0 T", "0.0002 T"], hint: "Multiply 200 × 10⁻⁴!", whyEasy: "200 × 10⁻⁴ = 2 × 10⁻² = 0.02 T!" },
          { prompt: "Double the current I inside a long solenoid (B = μ₀nI). Its interior magnetic field B:", ans: "Doubles (2×)", d: ["Quadruples (4×)", "Halves", "Stays constant"], hint: "B is directly proportional to I!", why: "B = μ₀nI scales linearly with current I!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why || b.whyEasy };
      }

      case "chem2-organic-polymers": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const n = randInt(3, 8);
          const kind = pick([
            { name: "ALKANE (single bonds)", h: 2 * n + 2, rule: "2n + 2" },
            { name: "ALKENE (1 double bond)", h: 2 * n, rule: "2n" },
            { name: "ALKYNE (1 triple bond)", h: 2 * n - 2, rule: "2n − 2" }
          ]);
          return {
            type: "mc",
            prompt: `How many Hydrogen atoms are in a ${n}-carbon ${kind.name}?`,
            options: makeUniqueOpts(`${kind.h}`, [`${2 * n + 4}`, `${kind.h + 2}`, `${Math.max(2, kind.h - 2)}`]),
            answer: `${kind.h}`,
            hint: `Use the formula H = ${kind.rule} with n = ${n}!`,
            whyEasy: `Plugging n = ${n} into ${kind.rule} gives ${kind.h} Hydrogens!`
          };
        }
        const fg = pick([
          { g: "−OH", ans: "Alcohol", d: ["Carboxylic Acid", "Alkyne", "Amine"] },
          { g: "−COOH", ans: "Carboxylic Acid", d: ["Alcohol", "Ketone", "Alkane"] },
          { g: "−COO− (fruity aroma)", ans: "Ester", d: ["Alkene", "Amine", "Alcohol"] },
          { g: "−NH₂", ans: "Amine", d: ["Ester", "Aldehyde", "Alkane"] }
        ]);
        return {
          type: "mc",
          prompt: `Identify the organic functional group: ${fg.g}`,
          options: makeUniqueOpts(fg.ans, fg.d),
          answer: fg.ans,
          hint: "Match the signature bonded atoms to its functional family!",
          whyEasy: `${fg.g} is the defining signature of an ${fg.ans}!`
        };
      }

      case "chem2-imf-phases": {
        const bank = [
          { prompt: "Which substance has the STRONGEST intermolecular forces among CH₄, HCl, and NH₃?", ans: "NH₃ (Hydrogen Bonding: H–N)", d: ["CH₄ (nonpolar LDF)", "HCl (dipole-dipole only)", "All three tie"], hint: "Look for H bonded directly to F, O, or N ('H-FON')!", why: "NH₃ forms Hydrogen Bonds (H–N), beating plain dipole-dipole (HCl) and LDF (CH₄)!" },
          { prompt: "As intermolecular forces get STRONGER, what happens to a liquid's Vapor Pressure?", ans: "Decreases (harder for molecules to escape!)", d: ["Increases sharply", "Stays unchanged", "Equals boiling point"], hint: "Sticky molecules prefer staying in the liquid!", why: "Stronger IMFs trap molecules → lower vapor pressure & higher boiling point!" },
          { prompt: "During the flat horizontal melting plateau on a heating curve, added heat energy is spent:", ans: "Breaking intermolecular forces (ΔT = 0)", d: ["Raising temperature rapidly", "Creating new protons", "Turning molecules into atoms"], hint: "Temperature stays flat while the crystal lattice loosens!", why: "Latent heat of fusion breaks IMFs without raising kinetic temperature!" },
          { prompt: "Between nonpolar F₂ (38 g/mol) and I₂ (254 g/mol), why is I₂ a solid while F₂ is a gas at room temp?", ans: "I₂ has a much larger electron cloud → stronger London Dispersion Forces!", d: ["I₂ forms hydrogen bonds", "I₂ is ionic", "F₂ has zero electrons"], hint: "Bigger molar mass & more electrons = stronger LDF!", why: "Larger polarizable electron clouds give I₂ much stronger LDF!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "chem2-solutions-concentration": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const m1 = pick([4, 6, 8, 10]);
          const m2 = m1 / 2;
          const v2 = pick([100, 200, 300, 400]);
          const v1 = (m2 * v2) / m1;
          return {
            type: "mc",
            prompt: `Dilution (M₁V₁ = M₂V₂): How many mL of ${m1} M stock make ${v2} mL of ${m2} M solution?`,
            options: makeUniqueOpts(`${v1} mL`, [`${v2} mL`, `${v1 / 2} mL`, `${v2 * 2} mL`]),
            answer: `${v1} mL`,
            hint: `Solve (${m1})·V₁ = (${m2})(${v2})!`,
            whyEasy: `Halving concentration means taking half the final volume: ${v1} mL!`
          };
        }
        const mol = pick([1, 2, 3, 4]);
        const kg = pick([0.5, 2]);
        const m = mol / kg;
        return {
          type: "mc",
          prompt: `Dissolve ${mol} mol of solute in ${kg * 1000} g (${kg} kg) of water. Molality (m = mol/kg solvent)?`,
          options: makeUniqueOpts(`${m} m`, [`${mol * kg} m`, `${m + 1} m`, `${mol / 1000} m`]),
          answer: `${m} m`,
          hint: "Divide moles of solute by kilograms of SOLVENT!",
          whyEasy: `${mol} mol ÷ ${kg} kg = ${m} m!`
        };
      }

      case "chem2-colligative-properties": {
        const salts = [
          { name: "Glucose (C₆H₁₂O₆)", i: 1 },
          { name: "NaCl", i: 2 },
          { name: "CaCl₂", i: 3 },
          { name: "AlCl₃", i: 4 }
        ];
        const s = pick(salts);
        const m = pick([1, 2]);
        const kf = 1.86;
        const dt = (s.i * kf * m).toFixed(2);
        return {
          type: "mc",
          prompt: `Find freezing point depression ΔT_f = i·K_f·m for ${m}.0 m ${s.name} (i = ${s.i}, K_f = 1.86 °C/m):`,
          options: makeUniqueOpts(`${dt} °C`, [`${(kf * m).toFixed(2)} °C`, `${(s.i * kf * (m + 1)).toFixed(2)} °C`, `${(kf / s.i).toFixed(2)} °C`]),
          answer: `${dt} °C`,
          hint: `Multiply i (${s.i}) × K_f (1.86) × m (${m})!`,
          whyEasy: `${s.i} × 1.86 × ${m} = ${dt} °C drop (freezing point = −${dt} °C)!`
        };
      }

      case "chem2-kinetics-ratelaw": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const order = pick([0, 1, 2]);
          const mult = Math.pow(2, order);
          const ans = `${order === 0 ? "0th" : order === 1 ? "1st" : "2nd"} order`;
          return {
            type: "mc",
            prompt: `Doubling [X] changes the reaction rate by a factor of ${mult}×. What is the order in X?`,
            options: makeUniqueOpts(ans, ["0th order", "1st order", "2nd order", "3rd order"]),
            answer: ans,
            hint: `Solve 2^m = ${mult}!`,
            whyEasy: `2^${order} = ${mult} → ${ans}!`
          };
        }
        const start = pick([40, 80, 160]);
        const hl = pick([2, 3]);
        const rem = start / Math.pow(2, hl);
        return {
          type: "mc",
          prompt: `A 1st-order sample starts at ${start} g. How many grams remain after ${hl} half-lives?`,
          options: makeUniqueOpts(`${rem} g`, [`${start / hl} g`, `${rem * 2} g`, `${rem / 2} g`]),
          answer: `${rem} g`,
          hint: `Cut ${start} g in half ${hl} consecutive times!`,
          whyEasy: `${start} ÷ 2^${hl} = ${rem} g!`
        };
      }

      case "chem2-thermo-entropy-gibbs": {
        const dh = pick([-40, 40, 60, -20]);
        const dsJ = pick([100, 200, -100]);
        const t = pick([300, 400, 500]);
        const dg = Math.round(dh - t * (dsJ / 1000));
        return {
          type: "mc",
          prompt: `Compute ΔG = ΔH − TΔS (kJ): ΔH = ${dh} kJ, ΔS = ${dsJ} J/K, T = ${t} K.`,
          options: makeUniqueOpts(`${dg} kJ`, [`${dh - t * dsJ} kJ`, `${dg + 30} kJ`, `${-dg === dg ? dg + 10 : -dg} kJ`]),
          answer: `${dg} kJ`,
          hint: `First convert ΔS = ${dsJ} J/K → ${dsJ / 1000} kJ/K, then compute ${dh} − (${t})(${dsJ / 1000})!`,
          whyEasy: `${dh} − ${t * (dsJ / 1000)} = ${dg} kJ (${dg < 0 ? "Spontaneous!" : "Non-spontaneous!"})!`
        };
      }

      case "bio2-recombinant-dna": {
        const bank = [
          { prompt: "Which tool cuts DNA at specific palindromic sites to leave sticky ends?", ans: "Restriction enzyme", d: ["DNA ligase", "Ribosome", "Insulin"], hint: "Molecular scissors!", why: "Restriction endonucleases slice DNA cleanly at target sequences!" },
          { prompt: "Which enzyme seals spliced human DNA into a bacterial plasmid?", ans: "DNA ligase", d: ["Restriction enzyme", "Taq polymerase", "Amylase"], hint: "Molecular glue!", why: "DNA ligase welds sugar-phosphate backbones together!" },
          { prompt: "In PCR, what does the 95°C Denaturation step do?", ans: "Unzips double-stranded DNA into single strands", d: ["Glues primers shut", "Builds amino acids", "Freezes Taq polymerase"], hint: "High heat breaks hydrogen bonds between base pairs!", why: "Denaturing separates the two strands so primers can bind!" },
          { prompt: "In Gel Electrophoresis, a 200 bp band vs a 2,000 bp band: which travels farther toward (+)?", ans: "The smaller 200 bp fragment", d: ["The heavier 2,000 bp fragment", "Both stop at the well", "Neither moves"], hint: "Smaller pieces weave through the gel faster!", why: "Smaller DNA fragments face less drag and run farthest!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "bio2-evolution-mechanisms": {
        const bank = [
          { prompt: "A few birds blow onto a new island and start a population with rare beak colors. This random shift is:", ans: "Founder Effect (Genetic Drift)", d: ["Gene Flow", "Artificial Selection", "Lamarckism"], hint: "A tiny splinter group 'founds' a brand-new colony!", why: "Founder Effect is Genetic Drift driven by a small colonizing sample!" },
          { prompt: "Human arms, cat legs, and bat wings share the same ancestral bone layout. These are:", ans: "Homologous structures", d: ["Analogous structures", "Vestigial organs", "Acquired muscles"], hint: "Same evolutionary origin → Divergent evolution!", why: "Homologous traits inherit one common vertebrate blueprint!" },
          { prompt: "Whale pelvic hip bones serve no walking function today but point to four-legged ancestors. They are:", ans: "Vestigial structures", d: ["Analogous structures", "Speciation barriers", "Mutations"], hint: "Shrunken evolutionary leftovers!", why: "Vestigial organs are reduced remnants of functional ancestral structures!" },
          { prompt: "Which evolutionary mechanism is the ONLY one that consistently produces adaptation to an environment?", ans: "Natural Selection", d: ["Genetic Drift", "Random Mutation alone", "Gene Flow"], hint: "Non-random survival of best-fitted variants!", why: "Unlike random drift or mutation, Natural Selection systematically favors adaptive traits!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "bio2-taxonomy-cladistics": {
        const bank = [
          { prompt: "Identify the properly formatted binomial scientific name for the domestic dog:", ans: "Canis familiaris (italicized)", d: ["canis Familiaris", "Canis Familiaris", "CANIS FAMILIARIS"], hint: "Genus capitalized, epithet lowercase, both italicized!", why: "Linnaean rule: Genus capitalized + lowercase specific epithet!" },
          { prompt: "Which 3 Domains sit at the very top of modern biological classification?", ans: "Bacteria, Archaea, Eukarya", d: ["Plants, Animals, Fungi", "Prokaryotes, Viruses, Cells", "Monera, Protista, Animalia"], hint: "Two prokaryotic domains + one eukaryotic domain!", why: "Woese's 3-Domain system splits prokaryotes into Bacteria & Archaea plus Eukarya!" },
          { prompt: "On a phylogenetic cladogram, a branching point (node) represents:", ans: "The most recent common ancestor of the branches above it", d: ["An extinct unrelated rock", "Body size rank", "Alphabetical grouping"], hint: "Every fork is a shared ancestral population!", why: "Nodes map common ancestry — closer shared nodes mean closer evolutionary cousins!" },
          { prompt: "A newly evolved trait shared by all members of a clade (like feathers in birds) is called a:", ans: "Derived character (synapomorphy)", d: ["Vestigial error", "Analogous accident", "Binomial key"], hint: "Marks a branching split on a cladogram!", why: "Shared derived characters define monophyletic clades!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "bio2-plant-animal-systems": {
        const bank = [
          { prompt: "Which plant hormone makes stems bend toward sunlight by elongating cells on the shaded side?", ans: "Auxin", d: ["Ethylene", "Abscisic acid", "Insulin"], hint: "Drives positive phototropism!", why: "Auxin concentrates on the dark side, stretching those cells so the stem bends toward light!" },
          { prompt: "Which gaseous hormone triggers rapid fruit ripening in bananas and mangoes?", ans: "Ethylene", d: ["Auxin", "Glucagon", "Xylem"], hint: "The gaseous ripening signal!", why: "Ethylene gas accelerates ripening across nearby fruits!" },
          { prompt: "Oxytocin intensifying uterine contractions until childbirth completes is an example of:", ans: "Positive feedback", d: ["Negative feedback", "Phototropism", "Transpiration"], hint: "Amplifies the response until an endpoint is reached!", why: "Positive feedback amplifies a push (contractions, clotting), whereas negative feedback stabilizes!" },
          { prompt: "How does Phloem transport sugars from leaves (source) to roots/fruits (sink)?", ans: "Pressure-flow mechanism", d: ["Heartbeat pumping", "Random evaporation only", "Gravity only"], hint: "Osmotic water pressure pushes sugar sap toward low-pressure sinks!", why: "Phloem moves sugars in both directions via the Pressure-Flow mechanism!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "wica-exits-transition": {
        const bank = [
          { prompt: "Under RA 10533, how should SHS graduates view the 4 K-12 Exits?", ans: "As non-exclusive KEYS you can combine over time", d: ["As one locked door you can never leave", "Only for TVL students", "Only for college students"], hint: "HO1 metaphor: keys, not single doors!", why: "You can pursue college, upskill via TESDA, work, AND build ventures!" },
          { prompt: "Which Philippine agency runs TVET programs for Middle-Level Skills Development?", ans: "TESDA", d: ["BIR", "SEC", "PSA"], hint: "Technical Education and Skills Development Authority!", why: "TESDA provides accredited TVET certifications (even ~1/3 of enrollees are college grads)!" },
          { prompt: "To legally register a Philippine business under your own name, you must be at least:", ans: "18 years old", d: ["15 years old", "25 years old", "30 years old"], hint: "Legal age of majority in the Philippines!", why: "HO2 notes you must be 18 to register under your own name (DTI/SEC → Brgy → Mayor → BIR)!" },
          { prompt: "What does PESO's SPESOS program specifically support?", ans: "Employment of Students and Out-of-School Youth", d: ["Corporate tax auditing", "Medical licensing", "Foreign passport printing"], hint: "Special Program for Employment of Students and Out-of-School Youth!", why: "SPESOS connects students & OSY to paid work opportunities through DOLE-PESO!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "wica-21st-work-4ir": {
        const bank = [
          { prompt: "In VUCA (HO7), what do the four letters stand for?", ans: "Volatility, Uncertainty, Complexity, Ambiguity", d: ["Value, Utility, Cost, Action", "Vision, Unity, Culture, Agility", "Volume, Usage, Cloud, AI"], hint: "Describes rapid, unpredictable 21st-century disruption!", why: "VUCA = Volatility, Uncertainty, Complexity, Ambiguity!" },
          { prompt: "Which Industrial Revolution introduced mass production powered by electricity & assembly lines?", ans: "2nd Industrial Revolution (1870–1914)", d: ["1st IR (Steam)", "3rd IR (Computers)", "4th IR (AI/Biotech)"], hint: "1IR = Steam, 2IR = Electricity, 3IR = Digital, 4IR = Fusion!", why: "Electricity and assembly lines defined the 2nd Industrial Revolution!" },
          { prompt: "Under DOLE Advisory No. 2, a Compressed Workweek reduces workdays below 6 while keeping weekly hours at:", ans: "48 hours/week", d: ["10 hours/week", "80 hours/week", "20 hours/week"], hint: "Same standard PH 48-hour week packed into fewer days!", whyEasy: "Compressed workweek keeps 48 total hours across fewer days!" },
          { prompt: "Which 3 essential competencies do fresh graduates MOST commonly lack according to WICA HO4?", ans: "Critical thinking, Initiative, and Effective communication", d: ["Typing speed only", "Memorizing phone books", "Physical height"], hint: "Think of the 3 soft-skill gaps employers flag in interviews!", why: "HO4 stresses Critical Thinking, Initiative, and Effective Communication as top hiring gaps!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why || b.whyEasy };
      }

      case "wica-growth-ethics": {
        const bank = [
          { prompt: "In a Professional Development Plan (PDP), a Mid-term SMART goal targets what timeframe?", ans: "Within 1 to 2 years", d: ["Within 1 week", "3 to 5 years", "20 years"], hint: "Short = 1 yr, Mid = 1–2 yrs, Long = 3–5 yrs!", why: "HO5 classifies Mid-term PDP goals at the 1 to 2 year mark!" },
          { prompt: "Which statement accurately captures Work Ethics vs Professionalism (HO6)?", ans: "Ethics are explicit dos/don'ts; Professionalism is personally cultivated conduct", d: ["Professionalism is written by Congress", "Ethics only mean dressing neatly", "They never overlap"], hint: "External standards vs personal daily embodiment!", why: "Professionalism is a personal component of work ethic reflected in punctuality, humility, and accountability!" },
          { prompt: "Your PDP timeline should be treated as:", ans: "A living work-in-progress updated as goals & milestones evolve", d: ["Locked permanently on Day 1", "Thrown away after graduation", "Written only by HR"], hint: "Careers evolve — your roadmap evolves with them!", why: "HO5 stresses updating your PDP whenever milestones are hit or strategies shift!" },
          { prompt: "Which habit best defeats workplace procrastination (HO6)?", ans: "Adopt 'Do it right now' & break work into focused clear priorities", d: ["Wait for panic before deadlines", "Multitask across 10 apps", "Never ask clarifying questions"], hint: "Action beats perfectionist delay!", why: "Refusing to procrastinate + negotiating deadlines early builds dependability!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "wica-jobs-resume-interview": {
        const bank = [
          { prompt: "Which agency issues a Police Clearance vs an NBI Clearance in the Philippines?", ans: "Police = PNP; NBI Clearance = NBI", d: ["Both by BIR", "Police = PSA; NBI = SSS", "Both by DepEd"], hint: "Philippine National Police vs National Bureau of Investigation!", why: "PNP issues Police Clearances; NBI issues NBI Clearances proving no criminal charges!" },
          { prompt: "What software do many companies use to automatically screen and organize submitted résumés?", ans: "Applicant Tracking System (ATS)", d: ["Photoshop", "BIOS", "DNS"], hint: "Stands for Applicant Tracking System!", why: "Optimizing résumé keywords helps you pass ATS screening cleanly!" },
          { prompt: "Per WICA HO9, what is the ideal formatting spec for a Cover Letter?", ans: "1 page max, 3–4 paragraphs, Arial/Helvetica 10–12 pt, 1-inch margins", d: ["5 pages, Comic Sans 18 pt", "Center-aligned poetry", "No contact header"], hint: "Crisp 1-page business letter format!", why: "Left-aligned, single-spaced, 1-page cover letters respect recruiters' time!" },
          { prompt: "Which job-hunting method is BEST for uncovering unpublished 'hidden' job openings?", ans: "Networking (mentors, friends, volunteering, alumni)", d: ["Waiting passively", "Paying scam fees", "Walk-ins to hospital ERs"], hint: "People refer trusted contacts before openings ever hit public boards!", why: "Networking taps directly into the hidden job market!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "wica-research-pm-entrep": {
        const bank = [
          { prompt: "Which Qualitative design studies lived experiences from the first-person point of view?", ans: "Phenomenology", d: ["Experimental SIP", "Survey", "Correlational"], hint: "Studies structures of consciousness & lived phenomena!", why: "Phenomenology investigates how individuals experience a phenomenon firsthand!" },
          { prompt: "Which Quantitative design manipulates an Independent Variable (IV) to test cause-and-effect (used in SIPs)?", ans: "Experimental research", d: ["Correlational", "Narrative", "Ethnography"], hint: "Controlled lab/field manipulation of IV!", why: "Experimental designs actively manipulate IVs and measure DVs!" },
          { prompt: "In Project Management (HO11), the Closing phase includes delivering the product AND:", ans: "Conducting a full review/audit of lessons learned", d: ["Skipping final contracts", "Starting random new scope", "Deleting all budgets"], hint: "Capture what went well and what didn't!", why: "Closing wraps agreements formally and audits lessons learned!" },
          { prompt: "In Mixed Methods research, collecting BOTH survey & interview data from every participant is called:", ans: "Triangulation design", d: ["Single-blind case", "Phenomenology", "Causal-comparative"], hint: "Cross-checks data from multiple angles like a triangle!", why: "Triangulation blends quantitative and qualitative evidence together!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "persdev-self-whole-person": {
        const bank = [
          { prompt: "In the Johari Window, traits YOU know about yourself but keep private from others sit in the:", ans: "Hidden Area (Facade)", d: ["Blind Spot", "Open Area", "Unknown Area"], hint: "Known to self, unknown to others!", why: "Thoughtful self-disclosure turns Hidden areas into Open trust!" },
          { prompt: "Which holistic domain involves personal values, deeper meaning, and moral purpose?", ans: "Spiritual domain", d: ["Physiological domain", "Cognitive only", "Financial only"], hint: "Guides purpose and inner compass!", why: "The Spiritual domain anchors meaning alongside Physiological, Cognitive, Psychological & Social!" },
          { prompt: "Who you genuinely are right now (strengths and growth areas) is your:", ans: "Actual Self", d: ["Ideal Self", "Blind Spot", "Social Mask"], hint: "Actual = reality right now; Ideal = aspiration!", why: "Honest Actual-Self awareness is the starting line of real growth!" },
          { prompt: "In the Cognitive Triangle, Thoughts, Feelings, and Behaviors:", ans: "Continuously influence one another in a two-way loop", d: ["Operate totally independently", "Cannot ever be changed", "Only occur in sleep"], hint: "Shift one corner and the other two move with it!", why: "Reframing thoughts reshapes feelings and actions!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "persdev-adolescence-stress": {
        const bank = [
          { prompt: "Long-term overwhelming pressure that harms sleep, focus, and immunity is called:", ans: "Distress", d: ["Eustress", "Congruence", "Flow"], hint: "Negative, chronic overload!", why: "Unlike motivating Eustress, Distress overwhelms coping reserves!" },
          { prompt: "Using box breathing and journaling to stay calm while awaiting results you can't change is:", ans: "Emotion-focused coping", d: ["Procrastination", "Denial", "Aggression"], hint: "Regulates emotional arousal when external events are outside your control!", why: "Healthy emotion-focused coping calms the nervous system safely!" },
          { prompt: "Which developmental theorist mapped Adolescent tasks like accepting one's body and preparing for career?", ans: "Robert Havighurst", d: ["Isaac Newton", "Charles Coulomb", "Carolus Linnaeus"], hint: "Famous for Developmental Tasks across life stages!", why: "Havighurst defined concrete developmental milestones; Erikson defined Identity vs Role Confusion!" },
          { prompt: "When your body senses acute danger and surges adrenaline (racing heart, shallow breath), that is the:", ans: "Fight-Flight-Freeze stress response", d: ["Digestive rest state", "Cognitive congruence", "Synaptic pruning"], hint: "Ancient survival alarm system!", why: "Recognizing physiological stress cues lets you downshift with slow breathing!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "persdev-brain-emotions-eq": {
        const bank = [
          { prompt: "Which brain structure is essential for locking short-term studying into long-term memory?", ans: "Hippocampus", d: ["Amygdala only", "Medulla", "Retina"], hint: "Acts as the brain's memory librarian — especially active during sleep!", why: "The Hippocampus consolidates declarative study memories!" },
          { prompt: "Spotting 'I am feeling defensive right now' in real time demonstrates which Goleman EQ pillar?", ans: "Self-Awareness", d: ["Social isolation", "Obedience", "Conformity"], hint: "Accurate real-time radar of your own emotional state!", why: "Self-Awareness is Pillar #1 of Emotional Intelligence!" },
          { prompt: "Why does Mind Mapping help whole-brain studying?", ans: "Combines visual branches, color, and keywords to activate both analytical & spatial networks", d: ["Replaces sleep", "Shrinks the hippocampus", "Uses only one word"], hint: "Engages visual-spatial AND verbal pathways together!", why: "Multi-modal links create far stronger memory retrieval cues!" },
          { prompt: "Which Goleman EQ pillar drives you to keep improving for internal mastery rather than just external applause?", ans: "Intrinsic Motivation", d: ["Amygdala Hijack", "Distress", "Blind Spot"], hint: "Internal resilience and purpose-driven passion!", why: "Goleman's 5 pillars: Self-Awareness, Self-Regulation, Motivation, Empathy, Social Skills!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "persdev-relationships-leadership": {
        const bank = [
          { prompt: "Following a direct command from a uniformed authority figure is classified as:", ans: "Obedience", d: ["Conformity", "Compliance", "Intimacy"], hint: "Authority-driven social influence!", why: "Obedience responds to authority; Conformity matches peers; Compliance answers a request!" },
          { prompt: "In Sternberg's Love Triangle, deep friendship with Intimacy + Commitment (without romantic Passion) is:", ans: "Companionate Love", d: ["Infatuation", "Empty Love", "Fatuous Love"], hint: "Close lifelong companions!", why: "Intimacy + Commitment = Companionate Love; adding Passion gives Consummate Love!" },
          { prompt: "A leader who articulates an inspiring vision and mentors teammates to exceed their own expectations practices:", ans: "Transformational Leadership", d: ["Authoritarian control", "Passive avoidance", "Micromanagement"], hint: "Transforms people and culture upward!", why: "Transformational leaders elevate purpose, skill, and autonomy!" },
          { prompt: "Healthy personal boundaries in friendships or dating mean:", ans: "Communicating clear limits respectfully while honoring the other person's limits too", d: ["Controlling who they talk to", "Never saying no", "Ghosting without explanation"], hint: "Respect runs in BOTH directions!", why: "Clear, mutual boundaries keep relationships safe and resilient!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "wlns-fitness-excellence": {
        const age = randInt(16, 24);
        const maxHr = 220 - age;
        return {
          type: "mc",
          prompt: `Using Max HR = 220 − age, estimate the Maximum Heart Rate for a ${age}-year-old student:`,
          options: makeUniqueOpts(`${maxHr} bpm`, [`${200 - age} bpm`, `${maxHr + 10} bpm`, `${maxHr - 12} bpm`]),
          answer: `${maxHr} bpm`,
          hint: `Subtract ${age} from 220!`,
          whyEasy: `220 − ${age} = ${maxHr} bpm!`
        };
      }

      case "wlns-money-literacy": {
        const inc = pick([5000, 8000, 12000, 20000]);
        const bucket = pick([
          { name: "Needs (50%)", pct: 0.5 },
          { name: "Wants (30%)", pct: 0.3 },
          { name: "Savings & Investing (20%)", pct: 0.2 }
        ]);
        const ans = Math.round(inc * bucket.pct);
        return {
          type: "mc",
          prompt: `50/30/20 Rule: On ₱${inc.toLocaleString()} monthly income, how much is allocated to ${bucket.name}?`,
          options: makeUniqueOpts(`₱${ans.toLocaleString()}`, [`₱${Math.round(inc * 0.1).toLocaleString()}`, `₱${Math.round(inc * 0.4).toLocaleString()}`, `₱${Math.round(inc * 0.6).toLocaleString()}`]),
          answer: `₱${ans.toLocaleString()}`,
          hint: `Multiply ₱${inc.toLocaleString()} × ${bucket.pct}!`,
          whyEasy: `${bucket.pct * 100}% of ₱${inc.toLocaleString()} = ₱${ans.toLocaleString()}!`
        };
      }

      case "wlns-leadership-legacy-godpreneur": {
        const bank = [
          { prompt: "What transforms a temporary project win into a lasting LEGACY?", ans: "Developing people, ethics, and systems that keep blessing others after you leave", d: ["Hoarding all credit", "Cutting corners to finish early", "Refusing to mentor juniors"], hint: "Legacy lives ON through others!", why: "Multiplying capability and character creates enduring legacy!" },
          { prompt: "Stewardship leadership views time, money, and influence as:", ans: "Resources entrusted to you to grow responsibly for the good of others", d: ["Personal trophies to spend selfishly", "Reasons to dominate teammates", "Unimportant details"], hint: "A steward multiplies what's entrusted with integrity!", why: "Stewardship joins accountability with generous service!" },
          { prompt: "How does a purpose-driven ('Godpreneur') venture balance ethics and profit?", ans: "Earns honest sustainable profit BY solving real customer problems with integrity", d: ["Ignores financial math completely", "Uses deceptive ads for quick sales", "Underpays workers"], hint: "Honest value creation sustains the mission!", why: "Sustainable ethics + value creation grow both impact and trust!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "math-vectors-3d-dot-cross": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const triple = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]);
          return {
            type: "mc",
            prompt: `Find the magnitude |v| of vector v = [${triple[0]}, ${triple[1]}]:`,
            options: makeUniqueOpts(`${triple[2]}`, [`${triple[0] + triple[1]}`, `${triple[2] + 2}`, `${triple[2] * triple[2]}`]),
            answer: `${triple[2]}`,
            hint: `Use Pythagoras: √(${triple[0]}² + ${triple[1]}²)!`,
            whyEasy: `√(${triple[0] * triple[0]} + ${triple[1] * triple[1]}) = ${triple[2]}!`
          };
        }
        const a = randInt(2, 6);
        const b = randInt(2, 6);
        const ang = pick([0, 90]);
        const ans = ang === 90 ? `${a * b}` : "0";
        return {
          type: "mc",
          prompt: `Vectors |A| = ${a} and |B| = ${b} meet at θ = ${ang}°. Cross product magnitude |A × B| = AB sin θ?`,
          options: makeUniqueOpts(ans, [ang === 90 ? "0" : `${a * b}`, `${a + b}`, `${a * b * 2}`]),
          answer: ans,
          hint: `sin(${ang}°) = ${ang === 90 ? 1 : 0}!`,
          whyEasy: `${a} × ${b} × sin(${ang}°) = ${ans}!`
        };
      }

      case "math-trig-identities-laws": {
        const bank = [
          { prompt: "Using sin(2θ) = 2 sin θ cos θ, if sin θ = 3/5 and cos θ = 4/5, what is sin(2θ)?", ans: "24/25", d: ["7/5", "12/25", "6/5"], hint: "Multiply 2 × (3/5) × (4/5)!", why: "2 × 12/25 = 24/25!" },
          { prompt: "Simplify sec²θ − tan²θ using 1 + tan²θ = sec²θ:", ans: "1", d: ["0", "sin²θ", "2"], hint: "Subtract tan²θ from both sides of 1 + tan²θ = sec²θ!", why: "sec²θ − tan²θ = 1 identically!" },
          { prompt: "In a triangle with a = 3, b = 5, and C = 120° (cos 120° = −0.5), Law of Cosines gives c² =", ans: "49 (so c = 7)", d: ["19", "34", "16"], hint: "Watch the double minus: 3² + 5² − 2(3)(5)(−0.5) = 9 + 25 + 15!", why: "9 + 25 + 15 = 49 → c = 7!" },
          { prompt: "Which identity equals 1 / sin(θ)?", ans: "csc(θ) (Cosecant)", d: ["sec(θ)", "cot(θ)", "cos(θ)"], hint: "S ↔ C reciprocal swap!", why: "csc(θ) = 1/sin(θ) while sec(θ) = 1/cos(θ)!" }
        ];
        const b = pick(bank);
        return { type: "mc", prompt: b.prompt, options: makeUniqueOpts(b.ans, b.d), answer: b.ans, hint: b.hint, whyEasy: b.why };
      }

      case "math-integration-techniques": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const top = randInt(5, 9);
          const bot = randInt(1, 3);
          const w = randInt(2, 5);
          const area = (top - bot) * w;
          return {
            type: "mc",
            prompt: `Area between Top y = ${top} and Bottom y = ${bot} from x = 0 to x = ${w}: ∫ (Top − Bottom) dx =`,
            options: makeUniqueOpts(`${area}`, [`${(top + bot) * w}`, `${top - bot}`, `${area + w}`]),
            answer: `${area}`,
            hint: `Subtract Top − Bottom = ${top - bot}, then multiply by width ${w}!`,
            whyEasy: `(${top} − ${bot}) × ${w} = ${area} square units!`
          };
        }
        const n = randInt(2, 5);
        return {
          type: "mc",
          prompt: `Using u-substitution (u = x^${n} + 1), evaluate ∫ ${n}x^${n - 1} · e^(x^${n} + 1) dx:`,
          options: makeUniqueOpts(`e^(x^${n} + 1) + C`, [`${n}·e^(x^${n} + 1) + C`, `x^${n}·e^x + C`, `e^(x^${n}) / ${n} + C`]),
          answer: `e^(x^${n} + 1) + C`,
          hint: `du = ${n}x^${n - 1} dx eats the entire front factor, leaving ∫ e^u du!`,
          whyEasy: `∫ e^u du = e^u + C = e^(x^${n} + 1) + C!`
        };
      }

      case "math-financial-compound-annuities": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const r = pick([4, 6, 8, 9, 12]);
          const yrs = 72 / r;
          return {
            type: "mc",
            prompt: `Rule of 72: Roughly how many years does money take to DOUBLE at ${r}% compounded annually?`,
            options: makeUniqueOpts(`${yrs} years`, [`${r} years`, `${yrs * 2} years`, `${Math.max(1, yrs - 3)} years`]),
            answer: `${yrs} years`,
            hint: `Divide 72 by ${r}!`,
            whyEasy: `72 ÷ ${r} = ${yrs} years!`
          };
        }
        const row = pick([
          { p: "True", q: "False", ans: "False", why: "The ONLY row where p → q is False is True → False (broken promise)!" },
          { p: "False", q: "True", ans: "True", why: "When p is False, p → q is vacuously True!" },
          { p: "False", q: "False", ans: "True", why: "False → False does NOT break any promise → True!" },
          { p: "True", q: "True", ans: "True", why: "True → True keeps the promise → True!" }
        ]);
        return {
          type: "mc",
          prompt: `Truth Table: If p is ${row.p} and q is ${row.q}, what is the truth value of (p → q)?`,
          options: makeUniqueOpts(row.ans, [row.ans === "True" ? "False" : "True", "Undefined", "Both True & False"]),
          answer: row.ans,
          hint: "Remember: p → q is ONLY False when True → False!",
          whyEasy: row.why
        };
      }

      default:
        return prevGen(nodeId);
    }
  };

  // ==================== 32 CURATED WORKED EXAMPLES ====================
  if (LATEX && typeof LATEX.registerWorkedExamples === "function") {
    LATEX.registerWorkedExamples({
      "phys2-coulomb-electric-field": {
        heroFormula: "$$F = k\\frac{|q_1 q_2|}{r^2} \\;(k = 9.0\\times 10^9), \\qquad E = \\frac{F_e}{q}$$",
        title: "PHYS2 HO1: Coulomb's Law With Unit Conversions",
        problemLatex: "$$q_1 = 4\\,\\mu\\text{C},\\; q_2 = 1\\,\\mu\\text{C},\\; r = 3\\text{ cm} \\implies F = \\text{?}$$",
        steps: [
          { label: "Convert μC → C and cm → m FIRST", mathLatex: "$q_1 = 4\\times 10^{-6}\\text{ C},\\; q_2 = 1\\times 10^{-6}\\text{ C},\\; r = 0.03\\text{ m}$", plainWhy: "SI units (C and m) prevent million-fold mistakes!" },
          { label: "Square the distance r cleanly", mathLatex: "$r^2 = (3\\times 10^{-2})^2 = 9\\times 10^{-4}\\text{ m}^2$", plainWhy: "Writing 0.03 as 3×10⁻² makes the 9 cancel cleanly with k = 9×10⁹!" },
          { label: "Multiply & cancel powers of 10", mathLatex: "$F = \\frac{(9\\times 10^9)(4\\times 10^{-6})(1\\times 10^{-6})}{9\\times 10^{-4}} = \\mathbf{40\\text{ N}}$", plainWhy: "Both positive → 40 N repulsive force on BOTH charges equally!" }
        ],
        answerLatex: "$$F = 40\\text{ N (Repulsive)}$$",
        commonTrap: "Never forget to square r, convert cm→m, or recall Newton's 3rd Law (equal force on both charges)!"
      },
      "phys2-electric-potential": {
        heroFormula: "$$U = k\\frac{q_1 q_2}{r}\\;(\\text{J}), \\qquad V = \\frac{U}{q_0} = k\\frac{q}{r}\\;(\\text{V = J/C}), \\qquad W_{a\\to b} = -\\Delta U$$",
        title: "PHYS2 HO2: Solving Distance From Point-Charge Voltage",
        problemLatex: "$$q = 8.0\\times 10^{-11}\\text{ C} \\text{ creates } V_a = 12\\text{ V and } V_b = 24\\text{ V} \\implies r_a, r_b = \\text{?}$$",
        steps: [
          { label: "Rearrange V = kq / r for distance r", mathLatex: "$r = \\frac{k\\,q}{V}$", plainWhy: "Notice Voltage uses linear 1/r — NO square root needed!" },
          { label: "Solve r_a for V_a = 12 V", mathLatex: "$r_a = \\frac{(9\\times 10^9)(8\\times 10^{-11})}{12} = \\frac{0.72}{12} = \\mathbf{0.06\\text{ m}}$", plainWhy: "9×8 = 72 and 10⁹·10⁻¹¹ = 10⁻² → 0.72 ÷ 12 = 0.06 m (6 cm)!" },
          { label: "Use inverse scaling for V_b = 24 V", mathLatex: "$V_b = 2V_a \\implies r_b = \\frac{r_a}{2} = \\mathbf{0.03\\text{ m}}$", plainWhy: "Doubling voltage cuts distance cleanly in half!" }
        ],
        answerLatex: "$$r_a = 0.06\\text{ m}, \\quad r_b = 0.03\\text{ m}$$",
        commonTrap: "NEVER square r in U or V! And moving a negative charge along E moves AGAINST F_e, INCREASING U!"
      },
      "phys2-capacitors-dielectrics": {
        heroFormula: "$$\\frac{1}{C_S} = \\frac{1}{C_1}+\\frac{1}{C_2}, \\quad C_P = C_1+C_2, \\quad U = \\frac{1}{2}CV^2, \\quad K = \\frac{C}{C_0} = \\frac{V_0}{V}$$",
        title: "PHYS2 LAG_3 + HO4: Series Capacitors & Dielectric Constant",
        problemLatex: "$$\\text{Series } C_1 = 6\\,\\mu\\text{F},\\; C_2 = 12\\,\\mu\\text{F} \\text{ on } 10\\text{ V} \\implies C_S \\text{ and } Q = \\text{?}$$",
        steps: [
          { label: "Sum reciprocals for Series Capacitors", mathLatex: "$\\frac{1}{C_S} = \\frac{1}{6} + \\frac{1}{12} = \\frac{2 + 1}{12} = \\frac{3}{12} = \\frac{1}{4}$", plainWhy: "Series capacitors behave like a wider gap → smaller total capacitance!" },
          { label: "INVERT the fraction to get C_S", mathLatex: "$C_S = \\mathbf{4\\,\\mu\\text{F}}$", plainWhy: "Always check: C_S (4 μF) is smaller than the smallest cap (6 μF)!" },
          { label: "Compute shared series charge Q = C_S·V", mathLatex: "$Q = (4\\,\\mu\\text{F})(10\\text{ V}) = \\mathbf{40\\,\\mu\\text{C}}$", plainWhy: "Every capacitor in series holds the exact same 40 μC!" }
        ],
        answerLatex: "$$C_S = 4\\,\\mu\\text{F}, \\quad Q = 40\\,\\mu\\text{C}$$",
        commonTrap: "Don't forget to INVERT 1/C_S — and never mix up Capacitor vs Resistor series/parallel rules!"
      },
      "phys2-resistivity-ohms-dc": {
        heroFormula: "$$R = \\frac{\\rho L}{A}, \\qquad R_T = R_0\\left[1 + \\alpha(T - T_0)\\right], \\qquad V = IR$$",
        title: "PHYS2 HO5 & HO6: Thermal Resistance & Series–Parallel Reduction",
        problemLatex: "$$\\text{Copper } R_0 = 1.72\\,\\Omega \\text{ at } 20^{\\circ}\\text{C } (\\alpha = 0.00393/^{\\circ}\\text{C}) \\implies R \\text{ at } 100^{\\circ}\\text{C?}$$",
        steps: [
          { label: "Find temperature jump ΔT = T − T₀", mathLatex: "$\\Delta T = 100^{\\circ}\\text{C} - 20^{\\circ}\\text{C} = +80^{\\circ}\\text{C}$", plainWhy: "Keep sign exact: heating is +ΔT, cooling (e.g. 0 − 20 = −20°C) is −ΔT!" },
          { label: "Compute multiplier [1 + α·ΔT]", mathLatex: "$1 + (0.00393)(80) = 1 + 0.3144 = 1.3144$", plainWhy: "Hotter copper atoms vibrate harder, bumping electrons 31.4% more!" },
          { label: "Multiply by starting resistance R₀", mathLatex: "$R = 1.72 \\times 1.3144 = \\mathbf{2.26\\,\\Omega}$", plainWhy: "Metals climb when heated; carbon/semiconductors (α < 0) drop!" }
        ],
        answerLatex: "$$R(100^{\\circ}\\text{C}) = 2.26\\,\\Omega$$",
        commonTrap: "Resistivity ρ (Ω·m) is material-only; Resistance R (Ω) depends on length L and area A too!"
      },
      "phys2-kirchhoff-circuits": {
        heroFormula: "$$\\text{KCL: } \\sum I_{\\text{in}} = \\sum I_{\\text{out}}, \\qquad \\text{KVL: } \\sum V_{\\text{loop}} = 0, \\qquad \\tau = RC$$",
        title: "PHYS2 HO7: Defeating the Distributed-Node KCL Trap",
        problemLatex: "$$\\text{Node currents: } 4\\text{ mA IN},\\; -1\\text{ mA IN},\\; 6\\text{ mA OUT},\\; -3\\text{ mA OUT},\\; i_3\\text{ OUT}$$",
        steps: [
          { label: "Treat the entire ideal wire as ONE single node", mathLatex: "$\\text{Distributed node} = \\text{single junction}$", plainWhy: "Ideal schematic wires have zero resistance — all taps share one node!" },
          { label: "Flip IN arrows to OUT (reversing their signs!)", mathLatex: "$4\\text{ IN} \\to -4\\text{ OUT}, \\qquad -1\\text{ IN} \\to +1\\text{ OUT}$", plainWhy: "Watch the double-negative: −1 IN flips to +1 OUT!" },
          { label: "Sum all OUT currents to zero", mathLatex: "$-4 + 1 + 6 + (-3) + i_3 = 0 \\implies 0 + i_3 = 0 \\implies \\mathbf{i_3 = 0\\text{ mA}}$", plainWhy: "Check: Total IN = 4 + (−1) = 3 mA; Total OUT = 6 + (−3) + 0 = 3 mA ✓!" }
        ],
        answerLatex: "$$i_3 = 0\\text{ mA}$$",
        commonTrap: "Always flip BOTH arrow AND sign together — double negatives (−1 IN → +1 OUT) are #1 KCL error!"
      },
      "phys2-magnetism-lorentz-sources": {
        heroFormula: "$$F = |q|vB\\sin\\phi, \\quad R = \\frac{mv}{|q|B}, \\quad B_{\\text{wire}} = \\frac{\\mu_0 I}{2\\pi r}, \\quad B_{\\text{loop}} = \\frac{\\mu_0 NI}{2R}, \\quad B_{\\text{sol}} = \\mu_0 nI$$",
        title: "PHYS2 HO12: Current Needed for a 200-Turn Circular Coil",
        problemLatex: "$$R = 12\\text{ cm},\\; N = 200\\text{ turns},\\; B = 5.0\\times 10^{-3}\\text{ T} \\implies I = \\text{?}$$",
        steps: [
          { label: "Convert radius R to meters", mathLatex: "$R = 12\\text{ cm} = 0.12\\text{ m}$", plainWhy: "Always match SI meters before plugging in μ₀ = 4π×10⁻⁷ T·m/A." },
          { label: "Solve circular coil formula B = μ₀NI / (2R) for I", mathLatex: "$I = \\frac{2RB}{\\mu_0 N}$", plainWhy: "Notice circular loops divide by 2R (NO π in the denominator!)." },
          { label: "Plug values carefully", mathLatex: "$I = \\frac{2(0.12)(5.0\\times 10^{-3})}{(4\\pi\\times 10^{-7})(200)} = \\frac{1.2\\times 10^{-3}}{2.513\\times 10^{-4}} \\approx \\mathbf{4.8\\text{ A}}$", plainWhy: "Matches the exact HO12 electron-beam sample calculation!" }
        ],
        answerLatex: "$$I = 4.8\\text{ A}$$",
        commonTrap: "HO12 prints 'Faraday's Law' at the top and drops '4' from Biot-Savart μ₀/(4π) — remember the true physics!"
      },
      "chem2-organic-polymers": {
        heroFormula: "$$\\text{Alkane } C_nH_{2n+2} \\quad | \\quad \\text{Alkene } C_nH_{2n} \\quad | \\quad \\text{Alkyne } C_nH_{2n-2}$$",
        title: "Spotting Functional Groups & Polymerization Type",
        problemLatex: "$$\\text{Classify } \\text{CH}_3\\text{CH}_2\\text{OH} \\text{ vs } \\text{CH}_3\\text{COOH} \\text{ and Nylon formation}$$",
        steps: [
          { label: "Circle the heteroatom group (not just C–H)", mathLatex: "$-\\text{OH} = \\text{Alcohol (Ethanol)}, \\qquad -\\text{COOH} = \\text{Carboxylic Acid}$", plainWhy: "Hydrocarbon tails look alike — the functional group dictates reactivity!" },
          { label: "Check whether a small molecule splits off in polymerization", mathLatex: "$\\text{Amine} + \\text{Acid} \\to \\text{Nylon (Polyamide)} + \\mathbf{\\text{H}_2\\text{O}}$", plainWhy: "Releasing H₂O proves Condensation polymerization (vs Addition opening C=C)!" },
          { label: "Check cross-linking for recycling behavior", mathLatex: "$\\text{Linear chains} = \\text{Thermoplastic (remelts)}, \\quad \\text{3D cross-links} = \\text{Thermoset}$", plainWhy: "Cross-links lock polymer chains permanently against heat!" }
        ],
        answerLatex: "$$-\\text{OH Alcohol},\\; -\\text{COOH Acid},\\; \\text{Nylon = Condensation}$$",
        commonTrap: "Carbon ALWAYS makes 4 bonds — count every line (double = 2, triple = 3) before adding H's!"
      },
      "chem2-imf-phases": {
        heroFormula: "$$\\text{Ion–Dipole} > \\text{H-Bond (H–F/O/N)} > \\text{Dipole–Dipole} > \\text{LDF}$$",
        title: "Ranking Boiling Points & Vapor Pressures by IMFs",
        problemLatex: "$$\\text{Rank Boiling Points: } \\text{CH}_4,\\; \\text{H}_2\\text{S},\\; \\text{H}_2\\text{O}$$",
        steps: [
          { label: "Identify the strongest IMF in each molecule", mathLatex: "$\\text{CH}_4\\;(\\text{LDF}), \\quad \\text{H}_2\\text{S}\\;(\\text{Dipole–Dipole}), \\quad \\text{H}_2\\text{O}\\;(\\text{H-Bond!})$", plainWhy: "Only H₂O has H directly attached to F, O, or N!" },
          { label: "Higher IMF → Higher Boiling Point", mathLatex: "$\\text{BP: } \\text{CH}_4 < \\text{H}_2\\text{S} < \\mathbf{\\text{H}_2\\text{O}}$", plainWhy: "Hydrogen bonding makes water boil at +100°C instead of −60°C!" },
          { label: "Flip order for Vapor Pressure", mathLatex: "$\\text{Vapor Pressure: } \\text{H}_2\\text{O} < \\text{H}_2\\text{S} < \\text{CH}_4$", plainWhy: "Sticky molecules refuse to evaporate, so strongest IMF = LOWEST vapor pressure!" }
        ],
        answerLatex: "$$\\text{Highest BP: } \\text{H}_2\\text{O} \\quad (\\text{Lowest Vapor Pressure!})$$",
        commonTrap: "Boiling breaks INTER-molecular forces BETWEEN molecules, NEVER the covalent bonds inside H₂O!"
      },
      "chem2-solutions-concentration": {
        heroFormula: "$$M = \\frac{\\text{mol}}{\\text{L solution}}, \\qquad m = \\frac{\\text{mol}}{\\text{kg solvent}}, \\qquad M_1 V_1 = M_2 V_2$$",
        title: "Molality vs Molarity & Stock Dilution",
        problemLatex: "$$\\text{Dilute } 6\\text{ M HCl to make } 300\\text{ mL of } 2\\text{ M HCl} \\implies V_1 = \\text{?}$$",
        steps: [
          { label: "Total moles stay conserved during dilution", mathLatex: "$M_1 V_1 = M_2 V_2$", plainWhy: "Adding pure water spreads the exact same moles into a larger volume!" },
          { label: "Plug known values (mL cancels on both sides!)", mathLatex: "$(6\\text{ M})\\,V_1 = (2\\text{ M})(300\\text{ mL})$", plainWhy: "As long as V₁ and V₂ share the same unit, mL works directly!" },
          { label: "Solve for stock volume V₁", mathLatex: "$V_1 = \\frac{600}{6} = \\mathbf{100\\text{ mL}}$", plainWhy: "Measure 100 mL of 6 M acid, then add water until total volume hits 300 mL!" }
        ],
        answerLatex: "$$V_1 = 100\\text{ mL stock} \\;(+ 200\\text{ mL water})$$",
        commonTrap: "Molality divides by kg of SOLVENT only (not total solution!), and gases dissolve best COLD + HIGH pressure!"
      },
      "chem2-colligative-properties": {
        heroFormula: "$$\\Delta T_b = i K_b m, \\qquad \\Delta T_f = i K_f m, \\qquad \\Pi = iMRT$$",
        title: "Freezing Point Depression With Electrolytes",
        problemLatex: "$$2.0\\text{ m CaCl}_2\\text{ in water } (K_f = 1.86\\,^{\\circ}\\text{C/m}) \\implies T_f = \\text{?}$$",
        steps: [
          { label: "Find van 't Hoff factor i by counting dissociated ions", mathLatex: "$\\text{CaCl}_2 \\to \\text{Ca}^{2+} + 2\\,\\text{Cl}^- \\implies \\mathbf{i = 3}$", plainWhy: "Every formula unit splits into 3 independent particles in water!" },
          { label: "Compute freezing point drop ΔT_f", mathLatex: "$\\Delta T_f = i K_f m = (3)(1.86)(2.0) = 11.16^{\\circ}\\text{C}$", plainWhy: "That's the MAGNITUDE of the drop — not the final temperature yet!" },
          { label: "SUBTRACT ΔT_f from water's normal freezing point (0°C)", mathLatex: "$T_f = 0^{\\circ}\\text{C} - 11.16^{\\circ}\\text{C} = \\mathbf{-11.16^{\\circ}\\text{C}}$", plainWhy: "Always subtract for Freezing Point and ADD for Boiling Point!" }
        ],
        answerLatex: "$$T_f = -11.16^{\\circ}\\text{C}$$",
        commonTrap: "NEVER forget i for ionic salts (NaCl = 2, CaCl₂ = 3), and NEVER forget the minus sign on freezing point!"
      },
      "chem2-kinetics-ratelaw": {
        heroFormula: "$$\\text{Rate} = k[A]^m[B]^n, \\qquad t_{1/2} = \\frac{0.693}{k}\\;(\\text{1st order})$$",
        title: "Determining Rate Law Order From Initial Rates",
        problemLatex: "$$\\text{Double } [A] \\to \\text{Rate } \\times 4; \\quad \\text{Double } [B] \\to \\text{Rate } \\times 2$$",
        steps: [
          { label: "Find order m in A using 2^m = Rate factor", mathLatex: "$2^m = 4 \\implies \\mathbf{m = 2}\\;(\\text{2nd order in } A)$", plainWhy: "Quadrupling when doubled is the exact signature of squaring ([A]²)!" },
          { label: "Find order n in B using 2^n = Rate factor", mathLatex: "$2^n = 2 \\implies \\mathbf{n = 1}\\;(\\text{1st order in } B)$", plainWhy: "Direct proportionality means exponent 1!" },
          { label: "Combine into Rate Law & Overall Order", mathLatex: "$\\text{Rate} = k[A]^2[B]^1 \\implies \\text{Overall order} = 2 + 1 = \\mathbf{3}$", plainWhy: "Notice we NEVER guessed m or n from the balanced chemical equation!" }
        ],
        answerLatex: "$$\\text{Rate} = k[A]^2[B] \\;(\\text{3rd order overall})$$",
        commonTrap: "Rate Law orders come strictly from experimental data — NEVER from balanced stoichiometric coefficients!"
      },
      "chem2-thermo-entropy-gibbs": {
        heroFormula: "$$\\Delta U = q + w, \\qquad \\Delta G = \\Delta H - T\\Delta S \\;(\\Delta G < 0 = \\text{Spontaneous!})$$",
        title: "Gibbs Spontaneity & Unit-Safe Crossover Temperature",
        problemLatex: "$$\\Delta H = +40\\text{ kJ},\\; \\Delta S = +100\\text{ J/K},\\; T = 500\\text{ K} \\implies \\Delta G = \\text{?}$$",
        steps: [
          { label: "Convert ΔS from J/K to kJ/K (divide by 1,000!)", mathLatex: "$\\Delta S = \\frac{100\\text{ J/K}}{1000} = +0.100\\text{ kJ/K}$", plainWhy: "Mixing kJ with J causes a 1,000× error — ALWAYS convert ΔS first!" },
          { label: "Plug into ΔG = ΔH − TΔS", mathLatex: "$\\Delta G = 40 - (500)(0.100) = 40 - 50 = \\mathbf{-10\\text{ kJ}}$", plainWhy: "At 500 K, the entropy bonus (50 kJ) beats the heat cost (40 kJ)!" },
          { label: "Check sign for spontaneity", mathLatex: "$\\Delta G = -10\\text{ kJ} < 0 \\implies \\mathbf{\\text{SPONTANEOUS!}}$", plainWhy: "Negative ΔG always means the forward process happens spontaneously!" }
        ],
        answerLatex: "$$\\Delta G = -10\\text{ kJ (Spontaneous)}$$",
        commonTrap: "ALWAYS divide ΔS (J/K) by 1,000 AND make sure Temperature is in Kelvin (°C + 273)!"
      },
      "bio2-recombinant-dna": {
        heroFormula: "$$\\text{Cut (Restriction Enzyme)} \\to \\text{Paste (DNA Ligase)} \\to \\text{Vector (Plasmid)} \\to \\text{Transform}$$",
        title: "How Bacteria Manufacture Human Insulin",
        problemLatex: "$$\\text{Trace the 4 steps of cloning the human insulin gene into E. coli}$$",
        steps: [
          { label: "Cut BOTH human DNA & bacterial plasmid with the SAME enzyme", mathLatex: "$\\text{Same Restriction Enzyme} \\implies \\text{Matching Sticky Ends}$", plainWhy: "Matching overhanging sticky ends hydrogen-bond like puzzle pieces!" },
          { label: "Seal permanently with DNA Ligase", mathLatex: "$\\text{Recombinant Plasmid} = \\text{Plasmid} + \\text{Insulin Gene}$", plainWhy: "Ligase repairs the sugar-phosphate backbone into one closed circle." },
          { label: "Transform bacteria & harvest protein", mathLatex: "$\\text{E. coli divides} \\to \\text{Reads universal codons} \\to \\mathbf{\\text{Human Insulin}}$", plainWhy: "Because the genetic code is universal, bacteria translate human mRNA faithfully!" }
        ],
        answerLatex: "$$\\text{Cut} \\to \\text{Ligate} \\to \\text{Transform} \\to \\text{Express}$$",
        commonTrap: "Restriction enzymes CUT, DNA ligase GLUES — and in Gel Electrophoresis, SMALLER DNA runs FARTHER toward (+)!"
      },
      "bio2-evolution-mechanisms": {
        heroFormula: "$$\\text{Mutation (New)} + \\text{Selection (Adapts)} + \\text{Drift (Luck)} + \\text{Flow (Migration)}$$",
        title: "Homologous vs Analogous & Identifying Evolutionary Forces",
        problemLatex: "$$\\text{Compare Whale Flipper vs Bat Wing vs Butterfly Wing}$$",
        steps: [
          { label: "Check internal ancestry vs surface function", mathLatex: "$\\text{Whale Flipper \& Bat Wing} = \\text{Same mammal limb bones}$", plainWhy: "Same underlying blueprint diverged into swimming vs flying → HOMOLOGOUS!" },
          { label: "Compare Butterfly Wing (insect chitin)", mathLatex: "$\\text{Bat Wing \& Butterfly Wing} = \\text{Different ancestors, same job (flight)}$", plainWhy: "Independent evolution solving the same flight problem → ANALOGOUS (Convergent)!" },
          { label: "Verify what drives evolution", mathLatex: "$\\text{Populations evolve over generations — individuals NEVER evolve!}$", plainWhy: "Selection changes allele frequencies across generations, not an individual's DNA!" }
        ],
        answerLatex: "$$\\text{Whale/Bat = Homologous; Bat/Butterfly = Analogous}$$",
        commonTrap: "Don't confuse Genetic Drift (random luck: Bottleneck/Founder) with Natural Selection (non-random adaptation)!"
      },
      "bio2-taxonomy-cladistics": {
        heroFormula: "$$\\text{Domain} \\to \\text{Kingdom} \\to \\text{Phylum} \\to \\text{Class} \\to \\text{Order} \\to \\text{Family} \\to \\text{Genus} \\to \\text{Species}$$",
        title: "Reading Evolutionary Closeness on a Cladogram",
        problemLatex: "$$\\text{Species A & B share Node 3; Species C joins way back at Node 1}$$",
        steps: [
          { label: "Ignore tip spacing — trace backward to shared NODES!", mathLatex: "$\\text{A \& B meet at recent Node 3} \\quad | \\quad \\text{C splits earlier at Node 1}$", plainWhy: "Cladogram branches can swivel freely like a crib mobile without changing relationships!" },
          { label: "Check derived traits above each node", mathLatex: "$\\text{Every species ABOVE a tick mark inherits that derived character}$", plainWhy: "Shared derived traits (synapomorphies) define nested clades." },
          { label: "Verify scientific naming format", mathLatex: "$\\textit{Panthera leo} \\;(\\text{Capital Genus, lowercase epithet, italicized!})$", plainWhy: "Same Genus confirms very recent shared ancestry!" }
        ],
        answerLatex: "$$\\text{A & B are sister taxa (closest relatives via Node 3)}$$",
        commonTrap: "NEVER judge relatedness by which labels sit side-by-side at the top — ALWAYS trace to the MOST RECENT NODE!"
      },
      "bio2-plant-animal-systems": {
        heroFormula: "$$\\text{Negative Feedback} \\implies \\text{Restores Set-Point} \\quad | \\quad \\text{Positive Feedback} \\implies \\text{Amplifies}$$",
        title: "Tracing Phototropism & Homeostatic Feedback",
        problemLatex: "$$\\text{Sunlight hits the RIGHT side of a seedling — how does Auxin steer it?}$$",
        steps: [
          { label: "Auxin migrates to the SHADED side (left)", mathLatex: "$\\text{Light on Right} \\implies \\text{Auxin gathers on Left (shaded)}$", plainWhy: "Auxin moves away from direct light toward the dark side of the shoot." },
          { label: "Shaded cells absorb water and elongate faster", mathLatex: "$\\text{Left side grows LONGER than Right side}$", plainWhy: "Think of a curved track: the outer lane is always longer than the inner lane!" },
          { label: "Longer left side bends the shoot RIGHT toward light!", mathLatex: "$\\mathbf{\\text{Positive Phototropism (grows toward sunlight!)}}$", plainWhy: "Maximizes leaf exposure for photosynthesis!" }
        ],
        answerLatex: "$$\\text{Auxin on shaded side} \\to \\text{Bends TOWARD light}$$",
        commonTrap: "Don't guess Auxin shrinks the sunny side — it ELONGATES the SHADED side!"
      },
      "wica-exits-transition": {
        heroFormula: "$$\\text{RA 10533: 4 Exits (Keys)} \\quad | \\quad \\text{DTI/SEC} \\to \\text{Brgy} \\to \\text{Mayor} \\to \\text{BIR} \\to \\text{SSS/PhilHealth/Pag-IBIG}$$",
        title: "WICA HO1 & HO2: Choosing the Right Legal Path in the Philippines",
        problemLatex: "$$\\text{An 18-year-old SHS grad launches a solo coffee cart with 2 staff — exact permits?}$$",
        steps: [
          { label: "Identify Ownership Type & Name Agency", mathLatex: "$\\text{1 Owner} = \\text{Sole Proprietorship} \\implies \\mathbf{\\text{DTI}}$", plainWhy: "Sole props register names at DTI (whereas Corporations register at SEC!)." },
          { label: "Complete Local & National Tax Permits", mathLatex: "$\\text{Barangay Clearance} \\to \\text{Mayor's Permit (LGU)} \\to \\mathbf{\\text{BIR}}$", plainWhy: "Operating without permits risks closure, fines, and even imprisonment!" },
          { label: "Add Employer Registrations (since hiring 2 staff!)", mathLatex: "$\\text{Register with } \\mathbf{\\text{SSS, PhilHealth, and Pag-IBIG Fund}}$", plainWhy: "Mandatory social protection whenever you employ workers!" }
        ],
        answerLatex: "$$\\text{DTI} \\to \\text{Barangay} \\to \\text{Mayor} \\to \\text{BIR} \\to \\text{SSS/PhilHealth/Pag-IBIG}$$",
        commonTrap: "Remember you must be 18+ to register under your own name, and PESO (RA 8759) is DOLE's free local job hub!"
      },
      "wica-21st-work-4ir": {
        heroFormula: "$$\\text{VUCA} + \\text{4IR (Physical + Digital + Biological)} \\implies \\text{Upskill Continuously!}$$",
        title: "WICA HO3 & HO7: Spotting Flexible Work & Industrial Revolution Eras",
        problemLatex: "$$\\text{Compare Job Sharing vs Work Sharing, and classify AI + Biotech}$$",
        steps: [
          { label: "Separate the two 'Sharing' traps cleanly", mathLatex: "$\\text{Job Sharing} = 2 \\text{ split } 1 \\text{ role} \\quad | \\quad \\text{Work Sharing} = \\text{cut hrs to stop layoffs}$", plainWhy: "Job Sharing is voluntary role-splitting; Work Sharing is company-wide layoff prevention!" },
          { label: "Check DOLE Advisory No. 2 caps", mathLatex: "$\\text{Compressed} = 48\\text{ hrs/wk}; \\quad \\text{Reduced Workdays} \\le \\mathbf{6\\text{ months}}$", plainWhy: "Flexi-holidays also guarantee zero diminution of benefits." },
          { label: "Map Industrial Revolutions 1IR → 4IR", mathLatex: "$\\text{1IR Steam} \\to \\text{2IR Electricity} \\to \\text{3IR Digital/IT} \\to \\mathbf{\\text{4IR Bio-Digital-Physical Fusion}}$", plainWhy: "AI + Robotics + Biotech = 4IR (where PH Agriculture faces top automation risk)!" }
        ],
        answerLatex: "$$\\text{Job Sharing} \\neq \\text{Work Sharing; AI + Biotech = 4IR}$$",
        commonTrap: "A college degree alone does NOT shield against 4IR automation — build Learning, Digital & Career-Life skills!"
      },
      "wica-growth-ethics": {
        heroFormula: "$$\\text{PDP} = \\text{Self-Assess} + \\text{SMART (1yr / 1–2yr / 3–5yr)} + \\text{Strategies (Experiential Majority!)}$$",
        title: "WICA HO5 & HO6: Building a Real PDP & Distinguishing Ethics",
        problemLatex: "$$\\text{Turn 'Be good at coding' into a Short-Term SMART PDP Step}$$",
        steps: [
          { label: "Make it Specific, Measurable, Achievable, Relevant, Timely", mathLatex: "$\\text{'Build 3 full-stack web apps within 9 months' (Short-term } \\le 1\\text{ yr)}$", plainWhy: "Replaces vague wishes with a verifiable target and deadline!" },
          { label: "Anchor the MAJORITY in Experiential Learning", mathLatex: "$\\text{Hands-on projects & internships} > \\text{Passive watching only}$", plainWhy: "HO5 emphasizes experiential 'learning by doing' as the bulk of your PDP!" },
          { label: "Apply Ethics vs Professionalism daily", mathLatex: "$\\text{Ethics (honest code)} + \\text{Professionalism (punctual, accountable, humble)}$", plainWhy: "Owning mistakes early and negotiating deadlines ahead earns lasting trust!" }
        ],
        answerLatex: "$$\\text{SMART Goal + Hands-On Experiential Strategy + Accountability}$$",
        commonTrap: "Never treat a PDP as a one-time paper — update timelines as milestones evolve!"
      },
      "wica-jobs-resume-interview": {
        heroFormula: "$$\\text{STAR} = \\text{Situation} \\to \\text{Task} \\to \\text{Action} \\to \\text{Result}$$",
        title: "WICA HO8 & HO9: Answering a Behavioral Interview With STAR",
        problemLatex: "$$\\textit{Interviewer: 'Tell me about a time your team faced a tight deadline.'}$$",
        steps: [
          { label: "S + T: Brief Situation & Your Specific Task (20%)", mathLatex: "$\\text{S: Capstone prototype broke 2 days before demo. T: I led debugging.}$", plainWhy: "Give just enough crisp context without rambling." },
          { label: "A: Concrete Actions YOU Took (60% — the meat!)", mathLatex: "$\\text{A: Split tests into 3 modules, re-wired sensor circuit, ran 10 dry runs.}$", plainWhy: "Say 'I' for your specific initiative, not vague 'we'." },
          { label: "R: Quantifiable Result + Follow-Up Habit (20%)", mathLatex: "$\\text{R: Finished 4 hrs early & scored 98\\%! Follow up with thank-you within 1 day!}$", plainWhy: "Concrete numbers prove impact — and 24-hr thank-you seals professionalism!" }
        ],
        answerLatex: "$$\\text{Crisp STAR Story + 1-Day Thank-You Email}$$",
        commonTrap: "NEVER pay an 'application fee' (job scam!), NEVER copy-paste raw formatting blindly, and ALWAYS ask references first!"
      },
      "wica-research-pm-entrep": {
        heroFormula: "$$\\text{PM 5 Phases: Init} \\to \\text{Plan} \\to [\\text{Execute} \\parallel \\text{Monitor/Control}] \\to \\text{Close}$$",
        title: "WICA HO10–HO12: Matching Research Design & PM Lifecycle",
        problemLatex: "$$\\text{Testing fertilizer levels (SIP) vs interviewing typhoon survivors' lived experience}$$",
        steps: [
          { label: "Check for Variable Manipulation → Quantitative Experimental", mathLatex: "$\\text{Manipulate fertilizer (IV)} \\to \\text{Measure growth (DV)} = \\mathbf{\\text{Experimental}}$", plainWhy: "SIPs test cause-and-effect by actively controlling and varying an IV!" },
          { label: "Check for 1st-Person Lived Meaning → Qualitative Phenomenology", mathLatex: "$\\text{Lived trauma/resilience stories} = \\mathbf{\\text{Phenomenology}}$", plainWhy: "Phenomenology explores consciousness/experience from the 1st-person view!" },
          { label: "Track Project Execution Simultaneously", mathLatex: "$\\text{Execute} \\parallel \\text{Monitor (Kanban/Gantt)} \\to \\text{Close (Audit Lessons Learned)}$", plainWhy: "Pair with a Business Model Canvas (Value Prop + Customer Segments) for ventures!" }
        ],
        answerLatex: "$$\\text{SIP = Experimental; Lived Experience = Phenomenology; Execute } \\parallel \\text{ Monitor}$$",
        commonTrap: "Don't confuse Ethnography (immersion in a CULTURE) with Phenomenology (1st-person lived PHENOMENON)!"
      },
      "persdev-self-whole-person": {
        heroFormula: "$$\\text{Thoughts} \\leftrightarrow \\text{Feelings} \\leftrightarrow \\text{Behaviors} \\quad (\\text{across 5 Holistic Domains})$$",
        title: "Applying the Cognitive Triangle to Exam Anxiety",
        problemLatex: "$$\\text{Trigger: Scoring 55\\% on a practice Physics quiz}$$",
        steps: [
          { label: "Spot the Unhelpful Automatic Thought", mathLatex: "$\\text{'I'm terrible at Physics'} \\to \\text{Shame} \\to \\text{Quit studying}$", plainWhy: "Global self-attacks drain motivation and trigger avoidance." },
          { label: "Reframe Using Actual-Self Honesty", mathLatex: "$\\text{'I missed Capacitor series rules — 1 specific fixable gap!'}$", plainWhy: "Separates your identity from a single fixable skill gap!" },
          { label: "Watch Feeling & Behavior Flip", mathLatex: "$\\text{Calm Focus} \\to \\text{Drill 10 Capacitor reps} \\to \\mathbf{\\text{Mastery & Congruence!}}$", plainWhy: "Aligning Actual Self toward Ideal Self builds authentic confidence!" }
        ],
        answerLatex: "$$\\text{Reframe Thought} \\to \\text{Calmer Feeling} \\to \\text{Effective Action}$$",
        commonTrap: "Asking trusted peers for feedback shrinks your Johari Blind Spot — growth isn't solo!"
      },
      "persdev-adolescence-stress": {
        heroFormula: "$$\\text{Controllable Stressor} \\to \\text{Problem-Focused} \\quad | \\quad \\text{Uncontrollable} \\to \\text{Emotion-Focused}$$",
        title: "Choosing the Right Stress Coping Strategy",
        problemLatex: "$$\\text{Case A: Big exam in 5 days} \\quad \\text{vs} \\quad \\text{Case B: Waiting for college entrance results}$$",
        steps: [
          { label: "Ask: Can my action change the stressor right now?", mathLatex: "$\\text{Case A: YES (controllable!)} \\quad | \\quad \\text{Case B: NO (already submitted)}$", plainWhy: "Matching strategy to controllability stops wasted panic!" },
          { label: "Match Case A → Problem-Focused Coping", mathLatex: "$\\text{Break syllabus into 5 daily 30-min blocks & practice past items}$", plainWhy: "Solving the root task turns Distress into motivating Eustress!" },
          { label: "Match Case B → Healthy Emotion-Focused Coping", mathLatex: "$\\text{Slow breathing, exercise, talking with mentors/friends, good sleep}$", plainWhy: "Calms your nervous system while respecting what you cannot control!" }
        ],
        answerLatex: "$$\\text{Case A = Problem-Focused; Case B = Emotion-Focused}$$",
        commonTrap: "Never mistake avoidance/scrolling for coping — it temporarily numbs while letting Distress grow!"
      },
      "persdev-brain-emotions-eq": {
        heroFormula: "$$\\text{Trigger} \\to \\text{6-Second Pause} \\to \\text{Prefrontal CEO beats Amygdala Alarm}$$",
        title: "Using Goleman's EQ to Beat an Amygdala Hijack",
        problemLatex: "$$\\text{A teammate criticizes your slide deck sharply in front of the group}$$",
        steps: [
          { label: "Pillar 1 — Self-Awareness (Name It to Tame It)", mathLatex: "$\\text{'Heart racing — my Amygdala feels attacked right now.'}$", plainWhy: "Labeling the emotion shifts activity straight into your Prefrontal Cortex!" },
          { label: "Pillar 2 — Self-Regulation (6-Second Breath)", mathLatex: "$\\text{Pause 6 s before speaking (blocks impulsive snappy comeback!)}$", plainWhy: "Gives executive judgment time to overtake the fast stress alarm." },
          { label: "Pillars 4 & 5 — Empathy + Social Skill", mathLatex: "$\\text{'Good catch — they're stressed about our grade. Let's fix Slide 4 together!'}$", plainWhy: "Turns tense conflict into high-trust teamwork!" }
        ],
        answerLatex: "$$\\text{Notice} \\to \\text{Pause} \\to \\text{Empathize} \\to \\text{Solve}$$",
        commonTrap: "Emotional Intelligence isn't suppressing feelings — it's reading them accurately and steering your response!"
      },
      "persdev-relationships-leadership": {
        heroFormula: "$$\\text{Consummate Love} = \\text{Intimacy} + \\text{Passion} + \\text{Commitment}$$",
        title: "Spotting Conformity, Compliance & Obedience",
        problemLatex: "$$\\text{Classify 3 school scenarios into Conformity, Compliance, or Obedience}$$",
        steps: [
          { label: "Unspoken peer norm → CONFORMITY", mathLatex: "$\\text{Buying the same shoes everyone wears without being asked} = \\mathbf{\\text{Conformity}}$", plainWhy: "Driven by indirect social belonging pressure." },
          { label: "Direct request from an equal → COMPLIANCE", mathLatex: "$\\text{Agreeing when a classmate asks to swap seats} = \\mathbf{\\text{Compliance}}$", plainWhy: "Direct yes/no request without formal authority." },
          { label: "Direct command from authority → OBEDIENCE", mathLatex: "$\\text{Following a principal's evacuation order} = \\mathbf{\\text{Obedience}}$", plainWhy: "Authority hierarchy defines Obedience!" }
        ],
        answerLatex: "$$\\text{Peers = Conformity; Request = Compliance; Authority = Obedience}$$",
        commonTrap: "Real leadership doesn't rely on blind Obedience — Servant Leadership inspires voluntary commitment!"
      },
      "wlns-fitness-excellence": {
        heroFormula: "$$\\text{FITT} = \\text{Frequency} + \\text{Intensity} + \\text{Time} + \\text{Type}, \\qquad \\text{Max HR} \\approx 220 - \\text{age}$$",
        title: "Designing a Safe Student Workout With FITT",
        problemLatex: "$$\\text{Build a balanced weekly FITT plan for an 18-year-old student}$$",
        steps: [
          { label: "Calculate Safe Moderate Heart-Rate Zone", mathLatex: "$\\text{Max HR} = 220 - 18 = 202\\text{ bpm} \\implies 60\\% \\approx 121\\text{ bpm}$", plainWhy: "Moderate zone (50–70%) builds endurance safely without burnout!" },
          { label: "Set Frequency, Time & Type", mathLatex: "$\\text{F: 4 days/wk} \\;|\\; \\text{T: 35 min} \\;|\\; \\text{Type: Brisk walk/run + bodyweight + stretch}$", plainWhy: "Combines aerobic cardio, strength, and mobility!" },
          { label: "Protect Sleep Recovery & Excellence Mindset", mathLatex: "$7\\text{–}9\\text{ hrs sleep} + \\text{1\\% daily consistency} > \\text{all-or-nothing perfectionism}$", plainWhy: "Consistency beats occasional extreme workouts every single time!" }
        ],
        answerLatex: "$$\\text{Sustainable FITT + Sleep Recovery = Lifelong Fitness}$$",
        commonTrap: "Perfectionism says 'I missed Monday so the whole week is ruined!' — Excellence simply resumes Tuesday!"
      },
      "wlns-money-literacy": {
        heroFormula: "$$\\text{50\\% Needs} \\;\\big|\\; \\text{30\\% Wants} \\;\\big|\\; \\text{20\\% Save/Invest}, \\qquad A = P\\left(1 + \\frac{r}{n}\\right)^{nt}$$",
        title: "Splitting Monthly Income & Seeing Compound Snowball",
        problemLatex: "$$\\text{Income = ₱12,000/month — apply 50/30/20 and check 10\\% compounding}$$",
        steps: [
          { label: "Pay Yourself First (20% Savings/Emergency Fund)", mathLatex: "$0.20 \\times 12{,}000 = \\mathbf{\\text{₱2,400 saved FIRST!}}$", plainWhy: "Automate savings the day money arrives so wants never eat it!" },
          { label: "Cover Needs (50%) and Cap Wants (30%)", mathLatex: "$\\text{Needs} = \\text{₱6,000}, \\qquad \\text{Wants} = \\text{₱3,600}$", plainWhy: "Guilt-free fun inside ₱3,600 once needs and savings are secured!" },
          { label: "Respect Compounding (Both Ways!)", mathLatex: "$\\text{Invested } 10\\% \\to \\text{doubles in } \\approx 7.2\\text{ yrs}; \\quad 30\\%\\text{ credit debt doubles in } 2.4\\text{ yrs!}$", plainWhy: "Make compound interest work FOR you, never against you!" }
        ],
        answerLatex: "$$\\text{₱6,000 Needs} \\;|\\; \\text{₱3,600 Wants} \\;|\\; \\text{₱2,400 Saved}$$",
        commonTrap: "Saving 'whatever is left at month's end' almost always equals ₱0 — ALWAYS Pay Yourself First!"
      },
      "wlns-leadership-legacy-godpreneur": {
        heroFormula: "$$\\text{Purpose-Driven Impact} = \\text{Integrity} + \\text{Competence} + \\text{Multiplying Others}$$",
        title: "Evaluating a Values-Driven Venture Decision",
        problemLatex: "$$\\text{Supplier offers cheaper, unsafe packaging that boosts profit 15\\% — decide!}$$",
        steps: [
          { label: "Apply the Stewardship & Ethics Test", mathLatex: "$\\text{Hidden safety defect violates customer trust & integrity} \\implies \\text{REJECT!}$", plainWhy: "Short-term extra margin isn't worth harming customers or destroying reputation." },
          { label: "Innovate Honestly Instead", mathLatex: "$\\text{Negotiate bulk eco-safe packaging or trim waste} \\to \\text{Win-Win margin}$", plainWhy: "Real entrepreneurs solve constraints creatively rather than cutting ethical corners!" },
          { label: "Measure Legacy Beyond One Sale", mathLatex: "$\\text{Repeat trust} + \\text{proud team culture} = \\mathbf{\\text{Durable Legacy}}$", plainWhy: "Ethical excellence compounds brand equity over decades!" }
        ],
        answerLatex: "$$\\text{Protect Integrity + Innovate Value = Lasting Legacy}$$",
        commonTrap: "Never frame profit and purpose as enemies — honest value creation sustains BOTH!"
      },
      "math-vectors-3d-dot-cross": {
        heroFormula: "$$\\vec{A}\\cdot\\vec{B} = AB\\cos\\theta \\;(\\text{Scalar}), \\qquad |\\vec{A}\\times\\vec{B}| = AB\\sin\\theta \\;(\\perp\\text{ Vector})$$",
        title: "Dot vs Cross Product at Any Angle",
        problemLatex: "$$|\\vec{A}| = 6,\\; |\\vec{B}| = 4,\\; \\theta = 30^{\\circ}\\;(\\cos 30^{\\circ}=\\frac{\\sqrt{3}}{2},\\; \\sin 30^{\\circ}=\\frac{1}{2})$$",
        steps: [
          { label: "Compute Dot Product (Parallel overlap)", mathLatex: "$\\vec{A}\\cdot\\vec{B} = (6)(4)\\cos 30^{\\circ} = 24\\left(\\frac{\\sqrt{3}}{2}\\right) = \\mathbf{12\\sqrt{3}}$", plainWhy: "Outputs a plain number (just like Physics Work W = F·d cos θ)!" },
          { label: "Compute Cross Product Magnitude (Perpendicular area)", mathLatex: "$|\\vec{A}\\times\\vec{B}| = (6)(4)\\sin 30^{\\circ} = 24\\left(\\frac{1}{2}\\right) = \\mathbf{12}$", plainWhy: "Outputs a vector perpendicular to both A and B (like Torque & F = qv × B)!" },
          { label: "Check Extreme Angles (0° vs 90°)", mathLatex: "$\\theta = 0^{\\circ} \\implies \\text{Cross}=0; \\qquad \\theta = 90^{\\circ} \\implies \\text{Dot}=0$", plainWhy: "Dot and Cross are exact complements: cos vs sin!" }
        ],
        answerLatex: "$$\\text{Dot} = 12\\sqrt{3}, \\quad |\\text{Cross}| = 12$$",
        commonTrap: "Remember A × B = −(B × A) — reversing cross product order flips the Right-Hand Rule vector 180°!"
      },
      "math-trig-identities-laws": {
        heroFormula: "$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}, \\qquad c^2 = a^2 + b^2 - 2ab\\cos C$$",
        title: "Solving an Oblique Triangle With Law of Cosines",
        problemLatex: "$$a = 5,\\; b = 8,\\; C = 60^{\\circ}\\;(\\cos 60^{\\circ} = 0.5) \\implies c = \\text{?}$$",
        steps: [
          { label: "Spot SAS (two sides + included angle) → Law of Cosines", mathLatex: "$c^2 = a^2 + b^2 - 2ab\\cos C$", plainWhy: "No opposite side/angle pair exists yet, so Law of Cosines starts first!" },
          { label: "Substitute numbers carefully", mathLatex: "$c^2 = 5^2 + 8^2 - 2(5)(8)(0.5) = 25 + 64 - 40 = 49$", plainWhy: "Remember PEMDAS: evaluate 2ab cos C completely before subtracting!" },
          { label: "Take the positive square root", mathLatex: "$c = \\sqrt{49} = \\mathbf{7}$", plainWhy: "Clean integer answer — notice how C = 90° collapses right back to Pythagoras!" }
        ],
        answerLatex: "$$c = 7$$",
        commonTrap: "When angle C is obtuse (> 90°), cos C is NEGATIVE, so −2ab cos C becomes a PLUS!"
      },
      "math-integration-techniques": {
        heroFormula: "$$\\int u\\,dv = uv - \\int v\\,du \\quad (\\text{LIATE: Logs, InvTrig, Alg, Trig, Exp})$$",
        title: "Integration by Parts on ∫ x·eˣ dx via LIATE",
        problemLatex: "$$\\int x\\,e^x\\,dx = \\text{?}$$",
        steps: [
          { label: "Pick u using LIATE (Algebraic x beats Exponential eˣ!)", mathLatex: "$u = x \\implies du = dx; \\qquad dv = e^x\\,dx \\implies v = e^x$", plainWhy: "Differentiating x turns it into 1, making the leftover integral trivial!" },
          { label: "Plug into uv − ∫ v du", mathLatex: "$x\\,e^x - \\int e^x\\,dx$", plainWhy: "Exact reverse of the Product Rule!" },
          { label: "Finish the simple remaining integral", mathLatex: "$\\mathbf{x\\,e^x - e^x + C}$", plainWhy: "Quick derivative check: (1·eˣ + x·eˣ) − eˣ = x·eˣ ✓!" }
        ],
        answerLatex: "$$x\\,e^x - e^x + C$$",
        commonTrap: "Always verify Integration by Parts by differentiating your final answer — takes 3 seconds!"
      },
      "math-financial-compound-annuities": {
        heroFormula: "$$F = P\\left(1 + \\frac{r}{m}\\right)^{mt}, \\qquad t_{\\text{double}} \\approx \\frac{72}{r\\%}, \\qquad (p \\to q) \\equiv (\\neg q \\to \\neg p)$$",
        title: "Quarterly Compounding & Implication Truth Table",
        problemLatex: "$$\\text{₱10,000 at } 12\\%\\text{ compounded quarterly for } 1\\text{ year} \\implies F = \\text{?}$$",
        steps: [
          { label: "Find rate per period j = r/m and total periods n = mt", mathLatex: "$j = \\frac{0.12}{4} = 0.03\\;(3\\%\\text{/qtr}), \\qquad n = 4 \\times 1 = 4\\text{ periods}$", plainWhy: "Always match the interest rate AND period count to the compounding frequency m!" },
          { label: "Plug into Compound Growth formula", mathLatex: "$F = 10{,}000(1 + 0.03)^4 = 10{,}000(1.1255) = \\mathbf{\\text{₱11,255}}$", plainWhy: "Quarterly compounding earns ₱55 MORE than simple 12% (₱11,200)!" },
          { label: "Estimate doubling time with Rule of 72", mathLatex: "$t_{\\text{double}} \\approx \\frac{72}{12} = \\mathbf{6\\text{ years}}$", plainWhy: "Instant sanity check for any compounding rate!" }
        ],
        answerLatex: "$$F \\approx \\text{₱11,255} \\quad (\\text{Doubles in } \\approx 6\\text{ yrs})$$",
        commonTrap: "Never plug annual rate r directly into (1 + r)^(mt) without dividing r by m first!"
      }
    });
  }
})(typeof window !== "undefined" ? window : globalThis);
