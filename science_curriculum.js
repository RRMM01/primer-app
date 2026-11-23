(function (root) {
  "use strict";

  const DATA = root.MATHLINGO_DATA;
  if (!DATA) return;

  // Tag existing worlds with subject = "math"
  for (const w of DATA.WORLDS) {
    w.subject = "math";
  }

  // Add 3 Science Worlds
  DATA.WORLDS.push(
    {
      id: "physics",
      subject: "physics",
      order: 6,
      icon: "⚛️",
      title: "Physics: Mechanics, E&M, Optics & Modern",
      subtitle: "From F = ma and roller coasters to Coulomb, Capacitors, Kirchhoff, Magnetism & E = mc².",
      color: "#1f6e75",
      colorDark: "#154e54",
      bgSoft: "rgba(31, 110, 117, 0.11)",
      borderSoft: "rgba(31, 110, 117, 0.30)"
    },
    {
      id: "chemistry",
      subject: "chemistry",
      order: 7,
      icon: "🧪",
      title: "Chemistry: Atoms, Bonds, IMFs, Kinetics & Thermo",
      subtitle: "Atoms, stoichiometry, organic polymers, solutions, colligative math, rates, entropy & Gibbs.",
      color: "#2d6a4f",
      colorDark: "#1d4a36",
      bgSoft: "rgba(45, 106, 79, 0.11)",
      borderSoft: "rgba(45, 106, 79, 0.30)"
    },
    {
      id: "biology",
      subject: "biology",
      order: 8,
      icon: "🧬",
      title: "Biology: Cells, Genetics, Biotech, Evolution & Systems",
      subtitle: "Organelles, DNA/RNA, recombinant biotech, evolution, cladistics & plant/animal physiology.",
      color: "#9e4765",
      colorDark: "#753149",
      bgSoft: "rgba(158, 71, 101, 0.11)",
      borderSoft: "rgba(158, 71, 101, 0.30)"
    }
  );

  // Add 4 extra Math nodes + 18 Science nodes (22 new nodes -> 58 total!)
  const EXTRA_NODES = [
    // ==================== 4 MORE MATH NODES ====================
    {
      id: "word-problems-translator",
      worldId: "elementary",
      order: 37,
      title: "Word Problems → Math Translator",
      icon: "🗣️",
      tagline: "Decode English into equations: 'of' = ×, 'is' = =, 'per' = ÷, 'less than' flips!",
      scaryVersion: "Semantic parsing of natural-language quantitative word statements.",
      easyTruth: "Word problems aren't math hard — they're translation! Swap key English words for math symbols word-by-word and the equation writes itself.",
      microSteps: [
        { label: "Step 1: The 4 Magic Swaps", text: "'is / equals / gives' → =. 'of' → × (30% of 50 = 0.30 × 50). 'per / each' → ÷. 'more than' → +." },
        { label: "Step 2: Watch 'Less Than' Flip Order!", text: "'5 less than x' does NOT mean 5 − x! You start with x and lose 5 → x − 5!" },
        { label: "Step 3: Twice / Consecutive Numbers", text: "'Twice a number plus 3 is 15' translates left-to-right: 2x + 3 = 15 → x = 6!" }
      ],
      cheatCode: "'is' = =, 'of' = ×, 'per' = ÷, and 'A less than B' ALWAYS flips to B − A!",
      visualizerId: "algebraBalanceScale",
      questions: [
        { type: "mc", prompt: "Translate: '7 less than a number x'", options: ["7 − x", "x − 7", "7 + x", "x / 7"], answer: "x − 7", hint: "'Less than' flips the order!", whyEasy: "Start with x, take away 7 → x − 7!" },
        { type: "input", prompt: "Translate & solve: 'Three times a number plus 4 is 19'. What is the number?", answer: "5", hint: "3x + 4 = 19.", whyEasy: "3x = 15 → x = 5!" },
        { type: "input", prompt: "What is 'one-fourth OF 36'?", answer: "9", hint: "'of' means multiply: (1/4) × 36.", whyEasy: "36 ÷ 4 = 9!" },
        { type: "input", prompt: "Car travels 180 km in 3 hours. Speed in km PER hour?", answer: "60", hint: "'per' means divide: 180 ÷ 3.", whyEasy: "180 ÷ 3 = 60 km/h!" },
        { type: "mc", prompt: "Two consecutive integers sum to 25. Write the equation:", options: ["x + x = 25", "x + (x + 1) = 25", "x · (x + 1) = 25", "2x − 1 = 25"], answer: "x + (x + 1) = 25", hint: "Next integer after x is (x + 1)!", whyEasy: "x + (x + 1) = 25 → 2x + 1 = 25 → 12 and 13!" }
      ]
    },
    {
      id: "ratios-proportions-rates",
      worldId: "elementary",
      order: 38,
      title: "Ratios, Proportions & Unit Rates",
      icon: "⚖️",
      tagline: "Ratios scale together like recipes. Solve a/b = c/d with the Butterfly Cross!",
      scaryVersion: "Proportional equivalence classes and unit-rate scaling morphisms.",
      easyTruth: "A ratio 2:3 just means for every 2 cups of sugar, add 3 cups of flour. Double the batch? 4:6! And to compare deals, always divide down to the price for ONE item.",
      microSteps: [
        { label: "Step 1: Scale Both Sides Equally", text: "2:5 is identical to 4:10, 6:15, and 20:50 (multiply BOTH by the same number!)." },
        { label: "Step 2: Total Parts Trick", text: "Juice is mixed 2 parts syrup : 3 parts water (5 total parts!). Out of 20 cups total, each part is 20÷5 = 4 cups → 8 syrup & 12 water!" },
        { label: "Step 3: Cross-Multiply Proportions", text: "If 3/4 = x/20, scale 4×5=20 so 3×5=15 — OR cross-multiply: 4x = 60 → x = 15!" }
      ],
      cheatCode: "Find the '1-part' or '1-item' unit rate first, or cross-multiply a/b = c/d → a·d = b·c!",
      visualizerId: "fractionPizzaLab",
      questions: [
        { type: "input", prompt: "Solve the proportion: 3 / 5 = x / 20", answer: "12", hint: "5 × 4 = 20, so multiply top 3 × 4!", whyEasy: "Both scale by ×4 → 12/20!" },
        { type: "input", prompt: "6 apples cost $12. How much do 10 apples cost?", answer: "20", hint: "Unit price = $12 ÷ 6 = $2 per apple.", whyEasy: "10 × $2 = $20!" },
        { type: "input", prompt: "Red and blue marbles are in ratio 2:3. With 25 marbles total, how many are RED?", answer: "10", hint: "2 + 3 = 5 total parts. 25 ÷ 5 = 5 marbles per part!", whyEasy: "2 parts × 5 = 10 red marbles!" },
        { type: "mc", prompt: "Better deal: 4 sodas for $6, OR 6 sodas for $8.40?", options: ["4 for $6 ($1.50 each)", "6 for $8.40 ($1.40 each)", "Same price", "Cannot compare"], answer: "6 for $8.40 ($1.40 each)", hint: "Divide price by count to find unit rate!", whyEasy: "$8.40 ÷ 6 = $1.40 vs $6 ÷ 4 = $1.50 — $1.40 wins!" },
        { type: "input", prompt: "Map scale is 1 cm : 25 km. Two cities are 4 cm apart. Real km?", answer: "100", hint: "Multiply 4 × 25.", whyEasy: "4 × 25 = 100 km!" }
      ]
    },
    {
      id: "polynomials-remainder-div",
      worldId: "senior",
      order: 39,
      title: "Polynomials, Roots & Remainder Theorem",
      icon: "🧱",
      tagline: "Plug in k to get the exact division remainder — zero long division needed!",
      scaryVersion: "Univariate polynomial Euclidean division & Factor Theorem over ℝ[x].",
      easyTruth: "Want the remainder when f(x) is divided by (x − 3)? Don't do ugly polynomial long division! Just plug x = 3 into f(x)! If f(3) = 0, then (x − 3) divides cleanly!",
      microSteps: [
        { label: "Step 1: Degree = Biggest Power", text: "In 5x³ − 2x + 7, the degree is 3 → at most 3 real roots, and ends go opposite directions (like an S!)." },
        { label: "Step 2: Remainder Shortcut", text: "Divide f(x) by (x − k)? Remainder = f(k)! (Flip the sign: for (x + 2), plug x = −2!)." },
        { label: "Step 3: End Behavior Cheat", text: "Even degree (x², x⁴) = both arms point same way (🙌 or 👇). Odd degree (x¹, x³) = one up, one down (🕺)." }
      ],
      cheatCode: "Remainder of f(x) ÷ (x − k) is ALWAYS f(k). Zero remainder means (x − k) is a factor!",
      visualizerId: "unitCircleAndGraphLab",
      questions: [
        { type: "input", prompt: "Remainder Theorem! Remainder when f(x) = x² + 3x + 1 is divided by (x − 2)?", answer: "11", hint: "Plug x = +2 into f(x): 2² + 3(2) + 1.", whyEasy: "4 + 6 + 1 = 11 — zero long division!" },
        { type: "mc", prompt: "If f(4) = 0 for a polynomial f(x), what MUST be a factor of f(x)?", options: ["(x + 4)", "(x − 4)", "(4x − 1)", "x² + 4"], answer: "(x − 4)", hint: "Plug 4 into (x − 4) → 4 − 4 = 0!", whyEasy: "Root x = 4 always matches factor (x − 4)!" },
        { type: "input", prompt: "What is the DEGREE of 7x⁵ − 3x² + 9x − 1?", answer: "5", hint: "Look at the biggest exponent on x.", whyEasy: "Highest power is 5!" },
        { type: "mc", prompt: "What is the remainder when f(x) = x³ + 1 is divided by (x + 1)?", options: ["0", "2", "−1", "1"], answer: "0", hint: "For (x + 1), plug in x = −1!", whyEasy: "(−1)³ + 1 = −1 + 1 = 0! So (x + 1) divides it cleanly!" },
        { type: "mc", prompt: "Which end behavior matches y = −x⁴ + 2x² + 1?", options: ["Both ends go UP", "Both ends go DOWN", "Left down, right up", "Left up, right down"], answer: "Both ends go DOWN", hint: "Even power (4) = both same way; negative front (−1) = frown DOWN!", whyEasy: "Even & negative → both ends point DOWN!" }
      ]
    },
    {
      id: "matrices-3d-transformations",
      worldId: "college",
      order: 40,
      title: "Matrix Multiplication & Solving Ax = b",
      icon: "🕸️",
      tagline: "Matrix × Matrix is just Row · Column dot products! And A · I = A.",
      scaryVersion: "Non-commutative linear operator composition over ℝ^(m×n).",
      easyTruth: "To multiply two matrices A × B, just take each ROW of A and dot-product it with each COLUMN of B! Watch out: order matters — A·B is usually NOT B·A!",
      microSteps: [
        { label: "Step 1: Size Compatibility (Inner Numbers Must Match!)", text: "Can a (2×3) multiply a (3×4)? Inner 3 = 3 ✅ → result size is outer (2×4)! Swap them (3×4)(2×3)? 4 ≠ 2 ❌ Impossible!" },
        { label: "Step 2: Matrix × Vector = Dot Every Row", text: "[[2, 1], [0, 3]] × [4, 5] → Top row: 2(4)+1(5)=13. Bottom row: 0(4)+3(5)=15 → [13, 15]!" },
        { label: "Step 3: Identity Matrix I (The '1' of Matrices)", text: "[[1, 0], [0, 1]] has 1s on diagonal and 0s elsewhere. Multiplying ANY matrix by I leaves it untouched!" }
      ],
      cheatCode: "(m×n) · (n×p) = (m×p). Always Row · Column. Identity I has 1s down the diagonal!",
      visualizerId: "algebraBalanceScale",
      questions: [
        { type: "mc", prompt: "Multiply Matrix × Vector: [[2, 1], [0, 3]] × [4, 5] =", options: ["[13, 15]", "[8, 15]", "[13, 12]", "[9, 8]"], answer: "[13, 15]", hint: "Top: 2(4)+1(5). Bottom: 0(4)+3(5).", whyEasy: "[8+5, 0+15] = [13, 15]!" },
        { type: "mc", prompt: "If Matrix A is (2 × 3) and Matrix B is (3 × 5), what size is A · B?", options: ["(2 × 5)", "(3 × 3)", "(5 × 2)", "Impossible"], answer: "(2 × 5)", hint: "Inner 3s match and cancel; outer numbers give size!", whyEasy: "(2 × 3) · (3 × 5) → (2 × 5)!" },
        { type: "mc", prompt: "Which 2×2 matrix is the Identity Matrix I (does nothing when multiplied)?", options: ["[[1, 1], [1, 1]]", "[[1, 0], [0, 1]]", "[[0, 1], [1, 0]]", "[[0, 0], [0, 0]]"], answer: "[[1, 0], [0, 1]]", hint: "1s on the main diagonal, 0s elsewhere.", whyEasy: "[[1, 0], [0, 1]] keeps x and y unchanged!" },
        { type: "mc", prompt: "Is Matrix multiplication always commutative (does AB always equal BA)?", options: ["Yes, always", "No, order matters (AB ≠ BA usually)", "Only for 2×2", "Only with negatives"], answer: "No, order matters (AB ≠ BA usually)", hint: "Rotating then stretching ≠ stretching then rotating!", whyEasy: "Order matters! Transformations don't commute in general." },
        { type: "input", prompt: "Find the Trace (sum of main diagonal) of [[5, 2], [9, 7]]:", answer: "12", hint: "Add top-left + bottom-right.", whyEasy: "5 + 7 = 12!" }
      ]
    },

    // ==================== WORLD 6: PHYSICS (6 NODES) ====================
    {
      id: "physics-units-vectors",
      worldId: "physics",
      order: 41,
      title: "Units, Scalars vs Vectors & Arrows",
      icon: "🧭",
      tagline: "Scalar = size only (speed). Vector = size + direction (velocity)! Plus 3-4-5 forces.",
      scaryVersion: "Dimensional analysis and directed Euclidean magnitude-bearing observables.",
      easyTruth: "Saying '50 km/h' is a Scalar (speed). Saying '50 km/h NORTH' is a Vector (velocity)! And combining perpendicular vectors (3 East + 4 North) uses the exact same 3-4-5 Pythagoras!",
      microSteps: [
        { label: "Step 1: Scalar vs Vector", text: "Mass (5 kg), Time (10 s), Temperature (30°C) have NO direction → Scalars. Force (10 N up), Velocity, Acceleration have direction → Vectors." },
        { label: "Step 2: Adding Vectors Tip-to-Tail", text: "Walk 5m East then 5m West? Total Distance = 10m, Net Displacement = 0m!" },
        { label: "Step 3: Right-Angle Vectors", text: "Push 6 N East and 8 N North simultaneously → Net force = √(6² + 8²) = 10 N diagonal!" }
      ],
      cheatCode: "Scalar = number only. Vector = number + arrow. Perpendicular arrows add via Pythagoras!",
      visualizerId: "physicsCircuitAndMotionLab",
      questions: [
        { type: "mc", prompt: "Which quantity is a VECTOR (needs a direction)?", options: ["Mass (5 kg)", "Temperature (25°C)", "Velocity (20 m/s North)", "Time (60 s)"], answer: "Velocity (20 m/s North)", hint: "Which one points somewhere?", whyEasy: "Velocity includes direction (North)!" },
        { type: "input", prompt: "You walk 4 m East, then turn and walk 3 m North. How far (m) are you from your start (Displacement)?", answer: "5", hint: "3-4-5 right triangle!", whyEasy: "√(4² + 3²) = 5 m!" },
        { type: "input", prompt: "You run 1 lap around a 400 m circular track back to start. What is your net Displacement (m)?", answer: "0", hint: "How far is the finish line from the start line?", whyEasy: "Started and ended at the exact same spot → 0 m displacement (400 m distance)!" },
        { type: "mc", prompt: "Which unit measures Force in Physics?", options: ["Joules (J)", "Newtons (N)", "Watts (W)", "Volts (V)"], answer: "Newtons (N)", hint: "Named after Sir Isaac...", whyEasy: "Force = Newtons (N), Energy = Joules (J), Power = Watts (W)!" },
        { type: "input", prompt: "Convert 72 km/h into m/s (Cheat code: divide km/h by 3.6!):", answer: "20", hint: "72 ÷ 3.6 = 720 ÷ 36.", whyEasy: "72 ÷ 3.6 = 20 m/s! (To go km/h → m/s, ÷ 3.6; reverse × 3.6)." }
      ]
    },
    {
      id: "physics-kinematics",
      worldId: "physics",
      order: 42,
      title: "Motion & Kinematics (v = u + at)",
      icon: "🏎️",
      tagline: "Velocity = slope of position. Acceleration = how much speed changes EVERY second!",
      scaryVersion: "Uniformly accelerated 1D translational kinematics & SUVAT integration.",
      easyTruth: "Acceleration of +3 m/s² literally means 'add +3 m/s to your speed every single second': 0 → 3 → 6 → 9 → 12! And where does the ½ in d = ½at² come from? Starting from 0, your AVERAGE speed is exactly HALF your final speed (triangle area on a v–t graph)!",
      microSteps: [
        { label: "Step 1: Constant Speed & v–t Graph Area", text: "At constant speed, Distance = Speed × Time (a rectangle on a velocity–time graph). Even when speed changes, the AREA under the velocity–time graph STILL equals total distance traveled!" },
        { label: "Step 2: Acceleration = Speed Added Per Second", text: "v = u + a·t (Final speed = Start speed + acceleration × time). At the very top peak of a straight-up toss, vertical velocity momentarily hits 0 m/s while gravity g still pulls downward at 10 m/s²!" },
        { label: "Step 3: Free-Fall Distance (Why ½gt²?)", text: "Drop a rock from rest (g ≈ 10 m/s²): after 3 s it reaches 30 m/s, so its AVERAGE speed was ½(0 + 30) = 15 m/s → distance = 15 × 3 = 45 m = ½gt²!" }
      ],
      cheatCode: "v = u + at. d = ut + ½at² (the ½ comes from average speed / triangle area!). On v–t graph: Slope = a, Area = Distance.",
      visualizerId: "physicsCircuitAndMotionLab",
      questions: [
        { type: "input", prompt: "A car starts from rest (u = 0) and accelerates at 4 m/s² for 5 seconds. Final speed (m/s)?", answer: "20", hint: "Add 4 m/s five separate times using v = u + a·t.", whyEasy: "Starting from 0 and adding 4 m/s every second for 5 s gives v = 4 × 5 = 20 m/s!" },
        { type: "input", prompt: "Drop a rock from rest (use g = 10 m/s²). How fast (m/s) is it falling after 3 seconds?", answer: "30", hint: "Gravity adds 10 m/s of downward speed each second: v = 0 + gt.", whyEasy: "After 3 seconds of +10 m/s per second, speed reaches 10 × 3 = 30 m/s!" },
        { type: "input", prompt: "How far (m) does that rock fall in 3 seconds using d = ½ · g · t² (g = 10)?", answer: "45", hint: "Average speed is half of 30 m/s (15 m/s) × 3 s, or ½ × 10 × 3².", whyEasy: "½(10)(9) = 45 m — because it started at 0 m/s, NOT 30 m/s!" },
        { type: "mc", prompt: "At the VERY TOP peak of throwing a ball straight up, what is its vertical velocity?", options: ["10 m/s", "0 m/s", "−10 m/s", "Maximum"], answer: "0 m/s", hint: "Before reversing from upward (+) to downward (−), velocity crosses zero!", whyEasy: "Vertical velocity pauses at 0 m/s at the peak, while gravity (g = 10 m/s² downward) stays active!" },
        { type: "mc", prompt: "On a Velocity vs. Time graph, what does the AREA under the line equal?", options: ["Mass", "Distance traveled", "Force", "Jerk"], answer: "Distance traveled", hint: "Units check: vertical axis (m/s) × horizontal axis (s) = meters!", whyEasy: "(m/s) × (s) = meters → Area under a v–t graph ALWAYS equals displacement/distance!" }
      ]
    },
    {
      id: "physics-newton-forces",
      worldId: "physics",
      order: 43,
      title: "Newton's 3 Laws & F = ma",
      icon: "🍎",
      tagline: "1) Things keep doing what they're doing. 2) F = m·a. 3) Push back equal & opposite!",
      scaryVersion: "Newtonian inertial mechanics & classical dynamical force equilibrium.",
      easyTruth: "Newton's 3 Laws are common sense: (1) Lazy law — stuff doesn't start/stop without a push. (2) Heavier mass needs more force (F = ma). (3) Punch a wall, wall punches your fist back equally!",
      microSteps: [
        { label: "Step 1: Balanced Forces = 0 Acceleration", text: "A car cruising at constant 100 km/h has ZERO net force (engine forward = air drag backward)!" },
        { label: "Step 2: F_net = m · a", text: "Push a 5 kg box with 20 N → a = 20 ÷ 5 = 4 m/s²!" },
        { label: "Step 3: Mass (kg) vs Weight (N)", text: "Mass = how much 'stuff' is in you (same on Earth & Moon!). Weight = gravity's pull (W = m·g ≈ 10m)." }
      ],
      cheatCode: "Constant velocity → Net Force = 0! Otherwise a = F_net / m. Weight = m·g.",
      visualizerId: "physicsCircuitAndMotionLab",
      questions: [
        { type: "input", prompt: "You push a 6 kg shopping cart with a net force of 30 N. Acceleration (m/s²)?", answer: "5", hint: "a = F ÷ m = 30 ÷ 6.", whyEasy: "30 ÷ 6 = 5 m/s²!" },
        { type: "mc", prompt: "A train moves forward at a STEADY constant 80 km/h. What is the NET force on it?", options: ["Huge forward force", "0 N (forces balance)", "Equal to its mass", "Negative"], answer: "0 N (forces balance)", hint: "Constant speed means acceleration a = 0!", whyEasy: "F = m·0 = 0 N! Forward thrust cancels friction/air drag." },
        { type: "input", prompt: "An astronaut has mass 70 kg on Earth. Using g = 10 m/s², what is her WEIGHT in Newtons on Earth?", answer: "700", hint: "W = m × g.", whyEasy: "70 × 10 = 700 N!" },
        { type: "mc", prompt: "A fly splats on a fast truck windshield. Which felt a BIGGER force during impact?", options: ["The fly", "The truck", "Exact SAME force on both!", "Neither"], answer: "Exact SAME force on both!", hint: "Newton's 3rd Law: equal & opposite! (The fly accelerates more only because its mass is tiny!)", whyEasy: "Newton's 3rd Law: Action = Reaction! Force is identical; tiny mass → huge acceleration." },
        { type: "input", prompt: "Two people push a box right with 15 N and left with 6 N. Net force right (N)?", answer: "9", hint: "15 − 6.", whyEasy: "15 − 6 = 9 N right!" }
      ]
    },
    {
      id: "physics-energy-momentum",
      worldId: "physics",
      order: 44,
      title: "Energy (KE = ½mv², mgh), Power & Momentum",
      icon: "⚡",
      tagline: "Energy trades Height (mgh) for Speed (½mv²); Power = Work ÷ Time; Momentum = mv!",
      scaryVersion: "Conservation of mechanical work-energy, power rates & linear impulse momentum.",
      easyTruth: "Energy is like money in two linked accounts: Height Cash (PE = mgh) and Speed Cash (KE = ½mv²). Slide down a frictionless hill and every Joule of PE turns into KE! Power simply measures how FAST you spend or transfer that energy (Watts = Joules per second).",
      microSteps: [
        { label: "Step 1: Work (W = F·d) & Power (P = W/t)", text: "Work transfers energy: pushing 10 N across 4 m does 40 Joules (holding a box still does 0 work because d = 0). Power is the RATE of doing work: P = W / t in Watts (1 W = 1 J/s)!" },
        { label: "Step 2: Height vs Speed Swap (Why v² Matters!)", text: "PE = mgh and KE = ½mv². Because speed is SQUARED in KE, doubling a car's speed multiplies its kinetic energy (and braking distance!) by 2² = 4×!" },
        { label: "Step 3: Momentum (p = m·v) & Collisions", text: "Momentum measures 'how hard a moving mass is to stop': p = m·v (linear in v, NOT squared!). In any isolated collision, total momentum before impact ALWAYS equals total momentum after!" }
      ],
      cheatCode: "W = F·d, Power P = W/t (Watts). PE = mgh ↔ KE = ½mv² (2× speed = 4× KE!). Momentum p = m·v.",
      visualizerId: "physicsCircuitAndMotionLab",
      questions: [
        { type: "input", prompt: "Lift a 2 kg book up 5 m (g = 10 m/s²). Gravitational Potential Energy (mgh) in Joules?", answer: "100", hint: "Multiply mass (2 kg) × gravity (10 m/s²) × height (5 m).", whyEasy: "PE = mgh = 2 × 10 × 5 = 100 Joules stored as height energy!" },
        { type: "input", prompt: "A 4 kg ball rolls at 3 m/s. Kinetic Energy (½ · m · v²) in Joules?", answer: "18", hint: "Square the speed FIRST (3² = 9), then multiply by ½ × 4.", whyEasy: "KE = ½(4)(3²) = 2 × 9 = 18 Joules of motion energy!" },
        { type: "mc", prompt: "If a car DOUBLES its speed from 30 km/h to 60 km/h, its braking distance (Kinetic Energy) becomes:", options: ["2× larger", "4× larger", "8× larger", "Same"], answer: "4× larger", hint: "Speed is SQUARED inside KE = ½mv² — check (2v)²!", whyEasy: "2² = 4×! Doubling speed quadruples kinetic energy and stopping distance." },
        { type: "input", prompt: "A 1000 kg car moves at 12 m/s. Momentum (p = m·v) in kg·m/s?", answer: "12000", hint: "Momentum scales directly with mass × velocity (no ½ and no square!).", whyEasy: "p = m·v = 1,000 × 12 = 12,000 kg·m/s!" },
        { type: "input", prompt: "Machine does 600 Joules of work in 10 seconds. Power (P = W/t) in Watts?", answer: "60", hint: "Power = Work done ÷ Time taken (Joules per second = Watts).", whyEasy: "600 J ÷ 10 s = 60 J/s = 60 Watts!" }
      ]
    },
    {
      id: "physics-waves-electricity",
      worldId: "physics",
      order: 45,
      title: "Waves (v = fλ) & Circuits (V = IR)",
      icon: "🔌",
      tagline: "Voltage = pressure, Current = flow, Resistance = narrow pipe! Plus wave speed v = fλ.",
      scaryVersion: "Harmonic wave propagation & Ohm's resistive electrodynamic circuits.",
      easyTruth: "Picture electricity as water in pipes: Battery Voltage (V) pushes Current (I = V/R) through narrow Resistors (R), and electrical Power P = V·I tracks energy per second. Meanwhile, every wave obeys one bridge: Speed = Frequency × Wavelength!",
      microSteps: [
        { label: "Step 1: Ohm's Law (V = I·R) & Power (P = V·I)", text: "Current = Voltage ÷ Resistance (12 V across 3 Ω pushes 4 A). Electrical power in Watts is P = V·I (also I²R or V²/R): 120 V × 10 A = 1,200 W!" },
        { label: "Step 2: Series vs Parallel Resistors", text: "Series (single loop): same current everywhere, resistances ADD (R_eq = R₁ + R₂), break 1 bulb and all go dark. Parallel (independent branches): same voltage across every branch, total resistance SHRINKS via 1/R_eq = 1/R₁ + 1/R₂ (unscrew 1 house light and others stay ON)!" },
        { label: "Step 3: Waves (v = f · λ)", text: "Frequency f (Hz) = cycles per second; Wavelength λ (m) = length per cycle; Speed v = f·λ. At fixed wave speed (like light c), doubling f cuts λ in HALF!" }
      ],
      cheatCode: "V = IR, P = VI. Series R adds (R₁+R₂); Parallel shrinks (1/R_eq = 1/R₁ + 1/R₂). Wave speed v = fλ!",
      visualizerId: "physicsCircuitAndMotionLab",
      questions: [
        { type: "input", prompt: "Ohm's Law: A 12 V battery connects to a 3 Ω resistor. Current (I = V/R) in Amps?", answer: "4", hint: "Rearrange V = I·R to I = V ÷ R.", whyEasy: "12 V pushed through 3 Ω produces I = 12 ÷ 3 = 4 Amps!" },
        { type: "input", prompt: "A toaster uses 10 Amps at 120 Volts. Power (P = V · I) in Watts?", answer: "1200", hint: "Electrical power multiplies Volts × Amps.", whyEasy: "120 V × 10 A = 1,200 Watts (1.2 kW) of heating power!" },
        { type: "input", prompt: "A wave has frequency 5 Hz and wavelength 4 m. Wave speed (v = f · λ) in m/s?", answer: "20", hint: "5 crests pass every second, and each crest spans 4 meters!", whyEasy: "5 waves/s × 4 m/wave = 20 m/s!" },
        { type: "mc", prompt: "If light keeps the same speed c = fλ and frequency DOUBLES, what happens to wavelength λ?", options: ["Doubles", "Halves", "Stays same", "Becomes zero"], answer: "Halves", hint: "f and λ trade off inversely to keep their product c constant!", whyEasy: "Twice as many cycles packed into the same second means each wave is HALF as long!" },
        { type: "mc", prompt: "If you unscrew 1 bulb in your house and the other lights stay ON, they are wired in:", options: ["Series", "Parallel", "Short circuit", "Open loop"], answer: "Parallel", hint: "Every room needs its own independent branch to the supply voltage!", whyEasy: "Parallel branches let current keep flowing to every other bulb even if one opens!" }
      ]
    },
    {
      id: "physics-modern-relativity",
      worldId: "physics",
      order: 46,
      title: "Gravity (1/r²), E = mc² & Quantum Photons",
      icon: "🌌",
      tagline: "Double the distance = ¼ the gravity! Mass is frozen energy (E = mc²). Light comes in packets!",
      scaryVersion: "Newtonian inverse-square gravitation, special relativity & Planck quantization.",
      easyTruth: "Gravity spreads out in 3D like paint from a spray can — 2× farther away spreads over 2² = 4× area, so pull drops to 1/4! And Einstein proved tiny mass holds HUGE energy (c²).",
      microSteps: [
        { label: "Step 1: Inverse-Square Law (1/r²)", text: "Move 3× farther from a planet/lightbulb → gravity/brightness drops by 3² = 9× (1/9th)!" },
        { label: "Step 2: E = mc²", text: "Because speed of light c ≈ 3×10⁸ m/s is MASSIVE, squaring it (c²) means 1 gram of matter equals a nuclear explosion of energy!" },
        { label: "Step 3: Quantum Photon Energy (E = h·f)", text: "Light isn't just a continuous wave — it hits atoms in tiny packets (photons). Blue/UV photons have higher frequency f → way more energy than red!" }
      ],
      cheatCode: "Double distance → 1/4 gravity (1/r²). E = mc² turns mass ↔ energy. Higher light frequency = stronger photons!",
      visualizerId: "physicsCircuitAndMotionLab",
      questions: [
        { type: "mc", prompt: "Two planets move 2× FARTHER apart. What happens to the gravitational force between them?", options: ["1/2 as strong", "1/4 as strong", "2× stronger", "4× stronger"], answer: "1/4 as strong", hint: "Inverse square: 1 / 2²!", whyEasy: "F ∝ 1/r² → 1/(2²) = 1/4th!" },
        { type: "mc", prompt: "Why does UV light cause sunburns while harmless red radio waves don't (even if bright)?", options: ["UV has higher frequency f → more energy per photon (E=hf)", "UV travels faster than c", "Radio waves have no photons", "UV has larger mass"], answer: "UV has higher frequency f → more energy per photon (E=hf)", hint: "E = hf!", whyEasy: "Individual UV photons pack higher frequency f → enough punch to damage DNA!" },
        { type: "mc", prompt: "What does E = mc² fundamentally mean?", options: ["Mass and Energy are two forms of the same thing", "Energy equals speed", "Light has heavy mass", "Time never changes"], answer: "Mass and Energy are two forms of the same thing", hint: "c² is the giant conversion factor between mass and energy!", whyEasy: "Mass is ultra-concentrated energy (powers stars & nuclear reactors)!" },
        { type: "mc", prompt: "As a spaceship flies near the speed of light c, how does its clock tick compared to Earth?", options: ["Faster", "Slower (Time Dilation)", "Backwards", "Identical"], answer: "Slower (Time Dilation)", hint: "Moving clocks run slow!", whyEasy: "Einstein's Special Relativity: moving clocks run slower!" },
        { type: "mc", prompt: "Why do astronauts 'float' on the Space Station (only ~400 km up)?", options: ["Gravity is zero in space", "They are constantly falling AROUND Earth in free-fall", "Earth's magnet pushes them", "Air pushes them up"], answer: "They are constantly falling AROUND Earth in free-fall", hint: "Gravity at ISS is still ~90% of Earth surface! They fall forward so fast they keep missing Earth!", whyEasy: "Orbit is perpetual free-fall sideways!" }
      ]
    },

    // ==================== WORLD 7: CHEMISTRY (6 NODES) ====================
    {
      id: "chem-atoms-periodic",
      worldId: "chemistry",
      order: 47,
      title: "Atoms (p⁺, n⁰, e⁻) & Periodic Table",
      icon: "⚛️",
      tagline: "Protons = element ID. Neutrons = weight glue. Outer Electrons = chemical personality!",
      scaryVersion: "Subatomic nucleonic structure & periodic valence shell configuration.",
      easyTruth: "Every atom is just 3 pieces: Protons (+) in the center tell you WHO it is (6 = Carbon ALWAYS). Outer-ring Valence Electrons decide who it bonds with!",
      microSteps: [
        { label: "Step 1: The 3 Particles", text: "Proton (+1, mass 1), Neutron (0, mass 1) live in the core. Electron (−1, ~0 mass) orbits outside in shells: 2, 8, 8!" },
        { label: "Step 2: Atomic Number vs Mass Number", text: "Atomic # = # of Protons. Mass # = Protons + Neutrons. Neutral atom: # Electrons = # Protons!" },
        { label: "Step 3: Periodic Table = Sorted by Outer Hands", text: "Columns (Groups) have the SAME valence electrons! Group 18 (He, Ne, Ar) has full outer shells (8) → Noble Gases don't react!" }
      ],
      cheatCode: "Protons = Element ID! Mass = Protons + Neutrons. Shell capacities: 2, 8, 8. Everyone wants a full 8!",
      visualizerId: "chemistryAtomPhLab",
      questions: [
        { type: "input", prompt: "Carbon has 6 protons and 6 neutrons. What is its Mass Number?", answer: "12", hint: "Mass = Protons + Neutrons.", whyEasy: "6 + 6 = 12 (Carbon-12)!" },
        { type: "mc", prompt: "Which particle decides WHICH element an atom is (e.g. Carbon vs Oxygen)?", options: ["Electrons", "Neutrons", "Protons", "Photons"], answer: "Protons", hint: "Change protons = change element!", whyEasy: "Atomic Number = Proton count = Element ID!" },
        { type: "mc", prompt: "Oxygen has 8 electrons total (2 in inner shell). How many VALENCE electrons sit in its outer shell?", options: ["2", "6", "8", "4"], answer: "6", hint: "8 − 2 = ?", whyEasy: "Shell 1 holds 2, leaving 6 valence electrons in shell 2!" },
        { type: "mc", prompt: "Why do Noble Gases (Helium, Neon, Argon) barely react with anything?", options: ["They have zero protons", "Their outer electron shell is already full!", "They are too heavy", "They have no neutrons"], answer: "Their outer electron shell is already full!", hint: "Stable octet = happy & chill!", whyEasy: "Full outer shell (2 for He, 8 for Ne/Ar) means zero urge to steal or share!" },
        { type: "input", prompt: "Sodium (Na) has 11 protons and lost 1 electron (Na⁺ ion). Total electrons left?", answer: "10", hint: "Start with 11, lose 1.", whyEasy: "11 − 1 = 10 electrons (leaving a +1 charge)!" }
      ]
    },
    {
      id: "chem-bonds-polarity",
      worldId: "chemistry",
      order: 48,
      title: "Ionic (Steal) vs Covalent (Share) Bonds",
      icon: "🤝",
      tagline: "Metal + Nonmetal = STEAL (Ionic). Nonmetal + Nonmetal = SHARE (Covalent)!",
      scaryVersion: "Electrostatic ionic lattices vs shared molecular orbital covalency.",
      easyTruth: "Atoms want 8 outer electrons. Metals have 1–2 extra and happily DUMP them (becoming +). Nonmetals need 1–2 and STEAL them (becoming −). Two nonmetals? Neither gives up, so they SHARE!",
      microSteps: [
        { label: "Step 1: Ionic Bond = Opposites Attract", text: "Sodium (Na, 1 extra e⁻) gives 1 to Chlorine (Cl, needs 1) → Na⁺ and Cl⁻ stick like magnets → Table Salt (NaCl)!" },
        { label: "Step 2: Covalent Bond = Sharing Hands", text: "H₂O, CO₂, CH₄: nonmetals share electron pairs! Single bond = 2 e⁻, Double = 4 e⁻, Triple = 6 e⁻." },
        { label: "Step 3: Polar = Unequal Sharing (Tug-of-War)", text: "In H₂O, greedy Oxygen hogs the electrons → slight negative δ⁻ on O, slight positive δ⁺ on H (why water dissolves salt & forms hydrogen bonds!)." }
      ],
      cheatCode: "Metal + Nonmetal = Ionic (transfer). Nonmetal + Nonmetal = Covalent (share).",
      visualizerId: "chemistryAtomPhLab",
      questions: [
        { type: "mc", prompt: "Table salt NaCl (Metal Sodium + Nonmetal Chlorine) is what type of bond?", options: ["Ionic (electron transfer)", "Covalent (electron sharing)", "Metallic", "Nuclear"], answer: "Ionic (electron transfer)", hint: "Metal + Nonmetal!", whyEasy: "Na⁺ gives an electron to Cl⁻ → Ionic!" },
        { type: "mc", prompt: "CO₂ (Carbon + Oxygen, both Nonmetals) forms what type of bond?", options: ["Ionic", "Covalent (sharing electrons)", "Hydrogen bond only", "Magnetic"], answer: "Covalent (sharing electrons)", hint: "Nonmetal + Nonmetal!", whyEasy: "Two nonmetals share electrons → Covalent!" },
        { type: "mc", prompt: "If Magnesium forms Mg²⁺ and Chlorine forms Cl⁻, what is the neutral salt formula?", options: ["MgCl", "Mg₂Cl", "MgCl₂", "Mg₂Cl₂"], answer: "MgCl₂", hint: "Need two −1 charges to balance one +2!", whyEasy: "+2 + 2(−1) = 0 → MgCl₂!" },
        { type: "mc", prompt: "Why does oil NOT mix with water?", options: ["Oil is nonpolar, while water is polar ('like dissolves like')", "Oil has no atoms", "Water is ionic", "Gravity flips oil"], answer: "Oil is nonpolar, while water is polar ('like dissolves like')", hint: "Polar loves polar; nonpolar loves nonpolar!", whyEasy: "Polar water hugs itself and pushes nonpolar oil out!" },
        { type: "input", prompt: "How many total electrons are shared in ONE double covalent bond (like in O=O)?", answer: "4", hint: "Each line/bond = 2 shared electrons.", whyEasy: "2 bonds × 2 electrons = 4 electrons!" }
      ]
    },
    {
      id: "chem-moles-stoich",
      worldId: "chemistry",
      order: 49,
      title: "The Mole (6.02 × 10²³) & Molar Mass",
      icon: "🦔",
      tagline: "1 Dozen = 12 eggs. 1 Mole = 6.02 × 10²³ particles — whose gram weight sits on the Periodic Table!",
      scaryVersion: "Avogadro molar cardinality & stoichiometric gram-formula conversions.",
      easyTruth: "Atoms are impossibly tiny, so chemists bundle them like eggs in a carton! Instead of a 'dozen' (12), 1 mole ALWAYS holds 6.02 × 10²³ particles — and the Periodic Table mass tells you how many grams 1 mole weighs!",
      microSteps: [
        { label: "Step 1: Molar Mass = Sum of Atomic Weights (g/mol)", text: "Use H ≈ 1, C ≈ 12, N ≈ 14, O ≈ 16 g/mol. Add every atom in the formula: H₂O = 2(1) + 16 = 18 g/mol; CO₂ = 12 + 2(16) = 44 g/mol." },
        { label: "Step 2: Grams ↔ Moles Bridge", text: "Moles n = Mass (g) ÷ Molar Mass (g/mol). Have 36 g of Carbon (12 g/mol)? 36 ÷ 12 = 3 moles! Remember: 1 mole of ANY substance has the exact same particle count (6.02 × 10²³), just like 1 dozen quail eggs and 1 dozen bowling balls both contain 12 items." },
        { label: "Step 3: Molarity (M) & Dilutions", text: "Molarity M = Moles of solute ÷ Liters of solution (convert mL → L by ÷ 1,000!). Dissolve 4 moles in 2 L → 2 M; dilute with M₁V₁ = M₂V₂." }
      ],
      cheatCode: "1 mol = 6.02×10²³ items. n = grams ÷ Molar Mass. Molarity M = mol ÷ L (never mL!).",
      visualizerId: "chemistryAtomPhLab",
      questions: [
        { type: "input", prompt: "Using H = 1, O = 16, what is the molar mass of H₂O (g/mol)?", answer: "18", hint: "Add 2 Hydrogens (2 × 1) plus 1 Oxygen (16).", whyEasy: "2(1) + 16 = 18 g/mol — meaning 1 mole of water weighs 18 grams!" },
        { type: "input", prompt: "Carbon-12 has molar mass 12 g/mol. How many MOLES are in 36 grams of Carbon?", answer: "3", hint: "Divide total grams by the weight of 1 mole: 36 ÷ 12.", whyEasy: "36 g ÷ 12 g/mol = 3 moles of Carbon atoms!" },
        { type: "input", prompt: "Using C = 12 and O = 16, find the molar mass of CO₂ (g/mol):", answer: "44", hint: "Add 1 Carbon (12) plus 2 Oxygens (2 × 16 = 32).", whyEasy: "12 + 32 = 44 g/mol for carbon dioxide!" },
        { type: "input", prompt: "You dissolve 4 moles of salt in 2 Liters of water. Molarity (M = mol/L)?", answer: "2", hint: "Molarity counts moles packed into each single Liter: 4 mol ÷ 2 L.", whyEasy: "4 mol ÷ 2 L = 2 M (2 moles per Liter)!" },
        { type: "mc", prompt: "Which contains MORE molecules: 1 mole of tiny H₂ or 1 mole of giant C₆H₁₂O₆?", options: ["1 mole of H₂", "1 mole of glucose", "EXACT SAME number (6.02×10²³)!", "Depends on temperature"], answer: "EXACT SAME number (6.02×10²³)!", hint: "Which has more eggs: 1 dozen quail eggs or 1 dozen ostrich eggs?", whyEasy: "A mole is a fixed count (6.02 × 10²³) — glucose weighs far more, but both have the EXACT same count!" }
      ]
    },
    {
      id: "chem-balancing-reactions",
      worldId: "chemistry",
      order: 50,
      title: "Balancing Equations & Limiting Reactants",
      icon: "🥪",
      tagline: "Atoms are LEGOs: same count on Left & Right! Limiting reactant = whatever runs out first!",
      scaryVersion: "Stoichiometric conservation of atomic species & yield-limiting reagents.",
      easyTruth: "Making sandwiches needs 2 Bread + 1 Cheese → 1 Sandwich. Got 6 Bread and 2 Cheese? Cheese runs out after 2 sandwiches (Limiting Reactant) with 2 Bread leftover!",
      microSteps: [
        { label: "Step 1: NEVER Touch Small Subscripts!", text: "Change ONLY big front numbers (coefficients): 2 H₂ + O₂ → 2 H₂O (4 H's and 2 O's on both sides!)." },
        { label: "Step 2: Balance Lonely Elements Last", text: "Balance messy molecules first (C, H), and leave lone O₂ or Fe for dead last!" },
        { label: "Step 3: Limiting Reactant = Sandwich Bottleneck", text: "Divide what you have by what the recipe requires — the SMALLEST result limits how much product you make!" }
      ],
      cheatCode: "NEVER alter subscripts (H₂O stays H₂O!). Balance lone elements last. Smallest recipe ratio runs out first!",
      visualizerId: "algebraBalanceScale",
      questions: [
        { type: "mc", prompt: "Balance: __ H₂ + __ O₂ → __ H₂O", options: ["1, 1, 1", "2, 1, 2", "2, 2, 2", "1, 2, 2"], answer: "2, 1, 2", hint: "Need 2 O's on right (2 H₂O), which uses 4 H's (2 H₂)!", whyEasy: "2 H₂ + 1 O₂ → 2 H₂O: 4 H & 2 O on each side!" },
        { type: "mc", prompt: "Balance: __ N₂ + __ H₂ → __ NH₃", options: ["1, 3, 2", "1, 2, 2", "2, 3, 2", "1, 1, 2"], answer: "1, 3, 2", hint: "2 N's need 2 NH₃ (which has 6 H's → 3 H₂)!", whyEasy: "1 N₂ + 3 H₂ → 2 NH₃!" },
        { type: "input", prompt: "Recipe: 2 H₂ + 1 O₂ → 2 H₂O. You have 4 moles H₂ and 5 moles O₂. Max moles of H₂O made?", answer: "4", hint: "H₂ runs out first! 4 mol H₂ makes...", whyEasy: "4 mol H₂ makes 4 mol H₂O (uses 2 mol O₂, leaves 3 mol O₂ excess)!" },
        { type: "mc", prompt: "Why is changing H₂O into H₂O₂ illegal when balancing an equation?", options: ["It creates a completely different toxic chemical (peroxide!)", "Numbers can't be odd", "Oxygen vanishes", "It doubles the mass"], answer: "It creates a completely different toxic chemical (peroxide!)", hint: "You drink H₂O; H₂O₂ is bleach/peroxide!", whyEasy: "Subscripts define the molecule; coefficients just count how many!" },
        { type: "input", prompt: "React 12 g of Carbon with 32 g of Oxygen completely in a sealed jar. Total product mass (g)?", answer: "44", hint: "Conservation of Mass: matter isn't created or destroyed!", whyEasy: "12 g + 32 g = 44 g! Input mass ALWAYS equals output mass." }
      ]
    },
    {
      id: "chem-acids-bases-ph",
      worldId: "chemistry",
      order: 51,
      title: "Acids (H⁺), Bases (OH⁻) & The pH Log Scale",
      icon: "🍋",
      tagline: "pH 0–6 = Acid (H⁺), 7 = Neutral, 8–14 = Base (OH⁻). Every 1 pH step = 10× strength!",
      scaryVersion: "Brønsted–Lowry proton transfer & logarithmic hydronium activity.",
      easyTruth: "Remember from Math that log₁₀ counts zeros?! pH = −log₁₀[H⁺] literally just turns 10⁻³ M into pH 3! Moving 1 step down (pH 4 → pH 3) means 10× MORE acid!",
      microSteps: [
        { label: "Step 1: Acid vs Base Personalities", text: "Acids donate H⁺ (sour: lemon, stomach acid, pH < 7). Bases accept H⁺ / give OH⁻ (slippery/bitter: soap, bleach, pH > 7)." },
        { label: "Step 2: Neutralization = Acid + Base → Salt + Water!", text: "HCl + NaOH → NaCl + H₂O! They cancel each other right back to pH 7!" },
        { label: "Step 3: The ×10 Log Jump", text: "pH 2 vs pH 5 is 3 steps apart → 10³ = 1,000× MORE acidic (NOT 2.5×)!" }
      ],
      cheatCode: "pH < 7 Acid, = 7 Neutral, > 7 Base. [H⁺] = 10⁻ᵖᴴ → every 1 pH unit = ×10!",
      visualizerId: "chemistryAtomPhLab",
      questions: [
        { type: "mc", prompt: "If [H⁺] = 10⁻⁴ M, what is the pH? (Use pH = −log₁₀[H⁺])", options: ["−4", "4", "10", "14"], answer: "4", hint: "Just drop the minus sign on the exponent!", whyEasy: "−log₁₀(10⁻⁴) = 4 (Acidic)!" },
        { type: "mc", prompt: "Lemon juice (pH 2) vs Black Coffee (pH 5): how many times MORE acidic is lemon juice?", options: ["3×", "30×", "1,000×", "2.5×"], answer: "1,000×", hint: "5 − 2 = 3 steps → 10³!", whyEasy: "10 × 10 × 10 = 1,000× more H⁺ ions!" },
        { type: "mc", prompt: "Acid + Base always react together to neutralize into:", options: ["Gas + Metal", "Salt + Water", "Pure Oxygen", "Acid only"], answer: "Salt + Water", hint: "H⁺ + OH⁻ → H₂O!", whyEasy: "H⁺ + OH⁻ forms water, and the remaining ions form a salt!" },
        { type: "mc", prompt: "Which pH value represents a STRONG BASE (like drain cleaner)?", options: ["pH 1", "pH 6", "pH 7", "pH 13"], answer: "pH 13", hint: "Way above 7!", whyEasy: "13 is far on the basic (>7) side!" },
        { type: "input", prompt: "In water at 25°C, pH + pOH ALWAYS equals:", answer: "14", hint: "Max of the standard pH scale!", whyEasy: "pH + pOH = 14 always!" }
      ]
    },
    {
      id: "chem-gas-thermo-organic",
      worldId: "chemistry",
      order: 52,
      title: "Gases (PV = nRT), Heat, Catalysts & Carbon",
      icon: "🎈",
      tagline: "PV = nRT runs tires & balloons. Exo releases heat. Catalysts dig a tunnel! Meth-Eth-Prop-But = 1-2-3-4 C's!",
      scaryVersion: "Ideal gas state equation, enthalpy ΔH, catalytic barriers & IUPAC alkane prefixes.",
      easyTruth: "Squeeze gas into half the room and wall collisions double (PV = nRT, ALWAYS in Kelvin!). Exothermic reactions send heat OUT (ΔH < 0), Catalysts speed reactions by carving a lower-energy tunnel (without getting used up!), and carbon chains start Meth-Eth-Prop-But!",
      microSteps: [
        { label: "Step 1: PV = nRT Intuition (Kelvin ALWAYS!)", text: "P (Pressure) × V (Volume) = n (moles) × R × T (Kelvin = °C + 273). Halve volume V at fixed T → P DOUBLES! Heat T up → P or V expands!" },
        { label: "Step 2: Exo/Endothermic Heat & Catalysts", text: "EXO-thermic = heat EXITS (campfire feels warm, ΔH < 0). ENDO-thermic = heat ENTERS (cold pack, ΔH > 0). A Catalyst lowers the activation energy hill (E_a) so reactions run faster without changing ΔH or being consumed!" },
        { label: "Step 3: Organic Naming (1–4 Carbons)", text: "Meth- (1, CH₄), Eth- (2, C₂H₆), Prop- (3, C₃H₈), But- (4, C₄H₁₀) → remember 'Monkeys Eat Peeled Bananas'!" }
      ],
      cheatCode: "PV = nRT (K = °C + 273). EXO = heat exits (ΔH < 0). Catalyst lowers E_a only. 1-2-3-4 C: Meth-Eth-Prop-But!",
      visualizerId: "thermoPhaseLab",
      questions: [
        { type: "mc", prompt: "If you squeeze a syringe's volume in HALF at constant temperature (PV = nRT), pressure:", options: ["Halves", "Doubles", "Stays same", "Drops to 0"], answer: "Doubles", hint: "P × V stays constant (Boyle's Law): halving V requires doubling P!", whyEasy: "Half the volume means molecules hit the walls twice as often → 2× pressure!" },
        { type: "input", prompt: "Convert 27°C into Kelvin (add 273):", answer: "300", hint: "Kelvin = Celsius + 273 (never use negative °C in PV = nRT!).", whyEasy: "27 + 273 = 300 K — clean round room-temperature benchmark!" },
        { type: "mc", prompt: "A campfire gives off warmth to your hands. The reaction is:", options: ["Exothermic (heat exits, ΔH < 0)", "Endothermic (heat enters, ΔH > 0)", "Isothermal", "Nuclear only"], answer: "Exothermic (heat exits, ΔH < 0)", hint: "EXO = EXIT: the system loses heat to your hands!", whyEasy: "Heat exits the burning wood into the surroundings → Exothermic (ΔH < 0)!" },
        { type: "mc", prompt: "Using 'Monkeys Eat Peeled Bananas' (1,2,3,4), how many Carbons are in PROPANE?", options: ["1", "2", "3", "4"], answer: "3", hint: "Count along: Meth (1), Eth (2), Prop (3), But (4).", whyEasy: "Prop- stands for 3 carbons → Propane is C₃H₈!" },
        { type: "mc", prompt: "What does a CATALYST do to a chemical reaction?", options: ["Increases total product", "Lowers activation energy to speed it up without being used up", "Freezes the reaction", "Makes ΔH positive"], answer: "Lowers activation energy to speed it up without being used up", hint: "Like digging a tunnel through a mountain instead of climbing over the peak!", whyEasy: "Catalysts (and biological enzymes!) provide a lower-E_a shortcut and emerge unchanged!" }
      ]
    },

    // ==================== WORLD 8: BIOLOGY (6 NODES) ====================
    {
      id: "bio-cells-organelles",
      worldId: "biology",
      order: 53,
      title: "Cells as Tiny Cities (Organelles)",
      icon: "🔬",
      tagline: "Nucleus = City Hall. Mitochondria = Power Plant. Ribosome = Protein 3D Printer!",
      scaryVersion: "Eukaryotic subcellular compartmentalization & prokaryotic morphology.",
      easyTruth: "Think of a cell as a bustling factory city! Every weird Latin organelle name is just a specific city department.",
      microSteps: [
        { label: "Step 1: Prokaryote vs Eukaryote", text: "PRO-karyote ('NO' nucleus — simple bacteria, tiny studio apartment). EU-karyote ('YOU' are made of them — plants/animals with a true nucleus & organelles!)." },
        { label: "Step 2: Big 5 Organelles", text: "Membrane = security gate. Nucleus = DNA vault/CEO. Ribosome = protein printer. Mitochondria = ATP power plant. Golgi = FedEx shipping!" },
        { label: "Step 3: 3 Plant-Only Extras", text: "Plants have Cell Walls (armor), Chloroplasts (solar panels), and a giant Central Vacuole (water tank)!" }
      ],
      cheatCode: "PRO = NO nucleus; EU = YOU have a nucleus! Ribosome = protein factory; Mitochondria = ATP power!",
      visualizerId: "biologyDnaPunnettLab",
      questions: [
        { type: "mc", prompt: "Which organelle is the '3D Printer' that builds proteins in ALL cells (even bacteria)?", options: ["Mitochondria", "Ribosome", "Golgi apparatus", "Chloroplast"], answer: "Ribosome", hint: "Reads mRNA instructions to snap amino acids together!", whyEasy: "Ribosomes build proteins — even prokaryotes have them!" },
        { type: "mc", prompt: "Remember 'PRO = NO, EU = YOU': which organism is PROKARYOTIC (no nucleus)?", options: ["Human neuron", "Oak tree leaf", "E. coli bacterium", "Mushroom"], answer: "E. coli bacterium", hint: "Bacteria lack a membrane-bound nucleus.", whyEasy: "Bacteria & Archaea are prokaryotes!" },
        { type: "mc", prompt: "Which organelle acts as the 'Powerhouse' turning sugar into ATP energy?", options: ["Nucleus", "Mitochondria", "Lysosome", "Vacuole"], answer: "Mitochondria", hint: "Every meme knows this one!", whyEasy: "Mitochondria generate cellular ATP!" },
        { type: "mc", prompt: "Which two structures do PLANT cells have that ANIMAL cells lack?", options: ["Ribosomes & DNA", "Cell wall & Chloroplasts", "Membrane & Nucleus", "Mitochondria & Golgi"], answer: "Cell wall & Chloroplasts", hint: "Plants stand rigid (wall) and eat sunlight (solar panels)!", whyEasy: "Cell wall + Chloroplasts are plant signatures!" },
        { type: "mc", prompt: "What does the Golgi apparatus do?", options: ["Modifies, sorts & ships proteins like FedEx", "Burns sunlight", "Stores DNA", "Pumps sodium"], answer: "Modifies, sorts & ships proteins like FedEx", hint: "Post office of the cell!", whyEasy: "Golgi packages and ships proteins out!" }
      ]
    },
    {
      id: "bio-osmosis-transport",
      worldId: "biology",
      order: 54,
      title: "Diffusion, Osmosis & Cell Transport",
      icon: "💧",
      tagline: "Stuff spreads out for FREE (High → Low). Water chases salt across membranes!",
      scaryVersion: "Passive Fickian membrane diffusion, tonicity & ATPase active transport.",
      easyTruth: "Spray perfume in a corner — molecules bounce from crowded (High) to empty (Low) for free (Passive Transport)! Osmosis is just water crossing a screen door to dilute whichever side is saltier!",
      microSteps: [
        { label: "Step 1: Passive vs Active", text: "Downhill (High → Low) = Passive (FREE, 0 ATP!). Uphill (Low → High, pumping against the crowd) = Active (costs ATP energy!)." },
        { label: "Step 2: Osmosis = Water Chases Solutes!", text: "Put a cell in super salty water (Hypertonic): water rushes OUT of the cell to dilute the outside salt → cell shrivels!" },
        { label: "Step 3: Hypotonic vs Isotonic", text: "Pure water outside (Hypotonic): water rushes IN → animal cell can pop like a balloon! Isotonic = balanced (IV drip)." }
      ],
      cheatCode: "Passive = High→Low (free!). Active = Low→High (costs ATP). Water ALWAYS moves toward MORE salt!",
      visualizerId: "chemistryAtomPhLab",
      questions: [
        { type: "mc", prompt: "Which way does Water move by OSMOSIS across a membrane?", options: ["From salty side to pure water", "From pure/dilute side TOWARD the saltier side", "Requires 10 ATP", "Never moves"], answer: "From pure/dilute side TOWARD the saltier side", hint: "Water wants to dilute whichever side is more concentrated!", whyEasy: "'Salt sucks!' — water always flows toward higher solute concentration!" },
        { type: "mc", prompt: "Moving molecules UPHILL from LOW concentration to HIGH concentration requires:", options: ["Passive diffusion", "Active transport (ATP energy)", "Osmosis only", "Zero energy"], answer: "Active transport (ATP energy)", hint: "Pushing a rock uphill takes fuel!", whyEasy: "Against the gradient (Low → High) always costs ATP!" },
        { type: "mc", prompt: "Why do hospitals give patients 0.9% saline (Isotonic) instead of pure distilled water in an IV?", options: ["Pure water would rush into red blood cells and burst them!", "Salt tastes better", "Pure water evaporates", "Saline stops DNA"], answer: "Pure water would rush into red blood cells and burst them!", hint: "Cells are ~0.9% salty inside — pure water is hypotonic!", whyEasy: "Isotonic saline matches cell saltiness so cells neither burst nor shrivel!" },
        { type: "mc", prompt: "Why do grocery stores mist veggies with pure water?", options: ["Water enters plant cells, making them crisp (turgid) against their cell walls!", "To wash off DNA", "To freeze leaves", "To shrink roots"], answer: "Water enters plant cells, making them crisp (turgid) against their cell walls!", hint: "Plant cell walls stop them from popping!", whyEasy: "Hypotonic water swells plant vacuoles firmly against the cell wall!" },
        { type: "mc", prompt: "What is the cell membrane mostly made of?", options: ["Solid steel", "A flexible phospholipid bilayer (water-loving heads, oily tails)", "Pure sugar", "Starch"], answer: "A flexible phospholipid bilayer (water-loving heads, oily tails)", hint: "Hydrophilic outside, hydrophobic oil sandwich inside!", whyEasy: "The phospholipid bilayer keeps water-soluble things from leaking freely!" }
      ]
    },
    {
      id: "bio-energy-photosynthesis",
      worldId: "biology",
      order: 55,
      title: "ATP, Photosynthesis & Respiration Twins",
      icon: "🌿",
      tagline: "Photosynthesis & Cellular Respiration are the EXACT same reaction played backwards!",
      scaryVersion: "Chemiosmotic oxidative phosphorylation & Calvin-Benson carbon fixation.",
      easyTruth: "Plants use sunlight to snap CO₂ + Water into Sugar + O₂. Then EVERY living thing (even plants at night!) burns Sugar + O₂ back into CO₂ + Water to recharge ~36 ATP batteries!",
      microSteps: [
        { label: "Step 1: ATP = Rechargeable AA Battery", text: "ATP has 3 phosphates (fully charged!). Snap 1 off → releases energy → leaves ADP (2 phosphates, needs recharging!)." },
        { label: "Step 2: Photosynthesis (Chloroplast)", text: "6 CO₂ + 6 H₂O + Sun → Glucose (C₆H₁₂O₆) + 6 O₂! Light hits thylakoids (makes O₂); Calvin Cycle builds sugar in stroma!" },
        { label: "Step 3: Cellular Respiration (Mitochondria)", text: "Glucose + 6 O₂ → 6 CO₂ + 6 H₂O + ~36 ATP! Exact reverse equation! No oxygen? Fermentation makes just 2 ATP." }
      ],
      cheatCode: "Photosynthesis builds sugar + O₂. Respiration burns sugar + O₂ → ~36 ATP! Exact mirror equations!",
      visualizerId: "biologyDnaPunnettLab",
      questions: [
        { type: "mc", prompt: "What are the INPUTS (reactants) needed for Photosynthesis?", options: ["Sugar + O₂", "CO₂ + Water + Sunlight", "ATP + Nitrogen", "Salt + Heat"], answer: "CO₂ + Water + Sunlight", hint: "Why you water plants & put them by a window!", whyEasy: "Plants breathe in CO₂, drink H₂O, and absorb sunlight to build sugar!" },
        { type: "mc", prompt: "Where does most Cellular Respiration (~36 ATP) happen?", options: ["Ribosome", "Mitochondria", "Nucleus", "Vacuole"], answer: "Mitochondria", hint: "Oxygen + glucose → big ATP payout!", whyEasy: "Mitochondria run the Krebs cycle & Electron Transport Chain for ~36 ATP!" },
        { type: "mc", prompt: "How does ATP store and release quick energy for a cell?", options: ["Breaking off its 3rd phosphate bond (ATP → ADP + P)", "Burning DNA", "Melting the membrane", "Creating protons"], answer: "Breaking off its 3rd phosphate bond (ATP → ADP + P)", hint: "Tri-phosphate (3) drops to Di-phosphate (2)!", whyEasy: "Snapping the high-energy 3rd phosphate powers muscle flexing, transport, and building!" },
        { type: "mc", prompt: "Do plants perform Cellular Respiration?", options: ["No, never", "YES — plants make sugar AND burn it for ATP 24/7!", "Only in winter", "Only roots do"], answer: "YES — plants make sugar AND burn it for ATP 24/7!", hint: "Making sugar isn't the same as spending ATP to stay alive!", whyEasy: "Plants have BOTH chloroplasts AND mitochondria!" },
        { type: "mc", prompt: "Without oxygen (anaerobic sprinting), muscles switch to lactic acid fermentation yielding only:", options: ["~36 ATP", "2 ATP", "100 ATP", "0 ATP"], answer: "2 ATP", hint: "Just Glycolysis runs!", whyEasy: "Oxygen acts as the final electron catcher; without it, you only get 2 ATP from glycolysis!" }
      ]
    },
    {
      id: "bio-dna-rna-proteins",
      worldId: "biology",
      order: 56,
      title: "DNA → RNA → Protein (A-T / U & G-C)",
      icon: "🧬",
      tagline: "DNA copies semi-conservatively, transcribes to mRNA (T → U!), then Ribosomes print Proteins!",
      scaryVersion: "Semi-conservative replication & central-dogma ribosomal translation.",
      easyTruth: "DNA is the master blueprint locked safely in City Hall (the Nucleus). When dividing, DNA unzips so each daughter double helix keeps 1 old strand + 1 brand-new strand (semi-conservative replication). To build proteins, a gene is photocopied to mRNA (Transcription) and read 3 bases at a time at a Ribosome (Translation)!",
      microSteps: [
        { label: "Step 1: Base-Pairing & Semi-Conservative Replication", text: "In DNA: A pairs with T, G pairs with C ('Apples in Trees, Cars in Garage'). During DNA replication, each half templates a new partner — producing 1 original + 1 new strand (semi-conservative!). In RNA, there is NO T: A pairs with U (Uracil)!" },
        { label: "Step 2: Central Dogma Pipeline", text: "DNA → (Transcription in Nucleus) → mRNA → (Translation at Ribosome with tRNA delivery) → Protein (folded amino acid chain)!" },
        { label: "Step 3: 3 Letters = 1 Codon = 1 Amino Acid", text: "Ribosomes read mRNA in non-overlapping triplets called codons (e.g. AUG = Start). Divide coding bases by 3 to get the amino acid count (12 bases ÷ 3 = 4 amino acids)!" }
      ],
      cheatCode: "DNA: A↔T, G↔C (semi-conservative = 1 old + 1 new). RNA swaps T → U! DNA → mRNA (Nucleus) → Protein (Ribosome, 3 bases/codon).",
      visualizerId: "biologyDnaPunnettLab",
      questions: [
        { type: "mc", prompt: "Given DNA strand A-T-G-C-C-A, what is the matching COMPLEMENTARY DNA strand?", options: ["T-A-C-G-G-T", "U-A-C-G-G-U", "A-T-G-C-C-A", "C-G-T-A-A-C"], answer: "T-A-C-G-G-T", hint: "Both strands are DNA, so use A↔T and G↔C (no U in DNA!).", whyEasy: "A→T, T→A, G→C, C→G, C→G, A→T gives T-A-C-G-G-T!" },
        { type: "mc", prompt: "Transcribe DNA template T-A-C-G-A into mRNA (remember: RNA uses U instead of T!):", options: ["A-T-G-C-T", "A-U-G-C-U", "U-A-C-G-A", "T-U-G-C-U"], answer: "A-U-G-C-U", hint: "DNA T pairs with RNA A, but DNA A pairs with RNA U (Uracil)!", whyEasy: "T→A, A→U, C→G, G→C, A→U yields A-U-G-C-U!" },
        { type: "mc", prompt: "What is the correct order of the Central Dogma?", options: ["Protein → RNA → DNA", "DNA → RNA → Protein", "RNA → DNA → Cell", "ATP → DNA → RNA"], answer: "DNA → RNA → Protein", hint: "Master Blueprint (Nucleus) → Messenger Photocopy → Built Protein!", whyEasy: "Genetic info flows DNA → (Transcription) → mRNA → (Translation) → Protein!" },
        { type: "input", prompt: "If an mRNA coding sequence is 12 bases long, how many Amino Acids (3 bases per codon) does it specify?", answer: "4", hint: "Each triplet codon specifies 1 amino acid: 12 ÷ 3.", whyEasy: "12 bases ÷ 3 bases per codon = 4 amino acids!" },
        { type: "mc", prompt: "Why does DNA replication produce 1 old strand + 1 new strand in each copy?", options: ["Semi-conservative replication", "Mutagenesis", "Translation", "Osmosis"], answer: "Semi-conservative replication", hint: "'Semi' = half, 'conservative' = saved from the original helix!", whyEasy: "Each unzipped original strand templates a matching new strand — half old, half new!" }
      ]
    },
    {
      id: "bio-mitosis-meiosis-genetics",
      worldId: "biology",
      order: 57,
      title: "Mitosis, Meiosis & Punnett Squares",
      icon: "🟩",
      tagline: "Mitosis = My Toes (identical clones). Meiosis = Make-Me (half DNA gametes). Punnett = FOIL!",
      scaryVersion: "Eukaryotic cytokinesis, meiotic crossing-over & Mendelian inheritance.",
      easyTruth: "Scrape your knee? Mitosis makes 2 identical 46-chromosome clones (PMAT). Making sperm/egg? Meiosis halves to 4 unique 23-chromosome cells! And Punnett squares are literally 2×2 Algebra boxes!",
      microSteps: [
        { label: "Step 1: Mitosis vs Meiosis", text: "Mitosis: 1 division → 2 IDENTICAL diploid (2n) body cells. Meiosis: 2 divisions → 4 UNIQUE haploid (n) sex cells!" },
        { label: "Step 2: PMAT Order ('Pass Me A Taco')", text: "Prophase (pack DNA) → Metaphase (Middle line-up!) → Anaphase (Apart!) → Telophase (Two new nuclei)." },
        { label: "Step 3: Punnett Square = FOIL!", text: "Cross Aa × Aa: boxes are AA, Aa, Aa, aa → 3/4 (75%) show Dominant A, 1/4 (25%) show Recessive aa!" }
      ],
      cheatCode: "Mitosis = 2 identical (2n). Meiosis = 4 unique half-DNA (n). Aa × Aa → 75% dominant, 25% recessive!",
      visualizerId: "biologyDnaPunnettLab",
      questions: [
        { type: "mc", prompt: "Human body cells have 46 chromosomes. After MEIOSIS makes egg/sperm cells, each has:", options: ["92", "46", "23", "12"], answer: "23", hint: "Meiosis cuts chromosome count in HALF so baby gets 23 + 23 = 46!", whyEasy: "46 ÷ 2 = 23 chromosomes!" },
        { type: "mc", prompt: "In PMAT, during which phase do chromosomes line up right down the MIDDLE?", options: ["Prophase", "Metaphase", "Anaphase", "Telophase"], answer: "Metaphase", hint: "M = Middle! A = Apart!", whyEasy: "Metaphase = Middle, Anaphase = pulled Apart!" },
        { type: "mc", prompt: "Cross two heterozygous parents (Aa × Aa). What % of offspring will show the RECESSIVE trait (aa)?", options: ["0%", "25%", "50%", "75%"], answer: "25%", hint: "Four boxes: AA, Aa, Aa, aa. Only 1 of 4 is aa!", whyEasy: "1/4 = 25% aa! Notice (A + a)(A + a) = A² + 2Aa + a²!" },
        { type: "mc", prompt: "Cross AA × aa. What % of offspring carry the dominant phenotype (at least one A)?", options: ["25%", "50%", "75%", "100%"], answer: "100%", hint: "Every child gets A from parent 1 and a from parent 2 → all Aa!", whyEasy: "100% are Aa → 100% show dominant trait!" },
        { type: "mc", prompt: "Which process creates identical cells to heal a paper cut?", options: ["Mitosis", "Meiosis", "Transcription", "Osmosis"], answer: "Mitosis", hint: "Mitosis heals 'my toes' with clones!", whyEasy: "Mitosis makes exact body-cell clones!" }
      ]
    },
    {
      id: "bio-evolution-ecology",
      worldId: "biology",
      order: 58,
      title: "Natural Selection, 10% Food Web & Homeostasis",
      icon: "🦁",
      tagline: "Only 10% of energy climbs each food-chain step. Homeostasis = body's AC thermostat!",
      scaryVersion: "Darwinian differential fitness, trophic thermodynamics & negative feedback.",
      easyTruth: "Animals can't 'try' to mutate — random mutations already exist, and helpful ones survive & leave more babies! Meanwhile ecosystems pass only ~10% energy up each level (90% is lost as heat/movement).",
      microSteps: [
        { label: "Step 1: Natural Selection (3 Ingredients)", text: "Variation (different traits) + Selection (some survive/reproduce better) + Heredity (pass DNA to kids) = Population shifts over generations!" },
        { label: "Step 2: The 10% Trophic Rule", text: "10,000 J in Grass → 1,000 J in Rabbits → 100 J in Foxes → 10 J in Eagles! That's why top predators are rare!" },
        { label: "Step 3: Homeostasis = Negative Feedback", text: "Too hot? Sweat cools you back down. Blood sugar spikes? Insulin pulls it back down. Negative feedback restores balance!" }
      ],
      cheatCode: "10% energy passes per food-chain step (divide by 10 each jump!). Negative feedback = thermostat returning to normal.",
      visualizerId: "biologyDnaPunnettLab",
      questions: [
        { type: "input", prompt: "Plants capture 5,000 J of energy. Using the 10% rule: Grass → Grasshopper → Frog. Energy (J) reaching the Frog?", answer: "50", hint: "Divide by 10 twice: 5,000 → 500 → ?", whyEasy: "5,000 × 0.1 × 0.1 = 50 J! (90% lost at each step)." },
        { type: "mc", prompt: "Why are there millions of blades of grass, hundreds of deer, and only a handful of wolves?", options: ["90% of energy is lost at every trophic level up the food pyramid", "Wolves don't drink water", "Grass eats wolves", "Wolves have smaller DNA"], answer: "90% of energy is lost at every trophic level up the food pyramid", hint: "10% rule leaves little energy at the top!", whyEasy: "Only 10% climbs each step, limiting top predator numbers!" },
        { type: "mc", prompt: "Why do bacteria become antibiotic-resistant over time?", options: ["Individual bacteria intentionally invent armor", "A few already had resistant DNA mutations, survived the drug, and multiplied", "Antibiotics turn into sugar", "Bacteria have mitosis only"], answer: "A few already had resistant DNA mutations, survived the drug, and multiplied", hint: "Natural selection filters existing variation!", whyEasy: "The drug kills non-resistant ones, leaving resistant mutants to take over!" },
        { type: "mc", prompt: "You get hot, start sweating, and cool back down to 37°C. This is an example of:", options: ["Positive feedback", "Negative feedback (Homeostasis)", "Osmosis", "Natural selection"], answer: "Negative feedback (Homeostasis)", hint: "Reverses the deviation back toward set point!", whyEasy: "Negative feedback stabilizes body temp, blood pH, and glucose!" },
        { type: "mc", prompt: "Which organisms break dead leaves and animals back into soil nutrients for plants?", options: ["Decomposers (fungi & bacteria)", "Top carnivores", "Herbivores", "Viruses"], answer: "Decomposers (fungi & bacteria)", hint: "Nature's recyclers!", whyEasy: "Decomposers recycle nitrogen, carbon, and minerals back into the ecosystem!" }
      ]
    }
  ];

  for (const n of EXTRA_NODES) {
    DATA.NODES.push(n);
  }

  // ==================== 9 MORE TRAPS (MATH + PHYSICS + CHEM + BIO -> 24 TOTAL!) ====================
  DATA.GRADE12_TRAPS.push(
    {
      id: "trap-16",
      title: "Trap #16: '5 Less Than x' Flips Order",
      trapExpression: "5 less than x",
      wrongGuess: "5 − x",
      rightAnswer: "x − 5",
      whyItHappens: "In English, '5 less than 20' means 20 − 5 = 15, NOT 5 − 20 = −15!",
      quickRule: "'A less than B' ALWAYS flips to B − A.",
      quiz: { prompt: "Translate: '8 less than twice x'", options: ["8 − 2x", "2x − 8", "2(x − 8)", "8 + 2x"], answer: "2x − 8", explanation: "Start with 2x, subtract 8 → 2x − 8!" }
    },
    {
      id: "trap-17",
      title: "Trap #17 (Physics): Mass (kg) ≠ Weight (N)",
      trapExpression: "60 kg person goes to the Moon",
      wrongGuess: "Mass becomes 10 kg",
      rightAnswer: "Mass is STILL 60 kg (Weight drops to ~100 N)",
      whyItHappens: "Mass is how many atoms you're made of (doesn't change in space!). Weight is gravity's pull (W = m·g).",
      quickRule: "kg stays constant everywhere; Newtons (Weight) changes with planet gravity g!",
      quiz: { prompt: "An 80 kg astronaut floats in space. What is their MASS?", options: ["0 kg", "8 kg", "80 kg", "800 N"], answer: "80 kg", explanation: "Your atoms didn't vanish! Mass = 80 kg (Weight = 0 N)." }
    },
    {
      id: "trap-18",
      title: "Trap #18 (Physics): Speed ≠ Velocity in a Loop",
      trapExpression: "Run 1 full lap around a 400m track in 50s",
      wrongGuess: "Average velocity = 8 m/s",
      rightAnswer: "Speed = 8 m/s, Average Velocity = 0 m/s",
      whyItHappens: "Velocity uses net DISPLACEMENT (finish minus start). Back at start = 0 m displacement!",
      quickRule: "Distance/Speed count every step; Displacement/Velocity only care start → finish!",
      quiz: { prompt: "Fly 500 km North, then 500 km South back home. Net Displacement?", options: ["1,000 km", "500 km", "0 km", "−500 km"], answer: "0 km", explanation: "Start and finish are the same spot → 0 km displacement!" }
    },
    {
      id: "trap-19",
      title: "Trap #19 (Physics): Inverse Square (1/r²) Drops Faster Than Half!",
      trapExpression: "Double distance r → 2r",
      wrongGuess: "Gravity becomes ½",
      rightAnswer: "Gravity becomes ¼ (1 / 2²)",
      whyItHappens: "Distance r is SQUARED in F = G·Mm / r²! So 2× distance = 1/4 pull; 3× distance = 1/9 pull.",
      quickRule: "Always square the distance multiplier before flipping it!",
      quiz: { prompt: "Move 3× farther from a planet. Gravity drops to:", options: ["1/3", "1/6", "1/9", "3×"], answer: "1/9", explanation: "1 / 3² = 1/9th!" }
    },
    {
      id: "trap-20",
      title: "Trap #20 (Chem): NEVER Change Subscripts When Balancing!",
      trapExpression: "H₂ + O₂ → H₂O",
      wrongGuess: "Change H₂O to H₂O₂",
      rightAnswer: "Put 2s in front: 2 H₂ + O₂ → 2 H₂O",
      whyItHappens: "Changing H₂O to H₂O₂ changes drinking water into poisonous hydrogen peroxide!",
      quickRule: "Only edit big FRONT coefficients; never touch small subscripts!",
      quiz: { prompt: "Which move is LEGAL when balancing Fe + O₂ → Fe₂O₃?", options: ["Change O₂ to O₃", "Put coefficients in front (4 Fe + 3 O₂ → 2 Fe₂O₃)", "Change Fe₂O₃ to FeO", "Delete one O"], answer: "Put coefficients in front (4 Fe + 3 O₂ → 2 Fe₂O₃)", explanation: "Only front coefficients can change!" }
    },
    {
      id: "trap-21",
      title: "Trap #21 (Chem): pH 2 vs pH 4 Isn't 2×!",
      trapExpression: "pH 2 vs pH 4",
      wrongGuess: "2× stronger acid",
      rightAnswer: "100× stronger acid (10²)",
      whyItHappens: "pH is a base-10 LOGARITHM scale! Each 1-step drop multiplies [H⁺] by ×10.",
      quickRule: "Difference of Δ pH steps = 10^(Δ) times stronger!",
      quiz: { prompt: "pH 3 is how many times more acidic than pH 6?", options: ["2×", "30×", "100×", "1,000×"], answer: "1,000×", explanation: "6 − 3 = 3 steps → 10³ = 1,000×!" }
    },
    {
      id: "trap-22",
      title: "Trap #22 (Bio): Plants DO Cellular Respiration Too!",
      trapExpression: "Do plants have Mitochondria?",
      wrongGuess: "No, only Chloroplasts",
      rightAnswer: "YES — both Chloroplasts AND Mitochondria!",
      whyItHappens: "Chloroplasts make sugar food (sunlight → glucose). Plants still need Mitochondria to turn that sugar into usable ATP!",
      quickRule: "Animals = Mitochondria. Plants = Chloroplasts + Mitochondria!",
      quiz: { prompt: "At midnight in the dark, how does a plant stay alive?", options: ["Photosynthesis runs without light", "Mitochondria burn stored glucose into ATP", "It absorbs soil protons", "It stops using ATP"], answer: "Mitochondria burn stored glucose into ATP", explanation: "Cellular respiration runs 24/7 in both plants and animals!" }
    },
    {
      id: "trap-23",
      title: "Trap #23 (Bio): DNA Uses T, RNA Uses U!",
      trapExpression: "mRNA complement of DNA 'A'",
      wrongGuess: "'T'",
      rightAnswer: "'U' (Uracil)",
      whyItHappens: "RNA has NO Thymine (T)! Whenever DNA says A, matching mRNA writes U.",
      quickRule: "DNA ↔ DNA uses A↔T. DNA → RNA replaces T with U!",
      quiz: { prompt: "DNA triplet A-A-T transcribes into which mRNA codon?", options: ["T-T-A", "U-U-A", "U-U-T", "G-G-C"], answer: "U-U-A", explanation: "A→U, A→U, T→A → U-U-A!" }
    },
    {
      id: "trap-24",
      title: "Trap #24 (Bio): Osmosis Water Chases SALT!",
      trapExpression: "Cell dropped in salty water",
      wrongGuess: "Salt rushes out or water rushes in",
      rightAnswer: "Water rushes OUT toward the salt (cell shrivels)",
      whyItHappens: "Large salt ions often can't cross freely; tiny water molecules move to dilute whichever side is saltier!",
      quickRule: "Remember: 'Salt Sucks!' Water flows toward higher solute concentration.",
      quiz: { prompt: "Drop a freshwater fish cell into ocean salt water (hypertonic). What happens?", options: ["Cell swells & bursts", "Water leaves the cell & it shrivels", "Nothing changes", "Cell divides twice"], answer: "Water leaves the cell & it shrivels", explanation: "Water exits to dilute the salty ocean outside!" }
    }
  );

  // ==================== +3 SCIENCE QUESTIONS IN DIAGNOSTIC SCAN (12 TOTAL!) ====================
  DATA.DIAGNOSTIC_QUESTIONS.push(
    {
      id: "diag-10",
      eraId: "physics",
      targetNodeId: "physics-newton-forces",
      topicLabel: "Physics (F = ma & Circuits)",
      prompt: "Physics check! A 5 kg cart feels a 20 N net push. Acceleration?",
      options: ["4 m/s²", "100 m/s²", "15 m/s²", "0.25 m/s²"],
      answer: "4 m/s²",
      whyItMatters: "F = ma is literally the core engine of classical mechanics!"
    },
    {
      id: "diag-11",
      eraId: "chemistry",
      targetNodeId: "chem-acids-bases-ph",
      topicLabel: "Chemistry (Atoms & pH)",
      prompt: "Chemistry check! How many times more acidic is pH 3 than pH 5?",
      options: ["2×", "20×", "100×", "1,000×"],
      answer: "100×",
      whyItMatters: "pH connects directly to Grade 12 logarithms: 2 steps = 10² = 100×!"
    },
    {
      id: "diag-12",
      eraId: "biology",
      targetNodeId: "bio-dna-rna-proteins",
      topicLabel: "Biology (DNA → mRNA & Genetics)",
      prompt: "Biology check! Transcribe DNA strand A-T-G into mRNA:",
      options: ["T-A-C", "U-A-C", "A-U-G", "C-G-U"],
      answer: "U-A-C",
      whyItMatters: "A→U, T→A, G→C drives the Central Dogma from DNA to Proteins!"
    }
  );

  // ==================== +4 SCIENCE BADGES (14 TOTAL!) ====================
  DATA.BADGES.push(
    { id: "newton_jr", title: "Newton's Apprentice", description: "Clear any Physics skill node!", emoji: "⚛️" },
    { id: "mad_scientist", title: "Molecule Builder", description: "Clear any Chemistry skill node!", emoji: "🧪" },
    { id: "life_hacker", title: "DNA Decoder", description: "Clear any Biology skill node!", emoji: "🧬" },
    { id: "stem_polymath", title: "STEM Polymath", description: "Clear skills across Math, Physics, Chemistry & Biology!", emoji: "🌟" }
  );

  // ==================== SCIENCE MEMORIZE TABLES ====================
  DATA.MEMORIZE_DATA.elements20 = [
    { z: 1, sym: "H", name: "Hydrogen", val: 1, kind: "Nonmetal" },
    { z: 2, sym: "He", name: "Helium", val: 2, kind: "Noble Gas" },
    { z: 3, sym: "Li", name: "Lithium", val: 1, kind: "Metal" },
    { z: 4, sym: "Be", name: "Beryllium", val: 2, kind: "Metal" },
    { z: 5, sym: "B", name: "Boron", val: 3, kind: "Metalloid" },
    { z: 6, sym: "C", name: "Carbon", val: 4, kind: "Nonmetal" },
    { z: 7, sym: "N", name: "Nitrogen", val: 5, kind: "Nonmetal" },
    { z: 8, sym: "O", name: "Oxygen", val: 6, kind: "Nonmetal" },
    { z: 9, sym: "F", name: "Fluorine", val: 7, kind: "Nonmetal" },
    { z: 10, sym: "Ne", name: "Neon", val: 8, kind: "Noble Gas" },
    { z: 11, sym: "Na", name: "Sodium", val: 1, kind: "Metal" },
    { z: 12, sym: "Mg", name: "Magnesium", val: 2, kind: "Metal" },
    { z: 13, sym: "Al", name: "Aluminum", val: 3, kind: "Metal" },
    { z: 14, sym: "Si", name: "Silicon", val: 4, kind: "Metalloid" },
    { z: 15, sym: "P", name: "Phosphorus", val: 5, kind: "Nonmetal" },
    { z: 16, sym: "S", name: "Sulfur", val: 6, kind: "Nonmetal" },
    { z: 17, sym: "Cl", name: "Chlorine", val: 7, kind: "Nonmetal" },
    { z: 18, sym: "Ar", name: "Argon", val: 8, kind: "Noble Gas" },
    { z: 19, sym: "K", name: "Potassium", val: 1, kind: "Metal" },
    { z: 20, sym: "Ca", name: "Calcium", val: 2, kind: "Metal" }
  ];

  DATA.MEMORIZE_DATA.scienceFormulas = [
    { subject: "Physics", eq: "F = m · a", meaning: "Force (N) = Mass (kg) × Acceleration (m/s²)" },
    { subject: "Physics", eq: "v = u + a·t", meaning: "Final Speed = Start Speed + Acceleration × Time" },
    { subject: "Physics", eq: "KE = ½ m v²", meaning: "Kinetic Energy (J) — double speed = 4× energy!" },
    { subject: "Physics", eq: "PE = m · g · h", meaning: "Potential Energy = Mass × Gravity (≈10) × Height" },
    { subject: "Physics", eq: "V = I · R", meaning: "Voltage (V) = Current (A) × Resistance (Ω)" },
    { subject: "Physics", eq: "v = f · λ", meaning: "Wave Speed = Frequency (Hz) × Wavelength (m)" },
    { subject: "Chemistry", eq: "1 mol = 6.02 × 10²³", meaning: "Avogadro's chemist dozen; mass = Periodic Table g/mol" },
    { subject: "Chemistry", eq: "PV = nRT", meaning: "Ideal Gas Law (always convert Temp to Kelvin: °C + 273)" },
    { subject: "Chemistry", eq: "pH = −log₁₀[H⁺]", meaning: "Every 1 step down on pH = 10× more acidic!" },
    { subject: "Biology", eq: "DNA: A↔T, G↔C", meaning: "In RNA, swap T for U (A↔U, G↔C)" },
    { subject: "Biology", eq: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", meaning: "Photosynthesis (reverse = Cellular Respiration → ~36 ATP)" },
    { subject: "Biology", eq: "10% Trophic Rule", meaning: "Only 10% of energy passes up each food-web level" }
  ];

  // ==================== EXTEND PROCEDURAL GENERATOR FOR ALL 22 NEW NODES ====================
  const origGen = DATA.generateProceduralQuestion;
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function shuffle(arr) {
    const c = arr.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = c[i]; c[i] = c[j]; c[j] = t;
    }
    return c;
  }
  function numOpts(ans, deltas) {
    const s = new Set([String(ans)]);
    for (const d of shuffle(deltas || [-2, -1, 1, 2, 3, -3, 4])) {
      if (s.size >= 4) break;
      const v = ans + d;
      if (v !== ans) s.add(String(v));
    }
    let k = 1;
    while (s.size < 4) { s.add(String(ans + k)); k++; }
    return shuffle(Array.from(s));
  }
  function strOpts(ans, pool) {
    const s = new Set([ans]);
    for (const p of shuffle(pool)) {
      if (s.size >= 4) break;
      if (p !== ans) s.add(p);
    }
    let k = 1;
    while (s.size < 4) { s.add(ans + " (" + k + ")"); k++; }
    return shuffle(Array.from(s));
  }

  DATA.generateProceduralQuestion = function (nodeId) {
    switch (nodeId) {
      case "word-problems-translator": {
        const n = randInt(3, 12);
        return {
          type: "mc",
          prompt: `Translate: '${n} less than x'`,
          options: strOpts(`x − ${n}`, [`${n} − x`, `x + ${n}`, `${n}x`]),
          answer: `x − ${n}`,
          hint: "'Less than' flips the order!",
          whyEasy: `Start with x and lose ${n} → x − ${n}!`
        };
      }
      case "ratios-proportions-rates": {
        const a = randInt(2, 5), b = randInt(3, 7), scale = randInt(2, 5);
        const ans = a * scale;
        return {
          type: "mc",
          prompt: `Solve proportion: ${a} / ${b} = x / ${b * scale}`,
          options: numOpts(ans, [-2, -1, 1, 2, a]),
          answer: String(ans),
          hint: `${b} scaled by ×${scale}.`,
          whyEasy: `Multiply top ${a} × ${scale} = ${ans}!`
        };
      }
      case "polynomials-remainder-div": {
        const k = randInt(2, 5), c = randInt(1, 6);
        const ans = k * k + c;
        return {
          type: "mc",
          prompt: `Remainder when f(x) = x² + ${c} is divided by (x − ${k}):`,
          options: numOpts(ans, [-3, -1, 1, 2, k]),
          answer: String(ans),
          hint: `Plug x = ${k} straight into f(x)!`,
          whyEasy: `f(${k}) = ${k}² + ${c} = ${ans}!`
        };
      }
      case "matrices-3d-transformations": {
        const a = randInt(1, 5), b = randInt(1, 5), c = randInt(2, 4), d = randInt(2, 4);
        const ans = a * c + b * d;
        return {
          type: "mc",
          prompt: `Top row [${a}, ${b}] · vector [${c}, ${d}] = ?`,
          options: numOpts(ans, [-2, -1, 1, 2, 4]),
          answer: String(ans),
          hint: `(${a}×${c}) + (${b}×${d}).`,
          whyEasy: `${a * c} + ${b * d} = ${ans}!`
        };
      }
      case "physics-units-vectors": {
        const s = randInt(1, 4);
        const a = 3 * s, b = 4 * s, c = 5 * s;
        return {
          type: "mc",
          prompt: `Walk ${a} m East then ${b} m North. Net displacement (m)?`,
          options: numOpts(c, [-2, -1, 1, 2, a + b - c || 3]),
          answer: String(c),
          hint: `3-4-5 vector triangle × ${s}!`,
          whyEasy: `√(${a}² + ${b}²) = ${c} m!`
        };
      }
      case "physics-kinematics": {
        const a = randInt(2, 6), t = randInt(3, 8);
        const ans = a * t;
        return {
          type: "mc",
          prompt: `Start from rest (u=0), accelerate at ${a} m/s² for ${t} s. Final speed (m/s)?`,
          options: numOpts(ans, [-a, a, 2, -2, 1]),
          answer: String(ans),
          hint: `v = u + a·t = 0 + ${a}×${t}.`,
          whyEasy: `${a} × ${t} = ${ans} m/s!`
        };
      }
      case "physics-newton-forces": {
        const m = randInt(2, 9), a = randInt(2, 8);
        const f = m * a;
        return {
          type: "mc",
          prompt: `Push a ${m} kg box with ${f} N net force. Acceleration (m/s²)?`,
          options: numOpts(a, [-1, 1, 2, -2, m]),
          answer: String(a),
          hint: `a = F ÷ m = ${f} ÷ ${m}.`,
          whyEasy: `${f} ÷ ${m} = ${a} m/s²!`
        };
      }
      case "physics-energy-momentum": {
        const m = randInt(2, 6), h = randInt(2, 8);
        const pe = m * 10 * h;
        return {
          type: "mc",
          prompt: `Potential Energy (PE = m·g·h, g=10) of a ${m} kg rock ${h} m high:`,
          options: numOpts(pe, [-10, 10, -20, 20, m * h - pe || 5]),
          answer: `${pe}`,
          hint: `${m} × 10 × ${h}.`,
          whyEasy: `${pe} Joules!`
        };
      }
      case "physics-waves-electricity": {
        const i = randInt(2, 8), r = randInt(2, 7);
        const v = i * r;
        return {
          type: "mc",
          prompt: `Ohm's Law: ${v} V battery across a ${r} Ω resistor. Current I (Amps)?`,
          options: numOpts(i, [-1, 1, 2, -2, r]),
          answer: String(i),
          hint: `I = V ÷ R = ${v} ÷ ${r}.`,
          whyEasy: `${v} ÷ ${r} = ${i} Amps!`
        };
      }
      case "physics-modern-relativity": {
        const k = randInt(2, 5);
        const ans = `1/${k * k}`;
        return {
          type: "mc",
          prompt: `Two planets move ${k}× FARTHER apart. Gravity becomes how strong?`,
          options: strOpts(ans, [`1/${k}`, `${k}×`, `${k * k}×`]),
          answer: ans,
          hint: `Inverse square: 1 / ${k}²!`,
          whyEasy: `1 / ${k}² = ${ans} as strong!`
        };
      }
      case "chem-atoms-periodic": {
        const p = randInt(3, 12), n = p + randInt(0, 2);
        const mass = p + n;
        return {
          type: "mc",
          prompt: `An atom has ${p} protons and ${n} neutrons. Mass Number?`,
          options: numOpts(mass, [-1, 1, 2, -p]),
          answer: String(mass),
          hint: "Mass = Protons + Neutrons!",
          whyEasy: `${p} + ${n} = ${mass}!`
        };
      }
      case "chem-bonds-polarity": {
        const pairs = [
          { f: "KCl (Metal K + Nonmetal Cl)", ans: "Ionic", tip: "Metal + Nonmetal transfers electrons → Ionic!" },
          { f: "CH₄ (Carbon + Hydrogen)", ans: "Covalent", tip: "Two Nonmetals share electrons → Covalent!" },
          { f: "NaF (Sodium + Fluorine)", ans: "Ionic", tip: "Metal Na + Nonmetal F → Ionic!" },
          { f: "N₂ (Nitrogen + Nitrogen)", ans: "Covalent", tip: "Two Nonmetals share → Covalent!" }
        ];
        const pick = pairs[randInt(0, pairs.length - 1)];
        return {
          type: "mc",
          prompt: `What bond forms in ${pick.f}?`,
          options: strOpts(pick.ans, ["Ionic", "Covalent", "Metallic", "Nuclear"]),
          answer: pick.ans,
          hint: "Metal + Nonmetal = Ionic; Nonmetal + Nonmetal = Covalent.",
          whyEasy: pick.tip
        };
      }
      case "chem-moles-stoich": {
        const mm = [12, 16, 18, 44][randInt(0, 3)];
        const moles = randInt(2, 5);
        const grams = mm * moles;
        return {
          type: "mc",
          prompt: `A substance has molar mass ${mm} g/mol. How many moles are in ${grams} g?`,
          options: numOpts(moles, [-1, 1, 2, 3]),
          answer: String(moles),
          hint: `Grams ÷ Molar Mass = ${grams} ÷ ${mm}.`,
          whyEasy: `${grams} ÷ ${mm} = ${moles} moles!`
        };
      }
      case "chem-balancing-reactions": {
        const m1 = randInt(5, 25), m2 = randInt(5, 25);
        const tot = m1 + m2;
        return {
          type: "mc",
          prompt: `${m1} g of Reactant A completely reacts with ${m2} g of B in a closed jar. Total product mass (g)?`,
          options: numOpts(tot, [-5, 5, -2, 2, m1]),
          answer: String(tot),
          hint: "Conservation of Mass!",
          whyEasy: `${m1} + ${m2} = ${tot} g!`
        };
      }
      case "chem-acids-bases-ph": {
        const ph1 = randInt(1, 3), step = randInt(1, 3), ph2 = ph1 + step;
        const factor = Math.pow(10, step);
        return {
          type: "mc",
          prompt: `pH ${ph1} is how many times more acidic than pH ${ph2}?`,
          options: strOpts(`${factor}×`, [`${step}×`, `${step * 10}×`, `${factor * 10}×`]),
          answer: `${factor}×`,
          hint: `${ph2} − ${ph1} = ${step} steps → 10^${step}!`,
          whyEasy: `Every pH unit = ×10 → 10^${step} = ${factor}×!`
        };
      }
      case "chem-gas-thermo-organic": {
        const c = randInt(10, 40);
        const k = c + 273;
        return {
          type: "mc",
          prompt: `Convert ${c}°C to Kelvin for PV = nRT:`,
          options: numOpts(k, [-10, 10, -273, 5]),
          answer: String(k),
          hint: `Add 273 to ${c}.`,
          whyEasy: `${c} + 273 = ${k} K!`
        };
      }
      case "bio-cells-organelles": {
        const bank = [
          { q: "Which organelle builds proteins in ALL cells?", a: "Ribosome", d: ["Mitochondria", "Golgi", "Chloroplast"], t: "Ribosomes are protein 3D printers!" },
          { q: "Which organelle converts glucose into ATP?", a: "Mitochondria", d: ["Nucleus", "Vacuole", "Ribosome"], t: "Mitochondria = cellular power plant!" },
          { q: "Which organelle houses DNA in Eukaryotes?", a: "Nucleus", d: ["Lysosome", "Ribosome", "Golgi"], t: "Nucleus = City Hall / DNA vault!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { type: "mc", prompt: p.q, options: strOpts(p.a, p.d), answer: p.a, hint: "Think of the cell as a city!", whyEasy: p.t };
      }
      case "bio-osmosis-transport": {
        const opts = ["Passive diffusion (0 ATP)", "Active transport (costs ATP)", "Osmosis only", "Endocytosis"];
        return {
          type: "mc",
          prompt: "Moving ions from LOW concentration to HIGH concentration requires:",
          options: strOpts("Active transport (costs ATP)", opts),
          answer: "Active transport (costs ATP)",
          hint: "Going uphill against the crowd takes fuel!",
          whyEasy: "Low → High is uphill, so it always costs ATP!"
        };
      }
      case "bio-energy-photosynthesis": {
        return {
          type: "mc",
          prompt: "Which gas do plants RELEASE as a byproduct of splitting water in Photosynthesis?",
          options: ["Oxygen (O₂)", "Carbon Dioxide (CO₂)", "Nitrogen (N₂)", "Methane (CH₄)"],
          answer: "Oxygen (O₂)",
          hint: "Why trees keep the air breathable!",
          whyEasy: "6CO₂ + 6H₂O → Glucose + 6O₂!"
        };
      }
      case "bio-dna-rna-proteins": {
        const bases = ["A", "T", "G", "C"];
        const rnaMap = { A: "U", T: "A", G: "C", C: "G" };
        const dna = Array.from({ length: 3 }, () => bases[randInt(0, 3)]);
        const rna = dna.map((b) => rnaMap[b]).join("-");
        return {
          type: "mc",
          prompt: `Transcribe DNA ${dna.join("-")} into mRNA:`,
          options: strOpts(rna, [dna.join("-"), "T-T-T", "G-G-A"]),
          answer: rna,
          hint: "In RNA: A→U, T→A, G↔C!",
          whyEasy: `${dna.join("-")} transcribes to ${rna}!`
        };
      }
      case "bio-mitosis-meiosis-genetics": {
        const dipl = [16, 24, 46, 78][randInt(0, 3)];
        const hap = dipl / 2;
        return {
          type: "mc",
          prompt: `Body cells have ${dipl} chromosomes. After MEIOSIS, each gamete has:`,
          options: numOpts(hap, [-2, 2, dipl - hap || 8, 4]),
          answer: String(hap),
          hint: `Meiosis halves ${dipl}.`,
          whyEasy: `${dipl} ÷ 2 = ${hap} chromosomes!`
        };
      }
      case "bio-evolution-ecology": {
        const base = [1000, 2000, 5000, 10000][randInt(0, 3)];
        const ans = base / 100;
        return {
          type: "mc",
          prompt: `10% Rule! Producers hold ${base} J. Two steps up (Producer → Bug → Bird), Bird gets:`,
          options: numOpts(ans, [ans * 9, ans * 99, -5, 5]),
          answer: String(ans),
          hint: "Divide by 10 twice!",
          whyEasy: `${base} → ${base / 10} → ${ans} J!`
        };
      }
      default:
        return origGen(nodeId);
    }
  };

  // ==================== SELECTED BRUTEFORCE-READY LESSONS (39) ====================
  const BRUTEFORCE_NODE_IDS = new Set([
    "even-odd-skip", "make-10-addition", "distance-subtraction",
    "rect-multiplication", "reverse-division", "primes-factors-lcm",
    "fractions-trenchcoat", "decimals-percents", "pemdas-grammar",
    "word-problems-translator", "ratios-proportions-rates",
    "negatives-flip", "squares-cubes-roots", "exponents-roots",
    "algebra-scale", "systems-equations", "factoring-foil",
    "slope-lines", "geometry-pythagoras",
    "quadratics-symmetry", "complex-imaginary-i", "functions-shifting",
    "logarithms-unlocked", "trig-unit-circle", "polynomials-remainder-div",
    "limits-potholes", "derivatives-speedometer", "integrals-area",
    "calc3-partials-ode", "linear-algebra-vectors", "discrete-logic-mod",
    "physics-kinematics", "physics-newton-forces", "physics-waves-electricity",
    "chem-atoms-periodic", "chem-moles-stoich", "chem-acids-bases-ph",
    "bio-dna-rna-proteins", "bio-mitosis-meiosis-genetics"
  ]);

  for (const node of DATA.NODES) {
    node.bruteforce = BRUTEFORCE_NODE_IDS.has(node.id);
  }

  DATA.BADGES.push({
    id: "bruteforce_survivor",
    title: "Bruteforce Locked In",
    description: "Conquer a 10+ streak lock in Endless Bruteforce Mode!",
    emoji: "🔨"
  });
})(typeof window !== "undefined" ? window : globalThis);
