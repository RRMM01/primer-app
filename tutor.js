(function (root) {
  "use strict";

  const DEPENDENCY_GRAPH = {
    // Era 1: Nursery
    "counting-subitizing": { prereqs: [], tier: 1, elo: 850, tag: "number_sense" },
    "even-odd-skip": { prereqs: ["counting-subitizing"], tier: 1, elo: 880, tag: "number_sense" },
    "make-10-addition": { prereqs: ["counting-subitizing"], tier: 1, elo: 900, tag: "arithmetic" },
    "distance-subtraction": { prereqs: ["make-10-addition"], tier: 1, elo: 920, tag: "arithmetic" },
    "zero-base10": { prereqs: ["make-10-addition"], tier: 1, elo: 930, tag: "number_sense" },

    // Era 2: Elementary
    "rect-multiplication": { prereqs: ["even-odd-skip", "make-10-addition"], tier: 2, elo: 980, tag: "times_table" },
    "reverse-division": { prereqs: ["rect-multiplication"], tier: 2, elo: 1010, tag: "times_table" },
    "primes-factors-lcm": { prereqs: ["even-odd-skip", "reverse-division"], tier: 2, elo: 1050, tag: "times_table" },
    "fractions-trenchcoat": { prereqs: ["reverse-division", "primes-factors-lcm"], tier: 2, elo: 1080, tag: "fractions_percents" },
    "decimals-percents": { prereqs: ["fractions-trenchcoat", "zero-base10"], tier: 2, elo: 1100, tag: "fractions_percents" },
    "pemdas-grammar": { prereqs: ["rect-multiplication", "distance-subtraction"], tier: 2, elo: 1060, tag: "arithmetic" },
    "perimeter-area-volume": { prereqs: ["rect-multiplication"], tier: 2, elo: 1040, tag: "trig_geometry" },
    "word-problems-translator": { prereqs: ["pemdas-grammar", "reverse-division"], tier: 2, elo: 1090, tag: "algebra_factoring" },
    "ratios-proportions-rates": { prereqs: ["fractions-trenchcoat", "reverse-division"], tier: 2, elo: 1110, tag: "fractions_percents" },

    // Era 3: Junior High
    "negatives-flip": { prereqs: ["distance-subtraction", "pemdas-grammar"], tier: 3, elo: 1150, tag: "negative_sign" },
    "squares-cubes-roots": { prereqs: ["rect-multiplication", "primes-factors-lcm"], tier: 3, elo: 1180, tag: "exponents_logs" },
    "exponents-roots": { prereqs: ["squares-cubes-roots", "negatives-flip", "fractions-trenchcoat"], tier: 3, elo: 1240, tag: "exponents_logs" },
    "algebra-scale": { prereqs: ["negatives-flip", "pemdas-grammar", "word-problems-translator"], tier: 3, elo: 1220, tag: "algebra_factoring" },
    "systems-equations": { prereqs: ["algebra-scale"], tier: 3, elo: 1280, tag: "algebra_factoring" },
    "factoring-foil": { prereqs: ["rect-multiplication", "negatives-flip", "primes-factors-lcm"], tier: 3, elo: 1320, tag: "algebra_factoring" },
    "slope-lines": { prereqs: ["algebra-scale", "fractions-trenchcoat"], tier: 3, elo: 1270, tag: "algebra_factoring" },
    "geometry-pythagoras": { prereqs: ["squares-cubes-roots", "perimeter-area-volume"], tier: 3, elo: 1260, tag: "trig_geometry" },

    // Era 4: Senior High (Grade 10-12)
    "quadratics-symmetry": { prereqs: ["factoring-foil", "squares-cubes-roots", "algebra-scale"], tier: 4, elo: 1420, tag: "algebra_factoring" },
    "complex-imaginary-i": { prereqs: ["squares-cubes-roots", "negatives-flip"], tier: 4, elo: 1440, tag: "exponents_logs" },
    "functions-shifting": { prereqs: ["algebra-scale", "slope-lines"], tier: 4, elo: 1430, tag: "algebra_factoring" },
    "logarithms-unlocked": { prereqs: ["exponents-roots", "functions-shifting"], tier: 4, elo: 1500, tag: "exponents_logs" },
    "trig-unit-circle": { prereqs: ["geometry-pythagoras", "fractions-trenchcoat"], tier: 4, elo: 1520, tag: "trig_geometry" },
    "conics-distance-circles": { prereqs: ["geometry-pythagoras", "quadratics-symmetry"], tier: 4, elo: 1480, tag: "trig_geometry" },
    "sequences-sigma": { prereqs: ["exponents-roots", "algebra-scale"], tier: 4, elo: 1470, tag: "algebra_factoring" },
    "stats-normal-curve": { prereqs: ["decimals-percents", "algebra-scale"], tier: 4, elo: 1410, tag: "fractions_percents" },
    "polynomials-remainder-div": { prereqs: ["factoring-foil", "functions-shifting"], tier: 4, elo: 1490, tag: "algebra_factoring" },

    // Era 5: College Math
    "limits-potholes": { prereqs: ["factoring-foil", "functions-shifting"], tier: 5, elo: 1620, tag: "calculus" },
    "derivatives-speedometer": { prereqs: ["limits-potholes", "exponents-roots", "slope-lines"], tier: 5, elo: 1680, tag: "calculus" },
    "chain-product-optimization": { prereqs: ["derivatives-speedometer", "functions-shifting"], tier: 5, elo: 1760, tag: "calculus" },
    "integrals-area": { prereqs: ["derivatives-speedometer"], tier: 5, elo: 1740, tag: "calculus" },
    "calc3-partials-ode": { prereqs: ["derivatives-speedometer", "integrals-area", "logarithms-unlocked"], tier: 5, elo: 1850, tag: "calculus" },
    "linear-algebra-vectors": { prereqs: ["systems-equations", "geometry-pythagoras"], tier: 5, elo: 1720, tag: "trig_geometry" },
    "matrices-3d-transformations": { prereqs: ["linear-algebra-vectors"], tier: 5, elo: 1780, tag: "algebra_factoring" },
    "discrete-logic-mod": { prereqs: ["primes-factors-lcm", "logarithms-unlocked"], tier: 5, elo: 1700, tag: "number_sense" },
    "probability-bayes": { prereqs: ["fractions-trenchcoat", "decimals-percents", "sequences-sigma"], tier: 5, elo: 1690, tag: "fractions_percents" },

    // World 6: Physics
    "physics-units-vectors": { prereqs: ["geometry-pythagoras", "ratios-proportions-rates"], tier: 3, elo: 1290, tag: "physics" },
    "physics-kinematics": { prereqs: ["algebra-scale", "slope-lines"], tier: 4, elo: 1390, tag: "physics" },
    "physics-newton-forces": { prereqs: ["physics-kinematics", "physics-units-vectors"], tier: 4, elo: 1430, tag: "physics" },
    "physics-energy-momentum": { prereqs: ["physics-newton-forces", "squares-cubes-roots"], tier: 4, elo: 1480, tag: "physics" },
    "physics-waves-electricity": { prereqs: ["algebra-scale", "ratios-proportions-rates"], tier: 4, elo: 1460, tag: "physics" },
    "physics-modern-relativity": { prereqs: ["physics-energy-momentum", "exponents-roots"], tier: 5, elo: 1640, tag: "physics" },

    // World 7: Chemistry
    "chem-atoms-periodic": { prereqs: ["zero-base10"], tier: 3, elo: 1220, tag: "chemistry" },
    "chem-bonds-polarity": { prereqs: ["chem-atoms-periodic"], tier: 3, elo: 1270, tag: "chemistry" },
    "chem-moles-stoich": { prereqs: ["ratios-proportions-rates", "chem-atoms-periodic"], tier: 4, elo: 1440, tag: "chemistry" },
    "chem-balancing-reactions": { prereqs: ["chem-moles-stoich", "algebra-scale"], tier: 4, elo: 1410, tag: "chemistry" },
    "chem-acids-bases-ph": { prereqs: ["logarithms-unlocked", "exponents-roots"], tier: 4, elo: 1520, tag: "chemistry" },
    "chem-gas-thermo-organic": { prereqs: ["algebra-scale", "chem-moles-stoich"], tier: 5, elo: 1580, tag: "chemistry" },

    // World 8: Biology
    "bio-cells-organelles": { prereqs: [], tier: 3, elo: 1180, tag: "biology" },
    "bio-osmosis-transport": { prereqs: ["bio-cells-organelles", "ratios-proportions-rates"], tier: 3, elo: 1280, tag: "biology" },
    "bio-energy-photosynthesis": { prereqs: ["bio-cells-organelles", "chem-balancing-reactions"], tier: 4, elo: 1420, tag: "biology" },
    "bio-dna-rna-proteins": { prereqs: ["bio-cells-organelles"], tier: 4, elo: 1380, tag: "biology" },
    "bio-mitosis-meiosis-genetics": { prereqs: ["bio-dna-rna-proteins", "decimals-percents"], tier: 4, elo: 1440, tag: "biology" },
    "bio-evolution-ecology": { prereqs: ["bio-mitosis-meiosis-genetics", "decimals-percents"], tier: 4, elo: 1400, tag: "biology" },

    // Expansion: Exam Math (+4)
    "abs-value-inequalities": { prereqs: ["algebra-scale", "negatives-flip"], tier: 3, elo: 1290, tag: "algebra_factoring" },
    "rational-radical-equations": { prereqs: ["factoring-foil", "squares-cubes-roots"], tier: 4, elo: 1470, tag: "algebra_factoring" },
    "circles-3d-geometry": { prereqs: ["geometry-pythagoras", "perimeter-area-volume"], tier: 4, elo: 1450, tag: "trig_geometry" },
    "permutations-combinatorics-piecewise": { prereqs: ["probability-bayes", "functions-shifting"], tier: 4, elo: 1510, tag: "algebra_factoring" },

    // Expansion: Exam Physics (+3)
    "physics-projectiles-circular-torque": { prereqs: ["physics-kinematics", "physics-units-vectors"], tier: 4, elo: 1490, tag: "physics" },
    "physics-thermo-fluids": { prereqs: ["physics-newton-forces", "ratios-proportions-rates"], tier: 4, elo: 1460, tag: "physics" },
    "physics-optics-magnetism": { prereqs: ["physics-waves-electricity", "trig-unit-circle"], tier: 4, elo: 1530, tag: "physics" },

    // Expansion: Exam Chemistry (+3)
    "chem-electron-config-trends": { prereqs: ["chem-atoms-periodic"], tier: 3, elo: 1320, tag: "chemistry" },
    "chem-vsepr-lewis-shapes": { prereqs: ["chem-bonds-polarity", "chem-electron-config-trends"], tier: 4, elo: 1420, tag: "chemistry" },
    "chem-equilibrium-redox-kinetics": { prereqs: ["chem-balancing-reactions", "chem-moles-stoich"], tier: 4, elo: 1540, tag: "chemistry" },

    // Expansion: Exam Biology (+4)
    "bio-macromolecules-enzymes": { prereqs: ["bio-cells-organelles"], tier: 3, elo: 1290, tag: "biology" },
    "bio-pedigrees-sex-linked": { prereqs: ["bio-mitosis-meiosis-genetics", "decimals-percents"], tier: 4, elo: 1460, tag: "biology" },
    "bio-human-physiology": { prereqs: ["bio-cells-organelles", "bio-osmosis-transport"], tier: 4, elo: 1410, tag: "biology" },
    "bio-taxonomy-plants-viruses": { prereqs: ["bio-evolution-ecology"], tier: 3, elo: 1310, tag: "biology" },

    // World 9: Verbal, Reading & Logic (+4)
    "verbal-grammar-syntax": { prereqs: [], tier: 3, elo: 1250, tag: "verbal_logic" },
    "verbal-reading-inference": { prereqs: ["verbal-grammar-syntax"], tier: 4, elo: 1380, tag: "verbal_logic" },
    "verbal-analogies-vocab": { prereqs: [], tier: 3, elo: 1300, tag: "verbal_logic" },
    "logic-deduction-abstract": { prereqs: ["verbal-reading-inference"], tier: 4, elo: 1450, tag: "verbal_logic" },

    // Expansion: PHYS2 Handouts (+6)
    "phys2-coulomb-electric-field": { prereqs: ["physics-newton-forces", "exponents-roots"], tier: 4, elo: 1520, tag: "physics" },
    "phys2-electric-potential": { prereqs: ["phys2-coulomb-electric-field", "physics-energy-momentum"], tier: 4, elo: 1560, tag: "physics" },
    "phys2-capacitors-dielectrics": { prereqs: ["phys2-electric-potential", "fractions-trenchcoat"], tier: 4, elo: 1600, tag: "physics" },
    "phys2-resistivity-ohms-dc": { prereqs: ["physics-waves-electricity", "algebra-scale"], tier: 4, elo: 1550, tag: "physics" },
    "phys2-kirchhoff-circuits": { prereqs: ["phys2-resistivity-ohms-dc", "systems-equations"], tier: 5, elo: 1640, tag: "physics" },
    "phys2-magnetism-lorentz-sources": { prereqs: ["phys2-coulomb-electric-field", "physics-projectiles-circular-torque", "trig-unit-circle"], tier: 5, elo: 1690, tag: "physics" },

    // Expansion: CHEM2 Syllabus (+6)
    "chem2-organic-polymers": { prereqs: ["chem-gas-thermo-organic", "chem-bonds-polarity"], tier: 4, elo: 1480, tag: "chemistry" },
    "chem2-imf-phases": { prereqs: ["chem-bonds-polarity", "chem-vsepr-lewis-shapes"], tier: 4, elo: 1510, tag: "chemistry" },
    "chem2-solutions-concentration": { prereqs: ["chem-moles-stoich", "ratios-proportions-rates"], tier: 4, elo: 1540, tag: "chemistry" },
    "chem2-colligative-properties": { prereqs: ["chem2-solutions-concentration", "chem2-imf-phases"], tier: 4, elo: 1610, tag: "chemistry" },
    "chem2-kinetics-ratelaw": { prereqs: ["chem-equilibrium-redox-kinetics", "exponents-roots"], tier: 5, elo: 1650, tag: "chemistry" },
    "chem2-thermo-entropy-gibbs": { prereqs: ["chem-gas-thermo-organic", "algebra-scale"], tier: 5, elo: 1680, tag: "chemistry" },

    // Expansion: BIO2 Syllabus (+4)
    "bio2-recombinant-dna": { prereqs: ["bio-dna-rna-proteins"], tier: 4, elo: 1470, tag: "biology" },
    "bio2-evolution-mechanisms": { prereqs: ["bio-evolution-ecology", "bio-pedigrees-sex-linked"], tier: 4, elo: 1460, tag: "biology" },
    "bio2-taxonomy-cladistics": { prereqs: ["bio-taxonomy-plants-viruses", "bio2-evolution-mechanisms"], tier: 4, elo: 1440, tag: "biology" },
    "bio2-plant-animal-systems": { prereqs: ["bio-human-physiology", "bio-taxonomy-plants-viruses"], tier: 4, elo: 1480, tag: "biology" },

    // World 10: WICA (+5)
    "wica-exits-transition": { prereqs: [], tier: 3, elo: 1220, tag: "wica_career" },
    "wica-21st-work-4ir": { prereqs: ["wica-exits-transition"], tier: 3, elo: 1280, tag: "wica_career" },
    "wica-growth-ethics": { prereqs: ["wica-exits-transition"], tier: 3, elo: 1260, tag: "wica_career" },
    "wica-jobs-resume-interview": { prereqs: ["wica-exits-transition", "wica-growth-ethics"], tier: 4, elo: 1340, tag: "wica_career" },
    "wica-research-pm-entrep": { prereqs: ["wica-21st-work-4ir", "verbal-reading-inference"], tier: 4, elo: 1380, tag: "wica_career" },

    // World 11: Personal Development (+4)
    "persdev-self-whole-person": { prereqs: [], tier: 3, elo: 1200, tag: "persdev_eq" },
    "persdev-adolescence-stress": { prereqs: ["persdev-self-whole-person"], tier: 3, elo: 1250, tag: "persdev_eq" },
    "persdev-brain-emotions-eq": { prereqs: ["persdev-self-whole-person"], tier: 3, elo: 1290, tag: "persdev_eq" },
    "persdev-relationships-leadership": { prereqs: ["persdev-brain-emotions-eq"], tier: 4, elo: 1320, tag: "persdev_eq" },

    // World 12: Wellness, Money & Leadership (+3)
    "wlns-fitness-excellence": { prereqs: [], tier: 3, elo: 1210, tag: "wellness_finance" },
    "wlns-money-literacy": { prereqs: ["decimals-percents"], tier: 3, elo: 1290, tag: "wellness_finance" },
    "wlns-leadership-legacy-godpreneur": { prereqs: ["persdev-relationships-leadership", "wlns-money-literacy"], tier: 4, elo: 1350, tag: "wellness_finance" },

    // Extra Math & STEM Bridges (+4)
    "math-vectors-3d-dot-cross": { prereqs: ["linear-algebra-vectors", "trig-unit-circle"], tier: 5, elo: 1710, tag: "trig_geometry" },
    "math-trig-identities-laws": { prereqs: ["trig-unit-circle", "geometry-pythagoras"], tier: 4, elo: 1560, tag: "trig_geometry" },
    "math-integration-techniques": { prereqs: ["integrals-area", "chain-product-optimization"], tier: 5, elo: 1790, tag: "calculus" },
    "math-financial-compound-annuities": { prereqs: ["exponents-roots", "decimals-percents", "logic-deduction-abstract"], tier: 4, elo: 1490, tag: "fractions_percents" },

    // World 13: Philippine History & Civics (+8)
    "ph-precolonial-spanish": { prereqs: [], tier: 3, elo: 1200, tag: "ph_history" },
    "ph-propaganda-katipunan-rev": { prereqs: ["ph-precolonial-spanish"], tier: 3, elo: 1260, tag: "ph_history" },
    "ph-american-japanese-ww2": { prereqs: ["ph-propaganda-katipunan-rev"], tier: 3, elo: 1290, tag: "ph_history" },
    "ph-martial-law-edsa-modern": { prereqs: ["ph-american-japanese-ww2"], tier: 3, elo: 1320, tag: "ph_history" },
    "ph-constitution-three-branches": { prereqs: ["ph-martial-law-edsa-modern"], tier: 4, elo: 1380, tag: "ph_history" },
    "ph-bill-of-rights-civics": { prereqs: ["ph-constitution-three-branches"], tier: 4, elo: 1410, tag: "ph_history" },
    "ph-local-gov-taxes-civic-life": { prereqs: ["ph-constitution-three-branches"], tier: 4, elo: 1370, tag: "ph_history" },
    "world-history-revolutions-civ": { prereqs: ["ph-precolonial-spanish"], tier: 3, elo: 1300, tag: "ph_history" },

    // World 14: Filipino — Wika, Gramatika at Pagbasa (+6)
    "fil-ponolohiya-baybay-diin": { prereqs: [], tier: 3, elo: 1220, tag: "filipino" },
    "fil-bahagi-ng-pananalita": { prereqs: ["fil-ponolohiya-baybay-diin"], tier: 3, elo: 1280, tag: "filipino" },
    "fil-ng-nang-din-rin-traps": { prereqs: ["fil-bahagi-ng-pananalita"], tier: 3, elo: 1340, tag: "filipino" },
    "fil-tayutay-idyoma-sawikain": { prereqs: ["fil-bahagi-ng-pananalita"], tier: 3, elo: 1310, tag: "filipino" },
    "fil-pagbasa-panitikan-uri": { prereqs: ["fil-ng-nang-din-rin-traps"], tier: 4, elo: 1360, tag: "filipino" },
    "fil-panitikang-pilipino-obra": { prereqs: ["fil-tayutay-idyoma-sawikain", "ph-propaganda-katipunan-rev"], tier: 4, elo: 1380, tag: "filipino" },

    // World 15: Abstract Shapes & Spatial Reasoning (+6)
    "abs-rotations-reflections": { prereqs: [], tier: 3, elo: 1240, tag: "abstract_shapes" },
    "abs-shape-sequences-progression": { prereqs: ["abs-rotations-reflections"], tier: 3, elo: 1310, tag: "abstract_shapes" },
    "abs-raven-matrices-logic": { prereqs: ["abs-shape-sequences-progression", "logic-deduction-abstract"], tier: 4, elo: 1450, tag: "abstract_shapes" },
    "abs-odd-one-out-analogies": { prereqs: ["abs-rotations-reflections"], tier: 3, elo: 1330, tag: "abstract_shapes" },
    "abs-3d-cube-folding-nets": { prereqs: ["abs-rotations-reflections"], tier: 4, elo: 1420, tag: "abstract_shapes" },
    "abs-paper-folding-spatial-views": { prereqs: ["abs-3d-cube-folding-nets"], tier: 4, elo: 1440, tag: "abstract_shapes" },

    // World 16: How AI Works (+8)
    "ai-basics-rules-vs-ml": { prereqs: [], tier: 3, elo: 1260, tag: "ai_ml" },
    "ai-perceptron-neural-nets": { prereqs: ["ai-basics-rules-vs-ml", "slope-lines"], tier: 4, elo: 1420, tag: "ai_ml" },
    "ai-training-loss-backprop": { prereqs: ["ai-perceptron-neural-nets", "derivatives-speedometer"], tier: 4, elo: 1540, tag: "ai_ml" },
    "ai-overfitting-eval-metrics": { prereqs: ["ai-basics-rules-vs-ml", "decimals-percents"], tier: 4, elo: 1450, tag: "ai_ml" },
    "ai-tokens-embeddings-vectors": { prereqs: ["ai-perceptron-neural-nets", "linear-algebra-vectors"], tier: 4, elo: 1520, tag: "ai_ml" },
    "ai-transformers-self-attention": { prereqs: ["ai-tokens-embeddings-vectors", "matrices-3d-transformations"], tier: 5, elo: 1660, tag: "ai_ml" },
    "ai-llm-generation-sampling": { prereqs: ["ai-transformers-self-attention", "probability-bayes"], tier: 5, elo: 1620, tag: "ai_ml" },
    "ai-rag-agents-prompt-safety": { prereqs: ["ai-tokens-embeddings-vectors", "ai-llm-generation-sampling"], tier: 5, elo: 1600, tag: "ai_ml" },

    // World 17: Web Dev — HTML, CSS & JS (+7)
    "code-html-anatomy-semantics": { prereqs: [], tier: 2, elo: 1120, tag: "web_coding" },
    "code-html-forms-tables-a11y": { prereqs: ["code-html-anatomy-semantics"], tier: 3, elo: 1200, tag: "web_coding" },
    "code-css-selectors-cascade": { prereqs: ["code-html-anatomy-semantics"], tier: 3, elo: 1240, tag: "web_coding" },
    "code-css-box-model-units": { prereqs: ["code-css-selectors-cascade"], tier: 3, elo: 1280, tag: "web_coding" },
    "code-css-flexbox-grid-responsive": { prereqs: ["code-css-box-model-units"], tier: 3, elo: 1340, tag: "web_coding" },
    "code-js-basics-dom-events": { prereqs: ["code-html-anatomy-semantics", "algebra-scale"], tier: 4, elo: 1410, tag: "web_coding" },
    "code-browser-rendering-http": { prereqs: ["code-html-anatomy-semantics", "code-css-selectors-cascade"], tier: 4, elo: 1380, tag: "web_coding" },

    // World 18: Python, Algorithms & Modern Tech (+9)
    "py-variables-types-io": { prereqs: [], tier: 2, elo: 1140, tag: "python_tech" },
    "py-conditionals-loops": { prereqs: ["py-variables-types-io"], tier: 3, elo: 1260, tag: "python_tech" },
    "py-lists-dicts-slicing": { prereqs: ["py-conditionals-loops"], tier: 3, elo: 1350, tag: "python_tech" },
    "py-functions-scope-oop": { prereqs: ["py-lists-dicts-slicing"], tier: 4, elo: 1430, tag: "python_tech" },
    "tech-binary-bits-hex-memory": { prereqs: ["exponents-roots"], tier: 3, elo: 1320, tag: "python_tech" },
    "tech-algorithms-bigo-ds": { prereqs: ["py-lists-dicts-slicing", "logarithms-unlocked"], tier: 4, elo: 1520, tag: "python_tech" },
    "tech-git-cli-databases-apis": { prereqs: ["py-variables-types-io", "code-browser-rendering-http"], tier: 4, elo: 1420, tag: "python_tech" },
    "tech-networking-internet-ip": { prereqs: ["code-browser-rendering-http", "tech-binary-bits-hex-memory"], tier: 4, elo: 1440, tag: "python_tech" },
    "tech-cybersecurity-crypto-cloud": { prereqs: ["tech-networking-internet-ip", "tech-git-cli-databases-apis"], tier: 4, elo: 1490, tag: "python_tech" },

    // Extended Physics Laws (+7)
    "physics-universal-gravitation-kepler": { prereqs: ["physics-newton-forces", "physics-projectiles-circular-torque"], tier: 4, elo: 1540, tag: "physics" },
    "physics-rotational-dynamics-angular": { prereqs: ["physics-projectiles-circular-torque", "physics-energy-momentum"], tier: 4, elo: 1580, tag: "physics" },
    "physics-shm-pendulums-resonance": { prereqs: ["physics-energy-momentum", "trig-unit-circle"], tier: 4, elo: 1530, tag: "physics" },
    "physics-sound-doppler-waves": { prereqs: ["physics-waves-electricity", "logarithms-unlocked"], tier: 4, elo: 1510, tag: "physics" },
    "physics-thermo-four-laws-engines": { prereqs: ["physics-thermo-fluids", "chem2-thermo-entropy-gibbs"], tier: 5, elo: 1620, tag: "physics" },
    "physics-faraday-induction-ac-maxwell": { prereqs: ["phys2-magnetism-lorentz-sources"], tier: 5, elo: 1680, tag: "physics" },
    "physics-quantum-photoelectric-nuclear": { prereqs: ["physics-modern-relativity", "exponents-roots"], tier: 5, elo: 1660, tag: "physics" },

    // Extended Math Essentials (+5)
    "math-estimation-mental-shortcuts": { prereqs: ["rect-multiplication", "make-10-addition"], tier: 2, elo: 1030, tag: "arithmetic" },
    "math-set-theory-venn-logic": { prereqs: ["counting-subitizing", "logic-deduction-abstract"], tier: 3, elo: 1240, tag: "number_sense" },
    "math-inequalities-intervals-sign-charts": { prereqs: ["abs-value-inequalities", "factoring-foil"], tier: 4, elo: 1460, tag: "algebra_factoring" },
    "math-stats-correlation-regression-zscore": { prereqs: ["stats-normal-curve", "slope-lines"], tier: 4, elo: 1490, tag: "fractions_percents" },
    "math-game-theory-graph-theory": { prereqs: ["discrete-logic-mod", "probability-bayes"], tier: 5, elo: 1730, tag: "number_sense" },
    "physics-mirrors-lenses-concave-convex": { prereqs: ["physics-optics-magnetism", "fractions-trenchcoat"], tier: 4, elo: 1520, tag: "physics" },
    "math-convex-concave-polygons-curves": { prereqs: ["derivatives-speedometer", "geometry-pythagoras"], tier: 4, elo: 1510, tag: "calculus" },
    "physics-fluids-buoyancy-bernoulli": { prereqs: ["physics-thermo-fluids", "physics-energy-momentum"], tier: 4, elo: 1550, tag: "physics" },
    "math-binomial-pascal-series-formulas": { prereqs: ["permutations-combinatorics-piecewise", "sequences-sigma"], tier: 4, elo: 1500, tag: "algebra_factoring" },

    // World 19: Earth, Space & Climate Science (+7)
    "earth-plate-tectonics-faults": { prereqs: [], tier: 2, elo: 1120, tag: "earth_space" },
    "earth-volcanoes-earthquakes-hazards": { prereqs: ["earth-plate-tectonics-faults", "logarithms-unlocked"], tier: 3, elo: 1240, tag: "earth_space" },
    "earth-minerals-rock-cycle": { prereqs: [], tier: 2, elo: 1100, tag: "earth_space" },
    "earth-atmosphere-typhoons-monsoons": { prereqs: ["physics-fluids-buoyancy-bernoulli"], tier: 3, elo: 1220, tag: "earth_space" },
    "earth-geologic-time-fossils": { prereqs: ["earth-minerals-rock-cycle", "exponents-roots"], tier: 3, elo: 1260, tag: "earth_space" },
    "earth-moon-phases-seasons-tides": { prereqs: ["physics-universal-gravitation-kepler"], tier: 3, elo: 1250, tag: "earth_space" },
    "earth-climate-greenhouse-energy": { prereqs: ["earth-atmosphere-typhoons-monsoons"], tier: 3, elo: 1280, tag: "earth_space" },

    // World 20: Economics, Business & PH Finance (+6)
    "econ-scarcity-opportunity-cost": { prereqs: ["ratios-proportions-rates"], tier: 2, elo: 1130, tag: "econ_finance" },
    "econ-supply-demand-elasticity": { prereqs: ["econ-scarcity-opportunity-cost", "slope-lines"], tier: 3, elo: 1260, tag: "econ_finance" },
    "econ-gdp-inflation-bsp": { prereqs: ["econ-supply-demand-elasticity", "decimals-percents"], tier: 3, elo: 1310, tag: "econ_finance" },
    "econ-market-structures": { prereqs: ["econ-supply-demand-elasticity"], tier: 3, elo: 1280, tag: "econ_finance" },
    "econ-financial-statements": { prereqs: ["econ-scarcity-opportunity-cost"], tier: 3, elo: 1290, tag: "econ_finance" },
    "econ-ph-personal-finance": { prereqs: ["wlns-money-literacy", "decimals-percents"], tier: 3, elo: 1250, tag: "econ_finance" },

    // World 21: Philosophy, Critical Thinking & Study Science (+7)
    "phil-logical-fallacies": { prereqs: ["verbal-reading-inference"], tier: 2, elo: 1160, tag: "philosophy_logic" },
    "phil-deductive-inductive-abductive": { prereqs: ["logic-deduction-abstract"], tier: 3, elo: 1320, tag: "philosophy_logic" },
    "phil-ethics-frameworks": { prereqs: ["phil-logical-fallacies"], tier: 3, elo: 1270, tag: "philosophy_logic" },
    "phil-cognitive-biases": { prereqs: ["phil-logical-fallacies", "persdev-brain-emotions-eq"], tier: 3, elo: 1290, tag: "philosophy_logic" },
    "phil-scientific-method-pseudoscience": { prereqs: ["phil-deductive-inductive-abductive"], tier: 3, elo: 1310, tag: "philosophy_logic" },
    "phil-stoicism-existentialism": { prereqs: ["phil-ethics-frameworks"], tier: 3, elo: 1260, tag: "philosophy_logic" },
    "phil-meta-learning-memory": { prereqs: ["phil-cognitive-biases"], tier: 2, elo: 1180, tag: "philosophy_logic" },

    // World 22: DSA Mastery (+8)
    "dsa-arrays-hashing-two-pointers": { prereqs: ["py-lists-dicts-slicing", "tech-algorithms-bigo-ds"], tier: 4, elo: 1460, tag: "dsa_mastery" },
    "dsa-stacks-queues-deques": { prereqs: ["dsa-arrays-hashing-two-pointers"], tier: 4, elo: 1490, tag: "dsa_mastery" },
    "dsa-linked-lists-pointers": { prereqs: ["dsa-arrays-hashing-two-pointers"], tier: 4, elo: 1510, tag: "dsa_mastery" },
    "dsa-recursion-call-stack": { prereqs: ["py-functions-scope-oop", "dsa-stacks-queues-deques"], tier: 4, elo: 1530, tag: "dsa_mastery" },
    "dsa-binary-search-sorting": { prereqs: ["dsa-arrays-hashing-two-pointers", "logarithms-unlocked"], tier: 4, elo: 1550, tag: "dsa_mastery" },
    "dsa-trees-bst-heaps": { prereqs: ["dsa-recursion-call-stack", "dsa-binary-search-sorting"], tier: 5, elo: 1620, tag: "dsa_mastery" },
    "dsa-graphs-bfs-dfs-dijkstra": { prereqs: ["dsa-trees-bst-heaps", "dsa-stacks-queues-deques"], tier: 5, elo: 1670, tag: "dsa_mastery" },
    "dsa-dp-memoization-sliding-window": { prereqs: ["dsa-recursion-call-stack", "dsa-arrays-hashing-two-pointers"], tier: 5, elo: 1710, tag: "dsa_mastery" },

    // World 23: Backend, SQL, APIs & DevOps (+8)
    "be-sql-select-where-order": { prereqs: ["tech-git-cli-databases-apis"], tier: 3, elo: 1360, tag: "backend_sql_dev" },
    "be-sql-joins-groupby-agg": { prereqs: ["be-sql-select-where-order"], tier: 4, elo: 1460, tag: "backend_sql_dev" },
    "be-sql-indexes-acid-transactions": { prereqs: ["be-sql-joins-groupby-agg", "dsa-trees-bst-heaps"], tier: 4, elo: 1560, tag: "backend_sql_dev" },
    "be-rest-apis-json-status-codes": { prereqs: ["code-browser-rendering-http", "tech-git-cli-databases-apis"], tier: 4, elo: 1440, tag: "backend_sql_dev" },
    "be-auth-hashing-jwt-oauth": { prereqs: ["be-rest-apis-json-status-codes", "tech-cybersecurity-crypto-cloud"], tier: 4, elo: 1540, tag: "backend_sql_dev" },
    "be-linux-cli-pipes-permissions": { prereqs: ["tech-git-cli-databases-apis", "tech-binary-bits-hex-memory"], tier: 4, elo: 1420, tag: "backend_sql_dev" },
    "be-git-internals-branching-rebase": { prereqs: ["be-linux-cli-pipes-permissions"], tier: 4, elo: 1470, tag: "backend_sql_dev" },
    "be-docker-ci-system-design": { prereqs: ["be-rest-apis-json-status-codes", "be-sql-indexes-acid-transactions"], tier: 5, elo: 1640, tag: "backend_sql_dev" },

    // World 24: Modern JS, TypeScript & Clean Architecture (+8)
    "js-closures-scope-hoisting": { prereqs: ["code-js-basics-dom-events"], tier: 4, elo: 1430, tag: "js_ts_architecture" },
    "js-functional-map-filter-reduce": { prereqs: ["js-closures-scope-hoisting"], tier: 4, elo: 1460, tag: "js_ts_architecture" },
    "js-async-promises-event-loop": { prereqs: ["js-closures-scope-hoisting", "code-browser-rendering-http"], tier: 4, elo: 1550, tag: "js_ts_architecture" },
    "js-fetch-dom-state-components": { prereqs: ["js-async-promises-event-loop", "be-rest-apis-json-status-codes"], tier: 4, elo: 1520, tag: "js_ts_architecture" },
    "ts-types-interfaces-generics": { prereqs: ["js-functional-map-filter-reduce"], tier: 4, elo: 1560, tag: "js_ts_architecture" },
    "code-oop-solid-design-patterns": { prereqs: ["py-functions-scope-oop", "ts-types-interfaces-generics"], tier: 5, elo: 1610, tag: "js_ts_architecture" },
    "code-testing-tdd-debugging": { prereqs: ["code-oop-solid-design-patterns", "be-git-internals-branching-rebase"], tier: 4, elo: 1540, tag: "js_ts_architecture" },
    "code-memory-concurrency-race-conditions": { prereqs: ["js-async-promises-event-loop", "be-sql-indexes-acid-transactions"], tier: 5, elo: 1680, tag: "js_ts_architecture" },

    // World 25: PH Competitive Exams & Specialized Mastery (+10)
    "exam-mechanical-technical-reasoning": { prereqs: ["physics-newton-forces"], tier: 4, elo: 1460, tag: "exam_mastery" },
    "exam-astronomy-stars-cosmos": { prereqs: ["earth-moon-phases-seasons-tides"], tier: 3, elo: 1360, tag: "exam_mastery" },
    "exam-data-interpretation-experiments": { prereqs: ["ratios-proportions-rates", "decimals-percents"], tier: 3, elo: 1380, tag: "exam_mastery" },
    "exam-number-letter-series-patterns": { prereqs: ["even-odd-skip", "squares-cubes-roots"], tier: 3, elo: 1350, tag: "exam_mastery" },
    "exam-word-problems-work-mixture-motion": { prereqs: ["algebra-scale", "fractions-trenchcoat", "ratios-proportions-rates"], tier: 4, elo: 1450, tag: "exam_mastery" },
    "exam-paragraph-org-error-spotting": { prereqs: ["verbal-grammar-syntax"], tier: 3, elo: 1390, tag: "exam_mastery" },
    "exam-nmat-perceptual-acuity": { prereqs: ["abs-rotations-reflections"], tier: 3, elo: 1400, tag: "exam_mastery" },
    "exam-nmat-social-science-psych-soc": { prereqs: ["persdev-self-whole-person"], tier: 3, elo: 1410, tag: "exam_mastery" },
    "exam-cse-ra6713-civics-env-laws": { prereqs: ["ph-constitution-three-branches"], tier: 3, elo: 1370, tag: "exam_mastery" },
    "exam-cse-clerical-filing-vocabulary": { prereqs: ["verbal-analogies-vocab"], tier: 3, elo: 1340, tag: "exam_mastery" }
  };

  const TAG_LABELS = {
    number_sense: "Number Sense, Sets & Graphs",
    arithmetic: "Mental + / −, Shortcuts & PEMDAS",
    times_table: "Multiplication & Division",
    fractions_percents: "Fractions, Ratios, %, Stats & Finance",
    negative_sign: "Negatives & Sign Flips",
    exponents_logs: "Exponents, Roots & Logs",
    algebra_factoring: "Algebra, Inequalities, Factoring & Lines",
    trig_geometry: "Geometry, Vectors & Trig",
    calculus: "Limits, Derivatives & Integrals",
    physics: "Physics, Universal Laws & PHYS2 E&M",
    chemistry: "Chemistry & CHEM2 Thermo/Kinetics",
    biology: "Biology & BIO2 Biotech/Systems",
    verbal_logic: "Verbal, Reading & Deductive Logic",
    wica_career: "WICA Career, 4IR & Research",
    persdev_eq: "Personal Development & EQ",
    wellness_finance: "Wellness, Money & Leadership",
    ph_history: "PH History, Civics & World Landmarks",
    filipino: "Filipino (Wika, Diin & Pagbasa)",
    abstract_shapes: "Abstract Shapes & Spatial Logic",
    ai_ml: "How AI Works (Neural Nets & LLMs)",
    web_coding: "HTML, CSS, JavaScript & HTTP",
    python_tech: "Python, Binary, Big-O & Tech",
    dsa_mastery: "DSA: Hash Maps, Trees, Graphs & DP",
    backend_sql_dev: "Backend: SQL, REST APIs, Auth, Git & DevOps",
    js_ts_architecture: "Modern JS, TypeScript, OOP, TDD & Concurrency",
    earth_space: "Earth, Space & Climate Science",
    econ_finance: "Economics, Business & PH Finance",
    philosophy_logic: "Philosophy, Fallacies, Biases & Learning",
    exam_mastery: "PH Competitive Exams (DOST, UPCAT, CSE, NMAT)"
  };

  function tagToDomain(tag) {
    if (["number_sense", "arithmetic", "times_table", "fractions_percents", "negative_sign", "exponents_logs", "algebra_factoring", "trig_geometry", "calculus"].includes(tag)) return "math";
    if (["physics", "chemistry", "biology", "earth_space"].includes(tag)) return "stem";
    if (["ai_ml", "web_coding", "python_tech", "dsa_mastery", "backend_sql_dev", "js_ts_architecture"].includes(tag)) return "ai_tech";
    if (["ph_history", "filipino", "abstract_shapes", "verbal_logic", "exam_mastery"].includes(tag)) return "humanities";
    return "econ_phil";
  }

  function ensureTelemetry(state) {
    if (!state.telemetry || typeof state.telemetry !== "object") {
      state.telemetry = {};
    }
    const t = state.telemetry;
    if (typeof t.totalAnswered !== "number") t.totalAnswered = 0;
    if (typeof t.totalCorrect !== "number") t.totalCorrect = 0;
    if (typeof t.totalTimeMs !== "number") t.totalTimeMs = 0;
    if (typeof t.eloRating !== "number") t.eloRating = 1000;
    if (!t.domainElo || typeof t.domainElo !== "object") {
      t.domainElo = { math: t.eloRating, stem: t.eloRating, ai_tech: t.eloRating, humanities: t.eloRating, econ_phil: t.eloRating };
    }
    for (const dk of ["math", "stem", "ai_tech", "humanities", "econ_phil"]) {
      if (typeof t.domainElo[dk] !== "number") t.domainElo[dk] = t.eloRating;
    }
    if (!t.gauntletScope) t.gauntletScope = "all";
    if (!Array.isArray(t.eloHistory)) t.eloHistory = [t.eloRating];
    if (!t.nodes || typeof t.nodes !== "object") t.nodes = {};
    if (!t.multFacts || typeof t.multFacts !== "object") t.multFacts = {};
    if (!t.errorTags || typeof t.errorTags !== "object") t.errorTags = {};
    if (!t.studyGoalPreset) t.studyGoalPreset = "auto";
    return t;
  }

  function pairKey(a, b) {
    return `${Math.min(a, b)}x${Math.max(a, b)}`;
  }

  function getSlowLimitMs(nodeId) {
    const meta = (nodeId && DEPENDENCY_GRAPH[nodeId]) || { tier: 3, tag: "algebra_factoring" };
    if (meta.tier <= 2 && (meta.tag === "times_table" || meta.tag === "number_sense" || meta.tag === "arithmetic")) {
      return 6000;
    }
    if (
      meta.tag === "biology" ||
      meta.tag === "verbal_logic" ||
      meta.tag === "wica_career" ||
      meta.tag === "persdev_eq" ||
      meta.tag === "wellness_finance" ||
      meta.tag === "ph_history" ||
      meta.tag === "filipino" ||
      meta.tag === "abstract_shapes" ||
      meta.tag === "ai_ml" ||
      meta.tag === "web_coding" ||
      meta.tag === "python_tech" ||
      meta.tag === "dsa_mastery" ||
      meta.tag === "backend_sql_dev" ||
      meta.tag === "js_ts_architecture" ||
      meta.tag === "earth_space" ||
      meta.tag === "econ_finance" ||
      meta.tag === "philosophy_logic" ||
      meta.tag === "exam_mastery"
    ) {
      return 16000;
    }
    if (meta.tier >= 4 || meta.tag === "calculus" || meta.tag === "physics") {
      return 18000;
    }
    return 12000;
  }

  function classifyNodeQuadrant(nodeStats, masteryLvl, nodeId) {
    if (!nodeStats || !nodeStats.attempts) {
      if ((masteryLvl || 0) >= 2) {
        return {
          code: "automatic",
          label: "Mastered",
          badge: "👑",
          recommendedMode: "advance",
          modeLabel: "Next Skill",
          color: "var(--ml-primary)"
        };
      }
      return {
        code: "unseen",
        label: "Unexplored",
        badge: "🌱",
        recommendedMode: "lesson",
        modeLabel: "Intuition & Lesson",
        color: "var(--ml-ink-faint)"
      };
    }

    const acc = nodeStats.correct / Math.max(1, nodeStats.attempts);
    const avgMs = nodeStats.avgMs || 4000;
    const slowLimitMs = getSlowLimitMs(nodeId);
    if (acc < 0.65) {
      return {
        code: "concept_gap",
        label: "Concept Gap",
        badge: "🧩",
        recommendedMode: "lesson",
        modeLabel: "Re-read Intuition + Lab",
        color: "var(--ml-danger)"
      };
    }
    if (acc < 0.85 || (nodeStats.currentStreak || 0) < 2) {
      return {
        code: "slip_prone",
        label: "Slip-Prone",
        badge: "🔨",
        recommendedMode: "bruteforce",
        modeLabel: "Bruteforce 10-Lock",
        color: "var(--ml-amber)"
      };
    }
    if (avgMs > slowLimitMs) {
      return {
        code: "slow_accurate",
        label: "Slow but Accurate",
        badge: "🐢",
        recommendedMode: "sprint",
        modeLabel: "45s Speed Reflex",
        color: "var(--ml-blue)"
      };
    }
    return {
      code: "automatic",
      label: "Automatic",
      badge: "✓",
      recommendedMode: "advance",
      modeLabel: "Advance / Boss",
      color: "var(--ml-primary)"
    };
  }

  function recordAttempt(state, evt) {
    const t = ensureTelemetry(state);
    const elapsed = Math.min(45000, Math.max(250, evt.elapsedMs || 3500));
    const ok = !!evt.correct;
    const now = Date.now();

    t.totalAnswered++;
    if (ok) t.totalCorrect++;
    t.totalTimeMs += elapsed;

    // Update Node Stats & Elo
    let qElo = 1050;
    let errTag = "arithmetic";
    if (evt.nodeId && DEPENDENCY_GRAPH[evt.nodeId]) {
      const meta = DEPENDENCY_GRAPH[evt.nodeId];
      qElo = meta.elo;
      errTag = meta.tag;

      if (!t.nodes[evt.nodeId]) {
        t.nodes[evt.nodeId] = {
          attempts: 0,
          correct: 0,
          wrong: 0,
          avgMs: elapsed,
          currentStreak: 0,
          bestStreak: 0,
          lastSeen: now,
          easeFactor: 2.5,
          intervalDays: 0,
          reps: 0,
          nextReviewAt: now
        };
      }
      const ns = t.nodes[evt.nodeId];
      if (typeof ns.easeFactor !== "number") ns.easeFactor = 2.5;
      if (typeof ns.intervalDays !== "number") ns.intervalDays = 0;
      if (typeof ns.reps !== "number") ns.reps = 0;
      ns.attempts++;
      if (ok) {
        ns.correct++;
        ns.currentStreak++;
        if (ns.currentStreak > ns.bestStreak) ns.bestStreak = ns.currentStreak;
        // SM-2 Spaced Repetition update
        const qScore = elapsed < 6000 ? 5 : elapsed < 14000 ? 4 : 3;
        ns.reps = (ns.reps || 0) + 1;
        if (ns.reps === 1) ns.intervalDays = 1;
        else if (ns.reps === 2) ns.intervalDays = 3;
        else ns.intervalDays = Math.min(90, Math.round(ns.intervalDays * ns.easeFactor));
        ns.easeFactor = Math.max(1.3, +(ns.easeFactor + (0.1 - (5 - qScore) * (0.08 + (5 - qScore) * 0.02))).toFixed(2));
        ns.nextReviewAt = now + ns.intervalDays * 24 * 60 * 60 * 1000;
      } else {
        ns.wrong++;
        ns.currentStreak = 0;
        ns.reps = 0;
        ns.intervalDays = 0;
        ns.easeFactor = Math.max(1.3, +(ns.easeFactor - 0.2).toFixed(2));
        ns.nextReviewAt = now; // Due immediately for spaced recall!
        t.errorTags[errTag] = (t.errorTags[errTag] || 0) + 1;
      }
      ns.avgMs = Math.round(ns.avgMs * 0.65 + elapsed * 0.35);
      ns.lastSeen = now;
    }

    // Update Multiplication Fact Stats if multPair [a, b] provided
    if (Array.isArray(evt.multPair) && evt.multPair.length === 2) {
      const k = pairKey(evt.multPair[0], evt.multPair[1]);
      if (!t.multFacts[k]) {
        t.multFacts[k] = { attempts: 0, correct: 0, wrong: 0, avgMs: elapsed, streak: 0, lastSeen: now };
      }
      const mf = t.multFacts[k];
      mf.attempts++;
      if (ok) {
        mf.correct++;
        mf.streak++;
      } else {
        mf.wrong++;
        mf.streak = 0;
        t.errorTags.times_table = (t.errorTags.times_table || 0) + 1;
      }
      mf.avgMs = Math.round(mf.avgMs * 0.6 + elapsed * 0.4);
      mf.lastSeen = now;
      qElo = Math.max(qElo, 950 + Math.min(evt.multPair[0], evt.multPair[1]) * 35);
    }

    // Standard Elo update with speed bonus (Global + Subject-Scoped Domain Elo!)
    const expected = 1 / (1 + Math.pow(10, (qElo - t.eloRating) / 400));
    const speedBonus = ok && elapsed < 3500 ? 0.15 : 0;
    const score = (ok ? 1 : 0) + speedBonus;
    const delta = Math.round(28 * (score - expected));
    t.eloRating = Math.max(600, Math.min(2600, t.eloRating + delta));
    const domKey = tagToDomain(errTag);
    if (t.domainElo && typeof t.domainElo[domKey] === "number") {
      const dExp = 1 / (1 + Math.pow(10, (qElo - t.domainElo[domKey]) / 400));
      const dDelta = Math.round(28 * (score - dExp));
      t.domainElo[domKey] = Math.max(600, Math.min(2600, t.domainElo[domKey] + dDelta));
    }
    t.eloHistory.push(t.eloRating);
    if (t.eloHistory.length > 20) t.eloHistory.shift();

    return { delta, newElo: t.eloRating };
  }

  function getEloRank(elo) {
    if (elo >= 1900) return { title: "Primer Grandmaster", badge: "🧙", color: "var(--ml-amber)" };
    if (elo >= 1600) return { title: "Polymath & AI Challenger", badge: "🎓", color: "var(--ml-plum)" };
    if (elo >= 1350) return { title: "Multi-Domain Boss Slayer", badge: "🔥", color: "var(--ml-amber)" };
    if (elo >= 1120) return { title: "Pattern Analyst", badge: "⚡", color: "var(--ml-blue)" };
    return { title: "Foundation Builder", badge: "🌱", color: "var(--ml-primary)" };
  }

  // ==================== PREREQUISITE SKILL TREE & UNLOCK ENGINE ====================
  const DEPENDENTS_MAP = (function () {
    const map = {};
    for (const id of Object.keys(DEPENDENCY_GRAPH)) {
      map[id] = [];
    }
    for (const [id, meta] of Object.entries(DEPENDENCY_GRAPH)) {
      for (const pre of (meta && meta.prereqs) || []) {
        if (!map[pre]) map[pre] = [];
        map[pre].push(id);
      }
    }
    return map;
  })();

  const BRIDGE_REASONS = {
    "counting-subitizing->make-10-addition": "Spotting small groups instantaneously lets you snap numbers to 10 in your head without finger-counting.",
    "make-10-addition->distance-subtraction": "Subtraction is simply the gap back up to the next 10 — the exact mirror of Make-10 addition.",
    "even-odd-skip->rect-multiplication": "Skip-counting rows builds the visual rectangle grid that makes every multiplication fact obvious.",
    "rect-multiplication->reverse-division": "Division asks for the missing side of a multiplication rectangle.",
    "reverse-division->fractions-trenchcoat": "Every fraction a/b is literally division wearing a trenchcoat.",
    "fractions-trenchcoat->decimals-percents": "Decimals and percentages are just fractions locked to powers of 10 and 100.",
    "pemdas-grammar->algebra-scale": "Solving for x is literally running PEMDAS in reverse while keeping both sides balanced.",
    "negatives-flip->algebra-scale": "Moving terms across an equals sign or multiplying by negatives requires automatic sign-flip fluency.",
    "algebra-scale->slope-lines": "Graphing y = mx + b uses equation balancing to turn any linear rule into a visual line.",
    "factoring-foil->quadratics-symmetry": "Factoring reveals a parabola's x-intercepts immediately, exposing its vertex of symmetry.",
    "exponents-roots->logarithms-unlocked": "A logarithm simply asks: 'What exponent turns this base into that number?'",
    "geometry-pythagoras->trig-unit-circle": "Every sine and cosine point on the unit circle is a right triangle obeying sin²θ + cos²θ = 1.",
    "factoring-foil->limits-potholes": "Factoring cancels 0/0 'pothole' factors so you can see where a function is actually heading.",
    "limits-potholes->derivatives-speedometer": "A derivative is the limit of average slope as the time gap shrinks toward zero.",
    "slope-lines->derivatives-speedometer": "Derivatives generalize straight-line slope m = Δy/Δx to instantaneous slope on curved graphs.",
    "derivatives-speedometer->integrals-area": "Integration is the exact reverse of differentiation — summing infinite thin slices back into area.",
    "geometry-pythagoras->physics-units-vectors": "Breaking diagonal forces & velocities into x and y components uses right triangles and Pythagoras.",
    "ratios-proportions-rates->physics-units-vectors": "Unit conversions (km/h → m/s) and dimensional analysis are pure ratio chains.",
    "algebra-scale->physics-kinematics": "Solving kinematics equations for time, acceleration, or displacement is pure algebraic rearranging.",
    "slope-lines->physics-kinematics": "Velocity is the slope of a position-time graph, and acceleration is the slope of a velocity-time graph.",
    "systems-equations->phys2-kirchhoff-circuits": "Multi-loop circuits produce simultaneous loop & junction equations solved as a linear system.",
    "chem-balancing-reactions->bio-energy-photosynthesis": "Photosynthesis and cellular respiration are balanced chemical equations trading 6 CO₂, 6 H₂O, glucose, and 6 O₂.",
    "slope-lines->ai-perceptron-neural-nets": "A single artificial neuron computes y = w·x + b — literally a weighted linear slope plus bias!",
    "derivatives-speedometer->ai-training-loss-backprop": "Backpropagation uses derivatives (gradients) to know which direction nudges every weight to lower loss.",
    "linear-algebra-vectors->ai-tokens-embeddings-vectors": "LLMs encode words and concepts as high-dimensional vectors where cosine similarity measures meaning.",
    "matrices-3d-transformations->ai-transformers-self-attention": "Self-Attention multiplies Query, Key, and Value matrices to route context across every token at once.",
    "probability-bayes->ai-llm-generation-sampling": "Next-token generation samples from softmax probability distributions controlled by temperature & top-p.",
    "logarithms-unlocked->tech-algorithms-bigo-ds": "Binary search and balanced trees halve the search space every step — that's literally O(log₂ n)!",
    "exponents-roots->tech-binary-bits-hex-memory": "Binary place values (1, 2, 4, 8, 16…) and hex digits are direct powers of 2.",
    "algebra-scale->code-js-basics-dom-events": "Variables, expressions, and state updates in JavaScript mirror algebraic substitution and evaluation.",
    "logarithms-unlocked->earth-volcanoes-earthquakes-hazards": "The Richter / Moment Magnitude scale is logarithmic — each +1 step is 10× wave amplitude and ~32× energy.",
    "ratios-proportions-rates->econ-scarcity-opportunity-cost": "Opportunity cost compares trade-off ratios — what you give up per unit gained.",
    "slope-lines->econ-supply-demand-elasticity": "Elasticity measures how steeply quantity responds to price along supply & demand curves.",
    "verbal-reading-inference->phil-logical-fallacies": "Spotting hidden premises and unstated claims in reading lets you catch logical fallacies instantly.",
    "persdev-brain-emotions-eq->phil-cognitive-biases": "Understanding emotional triggers and fast/slow brain pathways explains why cognitive biases hijack judgment."
  };

  function getPrereqs(nodeId) {
    const meta = DEPENDENCY_GRAPH[nodeId];
    return meta && Array.isArray(meta.prereqs) ? meta.prereqs.slice() : [];
  }

  function getDependents(nodeId) {
    return (DEPENDENTS_MAP[nodeId] || []).slice();
  }

  function getBridgeReason(prereqId, targetId, DATA) {
    const key = `${prereqId}->${targetId}`;
    if (BRIDGE_REASONS[key]) return BRIDGE_REASONS[key];
    const nodes = DATA && Array.isArray(DATA.NODES) ? DATA.NODES : [];
    const preNode = nodes.find((n) => n.id === prereqId);
    const tgtNode = nodes.find((n) => n.id === targetId);
    if (preNode && tgtNode) {
      const preWorld = preNode.worldId;
      const tgtWorld = tgtNode.worldId;
      if (preWorld !== tgtWorld) {
        return `Cross-subject foundation: "${preNode.title}" gives you the core mental model that "${tgtNode.title}" directly builds on.`;
      }
      return `Core building block: mastering "${preNode.title}" makes "${tgtNode.title}" click effortlessly instead of feeling memorized.`;
    }
    return "Required foundational skill before tackling this topic.";
  }

  function getUnlockStatus(state, nodeId, DATA) {
    const masteryMap = (state && state.nodeMastery) || {};
    const strict = !state || state.strictPrereqs !== false;
    const nodeById = new Map(((DATA && DATA.NODES) || []).map((n) => [n.id, n]));
    const directIds = getPrereqs(nodeId);
    const prereqs = directIds.map((pid) => {
      const m = masteryMap[pid] || 0;
      return {
        id: pid,
        node: nodeById.get(pid) || null,
        mastery: m,
        met: m >= 1
      };
    });
    const missingPrereqs = prereqs.filter((p) => !p.met);
    const prereqsMet = missingPrereqs.length === 0;
    const selfMastered = (masteryMap[nodeId] || 0) >= 1;
    // Never re-lock a skill the learner already completed/mastered!
    const locked = strict && !prereqsMet && !selfMastered;

    // Build ordered bottom-up missing ancestor chain (topological post-order)
    const visited = new Set();
    const chain = [];
    function collectMissing(id) {
      const ps = getPrereqs(id);
      for (const pid of ps) {
        if (visited.has(pid)) continue;
        visited.add(pid);
        if ((masteryMap[pid] || 0) < 1) {
          collectMissing(pid);
          const pNode = nodeById.get(pid) || null;
          const pDirect = getPrereqs(pid);
          const pReady = pDirect.every((gpid) => (masteryMap[gpid] || 0) >= 1);
          chain.push({
            id: pid,
            node: pNode,
            ready: pReady,
            isDirect: directIds.includes(pid)
          });
        }
      }
    }
    if (!prereqsMet) collectMissing(nodeId);

    const nextActionablePrereq = chain.find((c) => c.ready) || chain[0] || null;

    const unlocks = getDependents(nodeId)
      .map((cid) => ({
        id: cid,
        node: nodeById.get(cid) || null,
        mastery: masteryMap[cid] || 0,
        otherMissingCount: getPrereqs(cid).filter((pid) => pid !== nodeId && (masteryMap[pid] || 0) < 1).length
      }))
      .filter((u) => !!u.node);

    return {
      nodeId,
      prereqs,
      missingPrereqs,
      prereqsMet,
      locked,
      strict,
      chain,
      nextActionablePrereq,
      unlocks,
      unlocksCount: unlocks.length
    };
  }

  function getNewlyUnlockedNodes(prevMastery, nextMastery, DATA) {
    const prev = prevMastery || {};
    const next = nextMastery || {};
    const nodes = (DATA && DATA.NODES) || [];
    const newly = [];
    for (const n of nodes) {
      const ps = getPrereqs(n.id);
      if (ps.length === 0) continue;
      const wasUnlocked = ps.every((pid) => (prev[pid] || 0) >= 1) || (prev[n.id] || 0) >= 1;
      const isUnlocked = ps.every((pid) => (next[pid] || 0) >= 1);
      if (!wasUnlocked && isUnlocked && (next[n.id] || 0) < 1) {
        newly.push(n);
      }
    }
    return newly;
  }

  function getSkillTreeSummary(state, DATA) {
    const nodes = (DATA && DATA.NODES) || [];
    const masteryMap = (state && state.nodeMastery) || {};
    let mastered = 0;
    let ready = 0;
    let locked = 0;
    const readyNodes = [];
    const lockedNodes = [];
    for (const n of nodes) {
      const m = masteryMap[n.id] || 0;
      const st = getUnlockStatus(state, n.id, DATA);
      if (m >= 1) {
        mastered++;
      } else if (st.locked) {
        locked++;
        lockedNodes.push(n);
      } else {
        ready++;
        readyNodes.push(n);
      }
    }
    return {
      total: nodes.length,
      mastered,
      ready,
      locked,
      readyNodes,
      lockedNodes
    };
  }

  function analyzeLearner(state, DATA) {
    const t = ensureTelemetry(state);
    const now = Date.now();
    const multMap = state.multMastered || {};
    const nodeMastery = state.nodeMastery || {};
    const nodeById = new Map(DATA.NODES.map((n) => [n.id, n]));

    const overallAcc = t.totalAnswered > 0 ? Math.round((t.totalCorrect / t.totalAnswered) * 100) : 100;
    const avgMs = t.totalAnswered > 0 ? Math.round(t.totalTimeMs / t.totalAnswered) : 0;

    // 1. Classify every node into Speed-vs-Accuracy Quadrants
    const quadrantCounts = { unseen: 0, concept_gap: 0, slip_prone: 0, slow_accurate: 0, automatic: 0 };
    const nodeReports = [];
    for (const n of DATA.NODES) {
      const ns = t.nodes[n.id];
      const lvl = nodeMastery[n.id] || 0;
      const q = classifyNodeQuadrant(ns, lvl, n.id);
      quadrantCounts[q.code]++;
      nodeReports.push({
        node: n,
        stats: ns || null,
        mastery: lvl,
        quadrant: q,
        meta: DEPENDENCY_GRAPH[n.id] || { prereqs: [], tier: 2, elo: 1000, tag: "arithmetic" }
      });
    }

    // 2. Weakest / Slowest Multiplication Pairs
    const multScores = [];
    for (let a = 2; a <= 12; a++) {
      for (let b = a; b <= 12; b++) {
        const k = pairKey(a, b);
        const mf = t.multFacts[k];
        const mLvl = multMap[k] || 0;
        let risk = 0;
        let reason = "Unpracticed hard pair";
        if (mf && mf.attempts > 0) {
          const errRate = mf.wrong / mf.attempts;
          risk = errRate * 100 + Math.min(40, (mf.avgMs || 3000) / 250) + (mLvl < 2 ? 25 : 0);
          reason = mf.wrong > 0
            ? `${mf.wrong} miss${mf.wrong > 1 ? "es" : ""} • ${(mf.avgMs / 1000).toFixed(1)}s avg`
            : `${(mf.avgMs / 1000).toFixed(1)}s avg speed`;
        } else if (mLvl < 2) {
          risk = (a >= 6 && b >= 6 ? 60 : 30);
          reason = "Not yet locked in";
        }
        if (risk > 0) multScores.push({ a, b, k, risk, reason, mastered: mLvl >= 2 });
      }
    }
    multScores.sort((x, y) => y.risk - x.risk);
    const weakestMultPairs = multScores.slice(0, 8);

    // 3. Root-Cause Dependency Alerts
    const rootCauseAlerts = [];
    for (const rep of nodeReports) {
      const strugglingHere = rep.quadrant.code === "concept_gap" || rep.quadrant.code === "slip_prone" ||
        (rep.node.worldId === "senior" && rep.mastery === 0);
      if (!strugglingHere) continue;
      for (const preId of rep.meta.prereqs) {
        const preNode = nodeById.get(preId);
        if (!preNode) continue;
        const preLvl = nodeMastery[preId] || 0;
        const preStats = t.nodes[preId];
        const preQuad = classifyNodeQuadrant(preStats, preLvl, preId);
        if (preLvl === 0 || preQuad.code === "concept_gap" || preQuad.code === "slip_prone") {
          rootCauseAlerts.push({
            target: rep.node,
            prereq: preNode,
            prereqQuad: preQuad,
            message: `Struggling or unstarted on "${rep.node.title}"? Its foundation "${preNode.title}" is ${preQuad.label} — patch that first and "${rep.node.title}" clicks 5× faster!`
          });
          break;
        }
      }
      if (rootCauseAlerts.length >= 3) break;
    }

    // 4. SM-2 Spaced-Repetition Due / Decaying Nodes
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    const decayingNodes = nodeReports
      .filter((r) => r.stats && (
        (typeof r.stats.nextReviewAt === "number" && r.stats.nextReviewAt <= now) ||
        (now - r.stats.lastSeen > threeDaysMs) ||
        (r.stats.wrong > 0 && r.stats.currentStreak === 0)
      ))
      .sort((a, b) => (a.stats.nextReviewAt || a.stats.lastSeen) - (b.stats.nextReviewAt || b.stats.lastSeen))
      .slice(0, 8);

    // 5. Top Error Tags
    const topErrorTags = Object.entries(t.errorTags)
      .map(([tag, count]) => ({ tag, label: TAG_LABELS[tag] || tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    // 6. Top Recommended Modes (Track-Aware Actionable Engine)
    const recommendedModes = [];
    const activePreset = t.studyGoalPreset || "auto";
    const mathFocusedPreset = ["auto", "grade12_rescue", "mult_autopilot", "college_stem", "shs_grade12_finals", "cet_full_exam"].includes(activePreset);
    const mistakes = state.mistakes || [];

    if (decayingNodes.length > 0) {
      recommendedModes.push({
        badge: "🧠 SM-2 Due",
        title: `Spaced Repetition Review (${decayingNodes.length} skill${decayingNodes.length === 1 ? "" : "s"} due)`,
        why: "Reviewing right before Ebbinghaus decay locks recall in for 3× longer.",
        actionType: "srs-review",
        payload: null
      });
    }

    if (mistakes.length >= 2) {
      recommendedModes.push({
        badge: "🛠️ High Priority",
        title: `Crack Repair Queue (${mistakes.length} saved misses)`,
        why: "Clearing exact past mistakes gives the fastest instant jump in accuracy.",
        actionType: "repair",
        payload: null
      });
    }

    const multMasteredCount = Object.values(multMap).filter((v) => v >= 2).length;
    if (mathFocusedPreset && (multMasteredCount < 78 || weakestMultPairs.some((p) => p.risk >= 70))) {
      recommendedModes.push({
        badge: "🔨 Speed Reflex",
        title: weakestMultPairs.some((p) => p.risk >= 70)
          ? "Bruteforce Your Weakest Multiplication Facts"
          : "Multiplication Bruteforce (Hard 15 / Guided 12×12)",
        why: "Instant × recall cuts algebraic factoring and fractions cognitive load in half.",
        actionType: "mult-bruteforce",
        payload: weakestMultPairs.some((p) => p.risk >= 70) ? "smart_weak" : "hard15"
      });
    }

    const slipNode = nodeReports.find((r) => (r.quadrant.code === "slip_prone" || r.quadrant.code === "concept_gap") && r.node.bruteforce);
    if (slipNode) {
      recommendedModes.push({
        badge: slipNode.quadrant.badge + " Targeted Fix",
        title: `Bruteforce 10-Streak Lock: ${slipNode.node.title}`,
        why: `${Math.round((slipNode.stats.correct / slipNode.stats.attempts) * 100)}% accuracy so far — lock in 10 straight reps until zero hesitation.`,
        actionType: "node-bruteforce",
        payload: slipNode.node.id
      });
    }

    const slowNode = nodeReports.find((r) => r.quadrant.code === "slow_accurate");
    if (slowNode) {
      recommendedModes.push({
        badge: "⏱️ Build Speed",
        title: `45s Speed Gym: ${slowNode.node.title}`,
        why: `You get these right (${(slowNode.stats.avgMs / 1000).toFixed(1)}s avg), now build fast test-day reflexes!`,
        actionType: "sprint",
        payload: slowNode.meta.tag === "calculus" ? "deriv" : slowNode.meta.tag === "times_table" ? "mult" : "alg"
      });
    }

    recommendedModes.push({
      badge: "⚡ Calibration",
      title: `Adaptive Elo Gauntlet (Current: ${t.eloRating} Elo)`,
      why: "Filter by subject or go All-Domain to test your true ceiling under live Elo scoring.",
      actionType: "gauntlet",
      payload: null
    });

    return {
      elo: t.eloRating,
      domainElo: t.domainElo,
      rank: getEloRank(t.eloRating),
      eloHistory: t.eloHistory,
      totalAnswered: t.totalAnswered,
      overallAcc,
      avgMs,
      quadrantCounts,
      nodeReports,
      weakestMultPairs,
      rootCauseAlerts,
      decayingNodes,
      topErrorTags,
      recommendedModes: recommendedModes.slice(0, 4)
    };
  }

  function generateStudyPlan(state, DATA, presetId) {
    const preset = presetId || (state.telemetry && state.telemetry.studyGoalPreset) || "auto";
    const analysis = analyzeLearner(state, DATA);
    const nodeMastery = state.nodeMastery || {};
    const nodeById = new Map(DATA.NODES.map((n) => [n.id, n]));
    const pickNode = (id) => nodeById.get(id) || DATA.NODES[0];

    const presets = {
      auto: {
        title: "🤖 Smart Auto-Diagnosed Plan",
        rationale: "Dynamically balances your weakest foundations, multiplication speed, and next high-value Grade 12 unlock."
      },
      grade12_rescue: {
        title: "🚀 Grade 12 Exam Rescue Plan",
        rationale: "Patches the exact algebra, factoring, exponent, logarithm, and trig bricks that drive 80% of Grade 12 exam marks."
      },
      mult_autopilot: {
        title: "🔨 Full Multiplication Autopilot",
        rationale: "Eliminates finger counting forever using symmetry, visual tricks, and under-3.5s Bruteforce locks."
      },
      college_stem: {
        title: "🎓 College Calculus & Linear Algebra Track",
        rationale: "Bridges Limits → Derivatives → Integrals → Calc III Partials & Matrices cleanly."
      },
      science_trifecta: {
        title: "⚛️ Physics + Chemistry + Biology Sprint",
        rationale: "Locks in F=ma, V=IR, Mole/pH math, and DNA→mRNA + Punnett genetics in one focused session."
      },
      cet_full_exam: {
        title: "🏛️ Full College Entrance Exam Prep (Math + Science + Verbal/Logic)",
        rationale: "Combines algebra traps, multi-concept Physics/Chem, Biology pedigrees, and Verbal/Logic deductions weighed 40–50% on real entrance tests."
      },
      shs_grade12_finals: {
        title: "📚 SHS Grade 12 STEM Finals (PHYS2 + CHEM2 + BIO2)",
        rationale: "Directly aligned to your GEEBOOKS handouts: Capacitors, Kirchhoff, Magnetism, Colligative/Gibbs, and Recombinant DNA & Evolution."
      },
      life_career_ready: {
        title: "💼 WICA, PersDev & Money Readiness",
        rationale: "Covers PH job & business registration, 4IR/STAR interviews, brain & emotional intelligence, and personal finance compounding."
      },
      ai_coding_bootcamp: {
        title: "🤖 AI, HTML/CSS, Python & Tech Builder Track",
        rationale: "Takes you from zero to understanding Neural Nets, Transformers, HTML/CSS Flexbox, Python slicing/functions, Binary & Big-O!"
      },
      bootdev_backend_quest: {
        title: "⚔️ Code Forge: Backend, SQL, DSA & Modern JS Career Track",
        rationale: "Boot.dev-style backend & CS mastery: Hash Maps, Binary Search, SQL Joins/Indexes, REST/JWT Auth, Git DAG & JS Event Loop!"
      },
      ph_cet_humanities: {
        title: "🇵🇭 PH History, Filipino & Abstract Shapes (UPCAT/CSE/CET)",
        rationale: "Targets the highest-yield non-STEM exam pillars: PH History/1987 Constitution, Filipino Ng/Nang & Diin, and Abstract Shapes!"
      },
      physics_laws_mastery: {
        title: "🌌 Universal Physics Laws Deep Dive",
        rationale: "Conquers Newton's Gravitation & Kepler, Rotational Inertia, SHM Pendulums, Doppler Sound, 4 Laws of Thermo, Faraday & Quantum!"
      },
      polymath_explorer: {
        title: "✨ Primer Polymath Sampler",
        rationale: "One iconic skill each from Math, Physics Laws, How AI Works, HTML/CSS/Python, PH History, Filipino & Abstract Shapes!"
      },
      earth_nmat_science: {
        title: "🌍 Earth, Space & NMAT/DOST Science Track",
        rationale: "Covers Plate Tectonics, Earthquake Log Scales, 23.5° Tilt Seasons, Typhoons & Climate alongside Physics/Chem/Bio!"
      },
      econ_phil_thinker: {
        title: "🦉 Economics, PH Finance & Critical Thinking Track",
        rationale: "Sharpens real-world decisions with Supply & Demand, TRAIN/MP2 Personal Finance, Logical Fallacies, Cognitive Biases & SM-2 Learning!"
      },
      dost_sei_scholar: {
        title: "🔬 DOST-SEI Scholarship Full Prep (RA 7687 & Merit)",
        rationale: "Targets DOST-SEI's signature pillars: Mechanical-Technical pulleys/gears, Astronomy & Stars, Scientific Graphs, Spatial Nets & Work/Trig Math!"
      },
      upcat_big4_prep: {
        title: "🌻 UPCAT & Big 4 Entrance Mastery (Bilingual + R − ¼W)",
        rationale: "Pairs English Paragraph Org & SVA traps with Filipino Wastong Gamit/Diin, Applied Science Data & Calculator-Free Word Problems!"
      },
      cse_pro_passer: {
        title: "🏛️ Civil Service Exam 80%+ Passer Track (Pro & Sub-Pro)",
        rationale: "Locks in RA 6713 & PH Environmental Laws, Number/Letter Series, Work/Discount Math, Paragraph Org & Clerical Filing!"
      },
      nmat_med_track: {
        title: "🩺 NMAT 90+ PR Medical Admission Track",
        rationale: "Targets high-leverage NMAT PR boosters: Perceptual Acuity (Mirrors/Hidden Figs), Social Science (Psych/Soc), Bio/Chem & Quantitative Speed!"
      }
    };

    const meta = presets[preset] || presets.auto;
    const steps = [];

    if (preset === "mult_autopilot") {
      steps.push(
        {
          title: "Step 1: Learn Missing Multiplication Stages 1-by-1",
          subtitle: "Turn gray heatmap cells green via Guided 1×1 → 12×12 Course.",
          minutes: 4,
          done: Object.values(state.multMastered || {}).filter((v) => v >= 2).length >= 55,
          actionType: "mult-course",
          payload: null,
          whyChosen: "Introduces 1 fact at a time with symmetry & visual tricks."
        },
        {
          title: "Step 2: Bruteforce the Infamous Hard 15 (15-Streak Lock)",
          subtitle: "Burn 6×7, 6×8, 7×8, 7×9, 8×9, 12×12 into instant reflex.",
          minutes: 4,
          done: false,
          actionType: "mult-bruteforce",
          payload: "hard15",
          whyChosen: "These 15 pairs cause 80% of arithmetic slowdowns."
        },
        {
          title: "Step 3: 45s Division (÷) & Divisibility Reflex",
          subtitle: "Flip × tables backwards into instant ÷.",
          minutes: 2,
          done: ((state.gymBest || {}).div || 0) >= 8,
          actionType: "sprint",
          payload: "div",
          whyChosen: "Proves bidirectional mastery for factoring & fractions."
        },
        {
          title: "Step 4: Bruteforce Weakest Facts Under 3.5s",
          subtitle: "Run Smart Tutor's targeted weak-pair shot clock.",
          minutes: 3,
          done: false,
          actionType: "mult-bruteforce",
          payload: "smart_weak",
          whyChosen: "Locks sub-3.5s automaticity so your brain never stalls."
        }
      );
    } else if (preset === "grade12_rescue") {
      const g12Chain = ["exponents-roots", "factoring-foil", "logarithms-unlocked", "trig-unit-circle"];
      const labels = [
        "Fix Negative & Fractional Exponents (8^(2/3) = 4)",
        "Lock Factoring & Difference of Squares",
        "Demystify Logarithms ('Just Count the Exponent!')",
        "Conquer Trig Unit Circle (cos = X, sin = Y)"
      ];
      g12Chain.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${labels[i]}`,
          subtitle: n.tagline,
          minutes: 4,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: i >= 2 ? "node-bruteforce" : "lesson",
          payload: id,
          whyChosen: `Core Grade 12 pillar (${(nodeMastery[id] || 0) >= 2 ? "Already solid — speed lock it!" : "High leverage unlock"}).`
        });
      });
    } else if (preset === "college_stem") {
      const colIds = ["limits-potholes", "derivatives-speedometer", "integrals-area", "linear-algebra-vectors"];
      colIds.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${n.title}`,
          subtitle: n.tagline,
          minutes: 5,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: (nodeMastery[id] || 0) >= 1 ? "node-bruteforce" : "lesson",
          payload: id,
          whyChosen: "Builds University STEM fluency step by step."
        });
      });
    } else if (preset === "science_trifecta") {
      const sciIds = ["physics-newton-forces", "chem-moles-stoich", "chem-acids-bases-ph", "bio-dna-rna-proteins"];
      sciIds.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${n.title}`,
          subtitle: n.tagline,
          minutes: 4,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: "lesson",
          payload: id,
          whyChosen: "Covers the #1 tested calculation & concept in each science."
        });
      });
    } else if (preset === "cet_full_exam") {
      const cetIds = ["abs-value-inequalities", "physics-projectiles-circular-torque", "chem-electron-config-trends", "verbal-grammar-syntax", "logic-deduction-abstract"];
      cetIds.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${n.title}`,
          subtitle: n.tagline,
          minutes: 4,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: n.bruteforce && (nodeMastery[id] || 0) >= 1 ? "node-bruteforce" : "lesson",
          payload: id,
          whyChosen: "Balances high-yield STEM exam traps with Verbal Grammar & Deductive Logic."
        });
      });
    } else if (preset === "shs_grade12_finals") {
      const shsIds = ["phys2-capacitors-dielectrics", "phys2-kirchhoff-circuits", "phys2-magnetism-lorentz-sources", "chem2-colligative-properties", "chem2-thermo-entropy-gibbs", "bio2-recombinant-dna"];
      shsIds.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${n.title}`,
          subtitle: n.tagline,
          minutes: 5,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: n.bruteforce && (nodeMastery[id] || 0) >= 1 ? "node-bruteforce" : "lesson",
          payload: id,
          whyChosen: "Targets the highest-weight SHS Grade 12 PHYS2, CHEM2, and BIO2 handout blocks."
        });
      });
    } else if (preset === "life_career_ready") {
      const lifeIds = ["wica-exits-transition", "wica-jobs-resume-interview", "persdev-brain-emotions-eq", "wlns-money-literacy"];
      lifeIds.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${n.title}`,
          subtitle: n.tagline,
          minutes: 4,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: "lesson",
          payload: id,
          whyChosen: "Builds practical PH job/business readiness, emotional self-regulation, and personal finance."
        });
      });
    } else if (preset === "ai_coding_bootcamp") {
      const techIds = ["ai-perceptron-neural-nets", "ai-transformers-self-attention", "code-css-box-model-units", "py-lists-dicts-slicing", "tech-algorithms-bigo-ds"];
      techIds.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${n.title}`,
          subtitle: n.tagline,
          minutes: 5,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: (nodeMastery[id] || 0) >= 1 ? "node-bruteforce" : "lesson",
          payload: id,
          whyChosen: "Builds real intuition for modern AI models, web styling, Python logic, and algorithms."
        });
      });
    } else if (preset === "bootdev_backend_quest") {
      const forgeIds = ["dsa-arrays-hashing-two-pointers", "dsa-binary-search-sorting", "be-sql-joins-groupby-agg", "be-rest-apis-json-status-codes", "be-git-internals-branching-rebase", "js-async-promises-event-loop"];
      forgeIds.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${n.title}`,
          subtitle: n.tagline,
          minutes: 6,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: (nodeMastery[id] || 0) >= 1 ? "node-bruteforce" : "lesson",
          payload: id,
          whyChosen: "Core software engineering pillar for backend interviews, SQL mastery, and hands-on Code Forge quests."
        });
      });
    } else if (preset === "ph_cet_humanities") {
      const humIds = ["ph-propaganda-katipunan-rev", "ph-constitution-three-branches", "fil-ng-nang-din-rin-traps", "abs-raven-matrices-logic", "abs-3d-cube-folding-nets"];
      humIds.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${n.title}`,
          subtitle: n.tagline,
          minutes: 4,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: (nodeMastery[id] || 0) >= 1 ? "node-bruteforce" : "lesson",
          payload: id,
          whyChosen: "Directly targets high-weight UPCAT, CET, and Civil Service humanities & abstract reasoning items."
        });
      });
    } else if (preset === "physics_laws_mastery") {
      const lawIds = ["physics-universal-gravitation-kepler", "physics-shm-pendulums-resonance", "physics-thermo-four-laws-engines", "physics-faraday-induction-ac-maxwell", "physics-quantum-photoelectric-nuclear"];
      lawIds.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${n.title}`,
          subtitle: n.tagline,
          minutes: 5,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: (nodeMastery[id] || 0) >= 1 ? "node-bruteforce" : "lesson",
          payload: id,
          whyChosen: "Connects every pillar of classical & modern physics laws with interactive playgrounds."
        });
      });
    } else if (preset === "polymath_explorer") {
      const polyIds = ["math-estimation-mental-shortcuts", "physics-universal-gravitation-kepler", "ai-basics-rules-vs-ml", "code-html-anatomy-semantics", "ph-constitution-three-branches", "fil-ponolohiya-baybay-diin", "abs-rotations-reflections"];
      polyIds.forEach((id, i) => {
        const n = pickNode(id);
        steps.push({
          title: `Step ${i + 1}: ${n.title}`,
          subtitle: n.tagline,
          minutes: 3,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: "lesson",
          payload: id,
          whyChosen: "Cross-trains your brain across every single Primer discipline!"
        });
      });
    } else if (preset === "earth_nmat_science") {
      const targets = [
        "earth-plate-tectonics-faults",
        "earth-volcanoes-earthquakes-hazards",
        "earth-atmosphere-typhoons-monsoons",
        "earth-moon-phases-seasons-tides",
        "earth-climate-greenhouse-energy"
      ];
      targets.forEach((id, idx) => {
        const nd = pickNode(id);
        steps.push({
          title: `Step ${idx + 1}: ${nd.title}`,
          subtitle: nd.tagline,
          minutes: 4,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: "lesson",
          payload: id,
          whyChosen: "Core Earth & Space Science exam pillar for PH SHS, DOST, UPCAT & NMAT."
        });
      });
      steps.push({
        title: "Step 6: 45s Earth & Space Science Blitz",
        subtitle: "Lock in plates, quakes, seasons & monsoons under time pressure.",
        minutes: 2,
        done: false,
        actionType: "sprint",
        payload: "earth-blitz",
        whyChosen: "Converts geoscience concepts into instant exam reflexes."
      });
    } else if (preset === "econ_phil_thinker") {
      const targets = [
        "econ-scarcity-opportunity-cost",
        "econ-supply-demand-elasticity",
        "econ-ph-personal-finance",
        "phil-logical-fallacies",
        "phil-cognitive-biases",
        "phil-meta-learning-memory"
      ];
      targets.forEach((id, idx) => {
        const nd = pickNode(id);
        steps.push({
          title: `Step ${idx + 1}: ${nd.title}`,
          subtitle: nd.tagline,
          minutes: 4,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: "lesson",
          payload: id,
          whyChosen: "High-leverage mental models for rational thinking, personal finance & accelerated learning."
        });
      });
    } else if (preset === "dost_sei_scholar") {
      const targets = [
        "exam-mechanical-technical-reasoning",
        "exam-astronomy-stars-cosmos",
        "exam-data-interpretation-experiments",
        "exam-word-problems-work-mixture-motion",
        "abs-3d-cube-folding-nets"
      ];
      targets.forEach((id, idx) => {
        const nd = pickNode(id);
        steps.push({
          title: `Step ${idx + 1}: ${nd.title}`,
          subtitle: nd.tagline,
          minutes: 5,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: "lesson",
          payload: id,
          whyChosen: "Core DOST-SEI Scholarship differentiator across Parts I, II & III."
        });
      });
      steps.push({
        title: "Step 6: 45s DOST Mechanical & Space Blitz",
        subtitle: "Test pulleys, gears, levers & star life cycles under real clock pressure.",
        minutes: 2,
        done: false,
        actionType: "sprint",
        payload: "dost-mech-sci-blitz",
        whyChosen: "Builds split-second DOST-SEI reflex speed."
      });
    } else if (preset === "upcat_big4_prep") {
      const targets = [
        "exam-paragraph-org-error-spotting",
        "fil-ng-nang-din-rin-traps",
        "fil-ponolohiya-baybay-diin",
        "exam-data-interpretation-experiments",
        "exam-word-problems-work-mixture-motion"
      ];
      targets.forEach((id, idx) => {
        const nd = pickNode(id);
        steps.push({
          title: `Step ${idx + 1}: ${nd.title}`,
          subtitle: nd.tagline,
          minutes: 5,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: "lesson",
          payload: id,
          whyChosen: "High-yield UPCAT bilingual & quantitative subtest pillar."
        });
      });
    } else if (preset === "cse_pro_passer") {
      const targets = [
        "exam-cse-ra6713-civics-env-laws",
        "ph-constitution-three-branches",
        "exam-number-letter-series-patterns",
        "exam-word-problems-work-mixture-motion",
        "exam-paragraph-org-error-spotting",
        "exam-cse-clerical-filing-vocabulary"
      ];
      targets.forEach((id, idx) => {
        const nd = pickNode(id);
        steps.push({
          title: `Step ${idx + 1}: ${nd.title}`,
          subtitle: nd.tagline,
          minutes: 4,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: "lesson",
          payload: id,
          whyChosen: "Directly targets the 80.00% Civil Service passing threshold."
        });
      });
    } else if (preset === "nmat_med_track") {
      const targets = [
        "exam-nmat-perceptual-acuity",
        "exam-nmat-social-science-psych-soc",
        "exam-number-letter-series-patterns",
        "bio-human-physiology",
        "chem2-organic-polymers",
        "physics-mirrors-lenses-concave-convex"
      ];
      targets.forEach((id, idx) => {
        const nd = pickNode(id);
        steps.push({
          title: `Step ${idx + 1}: ${nd.title}`,
          subtitle: nd.tagline,
          minutes: 5,
          done: (nodeMastery[id] || 0) >= 2,
          actionType: "lesson",
          payload: id,
          whyChosen: "High-leverage NMAT Part I & Part II 90+ PR booster."
        });
      });
    } else {
      // "auto" — driven strictly by live learner telemetry!
      if ((state.mistakes || []).length > 0) {
        steps.push({
          title: `Step 1: Patch ${state.mistakes.length} Saved Mistake${state.mistakes.length > 1 ? "s" : ""}`,
          subtitle: "Eliminate known cracks before stacking new material.",
          minutes: 2,
          done: false,
          actionType: "repair",
          payload: null,
          whyChosen: "Detected unresolved mistakes in your practice queue."
        });
      } else {
        steps.push({
          title: "Step 1: Weakest Multiplication Facts Bruteforce",
          subtitle: `Sharpen top ${Math.min(8, Math.max(3, analysis.weakestMultPairs.length))} sluggish or unmastered × pairs.`,
          minutes: 3,
          done: analysis.weakestMultPairs.length === 0,
          actionType: "mult-bruteforce",
          payload: "smart_weak",
          whyChosen: analysis.weakestMultPairs.length > 0
            ? `Top priority: ${analysis.weakestMultPairs.slice(0, 3).map((p) => `${p.a}×${p.b}`).join(", ")}.`
            : "All 144 multiplication facts locked — quick warmup!"
        });
      }

      if (analysis.rootCauseAlerts.length > 0) {
        const alert = analysis.rootCauseAlerts[0];
        steps.push({
          title: `Step 2: Patch Root Prerequisite — ${alert.prereq.title}`,
          subtitle: `Unlocks "${alert.target.title}" smoothly.`,
          minutes: 4,
          done: (nodeMastery[alert.prereq.id] || 0) >= 2,
          actionType: alert.prereq.bruteforce && (nodeMastery[alert.prereq.id] || 0) >= 1 ? "node-bruteforce" : "lesson",
          payload: alert.prereq.id,
          whyChosen: alert.message
        });
      } else {
        const nextUnfinished = DATA.NODES.find((n) => (nodeMastery[n.id] || 0) < 2) || DATA.NODES[0];
        steps.push({
          title: `Step 2: Conquer ${nextUnfinished.title}`,
          subtitle: nextUnfinished.tagline,
          minutes: 4,
          done: false,
          actionType: "lesson",
          payload: nextUnfinished.id,
          whyChosen: "Next unmastered skill along your path."
        });
      }

      const bfTarget = analysis.nodeReports.find((r) => r.node.bruteforce && (r.quadrant.code === "slip_prone" || r.mastery === 1))
        || { node: pickNode("logarithms-unlocked") };
      steps.push({
        title: `Step 3: 10-Streak Bruteforce Lock — ${bfTarget.node.title}`,
        subtitle: "Burn the pattern in until 10 straight reps feel effortless.",
        minutes: 3,
        done: (nodeMastery[bfTarget.node.id] || 0) >= 3,
        actionType: "node-bruteforce",
        payload: bfTarget.node.id,
        whyChosen: "Converts shaky intuition into zero-hesitation reflex."
      });

      steps.push({
        title: `Step 4: Adaptive Elo Gauntlet (Current: ${analysis.elo} Elo)`,
        subtitle: "Test mixed Math + STEM under shot-clock pressure to climb ranks.",
        minutes: 3,
        done: analysis.totalAnswered >= 25 && analysis.elo >= 1200,
        actionType: "gauntlet",
        payload: null,
        whyChosen: "Calibrates your true cross-subject rating and surfaces new weak spots."
      });
    }

    return {
      preset,
      presetTitle: meta.title,
      rationale: meta.rationale,
      steps
    };
  }

  // ==================== INTERACTIVE TUTOR VIEW & ELO GAUNTLET ====================
  let gauntletSession = null;
  let pipAnswerHtml = "";

  const GAUNTLET_SCOPES = [
    { id: "all", label: "All Subjects", worlds: null },
    { id: "math", label: "📐 Math", worlds: ["nursery", "elementary", "junior", "senior", "college"] },
    { id: "stem", label: "⚛️ STEM & Earth", worlds: ["physics", "chemistry", "biology", "earth_space"] },
    { id: "ai_tech", label: "🤖 AI & Coding", worlds: ["ai_ml", "web_coding", "python_tech"] },
    { id: "ph_fil", label: "🇵🇭 PH & Filipino", worlds: ["ph_history", "filipino"] },
    { id: "shapes_verbal", label: "🔷 Shapes & Verbal", worlds: ["abstract_shapes", "verbal-logic"] },
    { id: "econ_phil", label: "🦉 Econ, Phil & Life", worlds: ["econ_finance", "philosophy_logic", "wica", "persdev", "wellness"] }
  ];

  function startGauntlet(state, DATA, scopeId) {
    const t = ensureTelemetry(state);
    const activeScope = scopeId || t.gauntletScope || "all";
    t.gauntletScope = activeScope;
    gauntletSession = {
      round: 0,
      maxRounds: 8,
      correct: 0,
      scope: activeScope,
      eloStart: t.eloRating,
      lastDelta: 0,
      qStart: Date.now(),
      checked: false,
      isCorrect: false,
      instantAdvance: true,
      lastFlash: null,
      selectedOpt: null,
      currentQ: null,
      done: false
    };
    pickNextGauntletQuestion(state, DATA);
  }

  function pickNextGauntletQuestion(state, DATA) {
    const t = ensureTelemetry(state);
    const scopeObj = GAUNTLET_SCOPES.find((s) => s.id === (gauntletSession && gauntletSession.scope)) || GAUNTLET_SCOPES[0];
    const pool = scopeObj.worlds ? DATA.NODES.filter((n) => scopeObj.worlds.includes(n.worldId)) : DATA.NODES;
    const candidates = pool.length ? pool : DATA.NODES;
    const targetElo = t.eloRating;
    const scored = candidates.map((n) => {
      const m = DEPENDENCY_GRAPH[n.id] || { elo: 1200 };
      const dist = Math.abs(m.elo - targetElo) + Math.random() * 140;
      return { n, dist };
    }).sort((a, b) => a.dist - b.dist);
    const chosenNode = scored[0].n;
    const q = DATA.generateProceduralQuestion(chosenNode.id);
    gauntletSession.currentQ = Object.assign({ sourceNode: chosenNode, targetElo: (DEPENDENCY_GRAPH[chosenNode.id] || {}).elo || 1200 }, q);
    gauntletSession.qStart = Date.now();
    gauntletSession.checked = false;
    gauntletSession.selectedOpt = null;
  }

  function renderHeatmapHtml(studyLog) {
    const log = studyLog || {};
    const cells = [];
    const today = new Date();
    for (let d = 41; d >= 0; d--) {
      const dt = new Date(today.getFullYear(), today.getMonth(), today.getDate() - d);
      const iso = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
      const cnt = log[iso] || 0;
      const lvl = cnt >= 15 ? 4 : cnt >= 8 ? 3 : cnt >= 3 ? 2 : cnt >= 1 ? 1 : 0;
      cells.push(`<span class="ml-heatmap-cell lvl-${lvl}" title="${iso}: ${cnt} reps"></span>`);
    }
    return `
      <div class="ml-mem-card" style="margin-bottom:18px;">
        <div class="ml-mem-toolbar" style="margin-bottom:10px;">
          <div>
            <h3 style="margin:0;">📅 6-Week Study Consistency Heatmap</h3>
            <p class="ml-viz-sub" style="margin:0;">Every answered rep lights up today's square and builds your real daily streak.</p>
          </div>
          <span class="ml-mini-tag">🔥 Streak: ${stateSafeStreak(studyLog)} · Active days logged</span>
        </div>
        <div class="ml-heatmap-grid">${cells.join("")}</div>
      </div>
    `;
  }

  function stateSafeStreak(studyLog) {
    const days = Object.keys(studyLog || {}).filter((k) => (studyLog[k] || 0) > 0).length;
    return `${days} day${days === 1 ? "" : "s"}`;
  }

  function renderTutorView(container, state, hooks) {
    const DATA = root.MATHLINGO_DATA;
    const t = ensureTelemetry(state);

    if (gauntletSession) {
      renderGauntletRunner(container, state, DATA, hooks);
      return;
    }

    const analysis = analyzeLearner(state, DATA);
    const plan = generateStudyPlan(state, DATA, t.studyGoalPreset);

    const presetBtns = [
      { id: "auto", label: "Smart Auto" },
      { id: "dost_sei_scholar", label: "🔬 DOST-SEI Scholar" },
      { id: "upcat_big4_prep", label: "🌻 UPCAT & Big 4" },
      { id: "cse_pro_passer", label: "🏛️ Civil Service 80%" },
      { id: "nmat_med_track", label: "🩺 NMAT 90+ PR" },
      { id: "earth_nmat_science", label: "🌍 Earth & Science" },
      { id: "econ_phil_thinker", label: "🦉 Econ, Phil & Learn" },
      { id: "ai_coding_bootcamp", label: "🤖 AI + Coding" },
      { id: "bootdev_backend_quest", label: "⚔️ Code Forge Backend" },
      { id: "ph_cet_humanities", label: "🇵🇭 PH + Filipino + Shapes" },
      { id: "physics_laws_mastery", label: "🌌 Physics Laws" },
      { id: "polymath_explorer", label: "✨ Polymath Mix" },
      { id: "shs_grade12_finals", label: "SHS Grade 12 STEM" },
      { id: "life_career_ready", label: "WICA + PersDev" },
      { id: "grade12_rescue", label: "Grade 12 Math" },
      { id: "mult_autopilot", label: "×12×12 Autopilot" },
      { id: "college_stem", label: "College STEM" },
      { id: "science_trifecta", label: "Phys+Chem+Bio" },
      { id: "cet_full_exam", label: "College Entrance" }
    ];

    const domElo = analysis.domainElo || {};

    container.innerHTML = `
      <div class="ml-tutor-hero">
        <div class="ml-tutor-elo-card">
          <div class="ml-hero-kicker">LOCAL AI TUTOR • REAL-TIME COGNITIVE TELEMETRY</div>
          <div class="ml-elo-row">
            <span class="ml-elo-badge" style="border-color:${analysis.rank.color}; color:${analysis.rank.color};">
              ${analysis.rank.badge} ${analysis.elo} ELO
            </span>
            <div>
              <h2 style="margin:0; font-size:21px;">${analysis.rank.title}</h2>
              <div class="ml-viz-sub">
                ${analysis.totalAnswered} reps logged • ${analysis.overallAcc}% accuracy • ${analysis.avgMs > 0 ? (analysis.avgMs / 1000).toFixed(1) + "s avg speed" : "Ready for baseline scan"}
              </div>
            </div>
          </div>

          <div class="ml-quad-strip" style="margin-bottom:8px;">
            <span class="ml-quad-pill" title="Math Domain Elo">Math <strong>${domElo.math || 1000}</strong></span>
            <span class="ml-quad-pill" title="Physics, Chem, Bio & Earth Elo">STEM/Earth <strong>${domElo.stem || 1000}</strong></span>
            <span class="ml-quad-pill" title="AI & Coding Elo">AI/Code <strong>${domElo.ai_tech || 1000}</strong></span>
            <span class="ml-quad-pill" title="PH History, Filipino, Shapes & Verbal Elo">Humanities <strong>${domElo.humanities || 1000}</strong></span>
            <span class="ml-quad-pill" title="Economics, Philosophy & Life Elo">Econ/Phil <strong>${domElo.econ_phil || 1000}</strong></span>
          </div>

          <div class="ml-quad-strip">
            <span class="ml-quad-pill" title="Mastered at target subject speed">Automatic <strong>${analysis.quadrantCounts.automatic}</strong></span>
            <span class="ml-quad-pill" title="Accurate, needs speed drill">Slow <strong>${analysis.quadrantCounts.slow_accurate}</strong></span>
            <span class="ml-quad-pill" title="Needs Bruteforce streak lock">Slip-Prone <strong>${analysis.quadrantCounts.slip_prone}</strong></span>
            <span class="ml-quad-pill" title="Re-read visual intuition">Concept Gap <strong>${analysis.quadrantCounts.concept_gap}</strong></span>
            <span class="ml-quad-pill">Unexplored <strong>${analysis.quadrantCounts.unseen}</strong></span>
          </div>
        </div>

        <div class="ml-tutor-gauntlet-cta">
          <div class="ml-rec-label">Subject-Scoped Adaptive Arena</div>
          <div class="ml-rec-title">8-Round Elo Gauntlet</div>
          <p class="ml-rec-sub">Pick a subject filter or mix everything around your live <strong>${analysis.elo} Elo</strong>:</p>
          <div class="ml-viz-tabs" style="margin-bottom:10px;">
            ${GAUNTLET_SCOPES.map((sc) => `<button type="button" class="ml-btn-mini ${(t.gauntletScope || "all") === sc.id ? "active" : ""}" data-g-scope="${sc.id}">${sc.label}</button>`).join("")}
          </div>
          <button type="button" class="ml-btn-primary" id="ml-start-gauntlet-btn">Launch Adaptive Gauntlet →</button>
        </div>
      </div>

      ${analysis.decayingNodes.length > 0 ? `
        <div class="ml-mem-card" style="margin-bottom:18px; border-color:var(--ml-viz-green);">
          <div class="ml-mem-toolbar" style="margin-bottom:10px;">
            <div>
              <h3 style="margin:0;">🧠 SM-2 Spaced Repetition Queue (${analysis.decayingNodes.length} Skill${analysis.decayingNodes.length === 1 ? "" : "s"} Due)</h3>
              <p class="ml-viz-sub" style="margin:0;">Science-timed review right before forgetting locks knowledge into long-term memory.</p>
            </div>
            <button type="button" class="ml-btn-primary" data-tutor-act="srs-review" data-tutor-payload="">🧠 Start Due Review →</button>
          </div>
          <div class="ml-quad-strip">
            ${analysis.decayingNodes.map((r) => `<button type="button" class="ml-pill" data-tutor-act="lesson" data-tutor-payload="${r.node.id}">${r.node.icon} ${r.node.title}</button>`).join("")}
          </div>
        </div>
      ` : ""}

      ${renderHeatmapHtml(state.studyLog)}

      ${analysis.rootCauseAlerts.length > 0 ? `
        <div class="ml-mem-card ml-card-warn" style="margin-bottom:18px;">
          <h3 style="margin:0 0 10px;">🔎 Root-Cause Bottlenecks Detected</h3>
          <div style="display:grid; gap:10px;">
            ${analysis.rootCauseAlerts.map((a) => `
              <div class="ml-root-alert">
                <div>${a.message}</div>
                <button type="button" class="ml-btn-mini" data-tutor-act="lesson" data-tutor-payload="${a.prereq.id}">Patch "${a.prereq.title}" →</button>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <div class="ml-mem-card" style="margin-bottom:18px;">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">${plan.presetTitle}</h3>
            <p class="ml-viz-sub" style="margin:0;">${plan.rationale}</p>
          </div>
          <div class="ml-viz-tabs">
            ${presetBtns.map((p) => `
              <button type="button" class="ml-pill ${plan.preset === p.id ? "active" : ""}" data-plan-preset="${p.id}">${p.label}</button>
            `).join("")}
          </div>
        </div>

        <div class="ml-plan-grid">
          ${plan.steps.map((s) => {
            const fmtPlan = (str) => root.MATHLINGO_LATEX ? root.MATHLINGO_LATEX.formatMath(str) : String(str || "");
            return `
            <div class="ml-plan-card ${s.done ? "done" : ""}">
              <div class="ml-plan-top">
                <span class="ml-mini-tag">⏱️ ~${s.minutes} min</span>
                <span>${s.done ? "✅ Solid" : "🎯 Recommended"}</span>
              </div>
              <h4 style="margin:4px 0;">${fmtPlan(s.title)}</h4>
              <p class="ml-viz-sub" style="margin:0 0 8px;">${fmtPlan(s.subtitle)}</p>
              <div class="ml-plan-why"><strong>Why:</strong> ${fmtPlan(s.whyChosen)}</div>
              <button type="button" class="ml-btn-node" style="margin-top:10px;" data-tutor-act="${s.actionType}" data-tutor-payload="${s.payload || ""}">
                Launch Step →
              </button>
            </div>
          `;
          }).join("")}
        </div>
      </div>

      <div class="ml-two-col-tutor">
        <div class="ml-mem-card">
          <div class="ml-mem-toolbar">
            <div>
              <h3 style="margin:0;">Recommended Modes Right Now</h3>
              <p class="ml-viz-sub" style="margin:0;">Tailored from your Speed-vs-Accuracy quadrants.</p>
            </div>
          </div>
          <div style="display:grid; gap:10px;">
            ${analysis.recommendedModes.map((m) => `
              <div class="ml-rec-mode-card">
                <div class="ml-rec-mode-copy">
                  <div class="ml-mini-tag">${m.badge}</div>
                  <strong>${m.title}</strong>
                  <div class="ml-viz-sub">${m.why}</div>
                </div>
                <button type="button" class="ml-btn-primary ml-rec-mode-go" data-tutor-act="${m.actionType}" data-tutor-payload="${m.payload || ""}">Go →</button>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="ml-mem-card">
          <div class="ml-mem-toolbar">
            <div>
              <h3 style="margin:0;">✖️ Multiplication & Error Radar</h3>
              <p class="ml-viz-sub" style="margin:0;">Weakest × pairs + most common error categories.</p>
            </div>
            <button type="button" class="ml-btn-bruteforce-mini" data-tutor-act="mult-bruteforce" data-tutor-payload="smart_weak">🔨 Bruteforce Weakest</button>
          </div>
          <div class="ml-weak-pairs-wrap">
            ${analysis.weakestMultPairs.map((p) => `
              <span class="ml-fact-chip cur">${p.a}×${p.b}=${p.a * p.b} <span style="opacity:0.75;">(${p.reason})</span></span>
            `).join("")}
          </div>
          ${analysis.topErrorTags.length > 0 ? `
            <div style="margin-top:14px;">
              <div class="ml-mini-tag" style="margin-bottom:6px;">Top Mistake Categories</div>
              <div style="display:grid; gap:6px;">
                ${analysis.topErrorTags.map((et) => `
                  <div class="ml-readout-pill" style="border-color:var(--ml-danger, #b23b31);">
                    <span>${et.label}</span>
                    <strong>${et.count} miss${et.count > 1 ? "es" : ""}</strong>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : `<div class="ml-viz-note" style="margin-top:12px;">Zero mistake categories logged yet — keep practicing or launch the Elo Gauntlet to map your brain!</div>`}
        </div>
      </div>

      <div class="ml-mem-card" style="margin-top:18px;">
        <h3 style="margin:0 0 6px;">Ask Smart Tutor (Live Diagnostic Advisor)</h3>
        <p class="ml-viz-sub" style="margin:0 0 12px;">Select a coaching question to scan your live telemetry and generate tailored advice:</p>
        <div class="ml-viz-tabs" style="margin-bottom:12px;">
          <button type="button" class="ml-pill" data-pip-q="g12">Why do I trip in Grade 12?</button>
          <button type="button" class="ml-pill" data-pip-q="ai_code">How do I learn AI & Coding fast?</button>
          <button type="button" class="ml-pill" data-pip-q="ph_hum">PH History, Filipino & Shapes tips?</button>
          <button type="button" class="ml-pill" data-pip-q="mult">How to memorize 6, 7, 8, 9× fast?</button>
          <button type="button" class="ml-pill" data-pip-q="audit">Audit my slowest & weakest skills</button>
          <button type="button" class="ml-pill" data-pip-q="cram">Give me a 10-min study routine</button>
        </div>
        ${pipAnswerHtml ? `<div class="ml-easy-box">${pipAnswerHtml}</div>` : ""}
      </div>
    `;

    document.getElementById("ml-start-gauntlet-btn").addEventListener("click", () => {
      if (hooks && hooks.onTap) hooks.onTap();
      startGauntlet(state, DATA);
      renderTutorView(container, state, hooks);
    });

    container.querySelectorAll("[data-g-scope]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        t.gauntletScope = btn.dataset.gScope;
        if (hooks && hooks.onSaveState) hooks.onSaveState();
        renderTutorView(container, state, hooks);
      });
    });

    container.querySelectorAll("[data-plan-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        t.studyGoalPreset = btn.dataset.planPreset;
        if (hooks && hooks.onSaveState) hooks.onSaveState();
        renderTutorView(container, state, hooks);
      });
    });

    container.querySelectorAll("[data-tutor-act]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        const act = btn.dataset.tutorAct;
        const payload = btn.dataset.tutorPayload;
        if (act === "gauntlet") {
          startGauntlet(state, DATA);
          renderTutorView(container, state, hooks);
        } else if (hooks && hooks.onExecuteAction) {
          hooks.onExecuteAction(act, payload);
        }
      });
    });

    container.querySelectorAll("[data-pip-q]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        const kind = btn.dataset.pipQ;
        if (kind === "g12") {
          const alertMsg = analysis.rootCauseAlerts[0]
            ? analysis.rootCauseAlerts[0].message
            : "Your biggest Grade 12 multipliers are Fractions, Negative Exponents (`2⁻³ = 1/8`), Factoring (`x²+bx+c`), and Logs (`log₂ 32 = 5`).";
          pipAnswerHtml = `<strong>Smart Tutor Diagnosis:</strong> Grade 12 problems stack 4 tiny rules in one question — one shaky brick breaks the chain. ${alertMsg}`;
        } else if (kind === "ai_code") {
          pipAnswerHtml = `<strong>AI & Coding Blueprint:</strong> Open the <strong>Playgrounds</strong> tab! (1) Drag weights in the <strong>AI Neuron & Temperature Lab</strong> to feel how LLMs actually think, (2) edit live cards in the <strong>HTML/CSS Sandbox</strong>, and (3) step line-by-line in the <strong>Python Tracer & Binary Switcher</strong> — then drill Python & AI nodes in Bruteforce Mode!`;
        } else if (kind === "ph_hum") {
          pipAnswerHtml = `<strong>Humanities & Shapes Playbook:</strong> (1) Anchor PH History on 5 dates (900 CE → 1565 → 1872 → 1898 → 1986), (2) lock Filipino's #1 traps (<strong>Ng vs Nang</strong>, <strong>Din vs Rin</strong>, <strong>4 Diin</strong>), and (3) on Abstract Shapes ALWAYS check <strong>Mirror Chirality</strong> & <strong>Skip-1 Cube Opposites</strong> first!`;
        } else if (kind === "mult") {
          pipAnswerHtml = `<strong>Multiplication Strategy:</strong> Out of 144 cells, symmetry (` + "`a×b = b×a`" + `) cuts it to 78, and ` + "`×1, ×10, ×2, ×5, ×11, ×9`" + ` leave ONLY ~10 real facts (` + "`6×7=42, 6×8=48, 7×8=56, 7×7=49, 8×8=64, 12×12=144`" + `). Hit <strong>Multiplication Bruteforce → Hard 15</strong> for 3 minutes until you clear a 15-streak under 3.5s!`;
        } else if (kind === "audit") {
          const slowList = analysis.nodeReports.filter((r) => r.stats).sort((a, b) => (b.stats.avgMs || 0) - (a.stats.avgMs || 0)).slice(0, 3);
          const multList = analysis.weakestMultPairs.slice(0, 4).map((p) => `${p.a}×${p.b}`).join(", ");
          pipAnswerHtml = slowList.length > 0
            ? `<strong>Speed & Weakness Audit:</strong> Slowest topics: ${slowList.map((s) => `<strong>${s.node.title}</strong> (${(s.stats.avgMs / 1000).toFixed(1)}s)`).join(", ")}. Top × pairs to drill: <strong>${multList}</strong>.`
            : `<strong>Speed & Weakness Audit:</strong> You have ${analysis.totalAnswered} reps logged so far. Complete one 8-Round Elo Gauntlet above to profile your exact speed & error tags across all ${DATA.NODES.length} skills!`;
        } else {
          pipAnswerHtml = `<strong>10-Min High-Yield Routine:</strong> (1) 3 min <strong>Mult Bruteforce (Weakest/Hard 15)</strong> → (2) 3 min <strong>Grade 12 Trap Buster</strong> → (3) 4 min <strong>10-Streak Bruteforce</strong> on your shakiest Grade 12 skill!`;
        }
        renderTutorView(container, state, hooks);
      });
    });
  }

  function renderGauntletRunner(container, state, DATA, hooks) {
    const g = gauntletSession;
    const t = ensureTelemetry(state);

    if (g.done) {
      const diff = t.eloRating - g.eloStart;
      const rank = getEloRank(t.eloRating);
      container.innerHTML = `
        <div class="ml-mem-card" style="max-width:600px; margin:0 auto; text-align:center; padding:28px;">
          <div style="font-size:52px;">${rank.badge}</div>
          <h2>Gauntlet Complete: ${g.correct}/${g.maxRounds} Clean!</h2>
          <p class="ml-hero-desc">
            New Rating: <strong>${t.eloRating} Elo</strong> (${diff >= 0 ? "+" + diff : diff}) • Rank: <strong>${rank.title}</strong>
          </p>
          <div class="ml-victory-actions" style="margin-top:16px;">
            <button type="button" class="ml-btn-secondary" id="ml-g-again">🔁 Another 8 Rounds</button>
            <button type="button" class="ml-btn-primary" id="ml-g-done">Back to Smart Tutor →</button>
          </div>
        </div>
      `;
      document.getElementById("ml-g-again").addEventListener("click", () => {
        startGauntlet(state, DATA);
        renderGauntletRunner(container, state, DATA, hooks);
      });
      document.getElementById("ml-g-done").addEventListener("click", () => {
        gauntletSession = null;
        renderTutorView(container, state, hooks);
      });
      return;
    }

    const fmt = (str, display) => root.MATHLINGO_LATEX ? root.MATHLINGO_LATEX.formatMath(str, display) : String(str || "");
    const q = g.currentQ;
    const pct = Math.round(((g.round + (g.checked ? 1 : 0)) / g.maxRounds) * 100);

    container.innerHTML = `
      <div class="ml-mem-card" style="max-width:680px; margin:0 auto;">
        <div class="ml-modal-top" style="padding:0 0 12px; margin-bottom:14px;">
          <button type="button" class="ml-close-btn" id="ml-g-quit">✕</button>
          <div class="ml-quiz-progress-track">
            <div class="ml-quiz-progress-fill" style="width:${Math.max(8, pct)}%"></div>
          </div>
          <div class="ml-quiz-badges">
            <span class="ml-combo-badge">⚡ ${t.eloRating} Elo</span>
            <span class="ml-heart-badge">${g.round + 1}/${g.maxRounds}</span>
            <button type="button" class="ml-btn-mini" id="ml-g-toggle-inst">${g.instantAdvance !== false ? "⚡ Instant" : "⏸️ Pause"}</button>
          </div>
        </div>

        <div class="ml-quiz-meta">
          <span>${q.sourceNode.icon} ${q.sourceNode.title} (Target ~${q.targetElo} Elo)</span>
          <span>Correct: ${g.correct}</span>
        </div>

        ${g.lastFlash ? `<div class="ml-instant-toast ${g.lastFlash.ok ? "ok" : "nope"}">${fmt(g.lastFlash.msg)}</div>` : ""}

        <h2 class="ml-question-prompt">${fmt(q.prompt)}</h2>
        ${q.visualSvg ? `<div class="ml-q-visual">${q.visualSvg}</div>` : ""}
        ${q.codeBlock ? `<pre class="ml-q-code"><code>${String(q.codeBlock).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>` : ""}

        <div class="${q.optionSvgs ? "ml-opt-grid-svg" : "ml-options-grid"}">
          ${q.options.map((opt, idx) => {
            let cls = q.optionSvgs ? "ml-option-btn ml-opt-svg-btn" : "ml-option-btn";
            if (g.checked) {
              if (opt === q.answer) cls += " correct";
              else if (opt === g.selectedOpt && !g.isCorrect) cls += " wrong";
            }
            const svgTile = q.optionSvgs && q.optionSvgs[opt] ? `<span class="ml-opt-svg-wrap">${q.optionSvgs[opt]}</span>` : "";
            return `
              <button type="button" class="${cls}" data-g-opt="${idx}" ${g.checked ? "disabled" : ""}>
                <span class="ml-key-num">${idx + 1}</span>
                ${svgTile}
                <span class="ml-opt-svg-lbl">${fmt(opt)}</span>
              </button>
            `;
          }).join("")}
        </div>

        ${g.checked ? `
          <div class="ml-quiz-footer ${g.isCorrect ? "correct" : "wrong"}" style="border-radius:14px; margin-top:16px;">
            <div class="ml-fb-copy">
              <div class="ml-fb-title">${g.isCorrect ? `✅ Clean! (${g.lastDelta >= 0 ? "+" + g.lastDelta : g.lastDelta} Elo)` : `💡 Ans: ${fmt(q.answer)} (${g.lastDelta} Elo)`}</div>
              <div class="ml-fb-desc">${fmt(q.whyEasy)}</div>
            </div>
            <button type="button" class="ml-btn-${g.isCorrect ? "primary" : "danger"}" id="ml-g-next">
              ${g.round + 1 >= g.maxRounds ? "See Rating →" : "Next →"}
            </button>
          </div>
        ` : ""}
      </div>
    `;

    document.getElementById("ml-g-quit").addEventListener("click", () => {
      gauntletSession = null;
      renderTutorView(container, state, hooks);
    });

    const gInstBtn = document.getElementById("ml-g-toggle-inst");
    if (gInstBtn) {
      gInstBtn.addEventListener("click", () => {
        g.instantAdvance = g.instantAdvance === false;
        renderGauntletRunner(container, state, DATA, hooks);
      });
    }

    function advanceGauntlet() {
      g.round++;
      if (g.round >= g.maxRounds) {
        g.done = true;
        if (hooks && hooks.onGauntletFinish) hooks.onGauntletFinish(g.correct);
        renderGauntletRunner(container, state, DATA, hooks);
      } else {
        pickNextGauntletQuestion(state, DATA);
        renderGauntletRunner(container, state, DATA, hooks);
      }
    }

    container.querySelectorAll("[data-g-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (g.checked) return;
        const picked = q.options[parseInt(btn.dataset.gOpt, 10)];
        const elapsedMs = Date.now() - g.qStart;
        g.selectedOpt = picked;
        g.checked = true;
        g.isCorrect = picked === q.answer;
        if (g.isCorrect) {
          g.correct++;
          if (hooks && hooks.onCorrect) hooks.onCorrect(15);
        } else {
          if (hooks && hooks.onWrong) hooks.onWrong();
        }
        const res = recordAttempt(state, {
          nodeId: q.sourceNode.id,
          correct: g.isCorrect,
          elapsedMs,
          mode: "gauntlet",
          prompt: q.prompt
        });
        g.lastDelta = res.delta;
        g.lastFlash = {
          ok: g.isCorrect,
          msg: g.isCorrect
            ? `✅ ${q.answer} (${res.delta >= 0 ? "+" + res.delta : res.delta} Elo)`
            : `💡 Ans: ${q.answer} (${res.delta} Elo) — ${q.whyEasy}`
        };
        if (hooks && hooks.onSaveState) hooks.onSaveState();
        if (g.isCorrect && g.instantAdvance !== false) {
          advanceGauntlet();
          return;
        }
        renderGauntletRunner(container, state, DATA, hooks);
      });
    });

    const nextBtn = document.getElementById("ml-g-next");
    if (nextBtn) {
      nextBtn.focus();
      nextBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        advanceGauntlet();
      });
    }
  }

  root.MATHLINGO_TUTOR = {
    DEPENDENCY_GRAPH,
    getPrereqs,
    getDependents,
    getBridgeReason,
    getUnlockStatus,
    getNewlyUnlockedNodes,
    getSkillTreeSummary,
    ensureTelemetry,
    recordAttempt,
    classifyNodeQuadrant,
    analyzeLearner,
    generateStudyPlan,
    renderTutorView,
    isGauntletActive: function () {
      return !!(gauntletSession && !gauntletSession.done && !gauntletSession.checked);
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
