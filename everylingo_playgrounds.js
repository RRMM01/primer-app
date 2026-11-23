// EveryLingo Interactive Visual Playgrounds (+7 Studios -> 20 Total Visual Playgrounds!)
// Registers: aiNeuralLab, htmlCssLivePlayground, pythonTraceLab, abstractShapesLab,
// physicsLawsPlayground, phHistoryCivicsLab, filipinoWikaLab.
(function (root) {
  "use strict";

  const VIZ = root.MATHLINGO_VISUALIZERS;
  if (!VIZ || !VIZ.registry) return;

  function el(tag, attrs, html) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "className") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      }
    }
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ==================== 14. AI NEURAL NETWORK, TEMPERATURE & ATTENTION LAB ====================
  function renderAiNeuralLab(container) {
    let tab = "neuron"; // neuron | temp | attention
    let actFn = "relu"; // relu | sigmoid | step
    let x1 = 2, x2 = 3, w1 = 2, w2 = -1, bias = 0;
    let temp = 0.8;
    let sampledWord = null;
    let attnMode = "tired"; // tired | wide
    let selectedWordIdx = 7; // "it"

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🤖 How AI Works: Live Neuron, Temperature & Self-Attention</div>
        <div class="ml-viz-sub">Drag neuron weights & ReLU, tune LLM sampling Temperature, and inspect Transformer Attention!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-ai-tab="neuron">⚡ Neuron + ReLU</button>
        <button type="button" class="ml-pill" data-ai-tab="temp">🎛️ Tokens & Temp</button>
        <button type="button" class="ml-pill" data-ai-tab="attention">🔦 Self-Attention</button>
      </div>
    `);
    const controls = el("div", { className: "ml-viz-controls" });
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    const tokenCandidates = [
      { tok: "blue", logit: 4.2 },
      { tok: "clear", logit: 3.1 },
      { tok: "bright", logit: 2.3 },
      { tok: "dark", logit: 1.5 },
      { tok: "violet", logit: 0.4 }
    ];

    function softmaxProbs(t) {
      const safeT = Math.max(0.08, t);
      const scaled = tokenCandidates.map((c) => c.logit / safeT);
      const maxS = Math.max(...scaled);
      const exps = scaled.map((v) => Math.exp(v - maxS));
      const sum = exps.reduce((a, b) => a + b, 0);
      return tokenCandidates.map((c, i) => ({ tok: c.tok, prob: exps[i] / sum }));
    }

    function renderControls() {
      if (tab === "neuron") {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>Input x₁ = <strong id="ai-x1-v">${x1}</strong> · Weight w₁ = <strong id="ai-w1-v">${w1}</strong></span>
            <input type="range" id="ai-w1" min="-4" max="4" step="1" value="${w1}" />
          </label>
          <label class="ml-slider-label">
            <span>Input x₂ = <strong id="ai-x2-v">${x2}</strong> · Weight w₂ = <strong id="ai-w2-v">${w2}</strong></span>
            <input type="range" id="ai-w2" min="-4" max="4" step="1" value="${w2}" />
          </label>
          <label class="ml-slider-label">
            <span>Bias b = <strong id="ai-b-v">${bias}</strong></span>
            <input type="range" id="ai-b" min="-6" max="6" step="1" value="${bias}" />
          </label>
          <div class="ml-slider-label">
            <span>Activation Gate</span>
            <div class="ml-viz-tabs">
              <button type="button" class="ml-pill ${actFn === "relu" ? "active" : ""}" data-ai-act="relu">ReLU</button>
              <button type="button" class="ml-pill ${actFn === "sigmoid" ? "active" : ""}" data-ai-act="sigmoid">Sigmoid</button>
              <button type="button" class="ml-pill ${actFn === "step" ? "active" : ""}" data-ai-act="step">Step</button>
            </div>
          </div>
        `;
        controls.querySelector("#ai-w1").addEventListener("input", (e) => { w1 = parseInt(e.target.value, 10); update(); });
        controls.querySelector("#ai-w2").addEventListener("input", (e) => { w2 = parseInt(e.target.value, 10); update(); });
        controls.querySelector("#ai-b").addEventListener("input", (e) => { bias = parseInt(e.target.value, 10); update(); });
        controls.querySelectorAll("[data-ai-act]").forEach((btn) => {
          btn.addEventListener("click", () => {
            actFn = btn.dataset.aiAct;
            renderControls();
          });
        });
      } else if (tab === "temp") {
        controls.innerHTML = `
          <label class="ml-slider-label" style="flex:2;">
            <span>Sampling Temperature T = <strong id="ai-t-v">${temp.toFixed(2)}</strong> (${temp <= 0.3 ? "Deterministic / Code" : temp <= 1.0 ? "Balanced" : "Creative / Wild!"})</span>
            <input type="range" id="ai-temp" min="0.1" max="2.0" step="0.1" value="${temp}" />
          </label>
          <div class="ml-slider-label" style="flex:0 0 auto; justify-content:flex-end;">
            <span>Autoregressive Roll</span>
            <button type="button" class="ml-btn-primary" id="ai-roll-tok">🎲 Sample Next Token</button>
          </div>
        `;
        controls.querySelector("#ai-temp").addEventListener("input", (e) => {
          temp = parseFloat(e.target.value);
          controls.querySelector("#ai-t-v").textContent = temp.toFixed(2);
          update();
        });
        controls.querySelector("#ai-roll-tok").addEventListener("click", () => {
          const dist = softmaxProbs(temp);
          let r = Math.random();
          let picked = dist[0].tok;
          for (const d of dist) {
            r -= d.prob;
            if (r <= 0) { picked = d.tok; break; }
          }
          sampledWord = picked;
          update();
        });
      } else {
        controls.innerHTML = `
          <div class="ml-slider-label">
            <span>Compare Ambiguous Pronoun Sentence</span>
            <div class="ml-viz-tabs">
              <button type="button" class="ml-pill ${attnMode === "tired" ? "active" : ""}" data-attn-m="tired">"...because IT was too TIRED"</button>
              <button type="button" class="ml-pill ${attnMode === "wide" ? "active" : ""}" data-attn-m="wide">"...because IT was too WIDE"</button>
            </div>
          </div>
        `;
        controls.querySelectorAll("[data-attn-m]").forEach((btn) => {
          btn.addEventListener("click", () => {
            attnMode = btn.dataset.attnM;
            selectedWordIdx = 7;
            renderControls();
          });
        });
      }
      update();
    }

    function update() {
      if (tab === "neuron") {
        const w1v = controls.querySelector("#ai-w1-v");
        const w2v = controls.querySelector("#ai-w2-v");
        const bv = controls.querySelector("#ai-b-v");
        if (w1v) w1v.textContent = String(w1);
        if (w2v) w2v.textContent = String(w2);
        if (bv) bv.textContent = String(bias);

        const z = w1 * x1 + w2 * x2 + bias;
        let out = 0;
        let outStr = "";
        if (actFn === "relu") {
          out = Math.max(0, z);
          outStr = String(out);
        } else if (actFn === "sigmoid") {
          out = 1 / (1 + Math.exp(-z));
          outStr = out.toFixed(3);
        } else {
          out = z >= 0 ? 1 : 0;
          outStr = String(out);
        }
        const c1 = w1 >= 0 ? "var(--ml-viz-green, #2d6a4f)" : "var(--ml-viz-rose, #9e4765)";
        const c2 = w2 >= 0 ? "var(--ml-viz-green, #2d6a4f)" : "var(--ml-viz-rose, #9e4765)";
        const sw1 = Math.max(1.5, Math.abs(w1) * 1.6);
        const sw2 = Math.max(1.5, Math.abs(w2) * 1.6);
        const activeColor = out > 0 ? "var(--ml-viz-green, #2d6a4f)" : "var(--ml-ink-faint, #847c6e)";

        stage.innerHTML = `
          <div class="ml-equation-hero">
            z = (${w1})(${x1}) + (${w2})(${x2}) + (${bias}) = <span class="ml-highlight-blue">${z}</span>
            <span class="ml-arrow">→</span>
            ${actFn.toUpperCase()}(${z}) = <strong style="color:${activeColor};">${outStr}</strong>
          </div>
          <svg viewBox="0 0 460 155" class="ml-svg-box" style="max-height:165px;">
            <line x1="88" y1="42" x2="220" y2="78" stroke="${c1}" stroke-width="${sw1}" stroke-linecap="round" />
            <line x1="88" y1="116" x2="220" y2="78" stroke="${c2}" stroke-width="${sw2}" stroke-linecap="round" />
            <line x1="258" y1="78" x2="365" y2="78" stroke="${activeColor}" stroke-width="4" stroke-linecap="round" />

            <circle cx="66" cy="42" r="22" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="2.5" />
            <text x="66" y="46" text-anchor="middle" fill="currentColor" font-size="13" font-weight="800">x₁=${x1}</text>
            <text x="150" y="48" text-anchor="middle" fill="${c1}" font-size="12" font-weight="800">w₁=${w1}</text>

            <circle cx="66" cy="116" r="22" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="2.5" />
            <text x="66" y="120" text-anchor="middle" fill="currentColor" font-size="13" font-weight="800">x₂=${x2}</text>
            <text x="150" y="116" text-anchor="middle" fill="${c2}" font-size="12" font-weight="800">w₂=${w2}</text>

            <circle cx="236" cy="78" r="28" fill="var(--ml-primary-soft, rgba(45,106,79,0.12))" stroke="${activeColor}" stroke-width="3" />
            <text x="236" y="75" text-anchor="middle" fill="currentColor" font-size="12" font-weight="800">Σ + b</text>
            <text x="236" y="91" text-anchor="middle" fill="var(--ml-viz-amber, #a96718)" font-size="11" font-weight="700">z=${z}</text>

            <rect x="366" y="54" width="80" height="48" rx="12" fill="var(--ml-surface, #fcfaf5)" stroke="${activeColor}" stroke-width="2.5" />
            <text x="406" y="73" text-anchor="middle" fill="var(--ml-ink-muted, #5c564b)" font-size="10" font-weight="700">${actFn.toUpperCase()}</text>
            <text x="406" y="91" text-anchor="middle" fill="${activeColor}" font-size="15" font-weight="900">${outStr}</text>
          </svg>
          <div class="ml-viz-note">Green edges vote <strong>YES (+)</strong>, rose edges vote <strong>NO (−)</strong>, and thicker lines carry stronger weight! Notice under ReLU, any <strong>z ≤ 0</strong> clamps cleanly to <strong>0</strong>.</div>
        `;
      } else if (tab === "temp") {
        const dist = softmaxProbs(temp);
        const promptToks = [
          { t: "The", id: 464 }, { t: " sky", id: 6766 }, { t: " is", id: 318 }, { t: " ___", id: "?" }
        ];
        stage.innerHTML = `
          <div class="ml-token-strip">
            ${promptToks.map((tk) => `<span class="ml-token-chip">${esc(tk.t)} <small>#${tk.id}</small></span>`).join("")}
            ${sampledWord ? `<span class="ml-token-chip sampled">→ "${esc(sampledWord)}"</span>` : ""}
          </div>
          <div class="ml-prob-bars">
            ${dist.map((d) => {
              const pct = Math.round(d.prob * 1000) / 10;
              return `
                <div class="ml-prob-row">
                  <span class="ml-prob-tok">"${esc(d.tok)}"</span>
                  <div class="ml-prob-track"><div class="ml-prob-fill" style="width:${Math.max(2, pct)}%"></div></div>
                  <strong class="ml-prob-pct">${pct.toFixed(1)}%</strong>
                </div>
              `;
            }).join("")}
          </div>
          <div class="ml-viz-note">Slide Temperature near <strong>0.10</strong> → "blue" locks to ~100% (great for JSON/code). Raise toward <strong>2.0</strong> → lower-ranked creative tokens like "violet" wake up!</div>
        `;
      } else {
        const words = ["The", "animal", "didn't", "cross", "the", "street", "because", "IT", "was", "too", attnMode === "tired" ? "tired" : "wide"];
        const weights = words.map((_w, i) => {
          if (selectedWordIdx === 7) {
            if (attnMode === "tired") return [0.02, 0.74, 0.02, 0.03, 0.01, 0.06, 0.02, 0.03, 0.01, 0.01, 0.05][i];
            return [0.01, 0.07, 0.02, 0.04, 0.02, 0.72, 0.02, 0.03, 0.01, 0.01, 0.05][i];
          }
          if (i === selectedWordIdx) return 0.52;
          return Math.abs(i - selectedWordIdx) === 1 ? 0.16 : 0.03;
        });
        const topIdx = weights.indexOf(Math.max(...weights));
        stage.innerHTML = `
          <div class="ml-viz-note" style="margin-bottom:10px;">Tap any word below (currently querying <strong>"${words[selectedWordIdx]}"</strong>) to inspect its Self-Attention spotlight weights:</div>
          <div class="ml-attn-grid">
            ${words.map((w, i) => {
              const pct = Math.round(weights[i] * 100);
              const isQuery = i === selectedWordIdx;
              const bgAlpha = (0.06 + weights[i] * 0.58).toFixed(2);
              return `
                <button type="button" class="ml-attn-word ${isQuery ? "query" : ""}" data-attn-i="${i}"
                  style="background:rgba(45, 106, 79, ${bgAlpha}); border-color:${isQuery ? "var(--ml-viz-amber, #a96718)" : "var(--ml-border-strong)"};">
                  <strong>${esc(w)}</strong>
                  <span>${pct}%</span>
                </button>
              `;
            }).join("")}
          </div>
          <div class="ml-easy-box" style="margin-top:12px;">
            <strong>🔦 Strongest Attention Match:</strong> "${words[selectedWordIdx]}" attends most heavily to <strong>"${words[topIdx]}" (${Math.round(weights[topIdx] * 100)}%)</strong> — simply swapping <em>tired ↔ wide</em> completely flips what "IT" means!
          </div>
        `;
        stage.querySelectorAll("[data-attn-i]").forEach((btn) => {
          btn.addEventListener("click", () => {
            selectedWordIdx = parseInt(btn.dataset.attnI, 10);
            update();
          });
        });
      }
    }

    header.querySelectorAll("[data-ai-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-ai-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.aiTab;
        renderControls();
      });
    });
    renderControls();
  }

  // ==================== 15. LIVE HTML/CSS SANDBOX & BOX-MODEL / FLEXBOX STUDIO ====================
  function renderHtmlCssLivePlayground(container) {
    let tab = "sandbox"; // sandbox | boxmodel | flexbox
    const presets = {
      card: {
        label: "Obsidian Card",
        html: `<article class="card">\n  <span class="tag">EveryLingo</span>\n  <h3>Hello, Live Web!</h3>\n  <p>Edit HTML, CSS & JS on the left and watch this card update live.</p>\n  <button type="button" class="btn" id="cta">Clicked 0×</button>\n</article>`,
        css: `body { font-family: Inter, system-ui, sans-serif; padding: 16px; background: #070709; color: #f4f4f6; margin: 0; }\n.card { background: #101015; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px; max-width: 300px; box-shadow: 0 8px 24px rgba(0,0,0,0.45); }\n.tag { font-size: 11px; font-weight: 700; color: #8eb8a3; text-transform: uppercase; letter-spacing: 0.08em; }\nh3 { margin: 6px 0; color: #f7f7f9; }\np { font-size: 13px; color: #9a9aa6; margin: 0 0 14px; line-height: 1.5; }\n.btn { background: #8da69a; color: #060a08; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: transform 0.15s, background 0.15s; }\n.btn:hover { background: #9fb8ac; transform: translateY(-1px); }`,
        js: `let count = 0;\nconst btn = document.getElementById("cta");\nbtn.addEventListener("click", () => {\n  count++;\n  btn.textContent = "Clicked " + count + "×";\n  console.log("Button clicked:", count);\n});\nconsole.log("DOM ready! Click the button.");`
      },
      jsArray: {
        label: "JS .map & .filter",
        html: `<div class="box">\n  <h3>Array Pipeline</h3>\n  <pre id="out">Running...</pre>\n</div>`,
        css: `body { font-family: Inter, system-ui, sans-serif; margin: 0; padding: 16px; background: #070709; color: #f4f4f6; }\n.box { background: #101015; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 14px; }\nh3 { margin: 0 0 10px; font-size: 15px; }\npre { background: #040406; color: #8eb8a3; border: 1px solid rgba(255,255,255,0.08); padding: 12px; border-radius: 8px; font-size: 12.5px; margin: 0; }`,
        js: `const scores = [58, 74, 88, 95, 62, 91];\nconst passing = scores.filter(s => s >= 75);\nconst curved = passing.map(s => Math.min(100, s + 5));\nconst avg = (curved.reduce((a, b) => a + b, 0) / curved.length).toFixed(1);\ndocument.getElementById("out").textContent =\n  "Passing: " + JSON.stringify(passing) +\n  "\\nCurved (+5): " + JSON.stringify(curved) +\n  "\\nAverage: " + avg;\nconsole.log("Curved scores:", curved);`
      },
      navbar: {
        label: "Flex Navbar",
        html: `<header class="nav">\n  <strong>EveryLingo</strong>\n  <nav class="links">\n    <a href="#math">Math</a>\n    <a href="#ai">AI</a>\n    <a href="#code">Code</a>\n  </nav>\n</header>`,
        css: `body { font-family: Inter, system-ui, sans-serif; margin: 0; padding: 16px; background: #070709; color: #f4f4f6; }\n.nav { display: flex; justify-content: space-between; align-items: center; background: #101015; border: 1px solid rgba(255,255,255,0.12); color: #f7f7f9; padding: 12px 16px; border-radius: 12px; }\n.links { display: flex; gap: 14px; }\n.links a { color: #8eb8a3; text-decoration: none; font-weight: 600; font-size: 13px; }`,
        js: `console.log("Flexbox navbar rendered cleanly!");`
      },
      grid: {
        label: "CSS Grid Gallery",
        html: `<div class="gallery">\n  <div class="tile">1 · HTML</div>\n  <div class="tile">2 · CSS</div>\n  <div class="tile">3 · JS</div>\n  <div class="tile">4 · AI</div>\n</div>`,
        css: `body { font-family: Inter, system-ui, sans-serif; margin: 0; padding: 16px; background: #070709; }\n.gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }\n.tile { background: #11131a; border: 1px solid rgba(142,184,163,0.28); color: #f4f4f6; padding: 18px 12px; border-radius: 10px; text-align: center; font-weight: 700; cursor: pointer; }`,
        js: `document.querySelectorAll(".tile").forEach((t) => {\n  t.addEventListener("click", () => console.log("Tapped:", t.textContent));\n});`
      }
    };
    let htmlCode = presets.card.html;
    let cssCode = presets.card.css;
    let jsCode = presets.card.js;
    let jsLogs = [];
    let bmWidth = 180, bmPad = 18, bmBorder = 5, bmMargin = 14, bmSizing = "border-box";
    let flexDir = "row", flexJustify = "space-between", flexAlign = "center", flexGap = 10;

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🎨 Live HTML + CSS + JavaScript Sandbox & Layout Studio</div>
        <div class="ml-viz-sub">Write real HTML, CSS & live JavaScript (with safe sandboxed console), or inspect Box Model & Flexbox live!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-web-tab="sandbox">💻 Live HTML/CSS/JS</button>
        <button type="button" class="ml-pill" data-web-tab="boxmodel">📦 Box Model</button>
        <button type="button" class="ml-pill" data-web-tab="flexbox">📐 Flexbox Lab</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function buildSrcdoc() {
      const openScript = "<" + "script>";
      const closeScript = "</" + "script>";
      const safeUserJs = jsCode.replace(new RegExp("<" + "/script", "gi"), "<\\/" + "script");
      const bridge = `
        (function(){
          function send(kind, args){
            try {
              const txt = Array.from(args).map(function(a){
                if (typeof a === "object" && a !== null) { try { return JSON.stringify(a); } catch(e) { return String(a); } }
                return String(a);
              }).join(" ");
              parent.postMessage({ type: "ml-sb-log", kind: kind, text: txt }, "*");
            } catch(e){}
          }
          console.log = function(){ send("log", arguments); };
          console.error = function(){ send("err", arguments); };
          window.addEventListener("error", function(ev){ send("err", [ev.message]); });
        })();
      `;
      return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box;}${cssCode}</style></head><body>${htmlCode}${openScript}${bridge}${closeScript}${openScript}try{\n${safeUserJs}\n}catch(err){console.error(err.message);}${closeScript}</body></html>`;
    }

    function render() {
      if (tab === "sandbox") {
        jsLogs = [];
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:10px;">
            ${Object.entries(presets).map(([k, p]) => `<button type="button" class="ml-btn-mini" data-web-preset="${k}">✨ ${p.label}</button>`).join("")}
            <button type="button" class="ml-btn-primary" id="ml-sb-run" style="padding:6px 12px; font-size:12px;">▶ Run JS</button>
          </div>
          <div class="ml-sandbox-grid">
            <div class="ml-sandbox-editors">
              <label class="ml-code-label">HTML Markup
                <textarea id="ml-sb-html" class="ml-code-textarea" rows="4" spellcheck="false">${esc(htmlCode)}</textarea>
              </label>
              <label class="ml-code-label">CSS Styles
                <textarea id="ml-sb-css" class="ml-code-textarea" rows="4" spellcheck="false">${esc(cssCode)}</textarea>
              </label>
              <label class="ml-code-label">⚡ JavaScript (DOM & Console)
                <textarea id="ml-sb-js" class="ml-code-textarea" rows="4" spellcheck="false">${esc(jsCode)}</textarea>
              </label>
            </div>
            <div class="ml-sandbox-preview-wrap">
              <div class="ml-code-label" style="margin-bottom:6px;">Live Sandboxed Browser Preview (Isolated JS Enabled)</div>
              <iframe id="ml-sb-frame" class="ml-sandbox-iframe" sandbox="allow-scripts" title="Live HTML CSS JS Preview"></iframe>
              <div class="ml-micro-label" style="margin-top:8px;">JS Console Output</div>
              <div id="ml-sb-console" class="ml-py-out" style="min-height:54px; max-height:110px; overflow:auto; font-size:12px;"><span style="opacity:0.6;">(waiting for console.log...)</span></div>
            </div>
          </div>
        `;
        const frame = stage.querySelector("#ml-sb-frame");
        const htmlTa = stage.querySelector("#ml-sb-html");
        const cssTa = stage.querySelector("#ml-sb-css");
        const jsTa = stage.querySelector("#ml-sb-js");
        const conEl = stage.querySelector("#ml-sb-console");

        const onMsg = (ev) => {
          if (!frame || !frame.contentWindow || ev.source !== frame.contentWindow) return;
          if (!ev.data || ev.data.type !== "ml-sb-log") return;
          jsLogs.push(ev.data);
          if (jsLogs.length > 18) jsLogs.shift();
          if (conEl) {
            conEl.innerHTML = jsLogs.map((l) => `<div style="color:${l.kind === "err" ? "var(--ml-viz-rose)" : "inherit"};">${l.kind === "err" ? "⚠️ " : "› "}${esc(l.text)}</div>`).join("");
          }
        };
        if (window._mlSbMsgHandler) window.removeEventListener("message", window._mlSbMsgHandler);
        window._mlSbMsgHandler = onMsg;
        window.addEventListener("message", onMsg);

        const sync = () => {
          htmlCode = htmlTa.value;
          cssCode = cssTa.value;
          jsCode = jsTa.value;
          jsLogs = [];
          if (conEl) conEl.innerHTML = `<span style="opacity:0.6;">(running...)</span>`;
          frame.setAttribute("srcdoc", buildSrcdoc());
        };
        frame.setAttribute("srcdoc", buildSrcdoc());
        htmlTa.addEventListener("input", sync);
        cssTa.addEventListener("input", sync);
        stage.querySelector("#ml-sb-run").addEventListener("click", sync);
        stage.querySelectorAll("[data-web-preset]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const p = presets[btn.dataset.webPreset];
            htmlCode = p.html;
            cssCode = p.css;
            jsCode = p.js || "";
            render();
          });
        });
      } else if (tab === "boxmodel") {
        const renderedOuter = bmSizing === "border-box" ? bmWidth : bmWidth + 2 * bmPad + 2 * bmBorder;
        const innerContent = bmSizing === "border-box" ? Math.max(40, bmWidth - 2 * bmPad - 2 * bmBorder) : bmWidth;
        stage.innerHTML = `
          <div class="ml-viz-controls" style="margin-bottom:14px;">
            <label class="ml-slider-label"><span>Declared width: <strong>${bmWidth}px</strong></span><input type="range" id="bm-w" min="120" max="260" step="10" value="${bmWidth}" /></label>
            <label class="ml-slider-label"><span>Padding: <strong>${bmPad}px</strong></span><input type="range" id="bm-p" min="0" max="36" step="2" value="${bmPad}" /></label>
            <label class="ml-slider-label"><span>Border: <strong>${bmBorder}px</strong></span><input type="range" id="bm-b" min="1" max="12" step="1" value="${bmBorder}" /></label>
            <label class="ml-slider-label"><span>Margin: <strong>${bmMargin}px</strong></span><input type="range" id="bm-m" min="0" max="30" step="2" value="${bmMargin}" /></label>
          </div>
          <div class="ml-viz-tabs" style="margin-bottom:12px;">
            <button type="button" class="ml-pill ${bmSizing === "border-box" ? "active" : ""}" data-bm-s="border-box">✅ box-sizing: border-box</button>
            <button type="button" class="ml-pill ${bmSizing === "content-box" ? "active" : ""}" data-bm-s="content-box">⚠️ default: content-box</button>
          </div>
          <div class="ml-equation-hero">
            Declared: <strong>${bmWidth}px</strong> → Actual Outer Box Width: <strong class="ml-highlight-blue">${renderedOuter}px</strong> (Content core: ${innerContent}px)
          </div>
          <div style="display:flex; justify-content:center; padding:8px 0;">
            <div style="background:var(--ml-amber-soft); border:1px dashed var(--ml-viz-amber); padding:${bmMargin}px; border-radius:12px;">
              <div style="font-size:10px; font-weight:700; color:var(--ml-amber); margin-bottom:4px;">MARGIN (${bmMargin}px outside)</div>
              <div style="width:${renderedOuter}px; max-width:100%; background:var(--ml-primary-soft); border:${bmBorder}px solid var(--ml-viz-blue); padding:${bmPad}px; border-radius:8px; text-align:center;">
                <div style="background:var(--ml-surface); border:1px solid var(--ml-border-strong); padding:10px 6px; border-radius:6px; font-weight:700; font-size:13px;">
                  CONTENT (${innerContent}px)
                </div>
                <div style="font-size:10px; color:var(--ml-primary); margin-top:4px; font-weight:700;">PADDING (${bmPad}px) · BORDER (${bmBorder}px)</div>
              </div>
            </div>
          </div>
        `;
        stage.querySelector("#bm-w").addEventListener("input", (e) => { bmWidth = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#bm-p").addEventListener("input", (e) => { bmPad = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#bm-b").addEventListener("input", (e) => { bmBorder = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#bm-m").addEventListener("input", (e) => { bmMargin = parseInt(e.target.value, 10); render(); });
        stage.querySelectorAll("[data-bm-s]").forEach((btn) => {
          btn.addEventListener("click", () => { bmSizing = btn.dataset.bmS; render(); });
        });
      } else {
        stage.innerHTML = `
          <div class="ml-viz-controls" style="margin-bottom:12px;">
            <div class="ml-slider-label">
              <span>flex-direction (Main Axis)</span>
              <div class="ml-viz-tabs">
                ${["row", "column"].map((d) => `<button type="button" class="ml-pill ${flexDir === d ? "active" : ""}" data-fl-d="${d}">${d}</button>`).join("")}
              </div>
            </div>
            <div class="ml-slider-label">
              <span>justify-content (Main)</span>
              <div class="ml-viz-tabs">
                ${["flex-start", "center", "space-between", "flex-end"].map((j) => `<button type="button" class="ml-pill ${flexJustify === j ? "active" : ""}" data-fl-j="${j}">${j}</button>`).join("")}
              </div>
            </div>
            <div class="ml-slider-label">
              <span>align-items (Cross)</span>
              <div class="ml-viz-tabs">
                ${["flex-start", "center", "flex-end", "stretch"].map((a) => `<button type="button" class="ml-pill ${flexAlign === a ? "active" : ""}" data-fl-a="${a}">${a}</button>`).join("")}
              </div>
            </div>
          </div>
          <div style="display:flex; flex-direction:${flexDir}; justify-content:${flexJustify}; align-items:${flexAlign}; gap:${flexGap}px; min-height:145px; padding:12px; border-radius:12px; background:var(--ml-bg); border:1px dashed var(--ml-border-strong);">
            <div class="ml-flex-demo-box">Item 1</div>
            <div class="ml-flex-demo-box" style="padding:14px 16px;">Item 2 (Tall)</div>
            <div class="ml-flex-demo-box">Item 3</div>
          </div>
          <pre class="ml-q-code" style="margin-top:10px;"><code>display: flex;\nflex-direction: ${flexDir};\njustify-content: ${flexJustify};\nalign-items: ${flexAlign};\ngap: ${flexGap}px;</code></pre>
        `;
        stage.querySelectorAll("[data-fl-d]").forEach((b) => b.addEventListener("click", () => { flexDir = b.dataset.flD; render(); }));
        stage.querySelectorAll("[data-fl-j]").forEach((b) => b.addEventListener("click", () => { flexJustify = b.dataset.flJ; render(); }));
        stage.querySelectorAll("[data-fl-a]").forEach((b) => b.addEventListener("click", () => { flexAlign = b.dataset.flA; render(); }));
      }
    }

    header.querySelectorAll("[data-web-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-web-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.webTab;
        render();
      });
    });
    render();
  }

  // ==================== 16. PYTHON STEP TRACER, 8-BIT BINARY & BIG-O LAB ====================
  function renderPythonTraceLab(container) {
    let tab = "runner"; // runner | trace | binary | bigo
    let scriptKey = "loop";
    let stepIdx = 0;
    let bits = [0, 0, 0, 1, 0, 1, 1, 0]; // 22 decimal!
    let bigN = 1000;
    const pyChallenges = {
      mod: { label: "Quotient & Modulo", code: "a = 17\nb = 5\nprint(a // b, a % b)\nprint('Power:', 2 ** 4)" },
      loop: { label: "For Loop Sum", code: "total = 0\nfor i in range(1, 6):\n    total += i\n    print(f'i={i} -> total={total}')\nprint('Final sum:', total)" },
      twoSum: { label: "Two-Sum Hash Map", code: "def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        need = target - n\n        if need in seen:\n            return [seen[need], i]\n        seen[n] = i\n    return []\n\nprint('Pair:', two_sum([2, 7, 11, 15], 9))" },
      rec: { label: "Recursion Stack", code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nfor k in range(1, 6):\n    print(f'{k}! = {factorial(k)}')" },
      oop: { label: "Class & Methods", code: "class Hero:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n    def hit(self, dmg):\n        self.hp = max(0, self.hp - dmg)\n        return f'{self.name} HP={self.hp}'\n\nh = Hero('Aria', 100)\nprint(h.hit(35), '|', h.hit(80))" }
    };
    let pyCode = pyChallenges.twoSum.code;
    let pyOutLines = [];
    let pyVarsSnap = {};

    function runMiniPython(src) {
      if (root.EVERYLINGO_CODE_ENGINE && typeof root.EVERYLINGO_CODE_ENGINE.runPython === "function") {
        const res = root.EVERYLINGO_CODE_ENGINE.runPython(src, { trace: true });
        return {
          ok: res.ok,
          out: res.ok ? res.out : [...res.out, "⚠️ Error: " + res.error],
          vars: res.vars || {},
          trace: res.trace || []
        };
      }
      const env = Object.create(null);
      const out = [];
      const rawLines = src.replace(/\r/g, "").split("\n");
      const lines = rawLines.map((raw, idx) => {
        const stripped = raw.replace(/#.*$/, "");
        const indent = raw.match(/^\s*/)[0].length;
        return { raw, text: stripped.trim(), indent, num: idx + 1 };
      }).filter((l) => l.text.length > 0);

      function fmtPyVal(v) {
        if (v === true) return "True";
        if (v === false) return "False";
        if (v === null || v === undefined) return "None";
        if (Array.isArray(v)) return "[" + v.map((x) => typeof x === "string" ? `'${x}'` : fmtPyVal(x)).join(", ") + "]";
        return String(v);
      }

      function pySlice(seq, sSpec) {
        const parts = sSpec.split(":").map((p) => p.trim());
        const n = seq.length;
        const norm = (idx, def) => {
          if (idx === "" || idx === undefined) return def;
          let v = Number(evalExpr(idx));
          if (v < 0) v = n + v;
          return Math.max(0, Math.min(n, v));
        };
        if (parts.length === 1) {
          let i = Number(evalExpr(parts[0]));
          if (i < 0) i = n + i;
          return seq[i];
        }
        const step = parts[2] && parts[2] !== "" ? Number(evalExpr(parts[2])) : 1;
        if (step === -1 && parts[0] === "" && parts[1] === "") {
          return Array.isArray(seq) ? seq.slice().reverse() : String(seq).split("").reverse().join("");
        }
        const start = norm(parts[0], 0);
        const end = norm(parts[1], n);
        if (step === 1) return seq.slice(start, end);
        const res = [];
        for (let i = start; step > 0 ? i < end : i > end; i += step) res.push(seq[i]);
        return Array.isArray(seq) ? res : res.join("");
      }

      function evalExpr(exprStr) {
        let s = String(exprStr || "").trim();
        if (!s) return null;
        // Replace Python slice syntax arr[a:b] or arr[-1] via helper call
        s = s.replace(/\b([a-zA-Z_]\w*)\[([^\]]+)\]/g, (_m, name, idxExpr) => {
          return `__pyGet(${name}, ${JSON.stringify(idxExpr)})`;
        });
        // Replace Python floor division a // b carefully
        let guard = 0;
        while (s.includes("//") && guard < 12) {
          s = s.replace(/([a-zA-Z0-9_.)\]]+)\s*\/\/\s*([a-zA-Z0-9_.(\-]+|\([^()]+\))/, "Math.floor(($1)/($2))");
          guard++;
        }
        s = s
          .replace(/\bTrue\b/g, "true")
          .replace(/\bFalse\b/g, "false")
          .replace(/\bNone\b/g, "null")
          .replace(/\band\b/g, "&&")
          .replace(/\bor\b/g, "||")
          .replace(/\bnot\b/g, "!");
        const helpers = {
          len: (x) => (x != null && typeof x.length === "number" ? x.length : 0),
          sum: (arr) => (Array.isArray(arr) ? arr.reduce((a, b) => a + Number(b), 0) : Number(arr)),
          min: (...a) => Math.min(...(a.length === 1 && Array.isArray(a[0]) ? a[0] : a)),
          max: (...a) => Math.max(...(a.length === 1 && Array.isArray(a[0]) ? a[0] : a)),
          abs: (x) => Math.abs(x),
          int: (x) => parseInt(x, 10),
          float: (x) => parseFloat(x),
          str: (x) => fmtPyVal(x),
          sorted: (arr) => (Array.isArray(arr) ? arr.slice().sort((a, b) => a - b) : arr),
          range: (...args) => {
            const st = args.length >= 2 ? args[0] : 0;
            const en = args.length >= 2 ? args[1] : args[0];
            const step = args.length >= 3 ? args[2] : 1;
            const arr = [];
            if (step === 0) return arr;
            for (let v = st; step > 0 ? v < en : v > en; v += step) {
              arr.push(v);
              if (arr.length > 250) break;
            }
            return arr;
          },
          __pyGet: (seq, spec) => pySlice(seq, spec)
        };
        const keys = [...Object.keys(helpers), ...Object.keys(env)];
        const vals = [...Object.values(helpers), ...Object.values(env)];
        const fn = new Function(...keys, `"use strict"; return (${s});`);
        return fn(...vals);
      }

      function splitArgs(argStr) {
        const res = [];
        let cur = "", depth = 0, quote = null;
        for (let i = 0; i < argStr.length; i++) {
          const ch = argStr[i];
          if (quote) {
            cur += ch;
            if (ch === quote && argStr[i - 1] !== "\\") quote = null;
          } else if (ch === "'" || ch === "\"") {
            quote = ch;
            cur += ch;
          } else if (ch === "(" || ch === "[" || ch === "{") {
            depth++;
            cur += ch;
          } else if (ch === ")" || ch === "]" || ch === "}") {
            depth--;
            cur += ch;
          } else if (ch === "," && depth === 0) {
            res.push(cur.trim());
            cur = "";
          } else {
            cur += ch;
          }
        }
        if (cur.trim()) res.push(cur.trim());
        return res;
      }

      let ops = 0;
      function execBlock(startIdx, endIdx) {
        let i = startIdx;
        let lastIfMatched = false;
        while (i < endIdx) {
          if (++ops > 800) throw new Error("Loop safety limit reached (800 ops).");
          const ln = lines[i];
          const text = ln.text;

          if (/^(for|if|elif|else)\b.*:$/.test(text)) {
            let blockEnd = i + 1;
            while (blockEnd < endIdx && lines[blockEnd].indent > ln.indent) blockEnd++;

            const forM = text.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+(.+):$/);
            if (forM) {
              const iter = evalExpr(forM[2]);
              if (!Array.isArray(iter) && typeof iter !== "string") throw new Error(`Line ${ln.num}: not iterable`);
              for (const item of iter) {
                env[forM[1]] = item;
                execBlock(i + 1, blockEnd);
              }
              lastIfMatched = false;
            } else if (text.startsWith("if ")) {
              const cond = Boolean(evalExpr(text.slice(3, -1)));
              lastIfMatched = cond;
              if (cond) execBlock(i + 1, blockEnd);
            } else if (text.startsWith("elif ")) {
              if (!lastIfMatched && Boolean(evalExpr(text.slice(5, -1)))) {
                lastIfMatched = true;
                execBlock(i + 1, blockEnd);
              }
            } else if (text === "else:") {
              if (!lastIfMatched) execBlock(i + 1, blockEnd);
              lastIfMatched = false;
            }
            i = blockEnd;
            continue;
          }

          lastIfMatched = false;
          const prM = text.match(/^print\((.*)\)$/);
          if (prM) {
            const parts = splitArgs(prM[1]).map((a) => fmtPyVal(evalExpr(a)));
            out.push(parts.join(" "));
          } else {
            const augM = text.match(/^([a-zA-Z_]\w*)\s*(\+=|-=|\*=|\/=)\s*(.+)$/);
            const asgM = text.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
            if (augM) {
              const cur = Number(env[augM[1]] || 0);
              const val = Number(evalExpr(augM[3]));
              env[augM[1]] = augM[2] === "+=" ? cur + val : augM[2] === "-=" ? cur - val : augM[2] === "*=" ? cur * val : cur / val;
            } else if (asgM) {
              env[asgM[1]] = evalExpr(asgM[2]);
            } else {
              evalExpr(text);
            }
          }
          i++;
        }
      }

      try {
        execBlock(0, lines.length);
        return { ok: true, out, vars: Object.fromEntries(Object.entries(env).map(([k, v]) => [k, fmtPyVal(v)])) };
      } catch (err) {
        return { ok: false, out: [...out, "⚠️ Error: " + err.message], vars: Object.fromEntries(Object.entries(env).map(([k, v]) => [k, fmtPyVal(v)])) };
      }
    }

    const scripts = {
      loop: {
        title: "for + range(1, 5) Sum",
        lines: [
          "total = 0",
          "for i in range(1, 5):",
          "    total += i",
          "print(f'Done: {total}')"
        ],
        steps: [
          { line: 0, vars: { total: 0 }, out: [], note: "Initialize `total = 0` in memory." },
          { line: 1, vars: { total: 0, i: 1 }, out: [], note: "`range(1, 5)` yields first item `i = 1` (stop 5 is exclusive!)." },
          { line: 2, vars: { total: 1, i: 1 }, out: [], note: "`total` becomes `0 + 1 = 1`." },
          { line: 2, vars: { total: 3, i: 2 }, out: [], note: "Next iteration `i = 2` → `total` becomes `1 + 2 = 3`." },
          { line: 2, vars: { total: 6, i: 3 }, out: [], note: "Next iteration `i = 3` → `total` becomes `3 + 3 = 6`." },
          { line: 2, vars: { total: 10, i: 4 }, out: [], note: "Final iteration `i = 4` (5 is skipped!) → `total = 10`." },
          { line: 3, vars: { total: 10, i: 4 }, out: ["Done: 10"], note: "Loop ends cleanly; f-string prints `Done: 10`!" }
        ]
      },
      slice: {
        title: "List Slicing & Comprehension",
        lines: [
          "nums = [2, 5, 8, 11]",
          "mid = nums[1:3]",
          "evens = [x*2 for x in nums if x%2==0]",
          "print(mid, evens)"
        ],
        steps: [
          { line: 0, vars: { nums: "[2, 5, 8, 11]" }, out: [], note: "Zero-based indices: 0→2, 1→5, 2→8, 3→11." },
          { line: 1, vars: { nums: "[2, 5, 8, 11]", mid: "[5, 8]" }, out: [], note: "`nums[1:3]` grabs indices 1 and 2 (index 3 excluded!)." },
          { line: 2, vars: { nums: "[2, 5, 8, 11]", mid: "[5, 8]", evens: "[4, 16]" }, out: [], note: "Filters evens (2, 8) and doubles each → `[4, 16]`!" },
          { line: 3, vars: { nums: "[2, 5, 8, 11]", mid: "[5, 8]", evens: "[4, 16]" }, out: ["[5, 8] [4, 16]"], note: "Prints both new lists without mutating `nums`!" }
        ]
      },
      bsearch: {
        title: "Binary Search O(log n)",
        lines: [
          "arr = [3, 7, 12, 18, 25, 31, 40]",
          "lo, hi, target = 0, 6, 31",
          "mid = (lo + hi) // 2   # check arr[mid]",
          "lo = mid + 1           # drop left half!",
          "mid = (lo + hi) // 2   # FOUND 31 at idx 5!"
        ],
        steps: [
          { line: 0, vars: { arr_len: 7 }, out: [], note: "Sorted array — prerequisite for Binary Search!" },
          { line: 1, vars: { lo: 0, hi: 6, target: 31 }, out: [], note: "Search window spans indices 0..6." },
          { line: 2, vars: { lo: 0, hi: 6, mid: 3, "arr[mid]": 18 }, out: [], note: "1st check: `arr[3] = 18 < 31` — entire left half [3,7,12,18] eliminated!" },
          { line: 3, vars: { lo: 4, hi: 6, target: 31 }, out: [], note: "Move `lo = 4`. Only 3 candidates left!" },
          { line: 4, vars: { lo: 4, hi: 6, mid: 5, "arr[mid]": 31 }, out: ["Found 31 at index 5 in 2 steps!"], note: "`(4+6)//2 = 5` → `arr[5] == 31` FOUND in just 2 steps!" }
        ]
      }
    };

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🐍 Interactive Mini-Python Runner, Step Tracer, 8-Bit Binary & Big-O Lab</div>
        <div class="ml-viz-sub">Write & run real offline Python snippets, step through memory, flip binary bits, and watch Big-O scale!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-py-tab="runner">▶ Live Mini-Python</button>
        <button type="button" class="ml-pill" data-py-tab="trace">🐍 Step Tracer</button>
        <button type="button" class="ml-pill" data-py-tab="binary">💾 8-Bit Binary/Hex</button>
        <button type="button" class="ml-pill" data-py-tab="bigo">🚀 Big-O Scaling</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function render() {
      if (tab === "runner") {
        const res = runMiniPython(pyCode);
        pyOutLines = res.out;
        pyVarsSnap = res.vars;
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:10px;">
            ${Object.entries(pyChallenges).map(([k, ch]) => `<button type="button" class="ml-btn-mini" data-py-ch="${k}">✨ ${ch.label}</button>`).join("")}
            <button type="button" class="ml-btn-primary" id="ml-py-run-btn" style="padding:6px 12px; font-size:12px;">▶ Run Python</button>
          </div>
          <div class="ml-py-trace-grid">
            <div>
              <label class="ml-code-label">Editable Mini-Python (supports // % **, if/elif/else, for ... in range, slicing, print)
                <textarea id="ml-py-editor" class="ml-code-textarea" rows="7" spellcheck="false">${esc(pyCode)}</textarea>
              </label>
            </div>
            <div class="ml-py-mem-panel">
              <div class="ml-micro-label">Console Output</div>
              <div class="ml-py-out" id="ml-py-live-out">${pyOutLines.length ? pyOutLines.map((o) => esc(o)).join("<br>") : "<span style='opacity:0.55;'>(no print output)</span>"}</div>
              <div class="ml-micro-label" style="margin-top:10px;">Final Variables</div>
              <div class="ml-py-vars">
                ${Object.keys(pyVarsSnap).length ? Object.entries(pyVarsSnap).map(([k, v]) => `<div class="ml-py-var-chip"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("") : "<span style='opacity:0.55; font-size:12px;'>(none)</span>"}
              </div>
            </div>
          </div>
        `;
        const ed = stage.querySelector("#ml-py-editor");
        stage.querySelector("#ml-py-run-btn").addEventListener("click", () => {
          pyCode = ed.value;
          render();
        });
        stage.querySelectorAll("[data-py-ch]").forEach((btn) => {
          btn.addEventListener("click", () => {
            pyCode = pyChallenges[btn.dataset.pyCh].code;
            render();
          });
        });
      } else if (tab === "trace") {
        const sc = scripts[scriptKey];
        const st = sc.steps[Math.min(stepIdx, sc.steps.length - 1)];
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:10px;">
            ${Object.entries(scripts).map(([k, v]) => `<button type="button" class="ml-btn-mini ${k === scriptKey ? "active" : ""}" data-py-sc="${k}">${v.title}</button>`).join("")}
          </div>
          <div class="ml-py-trace-grid">
            <div class="ml-py-code-panel">
              ${sc.lines.map((ln, idx) => `
                <div class="ml-py-line ${idx === st.line ? "active" : ""}">
                  <span class="ml-py-ln">${idx + 1}</span>
                  <code>${esc(ln)}</code>
                </div>
              `).join("")}
            </div>
            <div class="ml-py-mem-panel">
              <div class="ml-micro-label">Live Memory Variables</div>
              <div class="ml-py-vars">
                ${Object.entries(st.vars).map(([k, v]) => `<div class="ml-py-var-chip"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("")}
              </div>
              <div class="ml-micro-label" style="margin-top:10px;">Console Output</div>
              <div class="ml-py-out">${st.out.length ? st.out.map((o) => esc(o)).join("<br>") : "<span style='opacity:0.55;'>(nothing printed yet)</span>"}</div>
            </div>
          </div>
          <div class="ml-easy-box" style="margin:10px 0;"><strong>Step ${stepIdx + 1}/${sc.steps.length}:</strong> ${esc(st.note)}</div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="ml-btn-secondary" id="py-prev" ${stepIdx === 0 ? "disabled" : ""}>← Step Back</button>
            <button type="button" class="ml-btn-primary" id="py-next" ${stepIdx >= sc.steps.length - 1 ? "disabled" : ""}>Step Forward →</button>
            <button type="button" class="ml-btn-mini" id="py-reset">↺ Reset</button>
          </div>
        `;
        stage.querySelectorAll("[data-py-sc]").forEach((b) => b.addEventListener("click", () => { scriptKey = b.dataset.pySc; stepIdx = 0; render(); }));
        stage.querySelector("#py-prev").addEventListener("click", () => { if (stepIdx > 0) { stepIdx--; render(); } });
        stage.querySelector("#py-next").addEventListener("click", () => { if (stepIdx < sc.steps.length - 1) { stepIdx++; render(); } });
        stage.querySelector("#py-reset").addEventListener("click", () => { stepIdx = 0; render(); });
      } else if (tab === "binary") {
        const weights = [128, 64, 32, 16, 8, 4, 2, 1];
        const dec = bits.reduce((acc, b, i) => acc + b * weights[i], 0);
        const hex = "0x" + dec.toString(16).toUpperCase().padStart(2, "0");
        const ascii = dec >= 33 && dec <= 126 ? `'${String.fromCharCode(dec)}'` : "(control/non-printable)";
        stage.innerHTML = `
          <div class="ml-equation-hero">
            Binary: <span class="ml-highlight-blue">${bits.join("")}₂</span>
            <span class="ml-arrow">=</span>
            Decimal: <strong>${dec}</strong>
            <span class="ml-arrow">=</span>
            Hex: <span class="ml-highlight-green">${hex}</span>
          </div>
          <div class="ml-bits-grid">
            ${bits.map((b, i) => `
              <button type="button" class="ml-bit-btn ${b ? "on" : ""}" data-bit-i="${i}">
                <span class="ml-bit-wt">${weights[i]}</span>
                <strong>${b}</strong>
              </button>
            `).join("")}
          </div>
          <div class="ml-viz-note" style="margin-top:10px;">Tap any bit switch above! ASCII char: <strong>${esc(ascii)}</strong> · Click presets:
            <button type="button" class="ml-btn-mini" data-bit-val="65">65 ('A')</button>
            <button type="button" class="ml-btn-mini" data-bit-val="42">42</button>
            <button type="button" class="ml-btn-mini" data-bit-val="255">255 (0xFF)</button>
            <button type="button" class="ml-btn-mini" data-bit-val="0">Clear (0)</button>
          </div>
        `;
        stage.querySelectorAll("[data-bit-i]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const i = parseInt(btn.dataset.bitI, 10);
            bits[i] = bits[i] ? 0 : 1;
            render();
          });
        });
        stage.querySelectorAll("[data-bit-val]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const v = parseInt(btn.dataset.bitVal, 10);
            bits = v.toString(2).padStart(8, "0").split("").map((ch) => parseInt(ch, 10));
            render();
          });
        });
      } else {
        const logN = Math.max(1, Math.ceil(Math.log2(bigN)));
        const nLogN = bigN * logN;
        const nSq = bigN * bigN;
        const rows = [
          { name: "O(1) — Hash Map / Dict Lookup", steps: 1, pct: 2, color: "var(--ml-viz-green)" },
          { name: "O(log n) — Binary Search (Sorted!)", steps: logN, pct: Math.min(18, 4 + logN * 0.6), color: "var(--ml-viz-blue)" },
          { name: "O(n) — Single Loop / Linear Scan", steps: bigN, pct: 46, color: "var(--ml-viz-amber)" },
          { name: "O(n log n) — MergeSort / TimSort", steps: nLogN, pct: 70, color: "var(--ml-viz-plum)" },
          { name: "O(n²) — Nested Double Loop", steps: nSq, pct: 100, color: "var(--ml-viz-rose)" }
        ];
        stage.innerHTML = `
          <label class="ml-slider-label" style="margin-bottom:12px;">
            <span>Dataset Size n = <strong>${bigN.toLocaleString()}</strong> items</span>
            <input type="range" id="bo-n" min="10" max="100000" step="100" value="${bigN}" />
          </label>
          <div class="ml-prob-bars">
            ${rows.map((r) => `
              <div class="ml-prob-row" style="grid-template-columns:210px 1fr 110px;">
                <span style="font-size:12.5px; font-weight:700;">${r.name}</span>
                <div class="ml-prob-track"><div class="ml-prob-fill" style="width:${r.pct}%; background:${r.color};"></div></div>
                <strong style="text-align:right; font-family:var(--ml-font-mono); font-size:12px;">${r.steps.toLocaleString()} ops</strong>
              </div>
            `).join("")}
          </div>
          <div class="ml-viz-note">Slide <strong>n</strong> to 100,000: Binary Search takes only <strong>17 steps</strong> while an O(n²) nested loop explodes to <strong>10,000,000,000</strong> operations!</div>
        `;
        stage.querySelector("#bo-n").addEventListener("input", (e) => { bigN = parseInt(e.target.value, 10); render(); });
      }
    }

    header.querySelectorAll("[data-py-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-py-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.pyTab;
        render();
      });
    });
    render();
  }

  // ==================== 17. ABSTRACT SHAPES, 3x3 MATRICES & CUBE NETS LAB ====================
  function renderAbstractShapesLab(container) {
    let tab = "rotate"; // rotate | matrix | cube
    let deg = 0;
    let flippedH = false;
    let flippedV = false;
    let matrixRule = "xor"; // xor | sudoku
    let matrixRevealed = false;
    let selectedFace = 0;

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🔷 Abstract Shapes: Rotations, 3×3 Matrices & 3D Cube Nets</div>
        <div class="ml-viz-sub">Test rotation vs mirror chirality, crack 3×3 XOR/Sudoku matrices, and click 3D cube faces to see opposites!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-ab-tab="rotate">🔄 Rotate & Flip</button>
        <button type="button" class="ml-pill" data-ab-tab="matrix">⊞ 3×3 Matrix</button>
        <button type="button" class="ml-pill" data-ab-tab="cube">🎲 3D Cube Net</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function render() {
      if (tab === "rotate") {
        const isChiralMirrored = flippedH !== flippedV;
        const sx = flippedH ? -1 : 1;
        const sy = flippedV ? -1 : 1;
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:12px;">
            <button type="button" class="ml-btn-secondary" id="ab-cw">↻ +90° CW</button>
            <button type="button" class="ml-btn-secondary" id="ab-ccw">↺ −90° CCW</button>
            <button type="button" class="ml-btn-secondary" id="ab-180">🔄 180°</button>
            <button type="button" class="ml-btn-secondary" id="ab-fh">↔ Flip H</button>
            <button type="button" class="ml-btn-secondary" id="ab-fv">↕ Flip V</button>
            <button type="button" class="ml-btn-mini" id="ab-rst">Reset</button>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; align-items:center;">
            <svg viewBox="0 0 180 150" class="ml-svg-box" style="max-height:155px;">
              <rect x="20" y="10" width="140" height="130" rx="14" fill="var(--ml-bg)" stroke="var(--ml-border-strong)" stroke-width="2" />
              <g transform="translate(90,75) scale(${sx},${sy}) rotate(${deg})">
                <path d="M-24,-34 L22,-34 L22,-14 L-4,-14 L-4,34 L-24,34 Z" fill="var(--ml-viz-blue, #2c5282)" />
                <circle cx="20" cy="22" r="9" fill="var(--ml-viz-amber, #a96718)" />
                <polygon points="-24,-34 -2,-34 -24,-12" fill="var(--ml-viz-green, #2d6a4f)" />
              </g>
            </svg>
            <div style="display:grid; gap:8px;">
              <div class="ml-readout-pill" style="border-color:var(--ml-viz-blue);"><span>Net Rotation</span><strong>${((deg % 360) + 360) % 360}° CW</strong></div>
              <div class="ml-readout-pill" style="border-color:${isChiralMirrored ? "var(--ml-viz-rose)" : "var(--ml-viz-green)"};">
                <span>Chirality Status</span>
                <strong>${isChiralMirrored ? "⚠️ MIRRORED (Impossible by rotation!)" : "✅ Same Handedness (Valid Rotation)"}</strong>
              </div>
              <div class="ml-viz-note">Notice: clicking BOTH <strong>Flip H</strong> AND <strong>Flip V</strong> restores normal handedness — it's identical to a 180° turn!</div>
            </div>
          </div>
        `;
        stage.querySelector("#ab-cw").addEventListener("click", () => { deg += 90; render(); });
        stage.querySelector("#ab-ccw").addEventListener("click", () => { deg -= 90; render(); });
        stage.querySelector("#ab-180").addEventListener("click", () => { deg += 180; render(); });
        stage.querySelector("#ab-fh").addEventListener("click", () => { flippedH = !flippedH; render(); });
        stage.querySelector("#ab-fv").addEventListener("click", () => { flippedV = !flippedV; render(); });
        stage.querySelector("#ab-rst").addEventListener("click", () => { deg = 0; flippedH = false; flippedV = false; render(); });
      } else if (tab === "matrix") {
        // 3x3 SVG Matrix: XOR bitmask [H=1, V=2, D1=4, D2=8] or Sudoku shapes
        const xorCells = [1, 2, 3, 4, 1, 5, 3, 1, 2]; // Row1: H^V=Cross, Row2: Diag^H=Both, Row3: Cross^H=V!
        function drawBits(mask) {
          let s = "";
          if (mask & 1) s += `<line x1="10" y1="28" x2="46" y2="28" stroke="var(--ml-viz-blue)" stroke-width="3.5" stroke-linecap="round"/>`;
          if (mask & 2) s += `<line x1="28" y1="10" x2="28" y2="46" stroke="var(--ml-viz-blue)" stroke-width="3.5" stroke-linecap="round"/>`;
          if (mask & 4) s += `<line x1="12" y1="12" x2="44" y2="44" stroke="var(--ml-viz-amber)" stroke-width="3.5" stroke-linecap="round"/>`;
          return `<svg viewBox="0 0 56 56" width="56" height="56">${s}</svg>`;
        }
        const sudokuCells = [
          { sh: "circle", fill: true }, { sh: "square", fill: false }, { sh: "tri", fill: "stripe" },
          { sh: "square", fill: "stripe" }, { sh: "tri", fill: true }, { sh: "circle", fill: false },
          { sh: "tri", fill: false }, { sh: "circle", fill: "stripe" }, { sh: "square", fill: true }
        ];
        function drawSud(c) {
          const fl = c.fill === true ? "var(--ml-viz-green)" : c.fill === "stripe" ? "var(--ml-amber-soft)" : "none";
          const st = c.fill === "stripe" ? "var(--ml-viz-amber)" : "var(--ml-viz-green)";
          let g = "";
          if (c.sh === "circle") g = `<circle cx="28" cy="28" r="16" fill="${fl}" stroke="${st}" stroke-width="3"/>`;
          else if (c.sh === "square") g = `<rect x="13" y="13" width="30" height="30" rx="3" fill="${fl}" stroke="${st}" stroke-width="3"/>`;
          else g = `<polygon points="28,11 45,43 11,43" fill="${fl}" stroke="${st}" stroke-width="3"/>`;
          return `<svg viewBox="0 0 56 56" width="56" height="56">${g}</svg>`;
        }
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:12px;">
            <button type="button" class="ml-pill ${matrixRule === "xor" ? "active" : ""}" data-mr="xor">⚡ XOR Cancel Rule</button>
            <button type="button" class="ml-pill ${matrixRule === "sudoku" ? "active" : ""}" data-mr="sudoku">🧩 Distribution-of-3 (Sudoku)</button>
            <button type="button" class="ml-btn-primary" id="ab-mat-rev">${matrixRevealed ? "🙈 Hide Answer" : "👀 Reveal Missing (?)"}</button>
          </div>
          <div class="ml-raven-grid">
            ${Array.from({ length: 9 }, (_, i) => {
              const isQ = i === 8 && !matrixRevealed;
              const inner = isQ
                ? `<span style="font-size:26px; font-weight:900; color:var(--ml-viz-amber);">?</span>`
                : (matrixRule === "xor" ? drawBits(xorCells[i]) : drawSud(sudokuCells[i]));
              return `<div class="ml-raven-cell ${i === 8 ? "target" : ""}">${inner}</div>`;
            }).join("")}
          </div>
          <div class="ml-viz-note" style="margin-top:10px;">
            ${matrixRule === "xor"
              ? "<strong>XOR Rule:</strong> Overlay Col 1 + Col 2 → shared lines CANCEL OUT! In Row 3, Cross (+) ⊕ Horizontal (−) cancels the horizontal bar, leaving <strong>Vertical (|)</strong>!"
              : "<strong>Distribution-of-3:</strong> Every row & column has 1 Circle, 1 Square, 1 Triangle AND 1 Solid, 1 Tinted, 1 Hollow → Row 3 is missing <strong>Solid Square</strong>!"}
          </div>
        `;
        stage.querySelectorAll("[data-mr]").forEach((b) => b.addEventListener("click", () => { matrixRule = b.dataset.mr; matrixRevealed = false; render(); }));
        stage.querySelector("#ab-mat-rev").addEventListener("click", () => { matrixRevealed = !matrixRevealed; render(); });
      } else {
        // Cross Net interactive opposite-face explorer
        const faces = [
          { id: 0, label: "A", r: 0, c: 1, opp: 4 },
          { id: 1, label: "B", r: 1, c: 0, opp: 3 },
          { id: 2, label: "C", r: 1, c: 1, opp: 5 },
          { id: 3, label: "D", r: 1, c: 2, opp: 1 },
          { id: 4, label: "E", r: 2, c: 1, opp: 0 },
          { id: 5, label: "F", r: 3, c: 1, opp: 2 }
        ];
        const sel = faces[selectedFace];
        const oppFace = faces[sel.opp];
        stage.innerHTML = `
          <div class="ml-viz-note" style="margin-bottom:10px;">Tap any square on this unfolded 3D cube net to see its <strong>Opposite Face</strong> (Amber — NEVER touches!) vs its <strong>4 Adjacent Faces</strong> (Emerald):</div>
          <div class="ml-cube-net-grid">
            ${Array.from({ length: 12 }, (_, idx) => {
              const r = Math.floor(idx / 3), c = idx % 3;
              const f = faces.find((x) => x.r === r && x.c === c);
              if (!f) return `<div></div>`;
              const cls = f.id === sel.id ? "selected" : f.id === sel.opp ? "opposite" : "adjacent";
              return `<button type="button" class="ml-cube-face ${cls}" data-cf="${f.id}"><strong>${f.label}</strong><span>${cls === "selected" ? "Picked" : cls === "opposite" ? "OPPOSITE" : "Touches"}</span></button>`;
            }).join("")}
          </div>
          <div class="ml-easy-box" style="margin-top:12px;">
            <strong>Skip-One Rule:</strong> Face <strong>${sel.label}</strong> folds directly OPPOSITE Face <strong>${oppFace.label}</strong> — so any 3D cube drawing showing ${sel.label} and ${oppFace.label} touching is 100% IMPOSSIBLE!
          </div>
        `;
        stage.querySelectorAll("[data-cf]").forEach((btn) => {
          btn.addEventListener("click", () => { selectedFace = parseInt(btn.dataset.cf, 10); render(); });
        });
      }
    }

    header.querySelectorAll("[data-ab-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-ab-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.abTab;
        render();
      });
    });
    render();
  }

  // ==================== 18. PHYSICS LAWS PLAYGROUND (GRAVITY, PENDULUM & SNELL OPTICS) ====================
  function renderPhysicsLawsPlayground(container) {
    let tab = "gravity"; // gravity | pendulum | optics
    let rAU = 1.0, starMass = 1.0;
    let pendL = 1.0, pendM = 2.0, gravG = 9.8, planetName = "Earth";
    let theta1 = 35, n1 = 1.0, n2 = 1.5;

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🌌 Universal Physics Laws Playground</div>
        <div class="ml-viz-sub">Explore Newton/Kepler orbits, Pendulum mass invariance (T = 2π√(L/g)), and Snell's Law optics + TIR!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-pl-tab="gravity">🪐 Gravity & Kepler</button>
        <button type="button" class="ml-pill" data-pl-tab="pendulum">⏱️ Pendulum SHM</button>
        <button type="button" class="ml-pill" data-pl-tab="optics">🔦 Snell Optics & TIR</button>
      </div>
    `);
    const controls = el("div", { className: "ml-viz-controls" });
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function renderControls() {
      if (tab === "gravity") {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>Orbital Distance r = <strong id="pl-r-v">${rAU.toFixed(1)} AU</strong></span>
            <input type="range" id="pl-r" min="0.5" max="4.0" step="0.5" value="${rAU}" />
          </label>
          <label class="ml-slider-label">
            <span>Star Mass M = <strong id="pl-m-v">${starMass.toFixed(1)} M☉</strong></span>
            <input type="range" id="pl-m" min="0.5" max="4.0" step="0.5" value="${starMass}" />
          </label>
        `;
        controls.querySelector("#pl-r").addEventListener("input", (e) => { rAU = parseFloat(e.target.value); update(); });
        controls.querySelector("#pl-m").addEventListener("input", (e) => { starMass = parseFloat(e.target.value); update(); });
      } else if (tab === "pendulum") {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>String Length L = <strong id="pl-l-v">${pendL.toFixed(1)} m</strong></span>
            <input type="range" id="pl-l" min="0.5" max="4.0" step="0.5" value="${pendL}" />
          </label>
          <label class="ml-slider-label">
            <span>Bob Mass m = <strong id="pl-pm-v">${pendM} kg</strong> (Watch T!)</span>
            <input type="range" id="pl-pm" min="1" max="20" step="1" value="${pendM}" />
          </label>
          <div class="ml-slider-label">
            <span>Gravity (${planetName}: g = ${gravG} m/s²)</span>
            <div class="ml-viz-tabs">
              <button type="button" class="ml-pill ${planetName === "Earth" ? "active" : ""}" data-pl-g="9.8" data-pl-n="Earth">Earth</button>
              <button type="button" class="ml-pill ${planetName === "Moon" ? "active" : ""}" data-pl-g="1.6" data-pl-n="Moon">Moon</button>
              <button type="button" class="ml-pill ${planetName === "Jupiter" ? "active" : ""}" data-pl-g="24.8" data-pl-n="Jupiter">Jupiter</button>
            </div>
          </div>
        `;
        controls.querySelector("#pl-l").addEventListener("input", (e) => { pendL = parseFloat(e.target.value); update(); });
        controls.querySelector("#pl-pm").addEventListener("input", (e) => { pendM = parseInt(e.target.value, 10); update(); });
        controls.querySelectorAll("[data-pl-g]").forEach((b) => {
          b.addEventListener("click", () => {
            gravG = parseFloat(b.dataset.plG);
            planetName = b.dataset.plN;
            renderControls();
          });
        });
      } else {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>Incidence Angle θ₁ = <strong id="pl-th-v">${theta1}°</strong></span>
            <input type="range" id="pl-th" min="5" max="80" step="1" value="${theta1}" />
          </label>
          <div class="ml-slider-label">
            <span>Optical Interface (n₁ → n₂)</span>
            <div class="ml-viz-tabs">
              <button type="button" class="ml-pill ${n1 === 1.0 && n2 === 1.33 ? "active" : ""}" data-op="1.0,1.33">Air→Water</button>
              <button type="button" class="ml-pill ${n1 === 1.0 && n2 === 1.5 ? "active" : ""}" data-op="1.0,1.5">Air→Glass</button>
              <button type="button" class="ml-pill ${n1 === 1.5 && n2 === 1.0 ? "active" : ""}" data-op="1.5,1.0">Glass→Air (TIR!)</button>
            </div>
          </div>
        `;
        controls.querySelector("#pl-th").addEventListener("input", (e) => { theta1 = parseInt(e.target.value, 10); update(); });
        controls.querySelectorAll("[data-op]").forEach((b) => {
          b.addEventListener("click", () => {
            const [a, c] = b.dataset.op.split(",").map(Number);
            n1 = a; n2 = c;
            renderControls();
          });
        });
      }
      update();
    }

    function update() {
      if (tab === "gravity") {
        const rv = controls.querySelector("#pl-r-v");
        const mv = controls.querySelector("#pl-m-v");
        if (rv) rv.textContent = `${rAU.toFixed(1)} AU`;
        if (mv) mv.textContent = `${starMass.toFixed(1)} M☉`;
        const forceRel = starMass / (rAU * rAU);
        const speedKms = 29.8 * Math.sqrt(starMass / rAU);
        const periodYrs = Math.sqrt(Math.pow(rAU, 3) / starMass);
        const orbitPx = 18 + rAU * 16;
        stage.innerHTML = `
          <svg viewBox="0 0 340 155" class="ml-svg-box" style="max-height:155px;">
            <circle cx="170" cy="78" r="${orbitPx.toFixed(1)}" fill="none" stroke="var(--ml-border-strong)" stroke-width="2" stroke-dasharray="5,4" />
            <circle cx="170" cy="78" r="${(10 + starMass * 2.5).toFixed(1)}" fill="var(--ml-viz-amber, #a96718)" />
            <circle cx="${(170 + orbitPx).toFixed(1)}" cy="78" r="7" fill="var(--ml-viz-blue, #2c5282)" />
            <line x1="${(170 + orbitPx - 8).toFixed(1)}" y1="78" x2="${(170 + orbitPx - 28).toFixed(1)}" y2="78" stroke="var(--ml-viz-rose)" stroke-width="3" />
            <text x="${(170 + orbitPx + 12).toFixed(1)}" y="82" fill="var(--ml-viz-blue)" font-size="11" font-weight="800">v = ${speedKms.toFixed(1)} km/s</text>
          </svg>
          <div class="ml-rules-grid">
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-rose);"><span>Gravity F (vs Earth)</span><strong>${forceRel.toFixed(2)}×</strong></div>
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-blue);"><span>Orbital Speed v</span><strong>${speedKms.toFixed(1)} km/s</strong></div>
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-green);"><span>Kepler Period T</span><strong>${periodYrs.toFixed(2)} yrs</strong></div>
          </div>
          <div class="ml-viz-note">Set <strong>r = 4.0 AU, M = 1.0</strong>: Gravity drops to <strong>1/16 (0.06×)</strong> and Kepler's 3rd Law gives <strong>T = √(4³) = 8.00 yrs</strong>!</div>
        `;
      } else if (tab === "pendulum") {
        const lv = controls.querySelector("#pl-l-v");
        const pmv = controls.querySelector("#pl-pm-v");
        if (lv) lv.textContent = `${pendL.toFixed(1)} m`;
        if (pmv) pmv.textContent = `${pendM} kg`;
        const T = 2 * Math.PI * Math.sqrt(pendL / gravG);
        const freq = 1 / T;
        const lenPx = 36 + pendL * 20;
        const bobR = 7 + Math.min(11, pendM * 0.55);
        stage.innerHTML = `
          <svg viewBox="0 0 320 150" class="ml-svg-box" style="max-height:150px;">
            <line x1="90" y1="14" x2="230" y2="14" stroke="currentColor" stroke-width="3" />
            <line x1="160" y1="14" x2="${(160 + lenPx * 0.42).toFixed(1)}" y2="${(14 + lenPx * 0.9).toFixed(1)}" stroke="var(--ml-ink-muted)" stroke-width="2.5" />
            <circle cx="${(160 + lenPx * 0.42).toFixed(1)}" cy="${(14 + lenPx * 0.9).toFixed(1)}" r="${bobR.toFixed(1)}" fill="var(--ml-viz-green)" />
            <text x="160" y="142" text-anchor="middle" fill="var(--ml-ink-muted)" font-size="11" font-weight="700">L = ${pendL.toFixed(1)} m · m = ${pendM} kg · g = ${gravG} m/s² (${planetName})</text>
          </svg>
          <div class="ml-rules-grid">
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-green);"><span>Period T = 2π√(L/g)</span><strong>${T.toFixed(2)} s</strong></div>
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-blue);"><span>Frequency f = 1/T</span><strong>${freq.toFixed(2)} Hz</strong></div>
          </div>
          <div class="ml-viz-note">Drag the <strong>Bob Mass (m)</strong> slider from 1 kg to 20 kg — watch the ball grow huge while Period <strong>T = ${T.toFixed(2)} s</strong> NEVER moves!</div>
        `;
      } else {
        const tv = controls.querySelector("#pl-th-v");
        if (tv) tv.textContent = `${theta1}°`;
        const rad1 = (theta1 * Math.PI) / 180;
        const sin2 = (n1 * Math.sin(rad1)) / n2;
        const isTIR = sin2 > 1.0;
        const theta2 = isTIR ? null : (Math.asin(sin2) * 180) / Math.PI;
        const critDeg = n1 > n2 ? ((Math.asin(n2 / n1) * 180) / Math.PI).toFixed(1) : null;
        const cx = 170, cy = 78, len = 68;
        const inX = cx - Math.sin(rad1) * len;
        const inY = cy - Math.cos(rad1) * len;
        const refX = cx + Math.sin(rad1) * len;
        const refY = cy - Math.cos(rad1) * len;
        const outX = isTIR ? refX : cx + Math.sin((theta2 * Math.PI) / 180) * len;
        const outY = isTIR ? refY : cy + Math.cos((theta2 * Math.PI) / 180) * len;
        stage.innerHTML = `
          <svg viewBox="0 0 340 156" class="ml-svg-box" style="max-height:160px;">
            <rect x="10" y="78" width="320" height="72" fill="var(--ml-blue-soft)" />
            <line x1="10" y1="78" x2="330" y2="78" stroke="var(--ml-viz-blue)" stroke-width="2" />
            <line x1="${cx}" y1="10" x2="${cx}" y2="148" stroke="var(--ml-border-strong)" stroke-width="1.5" stroke-dasharray="4,4" />
            <line x1="${inX.toFixed(1)}" y1="${inY.toFixed(1)}" x2="${cx}" y2="${cy}" stroke="var(--ml-viz-amber)" stroke-width="3.5" stroke-linecap="round" />
            <line x1="${cx}" y1="${cy}" x2="${refX.toFixed(1)}" y2="${refY.toFixed(1)}" stroke="var(--ml-viz-rose)" stroke-width="${isTIR ? "3.5" : "1.5"}" stroke-dasharray="${isTIR ? "" : "4,3"}" />
            ${!isTIR ? `<line x1="${cx}" y1="${cy}" x2="${outX.toFixed(1)}" y2="${outY.toFixed(1)}" stroke="var(--ml-viz-green)" stroke-width="3.5" stroke-linecap="round" />` : ""}
            <text x="20" y="24" fill="currentColor" font-size="11" font-weight="700">Top n₁ = ${n1}</text>
            <text x="20" y="140" fill="var(--ml-viz-blue)" font-size="11" font-weight="700">Bottom n₂ = ${n2}</text>
          </svg>
          <div class="ml-rules-grid">
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-amber);"><span>Incidence θ₁</span><strong>${theta1}°</strong></div>
            <div class="ml-readout-pill" style="border-color:${isTIR ? "var(--ml-viz-rose)" : "var(--ml-viz-green)"};">
              <span>${isTIR ? "TOTAL INTERNAL REFLECTION!" : "Refracted Angle θ₂"}</span>
              <strong>${isTIR ? `100% Reflected (θ_c = ${critDeg}°)` : `${theta2.toFixed(1)}°`}</strong>
            </div>
          </div>
          <div class="ml-viz-note">Try <strong>Glass→Air</strong> and drag θ₁ past <strong>41.8°</strong> — the laser traps 100% inside the glass (exact physics powering fiber-optic internet)!</div>
        `;
      }
    }

    header.querySelectorAll("[data-pl-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-pl-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.plTab;
        renderControls();
      });
    });
    renderControls();
  }

  // ==================== 19. PHILIPPINE HISTORY TIMELINE & CIVICS 3-BRANCH LAB ====================
  function renderPhHistoryCivicsLab(container) {
    let tab = "timeline"; // timeline | civics
    let eraIdx = 0;
    let civIdx = 0;

    const eras = [
      { span: "900 CE – 1520", title: "Pre-Colonial Archipelago", icon: "⛵", points: ["Laguna Copperplate (900 CE) — oldest written PH document.", "Barangays (from balangay boats) led by Datu; Baybayin script.", "Active maritime trade with China, India & Southeast Asia."] },
      { span: "1521 – 1892", title: "Spanish Contact → Colonization → GOMBURZA", icon: "⛪", points: ["1521: Magellan & Battle of Mactan (Lapu-Lapu) — first contact.", "1565: Miguel López de Legazpi settles Cebu (start of 333-yr Spanish rule!).", "1872: GOMBURZA martyrdom awakens Filipino nationalism."] },
      { span: "1889 – 1899", title: "Propaganda, Katipunan & Malolos Republic", icon: "🔥", points: ["Propaganda (La Solidaridad, Rizal, Del Pilar, Jaena) = peaceful reform.", "1892–1896: Bonifacio & Jacinto (KKK / Kartilya) → Cry of Pugad Lawin.", "June 12, 1898 Kawit Independence → Jan 23, 1899 Malolos (1st Asian Republic!)."] },
      { span: "1898 – 1946", title: "American Era, Commonwealth & WWII", icon: "🏛️", points: ["1898 Treaty of Paris ($20M) → Phil-Am War → 1901 Thomasites.", "1934 Tydings-McDuffie → 1935 Commonwealth (Quezon) → 1937 Women's Suffrage!", "April 9, 1942 Fall of Bataan → July 4, 1946 Third Republic (Roxas)."] },
      { span: "1962 – Present", title: "June 12, Martial Law, EDSA & ASEAN", icon: "🕊️", points: ["1962: Macapagal restores June 12 Independence Day; 1967: PH co-founds ASEAN!", "Sept 21, 1972: Proclamation 1081 (Martial Law) → Aug 1983 Ninoy Aquino.", "Feb 22–25, 1986: Peaceful EDSA People Power → 1987 Constitution!"] }
    ];

    const civScenarios = [
      { title: "Bill Passed → Presidential Veto → Override", active: "exec-leg", desc: "Congress (24 Senators + House) passes a bill after 3 readings. If the President VETOES it, Congress can override via 2/3 vote in BOTH Houses!" },
      { title: "30 Days of Presidential Silence", active: "exec-leg", desc: "Unlike a pocket veto, if the President neither signs nor vetoes a bill within 30 days of receiving it, it AUTOMATICALLY lapses into law!" },
      { title: "Law Violates Bill of Rights", active: "jud-leg", desc: "The Supreme Court (15 Justices) exercises Judicial Review to strike down unconstitutional laws or executive orders!" },
      { title: "Martial Law Declared (1987 Guardrail)", active: "all", desc: "Capped at 60 days max! President must report to Congress within 48 hrs; Congress can revoke it by majority vote, AND the Supreme Court can review its factual basis!" }
    ];

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🇵🇭 Philippine History Timeline & 1987 Civics Simulator</div>
        <div class="ml-viz-sub">Scrub 1,100+ years of Philippine milestones or simulate Checks & Balances across the 3 branches!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-ph-tab="timeline">🗓️ Era Timeline</button>
        <button type="button" class="ml-pill" data-ph-tab="civics">⚖️ 3-Branch Checks</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function render() {
      if (tab === "timeline") {
        const e = eras[eraIdx];
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:12px;">
            ${eras.map((er, i) => `<button type="button" class="ml-pill ${i === eraIdx ? "active" : ""}" data-era-i="${i}">${er.icon} ${er.span}</button>`).join("")}
          </div>
          <div class="ml-micro-card">
            <div class="ml-micro-label">${e.span}</div>
            <h4 style="margin:2px 0 8px; font-size:17px;">${e.icon} ${e.title}</h4>
            <ul style="margin:0; padding-left:18px; display:grid; gap:6px; font-size:14px;">
              ${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}
            </ul>
          </div>
        `;
        stage.querySelectorAll("[data-era-i]").forEach((b) => b.addEventListener("click", () => { eraIdx = parseInt(b.dataset.eraI, 10); render(); }));
      } else {
        const s = civScenarios[civIdx];
        const legCol = s.active !== "none" ? "var(--ml-viz-blue)" : "var(--ml-border-strong)";
        const execCol = s.active === "exec-leg" || s.active === "all" ? "var(--ml-viz-amber)" : "var(--ml-border-strong)";
        const judCol = s.active === "jud-leg" || s.active === "all" ? "var(--ml-viz-green)" : "var(--ml-border-strong)";
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:12px;">
            ${civScenarios.map((cs, i) => `<button type="button" class="ml-pill ${i === civIdx ? "active" : ""}" data-civ-i="${i}">${cs.title}</button>`).join("")}
          </div>
          <svg viewBox="0 0 380 145" class="ml-svg-box" style="max-height:150px;">
            <line x1="190" y1="36" x2="86" y2="112" stroke="${execCol}" stroke-width="3" />
            <line x1="190" y1="36" x2="294" y2="112" stroke="${judCol}" stroke-width="3" />
            <line x1="86" y1="112" x2="294" y2="112" stroke="${s.active === "all" ? "var(--ml-viz-rose)" : "var(--ml-border-strong)"}" stroke-width="2.5" stroke-dasharray="4,3" />
            <rect x="120" y="10" width="140" height="40" rx="10" fill="var(--ml-surface)" stroke="${legCol}" stroke-width="2.5" />
            <text x="190" y="28" text-anchor="middle" fill="currentColor" font-size="11.5" font-weight="800">LEGISLATIVE</text>
            <text x="190" y="42" text-anchor="middle" fill="var(--ml-ink-muted)" font-size="9.5">24 Sen + House (Makes)</text>

            <rect x="16" y="94" width="140" height="40" rx="10" fill="var(--ml-surface)" stroke="${execCol}" stroke-width="2.5" />
            <text x="86" y="112" text-anchor="middle" fill="currentColor" font-size="11.5" font-weight="800">EXECUTIVE</text>
            <text x="86" y="126" text-anchor="middle" fill="var(--ml-ink-muted)" font-size="9.5">President 1×6yr (Enforces)</text>

            <rect x="224" y="94" width="140" height="40" rx="10" fill="var(--ml-surface)" stroke="${judCol}" stroke-width="2.5" />
            <text x="294" y="112" text-anchor="middle" fill="currentColor" font-size="11.5" font-weight="800">JUDICIARY</text>
            <text x="294" y="126" text-anchor="middle" fill="var(--ml-ink-muted)" font-size="9.5">SC 15 Justices (Interprets)</text>
          </svg>
          <div class="ml-easy-box" style="margin-top:10px;"><strong>⚖️ ${esc(s.title)}:</strong> ${esc(s.desc)}</div>
        `;
        stage.querySelectorAll("[data-civ-i]").forEach((b) => b.addEventListener("click", () => { civIdx = parseInt(b.dataset.civI, 10); render(); }));
      }
    }

    header.querySelectorAll("[data-ph-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-ph-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.phTab;
        render();
      });
    });
    render();
  }

  // ==================== 20. FILIPINO WIKA STUDIO (4-WAY DIIN & WASTONG GAMIT) ====================
  function renderFilipinoWikaLab(container) {
    let tab = "diin"; // diin | gamit
    let wordKey = "basa";
    let testWord = "Ako";

    const diinPairs = {
      basa: [
        { type: "Malumay", form: "bá-sa", stress: "Penultima, tuloy-tuloy", meaning: "Read (magbasa)", ex: "Mag-bása ka ng libro." },
        { type: "Maragsa (^)", form: "ba-sâ", stress: "Huling pantig + impit", meaning: "Wet (may tubig)", ex: "Basâ ang payong sa ulan." }
      ],
      baga: [
        { type: "Malumay", form: "bá-ga", stress: "Penultima, tuloy-tuloy", meaning: "Glowing ember (uling)", ex: "Mainit pa ang bága sa ihawan." },
        { type: "Malumi (`)", form: "ba-gà", stress: "Penultima + impit", meaning: "Lung (organ sa paghinga)", ex: "Alagaan ang ating bagà." },
        { type: "Mabilis (´)", form: "ba-gá", stress: "Huling pantig, tuloy-tuloy", meaning: "Really? (pananong)", ex: "Totoo bagá iyon?" }
      ],
      puno: [
        { type: "Malumi (`)", form: "pu-nò", stress: "Penultima + impit sa dulo", meaning: "Tree / trunk / chief", ex: "Mataas ang punò ng mangga." },
        { type: "Maragsa (^)", form: "pu-nô", stress: "Huling pantig + impit", meaning: "Full (umaapaw)", ex: "Punô na ang baso ng tubig." }
      ],
      tubo: [
        { type: "Malumay", form: "tú-bo", stress: "Penultima, tuloy-tuloy", meaning: "Pipe / water tube", ex: "May tagas ang túbo sa kusina." },
        { type: "Malumi (`)", form: "tu-bò", stress: "Penultima + impit sa dulo", meaning: "Profit / growth", ex: "Lumaki ang tubò ng tindahan." },
        { type: "Mabilis (´)", form: "tu-bó", stress: "Huling pantig, tuloy-tuloy", meaning: "Sugarcane", ex: "Matamis ang katas ng tubó." }
      ]
    };

    const dinSamples = [
      { word: "Ako", ans: "rin / raw", rule: "Nagtatapos sa patinig ('o') → RIN / RAW!" },
      { word: "Ikaw", ans: "rin / raw", rule: "Nagtatapos sa malapatinig na 'w' → RIN / RAW!" },
      { word: "Bahay", ans: "rin / raw", rule: "Nagtatapos sa malapatinig na 'y' → RIN / RAW!" },
      { word: "Lakad", ans: "din / daw", rule: "Nagtatapos sa katinig ('d') → DIN / DAW!" },
      { word: "Maaari", ans: "din / daw", rule: "KWF Eksepsyon (-ri/-ra/-raw/-ray) → DIN / DAW para iwas buhol-dila!" }
    ];

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">📜 Filipino Wika Studio: 4-Way Diin & Wastong Gamit</div>
        <div class="ml-viz-sub">Pakinggan ang pagbabago ng kahulugan sa Diin/Impit at subukan ang tuntunin ng Din/Rin & Ng/Nang!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-fl-tab="diin">🗣️ 4-Way Diin</button>
        <button type="button" class="ml-pill" data-fl-tab="gamit">🎯 Din/Rin & Ng/Nang</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function render() {
      if (tab === "diin") {
        const list = diinPairs[wordKey];
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:12px;">
            ${Object.keys(diinPairs).map((k) => `<button type="button" class="ml-pill ${k === wordKey ? "active" : ""}" data-dw="${k}">"${k}"</button>`).join("")}
          </div>
          <div class="ml-rules-grid">
            ${list.map((item) => `
              <div class="ml-micro-card">
                <div class="ml-micro-label">${esc(item.type)}</div>
                <div style="font-size:21px; font-weight:900; color:var(--ml-primary); margin:2px 0;">${esc(item.form)}</div>
                <div style="font-size:12px; color:var(--ml-ink-muted); margin-bottom:6px;">${esc(item.stress)}</div>
                <div style="font-weight:700; font-size:14px;">= ${esc(item.meaning)}</div>
                <div class="ml-viz-sub" style="margin-top:4px;"><em>"${esc(item.ex)}"</em></div>
              </div>
            `).join("")}
          </div>
        `;
        stage.querySelectorAll("[data-dw]").forEach((b) => b.addEventListener("click", () => { wordKey = b.dataset.dw; render(); }));
      } else {
        const cur = dinSamples.find((s) => s.word === testWord) || dinSamples[0];
        stage.innerHTML = `
          <div class="ml-micro-label" style="margin-bottom:6px;">Pumili ng sinusundang salita para makita kung RIN o DIN:</div>
          <div class="ml-viz-tabs" style="margin-bottom:12px;">
            ${dinSamples.map((s) => `<button type="button" class="ml-pill ${s.word === testWord ? "active" : ""}" data-ds="${s.word}">${s.word} ___</button>`).join("")}
          </div>
          <div class="ml-equation-hero">
            "${esc(cur.word)}" + <strong class="ml-highlight-green">${esc(cur.ans)}</strong>
          </div>
          <div class="ml-easy-box" style="margin-top:10px;">
            <strong>Tuntunin:</strong> ${esc(cur.rule)}<br />
            <span class="ml-viz-sub"><strong>Bonus NG vs NANG:</strong> Pangngalan/may-ari → <strong>NG</strong> ("bumili ng tubig"). Paraan/noong/upang/ulit-kilos → <strong>NANG</strong> ("tumakbo nang mabilis")!</span>
          </div>
        `;
        stage.querySelectorAll("[data-ds]").forEach((b) => b.addEventListener("click", () => { testWord = b.dataset.ds; render(); }));
      }
    }

    header.querySelectorAll("[data-fl-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-fl-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.flTab;
        render();
      });
    });
    render();
  }

  // ==================== 21. CONVEX & CONCAVE OPTICS (MIRRORS/LENSES) & CURVE CONCAVITY LAB ====================
  function renderOpticsConcaveConvexLab(container) {
    let tab = "optics"; // optics | math_concavity
    let opticType = "convex_lens"; // convex_lens | concave_lens | concave_mirror | convex_mirror
    let fAbs = 12;
    let dObj = 30;
    let curveX = 1.0;
    let polyKind = "convex"; // convex | concave

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🔍 Convex & Concave Lab: Mirrors, Lenses, Polygons & Inflection Curves</div>
        <div class="ml-viz-sub">Drag object distance d_o across Converging/Diverging optics, or test Convex vs Concave polygons & f''(x) concavity!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-oc-tab="optics">🔍 Mirrors & Lenses</button>
        <button type="button" class="ml-pill" data-oc-tab="math_concavity">〰️ Polygons & f''(x)</button>
      </div>
    `);
    const controls = el("div", { className: "ml-viz-controls" });
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function renderControls() {
      if (tab === "optics") {
        controls.innerHTML = `
          <div class="ml-slider-label" style="grid-column: 1 / -1;">
            <span>Optical Device (Converging vs Diverging)</span>
            <div class="ml-viz-tabs">
              <button type="button" class="ml-pill ${opticType === "convex_lens" ? "active" : ""}" data-ot="convex_lens">Convex Lens (+f)</button>
              <button type="button" class="ml-pill ${opticType === "concave_lens" ? "active" : ""}" data-ot="concave_lens">Concave Lens (−f)</button>
              <button type="button" class="ml-pill ${opticType === "concave_mirror" ? "active" : ""}" data-ot="concave_mirror">Concave Mirror (+f)</button>
              <button type="button" class="ml-pill ${opticType === "convex_mirror" ? "active" : ""}" data-ot="convex_mirror">Convex Mirror (−f)</button>
            </div>
          </div>
          <label class="ml-slider-label">
            <span>Object Distance d_o = <strong id="oc-do-v">${dObj} cm</strong></span>
            <input type="range" id="oc-do" min="4" max="42" step="1" value="${dObj}" />
          </label>
          <label class="ml-slider-label">
            <span>Focal |f| = <strong id="oc-f-v">${fAbs} cm</strong></span>
            <input type="range" id="oc-f" min="6" max="20" step="2" value="${fAbs}" />
          </label>
        `;
        controls.querySelector("#oc-do").addEventListener("input", (e) => { dObj = parseInt(e.target.value, 10); update(); });
        controls.querySelector("#oc-f").addEventListener("input", (e) => { fAbs = parseInt(e.target.value, 10); update(); });
        controls.querySelectorAll("[data-ot]").forEach((b) => b.addEventListener("click", () => { opticType = b.dataset.ot; renderControls(); }));
      } else {
        controls.innerHTML = `
          <div class="ml-slider-label">
            <span>Polygon Shape</span>
            <div class="ml-viz-tabs">
              <button type="button" class="ml-pill ${polyKind === "convex" ? "active" : ""}" data-pk="convex">✅ Convex (All &lt; 180°)</button>
              <button type="button" class="ml-pill ${polyKind === "concave" ? "active" : ""}" data-pk="concave">🕳️ Concave (Dent &gt; 180°)</button>
            </div>
          </div>
          <label class="ml-slider-label">
            <span>Curve Test Point on f(x) = x³ − 3x: x = <strong id="oc-cx-v">${curveX.toFixed(1)}</strong></span>
            <input type="range" id="oc-cx" min="-2.0" max="2.0" step="0.2" value="${curveX}" />
          </label>
        `;
        controls.querySelectorAll("[data-pk]").forEach((b) => b.addEventListener("click", () => { polyKind = b.dataset.pk; renderControls(); }));
        controls.querySelector("#oc-cx").addEventListener("input", (e) => { curveX = parseFloat(e.target.value); update(); });
      }
      update();
    }

    function update() {
      if (tab === "optics") {
        const dov = controls.querySelector("#oc-do-v");
        const fv = controls.querySelector("#oc-f-v");
        if (dov) dov.textContent = `${dObj} cm`;
        if (fv) fv.textContent = `${fAbs} cm`;

        const isMirror = opticType.includes("mirror");
        const isConverging = opticType === "convex_lens" || opticType === "concave_mirror";
        const f = isConverging ? fAbs : -fAbs;
        const denom = (1 / f) - (1 / dObj);
        const atFocus = Math.abs(denom) < 1e-6;
        const di = atFocus ? Infinity : 1 / denom;
        const mag = atFocus ? Infinity : -di / dObj;

        const cx = 210, cy = 86, scale = 3.6;
        const objX = cx - Math.min(180, dObj * scale);
        const objH = 34;
        const fPx = fAbs * scale;

        let opticSvg = "";
        if (opticType === "convex_lens") {
          opticSvg = `<path d="M${cx},22 Q${cx + 15},${cy} ${cx},150 Q${cx - 15},${cy} ${cx},22 Z" fill="var(--ml-blue-soft)" stroke="var(--ml-viz-blue)" stroke-width="2.5" />`;
        } else if (opticType === "concave_lens") {
          opticSvg = `<path d="M${cx - 10},22 L${cx + 10},22 Q${cx + 2},${cy} ${cx + 10},150 L${cx - 10},150 Q${cx - 2},${cy} ${cx - 10},22 Z" fill="var(--ml-blue-soft)" stroke="var(--ml-viz-blue)" stroke-width="2.5" />`;
        } else if (opticType === "concave_mirror") {
          opticSvg = `<path d="M${cx - 10},22 Q${cx + 14},${cy} ${cx - 10},150" fill="none" stroke="var(--ml-viz-blue)" stroke-width="4" stroke-linecap="round" />`;
        } else {
          opticSvg = `<path d="M${cx + 10},22 Q${cx - 14},${cy} ${cx + 10},150" fill="none" stroke="var(--ml-viz-blue)" stroke-width="4" stroke-linecap="round" />`;
        }

        let imgSvg = "";
        let raySvg = "";
        if (!atFocus) {
          // For lenses, real (di > 0) sits on right (+); virtual (di < 0) sits on left (-).
          // For mirrors, real (di > 0) reflects back to left (-); virtual (di < 0) sits behind mirror on right (+).
          const rawImgX = isMirror ? cx - di * scale : cx + di * scale;
          const clampedImgX = Math.max(22, Math.min(398, rawImgX));
          const imgH = Math.max(-56, Math.min(56, mag * objH));
          const isReal = di > 0;
          const imgCol = isReal ? "var(--ml-viz-green)" : "var(--ml-viz-amber)";
          raySvg = `
            <line x1="${objX.toFixed(1)}" y1="${cy - objH}" x2="${cx}" y2="${cy - objH}" stroke="var(--ml-viz-amber)" stroke-width="2" />
            <line x1="${cx}" y1="${cy - objH}" x2="${clampedImgX.toFixed(1)}" y2="${(cy - imgH).toFixed(1)}" stroke="var(--ml-viz-amber)" stroke-width="2" stroke-dasharray="${isReal ? "" : "4,3"}" />
            <line x1="${objX.toFixed(1)}" y1="${cy - objH}" x2="${clampedImgX.toFixed(1)}" y2="${(cy - imgH).toFixed(1)}" stroke="var(--ml-viz-plum)" stroke-width="1.6" stroke-dasharray="${isReal ? "" : "4,3"}" />
          `;
          imgSvg = `
            <line x1="${clampedImgX.toFixed(1)}" y1="${cy}" x2="${clampedImgX.toFixed(1)}" y2="${(cy - imgH).toFixed(1)}" stroke="${imgCol}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${isReal ? "" : "5,3"}" />
            <circle cx="${clampedImgX.toFixed(1)}" cy="${(cy - imgH).toFixed(1)}" r="4" fill="${imgCol}" />
            <text x="${clampedImgX.toFixed(1)}" y="${imgH >= 0 ? (cy - imgH - 8).toFixed(1) : (cy - imgH + 14).toFixed(1)}" text-anchor="middle" fill="${imgCol}" font-size="10.5" font-weight="800">${isReal ? "Real" : "Virtual"}</text>
          `;
        }

        const kindText = atFocus
          ? "Rays emerge PARALLEL (Image at ∞!)"
          : `${di > 0 ? "REAL" : "VIRTUAL"} · ${mag >= 0 ? "UPRIGHT" : "INVERTED"} · ${Math.abs(mag) > 1.03 ? "MAGNIFIED" : Math.abs(mag) < 0.97 ? "REDUCED" : "SAME SIZE"}`;

        stage.innerHTML = `
          <svg viewBox="0 0 420 170" class="ml-svg-box" style="max-height:175px;">
            <line x1="12" y1="${cy}" x2="408" y2="${cy}" stroke="var(--ml-border-strong)" stroke-width="1.5" stroke-dasharray="4,4" />
            ${opticSvg}
            ${raySvg}
            <circle cx="${(cx - fPx).toFixed(1)}" cy="${cy}" r="3.5" fill="var(--ml-viz-rose)" />
            <rect x="${(cx - fPx - 10).toFixed(1)}" y="${cy + 7}" width="20" height="15" rx="4" fill="#070709" fill-opacity="0.88" />
            <text x="${(cx - fPx).toFixed(1)}" y="${cy + 18}" text-anchor="middle" fill="var(--ml-viz-rose)" font-size="10" font-weight="800">F</text>
            <circle cx="${(cx + fPx).toFixed(1)}" cy="${cy}" r="3.5" fill="var(--ml-viz-rose)" />
            <rect x="${(cx + fPx - 10).toFixed(1)}" y="${cy + 7}" width="20" height="15" rx="4" fill="#070709" fill-opacity="0.88" />
            <text x="${(cx + fPx).toFixed(1)}" y="${cy + 18}" text-anchor="middle" fill="var(--ml-viz-rose)" font-size="10" font-weight="800">F'</text>
            <line x1="${objX.toFixed(1)}" y1="${cy}" x2="${objX.toFixed(1)}" y2="${cy - objH}" stroke="var(--ml-viz-blue)" stroke-width="4" stroke-linecap="round" />
            <circle cx="${objX.toFixed(1)}" cy="${cy - objH}" r="4" fill="var(--ml-viz-blue)" />
            <text x="${objX.toFixed(1)}" y="${cy - objH - 8}" text-anchor="middle" fill="var(--ml-viz-blue)" font-size="10.5" font-weight="800">Object</text>
            ${imgSvg}
          </svg>
          <div class="ml-rules-grid">
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-blue);"><span>Focal f (${isConverging ? "Converging" : "Diverging"})</span><strong>${f > 0 ? "+" : ""}${f} cm</strong></div>
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-green);"><span>Image Distance d_i</span><strong>${atFocus ? "∞" : (di > 0 ? "+" : "") + di.toFixed(1) + " cm"}</strong></div>
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-amber);"><span>Magnification m = −d_i/d_o</span><strong>${atFocus ? "∞" : (mag > 0 ? "+" : "") + mag.toFixed(2) + "×"}</strong></div>
          </div>
          <div class="ml-easy-box" style="margin-top:10px;"><strong>Image Type:</strong> ${kindText} — ${isConverging ? "Slide d_o closer than |f| to see it flip from Real Inverted to Magnified Virtual Upright!" : "Notice Diverging optics ALWAYS stay Virtual, Upright & Reduced at EVERY distance!"}</div>
        `;
      } else {
        const cxv = controls.querySelector("#oc-cx-v");
        if (cxv) cxv.textContent = curveX.toFixed(1);
        const fpp = 6 * curveX;
        const curveState = Math.abs(fpp) < 0.05 ? "INFLECTION POINT (f'' = 0!)" : fpp > 0 ? "CONCAVE UP / CONVEX (∪ holds water)" : "CONCAVE DOWN (∩ spills water)";
        const polyPts = polyKind === "convex" ? "80,22 142,48 128,118 52,118 38,48" : "80,22 142,48 92,76 128,122 44,116 38,48";
        // Plot f(x) = x^3 - 3x over [-2, 2]
        const pathPts = [];
        for (let t = -2; t <= 2.01; t += 0.1) {
          const px = 280 + t * 48;
          const py = 78 - (t * t * t - 3 * t) * 18;
          pathPts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
        }
        const dotX = 280 + curveX * 48;
        const dotY = 78 - (curveX * curveX * curveX - 3 * curveX) * 18;
        stage.innerHTML = `
          <svg viewBox="0 0 400 150" class="ml-svg-box" style="max-height:160px;">
            <polygon points="${polyPts}" fill="${polyKind === "convex" ? "var(--ml-primary-soft)" : "var(--ml-amber-soft)"}" stroke="${polyKind === "convex" ? "var(--ml-viz-green)" : "var(--ml-viz-amber)"}" stroke-width="3" />
            ${polyKind === "concave" ? `<line x1="142" y1="48" x2="128" y2="122" stroke="var(--ml-viz-rose)" stroke-width="2" stroke-dasharray="4,3" /><text x="90" y="142" text-anchor="middle" fill="var(--ml-viz-rose)" font-size="10.5" font-weight="800">Dent &gt; 180° (chord exits!)</text>` : `<text x="90" y="142" text-anchor="middle" fill="var(--ml-viz-green)" font-size="10.5" font-weight="800">Convex (all angles &lt; 180°)</text>`}

            <line x1="185" y1="78" x2="380" y2="78" stroke="var(--ml-border-strong)" stroke-width="1.5" />
            <line x1="280" y1="12" x2="280" y2="142" stroke="var(--ml-border-strong)" stroke-width="1.5" />
            <polyline points="${pathPts.join(" ")}" fill="none" stroke="var(--ml-viz-blue)" stroke-width="3" />
            <circle cx="280" cy="78" r="4" fill="var(--ml-viz-amber)" />
            <circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="6" fill="${fpp >= 0 ? "var(--ml-viz-green)" : "var(--ml-viz-rose)"}" />
            <text x="280" y="142" text-anchor="middle" fill="var(--ml-ink-muted)" font-size="10" font-weight="700">f(x) = x³ − 3x · Inflection at (0,0)</text>
          </svg>
          <div class="ml-readout-pill" style="border-color:${fpp >= 0 ? "var(--ml-viz-green)" : "var(--ml-viz-rose)"};">
            <span>At x = ${curveX.toFixed(1)} → f''(x) = 6x = ${fpp.toFixed(1)}</span>
            <strong>${curveState}</strong>
          </div>
        `;
      }
    }

    header.querySelectorAll("[data-oc-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-oc-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.ocTab;
        renderControls();
      });
    });
    renderControls();
  }

  // ==================== 22. GRAMMAR SENTENCE SURGEON & LOGIC FALLACY LAB ====================
  function renderGrammarWritingLab(container) {
    let tab = "surgeon"; // surgeon | fallacy
    let sentIdx = 0;
    let struck = {};
    let fallIdx = 0;

    const sentences = [
      {
        title: "Prepositional Distractor Trap",
        chunks: [
          { text: "The box", role: "subj" },
          { text: "of rusty antique keys", role: "prep" },
          { text: "behind the tall wooden cabinets", role: "prep" },
          { text: "WAS / WERE", role: "verb", right: "WAS", wrong: "WERE" },
          { text: "finally found.", role: "rest" }
        ],
        why: "Strike out both prepositional phrases (`of...`, `behind...`) → bare core is **The box WAS** (singular!)."
      },
      {
        title: "'Along With' / 'As Well As' Trap",
        chunks: [
          { text: "The captain", role: "subj" },
          { text: ", along with all twelve players,", role: "prep" },
          { text: "IS / ARE", role: "verb", right: "IS", wrong: "ARE" },
          { text: "boarding the bus.", role: "rest" }
        ],
        why: "Parenthetical phrases like `along with...` NEVER make a singular subject plural → **The captain IS**!"
      },
      {
        title: "'Neither... Nor' Proximity Rule",
        chunks: [
          { text: "Neither the coach nor the players", role: "subj" },
          { text: "on the championship roster", role: "prep" },
          { text: "WANT / WANTS", role: "verb", right: "WANT", wrong: "WANTS" },
          { text: "to cancel practice.", role: "rest" }
        ],
        why: "With `Neither...nor`, match the noun **closest** to the verb (`players` = plural) → **players WANT**!"
      }
    ];

    const fallacies = [
      { name: "Straw Man", quote: "\"You think we should fix bike lanes? So you want to BAN all cars and destroy the economy!\"", why: "Distorts the opponent's actual modest claim into an extreme cartoon that's easy to knock down.", fix: "Ask: 'Did they actually say that, or did someone exaggerate their claim?'" },
      { name: "Post Hoc (False Cause)", quote: "\"I wore my lucky green socks and we won the finals — therefore my socks caused the win!\"", why: "Confuses B happening *after* A with A *causing* B (chronology ≠ causation).", fix: "Check for confounding variables or random coincidence." },
      { name: "False Dilemma", quote: "\"Either you support my exact budget proposal right now, or you hate education!\"", why: "Forces a complex spectrum of 10 options into only 2 extreme choices.", fix: "Look for Option C, D, or a middle-ground compromise." },
      { name: "Ad Hominem", quote: "\"Don't listen to her math proof — she wears weird shoes and failed art class!\"", why: "Attacks the *person* instead of evaluating their *argument or evidence*.", fix: "Separate who spoke from whether the premises actually support the conclusion." }
    ];

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">✍️ Sentence Surgeon, Grammar & Argument Fallacy Lab</div>
        <div class="ml-viz-sub">Click distractor phrases to slice them out and expose Subject–Verb agreement, or dissect everyday logical fallacies!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-gr-tab="surgeon">✂️ Sentence Surgeon</button>
        <button type="button" class="ml-pill" data-gr-tab="fallacy">🦉 Fallacy Dissector</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function render() {
      if (tab === "surgeon") {
        const s = sentences[sentIdx];
        const prepIndices = s.chunks.map((c, idx) => c.role === "prep" ? idx : -1).filter((x) => x >= 0);
        const allStruck = prepIndices.every((idx) => struck[`${sentIdx}_${idx}`]);
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:12px;">
            ${sentences.map((it, idx) => `<button type="button" class="ml-btn-mini ${idx === sentIdx ? "active" : ""}" data-gr-s="${idx}">${idx + 1}. ${it.title}</button>`).join("")}
          </div>
          <div class="ml-micro-label" style="margin-bottom:8px;">Tap the highlighted distractor phrases to cross them out:</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; padding:16px; background:var(--ml-bg); border:1px solid var(--ml-border); border-radius:12px; font-size:16px; line-height:1.8;">
            ${s.chunks.map((c, idx) => {
              const isStruck = !!struck[`${sentIdx}_${idx}`];
              if (c.role === "prep") {
                return `<button type="button" class="ml-pill ${isStruck ? "" : "active"}" data-gr-cut="${idx}" style="font-size:15px; ${isStruck ? "text-decoration:line-through; opacity:0.45;" : ""}">${esc(c.text)} ${isStruck ? "✂️" : ""}</button>`;
              }
              if (c.role === "subj") return `<span style="padding:4px 10px; border-radius:8px; background:var(--ml-primary-soft); color:var(--ml-primary); font-weight:800;">${esc(c.text)}</span>`;
              if (c.role === "verb") return `<span style="padding:4px 10px; border-radius:8px; background:${allStruck ? "var(--ml-primary-fill)" : "var(--ml-amber-soft)"}; color:${allStruck ? "var(--ml-on-primary)" : "var(--ml-amber)"}; font-weight:800;">${allStruck ? c.right + " ✓" : esc(c.text)}</span>`;
              return `<span>${esc(c.text)}</span>`;
            }).join("")}
          </div>
          <div class="ml-easy-box" style="margin-top:12px;">
            ${allStruck ? `<strong>✅ Core Revealed!</strong> ${s.why}` : "Click the prepositional / parenthetical distractor button(s) above to reveal the true Subject → Verb pair!"}
          </div>
        `;
        stage.querySelectorAll("[data-gr-s]").forEach((b) => b.addEventListener("click", () => { sentIdx = parseInt(b.dataset.grS, 10); render(); }));
        stage.querySelectorAll("[data-gr-cut]").forEach((b) => b.addEventListener("click", () => {
          const k = `${sentIdx}_${b.dataset.grCut}`;
          struck[k] = !struck[k];
          render();
        }));
      } else {
        const f = fallacies[fallIdx];
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:12px;">
            ${fallacies.map((it, idx) => `<button type="button" class="ml-btn-mini ${idx === fallIdx ? "active" : ""}" data-gr-f="${idx}">${it.name}</button>`).join("")}
          </div>
          <div class="ml-micro-card">
            <div class="ml-micro-label">Suspect Claim</div>
            <p style="font-size:16px; font-weight:700; margin:6px 0 12px;">${esc(f.quote)}</p>
            <div class="ml-micro-label" style="color:var(--ml-viz-rose);">Why It Breaks Logic — ${esc(f.name)}</div>
            <p style="margin:4px 0 10px;">${esc(f.why)}</p>
            <div class="ml-easy-box"><strong>🛡️ Instant Defense:</strong> ${esc(f.fix)}</div>
          </div>
        `;
        stage.querySelectorAll("[data-gr-f]").forEach((b) => b.addEventListener("click", () => { fallIdx = parseInt(b.dataset.grF, 10); render(); }));
      }
    }

    header.querySelectorAll("[data-gr-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-gr-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.grTab;
        render();
      });
    });
    render();
  }

  // ==================== 23. CAREER, EQ STRESS-ZONE, FITT & COMPOUND MONEY STUDIO ====================
  function renderCareerLifeWellnessLab(container) {
    let tab = "money"; // money | eq | fitt
    let monthly = 30000, investPct = 20, rate = 7, years = 20;
    let arousal = 62;
    let age = 20, rhr = 68;

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">💼 Life, Money (50/30/20 & MP2), EQ Flow & FITT Studio</div>
        <div class="ml-viz-sub">Simulate compounding wealth, map the Yerkes-Dodson stress curve, and calculate real FITT heart-rate zones!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-cl-tab="money">💰 Money & Compound</button>
        <button type="button" class="ml-pill" data-cl-tab="eq">🧠 EQ & Stress Flow</button>
        <button type="button" class="ml-pill" data-cl-tab="fitt">🏃 FITT Heart Zones</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function render() {
      if (tab === "money") {
        const contrib = Math.round(monthly * (investPct / 100));
        const r = rate / 100 / 12;
        const n = years * 12;
        const futureVal = r > 0 ? contrib * ((Math.pow(1 + r, n) - 1) / r) : contrib * n;
        const totalIn = contrib * n;
        const profit = Math.max(0, futureVal - totalIn);
        const dblYrs = rate > 0 ? (72 / rate).toFixed(1) : "∞";
        const pts = [];
        for (let y = 0; y <= years; y++) {
          const m = y * 12;
          const v = r > 0 ? contrib * ((Math.pow(1 + r, m) - 1) / r) : contrib * m;
          const x = 35 + (y / Math.max(1, years)) * 330;
          const py = 128 - (v / Math.max(1, futureVal)) * 102;
          pts.push(`${x.toFixed(1)},${py.toFixed(1)}`);
        }
        stage.innerHTML = `
          <div class="ml-viz-controls" style="margin-bottom:12px;">
            <label class="ml-slider-label"><span>Monthly Income: <strong>₱${monthly.toLocaleString()}</strong></span><input type="range" id="cl-inc" min="15000" max="120000" step="5000" value="${monthly}" /></label>
            <label class="ml-slider-label"><span>Invest % (20% Rule): <strong>${investPct}% (₱${contrib.toLocaleString()}/mo)</strong></span><input type="range" id="cl-pct" min="5" max="50" step="5" value="${investPct}" /></label>
            <label class="ml-slider-label"><span>Annual Return (MP2/ETF): <strong>${rate}% (Doubles ≈ ${dblYrs} yrs)</strong></span><input type="range" id="cl-rate" min="2" max="12" step="1" value="${rate}" /></label>
            <label class="ml-slider-label"><span>Horizon: <strong>${years} years</strong></span><input type="range" id="cl-yrs" min="5" max="35" step="5" value="${years}" /></label>
          </div>
          <svg viewBox="0 0 400 145" class="ml-svg-box" style="max-height:155px;">
            <line x1="35" y1="128" x2="375" y2="128" stroke="var(--ml-border-strong)" stroke-width="1.5" />
            <line x1="35" y1="20" x2="35" y2="128" stroke="var(--ml-border-strong)" stroke-width="1.5" />
            <line x1="35" y1="128" x2="365" y2="${(128 - (totalIn / Math.max(1, futureVal)) * 102).toFixed(1)}" stroke="var(--ml-viz-amber)" stroke-width="2" stroke-dasharray="5,4" />
            <polyline points="${pts.join(" ")}" fill="none" stroke="var(--ml-viz-green)" stroke-width="3.2" />
            <text x="365" y="18" text-anchor="end" fill="var(--ml-viz-green)" font-size="11" font-weight="800">Compounded: ₱${Math.round(futureVal).toLocaleString()}</text>
            <text x="365" y="140" text-anchor="end" fill="var(--ml-ink-muted)" font-size="10">Principal Paid: ₱${totalIn.toLocaleString()} · Compound Growth: +₱${Math.round(profit).toLocaleString()}</text>
          </svg>
          <div class="ml-readout-pill">
            <span>50% Needs: ₱${Math.round(monthly * 0.5).toLocaleString()} · 30% Wants: ₱${Math.round(monthly * 0.3).toLocaleString()}</span>
            <strong>Final Nest Egg: ₱${Math.round(futureVal).toLocaleString()}</strong>
          </div>
        `;
        stage.querySelector("#cl-inc").addEventListener("input", (e) => { monthly = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#cl-pct").addEventListener("input", (e) => { investPct = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#cl-rate").addEventListener("input", (e) => { rate = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#cl-yrs").addEventListener("input", (e) => { years = parseInt(e.target.value, 10); render(); });
      } else if (tab === "eq") {
        const perf = Math.round(100 * Math.exp(-Math.pow((arousal - 55) / 26, 2)));
        const zone = arousal < 35 ? "😴 Under-Challenged (Boredom / Procrastination)" : arousal <= 72 ? "🎯 Eustress / Peak Flow (Optimal Focus!)" : "🔥 Distress / Overload (Cortisol Spike — Pause & Reframe!)";
        const tip = arousal < 35 ? "Add a tiny 10-minute sprint timer or micro-deadline to wake up engagement." : arousal <= 72 ? "Healthy challenge! Protect this deep-focus window with zero phone notifications." : "Name the emotion (Affect Labeling), breathe 4-7-8, and split the task into ONE tiny next step.";
        const pts = [];
        for (let a = 5; a <= 95; a += 3) {
          const p = 100 * Math.exp(-Math.pow((a - 55) / 26, 2));
          pts.push(`${(25 + a * 3.5).toFixed(1)},${(128 - p * 0.98).toFixed(1)}`);
        }
        const cx = 25 + arousal * 3.5;
        const cy = 128 - perf * 0.98;
        stage.innerHTML = `
          <div class="ml-viz-controls" style="margin-bottom:10px;">
            <label class="ml-slider-label"><span>Stress / Arousal Level: <strong>${arousal}%</strong></span><input type="range" id="cl-ar" min="10" max="95" step="1" value="${arousal}" /></label>
          </div>
          <svg viewBox="0 0 400 145" class="ml-svg-box" style="max-height:150px;">
            <line x1="25" y1="128" x2="375" y2="128" stroke="var(--ml-border-strong)" stroke-width="1.5" />
            <polyline points="${pts.join(" ")}" fill="none" stroke="var(--ml-viz-blue)" stroke-width="3" />
            <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="7" fill="${arousal > 72 ? "var(--ml-viz-rose)" : arousal < 35 ? "var(--ml-viz-amber)" : "var(--ml-viz-green)"}" />
            <text x="218" y="20" text-anchor="middle" fill="var(--ml-viz-green)" font-size="10.5" font-weight="800">Peak Flow Zone (Yerkes-Dodson)</text>
          </svg>
          <div class="ml-readout-pill"><span>Performance Index: ${perf}%</span><strong>${zone}</strong></div>
          <div class="ml-easy-box" style="margin-top:8px;"><strong>CBT / EQ Action:</strong> ${tip}</div>
        `;
        stage.querySelector("#cl-ar").addEventListener("input", (e) => { arousal = parseInt(e.target.value, 10); render(); });
      } else {
        const mhr = 220 - age;
        const hrr = mhr - rhr;
        const z = (lo, hi) => `${Math.round(rhr + hrr * lo)}–${Math.round(rhr + hrr * hi)} bpm`;
        stage.innerHTML = `
          <div class="ml-viz-controls" style="margin-bottom:12px;">
            <label class="ml-slider-label"><span>Age: <strong>${age} yrs (Max HR ≈ ${mhr} bpm)</strong></span><input type="range" id="cl-age" min="14" max="70" step="1" value="${age}" /></label>
            <label class="ml-slider-label"><span>Resting Heart Rate: <strong>${rhr} bpm</strong></span><input type="range" id="cl-rhr" min="48" max="95" step="1" value="${rhr}" /></label>
          </div>
          <div class="ml-rules-grid">
            <div class="ml-micro-card"><div class="ml-micro-label">Zone 1 · Recovery (50–60%)</div><strong>${z(0.5, 0.6)}</strong><p class="ml-viz-sub">Brisk walking & warmups.</p></div>
            <div class="ml-micro-card"><div class="ml-micro-label">Zone 2 · Endurance (60–70%)</div><strong>${z(0.6, 0.7)}</strong><p class="ml-viz-sub">Conversational pace; builds aerobic base.</p></div>
            <div class="ml-micro-card"><div class="ml-micro-label">Zone 3 · Aerobic Cardio (70–80%)</div><strong>${z(0.7, 0.8)}</strong><p class="ml-viz-sub">Strengthens heart stroke volume & stamina.</p></div>
            <div class="ml-micro-card"><div class="ml-micro-label">Zone 4 · Peak HIIT (80–90%)</div><strong>${z(0.8, 0.9)}</strong><p class="ml-viz-sub">Short sprints; builds VO₂ max.</p></div>
          </div>
        `;
        stage.querySelector("#cl-age").addEventListener("input", (e) => { age = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#cl-rhr").addEventListener("input", (e) => { rhr = parseInt(e.target.value, 10); render(); });
      }
    }

    header.querySelectorAll("[data-cl-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-cl-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.clTab;
        render();
      });
    });
    render();
  }

  // ==================== 24. EARTH TECTONICS, SEASONS/MOON & SUPPLY-DEMAND LAB ====================
  function renderEarthSpaceEconLab(container) {
    let tab = "seasons"; // seasons | plates | econ
    let monthIdx = 5; // June
    let moonDay = 15; // Full Moon
    let plateType = "convergent";
    let magA = 5, magB = 7;
    let dShift = 0, sShift = 0, priceCap = 0;

    const months = ["Jan", "Feb", "Mar (Vernal Eq)", "Apr", "May", "Jun (N. Summer)", "Jul", "Aug", "Sep (Autumn Eq)", "Oct", "Nov", "Dec (N. Winter)"];

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🌍 Earth Science (Tilt/Moon/Plates) & Supply–Demand Studio</div>
        <div class="ml-viz-sub">See why 23.5° axial tilt causes seasons, test Richter log energy, or shift Supply & Demand curves live!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-es-tab="seasons">🌒 Tilt & Moon</button>
        <button type="button" class="ml-pill" data-es-tab="plates">🌋 Plates & Quakes</button>
        <button type="button" class="ml-pill" data-es-tab="econ">📈 Supply & Demand</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function render() {
      if (tab === "seasons") {
        const ang = ((monthIdx - 5) / 12) * Math.PI * 2;
        const nTilt = Math.cos(ang); // +1 Jun (North toward Sun), -1 Dec (South toward Sun)
        const nSeason = nTilt > 0.45 ? "☀️ Northern Summer / Southern Winter" : nTilt < -0.45 ? "❄️ Northern Winter / Southern Summer" : "🍃 Equinox (Equal 12h Day/Night)";
        const phaseNames = ["🌑 New Moon", "🌒 Waxing Crescent", "🌓 First Quarter", "🌔 Waxing Gibbous", "🌕 Full Moon", "🌖 Waning Gibbous", "🌗 Last Quarter", "🌘 Waning Crescent"];
        const pIdx = Math.round(((moonDay % 29.5) / 29.5) * 8) % 8;
        const illum = Math.round(50 * (1 - Math.cos((moonDay / 29.5) * Math.PI * 2)));
        const ex = 200 + Math.cos(ang) * 95;
        const ey = 76 + Math.sin(ang) * 38;
        stage.innerHTML = `
          <div class="ml-viz-controls" style="margin-bottom:10px;">
            <label class="ml-slider-label"><span>Earth Orbit Month: <strong>${months[monthIdx]}</strong></span><input type="range" id="es-mo" min="0" max="11" step="1" value="${monthIdx}" /></label>
            <label class="ml-slider-label"><span>Lunar Cycle Day: <strong>Day ${moonDay} (${phaseNames[pIdx]} · ${illum}% lit)</strong></span><input type="range" id="es-mn" min="0" max="29" step="1" value="${moonDay}" /></label>
          </div>
          <svg viewBox="0 0 400 150" class="ml-svg-box" style="max-height:155px;">
            <ellipse cx="200" cy="76" rx="95" ry="38" fill="none" stroke="var(--ml-border-strong)" stroke-dasharray="4,4" />
            <circle cx="200" cy="76" r="18" fill="var(--ml-viz-amber)" />
            <text x="200" y="80" text-anchor="middle" fill="#fff" font-size="9" font-weight="800">SUN</text>
            <circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="12" fill="var(--ml-viz-blue)" />
            <line x1="${(ex - 7).toFixed(1)}" y1="${(ey + 16).toFixed(1)}" x2="${(ex + 7).toFixed(1)}" y2="${(ey - 16).toFixed(1)}" stroke="var(--ml-viz-rose)" stroke-width="2.5" />
            <text x="${ex.toFixed(1)}" y="${(ey - 20).toFixed(1)}" text-anchor="middle" fill="var(--ml-ink)" font-size="9.5" font-weight="800">23.5° Tilt</text>
            <text x="200" y="140" text-anchor="middle" fill="var(--ml-ink-muted)" font-size="10.5" font-weight="700">Axis ALWAYS points toward Polaris → Tilt (NOT Sun distance!) drives Seasons!</text>
          </svg>
          <div class="ml-readout-pill"><span>${nSeason}</span><strong>${phaseNames[pIdx]} (${illum}% illuminated)</strong></div>
        `;
        stage.querySelector("#es-mo").addEventListener("input", (e) => { monthIdx = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#es-mn").addEventListener("input", (e) => { moonDay = parseInt(e.target.value, 10); render(); });
      } else if (tab === "plates") {
        const diff = Math.abs(magB - magA);
        const ampRatio = Math.pow(10, diff);
        const energyRatio = Math.round(Math.pow(10, 1.5 * diff));
        const info = {
          convergent: { label: "Convergent (Collide / Subduct)", feat: "Deep Trenches (Philippine Trench), Volcanic Arcs (Mayon, Taal), & Himalayas!", arrows: "→  ←" },
          divergent: { label: "Divergent (Pull Apart)", feat: "Mid-Ocean Ridges (Mid-Atlantic), Rift Valleys, and brand-new oceanic basalt crust!", arrows: "←  →" },
          transform: { label: "Transform (Slide Past)", feat: "Major Shallow Earthquakes with ZERO volcanoes (San Andreas & PH West Valley Fault)!", arrows: "↑  ↓" }
        }[plateType];
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:10px;">
            <button type="button" class="ml-pill ${plateType === "convergent" ? "active" : ""}" data-es-pl="convergent">💥 Convergent</button>
            <button type="button" class="ml-pill ${plateType === "divergent" ? "active" : ""}" data-es-pl="divergent">↔️ Divergent</button>
            <button type="button" class="ml-pill ${plateType === "transform" ? "active" : ""}" data-es-pl="transform">⇅ Transform</button>
          </div>
          <div class="ml-micro-card" style="margin-bottom:12px;">
            <div class="ml-micro-label">${info.label} (${info.arrows})</div>
            <p style="margin:6px 0 0; font-weight:600;">${info.feat}</p>
          </div>
          <div class="ml-viz-controls" style="margin-bottom:10px;">
            <label class="ml-slider-label"><span>Quake A Magnitude: <strong>M ${magA}.0</strong></span><input type="range" id="es-ma" min="3" max="8" step="1" value="${magA}" /></label>
            <label class="ml-slider-label"><span>Quake B Magnitude: <strong>M ${magB}.0</strong></span><input type="range" id="es-mb" min="3" max="9" step="1" value="${magB}" /></label>
          </div>
          <div class="ml-readout-pill">
            <span>ΔM = ${diff} → Wave Amplitude: ${ampRatio.toLocaleString()}×</span>
            <strong>Seismic Energy Released: ~${energyRatio.toLocaleString()}×!</strong>
          </div>
        `;
        stage.querySelectorAll("[data-es-pl]").forEach((b) => b.addEventListener("click", () => { plateType = b.dataset.esPl; render(); }));
        stage.querySelector("#es-ma").addEventListener("input", (e) => { magA = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#es-mb").addEventListener("input", (e) => { magB = parseInt(e.target.value, 10); render(); });
      } else {
        // Demand: P = (100 + dShift) - Q; Supply: P = (20 - sShift) + Q
        const eqQ = Math.round((80 + dShift + sShift) / 2);
        const eqP = Math.round((120 + dShift - sShift) / 2);
        const toX = (q) => 45 + Math.max(0, Math.min(100, q)) * 3.1;
        const toY = (p) => 132 - Math.max(0, Math.min(120, p)) * 0.92;
        const dP0 = 100 + dShift, dP100 = dShift;
        const sP0 = 20 - sShift, sP100 = 120 - sShift;
        let controlMsg = `Equilibrium clears market cleanly at P* = ₱${eqP}, Q* = ${eqQ} units.`;
        if (priceCap > 0) {
          const qD = Math.max(0, (100 + dShift) - priceCap);
          const qS = Math.max(0, priceCap - (20 - sShift));
          if (priceCap < eqP) controlMsg = `⚠️ Binding Price Ceiling (₱${priceCap} < ₱${eqP}) → SHORTAGE of ${Math.round(qD - qS)} units (Qd=${Math.round(qD)} > Qs=${Math.round(qS)})!`;
          else if (priceCap > eqP) controlMsg = `⚠️ Binding Price Floor (₱${priceCap} > ₱${eqP}) → SURPLUS of ${Math.round(qS - qD)} units (Qs=${Math.round(qS)} > Qd=${Math.round(qD)})!`;
        }
        stage.innerHTML = `
          <div class="ml-viz-controls" style="margin-bottom:10px;">
            <label class="ml-slider-label"><span>Demand Shift: <strong>${dShift >= 0 ? "+" : ""}${dShift}</strong></span><input type="range" id="es-ds" min="-24" max="24" step="4" value="${dShift}" /></label>
            <label class="ml-slider-label"><span>Supply Shift: <strong>${sShift >= 0 ? "+" : ""}${sShift}</strong></span><input type="range" id="es-ss" min="-24" max="24" step="4" value="${sShift}" /></label>
            <label class="ml-slider-label"><span>Price Control (0 = Free Market): <strong>${priceCap === 0 ? "Off" : "₱" + priceCap}</strong></span><input type="range" id="es-pc" min="0" max="95" step="5" value="${priceCap}" /></label>
          </div>
          <svg viewBox="0 0 400 150" class="ml-svg-box" style="max-height:155px;">
            <line x1="45" y1="132" x2="365" y2="132" stroke="var(--ml-border-strong)" stroke-width="1.5" />
            <line x1="45" y1="16" x2="45" y2="132" stroke="var(--ml-border-strong)" stroke-width="1.5" />
            <line x1="${toX(5)}" y1="${toY(dP0 - 5)}" x2="${toX(95)}" y2="${toY(dP100 + 5)}" stroke="var(--ml-viz-blue)" stroke-width="3" />
            <line x1="${toX(5)}" y1="${toY(sP0 + 5)}" x2="${toX(95)}" y2="${toY(sP100 - 5)}" stroke="var(--ml-viz-green)" stroke-width="3" />
            ${priceCap > 0 ? `<line x1="45" y1="${toY(priceCap).toFixed(1)}" x2="365" y2="${toY(priceCap).toFixed(1)}" stroke="var(--ml-viz-rose)" stroke-width="2" stroke-dasharray="5,4" />` : ""}
            <circle cx="${toX(eqQ).toFixed(1)}" cy="${toY(eqP).toFixed(1)}" r="6" fill="var(--ml-viz-amber)" />
            <text x="52" y="26" fill="var(--ml-viz-blue)" font-size="10.5" font-weight="800">Demand (D)</text>
            <text x="355" y="26" text-anchor="end" fill="var(--ml-viz-green)" font-size="10.5" font-weight="800">Supply (S)</text>
            <text x="${(toX(eqQ) + 10).toFixed(1)}" y="${(toY(eqP) - 6).toFixed(1)}" fill="var(--ml-ink)" font-size="10.5" font-weight="800">E(Q=${eqQ}, ₱${eqP})</text>
          </svg>
          <div class="ml-readout-pill"><span>Market Price P* = ₱${eqP} · Qty Q* = ${eqQ}</span><strong>${controlMsg}</strong></div>
        `;
        stage.querySelector("#es-ds").addEventListener("input", (e) => { dShift = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#es-ss").addEventListener("input", (e) => { sShift = parseInt(e.target.value, 10); render(); });
        stage.querySelector("#es-pc").addEventListener("input", (e) => { priceCap = parseInt(e.target.value, 10); render(); });
      }
    }

    header.querySelectorAll("[data-es-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-es-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.esTab;
        render();
      });
    });
    render();
  }

  // ==================== 25. DSA VISUALIZER: SORTING, GRAPH PATHFINDING & HASH TABLE ====================
  function renderDsaAlgoVisualizerLab(container) {
    let tab = "sort"; // sort | graph | hash
    let sortAlgo = "quick"; // bubble | insertion | merge | quick
    let arrVals = [38, 14, 72, 25, 91, 46, 19, 63, 84, 31, 55, 11];
    let sortFrames = [];
    let frameIdx = 0;
    let playTimer = null;

    // Graph 6x10 grid state
    const G_ROWS = 6, G_COLS = 10;
    let gAlgo = "bfs"; // bfs | dfs | dijkstra
    let gWalls = new Set(["1,3", "2,3", "3,3", "4,3", "2,6", "3,6", "4,6", "1,6"]);
    let gMud = new Set(["0,3", "5,3", "5,4", "0,6"]);
    let gPaint = "wall"; // wall | mud
    let gStart = "2,1", gGoal = "3,8";
    let gSteps = [], gStepIdx = 0;

    // Binary search & Hash table state
    const sortedArr = [3, 8, 14, 19, 24, 31, 38, 45, 52, 61, 74, 88];
    let bsTarget = 52;
    let hashKeys = ["aria", "kael", "sql", "jwt", "git", "bfs"];
    let hashInput = "redis";
    const BUCKETS = 7;

    function computeSortFrames(source, algo) {
      const a = source.slice();
      const frames = [{ arr: a.slice(), cmp: [], swap: [], sorted: [], comps: 0, swaps: 0, note: `Initial unsorted array (${a.length} items).` }];
      let comps = 0, swaps = 0;
      const snap = (cmp, swap, sorted, note) => {
        if (frames.length < 180) frames.push({ arr: a.slice(), cmp: cmp || [], swap: swap || [], sorted: sorted || [], comps, swaps, note });
      };

      if (algo === "bubble") {
        const done = [];
        for (let i = 0; i < a.length; i++) {
          for (let j = 0; j < a.length - 1 - i; j++) {
            comps++;
            snap([j, j + 1], [], done.slice(), `Compare a[${j}]=${a[j]} vs a[${j + 1}]=${a[j + 1]}`);
            if (a[j] > a[j + 1]) {
              const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
              swaps++;
              snap([], [j, j + 1], done.slice(), `Swap ${a[j + 1]} ↔ ${a[j]} so larger bubbles right`);
            }
          }
          done.push(a.length - 1 - i);
        }
      } else if (algo === "insertion") {
        for (let i = 1; i < a.length; i++) {
          let j = i;
          while (j > 0) {
            comps++;
            snap([j - 1, j], [], Array.from({ length: i }, (_, k) => k), `Insert ${a[j]} into sorted prefix [0..${i - 1}]`);
            if (a[j - 1] > a[j]) {
              const t = a[j]; a[j] = a[j - 1]; a[j - 1] = t;
              swaps++;
              snap([], [j - 1, j], Array.from({ length: i }, (_, k) => k), `Shift ${a[j]} right past ${a[j - 1]}`);
              j--;
            } else break;
          }
        }
      } else if (algo === "merge") {
        function msort(lo, hi) {
          if (lo >= hi) return;
          const mid = Math.floor((lo + hi) / 2);
          msort(lo, mid);
          msort(mid + 1, hi);
          const merged = [];
          let i = lo, j = mid + 1;
          while (i <= mid && j <= hi) {
            comps++;
            snap([i, j], [], [], `Merge [${lo}..${mid}] & [${mid + 1}..${hi}]: compare ${a[i]} vs ${a[j]}`);
            if (a[i] <= a[j]) merged.push(a[i++]);
            else merged.push(a[j++]);
          }
          while (i <= mid) merged.push(a[i++]);
          while (j <= hi) merged.push(a[j++]);
          for (let k = 0; k < merged.length; k++) {
            a[lo + k] = merged[k];
            swaps++;
          }
          snap([], Array.from({ length: hi - lo + 1 }, (_, k) => lo + k), [], `Merged sorted slice [${lo}..${hi}] cleanly!`);
        }
        msort(0, a.length - 1);
      } else {
        function qsort(lo, hi) {
          if (lo >= hi) return;
          const pivot = a[hi];
          let p = lo;
          for (let j = lo; j < hi; j++) {
            comps++;
            snap([j, hi], [], [], `Partition pivot=${pivot}: compare a[${j}]=${a[j]}`);
            if (a[j] <= pivot) {
              if (p !== j) { const t = a[p]; a[p] = a[j]; a[j] = t; swaps++; snap([], [p, j], [], `Move ${a[p]} left of pivot ${pivot}`); }
              p++;
            }
          }
          const t = a[p]; a[p] = a[hi]; a[hi] = t; swaps++;
          snap([], [p, hi], [p], `Pivot ${pivot} locked at final index ${p}!`);
          qsort(lo, p - 1);
          qsort(p + 1, hi);
        }
        qsort(0, a.length - 1);
      }
      frames.push({ arr: a.slice(), cmp: [], swap: [], sorted: a.map((_, i) => i), comps, swaps, note: `✅ Sorted completely in ${comps} comparisons & ${swaps} swaps/writes!` });
      return frames;
    }

    function computeGraphSteps() {
      const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
      const parse = (k) => k.split(",").map(Number);
      const visited = new Set();
      const parent = {};
      const dist = { [gStart]: 0 };
      const frontier = gAlgo === "dijkstra" ? [[0, gStart]] : [gStart];
      if (gAlgo !== "dijkstra") visited.add(gStart);
      const steps = [];
      let found = false;

      while (frontier.length > 0 && steps.length < 160) {
        let cur;
        if (gAlgo === "bfs") cur = frontier.shift();
        else if (gAlgo === "dfs") cur = frontier.pop();
        else {
          frontier.sort((x, y) => x[0] - y[0]);
          const top = frontier.shift();
          cur = top[1];
          if (visited.has(cur)) continue;
          visited.add(cur);
        }
        steps.push({ visited: new Set(visited), current: cur, frontierSize: frontier.length, path: [], cost: dist[cur] || 0 });
        if (cur === gGoal) { found = true; break; }
        const [r, c] = parse(cur);
        for (const [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;
          if (nr < 0 || nr >= G_ROWS || nc < 0 || nc >= G_COLS) continue;
          const nk = `${nr},${nc}`;
          if (gWalls.has(nk)) continue;
          const edgeCost = gAlgo === "dijkstra" && gMud.has(nk) ? 5 : 1;
          if (gAlgo === "dijkstra") {
            const nd = (dist[cur] || 0) + edgeCost;
            if (dist[nk] === undefined || nd < dist[nk]) {
              dist[nk] = nd;
              parent[nk] = cur;
              frontier.push([nd, nk]);
            }
          } else if (!visited.has(nk)) {
            visited.add(nk);
            parent[nk] = cur;
            dist[nk] = (dist[cur] || 0) + 1;
            frontier.push(nk);
          }
        }
      }
      const path = [];
      if (found) {
        let p = gGoal;
        while (p) { path.push(p); p = parent[p]; }
        path.reverse();
      }
      steps.push({ visited: new Set(visited), current: found ? gGoal : null, frontierSize: frontier.length, path, cost: found ? (dist[gGoal] || path.length - 1) : -1 });
      return steps;
    }

    function stopPlay() {
      if (playTimer) { clearInterval(playTimer); playTimer = null; }
    }

    sortFrames = computeSortFrames(arrVals, sortAlgo);
    gSteps = computeGraphSteps();
    gStepIdx = gSteps.length - 1;

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🧩 DSA Interactive Visualizer: Sorting, Pathfinding & Hash Maps</div>
        <div class="ml-viz-sub">Watch O(n²) vs O(n log n) sorting, race BFS vs DFS vs Dijkstra on a live grid, and inspect Binary Search & Hash Collisions!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-dsa-tab="sort">📊 Sorting Arena</button>
        <button type="button" class="ml-pill" data-dsa-tab="graph">🕸️ BFS / DFS / Dijkstra</button>
        <button type="button" class="ml-pill" data-dsa-tab="hash">🔍 Binary Search & Hash</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function hashKey(str) {
      let h = 0;
      for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 997;
      return h % BUCKETS;
    }

    function render() {
      if (tab === "sort") {
        const f = sortFrames[Math.min(frameIdx, sortFrames.length - 1)] || sortFrames[0];
        const algoMeta = {
          bubble: "Bubble Sort · Worst O(n²) · Stable",
          insertion: "Insertion Sort · Best O(n), Worst O(n²) · Stable",
          merge: "Merge Sort · Guaranteed O(n log n) · Stable",
          quick: "Quick Sort · Avg O(n log n) · In-Place"
        };
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:10px;">
            ${Object.entries({ quick: "Quick Sort", merge: "Merge Sort", insertion: "Insertion Sort", bubble: "Bubble Sort" }).map(([k, lbl]) => `
              <button type="button" class="ml-btn-mini ${sortAlgo === k ? "active" : ""}" data-sa="${k}">${lbl}</button>
            `).join("")}
            <button type="button" class="ml-btn-mini" id="dsa-shuf">🎲 Shuffle</button>
            <button type="button" class="ml-btn-mini" id="dsa-rev">⬇ Reversed</button>
          </div>
          <div class="ml-dsa-bars">
            ${f.arr.map((v, idx) => {
              const cls = f.swap.includes(idx) ? "swap" : f.cmp.includes(idx) ? "cmp" : f.sorted.includes(idx) ? "done" : "";
              return `<div class="ml-dsa-bar-col"><div class="ml-dsa-bar ${cls}" style="height:${Math.max(14, v * 1.45)}px;"><span>${v}</span></div><small>${idx}</small></div>`;
            }).join("")}
          </div>
          <div class="ml-readout-pill" style="margin:10px 0;">
            <span>${algoMeta[sortAlgo]}</span>
            <strong>Comps: ${f.comps} · Swaps: ${f.swaps} · Step ${frameIdx + 1}/${sortFrames.length}</strong>
          </div>
          <div class="ml-easy-box" style="margin-bottom:10px; font-size:13px;">${esc(f.note)}</div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <button type="button" class="ml-btn-primary" id="dsa-play" style="padding:7px 14px; font-size:12.5px;">${playTimer ? "⏸ Pause" : "▶ Animate"}</button>
            <button type="button" class="ml-btn-secondary" id="dsa-prev" style="padding:6px 12px; font-size:12.5px;" ${frameIdx === 0 ? "disabled" : ""}>← Step</button>
            <button type="button" class="ml-btn-secondary" id="dsa-next" style="padding:6px 12px; font-size:12.5px;" ${frameIdx >= sortFrames.length - 1 ? "disabled" : ""}>Step →</button>
            <input type="range" id="dsa-scrub" min="0" max="${Math.max(0, sortFrames.length - 1)}" value="${frameIdx}" style="flex:1; min-width:120px;" />
          </div>
        `;
        stage.querySelectorAll("[data-sa]").forEach((b) => b.addEventListener("click", () => {
          stopPlay(); sortAlgo = b.dataset.sa; sortFrames = computeSortFrames(arrVals, sortAlgo); frameIdx = 0; render();
        }));
        stage.querySelector("#dsa-shuf").addEventListener("click", () => {
          stopPlay();
          arrVals = Array.from({ length: 12 }, () => Math.floor(Math.random() * 82) + 12);
          sortFrames = computeSortFrames(arrVals, sortAlgo); frameIdx = 0; render();
        });
        stage.querySelector("#dsa-rev").addEventListener("click", () => {
          stopPlay();
          arrVals = [92, 85, 78, 70, 62, 54, 46, 38, 30, 22, 16, 10];
          sortFrames = computeSortFrames(arrVals, sortAlgo); frameIdx = 0; render();
        });
        stage.querySelector("#dsa-prev").addEventListener("click", () => { stopPlay(); frameIdx = Math.max(0, frameIdx - 1); render(); });
        stage.querySelector("#dsa-next").addEventListener("click", () => { stopPlay(); frameIdx = Math.min(sortFrames.length - 1, frameIdx + 1); render(); });
        stage.querySelector("#dsa-scrub").addEventListener("input", (e) => { stopPlay(); frameIdx = parseInt(e.target.value, 10) || 0; render(); });
        stage.querySelector("#dsa-play").addEventListener("click", () => {
          if (playTimer) { stopPlay(); render(); return; }
          if (frameIdx >= sortFrames.length - 1) frameIdx = 0;
          playTimer = setInterval(() => {
            if (!document.body.contains(stage)) { stopPlay(); return; }
            frameIdx++;
            if (frameIdx >= sortFrames.length - 1) { frameIdx = sortFrames.length - 1; stopPlay(); }
            render();
          }, 140);
          render();
        });
      } else if (tab === "graph") {
        const st = gSteps[Math.min(gStepIdx, gSteps.length - 1)] || gSteps[0];
        const pathSet = new Set(st.path || []);
        const cells = [];
        for (let r = 0; r < G_ROWS; r++) {
          for (let c = 0; c < G_COLS; c++) {
            const k = `${r},${c}`;
            let cls = "ml-gcell";
            let lbl = "";
            if (k === gStart) { cls += " start"; lbl = "S"; }
            else if (k === gGoal) { cls += " goal"; lbl = "G"; }
            else if (gWalls.has(k)) { cls += " wall"; lbl = "▪"; }
            else if (pathSet.has(k)) { cls += " path"; lbl = gMud.has(k) ? "5" : "•"; }
            else if (k === st.current) { cls += " cur"; lbl = "★"; }
            else if (st.visited.has(k)) { cls += " vis"; lbl = gMud.has(k) ? "5" : ""; }
            else if (gMud.has(k)) { cls += " mud"; lbl = "5"; }
            cells.push(`<button type="button" class="${cls}" data-gc="${k}" title="Click to toggle ${gPaint}">${lbl}</button>`);
          }
        }
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:10px;">
            <button type="button" class="ml-btn-mini ${gAlgo === "bfs" ? "active" : ""}" data-ga="bfs">BFS (Queue · Shortest Hops)</button>
            <button type="button" class="ml-btn-mini ${gAlgo === "dfs" ? "active" : ""}" data-ga="dfs">DFS (Stack · Deep Dive)</button>
            <button type="button" class="ml-btn-mini ${gAlgo === "dijkstra" ? "active" : ""}" data-ga="dijkstra">Dijkstra (Min-Heap · Avoids Cost-5 Mud!)</button>
            <button type="button" class="ml-btn-mini ${gPaint === "wall" ? "active" : ""}" id="ga-paint-wall">🧱 Paint Wall</button>
            <button type="button" class="ml-btn-mini ${gPaint === "mud" ? "active" : ""}" id="ga-paint-mud">🪨 Paint Cost-5 Tile</button>
          </div>
          <div class="ml-graph-grid" style="grid-template-columns: repeat(${G_COLS}, 1fr);">${cells.join("")}</div>
          <div class="ml-readout-pill" style="margin:10px 0;">
            <span>Visited: <strong>${st.visited.size}</strong> cells · Frontier: <strong>${st.frontierSize}</strong></span>
            <strong>${st.path.length ? `Path Length: ${st.path.length - 1} steps · Total Cost: ${st.cost}` : (gStepIdx === gSteps.length - 1 ? "No path reachable!" : `Exploring step ${gStepIdx + 1}/${gSteps.length}...`)}</strong>
          </div>
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            <button type="button" class="ml-btn-mini" id="ga-prev">← Back</button>
            <input type="range" id="ga-scrub" min="0" max="${Math.max(0, gSteps.length - 1)}" value="${gStepIdx}" style="flex:1;" />
            <button type="button" class="ml-btn-mini" id="ga-next">Next →</button>
          </div>
        `;
        stage.querySelectorAll("[data-ga]").forEach((b) => b.addEventListener("click", () => {
          gAlgo = b.dataset.ga; gSteps = computeGraphSteps(); gStepIdx = gSteps.length - 1; render();
        }));
        stage.querySelector("#ga-paint-wall").addEventListener("click", () => { gPaint = "wall"; render(); });
        stage.querySelector("#ga-paint-mud").addEventListener("click", () => { gPaint = "mud"; render(); });
        stage.querySelectorAll("[data-gc]").forEach((btn) => btn.addEventListener("click", () => {
          const k = btn.dataset.gc;
          if (k === gStart || k === gGoal) return;
          if (gPaint === "wall") { gMud.delete(k); if (gWalls.has(k)) gWalls.delete(k); else gWalls.add(k); }
          else { gWalls.delete(k); if (gMud.has(k)) gMud.delete(k); else gMud.add(k); }
          gSteps = computeGraphSteps(); gStepIdx = gSteps.length - 1; render();
        }));
        stage.querySelector("#ga-prev").addEventListener("click", () => { gStepIdx = Math.max(0, gStepIdx - 1); render(); });
        stage.querySelector("#ga-next").addEventListener("click", () => { gStepIdx = Math.min(gSteps.length - 1, gStepIdx + 1); render(); });
        stage.querySelector("#ga-scrub").addEventListener("input", (e) => { gStepIdx = parseInt(e.target.value, 10) || 0; render(); });
      } else {
        // Binary Search trace + Hash Table Chaining Visualizer
        const bsTrace = [];
        let lo = 0, hi = sortedArr.length - 1, foundAt = -1;
        while (lo <= hi) {
          const mid = Math.floor((lo + hi) / 2);
          bsTrace.push({ lo, mid, hi, val: sortedArr[mid] });
          if (sortedArr[mid] === bsTarget) { foundAt = mid; break; }
          if (sortedArr[mid] < bsTarget) lo = mid + 1;
          else hi = mid - 1;
        }
        const buckets = Array.from({ length: BUCKETS }, () => []);
        hashKeys.forEach((k) => buckets[hashKey(k)].push(k));
        const collisions = buckets.reduce((acc, b) => acc + Math.max(0, b.length - 1), 0);

        stage.innerHTML = `
          <div class="ml-micro-label">1. Binary Search O(log n) — Tap any target to trace halving steps:</div>
          <div class="ml-bs-row">
            ${sortedArr.map((v, i) => `
              <button type="button" class="ml-bs-cell ${v === bsTarget ? "target" : ""}" data-bs-t="${v}">
                <small>[${i}]</small><strong>${v}</strong>
              </button>
            `).join("")}
          </div>
          <div class="ml-bs-trace">
            ${bsTrace.map((s, idx) => `<span class="ml-bs-step">Step ${idx + 1}: lo=${s.lo}, hi=${s.hi} → <strong>mid=${s.mid} (${s.val})</strong></span>`).join("")}
            <span class="ml-bs-step ok">${foundAt >= 0 ? `✓ Found at [${foundAt}] in ${bsTrace.length} checks!` : `✗ Not found in ${bsTrace.length} checks`}</span>
          </div>
          <div class="ml-micro-label" style="margin-top:14px;">2. Hash Table Chaining (hash(key) % ${BUCKETS}) — Load Factor ${(hashKeys.length / BUCKETS).toFixed(2)} · Collisions: ${collisions}</div>
          <div style="display:flex; gap:8px; margin-bottom:10px; flex-wrap:wrap;">
            <input type="text" id="dsa-hk-in" class="ml-search-input" style="max-width:200px; padding:7px 11px;" value="${esc(hashInput)}" placeholder="Type a key..." />
            <button type="button" class="ml-btn-primary" id="dsa-hk-add" style="padding:7px 14px; font-size:12.5px;">+ Hash & Insert</button>
            <button type="button" class="ml-btn-mini" id="dsa-hk-clear">Clear</button>
          </div>
          <div class="ml-hash-buckets">
            ${buckets.map((list, bi) => `
              <div class="ml-hash-row">
                <span class="ml-hash-idx">Bucket ${bi}</span>
                <div class="ml-hash-chain">
                  ${list.length ? list.map((k) => `<span class="ml-hash-node">${esc(k)}</span>`).join(`<span class="ml-hash-arr">→</span>`) : `<span class="ml-hash-empty">empty</span>`}
                </div>
              </div>
            `).join("")}
          </div>
        `;
        stage.querySelectorAll("[data-bs-t]").forEach((b) => b.addEventListener("click", () => { bsTarget = Number(b.dataset.bsT); render(); }));
        stage.querySelector("#dsa-hk-add").addEventListener("click", () => {
          const v = (stage.querySelector("#dsa-hk-in").value || "").trim().toLowerCase();
          if (v && !hashKeys.includes(v)) hashKeys.push(v);
          hashInput = "";
          render();
        });
        stage.querySelector("#dsa-hk-clear").addEventListener("click", () => { hashKeys = []; render(); });
      }
    }

    header.querySelectorAll("[data-dsa-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        stopPlay();
        header.querySelectorAll("[data-dsa-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.dsaTab;
        render();
      });
    });
    render();
  }

  // ==================== 26. LIVE SQL DATABASE WORKBENCH & B-TREE INDEX LAB ====================
  function renderSqlDatabaseLab(container) {
    let tab = "workbench"; // workbench | btree
    const presets = {
      top: { label: "Top Active Heroes", sql: "SELECT name, role, level, xp\nFROM heroes\nWHERE active = 1\nORDER BY xp DESC\nLIMIT 5;" },
      join: { label: "INNER JOIN Guilds", sql: "SELECT h.name AS hero, h.role, g.name AS guild, g.region\nFROM heroes h\nINNER JOIN guilds g ON h.guild_id = g.id\nORDER BY h.xp DESC;" },
      group: { label: "GROUP BY + HAVING", sql: "SELECT g.name AS guild, COUNT(h.id) AS members, SUM(h.xp) AS total_xp\nFROM guilds g\nINNER JOIN heroes h ON g.id = h.guild_id\nGROUP BY g.name\nHAVING COUNT(h.id) >= 2\nORDER BY total_xp DESC;" },
      anti: { label: "LEFT JOIN Empty Guilds", sql: "SELECT g.name AS empty_guild, g.region\nFROM guilds g\nLEFT JOIN heroes h ON g.id = h.guild_id\nWHERE h.id IS NULL;" },
      boss: { label: "3-Table Quest Champions", sql: "SELECT h.name AS hero, COUNT(s.id) AS clears, SUM(q.xp_reward) AS quest_xp\nFROM heroes h\nINNER JOIN submissions s ON h.id = s.hero_id\nINNER JOIN quests q ON s.quest_id = q.id\nWHERE s.status = 'PASSED'\nGROUP BY h.name\nORDER BY quest_xp DESC;" }
    };
    let sqlText = presets.group.sql;
    let tableRowsLog10 = 6; // 10^6 = 1,000,000 rows

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🗄️ Live SQL Database Engine, Execution Pipeline & B-Tree Index Lab</div>
        <div class="ml-viz-sub">Run real SQL (JOIN, GROUP BY, HAVING, ORDER BY) against live relational tables and visualize B-Tree O(log n) speedups!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-sql-tab="workbench">💻 SQL Workbench</button>
        <button type="button" class="ml-pill" data-sql-tab="btree">⚡ B-Tree Index vs Full Scan</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function render() {
      if (tab === "workbench") {
        const res = root.EVERYLINGO_CODE_ENGINE ? root.EVERYLINGO_CODE_ENGINE.runSql(sqlText) : { ok: false, error: "SQL Engine missing" };
        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:10px;">
            ${Object.entries(presets).map(([k, p]) => `<button type="button" class="ml-btn-mini" data-sqp="${k}">✨ ${p.label}</button>`).join("")}
            <button type="button" class="ml-btn-primary" id="sql-run-btn" style="padding:6px 14px; font-size:12px;">▶ Execute SQL</button>
          </div>
          <div class="ml-forge-schema-grid" style="margin-bottom:10px;">
            <div class="ml-forge-schema-box"><strong>heroes (8)</strong><span>id, name, role, level, xp, guild_id, active</span></div>
            <div class="ml-forge-schema-box"><strong>guilds (4)</strong><span>id, name, region, founded_year</span></div>
            <div class="ml-forge-schema-box"><strong>quests (5)</strong><span>id, title, difficulty, xp_reward, category</span></div>
            <div class="ml-forge-schema-box"><strong>submissions (9)</strong><span>id, hero_id, quest_id, status, score</span></div>
          </div>
          <textarea id="sql-lab-ed" class="ml-code-textarea" rows="5" spellcheck="false" style="margin-bottom:10px;">${esc(sqlText)}</textarea>
          ${res.ok ? `
            <div class="ml-forge-sql-plan" style="margin-bottom:10px;">
              <span class="ml-forge-plan-lbl">Logical Order:</span>
              ${res.executionPlan.map((st, idx) => `${idx > 0 ? `<span class="ml-forge-plan-arrow">→</span>` : ""}<span class="ml-forge-plan-chip"><strong>${esc(st.step)}</strong> <em>(${st.rows})</em></span>`).join("")}
            </div>
            <div class="ml-forge-sql-table-wrap">
              <table class="ml-forge-sql-table">
                <thead><tr>${res.columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
                <tbody>
                  ${res.rows.map((r) => `<tr>${res.columns.map((c) => `<td>${r[c] === null ? `<span class="ml-null-pill">NULL</span>` : esc(r[c])}</td>`).join("")}</tr>`).join("")}
                </tbody>
              </table>
            </div>
          ` : `<div class="ml-forge-console-pre err">⚠ ${esc(res.error)}</div>`}
        `;
        const ed = stage.querySelector("#sql-lab-ed");
        stage.querySelector("#sql-run-btn").addEventListener("click", () => { sqlText = ed.value; render(); });
        stage.querySelectorAll("[data-sqp]").forEach((b) => b.addEventListener("click", () => { sqlText = presets[b.dataset.sqp].sql; render(); }));
      } else {
        const rows = Math.pow(10, tableRowsLog10);
        const btreeOps = Math.ceil(Math.log2(rows));
        const btreePages = Math.max(2, Math.ceil(Math.log(rows) / Math.log(120)));
        const scanMs = (rows / 45000).toFixed(1);
        const idxMs = (btreePages * 0.28).toFixed(2);
        const speedup = Math.round(rows / btreeOps).toLocaleString();
        stage.innerHTML = `
          <div class="ml-slider-label" style="margin-bottom:10px;">
            <span>Table Size: <strong>${rows.toLocaleString()} rows</strong> (10^${tableRowsLog10})</span>
            <span class="ml-mini-tag">${speedup}× fewer comparisons!</span>
          </div>
          <input type="range" id="bt-rows" min="3" max="8" step="1" value="${tableRowsLog10}" style="margin-bottom:14px;" />
          <div class="ml-bt-compare">
            <div class="ml-bt-card bad">
              <div class="ml-micro-label">❌ Full Table Scan — O(n)</div>
              <div class="ml-bt-big">${rows.toLocaleString()} checks</div>
              <div class="ml-viz-sub">~${scanMs} ms · Reads every disk block linearly</div>
              <div class="ml-bt-bar"><div style="width:100%; background:var(--ml-danger-fill);"></div></div>
            </div>
            <div class="ml-bt-card good">
              <div class="ml-micro-label">⚡ B-Tree Index — O(log n)</div>
              <div class="ml-bt-big">${btreeOps} comparisons</div>
              <div class="ml-viz-sub">~${idxMs} ms · Only ${btreePages} B-Tree disk page hops!</div>
              <div class="ml-bt-bar"><div style="width:${Math.max(4, Math.min(25, btreeOps))}%; background:var(--ml-primary-fill);"></div></div>
            </div>
          </div>
          <div class="ml-easy-box" style="margin-top:12px;">
            <strong>PostgreSQL Rule of Thumb:</strong> Add B-Tree indexes on columns used in <code>WHERE</code>, <code>JOIN ON</code>, and <code>ORDER BY</code>. Avoid over-indexing write-heavy log tables since each <code>INSERT</code> updates every index!
          </div>
        `;
        stage.querySelector("#bt-rows").addEventListener("input", (e) => { tableRowsLog10 = parseInt(e.target.value, 10); render(); });
      }
    }

    header.querySelectorAll("[data-sql-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-sql-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.sqlTab;
        render();
      });
    });
    render();
  }

  // ==================== 27. GIT COMMIT DAG, JS EVENT LOOP & REST/JWT/CACHE STUDIO ====================
  function renderBackendSystemTerminalLab(container) {
    let tab = "git"; // git | evloop | api
    // Git DAG state
    let commits = [
      { id: "c1a0", msg: "init: project", branch: "main", lane: 0, parent: null },
      { id: "d4b2", msg: "feat: routes", branch: "main", lane: 0, parent: "c1a0" }
    ];
    let branches = { main: "d4b2" };
    let head = "main";
    let gitSeq = 3;
    let gitLogMsg = "Ready! Branch off main, commit, and merge to watch the Git DAG update live.";

    // Event Loop step state
    const evSteps = [
      { title: "Step 1: Sync `console.log('1: Start')`", stack: ["console.log('1: Start')"], webapi: [], micro: [], macro: [], out: ["1: Start"], note: "Synchronous code executes immediately on the single Call Stack." },
      { title: "Step 2: `setTimeout(cb, 0)` scheduled", stack: ["setTimeout(cb, 0)"], webapi: ["Timer (0ms) → Macro Queue"], micro: [], macro: ["() => log('4: Timeout')"], out: ["1: Start"], note: "Even with 0ms delay, Timer callback enters the **Macrotask Queue** — never cuts in line!" },
      { title: "Step 3: `Promise.resolve().then(...)` scheduled", stack: ["Promise.then(cb)"], webapi: [], micro: ["() => log('3: Promise')"], macro: ["() => log('4: Timeout')"], out: ["1: Start"], note: "Resolved Promise handler enters the VIP **Microtask Queue**!" },
      { title: "Step 4: Sync `console.log('2: Sync End')`", stack: ["console.log('2: Sync End')"], webapi: [], micro: ["() => log('3: Promise')"], macro: ["() => log('4: Timeout')"], out: ["1: Start", "2: Sync End"], note: "Call Stack finishes ALL remaining synchronous statements first." },
      { title: "Step 5: Event Loop drains ALL Microtasks FIRST!", stack: ["() => log('3: Promise')"], webapi: [], micro: [], macro: ["() => log('4: Timeout')"], out: ["1: Start", "2: Sync End", "3: Promise"], note: "Microtasks ALWAYS run before any Macrotask (`setTimeout`)!" },
      { title: "Step 6: Event Loop pops next Macrotask", stack: ["() => log('4: Timeout')"], webapi: [], micro: [], macro: [], out: ["1: Start", "2: Sync End", "3: Promise", "4: Timeout"], note: "✅ Deterministic order: `1 → 2 → 3 (Promise) → 4 (Timeout)`!" }
    ];
    let evIdx = 0;

    // API + JWT + Redis Cache state
    let apiMethod = "GET", apiAuth = "admin", jwtTampered = false, cacheHitRate = 92;

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">🏗️ Backend Systems Lab: Git Commit DAG, JS Event Loop & REST / JWT / Cache</div>
        <div class="ml-viz-sub">Visualize Git branches as pointers on a DAG, step through Microtasks vs Macrotasks, inspect JWT signatures & tune Redis caching!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-be-tab="git">🌿 Git DAG</button>
        <button type="button" class="ml-pill" data-be-tab="evloop">🔄 JS Event Loop</button>
        <button type="button" class="ml-pill" data-be-tab="api">🔐 REST, JWT & Cache</button>
      </div>
    `);
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function render() {
      if (tab === "git") {
        const W = Math.max(460, commits.length * 86 + 60);
        const pos = {};
        commits.forEach((c, idx) => { pos[c.id] = { x: 48 + idx * 82, y: c.lane === 0 ? 54 : 118 }; });
        let edgesSvg = "";
        commits.forEach((c) => {
          const to = pos[c.id];
          if (c.parent && pos[c.parent]) {
            const fr = pos[c.parent];
            edgesSvg += `<path d="M ${fr.x} ${fr.y} C ${(fr.x + to.x) / 2} ${fr.y}, ${(fr.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}" stroke="rgba(255,255,255,0.28)" stroke-width="2.4" fill="none" />`;
          }
          if (c.secondParent && pos[c.secondParent]) {
            const fr2 = pos[c.secondParent];
            edgesSvg += `<path d="M ${fr2.x} ${fr2.y} C ${(fr2.x + to.x) / 2} ${fr2.y}, ${(fr2.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}" stroke="var(--ml-viz-blue)" stroke-width="2.4" stroke-dasharray="4 3" fill="none" />`;
          }
        });
        const nodesSvg = commits.map((c) => {
          const p = pos[c.id];
          const bLabels = Object.entries(branches).filter(([, cid]) => cid === c.id).map(([bn]) => bn === head ? `HEAD→${bn}` : bn);
          const col = c.lane === 0 ? "var(--ml-viz-green)" : "var(--ml-viz-blue)";
          return `
            <circle cx="${p.x}" cy="${p.y}" r="13" fill="#090a0e" stroke="${col}" stroke-width="2.6" />
            <text x="${p.x}" y="${p.y + 4}" text-anchor="middle" fill="#f7f7f9" font-size="9.5" font-family="monospace" font-weight="700">${c.id}</text>
            <text x="${p.x}" y="${p.y + 28}" text-anchor="middle" fill="#9a9aa6" font-size="9">${esc(c.msg.slice(0, 13))}</text>
            ${bLabels.length ? `<text x="${p.x}" y="${p.y - 20}" text-anchor="middle" fill="${bLabels.some((x) => x.startsWith("HEAD")) ? "var(--ml-viz-amber)" : col}" font-size="10" font-weight="800">${esc(bLabels.join(" · "))}</text>` : ""}
          `;
        }).join("");

        stage.innerHTML = `
          <div class="ml-viz-tabs" style="margin-bottom:10px;">
            <button type="button" class="ml-btn-primary" id="g-commit" style="padding:6px 12px; font-size:12px;">+ git commit (${esc(head)})</button>
            <button type="button" class="ml-btn-secondary" id="g-branch" style="padding:6px 12px; font-size:12px;" ${branches["feat-api"] ? "disabled" : ""}>🌿 git checkout -b feat-api</button>
            <button type="button" class="ml-btn-mini" id="g-switch">🔀 Switch (${head === "main" ? "feat-api" : "main"})</button>
            <button type="button" class="ml-btn-mini" id="g-merge" ${!branches["feat-api"] || head !== "main" ? "disabled" : ""}>🔗 git merge feat-api</button>
            <button type="button" class="ml-btn-mini" id="g-reset">↺ Reset DAG</button>
          </div>
          <div style="overflow-x:auto; background:#050507; border:1px solid var(--ml-border); border-radius:12px; padding:10px;">
            <svg width="${W}" height="164" viewBox="0 0 ${W} 164">${edgesSvg}${nodesSvg}</svg>
          </div>
          <div class="ml-easy-box" style="margin-top:10px; font-size:13px;"><strong>Terminal Log:</strong> ${esc(gitLogMsg)}</div>
        `;
        stage.querySelector("#g-commit").addEventListener("click", () => {
          if (commits.length >= 9) { gitLogMsg = "Max 9 visual commits reached — click Reset DAG to experiment again!"; render(); return; }
          const id = ("e" + (gitSeq++ * 19).toString(16) + "7f").slice(0, 4);
          commits.push({ id, msg: head === "main" ? `main #${gitSeq}` : `feat #${gitSeq}`, branch: head, lane: head === "main" ? 0 : 1, parent: branches[head] });
          branches[head] = id;
          gitLogMsg = `[${head} ${id}] Committed new snapshot — branch pointer '${head}' advanced!`;
          render();
        });
        stage.querySelector("#g-branch").addEventListener("click", () => {
          branches["feat-api"] = branches[head];
          head = "feat-api";
          gitLogMsg = `Switched to new branch 'feat-api' pointing at ${branches["feat-api"]} (zero files copied!).`;
          render();
        });
        stage.querySelector("#g-switch").addEventListener("click", () => {
          if (!branches["feat-api"]) { gitLogMsg = "Create 'feat-api' first!"; render(); return; }
          head = head === "main" ? "feat-api" : "main";
          gitLogMsg = `HEAD moved → '${head}' (${branches[head]}).`;
          render();
        });
        stage.querySelector("#g-merge").addEventListener("click", () => {
          if (!branches["feat-api"] || head !== "main") return;
          const id = ("m" + (gitSeq++ * 23).toString(16) + "9a").slice(0, 4);
          commits.push({ id, msg: "merge feat-api", branch: "main", lane: 0, parent: branches.main, secondParent: branches["feat-api"] });
          branches.main = id;
          gitLogMsg = `Merged 'feat-api' into 'main' via 2-parent merge commit ${id}!`;
          render();
        });
        stage.querySelector("#g-reset").addEventListener("click", () => {
          commits = [
            { id: "c1a0", msg: "init: project", branch: "main", lane: 0, parent: null },
            { id: "d4b2", msg: "feat: routes", branch: "main", lane: 0, parent: "c1a0" }
          ];
          branches = { main: "d4b2" }; head = "main"; gitSeq = 3;
          gitLogMsg = "Reset Git Commit Graph to initial state.";
          render();
        });
      } else if (tab === "evloop") {
        const st = evSteps[evIdx];
        stage.innerHTML = `
          <div class="ml-ev-grid">
            <div class="ml-ev-box"><strong>📚 Call Stack (LIFO)</strong>${st.stack.map((x) => `<div class="ml-ev-chip stack">${esc(x)}</div>`).join("") || `<span class="ml-viz-sub">Empty</span>`}</div>
            <div class="ml-ev-box"><strong>⚡ Microtask Queue (VIP · Promises)</strong>${st.micro.map((x) => `<div class="ml-ev-chip micro">${esc(x)}</div>`).join("") || `<span class="ml-viz-sub">Empty</span>`}</div>
            <div class="ml-ev-box"><strong>⏱ Macrotask Queue (setTimeout)</strong>${st.macro.map((x) => `<div class="ml-ev-chip macro">${esc(x)}</div>`).join("") || `<span class="ml-viz-sub">Empty</span>`}</div>
            <div class="ml-ev-box"><strong>💻 Console Output</strong>${st.out.map((x) => `<div class="ml-ev-chip out">${esc(x)}</div>`).join("") || `<span class="ml-viz-sub">Empty</span>`}</div>
          </div>
          <div class="ml-easy-box" style="margin:10px 0;"><strong>${esc(st.title)}:</strong> ${esc(st.note)}</div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="ml-btn-secondary" id="ev-prev" ${evIdx === 0 ? "disabled" : ""}>← Back</button>
            <button type="button" class="ml-btn-primary" id="ev-next" ${evIdx >= evSteps.length - 1 ? "disabled" : ""}>Next Tick →</button>
            <button type="button" class="ml-btn-mini" id="ev-reset">↺ Restart</button>
          </div>
        `;
        stage.querySelector("#ev-prev").addEventListener("click", () => { if (evIdx > 0) { evIdx--; render(); } });
        stage.querySelector("#ev-next").addEventListener("click", () => { if (evIdx < evSteps.length - 1) { evIdx++; render(); } });
        stage.querySelector("#ev-reset").addEventListener("click", () => { evIdx = 0; render(); });
      } else {
        let status = "200 OK", statusCls = "ok", body = `{ "quests": 30, "cached": true }`;
        if (apiAuth === "none") { status = "401 Unauthorized"; statusCls = "bad"; body = `{ "error": "Missing or invalid Bearer token" }`; }
        else if (apiMethod === "DELETE" && apiAuth === "user") { status = "403 Forbidden"; statusCls = "bad"; body = `{ "error": "Authenticated as 'user', but DELETE requires 'admin' role!" }`; }
        else if (apiAuth === "burst") { status = "429 Too Many Requests"; statusCls = "warn"; body = `{ "error": "Rate limit exceeded", "retryAfterSec": 30 }`; }
        else if (apiMethod === "POST") { status = "201 Created"; statusCls = "ok"; body = `{ "id": 106, "title": "New Quest", "created": true }`; }
        else if (apiMethod === "DELETE") { status = "204 No Content"; statusCls = "ok"; body = "(empty body — resource deleted idempotently)"; }

        const avgLatency = ((cacheHitRate / 100) * 1.0 + (1 - cacheHitRate / 100) * 42.0).toFixed(2);
        const speedup = (42.0 / Number(avgLatency)).toFixed(1);

        stage.innerHTML = `
          <div class="ml-api-sim-grid">
            <div class="ml-ev-box">
              <strong>1. REST Endpoint & Status Code Tester</strong>
              <div class="ml-viz-tabs" style="margin:8px 0;">
                ${["GET", "POST", "DELETE"].map((m) => `<button type="button" class="ml-btn-mini ${apiMethod === m ? "active" : ""}" data-am="${m}">${m}</button>`).join("")}
              </div>
              <div class="ml-viz-tabs" style="margin-bottom:8px;">
                ${[["admin", "🔑 Admin"], ["user", "👤 User"], ["none", "🚫 No Auth"], ["burst", "⚡ Burst 500/s"]].map(([k, l]) => `<button type="button" class="ml-btn-mini ${apiAuth === k ? "active" : ""}" data-aa="${k}">${l}</button>`).join("")}
              </div>
              <div class="ml-api-resp ${statusCls}"><strong>${apiMethod} /api/quests/42 → ${status}</strong><code>${esc(body)}</code></div>
            </div>
            <div class="ml-ev-box">
              <strong>2. Live JWT Signature Verifier</strong>
              <div style="font-family:var(--ml-font-mono); font-size:11.5px; word-break:break-all; margin:6px 0;">
                <span style="color:var(--ml-viz-rose);">eyJhbGciOiJIUzI1NiJ9</span>.<span style="color:var(--ml-viz-plum);">${jwtTampered ? "eyJyb2xlIjoiYWRtaW4ifQ" : "eyJyb2xlIjoidXNlciJ9"}</span>.<span style="color:var(--ml-viz-blue);">HMAC_SIG_9F2A</span>
              </div>
              <div class="ml-viz-sub">Decoded Payload: <code>${jwtTampered ? `{"role":"admin"} (TAMPERED!)` : `{"role":"user"}`}</code></div>
              <button type="button" class="ml-btn-mini" id="jwt-tamper" style="margin-top:8px;">${jwtTampered ? "↺ Restore Honest Payload" : "🕵️ Tamper Payload to 'admin'"}</button>
              <div style="margin-top:8px; font-weight:700; font-size:12.5px; color:${jwtTampered ? "var(--ml-danger)" : "var(--ml-primary)"};">
                ${jwtTampered ? "❌ 401 REJECTED: HMAC signature mismatch caught tampering immediately!" : "✅ SIGNATURE VALID: Payload untouched since server signed it."}
              </div>
            </div>
          </div>
          <div class="ml-ev-box" style="margin-top:10px;">
            <div class="ml-slider-label">
              <span>3. Redis Cache-Aside Hit Rate: <strong>${cacheHitRate}%</strong> (RAM 1ms vs SQL 42ms)</span>
              <strong>Avg Latency: ${avgLatency} ms (${speedup}× faster!)</strong>
            </div>
            <input type="range" id="api-cache-sl" min="0" max="99" value="${cacheHitRate}" style="margin-top:6px;" />
          </div>
        `;
        stage.querySelectorAll("[data-am]").forEach((b) => b.addEventListener("click", () => { apiMethod = b.dataset.am; render(); }));
        stage.querySelectorAll("[data-aa]").forEach((b) => b.addEventListener("click", () => { apiAuth = b.dataset.aa; render(); }));
        stage.querySelector("#jwt-tamper").addEventListener("click", () => { jwtTampered = !jwtTampered; render(); });
        stage.querySelector("#api-cache-sl").addEventListener("input", (e) => { cacheHitRate = parseInt(e.target.value, 10); render(); });
      }
    }

    header.querySelectorAll("[data-be-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-be-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.beTab;
        render();
      });
    });
    render();
  }

  // ==================== 28. EXAM LAB: PULLEYS, GEARS, WORK RATE & UPCAT/NMAT ====================
  function renderExamMechPerceptualLab(container) {
    let tab = "mech"; // "mech" | "work" | "upcat_nmat"
    // Tab 1: Mechanics state
    let loadN = 120;
    let dLoad = 2;
    let dEffort = 4;
    let pulleyRopes = 2;
    let gearT1 = 36;
    let gearT2 = 12;
    let gearRpm1 = 10;
    // Tab 2: Work Rate & Mixture state
    let pipeA = 6;
    let pipeB = 3;
    let drainMode = false;
    let conc1 = 20;
    let vol1 = 10;
    let conc2 = 50;
    let vol2 = 10;
    // Tab 3: UPCAT EV & NMAT Mirror Clock state
    let eliminated = 1;
    let clockH = 3;
    let clockM = 15;

    container.innerHTML = `
      <div class="ml-viz-card">
        <div class="ml-viz-head">
          <div>
            <h3>⚙️ Exam Lab: DOST Mechanics, Work/Mixtures & UPCAT/NMAT</h3>
            <p class="ml-viz-sub">Interactive sandbox for DOST pulleys/gears/levers, CSE/ACET work & mixtures, UPCAT R − ¼W EV & NMAT mirror clocks.</p>
          </div>
          <div class="ml-viz-tabs" id="ml-exlab-tabs">
            <button type="button" class="ml-pill active" data-exlab-tab="mech">⚙️ Pulleys, Gears & Lever</button>
            <button type="button" class="ml-pill" data-exlab-tab="work">⏱️ Work Rate & Mixture</button>
            <button type="button" class="ml-pill" data-exlab-tab="upcat_nmat">🌻 UPCAT EV & NMAT Mirror</button>
          </div>
        </div>
        <div id="ml-exlab-body"></div>
      </div>
    `;

    const body = container.querySelector("#ml-exlab-body");
    const header = container.querySelector("#ml-exlab-tabs");

    function render() {
      if (tab === "mech") {
        const effortLever = Math.round((loadN * dLoad) / Math.max(1, dEffort) * 10) / 10;
        const effortPulley = Math.round((loadN / pulleyRopes) * 10) / 10;
        const gearRpm2 = Math.round((gearRpm1 * gearT1 / Math.max(1, gearT2)) * 10) / 10;
        const pulleyName = pulleyRopes === 1 ? "Single Fixed (MA = 1)" : pulleyRopes === 2 ? "Single Movable (MA = 2)" : "Block & Tackle (MA = 4)";

        body.innerHTML = `
          <div class="ml-viz-grid-2">
            <div class="ml-micro-card">
              <div class="ml-micro-label">Lever Balance · F₁·d₁ = F₂·d₂</div>
              <svg viewBox="0 0 320 112" width="100%" height="112">
                <line x1="28" y1="64" x2="292" y2="64" stroke="var(--ml-viz-green)" stroke-width="5" stroke-linecap="round"/>
                <polygon points="160,66 146,96 174,96" fill="var(--ml-viz-amber)"/>
                <rect x="${152 - dLoad * 24}" y="30" width="42" height="30" rx="5" fill="rgba(120,180,245,0.22)" stroke="var(--ml-viz-blue)"/>
                <text x="${173 - dLoad * 24}" y="49" text-anchor="middle" fill="var(--ml-ink)" font-size="11" font-weight="700">${loadN}N</text>
                <rect x="${126 + dEffort * 24}" y="30" width="44" height="30" rx="5" fill="rgba(234,179,73,0.22)" stroke="var(--ml-viz-amber)"/>
                <text x="${148 + dEffort * 24}" y="49" text-anchor="middle" fill="var(--ml-viz-amber)" font-size="11" font-weight="700">${effortLever}N</text>
                <text x="86" y="106" text-anchor="middle" fill="var(--ml-ink-muted)" font-size="10.5">Load arm: ${dLoad} m</text>
                <text x="234" y="106" text-anchor="middle" fill="var(--ml-ink-muted)" font-size="10.5">Effort arm: ${dEffort} m</text>
              </svg>
              <div class="ml-slider-row">
                <label>Load: <strong>${loadN} N</strong></label>
                <input type="range" id="exl-load" min="40" max="240" step="20" value="${loadN}" />
              </div>
              <div class="ml-slider-row">
                <label>Load Arm d₁: <strong>${dLoad} m</strong></label>
                <input type="range" id="exl-d1" min="1" max="5" step="1" value="${dLoad}" />
              </div>
              <div class="ml-slider-row">
                <label>Effort Arm d₂: <strong>${dEffort} m</strong></label>
                <input type="range" id="exl-d2" min="1" max="5" step="1" value="${dEffort}" />
              </div>
              <p class="ml-viz-note">Balanced Effort = <strong>${loadN} × ${dLoad} ÷ ${dEffort} = ${effortLever} N</strong> (MA = ${(dEffort / dLoad).toFixed(2)}×).</p>
            </div>

            <div class="ml-micro-card">
              <div class="ml-micro-label">Pulley Strands & Meshing Gear Train</div>
              <div class="ml-viz-tabs" style="margin-bottom:10px;">
                ${[1, 2, 4].map((r) => `<button type="button" class="ml-pill ${pulleyRopes === r ? "active" : ""}" data-exl-rope="${r}">${r === 1 ? "Fixed (1)" : r === 2 ? "Movable (2)" : "Block (4)"}</button>`).join("")}
              </div>
              <p class="ml-viz-note" style="margin-bottom:12px;">
                <strong>${pulleyName}</strong> lifting <strong>${loadN} N</strong> requires <strong>${effortPulley} N</strong> effort — and pulls <strong>${pulleyRopes} m</strong> of rope per 1 m lift!
              </p>
              <div class="ml-slider-row">
                <label>Driver Gear A Teeth (CW, ${gearRpm1} RPM): <strong>${gearT1}T</strong></label>
                <input type="range" id="exl-t1" min="12" max="60" step="6" value="${gearT1}" />
              </div>
              <div class="ml-slider-row">
                <label>Driven Gear B Teeth: <strong>${gearT2}T</strong></label>
                <input type="range" id="exl-t2" min="6" max="36" step="6" value="${gearT2}" />
              </div>
              <p class="ml-viz-note">
                Directly meshing Gear B spins <strong>Counterclockwise (CCW)</strong> at <strong>${gearRpm2} RPM</strong> (<code>${gearRpm1} × ${gearT1} ÷ ${gearT2}</code>). Smaller gear = faster RPM!
              </p>
            </div>
          </div>
        `;

        body.querySelector("#exl-load").addEventListener("input", (e) => { loadN = Number(e.target.value); render(); });
        body.querySelector("#exl-d1").addEventListener("input", (e) => { dLoad = Number(e.target.value); render(); });
        body.querySelector("#exl-d2").addEventListener("input", (e) => { dEffort = Number(e.target.value); render(); });
        body.querySelector("#exl-t1").addEventListener("input", (e) => { gearT1 = Number(e.target.value); render(); });
        body.querySelector("#exl-t2").addEventListener("input", (e) => { gearT2 = Number(e.target.value); render(); });
        body.querySelectorAll("[data-exl-rope]").forEach((b) => {
          b.addEventListener("click", () => { pulleyRopes = Number(b.dataset.exlRope); render(); });
        });
      } else if (tab === "work") {
        const netRate = drainMode ? (1 / pipeA - 1 / pipeB) : (1 / pipeA + 1 / pipeB);
        const combinedTime = netRate > 0 ? (1 / netRate).toFixed(2) + " hours" : "Never fills (drain ≥ fill!)";
        const totalVol = vol1 + vol2;
        const solute = (conc1 / 100) * vol1 + (conc2 / 100) * vol2;
        const finalConc = totalVol > 0 ? ((solute / totalVol) * 100).toFixed(1) : "0.0";

        body.innerHTML = `
          <div class="ml-viz-grid-2">
            <div class="ml-micro-card">
              <div class="ml-micro-label">Combined Work Rate · 1/A ${drainMode ? "−" : "+"} 1/B = 1/T</div>
              <div class="ml-viz-tabs" style="margin-bottom:8px;">
                <button type="button" class="ml-pill ${!drainMode ? "active" : ""}" id="exl-fill-mode">Both Filling (+)</button>
                <button type="button" class="ml-pill ${drainMode ? "active" : ""}" id="exl-drain-mode">Pipe B Draining (−)</button>
              </div>
              <div class="ml-slider-row">
                <label>Pipe A solo time: <strong>${pipeA} h</strong> (rate 1/${pipeA})</label>
                <input type="range" id="exl-pa" min="2" max="16" step="1" value="${pipeA}" />
              </div>
              <div class="ml-slider-row">
                <label>Pipe B solo time: <strong>${pipeB} h</strong> (rate 1/${pipeB})</label>
                <input type="range" id="exl-pb" min="2" max="16" step="1" value="${pipeB}" />
              </div>
              <p class="ml-viz-note">
                Result: <strong>${combinedTime}</strong>. ${!drainMode ? `(Trap check: averaging gives ${((pipeA + pipeB) / 2).toFixed(1)} h — WRONG! Combined time must be LESS than ${Math.min(pipeA, pipeB)} h!)` : "(Drain pipe subtracts from fill rate!)"}
              </p>
            </div>

            <div class="ml-micro-card">
              <div class="ml-micro-label">Beaker Mixture Conservation · C₁V₁ + C₂V₂ = C_f(V₁+V₂)</div>
              <div class="ml-slider-row">
                <label>Beaker 1: <strong>${vol1} L @ ${conc1}%</strong></label>
                <input type="range" id="exl-c1" min="0" max="80" step="10" value="${conc1}" />
              </div>
              <div class="ml-slider-row">
                <label>Beaker 1 Volume: <strong>${vol1} L</strong></label>
                <input type="range" id="exl-v1" min="5" max="30" step="5" value="${vol1}" />
              </div>
              <div class="ml-slider-row">
                <label>Beaker 2: <strong>${vol2} L @ ${conc2}%</strong></label>
                <input type="range" id="exl-c2" min="10" max="100" step="10" value="${conc2}" />
              </div>
              <p class="ml-viz-note">
                Pure Solute = <strong>${solute.toFixed(1)} L</strong> inside <strong>${totalVol} L</strong> total → Final Concentration = <strong>${finalConc}%</strong>!
              </p>
            </div>
          </div>
        `;

        body.querySelector("#exl-fill-mode").addEventListener("click", () => { drainMode = false; render(); });
        body.querySelector("#exl-drain-mode").addEventListener("click", () => { drainMode = true; render(); });
        body.querySelector("#exl-pa").addEventListener("input", (e) => { pipeA = Number(e.target.value); render(); });
        body.querySelector("#exl-pb").addEventListener("input", (e) => { pipeB = Number(e.target.value); render(); });
        body.querySelector("#exl-c1").addEventListener("input", (e) => { conc1 = Number(e.target.value); render(); });
        body.querySelector("#exl-v1").addEventListener("input", (e) => { vol1 = Number(e.target.value); render(); });
        body.querySelector("#exl-c2").addEventListener("input", (e) => { conc2 = Number(e.target.value); render(); });
      } else {
        const remChoices = 4 - eliminated;
        const pRight = 1 / remChoices;
        const pWrong = 1 - pRight;
        const ev = pRight * 1 + pWrong * (-0.25);
        const mirH = clockM === 0 ? (12 - clockH || 12) : (11 - clockH || 12);
        const mirM = clockM === 0 ? 0 : (60 - clockM);
        const pad2 = (n) => String(n).padStart(2, "0");

        body.innerHTML = `
          <div class="ml-viz-grid-2">
            <div class="ml-micro-card">
              <div class="ml-micro-label">UPCAT R − ¼W Guessing Expected Value</div>
              <div class="ml-viz-tabs" style="margin-bottom:10px;">
                ${[0, 1, 2, 3].map((k) => `<button type="button" class="ml-pill ${eliminated === k ? "active" : ""}" data-exl-elim="${k}">Eliminated ${k}</button>`).join("")}
              </div>
              <p class="ml-viz-note">
                Remaining options: <strong>${remChoices}</strong> · P(Right) = <strong>${Math.round(pRight * 100)}%</strong><br/>
                Expected Value per item: <strong>${ev >= 0 ? "+" : ""}${ev.toFixed(3)} pts</strong> (vs. Blank = 0.000).<br/>
                <strong>Strategy:</strong> ${eliminated === 0 ? "Tiny edge (+0.063) with high variance — try striking out at least 1 choice!" : eliminated === 3 ? "100% guaranteed +1.000 point!" : "Strongly POSITIVE EV — ALWAYS take the educated guess!"}
              </p>
            </div>

            <div class="ml-micro-card">
              <div class="ml-micro-label">NMAT Mirror Clock Formula · 11:60 − Real Time</div>
              <div class="ml-slider-row">
                <label>Real Hour: <strong>${clockH}</strong></label>
                <input type="range" id="exl-ch" min="1" max="11" step="1" value="${clockH}" />
              </div>
              <div class="ml-slider-row">
                <label>Real Minute: <strong>:${pad2(clockM)}</strong></label>
                <input type="range" id="exl-cm" min="5" max="55" step="5" value="${clockM}" />
              </div>
              <p class="ml-viz-note">
                Real Clock: <strong>${clockH}:${pad2(clockM)}</strong> → Vertical Mirror Shows: <strong>${mirH}:${pad2(mirM)}</strong>!<br/>
                (Shortcut: <code>11:60 − ${clockH}:${pad2(clockM)} = ${mirH}:${pad2(mirM)}</code>)
              </p>
            </div>
          </div>
        `;

        body.querySelectorAll("[data-exl-elim]").forEach((b) => {
          b.addEventListener("click", () => { eliminated = Number(b.dataset.exlElim); render(); });
        });
        body.querySelector("#exl-ch").addEventListener("input", (e) => { clockH = Number(e.target.value); render(); });
        body.querySelector("#exl-cm").addEventListener("input", (e) => { clockM = Number(e.target.value); render(); });
      }
    }

    header.querySelectorAll("[data-exlab-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-exlab-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.exlabTab;
        render();
      });
    });
    render();
  }

  // ==================== REGISTER ALL 15 NEW VISUAL PLAYGROUNDS ====================
  VIZ.registry.aiNeuralLab = renderAiNeuralLab;
  VIZ.registry.htmlCssLivePlayground = renderHtmlCssLivePlayground;
  VIZ.registry.pythonTraceLab = renderPythonTraceLab;
  VIZ.registry.abstractShapesLab = renderAbstractShapesLab;
  VIZ.registry.physicsLawsPlayground = renderPhysicsLawsPlayground;
  VIZ.registry.phHistoryCivicsLab = renderPhHistoryCivicsLab;
  VIZ.registry.filipinoWikaLab = renderFilipinoWikaLab;
  VIZ.registry.opticsConcaveConvexLab = renderOpticsConcaveConvexLab;
  VIZ.registry.grammarWritingLab = renderGrammarWritingLab;
  VIZ.registry.careerLifeWellnessLab = renderCareerLifeWellnessLab;
  VIZ.registry.earthSpaceEconLab = renderEarthSpaceEconLab;
  VIZ.registry.dsaAlgoVisualizerLab = renderDsaAlgoVisualizerLab;
  VIZ.registry.sqlDatabaseLab = renderSqlDatabaseLab;
  VIZ.registry.backendSystemTerminalLab = renderBackendSystemTerminalLab;
  VIZ.registry.examMechPerceptualLab = renderExamMechPerceptualLab;

  VIZ.list.push(
    { id: "aiNeuralLab", title: "14. AI Neuron (ReLU), LLM Temp & Self-Attention", icon: "🤖", category: "ai_code" },
    { id: "htmlCssLivePlayground", title: "15. Live HTML/CSS/JS Sandbox, Box Model & Flexbox", icon: "🎨", category: "ai_code" },
    { id: "pythonTraceLab", title: "16. Live Python Interpreter, Tracer, Binary & Big-O", icon: "🐍", category: "ai_code" },
    { id: "abstractShapesLab", title: "17. Abstract Shapes: Rotate, 3×3 Matrix & Cube Nets", icon: "🔷", category: "humanities_shapes" },
    { id: "physicsLawsPlayground", title: "18. Physics Laws: Kepler Orbit, Pendulum & Snell Optics", icon: "🌌", category: "physics" },
    { id: "phHistoryCivicsLab", title: "19. PH History Timeline & 1987 3-Branch Civics", icon: "🇵🇭", category: "humanities_shapes" },
    { id: "filipinoWikaLab", title: "20. Filipino 4-Way Diin & Wastong Gamit Studio", icon: "📜", category: "humanities_shapes" },
    { id: "opticsConcaveConvexLab", title: "21. Convex & Concave: Mirrors, Lenses & f''(x) Lab", icon: "🔍", category: "physics" },
    { id: "grammarWritingLab", title: "22. Sentence Surgeon, Grammar & Argument Fallacy Lab", icon: "✍️", category: "humanities_shapes" },
    { id: "careerLifeWellnessLab", title: "23. Money (50/30/20 & MP2), EQ Flow & FITT Zones", icon: "💼", category: "humanities_shapes" },
    { id: "earthSpaceEconLab", title: "24. Earth Tilt/Moon, Plates/Quakes & Supply–Demand", icon: "🌍", category: "physics" },
    { id: "dsaAlgoVisualizerLab", title: "25. DSA Visualizer: Sorting, BFS/DFS/Dijkstra & Hash Map", icon: "🧩", category: "ai_code" },
    { id: "sqlDatabaseLab", title: "26. Live SQL Database Workbench & B-Tree Index Lab", icon: "🗄️", category: "ai_code" },
    { id: "backendSystemTerminalLab", title: "27. Git Commit DAG, JS Event Loop & REST / JWT / Cache", icon: "🏗️", category: "ai_code" },
    { id: "examMechPerceptualLab", title: "28. Exam Lab: DOST Pulleys/Gears, Work Rate & UPCAT/NMAT", icon: "⚙️", category: "physics" }
  );
})(typeof window !== "undefined" ? window : globalThis);
