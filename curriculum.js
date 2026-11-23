(function (root) {
  "use strict";

  const WORLDS = [
    {
      id: "nursery",
      order: 1,
      icon: "🌱",
      title: "Era 1: Foundations & Number Sense",
      subtitle: "Subitizing, even/odd patterns, skip-counting & Make-10 mental agility.",
      color: "#3b7a57",
      colorDark: "#28593d",
      bgSoft: "rgba(59, 122, 87, 0.11)",
      borderSoft: "rgba(59, 122, 87, 0.30)"
    },
    {
      id: "elementary",
      order: 2,
      icon: "🧱",
      title: "Era 2: Elementary Math",
      subtitle: "Area multiplication, division, primes/GCF/LCM, fractions, % swaps & ratios.",
      color: "#35628c",
      colorDark: "#244769",
      bgSoft: "rgba(53, 98, 140, 0.11)",
      borderSoft: "rgba(53, 98, 140, 0.30)"
    },
    {
      id: "junior",
      order: 3,
      icon: "⚡",
      title: "Era 3: Junior High (Grades 7–9)",
      subtitle: "Negatives, roots, exponents, algebra scales, systems, factoring & slope.",
      color: "#725385",
      colorDark: "#533963",
      bgSoft: "rgba(114, 83, 133, 0.11)",
      borderSoft: "rgba(114, 83, 133, 0.30)"
    },
    {
      id: "senior",
      order: 4,
      icon: "📐",
      title: "Era 4: Senior High (Grades 10–12)",
      subtitle: "Quadratics, complex i, functions, logs, trig identities, conics, finance & stats.",
      color: "#b36a22",
      colorDark: "#854c14",
      bgSoft: "rgba(179, 106, 34, 0.11)",
      borderSoft: "rgba(179, 106, 34, 0.30)"
    },
    {
      id: "college",
      order: 5,
      icon: "🎓",
      title: "Era 5: College Math",
      subtitle: "Limits, Calc I–III, integration, ODEs, vectors, matrices, discrete & Bayes.",
      color: "#a8413a",
      colorDark: "#7e2d28",
      bgSoft: "rgba(168, 65, 58, 0.11)",
      borderSoft: "rgba(168, 65, 58, 0.30)"
    }
  ];

  const MASTERY_STAGES = [
    {
      id: 0,
      label: "Untested",
      badge: "🌱",
      short: "New",
      reaction: "Let's see what the fuss is about."
    },
    {
      id: 1,
      label: "Wait, that's how easy it is?!",
      badge: "😮",
      short: "Wait, that's it?!",
      reaction: "Wait... why did school make this sound hard?!"
    },
    {
      id: 2,
      label: "Wow.. that's EASY..",
      badge: "🔥",
      short: "Wow, EASY!",
      reaction: "Okay, I actually see the pattern every single time now!"
    },
    {
      id: 3,
      label: "Meh.. 😎",
      badge: "👑",
      short: "Meh.. 😎",
      reaction: "Effortless. Light work — could solve this half-asleep."
    }
  ];

  const NODES = [
    // ==================== ERA 1: NURSERY (5 NODES) ====================
    {
      id: "counting-subitizing",
      worldId: "nursery",
      order: 1,
      title: "Counting & Instant Chunks",
      icon: "👀",
      tagline: "See 8 dots instantly without counting 1-2-3-4-5-6-7-8.",
      scaryVersion: "Cardinal enumeration of discrete sets via one-to-one correspondence.",
      easyTruth: "Your brain hates counting one-by-one past 4. Instead, spot small groups (like dice faces: 5 + 3 = 8) and snap them together in 0.2 seconds.",
      microSteps: [
        { label: "Step 1: Tiny Seed (+)", text: "Your eyes instantly know 1, 2, 3, and 4 dots without counting. That skill is called subitizing." },
        { label: "Step 2: Very Fine Pattern", text: "Chop bigger piles like dominoes: 6 is two 3s. 7 is 5 + 2. 9 is a 10-box missing 1." },
        { label: "Step 3: Wait, That's It?!", text: "Seeing 9 as 'almost 10' or 8 as 'two 4s' makes you faster than anyone counting on fingers." }
      ],
      cheatCode: "Never count by 1s past 4 — chunk into 5s, doubles, or 'almost-10'.",
      visualizerId: "numberLineMake10",
      questions: [
        { type: "mc", prompt: "You see a group of 5 stars and 3 extra stars next to it. Total stars?", options: ["7", "8", "9", "6"], answer: "8", hint: "Start at 5 and hop 3 more: 6, 7, 8.", whyEasy: "5 + 3 = 8! Chunking by 5 skips counting 1 through 5." },
        { type: "mc", prompt: "A carton holds 10 eggs. Only 1 slot is empty. How many eggs are inside?", options: ["8", "9", "10", "11"], answer: "9", hint: "Think '10 minus the 1 missing egg'.", whyEasy: "9 is literally '10 with 1 missing'. No counting needed!" },
        { type: "mc", prompt: "Two hands each hold 4 coins, plus 1 coin on the table. Total coins?", options: ["8", "9", "10", "7"], answer: "9", hint: "Double 4 is 8, plus 1 more.", whyEasy: "Doubles are free speed: 4 + 4 = 8, and 8 + 1 = 9." },
        { type: "input", prompt: "What number comes right before 40?", answer: "39", hint: "Step 1 back from 40.", whyEasy: "Counting backwards by 1 drops 40 to 39." },
        { type: "mc", prompt: "Which split makes counting 7 dots fastest?", options: ["1+1+1+1+1+1+1", "5 + 2", "2+2+1+1+1", "3+1+1+1+1"], answer: "5 + 2", hint: "Use the fewest chunks your eyes know instantly.", whyEasy: "Seeing 5 + 2 takes one glance; counting seven 1s takes seven steps." }
      ]
    },
    {
      id: "even-odd-skip",
      worldId: "nursery",
      order: 2,
      title: "Even, Odd & Skip Counting (2, 4, 6, 8...)",
      icon: "👯",
      tagline: "Even = everyone has a buddy. Odd = 1 leftover! Plus 2-4-6-8 & 5-10-15 rhythm.",
      scaryVersion: "Parity equivalence classes modulo 2 and constant-stride arithmetic sequences.",
      easyTruth: "Imagine pairing up shoes! If EVERY shoe has a partner (2, 4, 6, 8, 10...), it's EVEN. If 1 lonely shoe is left over (1, 3, 5, 7, 9...), it's ODD! For giant numbers, ONLY look at the very last digit!",
      microSteps: [
        { label: "Step 1: Last-Digit Laser", text: "Is 8,476 even or odd? Ignore 8, 4, 7 — only check the last digit 6! Ends in 0,2,4,6,8 = EVEN. Ends in 1,3,5,7,9 = ODD." },
        { label: "Step 2: Skip Counting (2, 4, 6, 8...)", text: "Skip counting by 2s hits every even number: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20! Skip counting by 4s is just 'skip every OTHER even': 4, 8, 12, 16, 20!" },
        { label: "Step 3: Parity Cheat Codes (+ & ×)", text: "Odd + Odd = EVEN (the two lonely leftovers pair up!). Even × Anything = EVEN (pairs stay paired!)." }
      ],
      cheatCode: "Last digit 0,2,4,6,8 = EVEN. Odd + Odd = EVEN. Skip-count 2,4,6,8 is your foundation for all times tables!",
      visualizerId: "numberPatternSieve",
      questions: [
        { type: "mc", prompt: "Finish the skip-count by 2s: 2, 4, 6, 8, ___ , 12", options: ["9", "10", "11", "14"], answer: "10", hint: "Jump 2 steps past 8.", whyEasy: "2, 4, 6, 8, 10, 12 — you just unlocked the 2× table!" },
        { type: "mc", prompt: "Without dividing, is 9,357 EVEN or ODD?", options: ["Even", "Odd", "Both", "Neither"], answer: "Odd", hint: "Only check the very last digit (7)!", whyEasy: "7 ends in 1,3,5,7,9 → ODD! The first 3 digits don't matter at all." },
        { type: "mc", prompt: "What happens when you add ANY two odd numbers (like 7 + 5)?", options: ["Always Odd", "Always Even", "Depends on size", "Always Prime"], answer: "Always Even", hint: "Each odd has 1 lonely leftover. Put the 2 leftovers together — they form a pair!", whyEasy: "Odd + Odd = Even ALWAYS! 7 + 5 = 12, 3 + 9 = 12." },
        { type: "input", prompt: "Skip-count by 4s: 4, 8, 12, 16, ___", answer: "20", hint: "Add 4 to 16 (or jump two evens: 18, 20).", whyEasy: "16 + 4 = 20! Notice 4s are just every second number in the 2-4-6-8 list." },
        { type: "mc", prompt: "Is 6 × 137 even or odd?", options: ["Even", "Odd", "Impossible without multiplying", "Zero"], answer: "Even", hint: "6 is even. Even × Anything = ...", whyEasy: "Multiplying ANY integer by an even number (6) guarantees an EVEN result (ends in 2)!" }
      ]
    },
    {
      id: "make-10-addition",
      worldId: "nursery",
      order: 3,
      title: "Addition & The Make-10 Trick",
      icon: "➕",
      tagline: "Turn awkward math like 8 + 5 into easy 10 + 3.",
      scaryVersion: "Commutative binary summation over base-10 integer operands.",
      easyTruth: "10 is the easiest number in the universe to add to (10 + 4 = 14). So whenever you add two numbers, steal from one to feed the other up to 10!",
      microSteps: [
        { label: "Step 1: Tiny Seed (+)", text: "Know the 5 pairs that hug into 10: (9+1), (8+2), (7+3), (6+4), (5+5)." },
        { label: "Step 2: Very Fine Pattern", text: "Doing 8 + 5? Ask: what does 8 need to become 10? It needs 2! Steal 2 from the 5 (leaving 3)." },
        { label: "Step 3: Wait, That's It?!", text: "Now it's 10 + 3 = 13! And for big numbers like 48 + 7: steal 2 to hit 50, then 50 + 5 = 55." }
      ],
      cheatCode: "Steal just enough to hit a clean 10 (or 50, 100), then add the leftovers.",
      visualizerId: "numberLineMake10",
      questions: [
        { type: "mc", prompt: "Using Make-10: 8 + 5 becomes 10 + ___ = ?", options: ["12", "13", "14", "15"], answer: "13", hint: "8 steals 2 from 5 to become 10. 5 has 3 left.", whyEasy: "8 + 5 = (8 + 2) + 3 = 10 + 3 = 13!" },
        { type: "mc", prompt: "Using Make-10: 9 + 7 = ?", options: ["15", "16", "17", "18"], answer: "16", hint: "9 steals 1 from 7 to become 10, leaving 6.", whyEasy: "9 + anything is just 10 + (anything − 1). So 9 + 7 = 16!" },
        { type: "input", prompt: "Fast mental math: 7 + 6 = ?", answer: "13", hint: "7 needs 3 to hit 10. Split 6 into 3 + 3.", whyEasy: "7 + 3 = 10, plus remaining 3 = 13." },
        { type: "mc", prompt: "Same trick scaled up! What is 48 + 7?", options: ["54", "55", "56", "57"], answer: "55", hint: "48 needs 2 to hit 50. Split 7 into 2 + 5.", whyEasy: "48 + 2 = 50, and 50 + 5 = 55!" },
        { type: "input", prompt: "What is 29 + 15?", answer: "44", hint: "Steal 1 from 15 to make 29 into 30. Now do 30 + 14.", whyEasy: "29 + 15 = 30 + 14 = 44." }
      ]
    },
    {
      id: "distance-subtraction",
      worldId: "nursery",
      order: 4,
      title: "Subtraction = Distance (No Borrowing!)",
      icon: "➖",
      tagline: "Forget ugly borrowing. Just measure the gap or shift both numbers!",
      scaryVersion: "Additive inverse difference operator requiring multi-column regrouping.",
      easyTruth: "102 − 98 isn't 'cross out the 0, borrow from the 1'. It's just asking: 'How far apart are 98 and 102?' Only 4 steps!",
      microSteps: [
        { label: "Step 1: Tiny Seed (-)", text: "Think of subtraction as a ruler: 12 − 9 is the distance from 9 up to 12. (1 step to 10, +2 to 12 = 3)." },
        { label: "Step 2: Very Fine Pattern (Shift Both!)", text: "The gap doesn't change if both take 2 steps forward! 53 − 18 → add 2 to BOTH → 55 − 20 = 35." },
        { label: "Step 3: Wait, That's It?!", text: "Even 1000 − 437 becomes instant: subtract 1 from BOTH → 999 − 436 = 563 (zero borrowing!)." }
      ],
      cheatCode: "Subtraction is just the distance between two numbers. Shift BOTH equally to make the bottom number clean!",
      visualizerId: "numberLineMake10",
      questions: [
        { type: "mc", prompt: "Think 'how far from 98 up to 103?' What is 103 − 98?", options: ["4", "5", "6", "7"], answer: "5", hint: "98 + 2 = 100, and 100 + 3 = 103.", whyEasy: "Bridge through 100: 2 + 3 = 5!" },
        { type: "mc", prompt: "Shift both numbers up by +2: 64 − 28 becomes 66 − 30. Answer?", options: ["34", "36", "38", "46"], answer: "36", hint: "66 minus 30.", whyEasy: "Adding 2 to both keeps the distance identical: 66 − 30 = 36!" },
        { type: "input", prompt: "What is 82 − 75?", answer: "7", hint: "Hop from 75 to 80 (5), then 80 to 82 (2).", whyEasy: "75 → 80 (+5) → 82 (+2). Total gap = 7!" },
        { type: "mc", prompt: "Try the 999 trick! 1000 − 264 is the same as 999 − 263 = ?", options: ["736", "746", "836", "737"], answer: "736", hint: "Subtract each digit from 9: (9−2), (9−6), (9−3).", whyEasy: "9−2=7, 9−6=3, 9−3=6 → 736 with zero borrowing!" },
        { type: "input", prompt: "What is 51 − 19? (Hint: add 1 to both!)", answer: "32", hint: "51 − 19 = 52 − 20.", whyEasy: "Add 1 to both: 52 − 20 = 32!" }
      ]
    },
    {
      id: "zero-base10",
      worldId: "nursery",
      order: 5,
      title: "Zero & Place-Value Money",
      icon: "🔟",
      tagline: "Every digit's power multiplies by 10 as you step left.",
      scaryVersion: "Positional base-10 polynomial expansion with additive identity.",
      easyTruth: "345 isn't a mysterious blob. It's literally a pocket full of three $100 bills, four $10 bills, and five $1 coins: 300 + 40 + 5.",
      microSteps: [
        { label: "Step 1: Zero's Two Jobs", text: "Adding 0 changes nothing (5 + 0 = 5). Multiplying by 0 wipes everything out (999 × 0 = 0). And 0 holds empty seats (305 ≠ 35)." },
        { label: "Step 2: Very Fine Pattern", text: "Each column left is ×10 bigger: Ones (1), Tens (10), Hundreds (100), Thousands (1000)." },
        { label: "Step 3: Wait, That's It?!", text: "Multiplying by 10 promotes every bill one slot richer (4 tens → 4 hundreds)!" }
      ],
      cheatCode: "Break big ugly numbers into Place-Value Money ($100s + $10s + $1s) and handle each piece separately.",
      visualizerId: "numberLineMake10",
      questions: [
        { type: "mc", prompt: "What does the '6' actually represent in 4,629?", options: ["6", "60", "600", "6,000"], answer: "600", hint: "Count columns from the right: Ones (9), Tens (2), Hundreds (6).", whyEasy: "4,629 = 4,000 + 600 + 20 + 9!" },
        { type: "mc", prompt: "What is (748 × 19 + 32) × 0?", options: ["748", "32", "0", "1"], answer: "0", hint: "Anything times zero collapses to...", whyEasy: "Zero erases everything in multiplication: 0!" },
        { type: "input", prompt: "Add cleanly by place value: 320 + 450 = ?", answer: "770", hint: "300+400 = 700, 20+50 = 70.", whyEasy: "700 + 70 = 770!" },
        { type: "mc", prompt: "What is 35 × 100?", options: ["350", "3,500", "35,000", "135"], answer: "3,500", hint: "Promote digits 2 places left.", whyEasy: "35 promoted by two tens-places becomes 3,500!" },
        { type: "input", prompt: "Write the number: 5 thousands + 0 hundreds + 4 tens + 7 ones", answer: "5047", hint: "Keep 0 in the hundreds spot.", whyEasy: "5000 + 0 + 40 + 7 = 5047!" }
      ]
    },

    // ==================== ERA 2: ELEMENTARY (7 NODES) ====================
    {
      id: "rect-multiplication",
      worldId: "elementary",
      order: 6,
      title: "Multiplication = Rectangles & Splitting",
      icon: "✖️",
      tagline: "You don't need to memorize 7 × 14. Just chop the rectangle!",
      scaryVersion: "Distributive property of scalar multiplication over additive decomposition.",
      easyTruth: "Multiplication is fast repeated addition shaped like a chocolate bar (rows × columns). Snap any big bar into (10 + ones) and add!",
      microSteps: [
        { label: "Step 1: Tiny Seed (×)", text: "3 × 4 is 3 rows of 4. Turn it sideways (4 × 3) — same chocolate! Plus: ×2 = double, ×4 = double twice, ×8 = double 3×!" },
        { label: "Step 2: Very Fine Pattern (Split It)", text: "Scared of 7 × 14? Snap 14 into (10 + 4). 7×10 = 70, 7×4 = 28. Total: 98." },
        { label: "Step 3: Algebra Preview!", text: "7(x + 4) = 7x + 28 in Grade 12 Algebra is the EXACT SAME chocolate-bar split!" }
      ],
      cheatCode: "Snap big × into (Tens + Ones)! Also: ×4 = double-double, ×8 = double-double-double, ×9 = (×10) − once.",
      visualizerId: "rectangleMultiplier",
      questions: [
        { type: "mc", prompt: "Split 6 × 13 into (6 × 10) + (6 × 3). What is it?", options: ["68", "72", "78", "84"], answer: "78", hint: "60 + 18 = ?", whyEasy: "60 + 18 = 78!" },
        { type: "input", prompt: "Use the split trick: 8 × 12 = ?", answer: "96", hint: "(8 × 10) + (8 × 2).", whyEasy: "80 + 16 = 96!" },
        { type: "mc", prompt: "Trick for ×9: 9 × 7 is just (10 × 7) − 7. Answer?", options: ["56", "63", "64", "72"], answer: "63", hint: "70 minus 7.", whyEasy: "70 − 7 = 63!" },
        { type: "mc", prompt: "Halve & Double hack! 4 × 15 is the same area as 2 × 30 =", options: ["45", "50", "60", "75"], answer: "60", hint: "2 × 30.", whyEasy: "Halving 4 → 2 and doubling 15 → 30 gives 2 × 30 = 60!" },
        { type: "input", prompt: "Memorize anchor: 7 × 8 = ? (Think 5-6-7-8!)", answer: "56", hint: "5, 6 = 7 × 8!", whyEasy: "5-6-7-8 → 56 = 7 × 8! Easiest rhyme for the hardest table." }
      ]
    },
    {
      id: "reverse-division",
      worldId: "elementary",
      order: 7,
      title: "Division = Reverse Multiplication",
      icon: "➗",
      tagline: "Forget long division anxiety. Ask: 'What times this gives that?'",
      scaryVersion: "Euclidean quotient determination via iterative partial-product subtraction.",
      easyTruth: "Division is multiplication played backwards. 56 ÷ 7 just asks: '7 times WHAT equals 56?' And for big numbers, chop into easy chunks!",
      microSteps: [
        { label: "Step 1: Tiny Seed (÷)", text: "42 ÷ 6 means 'How many 6s fit inside 42?' Since 6 × 7 = 42, the answer is 7." },
        { label: "Step 2: Very Fine Pattern (Chunking)", text: "Need 96 ÷ 4? Break 96 into friendly chunks of 4: 80 + 16. 80÷4 = 20, 16÷4 = 4 → 24!" },
        { label: "Step 3: ÷5 & Divisibility Hacks", text: "÷5? DOUBLE the number and slide decimal 1 left (140 ÷ 5 → 280 → 28)! ÷3? Sum of digits divisible by 3!" }
      ],
      cheatCode: "Split into easy chunks (80 + 16) or flip to 'Bottom × ? = Top'. For ÷5: double & drop zero!",
      visualizerId: "rectangleMultiplier",
      questions: [
        { type: "mc", prompt: "Flip to multiplication: 56 ÷ 8 = ?", options: ["6", "7", "8", "9"], answer: "7", hint: "8 × ? = 56.", whyEasy: "8 × 7 = 56 → 56 ÷ 8 = 7!" },
        { type: "mc", prompt: "Chunking hack: 84 ÷ 4 = (80 ÷ 4) + (4 ÷ 4) = ?", options: ["19", "21", "22", "24"], answer: "21", hint: "20 + 1.", whyEasy: "20 + 1 = 21!" },
        { type: "input", prompt: "Try chunking or ÷5 hack: 75 ÷ 5 = ?", answer: "15", hint: "Double 75 (150), slide dot left.", whyEasy: "75 × 2 = 150 → 15!" },
        { type: "mc", prompt: "Share 14 slices among 4 friends. Remainder left over?", options: ["1", "2", "3", "0"], answer: "2", hint: "4 × 3 = 12 used; how many left?", whyEasy: "14 − 12 = 2 slices left over!" },
        { type: "input", prompt: "Use the ÷5 cheat code: 140 ÷ 5 = ?", answer: "28", hint: "Double 140 = 280, drop 0.", whyEasy: "280 ÷ 10 = 28!" }
      ]
    },
    {
      id: "primes-factors-lcm",
      worldId: "elementary",
      order: 8,
      title: "Primes, Divisibility, GCF & LCM",
      icon: "🧬",
      tagline: "Primes (2, 3, 5, 7, 11...) are the indivisible 'atoms' of every number!",
      scaryVersion: "Fundamental theorem of arithmetic and greatest common divisor factorization.",
      easyTruth: "A PRIME number can ONLY be divided cleanly by 1 and itself (like 2, 3, 5, 7, 11, 13). Every bigger number is just primes multiplied together like LEGO bricks!",
      microSteps: [
        { label: "Step 1: Prime vs Composite (Watch out for 1 & 2!)", text: "1 is NOT prime (only 1 factor). 2 IS prime — in fact, 2 is the ONLY even prime! Every other even number divides by 2." },
        { label: "Step 2: Instant Divisibility Radar", text: "÷2: ends even. ÷3: digits ADD to a multiple of 3 (123 → 1+2+3=6!). ÷5: ends in 0 or 5. ÷9: digits add to multiple of 9!" },
        { label: "Step 3: GCF vs LCM in Plain English", text: "GCF (Greatest Common Factor) = BIGGEST brick inside both (12 & 18 → 6). LCM (Least Common Multiple) = FIRST meeting time (4 & 6 → 12, great for fractions!)." }
      ],
      cheatCode: "Primes start at 2 (2,3,5,7,11,13...). Digit-sum test spots ÷3 and ÷9 instantly! GCF shrinks, LCM grows.",
      visualizerId: "numberPatternSieve",
      questions: [
        { type: "mc", prompt: "Which list contains ONLY prime numbers?", options: ["1, 2, 3, 5", "2, 3, 5, 7, 11", "2, 3, 7, 9", "3, 5, 11, 15"], answer: "2, 3, 5, 7, 11", hint: "Remember: 1 isn't prime, 9 = 3×3, 15 = 3×5!", whyEasy: "2, 3, 5, 7, 11 have no smaller factor pairs!" },
        { type: "mc", prompt: "What is the ONLY even prime number?", options: ["0", "2", "4", "There are none"], answer: "2", hint: "Every even number past 2 can be divided by 2.", whyEasy: "2's only factors are 1 and 2 — every larger even number divides by 2!" },
        { type: "mc", prompt: "Using the digit-sum trick, is 234 divisible by 3 and 9?", options: ["Yes, 2+3+4 = 9!", "Only by 2", "Only by 3, not 9", "Neither"], answer: "Yes, 2+3+4 = 9!", hint: "Add the digits: 2 + 3 + 4.", whyEasy: "2 + 3 + 4 = 9, which divides by both 3 and 9 (234 = 9 × 26)!" },
        { type: "input", prompt: "What is the GCF (Greatest Common Factor) of 12 and 18?", answer: "6", hint: "Biggest number that divides cleanly into both 12 and 18.", whyEasy: "Both divide by 1, 2, 3, and 6 — biggest is 6!" },
        { type: "input", prompt: "Hotdogs come in packs of 4, buns in packs of 6. Smallest equal total (LCM of 4 and 6)?", answer: "12", hint: "4s: 4, 8, 12... | 6s: 6, 12...", whyEasy: "First shared multiple of 4 and 6 is 12!" }
      ]
    },
    {
      id: "fractions-trenchcoat",
      worldId: "elementary",
      order: 9,
      title: "Fractions = Division in a Trench Coat",
      icon: "🍕",
      tagline: "Top = how many slices you have. Bottom = how big each slice is.",
      scaryVersion: "Rational equivalence classes requiring least common multiple harmonization.",
      easyTruth: "A fraction like 3/4 is literally 3 ÷ 4 written vertically. The bottom number names the slice size (thirds, fourths, sixths), so you can ONLY add or subtract fractions once their slice sizes match!",
      microSteps: [
        { label: "Step 1: Top Counts, Bottom Names the Unit", text: "Think of denominators like nouns: 1 fourth + 2 fourths = 3 fourths (1/4 + 2/4 = 3/4). That's why bottoms NEVER get added together — adding 1 apple + 2 apples doesn't create 'double-apples'!" },
        { label: "Step 2: Equivalent Fractions & Cross-Check", text: "Multiply top and bottom by the same number (really multiplying by 1!) to match slice sizes: 1/2 = 2/4 = 3/6. To compare 3/4 vs 2/3 quickly, cross-multiply upward: 3×3 = 9 vs 4×2 = 8, so 3/4 is larger." },
        { label: "Step 3: Why Keep-Change-Flip Works", text: "Multiplying goes straight across: (2/3)×(3/5) = 6/15 = 2/5. Dividing by 1/2 asks 'how many halves fit inside?' — 2 halves fit in every whole, so dividing by 1/2 ALWAYS multiplies by 2 (its reciprocal)!" }
      ],
      cheatCode: "Add/Subtract: match bottoms first, add tops ONLY. Multiply: straight across. Divide: multiply by the flipped reciprocal!",
      visualizerId: "fractionPizzaLab",
      questions: [
        { type: "mc", prompt: "What is 1/2 + 1/4?", options: ["2/6", "3/4", "2/4", "1/6"], answer: "3/4", hint: "Convert 1/2 into fourths (2/4) so both slices have the same size.", whyEasy: "2/4 + 1/4 = 3/4 — once slice sizes match, only the numerator count increases!" },
        { type: "mc", prompt: "Multiply straight across: (2/3) × (3/5) = ?", options: ["2/5", "5/8", "10/9", "6/8"], answer: "2/5", hint: "Multiply tops (2×3) and bottoms (3×5), or cancel the matching 3s first!", whyEasy: "6/15 simplifies by dividing top and bottom by 3 → 2/5 (or cancel the 3s directly!)." },
        { type: "mc", prompt: "How many 1/2 pizzas fit inside 6 whole pizzas? What is 6 ÷ (1/2)?", options: ["3", "6", "12", "1/12"], answer: "12", hint: "Each whole pizza splits into 2 halves, so keep 6, change ÷ to ×, flip 1/2 to 2.", whyEasy: "Dividing by a fraction under 1 makes the count BIGGER: 6 × 2 = 12 half-pizzas!" },
        { type: "mc", prompt: "Which fraction is BIGGER: 3/4 or 2/3?", options: ["3/4", "2/3", "Equal", "Unknown"], answer: "3/4", hint: "Convert both to twelfths (9/12 vs 8/12) or cross-multiply upward: 3×3 vs 4×2.", whyEasy: "3/4 = 9/12 while 2/3 = 8/12, so 3/4 beats 2/3 by 1/12!" },
        { type: "mc", prompt: "Compute 1/3 + 1/2 = ?", options: ["2/5", "5/6", "1/6", "3/5"], answer: "5/6", hint: "Smallest common slice size for 3 and 2 is 6: convert 1/3 → 2/6 and 1/2 → 3/6.", whyEasy: "2/6 + 3/6 = 5/6 — matching bottoms first turns it into simple counting!" }
      ]
    },
    {
      id: "decimals-percents",
      worldId: "elementary",
      order: 10,
      title: "Decimals & The Magic % Swap",
      icon: "💯",
      tagline: "Per-cent = ÷ 100. Plus: x% of y ALWAYS equals y% of x!",
      scaryVersion: "Base-10 floating-point proportional scaling across unit-hundredths.",
      easyTruth: "'Per-cent' literally means 'out of 100' (like 100 cents in a dollar). Because multiplication order doesn't matter, 16% of 50 is mathematically identical to 50% of 16 (= 8) — always flip to whichever side is easier!",
      microSteps: [
        { label: "Step 1: Decimals & Multiplying Decimal Places", text: "Hop the decimal 2 spots to switch between % and decimals (25% = 0.25). When multiplying decimals like 0.4 × 0.2, multiply the whole digits (4×2 = 8) and count TOTAL digits after the dots (1 + 1 = 2) → 0.08!" },
        { label: "Step 2: 10% Builder & Successive % Trap", text: "10% slides the dot 1 step left (10% of 80 = 8; 5% = half = 4). Watch out for back-to-back percents: +20% then −20% do NOT cancel! Raising $100 by 20% hits $120, and 20% off the NEW bigger $120 subtracts $24 → $96!" },
        { label: "Step 3: The Magic % Swap", text: "x% of y = (x/100)·y = (y/100)·x = y% of x ALWAYS! Need 12% of 25? Flip it to 25% (one quarter) of 12 = 3 in one second!" }
      ],
      cheatCode: "Use 10% (slide dot 1 left) to build any %, count total decimal digits when multiplying, and swap x% of y ↔ y% of x!",
      visualizerId: "fractionPizzaLab",
      questions: [
        { type: "input", prompt: "Magic swap! What is 16% of 50?", answer: "8", hint: "Flip it to 50% (half) of 16!", whyEasy: "16% of 50 = 50% of 16 = half of 16 = 8!" },
        { type: "input", prompt: "Use 10% + 5%: What is 15% of 60?", answer: "9", hint: "Find 10% of 60 first (slide dot left → 6), then add half of that for 5% (3).", whyEasy: "10% is 6 and 5% is 3, so 15% = 6 + 3 = 9!" },
        { type: "mc", prompt: "What is 0.4 × 0.2?", options: ["0.8", "0.08", "0.008", "8.0"], answer: "0.08", hint: "4 × 2 = 8, and there are TWO decimal places total (one in 0.4, one in 0.2).", whyEasy: "Two tenths of four tenths is 8 hundredths = 0.08 (not 0.8)!" },
        { type: "mc", prompt: "$100 jacket goes UP 20%, then DOWN 20%. Final price?", options: ["$100", "$96", "$104", "$90"], answer: "$96", hint: "First +20% takes $100 to $120; then −20% takes 20% off $120 ($24 off)!", whyEasy: "The second 20% acts on the larger $120 base ($120 − $24 = $96), so you lose 4%!" },
        { type: "input", prompt: "Magic swap: What is 12% of 25?", answer: "3", hint: "Flip to 25% (one-quarter) of 12.", whyEasy: "25% of 12 = 12 ÷ 4 = 3!" }
      ]
    },
    {
      id: "pemdas-grammar",
      worldId: "elementary",
      order: 11,
      title: "PEMDAS = 3-Tier Math Grammar",
      icon: "🚦",
      tagline: "Why 2 + 3 × 4 is 14, and why ×/÷ and +/− tie left-to-right!",
      scaryVersion: "Operator precedence hierarchy for unambiguous infix expression parsing.",
      easyTruth: "PEMDAS isn't 6 separate ranks — it's just 3 tiers of tightness: (1) Parentheses & Exponents bind tightest, (2) Multiplication & Division are EQUAL teammates run strictly left-to-right, (3) Addition & Subtraction glue finished terms left-to-right.",
      microSteps: [
        { label: "Step 1: Parentheses & Exponents Go First", text: "Brackets ( ) protect whatever's inside like a sealed gift box, and Exponents like 3² (= 9) only power the base right underneath them — evaluate powers BEFORE multiplying (so 2 × 3² = 2 × 9 = 18, NOT 6² = 36)!" },
        { label: "Step 2: × and ÷ Are EQUAL (Left → Right!)", text: "Division is just multiplying by a fraction, so × does NOT beat ÷! In 8 ÷ 2 × 4, move strictly left-to-right: (8 ÷ 2) × 4 = 4 × 4 = 16, NOT 8 ÷ 8 = 1." },
        { label: "Step 3: + and − Are EQUAL (Left → Right!)", text: "Addition does NOT beat subtraction! In 10 − 3 + 2, run left-to-right: (10 − 3) + 2 = 7 + 2 = 9 (NOT 10 − 5 = 5!)." }
      ],
      cheatCode: "3 Tiers only: (1) Brackets & Powers → (2) × / ÷ left-to-right → (3) + / − left-to-right.",
      visualizerId: "algebraBalanceScale",
      questions: [
        { type: "input", prompt: "Evaluate: 2 + 3 × 4", answer: "14", hint: "Multiplication outranks addition, so compute 3 × 4 first.", whyEasy: "Multiply first (3 × 4 = 12), then add 2 → 14!" },
        { type: "mc", prompt: "Viral trap! What is 8 ÷ 2 × (2 + 2)?", options: ["1", "16", "8", "4"], answer: "16", hint: "Brackets give 4, leaving 8 ÷ 2 × 4 — run ÷ and × strictly left-to-right!", whyEasy: "(8 ÷ 2) × 4 = 4 × 4 = 16 because ÷ and × share the exact same tier!" },
        { type: "input", prompt: "Evaluate: (2 + 3) × 4", answer: "20", hint: "Parentheses override normal order — finish 2 + 3 inside the box first.", whyEasy: "Inside parentheses gives 5, then 5 × 4 = 20!" },
        { type: "input", prompt: "Evaluate: 10 − 3 + 2", answer: "9", hint: "Subtraction and addition tie — go strictly left to right!", whyEasy: "10 − 3 = 7 first, then 7 + 2 = 9 (avoid the trap of doing 3 + 2 first!)." },
        { type: "input", prompt: "Evaluate: 3 + 2 × 3²", answer: "21", hint: "Exponents beat multiplication: compute 3² = 9, then × 2 = 18, then + 3.", whyEasy: "Tier 1: 3² = 9 → Tier 2: 2 × 9 = 18 → Tier 3: 3 + 18 = 21!" }
      ]
    },
    {
      id: "perimeter-area-volume",
      worldId: "elementary",
      order: 12,
      title: "Perimeter, Area, Volume & Units",
      icon: "📦",
      tagline: "Perimeter = fence around it. Area = carpet inside. Volume = filling the 3D box!",
      scaryVersion: "1D boundary length, 2D Lebesgue planar measure & 3D spatial capacity.",
      easyTruth: "Never mix these up again: Perimeter = walk the edge (add all sides). Area = square tiles covering the floor (L × W). Volume = cubes filling a box (L × W × H)!",
      microSteps: [
        { label: "Step 1: 1D, 2D, 3D Units Tell You the Formula!", text: "Perimeter uses cm (add sides). Area uses cm² (multiply 2 sides). Volume uses cm³ (multiply 3 sides)!" },
        { label: "Step 2: Metric Prefixes", text: "kilo = 1000 (1 km = 1000 m), centi = 1/100 (1 m = 100 cm), milli = 1/1000 (1 L = 1000 mL)." },
        { label: "Step 3: Triangles Are Half-Rectangles", text: "Triangle Area = ½ × base × height. Always use the straight height, not the slanted side!" }
      ],
      cheatCode: "Fence = Perimeter (add), Carpet = Area (×2 dims), Fish Tank = Volume (×3 dims).",
      visualizerId: "rectangleMultiplier",
      questions: [
        { type: "input", prompt: "A 5m × 3m room needs a fence around its edge (Perimeter) and carpet inside (Area). What is Perimeter + Area?", answer: "31", hint: "Perimeter = 5+3+5+3 = 16. Area = 5×3 = 15.", whyEasy: "16 + 15 = 31! Notice 16m around, 15m² inside." },
        { type: "input", prompt: "What is the volume of a 2 × 3 × 5 box?", answer: "30", hint: "Multiply all 3 dimensions: 2 × 3 × 5.", whyEasy: "6 × 5 = 30 cubic units!" },
        { type: "input", prompt: "How many centimeters are in 3.5 meters? (1 m = 100 cm)", answer: "350", hint: "Multiply 3.5 by 100.", whyEasy: "3.5 × 100 = 350 cm!" },
        { type: "mc", prompt: "If you DOUBLE every side of a square (say 3 → 6), what happens to its Area?", options: ["Doubles (2×)", "Triples (3×)", "Quadruples (4×)", "Stays same"], answer: "Quadruples (4×)", hint: "3×3 = 9 vs 6×6 = 36!", whyEasy: "Because Area is 2D (2² = 4), doubling sides makes Area 4× bigger!" },
        { type: "input", prompt: "Triangle with base 8 and vertical height 5: Area = ?", answer: "20", hint: "Half of 8 × 5.", whyEasy: "½ × 8 × 5 = 20!" }
      ]
    },

    // ==================== ERA 3: JUNIOR HIGH (8 NODES) ====================
    {
      id: "negatives-flip",
      worldId: "junior",
      order: 13,
      title: "Negatives = 180° Flips & Debt",
      icon: "🔄",
      tagline: "Why minus a minus is a plus (two 180° U-turns face forward!).",
      scaryVersion: "Additive group inverses and orientation-reversing ring reflections.",
      easyTruth: "A minus sign literally means 'FLIP DIRECTION'. Flipping twice (− −) spins 360° back to facing forward (+)!",
      microSteps: [
        { label: "Step 1: Money / Thermometer", text: "3 − 7 means $3 cash minus $7 bill = −$4. −5 + 8 = +3." },
        { label: "Step 2: Subtracting a Negative", text: "5 − (−3): removing a $3 debt gains you +$3! So 5 + 3 = 8." },
        { label: "Step 3: Multiplying Negatives", text: "(−2) × (−3) = +6. Odd number of minuses → −; even number → +!" }
      ],
      cheatCode: "Two minus signs touching or multiplying spin full circle back to PLUS!",
      visualizerId: "numberLineMake10",
      questions: [
        { type: "input", prompt: "What is 5 − (−3)?", answer: "8", hint: "Two minus signs flip into +.", whyEasy: "5 + 3 = 8!" },
        { type: "input", prompt: "Temp is −7°C and rises +12°C. New temp?", answer: "5", hint: "7 steps to 0, +5 more.", whyEasy: "−7 + 12 = 5!" },
        { type: "input", prompt: "What is (−4) × (−5)?", answer: "20", hint: "Neg × Neg = Pos.", whyEasy: "+20!" },
        { type: "mc", prompt: "GRADE 12 TRAP: What is −3² vs (−3)²?", options: ["−9 and +9", "+9 and +9", "−9 and −9", "+9 and −9"], answer: "−9 and +9", hint: "In −3², ² only hugs the 3!", whyEasy: "−(3²) = −9 vs (−3)(−3) = +9!" },
        { type: "input", prompt: "What is (−2) × (−2) × (−2)?", answer: "-8", hint: "Three minuses (odd) stays negative.", whyEasy: "−8!" }
      ]
    },
    {
      id: "squares-cubes-roots",
      worldId: "junior",
      order: 14,
      title: "Squares, Cubes & Roots (√1–√225)",
      icon: "√",
      tagline: "Memorize 1²–15² so roots & simplifying radicals like √50 = 5√2 become instant!",
      scaryVersion: "Principal real square/cube root extraction and radical prime simplification.",
      easyTruth: "Square root √49 just asks: 'What positive number times itself makes 49?' (7!). Memorizing 1² to 15² makes algebra & Pythagoras effortless.",
      microSteps: [
        { label: "Step 1: Anchor Squares & Cubes", text: "Know 11²=121, 12²=144, 13²=169, 14²=196, 15²=225! And cubes: 2³=8, 3³=27, 4³=64, 5³=125." },
        { label: "Step 2: Simplifying Radicals (Jailbreak!)", text: "To simplify √50, pull out the biggest perfect square: 50 = 25 × 2 → √25 escapes jail as 5 → 5√2!" },
        { label: "Step 3: Estimating Any Root", text: "Need √30? It sits between √25 (5) and √36 (6) — about 5.5!" }
      ],
      cheatCode: "Jailbreak rule: factor out the biggest square (4, 9, 16, 25, 36...) and take its root outside!",
      visualizerId: "numberPatternSieve",
      questions: [
        { type: "input", prompt: "Memorize check! What is √169?", answer: "13", hint: "12² = 144, 13² = ?", whyEasy: "13 × 13 = 169 → √169 = 13!" },
        { type: "input", prompt: "What is ∛64 (cube root of 64)?", answer: "4", hint: "What number × itself × itself = 64?", whyEasy: "4 × 4 × 4 = 64 → ∛64 = 4!" },
        { type: "mc", prompt: "Simplify √50 into jailbreak radical form:", options: ["5√2", "2√5", "25√2", "10√5"], answer: "5√2", hint: "Split 50 = 25 × 2.", whyEasy: "√(25 × 2) = √25 · √2 = 5√2!" },
        { type: "input", prompt: "What is √225?", answer: "15", hint: "Ends in 5, bigger than 10²=100.", whyEasy: "15² = 225 → √225 = 15!" },
        { type: "mc", prompt: "Which two whole integers does √40 sit between?", options: ["5 and 6", "6 and 7", "7 and 8", "4 and 5"], answer: "6 and 7", hint: "6² = 36 and 7² = 49.", whyEasy: "36 < 40 < 49, so √40 is between 6 and 7 (~6.3)!" }
      ]
    },
    {
      id: "exponents-roots",
      worldId: "junior",
      order: 15,
      title: "Exponents (0, Negative & Fractional!)",
      icon: "🚀",
      tagline: "Exponents count multiplications. Even x⁰, x⁻³, and x^(2/3) follow one ladder!",
      scaryVersion: "Multiplicative monoid homomorphisms extended to negative and rational indices.",
      easyTruth: "Walk down a simple division ladder: 2³ = 8, 2² = 4, 2¹ = 2. Keep dividing by 2 each step → 2⁰ MUST be 1, 2⁻¹ MUST be 1/2, 2⁻³ = 1/8! Zero magic — every exponent rule comes from counting copies.",
      microSteps: [
        { label: "Step 1: Count Copies (Add, Subtract, Multiply)", text: "x³ · x² = (xxx)(xx) = x⁵ (add powers!). x⁵/x² cancels 2 copies → x³ (subtract!). (x³)² = (x³)(x³) = x⁶ (power-to-a-power multiplies!)." },
        { label: "Step 2: Zero & Negative Exponents = Reciprocals", text: "5⁰ = 5²/5² = 1 (anything nonzero to 0 is 1!). A minus exponent NEVER makes a negative number — it flips across the fraction bar: 2⁻³ = 1/2³ = 1/8." },
        { label: "Step 3: Tree Rule for Fractional Powers", text: "In a tree, ROOTS live underground (bottom denominator) and POWERS grow on top! So 8^(2/3) means 'cube root FIRST, then square': (∛8)² = 2² = 4." }
      ],
      cheatCode: "Same base × → ADD powers. Negative power → flip to 1/(base^n). Fractional power → ROOT on bottom, POWER on top!",
      visualizerId: "algebraBalanceScale",
      questions: [
        { type: "mc", prompt: "Simplify: x⁴ · x³ = ?", options: ["x⁷", "x¹²", "2x⁷", "x¹"], answer: "x⁷", hint: "4 copies of x times 3 more copies of x — ADD the exponents!", whyEasy: "Counting factors gives 4 + 3 = 7 copies of x → x⁷!" },
        { type: "mc", prompt: "What is 5⁰?", options: ["0", "1", "5", "Undefined"], answer: "1", hint: "Follow the ladder down (25 → 5 → 1) or notice 5⁰ = 5² ÷ 5²!", whyEasy: "Any nonzero number divided by itself equals 1, so 5⁰ = 1!" },
        { type: "mc", prompt: "What is 2⁻³?", options: ["−6", "−8", "1/8", "1/6"], answer: "1/8", hint: "A negative exponent flips downstairs into a positive fraction: 1 / 2³.", whyEasy: "2⁻³ = 1 / (2×2×2) = 1/8 — positive fraction, NEVER negative!" },
        { type: "input", prompt: "Root on bottom, power on top! What is 8^(2/3)?", answer: "4", hint: "Take the bottom cube root first (∛8 = 2), then raise to the top power 2.", whyEasy: "Cube root of 8 shrinks it to 2, then squaring gives 2² = 4!" },
        { type: "mc", prompt: "Simplify: (x³)² = ?", options: ["x⁵", "x⁶", "x⁹", "2x³"], answer: "x⁶", hint: "Two copies of x³ multiplied together: x³ · x³ (multiply the exponents!).", whyEasy: "Power raised to a power multiplies exponents: 3 × 2 = 6 → x⁶!" }
      ]
    },
    {
      id: "algebra-scale",
      worldId: "junior",
      order: 16,
      title: "Algebra = Unwrapping a Mystery Box",
      icon: "⚖️",
      tagline: "Do the exact reverse operation to both sides of the balance scale.",
      scaryVersion: "Solving univariate affine linear equations via inverse field axioms.",
      easyTruth: "Think of x as a gift wrapped in two layers: first ×2, then +3. To unwrap x, peel the OUTER layer (+3) off first with −3, then peel ×2 with ÷2 — always doing the exact same move to BOTH sides of the scale!",
      microSteps: [
        { label: "Step 1: Keep the Balance Scale Level", text: "An '=' sign is a balanced seesaw. Adding 7 or dividing by 5 keeps both trays equal ONLY if you apply that exact move to BOTH sides." },
        { label: "Step 2: Reverse PEMDAS (Outer Layer First)", text: "In 2x + 3 = 11, peel +3 first (2x = 8), then divide by 2 (x = 4). Got x on BOTH sides like 5x + 2 = 3x + 10? Gather all x's on one tray first (−3x → 2x + 2 = 10)!" },
        { label: "Step 3: Why Negatives Flip < and >", text: "On the number line, 2 < 5, but multiplying by −1 mirrors both sides to −2 > −5! Whenever you multiply or divide an inequality by a NEGATIVE, ALWAYS flip < ↔ >." }
      ],
      cheatCode: "Peel +/− before ×/÷, do identical moves to both sides, flip < ↔ > on negative ×/÷, and plug x back in to verify!",
      visualizerId: "algebraBalanceScale",
      questions: [
        { type: "input", prompt: "Solve for x: 2x + 3 = 11", answer: "4", hint: "Undo the outer +3 first (11 − 3 = 8), then divide both sides by 2.", whyEasy: "2x = 8 → dividing by 2 gives x = 4 (check: 2·4 + 3 = 11)!" },
        { type: "input", prompt: "Solve for x: 5x − 7 = 18", answer: "5", hint: "Undo −7 by adding 7 to both sides (25), then divide by 5.", whyEasy: "5x = 25 → x = 5 (check: 5·5 − 7 = 18)!" },
        { type: "input", prompt: "Solve for x: 3(x − 2) = 12", answer: "6", hint: "Peel the outer ×3 by dividing both sides by 3 first → x − 2 = 4!", whyEasy: "Dividing by 3 avoids distributing: x − 2 = 4 → add 2 → x = 6!" },
        { type: "input", prompt: "Solve: 5x + 2 = 3x + 10", answer: "4", hint: "Move the smaller 3x off the right side by subtracting 3x from both sides.", whyEasy: "2x + 2 = 10 → subtract 2 → 2x = 8 → x = 4!" },
        { type: "mc", prompt: "INEQUALITY TRAP! Solve −2x > 6:", options: ["x > −3", "x < −3", "x > 3", "x < 3"], answer: "x < −3", hint: "Dividing by negative −2 mirrors the number line and FLIPS '>' to '<'!", whyEasy: "6 ÷ (−2) = −3 and the inequality flips to x < −3 (test x = −4: −2(−4) = 8 > 6 ✓)!" }
      ]
    },
    {
      id: "systems-equations",
      worldId: "junior",
      order: 17,
      title: "Systems of Equations (2 Mysteries)",
      icon: "⚔️",
      tagline: "Stack two equations, add them straight down, watch one letter go POOF!",
      scaryVersion: "Simultaneous intersection of planar linear manifolds in ℝ².",
      easyTruth: "Got two unknowns (x and y)? Line them up like a vertical addition problem so +y and −y cancel out, or swap one equation into the other!",
      microSteps: [
        { label: "Step 1: Elimination (Stack & Smash!)", text: "x + y = 10 and x − y = 4. Add straight down! +y and −y vanish → 2x = 14 → x = 7, then y = 3!" },
        { label: "Step 2: Substitution (Plug In)", text: "If y = 2x and x + y = 12, replace y with 2x → x + 2x = 12 → 3x = 12 → x = 4, y = 8." },
        { label: "Step 3: Graph Meaning", text: "The solution (x, y) is literally where the two lines cross! Parallel lines never cross (0 solutions)." }
      ],
      cheatCode: "Line up +y and −y and ADD straight down — one variable vanishes instantly!",
      visualizerId: "algebraBalanceScale",
      questions: [
        { type: "input", prompt: "Add straight down! If x + y = 10 and x − y = 4, what is x?", answer: "7", hint: "2x = 14.", whyEasy: "(x+y) + (x−y) = 2x = 14 → x = 7!" },
        { type: "input", prompt: "Substitution: If y = 3x and x + y = 20, what is x?", answer: "5", hint: "x + 3x = 20.", whyEasy: "4x = 20 → x = 5!" },
        { type: "input", prompt: "Two burgers + 1 fry = $11. One burger + 1 fry = $7. Price of 1 burger?", answer: "4", hint: "Subtract the second order from the first!", whyEasy: "Extra burger adds $11 − $7 = $4!" },
        { type: "mc", prompt: "If two lines on a graph are PARALLEL (same slope, different start), how many solutions?", options: ["0 solutions", "1 solution", "2 solutions", "Infinite"], answer: "0 solutions", hint: "Do parallel train tracks ever cross?", whyEasy: "They never intersect → 0 solutions!" },
        { type: "input", prompt: "If 2x + y = 13 and 2x − y = 7, what is x?", answer: "5", hint: "Add straight down: 4x = 20.", whyEasy: "4x = 20 → x = 5!" }
      ]
    },
    {
      id: "factoring-foil",
      worldId: "junior",
      order: 18,
      title: "Expanding & Factoring Quadratics",
      icon: "🧩",
      tagline: "Factor x² + bx + c = find two numbers that MULTIPLY to c and ADD to b.",
      scaryVersion: "Factoring monic and non-monic quadratic polynomials over the ring of integers.",
      easyTruth: "Expanding (x + a)(x + b) is a 2×2 area rectangle: every piece on the left multiplies every piece on the right (never drop the middle term of (x + 3)²!). Factoring backwards simply reverses that box!",
      microSteps: [
        { label: "Step 1: Box Expand & Never Forget the Middle Term!", text: "(x + 3)(x + 4) = x² + 3x + 4x + 12 = x² + 7x + 12. For squares, (x + 3)² = (x + 3)(x + 3) = x² + 6x + 9 — NEVER skip the middle 2ab term!" },
        { label: "Step 2: Sum/Product Signs & AC Method (a > 1)", text: "For x² + 2x − 15: negative end (−15) means OPPOSITE signs, and +2 middle means the bigger number is positive → (+5)(−3) = −15 and 5 − 3 = +2 → (x + 5)(x − 3). When a > 1 (like 2x² + 7x + 3), multiply a·c = 6, split 7x = 6x + 1x, and group!" },
        { label: "Step 3: Difference of Squares Shortcut", text: "Whenever a middle x-term is missing with a MINUS sign, a² − b² = (a − b)(a + b) ALWAYS! E.g. x² − 49 = (x − 7)(x + 7)." }
      ],
      cheatCode: "Factoring x² + bx + c: MULTIPLY to c (watch signs!), ADD to b. (a + b)² = a² + 2ab + b². a² − b² = (a − b)(a + b).",
      visualizerId: "rectangleMultiplier",
      questions: [
        { type: "mc", prompt: "Expand (x + 2)(x + 5):", options: ["x² + 10", "x² + 7x + 10", "x² + 10x + 7", "2x + 7"], answer: "x² + 7x + 10", hint: "Middle coefficient adds 2 + 5; end constant multiplies 2 × 5.", whyEasy: "x² + (2 + 5)x + (2 × 5) = x² + 7x + 10!" },
        { type: "mc", prompt: "Factor x² + 8x + 15:", options: ["(x + 3)(x + 5)", "(x + 1)(x + 15)", "(x + 2)(x + 6)", "(x − 3)(x − 5)"], answer: "(x + 3)(x + 5)", hint: "Find two positive numbers that multiply to 15 and sum to 8.", whyEasy: "3 × 5 = 15 and 3 + 5 = 8, so it factors cleanly to (x + 3)(x + 5)!" },
        { type: "mc", prompt: "Factor x² − 49:", options: ["(x − 7)²", "(x − 7)(x + 7)", "(x + 7)²", "(x − 49)(x + 1)"], answer: "(x − 7)(x + 7)", hint: "Difference of two perfect squares (x² − 7²) splits with opposite signs!", whyEasy: "a² − b² = (a − b)(a + b) → (x − 7)(x + 7) so the middle ±7x cancels!" },
        { type: "mc", prompt: "TRAP! Expand (x + 3)²:", options: ["x² + 9", "x² + 3x + 9", "x² + 6x + 9", "2x + 6"], answer: "x² + 6x + 9", hint: "Write it out as (x + 3)(x + 3) so you keep both 3x middle terms!", whyEasy: "(x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9 — never drop 2ab!" },
        { type: "mc", prompt: "Factor x² + 2x − 15:", options: ["(x + 5)(x − 3)", "(x − 5)(x + 3)", "(x + 5)(x + 3)", "(x − 5)(x − 3)"], answer: "(x + 5)(x − 3)", hint: "Negative −15 means opposite signs; bigger factor gets the + sign to sum to +2.", whyEasy: "(+5)(−3) = −15 and +5 + (−3) = +2 → (x + 5)(x − 3)!" }
      ]
    },
    {
      id: "slope-lines",
      worldId: "junior",
      order: 19,
      title: "Slope & Lines (y = mx + b)",
      icon: "📈",
      tagline: "b = where you start. m = how much you climb every 1 step right.",
      scaryVersion: "Linear affine functions parameterized by rate of change and y-intercept.",
      easyTruth: "Think of a taxi meter: y = 3x + 5 means a $5 base flag-down fee (starting height b at x = 0), plus $3 per kilometer (slope m). Every straight line is just Start + Rate × Steps!",
      microSteps: [
        { label: "Step 1: Start (b) + Step Rate (m)", text: "In y = mx + b, b is your starting y-intercept when x = 0, and m (glued to x) is how much y climbs per +1 step right. Negative m slopes downhill; m = 0 is a flat horizontal floor; vertical walls have UNDEFINED slope (÷ 0)!" },
        { label: "Step 2: Rise ÷ Run Between Two Points", text: "Slope m = (y₂ − y₁) ÷ (x₂ − x₁) — vertical jump divided by horizontal step. Keep the same point order on top and bottom!" },
        { label: "Step 3: Parallel vs Perpendicular Slopes", text: "Parallel lines tilt identically (same m). Perpendicular lines meet at 90°: take the NEGATIVE RECIPROCAL — flip the fraction upside down AND swap its sign (2/3 → −3/2)!" }
      ],
      cheatCode: "y = (rate)x + (start). Slope = Rise/Run. Horizontal = 0, Vertical = Undefined. Perpendicular = flip fraction & flip sign!",
      visualizerId: "unitCircleAndGraphLab",
      questions: [
        { type: "mc", prompt: "For y = 4x + 7, what are slope & y-intercept?", options: ["Slope 7, start 4", "Slope 4, start 7", "Slope 4, start −7", "Slope 11, start 0"], answer: "Slope 4, start 7", hint: "Match y = mx + b: m sits in front of x, b is the standalone starting constant.", whyEasy: "4 is multiplied by x (slope m = 4) and +7 is the y-intercept (b = 7)!" },
        { type: "input", prompt: "Find slope between (2, 5) and (5, 17):", answer: "4", hint: "Rise ÷ Run = (17 − 5) ÷ (5 − 2).", whyEasy: "y rises by 12 while x runs by 3, so slope = 12 ÷ 3 = 4!" },
        { type: "mc", prompt: "Perpendicular slope to 2/3?", options: ["2/3", "3/2", "−3/2", "−2/3"], answer: "−3/2", hint: "Perpendicular requires TWO flips: flip upside down (3/2) AND flip the sign (−)!", whyEasy: "Negative reciprocal of +2/3 is −3/2 (check: (2/3)(−3/2) = −1)!" },
        { type: "input", prompt: "Gym charges $20 signup + $15/mo. Cost after 4 months?", answer: "80", hint: "Plug x = 4 into y = 15x + 20.", whyEasy: "4 months × $15 = $60 plus the $20 signup fee = $80 total!" },
        { type: "mc", prompt: "What does slope = 0 look like?", options: ["Vertical wall", "Flat horizontal floor", "45° ramp", "Parabola"], answer: "Flat horizontal floor", hint: "Rise ÷ Run = 0 means vertical rise is 0 no matter how far right you walk.", whyEasy: "Zero vertical climb across any horizontal run makes a flat horizontal line!" }
      ]
    },
    {
      id: "geometry-pythagoras",
      worldId: "junior",
      order: 20,
      title: "Geometry & Pythagoras (a² + b² = c²)",
      icon: "📐",
      tagline: "a² + b² = c² with c ALWAYS across from 90°, triangle sum = 180°, and circles!",
      scaryVersion: "Euclidean planar metric invariants and right-triangle hypotenuse norm.",
      easyTruth: "Pythagoras (a² + b² = c²) is simply the diagonal shortcut across a right triangle: build squares on both short legs (a and b) and their areas ALWAYS add up to the square on the longest diagonal side c!",
      microSteps: [
        { label: "Step 1: Spot the Hypotenuse c First!", text: "In a² + b² = c², c is ALWAYS the longest side directly across from the 90° corner. Finding c? ADD squares (c = √(a² + b²)). Finding a missing leg? SUBTRACT (b = √(c² − a²))!" },
        { label: "Step 2: Instant Pythagorean Triples", text: "Memorize (3, 4, 5) and (5, 12, 13) plus scaled multiples like (6, 8, 10) and (9, 12, 15) — they solve 80% of exam triangles in 2 seconds!" },
        { label: "Step 3: Triangle 180° & Circle Twins", text: "Every triangle's 3 interior angles add to 180° (same as a straight line). For circles: Area = πr² (2D square units!) vs Circumference = 2πr (1D perimeter around the rim)." }
      ],
      cheatCode: "c = hypotenuse across from 90°: a² + b² = c². Spot 3-4-5 / 5-12-13! Area = πr² (squared), Circumference = 2πr.",
      visualizerId: "geometryLogicLab",
      questions: [
        { type: "input", prompt: "Right triangle legs 3 and 4. Hypotenuse?", answer: "5", hint: "Both 3 and 4 are legs, so add squares: c = √(3² + 4²).", whyEasy: "√(9 + 16) = √25 = 5 — the classic 3-4-5 Pythagorean triple!" },
        { type: "input", prompt: "Right triangle legs 6 and 8. Hypotenuse?", answer: "10", hint: "Notice 6 and 8 are just 2× the (3, 4, 5) triple!", whyEasy: "Scaling (3, 4, 5) by 2 gives (6, 8, 10), verified by √(36 + 64) = 10!" },
        { type: "input", prompt: "Right triangle has leg 5 and hypotenuse 13. Other leg?", answer: "12", hint: "13 is the hypotenuse c, so SUBTRACT: √(13² − 5²)!", whyEasy: "169 − 25 = 144 → √144 = 12 (the 5-12-13 triple)!" },
        { type: "input", prompt: "Triangle has angles 50° and 60°. Third angle?", answer: "70", hint: "All three angles in ANY triangle must total 180°.", whyEasy: "50° + 60° = 110°, leaving 180° − 110° = 70°!" },
        { type: "mc", prompt: "Circle with r = 5: Area & Circumference?", options: ["Area 25π, Circ 10π", "Area 10π, Circ 25π", "Area 5π, Circ 10π", "Area 25π, Circ 5π"], answer: "Area 25π, Circ 10π", hint: "Area squares radius (πr² = π·5²); Circumference doubles radius (2πr = 2π·5).", whyEasy: "Area = π(5²) = 25π (square units) and Circumference = 2π(5) = 10π!" }
      ]
    },

    // ==================== ERA 4: SENIOR HIGH ====================
    {
      id: "quadratics-symmetry",
      worldId: "senior",
      order: 21,
      title: "Quadratics & Symmetry (x = −b/2a)",
      icon: "🏹",
      tagline: "Every parabola is a mirror. Quadratic formula = Vertex ± Spread!",
      scaryVersion: "Second-degree polynomial root extraction and parabolic axis of symmetry.",
      easyTruth: "Split the quadratic formula in two: −b/(2a) is the exact CENTER mirror line (Vertex), and ±√(b² − 4ac)/(2a) is simply how far left and right the two roots spread from that center!",
      microSteps: [
        { label: "Step 1: Zero Product & Square-Root ± Rule", text: "When (x − 4)(x + 7) = 0, either bracket can be 0 → flip the signs to get x = 4 or x = −7. Similarly, x² = 25 ALWAYS has TWO answers (+5 and −5)!" },
        { label: "Step 2: Standard Vertex (−b/2a) vs Vertex Form", text: "From ax² + bx + c, the symmetry center sits at x = −b/(2a). In Vertex Form y = a(x − h)² + k, you read the vertex (h, k) directly (flip sign inside parentheses, keep sign outside; a > 0 smiles UP, a < 0 frowns DOWN)!" },
        { label: "Step 3: Discriminant Δ = b² − 4ac", text: "The piece inside √ tells you how many real x-intercepts exist: Δ > 0 → 2 real roots; Δ = 0 → 1 repeated touch; Δ < 0 → √(negative) gives 0 real roots (2 complex roots)!" }
      ],
      cheatCode: "Center = −b/(2a). Vertex form a(x−h)² + k has vertex (h, k) & opens down if a < 0. Δ = b² − 4ac counts real roots!",
      visualizerId: "unitCircleAndGraphLab",
      questions: [
        { type: "mc", prompt: "Solve (x − 4)(x + 7) = 0:", options: ["x = −4 or 7", "x = 4 or −7", "x = 4 or 7", "x = −28"], answer: "x = 4 or −7", hint: "Set each factor to zero: x − 4 = 0 and x + 7 = 0.", whyEasy: "Values that zero out each bracket flip the signs: x = +4 or x = −7!" },
        { type: "input", prompt: "Vertex x of y = x² − 6x + 5:", answer: "3", hint: "Use x = −b/(2a) with a = 1 and b = −6 (watch the double minus!).", whyEasy: "−(−6) ÷ (2·1) = +6 ÷ 2 = 3!" },
        { type: "mc", prompt: "y = −2(x − 1)² + 9 opens which way & vertex?", options: ["UP, (1, 9)", "DOWN, (1, 9)", "DOWN, (−1, 9)", "UP, (−1, 9)"], answer: "DOWN, (1, 9)", hint: "Negative lead −2 opens DOWN; vertex form a(x − h)² + k flips −1 to h = +1 and keeps k = +9.", whyEasy: "a = −2 < 0 frowns DOWN, and vertex (h, k) = (+1, +9)!" },
        { type: "mc", prompt: "If b² − 4ac = −12, how many real x-intercepts?", options: ["2", "1", "0", "12"], answer: "0", hint: "Can you take the real square root of a negative discriminant −12?", whyEasy: "Δ < 0 means the parabola never crosses the x-axis → 0 real roots!" },
        { type: "mc", prompt: "Solve x² = 25:", options: ["x = 5 only", "x = 5 or −5", "x = 25", "x = 12.5"], answer: "x = 5 or −5", hint: "Don't forget both positive and negative numbers square to +25!", whyEasy: "(+5)² = 25 AND (−5)² = 25, so taking ±√ gives both +5 and −5!" }
      ]
    },
    {
      id: "complex-imaginary-i",
      worldId: "senior",
      order: 22,
      title: "Complex & Imaginary Numbers (i = √−1)",
      icon: "🔮",
      tagline: "i isn't fake — it's a 90° rotation! And i² = −1 runs a 4-step spin cycle.",
      scaryVersion: "Algebraic field extension ℂ = ℝ[i]/(i² + 1) and Argand plane norms.",
      easyTruth: "Multiplying by −1 spins 180° on the number line. So multiplying by i just spins 90° UP! Spin twice (i²) = 180° = −1!",
      microSteps: [
        { label: "Step 1: One Rule Only: i² = −1", text: "Add/multiply complex numbers just like regular x terms, then whenever you see i², replace it with −1!" },
        { label: "Step 2: The 4-Step Clock Cycle", text: "i¹ = i, i² = −1, i³ = −i, i⁴ = 1... and then it repeats every 4! Need i²¹? Divide 21 by 4 → remainder 1 → i¹ = i!" },
        { label: "Step 3: Solving x² + 9 = 0", text: "x² = −9 → x = ±√(−9) = ±3i! Now EVERY quadratic has answers!" }
      ],
      cheatCode: "Treat i like x, swap every i² → −1, and divide high powers of i by 4 to check the remainder!",
      visualizerId: "unitCircleAndGraphLab",
      questions: [
        { type: "mc", prompt: "What is i² equal to?", options: ["1", "−1", "i", "0"], answer: "−1", hint: "i is defined as √(−1).", whyEasy: "(√−1)² = −1!" },
        { type: "mc", prompt: "Add: (3 + 4i) + (2 − 7i) =", options: ["5 − 3i", "5 + 11i", "1 − 3i", "6 − 28i"], answer: "5 − 3i", hint: "Real with real, i with i.", whyEasy: "(3+2) + (4−7)i = 5 − 3i!" },
        { type: "mc", prompt: "What is √(−25)?", options: ["−5", "5i", "−25i", "5"], answer: "5i", hint: "Pull √(−1) out as i, and √25 = 5.", whyEasy: "√25 · √−1 = 5i!" },
        { type: "mc", prompt: "Use the 4-step clock! What is i⁶?", options: ["1", "−1", "i", "−i"], answer: "−1", hint: "6 ÷ 4 has remainder 2 → same as i².", whyEasy: "i⁶ = i⁴ · i² = 1 · (−1) = −1!" },
        { type: "mc", prompt: "What is (2 + i)(2 − i)? (Hint: replace i² with −1!)", options: ["3", "5", "4 − i", "4 + i"], answer: "5", hint: "2² − i² = 4 − (−1).", whyEasy: "4 − (−1) = 4 + 1 = 5! Complex conjugates ALWAYS cancel i!" }
      ]
    },
    {
      id: "functions-shifting",
      worldId: "senior",
      order: 23,
      title: "Functions f(x) & Shifting Rules",
      icon: "🎛️",
      tagline: "f(x) is a vending machine. Inside () = Opposite X; Outside = Honest Y!",
      scaryVersion: "Function composition and affine coordinate-space transformations.",
      easyTruth: "Treat f( ) as a labeled slot: drop whatever is inside the parentheses into EVERY x in the formula! For graph shifts, outside changes move Y honestly (+ up), while inside changes act backwards because x must compensate to hit the same value.",
      microSteps: [
        { label: "Step 1: Slot Substitution & Composition f(g(x))", text: "If f(x) = 3x − 1, then f(x + 2) replaces x with (x + 2) → 3(x + 2) − 1. For nested functions f(g(3)), work INSIDE-OUT: compute g(3) first, then feed that result into f!" },
        { label: "Step 2: Why Inside Shifts Act Backwards", text: "In y = (x − 4)² + 2, x must be +4 just to make the inside equal 0 — so the whole parabola shifts RIGHT 4! Outside +2 directly lifts height UP 2." },
        { label: "Step 3: Domain Watchdog (2 Legal Bans)", text: "Real-number functions ban only two things: dividing by 0 (so 1/(x − 5) bans x = 5) and taking √ of a negative number." }
      ],
      cheatCode: "OUTSIDE = Vertical & Honest. INSIDE = Horizontal & Opposite! Composition f(g(x)) evaluates INSIDE-OUT.",
      visualizerId: "unitCircleAndGraphLab",
      questions: [
        { type: "input", prompt: "If f(x) = x² + 2x, what is f(3)?", answer: "15", hint: "Drop 3 into every x slot: 3² + 2(3).", whyEasy: "3² + 2(3) = 9 + 6 = 15!" },
        { type: "mc", prompt: "How does y = (x − 4)² + 2 shift from y = x²?", options: ["Left 4, Up 2", "Right 4, Up 2", "Right 4, Down 2", "Left 4, Down 2"], answer: "Right 4, Up 2", hint: "Inside −4 acts opposite (Right 4); outside +2 acts honest (Up 2).", whyEasy: "x = +4 zeros out (x − 4), shifting Right 4, while +2 lifts it Up 2!" },
        { type: "mc", prompt: "If f(x) = 2x + 1, what is f(x + 3)?", options: ["2x + 4", "2x + 7", "2x + 3", "6x + 3"], answer: "2x + 7", hint: "Replace x with the entire expression (x + 3) inside parentheses: 2(x + 3) + 1.", whyEasy: "Distributing gives 2x + 6 + 1 = 2x + 7 (not 2x + 4)!" },
        { type: "mc", prompt: "Forbidden x in f(x) = 1 / (x − 5)?", options: ["x = 0", "x = 5", "x = −5", "x = 1"], answer: "x = 5", hint: "Check which x turns the denominator into zero.", whyEasy: "Plugging x = 5 gives 1/0 (undefined), so x = 5 is excluded from the domain!" },
        { type: "input", prompt: "f(x) = x + 4 and g(x) = 2x. Find f(g(3)):", answer: "10", hint: "Work inside-out: compute g(3) = 2(3) = 6 first, then plug 6 into f!", whyEasy: "g(3) = 6, then f(6) = 6 + 4 = 10!" }
      ]
    },
    {
      id: "logarithms-unlocked",
      worldId: "senior",
      order: 24,
      title: "Logarithms = 'Just Count the Exponent!'",
      icon: "🔓",
      tagline: "log₂(8) literally just asks: '2 to what power gives 8?' (Answer: 3!).",
      scaryVersion: "Inverse bijective mapping of exponential growth curves.",
      easyTruth: "A logarithm is NOT a scary new creature — it is just the question 'WHAT EXPONENT?' written backwards! Because logs ARE exponents, every log law is literally an exponent rule in disguise (multiplying bases adds exponents → log(AB) = log A + log B)!",
      microSteps: [
        { label: "Step 1: Translate log_b(y) = x ↔ b^x = y", text: "Read log₂(8) out loud as '2 to what power makes 8?' Since 2³ = 8, the answer is 3! For base 10, log₁₀(10,000) simply counts the 4 zeros (= 4). Fractional outputs like 1/9 mean negative powers: 3⁻² = 1/9 → log₃(1/9) = −2." },
        { label: "Step 2: Why Log Laws Work (Exponent Twins!)", text: "Since b^x · b^y = b^(x+y), multiplying inside a log ADDS logs outside: log(A·B) = log A + log B! Dividing subtracts: log(A/B) = log A − log B. Powers drop out front: log(A^k) = k·log A." },
        { label: "Step 3: Zero Rule & Natural Log (ln = base e)", text: "Since b⁰ = 1 for any base, log_b(1) = 0 ALWAYS! And 'ln' is just shorthand for log base e (Euler's growth constant e ≈ 2.718), so ln(e⁵) asks 'e to what power gives e⁵?' → 5!" }
      ],
      cheatCode: "log_b(y) = 'What exponent on b gives y?' Multiply inside ↔ Add logs outside. log_b(1) = 0, ln(eˣ) = x!",
      visualizerId: "algebraBalanceScale",
      questions: [
        { type: "input", prompt: "What is log₂(8)?", answer: "3", hint: "Ask: 2 raised to what exponent equals 8?", whyEasy: "Because 2³ = 8, log₂(8) outputs the exponent 3!" },
        { type: "input", prompt: "What is log₁₀(10,000)?", answer: "4", hint: "10 to what power equals 10,000? Count the zeros!", whyEasy: "10⁴ = 10,000, so log₁₀(10,000) = 4!" },
        { type: "input", prompt: "What is log₅(1)?", answer: "0", hint: "Ask: 5 to what exponent equals 1?", whyEasy: "Since 5⁰ = 1 (and any base⁰ = 1), log_b(1) is ALWAYS 0!" },
        { type: "mc", prompt: "Simplify: log(A) + log(B)", options: ["log(A + B)", "log(A · B)", "log(A / B)", "A · log(B)"], answer: "log(A · B)", hint: "Remember exponent rules: adding exponents corresponds to multiplying bases!", whyEasy: "Logs ARE exponents — adding two logs multiplies their insides: log(A · B)!" },
        { type: "input", prompt: "What is log₃(1/9)?", answer: "-2", hint: "9 is 3², and flipping it into a fraction (1/9) makes the exponent negative!", whyEasy: "3⁻² = 1/3² = 1/9, so log₃(1/9) = −2!" }
      ]
    },
    {
      id: "trig-unit-circle",
      worldId: "senior",
      order: 25,
      title: "Trig & Unit Circle (cos = X, sin = Y)",
      icon: "🎡",
      tagline: "Stand on a radius-1 Ferris wheel: cos = sideways X, sin = height Y!",
      scaryVersion: "Periodic circular ratios on the Euclidean 1-sphere parameterized by arc radians.",
      easyTruth: "On a Ferris wheel of radius 1 (hypotenuse = 1!), Adj/1 = X and Opp/1 = Y — so SOH-CAH-TOA literally becomes (cos θ, sin θ) = (X, Y) in alphabetical order! And tan θ = sin/cos = Rise/Run = Slope.",
      microSteps: [
        { label: "Step 1: SOH-CAH-TOA Meets Radius = 1", text: "In any right triangle: sin = Opp/Hyp, cos = Adj/Hyp, tan = Opp/Adj. Set Hypotenuse = 1 on the Unit Circle and you get (cos θ, sin θ) = (X, Y) immediately! At 45°, X = Y so tan(45°) = 1." },
        { label: "Step 2: What Radians Actually Are (π = 180°)", text: "1 full circle circumference is 2π radii (= 360°), so half a circle is π radians = 180°! Convert degrees → radians by multiplying by π/180: 90° = π/2, 60° = π/3, 45° = π/4, 30° = π/6." },
        { label: "Step 3: Cardinal Points & Pythagoras Identity", text: "0° sits at (1, 0), 90° at (0, 1), 180° at (−1, 0), 270° at (0, −1). Because every point lies on x² + y² = 1, sin²θ + cos²θ = 1 holds for EVERY angle θ!" }
      ],
      cheatCode: "(cos, sin) = (X, Y) alphabetically, tan = Slope, π rad = 180°, and sin²θ + cos²θ = 1 ALWAYS!",
      visualizerId: "unitCircleAndGraphLab",
      questions: [
        { type: "mc", prompt: "At 90° (point (0, 1)), what are cos(90°) and sin(90°)?", options: ["cos = 1, sin = 0", "cos = 0, sin = 1", "cos = 0, sin = 0", "cos = −1, sin = 0"], answer: "cos = 0, sin = 1", hint: "Match alphabetically: (cos θ, sin θ) = (X, Y) at the top of the circle (0, 1).", whyEasy: "At 90°, sideways X = 0 (cos) and height Y = 1 (sin)!" },
        { type: "mc", prompt: "Convert 180° and 60° to radians:", options: ["π and π/3", "2π and π/6", "π and π/4", "π/2 and π/3"], answer: "π and π/3", hint: "180° = π radians, and 60° is one-third of 180°!", whyEasy: "180° = π and 60° = 180°/3 = π/3 radians!" },
        { type: "mc", prompt: "Right triangle Opp=3, Adj=4, Hyp=5. sin(θ) = ?", options: ["4/5", "3/5", "3/4", "5/3"], answer: "3/5", hint: "SOH: Sine = Opposite ÷ Hypotenuse.", whyEasy: "Opp/Hyp = 3/5 (while cos is Adj/Hyp = 4/5 and tan is Opp/Adj = 3/4)!" },
        { type: "input", prompt: "What is sin²(37°) + cos²(37°)?", answer: "1", hint: "Pythagorean identity x² + y² = 1 on the unit circle works for ANY angle!", whyEasy: "No calculator needed — sin²θ + cos²θ ALWAYS equals 1 for every angle!" },
        { type: "mc", prompt: "What is tan(45°)?", options: ["0", "1/2", "1", "√2"], answer: "1", hint: "tan = sin/cos = slope of a 45° diagonal where Rise equals Run!", whyEasy: "At 45°, X and Y are equal (√2/2), so their ratio tan(45°) = 1!" }
      ]
    },
    {
      id: "conics-distance-circles",
      worldId: "senior",
      order: 26,
      title: "Midpoint, Distance & Circles/Conics",
      icon: "🍩",
      tagline: "Distance formula is secretly Pythagoras! Circles are (x − h)² + (y − k)² = r².",
      scaryVersion: "Euclidean metric spaces and second-degree planar conic sections.",
      easyTruth: "Don't memorize the ugly Distance Formula! Just draw a triangle between the points (Δx and Δy) and do Pythagoras! And a Circle equation is literally Pythagoras around center (h, k)!",
      microSteps: [
        { label: "Step 1: Midpoint = Just the Average", text: "Midpoint between (2, 6) and (8, 10)? Average X's: (2+8)/2 = 5. Average Y's: (6+10)/2 = 8 → (5, 8)." },
        { label: "Step 2: Distance = Pythagoras", text: "From (1, 2) to (4, 6): horizontal step = 3, vertical step = 4 → 3-4-5 triangle → Distance = 5!" },
        { label: "Step 3: Circle & Ellipse Equations", text: "(x − 2)² + (y + 3)² = 25 → Center flips signs to (2, −3), radius is √25 = 5 (NOT 25!)." }
      ],
      cheatCode: "Midpoint = average. Distance = √(dx² + dy²). Circle (x−h)²+(y−k)²=r² has center (h,k) & radius √rhs!",
      visualizerId: "unitCircleAndGraphLab",
      questions: [
        { type: "mc", prompt: "Circle equation (x − 3)² + (y + 2)² = 16. Center & Radius?", options: ["Center (3, −2), r = 4", "Center (−3, 2), r = 4", "Center (3, −2), r = 16", "Center (3, 2), r = 8"], answer: "Center (3, −2), r = 4", hint: "Flip inside signs, take √16!", whyEasy: "Center (3, −2) and √16 = 4!" },
        { type: "input", prompt: "Distance between (0, 0) and (6, 8):", answer: "10", hint: "6-8-10 right triangle!", whyEasy: "√(36 + 64) = √100 = 10!" },
        { type: "mc", prompt: "Midpoint between (2, 4) and (10, 12):", options: ["(6, 8)", "(8, 8)", "(12, 16)", "(4, 4)"], answer: "(6, 8)", hint: "Average X and average Y.", whyEasy: "(2+10)/2 = 6, (4+12)/2 = 8 → (6, 8)!" },
        { type: "mc", prompt: "How do you recognize a Hyperbola like x²/9 − y²/4 = 1 vs an Ellipse x²/9 + y²/4 = 1?", options: ["Hyperbola has a MINUS between x² and y²", "Hyperbola has bigger numbers", "Ellipse has no equals sign", "Both are straight lines"], answer: "Hyperbola has a MINUS between x² and y²", hint: "+ makes a closed loop (ellipse); − splits into two branches!", whyEasy: "+ keeps it closed (ellipse/circle); − rips it into a hyperbola!" },
        { type: "input", prompt: "Write the radius of x² + y² = 49:", answer: "7", hint: "√49.", whyEasy: "r² = 49 → r = 7!" }
      ]
    },
    {
      id: "sequences-sigma",
      worldId: "senior",
      order: 27,
      title: "Sigma Σ Loops, Factorials & Series",
      icon: "🔁",
      tagline: "Σ is a programmer's 'for-loop' that adds! Plus Gauss pairs & infinite geometric sums.",
      scaryVersion: "Finite/infinite series summation and factorial cancellation identities.",
      easyTruth: "Sigma (Σ) just means 'loop k from the bottom number to the top number and add every output.' Arithmetic lists pair cleanly outside-in (Gauss!), and shrinking geometric chains sum to a₁ / (1 − r)!",
      microSteps: [
        { label: "Step 1: Reading Sigma Σ & Gauss Pairing", text: "Σ (k=1..4) of 2k plugs k = 1, 2, 3, 4 and adds: 2 + 4 + 6 + 8 = 20. For arithmetic sums like 1 + 2 + ... + 10, pair ends (1+10 = 11, 2+9 = 11...): 5 pairs × 11 = 55! Formula: S_n = n(first + last)/2." },
        { label: "Step 2: Factorials (n!) & Instant Cancellation", text: "n! multiplies down to 1 (5! = 5×4×3×2×1 = 120). For ratios like 7!/6!, expand only the top step: (7 × 6!)/6! = 7 — everything from 6 down vanishes!" },
        { label: "Step 3: Infinite Geometric Series (|r| < 1)", text: "When each term shrinks by a constant fraction r (like 1/2 + 1/4 + 1/8 + ... with a₁ = 1/2, r = 1/2), the infinite sum converges to S_∞ = a₁ / (1 − r) = (1/2)/(1/2) = 1!" }
      ],
      cheatCode: "Σ = loop & add. Arithmetic sum = n(first + last)/2. Factorial ratio n!/(n−1)! = n. Shrinking geometric (|r| < 1): a₁ / (1 − r)!",
      visualizerId: "rectangleMultiplier",
      questions: [
        { type: "input", prompt: "Compute Σ (k=1 to 4) of k (1 + 2 + 3 + 4):", answer: "10", hint: "Loop k from 1 through 4 and add each value: 1 + 2 + 3 + 4.", whyEasy: "1 + 2 + 3 + 4 = 10 (or 2 pairs × 5 = 10)!" },
        { type: "input", prompt: "What is 5! (5 factorial)?", answer: "120", hint: "Multiply every integer from 5 down to 1: 5 × 4 × 3 × 2 × 1.", whyEasy: "5 × 4 = 20, × 3 = 60, × 2 = 120!" },
        { type: "input", prompt: "Gauss trick: Sum 1 + 2 + ... + 10:", answer: "55", hint: "Pair ends (1 + 10 = 11) and multiply by how many pairs (10 ÷ 2 = 5).", whyEasy: "5 pairs × 11 = 55 — zero tedious adding!" },
        { type: "input", prompt: "Simplify 7! / 6!:", answer: "7", hint: "Rewrite 7! as 7 × 6! so the entire 6! cancels top and bottom.", whyEasy: "(7 × 6!) / 6! cancels cleanly to just 7!" },
        { type: "mc", prompt: "Infinite sum 1/2 + 1/4 + 1/8 + 1/16 + ... =", options: ["Infinity", "1", "2", "0.75"], answer: "1", hint: "First term a₁ = 1/2 and shrinking ratio r = 1/2 → plug into a₁ / (1 − r)!", whyEasy: "(1/2) ÷ (1 − 1/2) = (1/2) ÷ (1/2) = 1 whole!" }
      ]
    },
    {
      id: "stats-normal-curve",
      worldId: "senior",
      order: 28,
      title: "Stats, Mean/Median & Bell Curve (68-95-99.7)",
      icon: "🔔",
      tagline: "When billionaires skew the average (Mean), Median tells the truth! Plus z-scores.",
      scaryVersion: "Descriptive central tendency, sample dispersion & Gaussian normal standardization.",
      easyTruth: "Mean = share everything equally. Median = line up & pick the middle (immune to outliers!). Standard deviation σ measures how spread out data is.",
      microSteps: [
        { label: "Step 1: Mean vs Median", text: "For [2, 3, 4, 5, 100], Mean is ~22.8 (ruined by 100!), while Median is 4 (honest middle!)." },
        { label: "Step 2: z-Score = How Many Steps σ From Average", text: "z = (score − mean) ÷ σ. Mean 70, σ = 10, your score 90 → z = +2 (2 steps above average!)." },
        { label: "Step 3: 68–95–99.7 Rule", text: "On a bell curve: 68% fall within ±1σ, 95% within ±2σ, 99.7% within ±3σ!" }
      ],
      cheatCode: "Outliers wreck Mean, never Median. z-score = (x − mean) / σ. Memorize 68-95-99.7!",
      visualizerId: "numberLineMake10",
      questions: [
        { type: "input", prompt: "Find the MEDIAN of [12, 2, 9, 5, 100]:", answer: "9", hint: "Sort them first: 2, 5, 9, 12, 100. Pick the middle!", whyEasy: "Sorted: 2, 5, [9], 12, 100 → Median = 9!" },
        { type: "input", prompt: "Find the MEAN (average) of [10, 14, 16, 20]:", answer: "15", hint: "Add all 4, divide by 4.", whyEasy: "60 ÷ 4 = 15!" },
        { type: "input", prompt: "Test mean = 75, σ = 5. You scored 85. What is your z-score?", answer: "2", hint: "(85 − 75) ÷ 5.", whyEasy: "10 ÷ 5 = +2 standard deviations above average!" },
        { type: "mc", prompt: "In a normal bell curve, roughly what % of data lies within 1 standard deviation (±1σ)?", options: ["50%", "68%", "95%", "99.7%"], answer: "68%", hint: "68–95–99.7 rule!", whyEasy: "68% within ±1σ, 95% within ±2σ, 99.7% within ±3σ!" },
        { type: "mc", prompt: "A billionaire walks into a coffee shop. Which stat jumps wildly?", options: ["Mean income", "Median income", "Mode income", "None change"], answer: "Mean income", hint: "Total divided by count skyrockets; the middle person doesn't change!", whyEasy: "Mean gets pulled by extreme outliers; Median barely moves!" }
      ]
    },

    // ==================== ERA 5: COLLEGE MATH (8 NODES) ====================
    {
      id: "limits-potholes",
      worldId: "college",
      order: 29,
      title: "Limits = Approaching a Pothole",
      icon: "🕳️",
      tagline: "We don't care what happens AT x = 2 — we care where BOTH sides of the road meet!",
      scaryVersion: "Epsilon-delta topological convergence of real-valued functions.",
      easyTruth: "Imagine walking toward a missing bridge plank from both the left and the right: a limit asks what height BOTH sides aim at! If both sides aim at different heights, the two-sided limit Does Not Exist (DNE).",
      microSteps: [
        { label: "Step 1: Plug In First & Check Both Sides", text: "No zero in the denominator? Just plug x in! For piecewise jumps, check Left and Right separately — a two-sided limit exists ONLY when Left Limit = Right Limit." },
        { label: "Step 2: Hit 0/0? Factor & Cancel the Pothole!", text: "0/0 means a removable pinhole! Factor (x² − 4)/(x − 2) → (x − 2)(x + 2)/(x − 2), cancel the (x − 2) hole, then plug x = 2 into (x + 2) → 4!" },
        { label: "Step 3: At x → ∞, Only Giants Survive", text: "1/x shrinks toward 0 as x grows huge. For rational functions like (6x² + 5x + 1)/(2x² − 9), small terms don't matter at ∞ — just divide the highest-power leaders: 6x²/2x² = 3!" }
      ],
      cheatCode: "1) Plug in (Left must equal Right!). 2) 0/0 → Factor & cancel hole. 3) x → ∞ → Keep highest powers only!",
      visualizerId: "calculusSurferLab",
      questions: [
        { type: "input", prompt: "lim(x → 4) of (3x − 2) =", answer: "10", hint: "No division by zero — plug x = 4 straight into 3x − 2.", whyEasy: "Continuous line with no holes: 3(4) − 2 = 10!" },
        { type: "input", prompt: "lim(x → 2) of (x² − 4)/(x − 2) =", answer: "4", hint: "0/0 pothole! Factor top as (x − 2)(x + 2), cancel (x − 2), then plug in 2.", whyEasy: "Canceling (x − 2) leaves x + 2 → plugging x = 2 gives 4!" },
        { type: "input", prompt: "As x → ∞, what does 1/x approach?", answer: "0", hint: "Slice 1 pizza among a billion people — each crumb approaches what size?", whyEasy: "Dividing a constant by a limitless denominator shrinks cleanly to 0!" },
        { type: "input", prompt: "lim(x → ∞) of (6x² + 5x + 1)/(2x² − 9) =", answer: "3", hint: "At infinity, ignore lower terms and divide the lead x² terms: 6x² ÷ 2x².", whyEasy: "Highest powers tie at x², so the limit equals the ratio of leading coefficients: 6/2 = 3!" },
        { type: "mc", prompt: "Left side approaches 5, right side approaches 8. Two-sided limit?", options: ["5", "8", "6.5", "Does Not Exist (DNE)"], answer: "Does Not Exist (DNE)", hint: "Do both sides of the bridge meet at one shared height?", whyEasy: "5 ≠ 8 (a jump break), so the two-sided limit Does Not Exist (DNE)!" }
      ]
    },
    {
      id: "derivatives-speedometer",
      worldId: "college",
      order: 30,
      title: "Derivatives = Speedometer & Power Rule",
      icon: "🏎️",
      tagline: "Drop the exponent down in front, subtract 1! Constants have 0 slope.",
      scaryVersion: "Instantaneous rate of change via limit of difference quotients.",
      easyTruth: "If f(x) tracks where you are, f'(x) is your car's speedometer — the instantaneous slope right at x! Flat numbers never move (slope = 0), and turning points (peaks/valleys) always pause at slope f'(x) = 0.",
      microSteps: [
        { label: "Step 1: Why Constants Always Become 0", text: "A standalone constant like 7, π³, or 5² (= 25) graphs as a totally flat horizontal line — zero rise means zero rate of change, so its derivative is ALWAYS 0!" },
        { label: "Step 2: Power Rule & Peaks/Valleys", text: "d/dx[c·x^n] = c·n·x^(n−1): drop the exponent down to multiply, then shrink it by 1 (3x² → 6x, 5x → 5). To locate a parabola's valley, set f'(x) = 0!" },
        { label: "Step 3: The 4 VIP Derivatives", text: "eˣ grows at a rate equal to its own height → d/dx[eˣ] = eˣ! Meanwhile d/dx[ln x] = 1/x (flattens as x grows), and waves cycle: d/dx[sin x] = cos x, d/dx[cos x] = −sin x." }
      ],
      cheatCode: "Power Rule: drop n down, subtract 1! Constants → 0. VIPs: (eˣ)' = eˣ, (ln x)' = 1/x, (sin)' = cos, (cos)' = −sin.",
      visualizerId: "calculusSurferLab",
      questions: [
        { type: "mc", prompt: "Power Rule: d/dx [ x⁴ ] =", options: ["4x³", "x³", "4x⁴", "3x⁴"], answer: "4x³", hint: "Drop the exponent 4 in front, then reduce the exponent 4 − 1 = 3.", whyEasy: "Power Rule gives 4·x^(4−1) = 4x³!" },
        { type: "input", prompt: "TRAP! d/dx [ 5² ] =", answer: "0", hint: "Look closely — is there any x inside 5²? It's just the fixed constant 25!", whyEasy: "5² = 25 is a flat constant with zero change, so its derivative is 0 (NOT 2·5)!" },
        { type: "mc", prompt: "d/dx [ 3x² + 5x − 9 ] =", options: ["6x + 5", "3x + 5", "6x² + 5", "6x − 9"], answer: "6x + 5", hint: "Differentiate term by term: 3(2x) + 5(1) − 0.", whyEasy: "3x² → 6x, 5x → 5, and constant −9 drops to 0 → 6x + 5!" },
        { type: "mc", prompt: "What is d/dx [ eˣ + ln(x) ]?", options: ["eˣ + 1/x", "x·eˣ⁻¹ + 1/x", "eˣ + ln(x)", "1 + 1/x"], answer: "eˣ + 1/x", hint: "Use the two VIP rules: eˣ stays itself and ln(x) becomes 1/x.", whyEasy: "eˣ is its own derivative and (ln x)' = 1/x → eˣ + 1/x!" },
        { type: "input", prompt: "At what x does f(x) = x² − 8x + 1 hit its valley (f'(x) = 0)?", answer: "4", hint: "Find derivative f'(x) = 2x − 8 and set it equal to 0!", whyEasy: "Valley slope is flat (0): 2x − 8 = 0 → x = 4!" }
      ]
    },
    {
      id: "chain-product-optimization",
      worldId: "college",
      order: 31,
      title: "Product, Chain Rule & Optimization",
      icon: "🔗",
      tagline: "Chain Rule = peel the onion (outside' × inside'). Optimization = f'(x) = 0 + concavity check!",
      scaryVersion: "Leibniz differential composition rules and Fermat stationary-point optimization.",
      easyTruth: "When one function is wrapped inside another like (2x + 1)³, differentiate the outer shell while freezing the inside, then multiply by the inside's derivative! And to optimize (maximize/minimize), find flat slope f'(x) = 0 and check whether the curve smiles (Min) or frowns (Max)!",
      microSteps: [
        { label: "Step 1: Product Rule (Take Turns!)", text: "(f · g)' = f'g + fg'. Never multiply derivatives directly — differentiate the first while the second waits, PLUS first waits while second differentiates!" },
        { label: "Step 2: Chain Rule (Peel the Onion)", text: "d/dx[(3x + 1)⁵] = 5(3x + 1)⁴ · (3) = 15(3x + 1)⁴! Always multiply by the derivative of the inner expression." },
        { label: "Step 3: Optimization & 2nd Derivative Test", text: "Set f'(x) = 0 to locate turning points. Then check concavity with f''(x): f''(x) < 0 curves downward like an umbrella/frown ☂️ (Local MAX!); f''(x) > 0 curves upward like a bowl/smile (Local MIN!)." }
      ],
      cheatCode: "Chain: (outside')·(inside'). Product: f'g + fg'. Optimize: f'(x) = 0; f'' < 0 = MAX (umbrella), f'' > 0 = MIN (bowl)!",
      visualizerId: "calculusSurferLab",
      questions: [
        { type: "mc", prompt: "Chain Rule: d/dx [ (2x + 1)³ ] =", options: ["3(2x + 1)²", "6(2x + 1)²", "2(2x + 1)²", "(2x + 1)²"], answer: "6(2x + 1)²", hint: "Outer derivative 3(2x + 1)² multiplied by inner derivative d/dx[2x + 1] = 2.", whyEasy: "Outer 3(2x + 1)² × inner 2 = 6(2x + 1)²!" },
        { type: "mc", prompt: "Chain Rule: d/dx [ e^(5x) ] =", options: ["e^(5x)", "5e^(5x)", "5xe^(4x)", "e^5"], answer: "5e^(5x)", hint: "Outer e^(5x) stays intact, then multiply by inner derivative of 5x (= 5).", whyEasy: "Outer e^(5x) × inner 5 = 5e^(5x)!" },
        { type: "mc", prompt: "Product Rule for x · sin(x) gives:", options: ["cos(x)", "1·sin(x) + x·cos(x)", "x·sin(x)", "sin(x) − x·cos(x)"], answer: "1·sin(x) + x·cos(x)", hint: "Take turns with f'g + fg' where f = x and g = sin(x).", whyEasy: "(x)'·sin(x) + x·(sin x)' = 1·sin(x) + x·cos(x)!" },
        { type: "input", prompt: "Profit P(x) = −x² + 12x − 10. How many units x maximizes profit (P'(x) = 0)?", answer: "6", hint: "Take derivative P'(x) = −2x + 12 and solve P'(x) = 0.", whyEasy: "−2x + 12 = 0 → x = 6 units (and P'' = −2 < 0 confirms it's a Max)!" },
        { type: "mc", prompt: "If f''(x) < 0 (concave down like an umbrella ☂️) at f'(x)=0, is it a MAX or MIN?", options: ["Local MAXIMUM", "Local MINIMUM", "Vertical asymptote", "Zero"], answer: "Local MAXIMUM", hint: "Picture a downward-curving arch — a flat tangent sits at the very top peak!", whyEasy: "Concave down (f'' < 0) forms a peak → Local MAXIMUM!" }
      ]
    },
    {
      id: "integrals-area",
      worldId: "college",
      order: 32,
      title: "Integrals ∫ (Reverse Power Rule & Area)",
      icon: "🌊",
      tagline: "ADD 1 to the exponent and DIVIDE! Magically finds exact area under ANY curve.",
      scaryVersion: "Riemannian definite quadrature and Fundamental Theorem antiderivative inversion.",
      easyTruth: "Integration runs the derivative machine in reverse — and by the Fundamental Theorem of Calculus, subtracting the antiderivative at the top and bottom bounds F(b) − F(a) adds up infinitely thin vertical strips into the exact area!",
      microSteps: [
        { label: "Step 1: Reverse Power Rule & Why + C Exists", text: "∫ xⁿ dx = x^(n+1)/(n+1) + C (for n ≠ −1). We ALWAYS write '+ C' on indefinite integrals because any constant vanishes when differentiating back (x³ + 7 and x³ − 99 both differentiate to 3x²)!" },
        { label: "Step 2: Definite Area = F(top) − F(bottom)", text: "To compute area under y = 3x² from 0 to 2, find F(x) = x³, then subtract upper minus lower: F(2) − F(0) = 2³ − 0³ = 8!" },
        { label: "Step 3: u-Substitution (Reverse Chain Rule)", text: "Spot a nested piece AND its derivative beside it, like ∫ 2x(x² + 1)³ dx? Set u = x² + 1 so du = 2x dx eats the 2x → easy ∫ u³ du = u⁴/4 + C!" }
      ],
      cheatCode: "∫ xⁿ dx = x^(n+1)/(n+1) + C. Definite area = F(top) − F(bottom). u-sub undoes the Chain Rule!",
      visualizerId: "calculusSurferLab",
      questions: [
        { type: "mc", prompt: "Find ∫ 3x² dx:", options: ["6x + C", "x³ + C", "3x³ + C", "x² + C"], answer: "x³ + C", hint: "Raise exponent 2 → 3 and divide by 3: 3x³/3 + C.", whyEasy: "3x³/3 + C = x³ + C (check backwards: d/dx[x³ + C] = 3x²)!" },
        { type: "input", prompt: "Area under y = 2x from x = 0 to x = 3 (∫₀³ 2x dx):", answer: "9", hint: "Antiderivative is F(x) = x²; evaluate F(3) − F(0).", whyEasy: "3² − 0² = 9 (which matches the triangle area ½ · base 3 · height 6 = 9)!" },
        { type: "mc", prompt: "Find ∫ x³ dx:", options: ["3x² + C", "x⁴/4 + C", "4x⁴ + C", "x⁴ + C"], answer: "x⁴/4 + C", hint: "Add 1 to the exponent (3 → 4), divide by that new 4, and add + C.", whyEasy: "Reverse Power Rule gives x⁴/4 + C (derivative brings 4 down to cancel /4)!" },
        { type: "input", prompt: "Compute ∫₁⁴ 5 dx:", answer: "15", hint: "Antiderivative of 5 is 5x → compute 5(4) − 5(1) (a rectangle of width 3, height 5!).", whyEasy: "5(4) − 5(1) = 20 − 5 = 15 (width 3 × height 5)!" },
        { type: "mc", prompt: "Using u-substitution on ∫ 2x(x² + 1)³ dx (let u = x² + 1):", options: ["(x² + 1)⁴ / 4 + C", "6(x² + 1)² + C", "(x² + 1)⁴ + C", "2x⁴ / 4 + C"], answer: "(x² + 1)⁴ / 4 + C", hint: "Since du = 2x dx replaces 2x dx completely, integrate ∫ u³ du!", whyEasy: "∫ u³ du = u⁴/4 + C = (x² + 1)⁴/4 + C!" }
      ]
    },
    {
      id: "calc3-partials-ode",
      worldId: "college",
      order: 33,
      title: "Calc III Partials (∂f/∂x) & Diff Eq (ODEs)",
      icon: "🏔️",
      tagline: "Calc III: freeze other letters like a constant! ODEs: solve for a mystery function!",
      scaryVersion: "Multivariable partial differential gradients and separable first-order ODEs.",
      easyTruth: "Partial derivative ∂f/∂x of x²y³ sounds terrifying until you learn the rule: pretend y is literally the number 5 (a frozen constant) and differentiate x normally! And Differential Equations just ask: 'Whose derivative equals itself? eˣ!'",
      microSteps: [
        { label: "Step 1: Partial Derivative ∂/∂x", text: "In f(x, y) = x³ + 5xy + y⁴, taking ∂f/∂x freezes y! So x³ → 3x², 5xy → 5y, and y⁴ (no x!) → 0!" },
        { label: "Step 2: Gradient ∇f = Uphill Compass", text: "∇f = [∂f/∂x, ∂f/∂y] always points in the STEEPEST uphill direction (how AI neural networks climb/descend!)." },
        { label: "Step 3: ODEs (dy/dx = ky)", text: "Algebra solves for a number x. Diff Eq solves for a function y(x)! Whenever growth rate is proportional to size (dy/dx = ky), the answer is ALWAYS y = C·e^(kx)!" }
      ],
      cheatCode: "For ∂f/∂x, freeze every other variable as a constant! For dy/dx = ky, solution is y = C·e^(kx)!",
      visualizerId: "calculusSurferLab",
      questions: [
        { type: "mc", prompt: "If f(x, y) = x²y + 7y³, what is ∂f/∂x (freeze y!)?", options: ["2xy", "2xy + 21y²", "x² + 21y²", "2x + 7y³"], answer: "2xy", hint: "7y³ has NO x, so it acts like a constant → 0!", whyEasy: "∂/∂x[x²y] = 2xy, and 7y³ vanishes to 0!" },
        { type: "mc", prompt: "Now find ∂f/∂y of f(x, y) = x² + 5xy + y⁴ (freeze x!):", options: ["2x + 5y", "5x + 4y³", "2x + 5y + 4y³", "5x"], answer: "5x + 4y³", hint: "x² has no y (→0), 5xy has slope 5x, y⁴ → 4y³.", whyEasy: "0 + 5x + 4y³ = 5x + 4y³!" },
        { type: "mc", prompt: "Which function satisfies the differential equation dy/dx = 3y?", options: ["y = 3x", "y = x³", "y = C·e^(3x)", "y = 3 ln(x)"], answer: "y = C·e^(3x)", hint: "Check whose derivative is 3 times itself!", whyEasy: "d/dx[C·e^(3x)] = 3·C·e^(3x) = 3y!" },
        { type: "mc", prompt: "In population ODE dP/dt = P(100 − P), at what population P does growth STOP (dP/dt = 0)?", options: ["P = 50", "P = 0 or P = 100", "P = 1", "Never"], answer: "P = 0 or P = 100", hint: "Set P(100 − P) = 0!", whyEasy: "Either 0 critters or max capacity 100 → dP/dt = 0!" },
        { type: "mc", prompt: "What direction does the Gradient vector ∇f point on a mountain?", options: ["Flat sideways", "Steepest uphill", "Straight down", "Randomly"], answer: "Steepest uphill", hint: "AI Gradient Descent walks the opposite (−∇f) to go downhill!", whyEasy: "+∇f points steepest uphill; −∇f (Gradient Descent) walks steepest downhill!" }
      ]
    },
    {
      id: "linear-algebra-vectors",
      worldId: "college",
      order: 34,
      title: "Linear Algebra: Vectors, Matrices & Eigen",
      icon: "🧭",
      tagline: "Vectors = arrows. Dot product = alignment. Matrix = space stretcher. Av = λv!",
      scaryVersion: "Finite-dimensional vector spaces, determinants & spectral eigendecomposition.",
      easyTruth: "A vector [3, 4] is an arrow (3 right, 4 up). A matrix stretches or rotates the entire grid (determinant ad − bc = area scale factor). An eigenvector is a stubborn arrow that stays on its own line and only stretches by λ (Av = λv)!",
      microSteps: [
        { label: "Step 1: Vector Addition & Dot Product Alignment", text: "Add vectors component-by-component: [2, 3] + [5, −1] = [7, 2]. Dot product multiplies matching slots and sums them: [a, b]·[c, d] = ac + bd. If Dot = 0, the arrows have zero alignment → perpendicular (90°)!" },
        { label: "Step 2: 2×2 Determinant = Area Scale Factor", text: "For [[a, b], [c, d]], det = ad − bc measures how much area the matrix stretches by. If det = 0, the matrix squashes 2D space flat onto a line, so it CANNOT be inverted!" },
        { label: "Step 3: Eigenvalues & Eigenvectors (Av = λv)", text: "Most arrows get rotated off their line when multiplied by matrix A. Special eigenvectors stay pointed along the exact same line and merely scale by eigenvalue λ!" }
      ],
      cheatCode: "Dot = ac + bd (0 → 90°). 2×2 det = ad − bc (0 = no inverse!). Eigen: Av = λv.",
      visualizerId: "geometryLogicLab",
      questions: [
        { type: "mc", prompt: "Add vectors: [2, 3] + [5, −1] =", options: ["[7, 2]", "[7, 4]", "[10, −3]", "[3, 4]"], answer: "[7, 2]", hint: "Add x with x (2 + 5) and y with y (3 + (−1)).", whyEasy: "[2 + 5, 3 − 1] = [7, 2] — slot-by-slot addition!" },
        { type: "input", prompt: "Dot product: [2, 3] · [4, 5] =", answer: "23", hint: "Multiply matching slots (2×4) and (3×5), then add those two products.", whyEasy: "(2 × 4) + (3 × 5) = 8 + 15 = 23!" },
        { type: "mc", prompt: "Dot product = 0 means two nonzero vectors are at:", options: ["0°", "45°", "90° (perpendicular)", "180°"], answer: "90° (perpendicular)", hint: "Since u·v = |u||v|cos θ, cos θ = 0 occurs at what angle?", whyEasy: "cos(90°) = 0, so zero dot product guarantees a 90° right angle!" },
        { type: "input", prompt: "2×2 Determinant of [[3, 1], [2, 4]] (ad − bc):", answer: "10", hint: "Main diagonal (3 × 4) minus anti-diagonal (1 × 2).", whyEasy: "ad − bc = (3 × 4) − (1 × 2) = 12 − 2 = 10!" },
        { type: "mc", prompt: "If A·v = 5v for a nonzero vector v, what is the eigenvalue λ?", options: ["0", "5", "1/5", "Undefined"], answer: "5", hint: "Match directly against Av = λv!", whyEasy: "Matrix A simply scaled v by factor λ = 5 without rotating it!" }
      ]
    },
    {
      id: "discrete-logic-mod",
      worldId: "college",
      order: 35,
      title: "Discrete Math: Clock Mod, Logic & Big-O",
      icon: "💻",
      tagline: "The math of Computer Science: clock remainders (mod), truth logic & algorithm speed!",
      scaryVersion: "Modular congruence rings, propositional Boolean logic & asymptotic complexity.",
      easyTruth: "15 mod 12 isn't scary — it's just a 12-hour clock! 3 hours past noon (15:00) reads 3 o'clock! Modulo = 'give me the remainder after dividing'.",
      microSteps: [
        { label: "Step 1: Modulo = Remainder Clock", text: "17 mod 5 = 2 (because 17 = 3×5 + remainder 2). Cryptography & even/odd (n mod 2) run on this!" },
        { label: "Step 2: Logic Flip (Contrapositive)", text: "'If it rains, the ground is wet.' Guaranteed true twin: 'If ground is NOT wet, it did NOT rain!' (Flip & negate both!)" },
        { label: "Step 3: Big-O Speed Ladder", text: "O(1) instant < O(log n) dictionary search < O(n) scan < O(n²) nested loop < O(2ⁿ) explosion!" }
      ],
      cheatCode: "a mod b = remainder of a ÷ b. 'If P→Q' equals 'If not Q→not P'.",
      visualizerId: "numberPatternSieve",
      questions: [
        { type: "input", prompt: "Clock math! What is 17 mod 5 (remainder when 17 is divided by 5)?", answer: "2", hint: "5 fits 3 times (15). What's left?", whyEasy: "17 = 3×5 + 2 → 17 mod 5 = 2!" },
        { type: "input", prompt: "If it's 10:00 on a 12-hour clock, what time is it 5 hours later? ((10 + 5) mod 12)", answer: "3", hint: "15 mod 12.", whyEasy: "15 − 12 = 3 o'clock!" },
        { type: "mc", prompt: "Which Big-O runtime is FASTEST for 1,000,000 items?", options: ["O(n²)", "O(n)", "O(log n)", "O(2ⁿ)"], answer: "O(log n)", hint: "Binary search cuts 1,000,000 in half only ~20 times!", whyEasy: "log₂(1,000,000) ≈ 20 steps vs 1,000,000 or 1,000,000,000,000!" },
        { type: "mc", prompt: "If 'All MathLingo users pass Grade 12' is true, what MUST also be true?", options: ["If someone passed, they used MathLingo", "If someone didn't pass, they didn't use MathLingo", "Nobody fails", "Math is hard"], answer: "If someone didn't pass, they didn't use MathLingo", hint: "Contrapositive: flip & negate both!", whyEasy: "P → Q always guarantees (not Q) → (not P)!" },
        { type: "input", prompt: "In binary (base-2: 8, 4, 2, 1 slots), what decimal number is 1011?", answer: "11", hint: "1×8 + 0×4 + 1×2 + 1×1.", whyEasy: "8 + 0 + 2 + 1 = 11!" }
      ]
    },
    {
      id: "probability-bayes",
      worldId: "college",
      order: 36,
      title: "Probability, E[X] & Bayes' Intuition",
      icon: "🎲",
      tagline: "Odds = Win ÷ Total. 'At least one' = 1 − P(none). Plus Expected Value E[X]!",
      scaryVersion: "Kolmogorov measure-theoretic probability, expectation & Bayesian conditioning.",
      easyTruth: "Independent AND events multiply; 'at least one' is always easiest backwards (1 − P(none)); Expected Value E[X] is the long-run average payout per play; and Bayes warns us never to ignore base rates!",
      microSteps: [
        { label: "Step 1: AND Multiplies, 'At Least One' Flips, & nCr Combos", text: "Two heads in a row: 1/2 × 1/2 = 1/4. 'At least one 6' on 2 dice = 1 − P(no 6s) = 1 − (5/6)² = 11/36! Choosing r items where order doesn't matter uses nCr = n!/(r!(n−r)!) — e.g. 5 choose 2 = (5×4)/2 = 10." },
        { label: "Step 2: Expected Value E[X] = Weighted Average", text: "Multiply each outcome by its probability and add! A coin paying $10 on Heads and $0 on Tails has E[X] = 0.5($10) + 0.5($0) = $5 average per flip." },
        { label: "Step 3: Bayes' Theorem = Base Rates Matter!", text: "Testing 10,000 people for a 1-in-10,000 rare condition with a 1% false-positive rate produces ~100 false alarms for every 1 true case — so most positive tests are false alarms!" }
      ],
      cheatCode: "'At least one' = 1 − P(None). E[X] = Σ(payout × prob). nCr = (slots)/r!. Bayes: compare true hits vs ALL positives!",
      visualizerId: "fractionPizzaLab",
      questions: [
        { type: "mc", prompt: "Flip two fair coins. Chance of Heads AND Heads?", options: ["1/2", "1/3", "1/4", "3/4"], answer: "1/4", hint: "Independent events multiply: (1/2) × (1/2).", whyEasy: "Half of a half = 1/4 (1 outcome HH out of 4 equally likely pairs: HH, HT, TH, TT)!" },
        { type: "mc", prompt: "Chance of 'at least one 6' on 2 dice?", options: ["11/36", "25/36", "2/6", "1/36"], answer: "11/36", hint: "Flip it: find P(NO 6s on either die) = (5/6) × (5/6) = 25/36, then subtract from 1!", whyEasy: "1 − 25/36 = 11/36 — far easier than listing all 11 winning rolls!" },
        { type: "input", prompt: "Game pays $20 with 1/4 chance and $0 otherwise. Expected Value E[X] in $?", answer: "5", hint: "Multiply each payout by its chance: 20 × (1/4) + 0 × (3/4).", whyEasy: "20 × (1/4) = $5 average payout per play over the long run!" },
        { type: "input", prompt: "Ways to choose 2 toppings from 5 (5×4 ÷ 2):", answer: "10", hint: "Order doesn't matter (pepperoni + mushroom = mushroom + pepperoni), so use ₅C₂ = (5 × 4) ÷ 2.", whyEasy: "5 × 4 = 20 ordered pairs, divided by 2! duplicate orders = 10 unique combos!" },
        { type: "mc", prompt: "Why can a 99% accurate test on a 1-in-10,000 rare disease mostly be a false alarm?", options: [
          "So many healthy people generate 1% false positives",
          "99% + 1% = 100%",
          "Probability adds instead of multiplies",
          "Impossible"
        ], answer: "So many healthy people generate 1% false positives", hint: "Compare 1 sick person vs 1% of 9,999 healthy people (~100 false alarms)!", whyEasy: "Bayes' Theorem: 100 false positives outnumber 1 true positive by 100-to-1!" }
      ]
    }
  ];

  // ==================== GRADE 12 TRAPS (15) ====================
  const GRADE12_TRAPS = [
    {
      id: "trap-1",
      title: "Trap #1: (a + b)² ≠ a² + b²",
      trapExpression: "(x + 5)²",
      wrongGuess: "x² + 25",
      rightAnswer: "x² + 10x + 25",
      whyItHappens: "Exponents do NOT distribute across + or −! Think of a square of side (x + 5): it has x², 25, AND two 5x strips!",
      quickRule: "Always write (a + b)(a + b), or square first + DOUBLE the product + square last.",
      quiz: { prompt: "Expand (x + 4)²:", options: ["x² + 16", "x² + 8x + 16", "x² + 4x + 16", "2x + 8"], answer: "x² + 8x + 16", explanation: "(x + 4)(x + 4) = x² + 8x + 16." }
    },
    {
      id: "trap-2",
      title: "Trap #2: −3² vs (−3)²",
      trapExpression: "−3²",
      wrongGuess: "+9",
      rightAnswer: "−9",
      whyItHappens: "An exponent only hugs what touches its left shoulder. In −3², it hugs 3 (giving 9), then the minus applies: −9.",
      quickRule: "No parentheses around the negative? Minus applies AFTER the power.",
      quiz: { prompt: "What is −4² + (−4)²?", options: ["32", "0", "−32", "16"], answer: "0", explanation: "−16 + 16 = 0!" }
    },
    {
      id: "trap-3",
      title: "Trap #3: Illegal Fraction Canceling",
      trapExpression: "(x + 5) / x",
      wrongGuess: "5 or 6",
      rightAnswer: "Cannot cancel x!",
      whyItHappens: "Plus signs are GLUE! You can only cancel factors multiplied across the entire top and bottom.",
      quickRule: "Test x = 2: (2+5)/2 = 3.5 ≠ 5! Factor first before canceling.",
      quiz: { prompt: "Which fraction CAN legally cancel x?", options: ["(x + 3) / x", "(x² + x) / x", "(x + 4) / (x + 2)", "1 / (x + 1)"], answer: "(x² + x) / x", explanation: "Factor x out: x(x + 1)/x = x + 1!" }
    },
    {
      id: "trap-4",
      title: "Trap #4: Negative Exponents Aren't Negative Numbers",
      trapExpression: "2⁻³",
      wrongGuess: "−8 or −6",
      rightAnswer: "1/8",
      whyItHappens: "A negative exponent is a subway ticket across the fraction bar, NOT a minus sign on the value!",
      quickRule: "a⁻ⁿ = 1 / aⁿ. Flip across the fraction bar, make exponent positive.",
      quiz: { prompt: "What is 3⁻²?", options: ["−9", "−6", "1/9", "1/6"], answer: "1/9", explanation: "3⁻² = 1/3² = 1/9." }
    },
    {
      id: "trap-5",
      title: "Trap #5: Fractional Powers (Root on Bottom!)",
      trapExpression: "27^(2/3)",
      wrongGuess: "18",
      rightAnswer: "9",
      whyItHappens: "Just like a plant, ROOTS live on the BOTTOM! 27^(2/3) = (∛27)².",
      quickRule: "Bottom = Root, Top = Power. Take the root FIRST!",
      quiz: { prompt: "Compute 16^(3/2):", options: ["24", "64", "8", "32"], answer: "64", explanation: "√16 = 4, then 4³ = 64!" }
    },
    {
      id: "trap-6",
      title: "Trap #6: Dividing by a Fraction Makes It BIGGER",
      trapExpression: "8 ÷ (1/4)",
      wrongGuess: "2",
      rightAnswer: "32",
      whyItHappens: "You're asking 'How many QUARTER slices fit inside 8 whole pizzas?'",
      quickRule: "Keep-Change-Flip: a ÷ (b/c) = a × (c/b).",
      quiz: { prompt: "What is 10 ÷ (1/2)?", options: ["5", "20", "1/5", "12"], answer: "20", explanation: "10 × 2 = 20!" }
    },
    {
      id: "trap-7",
      title: "Trap #7: Subtracting a Whole Bracket",
      trapExpression: "10 − (x − 3)",
      wrongGuess: "7 − x",
      rightAnswer: "13 − x",
      whyItHappens: "The minus outside distributes to EVERY term inside: −(x) and −(−3) = +3!",
      quickRule: "Distribute −1 to every term inside parentheses.",
      quiz: { prompt: "Simplify: 8 − (2x − 5)", options: ["3 − 2x", "13 − 2x", "3 + 2x", "13 + 2x"], answer: "13 − 2x", explanation: "8 − 2x + 5 = 13 − 2x!" }
    },
    {
      id: "trap-8",
      title: "Trap #8: √(Sum) ≠ Sum of Roots",
      trapExpression: "√(9 + 16)",
      wrongGuess: "3 + 4 = 7",
      rightAnswer: "√25 = 5",
      whyItHappens: "Combine everything under the √ roof BEFORE taking the root!",
      quickRule: "√(a + b) ≠ √a + √b. Only ×/÷ splits cleanly under √.",
      quiz: { prompt: "What is √(36 + 64)?", options: ["14", "10", "48", "100"], answer: "10", explanation: "√100 = 10!" }
    },
    {
      id: "trap-9",
      title: "Trap #9: Logarithm Fake Rule",
      trapExpression: "log(A + B)",
      wrongGuess: "log(A) + log(B)",
      rightAnswer: "Cannot split log(A + B)!",
      whyItHappens: "log(A) + log(B) = log(A · B) — multiplication inside, NOT addition!",
      quickRule: "Inside log: × splits to +, ÷ splits to −, + does NOTHING!",
      quiz: { prompt: "Which log identity is TRUE?", options: ["log(x + y) = log(x) + log(y)", "log(x²) = 2·log(x)", "log(x)/log(y) = log(x − y)", "log(0) = 1"], answer: "log(x²) = 2·log(x)", explanation: "Exponents jump to the front!" }
    },
    {
      id: "trap-10",
      title: "Trap #10: Inequality Flip on Negative × / ÷",
      trapExpression: "−3x ≥ 12",
      wrongGuess: "x ≥ −4",
      rightAnswer: "x ≤ −4",
      whyItHappens: "Multiplying or dividing by a negative mirrors the number line, reversing order!",
      quickRule: "Negative × or ÷ across an inequality? FLIP < / >!",
      quiz: { prompt: "Solve: −5x < 20", options: ["x < −4", "x > −4", "x < 4", "x > 4"], answer: "x > −4", explanation: "Dividing by −5 flips '<' to '>'!" }
    },
    {
      id: "trap-11",
      title: "Trap #11: Zero on Top vs. Zero on Bottom",
      trapExpression: "0 / 5  vs  5 / 0",
      wrongGuess: "Both are 0",
      rightAnswer: "0 / 5 = 0, but 5 / 0 is Undefined",
      whyItHappens: "0 pizzas for 5 friends = 0 each. 5 pizzas for 0 people = meaningless explosion!",
      quickRule: "'Under is Undefined!' Zero in denominator is illegal.",
      quiz: { prompt: "Evaluate (0 / 9) + 1:", options: ["0", "1", "Undefined", "9"], answer: "1", explanation: "0/9 = 0, then 0 + 1 = 1!" }
    },
    {
      id: "trap-12",
      title: "Trap #12: Flip the Operation, NOT Always the Sign!",
      trapExpression: "−2x = 10",
      wrongGuess: "x = 12 (adding +2)",
      rightAnswer: "x = −5 (dividing by −2)",
      whyItHappens: "−2 is multiplied by x, not subtracted from x! Undo × with ÷.",
      quickRule: "Ask 'How is it glued to x?' Undo + with −, undo × with ÷.",
      quiz: { prompt: "Solve −4x = 24:", options: ["x = 28", "x = 20", "x = −6", "x = 6"], answer: "x = −6", explanation: "24 ÷ (−4) = −6!" }
    },
    {
      id: "trap-13",
      title: "Trap #13: f(x + 2) ≠ f(x) + 2",
      trapExpression: "If f(x) = x², find f(x + 2)",
      wrongGuess: "x² + 2",
      rightAnswer: "(x + 2)² = x² + 4x + 4",
      whyItHappens: "Whatever sits in f(...) replaces the ENTIRE letter x everywhere.",
      quickRule: "Swap x for ( ☐ ) first, then drop the input inside.",
      quiz: { prompt: "If f(x) = x² − 1, find f(x + 1):", options: ["x²", "x² + 2x", "x² + 1", "x² − 2"], answer: "x² + 2x", explanation: "(x + 1)² − 1 = x² + 2x!" }
    },
    {
      id: "trap-14",
      title: "Trap #14: Trig Doesn't Distribute & RAD/DEG Mode!",
      trapExpression: "sin(30° + 60°)",
      wrongGuess: "sin(30°) + sin(60°)",
      rightAnswer: "sin(90°) = 1",
      whyItHappens: "sin(x) isn't multiplication! Combine inside angles first, and check RAD vs DEG mode.",
      quickRule: "Never distribute sin, cos, log, or √ over addition.",
      quiz: { prompt: "What is sin(30°) + sin(30°)?", options: ["sin(60°)", "1", "0", "2"], answer: "1", explanation: "0.5 + 0.5 = 1!" }
    },
    {
      id: "trap-15",
      title: "Trap #15: Derivative Constants & Chain Rule",
      trapExpression: "d/dx [ (3x + 1)² ] & d/dx [ π³ ]",
      wrongGuess: "2(3x + 1) & 3π²",
      rightAnswer: "6(3x + 1) & 0",
      whyItHappens: "π³ has no x so derivative is 0! And (3x+1)² needs inner speed × 3!",
      quickRule: "No x? Derivative = 0. Nested function? Multiply by inside derivative!",
      quiz: { prompt: "What is d/dx [ 4³ + x³ ]?", options: ["48 + 3x²", "3x²", "12 + 3x²", "3x³"], answer: "3x²", explanation: "4³ is constant 64 → derivative 0!" }
    }
  ];

  // ==================== 9-QUESTION CRACK FINDER DIAGNOSTIC ====================
  const DIAGNOSTIC_QUESTIONS = [
    {
      id: "diag-1",
      eraId: "nursery",
      targetNodeId: "even-odd-skip",
      topicLabel: "Even/Odd & Mental Gaps",
      prompt: "Quick check! Without dividing, is 4,827 even or odd, AND what is 100 − 67?",
      options: ["Odd & 33", "Even & 33", "Odd & 43", "Even & 43"],
      answer: "Odd & 33",
      whyItMatters: "Instant number-sense & Make-10 complements kill silly arithmetic slips under test pressure."
    },
    {
      id: "diag-2",
      eraId: "elementary",
      targetNodeId: "rect-multiplication",
      topicLabel: "Times Tables & Primes",
      prompt: "Quick reflex! What is 7 × 8, and is 2 a prime number?",
      options: ["56 & Yes", "54 & Yes", "56 & No", "48 & No"],
      answer: "56 & Yes",
      whyItMatters: "Instant tables + prime intuition make factoring Grade 12 quadratics 5× faster."
    },
    {
      id: "diag-3",
      eraId: "elementary",
      targetNodeId: "fractions-trenchcoat",
      topicLabel: "Fraction Operations",
      prompt: "Honest check — solve 1/2 + 1/3:",
      options: ["5/6", "2/5", "1/6", "2/6"],
      answer: "5/6",
      whyItMatters: "Fractions are the #1 hidden crack behind Grade 12 algebra & trig headaches!"
    },
    {
      id: "diag-4",
      eraId: "junior",
      targetNodeId: "negatives-flip",
      topicLabel: "Negative Signs",
      prompt: "Watch the signs! Evaluate −4 − (−9):",
      options: ["5", "−13", "−5", "13"],
      answer: "5",
      whyItMatters: "Two touching minuses flip to plus (−4 + 9 = 5). Kills 90% of sign errors!"
    },
    {
      id: "diag-5",
      eraId: "junior",
      targetNodeId: "exponents-roots",
      topicLabel: "Negative & Root Exponents",
      prompt: "What does 3⁻² actually equal?",
      options: ["1/9", "−9", "−6", "1/6"],
      answer: "1/9",
      whyItMatters: "Negative exponents flip floors across the fraction bar, NEVER make numbers negative!"
    },
    {
      id: "diag-6",
      eraId: "junior",
      targetNodeId: "algebra-scale",
      topicLabel: "Solving for x",
      prompt: "Solve 3x − 5 = x + 9:",
      options: ["x = 7", "x = 2", "x = 4", "x = −7"],
      answer: "x = 7",
      whyItMatters: "Clean equation balancing carries every Grade 12 & Physics formula."
    },
    {
      id: "diag-7",
      eraId: "junior",
      targetNodeId: "factoring-foil",
      topicLabel: "Factoring Quadratics",
      prompt: "Factor x² − 2x − 15:",
      options: ["(x − 5)(x + 3)", "(x + 5)(x − 3)", "(x − 15)(x + 1)", "(x − 5)(x − 3)"],
      answer: "(x − 5)(x + 3)",
      whyItMatters: "Sum-product factoring unlocks quadratics, rationals, trig equations & limits!"
    },
    {
      id: "diag-8",
      eraId: "senior",
      targetNodeId: "logarithms-unlocked",
      topicLabel: "Grade 12 Logarithms",
      prompt: "What is log₂(32)?",
      options: ["5", "16", "6", "4"],
      answer: "5",
      whyItMatters: "log₂(32) literally asks '2 to what power = 32?' → 5!"
    },
    {
      id: "diag-9",
      eraId: "college",
      targetNodeId: "derivatives-speedometer",
      topicLabel: "College Calculus",
      prompt: "Bonus flex! What is the derivative d/dx [x⁴ + 6x]?",
      options: ["4x³ + 6", "4x⁴ + 6", "x⁵/5 + 6", "3x⁴"],
      answer: "4x³ + 6",
      whyItMatters: "Power rule drops the exponent and subtracts 1 — College Calculus in 1 second!"
    }
  ];

  // ==================== ACHIEVEMENT BADGES (10) ====================
  const BADGES = [
    { id: "first_step", title: "Zero Shame Starter", description: "Complete your first MathLingo lesson!", emoji: "🌱" },
    { id: "sniper", title: "Flawless 100%", description: "Finish a round with 100% first-try accuracy!", emoji: "🎯" },
    { id: "pattern_spotter", title: "2·4·6·8 & Prime Spotter", description: "Master Even/Odd/Skip OR Primes!", emoji: "👯" },
    { id: "tables_master", title: "Times & Roots Assassin", description: "Run a Speed Sprint or Memorize Quiz!", emoji: "✖️" },
    { id: "fraction_slayer", title: "Fraction Fear Cured", description: "Conquer Fractions & % Swap!", emoji: "🍕" },
    { id: "log_destroyer", title: "Wait THAT'S a Log?!", description: "Conquer Grade 12 Logarithms!", emoji: "🔓" },
    { id: "calc_flex", title: "Casual Calculus", description: "Clear any College Math skill node!", emoji: "🎓" },
    { id: "trap_hunter", title: "Trap Buster", description: "Bust at least 5 Grade 12 Traps!", emoji: "⚡" },
    { id: "crack_patcher", title: "Crack Patcher", description: "Repair a missed question or finish the 9-Q Scan!", emoji: "🛠️" },
    { id: "five_eras", title: "Nursery-to-College Legend", description: "Clear at least 1 skill in ALL 5 Eras!", emoji: "👑" }
  ];

  // ==================== MEMORIZE REFERENCE TABLES ====================
  const MEMORIZE_DATA = {
    multTricks: {
      1: "Anything × 1 stays itself.",
      2: "Double it! Always ends in 0, 2, 4, 6, or 8.",
      3: "Digits of any answer add up to a multiple of 3!",
      4: "Double it TWICE (e.g. 4×7 → double 7=14 → double 14=28).",
      5: "Half it × 10! Always ends in 0 or 5.",
      6: "Half of ×10 plus itself — or even×6 repeats last digit (6×4=24, 6×8=48)!",
      7: "Hard ones: 7×6=42, 7×7=49, 7×8=56 (5-6-7-8!), 7×9=63.",
      8: "Double THREE times (8×7 → 14 → 28 → 56)!",
      9: "Multiply by 10 then subtract 1 copy (9×7 = 70−7 = 63). Digits always sum to 9!",
      10: "Promote left (slap a 0 on the end).",
      11: "1–9: just twin the digit (11×7=77). 11×12=132 (split 1 and 2, put 1+2=3 inside!).",
      12: "(×10) + (×2) — e.g. 12×7 = 70 + 14 = 84!"
    },
    divRules: [
      { divisor: "÷ 2", rule: "Last digit is EVEN (0, 2, 4, 6, 8)", example: "1,498 → ends in 8 ✅" },
      { divisor: "÷ 3", rule: "Sum of ALL digits divides by 3", example: "249 → 2+4+9 = 15 (÷3) ✅" },
      { divisor: "÷ 4", rule: "Last TWO digits divide by 4 (halve twice!)", example: "716 → 16 ÷ 4 = 4 ✅" },
      { divisor: "÷ 5", rule: "Ends in 0 or 5 (cheat: double & slide dot left)", example: "135 ÷ 5 → 270 → 27 ✅" },
      { divisor: "÷ 6", rule: "Passes BOTH ÷2 (even) AND ÷3 (digit sum)", example: "72 → even & 7+2=9 ✅" },
      { divisor: "÷ 9", rule: "Sum of ALL digits divides by 9", example: "729 → 7+2+9 = 18 (÷9) ✅" },
      { divisor: "÷ 10", rule: "Ends in 0 (slide decimal 1 left)", example: "480 ÷ 10 = 48 ✅" }
    ],
    primesUnder100: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],
    squares1to15: Array.from({ length: 15 }, (_, i) => ({ n: i + 1, sq: (i + 1) * (i + 1) })),
    cubes1to6: [
      { n: 1, cu: 1 }, { n: 2, cu: 8 }, { n: 3, cu: 27 },
      { n: 4, cu: 64 }, { n: 5, cu: 125 }, { n: 6, cu: 216 }
    ],
    powersOf2: Array.from({ length: 10 }, (_, i) => ({ exp: i + 1, val: Math.pow(2, i + 1) })),
    trigTable: [
      { deg: "0°", rad: "0", sin: "0", cos: "1", tan: "0" },
      { deg: "30°", rad: "π/6", sin: "1/2", cos: "√3/2", tan: "1/√3" },
      { deg: "45°", rad: "π/4", sin: "√2/2", cos: "√2/2", tan: "1" },
      { deg: "60°", rad: "π/3", sin: "√3/2", cos: "1/2", tan: "√3" },
      { deg: "90°", rad: "π/2", sin: "1", cos: "0", tan: "Undef" }
    ],
    multCourseStages: [
      {
        id: "stage-1-freebies",
        order: 1,
        tableLabel: "×1 & ×10",
        title: "Stage 1: The Instant Freebies (×1 & ×10)",
        icon: "🎁",
        color: "#3b7a57",
        vibe: "Wait, 42 cells of the chart are ALREADY free?!",
        trickSummary: "1 × anything = itself. 10 × anything = slap a 0 on the end!",
        pairs: [[1, 1], [1, 7], [1, 12], [10, 4], [10, 8], [10, 12]],
        unlockPairs: [
          [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12],
          [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10], [10, 11], [10, 12]
        ]
      },
      {
        id: "stage-2-twos",
        order: 2,
        tableLabel: "×2",
        title: "Stage 2: The Doubler (×2 = 2, 4, 6, 8...)",
        icon: "👯",
        color: "#35628c",
        vibe: "Just add the number to itself!",
        trickSummary: "×2 simply means double it (a + a). Always ends in 0, 2, 4, 6, or 8!",
        pairs: [[2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 11], [2, 12]]
      },
      {
        id: "stage-3-fives",
        order: 3,
        tableLabel: "×5",
        title: "Stage 3: The Clock Hand Trick (×5)",
        icon: "✋",
        color: "#35628c",
        vibe: "Half of ×10 — always ends in 0 or 5!",
        trickSummary: "Even × 5 = take half, slap on 0 (e.g. 5×8 → half of 8 is 4 → 40). Odd × 5 = step down, halve, slap on 5!",
        pairs: [[5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 11], [5, 12]]
      },
      {
        id: "stage-4-elevens",
        order: 4,
        tableLabel: "×11",
        title: "Stage 4: Twin Digits & Split Trick (×11)",
        icon: "🥢",
        color: "#725385",
        vibe: "11 × 7 = 77? Wait, that's practically cheating!",
        trickSummary: "For 1–9: twin the digit (11×8 = 88). For 11×11 = 121 (1, 1+1, 1) and 11×12 = 132 (1, 1+2, 2)!",
        pairs: [[11, 3], [11, 4], [11, 6], [11, 7], [11, 8], [11, 9], [11, 11], [11, 12]]
      },
      {
        id: "stage-5-nines",
        order: 5,
        tableLabel: "×9",
        title: "Stage 5: The Mind-Reading Trick (×9)",
        icon: "🪄",
        color: "#725385",
        vibe: "Tens = (n − 1), Ones = (9 − tens)!",
        trickSummary: "9 × n = (10 × n) − n. Or for 2–9: drop n by 1 for tens, then pick the digit that adds to 9 (9×7 → 6 and 3 = 63)!",
        pairs: [[9, 3], [9, 4], [9, 6], [9, 7], [9, 8], [9, 9], [9, 12]]
      },
      {
        id: "stage-6-fours",
        order: 6,
        tableLabel: "×4",
        title: "Stage 6: Double Twice (×4)",
        icon: "🍀",
        color: "#b36a22",
        vibe: "Only 6 new facts left for ×4!",
        trickSummary: "Multiply by 4 = double it, then double it AGAIN! (4×7 → 14 → 28).",
        pairs: [[4, 3], [4, 4], [4, 6], [4, 7], [4, 8], [4, 12]]
      },
      {
        id: "stage-7-threes",
        order: 7,
        tableLabel: "×3",
        title: "Stage 7: Double + One More (×3)",
        icon: "🔺",
        color: "#b36a22",
        vibe: "Only 5 new facts left for ×3!",
        trickSummary: "Multiply by 3 = (double it) + (add it once more). e.g. 3×7 = 14 + 7 = 21!",
        pairs: [[3, 3], [3, 6], [3, 7], [3, 8], [3, 12]]
      },
      {
        id: "stage-8-eights",
        order: 8,
        tableLabel: "×8",
        title: "Stage 8: Triple Double — Only 4 New Facts! (×8)",
        icon: "🎱",
        color: "#a8413a",
        vibe: "Wait, 8 of the 12 facts in ×8 are ALREADY learned?!",
        trickSummary: "×8 = double THREE times (or 10× − 2×)! Plus the famous rhyme: 5-6-7-8 → 56 = 7 × 8!",
        pairs: [[8, 6], [8, 7], [8, 8], [8, 12]]
      },
      {
        id: "stage-9-sixes",
        order: 9,
        tableLabel: "×6",
        title: "Stage 9: Just 3 New Facts Left! (×6)",
        icon: "🐝",
        color: "#a8413a",
        vibe: "6×6=36, 6×7=42, 6×12=72 — literally only THREE!",
        trickSummary: "×6 = (×5) + once more! Notice 6×6 = 36 rhymes, and 6×7 = 42 (half of 84).",
        pairs: [[6, 6], [6, 7], [6, 12]]
      },
      {
        id: "stage-10-final",
        order: 10,
        tableLabel: "×7 & ×12",
        title: "Stage 10: The Final 3 & Grand 12×12 Mastery!",
        icon: "👑",
        color: "#a96718",
        vibe: "Conquered all 144 multiplication facts with zero rote stress!",
        trickSummary: "Literally ONLY 3 facts remain in the entire 12×12 universe: 7×7=49, 7×12=84, 12×12=144!",
        pairs: [[7, 7], [7, 12], [12, 12]],
        bossReviewPairs: [[7, 8], [6, 8], [6, 7], [9, 8], [8, 12], [9, 7]]
      }
    ]
  };

  function explainMultPair(a, b) {
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const prod = a * b;
    if (lo === 1) return `1 × anything stays itself: ${a} × ${b} = ${prod}.`;
    if (lo === 10 || hi === 10) {
      const other = lo === 10 ? hi : lo;
      return `×10 just promotes ${other} one slot left (slap on a 0): ${prod}!`;
    }
    if (lo === 2) return `Double ${hi}: ${hi} + ${hi} = ${prod}!`;
    if (hi === 11 && lo <= 9) return `Twin digit trick: 11 × ${lo} = ${prod}!`;
    if (lo === 11 && hi === 11) return `Split 1_1 and put 1+1=2 inside → 121!`;
    if (lo === 11 && hi === 12) return `Split 1_2 and put 1+2=3 inside → 132!`;
    if (lo === 5 || hi === 5) {
      const other = lo === 5 ? hi : lo;
      return `Half of (10 × ${other}): half of ${other * 10} = ${prod}!`;
    }
    if (lo === 9 || hi === 9) {
      const other = lo === 9 ? hi : lo;
      if (other <= 9) {
        return `Tens = ${other} − 1 = ${other - 1}; ones makes 9 (${other - 1} + ${10 - other} = 9) → ${prod}!`;
      }
      return `(10 × ${other}) − ${other} = ${other * 10} − ${other} = ${prod}!`;
    }
    if (lo === 7 && hi === 8) return `Famous rhyme: 5-6-7-8 → 56 = 7 × 8! (Also 7×7 + 7 = 49 + 7 = 56)`;
    if (lo === 6 && hi === 8) return `6 × 8 rhymes with 48! (Or 5×8 + 8 = 40 + 8 = 48)`;
    if (lo === 6 && hi === 7) return `5×7 + 7 = 35 + 7 = 42! (Or double 21 = 42)`;
    if (lo === 4) return `Double ${hi} TWICE: ${hi} → ${hi * 2} → ${prod}!`;
    if (lo === 3) return `Double ${hi} (${hi * 2}) + one more ${hi} = ${prod}!`;
    if (lo === 8) return `Double ${hi} THREE times: ${hi} → ${hi * 2} → ${hi * 4} → ${prod}!`;
    if (lo === 6) return `(5 × ${hi}) + ${hi} = ${5 * hi} + ${hi} = ${prod}!`;
    if (lo === 7 && hi === 7) return `Perfect square 7² = 49! (7×5 + 7×2 = 35 + 14 = 49)`;
    if (hi === 12) return `Split 12 into (10 + 2): (${lo}×10) + (${lo}×2) = ${lo * 10} + ${lo * 2} = ${prod}!`;
    return `${a} × ${b} = ${prod}!`;
  }

  // ==================== PROCEDURAL QUESTION GENERATORS ====================
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function makeNumericMCOptions(correctNum, offsets) {
    const set = new Set([String(correctNum)]);
    const candidates = offsets || [-3, -2, -1, 1, 2, 3, 4, -4, 5, 10, -10];
    for (const off of shuffle(candidates)) {
      if (set.size >= 4) break;
      const val = correctNum + off;
      if (val !== correctNum) set.add(String(val));
    }
    let fallback = 1;
    while (set.size < 4) {
      set.add(String(correctNum + fallback));
      fallback++;
    }
    return shuffle(Array.from(set));
  }

  function makeStringMCOptions(correctStr, distractors) {
    const set = new Set([correctStr]);
    for (const d of distractors) {
      if (set.size >= 4) break;
      if (d !== correctStr) set.add(d);
    }
    let idx = 1;
    while (set.size < 4) {
      set.add(correctStr + " (" + idx + ")");
      idx++;
    }
    return shuffle(Array.from(set));
  }

  function generateProceduralQuestion(nodeId) {
    switch (nodeId) {
      case "counting-subitizing": {
        const base = randInt(0, 1) === 0 ? 5 : 4;
        const extra = randInt(1, 4);
        const ans = base + extra;
        return {
          type: "mc",
          prompt: `Instant Chunking: ${base} dots in one group + ${extra} extra dots = ?`,
          options: makeNumericMCOptions(ans, [-2, -1, 1, 2, 3]),
          answer: String(ans),
          hint: `Start at ${base} and count up ${extra}.`,
          whyEasy: `${base} + ${extra} = ${ans}!`
        };
      }
      case "even-odd-skip": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const step = [2, 4, 5, 6, 8][randInt(0, 4)];
          const start = step * randInt(1, 3);
          const ans = start + step * 3;
          return {
            type: "mc",
            prompt: `Skip-count by ${step}s: ${start}, ${start + step}, ${start + step * 2}, ___`,
            options: makeNumericMCOptions(ans, [-2, -1, 1, 2, step]),
            answer: String(ans),
            hint: `Add +${step} to ${start + step * 2}.`,
            whyEasy: `${start + step * 2} + ${step} = ${ans}!`
          };
        }
        if (mode === 1) {
          const n = randInt(120, 999);
          const isEven = n % 2 === 0;
          const ans = isEven ? "Even" : "Odd";
          return {
            type: "mc",
            prompt: `Instant Parity! Is ${n} Even or Odd?`,
            options: makeStringMCOptions(ans, ["Even", "Odd", "Prime only", "Zero"]),
            answer: ans,
            hint: `Only look at the last digit: ${n % 10}!`,
            whyEasy: `${n} ends in ${n % 10}, which is ${ans}!`
          };
        }
        const a = randInt(1, 9) * 2 + 1;
        const b = randInt(1, 9) * 2 + 1;
        return {
          type: "mc",
          prompt: `Without adding fully, is ${a} + ${b} Even or Odd?`,
          options: makeStringMCOptions("Even", ["Odd", "Prime", "Negative"]),
          answer: "Even",
          hint: "Odd + Odd pairs up the two leftovers!",
          whyEasy: `Odd + Odd = Even ALWAYS (${a} + ${b} = ${a + b})!`
        };
      }
      case "make-10-addition": {
        const tens = randInt(0, 4) * 10;
        const a = tens + randInt(7, 9);
        const b = randInt(4, 9);
        const need = (tens + 10) - a;
        const ans = a + b;
        return {
          type: "mc",
          prompt: `Make-${tens + 10} Trick: ${a} + ${b} = ?`,
          options: makeNumericMCOptions(ans, [-2, -1, 1, 2, 10]),
          answer: String(ans),
          hint: `${a} steals ${need} to hit ${tens + 10}, leaving ${b - need}.`,
          whyEasy: `${tens + 10} + ${b - need} = ${ans}!`
        };
      }
      case "distance-subtraction": {
        const base = randInt(3, 9) * 10;
        const sub = base - randInt(1, 3);
        const diff = randInt(4, 14);
        const top = sub + diff;
        const shift = base - sub;
        return {
          type: "mc",
          prompt: `Shift Trick: ${top} − ${sub} = ?`,
          options: makeNumericMCOptions(diff, [-3, -1, 1, 2, 4]),
          answer: String(diff),
          hint: `Shift both +${shift} → ${top + shift} − ${base}.`,
          whyEasy: `${top + shift} − ${base} = ${diff}!`
        };
      }
      case "zero-base10": {
        const h = randInt(1, 9), t = randInt(1, 9), o = randInt(1, 9);
        const num = h * 100 + t * 10 + o;
        const ans = h * 100;
        return {
          type: "mc",
          prompt: `What value does '${h}' hold in ${num}?`,
          options: makeStringMCOptions(String(ans), [String(h), String(h * 10), String(h * 1000)]),
          answer: String(ans),
          hint: "Hundreds place!",
          whyEasy: `${h} × 100 = ${ans}!`
        };
      }
      case "rect-multiplication": {
        const a = randInt(4, 9);
        const ones = randInt(2, 8);
        const b = 10 + ones;
        const ans = a * b;
        return {
          type: "mc",
          prompt: `Rectangle Split: ${a} × ${b} = ?`,
          options: makeNumericMCOptions(ans, [-a, a, -10, 10, 4]),
          answer: String(ans),
          hint: `(${a} × 10) + (${a} × ${ones}).`,
          whyEasy: `${a * 10} + ${a * ones} = ${ans}!`
        };
      }
      case "reverse-division": {
        const div = randInt(3, 9);
        const q = 10 + randInt(2, 9);
        const total = div * q;
        return {
          type: "mc",
          prompt: `Chunking Division: ${total} ÷ ${div} = ?`,
          options: makeNumericMCOptions(q, [-2, -1, 1, 2, 3]),
          answer: String(q),
          hint: `${div * 10}÷${div} + ${div * (q - 10)}÷${div}.`,
          whyEasy: `10 + ${q - 10} = ${q}!`
        };
      }
      case "primes-factors-lcm": {
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
        const composites = [4, 6, 9, 12, 14, 15, 21, 25, 27];
        const p = primes[randInt(0, primes.length - 1)];
        const c1 = composites[randInt(0, composites.length - 1)];
        const c2 = composites[(composites.indexOf(c1) + 2) % composites.length];
        const c3 = composites[(composites.indexOf(c1) + 4) % composites.length];
        return {
          type: "mc",
          prompt: `Spot the PRIME number (only divisible by 1 and itself):`,
          options: makeStringMCOptions(String(p), [String(c1), String(c2), String(c3)]),
          answer: String(p),
          hint: "Test ÷2, ÷3, ÷5 on the choices!",
          whyEasy: `${p} has no factor pairs except 1 × ${p}!`
        };
      }
      case "fractions-trenchcoat": {
        const d1 = randInt(2, 4);
        const d2 = d1 * 2;
        const ans = `3/${d2}`;
        return {
          type: "mc",
          prompt: `Match slice sizes! 1/${d1} + 1/${d2} = ?`,
          options: makeStringMCOptions(ans, [`2/${d1 + d2}`, `3/${d1}`, `1/${d2}`]),
          answer: ans,
          hint: `1/${d1} = 2/${d2}.`,
          whyEasy: `2/${d2} + 1/${d2} = ${ans}!`
        };
      }
      case "decimals-percents": {
        const p = randInt(2, 9) * 2;
        const ans = p / 2;
        return {
          type: "mc",
          prompt: `Magic % Swap! ${p}% of 50 = ?`,
          options: makeNumericMCOptions(ans, [-2, -1, 1, 2, 5]),
          answer: String(ans),
          hint: `Flip to 50% of ${p}.`,
          whyEasy: `Half of ${p} = ${ans}!`
        };
      }
      case "pemdas-grammar": {
        const a = randInt(2, 8), b = randInt(2, 6), c = randInt(2, 5);
        const ans = a + b * c;
        return {
          type: "mc",
          prompt: `Evaluate: ${a} + ${b} × ${c}`,
          options: makeStringMCOptions(String(ans), [String((a + b) * c), String(ans + 2), String(ans - 1)]),
          answer: String(ans),
          hint: "Multiply before adding!",
          whyEasy: `${a} + ${b * c} = ${ans}!`
        };
      }
      case "perimeter-area-volume": {
        const l = randInt(3, 9), w = randInt(2, 6);
        const area = l * w;
        return {
          type: "mc",
          prompt: `Rectangle is ${l}m long × ${w}m wide. What is its AREA (carpet inside)?`,
          options: makeNumericMCOptions(area, [-2, 2, 2 * (l + w) - area, 4]),
          answer: String(area),
          hint: "Area = L × W!",
          whyEasy: `${l} × ${w} = ${area} m²!`
        };
      }
      case "negatives-flip": {
        const a = randInt(3, 12), b = randInt(2, 9);
        const ans = a + b;
        return {
          type: "mc",
          prompt: `Double Flip! ${a} − (−${b}) = ?`,
          options: makeStringMCOptions(String(ans), [String(a - b), String(-ans), String(b - a)]),
          answer: String(ans),
          hint: "Minus a minus flips to +!",
          whyEasy: `${a} + ${b} = ${ans}!`
        };
      }
      case "squares-cubes-roots": {
        const n = randInt(4, 15);
        return {
          type: "mc",
          prompt: `Instant Root! What is √${n * n}?`,
          options: makeNumericMCOptions(n, [-2, -1, 1, 2, 3]),
          answer: String(n),
          hint: `What positive number squared equals ${n * n}?`,
          whyEasy: `${n}² = ${n * n} → √${n * n} = ${n}!`
        };
      }
      case "exponents-roots": {
        const a = randInt(2, 6), b = randInt(2, 5);
        const ans = `x^${a + b}`;
        return {
          type: "mc",
          prompt: `Simplify x^${a} · x^${b}:`,
          options: makeStringMCOptions(ans, [`x^${a * b}`, `2x^${a + b}`, `x^${Math.abs(a - b) + 1}`]),
          answer: ans,
          hint: "Add exponents!",
          whyEasy: `${a} + ${b} = ${a + b} → ${ans}!`
        };
      }
      case "algebra-scale": {
        const x = randInt(2, 9), m = randInt(2, 5), b = randInt(2, 9);
        const rhs = m * x + b;
        return {
          type: "mc",
          prompt: `Unwrap the box! ${m}x + ${b} = ${rhs} → x = ?`,
          options: makeNumericMCOptions(x, [-2, -1, 1, 2, 3]),
          answer: String(x),
          hint: `Subtract ${b}, divide by ${m}.`,
          whyEasy: `${rhs - b} ÷ ${m} = ${x}!`
        };
      }
      case "systems-equations": {
        const x = randInt(2, 9), y = randInt(1, 7);
        const sum = x + y, diff = x - y;
        return {
          type: "mc",
          prompt: `Stack & Smash! If x + y = ${sum} and x − y = ${diff}, what is x?`,
          options: makeNumericMCOptions(x, [-2, -1, 1, 2, y]),
          answer: String(x),
          hint: `Add equations straight down: 2x = ${sum + diff}.`,
          whyEasy: `2x = ${sum + diff} → x = ${x}!`
        };
      }
      case "factoring-foil": {
        const r1 = randInt(1, 6), r2 = randInt(2, 7);
        const b = r1 + r2, c = r1 * r2;
        const ans = `(x + ${r1})(x + ${r2})`;
        return {
          type: "mc",
          prompt: `Factor x² + ${b}x + ${c}:`,
          options: makeStringMCOptions(ans, [`(x + 1)(x + ${c})`, `(x − ${r1})(x − ${r2})`, `(x + ${r1 + 1})(x + ${Math.max(1, r2 - 1)})`]),
          answer: ans,
          hint: `Multiply to ${c}, add to ${b}.`,
          whyEasy: `${r1} & ${r2} → ${ans}!`
        };
      }
      case "slope-lines": {
        const m = randInt(2, 6), x1 = randInt(1, 4), dx = randInt(2, 4);
        const x2 = x1 + dx, y1 = randInt(1, 8), y2 = y1 + m * dx;
        return {
          type: "mc",
          prompt: `Slope between (${x1}, ${y1}) and (${x2}, ${y2}):`,
          options: makeNumericMCOptions(m, [-1, 1, 2, 3, -2]),
          answer: String(m),
          hint: `Rise ${y2 - y1} ÷ Run ${dx}.`,
          whyEasy: `${m}!`
        };
      }
      case "geometry-pythagoras": {
        const scale = randInt(1, 4);
        const a = 3 * scale, b = 4 * scale, c = 5 * scale;
        return {
          type: "mc",
          prompt: `Right triangle legs ${a} and ${b}. Hypotenuse?`,
          options: makeNumericMCOptions(c, [-2, -1, 1, 2, 3]),
          answer: String(c),
          hint: `3-4-5 scaled by ${scale}!`,
          whyEasy: `${c}!`
        };
      }
      case "quadratics-symmetry": {
        const h = randInt(1, 6);
        const c = randInt(1, 9);
        return {
          type: "mc",
          prompt: `Vertex x-value of y = x² − ${2 * h}x + ${c}:`,
          options: makeNumericMCOptions(h, [-h * 2, -1, 1, 2]),
          answer: String(h),
          hint: `x = −b/(2a).`,
          whyEasy: `${2 * h} ÷ 2 = ${h}!`
        };
      }
      case "complex-imaginary-i": {
        const r = randInt(2, 9);
        const ans = `${r}i`;
        return {
          type: "mc",
          prompt: `What is √(−${r * r})?`,
          options: makeStringMCOptions(ans, [`−${r}`, `${r}`, `−${r * r}i`]),
          answer: ans,
          hint: `√(${r * r}) · √(−1)!`,
          whyEasy: `${r}i!`
        };
      }
      case "functions-shifting": {
        const a = randInt(2, 5), b = randInt(1, 7), inp = randInt(2, 5);
        const ans = a * inp + b;
        return {
          type: "mc",
          prompt: `If f(x) = ${a}x + ${b}, find f(${inp}):`,
          options: makeNumericMCOptions(ans, [-2, -1, 1, 2, a]),
          answer: String(ans),
          hint: `${a}(${inp}) + ${b}.`,
          whyEasy: `${ans}!`
        };
      }
      case "logarithms-unlocked": {
        const pairs = [
          { base: 2, exp: 3, val: 8 }, { base: 2, exp: 4, val: 16 },
          { base: 2, exp: 5, val: 32 }, { base: 3, exp: 2, val: 9 },
          { base: 3, exp: 3, val: 27 }, { base: 5, exp: 2, val: 25 },
          { base: 10, exp: 3, val: 1000 }
        ];
        const pick = pairs[randInt(0, pairs.length - 1)];
        return {
          type: "mc",
          prompt: `Translate! What is log_${pick.base}(${pick.val})?`,
          options: makeNumericMCOptions(pick.exp, [-1, 1, 2, 3]),
          answer: String(pick.exp),
          hint: `${pick.base}^? = ${pick.val}.`,
          whyEasy: `${pick.base}^${pick.exp} = ${pick.val} → ${pick.exp}!`
        };
      }
      case "trig-unit-circle": {
        const angles = [
          { deg: "0°", rad: "0", cos: "1", sin: "0" },
          { deg: "90°", rad: "π/2", cos: "0", sin: "1" },
          { deg: "180°", rad: "π", cos: "−1", sin: "0" },
          { deg: "270°", rad: "3π/2", cos: "0", sin: "−1" }
        ];
        const pick = angles[randInt(0, angles.length - 1)];
        const askSin = randInt(0, 1) === 1;
        const fn = askSin ? "sin" : "cos";
        const ans = askSin ? pick.sin : pick.cos;
        return {
          type: "mc",
          prompt: `Unit Circle at ${pick.deg} (${pick.rad}): ${fn}(${pick.deg}) = ?`,
          options: makeStringMCOptions(ans, ["1", "0", "−1", "1/2"]),
          answer: ans,
          hint: "cos = X, sin = Y.",
          whyEasy: `(${pick.cos}, ${pick.sin}) → ${ans}!`
        };
      }
      case "conics-distance-circles": {
        const r = randInt(2, 10);
        return {
          type: "mc",
          prompt: `Circle (x − 1)² + (y + 4)² = ${r * r}. What is its radius r?`,
          options: makeNumericMCOptions(r, [-1, 1, 2, r * r - r]),
          answer: String(r),
          hint: `Take √(${r * r})!`,
          whyEasy: `r² = ${r * r} → r = ${r}!`
        };
      }
      case "sequences-sigma": {
        const n = randInt(4, 6), mult = randInt(1, 3);
        let sum = 0;
        for (let k = 1; k <= n; k++) sum += mult * k;
        return {
          type: "mc",
          prompt: `Compute Σ (k=1 to ${n}) of ${mult === 1 ? "k" : mult + "k"}:`,
          options: makeNumericMCOptions(sum, [-3, -1, 1, 2, 4]),
          answer: String(sum),
          hint: `Loop k=1..${n} and add.`,
          whyEasy: `${sum}!`
        };
      }
      case "stats-normal-curve": {
        const mean = randInt(6, 8) * 10;
        const sigma = 5;
        const z = randInt(1, 3);
        const x = mean + z * sigma;
        return {
          type: "mc",
          prompt: `Mean = ${mean}, σ = ${sigma}. Score = ${x}. What is the z-score?`,
          options: makeNumericMCOptions(z, [-1, 1, 2, -z]),
          answer: String(z),
          hint: `z = (${x} − ${mean}) ÷ ${sigma}.`,
          whyEasy: `${x - mean} ÷ ${sigma} = ${z}!`
        };
      }
      case "limits-potholes": {
        const r = randInt(2, 6);
        const ans = 2 * r;
        return {
          type: "mc",
          prompt: `lim(x → ${r}) of (x² − ${r * r}) / (x − ${r}) = ?`,
          options: makeNumericMCOptions(ans, [-2, -1, 1, 2, r]),
          answer: String(ans),
          hint: `Cancel (x − ${r}), plug ${r} into (x + ${r}).`,
          whyEasy: `${r} + ${r} = ${ans}!`
        };
      }
      case "derivatives-speedometer": {
        const coeff = randInt(2, 6), pow = randInt(2, 5);
        const ans = `${coeff * pow}x^${pow - 1}`;
        return {
          type: "mc",
          prompt: `Power Rule: d/dx [ ${coeff}x^${pow} ] = ?`,
          options: makeStringMCOptions(ans, [`${coeff}x^${pow - 1}`, `${coeff * pow}x^${pow}`, `${coeff + pow}x^${pow - 1}`]),
          answer: ans,
          hint: `Multiply ${coeff}×${pow}, subtract 1 from ${pow}.`,
          whyEasy: `${ans}!`
        };
      }
      case "chain-product-optimization": {
        const k = randInt(2, 7);
        const ans = `${k}e^(${k}x)`;
        return {
          type: "mc",
          prompt: `Chain Rule: d/dx [ e^(${k}x) ] = ?`,
          options: makeStringMCOptions(ans, [`e^(${k}x)`, `${k}x·e^(${k}x)`, `${k}e^x`]),
          answer: ans,
          hint: `Outside e^(${k}x) × inside derivative ${k}.`,
          whyEasy: `${ans}!`
        };
      }
      case "integrals-area": {
        const top = randInt(2, 5);
        const ans = top * top;
        return {
          type: "mc",
          prompt: `Evaluate ∫₀^${top} 2x dx (antiderivative is x²):`,
          options: makeNumericMCOptions(ans, [-3, -1, 1, 2, top]),
          answer: String(ans),
          hint: `${top}² − 0².`,
          whyEasy: `${ans}!`
        };
      }
      case "calc3-partials-ode": {
        const a = randInt(2, 6), b = randInt(2, 6);
        const ans = `${2 * a}xy`;
        return {
          type: "mc",
          prompt: `Calc III Partial: If f(x, y) = ${a}x²y + ${b}y³, find ∂f/∂x (freeze y!):`,
          options: makeStringMCOptions(ans, [`${2 * a}xy + ${3 * b}y²`, `${a}x² + ${3 * b}y²`, `${2 * a}x`]),
          answer: ans,
          hint: `${b}y³ has no x → 0! Only differentiate ${a}x²y.`,
          whyEasy: `∂/∂x[${a}x²y] = ${ans}!`
        };
      }
      case "linear-algebra-vectors": {
        const x1 = randInt(1, 5), y1 = randInt(1, 5), x2 = randInt(1, 5), y2 = randInt(1, 5);
        const dot = x1 * x2 + y1 * y2;
        return {
          type: "mc",
          prompt: `Dot Product: [${x1}, ${y1}] · [${x2}, ${y2}] = ?`,
          options: makeNumericMCOptions(dot, [-3, -1, 1, 2, 4]),
          answer: String(dot),
          hint: `(${x1}×${x2}) + (${y1}×${y2}).`,
          whyEasy: `${dot}!`
        };
      }
      case "discrete-logic-mod": {
        const mod = [5, 7, 10, 12][randInt(0, 3)];
        const rem = randInt(1, mod - 1);
        const num = mod * randInt(2, 4) + rem;
        return {
          type: "mc",
          prompt: `Clock Mod! What is ${num} mod ${mod}?`,
          options: makeNumericMCOptions(rem, [-1, 1, 2, 3].filter((d) => rem + d >= 0)),
          answer: String(rem),
          hint: `Remainder after dividing ${num} by ${mod}.`,
          whyEasy: `${num} = ${Math.floor(num / mod)}×${mod} + ${rem} → ${rem}!`
        };
      }
      case "probability-bayes": {
        const n = randInt(4, 7);
        const ans = (n * (n - 1)) / 2;
        return {
          type: "mc",
          prompt: `Ways to pick 2 people from ${n} friends (order doesn't matter):`,
          options: makeNumericMCOptions(ans, [-2, -1, 1, 2, n]),
          answer: String(ans),
          hint: `(${n} × ${n - 1}) ÷ 2.`,
          whyEasy: `${ans}!`
        };
      }
      default: {
        const a = randInt(5, 9), b = randInt(3, 8);
        return {
          type: "mc",
          prompt: `Quick Warmup: ${a} + ${b} = ?`,
          options: makeNumericMCOptions(a + b, [-1, 1, 2]),
          answer: String(a + b),
          hint: "Bridge through 10!",
          whyEasy: `${a + b}!`
        };
      }
    }
  }

  const proceduralRegistry = Object.create(null);

  function registerProcedural(nodeId, fn) {
    if (nodeId && typeof fn === "function") proceduralRegistry[nodeId] = fn;
  }

  function registerProceduralMap(map) {
    if (!map) return;
    for (const [k, fn] of Object.entries(map)) {
      if (typeof fn === "function") proceduralRegistry[k] = fn;
    }
  }

  root.MATHLINGO_DATA = {
    WORLDS,
    MASTERY_STAGES,
    NODES,
    GRADE12_TRAPS,
    DIAGNOSTIC_QUESTIONS,
    BADGES,
    MEMORIZE_DATA,
    explainMultPair,
    proceduralRegistry,
    registerProcedural,
    registerProceduralMap,
    generateProceduralQuestion
  };
})(typeof window !== "undefined" ? window : globalThis);
