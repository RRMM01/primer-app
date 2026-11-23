// Primer Studio — Step-by-Step "Show Your Work" Derivation Studio (Math, Physics & Chemistry)
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

  function fmtMath(text, block) {
    if (global.MATHLINGO_LATEX && typeof global.MATHLINGO_LATEX.formatMath === "function") {
      return global.MATHLINGO_LATEX.formatMath(String(text == null ? "" : text), !!block);
    }
    return escapeHtml(text == null ? "" : text);
  }

  const TRACKS = [
    { id: "all", label: "All Tracks", icon: "◈" },
    { id: "algebra", label: "Algebra", icon: "x" },
    { id: "calculus", label: "Calculus", icon: "∫" },
    { id: "physics", label: "Physics", icon: "⚡" },
    { id: "chemistry", label: "Chemistry", icon: "⚗" }
  ];

  // Canonical step expression normalizer for free-input "Type Your Step" mode
  function normalizeExpr(raw) {
    let s = String(raw == null ? "" : raw).trim().toLowerCase();
    s = s.replace(/\$/g, "");
    s = s.replace(/−|–|—/g, "-");
    s = s.replace(/×|·|\*/g, "");
    s = s.replace(/÷/g, "/");
    s = s.replace(/\s+/g, "");
    s = s.replace(/²/g, "^2").replace(/³/g, "^3");
    // Strip harmless trailing period
    s = s.replace(/\.$/, "");
    return s;
  }

  function flipEquation(norm) {
    const parts = norm.split("=");
    if (parts.length !== 2) return null;
    return `${parts[1]}=${parts[0]}`;
  }

  function extractNumeric(raw) {
    const m = String(raw == null ? "" : raw).trim().replace(/,/g, "").match(/^([+-]?\d+(?:\.\d+)?)(?:\s*\/\s*([+-]?\d+(?:\.\d+)?))?/);
    if (!m) return null;
    const num = parseFloat(m[1]);
    if (m[2]) {
      const den = parseFloat(m[2]);
      if (den === 0) return null;
      return num / den;
    }
    return Number.isFinite(num) ? num : null;
  }

  function checkStepAnswer(step, rawInput) {
    const clean = normalizeExpr(rawInput);
    if (!clean) {
      return { ok: false, diag: "Type the next expression or value before checking." };
    }

    const accepted = [step.result, ...(step.accepted || [])].map(normalizeExpr);
    for (const acc of accepted) {
      if (clean === acc) return { ok: true, diag: step.why };
      const flipped = flipEquation(acc);
      if (flipped && clean === flipped) return { ok: true, diag: step.why };
    }

    // Numeric tolerance check when step expects a scalar or value+unit
    if (typeof step.numericTarget === "number") {
      // Allow "x = 6" or "6" or "6 m/s"
      const rhs = clean.includes("=") ? clean.split("=").pop() : clean;
      const val = extractNumeric(rhs);
      if (val !== null && Math.abs(val - step.numericTarget) <= (step.tol || 0.02)) {
        return { ok: true, diag: step.why };
      }
      if (val !== null && Math.abs(val + step.numericTarget) <= (step.tol || 0.02) && step.numericTarget !== 0) {
        return { ok: false, diag: `Sign flip detected! You got ${val}, which has the exact opposite sign. Re-check moving terms or multiplying by a negative.` };
      }
    }

    // Check against known trap distractors to deliver surgical step-level feedback
    if (Array.isArray(step.choices)) {
      for (const ch of step.choices) {
        if (!ch.correct && normalizeExpr(ch.expr) === clean) {
          return { ok: false, diag: ch.trapReason || "Watch that algebraic transformation — check both sides carefully." };
        }
      }
    }

    // Helpful generic algebra diagnostics
    const primaryAcc = accepted[0] || "";
    if (primaryAcc.includes("=") && !clean.includes("=")) {
      const rhsOnly = primaryAcc.split("=").pop();
      if (clean === rhsOnly) {
        return { ok: true, diag: step.why };
      }
    }
    if (primaryAcc.startsWith("-") && clean === primaryAcc.slice(1)) {
      return { ok: false, diag: "Missing negative sign! Re-check the sign of your result." };
    }
    if (clean.startsWith("-") && primaryAcc === clean.slice(1)) {
      return { ok: false, diag: "Extra negative sign! Double-check whether two negatives canceled out." };
    }

    return {
      ok: false,
      diag: `Not quite "${rawInput.trim()}". Hint: ${step.hint || "Apply the inverse operation symmetrically to both sides."}`
    };
  }

  // ==================== 24 CURATED MULTI-STEP DERIVATIONS ====================
  const PROBLEMS = [
    // ---------- ALGEBRA (6) ----------
    {
      id: "alg-dist-linear",
      track: "algebra",
      difficulty: "Foundations",
      xp: 35,
      gems: 8,
      linkedNodeId: "algebra-scale",
      title: "Distribution & Two-Side Balance",
      given: "3(2x - 4) + 5 = 2x + 13",
      goal: "Solve for $x$ line by line.",
      steps: [
        {
          prompt: "Step 1: Expand $3(2x - 4)$ and combine constants on the left side.",
          rule: "Distributive Property & Combine Like Terms",
          result: "6x - 7 = 2x + 13",
          accepted: ["6x - 7 = 2x + 13", "6x - 12 + 5 = 2x + 13"],
          hint: "Multiply 3 by BOTH $2x$ and $-4$ to get $6x - 12$, then add $+5$.",
          why: "$3(2x) - 3(4) + 5 = 6x - 12 + 5 = 6x - 7$.",
          choices: [
            { expr: "6x - 7 = 2x + 13", correct: true },
            { expr: "6x + 1 = 2x + 13", correct: false, trapReason: "Distribution trap: you forgot to multiply $3 \\times (-4)$ and left $-4 + 5 = +1$." },
            { expr: "6x - 17 = 2x + 13", correct: false, trapReason: "Sign trap: $-12 + 5 = -7$, not $-17$." },
            { expr: "5x - 7 = 2x + 13", correct: false, trapReason: "Arithmetic trap: $3 \\times 2x = 6x$, not $3 + 2 = 5x$." }
          ]
        },
        {
          prompt: "Step 2: Move all $x$-terms to the left and constants to the right.",
          rule: "Subtract $2x$ and Add $7$ to Both Sides",
          result: "4x = 20",
          accepted: ["4x = 20"],
          hint: "Subtract $2x$ from $6x$, and add $+7$ to $13$.",
          why: "$6x - 2x = 4x$ and $13 + 7 = 20$, giving $4x = 20$.",
          choices: [
            { expr: "4x = 20", correct: true },
            { expr: "4x = 6", correct: false, trapReason: "Sign-flip trap: moving $-7$ across `=` adds $+7$ ($13 + 7 = 20$), not $13 - 7$." },
            { expr: "8x = 20", correct: false, trapReason: "Sign-flip trap: moving $+2x$ across `=` subtracts $2x$ ($6x - 2x = 4x$), not adds it." },
            { expr: "4x = -20", correct: false, trapReason: "Both constants are positive on the right: $13 + 7 = +20$." }
          ]
        },
        {
          prompt: "Step 3: Isolate $x$ completely.",
          rule: "Divide Both Sides by 4",
          result: "x = 5",
          accepted: ["x = 5", "5"],
          numericTarget: 5,
          hint: "Divide $20$ by $4$.",
          why: "$x = \\frac{20}{4} = 5$. Quick check: $3(10-4)+5 = 23$ and $2(5)+13 = 23$ ✓",
          choices: [
            { expr: "x = 5", correct: true },
            { expr: "x = 16", correct: false, trapReason: "Operation trap: $4x$ means multiply by 4, so divide by 4 instead of subtracting 4." },
            { expr: "x = -5", correct: false, trapReason: "Positive divided by positive stays positive." },
            { expr: "x = 4", correct: false, trapReason: "$20 / 4 = 5$, not $4$." }
          ]
        }
      ]
    },
    {
      id: "alg-quad-complete-sq",
      track: "algebra",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "quadratics-symmetry",
      title: "Completing the Square",
      given: "x^2 - 6x - 7 = 0",
      goal: "Derive both roots by completing the square.",
      steps: [
        {
          prompt: "Step 1: Move the constant term and add $(b/2)^2$ to both sides.",
          rule: "Add 7, then Add $(-6/2)^2 = 9$ to Both Sides",
          result: "x^2 - 6x + 9 = 16",
          accepted: ["x^2 - 6x + 9 = 16", "(x-3)^2 = 16"],
          hint: "Half of $-6$ is $-3$, and $(-3)^2 = 9$. Add $9$ to BOTH sides of $x^2 - 6x = 7$.",
          why: "$x^2 - 6x = 7 \\Rightarrow x^2 - 6x + 9 = 7 + 9 = 16$.",
          choices: [
            { expr: "x^2 - 6x + 9 = 16", correct: true },
            { expr: "x^2 - 6x + 9 = 7", correct: false, trapReason: "Balance trap: you added $9$ to the left side but forgot to add $9$ to the right side!" },
            { expr: "x^2 - 6x + 36 = 43", correct: false, trapReason: "Half-first rule: square $(b/2) = -3$, not $b = -6$." },
            { expr: "x^2 - 6x - 9 = -2", correct: false, trapReason: "$(-3)^2$ is always $+9$, never $-9$." }
          ]
        },
        {
          prompt: "Step 2: Rewrite the left trinomial as a perfect square and take $\\pm\\sqrt{\\phantom{x}}$.",
          rule: "Factor Perfect Square & Square Root Property",
          result: "x - 3 = ±4",
          accepted: ["x - 3 = +-4", "x - 3 = ±4", "x-3=±4", "x-3=+-4"],
          hint: "$x^2 - 6x + 9 = (x - 3)^2$, and $\\sqrt{16} = 4$ (don't forget BOTH signs!).",
          why: "$(x - 3)^2 = 16 \\Rightarrow x - 3 = \\pm 4$.",
          choices: [
            { expr: "x - 3 = ±4", correct: true },
            { expr: "x - 3 = 4", correct: false, trapReason: "Missing-root trap: taking the square root of an equation ALWAYS yields $\\pm 4$, not only $+4$!" },
            { expr: "x + 3 = ±4", correct: false, trapReason: "The middle term is $-6x$, so the binomial is $(x - 3)^2$, not $(x + 3)^2$." },
            { expr: "x - 9 = ±4", correct: false, trapReason: "Use half the coefficient ($-3$), not its square ($9$)." }
          ]
        },
        {
          prompt: "Step 3: Add $3$ to both branches to state the two roots.",
          rule: "Split Positive & Negative Branches",
          result: "x = 7, -1",
          accepted: ["x = 7, -1", "x = -1, 7", "7, -1", "-1, 7", "7 and -1"],
          hint: "Compute $3 + 4$ and $3 - 4$.",
          why: "$x = 3 + 4 = 7$ and $x = 3 - 4 = -1$.",
          choices: [
            { expr: "x = 7, -1", correct: true },
            { expr: "x = -7, 1", correct: false, trapReason: "Sign-flip trap: adding $+3$ gives $3 \\pm 4$, not $-3 \\pm 4$." },
            { expr: "x = 7, 1", correct: false, trapReason: "$3 - 4 = -1$, not $+1$." },
            { expr: "x = 7", correct: false, trapReason: "You dropped the negative branch $3 - 4 = -1$." }
          ]
        }
      ]
    },
    {
      id: "alg-systems-elim",
      track: "algebra",
      difficulty: "Foundations",
      xp: 40,
      gems: 9,
      linkedNodeId: "systems-equations",
      title: "Elimination in a Linear System",
      given: "2x + 3y = 16 \\quad\\text{and}\\quad 4x - 3y = 8",
      goal: "Find $(x, y)$ by elimination.",
      steps: [
        {
          prompt: "Step 1: Add the two equations vertically to eliminate $y$.",
          rule: "Linear Combination (Eliminate $+3y$ and $-3y$)",
          result: "6x = 24",
          accepted: ["6x = 24"],
          hint: "Add $(2x + 4x)$, $(3y - 3y)$, and $(16 + 8)$.",
          why: "$(2x + 4x) + (3y - 3y) = 16 + 8 \\Rightarrow 6x = 24$.",
          choices: [
            { expr: "6x = 24", correct: true },
            { expr: "6x + 6y = 24", correct: false, trapReason: "Sign check: $+3y + (-3y) = 0$, not $6y$." },
            { expr: "-2x = 8", correct: false, trapReason: "You subtracted instead of adding, which fails to cancel $y$ ($3y - (-3y) = 6y$)." },
            { expr: "6x = 8", correct: false, trapReason: "Add the right sides too: $16 + 8 = 24$, not $16 - 8$." }
          ]
        },
        {
          prompt: "Step 2: Solve for $x$ and substitute it into $2x + 3y = 16$.",
          rule: "Divide by 6 & Substitute $x = 4$",
          result: "8 + 3y = 16",
          accepted: ["8 + 3y = 16", "3y = 8", "x = 4"],
          hint: "$x = 24/6 = 4$. Plug $x = 4$ into $2x + 3y = 16$.",
          why: "$x = 4 \\Rightarrow 2(4) + 3y = 16 \\Rightarrow 8 + 3y = 16$.",
          choices: [
            { expr: "8 + 3y = 16", correct: true },
            { expr: "4 + 3y = 16", correct: false, trapReason: "Don't forget the coefficient $2$ in $2x$: $2(4) = 8$." },
            { expr: "8 + 3y = 8", correct: false, trapReason: "Keep the right-hand side of equation 1 ($16$), not equation 2 ($8$)." },
            { expr: "12 + 3y = 16", correct: false, trapReason: "$x = 24/6 = 4$, so $2x = 8$, not $12$." }
          ]
        },
        {
          prompt: "Step 3: Solve for $y$ and state the ordered pair $(x, y)$.",
          rule: "Subtract 8 & Divide by 3",
          result: "(4, 8/3)",
          accepted: ["(4, 8/3)", "y = 8/3", "8/3"],
          numericTarget: 8 / 3,
          tol: 0.03,
          hint: "$3y = 16 - 8 = 8$, so $y = 8/3$.",
          why: "$y = \\frac{8}{3}$, giving $(x, y) = (4, \\frac{8}{3})$.",
          choices: [
            { expr: "(4, 8/3)", correct: true },
            { expr: "(4, 8)", correct: false, trapReason: "You forgot to divide by $3$ ($3y = 8 \\Rightarrow y = 8/3$)." },
            { expr: "(8/3, 4)", correct: false, trapReason: "Ordered pair order trap: always write $(x, y)$, never $(y, x)$!" },
            { expr: "(4, 24/3)", correct: false, trapReason: "Subtract $8$ from $16$ ($16 - 8 = 8$), don't add $8$." }
          ]
        }
      ]
    },
    {
      id: "alg-log-eq",
      track: "algebra",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "logarithms-unlocked",
      title: "Logarithm Product Rule Equation",
      given: "\\log_2(x) + \\log_2(x - 2) = 3",
      goal: "Solve for $x > 2$ and discard extraneous roots.",
      steps: [
        {
          prompt: "Step 1: Combine the two logs into one log using the Product Rule.",
          rule: "$\\log_b A + \\log_b B = \\log_b(AB)$",
          result: "log_2(x(x - 2)) = 3",
          accepted: ["log_2(x(x-2))=3", "log_2(x^2-2x)=3", "log2(x(x-2))=3", "log2(x^2-2x)=3"],
          hint: "Adding logs with the same base multiplies their insides.",
          why: "$\\log_2(x(x - 2)) = 3$.",
          choices: [
            { expr: "log_2(x(x - 2)) = 3", correct: true },
            { expr: "log_2(2x - 2) = 3", correct: false, trapReason: "Log trap: adding logs MULTIPLIES the arguments, it does NOT add them!" },
            { expr: "log_2(x / (x - 2)) = 3", correct: false, trapReason: "Division corresponds to subtraction of logs, not addition." },
            { expr: "log_4(x(x - 2)) = 3", correct: false, trapReason: "Never add the bases — base $2$ stays base $2$." }
          ]
        },
        {
          prompt: "Step 2: Rewrite in exponential form ($2^3 = \\text{inside}$).",
          rule: "Definition of Logarithm ($\\log_b M = y \\iff b^y = M$)",
          result: "x^2 - 2x = 8",
          accepted: ["x^2 - 2x = 8", "x(x - 2) = 8", "x^2 - 2x - 8 = 0"],
          hint: "$2^3 = 8$, and expand $x(x - 2)$.",
          why: "$x(x - 2) = 2^3 = 8 \\Rightarrow x^2 - 2x - 8 = 0$.",
          choices: [
            { expr: "x^2 - 2x = 8", correct: true },
            { expr: "x^2 - 2x = 6", correct: false, trapReason: "Exponent trap: $2^3 = 2 \\cdot 2 \\cdot 2 = 8$, not $2 \\times 3 = 6$." },
            { expr: "x^2 - 2x = 9", correct: false, trapReason: "Base is $2$ and exponent is $3$: $2^3 = 8$, not $3^2 = 9$." },
            { expr: "x^2 - 2x = 3", correct: false, trapReason: "You dropped $\\log_2$ without raising base $2$ to the power $3$!" }
          ]
        },
        {
          prompt: "Step 3: Factor $(x - 4)(x + 2) = 0$ and apply the log domain check ($x > 2$).",
          rule: "Zero-Product & Domain Check",
          result: "x = 4",
          accepted: ["x = 4", "4"],
          numericTarget: 4,
          hint: "Roots are $4$ and $-2$, but $\\log_2(-2)$ is undefined!",
          why: "Only $x = 4$ keeps both $x > 0$ and $x - 2 > 0$. Check: $\\log_2(4) + \\log_2(2) = 2 + 1 = 3$ ✓",
          choices: [
            { expr: "x = 4", correct: true },
            { expr: "x = 4, -2", correct: false, trapReason: "Domain trap: $x = -2$ makes $\\log_2(-2)$ undefined — you MUST reject it!" },
            { expr: "x = -2", correct: false, trapReason: "Logarithm inputs must be strictly positive." },
            { expr: "x = 2", correct: false, trapReason: "$x = 2$ makes $\\log_2(0)$, which is undefined." }
          ]
        }
      ]
    },
    {
      id: "alg-radical-extraneous",
      track: "algebra",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "rational-radical-equations",
      title: "Radical Equation & Extraneous Filter",
      given: "\\sqrt{2x + 3} = x",
      goal: "Square safely and verify valid solutions.",
      steps: [
        {
          prompt: "Step 1: Square both sides and move all terms to one side.",
          rule: "Square Both Sides & Rearrange to Standard Quadratic",
          result: "x^2 - 2x - 3 = 0",
          accepted: ["x^2 - 2x - 3 = 0", "2x + 3 = x^2"],
          hint: "Squaring gives $2x + 3 = x^2$, then subtract $2x + 3$ from both sides.",
          why: "$2x + 3 = x^2 \\Rightarrow x^2 - 2x - 3 = 0$.",
          choices: [
            { expr: "x^2 - 2x - 3 = 0", correct: true },
            { expr: "x^2 + 2x + 3 = 0", correct: false, trapReason: "Sign-flip trap: moving $+2x + 3$ to the $x^2$ side makes them $-2x - 3$." },
            { expr: "4x^2 + 9 = x^2", correct: false, trapReason: "Squaring $\\sqrt{2x+3}$ simply removes the radical — it does NOT square $2x$ and $3$!" },
            { expr: "x^2 - 2x + 3 = 0", correct: false, trapReason: "Moving $+3$ across `=` gives $-3$." }
          ]
        },
        {
          prompt: "Step 2: Factor the quadratic to find candidate roots.",
          rule: "Factor Quadratic",
          result: "(x - 3)(x + 1) = 0",
          accepted: ["(x-3)(x+1)=0", "(x+1)(x-3)=0", "x=3,-1"],
          hint: "Find two numbers that multiply to $-3$ and add to $-2$.",
          why: "$(-3)(1) = -3$ and $-3 + 1 = -2 \\Rightarrow (x - 3)(x + 1) = 0$.",
          choices: [
            { expr: "(x - 3)(x + 1) = 0", correct: true },
            { expr: "(x + 3)(x - 1) = 0", correct: false, trapReason: "Middle-term trap: $+3 - 1 = +2$, but we need $-2$." },
            { expr: "(x - 3)(x - 1) = 0", correct: false, trapReason: "$(-3)(-1) = +3$, not $-3$." },
            { expr: "(x - 2)(x + 1) = 0", correct: false, trapReason: "Product is $-2$, not $-3$." }
          ]
        },
        {
          prompt: "Step 3: Check $x = 3$ and $x = -1$ in the ORIGINAL equation $\\sqrt{2x+3} = x$.",
          rule: "Principal Root Non-Negativity Check ($\\sqrt{\\cdot} \\ge 0$)",
          result: "x = 3",
          accepted: ["x = 3", "3"],
          numericTarget: 3,
          hint: "Can a principal square root equal $-1$?",
          why: "$\\sqrt{2(-1)+3} = \\sqrt{1} = +1 \\neq -1$, so $-1$ is extraneous! Only $x = 3$ works ✓",
          choices: [
            { expr: "x = 3", correct: true },
            { expr: "x = 3, -1", correct: false, trapReason: "Extraneous root trap: $\\sqrt{1} = +1$, NEVER $-1$. Always test roots after squaring!" },
            { expr: "x = -1", correct: false, trapReason: "Principal square roots cannot be negative." },
            { expr: "No solution", correct: false, trapReason: "Check $x = 3$: $\\sqrt{2(3)+3} = \\sqrt{9} = 3$ ✓" }
          ]
        }
      ]
    },
    {
      id: "alg-ineq-flip",
      track: "algebra",
      difficulty: "Foundations",
      xp: 35,
      gems: 8,
      linkedNodeId: "abs-value-inequalities",
      title: "Negative-Flip Inequality",
      given: "5 - 3x \\le 17",
      goal: "Isolate $x$ without missing the inequality flip.",
      steps: [
        {
          prompt: "Step 1: Subtract $5$ from both sides.",
          rule: "Subtraction Preserves Direction",
          result: "-3x <= 12",
          accepted: ["-3x <= 12", "-3x ≤ 12"],
          hint: "$17 - 5 = 12$; keep the negative sign attached to $3x$.",
          why: "Subtracting $5$ leaves $-3x \\le 12$.",
          choices: [
            { expr: "-3x <= 12", correct: true },
            { expr: "3x <= 12", correct: false, trapReason: "Dropped-minus trap: the minus sign belongs to $-3x$!" },
            { expr: "-3x <= 22", correct: false, trapReason: "Subtract $5$ from $17$ ($17 - 5 = 12$), don't add it." },
            { expr: "-3x >= 12", correct: false, trapReason: "Adding/subtracting NEVER flips an inequality — only multiplying/dividing by a negative does." }
          ]
        },
        {
          prompt: "Step 2: Divide both sides by $-3$ and flip the inequality sign.",
          rule: "Divide by Negative → Flip $\\le$ to $\\ge$",
          result: "x >= -4",
          accepted: ["x >= -4", "x ≥ -4"],
          hint: "$12 / (-3) = -4$, and dividing by a negative reverses $\\le$ into $\\ge$!",
          why: "$x \\ge -4$. Test $x = 0$: $5 - 0 = 5 \\le 17$ ✓",
          choices: [
            { expr: "x >= -4", correct: true },
            { expr: "x <= -4", correct: false, trapReason: "Classic inequality trap: dividing by $-3$ MUST flip $\\le$ to $\\ge$!" },
            { expr: "x >= 4", correct: false, trapReason: "$12 / (-3) = -4$, not $+4$." },
            { expr: "x <= 4", correct: false, trapReason: "Missed both the negative sign and the inequality flip." }
          ]
        }
      ]
    },

    // ---------- CALCULUS (6) ----------
    {
      id: "calc-limit-hole",
      track: "calculus",
      difficulty: "Foundations",
      xp: 40,
      gems: 9,
      linkedNodeId: "limits-potholes",
      title: "Removable Hole Limit (0/0)",
      given: "\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}",
      goal: "Resolve the $0/0$ indeterminate form algebraically.",
      steps: [
        {
          prompt: "Step 1: Factor the numerator as a difference of squares.",
          rule: "$a^2 - b^2 = (a - b)(a + b)$",
          result: "(x - 3)(x + 3) / (x - 3)",
          accepted: ["(x-3)(x+3)/(x-3)", "(x+3)(x-3)/(x-3)"],
          hint: "$x^2 - 9 = x^2 - 3^2$.",
          why: "Factoring reveals the removable $(x - 3)$ factor causing $0/0$.",
          choices: [
            { expr: "(x - 3)(x + 3) / (x - 3)", correct: true },
            { expr: "(x - 3)^2 / (x - 3)", correct: false, trapReason: "$(x-3)^2 = x^2 - 6x + 9$, not $x^2 - 9$!" },
            { expr: "0 / 0 = 1", correct: false, trapReason: "$0/0$ is indeterminate — it does NOT equal $1$!" },
            { expr: "(x - 9)(x + 1) / (x - 3)", correct: false, trapReason: "Check FOIL: $(x-9)(x+1) = x^2 - 8x - 9$." }
          ]
        },
        {
          prompt: "Step 2: Cancel the common $(x - 3)$ factor (valid since $x \\to 3$ means $x \\neq 3$).",
          rule: "Cancel Common Factor",
          result: "x + 3",
          accepted: ["x + 3", "lim (x + 3)"],
          hint: "Dividing $(x-3)(x+3)$ by $(x-3)$ leaves one linear term.",
          why: "For $x \\neq 3$, $\\frac{(x-3)(x+3)}{x-3} = x + 3$.",
          choices: [
            { expr: "x + 3", correct: true },
            { expr: "x - 3", correct: false, trapReason: "You canceled $(x+3)$ instead of the denominator $(x-3)$." },
            { expr: "x + 9", correct: false, trapReason: "The remaining factor is $(x + 3)$." },
            { expr: "Does not exist", correct: false, trapReason: "A removable hole still has a finite limit!" }
          ]
        },
        {
          prompt: "Step 3: Direct-substitute $x = 3$ into $x + 3$.",
          rule: "Direct Substitution",
          result: "6",
          accepted: ["6", "= 6"],
          numericTarget: 6,
          hint: "Plug $x = 3$ into $x + 3$.",
          why: "$3 + 3 = 6$. The curve smoothly approaches $y = 6$ right at the pothole.",
          choices: [
            { expr: "6", correct: true },
            { expr: "0", correct: false, trapReason: "$3 + 3 = 6$, not $3 - 3 = 0$." },
            { expr: "9", correct: false, trapReason: "$3 + 3 = 6$, not $3 \\times 3 = 9$." },
            { expr: "3", correct: false, trapReason: "Add $3$ to $x = 3$ to get $6$." }
          ]
        }
      ]
    },
    {
      id: "calc-power-deriv",
      track: "calculus",
      difficulty: "Foundations",
      xp: 40,
      gems: 9,
      linkedNodeId: "derivatives-speedometer",
      title: "Power Rule & Tangent Slope",
      given: "f(x) = 2x^3 - 5x^2 + 4x - 7",
      goal: "Derive $f'(x)$ and compute the slope at $x = 2$.",
      steps: [
        {
          prompt: "Step 1: Differentiate every term using $\\frac{d}{dx}(x^n) = nx^{n-1}$.",
          rule: "Power Rule & Constant Rule ($c' = 0$)",
          result: "6x^2 - 10x + 4",
          accepted: ["6x^2 - 10x + 4", "f'(x) = 6x^2 - 10x + 4"],
          hint: "Multiply each power down and reduce the exponent by $1$; the $-7$ vanishes.",
          why: "$f'(x) = 6x^2 - 10x + 4$.",
          choices: [
            { expr: "6x^2 - 10x + 4", correct: true },
            { expr: "6x^2 - 10x + 4 - 7", correct: false, trapReason: "Constant trap: the derivative of $-7$ is $0$ (a flat line has slope 0)!" },
            { expr: "6x^3 - 10x^2 + 4", correct: false, trapReason: "Power rule requires subtracting $1$ from each exponent." },
            { expr: "2x^2 - 5x + 4", correct: false, trapReason: "You forgot to multiply the coefficients by the old exponents ($2\\cdot 3 = 6$, $5\\cdot 2 = 10$)." }
          ]
        },
        {
          prompt: "Step 2: Evaluate $f'(2)$ to find the instantaneous tangent slope at $x = 2$.",
          rule: "Evaluate $f'(2)$",
          result: "8",
          accepted: ["8", "f'(2) = 8"],
          numericTarget: 8,
          hint: "$6(2^2) - 10(2) + 4 = 24 - 20 + 4$.",
          why: "$f'(2) = 6(4) - 20 + 4 = 24 - 20 + 4 = 8$.",
          choices: [
            { expr: "8", correct: true },
            { expr: "16", correct: false, trapReason: "PEMDAS check: $6(2^2) = 24$, not $(6\\cdot 2)^2$. Then $24 - 20 + 4 = 8$." },
            { expr: "0", correct: false, trapReason: "$24 - 20 = 4$, and $4 + 4 = 8$, not $4 - 4$." },
            { expr: "48", correct: false, trapReason: "Square $2$ first ($4$), multiply by $6$ ($24$), subtract $20$, add $4$." }
          ]
        }
      ]
    },
    {
      id: "calc-chain-rule",
      track: "calculus",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "chain-product-optimization",
      title: "Chain Rule Peeling",
      given: "y = (3x^2 + 1)^4",
      goal: "Compute $\\frac{dy}{dx}$ cleanly.",
      steps: [
        {
          prompt: "Step 1: Differentiate the outer shell $(\\square)^4$ leaving the inside untouched.",
          rule: "Outer Derivative $4u^3$",
          result: "4(3x^2 + 1)^3 * d/dx(3x^2 + 1)",
          accepted: ["4(3x^2+1)^3*6x", "4(3x^2+1)^3(6x)", "4(3x^2+1)^3*d/dx(3x^2+1)"],
          hint: "Bring $4$ down, lower power to $3$, keep $(3x^2 + 1)$ intact, then multiply by inner derivative.",
          why: "$\\frac{dy}{dx} = 4(3x^2 + 1)^3 \\cdot \\frac{d}{dx}(3x^2 + 1)$.",
          choices: [
            { expr: "4(3x^2 + 1)^3 * d/dx(3x^2 + 1)", correct: true },
            { expr: "4(6x)^3", correct: false, trapReason: "Inside-mutation trap: NEVER differentiate inside the outer derivative! Keep $(3x^2 + 1)$ frozen inside, then multiply by its derivative outside." },
            { expr: "4(3x^2 + 1)^3", correct: false, trapReason: "Missing-chain trap: you forgot to multiply by the derivative of the inner function $(3x^2 + 1)$!" },
            { expr: "12x(3x^2 + 1)^4", correct: false, trapReason: "Lower the outer exponent from $4$ to $3$." }
          ]
        },
        {
          prompt: "Step 2: Multiply by the inner derivative $6x$ and simplify the leading coefficient.",
          rule: "Simplify $4 \\cdot 6x$",
          result: "24x(3x^2 + 1)^3",
          accepted: ["24x(3x^2+1)^3", "24x*(3x^2+1)^3"],
          hint: "$\\frac{d}{dx}(3x^2 + 1) = 6x$, and $4 \\times 6x = 24x$.",
          why: "$\\frac{dy}{dx} = 24x(3x^2 + 1)^3$.",
          choices: [
            { expr: "24x(3x^2 + 1)^3", correct: true },
            { expr: "12x(3x^2 + 1)^3", correct: false, trapReason: "Derivative of $3x^2$ is $6x$, so $4 \\times 6x = 24x$, not $12x$." },
            { expr: "24x^2(3x^2 + 1)^3", correct: false, trapReason: "$\\frac{d}{dx}(3x^2) = 6x^1$, not $6x^2$." },
            { expr: "24x(3x^2 + 1)^4", correct: false, trapReason: "The outer power drops from $4$ to $3$." }
          ]
        }
      ]
    },
    {
      id: "calc-definite-integral",
      track: "calculus",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "integrals-area",
      title: "Definite Integral (Fundamental Theorem)",
      given: "\\int_1^3 (3x^2 + 2x)\\,dx",
      goal: "Find the exact signed area from $x = 1$ to $x = 3$.",
      steps: [
        {
          prompt: "Step 1: Find the antiderivative $F(x)$ using reverse power rule.",
          rule: "$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}$",
          result: "x^3 + x^2",
          accepted: ["x^3 + x^2", "F(x) = x^3 + x^2"],
          hint: "Raise each exponent by $1$ and divide by the new exponent.",
          why: "$\\frac{3x^3}{3} + \\frac{2x^2}{2} = x^3 + x^2$. Quick check: $(x^3+x^2)' = 3x^2 + 2x$ ✓",
          choices: [
            { expr: "x^3 + x^2", correct: true },
            { expr: "6x + 2", correct: false, trapReason: "Direction trap: $6x + 2$ is the DERIVATIVE, not the antiderivative!" },
            { expr: "3x^3 + 2x^2", correct: false, trapReason: "You forgot to divide by the new powers $3$ and $2$." },
            { expr: "x^3 + 2x^2", correct: false, trapReason: "Divide $2x^2$ by the new exponent $2$ to get $x^2$." }
          ]
        },
        {
          prompt: "Step 2: Apply $F(3) - F(1)$.",
          rule: "Fundamental Theorem of Calculus",
          result: "36 - 2 = 34",
          accepted: ["34", "36 - 2 = 34", "36 - 2"],
          numericTarget: 34,
          hint: "$F(3) = 3^3 + 3^2 = 27 + 9 = 36$, and $F(1) = 1^3 + 1^2 = 2$.",
          why: "$F(3) - F(1) = (27 + 9) - (1 + 1) = 36 - 2 = 34$.",
          choices: [
            { expr: "36 - 2 = 34", correct: true },
            { expr: "36", correct: false, trapReason: "Lower-bound trap: $F(1) = 2 \\neq 0$! Never assume the lower limit vanishes unless $x = 0$." },
            { expr: "2 - 36 = -34", correct: false, trapReason: "Order trap: ALWAYS subtract Top minus Bottom: $F(b) - F(a)$." },
            { expr: "36 + 2 = 38", correct: false, trapReason: "Subtract $F(1)$ from $F(3)$, don't add it." }
          ]
        }
      ]
    },
    {
      id: "calc-u-sub",
      track: "calculus",
      difficulty: "Advanced",
      xp: 55,
      gems: 12,
      linkedNodeId: "math-integration-techniques",
      title: "u-Substitution Integral",
      given: "\\int 4x(x^2 + 5)^3\\,dx",
      goal: "Substitute $u = x^2 + 5$ and integrate cleanly.",
      steps: [
        {
          prompt: "Step 1: Let $u = x^2 + 5$. Find $du$ and rewrite $4x\\,dx$ in terms of $du$.",
          rule: "Differential $du = 2x\\,dx$",
          result: "4x dx = 2 du",
          accepted: ["4xdx=2du", "2du", "du=2xdx"],
          hint: "Since $du = 2x\\,dx$, multiply both sides by $2$ to match $4x\\,dx$.",
          why: "$du = 2x\\,dx \\Rightarrow 4x\\,dx = 2\\,du$, turning the integral into $\\int 2u^3\\,du$.",
          choices: [
            { expr: "4x dx = 2 du", correct: true },
            { expr: "4x dx = 4 du", correct: false, trapReason: "Scale trap: $du$ already contains $2x\\,dx$, so $4x\\,dx = 2\\,du$, not $4\\,du$!" },
            { expr: "4x dx = 0.5 du", correct: false, trapReason: "$4x$ is DOUBLE $2x$, not half of it." },
            { expr: "du = x^2 dx", correct: false, trapReason: "Differentiate $x^2 + 5$ to get $du = 2x\\,dx$." }
          ]
        },
        {
          prompt: "Step 2: Integrate $\\int 2u^3\\,du$ and substitute $u = x^2 + 5$ back.",
          rule: "Integrate & Back-Substitute",
          result: "0.5(x^2 + 5)^4 + C",
          accepted: ["0.5(x^2+5)^4+c", "(x^2+5)^4/2+c", "1/2(x^2+5)^4+c"],
          hint: "$\\int 2u^3\\,du = 2 \\cdot \\frac{u^4}{4} + C = \\frac{1}{2}u^4 + C$.",
          why: "$\\frac{1}{2}(x^2 + 5)^4 + C$. Differentiate to verify: $\\frac{1}{2} \\cdot 4(x^2+5)^3(2x) = 4x(x^2+5)^3$ ✓",
          choices: [
            { expr: "0.5(x^2 + 5)^4 + C", correct: true },
            { expr: "2(x^2 + 5)^4 + C", correct: false, trapReason: "Forgot to divide by the new exponent $4$ ($2/4 = 1/2$)." },
            { expr: "0.5 u^4 + C", correct: false, trapReason: "Always back-substitute $u = x^2 + 5$ so your final answer is in $x$!" },
            { expr: "6(x^2 + 5)^2 + C", correct: false, trapReason: "You differentiated $2u^3$ instead of integrating it." }
          ]
        }
      ]
    },
    {
      id: "calc-partial-deriv",
      track: "calculus",
      difficulty: "Advanced",
      xp: 50,
      gems: 11,
      linkedNodeId: "calc3-partials-ode",
      title: "Partial Derivative $\\partial f / \\partial x$",
      given: "f(x, y) = 3x^2y^3 + 5y^2 - 4x",
      goal: "Compute $\\frac{\\partial f}{\\partial x}$ and evaluate at $(2, 1)$.",
      steps: [
        {
          prompt: "Step 1: Differentiate with respect to $x$, treating $y$ as a frozen constant.",
          rule: "Hold $y$ Constant",
          result: "6xy^3 - 4",
          accepted: ["6xy^3 - 4", "6x*y^3 - 4"],
          hint: "$3y^3$ is just a constant multiplier on $x^2$, and $5y^2$ has NO $x$ so its $x$-derivative is $0$!",
          why: "$\\frac{\\partial f}{\\partial x} = 6xy^3 + 0 - 4 = 6xy^3 - 4$.",
          choices: [
            { expr: "6xy^3 - 4", correct: true },
            { expr: "6xy^3 + 10y - 4", correct: false, trapReason: "Frozen-variable trap: $5y^2$ has no $x$, so with respect to $x$ it's a constant whose derivative is $0$!" },
            { expr: "18xy^2 - 4", correct: false, trapReason: "Do NOT differentiate $y^3$ when taking $\\partial/\\partial x$ — freeze $y^3$ untouched!" },
            { expr: "6xy^3 + 5y^2 - 4", correct: false, trapReason: "The standalone constant term $5y^2$ vanishes under $\\partial/\\partial x$." }
          ]
        },
        {
          prompt: "Step 2: Evaluate $\\frac{\\partial f}{\\partial x}$ at $(x, y) = (2, 1)$.",
          rule: "Plug in $x = 2, y = 1$",
          result: "8",
          accepted: ["8"],
          numericTarget: 8,
          hint: "$6(2)(1^3) - 4$.",
          why: "$6(2)(1) - 4 = 12 - 4 = 8$.",
          choices: [
            { expr: "8", correct: true },
            { expr: "12", correct: false, trapReason: "Don't forget the $-4$ term!" },
            { expr: "18", correct: false, trapReason: "$5y^2$ disappeared in Step 1." },
            { expr: "2", correct: false, trapReason: "$6(2)(1) = 12$, and $12 - 4 = 8$." }
          ]
        }
      ]
    },

    // ---------- PHYSICS (6) ----------
    {
      id: "phys-kinematics-stop",
      track: "physics",
      difficulty: "Foundations",
      xp: 40,
      gems: 9,
      linkedNodeId: "physics-kinematics",
      title: "Braking Distance Derivation",
      given: "v_0 = 20\\text{ m/s},\\quad a = -4\\text{ m/s}^2,\\quad v_f = 0",
      goal: "Find stopping time $t$ and stopping distance $\\Delta x$.",
      steps: [
        {
          prompt: "Step 1: Solve $v_f = v_0 + at$ for stopping time $t$.",
          rule: "$t = \\frac{v_f - v_0}{a}$",
          result: "t = 5 s",
          accepted: ["t = 5 s", "t = 5", "5 s", "5"],
          numericTarget: 5,
          hint: "$0 = 20 + (-4)t \\Rightarrow 4t = 20$.",
          why: "$t = \\frac{0 - 20}{-4} = 5\\text{ s}$.",
          choices: [
            { expr: "t = 5 s", correct: true },
            { expr: "t = -5 s", correct: false, trapReason: "Sign trap: $(0 - 20)/(-4) = (-20)/(-4) = +5\\text{ s}$. Time moves forward!" },
            { expr: "t = 80 s", correct: false, trapReason: "Divide $20$ by $4$, don't multiply!" },
            { expr: "t = 16 s", correct: false, trapReason: "Use $v_0 / |a|$, not $v_0 - |a|$." }
          ]
        },
        {
          prompt: "Step 2: Plug $t = 5\\text{ s}$ into $\\Delta x = v_0 t + \\frac{1}{2}at^2$ (or $v_{\\text{avg}} \\cdot t$).",
          rule: "Kinematics Displacement",
          result: "50 m",
          accepted: ["50 m", "50", "x = 50 m", "x = 50"],
          numericTarget: 50,
          hint: "$20(5) + \\frac{1}{2}(-4)(5^2) = 100 - 50$.",
          why: "$\\Delta x = 100 - 50 = 50\\text{ m}$. Shortcut check: average speed is $(20+0)/2 = 10\\text{ m/s} \\times 5\\text{ s} = 50\\text{ m}$ ✓",
          choices: [
            { expr: "50 m", correct: true },
            { expr: "100 m", correct: false, trapReason: "Constant-speed trap: $20 \\times 5 = 100\\text{ m}$ ignores braking deceleration! Average speed is half of $v_0$." },
            { expr: "150 m", correct: false, trapReason: "Sign trap: acceleration is $-4\\text{ m/s}^2$, so the $\\frac{1}{2}at^2$ term SUBTRACTS $50\\text{ m}$!" },
            { expr: "0 m", correct: false, trapReason: "You forgot the $\\frac{1}{2}$ factor in $\\frac{1}{2}at^2$ ($100 - 100 = 0$)." }
          ]
        }
      ]
    },
    {
      id: "phys-projectile-peak",
      track: "physics",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "physics-projectiles-circular-torque",
      title: "Projectile Apex Height",
      given: "v_0 = 20\\text{ m/s at } 30^\\circ,\\quad g = 10\\text{ m/s}^2",
      goal: "Decompose $v_{0y}$ and derive maximum height $H$.",
      steps: [
        {
          prompt: "Step 1: Find the initial vertical velocity component $v_{0y} = v_0 \\sin(30^\\circ)$.",
          rule: "Vertical Component Projection",
          result: "v_0y = 10 m/s",
          accepted: ["v_0y=10m/s", "v0y=10", "10m/s", "10"],
          numericTarget: 10,
          hint: "Recall $\\sin(30^\\circ) = \\frac{1}{2}$.",
          why: "$v_{0y} = 20 \\cdot 0.5 = 10\\text{ m/s}$.",
          choices: [
            { expr: "v_0y = 10 m/s", correct: true },
            { expr: "v_0y = 17.3 m/s", correct: false, trapReason: "Trig-swap trap: $20\\cos(30^\\circ) = 17.3$ is the HORIZONTAL component $v_{0x}$, not vertical!" },
            { expr: "v_0y = 20 m/s", correct: false, trapReason: "Only the vertical component fights gravity — multiply by $\\sin(30^\\circ)$." },
            { expr: "v_0y = 5 m/s", correct: false, trapReason: "$20 \\times 0.5 = 10\\text{ m/s}$." }
          ]
        },
        {
          prompt: "Step 2: At max height, $v_y = 0$. Solve $0 = v_{0y}^2 - 2gH$ for $H$.",
          rule: "$H = \\frac{v_{0y}^2}{2g}$",
          result: "H = 5 m",
          accepted: ["h = 5 m", "h = 5", "5 m", "5"],
          numericTarget: 5,
          hint: "$H = \\frac{10^2}{2(10)} = \\frac{100}{20}$.",
          why: "$H = \\frac{100}{20} = 5\\text{ m}$.",
          choices: [
            { expr: "H = 5 m", correct: true },
            { expr: "H = 10 m", correct: false, trapReason: "Missing-2 trap: $v_y^2 = v_{0y}^2 - 2gH$ has a $2$ in the denominator ($100/20 = 5$)." },
            { expr: "H = 20 m", correct: false, trapReason: "You plugged total $v_0 = 20$ instead of vertical $v_{0y} = 10$!" },
            { expr: "H = 2.5 m", correct: false, trapReason: "$100 / 20 = 5\\text{ m}$." }
          ]
        }
      ]
    },
    {
      id: "phys-newton-friction",
      track: "physics",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "physics-newton-forces",
      title: "Block with Kinetic Friction ($F = ma$)",
      given: "m = 5\\text{ kg},\\quad F_{\\text{push}} = 35\\text{ N},\\quad \\mu_k = 0.2,\\quad g = 10\\text{ m/s}^2",
      goal: "Find normal force, friction force, and net acceleration $a$.",
      steps: [
        {
          prompt: "Step 1: Compute the kinetic friction force $f_k = \\mu_k N = \\mu_k mg$.",
          rule: "Kinetic Friction Law",
          result: "f_k = 10 N",
          accepted: ["f_k=10n", "fk=10n", "fk=10", "10n", "10"],
          numericTarget: 10,
          hint: "Normal force $N = mg = 5(10) = 50\\text{ N}$. Multiply by $\\mu_k = 0.2$.",
          why: "$f_k = 0.2 \\times 50\\text{ N} = 10\\text{ N}$ opposing the push.",
          choices: [
            { expr: "f_k = 10 N", correct: true },
            { expr: "f_k = 1 N", correct: false, trapReason: "Mass-vs-Weight trap: $N = mg = 50\\text{ N}$, NOT mass $5\\text{ kg}$!" },
            { expr: "f_k = 7 N", correct: false, trapReason: "Friction uses the Normal force $N = 50\\text{ N}$, not the push force $35\\text{ N}$." },
            { expr: "f_k = 50 N", correct: false, trapReason: "Multiply the $50\\text{ N}$ normal force by $\\mu_k = 0.2$." }
          ]
        },
        {
          prompt: "Step 2: Apply Newton's 2nd Law $F_{\\text{net}} = F_{\\text{push}} - f_k = ma$ to find $a$.",
          rule: "$a = \\frac{F_{\\text{push}} - f_k}{m}$",
          result: "a = 5 m/s^2",
          accepted: ["a=5m/s^2", "a=5", "5m/s^2", "5"],
          numericTarget: 5,
          hint: "$F_{\\text{net}} = 35 - 10 = 25\\text{ N}$, divided by $m = 5\\text{ kg}$.",
          why: "$a = \\frac{25\\text{ N}}{5\\text{ kg}} = 5\\text{ m/s}^2$.",
          choices: [
            { expr: "a = 5 m/s^2", correct: true },
            { expr: "a = 7 m/s^2", correct: false, trapReason: "Ignored friction! Subtract $f_k = 10\\text{ N}$ before dividing by $m$." },
            { expr: "a = 9 m/s^2", correct: false, trapReason: "Friction OPPOSES motion — subtract $10\\text{ N}$ from $35\\text{ N}$, never add it!" },
            { expr: "a = 0.5 m/s^2", correct: false, trapReason: "Divide $F_{\\text{net}}$ by mass $m = 5\\text{ kg}$, not weight $50\\text{ N}$." }
          ]
        }
      ]
    },
    {
      id: "phys-energy-ramp",
      track: "physics",
      difficulty: "Foundations",
      xp: 40,
      gems: 9,
      linkedNodeId: "physics-energy-momentum",
      title: "Conservation of Energy (Frictionless Slide)",
      given: "h = 20\\text{ m},\\quad v_0 = 0,\\quad g = 10\\text{ m/s}^2",
      goal: "Derive speed $v$ at the bottom without knowing mass $m$.",
      steps: [
        {
          prompt: "Step 1: Equate initial potential energy to final kinetic energy and cancel $m$.",
          rule: "$mgh = \\frac{1}{2}mv^2 \\Rightarrow v^2 = 2gh$",
          result: "v^2 = 2gh = 400",
          accepted: ["v^2=400", "v^2=2gh", "v^2=2gh=400"],
          hint: "Cancel $m$ from both sides, multiply by $2$: $v^2 = 2(10)(20)$.",
          why: "Mass cancels out completely! $v^2 = 2(10)(20) = 400\\text{ m}^2/\\text{s}^2$.",
          choices: [
            { expr: "v^2 = 2gh = 400", correct: true },
            { expr: "v^2 = gh = 200", correct: false, trapReason: "Missing-2 trap: multiplying $\\frac{1}{2}v^2 = gh$ by $2$ gives $v^2 = 2gh$." },
            { expr: "Need mass m first", correct: false, trapReason: "Mass $m$ appears linearly in both $mgh$ and $\\frac{1}{2}mv^2$, so it cancels!" },
            { expr: "v = 2gh = 400", correct: false, trapReason: "Don't forget $v$ is SQUARED in $\\frac{1}{2}mv^2$!" }
          ]
        },
        {
          prompt: "Step 2: Take the square root to obtain speed $v$.",
          rule: "$v = \\sqrt{2gh}$",
          result: "v = 20 m/s",
          accepted: ["v=20m/s", "v=20", "20m/s", "20"],
          numericTarget: 20,
          hint: "$\\sqrt{400} = 20$.",
          why: "$v = \\sqrt{400} = 20\\text{ m/s}$ (whether it's a marble or a bowling ball!).",
          choices: [
            { expr: "v = 20 m/s", correct: true },
            { expr: "v = 400 m/s", correct: false, trapReason: "Remember to take the square root of $400$!" },
            { expr: "v = 10 m/s", correct: false, trapReason: "$\\sqrt{400} = 20$, not $10$." },
            { expr: "v = 200 m/s", correct: false, trapReason: "Take $\\sqrt{400} = 20$, don't divide by $2$." }
          ]
        }
      ]
    },
    {
      id: "phys-dc-circuit",
      track: "physics",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "phys2-resistivity-ohms-dc",
      title: "Parallel + Series Resistor Network",
      given: "V = 24\\text{ V},\\quad R_1 = 4\\,\\Omega \\text{ in series with } (R_2 = 6\\,\\Omega \\parallel R_3 = 3\\,\\Omega)",
      goal: "Find $R_{\\text{eq}}$ and total battery current $I$.",
      steps: [
        {
          prompt: "Step 1: Collapse the parallel pair $R_2 = 6\\,\\Omega$ and $R_3 = 3\\,\\Omega$.",
          rule: "Product-over-Sum $R_p = \\frac{R_2 R_3}{R_2 + R_3}$",
          result: "R_p = 2 ohm",
          accepted: ["r_p=2ohm", "rp=2", "2ohm", "2"],
          numericTarget: 2,
          hint: "$\\frac{6 \\times 3}{6 + 3} = \\frac{18}{9}$.",
          why: "$R_p = \\frac{18}{9} = 2\\,\\Omega$ (always smaller than the smallest branch!).",
          choices: [
            { expr: "R_p = 2 ohm", correct: true },
            { expr: "R_p = 9 ohm", correct: false, trapReason: "Series-vs-Parallel trap: $6 + 3 = 9$ is for SERIES! Parallel resistors give LESS resistance." },
            { expr: "R_p = 0.5 ohm", correct: false, trapReason: "Reciprocal-flip trap: $\\frac{1}{6} + \\frac{1}{3} = \\frac{1}{2} = 0.5$ is $1/R_p$ — flip it to get $R_p = 2\\,\\Omega$!" },
            { expr: "R_p = 4.5 ohm", correct: false, trapReason: "Parallel combination is harmonic, not the arithmetic average." }
          ]
        },
        {
          prompt: "Step 2: Add $R_1 = 4\\,\\Omega$ in series, then solve $I = V / R_{\\text{eq}}$.",
          rule: "Series Sum & Ohm's Law ($I = V/R$)",
          result: "I = 4 A",
          accepted: ["i=4a", "i=4", "4a", "4"],
          numericTarget: 4,
          hint: "$R_{\\text{eq}} = 4 + 2 = 6\\,\\Omega$, then $I = 24 / 6$.",
          why: "$R_{\\text{eq}} = 6\\,\\Omega \\Rightarrow I = \\frac{24\\text{ V}}{6\\,\\Omega} = 4\\text{ A}$.",
          choices: [
            { expr: "I = 4 A", correct: true },
            { expr: "I = 6 A", correct: false, trapReason: "$6\\,\\Omega$ is the total resistance; now divide $V = 24\\text{ V}$ by $6\\,\\Omega$ to get $4\\text{ A}$." },
            { expr: "I = 0.25 A", correct: false, trapReason: "Ohm's Law is $I = V/R$, not $R/V$!" },
            { expr: "I = 144 A", correct: false, trapReason: "Divide $V$ by $R$, never multiply." }
          ]
        }
      ]
    },
    {
      id: "phys-thin-lens",
      track: "physics",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "physics-mirrors-lenses-concave-convex",
      title: "Convex Lens Image Location",
      given: "f = +10\\text{ cm},\\quad d_o = 30\\text{ cm}",
      goal: "Derive image distance $d_i$ and magnification $m$.",
      steps: [
        {
          prompt: "Step 1: Isolate $\\frac{1}{d_i}$ from $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$.",
          rule: "Thin Lens Equation",
          result: "1/d_i = 2/30 = 1/15",
          accepted: ["1/d_i=1/15", "1/di=1/15", "1/15", "2/30"],
          hint: "$\\frac{1}{10} - \\frac{1}{30} = \\frac{3}{30} - \\frac{1}{30}$.",
          why: "$\\frac{1}{d_i} = \\frac{3 - 1}{30} = \\frac{2}{30} = \\frac{1}{15}\\text{ cm}^{-1}$.",
          choices: [
            { expr: "1/d_i = 2/30 = 1/15", correct: true },
            { expr: "1/d_i = 4/30", correct: false, trapReason: "Sign trap: subtract $\\frac{1}{d_o}$ from $\\frac{1}{f}$, don't add them." },
            { expr: "d_i = 10 - 30 = -20", correct: false, trapReason: "Reciprocal trap: you cannot drop the $1/(\\cdot)$ reciprocals!" },
            { expr: "1/d_i = -1/20", correct: false, trapReason: "$\\frac{1}{10} - \\frac{1}{30} \\neq \\frac{1}{10-30}$ — find a common denominator ($30$)." }
          ]
        },
        {
          prompt: "Step 2: Flip to get $d_i$ and compute magnification $m = -\\frac{d_i}{d_o}$.",
          rule: "Reciprocal & Magnification Sign",
          result: "d_i = 15 cm, m = -0.5",
          accepted: ["d_i=15cm,m=-0.5", "di=15,m=-0.5", "m=-0.5", "15"],
          numericTarget: 15,
          hint: "$d_i = +15\\text{ cm}$ (real image), and $m = -15/30$.",
          why: "$d_i = +15\\text{ cm}$ (real) and $m = -0.5$ (inverted and half-sized).",
          choices: [
            { expr: "d_i = 15 cm, m = -0.5", correct: true },
            { expr: "d_i = 15 cm, m = +0.5", correct: false, trapReason: "Sign trap: $m = -d_i/d_o$ has a negative sign — real images are INVERTED ($m < 0$)!" },
            { expr: "d_i = 15 cm, m = -2", correct: false, trapReason: "Ratio flip: $m = -d_i/d_o = -15/30 = -0.5$, not $-d_o/d_i$." },
            { expr: "d_i = 1/15 cm, m = -0.5", correct: false, trapReason: "Always flip $1/d_i = 1/15$ to get $d_i = 15\\text{ cm}$." }
          ]
        }
      ]
    },

    // ---------- CHEMISTRY (6) ----------
    {
      id: "chem-stoich-bridge",
      track: "chemistry",
      difficulty: "Foundations",
      xp: 45,
      gems: 10,
      linkedNodeId: "chem-moles-stoich",
      title: "Mass → Mole → Mass Stoichiometry",
      given: "2\\text{H}_2 + \\text{O}_2 \\to 2\\text{H}_2\\text{O},\\quad \\text{start with } 8\\text{ g H}_2\\ (M=2\\text{ g/mol})",
      goal: "Derive grams of $\\text{H}_2\\text{O}$ ($M = 18\\text{ g/mol}$) formed.",
      steps: [
        {
          prompt: "Step 1: Convert $8\\text{ g H}_2$ into moles of $\\text{H}_2$.",
          rule: "$n = \\frac{\\text{mass}}{M}$",
          result: "4 mol H2",
          accepted: ["4molh2", "4mol", "4"],
          numericTarget: 4,
          hint: "Divide $8\\text{ g}$ by $2\\text{ g/mol}$.",
          why: "$n(\\text{H}_2) = \\frac{8\\text{ g}}{2\\text{ g/mol}} = 4\\text{ mol H}_2$.",
          choices: [
            { expr: "4 mol H2", correct: true },
            { expr: "16 mol H2", correct: false, trapReason: "Unit trap: divide grams by g/mol — multiplying gives $\\text{g}^2/\\text{mol}$!" },
            { expr: "8 mol H2", correct: false, trapReason: "Hydrogen gas is diatomic $\\text{H}_2$ ($M = 2\\text{ g/mol}$), not monatomic $\\text{H}$!" },
            { expr: "2 mol H2", correct: false, trapReason: "$8 / 2 = 4\\text{ mol}$." }
          ]
        },
        {
          prompt: "Step 2: Cross the mole bridge ($2\\text{ mol H}_2 : 2\\text{ mol H}_2\\text{O}$) and convert to grams of $\\text{H}_2\\text{O}$.",
          rule: "Mole Ratio (1:1) × Molar Mass ($18\\text{ g/mol}$)",
          result: "72 g H2O",
          accepted: ["72gh2o", "72g", "72"],
          numericTarget: 72,
          hint: "$4\\text{ mol H}_2\\text{O} \\times 18\\text{ g/mol}$.",
          why: "$4\\text{ mol} \\times \\frac{2}{2} \\times 18\\text{ g/mol} = 72\\text{ g H}_2\\text{O}$.",
          choices: [
            { expr: "72 g H2O", correct: true },
            { expr: "144 g H2O", correct: false, trapReason: "Double-count trap: the ratio $2:2$ simplifies to $1:1$ — do NOT multiply by the coefficient $2$ again!" },
            { expr: "36 g H2O", correct: false, trapReason: "You have $4\\text{ mol}$, not $2\\text{ mol}$ ($4 \\times 18 = 72\\text{ g}$)." },
            { expr: "8 g H2O", correct: false, trapReason: "Grams are not 1:1 across different molecules — always convert via moles!" }
          ]
        }
      ]
    },
    {
      id: "chem-dilution-m1v1",
      track: "chemistry",
      difficulty: "Foundations",
      xp: 35,
      gems: 8,
      linkedNodeId: "chem2-solutions-concentration",
      title: "Stock Solution Dilution ($M_1V_1 = M_2V_2$)",
      given: "M_1 = 6.0\\text{ M},\\quad M_2 = 1.5\\text{ M},\\quad V_2 = 200\\text{ mL}",
      goal: "Find required stock volume $V_1$ and water to add.",
      steps: [
        {
          prompt: "Step 1: Solve $M_1V_1 = M_2V_2$ for stock volume $V_1$.",
          rule: "Conservation of Solute Moles",
          result: "V_1 = 50 mL",
          accepted: ["v_1=50ml", "v1=50ml", "v1=50", "50ml", "50"],
          numericTarget: 50,
          hint: "$V_1 = \\frac{1.5 \\times 200}{6.0} = \\frac{300}{6}$.",
          why: "$V_1 = 50\\text{ mL}$ of $6.0\\text{ M}$ stock solution.",
          choices: [
            { expr: "V_1 = 50 mL", correct: true },
            { expr: "V_1 = 800 mL", correct: false, trapReason: "Inverted-ratio trap: diluting a concentrated stock ALWAYS requires LESS than final volume ($50 < 200\\text{ mL}$)!" },
            { expr: "V_1 = 100 mL", correct: false, trapReason: "$6.0\\text{ M}$ is $4\\times$ stronger than $1.5\\text{ M}$, so take $1/4$ of $200\\text{ mL} = 50\\text{ mL}$." },
            { expr: "V_1 = 25 mL", correct: false, trapReason: "$300 / 6 = 50\\text{ mL}$." }
          ]
        },
        {
          prompt: "Step 2: How much deionized water must be added to reach $V_2 = 200\\text{ mL}$?",
          rule: "$V_{\\text{water}} = V_2 - V_1$",
          result: "150 mL water",
          accepted: ["150mlwater", "150ml", "150"],
          numericTarget: 150,
          hint: "Subtract the $50\\text{ mL}$ of stock from the $200\\text{ mL}$ target total.",
          why: "$200 - 50 = 150\\text{ mL}$ of water brings the total to $200\\text{ mL}$.",
          choices: [
            { expr: "150 mL water", correct: true },
            { expr: "200 mL water", correct: false, trapReason: "Classic lab trap: adding $200\\text{ mL}$ water to $50\\text{ mL}$ stock makes $250\\text{ mL}$ total (over-diluted)!" },
            { expr: "50 mL water", correct: false, trapReason: "$50\\text{ mL}$ is the stock; $150\\text{ mL}$ is the added water." },
            { expr: "250 mL water", correct: false, trapReason: "Subtract $V_1$ from $V_2$, don't add them." }
          ]
        }
      ]
    },
    {
      id: "chem-ph-strong-base",
      track: "chemistry",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "chem-acids-bases-ph",
      title: "pH of a Strong Base ($\\text{NaOH}$)",
      given: "0.001\\text{ M NaOH} = 10^{-3}\\text{ M OH}^-",
      goal: "Derive pOH first, then convert to pH at $25^\\circ\\text{C}$.",
      steps: [
        {
          prompt: "Step 1: Compute $\\text{pOH} = -\\log_{10}[\\text{OH}^-]$.",
          rule: "Logarithmic pOH Definition",
          result: "pOH = 3",
          accepted: ["poh = 3", "3"],
          numericTarget: 3,
          hint: "$-\\log_{10}(10^{-3}) = 3$.",
          why: "Because $\\text{NaOH}$ releases $\\text{OH}^-$, $-\\log(10^{-3}) = 3$ is the **pOH**, NOT the pH!",
          choices: [
            { expr: "pOH = 3", correct: true },
            { expr: "pH = 3", correct: false, trapReason: "Base-vs-Acid trap: $\\text{NaOH}$ is a BASE! A pH of $3$ would be lemon-juice acidic — $3$ is the pOH!" },
            { expr: "pOH = -3", correct: false, trapReason: "Remember the negative sign in $-\\log_{10}(10^{-3}) = +3$." },
            { expr: "pOH = 0.001", correct: false, trapReason: "Take $-\\log_{10}$ of the concentration." }
          ]
        },
        {
          prompt: "Step 2: Convert pOH to pH using $\\text{pH} + \\text{pOH} = 14$.",
          rule: "Water Auto-Ionization Complement",
          result: "pH = 11",
          accepted: ["ph = 11", "11"],
          numericTarget: 11,
          hint: "$14 - 3 = 11$.",
          why: "$\\text{pH} = 14 - 3 = 11$ (strongly basic, $> 7$ ✓).",
          choices: [
            { expr: "pH = 11", correct: true },
            { expr: "pH = 3", correct: false, trapReason: "You stopped at pOH! Subtract from $14$ to get pH $= 11$." },
            { expr: "pH = 17", correct: false, trapReason: "Subtract pOH from $14$, don't add it." },
            { expr: "pH = 7", correct: false, trapReason: "$7$ is neutral water; $0.001\\text{ M NaOH}$ is clearly basic ($11$)." }
          ]
        }
      ]
    },
    {
      id: "chem-balance-combustion",
      track: "chemistry",
      difficulty: "Foundations",
      xp: 40,
      gems: 9,
      linkedNodeId: "chem-balancing-reactions",
      title: "Propane Combustion Balancing",
      given: "\\text{C}_3\\text{H}_8 + \\text{O}_2 \\to \\text{CO}_2 + \\text{H}_2\\text{O}",
      goal: "Balance C, H, then O systematically.",
      steps: [
        {
          prompt: "Step 1: Balance Carbon ($3$) and Hydrogen ($8$) on the product side first.",
          rule: "CHO Order (Save Free $\\text{O}_2$ for Last)",
          result: "3 CO2 + 4 H2O",
          accepted: ["3co2+4h2o", "c3h8+o2->3co2+4h2o"],
          hint: "$3$ carbons need $3\\,\\text{CO}_2$; $8$ hydrogens need $4\\,\\text{H}_2\\text{O}$.",
          why: "$3\\,\\text{CO}_2$ matches $3\\text{ C}$ and $4\\,\\text{H}_2\\text{O}$ matches $4 \\times 2 = 8\\text{ H}$.",
          choices: [
            { expr: "3 CO2 + 4 H2O", correct: true },
            { expr: "3 CO2 + 8 H2O", correct: false, trapReason: "Subscript trap: each $\\text{H}_2\\text{O}$ already has $2$ H atoms, so $8\\,\\text{H}_2\\text{O}$ would give $16$ H!" },
            { expr: "C3O2 + H8O", correct: false, trapReason: "Golden rule: NEVER change chemical subscripts — only change front coefficients!" },
            { expr: "2 CO2 + 4 H2O", correct: false, trapReason: "Propane $\\text{C}_3\\text{H}_8$ has $3$ carbons, needing $3\\,\\text{CO}_2$." }
          ]
        },
        {
          prompt: "Step 2: Count total product oxygens ($3\\cdot 2 + 4\\cdot 1 = 10$) and balance $\\text{O}_2$.",
          rule: "Balance Diatomic $\\text{O}_2$",
          result: "5 O2",
          accepted: ["5o2", "5", "1,5,3,4"],
          numericTarget: 5,
          hint: "$10$ oxygen atoms require $10 / 2 = 5$ molecules of $\\text{O}_2$.",
          why: "Balanced equation: $\\text{C}_3\\text{H}_8 + 5\\text{O}_2 \\to 3\\text{CO}_2 + 4\\text{H}_2\\text{O}$ (coefficients $1, 5, 3, 4$) ✓",
          choices: [
            { expr: "5 O2", correct: true },
            { expr: "10 O2", correct: false, trapReason: "Diatomic trap: $10\\,\\text{O}_2$ contains $20$ oxygen atoms, not $10$!" },
            { expr: "3.5 O2", correct: false, trapReason: "Count oxygens in BOTH products: $3(2) + 4(1) = 10\\text{ O} = 5\\,\\text{O}_2$." },
            { expr: "7 O2", correct: false, trapReason: "$6 + 4 = 10$ oxygen atoms, so $5\\,\\text{O}_2$." }
          ]
        }
      ]
    },
    {
      id: "chem-gibbs-spont",
      track: "chemistry",
      difficulty: "Advanced",
      xp: 50,
      gems: 11,
      linkedNodeId: "chem2-thermo-entropy-gibbs",
      title: "Gibbs Free Energy & Unit Trap",
      given: "\\Delta H = -40\\text{ kJ},\\quad \\Delta S = -100\\text{ J/K},\\quad T = 300\\text{ K}",
      goal: "Compute $\\Delta G = \\Delta H - T\\Delta S$ in kJ and judge spontaneity.",
      steps: [
        {
          prompt: "Step 1: Convert $\\Delta S$ from $\\text{J/K}$ to $\\text{kJ/K}$ before multiplying by $T$.",
          rule: "Unit Matching ($1\\text{ kJ} = 1000\\text{ J}$)",
          result: "T * dS = -30 kJ",
          accepted: ["t*ds=-30kj", "-30kj", "-30", "-0.1kj/k"],
          numericTarget: -30,
          hint: "$-100\\text{ J/K} = -0.100\\text{ kJ/K}$. Multiply by $300\\text{ K}$.",
          why: "$T\\Delta S = 300\\text{ K} \\times (-0.100\\text{ kJ/K}) = -30\\text{ kJ}$.",
          choices: [
            { expr: "T * dS = -30 kJ", correct: true },
            { expr: "T * dS = -30,000 kJ", correct: false, trapReason: "#1 Thermo exam trap: $\\Delta H$ is in kJ while $\\Delta S$ is in J/K! Divide $\\Delta S$ by $1000$ first!" },
            { expr: "T * dS = +30 kJ", correct: false, trapReason: "$T$ is positive Kelvin and $\\Delta S$ is negative, so $T\\Delta S = -30\\text{ kJ}$." },
            { expr: "T * dS = -3 kJ", correct: false, trapReason: "$300 \\times (-0.1) = -30\\text{ kJ}$." }
          ]
        },
        {
          prompt: "Step 2: Compute $\\Delta G = -40 - (-30)$ and classify spontaneity.",
          rule: "$\\Delta G < 0 \\implies$ Spontaneous",
          result: "-10 kJ (Spontaneous)",
          accepted: ["-10kj(spontaneous)", "-10kj", "-10"],
          numericTarget: -10,
          hint: "Subtracting $-30$ adds $+30$: $-40 + 30 = -10\\text{ kJ}$.",
          why: "$\\Delta G = -10\\text{ kJ} < 0$, so the reaction is **spontaneous** at $300\\text{ K}$!",
          choices: [
            { expr: "-10 kJ (Spontaneous)", correct: true },
            { expr: "-70 kJ (Spontaneous)", correct: false, trapReason: "Double-negative trap: $-40 - (-30) = -40 + 30 = -10\\text{ kJ}$, NOT $-70\\text{ kJ}$!" },
            { expr: "+10 kJ (Non-spontaneous)", correct: false, trapReason: "$-40 + 30 = -10$, which stays negative." },
            { expr: "-10 kJ (Non-spontaneous)", correct: false, trapReason: "Negative $\\Delta G$ ALWAYS means spontaneous (exergonic)!" }
          ]
        }
      ]
    },
    {
      id: "chem-ideal-gas",
      track: "chemistry",
      difficulty: "Intermediate",
      xp: 45,
      gems: 10,
      linkedNodeId: "chem-gas-thermo-organic",
      title: "Combined Gas Law & Kelvin Trap",
      given: "P_1 = 2\\text{ atm},\\ V_1 = 6\\text{ L},\\ T_1 = 27^\\circ\\text{C} \\to P_2 = 3\\text{ atm},\\ T_2 = 177^\\circ\\text{C}",
      goal: "Convert to Kelvin and derive final volume $V_2$.",
      steps: [
        {
          prompt: "Step 1: Convert both Celsius temperatures into Kelvin ($K = {}^\\circ\\text{C} + 273$).",
          rule: "Absolute Kelvin Scale",
          result: "T_1 = 300 K, T_2 = 450 K",
          accepted: ["t_1=300k,t_2=450k", "300k,450k", "300,450"],
          hint: "Add $273$ to $27$ and to $177$.",
          why: "$T_1 = 300\\text{ K}$ and $T_2 = 450\\text{ K}$ (notice $T_2 / T_1 = 1.5$, NOT $177/27$!).",
          choices: [
            { expr: "T_1 = 300 K, T_2 = 450 K", correct: true },
            { expr: "Keep 27 C and 177 C", correct: false, trapReason: "#1 Gas Law trap: ratios in Celsius fail completely — ALWAYS convert to Kelvin!" },
            { expr: "T_1 = 246 K, T_2 = 96 K", correct: false, trapReason: "ADD $273$ to Celsius, never subtract." },
            { expr: "T_1 = 300 K, T_2 = 400 K", correct: false, trapReason: "$177 + 273 = 450\\text{ K}$." }
          ]
        },
        {
          prompt: "Step 2: Solve $V_2 = V_1 \\cdot \\frac{P_1}{P_2} \\cdot \\frac{T_2}{T_1}$.",
          rule: "Combined Gas Law $\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}$",
          result: "V_2 = 6 L",
          accepted: ["v_2=6l", "v2=6l", "v2=6", "6l", "6"],
          numericTarget: 6,
          hint: "$6 \\times \\frac{2}{3} \\times \\frac{450}{300} = 6 \\times \\frac{2}{3} \\times \\frac{3}{2}$.",
          why: "Pressure rose by $3/2$ while temperature rose by $3/2$ — they cancel cleanly, keeping $V_2 = 6\\text{ L}$!",
          choices: [
            { expr: "V_2 = 6 L", correct: true },
            { expr: "V_2 = 13.5 L", correct: false, trapReason: "Pressure inverse trap: higher pressure ($2 \\to 3\\text{ atm}$) SHRINKS volume ($\\times 2/3$), not expands it!" },
            { expr: "V_2 = 4 L", correct: false, trapReason: "You accounted for pressure ($\\times 2/3$) but forgot heating ($\\times 450/300 = 3/2$)." },
            { expr: "V_2 = 26.2 L", correct: false, trapReason: "You plugged Celsius ($177/27$) instead of Kelvin ($450/300$)!" }
          ]
        }
      ]
    }
  ];

  // ==================== INFINITE PROCEDURAL DERIVATION GENERATORS ====================
  function randInt(lo, hi) {
    return Math.floor(Math.random() * (hi - lo + 1)) + lo;
  }

  function generateProceduralDerivation(kind) {
    const mode = kind || ["linear", "quadratic", "kinematics"][randInt(0, 2)];

    if (mode === "quadratic") {
      // (x - r1)(x - r2) = 0 -> x^2 + bx + c = 0
      const r1 = randInt(2, 7);
      const r2 = -randInt(1, 5);
      const b = -(r1 + r2);
      const c = r1 * r2;
      const bStr = b === 0 ? "" : b > 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
      const cStr = c < 0 ? `- ${Math.abs(c)}` : `+ ${c}`;
      const f1 = r1 > 0 ? `(x - ${r1})` : `(x + ${Math.abs(r1)})`;
      const f2 = r2 < 0 ? `(x + ${Math.abs(r2)})` : `(x - ${r2})`;
      return {
        id: `proc-quad-${Date.now()}`,
        track: "algebra",
        difficulty: "Procedural",
        procedural: true,
        xp: 40,
        gems: 9,
        linkedNodeId: "quadratics-symmetry",
        title: "Fresh Quadratic Factoring Derivation",
        given: `x^2 ${bStr} ${cStr} = 0`,
        goal: "Factor and solve for both roots step by step.",
        steps: [
          {
            prompt: `Step 1: Factor $x^2 ${bStr} ${cStr}$ into two binomials.`,
            rule: `Find $p, q$ with $pq = ${c}$ and $p + q = ${b}$`,
            result: `${f1}${f2} = 0`,
            accepted: [`${f1}${f2}=0`, `${f2}${f1}=0`],
            hint: `Check $(- ${r1}) \\cdot (+${Math.abs(r2)}) = ${c}$ and $-${r1} + ${Math.abs(r2)} = ${b}$.`,
            why: `Expanding ${f1}${f2} recovers $x^2 ${bStr} ${cStr} = 0$.`,
            choices: [
              { expr: `${f1}${f2} = 0`, correct: true },
              { expr: `(x + ${r1})(x - ${Math.abs(r2)}) = 0`, correct: false, trapReason: `Sign-swap trap: that expands to middle term ${r1 - Math.abs(r2)}x instead of ${b}x.` },
              { expr: `(x - ${r1})(x - ${Math.abs(r2)}) = 0`, correct: false, trapReason: `Constant-sign trap: two negatives multiply to +${Math.abs(c)}, not ${c}.` },
              { expr: `(x + ${r1})(x + ${Math.abs(r2)}) = 0`, correct: false, trapReason: `Constant-sign trap: two positives multiply to +${Math.abs(c)}, not ${c}.` }
            ]
          },
          {
            prompt: "Step 2: Apply the Zero-Product Property to state both roots.",
            rule: "Set Each Factor Equal to Zero",
            result: `x = ${r1}, ${r2}`,
            accepted: [`x=${r1},${r2}`, `x=${r2},${r1}`, `${r1},${r2}`, `${r2},${r1}`],
            hint: `Flip the signs inside ${f1} and ${f2}.`,
            why: `$x - ${r1} = 0 \\Rightarrow x = ${r1}$, and $x + ${Math.abs(r2)} = 0 \\Rightarrow x = ${r2}$.`,
            choices: [
              { expr: `x = ${r1}, ${r2}`, correct: true },
              { expr: `x = ${-r1}, ${-r2}`, correct: false, trapReason: "Sign-flip trap: setting $(x - r) = 0$ gives $x = +r$, NOT $-r$!" },
              { expr: `x = ${r1}, ${Math.abs(r2)}`, correct: false, trapReason: `Setting $(x + ${Math.abs(r2)}) = 0$ gives $x = ${r2}$.` },
              { expr: `x = ${-r1}, ${r2}`, correct: false, trapReason: `Setting $(x - ${r1}) = 0$ gives $x = +${r1}$.` }
            ]
          }
        ]
      };
    }

    if (mode === "kinematics") {
      const a = randInt(2, 6);
      const t = randInt(3, 7);
      const v0 = randInt(4, 14);
      const vf = v0 + a * t;
      const dist = v0 * t + 0.5 * a * t * t;
      return {
        id: `proc-kin-${Date.now()}`,
        track: "physics",
        difficulty: "Procedural",
        procedural: true,
        xp: 40,
        gems: 9,
        linkedNodeId: "physics-kinematics",
        title: "Fresh 1D Acceleration Derivation",
        given: `v_0 = ${v0}\\text{ m/s},\\quad a = ${a}\\text{ m/s}^2,\\quad t = ${t}\\text{ s}`,
        goal: "Derive final velocity $v_f$ and total displacement $\\Delta x$.",
        steps: [
          {
            prompt: "Step 1: Compute final velocity $v_f = v_0 + at$.",
            rule: "Constant-Acceleration Velocity Law",
            result: `v_f = ${vf} m/s`,
            accepted: [`v_f=${vf}m/s`, `vf=${vf}m/s`, `vf=${vf}`, `${vf}m/s`, `${vf}`],
            numericTarget: vf,
            hint: `$${v0} + (${a})(${t}) = ${v0} + ${a * t}$.`,
            why: `$v_f = ${v0} + ${a * t} = ${vf}\\text{ m/s}$.`,
            choices: [
              { expr: `v_f = ${vf} m/s`, correct: true },
              { expr: `v_f = ${a * t} m/s`, correct: false, trapReason: `Forgot initial speed $v_0 = ${v0}\\text{ m/s}$!` },
              { expr: `v_f = ${v0 + a + t} m/s`, correct: false, trapReason: "Multiply $a \\times t$ instead of adding $a + t$." },
              { expr: `v_f = ${Math.max(1, Math.abs(v0 - a * t))} m/s`, correct: false, trapReason: "Acceleration is positive, so ADD $at$ to $v_0$." }
            ]
          },
          {
            prompt: "Step 2: Compute total displacement $\\Delta x = v_0 t + \\frac{1}{2}at^2$.",
            rule: "Displacement Integral / Average Speed",
            result: `${dist} m`,
            accepted: [`${dist}m`, `${dist}`, `x=${dist}m`, `x=${dist}`],
            numericTarget: dist,
            hint: `$${v0}(${t}) + 0.5(${a})(${t}^2) = ${v0 * t} + ${0.5 * a * t * t}$.`,
            why: `$\\Delta x = ${v0 * t} + ${0.5 * a * t * t} = ${dist}\\text{ m}$ (check: $v_{\\text{avg}} \\cdot t = ${(v0 + vf) / 2} \\times ${t} = ${dist}\\text{ m}$ ✓).`,
            choices: [
              { expr: `${dist} m`, correct: true },
              { expr: `${v0 * t + a * t * t} m`, correct: false, trapReason: "Missing-half trap: the formula is $\\frac{1}{2}at^2$, NOT $at^2$!" },
              { expr: `${vf * t} m`, correct: false, trapReason: "You multiplied final speed $v_f$ by $t$ as if the object went that fast the whole time." },
              { expr: `${v0 * t} m`, correct: false, trapReason: "That's only the $v_0 t$ piece — add $\\frac{1}{2}at^2$!" }
            ]
          }
        ]
      };
    }

    // Default: Multi-step linear equation a(bx + c) = dx + e
    const xAns = randInt(2, 9);
    const a = randInt(2, 4);
    const b = randInt(2, 4);
    const c = randInt(1, 5);
    const d = randInt(1, a * b - 1);
    const e = a * (b * xAns + c) - d * xAns;
    const ab = a * b;
    const ac = a * c;
    const coeff = ab - d;
    const rhs = e - ac;

    return {
      id: `proc-lin-${Date.now()}`,
      track: "algebra",
      difficulty: "Procedural",
      procedural: true,
      xp: 35,
      gems: 8,
      linkedNodeId: "algebra-scale",
      title: "Fresh Linear Balance Derivation",
      given: `${a}(${b}x + ${c}) = ${d === 1 ? "x" : d + "x"} + ${e}`,
      goal: "Expand, collect terms, and isolate $x$.",
      steps: [
        {
          prompt: `Step 1: Distribute $${a}$ across $(${b}x + ${c})$.`,
          rule: "Distributive Property",
          result: `${ab}x + ${ac} = ${d === 1 ? "x" : d + "x"} + ${e}`,
          accepted: [`${ab}x+${ac}=${d === 1 ? "x" : d + "x"}+${e}`, `${ab}x+${ac}=${d}x+${e}`],
          hint: `Multiply $${a}$ by BOTH $${b}x$ and $${c}$.`,
          why: `$${a}(${b}x) + ${a}(${c}) = ${ab}x + ${ac}$.`,
          choices: [
            { expr: `${ab}x + ${ac} = ${d === 1 ? "x" : d + "x"} + ${e}`, correct: true },
            { expr: `${ab}x + ${c} = ${d === 1 ? "x" : d + "x"} + ${e}`, correct: false, trapReason: `Distribution trap: you forgot to multiply $${a} \\times ${c} = ${ac}$!` },
            { expr: `${a + b}x + ${ac} = ${d === 1 ? "x" : d + "x"} + ${e}`, correct: false, trapReason: `Multiply $${a} \\times ${b} = ${ab}$, don't add them.` },
            { expr: `${ab}x - ${ac} = ${d === 1 ? "x" : d + "x"} + ${e}`, correct: false, trapReason: "Positive times positive stays positive." }
          ]
        },
        {
          prompt: `Step 2: Collect $x$-terms on the left and constants on the right.`,
          rule: `Subtract $${d}x$ and $${ac}$ from Both Sides`,
          result: `${coeff}x = ${rhs}`,
          accepted: [`${coeff}x=${rhs}`],
          hint: `$${ab}x - ${d}x = ${coeff}x$ and $${e} - ${ac} = ${rhs}$.`,
          why: `$${coeff}x = ${rhs}$.`,
          choices: [
            { expr: `${coeff}x = ${rhs}`, correct: true },
            { expr: `${coeff}x = ${e + ac}`, correct: false, trapReason: `Sign-flip trap: subtract $${ac}$ from $${e}$ instead of adding.` },
            { expr: `${ab + d}x = ${rhs}`, correct: false, trapReason: `Sign-flip trap: subtract $${d}x$ from $${ab}x$ instead of adding.` },
            { expr: `${coeff}x = ${e}`, correct: false, trapReason: `Remember to subtract $${ac}$ from the right side too.` }
          ]
        },
        {
          prompt: `Step 3: Divide by $${coeff}$ to isolate $x$.`,
          rule: `Divide Both Sides by ${coeff}`,
          result: `x = ${xAns}`,
          accepted: [`x=${xAns}`, `${xAns}`],
          numericTarget: xAns,
          hint: `$${rhs} / ${coeff} = ${xAns}$.`,
          why: `$x = \\frac{${rhs}}{${coeff}} = ${xAns}$ ✓`,
          choices: [
            { expr: `x = ${xAns}`, correct: true },
            { expr: `x = ${rhs - coeff}`, correct: false, trapReason: `Divide by ${coeff}, don't subtract ${coeff}!` },
            { expr: `x = ${-xAns}`, correct: false, trapReason: "Positive divided by positive stays positive." },
            { expr: `x = ${xAns + 1}`, correct: false, trapReason: `Check division: ${coeff} × ${xAns} = ${rhs}.` }
          ]
        }
      ]
    };
  }

  // ==================== INTERACTIVE WORK STUDIO UI ====================
  let ui = {
    track: "all",
    activeProblem: PROBLEMS[0],
    mode: "guided", // "guided" | "typed"
    stepIdx: 0,
    completedSteps: [],
    feedback: null, // { ok, msg }
    showHint: false,
    showBoard: false,
    boardStrokes: [],
    finished: false,
    shuffledChoices: null
  };

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function selectProblem(prob) {
    ui.activeProblem = prob;
    ui.stepIdx = 0;
    ui.completedSteps = [];
    ui.feedback = null;
    ui.showHint = false;
    ui.finished = false;
    ui.shuffledChoices = prob.steps[0] ? shuffleArray(prob.steps[0].choices || []) : [];
  }

  function renderWorkStudioView(container, state, DATA, hooks) {
    if (!container) return;
    if (!state.derivationsSolved) state.derivationsSolved = {};
    const solvedMap = state.derivationsSolved;
    const prob = ui.activeProblem || PROBLEMS[0];
    if (!ui.shuffledChoices && prob.steps[ui.stepIdx]) {
      ui.shuffledChoices = shuffleArray(prob.steps[ui.stepIdx].choices || []);
    }

    const solvedCount = PROBLEMS.filter((p) => solvedMap[p.id]).length;
    const filteredList = ui.track === "all" ? PROBLEMS : PROBLEMS.filter((p) => p.track === ui.track);
    const curStep = prob.steps[ui.stepIdx] || null;
    const nodeMap = new Map((DATA && DATA.NODES ? DATA.NODES : []).map((n) => [n.id, n]));
    const linkedNode = prob.linkedNodeId ? nodeMap.get(prob.linkedNodeId) : null;

    container.innerHTML = `
      <div class="pr-work-shell">
        <header class="pr-studio-hero">
          <div>
            <div class="ml-hero-kicker">SHOW YOUR WORK · STEP-BY-STEP DERIVATION STUDIO</div>
            <h1 class="pr-studio-title">Prove Every Line, Catch Every Sign Trap</h1>
            <p class="pr-studio-sub">Solve multi-step Math, Physics, and Chemistry problems line by line—either guided with trap diagnostics or by typing each algebraic step yourself.</p>
          </div>
          <div class="pr-studio-hero-actions">
            <div class="pr-stat-pill"><strong>${solvedCount}/${PROBLEMS.length}</strong><span>Curated Solved</span></div>
            <button type="button" class="ml-btn-primary" id="pr-wk-gen-lin">↻ Fresh Linear</button>
            <button type="button" class="ml-btn-secondary" id="pr-wk-gen-quad">↻ Fresh Quadratic</button>
            <button type="button" class="ml-btn-secondary" id="pr-wk-gen-kin">↻ Fresh Kinematics</button>
          </div>
        </header>

        <div class="pr-work-layout">
          <aside class="pr-work-list-pane">
            <div class="pr-track-pills">
              ${TRACKS.map(
                (t) => `
                <button type="button" class="pr-pill-btn ${ui.track === t.id ? "active" : ""}" data-wk-track="${t.id}">
                  <span>${t.icon}</span> ${escapeHtml(t.label)}
                </button>
              `
              ).join("")}
            </div>
            <div class="pr-work-cards">
              ${filteredList
                .map((p) => {
                  const done = !!solvedMap[p.id];
                  const active = prob.id === p.id;
                  return `
                  <button type="button" class="pr-work-item ${active ? "active" : ""} ${done ? "done" : ""}" data-wk-select="${p.id}">
                    <div class="pr-work-item-top">
                      <span class="pr-work-tag">${escapeHtml(p.track)}</span>
                      <span class="pr-work-status">${done ? "✓ Solved" : `${p.steps.length} steps`}</span>
                    </div>
                    <div class="pr-work-item-title">${escapeHtml(p.title)}</div>
                    <div class="pr-work-item-eq">${fmtMath(p.given)}</div>
                  </button>
                `;
                })
                .join("")}
            </div>
          </aside>

          <section class="pr-work-stage">
            <div class="pr-work-stage-head">
              <div>
                <div class="pr-work-badges">
                  <span class="pr-work-tag">${escapeHtml(prob.track)}</span>
                  <span class="pr-work-diff">${escapeHtml(prob.difficulty)}</span>
                  <span class="pr-work-diff">+${prob.xp} XP</span>
                  ${linkedNode ? `<button type="button" class="ml-btn-mini" id="pr-wk-open-node">Lesson: ${escapeHtml(linkedNode.title)} →</button>` : ""}
                </div>
                <h2 class="pr-work-stage-title">${escapeHtml(prob.title)}</h2>
                <p class="pr-work-goal">${fmtMath(prob.goal)}</p>
              </div>
              <div class="pr-work-head-controls">
                <div class="pr-seg-toggle" role="group" aria-label="Input mode">
                  <button type="button" class="${ui.mode === "guided" ? "active" : ""}" data-wk-mode="guided">Guided Steps</button>
                  <button type="button" class="${ui.mode === "typed" ? "active" : ""}" data-wk-mode="typed">Type Your Step</button>
                </div>
                <button type="button" class="ml-btn-mini ${ui.showBoard ? "active" : ""}" id="pr-wk-toggle-wb">✏️ Whiteboard</button>
                <button type="button" class="ml-btn-mini" id="pr-wk-reset">↺ Reset</button>
              </div>
            </div>

            <div class="pr-proof-ledger">
              <div class="pr-ledger-row is-given">
                <span class="pr-ledger-num">Given</span>
                <div class="pr-ledger-expr">${fmtMath(prob.given, true)}</div>
                <span class="pr-ledger-rule">Starting Premise</span>
              </div>

              ${ui.completedSteps
                .map(
                  (cs, i) => `
                <div class="pr-ledger-row is-verified">
                  <span class="pr-ledger-num">Step ${i + 1} ✓</span>
                  <div class="pr-ledger-expr">${fmtMath(cs.result)}</div>
                  <span class="pr-ledger-rule">${fmtMath(cs.rule)}</span>
                </div>
              `
                )
                .join("")}
            </div>

            ${
              ui.finished
                ? `
              <div class="pr-work-complete-banner">
                <div>
                  <strong>✓ Derivation Verified — Q.E.D.</strong>
                  <p>Every step was mathematically sound with zero skipped logic. Ready for the next proof or a fresh procedural problem?</p>
                </div>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <button type="button" class="ml-btn-secondary" id="pr-wk-again">↻ Redo</button>
                  <button type="button" class="ml-btn-primary" id="pr-wk-next-prob">Next Problem →</button>
                </div>
              </div>
            `
                : curStep
                  ? `
              <div class="pr-work-step-box">
                <div class="pr-work-step-top">
                  <div class="pr-work-step-prompt">${fmtMath(curStep.prompt)}</div>
                  <button type="button" class="ml-btn-mini" id="pr-wk-hint">${ui.showHint ? "Hide Hint" : "💡 Hint"}</button>
                </div>

                ${ui.showHint ? `<div class="ml-hint-box" style="margin-bottom:10px;"><strong>Hint:</strong> ${fmtMath(curStep.hint)}</div>` : ""}

                ${
                  ui.feedback
                    ? `<div class="pr-step-feedback ${ui.feedback.ok ? "ok" : "nope"}">${fmtMath(ui.feedback.msg)}</div>`
                    : ""
                }

                ${
                  ui.mode === "guided"
                    ? `
                  <div class="pr-guided-grid">
                    ${(ui.shuffledChoices || curStep.choices || [])
                      .map(
                        (ch, idx) => `
                      <button type="button" class="pr-guided-choice" data-wk-choice="${idx}">
                        <span class="ml-key-num">${idx + 1}</span>
                        <span class="pr-guided-expr">${fmtMath(ch.expr)}</span>
                      </button>
                    `
                      )
                      .join("")}
                  </div>
                `
                    : `
                  <form id="pr-wk-typed-form" class="pr-typed-form">
                    <input type="text" id="pr-wk-typed-input" class="ml-answer-input" placeholder="Type next step (e.g. ${escapeHtml(curStep.result.slice(0, 16))}...)" autocomplete="off" />
                    <button type="submit" class="ml-btn-primary">Verify Step ↵</button>
                  </form>
                  <div class="pr-typed-tip">Accepts equivalent spacing, flipped sides, fractions, or plain numeric results. Switch to <strong>Guided Steps</strong> anytime.</div>
                `
                }
              </div>
            `
                  : ""
            }

            ${
              ui.showBoard
                ? `
              <div class="pr-work-wb-wrap">
                <div id="pr-wk-wb-mount"></div>
              </div>
            `
                : ""
            }
          </section>
        </div>
      </div>
    `;

    // Mount whiteboard if toggled open
    if (ui.showBoard && global.PRIMER_WHITEBOARD) {
      const wbMount = document.getElementById("pr-wk-wb-mount");
      if (wbMount) {
        global.PRIMER_WHITEBOARD.mountWhiteboard(wbMount, {
          height: 240,
          strokes: ui.boardStrokes,
          grid: "grid",
          onChange: (strokes) => {
            ui.boardStrokes = strokes;
          }
        });
      }
    }

    function advanceStep(stepObj, successMsg) {
      ui.completedSteps.push(stepObj);
      ui.showHint = false;
      ui.stepIdx += 1;
      if (ui.stepIdx >= prob.steps.length) {
        ui.finished = true;
        ui.feedback = { ok: true, msg: successMsg };
        const firstClear = !state.derivationsSolved[prob.id];
        state.derivationsSolved[prob.id] = { solvedAt: Date.now(), mode: ui.mode };
        if (hooks && hooks.onSolved) hooks.onSolved(prob, firstClear);
      } else {
        ui.feedback = { ok: true, msg: `✓ Verified: ${successMsg}` };
        ui.shuffledChoices = shuffleArray(prob.steps[ui.stepIdx].choices || []);
        if (hooks && hooks.onStepOk) hooks.onStepOk();
      }
      renderWorkStudioView(container, state, DATA, hooks);
    }

    // Track filters
    container.querySelectorAll("[data-wk-track]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        ui.track = btn.dataset.wkTrack;
        renderWorkStudioView(container, state, DATA, hooks);
      });
    });

    // Problem picker
    container.querySelectorAll("[data-wk-select]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        const found = PROBLEMS.find((p) => p.id === btn.dataset.wkSelect);
        if (found) selectProblem(found);
        renderWorkStudioView(container, state, DATA, hooks);
      });
    });

    // Procedural generators
    const bindGen = (id, kind) => {
      const b = document.getElementById(id);
      if (b) {
        b.addEventListener("click", () => {
          if (hooks && hooks.onTap) hooks.onTap();
          selectProblem(generateProceduralDerivation(kind));
          renderWorkStudioView(container, state, DATA, hooks);
        });
      }
    };
    bindGen("pr-wk-gen-lin", "linear");
    bindGen("pr-wk-gen-quad", "quadratic");
    bindGen("pr-wk-gen-kin", "kinematics");

    // Mode toggle
    container.querySelectorAll("[data-wk-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        ui.mode = btn.dataset.wkMode;
        ui.feedback = null;
        renderWorkStudioView(container, state, DATA, hooks);
      });
    });

    const wbToggle = document.getElementById("pr-wk-toggle-wb");
    if (wbToggle) {
      wbToggle.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        ui.showBoard = !ui.showBoard;
        renderWorkStudioView(container, state, DATA, hooks);
      });
    }

    const resetBtn = document.getElementById("pr-wk-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        selectProblem(prob);
        renderWorkStudioView(container, state, DATA, hooks);
      });
    }

    const openNodeBtn = document.getElementById("pr-wk-open-node");
    if (openNodeBtn && linkedNode && hooks && hooks.onOpenNode) {
      openNodeBtn.addEventListener("click", () => hooks.onOpenNode(linkedNode.id));
    }

    const hintBtn = document.getElementById("pr-wk-hint");
    if (hintBtn) {
      hintBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        ui.showHint = !ui.showHint;
        renderWorkStudioView(container, state, DATA, hooks);
      });
    }

    // Guided step click
    container.querySelectorAll("[data-wk-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.wkChoice, 10);
        const list = ui.shuffledChoices || (curStep && curStep.choices) || [];
        const picked = list[idx];
        if (!picked || !curStep) return;
        if (picked.correct) {
          advanceStep(curStep, curStep.why);
        } else {
          if (hooks && hooks.onStepFail) hooks.onStepFail();
          ui.feedback = { ok: false, msg: `⚠️ ${picked.trapReason || "Check that algebraic step carefully."}` };
          renderWorkStudioView(container, state, DATA, hooks);
        }
      });
    });

    // Free-input typed step check
    const typedForm = document.getElementById("pr-wk-typed-form");
    if (typedForm && curStep) {
      const inp = document.getElementById("pr-wk-typed-input");
      if (inp) inp.focus();
      typedForm.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const res = checkStepAnswer(curStep, inp ? inp.value : "");
        if (res.ok) {
          advanceStep(curStep, res.diag);
        } else {
          if (hooks && hooks.onStepFail) hooks.onStepFail();
          ui.feedback = { ok: false, msg: `⚠️ ${res.diag}` };
          renderWorkStudioView(container, state, DATA, hooks);
        }
      });
    }

    const againBtn = document.getElementById("pr-wk-again");
    if (againBtn) {
      againBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        selectProblem(prob);
        renderWorkStudioView(container, state, DATA, hooks);
      });
    }

    const nextProbBtn = document.getElementById("pr-wk-next-prob");
    if (nextProbBtn) {
      nextProbBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        const idx = PROBLEMS.findIndex((p) => p.id === prob.id);
        const nextP = idx >= 0 ? PROBLEMS[(idx + 1) % PROBLEMS.length] : PROBLEMS[0];
        selectProblem(nextP);
        renderWorkStudioView(container, state, DATA, hooks);
      });
    }
  }

  global.PRIMER_WORK_STUDIO = {
    TRACKS,
    PROBLEMS,
    normalizeExpr,
    checkStepAnswer,
    generateProceduralDerivation,
    selectProblemById(id) {
      const found = PROBLEMS.find((p) => p.id === id);
      if (found) selectProblem(found);
      return !!found;
    },
    renderWorkStudioView
  };
})(typeof window !== "undefined" ? window : globalThis);
