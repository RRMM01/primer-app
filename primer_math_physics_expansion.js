// Primer Studio — Deep Equations & Formulas Expansion I: Advanced Math (+8) & Physics (+7)
// Adds 15 ultra-detailed, friendly, formula-rich lessons (orders 223–237), 75 curated questions,
// 15 procedural generators, 15 LaTeX worked examples, 8 classic traps, 12 law cards & 6 Work Studio derivations.
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
      const cand = ans + d;
      if (cand !== ans) s.add(format(cand));
    }
    let k = 1;
    while (s.size < 4) {
      s.add(format(ans + k));
      k++;
    }
    return shuffle(Array.from(s));
  }

  function gcd(a, b) {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
      const t = x % y;
      x = y;
      y = t;
    }
    return x;
  }

  // ==================== 15 NEW MATH & PHYSICS NODES (ORDERS 223–237) ====================
  const MATH_PHYSICS_NODES = [
    // ---------- MATH (+8 NODES: 223–230) ----------
    {
      id: "math-parametric-polar-curves",
      worldId: "senior",
      order: 223,
      title: "Parametric Curves & Polar Coordinates (r, θ)",
      icon: "🌀",
      tagline: "Track motion over time with (x(t), y(t)) and paint circles, spirals & flowers effortlessly with radar coordinates (r, θ)!",
      scaryVersion: "Parametric curve differentiation, arc length, and polar coordinate transformations with area integration.",
      easyTruth: "Normal graphs `y = f(x)` freeze a curve in place and freak out if it loops back on itself. Parametric equations add a stopwatch `t` — like a drone GPS logging `(x(t), y(t))` every second! And Polar coordinates `(r, θ)` switch from 'walk East then North' to air-traffic radar: 'face angle θ and fly distance r!'",
      microSteps: [
        { label: "Step 1: Parametric Equations & Eliminating `t`", text: "A parametric curve defines `x = x(t)` and `y = y(t)` separately. To find the familiar Cartesian shape, solve one equation for `t` and plug into the other — or use a trig identity! Classic example: `x = a cos(t), y = b sin(t)` uses `cos²t + sin²t = 1` to instantly reveal the ellipse `(x/a)² + (y/b)² = 1`." },
        { label: "Step 2: Parametric Slope & Arc Length", text: "Even without eliminating `t`, the slope is simply the ratio of vertical speed to horizontal speed: `dy/dx = (dy/dt) / (dx/dt)` (when `dx/dt ≠ 0`). Instantaneous speed along the path is `v = √((dx/dt)² + (dy/dt)²)`, so total distance traveled (arc length) from `t = a` to `b` is `L = ∫ √((dx/dt)² + (dy/dt)²) dt`!" },
        { label: "Step 3: Polar ↔ Cartesian Radar Bridge", text: "Connect polar `(r, θ)` and rectangular `(x, y)` with a right triangle: `x = r cos θ`, `y = r sin θ`, `r² = x² + y²`, and `tan θ = y/x` (check the quadrant!). Suddenly `x² + y² = 9` becomes the tiny one-liner `r = 3`, and a straight line through the origin is just `θ = c`!" },
        { label: "Step 4: Famous Polar Shapes & Polar Area", text: "Watch these classics: `r = a` (circle), `r = a(1 + cos θ)` (heart-shaped cardioid), and rose curves `r = a cos(nθ)` (**`n` petals if `n` is odd, `2n` petals if `n` is even!**). Instead of rectangles, polar area adds thin pizza wedges: `A = (1/2) ∫ r² dθ`!" }
      ],
      cheatCode: "Parametric slope: dy/dx = (dy/dt)/(dx/dt). Polar: x = r cos θ, y = r sin θ, r² = x²+y². Rose r = a cos(nθ): odd n → n petals, even n → 2n petals. Area = ½∫r² dθ!",
      visualizerId: "unitCircleAndGraphLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Convert the polar point `(r, θ) = (6, 60°)` into rectangular coordinates `(x, y)`.", options: ["(3, 3√3)", "(3√3, 3)", "(6, 3)", "(3, 6)"], answer: "(3, 3√3)", hint: "Use `x = r cos θ` and `y = r sin θ`, with `cos 60° = 1/2` and `sin 60° = √3/2`!", whyEasy: "`x = 6(1/2) = 3` and `y = 6(√3/2) = 3√3`!" },
        { type: "mc", prompt: "A particle moves along `x(t) = t²` and `y(t) = t³`. What is the slope `dy/dx` at `t = 2`?", options: ["3", "6", "12", "4/3"], answer: "3", hint: "Compute `dy/dt = 3t²` and `dx/dt = 2t`, then divide `(dy/dt) / (dx/dt)`!", whyEasy: "`dy/dx = (3t²)/(2t) = (3/2)t`. At `t = 2`, `(3/2)(2) = 3`!" },
        { type: "mc", prompt: "How many petals does the polar rose curve `r = 4 sin(2θ)` have?", options: ["4 petals (n = 2 is even → 2n petals!)", "2 petals", "8 petals", "1 petal (a circle)"], answer: "4 petals (n = 2 is even → 2n petals!)", hint: "For `r = a sin(nθ)` or `a cos(nθ)`: odd `n` gives `n` petals, even `n` gives `2n` petals!", whyEasy: "Since `n = 2` is even, `2n = 4` symmetric petals!" },
        { type: "input", prompt: "Find the polar radius `r` (positive) for the rectangular point `(x, y) = (−3, 4)`.", answer: "5", hint: "Use Pythagoras: `r = √(x² + y²)`!", whyEasy: "`r = √((−3)² + 4²) = √(9 + 16) = √25 = 5` — a classic 3-4-5 triangle!" },
        { type: "mc", prompt: "What curve is traced by eliminating `t` from `x = 3 cos(t)` and `y = 5 sin(t)`?", options: ["An ellipse: x²/9 + y²/25 = 1", "A circle of radius 8", "A parabola y = (5/3)x²", "A hyperbola x²/9 − y²/25 = 1"], answer: "An ellipse: x²/9 + y²/25 = 1", hint: "Solve for `cos(t) = x/3` and `sin(t) = y/5`, then square and add!", whyEasy: "`cos²t + sin²t = 1` gives `(x/3)² + (y/5)² = 1` — an ellipse!" }
      ]
    },
    {
      id: "math-number-theory-diophantine-modular",
      worldId: "senior",
      order: 224,
      title: "Number Theory: Euclidean GCD, Fermat & Modular Equations",
      icon: "🔐",
      tagline: "Unlock the hidden clockwork of integers — Euclidean algorithm, ax + by = c, Euler's totient φ(n) & Fermat's Little Theorem!",
      scaryVersion: "Diophantine solvability via Bézout's identity, modular multiplicative inverses, Euler's totient function, and Fermat's Little Theorem.",
      easyTruth: "Number theory is the secret math running every HTTPS padlock on the internet! Instead of decimals, we live on whole-number clocks (`mod m`). Euclid discovered a 2,300-year-old shortcut for GCD that takes 3 tiny divisions instead of factoring huge numbers, and Fermat discovered a magic power-cycle shortcut that cracks `7^100 mod 11` in two seconds flat!",
      microSteps: [
        { label: "Step 1: Euclidean Algorithm & `gcd × lcm = a × b`", text: "To find `gcd(a, b)`, repeatedly replace the bigger number with the remainder: `gcd(a, b) = gcd(b, a mod b)` until you hit `0` — the last non-zero number is the GCD! Example: `gcd(48, 18) = gcd(18, 12) = gcd(12, 6) = 6`. Bonus link: for any positive integers, `gcd(a, b) · lcm(a, b) = a · b`!" },
        { label: "Step 2: Linear Diophantine Equations (`ax + by = c`)", text: "When do whole-number solutions `(x, y)` exist for `ax + by = c`? **Bézout's Criterion**: solutions exist IF AND ONLY IF `gcd(a, b)` divides `c`! Example: `6x + 9y = 20` has **NO** integer solutions because `gcd(6, 9) = 3` does not divide `20` (left side is always a multiple of 3!)." },
        { label: "Step 3: Modular Inverses (`ax ≡ 1 mod m`)", text: "You can't divide by fractions in clock math — instead you multiply by the **modular inverse** `a⁻¹` where `a · a⁻¹ ≡ 1 (mod m)`. An inverse exists IF AND ONLY IF `gcd(a, m) = 1` (coprime). Example mod 7: `3 × 5 = 15 ≡ 1 (mod 7)`, so `3⁻¹ ≡ 5 (mod 7)`!" },
        { label: "Step 4: Fermat's Little Theorem & Euler's Totient `φ(n)`", text: "If `p` is PRIME and `p` doesn't divide `a`, then `a^(p−1) ≡ 1 (mod p)`! For composite `n`, **Euler's Theorem** generalizes it to `a^φ(n) ≡ 1 (mod n)` (when `gcd(a, n) = 1`), where `φ(n)` counts integers `1..n` coprime to `n`. For two distinct primes `p, q`, `φ(pq) = (p − 1)(q − 1)` — the exact heart of RSA encryption!" }
      ],
      cheatCode: "gcd(a,b) = gcd(b, a mod b); gcd·lcm = ab. ax+by=c solvable iff gcd(a,b)|c. Fermat (prime p): a^(p−1) ≡ 1 (mod p). Euler: φ(pq) = (p−1)(q−1)!",
      visualizerId: "numberPatternSieve",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Using Fermat's Little Theorem, what is `3^6 mod 7`?", options: ["1 (since 7 is prime and 6 = 7 − 1!)", "3", "6", "0"], answer: "1 (since 7 is prime and 6 = 7 − 1!)", hint: "For prime `p = 7` and `gcd(3, 7) = 1`, `a^(p−1) ≡ 1 (mod p)`!", whyEasy: "Fermat's Little Theorem guarantees `3^(7−1) = 3^6 ≡ 1 (mod 7)` instantly — zero multiplying!" },
        { type: "mc", prompt: "Which Linear Diophantine equation has **NO integer solutions** `(x, y)`?", options: ["10x + 15y = 22", "6x + 9y = 21", "4x + 7y = 1", "8x + 12y = 20"], answer: "10x + 15y = 22", hint: "Check whether `gcd(a, b)` divides `c`!", whyEasy: "`gcd(10, 15) = 5`, so `10x + 15y` is ALWAYS a multiple of 5 — it can never equal `22`!" },
        { type: "input", prompt: "Compute Euler's totient `φ(15)` (how many integers from 1 to 15 are coprime to 15, using `15 = 3 × 5`).", answer: "8", hint: "Use `φ(pq) = (p − 1)(q − 1)` for distinct primes `p = 3` and `q = 5`!", whyEasy: "`φ(15) = (3 − 1)(5 − 1) = 2 × 4 = 8` (they are `1, 2, 4, 7, 8, 11, 13, 14`)!" },
        { type: "mc", prompt: "What is the modular multiplicative inverse of `4` modulo `9` (find `x` such that `4x ≡ 1 (mod 9)`)?", options: ["7 (since 4 × 7 = 28 = 3·9 + 1)", "2", "5", "None exists"], answer: "7 (since 4 × 7 = 28 = 3·9 + 1)", hint: "Test multiples of 4 and look for remainder 1 when dividing by 9!", whyEasy: "`4 × 7 = 28`, and `28 − 27 = 1`, so `4⁻¹ ≡ 7 (mod 9)`!" },
        { type: "mc", prompt: "Given `gcd(a, b) = 6` and `lcm(a, b) = 90`, what must the product `a × b` equal?", options: ["540", "96", "15", "270"], answer: "540", hint: "Remember the universal identity `gcd(a, b) × lcm(a, b) = a × b`!", whyEasy: "`6 × 90 = 540` — no need to even know `a` and `b` individually!" }
      ]
    },
    {
      id: "math-hyperbolic-euler-complex",
      worldId: "college",
      order: 225,
      title: "Euler's Formula, De Moivre & Hyperbolic Functions",
      icon: "🌉",
      tagline: "Discover why e^(iθ) spins around the unit circle, powers complex numbers in 1 line, and shapes hanging suspension cables via cosh(x)!",
      scaryVersion: "Complex exponential form, De Moivre's theorem for powers and nth roots, and hyperbolic trigonometric identities.",
      easyTruth: "What happens when you put an imaginary number `iθ` inside an exponential `e^(iθ)`? Instead of growing bigger, it **rotates** around the unit circle at radius 1! That single bridge (`e^(iθ) = cos θ + i sin θ`) turns ugly trig & complex powers into effortless exponent addition — and dropping the `i` gives you the hyperbolic twins `cosh` and `sinh`, the exact shape of a hanging bridge chain!",
      microSteps: [
        { label: "Step 1: Euler's Formula & Identity (`e^(iθ) = cos θ + i sin θ`)", text: "Any complex number `z = a + bi` has polar form `z = r(cos θ + i sin θ) = r e^(iθ)`, where `r = √(a² + b²)` is its length and `θ` is its angle. Plug in `θ = π` (half-turn to `−1`): `e^(iπ) = cos π + i sin π = −1`, giving **Euler's Identity**: `e^(iπ) + 1 = 0` — linking `e, i, π, 1, 0` in one breathtaking equation!" },
        { label: "Step 2: De Moivre's Theorem (Instant Complex Powers!)", text: "Raising `(1 + i)^8` by FOILing 8 times is pure pain. In polar form, `(r e^(iθ))^n = r^n e^(inθ) = r^n (cos(nθ) + i sin(nθ))`! Just **raise the length `r` to the `n`-th power and multiply the angle `θ` by `n`**. For `n`-th roots, take `r^(1/n)` and space `n` angles evenly by `360°/n` around a circle!" },
        { label: "Step 3: Hyperbolic Functions (`cosh x` & `sinh x`)", text: "Define `cosh(x) = (e^x + e^(−x)) / 2` (the even part of `e^x`) and `sinh(x) = (e^x − e^(−x)) / 2` (the odd part of `e^x`). Notice `cosh(0) = 1` and `sinh(0) = 0`, and a freely hanging power line or St. Louis Gateway Arch follows a **catenary** `y = a cosh(x/a)` — NOT a parabola!" },
        { label: "Step 4: Hyperbolic Identities & Easy Derivatives", text: "Instead of circle `cos² + sin² = 1`, hyperbolas satisfy **`cosh²(x) − sinh²(x) = 1`**! Even friendlier, their derivatives have **NO minus sign**: `(sinh x)' = cosh x` and `(cosh x)' = +sinh x`! And `tanh(x) = sinh(x)/cosh(x)` squashes any number smoothly into `(−1, 1)` — famous in neural networks!" }
      ],
      cheatCode: "e^(iθ) = cos θ + i sin θ; e^(iπ)+1=0. De Moivre: (r∠θ)^n = r^n∠(nθ). cosh x = (e^x+e^−x)/2, sinh x = (e^x−e^−x)/2. cosh²x − sinh²x = 1; (cosh x)' = +sinh x!",
      visualizerId: "unitCircleAndGraphLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Using Euler's Formula `e^(iθ) = cos θ + i sin θ`, what is the exact value of `e^(iπ/2)`?", options: ["i", "−1", "1", "−i"], answer: "i", hint: "Evaluate `cos(π/2) + i sin(π/2)`!", whyEasy: "`cos(90°) = 0` and `sin(90°) = 1`, so `e^(iπ/2) = 0 + 1i = i` (a 90° quarter-turn)!" },
        { type: "mc", prompt: "Use De Moivre's Theorem to compute `(√2 · e^(i·45°))^4` (which is `(1 + i)^4`).", options: ["−4", "4", "4i", "−4i"], answer: "−4", hint: "Raise radius `(√2)^4 = 4` and multiply angle `4 × 45° = 180°`!", whyEasy: "Radius = `(√2)^4 = 4`, angle = `180°` → `4(cos 180° + i sin 180°) = −4`!" },
        { type: "mc", prompt: "Which identity is ALWAYS true for hyperbolic functions `cosh(x)` and `sinh(x)`?", options: ["cosh²(x) − sinh²(x) = 1", "cosh²(x) + sinh²(x) = 1", "sinh²(x) − cosh²(x) = 1", "cosh(x) + sinh(x) = 1"], answer: "cosh²(x) − sinh²(x) = 1", hint: "Hyperbolic functions live on the unit hyperbola `x² − y² = 1`!", whyEasy: "Check at `x = 0`: `cosh(0) = 1`, `sinh(0) = 0`, so `1² − 0² = 1` (and `cosh x + sinh x = e^x`)!" },
        { type: "mc", prompt: "What is the derivative `d/dx [cosh(x)]`?", options: ["+sinh(x) (no minus sign!)", "−sinh(x)", "cosh(x)", "sech²(x)"], answer: "+sinh(x) (no minus sign!)", hint: "Differentiate `(e^x + e^(−x))/2` directly!", whyEasy: "`d/dx[(e^x + e^(−x))/2] = (e^x − e^(−x))/2 = +sinh(x)` — no negative sign flip!" },
        { type: "input", prompt: "Evaluate `cosh(0) + sinh(0)` (exact integer).", answer: "1", hint: "Recall `cosh(x) + sinh(x) = e^x`!", whyEasy: "`cosh(0) = 1` and `sinh(0) = 0`, so `1 + 0 = 1` (just `e^0 = 1`)!" }
      ]
    },
    {
      id: "math-taylor-maclaurin-power-series",
      worldId: "college",
      order: 226,
      title: "Taylor & Maclaurin Series, Convergence & L'Hôpital",
      icon: "🧬",
      tagline: "How your calculator actually computes sin(x) and e^x — turning smooth curves into infinite polynomials!",
      scaryVersion: "Taylor polynomial approximation, Maclaurin power series expansions, Ratio Test radius of convergence, and L'Hôpital's rule.",
      easyTruth: "Your pocket calculator only really knows how to add, subtract, multiply, and divide — it has NO secret `sin(x)` button in silicon! Instead, it uses **Taylor Series**: matching a function's value, slope, curvature, and higher derivatives at one anchor point `a` to clone ANY smooth curve as a friendly polynomial!",
      microSteps: [
        { label: "Step 1: The Master Taylor & Maclaurin Formula", text: "Near `x = a`, `f(x) = Σ [f^(n)(a) / n!] (x − a)^n = f(a) + f'(a)(x−a) + f''(a)/2! (x−a)² + ...`. When centered at `a = 0`, we call it a **Maclaurin Series**. Dividing by `n!` guarantees that taking `n` derivatives cancels the power-rule multipliers and reproduces `f^(n)(a)` perfectly!" },
        { label: "Step 2: The Big 4 Maclaurin Series to Know by Heart", text: "1) `e^x = 1 + x + x²/2! + x³/3! + ...` (all powers, all signs +). 2) `sin x = x − x³/3! + x⁵/5! − ...` (odd powers, alternating!). 3) `cos x = 1 − x²/2! + x⁴/4! − ...` (even powers, alternating!). 4) `1/(1 − x) = 1 + x + x² + x³ + ...` for `|x| < 1`. Look how `sin x ≈ x` for tiny angles pops right out of term #1!" },
        { label: "Step 3: Ratio Test & Radius of Convergence `R`", text: "Does a series settle down to a finite answer or blow up? Compute `L = lim |a_(n+1) / a_n|` as `n → ∞`: if `L < 1` it **converges**, if `L > 1` it **diverges**, if `L = 1` the test is inconclusive. `e^x, sin x, cos x` converge for ALL real `x` (`R = ∞`), while `1/(1−x)` only works inside `|x| < 1` (`R = 1`)." },
        { label: "Step 4: L'Hôpital's Rule (`0/0` & `∞/∞` Rescuer)", text: "When a limit plugs in to indeterminate `0/0` or `∞/∞`, race the top and bottom derivatives: `lim f(x)/g(x) = lim f'(x)/g'(x)`! Example: `lim_(x→0) (sin x)/x` is `0/0`, so differentiate top & bottom → `lim (cos x)/1 = 1`! Never apply L'Hôpital if the limit is NOT `0/0` or `∞/∞`!" }
      ],
      cheatCode: "Taylor: Σ f^(n)(a)/n! (x−a)^n. e^x = Σ x^n/n!; sin x = x−x³/3!+x⁵/5!; cos x = 1−x²/2!+x⁴/4!. Ratio Test: L<1 converges. L'Hôpital: ONLY for 0/0 or ∞/∞!",
      visualizerId: "calculusSurferLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Which polynomial is the 3rd-degree Maclaurin approximation for `sin(x)` near `x = 0`?", options: ["x − x³/6", "1 − x²/2", "x + x³/6", "1 + x + x²/2 + x³/6"], answer: "x − x³/6", hint: "`sin(x)` is an ODD function with alternating signs and `3! = 6`!", whyEasy: "`sin(x) = x − x³/3! + x⁵/5! − ... = x − x³/6 + ...`!" },
        { type: "mc", prompt: "Evaluate `lim_(x→0) (e^x − 1) / x` using L'Hôpital's Rule or the Maclaurin series of `e^x`.", options: ["1", "0", "e", "∞"], answer: "1", hint: "Plugging `x = 0` gives `0/0` — differentiate numerator and denominator!", whyEasy: "`d/dx(e^x − 1) = e^x` and `d/dx(x) = 1`, so at `x = 0` it gives `e^0 / 1 = 1`!" },
        { type: "mc", prompt: "What is the exact sum of the infinite series `1 + 1 + 1/2! + 1/3! + 1/4! + ...`?", options: ["e (≈ 2.71828)", "2", "π", "Diverges to ∞"], answer: "e (≈ 2.71828)", hint: "Compare with the Maclaurin series `e^x = Σ x^n / n!` at `x = 1`!", whyEasy: "Plugging `x = 1` into `e^x = 1 + x + x²/2! + x³/3! + ...` produces `e^1 = e`!" },
        { type: "mc", prompt: "For which values of `x` does the geometric power series `1 + x + x² + x³ + ... = 1/(1 − x)` converge?", options: ["|x| < 1 (Radius of convergence R = 1)", "All real numbers (−∞, ∞)", "|x| ≤ 1 (including x = 1)", "x > 0 only"], answer: "|x| < 1 (Radius of convergence R = 1)", hint: "Remember infinite geometric series need `|r| < 1`!", whyEasy: "At `x = 1` or `x = −1`, terms don't shrink to 0, so it converges strictly on `(−1, 1)`!" },
        { type: "mc", prompt: "Why is it WRONG to apply L'Hôpital's Rule to `lim_(x→0) (cos x) / (x + 1)`?", options: ["It is NOT an indeterminate 0/0 or ∞/∞ form — direct substitution already gives 1/1 = 1!", "cos(x) has no derivative", "L'Hôpital only works as x → ∞", "The denominator must be x²"], answer: "It is NOT an indeterminate 0/0 or ∞/∞ form — direct substitution already gives 1/1 = 1!", hint: "Always plug in first before differentiating!", whyEasy: "At `x = 0`, `cos(0)/(0+1) = 1/1 = 1`. Blindly differentiating would wrongly give `−sin(0)/1 = 0`!" }
      ]
    },
    {
      id: "math-differential-equations-models",
      worldId: "college",
      order: 227,
      title: "Differential Equations: Cooling, Logistic & 2nd-Order ODEs",
      icon: "📈",
      tagline: "Turn 'how fast something changes' into exact future predictions — from cooling coffee to population ceilings & damped springs!",
      scaryVersion: "First-order separable and linear integrating-factor ODEs, logistic dynamics, and second-order constant-coefficient characteristic equations.",
      easyTruth: "Algebra solves for a hidden *number* `x`; a **Differential Equation (ODE)** solves for a hidden *function* `y(t)` when nature only tells you the rule for its *rate of change* `dy/dt`! Whether it's hot coffee cooling to room temperature, a virus hitting herd saturation, or car shock absorbers stopping bounce, the same 3 ODE templates solve them all!",
      microSteps: [
        { label: "Step 1: Separable ODEs & Exponential / Cooling Models", text: "When `dy/dt = f(t)·g(y)`, separate `y` on the left and `t` on the right, then integrate both sides! Growth/Decay `dy/dt = ky` solves to `y(t) = y₀ e^(kt)`. **Newton's Law of Cooling** `dT/dt = −k(T − T_env)` shifts the asymptote to room temp: `T(t) = T_env + (T₀ − T_env)e^(−kt)`!" },
        { label: "Step 2: Logistic Growth (Nature's Speed Limit `K`)", text: "Real populations can't grow forever. The **Logistic ODE** `dP/dt = rP(1 − P/K)` starts exponential when `P ≪ K`, slows down as `P → K` (carrying capacity), and grows FASTEST right at the midpoint **`P = K/2`**! Solution: `P(t) = K / (1 + A e^(−rt))`." },
        { label: "Step 3: 1st-Order Linear ODEs & Integrating Factor `μ(x)`", text: "For `y' + P(x)y = Q(x)`, you can't separate `y` directly. Multiply the whole equation by the magic **Integrating Factor** `μ(x) = e^(∫ P(x) dx)`! Suddenly the left side collapses into a clean product-rule derivative `(μ(x)·y)' = μ(x)Q(x)` — integrate once and divide by `μ(x)`!" },
        { label: "Step 4: 2nd-Order Constant-Coefficient ODEs (`ay'' + by' + cy = 0`)", text: "Guess `y = e^(rt)` and plug it in to get the algebraic **Characteristic Equation** `ar² + br + c = 0`! Check the discriminant `Δ = b² − 4ac`: `Δ > 0` → real roots `C₁e^(r₁t) + C₂e^(r₂t)` (overdamped); `Δ = 0` → repeated root `(C₁ + C₂t)e^(rt)` (critically damped); `Δ < 0` → complex roots `α ± βi` giving damped waves `e^(αt)(C₁ cos βt + C₂ sin βt)`!" }
      ],
      cheatCode: "Cooling: T(t)=T_env+(T₀−T_env)e^(−kt). Logistic dP/dt=rP(1−P/K): max growth at P=K/2. Linear y'+Py=Q: μ=e^(∫Pdx). 2nd-order: ar²+br+c=0 (Δ<0 → sines/cosines!).",
      visualizerId: "calculusSurferLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "In the Logistic Growth equation `dP/dt = rP(1 − P/K)` with carrying capacity `K = 1000`, at what population `P` is the growth rate `dP/dt` MAXIMUM?", options: ["P = 500 (half the carrying capacity, K/2!)", "P = 1000", "P = 100", "P = 0"], answer: "P = 500 (half the carrying capacity, K/2!)", hint: "`P(1 − P/K)` is a downward parabola with roots at `P = 0` and `P = K` — where is its vertex?", whyEasy: "The vertex of `P(K − P)` sits dead center at `P = K/2 = 500`!" },
        { type: "mc", prompt: "What is the Integrating Factor `μ(x)` for the linear first-order ODE `y' + 3y = 6`?", options: ["e^(3x)", "3x", "e^(6x)", "e^(−3x)"], answer: "e^(3x)", hint: "For `y' + P(x)y = Q(x)`, compute `μ(x) = e^(∫ P(x) dx)`!", whyEasy: "Here `P(x) = 3`, so `∫ 3 dx = 3x`, giving `μ(x) = e^(3x)`!" },
        { type: "mc", prompt: "What is the general solution of the 2nd-order ODE `y'' + 9y = 0`?", options: ["y = C₁ cos(3t) + C₂ sin(3t)", "y = C₁ e^(3t) + C₂ e^(−3t)", "y = C₁ e^(9t) + C₂", "y = (C₁ + C₂t) e^(3t)"], answer: "y = C₁ cos(3t) + C₂ sin(3t)", hint: "Solve the characteristic equation `r² + 9 = 0`!", whyEasy: "`r² = −9 → r = ±3i` (pure imaginary), which produces pure oscillations `C₁ cos(3t) + C₂ sin(3t)`!" },
        { type: "mc", prompt: "A cup of coffee at `90°C` sits in a `20°C` room (`T(t) = 20 + 70 e^(−kt)`). What temperature does it approach as `t → ∞`?", options: ["20°C (room temperature equilibrium)", "0°C", "55°C", "70°C"], answer: "20°C (room temperature equilibrium)", hint: "As `t → ∞`, `e^(−kt) → 0`!", whyEasy: "`70 e^(−kt) → 0`, leaving `T → 20°C` — thermal equilibrium with the room!" },
        { type: "mc", prompt: "Solve the characteristic equation `r² − 5r + 6 = 0` to find the general solution of `y'' − 5y' + 6y = 0`.", options: ["y = C₁ e^(2t) + C₂ e^(3t)", "y = C₁ e^(−2t) + C₂ e^(−3t)", "y = C₁ cos(2t) + C₂ sin(3t)", "y = (C₁ + C₂t) e^(6t)"], answer: "y = C₁ e^(2t) + C₂ e^(3t)", hint: "Factor `r² − 5r + 6 = (r − 2)(r − 3) = 0`!", whyEasy: "Distinct real roots `r = 2` and `r = 3` immediately give `y = C₁ e^(2t) + C₂ e^(3t)`!" }
      ]
    },
    {
      id: "math-eigenvalues-svd-orthogonality",
      worldId: "college",
      order: 228,
      title: "Eigenvalues, Eigenvectors & Orthogonal Projections",
      icon: "🧭",
      tagline: "Find the 'un-rotated compass axes' of any matrix (`Av = λv`) — powering Google PageRank, PCA data compression & quantum states!",
      scaryVersion: "Characteristic polynomial det(A − λI) = 0, spectral diagonalization A = PDP⁻¹, trace/determinant invariants, and orthogonal projection.",
      easyTruth: "When a matrix `A` multiplies most vectors, it both spins and stretches them. **Eigenvectors** are the rare magic arrows that NEVER change direction — the matrix only scales them by a number `λ` (the **eigenvalue**): `Av = λv`! Once you know those special axes, computing `A^100` becomes as easy as raising plain numbers `λ^100`!",
      microSteps: [
        { label: "Step 1: The Eigen-Equation & Characteristic Polynomial", text: "`Av = λv` rearranges to `(A − λI)v = 0`. For a non-zero eigenvector `v` to exist, `(A − λI)` must squish space flat — meaning **`det(A − λI) = 0`**! For a 2×2 matrix, this gives the super-fast quadratic **`λ² − Tr(A)·λ + det(A) = 0`**!" },
        { label: "Step 2: Trace & Determinant Instant Sanity Checks", text: "You don't even have to guess if your eigenvalues are right — TWO invariants ALWAYS hold: **Sum of eigenvalues = Trace** (`λ₁ + λ₂ = a + d`, diagonal sum!) and **Product of eigenvalues = Determinant** (`λ₁ · λ₂ = ad − bc`)! Bonus: a matrix is singular (non-invertible) IF AND ONLY IF `λ = 0` is an eigenvalue!" },
        { label: "Step 3: Diagonalization (`A = P D P⁻¹` & Fast Powers)", text: "If an `n×n` matrix has `n` independent eigenvectors (columns of `P`) and eigenvalues on diagonal matrix `D`, then `A = P D P⁻¹`. Want `A^10`? The middle `P⁻¹ P` pairs cancel like dominoes: **`A^k = P D^k P⁻¹`**, where `D^k` just raises each diagonal eigenvalue to the `k`-th power!" },
        { label: "Step 4: Orthogonal Projections & Shadow Formula", text: "Two vectors are **orthogonal** (perpendicular) when `u · v = 0`. To drop the straight-down shadow of vector `v` onto direction `u`, use **`proj_u(v) = [(v · u) / (u · u)] u`**! The error piece `v − proj_u(v)` is automatically perpendicular to `u` — the exact geometry behind Least-Squares Regression!" }
      ],
      cheatCode: "Av = λv; det(A − λI) = 0. 2×2 shortcut: λ₁+λ₂ = Trace, λ₁·λ₂ = det(A). A^k = P D^k P⁻¹. Projection: proj_u(v) = ((v·u)/(u·u)) u!",
      visualizerId: "geometryLogicLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "A 2×2 matrix `A` has Trace = `7` and Determinant = `12`. What are its two eigenvalues?", options: ["λ = 3 and λ = 4", "λ = 2 and λ = 6", "λ = 1 and λ = 12", "λ = −3 and λ = −4"], answer: "λ = 3 and λ = 4", hint: "Find two numbers whose SUM is `7` (Trace) and PRODUCT is `12` (Determinant)!", whyEasy: "`3 + 4 = 7` and `3 × 4 = 12` — instantaneous without writing a single matrix determinant!" },
        { type: "mc", prompt: "What are the eigenvalues of the triangular matrix `[[5, 9], [0, −2]]`?", options: ["5 and −2 (just the main diagonal!)", "5 and 9", "0 and −2", "3 and −10"], answer: "5 and −2 (just the main diagonal!)", hint: "For any triangular or diagonal matrix, `det(A − λI) = (5 − λ)(−2 − λ)`!", whyEasy: "Eigenvalues of ANY triangular matrix sit right on its main diagonal: `5` and `−2`!" },
        { type: "mc", prompt: "If `v` is an eigenvector of `A` with eigenvalue `λ = 3`, what is `A² v`?", options: ["9v (λ²v = 3²v)", "6v", "3v", "v + 9"], answer: "9v (λ²v = 3²v)", hint: "Apply `A` twice: `A(Av) = A(3v) = 3(Av)`!", whyEasy: "Each application multiplies `v` by `3`, so twice multiplies by `3² = 9`!" },
        { type: "mc", prompt: "Compute the orthogonal projection `proj_u(v)` of `v = (4, 2)` onto `u = (1, 0)`.", options: ["(4, 0)", "(0, 2)", "(2, 0)", "(4, 2)"], answer: "(4, 0)", hint: "Use `((v · u) / (u · u)) u` — or visualize dropping a shadow onto the x-axis!", whyEasy: "`v · u = 4`, `u · u = 1`, so `proj_u(v) = (4/1)(1, 0) = (4, 0)`!" },
        { type: "mc", prompt: "A square matrix `A` has `λ = 0` as one of its eigenvalues. What does this guarantee about `A`?", options: ["det(A) = 0, so A is singular (NOT invertible!)", "A must be the zero matrix", "A is orthogonal", "A has no trace"], answer: "det(A) = 0, so A is singular (NOT invertible!)", hint: "Recall `det(A) = λ₁ · λ₂ · ... · λ_n`!", whyEasy: "If any eigenvalue is `0`, the product `det(A) = 0`, meaning `A` squishes at least one direction to zero and cannot be inverted!" }
      ]
    },
    {
      id: "math-vector-calculus-grad-div-curl",
      worldId: "college",
      order: 229,
      title: "Vector Calculus: Gradient ∇f, Divergence ∇·F & Curl ∇×F",
      icon: "🌊",
      tagline: "Read the language of hills, fluid faucets & whirlpools — the exact operators powering Maxwell's Equations & fluid physics!",
      scaryVersion: "Gradient vector fields, directional derivatives, divergence, curl, and the fundamental integral theorems of Green, Gauss, and Stokes.",
      easyTruth: "Meet `∇` ('del'), the Swiss-Army knife of 3D calculus: `(∂/∂x, ∂/∂y, ∂/∂z)`. Apply `∇` to a mountain-height map `f` and you get **Gradient** (steepest uphill arrow). Dot `∇ · F` with flowing water and you get **Divergence** (is this spot a faucet or a drain?). Cross `∇ × F` with flowing water and you get **Curl** (how fast does a tiny paddlewheel spin here?)!",
      microSteps: [
        { label: "Step 1: Gradient `∇f` & Directional Derivative `D_u f`", text: "For a scalar field `f(x, y, z)`, the gradient is the vector of partial derivatives: `∇f = (∂f/∂x, ∂f/∂y, ∂f/∂z)`. It ALWAYS points in the direction of **steepest ascent**, perpendicular to level contours! Along any unit direction `u`, the slope is `D_u f = ∇f · u = |∇f| cos θ` (maximum rate = `|∇f|`)." },
        { label: "Step 2: Divergence `∇ · F` (Faucets vs Drains — a Scalar!)", text: "For a vector field `F = (P, Q, R)`, divergence is the dot product `∇ · F = ∂P/∂x + ∂Q/∂y + ∂R/∂z` (returns a single **number**!). Positive (`> 0`) = net outflow (a source/faucet); Negative (`< 0`) = net inflow (a sink/drain); Zero (`= 0`) = incompressible fluid (or magnetic field `∇ · B = 0` — no magnetic monopoles!)." },
        { label: "Step 3: Curl `∇ × F` (Whirlpool Spin — a Vector!)", text: "Curl measures local rotation (swirl) of a vector field: in 2D, scalar curl is `∂Q/∂x − ∂P/∂y`; in 3D it is the determinant cross product `∇ × F`. If `∇ × F = 0` everywhere (irrotational / conservative field like gravity), work along a loop is ZERO and `F = ∇f` for some potential energy `f`!" },
        { label: "Step 4: The Big 3 Unifying Theorems (Green, Stokes & Gauss)", text: "All three generalize the Fundamental Theorem of Calculus (`boundary = interior sum`)! **Green's Theorem**: 2D loop work `∮ (P dx + Q dy) = ∬ (∂Q/∂x − ∂P/∂y) dA`. **Stokes' Theorem**: 3D loop circulation `∮ F · dr = ∬ (∇ × F) · dS`. **Divergence (Gauss) Theorem**: total flux out of a closed 3D shell `∬ F · dS = ∭ (∇ · F) dV`!" }
      ],
      cheatCode: "Gradient ∇f = steepest uphill (D_u f = ∇f·u). Divergence ∇·F = ∂P/∂x+∂Q/∂y+∂R/∂z (scalar: source/sink). Curl ∇×F (vector: spin; =0 for conservative). Gauss: ∬F·dS = ∭(∇·F)dV!",
      visualizerId: "geometryLogicLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Find the gradient `∇f` of the scalar field `f(x, y) = x²y + 3y` at the point `(2, 1)`.", options: ["(4, 7)", "(2, 5)", "(4, 3)", "(7, 4)"], answer: "(4, 7)", hint: "Compute `∂f/∂x = 2xy` and `∂f/∂y = x² + 3`, then plug in `x = 2, y = 1`!", whyEasy: "`∂f/∂x = 2(2)(1) = 4` and `∂f/∂y = 2² + 3 = 7` → `∇f(2, 1) = (4, 7)`!" },
        { type: "input", prompt: "Compute the divergence `∇ · F` of the 3D vector field `F(x, y, z) = (3x, −2y, 5z)`.", answer: "6", hint: "Add the three partial derivatives `∂P/∂x + ∂Q/∂y + ∂R/∂z`!", whyEasy: "`3 + (−2) + 5 = 6` (a constant positive source everywhere)!" },
        { type: "mc", prompt: "In 2D, what is the scalar curl (`∂Q/∂x − ∂P/∂y`) of the pure rotation field `F(x, y) = (−y, x)`?", options: ["+2 (constant counterclockwise spin!)", "0 (irrotational)", "−2", "x + y"], answer: "+2 (constant counterclockwise spin!)", hint: "`P = −y` and `Q = x`, so compute `∂(x)/∂x − ∂(−y)/∂y`!", whyEasy: "`1 − (−1) = +2` — a tiny paddlewheel spins counterclockwise everywhere!" },
        { type: "mc", prompt: "What geometric direction does the gradient vector `∇f` ALWAYS point at any point on a contour map?", options: ["Direction of steepest UPHILL increase, perpendicular to the level curve", "Tangent (parallel) along the flat contour line", "Straight downhill toward the minimum", "Always along the positive x-axis"], answer: "Direction of steepest UPHILL increase, perpendicular to the level curve", hint: "`D_u f = |∇f| cos θ` is maximized when `θ = 0°`!", whyEasy: "Steepest ascent runs straight across elevation rings (`⊥` to contours) in the direction of `∇f`!" },
        { type: "mc", prompt: "Which famous theorem converts total fluid flux escaping through a closed 3D surface into a triple integral of divergence inside the volume (`∬ F · dS = ∭ (∇ · F) dV`)?", options: ["Divergence Theorem (Gauss's Theorem)", "Pythagorean Theorem", "Mean Value Theorem", "Fermat's Little Theorem"], answer: "Divergence Theorem (Gauss's Theorem)", hint: "Total outflow through the boundary surface = sum of all faucets minus drains inside!", whyEasy: "Gauss's Divergence Theorem links boundary flux (`∬ F · dS`) directly to interior divergence (`∭ ∇·F dV`)!" }
      ]
    },
    {
      id: "math-probability-distributions-clt",
      worldId: "college",
      order: 230,
      title: "Probability Distributions: Binomial, Poisson & Central Limit",
      icon: "🎲",
      tagline: "Count coin-flip successes, model rare lightning strikes & discover why averages ALWAYS morph into a Bell Curve!",
      scaryVersion: "Discrete Binomial, Geometric, and Poisson probability mass functions, expected value/variance linearity, and the Central Limit Theorem.",
      easyTruth: "Not all randomness wears the same outfit! Counting heads in `n` fixed tries? **Binomial**. Counting random calls arriving per hour with no upper cap? **Poisson**. Waiting until your very first win? **Geometric**. And the jaw-dropping **Central Limit Theorem** says: average enough samples from *almost ANY* weird distribution, and the averages magically form a clean Bell Curve!",
      microSteps: [
        { label: "Step 1: Binomial Distribution (`n` fixed trials, prob `p`)", text: "Probability of exactly `k` successes in `n` independent trials: `P(X = k) = C(n, k) p^k (1 − p)^(n − k)`. Super-clean summary stats: **Mean `μ = np`** and **Variance `σ² = np(1 − p)`** (Standard Deviation `σ = √(np(1−p))`). Example: 100 fair coin flips → `μ = 50`, `σ = √25 = 5`!" },
        { label: "Step 2: Geometric & Poisson Distributions", text: "**Geometric** (trials until 1st success): `P(X = k) = (1 − p)^(k−1) p`, with average wait **`E[X] = 1/p`** (rolling a 6 on a die takes `1/(1/6) = 6` rolls on average!). **Poisson** (rare events at average rate `λ` per interval): `P(X = k) = (λ^k e^(−λ)) / k!`, where BOTH Mean and Variance equal **`λ`**!" },
        { label: "Step 3: Expected Value & Variance Algebra", text: "Expectation is always linear: `E[aX + bY] = aE[X] + bE[Y]`. For **independent** variables, variances ADD (never subtract!) and constants square out: **`Var(aX + b) = a² Var(X)`** and **`Var(X ± Y) = Var(X) + Var(Y)`**! Remember: `Var(X) = E[X²] − (E[X])²`." },
        { label: "Step 4: Central Limit Theorem (CLT) & Standard Error", text: "Take sample mean `x̄` of `n` independent draws (typically `n ≥ 30`) from a population with mean `μ` and SD `σ`. Then `x̄` is approximately Normal with mean `μ` and **Standard Error `SE = σ / √n`**! Notice the `√n` law: to cut sampling error in HALF, you must collect **`4×`** as much data!" }
      ],
      cheatCode: "Binomial: C(n,k)p^k(1−p)^(n−k), μ=np, σ²=npq. Geometric: E[X]=1/p. Poisson: λ^k e^(−λ)/k! (μ=σ²=λ). CLT Standard Error: SE = σ/√n (4× data → ½ error)!",
      visualizerId: "fractionPizzaLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "A fair coin is flipped `n = 64` times (`p = 0.5`). What are the Binomial mean `μ` and standard deviation `σ`?", options: ["μ = 32, σ = 4", "μ = 32, σ = 16", "μ = 64, σ = 8", "μ = 16, σ = 4"], answer: "μ = 32, σ = 4", hint: "Compute `μ = np` and `σ = √(np(1 − p))`!", whyEasy: "`μ = 64(0.5) = 32`, `σ² = 64(0.5)(0.5) = 16`, so `σ = √16 = 4`!" },
        { type: "mc", prompt: "A bakery gets an average of `λ = 3` walk-in orders per hour (Poisson). What is `P(X = 0)` — zero orders in an hour?", options: ["e^(−3)", "3 e^(−3)", "0", "1 − e^(−3)"], answer: "e^(−3)", hint: "Plug `k = 0` and `λ = 3` into `P(X = k) = λ^k e^(−λ) / k!` (recall `0! = 1`)!", whyEasy: "`3^0 · e^(−3) / 0! = 1 · e^(−3) / 1 = e^(−3) ≈ 0.0498` (about 5%)!" },
        { type: "input", prompt: "A population has standard deviation `σ = 20`. What is the Standard Error `SE = σ / √n` of the sample mean for `n = 100` samples?", answer: "2", hint: "Divide `σ = 20` by `√100 = 10`!", whyEasy: "`SE = 20 / √100 = 20 / 10 = 2`!" },
        { type: "mc", prompt: "In a Geometric process where each gacha pull has a `5%` (`p = 0.05`) chance of success, what is the expected number of pulls `E[X]` until your first win?", options: ["20 pulls (1 / 0.05)", "5 pulls", "50 pulls", "10 pulls"], answer: "20 pulls (1 / 0.05)", hint: "Use `E[X] = 1/p`!", whyEasy: "`1 / 0.05 = 1 / (1/20) = 20` pulls on average!" },
        { type: "mc", prompt: "If `X` has variance `Var(X) = 5`, what is `Var(3X + 10)`?", options: ["45 (3² × 5 — shifting by +10 adds zero spread!)", "25", "15", "55"], answer: "45 (3² × 5 — shifting by +10 adds zero spread!)", hint: "Use `Var(aX + b) = a² Var(X)`!", whyEasy: "Adding `10` shifts every number equally without widening spread; multiplying by `3` scales variance by `3² = 9` → `9 × 5 = 45`!" }
      ]
    },

    // ---------- PHYSICS (+7 NODES: 231–237) ----------
    {
      id: "physics-wave-optics-interference-diffraction",
      worldId: "physics",
      order: 231,
      title: "Wave Optics: Double-Slit, Diffraction, Thin Films & Polarization",
      icon: "🌈",
      tagline: "Why soap bubbles shimmer in rainbows, how polarized sunglasses kill glare & how Young proved light is a wave!",
      scaryVersion: "Young's double-slit interference, single-slit Fraunhofer diffraction, Rayleigh resolution, thin-film phase inversion, Brewster's angle, and Malus's law.",
      easyTruth: "Rays work great for mirrors and lenses — until light squeezes through tiny slits or bounces off a microscopic soap bubble! Then light reveals its wave soul: crests add to crests (bright bands), crests cancel troughs (pitch-black bands), and sunglasses block glare by filtering light's electric-field vibration direction!",
      microSteps: [
        { label: "Step 1: Young's Double-Slit Interference (`d sin θ = mλ`)", text: "Light passing through two slits spaced by `d` creates bright fringes where path difference equals whole wavelengths: **`d sin θ = mλ`** (`m = 0, ±1, ±2...`), and dark bands at **`(m + ½)λ`**. On a far screen at distance `L`, fringe spacing is **`Δy = λL / d`** — notice *narrower* slit gap `d` spreads fringes *WIDER* apart!" },
        { label: "Step 2: Single-Slit Diffraction & Rayleigh Resolution", text: "Even ONE narrow slit of width `a` bends light into a wide central bright band bordered by DARK minima at **`a sin θ = mλ`** (`m = ±1, ±2...` — notice `m = 0` is BRIGHT, not dark!). For circular telescopes/pupils of diameter `D`, **Rayleigh's Criterion** sets the sharpest resolvable angle: **`θ_min = 1.22 λ / D`** (bigger mirror `D` = sharper stars!)." },
        { label: "Step 3: Thin-Film Interference (Soap Bubbles & Anti-Glare)", text: "Light reflecting off a thin film (index `n`, thickness `t`) travels an extra round-trip distance `2nt`. Crucial twist: bouncing off a HIGHER-index medium (`n₁ < n₂`, like air → glass/water) flips the wave upside-down (a **`½λ` phase shift**)! With 1 phase flip, constructive reflection needs **`2nt = (m + ½)λ`**." },
        { label: "Step 4: Polarization — Malus's Law & Brewster's Angle", text: "Unpolarized light passing through a first polarizer loses **50%** (`I₁ = ½ I₀`). Passing through a second polarizer tilted at angle `θ` obeys **Malus's Law**: **`I = I₁ cos²θ`** (`θ = 90°` blocks 100%!). Reflected glare becomes 100% horizontally polarized at **Brewster's Angle**: **`tan θ_B = n₂ / n₁`**!" }
      ],
      cheatCode: "Double-slit bright: d sin θ = mλ (Δy = λL/d). Single-slit DARK: a sin θ = mλ. Rayleigh: θ_min = 1.22λ/D. Malus: I = I₀ cos²θ. Brewster: tan θ_B = n₂/n₁!",
      visualizerId: "opticsConcaveConvexLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "In Young's double-slit experiment (`Δy = λL / d`), what happens to the fringe spacing `Δy` if you CUT the slit separation `d` in HALF?", options: ["Fringe spacing DOUBLES (2× wider!)", "Fringe spacing cuts in half", "Fringe spacing stays unchanged", "Fringes disappear completely"], answer: "Fringe spacing DOUBLES (2× wider!)", hint: "Check where `d` sits in `Δy = λL / d`!", whyEasy: "`d` is in the denominator — narrower slits spread wave interference patterns wider!" },
        { type: "mc", prompt: "Vertically polarized light of intensity `I₀ = 100 W/m²` hits a polarizer tilted at `θ = 60°`. What intensity emerges (Malus's Law `I = I₀ cos²θ`)?", options: ["25 W/m² (cos 60° = 0.5 → 0.5² = 0.25)", "50 W/m²", "75 W/m²", "0 W/m²"], answer: "25 W/m² (cos 60° = 0.5 → 0.5² = 0.25)", hint: "Don't forget to SQUARE `cos 60° = 1/2`!", whyEasy: "`I = 100 × (1/2)² = 100 × 0.25 = 25 W/m²`!" },
        { type: "mc", prompt: "Why do giant space telescopes like JWST build wider mirrors (`D ↑`) according to Rayleigh's Criterion `θ_min = 1.22 λ / D`?", options: ["Larger diameter D makes θ_min SMALLER, resolving finer details and closer stars!", "Larger D makes diffraction blurrier", "Larger D increases wavelength λ", "Mirror size does not affect resolution"], answer: "Larger diameter D makes θ_min SMALLER, resolving finer details and closer stars!", hint: "A smaller minimum resolvable angle `θ_min` means sharper vision!", whyEasy: "Bigger aperture `D` in the denominator shrinks diffraction blur `θ_min`!" },
        { type: "mc", prompt: "Unpolarized sunlight of intensity `I₀ = 80 W/m²` passes through ONE ideal linear polarizer. What intensity gets through?", options: ["40 W/m² (always exactly 1/2!)", "80 W/m²", "20 W/m²", "0 W/m²"], answer: "40 W/m² (always exactly 1/2!)", hint: "The average of `cos²θ` over all random polarization angles is `1/2`!", whyEasy: "Any first ideal polarizer trims unpolarized light to exactly `50%` → `40 W/m²`!" },
        { type: "mc", prompt: "When a light wave traveling in air (`n = 1.0`) reflects off glass (`n = 1.5`), what phase change happens at the reflection boundary?", options: ["A 180° (½λ) phase inversion (fast → slow reflection flips!)", "Zero phase change", "A 90° phase shift", "Its frequency doubles"], answer: "A 180° (½λ) phase inversion (fast → slow reflection flips!)", hint: "Think of a rope wave bouncing off a fixed brick wall!", whyEasy: "Reflecting from low `n` off high `n` always flips the wave by `180°` (`½λ`)!" }
      ]
    },
    {
      id: "physics-elasticity-stress-strain-materials",
      worldId: "physics",
      order: 232,
      title: "Elasticity, Stress, Strain, Young's Modulus & Thermal Expansion",
      icon: "🏗️",
      tagline: "Why steel cables stretch cleanly, why bridges need expansion gaps & how σ = Eε builds skyscrapers!",
      scaryVersion: "Tensile stress, strain, Young's, Shear, and Bulk moduli, elastic strain energy density, and linear/volumetric thermal expansion.",
      easyTruth: "Nothing in the real world is truly rigid — even solid steel behaves like an ultra-stiff microscopic spring! Instead of tracking a single spring constant `k` that changes with wire length, engineers normalize force per area (**Stress `σ`**) and fractional stretch (**Strain `ε`**) so every material gets one universal stiffness DNA number: **Young's Modulus `E`**!",
      microSteps: [
        { label: "Step 1: Stress (`σ = F/A`) & Strain (`ε = ΔL/L₀`)", text: "**Stress** `σ = F / A` (in Pascals, `N/m²`) measures how tightly pulling force is packed into cross-sectional area `A`. **Strain** `ε = ΔL / L₀` is unitless fractional stretch (e.g., `0.001` = 0.1% stretch). Pulling twice as hard on twice the area gives the exact same stress!" },
        { label: "Step 2: Young's Modulus (`E = σ / ε`) & Stretch Formula", text: "In the elastic region, stress is proportional to strain: **`E = σ / ε = (F · L₀) / (A · ΔL)`**, giving stretch **`ΔL = (F L₀) / (E A)`**! Higher `E` = stiffer material (steel `~200 GPa` vs rubber `~0.01 GPa`). Shear Modulus `G` handles sideways scissor-force; Bulk Modulus `B = −ΔP / (ΔV/V₀)` handles 3D underwater squeezing!" },
        { label: "Step 3: Elastic Energy Density (`u = ½ σ ε`)", text: "Just like a spring stores `U = ½ k x²`, a stretched rod stores elastic energy per unit volume equal to the triangle under the stress–strain graph: **`u = ½ σ ε = ½ E ε² = σ² / (2E)`** (in `J/m³`). Past the Yield Strength, the metal bends permanently (plastic deformation); past Ultimate Strength, it snaps!" },
        { label: "Step 4: Thermal Expansion (`ΔL = α L₀ ΔT` & `β ≈ 3α`)", text: "Heating makes atoms jiggle wider, expanding every dimension: **`ΔL = α L₀ ΔT`** (length), **`ΔA ≈ 2α A₀ ΔT`** (area), and **`ΔV = β V₀ ΔT`** where **`β ≈ 3α`** (volume)! Fun puzzle: heating a metal ring with a hole makes the **HOLE get BIGGER**, just like zooming a photograph!" }
      ],
      cheatCode: "σ = F/A (Pa), ε = ΔL/L₀ (unitless), E = σ/ε → ΔL = FL₀/(EA). Energy density u = ½σε. Thermal: ΔL = αL₀ΔT, ΔV = 3αV₀ΔT (holes expand too!).",
      visualizerId: "physicsCircuitAndMotionLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "A steel cable stretches by `2 mm` under load `F`. If you replace it with a steel cable of the **same length** but **2× the cross-sectional area** (`A → 2A`), how much does it stretch under the same load `F`?", options: ["1 mm (half the stretch — ΔL = FL₀/(EA)!)", "4 mm", "2 mm", "0.5 mm"], answer: "1 mm (half the stretch — ΔL = FL₀/(EA)!)", hint: "Check `A` in the denominator of `ΔL = F L₀ / (E A)`!", whyEasy: "Doubling area cuts stress in half, so the stretch cuts cleanly in half: `2 mm / 2 = 1 mm`!" },
        { type: "input", prompt: "A rod of cross-section `A = 0.01 m²` carries a tension force `F = 500 N`. What is the tensile stress `σ = F/A` in Pascals (`Pa`)?", answer: "50000", hint: "Divide `500` by `0.01` (same as multiplying by 100)!", whyEasy: "`σ = 500 / 0.01 = 50,000 Pa` (`50 kPa`)!" },
        { type: "mc", prompt: "You heat a flat brass washer (a disk with a circular hole in the center) evenly in an oven. What happens to the diameter of the HOLE?", options: ["The hole EXPANDS (grows larger at the exact same rate α!)", "The hole shrinks as metal expands inward", "The hole stays the exact same size", "The hole turns elliptical"], answer: "The hole EXPANDS (grows larger at the exact same rate α!)", hint: "Thermal expansion scales every distance uniformly like zooming in on a photo!", whyEasy: "Think of the ring as a solid disk with the center painted black — when the whole disk expands uniformly, the hole grows bigger too!" },
        { type: "mc", prompt: "If an isotropic metal has linear thermal expansion coefficient `α = 1.2 × 10⁻⁵ /°C`, what is its approximate volume expansion coefficient `β`?", options: ["3.6 × 10⁻⁵ /°C (β ≈ 3α!)", "1.2 × 10⁻⁵ /°C", "2.4 × 10⁻⁵ /°C", "1.44 × 10⁻¹⁰ /°C"], answer: "3.6 × 10⁻⁵ /°C (β ≈ 3α!)", hint: "Volume expands in all 3 dimensions (`x, y, z`), so `β ≈ 3α`!", whyEasy: "`3 × 1.2 × 10⁻⁵ = 3.6 × 10⁻⁵ /°C`!" },
        { type: "mc", prompt: "What are the SI units of Strain `ε = ΔL / L₀` and Young's Modulus `E = σ / ε`?", options: ["Strain is dimensionless (no units); Young's Modulus is Pascals (N/m²)", "Strain is meters; Young's Modulus is Newtons", "Both are in Joules", "Strain is N/m²; Young's Modulus is dimensionless"], answer: "Strain is dimensionless (no units); Young's Modulus is Pascals (N/m²)", hint: "Meters divided by meters cancels out!", whyEasy: "`ΔL/L₀` cancels units completely, leaving `E = σ/ε` with the exact same units as pressure/stress (`Pa = N/m²`)!" }
      ]
    },
    {
      id: "physics-heat-transfer-radiation-blackbody",
      worldId: "physics",
      order: 233,
      title: "Heat Transfer: Conduction, Convection & Blackbody Radiation",
      icon: "🔥",
      tagline: "Fourier's conduction law, Stefan-Boltzmann T⁴ glow & Wien's Law — why blue flames are hotter than red embers!",
      scaryVersion: "Fourier's law of thermal conduction, thermal resistance networks, Stefan-Boltzmann radiative power, and Wien's displacement law.",
      easyTruth: "Heat has only three ways to travel: touching atom-to-atom (**Conduction**, like a metal spoon in hot soup), riding rising fluid currents (**Convection**, like sea breezes & boiling pots), and beaming electromagnetic light straight through empty space (**Radiation**, like the Sun warming Earth across 150 million km of vacuum — scaling with a jaw-dropping **`T⁴`**)!",
      microSteps: [
        { label: "Step 1: Fourier's Law of Thermal Conduction (`P = kAΔT / L`)", text: "Heat flow rate `P = Q/t` (in Watts = `J/s`) through a wall of thermal conductivity `k`, area `A`, thickness `L`, and temperature difference `ΔT` is **`P = k A ΔT / L`**. Metals have huge `k` (why tile feels colder than carpet at the exact same room temp — tile conducts heat out of your foot faster!). Thermal resistance is **`R = L / (kA)`**, and layered walls simply add `R_total = R₁ + R₂`!" },
        { label: "Step 2: Stefan-Boltzmann Law (`P = ε σ A T⁴`)", text: "EVERY warm object glows with electromagnetic radiation at power **`P = ε σ A T⁴`** (`σ = 5.67 × 10⁻⁸ W/(m²·K⁴)`, emissivity `ε ∈ [0, 1]`, and `T` MUST be in **Kelvin**!). Because of `T⁴`, **doubling Kelvin temperature increases radiated power by `2⁴ = 16×`**! Net heat loss in room temp `T_env` is `P_net = ε σ A (T⁴ − T_env⁴)`." },
        { label: "Step 3: Wien's Displacement Law (`λ_max · T = 2.898 × 10⁻³ m·K`)", text: "Hotter objects don't just glow brighter — they shift to **shorter, bluer wavelengths**: **`λ_max = b / T`** (`b ≈ 2.90 × 10⁻³ m·K`). Humans (`~310 K`) glow in invisible infrared (`~9.3 μm`, seen by thermal cameras!); the Sun (`~5800 K`) peaks right in yellow-green visible light (`~500 nm`); hot blue stars (`> 12,000 K`) peak in UV/blue!" },
        { label: "Step 4: Thermos Bottle Masterclass (Stopping All 3!)", text: "How does a vacuum thermos keep coffee hot for 12 hours? 1) **Vacuum gap** blocks Conduction & Convection (zero air molecules!). 2) **Mirror-silvered walls** have tiny emissivity `ε ≈ 0.02`, reflecting Radiation back inside! 3) **Plastic lid** has low `k` to slow conduction out the top!" }
      ],
      cheatCode: "Conduction: P = kAΔT/L (R = L/kA). Radiation: P = εσAT⁴ (T in Kelvin! 2×T → 16×P!). Wien: λ_max · T = 2.90×10⁻³ m·K (Hotter → Shorter/Bluer λ!).",
      visualizerId: "thermoPhaseLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "If a blackbody's absolute Kelvin temperature DOUBLES (`T → 2T`), what happens to its radiated power `P = εσAT⁴`?", options: ["Increases by 16× (2⁴ = 16!)", "Doubles (2×)", "Quadruples (4×)", "Increases by 8×"], answer: "Increases by 16× (2⁴ = 16!)", hint: "Temperature is raised to the FOURTH power!", whyEasy: "`(2T)⁴ = 16 T⁴` — Stefan-Boltzmann's `T⁴` scaling is explosive!" },
        { type: "mc", prompt: "According to Wien's Law (`λ_max · T = const`), if Star A is TWICE as hot (in Kelvin) as Star B, how does Star A's peak wavelength `λ_max` compare?", options: ["Half as long (bluer light!)", "Twice as long (redder light)", "Four times shorter", "Identical wavelength"], answer: "Half as long (bluer light!)", hint: "`λ_max` and `T` are inversely proportional!", whyEasy: "Double `T` → divide `λ_max` by 2 (shorter wavelength = shifted toward blue/UV)!" },
        { type: "mc", prompt: "In Fourier's Conduction Law `P = kAΔT / L`, doubling a wall's insulation thickness (`L → 2L`) does what to heat loss `P`?", options: ["Cuts heat loss in HALF (½P)", "Doubles heat loss (2P)", "Cuts heat loss to 1/4", "Has no effect"], answer: "Cuts heat loss in HALF (½P)", hint: "`L` is in the denominator — thicker barrier means longer path for heat!", whyEasy: "Doubling `L` doubles thermal resistance `R = L/(kA)`, halving heat loss!" },
        { type: "mc", prompt: "Why does a cold bathroom tile feel WAY colder on bare feet than a fluffy bathmat sitting right next to it at the EXACT same `22°C` room temperature?", options: ["Tile has much higher thermal conductivity k, draining heat out of your 37°C foot faster!", "Tile is actually 10°C colder than the room", "Tile emits cold radiation", "Tile has zero emissivity"], answer: "Tile has much higher thermal conductivity k, draining heat out of your 37°C foot faster!", hint: "Our nerves feel *heat flow rate* (`P = kAΔT/L`), not true temperature!", whyEasy: "Both sit at `22°C`, but high-`k` tile pulls heat out of your skin rapidly while air-trapping fabric insulates!" },
        { type: "input", prompt: "A metal bar (`k = 200 W/(m·K)`, `A = 0.01 m²`, `L = 0.5 m`) has `ΔT = 25 K` across its ends. Compute conduction power `P = kAΔT/L` in Watts.", answer: "100", hint: "Calculate `(200 × 0.01 × 25) / 0.5`!", whyEasy: "`200 × 0.01 = 2`; `2 × 25 = 50`; `50 / 0.5 = 100 W`!" }
      ]
    },
    {
      id: "physics-rc-rl-rlc-circuits-impedance",
      worldId: "physics",
      order: 234,
      title: "RC, RL & RLC Circuits: Time Constants, Impedance & Resonance",
      icon: "📻",
      tagline: "Master exponential charging (τ = RC), AC reactance (X_L, X_C), impedance Z & how radios lock onto one station!",
      scaryVersion: "First-order RC/RL transient exponential response, AC phasor reactance, complex impedance magnitude, and RLC resonant frequency.",
      easyTruth: "Resistors only waste power as heat, but Capacitors (`C`) and Inductors (`L`) give circuits **memory & rhythm**! A capacitor resists sudden voltage jumps (taking `τ = RC` seconds to charge), an inductor resists sudden current jumps (`τ = L/R`), and putting `L` and `C` together in AC creates a swing-set that hits peak **Resonance** at one exact frequency `f₀ = 1/(2π√(LC))` — literally how FM radios pick one station out of thin air!",
      microSteps: [
        { label: "Step 1: RC Charging & Discharging (`τ = RC`)", text: "The **Time Constant** `τ = R · C` (in seconds!) sets the pace. Charging from `0`: **`V_C(t) = V₀(1 − e^(−t/τ))`** and current decays **`I(t) = (V₀/R) e^(−t/τ)`**. After just **1 time constant (`t = τ`)**, a charging capacitor reaches **`1 − 1/e ≈ 63.2%`** of full voltage, and a discharging capacitor drops to **`1/e ≈ 36.8%`**! After `5τ`, it's `> 99.3%` done!" },
        { label: "Step 2: RL Circuits (`τ = L / R`)", text: "Inductors hate sudden current changes (Lenz's Law!). Its time constant is **`τ = L / R`** (notice `R` is in the *denominator*!). When switched ON, current rises smoothly as `I(t) = I_max(1 − e^(−t/τ))`, and magnetic energy stored is `U_L = ½ L I²`." },
        { label: "Step 3: AC Reactance (`X_C` & `X_L`) and Total Impedance `Z`", text: "In AC at angular frequency `ω = 2πf`: **Capacitive Reactance** `X_C = 1 / (ωC)` (blocks DC/low-freq, passes high-freq!) and **Inductive Reactance** `X_L = ωL` (passes DC/low-freq, blocks high-freq!). Because `X_L` and `X_C` pull voltage `90°` opposite each other, total AC resistance — **Impedance `Z`** — uses Pythagoras: **`Z = √(R² + (X_L − X_C)²)`** and `V_rms = I_rms · Z`!" },
        { label: "Step 4: RLC Resonance (`X_L = X_C` → Max Current!)", text: "When `X_L = X_C`, they **cancel completely** (`X_L − X_C = 0`)! Total impedance drops to its bare minimum **`Z = R`**, current spikes to maximum, and phase shift `φ = 0°`. Setting `ωL = 1/(ωC)` gives the famous **Resonant Frequency**: **`ω₀ = 1 / √(LC)`** or **`f₀ = 1 / (2π√(LC))`**!" }
      ],
      cheatCode: "RC: τ = RC (1τ → 63.2% charged / 36.8% left). RL: τ = L/R. AC: X_L = ωL, X_C = 1/(ωC), Z = √(R² + (X_L − X_C)²). Resonance: X_L = X_C → Z = R, ω₀ = 1/√(LC)!",
      visualizerId: "electroMagLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "An RC circuit has resistor `R = 2000 Ω` and capacitor `C = 500 μF` (`5 × 10⁻⁴ F`). What is its time constant `τ = RC` in seconds?", answer: "1", hint: "Multiply `2000 × 0.0005`!", whyEasy: "`2000 × 5 × 10⁻⁴ = 1.0 second`!" },
        { type: "mc", prompt: "An RLC series circuit has `R = 3 Ω`, `X_L = 10 Ω`, and `X_C = 6 Ω`. What is its total impedance `Z`?", options: ["5 Ω (3-4-5 right triangle!)", "19 Ω", "7 Ω", "13 Ω"], answer: "5 Ω (3-4-5 right triangle!)", hint: "Compute `X_L − X_C = 4 Ω`, then use `Z = √(R² + (X_L − X_C)²)`!", whyEasy: "`Z = √(3² + (10 − 6)²) = √(9 + 16) = √25 = 5 Ω`!" },
        { type: "mc", prompt: "At the resonant frequency `ω₀ = 1/√(LC)` of a series RLC circuit, what does total impedance `Z` equal?", options: ["Z = R (minimum possible impedance → maximum current!)", "Z = 0 Ω", "Z = X_L + X_C", "Z = ∞"], answer: "Z = R (minimum possible impedance → maximum current!)", hint: "At resonance, `X_L` and `X_C` are equal and cancel out!", whyEasy: "`X_L − X_C = 0`, so `Z = √(R² + 0) = R` and current hits its peak!" },
        { type: "mc", prompt: "What happens to a Capacitor's reactance `X_C = 1 / (2πfC)` as the AC frequency `f` becomes VERY HIGH?", options: ["X_C drops toward 0 Ω (acts like a closed wire for high frequencies!)", "X_C shoots to ∞ (blocks high frequencies)", "X_C stays constant", "X_C becomes negative"], answer: "X_C drops toward 0 Ω (acts like a closed wire for high frequencies!)", hint: "`f` is in the denominator of `X_C = 1/(2πfC)`!", whyEasy: "High-frequency AC flips polarity so fast the capacitor never fills up — low impedance!" },
        { type: "mc", prompt: "After ONE time constant (`t = τ = RC`), an initially uncharged capacitor connected to battery `V₀` has charged to roughly what percent of `V₀`?", options: ["63.2% (1 − 1/e)", "50.0%", "36.8% (1/e)", "99.3%"], answer: "63.2% (1 − 1/e)", hint: "Plug `t = τ` into `1 − e^(−t/τ) = 1 − e^(−1)` (`1/e ≈ 0.368`)!", whyEasy: "`1 − 0.368 = 0.632 = 63.2%` charged (and `36.8%` left to go)!" }
      ]
    },
    {
      id: "physics-special-relativity-lorentz-energy",
      worldId: "physics",
      order: 235,
      title: "Special Relativity: Lorentz γ, Time Dilation & E² = (pc)² + (mc²)²",
      icon: "🚀",
      tagline: "Moving clocks run slow, moving rulers shrink, speeds never beat c & photons have momentum with zero rest mass!",
      scaryVersion: "Lorentz factor kinematics, relativistic time dilation, length contraction, Einstein velocity addition, and energy-momentum invariance.",
      easyTruth: "Einstein started with ONE stubborn fact: the speed of light `c` (`3 × 10⁸ m/s`) is the exact same for EVERY observer, even if you chase it in a rocket! For `c = distance / time` to stay constant for everyone, **space and time themselves must stretch and squeeze** by one master factor: the **Lorentz factor `γ`**!",
      microSteps: [
        { label: "Step 1: The Lorentz Factor `γ = 1 / √(1 − v²/c²)`", text: "Every relativistic effect is controlled by **`γ = 1 / √(1 − β²)`** where `β = v/c`. At everyday speeds, `γ ≈ 1.000000000` (Newton works!). At `v = 0.6c`, `γ = 1/√(1 − 0.36) = 1/0.8 = 1.25` (a 3-4-5 triangle!). At `v = 0.8c`, **`γ = 5/3 ≈ 1.67`**. As `v → c`, `γ → ∞` — why nothing with mass can ever reach `c`!" },
        { label: "Step 2: Time Dilation (`Δt = γ Δt₀`) & Length Contraction (`L = L₀ / γ`)", text: "Remember the friendly mnemonic: **'Moving clocks run SLOW, moving rulers look SHORT!'** Proper time `Δt₀` (measured on the spaceship's own wristwatch) is the *shortest* time; Earth watches a longer dilated time **`Δt = γ Δt₀`**. Conversely, proper length `L₀` (at rest) is the *longest*; a zooming ship looks squished along its travel direction to **`L = L₀ / γ`**!" },
        { label: "Step 3: Relativistic Velocity Addition (`u' = (u + v)/(1 + uv/c²)`)", text: "If a rocket flies at `0.8c` and fires a laser forward at `c`, do you see `1.8c`? NO! Einstein's formula **`u_tot = (u + v) / (1 + uv/c²)`** gives `(0.8c + c) / (1 + 0.8) = 1.8c / 1.8 = c`! Even two rockets flying opposite at `0.8c` see each other at `(1.6c)/(1.64) ≈ 0.976c < c`!" },
        { label: "Step 4: The Complete Energy-Momentum Triangle (`E² = (pc)² + (mc²)²`)", text: "`E = mc²` is ONLY the rest energy (`p = 0`)! The full masterpiece is Pythagoras: **`E² = (pc)² + (mc²)²`**, with total energy **`E = γ m c²`** and kinetic energy **`K = (γ − 1) m c²`**! For a massless photon (`m = 0`), the formula reduces to **`E = pc`** (so light carries real momentum `p = E/c = h/λ` that pushes solar sails!)." }
      ],
      cheatCode: "γ = 1/√(1−v²/c²) (0.6c→1.25, 0.8c→5/3). Δt = γΔt₀ (longer), L = L₀/γ (shorter). u_tot = (u+v)/(1+uv/c²). E² = (pc)² + (mc²)² (photons: m=0 → E = pc)!",
      visualizerId: "physicsLawsPlayground",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Compute the Lorentz factor `γ = 1 / √(1 − v²/c²)` for a spacecraft cruising at `v = 0.6c`.", options: ["1.25 (5/4)", "0.80", "1.67", "2.00"], answer: "1.25 (5/4)", hint: "`1 − 0.6² = 1 − 0.36 = 0.64`, and `√0.64 = 0.8`!", whyEasy: "`γ = 1 / 0.8 = 5/4 = 1.25` — always `≥ 1`!" },
        { type: "mc", prompt: "A 100 m long spaceship (`L₀ = 100 m`) flies past Earth at `v = 0.8c` (`γ = 5/3`). How long does Earth measure the spaceship to be?", options: ["60 m (L = L₀ / γ = 100 × 3/5)", "167 m", "100 m", "80 m"], answer: "60 m (L = L₀ / γ = 100 × 3/5)", hint: "Moving lengths CONTRACT: `L = L₀ / γ`!", whyEasy: "`L = 100 / (5/3) = 100 × 0.6 = 60 m` (squished along the direction of motion)!" },
        { type: "mc", prompt: "A rocket moves at `0.5c` relative to Earth and shoots a probe forward at `0.5c` relative to the rocket. What speed does Earth observe (`u_tot = (u+v)/(1+uv/c²)`)?", options: ["0.8c (1.0c / 1.25)", "1.0c", "0.5c", "0.75c"], answer: "0.8c (1.0c / 1.25)", hint: "Plug `u = 0.5c` and `v = 0.5c` into `(u + v) / (1 + uv/c²)`!", whyEasy: "`(0.5 + 0.5)c / (1 + 0.25) = 1.0c / 1.25 = 0.8c` — strictly less than `c`!" },
        { type: "mc", prompt: "Why can a massless photon (`m = 0`) still carry momentum and push a solar sail?", options: ["From E² = (pc)² + (mc²)², setting m = 0 gives E = pc, so p = E/c!", "Photons secretly have large rest mass", "E = mc² means photons have zero energy", "Momentum only exists in gravity"], answer: "From E² = (pc)² + (mc²)², setting m = 0 gives E = pc, so p = E/c!", hint: "Look at the full relativistic energy-momentum triangle!", whyEasy: "Rest mass is zero, NOT energy — `E = pc` gives light real momentum `p = E/c`!" },
        { type: "mc", prompt: "An astronaut's onboard clock ticks `Δt₀ = 4 years` while flying at `v = 0.6c` (`γ = 1.25`). How many years pass on Earth?", options: ["5 years (Δt = γ Δt₀ = 1.25 × 4)", "3.2 years", "4 years", "8 years"], answer: "5 years (Δt = γ Δt₀ = 1.25 × 4)", hint: "Earth sees the moving clock tick slowly, so MORE time passes on Earth: `Δt = γ Δt₀`!", whyEasy: "`Δt = 1.25 × 4 = 5 years` — the astronaut ages 4 years while Earth ages 5!" }
      ]
    },
    {
      id: "physics-quantum-debroglie-heisenberg-bohr",
      worldId: "physics",
      order: 236,
      title: "Quantum Physics: de Broglie, Bohr Atom & Heisenberg Uncertainty",
      icon: "⚛️",
      tagline: "Matter acts like waves (λ = h/p), hydrogen climbs an exact −13.6/n² energy ladder & nature enforces Δx·Δp ≥ ℏ/2!",
      scaryVersion: "de Broglie matter waves, Bohr quantized hydrogen energy levels, Rydberg photon emission, particle-in-a-box quantization, and Heisenberg's uncertainty principle.",
      easyTruth: "Zoom down to atoms and nature stops acting like tiny billiard balls! Louis de Broglie realized EVERY moving object has a wavelength `λ = h/p` (why electrons fit around nuclei only in whole-wave orbits!). That wave-fitting locks hydrogen onto an exact energy ladder `E_n = −13.6/n² eV`, and guarantees you can NEVER pin down both exact position and exact momentum at once!",
      microSteps: [
        { label: "Step 1: de Broglie Matter Wavelength (`λ = h / p = h / (mv)`)", text: "Every particle with momentum `p` has a wave wavelength **`λ = h / p`** (`h = 6.626 × 10⁻³⁴ J·s`). Fast/heavy baseballs have tiny `p`-denominator wavelengths (`~10⁻³⁴ m`, totally invisible!), while lightweight electrons have atomic-scale wavelengths — which is how **Electron Microscopes** see individual viruses and atoms!" },
        { label: "Step 2: Bohr Hydrogen Energy Ladder (`E_n = −13.6 eV / n²`)", text: "Hydrogen's allowed electron energies are quantized: **`E_n = −13.6 eV / n²`** (`n = 1` ground state = `−13.6 eV`; `n = 2` = `−3.4 eV`; `n = 3` = `−1.51 eV`; `n = ∞` ionized = `0 eV`). Jumping DOWN from `n_i` to `n_f` emits a photon of exact energy **`ΔE = hf = hc/λ = E_i − E_f`** (e.g. `n=2 → n=1` emits `10.2 eV` UV light)!" },
        { label: "Step 3: Particle in a 1D Box (`E_n = n² h² / (8mL²)`)", text: "Trap a quantum particle in a box of length `L`. Just like a guitar string, only standing waves `λ_n = 2L / n` fit! Plugging into `E = p²/(2m)` gives **`E_n = n² E₁`**, where **`E₁ = h² / (8mL²)`** — notice the ground state energy `E₁` is NEVER zero (**Zero-Point Energy**), and squeezing the box smaller (`L ↓`) makes energy skyrocket (`∝ 1/L²`)!" },
        { label: "Step 4: Heisenberg Uncertainty Principle (`Δx · Δp ≥ ℏ / 2`)", text: "This is NOT a flaw in our rulers — it is built into waves! A sharp spike in position (`Δx` tiny) requires mixing a huge range of wavelengths/momenta (`Δp` huge): **`Δx · Δp ≥ ℏ/2`** (where `ℏ = h/(2π)`), and energy-time obeys **`ΔE · Δt ≥ ℏ/2`**! Squeezing an electron into a tiny nucleus would force insane momentum `Δp`, explaining why atoms don't collapse!" }
      ],
      cheatCode: "de Broglie: λ = h/p = h/(mv). Hydrogen: E_n = −13.6/n² eV (ΔE = hf = hc/λ). 1D Box: E_n = n²h²/(8mL²) (never 0!). Heisenberg: Δx·Δp ≥ ℏ/2, ΔE·Δt ≥ ℏ/2!",
      visualizerId: "chemistryAtomPhLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "In the Bohr model of Hydrogen (`E_n = −13.6 eV / n²`), what is the energy of an electron in the `n = 2` level?", options: ["−3.4 eV (−13.6 / 4)", "−6.8 eV", "−13.6 eV", "+3.4 eV"], answer: "−3.4 eV (−13.6 / 4)", hint: "Divide `−13.6 eV` by `n² = 2² = 4`!", whyEasy: "`−13.6 / 4 = −3.4 eV` (bound states always have negative energy)!" },
        { type: "mc", prompt: "A Hydrogen electron drops from `n = 2` (`−3.4 eV`) to `n = 1` (`−13.6 eV`). What is the energy of the emitted photon?", options: ["10.2 eV", "17.0 eV", "3.4 eV", "13.6 eV"], answer: "10.2 eV", hint: "Subtract `E_2 − E_1 = (−3.4) − (−13.6)`!", whyEasy: "`−3.4 − (−13.6) = +10.2 eV` emitted as a sharp spectral line photon!" },
        { type: "mc", prompt: "If you DOUBLE a particle's momentum `p` (at non-relativistic speed), what happens to its de Broglie wavelength `λ = h / p`?", options: ["Cuts in HALF (½λ)", "Doubles (2λ)", "Quadruples (4λ)", "Stays unchanged"], answer: "Cuts in HALF (½λ)", hint: "Momentum `p` is in the denominator of `λ = h/p`!", whyEasy: "Faster/higher-momentum particles have shorter, tighter matter wavelengths!" },
        { type: "mc", prompt: "A quantum particle in a 1D box (`E_n = n² E₁`) has ground-state energy `E₁ = 2 eV`. What is its `n = 3` energy level `E₃`?", options: ["18 eV (3² × 2 eV)", "6 eV", "12 eV", "9 eV"], answer: "18 eV (3² × 2 eV)", hint: "Energy scales with **`n²`**, NOT linearly with `n`!", whyEasy: "`E₃ = 3² × 2 = 9 × 2 = 18 eV`!" },
        { type: "mc", prompt: "According to Heisenberg's Uncertainty Principle (`Δx · Δp ≥ ℏ/2`), if you pin down an electron's position `Δx` **10× more precisely** (`Δx → Δx/10`), what happens to its minimum momentum uncertainty `Δp`?", options: ["Increases by at least 10×!", "Decreases by 10×", "Stays unchanged", "Drops to zero"], answer: "Increases by at least 10×!", hint: "The product `Δx · Δp` cannot drop below `ℏ/2`!", whyEasy: "Shrinking `Δx` by 10× forces minimum `Δp` to jump by at least 10×!" }
      ]
    },
    {
      id: "physics-fluid-viscosity-poiseuille-reynolds",
      worldId: "physics",
      order: 237,
      title: "Real Fluids: Poiseuille's r⁴ Law, Viscosity, Reynolds & Capillarity",
      icon: "🩸",
      tagline: "Why narrowing an artery by HALF slashes blood flow by 16×, how insects walk on water & when smooth flow turns turbulent!",
      scaryVersion: "Newtonian shear viscosity, Hagen-Poiseuille laminar pipe flow, Reynolds number transition, Stokes drag, and Young-Laplace capillary pressure.",
      easyTruth: "Ideal Bernoulli fluids have zero stickiness — great for approximations, terrible for honey or blood vessels! Real fluids have internal friction (**Viscosity `η`**). That friction gives us one of the most dramatic formulas in all of medicine & engineering: **Poiseuille's Law** (`Q ∝ r⁴`), where shrinking a pipe's radius by half doesn't halve flow — it crushes flow to **`1/16`**!",
      microSteps: [
        { label: "Step 1: Viscosity (`η`) & Poiseuille's Law (`Q = π ΔP r⁴ / (8 η L)`)", text: "Viscosity `η` (in `Pa·s`) measures fluid 'syrupiness' (`F = η A v/y`). For smooth (laminar) flow through a cylindrical pipe of radius `r` and length `L`, volume flow rate is **`Q = (π ΔP r⁴) / (8 η L)`**! Look at that **`r⁴`**: doubling pipe radius boosts flow **`2⁴ = 16×`**, and cutting an artery radius to half (`½r`) cuts blood flow to **`(½)⁴ = 1/16`** (forcing the heart to pump 16× harder)!" },
        { label: "Step 2: Reynolds Number (`Re = ρ v D / η`) — Smooth vs Chaotic", text: "Will a fluid glide in quiet layers (**laminar**) or erupt into swirling eddies (**turbulent**)? Check the dimensionless **Reynolds Number**: **`Re = (ρ v D) / η`** (`ρ` = density, `v` = speed, `D` = diameter, `η` = viscosity). In pipes: `Re < 2000` is smooth laminar; `Re > 4000` is turbulent (like rapids or aortic murmurs)!" },
        { label: "Step 3: Stokes' Drag & Terminal Velocity (`F_d = 6π η r v`)", text: "A tiny sphere falling gently through a viscous liquid feels linear drag **`F_d = 6π η r v`**! When upward drag + buoyancy balances downward weight, acceleration hits zero and the sphere glides at constant **Terminal Velocity `v_t`** (how oil drops in Millikan's experiment & blood cells in ESR tests settle!)." },
        { label: "Step 4: Surface Tension (`γ`), Laplace Pressure & Capillary Rise", text: "Surface water molecules pull sideways like a stretched trampoline (`γ = F/L`). Inside a curved bubble/droplet of radius `r`, pressure is higher by **Young-Laplace**: **`ΔP = 2γ / r`** (a soap bubble has *two* surfaces, so `4γ/r` — meaning smaller bubbles have HIGHER internal pressure!). In narrow glass tubes, water climbs to **`h = (2γ cos θ) / (ρ g r)`** (narrower tube `r ↓` → climbs HIGHER!)." }
      ],
      cheatCode: "Poiseuille: Q = πΔPr⁴/(8ηL) (½r → 1/16 Q!). Reynolds: Re = ρvD/η (<2000 laminar, >4000 turbulent). Stokes: F_d = 6πηrv. Laplace: ΔP = 2γ/r (drop), 4γ/r (bubble). Capillary: h = 2γcosθ/(ρgr)!",
      visualizerId: "physicsLawsPlayground",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Plaque narrows a blood vessel's radius to **HALF** its original radius (`r → r/2`) with the same pressure drop `ΔP`. By Poiseuille's Law (`Q ∝ r⁴`), what happens to blood flow rate `Q`?", options: ["Drops to 1/16 of original flow ((1/2)⁴ = 1/16!)", "Drops to 1/2", "Drops to 1/4", "Drops to 1/8"], answer: "Drops to 1/16 of original flow ((1/2)⁴ = 1/16!)", hint: "Radius is raised to the FOURTH power (`r⁴`)!", whyEasy: "`(1/2)⁴ = 1/16` — why even a small artery narrowing drastically raises blood pressure!" },
        { type: "mc", prompt: "A fluid flowing through a pipe has Reynolds number `Re = 850`. How do we classify this flow?", options: ["Smooth Laminar flow (Re < 2000)", "Fully Turbulent flow (Re > 4000)", "Supersonic shock flow", "Zero-viscosity superfluid"], answer: "Smooth Laminar flow (Re < 2000)", hint: "Pipe threshold: `< 2000` laminar, `> 4000` turbulent!", whyEasy: "`850 < 2000` sits squarely inside smooth, layered laminar flow!" },
        { type: "mc", prompt: "Two soap bubbles of DIFFERENT sizes are connected by an open straw. Which way does air flow (`ΔP = 4γ / r`)?", options: ["From the SMALL bubble INTO the LARGE bubble (smaller r = higher pressure!)", "From the large bubble into the small bubble", "No air flows — pressures are equal", "Both bubbles burst instantaneously"], answer: "From the SMALL bubble INTO the LARGE bubble (smaller r = higher pressure!)", hint: "Look at `r` in the denominator of `ΔP = 4γ / r`!", whyEasy: "Tighter curvature (smaller `r`) creates HIGHER internal pressure, so the small bubble actually deflates into the big one!" },
        { type: "mc", prompt: "In Capillary Rise (`h = 2γ cos θ / (ρ g r)`), if you switch to a glass straw with **1/3 the radius**, how high does water climb?", options: ["3× higher!", "1/3 as high", "9× higher", "Same height"], answer: "3× higher!", hint: "`h` is inversely proportional to tube radius `r`!", whyEasy: "Dividing `r` by 3 multiplies capillary rise height `h` by 3!" },
        { type: "mc", prompt: "By Stokes' Law (`F_d = 6π η r v`), if a tiny raindrop's speed triples (`v → 3v`) inside laminar air, its viscous drag force:", options: ["Triples (3×)", "Increases 9×", "Cuts to 1/3", "Stays constant"], answer: "Triples (3×)", hint: "Stokes' laminar drag is directly linear in `v` (`v¹`)!", whyEasy: "At low Reynolds numbers, viscous drag `F_d ∝ v` scales linearly — `3×` speed gives `3×` drag!" }
      ]
    }
  ];

  // Append all 15 new nodes cleanly
  DATA.NODES.push(...MATH_PHYSICS_NODES);

  // ==================== +8 CLASSIC MATH & PHYSICS TRAPS ====================
  DATA.GRADE12_TRAPS.push(
    {
      id: "trap-lhopital-non-indeterminate",
      title: "Applying L'Hôpital When It's NOT 0/0 or ∞/∞",
      trapExpression: "lim_(x→0) (cos x)/(x + 1) =? lim (−sin x)/1 = 0",
      wrongGuess: "0 (differentiated blindly!)",
      rightAnswer: "1 (direct substitution: cos 0 / 1 = 1!)",
      whyItHappens: "Students get excited about L'Hôpital's Rule and differentiate every fraction limit without plugging in `x` first.",
      quickRule: "ALWAYS plug in first! L'Hôpital is ONLY legal for `0/0` or `∞/∞`.",
      quiz: {
        prompt: "What is the TRUE value of `lim_(x→0) (x + 4) / (x + 2)`?",
        options: ["2 (direct plug-in: 4/2 = 2!)", "1 (wrongly used L'Hôpital 1/1)", "0", "Undefined"],
        answer: "2 (direct plug-in: 4/2 = 2!)",
        explanation: "Direct substitution gives `4/2 = 2` (NOT `0/0`), so L'Hôpital's rule does NOT apply!"
      }
    },
    {
      id: "trap-variance-shift-scale",
      title: "Forgetting to Square 'a' in Var(aX + b)",
      trapExpression: "If Var(X) = 4, what is Var(2X + 10)?",
      wrongGuess: "2(4) + 10 = 18",
      rightAnswer: "2²(4) = 16 (shift +10 vanishes, multiplier squares!)",
      whyItHappens: "Expectation `E[2X + 10] = 2E[X] + 10` is linear, so people mistakenly treat Variance the same way.",
      quickRule: "Variance is SQUARED spread: `Var(aX + b) = a² Var(X)` — adding `+b` changes variance by ZERO!",
      quiz: {
        prompt: "If `Var(X) = 3`, what is `Var(−4X + 100)`?",
        options: ["48 ((−4)² × 3 = 16 × 3)", "−12", "88", "12"],
        answer: "48 ((−4)² × 3 = 16 × 3)",
        explanation: "Variance is always non-negative: `(−4)² × 3 = 16 × 3 = 48`, and `+100` adds zero spread!"
      }
    },
    {
      id: "trap-polar-rose-petals",
      title: "Counting Petals on Even vs Odd Polar Roses",
      trapExpression: "r = 5 cos(4θ) → how many petals?",
      wrongGuess: "4 petals",
      rightAnswer: "8 petals (even n doubles to 2n!)",
      whyItHappens: "For odd `n` (like `3θ`), the curve retraces the same 3 petals twice over `[0, 2π]`, whereas even `n` traces `2n` distinct petals.",
      quickRule: "Rose `r = a cos(nθ)` or `a sin(nθ)`: ODD `n` → `n` petals; EVEN `n` → `2n` petals!",
      quiz: {
        prompt: "How many petals does `r = 3 cos(6θ)` trace over `0 ≤ θ < 2π`?",
        options: ["12 petals (n = 6 is even → 2n)", "6 petals", "3 petals", "18 petals"],
        answer: "12 petals (n = 6 is even → 2n)",
        explanation: "Because `n = 6` is even, negative `r` loops fill in 6 extra distinct petals for `2 × 6 = 12` total!"
      }
    },
    {
      id: "trap-stefan-boltzmann-celsius",
      title: "Plugging Celsius Instead of Kelvin into Stefan-Boltzmann T⁴",
      trapExpression: "Heating 10°C → 20°C: does radiated power grow 16×?",
      wrongGuess: "Yes! 20/10 = 2, so 2⁴ = 16×!",
      rightAnswer: "NO! 283 K → 293 K is only a +3.5% rise → (293/283)⁴ ≈ 1.15×!",
      whyItHappens: "Celsius has an arbitrary zero at freezing water, NOT absolute zero — ratios of Celsius temperatures are physically meaningless!",
      quickRule: "ALWAYS convert to Kelvin (`K = °C + 273.15`) before using `T⁴`, `PV = nRT`, or Wien's Law!",
      quiz: {
        prompt: "An object warms from `27°C` (`300 K`) to `327°C` (`600 K`). By what factor does its blackbody radiated power `P = εσAT⁴` increase?",
        options: ["16× (Kelvin doubled: 600/300 = 2 → 2⁴ = 16!)", "12⁴ ×", "2×", "4×"],
        answer: "16× (Kelvin doubled: 600/300 = 2 → 2⁴ = 16!)",
        explanation: "Converting to Kelvin gives `300 K → 600 K` (exactly `2×`), so `P` multiplies by `2⁴ = 16×`!"
      }
    },
    {
      id: "trap-malus-first-polarizer",
      title: "Using cos²θ on Unpolarized Light Passing Through the FIRST Polarizer",
      trapExpression: "Unpolarized light I₀ hits a polarizer tilted at 30°",
      wrongGuess: "I = I₀ cos²(30°) = 0.75 I₀",
      rightAnswer: "I = 0.50 I₀ (always 50% regardless of tilt angle!)",
      whyItHappens: "Unpolarized light vibrates equally in EVERY direction, so there is no reference angle `θ` until AFTER the first polarizer!",
      quickRule: "1st polarizer on unpolarized light = ALWAYS `½ I₀`. Malus's `cos²θ` starts on the 2nd polarizer!",
      quiz: {
        prompt: "Unpolarized `100 W/m²` light passes through a vertical polarizer, then a second polarizer at `45°`. What intensity exits?",
        options: ["25 W/m² (100 → 50 → 50·cos²45° = 25)", "50 W/m²", "75 W/m²", "12.5 W/m²"],
        answer: "25 W/m² (100 → 50 → 50·cos²45° = 25)",
        explanation: "First polarizer halves unpolarized light to `50 W/m²`; second applies `cos²(45°) = 0.5` → `25 W/m²`!"
      }
    },
    {
      id: "trap-relativity-emc2-photons",
      title: "Thinking E = mc² Means Massless Photons Have Zero Energy",
      trapExpression: "Photon has m = 0, so E = (0)c² = 0?",
      wrongGuess: "Yes — zero mass means zero energy & momentum",
      rightAnswer: "NO! Full equation is E² = (pc)² + (mc²)² → for m = 0, E = pc!",
      whyItHappens: "`E = mc²` is the shortened version for stationary objects (`p = 0`), not moving particles or light.",
      quickRule: "Full Einstein Pythagoras: `E² = (pc)² + (mc²)²`. At rest: `E = mc²`. Massless light: `E = pc`!",
      quiz: {
        prompt: "Which formula accurately gives the momentum `p` of a massless photon with energy `E`?",
        options: ["p = E / c (from E = pc)", "p = 0", "p = E · c²", "p = √(2mE)"],
        answer: "p = E / c (from E = pc)",
        explanation: "Setting `m = 0` in `E² = (pc)² + (mc²)²` leaves `E = pc`, so `p = E/c = h/λ`!"
      }
    },
    {
      id: "trap-rlc-impedance-sum",
      title: "Adding R + X_L + X_C Straight Together for RLC Impedance",
      trapExpression: "R = 6 Ω, X_L = 12 Ω, X_C = 4 Ω → Z =?",
      wrongGuess: "6 + 12 + 4 = 22 Ω",
      rightAnswer: "10 Ω (Pythagoras: √(6² + (12 − 4)²) = √(36 + 64) = 10 Ω!)",
      whyItHappens: "In AC circuits, inductor and capacitor voltages are `180°` opposite each other and `90°` out of phase with the resistor!",
      quickRule: "Subtract `X_L − X_C` FIRST, then take Pythagoras with `R`: `Z = √(R² + (X_L − X_C)²)`!",
      quiz: {
        prompt: "What is the impedance `Z` of a series RLC circuit with `R = 8 Ω`, `X_L = 10 Ω`, `X_C = 4 Ω`?",
        options: ["10 Ω (√(8² + 6²))", "22 Ω", "14 Ω", "2 Ω"],
        answer: "10 Ω (√(8² + 6²))",
        explanation: "`X_L − X_C = 10 − 4 = 6 Ω`, then `Z = √(8² + 6²) = √100 = 10 Ω`!"
      }
    },
    {
      id: "trap-poiseuille-r2-vs-r4",
      title: "Using r² Instead of r⁴ in Poiseuille's Pipe Flow Law",
      trapExpression: "Double artery radius (r → 2r): flow Q goes up 4×?",
      wrongGuess: "4× (area A = πr² quadrupled!)",
      rightAnswer: "16× (Poiseuille Q = πΔPr⁴/(8ηL) scales as r⁴!)",
      whyItHappens: "Area goes up by `r²`, AND the wider center is farther from the sticky pipe walls so average speed ALSO rises by `r²` → `r² × r² = r⁴`!",
      quickRule: "Pipe flow with viscosity obeys **`r⁴`** — doubling radius gives **`16×`** flow!",
      quiz: {
        prompt: "If you widen a viscous laminar tube's radius by `2×` at fixed pressure `ΔP`, how much does flow rate `Q` increase?",
        options: ["16× (2⁴ = 16!)", "4×", "2×", "8×"],
        answer: "16× (2⁴ = 16!)",
        explanation: "Both cross-sectional area (`∝ r²`) and reduced wall drag (`∝ r²`) combine to give `Q ∝ r⁴ = 2⁴ = 16×`!"
      }
    }
  );

  // ==================== +12 PHYSICS & MATH LAW FORMULA CARDS ====================
  if (DATA.MEMORIZE_DATA && Array.isArray(DATA.MEMORIZE_DATA.physicsLawsCards)) {
    DATA.MEMORIZE_DATA.physicsLawsCards.push(
      { law: "Euler's Formula & Identity", eq: "e^(iθ) = cos θ + i sin θ  |  e^(iπ) + 1 = 0", key: "Imaginary exponent rotates on unit circle; De Moivre: (r∠θ)^n = r^n∠(nθ)" },
      { law: "Maclaurin Big 3 Series", eq: "e^x = Σ x^n/n!  |  sin x = x − x³/3! + …  |  cos x = 1 − x²/2! + …", key: "Odd powers = sin x; even powers = cos x; converges everywhere (R = ∞)" },
      { law: "Eigenvalue 2×2 Shortcuts", eq: "Av = λv  |  λ₁ + λ₂ = Trace(A)  |  λ₁·λ₂ = det(A)", key: "Diagonal/triangular eigenvalues sit right on main diagonal; λ=0 ⇔ singular" },
      { law: "Vector Calculus (∇)", eq: "∇f (uphill)  |  ∇·F (faucet/drain)  |  ∇×F (spin)", key: "Gauss Divergence: ∬F·dS = ∭(∇·F)dV; Stokes: ∮F·dr = ∬(∇×F)·dS" },
      { law: "Central Limit & Binomial", eq: "SE = σ/√n  |  Binomial μ=np, σ=√(npq)  |  Poisson λ^k e^(−λ)/k!", key: "4× more samples cuts standard error in HALF; Poisson has mean = variance = λ" },
      { law: "Young's Double-Slit & Rayleigh", eq: "d sin θ = mλ (Δy = λL/d)  |  θ_min = 1.22 λ/D", key: "Narrower slits spread fringes WIDER; bigger telescope mirror D = sharper view" },
      { law: "Malus & Brewster Polarization", eq: "I = I₀ cos²θ  |  tan θ_B = n₂/n₁", key: "1st polarizer cuts unpolarized light to ½I₀; Brewster glare is 100% polarized" },
      { law: "Young's Modulus & Expansion", eq: "E = σ/ε = FL₀/(AΔL)  |  ΔL = αL₀ΔT  |  β ≈ 3α", key: "Higher E = stiffer; heating a washer makes the center hole EXPAND too" },
      { law: "Stefan-Boltzmann & Wien Laws", eq: "P = εσAT⁴ (K!)  |  λ_max · T = 2.90×10⁻³ m·K", key: "2× Kelvin temp → 16× radiated power and ½ peak wavelength (bluer!)" },
      { law: "RLC Impedance & Resonance", eq: "Z = √(R² + (X_L − X_C)²)  |  ω₀ = 1/√(LC)  |  τ = RC or L/R", key: "At resonance X_L = X_C so Z drops to R and current peaks (radio tuning!)" },
      { law: "Special Relativity Master Set", eq: "γ = 1/√(1−v²/c²)  |  Δt = γΔt₀  |  L = L₀/γ  |  E² = (pc)² + (mc²)²", key: "Moving clocks run slow, moving rulers shrink; massless photon has E = pc" },
      { law: "Poiseuille, Bohr & Heisenberg", eq: "Q = πΔPr⁴/(8ηL)  |  E_n = −13.6/n² eV  |  Δx·Δp ≥ ℏ/2", key: "½ pipe radius → 1/16 blood flow; λ = h/p (de Broglie matter wave)" }
    );
  }

  // ==================== +6 WORK STUDIO DERIVATIONS (MATH & PHYSICS) ====================
  if (WORK_STUDIO && Array.isArray(WORK_STUDIO.PROBLEMS)) {
    WORK_STUDIO.PROBLEMS.push(
      {
        id: "wk-polar-to-cart",
        track: "algebra",
        difficulty: "Core",
        xp: 40,
        gems: 9,
        linkedNodeId: "math-parametric-polar-curves",
        title: "Convert Polar Coordinates (8, 60°) to Cartesian (x, y)",
        given: "(r, \\theta) = (8,\\; 60^{\\circ})",
        goal: "Compute both rectangular coordinates $x = r\\cos\\theta$ and $y = r\\sin\\theta$.",
        steps: [
          {
            prompt: "Step 1: Compute $x = r\\cos\\theta = 8\\cos(60^{\\circ})$.",
            rule: "Polar Horizontal Projection",
            result: "x = 4",
            accepted: ["x=4", "4"],
            numericTarget: 4,
            hint: "Recall $\\cos(60^{\\circ}) = \\frac{1}{2}$.",
            why: "$x = 8 \\times \\frac{1}{2} = 4$.",
            choices: [
              { expr: "x = 4", correct: true },
              { expr: "x = 4√3", correct: false, trapReason: "You used $\\sin(60^{\\circ}) = \\frac{\\sqrt{3}}{2}$ instead of $\\cos(60^{\\circ}) = \\frac{1}{2}$!" },
              { expr: "x = 8", correct: false, trapReason: "At $60^{\\circ}$ you only project half of $r$ onto the $x$-axis." },
              { expr: "x = 2", correct: false, trapReason: "Half of $8$ is $4$, not $2$." }
            ]
          },
          {
            prompt: "Step 2: Compute $y = r\\sin\\theta = 8\\sin(60^{\\circ})$.",
            rule: "Polar Vertical Projection",
            result: "y = 4√3",
            accepted: ["y=4√3", "4√3", "y=4sqrt(3)", "4sqrt(3)"],
            hint: "Recall $\\sin(60^{\\circ}) = \\frac{\\sqrt{3}}{2}$.",
            why: "$y = 8 \\times \\frac{\\sqrt{3}}{2} = 4\\sqrt{3}$ (check: $4^2 + (4\\sqrt{3})^2 = 16 + 48 = 64 = 8^2$ ✓!).",
            choices: [
              { expr: "y = 4√3", correct: true },
              { expr: "y = 8√3", correct: false, trapReason: "Don't forget to divide by $2$ in $\\frac{\\sqrt{3}}{2}$!" },
              { expr: "y = 4", correct: false, trapReason: "$\\sin(60^{\\circ}) = \\frac{\\sqrt{3}}{2}$, not $\\frac{1}{2}$." },
              { expr: "y = 4√2", correct: false, trapReason: "$\\frac{\\sqrt{2}}{2}$ belongs to $45^{\\circ}$, not $60^{\\circ}$!" }
            ]
          }
        ]
      },
      {
        id: "wk-eigenvalues-2x2",
        track: "algebra",
        difficulty: "Pro",
        xp: 50,
        gems: 11,
        linkedNodeId: "math-eigenvalues-svd-orthogonality",
        title: "Find Eigenvalues of A = [[4, 2], [1, 3]] via Trace & Determinant",
        given: "A = \\begin{pmatrix} 4 & 2 \\\\ 1 & 3 \\end{pmatrix}",
        goal: "Compute $\\text{Tr}(A)$, $\\det(A)$, and solve $\\lambda^2 - \\text{Tr}(A)\\lambda + \\det(A) = 0$.",
        steps: [
          {
            prompt: "Step 1: Compute the Trace (sum of main diagonal entries) of $A$.",
            rule: "Matrix Trace = Sum of Eigenvalues",
            result: "Tr(A) = 7",
            accepted: ["tr(a)=7", "tr=7", "7"],
            numericTarget: 7,
            hint: "Add the top-left ($4$) and bottom-right ($3$) diagonal entries.",
            why: "$\\text{Tr}(A) = 4 + 3 = 7$, so $\\lambda_1 + \\lambda_2 = 7$.",
            choices: [
              { expr: "Tr(A) = 7", correct: true },
              { expr: "Tr(A) = 10", correct: false, trapReason: "Trace adds ONLY the main diagonal ($4 + 3$), not all four entries!" },
              { expr: "Tr(A) = 12", correct: false, trapReason: "Add $4 + 3 = 7$, don't multiply them." },
              { expr: "Tr(A) = 3", correct: false, trapReason: "That's the anti-diagonal ($2 + 1$), not the main diagonal ($4 + 3$)." }
            ]
          },
          {
            prompt: "Step 2: Compute $\\det(A) = ad - bc$.",
            rule: "2×2 Determinant = Product of Eigenvalues",
            result: "det(A) = 10",
            accepted: ["det(a)=10", "det=10", "10"],
            numericTarget: 10,
            hint: "$4(3) - 2(1) = 12 - 2$.",
            why: "$\\det(A) = 12 - 2 = 10$, so $\\lambda_1 \\cdot \\lambda_2 = 10$.",
            choices: [
              { expr: "det(A) = 10", correct: true },
              { expr: "det(A) = 14", correct: false, trapReason: "Sign trap: determinant is $ad - bc = 12 - 2$, NOT $ad + bc$!" },
              { expr: "det(A) = 12", correct: false, trapReason: "Don't forget to subtract the off-diagonal product $2 \\times 1 = 2$." },
              { expr: "det(A) = -10", correct: false, trapReason: "Main diagonal product comes first: $12 - 2 = +10$." }
            ]
          },
          {
            prompt: "Step 3: Solve $\\lambda^2 - 7\\lambda + 10 = 0$ for the larger eigenvalue $\\lambda_1$.",
            rule: "Factor Characteristic Polynomial",
            result: "5",
            accepted: ["5", "λ=5", "lambda=5", "5,2", "2,5"],
            numericTarget: 5,
            hint: "Factor $(\\lambda - 5)(\\lambda - 2) = 0$ (sum $= 7$, product $= 10$).",
            why: "$(\\lambda - 5)(\\lambda - 2) = 0 \\implies \\lambda = 5$ and $\\lambda = 2$ (check: $5+2=7$, $5\\times 2=10$ ✓!).",
            choices: [
              { expr: "5", correct: true },
              { expr: "-5", correct: false, trapReason: "Sign flip: $(\\lambda - 5) = 0$ gives $+5$, not $-5$!" },
              { expr: "7", correct: false, trapReason: "$7$ is the SUM of both eigenvalues, not a single eigenvalue." },
              { expr: "10", correct: false, trapReason: "$10$ is the PRODUCT of both eigenvalues." }
            ]
          }
        ]
      },
      {
        id: "wk-ode-second-order",
        track: "calculus",
        difficulty: "Pro",
        xp: 50,
        gems: 11,
        linkedNodeId: "math-differential-equations-models",
        title: "Solve 2nd-Order ODE y'' - 7y' + 12y = 0",
        given: "y'' - 7y' + 12y = 0",
        goal: "Write the characteristic equation, factor its roots, and assemble the general solution.",
        steps: [
          {
            prompt: "Step 1: Substitute $y = e^{rt}$ to form the characteristic quadratic.",
            rule: "Characteristic Equation Substitution",
            result: "r^2 - 7r + 12 = 0",
            accepted: ["r^2-7r+12=0", "r2-7r+12=0"],
            hint: "Replace $y'' \\to r^2$, $y' \\to r$, and $y \\to 1$.",
            why: "Factoring out non-zero $e^{rt}$ leaves $r^2 - 7r + 12 = 0$.",
            choices: [
              { expr: "r^2 - 7r + 12 = 0", correct: true },
              { expr: "r^2 + 7r + 12 = 0", correct: false, trapReason: "Preserve the minus sign on $-7y'$!" },
              { expr: "2r - 7 + 12 = 0", correct: false, trapReason: "Second derivative gives $r^2$, NOT $2r$!" },
              { expr: "r^2 - 7r = 0", correct: false, trapReason: "The $+12y$ term contributes $+12$ to the characteristic polynomial." }
            ]
          },
          {
            prompt: "Step 2: Factor $r^2 - 7r + 12 = 0$ into linear factors.",
            rule: "Quadratic Factoring",
            result: "(r - 3)(r - 4) = 0",
            accepted: ["(r-3)(r-4)=0", "(r-4)(r-3)=0", "(r-3)(r-4)", "(r-4)(r-3)"],
            hint: "Two numbers adding to $-7$ and multiplying to $+12$ are $-3$ and $-4$.",
            why: "$(r - 3)(r - 4) = 0$ gives distinct real roots $r_1 = 3$ and $r_2 = 4$.",
            choices: [
              { expr: "(r - 3)(r - 4) = 0", correct: true },
              { expr: "(r + 3)(r + 4) = 0", correct: false, trapReason: "That expands to $r^2 + 7r + 12$, flipping the middle sign!" },
              { expr: "(r - 2)(r - 6) = 0", correct: false, trapReason: "$-2 + (-6) = -8$, not $-7$!" },
              { expr: "(r - 1)(r - 12) = 0", correct: false, trapReason: "$-1 + (-12) = -13$, not $-7$!" }
            ]
          },
          {
            prompt: "Step 3: Write the general solution $y(t)$ using roots $r = 3, 4$.",
            rule: "Superposition of Distinct Exponential Modes",
            result: "y = C1e^(3t) + C2e^(4t)",
            accepted: ["y=c1e^(3t)+c2e^(4t)", "y=c1e^3t+c2e^4t", "c1e^(3t)+c2e^(4t)", "c1e^3t+c2e^4t"],
            hint: "Distinct real roots $r_1, r_2$ combine as $C_1 e^{r_1 t} + C_2 e^{r_2 t}$.",
            why: "$y(t) = C_1 e^{3t} + C_2 e^{4t}$ solves the ODE for any constants $C_1, C_2$!",
            choices: [
              { expr: "y = C1e^(3t) + C2e^(4t)", correct: true },
              { expr: "y = C1e^(-3t) + C2e^(-4t)", correct: false, trapReason: "Roots are $+3$ and $+4$, not negative!" },
              { expr: "y = C1cos(3t) + C2sin(4t)", correct: false, trapReason: "Cosine/sine only appear when roots are COMPLEX ($\\Delta < 0$)!" },
              { expr: "y = (C1 + C2t)e^(3t)", correct: false, trapReason: "The extra $t$ factor is only for REPEATED roots ($r_1 = r_2$)." }
            ]
          }
        ]
      },
      {
        id: "wk-relativity-lorentz",
        track: "physics",
        difficulty: "Pro",
        xp: 45,
        gems: 10,
        linkedNodeId: "physics-special-relativity-lorentz-energy",
        title: "Relativistic Time Dilation & Length Contraction at 0.8c",
        given: "v = 0.8c,\\quad \\Delta t_0 = 6\\text{ yr},\\quad L_0 = 150\\text{ m}",
        goal: "Compute Lorentz factor $\\gamma$, dilated Earth time $\\Delta t$, and contracted length $L$.",
        steps: [
          {
            prompt: "Step 1: Compute $\\sqrt{1 - v^2/c^2}$ for $v = 0.8c$.",
            rule: "Lorentz Radical",
            result: "0.6",
            accepted: ["0.6", "3/5"],
            numericTarget: 0.6,
            hint: "$1 - 0.8^2 = 1 - 0.64 = 0.36$; take the square root.",
            why: "$\\sqrt{0.36} = 0.6 = \\frac{3}{5}$, so $\\gamma = \\frac{1}{0.6} = \\frac{5}{3}$.",
            choices: [
              { expr: "0.6", correct: true },
              { expr: "0.2", correct: false, trapReason: "Square $0.8$ first ($0.8^2 = 0.64$), don't do $1 - 0.8$!" },
              { expr: "0.36", correct: false, trapReason: "Don't forget to take the square root of $0.36$!" },
              { expr: "0.8", correct: false, trapReason: "$0.8$ is $v/c$; $\\sqrt{1 - 0.8^2} = 0.6$." }
            ]
          },
          {
            prompt: "Step 2: Compute Earth's dilated time $\\Delta t = \\gamma \\Delta t_0$ (with $\\gamma = 5/3$).",
            rule: "Time Dilation (Moving Clocks Tick Slow)",
            result: "10 yr",
            accepted: ["10yr", "10", "10years", "t=10"],
            numericTarget: 10,
            hint: "Multiply $\\frac{5}{3} \\times 6$.",
            why: "$\\Delta t = \\frac{5}{3}(6) = 10\\text{ years}$ pass on Earth while the rocket ages $6$ years!",
            choices: [
              { expr: "10 yr", correct: true },
              { expr: "3.6 yr", correct: false, trapReason: "Dilated time is LONGER than proper time — multiply by $\\gamma$, don't divide!" },
              { expr: "6 yr", correct: false, trapReason: "At $0.8c$, relativistic time dilation is huge ($\\gamma = 5/3$)." },
              { expr: "12 yr", correct: false, trapReason: "$6 \\times (5/3) = 30/3 = 10$, not $12$." }
            ]
          },
          {
            prompt: "Step 3: Compute Earth's measured contracted length $L = L_0 / \\gamma$.",
            rule: "Length Contraction (Moving Rulers Look Short)",
            result: "90 m",
            accepted: ["90m", "90", "l=90", "l=90m"],
            numericTarget: 90,
            hint: "Divide $150$ by $5/3$ (same as $150 \\times 0.6$).",
            why: "$L = 150 \\times 0.6 = 90\\text{ m}$!",
            choices: [
              { expr: "90 m", correct: true },
              { expr: "250 m", correct: false, trapReason: "Moving objects CONTRACT — divide by $\\gamma$, don't multiply!" },
              { expr: "120 m", correct: false, trapReason: "Multiply by $0.6$, not $0.8$." },
              { expr: "54 m", correct: false, trapReason: "Don't multiply by $0.6$ twice ($0.36$)!" }
            ]
          }
        ]
      },
      {
        id: "wk-rlc-impedance",
        track: "physics",
        difficulty: "Core",
        xp: 45,
        gems: 10,
        linkedNodeId: "physics-rc-rl-rlc-circuits-impedance",
        title: "Solve Series RLC Impedance Z & AC Current I_rms",
        given: "R = 12\\,\\Omega,\\quad X_L = 18\\,\\Omega,\\quad X_C = 13\\,\\Omega,\\quad V_{\\text{rms}} = 65\\text{ V}",
        goal: "Find net reactance $(X_L - X_C)$, total impedance $Z$, and RMS current $I_{\\text{rms}}$.",
        steps: [
          {
            prompt: "Step 1: Compute net reactance $X_{\\text{net}} = X_L - X_C$.",
            rule: "Opposing Phasor Reactances",
            result: "5 Ω",
            accepted: ["5ω", "5ohm", "5ohms", "5"],
            numericTarget: 5,
            hint: "Subtract $18 - 13$.",
            why: "Inductive and capacitive reactances oppose by $180^{\\circ}$, leaving $18 - 13 = 5\\,\\Omega$.",
            choices: [
              { expr: "5 Ω", correct: true },
              { expr: "31 Ω", correct: false, trapReason: "SUBTRACT $X_L - X_C$ because they are $180^{\\circ}$ out of phase, never add!" },
              { expr: "-5 Ω", correct: false, trapReason: "$X_L = 18$ is larger than $X_C = 13$, so $X_L - X_C = +5\\,\\Omega$." },
              { expr: "12 Ω", correct: false, trapReason: "$12\\,\\Omega$ is the resistor $R$." }
            ]
          },
          {
            prompt: "Step 2: Compute total AC impedance $Z = \\sqrt{R^2 + (X_L - X_C)^2}$.",
            rule: "Impedance Triangle (Pythagoras)",
            result: "13 Ω",
            accepted: ["13ω", "13ohm", "13ohms", "13", "z=13"],
            numericTarget: 13,
            hint: "Recognize the 5-12-13 Pythagorean triple: $\\sqrt{12^2 + 5^2}$!",
            why: "$Z = \\sqrt{144 + 25} = \\sqrt{169} = 13\\,\\Omega$.",
            choices: [
              { expr: "13 Ω", correct: true },
              { expr: "17 Ω", correct: false, trapReason: "You added $12 + 5$ linearly instead of using Pythagoras $\\sqrt{12^2 + 5^2}$!" },
              { expr: "169 Ω", correct: false, trapReason: "Don't forget the square root of $169$!" },
              { expr: "43 Ω", correct: false, trapReason: "Never add $R + X_L + X_C$ straight together!" }
            ]
          },
          {
            prompt: "Step 3: Compute AC current $I_{\\text{rms}} = V_{\\text{rms}} / Z$.",
            rule: "AC Ohm's Law",
            result: "5 A",
            accepted: ["5a", "5", "i=5", "i=5a"],
            numericTarget: 5,
            hint: "Divide $65\\text{ V}$ by $Z = 13\\,\\Omega$.",
            why: "$I_{\\text{rms}} = \\frac{65}{13} = 5\\text{ A}$!",
            choices: [
              { expr: "5 A", correct: true },
              { expr: "5.4 A", correct: false, trapReason: "Divide by total impedance $Z = 13\\,\\Omega$, NOT just $R = 12\\,\\Omega$!" },
              { expr: "845 A", correct: false, trapReason: "Divide $V / Z$, don't multiply $V \\times Z$!" },
              { expr: "0.2 A", correct: false, trapReason: "You inverted the fraction ($Z/V$ instead of $V/Z$)." }
            ]
          }
        ]
      },
      {
        id: "wk-bohr-photon-jump",
        track: "physics",
        difficulty: "Core",
        xp: 45,
        gems: 10,
        linkedNodeId: "physics-quantum-debroglie-heisenberg-bohr",
        title: "Compute Hydrogen Balmer Photon Energy (n = 3 → n = 2)",
        given: "E_n = -\\frac{13.6\\text{ eV}}{n^2},\\quad \\text{Transition: } n = 3 \\to n = 2",
        goal: "Compute $E_3$, $E_2$, and the emitted red photon energy $\\Delta E = E_3 - E_2$.",
        steps: [
          {
            prompt: "Step 1: Compute $E_2 = -13.6 / 2^2$.",
            rule: "Bohr Energy Ladder",
            result: "-3.4 eV",
            accepted: ["-3.4ev", "-3.4", "e2=-3.4"],
            numericTarget: -3.4,
            hint: "Divide $-13.6$ by $4$.",
            why: "$E_2 = -13.6 / 4 = -3.4\\text{ eV}$.",
            choices: [
              { expr: "-3.4 eV", correct: true },
              { expr: "-6.8 eV", correct: false, trapReason: "Divide by $n^2 = 4$, NOT by $n = 2$!" },
              { expr: "+3.4 eV", correct: false, trapReason: "Bound electrons have NEGATIVE energy." },
              { expr: "-1.51 eV", correct: false, trapReason: "$-1.51\\text{ eV}$ is $E_3$, not $E_2$." }
            ]
          },
          {
            prompt: "Step 2: Compute $E_3 = -13.6 / 3^2$ (to 2 decimals).",
            rule: "Bohr Energy Ladder (n = 3)",
            result: "-1.51 eV",
            accepted: ["-1.51ev", "-1.51", "e3=-1.51"],
            numericTarget: -1.51,
            tol: 0.03,
            hint: "Divide $-13.6$ by $9$.",
            why: "$E_3 = -13.6 / 9 \\approx -1.51\\text{ eV}$.",
            choices: [
              { expr: "-1.51 eV", correct: true },
              { expr: "-4.53 eV", correct: false, trapReason: "Square $n = 3$ first: divide by $9$, not $3$!" },
              { expr: "+1.51 eV", correct: false, trapReason: "Bound energy levels remain negative." },
              { expr: "-0.85 eV", correct: false, trapReason: "$-0.85\\text{ eV}$ is $E_4$ ($-13.6/16$)." }
            ]
          },
          {
            prompt: "Step 3: Compute emitted photon energy $\\Delta E = E_3 - E_2$.",
            rule: "Photon Energy Conservation",
            result: "1.89 eV",
            accepted: ["1.89ev", "1.89", "+1.89ev"],
            numericTarget: 1.89,
            tol: 0.03,
            hint: "$(-1.51) - (-3.40) = 3.40 - 1.51$.",
            why: "$\\Delta E = 1.89\\text{ eV}$ — the famous crimson-red H-alpha line ($656\\text{ nm}$) seen in glowing nebulae!",
            choices: [
              { expr: "1.89 eV", correct: true },
              { expr: "4.91 eV", correct: false, trapReason: "Subtract $(-1.51) - (-3.40)$, don't add magnitudes!" },
              { expr: "-1.89 eV", correct: false, trapReason: "An emitted photon carries positive energy $+1.89\\text{ eV}$." },
              { expr: "10.2 eV", correct: false, trapReason: "$10.2\\text{ eV}$ is the $n=2 \\to n=1$ Lyman UV jump!" }
            ]
          }
        ]
      }
    );
  }

  // ==================== 15 PROCEDURAL GENERATORS (DATA.registerProceduralMap) ====================
  if (typeof DATA.registerProceduralMap === "function") {
    DATA.registerProceduralMap({
      "math-parametric-polar-curves": () => {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const pairs = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]];
          const [a, b, r] = pick(pairs);
          const sx = pick([-1, 1]) * a;
          const sy = pick([-1, 1]) * b;
          return {
            type: "mc",
            prompt: `Convert rectangular point \`(${sx}, ${sy})\` to polar radius \`r = √(x² + y²)\`.`,
            options: numOpts(r, [-2, -1, 1, 2, 3]),
            answer: String(r),
            hint: "Square both coordinates, add them, and take the square root!",
            whyEasy: `\`r = √((${sx})² + (${sy})²) = √(${a * a + b * b}) = ${r}\`!`
          };
        }
        if (mode === 1) {
          const n = pick([2, 3, 4, 5, 6, 7]);
          const petals = n % 2 === 0 ? 2 * n : n;
          const fn = pick(["cos", "sin"]);
          return {
            type: "mc",
            prompt: `How many petals does the polar rose curve \`r = 5 ${fn}(${n}θ)\` have?`,
            options: numOpts(petals, [n === petals ? n : -n, 1, 2, -1, 3]).map((v) => `${v} petals`),
            answer: `${petals} petals`,
            hint: "Odd `n` → `n` petals; Even `n` → `2n` petals!",
            whyEasy: `Since \`n = ${n}\` is ${n % 2 === 0 ? "even" : "odd"}, it has \`${petals}\` petals!`
          };
        }
        const a = randInt(2, 5);
        const t = randInt(1, 4);
        const slope = a * t;
        return {
          type: "mc",
          prompt: `A parametric curve has \`x(t) = t²\` and \`y(t) = ${a}t³\`. What is \`dy/dx = (dy/dt)/(dx/dt)\` at \`t = ${t}\`?`,
          options: numOpts((3 * a * t) / 2, [-3, -1.5, 1.5, 3, 4.5], (v) => String(v)),
          answer: String((3 * a * t) / 2),
          hint: "`dy/dt = " + (3 * a) + "t²` and `dx/dt = 2t`, so `dy/dx = " + (1.5 * a) + "t`!",
          whyEasy: `\`dy/dx = (${3 * a}t²)/(2t) = ${1.5 * a}t\`; at \`t = ${t}\` that equals \`${(3 * a * t) / 2}\` (check: \`${slope}\` scaled by 1.5)!`
        };
      },

      "math-number-theory-diophantine-modular": () => {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const primes = [[3, 5], [3, 7], [3, 11], [5, 7], [5, 11], [7, 11]];
          const [p, q] = pick(primes);
          const n = p * q;
          const phi = (p - 1) * (q - 1);
          return {
            type: "mc",
            prompt: `Compute Euler's totient \`φ(${n})\` given \`${n} = ${p} × ${q}\`.`,
            options: numOpts(phi, [-4, -2, 2, 4, p + q - phi]),
            answer: String(phi),
            hint: "For distinct primes `p` and `q`, `φ(pq) = (p − 1)(q − 1)`!",
            whyEasy: `\`φ(${n}) = (${p} − 1)(${q} − 1) = ${p - 1} × ${q - 1} = ${phi}\`!`
          };
        }
        if (mode === 1) {
          const a = pick([24, 30, 36, 42, 48, 54, 60]);
          const b = pick([14, 15, 18, 20, 21, 28]);
          const g = gcd(a, b);
          return {
            type: "mc",
            prompt: `Use the Euclidean Algorithm to find \`gcd(${a}, ${b})\`.`,
            options: numOpts(g, [1, 2, 3, -1, 4].filter((d) => g + d > 0)),
            answer: String(g),
            hint: "Replace the bigger number with `a mod b` repeatedly until reaching 0!",
            whyEasy: `\`gcd(${a}, ${b}) = gcd(${b}, ${a % b}) = ${g}\`!`
          };
        }
        const p = pick([5, 7, 11, 13]);
        const base = pick([2, 3, 4]);
        const fOpts = Array.from(new Set(["1", "0", String(base), String(p - 1), "2", "3"])).slice(0, 4);
        return {
          type: "mc",
          prompt: `Using Fermat's Little Theorem, compute \`${base}^${p - 1} mod ${p}\`.`,
          options: shuffle(fOpts),
          answer: "1",
          hint: "Whenever `p` is prime and `gcd(a, p) = 1`, `a^(p−1) ≡ 1 (mod p)`!",
          whyEasy: `Since \`${p}\` is prime and doesn't divide \`${base}\`, \`${base}^${p - 1} ≡ 1 (mod ${p})\`!`
        };
      },

      "math-hyperbolic-euler-complex": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const r = pick([2, 3]);
          const n = pick([3, 4]);
          const deg = pick([15, 30, 45]);
          const newR = Math.pow(r, n);
          const newDeg = deg * n;
          const ans = `${newR}∠${newDeg}°`;
          const opts = new Set([ans, `${r * n}∠${newDeg}°`, `${newR}∠${deg + n}°`, `${newR}∠${deg * (n + 1)}°`]);
          let extra = 1;
          while (opts.size < 4) {
            opts.add(`${newR + extra}∠${newDeg}°`);
            extra++;
          }
          return {
            type: "mc",
            prompt: `By De Moivre's Theorem, simplify \`(${r}∠${deg}°)^${n}\`.`,
            options: shuffle(Array.from(opts)),
            answer: ans,
            hint: "Raise the radius to the `n`-th power (`r^n`) and MULTIPLY the angle by `n` (`nθ`)!",
            whyEasy: `Radius = \`${r}^${n} = ${newR}\`, angle = \`${n} × ${deg}° = ${newDeg}°\` → \`${ans}\`!`
          };
        }
        return bankQ([
          { prompt: "What is the exact value of Euler's exponential `e^(iπ)`?", options: ["−1", "1", "i", "−i"], answer: "−1", hint: "`cos(π) + i sin(π)`!", whyEasy: "`cos π = −1` and `sin π = 0`, giving `e^(iπ) = −1` (`e^(iπ) + 1 = 0`)!" },
          { prompt: "What is `cosh(x) + sinh(x)` equal to for any real `x`?", options: ["e^x", "e^(−x)", "1", "2e^x"], answer: "e^x", hint: "Add `(e^x + e^(−x))/2 + (e^x − e^(−x))/2`!", whyEasy: "The `e^(−x)` terms cancel, leaving `2e^x / 2 = e^x`!" },
          { prompt: "What is `cosh²(x) − sinh²(x)` equal to?", options: ["1", "0", "−1", "e^(2x)"], answer: "1", hint: "Every `(cosh x, sinh x)` point lies on the unit hyperbola `X² − Y² = 1`!", whyEasy: "Always `1` for every real or complex `x`!" },
          { prompt: "What is the derivative `d/dx [sinh(x)]`?", options: ["cosh(x)", "−cosh(x)", "sinh(x)", "tanh(x)"], answer: "cosh(x)", hint: "Differentiate `(e^x − e^(−x))/2`!", whyEasy: "`(e^x + e^(−x))/2 = cosh(x)`!" }
        ]);
      },

      "math-taylor-maclaurin-power-series": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const k = randInt(2, 9);
          return {
            type: "mc",
            prompt: `Evaluate \`lim_(x→0) sin(${k}x) / x\` using L'Hôpital's Rule or the Maclaurin series of \`sin(u) ≈ u\`.`,
            options: numOpts(k, [-2, -1, 1, 2, 3].filter((d) => k + d >= 0)),
            answer: String(k),
            hint: "`sin(kx) ≈ kx` near `x = 0`, or differentiate top (`k cos(kx)`) and bottom (`1`)!",
            whyEasy: `\`lim_(x→0) (${k} cos(${k}x)) / 1 = ${k}\`!`
          };
        }
        return bankQ([
          { prompt: "Which Maclaurin series starts `1 − x²/2! + x⁴/4! − x⁶/6! + ...`?", options: ["cos(x)", "sin(x)", "e^x", "ln(1 + x)"], answer: "cos(x)", hint: "Even powers with alternating signs!", whyEasy: "`cos(x)` is an even function with `cos(0) = 1`, matching `1 − x²/2! + x⁴/4! − ...`!" },
          { prompt: "What is the exact coefficient of `x³` in the Maclaurin series of `e^x`?", options: ["1/6 (since 3! = 6)", "1/3", "3", "−1/6"], answer: "1/6 (since 3! = 6)", hint: "In `e^x = Σ x^n / n!`, plug `n = 3`!", whyEasy: "`1 / 3! = 1 / 6`!" },
          { prompt: "In the Ratio Test, if `lim |a_(n+1) / a_n| = 1/3`, what do we conclude?", options: ["The series CONVERGES absolutely (L = 1/3 < 1!)", "The series DIVERGES", "The test is inconclusive", "The sum equals 1/3"], answer: "The series CONVERGES absolutely (L = 1/3 < 1!)", hint: "Ratio Test: `L < 1` converges, `L > 1` diverges, `L = 1` inconclusive!", whyEasy: "Since `1/3 < 1`, terms shrink exponentially and the series converges!" },
          { prompt: "Evaluate `lim_(x→0) (1 − cos x) / x²` using `cos x ≈ 1 − x²/2` (or L'Hôpital twice).", options: ["1/2", "1", "0", "2"], answer: "1/2", hint: "Replace `1 − cos x` with `x²/2`!", whyEasy: "`(x²/2) / x² = 1/2` in one second!" }
        ]);
      },

      "math-differential-equations-models": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const K = pick([400, 600, 800, 1200, 2000, 5000]);
          const half = K / 2;
          return {
            type: "mc",
            prompt: `A logistic population obeys \`dP/dt = 0.2 P (1 − P/${K})\`. At what population \`P\` is growth rate \`dP/dt\` FASTEST?`,
            options: numOpts(half, [-half / 2, half, half / 2, -half + 100]),
            answer: String(half),
            hint: "Logistic growth always peaks at half the carrying capacity (`K/2`)!",
            whyEasy: `\`K / 2 = ${K} / 2 = ${half}\`!`
          };
        }
        const r1 = randInt(1, 5);
        const r2 = r1 + randInt(1, 4);
        const b = -(r1 + r2);
        const c = r1 * r2;
        const ans = `C₁e^(${r1}t) + C₂e^(${r2}t)`;
        return {
          type: "mc",
          prompt: `Solve the 2nd-order ODE \`y'' ${b}y' + ${c}y = 0\`.`,
          options: shuffle([ans, `C₁e^(−${r1}t) + C₂e^(−${r2}t)`, `C₁cos(${r1}t) + C₂sin(${r2}t)`, `(C₁ + C₂t)e^(${r1}t)`]),
          answer: ans,
          hint: `Factor the characteristic quadratic \`r² ${b}r + ${c} = (r − ${r1})(r − ${r2}) = 0\`!`,
          whyEasy: `Real roots \`r = ${r1}, ${r2}\` give \`${ans}\`!`
        };
      },

      "math-eigenvalues-svd-orthogonality": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const l1 = randInt(2, 6);
          const l2 = l1 + randInt(1, 5);
          const tr = l1 + l2;
          const det = l1 * l2;
          const ans = `${l1} and ${l2}`;
          const eOpts = Array.from(new Set([ans, `${l1 + 1} and ${l2 + 1}`, `−${l1} and −${l2}`, `1 and ${det}`, `${l1} and ${tr}`])).slice(0, 4);
          return {
            type: "mc",
            prompt: `A 2×2 matrix has Trace = \`${tr}\` and Determinant = \`${det}\`. What are its two eigenvalues?`,
            options: shuffle(eOpts),
            answer: ans,
            hint: "Find two numbers that ADD to Trace and MULTIPLY to Determinant!",
            whyEasy: `\`${l1} + ${l2} = ${tr}\` and \`${l1} × ${l2} = ${det}\`!`
          };
        }
        const lam = randInt(2, 5);
        const k = pick([2, 3]);
        const ans = Math.pow(lam, k);
        return {
          type: "mc",
          prompt: `If \`v\` is an eigenvector of \`A\` with eigenvalue \`λ = ${lam}\`, then \`A^${k} v\` equals:`,
          options: numOpts(ans, [-lam, lam, ans - lam * k || 2, 1]).map((v) => `${v}v`),
          answer: `${ans}v`,
          hint: "Each multiplication by `A` scales `v` by `λ`, so `A^k v = λ^k v`!",
          whyEasy: `\`${lam}^${k} v = ${ans}v\`!`
        };
      },

      "math-vector-calculus-grad-div-curl": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const a = randInt(1, 6);
          const b = randInt(-5, 5);
          const c = randInt(1, 6);
          const div = a + b + c;
          return {
            type: "mc",
            prompt: `Compute the divergence \`∇ · F\` of \`F(x, y, z) = (${a}x, ${b}y, ${c}z)\`.`,
            options: numOpts(div, [-3, -1, 1, 2, 4]),
            answer: String(div),
            hint: "Add `∂P/∂x + ∂Q/∂y + ∂R/∂z`!",
            whyEasy: `\`${a} + (${b}) + ${c} = ${div}\`!`
          };
        }
        const a = randInt(2, 6);
        const b = randInt(1, 5);
        const curl = a + b;
        return {
          type: "mc",
          prompt: `Compute the 2D scalar curl (\`∂Q/∂x − ∂P/∂y\`) of \`F(x, y) = (−${b}y, ${a}x)\`.`,
          options: numOpts(curl, [-2 * b, -1, 1, 2, -2]),
          answer: String(curl),
          hint: "`∂Q/∂x = " + a + "` and `∂P/∂y = −" + b + "` — watch the double minus!",
          whyEasy: `\`${a} − (−${b}) = ${curl}\`!`
        };
      },

      "math-probability-distributions-clt": () => {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const sd = pick([12, 16, 20, 24, 30, 40]);
          const rootN = pick([2, 4, 5, 10]);
          const n = rootN * rootN;
          const se = sd / rootN;
          return {
            type: "mc",
            prompt: `A population has \`σ = ${sd}\`. What is the Standard Error \`SE = σ / √n\` for sample size \`n = ${n}\`?`,
            options: numOpts(se, [-1, 1, 2, sd - se]),
            answer: String(se),
            hint: "Divide `σ` by `√n` (NOT by `n`)!",
            whyEasy: `\`SE = ${sd} / √${n} = ${sd} / ${rootN} = ${se}\`!`
          };
        }
        if (mode === 1) {
          const a = randInt(2, 5);
          const v = randInt(2, 6);
          const ans = a * a * v;
          return {
            type: "mc",
            prompt: `If \`Var(X) = ${v}\`, what is \`Var(${a}X + 7)\`?`,
            options: numOpts(ans, [a * v - ans, 7, -v, v]),
            answer: String(ans),
            hint: "Use `Var(aX + b) = a² Var(X)`!",
            whyEasy: `\`${a}² × ${v} = ${ans}\` (adding 7 adds zero variance)!`
          };
        }
        const pDen = pick([4, 5, 10, 20, 25]);
        return {
          type: "mc",
          prompt: `A Geometric process succeeds with probability \`p = 1/${pDen}\` on each try. What is the expected wait \`E[X] = 1/p\`?`,
          options: numOpts(pDen, [-2, -1, 1, 2, 5]),
          answer: String(pDen),
          hint: "Expected trials until first success is simply `1/p`!",
          whyEasy: `\`E[X] = 1 / (1/${pDen}) = ${pDen}\` trials on average!`
        };
      },

      "physics-wave-optics-interference-diffraction": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const i0 = pick([40, 80, 120, 160, 200]);
          const angle = pick([0, 60, 90]);
          const cos2 = angle === 0 ? 1 : angle === 60 ? 0.25 : 0;
          const ans = i0 * cos2;
          return {
            type: "mc",
            prompt: `Already-polarized light of intensity \`${i0} W/m²\` hits an analyzer tilted at \`θ = ${angle}°\`. What intensity passes through (Malus \`I = I₀ cos²θ\`)?`,
            options: numOpts(ans, [i0 / 2 - ans || 10, 20, 30, i0 - ans || 15].filter((d) => ans + d >= 0)).map((v) => `${v} W/m²`),
            answer: `${ans} W/m²`,
            hint: "Multiply `I₀` by `(cos θ)²` (`cos 60° = 0.5 → 0.25`)!",
            whyEasy: `\`${i0} × cos²(${angle}°) = ${i0} × ${cos2} = ${ans} W/m²\`!`
          };
        }
        return bankQ([
          { prompt: "In Young's Double-Slit (`Δy = λL / d`), if you DOUBLE the screen distance `L`, fringe spacing `Δy`:", options: ["Doubles (2×)", "Cuts in half", "Quadruples", "Stays unchanged"], answer: "Doubles (2×)", hint: "`L` is in the numerator of `Δy = λL / d`!", whyEasy: "Twice as far away gives waves twice as much space to spread → `2×` wider fringes!" },
          { prompt: "In a single-slit diffraction pattern, `a sin θ = mλ` (`m = ±1, ±2...`) locates the:", options: ["DARK minima (destructive interference!)", "Bright maxima", "Brewster polarization angles", "Critical TIR angles"], answer: "DARK minima (destructive interference!)", hint: "Careful! Opposite of double-slit — `a sin θ = mλ` gives DARK bands in a single slit!", whyEasy: "When the slit splits into `2m` equal canceling zones, destructive DARK fringes form!" },
          { prompt: "Which light color produces the WIDEST fringe spacing `Δy = λL / d` through the same double slit?", options: ["Red light (longest wavelength λ!)", "Violet light", "Blue light", "All colors have identical spacing"], answer: "Red light (longest wavelength λ!)", hint: "Check `λ` in the numerator of `Δy = λL / d`!", whyEasy: "Red has the longest visible wavelength (`~700 nm`), so it spreads out widest!" },
          { prompt: "At Brewster's Angle (`tan θ_B = n₂ / n₁`), the reflected glare ray and refracted ray meet at what exact angle?", options: ["90° (perpendicular!)", "45°", "180°", "0°"], answer: "90° (perpendicular!)", hint: "Brewster's condition occurs right when `θ_B + θ_r = 90°`!", whyEasy: "Because the reflected ray is `90°` to the refracted ray, parallel electric oscillations can't radiate along the reflected beam!" }
        ]);
      },

      "physics-elasticity-stress-strain-materials": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const f = pick([200, 400, 600, 800, 1000]);
          const a = pick([0.01, 0.02, 0.04, 0.05]);
          const stress = Math.round(f / a);
          return {
            type: "mc",
            prompt: `A rod of area \`A = ${a} m²\` supports a tensile force \`F = ${f} N\`. Calculate tensile stress \`σ = F/A\`.`,
            options: numOpts(stress, [-stress / 2, stress, -5000, 5000].filter((d) => stress + d > 0)).map((v) => `${v} Pa`),
            answer: `${stress} Pa`,
            hint: "Divide force `F` by area `A`!",
            whyEasy: `\`σ = ${f} / ${a} = ${stress} Pa\`!`
          };
        }
        return bankQ([
          { prompt: "In `ΔL = FL₀ / (EA)`, doubling BOTH wire length `L₀` and force `F` multiplies the stretch `ΔL` by:", options: ["4× (2 × 2)", "2×", "1× (cancels)", "1/4×"], answer: "4× (2 × 2)", hint: "Both `F` and `L₀` sit in the numerator!", whyEasy: "Twice the pull AND twice the length gives `2 × 2 = 4×` the stretch!" },
          { prompt: "What happens to the elastic energy density `u = ½ E ε²` if strain `ε` triples (within the elastic limit)?", options: ["Increases 9× (3² = 9!)", "Increases 3×", "Increases 6×", "Cuts to 1/3"], answer: "Increases 9× (3² = 9!)", hint: "Strain `ε` is SQUARED!", whyEasy: "`u ∝ ε²`, so `3×` strain stores `3² = 9×` energy density!" },
          { prompt: "If a solid cube's linear expansion coefficient is `α`, its volume expansion coefficient `β` is approximately:", options: ["3α", "2α", "α³", "α / 3"], answer: "3α", hint: "A 3D cube expands along length, width, AND height!", whyEasy: "`(1 + αΔT)³ ≈ 1 + 3αΔT`, so `β ≈ 3α`!" },
          { prompt: "Which modulus measures a fluid's or solid's resistance to uniform 3D pressure squeezing (`−ΔP / (ΔV/V₀)`)?", options: ["Bulk Modulus (B)", "Young's Modulus (E)", "Shear Modulus (G)", "Poisson Ratio"], answer: "Bulk Modulus (B)", hint: "Volume compression = 'Bulk'!", whyEasy: "Young's = stretch; Shear = sideways twist; **Bulk** = 3D pressure squeeze!" }
        ]);
      },

      "physics-heat-transfer-radiation-blackbody": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const factor = pick([2, 3]);
          const pScale = Math.pow(factor, 4);
          return {
            type: "mc",
            prompt: `A glowing hot furnace's Kelvin temperature increases by \`${factor}×\`. By Stefan-Boltzmann (\`P = εσAT⁴\`), its radiated power increases by:`,
            options: numOpts(pScale, [-pScale / 2, factor * factor - pScale, factor - pScale, 8].filter((d) => pScale + d > 0)).map((v) => `${v}×`),
            answer: `${pScale}×`,
            hint: `Raise the Kelvin temperature factor \`${factor}\` to the 4th power!`,
            whyEasy: `\`${factor}⁴ = ${pScale}×\` radiated power!`
          };
        }
        return bankQ([
          { prompt: "Which heat transfer mechanism works across the **empty vacuum of outer space**?", options: ["Radiation (electromagnetic waves!)", "Conduction", "Convection", "Both conduction and convection"], answer: "Radiation (electromagnetic waves!)", hint: "Conduction and convection need matter/molecules!", whyEasy: "Only Radiation needs no medium — that's how sunlight reaches Earth!" },
          { prompt: "Why are hot blue stars hotter than red stars by Wien's Law (`λ_max · T = const`)?", options: ["Blue light has a shorter wavelength λ_max, which requires a higher Kelvin temperature T!", "Blue photons move faster than c", "Red stars are always bigger", "Blue light has lower frequency"], answer: "Blue light has a shorter wavelength λ_max, which requires a higher Kelvin temperature T!", hint: "Shorter `λ_max` = Higher `T`!", whyEasy: "`T = b / λ_max` — shorter blue wavelengths signal hotter surface temperatures!" },
          { prompt: "In Fourier's Conduction Law (`P = kAΔT/L`), what happens to heat transfer rate if you DOUBLE window area `A` and HALVE glass thickness `L`?", options: ["Increases 4×!", "Stays the same", "Doubles (2×)", "Cuts to 1/4"], answer: "Increases 4×!", hint: "`2 / (1/2) = 4`!", whyEasy: "Bigger area (`2×`) AND thinner glass (`2×`) combine for `4×` heat loss!" },
          { prompt: "A perfect matte-black absorber and emitter has emissivity `ε` equal to:", options: ["1 (ideal blackbody)", "0 (perfect mirror)", "0.5", "∞"], answer: "1 (ideal blackbody)", hint: "Emissivity runs from `0` (mirror) to `1` (perfect blackbody)!", whyEasy: "Good absorbers are good emitters — an ideal blackbody has `ε = 1`!" }
        ]);
      },

      "physics-rc-rl-rlc-circuits-impedance": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]];
          const [r, xNet, z] = pick(triples);
          const xc = randInt(2, 8);
          const xl = xc + xNet;
          return {
            type: "mc",
            prompt: `Find the total impedance \`Z\` of a series RLC circuit with \`R = ${r} Ω\`, \`X_L = ${xl} Ω\`, and \`X_C = ${xc} Ω\`.`,
            options: numOpts(z, [r + xNet - z, -2, 2, 4].filter((d) => z + d > 0)).map((v) => `${v} Ω`),
            answer: `${z} Ω`,
            hint: "Compute `X_L − X_C`, then take `Z = √(R² + (X_L − X_C)²)`!",
            whyEasy: `\`X_L − X_C = ${xNet} Ω\`, and \`√(${r}² + ${xNet}²) = ${z} Ω\`!`
          };
        }
        return bankQ([
          { prompt: "What is the time constant `τ` of an RL (resistor-inductor) circuit?", options: ["τ = L / R", "τ = R · L", "τ = R / L", "τ = √(LC)"], answer: "τ = L / R", hint: "More inductance `L` slows changes; more resistance `R` dissipates energy faster!", whyEasy: "`τ = L / R` (whereas RC is `τ = R · C`)!" },
          { prompt: "If you QUADRUPLE the capacitance `C` in an RLC resonator (`f₀ = 1/(2π√(LC))`), what happens to its resonant frequency `f₀`?", options: ["Cuts in HALF (1/√4 = 1/2!)", "Doubles (2×)", "Cuts to 1/4", "Quadruples (4×)"], answer: "Cuts in HALF (1/√4 = 1/2!)", hint: "`C` sits inside the square root in the denominator!", whyEasy: "`1 / √4 = 1/2` — heavier capacitance slows oscillation frequency in half!" },
          { prompt: "As AC frequency `f → 0` (pure DC), an ideal Inductor's reactance `X_L = 2πfL` approaches:", options: ["0 Ω (acts like a plain wire for steady DC!)", "∞ Ω (open circuit)", "R", "1 Ω"], answer: "0 Ω (acts like a plain wire for steady DC!)", hint: "Plug `f = 0` into `X_L = 2πfL`!", whyEasy: "With steady DC current (`dI/dt = 0`), an inductor induces zero back-EMF (`X_L = 0`)!" },
          { prompt: "A charged capacitor discharges through a resistor (`V(t) = V₀ e^(−t/τ)`). Roughly what percent of voltage remains after `t = 1τ`?", options: ["36.8% (1/e)", "63.2% (1 − 1/e)", "50.0%", "0%"], answer: "36.8% (1/e)", hint: "Evaluate `e^(−1) ≈ 0.368`!", whyEasy: "During DISCHARGE, `1/e ≈ 36.8%` remains after 1 time constant!" }
        ]);
      },

      "physics-special-relativity-lorentz-energy": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const cases = [
            { v: "0.6c", g: 1.25, t0: 8, t: 10, l0: 50, l: 40 },
            { v: "0.6c", g: 1.25, t0: 12, t: 15, l0: 100, l: 80 },
            { v: "0.8c", g: 5 / 3, t0: 9, t: 15, l0: 150, l: 90 },
            { v: "0.8c", g: 5 / 3, t0: 6, t: 10, l0: 200, l: 120 }
          ];
          const c = pick(cases);
          return {
            type: "mc",
            prompt: `A rocket of rest length \`L₀ = ${c.l0} m\` zooms past Earth at \`v = ${c.v}\`. What contracted length \`L = L₀/γ\` does Earth measure?`,
            options: numOpts(c.l, [-10, 10, 20, c.l0 - c.l].filter((d) => c.l + d > 0)).map((v) => `${v} m`),
            answer: `${c.l} m`,
            hint: `Compute \`√(1 − v²/c²)\` and multiply by \`L₀ = ${c.l0} m\`!`,
            whyEasy: `\`L = ${c.l0} / γ = ${c.l} m\` (moving lengths always contract)!`
          };
        }
        return bankQ([
          { prompt: "What is the relativistic kinetic energy `K` of a particle of rest mass `m` moving with Lorentz factor `γ`?", options: ["K = (γ − 1) m c²", "K = γ m c²", "K = ½ γ m c²", "K = m c² / γ"], answer: "K = (γ − 1) m c²", hint: "Total energy `γmc²` minus rest energy `mc²`!", whyEasy: "`K = E_total − E_rest = γmc² − mc² = (γ − 1)mc²`!" },
          { prompt: "A particle has `γ = 3`. Its kinetic energy `K = (γ − 1)mc²` equals how many times its rest energy `mc²`?", options: ["2 mc² (since γ − 1 = 3 − 1 = 2!)", "3 mc²", "9 mc²", "1 mc²"], answer: "2 mc² (since γ − 1 = 3 − 1 = 2!)", hint: "Subtract 1 for rest mass energy!", whyEasy: "`(3 − 1)mc² = 2 mc²`!" },
          { prompt: "Which quantity is **INVARIANT** (the exact same value for every inertial observer in Special Relativity)?", options: ["The speed of light c AND rest mass m (via E² − (pc)² = (mc²)²)", "Time interval Δt", "Length L along motion", "Simultaneity of distant events"], answer: "The speed of light c AND rest mass m (via E² − (pc)² = (mc²)²)", hint: "Time and length stretch/shrink, but `c` and rest mass stay absolute!", whyEasy: "Einstein's invariant spacetime physics keeps `c` and `E² − (pc)² = (mc²)²` universal!" },
          { prompt: "Why can no object with non-zero rest mass `m > 0` ever reach the speed of light `c`?", options: ["As v → c, γ → ∞, requiring infinite kinetic energy!", "Gravity stops rockets at 0.5c", "Photons push them backward", "Time reverses at v = 0.9c"], answer: "As v → c, γ → ∞, requiring infinite kinetic energy!", hint: "Look at `γ = 1/√(1 − v²/c²)` as `v → c`!", whyEasy: "The denominator hits `0`, sending `γ` and required energy `K = (γ−1)mc²` to infinity!" }
        ]);
      },

      "physics-quantum-debroglie-heisenberg-bohr": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const n = pick([2, 3, 4, 5]);
          const e1 = pick([1, 2, 3]);
          const en = n * n * e1;
          return {
            type: "mc",
            prompt: `A quantum particle in a 1D box (\`E_n = n² E₁\`) has ground energy \`E₁ = ${e1} eV\`. What is \`E_${n}\`?`,
            options: numOpts(en, [n * e1 - en, -2, 2, 4].filter((d) => en + d > 0)).map((v) => `${v} eV`),
            answer: `${en} eV`,
            hint: "Multiply `E₁` by `n²`!",
            whyEasy: `\`E_${n} = ${n}² × ${e1} = ${n * n} × ${e1} = ${en} eV\`!`
          };
        }
        return bankQ([
          { prompt: "How much energy is needed to completely ionize a ground-state Hydrogen atom (`n = 1` at `−13.6 eV` to `n = ∞` at `0 eV`)?", options: ["13.6 eV", "3.4 eV", "10.2 eV", "27.2 eV"], answer: "13.6 eV", hint: "Raise it from `−13.6 eV` up to `0 eV`!", whyEasy: "`0 − (−13.6) = 13.6 eV` is Hydrogen's ionization energy!" },
          { prompt: "If an electron and a heavy proton travel at the EXACT same speed `v`, which has the LONGER de Broglie wavelength (`λ = h / (mv)`)?", options: ["The electron (1836× smaller mass → 1836× longer wavelength!)", "The proton", "Both have identical wavelengths", "Neither has a wavelength"], answer: "The electron (1836× smaller mass → 1836× longer wavelength!)", hint: "Mass `m` is in the denominator of `λ = h/(mv)`!", whyEasy: "Smaller mass = smaller momentum = much longer matter wavelength!" },
          { prompt: "Why does a quantum particle trapped in a 1D box NEVER have zero energy (`E₁ > 0`)?", options: ["Zero energy would mean exact p = 0 (Δp = 0) inside finite Δx = L, violating Heisenberg's Δx·Δp ≥ ℏ/2!", "Friction warms the box", "Gravity lifts the particle", "Boxes always have negative temperature"], answer: "Zero energy would mean exact p = 0 (Δp = 0) inside finite Δx = L, violating Heisenberg's Δx·Δp ≥ ℏ/2!", hint: "Confining `Δx ≤ L` forces non-zero momentum spread `Δp`!", whyEasy: "Quantum confinement guarantees non-zero **Zero-Point Energy**!" },
          { prompt: "In `E_n = −13.6 eV / n²`, what is the energy of Hydrogen's `n = 4` orbit?", options: ["−0.85 eV (−13.6 / 16)", "−3.40 eV", "−1.51 eV", "−0.54 eV"], answer: "−0.85 eV (−13.6 / 16)", hint: "Divide `−13.6` by `4² = 16`!", whyEasy: "`−13.6 / 16 = −0.85 eV`!" }
        ]);
      },

      "physics-fluid-viscosity-poiseuille-reynolds": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const mult = pick([2, 3]);
          const qScale = Math.pow(mult, 4);
          return {
            type: "mc",
            prompt: `Widening a pipe's radius by \`${mult}×\` (same length, fluid & \`ΔP\`) multiplies Poiseuille laminar flow \`Q\` by:`,
            options: numOpts(qScale, [mult * mult - qScale, mult * mult * mult - qScale, mult - qScale, 4].filter((d) => qScale + d > 0)).map((v) => `${v}×`),
            answer: `${qScale}×`,
            hint: "Poiseuille's flow rate scales as `r⁴`!",
            whyEasy: `\`${mult}⁴ = ${qScale}×\` the laminar flow rate!`
          };
        }
        return bankQ([
          { prompt: "Which change makes pipe flow MORE likely to turn **turbulent** (`Re = ρvD / η > 4000`)?", options: ["Increasing fluid speed v or lowering viscosity η", "Making the fluid thicker (higher η)", "Slowing speed v down to a crawl", "Using a super-narrow capillary tube (tiny D)"], answer: "Increasing fluid speed v or lowering viscosity η", hint: "Look at numerator (`ρvD`) vs denominator (`η`)!", whyEasy: "Fast speed (`v ↑`) and runny low viscosity (`η ↓`) push Reynolds number `Re` upward!" },
          { prompt: "Why does a soap bubble have pressure excess `ΔP = 4γ/r`, whereas a liquid droplet in air has `ΔP = 2γ/r`?", options: ["A hollow soap bubble has TWO air-liquid surfaces (inner AND outer skin)!", "Soap has twice the density of water", "Bubbles are twice as hot", "Gravity cancels on droplets"], answer: "A hollow soap bubble has TWO air-liquid surfaces (inner AND outer skin)!", hint: "Count how many liquid-air interfaces pull inward!", whyEasy: "Two curved skins pull twice as hard → `2 × (2γ/r) = 4γ/r`!" },
          { prompt: "In Poiseuille's Law (`Q = πΔPr⁴/(8ηL)`), doubling the viscosity `η` (e.g., thicker cold blood) does what to flow rate `Q`?", options: ["Cuts flow rate in HALF (½Q)", "Doubles flow rate", "Cuts flow rate to 1/16", "Has zero effect"], answer: "Cuts flow rate in HALF (½Q)", hint: "`η` is in the denominator to the first power!", whyEasy: "Twice as syrupy (`2η`) = half as much volume flowing per second!" },
          { prompt: "Why does water climb UP a thin glass capillary tube (`cos θ > 0`) while mercury gets pushed DOWN (`cos θ < 0`)?", options: ["Water sticks stronger to glass (adhesion > cohesion), while mercury sticks stronger to itself (cohesion > adhesion)!", "Mercury has zero mass", "Glass repels water", "Atmospheric pressure doesn't act on mercury"], answer: "Water sticks stronger to glass (adhesion > cohesion), while mercury sticks stronger to itself (cohesion > adhesion)!", hint: "Concave meniscus (`θ < 90°`) pulls up; convex meniscus (`θ > 90°`) pushes down!", whyEasy: "Adhesive water wets glass and climbs; cohesive mercury beads up and depresses!" }
        ]);
      }
    });
  }

  // ==================== 15 CURATED OFFLINE-LATEX WORKED EXAMPLES ====================
  if (LATEX && typeof LATEX.registerWorkedExamples === "function") {
    LATEX.registerWorkedExamples({
      "math-parametric-polar-curves": {
        heroFormula: "$$x = r\\cos\\theta,\\quad y = r\\sin\\theta,\\quad \\frac{dy}{dx} = \\frac{dy/dt}{dx/dt},\\quad A = \\frac{1}{2}\\int_{\\alpha}^{\\beta} r^2\\,d\\theta$$",
        title: "Finding Parametric Slope & Polar Conversion Cleanly",
        problemLatex: "$$\\text{(A) } x(t)=t^2,\\; y(t)=t^3 \\implies \\frac{dy}{dx}\\Big|_{t=2}; \\qquad \\text{(B) Polar } (6, 60^{\\circ}) \\to (x, y)$$",
        steps: [
          { label: "Differentiate `x(t)` and `y(t)` with respect to `t`", mathLatex: "$\\frac{dx}{dt} = 2t, \\qquad \\frac{dy}{dt} = 3t^2$", plainWhy: "Treat `t` as a stopwatch tracking horizontal and vertical speeds separately." },
          { label: "Divide speeds to get Cartesian slope `dy/dx`", mathLatex: "$\\frac{dy}{dx} = \\frac{3t^2}{2t} = \\frac{3}{2}t \\implies \\frac{3}{2}(2) = \\mathbf{3}$", plainWhy: "No need to eliminate `t` just to find tangent slope!" },
          { label: "Project polar `(6, 60°)` onto `x` and `y`", mathLatex: "$x = 6\\cos 60^{\\circ} = \\mathbf{3}, \\qquad y = 6\\sin 60^{\\circ} = \\mathbf{3\\sqrt{3}}$", plainWhy: "Quick radius check: `3² + (3√3)² = 9 + 27 = 36 = 6²` ✓!" }
        ],
        answerLatex: "$$\\frac{dy}{dx} = 3; \\qquad (x, y) = (3,\\; 3\\sqrt{3})$$",
        commonTrap: "Never forget the `½` in Polar Area `A = ½ ∫ r² dθ` — polar strips are thin triangles (`½ r · r dθ`), not rectangles!"
      },
      "math-number-theory-diophantine-modular": {
        heroFormula: "$$\\gcd(a,b)\\cdot\\lcm(a,b) = ab, \\qquad a^{p-1} \\equiv 1 \\pmod{p}, \\qquad \\phi(pq) = (p-1)(q-1)$$",
        title: "Reducing Huge Modular Exponents with Fermat's Little Theorem",
        problemLatex: "$$\\text{Compute } 5^{62} \\pmod{7}$$",
        steps: [
          { label: "Apply Fermat's Little Theorem for prime `p = 7`", mathLatex: "$5^{7-1} = 5^6 \\equiv 1 \\pmod{7}$", plainWhy: "Since `7` is prime and doesn't divide `5`, powers of 5 reset to `1` every 6 steps!" },
          { label: "Split the exponent `62` by multiples of `6`", mathLatex: "$62 = 6(10) + 2 \\implies 5^{62} = (5^6)^{10} \\cdot 5^2 \\equiv 1^{10} \\cdot 25 \\pmod{7}$", plainWhy: "Every block of `5^6` vanishes cleanly into `1`!" },
          { label: "Reduce `25 mod 7`", mathLatex: "$25 = 3(7) + 4 \\implies 5^{62} \\equiv \\mathbf{4} \\pmod{7}$", plainWhy: "A 44-digit number reduced in 10 seconds with zero calculator!" }
        ],
        answerLatex: "$$5^{62} \\equiv 4 \\pmod{7}$$",
        commonTrap: "Fermat's `a^(p−1) ≡ 1 (mod p)` ONLY works when `p` is PRIME and `p` does not divide `a` — use Euler's `φ(n)` for composite moduli!"
      },
      "math-hyperbolic-euler-complex": {
        heroFormula: "$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta, \\qquad \\cosh x = \\frac{e^x + e^{-x}}{2}, \\qquad \\cosh^2 x - \\sinh^2 x = 1$$",
        title: "Computing `(1 + i)^8` Effortlessly with Euler & De Moivre",
        problemLatex: "$$\\text{Evaluate } (1 + i)^8 \\text{ without expanding 8 brackets!}$$",
        steps: [
          { label: "Convert `1 + i` to Polar / Euler form", mathLatex: "$r = \\sqrt{1^2 + 1^2} = \\sqrt{2}, \\quad \\theta = 45^{\\circ} = \\frac{\\pi}{4} \\implies 1 + i = \\sqrt{2}\\,e^{i\\pi/4}$", plainWhy: "`(1, 1)` sits at 45° with diagonal length `√2`." },
          { label: "Apply De Moivre (power `r`, multiply `θ`)", mathLatex: "$(1 + i)^8 = (\\sqrt{2})^8 \\, e^{i(8 \\cdot \\pi/4)} = 2^4 \\, e^{i 2\\pi}$", plainWhy: "`(√2)^8 = (2^(1/2))^8 = 2^4 = 16`, and `8 × 45° = 360° = 2π`!" },
          { label: "Evaluate `e^(i·2π)`", mathLatex: "$16(\\cos 2\\pi + i\\sin 2\\pi) = 16(1 + 0i) = \\mathbf{16}$", plainWhy: "Eight 45° turns land right back on the positive real axis!" }
        ],
        answerLatex: "$$(1 + i)^8 = 16$$",
        commonTrap: "Never drop the minus sign in `cosh²x − sinh²x = 1`, and remember `(cosh x)' = +sinh x` (unlike `(cos x)' = −sin x`)!"
      },
      "math-taylor-maclaurin-power-series": {
        heroFormula: "$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n, \\qquad e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}, \\qquad \\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots$$",
        title: "Crushing a Tough 0/0 Limit in 1 Line Using Maclaurin Series",
        problemLatex: "$$\\lim_{x \\to 0} \\frac{\\sin x - x}{x^3} = \\text{?}$$",
        steps: [
          { label: "Check indeterminate form first", mathLatex: "$x = 0 \\implies \\frac{0 - 0}{0} = \\frac{0}{0} \\;(\\text{valid for Series or L'Hôpital!})$", plainWhy: "Always confirm `0/0` before transforming." },
          { label: "Substitute Maclaurin expansion of `sin x`", mathLatex: "$\\sin x - x = \\left(x - \\frac{x^3}{6} + \\frac{x^5}{120} - \\dots\\right) - x = -\\frac{x^3}{6} + \\frac{x^5}{120} - \\dots$", plainWhy: "The linear `x` terms cancel cleanly!" },
          { label: "Divide by `x³` and send `x → 0`", mathLatex: "$\\lim_{x \\to 0} \\left(-\\frac{1}{6} + \\frac{x^2}{120} - \\dots\\right) = \\mathbf{-\\frac{1}{6}}$", plainWhy: "Instant answer — saves doing L'Hôpital's Rule three times in a row!" }
        ],
        answerLatex: "$$-\\frac{1}{6}$$",
        commonTrap: "Never forget `n!` in the denominator (`3! = 6`, not `3`), and NEVER run L'Hôpital when direct substitution already gives a finite answer!"
      },
      "math-differential-equations-models": {
        heroFormula: "$$\\frac{dP}{dt} = rP\\left(1 - \\frac{P}{K}\\right), \\qquad \\mu(x) = e^{\\int P(x)\\,dx}, \\qquad ar^2 + br + c = 0$$",
        title: "Solving a 1st-Order Linear ODE Using an Integrating Factor",
        problemLatex: "$$\\text{Solve } y' + 2y = 6e^x$$",
        steps: [
          { label: "Build Integrating Factor `μ(x) = e^(∫ P(x) dx)`", mathLatex: "$P(x) = 2 \\implies \\mu(x) = e^{\\int 2\\,dx} = \\mathbf{e^{2x}}$", plainWhy: "`e^(2x)` turns the left side into an exact product-rule derivative!" },
          { label: "Multiply through & collapse left side", mathLatex: "$e^{2x}y' + 2e^{2x}y = 6e^{3x} \\implies \\frac{d}{dx}\\left(e^{2x} y\\right) = 6e^{3x}$", plainWhy: "Check backwards: `(e^(2x)y)' = e^(2x)y' + 2e^(2x)y` ✓!" },
          { label: "Integrate both sides & isolate `y`", mathLatex: "$e^{2x}y = \\int 6e^{3x}\\,dx = 2e^{3x} + C \\implies y = \\mathbf{2e^x + Ce^{-2x}}$", plainWhy: "Never forget `+ C` BEFORE dividing by `e^(2x)`!" }
        ],
        answerLatex: "$$y(x) = 2e^x + Ce^{-2x}$$",
        commonTrap: "Never add `+ C` AFTER dividing by `μ(x)` — the constant gets divided by `μ(x)` too (`Ce^(−2x)`)!"
      },
      "math-eigenvalues-svd-orthogonality": {
        heroFormula: "$$A\\vec{v} = \\lambda\\vec{v}, \\qquad \\det(A - \\lambda I) = 0, \\qquad \\text{proj}_{\\vec{u}}(\\vec{v}) = \\frac{\\vec{v}\\cdot\\vec{u}}{\\vec{u}\\cdot\\vec{u}}\\,\\vec{u}$$",
        title: "Finding Eigenvalues & Eigenvector of a 2×2 Matrix",
        problemLatex: "$$A = \\begin{pmatrix} 5 & 2 \\\\ 0 & 3 \\end{pmatrix} \\implies \\text{Eigenvalues } \\lambda_1, \\lambda_2 \\text{ and Eigenvector for } \\lambda = 5$$",
        steps: [
          { label: "Read Trace & Determinant (or triangular diagonal)", mathLatex: "$\\text{Tr}(A) = 8,\\; \\det(A) = 15 \\implies \\lambda_1 = \\mathbf{5},\\; \\lambda_2 = \\mathbf{3}$", plainWhy: "Upper-triangular matrices expose their eigenvalues right on the diagonal!" },
          { label: "Solve `(A − 5I)v = 0` for `λ = 5`", mathLatex: "$(A - 5I) = \\begin{pmatrix} 0 & 2 \\\\ 0 & -2 \\end{pmatrix} \\implies 2y = 0 \\implies y = 0$", plainWhy: "`x` is completely free while `y` must be `0`." },
          { label: "Pick cleanest non-zero eigenvector", mathLatex: "$\\vec{v}_1 = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} \\quad (\\text{check: } A\\vec{v}_1 = 5\\vec{v}_1 \\;\\checkmark)$", plainWhy: "Any non-zero multiple of `(1, 0)` stays un-rotated under `A`!" }
        ],
        answerLatex: "$$\\lambda = 5,\\; 3; \\qquad \\vec{v}_1 = (1, 0)$$",
        commonTrap: "The zero vector `(0, 0)` is NEVER allowed to be an eigenvector, even though `A·0 = λ·0`!"
      },
      "math-vector-calculus-grad-div-curl": {
        heroFormula: "$$\\nabla f = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}, \\frac{\\partial f}{\\partial z}\\right), \\qquad \\nabla\\cdot\\vec{F} = \\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z}$$",
        title: "Computing Steepest Ascent Direction & Maximum Slope",
        problemLatex: "$$f(x, y) = 3x^2 - 4xy \\text{ at } (1, 2) \\implies \\text{Find } \\nabla f \\text{ and max rate of increase!}$$",
        steps: [
          { label: "Take partial derivatives `f_x` and `f_y`", mathLatex: "$\\frac{\\partial f}{\\partial x} = 6x - 4y, \\qquad \\frac{\\partial f}{\\partial y} = -4x$", plainWhy: "Hold the other variable constant like a plain number." },
          { label: "Evaluate gradient at `(1, 2)`", mathLatex: "$\\nabla f(1, 2) = (6(1) - 4(2),\\; -4(1)) = \\mathbf{(-2, -4)}$", plainWhy: "This vector points straight uphill from `(1, 2)`!" },
          { label: "Compute magnitude `|∇f|` for steepest rate", mathLatex: "$|\\nabla f| = \\sqrt{(-2)^2 + (-4)^2} = \\sqrt{20} = \\mathbf{2\\sqrt{5}}$", plainWhy: "No direction can climb faster than `|∇f|`!" }
        ],
        answerLatex: "$$\\nabla f = (-2, -4), \\qquad \\text{Max Slope} = 2\\sqrt{5}$$",
        commonTrap: "When computing a directional derivative `D_u f = ∇f · u`, ALWAYS normalize `u` into a **unit vector** (`|u| = 1`) first!"
      },
      "math-probability-distributions-clt": {
        heroFormula: "$$P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}, \\qquad P_{\\text{Pois}}(k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\qquad \\text{SE} = \\frac{\\sigma}{\\sqrt{n}}$$",
        title: "Applying Binomial Exact Probability & CLT Standard Error",
        problemLatex: "$$\\text{(A) 4 fair coins: } P(\\text{exactly 3 heads}); \\qquad \\text{(B) } \\sigma = 15,\\; n = 25 \\implies \\text{SE?}$$",
        steps: [
          { label: "Count ways to pick 3 heads out of 4 flips", mathLatex: "$\\binom{4}{3} = \\frac{4!}{3!\\,1!} = \\mathbf{4}$", plainWhy: "The 4 paths are `HHHT, HHTH, HTHH, THHH`." },
          { label: "Multiply by `p³(1−p)¹`", mathLatex: "$P(X=3) = 4\\left(\\frac{1}{2}\\right)^3\\left(\\frac{1}{2}\\right)^1 = \\frac{4}{16} = \\mathbf{\\frac{1}{4} = 0.25}$", plainWhy: "Each 4-flip sequence has probability `1/16`." },
          { label: "Compute CLT Standard Error", mathLatex: "$\\text{SE} = \\frac{\\sigma}{\\sqrt{n}} = \\frac{15}{\\sqrt{25}} = \\frac{15}{5} = \\mathbf{3}$", plainWhy: "Sample averages fluctuate `5×` less tightly than individual measurements!" }
        ],
        answerLatex: "$$P(X=3) = 0.25; \\qquad \\text{SE} = 3$$",
        commonTrap: "Never forget `√n` in `SE = σ/√n` — dividing by `n` instead of `√n` wildly underestimates uncertainty!"
      },
      "physics-wave-optics-interference-diffraction": {
        heroFormula: "$$d\\sin\\theta = m\\lambda, \\qquad \\Delta y = \\frac{\\lambda L}{d}, \\qquad I = I_0\\cos^2\\theta, \\qquad \\tan\\theta_B = \\frac{n_2}{n_1}$$",
        title: "Calculating Young's Double-Slit Fringe Spacing",
        problemLatex: "$$\\lambda = 600\\text{ nm},\\; L = 2.0\\text{ m},\\; d = 0.30\\text{ mm} \\implies \\Delta y = \\text{?}$$",
        steps: [
          { label: "Convert every length cleanly to meters", mathLatex: "$\\lambda = 6.0\\times 10^{-7}\\text{ m}, \\quad d = 3.0\\times 10^{-4}\\text{ m}$", plainWhy: "Mixing nanometers and millimeters is the #1 wave-optics slip!" },
          { label: "Plug into fringe spacing formula `Δy = λL / d`", mathLatex: "$\\Delta y = \\frac{(6.0\\times 10^{-7})(2.0)}{3.0\\times 10^{-4}} = \\frac{1.2\\times 10^{-6}}{3.0\\times 10^{-4}}$", plainWhy: "Keep powers of 10 cleanly separated." },
          { label: "Simplify to millimeters", mathLatex: "$\\Delta y = 4.0\\times 10^{-3}\\text{ m} = \\mathbf{4.0\\text{ mm}}$", plainWhy: "Bright bands sit evenly spaced every `4.0 mm` across the screen!" }
        ],
        answerLatex: "$$\\Delta y = 4.0\\text{ mm}$$",
        commonTrap: "Remember: in a SINGLE slit, `a sin θ = mλ` gives **DARK** minima — whereas in a DOUBLE slit, `d sin θ = mλ` gives **BRIGHT** maxima!"
      },
      "physics-elasticity-stress-strain-materials": {
        heroFormula: "$$\\sigma = \\frac{F}{A}, \\qquad \\varepsilon = \\frac{\\Delta L}{L_0}, \\qquad E = \\frac{\\sigma}{\\varepsilon}, \\qquad \\Delta L = \\alpha L_0 \\Delta T$$",
        title: "Calculating How Much a Loaded Steel Wire Stretches",
        problemLatex: "$$L_0 = 2.0\\text{ m},\\; A = 1.0\\times 10^{-6}\\text{ m}^2,\\; F = 400\\text{ N},\\; E = 2.0\\times 10^{11}\\text{ Pa} \\implies \\Delta L = \\text{?}$$",
        steps: [
          { label: "Compute tensile stress `σ = F / A`", mathLatex: "$\\sigma = \\frac{400}{1.0\\times 10^{-6}} = \\mathbf{4.0\\times 10^8\\text{ Pa}}$", plainWhy: "Even a modest 400 N load packs 400 megapascals into a 1 mm² wire!" },
          { label: "Find strain `ε = σ / E`", mathLatex: "$\\varepsilon = \\frac{4.0\\times 10^8}{2.0\\times 10^{11}} = \\mathbf{2.0\\times 10^{-3}} \\;(0.2\\%)$", plainWhy: "Steel's massive Young's modulus limits stretch to just 0.2%." },
          { label: "Multiply by original length `ΔL = ε L₀`", mathLatex: "$\\Delta L = (2.0\\times 10^{-3})(2.0\\text{ m}) = 4.0\\times 10^{-3}\\text{ m} = \\mathbf{4.0\\text{ mm}}$", plainWhy: "Clean, predictable elastic stretch!" }
        ],
        answerLatex: "$$\\Delta L = 4.0\\text{ mm}$$",
        commonTrap: "Converting `mm²` to `m²` requires multiplying by `10⁻⁶` (NOT `10⁻³`), because `(10⁻³ m)² = 10⁻⁶ m²`!"
      },
      "physics-heat-transfer-radiation-blackbody": {
        heroFormula: "$$P_{\\text{cond}} = \\frac{kA\\Delta T}{L}, \\qquad P_{\\text{rad}} = \\varepsilon\\sigma A T^4, \\qquad \\lambda_{\\max} T = 2.898\\times 10^{-3}\\text{ m}\\cdot\\text{K}$$",
        title: "Using Wien's Law to Measure a Star's Surface Temperature",
        problemLatex: "$$\\text{A star peaks at } \\lambda_{\\max} = 290\\text{ nm (UV-blue)} \\implies T = \\text{?}$$",
        steps: [
          { label: "Convert wavelength to meters", mathLatex: "$\\lambda_{\\max} = 290\\times 10^{-9}\\text{ m} = 2.90\\times 10^{-7}\\text{ m}$", plainWhy: "Wien's constant `b = 2.898 × 10⁻³ m·K` uses meters and Kelvin!" },
          { label: "Solve Wien's Law for `T`", mathLatex: "$T = \\frac{b}{\\lambda_{\\max}} \\approx \\frac{2.90\\times 10^{-3}}{2.90\\times 10^{-7}}$", plainWhy: "The `2.90` cancels cleanly!" },
          { label: "Evaluate temperature in Kelvin", mathLatex: "$T = 10^{4}\\text{ K} = \\mathbf{10{,}000\\text{ K}}$", plainWhy: "Nearly twice as hot as our `5,800 K` yellow Sun — radiating `2⁴ = 16×` more power per square meter!" }
        ],
        answerLatex: "$$T \\approx 10{,}000\\text{ K}$$",
        commonTrap: "NEVER plug Celsius into `P = εσAT⁴` or `λ_max · T = b` — always add `273.15` to get Kelvin first!"
      },
      "physics-rc-rl-rlc-circuits-impedance": {
        heroFormula: "$$\\tau_{RC} = RC, \\qquad X_L = \\omega L, \\qquad X_C = \\frac{1}{\\omega C}, \\qquad Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\qquad f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$$",
        title: "Finding Resonance & Impedance in a Tuned Radio Circuit",
        problemLatex: "$$L = 1\\text{ mH},\\; C = 1\\,\\mu\\text{F},\\; R = 6\\,\\Omega,\\; X_L = 14\\,\\Omega,\\; X_C = 6\\,\\Omega$$",
        steps: [
          { label: "Compute resonant angular frequency `ω₀ = 1/√(LC)`", mathLatex: "$LC = (10^{-3})(10^{-6}) = 10^{-9} \\implies \\omega_0 = \\frac{1}{\\sqrt{10^{-9}}} \\approx \\mathbf{3.16\\times 10^4\\text{ rad/s}}$", plainWhy: "Convert milli (`10⁻³`) and micro (`10⁻⁶`) carefully to SI!" },
          { label: "Find net reactance at the operating frequency", mathLatex: "$X_L - X_C = 14 - 6 = \\mathbf{8\\,\\Omega}$", plainWhy: "Inductor and capacitor cancel partially since they sit `180°` apart." },
          { label: "Compute total AC impedance `Z`", mathLatex: "$Z = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\mathbf{10\\,\\Omega}$", plainWhy: "At exact resonance `ω₀`, `X_L = X_C` and `Z` would drop all the way to `6 Ω`!" }
        ],
        answerLatex: "$$Z = 10\\,\\Omega, \\qquad \\omega_0 \\approx 3.16\\times 10^4\\text{ rad/s}$$",
        commonTrap: "Never add `R + X_L + X_C` directly — always subtract `X_L − X_C` first, then apply Pythagoras with `R`!"
      },
      "physics-special-relativity-lorentz-energy": {
        heroFormula: "$$\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}, \\qquad \\Delta t = \\gamma\\Delta t_0, \\qquad L = \\frac{L_0}{\\gamma}, \\qquad E^2 = (pc)^2 + (mc^2)^2$$",
        title: "Computing Lorentz γ, Time Dilation & Relativistic Kinetic Energy",
        problemLatex: "$$\\text{Particle moves at } v = 0.8c \\text{ with } \\Delta t_0 = 3\\,\\mu\\text{s} \\implies \\gamma,\\; \\Delta t,\\; K = \\text{?}$$",
        steps: [
          { label: "Compute Lorentz factor `γ`", mathLatex: "$\\gamma = \\frac{1}{\\sqrt{1 - 0.8^2}} = \\frac{1}{\\sqrt{0.36}} = \\frac{1}{0.6} = \\mathbf{\\frac{5}{3}}$", plainWhy: "Classic 3-4-5 relativity shortcut: `0.6c → γ = 5/4`; `0.8c → γ = 5/3`!" },
          { label: "Dilate proper lifetime `Δt = γ Δt₀`", mathLatex: "$\\Delta t = \\frac{5}{3}(3\\,\\mu\\text{s}) = \\mathbf{5\\,\\mu\\text{s}}$", plainWhy: "Why cosmic-ray muons live long enough to reach Earth's surface!" },
          { label: "Find relativistic kinetic energy `K = (γ − 1)mc²`", mathLatex: "$K = \\left(\\frac{5}{3} - 1\\right)mc^2 = \\mathbf{\\frac{2}{3}mc^2}$", plainWhy: "Note how Newton's `½mv² = 0.32 mc²` would have missed by more than half!" }
        ],
        answerLatex: "$$\\gamma = \\frac{5}{3}, \\qquad \\Delta t = 5\\,\\mu\\text{s}, \\qquad K = \\frac{2}{3}mc^2$$",
        commonTrap: "Don't swap which formula multiplies vs divides by `γ`: Time DILATES (`× γ`, longer) while Length CONTRACTS (`/ γ`, shorter)!"
      },
      "physics-quantum-debroglie-heisenberg-bohr": {
        heroFormula: "$$\\lambda = \\frac{h}{p}, \\qquad E_n = -\\frac{13.6\\text{ eV}}{n^2}, \\qquad E_{\\text{box}} = \\frac{n^2 h^2}{8mL^2}, \\qquad \\Delta x\\,\\Delta p \\ge \\frac{\\hbar}{2}$$",
        title: "Calculating Hydrogen Spectral Jump & Particle-in-a-Box Ratio",
        problemLatex: "$$\\text{(A) H-atom } n=4 \\to n=2 \\text{ photon energy}; \\qquad \\text{(B) Box ratio } E_3 / E_1$$",
        steps: [
          { label: "Compute Bohr levels `E₄` and `E₂`", mathLatex: "$E_4 = -\\frac{13.6}{16} = -0.85\\text{ eV}, \\qquad E_2 = -\\frac{13.6}{4} = -3.40\\text{ eV}$", plainWhy: "Always divide `−13.6 eV` by `n²`." },
          { label: "Subtract for emitted cyan photon energy", mathLatex: "$\\Delta E = E_4 - E_2 = -0.85 - (-3.40) = \\mathbf{2.55\\text{ eV}}$", plainWhy: "Corresponds to the bright blue-cyan `486 nm` H-beta line!" },
          { label: "Take 1D box energy ratio (`E_n ∝ n²`)", mathLatex: "$\\frac{E_3}{E_1} = \\frac{3^2}{1^2} = \\mathbf{9}$", plainWhy: "Box levels climb quadratically (`1, 4, 9, 16...`), whereas Bohr levels crowd together (`1/n²`)!" }
        ],
        answerLatex: "$$\\Delta E = 2.55\\text{ eV}; \\qquad E_3 / E_1 = 9$$",
        commonTrap: "Don't divide by `n` instead of `n²` in `E_n = −13.6/n²`, and remember `n = 1` in a quantum box is NEVER zero energy!"
      },
      "physics-fluid-viscosity-poiseuille-reynolds": {
        heroFormula: "$$Q = \\frac{\\pi\\Delta P\\,r^4}{8\\eta L}, \\qquad \\text{Re} = \\frac{\\rho v D}{\\eta}, \\qquad F_d = 6\\pi\\eta r v, \\qquad h = \\frac{2\\gamma\\cos\\theta}{\\rho g r}$$",
        title: "Quantifying Artery Narrowing via Poiseuille's `r⁴` Law",
        problemLatex: "$$\\text{Plaque reduces artery radius to } r_2 = 0.5\\,r_1 \\implies \\text{What pressure } \\Delta P_2 \\text{ preserves flow } Q\\text{?}$$",
        steps: [
          { label: "Write Poiseuille ratio for constant `Q, η, L`", mathLatex: "$\\Delta P_1 r_1^4 = \\Delta P_2 r_2^4$", plainWhy: "Everything else cancels cleanly in the ratio!" },
          { label: "Substitute `r₂ = ½ r₁`", mathLatex: "$\\Delta P_2 = \\Delta P_1 \\left(\\frac{r_1}{r_2}\\right)^4 = \\Delta P_1 \\cdot 2^4$", plainWhy: "Because radius enters to the 4th power, halving `r` demands `2⁴` more pressure!" },
          { label: "Evaluate pressure multiplier", mathLatex: "$\\Delta P_2 = \\mathbf{16\\,\\Delta P_1}$", plainWhy: "A 50% radius narrowing requires `16×` the driving pressure to keep the same blood flow!" }
        ],
        answerLatex: "$$\\Delta P_2 = 16\\,\\Delta P_1$$",
        commonTrap: "Never use `r²` (area ratio = 4×) for viscous pipe flow — laminar Poiseuille flow scales strictly as `r⁴` (16×)!"
      }
    });
  }
})(typeof window !== "undefined" ? window : globalThis);
