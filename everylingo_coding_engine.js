// EveryLingo Code Forge Engine — Offline Syntax Highlighter, Real Mini-Python Interpreter (w/ Live Trace),
// Sandboxed JavaScript Test Runner, Relational SQL Query Engine & Virtual Linux/Git Shell Runtime.
(function (root) {
  "use strict";

  function escHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function deepEqual(a, b) {
    if (a === b) return true;
    if (typeof a === "number" && typeof b === "number" && Number.isNaN(a) && Number.isNaN(b)) return true;
    if (typeof a === "number" && typeof b === "number" && Math.abs(a - b) < 1e-6) return true;
    if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    if (Array.isArray(a)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    }
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) {
      if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
      if (!deepEqual(a[k], b[k])) return false;
    }
    return true;
  }

  function formatValue(v) {
    if (v === undefined) return "undefined";
    if (v === null) return "None";
    if (typeof v === "boolean") return v ? "True" : "False";
    if (typeof v === "string") return JSON.stringify(v);
    if (Array.isArray(v)) return "[" + v.map(formatValue).join(", ") + "]";
    if (v instanceof Set) return "{" + Array.from(v).map(formatValue).join(", ") + "}";
    if (typeof v === "object") {
      if (v.__pyClass) return `<${v.__pyClass} instance>`;
      return "{" + Object.entries(v).filter(([k]) => !k.startsWith("__py")).map(([k, val]) => `${JSON.stringify(k)}: ${formatValue(val)}`).join(", ") + "}";
    }
    return String(v);
  }

  function formatJsValue(v) {
    if (v === undefined) return "undefined";
    if (v === null) return "null";
    if (typeof v === "string") return JSON.stringify(v);
    if (typeof v === "object") {
      try { return JSON.stringify(v); } catch (_e) { return String(v); }
    }
    return String(v);
  }

  // ==================== 1. SYNTAX HIGHLIGHTER ====================
  function detectLanguage(code, hint) {
    if (hint) {
      const h = String(hint).toLowerCase();
      if (h === "py" || h === "python") return "python";
      if (h === "js" || h === "javascript" || h === "ts" || h === "typescript") return "javascript";
      if (h === "sql") return "sql";
      if (h === "html" || h === "xml") return "html";
      if (h === "css") return "css";
      if (h === "sh" || h === "bash" || h === "shell" || h === "git") return "shell";
    }
    const s = String(code || "");
    if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|WITH)\b/im.test(s) && /\bFROM\b/im.test(s)) return "sql";
    if (/<[a-z][a-z0-9-]*(\s|>)/i.test(s) && /<\/[a-z]+>/i.test(s)) return "html";
    if (/^\s*(\$|git |cd |ls |mkdir |grep |chmod |curl |docker )/m.test(s)) return "shell";
    if (/\b(def |elif |lambda |print\(|range\(|None|True|False)\b/.test(s)) return "python";
    if (/\{[\s\S]*?:[\s\S]*?;[\s\S]*?\}/.test(s) && !/\b(function|const|let|var|return)\b/.test(s)) return "css";
    return "javascript";
  }

  function highlightCode(code, langHint) {
    const src = String(code == null ? "" : code);
    const lang = detectLanguage(src, langHint);
    const tokens = [];
    const encodeIdx = (n) => String(n).replace(/\d/g, (d) => String.fromCharCode(0xE110 + Number(d)));
    const decodeIdx = (s) => Number(s.replace(/[\uE110-\uE119]/g, (c) => String(c.charCodeAt(0) - 0xE110)));
    const stash = (cls, raw) => {
      const idx = tokens.length;
      tokens.push(`<span class="ml-tok-${cls}">${escHtml(raw)}</span>`);
      return `\uE100${encodeIdx(idx)}\uE101`;
    };
    const restore = (text) => {
      let out = escHtml(text);
      let guard = 0;
      while (/\uE100[\uE110-\uE119]+\uE101/.test(out) && guard++ < 8) {
        out = out.replace(/\uE100([\uE110-\uE119]+)\uE101/g, (_m, enc) => tokens[decodeIdx(enc)]);
      }
      return out;
    };

    let work = src;

    if (lang === "html") {
      work = work.replace(/<!--[\s\S]*?-->/g, (m) => stash("com", m));
      work = work.replace(/<\/?[a-zA-Z][a-zA-Z0-9-]*(\s[^<>]*?)?\/?>/g, (tag) => {
        const inner = tag.replace(/([a-zA-Z-:]+)=("[^"]*"|'[^']*')/g, (_m, attr, val) => {
          return stash("attr", attr) + "=" + stash("str", val);
        });
        const colored = inner.replace(/^(<\/?[a-zA-Z][a-zA-Z0-9-]*)/, (t) => stash("tag", t));
        return colored;
      });
      return restore(work);
    }

    if (lang === "css") {
      work = work.replace(/(\/\*[\s\S]*?\*\/)|((["'])(?:\\.|(?!\3)[^\\\n])*\3)/g, (m, com) => stash(com ? "com" : "str", m));
      work = work.replace(/([a-z-]+)(\s*:)/gi, (_m, prop, colon) => stash("attr", prop) + colon);
      work = work.replace(/#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|fr|ms|s|deg)?\b/g, (m) => stash("num", m));
      work = work.replace(/^([.#@]?[a-zA-Z0-9_:*\->\s,[\]="']+)(?=\s*\{)/gm, (m) => stash("tag", m));
      return restore(work);
    }

    // Comments & strings in a single pass so neither swallows the other's placeholder
    if (lang === "python" || lang === "shell") {
      work = work.replace(/(f?r?"""[\s\S]*?"""|f?r?'''[\s\S]*?'''|f?r?"(?:\\.|[^"\\\n])*"|f?r?'(?:\\.|[^'\\\n])*')|(#[^\n]*)/g, (m, strTok) => stash(strTok ? "str" : "com", m));
    } else if (lang === "sql") {
      work = work.replace(/('(?:''|[^'])*')|(--[^\n]*|\/\*[\s\S]*?\*\/)/g, (m, strTok) => stash(strTok ? "str" : "com", m));
    } else {
      work = work.replace(/(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')/g, (m, comTok) => stash(comTok ? "com" : "str", m));
    }

    // Numbers
    work = work.replace(/\b0x[0-9a-fA-F]+\b|\b0b[01]+\b|\b\d+(?:\.\d+)?\b/g, (m) => stash("num", m));

    if (lang === "python") {
      work = work.replace(/\b(def|class|return|if|elif|else|for|while|in|not|and|or|is|break|continue|pass|import|from|as|try|except|finally|raise|with|yield|lambda|global|nonlocal|async|await)\b/g, (m) => stash("kw", m));
      work = work.replace(/\b(True|False|None|self|cls|int|str|float|bool|list|dict|set|tuple)\b/g, (m) => stash("type", m));
      work = work.replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g, (m) => stash("fn", m));
    } else if (lang === "sql") {
      work = work.replace(/\b(SELECT|DISTINCT|FROM|WHERE|INNER|LEFT|RIGHT|OUTER|FULL|JOIN|ON|GROUP|BY|HAVING|ORDER|ASC|DESC|LIMIT|OFFSET|AS|AND|OR|NOT|IN|IS|NULL|LIKE|BETWEEN|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|BEGIN|COMMIT|ROLLBACK|WITH|CASE|WHEN|THEN|ELSE|END)\b/gi, (m) => stash("kw", m));
      work = work.replace(/\b(COUNT|SUM|AVG|MIN|MAX|COALESCE|LOWER|UPPER|LENGTH|ROUND)\b/gi, (m) => stash("fn", m));
    } else if (lang === "shell") {
      work = work.replace(/\b(git|cd|ls|pwd|mkdir|touch|cat|grep|echo|chmod|rm|mv|cp|curl|docker|npm|node|python3|sudo|export|wc|head|tail|sort|uniq|find|ps|kill)\b/g, (m) => stash("kw", m));
      work = work.replace(/\b(init|status|add|commit|branch|checkout|switch|merge|rebase|log|diff|pull|push|clone|reset|stash)\b/g, (m) => stash("fn", m));
      work = work.replace(/(^|\s)(--?[a-zA-Z0-9-]+)/g, (_m, sp, fl) => sp + stash("attr", fl));
    } else {
      work = work.replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|default|break|continue|class|extends|new|this|super|async|await|try|catch|finally|throw|import|export|from|of|in|typeof|instanceof|type|interface|enum|readonly|implements|private|public)\b/g, (m) => stash("kw", m));
      work = work.replace(/\b(true|false|null|undefined|NaN|Infinity|Promise|Array|Map|Set|Object|Number|String|Boolean|Error|Math|JSON|console|Date)\b/g, (m) => stash("type", m));
      work = work.replace(/\b([a-zA-Z_$][\w$]*)(?=\s*\()/g, (m) => stash("fn", m));
    }

    return restore(work);
  }

  function renderCodeCardHtml(code, langHint, opts) {
    const o = opts || {};
    const lang = detectLanguage(code, langHint);
    const lines = String(code || "").replace(/\r/g, "").split("\n");
    const highlighted = highlightCode(code, lang).split("\n");
    const langLabels = {
      python: "Python",
      javascript: "JavaScript / TS",
      sql: "SQL",
      html: "HTML",
      css: "CSS",
      shell: "Terminal / Git"
    };
    const label = o.fileName || langLabels[lang] || "Code";
    const rows = highlighted.map((lnHtml, idx) =>
      `<div class="ml-code-ln"><span class="ml-code-lnum">${idx + 1}</span><span class="ml-code-ltxt">${lnHtml || " "}</span></div>`
    ).join("");
    return `
      <div class="ml-code-card" data-code-lang="${lang}">
        <div class="ml-code-card-head">
          <div class="ml-code-card-meta">
            <span class="ml-code-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="ml-code-file">${escHtml(label)}</span>
          </div>
          <div class="ml-code-card-actions">
            <span class="ml-code-lang-pill">${escHtml(lang.toUpperCase())}</span>
            ${o.showCopy !== false ? `<button type="button" class="ml-code-copy-btn" data-copy-code="${escHtml(String(code || ""))}">Copy</button>` : ""}
          </div>
        </div>
        <div class="ml-code-card-body"><code>${rows}</code></div>
      </div>
    `;
  }

  // ==================== 2. REAL MINI-PYTHON INTERPRETER + LIVE TRACER ====================
  function splitTopLevel(str, sep) {
    const out = [];
    let cur = "";
    let depth = 0;
    let quote = null;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (quote) {
        cur += ch;
        if (ch === quote && str[i - 1] !== "\\") quote = null;
        continue;
      }
      if (ch === "'" || ch === "\"") {
        quote = ch;
        cur += ch;
        continue;
      }
      if (ch === "(" || ch === "[" || ch === "{") {
        depth++;
        cur += ch;
        continue;
      }
      if (ch === ")" || ch === "]" || ch === "}") {
        depth--;
        cur += ch;
        continue;
      }
      if (depth === 0 && str.slice(i, i + sep.length) === sep) {
        out.push(cur.trim());
        cur = "";
        i += sep.length - 1;
        continue;
      }
      cur += ch;
    }
    if (cur.trim().length > 0 || out.length > 0) {
      if (cur.trim().length > 0) out.push(cur.trim());
    }
    return out;
  }

  function stripPyComment(line) {
    let quote = null;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (quote) {
        if (ch === quote && line[i - 1] !== "\\") quote = null;
      } else if (ch === "'" || ch === "\"") {
        quote = ch;
      } else if (ch === "#") {
        return line.slice(0, i);
      }
    }
    return line;
  }

  function transformPyExpr(exprStr) {
    // Protect string literals (including f-strings) before regex transforms
    const strStash = [];
    let s = "";
    let i = 0;
    while (i < exprStr.length) {
      const ch = exprStr[i];
      const isFStr = (ch === "f" || ch === "F") && (exprStr[i + 1] === "'" || exprStr[i + 1] === "\"");
      if (isFStr || ch === "'" || ch === "\"") {
        const quote = isFStr ? exprStr[i + 1] : ch;
        let j = isFStr ? i + 2 : i + 1;
        let body = "";
        while (j < exprStr.length) {
          if (exprStr[j] === "\\" && j + 1 < exprStr.length) {
            body += exprStr[j] + exprStr[j + 1];
            j += 2;
            continue;
          }
          if (exprStr[j] === quote) {
            j++;
            break;
          }
          body += exprStr[j];
          j++;
        }
        const tokenIdx = strStash.length;
        if (isFStr) {
          // Convert Python f-string into JS template literal with transformed inner expressions
          const tpl = body
            .replace(/`/g, "\\`")
            .replace(/\$\{/g, "\\${")
            .replace(/\{([^{}]+)\}/g, (_m, inner) => `\${__pyStr(${transformPyExpr(inner.trim())})}`);
          strStash.push("`" + tpl + "`");
        } else {
          strStash.push(quote + body + quote);
        }
        s += `__STR_${tokenIdx}__`;
        i = j;
      } else {
        s += ch;
        i++;
      }
    }

    // Handle Python list comprehension: [expr for v in iter if cond] or [expr for v in iter]
    let compGuard = 0;
    while (/\[[^\]]+\bfor\b[^\]]+\bin\b[^\]]+\]/.test(s) && compGuard < 8) {
      compGuard++;
      s = s.replace(/\[([^\[\]]+?)\s+for\s+([a-zA-Z_]\w*(?:\s*,\s*[a-zA-Z_]\w*)?)\s+in\s+([^\[\]]+?)(?:\s+if\s+([^\[\]]+))?\]/, (_m, body, vars, iterExpr, condExpr) => {
        const vList = vars.split(",").map((x) => x.trim());
        const bind = vList.length === 2
          ? `const [${vList[0]}, ${vList[1]}] = __item;`
          : `const ${vList[0]} = __item;`;
        const cond = condExpr ? `if (!(${transformPyExpr(condExpr)})) continue;` : "";
        return `((__it) => { const __res = []; for (const __item of __pyIter(__it)) { ${bind} ${cond} __res.push(${transformPyExpr(body)}); } return __res; })(${transformPyExpr(iterExpr)})`;
      });
    }

    // Handle Python ternary: a if cond else b (top-level simple form)
    const ternMatch = s.match(/^(.+?)\s+if\s+(.+?)\s+else\s+(.+)$/);
    if (ternMatch && !s.includes("=>")) {
      s = `((${transformPyExpr(ternMatch[2])}) ? (${transformPyExpr(ternMatch[1])}) : (${transformPyExpr(ternMatch[3])}))`;
    }

    // Replace Python `not in` and `in` operators
    s = s.replace(/([a-zA-Z0-9_.)\]"]+)\s+not\s+in\s+([a-zA-Z0-9_.(\[__STR]+)/g, "(!__pyIn($1, $2))");
    s = s.replace(/([a-zA-Z0-9_.)\]"]+)\s+in\s+([a-zA-Z0-9_.(\[__STR]+)/g, "(__pyIn($1, $2))");

    // Replace Python slicing & negative indexing: target[spec]
    // Process bracket expressions cleanly
    let idxGuard = 0;
    while (idxGuard < 20) {
      const m = s.match(/\b([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\[([^\[\]]+)\]/);
      if (!m) break;
      idxGuard++;
      const target = m[1];
      const spec = m[2].trim();
      let repl;
      if (spec.includes(":")) {
        const parts = spec.split(":").map((p) => p.trim() === "" ? "null" : transformPyExpr(p.trim()));
        while (parts.length < 3) parts.push("null");
        repl = `__pySlice(${target}, ${parts[0]}, ${parts[1]}, ${parts[2]})`;
      } else {
        repl = `__pyIndex(${target}, ${transformPyExpr(spec)})`;
      }
      s = s.slice(0, m.index) + repl + s.slice(m.index + m[0].length);
    }

    // Floor division a // b
    let fdGuard = 0;
    while (s.includes("//") && fdGuard < 14) {
      fdGuard++;
      const next = s.replace(/([a-zA-Z0-9_.)\]]+|\([^()]+\))\s*\/\/\s*([a-zA-Z0-9_.(\-]+|\([^()]+\))/, "Math.floor(($1)/($2))");
      if (next === s) break;
      s = next;
    }

    // Chained comparisons like `0 <= x < 10` or `a < b <= c`
    s = s.replace(/(\b[a-zA-Z0-9_.)]+)\s*(<=|>=|<|>)\s*(\b[a-zA-Z0-9_.)]+)\s*(<=|>=|<|>)\s*(\b[a-zA-Z0-9_.)]+)/g, "(($1 $2 $3) && ($3 $4 $5))");

    // Python keywords / operators -> JS
    s = s
      .replace(/\bTrue\b/g, "true")
      .replace(/\bFalse\b/g, "false")
      .replace(/\bNone\b/g, "null")
      .replace(/\bis\s+not\b/g, "!==")
      .replace(/\bis\b/g, "===")
      .replace(/\band\b/g, "&&")
      .replace(/\bor\b/g, "||")
      .replace(/\bnot\s+(\([^()]+\)|[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*|\([^()]*\))*)/g, "(!__pyBool($1))")
      .replace(/\bnot\b/g, "!")
      .replace(/==/g, "===__EQ__")
      .replace(/!==/g, "!==__NEQ__")
      .replace(/!=/g, "!==__NEQ__");

    // Replace top-level == and != with deep Python value equality __pyEq
    function rewriteEq(str) {
      // Split by && and || first so `a == b && c == d` rewrites each arm cleanly
      const orParts = splitTopLevel(str, "||");
      if (orParts.length > 1) return orParts.map(rewriteEq).join(" || ");
      const andParts = splitTopLevel(str, "&&");
      if (andParts.length > 1) return andParts.map(rewriteEq).join(" && ");
      const neqParts = splitTopLevel(str, "!==");
      if (neqParts.length === 2) return `(!__pyEq(${neqParts[0]}, ${neqParts[1]}))`;
      const eqParts = splitTopLevel(str, "===");
      if (eqParts.length === 2) return `(__pyEq(${eqParts[0]}, ${eqParts[1]}))`;
      return str;
    }

    // Convert ===__EQ__ / !==__NEQ__ back and rewrite value equality
    s = s.replace(/===__EQ__/g, "===").replace(/!==__NEQ__/g, "!==");
    s = rewriteEq(s);

    // Python method shims
    s = s.replace(/\.append\(/g, ".__pyAppend(")
      .replace(/\.extend\(/g, ".__pyExtend(")
      .replace(/\.lower\(/g, ".__pyLower(")
      .replace(/\.upper\(/g, ".__pyUpper(")
      .replace(/\.strip\(/g, ".__pyStrip(")
      .replace(/\.startswith\(/g, ".__pyStartsWith(")
      .replace(/\.endswith\(/g, ".__pyEndsWith(")
      .replace(/\.isdigit\(/g, ".__pyIsDigit(")
      .replace(/\.isalpha\(/g, ".__pyIsAlpha(")
      .replace(/\.get\(/g, ".__pyGet(")
      .replace(/\.keys\(/g, ".__pyKeys(")
      .replace(/\.values\(/g, ".__pyValues(")
      .replace(/\.items\(/g, ".__pyItems(")
      .replace(/\.sort\(/g, ".__pySort(")
      .replace(/\.copy\(/g, ".__pyCopy(")
      .replace(/\.count\(/g, ".__pyCount(")
      .replace(/\.join\(/g, ".__pyJoin(")
      .replace(/\.split\(/g, ".__pySplit(")
      .replace(/\.replace\(/g, ".__pyReplace(");

    // Restore string literals
    s = s.replace(/__STR_(\d+)__/g, (_m, idx) => strStash[Number(idx)]);
    return s;
  }

  // Install non-enumerable Python method shims once safely across both host and VM realms
  function ensurePyPrototypes() {
    const arrProtos = [Array.prototype, (new Function("return ([]).constructor.prototype"))()];
    const strProtos = [String.prototype, (new Function("return ('').constructor.prototype"))()];
    const objProtos = [Object.prototype, (new Function("return ({}).constructor.prototype"))()];
    const def = (protos, name, fn) => {
      for (const proto of protos) {
        if (proto && !Object.prototype.hasOwnProperty.call(proto, name)) {
          Object.defineProperty(proto, name, { value: fn, enumerable: false, configurable: true, writable: true });
        }
      }
    };
    def(arrProtos, "__pyAppend", function (x) { this.push(x); return null; });
    def(arrProtos, "__pyExtend", function (arr) { for (const x of arr) this.push(x); return null; });
    def(arrProtos, "__pyCopy", function () { return this.slice(); });
    def(arrProtos, "__pyCount", function (x) { return this.filter((v) => deepEqual(v, x)).length; });
    def(arrProtos, "__pySort", function () {
      this.sort((a, b) => (typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b))));
      return null;
    });
    def(strProtos, "__pyLower", function () { return this.toLowerCase(); });
    def(strProtos, "__pyUpper", function () { return this.toUpperCase(); });
    def(strProtos, "__pyStrip", function (ch) {
      if (!ch) return this.trim();
      const esc = ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return this.replace(new RegExp(`^[${esc}]+|[${esc}]+$`, "g"), "");
    });
    def(strProtos, "__pyStartsWith", function (p) { return this.startsWith(p); });
    def(strProtos, "__pyEndsWith", function (p) { return this.endsWith(p); });
    def(strProtos, "__pyIsDigit", function () { return /^\d+$/.test(this); });
    def(strProtos, "__pyIsAlpha", function () { return /^[a-zA-Z]+$/.test(this); });
    def(strProtos, "__pyJoin", function (arr) { return Array.from(arr).join(this); });
    def(strProtos, "__pySplit", function (sep) {
      if (sep === undefined) return this.trim() === "" ? [] : this.trim().split(/\s+/);
      return this.split(sep);
    });
    def(strProtos, "__pyReplace", function (a, b) { return this.split(a).join(b); });
    def(strProtos, "__pyCount", function (sub) {
      if (!sub) return this.length + 1;
      return this.split(sub).length - 1;
    });
    def(objProtos, "__pyGet", function (k, fallback) {
      return Object.prototype.hasOwnProperty.call(this, k) ? this[k] : (fallback === undefined ? null : fallback);
    });
    def(objProtos, "__pyKeys", function () { return Object.keys(this).filter((k) => !k.startsWith("__py")); });
    def(objProtos, "__pyValues", function () { return Object.keys(this).filter((k) => !k.startsWith("__py")).map((k) => this[k]); });
    def(objProtos, "__pyItems", function () { return Object.keys(this).filter((k) => !k.startsWith("__py")).map((k) => [k, this[k]]); });
    def(objProtos, "__pyCopy", function () { return Object.assign({}, this); });
  }

  function runPython(src, options) {
    ensurePyPrototypes();
    const opts = options || {};
    const maxOps = opts.maxOps || 4000;
    const recordTrace = opts.trace !== false;
    const t0 = Date.now();
    const out = [];
    const trace = [];
    const globalEnv = Object.create(null);
    const callStack = ["<module>"];

    const rawLines = String(src || "").replace(/\r/g, "").split("\n");
    const lines = [];
    for (let i = 0; i < rawLines.length; i++) {
      const cleaned = stripPyComment(rawLines[i]);
      const trimmed = cleaned.trim();
      if (!trimmed) continue;
      const indent = rawLines[i].replace(/\t/g, "    ").match(/^\s*/)[0].length;
      lines.push({ num: i + 1, indent, text: trimmed, raw: rawLines[i] });
    }

    function fmtPyOut(v) {
      if (v === true) return "True";
      if (v === false) return "False";
      if (v === null || v === undefined) return "None";
      if (Array.isArray(v)) return "[" + v.map((x) => (typeof x === "string" ? `'${x}'` : fmtPyOut(x))).join(", ") + "]";
      if (v instanceof Set) return "{" + Array.from(v).map((x) => (typeof x === "string" ? `'${x}'` : fmtPyOut(x))).join(", ") + "}";
      if (typeof v === "object") {
        if (v.__pyClass) return `<${v.__pyClass}>`;
        return "{" + Object.keys(v).filter((k) => !k.startsWith("__py")).map((k) => `'${k}': ${typeof v[k] === "string" ? `'${v[k]}'` : fmtPyOut(v[k])}`).join(", ") + "}";
      }
      return String(v);
    }

    const builtins = {
      len: (x) => {
        if (x == null) return 0;
        if (typeof x.length === "number") return x.length;
        if (x instanceof Set) return x.size;
        if (typeof x === "object") return Object.keys(x).filter((k) => !k.startsWith("__py")).length;
        return 0;
      },
      sum: (arr, start) => (Array.isArray(arr) ? arr.reduce((a, b) => a + Number(b), start || 0) : Number(arr)),
      min: (...a) => {
        const list = a.length === 1 && Array.isArray(a[0]) ? a[0] : a;
        return Math.min(...list);
      },
      max: (...a) => {
        const list = a.length === 1 && Array.isArray(a[0]) ? a[0] : a;
        return Math.max(...list);
      },
      abs: (x) => Math.abs(x),
      round: (x, d) => (d == null ? Math.round(x) : Number(Number(x).toFixed(d))),
      int: (x, base) => (typeof x === "string" && base ? parseInt(x, base) : Math.trunc(Number(x))),
      float: (x) => parseFloat(x),
      str: (x) => fmtPyOut(x),
      bool: (x) => {
        if (Array.isArray(x)) return x.length > 0;
        if (x instanceof Set) return x.size > 0;
        if (x && typeof x === "object") return Object.keys(x).filter((k) => !k.startsWith("__py")).length > 0;
        return Boolean(x);
      },
      list: (x) => {
        if (x === undefined) return [];
        if (Array.isArray(x)) return x.slice();
        if (typeof x === "string") return x.split("");
        if (x instanceof Set) return Array.from(x);
        if (x && typeof x === "object") return Object.keys(x).filter((k) => !k.startsWith("__py"));
        return [x];
      },
      set: (x) => {
        if (x === undefined) return new Set();
        if (Array.isArray(x) || typeof x === "string") return new Set(x);
        if (x instanceof Set) return new Set(x);
        return new Set(Object.keys(x || {}));
      },
      dict: () => ({}),
      tuple: (x) => (Array.isArray(x) ? x.slice() : Array.from(x || [])),
      sorted: (arr, rev) => {
        const list = Array.isArray(arr) ? arr.slice() : typeof arr === "string" ? arr.split("") : Array.from(arr);
        list.sort((a, b) => (typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b))));
        if (rev) list.reverse();
        return list;
      },
      reversed: (arr) => (Array.isArray(arr) ? arr.slice().reverse() : String(arr).split("").reverse()),
      enumerate: (arr, start) => {
        const st = start || 0;
        return Array.from(arr).map((v, idx) => [st + idx, v]);
      },
      zip: (a, b) => {
        const n = Math.min(a.length, b.length);
        const r = [];
        for (let i = 0; i < n; i++) r.push([a[i], b[i]]);
        return r;
      },
      range: (...args) => {
        const st = args.length >= 2 ? Number(args[0]) : 0;
        const en = args.length >= 2 ? Number(args[1]) : Number(args[0]);
        const step = args.length >= 3 ? Number(args[2]) : 1;
        const arr = [];
        if (step === 0) return arr;
        for (let v = st; step > 0 ? v < en : v > en; v += step) {
          arr.push(v);
          if (arr.length > 600) break;
        }
        return arr;
      },
      any: (arr) => Array.from(arr).some(Boolean),
      all: (arr) => Array.from(arr).every(Boolean),
      chr: (n) => String.fromCharCode(n),
      ord: (c) => String(c).charCodeAt(0),
      type: (x) => {
        if (x === null) return "<class 'NoneType'>";
        if (typeof x === "boolean") return "<class 'bool'>";
        if (typeof x === "number") return Number.isInteger(x) ? "<class 'int'>" : "<class 'float'>";
        if (typeof x === "string") return "<class 'str'>";
        if (Array.isArray(x)) return "<class 'list'>";
        if (x instanceof Set) return "<class 'set'>";
        return x.__pyClass ? `<class '${x.__pyClass}'>` : "<class 'dict'>";
      },
      print: (...args) => {
        out.push(args.map(fmtPyOut).join(" "));
        return null;
      },
      __pyStr: fmtPyOut,
      __pyEq: deepEqual,
      __pyBool: (x) => {
        if (Array.isArray(x)) return x.length > 0;
        if (x instanceof Set) return x.size > 0;
        if (x && typeof x === "object") return Object.keys(x).filter((k) => !k.startsWith("__py")).length > 0;
        return Boolean(x);
      },
      __pyIter: (x) => {
        if (Array.isArray(x)) return x;
        if (typeof x === "string") return x.split("");
        if (x instanceof Set) return Array.from(x);
        if (x && typeof x === "object") return Object.keys(x).filter((k) => !k.startsWith("__py"));
        throw new Error(`Object is not iterable: ${fmtPyOut(x)}`);
      },
      __pyIn: (needle, haystack) => {
        if (Array.isArray(haystack)) return haystack.some((x) => deepEqual(x, needle));
        if (typeof haystack === "string") return haystack.includes(String(needle));
        if (haystack instanceof Set) return haystack.has(needle);
        if (haystack && typeof haystack === "object") return Object.prototype.hasOwnProperty.call(haystack, needle);
        return false;
      },
      __pyIndex: (seq, idx) => {
        if (seq == null) throw new Error("Cannot index None");
        if (Array.isArray(seq) || typeof seq === "string") {
          let i = Number(idx);
          if (i < 0) i = seq.length + i;
          if (i < 0 || i >= seq.length) throw new Error(`IndexError: index ${idx} out of range`);
          return seq[i];
        }
        if (typeof seq === "object") {
          if (!Object.prototype.hasOwnProperty.call(seq, idx)) throw new Error(`KeyError: ${fmtPyOut(idx)}`);
          return seq[idx];
        }
        throw new Error("Object is not subscriptable");
      },
      __pySlice: (seq, st, en, step) => {
        const n = seq.length;
        const s = step == null ? 1 : Number(step);
        if (s === 0) throw new Error("ValueError: slice step cannot be zero");
        if (s < 0) {
          let a = st == null ? n - 1 : Number(st);
          let b = en == null ? -1 : Number(en);
          if (a < 0) a += n;
          if (en != null && b < 0) b += n;
          a = Math.min(n - 1, Math.max(-1, a));
          const res = [];
          for (let i = a; i > b; i += s) {
            if (i >= 0 && i < n) res.push(seq[i]);
          }
          return Array.isArray(seq) ? res : res.join("");
        }
        let a = st == null ? 0 : Number(st);
        let b = en == null ? n : Number(en);
        if (a < 0) a = Math.max(0, n + a);
        if (b < 0) b = Math.max(0, n + b);
        a = Math.min(n, a);
        b = Math.min(n, b);
        if (s === 1) return seq.slice(a, b);
        const res = [];
        for (let i = a; i < b; i += s) res.push(seq[i]);
        return Array.isArray(seq) ? res : res.join("");
      }
    };

    function evalInEnv(exprStr, scope) {
      const trimmed = String(exprStr || "").trim();
      if (!trimmed) return null;
      // Handle bare tuple return like `a, b` when not wrapped in brackets
      const topComma = splitTopLevel(trimmed, ",");
      if (topComma.length > 1) {
        return topComma.map((part) => evalInEnv(part, scope));
      }
      const jsExpr = transformPyExpr(trimmed);
      const merged = Object.assign(Object.create(null), builtins, globalEnv, scope);
      const keys = Object.keys(merged);
      const vals = keys.map((k) => merged[k]);
      const fn = new Function(...keys, `"use strict"; return (${jsExpr});`);
      return fn(...vals);
    }

    function snapshotVars(scope) {
      const snap = {};
      const srcEnv = scope === globalEnv ? globalEnv : scope;
      for (const [k, v] of Object.entries(srcEnv)) {
        if (typeof v === "function") continue;
        if (k.startsWith("__")) continue;
        snap[k] = fmtPyOut(v);
      }
      return snap;
    }

    function pushTrace(ln, scope) {
      if (!recordTrace || trace.length >= 220) return;
      trace.push({
        step: trace.length + 1,
        line: ln.num,
        code: ln.text,
        vars: snapshotVars(scope),
        stack: callStack.slice(),
        out: out.slice()
      });
    }

    let ops = 0;

    function findBlockEnd(startIdx, endIdx, parentIndent) {
      let k = startIdx + 1;
      while (k < endIdx && lines[k].indent > parentIndent) k++;
      return k;
    }

    function createPyFunction(name, paramSpecs, bodyStart, bodyEnd) {
      const fn = function (...args) {
        if (callStack.length > 80) throw new Error(`RecursionError: maximum recursion depth exceeded in ${name}`);
        const localScope = Object.create(null);
        for (let p = 0; p < paramSpecs.length; p++) {
          const spec = paramSpecs[p];
          if (p < args.length) {
            localScope[spec.name] = args[p];
          } else if (spec.hasDefault) {
            localScope[spec.name] = evalInEnv(spec.defaultExpr, globalEnv);
          } else {
            throw new Error(`TypeError: ${name}() missing required argument '${spec.name}'`);
          }
        }
        callStack.push(`${name}(${args.map((a) => fmtPyOut(a)).join(", ")})`);
        const res = execBlock(bodyStart, bodyEnd, localScope);
        callStack.pop();
        if (res && res.signal === "return") return res.value;
        return null;
      };
      fn.__pyFuncName = name;
      return fn;
    }

    function parseParamList(rawParams) {
      const t = rawParams.trim();
      if (!t) return [];
      return splitTopLevel(t, ",").map((piece) => {
        const eqIdx = piece.indexOf("=");
        if (eqIdx === -1) {
          return { name: piece.split(":")[0].trim(), hasDefault: false };
        }
        return {
          name: piece.slice(0, eqIdx).split(":")[0].trim(),
          hasDefault: true,
          defaultExpr: piece.slice(eqIdx + 1).trim()
        };
      });
    }

    function assignTarget(lhs, val, scope) {
      // Tuple unpacking: a, b = expr
      const targets = splitTopLevel(lhs, ",");
      if (targets.length > 1) {
        const vals = Array.isArray(val) ? val : builtins.__pyIter(val);
        for (let k = 0; k < targets.length; k++) {
          assignTarget(targets[k], vals[k], scope);
        }
        return;
      }
      const target = lhs.trim();
      // Subscript assignment: arr[i] = val or d[k] = val
      const subM = target.match(/^([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)\[([^\]]+)\]$/);
      if (subM) {
        const obj = evalInEnv(subM[1], scope);
        let idx = evalInEnv(subM[2], scope);
        if (Array.isArray(obj) && typeof idx === "number" && idx < 0) idx = obj.length + idx;
        obj[idx] = val;
        return;
      }
      // Attribute assignment: self.hp = val
      const attrM = target.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)$/);
      if (attrM) {
        const obj = evalInEnv(attrM[1], scope);
        obj[attrM[2]] = val;
        return;
      }
      scope[target] = val;
    }

    function execBlock(startIdx, endIdx, scope) {
      let i = startIdx;
      let lastIfMatched = false;

      while (i < endIdx) {
        if (++ops > maxOps) throw new Error(`Execution safety limit reached (${maxOps} operations). Check for infinite loops!`);
        const ln = lines[i];
        const text = ln.text;

        // Class definition
        const clsM = text.match(/^class\s+([a-zA-Z_]\w*)(?:\([^)]*\))?:$/);
        if (clsM) {
          const clsName = clsM[1];
          const blockEnd = findBlockEnd(i, endIdx, ln.indent);
          const methods = Object.create(null);
          let j = i + 1;
          while (j < blockEnd) {
            const mLn = lines[j];
            const mDef = mLn.text.match(/^def\s+([a-zA-Z_]\w*)\(([^)]*)\)(?:\s*->\s*[^:]+)?\s*:$/);
            if (mDef) {
              const mEnd = findBlockEnd(j, blockEnd, mLn.indent);
              methods[mDef[1]] = createPyFunction(`${clsName}.${mDef[1]}`, parseParamList(mDef[2]), j + 1, mEnd);
              j = mEnd;
            } else {
              j++;
            }
          }
          const ctor = function (...args) {
            const inst = { __pyClass: clsName };
            for (const [mName, mFn] of Object.entries(methods)) {
              if (mName !== "__init__") {
                Object.defineProperty(inst, mName, {
                  value: (...mArgs) => mFn(inst, ...mArgs),
                  enumerable: false,
                  configurable: true
                });
              }
            }
            if (methods.__init__) methods.__init__(inst, ...args);
            return inst;
          };
          scope[clsName] = ctor;
          if (scope === globalEnv) globalEnv[clsName] = ctor;
          i = blockEnd;
          lastIfMatched = false;
          continue;
        }

        // Function definition
        const defM = text.match(/^def\s+([a-zA-Z_]\w*)\(([^)]*)\)(?:\s*->\s*[^:]+)?\s*:$/);
        if (defM) {
          const blockEnd = findBlockEnd(i, endIdx, ln.indent);
          const fn = createPyFunction(defM[1], parseParamList(defM[2]), i + 1, blockEnd);
          scope[defM[1]] = fn;
          if (scope === globalEnv) globalEnv[defM[1]] = fn;
          i = blockEnd;
          lastIfMatched = false;
          continue;
        }

        // Control blocks: for / while / if / elif / else / try / except
        if (/^(for|while|if|elif|else|try|except)\b.*:$/.test(text)) {
          const blockEnd = findBlockEnd(i, endIdx, ln.indent);

          const forM = text.match(/^for\s+(.+?)\s+in\s+(.+):$/);
          if (forM) {
            const iterVal = builtins.__pyIter(evalInEnv(forM[2], scope));
            for (const item of iterVal) {
              assignTarget(forM[1], item, scope);
              pushTrace(ln, scope);
              const sig = execBlock(i + 1, blockEnd, scope);
              if (sig) {
                if (sig.signal === "break") break;
                if (sig.signal === "continue") continue;
                if (sig.signal === "return") return sig;
              }
            }
            lastIfMatched = false;
            i = blockEnd;
            continue;
          }

          if (text.startsWith("while ")) {
            const condExpr = text.slice(6, -1).trim();
            while (builtins.bool(evalInEnv(condExpr, scope))) {
              if (++ops > maxOps) throw new Error(`While loop safety limit reached (${maxOps} ops).`);
              pushTrace(ln, scope);
              const sig = execBlock(i + 1, blockEnd, scope);
              if (sig) {
                if (sig.signal === "break") break;
                if (sig.signal === "continue") continue;
                if (sig.signal === "return") return sig;
              }
            }
            lastIfMatched = false;
            i = blockEnd;
            continue;
          }

          if (text.startsWith("if ")) {
            pushTrace(ln, scope);
            const cond = builtins.bool(evalInEnv(text.slice(3, -1), scope));
            lastIfMatched = cond;
            if (cond) {
              const sig = execBlock(i + 1, blockEnd, scope);
              if (sig) return sig;
            }
            i = blockEnd;
            continue;
          }

          if (text.startsWith("elif ")) {
            if (!lastIfMatched) {
              pushTrace(ln, scope);
              const cond = builtins.bool(evalInEnv(text.slice(5, -1), scope));
              if (cond) {
                lastIfMatched = true;
                const sig = execBlock(i + 1, blockEnd, scope);
                if (sig) return sig;
              }
            }
            i = blockEnd;
            continue;
          }

          if (text === "else:") {
            if (!lastIfMatched) {
              const sig = execBlock(i + 1, blockEnd, scope);
              if (sig) return sig;
            }
            lastIfMatched = false;
            i = blockEnd;
            continue;
          }

          if (text === "try:") {
            let nextIdx = blockEnd;
            let exceptStart = -1;
            let exceptEnd = -1;
            if (nextIdx < endIdx && /^except\b.*:$/.test(lines[nextIdx].text) && lines[nextIdx].indent === ln.indent) {
              exceptStart = nextIdx + 1;
              exceptEnd = findBlockEnd(nextIdx, endIdx, ln.indent);
              nextIdx = exceptEnd;
            }
            try {
              const sig = execBlock(i + 1, blockEnd, scope);
              if (sig) return sig;
            } catch (_pyErr) {
              if (exceptStart !== -1) {
                const sig = execBlock(exceptStart, exceptEnd, scope);
                if (sig) return sig;
              }
            }
            lastIfMatched = false;
            i = nextIdx;
            continue;
          }

          i = blockEnd;
          continue;
        }

        lastIfMatched = false;

        if (text === "pass") {
          i++;
          continue;
        }
        if (text === "break") return { signal: "break" };
        if (text === "continue") return { signal: "continue" };

        if (text === "return" || text.startsWith("return ")) {
          const retExpr = text.length > 6 ? text.slice(7).trim() : "";
          const val = retExpr ? evalInEnv(retExpr, scope) : null;
          pushTrace(ln, scope);
          return { signal: "return", value: val };
        }

        // Augmented assignment (+=, -=, *=, /=, //=, %=)
        const augM = text.match(/^([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*|\[[^\]]+\])?)\s*(\+=|-=|\*=|\/=|\/\/=|%=)\s*(.+)$/);
        if (augM) {
          const cur = evalInEnv(augM[1], scope);
          const rhs = evalInEnv(augM[3], scope);
          let nextVal;
          if (augM[2] === "+=") nextVal = cur + rhs;
          else if (augM[2] === "-=") nextVal = cur - rhs;
          else if (augM[2] === "*=") nextVal = cur * rhs;
          else if (augM[2] === "/=") nextVal = cur / rhs;
          else if (augM[2] === "//=") nextVal = Math.floor(cur / rhs);
          else nextVal = cur % rhs;
          assignTarget(augM[1], nextVal, scope);
          pushTrace(ln, scope);
          i++;
          continue;
        }

        // Standard assignment (careful not to match ==, !=, <=, >=)
        const asgIdx = (() => {
          let depth = 0, quote = null;
          for (let k = 0; k < text.length; k++) {
            const ch = text[k];
            if (quote) {
              if (ch === quote && text[k - 1] !== "\\") quote = null;
            } else if (ch === "'" || ch === "\"") {
              quote = ch;
            } else if (ch === "(" || ch === "[" || ch === "{") {
              depth++;
            } else if (ch === ")" || ch === "]" || ch === "}") {
              depth--;
            } else if (depth === 0 && ch === "=") {
              const prev = text[k - 1], next = text[k + 1];
              if (prev !== "!" && prev !== "<" && prev !== ">" && prev !== "=" && next !== "=") {
                return k;
              }
            }
          }
          return -1;
        })();

        if (asgIdx > 0) {
          const lhs = text.slice(0, asgIdx).trim();
          const rhs = text.slice(asgIdx + 1).trim();
          const val = evalInEnv(rhs, scope);
          assignTarget(lhs, val, scope);
          pushTrace(ln, scope);
          i++;
          continue;
        }

        // Expression statement (e.g. print(...), arr.append(...), func())
        evalInEnv(text, scope);
        pushTrace(ln, scope);
        i++;
      }
      return null;
    }

    try {
      execBlock(0, lines.length, globalEnv);
      return {
        ok: true,
        out,
        vars: snapshotVars(globalEnv),
        env: globalEnv,
        trace,
        elapsedMs: Math.max(0.1, Date.now() - t0),
        evalInEnv: (expr) => evalInEnv(expr, globalEnv)
      };
    } catch (err) {
      return {
        ok: false,
        error: err.message || String(err),
        out,
        vars: snapshotVars(globalEnv),
        env: globalEnv,
        trace,
        elapsedMs: Math.max(0.1, Date.now() - t0)
      };
    }
  }

  function runPythonTests(userCode, tests) {
    const base = runPython(userCode, { trace: true });
    if (!base.ok) {
      return {
        ok: false,
        passed: 0,
        total: tests.length,
        error: base.error,
        out: base.out,
        vars: base.vars,
        trace: base.trace,
        elapsedMs: base.elapsedMs,
        results: tests.map((t) => ({
          name: t.name,
          input: t.call || (typeof t.stdoutLine === "number" ? `Output line ${t.stdoutLine + 1}` : "stdout"),
          expected: formatValue(t.expected),
          actual: `Error: ${base.error}`,
          ok: false
        }))
      };
    }

    const results = [];
    let passed = 0;
    for (const t of tests) {
      try {
        let actual;
        if (t.checkStdout) {
          actual = base.out.join("\n").trim();
        } else if (typeof t.stdoutLine === "number") {
          actual = base.out[t.stdoutLine] != null ? String(base.out[t.stdoutLine]).trim() : "";
        } else {
          actual = base.evalInEnv(t.call);
        }
        const ok = deepEqual(actual, t.expected);
        if (ok) passed++;
        results.push({
          name: t.name,
          input: t.call || (typeof t.stdoutLine === "number" ? `Output line ${t.stdoutLine + 1}` : "stdout"),
          expected: formatValue(t.expected),
          actual: formatValue(actual),
          ok
        });
      } catch (err) {
        results.push({
          name: t.name,
          input: t.call || "stdout",
          expected: formatValue(t.expected),
          actual: `Runtime Error: ${err.message}`,
          ok: false
        });
      }
    }

    return {
      ok: passed === tests.length,
      passed,
      total: tests.length,
      out: base.out,
      vars: base.vars,
      trace: base.trace,
      elapsedMs: base.elapsedMs,
      results
    };
  }

  // ==================== 3. SANDBOXED JAVASCRIPT RUNNER & TEST SUITE ====================
  function runJavaScriptTests(userCode, tests, exportNames) {
    const t0 = Date.now();
    const out = [];
    const mockConsole = {
      log: (...args) => out.push(args.map((a) => (typeof a === "string" ? a : formatJsValue(a))).join(" ")),
      warn: (...args) => out.push("[warn] " + args.map(String).join(" ")),
      error: (...args) => out.push("[err] " + args.map(String).join(" "))
    };

    const names = Array.isArray(exportNames) ? exportNames : [];
    const exportObjExpr = "{" + names.map((n) => `${n}: (typeof ${n} !== "undefined" ? ${n} : undefined)`).join(", ") + "}";
    let exported = {};
    try {
      const fn = new Function("console", `"use strict";\n${userCode}\nreturn (${exportObjExpr});`);
      exported = fn(mockConsole) || {};
    } catch (err) {
      return {
        ok: false,
        passed: 0,
        total: tests.length,
        error: err.message,
        out,
        elapsedMs: Math.max(0.1, Date.now() - t0),
        results: tests.map((t) => ({
          name: t.name,
          input: t.call || "stdout",
          expected: formatJsValue(t.expected),
          actual: `Syntax/Runtime Error: ${err.message}`,
          ok: false
        }))
      };
    }

    const results = [];
    let passed = 0;
    for (const t of tests) {
      try {
        let actual;
        if (t.checkStdout) {
          actual = out.join("\n").trim();
        } else {
          const argNames = Object.keys(exported);
          const argVals = argNames.map((k) => exported[k]);
          const evalFn = new Function(...argNames, `"use strict"; return (${t.call});`);
          actual = evalFn(...argVals);
        }
        const ok = deepEqual(actual, t.expected);
        if (ok) passed++;
        results.push({
          name: t.name,
          input: t.call || "stdout",
          expected: formatJsValue(t.expected),
          actual: formatJsValue(actual),
          ok
        });
      } catch (err) {
        results.push({
          name: t.name,
          input: t.call || "stdout",
          expected: formatJsValue(t.expected),
          actual: `Error: ${err.message}`,
          ok: false
        });
      }
    }

    return {
      ok: passed === tests.length,
      passed,
      total: tests.length,
      out,
      elapsedMs: Math.max(0.1, Date.now() - t0),
      results
    };
  }

  // ==================== 4. REAL IN-BROWSER RELATIONAL SQL ENGINE ====================
  const DEFAULT_SQL_DB = {
    guilds: [
      { id: 1, name: "Obsidian Order", region: "North", founded_year: 2019 },
      { id: 2, name: "Iron Compilers", region: "East", founded_year: 2021 },
      { id: 3, name: "Quantum Mages", region: "West", founded_year: 2020 },
      { id: 4, name: "Silent Sockets", region: "South", founded_year: 2023 }
    ],
    heroes: [
      { id: 1, name: "Aria", role: "Backend", level: 18, xp: 4200, guild_id: 1, active: 1 },
      { id: 2, name: "Kael", role: "Systems", level: 24, xp: 6850, guild_id: 2, active: 1 },
      { id: 3, name: "Lyra", role: "AI", level: 15, xp: 3100, guild_id: 3, active: 1 },
      { id: 4, name: "Devon", role: "Frontend", level: 12, xp: 2400, guild_id: 1, active: 1 },
      { id: 5, name: "Sora", role: "Backend", level: 21, xp: 5900, guild_id: 2, active: 1 },
      { id: 6, name: "Taro", role: "Security", level: 9, xp: 1350, guild_id: 3, active: 0 },
      { id: 7, name: "Mira", role: "Data", level: 19, xp: 4700, guild_id: 1, active: 1 },
      { id: 8, name: "Zane", role: "DevOps", level: 7, xp: 900, guild_id: null, active: 1 }
    ],
    quests: [
      { id: 101, title: "Fix Hash Collision", difficulty: "Hard", xp_reward: 500, category: "DSA" },
      { id: 102, title: "Normalize Orders DB", difficulty: "Medium", xp_reward: 350, category: "SQL" },
      { id: 103, title: "Patch Auth JWT", difficulty: "Hard", xp_reward: 600, category: "Backend" },
      { id: 104, title: "Build Flex Grid", difficulty: "Easy", xp_reward: 150, category: "Web" },
      { id: 105, title: "Trace Event Loop", difficulty: "Medium", xp_reward: 300, category: "JS" }
    ],
    submissions: [
      { id: 1, hero_id: 1, quest_id: 101, status: "PASSED", score: 100 },
      { id: 2, hero_id: 1, quest_id: 102, status: "PASSED", score: 95 },
      { id: 3, hero_id: 2, quest_id: 101, status: "PASSED", score: 100 },
      { id: 4, hero_id: 2, quest_id: 103, status: "PASSED", score: 98 },
      { id: 5, hero_id: 3, quest_id: 105, status: "PASSED", score: 90 },
      { id: 6, hero_id: 4, quest_id: 104, status: "PASSED", score: 88 },
      { id: 7, hero_id: 5, quest_id: 103, status: "PASSED", score: 100 },
      { id: 8, hero_id: 5, quest_id: 102, status: "FAILED", score: 45 },
      { id: 9, hero_id: 7, quest_id: 102, status: "PASSED", score: 96 }
    ]
  };

  function getSqlDbCopy(customTables) {
    const src = customTables || DEFAULT_SQL_DB;
    const copy = {};
    for (const [t, rows] of Object.entries(src)) {
      copy[t.toLowerCase()] = rows.map((r) => Object.assign({}, r));
    }
    return copy;
  }

  function resolveSqlField(row, expr) {
    const clean = expr.trim();
    if (/^'(?:''|[^'])*'$/.test(clean)) return clean.slice(1, -1).replace(/''/g, "'");
    if (/^-?\d+(?:\.\d+)?$/.test(clean)) return Number(clean);
    if (/^NULL$/i.test(clean)) return null;
    const low = clean.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(row, low)) return row[low];
    if (low.includes(".")) {
      if (Object.prototype.hasOwnProperty.call(row, low)) return row[low];
      const bare = low.split(".")[1];
      if (Object.prototype.hasOwnProperty.call(row, bare)) return row[bare];
    }
    // Check suffix match `.col`
    for (const k of Object.keys(row)) {
      if (k === low || k.endsWith("." + low)) return row[k];
    }
    return undefined;
  }

  function evalSqlCondition(row, condStr) {
    const s = condStr.trim();
    if (!s) return true;
    // Strip enclosing parens if matched
    if (s.startsWith("(") && s.endsWith(")")) {
      let depth = 0, wraps = true;
      for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") depth++;
        else if (s[i] === ")") depth--;
        if (depth === 0 && i < s.length - 1) { wraps = false; break; }
      }
      if (wraps) return evalSqlCondition(row, s.slice(1, -1));
    }

    // Split by top-level OR first, then AND
    const splitKeyword = (str, kw) => {
      const parts = [];
      let cur = "", depth = 0, inStr = false;
      const re = new RegExp(`^\\s+${kw}\\s+`, "i");
      for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (ch === "'") { inStr = !inStr; cur += ch; continue; }
        if (!inStr) {
          if (ch === "(") depth++;
          else if (ch === ")") depth--;
          if (depth === 0) {
            const m = str.slice(i).match(re);
            if (m) {
              parts.push(cur.trim());
              cur = "";
              i += m[0].length - 1;
              continue;
            }
          }
        }
        cur += ch;
      }
      parts.push(cur.trim());
      return parts;
    };

    const orParts = splitKeyword(s, "OR");
    if (orParts.length > 1) return orParts.some((p) => evalSqlCondition(row, p));
    const andParts = splitKeyword(s, "AND");
    if (andParts.length > 1) return andParts.every((p) => evalSqlCondition(row, p));

    // IS NOT NULL / IS NULL
    let m = s.match(/^(.+?)\s+IS\s+NOT\s+NULL$/i);
    if (m) return resolveSqlField(row, m[1]) != null;
    m = s.match(/^(.+?)\s+IS\s+NULL$/i);
    if (m) return resolveSqlField(row, m[1]) == null;

    // IN (...)
    m = s.match(/^(.+?)\s+(NOT\s+)?IN\s*\((.+)\)$/i);
    if (m) {
      const val = resolveSqlField(row, m[1]);
      const items = splitTopLevel(m[3], ",").map((x) => resolveSqlField(row, x));
      const found = items.some((x) => x == val);
      return m[2] ? !found : found;
    }

    // LIKE
    m = s.match(/^(.+?)\s+(NOT\s+)?LIKE\s+(.+)$/i);
    if (m) {
      const val = String(resolveSqlField(row, m[1]) ?? "");
      const pat = String(resolveSqlField(row, m[3]) ?? "");
      const regex = new RegExp("^" + pat.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".") + "$", "i");
      const ok = regex.test(val);
      return m[2] ? !ok : ok;
    }

    // Comparison operators
    m = s.match(/^(.+?)\s*(<=|>=|!=|<>|=|<|>)\s*(.+)$/);
    if (m) {
      const a = resolveSqlField(row, m[1]);
      const b = resolveSqlField(row, m[3]);
      if (a == null || b == null) return false;
      const op = m[2];
      if (op === "=") return String(a).toLowerCase() === String(b).toLowerCase() || a === b;
      if (op === "!=" || op === "<>") return String(a).toLowerCase() !== String(b).toLowerCase();
      if (op === "<") return Number(a) < Number(b);
      if (op === "<=") return Number(a) <= Number(b);
      if (op === ">") return Number(a) > Number(b);
      if (op === ">=") return Number(a) >= Number(b);
    }
    return false;
  }

  function runSql(rawQuery, customTables) {
    const t0 = Date.now();
    try {
      const db = getSqlDbCopy(customTables);
      const cleaned = String(rawQuery || "")
        .replace(/--[^\n]*/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/;+$/, "");

      if (!/^SELECT\b/i.test(cleaned)) {
        return { ok: false, error: "Query must start with SELECT (read-only relational playground).", columns: [], rows: [], executionPlan: [] };
      }

      // Extract top-level clauses
      const clauseRe = /\b(SELECT|FROM|WHERE|GROUP BY|HAVING|ORDER BY|LIMIT)\b/gi;
      const matches = [];
      let m;
      while ((m = clauseRe.exec(cleaned)) !== null) {
        matches.push({ kw: m[1].toUpperCase(), idx: m.index, len: m[0].length });
      }
      const clauses = {};
      for (let i = 0; i < matches.length; i++) {
        const cur = matches[i];
        const nextIdx = i + 1 < matches.length ? matches[i + 1].idx : cleaned.length;
        clauses[cur.kw] = cleaned.slice(cur.idx + cur.len, nextIdx).trim();
      }

      if (!clauses.FROM) {
        return { ok: false, error: "Missing FROM clause — specify a table (e.g. FROM heroes).", columns: [], rows: [], executionPlan: [] };
      }

      const plan = [];

      // Parse FROM + JOINs
      const joinRe = /\b(LEFT\s+OUTER\s+JOIN|LEFT\s+JOIN|INNER\s+JOIN|JOIN)\b/gi;
      const fromChunk = clauses.FROM;
      const jMatches = [];
      while ((m = joinRe.exec(fromChunk)) !== null) {
        jMatches.push({ type: m[1].toUpperCase().includes("LEFT") ? "LEFT" : "INNER", idx: m.index, len: m[0].length });
      }
      const basePart = (jMatches.length ? fromChunk.slice(0, jMatches[0].idx) : fromChunk).trim();
      const baseTokens = basePart.split(/\s+/);
      const baseTable = baseTokens[0].toLowerCase();
      const baseAlias = (baseTokens[1] && baseTokens[1].toUpperCase() === "AS" ? baseTokens[2] : baseTokens[1] || baseTable).toLowerCase();

      if (!db[baseTable]) {
        return { ok: false, error: `Unknown table "${baseTable}". Available tables: ${Object.keys(db).join(", ")}`, columns: [], rows: [], executionPlan: [] };
      }

      let rows = db[baseTable].map((r) => {
        const out = {};
        for (const [k, v] of Object.entries(r)) {
          out[k.toLowerCase()] = v;
          out[`${baseAlias}.${k.toLowerCase()}`] = v;
          out[`${baseTable}.${k.toLowerCase()}`] = v;
        }
        return out;
      });
      plan.push({ step: "FROM", detail: `${baseTable}${baseAlias !== baseTable ? " AS " + baseAlias : ""}`, rows: rows.length });

      // Apply JOINs
      for (let ji = 0; ji < jMatches.length; ji++) {
        const jm = jMatches[ji];
        const end = ji + 1 < jMatches.length ? jMatches[ji + 1].idx : fromChunk.length;
        const spec = fromChunk.slice(jm.idx + jm.len, end).trim();
        const onMatch = spec.match(/^(.+?)\s+ON\s+(.+)$/i);
        if (!onMatch) return { ok: false, error: `JOIN missing ON condition: "${spec}"`, columns: [], rows: [], executionPlan: plan };
        const tTokens = onMatch[1].trim().split(/\s+/);
        const jTable = tTokens[0].toLowerCase();
        const jAlias = (tTokens[1] && tTokens[1].toUpperCase() === "AS" ? tTokens[2] : tTokens[1] || jTable).toLowerCase();
        if (!db[jTable]) return { ok: false, error: `Unknown joined table "${jTable}".`, columns: [], rows: [], executionPlan: plan };

        const onEq = onMatch[2].trim().match(/^(.+?)\s*=\s*(.+)$/);
        if (!onEq) return { ok: false, error: `Unsupported JOIN ON syntax: "${onMatch[2]}"`, columns: [], rows: [], executionPlan: plan };

        const jRows = db[jTable];
        const jCols = jRows.length ? Object.keys(jRows[0]) : [];
        const joined = [];
        for (const leftR of rows) {
          let matchedAny = false;
          for (const rightRaw of jRows) {
            const combined = Object.assign({}, leftR);
            for (const [k, v] of Object.entries(rightRaw)) {
              const lk = k.toLowerCase();
              if (!Object.prototype.hasOwnProperty.call(combined, lk)) combined[lk] = v;
              combined[`${jAlias}.${lk}`] = v;
              combined[`${jTable}.${lk}`] = v;
            }
            const lVal = resolveSqlField(combined, onEq[1]);
            const rVal = resolveSqlField(combined, onEq[2]);
            if (lVal != null && rVal != null && lVal == rVal) {
              joined.push(combined);
              matchedAny = true;
            }
          }
          if (!matchedAny && jm.type === "LEFT") {
            const padded = Object.assign({}, leftR);
            for (const c of jCols) {
              const lc = c.toLowerCase();
              padded[`${jAlias}.${lc}`] = null;
              padded[`${jTable}.${lc}`] = null;
            }
            joined.push(padded);
          }
        }
        rows = joined;
        plan.push({ step: `${jm.type} JOIN`, detail: `${jTable} ON ${onMatch[2].trim()}`, rows: rows.length });
      }

      // Apply WHERE
      if (clauses.WHERE) {
        rows = rows.filter((r) => evalSqlCondition(r, clauses.WHERE));
        plan.push({ step: "WHERE", detail: clauses.WHERE, rows: rows.length });
      }

      // Parse SELECT list
      let selectRaw = clauses.SELECT || "*";
      let isDistinct = false;
      if (/^DISTINCT\s+/i.test(selectRaw)) {
        isDistinct = true;
        selectRaw = selectRaw.replace(/^DISTINCT\s+/i, "").trim();
      }
      const selectItems = splitTopLevel(selectRaw, ",").map((item) => {
        const asM = item.match(/^(.+?)\s+AS\s+([a-zA-Z_]\w*)$/i);
        if (asM) return { expr: asM[1].trim(), alias: asM[2].trim() };
        return { expr: item.trim(), alias: null };
      });

      const hasAggregate = selectItems.some((it) => /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(it.expr));
      const isGrouped = Boolean(clauses["GROUP BY"]) || hasAggregate;

      function computeAgg(expr, groupRows) {
        const aggM = expr.match(/^(COUNT|SUM|AVG|MIN|MAX)\s*\((.+)\)$/i);
        if (!aggM) return resolveSqlField(groupRows[0] || {}, expr);
        const fn = aggM[1].toUpperCase();
        const inner = aggM[2].trim();
        if (fn === "COUNT") {
          if (inner === "*") return groupRows.length;
          if (/^DISTINCT\s+/i.test(inner)) {
            const col = inner.replace(/^DISTINCT\s+/i, "").trim();
            return new Set(groupRows.map((r) => resolveSqlField(r, col)).filter((v) => v != null)).size;
          }
          return groupRows.filter((r) => resolveSqlField(r, inner) != null).length;
        }
        const vals = groupRows.map((r) => Number(resolveSqlField(r, inner))).filter((v) => !Number.isNaN(v));
        if (!vals.length) return 0;
        if (fn === "SUM") return vals.reduce((a, b) => a + b, 0);
        if (fn === "AVG") return Number((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2));
        if (fn === "MIN") return Math.min(...vals);
        if (fn === "MAX") return Math.max(...vals);
        return 0;
      }

      let finalCols = [];
      let resultRows = [];

      if (isGrouped) {
        const groupCols = clauses["GROUP BY"] ? splitTopLevel(clauses["GROUP BY"], ",") : [];
        const buckets = new Map();
        for (const r of rows) {
          const gKey = groupCols.length ? JSON.stringify(groupCols.map((c) => resolveSqlField(r, c))) : "__ALL__";
          if (!buckets.has(gKey)) buckets.set(gKey, []);
          buckets.get(gKey).push(r);
        }
        let groupedObjs = [];
        for (const gRows of buckets.values()) {
          const obj = Object.assign({}, gRows[0]);
          const projected = {};
          for (const it of selectItems) {
            const colName = it.alias || it.expr;
            const val = computeAgg(it.expr, gRows);
            projected[colName] = val;
            obj[colName.toLowerCase()] = val;
            obj[it.expr.toLowerCase()] = val;
          }
          groupedObjs.push({ projected, raw: obj, gRows });
        }
        plan.push({ step: "GROUP BY", detail: groupCols.join(", ") || "All rows", rows: groupedObjs.length });

        if (clauses.HAVING) {
          // Support aggregate functions inside HAVING directly
          groupedObjs = groupedObjs.filter((g) => {
            const replaced = clauses.HAVING.replace(/\b(COUNT|SUM|AVG|MIN|MAX)\s*\([^)]+\)/gi, (aggExpr) => {
              return String(computeAgg(aggExpr, g.gRows));
            });
            return evalSqlCondition(g.raw, replaced);
          });
          plan.push({ step: "HAVING", detail: clauses.HAVING, rows: groupedObjs.length });
        }

        finalCols = selectItems.map((it) => it.alias || it.expr);
        resultRows = groupedObjs.map((g) => ({ out: g.projected, sortCtx: g.raw }));
      } else {
        if (selectItems.length === 1 && selectItems[0].expr === "*") {
          const sample = db[baseTable][0] || {};
          finalCols = Object.keys(sample);
          resultRows = rows.map((r) => {
            const out = {};
            for (const c of finalCols) out[c] = r[c.toLowerCase()];
            return { out, sortCtx: r };
          });
        } else {
          finalCols = selectItems.map((it) => it.alias || (it.expr.includes(".") ? it.expr.split(".")[1] : it.expr));
          resultRows = rows.map((r) => {
            const out = {};
            const ctx = Object.assign({}, r);
            selectItems.forEach((it, idx) => {
              const colName = finalCols[idx];
              const val = resolveSqlField(r, it.expr);
              out[colName] = val;
              ctx[colName.toLowerCase()] = val;
            });
            return { out, sortCtx: ctx };
          });
        }
      }

      if (isDistinct) {
        const seen = new Set();
        resultRows = resultRows.filter((r) => {
          const k = JSON.stringify(r.out);
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        });
      }

      plan.push({ step: "SELECT", detail: `${isDistinct ? "DISTINCT " : ""}${finalCols.join(", ")}`, rows: resultRows.length });

      // ORDER BY
      if (clauses["ORDER BY"]) {
        const specs = splitTopLevel(clauses["ORDER BY"], ",").map((p) => {
          const parts = p.trim().split(/\s+/);
          const dir = (parts[1] || "ASC").toUpperCase() === "DESC" ? -1 : 1;
          return { expr: parts[0], dir };
        });
        resultRows.sort((a, b) => {
          for (const sp of specs) {
            const va = resolveSqlField(a.sortCtx, sp.expr);
            const vb = resolveSqlField(b.sortCtx, sp.expr);
            if (va == vb) continue;
            if (va == null) return 1;
            if (vb == null) return -1;
            if (typeof va === "number" && typeof vb === "number") return (va - vb) * sp.dir;
            return String(va).localeCompare(String(vb)) * sp.dir;
          }
          return 0;
        });
        plan.push({ step: "ORDER BY", detail: clauses["ORDER BY"], rows: resultRows.length });
      }

      // LIMIT
      if (clauses.LIMIT) {
        const lim = parseInt(clauses.LIMIT, 10);
        if (!Number.isNaN(lim) && lim >= 0) {
          resultRows = resultRows.slice(0, lim);
          plan.push({ step: "LIMIT", detail: String(lim), rows: resultRows.length });
        }
      }

      return {
        ok: true,
        columns: finalCols,
        rows: resultRows.map((r) => r.out),
        rowCount: resultRows.length,
        executionPlan: plan,
        elapsedMs: Math.max(0.1, Date.now() - t0)
      };
    } catch (err) {
      return { ok: false, error: err.message || String(err), columns: [], rows: [], executionPlan: [] };
    }
  }

  function runSqlTests(userSql, tests) {
    const res = runSql(userSql);
    if (!res.ok) {
      return {
        ok: false,
        passed: 0,
        total: tests.length,
        error: res.error,
        sqlResult: res,
        results: tests.map((t) => ({ name: t.name, input: "SQL query", expected: t.expectedDesc || "Valid result", actual: `SQL Error: ${res.error}`, ok: false }))
      };
    }
    const results = [];
    let passed = 0;
    for (const t of tests) {
      let ok = false;
      let actualDesc = "";
      try {
        const check = t.verify(res);
        ok = Boolean(check.ok);
        actualDesc = check.actual;
      } catch (e) {
        actualDesc = `Error: ${e.message}`;
      }
      if (ok) passed++;
      results.push({ name: t.name, input: t.input || "Result set", expected: t.expectedDesc, actual: actualDesc, ok });
    }
    return { ok: passed === tests.length, passed, total: tests.length, sqlResult: res, results };
  }

  // ==================== 5. VIRTUAL LINUX & GIT SHELL ENGINE ====================
  function createShellState(custom) {
    const base = {
      cwd: "/workspace/everylingo-app",
      files: {
        "/workspace/everylingo-app/README.md": "# EveryLingo API\nPORT=8080\nENV=production\n",
        "/workspace/everylingo-app/app.py": "def health():\n    return {'status': 'ok'}\n",
        "/workspace/everylingo-app/logs/server.log": "INFO boot ok\nWARN cache miss\nERROR db timeout on shard-2\nINFO retry ok\nERROR auth token expired\n"
      },
      dirs: new Set(["/workspace", "/workspace/everylingo-app", "/workspace/everylingo-app/logs"]),
      git: {
        initialized: false,
        branch: "main",
        branches: { main: null },
        staged: [],
        commits: []
      }
    };
    if (custom && custom.gitInit) {
      base.git.initialized = true;
      base.git.commits.push({ id: "a1b2c3d", msg: "chore: initial commit", branch: "main", parent: null });
      base.git.branches.main = "a1b2c3d";
    }
    return base;
  }

  function resolvePath(cwd, target) {
    if (!target || target === ".") return cwd;
    if (target.startsWith("/")) return target.replace(/\/+$/, "") || "/";
    const parts = cwd.split("/").filter(Boolean);
    for (const seg of target.split("/")) {
      if (!seg || seg === ".") continue;
      if (seg === "..") parts.pop();
      else parts.push(seg);
    }
    return "/" + parts.join("/");
  }

  function runShellScript(scriptText, initialCustom) {
    const st = createShellState(initialCustom);
    const outputs = [];
    const lines = String(scriptText || "").replace(/\r/g, "").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
    let hashSeq = 100;
    const nextHash = () => {
      hashSeq += 17;
      return ("f" + hashSeq.toString(16) + "9a4c").slice(0, 7);
    };

    for (const rawCmd of lines) {
      const cmdLine = rawCmd.replace(/^\$\s*/, "");
      outputs.push(`$ ${cmdLine}`);
      // Tokenize respecting quotes
      const args = [];
      const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
      let m;
      while ((m = re.exec(cmdLine)) !== null) args.push(m[1] ?? m[2] ?? m[3]);
      if (!args.length) continue;
      const bin = args[0];

      if (bin === "pwd") {
        outputs.push(st.cwd);
      } else if (bin === "ls") {
        const target = args.find((a) => !a.startsWith("-")) || st.cwd;
        const dirPath = resolvePath(st.cwd, target);
        const prefix = dirPath === "/" ? "/" : dirPath + "/";
        const entries = new Set();
        for (const d of st.dirs) {
          if (d.startsWith(prefix)) entries.add(d.slice(prefix.length).split("/")[0] + "/");
        }
        for (const f of Object.keys(st.files)) {
          if (f.startsWith(prefix)) entries.add(f.slice(prefix.length).split("/")[0]);
        }
        outputs.push(Array.from(entries).sort().join("  ") || "(empty)");
      } else if (bin === "cd") {
        const dest = resolvePath(st.cwd, args[1] || "/workspace/everylingo-app");
        if (st.dirs.has(dest)) st.cwd = dest;
        else outputs.push(`cd: no such directory: ${args[1]}`);
      } else if (bin === "mkdir") {
        const target = args[1] === "-p" ? args[2] : args[1];
        if (target) {
          const full = resolvePath(st.cwd, target);
          st.dirs.add(full);
          outputs.push(`created directory ${target}`);
        }
      } else if (bin === "touch") {
        if (args[1]) {
          const full = resolvePath(st.cwd, args[1]);
          if (!(full in st.files)) st.files[full] = "";
          outputs.push(`touched ${args[1]}`);
        }
      } else if (bin === "cat") {
        const full = resolvePath(st.cwd, args[1] || "");
        if (full in st.files) outputs.push(st.files[full].trimEnd());
        else outputs.push(`cat: ${args[1]}: No such file`);
      } else if (bin === "grep") {
        const pat = args[1] || "";
        const fileArg = args[2] || "";
        const full = resolvePath(st.cwd, fileArg);
        if (full in st.files) {
          const matched = st.files[full].split("\n").filter((l) => l.includes(pat));
          outputs.push(matched.length ? matched.join("\n") : "(no matches)");
        } else {
          outputs.push(`grep: ${fileArg}: No such file`);
        }
      } else if (bin === "echo") {
        const redirIdx = args.indexOf(">");
        if (redirIdx > 0 && args[redirIdx + 1]) {
          const content = args.slice(1, redirIdx).join(" ") + "\n";
          const full = resolvePath(st.cwd, args[redirIdx + 1]);
          st.files[full] = content;
        } else {
          outputs.push(args.slice(1).join(" "));
        }
      } else if (bin === "git") {
        const sub = args[1];
        if (sub === "init") {
          st.git.initialized = true;
          outputs.push(`Initialized empty Git repository in ${st.cwd}/.git/`);
        } else if (!st.git.initialized) {
          outputs.push("fatal: not a git repository (run `git init` first)");
        } else if (sub === "status") {
          outputs.push(`On branch ${st.git.branch}\nStaged files: ${st.git.staged.length ? st.git.staged.join(", ") : "none"}`);
        } else if (sub === "add") {
          const target = args[2] || ".";
          if (target === "." || target === "-A") {
            st.git.staged = Object.keys(st.files).map((f) => f.split("/").pop());
          } else if (!st.git.staged.includes(target)) {
            st.git.staged.push(target);
          }
          outputs.push(`Staged: ${st.git.staged.join(", ")}`);
        } else if (sub === "commit") {
          const mIdx = args.indexOf("-m");
          const msg = mIdx > 0 && args[mIdx + 1] ? args[mIdx + 1] : "update";
          if (!st.git.staged.length) {
            outputs.push("nothing to commit (run `git add .` first)");
          } else {
            const id = nextHash();
            const parent = st.git.branches[st.git.branch] || null;
            st.git.commits.push({ id, msg, branch: st.git.branch, parent });
            st.git.branches[st.git.branch] = id;
            st.git.staged = [];
            outputs.push(`[${st.git.branch} ${id}] ${msg}`);
          }
        } else if (sub === "branch") {
          if (args[2]) {
            st.git.branches[args[2]] = st.git.branches[st.git.branch] || null;
            outputs.push(`Created branch ${args[2]}`);
          } else {
            outputs.push(Object.keys(st.git.branches).map((b) => (b === st.git.branch ? `* ${b}` : `  ${b}`)).join("\n"));
          }
        } else if (sub === "checkout" || sub === "switch") {
          const createFlag = args[2] === "-b" || args[2] === "-c";
          const bName = createFlag ? args[3] : args[2];
          if (!bName) {
            outputs.push("error: missing branch name");
          } else if (createFlag) {
            st.git.branches[bName] = st.git.branches[st.git.branch] || null;
            st.git.branch = bName;
            outputs.push(`Switched to a new branch '${bName}'`);
          } else if (bName in st.git.branches) {
            st.git.branch = bName;
            outputs.push(`Switched to branch '${bName}'`);
          } else {
            outputs.push(`error: branch '${bName}' not found`);
          }
        } else if (sub === "merge") {
          const srcB = args[2];
          if (!srcB || !(srcB in st.git.branches)) {
            outputs.push(`merge: ${srcB} - not something we can merge`);
          } else {
            const id = nextHash();
            const parent = st.git.branches[st.git.branch] || null;
            const secondParent = st.git.branches[srcB] || null;
            st.git.commits.push({ id, msg: `Merge branch '${srcB}' into ${st.git.branch}`, branch: st.git.branch, parent, secondParent });
            st.git.branches[st.git.branch] = id;
            outputs.push(`Merge made by ort strategy: '${srcB}' → '${st.git.branch}' (${id})`);
          }
        } else if (sub === "log") {
          outputs.push(st.git.commits.slice().reverse().map((c) => `${c.id} (${c.branch}) ${c.msg}`).join("\n") || "(no commits yet)");
        } else {
          outputs.push(`git: '${sub}' is not a supported command in this sandbox`);
        }
      } else {
        outputs.push(`bash: ${bin}: command not found`);
      }
    }

    return { ok: true, out: outputs, state: st };
  }

  root.EVERYLINGO_CODE_ENGINE = {
    escHtml,
    deepEqual,
    formatValue,
    formatJsValue,
    detectLanguage,
    highlightCode,
    renderCodeCardHtml,
    runPython,
    runPythonTests,
    runJavaScriptTests,
    DEFAULT_SQL_DB,
    runSql,
    runSqlTests,
    createShellState,
    runShellScript
  };
})(typeof window !== "undefined" ? window : globalThis);
