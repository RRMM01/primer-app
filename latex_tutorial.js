(function (root) {
  "use strict";

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ==================== OFFLINE LATEX & MATH TYPESETTER ====================
  function readBracedGroup(str, startIdx) {
    if (startIdx >= str.length || str[startIdx] !== "{") return null;
    let depth = 0;
    for (let i = startIdx; i < str.length; i++) {
      if (str[i] === "{") depth++;
      else if (str[i] === "}") {
        depth--;
        if (depth === 0) {
          return { inner: str.slice(startIdx + 1, i), nextIdx: i + 1 };
        }
      }
    }
    return null;
  }

  function replaceCommandPairs(str, cmd, builder) {
    let out = "";
    let i = 0;
    while (i < str.length) {
      if (str.startsWith(cmd, i)) {
        let j = i + cmd.length;
        while (j < str.length && str[j] === " ") j++;
        if (str[j] === "{") {
          const g1 = readBracedGroup(str, j);
          if (g1) {
            let k = g1.nextIdx;
            while (k < str.length && str[k] === " ") k++;
            const g2 = readBracedGroup(str, k);
            if (g2) {
              out += builder(g1.inner, g2.inner);
              i = g2.nextIdx;
              continue;
            }
          }
        }
      }
      out += str[i];
      i++;
    }
    return out;
  }

  function replaceSingleCommand(str, cmd, builder) {
    let out = "";
    let i = 0;
    while (i < str.length) {
      if (str.startsWith(cmd, i)) {
        let j = i + cmd.length;
        while (j < str.length && str[j] === " ") j++;
        if (str[j] === "{") {
          const g = readBracedGroup(str, j);
          if (g) {
            out += builder(g.inner);
            i = g.nextIdx;
            continue;
          }
        }
      }
      out += str[i];
      i++;
    }
    return out;
  }

  function replaceSqrt(str, stash, tokens) {
    let out = "";
    let i = 0;
    while (i < str.length) {
      if (str.startsWith("\\sqrt", i)) {
        let j = i + 5;
        let rootIdx = "";
        if (str[j] === "[") {
          const closeBr = str.indexOf("]", j);
          if (closeBr !== -1) {
            rootIdx = str.slice(j + 1, closeBr);
            j = closeBr + 1;
          }
        }
        while (j < str.length && str[j] === " ") j++;
        if (str[j] === "{") {
          const g = readBracedGroup(str, j);
          if (g) {
            const prefix = rootIdx ? stash(`<sup class="ml-sup">${formatInner(rootIdx, false, tokens)}</sup>`) : "";
            out += stash(`${prefix}<span class="ml-sqrt"><span class="ml-rad-sym">√</span><span class="ml-radicand">${formatInner(g.inner, true, tokens)}</span></span>`);
            i = g.nextIdx;
            continue;
          }
        }
      }
      out += str[i];
      i++;
    }
    return out;
  }

  function replaceSubSupCommands(str, stash, tokens) {
    let out = "";
    let i = 0;
    while (i < str.length) {
      if (str.startsWith("\\int", i) || str.startsWith("\\sum", i) || str.startsWith("\\lim", i)) {
        const isLim = str.startsWith("\\lim", i);
        const sym = isLim ? "lim" : (str.startsWith("\\int", i) ? "∫" : "Σ");
        let j = i + 4;
        let lo = "";
        let hi = "";
        for (let pass = 0; pass < 2; pass++) {
          while (j < str.length && str[j] === " ") j++;
          if (str[j] === "_") {
            if (str[j + 1] === "{") {
              const g = readBracedGroup(str, j + 1);
              if (g) { lo = g.inner; j = g.nextIdx; continue; }
            } else if (str[j + 1] && /[a-zA-Z0-9\-−]/.test(str[j + 1])) {
              lo = str[j + 1]; j += 2; continue;
            }
          }
          if (str[j] === "^") {
            if (str[j + 1] === "{") {
              const g = readBracedGroup(str, j + 1);
              if (g) { hi = g.inner; j = g.nextIdx; continue; }
            } else if (str[j + 1] && /[a-zA-Z0-9\-−]/.test(str[j + 1])) {
              hi = str[j + 1]; j += 2; continue;
            }
          }
          break;
        }
        if (lo || hi) {
          const topHtml = hi ? `<span class="ml-op-top">${formatInner(hi, false, tokens)}</span>` : "";
          const botHtml = lo ? `<span class="ml-op-bot">${formatInner(lo, false, tokens)}</span>` : "";
          const symStyle = sym === "lim" ? ` style="font-style:normal; font-size:0.95em;"` : "";
          out += stash(`<span class="ml-op-stack">${topHtml}<span class="ml-op-sym"${symStyle}>${sym}</span>${botHtml}</span>`);
          i = j;
          continue;
        } else if (!isLim) {
          out += sym;
          i = j;
          continue;
        } else {
          out += "lim";
          i = j;
          continue;
        }
      }
      out += str[i];
      i++;
    }
    return out;
  }

  function formatInner(rawSegment, allowBareFracs, sharedTokens) {
    const isRoot = !sharedTokens;
    const tokens = sharedTokens || [];
    function stash(html) {
      const idx = tokens.length;
      tokens.push(html);
      return `\uE000${idx}\uE001`;
    }

    let s = String(rawSegment == null ? "" : rawSegment);

    // 1. LaTeX text, style, accents, arrows, and grouping macros
    s = replaceSingleCommand(s, "\\text", (inner) => stash(`<span class="ml-math-text">${formatInner(inner, false, tokens)}</span>`));
    s = replaceSingleCommand(s, "\\texttt", (inner) => stash(`<code class="ml-inline-code">${formatInner(inner, false, tokens)}</code>`));
    s = replaceSingleCommand(s, "\\mathrm", (inner) => stash(`<span class="ml-math-rm">${formatInner(inner, false, tokens)}</span>`));
    s = replaceSingleCommand(s, "\\mathcal", (inner) => stash(`<span class="ml-math-rm" style="font-style:italic;">${formatInner(inner, false, tokens)}</span>`));
    s = replaceSingleCommand(s, "\\mathbb", (inner) => stash(`<strong>${formatInner(inner, false, tokens)}</strong>`));
    s = replaceSingleCommand(s, "\\mathbf", (inner) => stash(`<strong>${formatInner(inner, false, tokens)}</strong>`));
    s = replaceSingleCommand(s, "\\textit", (inner) => stash(`<em>${formatInner(inner, false, tokens)}</em>`));
    s = replaceSingleCommand(s, "\\cancel", (inner) => stash(`<span style="text-decoration:line-through; opacity:0.65;">${formatInner(inner, false, tokens)}</span>`));
    s = replaceSingleCommand(s, "\\xrightarrow", (inner) => stash(`<span class="ml-xarrow"><span class="ml-xarrow-lbl">${formatInner(inner, false, tokens)}</span><span class="ml-xarrow-sym">⟶</span></span>`));
    s = replaceSingleCommand(s, "\\xleftrightarrow", (inner) => stash(`<span class="ml-xarrow"><span class="ml-xarrow-lbl">${formatInner(inner, false, tokens)}</span><span class="ml-xarrow-sym">⟷</span></span>`));
    s = replaceSingleCommand(s, "\\vec", (inner) => stash(`<span class="ml-vec">${formatInner(inner, false, tokens)}</span>`));
    s = replaceSingleCommand(s, "\\hat", (inner) => stash(`<span class="ml-hat">${formatInner(inner, false, tokens)}</span>`));
    s = replaceSingleCommand(s, "\\overline", (inner) => stash(`<span style="text-decoration:overline;">${formatInner(inner, false, tokens)}</span>`));
    s = replaceSingleCommand(s, "\\underbrace", (inner) => stash(`<span style="border-bottom:1.5px solid currentColor; padding:0 3px;">${formatInner(inner, false, tokens)}</span>`));

    // Normalize degree expressions BEFORE \circ becomes ° so 120^{\circ} doesn't double-superscript
    s = s
      .replace(/\^\{\\circ\}/g, "°")
      .replace(/\^\\circ(?![a-zA-Z])/g, "°")
      .replace(/\{,\}/g, ",");

    s = s
      .replace(/\\qquad/g, "&emsp;")
      .replace(/\\quad/g, "&nbsp;&nbsp;")
      .replace(/\\rightleftharpoons/g, "⇌")
      .replace(/\\leftrightarrow/g, "↔")
      .replace(/\\implies/g, "⇒")
      .replace(/\\Rightarrow/g, "⇒")
      .replace(/\\Leftarrow/g, "⇐")
      .replace(/\\iff/g, "⟺")
      .replace(/\\rightarrow/g, "→")
      .replace(/\\leftarrow/g, "←")
      .replace(/\\to(?![a-zA-Z])/g, "→")
      .replace(/\\cdot/g, "·")
      .replace(/\\oplus/g, "⊕")
      .replace(/\\times/g, "×")
      .replace(/\\div/g, "÷")
      .replace(/\\pm/g, "±")
      .replace(/\\mp/g, "∓")
      .replace(/\\leq|\\le(?![a-zA-Z])/g, "≤")
      .replace(/\\geq|\\ge(?![a-zA-Z])/g, "≥")
      .replace(/\\neq/g, "≠")
      .replace(/\\approx/g, "≈")
      .replace(/\\equiv/g, "≡")
      .replace(/\\propto/g, "∝")
      .replace(/\\infty/g, "∞")
      .replace(/\\partial/g, "∂")
      .replace(/\\notin(?![a-zA-Z])/g, "∉")
      .replace(/\\in(?![a-zA-Z])/g, "∈")
      .replace(/\\subset(?![a-zA-Z])/g, "⊂")
      .replace(/\\subseteq(?![a-zA-Z])/g, "⊆")
      .replace(/\\emptyset/g, "∅")
      .replace(/\\cup(?![a-zA-Z])/g, "∪")
      .replace(/\\cap(?![a-zA-Z])/g, "∩")
      .replace(/\\parallel(?![a-zA-Z])/g, "∥")
      .replace(/\\perp(?![a-zA-Z])/g, "⊥")
      .replace(/\\neg(?![a-zA-Z])/g, "¬")
      .replace(/\\longrightarrow/g, "⟶")
      .replace(/\\longleftarrow/g, "⟵")
      .replace(/\\uparrow/g, "↑")
      .replace(/\\downarrow/g, "↓")
      .replace(/\\therefore/g, "∴")
      .replace(/\\land(?![a-zA-Z])/g, "∧")
      .replace(/\\lor(?![a-zA-Z])/g, "∨")
      .replace(/\\setminus/g, "∖")
      .replace(/\\gg(?![a-zA-Z])/g, "≫")
      .replace(/\\ll(?![a-zA-Z])/g, "≪")
      .replace(/\\nabla/g, "∇")
      .replace(/\\hbar/g, "ℏ")
      .replace(/\\ell(?![a-zA-Z])/g, "ℓ")
      .replace(/\\Delta/g, "Δ")
      .replace(/\\Sigma/g, "Σ")
      .replace(/\\Omega/g, "Ω")
      .replace(/\\Pi(?![a-zA-Z])/g, "Π")
      .replace(/\\Phi/g, "Φ")
      .replace(/\\Theta/g, "Θ")
      .replace(/\\alpha/g, "α")
      .replace(/\\beta/g, "β")
      .replace(/\\gamma/g, "γ")
      .replace(/\\delta/g, "δ")
      .replace(/\\varepsilon|\\epsilon/g, "ε")
      .replace(/\\eta(?![a-zA-Z])/g, "η")
      .replace(/\\theta/g, "θ")
      .replace(/\\lambda/g, "λ")
      .replace(/\\mu(?![a-zA-Z])/g, "μ")
      .replace(/\\pi(?![a-zA-Z])/g, "π")
      .replace(/\\rho(?![a-zA-Z])/g, "ρ")
      .replace(/\\sigma/g, "σ")
      .replace(/\\tau(?![a-zA-Z])/g, "τ")
      .replace(/\\phi/g, "φ")
      .replace(/\\omega/g, "ω")
      .replace(/\\circ/g, "°")
      .replace(/\\(log|ln|sin|cos|tan|sec|csc|cot|exp|max|min|det|deg|softmax|ReLU)(?![a-zA-Z])/g, (_m, fn) => stash(`<span class="ml-math-fn">${fn}</span>`))
      .replace(/\\dots|\\ldots|\\cdots/g, "…")
      .replace(/\\mid(?![a-zA-Z])/g, "|")
      .replace(/\\left\(/g, "(")
      .replace(/\\right\)/g, ")")
      .replace(/\\left\[/g, "[")
      .replace(/\\right\]/g, "]")
      .replace(/\\left\\\{/g, "{")
      .replace(/\\right\\\}/g, "}")
      .replace(/\\left\|/g, "|")
      .replace(/\\right\|/g, "|")
      .replace(/\\big\(/g, "(")
      .replace(/\\big\)/g, ")")
      .replace(/\\big\[/g, "[")
      .replace(/\\big\]/g, "]")
      .replace(/\\big\|/g, "|")
      .replace(/\\checkmark/g, "✓")
      .replace(/\\&/g, "&amp;")
      .replace(/\\%/g, "%")
      .replace(/\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/g, (_m, inner) => {
        const rows = inner.split(/\\\\/).map((r) => r.trim()).filter(Boolean);
        if (rows.length > 1) {
          const rowHtml = rows.map((r) => {
            const cols = r.split(/&amp;|&/).map((c) => `<span class="ml-mat-cell">${formatInner(c.trim(), false, tokens)}</span>`).join("");
            return `<span class="ml-mat-row">${cols}</span>`;
          }).join("");
          return stash(`<span class="ml-mat"><span class="ml-mat-paren">(</span><span class="ml-mat-grid">${rowHtml}</span><span class="ml-mat-paren">)</span></span>`);
        }
        return `(${inner.replace(/&amp;|&/g, ", ")})`;
      })
      .replace(/\\_/g, "_")
      .replace(/\\;/g, " ")
      .replace(/\\,/g, " ");

    // 2. Stacked calculus / limit / sigma operators (LaTeX + inline Unicode conventions)
    s = replaceSubSupCommands(s, stash, tokens);
    s = s.replace(/\blim\(([^()]{1,28})\)/g, (_m, cond) => {
      return stash(`<span class="ml-op-stack"><span class="ml-op-sym" style="font-style:normal; font-size:0.95em;">lim</span><span class="ml-op-bot">${formatInner(cond, false, tokens)}</span></span>`);
    });
    s = s.replace(/∫([₀₁₂₃₄₅₆₇₈₉a-zA-Z0-9−-]+)\^([a-zA-Z0-9−-]+)/g, (_m, lo, hi) => {
      const subMap = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
      const cleanLo = lo.replace(/[₀-₉]/g, (ch) => subMap[ch] || ch);
      return stash(`<span class="ml-op-stack"><span class="ml-op-top">${formatInner(hi, false, tokens)}</span><span class="ml-op-sym">∫</span><span class="ml-op-bot">${formatInner(cleanLo, false, tokens)}</span></span>`);
    });
    s = s.replace(/Σ\s*\(([^()]{1,24})\)/g, (_m, cond) => {
      return stash(`<span class="ml-op-stack"><span class="ml-op-sym">Σ</span><span class="ml-op-bot">${formatInner(cond, false, tokens)}</span></span>`);
    });

    // 3. Recursive \frac{num}{den}, \binom{n}{k}, and \sqrt{rad}
    s = replaceCommandPairs(s, "\\frac", (num, den) => {
      return stash(`<span class="ml-frac"><span class="ml-num">${formatInner(num, allowBareFracs, tokens)}</span><span class="ml-den">${formatInner(den, allowBareFracs, tokens)}</span></span>`);
    });
    s = replaceCommandPairs(s, "\\binom", (top, bot) => {
      return stash(`<span class="ml-math-text">(</span><span class="ml-frac" style="vertical-align:middle;"><span class="ml-num" style="border-bottom:none;">${formatInner(top, false, tokens)}</span><span class="ml-den">${formatInner(bot, false, tokens)}</span></span><span class="ml-math-text">)</span>`);
    });
    s = replaceSqrt(s, stash, tokens);

    // Inline √(...) and √number/letter (not already inside ml-sqrt)
    s = s.replace(/√\(([^()]+)\)/g, (_m, rad) => {
      return stash(`<span class="ml-sqrt"><span class="ml-rad-sym">√</span><span class="ml-radicand">${formatInner(rad, allowBareFracs, tokens)}</span></span>`);
    });
    s = s.replace(/√([0-9]+|[a-zA-Z])/g, (_m, rad) => {
      return stash(`<span class="ml-sqrt"><span class="ml-rad-sym">√</span><span class="ml-radicand">${rad}</span></span>`);
    });

    // 4. Braced / parenthesized / simple exponents & ion charges & subscripts
    let expGuard = 0;
    while (/\^\{/.test(s) && expGuard < 8) {
      let next = "";
      let i = 0;
      let changed = false;
      while (i < s.length) {
        if (s[i] === "^" && s[i + 1] === "{") {
          const g = readBracedGroup(s, i + 1);
          if (g) {
            next += stash(`<sup class="ml-sup">${formatInner(g.inner, false, tokens)}</sup>`);
            i = g.nextIdx;
            changed = true;
            continue;
          }
        }
        next += s[i];
        i++;
      }
      s = next;
      if (!changed) break;
      expGuard++;
    }
    s = s.replace(/\^\(([^()]+)\)/g, (_m, exp) => stash(`<sup class="ml-sup">${formatInner(exp, false, tokens)}</sup>`));
    // Ion charges like H^+, OH^-, Ca^2+, Fe^3+ as well as normal exponents like x^2, 10^-6, x^1/2
    s = s.replace(/\^([0-9]*[+−\-](?![0-9a-zA-Z])|[−\-]?[0-9a-zA-Z]+(?:\/[0-9]+)?)/g, (_m, exp) => stash(`<sup class="ml-sup">${exp}</sup>`));

    let subGuard = 0;
    while (/_\{/.test(s) && subGuard < 8) {
      let next = "";
      let i = 0;
      let changed = false;
      while (i < s.length) {
        if (s[i] === "_" && s[i + 1] === "{") {
          const g = readBracedGroup(s, i + 1);
          if (g) {
            next += stash(`<sub class="ml-sub">${formatInner(g.inner, false, tokens)}</sub>`);
            i = g.nextIdx;
            changed = true;
            continue;
          }
        }
        next += s[i];
        i++;
      }
      s = next;
      if (!changed) break;
      subGuard++;
    }
    s = s.replace(/\blog_([0-9a-zA-Z]+)/g, (_m, sub) => `log${stash(`<sub class="ml-sub">${sub}</sub>`)}`);
    s = s.replace(/_\(([^()]{1,22})\)/g, (_m, sub) => stash(`<sub class="ml-sub">${formatInner(sub, false, tokens)}</sub>`));
    s = s.replace(/(Δ[A-Z]°?|PE|KE|[A-Za-z]°?|[ηΦμερσλωΔΣΩ])_([a-z][a-z0-9]*|[A-Z][a-z0-9]*|[0-9]+|∞)(?![a-z0-9_])/g, (full, base, sub, offset, str) => {
      // Avoid touching snake_case identifiers like multi-letter_word unless it's a known science symbol or numeric chemical subscript (CO_2)
      const prevCh = offset > 0 ? str[offset - 1] : "";
      if (/^[a-zA-Z]$/.test(base) && /[a-zA-Z]/.test(prevCh) && !/^[0-9]+$/.test(sub) && !/^(PE|KE)$/.test(prevCh + base)) {
        return full;
      }
      return `${base}${stash(`<sub class="ml-sub">${sub}</sub>`)}`;
    });

    // 5. Parenthesized algebraic divisions: (a)(b)/(c) or (exprA)/(exprB)
    s = s.replace(/((?:\([^()]+\))+)\s*\/\s*\(([^()]+)\)/g, (_m, num, den) => {
      if (num.length > 52 || den.length > 42) return `${num} / (${den})`;
      const cleanNum = /^\([^()]+\)$/.test(num) ? num.slice(1, -1) : num;
      return stash(`<span class="ml-frac"><span class="ml-num">${formatInner(cleanNum, false, tokens)}</span><span class="ml-den">${formatInner(den, false, tokens)}</span></span>`);
    });

    // 6. Numeric & pi/sqrt fractions like 1/2, 3/4, √3/2, 2π/3 (ignoring unit strings km/h, m/s, g/mol)
    const fracRe = allowBareFracs
      ? /(^|[\s(=+\-×·,;:])(\uE000\d+\uE001|\d*π|\d+)\/(\uE000\d+\uE001|\d*π|\d+)(?=$|[\s)=+\-×·,;:.?!°])/g
      : /(^|[\s(=+\-×·,;:])(\uE000\d+\uE001|\d*π|[1-9]\d{0,2})\/(\uE000\d+\uE001|\d*π|[1-9]\d{0,2})(?=$|[\s)=+\-×·,;:.?!°])/g;

    s = s.replace(fracRe, (full, pre, num, den, offset, str) => {
      if (/Question\s*$/i.test(str.slice(Math.max(0, offset - 12), offset))) return full;
      return `${pre}${stash(`<span class="ml-frac"><span class="ml-num">${num}</span><span class="ml-den">${den}</span></span>`)}`;
    });

    // Unwrap stashed tokens ONLY at root call
    if (isRoot) {
      let guard = 0;
      while (/\uE000\d+\uE001/.test(s) && guard < 24) {
        s = s.replace(/\uE000(\d+)\uE001/g, (_m, idx) => tokens[parseInt(idx, 10)] || "");
        guard++;
      }
    }
    return s;
  }

  function looksLikeFormulaOnly(s) {
    return /\\[a-zA-Z]|[\^_]|^[\s0-9a-zA-Z+\-×÷·=<>≤≥≠≈()|πθσΔλμρΩ√∫Σ∂/,.]+$/.test(s);
  }

  function isLikelyCurrencyBetweenDollars(inner) {
    const t = inner.trim();
    if (!t) return true;
    // Pure number like "$80" or "$96.50"
    if (/^\d[\d,]*(\.\d+)?$/.test(t)) return true;
    // Starts with currency digits followed by prose word ("$5 base flag-down fee, plus $3")
    if (/^\d[\d,.]*\s+[a-zA-Z]{2,}/.test(t)) return true;
    // Ends with a dangling operator/separator right before a second currency "$120 − $24"
    if (/[+\-−×÷=,;:]\s*$/.test(t)) return true;
    // Multiple ordinary prose words without any LaTeX command
    if (!/\\/.test(t)) {
      const proseWords = (t.match(/\b[a-z]{3,}\b/gi) || []).filter(
        (w) => !/^(sin|cos|tan|sec|csc|cot|log|lim|max|min|mod|deg|rad|mol|atm|and|not|for|the)$/i.test(w)
      );
      if (proseWords.length >= 2) return true;
    }
    return false;
  }

  function formatMath(rawText, displayMode) {
    if (rawText == null) return "";
    const raw = String(rawText);
    const segments = [];
    function stashSeg(html) {
      const i = segments.length;
      segments.push(html);
      return `\uE004${i}\uE005`;
    }

    // Extract inline backtick `code` FIRST so HTML/CSS/Python/CLI snippets stay untouched by LaTeX or subscript rules
    let work = raw.replace(/`([^`\n]{1,180})`/g, (_m, code) => {
      return stashSeg(`<code class="ml-inline-code">${escapeHtml(code)}</code>`);
    });

    // Extract display $$...$$ and explicit inline $...$ BEFORE escaping prose
    work = work.replace(/\$\$([\s\S]+?)\$\$/g, (_m, inner) => {
      const safeInner = escapeHtml(inner.trim());
      return stashSeg(`<span class="ml-math ml-math-block">${formatInner(safeInner, true)}</span>`);
    });

    work = work.replace(/\$([^$\n]{1,160}?)\$/g, (full, inner) => {
      if (isLikelyCurrencyBetweenDollars(inner)) return full;
      if (!/[\\^_{}=+\-×÷*/<>≤≥≠]|sin|cos|tan|log|lim|√|π/.test(inner)) return full;
      const safeInner = escapeHtml(inner.trim());
      return stashSeg(`<span class="ml-math">${formatInner(safeInner, true)}</span>`);
    });

    const trimmedWork = work.trim();
    const isSingleSeg = segments.length === 1 && trimmedWork === "\uE0040\uE005";

    // Escape remaining prose + auto-typeset inline math notations safely
    let escaped = escapeHtml(work);
    escaped = formatInner(escaped, false);

    // Re-inject stashed code / $ / $$ blocks
    escaped = escaped.replace(/\uE004(\d+)\uE005/g, (_m, idx) => segments[parseInt(idx, 10)] || "");

    if (isSingleSeg) return escaped;
    if (displayMode) {
      return `<span class="ml-math ml-math-block">${escaped}</span>`;
    }
    if (!raw.includes("`") && looksLikeFormulaOnly(raw.trim())) {
      return `<span class="ml-math">${escaped}</span>`;
    }
    return escaped;
  }

  // ==================== CURATED DETAILED WORKED EXAMPLES ====================
  const CURATED_EXAMPLES = {
    "make-10-addition": {
      heroFormula: "$$28 + 7 = (28 + 2) + 5 = 30 + 5 = 35$$",
      title: "Bridge Through 10/100 in 1 Second",
      problemLatex: "$$47 + 8 = \\text{?}$$",
      steps: [
        { label: "See what 47 needs", mathLatex: "$47 + \\mathbf{3} = 50$", plainWhy: "Round 47 up to a clean multiple of 10 by borrowing 3." },
        { label: "Subtract that 3 from 8", mathLatex: "$8 - 3 = 5$", plainWhy: "Splitting 8 into (3 + 5) keeps the total exact." },
        { label: "Add the clean leftover", mathLatex: "$50 + 5 = \\mathbf{55}$", plainWhy: "50 + 5 takes zero finger-counting!" }
      ],
      answerLatex: "$$47 + 8 = 55$$",
      commonTrap: "Don't count upward by 1s eight times — feed the nearest multiple of 10 first!"
    },
    "fractions-trenchcoat": {
      heroFormula: "$$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}, \\qquad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$$",
      title: "Match Slice Sizes Before Adding",
      problemLatex: "$$\\frac{1}{3} + \\frac{1}{6} = \\text{?}$$",
      steps: [
        { label: "Match denominators (3 vs 6)", mathLatex: "$\\frac{1}{3} = \\frac{1 \\times 2}{3 \\times 2} = \\frac{2}{6}$", plainWhy: "You can't add thirds and sixths until every slice is the exact same size." },
        { label: "Add numerators ONLY", mathLatex: "$\\frac{2}{6} + \\frac{1}{6} = \\frac{2 + 1}{6} = \\frac{3}{6}$", plainWhy: "Once slice sizes match, only the number of slices increases." },
        { label: "Simplify to lowest terms", mathLatex: "$\\frac{3}{6} = \\mathbf{\\frac{1}{2}}$", plainWhy: "Divide top and bottom by 3." }
      ],
      answerLatex: "$$\\frac{1}{2}$$",
      commonTrap: "NEVER add denominators straight across (1/3 + 1/6 ≠ 2/9)!"
    },
    "decimals-percents": {
      heroFormula: "$$x\\% \\text{ of } y = y\\% \\text{ of } x, \\qquad \\text{Percent} = \\frac{\\text{Part}}{100}$$",
      title: "Use the Magic % Swap & Decimal Counting",
      problemLatex: "$$\\text{Find } 16\\% \\text{ of } 25 \\text{ mentally}$$",
      steps: [
        { label: "Flip the two numbers!", mathLatex: "$16\\% \\text{ of } 25 = 25\\% \\text{ of } 16$", plainWhy: "Since (16/100)·25 = (25/100)·16, multiplication order never changes the result." },
        { label: "Rewrite 25% as a clean quarter", mathLatex: "$25\\% = \\frac{1}{4}$", plainWhy: "Common anchor percents (50% = 1/2, 25% = 1/4, 10% = 1/10) kill messy math." },
        { label: "Take 1/4 of 16", mathLatex: "$\\frac{16}{4} = \\mathbf{4}$", plainWhy: "Done in 2 seconds with zero long multiplication!" }
      ],
      answerLatex: "$$4$$",
      commonTrap: "For +20% then −20%, the second step acts on the NEW larger price — they do NOT cancel back to 100%!"
    },
    "pemdas-grammar": {
      heroFormula: "$$(\\text{Brackets}) \\to \\text{Exponents} \\to [\\times, \\div \\text{ Left} \\to \\text{Right}] \\to [+, - \\text{ Left} \\to \\text{Right}]$$",
      title: "3-Tier Math Grammar Without Traps",
      problemLatex: "$$20 \\div 5(2) + 3^2 = \\text{?}$$",
      steps: [
        { label: "Clear exponents first", mathLatex: "$3^2 = 9 \\implies 20 \\div 5 \\times 2 + 9$", plainWhy: "Powers bind tighter than multiplication or division." },
        { label: "Run × and ÷ STRICTLY left-to-right", mathLatex: "$(20 \\div 5) \\times 2 = 4 \\times 2 = 8$", plainWhy: "Multiplication does NOT outrank division — they are equal teammates!" },
        { label: "Finish addition last", mathLatex: "$8 + 9 = \\mathbf{17}$", plainWhy: "Adding and subtracting always glue the finished terms together at the end." }
      ],
      answerLatex: "$$17$$",
      commonTrap: "Don't multiply 5×2 before 20÷5! Multiplication and division share the SAME tier and go left-to-right."
    },
    "exponents-roots": {
      heroFormula: "$$x^a \\cdot x^b = x^{a+b}, \\quad x^{-n} = \\frac{1}{x^n}, \\quad x^{\\frac{a}{b}} = \\left(\\sqrt[b]{x}\\right)^a$$",
      title: "Negative & Fractional Exponents Decoded",
      problemLatex: "$$\\text{Evaluate } 8^{-\\frac{2}{3}}$$",
      steps: [
        { label: "Handle the minus sign (Flip to Fraction)", mathLatex: "$8^{-\\frac{2}{3}} = \\frac{1}{8^{\\frac{2}{3}}}$", plainWhy: "A negative exponent means reciprocal (1 over...), NEVER a negative output." },
        { label: "Denominator = Root first!", mathLatex: "$8^{\\frac{1}{3}} = \\sqrt[3]{8} = 2$", plainWhy: "Always shrink with the root first before raising to the power." },
        { label: "Numerator = Power", mathLatex: "$\\frac{1}{2^2} = \\mathbf{\\frac{1}{4}}$", plainWhy: "Square 2 to get 4 in the denominator." }
      ],
      answerLatex: "$$\\frac{1}{4}$$",
      commonTrap: "8^(−2/3) is NOT negative (−4)! Negative exponents flip upstairs ↔ downstairs."
    },
    "algebra-scale": {
      heroFormula: "$$ax + b = c \\implies x = \\frac{c - b}{a}, \\qquad -ax < b \\implies x > -\\frac{b}{a}$$",
      title: "Unwrap x in Reverse & Watch the Sign Flip",
      problemLatex: "$$\\text{Solve } -3x + 5 > 17$$",
      steps: [
        { label: "Peel off the outer +5 first", mathLatex: "$-3x > 17 - 5 \\implies -3x > 12$", plainWhy: "Undo addition/subtraction before multiplication/division, just like unwrapping a gift." },
        { label: "Divide both sides by −3 AND FLIP > to <", mathLatex: "$x < \\frac{12}{-3} = \\mathbf{-4}$", plainWhy: "Dividing by a negative mirrors the entire number line, reversing which side is larger!" },
        { label: "Quick sanity check (test x = −5)", mathLatex: "$-3(-5) + 5 = 20 > 17 \\;\\checkmark$", plainWhy: "Plugging one test number proves the direction is right." }
      ],
      answerLatex: "$$x < -4$$",
      commonTrap: "Dividing or multiplying an inequality by a NEGATIVE ALWAYS flips < ↔ >!"
    },
    "systems-equations": {
      heroFormula: "$$\\text{Elimination: Add or subtract equations to kill one variable instantly!}$$",
      title: "Eliminate One Mystery in Two Lines",
      problemLatex: "$$x + y = 11 \\quad \\text{and} \\quad x - y = 3$$",
      steps: [
        { label: "Add both equations vertically", mathLatex: "$(x + x) + (y - y) = 11 + 3 \\implies 2x = 14$", plainWhy: "+y and −y cancel cleanly on contact!" },
        { label: "Solve for x", mathLatex: "$x = \\frac{14}{2} = 7$", plainWhy: "One mystery down in a single division." },
        { label: "Plug x = 7 back to grab y", mathLatex: "$7 + y = 11 \\implies \\mathbf{y = 4}$", plainWhy: "Check in equation 2: 7 − 4 = 3 ✓." }
      ],
      answerLatex: "$$(x, y) = (7, 4)$$",
      commonTrap: "When subtracting equations, distribute the minus sign to EVERY term in the bottom equation!"
    },
    "factoring-foil": {
      heroFormula: "$$x^2 + (r_1 + r_2)x + r_1 r_2 = (x + r_1)(x + r_2), \\quad a^2 - b^2 = (a - b)(a + b)$$",
      title: "Factor Quadratics With Negatives & a > 1",
      problemLatex: "$$\\text{Factor } 2x^2 + 7x + 3$$",
      steps: [
        { label: "Multiply outer × end (AC = 2 · 3)", mathLatex: "$A \\cdot C = 2 \\times 3 = 6$", plainWhy: "When a > 1, find two numbers that multiply to a·c and add to b = 7." },
        { label: "Split middle 7x using (6 and 1)", mathLatex: "$2x^2 + 6x + 1x + 3$", plainWhy: "6 × 1 = 6 and 6 + 1 = 7." },
        { label: "Group & pull common factors", mathLatex: "$2x(x + 3) + 1(x + 3) = \\mathbf{(2x + 1)(x + 3)}$", plainWhy: "Both groups share the exact binomial factor (x + 3)." }
      ],
      answerLatex: "$$(2x + 1)(x + 3)$$",
      commonTrap: "Always verify Outer + Inner: 2x(3) + 1(x) = 7x matches the middle term!"
    },
    "slope-lines": {
      heroFormula: "$$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{Rise}}{\\text{Run}}, \\qquad y = mx + b$$",
      title: "Build a Line From Two Points",
      problemLatex: "$$\\text{Find the line through } (1, 4) \\text{ and } (3, 10)$$",
      steps: [
        { label: "Compute Rise ÷ Run", mathLatex: "$m = \\frac{10 - 4}{3 - 1} = \\frac{6}{2} = 3$", plainWhy: "Every +1 step right pushes y UP by +3." },
        { label: "Plug one point into y = mx + b", mathLatex: "$4 = 3(1) + b \\implies b = 1$", plainWhy: "Backing up 1 step from (1, 4) hits the y-axis at (0, 1)." },
        { label: "Write final equation", mathLatex: "$\\mathbf{y = 3x + 1}$", plainWhy: "Check second point: 3(3) + 1 = 10 ✓." }
      ],
      answerLatex: "$$y = 3x + 1$$",
      commonTrap: "Flat horizontal lines have slope 0 (Rise = 0); vertical lines have UNDEFINED slope (Run = 0)!"
    },
    "geometry-pythagoras": {
      heroFormula: "$$a^2 + b^2 = c^2 \\;(\\text{c = longest side across from } 90^{\\circ})$$",
      title: "Find a Missing Leg Without Mixing Up c",
      problemLatex: "$$\\text{Right triangle: hypotenuse } c = 13,\\; \\text{leg } a = 5 \\implies b = \\text{?}$$",
      steps: [
        { label: "Identify the hypotenuse first", mathLatex: "$c = 13 \\;(\\text{across from } 90^{\\circ})$", plainWhy: "c ALWAYS goes alone on the right side of a² + b² = c²." },
        { label: "Subtract leg² from hypotenuse²", mathLatex: "$b^2 = 13^2 - 5^2 = 169 - 25 = 144$", plainWhy: "Because you're finding a shorter leg, subtract instead of adding!" },
        { label: "Take the square root", mathLatex: "$b = \\sqrt{144} = \\mathbf{12}$", plainWhy: "Instant recognition: 5–12–13 is a classic Pythagorean triple!" }
      ],
      answerLatex: "$$b = 12$$",
      commonTrap: "NEVER blindly plug both given numbers into a and b — check if one of them is the hypotenuse c!"
    },
    "quadratics-symmetry": {
      heroFormula: "$$x_{\\text{vertex}} = \\frac{-b}{2a}, \\qquad y = a(x - h)^2 + k \\implies \\text{Vertex } (h, k)$$",
      title: "Vertex Shortcut & Quadratic Roots",
      problemLatex: "$$\\text{Find the vertex of } y = x^2 - 6x + 5$$",
      steps: [
        { label: "Use the symmetry center formula", mathLatex: "$x_{\\text{vertex}} = \\frac{-(-6)}{2(1)} = \\frac{6}{2} = 3$", plainWhy: "The vertex sits dead-center between the parabola's two halves." },
        { label: "Plug x = 3 back into y", mathLatex: "$y = 3^2 - 6(3) + 5 = 9 - 18 + 5 = -4$", plainWhy: "Evaluates the exact minimum height of the parabola." },
        { label: "Write vertex coordinate", mathLatex: "$(3, -4)$", plainWhy: "Bonus: roots at x = 1 and x = 5 average right to 3!" }
      ],
      answerLatex: "$$\\text{Vertex } (3, -4)$$",
      commonTrap: "Watch double minus in −b/(2a) and inside (x − h)²: (x − 3)² shifts RIGHT to +3!"
    },
    "functions-shifting": {
      heroFormula: "$$f(x - h) + k \\implies \\text{Right } h,\\; \\text{Up } k \\qquad | \\qquad (f \\circ g)(x) = f(g(x))$$",
      title: "Inside Acts Backwards, Outside Acts Honestly",
      problemLatex: "$$\\text{If } f(x) = x^2 \\text{ and } g(x) = x - 3,\\; \\text{describe } f(g(x)) + 4$$",
      steps: [
        { label: "Substitute g(x) inside f(x)", mathLatex: "$f(g(x)) + 4 = (x - 3)^2 + 4$", plainWhy: "Composition feeds the output of the inner machine g straight into outer machine f." },
        { label: "Decode the inside shift (x − 3)", mathLatex: "$x - 3 = 0 \\implies x = +3 \\;(\\text{Right } 3)$", plainWhy: "You must feed x = +3 just to reach what used to happen at 0 — so the graph shifts RIGHT!" },
        { label: "Decode the outside shift (+4)", mathLatex: "$+4 \\text{ outside} \\implies \\text{Up } 4 \\implies \\text{Vertex } \\mathbf{(3, 4)}$", plainWhy: "Outside changes directly alter the final height y." }
      ],
      answerLatex: "$$\\text{Right } 3,\\; \\text{Up } 4 \\implies \\text{Vertex } (3, 4)$$",
      commonTrap: "Inside parentheses ALWAYS moves horizontally in the OPPOSITE direction of its sign!"
    },
    "logarithms-unlocked": {
      heroFormula: "$$\\log_b(y) = x \\iff b^x = y, \\qquad \\log_b(A) + \\log_b(B) = \\log_b(AB)$$",
      title: "Solve & Condense Logarithms Cleanly",
      problemLatex: "$$\\text{Solve } \\log_2(x) + \\log_2(x - 2) = 3$$",
      steps: [
        { label: "Condense added logs by multiplying", mathLatex: "$\\log_2\\big(x(x - 2)\\big) = 3$", plainWhy: "Adding exponents outside equals multiplying bases inside!" },
        { label: "Convert log into exponent form", mathLatex: "$x(x - 2) = 2^3 = 8 \\implies x^2 - 2x - 8 = 0$", plainWhy: "Base 2 raised to exponent 3 equals the inside expression." },
        { label: "Factor & reject negative log input", mathLatex: "$(x - 4)(x + 2) = 0 \\implies \\mathbf{x = 4}$", plainWhy: "Check domain: log₂(−2) is undefined, so only x = 4 survives." }
      ],
      answerLatex: "$$x = 4$$",
      commonTrap: "Always reject solutions that make the inside of a log ≤ 0!"
    },
    "trig-unit-circle": {
      heroFormula: "$$(\\cos\\theta, \\sin\\theta), \\qquad \\sin^2\\theta + \\cos^2\\theta = 1, \\qquad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$$",
      title: "Evaluate Any Angle With Reference Triangles",
      problemLatex: "$$\\text{Find exact } \\cos(120^{\\circ}) \\text{ and } \\sin(120^{\\circ})$$",
      steps: [
        { label: "Locate Quadrant & Sign", mathLatex: "$120^{\\circ} \\in \\text{QII} \\implies \\cos < 0,\\; \\sin > 0$", plainWhy: "In Quadrant II, X (cos) goes left (−) while Y (sin) stays up (+)." },
        { label: "Find Reference Angle to X-axis", mathLatex: "$180^{\\circ} - 120^{\\circ} = 60^{\\circ}$", plainWhy: "Always measure distance to the nearest horizontal X-axis (180° or 360°)." },
        { label: "Read 60° coordinates with QII signs", mathLatex: "$\\cos(120^{\\circ}) = -\\frac{1}{2}, \\quad \\sin(120^{\\circ}) = \\frac{\\sqrt{3}}{2}$", plainWhy: "At 60°, short X = 1/2 and tall Y = √3/2." }
      ],
      answerLatex: "$$\\left(-\\frac{1}{2},\\; \\frac{\\sqrt{3}}{2}\\right)$$",
      commonTrap: "NEVER measure a reference angle to 90° (the Y-axis) — always measure to 180° or 360°!"
    },
    "sequences-sigma": {
      heroFormula: "$$S_n = \\frac{n(a_1 + a_n)}{2}, \\qquad S_{\\infty} = \\frac{a_1}{1 - r} \\;(|r| < 1)$$",
      title: "Pair-Up Sums & Infinite Geometric Series",
      problemLatex: "$$\\text{Evaluate } \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots$$",
      steps: [
        { label: "Identify first term a₁ and ratio r", mathLatex: "$a_1 = \\frac{1}{2}, \\qquad r = \\frac{1}{2}$", plainWhy: "Each term gets multiplied by 1/2, and |r| < 1 so the sum converges!" },
        { label: "Plug into infinite geometric formula", mathLatex: "$S_{\\infty} = \\frac{a_1}{1 - r} = \\frac{\\frac{1}{2}}{1 - \\frac{1}{2}}$", plainWhy: "Works whenever the ratio shrinks strictly between −1 and 1." },
        { label: "Simplify the fraction", mathLatex: "$\\frac{\\frac{1}{2}}{\\frac{1}{2}} = \\mathbf{1}$", plainWhy: "Half + quarter + eighth... fills up one whole square cleanly!" }
      ],
      answerLatex: "$$S_{\\infty} = 1$$",
      commonTrap: "If |r| ≥ 1 (like 1 + 2 + 4 + ...), the formula a/(1 − r) is INVALID — the sum diverges to ∞!"
    },
    "limits-potholes": {
      heroFormula: "$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} \\xrightarrow{0/0} \\text{Factor & Cancel Hole!}$$",
      title: "Patch a 0/0 Limit Pothole",
      problemLatex: "$$\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$$",
      steps: [
        { label: "Direct plug test gives 0/0", mathLatex: "$\\frac{3^2 - 9}{3 - 3} = \\frac{0}{0}$", plainWhy: "0/0 signals a removable pinhole, not infinity!" },
        { label: "Factor numerator & cancel (x − 3)", mathLatex: "$\\frac{(x - 3)(x + 3)}{x - 3} = x + 3 \\quad (x \\neq 3)$", plainWhy: "Everywhere close to x = 3, the common factor cancels." },
        { label: "Plug x = 3 into the patched expression", mathLatex: "$3 + 3 = \\mathbf{6}$", plainWhy: "Both left and right sides approach height 6 seamlessly." }
      ],
      answerLatex: "$$6$$",
      commonTrap: "0/0 does NOT equal 0 or 1 — factor, conjugate, or simplify first! And if Left Limit ≠ Right Limit, the limit DNE."
    },
    "derivatives-speedometer": {
      heroFormula: "$$\\frac{d}{dx}\\left[c x^n\\right] = c \\cdot n \\cdot x^{n-1}$$",
      title: "Instant Slope via Power Rule",
      problemLatex: "$$\\text{Find } \\frac{d}{dx}\\left[4x^3 - 5x + 7\\right]$$",
      steps: [
        { label: "Multiply coeff by exponent (4x³)", mathLatex: "$4 \\cdot 3 x^{3-1} = 12x^2$", plainWhy: "Drop the 3 in front to multiply, then reduce the power by 1." },
        { label: "Slope of linear term (−5x¹)", mathLatex: "$-5 \\cdot 1 x^{0} = -5$", plainWhy: "The slope of any straight line kx is simply k." },
        { label: "Constants have 0 slope", mathLatex: "$\\frac{d}{dx}\\left[7\\right] = 0 \\implies \\mathbf{12x^2 - 5}$", plainWhy: "A flat horizontal line y = 7 never rises or falls, so its rate of change is 0." }
      ],
      answerLatex: "$$12x^2 - 5$$",
      commonTrap: "Don't leave +7 at the end — derivatives of standalone constants always drop to 0!"
    },
    "chain-product-optimization": {
      heroFormula: "$$\\frac{d}{dx}\\left[f(g(x))\\right] = f'(g(x)) \\cdot g'(x), \\qquad f'(x) = 0 \\text{ locates peaks/valleys}$$",
      title: "Chain Rule: Peel Outside, Multiply Inside",
      problemLatex: "$$\\text{Differentiate } y = (3x + 2)^4$$",
      steps: [
        { label: "Differentiate outer shell (keep inside frozen!)", mathLatex: "$4(3x + 2)^3$", plainWhy: "Pretend (3x + 2) is one big sealed box: derivative of Box⁴ is 4·Box³." },
        { label: "Multiply by derivative of the inside", mathLatex: "$\\frac{d}{dx}\\left[3x + 2\\right] = 3$", plainWhy: "Chain Rule scales the slope by how fast the inside is moving." },
        { label: "Combine cleanly", mathLatex: "$4(3x + 2)^3 \\cdot 3 = \\mathbf{12(3x + 2)^3}$", plainWhy: "No need to expand a 4th power!" }
      ],
      answerLatex: "$$12(3x + 2)^3$$",
      commonTrap: "Never drop the inner derivative g'(x) — AND for optimization, check f''(x) < 0 (frown = Max) vs f''(x) > 0 (smile = Min)!"
    },
    "integrals-area": {
      heroFormula: "$$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C, \\qquad \\int_a^b f(x)\\,dx = F(b) - F(a)$$",
      title: "Exact Area Under a Curve",
      problemLatex: "$$\\int_1^3 3x^2\\,dx$$",
      steps: [
        { label: "Reverse the Power Rule (+1 exponent, divide)", mathLatex: "$F(x) = \\frac{3x^{2+1}}{2+1} = x^3$", plainWhy: "Check backwards: d/dx[x³] = 3x²!" },
        { label: "Evaluate at TOP (x = 3) & BOTTOM (x = 1)", mathLatex: "$F(3) = 3^3 = 27, \\qquad F(1) = 1^3 = 1$", plainWhy: "Always plug the upper bound first, lower bound second." },
        { label: "Subtract Top minus Bottom", mathLatex: "$27 - 1 = \\mathbf{26}$", plainWhy: "Gives the exact signed area swept between x = 1 and x = 3." }
      ],
      answerLatex: "$$26$$",
      commonTrap: "Always subtract F(top) − F(bottom), and include + C on indefinite integrals because any constant disappears on differentiation!"
    },
    "linear-algebra-vectors": {
      heroFormula: "$$\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2, \\qquad \\det\\begin{pmatrix}a & b \\\\ c & d\\end{pmatrix} = ad - bc$$",
      title: "2×2 Determinant & Dot-Product Orthogonality",
      problemLatex: "$$\\text{Check if } \\vec{u} = [2, 6] \\text{ and } \\vec{v} = [-3, 1] \\text{ are perpendicular}$$",
      steps: [
        { label: "Multiply matching coordinates", mathLatex: "$u_1 v_1 = 2(-3) = -6, \\qquad u_2 v_2 = 6(1) = 6$", plainWhy: "Dot product pairs x with x and y with y." },
        { label: "Add the products together", mathLatex: "$-6 + 6 = \\mathbf{0}$", plainWhy: "Dot product measures alignment: positive = same way, zero = 90°, negative = opposite." },
        { label: "Interpret zero dot product", mathLatex: "$\\vec{u} \\cdot \\vec{v} = 0 \\implies \\vec{u} \\perp \\vec{v} \\;(90^{\\circ})$", plainWhy: "Zero dot product is the fastest 90° detector in physics and graphics!" }
      ],
      answerLatex: "$$\\text{Perpendicular } (90^{\\circ})$$",
      commonTrap: "Dot product outputs a single SCALAR number, NOT a vector!"
    },
    "probability-bayes": {
      heroFormula: "$$P(A \\text{ and } B) = P(A)\\cdot P(B|A), \\qquad E[X] = \\sum x_i P(x_i)$$",
      title: "Expected Value of a Fair Game",
      problemLatex: "$$\\text{Win } 12 \\text{ on a } 6 \\text{ (prob } 1/6\\text{), else win } 0 \\implies E[X] = \\text{?}$$",
      steps: [
        { label: "Multiply each outcome by its probability", mathLatex: "$12 \\cdot \\frac{1}{6} + 0 \\cdot \\frac{5}{6}$", plainWhy: "Expected value is simply the long-run average payout per roll." },
        { label: "Simplify each weighted term", mathLatex: "$2 + 0 = \\mathbf{2}$", plainWhy: "Over 600 rolls, you win 12 about 100 times = 1200 total ÷ 600 = 2 per roll." },
        { label: "Compare to ticket cost", mathLatex: "$\\text{Fair ticket price} = 2$", plainWhy: "Pay less than E[X] = favorable; pay more than E[X] = house edge." }
      ],
      answerLatex: "$$E[X] = 2$$",
      commonTrap: "For 'at least one' problems, flip it: P(at least one) = 1 − P(none)!"
    },
    "abs-value-inequalities": {
      heroFormula: "$$|u| < r \\iff -r < u < r \\;(\\text{AND}), \\qquad |u| > r \\iff u < -r \\text{ or } u > r \\;(\\text{OR})$$",
      title: "Solve Absolute Value Bounds Without Guessing",
      problemLatex: "$$|2x - 4| \\le 6$$",
      steps: [
        { label: "≤ means 'Less thAND' Sandwich", mathLatex: "$-6 \\le 2x - 4 \\le 6$", plainWhy: "Everything within distance 6 of 0 sits inside one middle interval." },
        { label: "Add +4 to all THREE parts", mathLatex: "$-2 \\le 2x \\le 10$", plainWhy: "Apply the exact same shift to left, middle, and right." },
        { label: "Divide all three parts by 2", mathLatex: "$-1 \\le x \\le 5$", plainWhy: "Gives the complete interval from −1 to 5." }
      ],
      answerLatex: "$$-1 \\le x \\le 5$$",
      commonTrap: "If |expr| < negative number, STOP immediately — absolute value is never negative, so No Solution!"
    },
    "rational-radical-equations": {
      heroFormula: "$$\\text{VA}: \\text{Bottom}=0 \\quad | \\quad \\text{Same Degree HA}: y = \\frac{\\text{Lead}_{\\text{top}}}{\\text{Lead}_{\\text{bot}}}$$",
      title: "Asymptotes & Catching Extraneous Roots",
      problemLatex: "$$\\text{Solve } \\sqrt{x + 6} = x$$",
      steps: [
        { label: "Square both sides to remove √", mathLatex: "$x + 6 = x^2 \\implies x^2 - x - 6 = 0$", plainWhy: "Turns a radical equation into a clean quadratic." },
        { label: "Factor quadratic candidates", mathLatex: "$(x - 3)(x + 2) = 0 \\implies x = 3 \\text{ or } x = -2$", plainWhy: "Squaring can introduce fake 'extraneous' solutions." },
        { label: "Plug BOTH into original √(x+6) = x", mathLatex: "$\\sqrt{-2+6} = 2 \\neq -2 \\;(\\text{fake!}), \\quad \\sqrt{3+6} = 3 \\;(\\text{valid!})$", plainWhy: "Principal √ always outputs ≥ 0, so −2 fails." }
      ],
      answerLatex: "$$x = 3 \\text{ only}$$",
      commonTrap: "NEVER submit radical equation answers without plugging them back into the original!"
    },
    "physics-kinematics": {
      heroFormula: "$$v = v_0 + at, \\qquad d = v_0 t + \\frac{1}{2}at^2, \\qquad v^2 = v_0^2 + 2ad$$",
      title: "Free-Fall Distance From Average Speed",
      problemLatex: "$$\\text{Drop a rock from rest } (v_0 = 0,\\; g = 10\\text{ m/s}^2)\\text{ for } t = 3\\text{ s} \\implies d = \\text{?}$$",
      steps: [
        { label: "Find final speed after 3 s", mathLatex: "$v = 0 + (10)(3) = 30\\text{ m/s}$", plainWhy: "Gravity adds 10 m/s every single second." },
        { label: "Use average speed (that's where ½ comes from!)", mathLatex: "$v_{\\text{avg}} = \\frac{0 + 30}{2} = 15\\text{ m/s}$", plainWhy: "The rock started at 0 and ended at 30, so its average speed is half the peak." },
        { label: "Distance = Average Speed × Time", mathLatex: "$d = 15 \\times 3 = \\frac{1}{2}(10)(3)^2 = \\mathbf{45\\text{ m}}$", plainWhy: "Matches the area of the velocity-time triangle!" }
      ],
      answerLatex: "$$d = 45\\text{ m}$$",
      commonTrap: "Don't multiply final speed 30 × 3 = 90 m! Constant acceleration starts from 0, so you MUST take ½gt²."
    },
    "physics-newton-forces": {
      heroFormula: "$$F_{\\text{net}} = m \\cdot a, \\qquad a = \\frac{\\Delta v}{t}, \\qquad W = m \\cdot g$$",
      title: "Unit-Safe Force & Deceleration",
      problemLatex: "$$2{,}000\\text{ g block at } 36\\text{ km/h stops in } 5\\text{ s} \\implies F = \\text{?}$$",
      steps: [
        { label: "Convert g → kg and km/h → m/s", mathLatex: "$m = \\frac{2000}{1000} = 2\\text{ kg}, \\quad v = \\frac{36}{3.6} = 10\\text{ m/s}$", plainWhy: "SI units require kg and m/s before touching F = ma." },
        { label: "Find acceleration from speed change", mathLatex: "$a = \\frac{\\Delta v}{t} = \\frac{10\\text{ m/s}}{5\\text{ s}} = 2\\text{ m/s}^2$", plainWhy: "Loses 2 m/s of speed every second." },
        { label: "Multiply mass × acceleration", mathLatex: "$F = m \\cdot a = 2\\text{ kg} \\times 2\\text{ m/s}^2 = \\mathbf{4\\text{ N}}$", plainWhy: "1 Newton = 1 kg·m/s²." }
      ],
      answerLatex: "$$4\\text{ N}$$",
      commonTrap: "Dividing km/h by 3.6 converts speed straight to m/s — always check SI units first!"
    },
    "physics-energy-momentum": {
      heroFormula: "$$KE = \\frac{1}{2}mv^2, \\qquad PE = mgh, \\qquad P = \\frac{W}{t}, \\qquad p = mv$$",
      title: "Conservation of Energy & Power Shortcut",
      problemLatex: "$$2\\text{ kg ball drops from } h = 5\\text{ m} \\;(g = 10\\text{ m/s}^2) \\implies \\text{Bottom speed } v = \\text{?}$$",
      steps: [
        { label: "Set top PE equal to bottom KE", mathLatex: "$mgh = \\frac{1}{2}mv^2$", plainWhy: "Without air drag, 100% of height energy converts into motion energy." },
        { label: "Cancel mass m from both sides!", mathLatex: "$v = \\sqrt{2gh}$", plainWhy: "A feather and a bowling ball hit at the exact same speed in vacuum!" },
        { label: "Plug g = 10 and h = 5", mathLatex: "$v = \\sqrt{2(10)(5)} = \\sqrt{100} = \\mathbf{10\\text{ m/s}}$", plainWhy: "Double check: PE = 2·10·5 = 100 J and KE = ½·2·10² = 100 J." }
      ],
      answerLatex: "$$v = 10\\text{ m/s}$$",
      commonTrap: "Doubling speed quadruples KE (2² = 4×), whereas doubling speed only doubles momentum (p = mv)!"
    },
    "physics-waves-electricity": {
      heroFormula: "$$v = f\\lambda, \\qquad V = IR, \\qquad P = IV = I^2 R = \\frac{V^2}{R}$$",
      title: "Ohm's Law + Parallel Resistors in Two Steps",
      problemLatex: "$$12\\text{ V battery across two } 6\\,\\Omega \\text{ resistors in parallel} \\implies I_{\\text{total}} = \\text{?}$$",
      steps: [
        { label: "Combine parallel resistors (reciprocals!)", mathLatex: "$\\frac{1}{R_{\\text{eq}}} = \\frac{1}{6} + \\frac{1}{6} = \\frac{2}{6} \\implies R_{\\text{eq}} = 3\\,\\Omega$", plainWhy: "Two identical lanes cut traffic resistance in HALF!" },
        { label: "Apply Ohm's Law V = IR", mathLatex: "$I_{\\text{total}} = \\frac{V}{R_{\\text{eq}}} = \\frac{12\\text{ V}}{3\\,\\Omega} = \\mathbf{4\\text{ A}}$", plainWhy: "Each 6 Ω branch pulls 12/6 = 2 A, so total current is 2 + 2 = 4 A." },
        { label: "Bonus Power check", mathLatex: "$P = IV = (4\\text{ A})(12\\text{ V}) = 48\\text{ W}$", plainWhy: "Watts = Amps × Volts." }
      ],
      answerLatex: "$$I_{\\text{total}} = 4\\text{ A}$$",
      commonTrap: "Adding a parallel resistor ALWAYS lowers total resistance and INCREASES total current!"
    },
    "chem-moles-stoich": {
      heroFormula: "$$n = \\frac{\\text{mass (g)}}{\\text{Molar Mass (g/mol)}}, \\qquad M = \\frac{\\text{mol solute}}{\\text{L solution}}$$",
      title: "Grams → Moles → Molarity Bridge",
      problemLatex: "$$\\text{Dissolve } 20\\text{ g NaOH } (40\\text{ g/mol}) \\text{ into } 0.25\\text{ L solution} \\implies M = \\text{?}$$",
      steps: [
        { label: "Convert grams to moles first", mathLatex: "$n = \\frac{20\\text{ g}}{40\\text{ g/mol}} = 0.5\\text{ mol}$", plainWhy: "Chemists count in moles, never directly in grams." },
        { label: "Divide moles by Liters of solution", mathLatex: "$M = \\frac{0.5\\text{ mol}}{0.25\\text{ L}} = \\mathbf{2.0\\text{ M}}$", plainWhy: "Dividing by 0.25 (one quarter) multiplies by 4." },
        { label: "Double check units", mathLatex: "$2.0\\text{ mol/L} \\times 0.25\\text{ L} = 0.5\\text{ mol} \\;\\checkmark$", plainWhy: "Remember: convert mL to L by dividing by 1,000 before plugging in!" }
      ],
      answerLatex: "$$M = 2.0\\text{ M}$$",
      commonTrap: "NEVER plug mL directly into M = mol/L — divide mL by 1,000 first!"
    },
    "chem-acids-bases-ph": {
      heroFormula: "$$\\text{pH} = -\\log_{10}[\\text{H}^+], \\qquad \\text{pH} + \\text{pOH} = 14$$",
      title: "Powers of 10 Along the pH Scale",
      problemLatex: "$$10\\text{ mL acid at } \\text{pH} = 1 \\text{ diluted to } 1{,}000\\text{ mL} \\implies \\text{New pH?}$$",
      steps: [
        { label: "Compute dilution factor", mathLatex: "$\\frac{V_2}{V_1} = \\frac{1000\\text{ mL}}{10\\text{ mL}} = 100 = 10^2$", plainWhy: "Each factor of 10 lowers [H⁺] tenfold." },
        { label: "Convert 10² into pH steps", mathLatex: "$\\Delta \\text{pH} = +\\log_{10}(100) = +2$", plainWhy: "Diluting an acid pushes pH UP toward neutral 7." },
        { label: "Add step shift to starting pH", mathLatex: "$1 + 2 = \\mathbf{3}$", plainWhy: "pH 1 → pH 3 means 100× less acidic." }
      ],
      answerLatex: "$$\\text{pH} = 3$$",
      commonTrap: "Dilution adds log steps (+2), it NEVER multiplies or divides pH!"
    },
    "bio-dna-rna-proteins": {
      heroFormula: "$$\\text{DNA } (A\\text{–}T,\\; G\\text{–}C) \\xrightarrow{\\text{Transcription}} \\text{mRNA } (A\\text{–}U,\\; G\\text{–}C) \\xrightarrow{\\text{Translation}} \\text{Protein (3 bases = 1 codon)}$$",
      title: "Transcribe DNA to mRNA & Count Amino Acids",
      problemLatex: "$$\\text{DNA template: } 3'\\text{-TAC GGA-5'} \\implies \\text{mRNA & Amino Acid count?}$$",
      steps: [
        { label: "Pair every base (Swap T → U in RNA!)", mathLatex: "$\\text{T}\\to\\text{A},\\; \\text{A}\\to\\text{U},\\; \\text{C}\\to\\text{G},\\; \\text{G}\\to\\text{C} \\implies 5'\\text{-AUG CCU-3'}$", plainWhy: "RNA never uses Thymine (T); Adenine on DNA pairs with Uracil (U) in mRNA." },
        { label: "Slice mRNA into 3-letter Codons", mathLatex: "$\\text{AUG} \\;|\\; \\text{CCU} \\implies \\mathbf{2\\text{ codons}}$", plainWhy: "Ribosomes read mRNA 3 letters at a time (AUG = Start / Methionine)." },
        { label: "Count resulting amino acids", mathLatex: "$\\frac{6\\text{ bases}}{3} = \\mathbf{2\\text{ amino acids}}$", plainWhy: "Each non-stop codon brings in 1 tRNA carrying 1 amino acid." }
      ],
      answerLatex: "$$\\text{mRNA: AUG-CCU (2 amino acids)}$$",
      commonTrap: "DNA replication is semi-conservative (1 old strand + 1 new strand), and RNA NEVER contains T!"
    },
    "bio-pedigrees-sex-linked": {
      heroFormula: "$$p + q = 1, \\qquad p^2 + 2pq + q^2 = 1$$",
      title: "Hardy-Weinberg Carrier Formula Step-by-Step",
      problemLatex: "$$16\\% \\text{ show recessive trait } (q^2 = 0.16) \\implies \\text{Carriers } (2pq) = \\text{?}$$",
      steps: [
        { label: "ALWAYS start from recessive q² and take √", mathLatex: "$q = \\sqrt{q^2} = \\sqrt{0.16} = 0.4$", plainWhy: "Only homozygous recessive individuals (aa) reveal q² directly." },
        { label: "Find dominant allele frequency p", mathLatex: "$p = 1 - q = 1 - 0.4 = 0.6$", plainWhy: "Only two alleles exist, so p + q = 100%." },
        { label: "Plug p and q into carrier term 2pq", mathLatex: "$2pq = 2(0.6)(0.4) = \\mathbf{0.48 = 48\\%}$", plainWhy: "Almost half the population carries a hidden recessive copy!" }
      ],
      answerLatex: "$$48\\% \\text{ Carriers}$$",
      commonTrap: "NEVER confuse q² (recessive phenotype %, e.g. 0.16) with q (allele frequency 0.4)!"
    },
    "verbal-grammar-syntax": {
      heroFormula: "$$\\text{Subject} \\; \\cancel{[\\text{of the / along with ...}]} \\; + \\; \\text{Verb}$$",
      title: "Cross Out Prepositional Interrupters",
      problemLatex: "$$\\text{Pick verb: } \\textit{The stack [of dusty coins] (is / are) missing.}$$",
      steps: [
        { label: "Bracket & cross out prepositional phrases", mathLatex: "$\\text{The stack } \\cancel{\\text{[of dusty coins]}} \\text{ \\_\\_\\_ missing.}$", plainWhy: "'Coins' is trapped inside 'of...', so it CANNOT be the subject." },
        { label: "Isolate the bare Core Subject", mathLatex: "$\\text{Core Subject} = \\text{'The stack'} \\;(\\text{Singular})$", plainWhy: "Read without clutter: 'The stack IS missing.'" },
        { label: "Match singular subject to singular verb", mathLatex: "$\\text{The stack } \\mathbf{is} \\text{ missing.}$", plainWhy: "Same trick defeats 'Each / Neither / Everyone' exam traps!" }
      ],
      answerLatex: "$$\\text{is}$$",
      commonTrap: "Never match a verb to a plural noun hiding inside an 'of...' or 'along with...' phrase!"
    },
    "verbal-reading-inference": {
      heroFormula: "$$\\text{Valid Inference} = \\text{100\\% Forced by Passage} \\;\\neq\\; \\text{Outside Guess}$$",
      title: "Strict Evidence Filter (Zero Outside Assumptions)",
      problemLatex: "$$\\textit{Passage: 'Sales of raincoats doubled every month it rained more than 10 days.'}$$",
      steps: [
        { label: "Underline the EXACT boundary words", mathLatex: "$\\text{'doubled'} \\quad + \\quad \\text{'more than 10 days of rain'}$", plainWhy: "Notice it mentions ONLY raincoat sales and rain days — nothing about umbrellas or profits." },
        { label: "Eliminate extreme or outside claims", mathLatex: "$\\cancel{\\text{'Umbrellas also doubled'}} \\quad | \\quad \\cancel{\\text{'Profit doubled'}}$", plainWhy: "Outside knowledge (umbrellas) or unstated facts (profit) are classic exam traps." },
        { label: "Keep only what the text strictly proves", mathLatex: "$\\mathbf{\\text{Raincoat sales rose strongly during wet months (>10 rain days).}}$", plainWhy: "A true inference is a tiny, indisputable step directly supported by the text." }
      ],
      answerLatex: "$$\\text{Stick strictly to passage evidence!}$$",
      commonTrap: "Watch out for extreme words ('always', 'never', 'proves') and correlation ≠ causation leaps!"
    }
  };

  function registerWorkedExamples(map) {
    if (!map || typeof map !== "object") return;
    Object.keys(map).forEach((k) => {
      CURATED_EXAMPLES[k] = map[k];
    });
  }

  function buildFallbackWorkedExample(node) {
    const ms = node.microSteps || [];
    const step0 = ms[0] || { label: "Core Pattern", text: node.easyTruth || "" };
    const step1 = ms[1] || { label: "Apply the Rule", text: node.cheatCode || "" };
    const step2 = ms[2] || { label: "Verify & Lock In", text: node.cheatCode || node.easyTruth || "" };

    return {
      heroFormula: node.cheatCode || node.easyTruth,
      title: `Concept Walkthrough: ${node.title}`,
      problemLatex: node.tagline || node.title,
      steps: [
        {
          label: step0.label || "1. Spot the Core Idea",
          mathLatex: step0.text,
          plainWhy: "Anchor on this mental model first before touching any calculation or choice."
        },
        {
          label: step1.label || "2. Apply the Shortcut",
          mathLatex: step1.text,
          plainWhy: "This is the high-leverage pattern that turns exam problems into 5-second reads."
        },
        {
          label: step2.label || "3. Lock In the Check",
          mathLatex: step2.text,
          plainWhy: "Run this quick sanity check before locking in your answer."
        }
      ],
      answerLatex: node.cheatCode || node.easyTruth,
      commonTrap: node.scaryVersion ? `Don't get thrown by textbook phrasing like "${node.scaryVersion}" — translate it straight into plain truth!` : node.cheatCode
    };
  }

  function getWorkedExample(node) {
    const cur = node && CURATED_EXAMPLES[node.id];
    if (cur) return cur;
    return buildFallbackWorkedExample(node || { title: "Lesson", easyTruth: "", cheatCode: "", microSteps: [], questions: [] });
  }

  function getTutorialSlides(node) {
    const ms = node.microSteps || [];
    const worked = getWorkedExample(node);
    const hasCurated = !!(node && CURATED_EXAMPLES[node.id]);
    const step1 = ms[0] || { label: "Core Concept", text: node.easyTruth };
    const step2 = ms[1] || { label: "Pattern Shortcut", text: node.cheatCode };
    const step3 = ms[2] || null;

    // Avoid repeating step1.text verbatim on Slide 2 when using fallback worked examples
    const slide2Highlight = hasCurated && worked.steps[0]
      ? worked.steps[0].mathLatex
      : (ms[3] ? ms[3].text : worked.heroFormula);
    const slide2Why = hasCurated && worked.steps[0]
      ? worked.steps[0].plainWhy
      : "Keep this key relationship front of mind — everything else in this skill flows from it.";

    return [
      {
        id: "secret",
        pill: "1. Secret",
        kicker: "STEP 1 OF 5 · THE CORE INSIGHT",
        title: "See Why It's Actually Simple",
        heroFormula: worked.heroFormula || node.cheatCode,
        easyTruth: node.easyTruth,
        scaryVersion: node.scaryVersion,
        tagline: node.tagline
      },
      {
        id: "core",
        pill: "2. Core Step",
        kicker: "STEP 2 OF 5 · FIRST BUILDING BLOCK",
        title: step1.label,
        bodyText: step1.text,
        highlightFormula: slide2Highlight,
        highlightWhy: slide2Why
      },
      {
        id: "shortcut",
        pill: "3. Shortcut",
        kicker: "STEP 3 OF 5 · KEY RULES & SHORTCUTS",
        title: step2.label,
        stepA: step2,
        stepB: step3,
        cheatCode: node.cheatCode
      },
      {
        id: "example",
        pill: "4. Example",
        kicker: "STEP 4 OF 5 · WORKED EXAMPLE",
        title: worked.title,
        worked: worked
      },
      {
        id: "lab",
        pill: "5. Lab & Quiz",
        kicker: "STEP 5 OF 5 · INTERACTIVE LAB",
        title: "Explore Live, Then Test Yourself",
        subtitle: "Adjust the interactive model below to build intuition — then start the 5-question check."
      }
    ];
  }

  root.MATHLINGO_LATEX = {
    formatMath,
    getWorkedExample,
    getTutorialSlides,
    registerWorkedExamples
  };
})(typeof window !== "undefined" ? window : globalThis);
