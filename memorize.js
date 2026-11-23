(function (root) {
  "use strict";

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

  function makeNumericOpts(ans, deltas) {
    const set = new Set([String(ans)]);
    for (const d of shuffle(deltas || [-2, -1, 1, 2, 3, -3, 4])) {
      if (set.size >= 4) break;
      const val = ans + d;
      if (val !== ans) set.add(String(val));
    }
    let bump = 1;
    while (set.size < 4) {
      set.add(String(ans + bump));
      bump++;
    }
    return shuffle(Array.from(set));
  }

  function makeStrOpts(ans, pool) {
    const set = new Set([ans]);
    for (const item of shuffle(pool)) {
      if (set.size >= 4) break;
      if (item !== ans) set.add(item);
    }
    let idx = 1;
    while (set.size < 4) {
      set.add(ans + " (" + idx + ")");
      idx++;
    }
    return shuffle(Array.from(set));
  }

  const GYM_MODES = [
    {
      id: "even-prime",
      icon: "👯",
      title: "2·4·6·8, Odd/Even & Prime",
      desc: "Skip-counting, parity rules & prime radar",
      color: "#3b7a57",
      gen: function () {
        const pick = randInt(0, 2);
        if (pick === 0) {
          const step = [2, 4, 6, 8][randInt(0, 3)];
          const start = step * randInt(1, 4);
          const ans = start + step * 3;
          return {
            prompt: `${start}, ${start + step}, ${start + step * 2}, ___`,
            options: makeNumericOpts(ans, [-2, 2, step, -step, 4]),
            answer: String(ans),
            tip: `Skip by +${step}: ${start + step * 2} + ${step} = ${ans}!`
          };
        }
        if (pick === 1) {
          const n = randInt(101, 999);
          const ans = n % 2 === 0 ? "Even" : "Odd";
          return {
            prompt: `Is ${n} Even or Odd?`,
            options: makeStrOpts(ans, ["Even", "Odd", "Neither", "Always Prime"]),
            answer: ans,
            tip: `Last digit is ${n % 10} → ${ans}!`
          };
        }
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
        const comps = [1, 4, 6, 9, 12, 15, 21, 25, 27, 33];
        const p = primes[randInt(0, primes.length - 1)];
        const cPool = shuffle(comps).slice(0, 3).map(String);
        return {
          prompt: "Which one is PRIME?",
          options: makeStrOpts(String(p), cPool),
          answer: String(p),
          tip: `${p} only divides cleanly by 1 and ${p} (remember: 1 is NOT prime!).`
        };
      }
    },
    {
      id: "mult",
      icon: "✖️",
      title: "Times Tables (1–12)",
      desc: "Memorize every × fact including 6s, 7s, 8s & 12s",
      color: "#35628c",
      gen: function () {
        const a = randInt(2, 12);
        const b = randInt(3, 12);
        const ans = a * b;
        return {
          prompt: `${a} × ${b} = ?`,
          options: makeNumericOpts(ans, [a, -a, b, -b, 2, -2, 10]),
          answer: String(ans),
          tip: `${a} groups of ${b} = ${ans}!`
        };
      }
    },
    {
      id: "div",
      icon: "➗",
      title: "Division (÷) Reflex",
      desc: "Instant reverse-multiplication & ÷5 tricks",
      color: "#35628c",
      gen: function () {
        const b = randInt(2, 12);
        const q = randInt(2, 12);
        const a = b * q;
        return {
          prompt: `${a} ÷ ${b} = ?`,
          options: makeNumericOpts(q, [-1, 1, 2, -2, 3]),
          answer: String(q),
          tip: `Think: ${b} × ${q} = ${a}!`
        };
      }
    },
    {
      id: "roots",
      icon: "√",
      title: "Squares, Cubes & √ Roots",
      desc: "1²–15², √1–√225, 1³–6³ & 2ⁿ powers",
      color: "#725385",
      gen: function () {
        const kind = randInt(0, 2);
        if (kind === 0) {
          const n = randInt(2, 15);
          return {
            prompt: `√${n * n} = ?`,
            options: makeNumericOpts(n, [-2, -1, 1, 2, 3]),
            answer: String(n),
            tip: `${n} × ${n} = ${n * n}!`
          };
        }
        if (kind === 1) {
          const n = randInt(6, 15);
          const ans = n * n;
          return {
            prompt: `${n}² = ?`,
            options: makeNumericOpts(ans, [-10, 10, -n, n, 2]),
            answer: String(ans),
            tip: `${n} × ${n} = ${ans}!`
          };
        }
        const exp = randInt(3, 8);
        const ans = Math.pow(2, exp);
        return {
          prompt: `2^${exp} = ?`,
          options: makeNumericOpts(ans, [ans / 2, -ans / 2, 4, -4, 8]),
          answer: String(ans),
          tip: `Double ${exp} times from 1 → ${ans}!`
        };
      }
    },
    {
      id: "arith",
      icon: "➕",
      title: "+ & − Make-10 Turbo",
      desc: "Fast sums, 100-complements & zero-borrow gaps",
      color: "#3b7a57",
      gen: function () {
        const kind = randInt(0, 2);
        if (kind === 0) {
          const a = randInt(15, 68), b = randInt(7, 29);
          const ans = a + b;
          return {
            prompt: `${a} + ${b} = ?`,
            options: makeNumericOpts(ans, [-10, 10, -1, 1, 2]),
            answer: String(ans),
            tip: `Tens + ones → ${ans}!`
          };
        }
        if (kind === 1) {
          const b = randInt(14, 86);
          const ans = 100 - b;
          return {
            prompt: `100 − ${b} = ?`,
            options: makeNumericOpts(ans, [10, -10, 2, -2, 1]),
            answer: String(ans),
            tip: `Tens add to 9, ones add to 10 → ${ans}!`
          };
        }
        const b = randInt(8, 29), ans = randInt(5, 34), a = b + ans;
        return {
          prompt: `${a} − ${b} = ?`,
          options: makeNumericOpts(ans, [-1, 1, 2, -2, 10]),
          answer: String(ans),
          tip: `Gap from ${b} up to ${a} is ${ans}!`
        };
      }
    },
    {
      id: "neg",
      icon: "🔄",
      title: "Negatives & Signs",
      desc: "Double minuses, −3² vs (−3)² & sign flips",
      color: "#725385",
      gen: function () {
        const kind = randInt(0, 2);
        if (kind === 0) {
          const a = randInt(-5, 9), b = randInt(2, 12);
          const ans = a + b;
          return {
            prompt: `${a} − (−${b}) = ?`,
            options: makeNumericOpts(ans, [-2 * b, -2, 2, -1]),
            answer: String(ans),
            tip: `Two touching minuses → ${a} + ${b} = ${ans}!`
          };
        }
        if (kind === 1) {
          const a = randInt(2, 9) * (randInt(0, 1) === 0 ? -1 : 1);
          const b = -randInt(2, 9);
          const ans = a * b;
          return {
            prompt: `(${a}) × (${b}) = ?`,
            options: makeStrOpts(String(ans), [String(-ans), String(a + b), String(ans + 2)]),
            answer: String(ans),
            tip: `Same signs = +, different signs = −!`
          };
        }
        const a = randInt(3, 12), b = randInt(2, 9);
        const ans = -a - b;
        return {
          prompt: `−${a} − ${b} = ?`,
          options: makeStrOpts(String(ans), [String(a + b), String(a - b), String(b - a)]),
          answer: String(ans),
          tip: `Deeper negative: −(${a} + ${b}) = ${ans}!`
        };
      }
    },
    {
      id: "alg",
      icon: "⚖️",
      title: "Solve for x in 2s",
      desc: "1-step & 2-step balance equations",
      color: "#b36a22",
      gen: function () {
        const m = randInt(2, 7), x = randInt(-3, 10), b = randInt(-8, 9);
        const rhs = m * x + b;
        const bStr = b === 0 ? "" : b > 0 ? ` + ${b}` : ` − ${Math.abs(b)}`;
        return {
          prompt: `${m}x${bStr} = ${rhs}  →  x = ?`,
          options: makeNumericOpts(x, [-1, 1, 2, -2, 3]),
          answer: String(x),
          tip: `Undo ${bStr || "0"} → ${m}x = ${m * x} → x = ${x}!`
        };
      }
    },
    {
      id: "frac-pct",
      icon: "💯",
      title: "Fractions & Magic % Swap",
      desc: "x% of y = y% of x, Keep-Change-Flip",
      color: "#35628c",
      gen: function () {
        if (randInt(0, 1) === 0) {
          const p = randInt(2, 9) * 2;
          const ans = p / 2;
          return {
            prompt: `${p}% of 50 = ?`,
            options: makeNumericOpts(ans, [-2, -1, 1, 2, 5]),
            answer: String(ans),
            tip: `Flip it! 50% of ${p} = ${ans}!`
          };
        }
        const whole = randInt(4, 12);
        const denom = randInt(2, 4);
        const ans = whole * denom;
        return {
          prompt: `${whole} ÷ (1/${denom}) = ?`,
          options: makeNumericOpts(ans, [-whole, 2, -2, whole / 2 || 3]),
          answer: String(ans),
          tip: `Keep-Change-Flip: ${whole} × ${denom} = ${ans}!`
        };
      }
    },
    {
      id: "trig-log",
      icon: "🎡",
      title: "Trig, Radians & Logs",
      desc: "Exact unit circle, π radians & instant logs",
      color: "#b36a22",
      gen: function () {
        const bank = [
          { prompt: "log₂(8) = ?", options: ["3", "4", "2", "6"], answer: "3", tip: "2³ = 8!" },
          { prompt: "log₂(16) = ?", options: ["4", "8", "3", "2"], answer: "4", tip: "2⁴ = 16!" },
          { prompt: "log₂(32) = ?", options: ["5", "6", "4", "16"], answer: "5", tip: "2⁵ = 32!" },
          { prompt: "log₃(27) = ?", options: ["3", "9", "2", "4"], answer: "3", tip: "3³ = 27!" },
          { prompt: "log₁₀(1,000) = ?", options: ["3", "2", "4", "10"], answer: "3", tip: "Count 3 zeros!" },
          { prompt: "ln(e⁵) = ?", options: ["5", "1", "0", "e"], answer: "5", tip: "ln undoes e!" },
          { prompt: "π/3 in degrees", options: ["60°", "30°", "45°", "90°"], answer: "60°", tip: "180° ÷ 3 = 60°!" },
          { prompt: "π/6 in degrees", options: ["30°", "60°", "45°", "15°"], answer: "30°", tip: "180° ÷ 6 = 30°!" },
          { prompt: "sin(90°) = ?", options: ["1", "0", "−1", "1/2"], answer: "1", tip: "Top of unit circle (0, 1)!" },
          { prompt: "cos(0°) = ?", options: ["1", "0", "−1", "1/2"], answer: "1", tip: "Far right (1, 0)!" },
          { prompt: "tan(45°) = ?", options: ["1", "0", "√2", "1/2"], answer: "1", tip: "45° diagonal slope = 1!" },
          { prompt: "i² = ?", options: ["−1", "1", "0", "i"], answer: "−1", tip: "(√−1)² = −1!" }
        ];
        const pick = bank[randInt(0, bank.length - 1)];
        return { prompt: pick.prompt, options: shuffle(pick.options), answer: pick.answer, tip: pick.tip };
      }
    },
    {
      id: "deriv",
      icon: "🏎️",
      title: "Calculus Power Rule Blitz",
      desc: "1-second derivatives, constants & integrals",
      color: "#a8413a",
      gen: function () {
        if (randInt(0, 1) === 0) {
          const c = randInt(1, 5), n = randInt(2, 6);
          const coef = c * n, newPow = n - 1;
          const ans = newPow === 1 ? `${coef}x` : `${coef}x^${newPow}`;
          return {
            prompt: `d/dx [ ${c === 1 ? "" : c}x^${n} ] = ?`,
            options: makeStrOpts(ans, [`${c}x^${newPow}`, `${coef}x^${n}`, `${c + n}x^${newPow}`]),
            answer: ans,
            tip: `Bring ${n} down (${c}×${n}=${coef}), subtract 1 from power!`
          };
        }
        const top = randInt(2, 5);
        const ans = top * top;
        return {
          prompt: `∫₀^${top} 2x dx = ?`,
          options: makeNumericOpts(ans, [-2, 2, -1, 1, top]),
          answer: String(ans),
          tip: `Antiderivative x² at ${top} minus 0 = ${ans}!`
        };
      }
    },
    {
      id: "physics-blitz",
      icon: "⚛️",
      title: "Physics Formulas & Motion",
      desc: "F=ma, V=IR, KE=½mv², v=fλ & 1/r² gravity",
      color: "#1f6e75",
      gen: function () {
        const kind = randInt(0, 2);
        if (kind === 0) {
          const m = randInt(2, 8), a = randInt(2, 7);
          const f = m * a;
          return {
            prompt: `F = m·a: ${f} N pushes ${m} kg → a = ? m/s²`,
            options: makeNumericOpts(a, [-1, 1, 2, -2, m]),
            answer: String(a),
            tip: `a = F ÷ m = ${f} ÷ ${m} = ${a} m/s²!`
          };
        }
        if (kind === 1) {
          const i = randInt(2, 7), r = randInt(2, 6);
          const v = i * r;
          return {
            prompt: `Ohm's Law (V=IR): ${v} V ÷ ${r} Ω = ? Amps`,
            options: makeNumericOpts(i, [-1, 1, 2, -2, r]),
            answer: String(i),
            tip: `I = V ÷ R = ${v} ÷ ${r} = ${i} A!`
          };
        }
        const f = randInt(2, 9), lam = randInt(2, 6);
        const spd = f * lam;
        return {
          prompt: `Wave v = f·λ: ${f} Hz × ${lam} m = ? m/s`,
          options: makeNumericOpts(spd, [-f, f, -2, 2, 4]),
          answer: String(spd),
          tip: `Speed = ${f} × ${lam} = ${spd} m/s!`
        };
      }
    },
    {
      id: "chem-blitz",
      icon: "🧪",
      title: "Chemistry Elements, Moles & pH",
      desc: "H–Ca symbols, pH 10× jumps, molar mass & Kelvin",
      color: "#2d6a4f",
      gen: function () {
        const bank = [
          { prompt: "Chemical symbol for Sodium?", options: ["Na", "So", "S", "K"], answer: "Na", tip: "Natrium → Na!" },
          { prompt: "Chemical symbol for Potassium?", options: ["K", "Po", "Pt", "P"], answer: "K", tip: "Kalium → K!" },
          { prompt: "Atomic # of Carbon (protons)?", options: ["6", "12", "8", "4"], answer: "6", tip: "Carbon is element #6 (Mass 12)!" },
          { prompt: "Molar mass of H₂O (H=1, O=16)?", options: ["18 g/mol", "17 g/mol", "32 g/mol", "10 g/mol"], answer: "18 g/mol", tip: "2(1) + 16 = 18!" },
          { prompt: "pH 3 vs pH 5: how many times more acidic?", options: ["100×", "2×", "20×", "1,000×"], answer: "100×", tip: "2 steps = 10² = 100×!" },
          { prompt: "27°C in Kelvin (K = °C + 273)?", options: ["300 K", "246 K", "273 K", "327 K"], answer: "300 K", tip: "27 + 273 = 300 K!" },
          { prompt: "NaCl (Metal + Nonmetal) bond type?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], answer: "Ionic", tip: "Metal transfers electron to Nonmetal!" },
          { prompt: "Noble gas in Period 2 (10 protons)?", options: ["Neon (Ne)", "Argon (Ar)", "Helium (He)", "Oxygen (O)"], answer: "Neon (Ne)", tip: "He=2, Ne=10, Ar=18!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "bio-blitz",
      icon: "🧬",
      title: "Biology DNA, Cells & Genetics",
      desc: "A-T/U base pairs, organelles, osmosis & Punnett %",
      color: "#9e4765",
      gen: function () {
        const bank = [
          { prompt: "Transcribe DNA 'A-T-G' to mRNA:", options: ["U-A-C", "T-A-C", "A-U-G", "C-G-U"], answer: "U-A-C", tip: "A→U, T→A, G→C!" },
          { prompt: "Organelle that prints Proteins?", options: ["Ribosome", "Mitochondria", "Vacuole", "Lysosome"], answer: "Ribosome", tip: "Ribosomes translate mRNA into protein!" },
          { prompt: "Aa × Aa cross: % Recessive (aa)?", options: ["25%", "50%", "75%", "0%"], answer: "25%", tip: "AA, Aa, Aa, [aa] → 1/4 = 25%!" },
          { prompt: "Cell dropped in super salty water:", options: ["Water exits (cell shrivels)", "Water rushes in (bursts)", "Salt rushes out", "Divides"], answer: "Water exits (cell shrivels)", tip: "Osmosis: water chases higher salt!" },
          { prompt: "Human gametes (sperm/egg) chromosomes?", options: ["23", "46", "92", "12"], answer: "23", tip: "Meiosis halves 46 → 23!" },
          { prompt: "10% Rule: 1,000 J grass → rabbit → fox gets?", options: ["10 J", "100 J", "1 J", "500 J"], answer: "10 J", tip: "1,000 → 100 → 10 J!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "phys2-em-blitz",
      icon: "🧲",
      title: "PHYS2 Electricity, Caps & Magnetism",
      desc: "Coulomb 1/r², V 1/r, Series Caps, Kirchhoff & Lorentz",
      color: "#1f6e75",
      gen: function () {
        const bank = [
          { prompt: "6 μF & 12 μF Capacitors in SERIES = ?", options: ["4 μF", "18 μF", "9 μF", "2 μF"], answer: "4 μF", tip: "1/6 + 1/12 = 3/12 → invert = 4 μF!" },
          { prompt: "6 μF & 12 μF Capacitors in PARALLEL = ?", options: ["18 μF", "4 μF", "72 μF", "6 μF"], answer: "18 μF", tip: "Parallel capacitors ADD directly: 6 + 12 = 18 μF!" },
          { prompt: "Parallel wires with SAME current direction:", options: ["Attract each other", "Repel each other", "Zero force", "Spin 90°"], answer: "Attract each other", tip: "Opposite of electrostatics: same-direction currents ATTRACT!" },
          { prompt: "Work done by a magnetic field on a moving charge:", options: ["Always ZERO (F ⊥ v)", "Always positive", "Equals ½mv²", "Depends on B²"], answer: "Always ZERO (F ⊥ v)", tip: "Magnetic force only curves velocity; never changes speed!" },
          { prompt: "Center of circular loop B = ?", options: ["μ₀I / (2R)", "μ₀I / (2πR)", "μ₀I / R²", "kI / R"], answer: "μ₀I / (2R)", tip: "Circular loop center has NO π (unlike straight wire 2πr)!" },
          { prompt: "Halve distance r from point charge → Voltage V:", options: ["Doubles (1/r)", "Quadruples (1/r²)", "Halves", "Same"], answer: "Doubles (1/r)", tip: "V = kq/r scales linearly as 1/r!" },
          { prompt: "Dielectric K inserted in isolated cap: V drops 50 V → 25 V. K = ?", options: ["2", "0.5", "25", "75"], answer: "2", tip: "K = V₀ / V = 50 / 25 = 2!" },
          { prompt: "Metals heated up (α > 0) → Resistance R:", options: ["Increases", "Decreases", "Drops to 0", "Unchanged"], answer: "Increases", tip: "Metals α > 0 rise when heated; carbon α < 0 drops!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "chem2-thermo-kinetics",
      icon: "🔥",
      title: "CHEM2 IMFs, Colligative, Rates & Gibbs",
      desc: "H-bonds, van 't Hoff i, rate orders, ΔS & ΔG < 0",
      color: "#2d6a4f",
      gen: function () {
        const bank = [
          { prompt: "van 't Hoff factor (i) for CaCl₂ in water:", options: ["3", "2", "1", "4"], answer: "3", tip: "CaCl₂ → Ca²⁺ + 2 Cl⁻ (3 ions)!" },
          { prompt: "van 't Hoff factor (i) for Glucose (C₆H₁₂O₆):", options: ["1", "2", "6", "24"], answer: "1", tip: "Molecular nonelectrolytes do NOT split into ions → i = 1!" },
          { prompt: "Double [A] → Rate quadruples (4×). Order in A?", options: ["2nd order", "1st order", "0th order", "4th order"], answer: "2nd order", tip: "2² = 4 → 2nd order!" },
          { prompt: "When is ΔG = ΔH − TΔS ALWAYS spontaneous?", options: ["ΔH < 0 and ΔS > 0", "ΔH > 0 and ΔS < 0", "Both positive", "Both negative"], answer: "ΔH < 0 and ΔS > 0", tip: "Negative minus positive is ALWAYS negative!" },
          { prompt: "Strongest IMF in pure liquid H₂O:", options: ["Hydrogen Bonding", "London Dispersion only", "Ionic lattice", "Metallic"], answer: "Hydrogen Bonding", tip: "H bonded directly to F, O, or N ('H-FON')!" },
          { prompt: "Adding salt to water makes Boiling Point & Freezing Point:", options: ["BP rises, FP drops", "Both rise", "Both drop", "Unchanged"], answer: "BP rises, FP drops", tip: "Solute widens the liquid range at BOTH ends!" },
          { prompt: "Best conditions to keep CO₂ gas dissolved in soda:", options: ["Cold T & High P", "Hot T & Low P", "Hot T & High P", "Zero pressure"], answer: "Cold T & High P", tip: "Henry's Law: cold slows escape, high P pushes gas in!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "bio2-biotech-evo",
      icon: "🦴",
      title: "BIO2 Biotech, Evolution & Taxonomy",
      desc: "Plasmids, PCR, Drift, Homologous, Cladograms & Auxin",
      color: "#9e4765",
      gen: function () {
        const bank = [
          { prompt: "Enzyme acting as 'molecular scissors' in cloning:", options: ["Restriction enzyme", "DNA ligase", "Pepsin", "Catalase"], answer: "Restriction enzyme", tip: "Cuts DNA at specific sequences leaving sticky ends!" },
          { prompt: "Enzyme acting as 'molecular glue' sealing plasmids:", options: ["DNA ligase", "Restriction enzyme", "Helicase", "Amylase"], answer: "DNA ligase", tip: "Ligase seals the sugar-phosphate backbone!" },
          { prompt: "Gel Electrophoresis: which DNA runs FARTHEST to (+)?", options: ["Smallest fragments", "Largest fragments", "Neutral sugars", "Proteins only"], answer: "Smallest fragments", tip: "Smaller bands weave through the gel mesh fastest!" },
          { prompt: "Whale flipper & human arm (same ancestral bones):", options: ["Homologous structures", "Analogous structures", "Vestigial only", "Mutations"], answer: "Homologous structures", tip: "Same ancestor, different job = Homologous!" },
          { prompt: "Disaster randomly wipes 95% of a population:", options: ["Bottleneck Effect (Drift)", "Natural Selection", "Gene Flow", "Speciation"], answer: "Bottleneck Effect (Drift)", tip: "Random population crash = Bottleneck Effect!" },
          { prompt: "Plant hormone bending shoots toward sunlight:", options: ["Auxin", "Ethylene", "Abscisic acid", "Insulin"], answer: "Auxin", tip: "Auxin elongates shaded-side cells → bends toward light!" },
          { prompt: "Gaseous plant hormone that ripens fruit:", options: ["Ethylene", "Auxin", "ABA", "Glucagon"], answer: "Ethylene", tip: "Ethylene gas triggers ripening!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "wica-career-blitz",
      icon: "💼",
      title: "WICA, PersDev & Money Blitz",
      desc: "PH Gov Agencies, 4IR, STAR, EQ Pillars & 50/30/20",
      color: "#3e4f82",
      gen: function () {
        const bank = [
          { prompt: "PH Agency issuing TIN (Tax Identification Number):", options: ["BIR", "PSA", "NBI", "PNP"], answer: "BIR", tip: "Bureau of Internal Revenue!" },
          { prompt: "PH Agency issuing official Birth Certificates:", options: ["PSA", "BIR", "SSS", "DTI"], answer: "PSA", tip: "Philippine Statistics Authority!" },
          { prompt: "Sole Proprietorship vs Corporation registration:", options: ["DTI vs SEC", "BIR vs NBI", "TESDA vs DOLE", "PNP vs PSA"], answer: "DTI vs SEC", tip: "DTI registers sole prop names; SEC registers corporations!" },
          { prompt: "STAR Interview Method stands for:", options: ["Situation, Task, Action, Result", "Study, Test, Apply, Repeat", "Skills, Time, Attitude, Role", "Start, Talk, Ask, Reply"], answer: "Situation, Task, Action, Result", tip: "Structures persuasive behavioral interview answers!" },
          { prompt: "Which 2 PM phases run SIMULTANEOUSLY?", options: ["Executing & Monitoring/Controlling", "Initiating & Closing", "Planning & Closing", "None"], answer: "Executing & Monitoring/Controlling", tip: "Track Gantt/Kanban live WHILE executing!" },
          { prompt: "Brain region acting as the fast emotional alarm:", options: ["Amygdala", "Prefrontal Cortex", "Spinal Cord", "Cerebellum"], answer: "Amygdala", tip: "6-second pause lets the Prefrontal Cortex beat an Amygdala Hijack!" },
          { prompt: "Rule of 72: Years to double at 8% compounded?", options: ["9 years", "8 years", "18 years", "4 years"], answer: "9 years", tip: "72 ÷ 8 = 9 years!" },
          { prompt: "2 people voluntarily split 1 full-time role:", options: ["Job Sharing", "Work Sharing", "Forced Leave", "Obedience"], answer: "Job Sharing", tip: "Job Sharing = 2 split 1 role; Work Sharing = company avoids layoffs!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "ph-history-blitz",
      icon: "🇵🇭",
      title: "PH History & 1987 Civics Blitz",
      desc: "900 CE → 1565 → 1898 → EDSA, 3 Branches & Bill of Rights",
      color: "#8c3b2b",
      gen: function () {
        const bank = [
          { prompt: "Oldest known written document in the Philippines (900 CE):", options: ["Laguna Copperplate", "Kartilya", "Malolos Const.", "Doctrina"], answer: "Laguna Copperplate", tip: "Dated 900 CE in Kawi script!" },
          { prompt: "Who started permanent Spanish colonization in Cebu (1565)?", options: ["Legazpi", "Magellan", "Lapu-Lapu", "Aguinaldo"], answer: "Legazpi", tip: "Magellan arrived 1521; Legazpi colonized 1565!" },
          { prompt: "Brains of the Katipunan (author of Kartilya):", options: ["Emilio Jacinto", "Apolinario Mabini", "Marcelo del Pilar", "Antonio Luna"], answer: "Emilio Jacinto", tip: "J→K: Jacinto = Katipunan; Mabini = Revolution!" },
          { prompt: "President who moved Independence Day to June 12 (1962):", options: ["Diosdado Macapagal", "Ramon Magsaysay", "Carlos P. Garcia", "Manuel Roxas"], answer: "Diosdado Macapagal", tip: "Honored Kawit's June 12, 1898 declaration!" },
          { prompt: "PH citizenship principle under the 1987 Constitution:", options: ["Jus Sanguinis (blood)", "Jus Soli (soil)", "Property test", "Literacy test"], answer: "Jus Sanguinis (blood)", tip: "Filipino parent = natural-born Filipino citizen!" },
          { prompt: "Vote required in BOTH Houses to override a Presidential veto:", options: ["2/3 vote", "51% majority", "Unanimous", "SC approval"], answer: "2/3 vote", tip: "2/3 Senate (16/24) + 2/3 House!" },
          { prompt: "Max initial Martial Law days under 1987 Constitution:", options: ["60 days", "365 days", "6 years", "Unlimited"], answer: "60 days", tip: "Article VII Sec. 18: 60 days + Congress/SC checks!" },
          { prompt: "Constitutional Commission auditing public government funds:", options: ["COA", "COMELEC", "CSC", "BIR"], answer: "COA", tip: "Commission on Audit!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "filipino-wika-blitz",
      icon: "📜",
      title: "Filipino Wika, Diin & Traps Blitz",
      desc: "Ng/Nang, Din/Rin, 4 Diin, Tayutay & Panitikan",
      color: "#3d4e7a",
      gen: function () {
        const bank = [
          { prompt: "'Tumakbo siya ___ mabilis!' (ng o nang?)", options: ["nang", "ng", "din", "raw"], answer: "nang", tip: "Paano tumakbo? Pang-abay → NANG!" },
          { prompt: "'Bumili si Ana ___ mangga.' (ng o nang?)", options: ["ng", "nang", "rin", "daw"], answer: "ng", tip: "Bago ang pangngalan ('mangga') → NG!" },
          { prompt: "'Sasama ___ ako bukas.' (pagkatapos ng patinig 'a')", options: ["rin", "din", "daw", "ng"], answer: "rin", tip: "Patinig, W, o Y → RIN/RAW!" },
          { prompt: "Bigkas ng 'basâ' (wet — huling pantig + impit):", options: ["Maragsa (^)", "Malumay", "Malumi (`)", "Mabilis (´)"], answer: "Maragsa (^)", tip: "Huling pantig + impit = Maragsa (^)!"},
          { prompt: "'Sumayaw ang mga dahon sa hangin.' Tayutay?", options: ["Personipikasyon", "Simili", "Hyperbole", "Ironya"], answer: "Personipikasyon", tip: "Kilos-tao sa walang buhay = Pagsasatao!" },
          { prompt: "Sukat ng pantig ng Awit (Florante at Laura):", options: ["12 pantig", "8 pantig", "7 pantig", "5 pantig"], answer: "12 pantig", tip: "Awit = 12 pantig; Korido (Ibong Adarna) = 8!" },
          { prompt: "Kahulugan ng sawikaing 'butas ang bulsa':", options: ["Walang pera", "Mayaman", "Masipag", "Matapang"], answer: "Walang pera", tip: "Butas bulsa = walang pera; nagbibilang poste = walang trabaho!" },
          { prompt: "Sukat ng Pilipinong tulang TANAGA:", options: ["7-7-7-7", "5-7-5", "12-12-12", "8-8-8"], answer: "7-7-7-7", tip: "4 taludtod × 7 pantig = Tanaga!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "abstract-shapes-blitz",
      icon: "🔷",
      title: "Abstract Shapes & Spatial Blitz",
      desc: "Rotations, Mirror Chirality, XOR Matrices & Cube Nets",
      color: "#2d6473",
      gen: function () {
        const bank = [
          { prompt: "Rotating +270° Clockwise equals which shorter turn?", options: ["90° Counterclockwise", "180°", "90° Clockwise", "Mirror Flip"], answer: "90° Counterclockwise", tip: "270° + 90° = 360°!" },
          { prompt: "XOR Matrix Rule: Cross (+) ⊕ Horizontal (−) = ?", options: ["Vertical (|)", "Cross (+)", "Horizontal (−)", "Empty"], answer: "Vertical (|)", tip: "Shared horizontal bar cancels out under XOR!" },
          { prompt: "Cube net strip [1][2][3][4]: which face is opposite 1?", options: ["3", "2", "4", "Cannot fold"], answer: "3", tip: "Skip-1 in a straight line = Opposite!" },
          { prompt: "Fold paper in half 3 times & punch 1 interior hole → total holes?", options: ["8 holes", "6 holes", "4 holes", "3 holes"], answer: "8 holes", tip: "2³ = 8 stacked layers!" },
          { prompt: "Flip Horizontally THEN Flip Vertically = identical to:", options: ["180° Rotation", "0° Original", "90° CW", "Mirror Chirality"], answer: "180° Rotation", tip: "Two perpendicular flips cancel chirality → 180°!" },
          { prompt: "Smallest rotational symmetry angle of a Regular Hexagon:", options: ["60°", "90°", "72°", "120°"], answer: "60°", tip: "360° ÷ 6 = 60°!" },
          { prompt: "Opposite faces on a standard gaming die ALWAYS sum to:", options: ["7", "6", "8", "10"], answer: "7", tip: "1↔6, 2↔5, 3↔4!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "ai-ml-blitz",
      icon: "🤖",
      title: "How AI Works & LLM Blitz",
      desc: "ReLU, Backprop, Overfitting, Tokens, Attention & RAG",
      color: "#465380",
      gen: function () {
        const bank = [
          { prompt: "ReLU(-7) = ?", options: ["0", "-7", "7", "1"], answer: "0", tip: "ReLU(z) = max(0, z) clamps negatives to 0!" },
          { prompt: "ReLU(9) = ?", options: ["9", "0", "1", "81"], answer: "9", tip: "ReLU keeps positive values untouched!" },
          { prompt: "Train 99% accuracy, Test 58% accuracy = ?", options: ["Overfitting", "Underfitting", "Perfect Fit", "Zero Bias"], answer: "Overfitting", tip: "Memorized training noise — fix with data/Dropout!" },
          { prompt: "Q, K, V in Transformer Self-Attention stand for:", options: ["Query, Key, Value", "Queue, Kernel, Vector", "Quick, Keep, Verify", "Quantum, Kilo, Var"], answer: "Query, Key, Value", tip: "Query matches Keys via dot product to blend Values!" },
          { prompt: "Best LLM Temperature for strict factual JSON extraction:", options: ["Low (T ≈ 0.0–0.2)", "Very High (T = 2.0)", "Negative T", "T = 10"], answer: "Low (T ≈ 0.0–0.2)", tip: "Low T sharpens Softmax onto the #1 token!" },
          { prompt: "Calculus rule powering Backpropagation through layers:", options: ["Chain Rule", "Pythagoras", "Power of 2", "Modulo"], answer: "Chain Rule", tip: "Multiplies local derivatives backward!" },
          { prompt: "Open-book AI fetching verified doc snippets via vectors:", options: ["RAG", "CSS Grid", "Overfitting", "SQLi"], answer: "RAG", tip: "Retrieval-Augmented Generation!" },
          { prompt: "Roughly 1 LLM Token in English text ≈", options: ["¾ word (3–4 chars)", "1 full page", "1 single bit", "20 sentences"], answer: "¾ word (3–4 chars)", tip: "~750 words ≈ 1,000 tokens!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "web-html-css-blitz",
      icon: "💻",
      title: "HTML, CSS, JS & HTTP Blitz",
      desc: "Semantics, Specificity, Box Model, Flexbox & Status Codes",
      color: "#2b6b5e",
      gen: function () {
        const bank = [
          { prompt: "CSS Specificity winner: `#nav p` vs `.nav.active.btn`:", options: ["`#nav p` (ID beats classes!)", "`.nav.active.btn`", "Exact tie", "Neither applies"], answer: "`#nav p` (ID beats classes!)", tip: "(1,0,1) beats (0,3,0)!" },
          { prompt: "CSS rule keeping `width: 200px` inclusive of padding & border:", options: ["`box-sizing: border-box`", "`display: inline`", "`position: fixed`", "`margin: auto`"], answer: "`box-sizing: border-box`", tip: "Prevents padding/border from overflowing width!" },
          { prompt: "In `flex-direction: row`, horizontal alignment uses:", options: ["`justify-content`", "`align-items`", "`z-index`", "`border`"], answer: "`justify-content`", tip: "justify-content = Main axis; align-items = Cross axis!" },
          { prompt: "HTTP Status `404` vs `500`:", options: ["Not Found vs Server Error", "OK vs Redirect", "Forbidden vs OK", "Timeout vs Created"], answer: "Not Found vs Server Error", tip: "4xx = Client error; 5xx = Server error!" },
          { prompt: "JavaScript strict equality `\"5\" === 5` returns:", options: ["`false`", "`true`", "`5`", "`NaN`"], answer: "`false`", tip: "Strict === checks BOTH type and value!" },
          { prompt: "HTML attribute for image accessibility description:", options: ["`alt`", "`href`", "`class`", "`for`"], answer: "`alt`", tip: "Screen readers & fallback text use `alt`!" },
          { prompt: "Default HTTPS encrypted web port:", options: ["443", "80", "22", "8080"], answer: "443", tip: "80 = HTTP, 443 = HTTPS, 22 = SSH!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "python-tech-blitz",
      icon: "🐍",
      title: "Python, Binary & Big-O Blitz",
      desc: "Floor //, Modulo %, Slicing, Binary, Hash Maps & Security",
      color: "#9c631c",
      gen: function () {
        const kind = randInt(0, 2);
        if (kind === 0) {
          const n = randInt(5, 31);
          const bin = n.toString(2);
          return {
            prompt: `Binary \`${bin}₂\` in Decimal = ?`,
            options: makeNumericOpts(n, [-2, -1, 1, 2, 4]),
            answer: String(n),
            tip: `Add power-of-2 columns (16-8-4-2-1) with 1s → ${n}!`
          };
        }
        if (kind === 1) {
          const b = [3, 4, 5][randInt(0, 2)], q = randInt(2, 6), r = randInt(1, b - 1), a = b * q + r;
          return {
            prompt: `Python: \`${a} // ${b}\` = ?`,
            options: makeNumericOpts(q, [-1, 1, 2, r === q ? 3 : r - q]),
            answer: String(q),
            tip: `Floor division \`//\` drops remainder ${r} → ${q}!`
          };
        }
        const bank = [
          { prompt: "Python `range(1, 5)` generates:", options: ["`1, 2, 3, 4`", "`1, 2, 3, 4, 5`", "`0, 1, 2, 3, 4`", "`2, 3, 4, 5`"], answer: "`1, 2, 3, 4`", tip: "Stop value 5 is always EXCLUDED!" },
          { prompt: "Big-O of Binary Search on a sorted list:", options: ["`O(log n)`", "`O(n²)`", "`O(2ⁿ)`", "`O(n)`"], answer: "`O(log n)`", tip: "Halves search space every step (~20 ops for 1M)!" },
          { prompt: "Big-O average lookup of a Python `dict` (Hash Map):", options: ["`O(1)`", "`O(n²)`", "`O(n)`", "`O(n log n)`"], answer: "`O(1)`", tip: "Instant hash bucket jump!" },
          { prompt: "Stack vs Queue order:", options: ["Stack=LIFO; Queue=FIFO", "Stack=FIFO; Queue=LIFO", "Both LIFO", "Both FIFO"], answer: "Stack=LIFO; Queue=FIFO", tip: "Stack of plates (LIFO) vs waiting line (FIFO)!" },
          { prompt: "Secure way to store passwords in a database:", options: ["Salted 1-way Hash (bcrypt/Argon2)", "Plaintext", "Base64", "HTML comments"], answer: "Salted 1-way Hash (bcrypt/Argon2)", tip: "One-way salted hashes can never be reversed!" },
          { prompt: "Python `arr[-1]` returns:", options: ["Last element", "First element", "Error", "Length"], answer: "Last element", tip: "Negative index −1 grabs the end!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "earth-blitz",
      icon: "🌍",
      title: "Earth & Space Blitz",
      desc: "Plates, Quake Log Energy, Rocks, 23.5° Tilt & Monsoons",
      color: "#2c5282",
      gen: function () {
        const bank = [
          { prompt: "True cause of Earth's seasons (Summer vs Winter):", options: ["23.5° axial tilt", "Sun distance", "Moon shadow", "Ocean tides"], answer: "23.5° axial tilt", tip: "Earth is closest to Sun in Jan (N. Winter) — tilt sets sun angle & day length!" },
          { prompt: "Magnitude 7 vs Magnitude 5 (`ΔM = 2`) releases how much more energy?", options: ["~1,000×", "2×", "20×", "100×"], answer: "~1,000×", tip: "Energy = `10^(1.5 × ΔM) = 10³ = 1,000×`!" },
          { prompt: "Plate boundary with fierce quakes & ZERO volcanoes (West Valley / San Andreas):", options: ["Transform", "Convergent subduction", "Divergent ridge", "Hotspot"], answer: "Transform", tip: "Transform plates slide sideways — no subduction magma!" },
          { prompt: "Rock family that reliably preserves dinosaur/marine FOSSILS:", options: ["Sedimentary", "Intrusive Igneous", "Glassy Obsidian", "High-grade Gneiss"], answer: "Sedimentary", tip: "Gentle layered burial preserves delicate skeletons!" },
          { prompt: "Atmosphere layer holding UV-blocking Ozone (`O₃`):", options: ["Stratosphere", "Troposphere", "Mesosphere", "Exosphere"], answer: "Stratosphere", tip: "T-S-M-T-E: Troposphere=weather, Stratosphere=Ozone!" },
          { prompt: "Cool dry Philippine Northeast Monsoon (Nov–Feb):", options: ["Amihan", "Habagat", "Coriolis", "Lahar"], answer: "Amihan", tip: "Amihan = cool NE; Habagat = warm wet SW!" },
          { prompt: "Total Solar Eclipse (`Sun – Moon – Earth`) occurs ONLY at:", options: ["New Moon", "Full Moon", "1st Quarter", "3rd Quarter"], answer: "New Moon", tip: "Moon sits directly between Sun and Earth!" },
          { prompt: "Seismic wave blocked by Earth's LIQUID Outer Core:", options: ["S-waves (shear)", "P-waves", "Sound waves", "Radio waves"], answer: "S-waves (shear)", tip: "Liquids have zero shear rigidity — proving the outer core is liquid!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "econ-blitz",
      icon: "📊",
      title: "Econ & PH Finance Blitz",
      desc: "Opportunity Cost, Price Controls, GDP, Balance Sheet & Rule of 72",
      color: "#2d6a4f",
      gen: function () {
        const bank = [
          { prompt: "Binding Price Ceiling set BELOW `P*` causes:", options: ["Shortage (`Q_d > Q_s`)", "Surplus (`Q_s > Q_d`)", "Equilibrium", "Higher supply"], answer: "Shortage (`Q_d > Q_s`)", tip: "Artificially cheap prices spark high demand & low supply!" },
          { prompt: "Rule of 72: At `8%` annual return, money doubles every:", options: ["~9 years", "~4 years", "~18 years", "~72 years"], answer: "~9 years", tip: "`72 ÷ 8 = 9` years!" },
          { prompt: "Fundamental Balance Sheet equation:", options: ["`Assets = Liabilities + Equity`", "`Assets = Revenue − Cost`", "`GDP = C + I`", "`P = F/A`"], answer: "`Assets = Liabilities + Equity`", tip: "Snapshot of what you own vs owe!" },
          { prompt: "PH TRAIN Law annual taxable income exempt (0% tax):", options: ["Up to ₱250,000/yr", "Up to ₱25,000/yr", "₱0", "Up to ₱5M/yr"], answer: "Up to ₱250,000/yr", tip: "Brackets are marginal — raises never cut take-home pay!" },
          { prompt: "To cool overheating inflation, Central Bank (BSP):", options: ["Raises interest rates", "Cuts rates to 0%", "Prints double cash", "Passes tax bills"], answer: "Raises interest rates", tip: "Higher rates cool borrowing & spending!" },
          { prompt: "Market dominated by 2–4 interdependent giants (telcos/airlines):", options: ["Oligopoly", "Perfect Competition", "Monopolistic Competition", "Pure Monopoly"], answer: "Oligopoly", tip: "`Oligo-` = a few dominant firms!" },
          { prompt: "If savings earn `2%` while inflation is `6%`, approximate Real Return:", options: ["`−4%`", "`+8%`", "`+4%`", "`−12%`"], answer: "`−4%`", tip: "Fisher shortcut: `Nominal − Inflation = 2% − 6% = −4%`!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "phil-blitz",
      icon: "🦉",
      title: "Fallacies & Biases Blitz",
      desc: "Straw Man, Sunk Cost, Valid vs Sound, Popper & Active Recall",
      color: "#725385",
      gen: function () {
        const bank = [
          { prompt: "Distorting someone's claim into an absurd extreme to attack it easily:", options: ["Straw Man", "Ad Hominem", "Post Hoc", "Sunk Cost"], answer: "Straw Man", tip: "Knocking down a fake cartoon instead of the real claim!" },
          { prompt: "Staying in an awful movie ONLY because you already paid ₱450:", options: ["Sunk Cost Fallacy", "Survivorship Bias", "Anchoring", "Bandwagon"], answer: "Sunk Cost Fallacy", tip: "Past unrecoverable money is gone either way!" },
          { prompt: "Studying ONLY billionaire dropouts while ignoring failed dropouts:", options: ["Survivorship Bias", "Loss Aversion", "Ad Hominem", "Post Hoc"], answer: "Survivorship Bias", tip: "Always check the silent invisible denominator!" },
          { prompt: "Deductive argument with Valid structure + False premise is:", options: ["Valid but Unsound", "Sound", "Invalid", "Inductive"], answer: "Valid but Unsound", tip: "Sound = Valid structure AND all True premises!" },
          { prompt: "Karl Popper's core test distinguishing Science from Pseudoscience:", options: ["Falsifiability", "Popularity", "Complex jargon", "Age of claim"], answer: "Falsifiability", tip: "Must specify an observation that COULD prove it wrong!" },
          { prompt: "Study habit beating passive re-reading & highlighting by ~3×:", options: ["Active Recall + Spaced Repetition", "Highlighting 4 colors", "All-night cramming", "Passive skimming"], answer: "Active Recall + Spaced Repetition", tip: "Self-testing across expanding gaps wires real recall!" },
          { prompt: "Stoic Dichotomy of Control focuses energy on:", options: ["Your own choices & response", "Weather & traffic", "Others' moods", "Suppressing all feeling"], answer: "Your own choices & response", tip: "Own what is up to you; calmly release what is not!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "dsa-bigo-blitz",
      icon: "🧩",
      title: "DSA, Trees & Big-O Blitz",
      desc: "Hash Maps, LIFO/FIFO, Binary Search, Heaps, BFS/Dijkstra & DP",
      color: "#4c7899",
      gen: function () {
        const bank = [
          { prompt: "Time complexity of Hash Map Two-Sum single-pass lookup:", options: ["`O(n)`", "`O(n²)`", "`O(2ⁿ)`", "`O(n log n)`"], answer: "`O(n)`", tip: "`O(1)` average lookup per item × `n` items = `O(n)`!" },
          { prompt: "Guaranteed worst-case runtime of Merge Sort:", options: ["`O(n log n)`", "`O(n²)`", "`O(n)`", "`O(log n)`"], answer: "`O(n log n)`", tip: "Merge Sort always divides evenly into `log n` levels!" },
          { prompt: "BST traversal that prints all keys in sorted ascending order:", options: ["In-Order (`L → Root → R`)", "Pre-Order (`Root → L → R`)", "Post-Order (`L → R → Root`)", "BFS Level Order"], answer: "In-Order (`L → Root → R`)", tip: "Left is smaller, Right is larger → In-Order is sorted!" },
          { prompt: "Algorithm for shortest path in an UNWEIGHTED graph:", options: ["BFS (Queue)", "DFS (Stack)", "Quick Sort", "Two Pointers"], answer: "BFS (Queue)", tip: "Level-by-level expansion finds minimum hops first!" },
          { prompt: "Algorithm for shortest path with positive weighted edges:", options: ["Dijkstra (Min-Heap)", "Plain BFS", "Bubble Sort", "Linked List"], answer: "Dijkstra (Min-Heap)", tip: "Always relaxes the lowest cumulative cost edge next!" },
          { prompt: "Python `deque.popleft()` vs `list.pop(0)` complexity:", options: ["`O(1)` vs `O(n)`", "`O(n)` vs `O(1)`", "Both `O(1)`", "Both `O(n²)`"], answer: "`O(1)` vs `O(n)`", tip: "`list.pop(0)` shifts every remaining element left!" },
          { prompt: "Sliding window update when shifting 1 step right (`width k`):", options: ["`win += arr[i] - arr[i - k]`", "Re-sum all `k` elements", "Multiply by `k`", "Sort window"], answer: "`win += arr[i] - arr[i - k]`", tip: "Add incoming right, drop outgoing left in `O(1)`!" },
          { prompt: "Left child index of node `i` in a 0-indexed Binary Heap array:", options: ["`2i + 1`", "`i + 1`", "`i / 2`", "`2i - 1`"], answer: "`2i + 1`", tip: "Left = `2i + 1`, Right = `2i + 2`!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "sql-backend-blitz",
      icon: "🗄️",
      title: "SQL, REST, Auth & Git Blitz",
      desc: "JOINs, HAVING, B-Trees, HTTP 401/403/429, JWT, chmod & Git",
      color: "#4f7c6b",
      gen: function () {
        const bank = [
          { prompt: "Correct SQL test for missing (`NULL`) values:", options: ["`WHERE col IS NULL`", "`WHERE col = NULL`", "`WHERE col == None`", "`WHERE col != ''`"], answer: "`WHERE col IS NULL`", tip: "`= NULL` is always UNKNOWN in SQL!" },
          { prompt: "SQL clause that filters grouped aggregates like `COUNT(*) >= 2`:", options: ["`HAVING`", "`WHERE`", "`FROM`", "`LIMIT`"], answer: "`HAVING`", tip: "`WHERE` filters raw rows; `HAVING` filters groups!" },
          { prompt: "HTTP status for 'Logged in, but lacks Admin permission':", options: ["`403 Forbidden`", "`401 Unauthorized`", "`201 Created`", "`404 Not Found`"], answer: "`403 Forbidden`", tip: "`401` = AuthN (who are you?); `403` = AuthZ (not allowed)!" },
          { prompt: "HTTP status code returned by API Rate Limiters:", options: ["`429 Too Many Requests`", "`200 OK`", "`301 Redirect`", "`500 Error`"], answer: "`429 Too Many Requests`", tip: "`429` signals client throttling!" },
          { prompt: "Is a standard JWT payload encrypted or readable Base64?", options: ["Readable Base64 (signed, NOT encrypted!)", "AES-256 encrypted", "Hidden by SQL", "Binary-only"], answer: "Readable Base64 (signed, NOT encrypted!)", tip: "Never put secrets in a JWT payload — signing prevents tampering, not reading!" },
          { prompt: "Decode `chmod 755` (`r=4, w=2, x=1`):", options: ["`rwxr-xr-x`", "`rw-r--r--`", "`rwxrwxrwx`", "`rw-------`"], answer: "`rwxr-xr-x`", tip: "7 = 4+2+1 (`rwx`), 5 = 4+1 (`r-x`)!" },
          { prompt: "Git command to create AND switch to branch `feat-api`:", options: ["`git checkout -b feat-api`", "`git merge feat-api`", "`git init feat-api`", "`git add feat-api`"], answer: "`git checkout -b feat-api`", tip: "`-b` creates & checks out the branch pointer immediately!" },
          { prompt: "Primary defense against SQL Injection in backend queries:", options: ["Parameterized Queries (`$1`, `?`)", "String concatenation", "Disabling indexes", "Using `SELECT *`"], answer: "Parameterized Queries (`$1`, `?`)", tip: "Binds user input as literal data, never executable SQL!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "js-ts-async-blitz",
      icon: "⚡",
      title: "Modern JS, TS & Async Blitz",
      desc: "Event Loop, Closures, .map/.reduce, fetch(), TypeScript & TDD",
      color: "#7b6399",
      gen: function () {
        const bank = [
          { prompt: "Which queue drains FIRST right after JS sync code ends?", options: ["Microtask Queue (`Promise.then`)", "Macrotask Queue (`setTimeout`)", "Render Paint Queue", "Disk Queue"], answer: "Microtask Queue (`Promise.then`)", tip: "Microtasks ALWAYS beat `setTimeout(..., 0)`!" },
          { prompt: "Why does `[10, 2, 1].sort()` return `[1, 10, 2]` in JS?", options: ["Default `.sort()` sorts alphabetically as strings", "JS cannot sort numbers", "Arrays start at index 1", "It reverses the array"], answer: "Default `.sort()` sorts alphabetically as strings", tip: "Always pass `(a, b) => a - b` for numbers!" },
          { prompt: "What does `await fetch('/404')` do on HTTP 404?", options: ["Resolves with `res.ok === false`", "Throws automatically into `catch`", "Retries 3 times", "Returns `null`"], answer: "Resolves with `res.ok === false`", tip: "Always check `if (!res.ok) throw new Error(res.status)`!" },
          { prompt: "Safer TypeScript top-type forcing checks before use:", options: ["`unknown`", "`any`", "`void`", "`var`"], answer: "`unknown`", tip: "`unknown` requires narrowing; `any` disables type safety!" },
          { prompt: "Runtime overhead of TypeScript type annotations after build:", options: ["Zero (erased at compile time)", "2× slower CPU", "50MB extra RAM", "Needs cloud server"], answer: "Zero (erased at compile time)", tip: "Types vanish completely into clean JS!" },
          { prompt: "Correct TDD loop sequence:", options: ["Red → Green → Refactor", "Ship → Hotfix → Pray", "Refactor → Red → Skip", "Green → Red → Delete"], answer: "Red → Green → Refactor", tip: "Failing test first → minimal pass → clean refactor!" },
          { prompt: "Run 2 independent async API calls concurrently in JS:", options: ["`await Promise.all([a(), b()])`", "`await a(); await b();`", "`[a,b].forEach(async f => await f())`", "`setTimeout`"], answer: "`await Promise.all([a(), b()])`", tip: "Parallel execution finishes in `max(tA, tB)` instead of `tA + tB`!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "dost-mech-sci-blitz",
      icon: "🔬",
      title: "DOST Mechanical & Space Blitz",
      desc: "Pulleys, Gears, Levers, Stars/H-R Diagram & Work Rate",
      color: "#3b7a9e",
      gen: function () {
        const bank = [
          { prompt: "Ideal Mechanical Advantage of a single FIXED ceiling pulley:", options: ["1 (direction change only!)", "2", "4", "0.5"], answer: "1 (direction change only!)", tip: "Only MOVABLE pulleys split load across upward strands!" },
          { prompt: "36-tooth gear (10 RPM CW) meshes with a 12-tooth gear → Driven gear turns:", options: ["30 RPM CCW", "30 RPM CW", "3.3 RPM CCW", "10 RPM CCW"], answer: "30 RPM CCW", tip: "Meshing gears flip spin & `10 × 36 ÷ 12 = 30 RPM`!" },
          { prompt: "Hottest planet in our Solar System (`~465°C` runaway `CO₂`):", options: ["Venus", "Mercury", "Mars", "Jupiter"], answer: "Venus", tip: "Mercury has almost no atmosphere; Venus traps extreme greenhouse heat!" },
          { prompt: "Star color with the HIGHEST surface temperature (`O & B`):", options: ["Blue", "Red", "Orange", "Yellow"], answer: "Blue", tip: "Blue = hottest, Red = coolest!" },
          { prompt: "Final evolutionary remnant of a Sun-like star (`1 M☉`):", options: ["White Dwarf", "Black Hole", "Neutron Star", "Supernova"], answer: "White Dwarf", tip: "Sun → Red Giant → Planetary Nebula → White Dwarf!" },
          { prompt: "Pipe A (`6h`) + Pipe B (`3h`) fill a tank together in:", options: ["2 hours", "4.5 hours", "9 hours", "1.5 hours"], answer: "2 hours", tip: "`T = (A×B)/(A+B) = 18/9 = 2h`!" },
          { prompt: "Lever class with LOAD in the middle (wheelbarrow, nutcracker):", options: ["Class 2 Lever", "Class 1 Lever", "Class 3 Lever", "Fixed Pulley"], answer: "Class 2 Lever", tip: "FLE 1-2-3: 1=Fulcrum, 2=Load, 3=Effort middle!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "cse-civics-series-blitz",
      icon: "🏛️",
      title: "CSE RA 6713, Filing & Series Blitz",
      desc: "RA 6713 deadlines, Env Laws, Filing rules & Number/Letter Series",
      color: "#4a6fa5",
      gen: function () {
        const bank = [
          { prompt: "RA 6713 deadline to respond to public letters/requests:", options: ["15 working days", "30 calendar days", "5 working days", "60 days"], answer: "15 working days", tip: "15 working days & max 3 signatories!" },
          { prompt: "Annual SALN filing deadline under RA 6713:", options: ["On or before April 30", "April 15", "January 31", "December 31"], answer: "On or before April 30", tip: "30d assumption · April 30 yearly · 30d separation!" },
          { prompt: "Philippine Ecological Solid Waste Management Act:", options: ["RA 9003", "RA 8749", "RA 9275", "RA 9729"], answer: "RA 9003", tip: "8749 Air · 9003 Waste · 9275 Water · 9729 Climate!" },
          { prompt: "Official Civil Service Exam (Pro & Sub-Pro) passing rate:", options: ["80.00%", "75.00%", "70.00%", "85.00%"], answer: "80.00%", tip: "Both Pro and Sub-Pro require 80.00% general rating!" },
          { prompt: "Under which letter is `'The Manila Bulletin'` filed?", options: ["M (`Manila Bulletin, The`)", "T (`The ...`)", "B (`Bulletin ...`)", "N (`News ...`)"], answer: "M (`Manila Bulletin, The`)", tip: "Always move a leading `The` to the end!" },
          { prompt: "Next term in `3, 7, 13, 21, 31, ___`:", options: ["43", "41", "45", "39"], answer: "43", tip: "2nd diff `+2`: jumps `+4,+6,+8,+10,+12` → `31 + 12 = 43`!" },
          { prompt: "Single equivalent discount for `20%` off then `10%` off:", options: ["28%", "30%", "25%", "32%"], answer: "28%", tip: "`0.80 × 0.90 = 0.72` paid → `28%` saved!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    },
    {
      id: "nmat-psych-perceptual-blitz",
      icon: "🩺",
      title: "NMAT Perceptual & Social Sci Blitz",
      desc: "Mirror clocks, Operant Conditioning, Piaget, Durkheim & SVA",
      color: "#7b6399",
      gen: function () {
        const bank = [
          { prompt: "Real clock `3:15` appears in a vertical wall mirror as:", options: ["8:45", "9:15", "3:45", "9:45"], answer: "8:45", tip: "Mirror shortcut: `11:60 − 3:15 = 8:45`!" },
          { prompt: "Buckling a seatbelt stops a loud beep → buckling increases. Type?", options: ["Negative Reinforcement", "Positive Punishment", "Negative Punishment", "Extinction"], answer: "Negative Reinforcement", tip: "Removes annoyance (−) to INCREASE behavior (Reinforcement)!" },
          { prompt: "Piaget stage where children first master liquid Conservation (7–11):", options: ["Concrete Operational", "Preoperational", "Sensorimotor", "Formal Operational"], answer: "Concrete Operational", tip: "Preop lacks conservation; Concrete masters it!" },
          { prompt: "Durkheim's term for normlessness during rapid social upheaval:", options: ["Anomie", "Ethnocentrism", "Sublimation", "Bureaucracy"], answer: "Anomie", tip: "Greek `a-nomos` = without norms!" },
          { prompt: "Understanding another culture strictly within its own context:", options: ["Cultural Relativism", "Ethnocentrism", "Xenocentrism", "Conflict Theory"], answer: "Cultural Relativism", tip: "Opposite of judging others by your own cultural yardstick!" },
          { prompt: "Which word looks 100% identical in a vertical mirror?", options: ["MOM", "BOB", "DAD", "POP"], answer: "MOM", tip: "Vertically symmetric letters: `A,H,I,M,O,T,U,V,W,X,Y`!" },
          { prompt: "UPCAT `R − ¼W`: EV when you eliminate 2 choices (50/50 left):", options: ["+0.375 pts (GUESS!)", "−0.250 pts", "0.000 pts", "+0.063 pts"], answer: "+0.375 pts (GUESS!)", tip: "`0.5(+1) + 0.5(−0.25) = +0.375`!" }
        ];
        const p = bank[randInt(0, bank.length - 1)];
        return { prompt: p.prompt, options: shuffle(p.options), answer: p.answer, tip: p.tip };
      }
    }
  ];

  // ==================== MEMORIZE VAULT RENDERER ====================
  let activeSubTab = "course";
  let multFilter = "all"; // all | hard | squares | quiz | row-N
  let multSelected = { r: 7, c: 8 };
  let multQuizAnswer = "";
  let multQuizFeedback = "";
  let divInputVal = "126";
  let hideRoots = false;
  let flippedCards = {};
  let courseSession = null;
  let multBfSession = null;
  let bfClockTimer = null;
  const bfConfig = {
    scope: "hard15", // hard15 | smart_weak | all144 | custom_tables
    goal: "15", // "15" | "30" | "reflex15" | "0"
    inputMode: "type", // "type" | "mc"
    instantAdvance: true,
    customTables: [6, 7, 8, 9]
  };

  function fmtMath(str, display) {
    return root.MATHLINGO_LATEX ? root.MATHLINGO_LATEX.formatMath(str, display) : String(str == null ? "" : str);
  }

  function isFinePointer() {
    return typeof window === "undefined" || !window.matchMedia || !window.matchMedia("(pointer: coarse)").matches;
  }

  function renderTouchNumpadHtml(prefix) {
    const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "clear", "0", "back"];
    return `
      <div class="ml-touch-numpad">
        <div class="ml-numpad-grid">
          ${keys.map((k) => {
            const label = k === "back" ? "⌫" : k === "clear" ? "Clear" : k;
            return `<button type="button" class="ml-numpad-btn" data-${prefix}-pad="${k}">${label}</button>`;
          }).join("")}
        </div>
        <button type="button" class="ml-btn-primary big ml-numpad-lock" data-${prefix}-pad="submit">Lock Answer ↵</button>
      </div>
    `;
  }

  function bindTouchNumpad(container, prefix, inpEl, onSubmit) {
    if (!inpEl) return;
    container.querySelectorAll(`[data-${prefix}-pad]`).forEach((btn) => {
      btn.addEventListener("click", () => {
        const act = btn.getAttribute(`data-${prefix}-pad`);
        if (act === "submit") {
          onSubmit();
          return;
        }
        if (act === "clear") inpEl.value = "";
        else if (act === "back") inpEl.value = (inpEl.value || "").slice(0, -1);
        else inpEl.value = (inpEl.value || "") + act;
      });
    });
  }

  function stopBfClock() {
    if (bfClockTimer) {
      clearInterval(bfClockTimer);
      bfClockTimer = null;
    }
  }

  function pairKey(a, b) {
    return `${Math.min(a, b)}x${Math.max(a, b)}`;
  }

  function getMultMasteryMap(state) {
    return (state && state.multMastered) || {};
  }

  function countMastered144(multMastered) {
    let mastered = 0;
    let familiar = 0;
    for (let r = 1; r <= 12; r++) {
      for (let c = 1; c <= 12; c++) {
        const lvl = multMastered[pairKey(r, c)] || 0;
        if (lvl >= 2) mastered++;
        else if (lvl === 1) familiar++;
      }
    }
    return { mastered, familiar, pct: Math.round((mastered / 144) * 100) };
  }

  function renderMemorizeView(container, stateOrHooks, maybeHooks) {
    const hasState = maybeHooks !== undefined;
    const state = hasState ? stateOrHooks : {};
    const hooks = hasState ? maybeHooks : stateOrHooks;
    const DATA = root.MATHLINGO_DATA;
    const VIZ = root.MATHLINGO_VISUALIZERS;

    if (activeSubTab === "course" && courseSession) {
      renderMultCourseRunner(container, state, DATA, hooks);
      return;
    }

    if (activeSubTab === "multbf" && multBfSession) {
      renderMultBruteforceRunner(container, state, DATA, hooks);
      return;
    }

    const subTabs = [
      { id: "course", label: "1×1 → 12×12 Course" },
      { id: "multbf", label: "Mult Bruteforce" },
      { id: "mult", label: "12×12 Matrix" },
      { id: "div", label: "Division Rules" },
      { id: "roots", label: "Roots & 2ⁿ" },
      { id: "patterns", label: "Primes & Patterns" },
      { id: "triglog", label: "Trig & Logs" },
      { id: "elements", label: "Elements (1–20)" },
      { id: "science", label: "STEM Formulas" },
      { id: "ai_laws", label: "AI & Physics Laws" },
      { id: "coding", label: "HTML / CSS / Python" },
      { id: "ph_history", label: "PH History" },
      { id: "filipino", label: "Filipino Wika" },
      { id: "earth_econ", label: "Earth, Econ & Phil" },
      { id: "exam_prep", label: "🎯 Exam Rules & Formulas" }
    ];

    container.innerHTML = `
      <div class="ml-section-banner">
        <div>
          <h2>Memorize Vault & Pattern Trainer</h2>
          <p>Lock in times tables, roots, primes, trig, elements, STEM & Physics laws, AI/Coding references, PH History dates & Filipino traps.</p>
        </div>
      </div>

      <div class="ml-lab-pills ml-mem-tabs">
        ${subTabs.map((t) => `
          <button type="button" class="ml-filter-pill ${activeSubTab === t.id ? "active" : ""}" data-mem-tab="${t.id}">
            ${t.label}
          </button>
        `).join("")}
      </div>

      <div id="ml-mem-body"></div>
    `;

    container.querySelectorAll("[data-mem-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        stopBfClock();
        courseSession = null;
        multBfSession = null;
        activeSubTab = btn.dataset.memTab;
        renderMemorizeView(container, state, hooks);
      });
    });

    const body = document.getElementById("ml-mem-body");
    if (activeSubTab === "course") renderMultCourseHome(body, container, state, DATA, hooks);
    else if (activeSubTab === "multbf") renderMultBruteforceView(body, container, state, DATA, hooks);
    else if (activeSubTab === "mult") renderMultMatrix(body, DATA, hooks, state, container);
    else if (activeSubTab === "div") renderDivisionTab(body, DATA, hooks);
    else if (activeSubTab === "roots") renderRootsTab(body, DATA, hooks);
    else if (activeSubTab === "patterns") renderPatternsTab(body, DATA, VIZ, hooks);
    else if (activeSubTab === "elements") renderElementsTab(body, DATA, hooks);
    else if (activeSubTab === "science") renderScienceFormulasTab(body, DATA, hooks);
    else if (activeSubTab === "ai_laws") renderAiAndLawsTab(body, DATA, hooks);
    else if (activeSubTab === "coding") renderCodingCardsTab(body, DATA, hooks);
    else if (activeSubTab === "ph_history") renderPhHistoryCardsTab(body, DATA, hooks);
    else if (activeSubTab === "filipino") renderFilipinoCardsTab(body, DATA, hooks);
    else if (activeSubTab === "earth_econ") renderEarthEconPhilCardsTab(body, DATA, hooks);
    else if (activeSubTab === "exam_prep") renderExamPrepCardsTab(body, DATA, hooks);
    else renderTrigLogTab(body, DATA, hooks);
  }

  // ==================== GUIDED 1x1 -> 12x12 ONE-BY-ONE COURSE ====================
  function buildHeatmapHtml(multMastered) {
    let rows = "";
    for (let r = 1; r <= 12; r++) {
      let cells = "";
      for (let c = 1; c <= 12; c++) {
        const lvl = multMastered[pairKey(r, c)] || 0;
        const cls = lvl >= 2 ? "mastered" : lvl === 1 ? "familiar" : "";
        cells += `<div class="ml-hm-cell ${cls}" title="${r} × ${c} = ${r * c} (${lvl >= 2 ? "Mastered" : lvl === 1 ? "Familiar" : "New"})">${r * c}</div>`;
      }
      rows += cells;
    }
    return `<div class="ml-hm-grid">${rows}</div>`;
  }

  function renderMultCourseHome(body, outerContainer, state, DATA, hooks) {
    const stages = DATA.MEMORIZE_DATA.multCourseStages;
    const multMap = getMultMasteryMap(state);
    const stats = countMastered144(multMap);

    let nextStage = stages[0];
    for (const st of stages) {
      const checkList = st.unlockPairs || st.pairs;
      const allDone = checkList.every(([a, b]) => (multMap[pairKey(a, b)] || 0) >= 2);
      if (!allDone) {
        nextStage = st;
        break;
      }
    }

    const unmasteredPairs = [];
    for (let a = 1; a <= 12; a++) {
      for (let b = a; b <= 12; b++) {
        if ((multMap[pairKey(a, b)] || 0) < 2) unmasteredPairs.push([a, b]);
      }
    }

    body.innerHTML = `
      <div class="ml-mem-card" style="margin-bottom:18px;">
        <div class="ml-course-hero">
          <div class="ml-course-hero-left">
            <div class="ml-hero-kicker">ONE-BY-ONE INCREMENTAL MASTERY • ZERO OVERWHELM</div>
            <h3 style="margin:0 0 6px; font-size:21px;">🎓 Full Multiplication Course (1×1 → 12×12)</h3>
            <p class="ml-hero-desc" style="margin-bottom:12px;">
              Instead of memorizing 144 random facts, we introduce tables in <strong>smart order</strong> (Freebies → ×2 → ×5 → ×11 → ×9 → ×4 → ×3 → ×8 → ×6 → final 3!) — unlocking facts <strong>one-by-one</strong> until you hit 2/2 streaks on every single one!
            </p>
            <div class="ml-hero-progress-meta">
              <span>Live 12×12 Heatmap: <strong>${stats.mastered} / 144 Cells Mastered (${stats.pct}%)</strong></span>
            </div>
            <div class="ml-progress-track" style="margin-bottom:14px;">
              <div class="ml-progress-fill" style="width:${Math.max(4, stats.pct)}%"></div>
            </div>
            <div class="ml-hero-quick-actions">
              <button type="button" class="ml-btn-primary" id="ml-mc-next-btn">
                ▶️ ${stats.mastered >= 144 ? "Replay Grand Boss" : `Start ${nextStage.tableLabel} (${nextStage.title.split(":")[0]})`} →
              </button>
              <button type="button" class="ml-btn-bruteforce" id="ml-mc-bf-btn">
                🔨 Multiplication Bruteforce
              </button>
              ${unmasteredPairs.length > 0 ? `
                <button type="button" class="ml-btn-secondary" id="ml-mc-weak-btn">
                  🔥 Master ${Math.min(6, unmasteredPairs.length)} Unfinished Facts 1-by-1
                </button>
              ` : ""}
            </div>
          </div>

          <div class="ml-hm-wrap">
            <div class="ml-mini-tag" style="margin-bottom:6px; text-align:center;">12×12 Live Mastery Grid (🟩 Mastered • 🟦 Seen)</div>
            ${buildHeatmapHtml(multMap)}
          </div>
        </div>
      </div>

      <div class="ml-node-grid">
        ${stages.map((st) => {
          const trackPairs = st.unlockPairs || st.pairs;
          const doneCount = trackPairs.filter(([a, b]) => (multMap[pairKey(a, b)] || 0) >= 2).length;
          const stagePct = Math.round((doneCount / trackPairs.length) * 100);
          const isDone = doneCount === trackPairs.length;
          return `
            <article class="ml-node-card ${isDone ? "level-3" : ""}" style="--world-color:${st.color}; --world-dark:${st.color}; --world-soft:color-mix(in srgb, ${st.color} 12%, transparent);">
              <div class="ml-node-top">
                <div class="ml-node-icon-ring">${st.icon}</div>
                <span class="ml-node-stage-pill ${isDone ? "level-2" : ""}">
                  ${isDone ? "✅ Mastered" : `${doneCount}/${trackPairs.length} Facts`}
                </span>
              </div>
              <div class="ml-node-order">Stage ${st.order} of 10 • ${st.pairs.length} New Fact${st.pairs.length === 1 ? "" : "s"} Taught 1-by-1</div>
              <h3 class="ml-node-title">${st.title}</h3>
              <p class="ml-node-tagline"><strong>"${st.vibe}"</strong><br />${st.trickSummary}</p>
              <div class="ml-progress-track" style="height:8px; margin-bottom:12px;">
                <div class="ml-progress-fill" style="width:${Math.max(4, stagePct)}%"></div>
              </div>
              <button type="button" class="ml-btn-node" data-start-mc="${st.id}">
                ${isDone ? "🔁 Practice Again" : "📖 Introduce 1-by-1 →"}
              </button>
            </article>
          `;
        }).join("")}
      </div>
    `;

    document.getElementById("ml-mc-next-btn").addEventListener("click", () => {
      if (hooks && hooks.onTap) hooks.onTap();
      startMultCourseStage(nextStage, outerContainer, state, DATA, hooks);
    });

    const bfLaunchBtn = document.getElementById("ml-mc-bf-btn");
    if (bfLaunchBtn) {
      bfLaunchBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        stopBfClock();
        activeSubTab = "multbf";
        multBfSession = null;
        renderMemorizeView(outerContainer, state, hooks);
      });
    }

    const weakBtn = document.getElementById("ml-mc-weak-btn");
    if (weakBtn) {
      weakBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        const picked = shuffle(unmasteredPairs).slice(0, 6);
        startMultCourseStage({
          id: "custom-weak",
          order: 0,
          tableLabel: "Unfinished Mix",
          title: "Custom Unfinished Facts Dojo",
          icon: "🔥",
          color: "#b36a22",
          vibe: "Turn every gray square green!",
          trickSummary: "We'll introduce up to 6 unmastered facts one-by-one until you hit 2/2 streaks on every single one.",
          pairs: picked
        }, outerContainer, state, DATA, hooks);
      });
    }

    body.querySelectorAll("[data-start-mc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        const stage = stages.find((s) => s.id === btn.dataset.startMc);
        if (stage) startMultCourseStage(stage, outerContainer, state, DATA, hooks);
      });
    });
  }

  function startMultCourseStage(stage, outerContainer, state, DATA, hooks) {
    const rawPairs = stage.bossReviewPairs
      ? stage.pairs.concat(stage.bossReviewPairs.slice(0, 3))
      : stage.pairs.slice();

    const facts = rawPairs.map(([a, b], idx) => ({
      a,
      b,
      key: pairKey(a, b),
      streak: 0,
      introduced: idx === 0
    }));

    courseSession = {
      stage,
      phase: "brief", // "brief" | "play" | "done"
      inputMode: "type", // "type" | "mc"
      phaseMode: "spotlight", // "spotlight" | "ask"
      facts,
      activeIdx: 0,
      askFlipped: false,
      currentOptions: [],
      typedVal: "",
      checked: false,
      isCorrect: false,
      instantAdvance: true,
      lastFlash: null,
      repsSinceIntro: 0,
      totalAttempts: 0,
      totalCorrect: 0
    };

    renderMultCourseRunner(outerContainer, state, DATA, hooks);
  }

  function renderDotVisualHtml(a, b) {
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    if (lo <= 10 && hi <= 10) {
      let rowsHtml = "";
      for (let r = 0; r < lo; r++) {
        let dots = "";
        for (let c = 0; c < hi; c++) {
          dots += `<span class="ml-dot-cell"></span>`;
        }
        rowsHtml += `<div class="ml-dot-row">${dots}</div>`;
      }
      return `
        <div class="ml-dot-matrix-wrap">
          ${rowsHtml}
          <div class="ml-viz-sub" style="margin-top:6px;">${lo} rows × ${hi} columns = <strong>${a * b}</strong></div>
        </div>
      `;
    }
    const splitTens = 10;
    const splitOnes = hi - 10;
    return `
      <div class="ml-area-split" style="max-width:420px; margin:10px auto;">
        <div class="ml-area-box ml-area-tens" style="flex:10">
          <div class="ml-area-dims">${lo} × 10</div>
          <div class="ml-area-num">${lo * splitTens}</div>
        </div>
        <div class="ml-area-plus">+</div>
        <div class="ml-area-box ml-area-ones" style="flex:${Math.max(3, splitOnes)}">
          <div class="ml-area-dims">${lo} × ${splitOnes}</div>
          <div class="ml-area-num">${lo * splitOnes}</div>
        </div>
      </div>
    `;
  }

  function buildMultChoices(a, b) {
    const ans = a * b;
    return makeNumericOpts(ans, [a, -a, b, -b, 2, -2, 10, -10].filter((d) => ans + d > 0));
  }

  function renderMultCourseRunner(container, state, DATA, hooks) {
    const cs = courseSession;
    if (!cs) return;
    const st = cs.stage;

    if (cs.phase === "brief") {
      const pairBadges = cs.facts.map((f) => `<span class="ml-x-chip">${f.a} × ${f.b}</span>`).join("");
      container.innerHTML = `
        <div class="ml-mem-card" style="max-width:740px; margin:0 auto;">
          <div class="ml-modal-top" style="padding:0 0 12px; margin-bottom:16px;">
            <button type="button" class="ml-close-btn" id="ml-mc-back">←</button>
            <div style="flex:1; font-weight:800;">${st.icon} ${st.title}</div>
          </div>

          <div class="ml-easy-box" style="margin-bottom:14px;">
            <div class="ml-mini-tag">😮 Why This Stage Is Easy</div>
            <div style="font-size:15px; font-weight:700; margin-top:2px;">${st.trickSummary}</div>
          </div>

          <div class="ml-micro-card" style="margin-bottom:14px;">
            <div class="ml-micro-label">🆕 Facts We'll Introduce One-by-One (${cs.facts.length})</div>
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">${pairBadges}</div>
            <p class="ml-viz-sub" style="margin-top:8px;">
              How it works: we spotlight <strong>1 fact at a time</strong> with its trick, then mix it with earlier ones until EVERY fact reaches a <strong>✅ 2/2 streak</strong> (forward AND reversed!).
            </p>
          </div>

          <div class="ml-micro-card" style="margin-bottom:16px;">
            <div class="ml-micro-label">Choose Your Recall Style (Switch Anytime)</div>
            <div class="ml-viz-tabs" style="margin-top:8px;">
              <button type="button" class="ml-pill ${cs.inputMode === "type" ? "active" : ""}" data-mc-mode="type">🧠 Type Answer (Best for Real Memory!)</button>
              <button type="button" class="ml-pill ${cs.inputMode === "mc" ? "active" : ""}" data-mc-mode="mc">🎯 4 Choices (Warmup)</button>
            </div>
          </div>

          <button type="button" class="ml-btn-primary big" id="ml-mc-begin">
            Introduce Fact #1 (${cs.facts[0].a} × ${cs.facts[0].b}) →
          </button>
        </div>
      `;

      document.getElementById("ml-mc-back").addEventListener("click", () => {
        courseSession = null;
        renderMemorizeView(container, state, hooks);
      });
      container.querySelectorAll("[data-mc-mode]").forEach((btn) => {
        btn.addEventListener("click", () => {
          cs.inputMode = btn.dataset.mcMode;
          renderMultCourseRunner(container, state, DATA, hooks);
        });
      });
      document.getElementById("ml-mc-begin").addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        cs.phase = "play";
        cs.phaseMode = "spotlight";
        cs.activeIdx = 0;
        renderMultCourseRunner(container, state, DATA, hooks);
      });
      return;
    }

    if (cs.phase === "done") {
      const multMap = getMultMasteryMap(state);
      const stats = countMastered144(multMap);
      const stages = DATA.MEMORIZE_DATA.multCourseStages;
      const nextStage = stages.find((s) => s.order === st.order + 1);
      const acc = cs.totalAttempts > 0 ? Math.round((cs.totalCorrect / cs.totalAttempts) * 100) : 100;

      container.innerHTML = `
        <div class="ml-mem-card" style="max-width:740px; margin:0 auto; text-align:center;">
          <div style="font-size:52px;">👑</div>
          <h2>Stage Mastered: ${st.tableLabel}!</h2>
          <p class="ml-hero-desc">Every fact hit 2/2 streak (both forward & reversed) • Accuracy: ${acc}% • +40 XP & +20 💎</p>

          <div style="max-width:440px; margin:16px auto;">
            <div class="ml-mini-tag" style="margin-bottom:6px;">Updated 12×12 Mastery: ${stats.mastered} / 144 Cells (${stats.pct}%)</div>
            ${buildHeatmapHtml(multMap)}
          </div>

          <div class="ml-victory-actions" style="margin-top:18px;">
            <button type="button" class="ml-btn-secondary" id="ml-mc-home">Back to Course Map</button>
            ${nextStage ? `<button type="button" class="ml-btn-primary" id="ml-mc-go-next">Next: ${nextStage.tableLabel} →</button>` : ""}
          </div>
        </div>
      `;

      document.getElementById("ml-mc-home").addEventListener("click", () => {
        courseSession = null;
        renderMemorizeView(container, state, hooks);
      });
      const goNext = document.getElementById("ml-mc-go-next");
      if (goNext && nextStage) {
        goNext.addEventListener("click", () => {
          startMultCourseStage(nextStage, container, state, DATA, hooks);
        });
      }
      return;
    }

    // Phase === "play"
    const fact = cs.facts[cs.activeIdx];
    const qa = cs.askFlipped ? fact.b : fact.a;
    const qb = cs.askFlipped ? fact.a : fact.b;
    const prod = qa * qb;
    const trick = DATA.explainMultPair(qa, qb);
    const masteredCount = cs.facts.filter((f) => f.streak >= 2).length;
    const introducedCount = cs.facts.filter((f) => f.introduced).length;

    const stripHtml = cs.facts.map((f, idx) => {
      const cls = f.streak >= 2 ? "done" : f.introduced ? (idx === cs.activeIdx ? "cur" : "active") : "locked";
      const mark = f.streak >= 2 ? "✅" : f.introduced ? `${f.streak}/2` : "🔒";
      return `<span class="ml-fact-chip ${cls}">${f.a}×${f.b} <strong>${mark}</strong></span>`;
    }).join("");

    if (cs.phaseMode === "spotlight") {
      container.innerHTML = `
        <div class="ml-mem-card" style="max-width:720px; margin:0 auto;">
          <div class="ml-modal-top" style="padding:0 0 12px; margin-bottom:14px;">
            <button type="button" class="ml-close-btn" id="ml-mc-quit">✕</button>
            <div style="flex:1; font-weight:800;">${st.icon} ${st.tableLabel} • Mastered ${masteredCount}/${cs.facts.length}</div>
            <button type="button" class="ml-btn-mini" id="ml-mc-toggle-mode">${cs.inputMode === "type" ? "Switch to 4 Choices" : "Switch to Typing"}</button>
          </div>

          <div class="ml-fact-strip">${stripHtml}</div>

          <div class="ml-spotlight-card">
            <div class="ml-hero-kicker">🆕 INTRODUCING FACT #${introducedCount} OF ${cs.facts.length}</div>
            <div class="ml-mx-big-eq" style="font-size:38px; margin:8px 0;">${fact.a} × ${fact.b} = ${fact.a * fact.b}</div>
            <div class="ml-easy-box" style="text-align:left; margin:12px 0;">
              <strong>🧠 Memory Trick:</strong> ${trick}
            </div>
            ${renderDotVisualHtml(fact.a, fact.b)}
            <button type="button" class="ml-btn-primary big" style="margin-top:16px;" id="ml-mc-spotlight-go">
              Got It — Quiz Me Now! →
            </button>
          </div>
        </div>
      `;

      document.getElementById("ml-mc-quit").addEventListener("click", () => {
        courseSession = null;
        renderMemorizeView(container, state, hooks);
      });
      document.getElementById("ml-mc-toggle-mode").addEventListener("click", () => {
        cs.inputMode = cs.inputMode === "type" ? "mc" : "type";
        renderMultCourseRunner(container, state, DATA, hooks);
      });
      const goBtn = document.getElementById("ml-mc-spotlight-go");
      goBtn.focus();
      goBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        cs.phaseMode = "ask";
        cs.checked = false;
        cs.typedVal = "";
        cs.askFlipped = false;
        cs.questionStart = Date.now();
        cs.currentOptions = buildMultChoices(qa, qb);
        renderMultCourseRunner(container, state, DATA, hooks);
      });
      return;
    }

    // phaseMode === "ask"
    let answerUi = "";
    if (cs.inputMode === "type") {
      answerUi = `
        <form id="ml-mc-type-form" class="ml-input-answer-wrap" style="margin-bottom:10px;">
          <input type="text" inputmode="numeric" pattern="[0-9]*" id="ml-mc-type-inp" class="ml-answer-input ${cs.checked ? (cs.isCorrect ? "correct" : "wrong") : ""}"
            placeholder="Type answer & press Enter..." value="${cs.typedVal}" ${cs.checked ? "disabled" : ""} autocomplete="off" />
          ${!cs.checked ? `<button type="submit" class="ml-btn-primary big">Lock Answer ↵</button>` : ""}
        </form>
        ${!cs.checked ? renderTouchNumpadHtml("mc") : ""}
      `;
    } else {
      answerUi = `
        <div class="ml-options-grid" style="margin-bottom:14px;">
          ${cs.currentOptions.map((opt, idx) => {
            let cls = "ml-option-btn";
            if (cs.checked) {
              if (opt === String(prod)) cls += " correct";
              else if (opt === cs.typedVal && !cs.isCorrect) cls += " wrong";
            }
            return `
              <button type="button" class="${cls}" data-mc-opt="${opt}" ${cs.checked ? "disabled" : ""}>
                <span class="ml-key-num">${idx + 1}</span>
                <span>${opt}</span>
              </button>
            `;
          }).join("")}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="ml-mem-card" style="max-width:720px; margin:0 auto;">
        <div class="ml-modal-top" style="padding:0 0 12px; margin-bottom:14px;">
          <button type="button" class="ml-close-btn" id="ml-mc-quit">✕</button>
          <div style="flex:1; font-weight:800;">${st.icon} ${st.tableLabel} • Mastered ${masteredCount}/${cs.facts.length}</div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button type="button" class="ml-btn-mini" id="ml-mc-toggle-inst">${cs.instantAdvance !== false ? "⚡ Instant: ON" : "⏸️ Pause"}</button>
            <button type="button" class="ml-btn-mini" id="ml-mc-toggle-mode">${cs.inputMode === "type" ? "4 Choices" : "Type Mode"}</button>
          </div>
        </div>

        <div class="ml-fact-strip">${stripHtml}</div>

        <div class="ml-quiz-meta" style="margin-top:12px;">
          <span>Fact Streak: ${fact.streak}/2 ${cs.askFlipped ? "• Reversed Mirror Check!" : ""}</span>
          <span>${introducedCount}/${cs.facts.length} facts unlocked</span>
        </div>

        ${cs.lastFlash ? `<div class="ml-instant-toast ${cs.lastFlash.ok ? "ok" : "nope"}">${cs.lastFlash.msg}</div>` : ""}

        <div class="ml-trap-expr" style="font-size:34px; padding:24px; margin:10px 0 16px;">
          ${qa} × ${qb} = ?
        </div>

        ${answerUi}

        ${cs.checked ? `
          <div class="ml-quiz-footer ${cs.isCorrect ? "correct" : "wrong"}" style="border-radius:14px;">
            <div class="ml-fb-copy">
              <div class="ml-fb-title">${cs.isCorrect ? `✅ Clean! (${fact.streak}/2)` : `💡 ${qa} × ${qb} = ${prod}`}</div>
              <div class="ml-fb-desc">${trick}</div>
            </div>
            <button type="button" class="ml-btn-${cs.isCorrect ? "primary" : "danger"}" id="ml-mc-next">Continue →</button>
          </div>
          ${!cs.isCorrect ? `<div style="margin-top:12px;">${renderDotVisualHtml(qa, qb)}</div>` : ""}
        ` : ""}
      </div>
    `;

    document.getElementById("ml-mc-quit").addEventListener("click", () => {
      courseSession = null;
      renderMemorizeView(container, state, hooks);
    });

    const mcInstBtn = document.getElementById("ml-mc-toggle-inst");
    if (mcInstBtn) {
      mcInstBtn.addEventListener("click", () => {
        cs.instantAdvance = cs.instantAdvance === false;
        renderMultCourseRunner(container, state, DATA, hooks);
      });
    }

    document.getElementById("ml-mc-toggle-mode").addEventListener("click", () => {
      cs.inputMode = cs.inputMode === "type" ? "mc" : "type";
      if (!cs.checked && cs.inputMode === "mc" && cs.currentOptions.length === 0) {
        cs.currentOptions = buildMultChoices(qa, qb);
      }
      renderMultCourseRunner(container, state, DATA, hooks);
    });

    function advanceCourseRep() {
      const allMastered = cs.facts.every((f) => f.streak >= 2);
      if (allMastered) {
        cs.phase = "done";
        if (hooks && hooks.onCompleteMultStage) hooks.onCompleteMultStage(st);
        renderMultCourseRunner(container, state, DATA, hooks);
        return;
      }

      const nextUnintroIdx = cs.facts.findIndex((f) => !f.introduced);
      const allIntroHave1 = cs.facts.filter((f) => f.introduced).every((f) => f.streak >= 1);
      if (nextUnintroIdx !== -1 && (allIntroHave1 || cs.repsSinceIntro >= 2)) {
        cs.facts[nextUnintroIdx].introduced = true;
        cs.activeIdx = nextUnintroIdx;
        cs.phaseMode = "spotlight";
        cs.repsSinceIntro = 0;
        cs.checked = false;
        cs.typedVal = "";
        renderMultCourseRunner(container, state, DATA, hooks);
        return;
      }

      const candidates = cs.facts
        .map((f, idx) => ({ f, idx }))
        .filter((item) => item.f.introduced && item.f.streak < 2);
      candidates.sort((x, y) => x.f.streak - y.f.streak);
      let chosen = candidates[0];
      if (candidates.length > 1 && chosen.idx === cs.activeIdx) {
        chosen = candidates[1];
      }
      cs.activeIdx = chosen.idx;
      cs.phaseMode = "ask";
      cs.askFlipped = chosen.f.streak === 1 && chosen.f.a !== chosen.f.b;
      cs.checked = false;
      cs.typedVal = "";
      cs.questionStart = Date.now();
      const nextQa = cs.askFlipped ? chosen.f.b : chosen.f.a;
      const nextQb = cs.askFlipped ? chosen.f.a : chosen.f.b;
      cs.currentOptions = buildMultChoices(nextQa, nextQb);
      renderMultCourseRunner(container, state, DATA, hooks);
    }

    function gradeCourseAnswer(valStr) {
      if (cs.checked || !String(valStr).trim()) return;
      const guessNum = parseInt(String(valStr).trim(), 10);
      const elapsedMs = cs.questionStart ? Math.max(200, Date.now() - cs.questionStart) : 3000;
      cs.typedVal = String(valStr).trim();
      cs.checked = true;
      cs.totalAttempts++;
      cs.repsSinceIntro++;

      const ok = guessNum === prod;
      if (ok) {
        cs.isCorrect = true;
        cs.totalCorrect++;
        fact.streak = Math.min(2, fact.streak + 1);
        if (hooks && hooks.onSaveMultFact) hooks.onSaveMultFact(fact.a, fact.b, fact.streak);
        if (hooks && hooks.onCorrect) hooks.onCorrect(5);
        cs.lastFlash = { ok: true, msg: `✅ ${qa} × ${qb} = ${prod} (${fact.streak}/2)` };
      } else {
        cs.isCorrect = false;
        fact.streak = 0;
        if (hooks && hooks.onWrong) hooks.onWrong();
        cs.lastFlash = { ok: false, msg: `💡 ${qa} × ${qb} = ${prod} — ${trick}` };
      }
      if (hooks && hooks.onRecordAttempt) {
        hooks.onRecordAttempt({
          multPair: [qa, qb],
          correct: ok,
          elapsedMs,
          mode: "mult_course",
          prompt: `${qa} × ${qb}`
        });
      }
      if (ok && cs.instantAdvance !== false) {
        advanceCourseRep();
        return;
      }
      renderMultCourseRunner(container, state, DATA, hooks);
    }

    const typeForm = document.getElementById("ml-mc-type-form");
    if (typeForm) {
      const inp = document.getElementById("ml-mc-type-inp");
      if (inp && !cs.checked && isFinePointer()) inp.focus();
      typeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (inp) gradeCourseAnswer(inp.value);
      });
      if (!cs.checked) {
        bindTouchNumpad(container, "mc", inp, () => {
          if (inp) gradeCourseAnswer(inp.value);
        });
      }
    }

    container.querySelectorAll("[data-mc-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        gradeCourseAnswer(btn.dataset.mcOpt);
      });
    });

    const nextBtn = document.getElementById("ml-mc-next");
    if (nextBtn) {
      if ((cs.inputMode === "type" || cs.checked) && isFinePointer()) nextBtn.focus();
      nextBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        advanceCourseRep();
      });
    }
  }

  const HARD15_PAIRS = [
    [6, 7], [6, 8], [6, 9], [6, 12],
    [7, 7], [7, 8], [7, 9], [7, 11], [7, 12],
    [8, 8], [8, 9], [8, 11], [8, 12],
    [9, 9], [12, 12]
  ];

  function buildMultBfPool(scope, state) {
    if (scope === "hard15") return HARD15_PAIRS.slice();
    if (scope === "all144") {
      const pairs = [];
      for (let a = 1; a <= 12; a++) {
        for (let b = a; b <= 12; b++) pairs.push([a, b]);
      }
      return pairs;
    }
    if (scope === "custom_tables") {
      const tables = bfConfig.customTables && bfConfig.customTables.length ? bfConfig.customTables : [7];
      const set = new Set(tables);
      const pairs = [];
      for (let a = 2; a <= 12; a++) {
        for (let b = a; b <= 12; b++) {
          if (set.has(a) || set.has(b)) pairs.push([a, b]);
        }
      }
      return pairs.length ? pairs : [[7, 8]];
    }
    // smart_weak: rank by error rate, slow latency, and unmastered status
    const tFacts = (state && state.telemetry && state.telemetry.multFacts) || {};
    const multMap = getMultMasteryMap(state);
    const ranked = [];
    for (let a = 2; a <= 12; a++) {
      for (let b = a; b <= 12; b++) {
        const k = pairKey(a, b);
        const tf = tFacts[k];
        const mLvl = multMap[k] || 0;
        let score = 0;
        if (tf && tf.attempts > 0) {
          score += (tf.wrong / tf.attempts) * 120 + Math.min(45, (tf.avgMs || 2500) / 180);
        } else {
          score += (a >= 6 && b >= 6) ? 65 : 25;
        }
        if (mLvl < 2) score += 35;
        ranked.push({ pair: [a, b], score });
      }
    }
    ranked.sort((x, y) => y.score - x.score);
    const top = ranked.slice(0, 15).map((r) => r.pair);
    return top.length ? top : HARD15_PAIRS.slice();
  }

  function pickNextMultBfPair(s, DATA, avoidKey) {
    for (let i = 0; i < s.retryQueue.length; i++) s.retryQueue[i].left--;
    const readyIdx = s.retryQueue.findIndex((item) => item.left <= 0);
    let chosen;
    let isRetry = false;
    if (readyIdx !== -1) {
      const item = s.retryQueue.splice(readyIdx, 1)[0];
      chosen = [item.a, item.b];
      isRetry = true;
    } else {
      let candidates = s.pool;
      if (candidates.length > 1 && avoidKey) {
        candidates = candidates.filter(([a, b]) => pairKey(a, b) !== avoidKey);
        if (candidates.length === 0) candidates = s.pool;
      }
      chosen = candidates[randInt(0, candidates.length - 1)];
    }
    const flip = chosen[0] !== chosen[1] && Math.random() < 0.5;
    const qa = flip ? chosen[1] : chosen[0];
    const qb = flip ? chosen[0] : chosen[1];
    s.current = {
      a: Math.min(chosen[0], chosen[1]),
      b: Math.max(chosen[0], chosen[1]),
      qa,
      qb,
      isRetry,
      trick: DATA.explainMultPair(qa, qb),
      options: buildMultChoices(qa, qb)
    };
    s.qStart = Date.now();
    s.checked = false;
    s.isCorrect = false;
    s.slowMiss = false;
    s.typedVal = "";
    s.lastElapsedMs = 0;
  }

  function startMultBruteforce(outerContainer, state, DATA, hooks) {
    stopBfClock();
    const pool = buildMultBfPool(bfConfig.scope, state);
    const goalNum = bfConfig.goal === "reflex15" ? 15 : parseInt(bfConfig.goal, 10);
    multBfSession = {
      pool,
      scope: bfConfig.scope,
      goalMode: bfConfig.goal,
      goalStreak: isNaN(goalNum) ? 15 : goalNum,
      inputMode: bfConfig.inputMode,
      instantAdvance: bfConfig.instantAdvance !== false,
      lastFlash: null,
      streak: 0,
      bestStreak: 0,
      attempts: 0,
      correctCount: 0,
      xpEarned: 0,
      speeds: [],
      retryQueue: [],
      current: null,
      qStart: Date.now(),
      checked: false,
      isCorrect: false,
      slowMiss: false,
      typedVal: "",
      lastElapsedMs: 0,
      done: false
    };
    pickNextMultBfPair(multBfSession, DATA, null);
    renderMultBruteforceRunner(outerContainer, state, DATA, hooks);
  }

  function renderMultBruteforceView(body, outerContainer, state, DATA, hooks) {
    const multMap = getMultMasteryMap(state);
    const stats = countMastered144(multMap);
    const smartPreview = buildMultBfPool("smart_weak", state).slice(0, 6);

    const scopes = [
      { id: "hard15", label: "🔥 Hard 15 (6×7..12×12)" },
      { id: "smart_weak", label: "🤖 Smart Tutor Weakest" },
      { id: "all144", label: "🌐 Full 144-Cell Grind" },
      { id: "custom_tables", label: "🎯 Custom Tables" }
    ];
    const goals = [
      { id: "15", label: "🔒 15-Streak Lock" },
      { id: "30", label: "🔥 30-Streak Boss" },
      { id: "reflex15", label: "⚡ Reflex (<3.5s × 15)" },
      { id: "0", label: "♾️ Pure Endless" }
    ];

    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-hero-kicker">INFINITE MUSCLE-MEMORY ENGINE • ${stats.mastered}/144 CELLS MASTERED</div>
        <h2 style="margin:4px 0 8px;">Multiplication Bruteforce Dojo</h2>
        <p class="ml-hero-desc" style="margin-bottom:14px;">
          Won't stick normally? Lock it in relentlessly. Every missed (or slow) fact pops back in <strong>+2</strong> and <strong>+5</strong> reps and forces you to type the answer alongside its visual trick before moving on.
        </p>

        <div class="ml-easy-box" style="margin-bottom:14px;">
          <div class="ml-mini-tag">🎯 Current Weakest Radar (Auto-Targeted in Smart Mode)</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:8px;">
            ${smartPreview.map(([a, b]) => `<span class="ml-x-chip">${a} × ${b} = ${a * b}</span>`).join("")}
          </div>
        </div>

        <div class="ml-micro-card" style="margin-bottom:12px;">
          <div class="ml-micro-label">1. Choose Fact Scope</div>
          <div class="ml-viz-tabs" style="margin-top:8px;">
            ${scopes.map((sc) => `
              <button type="button" class="ml-pill ${bfConfig.scope === sc.id ? "active" : ""}" data-mbf-scope="${sc.id}">${sc.label}</button>
            `).join("")}
          </div>
          ${bfConfig.scope === "custom_tables" ? `
            <div style="margin-top:10px;">
              <div class="ml-viz-sub" style="margin-bottom:6px;">Toggle which tables to include:</div>
              <div class="ml-viz-tabs">
                ${[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => `
                  <button type="button" class="ml-pill ${bfConfig.customTables.includes(n) ? "active" : ""}" data-mbf-tbl="${n}">×${n}</button>
                `).join("")}
              </div>
            </div>
          ` : ""}
        </div>

        <div class="ml-micro-card" style="margin-bottom:12px;">
          <div class="ml-micro-label">2. Bruteforce Lock Condition</div>
          <div class="ml-viz-tabs" style="margin-top:8px;">
            ${goals.map((g) => `
              <button type="button" class="ml-pill ${bfConfig.goal === g.id ? "active" : ""}" data-mbf-goal="${g.id}">${g.label}</button>
            `).join("")}
          </div>
        </div>

        <div class="ml-micro-card" style="margin-bottom:16px;">
          <div class="ml-micro-label">3. Answer Speed Mode</div>
          <div class="ml-viz-tabs" style="margin-top:8px;">
            <button type="button" class="ml-pill ${bfConfig.inputMode === "type" ? "active" : ""}" data-mbf-in="type">🧠 Fast Type (Strongest Recall)</button>
            <button type="button" class="ml-pill ${bfConfig.inputMode === "mc" ? "active" : ""}" data-mbf-in="mc">🎯 1–4 Keys Quick Choices</button>
          </div>
        </div>

        <button type="button" class="ml-btn-bruteforce big" id="ml-mbf-launch">
          🔨 Launch Multiplication Bruteforce →
        </button>
      </div>
    `;

    body.querySelectorAll("[data-mbf-scope]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        bfConfig.scope = btn.dataset.mbfScope;
        renderMultBruteforceView(body, outerContainer, state, DATA, hooks);
      });
    });

    body.querySelectorAll("[data-mbf-tbl]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        const tbl = parseInt(btn.dataset.mbfTbl, 10);
        const idx = bfConfig.customTables.indexOf(tbl);
        if (idx >= 0 && bfConfig.customTables.length > 1) bfConfig.customTables.splice(idx, 1);
        else if (idx < 0) bfConfig.customTables.push(tbl);
        renderMultBruteforceView(body, outerContainer, state, DATA, hooks);
      });
    });

    body.querySelectorAll("[data-mbf-goal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        bfConfig.goal = btn.dataset.mbfGoal;
        renderMultBruteforceView(body, outerContainer, state, DATA, hooks);
      });
    });

    body.querySelectorAll("[data-mbf-in]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        bfConfig.inputMode = btn.dataset.mbfIn;
        renderMultBruteforceView(body, outerContainer, state, DATA, hooks);
      });
    });

    document.getElementById("ml-mbf-launch").addEventListener("click", () => {
      if (hooks && hooks.onTap) hooks.onTap();
      startMultBruteforce(outerContainer, state, DATA, hooks);
    });
  }

  function renderMultBruteforceRunner(container, state, DATA, hooks) {
    const s = multBfSession;
    if (!s) return;
    stopBfClock();

    if (s.done) {
      const multMap = getMultMasteryMap(state);
      const stats = countMastered144(multMap);
      const acc = s.attempts > 0 ? Math.round((s.correctCount / s.attempts) * 100) : 100;
      const avgSec = s.speeds.length
        ? (s.speeds.reduce((a, b) => a + b, 0) / s.speeds.length / 1000).toFixed(2)
        : "0.00";

      container.innerHTML = `
        <div class="ml-mem-card" style="max-width:760px; margin:0 auto; text-align:center;">
          <div style="font-size:52px;">🔨👑</div>
          <h2>${s.goalStreak > 0 && s.streak >= s.goalStreak ? "Muscle Memory Locked In!" : "Bruteforce Progress Banked!"}</h2>
          <p class="ml-hero-desc">
            Best Streak: <strong>${s.bestStreak}</strong> • Accuracy: <strong>${acc}%</strong> (${s.correctCount}/${s.attempts}) • Avg Speed: <strong>${avgSec}s</strong> • +${s.xpEarned} XP
          </p>

          <div style="max-width:440px; margin:16px auto;">
            <div class="ml-mini-tag" style="margin-bottom:6px;">Updated 12×12 Mastery: ${stats.mastered} / 144 Cells (${stats.pct}%)</div>
            ${buildHeatmapHtml(multMap)}
          </div>

          <div class="ml-victory-actions" style="margin-top:18px;">
            <button type="button" class="ml-btn-secondary" id="ml-mbf-back-setup">⚙️ Setup / Change Scope</button>
            <button type="button" class="ml-btn-bruteforce" id="ml-mbf-again">🔁 Drill Another Round</button>
          </div>
        </div>
      `;

      document.getElementById("ml-mbf-back-setup").addEventListener("click", () => {
        multBfSession = null;
        renderMemorizeView(container, state, hooks);
      });
      document.getElementById("ml-mbf-again").addEventListener("click", () => {
        startMultBruteforce(container, state, DATA, hooks);
      });
      return;
    }

    const cur = s.current;
    const prod = cur.qa * cur.qb;
    const pct = s.goalStreak > 0
      ? Math.round((s.streak / s.goalStreak) * 100)
      : Math.min(100, Math.round((s.streak / 20) * 100));
    const avgSpeedTxt = s.speeds.length
      ? `${(s.speeds.reduce((a, b) => a + b, 0) / s.speeds.length / 1000).toFixed(1)}s avg`
      : "Warming up";

    let inputUi = "";
    if (s.inputMode === "type") {
      inputUi = `
        <form id="ml-mbf-type-form" class="ml-input-answer-wrap" style="margin-bottom:10px;">
          <input type="text" inputmode="numeric" pattern="[0-9]*" id="ml-mbf-type-inp" class="ml-answer-input ${s.checked ? (s.isCorrect && !s.slowMiss ? "correct" : "wrong") : ""}"
            placeholder="Type ${cur.qa} × ${cur.qb} & Enter..." value="${s.typedVal}" ${s.checked ? "disabled" : ""} autocomplete="off" />
          ${!s.checked ? `<button type="submit" class="ml-btn-primary big">Lock Answer ↵</button>` : ""}
        </form>
        ${!s.checked ? renderTouchNumpadHtml("mbf") : ""}
      `;
    } else {
      inputUi = `
        <div class="ml-options-grid" style="margin-bottom:14px;">
          ${cur.options.map((opt, idx) => {
            let cls = "ml-option-btn";
            if (s.checked) {
              if (opt === String(prod)) cls += " correct";
              else if (opt === s.typedVal && !s.isCorrect) cls += " wrong";
            }
            return `
              <button type="button" class="${cls}" data-mbf-opt="${opt}" ${s.checked ? "disabled" : ""}>
                <span class="ml-key-num">${idx + 1}</span>
                <span>${opt}</span>
              </button>
            `;
          }).join("")}
        </div>
      `;
    }

    let feedbackHtml = "";
    if (s.checked) {
      const secStr = (s.lastElapsedMs / 1000).toFixed(2);
      if (s.isCorrect && !s.slowMiss) {
        feedbackHtml = `
          <div class="ml-quiz-footer correct" style="border-radius:14px;">
            <div class="ml-fb-copy">
              <div class="ml-fb-title">✅ Locked in ${secStr}s! Streak: ${s.streak}${s.goalStreak ? "/" + s.goalStreak : ""} (+4 XP)</div>
              <div class="ml-fb-desc">${cur.trick}</div>
            </div>
            <button type="button" class="ml-btn-primary" id="ml-mbf-next">Next Rep →</button>
          </div>
        `;
      } else if (s.slowMiss) {
        feedbackHtml = `
          <div class="ml-quiz-footer wrong" style="border-radius:14px;">
            <div class="ml-fb-copy">
              <div class="ml-fb-title">🐢 ${cur.qa} × ${cur.qb} = ${prod} — ${secStr}s exceeded 3.50s limit!</div>
              <div class="ml-fb-desc">Streak reset & re-queued at +2/+5 reps. Trick: ${cur.trick}</div>
            </div>
            <button type="button" class="ml-btn-danger" id="ml-mbf-next">Retry Faster →</button>
          </div>
        `;
      } else {
        feedbackHtml = `
          <div class="ml-quiz-footer wrong" style="border-radius:14px; flex-wrap:wrap;">
            <div class="ml-fb-copy">
              <div class="ml-fb-title">💡 ${cur.qa} × ${cur.qb} = ${prod} — Queued at +2 & +5 reps!</div>
              <div class="ml-fb-desc">${cur.trick}</div>
            </div>
            <form id="ml-mbf-confirm-form" class="ml-input-answer-wrap" style="margin-top:8px; width:100%;">
              <input type="number" id="ml-mbf-confirm-inp" class="ml-answer-input" placeholder="🔒 Type ${prod} & Enter to burn it in..." autocomplete="off" />
              <button type="submit" class="ml-btn-danger big">Confirm & Continue →</button>
            </form>
          </div>
          <div style="margin-top:12px;">${renderDotVisualHtml(cur.qa, cur.qb)}</div>
        `;
      }
    }

    container.innerHTML = `
      <div class="ml-mem-card" style="max-width:740px; margin:0 auto;">
        <div class="ml-modal-top" style="padding:0 0 12px; margin-bottom:12px;">
          <button type="button" class="ml-close-btn" id="ml-mbf-quit">✕</button>
          <div class="ml-quiz-progress-track">
            <div class="ml-quiz-progress-fill" style="width:${Math.max(5, pct)}%"></div>
          </div>
          <div class="ml-quiz-badges">
            <span class="ml-combo-badge">🔥 ${s.streak}${s.goalStreak ? "/" + s.goalStreak : ""}</span>
            <span class="ml-heart-badge" id="ml-mbf-clock">⏱️ ${s.checked ? (s.lastElapsedMs / 1000).toFixed(1) : "0.0"}s</span>
          </div>
        </div>

        <div class="ml-quiz-meta">
          <span>Best: ${s.bestStreak} • ${avgSpeedTxt} • Queue: ${s.retryQueue.length}</span>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${s.attempts > 0 ? `<button type="button" class="ml-btn-mini" id="ml-mbf-finish">🏁 Bank (${s.correctCount}/${s.attempts})</button>` : ""}
            <button type="button" class="ml-btn-mini" id="ml-mbf-toggle-inst">${s.instantAdvance !== false ? "⚡ Instant: ON" : "⏸️ Pause Mode"}</button>
            <button type="button" class="ml-btn-mini" id="ml-mbf-toggle">${s.inputMode === "type" ? "4 Choices" : "Type Mode"}</button>
          </div>
        </div>

        ${s.lastFlash ? `<div class="ml-instant-toast ${s.lastFlash.ok ? "ok" : "nope"}">${s.lastFlash.msg}</div>` : ""}

        ${cur.isRetry ? `<div class="ml-easy-box" style="margin:8px 0; text-align:center;"><strong>🔁 Spaced Rescue Re-Drill!</strong> Prove ${cur.qa} × ${cur.qb} stuck!</div>` : ""}

        <div class="ml-mx-big-eq" style="text-align:center; font-size:46px; margin:16px 0 18px;">
          ${cur.qa} × ${cur.qb} = ?
        </div>

        ${inputUi}
        ${feedbackHtml}
      </div>
    `;

    if (!s.checked) {
      bfClockTimer = setInterval(() => {
        const el = document.getElementById("ml-mbf-clock");
        if (!el || !multBfSession || multBfSession.checked || multBfSession.done) {
          stopBfClock();
          return;
        }
        const sec = (Date.now() - s.qStart) / 1000;
        el.textContent = `⏱️ ${sec.toFixed(1)}s`;
      }, 150);
    }

    document.getElementById("ml-mbf-quit").addEventListener("click", () => {
      stopBfClock();
      multBfSession = null;
      renderMemorizeView(container, state, hooks);
    });

    const finBtn = document.getElementById("ml-mbf-finish");
    if (finBtn) {
      finBtn.addEventListener("click", () => {
        stopBfClock();
        s.done = true;
        renderMultBruteforceRunner(container, state, DATA, hooks);
      });
    }

    const mbfInstBtn = document.getElementById("ml-mbf-toggle-inst");
    if (mbfInstBtn) {
      mbfInstBtn.addEventListener("click", () => {
        s.instantAdvance = s.instantAdvance === false;
        bfConfig.instantAdvance = s.instantAdvance;
        renderMultBruteforceRunner(container, state, DATA, hooks);
      });
    }

    document.getElementById("ml-mbf-toggle").addEventListener("click", () => {
      s.inputMode = s.inputMode === "type" ? "mc" : "type";
      renderMultBruteforceRunner(container, state, DATA, hooks);
    });

    function advanceBfRep() {
      if (s.goalStreak > 0 && s.streak >= s.goalStreak) {
        s.done = true;
        renderMultBruteforceRunner(container, state, DATA, hooks);
        return;
      }
      pickNextMultBfPair(s, DATA, pairKey(cur.a, cur.b));
      renderMultBruteforceRunner(container, state, DATA, hooks);
    }

    function gradeBfAnswer(valStr) {
      if (s.checked || !String(valStr).trim()) return;
      stopBfClock();
      const elapsedMs = Math.max(200, Date.now() - s.qStart);
      const guessNum = parseInt(String(valStr).trim(), 10);
      const mathRight = guessNum === prod;
      const tooSlow = mathRight && s.goalMode === "reflex15" && elapsedMs > 3500;
      const cleanHit = mathRight && !tooSlow;

      s.checked = true;
      s.typedVal = String(valStr).trim();
      s.lastElapsedMs = elapsedMs;
      s.attempts++;
      s.speeds.push(elapsedMs);
      if (s.speeds.length > 30) s.speeds.shift();

      if (cleanHit) {
        s.isCorrect = true;
        s.slowMiss = false;
        s.correctCount++;
        s.streak++;
        if (s.streak > s.bestStreak) s.bestStreak = s.streak;
        s.xpEarned += 4;
        if (hooks && hooks.onSaveMultFact) hooks.onSaveMultFact(cur.a, cur.b, elapsedMs <= 4500 ? 2 : 1);
        if (hooks && hooks.onCorrect) hooks.onCorrect(4);
        s.lastFlash = {
          ok: true,
          msg: `✅ ${cur.qa} × ${cur.qb} = ${prod} (${(elapsedMs / 1000).toFixed(1)}s) • 🔥 Streak ${s.streak}`
        };
      } else {
        s.isCorrect = mathRight;
        s.slowMiss = tooSlow;
        s.streak = 0;
        if (tooSlow) s.correctCount++;
        s.retryQueue.push({ a: cur.a, b: cur.b, left: 2 }, { a: cur.a, b: cur.b, left: 5 });
        if (hooks && hooks.onWrong) hooks.onWrong();
        s.lastFlash = {
          ok: false,
          msg: tooSlow
            ? `🐢 ${cur.qa} × ${cur.qb} = ${prod} (${(elapsedMs / 1000).toFixed(1)}s > 3.5s) — Streak reset!`
            : `💡 ${cur.qa} × ${cur.qb} = ${prod} — ${cur.trick}`
        };
      }

      if (hooks && hooks.onRecordAttempt) {
        hooks.onRecordAttempt({
          multPair: [cur.qa, cur.qb],
          correct: cleanHit,
          elapsedMs,
          mode: "mult_bruteforce",
          prompt: `${cur.qa} × ${cur.qb}`
        });
      }

      if (cleanHit && s.instantAdvance !== false) {
        advanceBfRep();
        return;
      }

      renderMultBruteforceRunner(container, state, DATA, hooks);
    }

    const typeForm = document.getElementById("ml-mbf-type-form");
    if (typeForm) {
      const inp = document.getElementById("ml-mbf-type-inp");
      if (inp && !s.checked && isFinePointer()) inp.focus();
      typeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (inp) gradeBfAnswer(inp.value);
      });
      if (!s.checked) {
        bindTouchNumpad(container, "mbf", inp, () => {
          if (inp) gradeBfAnswer(inp.value);
        });
      }
    }

    container.querySelectorAll("[data-mbf-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        gradeBfAnswer(btn.dataset.mbfOpt);
      });
    });

    const nextBtn = document.getElementById("ml-mbf-next");
    if (nextBtn) {
      if (isFinePointer()) nextBtn.focus();
      nextBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        advanceBfRep();
      });
    }

    const confirmForm = document.getElementById("ml-mbf-confirm-form");
    if (confirmForm) {
      const cInp = document.getElementById("ml-mbf-confirm-inp");
      if (cInp) cInp.focus();
      confirmForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!cInp) return;
        if (parseInt(cInp.value.trim(), 10) === prod) {
          if (hooks && hooks.onTap) hooks.onTap();
          advanceBfRep();
        } else {
          cInp.classList.add("wrong");
          cInp.value = "";
          cInp.placeholder = `Must type ${prod} exact!`;
          cInp.focus();
        }
      });
    }
  }

  function renderMultMatrix(body, DATA, hooks, state, outerContainer) {
    const isQuiz = multFilter === "quiz";
    const rowMatch = multFilter.startsWith("row-") ? parseInt(multFilter.slice(4), 10) : null;
    const prod = multSelected.r * multSelected.c;
    const trick = DATA.explainMultPair(multSelected.r, multSelected.c);
    const multMap = getMultMasteryMap(state);

    let gridRows = "";
    for (let r = 1; r <= 12; r++) {
      let cells = `<th class="ml-mx-head">${r}</th>`;
      for (let c = 1; c <= 12; c++) {
        const val = r * c;
        const isSel = r === multSelected.r && c === multSelected.c;
        const isCross = r === multSelected.r || c === multSelected.c;
        const isSquare = r === c;
        const isHard = r >= 6 && r <= 9 && c >= 6 && c <= 9;
        let cls = "ml-mx-cell";
        if (isSel) cls += " sel";
        else if (isCross) cls += " cross";
        else if ((multMap[pairKey(r, c)] || 0) >= 2 && multFilter === "all") cls += " mastered";
        if (multFilter === "squares" && isSquare) cls += " focus";
        if (multFilter === "hard" && isHard) cls += " focus";
        if (rowMatch && (r === rowMatch || c === rowMatch)) cls += " focus";
        const label = isQuiz && !isSel ? "?" : String(val);
        cells += `<td><button type="button" class="${cls}" data-mx-r="${r}" data-mx-c="${c}">${label}</button></td>`;
      }
      gridRows += `<tr>${cells}</tr>`;
    }

    let colHeaders = `<th class="ml-mx-corner">×</th>`;
    for (let c = 1; c <= 12; c++) colHeaders += `<th class="ml-mx-head">${c}</th>`;

    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div class="ml-viz-tabs">
            <button type="button" class="ml-pill ${multFilter === "all" ? "active" : ""}" data-mxf="all">All 1–12</button>
            <button type="button" class="ml-pill ${multFilter === "hard" ? "active" : ""}" data-mxf="hard">🔥 Hard Core (6–9)</button>
            <button type="button" class="ml-pill ${multFilter === "squares" ? "active" : ""}" data-mxf="squares">🟦 Squares Diagonal</button>
            <button type="button" class="ml-pill ${multFilter === "quiz" ? "active" : ""}" data-mxf="quiz">🙈 Hide & Test</button>
            ${[2, 4, 6, 7, 8, 9].map((n) => `<button type="button" class="ml-pill ${multFilter === "row-" + n ? "active" : ""}" data-mxf="row-${n}">×${n}</button>`).join("")}
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="ml-btn-bruteforce-mini" id="ml-mx-bf-btn">🔨 Bruteforce ×</button>
            <button type="button" class="ml-btn-primary" id="ml-launch-mult-sprint">⚡ 45s Multiply Sprint →</button>
          </div>
        </div>

        <div class="ml-mx-layout">
          <div class="ml-mx-scroll">
            <table class="ml-mx-table">
              <thead><tr>${colHeaders}</tr></thead>
              <tbody>${gridRows}</tbody>
            </table>
          </div>

          <div class="ml-mx-inspector">
            <div class="ml-mini-tag">Selected Fact & Memory Hack</div>
            <div class="ml-mx-big-eq">${multSelected.r} × ${multSelected.c} = ${isQuiz ? "?" : prod}</div>
            ${isQuiz ? `
              <form id="ml-mx-quiz-form" class="ml-mx-quiz-form">
                <input type="number" id="ml-mx-quiz-inp" class="ml-search-input" style="min-width:0; width:100%;" placeholder="Type ${multSelected.r} × ${multSelected.c}..." value="${multQuizAnswer}" />
                <button type="submit" class="ml-btn-primary">Check</button>
              </form>
              ${multQuizFeedback ? `<div class="ml-trap-feedback ${multQuizFeedback.startsWith("✅") ? "ok" : "nope"}">${multQuizFeedback}</div>` : ""}
            ` : ""}
            <div class="ml-easy-box">
              <strong>🧠 Trick:</strong> ${trick}
            </div>
            <div class="ml-cheat-code-strip">
              <strong>Reverse ÷ Twins:</strong> ${prod} ÷ ${multSelected.r} = <strong>${multSelected.c}</strong> &nbsp;|&nbsp; ${prod} ÷ ${multSelected.c} = <strong>${multSelected.r}</strong>
            </div>
          </div>
        </div>
      </div>
    `;

    body.querySelectorAll("[data-mxf]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        multFilter = btn.dataset.mxf;
        multQuizFeedback = "";
        multQuizAnswer = "";
        renderMultMatrix(body, DATA, hooks, state, outerContainer);
      });
    });

    body.querySelectorAll("[data-mx-r]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        multSelected = { r: parseInt(btn.dataset.mxR, 10), c: parseInt(btn.dataset.mxC, 10) };
        multQuizFeedback = "";
        multQuizAnswer = "";
        renderMultMatrix(body, DATA, hooks, state, outerContainer);
      });
    });

    const qForm = document.getElementById("ml-mx-quiz-form");
    if (qForm) {
      qForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inp = document.getElementById("ml-mx-quiz-inp");
        const guess = parseInt(inp.value, 10);
        const qa = multSelected.r;
        const qb = multSelected.c;
        multQuizAnswer = inp.value;
        const ok = guess === prod;
        if (ok) {
          if (hooks && hooks.onCorrect) hooks.onCorrect(5);
          multQuizFeedback = `✅ Clean! ${qa} × ${qb} = ${prod}! (+5 XP)`;
          multSelected = { r: randInt(2, 12), c: randInt(2, 12) };
          multQuizAnswer = "";
        } else {
          if (hooks && hooks.onWrong) hooks.onWrong();
          multQuizFeedback = `💡 Not ${inp.value} — ${qa} × ${qb} = ${prod}!`;
        }
        if (hooks && hooks.onRecordAttempt) {
          hooks.onRecordAttempt({
            multPair: [qa, qb],
            correct: ok,
            elapsedMs: 2500,
            mode: "mult_matrix_quiz",
            prompt: `${qa} × ${qb}`
          });
        }
        renderMultMatrix(body, DATA, hooks, state, outerContainer);
      });
    }

    const mxBfBtn = document.getElementById("ml-mx-bf-btn");
    if (mxBfBtn) {
      mxBfBtn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        stopBfClock();
        activeSubTab = "multbf";
        multBfSession = null;
        if (outerContainer) renderMemorizeView(outerContainer, state, hooks);
        else if (hooks && hooks.onRerender) hooks.onRerender();
      });
    }

    document.getElementById("ml-launch-mult-sprint").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("mult");
    });
  }

  function renderDivisionTab(body, DATA, hooks) {
    function buildChecksHtml(val) {
      const n = Math.max(1, parseInt(val, 10) || 126);
      const digits = String(n).split("").map(Number);
      const dSum = digits.reduce((a, b) => a + b, 0);
      const checks = [
        { d: 2, ok: n % 2 === 0, why: `Last digit ${n % 10} is ${n % 2 === 0 ? "even" : "odd"}` },
        { d: 3, ok: n % 3 === 0, why: `Digit sum ${digits.join("+")} = ${dSum} (${n % 3 === 0 ? "÷3" : "not ÷3"})` },
        { d: 4, ok: n % 4 === 0, why: `Last 2 digits (${n % 100}) ${n % 4 === 0 ? "divide by 4" : "don't ÷4"}` },
        { d: 5, ok: n % 5 === 0, why: `Ends in ${n % 10} (needs 0 or 5)` },
        { d: 6, ok: n % 6 === 0, why: `Needs BOTH ÷2 (${n % 2 === 0 ? "yes" : "no"}) & ÷3 (${n % 3 === 0 ? "yes" : "no"})` },
        { d: 8, ok: n % 8 === 0, why: `${n} ÷ 8 = ${n % 8 === 0 ? n / 8 + " (exact!)" : "remainder " + (n % 8)}` },
        { d: 9, ok: n % 9 === 0, why: `Digit sum ${dSum} (${n % 9 === 0 ? "÷9" : "not ÷9"})` },
        { d: 10, ok: n % 10 === 0, why: `Ends in ${n % 10} (needs 0)` }
      ];
      return checks.map((c) => `
        <div class="ml-div-chip ${c.ok ? "ok" : "no"}">
          <div class="ml-div-chip-top">
            <strong>÷ ${c.d}</strong>
            <span>${c.ok ? `✓ Yes (${n / c.d})` : "✗ No"}</span>
          </div>
          <div class="ml-div-chip-why">${c.why}</div>
        </div>
      `).join("");
    }

    const startN = Math.max(1, parseInt(divInputVal, 10) || 126);
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">➗ Live Divisibility Radar</h3>
            <p class="ml-viz-sub" style="margin:0;">Type ANY number to see which divisors snap into it cleanly & WHY!</p>
          </div>
          <button type="button" class="ml-btn-primary" id="ml-launch-div-sprint">45s Division Sprint →</button>
        </div>

        <div class="ml-div-input-row">
          <input type="number" id="ml-div-tester" class="ml-search-input" value="${startN}" min="1" max="999999" />
          <button type="button" class="ml-btn-secondary" id="ml-div-random">🎲 Random Number</button>
        </div>

        <div class="ml-div-checks-grid" id="ml-div-checks-wrap">
          ${buildChecksHtml(startN)}
        </div>

        <h3 style="margin:18px 0 10px;">The 7 Divisibility Cheat Rules</h3>
        <div class="ml-rules-grid">
          ${DATA.MEMORIZE_DATA.divRules.map((r) => `
            <div class="ml-micro-card">
              <div class="ml-micro-label">${r.divisor}</div>
              <p><strong>${r.rule}</strong></p>
              <p class="ml-viz-sub" style="margin-top:4px;">${r.example}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    const inp = document.getElementById("ml-div-tester");
    const wrap = document.getElementById("ml-div-checks-wrap");
    inp.addEventListener("input", () => {
      divInputVal = inp.value;
      if (wrap) wrap.innerHTML = buildChecksHtml(inp.value);
    });
    document.getElementById("ml-div-random").addEventListener("click", () => {
      divInputVal = String(randInt(12, 999));
      inp.value = divInputVal;
      if (wrap) wrap.innerHTML = buildChecksHtml(divInputVal);
    });
    document.getElementById("ml-launch-div-sprint").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("div");
    });
  }

  function renderRootsTab(body, DATA, hooks) {
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div class="ml-viz-tabs">
            <button type="button" class="ml-pill ${!hideRoots ? "active" : ""}" id="ml-roots-show">👀 Show Answers</button>
            <button type="button" class="ml-pill ${hideRoots ? "active" : ""}" id="ml-roots-hide">🙈 Tap-to-Reveal Self Test</button>
          </div>
          <button type="button" class="ml-btn-primary" id="ml-launch-roots-sprint">⚡ 45s Roots & Squares Sprint →</button>
        </div>

        <h3 style="margin:6px 0 10px;">√ Perfect Squares & Square Roots (1² to 15²)</h3>
        <div class="ml-flip-grid">
          ${DATA.MEMORIZE_DATA.squares1to15.map((item) => {
            const key = `sq-${item.n}`;
            const revealed = !hideRoots || !!flippedCards[key];
            return `
              <button type="button" class="ml-flip-card ${revealed ? "open" : ""}" data-flip="${key}">
                <div class="ml-flip-q">${item.n}²  &  √${item.sq}</div>
                <div class="ml-flip-a">${revealed ? `${item.sq}  |  √=${item.n}` : "Tap to peek"}</div>
              </button>
            `;
          }).join("")}
        </div>

        <div class="ml-two-col-mem">
          <div>
            <h3 style="margin:18px 0 10px;">🧊 Perfect Cubes (1³ to 6³)</h3>
            <div class="ml-flip-grid compact">
              ${DATA.MEMORIZE_DATA.cubes1to6.map((item) => {
                const key = `cu-${item.n}`;
                const revealed = !hideRoots || !!flippedCards[key];
                return `
                  <button type="button" class="ml-flip-card ${revealed ? "open" : ""}" data-flip="${key}">
                    <div class="ml-flip-q">${item.n}³ & ∛${item.cu}</div>
                    <div class="ml-flip-a">${revealed ? `${item.cu} | ∛=${item.n}` : "?"}</div>
                  </button>
                `;
              }).join("")}
            </div>
          </div>

          <div>
            <h3 style="margin:18px 0 10px;">🚀 Powers of 2 (2¹ to 2¹⁰ — Logs & CS!)</h3>
            <div class="ml-flip-grid compact">
              ${DATA.MEMORIZE_DATA.powersOf2.map((item) => {
                const key = `p2-${item.exp}`;
                const revealed = !hideRoots || !!flippedCards[key];
                return `
                  <button type="button" class="ml-flip-card ${revealed ? "open" : ""}" data-flip="${key}">
                    <div class="ml-flip-q">2^${item.exp} / log₂(${item.val})</div>
                    <div class="ml-flip-a">${revealed ? `${item.val} | log=${item.exp}` : "?"}</div>
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("ml-roots-show").addEventListener("click", () => {
      hideRoots = false;
      flippedCards = {};
      renderRootsTab(body, DATA, hooks);
    });
    document.getElementById("ml-roots-hide").addEventListener("click", () => {
      hideRoots = true;
      flippedCards = {};
      renderRootsTab(body, DATA, hooks);
    });
    body.querySelectorAll("[data-flip]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        const k = btn.dataset.flip;
        flippedCards[k] = !flippedCards[k];
        renderRootsTab(body, DATA, hooks);
      });
    });
    document.getElementById("ml-launch-roots-sprint").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("roots");
    });
  }

  function renderPatternsTab(body, DATA, VIZ, hooks) {
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">🔢 2, 4, 6, 8... | Odd & Even | 25 Primes Under 100</h3>
            <p class="ml-viz-sub" style="margin:0;">Click any pattern filter on the 1–100 board or click any number to see its prime DNA!</p>
          </div>
          <button type="button" class="ml-btn-primary" id="ml-launch-pat-sprint">⚡ 45s Pattern & Prime Sprint →</button>
        </div>

        <div id="ml-mem-sieve-mount" style="margin-bottom:16px;"></div>

        <div class="ml-rules-grid">
          <div class="ml-micro-card">
            <div class="ml-micro-label">👯 Even & Odd Cheat Rules</div>
            <p><strong>Even ends in 0, 2, 4, 6, 8.</strong> Odd ends in 1, 3, 5, 7, 9.</p>
            <p style="margin-top:4px;">Even + Even = Even | <strong>Odd + Odd = Even!</strong> | Even × Anything = Even</p>
          </div>
          <div class="ml-micro-card">
            <div class="ml-micro-label">🚀 Skip-Count Anchors</div>
            <p><strong>×2:</strong> 2, 4, 6, 8, 10, 12, 14, 16, 18, 20</p>
            <p><strong>×4:</strong> 4, 8, 12, 16, 20, 24, 28, 32, 36, 40</p>
            <p><strong>×6:</strong> 6, 12, 18, 24, 30, 36, 42, 48, 54, 60</p>
            <p><strong>×8:</strong> 8, 16, 24, 32, 40, 48, 56, 64, 72, 80</p>
          </div>
          <div class="ml-micro-card">
            <div class="ml-micro-label">🧬 First 25 Primes (Under 100)</div>
            <p style="font-family:var(--ml-font-mono, monospace); font-weight:700;">
              ${DATA.MEMORIZE_DATA.primesUnder100.join(", ")}
            </p>
            <p class="ml-viz-sub" style="margin-top:4px;">Note: <strong>1 is NOT prime</strong>, and <strong>2 is the ONLY even prime</strong>!</p>
          </div>
        </div>
      </div>
    `;

    VIZ.mountVisualizer("numberPatternSieve", document.getElementById("ml-mem-sieve-mount"));
    document.getElementById("ml-launch-pat-sprint").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("even-prime");
    });
  }

  function renderTrigLogTab(body, DATA, hooks) {
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">🎡 The 5-Finger Special Angles & Logarithm Anchors</h3>
            <p class="ml-viz-sub" style="margin:0;">sin goes √0/2, √1/2, √2/2, √3/2, √4/2! cos is the exact same list backwards!</p>
          </div>
          <button type="button" class="ml-btn-primary" id="ml-launch-trig-sprint">⚡ 45s Trig & Logs Sprint →</button>
        </div>

        <div class="ml-mx-scroll">
          <table class="ml-trig-table">
            <thead>
              <tr><th>Angle (°)</th><th>Radians (π)</th><th>sin(θ) = Y</th><th>cos(θ) = X</th><th>tan(θ) = Slope</th></tr>
            </thead>
            <tbody>
              ${DATA.MEMORIZE_DATA.trigTable.map((row) => `
                <tr>
                  <td><strong>${row.deg}</strong></td>
                  <td><code>${row.rad}</code></td>
                  <td class="ml-highlight-green">${row.sin}</td>
                  <td class="ml-highlight-blue">${row.cos}</td>
                  <td>${row.tan}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="ml-rules-grid" style="margin-top:16px;">
          <div class="ml-micro-card">
            <div class="ml-micro-label">🔓 Log Quick Anchors</div>
            <p>log_b(1) = <strong>0</strong> &nbsp;|&nbsp; log_b(b) = <strong>1</strong> &nbsp;|&nbsp; ln(eˣ) = <strong>x</strong></p>
            <p style="margin-top:4px;">log₂(8) = 3, log₂(32) = 5, log₁₀(1000) = 3</p>
          </div>
          <div class="ml-micro-card">
            <div class="ml-micro-label">🍕 Instant Radians (180° = π)</div>
            <p>180°÷6 = <strong>30° (π/6)</strong> &nbsp;|&nbsp; 180°÷4 = <strong>45° (π/4)</strong></p>
            <p style="margin-top:4px;">180°÷3 = <strong>60° (π/3)</strong> &nbsp;|&nbsp; 180°÷2 = <strong>90° (π/2)</strong></p>
          </div>
        </div>
      </div>
    `;

    document.getElementById("ml-launch-trig-sprint").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("trig-log");
    });
  }

  let hideElements = false;
  function renderElementsTab(body, DATA, hooks) {
    const els = DATA.MEMORIZE_DATA.elements20 || [];
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div class="ml-viz-tabs">
            <button type="button" class="ml-pill ${!hideElements ? "active" : ""}" id="ml-el-show">👀 Show Symbols & Valence</button>
            <button type="button" class="ml-pill ${hideElements ? "active" : ""}" id="ml-el-hide">🙈 Tap-to-Reveal Self Test</button>
          </div>
          <button type="button" class="ml-btn-primary" id="ml-launch-chem-sprint">⚡ 45s Chemistry Sprint →</button>
        </div>

        <h3 style="margin:6px 0 12px;">🧪 First 20 Elements (H #1 → Ca #20)</h3>
        <div class="ml-flip-grid">
          ${els.map((elItem) => {
            const key = `el-${elItem.z}`;
            const open = !hideElements || !!flippedCards[key];
            return `
              <button type="button" class="ml-flip-card ${open ? "open" : ""}" data-flip-el="${key}">
                <div class="ml-flip-q">#${elItem.z} • ${elItem.name}</div>
                <div class="ml-flip-a">${open ? `${elItem.sym} (Valence ${elItem.val} • ${elItem.kind})` : "Tap to reveal"}</div>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;

    document.getElementById("ml-el-show").addEventListener("click", () => {
      hideElements = false; flippedCards = {}; renderElementsTab(body, DATA, hooks);
    });
    document.getElementById("ml-el-hide").addEventListener("click", () => {
      hideElements = true; flippedCards = {}; renderElementsTab(body, DATA, hooks);
    });
    body.querySelectorAll("[data-flip-el]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        flippedCards[btn.dataset.flipEl] = !flippedCards[btn.dataset.flipEl];
        renderElementsTab(body, DATA, hooks);
      });
    });
    document.getElementById("ml-launch-chem-sprint").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("chem-blitz");
    });
  }

  function renderScienceFormulasTab(body, DATA, hooks) {
    const forms = DATA.MEMORIZE_DATA.scienceFormulas || [];
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">⚛️ Core Physics, Chemistry & Biology Formulas</h3>
            <p class="ml-viz-sub" style="margin:0;">Every high-impact STEM equation decoded in one line.</p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="ml-btn-secondary" id="ml-sf-ph">⚛️ Physics Sprint</button>
            <button type="button" class="ml-btn-secondary" id="ml-sf-bi">🧬 Bio Sprint</button>
          </div>
        </div>

        <div class="ml-rules-grid">
          ${forms.map((f) => `
            <div class="ml-micro-card">
              <div class="ml-micro-label">${f.subject || f.name || "Formula"}</div>
              <div style="font-size:17px; font-weight:800; margin-bottom:6px;">${fmtMath(f.eq || f.formula || "")}</div>
              <p class="ml-viz-sub">${fmtMath(f.meaning || f.desc || "")}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("ml-sf-ph").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("physics-blitz");
    });
    document.getElementById("ml-sf-bi").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("bio-blitz");
    });
  }

  function renderAiAndLawsTab(body, DATA, hooks) {
    const aiCards = DATA.MEMORIZE_DATA.aiCards || [];
    const lawCards = DATA.MEMORIZE_DATA.physicsLawsCards || [];
    body.innerHTML = `
      <div class="ml-mem-card" style="margin-bottom:16px;">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">🤖 How AI Works — Core Mental Models</h3>
            <p class="ml-viz-sub" style="margin:0;">Neurons, Backprop, Overfitting, Tokens, Transformers, Sampling, RAG & Agents.</p>
          </div>
          <button type="button" class="ml-btn-primary" id="ml-mem-ai-sp">⚡ 45s AI & LLM Sprint →</button>
        </div>
        <div class="ml-rules-grid">
          ${aiCards.map((c) => `
            <div class="ml-micro-card">
              <div class="ml-micro-label">${c.cat}</div>
              <div style="font-size:15.5px; font-weight:800; margin-bottom:6px;">${fmtMath(c.term)}</div>
              <p class="ml-viz-sub">${fmtMath(c.meaning)}</p>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">🌌 Universal Physics Laws Reference</h3>
            <p class="ml-viz-sub" style="margin:0;">Gravitation, Kepler, Rotational Inertia, SHM, Sound, 4 Laws of Thermo, Faraday, Maxwell & Quantum.</p>
          </div>
          <button type="button" class="ml-btn-secondary" id="ml-mem-pl-sp">⚛️ Physics Sprint →</button>
        </div>
        <div class="ml-rules-grid">
          ${lawCards.map((c) => `
            <div class="ml-micro-card">
              <div class="ml-micro-label">${c.law}</div>
              <div style="font-size:16px; font-weight:800; margin-bottom:6px;">${fmtMath(c.eq)}</div>
              <p class="ml-viz-sub">${fmtMath(c.key)}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    document.getElementById("ml-mem-ai-sp").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("ai-ml-blitz");
    });
    document.getElementById("ml-mem-pl-sp").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("physics-blitz");
    });
  }

  let codingCardFilter = "all";
  function renderCodingCardsTab(body, DATA, hooks) {
    const cards = DATA.MEMORIZE_DATA.codingCards || [];
    const cats = [
      { id: "all", label: `All (${cards.length})` },
      { id: "dsa", label: "🧩 DSA" },
      { id: "sql", label: "🗄️ SQL & Backend" },
      { id: "js", label: "⚡ JS / TS / Clean" },
      { id: "web", label: "💻 HTML/CSS/Py" }
    ];
    const shown = cards.filter((c) => {
      if (codingCardFilter === "all") return true;
      const cat = String(c.cat || "").toLowerCase();
      if (codingCardFilter === "dsa") return cat.includes("dsa") || cat.includes("big-o");
      if (codingCardFilter === "sql") return cat.includes("sql") || cat.includes("backend") || cat.includes("linux") || cat.includes("git") || cat.includes("system") || cat.includes("http") || cat.includes("security");
      if (codingCardFilter === "js") return cat.includes("js") || cat.includes("typescript") || cat.includes("clean");
      return !cat.includes("dsa") && !cat.includes("sql") && !cat.includes("backend") && !cat.includes("linux") && !cat.includes("git") && !cat.includes("system") && !cat.includes("typescript") && !cat.includes("clean");
    });
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">💻 Full-Stack Coding, DSA, SQL, Backend & TS Cheat Deck (${cards.length} Cards)</h3>
            <p class="ml-viz-sub" style="margin:0;">Every high-frequency syntax pattern, Big-O law, SQL execution rule, HTTP status code, Git workflow & JS/TS idiom.</p>
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button type="button" class="ml-btn-secondary" id="ml-mem-dsa-sp">🧩 DSA Blitz</button>
            <button type="button" class="ml-btn-secondary" id="ml-mem-sql-sp">🗄️ SQL/Backend</button>
            <button type="button" class="ml-btn-secondary" id="ml-mem-js-sp">⚡ JS/TS</button>
            <button type="button" class="ml-btn-primary" id="ml-mem-py-sp">🐍 Python/Tech</button>
          </div>
        </div>
        <div class="ml-viz-tabs" style="margin:12px 0;">
          ${cats.map((ct) => `<button type="button" class="ml-pill ${codingCardFilter === ct.id ? "active" : ""}" data-cc-flt="${ct.id}">${ct.label}</button>`).join("")}
        </div>
        <div class="ml-rules-grid">
          ${shown.map((c) => `
            <div class="ml-micro-card">
              <div class="ml-micro-label">${c.cat}</div>
              <div style="font-family:var(--ml-font-mono); font-size:13px; font-weight:700; margin-bottom:6px; color:var(--ml-primary);">${fmtMath("`" + c.syntax + "`")}</div>
              <p class="ml-viz-sub">${fmtMath(c.meaning)}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    body.querySelectorAll("[data-cc-flt]").forEach((b) => {
      b.addEventListener("click", () => {
        codingCardFilter = b.dataset.ccFlt;
        renderCodingCardsTab(body, DATA, hooks);
      });
    });
    document.getElementById("ml-mem-dsa-sp").addEventListener("click", () => { if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("dsa-bigo-blitz"); });
    document.getElementById("ml-mem-sql-sp").addEventListener("click", () => { if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("sql-backend-blitz"); });
    document.getElementById("ml-mem-js-sp").addEventListener("click", () => { if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("js-ts-async-blitz"); });
    document.getElementById("ml-mem-py-sp").addEventListener("click", () => { if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("python-tech-blitz"); });
  }

  function renderPhHistoryCardsTab(body, DATA, hooks) {
    const cards = DATA.MEMORIZE_DATA.phHistoryCards || [];
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">🇵🇭 Philippine History Timeline & 1987 Civics Vault</h3>
            <p class="ml-viz-sub" style="margin:0;">Anchor every major date from 900 CE Laguna Copperplate through EDSA, 3 Branches, Bill of Rights & ASEAN.</p>
          </div>
          <button type="button" class="ml-btn-primary" id="ml-mem-ph-sp">⚡ 45s PH History Sprint →</button>
        </div>
        <div class="ml-rules-grid">
          ${cards.map((c) => `
            <div class="ml-micro-card">
              <div class="ml-micro-label">${c.era}</div>
              <div style="font-size:15.5px; font-weight:800; margin-bottom:6px;">${c.title}</div>
              <p class="ml-viz-sub">${c.detail}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    document.getElementById("ml-mem-ph-sp").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("ph-history-blitz");
    });
  }

  function speakWord(text, lang) {
    try {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text || "").replace(/[`*]/g, ""));
      u.lang = lang || "fil-PH";
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    } catch (_e) {
      // Offline graceful fallback
    }
  }

  function renderFilipinoCardsTab(body, DATA, hooks) {
    const cards = DATA.MEMORIZE_DATA.filipinoCards || [];
    const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">📜 Filipino: Diin, Wastong Gamit, Tayutay & Panitikan</h3>
            <p class="ml-viz-sub" style="margin:0;">Mga pangunahing tuntunin sa UPCAT, CET, Civil Service, at SHS Pagbasa at Pagsusuri.</p>
          </div>
          <button type="button" class="ml-btn-primary" id="ml-mem-fil-sp">⚡ 45s Filipino Sprint →</button>
        </div>
        <div class="ml-rules-grid">
          ${cards.map((c, i) => `
            <div class="ml-micro-card">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
                <div class="ml-micro-label">${c.cat}</div>
                ${canSpeak ? `<button type="button" class="ml-btn-mini" data-speak-fil="${i}" title="Hear pronunciation">🔊</button>` : ""}
              </div>
              <div style="font-size:15.5px; font-weight:800; margin-bottom:6px;">${c.front}</div>
              <p class="ml-viz-sub">${c.back}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    document.getElementById("ml-mem-fil-sp").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("filipino-wika-blitz");
    });
    body.querySelectorAll("[data-speak-fil]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = cards[parseInt(btn.dataset.speakFil, 10)];
        if (card) speakWord(card.front, "fil-PH");
      });
    });
  }

  function renderEarthEconPhilCardsTab(body, DATA, hooks) {
    const cards = DATA.MEMORIZE_DATA.earthEconPhilCards || [];
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">🌍 Earth Science, Economics, PH Finance & Critical Thinking Vault</h3>
            <p class="ml-viz-sub" style="margin:0;">High-yield geoscience, Supply/Demand, TRAIN/MP2, logical fallacies, biases & SM-2 memory laws.</p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="ml-btn-secondary" id="ml-mem-earth-sp">🌍 Earth Sprint</button>
            <button type="button" class="ml-btn-secondary" id="ml-mem-econ-sp">📊 Econ Sprint</button>
            <button type="button" class="ml-btn-primary" id="ml-mem-phil-sp">🦉 Fallacy Sprint →</button>
          </div>
        </div>
        <div class="ml-rules-grid">
          ${cards.map((c) => `
            <div class="ml-micro-card">
              <div class="ml-micro-label">${c.cat}</div>
              <div style="font-size:15.5px; font-weight:800; margin-bottom:6px;">${fmtMath(c.front)}</div>
              <p class="ml-viz-sub">${fmtMath(c.back)}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    document.getElementById("ml-mem-earth-sp").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("earth-blitz");
    });
    document.getElementById("ml-mem-econ-sp").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("econ-blitz");
    });
    document.getElementById("ml-mem-phil-sp").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("phil-blitz");
    });
  }

  function renderExamPrepCardsTab(body, DATA, hooks) {
    const cards = DATA.MEMORIZE_DATA.examPrepCards || [];
    body.innerHTML = `
      <div class="ml-mem-card">
        <div class="ml-mem-toolbar">
          <div>
            <h3 style="margin:0;">🎯 PH Competitive Exams Cheat Vault (DOST, UPCAT, CSE & NMAT)</h3>
            <p class="ml-viz-sub" style="margin:0;">High-yield pulleys/gears, star evolution, UPCAT R − ¼W, Work/Mixture shortcuts, RA 6713 & NMAT Perceptual/Psych rules.</p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="ml-btn-secondary" id="ml-mem-dost-sp">🔬 DOST Sprint</button>
            <button type="button" class="ml-btn-secondary" id="ml-mem-cse-sp">🏛️ CSE Sprint</button>
            <button type="button" class="ml-btn-primary" id="ml-mem-nmat-sp">🩺 NMAT Sprint →</button>
          </div>
        </div>
        <div class="ml-rules-grid">
          ${cards.map((c) => `
            <div class="ml-micro-card">
              <div class="ml-micro-label">${c.cat}</div>
              <div style="font-size:15.5px; font-weight:800; margin-bottom:6px;">${fmtMath(c.front)}</div>
              <p class="ml-viz-sub">${fmtMath(c.back)}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    document.getElementById("ml-mem-dost-sp").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("dost-mech-sci-blitz");
    });
    document.getElementById("ml-mem-cse-sp").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("cse-civics-series-blitz");
    });
    document.getElementById("ml-mem-nmat-sp").addEventListener("click", () => {
      if (hooks && hooks.onLaunchSprint) hooks.onLaunchSprint("nmat-psych-perceptual-blitz");
    });
  }

  // ==================== SPEED GYM & DIAGNOSTIC VIEW ====================
  let diagSession = null;
  let sprintSession = null;
  let sprintInterval = null;

  function stopSprintTimer() {
    if (sprintInterval) {
      clearInterval(sprintInterval);
      sprintInterval = null;
    }
  }

  function renderGymView(container, state, hooks) {
    const DATA = root.MATHLINGO_DATA;

    if (diagSession) {
      renderDiagnosticModal(container, DATA, hooks);
      return;
    }
    if (sprintSession) {
      renderSprintRunner(container, state, hooks);
      return;
    }

    container.innerHTML = `
      <div class="ml-hero-banner" style="margin-bottom:20px;">
        <div class="ml-hero-left">
          <div class="ml-hero-kicker">CROSS-SUBJECT ROOT-CAUSE SCANNER</div>
          <h2 class="ml-hero-title">${DATA.DIAGNOSTIC_QUESTIONS.length}-Question "Find My Hidden Cracks" Scan</h2>
          <p class="ml-hero-desc">
            Pinpoint exact knowledge gaps across Math, Physics Laws, Chem, Bio, AI, HTML/CSS, Python, PH History, Filipino & Abstract Shapes in one unified scan.
          </p>
          ${state.diagnosticSummary ? `
            <div class="ml-easy-box" style="margin-bottom:12px;">
              <strong>Last Scan Result:</strong> ${state.diagnosticSummary}
              ${state.diagnosticCracks && state.diagnosticCracks.length > 0 ? `
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
                  ${state.diagnosticCracks.map((c) => `<button type="button" class="ml-btn-mini" data-patch-node="${c.nodeId}">Patch ${c.title}</button>`).join("")}
                </div>
              ` : (state.diagnosticNodeId ? `<button type="button" class="ml-btn-mini" style="margin-left:8px;" data-patch-node="${state.diagnosticNodeId}">Patch Now →</button>` : "")}
            </div>
          ` : ""}
          <button type="button" class="ml-btn-primary" id="ml-start-diag-btn">Start ${DATA.DIAGNOSTIC_QUESTIONS.length}-Question Scan →</button>
        </div>
        <div class="ml-hero-right">
          <div class="ml-rec-label">Why 45-Second Sprints Work</div>
          <div class="ml-rec-title">Reflex Beats Memorization</div>
          <div class="ml-rec-sub">When times tables, ReLU, binary, Ng/Nang, PH dates & physics laws become 1-second reflexes, your working memory stays free for hard multi-step problems.</div>
        </div>
      </div>

      <div class="ml-section-banner">
        <div>
          <h2>45-Second Speed Gym (${GYM_MODES.length} Reflex Sprints)</h2>
          <p>Race the clock across Math, STEM, AI, Coding, PH History, Filipino & Abstract Shapes — beat your Personal Best.</p>
        </div>
      </div>

      <div class="ml-gym-grid">
        ${GYM_MODES.map((m) => {
          const pb = (state.gymBest && state.gymBest[m.id]) || 0;
          return `
            <article class="ml-node-card" style="--world-color:${m.color}; --world-dark:${m.color}; --world-soft:color-mix(in srgb, ${m.color} 12%, transparent);">
              <div class="ml-node-top">
                <div class="ml-node-icon-ring">${m.icon}</div>
                <span class="ml-node-stage-pill ${pb > 0 ? "level-2" : ""}">${pb > 0 ? `PB: ${pb}` : "45s"}</span>
              </div>
              <h3 class="ml-node-title">${m.title}</h3>
              <p class="ml-node-tagline">${m.desc}</p>
              <button type="button" class="ml-btn-node" data-start-sprint="${m.id}">Start 45s Sprint →</button>
            </article>
          `;
        }).join("")}
      </div>
    `;

    document.getElementById("ml-start-diag-btn").addEventListener("click", () => {
      if (hooks && hooks.onTap) hooks.onTap();
      diagSession = { idx: 0, answers: [], result: null };
      renderGymView(container, state, hooks);
    });

    container.querySelectorAll("[data-patch-node]").forEach((patchBtn) => {
      patchBtn.addEventListener("click", () => {
        if (hooks && hooks.onLaunchNode) hooks.onLaunchNode(patchBtn.dataset.patchNode);
      });
    });

    container.querySelectorAll("[data-start-sprint]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (hooks && hooks.onTap) hooks.onTap();
        startSprint(btn.dataset.startSprint, container, state, hooks);
      });
    });
  }

  function renderDiagnosticModal(container, DATA, hooks) {
    const totalDiag = DATA.DIAGNOSTIC_QUESTIONS.length;
    if (diagSession.result) {
      const r = diagSession.result;
      container.innerHTML = `
        <div class="ml-mem-card" style="text-align:center; padding:28px;">
          <div style="font-size:48px;">${r.score === totalDiag ? "👑" : "🛠️"}</div>
          <h2>Scan Complete: ${r.score} / ${totalDiag} Clean!</h2>
          <p class="ml-hero-desc" style="max-width:600px; margin:8px auto 14px;">${r.summary}</p>
          ${r.cracks && r.cracks.length > 0 ? `
            <div class="ml-crack-list" style="text-align:left; margin:14px auto; max-width:620px;">
              <div class="ml-mini-tag" style="margin-bottom:8px;">🛠️ Full Diagnostic Crack Checklist (${r.cracks.length} Detected)</div>
              ${r.cracks.map((c) => `
                <div class="ml-root-alert" style="margin-bottom:8px;">
                  <div>
                    <strong>${c.icon} ${c.topicLabel}</strong> → ${c.title}
                    <div class="ml-viz-sub">${c.whyItMatters}</div>
                  </div>
                  <button type="button" class="ml-btn-mini" data-diag-patch="${c.nodeId}">Patch →</button>
                </div>
              `).join("")}
            </div>
          ` : ""}
          <div class="ml-victory-actions">
            <button type="button" class="ml-btn-secondary" id="ml-diag-close">Back to Gym</button>
            ${r.cracks && r.cracks.length > 1 ? `<button type="button" class="ml-btn-secondary" id="ml-diag-queue-all">🛠️ Queue All ${r.cracks.length} Cracks into Repair Lab</button>` : ""}
            <button type="button" class="ml-btn-primary" id="ml-diag-jump">Patch "${r.targetTitle}" Now →</button>
          </div>
        </div>
      `;
      document.getElementById("ml-diag-close").addEventListener("click", () => {
        diagSession = null;
        if (hooks && hooks.onRerender) hooks.onRerender();
      });
      container.querySelectorAll("[data-diag-patch]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const nid = btn.dataset.diagPatch;
          diagSession = null;
          if (hooks && hooks.onLaunchNode) hooks.onLaunchNode(nid);
        });
      });
      const qAllBtn = document.getElementById("ml-diag-queue-all");
      if (qAllBtn) {
        qAllBtn.addEventListener("click", () => {
          const cracksCopy = r.cracks || [];
          diagSession = null;
          if (hooks && hooks.onQueueAllCracks) hooks.onQueueAllCracks(cracksCopy);
        });
      }
      document.getElementById("ml-diag-jump").addEventListener("click", () => {
        const targetId = r.targetNodeId;
        diagSession = null;
        if (hooks && hooks.onLaunchNode) hooks.onLaunchNode(targetId);
      });
      return;
    }

    const q = DATA.DIAGNOSTIC_QUESTIONS[diagSession.idx];
    const pct = Math.round(((diagSession.idx + 1) / totalDiag) * 100);
    container.innerHTML = `
      <div class="ml-mem-card" style="max-width:660px; margin:0 auto;">
        <div class="ml-modal-top" style="padding:0 0 14px; margin-bottom:16px;">
          <button type="button" class="ml-close-btn" id="ml-diag-abort">✕</button>
          <div class="ml-quiz-progress-track">
            <div class="ml-quiz-progress-fill" style="width:${pct}%"></div>
          </div>
          <span class="ml-heart-badge">${diagSession.idx + 1}/${totalDiag}</span>
        </div>

        <div class="ml-mini-tag" style="margin-bottom:6px;">Checking: ${q.topicLabel}</div>
        <h2 class="ml-question-prompt">${fmtMath(q.prompt)}</h2>
        <div class="ml-options-grid">
          ${q.options.map((opt, idx) => `
            <button type="button" class="ml-option-btn" data-diag-opt="${idx}">
              <span class="ml-key-num">${idx + 1}</span>
              <span>${fmtMath(opt)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("ml-diag-abort").addEventListener("click", () => {
      diagSession = null;
      if (hooks && hooks.onRerender) hooks.onRerender();
    });

    container.querySelectorAll("[data-diag-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const picked = q.options[parseInt(btn.dataset.diagOpt, 10)];
        const correct = picked === q.answer;
        if (hooks) {
          if (correct && hooks.onCorrect) hooks.onCorrect(5);
          else if (!correct && hooks.onWrong) hooks.onWrong();
        }
        diagSession.answers.push({ q, correct });

        if (diagSession.idx + 1 < totalDiag) {
          diagSession.idx++;
          renderDiagnosticModal(container, DATA, hooks);
        } else {
          const score = diagSession.answers.filter((a) => a.correct).length;
          const allMisses = diagSession.answers.filter((a) => !a.correct);
          const cracks = allMisses.map((a) => {
            const n = DATA.NODES.find((x) => x.id === a.q.targetNodeId) || DATA.NODES[0];
            return {
              nodeId: n.id,
              title: n.title,
              icon: n.icon,
              topicLabel: a.q.topicLabel,
              whyItMatters: a.q.whyItMatters,
              q: a.q
            };
          });
          const firstCrack = cracks[0] || null;
          let targetNodeId = "derivatives-speedometer";
          let summary = `${score}/${totalDiag}! Zero cracks found — jump straight into College Calculus, Physics, Chemistry, Biology, or Verbal/Logic!`;
          if (firstCrack) {
            targetNodeId = firstCrack.nodeId;
            summary = cracks.length === 1
              ? `Found 1 crack at "${firstCrack.topicLabel}" (${score}/${totalDiag} right). ${firstCrack.whyItMatters}`
              : `Detected ${cracks.length} cracks (${cracks.map((c) => c.topicLabel).join(", ")}) — starting from "${firstCrack.title}".`;
          }
          const node = DATA.NODES.find((n) => n.id === targetNodeId) || DATA.NODES[0];
          diagSession.result = { score, summary, targetNodeId: node.id, targetTitle: node.title, cracks };
          if (hooks && hooks.onSaveDiagnostic) hooks.onSaveDiagnostic(node.id, summary, cracks);
          renderDiagnosticModal(container, DATA, hooks);
        }
      });
    });
  }

  function startSprint(modeId, container, state, hooks) {
    stopSprintTimer();
    const mode = GYM_MODES.find((m) => m.id === modeId) || GYM_MODES[0];
    sprintSession = {
      mode,
      timeLeft: 45,
      score: 0,
      total: 0,
      streak: 0,
      bestStreak: 0,
      item: mode.gen(),
      flash: null,
      done: false
    };

    sprintInterval = setInterval(() => {
      if (!sprintSession || sprintSession.done) {
        stopSprintTimer();
        return;
      }
      sprintSession.timeLeft--;
      if (sprintSession.timeLeft <= 0) {
        sprintSession.done = true;
        stopSprintTimer();
        if (hooks && hooks.onSprintFinish) {
          hooks.onSprintFinish(mode.id, sprintSession.score, sprintSession.total);
        }
        renderSprintRunner(container, state, hooks);
      } else {
        const elTimer = document.getElementById("ml-sprint-timer");
        if (elTimer) elTimer.textContent = `${sprintSession.timeLeft}s`;
      }
    }, 1000);

    renderSprintRunner(container, state, hooks);
  }

  function renderSprintRunner(container, state, hooks) {
    if (!sprintSession) return;
    const s = sprintSession;

    if (s.done) {
      const pb = (state.gymBest && state.gymBest[s.mode.id]) || s.score;
      container.innerHTML = `
        <div class="ml-mem-card" style="text-align:center; padding:28px; max-width:560px; margin:0 auto;">
          <div style="font-size:52px;">${s.score >= 10 ? "😎" : "⚡"}</div>
          <h2>45s Sprint Complete: ${s.score} Solved!</h2>
          <p class="ml-hero-desc">${s.mode.title} • Best Streak: ${s.bestStreak}x • Personal Best: ${pb}</p>
          <div class="ml-victory-stats" style="margin:16px 0;">
            <div class="ml-vstat"><span>🎯 Correct</span><strong>${s.score}/${s.total}</strong></div>
            <div class="ml-vstat"><span>⚡ XP Earned</span><strong>+${Math.max(10, s.score * 4)}</strong></div>
            <div class="ml-vstat"><span>💎 Gems</span><strong>+${Math.max(5, Math.floor(s.score / 2) + 5)}</strong></div>
          </div>
          <div class="ml-victory-actions">
            <button type="button" class="ml-btn-secondary" id="ml-sp-again">🔁 Run Again</button>
            <button type="button" class="ml-btn-primary" id="ml-sp-done">Back to Gym →</button>
          </div>
        </div>
      `;
      document.getElementById("ml-sp-again").addEventListener("click", () => {
        startSprint(s.mode.id, container, state, hooks);
      });
      document.getElementById("ml-sp-done").addEventListener("click", () => {
        sprintSession = null;
        if (hooks && hooks.onRerender) hooks.onRerender();
      });
      return;
    }

    container.innerHTML = `
      <div class="ml-mem-card" style="max-width:600px; margin:0 auto;">
        <div class="ml-modal-top" style="padding:0 0 12px; margin-bottom:14px;">
          <button type="button" class="ml-close-btn" id="ml-sp-quit">✕</button>
          <div style="flex:1; font-weight:800;">${s.mode.icon} ${s.mode.title}</div>
          <div class="ml-quiz-badges">
            <span class="ml-combo-badge" id="ml-sprint-timer">⏱️ ${s.timeLeft}s</span>
            <span class="ml-heart-badge">✅ ${s.score}</span>
            ${s.streak >= 2 ? `<span class="ml-combo-badge">🔥 ${s.streak}x</span>` : ""}
          </div>
        </div>

        <div class="ml-trap-expr" style="font-size:24px; padding:22px; margin-bottom:16px;">
          ${fmtMath(s.item.prompt)}
        </div>

        <div class="ml-options-grid">
          ${s.item.options.map((opt, idx) => `
            <button type="button" class="ml-option-btn" data-sp-opt="${idx}">
              <span class="ml-key-num">${idx + 1}</span>
              <span>${fmtMath(opt)}</span>
            </button>
          `).join("")}
        </div>

        ${s.flash ? `
          <div class="ml-trap-feedback ${s.flash.ok ? "ok" : "nope"}" style="margin-top:14px; text-align:center;">
            <strong>${fmtMath(s.flash.msg)}</strong>
          </div>
        ` : ""}
      </div>
    `;

    document.getElementById("ml-sp-quit").addEventListener("click", () => {
      stopSprintTimer();
      sprintSession = null;
      if (hooks && hooks.onRerender) hooks.onRerender();
    });

    container.querySelectorAll("[data-sp-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const picked = s.item.options[parseInt(btn.dataset.spOpt, 10)];
        s.total++;
        if (picked === s.item.answer) {
          s.score++;
          s.streak++;
          if (s.streak > s.bestStreak) s.bestStreak = s.streak;
          if (hooks && hooks.onCorrect) hooks.onCorrect(0);
          s.flash = { ok: true, msg: `✅ ${s.item.tip}` };
        } else {
          s.streak = 0;
          if (hooks && hooks.onWrong) hooks.onWrong();
          s.flash = { ok: false, msg: `💡 Ans: ${s.item.answer} — ${s.item.tip}` };
        }
        s.item = s.mode.gen();
        renderSprintRunner(container, state, hooks);
      });
    });
  }

  root.MATHLINGO_MEMORIZE = {
    GYM_MODES,
    renderMemorizeView,
    renderGymView,
    openMultCourse: function () {
      stopBfClock();
      activeSubTab = "course";
      courseSession = null;
      multBfSession = null;
    },
    openMultBruteforce: function (scopePreset) {
      stopBfClock();
      activeSubTab = "multbf";
      multBfSession = null;
      if (scopePreset) bfConfig.scope = scopePreset;
    },
    isCourseChoicesActive: function () {
      return !!(courseSession && courseSession.phase === "play" && courseSession.phaseMode === "ask" && courseSession.inputMode === "mc" && !courseSession.checked);
    },
    isCourseTypingActive: function () {
      return !!(courseSession && courseSession.phase === "play" && courseSession.phaseMode === "ask" && courseSession.inputMode === "type" && !courseSession.checked);
    },
    isMultBfChoicesActive: function () {
      return !!(multBfSession && !multBfSession.done && multBfSession.inputMode === "mc" && !multBfSession.checked);
    },
    isMultBfTypingActive: function () {
      return !!(multBfSession && !multBfSession.done && multBfSession.inputMode === "type" && !multBfSession.checked);
    },
    launchExternalSprint: function (modeId, container, state, hooks) {
      startSprint(modeId, container, state, hooks);
    },
    openSubTab: function (subTabId) {
      stopBfClock();
      courseSession = null;
      multBfSession = null;
      activeSubTab = subTabId || "science";
    },
    isSprintActive: function () {
      return !!sprintSession && !sprintSession.done;
    },
    stopSprint: function () {
      stopSprintTimer();
      sprintSession = null;
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
