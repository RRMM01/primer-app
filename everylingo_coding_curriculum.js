// EveryLingo Coding & Computer Science Mastery Expansion
// Adds World 22: DSA Mastery (8 nodes), World 23: Backend, SQL, APIs & DevOps (8 nodes),
// World 24: Modern JS, TypeScript & Clean Architecture (8 nodes) — 24 lessons, 120 curated questions,
// 24 procedural generators, 24 worked examples, 10 coding traps, 24 coding cards, 6 badges, 4 synthesis bosses & 6 diagnostic questions.
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

  function numOpts(ans, deltas) {
    const s = new Set([String(ans)]);
    for (const d of shuffle(deltas || [-3, -2, -1, 1, 2, 3, 4])) {
      if (s.size >= 4) break;
      if (ans + d !== ans) s.add(String(ans + d));
    }
    let k = 1;
    while (s.size < 4) {
      s.add(String(ans + k));
      k++;
    }
    return shuffle(Array.from(s));
  }

  // ==================== 3 NEW CODING WORLDS (WORLDS 22–24) ====================
  DATA.WORLDS.push(
    {
      id: "dsa_mastery",
      subject: "dsa_mastery",
      order: 22,
      icon: "🧩",
      title: "DSA: Data Structures, Recursion & Algorithms",
      subtitle: "Hash Maps & Two Pointers, Stacks/Queues, Linked Lists, Recursion, Binary Search & Sorting, Trees/Heaps, Graphs (BFS/DFS/Dijkstra) & Dynamic Programming.",
      color: "#4c7899",
      colorDark: "#32536c",
      bgSoft: "rgba(76, 120, 153, 0.12)",
      borderSoft: "rgba(76, 120, 153, 0.32)"
    },
    {
      id: "backend_sql_dev",
      subject: "backend_sql_dev",
      order: 23,
      icon: "🗄️",
      title: "Backend Engineering: SQL, REST APIs, Git & DevOps",
      subtitle: "SQL Queries, Joins & Aggregates, B-Tree Indexes & ACID, REST HTTP Design, Auth/JWT/Hashing, Linux CLI & Pipes, Git DAG Workflows, Docker & System Design.",
      color: "#4f7c6b",
      colorDark: "#335448",
      bgSoft: "rgba(79, 124, 107, 0.12)",
      borderSoft: "rgba(79, 124, 107, 0.32)"
    },
    {
      id: "js_ts_architecture",
      subject: "js_ts_architecture",
      order: 24,
      icon: "⚡",
      title: "Modern JS, TypeScript & Clean Architecture",
      subtitle: "Closures & Lexical Scope, Functional Pipelines (.map/.filter/.reduce), Event Loop & Async/Await, Fetch & State, TypeScript Generics, OOP/SOLID, TDD & Concurrency.",
      color: "#7b6399",
      colorDark: "#53406b",
      bgSoft: "rgba(123, 99, 153, 0.12)",
      borderSoft: "rgba(123, 99, 153, 0.32)"
    }
  );

  // ==================== 24 NEW CODING LESSON NODES (ORDERS 189–212) ====================
  const NEW_NODES = [
    // -------- WORLD 22: DSA MASTERY (8 NODES) --------
    {
      id: "dsa-arrays-hashing-two-pointers",
      worldId: "dsa_mastery",
      order: 189,
      title: "Arrays, Hash Maps & Two Pointers",
      icon: "🗺️",
      tagline: "Turn slow O(n²) nested loops into blazing O(n) single-pass solutions.",
      scaryVersion: "Amortized constant-time associative container indexing paired with dual-index invariant convergence on contiguous memory.",
      easyTruth: "A Hash Map is a magic locker room: you store each value's complement by key so you never scan the whole array twice. Two Pointers walks inward from both ends of a sorted array like closing elevator doors!",
      microSteps: [
        { label: "Step 1: Hash Map = O(1) Memory Tradeoff", text: "Instead of checking every pair `(i, j)` in `O(n²)`, store `seen[num] = i` as you walk once (`O(n)` time, `O(n)` space)." },
        { label: "Step 2: Complement Pattern (Two Sum)", text: "At each `num`, ask: is `target - num` already in `seen`? If yes, instant answer!" },
        { label: "Step 3: Two Pointers on Sorted Arrays", text: "Put `L = 0` and `R = len(arr) - 1`. If `arr[L] + arr[R]` is too small, move `L += 1`; if too big, move `R -= 1` — `O(1)` extra space!" },
        { label: "Step 4: Frequency Maps Beat Nested Counting", text: "Check anagrams or duplicates by counting each character once into `counts[ch] = counts.get(ch, 0) + 1`." }
      ],
      cheatCode: "Unsorted pair/duplicate lookup → Hash Map (`O(n)`). Sorted pair/palindrome → Two Pointers (`O(n)` time, `O(1)` space).",
      visualizerId: "dsaAlgoVisualizerLab",
      forgeQuestId: "dsa-two-sum",
      codeExample: {
        lang: "python",
        fileName: "two_sum.py",
        code: "def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        need = target - n\n        if need in seen:\n            return [seen[need], i]\n        seen[n] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))",
        output: "[0, 1]"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Why does the Hash Map Two-Sum algorithm beat nested `for` loops?",
          codeBlock: "seen = {}\nfor i, n in enumerate(nums):\n    if target - n in seen:\n        return [seen[target - n], i]\n    seen[n] = i",
          options: ["Drops time from O(n²) to O(n) using O(1) average dict lookups", "Uses zero extra memory", "Only works on sorted arrays", "Avoids looping through nums"],
          answer: "Drops time from O(n²) to O(n) using O(1) average dict lookups",
          hint: "You trade `O(n)` memory (`seen` dict) to eliminate the inner scan!",
          whyEasy: "One pass × O(1) lookup = O(n) total!"
        },
        {
          type: "mc",
          prompt: "On a SORTED array `arr = [1, 3, 5, 8, 12]` targeting sum `13`, `arr[L] + arr[R] = 1 + 12 = 13`. What if the sum were `10` (too small)?",
          options: ["Increment left pointer `L += 1`", "Decrement right pointer `R -= 1`", "Sort the array again", "Reset both pointers to 0"],
          answer: "Increment left pointer `L += 1`",
          hint: "Moving `L` right picks a LARGER value since the array is sorted!",
          whyEasy: "Sum too small → `L += 1`; sum too big → `R -= 1`."
        },
        {
          type: "mc",
          prompt: "What happens during a Hash Table collision (two keys hash to the same bucket)?",
          options: ["Resolved via chaining (linked list/list in bucket) or open addressing (probing)", "The program always crashes immediately", "Both keys are permanently deleted", "Arrays automatically become trees"],
          answer: "Resolved via chaining (linked list/list in bucket) or open addressing (probing)",
          hint: "Buckets can hold a chain of entries or probe to the next open slot.",
          whyEasy: "Chaining and probing keep hash tables safe even when hashes collide."
        },
        {
          type: "mc",
          prompt: "Which operation on a dynamic array (Python `list`) is `O(n)` because elements must shift right?",
          options: ["`arr.insert(0, x)` (inserting at the front)", "`arr[42]` (index lookup)", "`arr.append(x)` (amortized end push)", "`len(arr)` (length check)"],
          answer: "`arr.insert(0, x)` (inserting at the front)",
          hint: "Inserting at index 0 forces every existing element to scoot over by 1 slot!",
          whyEasy: "Front insert shifts all `n` items → `O(n)`; index read & end append are `O(1)`!"
        },
        {
          type: "mc",
          prompt: "What does this frequency-counter snippet output?",
          codeBlock: "counts = {}\nfor ch in 'banana':\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts['a'])",
          options: ["3", "2", "1", "KeyError"],
          answer: "3",
          hint: "Count the letter `'a'` in `'banana'`.",
          whyEasy: "`'banana'` has three `'a'`s, safely initialized via `.get(ch, 0)`!"
        }
      ]
    },
    {
      id: "dsa-stacks-queues-deques",
      worldId: "dsa_mastery",
      order: 190,
      title: "Stacks (LIFO), Queues (FIFO) & Monotonic Patterns",
      icon: "🥞",
      tagline: "Control order of work: undo stacks, bracket matchers, and BFS job queues.",
      scaryVersion: "Restricted-access linear abstract data types enforcing last-in-first-out and first-in-first-out discipline.",
      easyTruth: "A Stack is a stack of cafeteria plates (Last In, First Out — perfect for Undo, Call Stacks, and matching `({[]})`). A Queue is a coffee shop line (First In, First Out — perfect for task schedulers and BFS!).",
      microSteps: [
        { label: "Step 1: Stack = LIFO (`append` & `pop`)", text: "Push onto the top and pop from the top in `O(1)`. Whatever opened MOST recently must close FIRST." },
        { label: "Step 2: Valid Parentheses Pattern", text: "Push opening brackets `([{'`. When you see a closer `)]}`, pop the top and verify it matches — at the end, the stack MUST be empty!" },
        { label: "Step 3: Queue = FIFO (Use `deque`, NOT `list.pop(0)`)", text: "Python `list.pop(0)` shifts every item (`O(n)`). `collections.deque.popleft()` removes from the front in `O(1)`!" }
      ],
      cheatCode: "Stack = LIFO (Undo / Brackets / DFS). Queue = FIFO (Print Queue / BFS) — always use `deque` for `O(1)` front pop!",
      visualizerId: "dsaAlgoVisualizerLab",
      forgeQuestId: "dsa-valid-parens",
      codeExample: {
        lang: "python",
        fileName: "valid_brackets.py",
        code: "def is_valid(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for ch in s:\n        if ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n        else:\n            stack.append(ch)\n    return len(stack) == 0\n\nprint(is_valid('({[]})'), is_valid('([)]'))",
        output: "True False"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "You push `10`, `20`, `30` onto a Stack, then call `pop()` twice. What values come out in order?",
          options: ["30, then 20", "10, then 20", "30, then 10", "20, then 30"],
          answer: "30, then 20",
          hint: "Stack = LIFO (Last In, First Out) — the newest plate comes off first!",
          whyEasy: "30 was pushed last so it pops first, followed by 20."
        },
        {
          type: "mc",
          prompt: "Why is `is_valid('(((')` False at the end of the stack bracket check?",
          options: ["The stack still has unclosed `'('` left over (`len(stack) != 0`)", "Opening brackets are illegal", "A stack cannot hold 3 items", "`pop()` crashed on `'('`"],
          answer: "The stack still has unclosed `'('` left over (`len(stack) != 0`)",
          hint: "Every opener must be matched and popped before the string ends!",
          whyEasy: "Checking `return len(stack) == 0` catches leftover unclosed openers."
        },
        {
          type: "mc",
          prompt: "Why should you prefer `collections.deque.popleft()` over `list.pop(0)` for a Queue in Python?",
          options: ["`deque.popleft()` is `O(1)` while `list.pop(0)` is `O(n)` due to shifting", "`list.pop(0)` deletes the last item", "`deque` sorts elements automatically", "`list` cannot store strings"],
          answer: "`deque.popleft()` is `O(1)` while `list.pop(0)` is `O(n)` due to shifting",
          hint: "Arrays shift all remaining elements left when slot 0 is removed!",
          whyEasy: "Doubly-linked deque blocks pop from either end in true `O(1)`."
        },
        {
          type: "mc",
          prompt: "Which real-world feature naturally uses a Stack (LIFO)?",
          options: ["Browser Back button & Editor Undo history", "Customer support ticket line", "BFS shortest-path level exploration", "CPU round-robin fair turn queue"],
          answer: "Browser Back button & Editor Undo history",
          hint: "You undo the MOST RECENT edit first!",
          whyEasy: "Undo/Back always reverses the latest action first → Stack."
        },
        {
          type: "mc",
          prompt: "What does a Monotonic Decreasing Stack let you find in `O(n)` time?",
          options: ["Next Greater Element for every item in an array", "Exact square root of a prime", "Shortest weighted graph cycle", "SQL schema normalization"],
          answer: "Next Greater Element for every item in an array",
          hint: "Whenever a bigger value arrives, it resolves all smaller waiting elements on the stack!",
          whyEasy: "Each element is pushed and popped at most once → `O(n)` total!"
        }
      ]
    },
    {
      id: "dsa-linked-lists-pointers",
      worldId: "dsa_mastery",
      order: 191,
      title: "Linked Lists, References & Fast/Slow Pointers",
      icon: "🔗",
      tagline: "Rewire node pointers in O(1) and detect cycles with the Tortoise & Hare.",
      scaryVersion: "Non-contiguous heap-allocated node chains traversed via explicit reference dereferencing and Floyd's cycle-finding algorithm.",
      easyTruth: "A Linked List is a scavenger hunt: each node holds data plus the address (`next`) of the next clue. No shifting to insert at the head (`O(1)`), and two runners at 1× and 2× speed ALWAYS meet if the track loops!",
      microSteps: [
        { label: "Step 1: Array vs Linked List Tradeoff", text: "Arrays give `O(1)` random index access `arr[i]` but `O(n)` front insert. Linked Lists give `O(1)` head insert/delete, but `O(n)` to reach index `i`." },
        { label: "Step 2: Reversing a Linked List (3 Pointers)", text: "Keep `prev = None`, `curr = head`. Each loop: save `nxt = curr.next`, flip `curr.next = prev`, advance `prev = curr`, `curr = nxt`." },
        { label: "Step 3: Tortoise & Hare (Fast/Slow)", text: "`slow` moves 1 step, `fast` moves 2 steps. When `fast` hits the end, `slow` is at the exact middle! If `slow == fast`, there's a cycle!" }
      ],
      cheatCode: "Reverse = save `nxt`, flip `curr.next = prev`, slide both! Middle/Cycle = `slow` (+1) & `fast` (+2).",
      visualizerId: "dsaAlgoVisualizerLab",
      forgeQuestId: "dsa-merge-sorted",
      codeExample: {
        lang: "python",
        fileName: "reverse_list.py",
        code: "class Node:\n    def __init__(self, val, nxt=None):\n        self.val = val\n        self.next = nxt\n\ndef reverse_values(vals):\n    # Simulating in-place pointer flip\n    prev = []\n    for v in vals:\n        prev = [v] + prev\n    return prev\n\nprint(reverse_values([1, 2, 3, 4]))",
        output: "[4, 3, 2, 1]"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Why must you save `nxt = curr.next` BEFORE setting `curr.next = prev` when reversing a linked list?",
          codeBlock: "nxt = curr.next\ncurr.next = prev\nprev = curr\ncurr = nxt",
          options: ["Overwriting `curr.next` first would lose the pointer to the rest of the list", "Python forbids two assignments in a row", "`prev` must always equal `nxt`", "It doubles execution speed"],
          answer: "Overwriting `curr.next` first would lose the pointer to the rest of the list",
          hint: "Once you point `curr.next` backwards, how would you reach the next node?",
          whyEasy: "Always store the bridge ahead (`nxt`) before turning the arrow around!"
        },
        {
          type: "mc",
          prompt: "In Floyd's Cycle Detection (`slow` moves 1 step, `fast` moves 2 steps), what proves a linked list has a cycle?",
          options: ["`slow` and `fast` eventually point to the exact same node", "`fast` reaches `None`", "`slow.val` becomes negative", "The list has an even length"],
          answer: "`slow` and `fast` eventually point to the exact same node",
          hint: "On a circular running track, a 2× faster runner ALWAYS laps the slower runner!",
          whyEasy: "If `fast` hits `None`, no cycle; if `fast is slow`, guaranteed loop in `O(1)` space!"
        },
        {
          type: "mc",
          prompt: "What is the time complexity to read the 500th element of a singly linked list (starting from `head`)?",
          options: ["`O(n)` — you must walk pointer by pointer from `head`", "`O(1)` — direct memory offset", "`O(log n)` — binary search works on pointers", "`O(n²)`"],
          answer: "`O(n)` — you must walk pointer by pointer from `head`",
          hint: "Nodes are scattered in memory, so you can't compute `base + 500 * size`!",
          whyEasy: "No random access on linked lists: you follow `next` hops one by one."
        },
        {
          type: "mc",
          prompt: "When `fast` (2 steps) reaches the end of a non-cyclic linked list, where is `slow` (1 step)?",
          options: ["At the middle node", "At the very first node", "At the very last node", "Past `None`"],
          answer: "At the middle node",
          hint: "Half the speed over the same time = half the distance!",
          whyEasy: "Speed 1 vs Speed 2 finds the exact midpoint in a single pass!"
        },
        {
          type: "mc",
          prompt: "What is the main advantage of a Dummy Head (`dummy = Node(0)`) when merging or filtering linked lists?",
          options: ["Eliminates special-case `if head is None` edge logic cleanly", "Cuts memory usage by 50%", "Turns the list into a Hash Map", "Allows `O(1)` indexing"],
          answer: "Eliminates special-case `if head is None` edge logic cleanly",
          hint: "You just append to `tail.next` and return `dummy.next` at the end!",
          whyEasy: "A sentinel dummy node makes head insertion identical to middle insertion."
        }
      ]
    },
    {
      id: "dsa-recursion-call-stack",
      worldId: "dsa_mastery",
      order: 192,
      title: "Recursion, Base Cases & Call Stack Frames",
      icon: "🪆",
      tagline: "Solve big problems by shrinking them toward a crystal-clear base case.",
      scaryVersion: "Self-referential function invocation utilizing LIFO activation records on the runtime execution stack.",
      easyTruth: "Recursion is Russian nesting dolls: every call solves one tiny piece and delegates a SMALLER version to itself until hitting the Base Case (the solid innermost doll), then answers bubble back up the Call Stack!",
      microSteps: [
        { label: "Step 1: The Two Non-Negotiable Rules", text: "1) A **Base Case** that stops immediately without recursing. 2) A **Recursive Step** that strictly moves closer to the base case." },
        { label: "Step 2: Call Stack Memory Cost", text: "Each unfinished call sits as a frame on the Call Stack (`O(depth)` space). Missing or unreachable base cases cause `RecursionError` / Stack Overflow!" },
        { label: "Step 3: Beware Exponential Trees", text: "Naive `fib(n) = fib(n-1) + fib(n-2)` recomputes the same subproblems `O(2ⁿ)` times — caching (memoization) crushes it to `O(n)`!" }
      ],
      cheatCode: "Every recursion needs: (1) Base Case to stop, (2) Smaller input toward Base Case, (3) Combine return values!",
      visualizerId: "pythonTraceLab",
      forgeQuestId: "py-recursive-fact",
      codeExample: {
        lang: "python",
        fileName: "recursion_stack.py",
        code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint('5! =', factorial(5))",
        output: "5! = 120"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "What happens if a recursive function has NO base case (or never reaches it)?",
          options: ["Stack Overflow / `RecursionError` when call stack memory fills up", "It automatically returns `0`", "Python converts it to a `for` loop", "It runs in `O(1)` time"],
          answer: "Stack Overflow / `RecursionError` when call stack memory fills up",
          hint: "Each nested call pushes another frame onto the finite Call Stack!",
          whyEasy: "Infinite stack frames overflow the stack limit every time."
        },
        {
          type: "mc",
          prompt: "Trace `power(2, 4)` in this recursive function. What does it return?",
          codeBlock: "def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)",
          options: ["16", "8", "32", "4"],
          answer: "16",
          hint: "`2 * 2 * 2 * 2 * 1`!",
          whyEasy: "4 multiplications by 2 ending at base case `exp == 0 → 1` gives 16."
        },
        {
          type: "mc",
          prompt: "How much Call Stack space does `factorial(n)` use?",
          options: ["`O(n)` because `n` active stack frames wait for `factorial(1)`", "`O(1)` constant space", "`O(log n)` space", "`O(n²)` space"],
          answer: "`O(n)` because `n` active stack frames wait for `factorial(1)`",
          hint: "`factorial(5)` cannot finish multiplying until `4, 3, 2, 1` return!",
          whyEasy: "Recursion depth `n` = `n` simultaneous stack frames → `O(n)` space."
        },
        {
          type: "mc",
          prompt: "Why is naive recursive `fib(45)` painfully slow (`O(2ⁿ)`)?",
          options: ["Each call branches into 2 calls and recomputes identical subproblems millions of times", "Addition is slow in Python", "Fibonacci numbers are irrational", "The base case is missing"],
          answer: "Each call branches into 2 calls and recomputes identical subproblems millions of times",
          hint: "`fib(5)` computes `fib(3)` twice and `fib(2)` three times — doubling every step!",
          whyEasy: "Overlapping subproblems explode exponentially unless you memoize results!"
        },
        {
          type: "mc",
          prompt: "In what order are Call Stack frames popped as recursion unwinds?",
          options: ["LIFO — deepest base case returns first, outermost original call finishes last", "FIFO — outermost finishes first", "Alphabetical by function name", "Random order"],
          answer: "LIFO — deepest base case returns first, outermost original call finishes last",
          hint: "The Call **Stack** is literally a LIFO Stack!",
          whyEasy: "The innermost call resolves first and passes its result back up the stack."
        }
      ]
    },
    {
      id: "dsa-binary-search-sorting",
      worldId: "dsa_mastery",
      order: 193,
      title: "Binary Search, Merge Sort & Quick Sort",
      icon: "🔍",
      tagline: "Slice search space in half (O(log n)) and sort millions in O(n log n).",
      scaryVersion: "Logarithmic interval bisection and divide-and-conquer comparison-based sorting bounds.",
      easyTruth: "Binary Search is opening a 1,000-page dictionary in the middle and throwing away the wrong half every single time (~10 guesses!). Merge Sort splits an array in half until size 1, then zips sorted halves cleanly!",
      microSteps: [
        { label: "Step 1: Binary Search Prerequisite", text: "The data MUST be **sorted** (or monotonic). Keep `lo = 0, hi = len(arr) - 1`, check `mid = (lo + hi) // 2`." },
        { label: "Step 2: Never Loop Forever!", text: "Always shrink strictly: `lo = mid + 1` or `hi = mid - 1` when `arr[mid] != target` (using `lo = mid` can infinite-loop!)." },
        { label: "Step 3: O(n²) vs O(n log n) Sorting", text: "Bubble/Insertion/Selection Sort are `O(n²)` (fine for tiny or nearly-sorted arrays). **Merge Sort** guarantees `O(n log n)` always (stable!); **Quick Sort** averages `O(n log n)` in-place!" }
      ],
      cheatCode: "Sorted search → Binary Search `O(log n)` (`lo = mid + 1`, `hi = mid - 1`). Best general sort → `O(n log n)` (Merge/Timsort).",
      visualizerId: "dsaAlgoVisualizerLab",
      forgeQuestId: "dsa-binary-search",
      codeExample: {
        lang: "python",
        fileName: "binary_search.py",
        code: "def binary_search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n\nprint(binary_search([2, 5, 9, 14, 21, 33], 21))",
        output: "4"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "At most how many comparisons does Binary Search need on a sorted list of `1,000,000` items?",
          options: ["About 20 (`log₂(1,000,000) ≈ 20`)", "About 500,000", "About 1,000", "Exactly 100"],
          answer: "About 20 (`log₂(1,000,000) ≈ 20`)",
          hint: "`2²⁰ = 1,048,576` — halving 20 times reaches 1 item!",
          whyEasy: "Doubling the array adds ONLY ONE extra step to Binary Search!"
        },
        {
          type: "mc",
          prompt: "Why is Merge Sort guaranteed `O(n log n)` even in the worst case, unlike basic Quick Sort?",
          options: ["Merge Sort ALWAYS splits strictly in half (`log n` levels × `n` merge work)", "Merge Sort never compares elements", "Quick Sort cannot sort integers", "Merge Sort runs in `O(1)` memory"],
          answer: "Merge Sort ALWAYS splits strictly in half (`log n` levels × `n` merge work)",
          hint: "Bad pivot choices can make Quick Sort degrade to `O(n²)`, while Merge Sort always halves evenly!",
          whyEasy: "Even splits guarantee `log₂ n` recursion depth every single time."
        },
        {
          type: "mc",
          prompt: "What happens if you run Binary Search on an UNSORTED array `[9, 2, 15, 4, 7]`?",
          options: ["It can silently miss items that exist because throwing away half assumes sorted order", "It automatically sorts the array first", "It still works in `O(log n)`", "It raises a SyntaxError"],
          answer: "It can silently miss items that exist because throwing away half assumes sorted order",
          hint: "Discarding the left half only works when every element there is guaranteed smaller!",
          whyEasy: "Sorted (monotonic) invariant is non-negotiable for Binary Search."
        },
        {
          type: "mc",
          prompt: "What makes a sorting algorithm **stable** (like Merge Sort and Python's Timsort)?",
          options: ["Equal-key elements preserve their original relative order", "It never throws runtime exceptions", "It always runs in `O(1)` time", "It only works on positive numbers"],
          answer: "Equal-key elements preserve their original relative order",
          hint: "Think of sorting emails by sender AFTER sorting by date — stability keeps dates ordered!",
          whyEasy: "Stable sorts keep ties in their exact original sequence."
        },
        {
          type: "mc",
          prompt: "In Python's `while lo <= hi:` Binary Search, why do we update `lo = mid + 1` instead of `lo = mid`?",
          options: ["We already checked `mid`, and `lo = mid` causes an infinite loop when `lo == mid`", "`mid + 1` skips checking the target", "Python lists start at index 1", "It makes `lo` negative"],
          answer: "We already checked `mid`, and `lo = mid` causes an infinite loop when `lo == mid`",
          hint: "When `lo = 4, hi = 5`, `(4+5)//2 = 4 == lo` — setting `lo = mid` never moves!",
          whyEasy: "Excluding `mid` (`mid + 1` / `mid - 1`) guarantees the window strictly shrinks."
        }
      ]
    },
    {
      id: "dsa-trees-bst-heaps",
      worldId: "dsa_mastery",
      order: 194,
      title: "Binary Trees, BSTs & Priority Heaps",
      icon: "🌳",
      tagline: "Hierarchical search in O(log n) and instant min/max extraction with Heaps.",
      scaryVersion: "Acyclic rooted binary hierarchies obeying search-order invariants and complete binary heap-order properties.",
      easyTruth: "A Binary Search Tree (BST) puts smaller values Left and bigger values Right — so In-Order traversal (`Left → Node → Right`) prints everything SORTED! A Min-Heap is a VIP triage line where the smallest priority item always sits at the root (`heap[0]`).",
      microSteps: [
        { label: "Step 1: BST Invariant", text: "Every node in the **Left** subtree is `< root`; every node in the **Right** subtree is `> root`. Balanced height = `O(log n)` search/insert." },
        { label: "Step 2: 3 DFS Tree Traversals", text: "**Pre-Order** (`Root-L-R`: clone tree), **In-Order** (`L-Root-R`: sorted BST output!), **Post-Order** (`L-R-Root`: delete children before parent)." },
        { label: "Step 3: Priority Queue / Min-Heap (`heapq`)", text: "Peek min in `O(1)`, push/pop min in `O(log n)`! Stored compactly in a plain array: children of `i` live at `2i+1` and `2i+2`." }
      ],
      cheatCode: "BST In-Order (`L → Root → R`) = SORTED! Min-Heap = `O(1)` peek min, `O(log n)` push/pop (`heapq`).",
      visualizerId: "dsaAlgoVisualizerLab",
      forgeQuestId: "dsa-binary-search",
      codeExample: {
        lang: "python",
        fileName: "bst_inorder.py",
        code: "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef inorder(node, out):\n    if node is None:\n        return\n    inorder(node.left, out)\n    out.append(node.val)\n    inorder(node.right, out)\n\nroot = TreeNode(10, TreeNode(5), TreeNode(15))\nres = []\ninorder(root, res)\nprint(res)",
        output: "[5, 10, 15]"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Which traversal of a Binary Search Tree (BST) visits all values in strictly ASCENDING sorted order?",
          options: ["In-Order (`Left → Root → Right`)", "Pre-Order (`Root → Left → Right`)", "Post-Order (`Left → Right → Root`)", "Level-Order (BFS)"],
          answer: "In-Order (`Left → Root → Right`)",
          hint: "Smaller values live on the left, then root, then larger values on the right!",
          whyEasy: "L → Root → R reads smallest → middle → largest automatically!"
        },
        {
          type: "mc",
          prompt: "What happens if you insert already-sorted numbers `1, 2, 3, 4, 5, 6` into a plain unbalanced BST?",
          options: ["It degenerates into a skinny linked list with `O(n)` worst-case search", "It automatically stays height `log n`", "It becomes a Min-Heap", "Duplicate values are deleted"],
          answer: "It degenerates into a skinny linked list with `O(n)` worst-case search",
          hint: "Every new key goes strictly to the right child!",
          whyEasy: "That's why production databases use self-balancing trees (AVL, Red-Black, B-Trees)!"
        },
        {
          type: "mc",
          prompt: "What is the time complexity of peeking vs popping the minimum element in a Binary Min-Heap?",
          options: ["Peek `O(1)`, Pop `O(log n)`", "Peek `O(n)`, Pop `O(1)`", "Both `O(n)`", "Both `O(1)`"],
          answer: "Peek `O(1)`, Pop `O(log n)`",
          hint: "The min is always at `heap[0]`, and popping sifts the replacement down height `log n`!",
          whyEasy: "Top element is instant (`O(1)`), rebalancing after pop takes `O(log n)`."
        },
        {
          type: "mc",
          prompt: "In a 0-indexed array representation of a Binary Heap, where are the left and right children of node `i`?",
          options: ["`2*i + 1` and `2*i + 2`", "`i + 1` and `i + 2`", "`i // 2` and `i * 3`", "`i - 1` and `i + 1`"],
          answer: "`2*i + 1` and `2*i + 2`",
          hint: "Root `0` has children `1` and `2`; node `1` has children `3` and `4`!",
          whyEasy: "Zero pointers needed — pure array arithmetic makes heaps super cache-friendly!"
        },
        {
          type: "mc",
          prompt: "Which data structure is ideal for continuously finding the **Top-K largest scores** from a live stream of millions of events?",
          options: ["A Min-Heap of size `K` (`O(n log K)`)", "Sorting the entire stream on every event (`O(n² log n)`)", "A singly linked list", "A single stack"],
          answer: "A Min-Heap of size `K` (`O(n log K)`)",
          hint: "Keep only the `K` biggest; whenever a bigger score arrives, evict the smallest of the `K`!",
          whyEasy: "A size-`K` min-heap holds the Top-K champion scores with tiny memory and `O(log K)` updates!"
        }
      ]
    },
    {
      id: "dsa-graphs-bfs-dfs-dijkstra",
      worldId: "dsa_mastery",
      order: 195,
      title: "Graphs: BFS Shortest Path, DFS & Dijkstra",
      icon: "🕸️",
      tagline: "Navigate social networks, maps, and dependency trees without infinite loops.",
      scaryVersion: "Vertex-edge graph traversal via breadth-first wave propagation, depth-first backtracking, and greedy priority-queue relaxation.",
      easyTruth: "A Graph is just Nodes + Connections (`adj[u] = [neighbors]`). **BFS** ripples outward ring-by-ring using a Queue (guarantees shortest unweighted path!). **DFS** dives deep down one corridor using a Stack/Recursion. **Dijkstra** uses a Min-Heap for weighted roads!",
      microSteps: [
        { label: "Step 1: Adjacency List Representation", text: "Store `graph = {'A': ['B', 'C'], 'B': ['D']}` — takes `O(V + E)` memory instead of a huge `O(V²)` matrix." },
        { label: "Step 2: ALWAYS Track a `visited` Set!", text: "Unlike trees, graphs have cycles (`A → B → A`). Mark nodes in `visited` when enqueueing so you never loop forever!" },
        { label: "Step 3: Pick the Right Traversal", text: "Unweighted shortest hops → **BFS** (Queue). Path/cycle/topological sort → **DFS** (Stack/Recursion). Non-negative weighted shortest path → **Dijkstra** (Min-Heap)." }
      ],
      cheatCode: "Unweighted shortest path = BFS (Queue). Deep explore/topo-sort = DFS (Stack). Weighted shortest (w ≥ 0) = Dijkstra (Min-Heap)!",
      visualizerId: "dsaAlgoVisualizerLab",
      forgeQuestId: "dsa-sliding-window",
      codeExample: {
        lang: "python",
        fileName: "bfs_shortest.py",
        code: "graph = {'A': ['B', 'C'], 'B': ['D'], 'C': ['D', 'E'], 'D': [], 'E': []}\nvisited = set(['A'])\nqueue = [('A', 0)]\nwhile queue:\n    node, dist = queue.pop(0)\n    if node == 'E':\n        print('Shortest hops to E:', dist)\n        break\n    for nxt in graph[node]:\n        if nxt not in visited:\n            visited.add(nxt)\n            queue.append((nxt, dist + 1))",
        output: "Shortest hops to E: 2"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Why does BFS (Breadth-First Search) guarantee the shortest path in an UNWEIGHTED graph?",
          options: ["It explores all nodes at distance 1, then all at distance 2, then 3 (level by level)", "It always chooses the alphabetically smallest neighbor", "It sorts edges by weight first", "It uses recursion"],
          answer: "It explores all nodes at distance 1, then all at distance 2, then 3 (level by level)",
          hint: "Think of ripples expanding evenly in a pond — the first ripple to hit the target is the shortest!",
          whyEasy: "FIFO queue processes distance `d` completely before touching `d + 1`."
        },
        {
          type: "mc",
          prompt: "What happens if you forget a `visited` set during BFS/DFS on a graph containing a cycle?",
          options: ["An infinite loop revisiting the same cycle forever", "It runs twice as fast", "It automatically finds the shortest path", "The graph becomes a tree"],
          answer: "An infinite loop revisiting the same cycle forever",
          hint: "If `A` points to `B` and `B` points back to `A`, traversal bounces endlessly!",
          whyEasy: "A `visited` hash set gives `O(1)` cycle defense so each node runs once (`O(V + E)`)."
        },
        {
          type: "mc",
          prompt: "Which algorithm finds the shortest path on a road map with positive travel times (weighted edges)?",
          options: ["Dijkstra's Algorithm (Min-Heap Priority Queue)", "Plain BFS", "Bubble Sort", "Binary Search"],
          answer: "Dijkstra's Algorithm (Min-Heap Priority Queue)",
          hint: "Fewest hops isn't fastest when one edge costs 100 minutes and two edges cost 2 + 2 minutes!",
          whyEasy: "Dijkstra always expands the lowest cumulative cost node first via a Min-Heap."
        },
        {
          type: "mc",
          prompt: "What is the time complexity of BFS and DFS on a graph represented by an Adjacency List with `V` vertices and `E` edges?",
          options: ["`O(V + E)`", "`O(V × E)`", "`O(V²)`", "`O(log V)`"],
          answer: "`O(V + E)`",
          hint: "You visit each vertex at most once and inspect each edge once!",
          whyEasy: "Linear in the size of the graph: `O(V + E)`."
        },
        {
          type: "mc",
          prompt: "Which algorithm orders prerequisite courses (or build targets in EveryLingo's Skill Tree DAG!) so every dependency runs first?",
          options: ["Topological Sort (on a DAG)", "Quick Sort", "Floyd Cycle Detection", "Binary Search"],
          answer: "Topological Sort (on a DAG)",
          hint: "Directed Acyclic Graph (DAG) linear ordering = Topological Sort!",
          whyEasy: "Every package manager (npm/pip) and skill tree runs Topological Sort on a DAG!"
        }
      ]
    },
    {
      id: "dsa-dp-memoization-sliding-window",
      worldId: "dsa_mastery",
      order: 196,
      title: "Dynamic Programming, Memoization & Sliding Window",
      icon: "🪟",
      tagline: "Remember past answers (DP) and glide a smart window across arrays in O(n).",
      scaryVersion: "Optimal substructure decomposition via top-down memoization, bottom-up tabulation, and amortized sliding-window invariant maintenance.",
      easyTruth: "Dynamic Programming is just **'Recursion + a Sticky Note'** (never solve the same subproblem twice!). Sliding Window is a camera frame gliding across an array: add the new right item, drop the old left item — zero recounting!",
      microSteps: [
        { label: "Step 1: Sliding Window (`O(n)` instead of `O(n·k)`)", text: "To get max sum of `k` adjacent items: compute the first window sum, then slide right by doing `win += arr[i] - arr[i - k]`!" },
        { label: "Step 2: Memoization (Top-Down DP)", text: "Wrap recursive calls with a dict `memo[n]`: if already computed, return `memo[n]` in `O(1)` — turning `O(2ⁿ)` into `O(n)`!" },
        { label: "Step 3: Tabulation (Bottom-Up DP)", text: "Fill an array `dp[0..n]` iteratively (`dp[i] = dp[i-1] + dp[i-2]`) — zero recursion stack overhead and often `O(1)` space!" }
      ],
      cheatCode: "Contiguous subarray/substring → Sliding Window (`+right, -left`). Overlapping subproblems → DP (`memo` or `dp[]` table)!",
      visualizerId: "pythonTraceLab",
      forgeQuestId: "dsa-climbing-stairs",
      codeExample: {
        lang: "python",
        fileName: "climb_stairs_dp.py",
        code: "def climb_stairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b\n\nprint('Ways for 6 steps:', climb_stairs(6))",
        output: "Ways for 6 steps: 13"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "In a fixed-size Sliding Window of width `k = 3`, how do you update `window_sum` when moving 1 step right to index `i`?",
          options: ["`window_sum = window_sum + nums[i] - nums[i - 3]`", "Re-sum all 3 elements with an inner loop", "Multiply `window_sum` by `nums[i]`", "Reset `window_sum = 0`"],
          answer: "`window_sum = window_sum + nums[i] - nums[i - 3]`",
          hint: "One element enters on the right (`+ nums[i]`), one element leaves on the left (`- nums[i - k]`)!",
          whyEasy: "`O(1)` per slide × `n` slides = `O(n)` total time!"
        },
        {
          type: "mc",
          prompt: "What two properties signal that a problem can be solved with Dynamic Programming?",
          options: ["Overlapping Subproblems + Optimal Substructure", "Sorted Array + Unique Keys", "Cyclic Graph + Negative Weights", "Plaintext Strings + HTML Tags"],
          answer: "Overlapping Subproblems + Optimal Substructure",
          hint: "Big answer builds from smaller answers, and the SAME smaller answers repeat!",
          whyEasy: "When subproblems repeat, caching them avoids exponential waste!"
        },
        {
          type: "mc",
          prompt: "You can climb `1` or `2` stairs at a time. Using `dp[n] = dp[n-1] + dp[n-2]` with `dp[1]=1, dp[2]=2`, how many ways to climb `5` stairs?",
          options: ["8", "5", "10", "13"],
          answer: "8",
          hint: "`dp[3] = 3`, `dp[4] = 5`, `dp[5] = 3 + 5`!",
          whyEasy: "1, 2, 3, 5, **8** — Climbing Stairs is literally Fibonacci in disguise!"
        },
        {
          type: "mc",
          prompt: "How does Top-Down Memoization differ from Bottom-Up Tabulation?",
          options: ["Memoization uses recursion + cache dict; Tabulation fills a DP table iteratively from base cases up", "Memoization is always `O(2ⁿ)`", "Tabulation cannot use arrays", "They produce different answers"],
          answer: "Memoization uses recursion + cache dict; Tabulation fills a DP table iteratively from base cases up",
          hint: "Top-Down starts at `f(n)` and caches; Bottom-Up starts at `dp[0], dp[1]` and loops up!",
          whyEasy: "Both solve each state once (`O(n)`), with tabulation avoiding recursion stack limits."
        },
        {
          type: "mc",
          prompt: "In `climb_stairs(n)`, why can we optimize space from `O(n)` array `dp[]` down to `O(1)`?",
          options: ["`dp[i]` only depends on the previous TWO values (`a, b`), so older entries aren't needed", "Python deletes lists automatically", "`n` is always less than 10", "Recursion uses zero space"],
          answer: "`dp[i]` only depends on the previous TWO values (`a, b`), so older entries aren't needed",
          hint: "Rolling variables keep only the tiny slice of history your recurrence actually reads!",
          whyEasy: "Only need `dp[i-1]` and `dp[i-2]` → two variables = `O(1)` space!"
        }
      ]
    },

    // -------- WORLD 23: BACKEND, SQL, APIS & DEVOPS (8 NODES) --------
    {
      id: "be-sql-select-where-order",
      worldId: "backend_sql_dev",
      order: 197,
      title: "SQL Foundations: SELECT, WHERE, ORDER BY & LIMIT",
      icon: "🗃️",
      tagline: "Ask relational databases exact questions and understand SQL's true execution order.",
      scaryVersion: "Declarative relational algebra projection, selection predicates, lexicographic sorting, and cardinality truncation.",
      easyTruth: "SQL reads like plain English, BUT the database runs it in a specific pipeline: first grab the table (`FROM`), throw away rows that fail (`WHERE`), pick columns (`SELECT`), sort (`ORDER BY`), then slice the top N (`LIMIT`)!",
      microSteps: [
        { label: "Step 1: Clause Writing Order", text: "`SELECT cols FROM table WHERE filter ORDER BY col DESC LIMIT n`" },
        { label: "Step 2: True Execution Order!", text: "The engine executes `FROM → WHERE → SELECT → ORDER BY → LIMIT`. That's why `WHERE` runs BEFORE `SELECT` aliases exist!" },
        { label: "Step 3: NULL & Pattern Matching", text: "NEVER write `col = NULL` (always Unknown!). Use `IS NULL` / `IS NOT NULL`, and use `LIKE 'A%'` for wildcard matching." }
      ],
      cheatCode: "SQL runs `FROM → WHERE → SELECT → ORDER BY → LIMIT`. Always test nulls with `IS NULL`, never `= NULL`!",
      visualizerId: "sqlDatabaseLab",
      forgeQuestId: "sql-top-heroes",
      codeExample: {
        lang: "sql",
        fileName: "top_heroes.sql",
        code: "SELECT name, role, xp\nFROM heroes\nWHERE active = 1 AND xp >= 4000\nORDER BY xp DESC\nLIMIT 3;",
        output: "Kael (6850), Sora (5900), Mira (4700)"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "In what logical order does a SQL engine execute `SELECT`, `FROM`, `WHERE`, `ORDER BY`, `LIMIT`?",
          options: ["`FROM → WHERE → SELECT → ORDER BY → LIMIT`", "`SELECT → FROM → WHERE → LIMIT → ORDER BY`", "`LIMIT → WHERE → FROM → SELECT → ORDER BY`", "`WHERE → SELECT → FROM → ORDER BY → LIMIT`"],
          answer: "`FROM → WHERE → SELECT → ORDER BY → LIMIT`",
          hint: "You have to load the table (`FROM`) and filter rows (`WHERE`) before projecting columns (`SELECT`)!",
          whyEasy: "Knowing execution order explains why `WHERE` can't see `SELECT` aliases while `ORDER BY` can!"
        },
        {
          type: "mc",
          prompt: "How do you correctly find all heroes in SQL who do NOT belong to any guild (`guild_id` is empty)?",
          options: ["`WHERE guild_id IS NULL`", "`WHERE guild_id = NULL`", "`WHERE guild_id == None`", "`WHERE guild_id != ''`"],
          answer: "`WHERE guild_id IS NULL`",
          hint: "In SQL three-valued logic, `NULL = NULL` evaluates to UNKNOWN (falsy)!",
          whyEasy: "Always use `IS NULL` or `IS NOT NULL` for missing values."
        },
        {
          type: "mc",
          prompt: "Which query returns the top 2 highest-XP heroes?",
          codeBlock: "SELECT name, xp FROM heroes\nORDER BY xp ____\nLIMIT 2;",
          options: ["`DESC` (descending: largest first)", "`ASC` (ascending: smallest first)", "`TOP`", "`MAX`"],
          answer: "`DESC` (descending: largest first)",
          hint: "`ORDER BY` defaults to `ASC` (smallest first) — flip it for highest first!",
          whyEasy: "`ORDER BY xp DESC LIMIT 2` puts biggest XP at row 1 & 2."
        },
        {
          type: "mc",
          prompt: "What does `WHERE name LIKE 'A%'` match in SQL?",
          options: ["Any name starting with `'A'` (e.g., `'Aria'`, `'Alex'`)", "Only names of length 2", "Names ending in `'A'`", "Exact string `'A%'`"],
          answer: "Any name starting with `'A'` (e.g., `'Aria'`, `'Alex'`)",
          hint: "`%` matches zero or more characters; `_` matches a single character!",
          whyEasy: "`'A%'` = starts with A; `'%a'` = ends with a; `'%ri%'` = contains ri."
        },
        {
          type: "mc",
          prompt: "What does `SELECT DISTINCT role FROM heroes;` do?",
          options: ["Returns each unique role once, removing duplicate values", "Deletes duplicate rows from the database permanently", "Sorts roles alphabetically", "Counts how many heroes exist"],
          answer: "Returns each unique role once, removing duplicate values",
          hint: "`SELECT` is read-only — `DISTINCT` deduplicates the output set!",
          whyEasy: "`DISTINCT` deduplicates query results cleanly without modifying stored data."
        }
      ]
    },
    {
      id: "be-sql-joins-groupby-agg",
      worldId: "backend_sql_dev",
      order: 198,
      title: "SQL Joins (INNER / LEFT), GROUP BY & HAVING",
      icon: "🔗",
      tagline: "Combine normalized tables cleanly and summarize millions of rows in one query.",
      scaryVersion: "Relational equi-join composition coupled with partitioned aggregate reduction and post-aggregation predicate filtering.",
      easyTruth: "**INNER JOIN** keeps ONLY rows with a match in BOTH tables. **LEFT JOIN** keeps ALL rows from the left table (filling unmatched right columns with `NULL`). **WHERE** filters individual rows BEFORE grouping; **HAVING** filters groups AFTER `GROUP BY`!",
      microSteps: [
        { label: "Step 1: INNER JOIN vs LEFT JOIN", text: "Match foreign key to primary key (`ON h.guild_id = g.id`). Need guildless heroes included too? Switch `INNER JOIN` → `LEFT JOIN`!" },
        { label: "Step 2: GROUP BY + Aggregates", text: "Collapse rows into buckets (`GROUP BY g.name`) and compute `COUNT(*)`, `SUM(xp)`, `AVG(level)`, `MAX(xp)` per bucket." },
        { label: "Step 3: WHERE vs HAVING", text: "`WHERE` filters raw rows BEFORE `GROUP BY` (cannot use `COUNT(*)`!). `HAVING` filters whole groups AFTER `GROUP BY` (e.g. `HAVING COUNT(*) >= 2`)." }
      ],
      cheatCode: "Keep unmatched left rows → `LEFT JOIN`. Filter rows → `WHERE`; filter aggregates (`COUNT/SUM`) → `HAVING`!",
      visualizerId: "sqlDatabaseLab",
      forgeQuestId: "sql-guild-leaderboard",
      codeExample: {
        lang: "sql",
        fileName: "guild_xp.sql",
        code: "SELECT g.name AS guild,\n       COUNT(h.id) AS members,\n       SUM(h.xp) AS total_xp\nFROM guilds g\nINNER JOIN heroes h ON g.id = h.guild_id\nGROUP BY g.name\nHAVING COUNT(h.id) >= 2\nORDER BY total_xp DESC;",
        output: "Iron Compilers (12750), Obsidian Order (11300), Quantum Mages (4450)"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Hero `Zane` has `guild_id = NULL`. Which join keeps `Zane` in the output with `guild_name = NULL`?",
          codeBlock: "SELECT h.name, g.name AS guild_name\nFROM heroes h\n____ JOIN guilds g ON h.guild_id = g.id;",
          options: ["`LEFT` (`LEFT JOIN`)", "`INNER` (`INNER JOIN`)", "`CROSS`", "`SELF`"],
          answer: "`LEFT` (`LEFT JOIN`)",
          hint: "`INNER JOIN` drops unmatched rows; `LEFT JOIN` preserves every left-table row!",
          whyEasy: "`LEFT JOIN` keeps every row from `heroes` even when no guild matches."
        },
        {
          type: "mc",
          prompt: "Why does `SELECT role, COUNT(*) FROM heroes WHERE COUNT(*) > 1 GROUP BY role;` fail with a SQL error?",
          options: ["`WHERE` runs BEFORE `GROUP BY` so aggregates like `COUNT(*)` must go in `HAVING`", "`COUNT(*)` cannot be used with `>`", "`GROUP BY` must come before `SELECT`", "SQL forbids counting strings"],
          answer: "`WHERE` runs BEFORE `GROUP BY` so aggregates like `COUNT(*)` must go in `HAVING`",
          hint: "Remember execution order: `FROM → WHERE → GROUP BY → HAVING → SELECT`!",
          whyEasy: "Row filter = `WHERE`; Group/Aggregate filter = `HAVING`!"
        },
        {
          type: "mc",
          prompt: "How can you find every guild in `guilds` that currently has ZERO heroes using `LEFT JOIN`?",
          options: ["`LEFT JOIN heroes h ON g.id = h.guild_id WHERE h.id IS NULL`", "`INNER JOIN heroes h ON g.id = h.guild_id WHERE h.id = 0`", "`SELECT * FROM guilds WHERE id = NULL`", "`GROUP BY g.id LIMIT 0`"],
          answer: "`LEFT JOIN heroes h ON g.id = h.guild_id WHERE h.id IS NULL`",
          hint: "Unmatched left rows get `NULL` on all right-table columns — filter for `h.id IS NULL`!",
          whyEasy: "The `LEFT JOIN ... WHERE right.id IS NULL` anti-join is a legendary backend pattern!"
        },
        {
          type: "mc",
          prompt: "What is the subtle difference between `COUNT(*)` and `COUNT(guild_id)`?",
          options: ["`COUNT(*)` counts all rows including NULLs; `COUNT(guild_id)` skips rows where `guild_id` is NULL", "They always return the exact same number", "`COUNT(guild_id)` sums the IDs", "`COUNT(*)` counts columns"],
          answer: "`COUNT(*)` counts all rows including NULLs; `COUNT(guild_id)` skips rows where `guild_id` is NULL",
          hint: "In `LEFT JOIN`, counting `h.id` correctly returns `0` for empty guilds instead of `1`!",
          whyEasy: "Always `COUNT(right.id)` (not `COUNT(*)`) after a `LEFT JOIN` so empty groups count as 0!"
        },
        {
          type: "mc",
          prompt: "What is a Foreign Key (`heroes.guild_id → guilds.id`)?",
          options: ["A column referencing another table's Primary Key to enforce relational integrity", "An encrypted API token", "A key used only for sorting", "A backup copy of a table"],
          answer: "A column referencing another table's Primary Key to enforce relational integrity",
          hint: "It links child rows cleanly to parent rows without duplicating guild details everywhere!",
          whyEasy: "Foreign keys prevent orphan references and keep normalized tables connected."
        }
      ]
    },
    {
      id: "be-sql-indexes-acid-transactions",
      worldId: "backend_sql_dev",
      order: 199,
      title: "Database Indexes (B-Trees), Normalization & ACID",
      icon: "⚡",
      tagline: "Make 10-million-row queries run in 2ms and protect bank transfers from crashes.",
      scaryVersion: "Balanced multi-way search tree indexing, relational normal forms, and atomic-consistent-isolated-durable transactional guarantees.",
      easyTruth: "Without an Index, SQL flips through every single row in a 10M-row table (`O(n)` Full Table Scan). A **B-Tree Index** is a sorted book index (`O(log n)`!). And **ACID Transactions** wrap multi-step writes (debit A, credit B) so either BOTH happen or NEITHER happens!",
      microSteps: [
        { label: "Step 1: Why Indexes Speed Up Reads (and Slow Down Writes)", text: "An index turns `O(n)` scans into `O(log n)` B-Tree lookups (~23 hops for 10M rows!). Tradeoff: every `INSERT`/`UPDATE` must update the index too." },
        { label: "Step 2: ACID Transactions (`BEGIN ... COMMIT / ROLLBACK`)", text: "**A**tomicity (all-or-nothing), **C**onsistency (valid constraints), **I**solation (concurrent users don't corrupt each other), **D**urability (survives power loss)." },
        { label: "Step 3: Normalization & SQL Injection Defense", text: "Store each fact once (avoid duplicate data anomalies) and ALWAYS use **Parameterized Queries** (`WHERE email = $1`), NEVER string concatenation!" }
      ],
      cheatCode: "Index = `O(log n)` reads, slightly slower writes. ACID = all-or-nothing safe money transfers. Parameterized SQL = 0 SQL injection!",
      visualizerId: "sqlDatabaseLab",
      forgeQuestId: "sql-active-guilds-boss",
      codeExample: {
        lang: "sql",
        fileName: "index_and_tx.sql",
        code: "-- Speed up lookups by email from O(n) to O(log n):\nCREATE INDEX idx_users_email ON users(email);\n\n-- Atomic money transfer (all or nothing):\nBEGIN;\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;",
        output: "Index created · Transaction committed atomically"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Why shouldn't you blindly add a database index to EVERY single column in a write-heavy logging table?",
          options: ["Every `INSERT`/`UPDATE` must also maintain all indexes, slowing writes and using disk space", "SQL only permits 1 index per database", "Indexes make `SELECT` slower", "Indexes delete NULL rows"],
          answer: "Every `INSERT`/`UPDATE` must also maintain all indexes, slowing writes and using disk space",
          hint: "Think of maintaining 15 separate back-of-book indexes every time you add one page!",
          whyEasy: "Index columns you frequently `WHERE`, `JOIN`, or `ORDER BY` — not everything blindly!"
        },
        {
          type: "mc",
          prompt: "A bank transfer debits ₱1,000 from Alice, then the server loses power before crediting Bob. Which ACID property guarantees Alice's debit is rolled back?",
          options: ["Atomicity (all-or-nothing execution)", "Durability", "Availability", "Pagination"],
          answer: "Atomicity (all-or-nothing execution)",
          hint: "Atomic = indivisible — either the whole transaction commits or zero parts persist!",
          whyEasy: "Atomicity makes partial half-finished money transfers impossible."
        },
        {
          type: "mc",
          prompt: "Why is `\"SELECT * FROM users WHERE name = '\" + userInput + \"'\"` a catastrophic security bug?",
          options: ["SQL Injection — an attacker can input `' OR '1'='1` to hijack the query", "It runs too slowly", "Single quotes aren't valid SQL", "It breaks JSON formatting"],
          answer: "SQL Injection — an attacker can input `' OR '1'='1` to hijack the query",
          hint: "Mixing user input directly into SQL syntax lets input become executable SQL commands!",
          whyEasy: "ALWAYS use Parameterized Queries / Prepared Statements (`$1` / `?`) so data can never execute as code."
        },
        {
          type: "mc",
          prompt: "What data structure backs standard SQL indexes (`CREATE INDEX`) in PostgreSQL & MySQL?",
          options: ["B-Tree (self-balancing multi-way search tree, `O(log n)`)", "Unsorted Linked List", "LIFO Stack", "PNG Bitmap"],
          answer: "B-Tree (self-balancing multi-way search tree, `O(log n)`)",
          hint: "B-Trees stay shallow and support both exact `=` and range `>`, `BETWEEN` lookups!",
          whyEasy: "B-Tree indexes keep disk page reads tiny (`3–4` hops for millions of rows!)."
        },
        {
          type: "mc",
          prompt: "What is the main goal of Database Normalization (1NF → 3NF)?",
          options: ["Eliminate redundant duplicate data so updates never leave inconsistent copies", "Combine all tables into one giant CSV file", "Encrypt all column names", "Remove all Primary Keys"],
          answer: "Eliminate redundant duplicate data so updates never leave inconsistent copies",
          hint: "If a guild changes its name, updating 1 row in `guilds` beats updating 10,000 hero rows!",
          whyEasy: "One source of truth per entity prevents update, insert, and delete anomalies."
        }
      ]
    },
    {
      id: "be-rest-apis-json-status-codes",
      worldId: "backend_sql_dev",
      order: 200,
      title: "REST APIs, HTTP Verbs, Idempotency & Status Codes",
      icon: "🌐",
      tagline: "Design clean backend endpoints that frontend and mobile clients love.",
      scaryVersion: "Representational State Transfer architectural constraints utilizing uniform resource identifiers, stateless verbs, and semantic status codes.",
      easyTruth: "REST treats everything as a **Resource noun** (`/api/quests/42`) and uses **HTTP Verbs** for the action: `GET` (read), `POST` (create), `PUT`/`PATCH` (replace/update), `DELETE` (remove) — replying with 3-digit Status Codes (`2xx` Win, `4xx` Your fault, `5xx` Server fault)!",
      microSteps: [
        { label: "Step 1: Nouns in URLs, Verbs in HTTP Methods", text: "Good: `DELETE /api/users/7`. Bad: `GET /api/deleteUser?id=7` (never mutate state on `GET`!)." },
        { label: "Step 2: Idempotency Matters on Flaky Networks", text: "Calling `GET`, `PUT`, or `DELETE` twice leaves the same final state (Idempotent!). Calling `POST /orders` twice creates TWO orders unless guarded by an Idempotency Key!" },
        { label: "Step 3: Master the Status Code Families", text: "`200 OK`, `201 Created`, `204 No Content` · `400 Bad Request`, `401 Unauthorized` (who are you?), `403 Forbidden` (not allowed!), `404 Not Found`, `429 Too Many Requests` · `500/502/503` Server crash/overload." }
      ],
      cheatCode: "`2xx` Success · `3xx` Redirect · `4xx` Client bug (`401` login vs `403` permission) · `5xx` Server crash! `GET/PUT/DELETE` = Idempotent.",
      visualizerId: "backendSystemTerminalLab",
      forgeQuestId: "js-functional-pipeline",
      codeExample: {
        lang: "javascript",
        fileName: "rest_client.js",
        code: "const res = await fetch('/api/quests', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ title: 'Build Cache', xp: 400 })\n});\n// Expect 201 Created + JSON body\nif (res.status === 201) console.log(await res.json());",
        output: "201 Created · { id: 106, title: 'Build Cache', xp: 400 }"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "What is the exact difference between HTTP `401 Unauthorized` and `403 Forbidden`?",
          options: ["`401` = Not logged in / invalid credentials; `403` = Logged in, but lacks permission for this resource", "`401` = Server crashed; `403` = Page not found", "`403` means expired password; `401` means rate limit", "They are identical"],
          answer: "`401` = Not logged in / invalid credentials; `403` = Logged in, but lacks permission for this resource",
          hint: "`401` = 'Show me your ID badge!' · `403` = 'I see your badge, but this room is Admin-Only!'",
          whyEasy: "Authentication = `401`; Authorization/Permissions = `403`!"
        },
        {
          type: "mc",
          prompt: "Which HTTP method is NOT idempotent (retrying it on a flaky mobile network could charge a customer twice)?",
          options: ["`POST` (creates a new resource each call)", "`GET` (read-only)", "`PUT` (replaces resource to exact state)", "`DELETE` (ensures resource is absent)"],
          answer: "`POST` (creates a new resource each call)",
          hint: "Retrying `POST /payments` without an Idempotency-Key creates duplicate records!",
          whyEasy: "`GET`, `PUT`, `DELETE` are idempotent; `POST` creates new entries every time."
        },
        {
          type: "mc",
          prompt: "A `POST /api/heroes` request successfully creates a new hero record. Which status code is the most accurate REST response?",
          options: ["`201 Created`", "`404 Not Found`", "`301 Moved Permanently`", "`500 Internal Server Error`"],
          answer: "`201 Created`",
          hint: "`200` is generic OK, while `201` specifically signals a brand-new resource was created!",
          whyEasy: "`201 Created` cleanly communicates successful creation."
        },
        {
          type: "mc",
          prompt: "An API client hits your endpoint 500 times in 1 second and triggers your rate limiter. Which status code should you return?",
          options: ["`429 Too Many Requests`", "`200 OK`", "`404 Not Found`", "`204 No Content`"],
          answer: "`429 Too Many Requests`",
          hint: "Rate limiting is a client-side throttling signal in the `4xx` family!",
          whyEasy: "`429` + a `Retry-After` header tells clients to back off gracefully."
        },
        {
          type: "mc",
          prompt: "What distinguishes `PUT` from `PATCH` when updating `/api/users/42`?",
          options: ["`PUT` replaces the full resource representation; `PATCH` applies a partial field update", "`PATCH` deletes the user; `PUT` reads it", "`PUT` only sends HTML; `PATCH` sends XML", "They cannot carry a JSON body"],
          answer: "`PUT` replaces the full resource representation; `PATCH` applies a partial field update",
          hint: "Updating only `{ \"bio\": \"Backend Dev\" }` is a partial `PATCH`!",
          whyEasy: "`PUT` = full replacement; `PATCH` = surgical partial edit."
        }
      ]
    },
    {
      id: "be-auth-hashing-jwt-oauth",
      worldId: "backend_sql_dev",
      order: 201,
      title: "Auth, Password Hashing (Argon2/bcrypt) & JWTs",
      icon: "🔐",
      tagline: "Never store plaintext passwords — understand salting, HMAC signatures, and JWT pitfalls.",
      scaryVersion: "Cryptographic key-derivation authentication, salted one-way digests, and stateless signed JSON Web Token authorization claims.",
      easyTruth: "**Encryption** is a lockbox with a key (reversible). **Hashing** is a meat grinder (one-way — you can't turn a burger back into a cow!). And a **JWT** (`header.payload.signature`) is a tamper-proof wristband: anyone can READ the Base64 payload, so NEVER put secrets inside it — only the server's signature prevents forgery!",
      microSteps: [
        { label: "Step 1: Passwords = Slow Salted Hash (`Argon2` / `bcrypt`)", text: "Add a unique random **Salt** per user (defeats Rainbow Tables!) and run a deliberately SLOW hash (defeats GPU brute force!). NEVER use fast `MD5`/`SHA-256` alone for passwords." },
        { label: "Step 2: Anatomy of a JWT (`AAA.BBB.CCC`)", text: "Part 1: `Header` (alg). Part 2: `Payload` (userId, exp — **Base64url encoded, NOT encrypted!**). Part 3: `Signature` (`HMAC(header.payload, SECRET)`)." },
        { label: "Step 3: Safe Token Storage & HTTPS", text: "Store session/refresh tokens in `HttpOnly; Secure; SameSite=Lax` cookies so XSS JavaScript cannot steal them via `localStorage`!" }
      ],
      cheatCode: "Passwords → Slow Salted Hash (`Argon2`/`bcrypt`). JWT Payload is PUBLIC Base64 (signed, NOT encrypted)! Cookies → `HttpOnly`!",
      visualizerId: "backendSystemTerminalLab",
      forgeQuestId: "py-freq-counter",
      codeExample: {
        lang: "javascript",
        fileName: "jwt_inspect.js",
        code: "// JWT = header.payload.signature\n// Payload is just Base64 — readable by anyone!\nconst payload = { sub: 'hero_42', role: 'admin', exp: 1900000000 };\nconsole.log('Signed, NOT encrypted:', JSON.stringify(payload));",
        output: "Signed, NOT encrypted: {\"sub\":\"hero_42\",\"role\":\"admin\",\"exp\":1900000000}"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Why is putting a user's credit card number or password inside a JWT payload a severe mistake?",
          options: ["JWT payloads are merely Base64-encoded (anyone can decode & read them instantly — they are signed, not encrypted)", "JWT payloads can only hold numbers", "Browsers reject JSON inside JWTs", "Base64 crashes on strings"],
          answer: "JWT payloads are merely Base64-encoded (anyone can decode & read them instantly — they are signed, not encrypted)",
          hint: "Signing proves nobody TAMPERED with the payload — it does NOT hide it!",
          whyEasy: "Base64 is encoding, NOT encryption — keep JWT claims non-sensitive (`sub`, `role`, `exp`)."
        },
        {
          type: "mc",
          prompt: "What is the purpose of adding a unique random **Salt** to every user's password before hashing?",
          options: ["Two users with the exact same password get completely different hashes, defeating Rainbow Table attacks", "It compresses the database size", "It lets admins decrypt the password later", "It skips HTTPS"],
          answer: "Two users with the exact same password get completely different hashes, defeating Rainbow Table attacks",
          hint: "Without salt, precomputed lookup tables crack `password123` across millions of rows instantly!",
          whyEasy: "Unique per-user salt forces attackers to crack one user at a time."
        },
        {
          type: "mc",
          prompt: "Why are `Argon2` and `bcrypt` preferred over plain `SHA-256` for storing user passwords?",
          options: ["They are intentionally slow & memory-hard, making GPU brute-force guessing thousands of times harder", "`SHA-256` is reversible", "`bcrypt` is faster than `SHA-256`", "`SHA-256` only hashes 8 characters"],
          answer: "They are intentionally slow & memory-hard, making GPU brute-force guessing thousands of times harder",
          hint: "Modern GPUs compute billions of `SHA-256` hashes/sec — password hashing WANTS controlled slowness!",
          whyEasy: "Fast hash = checksums/Git; Slow salted hash = passwords!"
        },
        {
          type: "mc",
          prompt: "What happens if an attacker edits a JWT's payload from `role: 'user'` to `role: 'admin'` without knowing the server's secret key?",
          options: ["The server's signature verification FAILS and rejects the forged token with `401`", "The server accepts them as admin", "The token re-signs itself automatically", "The database resets"],
          answer: "The server's signature verification FAILS and rejects the forged token with `401`",
          hint: "Changing even 1 bit of the payload invalidates the HMAC cryptographic signature!",
          whyEasy: "Signature mismatch immediately catches tampered JWT claims."
        },
        {
          type: "mc",
          prompt: "Why does setting the `HttpOnly` flag on an auth session cookie protect against XSS attacks?",
          options: ["Browser JavaScript (`document.cookie`) is blocked from reading `HttpOnly` cookies", "It disables HTTPS", "It hides the cookie from the server too", "It encrypts HTML tags"],
          answer: "Browser JavaScript (`document.cookie`) is blocked from reading `HttpOnly` cookies",
          hint: "Even if injected JS runs on the page, it cannot exfiltrate an `HttpOnly` cookie!",
          whyEasy: "`HttpOnly + Secure + SameSite` is the gold-standard web session defense."
        }
      ]
    },
    {
      id: "be-linux-cli-pipes-permissions",
      worldId: "backend_sql_dev",
      order: 202,
      title: "Linux Shell, Pipes (`|`), `grep` & File Permissions",
      icon: "🐧",
      tagline: "Command servers, search gigabytes of logs in 1 line, and decode `chmod 755`.",
      scaryVersion: "POSIX command-line stream redirection, inter-process piping, regular-expression log filtering, and octal permission bitmasks.",
      easyTruth: "The Unix philosophy is **Lego bricks**: every tiny command does one job (`cat`, `grep`, `sort`, `wc`) and the Pipe (`|`) plugs the output of one directly into the input of the next! And `chmod` is just 3 binary bits per group: `r=4, w=2, x=1`!",
      microSteps: [
        { label: "Step 1: Navigation & Inspection", text: "`pwd` (where am I?), `ls -la` (list all + permissions), `cd ..` (parent dir), `cat` / `head` / `tail -f` (inspect live logs)." },
        { label: "Step 2: Streams, Pipes (`|`) & Redirection (`>`, `>>`)", text: "`grep ERROR server.log | wc -l` counts error lines without temp files! `>` overwrites a file; `>>` appends cleanly." },
        { label: "Step 3: Octal Permissions (`r=4, w=2, x=1`)", text: "Three digits = `[Owner][Group][Others]`. `7 = 4+2+1 (rwx)`, `5 = 4+1 (r-x)`, `4 = r--`. So `chmod 755` = owner full, others read+run!" }
      ],
      cheatCode: "Pipe `|` chains stdout → stdin. `>` overwrites, `>>` appends. `chmod`: `r=4, w=2, x=1` (`755 = rwxr-xr-x`, `600 = rw-------`)!",
      visualizerId: "backendSystemTerminalLab",
      forgeQuestId: "cli-log-sleuth",
      codeExample: {
        lang: "shell",
        fileName: "triage.sh",
        code: "$ pwd\n/workspace/everylingo-app\n$ grep ERROR logs/server.log\nERROR db timeout on shard-2\nERROR auth token expired",
        output: "2 matching ERROR lines found cleanly"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "What does the pipe operator `|` do in `cat access.log | grep 500 | wc -l`?",
          options: ["Sends stdout of each command directly as stdin to the next, counting lines containing `500`", "Runs all 3 commands only if the first fails", "Deletes lines containing `500`", "Compresses `access.log` into a zip"],
          answer: "Sends stdout of each command directly as stdin to the next, counting lines containing `500`",
          hint: "`cat` outputs lines → `grep 500` filters them → `wc -l` counts the surviving lines!",
          whyEasy: "Pipes compose tiny utilities into instant data-processing pipelines!"
        },
        {
          type: "mc",
          prompt: "Decode `chmod 755 deploy.sh` using `r=4, w=2, x=1`:",
          options: ["Owner: `rwx` (7), Group: `r-x` (5), Others: `r-x` (5)", "Everyone gets write access", "Read-only for everyone", "Owner: `r--`, Others: `rwx`"],
          answer: "Owner: `rwx` (7), Group: `r-x` (5), Others: `r-x` (5)",
          hint: "`7 = 4+2+1 (rwx)` and `5 = 4+0+1 (r-x)`!",
          whyEasy: "Standard executable script permission: owner can edit & run, everyone else can read & run."
        },
        {
          type: "mc",
          prompt: "What is the critical difference between `echo 'hi' > notes.txt` and `echo 'hi' >> notes.txt`?",
          options: ["`>` overwrites the entire file; `>>` appends safely to the end", "`>>` deletes the file", "`>` only works on directories", "They do the exact same thing"],
          answer: "`>` overwrites the entire file; `>>` appends safely to the end",
          hint: "One arrow replaces; double arrow adds onto the bottom!",
          whyEasy: "Using `>` by mistake instead of `>>` is a classic log-wiping mishap — double arrow appends!"
        },
        {
          type: "mc",
          prompt: "Which permission mode locks down a private SSH key (`id_ed25519`) so ONLY the owner can read/write and nobody else has any access?",
          options: ["`chmod 600` (`rw-------`)", "`chmod 777` (`rwxrwxrwx`)", "`chmod 444` (`r--r--r--`)", "`chmod 000` (`---------`)"],
          answer: "`chmod 600` (`rw-------`)",
          hint: "Owner read (4) + write (2) = `6`; Group `0`; Others `0`!",
          whyEasy: "SSH actually refuses to use a private key unless permissions are tight like `600`!"
        },
        {
          type: "mc",
          prompt: "What does `cd ..` do in any Linux/macOS terminal?",
          options: ["Moves up one level to the parent directory", "Deletes the current directory", "Shows hidden files", "Jumps to the root `/` directory always"],
          answer: "Moves up one level to the parent directory",
          hint: "`.` = current directory, `..` = parent directory!",
          whyEasy: "`cd ..` climbs one folder up; `cd ~` jumps home."
        }
      ]
    },
    {
      id: "be-git-internals-branching-rebase",
      worldId: "backend_sql_dev",
      order: 203,
      title: "Git Workflows: Commits, Branches, Merge vs Rebase",
      icon: "🌿",
      tagline: "Think in Git's Commit Graph (DAG) — never fear branches or merge conflicts again.",
      scaryVersion: "Content-addressable directed acyclic commit graph traversal, three-way tree merging, and history-rewriting patch replay.",
      easyTruth: "A Git Branch is NOT a copied folder — it is literally a **41-byte sticky note pointer** to a commit hash! `HEAD` points to your active branch. **Merge** ties two branches together keeping true history; **Rebase** replays your local commits cleanly on top of the latest `main`!",
      microSteps: [
        { label: "Step 1: The 3 Git Zones", text: "**Working Tree** (edits on disk) → `git add` → **Staging Area** (next snapshot) → `git commit` → **Local Repo History**." },
        { label: "Step 2: Branching is Cheap (`O(1)`)", text: "`git checkout -b feat/login` creates a new branch pointer instantly so `main` stays deployable while you experiment." },
        { label: "Step 3: Golden Rule of Rebase", text: "Rebase makes linear history on your PRIVATE feature branch, but **NEVER rebase commits already pushed to a shared `main` branch** — it rewrites commit hashes!" }
      ],
      cheatCode: "Working → `git add` → Staging → `git commit`. Branches are cheap pointers! Never `git rebase` shared public branches!",
      visualizerId: "backendSystemTerminalLab",
      forgeQuestId: "git-branch-merge",
      codeExample: {
        lang: "shell",
        fileName: "git_flow.sh",
        code: "$ git checkout -b feat-auth\n$ git add .\n$ git commit -m \"feat: add JWT guard\"\n$ git checkout main\n$ git merge feat-auth",
        output: "Merge made cleanly: feat-auth → main"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Under the hood, what IS a Git branch like `feat-login`?",
          options: ["A lightweight movable pointer to a specific commit hash", "A complete duplicate copy of all repository files on disk", "A remote server container", "A zip archive of diffs"],
          answer: "A lightweight movable pointer to a specific commit hash",
          hint: "That's why creating a branch in a 500,000-file repo takes milliseconds!",
          whyEasy: "Branches are just tiny pointers in `.git/refs/heads/`!"
        },
        {
          type: "mc",
          prompt: "Why is `git add <file>` needed before `git commit`?",
          options: ["It moves chosen changes into the Staging Area so you can craft clean, focused commits", "It uploads code straight to GitHub", "It formats your Python code", "It creates a new branch"],
          answer: "It moves chosen changes into the Staging Area so you can craft clean, focused commits",
          hint: "Staging lets you commit a bug fix separately from half-finished experimental edits!",
          whyEasy: "Working Tree → `git add` (Stage) → `git commit` (Snapshot)."
        },
        {
          type: "mc",
          prompt: "Why must you NEVER run `git rebase` on commits already pushed to a shared `main` branch?",
          options: ["Rebase creates brand-new commit hashes, breaking everyone else's synced history", "Rebase deletes all files in `main`", "Git forbids rebasing more than 2 commits", "Rebase only works on Python files"],
          answer: "Rebase creates brand-new commit hashes, breaking everyone else's synced history",
          hint: "Rewriting public history forces destructive force-pushes and duplicate commit chaos!",
          whyEasy: "Rebase local private branches freely; merge (or squash-merge) onto shared `main`!"
        },
        {
          type: "mc",
          prompt: "When does a Git **merge conflict** happen?",
          options: ["When two branches edited the exact same lines of the same file differently", "Whenever two branches edit completely different files", "Every time you run `git pull`", "When a commit message is too short"],
          answer: "When two branches edited the exact same lines of the same file differently",
          hint: "Git merges different files or separate regions automatically — it only pauses when human judgment is needed!",
          whyEasy: "Resolve `<<<<<<< / ======= / >>>>>>>`, run `git add`, then `git commit`!"
        },
        {
          type: "mc",
          prompt: "What does `git checkout -b fix-bug` (or `git switch -c fix-bug`) do?",
          options: ["Creates a new branch named `fix-bug` AND immediately switches `HEAD` onto it", "Deletes the `fix-bug` branch", "Merges `fix-bug` into `main`", "Reverts the last commit"],
          answer: "Creates a new branch named `fix-bug` AND immediately switches `HEAD` onto it",
          hint: "`-b` / `-c` = create + switch in one command!",
          whyEasy: "One command to safely branch off before touching code."
        }
      ]
    },
    {
      id: "be-docker-ci-system-design",
      worldId: "backend_sql_dev",
      order: 204,
      title: "Docker Containers, Caching, Load Balancers & System Design",
      icon: "🏗️",
      tagline: "Ship identical code everywhere and scale backends from 100 to 10M users.",
      scaryVersion: "OS-level container virtualization, horizontal stateless load distribution, cache-aside latency reduction, and distributed CAP trade-offs.",
      easyTruth: "**Docker** packs your app + exact runtime dependencies into a lightweight shipping container so 'works on my machine' dies forever! To scale: put a **Load Balancer** in front of stateless servers, put **Redis Cache** in front of your SQL database, and push slow jobs (emails/videos) onto a **Message Queue**!",
      microSteps: [
        { label: "Step 1: Docker Image vs Container", text: "A **Dockerfile** is the recipe → builds an immutable **Image** (blueprint) → runs one or more live **Containers** (much lighter than full VMs because they share the host OS kernel!)." },
        { label: "Step 2: Vertical vs Horizontal Scaling", text: "**Vertical** = buy a bigger server (hits a hardware ceiling!). **Horizontal** = add 10 cheap stateless servers behind a **Load Balancer** (scales massively + fault-tolerant!)." },
        { label: "Step 3: Cache-Aside & Async Queues", text: "Check Redis RAM cache (~0.5ms) BEFORE hitting disk SQL (~20ms). Offload slow tasks (sending emails, rendering PDFs) to a background Queue so APIs reply in <50ms!" }
      ],
      cheatCode: "Image = Class/Blueprint; Container = Running Instance. Scale = Stateless Servers + Load Balancer + Redis Cache + Async Queue!",
      visualizerId: "backendSystemTerminalLab",
      forgeQuestId: "git-repo-rescue",
      codeExample: {
        lang: "shell",
        fileName: "Dockerfile",
        code: "# Blueprint for reproducible backend container\n# FROM python:3.12-slim\n# WORKDIR /app\n# COPY requirements.txt .\n# RUN pip install -r requirements.txt\n# COPY . .\n# CMD [\"uvicorn\", \"main:app\", \"--port\", \"8000\"]\necho \"Build: docker build -t api:v1 .\"",
        output: "Build: docker build -t api:v1 ."
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Why are Docker Containers much lighter and faster to boot than full Virtual Machines (VMs)?",
          options: ["Containers share the host OS kernel instead of booting a full separate guest operating system", "Containers don't use RAM", "Containers only run HTML", "VMs cannot run Linux"],
          answer: "Containers share the host OS kernel instead of booting a full separate guest operating system",
          hint: "Each VM boots an entire OS kernel (GBs, minutes); a container isolates just the process & filesystem (MBs, milliseconds)!",
          whyEasy: "Shared host kernel = fast startup, tiny footprint, reproducible environments!"
        },
        {
          type: "mc",
          prompt: "In the **Cache-Aside** pattern with Redis + PostgreSQL, what happens on a **Cache Miss**?",
          options: ["App queries PostgreSQL, saves the result into Redis with a TTL, and returns it to the user", "App returns `404 Not Found` immediately", "Redis deletes the database", "The user must refresh 5 times"],
          answer: "App queries PostgreSQL, saves the result into Redis with a TTL, and returns it to the user",
          hint: "Miss = pay DB cost once, populate RAM cache so the next 10,000 requests hit RAM in <1ms!",
          whyEasy: "Cache-aside + TTL prevents stale data while absorbing massive read traffic."
        },
        {
          type: "mc",
          prompt: "Why must web servers behind a Horizontal **Load Balancer** stay **stateless** (not store user sessions only in local server RAM)?",
          options: ["The next request from the same user may be routed to a DIFFERENT server instance", "RAM cannot store strings", "Load balancers forbid cookies", "Stateless servers don't need CPUs"],
          answer: "The next request from the same user may be routed to a DIFFERENT server instance",
          hint: "Store shared session state in Redis/DB or signed JWTs so ANY server can serve ANY request!",
          whyEasy: "Stateless servers let you auto-scale from 2 to 50 instances seamlessly."
        },
        {
          type: "mc",
          prompt: "When a user signs up, generating a welcome PDF + sending an email takes 4 seconds. What's the best architecture?",
          options: ["Push a job onto an Async Message Queue (worker processes it) and return `201 Created` in 40ms", "Make the user stare at a spinner for 4 seconds", "Skip sending emails forever", "Run it inside CSS"],
          answer: "Push a job onto an Async Message Queue (worker processes it) and return `201 Created` in 40ms",
          hint: "Decouple slow I/O from the synchronous HTTP request lifecycle!",
          whyEasy: "Queues keep API latency tiny and allow automatic retries if the email provider hiccups."
        },
        {
          type: "mc",
          prompt: "What does **CI/CD** (Continuous Integration / Continuous Deployment) automate on every Git push?",
          options: ["Automatically runs linters, unit tests, builds artifacts, and deploys passing code safely", "Replaces Git with email attachments", "Disables all automated tests", "Only backs up CSS files"],
          answer: "Automatically runs linters, unit tests, builds artifacts, and deploys passing code safely",
          hint: "Catch broken code BEFORE it reaches production users!",
          whyEasy: "CI proves every commit passes tests; CD ships verified builds reliably."
        }
      ]
    },

    // -------- WORLD 24: MODERN JS, TYPESCRIPT & CLEAN ARCHITECTURE (8 NODES) --------
    {
      id: "js-closures-scope-hoisting",
      worldId: "js_ts_architecture",
      order: 205,
      title: "JS Closures, Lexical Scope, `let`/`const` & `this`",
      icon: "🎒",
      tagline: "Understand why inner JS functions carry a 'backpack' of outer variables forever.",
      scaryVersion: "Lexical environment capture across nested function closures, temporal dead zones, and dynamic invocation context binding.",
      easyTruth: "A **Closure** is a function's **backpack**: when an outer function creates a variable (`count = 0`) and returns an inner function, that inner function packs `count` into its private backpack — nobody outside can tamper with `count`, yet the inner function remembers and updates it on every call!",
      microSteps: [
        { label: "Step 1: `const` > `let`, Never `var`", text: "`let` and `const` are **block-scoped** (`{ ... }`), preventing classic loop leaks. `var` leaks out of `if`/`for` blocks into the whole function!" },
        { label: "Step 2: How Closures Create Private State", text: "`function makeCounter() { let n = 0; return () => ++n; }` — each call to `makeCounter()` gets its own isolated private `n`!" },
        { label: "Step 3: Arrow Functions & `this`", text: "Regular `function()` binds `this` by *how it is called*. Arrow `() => {}` inherits `this` lexically from its surrounding scope — no more broken callback `this`!" }
      ],
      cheatCode: "Closure = Function + its Lexical Backpack! Always use `const` (or `let` when reassigning), never `var`.",
      visualizerId: "htmlCssLivePlayground",
      forgeQuestId: "js-closure-counter",
      codeExample: {
        lang: "javascript",
        fileName: "closure_backpack.js",
        code: "function makeCounter(start = 0) {\n  let count = start;\n  return () => {\n    count += 1;\n    return count;\n  };\n}\nconst next = makeCounter(10);\nconsole.log(next(), next(), next());",
        output: "11 12 13"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "What does this Closure snippet print?",
          codeBlock: "function makeAdder(x) {\n  return (y) => x + y;\n}\nconst add5 = makeAdder(5);\nconsole.log(add5(12));",
          options: ["17", "5", "12", "ReferenceError"],
          answer: "17",
          hint: "`add5` carries `x = 5` in its closure backpack even after `makeAdder(5)` returned!",
          whyEasy: "`x = 5` + `y = 12` = `17` via lexical closure."
        },
        {
          type: "mc",
          prompt: "Why does `const user = { xp: 10 }; user.xp = 20;` succeed without throwing an error?",
          options: ["`const` prevents reassigning the variable binding, NOT mutating properties inside an object/array", "`const` is identical to `var`", "JavaScript ignores `const` on objects", "Numbers are mutable"],
          answer: "`const` prevents reassigning the variable binding, NOT mutating properties inside an object/array",
          hint: "You can't do `user = {}`, but you CAN edit contents inside the referenced object!",
          whyEasy: "`const` locks the pointer reference; `Object.freeze()` freezes properties."
        },
        {
          type: "mc",
          prompt: "What is the key bug avoided by using `let i = 0` instead of `var i = 0` inside a `for` loop with `setTimeout`?",
          options: ["`let` creates a fresh per-iteration binding (`0, 1, 2`), whereas `var` shares one variable (`3, 3, 3`)", "`var` cannot count past 10", "`let` makes `setTimeout` synchronous", "`var` only works with strings"],
          answer: "`let` creates a fresh per-iteration binding (`0, 1, 2`), whereas `var` shares one variable (`3, 3, 3`)",
          hint: "With `var`, all 3 callbacks close over the SAME `i` after the loop finishes!",
          whyEasy: "Block-scoped `let` gives each loop iteration its own clean closure snapshot."
        },
        {
          type: "mc",
          prompt: "How does an Arrow Function `() => {}` determine the value of `this`?",
          options: ["Lexically inherits `this` from its enclosing scope where it was defined", "Always binds `this` to `window`", "Creates a brand-new empty object for `this`", "Throws an error if `this` is referenced"],
          answer: "Lexically inherits `this` from its enclosing scope where it was defined",
          hint: "That's why arrow functions inside class event handlers don't lose `this`!",
          whyEasy: "Arrow functions don't have their own `this` — they capture the outer `this`."
        },
        {
          type: "mc",
          prompt: "If you call `const a = makeCounter(); const b = makeCounter();` and invoke `a()` three times, what does `b()` return?",
          options: ["`1` — each `makeCounter()` call creates an independent closure environment", "`4` — they share the same global count", "`0`", "`undefined`"],
          answer: "`1` — each `makeCounter()` call creates an independent closure environment",
          hint: "Every outer invocation spawns its own brand-new backpack!",
          whyEasy: "`a` and `b` have completely separate private `count` variables."
        }
      ]
    },
    {
      id: "js-functional-map-filter-reduce",
      worldId: "js_ts_architecture",
      order: 206,
      title: "Functional Pipelines: `.map()`, `.filter()`, `.reduce()`",
      icon: "⚙️",
      tagline: "Transform arrays declaratively without messy mutation bugs.",
      scaryVersion: "Higher-order immutable functor mapping, predicate filtering, and left-fold catamorphism aggregation.",
      easyTruth: "Think of an assembly line: **`.filter()`** is the bouncer (keeps matching items, same or fewer items), **`.map()`** is the paint booth (transforms every item 1-to-1, exact same length!), and **`.reduce()`** is the snowball (folds the whole array down into ONE final total, object, or summary)!",
      microSteps: [
        { label: "Step 1: `.map(fn)` — Same Length, New Values", text: "`[1, 2, 3].map(x => x * 10)` → `[10, 20, 30]`. Original array stays untouched!" },
        { label: "Step 2: `.filter(fn)` — Keep Truthy Matches", text: "`[55, 82, 91].filter(s => s >= 75)` → `[82, 91]`. Never use `.map()` when you want to drop items!" },
        { label: "Step 3: `.reduce((acc, cur) => ..., init)` — One Final Value", text: "ALWAYS pass the initial accumulator `0` (or `{}` / `[]`) as the 2nd argument so empty arrays never crash!" }
      ],
      cheatCode: "Transform all → `.map()`. Keep subset → `.filter()`. Combine to 1 value/object → `.reduce((acc, x) => ..., init)`!",
      visualizerId: "htmlCssLivePlayground",
      forgeQuestId: "js-functional-pipeline",
      codeExample: {
        lang: "javascript",
        fileName: "pipeline.js",
        code: "const prices = [120, 45, 200, 30];\nconst bigTotal = prices\n  .filter(p => p >= 100)\n  .map(p => p * 0.9)\n  .reduce((sum, p) => sum + p, 0);\nconsole.log('Discounted total:', bigTotal);",
        output: "Discounted total: 288"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "What does `[1, 2, 3, 4].filter(n => n % 2 === 0).map(n => n * 3)` return?",
          options: ["`[6, 12]`", "`[3, 6, 9, 12]`", "`[2, 4]`", "`18`"],
          answer: "`[6, 12]`",
          hint: "First keep evens `[2, 4]`, then triple each → `[6, 12]`!",
          whyEasy: "Read chained pipelines top-to-bottom like clean English steps."
        },
        {
          type: "mc",
          prompt: "Why should you ALWAYS pass an initial value (like `0` or `{}`) to `.reduce(fn, init)`?",
          options: ["Prevents a `TypeError` crash on empty arrays `[]` and guarantees the accumulator's type", "Makes `.reduce()` mutate the original array", "It is syntactically illegal to omit it in all cases", "It doubles the array length"],
          answer: "Prevents a `TypeError` crash on empty arrays `[]` and guarantees the accumulator's type",
          hint: "`[].reduce((a, b) => a + b)` throws `TypeError`, while `[].reduce((a, b) => a + b, 0)` safely returns `0`!",
          whyEasy: "Explicit `init` handles empty inputs and object grouping effortlessly."
        },
        {
          type: "mc",
          prompt: "How do `.map()` and `.filter()` treat the original array?",
          options: ["They are immutable — they return a brand-new array and leave the original untouched", "They mutate the original array in place", "They delete the original array from memory", "They convert the array to a string"],
          answer: "They are immutable — they return a brand-new array and leave the original untouched",
          hint: "Unlike `.sort()` or `.push()`, `.map`/`.filter` never mutate in place!",
          whyEasy: "Immutability prevents ghost side-effect bugs in React and backend services."
        },
        {
          type: "mc",
          prompt: "Which method is best when you only need the FIRST user whose `id === 42`?",
          options: ["`.find(u => u.id === 42)` (stops immediately on match!)", "`.map(u => u.id === 42)`", "`.reduce()`", "`.join()`"],
          answer: "`.find(u => u.id === 42)` (stops immediately on match!)",
          hint: "`.filter()` scans the whole array and returns `[user]`; `.find()` short-circuits and returns `user` directly!",
          whyEasy: "`.find()` returns the object itself and stops early."
        },
        {
          type: "mc",
          prompt: "What does `const copy = [...arr, 99]` (Spread syntax) do?",
          options: ["Creates a shallow copy of `arr` with `99` appended, without mutating `arr`", "Modifies `arr` in place", "Multiplies every element by 99", "Returns `99`"],
          answer: "Creates a shallow copy of `arr` with `99` appended, without mutating `arr`",
          hint: "Spread `...` unpacks elements cleanly into a new array literal!",
          whyEasy: "Immutable append pattern used everywhere in modern JS & React!"
        }
      ]
    },
    {
      id: "js-async-promises-event-loop",
      worldId: "js_ts_architecture",
      order: 207,
      title: "The Event Loop, Promises & `async`/`await`",
      icon: "🔄",
      tagline: "Predict exact async execution order: Call Stack → Microtasks → Macrotasks!",
      scaryVersion: "Single-threaded non-blocking concurrency model orchestrating microtask promise continuations and macrotask event queue callbacks.",
      easyTruth: "JavaScript has ONE Call Stack (single-threaded), yet never freezes because slow timers & network calls run outside in Web APIs. When the Call Stack empties, the Event Loop ALWAYS drains **ALL Microtasks (`Promise.then` / `await`)** BEFORE running the next **Macrotask (`setTimeout`)**!",
      microSteps: [
        { label: "Step 1: Priority Order of the Event Loop", text: "1) Synchronous Call Stack runs to completion. 2) ALL **Microtasks** (`Promise.then`, `await` resume) drain completely. 3) ONE **Macrotask** (`setTimeout`, click) runs!" },
        { label: "Step 2: `async`/`await` is Clean Promise Syntax", text: "Every `async` function returns a `Promise`. Always wrap `await` in `try { ... } catch (err) { ... }` to handle rejections!" },
        { label: "Step 3: Parallel vs Sequential `await`", text: "Two independent fetches? Don't `await a; await b;` back-to-back (2× slower!). Run `const [a, b] = await Promise.all([fetchA(), fetchB()])` in parallel!" }
      ],
      cheatCode: "Order: Sync Stack → Microtasks (`Promise.then` / `await`) → Macrotasks (`setTimeout`)! Parallel fetches → `Promise.all([...])`!",
      visualizerId: "backendSystemTerminalLab",
      forgeQuestId: "js-async-order",
      codeExample: {
        lang: "javascript",
        fileName: "event_loop.js",
        code: "console.log('1: sync');\nsetTimeout(() => console.log('4: macrotask'), 0);\nPromise.resolve().then(() => console.log('3: microtask'));\nconsole.log('2: sync end');",
        output: "1: sync → 2: sync end → 3: microtask → 4: macrotask"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "What exact order does this classic Event Loop puzzle log?",
          codeBlock: "console.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');",
          options: ["`A, D, C, B`", "`A, B, C, D`", "`A, C, D, B`", "`A, D, B, C`"],
          answer: "`A, D, C, B`",
          hint: "Sync (`A, D`) → Microtask (`C`) → Macrotask (`B`), even with `0ms` timeout!",
          whyEasy: "Microtasks (`Promise.then`) ALWAYS cut in front of Macrotasks (`setTimeout`)!"
        },
        {
          type: "mc",
          prompt: "Two independent API calls each take `300ms`. How long do they take with `await Promise.all([apiA(), apiB()])` vs awaiting sequentially?",
          options: ["`~300ms` in parallel vs `~600ms` sequentially", "`~600ms` in parallel vs `~300ms` sequentially", "`0ms` both ways", "`900ms` with `Promise.all`"],
          answer: "`~300ms` in parallel vs `~600ms` sequentially",
          hint: "`Promise.all` fires both network requests at the same instant!",
          whyEasy: "Never create an accidental async waterfall when two requests don't depend on each other."
        },
        {
          type: "mc",
          prompt: "What does EVERY `async function` return, even if you write `async function f() { return 42; }`?",
          options: ["A `Promise` that resolves to `42`", "Plain raw number `42`", "`undefined`", "An array `[42]`"],
          answer: "A `Promise` that resolves to `42`",
          hint: "The `async` keyword ALWAYS wraps the return value in a Promise!",
          whyEasy: "That's why callers must `await f()` or `f().then(...)` to unwrap `42`."
        },
        {
          type: "mc",
          prompt: "What are the 3 possible lifecycle states of a JavaScript `Promise`?",
          options: ["`pending`, `fulfilled`, `rejected`", "`open`, `paused`, `closed`", "`loading`, `cached`, `deleted`", "`sync`, `async`, `idle`"],
          answer: "`pending`, `fulfilled`, `rejected`",
          hint: "Once settled (fulfilled or rejected), a Promise's result is locked forever!",
          whyEasy: "Pending → Fulfilled (`.then`) or Rejected (`.catch`)."
        },
        {
          type: "mc",
          prompt: "Why does `items.forEach(async (item) => { await save(item); })` NOT wait for all saves to finish before moving to the next line?",
          options: ["`Array.prototype.forEach` ignores returned Promises and doesn't await them — use `for...of` or `Promise.all(items.map(...))`", "`forEach` forbids `async` syntax", "`await` only works on strings", "JavaScript has no `for...of` loop"],
          answer: "`Array.prototype.forEach` ignores returned Promises and doesn't await them — use `for...of` or `Promise.all(items.map(...))`",
          hint: "Classic JS bug! `forEach` fires callbacks and returns `undefined` immediately.",
          whyEasy: "Use `for (const x of items)` for sequential awaits, or `Promise.all(items.map(...))` for parallel!"
        }
      ]
    },
    {
      id: "js-fetch-dom-state-components",
      worldId: "js_ts_architecture",
      order: 208,
      title: "Fetch API, Reactive State & Component Thinking",
      icon: "🧩",
      tagline: "Think like React & modern UI engines: UI = render(State), zero spaghetti DOM bugs.",
      scaryVersion: "Unidirectional state-driven view reconciliation, delegated DOM event propagation, and HTTP response validation.",
      easyTruth: "Old-school spaghetti code mutates 12 DOM elements manually until they get out of sync. Modern UI architecture follows ONE golden formula: **`UI = f(State)`**. Update your single `state` object, re-render cleanly, and remember `fetch()` ONLY rejects on network failure — ALWAYS check `if (!res.ok)`!",
      microSteps: [
        { label: "Step 1: The `fetch()` 404 Gotcha", text: "`fetch('/missing')` returns `res.status === 404` WITHOUT throwing into `catch`! Always write `if (!res.ok) throw new Error(res.status)`." },
        { label: "Step 2: Single Source of Truth (`UI = f(state)`)", text: "Store data in JS state (`{ filter: 'all', items: [...] }`), never scrape state back out of DOM text! Change state → call `render()`." },
        { label: "Step 3: Event Delegation & XSS Defense", text: "Attach ONE listener to a parent list (`e.target.closest('[data-id]')`) instead of 500 listeners, and use `textContent` (or escape HTML) for user input to prevent XSS!" }
      ],
      cheatCode: "`UI = f(state)`. Always check `if (!res.ok)` on `fetch()`. Escape user text (`textContent`) to block XSS!",
      visualizerId: "htmlCssLivePlayground",
      forgeQuestId: "web-status-card",
      codeExample: {
        lang: "javascript",
        fileName: "safe_fetch.js",
        code: "async function loadHero(id) {\n  const res = await fetch(`/api/heroes/${id}`);\n  if (!res.ok) throw new Error(`HTTP ${res.status}`);\n  return res.json();\n}\nconsole.log('Safe fetch checks res.ok before .json()!');",
        output: "Safe fetch checks res.ok before .json()!"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "What happens when `await fetch('/api/nonexistent')` receives a `404 Not Found` response from the server?",
          options: ["The Promise RESOLVES normally with `res.ok === false` — you MUST check `if (!res.ok)` yourself!", "It automatically throws into `catch`", "It retries 10 times automatically", "It returns `null`"],
          answer: "The Promise RESOLVES normally with `res.ok === false` — you MUST check `if (!res.ok)` yourself!",
          hint: "`fetch()` only rejects when the network itself fails (offline/DNS error)!",
          whyEasy: "Checking `if (!res.ok)` catches 400/401/404/500 responses cleanly."
        },
        {
          type: "mc",
          prompt: "Why is setting `el.innerHTML = userComment` dangerous when `userComment` comes from an untrusted user?",
          options: ["Cross-Site Scripting (XSS) — malicious HTML/scripts in `userComment` execute in victims' browsers", "It makes the font smaller", "`innerHTML` only works on `<table>`", "It crashes CSS Flexbox"],
          answer: "Cross-Site Scripting (XSS) — malicious HTML/scripts in `userComment` execute in victims' browsers",
          hint: "Always use `el.textContent = userComment` or sanitize/escape `< > & \"` first!",
          whyEasy: "`textContent` treats input strictly as literal text — zero script execution."
        },
        {
          type: "mc",
          prompt: "What is **Event Delegation** in DOM programming?",
          options: ["Attaching ONE event listener on a parent container and inspecting `e.target.closest(...)` as clicks bubble up", "Disabling all click events", "Creating 1,000 separate `setInterval` timers", "Sending clicks straight to SQL"],
          answer: "Attaching ONE event listener on a parent container and inspecting `e.target.closest(...)` as clicks bubble up",
          hint: "Saves memory and automatically handles newly added child elements!",
          whyEasy: "Bubbling + `e.target.closest()` = 1 listener for a 10,000-row table!"
        },
        {
          type: "mc",
          prompt: "What core principle powers React, Vue, Svelte, and EveryLingo's own render loop?",
          options: ["Unidirectional flow: `UI = render(state)` from a single source of truth", "Random DOM mutations without state", "Storing database passwords in HTML attributes", "Polling the DOM every 1ms"],
          answer: "Unidirectional flow: `UI = render(state)` from a single source of truth",
          hint: "Change state → derive the UI deterministically!",
          whyEasy: "When state drives UI, visual glitches from stale DOM disappear."
        },
        {
          type: "mc",
          prompt: "What does `e.preventDefault()` do inside a `<form>` `submit` listener?",
          options: ["Stops the browser's default full-page reload so your JS can validate & submit cleanly", "Cancels CSS animations", "Deletes the form inputs", "Blocks `console.log`"],
          answer: "Stops the browser's default full-page reload so your JS can validate & submit cleanly",
          hint: "Without it, submitting a form refreshes the entire web page!",
          whyEasy: "Essential first line of any SPA form handler."
        }
      ]
    },
    {
      id: "ts-types-interfaces-generics",
      worldId: "js_ts_architecture",
      order: 209,
      title: "TypeScript: Static Types, Unions, Narrowing & Generics",
      icon: "📘",
      tagline: "Catch `undefined is not a function` BEFORE your code even runs!",
      scaryVersion: "Structural static type checking, algebraic discriminated unions, control-flow type narrowing, and parametric polymorphism.",
      easyTruth: "TypeScript is JavaScript with a **compile-time co-pilot**. Types vanish completely at runtime (zero runtime overhead!), yet while you code, TypeScript proves you didn't misspell `.lenght`, pass a string where a number belongs, or forget to handle `null`!",
      microSteps: [
        { label: "Step 1: Structural Types & Unions (`|`)", text: "`type Status = 'idle' | 'loading' | 'done'` forbids typos like `'laoding'` immediately in your editor!" },
        { label: "Step 2: Type Narrowing (`typeof`, `in`, Discriminated Unions)", text: "If `x: string | number`, inside `if (typeof x === 'string')` TypeScript automatically narrows `x` to `string`!" },
        { label: "Step 3: Generics (`<T>`) = Type-Safe Reusable Boxes", text: "`function first<T>(arr: T[]): T | undefined` preserves the exact element type (`number` in → `number` out) instead of losing safety with `any`!" }
      ],
      cheatCode: "Types erase at runtime (0ms cost). Prefer `unknown` + narrowing over `any`. Generics `<T>` keep reusable functions 100% type-safe!",
      visualizerId: "htmlCssLivePlayground",
      forgeQuestId: "js-group-by",
      codeExample: {
        lang: "javascript",
        fileName: "generics.ts",
        code: "// TypeScript Generic + Discriminated Union:\n// type Result<T> = { ok: true; data: T } | { ok: false; err: string };\nfunction first(arr) { return arr[0]; }\nconsole.log(first(['TS', 'JS', 'Py']));",
        output: "TS"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "What happens to TypeScript type annotations (`: number`, `interface Hero`) after compiling to JavaScript?",
          options: ["They are completely erased — zero runtime overhead in the browser/Node", "They double runtime CPU usage", "They are sent to a remote TypeScript server", "They turn into SQL tables"],
          answer: "They are completely erased — zero runtime overhead in the browser/Node",
          hint: "TypeScript checks types at COMPILE time, then emits clean standard JS!",
          whyEasy: "Compile-time safety with zero production performance penalty."
        },
        {
          type: "mc",
          prompt: "Why is `unknown` much safer than `any` when handling untrusted JSON data in TypeScript?",
          options: ["`unknown` forces you to narrow/check the type before using it; `any` turns off type-checking completely", "`any` is slower at runtime", "`unknown` only allows numbers", "They are identical"],
          answer: "`unknown` forces you to narrow/check the type before using it; `any` turns off type-checking completely",
          hint: "`any` lets `data.foo.bar()` compile even if `data` is `null`!",
          whyEasy: "`unknown` = 'I don't know yet, force me to verify!' — `any` = 'disable safety seatbelts!'"
        },
        {
          type: "mc",
          prompt: "Why use a Generic `function identity<T>(x: T): T` instead of `function identity(x: any): any`?",
          options: ["`<T>` remembers the exact input type (`number` → `number`) so autocomplete and type checks stay intact", "`<T>` converts everything to strings", "Generics run in a Web Worker", "`any` cannot accept objects"],
          answer: "`<T>` remembers the exact input type (`number` → `number`) so autocomplete and type checks stay intact",
          hint: "Think of `<T>` as a type variable filled automatically from the argument!",
          whyEasy: "Generics give you reuse WITHOUT throwing away type precision."
        },
        {
          type: "mc",
          prompt: "What is a **Discriminated Union** like `{ ok: true; data: User } | { ok: false; error: string }`?",
          options: ["A union of object shapes sharing a literal tag (`ok`) so `if (res.ok)` narrows cleanly to the exact branch", "A SQL `UNION ALL` query", "A CSS class selector", "A loop that breaks early"],
          answer: "A union of object shapes sharing a literal tag (`ok`) so `if (res.ok)` narrows cleanly to the exact branch",
          hint: "Checking `res.ok === true` proves `res.data` exists and `res.error` does not!",
          whyEasy: "Makes illegal states unrepresentable — one of TypeScript's greatest superpowers!"
        },
        {
          type: "mc",
          prompt: "What does `strictNullChecks: true` catch in TypeScript?",
          options: ["Using potentially `null` or `undefined` values without checking them first", "Unused CSS selectors", "Slow SQL queries", "Missing semicolons"],
          answer: "Using potentially `null` or `undefined` values without checking them first",
          hint: "Eliminates the billion-dollar mistake: `Cannot read properties of undefined`!",
          whyEasy: "Forces explicit `?.` optional chaining or `if (user)` guards before dereferencing."
        }
      ]
    },
    {
      id: "code-oop-solid-design-patterns",
      worldId: "js_ts_architecture",
      order: 210,
      title: "OOP, Composition vs Inheritance & Design Patterns",
      icon: "🏛️",
      tagline: "Structure real software that stays easy to extend 6 months from now.",
      scaryVersion: "Object-oriented encapsulation, SOLID architectural heuristics, dependency inversion, and composable behavioral design patterns.",
      easyTruth: "Deep 5-level inheritance trees (`Animal → Mammal → FlyingPet → RoboDog`) turn brittle fast! Senior engineers **favor Composition over Inheritance** (snap small focused behaviors together like Lego blocks) and inject dependencies so code is effortless to swap and unit-test!",
      microSteps: [
        { label: "Step 1: Encapsulation & Single Responsibility (S in SOLID)", text: "Keep a class/module focused on ONE clear job and protect invariants behind clean methods (`hero.takeDamage(dmg)` clamps HP ≥ 0!)." },
        { label: "Step 2: Composition Over Deep Inheritance", text: "Instead of inheriting 12 parent methods you don't want, compose capabilities (`this.logger`, `this.paymentStrategy`) passed into the constructor!" },
        { label: "Step 3: 3 Patterns You Actually Use Weekly", text: "**Strategy** (swap algorithms cleanly, e.g. discount rules), **Observer / Pub-Sub** (event listeners!), **Dependency Injection** (pass `db` / `clock` in so tests use mocks!)." }
      ],
      cheatCode: "Favor Composition over deep Inheritance. Inject dependencies (DI) for effortless testing. Strategy = swappable behavior!",
      visualizerId: "pythonTraceLab",
      forgeQuestId: "py-hero-class",
      codeExample: {
        lang: "python",
        fileName: "hero_oop.py",
        code: "class Hero:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n    def take_damage(self, dmg):\n        self.hp = max(0, self.hp - dmg)\n        return self.hp\n\nh = Hero('Aria', 50)\nprint(h.take_damage(30), h.take_damage(40))",
        output: "20 0"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Why do experienced engineers usually prefer **Composition over deep Inheritance**?",
          options: ["Snapping small focused components together avoids rigid, fragile multi-level parent-child hierarchies", "Inheritance doesn't exist in Python or JS", "Composition eliminates all functions", "Inheritance uses too much disk space"],
          answer: "Snapping small focused components together avoids rigid, fragile multi-level parent-child hierarchies",
          hint: "If a change to a grandparent breaks 7 unrelated subclasses, inheritance got too deep!",
          whyEasy: "'Has-a' (Composition) stays modular and swappable; 'Is-a' (Inheritance) couples tightly."
        },
        {
          type: "mc",
          prompt: "What does the **Single Responsibility Principle** (the `S` in SOLID) advise?",
          options: ["A module or class should have one focused purpose / one primary reason to change", "Every file must contain only 1 line of code", "Only one engineer may touch a repository", "Use only one global variable"],
          answer: "A module or class should have one focused purpose / one primary reason to change",
          hint: "Don't cram SQL queries, email templates, and PDF math into one giant 2,000-line God Class!",
          whyEasy: "Focused modules are easier to read, test, and refactor safely."
        },
        {
          type: "mc",
          prompt: "How does **Dependency Injection** make backend code drastically easier to unit-test?",
          options: ["You pass collaborators (like `emailClient` or `db`) as parameters so tests can pass fast fake mocks instead of hitting real servers", "It injects SQL into HTML", "It automatically generates CSS", "It removes all constructors"],
          answer: "You pass collaborators (like `emailClient` or `db`) as parameters so tests can pass fast fake mocks instead of hitting real servers",
          hint: "You don't want unit tests charging real credit cards or spamming real emails!",
          whyEasy: "Passing dependencies in decouples business logic from external infrastructure."
        },
        {
          type: "mc",
          prompt: "DOM `addEventListener` and Node `EventEmitter` are textbook examples of which Design Pattern?",
          options: ["Observer (Pub-Sub) Pattern", "Singleton Pattern", "Bubble Sort Pattern", "SQL Join Pattern"],
          answer: "Observer (Pub-Sub) Pattern",
          hint: "Subscribers register callbacks and get notified whenever an event fires!",
          whyEasy: "Observer decouples the event emitter from whoever reacts to it."
        },
        {
          type: "mc",
          prompt: "Why does `hero.take_damage(dmg)` using `self.hp = max(0, self.hp - dmg)` demonstrate **Encapsulation**?",
          options: ["It protects the invariant `hp >= 0` in one controlled method instead of letting callers set `hp = -999`", "It hides the code inside a zip file", "It turns integers into strings", "It deletes the `Hero` class"],
          answer: "It protects the invariant `hp >= 0` in one controlled method instead of letting callers set `hp = -999`",
          hint: "Encapsulation guards valid state rules inside the object's own methods!",
          whyEasy: "Invariants enforced at one choke point eliminate scattered bug checks."
        }
      ]
    },
    {
      id: "code-testing-tdd-debugging",
      worldId: "js_ts_architecture",
      order: 211,
      title: "Unit Testing, TDD (Red-Green-Refactor) & Debugging",
      icon: "🧪",
      tagline: "Ship fearlessly with automated tests and hunt bugs scientifically in minutes.",
      scaryVersion: "Test-driven red-green-refactor verification cycles, boundary-value partitioning, and bisection fault isolation.",
      easyTruth: "Guessing randomly while debugging wastes hours. **TDD** flips coding into a game: write a failing test (**Red**), write minimal code to make it pass (**Green**), then clean it up safely (**Refactor**). And when a bug hits, **Binary-Search** your pipeline (check the midpoint!) to cut the suspect code in half every minute!",
      microSteps: [
        { label: "Step 1: Arrange → Act → Assert (AAA)", text: "Every crisp unit test has 3 blocks: set up inputs (**Arrange**), call the function (**Act**), verify expected output (**Assert**)." },
        { label: "Step 2: Always Test Boundary Edge Cases!", text: "Bugs hide at the edges: empty array `[]`, `0`, negative numbers, single element `[x]`, `null`, duplicates, and huge inputs!" },
        { label: "Step 3: Scientific Debugging (Reproduce → Isolate → Fix → Lock)", text: "Never fix blindly! First reproduce consistently, bisect where reality diverges from expectation, fix the root cause, then write a regression test so it NEVER returns!" }
      ],
      cheatCode: "TDD = Red → Green → Refactor. Unit Test = Arrange-Act-Assert. Always test edges: `[]`, `0`, `-1`, `1 item`, `null`!",
      visualizerId: "pythonTraceLab",
      forgeQuestId: "js-chunk-flatten",
      codeExample: {
        lang: "javascript",
        fileName: "tdd_example.js",
        code: "function clamp(val, min, max) {\n  return Math.max(min, Math.min(max, val));\n}\n// Arrange-Act-Assert edge tests:\nconsole.log('In range:', clamp(5, 0, 10) === 5);\nconsole.log('Below min:', clamp(-4, 0, 10) === 0);\nconsole.log('Above max:', clamp(99, 0, 10) === 10);",
        output: "In range: true · Below min: true · Above max: true"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "What are the 3 phases of the Test-Driven Development (TDD) loop in order?",
          options: ["Red (failing test) → Green (minimal passing code) → Refactor (clean up safely)", "Deploy → Pray → Hotfix", "Refactor → Delete Tests → Ship", "Green → Red → Ignore"],
          answer: "Red (failing test) → Green (minimal passing code) → Refactor (clean up safely)",
          hint: "Seeing the test FAIL first proves the test actually catches broken behavior!",
          whyEasy: "Red proves the test works; Green solves it; Refactor keeps design crisp under safety nets."
        },
        {
          type: "mc",
          prompt: "You wrote `max_value(nums)` and tested `[3, 7, 2] → 7`. Which edge-case test is MOST likely to expose a hidden bug (`best = 0`)?",
          options: ["All-negative array `[-10, -3, -25]` (would falsely return `0`!)", "Another positive array `[1, 2, 3]`", "Changing variable names", "Running the same test twice"],
          answer: "All-negative array `[-10, -3, -25]` (would falsely return `0`!)",
          hint: "Initializing `best = 0` fails whenever every number is negative — initialize `best = nums[0]`!",
          whyEasy: "Boundary inputs (`[]`, negatives, zeros) expose assumptions immediately."
        },
        {
          type: "mc",
          prompt: "What does `git bisect` automate when a bug appeared sometime in the last 128 commits?",
          options: ["Binary-searches commit history to pinpoint the exact breaking commit in ~7 steps (`log₂ 128 = 7`)", "Deletes all 128 commits", "Rewrites every file in Python", "Splits one file into two"],
          answer: "Binary-searches commit history to pinpoint the exact breaking commit in ~7 steps (`log₂ 128 = 7`)",
          hint: "Binary search applied straight to Git history!",
          whyEasy: "7 tests instead of 128 — debugging with algorithms!"
        },
        {
          type: "mc",
          prompt: "What is a **Regression Test**?",
          options: ["A permanent test written right after fixing a bug so that exact bug can never silently creep back", "A linear statistics equation only", "A test that deletes old features", "Testing only on Fridays"],
          answer: "A permanent test written right after fixing a bug so that exact bug can never silently creep back",
          hint: "Once fixed + regression-tested, every future CI run guards that edge case forever!",
          whyEasy: "Turn every painful bug into a permanent shield."
        },
        {
          type: "mc",
          prompt: "In the **Testing Pyramid**, why should you have MANY fast Unit Tests and FEWER slow End-to-End (E2E) browser tests?",
          options: ["Unit tests run in milliseconds and pinpoint exact failing lines; E2E tests are slower and flakier but verify critical user journeys", "E2E tests cannot test web apps", "Unit tests cost money per run", "Browsers forbid E2E tests"],
          answer: "Unit tests run in milliseconds and pinpoint exact failing lines; E2E tests are slower and flakier but verify critical user journeys",
          hint: "Fast inner feedback loop (hundreds of unit tests in 0.5s) + targeted integration/E2E tests!",
          whyEasy: "Balance speed & confidence: wide unit base, focused integration middle, critical E2E top."
        }
      ]
    },
    {
      id: "code-memory-concurrency-race-conditions",
      worldId: "js_ts_architecture",
      order: 212,
      title: "Stack vs Heap, Concurrency & Race Conditions",
      icon: "🧵",
      tagline: "See how memory lives under the hood and why concurrent updates need locks.",
      scaryVersion: "Call-stack frame allocation vs heap garbage collection, interleaved non-atomic read-modify-write hazards, and mutex deadlock avoidance.",
      easyTruth: "The **Stack** holds tiny fast local variables & function frames (auto-cleaned on return!). The **Heap** holds big dynamic objects/arrays (cleaned by Garbage Collection or manual `free()`). And a **Race Condition** happens when two threads both read `balance = 100`, both add `50`, and both write `150` instead of `200`!",
      microSteps: [
        { label: "Step 1: Value Copy vs Reference Aliasing", text: "Primitives (`x = 5; y = x`) copy the value. Objects/Arrays (`b = a`) copy the **Heap pointer** — mutating `b.push(9)` mutates `a` too!" },
        { label: "Step 2: Concurrency vs Parallelism", text: "**Concurrency** = juggling multiple tasks (1 chef switching between boiling water & chopping). **Parallelism** = 2 chefs chopping simultaneously on 2 CPU cores!" },
        { label: "Step 3: Race Conditions & Deadlocks", text: "`balance += 1` is actually 3 steps (Read → Add → Write). Protect shared state with **Locks/Mutexes** or **Atomic DB ops** — and always acquire multiple locks in a consistent order to prevent **Deadlock**!" }
      ],
      cheatCode: "Primitives copy value; Objects copy Heap pointer! Shared mutable state + concurrency → Race Condition (use Mutex/Atomic ops)!",
      visualizerId: "backendSystemTerminalLab",
      forgeQuestId: "js-rate-guard",
      codeExample: {
        lang: "python",
        fileName: "reference_vs_copy.py",
        code: "a = [1, 2, 3]\nb = a          # Same Heap list!\nc = a.copy()   # Brand-new Heap list!\nb.append(99)\nprint('a:', a, '| c:', c)",
        output: "a: [1, 2, 3, 99] | c: [1, 2, 3]"
      },
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "What does this Python snippet print?",
          codeBlock: "a = [10, 20]\nb = a\nb.append(30)\nprint(a)",
          options: ["`[10, 20, 30]` — `a` and `b` point to the exact same Heap list!", "`[10, 20]` — `b` is an independent copy", "`[30]`", "TypeError"],
          answer: "`[10, 20, 30]` — `a` and `b` point to the exact same Heap list!",
          hint: "Assigning `b = a` copies the reference pointer, NOT the list contents!",
          whyEasy: "Use `b = a.copy()` or `a[:]` (JS: `[...a]`) when you need an independent list."
        },
        {
          type: "mc",
          prompt: "Two concurrent checkout requests BOTH read `stock = 1`, both see `stock > 0`, and both sell the last concert ticket. What bug is this?",
          options: ["A Race Condition (non-atomic check-then-act on shared state)", "A Syntax Error", "A CSS specificity conflict", "A Memory Leak"],
          answer: "A Race Condition (non-atomic check-then-act on shared state)",
          hint: "Interleaving Read-Check-Write across two concurrent workers creates double-selling!",
          whyEasy: "Fix with an atomic SQL update (`UPDATE items SET stock = stock - 1 WHERE id = 1 AND stock > 0`) or a lock!"
        },
        {
          type: "mc",
          prompt: "What is a **Deadlock**?",
          options: ["Thread A holds Lock 1 waiting for Lock 2, while Thread B holds Lock 2 waiting for Lock 1 — both freeze forever", "A function that returns `0`", "A fast CPU cache hit", "Closing a browser tab"],
          answer: "Thread A holds Lock 1 waiting for Lock 2, while Thread B holds Lock 2 waiting for Lock 1 — both freeze forever",
          hint: "Circular waiting with neither side willing to release first!",
          whyEasy: "Consistent lock ordering (always grab Lock 1 before Lock 2) breaks circular deadlock!"
        },
        {
          type: "mc",
          prompt: "What is the key difference between **Concurrency** and **Parallelism**?",
          options: ["Concurrency = structuring work to interleave multiple tasks (even on 1 core); Parallelism = executing multiple tasks at the exact same instant on multiple cores", "They are exact synonyms", "Parallelism only works in HTML", "Concurrency requires 64 GPUs"],
          answer: "Concurrency = structuring work to interleave multiple tasks (even on 1 core); Parallelism = executing multiple tasks at the exact same instant on multiple cores",
          hint: "Rob Pike's classic line: Concurrency is *dealing* with lots of things at once; Parallelism is *doing* lots of things at once!",
          whyEasy: "Node's single-threaded Event Loop is concurrent; multi-core workers are parallel."
        },
        {
          type: "mc",
          prompt: "What causes a **Memory Leak** even in a garbage-collected language like JavaScript or Python?",
          options: ["Keeping unintended live references (e.g. forgotten global caches or unremoved event listeners) so GC can never reclaim them", "Using too many `const` keywords", "Writing short functions", "Returning from recursion"],
          answer: "Keeping unintended live references (e.g. forgotten global caches or unremoved event listeners) so GC can never reclaim them",
          hint: "Garbage collectors only free objects that are UNREACHABLE from roots!",
          whyEasy: "Clean up intervals, listeners, and unbounded caches to prevent memory bloat."
        }
      ]
    }
  ];

  DATA.NODES.push(...NEW_NODES);

  // ==================== 10 NEW CODING CLASSIC TRAPS ====================
  DATA.GRADE12_TRAPS.push(
    {
      id: "trap-py-mutable-default",
      title: "Python Mutable Default Argument (`def f(items=[])`)",
      trapExpression: "def add_item(x, bag=[]): bag.append(x); return bag",
      wrongGuess: "Calling `add_item(1)` then `add_item(2)` returns `[1]` then `[2]`",
      rightAnswer: "Returns `[1]` then `[1, 2]` — default list is created ONCE at `def` time!",
      whyItHappens: "Python evaluates default argument values ONCE when the function is defined, NOT on each call — so every call shares the same list!",
      quickRule: "Always write `def add_item(x, bag=None): bag = [] if bag is None else bag`!",
      quiz: {
        prompt: "With `def f(x, a=[]): a.append(x); return a`, what does the SECOND call `f(2)` return after `f(1)`?",
        options: ["`[1, 2]`", "`[2]`", "`[]`", "`TypeError`"],
        answer: "`[1, 2]`",
        explanation: "Default list `a=[]` is created once at definition time and reused across calls unless you use `a=None`!"
      }
    },
    {
      id: "trap-js-float-precision",
      title: "IEEE-754 Binary Float Trap (`0.1 + 0.2 === 0.3`)",
      trapExpression: "0.1 + 0.2 === 0.3",
      wrongGuess: "`true`",
      rightAnswer: "`false` (`0.1 + 0.2` is `0.30000000000000004` in binary floating point!)",
      whyItHappens: "`1/10` and `2/10` are repeating fractions in Base-2 binary, just like `1/3 = 0.333...` in Base-10!",
      quickRule: "Store money as integer **cents** (`10 + 20 === 30`) or compare floats with `Math.abs(a - b) < 1e-9`!",
      quiz: {
        prompt: "Why should e-commerce backends store `$19.99` as integer `1999` cents instead of float `19.99`?",
        options: ["Binary floating point causes rounding drift (`0.1 + 0.2 !== 0.3`), whereas integer cents are exact", "Databases cannot store decimals", "Integers cannot be added", "Floats only work in Python"],
        answer: "Binary floating point causes rounding drift (`0.1 + 0.2 !== 0.3`), whereas integer cents are exact",
        explanation: "Integer centavos/cents (or fixed `DECIMAL` SQL columns) guarantee penny-exact accounting!"
      }
    },
    {
      id: "trap-sql-null-equals",
      title: "SQL `WHERE col = NULL` Returns ZERO Rows!",
      trapExpression: "SELECT * FROM heroes WHERE guild_id = NULL;",
      wrongGuess: "Returns all heroes with no guild",
      rightAnswer: "Returns 0 rows! Must write `WHERE guild_id IS NULL`",
      whyItHappens: "`NULL` means 'unknown', and `unknown = unknown` is `UNKNOWN` (not true) in SQL three-valued logic.",
      quickRule: "NEVER use `= NULL` or `!= NULL` — ALWAYS use `IS NULL` or `IS NOT NULL`!",
      quiz: {
        prompt: "Which SQL condition correctly finds rows where `deleted_at` is empty (`NULL`)?",
        options: ["`WHERE deleted_at IS NULL`", "`WHERE deleted_at = NULL`", "`WHERE deleted_at == null`", "`WHERE NOT deleted_at`"],
        answer: "`WHERE deleted_at IS NULL`",
        explanation: "In SQL, `= NULL` always evaluates to UNKNOWN and filters out every row; `IS NULL` tests nullness properly."
      }
    },
    {
      id: "trap-sql-where-vs-having",
      title: "SQL `WHERE COUNT(*) > 2` Crash",
      trapExpression: "SELECT guild_id FROM heroes WHERE COUNT(*) > 2 GROUP BY guild_id;",
      wrongGuess: "Filters guilds with more than 2 heroes",
      rightAnswer: "Syntax/Grouping Error! Aggregates MUST be filtered in `HAVING COUNT(*) > 2`",
      whyItHappens: "SQL evaluates `WHERE` on individual rows BEFORE `GROUP BY` creates groups.",
      quickRule: "`WHERE` = filter raw rows before grouping; `HAVING` = filter aggregates after `GROUP BY`!",
      quiz: {
        prompt: "Where must `SUM(xp) > 5000` be placed in a grouped SQL query?",
        options: ["In the `HAVING` clause after `GROUP BY`", "In the `WHERE` clause before `GROUP BY`", "Inside `FROM`", "Inside `LIMIT`"],
        answer: "In the `HAVING` clause after `GROUP BY`",
        explanation: "`WHERE` filters rows prior to aggregation; `HAVING` filters grouped aggregate totals!"
      }
    },
    {
      id: "trap-js-array-sort",
      title: "JavaScript `[10, 2, 1].sort()` Alphabetical Trap!",
      trapExpression: "[10, 2, 1, 25].sort()",
      wrongGuess: "`[1, 2, 10, 25]`",
      rightAnswer: "`[1, 10, 2, 25]` — JS `.sort()` converts numbers to STRINGS by default!",
      whyItHappens: "With no comparator function, `Array.prototype.sort()` sorts lexicographically by UTF-16 strings (`'10' < '2'`)!",
      quickRule: "ALWAYS pass a numeric comparator: `arr.sort((a, b) => a - b)` (ascending) or `(a, b) => b - a` (descending)!",
      quiz: {
        prompt: "What does `[100, 20, 5].sort()` return in JavaScript if you omit the comparator?",
        options: ["`[100, 20, 5]` (because `'1' < '2' < '5'` as strings!)", "`[5, 20, 100]`", "`[20, 5, 100]`", "Throws a TypeError"],
        answer: "`[100, 20, 5]` (because `'1' < '2' < '5'` as strings!)",
        explanation: "Without `(a, b) => a - b`, JS compares `'100'`, `'20'`, `'5'` alphabetically!"
      }
    },
    {
      id: "trap-js-fetch-404",
      title: "`fetch()` Doesn't Throw on `404` or `500`!",
      trapExpression: "try { await fetch('/api/broken'); } catch (e) { /* misses 404/500! */ }",
      wrongGuess: "A `404` or `500` HTTP status jumps straight into `catch`",
      rightAnswer: "`fetch()` resolves normally! Only network failures reject — check `if (!res.ok)`!",
      whyItHappens: "Receiving a `404` means the HTTP network exchange technically succeeded.",
      quickRule: "Always write `if (!res.ok) throw new Error('HTTP ' + res.status);` right after `await fetch(...)`!",
      quiz: {
        prompt: "When does `fetch(url)` reject its Promise automatically?",
        options: ["Only on network/DNS/CORS failure — NOT on HTTP 404 or 500", "On any status >= 400", "On any status >= 300", "Whenever JSON is empty"],
        answer: "Only on network/DNS/CORS failure — NOT on HTTP 404 or 500",
        explanation: "HTTP error statuses still resolve `fetch()`, so checking `res.ok` is mandatory!"
      }
    },
    {
      id: "trap-bigo-hidden-in-list",
      title: "Hidden `O(n²)` Trap: `if x in my_list:` Inside a Loop!",
      trapExpression: "for x in items: if x in seen_list: ...",
      wrongGuess: "`O(n)` because there's only one `for` loop",
      rightAnswer: "`O(n²)`! Scanning a `list` with `in` is `O(n)` — use a `set` for `O(1)`!",
      whyItHappens: "Checking membership in a `list` scans item-by-item (`O(n)`), hiding an invisible inner loop!",
      quickRule: "Swap `seen = []` → `seen = set()` (or JS `new Set()`) to drop `O(n²)` straight to `O(n)`!",
      quiz: {
        prompt: "Changing `seen = []` to `seen = set()` inside `for x in nums: if x in seen:` changes complexity from:",
        options: ["`O(n²)` → `O(n)`", "`O(n)` → `O(1)`", "`O(log n)` → `O(n²)`", "No change at all"],
        answer: "`O(n²)` → `O(n)`",
        explanation: "List membership is `O(n)` per step (`n × n = O(n²)`), whereas Hash Set membership is `O(1)` (`n × 1 = O(n)`)!"
      }
    },
    {
      id: "trap-py-list-aliasing",
      title: "Shallow Reference Aliasing (`b = a` vs `b = a.copy()`)",
      trapExpression: "grid = [[0] * 3] * 3; grid[0][0] = 1",
      wrongGuess: "Only top-left cell `grid[0][0]` becomes `1`",
      rightAnswer: "ALL 3 rows change to `[1, 0, 0]` because `* 3` duplicated the SAME inner list reference!",
      whyItHappens: "`[[0]*3]*3` puts 3 pointers to ONE single row object on the heap.",
      quickRule: "Build 2D grids with a comprehension: `[[0]*3 for _ in range(3)]` so every row is a fresh list!",
      quiz: {
        prompt: "What is the safe Python way to create 3 independent rows of `[0, 0, 0]`?",
        options: ["`[[0] * 3 for _ in range(3)]`", "`[[0] * 3] * 3`", "`[0, 0, 0] * 3`", "`list(3, 3)`"],
        answer: "`[[0] * 3 for _ in range(3)]`",
        explanation: "A list comprehension allocates a brand-new inner list on every iteration instead of reusing one reference!"
      }
    },
    {
      id: "trap-jwt-base64-not-encrypted",
      title: "JWT Payload Is Base64 (NOT Encrypted!)",
      trapExpression: "jwt = header.eyJyb2xlIjoiYWRtaW4ifQ.sig",
      wrongGuess: "Nobody can read the data inside a JWT without the server secret",
      rightAnswer: "ANYONE can decode the middle Base64 payload in 1 line (`atob(...)`)!",
      whyItHappens: "Standard JWTs (JWS) use cryptographic signing to prevent *tampering*, NOT encryption to hide contents.",
      quickRule: "Never put passwords, API secrets, or private SSNs inside a JWT payload!",
      quiz: {
        prompt: "What does a JWT's 3rd segment (signature) actually guarantee?",
        options: ["Integrity & authenticity (nobody tampered with header/payload)", "Confidentiality (nobody can read the payload)", "Automatic database indexing", "Zero expiration"],
        answer: "Integrity & authenticity (nobody tampered with header/payload)",
        explanation: "The signature proves the server issued the token unmodified, while the Base64 payload itself is publicly readable."
      }
    },
    {
      id: "trap-bsearch-mid-loop",
      title: "Binary Search Infinite Loop (`lo = mid` Instead of `mid + 1`)",
      trapExpression: "if nums[mid] < target: lo = mid",
      wrongGuess: "Safely narrows the search window",
      rightAnswer: "Infinite loop when `hi == lo + 1` because `(lo + hi) // 2 == lo` forever!",
      whyItHappens: "Integer floor division rounds down toward `lo`, so `lo = mid` makes zero forward progress.",
      quickRule: "In `while lo <= hi:`, ALWAYS move strictly past `mid`: `lo = mid + 1` and `hi = mid - 1`!",
      quiz: {
        prompt: "With `lo = 4, hi = 5` and `nums[4] < target`, why does `lo = (lo + hi) // 2` hang forever?",
        options: ["`(4 + 5) // 2` equals `4`, so `lo` stays `4` forever — use `lo = mid + 1`!", "Integer division overflows", "`hi` becomes negative", "Python forbids `while lo <= hi`"],
        answer: "`(4 + 5) // 2` equals `4`, so `lo` stays `4` forever — use `lo = mid + 1`!",
        explanation: "Because `mid` already failed the check, advancing to `mid + 1` strictly shrinks the interval and guarantees termination."
      }
    }
  );

  // ==================== +24 NEW CODING & CS REFERENCE CARDS ====================
  if (DATA.MEMORIZE_DATA && Array.isArray(DATA.MEMORIZE_DATA.codingCards)) {
    DATA.MEMORIZE_DATA.codingCards.push(
      { cat: "DSA · Hash Map", syntax: "seen = {}; need = target - n; if need in seen:", meaning: "O(n) Two-Sum complement pattern — replaces O(n²) nested loops with O(1) dict lookups." },
      { cat: "DSA · Two Pointers", syntax: "L, R = 0, len(arr) - 1  (sum<t → L+=1; sum>t → R-=1)", meaning: "O(n) time, O(1) space pair/palindrome scan on sorted arrays." },
      { cat: "DSA · Stack (LIFO)", syntax: "stack.append(x) / stack.pop()  (O(1))", meaning: "Last-In-First-Out: balanced brackets, Undo history, DFS & call stack." },
      { cat: "DSA · Queue (FIFO)", syntax: "from collections import deque; q.append(x); q.popleft()", meaning: "True O(1) First-In-First-Out queue for BFS (never use O(n) `list.pop(0)`!)." },
      { cat: "DSA · Linked List", syntax: "nxt = curr.next; curr.next = prev; prev, curr = curr, nxt", meaning: "In-place O(n) time, O(1) space linked-list reversal." },
      { cat: "DSA · Binary Search", syntax: "while lo <= hi: mid = (lo+hi)//2; lo = mid+1 / hi = mid-1", meaning: "O(log n) search on sorted/monotonic data (~20 steps for 1M items!)." },
      { cat: "DSA · Trees & BST", syntax: "In-Order (L → Root → R) = Sorted BST Output", meaning: "Pre-Order = Root-L-R (copy); In-Order = L-Root-R (sorted); Post-Order = L-R-Root (delete)." },
      { cat: "DSA · Min-Heap", syntax: "Peek Min: O(1) · Push/Pop: O(log n) · Children: 2i+1, 2i+2", meaning: "Priority queue backbone for Top-K problems & Dijkstra's shortest path." },
      { cat: "DSA · Graphs", syntax: "BFS (Queue) = Unweighted Shortest · Dijkstra (Heap) = Weighted", meaning: "Always track a `visited = set()` to prevent cycles — O(V + E) time." },
      { cat: "DSA · DP & Window", syntax: "win += arr[i] - arr[i-k]  |  memo[n] = solve(n)", meaning: "Sliding window gives O(n) subarrays; DP memo/table crushes O(2ⁿ) recursion to O(n)." },
      { cat: "SQL · Execution Order", syntax: "FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT", meaning: "Explains why WHERE runs before SELECT aliases and why aggregates belong in HAVING!" },
      { cat: "SQL · Joins", syntax: "INNER JOIN (matches only) vs LEFT JOIN (keep all left + NULLs)", meaning: "`LEFT JOIN ... WHERE right.id IS NULL` finds every unmatched parent row." },
      { cat: "SQL · NULL Rule", syntax: "WHERE col IS NULL  (NEVER col = NULL!)", meaning: "In SQL three-valued logic, `NULL = NULL` is UNKNOWN (falsy)." },
      { cat: "SQL · Indexes & ACID", syntax: "B-Tree Index = O(log n) reads · ACID = Atomicity/Consistency/Isolation/Durability", meaning: "Always use parameterized queries (`$1`) to block SQL Injection 100%." },
      { cat: "Backend · HTTP REST", syntax: "200 OK · 201 Created · 400 Bad · 401 AuthN · 403 AuthZ · 404 Missing · 429 Limit · 500 Crash", meaning: "GET/PUT/DELETE are Idempotent; POST creates new records each call." },
      { cat: "Backend · Auth & JWT", syntax: "Passwords: Argon2/bcrypt + Salt · JWT: Base64(header).Base64(payload).HMAC_Sig", meaning: "JWT payload is PUBLIC (signed, NOT encrypted!). Store tokens in `HttpOnly` cookies." },
      { cat: "Linux · Pipes & chmod", syntax: "grep ERROR app.log | wc -l  ·  chmod 755 (r=4, w=2, x=1)", meaning: "`|` chains stdout → stdin; `>` overwrites, `>>` appends; `600` locks private SSH keys." },
      { cat: "Git · DAG Workflow", syntax: "git checkout -b feat → git add . → git commit -m '...' → git merge feat", meaning: "Branches are cheap pointers! Never `git rebase` commits already pushed to shared `main`." },
      { cat: "System Design", syntax: "Load Balancer → Stateless APIs → Redis Cache (~1ms) → SQL DB + Async Queue", meaning: "Docker containers share the host OS kernel for fast, identical builds anywhere." },
      { cat: "JS · Closures & Scope", syntax: "const make = () => { let n = 0; return () => ++n; }", meaning: "Closures pack outer lexical variables privately; use `const`/`let`, never `var`." },
      { cat: "JS · Pipelines", syntax: "arr.filter(fn).map(fn).reduce((acc, x) => ..., init)", meaning: "Immutable data pipeline — always pass `init` to `.reduce()` and `(a,b)=>a-b` to `.sort()`!" },
      { cat: "JS · Event Loop", syntax: "Sync Call Stack → ALL Microtasks (Promise.then) → Next Macrotask (setTimeout)", meaning: "Use `await Promise.all([a(), b()])` for parallel fetches and check `if (!res.ok)` on `fetch()`!" },
      { cat: "TypeScript · Safety", syntax: "type Res<T> = { ok: true; data: T } | { ok: false; err: string }", meaning: "Types erase at runtime (0ms cost); prefer `unknown` + narrowing over `any`." },
      { cat: "Clean Code · TDD", syntax: "Red → Green → Refactor · Arrange → Act → Assert · Composition > Inheritance", meaning: "Test edges (`[]`, `0`, negatives, `null`) and protect shared concurrent state with atomic ops/locks." }
    );
  }

  // ==================== +6 CODING BADGES ====================
  DATA.BADGES.push(
    {
      id: "code_forge_initiate",
      emoji: "⚔️",
      title: "Code Forge Initiate",
      description: "Clear 3 hands-on Coding Quests in the Code Forge IDE.",
      check: (st) => Object.keys(st.forgeSolved || {}).length >= 3
    },
    {
      id: "code_forge_knight",
      emoji: "🛡️",
      title: "Code Forge Knight",
      description: "Clear 10 hands-on Coding Quests across Python, JS, SQL & Git.",
      check: (st) => Object.keys(st.forgeSolved || {}).length >= 10
    },
    {
      id: "code_forge_architect",
      emoji: "👑",
      title: "Principal Code Architect",
      description: "Clear 20+ Coding Quests in Code Forge — Boot.dev boss level!",
      check: (st) => Object.keys(st.forgeSolved || {}).length >= 20
    },
    {
      id: "dsa_grandmaster",
      emoji: "🧩",
      title: "DSA Grandmaster",
      description: "Master 4+ lessons in World 22 (Data Structures & Algorithms).",
      check: (st) => DATA.NODES.filter((n) => n.worldId === "dsa_mastery" && (st.nodeMastery[n.id] || 0) >= 1).length >= 4
    },
    {
      id: "sql_backend_mage",
      emoji: "🗄️",
      title: "Backend & SQL Mage",
      description: "Master 4+ lessons in World 23 (SQL, REST APIs, Git & DevOps).",
      check: (st) => DATA.NODES.filter((n) => n.worldId === "backend_sql_dev" && (st.nodeMastery[n.id] || 0) >= 1).length >= 4
    },
    {
      id: "js_ts_artisan",
      emoji: "⚡",
      title: "JS / TypeScript Artisan",
      description: "Master 4+ lessons in World 24 (Modern JS, TS & Architecture).",
      check: (st) => DATA.NODES.filter((n) => n.worldId === "js_ts_architecture" && (st.nodeMastery[n.id] || 0) >= 1).length >= 4
    }
  );

  // ==================== +4 CODING SYNTHESIS BOSSES ====================
  DATA.SYNTHESIS_PROBLEMS.push(
    {
      id: "synth-coding-bigo-hash-sort",
      title: "Algorithmic Speedup Boss: Dedupe + Pair Search",
      worldLabel: "DSA · Hash Maps + Binary Search",
      prompt: "You receive `1,000,000` unsorted user IDs and must check if ANY two sum to `target`. Comparing: (A) Nested loops, (B) Sort + Two Pointers, (C) Hash Map single pass. Which has the fastest asymptotic time complexity?",
      options: ["(C) Hash Map single pass — `O(n)` time", "(B) Sort + Two Pointers — `O(n log n)` time", "(A) Nested loops — `O(n²)` time", "All three have identical speed"],
      answer: "(C) Hash Map single pass — `O(n)` time",
      stepsChain: [
        "Step 1: Nested loops test `n(n-1)/2 ≈ 5 × 10¹¹` pairs → `O(n²)` (hours!).",
        "Step 2: Sorting first takes `O(n log n)` (~20M ops) + Two Pointers `O(n)` → `O(n log n)`.",
        "Step 3: One Hash Map pass stores `seen[id]` and checks `target - id` in `O(1)` → `O(n)` (~1M ops, fastest!)."
      ],
      whyEasy: "Hash Map trades `O(n)` RAM to beat even `O(n log n)` sorting!"
    },
    {
      id: "synth-coding-sql-join-having",
      title: "Backend Query Boss: Active Guilds + Indexes",
      worldLabel: "Backend · SQL Joins + Execution Order",
      prompt: "You run `SELECT g.name, COUNT(h.id) FROM guilds g LEFT JOIN heroes h ON g.id = h.guild_id GROUP BY g.name HAVING COUNT(h.id) = 0;`. What does this query return and why did it use `COUNT(h.id)` instead of `COUNT(*)`?",
      options: ["Empty guilds with 0 heroes; `COUNT(*)` would falsely count the padded NULL row as 1!", "All heroes without guilds; `COUNT(*)` is faster", "A SQL syntax error", "Only guilds with >= 1 hero"],
      answer: "Empty guilds with 0 heroes; `COUNT(*)` would falsely count the padded NULL row as 1!",
      stepsChain: [
        "Step 1: `LEFT JOIN` keeps every guild even if zero heroes match, padding `h.id` with `NULL`.",
        "Step 2: `COUNT(*)` counts rows (giving `1` for an empty guild!), while `COUNT(h.id)` skips `NULL`s (giving `0`!).",
        "Step 3: `HAVING COUNT(h.id) = 0` filters after `GROUP BY` to isolate empty guilds cleanly!"
      ],
      whyEasy: "`LEFT JOIN` + `COUNT(right.id)` + `HAVING` is the exact production SQL idiom."
    },
    {
      id: "synth-coding-event-loop-fetch",
      title: "Full-Stack Async Boss: Event Loop + Parallel Fetch",
      worldLabel: "Modern JS · Event Loop + Promises",
      prompt: "Inside an `async` handler: `console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);` — PLUS you must load `/user` (200ms) and `/quests` (250ms) concurrently. What is the log order and parallel load time?",
      options: ["Logs `1, 4, 3, 2` and `Promise.all` finishes in `~250ms`", "Logs `1, 2, 3, 4` and finishes in `~450ms`", "Logs `1, 3, 4, 2` and finishes in `~200ms`", "Logs `4, 3, 2, 1` and finishes in `~250ms`"],
      answer: "Logs `1, 4, 3, 2` and `Promise.all` finishes in `~250ms`",
      stepsChain: [
        "Step 1: Sync Call Stack prints `1`, then `4`.",
        "Step 2: Microtask Queue (`Promise.then`) drains BEFORE Macrotasks (`setTimeout`) → prints `3`, then `2`.",
        "Step 3: `Promise.all` runs both fetches simultaneously, taking `max(200, 250) = ~250ms` instead of `450ms`!"
      ],
      whyEasy: "Sync → Microtask → Macrotask, and `Promise.all` takes the max, not the sum!"
    },
    {
      id: "synth-coding-auth-scale",
      title: "Systems Architect Boss: Secure & Scalable Login API",
      worldLabel: "Backend · Auth + Caching + Scale",
      prompt: "You are designing a login + profile API for 2M users behind a Load Balancer. Which architecture stack is BOTH secure AND horizontally scalable?",
      options: ["Argon2 salted password hash + Parameterized SQL + Stateless JWT/Redis session in `HttpOnly` cookie + Redis profile cache", "Plaintext passwords + string-concat SQL + in-memory server RAM sessions", "MD5 unsalted hash + JWT containing user password in localStorage", "Store all users in a single frontend CSS file"],
      answer: "Argon2 salted password hash + Parameterized SQL + Stateless JWT/Redis session in `HttpOnly` cookie + Redis profile cache",
      stepsChain: [
        "Step 1: Argon2 + unique salt blocks GPU & Rainbow Table cracking; Parameterized SQL kills SQL Injection.",
        "Step 2: Stateless JWT or shared Redis session works across ALL load-balanced API servers; `HttpOnly` blocks XSS theft.",
        "Step 3: Redis cache-aside serves hot profile reads in ~1ms without hammering SQL!"
      ],
      whyEasy: "Every layer defends a real failure mode: passwords, SQLi, XSS, and horizontal scale!"
    }
  );

  // ==================== +6 CODING DIAGNOSTIC QUESTIONS ====================
  DATA.DIAGNOSTIC_QUESTIONS.push(
    {
      id: "diag-dsa-hash",
      worldId: "dsa_mastery",
      targetNodeId: "dsa-arrays-hashing-two-pointers",
      prompt: "Which data structure drops Two-Sum from `O(n²)` to `O(n)`?",
      options: ["Hash Map (`dict` / `Map`)", "Singly Linked List", "Bubble Sort", "Plain Stack"],
      answer: "Hash Map (`dict` / `Map`)"
    },
    {
      id: "diag-dsa-bfs",
      worldId: "dsa_mastery",
      targetNodeId: "dsa-graphs-bfs-dfs-dijkstra",
      prompt: "Which traversal guarantees the shortest path in an UNWEIGHTED graph?",
      options: ["BFS using a Queue", "DFS using a Stack", "Quick Sort", "In-Order BST"],
      answer: "BFS using a Queue"
    },
    {
      id: "diag-sql-having",
      worldId: "backend_sql_dev",
      targetNodeId: "be-sql-joins-groupby-agg",
      prompt: "In SQL, which clause filters groups AFTER `GROUP BY` (e.g. `COUNT(*) >= 3`)?",
      options: ["`HAVING`", "`WHERE`", "`FROM`", "`DISTINCT`"],
      answer: "`HAVING`"
    },
    {
      id: "diag-be-http",
      worldId: "backend_sql_dev",
      targetNodeId: "be-rest-apis-json-status-codes",
      prompt: "Logged-in regular user tries to access `/admin/delete-all`. Best HTTP status code?",
      options: ["`403 Forbidden`", "`201 Created`", "`404 Not Found`", "`200 OK`"],
      answer: "`403 Forbidden`"
    },
    {
      id: "diag-js-loop",
      worldId: "js_ts_architecture",
      targetNodeId: "js-async-promises-event-loop",
      prompt: "In JS, what runs FIRST after synchronous code finishes: `Promise.then` or `setTimeout(..., 0)`?",
      options: ["`Promise.then` (Microtask Queue drains first!)", "`setTimeout(..., 0)` (Macrotask first)", "Random order", "Neither runs"],
      answer: "`Promise.then` (Microtask Queue drains first!)"
    },
    {
      id: "diag-ts-unknown",
      worldId: "js_ts_architecture",
      targetNodeId: "ts-types-interfaces-generics",
      prompt: "In TypeScript, why prefer `unknown` over `any` for untrusted API responses?",
      options: ["`unknown` forces type-narrowing checks before use; `any` disables safety", "`unknown` runs faster at runtime", "`any` cannot hold objects", "They behave identically"],
      answer: "`unknown` forces type-narrowing checks before use; `any` disables safety"
    }
  );

  // ==================== PROCEDURAL GENERATORS (ALL 24 NEW NODES, >= 4 UNIQUE PROMPTS EACH!) ====================
  if (typeof DATA.registerProceduralMap === "function") {
    DATA.registerProceduralMap({
      "dsa-arrays-hashing-two-pointers": () => {
        const mode = randInt(0, 3);
        if (mode === 0) {
          const a = randInt(2, 9), b = randInt(10, 22), target = a + b;
          const nums = [a, randInt(25, 35), b, randInt(40, 50)];
          return {
            type: "mc",
            prompt: `Hash Map Two-Sum on \`nums = [${nums.join(", ")}]\` with \`target = ${target}\`: when visiting \`${b}\` (index 2), what complement do we look up in \`seen\`?`,
            options: numOpts(a, [-2, -1, 1, 2, 5]),
            answer: String(a),
            hint: `Complement = \`target - current = ${target} - ${b}\`!`,
            whyEasy: `\`${target} - ${b} = ${a}\` is already in \`seen\` at index 0 → \`O(1)\` instant hit!`
          };
        }
        if (mode === 1) {
          const base = randInt(2, 6);
          const arr = [base, base + 3, base + 7, base + 12, base + 20];
          const target = arr[1] + arr[3];
          const curSum = arr[0] + arr[4];
          const move = curSum > target ? "Decrement right pointer `R -= 1`" : "Increment left pointer `L += 1`";
          return {
            type: "mc",
            prompt: `Sorted Two-Pointers on \`[${arr.join(", ")}]\`, target \`${target}\`: currently \`arr[L] + arr[R] = ${arr[0]} + ${arr[4]} = ${curSum}\`. Next pointer move?`,
            options: shuffle(["Decrement right pointer `R -= 1`", "Increment left pointer `L += 1`", "Move both inward blindly", "Re-sort the array"]),
            answer: move,
            hint: `Compare \`${curSum}\` vs target \`${target}\`!`,
            whyEasy: curSum > target ? `${curSum} > ${target}, so shrink the sum by moving R left!` : `${curSum} < ${target}, so grow the sum by moving L right!`
          };
        }
        const word = pick(["mississippi", "banana", "engineering", "algorithm", "programming"]);
        const ch = pick(["i", "a", "e", "n", "g"]);
        const cnt = word.split("").filter((c) => c === ch).length;
        return {
          type: "mc",
          prompt: `Frequency map \`counts\` built over \`"${word}"\`: what is \`counts.get("${ch}", 0)\`?`,
          options: numOpts(cnt, [-1, 1, 2, 3]),
          answer: String(cnt),
          hint: `Count occurrences of \`"${ch}"\` in \`"${word}"\`.`,
          whyEasy: `One \`O(n)\` pass counts \`"${ch}"\` = ${cnt}!`
        };
      },

      "dsa-stacks-queues-deques": () => {
        const mode = randInt(0, 3);
        if (mode === 0) {
          const a = randInt(1, 9), b = randInt(10, 19), c = randInt(20, 29);
          return {
            type: "mc",
            prompt: `Stack pushes \`${a}\`, then \`${b}\`, then \`${c}\`, then calls \`pop()\` ONCE. What value is popped?`,
            options: shuffle([String(c), String(a), String(b), String(c + 1)]),
            answer: String(c),
            hint: "Stack = LIFO (Last In, First Out)!",
            whyEasy: `${c} entered last, so it pops out first!`
          };
        }
        if (mode === 1) {
          const a = randInt(1, 9), b = randInt(10, 19), c = randInt(20, 29);
          return {
            type: "mc",
            prompt: `FIFO Queue enqueues \`${a}\`, then \`${b}\`, then \`${c}\`, then dequeues ONCE. What value comes out?`,
            options: shuffle([String(a), String(b), String(c), String(c + 2)]),
            answer: String(a),
            hint: "Queue = FIFO (First In, First Out)!",
            whyEasy: `${a} entered the line first, so it leaves first!`
          };
        }
        const cases = [
          { s: "({[]})", ans: "Valid (True)", why: "Every opener closes in exact LIFO reverse order and stack ends empty." },
          { s: "([)]", ans: "Invalid (False)", why: "`]` expects `[` on top, but `(` is blocked by `[` → mismatch!" },
          { s: "((()", ans: "Invalid (False)", why: "Stack still has 2 unclosed `(` left at the end!" },
          { s: "{[()]}[]", ans: "Valid (True)", why: "Nested block empties cleanly, then `[]` opens and closes cleanly!" }
        ];
        const p = pick(cases);
        return {
          type: "mc",
          prompt: `Bracket-matcher Stack check on \`"${p.s}"\`: result?`,
          options: shuffle(["Valid (True)", "Invalid (False)", "SyntaxError", "Infinite Loop"]),
          answer: p.ans,
          hint: "Trace pushing openers and popping matching closers!",
          whyEasy: p.why
        };
      },

      "dsa-linked-lists-pointers": () => {
        const bank = [
          { prompt: "Time complexity to insert a new node at the HEAD of a Singly Linked List:", options: ["`O(1)`", "`O(n)`", "`O(log n)`", "`O(n²)`"], answer: "`O(1)`", hint: "Just point `newNode.next = head; head = newNode`!", why: "Zero shifting needed at the head → true `O(1)`." },
          { prompt: "Time complexity to read index `k` (middle element) of a Linked List:", options: ["`O(n)`", "`O(1)`", "`O(log n)`", "`O(1)` amortized"], answer: "`O(n)`", hint: "Must follow `.next` pointers one hop at a time!", why: "Non-contiguous memory means no direct index math." },
          { prompt: "In Floyd's cycle detector (`slow` +1, `fast` +2), `fast` reaches `None`. What does this prove?", options: ["The linked list has NO cycle", "The linked list has a cycle", "The list is empty", "Memory leaked"], answer: "The linked list has NO cycle", hint: "A loop has no end (`None`)!", why: "Hitting `None` proves termination (acyclic), and `slow` is right at the midpoint!" },
          { prompt: "When reversing a linked list in-place, how much extra space is required?", options: ["`O(1)` (just 3 pointers: `prev`, `curr`, `nxt`)", "`O(n)` array", "`O(n²)` matrix", "`O(log n)`"], answer: "`O(1)` (just 3 pointers: `prev`, `curr`, `nxt`)", hint: "You rewire existing `.next` arrows without allocating new nodes!", why: "Iterative pointer reversal runs in `O(n)` time and `O(1)` space!" },
          { prompt: "In a Doubly Linked List (`prev` & `next`), deleting a known node reference `node` takes:", options: ["`O(1)`", "`O(n)`", "`O(log n)`", "`O(n log n)`"], answer: "`O(1)`", hint: "`node.prev.next = node.next` and `node.next.prev = node.prev`!", why: "Having `prev` lets you splice out a node directly — backbone of LRU Caches!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "dsa-recursion-call-stack": () => {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const n = randInt(3, 6);
          const facts = { 3: 6, 4: 24, 5: 120, 6: 720 };
          return {
            type: "mc",
            prompt: `Recursive \`factorial(${n})\` where \`factorial(1) = 1\` and \`factorial(n) = n * factorial(n-1)\` returns:`,
            options: numOpts(facts[n], [-6, -2, 6, 12, 24]),
            answer: String(facts[n]),
            hint: `Multiply \`${n} × ${n - 1} × ... × 1\`!`,
            whyEasy: `${n}! = ${facts[n]} as frames unwind back up the Call Stack.`
          };
        }
        if (mode === 1) {
          const n = randInt(3, 6);
          const sum = (n * (n + 1)) / 2;
          return {
            type: "mc",
            prompt: `Recursive \`sum_to(${n})\` (\`0\` if \`n == 0\` else \`n + sum_to(n - 1)\`) returns:`,
            options: numOpts(sum, [-2, -1, 1, 2, 3]),
            answer: String(sum),
            hint: `Add \`${n} + ${n - 1} + ... + 1\`!`,
            whyEasy: `Base case 0 stops recursion; unwinding sums to ${sum}.`
          };
        }
        const bank = [
          { prompt: "What happens when a recursive function omits its base case?", options: ["Stack Overflow / `RecursionError`", "Returns `None` immediately", "Runs in `O(1)`", "Auto-memoizes"], answer: "Stack Overflow / `RecursionError`", hint: "Call stack frames pile up until memory limit trips!", why: "Every valid recursion MUST have an unreachable-proof base case." },
          { prompt: "Time complexity of naive recursive `fib(n) = fib(n-1) + fib(n-2)` WITHOUT memoization:", options: ["`O(2ⁿ)` (exponential)", "`O(n)` (linear)", "`O(log n)`", "`O(1)`"], answer: "`O(2ⁿ)` (exponential)", hint: "Each call splits into two recursive branches!", why: "Adding a memo dict collapses `O(2ⁿ)` straight down to `O(n)`!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "dsa-binary-search-sorting": () => {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const k = pick([8, 10, 16, 20]);
          const n = Math.pow(2, k);
          return {
            type: "mc",
            prompt: `A sorted array has \`${n.toLocaleString()}\` (\`2^${k}\`) elements. Max Binary Search steps needed?`,
            options: numOpts(k, [-4, -2, 2, 4, 10]),
            answer: String(k),
            hint: `Each step halves the array: \`log₂(2^${k}) = ${k}\`!`,
            whyEasy: `Only ${k} comparisons to search ${n.toLocaleString()} sorted items!`
          };
        }
        if (mode === 1) {
          const lo = randInt(0, 4), hi = lo + randInt(5, 11);
          const mid = Math.floor((lo + hi) / 2);
          return {
            type: "mc",
            prompt: `Binary Search step with \`lo = ${lo}\` and \`hi = ${hi}\`: what is \`mid = (lo + hi) // 2\`?`,
            options: numOpts(mid, [-2, -1, 1, 2]),
            answer: String(mid),
            hint: `Floor of \`(${lo} + ${hi}) / 2 = ${(lo + hi) / 2}\`!`,
            whyEasy: `\`(${lo} + ${hi}) // 2 = ${mid}\` picks the exact midpoint index.`
          };
        }
        const bank = [
          { prompt: "Guaranteed worst-case time complexity of Merge Sort:", options: ["`O(n log n)`", "`O(n²)`", "`O(n)`", "`O(log n)`"], answer: "`O(n log n)`", hint: "Always halves evenly (`log n` levels × `n` merge)!", why: "Merge Sort is both `O(n log n)` worst-case AND stable!" },
          { prompt: "Worst-case time complexity of Bubble Sort & Insertion Sort on reverse-sorted input:", options: ["`O(n²)`", "`O(n log n)`", "`O(log n)`", "`O(1)`"], answer: "`O(n²)`", hint: "Nested comparisons across all pairs!", why: "Quadratic `O(n²)` slows fast once `n > 10,000`." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "dsa-trees-bst-heaps": () => {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const i = randInt(0, 6);
          const left = 2 * i + 1;
          return {
            type: "mc",
            prompt: `In a 0-indexed Binary Heap array, what is the index of the LEFT child of node \`i = ${i}\`?`,
            options: numOpts(left, [-1, 1, 2, 3]),
            answer: String(left),
            hint: `Left child formula = \`2*i + 1 = 2(${i}) + 1\`!`,
            whyEasy: `Left = \`2i+1 = ${left}\`, Right = \`2i+2 = ${left + 1}\`!`
          };
        }
        const bank = [
          { prompt: "Which BST traversal outputs keys in sorted ascending order?", options: ["In-Order (`L → Root → R`)", "Pre-Order (`Root → L → R`)", "Post-Order (`L → R → Root`)", "Random Walk"], answer: "In-Order (`L → Root → R`)", hint: "Smaller values sit on the left, larger on the right!", why: "In-Order walks strictly smallest → largest." },
          { prompt: "In a Min-Heap, what is the time complexity of `peek()` (reading the minimum)?", options: ["`O(1)`", "`O(log n)`", "`O(n)`", "`O(n log n)`"], answer: "`O(1)`", hint: "The smallest item ALWAYS sits at `heap[0]`!", why: "Instant root access = `O(1)`; pop/push = `O(log n)`." },
          { prompt: "Inserting sorted keys `1, 2, 3, ..., n` into an unbalanced BST produces height:", options: ["`O(n)` (degenerates into a linked list)", "`O(log n)`", "`O(1)`", "`O(√n)`"], answer: "`O(n)` (degenerates into a linked list)", hint: "Every key attaches to the right child!", why: "Self-balancing trees (AVL/Red-Black) rotate to preserve `O(log n)` height." },
          { prompt: "Which traversal is best for safely deleting/freeing a tree's children BEFORE deleting its parent?", options: ["Post-Order (`L → R → Root`)", "Pre-Order (`Root → L → R`)", "In-Order (`L → Root → R`)", "Binary Search"], answer: "Post-Order (`L → R → Root`)", hint: "Visit both children first, then handle the Root last!", why: "Post-Order resolves subtrees before their parent." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "dsa-graphs-bfs-dfs-dijkstra": () => {
        const bank = [
          { prompt: "Which data structure powers Breadth-First Search (BFS)?", options: ["Queue (FIFO)", "Stack (LIFO)", "Binary Search Tree", "Plain Integer"], answer: "Queue (FIFO)", hint: "Explore all neighbors at distance 1 before distance 2!", why: "FIFO queue guarantees level-by-level expansion." },
          { prompt: "Which algorithm finds shortest paths on a weighted graph with non-negative edge costs?", options: ["Dijkstra's Algorithm (Min-Heap)", "Plain DFS", "Selection Sort", "Two Pointers"], answer: "Dijkstra's Algorithm (Min-Heap)", hint: "Always pop the smallest cumulative distance next!", why: "Greedy priority-queue relaxation finds optimal weighted routes." },
          { prompt: "Time complexity of BFS / DFS on an Adjacency List with `V` nodes and `E` edges:", options: ["`O(V + E)`", "`O(V²)`", "`O(V × E)`", "`O(2^V)`"], answer: "`O(V + E)`", hint: "Each vertex and edge is visited at most once!", why: "Linear in total vertices + edges." },
          { prompt: "Why is a `visited` Set required in graph traversal (unlike tree traversal)?", options: ["Graphs can contain cycles that would cause infinite loops without `visited`", "Sets sort edges alphabetically", "Graphs cannot hold strings", "Trees have more cycles than graphs"], answer: "Graphs can contain cycles that would cause infinite loops without `visited`", hint: "A → B → A loops forever unless you mark visited nodes!", why: "`visited.add(node)` guarantees `O(1)` loop protection." },
          { prompt: "Ordering prerequisite skills/tasks in a Directed Acyclic Graph (DAG) uses:", options: ["Topological Sort", "Merge Sort", "Binary Search", "Hashing"], answer: "Topological Sort", hint: "Places every prerequisite before every dependent node!", why: "Used in build systems, package managers, and EveryLingo's Skill Tree!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "dsa-dp-memoization-sliding-window": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const n = pick([4, 5, 6, 7]);
          const ways = { 4: 5, 5: 8, 6: 13, 7: 21 };
          return {
            type: "mc",
            prompt: `Climbing Stairs DP (1 or 2 steps at a time, \`dp[1]=1, dp[2]=2\`): how many distinct ways to reach step \`${n}\`?`,
            options: numOpts(ways[n], [-3, -2, 2, 3, 5]),
            answer: String(ways[n]),
            hint: `Each step is the sum of the previous two (\`1, 2, 3, 5, 8, 13, 21\`)!`,
            whyEasy: `\`dp[${n}] = dp[${n - 1}] + dp[${n - 2}] = ${ways[n]}\`!`
          };
        }
        const bank = [
          { prompt: "Sliding Window of width `k` updates sum in `O(1)` per step via:", options: ["`win += arr[i] - arr[i - k]`", "Summing all `k` elements again", "Sorting the window every step", "Dividing by `k`"], answer: "`win += arr[i] - arr[i - k]`", hint: "Add incoming right item, subtract outgoing left item!", why: "Turns `O(n·k)` into `O(n)` single pass!" },
          { prompt: "Caching recursive subproblem outputs in a dict `memo[n]` is called:", options: ["Top-Down Memoization", "Bubble Sorting", "SQL Normalization", "Load Balancing"], answer: "Top-Down Memoization", hint: "Solve from `n` downward and save answers so you never recompute!", why: "Memoization collapses exponential trees into linear/polynomial DP." },
          { prompt: "Two core signs a problem fits Dynamic Programming:", options: ["Overlapping Subproblems + Optimal Substructure", "Unsorted Strings + HTML Tags", "Random Graphs + Zero Base Case", "Single Loop + Constant Input"], answer: "Overlapping Subproblems + Optimal Substructure", hint: "Repeated subproblems + optimal parts build optimal whole!", why: "When subproblems repeat, DP saves massive work." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "be-sql-select-where-order": () => {
        const bank = [
          { prompt: "True logical execution order of a SQL query:", options: ["`FROM → WHERE → SELECT → ORDER BY → LIMIT`", "`SELECT → FROM → WHERE → LIMIT → ORDER BY`", "`ORDER BY → FROM → SELECT → WHERE`", "`LIMIT → SELECT → FROM`"], answer: "`FROM → WHERE → SELECT → ORDER BY → LIMIT`", hint: "Load table → filter rows → pick columns → sort → cap!", why: "Explains why `WHERE` can't read `SELECT` aliases." },
          { prompt: "Correct SQL test for a missing (`NULL`) email column:", options: ["`WHERE email IS NULL`", "`WHERE email = NULL`", "`WHERE email == None`", "`WHERE email = ''`"], answer: "`WHERE email IS NULL`", hint: "`= NULL` is always UNKNOWN in SQL!", why: "Always use `IS NULL` / `IS NOT NULL`." },
          { prompt: "To sort scores from HIGHEST to LOWEST in SQL, write:", options: ["`ORDER BY score DESC`", "`ORDER BY score ASC`", "`SORT BY score HIGH`", "`GROUP BY score MAX`"], answer: "`ORDER BY score DESC`", hint: "`DESC` = descending (largest first)!", why: "`ASC` is default; `DESC` flips to highest first." },
          { prompt: "In SQL `LIKE`, what does `'S%'` match?", options: ["Any text starting with `'S'`", "Any text ending with `'S'`", "Exactly 2 letters", "Numbers only"], answer: "Any text starting with `'S'`", hint: "`%` is a multi-character wildcard!", why: "`'S%'` matches `'Sora'`, `'SQL'`, `'Systems'`." },
          { prompt: "Which keyword removes duplicate values from `SELECT role FROM heroes`?", options: ["`DISTINCT`", "`UNIQUE`", "`FILTER`", "`LIMIT`"], answer: "`DISTINCT`", hint: "`SELECT DISTINCT role FROM heroes`!", why: "`DISTINCT` deduplicates the returned result set." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "be-sql-joins-groupby-agg": () => {
        const bank = [
          { prompt: "Which SQL join preserves ALL rows from the left table, filling unmatched right columns with `NULL`?", options: ["`LEFT JOIN`", "`INNER JOIN`", "`CROSS JOIN`", "`EQUI JOIN`"], answer: "`LEFT JOIN`", hint: "`INNER` drops unmatched rows; `LEFT` keeps them!", why: "`LEFT JOIN` is essential for finding items with 0 children." },
          { prompt: "To filter grouped results where `SUM(xp) > 10000`, which clause MUST you use?", options: ["`HAVING SUM(xp) > 10000`", "`WHERE SUM(xp) > 10000`", "`LIMIT SUM(xp) > 10000`", "`FROM SUM(xp)`"], answer: "`HAVING SUM(xp) > 10000`", hint: "`WHERE` runs before `GROUP BY`; aggregates belong in `HAVING`!", why: "Row filter = `WHERE`, group aggregate filter = `HAVING`." },
          { prompt: "After `guilds g LEFT JOIN heroes h`, why use `COUNT(h.id)` instead of `COUNT(*)`?", options: ["`COUNT(h.id)` ignores `NULL`s so empty guilds accurately count as `0`", "`COUNT(*)` crashes on joins", "`COUNT(h.id)` sums IDs", "They give identical results"], answer: "`COUNT(h.id)` ignores `NULL`s so empty guilds accurately count as `0`", hint: "`COUNT(*)` counts the padded NULL row as 1!", why: "Always count a non-null right column after a `LEFT JOIN`." },
          { prompt: "Which pattern finds every customer who has NEVER placed an order?", options: ["`customers c LEFT JOIN orders o ON c.id = o.cust_id WHERE o.id IS NULL`", "`INNER JOIN orders WHERE o.id = 0`", "`SELECT * FROM orders LIMIT 0`", "`WHERE c.id = NULL`"], answer: "`customers c LEFT JOIN orders o ON c.id = o.cust_id WHERE o.id IS NULL`", hint: "Anti-join = `LEFT JOIN` + check right key `IS NULL`!", why: "Clean, fast, standard SQL anti-join pattern." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "be-sql-indexes-acid-transactions": () => {
        const bank = [
          { prompt: "What lookup speed does a B-Tree SQL Index typically achieve vs a Full Table Scan?", options: ["`O(log n)` instead of `O(n)`", "`O(n²)` instead of `O(n)`", "`O(2ⁿ)` instead of `O(1)`", "No speed difference"], answer: "`O(log n)` instead of `O(n)`", hint: "Balanced tree hops straight to the row instead of reading every row!", why: "Turns 10M-row scans into ~20 tree comparisons!" },
          { prompt: "Which ACID letter guarantees a multi-step bank transfer either COMPLETELY succeeds or COMPLETELY rolls back?", options: ["Atomicity (A)", "Consistency (C)", "Isolation (I)", "Durability (D)"], answer: "Atomicity (A)", hint: "Atomic = indivisible all-or-nothing!", why: "Prevents half-finished debits without credits." },
          { prompt: "The #1 defense against SQL Injection attacks in backend code:", options: ["Parameterized Queries / Prepared Statements (`$1`, `?`)", "Hiding table names in comments", "Using `SELECT *`", "Turning off indexes"], answer: "Parameterized Queries / Prepared Statements (`$1`, `?`)", hint: "Keeps user data strictly separate from executable SQL syntax!", why: "Input is bound as a literal value — never parsed as SQL commands." },
          { prompt: "Main tradeoff of adding many indexes to a table:", options: ["Faster `SELECT` reads, but slower `INSERT`/`UPDATE` writes + more disk storage", "Slower reads and faster writes", "Breaks `PRIMARY KEY` constraints", "Deletes duplicate rows"], answer: "Faster `SELECT` reads, but slower `INSERT`/`UPDATE` writes + more disk storage", hint: "Every write must keep each index B-Tree updated!", why: "Index selectively based on real query patterns." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "be-rest-apis-json-status-codes": () => {
        const bank = [
          { prompt: "HTTP status code for 'You are NOT logged in / missing valid token':", options: ["`401 Unauthorized`", "`403 Forbidden`", "`201 Created`", "`502 Bad Gateway`"], answer: "`401 Unauthorized`", hint: "401 = Who are you? (Authentication); 403 = Not allowed! (Authorization)", why: "401 asks for valid credentials." },
          { prompt: "HTTP status code for 'Logged in, but you lack Admin permission for this endpoint':", options: ["`403 Forbidden`", "`401 Unauthorized`", "`204 No Content`", "`404 Not Found`"], answer: "`403 Forbidden`", hint: "Identity is known, permission is denied!", why: "403 = Forbidden access." },
          { prompt: "HTTP status code returned by rate limiters when a client sends too many requests:", options: ["`429 Too Many Requests`", "`200 OK`", "`404 Not Found`", "`304 Not Modified`"], answer: "`429 Too Many Requests`", hint: "Client throttling signal!", why: "429 protects backends from traffic spikes." },
          { prompt: "Which HTTP verb is NOT idempotent by default (repeating it creates duplicate resources)?", options: ["`POST`", "`GET`", "`PUT`", "`DELETE`"], answer: "`POST`", hint: "Each `POST /orders` inserts a new order!", why: "Use Idempotency-Keys on payment `POST` requests." },
          { prompt: "HTTP `201 Created` is most appropriate after which request succeeds?", options: ["`POST /api/quests` creating a new quest", "`GET /api/quests` listing quests", "`DELETE /api/quests/1`", "A crashed database query"], answer: "`POST /api/quests` creating a new quest", hint: "201 explicitly signals new resource creation!", why: "Precise REST semantics help frontend clients." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "be-auth-hashing-jwt-oauth": () => {
        const bank = [
          { prompt: "What are the 3 dot-separated parts of a JWT (`a.b.c`)?", options: ["`Header.Payload.Signature`", "`Username.Password.Salt`", "`Host.Port.Path`", "`Key.Table.Row`"], answer: "`Header.Payload.Signature`", hint: "Algorithm header + Base64 claims + cryptographic signature!", why: "Signature validates header + payload integrity." },
          { prompt: "Can a user read the claims inside a standard JWT payload without knowing the server secret?", options: ["YES — the payload is only Base64url-encoded, NOT encrypted!", "NO — JWTs are always AES-256 encrypted", "Only on Linux", "Only after expiration"], answer: "YES — the payload is only Base64url-encoded, NOT encrypted!", hint: "Signed ≠ Encrypted!", why: "Never store sensitive secrets inside a JWT payload." },
          { prompt: "Best industry choice for hashing user passwords before storing in SQL:", options: ["`Argon2` or `bcrypt` (slow + unique per-user salt)", "Plaintext", "Unsalted `MD5`", "Base64 encoding"], answer: "`Argon2` or `bcrypt` (slow + unique per-user salt)", hint: "Deliberately slow + salted stops both Rainbow Tables and GPU cracking!", why: "One-way slow salted hashing protects credentials even after a DB breach." },
          { prompt: "Why put auth cookies in `HttpOnly` mode?", options: ["Blocks browser JavaScript (XSS) from reading `document.cookie`", "Makes cookies work without internet", "Disables TLS/HTTPS", "Increases JSON speed"], answer: "Blocks browser JavaScript (XSS) from reading `document.cookie`", hint: "Keeps stolen scripts from stealing session tokens!", why: "`HttpOnly; Secure; SameSite` hardens session cookies." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "be-linux-cli-pipes-permissions": () => {
        const bank = [
          { prompt: "In `chmod` octal bits (`r=4, w=2, x=1`), what permissions does `644` grant?", options: ["Owner: `rw-`, Group: `r--`, Others: `r--`", "Everyone: `rwx`", "Owner: `rwx`, Others: `---`", "Read-only for owner only"], answer: "Owner: `rw-`, Group: `r--`, Others: `r--`", hint: "`6 = 4+2 (rw-)`, `4 = 4 (r--)`!", why: "Standard config/source file permission (`644`)." },
          { prompt: "In `chmod`, what octal number locks a secret key to Owner Read+Write ONLY (`rw-------`)?", options: ["`600`", "`777`", "`755`", "`444`"], answer: "`600`", hint: "Owner `4+2 = 6`, Group `0`, Others `0`!", why: "`chmod 600` is required by SSH for private keys." },
          { prompt: "What does `grep ERROR app.log | wc -l` compute?", options: ["The number of lines in `app.log` containing `ERROR`", "Deletes all `ERROR` lines", "Lists all folders", "Restarts the server"], answer: "The number of lines in `app.log` containing `ERROR`", hint: "`grep` filters matching lines; `|` pipes them into `wc -l` (line count)!", why: "Classic one-line incident triage command." },
          { prompt: "Difference between `>` and `>>` in Bash output redirection:", options: ["`>` overwrites the target file; `>>` appends to the end", "`>>` deletes the file", "`>` pipes to another process", "No difference"], answer: "`>` overwrites the target file; `>>` appends to the end", hint: "Single arrow replaces; double arrow appends!", why: "Use `>>` for log files so you don't erase history." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "be-git-internals-branching-rebase": () => {
        const bank = [
          { prompt: "What are the 3 local Git areas a change moves through?", options: ["Working Directory → Staging Area (`git add`) → Repository History (`git commit`)", "RAM → CPU → GPU", "HTML → CSS → JS", "Remote → Zip → Trash"], answer: "Working Directory → Staging Area (`git add`) → Repository History (`git commit`)", hint: "`add` stages; `commit` snapshots!", why: "Staging gives you surgical control over every commit." },
          { prompt: "Command to create AND switch to a new branch named `feat-search`:", options: ["`git checkout -b feat-search` (or `git switch -c feat-search`)", "`git merge feat-search`", "`git init feat-search`", "`git log feat-search`"], answer: "`git checkout -b feat-search` (or `git switch -c feat-search`)", hint: "`-b` / `-c` creates and switches in one step!", why: "Keeps `main` clean while you build new features." },
          { prompt: "The Golden Rule of `git rebase`:", options: ["Never rebase commits already pushed to a shared public branch (like `main`)", "Always force-push `main` daily", "Never branch off `main`", "Rebase deletes `.gitignore`"], answer: "Never rebase commits already pushed to a shared public branch (like `main`)", hint: "Rebase rewrites commit SHA hashes!", why: "Rebasing local private branches is clean; rewriting shared history breaks teammates." },
          { prompt: "What is a Git branch internally?", options: ["A tiny movable pointer to a commit hash", "A full copy of every file on disk", "A cloud database", "A zip backup"], answer: "A tiny movable pointer to a commit hash", hint: "41 bytes pointing to a SHA commit!", why: "That's why branching in Git is instantaneous." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "be-docker-ci-system-design": () => {
        const bank = [
          { prompt: "Relationship between a Docker **Image** and a Docker **Container**:", options: ["Image = immutable blueprint; Container = live running instance", "Container = static file; Image = running process", "They are unrelated tools", "Images only store PNGs"], answer: "Image = immutable blueprint; Container = live running instance", hint: "Like a Class vs an Object instance!", why: "Spin up 1 or 100 identical containers from one Image." },
          { prompt: "Adding more API server instances behind a Load Balancer is called:", options: ["Horizontal Scaling (scaling out)", "Vertical Scaling (scaling up)", "SQL Normalization", "Garbage Collection"], answer: "Horizontal Scaling (scaling out)", hint: "More machines side-by-side = Horizontal!", why: "Horizontal scaling removes single-server limits and boosts uptime." },
          { prompt: "Why place an in-memory **Redis Cache** in front of a PostgreSQL database?", options: ["Serves hot reads from RAM in ~1ms and shields SQL from repetitive read spikes", "Replaces HTTPS certificates", "Compiles JavaScript", "Removes the need for backups"], answer: "Serves hot reads from RAM in ~1ms and shields SQL from repetitive read spikes", hint: "RAM is ~20–100× faster than disk DB queries!", why: "Cache-aside + TTL scales read-heavy apps massively." },
          { prompt: "Best way to handle slow 5-second video/email jobs triggered by an HTTP endpoint:", options: ["Enqueue onto an Async Message Queue and return immediately (`202 Accepted`)", "Block the HTTP thread for 5 seconds", "Run it in browser CSS", "Drop the request"], answer: "Enqueue onto an Async Message Queue and return immediately (`202 Accepted`)", hint: "Background workers decouple heavy tasks from API latency!", why: "Keeps UX snappy and adds retry resilience." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "js-closures-scope-hoisting": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const base = randInt(3, 12), add = randInt(2, 9);
          return {
            type: "mc",
            prompt: `JS Closure: \`const f = ((x) => (y) => x + y)(${base});\` What does \`f(${add})\` return?`,
            options: numOpts(base + add, [-2, -1, 1, 2, 3]),
            answer: String(base + add),
            hint: `Inner function remembers \`x = ${base}\` in its lexical backpack!`,
            whyEasy: `\`${base} + ${add} = ${base + add}\` via closure.`
          };
        }
        const bank = [
          { prompt: "Why does `const arr = [1]; arr.push(2);` work in JavaScript?", options: ["`const` locks the variable binding, not internal mutation of objects/arrays", "`const` is ignored on arrays", "Arrays are primitives", "Strict mode allows reassigning `const`"], answer: "`const` locks the variable binding, not internal mutation of objects/arrays", hint: "You can't do `arr = [9]`, but you can mutate its elements!", why: "`const` prevents binding reassignment." },
          { prompt: "How does an arrow function `() => {}` bind `this`?", options: ["Lexically inherits `this` from the outer enclosing scope", "Creates a brand-new `this` on every call", "Always sets `this = null`", "Uses `var` hoisting"], answer: "Lexically inherits `this` from the outer enclosing scope", hint: "No more `const self = this` hacks!", why: "Arrow functions capture outer `this` automatically." },
          { prompt: "Scope difference between `let` and legacy `var`:", options: ["`let` is block-scoped (`{ ... }`); `var` is function-scoped and leaks out of `if`/`for` blocks", "`var` is block-scoped; `let` is global", "They have identical scoping", "`let` cannot be reassigned"], answer: "`let` is block-scoped (`{ ... }`); `var` is function-scoped and leaks out of `if`/`for` blocks", hint: "Modern JS uses `const` by default and `let` when reassigning!", why: "Block scope prevents classic loop closure bugs." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "js-functional-map-filter-reduce": () => {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const k = randInt(2, 4);
          const a = randInt(2, 5), b = randInt(6, 9);
          const ans = (a + b) * k;
          return {
            type: "mc",
            prompt: `JS Pipeline: \`[${a}, ${b}].map(x => x * ${k}).reduce((s, x) => s + x, 0)\` evaluates to:`,
            options: numOpts(ans, [-k, -1, 1, k, 2]),
            answer: String(ans),
            hint: `Multiply each by \`${k}\` (\`${a * k}, ${b * k}\`), then sum!`,
            whyEasy: `\`${a * k} + ${b * k} = ${ans}\`!`
          };
        }
        const bank = [
          { prompt: "Which array method ALWAYS returns a new array of the EXACT same length?", options: ["`.map()`", "`.filter()`", "`.reduce()`", "`.find()`"], answer: "`.map()`", hint: "1-to-1 transformation of every element!", why: "`.map()` transforms; `.filter()` shrinks; `.reduce()` folds to 1 value." },
          { prompt: "Why pass `0` as the 2nd argument in `nums.reduce((a, b) => a + b, 0)`?", options: ["Prevents a `TypeError` crash when `nums` is empty `[]`", "Makes `reduce` mutate `nums`", "Starts summing at index 1 only", "Converts numbers to strings"], answer: "Prevents a `TypeError` crash when `nums` is empty `[]`", hint: "`[].reduce(fn)` throws without an initial value!", why: "Explicit `init` keeps pipelines crash-proof." },
          { prompt: "Correct way to numerically sort `[10, 2, 30]` ascending in JavaScript:", options: ["`arr.sort((a, b) => a - b)`", "`arr.sort()`", "`arr.filter()`", "`arr.reverse()`"], answer: "`arr.sort((a, b) => a - b)`", hint: "Default `.sort()` sorts alphabetically as strings (`10` before `2`)!", why: "Always pass `(a, b) => a - b` for numeric sorting." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "js-async-promises-event-loop": () => {
        const bank = [
          { prompt: "After synchronous code finishes, which queue does the JS Event Loop drain FIRST?", options: ["Microtask Queue (`Promise.then` / `await`)", "Macrotask Queue (`setTimeout` / `setInterval`)", "CSS Animation Queue", "Disk I/O Queue"], answer: "Microtask Queue (`Promise.then` / `await`)", hint: "Microtasks ALWAYS run before the next Macrotask!", why: "Even `setTimeout(fn, 0)` waits behind resolved Promises." },
          { prompt: "Best way to run 3 independent async fetches (`fetchA`, `fetchB`, `fetchC`) in parallel:", options: ["`await Promise.all([fetchA(), fetchB(), fetchC()])`", "Three sequential `await` lines", "`items.forEach(async ...)`", "`setTimeout` loop"], answer: "`await Promise.all([fetchA(), fetchB(), fetchC()])`", hint: "Fire all 3 simultaneously instead of waiting one by one!", why: "Total wait = slowest request, not the sum of all 3!" },
          { prompt: "What does `async function getNum() { return 7; }` return when called as `getNum()`?", options: ["A `Promise` resolving to `7`", "Plain integer `7`", "`undefined`", "`[7]`"], answer: "A `Promise` resolving to `7`", hint: "`async` ALWAYS wraps returns in a Promise!", why: "Await or `.then()` to unwrap the resolved value." },
          { prompt: "Why is `arr.forEach(async x => await save(x))` a famous async bug?", options: ["`.forEach()` does NOT await returned Promises — loop finishes before saves complete!", "`.forEach()` throws a SyntaxError", "Promises don't work in arrays", "JS bans `await` in loops"], answer: "`.forEach()` does NOT await returned Promises — loop finishes before saves complete!", hint: "Use `for...of` (sequential) or `Promise.all(arr.map(...))` (parallel)!", why: "`.forEach` discards callback return values." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "js-fetch-dom-state-components": () => {
        const bank = [
          { prompt: "When `fetch('/missing')` gets a `404` status, what does the Promise do?", options: ["Resolves with `res.ok === false` (must check `if (!res.ok)`!)", "Automatically rejects into `catch`", "Retries forever", "Reloads the page"], answer: "Resolves with `res.ok === false` (must check `if (!res.ok)`!)", hint: "Only network failure rejects `fetch()`!", why: "Always guard `if (!res.ok) throw new Error(res.status)`." },
          { prompt: "Safest DOM property for displaying untrusted user text without XSS risk:", options: ["`el.textContent`", "`el.innerHTML`", "`document.write()`", "`eval()`"], answer: "`el.textContent`", hint: "`innerHTML` parses HTML/scripts; `textContent` renders plain text!", why: "Zero HTML parsing = zero XSS injection." },
          { prompt: "Core principle behind React & clean frontend apps:", options: ["Single source of truth: `UI = render(state)`", "Storing data only inside DOM CSS classes", "Mutating random elements without state", "Global `eval()` calls"], answer: "Single source of truth: `UI = render(state)`", hint: "Update state → re-render deterministically!", why: "Eliminates out-of-sync UI glitches." },
          { prompt: "Attaching ONE click listener to a parent `<ul>` for 500 `<li>` items uses:", options: ["Event Delegation (`e.target.closest('li')`)", "Event Duplication", "SQL Join", "Recursion"], answer: "Event Delegation (`e.target.closest('li')`)", hint: "Clicks bubble up to the parent container!", why: "1 listener handles dynamic items effortlessly." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "ts-types-interfaces-generics": () => {
        const bank = [
          { prompt: "Runtime performance cost of TypeScript type annotations after compilation:", options: ["Zero — all types are erased at compile time", "2× slower runtime", "10 MB extra RAM per type", "Requires a cloud server"], answer: "Zero — all types are erased at compile time", hint: "TypeScript compiles down to standard plain JS!", why: "Full compile-time safety with 0ms runtime penalty." },
          { prompt: "Safer TypeScript top-type that forces narrowing before use:", options: ["`unknown`", "`any`", "`void`", "`never`"], answer: "`unknown`", hint: "`any` turns off the type checker; `unknown` demands proof!", why: "Always narrow `unknown` with `typeof` / type guards." },
          { prompt: "Purpose of Generics (`function wrap<T>(val: T): { value: T }`):", options: ["Write reusable logic while preserving the exact caller type `T`", "Force every value into a string", "Disable `strictNullChecks`", "Run code on a GPU"], answer: "Write reusable logic while preserving the exact caller type `T`", hint: "Type parameters flow input types cleanly to output types!", why: "Reusability + strict type precision together." },
          { prompt: "A union `{ ok: true; data: T } | { ok: false; err: string }` narrowed via `if (r.ok)` is a:", options: ["Discriminated Union", "SQL Foreign Key", "Hash Collision", "Event Loop"], answer: "Discriminated Union", hint: "Shared literal discriminant tag (`ok`) narrows safely!", why: "Prevents accessing `data` on error responses at compile time." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "code-oop-solid-design-patterns": () => {
        const bank = [
          { prompt: "Classic OOP architectural guideline for staying flexible over time:", options: ["Favor Composition over deep Inheritance", "Use at least 7 levels of Inheritance", "Put all code in one global function", "Never pass arguments to constructors"], answer: "Favor Composition over deep Inheritance", hint: "Compose small focused behaviors instead of rigid class trees!", why: "'Has-a' composition stays decoupled and easy to evolve." },
          { prompt: "What does the `S` in SOLID stand for?", options: ["Single Responsibility Principle", "Static Rendering Pattern", "Sequential Recursion Protocol", "Shared Root Pointer"], answer: "Single Responsibility Principle", hint: "One focused job per module/class!", why: "Keeps changes isolated and safe." },
          { prompt: "Passing a `database` or `mailer` object into a service constructor so tests can supply mocks is:", options: ["Dependency Injection", "SQL Injection", "Recursion", "Memoization"], answer: "Dependency Injection", hint: "Inject collaborators instead of hardcoding global singletons!", why: "Makes business logic 100% unit-testable offline." },
          { prompt: "Swapping interchangeable algorithms (e.g. `FlatDiscount` vs `PercentDiscount`) via a common interface is the:", options: ["Strategy Pattern", "Deadlock Pattern", "Singleton Anti-Pattern", "Bubble Pattern"], answer: "Strategy Pattern", hint: "Eliminates giant `if/elif/elif` chains cleanly!", why: "Add new strategies without modifying existing orchestration code." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "code-testing-tdd-debugging": () => {
        const bank = [
          { prompt: "Correct TDD cycle order:", options: ["Red → Green → Refactor", "Ship → Hope → Patch", "Refactor → Red → Delete", "Green → Skip → Ship"], answer: "Red → Green → Refactor", hint: "Failing test → minimal pass → clean refactor!", why: "Tests become an instant regression safety net." },
          { prompt: "The 3 standard sections of a clean Unit Test (AAA):", options: ["Arrange → Act → Assert", "Allocate → Append → Archive", "Add → Alter → Async", "Auth → API → Admin"], answer: "Arrange → Act → Assert", hint: "Setup inputs → run code → check result!", why: "Makes every test readable in 2 seconds." },
          { prompt: "Command that binary-searches Git history to find the exact commit that introduced a bug:", options: ["`git bisect`", "`git init`", "`git clone`", "`git branch`"], answer: "`git bisect`", hint: "Halves suspect commits every test (`O(log n)`)!", why: "Finds the culprit among 1,000 commits in ~10 steps." },
          { prompt: "Which test input catches the `best = 0` bug in a `find_max(nums)` function?", options: ["All-negative list `[-8, -2, -15]`", "Positive list `[1, 5, 3]`", "Single positive `[9]`", "Sorted `[1, 2, 3]`"], answer: "All-negative list `[-8, -2, -15]`", hint: "Zero is larger than every negative number!", why: "Boundary/negative edge cases expose silent assumptions." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      },

      "code-memory-concurrency-race-conditions": () => {
        const bank = [
          { prompt: "In Python/JS, `a = [1, 2]; b = a; b.append(3);` leaves `a` equal to:", options: ["`[1, 2, 3]` (both point to the same Heap array)", "`[1, 2]` (copied)", "`[3]`", "Error"], answer: "`[1, 2, 3]` (both point to the same Heap array)", hint: "Objects/lists copy references, not contents!", why: "Use `.copy()` or `[...a]` to clone cleanly." },
          { prompt: "Two concurrent workers both read `balance = 100` and each writes `100 + 50 = 150` (losing one deposit). This bug is a:", options: ["Race Condition", "Syntax Error", "Binary Search", "Closure"], answer: "Race Condition", hint: "Interleaved non-atomic Read-Modify-Write!", why: "Fix with atomic DB updates or a Mutex lock." },
          { prompt: "Thread 1 holds Lock A waiting for Lock B; Thread 2 holds Lock B waiting for Lock A:", options: ["Deadlock", "Cache Hit", "Memoization", "Idempotency"], answer: "Deadlock", hint: "Circular wait freezes both threads permanently!", why: "Prevent by always acquiring locks in a fixed global order." },
          { prompt: "Where do local function call frames live during execution?", options: ["The Call Stack (LIFO, fast, auto-freed on return)", "Hard Drive SQL Table", "Browser LocalStorage", "DNS Cache"], answer: "The Call Stack (LIFO, fast, auto-freed on return)", hint: "Short-lived local frames = Stack; dynamic objects = Heap!", why: "Stack is ultra-fast LIFO memory; Heap holds long-lived objects." }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.why };
      }
    });
  }

  // ==================== WORKED EXAMPLES FOR ALL 24 NEW NODES ====================
  if (LATEX && typeof LATEX.registerWorkedExamples === "function") {
    LATEX.registerWorkedExamples({
      "dsa-arrays-hashing-two-pointers": {
        heroFormula: "$$O(n^2) \\xrightarrow{\\text{Hash Map } O(1)\\text{ lookup}} O(n) \\text{ time},\\; O(n)\\text{ space}$$",
        title: "Solving Two-Sum in One Pass with a Hash Map",
        problemLatex: "$$\\text{nums} = [2, 7, 11, 15],\\quad \\text{target} = 9 \\implies \\text{find } [i, j]$$",
        steps: [
          { label: "Step 1: Index 0 (val = 2)", mathLatex: "$\\text{need} = 9 - 2 = 7 \\notin \\text{seen} \\implies \\text{seen}[2] = 0$", plainWhy: "Not seen yet — store `2 → index 0` in our O(1) dict." },
          { label: "Step 2: Index 1 (val = 7)", mathLatex: "$\\text{need} = 9 - 7 = 2 \\in \\text{seen} \\;(\\text{at index } 0!)$", plainWhy: "Instant `O(1)` hit! No inner loop needed." },
          { label: "Step 3: Return Pair Immediately", mathLatex: "$[\\text{seen}[2],\\; 1] = [0, 1]$", plainWhy: "Total work = 2 operations instead of checking every pair!" }
        ],
        answerLatex: "$$[0, 1] \\text{ in } O(n) \\text{ time}$$",
        commonTrap: "Never check `seen` with a Python `list` (`O(n)` scan!) — always use a `dict` or `set` for `O(1)`!"
      },
      "dsa-stacks-queues-deques": {
        heroFormula: "$$\\text{Stack} = \\text{LIFO } (O(1)\\text{ push/pop}) \\quad|\\quad \\text{Queue} = \\text{FIFO } (O(1)\\text{ deque})$$",
        title: "Tracing Balanced Brackets with a LIFO Stack",
        problemLatex: "$$s = \\text{'([()])'} \\implies \\text{Valid or Invalid?}$$",
        steps: [
          { label: "Push Openers onto Top", mathLatex: "$\\text{Stack}: [\\text{'('}] \\to [\\text{'('},\\text{'['}] \\to [\\text{'('},\\text{'['},\\text{'('}]$", plainWhy: "Each opener waits for its matching closer." },
          { label: "Pop & Match Closers in Reverse", mathLatex: "$\\text{')'} \\leftrightarrow \\text{'('} \\checkmark,\\quad \\text{']'} \\leftrightarrow \\text{'['} \\checkmark,\\quad \\text{')'} \\leftrightarrow \\text{'('} \\checkmark$", plainWhy: "Top of stack matches every closing symbol!" },
          { label: "Verify Empty Stack at End", mathLatex: "$\\text{len}(\\text{stack}) = 0 \\implies \\mathbf{\\text{True}}$", plainWhy: "Zero leftover unclosed brackets!" }
        ],
        answerLatex: "$$\\text{Valid (True)}$$",
        commonTrap: "Always check `len(stack) == 0` at the end so `'((('` isn't falsely marked valid!"
      },
      "dsa-linked-lists-pointers": {
        heroFormula: "$$\\text{nxt} = \\text{curr.next},\\quad \\text{curr.next} = \\text{prev},\\quad \\text{prev} = \\text{curr},\\quad \\text{curr} = \\text{nxt}$$",
        title: "Reversing `1 → 2 → 3 → None` In-Place in O(1) Space",
        problemLatex: "$$1 \\to 2 \\to 3 \\to \\text{None} \\implies 3 \\to 2 \\to 1 \\to \\text{None}$$",
        steps: [
          { label: "Iteration 1 (`curr = 1`)", mathLatex: "$\\text{Save } 2;\\; 1 \\to \\text{None};\\; \\text{prev} = 1,\\; \\text{curr} = 2$", plainWhy: "Node 1 becomes the new tail cleanly." },
          { label: "Iteration 2 (`curr = 2`)", mathLatex: "$\\text{Save } 3;\\; 2 \\to 1;\\; \\text{prev} = 2,\\; \\text{curr} = 3$", plainWhy: "Arrow flips backwards while `3` stays safely saved." },
          { label: "Iteration 3 (`curr = 3`)", mathLatex: "$\\text{Save None};\\; 3 \\to 2;\\; \\text{return prev} = 3$", plainWhy: "New head is `3` in `O(n)` time and `O(1)` space!" }
        ],
        answerLatex: "$$3 \\to 2 \\to 1 \\to \\text{None}$$",
        commonTrap: "Forgetting to save `nxt = curr.next` BEFORE flipping `curr.next = prev` breaks the chain!"
      },
      "dsa-recursion-call-stack": {
        heroFormula: "$$f(1) = 1, \\qquad f(n) = n \\cdot f(n - 1) \\;\\;(n > 1)$$",
        title: "Watching Call Stack Push & Unwind on `factorial(4)`",
        problemLatex: "$$\\text{Trace } \\text{factorial}(4)$$",
        steps: [
          { label: "Push Frames Down to Base Case", mathLatex: "$f(4) \\to f(3) \\to f(2) \\to f(1) = 1$", plainWhy: "4 frames wait on the LIFO Call Stack until `f(1)` hits the base case." },
          { label: "Unwind Bottom-Up", mathLatex: "$f(2) = 2 \\cdot 1 = 2 \\implies f(3) = 3 \\cdot 2 = 6$", plainWhy: "Each frame finishes its multiplication once its child returns." },
          { label: "Final Top Frame Return", mathLatex: "$f(4) = 4 \\cdot 6 = 24$", plainWhy: "Stack returns to empty with exact answer `24`!" }
        ],
        answerLatex: "$$\\text{factorial}(4) = 24$$",
        commonTrap: "Always verify your base case is reachable — missing base cases cause `RecursionError`!"
      },
      "dsa-binary-search-sorting": {
        heroFormula: "$$\\text{mid} = \\text{floor}((\\text{lo} + \\text{hi}) / 2) \\implies \\le \\log_2(n) + 1 \\text{ steps}$$",
        title: "Tracing Binary Search on `[2, 5, 9, 14, 21, 33]` for `21`",
        problemLatex: "$$\\text{target} = 21,\\quad \\text{lo} = 0,\\; \\text{hi} = 5$$",
        steps: [
          { label: "Step 1: Check Midpoint Index 2", mathLatex: "$\\text{mid} = (0+5)//2 = 2,\\; \\text{nums}[2] = 9 < 21 \\implies \\text{lo} = 3$", plainWhy: "Discard left half `[2, 5, 9]` instantly!" },
          { label: "Step 2: Check Midpoint Index 4", mathLatex: "$\\text{mid} = (3+5)//2 = 4,\\; \\text{nums}[4] = 21 = \\text{target}$", plainWhy: "Direct hit on just the 2nd check!" },
          { label: "Confirm O(log n) Scaling", mathLatex: "$\\log_2(1{,}000{,}000) \\approx 20 \\text{ steps max!}$", plainWhy: "Halving every iteration crushes huge sorted datasets." }
        ],
        answerLatex: "$$\\text{Index } 4 \\text{ (2 checks)}$$",
        commonTrap: "Always advance `lo = mid + 1` or `hi = mid - 1` — `lo = mid` causes infinite loops!"
      },
      "dsa-trees-bst-heaps": {
        heroFormula: "$$\\text{BST}:\\; \\text{Left} < \\text{Root} < \\text{Right} \\quad|\\quad \\text{Heap children}:\\; 2i+1,\\; 2i+2$$",
        title: "Extracting Sorted Output via BST In-Order Traversal",
        problemLatex: "$$\\text{Root } 10,\\; \\text{Left } 5 \\;(2, 7),\\; \\text{Right } 15 \\implies \\text{In-Order?}$$",
        steps: [
          { label: "Visit Left Subtree (Root 5)", mathLatex: "$\\text{Left}(2) \\to \\text{Node}(5) \\to \\text{Right}(7) \\implies [2, 5, 7]$", plainWhy: "Always go all the way left first!" },
          { label: "Visit Main Root", mathLatex: "$\\text{Append } 10 \\implies [2, 5, 7, 10]$", plainWhy: "Root sits neatly between left and right subtrees." },
          { label: "Visit Right Subtree", mathLatex: "$\\text{Append } 15 \\implies [2, 5, 7, 10, 15]$", plainWhy: "Perfect ascending sorted order automatically!" }
        ],
        answerLatex: "$$[2, 5, 7, 10, 15]$$",
        commonTrap: "Inserting already-sorted data into an unbalanced BST makes height `O(n)` instead of `O(log n)`!"
      },
      "dsa-graphs-bfs-dfs-dijkstra": {
        heroFormula: "$$\\text{BFS/DFS}:\\; O(V + E) \\quad|\\quad \\text{Dijkstra (Heap)}:\\; O((V+E)\\log V)$$",
        title: "Finding Minimum Hops from `A` to `E` with BFS",
        problemLatex: "$$A \\to [B, C],\\; B \\to [D],\\; C \\to [D, E] \\implies \\text{Shortest hops } A \\to E$$",
        steps: [
          { label: "Distance 0: Start Queue", mathLatex: "$\\text{queue} = [(A, 0)],\\; \\text{visited} = [A]$", plainWhy: "Mark `A` visited immediately upon enqueueing." },
          { label: "Distance 1: Expand A's Neighbors", mathLatex: "$\\text{Enqueue } (B, 1),\\; (C, 1);\\; \\text{visited} = [A, B, C]$", plainWhy: "All 1-hop nodes queued before any 2-hop node." },
          { label: "Distance 2: Pop B, then C → Hit E!", mathLatex: "$C \\to E \\text{ at distance } 1 + 1 = 2$", plainWhy: "First arrival at `E` in BFS is guaranteed shortest!" }
        ],
        answerLatex: "$$\\text{Shortest Distance} = 2 \\text{ hops } (A \\to C \\to E)$$",
        commonTrap: "Forgetting `visited` on cyclic graphs causes infinite loops!"
      },
      "dsa-dp-memoization-sliding-window": {
        heroFormula: "$$\\text{Window}:\\; W_i = W_{i-1} + a_i - a_{i-k} \\quad|\\quad \\text{DP}:\\; dp[n] = dp[n-1] + dp[n-2]$$",
        title: "Sliding Window Max Sum of Width `k = 3` in O(n)",
        problemLatex: "$$\\text{nums} = [4, 2, 7, 1, 9, 3],\\; k = 3 \\implies \\text{Max 3-item sum?}$$",
        steps: [
          { label: "Initial Window `[4, 2, 7]`", mathLatex: "$W_0 = 4 + 2 + 7 = 13,\\; \\text{best} = 13$", plainWhy: "Sum the first `k` items once." },
          { label: "Slide 1 & 2 (`+right, -left`)", mathLatex: "$W_1 = 13 + 1 - 4 = 10;\\quad W_2 = 10 + 9 - 2 = 17 \\;(\\text{new best!})$", plainWhy: "Constant `O(1)` update per slide!" },
          { label: "Slide 3 (`+3, -7`)", mathLatex: "$W_3 = 17 + 3 - 7 = 13 \\implies \\text{best} = 17$", plainWhy: "Single `O(n)` pass finds `[7, 1, 9] = 17`!" }
        ],
        answerLatex: "$$\\text{Max Sum} = 17 \\text{ in } O(n) \\text{ time}$$",
        commonTrap: "Re-summing `sum(nums[i:i+k])` inside the loop silently degrades back to `O(n·k)`!"
      },
      "be-sql-select-where-order": {
        heroFormula: "$$\\text{FROM} \\to \\text{WHERE} \\to \\text{SELECT} \\to \\text{ORDER BY} \\to \\text{LIMIT}$$",
        title: "Tracing SQL Logical Pipeline on `heroes`",
        problemLatex: "$$\\text{Top 2 active heroes with } \\text{xp} \\ge 4000 \\text{ ordered highest first}$$",
        steps: [
          { label: "1. FROM + WHERE (Filter Rows First)", mathLatex: "$\\text{heroes (8 rows)} \\xrightarrow{\\text{active}=1 \\land \\text{xp}\\ge 4000} \\text{4 heroes (Aria, Kael, Sora, Mira)}$", plainWhy: "Rows failing `WHERE` are dropped before sorting." },
          { label: "2. SELECT + ORDER BY xp DESC", mathLatex: "$\\text{Kael (6850)} > \\text{Sora (5900)} > \\text{Mira (4700)} > \\text{Aria (4200)}$", plainWhy: "`DESC` puts highest XP at the top." },
          { label: "3. LIMIT 2", mathLatex: "$\\text{Return top 2}:\\; \\text{Kael (6850)},\\; \\text{Sora (5900)}$", plainWhy: "Truncation runs dead last after sorting!" }
        ],
        answerLatex: "$$\\text{Kael (6850)},\\; \\text{Sora (5900)}$$",
        commonTrap: "Never test NULL with `= NULL` — always write `IS NULL`!"
      },
      "be-sql-joins-groupby-agg": {
        heroFormula: "$$\\text{WHERE (rows)} \\to \\text{GROUP BY} \\to \\text{HAVING (aggregates)}$$",
        title: "Joining `guilds` & `heroes` to Rank Active Guild XP",
        problemLatex: "$$\\text{Guilds with } \\ge 2 \\text{ heroes, sorted by } \\text{SUM(xp) DESC}$$",
        steps: [
          { label: "INNER JOIN on Foreign Key", mathLatex: "$\\text{guilds } g \\text{ JOIN } \\text{heroes } h \\text{ ON } g.\\text{id} = h.\\text{guildId} \\implies 7 \\text{ matched rows}$", plainWhy: "Hero Zane (`guild_id = NULL`) is excluded by `INNER JOIN`." },
          { label: "GROUP BY g.name & Aggregate", mathLatex: "$\\text{Iron: } 2\\text{ (12750)},\\; \\text{Obsidian: } 3\\text{ (11300)},\\; \\text{Quantum: } 2\\text{ (4450)}$", plainWhy: "Collapse rows into one summary row per guild." },
          { label: "HAVING + ORDER BY", mathLatex: "$\\text{COUNT}(h.\\text{id}) \\ge 2 \\implies \\text{Iron Compilers ranks Top 1!}$", plainWhy: "`HAVING` filters aggregate counts cleanly." }
        ],
        answerLatex: "$$\\text{Rank 1: Iron Compilers (12{,}750 XP)}$$",
        commonTrap: "Putting `COUNT(*)` inside `WHERE` throws an error — always put aggregate conditions in `HAVING`!"
      },
      "be-sql-indexes-acid-transactions": {
        heroFormula: "$$\\text{Full Scan } O(n) \\xrightarrow{\\text{B-Tree Index}} O(\\log n) \\quad|\\quad \\text{ACID Transaction}$$",
        title: "Speeding Up a 10M-Row Email Lookup + Safe Transfer",
        problemLatex: "$$\\text{10{,}000{,}000 users: Scan vs. B-Tree Index } (\\log_2 10^7)$$",
        steps: [
          { label: "Without Index (Full Table Scan)", mathLatex: "$\\approx 10{,}000{,}000 \\text{ row checks} \\implies \\text{hundreds of ms}$", plainWhy: "Must read every page on disk!" },
          { label: "With B-Tree Index on `email`", mathLatex: "$\\log_2(10^7) \\approx 23 \\text{ comparisons (3--4 disk pages)} \\implies \\approx 1\\text{ ms!}$", plainWhy: "Index jumps directly to the row pointer." },
          { label: "Wrap Writes in `BEGIN ... COMMIT`", mathLatex: "$\\text{Debit A} + \\text{Credit B} \\text{ atomic} \\implies \\text{Rollback on crash!}$", plainWhy: "ACID Atomicity protects money invariants." }
        ],
        answerLatex: "$$\\approx 23 \\text{ B-Tree ops } (\\approx 400{,}000\\times \\text{ fewer checks!})$$",
        commonTrap: "Never concatenate user input into SQL strings — always bind parameters (`$1`) to block SQLi!"
      },
      "be-rest-apis-json-status-codes": {
        heroFormula: "$$2\\text{xx OK} \\;|\\; 401\\text{ AuthN} \\;|\\; 403\\text{ AuthZ} \\;|\\; 404\\text{ Missing} \\;|\\; 429\\text{ Limit} \\;|\\; 5\\text{xx Server}$$",
        title: "Designing Clean REST Endpoints for a Quest Service",
        problemLatex: "$$\\text{Create quest, update title, and guard admin deletion}$$",
        steps: [
          { label: "Create Resource (Non-Idempotent)", mathLatex: "$\\text{POST /api/quests} \\implies \\mathbf{201\\text{ Created}}$", plainWhy: "Use noun `/quests`, POST verb, and `201` status." },
          { label: "Partial Update (Idempotent)", mathLatex: "$\\text{PATCH /api/quests/42} \\text{ (title only)} \\implies \\mathbf{200\\text{ OK}}$", plainWhy: "`PATCH` edits only specified fields without replacing everything." },
          { label: "Permission Check on Delete", mathLatex: "$\\text{Not logged in} \\to 401;\\quad \\text{Non-admin} \\to 403;\\quad \\text{Admin} \\to 204$", plainWhy: "Exact status codes tell clients how to react!" }
        ],
        answerLatex: "$$\\text{POST } (201) \\cdot \\text{PATCH } (200) \\cdot \\text{DELETE } (401/403/204)$$",
        commonTrap: "Never confuse `401` (unauthenticated) with `403` (authenticated but forbidden)!"
      },
      "be-auth-hashing-jwt-oauth": {
        heroFormula: "$$\\text{JWT} = \\text{Base64}(\\text{Header}) \\cdot \\text{Base64}(\\text{Payload}) \\cdot \\text{HMAC}(\\text{Secret})$$",
        title: "Verifying a Login & Issuing a Safe Auth Session",
        problemLatex: "$$\\text{Password verification + Tamper-proof token verification}$$",
        steps: [
          { label: "Verify Password Safely", mathLatex: "$\\text{Argon2}(\\text{input} + \\text{salt}) = \\text{storedHash} \\;(\\text{verify!})$", plainWhy: "Never decrypt — re-hash input with the stored salt and compare!" },
          { label: "Sign Non-Sensitive Claims", mathLatex: "$\\text{payload}:\\; \\text{sub} = 42,\\; \\text{role} = \\text{'dev'},\\; \\text{exp} = t+900$", plainWhy: "Short expiry, zero secrets in Base64 payload." },
          { label: "Deliver via `HttpOnly` Cookie", mathLatex: "$\\text{Set-Cookie: } \\text{HttpOnly; Secure; SameSite=Lax}$", plainWhy: "Shields token from XSS `document.cookie` theft." }
        ],
        answerLatex: "$$\\text{Argon2 + Salted Hash + Short Signed Token + HttpOnly Cookie}$$",
        commonTrap: "Base64 encoding in a JWT is NOT encryption — anyone can read the payload!"
      },
      "be-linux-cli-pipes-permissions": {
        heroFormula: "$$r = 4,\\quad w = 2,\\quad x = 1 \\implies 7 = \\text{rwx},\\; 5 = \\text{r-x},\\; 6 = \\text{rw-}$$",
        title: "Decoding `chmod 755` & Piping Live Server Logs",
        problemLatex: "$$\\text{Compute symbolic permissions for } 755 \\text{ and } 600$$",
        steps: [
          { label: "Break Down `755` Digit by Digit", mathLatex: "$7 = 4+2+1\\,(\\text{rwx}),\\quad 5 = 4+1\\,(\\text{r-x}),\\quad 5 = 4+1\\,(\\text{r-x})$", plainWhy: "Owner full control; group & others read + execute." },
          { label: "Break Down `600` (Private Key)", mathLatex: "$6 = 4+2\\,(\\text{rw-}),\\quad 0\\,(---),\\quad 0\\,(---)$", plainWhy: "Zero group/world access — SSH safe!" },
          { label: "Chain Commands with Pipe `|`", mathLatex: "$\\text{grep ERROR server.log } | \\text{ wc -l} \\implies \\text{exact error count}$", plainWhy: "Streams stdout directly into stdin with zero temp files." }
        ],
        answerLatex: "$$755 = \\text{rwxr-xr-x},\\quad 600 = \\text{rw-------}$$",
        commonTrap: "Never accidentally run `>` (overwrite) when you meant `>>` (append) on an important file!"
      },
      "be-git-internals-branching-rebase": {
        heroFormula: "$$\\text{Working Tree} \\xrightarrow{\\text{git add}} \\text{Staging} \\xrightarrow{\\text{git commit}} \\text{Commit DAG}$$",
        title: "Executing a Clean Feature-Branch Git Workflow",
        problemLatex: "$$\\text{Ship } \\text{feat-api} \\text{ safely without breaking } \\text{main}$$",
        steps: [
          { label: "Branch Off `main`", mathLatex: "$\\text{git checkout -b feat-api} \\implies \\text{HEAD} \\to \\text{feat-api}$", plainWhy: "`main` pointer stays frozen at last working release." },
          { label: "Stage & Commit Cleanly", mathLatex: "$\\text{git add .} \\to \\text{git commit -m 'feat: add api'}$", plainWhy: "Creates a new commit node pointing back to its parent." },
          { label: "Switch Back & Merge", mathLatex: "$\\text{git checkout main} \\to \\text{git merge feat-api}$", plainWhy: "Integrates feature commits cleanly into `main`!" }
        ],
        answerLatex: "$$\\text{main updated cleanly via DAG merge}$$",
        commonTrap: "Never `git rebase` commits already pushed to a shared branch!"
      },
      "be-docker-ci-system-design": {
        heroFormula: "$$\\text{Latency}_{\\text{avg}} = p_{\\text{hit}} \\cdot t_{\\text{cache}} + (1 - p_{\\text{hit}}) \\cdot t_{\\text{DB}}$$",
        title: "Calculating Latency Drop with a 95% Redis Cache Hit Rate",
        problemLatex: "$$t_{\\text{cache}} = 1\\text{ ms},\\quad t_{\\text{DB}} = 40\\text{ ms},\\quad p_{\\text{hit}} = 0.95$$",
        steps: [
          { label: "Compute Hit Contribution (95%)", mathLatex: "$0.95 \\times 1\\text{ ms} = 0.95\\text{ ms}$", plainWhy: "95 out of 100 requests return straight from RAM!" },
          { label: "Compute Miss Contribution (5%)", mathLatex: "$0.05 \\times 40\\text{ ms} = 2.00\\text{ ms}$", plainWhy: "Only 5% touch PostgreSQL disk storage." },
          { label: "Sum Average Latency", mathLatex: "$0.95 + 2.00 = 2.95\\text{ ms} \\;\\;(\\mathbf{13.5\\times \\text{ faster than } 40\\text{ ms!}})$", plainWhy: "Plus SQL CPU load drops by 95%!" }
        ],
        answerLatex: "$$2.95\\text{ ms average } (13.5\\times\\text{ speedup!})$$",
        commonTrap: "Always set a TTL or invalidation policy on cached entries so stale data doesn't linger forever!"
      },
      "js-closures-scope-hoisting": {
        heroFormula: "$$\\text{Closure} = \\text{Inner Function} + \\text{Captured Outer Lexical Scope}$$",
        title: "Tracing Private Counter State Inside a JS Closure",
        problemLatex: "$$\\text{const c = makeCounter(10);}\\quad \\text{Call } c(),\\; c()$$",
        steps: [
          { label: "Create Backpack on `makeCounter(10)`", mathLatex: "$\\text{Lexical env}:\\; \\text{count} = 10 \\text{ attached to returned arrow fn}$", plainWhy: "Even after `makeCounter` exits, `count` stays alive privately!" },
          { label: "First Call `c()`", mathLatex: "$\\text{count}: 10 \\to 11 \\implies \\text{returns } 11$", plainWhy: "Updates private variable without touching global scope." },
          { label: "Second Call `c()`", mathLatex: "$\\text{count}: 11 \\to 12 \\implies \\text{returns } 12$", plainWhy: "Each call remembers the previous state!" }
        ],
        answerLatex: "$$11,\\text{ then } 12$$",
        commonTrap: "Never use `var` in loops with async callbacks — block-scoped `let` gives each iteration its own closure!"
      },
      "js-functional-map-filter-reduce": {
        heroFormula: "$$\\text{input} \\xrightarrow{\\text{.filter}} \\text{subset} \\xrightarrow{\\text{.map}} \\text{transformed} \\xrightarrow{\\text{.reduce}} \\text{single value}$$",
        title: "Tracing a 3-Stage Functional Data Pipeline",
        problemLatex: "$$[120, 45, 200, 30] \\to \\text{keep } \\ge 100 \\to 10\\%\\text{ off} \\to \\text{sum}$$",
        steps: [
          { label: "Stage 1: `.filter(p => p >= 100)`", mathLatex: "$[120, 45, 200, 30] \\to [120, 200]$", plainWhy: "Drops small items without mutating the original array." },
          { label: "Stage 2: `.map(p => p * 0.9)`", mathLatex: "$[120, 200] \\to [108, 180]$", plainWhy: "Applies 10% discount to every surviving item." },
          { label: "Stage 3: `.reduce((s, p) => s + p, 0)`", mathLatex: "$0 + 108 + 180 = 288$", plainWhy: "Folds cleanly with safe initial value `0`!" }
        ],
        answerLatex: "$$288$$",
        commonTrap: "Omitting the initial value `0` in `.reduce()` crashes with `TypeError` on empty arrays `[]`!"
      },
      "js-async-promises-event-loop": {
        heroFormula: "$$\\text{1. Sync Stack} \\to \\text{2. ALL Microtasks (Promise)} \\to \\text{3. Macrotask (Timer)}$$",
        title: "Solving an Async Event Loop Ordering Puzzle",
        problemLatex: "$$\\text{Sync } A,\\; \\text{setTimeout } B\\,(0\\text{ms}),\\; \\text{Promise.then } C,\\; \\text{Sync } D$$",
        steps: [
          { label: "Step 1: Drain Synchronous Call Stack", mathLatex: "$\\text{Print } A \\to \\text{queue } B \\text{ (macro)} \\to \\text{queue } C \\text{ (micro)} \\to \\text{Print } D$", plainWhy: "Synchronous lines always finish uninterrupted." },
          { label: "Step 2: Drain Microtask Queue First", mathLatex: "$\\text{Promise.then runs} \\implies \\text{Print } C$", plainWhy: "Microtasks ALWAYS beat `setTimeout` even at `0ms`!" },
          { label: "Step 3: Pick Next Macrotask", mathLatex: "$\\text{Timer callback runs} \\implies \\text{Print } B$", plainWhy: "Final deterministic sequence: `A, D, C, B`!" }
        ],
        answerLatex: "$$A \\to D \\to C \\to B$$",
        commonTrap: "`forEach(async ...)` does NOT wait for Promises — use `for...of` or `Promise.all(arr.map(...))`!"
      },
      "js-fetch-dom-state-components": {
        heroFormula: "$$\\text{UI} = \\text{render}(\\text{State}) \\quad+\\quad \\text{if (!res.ok) throw Error}$$",
        title: "Bulletproofing an Async Data Fetch & Render Cycle",
        problemLatex: "$$\\text{Fetch } /\\text{api}/\\text{hero}/99 \\text{ (returns 404) safely without stale DOM}$$",
        steps: [
          { label: "1. Check `res.ok` Explicitly", mathLatex: "$\\text{res.status} = 404 \\implies \\text{res.ok} = \\text{false} \\implies \\text{throw Error}$", plainWhy: "`fetch()` wouldn't jump to `catch` on its own!" },
          { label: "2. Update Single State Object", mathLatex: "$\\text{state}:\\; \\text{loading} = \\text{false},\\; \\text{error} = \\text{'Hero 99 not found'}$", plainWhy: "Never manually hide 4 spinners in separate places." },
          { label: "3. Derive UI Safely via `textContent`", mathLatex: "$\\text{render(state)} \\text{ escapes text} \\implies \\text{0 XSS, 0 desync!}$", plainWhy: "Deterministic view directly mirrors state." }
        ],
        answerLatex: "$$\\text{Clean Error Banner · Zero XSS · Zero Stale DOM}$$",
        commonTrap: "Injecting unescaped user input into `innerHTML` opens instant XSS vulnerabilities!"
      },
      "ts-types-interfaces-generics": {
        heroFormula: "$$\\text{Result}(T) = (\\text{ok: true, data: } T) \\;\\cup\\; (\\text{ok: false, err: string})$$",
        title: "Eliminating Runtime Crashes with Narrowing & Generics",
        problemLatex: "$$\\text{Handle } \\text{res}: \\text{Result}(\\text{Hero}) \\text{ safely at compile time}$$",
        steps: [
          { label: "Check Discriminant Tag (`if (res.ok)`)", mathLatex: "$\\text{Inside } \\text{if (res.ok)}: \\text{res.data is guaranteed } \\text{Hero!}$", plainWhy: "Control-flow narrowing unlocks safe autocomplete." },
          { label: "Check `else` Branch", mathLatex: "$\\text{Inside } \\text{else}: \\text{res.err is guaranteed } \\text{string!}$", plainWhy: "Impossible to accidentally read `res.data` on an error!" },
          { label: "Zero Runtime Overhead", mathLatex: "$\\text{Compiled JS strips all types} \\implies 0\\text{ ms overhead!}$", plainWhy: "All safety happens during build & editing." }
        ],
        answerLatex: "$$100\\%\\text{ Type-Safe · 0 ms Runtime Cost}$$",
        commonTrap: "Reaching for `any` turns off TypeScript's protection — use `unknown` + narrowing instead!"
      },
      "code-oop-solid-design-patterns": {
        heroFormula: "$$\\text{Composition (Has-A)} + \\text{Dependency Injection} > \\text{Deep Inheritance}$$",
        title: "Refactoring Hardcoded Checkout with Strategy + DI",
        problemLatex: "$$\\text{Support VIP (20\\% off), Student (10\\% off) & Test without real DB}$$",
        steps: [
          { label: "Inject Discount Strategy Function", mathLatex: "$\\text{checkout(total, discountFn)} = \\text{discountFn(total)}$", plainWhy: "Add new promo tiers without editing `checkout()`!" },
          { label: "Inject Database Collaborator", mathLatex: "$\\text{new OrderService(dbClient)} \\xrightarrow{\\text{tests}} \\text{new OrderService(fakeDb)}$", plainWhy: "Unit tests run in 0.2ms offline with zero real DB calls." },
          { label: "Guard Invariants Inside Methods", mathLatex: "$\\text{finalTotal} = \\max(0,\\; \\text{discountFn(total)})$", plainWhy: "Encapsulation guarantees totals never drop below 0." }
        ],
        answerLatex: "$$\\text{Modular, Swappable, 100\\% Unit-Testable Service}$$",
        commonTrap: "Hardcoding `new RealPostgresDB()` inside business logic makes fast unit tests impossible!"
      },
      "code-testing-tdd-debugging": {
        heroFormula: "$$\\text{TDD}:\\; \\text{Red} \\to \\text{Green} \\to \\text{Refactor} \\quad|\\quad \\text{Bisect}:\\; O(\\log n)\\text{ commits}$$",
        title: "Hunting a Bug Across 64 Commits & Locking a Regression Test",
        problemLatex: "$$\\text{Commit 1 works; Commit 64 fails} \\implies \\text{Locate breaking commit}$$",
        steps: [
          { label: "Bisect at Midpoint (Commit 32)", mathLatex: "$64 \\to 32 \\to 16 \\to 8 \\to 4 \\to 2 \\to 1 \\;(\\mathbf{6\\text{ checks!}})$", plainWhy: "`git bisect` eliminates half the history every step!" },
          { label: "Write Failing Regression Test (Red)", mathLatex: "$\\text{expect}(\\text{findMax}([-10, -3])) = -3 \\;(\\text{fails returning } 0!)$", plainWhy: "Reproduces the exact root cause deterministically." },
          { label: "Fix Root Cause & Verify (Green)", mathLatex: "$\\text{Init } \\text{best} = \\text{nums}[0] \\implies \\text{All tests PASS!}$", plainWhy: "Edge case stays permanently guarded in CI!" }
        ],
        answerLatex: "$$6\\text{ bisect checks + permanent regression test}$$",
        commonTrap: "Testing only happy-path positive inputs misses `[]`, `0`, and negative-number bugs!"
      },
      "code-memory-concurrency-race-conditions": {
        heroFormula: "$$\\text{Non-Atomic}:\\; \\text{Read}(100) \\to \\text{Read}(100) \\to \\text{Write}(150) \\;(\\text{Lost } +50!)$$",
        title: "Fixing a Lost-Update Race Condition in Inventory Checkout",
        problemLatex: "$$\\text{Stock} = 1;\\; \\text{2 concurrent buyers hit } /\\text{buy} \\text{ simultaneously}$$",
        steps: [
          { label: "Diagnose the Broken Check-Then-Act", mathLatex: "$T_1 \\text{ reads } 1;\\; T_2 \\text{ reads } 1 \\implies \\text{BOTH buy last item!}$", plainWhy: "Reading and updating in two separate steps creates a race window." },
          { label: "Make the Update Atomic in SQL", mathLatex: "$\\text{UPDATE items SET stock = stock - 1 WHERE id=1 AND stock > 0}$", plainWhy: "Database row lock executes check + decrement as ONE indivisible op!" },
          { label: "Verify Rows Affected", mathLatex: "$T_1: 1\\text{ row updated (Sold!)};\\quad T_2: 0\\text{ rows (409 Sold Out!)}$", plainWhy: "Zero overselling under 10,000 concurrent buyers!" }
        ],
        answerLatex: "$$\\text{Atomic Conditional UPDATE / Row Lock}$$",
        commonTrap: "Never assume `if stock > 0: stock -= 1` in app memory is thread-safe across concurrent servers!"
      }
    });
  }
})(typeof window !== "undefined" ? window : globalThis);
