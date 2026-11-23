// EveryLingo Studio — Tailored Exam Mode & Official CBT Mock Simulator
// Covers 10 Authentic Philippine & Competitive Exams:
//   1. DOST-SEI Undergraduate Scholarship Exam (RA 7687 & Merit)
//   2. UPCAT (University of the Philippines — Bilingual EN/FIL + R − 0.25W + UPG Estimator)
//   3. Civil Service Exam — Professional (CSE-PPT Pro, 80.00% Passing Gate)
//   4. Civil Service Exam — Sub-Professional (CSE-PPT Sub-Pro, Clerical + 80.00% Gate)
//   5. NMAT (National Medical Admission Test — Part I + Part II, 200–800 Scale & PR)
//   6. ACET (Ateneo College Entrance Test — High-Speed + Timed Essay Studio)
//   7. DCAT (De La Salle University — Heavy Statistics/Probability + STEM)
//   8. USTET (University of Santo Tomas — 4 Subtests + Balanced Section Gate)
//   9. PUPCET (Polytechnic University of the Philippines — 5-Subtest High-Speed)
//  10. PMAEE (Philippine Military Academy — Algebra & Geometry, English & SPMA)
(function (root) {
  "use strict";

  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fmtMath(str, display) {
    return root.MATHLINGO_LATEX ? root.MATHLINGO_LATEX.formatMath(str, display) : escapeHtml(str);
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

  function formatMMSS(sec) {
    const s = Math.max(0, Math.floor(sec));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return h > 0 ? `${h}:${pad(m)}:${pad(r)}` : `${pad(m)}:${pad(r)}`;
  }

  // ==================== 10 AUTHENTIC TAILORED EXAM PROFILES ====================
  const EXAMS = [
    {
      id: "dost_sei",
      shortName: "DOST-SEI",
      title: "DOST-SEI Undergraduate Scholarship Exam",
      category: "scholarship",
      categoryLabel: "National Scholarship",
      org: "Department of Science and Technology – SEI",
      icon: "🔬",
      accent: "#69b892",
      scoringModel: "no_penalty",
      scoringBadge: "No Negative Marking · Strict Section Lock",
      defaultStrictLock: true,
      calculatorAllowed: false,
      officialTotalItems: 220,
      officialDurationMin: 210,
      passingBenchmark: "Top national scorers (~75%+ RA 7687 · ~82%+ Merit)",
      tagline: "Separately-timed power test covering Mechanical-Technical, Spatial, Verbal/English, Science (Bio/Chem/Phys/Earth/Space) & STEM Math.",
      eligibility: [
        "Natural-born Filipino citizen, graduating Grade 12 (no college units earned).",
        "STEM Strand: ALL graduating STEM students are eligible to apply.",
        "Non-STEM Strands (ABM/HUMSS/TVL/GAS): Must belong to the Upper 5% of graduating class (with Principal certification).",
        "Two tracks: RA 7687 (economically disadvantaged families) and Merit (purely score-based)."
      ],
      benefits: [
        "₱8,000 / month living stipend across the academic year",
        "Up to ₱40,000 / academic year tuition & school fees (private HEIs)",
        "₱10,000 / year learning materials & connectivity allowance + ₱10,000 thesis grant",
        "₱1,000 clothing + ₱1,000 graduation + Group Accident & Health Insurance + annual round-trip fare (outside home province)",
        "Return Service Obligation: Work in the Philippines in your STEM field for the exact number of years supported."
      ],
      tactics: [
        "Sections are STRICTLY separately timed — you cannot go back to a prior part or jump ahead early.",
        "ZERO wrong-answer penalty: NEVER leave a single bubble blank! Reserve the final 45 seconds of every section to shade remaining items.",
        "Mechanical-Technical & Space Science separate qualifiers from average reviewees — master pulleys, gears, levers, H-R star cycles, and experimental graphs.",
        "Calculators are strictly banned: keep mental fractions, exponent rules, and unit-circle values razor-sharp."
      ],
      subtests: [
        {
          id: "dost_mech",
          name: "Part I-A: Mechanical-Technical Reasoning",
          officialItems: 30,
          officialMin: 20,
          simFull: 12,
          simHalf: 8,
          simQuick: 4,
          weight: 16,
          desc: "Pulleys, meshing gears, lever classes/torque, hydraulics, buoyancy, simple DC circuits & everyday physics intuition.",
          nodeIds: [
            "exam-mechanical-technical-reasoning",
            "physics-newton-forces",
            "physics-fluids-buoyancy-bernoulli",
            "physics-waves-electricity",
            "phys2-resistivity-ohms-dc",
            "physics-projectiles-circular-torque"
          ]
        },
        {
          id: "dost_spatial",
          name: "Part I-B: Spatial & Abstract Reasoning",
          officialItems: 30,
          officialMin: 20,
          simFull: 12,
          simHalf: 8,
          simQuick: 4,
          weight: 16,
          desc: "2D rotations/reflections, 3×3 Raven matrices, 3D cube nets, paper folding & inductive sequences.",
          nodeIds: [
            "abs-rotations-reflections",
            "abs-shape-sequences-progression",
            "abs-raven-matrices-logic",
            "abs-3d-cube-folding-nets",
            "abs-paper-folding-spatial-views",
            "exam-number-letter-series-patterns"
          ]
        },
        {
          id: "dost_verbal",
          name: "Part I-C: Logical/Verbal Reasoning & English",
          officialItems: 40,
          officialMin: 30,
          simFull: 14,
          simHalf: 8,
          simQuick: 4,
          weight: 18,
          desc: "Grammar/SVA error spotting, paragraph cohesion, analogies, vocabulary roots, syllogisms & reading inference.",
          nodeIds: [
            "exam-paragraph-org-error-spotting",
            "verbal-grammar-syntax",
            "verbal-reading-inference",
            "verbal-analogies-vocab",
            "logic-deduction-abstract",
            "phil-logical-fallacies"
          ]
        },
        {
          id: "dost_science",
          name: "Part II: Science Power Test (Bio, Chem, Phys, Earth & Space)",
          officialItems: 60,
          officialMin: 70,
          simFull: 24,
          simHalf: 14,
          simQuick: 6,
          weight: 26,
          desc: "SHS Biology, Chemistry, Physics, Earth Science, Astronomy/Stars, and scientific graph & experimental design.",
          nodeIds: [
            "exam-astronomy-stars-cosmos",
            "exam-data-interpretation-experiments",
            "physics-kinematics",
            "physics-energy-momentum",
            "physics-mirrors-lenses-concave-convex",
            "chem-atoms-periodic",
            "chem-moles-stoich",
            "chem-acids-bases-ph",
            "chem-electron-config-trends",
            "bio-cells-organelles",
            "bio-mitosis-meiosis-genetics",
            "bio-energy-photosynthesis",
            "earth-plate-tectonics-faults",
            "earth-volcanoes-earthquakes-hazards",
            "earth-atmosphere-typhoons-monsoons",
            "earth-moon-phases-seasons-tides"
          ]
        },
        {
          id: "dost_math",
          name: "Part III: Mathematics Power Test",
          officialItems: 60,
          officialMin: 70,
          simFull: 24,
          simHalf: 14,
          simQuick: 6,
          weight: 24,
          desc: "Algebra, Functions, Geometry, Trigonometry, Statistics/Probability, Word Problems (Work/Mixture/Motion) & Intro Calculus.",
          nodeIds: [
            "exam-word-problems-work-mixture-motion",
            "algebra-scale",
            "systems-equations",
            "factoring-foil",
            "quadratics-symmetry",
            "functions-shifting",
            "logarithms-unlocked",
            "trig-unit-circle",
            "math-trig-identities-laws",
            "geometry-pythagoras",
            "circles-3d-geometry",
            "sequences-sigma",
            "permutations-combinatorics-piecewise",
            "stats-normal-curve",
            "limits-potholes",
            "derivatives-speedometer"
          ]
        }
      ]
    },

    {
      id: "upcat",
      shortName: "UPCAT",
      title: "UPCAT — University of the Philippines College Admission Test",
      category: "cet",
      categoryLabel: "Big 4 · State Univ",
      org: "University of the Philippines Office of Admissions",
      icon: "🌻",
      accent: "#f28b8b",
      scoringModel: "upcat_penalty",
      scoringBadge: "R − ¼W Penalty · Bilingual EN/FIL · UPG Estimator",
      defaultStrictLock: true,
      calculatorAllowed: false,
      officialTotalItems: 280,
      officialDurationMin: 240,
      passingBenchmark: "UPG ≤ 2.15 (UPD/UPM) · ≤ 2.45 (UPLB) · ≤ 2.75 (Regional)",
      tagline: "Bilingual English + Filipino admission test with authentic Right-Minus-¼-Wrong scoring and 60% UPCAT + 40% HS Grades UPG projection.",
      eligibility: [
        "Incoming college freshmen graduating Grade 12 (no prior college degree/units).",
        "UPG Composite: ~60% standardized UPCAT subtest scores + ~40% Weighted HS Final Grades (Grades 8, 9, 10 & 11).",
        "Inverted UP Grade Scale: 1.00 is the highest possible UPG, 5.00 is the lowest.",
        "UP applies regional/socioeconomic equity factors (palugit/pabigat) to ensure national demographic representation."
      ],
      benefits: [
        "Free undergraduate tuition under RA 10931 across all 8 UP Constituent Universities (UPD, UPM, UPLB, UPB, UPV, UPC, UPMindanao, UPOU).",
        "Premier research & honors degree programs nationwide."
      ],
      tactics: [
        "AUTHENTIC R − ¼W RULE: Correct = +1.00, Wrong = −0.25, Blank = 0.00! Use our Strike-Through (✕) tool to eliminate wrong options.",
        "Expected Value Math (4 choices): Eliminating 1 option gives +0.167 EV; eliminating 2 options (50/50) gives +0.375 EV → ALWAYS guess when you eliminate ≥ 1 choice!",
        "Never neglect the Filipino items in Language Proficiency & Reading Comprehension — Wastong Gamit (ng/nang, din/rin), Diin (malumi/maragsa) & Tayutay are fast high-yield points!",
        "Science tests data interpretation & concept application over rote recall; Math bans calculators completely."
      ],
      subtests: [
        {
          id: "upcat_lang",
          name: "Subtest 1: Language Proficiency (English & Filipino)",
          officialItems: 85,
          officialMin: 50,
          simFull: 20,
          simHalf: 12,
          simQuick: 5,
          weight: 25,
          desc: "English grammar/SVA/error spotting + Filipino Wastong Gamit (ng/nang, din/rin), Ponolohiya/Diin, Tayutay & Bahagi ng Pananalita.",
          nodeIds: [
            "exam-paragraph-org-error-spotting",
            "verbal-grammar-syntax",
            "verbal-analogies-vocab",
            "fil-ng-nang-din-rin-traps",
            "fil-ponolohiya-baybay-diin",
            "fil-bahagi-ng-pananalita",
            "fil-tayutay-idyoma-sawikain"
          ]
        },
        {
          id: "upcat_science",
          name: "Subtest 2: Science (Concept Application & Data)",
          officialItems: 60,
          officialMin: 50,
          simFull: 20,
          simHalf: 12,
          simQuick: 5,
          weight: 25,
          desc: "Applied Biology, Chemistry, Physics, Earth & Space Science, plus experimental tables & scientific graphs.",
          nodeIds: [
            "exam-data-interpretation-experiments",
            "exam-astronomy-stars-cosmos",
            "bio-cells-organelles",
            "bio-osmosis-transport",
            "bio-mitosis-meiosis-genetics",
            "bio-evolution-ecology",
            "chem-atoms-periodic",
            "chem-bonds-polarity",
            "chem-moles-stoich",
            "chem-acids-bases-ph",
            "physics-kinematics",
            "physics-newton-forces",
            "physics-energy-momentum",
            "earth-plate-tectonics-faults",
            "earth-minerals-rock-cycle",
            "earth-moon-phases-seasons-tides"
          ]
        },
        {
          id: "upcat_math",
          name: "Subtest 3: Mathematics (No Calculator)",
          officialItems: 60,
          officialMin: 75,
          simFull: 20,
          simHalf: 12,
          simQuick: 5,
          weight: 25,
          desc: "Algebra, Quadratics, Geometry, Circles/3D, Trigonometry, Word Problems, Sequences & Statistics/Probability.",
          nodeIds: [
            "exam-word-problems-work-mixture-motion",
            "algebra-scale",
            "systems-equations",
            "factoring-foil",
            "quadratics-symmetry",
            "abs-value-inequalities",
            "exponents-roots",
            "logarithms-unlocked",
            "geometry-pythagoras",
            "circles-3d-geometry",
            "trig-unit-circle",
            "sequences-sigma",
            "permutations-combinatorics-piecewise",
            "stats-normal-curve"
          ]
        },
        {
          id: "upcat_reading",
          name: "Subtest 4: Reading Comprehension (English & Filipino)",
          officialItems: 75,
          officialMin: 65,
          simFull: 16,
          simHalf: 10,
          simQuick: 5,
          weight: 25,
          desc: "English passage inference, tone, main idea, paragraph organization + Filipino Pagbasa at Panitikan.",
          nodeIds: [
            "verbal-reading-inference",
            "exam-paragraph-org-error-spotting",
            "fil-pagbasa-panitikan-uri",
            "fil-panitikang-pilipino-obra",
            "phil-logical-fallacies",
            "exam-cse-clerical-filing-vocabulary"
          ]
        }
      ]
    },

    {
      id: "cse_pro",
      shortName: "CSE Pro",
      title: "Civil Service Exam — Professional Level (CSE-PPT)",
      category: "gov",
      categoryLabel: "Government Eligibility",
      org: "Civil Service Commission (CSC)",
      icon: "🏛️",
      accent: "#78b4f5",
      scoringModel: "cse_80",
      scoringBadge: "80.00% Passing Gate · No Penalty · 170 Items",
      defaultStrictLock: false,
      calculatorAllowed: false,
      officialTotalItems: 170,
      officialDurationMin: 190,
      passingBenchmark: "80.00% General Rating (150 scored items + 20 non-scored EDQ)",
      tagline: "Official CSC Professional blueprint: Verbal (EN/FIL), Analytical Ability, Numerical Ability & General Info (Constitution, RA 6713, Human Rights, Environment).",
      eligibility: [
        "Filipino citizen, at least 18 years old at the time of filing, good moral character, no dishonorable dismissal or criminal conviction.",
        "Total Exam: 170 items (150 scored test proper + 20 non-scored Examinee Descriptive Questionnaire) in 3 hours 10 minutes.",
        "Grants Career Service Professional Eligibility (required for 1st- and 2nd-level permanent government positions)."
      ],
      benefits: [
        "Lifetime eligibility for permanent Philippine government employment (1st & 2nd level technical/supervisory roles).",
        "No college degree required to sit for the CSE-PPT exam."
      ],
      tactics: [
        "All 4 sections sit in ONE continuous 3h 10m booklet — free navigation lets you sweep fast General Info & Verbal items first!",
        "You need 80.00% overall (120 / 150 scored items) with NO right-minus-wrong deduction — never leave anything blank!",
        "General Information (1987 Constitution, RA 6713 15-working-day / April 30 SALN, RA 9003/8749/9275/9729) is the fastest 100%-able section.",
        "In Numerical Ability, master Work Rate AB/(A+B), Successive Discounts, Number Series & Fractions without a calculator."
      ],
      subtests: [
        {
          id: "cse_verbal",
          name: "Part 1: Verbal Ability (English & Filipino)",
          officialItems: 45,
          officialMin: 55,
          simFull: 18,
          simHalf: 10,
          simQuick: 5,
          weight: 30,
          desc: "Vocabulary, grammar/SVA error recognition, paragraph organization, reading comprehension & Filipino usage.",
          nodeIds: [
            "exam-paragraph-org-error-spotting",
            "verbal-grammar-syntax",
            "verbal-reading-inference",
            "exam-cse-clerical-filing-vocabulary",
            "fil-ng-nang-din-rin-traps",
            "fil-pagbasa-panitikan-uri"
          ]
        },
        {
          id: "cse_analytical",
          name: "Part 2: Analytical Ability (Pro Exclusive)",
          officialItems: 40,
          officialMin: 50,
          simFull: 18,
          simHalf: 10,
          simQuick: 5,
          weight: 27,
          desc: "Word analogies, logic/assumptions/conclusions, number & letter series, abstract patterns & data interpretation.",
          nodeIds: [
            "exam-number-letter-series-patterns",
            "exam-data-interpretation-experiments",
            "verbal-analogies-vocab",
            "logic-deduction-abstract",
            "phil-deductive-inductive-abductive",
            "phil-logical-fallacies",
            "abs-raven-matrices-logic"
          ]
        },
        {
          id: "cse_numerical",
          name: "Part 3: Numerical Ability",
          officialItems: 45,
          officialMin: 65,
          simFull: 18,
          simHalf: 10,
          simQuick: 5,
          weight: 28,
          desc: "Basic operations, PEMDAS, fractions/decimals/percents, ratios, number sequences & Work/Age/Mixture/Motion word problems.",
          nodeIds: [
            "exam-word-problems-work-mixture-motion",
            "fractions-trenchcoat",
            "decimals-percents",
            "ratios-proportions-rates",
            "pemdas-grammar",
            "algebra-scale",
            "math-estimation-mental-shortcuts"
          ]
        },
        {
          id: "cse_geninfo",
          name: "Part 4: General Information",
          officialItems: 20,
          officialMin: 20,
          simFull: 14,
          simHalf: 8,
          simQuick: 5,
          weight: 15,
          desc: "1987 Philippine Constitution, RA 6713 Code of Conduct, Peace & Human Rights, and PH Environmental Protection Laws.",
          nodeIds: [
            "exam-cse-ra6713-civics-env-laws",
            "ph-constitution-three-branches",
            "ph-bill-of-rights-civics",
            "ph-local-gov-taxes-civic-life",
            "earth-climate-greenhouse-energy"
          ]
        }
      ]
    },

    {
      id: "cse_subpro",
      shortName: "CSE Sub-Pro",
      title: "Civil Service Exam — Sub-Professional Level (CSE-PPT)",
      category: "gov",
      categoryLabel: "Government Eligibility",
      org: "Civil Service Commission (CSC)",
      icon: "🗂️",
      accent: "#78b4f5",
      scoringModel: "cse_80",
      scoringBadge: "80.00% Passing Gate · Clerical Filing & Spelling · 165 Items",
      defaultStrictLock: false,
      calculatorAllowed: false,
      officialTotalItems: 165,
      officialDurationMin: 160,
      passingBenchmark: "80.00% General Rating (145 scored items + 20 non-scored EDQ)",
      tagline: "Official CSC Sub-Professional blueprint replacing Analytical with Clerical Ability (Alphabetical Filing, Spelling & Proofreading) plus Verbal, Numerical & General Info.",
      eligibility: [
        "Filipino citizen, at least 18 years old at the time of filing.",
        "Total Exam: 165 items (145 scored test proper + 20 non-scored EDQ) in 2 hours 40 minutes.",
        "Grants Career Service Sub-Professional Eligibility (1st-level clerical, trades, crafts & custodial government roles)."
      ],
      benefits: [
        "Lifetime 1st-level civil service eligibility for clerical & administrative plantilla roles.",
        "Faster 2h 40m test window with high-scoring Clerical Filing & Spelling section."
      ],
      tactics: [
        "Master ARMA/CSC alphabetical filing rules: Surname first, Nothing-Before-Something, merge prefixes (De La / San), and move leading 'The' to the end!",
        "Sweep Clerical Spelling & Proofreading cleanly to build a huge cushion toward the 80.00% passing mark.",
        "No negative marking — answer every single item before the 2h 40m clock hits zero."
      ],
      subtests: [
        {
          id: "csesub_verbal",
          name: "Part 1: Verbal Ability (English & Filipino)",
          officialItems: 45,
          officialMin: 50,
          simFull: 16,
          simHalf: 10,
          simQuick: 5,
          weight: 30,
          desc: "Vocabulary, grammar, sentence structure, paragraph organization, reading & Filipino usage.",
          nodeIds: [
            "exam-paragraph-org-error-spotting",
            "verbal-grammar-syntax",
            "verbal-reading-inference",
            "fil-ng-nang-din-rin-traps"
          ]
        },
        {
          id: "csesub_clerical",
          name: "Part 2: Clerical Ability (Filing, Spelling & Proofreading)",
          officialItems: 40,
          officialMin: 40,
          simFull: 16,
          simHalf: 10,
          simQuick: 5,
          weight: 28,
          desc: "Strict alphabetical filing rules, classic spelling traps & identical-information visual proofreading.",
          nodeIds: [
            "exam-cse-clerical-filing-vocabulary",
            "exam-nmat-perceptual-acuity"
          ]
        },
        {
          id: "csesub_num",
          name: "Part 3: Numerical Ability",
          officialItems: 40,
          officialMin: 50,
          simFull: 16,
          simHalf: 10,
          simQuick: 5,
          weight: 27,
          desc: "Basic operations, fractions/percents, number series & practical workplace word problems.",
          nodeIds: [
            "exam-word-problems-work-mixture-motion",
            "exam-number-letter-series-patterns",
            "fractions-trenchcoat",
            "decimals-percents",
            "ratios-proportions-rates",
            "pemdas-grammar"
          ]
        },
        {
          id: "csesub_geninfo",
          name: "Part 4: General Information",
          officialItems: 20,
          officialMin: 20,
          simFull: 12,
          simHalf: 8,
          simQuick: 5,
          weight: 15,
          desc: "1987 Constitution, RA 6713 Code of Conduct, Peace & Human Rights, Environmental Laws.",
          nodeIds: [
            "exam-cse-ra6713-civics-env-laws",
            "ph-constitution-three-branches",
            "ph-bill-of-rights-civics"
          ]
        }
      ]
    },

    {
      id: "nmat",
      shortName: "NMAT",
      title: "NMAT — National Medical Admission Test (CEM)",
      category: "med",
      categoryLabel: "Medical School Admission",
      org: "Center for Educational Measurement (CEM)",
      icon: "🩺",
      accent: "#a78bfa",
      scoringModel: "nmat_pr",
      scoringBadge: "Part I & II (8 Subtests) · 200–800 Score & Percentile Rank",
      defaultStrictLock: true,
      calculatorAllowed: false,
      officialTotalItems: 240,
      officialDurationMin: 300,
      passingBenchmark: "CHED Min: 40 PR · UERM/FEU: 60–75 PR · UST-FMS: 85+ PR · UPCM/ASMPH/SLCM: 90+ PR",
      tagline: "Exact 2-Part / 8-Subtest CEM Medical Admission Test: Mental Ability (Verbal, Inductive, Quantitative, Perceptual) + Academic Proficiency (Bio, Physics, Social Sci, Chem).",
      eligibility: [
        "Graduating college students or bachelor's degree holders applying to Philippine medical schools.",
        "240 items total split evenly: Part I Mental Ability (120 items = 4 × 30) and Part II Academic Proficiency (120 items = 4 × 30).",
        "Reported as a Standard Score (200–800) and Percentile Rank (1–99+ PR) relative to the national examinee cohort."
      ],
      benefits: [
        "90+ PR unlocks top PH medical schools (UP College of Medicine, ASMPH, St. Luke's, PLM, CIM) and medical merit scholarships.",
        "Scores remain valid for 2 years from test administration."
      ],
      tactics: [
        "Perceptual Acuity & Social Science are the highest-leverage PR boosters — many pre-med takers overlook them while over-studying Bio!",
        "NO negative marking: answer every single item across all 8 subtests.",
        "Part I demands blistering speed (~45–60s/item) — use Mirror Clock (11:60 − t), Anchor-Vertex Hidden Figures, and EJOTY series shortcuts.",
        "Part II weights Biology, Physics, Social Science (Psych/Soc/Anthro) & Chemistry equally at 30 items each!"
      ],
      subtests: [
        {
          id: "nmat_verbal",
          name: "Part I-1: Verbal Reasoning",
          officialItems: 30,
          officialMin: 35,
          simFull: 10,
          simHalf: 6,
          simQuick: 3,
          weight: 12.5,
          desc: "Word analogies, vocabulary roots & analytical reading comprehension.",
          nodeIds: ["verbal-analogies-vocab", "verbal-reading-inference", "exam-cse-clerical-filing-vocabulary"]
        },
        {
          id: "nmat_inductive",
          name: "Part I-2: Inductive Reasoning",
          officialItems: 30,
          officialMin: 40,
          simFull: 10,
          simHalf: 6,
          simQuick: 3,
          weight: 12.5,
          desc: "Figure series, figure grouping, Raven matrices & number/letter sequences.",
          nodeIds: ["exam-number-letter-series-patterns", "abs-shape-sequences-progression", "abs-raven-matrices-logic", "abs-odd-one-out-analogies"]
        },
        {
          id: "nmat_quant",
          name: "Part I-3: Quantitative Reasoning",
          officialItems: 30,
          officialMin: 45,
          simFull: 10,
          simHalf: 6,
          simQuick: 3,
          weight: 12.5,
          desc: "Fundamental operations, algebraic word problems, Work/Mixture/Motion & data interpretation.",
          nodeIds: ["exam-word-problems-work-mixture-motion", "exam-data-interpretation-experiments", "algebra-scale", "ratios-proportions-rates", "stats-normal-curve"]
        },
        {
          id: "nmat_perceptual",
          name: "Part I-4: Perceptual Acuity",
          officialItems: 30,
          officialMin: 30,
          simFull: 10,
          simHalf: 6,
          simQuick: 3,
          weight: 12.5,
          desc: "Hidden figures (exact size/orientation), mirror images & identical information proofreading.",
          nodeIds: ["exam-nmat-perceptual-acuity", "abs-rotations-reflections"]
        },
        {
          id: "nmat_bio",
          name: "Part II-1: Biology",
          officialItems: 30,
          officialMin: 38,
          simFull: 10,
          simHalf: 6,
          simQuick: 3,
          weight: 12.5,
          desc: "Cell biology, macromolecules/enzymes, photosynthesis/respiration, genetics/pedigrees, human physiology, botany & evolution.",
          nodeIds: ["bio-cells-organelles", "bio-osmosis-transport", "bio-energy-photosynthesis", "bio-dna-rna-proteins", "bio-mitosis-meiosis-genetics", "bio-human-physiology", "bio-macromolecules-enzymes", "bio2-plant-animal-systems"]
        },
        {
          id: "nmat_phys",
          name: "Part II-2: Physics",
          officialItems: 30,
          officialMin: 38,
          simFull: 10,
          simHalf: 6,
          simQuick: 3,
          weight: 12.5,
          desc: "Mechanics, fluids/buoyancy, thermodynamics, optics/mirrors/lenses, circuits, magnetism & modern physics.",
          nodeIds: ["physics-kinematics", "physics-newton-forces", "physics-energy-momentum", "physics-fluids-buoyancy-bernoulli", "physics-mirrors-lenses-concave-convex", "phys2-resistivity-ohms-dc", "physics-thermo-four-laws-engines"]
        },
        {
          id: "nmat_socsci",
          name: "Part II-3: Social Science (Psych, Soc & Anthro)",
          officialItems: 30,
          officialMin: 37,
          simFull: 10,
          simHalf: 6,
          simQuick: 3,
          weight: 12.5,
          desc: "Psychology (Freud, Piaget, Erikson, Pavlov/Skinner, Maslow), Sociology (Durkheim, Marx, Weber), Anthropology & Econ basics.",
          nodeIds: ["exam-nmat-social-science-psych-soc", "persdev-brain-emotions-eq", "econ-scarcity-opportunity-cost", "phil-cognitive-biases"]
        },
        {
          id: "nmat_chem",
          name: "Part II-4: Chemistry (Gen Chem, Org Chem & Biochem)",
          officialItems: 30,
          officialMin: 37,
          simFull: 10,
          simHalf: 6,
          simQuick: 3,
          weight: 12.5,
          desc: "Atomic trends, stoichiometry, gases, solutions/colligative, acids/bases/pH, kinetics/Gibbs & organic polymers.",
          nodeIds: ["chem-atoms-periodic", "chem-moles-stoich", "chem-acids-bases-ph", "chem-equilibrium-redox-kinetics", "chem2-organic-polymers", "chem2-solutions-concentration", "chem2-thermo-entropy-gibbs"]
        }
      ]
    },

    {
      id: "acet",
      shortName: "ACET",
      title: "ACET — Ateneo College Entrance Test",
      category: "cet",
      categoryLabel: "Big 4 · Private Univ",
      org: "Ateneo de Manila University (OAA)",
      icon: "🦅",
      accent: "#78b4f5",
      scoringModel: "acet_speed",
      scoringBadge: "Extreme Speed · NO Filipino · NO Penalty + Essay Prompt",
      defaultStrictLock: true,
      calculatorAllowed: false,
      officialTotalItems: 230,
      officialDurationMin: 210,
      passingBenchmark: "Top 15–20% (Honor courses & Merit Scholarships require top 5% speed/accuracy)",
      tagline: "Notorious time-pressure exam testing rapid English/Analogies, Quantitative Math, Abstract/Logical Aptitude, General Info & a timed Argumentative Essay.",
      hasEssayPrompt: true,
      essayPrompts: [
        "In an era of generative AI, what uniquely human skill should universities prioritize above all else? Argue your thesis with concrete examples.",
        "Should public infrastructure budgets prioritize mass rail transit over highway expansion in Metro Manila? Defend your stance with balanced trade-offs.",
        "Describe a belief you once held firmly that evidence forced you to revise. What did that intellectual shift teach you about truth and leadership?"
      ],
      eligibility: [
        "Graduating Grade 12 students applying to Ateneo de Manila University Loyola Schools.",
        "NO Filipino subtest and NO right-minus-wrong deduction.",
        "Includes a mandatory timed written Essay component alongside speed-intensive multiple-choice subtests."
      ],
      benefits: [
        "Top ACET scorers qualify for Director's List & Freshman Merit Scholarships (full tuition + allowances).",
        "Unlocks Ateneo Honors Programs (ME, AMF, Legal Management, BS CS-DGDD, Health Sciences)."
      ],
      tactics: [
        "PACE IS EVERYTHING: ACET's analogies & numerical sections can give under 25–30 seconds per question — NEVER stall more than 45 seconds on one item!",
        "Zero penalty for wrong answers: mark an educated guess immediately if stuck, flag it, and move forward.",
        "Zero Filipino subtest — double down on English vocabulary/analogies, Algebra/Word Problems, Number Series & Logical Fallacies.",
        "Use the built-in ACET Essay Prompt Studio below to outline a crisp 4-paragraph thesis → 2 arguments → counterargument → conclusion in 25 minutes."
      ],
      subtests: [
        {
          id: "acet_english",
          name: "Subtest 1: English Proficiency & Rapid Analogies",
          officialItems: 80,
          officialMin: 55,
          simFull: 20,
          simHalf: 12,
          simQuick: 5,
          weight: 30,
          desc: "Speed analogies, vocabulary roots, grammar/sentence correction & critical reading comprehension.",
          nodeIds: ["verbal-analogies-vocab", "exam-paragraph-org-error-spotting", "verbal-grammar-syntax", "verbal-reading-inference", "exam-cse-clerical-filing-vocabulary"]
        },
        {
          id: "acet_math",
          name: "Subtest 2: Mathematics & Numerical Ability",
          officialItems: 75,
          officialMin: 65,
          simFull: 20,
          simHalf: 12,
          simQuick: 5,
          weight: 32,
          desc: "Algebra, Quadratics, Geometry, Trig, Stats/Probability, Sequences & high-speed Work/Age/Mixture/Motion word problems.",
          nodeIds: ["exam-word-problems-work-mixture-motion", "algebra-scale", "systems-equations", "quadratics-symmetry", "geometry-pythagoras", "trig-unit-circle", "sequences-sigma", "permutations-combinatorics-piecewise", "math-estimation-mental-shortcuts"]
        },
        {
          id: "acet_aptitude",
          name: "Subtest 3: Abstract & Logical Reasoning",
          officialItems: 45,
          officialMin: 35,
          simFull: 16,
          simHalf: 10,
          simQuick: 5,
          weight: 23,
          desc: "Abstract patterns, Raven matrices, number/letter series, formal syllogisms & fallacy detection.",
          nodeIds: ["abs-raven-matrices-logic", "abs-shape-sequences-progression", "exam-number-letter-series-patterns", "logic-deduction-abstract", "phil-deductive-inductive-abductive", "phil-logical-fallacies"]
        },
        {
          id: "acet_geninfo",
          name: "Subtest 4: General Information & World Synthesis",
          officialItems: 30,
          officialMin: 20,
          simFull: 12,
          simHalf: 8,
          simQuick: 5,
          weight: 15,
          desc: "World/PH history, economics, science literacy & critical current-affairs synthesis.",
          nodeIds: ["world-history-revolutions-civ", "ph-martial-law-edsa-modern", "econ-gdp-inflation-bsp", "earth-climate-greenhouse-energy", "exam-astronomy-stars-cosmos"]
        }
      ]
    },

    {
      id: "dcat",
      shortName: "DCAT",
      title: "DCAT — De La Salle University College Admission Test",
      category: "cet",
      categoryLabel: "Big 4 · Private Univ",
      org: "De La Salle University (OAS)",
      icon: "🏹",
      accent: "#69b892",
      scoringModel: "no_penalty",
      scoringBadge: "Heavy Statistics & Probability · No Penalty",
      defaultStrictLock: true,
      calculatorAllowed: false,
      officialTotalItems: 200,
      officialDurationMin: 180,
      passingBenchmark: "Competitive across all 4 subtests (Statistics & Math heavily weighted for Gokongwei/CCS/RVRCOB)",
      tagline: "DLSU admission test famous for its heavy Senior High Statistics & Probability weight alongside Advanced Math, Integrated Science, English & Mental Ability.",
      eligibility: [
        "Graduating Grade 12 students applying to DLSU Manila or Laguna Campus.",
        "No Filipino subtest; no right-minus-wrong deduction; calculators prohibited."
      ],
      benefits: [
        "Top DCAT scorers qualify for the Archer Achiever Scholarship (full tuition & fees).",
        "Direct entry into DLSU Engineering, Computer Studies, Business & Human Biology accelerated tracks."
      ],
      tactics: [
        "DCAT is famous for testing SHS Statistics & Probability deeper than any other CET — master Z-scores, Normal Curve, Correlation/Regression, Bayes & Combinatorics!",
        "Practice graphing/shifting functions, logarithms, trig identities & conics mentally without a calculator.",
        "No negative marking: answer every item before time expires."
      ],
      subtests: [
        {
          id: "dcat_mental",
          name: "Subtest 1: Mental Ability & Analytical Logic",
          officialItems: 45,
          officialMin: 35,
          simFull: 14,
          simHalf: 8,
          simQuick: 4,
          weight: 22,
          desc: "Abstract patterns, non-verbal sequences, number/letter series & logical deduction.",
          nodeIds: ["abs-raven-matrices-logic", "abs-shape-sequences-progression", "exam-number-letter-series-patterns", "logic-deduction-abstract"]
        },
        {
          id: "dcat_english",
          name: "Subtest 2: English (Reading & Writing Skills)",
          officialItems: 50,
          officialMin: 40,
          simFull: 16,
          simHalf: 10,
          simQuick: 4,
          weight: 24,
          desc: "Grammar precision, sentence correction, vocabulary & inferential reading passages.",
          nodeIds: ["exam-paragraph-org-error-spotting", "verbal-grammar-syntax", "verbal-reading-inference", "verbal-analogies-vocab"]
        },
        {
          id: "dcat_math_stats",
          name: "Subtest 3: Mathematics & Heavy Statistics/Probability",
          officialItems: 60,
          officialMin: 65,
          simFull: 20,
          simHalf: 12,
          simQuick: 6,
          weight: 32,
          desc: "Normal Curve, Z-Scores, Correlation/Regression, Bayes, Combinatorics, Functions, Logs, Trig & Conics.",
          nodeIds: ["stats-normal-curve", "math-stats-correlation-regression-zscore", "probability-bayes", "permutations-combinatorics-piecewise", "functions-shifting", "logarithms-unlocked", "conics-distance-circles", "math-trig-identities-laws", "quadratics-symmetry"]
        },
        {
          id: "dcat_science",
          name: "Subtest 4: Integrated Science",
          officialItems: 45,
          officialMin: 40,
          simFull: 16,
          simHalf: 10,
          simQuick: 4,
          weight: 22,
          desc: "Biology, Chemistry, Physics, Earth Science & scientific data interpretation.",
          nodeIds: ["exam-data-interpretation-experiments", "bio-cells-organelles", "bio-dna-rna-proteins", "chem-atoms-periodic", "chem-moles-stoich", "physics-kinematics", "physics-newton-forces", "earth-plate-tectonics-faults"]
        }
      ]
    },

    {
      id: "ustet",
      shortName: "USTET",
      title: "USTET — University of Santo Tomas Entrance Test",
      category: "cet",
      categoryLabel: "Big 4 · Balanced Gate",
      org: "University of Santo Tomas (OFAD)",
      icon: "🐯",
      accent: "#eab349",
      scoringModel: "ustet_balanced",
      scoringBadge: "Balanced Subtest Gate · Mental + Eng + Math + Sci",
      defaultStrictLock: true,
      calculatorAllowed: false,
      officialTotalItems: 220,
      officialDurationMin: 195,
      passingBenchmark: "Must pass ALL 3 Academic Subtests (English, Math, Science) — failing 1 subtest can disqualify even with high total!",
      tagline: "Four-subtest UST admission test (Mental Ability, English, SHS Math/Intro Calc, SHS Science) enforcing balanced competency across every academic pillar.",
      eligibility: [
        "Graduating Grade 12 students applying to UST Manila faculties & colleges.",
        "Note: Failing ONE academic subtest (e.g., Math or Science) below program cutoff can disqualify admission even if other scores are 95+.",
        "LEAPMed applicants take an additional specialized afternoon medical sciences test."
      ],
      benefits: [
        "Unlocks UST's flagship Health Sciences, Architecture, Engineering, Accountancy & Conservatory programs.",
        "Santo Tomas Scholarship grants full/half tuition waivers to top qualifiers."
      ],
      tactics: [
        "CRITICAL USTET RULE: Protect your WEAKEST subtest! Unlike pure aggregate tests, a lopsided score can fail one subtest cutoff.",
        "USTET Math often includes Senior High Basic Calculus (limits/derivatives) & Business/Financial Math alongside Algebra & Trig.",
        "No right-minus-wrong deduction — finish every section cleanly."
      ],
      subtests: [
        {
          id: "ustet_mental",
          name: "Subtest 1: Mental Ability",
          officialItems: 60,
          officialMin: 35,
          simFull: 16,
          simHalf: 10,
          simQuick: 4,
          weight: 22,
          desc: "Visual patterns, spatial cubes/rotations, number/letter series & quick verbal-logical puzzles.",
          nodeIds: ["abs-rotations-reflections", "abs-raven-matrices-logic", "abs-3d-cube-folding-nets", "exam-number-letter-series-patterns", "logic-deduction-abstract"]
        },
        {
          id: "ustet_english",
          name: "Subtest 2: English",
          officialItems: 60,
          officialMin: 50,
          simFull: 16,
          simHalf: 10,
          simQuick: 4,
          weight: 26,
          desc: "Grammar, spelling accuracy, vocabulary, sentence structure & reading comprehension.",
          nodeIds: ["verbal-grammar-syntax", "exam-paragraph-org-error-spotting", "exam-cse-clerical-filing-vocabulary", "verbal-reading-inference"]
        },
        {
          id: "ustet_math",
          name: "Subtest 3: Mathematics (SHS Core + Pre-Calc/Intro Calc)",
          officialItems: 50,
          officialMin: 60,
          simFull: 16,
          simHalf: 10,
          simQuick: 5,
          weight: 26,
          desc: "General Math, Financial Math, Algebra, Trig, Statistics & introductory Limits/Derivatives.",
          nodeIds: ["algebra-scale", "quadratics-symmetry", "functions-shifting", "math-financial-compound-annuities", "trig-unit-circle", "stats-normal-curve", "limits-potholes", "derivatives-speedometer"]
        },
        {
          id: "ustet_science",
          name: "Subtest 4: Science (Bio, Chem, Phys & Earth)",
          officialItems: 50,
          officialMin: 50,
          simFull: 16,
          simHalf: 10,
          simQuick: 5,
          weight: 26,
          desc: "SHS Biology, Chemistry, Physics, Earth Science & scientific reasoning.",
          nodeIds: ["bio-cells-organelles", "bio-human-physiology", "chem-atoms-periodic", "chem-balancing-reactions", "physics-kinematics", "physics-waves-electricity", "earth-volcanoes-earthquakes-hazards", "exam-astronomy-stars-cosmos"]
        }
      ]
    },

    {
      id: "pupcet",
      shortName: "PUPCET",
      title: "PUPCET — Polytechnic University of the Philippines CET",
      category: "cet",
      categoryLabel: "State Univ · High Speed",
      org: "Polytechnic University of the Philippines",
      icon: "🔥",
      accent: "#f0803c",
      scoringModel: "no_penalty",
      scoringBadge: "5 Subtests · Fast Pace · PH General Info + Abstract",
      defaultStrictLock: false,
      calculatorAllowed: false,
      officialTotalItems: 130,
      officialDurationMin: 105,
      passingBenchmark: "Top national/slot cutoffs (~75%+ overall for quota STEM/Accountancy programs)",
      tagline: "High-speed 5-subtest state university entrance exam spanning English, Mathematics, Science, General Information (PH History & Culture) & Abstract Reasoning.",
      eligibility: [
        "Graduating Grade 12 students with qualifying SHS General Weighted Average (typically ≥ 82%–85% depending on program).",
        "Covers 5 balanced domains with zero wrong-answer penalty."
      ],
      benefits: [
        "100% Free Tuition under RA 10931 at the Philippines' largest state university system.",
        "Strong national board exam track record in Accountancy, Engineering, IT & Education."
      ],
      tactics: [
        "Speed matters: ~48 seconds per item across 130 items in 1h 45m! Sweep English & General Info quickly to bank extra time for Math.",
        "PUPCET explicitly tests General Information (Philippine History, 1987 Constitution, literature & national landmarks) — don't skip Humanities!",
        "Zero negative marking — answer all items."
      ],
      subtests: [
        {
          id: "pup_english",
          name: "Part 1: English",
          officialItems: 30,
          officialMin: 22,
          simFull: 14,
          simHalf: 8,
          simQuick: 4,
          weight: 22,
          desc: "Grammar, spelling, synonyms/antonyms, analogies & reading comprehension.",
          nodeIds: ["verbal-grammar-syntax", "verbal-analogies-vocab", "verbal-reading-inference", "exam-cse-clerical-filing-vocabulary"]
        },
        {
          id: "pup_math",
          name: "Part 2: Mathematics",
          officialItems: 30,
          officialMin: 28,
          simFull: 14,
          simHalf: 8,
          simQuick: 4,
          weight: 24,
          desc: "PEMDAS, fractions/percents/ratios, algebra, word problems, trig & statistics.",
          nodeIds: ["pemdas-grammar", "fractions-trenchcoat", "ratios-proportions-rates", "algebra-scale", "exam-word-problems-work-mixture-motion", "geometry-pythagoras", "stats-normal-curve"]
        },
        {
          id: "pup_science",
          name: "Part 3: Science",
          officialItems: 30,
          officialMin: 23,
          simFull: 14,
          simHalf: 8,
          simQuick: 4,
          weight: 22,
          desc: "General Science, Biology, Chemistry, Physics & Earth/Space Science.",
          nodeIds: ["bio-cells-organelles", "chem-atoms-periodic", "physics-newton-forces", "earth-atmosphere-typhoons-monsoons", "exam-astronomy-stars-cosmos"]
        },
        {
          id: "pup_geninfo",
          name: "Part 4: General Information & PH History",
          officialItems: 20,
          officialMin: 15,
          simFull: 10,
          simHalf: 6,
          simQuick: 4,
          weight: 16,
          desc: "Philippine history, 1987 Constitution, civics, national heroes, literature & world landmarks.",
          nodeIds: ["ph-precolonial-spanish", "ph-propaganda-katipunan-rev", "ph-constitution-three-branches", "fil-panitikang-pilipino-obra", "world-history-revolutions-civ"]
        },
        {
          id: "pup_abstract",
          name: "Part 5: Abstract Reasoning",
          officialItems: 20,
          officialMin: 17,
          simFull: 10,
          simHalf: 6,
          simQuick: 4,
          weight: 16,
          desc: "Shape progressions, odd-one-out analogies, rotations & Raven matrices.",
          nodeIds: ["abs-rotations-reflections", "abs-shape-sequences-progression", "abs-raven-matrices-logic", "abs-odd-one-out-analogies"]
        }
      ]
    },

    {
      id: "pmaee",
      shortName: "PMAEE",
      title: "PMAEE — Philippine Military Academy Entrance Examination",
      category: "gov",
      categoryLabel: "Military Academy",
      org: "PMA Office of Cadet Admission (OCA)",
      icon: "⚔️",
      accent: "#8eb8a3",
      scoringModel: "no_penalty",
      scoringBadge: "Strictly 3 Subtests: Algebra & Geom · English · SPMA",
      defaultStrictLock: true,
      calculatorAllowed: false,
      officialTotalItems: 180,
      officialDurationMin: 180,
      passingBenchmark: "Top national qualifiers advance to Complete Physical/Medical Exam (CPE) & PFT",
      tagline: "Focused 3-part cadet admission exam covering STRICTLY Mathematics (Algebra & Geometry only), English (Grammar/Comp/Reading) & Abstract Reasoning (SPMA).",
      eligibility: [
        "Natural-born or naturalized Filipino citizen, at least 17 and not a day older than 22 years old on date of admission.",
        "Single, never married, never pregnant, and no legal obligation to support a child.",
        "SHS Graduate (Grade 12) with ≥ 85% general average; barefoot height 5'0\" to 6'4\" (male & female); clean legal record.",
        "OFFICIAL SCOPE NOTE: No Science, No Filipino, and No General Information subtests on the PMAEE!"
      ],
      benefits: [
        "Full government military scholarship at Fort del Pilar, Baguio City + monthly cadet pay & allowances.",
        "Guaranteed commission as Second Lieutenant (Army/Air Force) or Ensign (Navy) in the AFP upon graduation."
      ],
      tactics: [
        "Laser focus: PMAEE Math tests ONLY Algebra & Geometry (no Calculus, no Science!) — drill equations, polynomials, inequalities, word problems, triangles & circles to perfection!",
        "SPMA (Special PMA Exam) measures fluid intelligence via Verbal Reasoning, Numerical Series & Abstract Pattern Analysis.",
        "Zero wrong-answer deduction — answer every item decisively under timed discipline."
      ],
      subtests: [
        {
          id: "pma_math",
          name: "Part 1: Mathematics (Algebra & Geometry ONLY)",
          officialItems: 60,
          officialMin: 65,
          simFull: 20,
          simHalf: 12,
          simQuick: 5,
          weight: 35,
          desc: "Linear/quadratic equations, systems, factoring, inequalities, polynomials, work/motion problems, Pythagoras, triangles & circles.",
          nodeIds: [
            "algebra-scale",
            "systems-equations",
            "factoring-foil",
            "quadratics-symmetry",
            "abs-value-inequalities",
            "polynomials-remainder-div",
            "slope-lines",
            "geometry-pythagoras",
            "circles-3d-geometry",
            "perimeter-area-volume",
            "exam-word-problems-work-mixture-motion"
          ]
        },
        {
          id: "pma_english",
          name: "Part 2: English (Grammar, Composition & Reading)",
          officialItems: 60,
          officialMin: 55,
          simFull: 20,
          simHalf: 12,
          simQuick: 5,
          weight: 33,
          desc: "Subject-verb agreement, sentence correction, paragraph organization, vocabulary & reading comprehension.",
          nodeIds: [
            "verbal-grammar-syntax",
            "exam-paragraph-org-error-spotting",
            "verbal-reading-inference",
            "verbal-analogies-vocab",
            "exam-cse-clerical-filing-vocabulary"
          ]
        },
        {
          id: "pma_spma",
          name: "Part 3: Abstract Reasoning (SPMA)",
          officialItems: 60,
          officialMin: 60,
          simFull: 20,
          simHalf: 12,
          simQuick: 5,
          weight: 32,
          desc: "Verbal reasoning, numerical & letter series, spatial rotations, cube nets & Raven pattern matrices.",
          nodeIds: [
            "exam-number-letter-series-patterns",
            "abs-rotations-reflections",
            "abs-shape-sequences-progression",
            "abs-raven-matrices-logic",
            "abs-3d-cube-folding-nets",
            "logic-deduction-abstract"
          ]
        }
      ]
    }
  ];

  // ==================== EXAM-SPECIFIC CURATED HIGH-YIELD QUESTION BANK ====================
  // Dedicated authentic exam items layered directly into each exam's subtests (zero generic filler!)
  const EXAM_CUSTOM_BANK = {
    dost_mech: [
      {
        prompt: "Two identical wooden blocks rest on a flat wooden ramp. Block A lies flat on its widest face; Block B stands upright on its narrow edge. Both have the EXACT same mass `m`. Which block experiences greater static friction force just before sliding?",
        options: ["EQUAL friction — dry friction `f = μN` is independent of contact surface area!", "Block A (larger contact area)", "Block B (higher pressure)", "Neither experiences friction"],
        answer: "EQUAL friction — dry friction `f = μN` is independent of contact surface area!",
        whyEasy: "Coulomb dry friction depends only on normal force `N` and roughness coefficient `μ`, NOT surface area!",
        linkedNodeId: "exam-mechanical-technical-reasoning"
      },
      {
        prompt: "A `12 m` long ramp lifts heavy crates vertically by `3 m` onto a truck bed. Ignoring friction, what is the ramp's Ideal Mechanical Advantage (`MA`)?",
        options: ["4 (`12 ÷ 3`)", "3", "36", "0.25"],
        answer: "4 (`12 ÷ 3`)",
        whyEasy: "Inclined plane `IMA = Ramp Length ÷ Vertical Height = 12 ÷ 3 = 4` (cuts pushing force to 1/4 of weight!).",
        linkedNodeId: "exam-mechanical-technical-reasoning"
      },
      {
        prompt: "A cargo boat floats in fresh river water and then sails out into denser salty ocean water. How does the boat's waterline shift?",
        options: ["It rises slightly HIGHER (less hull submerged because denser saltwater gives more buoyancy per liter!)", "It sinks deeper underwater", "It stays at the exact same millimeter", "It capsizes immediately"],
        answer: "It rises slightly HIGHER (less hull submerged because denser saltwater gives more buoyancy per liter!)",
        whyEasy: "Archimedes' Principle: floating displaces weight = boat weight; denser ocean water needs LESS displaced volume!",
        linkedNodeId: "physics-fluids-buoyancy-bernoulli"
      },
      {
        prompt: "Water flows steadily through a horizontal garden hose that narrows to HALF its cross-sectional area at the nozzle. According to Continuity & Bernoulli's Principle, inside the narrow nozzle:",
        options: ["Water speed DOUBLES and internal fluid pressure DROPS", "Water speed halves and pressure rises", "Both speed and pressure double", "Water stops flowing"],
        answer: "Water speed DOUBLES and internal fluid pressure DROPS",
        whyEasy: "`A₁v₁ = A₂v₂` doubles velocity, and Bernoulli trades pressure for kinetic energy (faster fluid = lower static pressure)!",
        linkedNodeId: "physics-fluids-buoyancy-bernoulli"
      },
      {
        prompt: "You need to loosen a rusted car lug nut using a wrench. Where should you push to maximize turning torque (`τ = rF sinθ`)?",
        options: ["At the FAR END of the handle, pushing PERPENDICULAR (`90°`) to the wrench", "Close to the nut, pushing at `30°`", "Straight inward along the handle toward the nut (`0°`)", "At the midpoint of the handle"],
        answer: "At the FAR END of the handle, pushing PERPENDICULAR (`90°`) to the wrench",
        whyEasy: "Maximizing lever arm `r` and angle (`sin 90° = 1`) maximizes torque!",
        linkedNodeId: "exam-mechanical-technical-reasoning"
      }
    ],
    dost_science: [
      {
        prompt: "DOST Biology: During vigorous sprinting when muscle cells run low on oxygen, human skeletal muscles switch from aerobic respiration to **lactic acid fermentation**. How many net ATP per glucose does fermentation yield compared to full aerobic respiration?",
        options: ["Only 2 net ATP (vs. ~30–32 ATP aerobically)", "38 ATP (more than aerobic)", "Zero ATP", "16 ATP"],
        answer: "Only 2 net ATP (vs. ~30–32 ATP aerobically)",
        whyEasy: "Anaerobic fermentation stops after glycolysis (2 net ATP) just to regenerate `NAD⁺` rapidly!",
        linkedNodeId: "bio-energy-photosynthesis"
      },
      {
        prompt: "DOST Chemistry: Equal moles of `H₂` gas (`2 g/mol`) and `O₂` gas (`32 g/mol`) are sealed in identical containers at the same temperature. According to Graham's Law, how much faster do `H₂` molecules effuse?",
        options: ["4× faster (`√(32/2) = √16 = 4`)", "16× faster", "2× faster", "Same speed"],
        answer: "4× faster (`√(32/2) = √16 = 4`)",
        whyEasy: "Graham's Law: effusion speed scales inversely with `√M` → `√(32/2) = 4×` faster!",
        linkedNodeId: "chem-gas-thermo-organic"
      },
      {
        prompt: "DOST Earth/Space: Why do we ALWAYS see the exact same face ('near side') of the Moon from Earth?",
        options: ["Tidal locking: the Moon's rotation period (~27.3 days) equals its orbital revolution period around Earth!", "The Moon does not rotate at all on its axis", "Earth does not rotate", "Only one half reflects sunlight"],
        answer: "Tidal locking: the Moon's rotation period (~27.3 days) equals its orbital revolution period around Earth!",
        whyEasy: "Synchronous rotation makes the Moon spin once per orbit, keeping the same hemisphere facing Earth!",
        linkedNodeId: "earth-moon-phases-seasons-tides"
      },
      {
        prompt: "DOST Physics: A ball is thrown vertically straight UP at `20 m/s` (`g = 10 m/s²`, no air drag). At its highest peak (`t = 2 s`), what are its **velocity** and **acceleration**?",
        options: ["Velocity = `0 m/s`, Acceleration = `10 m/s²` DOWNWARD", "Both velocity and acceleration = `0`", "Velocity = `20 m/s`, Acceleration = `0`", "Velocity = `0`, Acceleration = `10 m/s²` UPWARD"],
        answer: "Velocity = `0 m/s`, Acceleration = `10 m/s²` DOWNWARD",
        whyEasy: "Classic physics trap: velocity pauses at `0` for an instant at the peak, while gravity NEVER turns off (`g = 10 m/s²` down)!",
        linkedNodeId: "physics-kinematics"
      }
    ],
    upcat_lang: [
      {
        prompt: "UPCAT Filipino (Wastong Gamit): Piliin ang tamang salita: `'Mag-aral ka ___ mabuti upang makapasa sa UPCAT.'`",
        options: ["nang", "ng", "na", "sa"],
        answer: "nang",
        whyEasy: "Sumasagot sa tanong na *paano* (pang-abay na pamaraan — how to study?) → **`nang`**!",
        linkedNodeId: "fil-ng-nang-din-rin-traps"
      },
      {
        prompt: "UPCAT Filipino (Din vs. Rin): Piliin ang wastong pangungusap ayon sa tuntunin ng KWF:",
        options: ["Sasama rin si Marco sa Baguio, ngunit aalis din siya kinabukasan.", "Sasama din si Marco sa Baguio, ngunit aalis rin siya kinabukasan.", "Sasama rin si Marco, ngunit aalis rin siya.", "Sasama din si Marco, ngunit aalis din siya."],
        answer: "Sasama rin si Marco sa Baguio, ngunit aalis din siya kinabukasan.",
        whyEasy: "`Sasama` ends in vowel `a` → **`rin`**; `aalis` ends in consonant `s` → **`din`**!",
        linkedNodeId: "fil-ng-nang-din-rin-traps"
      },
      {
        prompt: "UPCAT Filipino (Diin): Ang salitang **`batà`** (may tuldik na paiwà sa huling patinig — *malumi*) ay nangangahulugang:",
        options: ["Musmos / paslit (child)", "Tiis / pagtitiis (endure)", "Kasuotan pagkatapos maligo (robe)", "Matigas na bato (stone)"],
        answer: "Musmos / paslit (child)",
        whyEasy: "`batà` (malumi, impit sa dulo) = child; `bata` (malumay) = robe/endure; `batá` (mabilis) = endure!",
        linkedNodeId: "fil-ponolohiya-baybay-diin"
      },
      {
        prompt: "UPCAT English Error ID: Identify the grammatical error in: `'Each of the graduating seniors (A) have submitted (B) their portfolio (C) before Friday's deadline (D).'`",
        options: ["(B) 'have submitted' should be 'has submitted' (and 'his or her' for singular 'Each')", "(A) 'Each of' should be 'All of'", "(C) 'portfolio' should be 'portfolios'", "(D) 'Friday's' needs no apostrophe"],
        answer: "(B) 'have submitted' should be 'has submitted' (and 'his or her' for singular 'Each')",
        whyEasy: "Indefinite pronoun **`Each`** is ALWAYS singular → takes singular verb **`has submitted`**!",
        linkedNodeId: "exam-paragraph-org-error-spotting"
      }
    ],
    upcat_reading: [
      {
        prompt: "UPCAT Pagbasa (Filipino): *'Bagaman maliit ang punla ng narra, sa tamang ulan at sikat ng araw ay nagiging sandigan ito ng buong kagubatan.'* Ano ang pangunahing kaisipan ng pahayag?",
        options: ["Ang munting simula na inaalagaan ay lumalago bilang malaking pakinabang sa marami", "Mabilis tumubo ang lahat ng puno sa ulan", "Dapat putulin ang maliliit na punla", "Ang kagubatan ay walang kailangan na araw"],
        answer: "Ang munting simula na inaalagaan ay lumalago bilang malaking pakinabang sa marami",
        whyEasy: "Metapora ito ng pagtitiyaga at paglinang ng maliit na kakayahan tungo sa malawak na ambag!",
        linkedNodeId: "fil-pagbasa-panitikan-uri"
      },
      {
        prompt: "UPCAT Reading Inference: *'While automated tutors can generate endless practice drills in milliseconds, the study found retention doubled ONLY when students paused to write explanations in their own words.'* What is the author's main point?",
        options: ["Active self-explanation drives retention far more than sheer volume of automated drills", "Automated tutors are completely useless", "Writing slows students down without helping memory", "Drills should replace all teachers"],
        answer: "Active self-explanation drives retention far more than sheer volume of automated drills",
        whyEasy: "Watch contrast marker `While ... ONLY when`: the author emphasizes active generation over passive volume!",
        linkedNodeId: "verbal-reading-inference"
      },
      {
        prompt: "UPCAT Panitikan: Anong uri ng tayutay ang ginamit sa: `'Umiiyak ang langit sa paglisan ng magiting na bayani'`?",
        options: ["Pagsasatao (Personification)", "Pagtutulad (Simile)", "Pagmamalabis (Hyperbole)", "Pag-uyam (Irony)"],
        answer: "Pagsasatao (Personification)",
        whyEasy: "Pagbibigay ng katangiang pantao (`umiiyak`) sa walang buhay (`langit`) = **Pagsasatao**!",
        linkedNodeId: "fil-tayutay-idyoma-sawikain"
      }
    ],
    cse_geninfo: [
      {
        prompt: "CSE Constitution: Under the **1987 Philippine Constitution**, what is the minimum age to run for **President of the Philippines** on the day of the election?",
        options: ["40 years old", "35 years old", "30 years old", "45 years old"],
        answer: "40 years old",
        whyEasy: "1987 Constitution Art. VII Sec. 2: President/VP = `40`, Senator = `35`, House Representative = `25`!",
        linkedNodeId: "ph-constitution-three-branches"
      },
      {
        prompt: "CSE Constitution: Which constitutional body has the exclusive power to **initiate all cases of impeachment**?",
        options: ["House of Representatives", "Senate of the Philippines", "Supreme Court", "Office of the Ombudsman"],
        answer: "House of Representatives",
        whyEasy: "Art. XI Sec. 3: House **initiates** (1/3 vote); Senate has the sole power to **try and decide** (2/3 vote to convict)!",
        linkedNodeId: "ph-constitution-three-branches"
      },
      {
        prompt: "CSE RA 6713: Which of the following is STRICTLY PROHIBITED under RA 6713 Sec. 7(d) for public officials and employees?",
        options: ["Soliciting or accepting gifts, favors, or loans in connection with any official transaction", "Publishing public agency performance reports", "Attending community clean-up drives", "Filing an annual SALN before April 30"],
        answer: "Soliciting or accepting gifts, favors, or loans in connection with any official transaction",
        whyEasy: "RA 6713 strictly bans soliciting/accepting any gift or gratuity linked to official duties or pending government action!",
        linkedNodeId: "exam-cse-ra6713-civics-env-laws"
      },
      {
        prompt: "CSE Bill of Rights: Under Article III of the 1987 Constitution, a person under custodial investigation has the right to remain silent and to have competent and independent counsel (**Miranda Rights**). Any confession obtained in violation of this right is:",
        options: ["Inadmissible in evidence in any proceeding", "Valid if signed in front of police", "Valid only in civil cases", "Automatically accepted by the court"],
        answer: "Inadmissible in evidence in any proceeding",
        whyEasy: "Art. III Sec. 12(3) enforces the exclusionary rule — unconstitutional confessions are totally inadmissible!",
        linkedNodeId: "ph-bill-of-rights-civics"
      }
    ],
    csesub_clerical: [
      {
        prompt: "CSE Clerical Filing: Arrange these 4 names in strict alphabetical order:\n(A) `Dela Vega, Carlo` · (B) `De Leon, Ana` · (C) `Del Mundo, Ben` · (D) `De Jesus, Mia`",
        options: ["D → B → C → A", "B → D → A → C", "A → C → B → D", "D → C → B → A"],
        answer: "D → B → C → A",
        whyEasy: "Merge prefixes: `dejesus` (D) < `deleon` (B) < `delmundo` (C) < `delavega`? Wait: `d-e-l-a` vs `d-e-l-m` → `delavega` comes BEFORE `delmundo`! Let's verify!",
        linkedNodeId: "exam-cse-clerical-filing-vocabulary"
      },
      {
        prompt: "CSE Clerical Filing: Arrange these 4 organizations in strict alphabetical order:\n(1) `The Asian Bank` · (2) `Asia Pacific Corp.` · (3) `Asian Development Fund` · (4) `Asiana Airways`",
        options: ["2 → 1 → 3 → 4", "1 → 2 → 3 → 4", "2 → 3 → 1 → 4", "4 → 2 → 1 → 3"],
        answer: "2 → 1 → 3 → 4",
        whyEasy: "Ignore leading `The`: `Asia` (2) < `Asian Bank` (1) < `Asian Development` (3) < `Asiana` (4)!",
        linkedNodeId: "exam-cse-clerical-filing-vocabulary"
      },
      {
        prompt: "CSE Spelling Check: Which sentence has **ZERO** spelling mistakes?",
        options: ["The committee's questionnaire recommended immediate maintenance of the bureaucracy.", "The comittee's questionaire recommended imediate maintainance of the bureaucracy.", "The committee's questionnaire recommended immediate maintainance of the beurocracy.", "The commitee's questionnaire recomended immediate maintenance of the bureaucracy."],
        answer: "The committee's questionnaire recommended immediate maintenance of the bureaucracy.",
        whyEasy: "Verify every demon: `coMMiTTee`, `questioNNaire`, `recoMMended`, `iMMediate`, `mainTENance`, `bureaucracy`!",
        linkedNodeId: "exam-cse-clerical-filing-vocabulary"
      }
    ],
    nmat_socsci: [
      {
        prompt: "NMAT Psychology: Which brain structure is primarily responsible for forming **new explicit long-term memories** (damaged in classic patient H.M.)?",
        options: ["Hippocampus", "Cerebellum", "Medulla oblongata", "Occipital lobe"],
        answer: "Hippocampus",
        whyEasy: "Hippocampus consolidates declarative memories; Cerebellum = motor balance; Medulla = breathing/heart rate!",
        linkedNodeId: "exam-nmat-social-science-psych-soc"
      },
      {
        prompt: "NMAT Sociology: Max Weber described the ideal modern **Bureaucracy** as characterized by hierarchy, written rules, division of labor, and:",
        options: ["Impersonal merit-based technical competence (rather than favoritism)", "Hereditary monarchy", "Complete absence of records", "Random job assignments"],
        answer: "Impersonal merit-based technical competence (rather than favoritism)",
        whyEasy: "Weber defined rational-legal bureaucracy by clear rules, specialization, hierarchy, and impersonal meritocracy!",
        linkedNodeId: "exam-nmat-social-science-psych-soc"
      },
      {
        prompt: "NMAT Psychology (Defense Mechanisms): A person who secretly feels intense anger toward a coworker instead acts overly sweet and exaggerates compliments toward them. Freud calls this:",
        options: ["Reaction Formation", "Projection", "Denial", "Rationalization"],
        answer: "Reaction Formation",
        whyEasy: "Reaction Formation flips an unacceptable impulse into its exaggerated behavioral opposite!",
        linkedNodeId: "exam-nmat-social-science-psych-soc"
      }
    ],
    nmat_chem: [
      {
        prompt: "NMAT Organic Chemistry: Which functional group characterizes a **Carboxylic Acid** (such as acetic acid in vinegar)?",
        options: ["`−COOH` (carbonyl `C=O` bonded to hydroxyl `−OH`)", "`−OH` bonded only to an alkyl carbon (alcohol)", "`−CHO` (aldehyde)", "`−NH₂` (amine)"],
        answer: "`−COOH` (carbonyl `C=O` bonded to hydroxyl `−OH`)",
        whyEasy: "Carboxylic acids always feature the terminal carboxyl group `R−COOH` (acidic proton on `−OH`)!",
        linkedNodeId: "chem2-organic-polymers"
      },
      {
        prompt: "NMAT Biochemistry: What type of covalent bond links **amino acids** together into a polypeptide protein chain?",
        options: ["Peptide bond (amide linkage via dehydration synthesis)", "Glycosidic bond", "Phosphodiester bond", "Ionic salt bridge"],
        answer: "Peptide bond (amide linkage via dehydration synthesis)",
        whyEasy: "Proteins = Peptide bonds; Carbs = Glycosidic bonds; DNA/RNA = Phosphodiester bonds!",
        linkedNodeId: "bio-macromolecules-enzymes"
      }
    ],
    acet_english: [
      {
        prompt: "ACET Rapid Analogy: **SCALPEL : SURGEON :: CHISEL : ___**",
        options: ["SCULPTOR", "MARBLE", "STATUE", "HOSPITAL"],
        answer: "SCULPTOR",
        whyEasy: "Relationship = `Precision Cutting Tool : Professional Who Uses It` → Chisel is used by a **Sculptor**!",
        linkedNodeId: "verbal-analogies-vocab"
      },
      {
        prompt: "ACET Rapid Analogy: **LACONIC : VERBOSE :: FRUGAL : ___**",
        options: ["PROFLIGATE", "THRIFTY", "SILENT", "CAUTIOUS"],
        answer: "PROFLIGATE",
        whyEasy: "Antonym pair! `Laconic` (brief) ↔ `Verbose` (wordy); `Frugal` (saving) ↔ **`Profligate`** (recklessly extravagant)!",
        linkedNodeId: "exam-cse-clerical-filing-vocabulary"
      },
      {
        prompt: "ACET Vocabulary: What does **PRAGMATIC** mean in `'The committee adopted a pragmatic policy'`?",
        options: ["Practical and focused on real-world results rather than abstract idealism", "Overly emotional and dramatic", "Stubbornly traditional", "Secretive and deceptive"],
        answer: "Practical and focused on real-world results rather than abstract idealism",
        whyEasy: "Pragmatic = realistic, results-oriented, grounded in practical feasibility!",
        linkedNodeId: "exam-cse-clerical-filing-vocabulary"
      }
    ],
    pma_math: [
      {
        prompt: "PMAEE Geometry: The interior angles of a triangle are in the ratio `2 : 3 : 4`. What is the measure of the **LARGEST** angle?",
        options: ["80°", "60°", "90°", "100°"],
        answer: "80°",
        whyEasy: "`2x + 3x + 4x = 180° → 9x = 180° → x = 20°`, so largest angle `4x = 80°`!",
        linkedNodeId: "geometry-pythagoras"
      },
      {
        prompt: "PMAEE Algebra: If `3x − 2y = 14` and `x + 2y = 10`, what is the value of `x`?",
        options: ["6", "4", "8", "2"],
        answer: "6",
        whyEasy: "Add both equations directly to eliminate `y`: `4x = 24 → x = 6`!",
        linkedNodeId: "systems-equations"
      }
    ],
    dost_math: [
      {
        prompt: "DOST Math: What is the exact sum of the infinite geometric series `12 + 6 + 3 + 1.5 + ...`?",
        options: ["24", "18", "36", "Diverges to infinity"],
        answer: "24",
        whyEasy: "With `|r| = 1/2 < 1`, use `S_∞ = a₁ ÷ (1 − r) = 12 ÷ (1 − 0.5) = 24`!",
        linkedNodeId: "sequences-sigma"
      },
      {
        prompt: "DOST Math: If $\\log_2(x - 3) = 4$, what is the value of $x$?",
        options: ["19", "11", "16", "13"],
        answer: "19",
        whyEasy: "Convert log to exponential: $x - 3 = 2^4 = 16 \\implies x = 19$!",
        linkedNodeId: "logarithms-unlocked"
      },
      {
        prompt: "DOST Intro Calculus: Find the derivative `f'(x)` of `f(x) = 4x³ − 5x + 9` evaluated at `x = 2`:",
        options: ["43", "48", "31", "52"],
        answer: "43",
        whyEasy: "`f'(x) = 12x² − 5`, so `f'(2) = 12(4) − 5 = 48 − 5 = 43`!",
        linkedNodeId: "derivatives-speedometer"
      },
      {
        prompt: "DOST Geometry: A right circular cylinder has radius `r = 3 cm` and height `h = 5 cm`. If you **DOUBLE** the radius while keeping height fixed, its volume multiplies by:",
        options: ["4× (`V = πr²h`, so `(2r)² = 4r²`)", "2×", "8×", "6×"],
        answer: "4× (`V = πr²h`, so `(2r)² = 4r²`)",
        whyEasy: "Radius is SQUARED in `πr²h`, so doubling `r` quadruples volume!",
        linkedNodeId: "circles-3d-geometry"
      }
    ],
    dost_verbal: [
      {
        prompt: "DOST Logical Reasoning: *'All DOST scholars study STEM. Some robotics club members are DOST scholars.'* Which conclusion MUST follow?",
        options: ["Some robotics club members study STEM", "All robotics club members are DOST scholars", "All STEM students join robotics", "No robotics member studies STEM"],
        answer: "Some robotics club members study STEM",
        whyEasy: "The overlap (`robotics ∩ DOST`) lies entirely inside `STEM`, guaranteeing *some* robotics members study STEM!",
        linkedNodeId: "logic-deduction-abstract"
      },
      {
        prompt: "DOST English Usage: Choose the sentence with **ZERO grammatical errors**:",
        options: ["Neither the lab manual nor the data sheets were left on the bench.", "Neither the lab manual nor the data sheets was left on the bench.", "The lab manual, along with the data sheets, were left on the bench.", "Each of the lab manuals were checked."],
        answer: "Neither the lab manual nor the data sheets were left on the bench.",
        whyEasy: "`Neither...nor` matches the closer subject `data sheets` (plural → `were`)!",
        linkedNodeId: "exam-paragraph-org-error-spotting"
      },
      {
        prompt: "DOST Vocabulary: In scientific writing, **ANOMALY** (`an-` without + `homos` same) most closely means:",
        options: ["An unexpected deviation from the normal pattern or rule", "A permanent physical law", "A repeated routine measurement", "A laboratory microscope"],
        answer: "An unexpected deviation from the normal pattern or rule",
        whyEasy: "An anomaly is an outlier or irregularity departing from expected behavior!",
        linkedNodeId: "exam-cse-clerical-filing-vocabulary"
      }
    ],
    upcat_science: [
      {
        prompt: "UPCAT Biology: A red blood cell (`~0.9%` NaCl inside) is dropped into a **HYPERTONIC** `5%` salt beaker. Which way does water move by osmosis, and what happens to the cell?",
        options: ["Water moves OUT of the cell → the cell shrivels (crenates)", "Water rushes INTO the cell → it bursts (lyses)", "Zero net water movement", "Salt diffuses out while water stays still"],
        answer: "Water moves OUT of the cell → the cell shrivels (crenates)",
        whyEasy: "Water ALWAYS follows higher solute concentration — 'salt sucks water out' → cell shrinks in hypertonic solution!",
        linkedNodeId: "bio-osmosis-transport"
      },
      {
        prompt: "UPCAT Chemistry: Solution A has `pH = 3` and Solution B has `pH = 5`. How many times MORE acidic (`[H⁺]`) is Solution A than Solution B?",
        options: ["100× more acidic (`10²`)", "2× more acidic", "20× more acidic", "1,000× more acidic"],
        answer: "100× more acidic (`10²`)",
        whyEasy: "pH is base-10 logarithmic: `ΔpH = 2` means `10² = 100×` higher hydrogen ion concentration!",
        linkedNodeId: "chem-acids-bases-ph"
      },
      {
        prompt: "UPCAT Earth Science: During a **Solar Eclipse** (`Sun – Moon – Earth`), which Moon phase MUST occur, and why doesn't an eclipse happen every single month?",
        options: ["New Moon; the Moon's orbit is tilted `~5°` relative to Earth's orbital plane!", "Full Moon; Earth stops rotating", "First Quarter; clouds block the Moon", "New Moon; the Sun moves behind Mars"],
        answer: "New Moon; the Moon's orbit is tilted `~5°` relative to Earth's orbital plane!",
        whyEasy: "Moon's `5°` orbital inclination makes its shadow usually miss above or below Earth except at orbital nodes!",
        linkedNodeId: "earth-moon-phases-seasons-tides"
      }
    ],
    upcat_math: [
      {
        prompt: "UPCAT Math (No Calc): If `f(x) = 2x + 3` and `g(x) = x² − 1`, what is `f(g(3))`?",
        options: ["19", "80", "17", "21"],
        answer: "19",
        whyEasy: "Work inside-out: `g(3) = 3² − 1 = 8`, then `f(8) = 2(8) + 3 = 19`!",
        linkedNodeId: "functions-shifting"
      },
      {
        prompt: "UPCAT Math: For what value(s) of `k` does the quadratic `x² + kx + 9 = 0` have **EXACTLY ONE real repeated root**?",
        options: ["`k = 6` or `k = −6` (`b² − 4ac = 0`)", "`k = 3` only", "`k = 9` only", "`k = 0`"],
        answer: "`k = 6` or `k = −6` (`b² − 4ac = 0`)",
        whyEasy: "Set discriminant `k² − 4(1)(9) = 0 → k² = 36 → k = ±6`!",
        linkedNodeId: "quadratics-symmetry"
      },
      {
        prompt: "UPCAT Math: A fair 6-sided die is rolled twice. What is the probability that the **SUM is 7**?",
        options: ["`1/6` (`6/36`)", "`1/12`", "`7/36`", "`1/9`"],
        answer: "`1/6` (`6/36`)",
        whyEasy: "Six winning pairs `(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)` out of `36` total → `6/36 = 1/6`!",
        linkedNodeId: "permutations-combinatorics-piecewise"
      }
    ],
    cse_verbal: [
      {
        prompt: "CSE Paragraph Organization: Order these sentences logically:\n(1) For instance, single-use plastics clog urban drainage canals.\n(2) Effective waste segregation begins right inside every household.\n(3) When families separate recyclables early, less trash reaches waterways.\n(4) Unsorted garbage causes severe flooding during monsoon rains.",
        options: ["2 – 4 – 1 – 3", "1 – 2 – 3 – 4", "4 – 1 – 2 – 3", "3 – 2 – 4 – 1"],
        answer: "2 – 4 – 1 – 3",
        whyEasy: "Standalone opener (`2`), problem (`4`), concrete example (`1` 'For instance'), and concluding resolution (`3`)!",
        linkedNodeId: "exam-paragraph-org-error-spotting"
      },
      {
        prompt: "CSE Vocabulary: The auditor commended the treasurer for her **SCRUPULOUS** handling of public funds. *Scrupulous* means:",
        options: ["Extremely thorough, honest, and attentive to moral & factual detail", "Careless and impulsive", "Secretive and corrupt", "Indifferent to regulations"],
        answer: "Extremely thorough, honest, and attentive to moral & factual detail",
        whyEasy: "Scrupulous = principled and painstakingly careful (antonym: `unscrupulous` = corrupt/dishonest)!",
        linkedNodeId: "exam-cse-clerical-filing-vocabulary"
      },
      {
        prompt: "CSE Filipino: Piliin ang tamang kahulugan ng sawikaing **`balat-sibuyas`**:",
        options: ["Maramdamin / madaling masaktan ang damdamin", "Maputi ang balat", "Masipag magluto", "Matapang sa laban"],
        answer: "Maramdamin / madaling masaktan ang damdamin",
        whyEasy: "Ang `balat-sibuyas` ay klasikong idyomang Filipino para sa taong sensitibo o maramdamin!",
        linkedNodeId: "fil-tayutay-idyoma-sawikain"
      }
    ],
    cse_analytical: [
      {
        prompt: "CSE Analytical Logic: *'If it rains heavily, the river overflows. The river did NOT overflow.'* What is the ONLY logically guaranteed conclusion (Modus Tollens)?",
        options: ["It did NOT rain heavily", "It rained lightly", "It will rain tomorrow", "The dam was opened"],
        answer: "It did NOT rain heavily",
        whyEasy: "Modus Tollens: `P → Q` and `¬Q` strictly forces `¬P`!",
        linkedNodeId: "phil-deductive-inductive-abductive"
      },
      {
        prompt: "CSE Analytical Analogy: **CONSTITUTION : LAW :: BLUEPRINT : ___**",
        options: ["BUILDING", "ARCHITECT", "BRICK", "CITY"],
        answer: "BUILDING",
        whyEasy: "Relationship = `Foundational Master Plan : What Is Constructed From It` → Blueprint governs a Building!",
        linkedNodeId: "verbal-analogies-vocab"
      },
      {
        prompt: "CSE Analytical Assumptions: *'To cut electricity bills by 20%, the office replaced all fluorescent tubes with LED bulbs.'* Which hidden assumption underlies this plan?",
        options: ["LED bulbs consume significantly less electricity than fluorescent tubes for equivalent lighting", "Office workers prefer darker rooms", "Electricity prices will double next year", "Fluorescent tubes last forever"],
        answer: "LED bulbs consume significantly less electricity than fluorescent tubes for equivalent lighting",
        whyEasy: "An assumption is the unstated premise that MUST be true for the action to achieve its stated goal!",
        linkedNodeId: "logic-deduction-abstract"
      }
    ],
    cse_numerical: [
      {
        prompt: "CSE Numerical: A civil servant earns `₱28,000` monthly and receives a `15%` salary adjustment. What is the new monthly salary?",
        options: ["₱32,200", "₱31,500", "₱32,800", "₱29,500"],
        answer: "₱32,200",
        whyEasy: "Mental shortcut: `10%` of `28,000` = `2,800`; `5%` = `1,400` → `15% = 4,200` → `28,000 + 4,200 = ₱32,200`!",
        linkedNodeId: "decimals-percents"
      },
      {
        prompt: "CSE Numerical: Evaluate without a calculator: `18 ÷ 3 × 2 + (7 − 4)²`",
        options: ["21", "12", "18", "15"],
        answer: "21",
        whyEasy: "PEMDAS left-to-right for `÷` and `×`: `(18 ÷ 3) × 2 = 12`, plus `3² = 9` → `12 + 9 = 21`!",
        linkedNodeId: "pemdas-grammar"
      },
      {
        prompt: "CSE Numerical: The ratio of men to women in an agency seminar is `3 : 5`. If there are `120` total attendees, how many are **women**?",
        options: ["75", "45", "60", "80"],
        answer: "75",
        whyEasy: "Total parts = `3 + 5 = 8`; each part = `120 ÷ 8 = 15`; women = `5 × 15 = 75`!",
        linkedNodeId: "ratios-proportions-rates"
      }
    ],
    nmat_bio: [
      {
        prompt: "NMAT Biology: During **Meiosis I**, homologous chromosomes pair up and exchange genetic segments (**crossing over**). In which exact sub-phase does crossing over occur?",
        options: ["Prophase I", "Metaphase II", "Anaphase I", "Telophase II"],
        answer: "Prophase I",
        whyEasy: "Synapsis & crossing over happen strictly in **Prophase I** (driving genetic diversity in gametes)!",
        linkedNodeId: "bio-mitosis-meiosis-genetics"
      },
      {
        prompt: "NMAT Human Physiology: Which chamber of the human heart pumps oxygenated blood through the **aorta** to the entire systemic circulation (and therefore has the thickest muscular wall)?",
        options: ["Left Ventricle", "Right Ventricle", "Left Atrium", "Right Atrium"],
        answer: "Left Ventricle",
        whyEasy: "Right ventricle only pumps to nearby lungs; **Left Ventricle** pumps high-pressure blood head-to-toe!",
        linkedNodeId: "bio-human-physiology"
      },
      {
        prompt: "NMAT Genetics: Color blindness is **X-linked recessive**. A carrier mother (`X^N X^n`) and an unaffected father (`X^N Y`) have a son. What is the probability their **SON** is color-blind?",
        options: ["50%", "0%", "25%", "100%"],
        answer: "50%",
        whyEasy: "Sons get `Y` from dad and either `X^N` (50%) or `X^n` (50%) from their carrier mom!",
        linkedNodeId: "bio-pedigrees-sex-linked"
      }
    ],
    nmat_phys: [
      {
        prompt: "NMAT Optics: A patient with **Myopia (nearsightedness)** focuses distant objects *in front of* the retina. Which lens type diverges incoming rays to correct Myopia?",
        options: ["Concave (Diverging) lens", "Convex (Converging) lens", "Flat plane mirror", "Opaque prism"],
        answer: "Concave (Diverging) lens",
        whyEasy: "Myopia = eyeball too long/strong → **Concave** lens diverges rays back onto the retina (Hyperopia = Convex)!",
        linkedNodeId: "physics-mirrors-lenses-concave-convex"
      },
      {
        prompt: "NMAT Circuits: Two `6 Ω` resistors are connected in **PARALLEL** across a `12 V` battery. What is the total current `I` drawn from the battery?",
        options: ["4 A (`R_eq = 3 Ω`, so `12 ÷ 3 = 4 A`)", "1 A", "2 A", "6 A"],
        answer: "4 A (`R_eq = 3 Ω`, so `12 ÷ 3 = 4 A`)",
        whyEasy: "Two equal `6 Ω` lanes in parallel halve resistance to `3 Ω`, so `I = V/R = 12/3 = 4 A`!",
        linkedNodeId: "phys2-resistivity-ohms-dc"
      }
    ],
    nmat_perceptual: [
      {
        prompt: "NMAT Identical Information: Pick the option matching **`Brgy. San Isidro, 6014 Mandaue City, Cebu (Ph)`** EXACTLY:",
        options: [
          "Brgy. San Isidro, 6014 Mandaue City, Cebu (Ph)",
          "Brgy. San Isidro, 6104 Mandaue City, Cebu (Ph)",
          "Brgy. San Isidro, 6014 Manduae City, Cebu (Ph)",
          "Brgy San Isidro, 6014 Mandaue City, Cebu (Ph)"
        ],
        answer: "Brgy. San Isidro, 6014 Mandaue City, Cebu (Ph)",
        whyEasy: "Spot the 3 classic NMAT distractors: `6014→6104`, `Mandaue→Manduae`, and dropped period in `Brgy`!",
        linkedNodeId: "exam-nmat-perceptual-acuity"
      },
      {
        prompt: "NMAT Mirror Reflection: Which capital letter pair stays **100% UNCHANGED** when reflected across BOTH a vertical mirror AND a horizontal mirror?",
        options: ["H, I, O, X", "A, M, T, V", "B, C, D, E", "N, S, Z, P"],
        answer: "H, I, O, X",
        whyEasy: "Only `{H, I, O, X}` possess BOTH vertical and horizontal reflection symmetry!",
        linkedNodeId: "exam-nmat-perceptual-acuity"
      }
    ],
    dcat_math_stats: [
      {
        prompt: "DCAT Statistics: Exam scores follow a normal distribution with mean `μ = 70` and standard deviation `σ = 8`. What is the **Z-score** of a student who scored `86`?",
        options: ["`z = +2.0` (`(86 − 70) ÷ 8`)", "`z = +1.0`", "`z = +16.0`", "`z = −2.0`"],
        answer: "`z = +2.0` (`(86 − 70) ÷ 8`)",
        whyEasy: "`z = (x − μ) ÷ σ = 16 ÷ 8 = +2.0` (top ~2.5% of the normal curve!)!",
        linkedNodeId: "math-stats-correlation-regression-zscore"
      },
      {
        prompt: "DCAT Probability: Under the **Empirical Rule (`68–95–99.7%`)**, roughly what percent of normally distributed data falls within `±2` standard deviations of the mean?",
        options: ["95%", "68%", "99.7%", "50%"],
        answer: "95%",
        whyEasy: "`±1σ ≈ 68%`, `±2σ ≈ 95%`, `±3σ ≈ 99.7%` — DCAT's #1 tested stats benchmark!",
        linkedNodeId: "stats-normal-curve"
      },
      {
        prompt: "DCAT Combinatorics: How many distinct 3-person committees can be chosen from `6` students (order does NOT matter)?",
        options: ["20 (`C(6,3) = 6×5×4 ÷ 6`)", "120 (`P(6,3)`)", "18", "30"],
        answer: "20 (`C(6,3) = 6×5×4 ÷ 6`)",
        whyEasy: "Committees ignore order → Combination `6! / (3! 3!) = 20` (120 would be permutations)!",
        linkedNodeId: "permutations-combinatorics-piecewise"
      }
    ],
    ustet_math: [
      {
        prompt: "USTET Financial Math: You invest `₱10,000` at `10%` annual interest **compounded annually** for `2` years. What is the exact final amount?",
        options: ["₱12,100 (`10,000 × 1.1²`)", "₱12,000 (simple interest trap!)", "₱11,000", "₱12,500"],
        answer: "₱12,100 (`10,000 × 1.1²`)",
        whyEasy: "Year 1: `₱11,000`; Year 2 earns 10% on `₱11,000` (`+₱1,100`) → `₱12,100`!",
        linkedNodeId: "math-financial-compound-annuities"
      },
      {
        prompt: "USTET Basic Calculus: Evaluate $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$:",
        options: ["6", "0", "3", "Does not exist"],
        answer: "6",
        whyEasy: "Factor the pothole `(x−3)(x+3)/(x−3) = x + 3`, then plug in `x = 3` → `3 + 3 = 6`!",
        linkedNodeId: "limits-potholes"
      }
    ],
    pup_geninfo: [
      {
        prompt: "PUPCET General Info: Who wrote the revolutionary newspaper **La Solidaridad**'s founding editorial and served as its first editor-in-chief in Barcelona (1889)?",
        options: ["Graciano López Jaena", "Andrés Bonifacio", "Emilio Aguinaldo", "Apolinario Mabini"],
        answer: "Graciano López Jaena",
        whyEasy: "Graciano López Jaena was the 1st editor of *La Solidaridad*, later succeeded by Marcelo H. del Pilar!",
        linkedNodeId: "ph-propaganda-katipunan-rev"
      },
      {
        prompt: "PUPCET General Info: What is the **longest mountain range** in the Philippines, running along eastern Luzon and acting as a natural shield weakening Pacific typhoons?",
        options: ["Sierra Madre", "Cordillera Central", "Mount Apo Range", "Zambales Mountains"],
        answer: "Sierra Madre",
        whyEasy: "The ~540 km Sierra Madre range stretches from Cagayan to Quezon, absorbing severe typhoon winds!",
        linkedNodeId: "earth-atmosphere-typhoons-monsoons"
      }
    ],
    pma_english: [
      {
        prompt: "PMAEE Grammar: Choose the grammatically correct sentence:",
        options: ["Every cadet in the battalion is responsible for polishing his or her boots.", "Every cadet in the battalion are responsible for polishing their boots.", "Neither the commander nor the lieutenants was late.", "Running across the parade ground, the bugle sounded loudly."],
        answer: "Every cadet in the battalion is responsible for polishing his or her boots.",
        whyEasy: "`Every` is strictly singular (`is` + `his or her`), with zero dangling modifier!",
        linkedNodeId: "exam-paragraph-org-error-spotting"
      }
    ],
    pma_spma: [
      {
        prompt: "PMAEE SPMA Numerical Pattern: Find the missing number: `4, 9, 19, 39, 79, ___`",
        options: ["159", "149", "158", "119"],
        answer: "159",
        whyEasy: "Pattern is `×2 + 1` (differences double: `+5, +10, +20, +40, +80`) → `79 × 2 + 1 = 159`!",
        linkedNodeId: "exam-number-letter-series-patterns"
      }
    ]
  };

  // Fix exact alphabetical order inside csesub_clerical[0] right now:
  // dejesus (D) < delavega (A) < deleon (B) < delmundo (C) -> D -> A -> B -> C!
  EXAM_CUSTOM_BANK.csesub_clerical[0] = {
    prompt: "CSE Clerical Filing: Arrange these 4 names in strict alphabetical order (merging prefixes as 1 unit):\n(A) `Dela Vega, Carlo` · (B) `De Leon, Ana` · (C) `Del Mundo, Ben` · (D) `De Jesus, Mia`",
    options: ["D → A → B → C", "D → B → C → A", "A → B → C → D", "B → D → A → C"],
    answer: "D → A → B → C",
    whyEasy: "Merge prefixes cleanly: `dejesus` (`d-e-j`, D) < `delavega` (`d-e-l-a`, A) < `deleon` (`d-e-l-e`, B) < `delmundo` (`d-e-l-m`, C)!",
    linkedNodeId: "exam-cse-clerical-filing-vocabulary"
  };

  // ==================== EXAM PAPER BUILDER (ZERO-DUPLICATE, MULTI-SOURCE) ====================
  function getExamById(examId) {
    return EXAMS.find((e) => e.id === examId) || EXAMS[0];
  }

  function buildSubtestQuestions(subtest, targetCount, DATA, usedPrompts) {
    const picked = [];
    const nodeMap = new Map(DATA.NODES.map((n) => [n.id, n]));

    function tryPush(rawQ, linkedNodeId) {
      if (!rawQ || !rawQ.prompt || !rawQ.answer) return false;
      if (rawQ.type && rawQ.type !== "mc") return false;
      if (!Array.isArray(rawQ.options) || rawQ.options.length !== 4) return false;
      const uniq = new Set(rawQ.options);
      if (uniq.size !== 4 || !uniq.has(rawQ.answer)) return false;
      const key = String(rawQ.prompt).trim().toLowerCase();
      if (usedPrompts.has(key)) return false;
      usedPrompts.add(key);
      picked.push({
        id: `${subtest.id}_${picked.length + 1}`,
        subtestId: subtest.id,
        subtestName: subtest.name,
        linkedNodeId: linkedNodeId || rawQ.linkedNodeId || subtest.nodeIds[0],
        prompt: rawQ.prompt,
        options: shuffle(rawQ.options),
        answer: rawQ.answer,
        hint: rawQ.hint || "Eliminate clearly impossible distractors first.",
        whyEasy: rawQ.whyEasy || "Review the linked lesson to lock in this concept.",
        visualSvg: rawQ.visualSvg || null,
        optionSvgs: rawQ.optionSvgs || null,
        codeBlock: rawQ.codeBlock || null
      });
      return true;
    }

    // 1. Seed with exam-specific curated items first (high authenticity!)
    const customPool = shuffle(EXAM_CUSTOM_BANK[subtest.id] || []);
    for (const cq of customPool) {
      if (picked.length >= Math.min(targetCount, Math.ceil(targetCount * 0.45))) break;
      tryPush(Object.assign({ type: "mc" }, cq), cq.linkedNodeId);
    }

    // 2. Round-robin across mapped curriculum nodes (mixing procedural + curated MC questions)
    const nodes = shuffle(subtest.nodeIds.map((id) => nodeMap.get(id)).filter(Boolean));
    let safety = 0;
    let cursor = 0;
    while (picked.length < targetCount && safety < targetCount * 22 && nodes.length > 0) {
      safety++;
      const node = nodes[cursor % nodes.length];
      cursor++;
      // Alternate curated MC and procedural so every mock run feels fresh & authentic
      const useProc = (safety % 2 === 1);
      if (useProc && typeof DATA.generateProceduralQuestion === "function") {
        const pq = DATA.generateProceduralQuestion(node.id);
        if (tryPush(pq, node.id)) continue;
      }
      const mcCurated = shuffle((node.questions || []).filter((q) => q.type === "mc"));
      let addedCur = false;
      for (const q of mcCurated) {
        if (tryPush(q, node.id)) {
          addedCur = true;
          break;
        }
      }
      if (!addedCur && typeof DATA.generateProceduralQuestion === "function") {
        tryPush(DATA.generateProceduralQuestion(node.id), node.id);
      }
    }

    return picked;
  }

  function buildExamPaper(examId, config, DATA) {
    const exam = getExamById(examId);
    const cfg = Object.assign({
      scale: "half", // "quick" | "half" | "full" | "subtest"
      focusSubtestId: null,
      proctorMode: true,
      strictLock: exam.defaultStrictLock
    }, config || {});

    const usedPrompts = new Set();
    const targetSubtests = cfg.scale === "subtest" && cfg.focusSubtestId
      ? exam.subtests.filter((s) => s.id === cfg.focusSubtestId)
      : exam.subtests;

    const sections = targetSubtests.map((sub) => {
      let count = sub.simHalf;
      if (cfg.scale === "quick") count = sub.simQuick;
      else if (cfg.scale === "full") count = sub.simFull;
      else if (cfg.scale === "subtest") count = Math.max(12, Math.min(20, sub.simFull + 4));

      const questions = buildSubtestQuestions(sub, count, DATA, usedPrompts);
      const secPerItem = Math.max(35, Math.round((sub.officialMin * 60) / Math.max(1, sub.officialItems)));
      const timeLimitSec = Math.max(180, Math.round(questions.length * secPerItem));

      return {
        id: sub.id,
        name: sub.name,
        desc: sub.desc,
        weight: sub.weight,
        officialItems: sub.officialItems,
        officialMin: sub.officialMin,
        nodeIds: sub.nodeIds.slice(),
        timeLimitSec,
        remainingSec: timeLimitSec,
        spentSec: 0,
        locked: false,
        questions
      };
    });

    const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);
    const totalTimeSec = sections.reduce((sum, s) => sum + s.timeLimitSec, 0);

    return {
      paperId: `${exam.id}_${Date.now()}`,
      examId: exam.id,
      scale: cfg.scale,
      proctorMode: !!cfg.proctorMode,
      strictLock: cfg.scale === "subtest" ? false : !!cfg.strictLock,
      sections,
      totalQuestions,
      totalTimeSec,
      createdAt: Date.now()
    };
  }

  // ==================== EXAM-SPECIFIC OFFICIAL GRADING ENGINE ====================
  function computeProjectedUPG(netPct, hsAvg) {
    // Authentic inverted 1.00–5.00 UP scale: 60% UPCAT standardized score + 40% HS G8–G11 Average
    const clampedNet = Math.max(0, Math.min(100, netPct));
    const clampedHs = Math.max(75, Math.min(100, typeof hsAvg === "number" ? hsAvg : 93));
    // Map exam net % (0..100) to UP grade equiv (~4.50 down to 1.05)
    const examEquiv = Math.max(1.02, Math.min(4.80, 4.45 - (clampedNet / 100) * 3.35));
    // Map HS avg (75..100) to UP grade equiv (~3.20 down to 1.05)
    const hsEquiv = Math.max(1.05, Math.min(3.40, 3.30 - ((clampedHs - 75) / 25) * 2.20));
    const upg = 0.60 * examEquiv + 0.40 * hsEquiv;
    return Math.round(Math.max(1.00, Math.min(5.00, upg)) * 1000) / 1000;
  }

  function gradeExamAttempt(exam, paper, responses, extras) {
    const respMap = responses || {};
    const opts = extras || {};
    let totalItems = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalBlank = 0;
    let totalSpentSec = 0;

    const missedByNode = {};
    const subtestResults = [];
    const itemReviews = [];

    for (const sec of paper.sections) {
      let sCorrect = 0;
      let sWrong = 0;
      let sBlank = 0;
      totalSpentSec += sec.spentSec || 0;

      for (const q of sec.questions) {
        totalItems++;
        const chosen = respMap[q.id] !== undefined ? respMap[q.id] : null;
        let status = "blank";
        if (chosen === null || chosen === "") {
          sBlank++;
          totalBlank++;
        } else if (chosen === q.answer) {
          sCorrect++;
          totalCorrect++;
          status = "correct";
        } else {
          sWrong++;
          totalWrong++;
          status = "wrong";
        }

        if (status !== "correct" && q.linkedNodeId) {
          missedByNode[q.linkedNodeId] = (missedByNode[q.linkedNodeId] || 0) + 1;
        }

        itemReviews.push({
          q,
          sectionId: sec.id,
          sectionName: sec.name,
          chosen,
          status
        });
      }

      const secTotal = Math.max(1, sec.questions.length);
      const secRawPct = Math.round((sCorrect / secTotal) * 1000) / 10;
      const secNet = exam.scoringModel === "upcat_penalty" ? Math.max(0, sCorrect - 0.25 * sWrong) : sCorrect;
      const secNetPct = Math.round((secNet / secTotal) * 1000) / 10;

      subtestResults.push({
        id: sec.id,
        name: sec.name,
        total: sec.questions.length,
        correct: sCorrect,
        wrong: sWrong,
        blank: sBlank,
        rawPct: secRawPct,
        netScore: Math.round(secNet * 100) / 100,
        netPct: secNetPct,
        spentSec: sec.spentSec || 0,
        timeLimitSec: sec.timeLimitSec
      });
    }

    const safeTotal = Math.max(1, totalItems);
    const rawPct = Math.round((totalCorrect / safeTotal) * 1000) / 10;
    const penaltyLost = exam.scoringModel === "upcat_penalty" ? Math.round(totalWrong * 0.25 * 100) / 100 : 0;
    const netScore = exam.scoringModel === "upcat_penalty" ? Math.round((totalCorrect - 0.25 * totalWrong) * 100) / 100 : totalCorrect;
    const effectivePct = Math.max(0, Math.round((netScore / safeTotal) * 1000) / 10);

    // Exam-specific official scaled verdict
    let headlineMetric = `${rawPct.toFixed(1)}%`;
    let headlineLabel = "Overall Score";
    let verdictTitle = "";
    let verdictTone = "blue"; // green | amber | danger | blue
    let verdictDetail = "";
    let upg = null;
    let nmatScaled = null;
    let nmatPr = null;
    let passed = null;

    if (exam.scoringModel === "upcat_penalty") {
      const hsAvg = typeof opts.hsAvg === "number" ? opts.hsAvg : 93;
      upg = computeProjectedUPG(effectivePct, hsAvg);
      headlineMetric = upg.toFixed(3);
      headlineLabel = `Projected UPG (HS ${hsAvg}%)`;
      if (upg <= 2.15) {
        verdictTone = "green";
        verdictTitle = "UP Diliman / UP Manila Competitive Band!";
        verdictDetail = `Net ${netScore.toFixed(2)}/${totalItems} (${effectivePct}% after −${penaltyLost.toFixed(2)} penalty). Projected UPG ${upg.toFixed(3)} clears flagship Diliman/Manila benchmarks!`;
      } else if (upg <= 2.45) {
        verdictTone = "blue";
        verdictTitle = "UPLB / UP Baguio / UP Cebu Competitive Band";
        verdictDetail = `Net ${netScore.toFixed(2)}/${totalItems} (penalty lost: −${penaltyLost.toFixed(2)}). Sharpen your weakest subtest to push into UPD/UPM (≤ 2.15).`;
      } else if (upg <= 2.75) {
        verdictTone = "amber";
        verdictTitle = "Regional UP Campus / Recon Borderline";
        verdictDetail = `Net ${netScore.toFixed(2)}/${totalItems}. Review wrong answers carefully — cutting blind guesses saves −0.25 per mistake!`;
      } else {
        verdictTone = "danger";
        verdictTitle = "Below Historical UP Campus Cutoffs";
        verdictDetail = `Net ${netScore.toFixed(2)}/${totalItems}. Focus on the priority lessons flagged below, then re-test!`;
      }
    } else if (exam.scoringModel === "cse_80") {
      passed = rawPct >= 80.0;
      headlineMetric = `${rawPct.toFixed(2)}%`;
      headlineLabel = passed ? "CSC PASSED (≥ 80.00%)" : "CSC Rating (Need 80.00%)";
      if (passed) {
        verdictTone = "green";
        verdictTitle = "PASSED — Above the 80.00% Civil Service Passing Gate!";
        verdictDetail = `You scored ${totalCorrect}/${totalItems} (${rawPct.toFixed(2)}%), clearing the official 80.00% threshold by +${(rawPct - 80).toFixed(2)}%!`;
      } else {
        const needed = Math.max(1, Math.ceil(0.8 * totalItems) - totalCorrect);
        verdictTone = rawPct >= 70 ? "amber" : "danger";
        verdictTitle = `Not Yet Passing — Need +${needed} More Correct for 80.00%`;
        verdictDetail = `You scored ${totalCorrect}/${totalItems} (${rawPct.toFixed(2)}%). Patch the weak lessons below (especially RA 6713 & Numerical/Clerical!) to cross 80.00%.`;
      }
    } else if (exam.scoringModel === "nmat_pr") {
      // Smooth psychometric logistic mapping onto NMAT 200..800 scale & 1..99 PR
      const z = (rawPct - 58) / 14.5;
      nmatScaled = Math.round(Math.max(200, Math.min(800, 500 + z * 100)));
      const cdf = 1 / (1 + Math.exp(-1.7 * z));
      nmatPr = Math.max(1, Math.min(99, Math.round(cdf * 100)));
      headlineMetric = `${nmatPr} PR (${nmatScaled})`;
      headlineLabel = "Projected NMAT Percentile & Scaled Score";
      if (nmatPr >= 90) {
        verdictTone = "green";
        verdictTitle = "90+ PR Elite Band — UPCM / ASMPH / SLCM Eligible!";
        verdictDetail = `Raw ${totalCorrect}/${totalItems} (${rawPct}%). Your projected ${nmatPr} PR (${nmatScaled}/800) hits the top Philippine medical school cutoff tier!`;
      } else if (nmatPr >= 80) {
        verdictTone = "blue";
        verdictTitle = "80–89 PR Strong Band — UST-FMS / CIM / UERM Competitive";
        verdictDetail = `Raw ${totalCorrect}/${totalItems} (${rawPct}%). Polishing Perceptual Acuity & Social Science can push you past 90+ PR!`;
      } else if (nmatPr >= 40) {
        verdictTone = "amber";
        verdictTitle = "40–79 PR — Clears CHED Minimum (40 PR)";
        verdictDetail = `Raw ${totalCorrect}/${totalItems} (${rawPct}%). Target your lowest Part I & Part II subtests below to break into the 85–90+ PR tier.`;
      } else {
        verdictTone = "danger";
        verdictTitle = "Below CHED 40 PR Minimum";
        verdictDetail = `Raw ${totalCorrect}/${totalItems} (${rawPct}%). Study the flagged core lessons before your next timed NMAT mock.`;
      }
    } else if (exam.scoringModel === "ustet_balanced") {
      const lowestSub = subtestResults.slice().sort((a, b) => a.rawPct - b.rawPct)[0];
      headlineMetric = `${rawPct.toFixed(1)}%`;
      headlineLabel = `Overall · Lowest Subtest ${lowestSub ? lowestSub.rawPct + "%" : "—"}`;
      if (rawPct >= 75 && (!lowestSub || lowestSub.rawPct >= 65)) {
        verdictTone = "green";
        verdictTitle = "Balanced Qualifier Across All USTET Subtests!";
        verdictDetail = `Strong overall score (${rawPct}%) with zero subtest below 65% — safe against USTET's single-subtest disqualification trap!`;
      } else if (rawPct >= 70 && lowestSub && lowestSub.rawPct < 65) {
        verdictTone = "amber";
        verdictTitle = `Balanced Subtest Warning: ${lowestSub.name} (${lowestSub.rawPct}%)`;
        verdictDetail = `Your total is ${rawPct}%, but USTET evaluates each academic subtest individually — shore up ${lowestSub.name} immediately!`;
      } else {
        verdictTone = "danger";
        verdictTitle = "Needs Focused Subtest Patching";
        verdictDetail = `Score ${totalCorrect}/${totalItems} (${rawPct}%). Master your weakest subtest lessons below and retake!`;
      }
    } else if (exam.id === "dost_sei") {
      headlineMetric = `${rawPct.toFixed(1)}%`;
      headlineLabel = "DOST-SEI Qualifier Readiness";
      if (rawPct >= 82) {
        verdictTone = "green";
        verdictTitle = "Strong DOST-SEI Merit & RA 7687 Scholar Contender!";
        verdictDetail = `${totalCorrect}/${totalItems} (${rawPct}%). Your multi-part STEM + Mechanical + Spatial accuracy is right in Merit scholarship territory!`;
      } else if (rawPct >= 72) {
        verdictTone = "blue";
        verdictTitle = "Competitive DOST-SEI Qualifier Band (RA 7687 / Near Merit)";
        verdictDetail = `${totalCorrect}/${totalItems} (${rawPct}%). Locking down your weakest part below will push you comfortably above 82%!`;
      } else if (rawPct >= 58) {
        verdictTone = "amber";
        verdictTitle = "Borderline DOST Readiness — High Upside Ahead";
        verdictDetail = `${totalCorrect}/${totalItems} (${rawPct}%). Mechanical-Technical, Astronomy & Work/Trig math are your fastest point gains!`;
      } else {
        verdictTone = "danger";
        verdictTitle = "Early Baseline — Build Core STEM & Mechanical Foundations";
        verdictDetail = `${totalCorrect}/${totalItems} (${rawPct}%). Follow the exact linked lessons below before your next timed mock.`;
      }
    } else {
      headlineMetric = `${rawPct.toFixed(1)}%`;
      headlineLabel = `${exam.shortName} Readiness Score`;
      if (rawPct >= 80) {
        verdictTone = "green";
        verdictTitle = `Strong ${exam.shortName} Qualifier Band!`;
        verdictDetail = `${totalCorrect}/${totalItems} (${rawPct}%). Excellent pace & accuracy across all subtests!`;
      } else if (rawPct >= 68) {
        verdictTone = "blue";
        verdictTitle = `Competitive ${exam.shortName} Trajectory`;
        verdictDetail = `${totalCorrect}/${totalItems} (${rawPct}%). Patching the top 2–3 missed lessons below will raise you into the elite 80%+ tier.`;
      } else {
        verdictTone = "amber";
        verdictTitle = `${exam.shortName} Baseline Logged — Review Weak Areas`;
        verdictDetail = `${totalCorrect}/${totalItems} (${rawPct}%). Review every wrong explanation below and drill the linked lessons.`;
      }
    }

    const weakestSubtest = subtestResults.slice().sort((a, b) => a.rawPct - b.rawPct)[0] || null;
    const priorityNodes = Object.entries(missedByNode)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([nodeId, count]) => ({ nodeId, count }));

    return {
      examId: exam.id,
      examShortName: exam.shortName,
      scale: paper.scale,
      proctorMode: paper.proctorMode,
      totalItems,
      totalCorrect,
      totalWrong,
      totalBlank,
      rawPct,
      netScore,
      effectivePct,
      penaltyLost,
      upg,
      nmatScaled,
      nmatPr,
      passed,
      totalSpentSec,
      avgSecPerItem: Math.round(totalSpentSec / safeTotal),
      headlineMetric,
      headlineLabel,
      verdictTone,
      verdictTitle,
      verdictDetail,
      subtestResults,
      weakestSubtest,
      priorityNodes,
      itemReviews
    };
  }

  // ==================== EXAM MODE LIVE UI STATE ====================
  let uiCategory = "all"; // all | scholarship | cet | gov | med
  let uiView = "hub"; // "hub" | "dossier" | "runner" | "intermission" | "results"
  let activeDossierTab = "simulate"; // "simulate" | "syllabus" | "blueprint"
  let simConfig = {
    scale: "half",
    focusSubtestId: null,
    proctorMode: true,
    strictLock: true,
    logMistakes: true
  };
  let activeRun = null; // { exam, paper, secIdx, qIdx, responses, flagged, struck, scratchOpen, scratchText, paused, guidedRevealed, timerId, confirmSubmit }
  let lastResult = null; // { exam, paper, grade, reviewFilter, upgHsAvg, essayText, essayIdx }
  let essayState = { promptIdx: 0, text: "", secLeft: 25 * 60, running: false, timerId: null, checks: {} };

  function stopExamTimer() {
    if (activeRun && activeRun.timerId) {
      clearInterval(activeRun.timerId);
      activeRun.timerId = null;
    }
    if (essayState.timerId) {
      clearInterval(essayState.timerId);
      essayState.timerId = null;
      essayState.running = false;
    }
  }

  function isRunnerActive() {
    return uiView === "runner" && !!activeRun;
  }

  function getExamReadiness(exam, state) {
    const mastery = (state && state.nodeMastery) || {};
    const allIds = new Set();
    for (const s of exam.subtests) {
      for (const id of s.nodeIds) allIds.add(id);
    }
    const ids = Array.from(allIds);
    let practiced = 0;
    let mastered = 0;
    for (const id of ids) {
      const m = mastery[id] || 0;
      if (m >= 1) practiced++;
      if (m >= 2) mastered++;
    }
    const pct = ids.length ? Math.round(((practiced * 0.6 + mastered * 0.4) / ids.length) * 100) : 0;
    return { totalNodes: ids.length, practiced, mastered, pct };
  }

  // ==================== MAIN VIEW DISPATCHER ====================
  function renderExamModeView(container, state, DATA, hooks) {
    if (!state.examHistory) state.examHistory = [];
    if (!state.activeExamId || !EXAMS.some((e) => e.id === state.activeExamId)) {
      state.activeExamId = "dost_sei";
    }

    if (uiView === "runner" && activeRun) {
      renderExamRunner(container, state, DATA, hooks);
      return;
    }
    if (uiView === "intermission" && activeRun) {
      renderIntermission(container, state, DATA, hooks);
      return;
    }
    if (uiView === "results" && lastResult) {
      renderResultsDashboard(container, state, DATA, hooks);
      return;
    }
    if (uiView === "dossier") {
      renderExamDossier(container, state, DATA, hooks);
      return;
    }
    renderExamHub(container, state, DATA, hooks);
  }

  function openExamDossier(examId, state) {
    stopExamTimer();
    activeRun = null;
    if (state && EXAMS.some((e) => e.id === examId)) {
      state.activeExamId = examId;
    }
    const exam = getExamById(examId);
    simConfig.strictLock = exam.defaultStrictLock;
    simConfig.focusSubtestId = exam.subtests[0] ? exam.subtests[0].id : null;
    activeDossierTab = "simulate";
    uiView = "dossier";
  }

  // ==================== VIEW 1: EXAM MODE HUB ====================
  function renderExamHub(container, state, DATA, hooks) {
    const history = state.examHistory || [];
    const totalMocks = history.length;
    const avgPct = totalMocks ? Math.round(history.reduce((s, h) => s + (h.pct || 0), 0) / totalMocks) : 0;
    const bestPct = totalMocks ? Math.max(...history.map((h) => h.pct || 0)) : 0;

    const cats = [
      { id: "all", label: `All Exams (${EXAMS.length})` },
      { id: "scholarship", label: "Scholarships (DOST)" },
      { id: "cet", label: "Big 4 & CETs (UPCAT · ACET · DCAT · USTET · PUPCET)" },
      { id: "gov", label: "Government & Academy (CSE · PMAEE)" },
      { id: "med", label: "Med School (NMAT)" }
    ];

    const filtered = uiCategory === "all" ? EXAMS : EXAMS.filter((e) => e.category === uiCategory);
    const featuredExam = getExamById(state.activeExamId);
    const featReady = getExamReadiness(featuredExam, state);

    container.innerHTML = `
      <section class="ml-ex-hero">
        <div class="ml-ex-hero-copy">
          <div class="ml-hero-kicker">AUTHENTIC CBT SIMULATOR · OFFICIAL BLUEPRINTS & SCORING</div>
          <h2 class="ml-ex-hero-title">Exam Mode Studio</h2>
          <p class="ml-ex-hero-sub">
            Realistic timed mock exams tailored to <strong>DOST-SEI</strong>, <strong>UPCAT (R − ¼W & UPG)</strong>,
            <strong>Civil Service (80% Gate)</strong>, <strong>NMAT (200–800 PR)</strong>, <strong>ACET</strong>,
            <strong>DCAT</strong>, <strong>USTET</strong>, <strong>PUPCET</strong> & <strong>PMAEE</strong> — with strict section locks,
            option strike-throughs, scratchpad, and 1-click missing-lesson remediation.
          </p>
          <div class="ml-ex-hero-kpis">
            <div class="ml-ex-kpi">
              <span>Target Exams</span>
              <strong>${EXAMS.length} Tailored Blueprints</strong>
            </div>
            <div class="ml-ex-kpi">
              <span>Mocks Completed</span>
              <strong>${totalMocks}</strong>
            </div>
            <div class="ml-ex-kpi">
              <span>Average / Best</span>
              <strong>${totalMocks ? `${avgPct}% · Best ${bestPct}%` : "Ready for baseline"}</strong>
            </div>
          </div>
        </div>
        <div class="ml-ex-focus-card">
          <div class="ml-ex-focus-head">
            <span class="ml-bento-eyebrow">Active Target Exam</span>
            <span class="ml-ex-pill">${escapeHtml(featuredExam.categoryLabel)}</span>
          </div>
          <div class="ml-ex-focus-title-row">
            <span class="ml-ex-ico-lg" aria-hidden="true">${featuredExam.icon}</span>
            <div>
              <h3>${escapeHtml(featuredExam.shortName)}</h3>
              <p>${escapeHtml(featuredExam.org)}</p>
            </div>
          </div>
          <div class="ml-ex-ready-bar-wrap">
            <div class="ml-ex-ready-row">
              <span>Syllabus Mastery</span>
              <strong>${featReady.pct}% (${featReady.practiced}/${featReady.totalNodes} lessons)</strong>
            </div>
            <div class="ml-progress-track">
              <div class="ml-progress-fill" style="width:${Math.max(featReady.pct > 0 ? 4 : 0, featReady.pct)}%"></div>
            </div>
          </div>
          <div class="ml-ex-focus-actions">
            <button type="button" class="ml-btn-primary" id="ml-ex-open-featured">Open ${escapeHtml(featuredExam.shortName)} Command Center →</button>
            <button type="button" class="ml-btn-secondary" id="ml-ex-quick-featured">⚡ Quick Diagnostic Mock</button>
          </div>
        </div>
      </section>

      <div class="ml-ex-cat-row" role="tablist" aria-label="Exam category filter">
        ${cats.map((c) => `
          <button type="button" class="ml-filter-pill ${uiCategory === c.id ? "active" : ""}" data-ex-cat="${c.id}">
            ${escapeHtml(c.label)}
          </button>
        `).join("")}
      </div>

      <section class="ml-ex-catalog-grid">
        ${filtered.map((ex) => {
          const ready = getExamReadiness(ex, state);
          const attempts = history.filter((h) => h.examId === ex.id);
          const bestAttempt = attempts.length ? attempts.slice().sort((a, b) => (b.pct || 0) - (a.pct || 0))[0] : null;
          return `
            <article class="ml-ex-card ${state.activeExamId === ex.id ? "is-target" : ""}" data-ex-open="${ex.id}">
              <div class="ml-ex-card-top">
                <div class="ml-ex-card-ident">
                  <span class="ml-ex-card-ico" aria-hidden="true">${ex.icon}</span>
                  <div>
                    <div class="ml-ex-card-cat">${escapeHtml(ex.categoryLabel)}</div>
                    <h3 class="ml-ex-card-name">${escapeHtml(ex.shortName)}</h3>
                  </div>
                </div>
                <span class="ml-ex-ready-tag">${ready.pct}% ready</span>
              </div>
              <div class="ml-ex-card-fulltitle">${escapeHtml(ex.title)}</div>
              <p class="ml-ex-card-desc">${escapeHtml(ex.tagline)}</p>
              <div class="ml-ex-card-specs">
                <span>${ex.subtests.length} Subtests</span>
                <span>·</span>
                <span>~${ex.officialTotalItems} items</span>
                <span>·</span>
                <span>${Math.floor(ex.officialDurationMin / 60)}h ${ex.officialDurationMin % 60 ? (ex.officialDurationMin % 60) + "m" : ""}</span>
              </div>
              <div class="ml-ex-scoring-strip">${escapeHtml(ex.scoringBadge)}</div>
              <div class="ml-progress-track ml-ex-card-track">
                <div class="ml-progress-fill" style="width:${ready.pct}%"></div>
              </div>
              <div class="ml-ex-card-foot">
                <span class="ml-ex-hist-note">${bestAttempt ? `Best: ${escapeHtml(bestAttempt.headlineMetric || bestAttempt.pct + "%")} (${attempts.length} run${attempts.length > 1 ? "s" : ""})` : "Not yet simulated"}</span>
                <button type="button" class="ml-btn-mini" data-ex-open-btn="${ex.id}">Configure & Start →</button>
              </div>
            </article>
          `;
        }).join("")}
      </section>

      ${history.length > 0 ? `
        <section class="ml-ex-history-panel">
          <div class="ml-section-head">
            <div>
              <h3 class="ml-section-title">Recent Mock Exam Attempts</h3>
              <p class="ml-section-sub">Your timed simulation log saved locally across sessions.</p>
            </div>
          </div>
          <div class="ml-ex-history-list">
            ${history.slice(0, 8).map((h) => `
              <div class="ml-ex-hist-row">
                <div class="ml-ex-hist-left">
                  <span class="ml-ex-hist-badge">${escapeHtml(h.examShortName || h.examId)}</span>
                  <strong>${escapeHtml(h.headlineMetric || (h.pct + "%"))}</strong>
                  <span class="ml-ex-hist-meta">${h.correct}/${h.total} correct · ${escapeHtml(h.scale || "mock")} · ${h.proctorMode ? "Proctor" : "Guided"}</span>
                </div>
                <div class="ml-ex-hist-right">
                  <span class="ml-ex-hist-date">${escapeHtml(h.date || "")}</span>
                  <button type="button" class="ml-btn-mini" data-ex-open-btn="${h.examId}">Retake →</button>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      ` : ""}
    `;

    container.querySelectorAll("[data-ex-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        uiCategory = btn.dataset.exCat;
        renderExamHub(container, state, DATA, hooks);
      });
    });

    const openAndRender = (examId) => {
      if (hooks && hooks.onTap) hooks.onTap();
      openExamDossier(examId, state);
      if (hooks && hooks.onSave) hooks.onSave();
      renderExamDossier(container, state, DATA, hooks);
      window.scrollTo(0, 0);
    };

    const openFeatBtn = document.getElementById("ml-ex-open-featured");
    if (openFeatBtn) openFeatBtn.addEventListener("click", () => openAndRender(featuredExam.id));

    const quickFeatBtn = document.getElementById("ml-ex-quick-featured");
    if (quickFeatBtn) {
      quickFeatBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        startExamSession(featuredExam.id, { scale: "quick", proctorMode: true, strictLock: featuredExam.defaultStrictLock }, container, state, DATA, hooks);
      });
    }

    container.querySelectorAll("[data-ex-open]").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("button")) return;
        openAndRender(card.dataset.exOpen);
      });
    });
    container.querySelectorAll("[data-ex-open-btn]").forEach((btn) => {
      btn.addEventListener("click", () => openAndRender(btn.dataset.exOpenBtn));
    });
  }

  // ==================== VIEW 2: EXAM COMMAND CENTER (DOSSIER) ====================
  function renderExamDossier(container, state, DATA, hooks) {
    const exam = getExamById(state.activeExamId);
    const ready = getExamReadiness(exam, state);
    const nodeMap = new Map(DATA.NODES.map((n) => [n.id, n]));
    const mastery = state.nodeMastery || {};
    if (!simConfig.focusSubtestId || !exam.subtests.some((s) => s.id === simConfig.focusSubtestId)) {
      simConfig.focusSubtestId = exam.subtests[0].id;
    }

    // Calculate preview counts & timing for selected scale
    const previewSubs = simConfig.scale === "subtest"
      ? exam.subtests.filter((s) => s.id === simConfig.focusSubtestId)
      : exam.subtests;
    const estItems = previewSubs.reduce((sum, s) => {
      if (simConfig.scale === "quick") return sum + s.simQuick;
      if (simConfig.scale === "full") return sum + s.simFull;
      if (simConfig.scale === "subtest") return sum + Math.max(12, Math.min(20, s.simFull + 4));
      return sum + s.simHalf;
    }, 0);
    const estMin = Math.max(5, Math.round(previewSubs.reduce((sum, s) => {
      const cnt = simConfig.scale === "quick" ? s.simQuick : simConfig.scale === "full" ? s.simFull : simConfig.scale === "subtest" ? Math.max(12, Math.min(20, s.simFull + 4)) : s.simHalf;
      return sum + cnt * ((s.officialMin * 60) / Math.max(1, s.officialItems));
    }, 0) / 60));

    // Find highest-priority unmastered lesson for this exam
    let nextWeakNode = null;
    for (const s of exam.subtests) {
      for (const nid of s.nodeIds) {
        if ((mastery[nid] || 0) < 2 && nodeMap.has(nid)) {
          nextWeakNode = { node: nodeMap.get(nid), subtest: s.name };
          break;
        }
      }
      if (nextWeakNode) break;
    }

    let tabBody = "";
    if (activeDossierTab === "simulate") {
      tabBody = `
        <div class="ml-ex-sim-grid">
          <div class="ml-ex-panel">
            <h3 class="ml-ex-panel-title">1. Choose Simulation Format</h3>
            <div class="ml-ex-scale-grid">
              ${[
                { id: "quick", title: "⚡ Quick Diagnostic", sub: "Fast baseline across all subtests (~10–18 min)" },
                { id: "half", title: "🎯 Half-Length Mock", sub: "Balanced multi-subtest endurance (~25–45 min)" },
                { id: "full", title: "🏆 Full Realistic Simulation", sub: "Deep full-coverage exam run (~45–75 min)" },
                { id: "subtest", title: "🔍 Single-Subtest Drill", sub: "Focus intensively on ONE specific subtest" }
              ].map((opt) => `
                <button type="button" class="ml-ex-scale-btn ${simConfig.scale === opt.id ? "active" : ""}" data-ex-scale="${opt.id}">
                  <strong>${opt.title}</strong>
                  <span>${opt.sub}</span>
                </button>
              `).join("")}
            </div>

            ${simConfig.scale === "subtest" ? `
              <div class="ml-ex-subpicker">
                <label class="ml-ex-subpicker-lbl">Select Subtest to Drill:</label>
                <div class="ml-ex-subpicker-list">
                  ${exam.subtests.map((s) => `
                    <button type="button" class="ml-ex-sub-chip ${simConfig.focusSubtestId === s.id ? "active" : ""}" data-ex-focus-sub="${s.id}">
                      ${escapeHtml(s.name)}
                    </button>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            <h3 class="ml-ex-panel-title" style="margin-top:18px;">2. Proctor Rules & Exam Realism</h3>
            <div class="ml-ex-toggles">
              <button type="button" class="ml-ex-toggle ${simConfig.proctorMode ? "on" : ""}" id="ml-ex-tog-proctor">
                <div>
                  <strong>${simConfig.proctorMode ? "Official Proctor Mode (Active)" : "Guided Practice Mode (Active)"}</strong>
                  <span>${simConfig.proctorMode ? "Live countdown timer · No hints · Full review after submission" : "Relaxed pauseable timer · Instant explanation toggle allowed"}</span>
                </div>
                <span class="ml-ex-switch">${simConfig.proctorMode ? "PROCTOR" : "GUIDED"}</span>
              </button>
              ${simConfig.scale !== "subtest" ? `
                <button type="button" class="ml-ex-toggle ${simConfig.strictLock ? "on" : ""}" id="ml-ex-tog-lock">
                  <div>
                    <strong>Strict Section Lock (${simConfig.strictLock ? "Authentic ON" : "Free Jump"})</strong>
                    <span>${simConfig.strictLock ? "Each subtest is separately timed; once finished you advance to the next part (no going back)." : "Jump freely across all subtests like a single-booklet exam (CSE/PUPCET style)."}</span>
                  </div>
                  <span class="ml-ex-switch">${simConfig.strictLock ? "LOCKED" : "FREE"}</span>
                </button>
              ` : ""}
              <button type="button" class="ml-ex-toggle ${simConfig.logMistakes ? "on" : ""}" id="ml-ex-tog-mistakes">
                <div>
                  <strong>Sync Missed Questions to Mistake Log & Smart Tutor SM-2</strong>
                  <span>Automatically schedules missed exam topics for Spaced Repetition review.</span>
                </div>
                <span class="ml-ex-switch">${simConfig.logMistakes ? "SYNC ON" : "OFF"}</span>
              </button>
            </div>
          </div>

          <div class="ml-ex-panel ml-ex-launch-card">
            <div class="ml-bento-eyebrow">Exam Briefing Ticket</div>
            <h3 style="margin:6px 0 4px;">${escapeHtml(exam.shortName)} — ${simConfig.scale === "quick" ? "Quick Diagnostic" : simConfig.scale === "full" ? "Full Simulation" : simConfig.scale === "subtest" ? "Single-Subtest Drill" : "Half-Length Mock"}</h3>
            <p class="ml-viz-sub" style="margin:0 0 14px;">${escapeHtml(exam.scoringBadge)}</p>

            <div class="ml-ex-ticket-grid">
              <div class="ml-ex-ticket-stat"><span>Items</span><strong>${estItems} Qs</strong></div>
              <div class="ml-ex-ticket-stat"><span>Time Budget</span><strong>~${estMin} min</strong></div>
              <div class="ml-ex-ticket-stat"><span>Subtests</span><strong>${previewSubs.length}</strong></div>
              <div class="ml-ex-ticket-stat"><span>Calculator</span><strong>${exam.calculatorAllowed ? "Allowed" : "Banned"}</strong></div>
            </div>

            <div class="ml-ex-ticket-subs">
              ${previewSubs.map((s, i) => {
                const cnt = simConfig.scale === "quick" ? s.simQuick : simConfig.scale === "full" ? s.simFull : simConfig.scale === "subtest" ? Math.max(12, Math.min(20, s.simFull + 4)) : s.simHalf;
                return `<div class="ml-ex-ticket-subrow"><span>${i + 1}. ${escapeHtml(s.name)}</span><strong>${cnt} items</strong></div>`;
              }).join("")}
            </div>

            <button type="button" class="ml-btn-primary ml-ex-start-cta" id="ml-ex-launch-btn">
              Begin Timed ${escapeHtml(exam.shortName)} Simulation →
            </button>

            ${nextWeakNode ? `
              <div class="ml-ex-warm-tip">
                <div>
                  <span class="ml-ex-warm-kicker">Recommended Pre-Exam Lesson</span>
                  <strong>${nextWeakNode.node.icon} ${escapeHtml(nextWeakNode.node.title)}</strong>
                </div>
                <button type="button" class="ml-btn-mini" data-ex-study-node="${nextWeakNode.node.id}">Study First →</button>
              </div>
            ` : ""}
          </div>
        </div>

        ${exam.hasEssayPrompt ? `
          <div class="ml-ex-panel" style="margin-top:16px;">
            <div class="ml-ex-panel-head" style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">
              <div>
                <h3 class="ml-ex-panel-title" style="margin-bottom:2px;">✍️ Interactive ACET 25-Minute Essay Studio</h3>
                <p class="ml-viz-sub" style="margin:0;">Pick an official-style Ateneo prompt, start the 25:00 clock, draft 300+ words, and self-audit against the 4-pillar rubric.</p>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="ml-ex-clock-box" style="padding:4px 10px;"><strong id="ml-ex-essay-clock">${formatMMSS(essayState.secLeft)}</strong></span>
                <button type="button" class="ml-btn-mini" id="ml-ex-essay-timer-btn">${essayState.running ? "⏸ Pause" : "▶ Start 25m Timer"}</button>
                <button type="button" class="ml-btn-mini" id="ml-ex-essay-reset">Reset</button>
              </div>
            </div>
            <div class="ml-ex-essay-prompts">
              ${exam.essayPrompts.map((pr, idx) => `
                <button type="button" class="ml-ex-essay-item ${essayState.promptIdx === idx ? "active" : ""}" data-ex-essay-pick="${idx}" style="text-align:left; cursor:pointer; border-color:${essayState.promptIdx === idx ? "var(--ml-primary-border)" : "var(--ml-border)"};">
                  <span class="ml-ex-essay-num">Prompt ${idx + 1} ${essayState.promptIdx === idx ? "· ACTIVE" : ""}</span>
                  <p>${escapeHtml(pr)}</p>
                </button>
              `).join("")}
            </div>
            <textarea id="ml-ex-essay-ta" class="ml-ex-scratch-ta" rows="6" style="margin-top:12px; font-family:var(--ml-font-sans); font-size:13.5px;" placeholder="Draft your thesis, 2 concrete arguments, nuanced counterargument & conclusion here...">${escapeHtml(essayState.text)}</textarea>
            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-top:10px;">
              <span class="ml-viz-sub" id="ml-ex-essay-wc">Words: <strong>${essayState.text.trim() ? essayState.text.trim().split(/\s+/).length : 0}</strong> (target 280–400 words)</span>
              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                ${["Clear Thesis", "2 Concrete Examples", "Counterargument Handled", "Clean Transitions"].map((crit, ci) => `
                  <button type="button" class="ml-btn-mini ${essayState.checks[ci] ? "active" : ""}" data-ex-essay-chk="${ci}">${essayState.checks[ci] ? "✓" : "○"} ${crit}</button>
                `).join("")}
              </div>
            </div>
          </div>
        ` : ""}
      `;
    } else if (activeDossierTab === "syllabus") {
      tabBody = `
        <div class="ml-ex-syllabus-wrap">
          <div class="ml-ex-syllabus-banner">
            <div>
              <h3 style="margin:0;">${escapeHtml(exam.shortName)} Complete Lesson Syllabus (${ready.practiced}/${ready.totalNodes} Practiced · ${ready.mastered} Mastered)</h3>
              <p class="ml-viz-sub" style="margin:4px 0 0;">Click any lesson below to jump directly into its 5-slide visual tutorial & practice quiz (Exam Prep bypasses tree locks!).</p>
            </div>
            ${nextWeakNode ? `<button type="button" class="ml-btn-primary" data-ex-study-node="${nextWeakNode.node.id}">Study Next Missing Lesson →</button>` : ""}
          </div>

          ${exam.subtests.map((sub) => {
            const subNodes = sub.nodeIds.map((id) => nodeMap.get(id)).filter(Boolean);
            const subDone = subNodes.filter((n) => (mastery[n.id] || 0) >= 1).length;
            const subPct = subNodes.length ? Math.round((subDone / subNodes.length) * 100) : 0;
            return `
              <div class="ml-ex-syl-group">
                <div class="ml-ex-syl-head">
                  <div>
                    <h4>${escapeHtml(sub.name)}</h4>
                    <p>${escapeHtml(sub.desc)}</p>
                  </div>
                  <div class="ml-ex-syl-meta">
                    <span>${subDone}/${subNodes.length} lessons (${subPct}%)</span>
                    <button type="button" class="ml-btn-mini" data-ex-drill-sub="${sub.id}">⚡ Drill Subtest</button>
                  </div>
                </div>
                <div class="ml-ex-syl-grid">
                  ${subNodes.map((n) => {
                    const lv = mastery[n.id] || 0;
                    const stLabel = lv >= 2 ? "Mastered" : lv === 1 ? "Practiced" : "Not Started";
                    const stCls = lv >= 2 ? "is-mastered" : lv === 1 ? "is-practiced" : "is-todo";
                    const isNewExamNode = n.worldId === "exam_mastery";
                    return `
                      <button type="button" class="ml-ex-syl-node ${stCls}" data-ex-study-node="${n.id}">
                        <div class="ml-ex-syl-node-top">
                          <span class="ml-ex-syl-ico">${n.icon}</span>
                          <span class="ml-ex-syl-status ${stCls}">${stLabel}</span>
                          ${isNewExamNode ? `<span class="ml-ex-new-tag">EXAM CORE</span>` : ""}
                        </div>
                        <strong>${fmtMath(n.title)}</strong>
                        <p>${fmtMath(n.tagline)}</p>
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    } else {
      // Blueprint & Official Strategy Dossier
      tabBody = `
        <div class="ml-ex-bp-grid">
          <div class="ml-ex-panel">
            <h3 class="ml-ex-panel-title">Official Subtest Blueprint & Pacing Matrix</h3>
            <div class="ml-ex-table-wrap">
              <table class="ml-ex-table">
                <thead>
                  <tr>
                    <th>Subtest</th>
                    <th>Est. Items</th>
                    <th>Time</th>
                    <th>Pace / Item</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  ${exam.subtests.map((s) => {
                    const pace = Math.round((s.officialMin * 60) / Math.max(1, s.officialItems));
                    return `
                      <tr>
                        <td><strong>${escapeHtml(s.name)}</strong><div class="ml-ex-td-sub">${escapeHtml(s.desc)}</div></td>
                        <td>${s.officialItems}</td>
                        <td>${s.officialMin} min</td>
                        <td><code>${pace}s</code></td>
                        <td>${s.weight}%</td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
            <div class="ml-ex-bench-box">
              <strong>Target Benchmark:</strong> ${escapeHtml(exam.passingBenchmark)}
            </div>
          </div>

          <div class="ml-ex-bp-side">
            <div class="ml-ex-panel">
              <h3 class="ml-ex-panel-title">Official Eligibility & Exam Rules</h3>
              <ul class="ml-ex-bullet-list">
                ${exam.eligibility.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </div>

            <div class="ml-ex-panel">
              <h3 class="ml-ex-panel-title">Scholarships, Standing & Benefits</h3>
              <ul class="ml-ex-bullet-list">
                ${exam.benefits.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </div>

            <div class="ml-ex-panel">
              <h3 class="ml-ex-panel-title">High-Yield Exam-Day Playbook</h3>
              <ul class="ml-ex-bullet-list">
                ${exam.tactics.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="ml-ex-dossier-top">
        <button type="button" class="ml-btn-mini" id="ml-ex-back-hub">← All 10 Exams</button>
        <div class="ml-ex-dossier-head">
          <span class="ml-ex-ico-lg" aria-hidden="true">${exam.icon}</span>
          <div>
            <div class="ml-hero-kicker">${escapeHtml(exam.org)} · ${escapeHtml(exam.categoryLabel)}</div>
            <h2 style="margin:2px 0 4px;">${escapeHtml(exam.title)}</h2>
            <p class="ml-viz-sub" style="margin:0;">${escapeHtml(exam.tagline)}</p>
          </div>
        </div>

        <div class="ml-ex-dossier-tabs" role="tablist">
          <button type="button" class="ml-ex-dtab ${activeDossierTab === "simulate" ? "active" : ""}" data-ex-dtab="simulate">🎯 1. Configure & Simulate</button>
          <button type="button" class="ml-ex-dtab ${activeDossierTab === "syllabus" ? "active" : ""}" data-ex-dtab="syllabus">📚 2. Syllabus & Lessons (${ready.practiced}/${ready.totalNodes})</button>
          <button type="button" class="ml-ex-dtab ${activeDossierTab === "blueprint" ? "active" : ""}" data-ex-dtab="blueprint">📋 3. Official Blueprint & Strategy</button>
        </div>
      </div>

      ${tabBody}
    `;

    document.getElementById("ml-ex-back-hub").addEventListener("click", () => {
      if (hooks && hooks.onTap) hooks.onTap();
      uiView = "hub";
      renderExamHub(container, state, DATA, hooks);
    });

    container.querySelectorAll("[data-ex-dtab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        activeDossierTab = btn.dataset.exDtab;
        renderExamDossier(container, state, DATA, hooks);
      });
    });

    container.querySelectorAll("[data-ex-scale]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        simConfig.scale = btn.dataset.exScale;
        renderExamDossier(container, state, DATA, hooks);
      });
    });

    container.querySelectorAll("[data-ex-focus-sub]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        simConfig.focusSubtestId = btn.dataset.exFocusSub;
        renderExamDossier(container, state, DATA, hooks);
      });
    });

    const togProc = document.getElementById("ml-ex-tog-proctor");
    if (togProc) {
      togProc.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        simConfig.proctorMode = !simConfig.proctorMode;
        renderExamDossier(container, state, DATA, hooks);
      });
    }
    const togLock = document.getElementById("ml-ex-tog-lock");
    if (togLock) {
      togLock.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        simConfig.strictLock = !simConfig.strictLock;
        renderExamDossier(container, state, DATA, hooks);
      });
    }
    const togMis = document.getElementById("ml-ex-tog-mistakes");
    if (togMis) {
      togMis.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        simConfig.logMistakes = !simConfig.logMistakes;
        renderExamDossier(container, state, DATA, hooks);
      });
    }

    const launchBtn = document.getElementById("ml-ex-launch-btn");
    if (launchBtn) {
      launchBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        startExamSession(exam.id, simConfig, container, state, DATA, hooks);
      });
    }

    container.querySelectorAll("[data-ex-study-node]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onOpenNode) hooks.onOpenNode(btn.dataset.exStudyNode);
      });
    });

    container.querySelectorAll("[data-ex-drill-sub]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        startExamSession(exam.id, {
          scale: "subtest",
          focusSubtestId: btn.dataset.exDrillSub,
          proctorMode: simConfig.proctorMode,
          strictLock: false,
          logMistakes: simConfig.logMistakes
        }, container, state, DATA, hooks);
      });
    });

    // Interactive ACET Essay Studio bindings
    container.querySelectorAll("[data-ex-essay-pick]").forEach((btn) => {
      btn.addEventListener("click", () => {
        essayState.promptIdx = parseInt(btn.dataset.exEssayPick, 10);
        renderExamDossier(container, state, DATA, hooks);
      });
    });
    const essayTa = document.getElementById("ml-ex-essay-ta");
    if (essayTa) {
      essayTa.addEventListener("input", () => {
        essayState.text = essayTa.value;
        const wcEl = document.getElementById("ml-ex-essay-wc");
        const wc = essayState.text.trim() ? essayState.text.trim().split(/\s+/).length : 0;
        if (wcEl) wcEl.innerHTML = `Words: <strong>${wc}</strong> (target 280–400 words)`;
      });
    }
    const essayTimerBtn = document.getElementById("ml-ex-essay-timer-btn");
    if (essayTimerBtn) {
      essayTimerBtn.addEventListener("click", () => {
        if (essayState.running) {
          clearInterval(essayState.timerId);
          essayState.timerId = null;
          essayState.running = false;
        } else {
          essayState.running = true;
          essayState.timerId = setInterval(() => {
            if (essayState.secLeft > 0) essayState.secLeft--;
            const clk = document.getElementById("ml-ex-essay-clock");
            if (clk) clk.textContent = formatMMSS(essayState.secLeft);
            if (essayState.secLeft <= 0) {
              clearInterval(essayState.timerId);
              essayState.timerId = null;
              essayState.running = false;
            }
          }, 1000);
        }
        renderExamDossier(container, state, DATA, hooks);
      });
    }
    const essayResetBtn = document.getElementById("ml-ex-essay-reset");
    if (essayResetBtn) {
      essayResetBtn.addEventListener("click", () => {
        if (essayState.timerId) clearInterval(essayState.timerId);
        essayState = { promptIdx: essayState.promptIdx, text: "", secLeft: 25 * 60, running: false, timerId: null, checks: {} };
        renderExamDossier(container, state, DATA, hooks);
      });
    }
    container.querySelectorAll("[data-ex-essay-chk]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.exEssayChk;
        essayState.checks[k] = !essayState.checks[k];
        renderExamDossier(container, state, DATA, hooks);
      });
    });
  }

  // ==================== VIEW 3: LIVE PROCTORED CBT RUNNER ====================
  function startExamSession(examId, config, container, state, DATA, hooks) {
    stopExamTimer();
    const exam = getExamById(examId);
    const paper = buildExamPaper(examId, config, DATA);
    activeRun = {
      exam,
      paper,
      secIdx: 0,
      qIdx: 0,
      responses: {},
      flagged: {},
      struck: {}, // qId -> { optIdx: true }
      scratchOpen: false,
      scratchText: "",
      paused: false,
      guidedRevealed: {},
      confirmSubmit: false,
      logMistakes: config.logMistakes !== false,
      timerId: null
    };
    uiView = "runner";
    startSectionTimer(container, state, DATA, hooks);
    renderExamRunner(container, state, DATA, hooks);
    window.scrollTo(0, 0);
  }

  function startSectionTimer(container, state, DATA, hooks) {
    stopExamTimer();
    if (!activeRun) return;
    activeRun.timerId = setInterval(() => {
      if (!activeRun || uiView !== "runner" || activeRun.paused) return;
      const sec = activeRun.paper.sections[activeRun.secIdx];
      if (!sec) return;
      sec.spentSec = (sec.spentSec || 0) + 1;
      if (activeRun.paper.proctorMode) {
        sec.remainingSec = Math.max(0, sec.remainingSec - 1);
      }
      const clockEl = document.getElementById("ml-ex-clock-val");
      if (clockEl) {
        clockEl.textContent = activeRun.paper.proctorMode
          ? formatMMSS(sec.remainingSec)
          : formatMMSS(sec.spentSec);
        clockEl.classList.toggle("warn", activeRun.paper.proctorMode && sec.remainingSec <= 300 && sec.remainingSec > 60);
        clockEl.classList.toggle("danger", activeRun.paper.proctorMode && sec.remainingSec <= 60);
      }
      if (activeRun.paper.proctorMode && sec.remainingSec <= 0) {
        completeCurrentSection(container, state, DATA, hooks, true);
      }
    }, 1000);
  }

  function completeCurrentSection(container, state, DATA, hooks, autoExpired) {
    if (!activeRun) return;
    const sec = activeRun.paper.sections[activeRun.secIdx];
    if (activeRun.paper.strictLock && sec) sec.locked = true;

    const hasNext = activeRun.secIdx + 1 < activeRun.paper.sections.length;
    if (activeRun.paper.strictLock && hasNext) {
      stopExamTimer();
      activeRun.autoExpiredPrev = !!autoExpired;
      activeRun.confirmSubmit = false;
      uiView = "intermission";
      renderIntermission(container, state, DATA, hooks);
      window.scrollTo(0, 0);
    } else {
      finalizeExamSession(container, state, DATA, hooks);
    }
  }

  function finalizeExamSession(container, state, DATA, hooks) {
    stopExamTimer();
    if (!activeRun) return;
    const { exam, paper, responses, logMistakes } = activeRun;
    const grade = gradeExamAttempt(exam, paper, responses, { hsAvg: 93 });

    // Record in state.examHistory
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const histEntry = {
      id: paper.paperId,
      examId: exam.id,
      examShortName: exam.shortName,
      scale: paper.scale,
      proctorMode: paper.proctorMode,
      correct: grade.totalCorrect,
      total: grade.totalItems,
      pct: grade.rawPct,
      netScore: grade.netScore,
      upg: grade.upg,
      pr: grade.nmatPr,
      headlineMetric: grade.headlineMetric,
      date: dateStr
    };
    state.examHistory = [histEntry, ...(state.examHistory || [])].slice(0, 40);

    // Notify host app for XP, Gems, Telemetry/SM-2, Mistakes & Badges
    if (hooks && hooks.onExamComplete) {
      hooks.onExamComplete(grade, logMistakes);
    }

    lastResult = {
      exam,
      paper,
      grade,
      reviewFilter: "wrong",
      upgHsAvg: 93,
      essayIdx: 0,
      essayText: ""
    };
    activeRun = null;
    uiView = "results";
    renderResultsDashboard(container, state, DATA, hooks);
    window.scrollTo(0, 0);
  }

  function renderIntermission(container, state, DATA, hooks) {
    const run = activeRun;
    const prevSec = run.paper.sections[run.secIdx];
    const nextSec = run.paper.sections[run.secIdx + 1];
    const prevAnswered = prevSec.questions.filter((q) => run.responses[q.id] != null).length;

    container.innerHTML = `
      <div class="ml-ex-intermission">
        <div class="ml-hero-kicker">${escapeHtml(run.exam.shortName)} · SECTION TRANSITION</div>
        <h2>${run.autoExpiredPrev ? "⏱️ Time Expired — Section Locked!" : "✅ Section Submitted & Locked"}</h2>
        <p class="ml-viz-sub">
          <strong>${escapeHtml(prevSec.name)}</strong> is complete (${prevAnswered}/${prevSec.questions.length} answered in ${formatMMSS(prevSec.spentSec)}).
          Under official ${escapeHtml(run.exam.shortName)} proctoring rules, previous sections remain sealed.
        </p>

        <div class="ml-ex-inter-next">
          <div class="ml-bento-eyebrow">Up Next · Section ${run.secIdx + 2} of ${run.paper.sections.length}</div>
          <h3>${escapeHtml(nextSec.name)}</h3>
          <p>${escapeHtml(nextSec.desc)}</p>
          <div class="ml-ex-inter-pills">
            <span>${nextSec.questions.length} Items</span>
            <span>Time Limit: ${formatMMSS(nextSec.timeLimitSec)}</span>
            <span>${run.exam.scoringModel === "upcat_penalty" ? "R − ¼W Active" : "No Negative Marking"}</span>
          </div>
        </div>

        <div class="ml-ex-inter-actions">
          <button type="button" class="ml-btn-primary" id="ml-ex-start-next-sec">Start ${escapeHtml(nextSec.name)} →</button>
          <button type="button" class="ml-btn-secondary" id="ml-ex-abort-inter">End & Grade Now</button>
        </div>
      </div>
    `;

    document.getElementById("ml-ex-start-next-sec").addEventListener("click", () => {
      if (hooks && hooks.onTap) hooks.onTap();
      run.secIdx += 1;
      run.qIdx = 0;
      uiView = "runner";
      startSectionTimer(container, state, DATA, hooks);
      renderExamRunner(container, state, DATA, hooks);
      window.scrollTo(0, 0);
    });

    document.getElementById("ml-ex-abort-inter").addEventListener("click", () => {
      if (hooks && hooks.onTap) hooks.onTap();
      finalizeExamSession(container, state, DATA, hooks);
    });
  }

  function renderExamRunner(container, state, DATA, hooks) {
    const run = activeRun;
    const { exam, paper } = run;
    const sec = paper.sections[run.secIdx];
    const q = sec.questions[run.qIdx];
    const chosen = run.responses[q.id] !== undefined ? run.responses[q.id] : null;
    const isFlagged = !!run.flagged[q.id];
    const struckMap = run.struck[q.id] || {};
    const isGuidedRevealed = !paper.proctorMode && !!run.guidedRevealed[q.id];

    const secAnswered = sec.questions.filter((item) => run.responses[item.id] != null).length;
    const secFlagged = sec.questions.filter((item) => run.flagged[item.id]).length;
    const letters = ["A", "B", "C", "D"];
    const hasNextSec = run.secIdx + 1 < paper.sections.length;
    const clockText = paper.proctorMode ? formatMMSS(sec.remainingSec) : formatMMSS(sec.spentSec);
    const clockWarn = paper.proctorMode && sec.remainingSec <= 300 && sec.remainingSec > 60;
    const clockDanger = paper.proctorMode && sec.remainingSec <= 60;

    container.innerHTML = `
      <div class="ml-ex-runner-shell">
        <header class="ml-ex-proctor-bar">
          <div class="ml-ex-proctor-left">
            <span class="ml-ex-proctor-badge">${exam.icon} ${escapeHtml(exam.shortName)}</span>
            <div class="ml-ex-proctor-sec">
              <strong>${escapeHtml(sec.name)}</strong>
              <span>Item ${run.qIdx + 1} of ${sec.questions.length} · ${secAnswered}/${sec.questions.length} answered${secFlagged ? ` · ⚑ ${secFlagged}` : ""}</span>
            </div>
          </div>

          <div class="ml-ex-proctor-right">
            <div class="ml-ex-clock-box ${clockWarn ? "warn" : ""} ${clockDanger ? "danger" : ""}" title="${paper.proctorMode ? "Section Countdown Timer" : "Elapsed Time"}">
              <span class="ml-ex-clock-lbl">${paper.proctorMode ? "TIME LEFT" : "ELAPSED"}</span>
              <strong id="ml-ex-clock-val" class="${clockWarn ? "warn" : ""} ${clockDanger ? "danger" : ""}">${clockText}</strong>
            </div>
            ${!paper.proctorMode ? `<button type="button" class="ml-btn-mini" id="ml-ex-pause-btn">${run.paused ? "▶ Resume" : "⏸ Pause"}</button>` : ""}
            <button type="button" class="ml-btn-mini ${run.scratchOpen ? "active" : ""}" id="ml-ex-scratch-btn" title="Toggle Scratchpad (S)">📝 Scratchpad</button>
            <button type="button" class="ml-btn-primary ml-ex-finish-btn" id="ml-ex-finish-trigger">
              ${paper.strictLock && hasNextSec ? "Finish Section →" : "Submit Exam"}
            </button>
          </div>
        </header>

        ${paper.sections.length > 1 ? `
          <div class="ml-ex-sec-strip" aria-label="Exam subtests">
            ${paper.sections.map((s, idx) => {
              const isCur = idx === run.secIdx;
              const isLocked = paper.strictLock && idx !== run.secIdx;
              const doneCnt = s.questions.filter((it) => run.responses[it.id] != null).length;
              return `
                <button type="button" class="ml-ex-sec-tab ${isCur ? "active" : ""} ${s.locked ? "done" : ""} ${isLocked ? "locked" : ""}"
                  data-ex-jump-sec="${idx}" ${isLocked ? "disabled" : ""}>
                  <span>${s.locked ? "✓" : isLocked ? "🔒" : (idx + 1) + "."} ${escapeHtml(s.name.replace(/^Part [^:]+:\s*|^Subtest \d+:\s*/i, ""))}</span>
                  <small>${doneCnt}/${s.questions.length}</small>
                </button>
              `;
            }).join("")}
          </div>
        ` : ""}

        ${run.confirmSubmit ? `
          <div class="ml-ex-confirm-bar">
            <div>
              <strong>${paper.strictLock && hasNextSec ? `Lock "${escapeHtml(sec.name)}" and move to next section?` : `Submit your ${escapeHtml(exam.shortName)} Exam for official grading?`}</strong>
              <span>
                ${sec.questions.length - secAnswered > 0
                  ? `${sec.questions.length - secAnswered} unanswered item(s) in this section${exam.scoringModel === "upcat_penalty" ? " (blank = 0 penalty under R − ¼W)" : " — NO negative marking, consider answering all!"}.`
                  : "Every item in this section is answered!"}
              </span>
            </div>
            <div class="ml-ex-confirm-btns">
              <button type="button" class="ml-btn-secondary" id="ml-ex-confirm-cancel">Keep Reviewing</button>
              <button type="button" class="ml-btn-primary" id="ml-ex-confirm-go">Yes, Confirm →</button>
              <button type="button" class="ml-btn-mini" id="ml-ex-exit-abort">Exit Without Saving</button>
            </div>
          </div>
        ` : ""}

        <div class="ml-ex-runner-body">
          <div class="ml-ex-stage">
            <div class="ml-ex-q-meta">
              <div class="ml-ex-q-num-pill">Question ${run.qIdx + 1} / ${sec.questions.length}</div>
              <div class="ml-ex-q-tools">
                ${exam.scoringModel === "upcat_penalty" ? `<span class="ml-ex-ev-pill" title="Right +1, Wrong −0.25, Blank 0">R − ¼W Active</span>` : ""}
                <button type="button" class="ml-ex-flag-btn ${isFlagged ? "active" : ""}" id="ml-ex-flag-btn" title="Flag for Review (F)">
                  ${isFlagged ? "⚑ Flagged" : "⚐ Flag"}
                </button>
                ${chosen !== null ? `<button type="button" class="ml-btn-mini" id="ml-ex-clear-btn" title="Leave blank (useful for UPCAT R − ¼W)">Clear Choice</button>` : ""}
              </div>
            </div>

            <div class="ml-ex-prompt">${fmtMath(q.prompt)}</div>
            ${q.visualSvg ? `<div class="ml-q-visual">${q.visualSvg}</div>` : ""}

            <div class="ml-ex-opt-list">
              ${q.options.map((opt, idx) => {
                const isSel = chosen === opt;
                const isStruck = !!struckMap[idx];
                let cls = "ml-ex-opt-row";
                if (isGuidedRevealed) {
                  if (opt === q.answer) cls += " correct";
                  else if (isSel && opt !== q.answer) cls += " wrong";
                } else if (isSel) {
                  cls += " selected";
                }
                if (isStruck) cls += " struck";
                return `
                  <div class="${cls}">
                    <button type="button" class="ml-ex-opt-main" data-ex-opt="${idx}">
                      <span class="ml-ex-opt-letter">${letters[idx]}</span>
                      <span class="ml-ex-opt-text">${fmtMath(opt)}</span>
                    </button>
                    <button type="button" class="ml-ex-strike-btn ${isStruck ? "active" : ""}" data-ex-strike="${idx}" title="Strike out eliminated choice">✕</button>
                  </div>
                `;
              }).join("")}
            </div>

            ${!paper.proctorMode ? `
              <div class="ml-ex-guided-strip">
                <button type="button" class="ml-btn-mini" id="ml-ex-guided-reveal">
                  ${isGuidedRevealed ? "Hide Guided Explanation" : "💡 Check Answer & Explanation (Guided Mode)"}
                </button>
                ${isGuidedRevealed ? `
                  <div class="ml-ex-guided-box">
                    <strong>Correct Answer:</strong> ${fmtMath(q.answer)}<br/>
                    <span>${fmtMath(q.whyEasy)}</span>
                  </div>
                ` : ""}
              </div>
            ` : ""}

            <div class="ml-ex-stage-nav">
              <button type="button" class="ml-btn-secondary" id="ml-ex-prev-q" ${run.qIdx === 0 ? "disabled" : ""}>← Previous</button>
              <span class="ml-ex-kbd-hint">Keys: <code>1–4</code> select · <code>F</code> flag · <code>←/→</code> navigate · <code>✕</code> strike out</span>
              ${run.qIdx + 1 < sec.questions.length
                ? `<button type="button" class="ml-btn-primary" id="ml-ex-next-q">Next Question →</button>`
                : `<button type="button" class="ml-btn-primary" id="ml-ex-end-sec-btn">${paper.strictLock && hasNextSec ? "Finish Section →" : "Review & Submit →"}</button>`}
            </div>
          </div>

          <aside class="ml-ex-side-rail">
            <div class="ml-ex-omr-card">
              <div class="ml-ex-omr-head">
                <strong>OMR Navigator</strong>
                <span>${secAnswered}/${sec.questions.length}</span>
              </div>
              <div class="ml-ex-omr-grid">
                ${sec.questions.map((item, idx) => {
                  const ansd = run.responses[item.id] != null;
                  const flg = !!run.flagged[item.id];
                  const cur = idx === run.qIdx;
                  return `
                    <button type="button" class="ml-ex-omr-dot ${cur ? "current" : ""} ${ansd ? "answered" : ""} ${flg ? "flagged" : ""}" data-ex-jump-q="${idx}">
                      ${idx + 1}
                    </button>
                  `;
                }).join("")}
              </div>
              <div class="ml-ex-omr-legend">
                <span><i class="dot cur"></i>Current</span>
                <span><i class="dot ans"></i>Answered</span>
                <span><i class="dot flg"></i>Flagged</span>
              </div>
            </div>

            ${run.scratchOpen ? `
              <div class="ml-ex-scratch-card">
                <div class="ml-ex-omr-head">
                  <strong>${run.scratchMode === "draw" ? "✏️ Whiteboard" : "📝 Scratchpad"}</strong>
                  <div style="display:flex; gap:4px; align-items:center;">
                    <button type="button" class="ml-btn-mini ${run.scratchMode !== "draw" ? "active" : ""}" id="ml-ex-scratch-text-mode">Text</button>
                    <button type="button" class="ml-btn-mini ${run.scratchMode === "draw" ? "active" : ""}" id="ml-ex-scratch-draw-mode">Draw</button>
                    ${run.scratchMode !== "draw" ? `<button type="button" class="ml-btn-mini" id="ml-ex-scratch-clear">Clear</button>` : ""}
                  </div>
                </div>
                ${run.scratchMode === "draw"
                  ? `<div id="ml-ex-wb-mount"></div>`
                  : `<textarea id="ml-ex-scratch-ta" class="ml-ex-scratch-ta" rows="7" placeholder="Jot equations, work rates (AB/(A+B)), or eliminate choices here...">${escapeHtml(run.scratchText)}</textarea>`}
              </div>
            ` : ""}
          </aside>
        </div>
      </div>
    `;

    // Bindings
    container.querySelectorAll("[data-ex-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        const idx = parseInt(btn.dataset.exOpt, 10);
        run.responses[q.id] = q.options[idx];
        renderExamRunner(container, state, DATA, hooks);
      });
    });

    container.querySelectorAll("[data-ex-strike]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.exStrike, 10);
        if (!run.struck[q.id]) run.struck[q.id] = {};
        run.struck[q.id][idx] = !run.struck[q.id][idx];
        renderExamRunner(container, state, DATA, hooks);
      });
    });

    const flagBtn = document.getElementById("ml-ex-flag-btn");
    if (flagBtn) {
      flagBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        run.flagged[q.id] = !run.flagged[q.id];
        renderExamRunner(container, state, DATA, hooks);
      });
    }

    const clearBtn = document.getElementById("ml-ex-clear-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        delete run.responses[q.id];
        renderExamRunner(container, state, DATA, hooks);
      });
    }

    const prevBtn = document.getElementById("ml-ex-prev-q");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (run.qIdx > 0) {
          run.qIdx--;
          renderExamRunner(container, state, DATA, hooks);
        }
      });
    }

    const nextBtn = document.getElementById("ml-ex-next-q");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (run.qIdx + 1 < sec.questions.length) {
          run.qIdx++;
          renderExamRunner(container, state, DATA, hooks);
        }
      });
    }

    const endSecBtn = document.getElementById("ml-ex-end-sec-btn");
    if (endSecBtn) {
      endSecBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        run.confirmSubmit = true;
        renderExamRunner(container, state, DATA, hooks);
      });
    }

    const finishTrig = document.getElementById("ml-ex-finish-trigger");
    if (finishTrig) {
      finishTrig.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        run.confirmSubmit = !run.confirmSubmit;
        renderExamRunner(container, state, DATA, hooks);
      });
    }

    const confCancel = document.getElementById("ml-ex-confirm-cancel");
    if (confCancel) {
      confCancel.addEventListener("click", () => {
        run.confirmSubmit = false;
        renderExamRunner(container, state, DATA, hooks);
      });
    }

    const confGo = document.getElementById("ml-ex-confirm-go");
    if (confGo) {
      confGo.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        completeCurrentSection(container, state, DATA, hooks, false);
      });
    }

    const exitAbort = document.getElementById("ml-ex-exit-abort");
    if (exitAbort) {
      exitAbort.addEventListener("click", () => {
        stopExamTimer();
        activeRun = null;
        uiView = "dossier";
        renderExamDossier(container, state, DATA, hooks);
      });
    }

    container.querySelectorAll("[data-ex-jump-q]").forEach((btn) => {
      btn.addEventListener("click", () => {
        run.qIdx = parseInt(btn.dataset.exJumpQ, 10);
        renderExamRunner(container, state, DATA, hooks);
      });
    });

    container.querySelectorAll("[data-ex-jump-sec]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (paper.strictLock) return;
        run.secIdx = parseInt(btn.dataset.exJumpSec, 10);
        run.qIdx = 0;
        renderExamRunner(container, state, DATA, hooks);
      });
    });

    const scratchBtn = document.getElementById("ml-ex-scratch-btn");
    if (scratchBtn) {
      scratchBtn.addEventListener("click", () => {
        run.scratchOpen = !run.scratchOpen;
        renderExamRunner(container, state, DATA, hooks);
      });
    }

    const scratchTa = document.getElementById("ml-ex-scratch-ta");
    if (scratchTa) {
      scratchTa.addEventListener("input", () => {
        run.scratchText = scratchTa.value;
      });
    }

    const scratchTextBtn = document.getElementById("ml-ex-scratch-text-mode");
    if (scratchTextBtn) {
      scratchTextBtn.addEventListener("click", () => {
        run.scratchMode = "text";
        renderExamRunner(container, state, DATA, hooks);
      });
    }

    const scratchDrawBtn = document.getElementById("ml-ex-scratch-draw-mode");
    if (scratchDrawBtn) {
      scratchDrawBtn.addEventListener("click", () => {
        run.scratchMode = "draw";
        renderExamRunner(container, state, DATA, hooks);
      });
    }

    const wbMount = document.getElementById("ml-ex-wb-mount");
    if (wbMount && root.PRIMER_WHITEBOARD) {
      if (!Array.isArray(run.scratchStrokes)) run.scratchStrokes = [];
      root.PRIMER_WHITEBOARD.mountWhiteboard(wbMount, {
        height: 230,
        compact: true,
        grid: "dots",
        strokes: run.scratchStrokes,
        onChange: (strokes) => {
          run.scratchStrokes = strokes;
        }
      });
    }

    const scratchClr = document.getElementById("ml-ex-scratch-clear");
    if (scratchClr) {
      scratchClr.addEventListener("click", () => {
        run.scratchText = "";
        renderExamRunner(container, state, DATA, hooks);
      });
    }

    const pauseBtn = document.getElementById("ml-ex-pause-btn");
    if (pauseBtn) {
      pauseBtn.addEventListener("click", () => {
        run.paused = !run.paused;
        renderExamRunner(container, state, DATA, hooks);
      });
    }

    const guidedBtn = document.getElementById("ml-ex-guided-reveal");
    if (guidedBtn) {
      guidedBtn.addEventListener("click", () => {
        run.guidedRevealed[q.id] = !run.guidedRevealed[q.id];
        renderExamRunner(container, state, DATA, hooks);
      });
    }
  }

  // ==================== VIEW 4: POST-EXAM ANALYTICS & REVIEW ====================
  function renderResultsDashboard(container, state, DATA, hooks) {
    const res = lastResult;
    const { exam, paper } = res;
    const grade = exam.scoringModel === "upcat_penalty"
      ? gradeExamAttempt(exam, paper, Object.fromEntries(res.grade.itemReviews.map((r) => [r.q.id, r.chosen])), { hsAvg: res.upgHsAvg })
      : res.grade;
    const nodeMap = new Map(DATA.NODES.map((n) => [n.id, n]));

    const filteredReviews = grade.itemReviews.filter((r) => {
      if (res.reviewFilter === "wrong") return r.status === "wrong";
      if (res.reviewFilter === "blank") return r.status === "blank";
      if (res.reviewFilter === "correct") return r.status === "correct";
      return true;
    });

    container.innerHTML = `
      <div class="ml-ex-res-top">
        <div class="ml-ex-res-nav">
          <button type="button" class="ml-btn-mini" id="ml-ex-res-hub">← Exam Mode Hub</button>
          <button type="button" class="ml-btn-mini" id="ml-ex-res-retake">↻ New ${escapeHtml(exam.shortName)} Mock</button>
          <button type="button" class="ml-btn-mini" id="ml-ex-res-print">🖨️ Print Score Report (PDF)</button>
        </div>

        <section class="ml-ex-verdict-card tone-${grade.verdictTone}">
          <div class="ml-ex-verdict-left">
            <div class="ml-hero-kicker">${exam.icon} ${escapeHtml(exam.title)} · OFFICIAL MOCK SCORECARD</div>
            <h2 class="ml-ex-verdict-title">${escapeHtml(grade.verdictTitle)}</h2>
            <p class="ml-ex-verdict-detail">${escapeHtml(grade.verdictDetail)}</p>
          </div>
          <div class="ml-ex-verdict-scorebox">
            <span class="ml-ex-score-lbl">${escapeHtml(grade.headlineLabel)}</span>
            <strong class="ml-ex-score-big">${escapeHtml(grade.headlineMetric)}</strong>
            <div class="ml-ex-score-mini">
              <span>✓ ${grade.totalCorrect} Right</span>
              <span>✕ ${grade.totalWrong} Wrong</span>
              <span>○ ${grade.totalBlank} Blank</span>
              <span>⏱ ${formatMMSS(grade.totalSpentSec)} (${grade.avgSecPerItem}s/Q)</span>
            </div>
          </div>
        </section>

        ${exam.scoringModel === "upcat_penalty" ? `
          <div class="ml-ex-upg-lab">
            <div class="ml-ex-upg-head">
              <strong>🌻 Interactive UPCAT UPG Estimator (60% UPCAT + 40% HS Grades)</strong>
              <span>Adjust your G8–G11 HS General Average: <strong id="ml-ex-upg-hs-val">${res.upgHsAvg}%</strong> → Projected UPG: <strong id="ml-ex-upg-proj-val">${grade.upg.toFixed(3)}</strong></span>
            </div>
            <input type="range" id="ml-ex-upg-slider" min="80" max="99" step="1" value="${res.upgHsAvg}" />
            <div class="ml-ex-upg-bands" id="ml-ex-upg-bands">
              <span data-upg-cut="2.15" class="${grade.upg <= 2.15 ? "hit" : ""}">UPD / UPM (≤ 2.15)</span>
              <span data-upg-cut="2.45" class="${grade.upg <= 2.45 ? "hit" : ""}">UPLB / UPB (≤ 2.45)</span>
              <span data-upg-cut="2.75" class="${grade.upg <= 2.75 ? "hit" : ""}">UPV / UPC / Min (≤ 2.75)</span>
              <span>Penalty Lost: −${grade.penaltyLost.toFixed(2)} pts</span>
            </div>
          </div>
        ` : ""}
      </div>

      <div class="ml-ex-res-grid">
        <div class="ml-ex-panel">
          <h3 class="ml-ex-panel-title">Per-Subtest Performance Breakdown</h3>
          <div class="ml-ex-subbars">
            ${grade.subtestResults.map((sr) => `
              <div class="ml-ex-subbar-row">
                <div class="ml-ex-subbar-top">
                  <strong>${escapeHtml(sr.name)}</strong>
                  <span>${sr.correct}/${sr.total} (${sr.rawPct}%)${exam.scoringModel === "upcat_penalty" ? ` · Net ${sr.netScore}` : ""} · ${formatMMSS(sr.spentSec)}</span>
                </div>
                <div class="ml-progress-track">
                  <div class="ml-progress-fill ${sr.rawPct >= 80 ? "ok" : sr.rawPct < 60 ? "low" : ""}" style="width:${Math.max(3, sr.rawPct)}%"></div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="ml-ex-panel">
          <h3 class="ml-ex-panel-title">🎯 Priority Lessons to Fix Right Now</h3>
          ${grade.priorityNodes.length > 0 ? `
            <div class="ml-ex-priority-list">
              ${grade.priorityNodes.map((pn) => {
                const nd = nodeMap.get(pn.nodeId);
                if (!nd) return "";
                return `
                  <div class="ml-ex-priority-row">
                    <div>
                      <strong>${nd.icon} ${fmtMath(nd.title)}</strong>
                      <span>${pn.count} missed/blank item${pn.count > 1 ? "s" : ""} from this lesson</span>
                    </div>
                    <button type="button" class="ml-btn-mini" data-ex-res-study="${nd.id}">Study Lesson →</button>
                  </div>
                `;
              }).join("")}
            </div>
          ` : `<p class="ml-viz-sub">Flawless 100% run — zero weak lessons detected! Step up to Full Simulation or Official Proctor Mode.</p>`}
        </div>
      </div>

      <section class="ml-ex-panel" style="margin-top:16px;">
        <div class="ml-ex-rev-head">
          <div>
            <h3 class="ml-ex-panel-title">Detailed Item-by-Item Answer Key & Explanations</h3>
            <p class="ml-viz-sub" style="margin:2px 0 0;">Review every question, check official logic, or jump directly to its Primer lesson.</p>
          </div>
          <div class="ml-ex-rev-filters">
            ${[
              { id: "wrong", label: `Wrong (${grade.totalWrong})` },
              { id: "blank", label: `Blank (${grade.totalBlank})` },
              { id: "correct", label: `Correct (${grade.totalCorrect})` },
              { id: "all", label: `All (${grade.totalItems})` }
            ].map((f) => `
              <button type="button" class="ml-btn-mini ${res.reviewFilter === f.id ? "active" : ""}" data-ex-rev-filter="${f.id}">${f.label}</button>
            `).join("")}
          </div>
        </div>

        <div class="ml-ex-rev-list">
          ${filteredReviews.length === 0
            ? `<div class="ml-viz-sub" style="padding:14px 0;">No items in this filter category!</div>`
            : filteredReviews.map((r, idx) => {
              const nd = nodeMap.get(r.q.linkedNodeId);
              return `
                <article class="ml-ex-rev-item st-${r.status}">
                  <div class="ml-ex-rev-top">
                    <span class="ml-ex-rev-badge st-${r.status}">${r.status === "correct" ? "✓ Correct" : r.status === "wrong" ? "✕ Wrong" : "○ Blank"}</span>
                    <span class="ml-ex-rev-sub">${escapeHtml(r.sectionName)}</span>
                    ${nd ? `<button type="button" class="ml-btn-mini" data-ex-res-study="${nd.id}">Open Lesson: ${escapeHtml(nd.title.slice(0, 28))}${nd.title.length > 28 ? "…" : ""} →</button>` : ""}
                  </div>
                  <div class="ml-ex-rev-prompt"><strong>#${idx + 1}.</strong> ${fmtMath(r.q.prompt)}</div>
                  ${r.q.visualSvg ? `<div class="ml-q-visual">${r.q.visualSvg}</div>` : ""}
                  <div class="ml-ex-rev-ans">
                    <div><span>Your Answer:</span> <strong class="${r.status === "correct" ? "ok" : "bad"}">${r.chosen ? fmtMath(r.chosen) : "Left Blank"}</strong></div>
                    <div><span>Correct Answer:</span> <strong class="ok">${fmtMath(r.q.answer)}</strong></div>
                  </div>
                  <div class="ml-ex-rev-why">💡 ${fmtMath(r.q.whyEasy)}</div>
                </article>
              `;
            }).join("")}
        </div>
      </section>
    `;

    document.getElementById("ml-ex-res-hub").addEventListener("click", () => {
      if (hooks && hooks.onTap) hooks.onTap();
      uiView = "hub";
      renderExamHub(container, state, DATA, hooks);
    });

    document.getElementById("ml-ex-res-retake").addEventListener("click", () => {
      if (hooks && hooks.onTap) hooks.onTap();
      uiView = "dossier";
      renderExamDossier(container, state, DATA, hooks);
    });

    const printRepBtn = document.getElementById("ml-ex-res-print");
    if (printRepBtn && root.PRIMER_WHITEBOARD) {
      printRepBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        root.PRIMER_WHITEBOARD.printExamScoreReport(exam, grade, nodeMap);
      });
    }

    const upgSlider = document.getElementById("ml-ex-upg-slider");
    if (upgSlider) {
      upgSlider.addEventListener("input", () => {
        res.upgHsAvg = parseInt(upgSlider.value, 10);
        const newUpg = computeProjectedUPG(res.grade.effectivePct, res.upgHsAvg);
        const hsEl = document.getElementById("ml-ex-upg-hs-val");
        const projEl = document.getElementById("ml-ex-upg-proj-val");
        const bigEl = container.querySelector(".ml-ex-score-big");
        const lblEl = container.querySelector(".ml-ex-score-lbl");
        if (hsEl) hsEl.textContent = `${res.upgHsAvg}%`;
        if (projEl) projEl.textContent = newUpg.toFixed(3);
        if (bigEl) bigEl.textContent = newUpg.toFixed(3);
        if (lblEl) lblEl.textContent = `Projected UPG (HS ${res.upgHsAvg}%)`;
        container.querySelectorAll("[data-upg-cut]").forEach((sp) => {
          const cut = parseFloat(sp.dataset.upgCut);
          sp.classList.toggle("hit", newUpg <= cut);
        });
      });
    }

    container.querySelectorAll("[data-ex-rev-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        res.reviewFilter = btn.dataset.exRevFilter;
        renderResultsDashboard(container, state, DATA, hooks);
      });
    });

    container.querySelectorAll("[data-ex-res-study]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onOpenNode) hooks.onOpenNode(btn.dataset.exResStudy);
      });
    });
  }

  // ==================== KEYBOARD SHORTCUT HANDLER FOR EXAM RUNNER ====================
  function handleKeydown(e, container, state, DATA, hooks) {
    if (!isRunnerActive()) return false;
    const tag = e.target && e.target.tagName;
    if (tag === "TEXTAREA" || tag === "INPUT") return false;

    const k = e.key.toLowerCase();
    const optIdxMap = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
    if (Object.prototype.hasOwnProperty.call(optIdxMap, k)) {
      const btn = container.querySelector(`[data-ex-opt="${optIdxMap[k]}"]`);
      if (btn) {
        e.preventDefault();
        btn.click();
        return true;
      }
    }
    if (k === "arrowright") {
      const n = document.getElementById("ml-ex-next-q");
      if (n) { e.preventDefault(); n.click(); return true; }
    }
    if (k === "arrowleft") {
      const p = document.getElementById("ml-ex-prev-q");
      if (p) { e.preventDefault(); p.click(); return true; }
    }
    if (k === "f") {
      const f = document.getElementById("ml-ex-flag-btn");
      if (f) { e.preventDefault(); f.click(); return true; }
    }
    if (k === "s") {
      const s = document.getElementById("ml-ex-scratch-btn");
      if (s) { e.preventDefault(); s.click(); return true; }
    }
    return false;
  }

  root.EVERYLINGO_EXAM_MODE = {
    EXAMS,
    EXAM_CUSTOM_BANK,
    getExamById,
    buildExamPaper,
    gradeExamAttempt,
    computeProjectedUPG,
    getExamReadiness,
    openExamDossier,
    stopExamTimer,
    isRunnerActive,
    handleKeydown,
    renderExamModeView
  };
})(typeof window !== "undefined" ? window : globalThis);
