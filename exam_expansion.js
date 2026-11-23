(function (root) {
  "use strict";

  const DATA = root.MATHLINGO_DATA;
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

  function numOpts(ans, deltas) {
    const s = new Set([String(ans)]);
    for (const d of shuffle(deltas || [-3, -2, -1, 1, 2, 3, 4])) {
      if (s.size >= 4) break;
      const v = ans + d;
      if (v !== ans) s.add(String(v));
    }
    let k = 1;
    while (s.size < 4) {
      if (!s.has(String(ans + k))) s.add(String(ans + k));
      k++;
    }
    return shuffle(Array.from(s));
  }

  function strOpts(ans, pool) {
    const s = new Set([String(ans)]);
    for (const p of shuffle(pool)) {
      if (s.size >= 4) break;
      const str = String(p);
      if (str !== String(ans)) s.add(str);
    }
    let k = 1;
    while (s.size < 4) {
      s.add(String(ans) + " (" + k + ")");
      k++;
    }
    return shuffle(Array.from(s));
  }

  // ==================== FLEXIBLE ANSWER EQUIVALENCE ENGINE ====================
  function cleanRawExpr(s) {
    return String(s == null ? "" : s)
      .trim()
      .toLowerCase()
      .replace(/−/g, "-")
      .replace(/[×⋅·]/g, "*")
      .replace(/÷/g, "/")
      .replace(/\s+/g, "")
      .replace(/(\d),(?=\d{3}(?!\d))/g, "$1")
      .replace(/sqrt\(([^)]+)\)/g, "√$1");
  }

  function parseNumericOrFraction(str) {
    let s = str
      .replace(/^[$₱€£+]+/, "")
      .replace(/(?:km\/h|m\/s\^?2|m\/s²|m\/s|g\/mol|moles?|joules?|newtons?|volts?|amps?|units?|deg|m\^?2|m²|cm|kg|°c|°f|°|g|j|n|v|a|k|m|%)$/, "");
    if (!s) return null;
    if (/^[+-]?\d+(?:\.\d+)?$/.test(s)) {
      const val = Number(s);
      return Number.isFinite(val) ? val : null;
    }
    const fracMatch = s.match(/^([+-]?\d+(?:\.\d+)?)\/([+-]?\d+(?:\.\d+)?)$/);
    if (fracMatch) {
      const num = Number(fracMatch[1]);
      const den = Number(fracMatch[2]);
      if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) return null;
      return num / den;
    }
    return null;
  }

  function normalizeFactorProduct(str) {
    const compact = str.replace(/\)\*\(/g, ")(");
    const m = compact.match(/^([+-]?\d*\.?\d*)((?:\([^()]+\))+)$/);
    if (!m) return null;
    const factors = [];
    m[2].replace(/\([^()]+\)/g, (grp) => {
      factors.push(grp);
      return grp;
    });
    if (factors.length < 2) return null;
    factors.sort();
    return m[1] + factors.join("");
  }

  DATA.answersMatch = function (userRaw, expectedRaw) {
    const rawExpected = String(expectedRaw == null ? "" : expectedRaw).trim();
    const rawUser = String(userRaw == null ? "" : userRaw).trim();
    if (!rawUser || !rawExpected) return false;

    // Preserve separators for multi-number outputs like "3 2" so "32" is NOT falsely accepted!
    if (/^[+-]?\d+(?:\.\d+)?(?:\s+[+-]?\d+(?:\.\d+)?)+$/.test(rawExpected)) {
      const eToks = rawExpected.replace(/−/g, "-").split(/\s+/);
      const uToks = rawUser.replace(/−/g, "-").replace(/[,;]+/g, " ").trim().split(/\s+/);
      if (uToks.length !== eToks.length) return false;
      return eToks.every((et, idx) => {
        const a = Number(et);
        const b = Number(uToks[idx]);
        return Number.isFinite(a) && Number.isFinite(b) ? Math.abs(a - b) < 1e-9 : et === uToks[idx];
      });
    }

    let u = cleanRawExpr(userRaw);
    const e = cleanRawExpr(expectedRaw);
    if (!u || !e) return false;
    if (u === e) return true;

    if (!e.includes("=")) {
      u = u.replace(/^[a-z]\w*=/, "");
    }
    if (u === e) return true;

    const uNoCur = u.replace(/^[$₱€£]/, "");
    const eNoCur = e.replace(/^[$₱€£]/, "");
    if (uNoCur === eNoCur) return true;

    const uNum = parseNumericOrFraction(u);
    const eNum = parseNumericOrFraction(e);
    if (uNum !== null && eNum !== null && Math.abs(uNum - eNum) < 1e-9) {
      return true;
    }

    const uFac = normalizeFactorProduct(u);
    const eFac = normalizeFactorProduct(e);
    if (uFac !== null && eFac !== null && uFac === eFac) {
      return true;
    }

    return false;
  };

  // ==================== WORLD 9: VERBAL, READING & LOGIC ====================
  DATA.WORLDS.push({
    id: "verbal-logic",
    subject: "verbal",
    order: 9,
    icon: "🗣️",
    title: "Verbal & Logic: Grammar, Reading & Deduction",
    subtitle: "Grammar architecture, reading inference, word roots/analogies & symbolic deductive logic for college entrance exams!",
    color: "#8c6223",
    colorDark: "#644414",
    bgSoft: "rgba(140, 98, 35, 0.11)",
    borderSoft: "rgba(140, 98, 35, 0.30)"
  });

  // ==================== 18 NEW EXAM-CRITICAL NODES (TOTAL 76) ====================
  const NEW_EXAM_NODES = [
    // --- MATH (+4) ---
    {
      id: "abs-value-inequalities",
      worldId: "junior",
      order: 59,
      title: "Absolute Value Equations & Inequalities",
      icon: "🪞",
      tagline: "|x| is pure distance from zero! `<` makes an AND sandwich, `>` splits into OR wings.",
      scaryVersion: "Piecewise distance metric inequalities |ax + b| ≤ c and sign-split solution intervals.",
      easyTruth: "Absolute value just asks 'how far from home?' For |x − c| < r, you're trapped INSIDE radius r (c − r < x < c + r). For |x − c| > r, you escaped OUTSIDE both wings!",
      microSteps: [
        { label: "Step 1: Two Branches for =", text: "|2x − 4| = 10 splits into TWO equations: 2x − 4 = +10 (x = 7) AND 2x − 4 = −10 (x = −3). Note: |box| = −5 has ZERO solutions!" },
        { label: "Step 2: Less Than (<) = AND Sandwich", text: "Think 'Less thAND'! |x − 5| < 3 means −3 < x − 5 < +3 → add 5 everywhere → 2 < x < 8 (one middle interval!)." },
        { label: "Step 3: GreatOR Than (>) = OR Wings", text: "Think 'GreatOR'! |x − 5| > 3 means x − 5 > 3 OR x − 5 < −3 → x > 8 or x < 2. Bonus: flipping ×/(−) reverses the sign!" }
      ],
      cheatCode: "Isolate |...| first! Less thAND (inside: −c < u < c); GreatOR (outside: u < −c or u > c). Negative on RHS → check if No Solution or All Reals!",
      visualizerId: "numberLineMake10",
      questions: [
        { type: "mc", prompt: "Solve |x − 4| = 6 for ALL solutions of x:", options: ["x = 10 only", "x = 10 or x = −2", "x = 2 or x = −10", "x = 6 or x = −6"], answer: "x = 10 or x = −2", hint: "Split into x − 4 = 6 AND x − 4 = −6!", whyEasy: "x − 4 = 6 → 10; x − 4 = −6 → −2!" },
        { type: "mc", prompt: "What is the solution set for |x + 2| = −3?", options: ["x = 1 or −5", "x = −5 only", "No solution (∅)", "All real numbers"], answer: "No solution (∅)", hint: "Distance can NEVER be negative!", whyEasy: "Absolute value output is always ≥ 0, so it can never equal −3!" },
        { type: "mc", prompt: "Solve |x − 5| ≤ 2:", options: ["3 ≤ x ≤ 7", "x ≤ 3 or x ≥ 7", "−2 ≤ x ≤ 2", "x ≤ 7 only"], answer: "3 ≤ x ≤ 7", hint: "Less thAND sandwich: −2 ≤ x − 5 ≤ 2!", whyEasy: "Add 5 across all 3 parts: 3 ≤ x ≤ 7!" },
        { type: "input", prompt: "If −3x > 15, x < ? (Type the boundary number only)", answer: "-5", hint: "Dividing by a negative flips > to <!", whyEasy: "15 ÷ (−3) = −5 (so x < −5)!" },
        { type: "mc", prompt: "Solve |x − 1| > 4:", options: ["−3 < x < 5", "x < −3 or x > 5", "x > 5 only", "−5 < x < 3"], answer: "x < −3 or x > 5", hint: "GreatOR wings: x − 1 > 4 OR x − 1 < −4!", whyEasy: "Branches give x > 5 or x < −3!" }
      ]
    },
    {
      id: "rational-radical-equations",
      worldId: "senior",
      order: 60,
      title: "Rational, Asymptotes & Radical Equations",
      icon: "🚧",
      tagline: "Zero on the bottom builds an electric fence (VA)! Squaring can birth fake roots — check them!",
      scaryVersion: "Domain restrictions, vertical/horizontal asymptote limits, and extraneous radical solution pruning.",
      easyTruth: "Dividing by zero explodes → any x making denominator = 0 is banned (Vertical Asymptote or Hole). When you square both sides of √(x) = something, always plug your answer back in to catch impostors!",
      microSteps: [
        { label: "Step 1: Vertical Asymptote = Bottom Zero", text: "In f(x) = (x + 2)/(x − 5), denominator x − 5 = 0 at x = 5. If (x − 5) didn't cancel with the top, x = 5 is a Vertical Asymptote!" },
        { label: "Step 2: Horizontal Asymptote = Compare Degrees", text: "BOBO BOTN EATS DC: Bigger On Bottom → y = 0; Bigger On Top → None; Exponents Are The Same → Divide Coefficients! E.g. (6x² + 1)/(2x² − 9) → y = 6/2 = 3." },
        { label: "Step 3: Radical Extraneous Check", text: "Solve √(2x + 1) = x − 1: square both sides → 2x + 1 = x² − 2x + 1 → x(x − 4) = 0 → x = 0 or 4. Plug x = 0 back: √1 = −1 FALSE! Only x = 4 survives!" }
      ],
      cheatCode: "Bottom = 0 (uncanceled) → Vertical Asymptote. Same top/bottom degree → Divide lead coeffs! Always test √ equation roots against the original!",
      visualizerId: "algebraBalanceScale",
      questions: [
        { type: "mc", prompt: "What is the Vertical Asymptote of f(x) = (x + 3) / (x − 7)?", options: ["x = −3", "x = 7", "y = 1", "x = 0"], answer: "x = 7", hint: "Set denominator = 0!", whyEasy: "x − 7 = 0 → vertical wall at x = 7!" },
        { type: "input", prompt: "Horizontal asymptote y = ? for f(x) = (8x² + 5x) / (2x² − 9):", answer: "4", hint: "Same top and bottom degree (x²) → Divide Leading Coefficients!", whyEasy: "8 ÷ 2 = 4 → y = 4!" },
        { type: "mc", prompt: "Solve √(x + 6) = x. Watch for extraneous roots!", options: ["x = 3 and x = −2", "x = 3 only", "x = −2 only", "No solution"], answer: "x = 3 only", hint: "Square both sides (x² − x − 6 = 0), then check signs!", whyEasy: "x = −2 gives √4 = −2 (false for principal √); x = 3 gives √9 = 3 (true)!" },
        { type: "mc", prompt: "Solve: 3/x + 1/2 = 5/x", options: ["x = 4", "x = 2", "x = 1", "x = 8"], answer: "x = 4", hint: "Subtract 3/x from both sides → 1/2 = 2/x!", whyEasy: "Cross-multiply 1/2 = 2/x → x = 4!" },
        { type: "mc", prompt: "Simplify & find Hole in f(x) = (x² − 9) / (x − 3):", options: ["Hole at x = 3, y = 6", "Vertical asymptote at x = 3", "Hole at x = −3", "No restrictions"], answer: "Hole at x = 3, y = 6", hint: "Factor top as (x−3)(x+3) and cancel (x−3)!", whyEasy: "Canceling leaves x + 3; plug x = 3 → Hole at (3, 6)!" }
      ]
    },
    {
      id: "circles-3d-geometry",
      worldId: "senior",
      order: 61,
      title: "Circle Theorems & 3D Volumes",
      icon: "🏀",
      tagline: "Inscribed angle is HALF the central arc. Cones are ⅓ of a cylinder; Spheres are 4/3πr³!",
      scaryVersion: "Euclidean chord-secant power theorems, inscribed angles, and solid mensuration.",
      easyTruth: "Everything circular connects cleanly: step back from center to edge and angles halve; pointy 3D shapes (cone/pyramid) always hold ⅓ the volume of their flat-top twin (cylinder/prism)!",
      microSteps: [
        { label: "Step 1: Center vs Edge & Tangent 90°", text: "Central angle = arc degrees; Inscribed angle on edge = ½ arc! A tangent line ALWAYS hits the radius at 90°." },
        { label: "Step 2: Intersecting Chords Power Law", text: "Two chords crossing inside a circle split into segments (a, b) and (c, d) with a · b = c · d!" },
        { label: "Step 3: Pointy = ⅓ Base·Height", text: "Cylinder = πr²h → Cone = ⅓πr²h. Box = lwh → Pyramid = ⅓lwh. Sphere Volume = (4/3)πr³ and Surface Area = 4πr²." }
      ],
      cheatCode: "Inscribed = ½ Central Arc. Chords: part×part = part×part. Cone = ⅓ Cylinder; Sphere V = 4/3 πr³!",
      visualizerId: "geometryLogicLab",
      questions: [
        { type: "input", prompt: "A central angle measures 110°. How many degrees is an inscribed angle catching the same arc?", answer: "55", hint: "Inscribed angle = HALF the intercepted arc!", whyEasy: "110° ÷ 2 = 55°!" },
        { type: "input", prompt: "Two chords intersect inside a circle. Chord 1 splits into 4 and 9. Chord 2 splits into 6 and x. Find x:", answer: "6", hint: "a · b = c · d!", whyEasy: "4 × 9 = 36 = 6 × x → x = 6!" },
        { type: "mc", prompt: "A cone and a cylinder have the SAME radius & height. Cylinder holds 60 cm³. Cone holds:", options: ["20 cm³", "30 cm³", "15 cm³", "180 cm³"], answer: "20 cm³", hint: "Cones always hold ⅓ of the matching cylinder!", whyEasy: "60 ÷ 3 = 20 cm³!" },
        { type: "mc", prompt: "A line tangent to a circle meets the radius at the point of tangency. The angle formed is:", options: ["45°", "60°", "90°", "180°"], answer: "90°", hint: "Tangent just grazes perpendicular to the radius!", whyEasy: "Tangent ⊥ Radius ALWAYS = 90°!" },
        { type: "mc", prompt: "If you DOUBLE a sphere's radius r → 2r, its volume becomes how many times larger?", options: ["2×", "4×", "6×", "8×"], answer: "8×", hint: "Volume has r³ → 2³!", whyEasy: "(2r)³ = 8r³ → 8× the volume!" }
      ]
    },
    {
      id: "permutations-combinatorics-piecewise",
      worldId: "senior",
      order: 62,
      title: "Combinatorics (nPr/nCr) & Piecewise Graphs",
      icon: "🎰",
      tagline: "Order matters? P for Position! Order irrelevant? C for Committee (divide duplicates). Piecewise = pick rule by x!",
      scaryVersion: "Ordered permutations with repetition, combinations, and piecewise domain evaluation.",
      easyTruth: "Stop guessing nPr vs nCr! Ask: 'Does Gold-Silver-Bronze care who comes 1st?' YES → Multiply slots (P). 'Does picking 3 pizza toppings care which went on first?' NO → Divide by k! (C).",
      microSteps: [
        { label: "Step 1: Slots & Repeats", text: "Arrange all letters of 'MOON' (4 letters, two O's): 4! / 2! = 24 / 2 = 12 unique words! Divide out identical duplicates." },
        { label: "Step 2: nPr vs nCr", text: "Choose President + VP from 5: 5 × 4 = 20 (order matters!). Choose a 2-person committee from 5: (5 × 4)/2! = 10." },
        { label: "Step 3: Piecewise Fence Check", text: "In f(x) = { 2x + 1 if x < 3; x² if x ≥ 3 }, plug f(3) ONLY into the ≥ 3 branch → 3² = 9!" }
      ],
      cheatCode: "Position/Password/Rank → nPr (no divide). Committee/Hand → nCr = nPr / r!. Duplicate letters in word → n! / (a!b!...).",
      visualizerId: "numberPatternSieve",
      questions: [
        { type: "input", prompt: "In how many ways can 1st, 2nd, and 3rd medals be awarded among 6 runners?", answer: "120", hint: "Order matters! Slots: 6 × 5 × 4.", whyEasy: "6 × 5 × 4 = 120!" },
        { type: "input", prompt: "How many distinct 4-letter arrangements can be made from the letters in 'BOOK'?", answer: "12", hint: "4! divided by 2! for the two O's!", whyEasy: "24 ÷ 2 = 12!" },
        { type: "mc", prompt: "Evaluate f(2) if f(x) = { 3x − 1 for x < 2; x² + 5 for x ≥ 2 }:", options: ["5", "9", "14", "1"], answer: "9", hint: "Check which inequality includes x = 2 (≥ 2)!", whyEasy: "x = 2 enters the second rule: 2² + 5 = 9!" },
        { type: "input", prompt: "Choose a 3-person study group from 6 students (order doesn't matter):", answer: "20", hint: "(6 × 5 × 4) ÷ 3! = 120 ÷ 6.", whyEasy: "₆C₃ = 20 committees!" },
        { type: "mc", prompt: "A PIN has 2 letters (A–Z, repeats allowed) followed by 1 digit (0–9). How many PINs?", options: ["26 + 26 + 10", "26 × 25 × 10", "26 × 26 × 10 = 6,760", "26 × 10 = 260"], answer: "26 × 26 × 10 = 6,760", hint: "Independent slots multiply together!", whyEasy: "26 choices × 26 choices × 10 choices = 6,760!" }
      ]
    },

    // --- PHYSICS (+3) ---
    {
      id: "physics-projectiles-circular-torque",
      worldId: "physics",
      order: 63,
      title: "2D Projectiles, Circular Motion & Torque",
      icon: "🎯",
      tagline: "Horizontal X and vertical Y never mix! Circles yank inward (mv²/r); Levers spin by F × d!",
      scaryVersion: "2D parabolic ballistic kinematics, centripetal dynamics, and rotational static equilibrium.",
      easyTruth: "A launched ball moves sideways at constant speed like an air-hockey puck while simultaneously dropping straight down under gravity. And to balance any seesaw, Weight × Distance on Left = Weight × Distance on Right!",
      microSteps: [
        { label: "Step 1: X and Y Independence", text: "Kick a ball horizontally off a cliff vs drop a rock from the same cliff → BOTH hit the ground at the EXACT same second! Horizontal speed never pulls downward (v_x stays constant)." },
        { label: "Step 2: Centripetal Acceleration a_c = v²/r", text: "Even at constant speed around a circle, direction changes — pointing straight INWARD! Double speed → 4× centripetal force required!" },
        { label: "Step 3: Torque Seesaw τ = F · d", text: "A 20 N weight at 3 m gives τ = 60 N·m. To balance it at 2 m on the other side needs 60 ÷ 2 = 30 N!" }
      ],
      cheatCode: "Projectile flight time ONLY depends on vertical height & v_y0! Centripetal a_c = v²/r points inward. Seesaw balance: F₁d₁ = F₂d₂.",
      visualizerId: "physicsCircuitAndMotionLab",
      questions: [
        { type: "mc", prompt: "Ball A is dropped vertically from a 45 m cliff. Ball B is fired horizontally at 30 m/s from the same cliff. Who lands first?", options: ["Ball A (dropped)", "Ball B (faster)", "Exact same time", "Depends on mass"], answer: "Exact same time", hint: "Vertical gravity accelerates X-free balls identically!", whyEasy: "Horizontal motion doesn't affect vertical fall time!" },
        { type: "input", prompt: "A 2 kg ball spins in a 3 m circle at v = 6 m/s. Centripetal acceleration v²/r (m/s²)?", answer: "12", hint: "6² ÷ 3 = 36 ÷ 3.", whyEasy: "36 ÷ 3 = 12 m/s² (F_c = 24 N)!" },
        { type: "input", prompt: "Seesaw balance: 40 N child sits 3 m left of fulcrum. How far right (m) must a 60 N friend sit?", answer: "2", hint: "40 × 3 = 60 × d.", whyEasy: "120 ÷ 60 = 2 m!" },
        { type: "mc", prompt: "At the very top peak of a projectile's arc (launched at 45°), its vertical velocity v_y is:", options: ["Equal to launch speed", "0 m/s", "9.8 m/s", "Maximum"], answer: "0 m/s", hint: "It pauses vertically for an instant before falling back down!", whyEasy: "At max height, v_y = 0 (while v_x stays nonzero)!" },
        { type: "mc", prompt: "How does maximum horizontal range work for two complementary angles (say 30° and 60°)?", options: ["60° lands farther", "30° lands farther", "Same horizontal range!", "45° lands shortest"], answer: "Same horizontal range!", hint: "sin(2×30°) = sin(60°) and sin(2×60°) = sin(120°)!", whyEasy: "Complementary angles (adding to 90°) yield identical flat-ground range!" }
      ]
    },
    {
      id: "physics-thermo-fluids",
      worldId: "physics",
      order: 64,
      title: "Thermodynamics (Q=mcΔT) & Fluids",
      icon: "🔥",
      tagline: "High specific heat = thermal stubbornness. Pinch a hose → water speeds up (A₁v₁ = A₂v₂)!",
      scaryVersion: "Calorimetry heat transfer, Archimedes buoyancy, hydrostatics, and fluid continuity.",
      easyTruth: "Specific heat c is how stubbornly a material refuses to change temperature (water = huge c = coastal moderation!). Archimedes' rule: buoyant up-push equals simply the weight of displaced fluid!",
      microSteps: [
        { label: "Step 1: Calorimetry Q = m · c · ΔT", text: "Add Q heat Joules: Mass (kg or g) × Specific Heat c × Temperature jump (T_final − T_initial). Wait — during boiling/melting, ΔT = 0°C because heat breaks bonds instead (Latent Heat Q = mL)!" },
        { label: "Step 2: Pressure & Hydraulics P = F/A", text: "Pressure rises with depth: P = P₀ + ρgh. Pushing a small piston (F₁/A₁) lifts a car on a huge piston (F₂/A₂)!" },
        { label: "Step 3: Continuity A₁v₁ = A₂v₂", text: "Thumb over a garden hose halves area A → water shoots out TWICE as fast (v₂ = 2v₁)!" }
      ],
      cheatCode: "Q = mcΔT (zero ΔT during phase change!). Buoyant Force = Weight of displaced fluid. Narrower pipe = Faster flow (A₁v₁ = A₂v₂).",
      visualizerId: "thermoPhaseLab",
      questions: [
        { type: "input", prompt: "Specific heat of metal c = 0.5 J/(g·°C). Heat Q (Joules) to raise 200 g by 10°C?", answer: "1000", hint: "Q = m · c · ΔT = 200 × 0.5 × 10.", whyEasy: "200 × 0.5 × 10 = 1,000 J!" },
        { type: "mc", prompt: "While ice at 0°C is actively melting into 0°C liquid water, adding more heat causes temperature to:", options: ["Stay constant at 0°C until melted", "Jump immediately to 10°C", "Drop below 0°C", "Double every minute"], answer: "Stay constant at 0°C until melted", hint: "Latent heat breaks crystal bonds instead of speeding molecules!", whyEasy: "During a phase change, temperature plateaus flat!" },
        { type: "input", prompt: "Water flows at 2 m/s through a pipe of area 6 cm². When the pipe narrows to 3 cm², speed (m/s)?", answer: "4", hint: "A₁v₁ = A₂v₂ → 6 × 2 = 3 × v₂!", whyEasy: "Area halved → speed doubles to 4 m/s!" },
        { type: "mc", prompt: "Hydraulic lift: Small piston area = 2 cm², Big piston area = 20 cm². Push small piston with 50 N. Lift capacity?", options: ["50 N", "100 N", "500 N", "2,000 N"], answer: "500 N", hint: "Area multiplies by 10× → Force multiplies by 10×!", whyEasy: "50/2 = F₂/20 → F₂ = 500 N!" },
        { type: "mc", prompt: "A block displaces 15 N worth of water when submerged. Its upward buoyant force is:", options: ["Always 15 N", "Half its own mass", "Zero", "Dependent on color"], answer: "Always 15 N", hint: "Archimedes' Principle!", whyEasy: "Buoyant Force = Weight of fluid pushed aside = 15 N!" }
      ]
    },
    {
      id: "physics-optics-magnetism",
      worldId: "physics",
      order: 65,
      title: "Optics (Snell & Lenses) & Magnetism",
      icon: "🔬",
      tagline: "Dense glass slows light (bends toward normal). Thin lens 1/f = 1/do + 1/di. Moving charges feel magnets!",
      scaryVersion: "Geometric ray optics, refractive dispersion, and Lorentz magnetic force dynamics.",
      easyTruth: "Imagine a car's front wheel hitting thick mud at an angle: the mud wheel slows first, steering the car INWARD toward the normal line! Same exact reason light refracts!",
      microSteps: [
        { label: "Step 1: Thin Lens / Mirror Equation", text: "1/f = 1/d_o + 1/d_i. Magnification m = −d_i/d_o (negative m = upside-down Real image; object at 2f gives an inverted same-size real image at 2f!)." },
        { label: "Step 2: Snell's Refraction & Prism Dispersion", text: "Air (n = 1.0) → Glass (n = 1.5): light slows down and bends TOWARD the normal line. Shorter wavelengths (Violet) have a slightly higher refractive index n than Red, so Violet bends MORE through a prism!" },
        { label: "Step 3: Lorentz Magnetic Force F = |q|vB sin θ", text: "Magnetic fields ONLY push MOVING charges moving at an angle to B! If v = 0 (stationary) OR θ = 0° (parallel to B), sin 0° = 0 → ZERO magnetic force! Direction is perpendicular to BOTH v and B via the Right-Hand Rule." }
      ],
      cheatCode: "1/f = 1/d_o + 1/d_i. Low n → High n bends TOWARD normal (Violet bends most!). F = |q|vB sin θ → v = 0 or parallel gives 0 N!",
      visualizerId: "electroMagLab",
      questions: [
        { type: "input", prompt: "Converging lens has focal length f = 10 cm. Object placed at d_o = 20 cm. Image distance d_i (cm)?", answer: "20", hint: "1/10 = 1/20 + 1/d_i!", whyEasy: "1/10 − 1/20 = 1/20 → d_i = 20 cm!" },
        { type: "mc", prompt: "Light enters water (n=1.33) from air (n=1.00) at an angle. It slows down and bends:", options: ["Away from the normal", "Toward the normal", "Straight backward", "Does not bend"], answer: "Toward the normal", hint: "Higher index n = thicker 'mud' = bends toward normal!", whyEasy: "Low n → High n bends TOWARD the normal line!" },
        { type: "mc", prompt: "A stationary proton sits motionless inside a huge 10 T magnetic field. Magnetic force on it?", options: ["10 N", "Massive force", "0 N (Zero!)", "Depends on gravity"], answer: "0 N (Zero!)", hint: "Check F = q · v · B sin θ when v = 0!", whyEasy: "v = 0 → Zero magnetic force until the charge MOVES!" },
        { type: "mc", prompt: "When white light passes through a glass prism, why does Violet bend MORE than Red?", options: ["Violet travels faster in glass", "Violet has higher n (refractive index)", "Red is absorbed", "Gravity pulls violet"], answer: "Violet has higher n (refractive index)", hint: "Shorter wavelengths interact more and slow down more!", whyEasy: "Violet slows slightly more in glass → larger refraction angle!" },
        { type: "mc", prompt: "Place an object right at d_o = 2f of a converging lens. The image is:", options: ["Same size, inverted, at 2f", "Virtual and upright", "Infinitely large", "At the focus"], answer: "Same size, inverted, at 2f", hint: "d_i = 2f → magnification m = −2f/2f = −1!", whyEasy: "Object at 2f gives an inverted same-size real image at 2f!" }
      ]
    },

    // --- CHEMISTRY (+3) ---
    {
      id: "chem-electron-config-trends",
      worldId: "chemistry",
      order: 66,
      title: "Electron Configurations & Periodic Trends",
      icon: "⚛️",
      tagline: "Shells fill 1s² 2s² 2p⁶ 3s² 3p⁶! Atoms grow HUGE Down-Left; Electronegativity spikes Up-Right toward Fluorine!",
      scaryVersion: "Aufbau orbital filling notation and effective nuclear charge periodic trends.",
      easyTruth: "Think of an apartment building: s-floors have 1 room (2 e⁻), p-floors have 3 rooms (6 e⁻). Moving DOWN adds a brand new floor (huge size); moving RIGHT squeezes electrons tighter with extra protons!",
      microSteps: [
        { label: "Step 1: s Holds 2, p Holds 6, d Holds 10", text: "Oxygen (#8): 1s² 2s² 2p⁴ (2 + 2 + 4 = 8 electrons!). Outermost shell (level 2) has 2 + 4 = 6 valence electrons." },
        { label: "Step 2: Atom Radius Shrinks Going Right!", text: "More protons in the SAME shell yank electrons tighter inward! So largest atoms sit Bottom-Left (Cs, Fr) and tiniest sit Top-Right (He, F)." },
        { label: "Step 3: Electronegativity Greed → Fluorine!", text: "Fluorine (F, Top-Right before Noble Gases) is the #1 electron thief! Noble gases don't greedily pull electrons (complete shell)." }
      ],
      cheatCode: "Order: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰. Atomic Size ↑ Down-Left; Ionization Energy & Electronegativity ↑ Up-Right (F = #1)!",
      visualizerId: "chemistryAtomPhLab",
      questions: [
        { type: "mc", prompt: "What is the electron configuration of Nitrogen (Atomic #7)?", options: ["1s² 2s² 2p⁶", "1s² 2s² 2p³", "1s² 2s³ 2p²", "1s² 2p⁵"], answer: "1s² 2s² 2p³", hint: "Superscripts must sum to 7 (s ≤ 2, p ≤ 6)!", whyEasy: "2 + 2 + 3 = 7 → 1s² 2s² 2p³!" },
        { type: "mc", prompt: "Which element has the HIGHEST Electronegativity (pulls shared electrons hardest)?", options: ["Cesium (Cs)", "Carbon (C)", "Fluorine (F)", "Neon (Ne)"], answer: "Fluorine (F)", hint: "Top-right reactive nonmetal (excluding inert Noble Gases)!", whyEasy: "Fluorine is the 4.0 electronegativity champion!" },
        { type: "mc", prompt: "As you move LEFT to RIGHT across Period 3 (Na → Cl), atomic radius:", options: ["Increases steadily", "Decreases (shrinks)", "Stays identical", "Doubles"], answer: "Decreases (shrinks)", hint: "Extra protons pull the same electron shell tighter!", whyEasy: "Higher nuclear charge pulls valence electrons closer → smaller radius!" },
        { type: "input", prompt: "Maximum number of electrons that can fit in ANY p-subshell (like 2p or 3p)?", answer: "6", hint: "3 orbitals × 2 electrons each!", whyEasy: "p holds 6 electrons (s=2, p=6, d=10, f=14)!" },
        { type: "mc", prompt: "Why are Neon (Ne) and Argon (Ar) chemically unreactive?", options: ["Full outer valence octet (8 e⁻)", "Zero protons", "Too heavy to move", "Metal bonding"], answer: "Full outer valence octet (8 e⁻)", hint: "8 valence electrons means zero desire to gain or lose!", whyEasy: "Complete valence octet = ultra-stable Noble Gas!" }
      ]
    },
    {
      id: "chem-vsepr-lewis-shapes",
      worldId: "chemistry",
      order: 67,
      title: "Lewis Octets & VSEPR 3D Shapes",
      icon: "💠",
      tagline: "Electron clouds hate crowding! 2 clouds = 180° Linear; 3 = 120° Planar; 4 = 109.5° Tetrahedral (lone pairs bend!).",
      scaryVersion: "Valence Shell Electron Pair Repulsion molecular geometry and dipole polarity.",
      easyTruth: "Imagine tying balloons together at a knot: 2 balloons point opposite (180° Linear); 3 form a flat triangle (120°); 4 spread into a 3D pyramid (Tetrahedral, 109.5°). Invisible lone pairs shove arms closer together!",
      microSteps: [
        { label: "Step 1: Count Electron Domains on Center Atom", text: "Single, double, or triple bonds each count as 1 domain, PLUS 1 domain for each lone pair!" },
        { label: "Step 2: 2 → Linear, 3 → Trigonal Planar, 4 → Tetrahedral", text: "CO₂ has 2 double bonds & 0 lone pairs on C → 180° Linear! CH₄ has 4 bonds & 0 lone pairs → 109.5° Tetrahedral." },
        { label: "Step 3: Lone Pairs Bend Symmetry → Polar!", text: "H₂O has 2 bonds + 2 lone pairs on O → Bent (~104.5°)! Even though symmetrical CO₂ cancels dipoles (Nonpolar), Bent H₂O doesn't cancel → POLAR!" }
      ],
      cheatCode: "No lone pairs: 2=Linear (180°), 3=Trigonal Planar (120°), 4=Tetrahedral (109.5°). Lone pairs create Bent/Pyramidal Polar molecules!",
      visualizerId: "chemistryAtomPhLab",
      questions: [
        { type: "mc", prompt: "Carbon Dioxide (O=C=O) has 2 bonding regions and 0 lone pairs on Carbon. Its shape is:", options: ["Bent", "Linear (180°)", "Tetrahedral (109.5°)", "Trigonal Pyramidal"], answer: "Linear (180°)", hint: "2 balloons repel straight apart!", whyEasy: "O=C=O pushes to 180° Linear (making CO₂ nonpolar)!" },
        { type: "mc", prompt: "Methane (CH₄) has 4 single C−H bonds and 0 lone pairs. Its VSEPR geometry is:", options: ["Flat Square (90°)", "Linear (180°)", "Tetrahedral (109.5°)", "Trigonal Planar"], answer: "Tetrahedral (109.5°)", hint: "4 domains spread maximally in 3D space!", whyEasy: "4 clouds maximize separation at 109.5° Tetrahedral!" },
        { type: "mc", prompt: "Why is Water (H₂O) Bent instead of Linear?", options: ["Two lone electron pairs on Oxygen push H's down", "Hydrogen attracts Hydrogen", "Triple bond strain", "Carbon backbone"], answer: "Two lone electron pairs on Oxygen push H's down", hint: "4 electron clouds around O (2 bonds + 2 lone pairs)!", whyEasy: "Oxygen's 2 lone pairs repel the O−H bonds into a ~104.5° Bent V-shape!" },
        { type: "input", prompt: "How many TOTAL valence electrons are shared inside a single Triple Bond (like N≡N)?", answer: "6", hint: "1 bond line = 2 electrons → 3 lines = ?", whyEasy: "3 shared pairs × 2 = 6 electrons!" },
        { type: "mc", prompt: "Boron Trifluoride (BF₃) has 3 equal B−F bonds and 0 lone pairs on B. Bond angle?", options: ["90°", "109.5°", "120° (Trigonal Planar)", "180°"], answer: "120° (Trigonal Planar)", hint: "360° circle split evenly in 3!", whyEasy: "360° ÷ 3 = 120° flat triangle!" }
      ]
    },
    {
      id: "chem-equilibrium-redox-kinetics",
      worldId: "chemistry",
      order: 68,
      title: "Equilibrium, Kinetics & Redox (OIL RIG)",
      icon: "⚗️",
      tagline: "Stress a system and it pushes BACK (Le Chatelier). Catalysts lower the hill. OIL RIG tracks electrons!",
      scaryVersion: "Thermodynamic chemical equilibrium shifts, activation barriers, and half-reaction oxidation numbers.",
      easyTruth: "Reactions at equilibrium are stubborn: add more Reactant on the left → it shoves right to burn the excess! And OIL RIG saves every Redox question: Oxidation Is Loss (e⁻), Reduction Is Gain (e⁻)!",
      microSteps: [
        { label: "Step 1: Le Chatelier Pushes Away Stress", text: "In N₂ + 3H₂ ⇌ 2NH₃ + Heat: add N₂ → shifts RIGHT. Remove NH₃ → shifts RIGHT. Crank Pressure ↑ → shifts to side with FEWER gas moles (4 moles → 2 moles = RIGHT)!" },
        { label: "Step 2: Catalysts ONLY Lower Activation Hill", text: "A catalyst speeds up BOTH forward & reverse reactions equally by lowering E_a — it NEVER shifts equilibrium yield or changes ΔH!" },
        { label: "Step 3: OIL RIG (Oxidation Number Changes)", text: "Zn⁰ → Zn²⁺ + 2e⁻ (lost negatives, charge went UP 0 → +2 = OXIDIZED!). Cu²⁺ + 2e⁻ → Cu⁰ (charge went DOWN +2 → 0 = REDUCED!)." }
      ],
      cheatCode: "Le Chatelier shifts AWAY from what you add! Pressure ↑ favors FEWER gas moles. OIL RIG: Oxidation = e⁻ Loss (charge ↑); Reduction = e⁻ Gain (charge ↓).",
      visualizerId: "algebraBalanceScale",
      questions: [
        { type: "mc", prompt: "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), what happens if you INJECT extra H₂ gas?", options: ["Shifts Right (makes more NH₃)", "Shifts Left", "Nothing moves", "Catalyst melts"], answer: "Shifts Right (makes more NH₃)", hint: "Push away from the side where extra was added!", whyEasy: "System consumes added H₂ by shifting Right toward NH₃!" },
        { type: "mc", prompt: "In the half-reaction Fe²⁺ → Fe³⁺ + e⁻, Iron (Fe²⁺) is being:", options: ["Reduced (gained e⁻)", "Oxidized (lost e⁻)", "Neutralized", "Precipitated"], answer: "Oxidized (lost e⁻)", hint: "OIL = Oxidation Is Loss of electrons (charge climbs +2 → +3)!", whyEasy: "Losing an electron raises charge from +2 to +3 → Oxidation!" },
        { type: "mc", prompt: "How does a Catalyst speed up a chemical reaction?", options: ["Lowers Activation Energy (E_a) barrier", "Increases ΔH heat output", "Pushes equilibrium right only", "Adds reactant mass"], answer: "Lowers Activation Energy (E_a) barrier", hint: "Carves a tunnel through the mountain pass!", whyEasy: "Lower Activation Energy hill means more collisions succeed faster!" },
        { type: "mc", prompt: "If pressure is INCREASED on 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), which direction wins?", options: ["Right (3 gas moles → 2 gas moles)", "Left (makes more gas)", "No shift", "Stops reacting"], answer: "Right (3 gas moles → 2 gas moles)", hint: "Squeezing favors the side taking LESS gas volume!", whyEasy: "3 gas moles left vs 2 gas moles right → squeezes Right!" },
        { type: "input", prompt: "In neutral SO₃, Oxygen is −2 each. What is Sulfur's oxidation state (+?)?", answer: "6", hint: "S + 3(−2) = 0!", whyEasy: "S − 6 = 0 → Sulfur = +6!" }
      ]
    },

    // --- BIOLOGY (+4) ---
    {
      id: "bio-macromolecules-enzymes",
      worldId: "biology",
      order: 69,
      title: "Biomolecules & Enzyme Kinetics",
      icon: "🧬",
      tagline: "Carbs = quick fuel; Lipids = membranes; Proteins = amino chains; Enzymes denature at extreme heat/pH!",
      scaryVersion: "Biological polymer monomer architecture and Michaelis-Menten enzymatic denaturation.",
      easyTruth: "Living things build huge LEGO polymers out of just 4 monomer kits: Sugars → Carbs, Fatty Acids → Lipids, Amino Acids → Proteins, Nucleotides → DNA/RNA. Enzymes are protein speed-catalysts whose lock-and-key shape melts if cooked!",
      microSteps: [
        { label: "Step 1: Match All 4 Monomers", text: "Carbohydrates = Monosaccharides (glucose, ends in '-ose'). Proteins = 20 Amino Acids (CHON, peptide bonds). Nucleic Acids = Nucleotides (CHONP). Lipids = Fatty Acids (nonpolar membranes & long-term storage)." },
        { label: "Step 2: Enzymes End in '-ase'", text: "An enzyme lowers activation energy WITHOUT getting consumed! The molecule it grabs is the Substrate at the Active Site." },
        { label: "Step 3: Too Hot / Wrong pH = Denatured!", text: "Raise temp up to optimal → faster! Push temp TOO high (like 80°C) → enzyme unfolds (Denatures) and reaction crashes to ZERO!" }
      ],
      cheatCode: "Carb→Sugar, Protein→Amino Acid, DNA/RNA→Nucleotide. High Temp/pH = DENATURED active site (activity drops to 0)!",
      visualizerId: "biologyDnaPunnettLab",
      questions: [
        { type: "mc", prompt: "Which monomer builds every Protein molecule?", options: ["Nucleotides", "Monosaccharides", "Amino acids", "Fatty acids"], answer: "Amino acids", hint: "Linked together by peptide bonds at Ribosomes!", whyEasy: "Amino acids chain into polypeptides/proteins!" },
        { type: "mc", prompt: "A human stomach enzyme works best at pH 2 and 37°C. What happens if boiled at 95°C?", options: ["Works twice as fast", "Denatures (active site unfolds → 0 activity)", "Turns into lipid", "Becomes substrate"], answer: "Denatures (active site unfolds → 0 activity)", hint: "Extreme heat scrambles protein 3D shape like cooking an egg white!", whyEasy: "Boiling denatures the protein active site so substrates can't bind!" },
        { type: "mc", prompt: "Which biomolecule contains Phosphorus (P) in its backbone along with C, H, O, N?", options: ["Glycogen", "Triglyceride", "Nucleic Acid (DNA/RNA)", "Cellulose"], answer: "Nucleic Acid (DNA/RNA)", hint: "Sugar-PHOSPHATE-Base = Nucleotide!", whyEasy: "DNA & RNA carry phosphate groups (CHONP)!" },
        { type: "mc", prompt: "A Competitive Inhibitor slows an enzyme down by:", options: ["Blocking the Active Site directly", "Melting the ribosome", "Turning ADP into water", "Raising pH to 14"], answer: "Blocking the Active Site directly", hint: "Competes with the real substrate for the keyhole!", whyEasy: "Competitive inhibitors sit right in the Active Site!" },
        { type: "mc", prompt: "Why is Cellulose (plant fiber) tough while Starch stores quick energy, though both are glucose chains?", options: ["Different bond angles between glucose rings", "Cellulose is made of iron", "Starch has nucleotides", "Plants lack oxygen"], answer: "Different bond angles between glucose rings", hint: "Alpha vs Beta glycosidic linkages!", whyEasy: "Shape/bond orientation decides whether enzymes can digest it!" }
      ]
    },
    {
      id: "bio-pedigrees-sex-linked",
      worldId: "biology",
      order: 70,
      title: "Pedigrees, X-Linked & Hardy-Weinberg",
      icon: "🩺",
      tagline: "Skips a generation? Recessive! Hits mostly sons from carrier moms? X-Linked! p + q = 1 and p² + 2pq + q² = 1.",
      scaryVersion: "Pedigree inheritance inference, sex-linked hemizygosity, codominance & population allele equilibria.",
      easyTruth: "Pedigrees are detective puzzles: two unaffected parents having an affected child PROVES the trait was hiding recessive! Men only get ONE X chromosome, so a single recessive gene on X hits males directly!",
      microSteps: [
        { label: "Step 1: Autosomal Recessive vs Dominant", text: "Skipped generation (healthy parents → affected kid) = RECESSIVE! Cannot happen in Dominant traits without at least one affected parent." },
        { label: "Step 2: X-Linked Recessive Clue", text: "Far more males affected than females; carrier mothers pass to 50% of sons; NEVER passes directly from Dad to Son (Dad gives Y to sons!)." },
        { label: "Step 3: Hardy-Weinberg Shortcut", text: "ALWAYS start from q² (homozygous recessive %)! Take √q² = q, then p = 1 − q, then Carriers (heterozygotes) = 2pq!" }
      ],
      cheatCode: "Healthy parents + sick kid = Recessive! Start Hardy-Weinberg ALWAYS from q² → √ gives q → p = 1 − q → 2pq carriers!",
      visualizerId: "biologyDnaPunnettLab",
      questions: [
        { type: "mc", prompt: "Two healthy parents have a daughter with a genetic condition. This trait MUST be:", options: ["Autosomal Recessive", "Autosomal Dominant", "Y-Linked", "X-Linked Dominant"], answer: "Autosomal Recessive", hint: "Hidden in both parents (Aa × Aa → aa), and daughter is XX!", whyEasy: "Skipped generation + female affected → Autosomal Recessive!" },
        { type: "mc", prompt: "Why are X-linked recessive disorders (like red-green colorblindness) much more common in males?", options: ["Males only have 1 X chromosome (no backup copy!)", "Males have two X chromosomes", "Trait lives on Y", "Moms pass Y"], answer: "Males only have 1 X chromosome (no backup copy!)", hint: "XY vs XX!", whyEasy: "XY males have zero second X allele to mask a recessive one!" },
        { type: "input", prompt: "Hardy-Weinberg: 16% (0.16) of a population shows recessive phenotype (q² = 0.16). What % (integer) are HETEROZYGOUS carriers (2pq)?", answer: "48", hint: "√0.16 = q = 0.4 → p = 0.6 → 2(0.6)(0.4)!", whyEasy: "2 × 0.6 × 0.4 = 0.48 = 48%!" },
        { type: "mc", prompt: "A Type A mother (Iᴬi) and Type B father (Iᴮi) can have children with which blood types?", options: ["Only A or B", "A, B, AB, or O (all 4!)", "Only AB", "Only O"], answer: "A, B, AB, or O (all 4!)", hint: "Punnett square Iᴬi × Iᴮi!", whyEasy: "IᴬIᴮ(AB), Iᴬi(A), Iᴮi(B), ii(O) — all 4 are possible!" },
        { type: "mc", prompt: "Can a colorblind father (XᵃY) ever pass his X-linked colorblind allele directly to his biological SON?", options: ["Yes, 100% of the time", "50% chance", "No — fathers give sons the Y chromosome", "Only if dominant"], answer: "No — fathers give sons the Y chromosome", hint: "Sons receive X from Mom and Y from Dad!", whyEasy: "Dads pass Y to sons and X to daughters → zero Father-to-Son X transmission!" }
      ]
    },
    {
      id: "bio-human-physiology",
      worldId: "biology",
      order: 71,
      title: "Human Body Systems (Nerve, Heart, Immune, Kidney)",
      icon: "🫀",
      tagline: "Arteries push Away; Veins return. Insulin lowers blood sugar. Kidneys filter via nephrons!",
      scaryVersion: "Vertebrate homeostasis, cardiac circulation, adaptive humoral immunity, and endocrine signaling.",
      easyTruth: "Think engineering plumbing and defense: Arteries blast high-pressure blood AWAY from the heart's left ventricle; Neurons fire an electrical sodium rush down an axon; B-cells shoot Y-shaped antibodies!",
      microSteps: [
        { label: "Step 1: Heart & Arteries vs Veins", text: "A for Artery = Away from heart! Right ventricle pumps low-O₂ blood to Lungs; Left ventricle (thickest!) pumps O₂ blood to entire Body." },
        { label: "Step 2: Hormones & Blood Sugar Seesaw", text: "Pancreas releases INSULIN when sugar is HIGH (pushes glucose INTO cells); GLUCAGON when sugar is LOW (releases glycogen!)." },
        { label: "Step 3: Immunity & Nephrons", text: "B-cells produce Antibodies (humoral); Helper T-cells coordinate defense & Cytotoxic T-cells kill infected cells. Kidney Nephrons filter urea waste & reabsorb water!" }
      ],
      cheatCode: "Arteries = Away; Pulmonary Artery is oxygen-POOR going to lungs! Insulin ↓ Sugar; Glucagon ↑ Sugar. Axon fires via Na⁺ influx!",
      visualizerId: "biologyDnaPunnettLab",
      questions: [
        { type: "mc", prompt: "Which blood vessel leaves the heart carrying OXYGEN-POOR blood directly to the lungs?", options: ["Aorta", "Pulmonary Artery", "Pulmonary Vein", "Vena Cava"], answer: "Pulmonary Artery", hint: "'Artery' = Away from heart; 'Pulmonary' = Lungs!", whyEasy: "Pulmonary Artery goes away from the Right Ventricle to lungs to pick up O₂!" },
        { type: "mc", prompt: "After eating a sugary meal, which hormone spikes to move glucose OUT of blood into cells?", options: ["Glucagon", "Adrenaline", "Insulin", "Thyroxine"], answer: "Insulin", hint: "Acts like a key opening cell glucose doors!", whyEasy: "Insulin puts glucose IN-side cells, lowering blood sugar!" },
        { type: "mc", prompt: "Which white blood cells manufacture specific Y-shaped Antibodies against pathogens?", options: ["B-Lymphocytes (Plasma cells)", "Red blood cells", "Platelets", "Smooth muscle"], answer: "B-Lymphocytes (Plasma cells)", hint: "Antibodies = Humoral B-cell response!", whyEasy: "B-cells transform into Plasma cells that print antibodies!" },
        { type: "mc", prompt: "What triggers an Action Potential depolarization wave down a neuron axon?", options: ["Rapid inflow of Na⁺ (Sodium) ions", "Exit of hemoglobin", "Boiling glucose", "Stoppage of ATP"], answer: "Rapid inflow of Na⁺ (Sodium) ions", hint: "Voltage-gated channels open and positive Sodium rushes IN!", whyEasy: "Na⁺ floods into the axon, flipping membrane voltage positive!" },
        { type: "mc", prompt: "The tiny microscopic filtering unit inside the human kidney is called the:", options: ["Alveolus", "Villus", "Nephron", "Sarcomere"], answer: "Nephron", hint: "Think 'nephro-' (renal/kidney)!", whyEasy: "Each kidney has ~1 million Nephrons (Alveoli are in lungs, Sarcomeres in muscle)!" }
      ]
    },
    {
      id: "bio-taxonomy-plants-viruses",
      worldId: "biology",
      order: 72,
      title: "Taxonomy, Viruses & Plant Biology",
      icon: "🌿",
      tagline: "Dear King Philip Came Over For Good Soup! Xylem lifts Water UP; Phloem ships Food!",
      scaryVersion: "Phylogenetic classification, viral replication cycles, and vascular plant physiology.",
      easyTruth: "Bacteria are living Prokaryotes with ribosomes; Viruses are non-living genetic hijackers that MUST steal a host cell! And in plants: Xylem goes UP (water from roots); Phloem Flows food everywhere!",
      microSteps: [
        { label: "Step 1: Domain → Species Mnemonic", text: "Dear King Philip Came Over For Good Soup = Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species! Two species in the same Family also share Order..Domain!" },
        { label: "Step 2: Lytic vs Lysogenic Virus", text: "Viruses need a Host! Lytic = instant hijack, build viruses, BURST cell! Lysogenic = hides viral DNA asleep inside host chromosome until triggered." },
        { label: "Step 3: Xylem vs Phloem & Stomata", text: "Xylem moves Water UP via transpiration pull. Phloem flows Sugars BOTH directions. Stomata pores let CO₂ in and O₂/H₂O out!" }
      ],
      cheatCode: "D-K-P-C-O-F-G-S. Xylem = Water UP; Phloem = Food Flows. Viruses lack ATP/ribosomes — antibiotics ONLY kill Bacteria, NEVER Viruses!",
      visualizerId: "biologyDnaPunnettLab",
      questions: [
        { type: "mc", prompt: "Two organisms belong to the same CLASS. They MUST also belong to the exact same:", options: ["Genus", "Species", "Phylum and Kingdom", "Family"], answer: "Phylum and Kingdom", hint: "D-K-P-C-O-F-G-S: everything ABOVE Class stays shared!", whyEasy: "Domain, Kingdom, and Phylum are broader groups above Class!" },
        { type: "mc", prompt: "In vascular plants, which tissue carries sugars from leaves downward & upward?", options: ["Xylem", "Phloem", "Guard cells", "Root cap"], answer: "Phloem", hint: "Phloem = Phood (Flows both ways)!", whyEasy: "Phloem transports sugars; Xylem lifts water up from roots!" },
        { type: "mc", prompt: "Why are common Antibiotics useless against flu/COVID viral infections?", options: ["Viruses lack cell walls & bacterial ribosomes", "Viruses eat antibiotics as fuel", "Viruses are multicellular fungi", "Antibiotics raise fever"], answer: "Viruses lack cell walls & bacterial ribosomes", hint: "Viruses hijack our own cells instead of having bacterial machinery!", whyEasy: "Antibiotics target bacterial cell walls/ribosomes, which viruses don't have!" },
        { type: "mc", prompt: "Which viral cycle inserts viral DNA quietly into the host genome and waits dormant?", options: ["Lytic cycle", "Lysogenic cycle", "Mitosis", "Binary fission"], answer: "Lysogenic cycle", hint: "Longer word = Longer dormant wait before bursting!", whyEasy: "Lysogenic integrates as a provirus until stress triggers the Lytic phase!" },
        { type: "mc", prompt: "Microscopic pores under leaves that open to take in CO₂ for photosynthesis:", options: ["Mitochondria", "Stomata", "Vacuoles", "Cuticles"], answer: "Stomata", hint: "Tiny mouths flanked by guard cells!", whyEasy: "Stomata handle plant gas exchange (CO₂ in, O₂ out)!" }
      ]
    },

    // --- WORLD 9: VERBAL, READING & LOGIC (+4) ---
    {
      id: "verbal-grammar-syntax",
      worldId: "verbal-logic",
      order: 73,
      title: "Grammar, Agreement & Sentence Traps",
      icon: "✍️",
      tagline: "Cross out 'of the...' phrases to find the REAL subject! Opening modifier MUST touch its true actor!",
      scaryVersion: "Syntactic subject-verb agreement, misplaced modifiers, parallelism, and pronoun case.",
      easyTruth: "Exam grammar traps work like algebra parenthesis: put brackets around prepositional phrases ('of the students', 'along with her friends') and cross them out! Read just the core Subject + Verb and the error pops out instantly!",
      microSteps: [
        { label: "Step 1: Delete Prepositional Phrases!", text: "'The box [of heavy textbooks] IS/ARE heavy.' Cross out '[of heavy textbooks]' → 'The BOX IS heavy!' Watch 'Each/Everyone/Neither' — they are ALWAYS SINGULAR ('Everyone HAS a pencil')." },
        { label: "Step 2: Dangling Modifiers Must Touch Actor!", text: "WRONG: 'Walking down the street, the building looked tall.' (Did the building walk?!) RIGHT: 'Walking down the street, I saw the tall building.'" },
        { label: "Step 3: Parallel Rhythm", text: "Keep list forms identical: 'She likes swimming, biking, and RUNNING' (NOT 'to run')!" }
      ],
      cheatCode: "Delete 'of.../with...' phrases before choosing IS vs ARE! Indefinite 'Each/Everyone/Neither/Every' = SINGULAR verb! Modifiers touch what they describe!",
      visualizerId: "grammarWritingLab",
      questions: [
        { type: "mc", prompt: "Choose the grammatically correct verb: 'The collection of rare coins ___ locked in a vault.'", options: ["are", "were", "is", "have been"], answer: "is", hint: "Cross out '[of rare coins]' — what is the core subject?", whyEasy: "Core subject = 'collection' (singular) → IS locked!" },
        { type: "mc", prompt: "Choose the correct sentence (fix the Dangling Modifier):", options: ["Barking loudly at strangers, the fence barely held the dog.", "Barking loudly at strangers, the dog rattled the fence.", "After barking loudly, the mail was dropped.", "Running fast, the finish line crossed Sam."], answer: "Barking loudly at strangers, the dog rattled the fence.", hint: "Who was actually barking? Place THAT noun immediately after the comma!", whyEasy: "Only 'the dog' can bark right after 'Barking loudly at strangers,'!" },
        { type: "mc", prompt: "Pick the parallel structure: 'My goals are saving money, studying daily, and ___.'", options: ["to sleep early", "getting enough sleep", "sleep more", "I want sleep"], answer: "getting enough sleep", hint: "Match '-ing, -ing, and -ing'!", whyEasy: "'saving..., studying..., and getting...' keeps all three gerunds parallel!" },
        { type: "mc", prompt: "'Neither of the two players ___ ready for overtime.'", options: ["are", "were", "was", "have been"], answer: "was", hint: "'Neither' (like 'Each' and 'Everyone') is strictly singular!", whyEasy: "Delete '[of the two players]' → 'Neither WAS ready'!" },
        { type: "mc", prompt: "Between you and ___, this shortcut saves 10 minutes.", options: ["I", "me", "myself", "we"], answer: "me", hint: "Prepositions ('between', 'for', 'to') take object pronouns!", whyEasy: "'Between' is a preposition → object case 'me' (Between you and me)!" }
      ]
    },
    {
      id: "verbal-reading-inference",
      worldId: "verbal-logic",
      order: 74,
      title: "Reading Comprehension & Strict Inference",
      icon: "📖",
      tagline: "An inference MUST be proven 100% by the text — ditch extreme 'always/never' traps and outside knowledge!",
      scaryVersion: "Discourse synthesis, authorial intent evaluation, and strictly bounded textual inference.",
      easyTruth: "On entrance exams, the trap answer sounds 'probably true in real life' even though the paragraph never stated it! A valid Reading Inference is an airtight deduction backed line-by-line by the passage.",
      microSteps: [
        { label: "Step 1: Contrast Words Reveal the Author's Point", text: "Whenever a passage says 'Historically X... HOWEVER / YET / ALTHOUGH Y', the author's real thesis lives right AFTER 'HOWEVER'! Notice tone cues too ('forged whole new genres' signals clear respect)." },
        { label: "Step 2: Poison Extreme Words & Scope", text: "Choices saying 'ALL', 'NEVER', 'PROVES BEYOND DOUBT', or 'ONLY' are almost always wrong when a passage uses measured evidence. Match the passage's exact boundaries — zero outside knowledge!" },
        { label: "Step 3: Spot Logic Fallacies (Correlation ≠ Causation)", text: "Two events rising together (like ice cream sales and shark attacks in July) do NOT prove one causes the other — look for a hidden third variable (hot summer weather)!" }
      ],
      cheatCode: "Watch 'However / Yet / Despite' pivots! Reject extreme absolutes ('always/never') & outside facts. Correlation ≠ Causation!",
      visualizerId: "grammarWritingLab",
      questions: [
        { type: "mc", prompt: "Passage: 'Solar panels drop in price every decade; HOWEVER, cloudy winters still strain electrical grids.' The author's MAIN concern is:", options: ["Solar energy is completely useless worldwide", "Intermittent winter output still challenges grid stability", "Panels never pay for themselves", "Coal is cleaner than solar"], answer: "Intermittent winter output still challenges grid stability", hint: "Look right after 'HOWEVER' without picking extreme exaggerations!", whyEasy: "Matches the exact post-HOWEVER claim without exaggerating ('useless/never')!" },
        { type: "mc", prompt: "Passage: 'Sleep deprivation doubles reaction latency in lab drivers.' Which conclusion is STRICTLY supported?", options: ["Tired drivers react slower in lab conditions", "Coffee cures all car accidents", "Everyone needs exactly 9 hours", "Cars should be banned at night"], answer: "Tired drivers react slower in lab conditions", hint: "Pick the choice that paraphrases ONLY what's proven above!", whyEasy: "'Doubles reaction latency' literally paraphrases reacting slower — zero outside leaps about coffee, 9 hours, or bans!" },
        { type: "mc", prompt: "Passage: 'While critics dismissed keyboards as sterile, early synth pioneers forged whole new genres.' Author's attitude toward synth pioneers?", options: ["Mocking", "Appreciative / Respectful", "Indifferent", "Outraged"], answer: "Appreciative / Respectful", hint: "'Forged whole new genres' contrasts positively against 'dismissed'!", whyEasy: "'Forged whole new genres' signals clear admiration!" },
        { type: "mc", prompt: "If an argument says: 'Ice cream sales and shark attacks both peak in July, therefore ice cream causes shark attacks!' This commits:", options: ["Circular definition", "Confusing correlation with causation", "Ad hominem insult", "Straw man"], answer: "Confusing correlation with causation", hint: "Both actually share a third hidden cause: hot summer weather!", whyEasy: "Two things moving together doesn't prove one causes the other!" },
        { type: "mc", prompt: "Passage ends with a striking counter-example showing exception X to Theory A. Why did the author include X?", options: ["To bore the reader", "To qualify or challenge Theory A's universality", "To repeat Theory A word-for-word", "To change subjects to cooking"], answer: "To qualify or challenge Theory A's universality", hint: "Counter-examples limit sweeping claims!", whyEasy: "Showing exception X proves Theory A doesn't apply universally!" }
      ]
    },
    {
      id: "verbal-analogies-vocab",
      worldId: "verbal-logic",
      order: 75,
      title: "Word Roots & Bridge-Sentence Analogies",
      icon: "🌉",
      tagline: "Make a tight sentence connecting A to B ('THERMOMETER measures TEMPERATURE'), then slot C : D into the EXACT bridge!",
      scaryVersion: "Morphological etymology, contextual antonymic contrast, and relational word analogies.",
      easyTruth: "Never compare vibes on analogies ('A and B are both science things')! Build a sharp 4-word verb bridge linking A to B, and keep word order locked: 'A is the tool that measures B' → 'C is the tool that measures D'!",
      microSteps: [
        { label: "Step 1: Build a Crisp Bridge Sentence", text: "SCALPEL : SURGEON :: __?__ → 'A SCALPEL is the precision tool used by a SURGEON.' Test 'BRUSH : PAINTER' → fits identically!" },
        { label: "Step 2: Lock Order & Degree!", text: "Watch reversed traps! Warm : Boiling (mild → extreme) matches Cool : Freezing — NOT Freezing : Cool!" },
        { label: "Step 3: Master Core Greek/Latin Roots", text: "bene = good, mal = bad, chron = time, pseudo = false, ambi = both, circum = around, ante = before, anti = against." }
      ],
      cheatCode: "Build exact verb bridge 'A [verb] B' and reject reversed-order traps! Roots: bene(good), mal(bad), chron(time), morph(shape), logy(study).",
      visualizerId: "grammarWritingLab",
      questions: [
        { type: "mc", prompt: "ANEMOMETER : WIND :: BAROMETER : ___", options: ["Rainfall", "Atmospheric Pressure", "Earthquakes", "Altitude sickness"], answer: "Atmospheric Pressure", hint: "Bridge: 'An ANEMOMETER is the instrument that measures WIND.'", whyEasy: "Barometer measures Atmospheric Pressure!" },
        { type: "mc", prompt: "WHISPER : SHOUT :: DRIZZLE : ___", options: ["Wet", "Deluge / Downpour", "Ocean", "Puddle"], answer: "Deluge / Downpour", hint: "Bridge: 'WHISPER is a very mild form of SHOUT (degree intensity!).'", whyEasy: "Drizzle (mild rain) → Deluge / Downpour (extreme rain)!" },
        { type: "mc", prompt: "Knowing 'bene-' means GOOD and 'mal-' means BAD, what does MALEVOLENT most nearly mean?", options: ["Kind-hearted", "Wishing evil or harm upon others", "Chronically late", "Having two hands"], answer: "Wishing evil or harm upon others", hint: "Contrast with 'Benevolent' (well-wishing)!", whyEasy: "Mal (bad) + volent (wishing) = hostile / wishing harm!" },
        { type: "mc", prompt: "'Although Elena was naturally ___, at her noisy family reunion she spoke with surprising boldness.' Best fit:", options: ["boisterous", "reticent (shy/quiet)", "arrogant", "furious"], answer: "reticent (shy/quiet)", hint: "'Although' flips meaning → opposite of 'boldness'!", whyEasy: "'Although' contrasts quiet/reserved (reticent) with speaking boldly!" },
        { type: "mc", prompt: "AUTHOR : NOVEL :: ___ : SYMPHONY", options: ["Audience", "Composer", "Guitar string", "Ticket"], answer: "Composer", hint: "Bridge: 'An AUTHOR writes/creates a NOVEL.' Keep Person-First order!", whyEasy: "A Composer writes/creates a Symphony!" }
      ]
    },
    {
      id: "logic-deduction-abstract",
      worldId: "verbal-logic",
      order: 76,
      title: "Deductive Logic & Pattern Reasoning",
      icon: "🧠",
      tagline: "If P → Q, the ONLY thing guaranteed true is the Contrapositive (¬Q → ¬P)! Beware the Converse trap!",
      scaryVersion: "Propositional modus tollens, categorical syllogisms, and visual sequence matrix induction.",
      easyTruth: "Rule: 'If it's raining (P), the lawn is wet (Q).' Suppose the lawn IS wet — was it raining? Maybe a sprinkler! You CANNOT reverse the arrow! Only 'Lawn NOT wet (¬Q) → NOT raining (¬P)' is 100% logically guaranteed!",
      microSteps: [
        { label: "Step 1: Flip AND Negate = Contrapositive!", text: "Statement: 'All Cats (C) are Mammals (M).' Guarantee: 'If an animal is NOT a Mammal (¬M), it is CANNOT be a Cat (¬C)!' Never reverse blindly to 'All M are C'!" },
        { label: "Step 2: Syllogism Circle Check", text: "Some A are B; All B are C → Definitely Some A are C! (Overlap A∩B sits completely inside C!)." },
        { label: "Step 3: Multi-Layer Pattern Rule", text: "Alternating series split into Odds & Evens! E.g. 2, 10, 4, 20, 6, 30... → Odd positions +2 (8); Even positions +10 (40)!" }
      ],
      cheatCode: "P → Q guarantees ONLY ¬Q → ¬P (flip BOTH side AND negate BOTH!). Never conclude Q → P! Split tricky sequences into Odd/Even lanes!",
      visualizerId: "grammarWritingLab",
      questions: [
        { type: "mc", prompt: "Given: 'If you pass Calculus (P), you graduate (Q).' If Maya did NOT graduate (¬Q), what MUST be true?", options: ["Maya passed Calculus", "Maya did NOT pass Calculus", "Maya switched majors", "All graduates took Physics"], answer: "Maya did NOT pass Calculus", hint: "Use the Contrapositive (¬Q → ¬P)!", whyEasy: "If passing Calculus forced graduation, failing to graduate means she couldn't have passed Calculus!" },
        { type: "mc", prompt: "Given ONLY: 'If it snows, schools close.' Suppose schools ARE closed today. What is guaranteed?", options: ["It definitely snowed", "It did not snow", "Cannot guarantee it snowed (could be a holiday!)", "Teachers went skiing"], answer: "Cannot guarantee it snowed (could be a holiday!)", hint: "Watch out for the Converse Trap (Q does NOT imply P)!", whyEasy: "Converse fallacy! Schools might close for summer, repairs, or holiday!" },
        { type: "input", prompt: "Find next number in alternating sequence: 3, 10, 6, 20, 9, 30, 12, ___", answer: "40", hint: "Odds: 3,6,9,12. Evens: 10, 20, 30, ___!", whyEasy: "Even positions climb by +10 → 40!" },
        { type: "mc", prompt: "Syllogism: 'All Hawks are Birds. Some Birds live near Oceans.' Must SOME Hawks live near Oceans?", options: ["Yes, guaranteed", "No — not necessarily (the ocean birds might all be seagulls!)", "All Hawks are seagulls", "Oceans have no birds"], answer: "No — not necessarily (the ocean birds might all be seagulls!)", hint: "Draw Venn circles where Hawks and Ocean-lovers don't overlap inside Birds!", whyEasy: "'Some Birds' could exclude Hawks completely!" },
        { type: "mc", prompt: "Logic Puzzle: Alex > Ben in height. Ben > Carl. Sam is shorter than Carl. Who is TALLEST?", options: ["Sam", "Carl", "Ben", "Alex"], answer: "Alex", hint: "Chain inequality: Alex > Ben > Carl > Sam!", whyEasy: "Alex sits at the top of the ordering chain!" }
      ]
    }
  ];

  const NEW_BF_IDS = new Set([
    "abs-value-inequalities",
    "rational-radical-equations",
    "circles-3d-geometry",
    "permutations-combinatorics-piecewise",
    "physics-projectiles-circular-torque",
    "physics-optics-magnetism",
    "chem-electron-config-trends",
    "chem-vsepr-lewis-shapes",
    "chem-equilibrium-redox-kinetics",
    "bio-macromolecules-enzymes",
    "bio-pedigrees-sex-linked",
    "verbal-grammar-syntax",
    "verbal-analogies-vocab",
    "logic-deduction-abstract"
  ]);

  for (const n of NEW_EXAM_NODES) {
    n.bruteforce = NEW_BF_IDS.has(n.id);
    DATA.NODES.push(n);
  }

  // Add 4 new Diagnostic Scan questions (12 -> 16)
  DATA.DIAGNOSTIC_QUESTIONS.push(
    {
      id: "diag_13",
      targetNodeId: "abs-value-inequalities",
      topicLabel: "Absolute Value Bounds",
      whyItMatters: "Distance intervals (|x − a| ≤ r) appear constantly in algebra, error margins & Calculus!",
      prompt: "Solve: |x − 3| = 7 (find BOTH x values):",
      options: ["10 or −4", "10 or 4", "−10 or 4", "7 or −7"],
      answer: "10 or −4"
    },
    {
      id: "diag_14",
      targetNodeId: "physics-thermo-fluids",
      topicLabel: "Fluid Flow & Heat",
      whyItMatters: "Continuity (A₁v₁ = A₂v₂) & Q = mcΔT test unit scaling + inverse proportions together!",
      prompt: "Water speeds at 3 m/s through a 4 cm² nozzle. Squeeze area to 2 cm² → new speed:",
      options: ["6 m/s", "1.5 m/s", "12 m/s", "3 m/s"],
      answer: "6 m/s"
    },
    {
      id: "diag_15",
      targetNodeId: "chem-electron-config-trends",
      topicLabel: "Electron Shells & Periodicity",
      whyItMatters: "Valence shells drive ALL bonding, reactivity, and periodic table trends!",
      prompt: "Which element has the HIGHEST electronegativity in the entire periodic table?",
      options: ["Fluorine (F)", "Sodium (Na)", "Neon (Ne)", "Iron (Fe)"],
      answer: "Fluorine (F)"
    },
    {
      id: "diag_16",
      targetNodeId: "logic-deduction-abstract",
      topicLabel: "Deductive Logic Contrapositive",
      whyItMatters: "College entrance exams love testing P → Q vs its false converse Q → P!",
      prompt: "If 'If a polygon is a square, it has 4 equal sides' is true, what ELSE is 100% guaranteed?",
      options: [
        "Anything lacking 4 equal sides is NOT a square",
        "Everything with 4 equal sides is a square (trap: rhombus!)",
        "No rectangle is a square",
        "All 4-sided shapes are squares"
      ],
      answer: "Anything lacking 4 equal sides is NOT a square"
    }
  );

  // ==================== UPGRADED MULTI-TEMPLATE PROCEDURAL GENERATORS ====================
  const prevGen = DATA.generateProceduralQuestion;

  DATA.generateProceduralQuestion = function (nodeId) {
    switch (nodeId) {
      // --- REPAIRED & EXPANDED GENERATORS (6 CRITICAL NODES) ---
      case "bio-osmosis-transport": {
        const mode = randInt(0, 5);
        if (mode === 0) {
          const pctIn = randInt(1, 3);
          const pctOut = pctIn + randInt(4, 9);
          return {
            type: "mc",
            prompt: `A red blood cell (${pctIn}% salt) is dropped into ${pctOut}% salty water (Hypertonic). Which way does WATER move?`,
            options: strOpts("Water exits the cell → shrivels", ["Water enters the cell → swells", "Salt walks freely through lipids", "Cell splits by mitosis"]),
            answer: "Water exits the cell → shrivels",
            hint: "Osmosis rule: water ALWAYS chases higher solute concentration!",
            whyEasy: `${pctOut}% outside > ${pctIn}% inside → hypertonic bath sucks water OUT!`
          };
        }
        if (mode === 1) {
          const pctCell = randInt(2, 6);
          const isPlant = randInt(0, 1) === 1;
          const ans = isPlant ? "Water enters → builds turgor (cell wall prevents bursting)" : "Water rushes IN → cell swells/bursts (lysis)";
          return {
            type: "mc",
            prompt: `Drop a ${isPlant ? "Plant" : "Animal"} cell (${pctCell}% solutes) into 0% pure distilled water (Hypotonic). What happens?`,
            options: strOpts(ans, [
              isPlant ? "Cell bursts immediately without protection" : "Water exits until cell shrivels",
              "Zero water crosses membrane",
              "Nucleus leaves membrane"
            ]),
            answer: ans,
            hint: "Pure water outside = pure water rushing IN!",
            whyEasy: isPlant ? "Stiff cellulose cell walls turn hypotonic swelling into crisp turgor!" : "Animal cells lack a cell wall, so hypotonic water influx can pop them!"
          };
        }
        if (mode === 2) {
          const cycles = randInt(2, 6);
          return {
            type: "mc",
            prompt: `Sodium-Potassium ATPase pumps 3 Na⁺ OUT & 2 K⁺ IN per ATP. After ${cycles} cycles (${cycles} ATP), net Na⁺ pushed out?`,
            options: numOpts(cycles * 3, [cycles * 2 - cycles * 3, -2, 2, 1]),
            answer: String(cycles * 3),
            hint: `Multiply 3 Na⁺ ions × ${cycles} cycles!`,
            whyEasy: `3 × ${cycles} = ${cycles * 3} Na⁺ pumped uphill (Active Transport)!`
          };
        }
        if (mode === 3) {
          const cHigh = randInt(15, 40), cLow = randInt(2, 8);
          const goesUphill = randInt(0, 1) === 1;
          const ans = goesUphill ? "Active Transport (Costs ATP + Protein Pump)" : "Facilitated Diffusion (0 ATP via Channel)";
          return {
            type: "mc",
            prompt: goesUphill
              ? `Pumping glucose from ${cLow} mM (low) into ${cHigh} mM (high) inside a gut cell requires:`
              : `Moving polar glucose DOWN its gradient from ${cHigh} mM (high) to ${cLow} mM (low) through a GLUT channel:`,
            options: strOpts(ans, [
              "Active Transport (Costs ATP + Protein Pump)",
              "Facilitated Diffusion (0 ATP via Channel)",
              "Direct tear through phospholipid tails",
              "Lysogenic breakdown"
            ]),
            answer: ans,
            hint: "Low→High = Uphill (costs ATP); High→Low through protein = 0 ATP!",
            whyEasy: goesUphill ? "Against gradient needs ATP fuel!" : "Downhill with helper channel = Facilitated Diffusion!"
          };
        }
        if (mode === 4) {
          return {
            type: "mc",
            prompt: "Which bulk process engulfs a large bacterium by folding the plasma membrane INWARD into a vesicle?",
            options: strOpts("Phagocytosis / Endocytosis", ["Exocytosis", "Simple osmosis", "Chemiosmosis"]),
            answer: "Phagocytosis / Endocytosis",
            hint: "'Endo-' = INTO the cell!",
            whyEasy: "Endocytosis wraps cargo inward; Exocytosis spits cargo outward!"
          };
        }
        return {
          type: "mc",
          prompt: "Why can O₂ gas drift straight through a cell's lipid bilayer while charged Na⁺ ions are blocked?",
          options: strOpts("Membrane interior has nonpolar hydrophobic tails", ["O₂ is larger than Na⁺", "Na⁺ is too cold", "Lipids repel oxygen actively"]),
          answer: "Membrane interior has nonpolar hydrophobic tails",
          hint: "Like dissolves like — nonpolar interior blocks charged ions!",
          whyEasy: "Tiny nonpolar O₂ slips right past hydrophobic tails; ions need protein channels!"
        };
      }

      case "bio-energy-photosynthesis": {
        const mode = randInt(0, 5);
        if (mode === 0) {
          const gluc = randInt(2, 5);
          const co2 = 6 * gluc;
          return {
            type: "mc",
            prompt: `Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. How many CO₂ molecules build ${gluc} glucose molecule(s)?`,
            options: numOpts(co2, [-6, 6, gluc - co2, 3]),
            answer: String(co2),
            hint: `Multiply 6 CO₂ × ${gluc}!`,
            whyEasy: `6 × ${gluc} = ${co2} CO₂ fixed in the Calvin Cycle!`
          };
        }
        if (mode === 1) {
          const glc = randInt(2, 4);
          const atp = 36 * glc;
          return {
            type: "mc",
            prompt: `Aerobic Cellular Respiration yields ~36 ATP per glucose. Burning ${glc} glucose molecules yields (~ATP):`,
            options: numOpts(atp, [-34, -10, 10, 2 * glc - atp]),
            answer: String(atp),
            hint: `Multiply 36 ATP × ${glc}!`,
            whyEasy: `36 × ${glc} = ${atp} ATP (vs only ${2 * glc} ATP without oxygen)!`
          };
        }
        if (mode === 2) {
          return {
            type: "mc",
            prompt: "During Light Reactions in chloroplasts, where do the O₂ gas atoms released to air come from?",
            options: strOpts("Splitting H₂O molecules (Photolysis)", ["Breaking CO₂ directly", "Melting chlorophyll", "Burning glucose"]),
            answer: "Splitting H₂O molecules (Photolysis)",
            hint: "H₂O breaks apart for electrons + H⁺, discarding O₂!",
            whyEasy: "Water (H₂O) supplies electrons and releases O₂ gas!"
          };
        }
        if (mode === 3) {
          const askCalvin = randInt(0, 1) === 1;
          return {
            type: "mc",
            prompt: askCalvin
              ? "In which region of a chloroplast does the Calvin Cycle build sugar from CO₂?"
              : "In which membrane stacks do chlorophyll molecules trap sunlight during Light Reactions?",
            options: strOpts(askCalvin ? "Stroma (fluid surrounding discs)" : "Thylakoid membranes", [
              "Stroma (fluid surrounding discs)",
              "Thylakoid membranes",
              "Mitochondrial cristae",
              "Nucleolus"
            ]),
            answer: askCalvin ? "Stroma (fluid surrounding discs)" : "Thylakoid membranes",
            hint: "Thylakoid = traps sunlight; Stroma = synthesizes sugar!",
            whyEasy: askCalvin ? "CO₂ → Sugar happens in the fluid Stroma!" : "Light pigments sit right inside Thylakoid membranes!"
          };
        }
        if (mode === 4) {
          return {
            type: "mc",
            prompt: "Why do most healthy plant leaves appear GREEN to human eyes?",
            options: strOpts("Chlorophyll absorbs Red & Blue light and REFLECTS Green", ["Chlorophyll burns green flame", "Plants only use green photons", "Stomata glow green"]),
            answer: "Chlorophyll absorbs Red & Blue light and REFLECTS Green",
            hint: "The color you see is the color bounced back!",
            whyEasy: "Reflecting green wavelengths gives leaves their green appearance!"
          };
        }
        return {
          type: "mc",
          prompt: "Sprinting hard starves muscles of O₂ → cells switch to Anaerobic Fermentation, yielding only:",
          options: strOpts("2 ATP per glucose + Lactic Acid", ["38 ATP per glucose + O₂", "60 ATP per protein", "Glucose synthesis"]),
          answer: "2 ATP per glucose + Lactic Acid",
          hint: "Glycolysis alone without the Electron Transport Chain!",
          whyEasy: "No oxygen blocks the mitochondrial ETC → only 2 net ATP from glycolysis!"
        };
      }

      case "logarithms-unlocked": {
        const mode = randInt(0, 4);
        if (mode === 0) {
          const base = [2, 3, 5, 10][randInt(0, 3)];
          const exp = base === 2 ? randInt(3, 6) : base === 3 ? randInt(2, 4) : randInt(2, 3);
          const val = Math.pow(base, exp);
          return {
            type: "mc",
            prompt: `Negative Flip! Evaluate log_${base}(1 / ${val}):`,
            options: numOpts(-exp, [exp - (-exp), -1, 1, 2]),
            answer: String(-exp),
            hint: `1/${val} = ${base}^(−?)!`,
            whyEasy: `${base}^${exp} = ${val}, so reciprocal flips sign → −${exp}!`
          };
        }
        if (mode === 1) {
          const x = randInt(4, 10), k = randInt(2, x - 2);
          const ans = x * k;
          return {
            type: "mc",
            prompt: `Combine Logs: log₂(${x}) + log₂(${k}) = log₂(?):`,
            options: numOpts(ans, [x + k - ans, -4, 4, 2]),
            answer: String(ans),
            hint: "Adding logs OUTSIDE multiplies arguments INSIDE!",
            whyEasy: `log(a) + log(b) = log(a·b) → ${x} × ${k} = ${ans}!`
          };
        }
        if (mode === 2) {
          // log_2(x) + log_2(x - d) = targetExp where x*(x - d) = 2^targetExp
          const pairs = [
            { r: 4, d: 2, p: 3 },  // 4*2 = 8 = 2^3
            { r: 8, d: 6, p: 4 },  // 8*2 = 16 = 2^4
            { r: 6, d: 1, p: 30, b: 10 }, // log10(5)+log10(2)... keep pure 2/3 cleanly:
            { r: 6, d: 3, p: 4 }   // check: wait r*(r-d) = 18 != 16. Let's pick exact: (5, d=2)->15? Pick clean power pairs!
          ];
          const exact = [
            { b: 2, r: 4, d: 2, exp: 3 }, // 4*(4-2)=8 = 2^3
            { b: 2, r: 8, d: 6, exp: 4 }, // 8*(8-6)=16 = 2^4
            { b: 2, r: 8, d: 4, exp: 5 }, // 8*(8-4)=32 = 2^5
            { b: 3, r: 9, d: 6, exp: 3 }  // 9*(9-6)=27 = 3^3
          ];
          const p = exact[randInt(0, exact.length - 1)];
          const rhs = Math.pow(p.b, p.exp);
          return {
            type: "mc",
            prompt: `Solve for positive x: log_${p.b}(x) + log_${p.b}(x − ${p.d}) = ${p.exp}`,
            options: numOpts(p.r, [-(p.r - p.d) - p.r, -2, 2, 4]),
            answer: String(p.r),
            hint: `Combine: x(x − ${p.d}) = ${p.b}^${p.exp} = ${rhs}! Reject negative x.`,
            whyEasy: `${p.r}(${p.r} − ${p.d}) = ${rhs}, and positive x > ${p.d} → x = ${p.r}!`
          };
        }
        if (mode === 3) {
          const bank = [
            { q: "log₄(8)", ans: "3/2", d: ["2", "1/2", "4"], t: "2^(2x) = 2³ → 2x = 3 → x = 3/2!" },
            { q: "log₈(32)", ans: "5/3", d: ["4", "3/5", "2"], t: "2^(3x) = 2⁵ → 3x = 5 → x = 5/3!" },
            { q: "log₉(27)", ans: "3/2", d: ["3", "2/3", "18"], t: "3^(2x) = 3³ → x = 3/2!" },
            { q: "log₁₆(8)", ans: "3/4", d: ["1/2", "4/3", "−2"], t: "2^(4x) = 2³ → x = 3/4!" }
          ];
          const pick = bank[randInt(0, bank.length - 1)];
          return {
            type: "mc",
            prompt: `Change-of-Base Trick! Evaluate ${pick.q}:`,
            options: strOpts(pick.ans, pick.d),
            answer: pick.ans,
            hint: "Rewrite BOTH base and argument as powers of the SAME tiny prime!",
            whyEasy: pick.t
          };
        }
        const b = [2, 3, 5, 10][randInt(0, 3)];
        const n = randInt(2, 5);
        return {
          type: "mc",
          prompt: `Power Escape! Simplify log_${b}(${b}^${n} · √${b}):`,
          options: strOpts(`${n}.5`, [`${n}`, `${n + 1}`, `${n * 0.5}`]),
          answer: `${n}.5`,
          hint: `${b}^${n} · ${b}^0.5 = ${b}^(${n}.5)!`,
          whyEasy: `Add exponents ${n} + 0.5 → ${n}.5!`
        };
      }

      case "trig-unit-circle": {
        const mode = randInt(0, 4);
        if (mode === 0) {
          const bank = [
            { p: "sin(30°)", ans: "1/2", d: ["√3/2", "√2/2", "1"], t: "Low 30° Y-height = 1/2!" },
            { p: "cos(60°)", ans: "1/2", d: ["√3/2", "√2/2", "0"], t: "60° shares complement with 30° → cos(60°) = 1/2!" },
            { p: "cos(30°)", ans: "√3/2", d: ["1/2", "√2/2", "√3"], t: "Wide X-reach at 30° = √3/2!" },
            { p: "sin(60°)", ans: "√3/2", d: ["1/2", "√2/2", "1"], t: "Tall Y-height at 60° = √3/2!" },
            { p: "sin(45°)", ans: "√2/2", d: ["1/2", "√3/2", "1"], t: "45° diagonal symmetry gives (√2/2, √2/2)!" },
            { p: "tan(45°)", ans: "1", d: ["0", "√3", "√2/2"], t: "sin(45°)/cos(45°) = 1!" },
            { p: "tan(60°)", ans: "√3", d: ["1/√3", "1", "1/2"], t: "(√3/2) ÷ (1/2) = √3!" }
          ];
          const k = bank[randInt(0, bank.length - 1)];
          return { type: "mc", prompt: `Exact Triangle Value: ${k.p} = ?`, options: strOpts(k.ans, k.d), answer: k.ans, hint: "30-60-90 uses 1/2 & √3/2; 45-45-90 uses √2/2!", whyEasy: k.t };
        }
        if (mode === 1) {
          const quadBank = [
            { p: "cos(120°)", ans: "−1/2", d: ["1/2", "−√3/2", "√3/2"], t: "QII (X is negative!), 60° ref → −1/2!" },
            { p: "sin(150°)", ans: "1/2", d: ["−1/2", "√3/2", "−√3/2"], t: "QII (Y is positive!), 30° ref → +1/2!" },
            { p: "cos(135°)", ans: "−√2/2", d: ["√2/2", "−1/2", "0"], t: "QII X is negative → −√2/2!" },
            { p: "sin(210°)", ans: "−1/2", d: ["1/2", "−√3/2", "√3/2"], t: "QIII (below X-axis!), 30° ref → −1/2!" },
            { p: "sin(240°)", ans: "−√3/2", d: ["√3/2", "−1/2", "1/2"], t: "QIII Y is negative, 60° ref → −√3/2!" },
            { p: "cos(300°)", ans: "1/2", d: ["−1/2", "√3/2", "−√3/2"], t: "QIV (X is positive!), 60° ref → +1/2!" }
          ];
          const k = quadBank[randInt(0, quadBank.length - 1)];
          return { type: "mc", prompt: `All-Students-Take-Calculus! ${k.p} = ?`, options: strOpts(k.ans, k.d), answer: k.ans, hint: "Check Reference Angle to X-axis + Quadrant sign!", whyEasy: k.t };
        }
        if (mode === 2) {
          const degs = [
            { d: 120, r: "2π/3" }, { d: 135, r: "3π/4" }, { d: 150, r: "5π/6" },
            { d: 240, r: "4π/3" }, { d: 315, r: "7π/4" }
          ];
          const k = degs[randInt(0, degs.length - 1)];
          return {
            type: "mc",
            prompt: `Convert ${k.d}° to Radians:`,
            options: strOpts(k.r, ["π/3", "3π/2", "5π/4", "π/6"]),
            answer: k.r,
            hint: `Multiply ${k.d}° by π / 180°!`,
            whyEasy: `${k.d}/180 · π reduces cleanly to ${k.r}!`
          };
        }
        if (mode === 3) {
          const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17]][randInt(0, 2)];
          const askSin = randInt(0, 1) === 1;
          const ans = `${triples[askSin ? 1 : 0]}/${triples[2]}`;
          return {
            type: "mc",
            prompt: `Acute θ in Quadrant I: ${askSin ? `cos θ = ${triples[0]}/${triples[2]}` : `sin θ = ${triples[1]}/${triples[2]}`}. Find ${askSin ? "sin θ" : "cos θ"}:`,
            options: strOpts(ans, [`${triples[askSin ? 0 : 1]}/${triples[2]}`, `${triples[0]}/${triples[1]}`, `−${ans}`]),
            answer: ans,
            hint: `Pythagorean identity sin²θ + cos²θ = 1 (${triples.join("-")} right triangle)!`,
            whyEasy: `${triples[0]}² + ${triples[1]}² = ${triples[2]}² → ${ans}!`
          };
        }
        const amp = randInt(2, 7), freq = randInt(2, 6);
        const per = (2 / freq === 1) ? "π" : (freq === 2 ? "π" : freq === 4 ? "π/2" : freq === 6 ? "π/3" : `2π/${freq}`);
        return {
          type: "mc",
          prompt: `Wave y = ${amp} sin(${freq}x): What is its PERIOD (length of 1 full cycle)?`,
          options: strOpts(per, [`${amp}π`, "2π", `${freq}π`]),
          answer: per,
          hint: "Period = 2π ÷ B (ignore amplitude in front)!",
          whyEasy: `2π ÷ ${freq} = ${per}!`
        };
      }

      case "factoring-foil": {
        const mode = randInt(0, 3);
        if (mode === 0) {
          // Negative/mixed signs (x - r1)(x + r2)
          const r1 = randInt(3, 9), r2 = randInt(1, r1 - 1);
          const b = r2 - r1;
          const c = -(r1 * r2);
          const ans = `(x − ${r1})(x + ${r2})`;
          return {
            type: "mc",
            prompt: `Factor x² − ${Math.abs(b)}x − ${Math.abs(c)}:`,
            options: strOpts(ans, [`(x + ${r1})(x − ${r2})`, `(x − ${r1})(x − ${r2})`, `(x − 1)(x + ${Math.abs(c)})`]),
            answer: ans,
            hint: `Multiply to −${Math.abs(c)}, add to −${Math.abs(b)} → bigger magnitude gets minus!`,
            whyEasy: `−${r1} and +${r2} multiply to ${c} and sum to ${b} → ${ans}!`
          };
        }
        if (mode === 1) {
          // Both negative (x - r1)(x - r2)
          const r1 = randInt(2, 7), r2 = randInt(2, 7);
          const b = r1 + r2, c = r1 * r2;
          const ans = `(x − ${r1})(x − ${r2})`;
          return {
            type: "mc",
            prompt: `Factor x² − ${b}x + ${c}:`,
            options: strOpts(ans, [`(x + ${r1})(x + ${r2})`, `(x − ${r1})(x + ${r2})`, `(x − 1)(x − ${c})`]),
            answer: ans,
            hint: "Plus at end + Minus in middle means BOTH factors are negative!",
            whyEasy: `(−${r1})(−${r2}) = +${c} & (−${r1})+(−${r2}) = −${b} → ${ans}!`
          };
        }
        if (mode === 2) {
          // Difference of squares ax^2 - b^2
          const a = randInt(2, 5), b = randInt(2, 9);
          const ans = `(${a}x − ${b})(${a}x + ${b})`;
          return {
            type: "mc",
            prompt: `Difference of Squares! Factor ${a * a}x² − ${b * b}:`,
            options: strOpts(ans, [`(${a}x − ${b})²`, `(${a * a}x − ${b})(x + ${b})`, `(${a}x + ${b})²`]),
            answer: ans,
            hint: "A² − B² = (A − B)(A + B)!",
            whyEasy: `√(${a * a}x²) = ${a}x, √${b * b} = ${b} → ${ans}!`
          };
        }
        // Leading coefficient a > 1: (a*x + p)(x + q)
        const a = randInt(2, 3), p = randInt(1, 5), q = randInt(2, 5);
        const mid = a * q + p, end = p * q;
        const ans = `(${a}x + ${p})(x + ${q})`;
        return {
          type: "mc",
          prompt: `AC-Method Boss (a > 1)! Factor ${a}x² + ${mid}x + ${end}:`,
          options: strOpts(ans, [`(${a}x + ${q})(x + ${p})`, `(x + ${p})(x + ${end})`, `(${a}x − ${p})(x − ${q})`]),
          answer: ans,
          hint: `Outer + Inner must equal ${mid}x!`,
          whyEasy: `${a}x·${q} + ${p}·x = ${mid}x → ${ans}!`
        };
      }

      case "word-problems-translator": {
        const mode = randInt(0, 4);
        if (mode === 0) {
          const n = randInt(3, 12), k = randInt(2, 5);
          const ans = `${k}x − ${n}`;
          return {
            type: "mc",
            prompt: `Translate accurately: '${n} less than ${k} times a number x'`,
            options: strOpts(ans, [`${n} − ${k}x`, `${k}(x − ${n})`, `${k}x + ${n}`]),
            answer: ans,
            hint: "'Less than' flips AFTER you compute 'k times x'!",
            whyEasy: `Start with ${k}x, subtract ${n} → ${ans}!`
          };
        }
        if (mode === 1) {
          const first = randInt(8, 22);
          const sum = 3 * first + 3;
          return {
            type: "mc",
            prompt: `Three consecutive integers sum to ${sum}. What is the LARGEST of the three?`,
            options: numOpts(first + 2, [-2, -1, 1, 3]),
            answer: String(first + 2),
            hint: `x + (x+1) + (x+2) = ${sum}, or just take average ${sum} ÷ 3 for middle!`,
            whyEasy: `Middle integer = ${sum} ÷ 3 = ${first + 1}, so largest = ${first + 2}!`
          };
        }
        if (mode === 2) {
          const nowSon = randInt(6, 12);
          const mult = randInt(3, 4);
          const years = randInt(4, 6);
          const dadNow = mult * nowSon;
          const sumFuture = (dadNow + years) + (nowSon + years);
          return {
            type: "mc",
            prompt: `Mia is ${mult}× as old as Leo today. In ${years} years, their ages will add up to ${sumFuture}. Leo's age TODAY?`,
            options: numOpts(nowSon, [-2, -1, 1, 2, mult]),
            answer: String(nowSon),
            hint: `(${mult}L + ${years}) + (L + ${years}) = ${sumFuture}!`,
            whyEasy: `${mult + 1}L + ${2 * years} = ${sumFuture} → Leo = ${nowSon}!`
          };
        }
        if (mode === 3) {
          // Combined rate: 1/a + 1/b = 1/T
          const pairs = [[6, 3, 2], [12, 4, 3], [10, 15, 6], [6, 12, 4]][randInt(0, 3)];
          return {
            type: "mc",
            prompt: `Pipe A fills a tank in ${pairs[0]} hrs; Pipe B fills it in ${pairs[1]} hrs. Both open together finish in how many hours?`,
            options: numOpts(pairs[2], [-1, 1, Math.round((pairs[0] + pairs[1]) / 2) - pairs[2] || 3, 2]),
            answer: String(pairs[2]),
            hint: `Add rates: 1/${pairs[0]} + 1/${pairs[1]} = 1/T (NEVER average the times)!`,
            whyEasy: `1/${pairs[0]} + 1/${pairs[1]} = 1/${pairs[2]} → ${pairs[2]} hours!`
          };
        }
        const disc1 = [20, 30, 50][randInt(0, 2)], disc2 = [10, 20, 25][randInt(0, 2)];
        const price = 100 * (1 - disc1 / 100) * (1 - disc2 / 100);
        return {
          type: "mc",
          prompt: `A $100 jacket goes ${disc1}% OFF, then takes an EXTRA ${disc2}% OFF the sale price. Final price ($)?`,
          options: numOpts(price, [100 - disc1 - disc2 - price || 5, -5, 5, 10]),
          answer: String(price),
          hint: "Discounts multiply sequentially — NEVER just add percentages!",
          whyEasy: `$100 × ${((100 - disc1) / 100).toFixed(2)} × ${((100 - disc2) / 100).toFixed(2)} = $${price}!`
        };
      }

      // --- 18 NEW EXAM NODES PROCEDURAL GENERATORS ---
      case "abs-value-inequalities": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const c = randInt(2, 8), r = randInt(2, 6);
          const ans = `${c + r} or ${c - r}`;
          return {
            type: "mc",
            prompt: `Both solutions for |x − ${c}| = ${r}:`,
            options: strOpts(ans, [`${c + r} only`, `${c - r} only`, `${r} or −${r}`]),
            answer: ans,
            hint: `x − ${c} = +${r} AND x − ${c} = −${r}!`,
            whyEasy: `${c}+${r} = ${c + r} and ${c}−${r} = ${c - r}!`
          };
        }
        if (mode === 1) {
          const c = randInt(3, 8), r = randInt(1, c - 1);
          const ans = `${c - r} ≤ x ≤ ${c + r}`;
          return {
            type: "mc",
            prompt: `Solve Less thAND! |x − ${c}| ≤ ${r}:`,
            options: strOpts(ans, [`x ≤ ${c - r} or x ≥ ${c + r}`, `−${r} ≤ x ≤ ${r}`, `${c} ≤ x ≤ ${c + r}`]),
            answer: ans,
            hint: `Sandwich −${r} ≤ x − ${c} ≤ +${r}!`,
            whyEasy: `Add ${c} across → ${ans}!`
          };
        }
        const neg = -randInt(2, 6), rhs = neg * randInt(-5, 5) || neg * 3;
        const bound = rhs / neg;
        return {
          type: "mc",
          prompt: `Flip Trap! Solve ${neg}x > ${rhs}:`,
          options: strOpts(`x < ${bound}`, [`x > ${bound}`, `x < ${-bound}`, `x > ${-bound}`]),
          answer: `x < ${bound}`,
          hint: "Dividing by negative flips > to <!",
          whyEasy: `${rhs} ÷ (${neg}) = ${bound}, and sign flips → x < ${bound}!`
        };
      }

      case "rational-radical-equations": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const k = randInt(2, 9);
          return {
            type: "mc",
            prompt: `Vertical Asymptote of f(x) = (2x + 1) / (x − ${k}):`,
            options: strOpts(`x = ${k}`, [`x = −${k}`, "y = 2", "x = −1/2"]),
            answer: `x = ${k}`,
            hint: "Set bottom denominator = 0!",
            whyEasy: `x − ${k} = 0 at x = ${k}!`
          };
        }
        if (mode === 1) {
          const a = randInt(3, 9), b = randInt(1, 3), lead = a * b;
          return {
            type: "mc",
            prompt: `Horizontal Asymptote of f(x) = (${lead}x³ + 4x) / (${b}x³ − 7):`,
            options: strOpts(`y = ${a}`, ["y = 0", "y = 7", `y = ${lead}`]),
            answer: `y = ${a}`,
            hint: "Same top & bottom degree → divide leading coefficients!",
            whyEasy: `${lead} ÷ ${b} = ${a} → y = ${a}!`
          };
        }
        const xSol = randInt(2, 7);
        const aCoeff = randInt(2, 4);
        const minR = Math.ceil(Math.sqrt(aCoeff * xSol + 1));
        const r = randInt(minR, Math.max(minR + 2, 9));
        const c = r * r - aCoeff * xSol;
        return {
          type: "mc",
          prompt: `Principal root! Solve √(${aCoeff}x + ${c}) = ${r}:`,
          options: numOpts(xSol, [-2, -1, 1, 2, r]),
          answer: String(xSol),
          hint: `Square both sides: ${aCoeff}x + ${c} = ${r * r}!`,
          whyEasy: `${aCoeff}x + ${c} = ${r * r} → ${aCoeff}x = ${r * r - c} → x = ${xSol}!`
        };
      }

      case "circles-3d-geometry": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const arc = randInt(20, 75) * 2;
          return {
            type: "mc",
            prompt: `An inscribed angle subtends a ${arc}° arc. Inscribed angle measure?`,
            options: numOpts(arc / 2, [-10, 10, arc - arc / 2, 5]),
            answer: String(arc / 2),
            hint: "Inscribed angle = ½ intercepted arc!",
            whyEasy: `${arc}° ÷ 2 = ${arc / 2}°!`
          };
        }
        if (mode === 1) {
          const cyl = randInt(5, 20) * 3;
          return {
            type: "mc",
            prompt: `A cylinder holds ${cyl} cm³. What volume does a CONE with identical base & height hold?`,
            options: numOpts(cyl / 3, [cyl - cyl / 3, cyl / 2 - cyl / 3 || 2, -3, 3]),
            answer: String(cyl / 3),
            hint: "Pointy cone = ⅓ matching cylinder!",
            whyEasy: `${cyl} ÷ 3 = ${cyl / 3} cm³!`
          };
        }
        const s = randInt(2, 5);
        const cubeScale = s * s * s;
        return {
          type: "mc",
          prompt: `Multiply a sphere's radius by ${s}× (r → ${s}r). Its volume multiplies by:`,
          options: numOpts(cubeScale, [s - cubeScale, s * s - cubeScale, 2, -2]),
          answer: String(cubeScale),
          hint: `Volume scales as r³ → ${s}³!`,
          whyEasy: `${s}³ = ${cubeScale}× larger volume!`
        };
      }

      case "permutations-combinatorics-piecewise": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const n = randInt(4, 7);
          const ans = n * (n - 1);
          return {
            type: "mc",
            prompt: `Pick a President & Vice-President from ${n} candidates (Order matters!):`,
            options: numOpts(ans, [ans / 2 - ans, -2, 2, n]),
            answer: String(ans),
            hint: `${n} choices × ${n - 1} choices!`,
            whyEasy: `${n} × ${n - 1} = ${ans} ordered pairs!`
          };
        }
        if (mode === 1) {
          const bound = randInt(2, 5), val = bound + randInt(1, 3);
          const ans = val * val + 1;
          return {
            type: "mc",
            prompt: `f(x) = { 4x if x < ${bound}; x² + 1 if x ≥ ${bound} }. Find f(${val}):`,
            options: numOpts(ans, [4 * val - ans || 2, -1, 1, 3]),
            answer: String(ans),
            hint: `Is ${val} ≥ ${bound}? Pick the second branch!`,
            whyEasy: `${val} ≥ ${bound} → ${val}² + 1 = ${ans}!`
          };
        }
        const words = [
          { w: "MOON", ans: 12, d: [24, 6, 4], t: "4!/2! = 12" },
          { w: "APPLE", ans: 60, d: [120, 30, 20], t: "5!/2! = 60" },
          { w: "LEVEL", ans: 30, d: [120, 60, 15], t: "5!/(2!·2!) = 30" }
        ];
        const k = words[randInt(0, words.length - 1)];
        return {
          type: "mc",
          prompt: `Distinct letter arrangements of the word '${k.w}':`,
          options: numOpts(k.ans, k.d.map((x) => x - k.ans)),
          answer: String(k.ans),
          hint: "n! divided by factorial of each repeated letter!",
          whyEasy: `${k.t} arrangements!`
        };
      }

      case "physics-projectiles-circular-torque": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const r = randInt(2, 6), v = r * randInt(2, 3);
          const ac = (v * v) / r;
          return {
            type: "mc",
            prompt: `Centripetal acceleration a_c = v²/r when v = ${v} m/s in a ${r} m radius turn:`,
            options: numOpts(ac, [v / r - ac || -2, 2, -2, r]),
            answer: String(ac),
            hint: `${v}² ÷ ${r}!`,
            whyEasy: `${v * v} ÷ ${r} = ${ac} m/s² inward!`
          };
        }
        if (mode === 1) {
          const f1 = randInt(3, 8) * 10, d1 = randInt(2, 4), d2 = d1 * 2;
          const f2 = (f1 * d1) / d2;
          return {
            type: "mc",
            prompt: `Seesaw Torque Balance: ${f1} N at ${d1} m left balances how much force (N) at ${d2} m right?`,
            options: numOpts(f2, [f1 * 2 - f2, -5, 5, 10]),
            answer: String(f2),
            hint: `F₁d₁ = F₂d₂ → ${f1 * d1} = F₂ × ${d2}!`,
            whyEasy: `${f1 * d1} ÷ ${d2} = ${f2} N!`
          };
        }
        const speed = randInt(20, 50);
        return {
          type: "mc",
          prompt: `Ball fired at ${speed} m/s horizontally vs identical ball dropped from rest at same cliff height. Ignoring air resistance:`,
          options: strOpts("Both hit ground at the exact same second", ["Fired ball stays aloft twice as long", "Dropped ball always lands first", "Fired ball drops slower"]),
          answer: "Both hit ground at the exact same second",
          hint: "Gravity pulls downward identically regardless of horizontal motion!",
          whyEasy: "X and Y components are 100% independent!"
        };
      }

      case "physics-thermo-fluids": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const m = randInt(1, 4) * 100, dT = randInt(5, 15), c = 2;
          const q = m * c * dT;
          return {
            type: "mc",
            prompt: `Q = m·c·ΔT: ${m} g sample (c = 2 J/g·°C) warms by ΔT = ${dT}°C. Heat added (J)?`,
            options: numOpts(q, [-200, 200, -500, 500]),
            answer: String(q),
            hint: `${m} × 2 × ${dT}!`,
            whyEasy: `${q} Joules!`
          };
        }
        if (mode === 1) {
          const a1 = randInt(4, 10), v1 = randInt(2, 5), a2 = a1 / 2;
          return {
            type: "mc",
            prompt: `Continuity A₁v₁ = A₂v₂: Fluid moves at ${v1} m/s in pipe area ${a1.toFixed(0)} cm², then narrows to HALF the area. New speed (m/s)?`,
            options: numOpts(v1 * 2, [Math.max(1, v1) - v1 * 2, -1, 2, 4]),
            answer: String(v1 * 2),
            hint: "Cut area in half → speed doubles!",
            whyEasy: `${v1} × 2 = ${v1 * 2} m/s (with a2 = ${a2.toFixed(1)} cm²)!`
          };
        }
        const f1 = randInt(2, 8) * 10, mult = randInt(4, 10);
        return {
          type: "mc",
          prompt: `Hydraulic press: large piston has ${mult}× more area than small piston. Pushing small piston with ${f1} N lifts:`,
          options: numOpts(f1 * mult, [f1 / 2 - f1 * mult || -20, 20, -40, 40]),
          answer: String(f1 * mult),
          hint: `Pascal multiplies force by area ratio ×${mult}!`,
          whyEasy: `${f1} × ${mult} = ${f1 * mult} N!`
        };
      }

      case "physics-optics-magnetism": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const bank = [
            { f: 10, do: 20, di: 20 }, { f: 10, do: 15, di: 30 }, { f: 6, do: 12, di: 12 }, { f: 12, do: 24, di: 24 }
          ];
          const p = bank[randInt(0, bank.length - 1)];
          return {
            type: "mc",
            prompt: `Thin Lens 1/f = 1/d_o + 1/d_i: focal f = ${p.f} cm, object d_o = ${p.do} cm → d_i (cm)?`,
            options: numOpts(p.di, [-5, 5, 10, -2]),
            answer: String(p.di),
            hint: `1/${p.f} − 1/${p.do} = 1/d_i!`,
            whyEasy: `d_i = ${p.di} cm!`
          };
        }
        if (mode === 1) {
          const toDenser = randInt(0, 1) === 1;
          return {
            type: "mc",
            prompt: toDenser ? "Light moves from Air (n=1.0) into Diamond (n=2.4). It bends:" : "Light speeds UP passing from Glass (n=1.5) back into Air (n=1.0). It bends:",
            options: strOpts(toDenser ? "Toward the normal line" : "Away from the normal line", [
              "Toward the normal line", "Away from the normal line", "90° backward", "Straight with zero bend"
            ]),
            answer: toDenser ? "Toward the normal line" : "Away from the normal line",
            hint: "Slowing down steers TOWARD normal; speeding up swings AWAY!",
            whyEasy: toDenser ? "High index n slows light → toward normal!" : "Low index n speeds light → away from normal!"
          };
        }
        const q = randInt(2, 5), v = randInt(3, 8), b = randInt(2, 4);
        return {
          type: "mc",
          prompt: `Charge q = ${q} C enters a ${b} T field perpendicularly at v = ${v} m/s. Magnetic force F = qvB (N)?`,
          options: numOpts(q * v * b, [-6, 6, q + v + b - q * v * b, 10]),
          answer: String(q * v * b),
          hint: `Multiply ${q} × ${v} × ${b}!`,
          whyEasy: `${q} × ${v} × ${b} = ${q * v * b} N!`
        };
      }

      case "chem-electron-config-trends": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const els = [
            { n: "Carbon (#6)", cfg: "1s² 2s² 2p²" },
            { n: "Oxygen (#8)", cfg: "1s² 2s² 2p⁴" },
            { n: "Neon (#10)", cfg: "1s² 2s² 2p⁶" },
            { n: "Magnesium (#12)", cfg: "1s² 2s² 2p⁶ 3s²" }
          ];
          const k = els[randInt(0, els.length - 1)];
          return {
            type: "mc",
            prompt: `Ground-state electron configuration of ${k.n}:`,
            options: strOpts(k.cfg, els.map((e) => e.cfg).concat(["1s² 2s⁴"])),
            answer: k.cfg,
            hint: "Count total superscripts (s max 2, p max 6)!",
            whyEasy: `${k.n} fills to ${k.cfg}!`
          };
        }
        if (mode === 1) {
          const dir = randInt(0, 1) === 1;
          return {
            type: "mc",
            prompt: dir
              ? "Which corner of the Periodic Table (excluding Noble Gases) holds the HIGHEST Electronegativity?"
              : "Which corner of the Periodic Table contains the LARGEST atomic radius?",
            options: strOpts(dir ? "Top-Right (Fluorine)" : "Bottom-Left (Cesium / Francium)", [
              "Top-Right (Fluorine)", "Bottom-Left (Cesium / Francium)", "Middle D-block", "Exact Center"
            ]),
            answer: dir ? "Top-Right (Fluorine)" : "Bottom-Left (Cesium / Francium)",
            hint: "F pulls hardest; Fr has the most shells + weakest nuclear grip!",
            whyEasy: dir ? "Small shell + strong pull = Top-Right Fluorine!" : "Extra electron shells + few protons = huge Bottom-Left radius!"
          };
        }
        const sub = [{ l: "s", c: 2 }, { l: "p", c: 6 }, { l: "d", c: 10 }, { l: "f", c: 14 }][randInt(0, 3)];
        return {
          type: "mc",
          prompt: `Maximum electrons allowed in ANY '${sub.l}' subshell:`,
          options: strOpts(String(sub.c), ["2", "6", "10", "14"]),
          answer: String(sub.c),
          hint: "s=2, p=6, d=10, f=14 (step by +4 each time)!",
          whyEasy: `Subshell '${sub.l}' holds ${sub.c} electrons!`
        };
      }

      case "chem-vsepr-lewis-shapes": {
        const bank = [
          { m: "CO₂ (2 double bonds, 0 lone pairs)", sh: "Linear (180°)", d: ["Bent", "Tetrahedral", "Trigonal Planar"], t: "2 regions maximize distance at 180° Linear!" },
          { m: "BF₃ (3 bonds, 0 lone pairs)", sh: "Trigonal Planar (120°)", d: ["Tetrahedral", "Linear", "Pyramidal"], t: "3 equal domains → 120° flat triangle!" },
          { m: "CH₄ (4 bonds, 0 lone pairs)", sh: "Tetrahedral (109.5°)", d: ["Square Planar", "Trigonal Planar", "Bent"], t: "4 domains in 3D → 109.5° Tetrahedral!" },
          { m: "H₂O (2 bonds + 2 lone pairs on O)", sh: "Bent (~104.5°)", d: ["Linear (180°)", "Trigonal Planar", "Tetrahedral"], t: "Oxygen's 2 lone pairs bend water into a polar V!" },
          { m: "NH₃ (3 bonds + 1 lone pair on N)", sh: "Trigonal Pyramidal (~107°)", d: ["Linear", "Trigonal Planar", "Square Planar"], t: "1 lone pair on top pushes 3 N−H bonds down into a pyramid!" }
        ];
        const k = bank[randInt(0, bank.length - 1)];
        return {
          type: "mc",
          prompt: `VSEPR 3D Shape of ${k.m}:`,
          options: strOpts(k.sh, k.d),
          answer: k.sh,
          hint: "Count total bonding regions + lone pairs on the central atom!",
          whyEasy: k.t
        };
      }

      case "chem-equilibrium-redox-kinetics": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const addRight = randInt(0, 1) === 1;
          return {
            type: "mc",
            prompt: addRight
              ? "Equilibrium: A + B ⇌ C + D. If you ADD excess Product D on the right, equilibrium shifts:"
              : "Equilibrium: A + B ⇌ C + D. If you REMOVE Product C constantly as it forms, equilibrium shifts:",
            options: strOpts(addRight ? "Left (back toward Reactants)" : "Right (makes more Products)", [
              "Left (back toward Reactants)", "Right (makes more Products)", "Does not shift", "Catalyst dissolves"
            ]),
            answer: addRight ? "Left (back toward Reactants)" : "Right (makes more Products)",
            hint: "Le Chatelier shifts AWAY from additions and TOWARD holes!",
            whyEasy: addRight ? "Excess D shoves reaction Left!" : "Removing C pulls reaction Right!"
          };
        }
        if (mode === 1) {
          const bank = [
            { rx: "Mg⁰ → Mg²⁺ + 2e⁻", ans: "Oxidized (charge ↑, lost e⁻)" },
            { rx: "Cl₂⁰ + 2e⁻ → 2Cl⁻", ans: "Reduced (charge ↓, gained e⁻)" },
            { rx: "Cu²⁺ + 2e⁻ → Cu⁰", ans: "Reduced (charge ↓, gained e⁻)" },
            { rx: "Al⁰ → Al³⁺ + 3e⁻", ans: "Oxidized (charge ↑, lost e⁻)" }
          ];
          const k = bank[randInt(0, bank.length - 1)];
          return {
            type: "mc",
            prompt: `Half-reaction '${k.rx}': the metal/nonmetal is being:`,
            options: strOpts(k.ans, ["Oxidized (charge ↑, lost e⁻)", "Reduced (charge ↓, gained e⁻)", "Decomposed by catalyst", "Buffered at pH 7"]),
            answer: k.ans,
            hint: "OIL RIG: Oxidation Is Loss, Reduction Is Gain!",
            whyEasy: k.ans
          };
        }
        const oxPairs = [
          { f: "H₂SO₄ (H=+1, O=−2)", el: "S", ans: 6 },
          { f: "HNO₃ (H=+1, O=−2)", el: "N", ans: 5 },
          { f: "KMnO₄ (K=+1, O=−2)", el: "Mn", ans: 7 },
          { f: "CO₂ (O=−2)", el: "C", ans: 4 }
        ];
        const p = oxPairs[randInt(0, oxPairs.length - 1)];
        return {
          type: "mc",
          prompt: `Find the oxidation state of ${p.el} in neutral ${p.f}:`,
          options: numOpts(p.ans, [-2, -1, 1, 2]),
          answer: String(p.ans),
          hint: "All oxidation numbers in a neutral compound add up to 0!",
          whyEasy: `Balancing H/K (+) and O (−2) leaves ${p.el} = +${p.ans}!`
        };
      }

      case "bio-macromolecules-enzymes": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const pairs = [
            { m: "Amino Acids", poly: "Proteins / Enzymes" },
            { m: "Monosaccharides (Glucose)", poly: "Carbohydrates (Starch/Cellulose)" },
            { m: "Nucleotides", poly: "Nucleic Acids (DNA/RNA)" },
            { m: "Fatty Acids & Glycerol", poly: "Lipids / Phospholipids" }
          ];
          const k = pairs[randInt(0, pairs.length - 1)];
          return {
            type: "mc",
            prompt: `Which biological polymer is assembled from '${k.m}'?`,
            options: strOpts(k.poly, pairs.map((x) => x.poly)),
            answer: k.poly,
            hint: "Match monomer building blocks to polymer family!",
            whyEasy: `${k.m} link together to build ${k.poly}!`
          };
        }
        if (mode === 1) {
          const temp = randInt(75, 98);
          return {
            type: "mc",
            prompt: `An enzyme from human blood (optimal 37°C) is heated to ${temp}°C. Why does its reaction rate drop to 0?`,
            options: strOpts("Enzyme denatures (3D active site unfolds)", ["Substrates freeze solid", "Coenzymes turn to gas", "ATP reverses into starch"]),
            answer: "Enzyme denatures (3D active site unfolds)",
            hint: "Hydrogen bonds holding the protein shape melt!",
            whyEasy: `${temp}°C unfolds the Active Site so substrates can no longer bind!`
          };
        }
        return {
          type: "mc",
          prompt: "How does an Enzyme speed up biological reactions in living cells?",
          options: strOpts("Lowers Activation Energy without being used up", ["Pushes reaction uphill with extra heat", "Breaks DNA into amino acids", "Gets permanently destroyed per molecule"]),
          answer: "Lowers Activation Energy without being used up",
          hint: "Biological catalyst!",
          whyEasy: "Enzymes lower the energy hill & reset reusable afterward!"
        };
      }

      case "bio-pedigrees-sex-linked": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const bank = [
            { q2: 0.04, q: 0.2, p: 0.8, car: 32 },
            { q2: 0.09, q: 0.3, p: 0.7, car: 42 },
            { q2: 0.16, q: 0.4, p: 0.6, car: 48 },
            { q2: 0.25, q: 0.5, p: 0.5, car: 50 }
          ];
          const k = bank[randInt(0, bank.length - 1)];
          return {
            type: "mc",
            prompt: `Hardy-Weinberg: ${Math.round(k.q2 * 100)}% of a herd show a recessive coat (q² = ${k.q2}). What % are CARRIERS (2pq)?`,
            options: numOpts(k.car, [-8, 8, Math.round(k.q * 100) - k.car || 12, 10]),
            answer: String(k.car),
            hint: `√${k.q2} = q = ${k.q} → p = ${k.p} → 2·p·q = ?`,
            whyEasy: `2(${k.p})(${k.q}) = ${k.car}%!`
          };
        }
        if (mode === 1) {
          return {
            type: "mc",
            prompt: "Pedigree Clue: Two unaffected parents have a child affected by the trait. Mode of inheritance?",
            options: strOpts("Recessive (parents must both be hidden carriers)", ["Dominant", "Mitochondrial only", "Y-Linked"]),
            answer: "Recessive (parents must both be hidden carriers)",
            hint: "Skipped generation is the smoking gun!",
            whyEasy: "A dominant trait cannot appear unless at least one parent expresses it!"
          };
        }
        return {
          type: "mc",
          prompt: "Hemophilia is X-linked recessive. If a Carrier Mom (XᴴXʰ) and Normal Dad (XᴴY) have a SON, chance the son has Hemophilia?",
          options: strOpts("50%", ["0%", "25%", "100%"]),
          answer: "50%",
          hint: "Dad already gave Y to the son! Son gets Mom's Xᴴ OR Xʰ with equal 50/50 odds!",
          whyEasy: "Sons get only 1 X from Mom → 50% XʰY affected!"
        };
      }

      case "bio-human-physiology": {
        const qs = [
          { q: "Which heart chamber pumps high-pressure oxygenated blood to the entire BODY via the Aorta?", a: "Left Ventricle", d: ["Right Atrium", "Right Ventricle", "Left Atrium"], t: "Left Ventricle has the thickest muscular wall!" },
          { q: "When blood glucose spikes high after a meal, the pancreas secretes:", a: "Insulin", d: ["Glucagon", "Estrogen", "Melatonin"], t: "Insulin signals cells to absorb glucose!" },
          { q: "During an immune defense, which cells directly destroy virus-infected body cells?", a: "Cytotoxic T-Cells (CD8⁺)", d: ["Platelets", "Red Blood Cells", "Neurons"], t: "Killer T-cells punch holes in infected host cells!" },
          { q: "Microscopic filtration unit inside the Kidney:", a: "Nephron", d: ["Alveolus", "Villus", "Axon"], t: "Nephrons filter urea waste & balance water!" }
        ];
        const k = qs[randInt(0, qs.length - 1)];
        return { type: "mc", prompt: k.q, options: strOpts(k.a, k.d), answer: k.a, hint: "Think structure → specific organ role!", whyEasy: k.t };
      }

      case "bio-taxonomy-plants-viruses": {
        const qs = [
          { q: "Taxonomy order from BROADEST to NARROWEST after Domain & Kingdom:", a: "Phylum → Class → Order → Family → Genus → Species", d: ["Class → Phylum → Family → Order → Species", "Genus → Family → Class → Phylum → Species", "Order → Class → Family → Phylum → Genus"], t: "Dear King Philip Came Over For Good Soup!" },
          { q: "Plant vascular tube lifting Water UP from roots via transpiration:", a: "Xylem", d: ["Phloem", "Guard cell", "Cambium cork"], t: "Xylem = Water UP; Phloem = Food Flows!" },
          { q: "Why do Antibiotics kill Strep bacteria but fail completely against cold/flu Viruses?", a: "Viruses lack bacterial cell walls & ribosomes", d: ["Viruses move too fast", "Antibiotics feed viruses", "Viruses are plants"], t: "Viruses are acellular hijackers with no bacterial targets!" },
          { q: "Guard cells control opening & closing of leaf pores called:", a: "Stomata", d: ["Mitochondria", "Rhizomes", "Flagella"], t: "Stomata balance CO₂ intake vs water evaporation!" }
        ];
        const k = qs[randInt(0, qs.length - 1)];
        return { type: "mc", prompt: k.q, options: strOpts(k.a, k.d), answer: k.a, hint: "Check classic biology vocabulary!", whyEasy: k.t };
      }

      case "verbal-grammar-syntax": {
        const mode = randInt(0, 3);
        if (mode === 0) {
          const bank = [
            { s: "The stack of dusty lab reports ___ sitting on the desk.", ans: "is", trap: "are", sub: "stack (singular)" },
            { s: "Each of the graduating seniors ___ received a schedule.", ans: "has", trap: "have", sub: "Each (always singular)" },
            { s: "The coach, along with her best players, ___ cheering.", ans: "was", trap: "were", sub: "coach (singular)" },
            { s: "Neither the keys nor the wallet ___ on the counter.", ans: "is", trap: "are", sub: "wallet (closer singular subject)" }
          ];
          const k = bank[randInt(0, bank.length - 1)];
          return {
            type: "mc",
            prompt: `Cross out interrupters! Pick the correct verb: "${k.s}"`,
            options: strOpts(k.ans, [k.trap, "were being", "have been"]),
            answer: k.ans,
            hint: "Delete 'of.../along with...' phrases first!",
            whyEasy: `True subject = ${k.sub} → '${k.ans}'!`
          };
        }
        if (mode === 1) {
          return {
            type: "mc",
            prompt: "Fix the Dangling Modifier: 'Peering through the microscope, ___.'",
            options: strOpts("the biologist spotted a dividing amoeba", ["a dividing amoeba floated smoothly", "the glass slide cracked slowly", "the laboratory lights buzzed"]),
            answer: "the biologist spotted a dividing amoeba",
            hint: "Who was peering? Put THAT actor first after the comma!",
            whyEasy: "Amoebas, slides, and lights cannot peer — only the biologist can!"
          };
        }
        if (mode === 2) {
          return {
            type: "mc",
            prompt: "Parallel Structure! Pick the smoothest ending: 'The tutor emphasizes accuracy, clear logic, and ___.'",
            options: strOpts("rapid recall", ["to recall fast", "recalling quickly", "you should recall"]),
            answer: "rapid recall",
            hint: "Match Noun, Noun, and Noun!",
            whyEasy: "'accuracy', 'clear logic', and 'rapid recall' keep all three items noun phrases!"
          };
        }
        return {
          type: "mc",
          prompt: "Choose the right Pronoun Case: 'The lab prize was split evenly between Sam and ___.'",
          options: strOpts("me", ["I", "myself", "he"]),
          answer: "me",
          hint: "Preposition 'between' takes object pronouns (test: split for 'me', not 'I')!",
          whyEasy: "'Between [him] and me' uses objective case!"
        };
      }

      case "verbal-reading-inference": {
        const qs = [
          { q: "A paragraph argues 'Early cities thrived near rivers; NEVERTHELESS, modern pipelines let desert cities boom.' Main focus?", a: "How pipeline tech lets modern cities bypass river limits", d: ["All ancient cities vanished", "Pipelines taste better than rivers", "Deserts have zero sunlight"], t: "Focus pivots right after NEVERTHELESS!" },
          { q: "Author writes: 'Few historians deny the treaty slowed war, yet none claim it cured border disputes.' Tone toward the treaty?", a: "Balanced / Mixed assessment", d: ["Wildly celebratory", "Bitterly sarcastic", "Uninformed"], t: "Credits slowing war while noting limits = balanced nuance!" },
          { q: "'Every single shark ever spotted here happened in summer; therefore summer heat transforms fish into sharks.' Logical flaw?", a: "False Cause (Correlation ≠ Causation)", d: ["Ad Hominem attack", "Double negative", "Appealing to dictionaries"], t: "Seasonal coincidence isn't causal transformation!" },
          { q: "In standardized reading sections, which answer choice word is a HUGE red-flag trap?", a: "'Always / Never / Completely impossible'", d: ["'Suggests / Often / Tends to'", "'Primarily'", "'In part'"], t: "Sweeping extremes rarely survive passage scrutiny!" }
        ];
        const k = qs[randInt(0, qs.length - 1)];
        return { type: "mc", prompt: k.q, options: strOpts(k.a, k.d), answer: k.a, hint: "Stay strictly inside the evidence & watch transition words!", whyEasy: k.t };
      }

      case "verbal-analogies-vocab": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const pairs = [
            { q: "THERMOMETER : TEMPERATURE :: ODOMETER : ___", ans: "Distance Traveled", d: ["Speed Limit", "Tire Brand", "Fuel Cost"] },
            { q: "SPARK : WILDFIRE :: ___ : TORRENT", ans: "Trickle / Droplet", d: ["Mountain", "Umbrella", "Sunburn"] },
            { q: "CURATOR : MUSEUM :: LIBRARIAN : ___", ans: "Library", d: ["Hospital", "Stadium", "Subway"] },
            { q: "EPHEMERAL : PERMANENT :: OPAQUE : ___", ans: "Transparent", d: ["Heavy", "Ancient", "Dark"] }
          ];
          const k = pairs[randInt(0, pairs.length - 1)];
          return { type: "mc", prompt: `Bridge Analogy! ${k.q}`, options: strOpts(k.ans, k.d), answer: k.ans, hint: "Write a 4-word verb bridge linking the first pair cleanly!", whyEasy: `Matches both exact relation AND A→B word order → ${k.ans}!` };
        }
        const roots = [
          { r: "chron-", m: "Time (chronology / synchronize)", d: ["Shape", "Water", "Fire"] },
          { r: "pseudo-", m: "False / Fake (pseudonym)", d: ["Fast", "True", "Half"] },
          { r: "ambi-", m: "Both (ambidextrous / ambiguous)", d: ["None", "Above", "Tiny"] },
          { r: "bene-", m: "Good / Well (benefit / benevolent)", d: ["Evil", "Cold", "Loud"] }
        ];
        const k = roots[randInt(0, roots.length - 1)];
        return { type: "mc", prompt: `Word Root! What does the Greek/Latin root '${k.r}' mean?`, options: strOpts(k.m, k.d), answer: k.m, hint: "Test everyday English words containing that prefix!", whyEasy: `${k.r} means ${k.m}!` };
      }

      case "logic-deduction-abstract": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const cases = [
            { p: "it is raining", q: "the driveway gets wet", notQ: "the driveway is DRY", ans: "It is NOT raining" },
            { p: "Alex wins gold", q: "Alex steps onto the podium", notQ: "Alex NEVER stepped onto the podium", ans: "Alex did NOT win gold" },
            { p: "the alarm trips", q: "red lights flash", notQ: "NO red lights flashed", ans: "The alarm did NOT trip" }
          ];
          const c = cases[randInt(0, cases.length - 1)];
          return {
            type: "mc",
            prompt: `Logic Rule: "If ${c.p}, then ${c.q}." Given: ${c.notQ}. Guaranteed conclusion?`,
            options: strOpts(c.ans, ["The rule flipped backward", "The opposite side happened twice", "Nothing can ever be known"]),
            answer: c.ans,
            hint: "Contrapositive: (P → Q) guarantees (¬Q → ¬P)!",
            whyEasy: `Flip & negate BOTH sides → ${c.ans}!`
          };
        }
        if (mode === 1) {
          const step1 = randInt(2, 5), step2 = randInt(3, 7);
          const a = step1, b = step2, c = step1 * 2, d = step2 * 2, e = step1 * 3;
          return {
            type: "mc",
            prompt: `Alternating Two-Lane Sequence: ${a}, ${b}, ${c}, ${d}, ${e}, ___`,
            options: numOpts(step2 * 3, [-step2, step1 * 4 - step2 * 3 || 2, 3, -2]),
            answer: String(step2 * 3),
            hint: "Ignore the 1st/3rd/5th lane — follow ONLY positions 2, 4, 6!",
            whyEasy: `Even lane climbs by +${step2}: ${b}, ${d}, ${step2 * 3}!`
          };
        }
        const diff = randInt(3, 6);
        const start = randInt(2, 5);
        // Growing differences: start, +diff, +2*diff, +3*diff, +4*diff
        const n1 = start;
        const n2 = n1 + diff;
        const n3 = n2 + 2 * diff;
        const n4 = n3 + 3 * diff;
        const n5 = n4 + 4 * diff;
        return {
          type: "mc",
          prompt: `Second-Order Pattern: ${n1}, ${n2}, ${n3}, ${n4}, ___`,
          options: numOpts(n5, [-diff, diff, 2, -2]),
          answer: String(n5),
          hint: `Look at jumps between terms: +${diff}, +${2 * diff}, +${3 * diff}, next +${4 * diff}!`,
          whyEasy: `${n4} + ${4 * diff} = ${n5}!`
        };
      }

      default:
        return prevGen(nodeId);
    }
  };

  // ==================== MULTI-STEP EXAM SYNTHESIS BOSS BANK ====================
  DATA.SYNTHESIS_PROBLEMS = [
    {
      id: "synth_01_braking_block",
      subject: "Physics + Units",
      badge: "🚚 Unit Conversion + Kinematics + F=ma",
      title: "The 2,000 g Block Braking Force",
      concepts: ["g → kg", "km/h → m/s", "a = Δv / t", "F = m · a"],
      trapWarning: "TRAP: Don't plug grams (2,000) or km/h (36) directly into F = ma! SI units demand kg and m/s.",
      prompt: "A 2,000 g block initially moving at 36 km/h slides across a rough surface and stops in 5 seconds. What magnitude of net braking force (Newtons) acted on the block?",
      options: ["4 N", "14.4 N", "4,000 N", "7,200 N"],
      answer: "4 N",
      stepsChain: [
        "1. Mass conversion: 2,000 g ÷ 1,000 = 2 kg.",
        "2. Speed conversion: 36 km/h ÷ 3.6 = 10 m/s (since 36,000 m ÷ 3,600 s = 10 m/s).",
        "3. Kinematics deceleration: a = Δv / t = 10 m/s ÷ 5 s = 2 m/s².",
        "4. Newton's 2nd Law: F = m · a = 2 kg × 2 m/s² = 4 N!"
      ],
      whyEasy: "Clean conversions shrink intimidating numbers right down to 2 kg × (10 ÷ 5) = 4 N!"
    },
    {
      id: "synth_02_ideal_gas_moles",
      subject: "Chemistry + Kelvin + Algebra",
      badge: "🧪 Grams → Moles + °C → K + PV=nRT",
      title: "Pressurized CO₂ Cylinder Synthesis",
      concepts: ["Molar Mass (g/mol)", "n = grams/MM", "K = °C + 273", "Ideal Gas PV = nRT"],
      trapWarning: "TRAP: Never use 27°C inside PV = nRT (always convert to Kelvin!), and compute CO₂'s molar mass 12 + 2(16) = 44 g/mol!",
      prompt: "88 g of CO₂ (C=12, O=16 g/mol) is sealed inside a 10 L tank at 27°C. Using R ≈ 0.08 L·atm/(mol·K), what is the gas pressure P?",
      options: ["4.8 atm", "2.4 atm", "0.43 atm", "21.6 atm"],
      answer: "4.8 atm",
      stepsChain: [
        "1. Molar mass CO₂: 12 + 2(16) = 44 g/mol → n = 88 ÷ 44 = 2 moles.",
        "2. Temperature in Kelvin: 27°C + 273 = 300 K.",
        "3. Solve PV = nRT → P = (2 × 0.08 × 300) ÷ 10 = 48 ÷ 10 = 4.8 atm!"
      ],
      whyEasy: "Moles = 2, Kelvin = 300 → 2 × 0.08 × 300 ÷ 10 cleanly simplifies to 4.8 atm!"
    },
    {
      id: "synth_03_ph_dilution",
      subject: "Chemistry + Logs + Ratios",
      badge: "🍋 Molarity Dilution + Logarithmic pH",
      title: "Strong Acid Double-Jump Dilution",
      concepts: ["M₁V₁ = M₂V₂", "Strong Acid [H⁺] = M", "pH = −log₁₀[H⁺]"],
      trapWarning: "TRAP: Adding 90 mL of water to 10 mL of acid makes TOTAL volume 100 mL (a 10× dilution, NOT 9×)!",
      prompt: "You start with 10 mL of HCl acid at pH = 1. You dilute it by adding pure water until the TOTAL volume reaches 1,000 mL. What is the new pH?",
      options: ["pH = 3", "pH = 2", "pH = 100", "pH = 0.01"],
      answer: "pH = 3",
      stepsChain: [
        "1. Dilution factor: V₂ / V₁ = 1,000 mL ÷ 10 mL = 100× diluted (10²).",
        "2. Acid concentration [H⁺] drops by 10² (moves right toward 7 by 2 pH steps).",
        "3. New pH = 1 + 2 = 3!"
      ],
      whyEasy: "100× dilution = 10² = +2 steps up the pH scale (less acidic): pH 1 → pH 3!"
    },
    {
      id: "synth_04_calc_optimization",
      subject: "Calculus + Geometry + Quadratics",
      badge: "📈 Perimeter Constraint + Derivative Max Area",
      title: "River-Wall Farmers' Fence Optimization",
      concepts: ["Word Constraint (3 sides)", "Quadratic Area A(x)", "dA/dx = 0"],
      trapWarning: "TRAP: The river forms the 4th side — only use 2 widths + 1 length = 80 m!",
      prompt: "A farmer uses 80 m of fencing to enclose a rectangular pasture against a straight river (no fence needed along the river!). What is the MAXIMUM possible area?",
      options: ["800 m²", "400 m²", "1,600 m²", "600 m²"],
      answer: "800 m²",
      stepsChain: [
        "1. Constraint along 3 fenced sides: 2W + L = 80 → L = 80 − 2W.",
        "2. Area function: A(W) = W(80 − 2W) = 80W − 2W².",
        "3. Take derivative & set = 0: dA/dW = 80 − 4W = 0 → W = 20 m, so L = 40 m.",
        "4. Max Area = 20 × 40 = 800 m²!"
      ],
      whyEasy: "Half the fence (40 m) parallel to the river, remaining 40 m split between two 20 m sides → 800 m²!"
    },
    {
      id: "synth_05_pe_to_ke_speed",
      subject: "Physics + Algebra + Roots",
      badge: "🎢 Energy Conservation + g=10 + √",
      title: "Roller Coaster Frictionless Plunge",
      concepts: ["PE = mgh", "KE = ½mv²", "Mass Cancellation", "Square Root"],
      trapWarning: "TRAP: Mass wasn't given — don't panic! Set mgh = ½mv² and watch 'm' cancel right off both sides!",
      prompt: "A roller coaster cart starts from rest at height h = 20 m and drops down a frictionless track (g = 10 m/s²). How fast (m/s) is it going at the bottom?",
      options: ["20 m/s", "400 m/s", "10 m/s", "14.1 m/s"],
      answer: "20 m/s",
      stepsChain: [
        "1. Conservation of Energy: PE_top = KE_bottom → m · g · h = ½ · m · v².",
        "2. Cancel m from both sides → gh = ½v² → v² = 2gh.",
        "3. Plug numbers: v² = 2(10)(20) = 400 → v = √400 = 20 m/s!"
      ],
      whyEasy: "v = √(2gh) works for ANY mass — √400 = 20 m/s!"
    },
    {
      id: "synth_06_circuits_power",
      subject: "Physics + Series/Parallel + Power",
      badge: "⚡ Parallel Req + Ohm's Law + P = V·I",
      title: "Parallel Circuit Wattage Load",
      concepts: ["Parallel Resistance", "I = V / R_eq", "Power P = V · I"],
      trapWarning: "TRAP: Two 12 Ω resistors in PARALLEL do NOT sum to 24 Ω! Equal parallel twins HALVE total resistance!",
      prompt: "Two identical 12 Ω heaters are wired in PARALLEL across a 24 V battery. Total power (Watts) pulled from the battery?",
      options: ["96 W", "24 W", "48 W", "12 W"],
      answer: "96 W",
      stepsChain: [
        "1. Parallel twins halve resistance: R_eq = 12 Ω ÷ 2 = 6 Ω.",
        "2. Total battery current: I = V / R_eq = 24 V ÷ 6 Ω = 4 A.",
        "3. Total Power: P = V · I = 24 V × 4 A = 96 W!"
      ],
      whyEasy: "Two 12 Ω in parallel act like a wider 6 Ω pipe → 4 A × 24 V = 96 W!"
    },
    {
      id: "synth_07_hardy_weinberg_count",
      subject: "Biology + Percent + Roots + Population",
      badge: "🧬 Recessive Fraction → √q² → Carriers Count",
      title: "Rare Trait Carrier Headcount",
      concepts: ["Decimal → Fraction", "q = √(q²)", "2pq Carrier Formula", "N × % Scaling"],
      trapWarning: "TRAP: Don't confuse q² (recessive trait) with q (allele frequency) or 2pq (healthy carriers)!",
      prompt: "Out of 500 island birds, 20 birds show a homozygous recessive short beak (aa). How many birds in the population are healthy heterozygous CARRIERS (Aa)?",
      options: ["160 birds", "20 birds", "320 birds", "100 birds"],
      answer: "160 birds",
      stepsChain: [
        "1. Recessive frequency q² = 20 / 500 = 0.04.",
        "2. Recessive allele q = √0.04 = 0.2 → Dominant allele p = 1 − 0.2 = 0.8.",
        "3. Carrier fraction 2pq = 2(0.8)(0.2) = 0.32 (32%).",
        "4. Headcount = 0.32 × 500 = 160 carrier birds!"
      ],
      whyEasy: "20/500 = 0.04 → √ is 0.2 → 2(0.8)(0.2) = 32% of 500 = 160!"
    },
    {
      id: "synth_08_river_boat_system",
      subject: "Algebra + Systems + Rates",
      badge: "🚤 Distance=Rate·Time + Systems Elimination",
      title: "Upstream / Downstream River Boat",
      concepts: ["Rate = Dist ÷ Time", "b + c vs b − c", "Elimination Method"],
      trapWarning: "TRAP: Divide each leg's distance by its time FIRST before writing your b + c / b − c system!",
      prompt: "A boat cruises 60 km downstream (with current) in 3 hours, then returns the 60 km upstream (against current) in 5 hours. Speed of the STILL boat (km/h)?",
      options: ["16 km/h", "4 km/h", "15 km/h", "20 km/h"],
      answer: "16 km/h",
      stepsChain: [
        "1. Downstream speed: b + c = 60 ÷ 3 = 20 km/h.",
        "2. Upstream speed: b − c = 60 ÷ 5 = 12 km/h.",
        "3. Add both equations vertically: 2b = 32 → b = 16 km/h (and current c = 4 km/h)!"
      ],
      whyEasy: "Average of 20 and 12 (stack & add!) instantly gives still-water speed 16 km/h!"
    },
    {
      id: "synth_09_probability_bayes",
      subject: "Probability + Bayes + Percent",
      badge: "🩺 Base-Rate False-Positive Trap",
      title: "Medical Screening Real-Odds Puzzle",
      concepts: ["Base Rate Scaling", "True vs False Positives", "Conditional Ratio"],
      trapWarning: "TRAP: A 95% accurate test does NOT mean 95% chance of disease when the condition is rare!",
      prompt: "A condition affects 10 out of every 1,000 people. A test detects 100% of true cases (10 positives), BUT gives a 5% false-positive rate on healthy people (~50 false alarms). If you test positive, roughly what % actually have it?",
      options: ["~17% (10 out of 60)", "95%", "90%", "1%"],
      answer: "~17% (10 out of 60)",
      stepsChain: [
        "1. Out of 1,000 people: 10 sick → all 10 test Positive.",
        "2. Remaining ~990 healthy × 5% false alarm ≈ 50 healthy people ALSO test Positive!",
        "3. Total positive pool = 10 + 50 = 60 positives → True rate = 10 / 60 = 1/6 ≈ 16.7%!"
      ],
      whyEasy: "Turning percentages into actual people out of 1,000 exposes the false-positive flood immediately!"
    },
    {
      id: "synth_10_trig_ladder_kinematics",
      subject: "Trig + Vectors + Work",
      badge: "📐 30-60-90 Triangle + W = F · d · cos θ",
      title: "Angled Wagon Pull Work Synthesis",
      concepts: ["Exact cos(60°) = ½", "Work W = F·d·cos θ", "Unit Check (N·m = J)"],
      trapWarning: "TRAP: Pulling UP at 60° wastes part of your force lifting — ONLY the horizontal F·cos(60°) component moves the wagon!",
      prompt: "You pull a sled 20 meters across flat snow with a 50 N rope angled 60° above the ground. How many Joules of Work do you perform?",
      options: ["500 J", "1,000 J", "866 J", "250 J"],
      answer: "500 J",
      stepsChain: [
        "1. Find exact cos(60°) from a 30-60-90 triangle = 1/2.",
        "2. Compute effective horizontal pull = 50 N × 1/2 = 25 N.",
        "3. Multiply by distance: Work = 25 N × 20 m = 500 Joules!"
      ],
      whyEasy: "cos(60°) = 0.5 cuts your 50 N pull to 25 N forward → 25 × 20 = 500 J!"
    },
    {
      id: "synth_11_stoich_limiting",
      subject: "Chemistry + Ratios + Stoichiometry",
      badge: "🥪 Balanced Equation + Limiting Reactant",
      title: "Limiting Sandwich Reagent Trap",
      concepts: ["Balanced Mole Ratio", "Limiting Reactant", "Grams Conversion"],
      trapWarning: "TRAP: Don't just add grams of reactant together if one runs out early! Check the 2:1 recipe ratio first.",
      prompt: "Reaction: 2H₂ + O₂ → 2H₂O (Molar masses: H₂ = 2 g/mol, O₂ = 32 g/mol, H₂O = 18 g/mol). Mix 8 g of H₂ with 32 g of O₂. Max GRAMS of water made?",
      options: ["36 g", "40 g", "72 g", "18 g"],
      answer: "36 g",
      stepsChain: [
        "1. Convert grams to moles: H₂ = 8 ÷ 2 = 4 mol; O₂ = 32 ÷ 32 = 1 mol.",
        "2. Check recipe (2 H₂ per 1 O₂): 1 mol O₂ only uses 2 mol H₂ → O₂ runs out FIRST (Limiting)!",
        "3. Product H₂O matches H₂ consumed = 2 moles → 2 mol × 18 g/mol = 36 g H₂O (with 4 g H₂ leftover)!"
      ],
      whyEasy: "4 g H₂ leftover couldn't react without extra O₂ — 1 mol O₂ yields max 2 mol (36 g) water!"
    },
    {
      id: "synth_12_logic_grammar_combo",
      subject: "Verbal + Logic + Quantitative",
      badge: "🗣️ Prepositional Strip + Contrapositive",
      title: "CET Dual-Trap Logic + Syntax Sentence",
      concepts: ["Contrapositive Deduction", "Subject-Verb Isolation", "Conditional Flip Trap"],
      trapWarning: "TRAP: Don't let the plural noun inside 'of the policies' trick your verb, and remember Q → P is NOT guaranteed!",
      prompt: "Which statement is BOTH grammatically clean AND logically guaranteed by: 'If an applicant submits late, her file is flagged'?",
      options: [
        "The committee of advisors believes a file that is NOT flagged was NOT submitted late.",
        "The committee of advisors believe any flagged file must be late.",
        "Each of the applicants submitting on time were guaranteed acceptance.",
        "Between she and I, submitting late flags zero files."
      ],
      answer: "The committee of advisors believes a file that is NOT flagged was NOT submitted late.",
      stepsChain: [
        "1. Grammar check: 'The committee [of advisors]' is singular → 'believes' (rules out 'believe', 'Each...were', 'Between she and I').",
        "2. Logic check: Rule is Late → Flagged. Contrapositive (NOT Flagged → NOT Late) is 100% logically valid!"
      ],
      whyEasy: "Cross out '[of advisors]' → singular 'believes', AND ¬Flagged → ¬Late passes both logic and grammar!"
    }
  ];

  DATA.generateSynthesisProblem = function () {
    const mode = randInt(0, 4);
    if (mode === 0) {
      // Randomized Braking Block with unit conversions
      const kg = randInt(2, 6);
      const grams = kg * 1000;
      const vMs = randInt(2, 5) * 5; // 10, 15, 20, 25 m/s
      const kmh = Math.round(vMs * 3.6);
      const t = [2, 5][randInt(0, 1)];
      const accel = vMs / t;
      const force = kg * accel;
      return {
        id: "proc_synth_brake",
        subject: "Physics + Units",
        badge: "🚚 Random Multi-Step: g → kg + km/h → m/s + F=ma",
        title: "Procedural Braking Force Problem",
        concepts: ["g → kg", "km/h → m/s", "a = Δv / t", "F = m · a"],
        trapWarning: `TRAP: Convert ${grams.toLocaleString()} g → ${kg} kg and ${kmh} km/h ÷ 3.6 → ${vMs} m/s BEFORE computing Force!`,
        prompt: `A ${grams.toLocaleString()} g cart sliding at ${kmh} km/h brakes evenly to a full stop in ${t} seconds. Magnitude of braking force (Newtons)?`,
        options: numOpts(force, [kg * vMs - force || 5, force * 1000 - force, -2, 2]).map((x) => `${x} N`),
        answer: `${force} N`,
        stepsChain: [
          `1. Mass: ${grams} g ÷ 1,000 = ${kg} kg.`,
          `2. Speed: ${kmh} km/h ÷ 3.6 = ${vMs} m/s.`,
          `3. Deceleration: a = ${vMs} ÷ ${t} = ${accel} m/s².`,
          `4. Net Force: F = ${kg} kg × ${accel} m/s² = ${force} N!`
        ],
        whyEasy: `${kg} × (${vMs} ÷ ${t}) = ${force} N!`
      };
    }
    if (mode === 1) {
      // Ideal Gas with molar mass + °C -> K
      const gases = [
        { name: "O₂", mm: 32 },
        { name: "CO₂", mm: 44 },
        { name: "CH₄", mm: 16 }
      ];
      const g = gases[randInt(0, gases.length - 1)];
      const moles = randInt(2, 4);
      const grams = moles * g.mm;
      const vol = [10, 20][randInt(0, 1)];
      const kTemp = 300; // 27°C
      const cTemp = 27;
      const press = Number(((moles * 0.08 * kTemp) / vol).toFixed(1));
      return {
        id: "proc_synth_gas",
        subject: "Chemistry + Ideal Gas",
        badge: "🧪 Random Multi-Step: g → mol + °C → K + PV=nRT",
        title: `Pressurized ${g.name} Gas Problem`,
        concepts: ["n = grams / MM", "K = °C + 273", "P = nRT / V"],
        trapWarning: "TRAP: Use 300 K (not 27°C) and divide grams by Molar Mass first!",
        prompt: `${grams} g of ${g.name} (MM = ${g.mm} g/mol) sits in a ${vol} L vessel at ${cTemp}°C (R = 0.08). Pressure P (atm)?`,
        options: strOpts(`${press} atm`, [`${(press * 2).toFixed(1)} atm`, `${(press / 2).toFixed(1)} atm`, `${(press + 1.5).toFixed(1)} atm`]),
        answer: `${press} atm`,
        stepsChain: [
          `1. Moles n = ${grams} ÷ ${g.mm} = ${moles} mol.`,
          `2. Kelvin T = ${cTemp} + 273 = ${kTemp} K.`,
          `3. P = (${moles} × 0.08 × ${kTemp}) ÷ ${vol} = ${press} atm!`
        ],
        whyEasy: `Clean values turn PV = nRT into ${moles} × 24 ÷ ${vol} = ${press} atm!`
      };
    }
    if (mode === 2) {
      // pH dilution
      const startPh = randInt(1, 2);
      const pow = randInt(1, 3);
      const scale = Math.pow(10, pow);
      const v1 = randInt(1, 5) * 10;
      const v2 = v1 * scale;
      const endPh = startPh + pow;
      return {
        id: "proc_synth_ph",
        subject: "Chemistry + Logs",
        badge: "🍋 Random Multi-Step: M₁V₁ = M₂V₂ + pH Jump",
        title: "Serial pH Dilution Boss",
        concepts: ["Dilution Factor", "Log Base-10 Steps", "pH Scale Shift"],
        trapWarning: `TRAP: Diluting ${scale}× shifts pH by +log₁₀(${scale}) = +${pow}, NOT dividing pH by ${scale}!`,
        prompt: `${v1} mL of strong acid at pH = ${startPh} is diluted with pure water up to ${v2.toLocaleString()} mL total. Final pH?`,
        options: numOpts(endPh, [-1, 1, 2, pow + 1]).map((x) => `pH = ${x}`),
        answer: `pH = ${endPh}`,
        stepsChain: [
          `1. Factor: ${v2} ÷ ${v1} = ${scale}× = 10^${pow} dilution.`,
          `2. Every 10× dilution moves acidic pH up +1 toward 7.`,
          `3. New pH = ${startPh} + ${pow} = ${endPh}!`
        ],
        whyEasy: `${pow} zeros on the dilution factor = +${pow} on pH → pH = ${endPh}!`
      };
    }
    if (mode === 3) {
      // Hardy-Weinberg headcount
      const specs = [
        { q2: 0.04, q: 0.2, p: 0.8, carRate: 0.32 },
        { q2: 0.09, q: 0.3, p: 0.7, carRate: 0.42 },
        { q2: 0.16, q: 0.4, p: 0.6, carRate: 0.48 }
      ];
      const sp = specs[randInt(0, specs.length - 1)];
      const pop = [500, 1000, 2000][randInt(0, 2)];
      const recCount = Math.round(pop * sp.q2);
      const carCount = Math.round(pop * sp.carRate);
      return {
        id: "proc_synth_hw",
        subject: "Biology + Math Roots",
        badge: "🧬 Random Multi-Step: Recessive % → √q² → 2pq × N",
        title: "Population Genetics Headcount",
        concepts: ["q² = count/N", "√ to find q", "2pq Heterozygotes"],
        trapWarning: `TRAP: Always start with q² = ${recCount}/${pop} — never take 2 × q²!`,
        prompt: `In a stable colony of ${pop} frogs, ${recCount} show a recessive trait (aa). How many frogs are healthy CARRIERS (Aa)?`,
        options: numOpts(carCount, [recCount - carCount || 40, -60, 60, 100]).map((x) => `${x} frogs`),
        answer: `${carCount} frogs`,
        stepsChain: [
          `1. q² = ${recCount} / ${pop} = ${sp.q2}.`,
          `2. q = √${sp.q2} = ${sp.q} → p = ${sp.p}.`,
          `3. Carrier rate 2pq = 2(${sp.p})(${sp.q}) = ${sp.carRate} → ${sp.carRate} × ${pop} = ${carCount} frogs!`
        ],
        whyEasy: `√${sp.q2} = ${sp.q} unlocks 2pq = ${Math.round(sp.carRate * 100)}% of ${pop} = ${carCount}!`
      };
    }
    // Upstream / Downstream river system
    const boat = randInt(12, 24);
    const curr = randInt(2, 6);
    const tDown = randInt(2, 4);
    const tUp = randInt(tDown + 2, tDown + 4);
    // Keep same distance? Make dist = LCM-friendly or two separate clean distances!
    const dDown = (boat + curr) * tDown;
    const dUp = (boat - curr) * tUp;
    return {
      id: "proc_synth_river",
      subject: "Algebra + Systems",
      badge: "🚤 Random Multi-Step: Dist/Time + Systems Elimination",
      title: "Boat & River Current System",
      concepts: ["Rate = Dist ÷ Time", "b + c vs b − c", "Elimination"],
      trapWarning: "TRAP: Compute both speeds (Dist ÷ Time) before adding the two equations!",
      prompt: `A ferry travels ${dDown} km downstream in ${tDown} hrs, and ${dUp} km upstream in ${tUp} hrs. What is the boat's STILL-WATER speed (km/h)?`,
      options: numOpts(boat, [curr - boat || -4, -2, 2, 4]).map((x) => `${x} km/h`),
      answer: `${boat} km/h`,
      stepsChain: [
        `1. Downstream speed: b + c = ${dDown} ÷ ${tDown} = ${boat + curr} km/h.`,
        `2. Upstream speed: b − c = ${dUp} ÷ ${tUp} = ${boat - curr} km/h.`,
        `3. Add equations: 2b = ${(boat + curr) + (boat - curr)} → b = ${boat} km/h!`
      ],
      whyEasy: `Mean of ${boat + curr} and ${boat - curr} is ${boat} km/h!`
    };
  };
})(typeof window !== "undefined" ? window : globalThis);
