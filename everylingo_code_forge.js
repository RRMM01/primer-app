// EveryLingo Code Studio — Clean, Tutorial-First Interactive Coding Library & Live Workspace
// Features: 36 Hands-On Lessons starting from Absolute Zero (Start from Zero, Python, JavaScript,
// Algorithms, SQL, Git & Terminal, HTML/CSS), Plain-English Concept Tutorials First, Live Syntax-Highlighted Editor,
// Automated Check Diffs, Progressive Hints, SQL Result Tables, Live HTML Preview & Python Step-by-Step Tracer.
(function (root) {
  "use strict";

  const ENGINE = root.EVERYLINGO_CODE_ENGINE;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const TRACKS = [
    { id: "zero", label: "Start from Zero", desc: "Never coded before? Start here with 6 gentle, plain-English lessons." },
    { id: "python", label: "Python", desc: "Conditions, lists, dictionaries, recursion, and simple classes." },
    { id: "javascript", label: "JavaScript", desc: "Array transforms, closures, grouping data, and async order." },
    { id: "dsa", label: "Algorithms", desc: "Hash maps, stacks, binary search, two pointers, and dynamic programming." },
    { id: "sql", label: "SQL & Data", desc: "Querying tables, joining records, grouping totals, and filtering results." },
    { id: "shell", label: "Git & Terminal", desc: "Version control with Git, branches, and basic command-line tools." },
    { id: "html", label: "HTML & CSS", desc: "Clean page structure, Flexbox navigation bars, and CSS Grid layouts." },
    { id: "all", label: "All Lessons", desc: "Browse the entire coding library in recommended learning order." }
  ];

  const DIFF_LABELS = {
    "Start Here": { label: "Start Here", cls: "zero" },
    "Apprentice": { label: "Beginner", cls: "apprentice" },
    "Journeyman": { label: "Intermediate", cls: "journeyman" },
    "Adept": { label: "Intermediate+", cls: "adept" },
    "Architect": { label: "Advanced", cls: "architect" },
    "Boss": { label: "Challenge", cls: "boss" }
  };

  function getDiffInfo(diff) {
    return DIFF_LABELS[diff] || { label: diff || "Beginner", cls: "apprentice" };
  }

  const RANKS = [
    { min: 0, level: 1, title: "Getting Started", next: 3 },
    { min: 3, level: 2, title: "Basics Builder", next: 6 },
    { min: 6, level: 3, title: "Python Explorer", next: 10 },
    { min: 10, level: 4, title: "Problem Solver", next: 15 },
    { min: 15, level: 5, title: "Data & Queries", next: 20 },
    { min: 20, level: 6, title: "Web & Async", next: 25 },
    { min: 25, level: 7, title: "Full-Stack Builder", next: 30 },
    { min: 30, level: 8, title: "Systems Thinker", next: 34 },
    { min: 34, level: 9, title: "Senior Polymath", next: 36 },
    { min: 36, level: 10, title: "Studio Finisher", next: 36 }
  ];

  function getRankInfo(solvedCount) {
    let cur = RANKS[0];
    for (const r of RANKS) {
      if (solvedCount >= r.min) cur = r;
    }
    const pct = cur.next > cur.min
      ? Math.min(100, Math.round(((solvedCount - cur.min) / (cur.next - cur.min)) * 100))
      : 100;
    return { level: cur.level, title: cur.title, nextTarget: cur.next, pct };
  }

  // ==================== 36 INTERACTIVE CODING LESSONS (START FROM ZERO -> ADVANCED) ====================
  const QUESTS = [
    // -------- TRACK 0: START FROM ZERO (6 ABSOLUTE-BEGINNER LESSONS) --------
    {
      id: "zero-hello-print",
      track: "zero",
      order: 1,
      title: "Print Your First Message",
      difficulty: "Start Here",
      xp: 25,
      gems: 5,
      lang: "python",
      fileName: "hello.py",
      linkedNodeId: "py-variables-types-io",
      story: "Every programmer starts with a single line that makes the computer talk back. Use `print()` to display two short lines of text.",
      tutorial: {
        summary: "Code is simply a list of clear instructions you give to a computer. In Python, the `print()` command tells the computer to display a message in the output panel.",
        steps: [
          { label: "The print() command", text: "Write `print(...)` and put whatever you want to show inside the parentheses." },
          { label: "Wrap text in quotes", text: "Words and sentences need quotes around them, like `\"Hello, World!\"`. Quotes tell Python: treat this as plain text." },
          { label: "One instruction per line", text: "Python reads your code from top to bottom, running each line in order." }
        ],
        tip: "Make sure every opening quote `\"` has a matching closing quote `\"`, and capitalization matches exactly."
      },
      objective: "Print `Hello, World!` on the first line, and `Ready to code!` on the second line.",
      requirements: [
        "Line 1 prints `Hello, World!`.",
        "Line 2 prints `Ready to code!`."
      ],
      examples: [
        { input: "print(\"Hi there!\")", output: "Hi there!", note: "Shows the text inside the quotes" }
      ],
      conceptCode: "# Each print() call displays one line of text:\nprint(\"Hello, World!\")\nprint(\"My first program works!\")",
      hints: [
        "Type `print(\"Hello, World!\")` on the first line.",
        "Add a second line right below it: `print(\"Ready to code!\")`."
      ],
      starterCode: "# Try changing this and adding a second print() line:\nprint(\"Change me\")\n",
      solutionCode: "print(\"Hello, World!\")\nprint(\"Ready to code!\")\n",
      tests: [
        { name: "First line prints Hello, World!", stdoutLine: 0, expected: "Hello, World!" },
        { name: "Second line prints Ready to code!", stdoutLine: 1, expected: "Ready to code!" }
      ]
    },
    {
      id: "zero-variables",
      track: "zero",
      order: 2,
      title: "Store Values in Variables",
      difficulty: "Start Here",
      xp: 30,
      gems: 6,
      lang: "python",
      fileName: "variables.py",
      linkedNodeId: "py-variables-types-io",
      story: "Variables let your program remember things — like a name or a score — so you can reuse them anywhere in your code.",
      tutorial: {
        summary: "Think of a **variable** as a labeled box. You pick a clear label on the left, write `=`, and place a value inside on the right.",
        steps: [
          { label: "Store text (strings)", text: "`learner_name = \"Alex\"` creates a box labeled `learner_name` holding the text `\"Alex\"`." },
          { label: "Store numbers (integers)", text: "`level = 1` stores the number `1`. Numbers do NOT use quotes." },
          { label: "Use the box later", text: "`print(learner_name)` looks inside the box and prints `Alex` — no quotes around the variable name!" }
        ],
        tip: "Variable names cannot contain spaces. Programmers join words with underscores, like `learner_name`."
      },
      objective: "Set `learner_name` to `\"Alex\"` and `level` to `1`, then print `learner_name`.",
      requirements: [
        "Assign the text `\"Alex\"` to the variable `learner_name`.",
        "Assign the number `1` to the variable `level`.",
        "Print `learner_name` so `Alex` appears in the output."
      ],
      examples: [
        { input: "city = \"Manila\"  |  year = 2026", output: "city stores 'Manila', year stores 2026", note: "Text uses quotes; numbers do not" }
      ],
      conceptCode: "# Put values inside labeled boxes:\nname = \"Maya\"\nage = 18\nprint(name)  # prints: Maya",
      hints: [
        "Set `learner_name = \"Alex\"` (with quotes around Alex).",
        "Set `level = 1` (no quotes around the number 1), then leave `print(learner_name)` at the bottom."
      ],
      starterCode: "# Fill in the two variables below:\nlearner_name = \"\"\nlevel = 0\n\nprint(learner_name)\n",
      solutionCode: "learner_name = \"Alex\"\nlevel = 1\n\nprint(learner_name)\n",
      tests: [
        { name: "learner_name equals 'Alex'", call: "learner_name", expected: "Alex" },
        { name: "level equals 1", call: "level", expected: 1 },
        { name: "Output prints Alex", checkStdout: true, expected: "Alex" }
      ]
    },
    {
      id: "zero-simple-math",
      track: "zero",
      order: 3,
      title: "Simple Math with Variables",
      difficulty: "Start Here",
      xp: 30,
      gems: 6,
      lang: "python",
      fileName: "math_basics.py",
      linkedNodeId: "py-variables-types-io",
      story: "Python works like an instant calculator. Combine variables using `+`, `-`, `*`, and `/` to compute a café bill.",
      tutorial: {
        summary: "Instead of typing raw numbers over and over, you can do math directly with variable names. If a price changes later, your formula updates automatically.",
        steps: [
          { label: "Everyday operators", text: "Use `+` to add, `-` to subtract, `*` to multiply, and `/` to divide." },
          { label: "Save intermediate results", text: "`subtotal = coffee_price * cups` multiplies the two variables and stores the answer in `subtotal`." },
          { label: "Build on earlier boxes", text: "`total = subtotal + tip` uses the `subtotal` you just calculated." }
        ],
        tip: "In code, multiplication is always the star `*` (never `x`)."
      },
      objective: "Using `coffee_price = 120`, `cups = 2`, and `tip = 20`, compute `subtotal` and `total`.",
      requirements: [
        "Set `subtotal` to `coffee_price * cups` (`240`).",
        "Set `total` to `subtotal + tip` (`260`)."
      ],
      examples: [
        { input: "price = 50, qty = 3, tip = 10", output: "subtotal = 150, total = 160", note: "50 * 3 = 150, then 150 + 10 = 160" }
      ],
      conceptCode: "price = 50\nqty = 3\nsubtotal = price * qty\ntotal = subtotal + 10\nprint(total)  # 160",
      hints: [
        "Replace `subtotal = 0` with `subtotal = coffee_price * cups`.",
        "Replace `total = 0` with `total = subtotal + tip`."
      ],
      starterCode: "coffee_price = 120\ncups = 2\ntip = 20\n\n# Replace the 0s using the variables above:\nsubtotal = 0\ntotal = 0\n\nprint(\"Total:\", total)\n",
      solutionCode: "coffee_price = 120\ncups = 2\ntip = 20\n\nsubtotal = coffee_price * cups\ntotal = subtotal + tip\n\nprint(\"Total:\", total)\n",
      tests: [
        { name: "subtotal equals 240 (120 * 2)", call: "subtotal", expected: 240 },
        { name: "total equals 260 (subtotal + tip)", call: "total", expected: 260 }
      ]
    },
    {
      id: "zero-first-function",
      track: "zero",
      order: 4,
      title: "Write Your First Function (def)",
      difficulty: "Start Here",
      xp: 35,
      gems: 8,
      lang: "python",
      fileName: "functions.py",
      linkedNodeId: "py-functions-scope-oop",
      story: "A function is a reusable mini-recipe: give it an input, let it do one small job, and hand back the answer.",
      tutorial: {
        summary: "When you want to reuse the same calculation on different inputs, wrap it in a **function** using `def` (short for *define*).",
        steps: [
          { label: "Name and input", text: "`def double_number(n):` defines a function named `double_number` that accepts one input called `n`. Notice the colon `:` at the end." },
          { label: "Indent the body", text: "Lines inside the function are pushed right by 4 spaces so Python knows they belong to the function." },
          { label: "Hand back the answer", text: "`return n * 2` sends the calculated result back to whoever called the function." }
        ],
        tip: "`print()` only shows text on screen — `return` actually hands the answer back so your program and tests can use it."
      },
      objective: "Complete `double_number(n)` so it returns `n * 2`.",
      requirements: [
        "Multiply the input `n` by `2`.",
        "Use `return` to send the result back."
      ],
      examples: [
        { input: "double_number(5)", output: "10", note: "5 * 2 = 10" },
        { input: "double_number(12)", output: "24", note: "12 * 2 = 24" }
      ],
      conceptCode: "def add_ten(x):\n    return x + 10\n\nprint(add_ten(5))  # 15",
      hints: [
        "Inside `double_number(n)`, change `return 0` to `return n * 2`.",
        "Keep the 4 spaces of indentation before `return n * 2`."
      ],
      starterCode: "def double_number(n):\n    # Return n multiplied by 2\n    return 0\n\nprint(\"double_number(5) =\", double_number(5))\n",
      solutionCode: "def double_number(n):\n    return n * 2\n\nprint(\"double_number(5) =\", double_number(5))\n",
      tests: [
        { name: "Doubles 5 to 10", call: "double_number(5)", expected: 10 },
        { name: "Doubles 12 to 24", call: "double_number(12)", expected: 24 },
        { name: "Doubles 0 to 0", call: "double_number(0)", expected: 0 }
      ]
    },
    {
      id: "zero-if-decision",
      track: "zero",
      order: 5,
      title: "Make Decisions with if / else",
      difficulty: "Start Here",
      xp: 35,
      gems: 8,
      lang: "python",
      fileName: "decisions.py",
      linkedNodeId: "py-conditionals-loops",
      story: "Programs feel smart because they can make choices. Use `if` and `else` to decide whether a test score passes.",
      tutorial: {
        summary: "An **`if` / `else` statement** checks a true-or-false question and chooses one of two paths based on the answer.",
        steps: [
          { label: "Ask a condition with if", text: "`if score >= 60:` asks whether `score` is greater than or equal to `60`." },
          { label: "When it is true", text: "Python runs the indented code directly under `if`." },
          { label: "Otherwise (else)", text: "If the condition is false, Python skips to the indented code under `else:`." }
        ],
        tip: "Always end both the `if ...:` line and the `else:` line with a colon `:`, and indent the lines beneath them."
      },
      objective: "Write `check_pass(score)` so it returns `\"Pass\"` if `score >= 60`, otherwise `\"Try Again\"`.",
      requirements: [
        "If `score >= 60`, return `\"Pass\"`.",
        "Otherwise, return `\"Try Again\"`."
      ],
      examples: [
        { input: "check_pass(75)", output: "\"Pass\"", note: "75 is at least 60" },
        { input: "check_pass(45)", output: "\"Try Again\"", note: "45 is below 60" }
      ],
      conceptCode: "def check_temp(t):\n    if t >= 30:\n        return \"Warm\"\n    else:\n        return \"Cool\"",
      hints: [
        "Start with `if score >= 60:` followed by an indented `return \"Pass\"`.",
        "Add `else:` lined up with `if`, followed by an indented `return \"Try Again\"`."
      ],
      starterCode: "def check_pass(score):\n    # Return \"Pass\" if score >= 60, else \"Try Again\"\n    return \"\"\n\nprint(\"Score 75 ->\", check_pass(75))\nprint(\"Score 45 ->\", check_pass(45))\n",
      solutionCode: "def check_pass(score):\n    if score >= 60:\n        return \"Pass\"\n    else:\n        return \"Try Again\"\n\nprint(\"Score 75 ->\", check_pass(75))\nprint(\"Score 45 ->\", check_pass(45))\n",
      tests: [
        { name: "Score 75 passes", call: "check_pass(75)", expected: "Pass" },
        { name: "Exact boundary 60 passes", call: "check_pass(60)", expected: "Pass" },
        { name: "Score 45 returns Try Again", call: "check_pass(45)", expected: "Try Again" }
      ]
    },
    {
      id: "zero-simple-loop",
      track: "zero",
      order: 6,
      title: "Loop Through a List (for)",
      difficulty: "Start Here",
      xp: 40,
      gems: 10,
      lang: "python",
      fileName: "loops.py",
      linkedNodeId: "py-lists-dicts-slicing",
      story: "Instead of adding shopping items by hand, use a `for` loop to visit every price in a list automatically.",
      tutorial: {
        summary: "A **list** stores multiple values inside square brackets, like `[10, 25, 15]`. A **`for` loop** visits each item one by one so you can process lists of any length.",
        steps: [
          { label: "Start a running total", text: "Before the loop begins, set `total = 0` so you have a clean starting bucket." },
          { label: "Visit every item", text: "`for price in prices:` picks up each number from the list in turn and calls it `price`." },
          { label: "Add and return at the end", text: "Inside the loop, write `total += price`. After the loop ends, `return total`." }
        ],
        tip: "Keep `return total` aligned with `for` (NOT indented inside the loop) — otherwise it would exit after the very first item!"
      },
      objective: "Write `sum_cart(prices)` to add up every number in `prices` and return the total.",
      requirements: [
        "Start `total` at `0`.",
        "Loop through each number in `prices` and add it to `total`.",
        "Return `total` after the loop finishes (returns `0` for an empty list)."
      ],
      examples: [
        { input: "sum_cart([10, 25, 15])", output: "50", note: "10 + 25 + 15 = 50" },
        { input: "sum_cart([])", output: "0", note: "Empty cart totals 0" }
      ],
      conceptCode: "total = 0\nfor num in [5, 10, 15]:\n    total += num\nprint(total)  # 30",
      hints: [
        "Write `for price in prices:` right below `total = 0`.",
        "Indent `total += price` inside the loop, and leave `return total` outside the loop."
      ],
      starterCode: "def sum_cart(prices):\n    total = 0\n    # Loop through prices and add each price to total\n    return total\n\nprint(\"Cart total:\", sum_cart([10, 25, 15]))\n",
      solutionCode: "def sum_cart(prices):\n    total = 0\n    for price in prices:\n        total += price\n    return total\n\nprint(\"Cart total:\", sum_cart([10, 25, 15]))\n",
      tests: [
        { name: "Sums [10, 25, 15] to 50", call: "sum_cart([10, 25, 15])", expected: 50 },
        { name: "Handles single item [42]", call: "sum_cart([42])", expected: 42 },
        { name: "Handles empty list []", call: "sum_cart([])", expected: 0 }
      ]
    },

    // -------- TRACK 1: PYTHON ESSENTIALS (6 LESSONS) --------
    {
      id: "py-rpg-damage",
      track: "python",
      order: 7,
      title: "Game Damage Calculator (if & max)",
      difficulty: "Apprentice",
      xp: 45,
      gems: 10,
      lang: "python",
      fileName: "combat.py",
      linkedNodeId: "py-conditionals-loops",
      story: "Combine subtraction, a minimum floor of `0`, and a simple `if` check to compute final damage in a game.",
      objective: "Implement `calc_damage(atk, armor, is_crit=False)` returning the final integer damage.",
      requirements: [
        "Compute base damage as `atk - armor`, clamped so it is never below `0`.",
        "If `is_crit` is `True`, double the clamped damage (`* 2`).",
        "Return the final number."
      ],
      examples: [
        { input: "calc_damage(50, 20, False)", output: "30", note: "50 - 20 = 30" },
        { input: "calc_damage(50, 20, True)", output: "60", note: "30 × 2 critical hit" },
        { input: "calc_damage(15, 40, True)", output: "0", note: "Clamped at 0 before crit!" }
      ],
      conceptCode: "# Clamping keeps a number from dropping below 0:\nraw = max(0, atk - armor)\n# Boolean branch:\nif is_crit:\n    raw *= 2",
      hints: [
        "Use `max(0, atk - armor)` so heavy armor never produces negative damage.",
        "Multiply by `2` ONLY when `is_crit` is truthy (`if is_crit: dmg *= 2`).",
        "Full body: `dmg = max(0, atk - armor)` then `return dmg * 2 if is_crit else dmg`."
      ],
      starterCode: "def calc_damage(atk, armor, is_crit=False):\n    # TODO: clamp (atk - armor) at 0, then double if is_crit\n    return 0\n\nprint('Test hit:', calc_damage(50, 20, True))\n",
      solutionCode: "def calc_damage(atk, armor, is_crit=False):\n    dmg = max(0, atk - armor)\n    if is_crit:\n        dmg *= 2\n    return dmg\n\nprint('Test hit:', calc_damage(50, 20, True))\n",
      tests: [
        { name: "Normal hit", call: "calc_damage(50, 20, False)", expected: 30 },
        { name: "Critical hit", call: "calc_damage(50, 20, True)", expected: 60 },
        { name: "Armor blocks all damage (clamp to 0)", call: "calc_damage(15, 40, True)", expected: 0 },
        { name: "Default argument is_crit=False", call: "calc_damage(100, 35)", expected: 65 }
      ]
    },
    {
      id: "py-loot-filter",
      track: "python",
      order: 8,
      title: "Filter & Boost a List",
      difficulty: "Apprentice",
      xp: 50,
      gems: 10,
      lang: "python",
      fileName: "loot.py",
      linkedNodeId: "py-lists-dicts-slicing",
      story: "Keep only items in a list that meet a minimum score (`min_power`) and add `+10` to each one in a single clean pass.",
      objective: "Write `buff_epic_loot(powers, min_power)` returning a new list of items `>= min_power`, each increased by `10`.",
      requirements: [
        "Keep only ratings where `p >= min_power`.",
        "Add `10` to every surviving rating.",
        "Preserve original order without mutating the input list."
      ],
      examples: [
        { input: "buff_epic_loot([20, 55, 80, 40], 50)", output: "[65, 90]", note: "55+10 and 80+10" },
        { input: "buff_epic_loot([10, 20], 50)", output: "[]", note: "None qualify" }
      ],
      conceptCode: "# Python List Comprehension pattern:\n# [transform(x) for x in items if condition(x)]\nresult = [x * 2 for x in [1, 4, 6] if x >= 4]  # [8, 12]",
      hints: [
        "A list comprehension handles filter + transform cleanly in a single line.",
        "Pattern: `[p + 10 for p in powers if p >= min_power]`.",
        "Remember: `>=` is inclusive, so an item equal to `min_power` DOES qualify!"
      ],
      starterCode: "def buff_epic_loot(powers, min_power):\n    # TODO: keep p >= min_power and add 10 to each\n    return []\n\nprint(buff_epic_loot([20, 55, 80, 40], 50))\n",
      solutionCode: "def buff_epic_loot(powers, min_power):\n    return [p + 10 for p in powers if p >= min_power]\n\nprint(buff_epic_loot([20, 55, 80, 40], 50))\n",
      tests: [
        { name: "Mixed loot ratings", call: "buff_epic_loot([20, 55, 80, 40], 50)", expected: [65, 90] },
        { name: "Exact boundary equals min_power", call: "buff_epic_loot([50, 49, 51], 50)", expected: [60, 61] },
        { name: "Empty result when all weak", call: "buff_epic_loot([10, 20], 50)", expected: [] },
        { name: "Empty list edge case", call: "buff_epic_loot([], 10)", expected: [] }
      ]
    },
    {
      id: "py-freq-counter",
      track: "python",
      order: 3,
      title: "Word Frequency Hash Map",
      difficulty: "Journeyman",
      xp: 60,
      gems: 12,
      lang: "python",
      fileName: "freq.py",
      linkedNodeId: "py-lists-dicts-slicing",
      story: "Your search indexer needs to count how often each lowercase word appears in a document string in `O(n)` single-pass time.",
      objective: "Write `count_words(text)` returning a dict mapping each lowercase word to its frequency.",
      requirements: [
        "Convert `text` to lowercase and split on whitespace (`text.lower().split()`).",
        "Count each word into a dict using `counts[w] = counts.get(w, 0) + 1`.",
        "Handle empty strings cleanly by returning `{}`."
      ],
      examples: [
        { input: "count_words('Code fast code clean')", output: "{'code': 2, 'fast': 1, 'clean': 1}", note: "Case-insensitive counts" },
        { input: "count_words('')", output: "{}", note: "Empty string → empty dict" }
      ],
      conceptCode: "counts = {}\nfor token in 'a b a'.split():\n    counts[token] = counts.get(token, 0) + 1",
      hints: [
        "Start with `counts = {}` and iterate `for word in text.lower().split():`.",
        "`counts.get(word, 0)` safely defaults unseen words to `0` without raising `KeyError`.",
        "Inside the loop: `counts[word] = counts.get(word, 0) + 1`, then `return counts`."
      ],
      starterCode: "def count_words(text):\n    counts = {}\n    # TODO: lowercase, split, and tally each word into counts\n    return counts\n\nprint(count_words('Code fast code clean'))\n",
      solutionCode: "def count_words(text):\n    counts = {}\n    for w in text.lower().split():\n        counts[w] = counts.get(w, 0) + 1\n    return counts\n\nprint(count_words('Code fast code clean'))\n",
      tests: [
        { name: "Mixed case words", call: "count_words('Code fast code clean')", expected: { code: 2, fast: 1, clean: 1 } },
        { name: "Repeated single word", call: "count_words('go GO go')", expected: { go: 3 } },
        { name: "Empty string edge case", call: "count_words('')", expected: {} },
        { name: "Extra whitespace", call: "count_words('  sql   api  sql  ')", expected: { sql: 2, api: 1 } }
      ]
    },
    {
      id: "py-recursive-fact",
      track: "python",
      order: 4,
      title: "Recursive Factorial & Power",
      difficulty: "Journeyman",
      xp: 65,
      gems: 12,
      lang: "python",
      fileName: "recursion.py",
      linkedNodeId: "dsa-recursion-call-stack",
      story: "Master the Call Stack! Implement two classic recursive math engines — then inspect the Memory & Trace tab to watch your stack frames push and unwind live!",
      objective: "Implement `factorial(n)` and `power(base, exp)` recursively using clean base cases.",
      requirements: [
        "`factorial(0)` and `factorial(1)` return `1`; otherwise `n * factorial(n - 1)`.",
        "`power(base, 0)` returns `1`; otherwise `base * power(base, exp - 1)`."
      ],
      examples: [
        { input: "factorial(5)", output: "120", note: "5 × 4 × 3 × 2 × 1" },
        { input: "power(2, 6)", output: "64", note: "2⁶ = 64" }
      ],
      conceptCode: "def sum_down(n):\n    if n <= 0:\n        return 0\n    return n + sum_down(n - 1)",
      hints: [
        "Always write the Base Case FIRST (`if n <= 1: return 1`).",
        "In `power(base, exp)`, base case is `if exp == 0: return 1`.",
        "Recursive step shrinks `exp` by 1 each frame: `return base * power(base, exp - 1)`."
      ],
      starterCode: "def factorial(n):\n    # TODO: base case n <= 1 -> 1\n    return 0\n\ndef power(base, exp):\n    # TODO: base case exp == 0 -> 1\n    return 0\n\nprint('5! =', factorial(5), '| 2^6 =', power(2, 6))\n",
      solutionCode: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\ndef power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)\n\nprint('5! =', factorial(5), '| 2^6 =', power(2, 6))\n",
      tests: [
        { name: "factorial(5) == 120", call: "factorial(5)", expected: 120 },
        { name: "factorial(0) == 1 (base case)", call: "factorial(0)", expected: 1 },
        { name: "power(2, 6) == 64", call: "power(2, 6)", expected: 64 },
        { name: "power(9, 0) == 1 (base case)", call: "power(9, 0)", expected: 1 }
      ]
    },
    {
      id: "py-hero-class",
      track: "python",
      order: 5,
      title: "Hero OOP Encapsulation Class",
      difficulty: "Adept",
      xp: 75,
      gems: 15,
      lang: "python",
      fileName: "hero.py",
      linkedNodeId: "code-oop-solid-design-patterns",
      story: "Build a rock-solid `Hero` class that encapsulates HP invariants: HP can NEVER drop below `0` and NEVER exceed `max_hp`!",
      objective: "Complete `class Hero` with `__init__(self, name, max_hp)`, `take_damage(self, amt)`, `heal(self, amt)`, and `is_alive(self)`.",
      requirements: [
        "`__init__` sets `self.name = name`, `self.max_hp = max_hp`, and `self.hp = max_hp`.",
        "`take_damage(amt)` subtracts `amt` (clamped at `0`) and returns `self.hp`.",
        "`heal(amt)` adds `amt` (clamped at `self.max_hp`) and returns `self.hp`.",
        "`is_alive()` returns `True` if `self.hp > 0`, else `False`."
      ],
      examples: [
        { input: "h = Hero('Aria', 100); h.take_damage(40)", output: "60", note: "100 - 40 = 60" },
        { input: "h.heal(999)", output: "100", note: "Clamped to max_hp!" }
      ],
      conceptCode: "class Counter:\n    def __init__(self, start):\n        self.val = start\n    def inc(self):\n        self.val += 1\n        return self.val",
      hints: [
        "Clamp damage with `self.hp = max(0, self.hp - amt)`.",
        "Clamp healing with `self.hp = min(self.max_hp, self.hp + amt)`.",
        "`is_alive(self)` is simply `return self.hp > 0`."
      ],
      starterCode: "class Hero:\n    def __init__(self, name, max_hp):\n        self.name = name\n        self.max_hp = max_hp\n        self.hp = max_hp\n\n    def take_damage(self, amt):\n        # TODO: subtract amt, clamp >= 0, return self.hp\n        return self.hp\n\n    def heal(self, amt):\n        # TODO: add amt, clamp <= max_hp, return self.hp\n        return self.hp\n\n    def is_alive(self):\n        return False\n\naria = Hero('Aria', 100)\nprint(aria.take_damage(35), aria.heal(50), aria.is_alive())\n",
      solutionCode: "class Hero:\n    def __init__(self, name, max_hp):\n        self.name = name\n        self.max_hp = max_hp\n        self.hp = max_hp\n\n    def take_damage(self, amt):\n        self.hp = max(0, self.hp - amt)\n        return self.hp\n\n    def heal(self, amt):\n        self.hp = min(self.max_hp, self.hp + amt)\n        return self.hp\n\n    def is_alive(self):\n        return self.hp > 0\n\naria = Hero('Aria', 100)\nprint(aria.take_damage(35), aria.heal(50), aria.is_alive())\n",
      tests: [
        { name: "Damage reduces HP cleanly", call: "Hero('Kael', 100).take_damage(30)", expected: 70 },
        { name: "Overkill damage clamps to 0", call: "Hero('Kael', 50).take_damage(120)", expected: 0 },
        { name: "Heal clamps at max_hp", call: "aria.heal(200)", expected: 100 },
        { name: "Alive status check", call: "aria.is_alive()", expected: true }
      ]
    },
    {
      id: "py-anagram-palindrome",
      track: "python",
      order: 6,
      title: "Check If Two Words Are Anagrams",
      difficulty: "Adept",
      xp: 70,
      gems: 15,
      lang: "python",
      fileName: "strings.py",
      linkedNodeId: "dsa-arrays-hashing-two-pointers",
      story: "Write a clean helper that checks whether two words or phrases contain the exact same letters, ignoring uppercase letters and spaces.",
      objective: "Write `is_anagram(a, b)` returning `True` if `a` and `b` contain the exact same letters (ignoring case and spaces).",
      requirements: [
        "Normalize both strings: lowercase and strip spaces (`s.lower().replace(' ', '')`).",
        "Compare character frequencies (or sorted characters) and return `True` / `False`."
      ],
      examples: [
        { input: "is_anagram('Listen', 'Silent')", output: "True", note: "Same 6 letters" },
        { input: "is_anagram('dormitory', 'dirty room')", output: "True", note: "Spaces ignored!" }
      ],
      conceptCode: "clean = s.lower().replace(' ', '')\n# Two equal sorted lists or equal frequency dicts prove anagram!",
      hints: [
        "Clean both strings first: `ca = a.lower().replace(' ', '')` and `cb = b.lower().replace(' ', '')`.",
        "Quick length reject: `if len(ca) != len(cb): return False`.",
        "Compare `sorted(ca) == sorted(cb)` (or count characters into two dicts and compare!)."
      ],
      starterCode: "def is_anagram(a, b):\n    # TODO: ignore spaces & case, verify identical character counts\n    return False\n\nprint(is_anagram('Listen', 'Silent'))\n",
      solutionCode: "def is_anagram(a, b):\n    ca = a.lower().replace(' ', '')\n    cb = b.lower().replace(' ', '')\n    return sorted(ca) == sorted(cb)\n\nprint(is_anagram('Listen', 'Silent'))\n",
      tests: [
        { name: "Classic anagram", call: "is_anagram('Listen', 'Silent')", expected: true },
        { name: "Multi-word with spaces", call: "is_anagram('dormitory', 'dirty room')", expected: true },
        { name: "Non-anagram returns False", call: "is_anagram('python', 'typhoon')", expected: false },
        { name: "Empty strings are anagrams", call: "is_anagram('', '   ')", expected: true }
      ]
    },

    // -------- TRACK 2: DSA & ALGORITHMS (6 QUESTS) --------
    {
      id: "dsa-two-sum",
      track: "dsa",
      order: 7,
      title: "Two-Sum Hash Map (O(n))",
      difficulty: "Journeyman",
      xp: 75,
      gems: 15,
      lang: "python",
      fileName: "two_sum.py",
      linkedNodeId: "dsa-arrays-hashing-two-pointers",
      story: "The #1 most famous interview problem in software engineering! Find the indices `[i, j]` of two numbers that add up to `target` in ONE `O(n)` pass using a Hash Map.",
      objective: "Write `two_sum(nums, target)` returning `[first_idx, second_idx]` of the pair summing to `target`, or `[]` if none exists.",
      requirements: [
        "Use a `seen = {}` dict mapping `value → index`.",
        "For each `i, n in enumerate(nums)`: compute `need = target - n`.",
        "If `need in seen`, immediately return `[seen[need], i]`!"
      ],
      examples: [
        { input: "two_sum([2, 7, 11, 15], 9)", output: "[0, 1]", note: "nums[0] + nums[1] = 2 + 7 = 9" },
        { input: "two_sum([3, 2, 4], 6)", output: "[1, 2]", note: "Must not reuse index 0 twice!" }
      ],
      conceptCode: "seen = {}\nfor i, n in enumerate(nums):\n    need = target - n\n    if need in seen:\n        return [seen[need], i]\n    seen[n] = i",
      hints: [
        "Check `if need in seen:` BEFORE inserting `seen[n] = i` so you never pair an index with itself!",
        "Use `enumerate(nums)` to get both `i` and `n` cleanly.",
        "If the loop finishes without finding a pair, `return []`."
      ],
      starterCode: "def two_sum(nums, target):\n    seen = {}\n    # TODO: single-pass O(n) complement lookup\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))\n",
      solutionCode: "def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        need = target - n\n        if need in seen:\n            return [seen[need], i]\n        seen[n] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))\n",
      tests: [
        { name: "Standard pair [2,7,11,15], 9", call: "two_sum([2, 7, 11, 15], 9)", expected: [0, 1] },
        { name: "Avoids self-reuse [3,2,4], 6", call: "two_sum([3, 2, 4], 6)", expected: [1, 2] },
        { name: "Duplicate values [3,3], 6", call: "two_sum([3, 3], 6)", expected: [0, 1] },
        { name: "No valid pair returns []", call: "two_sum([1, 2, 3], 99)", expected: [] }
      ]
    },
    {
      id: "dsa-valid-parens",
      track: "dsa",
      order: 8,
      title: "Valid Parentheses Stack",
      difficulty: "Journeyman",
      xp: 80,
      gems: 15,
      lang: "python",
      fileName: "brackets.py",
      linkedNodeId: "dsa-stacks-queues-deques",
      story: "Your compiler's parser must verify that every `(`, `[`, and `{` closes in strict LIFO order before executing user code!",
      objective: "Implement `is_valid_brackets(s)` using a LIFO stack (`list`).",
      requirements: [
        "Push opening brackets `(`, `[`, `{` onto `stack`.",
        "On a closing bracket `)`, `]`, `}`, verify `stack` is non-empty and its top matches the expected opener.",
        "Return `True` ONLY if the stack is completely empty at the end!"
      ],
      examples: [
        { input: "is_valid_brackets('({[]})')", output: "True", note: "Properly nested LIFO" },
        { input: "is_valid_brackets('([)]')", output: "False", note: "Crossed nesting fails!" },
        { input: "is_valid_brackets('(((')", output: "False", note: "Leftover unclosed openers" }
      ],
      conceptCode: "pairs = {')': '(', ']': '[', '}': '{'}\nstack = []\n# Push openers; on closer check stack and stack.pop() == pairs[ch]",
      hints: [
        "Map each closing bracket to its opener: `pairs = {')': '(', ']': '[', '}': '{'}`.",
        "When `ch in pairs`, if `not stack or stack.pop() != pairs[ch]`, return `False` immediately!",
        "At the end, `return len(stack) == 0`."
      ],
      starterCode: "def is_valid_brackets(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    # TODO: push openers, pop & match closers\n    return False\n\nprint(is_valid_brackets('({[]})'))\n",
      solutionCode: "def is_valid_brackets(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for ch in s:\n        if ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n        else:\n            stack.append(ch)\n    return len(stack) == 0\n\nprint(is_valid_brackets('({[]})'))\n",
      tests: [
        { name: "Nested valid '({[]})'", call: "is_valid_brackets('({[]})')", expected: true },
        { name: "Sequential valid '()[]{}'", call: "is_valid_brackets('()[]{}')", expected: true },
        { name: "Crossed invalid '([)]'", call: "is_valid_brackets('([)]')", expected: false },
        { name: "Unclosed opener '((('", call: "is_valid_brackets('(((')", expected: false },
        { name: "Closer first ']'", call: "is_valid_brackets(']')", expected: false }
      ]
    },
    {
      id: "dsa-binary-search",
      track: "dsa",
      order: 9,
      title: "Binary Search Engine (O(log n))",
      difficulty: "Adept",
      xp: 85,
      gems: 18,
      lang: "python",
      fileName: "bsearch.py",
      linkedNodeId: "dsa-binary-search-sorting",
      story: "Search a sorted leaderboard of millions in ~20 comparisons by halving `[lo, hi]` on every loop iteration — with ZERO infinite-loop bugs!",
      objective: "Write `binary_search(nums, target)` returning the index of `target`, or `-1` if absent.",
      requirements: [
        "Initialize `lo = 0` and `hi = len(nums) - 1`.",
        "Loop `while lo <= hi:` computing `mid = (lo + hi) // 2`.",
        "Narrow strictly with `lo = mid + 1` or `hi = mid - 1`."
      ],
      examples: [
        { input: "binary_search([2, 5, 9, 14, 21], 14)", output: "3", note: "Found at index 3" },
        { input: "binary_search([2, 5, 9], 7)", output: "-1", note: "Absent returns -1" }
      ],
      conceptCode: "lo, hi = 0, len(nums) - 1\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    # compare nums[mid] vs target",
      hints: [
        "If `nums[mid] == target: return mid`.",
        "If `nums[mid] < target`, target must be to the RIGHT → `lo = mid + 1`.",
        "Otherwise target is to the LEFT → `hi = mid - 1`. After loop ends, `return -1`."
      ],
      starterCode: "def binary_search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    # TODO: halve [lo, hi] until found or exhausted\n    return -1\n\nprint(binary_search([2, 5, 9, 14, 21, 33], 21))\n",
      solutionCode: "def binary_search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n\nprint(binary_search([2, 5, 9, 14, 21, 33], 21))\n",
      tests: [
        { name: "Find middle-right item", call: "binary_search([2, 5, 9, 14, 21, 33], 21)", expected: 4 },
        { name: "Find first element (index 0)", call: "binary_search([2, 5, 9, 14], 2)", expected: 0 },
        { name: "Missing item returns -1", call: "binary_search([2, 5, 9, 14], 10)", expected: -1 },
        { name: "Empty list edge case", call: "binary_search([], 5)", expected: -1 }
      ]
    },
    {
      id: "dsa-merge-sorted",
      track: "dsa",
      order: 10,
      title: "Merge Two Sorted Arrays (Two Pointers)",
      difficulty: "Adept",
      xp: 90,
      gems: 18,
      lang: "python",
      fileName: "merge.py",
      linkedNodeId: "dsa-linked-lists-pointers",
      story: "This exact two-pointer zip routine is the heart of Merge Sort AND database sorted-stream merging! Combine two already-sorted lists in linear `O(n + m)` time.",
      objective: "Write `merge_sorted(a, b)` returning one ascending sorted list containing all elements from `a` and `b`.",
      requirements: [
        "Walk pointers `i = 0` (for `a`) and `j = 0` (for `b`).",
        "Append whichever of `a[i]` or `b[j]` is smaller and advance that pointer.",
        "Extend any remaining tail elements from `a[i:]` and `b[j:]`."
      ],
      examples: [
        { input: "merge_sorted([1, 4, 7], [2, 3, 9])", output: "[1, 2, 3, 4, 7, 9]", note: "Linear O(n+m) zip!" }
      ],
      conceptCode: "i, j = 0, 0\nout = []\nwhile i < len(a) and j < len(b):\n    # pick smaller & advance i or j",
      hints: [
        "While `i < len(a) and j < len(b)`: if `a[i] <= b[j]`, append `a[i]` and `i += 1`, else append `b[j]` and `j += 1`.",
        "After the loop, one list may still have leftovers — append `a[i:]` and `b[j:]`!",
        "`out.extend(a[i:])` and `out.extend(b[j:])` cleanly finish both tails."
      ],
      starterCode: "def merge_sorted(a, b):\n    i, j = 0, 0\n    out = []\n    # TODO: two-pointer linear merge\n    return out\n\nprint(merge_sorted([1, 4, 7], [2, 3, 9]))\n",
      solutionCode: "def merge_sorted(a, b):\n    i, j = 0, 0\n    out = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i])\n            i += 1\n        else:\n            out.append(b[j])\n            j += 1\n    out.extend(a[i:])\n    out.extend(b[j:])\n    return out\n\nprint(merge_sorted([1, 4, 7], [2, 3, 9]))\n",
      tests: [
        { name: "Interleaved lists", call: "merge_sorted([1, 4, 7], [2, 3, 9])", expected: [1, 2, 3, 4, 7, 9] },
        { name: "Duplicate values", call: "merge_sorted([2, 2], [1, 2, 5])", expected: [1, 2, 2, 2, 5] },
        { name: "One empty list", call: "merge_sorted([], [3, 6])", expected: [3, 6] },
        { name: "Negative numbers", call: "merge_sorted([-5, 0], [-3, 2])", expected: [-5, -3, 0, 2] }
      ]
    },
    {
      id: "dsa-sliding-window",
      track: "dsa",
      order: 11,
      title: "Sliding Window Max Sum (O(n))",
      difficulty: "Architect",
      xp: 95,
      gems: 20,
      lang: "python",
      fileName: "window.py",
      linkedNodeId: "dsa-dp-memoization-sliding-window",
      story: "Telemetry metrics arrive every second. Find the peak total requests across ANY `k` consecutive seconds in a single `O(n)` pass without re-summing!",
      objective: "Write `max_window_sum(nums, k)` returning the maximum sum of any contiguous subarray of length `k` (return `0` if `len(nums) < k`).",
      requirements: [
        "Compute the initial sum of the first `k` items: `win = sum(nums[:k])`, `best = win`.",
        "For `i` from `k` to `len(nums) - 1`: slide with `win += nums[i] - nums[i - k]`.",
        "Track `best = max(best, win)` — even if all numbers are negative!"
      ],
      examples: [
        { input: "max_window_sum([4, 2, 7, 1, 9, 3], 3)", output: "17", note: "Subarray [7, 1, 9] sums to 17" },
        { input: "max_window_sum([-5, -2, -1, -8], 2)", output: "-3", note: "[-2, -1] = -3 (don't init best=0!)" }
      ],
      conceptCode: "win = sum(nums[:k])\nbest = win\nfor i in range(k, len(nums)):\n    win += nums[i] - nums[i - k]\n    best = max(best, win)",
      hints: [
        "Guard edge case first: `if len(nums) < k or k <= 0: return 0`.",
        "Initialize `best = win` (NEVER `best = 0` — that fails all-negative arrays!).",
        "Each step adds `nums[i]` entering on the right and subtracts `nums[i - k]` leaving on the left!"
      ],
      starterCode: "def max_window_sum(nums, k):\n    if len(nums) < k or k <= 0:\n        return 0\n    # TODO: compute first window, then slide in O(1) per step\n    return 0\n\nprint(max_window_sum([4, 2, 7, 1, 9, 3], 3))\n",
      solutionCode: "def max_window_sum(nums, k):\n    if len(nums) < k or k <= 0:\n        return 0\n    win = sum(nums[:k])\n    best = win\n    for i in range(k, len(nums)):\n        win += nums[i] - nums[i - k]\n        best = max(best, win)\n    return best\n\nprint(max_window_sum([4, 2, 7, 1, 9, 3], 3))\n",
      tests: [
        { name: "Standard peak window", call: "max_window_sum([4, 2, 7, 1, 9, 3], 3)", expected: 17 },
        { name: "All-negative numbers edge case", call: "max_window_sum([-5, -2, -1, -8], 2)", expected: -3 },
        { name: "Window equals full length", call: "max_window_sum([3, 4, 5], 3)", expected: 12 },
        { name: "Array shorter than k returns 0", call: "max_window_sum([1, 2], 5)", expected: 0 }
      ]
    },
    {
      id: "dsa-climbing-stairs",
      track: "dsa",
      order: 12,
      title: "Boss Quest: Climbing Stairs Dynamic Programming",
      difficulty: "Boss",
      xp: 120,
      gems: 25,
      lang: "python",
      fileName: "stairs_dp.py",
      linkedNodeId: "dsa-dp-memoization-sliding-window",
      story: "You stand before a tower with `n` steps. Each move lets you climb `1` or `2` steps. Naive recursion explodes in `O(2ⁿ)` time — crush it in `O(n)` time and `O(1)` space with Bottom-Up DP!",
      objective: "Write `climb_stairs(n)` returning the total distinct ways to reach step `n`.",
      requirements: [
        "Base cases: `n <= 2` returns `n` (`1` way for 1 step, `2` ways for 2 steps).",
        "Use iterative DP (`a, b = b, a + b`) so `climb_stairs(35)` runs instantaneously!"
      ],
      examples: [
        { input: "climb_stairs(3)", output: "3", note: "1+1+1, 1+2, 2+1" },
        { input: "climb_stairs(6)", output: "13", note: "dp[6] = dp[5] + dp[4] = 8 + 5" }
      ],
      conceptCode: "# O(1) space DP recurrence:\na, b = 1, 2\nfor _ in range(3, n + 1):\n    a, b = b, a + b",
      hints: [
        "To land on step `i`, your last hop came from `i - 1` (1 step) OR `i - 2` (2 steps).",
        "So `dp[i] = dp[i - 1] + dp[i - 2]`!",
        "Keep just two variables `a, b = 1, 2` and loop `for _ in range(3, n + 1): a, b = b, a + b`, returning `b`."
      ],
      starterCode: "def climb_stairs(n):\n    if n <= 2:\n        return n\n    # TODO: O(n) time, O(1) space dynamic programming\n    return 0\n\nprint('Ways for 6:', climb_stairs(6))\n",
      solutionCode: "def climb_stairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b\n\nprint('Ways for 6:', climb_stairs(6))\n",
      tests: [
        { name: "n = 1 (base case)", call: "climb_stairs(1)", expected: 1 },
        { name: "n = 5 -> 8 ways", call: "climb_stairs(5)", expected: 8 },
        { name: "n = 6 -> 13 ways", call: "climb_stairs(6)", expected: 13 },
        { name: "Large n = 25 (must be O(n) fast!)", call: "climb_stairs(25)", expected: 121393 }
      ]
    },

    // -------- TRACK 3: JAVASCRIPT & ASYNC (6 QUESTS) --------
    {
      id: "js-functional-pipeline",
      track: "javascript",
      order: 13,
      title: "Functional Score Pipeline (.filter/.map/.reduce)",
      difficulty: "Apprentice",
      xp: 55,
      gems: 12,
      lang: "javascript",
      fileName: "scores.js",
      linkedNodeId: "js-functional-map-filter-reduce",
      story: "Grade exam scripts immutably: keep passing scores (`>= 75`), add a `+5` curve (capped at `100`), and return the rounded average!",
      objective: "Write `passingAverage(scores)` using `.filter()`, `.map()`, and `.reduce()`. Return `0` if nobody passed.",
      requirements: [
        "Filter to keep `s >= 75`.",
        "Map each passing score to `Math.min(100, s + 5)`.",
        "Sum with `.reduce((a, b) => a + b, 0)`, divide by passing count, and `Math.round()`."
      ],
      examples: [
        { input: "passingAverage([50, 75, 98, 60])", output: "90", note: "Passing [75, 98] → curved [80, 100] → avg 90" },
        { input: "passingAverage([40, 55])", output: "0", note: "No passing scores → return 0" }
      ],
      conceptCode: "const passing = scores.filter(s => s >= 75);\nconst curved = passing.map(s => Math.min(100, s + 5));",
      hints: [
        "Filter first: `const curved = scores.filter(s => s >= 75).map(s => Math.min(100, s + 5));`",
        "Guard empty: `if (curved.length === 0) return 0;`",
        "Return `Math.round(curved.reduce((a, b) => a + b, 0) / curved.length);`."
      ],
      exportNames: ["passingAverage"],
      starterCode: "function passingAverage(scores) {\n  // TODO: filter >= 75, curve +5 (cap 100), return rounded average\n  return 0;\n}\n\nconsole.log(passingAverage([50, 75, 98, 60]));\n",
      solutionCode: "function passingAverage(scores) {\n  const curved = scores\n    .filter((s) => s >= 75)\n    .map((s) => Math.min(100, s + 5));\n  if (!curved.length) return 0;\n  const sum = curved.reduce((acc, v) => acc + v, 0);\n  return Math.round(sum / curved.length);\n}\n\nconsole.log(passingAverage([50, 75, 98, 60]));\n",
      tests: [
        { name: "Curves and caps at 100", call: "passingAverage([50, 75, 98, 60])", expected: 90 },
        { name: "All fail returns 0", call: "passingAverage([40, 55, 74])", expected: 0 },
        { name: "Empty array returns 0", call: "passingAverage([])", expected: 0 },
        { name: "Perfect scores stay capped at 100", call: "passingAverage([100, 99])", expected: 100 }
      ]
    },
    {
      id: "js-closure-counter",
      track: "javascript",
      order: 14,
      title: "Private Closure Counter Factory",
      difficulty: "Journeyman",
      xp: 65,
      gems: 14,
      lang: "javascript",
      fileName: "closure.js",
      linkedNodeId: "js-closures-scope-hoisting",
      story: "Build a stateful counter module using pure lexical Closures — zero classes, zero globals, 100% private internal state!",
      objective: "Write `makeCounter(start = 0)` returning an object `{ inc, dec, value }` that manipulates private `count`.",
      requirements: [
        "`inc()` increments `count` by 1 and returns the new value.",
        "`dec()` decrements `count` by 1 and returns the new value.",
        "`value()` returns current `count` without modifying it.",
        "Two counters created by `makeCounter()` must stay 100% independent."
      ],
      examples: [
        { input: "const c = makeCounter(10); c.inc(); c.inc(); c.dec();", output: "11", note: "10 → 11 → 12 → 11" }
      ],
      conceptCode: "function makeBox(secret) {\n  let val = secret;\n  return { get: () => val };\n}",
      hints: [
        "Declare `let count = start;` inside `makeCounter`.",
        "Return `{ inc: () => ++count, dec: () => --count, value: () => count }`!",
        "Make sure `start = 0` defaults cleanly when no argument is passed."
      ],
      exportNames: ["makeCounter"],
      starterCode: "function makeCounter(start = 0) {\n  let count = start;\n  return {\n    inc: () => 0,\n    dec: () => 0,\n    value: () => 0\n  };\n}\n\nconst c = makeCounter(10);\nconsole.log(c.inc(), c.inc(), c.dec(), c.value());\n",
      solutionCode: "function makeCounter(start = 0) {\n  let count = start;\n  return {\n    inc: () => ++count,\n    dec: () => --count,\n    value: () => count\n  };\n}\n\nconst c = makeCounter(10);\nconsole.log(c.inc(), c.inc(), c.dec(), c.value());\n",
      tests: [
        { name: "Increment & decrement from 10", call: "(() => { const c = makeCounter(10); c.inc(); c.inc(); c.dec(); return c.value(); })()", expected: 11 },
        { name: "Default start = 0", call: "(() => { const c = makeCounter(); return c.inc(); })()", expected: 1 },
        { name: "Two counters are isolated", call: "(() => { const a = makeCounter(0); const b = makeCounter(5); a.inc(); a.inc(); return [a.value(), b.value()]; })()", expected: [2, 5] }
      ]
    },
    {
      id: "js-group-by",
      track: "javascript",
      order: 15,
      title: "Functional `groupBy` Aggregator",
      difficulty: "Adept",
      xp: 75,
      gems: 15,
      lang: "javascript",
      fileName: "group_by.js",
      linkedNodeId: "ts-types-interfaces-generics",
      story: "Backend APIs return flat arrays of records. Write a reusable `groupBy(items, key)` utility (like SQL `GROUP BY` in JavaScript!) to bucket records by any property.",
      objective: "Write `groupBy(items, key)` returning an object mapping each distinct `item[key]` to an array of matching items.",
      requirements: [
        "Use `.reduce((acc, item) => ..., {})` or a clean `for...of` loop.",
        "Preserve original item order inside each bucket.",
        "Return `{}` for an empty input array."
      ],
      examples: [
        { input: "groupBy([{n:'A',r:'dev'},{n:'B',r:'ops'},{n:'C',r:'dev'}], 'r')", output: "{ dev: [{n:'A',r:'dev'},{n:'C',r:'dev'}], ops: [{n:'B',r:'ops'}] }", note: "Bucketed by property 'r'" }
      ],
      conceptCode: "const bucket = item[key];\nif (!acc[bucket]) acc[bucket] = [];\nacc[bucket].push(item);",
      hints: [
        "Start with `const groups = {};`.",
        "For each `item` of `items`, grab `const k = item[key];` and initialize `if (!groups[k]) groups[k] = [];`.",
        "Push `item` into `groups[k]` and return `groups`!"
      ],
      exportNames: ["groupBy"],
      starterCode: "function groupBy(items, key) {\n  // TODO: bucket items into { [item[key]]: [...] }\n  return {};\n}\n\nconsole.log(groupBy([{ name: 'Aria', role: 'BE' }, { name: 'Lyra', role: 'AI' }], 'role'));\n",
      solutionCode: "function groupBy(items, key) {\n  return items.reduce((acc, item) => {\n    const k = item[key];\n    if (!acc[k]) acc[k] = [];\n    acc[k].push(item);\n    return acc;\n  }, {});\n}\n\nconsole.log(groupBy([{ name: 'Aria', role: 'BE' }, { name: 'Lyra', role: 'AI' }], 'role'));\n",
      tests: [
        { name: "Groups heroes by role", call: "groupBy([{ name: 'Aria', role: 'BE' }, { name: 'Sora', role: 'BE' }, { name: 'Lyra', role: 'AI' }], 'role')", expected: { BE: [{ name: "Aria", role: "BE" }, { name: "Sora", role: "BE" }], AI: [{ name: "Lyra", role: "AI" }] } },
        { name: "Empty array returns {}", call: "groupBy([], 'role')", expected: {} },
        { name: "Numeric keys work cleanly", call: "groupBy([{ id: 1, tier: 2 }, { id: 2, tier: 2 }], 'tier')", expected: { 2: [{ id: 1, tier: 2 }, { id: 2, tier: 2 }] } }
      ]
    },
    {
      id: "js-chunk-flatten",
      track: "javascript",
      order: 16,
      title: "Batch Chunker (Pagination Utility)",
      difficulty: "Adept",
      xp: 80,
      gems: 16,
      lang: "javascript",
      fileName: "chunk.js",
      linkedNodeId: "code-testing-tdd-debugging",
      story: "When inserting 10,000 rows into PostgreSQL or paginating API responses, you slice arrays into fixed-size batches (`chunkArray`). Handle all edge cases like TDD pros!",
      objective: "Write `chunkArray(arr, size)` splitting `arr` into subarrays of length `size` (last chunk may be shorter). Return `[]` if `size <= 0`.",
      requirements: [
        "Guard `if (size <= 0) return [];`.",
        "Step index `i` by `size` (`i += size`) and push `arr.slice(i, i + size)`.",
        "Do NOT mutate the original array."
      ],
      examples: [
        { input: "chunkArray([1, 2, 3, 4, 5], 2)", output: "[[1, 2], [3, 4], [5]]", note: "Remainder chunk of 1" },
        { input: "chunkArray([1, 2], 5)", output: "[[1, 2]]", note: "Size larger than array" }
      ],
      conceptCode: "for (let i = 0; i < arr.length; i += size) {\n  chunks.push(arr.slice(i, i + size));\n}",
      hints: [
        "Guard invalid sizes: `if (size <= 0) return [];`.",
        "Use `arr.slice(i, i + size)` inside `for (let i = 0; i < arr.length; i += size)`.",
        "JavaScript's `.slice()` automatically clamps at `arr.length` cleanly!"
      ],
      exportNames: ["chunkArray"],
      starterCode: "function chunkArray(arr, size) {\n  // TODO: split arr into batches of length size\n  return [];\n}\n\nconsole.log(chunkArray([1, 2, 3, 4, 5], 2));\n",
      solutionCode: "function chunkArray(arr, size) {\n  if (size <= 0) return [];\n  const out = [];\n  for (let i = 0; i < arr.length; i += size) {\n    out.push(arr.slice(i, i + size));\n  }\n  return out;\n}\n\nconsole.log(chunkArray([1, 2, 3, 4, 5], 2));\n",
      tests: [
        { name: "Uneven remainder batch", call: "chunkArray([1, 2, 3, 4, 5], 2)", expected: [[1, 2], [3, 4], [5]] },
        { name: "Exact division", call: "chunkArray([1, 2, 3, 4], 2)", expected: [[1, 2], [3, 4]] },
        { name: "Size larger than array", call: "chunkArray([7, 8], 5)", expected: [[7, 8]] },
        { name: "Invalid size <= 0 returns []", call: "chunkArray([1, 2, 3], 0)", expected: [] }
      ]
    },
    {
      id: "js-rate-guard",
      track: "javascript",
      order: 17,
      title: "API Rate-Limiter Guard (HTTP 429)",
      difficulty: "Architect",
      xp: 95,
      gems: 20,
      lang: "javascript",
      fileName: "rate_limiter.js",
      linkedNodeId: "code-memory-concurrency-race-conditions",
      story: "Protect your backend API from DDoS floods! Build a per-user sliding-window Rate Limiter that tracks request timestamps and returns `200` (allowed) or `429` (Too Many Requests).",
      objective: "Write `createRateGuard(maxReqs, windowMs)` returning a function `check(userId, nowMs)` that returns `200` if the user made fewer than `maxReqs` requests inside `[nowMs - windowMs, nowMs]`, else `429`.",
      requirements: [
        "Store a Map/Object of timestamp arrays per `userId`.",
        "Evict stale timestamps where `nowMs - ts >= windowMs`.",
        "If active count `< maxReqs`, record `nowMs` and return `200`; otherwise do NOT record and return `429`."
      ],
      examples: [
        { input: "g = createRateGuard(2, 1000); g('u1', 100), g('u1', 500), g('u1', 900)", output: "200, 200, 429", note: "3rd request within 1000ms blocked!" },
        { input: "g('u1', 1200)", output: "200", note: "ts=100 expired (1200-100 >= 1000)!" }
      ],
      conceptCode: "const active = (log[userId] || []).filter(t => nowMs - t < windowMs);\nif (active.length >= maxReqs) return 429;",
      hints: [
        "Keep `const logs = {};` inside `createRateGuard`.",
        "On each call: `const active = (logs[userId] || []).filter(ts => nowMs - ts < windowMs);`.",
        "If `active.length >= maxReqs`, save `logs[userId] = active` and return `429`; else push `nowMs`, save, and return `200`!"
      ],
      exportNames: ["createRateGuard"],
      starterCode: "function createRateGuard(maxReqs, windowMs) {\n  const logs = {};\n  return function check(userId, nowMs) {\n    // TODO: prune expired timestamps, return 200 or 429\n    return 200;\n  };\n}\n\nconst guard = createRateGuard(2, 1000);\nconsole.log(guard('u1', 100), guard('u1', 400), guard('u1', 800), guard('u1', 1200));\n",
      solutionCode: "function createRateGuard(maxReqs, windowMs) {\n  const logs = {};\n  return function check(userId, nowMs) {\n    const active = (logs[userId] || []).filter((ts) => nowMs - ts < windowMs);\n    if (active.length >= maxReqs) {\n      logs[userId] = active;\n      return 429;\n    }\n    active.push(nowMs);\n    logs[userId] = active;\n    return 200;\n  };\n}\n\nconst guard = createRateGuard(2, 1000);\nconsole.log(guard('u1', 100), guard('u1', 400), guard('u1', 800), guard('u1', 1200));\n",
      tests: [
        { name: "Blocks 3rd call inside window, allows after expiry", call: "(() => { const g = createRateGuard(2, 1000); return [g('u1', 100), g('u1', 400), g('u1', 800), g('u1', 1200)]; })()", expected: [200, 200, 429, 200] },
        { name: "Isolates separate users independently", call: "(() => { const g = createRateGuard(1, 500); return [g('a', 10), g('b', 20), g('a', 30)]; })()", expected: [200, 200, 429] }
      ]
    },
    {
      id: "js-async-order",
      track: "javascript",
      order: 18,
      title: "Boss Quest: Event Loop Priority Simulator",
      difficulty: "Boss",
      xp: 120,
      gems: 25,
      lang: "javascript",
      fileName: "event_loop.js",
      linkedNodeId: "js-async-promises-event-loop",
      story: "Prove you truly understand JavaScript's Event Loop! Given a batch of tasks tagged `'sync'`, `'micro'` (Promise), or `'macro'` (setTimeout), return the exact deterministic execution order of their labels!",
      objective: "Write `simulateEventLoop(tasks)` where each task is `{ label, kind }`. Execute all `'sync'` first, then all `'micro'`, then all `'macro'`, preserving FIFO arrival order within each queue.",
      requirements: [
        "All `kind === 'sync'` tasks run first in original order.",
        "All `kind === 'micro'` tasks (Promise.then / await) drain second in original order.",
        "All `kind === 'macro'` tasks (setTimeout) run last in original order.",
        "Return an array of just the `label` strings."
      ],
      examples: [
        { input: "simulateEventLoop([{label:'A',kind:'sync'},{label:'B',kind:'macro'},{label:'C',kind:'micro'},{label:'D',kind:'sync'}])", output: "['A', 'D', 'C', 'B']", note: "Sync → Micro → Macro!" }
      ],
      conceptCode: "const priority = { sync: 0, micro: 1, macro: 2 };\n// Bucket into 3 FIFO queues or stable sort by priority!",
      hints: [
        "Create three arrays: `sync = [], micro = [], macro = []`.",
        "Push `t.label` into the matching bucket for each task.",
        "Return `[...sync, ...micro, ...macro]` — `O(n)` linear time and 100% FIFO stable!"
      ],
      exportNames: ["simulateEventLoop"],
      starterCode: "function simulateEventLoop(tasks) {\n  // TODO: order labels Sync -> Microtask -> Macrotask (FIFO within each)\n  return [];\n}\n\nconsole.log(simulateEventLoop([\n  { label: 'A', kind: 'sync' },\n  { label: 'B', kind: 'macro' },\n  { label: 'C', kind: 'micro' },\n  { label: 'D', kind: 'sync' }\n]));\n",
      solutionCode: "function simulateEventLoop(tasks) {\n  const sync = [], micro = [], macro = [];\n  for (const t of tasks) {\n    if (t.kind === 'sync') sync.push(t.label);\n    else if (t.kind === 'micro') micro.push(t.label);\n    else if (t.kind === 'macro') macro.push(t.label);\n  }\n  return [...sync, ...micro, ...macro];\n}\n\nconsole.log(simulateEventLoop([\n  { label: 'A', kind: 'sync' },\n  { label: 'B', kind: 'macro' },\n  { label: 'C', kind: 'micro' },\n  { label: 'D', kind: 'sync' }\n]));\n",
      tests: [
        { name: "Classic A/B/C/D Event Loop puzzle", call: "simulateEventLoop([{label:'A',kind:'sync'},{label:'B',kind:'macro'},{label:'C',kind:'micro'},{label:'D',kind:'sync'}])", expected: ["A", "D", "C", "B"] },
        { name: "Multiple microtasks drain before timers", call: "simulateEventLoop([{label:'T1',kind:'macro'},{label:'P1',kind:'micro'},{label:'P2',kind:'micro'},{label:'T2',kind:'macro'}])", expected: ["P1", "P2", "T1", "T2"] },
        { name: "Empty queue returns []", call: "simulateEventLoop([])", expected: [] }
      ]
    },

    // -------- TRACK 4: SQL & DATABASES (6 QUESTS) --------
    {
      id: "sql-top-heroes",
      track: "sql",
      order: 19,
      title: "SQL Filter: Top 3 Active Heroes",
      difficulty: "Apprentice",
      xp: 50,
      gems: 10,
      lang: "sql",
      fileName: "top_heroes.sql",
      linkedNodeId: "be-sql-select-where-order",
      story: "The Guild Master wants a leaderboard of the Top 3 **active** heroes ranked from highest XP to lowest XP.",
      objective: "Select `name` and `xp` from `heroes` where `active = 1`, ordered by `xp DESC`, limited to `3` rows.",
      requirements: [
        "Return columns `name` and `xp`.",
        "Filter strictly to `active = 1`.",
        "Sort highest `xp` first (`ORDER BY xp DESC`) and cap with `LIMIT 3`."
      ],
      examples: [
        { input: "Table: heroes (8 rows)", output: "Kael (6850), Sora (5900), Mira (4700)", note: "Top 3 active heroes" }
      ],
      conceptCode: "SELECT col1, col2\nFROM table_name\nWHERE condition\nORDER BY col2 DESC\nLIMIT 3;",
      hints: [
        "Start with `SELECT name, xp FROM heroes`.",
        "Add `WHERE active = 1`.",
        "Finish with `ORDER BY xp DESC LIMIT 3;`."
      ],
      starterCode: "-- Return top 3 active heroes (name, xp) sorted by highest XP first\nSELECT name, xp\nFROM heroes\nLIMIT 1;\n",
      solutionCode: "SELECT name, xp\nFROM heroes\nWHERE active = 1\nORDER BY xp DESC\nLIMIT 3;\n",
      tests: [
        { name: "Returns exactly 3 rows", expectedDesc: "3 rows", verify: (r) => ({ ok: r.rows.length === 3, actual: `${r.rows.length} rows` }) },
        { name: "Top hero is Kael (6850 XP)", expectedDesc: "Kael with 6850", verify: (r) => ({ ok: r.rows[0] && r.rows[0].name === "Kael" && r.rows[0].xp === 6850, actual: r.rows[0] ? `${r.rows[0].name} (${r.rows[0].xp})` : "none" }) },
        { name: "Exact top-3 sequence: Kael, Sora, Mira", expectedDesc: "Kael, Sora, Mira", verify: (r) => ({ ok: r.rows.map((x) => x.name).join(",") === "Kael,Sora,Mira", actual: r.rows.map((x) => x.name).join(", ") }) }
      ]
    },
    {
      id: "sql-guild-join",
      track: "sql",
      order: 20,
      title: "SQL INNER JOIN: Heroes & Guild Names",
      difficulty: "Journeyman",
      xp: 65,
      gems: 14,
      lang: "sql",
      fileName: "roster_join.sql",
      linkedNodeId: "be-sql-joins-groupby-agg",
      story: "In our normalized schema, `heroes` stores `guild_id` instead of duplicating guild names. Join `heroes` with `guilds` to print every affiliated hero alongside their guild name!",
      objective: "Write an `INNER JOIN` returning `h.name AS hero` and `g.name AS guild`, ordered alphabetically by `h.name ASC`.",
      requirements: [
        "Join `heroes h` with `guilds g` on `h.guild_id = g.id`.",
        "Alias `h.name AS hero` and `g.name AS guild`.",
        "Order by `h.name ASC` (note: guildless hero Zane is automatically excluded by `INNER JOIN`)."
      ],
      examples: [
        { input: "heroes ⋈ guilds", output: "7 rows: Aria → Obsidian Order, Devon → Obsidian Order, ...", note: "Zane has NULL guild_id" }
      ],
      conceptCode: "SELECT a.name AS item, b.name AS owner\nFROM items a\nINNER JOIN owners b ON a.owner_id = b.id\nORDER BY a.name ASC;",
      hints: [
        "Use table aliases: `FROM heroes h INNER JOIN guilds g ON h.guild_id = g.id`.",
        "Project `SELECT h.name AS hero, g.name AS guild`.",
        "Sort with `ORDER BY h.name ASC;`."
      ],
      starterCode: "-- Join heroes and guilds to show hero & guild names (A-Z)\nSELECT name\nFROM heroes;\n",
      solutionCode: "SELECT h.name AS hero, g.name AS guild\nFROM heroes h\nINNER JOIN guilds g ON h.guild_id = g.id\nORDER BY h.name ASC;\n",
      tests: [
        { name: "Returns 7 affiliated heroes (excludes Zane)", expectedDesc: "7 rows", verify: (r) => ({ ok: r.rows.length === 7, actual: `${r.rows.length} rows` }) },
        { name: "First row is Aria in Obsidian Order", expectedDesc: "Aria · Obsidian Order", verify: (r) => ({ ok: r.rows[0] && r.rows[0].hero === "Aria" && r.rows[0].guild === "Obsidian Order", actual: r.rows[0] ? `${r.rows[0].hero} · ${r.rows[0].guild}` : "none" }) },
        { name: "Kael maps to Iron Compilers", expectedDesc: "Kael · Iron Compilers", verify: (r) => { const k = r.rows.find((x) => x.hero === "Kael"); return { ok: Boolean(k && k.guild === "Iron Compilers"), actual: k ? `${k.hero} · ${k.guild}` : "missing" }; } }
      ]
    },
    {
      id: "sql-guild-leaderboard",
      track: "sql",
      order: 21,
      title: "SQL GROUP BY: Guild Total XP Leaderboard",
      difficulty: "Journeyman",
      xp: 75,
      gems: 15,
      lang: "sql",
      fileName: "guild_xp.sql",
      linkedNodeId: "be-sql-joins-groupby-agg",
      story: "Which Guild reigns supreme in total combined XP? Join `guilds` and `heroes`, group by guild name, and rank guilds by `SUM(h.xp)`!",
      objective: "Return `g.name AS guild`, `COUNT(h.id) AS members`, and `SUM(h.xp) AS total_xp`, sorted by `total_xp DESC`.",
      requirements: [
        "INNER JOIN `guilds g` and `heroes h` on `g.id = h.guild_id`.",
        "Group by `g.name` and alias `COUNT(h.id) AS members`, `SUM(h.xp) AS total_xp`.",
        "Sort `ORDER BY total_xp DESC`."
      ],
      examples: [
        { input: "GROUP BY g.name", output: "1. Iron Compilers (12750), 2. Obsidian Order (11300), 3. Quantum Mages (4450)", note: "3 active guilds" }
      ],
      conceptCode: "SELECT g.name AS guild, COUNT(h.id) AS members, SUM(h.xp) AS total_xp\nFROM guilds g\nINNER JOIN heroes h ON g.id = h.guild_id\nGROUP BY g.name\nORDER BY total_xp DESC;",
      hints: [
        "Join `guilds g INNER JOIN heroes h ON g.id = h.guild_id`.",
        "Add `GROUP BY g.name` so aggregates compute per guild.",
        "Order descending with `ORDER BY total_xp DESC;`."
      ],
      starterCode: "-- Rank guilds by total combined hero XP\nSELECT name AS guild\nFROM guilds;\n",
      solutionCode: "SELECT g.name AS guild, COUNT(h.id) AS members, SUM(h.xp) AS total_xp\nFROM guilds g\nINNER JOIN heroes h ON g.id = h.guild_id\nGROUP BY g.name\nORDER BY total_xp DESC;\n",
      tests: [
        { name: "Returns 3 guilds with members", expectedDesc: "3 rows", verify: (r) => ({ ok: r.rows.length === 3, actual: `${r.rows.length} rows` }) },
        { name: "#1 Guild is Iron Compilers with 12750 XP", expectedDesc: "Iron Compilers (12750)", verify: (r) => ({ ok: r.rows[0] && r.rows[0].guild === "Iron Compilers" && r.rows[0].total_xp === 12750, actual: r.rows[0] ? `${r.rows[0].guild} (${r.rows[0].total_xp})` : "none" }) },
        { name: "Obsidian Order has 3 members & 11300 XP", expectedDesc: "3 members, 11300 XP", verify: (r) => { const o = r.rows.find((x) => x.guild === "Obsidian Order"); return { ok: Boolean(o && o.members === 3 && o.total_xp === 11300), actual: o ? `${o.members} members, ${o.total_xp} XP` : "missing" }; } }
      ]
    },
    {
      id: "sql-lonely-heroes",
      track: "sql",
      order: 22,
      title: "SQL Anti-Join: Find Empty Guilds (`LEFT JOIN` + `IS NULL`)",
      difficulty: "Adept",
      xp: 85,
      gems: 18,
      lang: "sql",
      fileName: "empty_guilds.sql",
      linkedNodeId: "be-sql-joins-groupby-agg",
      story: "One of our 4 guilds has ZERO recruited heroes! Use the legendary `LEFT JOIN ... WHERE right.id IS NULL` anti-join pattern to find it.",
      objective: "Return `g.name AS empty_guild` for every guild that has NO heroes in `heroes`.",
      requirements: [
        "Start `FROM guilds g LEFT JOIN heroes h ON g.id = h.guild_id`.",
        "Filter strictly with `WHERE h.id IS NULL` (never `= NULL`!).",
        "Select `g.name AS empty_guild`."
      ],
      examples: [
        { input: "guilds LEFT JOIN heroes", output: "Silent Sockets", note: "Guild #4 has 0 heroes" }
      ],
      conceptCode: "SELECT parent.name\nFROM parent\nLEFT JOIN child ON parent.id = child.parent_id\nWHERE child.id IS NULL;",
      hints: [
        "Use `LEFT JOIN` so empty guilds survive with `h.id = NULL`.",
        "Filter with `WHERE h.id IS NULL`.",
        "Alias `SELECT g.name AS empty_guild`."
      ],
      starterCode: "-- Find guilds that have ZERO heroes using LEFT JOIN + IS NULL\nSELECT g.name AS empty_guild\nFROM guilds g;\n",
      solutionCode: "SELECT g.name AS empty_guild\nFROM guilds g\nLEFT JOIN heroes h ON g.id = h.guild_id\nWHERE h.id IS NULL;\n",
      tests: [
        { name: "Returns exactly 1 empty guild", expectedDesc: "1 row", verify: (r) => ({ ok: r.rows.length === 1, actual: `${r.rows.length} rows` }) },
        { name: "Identifies Silent Sockets", expectedDesc: "Silent Sockets", verify: (r) => ({ ok: r.rows[0] && r.rows[0].empty_guild === "Silent Sockets", actual: r.rows[0] ? String(r.rows[0].empty_guild) : "none" }) }
      ]
    },
    {
      id: "sql-high-performers",
      track: "sql",
      order: 23,
      title: "SQL HAVING: Elite Guilds Over 10,000 XP",
      difficulty: "Architect",
      xp: 95,
      gems: 20,
      lang: "sql",
      fileName: "elite_guilds.sql",
      linkedNodeId: "be-sql-joins-groupby-agg",
      story: "Only guilds whose combined **active** hero XP exceeds `10,000` qualify for the Grand Championship! Combine `WHERE` (row filter) AND `HAVING` (group filter) in one clean query.",
      objective: "Select `g.name AS guild` and `SUM(h.xp) AS active_xp` for guilds with `active = 1` heroes summing over `10000`, sorted `active_xp DESC`.",
      requirements: [
        "Filter raw rows with `WHERE h.active = 1` BEFORE grouping.",
        "Group by `g.name` and filter groups with `HAVING SUM(h.xp) > 10000`.",
        "Sort `ORDER BY active_xp DESC`."
      ],
      examples: [
        { input: "WHERE h.active = 1 + HAVING SUM(h.xp) > 10000", output: "Iron Compilers (12750), Obsidian Order (11300)", note: "Quantum Mages (3100 active) excluded!" }
      ],
      conceptCode: "SELECT g.name, SUM(h.xp) AS active_xp\nFROM guilds g INNER JOIN heroes h ON g.id = h.guild_id\nWHERE h.active = 1\nGROUP BY g.name\nHAVING SUM(h.xp) > 10000;",
      hints: [
        "`WHERE h.active = 1` drops inactive hero Taro BEFORE summing.",
        "`GROUP BY g.name` aggregates per guild.",
        "`HAVING SUM(h.xp) > 10000` filters out Quantum Mages cleanly!"
      ],
      starterCode: "-- Combine WHERE (active=1) + GROUP BY + HAVING SUM(h.xp) > 10000\nSELECT g.name AS guild, SUM(h.xp) AS active_xp\nFROM guilds g\nINNER JOIN heroes h ON g.id = h.guild_id\nGROUP BY g.name;\n",
      solutionCode: "SELECT g.name AS guild, SUM(h.xp) AS active_xp\nFROM guilds g\nINNER JOIN heroes h ON g.id = h.guild_id\nWHERE h.active = 1\nGROUP BY g.name\nHAVING SUM(h.xp) > 10000\nORDER BY active_xp DESC;\n",
      tests: [
        { name: "Returns exactly 2 elite guilds", expectedDesc: "2 rows", verify: (r) => ({ ok: r.rows.length === 2, actual: `${r.rows.length} rows` }) },
        { name: "Iron Compilers #1, Obsidian Order #2", expectedDesc: "Iron Compilers, Obsidian Order", verify: (r) => ({ ok: r.rows.map((x) => x.guild).join(",") === "Iron Compilers,Obsidian Order", actual: r.rows.map((x) => x.guild).join(", ") }) }
      ]
    },
    {
      id: "sql-active-guilds-boss",
      track: "sql",
      order: 24,
      title: "Boss Quest: Multi-Table Passed Quest Champions",
      difficulty: "Boss",
      xp: 120,
      gems: 25,
      lang: "sql",
      fileName: "champions.sql",
      linkedNodeId: "be-sql-indexes-acid-transactions",
      story: "Combine `heroes`, `submissions`, and `quests` in a 3-table JOIN to find every hero's total earned Quest XP from `PASSED` submissions only!",
      objective: "Return `h.name AS hero` and `SUM(q.xp_reward) AS earned_xp` from `heroes h`, `submissions s`, `quests q` where `s.status = 'PASSED'`, grouped by `h.name`, ordered `earned_xp DESC`, `LIMIT 3`.",
      requirements: [
        "JOIN `submissions s ON h.id = s.hero_id` and `quests q ON s.quest_id = q.id`.",
        "Filter `WHERE s.status = 'PASSED'` (exclude Sora's FAILED submission!).",
        "Group by `h.name`, sort `ORDER BY earned_xp DESC`, and `LIMIT 3`."
      ],
      examples: [
        { input: "3-table JOIN + WHERE + GROUP BY + LIMIT 3", output: "Kael (1100), Aria (850), Sora (600)", note: "Top 3 quest earners!" }
      ],
      conceptCode: "SELECT h.name AS hero, SUM(q.xp_reward) AS earned_xp\nFROM heroes h\nINNER JOIN submissions s ON h.id = s.hero_id\nINNER JOIN quests q ON s.quest_id = q.id\nWHERE s.status = 'PASSED'\nGROUP BY h.name\nORDER BY earned_xp DESC\nLIMIT 3;",
      hints: [
        "Chain two `INNER JOIN` clauses: `heroes → submissions → quests`.",
        "Filter `WHERE s.status = 'PASSED'` BEFORE `GROUP BY h.name`.",
        "Finish with `ORDER BY earned_xp DESC LIMIT 3;`."
      ],
      starterCode: "-- 3-table JOIN: Top 3 heroes by total PASSED quest xp_reward\nSELECT h.name AS hero\nFROM heroes h\nLIMIT 3;\n",
      solutionCode: "SELECT h.name AS hero, SUM(q.xp_reward) AS earned_xp\nFROM heroes h\nINNER JOIN submissions s ON h.id = s.hero_id\nINNER JOIN quests q ON s.quest_id = q.id\nWHERE s.status = 'PASSED'\nGROUP BY h.name\nORDER BY earned_xp DESC\nLIMIT 3;\n",
      tests: [
        { name: "Returns top 3 champions", expectedDesc: "3 rows", verify: (r) => ({ ok: r.rows.length === 3, actual: `${r.rows.length} rows` }) },
        { name: "#1 Champion is Kael with 1100 XP", expectedDesc: "Kael (1100)", verify: (r) => ({ ok: r.rows[0] && r.rows[0].hero === "Kael" && r.rows[0].earned_xp === 1100, actual: r.rows[0] ? `${r.rows[0].hero} (${r.rows[0].earned_xp})` : "none" }) },
        { name: "#2 is Aria (850) and #3 is Sora (600)", expectedDesc: "Aria(850), Sora(600)", verify: (r) => ({ ok: r.rows[1] && r.rows[1].hero === "Aria" && r.rows[1].earned_xp === 850 && r.rows[2] && r.rows[2].hero === "Sora" && r.rows[2].earned_xp === 600, actual: r.rows.slice(1).map((x) => `${x.hero}(${x.earned_xp})`).join(", ") }) }
      ]
    },

    // -------- TRACK 5: GIT & LINUX CLI (3 QUESTS) --------
    {
      id: "git-repo-rescue",
      track: "shell",
      order: 25,
      title: "Git Bootup: Init, Stage & First Commit",
      difficulty: "Apprentice",
      xp: 50,
      gems: 10,
      lang: "shell",
      fileName: "bootstrap.sh",
      linkedNodeId: "be-git-internals-branching-rebase",
      story: "Your project directory `/workspace/everylingo-app` has NO version control yet! Initialize Git, stage all project files, and record your first clean commit.",
      objective: "Write shell commands to initialize a Git repo, stage all files (`git add .`), and commit them with `-m`.",
      requirements: [
        "Run `git init`.",
        "Stage files with `git add .`.",
        "Commit with `git commit -m \"...\"` so at least 1 commit exists on `main`."
      ],
      examples: [
        { input: "git init → git add . → git commit -m \"init\"", output: "[main f1119a4] init", note: "3-step local Git flow" }
      ],
      conceptCode: "git init\ngit add .\ngit commit -m \"feat: initial backend setup\"",
      hints: [
        "Line 1: `git init`",
        "Line 2: `git add .`",
        "Line 3: `git commit -m \"initial commit\"`"
      ],
      shellInit: { gitInit: false },
      starterCode: "# Initialize git, stage all files, and make your first commit!\ngit status\n",
      solutionCode: "git init\ngit add .\ngit commit -m \"chore: initial commit\"\n",
      tests: [
        { name: "Git repository initialized", expectedDesc: "git.initialized === true", verify: (r) => ({ ok: r.state.git.initialized, actual: String(r.state.git.initialized) }) },
        { name: "At least 1 commit created on main", expectedDesc: ">= 1 commit", verify: (r) => ({ ok: r.state.git.commits.length >= 1, actual: `${r.state.git.commits.length} commits` }) }
      ]
    },
    {
      id: "git-branch-merge",
      track: "shell",
      order: 26,
      title: "Git Feature Branch & Clean Merge",
      difficulty: "Journeyman",
      xp: 70,
      gems: 15,
      lang: "shell",
      fileName: "feature_flow.sh",
      linkedNodeId: "be-git-internals-branching-rebase",
      story: "Never code directly on `main`! Branch off to `feat-auth`, add a new file `auth.py`, commit it on `feat-auth`, switch back to `main`, and merge `feat-auth` cleanly.",
      objective: "Create branch `feat-auth`, commit `auth.py` on it, then switch back to `main` and merge `feat-auth`.",
      requirements: [
        "Create and switch to `feat-auth` (`git checkout -b feat-auth`).",
        "Create `auth.py` (`touch auth.py`), stage (`git add .`), and commit (`git commit -m ...`).",
        "Switch back (`git checkout main`) and run `git merge feat-auth`."
      ],
      examples: [
        { input: "checkout -b feat-auth → commit → checkout main → merge", output: "Merge made: feat-auth → main", note: "Production PR workflow!" }
      ],
      conceptCode: "git checkout -b feat-auth\ntouch auth.py\ngit add .\ngit commit -m \"feat: add auth\"\ngit checkout main\ngit merge feat-auth",
      hints: [
        "The repo is already initialized with 1 initial commit on `main`.",
        "Create the branch with `git checkout -b feat-auth`, then `touch auth.py`, `git add .`, `git commit -m \"add auth\"`.",
        "Return with `git checkout main` and integrate via `git merge feat-auth`."
      ],
      shellInit: { gitInit: true },
      starterCode: "# Repo is already initialized on main!\n# Create branch feat-auth, commit auth.py, switch to main, and merge.\ngit branch\n",
      solutionCode: "git checkout -b feat-auth\ntouch auth.py\ngit add .\ngit commit -m \"feat: add auth module\"\ngit checkout main\ngit merge feat-auth\n",
      tests: [
        { name: "Branch 'feat-auth' exists", expectedDesc: "feat-auth in branches", verify: (r) => ({ ok: "feat-auth" in r.state.git.branches, actual: Object.keys(r.state.git.branches).join(", ") }) },
        { name: "File 'auth.py' created", expectedDesc: "auth.py exists", verify: (r) => ({ ok: "/workspace/everylingo-app/auth.py" in r.state.files, actual: Object.keys(r.state.files).map((f) => f.split("/").pop()).join(", ") }) },
        { name: "Merged back onto main (>= 3 commits)", expectedDesc: "On main with >= 3 commits", verify: (r) => ({ ok: r.state.git.branch === "main" && r.state.git.commits.length >= 3, actual: `branch=${r.state.git.branch}, commits=${r.state.git.commits.length}` }) }
      ]
    },
    {
      id: "cli-log-sleuth",
      track: "shell",
      order: 27,
      title: "Linux Incident Triage: Grep Production Errors",
      difficulty: "Journeyman",
      xp: 60,
      gems: 12,
      lang: "shell",
      fileName: "triage.sh",
      linkedNodeId: "be-linux-cli-pipes-permissions",
      story: "Production alerts just fired! Navigate into `logs`, filter `server.log` for every `ERROR` line using `grep`, and create a `triage` folder for your post-mortem notes.",
      objective: "Move into `logs`, search `server.log` for `ERROR` using `grep`, and create directory `triage`.",
      requirements: [
        "Run `cd logs`.",
        "Run `grep ERROR server.log` so error lines print to stdout.",
        "Create a `triage` directory with `mkdir triage`."
      ],
      examples: [
        { input: "cd logs → grep ERROR server.log", output: "ERROR db timeout on shard-2 / ERROR auth token expired", note: "Instant server triage!" }
      ],
      conceptCode: "cd logs\nls\ngrep ERROR server.log\nmkdir triage",
      hints: [
        "Line 1: `cd logs`",
        "Line 2: `grep ERROR server.log`",
        "Line 3: `mkdir triage`"
      ],
      shellInit: { gitInit: false },
      starterCode: "# Inspect logs/server.log for ERROR lines and create a triage folder\npwd\nls\n",
      solutionCode: "cd logs\ngrep ERROR server.log\nmkdir triage\n",
      tests: [
        { name: "Navigated into logs directory", expectedDesc: "/workspace/everylingo-app/logs", verify: (r) => ({ ok: r.state.cwd === "/workspace/everylingo-app/logs", actual: r.state.cwd }) },
        { name: "Extracted ERROR lines from server.log", expectedDesc: "Output contains db timeout & auth token expired", verify: (r) => { const txt = r.out.join("\n"); return { ok: txt.includes("db timeout") && txt.includes("auth token expired"), actual: txt.includes("ERROR") ? "Found ERROR lines" : "No ERROR output" }; } },
        { name: "Created triage folder", expectedDesc: "logs/triage exists", verify: (r) => ({ ok: r.state.dirs.has("/workspace/everylingo-app/logs/triage"), actual: r.state.dirs.has("/workspace/everylingo-app/logs/triage") ? "exists" : "missing" }) }
      ]
    },

    // -------- TRACK 6: HTML & CSS LIVE UI (3 QUESTS) --------
    {
      id: "web-status-card",
      track: "html",
      order: 28,
      title: "Semantic Obsidian Status Card",
      difficulty: "Apprentice",
      xp: 50,
      gems: 10,
      lang: "html",
      fileName: "status_card.html",
      linkedNodeId: "code-html-anatomy-semantics",
      story: "Build a clean, accessible semantic HTML status card for an API health dashboard — watch it render live in the Console / Preview tab!",
      objective: "Create a semantic `<article class=\"card\">` containing an `<h3>`, a status `<span class=\"badge\">`, and a `<button type=\"button\">`.",
      requirements: [
        "Use semantic `<article class=\"card\">` wrapper.",
        "Include an `<h3>` heading and `<span class=\"badge\">ONLINE</span>`.",
        "Include an explicit `<button type=\"button\">` CTA."
      ],
      examples: [
        { input: "Semantic <article> + <h3> + <span class='badge'> + <button>", output: "Live Obsidian Card Preview", note: "Zero div-soup!" }
      ],
      conceptCode: "<article class=\"card\">\n  <span class=\"badge\">ONLINE</span>\n  <h3>API Gateway</h3>\n  <button type=\"button\">Ping</button>\n</article>",
      hints: [
        "Replace generic `<div>` with `<article class=\"card\">`.",
        "Add `<span class=\"badge\">ONLINE</span>` and `<h3>API Gateway</h3>`.",
        "Finish with `<button type=\"button\">Inspect</button>`."
      ],
      starterCode: "<style>\n  body { margin: 0; padding: 18px; background: #050507; color: #f7f7f9; font-family: Inter, system-ui, sans-serif; }\n  .card { background: #0d0e13; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px; max-width: 300px; }\n  .badge { display: inline-block; padding: 3px 9px; border-radius: 99px; font-size: 11px; font-weight: 700; background: rgba(142,184,163,0.14); color: #8eb8a3; border: 1px solid rgba(142,184,163,0.3); }\n  button { margin-top: 10px; background: #8da69a; color: #060a08; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 700; cursor: pointer; }\n</style>\n<!-- TODO: build semantic <article class=\"card\"> with badge, h3, and button -->\n<div>TODO</div>\n",
      solutionCode: "<style>\n  body { margin: 0; padding: 18px; background: #050507; color: #f7f7f9; font-family: Inter, system-ui, sans-serif; }\n  .card { background: #0d0e13; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px; max-width: 300px; }\n  .badge { display: inline-block; padding: 3px 9px; border-radius: 99px; font-size: 11px; font-weight: 700; background: rgba(142,184,163,0.14); color: #8eb8a3; border: 1px solid rgba(142,184,163,0.3); }\n  button { margin-top: 10px; background: #8da69a; color: #060a08; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 700; cursor: pointer; }\n</style>\n<article class=\"card\">\n  <span class=\"badge\">ONLINE</span>\n  <h3>Obsidian API Gateway</h3>\n  <p style=\"color:#9a9aa6; font-size:13px;\">99.99% uptime · 12ms p95 latency</p>\n  <button type=\"button\">Inspect Metrics</button>\n</article>\n",
      tests: [
        { name: "Uses semantic <article class=\"card\">", expectedDesc: "<article class=\"card\">", verify: (src) => ({ ok: /<article[^>]*class=["'][^"']*card/i.test(src), actual: /<article/i.test(src) ? "Found <article>" : "Missing <article class='card'>" }) },
        { name: "Includes <h3> and .badge span", expectedDesc: "<h3> and <span class='badge'>", verify: (src) => ({ ok: /<h3\b/i.test(src) && /class=["'][^"']*badge/i.test(src), actual: /<h3/i.test(src) ? "Found <h3>" : "Missing <h3> or .badge" }) },
        { name: "Includes accessible <button type=\"button\">", expectedDesc: "<button type=\"button\">", verify: (src) => ({ ok: /<button[^>]*type=["']button["']/i.test(src), actual: /<button/i.test(src) ? "Found <button>" : "Missing <button type='button'>" }) }
      ]
    },
    {
      id: "web-flex-navbar",
      track: "html",
      order: 29,
      title: "Flexbox Split Navigation Header",
      difficulty: "Journeyman",
      xp: 65,
      gems: 14,
      lang: "html",
      fileName: "navbar.html",
      linkedNodeId: "code-css-flexbox-grid-responsive",
      story: "Use modern CSS Flexbox (`display: flex; justify-content: space-between; align-items: center;`) to align a brand mark on the left and 3 nav links cleanly on the right!",
      objective: "Style `.topbar` with Flexbox split alignment and put a semantic `<nav>` with 3 `<a>` links inside `<header class=\"topbar\">`.",
      requirements: [
        "`.topbar` uses `display: flex`, `justify-content: space-between`, and `align-items: center`.",
        "Use `<header class=\"topbar\">` containing a `<nav>` with at least 3 `<a>` links."
      ],
      examples: [
        { input: "display: flex + justify-content: space-between", output: "Brand left · Links right", note: "Zero floats, zero hacks!" }
      ],
      conceptCode: ".topbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}",
      hints: [
        "Add `display: flex; justify-content: space-between; align-items: center;` inside `.topbar { ... }`.",
        "Add `display: flex; gap: 14px;` to `nav` so links breathe evenly.",
        "Ensure `<header class=\"topbar\">` holds `<nav>` with 3 `<a>` tags."
      ],
      starterCode: "<style>\n  body { margin: 0; padding: 16px; background: #050507; color: #f7f7f9; font-family: Inter, system-ui, sans-serif; }\n  .topbar {\n    /* TODO: add Flexbox split layout */\n    background: #0d0e13;\n    border: 1px solid rgba(255,255,255,0.12);\n    border-radius: 12px;\n    padding: 12px 16px;\n  }\n  nav a { color: #8eb8a3; text-decoration: none; font-size: 13px; font-weight: 600; }\n</style>\n<header class=\"topbar\">\n  <strong>Code Forge</strong>\n  <nav>\n    <a href=\"#quests\">Quests</a>\n  </nav>\n</header>\n",
      solutionCode: "<style>\n  body { margin: 0; padding: 16px; background: #050507; color: #f7f7f9; font-family: Inter, system-ui, sans-serif; }\n  .topbar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background: #0d0e13;\n    border: 1px solid rgba(255,255,255,0.12);\n    border-radius: 12px;\n    padding: 12px 16px;\n  }\n  nav { display: flex; gap: 16px; }\n  nav a { color: #8eb8a3; text-decoration: none; font-size: 13px; font-weight: 600; }\n</style>\n<header class=\"topbar\">\n  <strong>Code Forge</strong>\n  <nav>\n    <a href=\"#quests\">Quests</a>\n    <a href=\"#labs\">Playgrounds</a>\n    <a href=\"#docs\">Guide</a>\n  </nav>\n</header>\n",
      tests: [
        { name: "Uses display: flex", expectedDesc: "display: flex", verify: (src) => ({ ok: /display\s*:\s*flex/i.test(src), actual: /display\s*:\s*flex/i.test(src) ? "display: flex" : "missing" }) },
        { name: "Splits with justify-content: space-between & align-items: center", expectedDesc: "space-between + center", verify: (src) => ({ ok: /justify-content\s*:\s*space-between/i.test(src) && /align-items\s*:\s*center/i.test(src), actual: /space-between/i.test(src) ? "aligned" : "missing alignment" }) },
        { name: "Has <nav> with >= 3 <a> links", expectedDesc: ">= 3 links", verify: (src) => { const n = (src.match(/<a\b/gi) || []).length; return { ok: /<nav\b/i.test(src) && n >= 3, actual: `${n} links` }; } }
      ]
    },
    {
      id: "web-bento-grid",
      track: "html",
      order: 30,
      title: "3-Column CSS Bento Metric Grid",
      difficulty: "Adept",
      xp: 80,
      gems: 18,
      lang: "html",
      fileName: "bento_grid.html",
      linkedNodeId: "code-css-flexbox-grid-responsive",
      story: "Craft a crisp 3-column Obsidian Bento Dashboard using CSS Grid (`grid-template-columns: repeat(3, 1fr)`) with consistent `gap`!",
      objective: "Configure `.bento` with `display: grid`, `grid-template-columns: repeat(3, 1fr)`, and `gap`, displaying at least 3 `.tile` metric cards.",
      requirements: [
        "Set `display: grid` on `.bento`.",
        "Define `grid-template-columns: repeat(3, 1fr)` and a `gap`.",
        "Render at least 3 `.tile` cards inside `.bento`."
      ],
      examples: [
        { input: "display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;", output: "3 crisp equal-width Bento tiles", note: "1fr = equal fractional track!" }
      ],
      conceptCode: ".bento {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}",
      hints: [
        "Inside `.bento`, add `display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;`.",
        "Include 3 `<div class=\"tile\">...</div>` elements inside `<section class=\"bento\">`."
      ],
      starterCode: "<style>\n  body { margin: 0; padding: 16px; background: #050507; color: #f7f7f9; font-family: Inter, system-ui, sans-serif; }\n  .bento {\n    /* TODO: 3-column CSS Grid with gap */\n  }\n  .tile { background: #0d0e13; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 14px; }\n  .num { font-size: 22px; font-weight: 800; color: #8eb8a3; }\n  .lbl { font-size: 11px; color: #9a9aa6; text-transform: uppercase; }\n</style>\n<section class=\"bento\">\n  <div class=\"tile\"><div class=\"num\">99.9%</div><div class=\"lbl\">Uptime</div></div>\n</section>\n",
      solutionCode: "<style>\n  body { margin: 0; padding: 16px; background: #050507; color: #f7f7f9; font-family: Inter, system-ui, sans-serif; }\n  .bento {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 12px;\n  }\n  .tile { background: #0d0e13; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 14px; }\n  .num { font-size: 22px; font-weight: 800; color: #8eb8a3; }\n  .lbl { font-size: 11px; color: #9a9aa6; text-transform: uppercase; }\n</style>\n<section class=\"bento\">\n  <div class=\"tile\"><div class=\"num\">99.9%</div><div class=\"lbl\">Uptime</div></div>\n  <div class=\"tile\"><div class=\"num\">11ms</div><div class=\"lbl\">P95 Latency</div></div>\n  <div class=\"tile\"><div class=\"num\">30/30</div><div class=\"lbl\">Quests</div></div>\n</section>\n",
      tests: [
        { name: "Uses display: grid", expectedDesc: "display: grid", verify: (src) => ({ ok: /display\s*:\s*grid/i.test(src), actual: /display\s*:\s*grid/i.test(src) ? "display: grid" : "missing" }) },
        { name: "3 equal columns with repeat(3, 1fr) & gap", expectedDesc: "repeat(3, 1fr) + gap", verify: (src) => ({ ok: /grid-template-columns\s*:\s*repeat\(\s*3\s*,\s*1fr\s*\)/i.test(src) && /gap\s*:/i.test(src), actual: /repeat\(\s*3/i.test(src) ? "3-col grid" : "missing repeat(3, 1fr) or gap" }) },
        { name: "Contains >= 3 .tile cards", expectedDesc: ">= 3 .tile cards", verify: (src) => { const c = (src.match(/class=["'][^"']*tile/gi) || []).length; return { ok: c >= 3, actual: `${c} tiles` }; } }
      ]
    }
  ];

  // Auto-normalize sequential lesson numbers (1..36) cleanly
  QUESTS.forEach((q, idx) => { q.order = idx + 1; });

  // ==================== PLAIN-ENGLISH CONCEPT TUTORIALS (ALL 30 CORE LESSONS) ====================
  const QUEST_TUTORIALS = {
    "py-rpg-damage": {
      summary: "Functions often need to protect against invalid results (like negative damage) and support optional settings with default values.",
      steps: [
        { label: "Clamp to a minimum with max()", text: "`max(0, atk - armor)` picks whichever is larger — so if armor is stronger than attack, damage safely stays at `0`." },
        { label: "Default parameters", text: "Writing `is_crit=False` lets callers omit the third argument when a hit is not critical." },
        { label: "Conditional multiply", text: "Check `if is_crit:` and double the clamped damage with `dmg *= 2`." }
      ],
      tip: "Always clamp to `0` BEFORE multiplying, or check that negative numbers never leak through."
    },
    "py-loot-filter": {
      summary: "A **list comprehension** lets you filter and transform every item in a list in one clean expression without modifying the original list.",
      steps: [
        { label: "Read the shape", text: "`[new_value for item in items if condition]` builds a brand-new list." },
        { label: "Filter first", text: "`if p >= min_power` keeps only numbers at or above the threshold." },
        { label: "Transform each survivor", text: "`p + 10` boosts every surviving item by 10." }
      ],
      tip: "Notice `>=` is inclusive — a score equal to `min_power` should be kept."
    },
    "py-freq-counter": {
      summary: "A **dictionary** (`dict`) pairs keys with values — like a phonebook or word counter (`{'code': 2}`).",
      steps: [
        { label: "Normalize & split words", text: "`text.lower().split()` turns a sentence into lowercase words and ignores extra spaces." },
        { label: "Safe lookup with .get()", text: "`counts.get(word, 0)` returns the current count, or `0` if this is the first time seeing that word." },
        { label: "Increment in one pass", text: "Assign `counts[word] = counts.get(word, 0) + 1` inside a simple `for` loop." }
      ],
      tip: "Using `.get(word, 0)` avoids a `KeyError` crash the first time a new word appears."
    },
    "py-recursive-fact": {
      summary: "**Recursion** is when a function solves a bigger problem by calling itself on a slightly smaller version until it hits a simple stopping point.",
      steps: [
        { label: "Always write the base case first", text: "For factorial, `if n <= 1: return 1` stops the chain so it never loops forever." },
        { label: "Shrink the problem", text: "`return n * factorial(n - 1)` multiplies `n` by the answer for `n - 1`." },
        { label: "Watch it live", text: "After running your code, click the **Step Trace** tab to watch each call stack frame build up and return!" }
      ],
      tip: "Every recursive function needs two things: a stopping rule (base case) and a smaller step toward it."
    },
    "py-hero-class": {
      summary: "A **class** bundles related data (like `name` and `hp`) together with the actions (`take_damage`, `heal`) that safely change that data.",
      steps: [
        { label: "Initialize attributes in __init__", text: "`self.hp = max_hp` stores data directly on each individual object." },
        { label: "Protect rules inside methods", text: "`take_damage` uses `max(0, ...)` so HP never drops below `0`; `heal` uses `min(self.max_hp, ...)` so it never passes max." },
        { label: "Remember self", text: "Every method inside a Python class takes `self` as its first parameter." }
      ],
      tip: "Think of `self` as 'this specific hero'. Each object keeps its own separate `self.hp`."
    },
    "py-anagram-palindrome": {
      summary: "Two phrases are **anagrams** if they contain the exact same letters in any order — after ignoring spaces and capitalization.",
      steps: [
        { label: "Clean both strings", text: "Use `s.lower().replace(' ', '')` to remove spaces and make everything lowercase." },
        { label: "Compare sorted letters", text: "If two cleaned words have the exact same letters, `sorted(ca) == sorted(cb)` will be `True`!" }
      ],
      tip: "Cleaning input text first ('normalization') is one of the most useful habits in everyday programming."
    },
    "dsa-two-sum": {
      summary: "Instead of checking every pair with slow nested loops, a **hash map** (`dict`) lets you remember numbers you already saw and look up their partner instantly.",
      steps: [
        { label: "Compute the needed partner", text: "For each number `x`, the partner you need is `need = target - x`." },
        { label: "Check your memory dictionary", text: "If `need in seen`, you immediately found both indices: `[seen[need], i]`." },
        { label: "Remember as you go", text: "Otherwise, store `seen[x] = i` and continue to the next number." }
      ],
      tip: "Check `if need in seen` BEFORE storing `seen[x] = i` so an element is never paired with itself."
    },
    "dsa-valid-parens": {
      summary: "A **stack** works like a stack of plates: the last bracket you open MUST be the very first bracket you close (Last-In, First-Out).",
      steps: [
        { label: "Push openers", text: "When you see `(`, `[`, or `{`, push it onto a list `stack.append(ch)`." },
        { label: "Match closers", text: "When you see `)`, `]`, or `}`, pop the top item and check whether it matches the expected opener." },
        { label: "Must end empty", text: "At the end of the string, return `len(stack) == 0` so no unclosed brackets remain." }
      ],
      tip: "Check `if not stack:` before popping — a closing bracket with nothing open is immediately invalid."
    },
    "dsa-binary-search": {
      summary: "**Binary search** finds an item in a sorted list by checking the middle and throwing away half the list on every step.",
      steps: [
        { label: "Track two edges", text: "Start with `lo = 0` and `hi = len(nums) - 1`, looping `while lo <= hi:`." },
        { label: "Inspect the midpoint", text: "Compute `mid = (lo + hi) // 2` and compare `nums[mid]` with `target`." },
        { label: "Shrink the range", text: "If `nums[mid] < target`, move `lo = mid + 1`; otherwise move `hi = mid - 1`." }
      ],
      tip: "Always move past `mid` (`mid + 1` or `mid - 1`) so the search window shrinks every turn and never loops forever."
    },
    "dsa-merge-sorted": {
      summary: "With two already-sorted lists, you can zip them together in a single pass using **two index pointers** (`i` and `j`).",
      steps: [
        { label: "Compare the front items", text: "While both lists have items left, append whichever of `a[i]` or `b[j]` is smaller and advance that pointer." },
        { label: "Attach leftovers", text: "Once one list runs out, append whatever remains in the other list with `.extend(...)`." }
      ],
      tip: "Because each list is already sorted, the smallest remaining value is ALWAYS at either `a[i]` or `b[j]`."
    },
    "dsa-sliding-window": {
      summary: "A **sliding window** avoids re-adding the same numbers over and over: slide one step right by adding the new number and subtracting the one that left.",
      steps: [
        { label: "Build the first window", text: "Sum the first `k` numbers to initialize `win` and `best`." },
        { label: "Slide one step at a time", text: "For each index `i` from `k` onward: `win += nums[i] - nums[i - k]`." },
        { label: "Keep the maximum", text: "Update `best = max(best, win)` after each slide." }
      ],
      tip: "Guard against lists shorter than `k` (or `k <= 0`) at the top of the function."
    },
    "dsa-climbing-stairs": {
      summary: "**Dynamic programming** builds big answers out of small ones you already computed — no slow repeated recursion needed.",
      steps: [
        { label: "Spot the pattern", text: "To reach step `n`, your last move came from either step `n - 1` or step `n - 2`, so `ways(n) = ways(n - 1) + ways(n - 2)`." },
        { label: "Keep just two variables", text: "Track `a, b = 1, 2` for steps 1 and 2, then update `a, b = b, a + b` up to `n`." }
      ],
      tip: "Handle small inputs `n <= 2` directly by returning `n` (1 way for 1 step, 2 ways for 2 steps)."
    },
    "js-functional-pipeline": {
      summary: "In JavaScript, arrays have built-in methods — `.filter()`, `.map()`, and `.reduce()` — that let you chain data transformations cleanly.",
      steps: [
        { label: "Filter items", text: "`scores.filter(s => s >= 75)` keeps only passing scores." },
        { label: "Transform each item", text: "`.map(s => Math.min(100, s + 5))` adds 5 to each score without going over 100." },
        { label: "Combine into one number", text: "`.reduce((acc, v) => acc + v, 0)` adds all values together so you can divide and `Math.round(...)`." }
      ],
      tip: "Check `if (curved.length === 0) return 0;` before dividing so you never divide by zero (`NaN`)."
    },
    "js-closure-counter": {
      summary: "A **closure** happens when an inner function remembers variables from the outer function where it was created — keeping state private without global variables.",
      steps: [
        { label: "Private local variable", text: "`let count = start;` lives inside `makeCounter` and cannot be touched directly from outside." },
        { label: "Return small helper functions", text: "`inc: () => ++count`, `dec: () => --count`, and `value: () => count` all share that private `count`." }
      ],
      tip: "`++count` increments first and returns the updated value (whereas `count++` returns the old value first)."
    },
    "js-group-by": {
      summary: "Grouping splits a flat list of objects into labeled buckets — like sorting people into teams by their `role`.",
      steps: [
        { label: "Start with an empty object", text: "Use `{}` (or `.reduce(..., {})`) to hold each bucket." },
        { label: "Create each bucket on demand", text: "Look up `const k = item[key]`. If `!acc[k]`, initialize `acc[k] = []`." },
        { label: "Push into the bucket", text: "Run `acc[k].push(item)` and return `acc`." }
      ],
      tip: "Using bracket notation `item[key]` looks up the property whose name is stored inside the variable `key`."
    },
    "js-chunk-flatten": {
      summary: "Chunking splits a long array into smaller fixed-size pages using `.slice(start, end)` inside a loop that steps by `size`.",
      steps: [
        { label: "Validate size first", text: "If `size <= 0`, return `[]` immediately so the loop cannot run forever." },
        { label: "Step by chunk size", text: "Loop `for (let i = 0; i < arr.length; i += size)`." },
        { label: "Slice each batch", text: "Push `arr.slice(i, i + size)` — `.slice` safely handles a smaller last chunk!" }
      ],
      tip: "Notice `i += size` jumps straight to the start of the next batch on every iteration."
    },
    "js-rate-guard": {
      summary: "A **rate limiter** keeps an API safe by recording recent timestamps per user and rejecting requests once too many arrive inside a time window.",
      steps: [
        { label: "Prune old timestamps", text: "Keep only timestamps where `nowMs - ts < windowMs`." },
        { label: "Check the limit", text: "If `active.length >= maxReqs`, save the pruned list and return `429`." },
        { label: "Record allowed requests", text: "Otherwise push `nowMs`, store `logs[userId] = active`, and return `200`." }
      ],
      tip: "Each `userId` gets its own separate array inside `logs`, so one busy user never blocks another."
    },
    "js-async-order": {
      summary: "JavaScript's **Event Loop** runs code in a strict priority order: synchronous code first, then Promises (microtasks), and finally timers like `setTimeout` (macrotasks).",
      steps: [
        { label: "Three priority lanes", text: "Create three empty arrays: `sync`, `micro`, and `macro`." },
        { label: "Sort tasks by kind", text: "Loop through `tasks` and push `t.label` into its matching lane while keeping arrival order." },
        { label: "Combine in priority order", text: "Return `[...sync, ...micro, ...macro]`." }
      ],
      tip: "Microtasks (`.then` / `await`) ALWAYS drain completely before the next macrotask (`setTimeout`) begins."
    },
    "sql-top-heroes": {
      summary: "**SQL** asks questions about rows in a database table. `SELECT` picks columns, `WHERE` filters rows, `ORDER BY` sorts, and `LIMIT` caps how many rows come back.",
      steps: [
        { label: "Pick columns and table", text: "`SELECT name, role, xp FROM heroes` chooses the 3 columns you want." },
        { label: "Filter active rows", text: "`WHERE active = 1` keeps only active records." },
        { label: "Sort highest first & cap", text: "`ORDER BY xp DESC LIMIT 3` puts the largest XP on top and returns 3 rows." }
      ],
      tip: "SQL clauses always go in this order: `SELECT` → `FROM` → `WHERE` → `ORDER BY` → `LIMIT`."
    },
    "sql-guild-join": {
      summary: "Databases avoid repeating information by splitting related data into separate tables. **`INNER JOIN`** reconnects matching rows using a shared ID.",
      steps: [
        { label: "Give tables short aliases", text: "`FROM heroes h INNER JOIN guilds g` lets you write `h.name` and `g.name` clearly." },
        { label: "Match on the shared key", text: "`ON h.guild_id = g.id` links each hero to their guild row." },
        { label: "Rename overlapping columns", text: "Use `AS hero_name` and `AS guild_name` so both name columns are unambiguous." }
      ],
      tip: "`INNER JOIN` automatically leaves out rows that have no matching partner in the other table."
    },
    "sql-guild-leaderboard": {
      summary: "**`GROUP BY`** collapses many rows that share a label into one summary row so you can total them with `SUM()`, `COUNT()`, or `AVG()`.",
      steps: [
        { label: "Join guilds and heroes", text: "Connect `guilds g` and `heroes h` on `h.guild_id = g.id`." },
        { label: "Group by guild name", text: "`GROUP BY g.name` puts all heroes from the same guild into one bucket." },
        { label: "Sum and rank", text: "Compute `SUM(h.xp) AS total_xp` and sort with `ORDER BY total_xp DESC`." }
      ],
      tip: "Any non-aggregated column in `SELECT` should also appear in your `GROUP BY` clause."
    },
    "sql-lonely-heroes": {
      summary: "A **`LEFT JOIN`** keeps every row from the left table even when there is no match on the right — leaving the right columns as `NULL`.",
      steps: [
        { label: "Start from the table you want to keep", text: "`FROM guilds g LEFT JOIN heroes h ON h.guild_id = g.id` keeps ALL guilds." },
        { label: "Find unmatched rows", text: "Add `WHERE h.id IS NULL` to isolate only the guilds with zero heroes." }
      ],
      tip: "Always check for missing values with `IS NULL` (never `= NULL`)."
    },
    "sql-high-performers": {
      summary: "`WHERE` filters individual rows BEFORE grouping; **`HAVING`** filters grouped totals AFTER `GROUP BY` finishes.",
      steps: [
        { label: "Filter rows first with WHERE", text: "`WHERE h.active = 1` keeps only active heroes before summing." },
        { label: "Group & total", text: "`GROUP BY g.name` with `SUM(h.xp) AS active_xp`." },
        { label: "Filter groups with HAVING", text: "`HAVING SUM(h.xp) > 10000` keeps only groups above 10,000 XP." }
      ],
      tip: "Memory hook: **W**HERE filters rows first; **H**AVING filters aggregated groups afterward."
    },
    "sql-active-guilds-boss": {
      summary: "You can chain multiple `JOIN` clauses to combine information from 3 or more tables into a single clean report.",
      steps: [
        { label: "Link heroes → submissions → quests", text: "Join `submissions s` on `s.hero_id = h.id`, then join `quests q` on `s.quest_id = q.id`." },
        { label: "Filter passed records", text: "`WHERE s.status = 'PASSED'` keeps only completed submissions." },
        { label: "Aggregate per hero", text: "`GROUP BY h.name` and sum `q.xp_reward`." }
      ],
      tip: "Build multi-table queries one join at a time — click **▶ Run** anytime to preview your table!"
    },
    "git-repo-rescue": {
      summary: "**Git** saves snapshots (commits) of your project so you never lose work. Every save takes 3 simple steps: initialize, stage, and commit.",
      steps: [
        { label: "1. Initialize Git", text: "`git init` turns the current folder into a Git repository." },
        { label: "2. Stage your files", text: "`git add .` marks all files in the folder as ready for the next snapshot." },
        { label: "3. Save a commit", text: "`git commit -m \"Initial commit\"` permanently records the snapshot with a clear message." }
      ],
      tip: "Think of `git add` as putting items into a shipping box, and `git commit` as sealing and labeling the box."
    },
    "git-branch-merge": {
      summary: "**Branches** let you build new features in a safe side workspace without breaking your stable `main` code.",
      steps: [
        { label: "Create & switch to a branch", text: "`git checkout -b feat-auth` makes a new branch and moves you onto it." },
        { label: "Create & commit your work", text: "Create `auth.py` with `touch auth.py`, stage it with `git add auth.py`, and commit." },
        { label: "Switch back & merge", text: "Run `git checkout main` followed by `git merge feat-auth` to bring your feature in." }
      ],
      tip: "Always check which branch you are on before committing or merging."
    },
    "cli-log-sleuth": {
      summary: "The **command line** lets you navigate folders, search large log files instantly, and organize files with short typed commands.",
      steps: [
        { label: "Move into a folder", text: "`cd logs` changes your current working directory into `logs`." },
        { label: "Search text with grep", text: "`grep ERROR server.log` prints every line containing the word `ERROR`." },
        { label: "Create a folder", text: "`mkdir triage` makes a brand-new directory named `triage`." }
      ],
      tip: "You can run one command per line in this terminal script editor and see all output in the **Output** tab."
    },
    "web-status-card": {
      summary: "**Semantic HTML** uses meaningful tags (`<article>`, `<header>`, `<h2>`, `<p>`) instead of generic `<div>` blocks so browsers and screen readers understand your page.",
      steps: [
        { label: "Wrap self-contained content", text: "Use `<article class=\"card\">...</article>` for a standalone card." },
        { label: "Add a semantic header", text: "Place your title inside `<header><h2>...</h2></header>`." },
        { label: "Preview live", text: "Click **▶ Run** and open the **Live Preview** tab to see your HTML rendered right away!" }
      ],
      tip: "Every opening tag like `<article>` needs a matching closing tag `</article>`."
    },
    "web-flex-navbar": {
      summary: "**CSS Flexbox** aligns items neatly in a horizontal row (or vertical column) with just 3 properties.",
      steps: [
        { label: "Turn on Flexbox", text: "`display: flex;` places direct children side by side in a row." },
        { label: "Push ends apart", text: "`justify-content: space-between;` puts the brand on the left and links on the right." },
        { label: "Center vertically", text: "`align-items: center;` lines everything up cleanly along the middle." }
      ],
      tip: "Add `gap: 16px;` on `.links` (also `display: flex;`) to give your nav links clean breathing room."
    },
    "web-bento-grid": {
      summary: "**CSS Grid** lets you divide a container into equal-width columns and rows with clean spacing in just 3 lines of CSS.",
      steps: [
        { label: "Enable Grid layout", text: "Set `display: grid;` on `.bento`." },
        { label: "Define equal columns", text: "`grid-template-columns: repeat(3, 1fr);` creates 3 equal-width tracks." },
        { label: "Add spacing & cards", text: "Set `gap: 12px;` and place at least 3 `<div class=\"tile\">` cards inside." }
      ],
      tip: "`1fr` stands for 'one fraction of the available space', so `repeat(3, 1fr)` always splits the row cleanly into thirds."
    }
  };

  function getTutorial(quest) {
    if (!quest) return { summary: "", steps: [], tip: "" };
    if (quest.tutorial) return quest.tutorial;
    if (QUEST_TUTORIALS[quest.id]) return QUEST_TUTORIALS[quest.id];
    return {
      summary: quest.story || quest.objective || "",
      steps: (quest.requirements || []).slice(0, 3).map((r, i) => ({ label: `Step ${i + 1}`, text: r })),
      tip: (quest.hints && quest.hints[0]) || "Read the example carefully, then press Run to test your idea."
    };
  }

  // ==================== UNIVERSAL LESSON RUNNER ====================
  function evaluateQuest(quest, code) {
    if (!ENGINE) return { ok: false, passed: 0, total: quest.tests.length, results: [], out: ["Engine missing"] };
    if (quest.lang === "python") {
      return ENGINE.runPythonTests(code, quest.tests);
    }
    if (quest.lang === "javascript") {
      return ENGINE.runJavaScriptTests(code, quest.tests, quest.exportNames || []);
    }
    if (quest.lang === "sql") {
      return ENGINE.runSqlTests(code, quest.tests);
    }
    if (quest.lang === "shell") {
      const sh = ENGINE.runShellScript(code, quest.shellInit || {});
      const results = [];
      let passed = 0;
      for (const t of quest.tests) {
        const chk = t.verify(sh);
        if (chk.ok) passed++;
        results.push({ name: t.name, input: "Terminal state", expected: t.expectedDesc, actual: chk.actual, ok: Boolean(chk.ok) });
      }
      return { ok: passed === quest.tests.length, passed, total: quest.tests.length, out: sh.out, shellState: sh.state, results };
    }
    if (quest.lang === "html") {
      const results = [];
      let passed = 0;
      for (const t of quest.tests) {
        const chk = t.verify(code);
        if (chk.ok) passed++;
        results.push({ name: t.name, input: "HTML/CSS check", expected: t.expectedDesc, actual: chk.actual, ok: Boolean(chk.ok) });
      }
      return { ok: passed === quest.tests.length, passed, total: quest.tests.length, htmlSrc: code, results };
    }
    return { ok: false, passed: 0, total: 0, results: [] };
  }

  // ==================== CLEAN STUDIO LIBRARY & TUTORIAL-FIRST WORKSPACE ====================
  let uiState = {
    briefTab: "learn", // learn | practice
    dockTab: "tests", // tests | console | trace
    hintsShown: 0,
    showSolution: false,
    fontSize: 13.5,
    traceIdx: 0,
    lastRunByQuest: {},
    questSearch: ""
  };

  function openWorkspace(questId) {
    uiState.briefTab = "learn";
    uiState.hintsShown = 0;
    uiState.showSolution = false;
    uiState.dockTab = "tests";
    if (questId) uiState._pendingQuestId = questId;
  }

  function getGreetingText(solvedCount) {
    if (solvedCount === 0) return "Welcome to Code Studio";
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }

  function fmtCopy(text) {
    let html = root.MATHLINGO_LATEX ? root.MATHLINGO_LATEX.formatMath(text || "") : esc(text || "");
    html = html.replace(/(<code\b[^>]*>[\s\S]*?<\/code>|<[^>]+>)|\*\*([^*\n]+)\*\*|\*([^\s*][^*\n]*?[^\s*]|[^\s*])\*/g, (m, tag, bold, ital) => {
      if (tag) return tag;
      if (bold) return `<strong>${bold}</strong>`;
      if (ital) return `<em>${ital}</em>`;
      return m;
    });
    return html;
  }

  function langDisplayName(lang) {
    if (lang === "python") return "Python";
    if (lang === "javascript") return "JavaScript";
    if (lang === "sql") return "SQL";
    if (lang === "shell") return "Git & CLI";
    if (lang === "html") return "HTML & CSS";
    return lang || "Code";
  }

  function renderCodeForgeView(container, state, DATA, hooks) {
    if (!state.forgeSolved || typeof state.forgeSolved !== "object") state.forgeSolved = {};
    if (!state.forgeCode || typeof state.forgeCode !== "object") state.forgeCode = {};
    if (!state.forgeTrack) state.forgeTrack = "zero";
    if (!state.forgeView) state.forgeView = "library";

    if (uiState._pendingQuestId) {
      state.forgeActiveQuestId = uiState._pendingQuestId;
      state.forgeView = "workspace";
      delete uiState._pendingQuestId;
    }

    const solvedIds = Object.keys(state.forgeSolved);
    const solvedCount = solvedIds.length;
    const pctTotal = Math.round((solvedCount / QUESTS.length) * 100);

    // Next recommended lesson (always starts at #01 Print Your First Message for a fresh learner)
    const recommendedQuest = QUESTS.find((q) => !state.forgeSolved[q.id]) || QUESTS[0];
    const recTutorial = getTutorial(recommendedQuest);

    // -------------------- VIEW 1: CLEAN STUDIO LIBRARY --------------------
    if (state.forgeView !== "workspace") {
      const activeTrackObj = TRACKS.find((t) => t.id === state.forgeTrack) || TRACKS[0];
      const needle = (uiState.questSearch || "").trim().toLowerCase();
      const filteredQuests = QUESTS.filter((q) => {
        if (needle) {
          const tut = getTutorial(q);
          return (
            q.title.toLowerCase().includes(needle) ||
            q.story.toLowerCase().includes(needle) ||
            tut.summary.toLowerCase().includes(needle) ||
            langDisplayName(q.lang).toLowerCase().includes(needle) ||
            q.track.toLowerCase().includes(needle)
          );
        }
        return state.forgeTrack === "all" || q.track === state.forgeTrack;
      });

      const isZeroStart = recommendedQuest.track === "zero";

      container.innerHTML = `
        <div class="ml-studio-home">
          <header class="ml-studio-welcome">
            <div class="ml-studio-welcome-copy">
              <div class="ml-bento-eyebrow">Code Studio</div>
              <h2 class="ml-studio-greeting">${esc(getGreetingText(solvedCount))}</h2>
              <p class="ml-studio-intro">
                Learn coding step by step — starting from zero. Every lesson opens with a plain-English explanation first, then lets you practice in the live editor.
              </p>
            </div>
            <div class="ml-studio-progress-pill" aria-label="Coding progress">
              <div class="ml-studio-progress-row">
                <span>Completed</span>
                <strong>${solvedCount} / ${QUESTS.length}</strong>
              </div>
              <div class="ml-progress-track">
                <div class="ml-progress-fill" style="width:${Math.max(solvedCount > 0 ? 4 : 0, pctTotal)}%"></div>
              </div>
            </div>
          </header>

          <section class="ml-studio-rec-card">
            <div class="ml-studio-rec-body">
              <div class="ml-studio-rec-kicker">
                <span class="ml-forge-diff-badge ${getDiffInfo(recommendedQuest.difficulty).cls}">${isZeroStart ? "Start from Zero" : esc(getDiffInfo(recommendedQuest.difficulty).label)}</span>
                <span class="ml-studio-meta-dot">Lesson ${String(recommendedQuest.order).padStart(2, "0")} · ${esc(langDisplayName(recommendedQuest.lang))} · Tutorial first</span>
              </div>
              <h3 class="ml-studio-rec-title">${esc(recommendedQuest.title)}</h3>
              <p class="ml-studio-rec-desc">${fmtCopy(recTutorial.summary)}</p>
            </div>
            <div class="ml-studio-rec-cta">
              <button type="button" class="ml-btn-primary" id="ml-studio-start-rec">
                <span>${solvedCount === 0 ? "Start Lesson 1 (Tutorial First)" : "Continue Lesson"} →</span>
              </button>
            </div>
          </section>

          <section class="ml-studio-library-section">
            <div class="ml-studio-lib-top">
              <div>
                <h3 class="ml-studio-sec-title">Lesson Library</h3>
                <p class="ml-studio-sec-sub">${needle ? `Showing ${filteredQuests.length} match${filteredQuests.length === 1 ? "" : "es"} across all tracks` : esc(activeTrackObj.desc)}</p>
              </div>
              <div class="ml-studio-lib-search">
                <input type="search" id="ml-studio-search" class="ml-studio-search-input" placeholder="Search coding lessons..." value="${esc(uiState.questSearch)}" />
              </div>
            </div>

            <div class="ml-studio-tracks" role="tablist" aria-label="Coding tracks">
              ${TRACKS.map((tr) => {
                const cnt = tr.id === "all" ? QUESTS.length : QUESTS.filter((q) => q.track === tr.id).length;
                const done = tr.id === "all" ? solvedCount : QUESTS.filter((q) => q.track === tr.id && state.forgeSolved[q.id]).length;
                return `
                  <button type="button" class="ml-forge-track-pill ${!needle && state.forgeTrack === tr.id ? "active" : ""}" data-forge-track="${tr.id}">
                    <span>${esc(tr.label)}</span>
                    <span class="ml-forge-track-cnt">${done}/${cnt}</span>
                  </button>
                `;
              }).join("")}
            </div>

            ${filteredQuests.length === 0 ? `
              <div class="ml-studio-empty">
                No lessons matched "<strong>${esc(uiState.questSearch)}</strong>". Try clearing the search or choosing <strong>Start from Zero</strong>.
              </div>
            ` : `
              <div class="ml-studio-card-grid">
                ${filteredQuests.map((q) => {
                  const done = Boolean(state.forgeSolved[q.id]);
                  const diff = getDiffInfo(q.difficulty);
                  const tut = getTutorial(q);
                  const isRec = q.id === recommendedQuest.id;
                  return `
                    <button type="button" class="ml-studio-lesson-card ${done ? "is-done" : ""} ${isRec ? "is-rec" : ""}" data-open-quest="${q.id}">
                      <div class="ml-studio-card-top">
                        <span class="ml-studio-card-num">${done ? "✓" : String(q.order).padStart(2, "0")}</span>
                        <span class="ml-studio-card-lang">${esc(langDisplayName(q.lang))}</span>
                        <span class="ml-forge-diff-badge ${diff.cls}">${esc(diff.label)}</span>
                      </div>
                      <h4 class="ml-studio-card-title">${esc(q.title)}</h4>
                      <p class="ml-studio-card-desc">${fmtCopy(tut.summary)}</p>
                      <div class="ml-studio-card-foot">
                        <span>${done ? "Completed · Review" : (isRec && solvedCount === 0 ? "Recommended first" : "Tutorial + Practice")}</span>
                        <span class="ml-studio-card-arrow">→</span>
                      </div>
                    </button>
                  `;
                }).join("")}
              </div>
            `}
          </section>
        </div>
      `;

      const startRecBtn = document.getElementById("ml-studio-start-rec");
      if (startRecBtn) {
        startRecBtn.addEventListener("click", () => {
          state.forgeActiveQuestId = recommendedQuest.id;
          state.forgeView = "workspace";
          uiState.briefTab = "learn";
          uiState.hintsShown = 0;
          uiState.showSolution = false;
          uiState.dockTab = "tests";
          if (hooks && hooks.onSave) hooks.onSave();
          renderCodeForgeView(container, state, DATA, hooks);
          if (typeof window !== "undefined") window.scrollTo(0, 0);
        });
      }

      container.querySelectorAll("[data-forge-track]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.forgeTrack = btn.dataset.forgeTrack;
          uiState.questSearch = "";
          if (hooks && hooks.onSave) hooks.onSave();
          renderCodeForgeView(container, state, DATA, hooks);
        });
      });

      container.querySelectorAll("[data-open-quest]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.forgeActiveQuestId = btn.dataset.openQuest;
          state.forgeView = "workspace";
          uiState.briefTab = "learn";
          uiState.hintsShown = 0;
          uiState.showSolution = false;
          uiState.dockTab = "tests";
          if (hooks && hooks.onSave) hooks.onSave();
          renderCodeForgeView(container, state, DATA, hooks);
          if (typeof window !== "undefined") window.scrollTo(0, 0);
        });
      });

      const searchInp = document.getElementById("ml-studio-search");
      if (searchInp) {
        searchInp.addEventListener("input", () => {
          const pos = searchInp.selectionStart;
          uiState.questSearch = searchInp.value;
          renderCodeForgeView(container, state, DATA, hooks);
          const nextInp = document.getElementById("ml-studio-search");
          if (nextInp) {
            nextInp.focus();
            try { nextInp.setSelectionRange(pos, pos); } catch (_e) {}
          }
        });
      }
      return;
    }

    // -------------------- VIEW 2: FOCUSED TUTORIAL-FIRST WORKSPACE --------------------
    let activeQuest = QUESTS.find((q) => q.id === state.forgeActiveQuestId) || QUESTS[0];
    state.forgeActiveQuestId = activeQuest.id;

    const currentCode = typeof state.forgeCode[activeQuest.id] === "string"
      ? state.forgeCode[activeQuest.id]
      : activeQuest.starterCode;
    const isSolved = Boolean(state.forgeSolved[activeQuest.id]);
    const lastRun = uiState.lastRunByQuest[activeQuest.id] || null;
    const qIdx = QUESTS.findIndex((q) => q.id === activeQuest.id);
    const prevQuest = qIdx > 0 ? QUESTS[qIdx - 1] : null;
    const nextQuest = qIdx < QUESTS.length - 1 ? QUESTS[qIdx + 1] : null;
    const linkedNode = DATA && DATA.NODES ? DATA.NODES.find((n) => n.id === activeQuest.linkedNodeId) : null;
    const tutorial = getTutorial(activeQuest);
    const diff = getDiffInfo(activeQuest.difficulty);

    const lineCount = Math.max(8, currentCode.split("\n").length);
    const lineNumbersHtml = Array.from({ length: lineCount }, (_, i) => `<span>${i + 1}</span>`).join("");
    const highlightedCode = ENGINE ? ENGINE.highlightCode(currentCode, activeQuest.lang) : esc(currentCode);

    const patternExt = activeQuest.lang === "python" ? "py" : activeQuest.lang === "javascript" ? "js" : activeQuest.lang === "sql" ? "sql" : activeQuest.lang === "shell" ? "sh" : "html";

    function buildDockHtml() {
      if (uiState.dockTab === "tests") {
        if (!lastRun) {
          return `
            <div class="ml-forge-empty-dock">
              <div class="ml-forge-empty-ico">✓</div>
              <div>
                <strong>Ready to check your code (${activeQuest.tests.length} simple checks)</strong>
                <div class="ml-viz-sub">Click <strong>▶ Run</strong> to see output, or <strong>✓ Check Answer</strong> when ready (shortcut: <kbd>Ctrl</kbd>+<kbd>Enter</kbd>).</div>
              </div>
            </div>
          `;
        }
        const pct = Math.round((lastRun.passed / Math.max(1, lastRun.total)) * 100);
        return `
          <div class="ml-forge-test-summary ${lastRun.ok ? "pass" : "fail"}">
            <div class="ml-forge-test-summary-left">
              <strong>${lastRun.ok ? "Nicely done — all checks passed!" : `${lastRun.passed} of ${lastRun.total} checks passed`}</strong>
              <span>${lastRun.ok ? `+${activeQuest.xp} XP · +${activeQuest.gems} gems` : "Compare Expected vs Actual below and try again."}</span>
            </div>
            <div class="ml-forge-test-summary-right">
              <div class="ml-forge-mini-bar"><div style="width:${pct}%"></div></div>
              ${lastRun.ok && nextQuest ? `<button type="button" class="ml-btn-primary" id="ml-forge-next-quest" style="padding:6px 12px; font-size:12px;">Next Lesson →</button>` : ""}
            </div>
          </div>
          <div class="ml-forge-test-list">
            ${lastRun.results.map((r, i) => `
              <div class="ml-forge-test-card ${r.ok ? "pass" : "fail"}">
                <div class="ml-forge-test-head">
                  <span class="ml-forge-test-status">${r.ok ? "PASS" : "CHECK"}</span>
                  <strong>#${i + 1} ${esc(r.name)}</strong>
                  <code class="ml-forge-test-input">${esc(r.input)}</code>
                </div>
                <div class="ml-forge-diff-grid">
                  <div class="ml-forge-diff-cell"><span>Expected</span><code>${esc(r.expected)}</code></div>
                  <div class="ml-forge-diff-cell ${r.ok ? "ok" : "bad"}"><span>Your Output</span><code>${esc(r.actual)}</code></div>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      }

      if (uiState.dockTab === "console") {
        if (!lastRun) {
          return `<div class="ml-forge-console-pre"><span class="ml-forge-muted">// Click ▶ Run to see your program output here...</span></div>`;
        }
        if (activeQuest.lang === "html") {
          return `
            <div class="ml-forge-preview-wrap">
              <div class="ml-forge-preview-bar"><span>Live Preview (${esc(activeQuest.fileName)})</span><span>Sandboxed</span></div>
              <iframe class="ml-forge-iframe" sandbox="allow-scripts" srcdoc="${esc(lastRun.htmlSrc || currentCode)}"></iframe>
            </div>
          `;
        }
        if (activeQuest.lang === "sql") {
          const sq = lastRun.sqlResult;
          if (!sq || !sq.ok) {
            return `<div class="ml-forge-console-pre err">SQL Error: ${esc((sq && sq.error) || lastRun.error || "Unknown error")}</div>`;
          }
          return `
            <div class="ml-forge-sql-plan">
              <span class="ml-forge-plan-lbl">Query Steps:</span>
              ${(sq.executionPlan || []).map((st, idx) => `
                ${idx > 0 ? `<span class="ml-forge-plan-arrow">→</span>` : ""}
                <span class="ml-forge-plan-chip"><strong>${esc(st.step)}</strong> <em>(${st.rows} rows)</em></span>
              `).join("")}
            </div>
            <div class="ml-forge-sql-table-wrap">
              <table class="ml-forge-sql-table">
                <thead><tr>${sq.columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
                <tbody>
                  ${sq.rows.length ? sq.rows.map((row) => `<tr>${sq.columns.map((c) => `<td>${row[c] === null ? `<span class="ml-null-pill">NULL</span>` : esc(row[c])}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="${Math.max(1, sq.columns.length)}" style="text-align:center; color:var(--ml-ink-muted);">(0 rows returned)</td></tr>`}
                </tbody>
              </table>
            </div>
          `;
        }
        const lines = lastRun.out || [];
        const errBlock = lastRun.error ? `<div class="ml-forge-console-err">Note: ${esc(lastRun.error)}</div>` : "";
        return `
          <div class="ml-forge-console-pre">
            ${lines.length ? lines.map((l) => `<div>${esc(l)}</div>`).join("") : `<span class="ml-forge-muted">(no printed output yet — add print() or console.log() to inspect values)</span>`}
            ${errBlock}
          </div>
        `;
      }

      // Step-by-Step Trace Tab (Python)
      const trace = (lastRun && lastRun.trace) || [];
      if (activeQuest.lang !== "python") {
        return `<div class="ml-forge-empty-dock"><div class="ml-forge-empty-ico">↳</div><div><strong>Step-by-Step Variable Trace</strong><div class="ml-viz-sub">Available on all Python lessons — run a Python lesson to watch variables update line by line.</div></div></div>`;
      }
      if (!trace.length) {
        return `<div class="ml-forge-empty-dock"><div class="ml-forge-empty-ico">↳</div><div><strong>No steps recorded yet</strong><div class="ml-viz-sub">Click <strong>▶ Run</strong> or <strong>✓ Check Answer</strong> to step through your code line by line.</div></div></div>`;
      }
      const idx = Math.max(0, Math.min(trace.length - 1, uiState.traceIdx));
      const frame = trace[idx];
      const varEntries = Object.entries(frame.vars || {});
      return `
        <div class="ml-forge-trace-bar">
          <button type="button" class="ml-btn-mini" id="ml-tr-prev" ${idx === 0 ? "disabled" : ""}>← Prev</button>
          <input type="range" id="ml-tr-slider" min="0" max="${Math.max(0, trace.length - 1)}" value="${idx}" style="flex:1;" />
          <button type="button" class="ml-btn-mini" id="ml-tr-next" ${idx >= trace.length - 1 ? "disabled" : ""}>Next →</button>
          <span class="ml-forge-trace-step">Step ${idx + 1} / ${trace.length} · Line ${frame.line}</span>
        </div>
        <div class="ml-forge-trace-grid">
          <div class="ml-forge-trace-box">
            <div class="ml-forge-trace-lbl">Line #${frame.line}</div>
            <div class="ml-forge-trace-code"><code>${ENGINE ? ENGINE.highlightCode(frame.code, "python") : esc(frame.code)}</code></div>
            <div class="ml-forge-trace-lbl" style="margin-top:10px;">Active Calls (${frame.stack.length})</div>
            <div class="ml-forge-stack-list">
              ${frame.stack.slice().reverse().map((sf, si) => `<div class="ml-forge-stack-frame ${si === 0 ? "top" : ""}">${esc(sf)}</div>`).join("")}
            </div>
          </div>
          <div class="ml-forge-trace-box">
            <div class="ml-forge-trace-lbl">Variables (${varEntries.length})</div>
            <div class="ml-forge-vars-grid">
              ${varEntries.length ? varEntries.map(([k, v]) => `
                <div class="ml-forge-var-pill">
                  <span class="ml-var-k">${esc(k)}</span>
                  <span class="ml-var-v">${esc(v)}</span>
                </div>
              `).join("") : `<div class="ml-viz-sub">No variables assigned yet on this step.</div>`}
            </div>
          </div>
        </div>
      `;
    }

    const sqlSchemaHtml = activeQuest.lang === "sql" ? `
      <div class="ml-forge-section">
        <div class="ml-forge-sec-lbl">Database Tables</div>
        <div class="ml-forge-schema-grid">
          <div class="ml-forge-schema-box"><strong>heroes</strong><span>id, name, role, level, xp, guild_id, active</span></div>
          <div class="ml-forge-schema-box"><strong>guilds</strong><span>id, name, region, founded_year</span></div>
          <div class="ml-forge-schema-box"><strong>quests</strong><span>id, title, difficulty, xp_reward, category</span></div>
          <div class="ml-forge-schema-box"><strong>submissions</strong><span>id, hero_id, quest_id, status, score</span></div>
        </div>
      </div>
    ` : "";

    const leftBodyHtml = uiState.briefTab === "learn" ? `
      <div class="ml-studio-tut-body">
        <p class="ml-studio-tut-lead">${fmtCopy(tutorial.summary)}</p>

        <div class="ml-studio-steps-list">
          ${(tutorial.steps || []).map((st, i) => `
            <div class="ml-studio-step-item">
              <span class="ml-studio-step-num">${i + 1}</span>
              <div>
                <strong>${esc(st.label)}</strong>
                <p>${fmtCopy(st.text)}</p>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="ml-forge-section">
          <div class="ml-forge-sec-lbl">Example</div>
          ${ENGINE ? ENGINE.renderCodeCardHtml(activeQuest.conceptCode, activeQuest.lang, { fileName: "example." + patternExt }) : `<pre><code>${esc(activeQuest.conceptCode)}</code></pre>`}
        </div>

        ${sqlSchemaHtml}

        ${tutorial.tip ? `
          <div class="ml-studio-tip-box">
            <strong>Good to know:</strong> ${fmtCopy(tutorial.tip)}
          </div>
        ` : ""}

        <div class="ml-studio-tut-foot">
          <button type="button" class="ml-btn-primary" id="ml-studio-go-practice">Got it — Go to Practice →</button>
          ${linkedNode ? `<button type="button" class="ml-btn-mini" id="ml-forge-open-lesson">Full Visual Lesson</button>` : ""}
        </div>
      </div>
    ` : `
      <div class="ml-studio-practice-body">
        <div class="ml-forge-section">
          <div class="ml-forge-sec-lbl">Your Goal</div>
          <div class="ml-forge-obj-box">${fmtCopy(activeQuest.objective)}</div>
          <ul class="ml-forge-req-list">
            ${activeQuest.requirements.map((req) => `<li>${fmtCopy(req)}</li>`).join("")}
          </ul>
        </div>

        <div class="ml-forge-section">
          <div class="ml-forge-sec-lbl">Examples</div>
          <div class="ml-forge-examples">
            ${activeQuest.examples.map((ex) => `
              <div class="ml-forge-ex-card">
                <div class="ml-forge-ex-row"><span>Input</span><code>${esc(ex.input)}</code></div>
                <div class="ml-forge-ex-row"><span>Expected</span><code class="out">${esc(ex.output)}</code></div>
                ${ex.note ? `<div class="ml-forge-ex-note">${esc(ex.note)}</div>` : ""}
              </div>
            `).join("")}
          </div>
        </div>

        ${sqlSchemaHtml}

        <div class="ml-studio-help-box">
          <div class="ml-studio-help-row">
            <span class="ml-studio-help-lbl">Need help?</span>
            <div class="ml-studio-help-btns">
              <button type="button" class="ml-btn-mini" id="ml-forge-hint-btn" ${uiState.hintsShown >= activeQuest.hints.length ? "disabled" : ""}>
                Hint (${uiState.hintsShown}/${activeQuest.hints.length})
              </button>
              <button type="button" class="ml-btn-mini" id="ml-forge-sol-toggle">
                ${uiState.showSolution ? "Hide Solution" : "Show Solution"}
              </button>
              <button type="button" class="ml-btn-mini" id="ml-studio-back-learn">Re-read Tutorial</button>
            </div>
          </div>
          ${uiState.hintsShown > 0 ? `
            <div class="ml-forge-hints-list">
              ${activeQuest.hints.slice(0, uiState.hintsShown).map((h, i) => `
                <div class="ml-forge-hint-item">
                  <strong>Hint ${i + 1}:</strong> ${fmtCopy(h)}
                </div>
              `).join("")}
            </div>
          ` : ""}
          ${uiState.showSolution ? `
            <div style="margin-top:10px;">
              ${ENGINE ? ENGINE.renderCodeCardHtml(activeQuest.solutionCode, activeQuest.lang, { fileName: "solution_" + activeQuest.fileName }) : ""}
              <button type="button" class="ml-btn-mini" id="ml-forge-load-sol" style="margin-top:8px;">Copy Solution into Editor</button>
            </div>
          ` : ""}
        </div>

        ${linkedNode ? `
          <div class="ml-forge-lesson-link">
            <div>
              <span class="ml-forge-sec-lbl" style="margin:0;">Related Visual Lesson</span>
              <div style="font-weight:600; font-size:13px; margin-top:2px;">${esc(linkedNode.title)}</div>
            </div>
            <button type="button" class="ml-btn-secondary" id="ml-forge-open-lesson" style="padding:6px 12px; font-size:12px; white-space:nowrap; flex-shrink:0;">Open Lesson →</button>
          </div>
        ` : ""}
      </div>
    `;

    container.innerHTML = `
      <div class="ml-forge-shell">
        <div class="ml-studio-ws-bar">
          <div class="ml-studio-ws-left">
            <button type="button" class="ml-btn-mini ml-studio-back-btn" id="ml-studio-to-library">← Library</button>
            <div class="ml-studio-ws-meta">
              <span class="ml-studio-ws-num">${String(activeQuest.order).padStart(2, "0")} / ${QUESTS.length}</span>
              <h2 class="ml-studio-ws-title">${esc(activeQuest.title)}</h2>
              <span class="ml-forge-diff-badge ${diff.cls}">${esc(diff.label)}</span>
              ${isSolved ? `<span class="ml-forge-cleared-pill">✓ Done</span>` : ""}
            </div>
          </div>
          <div class="ml-studio-ws-nav">
            <button type="button" class="ml-btn-mini" id="ml-studio-prev-q" ${prevQuest ? "" : "disabled"}>← Prev</button>
            <button type="button" class="ml-btn-mini" id="ml-studio-next-q" ${nextQuest ? "" : "disabled"}>Next →</button>
          </div>
        </div>

        <div class="ml-forge-split">
          <!-- LEFT PANE: TUTORIAL FIRST, THEN PRACTICE -->
          <section class="ml-forge-brief">
            <div class="ml-studio-brief-tabs" role="tablist" aria-label="Lesson steps">
              <button type="button" class="ml-studio-brief-tab ${uiState.briefTab === "learn" ? "active" : ""}" data-brief-tab="learn">
                1. Learn (Tutorial)
              </button>
              <button type="button" class="ml-studio-brief-tab ${uiState.briefTab === "practice" ? "active" : ""}" data-brief-tab="practice">
                2. Practice (Task)
              </button>
            </div>
            ${leftBodyHtml}
          </section>

          <!-- RIGHT PANE: CLEAN LIVE EDITOR + CHECKS/OUTPUT DOCK -->
          <section class="ml-forge-ide">
            <div class="ml-forge-ide-bar">
              <div class="ml-forge-file-tab">
                <span class="ml-forge-file-dot"></span>
                <span>${esc(activeQuest.fileName)}</span>
                <span class="ml-forge-lang-tag">${esc(langDisplayName(activeQuest.lang))}</span>
              </div>
              <div class="ml-forge-ide-actions">
                <button type="button" class="ml-btn-mini" id="ml-forge-font-dec" title="Smaller text">A−</button>
                <button type="button" class="ml-btn-mini" id="ml-forge-font-inc" title="Larger text">A+</button>
                <button type="button" class="ml-btn-mini" id="ml-forge-reset" title="Reset starter code">↺ Reset</button>
                <button type="button" class="ml-btn-secondary" id="ml-forge-run" style="padding:6px 12px; font-size:12.5px;" title="Run code & see output (Ctrl+Enter)">▶ Run</button>
                <button type="button" class="ml-btn-primary" id="ml-forge-submit" style="padding:6px 14px; font-size:12.5px;" title="Check all test cases (Ctrl+Shift+Enter)">✓ Check Answer</button>
              </div>
            </div>

            <div class="ml-forge-editor-wrap" style="--editor-fs:${uiState.fontSize}px;">
              <div class="ml-forge-gutter" id="ml-forge-gutter" aria-hidden="true">${lineNumbersHtml}</div>
              <div class="ml-forge-code-stack">
                <pre class="ml-forge-highlight" id="ml-forge-highlight" aria-hidden="true"><code>${highlightedCode}\n</code></pre>
                <textarea id="ml-forge-textarea" class="ml-forge-textarea" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" aria-label="Code editor for ${esc(activeQuest.fileName)}">${esc(currentCode)}</textarea>
              </div>
            </div>

            <div class="ml-forge-dock">
              <div class="ml-forge-dock-tabs">
                <button type="button" class="ml-forge-dock-tab ${uiState.dockTab === "tests" ? "active" : ""}" data-dock-tab="tests">
                  Checks ${lastRun ? `(${lastRun.passed}/${lastRun.total})` : `(${activeQuest.tests.length})`}
                </button>
                <button type="button" class="ml-forge-dock-tab ${uiState.dockTab === "console" ? "active" : ""}" data-dock-tab="console">
                  ${activeQuest.lang === "sql" ? "Result Table" : activeQuest.lang === "html" ? "Live Preview" : "Output"}
                </button>
                ${activeQuest.lang === "python" ? `
                  <button type="button" class="ml-forge-dock-tab ${uiState.dockTab === "trace" ? "active" : ""}" data-dock-tab="trace">
                    Step Trace ${lastRun && lastRun.trace ? `(${lastRun.trace.length})` : ""}
                  </button>
                ` : ""}
              </div>
              <div class="ml-forge-dock-body" id="ml-forge-dock-body">
                ${buildDockHtml()}
              </div>
            </div>
          </section>
        </div>
      </div>
    `;

    // Wire Editor live syntax highlighting + scroll sync + Tab/Enter ergonomics
    const ta = document.getElementById("ml-forge-textarea");
    const hl = document.getElementById("ml-forge-highlight");
    const gutter = document.getElementById("ml-forge-gutter");

    function syncEditorVisuals() {
      const val = ta.value;
      state.forgeCode[activeQuest.id] = val;
      if (hl) {
        hl.innerHTML = `<code>${ENGINE ? ENGINE.highlightCode(val, activeQuest.lang) : esc(val)}\n</code>`;
        hl.scrollTop = ta.scrollTop;
        hl.scrollLeft = ta.scrollLeft;
      }
      if (gutter) {
        const cnt = Math.max(8, val.split("\n").length);
        gutter.innerHTML = Array.from({ length: cnt }, (_, i) => `<span>${i + 1}</span>`).join("");
        gutter.scrollTop = ta.scrollTop;
      }
    }

    function executeAction(mode) {
      const code = ta ? ta.value : currentCode;
      state.forgeCode[activeQuest.id] = code;
      const result = evaluateQuest(activeQuest, code);
      uiState.lastRunByQuest[activeQuest.id] = result;
      uiState.traceIdx = Math.max(0, ((result.trace && result.trace.length) || 1) - 1);

      if (mode === "run") {
        uiState.dockTab = activeQuest.lang === "sql" || activeQuest.lang === "html" || (result.out && result.out.length > 0) ? "console" : "tests";
      } else {
        uiState.dockTab = "tests";
      }

      if (result.ok) {
        const firstClear = !state.forgeSolved[activeQuest.id];
        state.forgeSolved[activeQuest.id] = { solvedAt: Date.now(), xp: activeQuest.xp };
        if (hooks && hooks.onQuestCleared) {
          hooks.onQuestCleared(activeQuest, firstClear);
        }
      } else if (hooks && hooks.onQuestFail) {
        hooks.onQuestFail(activeQuest, result);
      }
      if (hooks && hooks.onSave) hooks.onSave();
      renderCodeForgeView(container, state, DATA, hooks);
    }

    if (ta) {
      if (ta.value !== currentCode) {
        ta.value = currentCode;
        syncEditorVisuals();
      }
      ta.addEventListener("input", () => {
        syncEditorVisuals();
        if (hooks && hooks.onSave) hooks.onSave();
      });
      ta.addEventListener("scroll", () => {
        if (hl) {
          hl.scrollTop = ta.scrollTop;
          hl.scrollLeft = ta.scrollLeft;
        }
        if (gutter) gutter.scrollTop = ta.scrollTop;
      });
      ta.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          executeAction(e.shiftKey ? "submit" : "run");
          return;
        }
        if (e.key === "Tab") {
          e.preventDefault();
          const indent = activeQuest.lang === "python" ? "    " : "  ";
          const start = ta.selectionStart;
          const end = ta.selectionEnd;
          ta.value = ta.value.slice(0, start) + indent + ta.value.slice(end);
          ta.selectionStart = ta.selectionEnd = start + indent.length;
          syncEditorVisuals();
        } else if (e.key === "Enter") {
          const start = ta.selectionStart;
          const lineStart = ta.value.lastIndexOf("\n", start - 1) + 1;
          const curLine = ta.value.slice(lineStart, start);
          const leading = (curLine.match(/^\s*/) || [""])[0];
          const extra = activeQuest.lang === "python" && curLine.trim().endsWith(":") ? "    " : (curLine.trim().endsWith("{") ? "  " : "");
          if (leading || extra) {
            e.preventDefault();
            const ins = "\n" + leading + extra;
            ta.value = ta.value.slice(0, start) + ins + ta.value.slice(ta.selectionEnd);
            ta.selectionStart = ta.selectionEnd = start + ins.length;
            syncEditorVisuals();
          }
        }
      });
    }

    // Workspace navigation & tutorial/practice tabs
    const toLibBtn = document.getElementById("ml-studio-to-library");
    if (toLibBtn) {
      toLibBtn.addEventListener("click", () => {
        state.forgeView = "library";
        if (hooks && hooks.onSave) hooks.onSave();
        renderCodeForgeView(container, state, DATA, hooks);
      });
    }

    function jumpToQuest(target) {
      if (!target) return;
      state.forgeActiveQuestId = target.id;
      uiState.briefTab = "learn";
      uiState.hintsShown = 0;
      uiState.showSolution = false;
      uiState.dockTab = "tests";
      if (hooks && hooks.onSave) hooks.onSave();
      renderCodeForgeView(container, state, DATA, hooks);
    }

    const prevQBtn = document.getElementById("ml-studio-prev-q");
    if (prevQBtn && prevQuest) prevQBtn.addEventListener("click", () => jumpToQuest(prevQuest));
    const nextTopBtn = document.getElementById("ml-studio-next-q");
    if (nextTopBtn && nextQuest) nextTopBtn.addEventListener("click", () => jumpToQuest(nextQuest));

    container.querySelectorAll("[data-brief-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        uiState.briefTab = btn.dataset.briefTab;
        renderCodeForgeView(container, state, DATA, hooks);
      });
    });

    const goPracticeBtn = document.getElementById("ml-studio-go-practice");
    if (goPracticeBtn) {
      goPracticeBtn.addEventListener("click", () => {
        uiState.briefTab = "practice";
        renderCodeForgeView(container, state, DATA, hooks);
      });
    }

    const backLearnBtn = document.getElementById("ml-studio-back-learn");
    if (backLearnBtn) {
      backLearnBtn.addEventListener("click", () => {
        uiState.briefTab = "learn";
        renderCodeForgeView(container, state, DATA, hooks);
      });
    }

    container.querySelectorAll("[data-dock-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        uiState.dockTab = btn.dataset.dockTab;
        renderCodeForgeView(container, state, DATA, hooks);
      });
    });

    const runBtn = document.getElementById("ml-forge-run");
    if (runBtn) runBtn.addEventListener("click", () => executeAction("run"));
    const subBtn = document.getElementById("ml-forge-submit");
    if (subBtn) subBtn.addEventListener("click", () => executeAction("submit"));

    const resetBtn = document.getElementById("ml-forge-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.forgeCode[activeQuest.id] = activeQuest.starterCode;
        delete uiState.lastRunByQuest[activeQuest.id];
        if (hooks && hooks.onSave) hooks.onSave();
        renderCodeForgeView(container, state, DATA, hooks);
      });
    }

    const hintBtn = document.getElementById("ml-forge-hint-btn");
    if (hintBtn) {
      hintBtn.addEventListener("click", () => {
        uiState.hintsShown = Math.min(activeQuest.hints.length, uiState.hintsShown + 1);
        renderCodeForgeView(container, state, DATA, hooks);
      });
    }

    const solToggle = document.getElementById("ml-forge-sol-toggle");
    if (solToggle) {
      solToggle.addEventListener("click", () => {
        uiState.showSolution = !uiState.showSolution;
        renderCodeForgeView(container, state, DATA, hooks);
      });
    }

    const loadSolBtn = document.getElementById("ml-forge-load-sol");
    if (loadSolBtn) {
      loadSolBtn.addEventListener("click", () => {
        state.forgeCode[activeQuest.id] = activeQuest.solutionCode;
        if (hooks && hooks.onSave) hooks.onSave();
        renderCodeForgeView(container, state, DATA, hooks);
      });
    }

    const fontDec = document.getElementById("ml-forge-font-dec");
    if (fontDec) fontDec.addEventListener("click", () => { uiState.fontSize = Math.max(11.5, uiState.fontSize - 1); renderCodeForgeView(container, state, DATA, hooks); });
    const fontInc = document.getElementById("ml-forge-font-inc");
    if (fontInc) fontInc.addEventListener("click", () => { uiState.fontSize = Math.min(18, uiState.fontSize + 1); renderCodeForgeView(container, state, DATA, hooks); });

    const nextQBtn = document.getElementById("ml-forge-next-quest");
    if (nextQBtn && nextQuest) nextQBtn.addEventListener("click", () => jumpToQuest(nextQuest));

    const openLessonBtn = document.getElementById("ml-forge-open-lesson");
    if (openLessonBtn && linkedNode && hooks && hooks.onOpenNode) {
      openLessonBtn.addEventListener("click", () => hooks.onOpenNode(linkedNode.id));
    }

    // Bind Step Trace controls
    const trPrev = document.getElementById("ml-tr-prev");
    const trNext = document.getElementById("ml-tr-next");
    const trSlider = document.getElementById("ml-tr-slider");
    if (trPrev) trPrev.addEventListener("click", () => { uiState.traceIdx = Math.max(0, uiState.traceIdx - 1); renderCodeForgeView(container, state, DATA, hooks); });
    if (trNext) trNext.addEventListener("click", () => { uiState.traceIdx += 1; renderCodeForgeView(container, state, DATA, hooks); });
    if (trSlider) trSlider.addEventListener("input", () => { uiState.traceIdx = parseInt(trSlider.value, 10) || 0; renderCodeForgeView(container, state, DATA, hooks); });

    // Bind copy code buttons inside briefing
    container.querySelectorAll("[data-copy-code]").forEach((btn) => {
      btn.addEventListener("click", () => {
        try {
          if (navigator.clipboard) navigator.clipboard.writeText(btn.dataset.copyCode);
          btn.textContent = "Copied!";
          setTimeout(() => { btn.textContent = "Copy"; }, 1200);
        } catch (_e) {}
      });
    });
  }

  root.EVERYLINGO_CODE_FORGE = {
    TRACKS,
    QUESTS,
    getRankInfo,
    getTutorial,
    openWorkspace,
    evaluateQuest,
    renderCodeForgeView
  };
})(typeof window !== "undefined" ? window : globalThis);
