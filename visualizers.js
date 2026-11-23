(function (root) {
  "use strict";

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

  // 1. Make-10 & Distance Subtraction Visualizer
  function renderNumberLineMake10(container) {
    let mode = "add";
    let a = 8;
    let b = 5;

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });

    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">Make-10 & Distance Number Line</div>
        <div class="ml-viz-sub">See why addition steals to hit 10 & subtraction shifts both numbers!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-mode="add">➕ Make-10 Add</button>
        <button type="button" class="ml-pill" data-mode="sub">➖ Shift Subtract</button>
      </div>
    `);

    const controls = el("div", { className: "ml-viz-controls" }, `
      <label class="ml-slider-label">
        <span>Left Number (A): <strong id="nl-a-val">8</strong></span>
        <input type="range" id="nl-a" min="5" max="99" value="8" />
      </label>
      <label class="ml-slider-label">
        <span>Right Number (B): <strong id="nl-b-val">5</strong></span>
        <input type="range" id="nl-b" min="2" max="49" value="5" />
      </label>
    `);

    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    const aInput = controls.querySelector("#nl-a");
    const bInput = controls.querySelector("#nl-b");
    const aLabel = controls.querySelector("#nl-a-val");
    const bLabel = controls.querySelector("#nl-b-val");

    function update() {
      a = parseInt(aInput.value, 10);
      b = parseInt(bInput.value, 10);
      if (mode === "sub" && a <= b) {
        a = b + 3;
        aInput.value = String(a);
      }
      aLabel.textContent = String(a);
      bLabel.textContent = String(b);

      if (mode === "add") {
        const nextTen = Math.ceil((a + 0.1) / 10) * 10;
        const need = nextTen - a;
        const steal = Math.min(need, b);
        const rem = b - steal;
        const total = a + b;

        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span>${a} + ${b}</span>
            <span class="ml-arrow">→</span>
            <span class="ml-highlight-green">(${a} + ${steal})</span> + ${rem}
            <span class="ml-arrow">→</span>
            <span class="ml-highlight-blue">${a + steal}</span> + ${rem} = <strong>${total}</strong>
          </div>
          <div class="ml-bar-row">
            <div class="ml-block-group">
              <div class="ml-block-caption">Number A (${a})</div>
              <div class="ml-ten-bar">
                <div class="ml-ten-fill" style="width:${Math.min(100, (a / (total + 2)) * 100)}%">${a}</div>
                <div class="ml-ten-steal" style="width:${Math.max(4, (steal / (total + 2)) * 100)}%">+${steal} stolen!</div>
              </div>
            </div>
            <div class="ml-block-caption" style="margin-top:8px;">
              ${a} borrows <strong>${steal}</strong> from ${b} to snap cleanly to <strong>${a + steal}</strong>, leaving <strong>${rem}</strong>!
            </div>
          </div>
        `;
      } else {
        const nextTenB = Math.ceil(b / 10) * 10;
        const shift = nextTenB - b;
        const shiftedA = a + shift;
        const shiftedB = b + shift;
        const diff = a - b;
        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span>${a} − ${b}</span>
            <span class="ml-arrow">→</span>
            <span class="ml-highlight-purple">Shift both +${shift}</span>
            <span class="ml-arrow">→</span>
            <span>${shiftedA} − ${shiftedB} = <strong>${diff}</strong></span>
          </div>
          <svg viewBox="0 0 520 110" class="ml-svg-box">
            <line x1="25" y1="68" x2="495" y2="68" stroke="currentColor" stroke-opacity="0.35" stroke-width="2" />
            <line x1="80" y1="54" x2="290" y2="54" stroke="var(--ml-viz-blue, #35628c)" stroke-width="5" stroke-linecap="round" />
            <circle cx="80" cy="68" r="6" fill="var(--ml-viz-amber, #b36a22)" />
            <circle cx="290" cy="68" r="6" fill="var(--ml-viz-green, #2d6a4f)" />
            <text x="80" y="92" text-anchor="middle" fill="currentColor" font-size="13" font-weight="700">${b}</text>
            <text x="290" y="92" text-anchor="middle" fill="currentColor" font-size="13" font-weight="700">${a}</text>
            <text x="185" y="42" text-anchor="middle" fill="var(--ml-viz-blue, #35628c)" font-size="13" font-weight="700">Gap = ${diff}</text>

            <line x1="140" y1="24" x2="350" y2="24" stroke="var(--ml-viz-plum, #725385)" stroke-width="4" stroke-dasharray="5,4" />
            <text x="245" y="16" text-anchor="middle" fill="var(--ml-viz-plum, #725385)" font-size="12" font-weight="700">Shifted +${shift}: ${shiftedB} to ${shiftedA} (SAME gap ${diff}!)</text>
          </svg>
        `;
      }
    }

    header.querySelectorAll(".ml-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll(".ml-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        mode = btn.dataset.mode;
        update();
      });
    });

    aInput.addEventListener("input", update);
    bInput.addEventListener("input", update);
    update();
  }

  // 2. Rectangle / Area Multiplier Visualizer
  function renderRectangleMultiplier(container) {
    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });

    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">Chocolate-Bar Area Multiplier</div>
        <div class="ml-viz-sub">See how splitting a big number into (10 + ones) turns hard multiplication easy!</div>
      </div>
    `);

    const controls = el("div", { className: "ml-viz-controls" }, `
      <label class="ml-slider-label">
        <span>Rows (A): <strong id="rm-a-val">7</strong></span>
        <input type="range" id="rm-a" min="2" max="9" value="7" />
      </label>
      <label class="ml-slider-label">
        <span>Columns (B): <strong id="rm-b-val">14</strong></span>
        <input type="range" id="rm-b" min="11" max="19" value="14" />
      </label>
    `);

    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    const aInput = controls.querySelector("#rm-a");
    const bInput = controls.querySelector("#rm-b");

    function update() {
      const a = parseInt(aInput.value, 10);
      const b = parseInt(bInput.value, 10);
      const ones = b - 10;
      controls.querySelector("#rm-a-val").textContent = String(a);
      controls.querySelector("#rm-b-val").textContent = String(b);

      const leftArea = a * 10;
      const rightArea = a * ones;
      const total = leftArea + rightArea;

      stage.innerHTML = `
        <div class="ml-equation-hero">
          <span>${a} × ${b}</span>
          <span class="ml-arrow">=</span>
          <span class="ml-highlight-blue">(${a} × 10)</span> + <span class="ml-highlight-green">(${a} × ${ones})</span>
          <span class="ml-arrow">=</span>
          <span>${leftArea} + ${rightArea} = <strong>${total}</strong></span>
        </div>
        <div class="ml-area-split">
          <div class="ml-area-box ml-area-tens" style="flex: 10">
            <div class="ml-area-dims">${a} × 10</div>
            <div class="ml-area-num">${leftArea}</div>
          </div>
          <div class="ml-area-plus">+</div>
          <div class="ml-area-box ml-area-ones" style="flex: ${Math.max(3, ones)}">
            <div class="ml-area-dims">${a} × ${ones}</div>
            <div class="ml-area-num">${rightArea}</div>
          </div>
        </div>
        <div class="ml-viz-note">
          Same exact rule in Algebra: <strong>${a}(x + ${ones}) = ${a}x + ${rightArea}</strong>!
        </div>
      `;
    }

    aInput.addEventListener("input", update);
    bInput.addEventListener("input", update);
    update();
  }

  // 3. Fraction & Percent Swap Visualizer
  function renderFractionPizzaLab(container) {
    let tab = "fractions";
    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });

    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">Fraction Bars & Magic % Swap Lab</div>
        <div class="ml-viz-sub">Compare fractions visually or test why x% of y = y% of x!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-tab="fractions">🍕 Fractions</button>
        <button type="button" class="ml-pill" data-tab="percent">💯 % Swap Hack</button>
      </div>
    `);

    const controls = el("div", { className: "ml-viz-controls" });
    const stage = el("div", { className: "ml-viz-stage" });

    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function renderControls() {
      if (tab === "fractions") {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>Left Fraction: <strong id="fp-l-txt">3/4</strong></span>
            <div class="ml-pair-sliders">
              <input type="range" id="fp-n1" min="1" max="7" value="3" />
              <input type="range" id="fp-d1" min="2" max="8" value="4" />
            </div>
          </label>
          <label class="ml-slider-label">
            <span>Right Fraction: <strong id="fp-r-txt">2/3</strong></span>
            <div class="ml-pair-sliders">
              <input type="range" id="fp-n2" min="1" max="7" value="2" />
              <input type="range" id="fp-d2" min="2" max="8" value="3" />
            </div>
          </label>
        `;
        controls.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", update));
      } else {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>Percent (X): <strong id="fp-px-val">16</strong>%</span>
            <input type="range" id="fp-px" min="2" max="80" step="2" value="16" />
          </label>
          <label class="ml-slider-label">
            <span>Base Number (Y): <strong id="fp-py-val">50</strong></span>
            <input type="range" id="fp-py" min="10" max="100" step="5" value="50" />
          </label>
        `;
        controls.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", update));
      }
      update();
    }

    function buildSegBar(num, den, color) {
      let segs = "";
      for (let i = 0; i < den; i++) {
        const filled = i < num;
        segs += `<div class="ml-frac-seg" style="background:${filled ? color : "transparent"}; opacity:${filled ? "1" : "0.25"}"></div>`;
      }
      return `<div class="ml-frac-bar">${segs}</div>`;
    }

    function update() {
      if (tab === "fractions") {
        let n1 = parseInt(controls.querySelector("#fp-n1").value, 10);
        const d1 = parseInt(controls.querySelector("#fp-d1").value, 10);
        if (n1 > d1) n1 = d1;
        let n2 = parseInt(controls.querySelector("#fp-n2").value, 10);
        const d2 = parseInt(controls.querySelector("#fp-d2").value, 10);
        if (n2 > d2) n2 = d2;

        controls.querySelector("#fp-l-txt").textContent = `${n1}/${d1} (${Math.round((n1 / d1) * 100)}%)`;
        controls.querySelector("#fp-r-txt").textContent = `${n2}/${d2} (${Math.round((n2 / d2) * 100)}%)`;

        const v1 = n1 / d1;
        const v2 = n2 / d2;
        const cmp = Math.abs(v1 - v2) < 1e-9 ? "=" : v1 > v2 ? ">" : "<";

        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span class="ml-highlight-blue">${n1}/${d1}</span>
            <span class="ml-arrow">${cmp}</span>
            <span class="ml-highlight-green">${n2}/${d2}</span>
          </div>
          <div style="display:grid; gap:10px; margin-top:10px;">
            <div>
              <div class="ml-block-caption">Left: ${n1} out of ${d1} slices (${(v1 * 100).toFixed(1)}%)</div>
              ${buildSegBar(n1, d1, "var(--ml-viz-blue, #35628c)")}
            </div>
            <div>
              <div class="ml-block-caption">Right: ${n2} out of ${d2} slices (${(v2 * 100).toFixed(1)}%)</div>
              ${buildSegBar(n2, d2, "var(--ml-viz-green, #2d6a4f)")}
            </div>
          </div>
          <div class="ml-viz-note">
            Common denominator (${d1 * d2}): <strong>${n1 * d2}/${d1 * d2}</strong> vs <strong>${n2 * d1}/${d1 * d2}</strong> — sum = <strong>${n1 * d2 + n2 * d1}/${d1 * d2}</strong>!
          </div>
        `;
      } else {
        const x = parseInt(controls.querySelector("#fp-px").value, 10);
        const y = parseInt(controls.querySelector("#fp-py").value, 10);
        controls.querySelector("#fp-px-val").textContent = String(x);
        controls.querySelector("#fp-py-val").textContent = String(y);
        const ans = ((x * y) / 100).toFixed(2).replace(/\.00$/, "");

        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span class="ml-highlight-blue">${x}% of ${y}</span>
            <span class="ml-arrow">=</span>
            <span class="ml-highlight-green">${y}% of ${x}</span>
            <span class="ml-arrow">=</span>
            <strong>${ans}</strong>
          </div>
          <div class="ml-viz-note">
            Why? Because (${x} ÷ 100) × ${y} is literally the exact same multiplication as (${y} ÷ 100) × ${x} = <strong>${ans}</strong>!
          </div>
        `;
      }
    }

    header.querySelectorAll(".ml-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll(".ml-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.tab;
        renderControls();
      });
    });

    renderControls();
  }

  // 4. Algebra Balance Scale Lab
  function renderAlgebraBalanceScale(container) {
    const puzzles = [
      { label: "2x + 4 = 10", coef: 2, constTerm: 4, rhs: 10 },
      { label: "3x − 3 = 12", coef: 3, constTerm: -3, rhs: 12 },
      { label: "4x + 8 = 20", coef: 4, constTerm: 8, rhs: 20 }
    ];
    let pIdx = 0;
    let coef = 2;
    let cTerm = 4;
    let rhs = 10;

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });

    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">Interactive Algebra Balance Scale</div>
        <div class="ml-viz-sub">Apply the SAME move to both trays to isolate <strong>x</strong>!</div>
      </div>
      <div class="ml-viz-tabs">
        ${puzzles.map((p, i) => `<button type="button" class="ml-pill ${i === 0 ? "active" : ""}" data-p="${i}">${p.label}</button>`).join("")}
      </div>
    `);

    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function loadPuzzle(i) {
      pIdx = i;
      coef = puzzles[i].coef;
      cTerm = puzzles[i].constTerm;
      rhs = puzzles[i].rhs;
      render();
    }

    function fmtLeft() {
      const xPart = coef === 1 ? "x" : `${coef}x`;
      if (cTerm === 0) return xPart;
      return cTerm > 0 ? `${xPart} + ${cTerm}` : `${xPart} − ${Math.abs(cTerm)}`;
    }

    function render() {
      const solved = coef === 1 && cTerm === 0;
      const xBoxes = Array.from({ length: Math.min(6, Math.max(1, coef)) }, () => `<span class="ml-x-chip">x</span>`).join("");

      stage.innerHTML = `
        <div class="ml-equation-hero" style="margin-bottom:12px;">
          <span class="${solved ? "ml-highlight-green" : "ml-highlight-blue"}">${fmtLeft()}</span>
          <span class="ml-arrow">=</span>
          <span><strong>${rhs}</strong></span>
          ${solved ? `<span class="ml-solved-tag">🎉 Solved!</span>` : ""}
        </div>

        <div class="ml-scale-trays">
          <div class="ml-tray">
            <div class="ml-tray-items">
              ${xBoxes}
              ${cTerm !== 0 ? `<span class="ml-num-chip">${cTerm > 0 ? "+" + cTerm : cTerm}</span>` : ""}
            </div>
            <div class="ml-tray-plate">Left Tray</div>
          </div>
          <div class="ml-scale-fulcrum">⚖️</div>
          <div class="ml-tray">
            <div class="ml-tray-items">
              <span class="ml-num-chip">${rhs}</span>
            </div>
            <div class="ml-tray-plate">Right Tray</div>
          </div>
        </div>

        <div class="ml-scale-actions">
          ${cTerm > 0 ? `<button type="button" class="ml-action-btn" data-op="subC">Subtract ${cTerm} from BOTH sides (−${cTerm})</button>` : ""}
          ${cTerm < 0 ? `<button type="button" class="ml-action-btn" data-op="addC">Add ${Math.abs(cTerm)} to BOTH sides (+${Math.abs(cTerm)})</button>` : ""}
          ${cTerm === 0 && coef > 1 ? `<button type="button" class="ml-action-btn" data-op="divCoef">Divide BOTH sides by ${coef} (÷${coef})</button>` : ""}
          <button type="button" class="ml-action-btn secondary" data-op="reset">↺ Reset Scale</button>
        </div>
      `;

      stage.querySelectorAll("[data-op]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const op = btn.dataset.op;
          if (op === "subC") {
            rhs -= cTerm;
            cTerm = 0;
          } else if (op === "addC") {
            rhs += Math.abs(cTerm);
            cTerm = 0;
          } else if (op === "divCoef") {
            rhs = rhs / coef;
            coef = 1;
          } else if (op === "reset") {
            loadPuzzle(pIdx);
            return;
          }
          render();
        });
      });
    }

    header.querySelectorAll(".ml-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll(".ml-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        loadPuzzle(parseInt(btn.dataset.p, 10));
      });
    });

    loadPuzzle(0);
  }

  // 5. Unit Circle & Parabola Shifter Lab
  function renderUnitCircleAndGraphLab(container) {
    let tab = "circle";
    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });

    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">Unit Circle & Parabola Shift Lab</div>
        <div class="ml-viz-sub">See cos(θ) = X, sin(θ) = Y live, or slide y = a(x − h)² + k!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-tab="circle">🎡 Unit Circle</button>
        <button type="button" class="ml-pill" data-tab="parabola">🏹 Parabola Shifter</button>
      </div>
    `);

    const controls = el("div", { className: "ml-viz-controls" });
    const stage = el("div", { className: "ml-viz-stage" });

    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function renderControls() {
      if (tab === "circle") {
        controls.innerHTML = `
          <label class="ml-slider-label" style="grid-column: 1 / -1;">
            <span>Angle θ: <strong id="uc-deg">45°</strong> (<span id="uc-rad">π/4</span>)</span>
            <input type="range" id="uc-angle" min="0" max="360" step="15" value="45" />
          </label>
        `;
        controls.querySelector("#uc-angle").addEventListener("input", update);
      } else {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>Horizontal h (Inside −h): <strong id="pb-h-val">2</strong></span>
            <input type="range" id="pb-h" min="-4" max="4" step="1" value="2" />
          </label>
          <label class="ml-slider-label">
            <span>Vertical k (Outside +k): <strong id="pb-k-val">1</strong></span>
            <input type="range" id="pb-k" min="-4" max="4" step="1" value="1" />
          </label>
        `;
        controls.querySelectorAll("input").forEach((i) => i.addEventListener("input", update));
      }
      update();
    }

    function fmtRad(deg) {
      const map = {
        0: "0", 30: "π/6", 45: "π/4", 60: "π/3", 90: "π/2",
        120: "2π/3", 135: "3π/4", 150: "5π/6", 180: "π",
        210: "7π/6", 225: "5π/4", 240: "4π/3", 270: "3π/2",
        300: "5π/3", 315: "7π/4", 330: "11π/6", 360: "2π"
      };
      return map[deg] || `${((deg * Math.PI) / 180).toFixed(2)} rad`;
    }

    function update() {
      if (tab === "circle") {
        const deg = parseInt(controls.querySelector("#uc-angle").value, 10);
        controls.querySelector("#uc-deg").textContent = `${deg}°`;
        controls.querySelector("#uc-rad").textContent = fmtRad(deg);

        const rad = (deg * Math.PI) / 180;
        const cosV = Math.cos(rad);
        const sinV = Math.sin(rad);
        const cx = 130;
        const cy = 120;
        const r = 85;
        const px = cx + r * cosV;
        const py = cy - r * sinV;

        stage.innerHTML = `
          <div class="ml-circle-grid">
            <svg viewBox="0 0 260 240" class="ml-svg-square">
              <line x1="20" y1="${cy}" x2="240" y2="${cy}" stroke="currentColor" stroke-opacity="0.25" />
              <line x1="${cx}" y1="15" x2="${cx}" y2="225" stroke="currentColor" stroke-opacity="0.25" />
              <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="2" />
              <line x1="${cx}" y1="${cy}" x2="${px.toFixed(1)}" y2="${cy}" stroke="var(--ml-viz-blue, #35628c)" stroke-width="4" />
              <line x1="${px.toFixed(1)}" y1="${cy}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="4" />
              <line x1="${cx}" y1="${cy}" x2="${px.toFixed(1)}" y2="${py.toFixed(1)}" stroke="var(--ml-viz-amber, #b36a22)" stroke-width="3" />
              <circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="6" fill="var(--ml-viz-amber, #b36a22)" />
            </svg>
            <div class="ml-circle-readout">
              <div class="ml-readout-pill" style="border-color:var(--ml-viz-blue, #35628c);">
                <span>cos(${deg}°) = X (Blue)</span>
                <strong>${cosV.toFixed(2)}</strong>
              </div>
              <div class="ml-readout-pill" style="border-color:var(--ml-viz-green, #2d6a4f);">
                <span>sin(${deg}°) = Y (Green)</span>
                <strong>${sinV.toFixed(2)}</strong>
              </div>
              <div class="ml-readout-pill" style="border-color:var(--ml-viz-plum, #725385);">
                <span>cos² + sin² =</span>
                <strong>${(cosV * cosV + sinV * sinV).toFixed(2)}</strong>
              </div>
              <div class="ml-viz-note" style="margin-top:4px;">
                Blue leg = sideways (<strong>cos</strong>). Green leg = height (<strong>sin</strong>). Radius is always 1!
              </div>
            </div>
          </div>
        `;
      } else {
        const h = parseInt(controls.querySelector("#pb-h").value, 10);
        const k = parseInt(controls.querySelector("#pb-k").value, 10);
        controls.querySelector("#pb-h-val").textContent = String(h);
        controls.querySelector("#pb-k-val").textContent = String(k);

        const insideStr = h === 0 ? "x" : h > 0 ? `(x − ${h})` : `(x + ${Math.abs(h)})`;
        const outsideStr = k === 0 ? "" : k > 0 ? ` + ${k}` : ` − ${Math.abs(k)}`;
        const eq = `y = ${insideStr}²${outsideStr}`;

        const w = 300;
        const ht = 210;
        const ox = w / 2;
        const oy = ht / 2 + 20;
        const scale = 22;

        let pathBase = "";
        let pathShift = "";
        for (let px = -6; px <= 6; px += 0.2) {
          const sx = ox + px * scale;
          const syBase = oy - (px * px) * (scale * 0.55);
          const syShift = oy - ((px - h) * (px - h) + k) * (scale * 0.55);
          pathBase += (pathBase ? " L " : "M ") + `${sx.toFixed(1)} ${syBase.toFixed(1)}`;
          pathShift += (pathShift ? " L " : "M ") + `${sx.toFixed(1)} ${syShift.toFixed(1)}`;
        }
        const vx = ox + h * scale;
        const vy = oy - k * (scale * 0.55);

        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span>${eq}</span>
            <span class="ml-arrow">→</span>
            <span class="ml-highlight-green">Vertex (${h}, ${k})</span>
          </div>
          <svg viewBox="0 0 ${w} ${ht}" class="ml-svg-box" style="max-height:220px;">
            <line x1="10" y1="${oy}" x2="${w - 10}" y2="${oy}" stroke="currentColor" stroke-opacity="0.25" />
            <line x1="${ox}" y1="10" x2="${ox}" y2="${ht - 10}" stroke="currentColor" stroke-opacity="0.25" />
            <path d="${pathBase}" fill="none" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4,4" stroke-width="2" />
            <path d="${pathShift}" fill="none" stroke="var(--ml-viz-amber, #b36a22)" stroke-width="3" />
            <circle cx="${vx}" cy="${vy}" r="6" fill="var(--ml-viz-green, #2d6a4f)" />
            <text x="${vx}" y="${vy + 18}" text-anchor="middle" fill="var(--ml-viz-green, #2d6a4f)" font-size="12" font-weight="700">(${h}, ${k})</text>
          </svg>
          <div class="ml-viz-note">
            Notice how <strong>${insideStr}</strong> moves horizontally OPPOSITE to the sign inside, while <strong>${k >= 0 ? "+" + k : k}</strong> moves vertically honestly!
          </div>
        `;
      }
    }

    header.querySelectorAll(".ml-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll(".ml-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.tab;
        renderControls();
      });
    });

    renderControls();
  }

  // 6. Calculus Slope & Integral Area Surfer Lab
  function renderCalculusSurferLab(container) {
    let mode = "derivative";
    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });

    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">Calculus Speedometer & Area Surfer</div>
        <div class="ml-viz-sub">Slide x along y = x² to see the live tangent slope f'(x) & integral area ∫ x² dx!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-mode="derivative">🏎️ Derivative (Slope)</button>
        <button type="button" class="ml-pill" data-mode="integral">🌊 Integral (Area)</button>
      </div>
    `);

    const controls = el("div", { className: "ml-viz-controls" }, `
      <label class="ml-slider-label">
        <span>Position x: <strong id="cs-x-val">2.0</strong></span>
        <input type="range" id="cs-x" min="-2.5" max="3.0" step="0.5" value="2.0" />
      </label>
      <label class="ml-slider-label" id="cs-bars-wrap" style="display:none;">
        <span>Area Rectangles (n): <strong id="cs-n-val">6</strong></span>
        <input type="range" id="cs-n" min="2" max="24" step="1" value="6" />
      </label>
    `);

    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    const xInput = controls.querySelector("#cs-x");
    const nInput = controls.querySelector("#cs-n");
    const barsWrap = controls.querySelector("#cs-bars-wrap");

    function update() {
      const x = parseFloat(xInput.value);
      const n = parseInt(nInput.value, 10);
      controls.querySelector("#cs-x-val").textContent = x.toFixed(1);
      controls.querySelector("#cs-n-val").textContent = String(n);

      const w = 340;
      const h = 210;
      const ox = 150;
      const oy = 180;
      const sx = 45;
      const sy = 18;

      let curvePath = "";
      for (let t = -3; t <= 3.2; t += 0.15) {
        const px = ox + t * sx;
        const py = oy - (t * t) * sy;
        curvePath += (curvePath ? " L " : "M ") + `${px.toFixed(1)} ${py.toFixed(1)}`;
      }

      if (mode === "derivative") {
        const y = x * x;
        const slope = 2 * x;
        const pX = ox + x * sx;
        const pY = oy - y * sy;

        const dx = 1.2;
        const x1 = x - dx;
        const y1 = y - slope * dx;
        const x2 = x + dx;
        const y2 = y + slope * dx;

        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span>f(x) = x²</span>
            <span class="ml-arrow">→</span>
            <span class="ml-highlight-blue">f'(${x.toFixed(1)}) = 2(${x.toFixed(1)}) = <strong>${slope.toFixed(1)}</strong></span>
          </div>
          <svg viewBox="0 0 ${w} ${h}" class="ml-svg-box">
            <line x1="15" y1="${oy}" x2="${w - 15}" y2="${oy}" stroke="currentColor" stroke-opacity="0.25" />
            <line x1="${ox}" y1="15" x2="${ox}" y2="${h - 10}" stroke="currentColor" stroke-opacity="0.25" />
            <path d="${curvePath}" fill="none" stroke="var(--ml-viz-plum, #725385)" stroke-width="3" />
            <line x1="${(ox + x1 * sx).toFixed(1)}" y1="${(oy - y1 * sy).toFixed(1)}"
                  x2="${(ox + x2 * sx).toFixed(1)}" y2="${(oy - y2 * sy).toFixed(1)}"
                  stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="3" />
            <circle cx="${pX.toFixed(1)}" cy="${pY.toFixed(1)}" r="6" fill="var(--ml-viz-amber, #b36a22)" />
          </svg>
          <div class="ml-viz-note">
            At x = ${x.toFixed(1)}, the sage tangent line tilts with slope <strong>${slope.toFixed(1)}</strong>. Notice at x = 0 (the valley), slope hits 0!
          </div>
        `;
      } else {
        const b = Math.max(0.5, x);
        const exactArea = (b * b * b) / 3;
        const width = b / n;
        let rects = "";
        let approx = 0;
        for (let i = 1; i <= n; i++) {
          const rx = i * width;
          const ry = rx * rx;
          approx += ry * width;
          const svgX = ox + (i - 1) * width * sx;
          const svgW = width * sx;
          const svgH = ry * sy;
          const svgY = oy - svgH;
          rects += `<rect x="${svgX.toFixed(1)}" y="${svgY.toFixed(1)}" width="${Math.max(1, svgW - 1).toFixed(1)}" height="${svgH.toFixed(1)}" fill="var(--ml-viz-blue, #35628c)" fill-opacity="0.30" stroke="var(--ml-viz-blue, #35628c)" stroke-width="1" />`;
        }

        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span>∫₀^${b.toFixed(1)} x² dx = (${b.toFixed(1)})³/3</span>
            <span class="ml-arrow">=</span>
            <span class="ml-highlight-green"><strong>${exactArea.toFixed(2)}</strong></span>
          </div>
          <svg viewBox="0 0 ${w} ${h}" class="ml-svg-box">
            <line x1="15" y1="${oy}" x2="${w - 15}" y2="${oy}" stroke="currentColor" stroke-opacity="0.25" />
            <line x1="${ox}" y1="15" x2="${ox}" y2="${h - 10}" stroke="currentColor" stroke-opacity="0.25" />
            ${rects}
            <path d="${curvePath}" fill="none" stroke="var(--ml-viz-plum, #725385)" stroke-width="3" />
          </svg>
          <div class="ml-viz-note">
            ${n} rectangles approximate the area as <strong>${approx.toFixed(2)}</strong>. Slide n → 24 and watch it hug the exact integral <strong>${exactArea.toFixed(2)}</strong>!
          </div>
        `;
      }
    }

    header.querySelectorAll(".ml-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll(".ml-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        mode = btn.dataset.mode;
        barsWrap.style.display = mode === "integral" ? "flex" : "none";
        update();
      });
    });

    xInput.addEventListener("input", update);
    nInput.addEventListener("input", update);
    update();
  }

  // 7. Number Pattern Sieve (2,4,6,8 / Odd / Even / Primes / Squares 1-100 Board)
  function renderNumberPatternSieve(container) {
    let filter = "even";
    let selectedNum = 12;

    const isPrime = (n) => {
      if (n < 2) return false;
      for (let d = 2; d * d <= n; d++) {
        if (n % d === 0) return false;
      }
      return true;
    };

    const primeFactors = (n) => {
      if (n < 2) return [String(n)];
      const f = [];
      let rem = n;
      for (let d = 2; d * d <= rem; d++) {
        while (rem % d === 0) {
          f.push(d);
          rem = rem / d;
        }
      }
      if (rem > 1) f.push(rem);
      return f;
    };

    const modes = [
      { id: "even", label: "👯 Even (2,4,6,8...)" },
      { id: "odd", label: "1️⃣ Odd (1,3,5,7...)" },
      { id: "skip4", label: "×4 Skip (4,8,12...)" },
      { id: "skip6", label: "×6 Skip (6,12,18...)" },
      { id: "skip8", label: "×8 Skip (8,16,24...)" },
      { id: "prime", label: "🧬 Primes (2,3,5,7...)" },
      { id: "square", label: "√ Squares (1,4,9,16...)" }
    ];

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });

    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">1–100 Pattern, Prime & Skip-Count Board</div>
        <div class="ml-viz-sub">Tap a filter to SEE the pattern, or click any number to crack its DNA!</div>
      </div>
    `);

    const pillBar = el("div", { className: "ml-viz-tabs", style: "margin-bottom:12px;" },
      modes.map((m) => `<button type="button" class="ml-pill ${m.id === filter ? "active" : ""}" data-sieve="${m.id}">${m.label}</button>`).join("")
    );

    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(pillBar);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function matches(n) {
      if (filter === "even") return n % 2 === 0;
      if (filter === "odd") return n % 2 === 1;
      if (filter === "skip4") return n % 4 === 0;
      if (filter === "skip6") return n % 6 === 0;
      if (filter === "skip8") return n % 8 === 0;
      if (filter === "prime") return isPrime(n);
      if (filter === "square") return Number.isInteger(Math.sqrt(n));
      return false;
    }

    function explainFilter() {
      if (filter === "even") return "Every highlighted column ends in <strong>2, 4, 6, 8, or 0</strong>! Notice how Evens form 5 clean vertical stripes.";
      if (filter === "odd") return "Every highlighted column ends in <strong>1, 3, 5, 7, or 9</strong>! Always 1 leftover after pairing.";
      if (filter === "skip4") return "<strong>4, 8, 12, 16, 20...</strong> Notice every 4-multiple is EVEN (skips every other even number)!";
      if (filter === "skip6") return "<strong>6, 12, 18, 24, 30...</strong> Diagonal bands! Every 6-multiple is BOTH even AND has digits summing to ÷3.";
      if (filter === "skip8") return "<strong>8, 16, 24, 32, 40...</strong> Double 4s! Watch the last digits cycle: 8, 6, 4, 2, 0.";
      if (filter === "prime") return "<strong>25 Primes under 100!</strong> Notice <strong>2</strong> is the ONLY even prime, and 1 is NOT prime.";
      return "<strong>1, 4, 9, 16, 25, 36, 49, 64, 81, 100!</strong> Watch the jumps grow by odd numbers: +3, +5, +7, +9, +11...";
    }

    function render() {
      const cells = [];
      for (let n = 1; n <= 100; n++) {
        const hit = matches(n);
        const sel = n === selectedNum;
        cells.push(`<button type="button" class="ml-sieve-cell ${hit ? "hit" : ""} ${sel ? "selected" : ""}" data-num="${n}">${n}</button>`);
      }

      const pf = primeFactors(selectedNum);
      const parity = selectedNum % 2 === 0 ? "Even" : "Odd";
      const primeLabel = selectedNum === 1 ? "Unit (Neither)" : isPrime(selectedNum) ? "PRIME 🧬" : `Composite (${pf.join(" × ")})`;
      const sqrtVal = Number.isInteger(Math.sqrt(selectedNum)) ? `Exact √${selectedNum} = ${Math.sqrt(selectedNum)}` : `√${selectedNum} ≈ ${Math.sqrt(selectedNum).toFixed(2)}`;

      stage.innerHTML = `
        <div class="ml-sieve-grid">${cells.join("")}</div>
        <div class="ml-sieve-inspector">
          <strong>#${selectedNum}</strong>:
          <span>${parity}</span> •
          <span>${primeLabel}</span> •
          <span>${sqrtVal}</span>
        </div>
        <div class="ml-viz-note">${explainFilter()}</div>
      `;

      stage.querySelectorAll("[data-num]").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedNum = parseInt(btn.dataset.num, 10);
          render();
        });
      });
    }

    pillBar.querySelectorAll("[data-sieve]").forEach((btn) => {
      btn.addEventListener("click", () => {
        pillBar.querySelectorAll("[data-sieve]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filter = btn.dataset.sieve;
        render();
      });
    });

    render();
  }

  // 8. Physics Circuit (V=IR) & Motion/Force (F=ma, KE=1/2mv^2) Lab
  function renderPhysicsCircuitAndMotionLab(container) {
    let tab = "circuit";
    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });

    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">Physics Lab: Ohm's Circuit & Newton's Motion</div>
        <div class="ml-viz-sub">See Voltage push Current through Resistance, or test F = m·a & KE = ½mv²!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-ph-tab="circuit">⚡ Circuit (V = IR)</button>
        <button type="button" class="ml-pill" data-ph-tab="motion">🍎 Force & Energy</button>
      </div>
    `);

    const controls = el("div", { className: "ml-viz-controls" });
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function renderControls() {
      if (tab === "circuit") {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>Battery Voltage (V): <strong id="ph-v-val">12</strong> V</span>
            <input type="range" id="ph-v" min="3" max="24" step="3" value="12" />
          </label>
          <label class="ml-slider-label">
            <span>Resistor (R): <strong id="ph-r-val">4</strong> Ω</span>
            <input type="range" id="ph-r" min="1" max="12" step="1" value="4" />
          </label>
        `;
      } else {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>Mass (m): <strong id="ph-m-val">4</strong> kg</span>
            <input type="range" id="ph-m" min="1" max="10" step="1" value="4" />
          </label>
          <label class="ml-slider-label">
            <span>Net Push Force (F): <strong id="ph-f-val">20</strong> N</span>
            <input type="range" id="ph-f" min="5" max="50" step="5" value="20" />
          </label>
          <label class="ml-slider-label">
            <span>Speed (v): <strong id="ph-spd-val">3</strong> m/s</span>
            <input type="range" id="ph-spd" min="1" max="10" step="1" value="3" />
          </label>
        `;
      }
      controls.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", update));
      update();
    }

    function update() {
      if (tab === "circuit") {
        const V = parseInt(controls.querySelector("#ph-v").value, 10);
        const R = parseInt(controls.querySelector("#ph-r").value, 10);
        controls.querySelector("#ph-v-val").textContent = String(V);
        controls.querySelector("#ph-r-val").textContent = String(R);
        const I = V / R;
        const P = V * I;
        const glow = Math.min(1, I / 8);

        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span>I = V ÷ R</span>
            <span class="ml-arrow">→</span>
            <span class="ml-highlight-blue">${V} V ÷ ${R} Ω</span>
            <span class="ml-arrow">=</span>
            <span class="ml-highlight-green"><strong>${I.toFixed(2).replace(/\.00$/, "")} Amps</strong></span>
          </div>
          <svg viewBox="0 0 360 120" class="ml-svg-box" style="max-height:130px;">
            <rect x="35" y="25" width="290" height="70" rx="14" fill="none" stroke="var(--ml-viz-blue, #35628c)" stroke-width="3" />
            <rect x="20" y="45" width="30" height="30" rx="6" fill="var(--ml-viz-amber, #b36a22)" />
            <text x="35" y="64" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">${V}V</text>
            <rect x="145" y="14" width="70" height="22" rx="6" fill="var(--ml-viz-plum, #725385)" />
            <text x="180" y="29" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="800">${R} Ω</text>
            <circle cx="325" cy="60" r="18" fill="var(--ml-viz-amber, #b36a22)" fill-opacity="${(0.16 + glow * 0.72).toFixed(2)}" stroke="var(--ml-viz-amber, #b36a22)" stroke-width="2.5" />
            <text x="325" y="64" text-anchor="middle" fill="currentColor" font-size="12" font-weight="800">💡</text>
          </svg>
          <div class="ml-viz-note">
            Power = V × I = <strong>${P.toFixed(1).replace(/\.0$/, "")} Watts</strong>. Higher Voltage pushes MORE flow; higher Resistance squeezes it!
          </div>
        `;
      } else {
        const m = parseInt(controls.querySelector("#ph-m").value, 10);
        const F = parseInt(controls.querySelector("#ph-f").value, 10);
        const v = parseInt(controls.querySelector("#ph-spd").value, 10);
        controls.querySelector("#ph-m-val").textContent = String(m);
        controls.querySelector("#ph-f-val").textContent = String(F);
        controls.querySelector("#ph-spd-val").textContent = String(v);
        const a = F / m;
        const ke = 0.5 * m * v * v;
        const mom = m * v;

        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span class="ml-highlight-blue">a = ${F}N ÷ ${m}kg = ${a.toFixed(2).replace(/\.00$/, "")} m/s²</span>
          </div>
          <div class="ml-rules-grid" style="margin-top:10px;">
            <div class="ml-micro-card">
              <div class="ml-micro-label">⚡ Kinetic Energy (½mv²)</div>
              <p style="font-size:18px; font-weight:800;">${ke.toFixed(1).replace(/\.0$/, "")} Joules</p>
              <p class="ml-viz-sub">Notice doubling speed v makes energy 4× bigger!</p>
            </div>
            <div class="ml-micro-card">
              <div class="ml-micro-label">💥 Momentum (p = m·v)</div>
              <p style="font-size:18px; font-weight:800;">${mom} kg·m/s</p>
              <p class="ml-viz-sub">Weight on Earth (g≈10): ${m * 10} N</p>
            </div>
          </div>
        `;
      }
    }

    header.querySelectorAll("[data-ph-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-ph-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.phTab;
        renderControls();
      });
    });

    renderControls();
  }

  // 9. Chemistry Bohr Atom Builder (1-18) & pH Log Scale Lab
  function renderChemistryAtomPhLab(container) {
    let tab = "atom";
    const els = [
      { z: 1, sym: "H", name: "Hydrogen", n: 0 }, { z: 2, sym: "He", name: "Helium", n: 2 },
      { z: 3, sym: "Li", name: "Lithium", n: 4 }, { z: 4, sym: "Be", name: "Beryllium", n: 5 },
      { z: 5, sym: "B", name: "Boron", n: 6 }, { z: 6, sym: "C", name: "Carbon", n: 6 },
      { z: 7, sym: "N", name: "Nitrogen", n: 7 }, { z: 8, sym: "O", name: "Oxygen", n: 8 },
      { z: 9, sym: "F", name: "Fluorine", n: 10 }, { z: 10, sym: "Ne", name: "Neon", n: 10 },
      { z: 11, sym: "Na", name: "Sodium", n: 12 }, { z: 12, sym: "Mg", name: "Magnesium", n: 12 },
      { z: 13, sym: "Al", name: "Aluminum", n: 14 }, { z: 14, sym: "Si", name: "Silicon", n: 14 },
      { z: 15, sym: "P", name: "Phosphorus", n: 16 }, { z: 16, sym: "S", name: "Sulfur", n: 16 },
      { z: 17, sym: "Cl", name: "Chlorine", n: 18 }, { z: 18, sym: "Ar", name: "Argon", n: 22 }
    ];

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });

    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">Chemistry Lab: Bohr Atom Builder & pH Log Scale</div>
        <div class="ml-viz-sub">See electron shells (2, 8, 8) determine bonding, or explore pH = −log₁₀[H⁺]!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-ch-tab="atom">⚛️ Atom (1–18)</button>
        <button type="button" class="ml-pill" data-ch-tab="ph">🍋 pH Log Scale</button>
      </div>
    `);

    const controls = el("div", { className: "ml-viz-controls" });
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function renderControls() {
      if (tab === "atom") {
        controls.innerHTML = `
          <label class="ml-slider-label" style="grid-column:1/-1;">
            <span>Atomic Number (Protons Z): <strong id="ch-z-val">6 (Carbon)</strong></span>
            <input type="range" id="ch-z" min="1" max="18" step="1" value="6" />
          </label>
        `;
      } else {
        controls.innerHTML = `
          <label class="ml-slider-label" style="grid-column:1/-1;">
            <span>pH Level: <strong id="ch-ph-val">7</strong></span>
            <input type="range" id="ch-ph" min="0" max="14" step="1" value="7" />
          </label>
        `;
      }
      controls.querySelectorAll("input").forEach((i) => i.addEventListener("input", update));
      update();
    }

    function update() {
      if (tab === "atom") {
        const z = parseInt(controls.querySelector("#ch-z").value, 10);
        const atom = els[z - 1];
        controls.querySelector("#ch-z-val").textContent = `${z} (${atom.name} — ${atom.sym})`;
        const s1 = Math.min(2, z);
        const s2 = Math.max(0, Math.min(8, z - 2));
        const s3 = Math.max(0, z - 10);
        const valence = s3 > 0 ? s3 : s2 > 0 ? s2 : s1;
        const maxOuter = z <= 2 ? 2 : 8;
        const mood = valence === maxOuter
          ? "Full outer shell! Noble Gas (doesn't react)"
          : valence <= 3
          ? `Metal-like: wants to GIVE ${valence} e⁻ (forms +${valence} ion)`
          : valence === 4
          ? "4 outer hands: loves to SHARE covalently (4 bonds!)"
          : `Wants ${8 - valence} more e⁻ (steals or shares!)`;

        const cx = 120, cy = 110;
        const drawShell = (count, r) => {
          if (count === 0) return "";
          let dots = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4,3" />`;
          for (let i = 0; i < count; i++) {
            const ang = (i / count) * Math.PI * 2 - Math.PI / 2;
            dots += `<circle cx="${(cx + r * Math.cos(ang)).toFixed(1)}" cy="${(cy + r * Math.sin(ang)).toFixed(1)}" r="5" fill="var(--ml-viz-blue, #35628c)" />`;
          }
          return dots;
        };

        stage.innerHTML = `
          <div class="ml-circle-grid">
            <svg viewBox="0 0 240 220" class="ml-svg-square">
              ${drawShell(s1, 36)}
              ${drawShell(s2, 64)}
              ${drawShell(s3, 92)}
              <circle cx="${cx}" cy="${cy}" r="20" fill="var(--ml-viz-green, #2d6a4f)" />
              <text x="${cx}" y="${cy + 5}" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800">${atom.sym}</text>
            </svg>
            <div class="ml-circle-readout">
              <div class="ml-readout-pill" style="border-color:var(--ml-viz-green, #2d6a4f);"><span>Protons (+ ID) & Mass</span><strong>${z} p⁺ • Mass ${z + atom.n}</strong></div>
              <div class="ml-readout-pill" style="border-color:var(--ml-viz-blue, #35628c);"><span>Shells (2, 8, 8)</span><strong>${[s1, s2, s3].filter((x) => x > 0).join(", ")}</strong></div>
              <div class="ml-readout-pill" style="border-color:var(--ml-viz-amber, #b36a22);"><span>Valence Electrons</span><strong>${valence} / ${maxOuter}</strong></div>
              <div class="ml-viz-note">${mood}</div>
            </div>
          </div>
        `;
      } else {
        const ph = parseInt(controls.querySelector("#ch-ph").value, 10);
        controls.querySelector("#ch-ph-val").textContent = String(ph);
        const examples = {
          0: "Battery Acid", 1: "Stomach Acid", 2: "Lemon Juice", 3: "Soda / Vinegar",
          4: "Tomato Juice", 5: "Black Coffee", 6: "Milk", 7: "Pure Water (Neutral!)",
          8: "Seawater / Egg", 9: "Baking Soda", 10: "Antacid", 11: "Ammonia",
          12: "Soapy Water", 13: "Bleach", 14: "Drain Cleaner"
        };
        const kind = ph < 7 ? "ACID (More H⁺)" : ph === 7 ? "NEUTRAL (H⁺ = OH⁻)" : "BASE (More OH⁻)";
        const diff = Math.abs(7 - ph);
        const rel = diff === 0 ? "1× neutral baseline" : `${Math.pow(10, diff).toLocaleString()}× ${ph < 7 ? "more acidic" : "more basic"} than pure water!`;

        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span class="${ph < 7 ? "ml-highlight-purple" : ph === 7 ? "ml-highlight-green" : "ml-highlight-blue"}">pH ${ph} • ${kind}</span>
          </div>
          <div class="ml-ph-bar" style="height:16px; border-radius:999px; background:linear-gradient(90deg, #b23b31, #c97d28, #3b7a57, #35628c, #725385); position:relative; margin:14px 0;">
            <div style="position:absolute; top:-5px; left:${(ph / 14) * 96}%; width:14px; height:26px; border-radius:6px; background:var(--ml-surface, #fdfbf7); border:2px solid var(--ml-ink, #1d1c1a); box-shadow:0 2px 6px rgba(0,0,0,0.2);"></div>
          </div>
          <div class="ml-viz-note">
            <strong>Example:</strong> ${examples[ph]} • <strong>[H⁺] = 10⁻${ph} M</strong> • ${rel}
          </div>
        `;
      }
    }

    header.querySelectorAll("[data-ch-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-ch-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.chTab;
        renderControls();
      });
    });

    renderControls();
  }

  // 10. Biology DNA->mRNA Transcriber & 2x2 Punnett Square Lab
  function renderBiologyDnaPunnettLab(container) {
    let tab = "dna";
    let dnaBases = ["A", "T", "G", "C", "A", "G"];
    let p1 = ["A", "a"];
    let p2 = ["A", "a"];

    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });

    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">Biology Lab: DNA → mRNA & Punnett FOIL Square</div>
        <div class="ml-viz-sub">Click bases to transcribe DNA → mRNA (T swaps to U!), or cross parent alleles!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-bi-tab="dna">🧬 DNA → mRNA</button>
        <button type="button" class="ml-pill" data-bi-tab="punnett">🟩 Punnett Square</button>
      </div>
    `);

    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function render() {
      if (tab === "dna") {
        const compMap = { A: "T", T: "A", G: "C", C: "G" };
        const rnaMap = { A: "U", T: "A", G: "C", C: "G" };
        stage.innerHTML = `
          <div style="display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-bottom:12px;">
            <span class="ml-mini-tag">Append Base:</span>
            ${["A", "T", "G", "C"].map((b) => `<button type="button" class="ml-btn-mini" data-add-base="${b}">+ ${b}</button>`).join("")}
            <button type="button" class="ml-btn-mini" id="bi-pop-base">⌫ Undo</button>
          </div>
          <div style="display:grid; gap:8px; font-family:var(--ml-font-mono, monospace); font-size:15px; font-weight:700;">
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-blue, #35628c);">
              <span>DNA Template:</span>
              <span>${dnaBases.join(" - ")}</span>
            </div>
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-green, #2d6a4f);">
              <span>Partner DNA (A↔T, G↔C):</span>
              <span>${dnaBases.map((b) => compMap[b]).join(" - ")}</span>
            </div>
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-rose, #9e4765);">
              <span>mRNA Copy (T becomes U!):</span>
              <span>${dnaBases.map((b) => rnaMap[b]).join(" - ")}</span>
            </div>
          </div>
          <div class="ml-viz-note">
            ${Math.floor(dnaBases.length / 3)} full Codon(s) (3 RNA letters = 1 Amino Acid)!
          </div>
        `;

        stage.querySelectorAll("[data-add-base]").forEach((btn) => {
          btn.addEventListener("click", () => {
            if (dnaBases.length < 9) dnaBases.push(btn.dataset.addBase);
            render();
          });
        });
        document.getElementById("bi-pop-base").addEventListener("click", () => {
          if (dnaBases.length > 3) dnaBases.pop();
          render();
        });
      } else {
        const combos = [
          [p1[0], p2[0]], [p1[1], p2[0]],
          [p1[0], p2[1]], [p1[1], p2[1]]
        ].map((pair) => pair.sort().join(""));
        const domCount = combos.filter((c) => c.includes("A")).length;
        const recCount = 4 - domCount;
        const opts = [["A", "A"], ["A", "a"], ["a", "a"]];

        stage.innerHTML = `
          <div class="ml-viz-controls" style="margin-bottom:12px;">
            <div class="ml-slider-label">
              <span>Parent 1: <strong>${p1.join("")}</strong></span>
              <div class="ml-viz-tabs">
                ${opts.map((o) => `<button type="button" class="ml-pill ${p1.join("") === o.join("") ? "active" : ""}" data-p1="${o.join("")}">${o.join("")}</button>`).join("")}
              </div>
            </div>
            <div class="ml-slider-label">
              <span>Parent 2: <strong>${p2.join("")}</strong></span>
              <div class="ml-viz-tabs">
                ${opts.map((o) => `<button type="button" class="ml-pill ${p2.join("") === o.join("") ? "active" : ""}" data-p2="${o.join("")}">${o.join("")}</button>`).join("")}
              </div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px; max-width:260px; margin:0 auto;">
            ${combos.map((c) => `
              <div class="ml-micro-card" style="text-align:center; font-size:20px; font-weight:800; border-color:${c.includes("A") ? "var(--ml-viz-green, #2d6a4f)" : "var(--ml-viz-rose, #9e4765)"};">
                ${c}
              </div>
            `).join("")}
          </div>
          <div class="ml-viz-note">
            Dominant Phenotype (has <strong>A</strong>): <strong>${domCount * 25}%</strong> &nbsp;|&nbsp;
            Recessive (<strong>aa</strong>): <strong>${recCount * 25}%</strong> — literally Algebra FOIL!
          </div>
        `;

        stage.querySelectorAll("[data-p1]").forEach((b) => b.addEventListener("click", () => { p1 = b.dataset.p1.split(""); render(); }));
        stage.querySelectorAll("[data-p2]").forEach((b) => b.addEventListener("click", () => { p2 = b.dataset.p2.split(""); render(); }));
      }
    }

    header.querySelectorAll("[data-bi-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-bi-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.biTab;
        render();
      });
    });

    render();
  }

  // 11. PHYS2 Electromagnetism Lab: Coulomb 1/r², Capacitors & Cyclotron Orbit
  function renderElectroMagLab(container) {
    let tab = "caps";
    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">PHYS2 E&M Lab: Capacitors, Coulomb Force & Cyclotron</div>
        <div class="ml-viz-sub">Compare Series vs Parallel capacitors, see 1/r² vs 1/r scaling, or curve charges in a magnetic field!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-em-tab="caps">⚡ Capacitors & K</button>
        <button type="button" class="ml-pill" data-em-tab="coulomb">🧲 Coulomb & V</button>
        <button type="button" class="ml-pill" data-em-tab="cyclotron">🌀 Cyclotron B</button>
      </div>
    `);
    const controls = el("div", { className: "ml-viz-controls" });
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function renderControls() {
      if (tab === "caps") {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>C₁: <strong id="em-c1-val">6</strong> μF</span>
            <input type="range" id="em-c1" min="2" max="16" step="2" value="6" />
          </label>
          <label class="ml-slider-label">
            <span>C₂: <strong id="em-c2-val">12</strong> μF</span>
            <input type="range" id="em-c2" min="2" max="16" step="2" value="12" />
          </label>
          <label class="ml-slider-label">
            <span>Voltage V: <strong id="em-v-val">10</strong> V</span>
            <input type="range" id="em-v" min="5" max="50" step="5" value="10" />
          </label>
          <label class="ml-slider-label">
            <span>Dielectric K: <strong id="em-k-val">1</strong></span>
            <input type="range" id="em-k" min="1" max="5" step="1" value="1" />
          </label>
        `;
      } else if (tab === "coulomb") {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>q₁ (μC): <strong id="em-q1-val">4</strong></span>
            <input type="range" id="em-q1" min="1" max="8" step="1" value="4" />
          </label>
          <label class="ml-slider-label">
            <span>q₂ (μC): <strong id="em-q2-val">2</strong></span>
            <input type="range" id="em-q2" min="1" max="8" step="1" value="2" />
          </label>
          <label class="ml-slider-label" style="grid-column:1/-1;">
            <span>Distance r (cm): <strong id="em-r-val">3</strong> cm</span>
            <input type="range" id="em-r" min="1" max="9" step="1" value="3" />
          </label>
        `;
      } else {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>Speed v (×10⁶ m/s): <strong id="em-spd-val">4</strong></span>
            <input type="range" id="em-spd" min="2" max="8" step="1" value="4" />
          </label>
          <label class="ml-slider-label">
            <span>Magnetic Field B (T): <strong id="em-b-val">2</strong></span>
            <input type="range" id="em-b" min="1" max="5" step="1" value="2" />
          </label>
        `;
      }
      controls.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", update));
      update();
    }

    function update() {
      if (tab === "caps") {
        const c1 = parseInt(controls.querySelector("#em-c1").value, 10);
        const c2 = parseInt(controls.querySelector("#em-c2").value, 10);
        const V = parseInt(controls.querySelector("#em-v").value, 10);
        const K = parseInt(controls.querySelector("#em-k").value, 10);
        controls.querySelector("#em-c1-val").textContent = String(c1);
        controls.querySelector("#em-c2-val").textContent = String(c2);
        controls.querySelector("#em-v-val").textContent = String(V);
        controls.querySelector("#em-k-val").textContent = String(K);
        const cS = (c1 * c2) / (c1 + c2);
        const cP = c1 + c2;
        const cDielec = cS * K;
        const vDielec = V / K;
        const uS = 0.5 * cS * V * V;
        stage.innerHTML = `
          <div class="ml-rules-grid">
            <div class="ml-micro-card" style="border-left:3px solid var(--ml-viz-blue, #35628c);">
              <div class="ml-micro-label">Series (1/C_S = 1/${c1} + 1/${c2})</div>
              <p style="font-size:19px; font-weight:800;">C_S = ${cS.toFixed(2).replace(/\.00$/, "")} μF</p>
              <p class="ml-viz-sub">Same Q = ${(cS * V).toFixed(1).replace(/\.0$/, "")} μC • U = ${uS.toFixed(0)} μJ (smaller than ${Math.min(c1, c2)} μF!)</p>
            </div>
            <div class="ml-micro-card" style="border-left:3px solid var(--ml-viz-green, #2d6a4f);">
              <div class="ml-micro-label">Parallel (C_P = ${c1} + ${c2})</div>
              <p style="font-size:19px; font-weight:800;">C_P = ${cP} μF</p>
              <p class="ml-viz-sub">Same V = ${V} V • Opposite of Resistor rules!</p>
            </div>
          </div>
          <div class="ml-viz-note" style="margin-top:10px;">
            With Dielectric <strong>K = ${K}</strong> on isolated C_S: Capacitance jumps to <strong>${cDielec.toFixed(2).replace(/\.00$/, "")} μF</strong> (×${K}) while Voltage drops to <strong>${vDielec.toFixed(1).replace(/\.0$/, "")} V</strong> (÷${K})!
          </div>
        `;
      } else if (tab === "coulomb") {
        const q1 = parseInt(controls.querySelector("#em-q1").value, 10);
        const q2 = parseInt(controls.querySelector("#em-q2").value, 10);
        const rCm = parseInt(controls.querySelector("#em-r").value, 10);
        controls.querySelector("#em-q1-val").textContent = String(q1);
        controls.querySelector("#em-q2-val").textContent = String(q2);
        controls.querySelector("#em-r-val").textContent = String(rCm);
        const rM = rCm / 100;
        const F = (9e9 * q1 * 1e-6 * q2 * 1e-6) / (rM * rM);
        const V1 = (9e9 * q1 * 1e-6) / rM;
        const px2 = 85 + rCm * 24;
        stage.innerHTML = `
          <svg viewBox="0 0 360 95" class="ml-svg-box" style="max-height:110px;">
            <line x1="65" y1="48" x2="${px2}" y2="48" stroke="var(--ml-viz-blue, #35628c)" stroke-width="2.5" stroke-dasharray="5,4" />
            <circle cx="65" cy="48" r="18" fill="var(--ml-viz-amber, #b36a22)" />
            <text x="65" y="52" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">+${q1}μC</text>
            <circle cx="${px2}" cy="48" r="18" fill="var(--ml-viz-green, #2d6a4f)" />
            <text x="${px2}" y="52" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">+${q2}μC</text>
            <text x="${((65 + px2) / 2).toFixed(0)}" y="34" text-anchor="middle" fill="currentColor" font-size="11" font-weight="700">r = ${rCm} cm</text>
          </svg>
          <div class="ml-rules-grid">
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-amber, #b36a22);"><span>Coulomb Force (1/r²)</span><strong>${F.toFixed(1)} N</strong></div>
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-blue, #35628c);"><span>Potential V from q₁ (1/r)</span><strong>${(V1 / 1e6).toFixed(2)} MV</strong></div>
          </div>
          <div class="ml-viz-note">Slide r from 3 cm → 6 cm: Force drops to <strong>1/4</strong> (1/r²), while Voltage only drops to <strong>1/2</strong> (1/r)!</div>
        `;
      } else {
        const v = parseInt(controls.querySelector("#em-spd").value, 10);
        const B = parseInt(controls.querySelector("#em-b").value, 10);
        controls.querySelector("#em-spd-val").textContent = String(v);
        controls.querySelector("#em-b-val").textContent = String(B);
        const R = Math.min(78, Math.max(18, (v / B) * 18));
        const cx = 180, cy = 92;
        stage.innerHTML = `
          <svg viewBox="0 0 360 184" class="ml-svg-box" style="max-height:190px;">
            <text x="18" y="22" fill="currentColor" fill-opacity="0.55" font-size="11" font-weight="700">× × × Uniform B = ${B} T (into page) × × ×</text>
            <circle cx="${cx}" cy="${cy}" r="${R.toFixed(1)}" fill="none" stroke="var(--ml-viz-blue, #35628c)" stroke-width="3" stroke-dasharray="6,4" />
            <circle cx="${cx}" cy="${(cy + R).toFixed(1)}" r="7" fill="var(--ml-viz-amber, #b36a22)" />
            <line x1="${cx}" y1="${(cy + R).toFixed(1)}" x2="${cx + 34}" y2="${(cy + R).toFixed(1)}" stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="3" />
            <line x1="${cx}" y1="${(cy + R).toFixed(1)}" x2="${cx}" y2="${(cy + R - 26).toFixed(1)}" stroke="var(--ml-viz-rose, #9e4765)" stroke-width="3" />
            <text x="${cx + 42}" y="${(cy + R + 4).toFixed(1)}" fill="var(--ml-viz-green, #2d6a4f)" font-size="11" font-weight="800">v →</text>
            <text x="${cx + 6}" y="${(cy + R - 18).toFixed(1)}" fill="var(--ml-viz-rose, #9e4765)" font-size="11" font-weight="800">F_B ↑ (⊥ v)</text>
          </svg>
          <div class="ml-viz-note">
            Radius <strong>R = mv/(qB) ∝ ${(v / B).toFixed(2)}</strong>. Notice F_B stays 90° to v → <strong>ZERO Work</strong> done, and Cyclotron Period τ = 2πm/(qB) does NOT depend on v!
          </div>
        `;
      }
    }

    header.querySelectorAll("[data-em-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-em-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.emTab;
        renderControls();
      });
    });
    renderControls();
  }

  // 12. CHEM2 Thermo & Colligative Lab: Gibbs ΔG = ΔH − TΔS & Boiling/Freezing Window
  function renderThermoPhaseLab(container) {
    let tab = "gibbs";
    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">CHEM2 Thermo Lab: Gibbs Spontaneity & Colligative Window</div>
        <div class="ml-viz-sub">Test ΔG = ΔH − TΔS across all 4 sign combos, or see ions widen water's liquid range!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-th-tab="gibbs">🔥 Gibbs ΔG = ΔH − TΔS</button>
        <button type="button" class="ml-pill" data-th-tab="collig">🧂 Colligative (i · m)</button>
      </div>
    `);
    const controls = el("div", { className: "ml-viz-controls" });
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function renderControls() {
      if (tab === "gibbs") {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>ΔH (kJ): <strong id="th-dh-val">+40</strong></span>
            <input type="range" id="th-dh" min="-80" max="80" step="10" value="40" />
          </label>
          <label class="ml-slider-label">
            <span>ΔS (J/K): <strong id="th-ds-val">+100</strong></span>
            <input type="range" id="th-ds" min="-200" max="200" step="25" value="100" />
          </label>
          <label class="ml-slider-label" style="grid-column:1/-1;">
            <span>Temperature T (K): <strong id="th-t-val">500</strong> K</span>
            <input type="range" id="th-t" min="100" max="900" step="50" value="500" />
          </label>
        `;
      } else {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>van 't Hoff i (1=Sugar, 2=NaCl, 3=CaCl₂): <strong id="th-i-val">2</strong></span>
            <input type="range" id="th-i" min="1" max="4" step="1" value="2" />
          </label>
          <label class="ml-slider-label">
            <span>Molality m (mol/kg): <strong id="th-m-val">2</strong></span>
            <input type="range" id="th-m" min="0" max="4" step="0.5" value="2" />
          </label>
        `;
      }
      controls.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", update));
      update();
    }

    function update() {
      if (tab === "gibbs") {
        const dh = parseInt(controls.querySelector("#th-dh").value, 10);
        const dsJ = parseInt(controls.querySelector("#th-ds").value, 10);
        const T = parseInt(controls.querySelector("#th-t").value, 10);
        controls.querySelector("#th-dh-val").textContent = (dh >= 0 ? "+" : "") + dh;
        controls.querySelector("#th-ds-val").textContent = (dsJ >= 0 ? "+" : "") + dsJ;
        controls.querySelector("#th-t-val").textContent = String(T);
        const dsKJ = dsJ / 1000;
        const dg = dh - T * dsKJ;
        const verdict = dg < 0 ? "SPONTANEOUS (ΔG < 0)" : dg === 0 ? "EQUILIBRIUM (ΔG = 0)" : "NON-SPONTANEOUS (ΔG > 0)";
        const cls = dg < 0 ? "ml-highlight-green" : dg === 0 ? "ml-highlight-blue" : "ml-highlight-purple";
        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span>ΔG = ${dh} − (${T})(${dsKJ.toFixed(3)}) =</span>
            <strong class="${cls}">${dg.toFixed(1)} kJ</strong>
          </div>
          <div class="ml-readout-pill" style="margin-top:10px; border-color:${dg < 0 ? "var(--ml-viz-green, #2d6a4f)" : "var(--ml-viz-rose, #9e4765)"};">
            <span>Verdict at ${T} K (${T - 273}°C)</span>
            <strong>${verdict}</strong>
          </div>
          <div class="ml-viz-note">Notice we converted ΔS from <strong>${dsJ} J/K → ${dsKJ.toFixed(3)} kJ/K</strong> (÷ 1,000) before multiplying by T!</div>
        `;
      } else {
        const i = parseInt(controls.querySelector("#th-i").value, 10);
        const m = parseFloat(controls.querySelector("#th-m").value);
        controls.querySelector("#th-i-val").textContent = String(i);
        controls.querySelector("#th-m-val").textContent = String(m);
        const names = { 1: "Glucose (i=1)", 2: "NaCl (i=2)", 3: "CaCl₂ (i=3)", 4: "AlCl₃ (i=4)" };
        const dtf = i * 1.86 * m;
        const dtb = i * 0.512 * m;
        const newFp = -dtf;
        const newBp = 100 + dtb;
        stage.innerHTML = `
          <div class="ml-equation-hero">
            <span>${names[i]} • ${m} m</span>
            <span class="ml-arrow">→</span>
            <span class="ml-highlight-blue">Liquid Range: <strong>${newFp.toFixed(2)}°C to ${newBp.toFixed(2)}°C</strong></span>
          </div>
          <div class="ml-rules-grid" style="margin-top:10px;">
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-blue, #35628c);"><span>New Freezing Pt (0 − iK_f m)</span><strong>${newFp.toFixed(2)} °C</strong></div>
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-amber, #b36a22);"><span>New Boiling Pt (100 + iK_b m)</span><strong>${newBp.toFixed(2)} °C</strong></div>
          </div>
          <div class="ml-viz-note">Total dissolved particle molality = i × m = <strong>${(i * m).toFixed(1)} m</strong>. More particles stretch the liquid phase at BOTH ends!</div>
        `;
      }
    }

    header.querySelectorAll("[data-th-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-th-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.thTab;
        renderControls();
      });
    });
    renderControls();
  }

  // 13. Geometry Vectors & Propositional Logic Truth Lab
  function renderGeometryLogicLab(container) {
    let tab = "vectors";
    let pVal = true;
    let qVal = false;
    container.innerHTML = "";
    const wrap = el("div", { className: "ml-viz-card" });
    const header = el("div", { className: "ml-viz-header" }, `
      <div>
        <div class="ml-viz-title">Vectors, Triangles & Deductive Logic Lab</div>
        <div class="ml-viz-sub">Explore Dot vs Cross products (cos θ vs sin θ) or test p → q vs Contrapositive (¬q → ¬p)!</div>
      </div>
      <div class="ml-viz-tabs">
        <button type="button" class="ml-pill active" data-gl-tab="vectors">📐 Vectors (Dot/Cross)</button>
        <button type="button" class="ml-pill" data-gl-tab="logic">🧠 Logic Truth Table</button>
      </div>
    `);
    const controls = el("div", { className: "ml-viz-controls" });
    const stage = el("div", { className: "ml-viz-stage" });
    wrap.appendChild(header);
    wrap.appendChild(controls);
    wrap.appendChild(stage);
    container.appendChild(wrap);

    function renderControls() {
      if (tab === "vectors") {
        controls.innerHTML = `
          <label class="ml-slider-label">
            <span>Angle θ between A & B: <strong id="gl-deg-val">60°</strong></span>
            <input type="range" id="gl-deg" min="0" max="180" step="15" value="60" />
          </label>
          <label class="ml-slider-label">
            <span>|A| = 5, |B| = <strong id="gl-b-val">4</strong></span>
            <input type="range" id="gl-b" min="1" max="8" step="1" value="4" />
          </label>
        `;
        controls.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", update));
      } else {
        controls.innerHTML = `
          <div class="ml-slider-label">
            <span>Premise p ("It rains")</span>
            <button type="button" class="ml-pill ${pVal ? "active" : ""}" id="gl-tog-p">${pVal ? "TRUE" : "FALSE"}</button>
          </div>
          <div class="ml-slider-label">
            <span>Conclusion q ("Ground wet")</span>
            <button type="button" class="ml-pill ${qVal ? "active" : ""}" id="gl-tog-q">${qVal ? "TRUE" : "FALSE"}</button>
          </div>
        `;
        document.getElementById("gl-tog-p").addEventListener("click", () => { pVal = !pVal; renderControls(); });
        document.getElementById("gl-tog-q").addEventListener("click", () => { qVal = !qVal; renderControls(); });
      }
      update();
    }

    function update() {
      if (tab === "vectors") {
        const deg = parseInt(controls.querySelector("#gl-deg").value, 10);
        const B = parseInt(controls.querySelector("#gl-b").value, 10);
        const A = 5;
        controls.querySelector("#gl-deg-val").textContent = `${deg}°`;
        controls.querySelector("#gl-b-val").textContent = String(B);
        const rad = (deg * Math.PI) / 180;
        const dot = A * B * Math.cos(rad);
        const cross = A * B * Math.sin(rad);
        const ox = 160, oy = 110;
        const bx = ox + Math.cos(rad) * 76;
        const by = oy - Math.sin(rad) * 76;
        stage.innerHTML = `
          <svg viewBox="0 0 320 135" class="ml-svg-box" style="max-height:145px;">
            <line x1="${ox}" y1="${oy}" x2="${ox + 90}" y2="${oy}" stroke="var(--ml-viz-blue, #35628c)" stroke-width="4" stroke-linecap="round" />
            <line x1="${ox}" y1="${oy}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="var(--ml-viz-amber, #b36a22)" stroke-width="4" stroke-linecap="round" />
            <circle cx="${ox}" cy="${oy}" r="4.5" fill="currentColor" />
            <text x="${ox + 96}" y="${oy + 4}" fill="var(--ml-viz-blue, #35628c)" font-size="12" font-weight="800">A (${A})</text>
            <text x="${(bx + 6).toFixed(0)}" y="${(by - 4).toFixed(0)}" fill="var(--ml-viz-amber, #b36a22)" font-size="12" font-weight="800">B (${B})</text>
          </svg>
          <div class="ml-rules-grid">
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-blue, #35628c);"><span>Dot A·B = AB cos θ</span><strong>${dot.toFixed(2)}</strong></div>
            <div class="ml-readout-pill" style="border-color:var(--ml-viz-green, #2d6a4f);"><span>Cross |A×B| = AB sin θ</span><strong>${cross.toFixed(2)}</strong></div>
          </div>
          <div class="ml-viz-note">Notice at <strong>90°</strong>: Dot = 0 while Cross hits MAX! At <strong>0° / 180°</strong>: Cross = 0 (zero magnetic force v ∥ B)!</div>
        `;
      } else {
        const imp = (!pVal) || qVal;
        const contra = qVal || (!pVal);
        const conv = (!qVal) || pVal;
        stage.innerHTML = `
          <div class="ml-rules-grid">
            <div class="ml-readout-pill" style="border-color:${imp ? "var(--ml-viz-green, #2d6a4f)" : "var(--ml-viz-rose, #9e4765)"};">
              <span>Original (p → q)</span>
              <strong>${imp ? "TRUE" : "FALSE (Broken Promise!)"}</strong>
            </div>
            <div class="ml-readout-pill" style="border-color:${contra ? "var(--ml-viz-green, #2d6a4f)" : "var(--ml-viz-rose, #9e4765)"};">
              <span>Contrapositive (¬q → ¬p)</span>
              <strong>${contra ? "TRUE (Matches!)" : "FALSE (Matches!)"}</strong>
            </div>
            <div class="ml-readout-pill" style="border-color:${conv === imp ? "var(--ml-viz-blue, #35628c)" : "var(--ml-viz-amber, #b36a22)"};">
              <span>Converse Trap (q → p)</span>
              <strong>${conv ? "TRUE" : "FALSE"} ${conv !== imp ? "⚠ Differs!" : ""}</strong>
            </div>
          </div>
          <div class="ml-viz-note">Toggle p & q: <strong>p → q</strong> and <strong>¬q → ¬p</strong> ALWAYS agree, while the Converse (q → p) disagrees when p = False, q = True!</div>
        `;
      }
    }

    header.querySelectorAll("[data-gl-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        header.querySelectorAll("[data-gl-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab = btn.dataset.glTab;
        renderControls();
      });
    });
    renderControls();
  }

  const registry = {
    numberLineMake10: renderNumberLineMake10,
    rectangleMultiplier: renderRectangleMultiplier,
    fractionPizzaLab: renderFractionPizzaLab,
    algebraBalanceScale: renderAlgebraBalanceScale,
    unitCircleAndGraphLab: renderUnitCircleAndGraphLab,
    calculusSurferLab: renderCalculusSurferLab,
    numberPatternSieve: renderNumberPatternSieve,
    physicsCircuitAndMotionLab: renderPhysicsCircuitAndMotionLab,
    chemistryAtomPhLab: renderChemistryAtomPhLab,
    biologyDnaPunnettLab: renderBiologyDnaPunnettLab,
    electroMagLab: renderElectroMagLab,
    thermoPhaseLab: renderThermoPhaseLab,
    geometryLogicLab: renderGeometryLogicLab
  };

  function mountVisualizer(visualizerId, container) {
    if (!container) return;
    const fn = registry[visualizerId] || renderNumberLineMake10;
    fn(container);
  }

  root.MATHLINGO_VISUALIZERS = {
    mountVisualizer,
    registry,
    list: [
      { id: "numberLineMake10", title: "1. Make-10 & Distance Subtraction", icon: "➕", category: "math" },
      { id: "numberPatternSieve", title: "2. 2·4·6·8, Odd/Even, Primes & Squares", icon: "🔢", category: "math" },
      { id: "rectangleMultiplier", title: "3. Chocolate-Bar Area Multiplier", icon: "✖️", category: "math" },
      { id: "fractionPizzaLab", title: "4. Fraction Bars & Magic % Swap", icon: "🍕", category: "math" },
      { id: "algebraBalanceScale", title: "5. Algebra Balance Scale", icon: "⚖️", category: "math" },
      { id: "unitCircleAndGraphLab", title: "6. Unit Circle & Parabola Shifter", icon: "🎡", category: "math" },
      { id: "calculusSurferLab", title: "7. Calculus Speedometer & Integral Area", icon: "🏎️", category: "math" },
      { id: "physicsCircuitAndMotionLab", title: "8. Physics Ohm's Circuit & F = ma", icon: "⚛️", category: "physics" },
      { id: "chemistryAtomPhLab", title: "9. Chemistry Bohr Atom & pH Log Scale", icon: "🧪", category: "stem" },
      { id: "biologyDnaPunnettLab", title: "10. Biology DNA → mRNA & Punnett FOIL", icon: "🧬", category: "stem" },
      { id: "electroMagLab", title: "11. PHYS2 Capacitors, Coulomb & Cyclotron", icon: "🧲", category: "physics" },
      { id: "thermoPhaseLab", title: "12. CHEM2 Gibbs ΔG & Colligative Window", icon: "🔥", category: "stem" },
      { id: "geometryLogicLab", title: "13. Vectors (Dot/Cross) & Logic Truth Lab", icon: "📐", category: "math" }
    ]
  };
})(typeof window !== "undefined" ? window : globalThis);
