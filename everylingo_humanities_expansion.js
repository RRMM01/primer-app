// EveryLingo Humanities & Visual Reasoning Expansion
// Adds World 13: Philippine History & Civics (8 nodes),
// World 14: Filipino: Wika, Gramatika at Pagbasa (6 nodes),
// World 15: Abstract Shapes & Spatial Reasoning (6 nodes) with live SVG figures.
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

  // ==================== INLINE SVG HELPERS FOR ABSTRACT SHAPES ====================
  function svgRotationStrip(startDeg, stepDeg, stepsCount) {
    const boxes = [];
    for (let i = 0; i < stepsCount; i++) {
      const x = 14 + i * 76;
      const deg = (startDeg + i * stepDeg + 720) % 360;
      boxes.push(`
        <g transform="translate(${x}, 12)">
          <rect width="62" height="62" rx="10" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="2" />
          <g transform="translate(31,31) rotate(${deg})">
            <path d="M-12,-14 L12,-14 L12,-4 L-2,-4 L-2,14 L-12,14 Z" fill="var(--ml-viz-blue, #2c5282)" />
            <circle cx="9" cy="10" r="4.5" fill="var(--ml-viz-amber, #a96718)" />
          </g>
        </g>
      `);
    }
    const qx = 14 + stepsCount * 76;
    boxes.push(`
      <g transform="translate(${qx}, 12)">
        <rect width="62" height="62" rx="10" fill="var(--ml-primary-soft, rgba(45,106,79,0.1))" stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="2" stroke-dasharray="5,3" />
        <text x="31" y="39" text-anchor="middle" fill="var(--ml-viz-green, #2d6a4f)" font-size="24" font-weight="800">?</text>
      </g>
    `);
    const w = qx + 76;
    return `<svg viewBox="0 0 ${w} 86" class="ml-svg-box" style="max-height:110px;" aria-label="Shape rotation sequence">${boxes.join("")}</svg>`;
  }

  function svgPolySequence(sidesList) {
    const boxes = sidesList.map((n, idx) => {
      const x = 14 + idx * 74;
      const pts = [];
      for (let k = 0; k < n; k++) {
        const ang = -Math.PI / 2 + (k * 2 * Math.PI) / n;
        pts.push(`${(30 + Math.cos(ang) * 18).toFixed(1)},${(30 + Math.sin(ang) * 18).toFixed(1)}`);
      }
      const filled = idx % 2 === 0;
      return `
        <g transform="translate(${x}, 12)">
          <rect width="60" height="60" rx="10" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="2" />
          <polygon points="${pts.join(" ")}" fill="${filled ? "var(--ml-viz-green, #2d6a4f)" : "none"}" fill-opacity="0.22" stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="2.5" />
          <text x="30" y="55" text-anchor="middle" fill="var(--ml-ink-muted, #5c564b)" font-size="10" font-weight="700">${n} sides</text>
        </g>
      `;
    });
    const qx = 14 + sidesList.length * 74;
    boxes.push(`
      <g transform="translate(${qx}, 12)">
        <rect width="60" height="60" rx="10" fill="var(--ml-amber-soft, rgba(169,103,24,0.12))" stroke="var(--ml-viz-amber, #a96718)" stroke-width="2" stroke-dasharray="5,3" />
        <text x="30" y="38" text-anchor="middle" fill="var(--ml-viz-amber, #a96718)" font-size="22" font-weight="800">?</text>
      </g>
    `);
    return `<svg viewBox="0 0 ${qx + 74} 84" class="ml-svg-box" style="max-height:110px;" aria-label="Polygon progression sequence">${boxes.join("")}</svg>`;
  }

  function svgCubeCrossNet(labels) {
    // Standard cross net: top(0) at (1,0), left(1) at (0,1), center(2) at (1,1), right(3) at (2,1), bottom(4) at (1,2), far-bottom(5) at (1,3)
    const coords = [
      [1, 0, labels[0]],
      [0, 1, labels[1]],
      [1, 1, labels[2]],
      [2, 1, labels[3]],
      [1, 2, labels[4]],
      [1, 3, labels[5]]
    ];
    const cells = coords.map(([cx, cy, lbl]) => {
      const x = 95 + cx * 42;
      const y = 8 + cy * 34;
      return `
        <rect x="${x}" y="${y}" width="38" height="30" rx="6" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="2" />
        <text x="${x + 19}" y="${y + 20}" text-anchor="middle" fill="currentColor" font-size="14" font-weight="800">${lbl}</text>
      `;
    }).join("");
    return `<svg viewBox="0 0 320 152" class="ml-svg-box" style="max-height:150px;" aria-label="Unfolded 3D cube net">${cells}</svg>`;
  }

  function svgXorMatrixPreview() {
    // Visualizes Row 1: [Horizontal + Vertical = Cross], Row 2: [Square + Diag = Both], Row 3: [Cross + Horizontal = ? (Vertical!)]
    return `<svg viewBox="0 0 330 92" class="ml-svg-box" style="max-height:105px;" aria-label="XOR shape merge preview">
      <g transform="translate(18,12)">
        <rect width="62" height="62" rx="9" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="2" />
        <line x1="12" y1="31" x2="50" y2="31" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="4" stroke-linecap="round" />
        <line x1="31" y1="12" x2="31" y2="50" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="4" stroke-linecap="round" />
      </g>
      <text x="98" y="49" text-anchor="middle" fill="currentColor" font-size="18" font-weight="800">⊕</text>
      <g transform="translate(116,12)">
        <rect width="62" height="62" rx="9" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="2" />
        <line x1="12" y1="31" x2="50" y2="31" stroke="var(--ml-viz-amber, #a96718)" stroke-width="4" stroke-linecap="round" />
      </g>
      <text x="198" y="49" text-anchor="middle" fill="currentColor" font-size="18" font-weight="800">=</text>
      <g transform="translate(220,12)">
        <rect width="62" height="62" rx="9" fill="var(--ml-primary-soft, rgba(45,106,79,0.12))" stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="2" stroke-dasharray="5,3" />
        <text x="31" y="39" text-anchor="middle" fill="var(--ml-viz-green, #2d6a4f)" font-size="24" font-weight="800">?</text>
      </g>
    </svg>`;
  }

  // Crisp 64x64 clickable SVG Option Tiles for real visual Abstract Reasoning!
  function svgLTile(deg, mirror) {
    const tf = mirror ? `translate(32,32) scale(-1,1) rotate(${deg})` : `translate(32,32) rotate(${deg})`;
    return `<svg viewBox="0 0 64 64" class="ml-opt-svg" aria-hidden="true">
      <rect x="3" y="3" width="58" height="58" rx="9" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="1.8" />
      <g transform="${tf}">
        <path d="M-12,-14 L12,-14 L12,-4 L-2,-4 L-2,14 L-12,14 Z" fill="var(--ml-viz-blue, #2c5282)" />
        <circle cx="9" cy="10" r="4.5" fill="var(--ml-viz-amber, #a96718)" />
      </g>
    </svg>`;
  }

  function svgPolyTile(sides, filled) {
    const pts = [];
    for (let k = 0; k < sides; k++) {
      const ang = -Math.PI / 2 + (k * 2 * Math.PI) / sides;
      pts.push(`${(32 + Math.cos(ang) * 20).toFixed(1)},${(32 + Math.sin(ang) * 20).toFixed(1)}`);
    }
    return `<svg viewBox="0 0 64 64" class="ml-opt-svg" aria-hidden="true">
      <rect x="3" y="3" width="58" height="58" rx="9" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="1.8" />
      <polygon points="${pts.join(" ")}" fill="${filled ? "var(--ml-viz-green, #2d6a4f)" : "none"}" fill-opacity="0.26" stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="2.6" />
    </svg>`;
  }

  function svgXorTile(kind) {
    const shapes = {
      vert: `<line x1="32" y1="12" x2="32" y2="52" stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="4.5" stroke-linecap="round" />`,
      horiz: `<line x1="12" y1="32" x2="52" y2="32" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="4.5" stroke-linecap="round" />`,
      cross: `<line x1="12" y1="32" x2="52" y2="32" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="4.5" stroke-linecap="round" /><line x1="32" y1="12" x2="32" y2="52" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="4.5" stroke-linecap="round" />`,
      empty: `<text x="32" y="37" text-anchor="middle" fill="var(--ml-ink-muted, #5c564b)" font-size="11" font-weight="700">EMPTY</text>`,
      circle: `<circle cx="32" cy="32" r="18" fill="none" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="3.2" />`,
      dot: `<circle cx="32" cy="32" r="6" fill="var(--ml-viz-amber, #a96718)" />`,
      both: `<circle cx="32" cy="32" r="18" fill="none" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="3.2" /><circle cx="32" cy="32" r="5.5" fill="var(--ml-viz-amber, #a96718)" />`,
      topLeft: `<line x1="14" y1="16" x2="50" y2="16" stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="4" stroke-linecap="round" /><line x1="16" y1="14" x2="16" y2="50" stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="4" stroke-linecap="round" />`,
      bottom: `<line x1="14" y1="48" x2="50" y2="48" stroke="var(--ml-viz-amber, #a96718)" stroke-width="4" stroke-linecap="round" />`,
      threeLines: `<line x1="14" y1="16" x2="50" y2="16" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="3.5" /><line x1="16" y1="14" x2="16" y2="50" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="3.5" /><line x1="14" y1="48" x2="50" y2="48" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="3.5" />`
    };
    return `<svg viewBox="0 0 64 64" class="ml-opt-svg" aria-hidden="true">
      <rect x="3" y="3" width="58" height="58" rx="9" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="1.8" />
      ${shapes[kind] || ""}
    </svg>`;
  }

  function svgShapeMini(shape, fillMode, size) {
    const r = size === "sm" ? 10 : 20;
    const fill = fillMode === "solid" ? "var(--ml-ink, #1e1c19)" : fillMode === "striped" ? "var(--ml-amber-soft, rgba(169,103,24,0.35))" : "var(--ml-surface, #fcfaf5)";
    const stroke = "var(--ml-ink, #1e1c19)";
    if (shape === "circle") return `<circle cx="32" cy="32" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2.4" />`;
    if (shape === "square") return `<rect x="${32 - r}" y="${32 - r}" width="${r * 2}" height="${r * 2}" fill="${fill}" stroke="${stroke}" stroke-width="2.4" />`;
    const sides = shape === "tri" ? 3 : shape === "pent" ? 5 : 6;
    const pts = [];
    for (let k = 0; k < sides; k++) {
      const a = -Math.PI / 2 + (k * 2 * Math.PI) / sides;
      pts.push(`${(32 + Math.cos(a) * r).toFixed(1)},${(32 + Math.sin(a) * r).toFixed(1)}`);
    }
    return `<polygon points="${pts.join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="2.4" />`;
  }

  function svgNestedTile(outerShape, outerFill, innerShape, innerFill) {
    return `<svg viewBox="0 0 64 64" class="ml-opt-svg" aria-hidden="true">
      <rect x="3" y="3" width="58" height="58" rx="9" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="1.8" />
      ${svgShapeMini(outerShape, outerFill, "lg")}
      ${innerShape ? svgShapeMini(innerShape, innerFill, "sm") : ""}
    </svg>`;
  }

  function svgPaperFoldTile(holeCoords) {
    const dots = holeCoords.map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="5" fill="var(--ml-viz-rose, #b83b3b)" />`).join("");
    return `<svg viewBox="0 0 64 64" class="ml-opt-svg" aria-hidden="true">
      <rect x="5" y="5" width="54" height="54" rx="6" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="2" />
      <line x1="32" y1="5" x2="32" y2="59" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="1.2" stroke-dasharray="3,3" />
      <line x1="5" y1="32" x2="59" y2="32" stroke="var(--ml-border-strong, #c4b9a4)" stroke-width="1.2" stroke-dasharray="3,3" />
      ${dots}
    </svg>`;
  }

  function svgPaperFoldPrompt(folds) {
    return `<svg viewBox="0 0 280 86" class="ml-svg-box" style="max-height:105px;" aria-label="Paper fold and punch diagram">
      <g transform="translate(14,10)">
        <rect width="62" height="62" rx="6" fill="var(--ml-surface, #fcfaf5)" stroke="var(--ml-viz-blue, #2c5282)" stroke-width="2" />
        <line x1="31" y1="0" x2="31" y2="62" stroke="var(--ml-viz-amber, #a96718)" stroke-width="2" stroke-dasharray="4,3" />
        ${folds >= 2 ? `<line x1="0" y1="31" x2="62" y2="31" stroke="var(--ml-viz-amber, #a96718)" stroke-width="2" stroke-dasharray="4,3" />` : ""}
        <text x="31" y="75" text-anchor="middle" fill="var(--ml-ink-muted, #5c564b)" font-size="9.5" font-weight="700">1. Fold (${folds}×)</text>
      </g>
      <text x="95" y="46" text-anchor="middle" fill="currentColor" font-size="16" font-weight="800">→</text>
      <g transform="translate(114,18)">
        <rect width="46" height="46" rx="5" fill="var(--ml-primary-soft, rgba(45,106,79,0.12))" stroke="var(--ml-viz-green, #2d6a4f)" stroke-width="2" />
        <circle cx="${folds === 1 ? 30 : 23}" cy="${folds === 1 ? 14 : 23}" r="5" fill="var(--ml-viz-rose, #b83b3b)" />
        <text x="23" y="64" text-anchor="middle" fill="var(--ml-ink-muted, #5c564b)" font-size="9.5" font-weight="700">2. Punch</text>
      </g>
      <text x="178" y="46" text-anchor="middle" fill="currentColor" font-size="16" font-weight="800">→</text>
      <g transform="translate(198,10)">
        <rect width="62" height="62" rx="6" fill="var(--ml-amber-soft, rgba(169,103,24,0.12))" stroke="var(--ml-viz-amber, #a96718)" stroke-width="2" stroke-dasharray="4,3" />
        <text x="31" y="38" text-anchor="middle" fill="var(--ml-viz-amber, #a96718)" font-size="22" font-weight="800">?</text>
        <text x="31" y="75" text-anchor="middle" fill="var(--ml-ink-muted, #5c564b)" font-size="9.5" font-weight="700">3. Unfold!</text>
      </g>
    </svg>`;
  }

  // ==================== 3 NEW WORLDS (WORLDS 13–15) ====================
  DATA.WORLDS.push(
    {
      id: "ph_history",
      subject: "ph_history",
      order: 13,
      icon: "🇵🇭",
      title: "Philippine History, Civics & World Landmarks",
      subtitle: "Pre-colonial barangays, Rizal & Katipunan, Commonwealth & WWII, EDSA, 1987 Constitution, Bill of Rights & ASEAN.",
      color: "#8c3b2b",
      colorDark: "#63281d",
      bgSoft: "rgba(140, 59, 43, 0.11)",
      borderSoft: "rgba(140, 59, 43, 0.30)"
    },
    {
      id: "filipino",
      subject: "filipino",
      order: 14,
      icon: "📜",
      title: "Filipino: Wika, Gramatika at Pagbasa",
      subtitle: "Diin (Malumay–Maragsa), Pokus ng Pandiwa, Ng vs Nang, Din/Rin traps, Tayutay, Sawikain & Panitikang Pilipino.",
      color: "#3d4e7a",
      colorDark: "#293556",
      bgSoft: "rgba(61, 78, 122, 0.11)",
      borderSoft: "rgba(61, 78, 122, 0.30)"
    },
    {
      id: "abstract_shapes",
      subject: "abstract_shapes",
      order: 15,
      icon: "🔷",
      title: "Abstract Shapes & Spatial Reasoning",
      subtitle: "Rotations & mirror flips, visual series, 3×3 Raven matrices (XOR), analogies, 3D cube nets & paper folding.",
      color: "#2d6473",
      colorDark: "#1d4550",
      bgSoft: "rgba(45, 100, 115, 0.11)",
      borderSoft: "rgba(45, 100, 115, 0.30)"
    }
  );

  // ==================== 20 NEW NODES (ORDER 109–128) ====================
  const HUMANITIES_NODES = [
    // ---------- WORLD 13: PHILIPPINE HISTORY & CIVICS (8 NODES) ----------
    {
      id: "ph-precolonial-spanish",
      worldId: "ph_history",
      order: 109,
      title: "Pre-Colonial Philippines & Spanish Colonial Era",
      icon: "⛵",
      tagline: "Barangays & Baybayin thrived long before 1521! Magellan (1521) → Legazpi (1565) → Galleon Trade → GOMBURZA (1872).",
      scaryVersion: "Pre-Hispanic Austronesian chiefdom historiography and Spanish mercantilist colonial administration.",
      easyTruth: "Before Spain arrived, Filipinos already traded with China and Southeast Asia, wrote in Baybayin, and governed themselves in boat-named communities called Barangays led by a Datu! Spain ruled for 333 years (1565–1898) through church + state, forced labor (Polo y Servicio), and the Manila–Acapulco Galleon Trade.",
      microSteps: [
        { label: "Step 1: Thriving Pre-Colonial Roots (900 CE – 1521)", text: "The Laguna Copperplate Inscription (900 CE) is the oldest known written document in the Philippines. Communities called Barangays (from balangay boats) were led by a Datu; social classes included Maharlika/Maginoo (nobles), Timawa (freemen), and Alipin (namamahay = own house; sagigilid = lived in master's house)." },
        { label: "Step 2: 1521 Contact vs 1565 Colonization", text: "Ferdinand Magellan reached Homonhon/Limasawa in 1521 and was defeated by Lapu-Lapu at the Battle of Mactan (April 27, 1521). Permanent Spanish colonization actually began 44 years later under Miguel López de Legazpi in Cebu (1565), establishing Manila as capital in 1571!" },
        { label: "Step 3: Colonial Systems & Awakening (1872)", text: "Key abuses sparked revolts: Encomienda (land/tribute grant), Polo y Servicio (40 days/year forced male labor; escape by paying Falla), Bandala (forced crop quotas), and Tobacco Monopoly. The 1872 Cavite Mutiny led to the garrote execution of priests Gómez, Burgos, and Zamora (GOMBURZA) — awakening Filipino nationalism!" }
      ],
      cheatCode: "900 CE Laguna Copperplate · 1521 Magellan/Mactan · 1565 Legazpi (colonization start!) · Polo = forced labor, Falla = exemption fee · 1872 GOMBURZA!",
      visualizerId: "phHistoryCivicsLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "What is the oldest known written historical document discovered in the Philippines (dated 900 CE)?", options: ["Laguna Copperplate Inscription", "Doctrina Christiana", "Code of Kalantiaw", "Kartilya ng Katipunan"], answer: "Laguna Copperplate Inscription", hint: "Found in Lumban, Laguna in 1987 — written in Kawi script recording a debt pardon!", whyEasy: "Dated 900 CE, the Laguna Copperplate proves literate, organized pre-colonial trade centuries before 1521!" },
        { type: "mc", prompt: "Who established the FIRST permanent Spanish settlement in the Philippines in Cebu (1565)?", options: ["Ferdinand Magellan", "Miguel López de Legazpi", "Ruy López de Villalobos", "Governor Basco"], answer: "Miguel López de Legazpi", hint: "Magellan arrived in 1521 and died at Mactan; colonization started 44 years later!", whyEasy: "Legazpi founded Cebu in 1565 and Manila in 1571, starting 333 years of Spanish rule!" },
        { type: "mc", prompt: "Under Spanish rule, what was 'Polo y Servicio'?", options: ["Forced unpaid labor for Filipino men (16–60 yrs old)", "Free university scholarship", "Right to vote for the Governor-General", "Annual harvest festival"], answer: "Forced unpaid labor for Filipino men (16–60 yrs old)", hint: "Polistas built ships, roads, and churches unless they paid the 'falla' exemption fee!", whyEasy: "Polo y Servicio forced men into 40 days of labor per year; paying 'falla' was the only exemption." },
        { type: "mc", prompt: "Which 1872 event directly inspired José Rizal to dedicate El Filibusterismo and ignited nationalist reform?", options: ["Execution of GOMBURZA (Gómez, Burgos, Zamora)", "Signing of the Treaty of Paris", "Battle of Tirad Pass", "Opening of Malolos Congress"], answer: "Execution of GOMBURZA (Gómez, Burgos, Zamora)", hint: "Three secular Filipino priests were executed by garrote in Bagumbayan after the Cavite Mutiny!", whyEasy: "GOMBURZA's martyrdom in 1872 exposed colonial injustice and united young Ilustrados!" },
        { type: "mc", prompt: "What pre-colonial maritime boat gave its name to the basic Philippine political unit ('Barangay')?", options: ["Balangay", "Galleon", "Vinta", "Caravel"], answer: "Balangay", hint: "Families sailed together in wooden Austronesian boats and settled as a kin-community!", whyEasy: "Balangay → Barangay! Each was ruled by a Datu advised by elders." }
      ]
    },
    {
      id: "ph-propaganda-katipunan-rev",
      worldId: "ph_history",
      order: 110,
      title: "Propaganda Movement, Rizal, Katipunan & 1898",
      icon: "🔥",
      tagline: "Propaganda asked for peaceful REFORM (La Solidaridad); Katipunan fought for INDEPENDENCE (KKK, 1896 → June 12, 1898)!",
      scaryVersion: "Late-19th-century Ilustrado reformism, revolutionary secret societies, and First Republic constitutionalism.",
      easyTruth: "Two waves won freedom: first, the pen (Propaganda Movement — Rizal, del Pilar, Jaena asking Spain for equal rights & representation); when Spain ignored reform and exiled Rizal, Andrés Bonifacio founded the Katipunan (KKK) to win full independence by revolution, culminating in June 12, 1898 and the 1899 Malolos Republic!",
      microSteps: [
        { label: "Step 1: The Propaganda Trio & Pen Names (Reform, NOT Yet Separation)", text: "La Solidaridad (1889, Spain) united Graciano López Jaena (1st editor), Marcelo H. del Pilar ('Plaridel', 2nd editor), and José Rizal ('Laong Laan' / 'Dimasalang', author of Noli Me Tangere & El Filibusterismo). Goal: make the Philippines a Spanish province with Cortez representation & equal rights." },
        { label: "Step 2: Katipunan (KKK) & 1896 Revolution", text: "On July 7, 1892 (right after Rizal was arrested for La Liga Filipina), Andrés Bonifacio founded Kataastaasan, Kagalanggalangang Katipunan ng mga Anak ng Bayan (KKK). Emilio Jacinto ('Brains of the Katipunan') wrote the Kartilya. In August 1896, Katipuneros tore their cedulas (Cry of Pugad Lawin / Balintawak)!" },
        { label: "Step 3: June 12, 1898 & Malolos Republic (1899)", text: "Rizal was executed at Bagumbayan on Dec 30, 1896. After the Tejeros Convention (1897) & Pact of Biak-na-Bato, Emilio Aguinaldo proclaimed Philippine Independence in Kawit, Cavite on June 12, 1898 (flag sewn by Marcela Agoncillo; Marcha Nacional by Julián Felipe; lyrics by José Palma). Jan 23, 1899: Malolos Republic — Asia's FIRST constitutional republic!" }
      ],
      cheatCode: "Propaganda = Peaceful Reform (La Solidaridad). KKK = Full Independence (Bonifacio + Jacinto Kartilya). June 12, 1898 Kawit; Jan 23, 1899 Malolos (1st Asian Republic)!",
      visualizerId: "phHistoryCivicsLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "What was the PRIMARY difference between the Propaganda Movement and the Katipunan (KKK)?", options: ["Propaganda sought peaceful reforms/assimilation; Katipunan fought for complete independence", "Propaganda used armed revolution; Katipunan wrote novels", "Both wanted American rule", "Katipunan was based in Madrid"], answer: "Propaganda sought peaceful reforms/assimilation; Katipunan fought for complete independence", hint: "Reform by pen vs Separation by revolution!", whyEasy: "Ilustrados asked Spain for equal rights first; when that failed, Bonifacio's KKK chose total independence!" },
        { type: "mc", prompt: "Who was known as the 'Brains of the Katipunan' and authored the Kartilya ng Katipunan?", options: ["Emilio Jacinto", "Apolinario Mabini", "Marcelo H. del Pilar", "Antonio Luna"], answer: "Emilio Jacinto", hint: "Do NOT mix him up with Apolinario Mabini ('Brains of the Revolution')!", whyEasy: "Classic exam pair: Emilio Jacinto = Brains of the KATIPUNAN; Apolinario Mabini = Brains of the REVOLUTION!" },
        { type: "mc", prompt: "Who was the 'Brains of the Revolution' and Prime Minister of the First Philippine Republic (Malolos)?", options: ["Apolinario Mabini", "Emilio Jacinto", "Graciano López Jaena", "Gregorio del Pilar"], answer: "Apolinario Mabini", hint: "Known as the 'Sublime Paralytic' who advised Aguinaldo!", whyEasy: "Apolinario Mabini drafted decrees and served as the Malolos Republic's first Prime Minister!" },
        { type: "mc", prompt: "Where and when was Philippine Independence proclaimed by Emilio Aguinaldo?", options: ["Kawit, Cavite — June 12, 1898", "Malolos, Bulacan — July 4, 1946", "Cebu City — April 27, 1521", "Manila — December 30, 1896"], answer: "Kawit, Cavite — June 12, 1898", hint: "The Philippine flag was unfurled from Aguinaldo's balcony in Cavite!", whyEasy: "June 12, 1898 in Kawit, Cavite — with the national anthem played for the first time!" },
        { type: "mc", prompt: "What was the historic distinction of the 1899 Malolos Republic?", options: ["First constitutional democratic republic in Asia", "First American state in the Pacific", "Longest monarchy in Southeast Asia", "First ASEAN summit host"], answer: "First constitutional democratic republic in Asia", hint: "Drafted by Felipe Calderón and inaugurated at Barasoain Church!", whyEasy: "Inaugurated Jan 23, 1899 at Barasoain Church, Malolos was Asia's first constitutional republic!" }
      ]
    },
    {
      id: "ph-american-japanese-ww2",
      worldId: "ph_history",
      order: 111,
      title: "American Era, Commonwealth, WWII & 1946",
      icon: "🏛️",
      tagline: "Treaty of Paris ($20M) → Phil-Am War → Thomasites & Jones/Tydings-McDuffie → Commonwealth (Quezon) → WWII → July 4, 1946!",
      scaryVersion: "Insular American colonial governance, Commonwealth transition statutes, and Pacific Theater occupation.",
      easyTruth: "Spain sold the Philippines to the U.S. for $20 million in the Treaty of Paris (Dec 10, 1898), sparking the Philippine-American War. Later, U.S. laws promised gradual self-rule: the 10-year Commonwealth (1935, Manuel L. Quezon) was interrupted by Japan's WWII invasion (Bataan, Corregidor, Leyte 1944) before formal independence on July 4, 1946!",
      microSteps: [
        { label: "Step 1: Treaty of Paris (1898) & Philippine-American War (1899–1902)", text: "Spain ceded the Philippines to the U.S. for $20 million without Filipino consent. War erupted at San Juan Bridge (Feb 4, 1899). Gen. Gregorio del Pilar's heroic stand at Tirad Pass (Dec 1899) bought time for Aguinaldo; U.S. civilian rule brought Thomasites (public school teachers aboard USS Thomas, 1901)." },
        { label: "Step 2: Road to Independence — Jones Law → Tydings-McDuffie → Commonwealth", text: "Jones Law (1916) created an all-Filipino legislature and promised eventual independence. Tydings-McDuffie Act (1934) set a concrete 10-year transition! Under the 1935 Constitution, Manuel L. Quezon became Commonwealth President (Sergio Osmeña, VP) and Filipino women won the right to vote in 1937!" },
        { label: "Step 3: WWII Japanese Occupation (1942–1945) & Third Republic (1946)", text: "After Pearl Harbor (Dec 1941), Manila was declared an Open City. Fall of Bataan (April 9, 1942 — Araw ng Kagitingan) led to the Bataan Death March; José P. Laurel led the wartime Second Republic. Gen. MacArthur & Filipino guerrillas liberated Leyte (Oct 20, 1944). July 4, 1946: Third Republic inaugurated under Manuel Roxas!" }
      ],
      cheatCode: "1898 Treaty of Paris ($20M) · 1901 Thomasites · 1934 Tydings-McDuffie (10-yr Commonwealth, Quezon) · April 9, 1942 Bataan · July 4, 1946 Third Republic (Roxas)!",
      visualizerId: "phHistoryCivicsLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Which 1934 U.S. law established the 10-year Philippine Commonwealth leading to independence?", options: ["Tydings-McDuffie Act", "Treaty of Paris", "Bell Trade Act", "Payne-Aldrich Act"], answer: "Tydings-McDuffie Act", hint: "Passed after Quezon rejected Hare-Hawes-Cutting; set the exact 10-year countdown!", whyEasy: "Tydings-McDuffie (1934) created the 1935 Constitution and Commonwealth under Quezon!" },
        { type: "mc", prompt: "Who were the 'Thomasites' who arrived in the Philippines in 1901?", options: ["American public school teachers who built the English public school system", "Spanish friars from Santo Tomas", "Filipino revolutionary generals", "Japanese naval officers"], answer: "American public school teachers who built the English public school system", hint: "Named after their transport ship, the USAT Thomas!", whyEasy: "Around 500+ American educators arrived aboard USAT Thomas to establish public education!" },
        { type: "mc", prompt: "What historical event is commemorated every April 9 as 'Araw ng Kagitingan' (Day of Valor)?", options: ["Fall of Bataan (1942) and heroism of Filipino-American defenders", "Cry of Pugad Lawin", "EDSA People Power", "Battle of Mactan"], answer: "Fall of Bataan (1942) and heroism of Filipino-American defenders", hint: "Followed by the tragic Bataan Death March from Mariveles to Capas, Tarlac!", whyEasy: "April 9, 1942 honors the immense courage and sacrifice of defenders at Bataan!" },
        { type: "mc", prompt: "Who served as the FIRST President of the Philippine Commonwealth (1935)?", options: ["Manuel L. Quezon", "Emilio Aguinaldo", "Manuel Roxas", "Sergio Osmeña"], answer: "Manuel L. Quezon", hint: "Also known as the Father of the National Language (Ama ng Wikang Pambansa)!", whyEasy: "Quezon was President (and Osmeña was Vice President) of the 1935 Commonwealth!" },
        { type: "mc", prompt: "Who became the FIRST President of the independent Third Philippine Republic on July 4, 1946?", options: ["Manuel Roxas", "Elpidio Quirino", "Ramon Magsaysay", "Carlos P. Garcia"], answer: "Manuel Roxas", hint: "Won the 1946 election right as U.S. sovereignty formally ended!", whyEasy: "Manuel Roxas took office as first President of the post-war Third Republic on July 4, 1946!" }
      ]
    },
    {
      id: "ph-martial-law-edsa-modern",
      worldId: "ph_history",
      order: 112,
      title: "Post-War Republics, Martial Law & EDSA (1946–Present)",
      icon: "🕊️",
      tagline: "Macapagal moved Independence Day to June 12; Proc. 1081 (1972) → EDSA People Power (Feb 1986) → 1987 Constitution!",
      scaryVersion: "Contemporary Philippine political history: postwar administrations, authoritarianism, and democratic restoration.",
      easyTruth: "Modern Philippine democracy was forged through dramatic turning points: Carlos P. Garcia's 'Filipino First', Diosdado Macapagal's move of Independence Day back to June 12 (1962), Martial Law under Ferdinand Marcos (1972–1981), and the peaceful 4-day EDSA People Power Revolution (Feb 22–25, 1986) that restored constitutional democracy!",
      microSteps: [
        { label: "Step 1: Landmark Post-War Presidents (1946–1965)", text: "Ramon Magsaysay ('Champion of the Masses', opened Malacañang to ordinary citizens). Carlos P. Garcia ('Filipino First Policy' prioritizing local business). Diosdado Macapagal signed the Agricultural Land Reform Code and shifted official Independence Day from July 4 to JUNE 12 (1962)!" },
        { label: "Step 2: Martial Law (Proclamation 1081) & Crisis (1972–1985)", text: "On Sept 21, 1972 (announced Sept 23), Ferdinand Marcos placed the country under Martial Law via Proclamation No. 1081, suspending the writ of habeas corpus, shutting Congress/media, and adopting the 1973 Constitution. The assassination of Sen. Benigno 'Ninoy' Aquino Jr. at Manila Airport (Aug 21, 1983) united nationwide protest." },
        { label: "Step 3: EDSA People Power (Feb 22–25, 1986) & 1987 Constitution", text: "After the contested Feb 1986 Snap Elections, millions of peaceful Filipinos flooded EDSA with prayers and flowers, shielding reformist soldiers without bloodshed. Corazon Aquino became Asia's first female elected president and championed the 1987 Constitution — putting strict term limits and safeguards on Martial Law!" }
      ],
      cheatCode: "Garcia = Filipino First · Macapagal = June 12 Independence Day · Sept 21, 1972 = Proc. 1081 · Aug 21, 1983 = Ninoy · Feb 22–25, 1986 = EDSA → 1987 Constitution!",
      visualizerId: "phHistoryCivicsLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Which Philippine President officially changed Independence Day from July 4 to June 12 (in 1962)?", options: ["Diosdado Macapagal", "Ramon Magsaysay", "Carlos P. Garcia", "Ferdinand Marcos"], answer: "Diosdado Macapagal", hint: "He argued Filipinos declared their OWN freedom in Kawit in 1898, not when the U.S. granted it in 1946!", whyEasy: "Macapagal issued Proclamation No. 28 (1962) restoring June 12 as Philippine Independence Day!" },
        { type: "mc", prompt: "Which proclamation formally placed the entire Philippines under Martial Law in September 1972?", options: ["Proclamation No. 1081", "Proclamation No. 28", "Republic Act 10533", "Executive Order 209"], answer: "Proclamation No. 1081", hint: "Dated September 21, 1972!", whyEasy: "Proclamation No. 1081 suspended civil liberties and ushered in 14 years of authoritarian rule." },
        { type: "mc", prompt: "What made the February 1986 EDSA People Power Revolution famous worldwide?", options: ["Millions ousted a dictatorship through nonviolent civilian solidarity", "It was fought with naval ships", "It lasted 10 years of guerrilla combat", "It merged the Philippines with Spain"], answer: "Millions ousted a dictatorship through nonviolent civilian solidarity", hint: "Civilians linked arms, shared food, and offered flowers to soldiers along Epifanio de los Santos Avenue!", whyEasy: "EDSA 1986 inspired peaceful democratic transitions globally across Asia and Eastern Europe!" },
        { type: "mc", prompt: "Which President championed the 'Filipino First Policy' to strengthen domestic Filipino businesses?", options: ["Carlos P. Garcia", "Manuel Roxas", "Fidel V. Ramos", "Joseph Estrada"], answer: "Carlos P. Garcia", hint: "Remember the slogan: 'Filipino First' (1958)!", whyEasy: "Carlos P. Garcia promoted economic nationalism and Filipino enterprise!" },
        { type: "mc", prompt: "Under the 1987 Constitution crafted after EDSA, how long can Martial Law initially last without Congress extending it?", options: ["60 days (and Congress can revoke it, Supreme Court can review it!)", "6 years automatically", "Indefinitely at the President's discretion", "365 days without review"], answer: "60 days (and Congress can revoke it, Supreme Court can review it!)", hint: "The 1987 framers built strong guardrails directly in response to 1972!", whyEasy: "Article VII Sec. 18 limits Martial Law to 60 days max, with mandatory 48-hour report to Congress and Supreme Court review!" }
      ]
    },
    {
      id: "ph-constitution-three-branches",
      worldId: "ph_history",
      order: 113,
      title: "1987 PH Constitution & Three Branches of Government",
      icon: "⚖️",
      tagline: "Legislative MAKES laws (Congress), Executive ENFORCES laws (President), Judiciary INTERPRETS laws (Supreme Court)!",
      scaryVersion: "Trias politica separation of powers, bicameral lawmaking, and constitutional judicial review.",
      easyTruth: "To keep any one leader from becoming a king, the 1987 Constitution splits power across 3 co-equal branches that constantly check each other: Congress writes the rules, the President runs the country and can veto bad bills, Congress can override vetoes by 2/3 vote, and the Supreme Court can strike down unconstitutional laws!",
      microSteps: [
        { label: "Step 1: Legislative Branch — Bicameral Congress (Makes Laws)", text: "Split into two chambers: Senate (24 Senators elected nationwide, 6-yr term, max 2 consecutive) and House of Representatives (district + party-list reps, 3-yr term, max 3 consecutive). A bill passes 3 readings in BOTH houses before heading to the President!" },
        { label: "Step 2: Executive Branch — President & VP (Enforces Laws)", text: "Elected directly for ONE single 6-year term (NO reelection for President!). Must be a natural-born Filipino citizen, registered voter, able to read/write, at least 40 years old, and PH resident for 10+ years. If the President neither signs nor vetoes a bill within 30 days, it AUTOMATICALLY becomes law!" },
        { label: "Step 3: Judicial Branch — Supreme Court (Interprets Laws)", text: "1 Chief Justice + 14 Associate Justices (= 15 total!), serving until mandatory retirement at age 70. Holds the power of Judicial Review: striking down any law or executive order that violates the Constitution!" }
      ],
      cheatCode: "3 Branches = Make (Congress: 24 Senators + House), Enforce (President: 1×6yr, age 40+), Interpret (SC: 15 Justices, retire 70). Veto override = 2/3 each house!",
      visualizerId: "phHistoryCivicsLab",
      bruteforce: true,
      questions: [
        { type: "input", prompt: "How many Senators sit in the Philippine Senate under the 1987 Constitution?", answer: "24", hint: "Elected nationwide in staggered batches of 12 every 3 years!", whyEasy: "24 Senators total — 12 elected every 3 years for 6-year terms!" },
        { type: "input", prompt: "How many total Justices sit on the Philippine Supreme Court (1 Chief + 14 Associates)?", answer: "15", hint: "Add the 1 Chief Justice + 14 Associate Justices!", whyEasy: "15 Justices total (odd number prevents tie votes en banc)!" },
        { type: "mc", prompt: "If the President VETOES a bill passed by Congress, how can Congress still enact it into law?", options: ["2/3 vote in BOTH the Senate and House of Representatives", "Simple majority (51%) in the Senate only", "Asking the Supreme Court to sign it", "A presidential veto can never be overridden"], answer: "2/3 vote in BOTH the Senate and House of Representatives", hint: "Supermajority check-and-balance across BOTH chambers!", whyEasy: "A 2/3 override in each house proves Checks and Balances in action!" },
        { type: "mc", prompt: "What happens if the President takes ZERO action (neither signs nor vetoes) on a bill for 30 days after receiving it?", options: ["It automatically lapses into LAW!", "It automatically dies (pocket veto)", "It goes back to First Reading", "The Supreme Court decides"], answer: "It automatically lapses into LAW!", hint: "Unlike the U.S. pocket veto, the 1987 PH Constitution prevents stalling!", whyEasy: "Article VI Sec. 27: after 30 days of presidential silence, the bill becomes law as if signed!" },
        { type: "mc", prompt: "What is the minimum age and term limit for the President of the Philippines?", options: ["At least 40 years old; single 6-year term (no reelection)", "At least 35 years old; two 4-year terms", "At least 30 years old; unlimited 6-year terms", "At least 50 years old; single 8-year term"], answer: "At least 40 years old; single 6-year term (no reelection)", hint: "Check Article VII: 40 years old, 10 years residency, ONE 6-year term!", whyEasy: "Strict single 6-year term prevents incumbents from entrenching themselves in power!" }
      ]
    },
    {
      id: "ph-bill-of-rights-civics",
      worldId: "ph_history",
      order: 114,
      title: "Bill of Rights (Article III), Citizenship & Suffrage",
      icon: "🛡️",
      tagline: "Due process, Miranda rights, Habeas Corpus, Jus Sanguinis (bloodline!), and voting at 18+ with ZERO literacy/property tests!",
      scaryVersion: "Constitutional civil liberties jurisprudence, nationality acquisition doctrines, and democratic suffrage.",
      easyTruth: "Article III (Bill of Rights) is your personal legal shield AGAINST government abuse — guaranteeing life, liberty, privacy, free speech, and fair trial! Meanwhile, Philippine citizenship follows bloodline (Jus Sanguinis — Filipino parent = Filipino!), and EVERY qualified citizen 18+ can vote with zero wealth or literacy barriers!",
      microSteps: [
        { label: "Step 1: Core Shields in Article III (Bill of Rights)", text: "Sec. 1: Due Process & Equal Protection. Sec. 2: No unreasonable search/seizure without a Judge's warrant. Sec. 4: Freedom of speech, press & peaceful assembly. Sec. 12: Miranda Rights (right to remain silent & have competent counsel). Sec. 14: Presumed INNOCENT until proven guilty! Sec. 21: No Double Jeopardy (cannot be tried twice for the same crime)." },
        { label: "Step 2: Great Writs & Ex Post Facto Trap", text: "Writ of Habeas Corpus ('produce the body') demands authorities bring a detained person before a court to justify detention! Writ of Amparo protects life/liberty/security against enforced disappearance. Ex post facto law = illegal law punishing an act retroactively (before it was a crime!)." },
        { label: "Step 3: Citizenship (Jus Sanguinis) & Suffrage (Article V)", text: "Philippines uses JUS SANGUINIS (citizenship by parent's blood — even if born abroad!), NOT Jus Soli (birthplace soil). Suffrage (voting): Filipino citizen, 18+ years old, 1-year PH residency (6 months in place of voting) — NO literacy, property, or substantive tax requirement allowed!" }
      ],
      cheatCode: "Jus Sanguinis = Blood (PH!). Habeas Corpus = Produce the body! Double Jeopardy = Can't be tried twice. Suffrage = 18+, ZERO literacy/property test!",
      visualizerId: "phHistoryCivicsLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "The Philippines primarily follows which principle for citizenship by birth?", options: ["Jus Sanguinis (by blood/parentage)", "Jus Soli (by place of birth soil)", "Property ownership", "English fluency test"], answer: "Jus Sanguinis (by blood/parentage)", hint: "Sanguis = blood in Latin — if your mother or father is Filipino, you are Filipino!", whyEasy: "Article IV Sec. 1: Citizens are those whose fathers OR mothers are citizens of the Philippines (Jus Sanguinis)!" },
        { type: "mc", prompt: "Which legal writ orders authorities to bring a detained prisoner before a court to verify if detention is lawful?", options: ["Writ of Habeas Corpus", "Writ of Taxation", "Executive Order", "Bill of Attainder"], answer: "Writ of Habeas Corpus", hint: "Latin for 'you shall have the body'!", whyEasy: "Habeas Corpus prevents secret, unlawful, or indefinite detention without charges!" },
        { type: "mc", prompt: "Can Congress pass a law requiring Filipinos to pass a college reading test or own land before voting?", options: ["No — Article V strictly forbids literacy or property requirements!", "Yes, by simple majority", "Only in local elections", "Only for first-time voters"], answer: "No — Article V strictly forbids literacy or property requirements!", hint: "Suffrage is a universal democratic right at age 18+!", whyEasy: "Article V Sec. 1 explicitly bans literacy, property, or other substantive barriers to voting!" },
        { type: "mc", prompt: "What is an 'Ex Post Facto Law' (strictly banned by the Bill of Rights)?", options: ["A retroactive law punishing an act that was legal when committed", "A traffic law passed at night", "A treaty with another nation", "A local barangay curfew"], answer: "A retroactive law punishing an act that was legal when committed", hint: "Ex post facto = 'after the fact'!", whyEasy: "You can never be jailed today for doing something that was completely legal yesterday!" },
        { type: "mc", prompt: "Under the Miranda Rights (Article III Sec. 12), any person under custodial investigation has the right to:", options: ["Remain silent and have competent, independent counsel", "Demand immediate cash bail without hearing", "Skip court entirely", "Choose their own judge"], answer: "Remain silent and have competent, independent counsel", hint: "Confessions forced without a lawyer are inadmissible in court!", whyEasy: "Silence + Lawyer protects suspects from coerced or false confessions!" }
      ]
    },
    {
      id: "ph-local-gov-taxes-civic-life",
      worldId: "ph_history",
      order: 115,
      title: "Local Government (RA 7160), Commissions & Taxation",
      icon: "🏘️",
      tagline: "Barangay → City/Municipality → Province (RA 7160). Independent Watchdogs: COMELEC, COA, CSC + Progressive vs Regressive Tax!",
      scaryVersion: "Decentralized local autonomy statutes, independent constitutional watchdogs, and fiscal taxation incidence.",
      easyTruth: "Not every decision happens in Malacañang! The Local Government Code (RA 7160) gives Barangays, Cities, and Provinces local budgets and power. Three independent Constitutional Commissions watch elections (COMELEC), public money (COA), and government hiring (CSC) — funded by taxes (the 'lifeblood of the state')!",
      microSteps: [
        { label: "Step 1: Local Government Hierarchy (RA 7160)", text: "Smallest political unit: Barangay (Punong Barangay + 7 Kagawads + SK Youth Chair + Katarungang Pambarangay mediation before court!). Next: Municipality / City (Mayor + Sanggunian), then Province (Governor), plus autonomous BARMM in Mindanao." },
        { label: "Step 2: 3 Independent Constitutional Commissions (Article IX)", text: "1) CSC (Civil Service Commission) = merit-based government hiring/exams. 2) COMELEC = runs honest elections & plebiscites. 3) COA (Commission on Audit) = audits EVERY peso spent by government agencies! Plus the Office of the Ombudsman prosecutes graft & corruption." },
        { label: "Step 3: Taxation Basics — Progressive vs Regressive", text: "Taxation is the lifeblood of government (funds roads, schools, hospitals). PROGRESSIVE tax: rate % RISES as income rises (PH Income Tax under TRAIN — low earners ≤ ₱250k/yr pay 0%!). REGRESSIVE tax: flat rate takes a BIGGER % of a poor family's income (like flat 12% VAT on goods)!" }
      ],
      cheatCode: "RA 7160 = Local Gov Code (Barangay = smallest!). Watchdogs: CSC (hiring), COMELEC (votes), COA (audit money), Ombudsman (anti-graft). Progressive = rich pay higher %; VAT = Regressive!",
      visualizerId: "phHistoryCivicsLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Which independent Constitutional Commission audits all government funds, expenditures, and public property?", options: ["COA (Commission on Audit)", "COMELEC", "CSC (Civil Service Commission)", "DTI"], answer: "COA (Commission on Audit)", hint: "A = Audit!", whyEasy: "COA acts as the nation's independent financial watchdog over every public peso!" },
        { type: "mc", prompt: "What is the smallest basic political and administrative unit in the Philippines?", options: ["Barangay", "Municipality", "Province", "Congressional District"], answer: "Barangay", hint: "Led by a Punong Barangay and Sangguniang Barangay!", whyEasy: "Over 42,000 Barangays deliver frontline community services and dispute mediation!" },
        { type: "mc", prompt: "Why is a flat 12% Value-Added Tax (VAT) on everyday groceries classified as REGRESSIVE?", options: ["It takes a larger share of a low-income family's budget than a billionaire's", "Rich people pay 0% VAT", "It only applies to exports", "It decreases every year"], answer: "It takes a larger share of a low-income family's budget than a billionaire's", hint: "Spending ₱120 VAT hurts much more on a ₱1,000 income (12%) than on ₱1,000,000 (0.01%)!", whyEasy: "Progressive tax scales up with income; flat consumption taxes hit lower incomes proportionally harder!" },
        { type: "mc", prompt: "Which landmark law decentralized powers and budgets from Manila to local governments (Barangays, Cities, Provinces)?", options: ["Local Government Code of 1991 (RA 7160)", "Enhanced Basic Education Act (RA 10533)", "Tydings-McDuffie Act", "Jones Law"], answer: "Local Government Code of 1991 (RA 7160)", hint: "Signed in 1991 to empower local autonomy!", whyEasy: "RA 7160 devolved health, agriculture, and fiscal shares (NTA/IRA) to LGUs!" },
        { type: "mc", prompt: "Which independent constitutional office investigates and prosecutes corrupt public officials ('Tanodbayan')?", options: ["Office of the Ombudsman", "Department of Tourism", "Commission on Higher Education", "Bangko Sentral"], answer: "Office of the Ombudsman", hint: "Protector of the people against graft and misconduct!", whyEasy: "The Ombudsman investigates complaints against government officials and files cases at Sandiganbayan!" }
      ]
    },
    {
      id: "world-history-revolutions-civ",
      worldId: "ph_history",
      order: 116,
      title: "World History Landmarks: Civilizations, Revolutions & ASEAN",
      icon: "🌍",
      tagline: "Mesopotamia (Cuneiform) → Greece/Rome → Renaissance → Industrial Rev → WWII/UN (1945) → ASEAN (1967, PH co-founder!).",
      scaryVersion: "Macro-historical civilizational trajectories, modern industrial transitions, and post-1945 multilateral order.",
      easyTruth: "Zooming out makes all human history click into 5 huge leaps: River Civilizations invented writing & law; Greece & Rome invented democracy & republics; the Renaissance & Printing Press exploded literacy; Steam/Industry & Revolutions birthed modern nations; and after WWII's horrors, humanity built the UN (1945) and ASEAN (1967 — co-founded by the Philippines!).",
      microSteps: [
        { label: "Step 1: Cradles of Civilization & Classical Foundations", text: "Mesopotamia (Tigris–Euphrates): Cuneiform writing & Code of Hammurabi ('eye for an eye'). Egypt (Nile): Hieroglyphics & pyramids. Ancient Greece: Athens birthed direct democracy & philosophy (Socrates → Plato → Aristotle). Rome: Republic, codified law & engineering." },
        { label: "Step 2: Renaissance, Printing Press & Revolutions (1450–1900)", text: "Gutenberg's movable-type Printing Press (~1440) spread Renaissance science and ideas faster than ever. The Enlightenment (Locke, Montesquieu's 3 branches!) inspired the American (1776), French (1789), and later Philippine (1896) revolutions! Meanwhile, Britain's Industrial Revolution (steam engines, factories) transformed global work." },
        { label: "Step 3: 20th Century, UN (1945) & ASEAN (1967)", text: "WWI (1914–1918) & WWII (1939–1945) devastated the globe, prompting the founding of the United Nations (Oct 24, 1945 — PH was an original charter signatory!). The Cold War pitted U.S. vs USSR (1947–1991, Space Race!). On Aug 8, 1967, 5 nations (PH, Indonesia, Malaysia, Singapore, Thailand) signed the Bangkok Declaration creating ASEAN!" }
      ],
      cheatCode: "Mesopotamia = Cuneiform/Hammurabi · Montesquieu = 3 Branches · Gutenberg = Printing Press · UN = 1945 (PH original member!) · ASEAN = 1967 (PH founding 5!).",
      visualizerId: "phHistoryCivicsLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Which Enlightenment thinker's 'Separation of Powers' directly inspired the 3 branches in the Philippine & U.S. Constitutions?", options: ["Baron de Montesquieu", "Julius Caesar", "Hammurabi", "Karl Marx"], answer: "Baron de Montesquieu", hint: "Author of 'The Spirit of the Laws' (1748) — Executive, Legislative, Judicial!", whyEasy: "Montesquieu argued liberty survives only when power checks power across 3 branches!" },
        { type: "mc", prompt: "Which ancient river-valley civilization developed Cuneiform writing and the Code of Hammurabi?", options: ["Mesopotamia (Tigris–Euphrates)", "Ancient Greece", "Inca Empire", "Feudal Japan"], answer: "Mesopotamia (Tigris–Euphrates)", hint: "'Land between two rivers' in modern Iraq!", whyEasy: "Sumerians invented Cuneiform on clay tablets, and Babylon's Hammurabi carved early written laws!" },
        { type: "mc", prompt: "Which 15th-century invention accelerated the Renaissance, Scientific Revolution, and mass literacy?", options: ["Gutenberg's movable-type Printing Press", "Steam locomotive", "Radio telegraph", "Compass"], answer: "Gutenberg's movable-type Printing Press", hint: "Books stopped being hand-copied by monks and became affordable across Europe!", whyEasy: "Gutenberg (~1440) was the original 'internet' of knowledge!" },
        { type: "mc", prompt: "The Philippines was one of the 5 founding nations of ASEAN in 1967 alongside Indonesia, Malaysia, Singapore, and:", options: ["Thailand", "Japan", "Australia", "South Korea"], answer: "Thailand", hint: "Signed via the Bangkok Declaration on August 8, 1967!", whyEasy: "Bangkok is Thailand's capital — ASEAN's founding 5: PH, ID, MY, SG, TH!" },
        { type: "mc", prompt: "What global peace organization was founded in October 1945 right after WWII, with the Philippines as an original signatory?", options: ["United Nations (UN)", "League of Nations", "NATO", "European Union"], answer: "United Nations (UN)", hint: "Carlos P. Romulo later became the first Asian President of its General Assembly!", whyEasy: "The UN was founded in 1945 to prevent a third world war; the Philippines helped sign its Charter!" }
      ]
    },

    // ---------- WORLD 14: FILIPINO (WIKA AT PAGBASA) (6 NODES) ----------
    {
      id: "fil-ponolohiya-baybay-diin",
      worldId: "filipino",
      order: 117,
      title: "Ponolohiya, Diin (Malumay–Maragsa) & Baybay",
      icon: "🗣️",
      tagline: "4 Bigkas: Malumay (penult, no glottal), Malumi (penult + impit `), Mabilis (last ´), Maragsa (last + impit ^)!",
      scaryVersion: "Filipino suprasegmental prosody, glottal-stop phonemic contrasts, and KWF orthographic standards.",
      easyTruth: "In Filipino, moving stress by ONE syllable or adding a tiny glottal stop at the end completely changes a word's meaning! Look at 'basa': bá-sa (read — Malumay) vs ba-sâ (wet — Maragsa)! Master the 2×2 grid (Penultimate vs Last syllable × Smooth vs Glottal Stop) and you master ALL 4 types of Diin instantly!",
      microSteps: [
        { label: "Step 1: Ang 2×2 Grid ng Apat na Bigkas (Diin)", text: "1) MALUMAY: diin sa penultima (ikalawa mula huli), walang impit (hal. báhay, búhay, bága = ember). 2) MALUMI: diin sa penultima + may impit (`) sa patinig sa dulo (hal. batà = child, luhà = tear, bagà = lung). 3) MABILIS: diin sa HULING pantig, tuloy-tuloy (´) (hal. takbó, gáling → galíng, bagá = really?). 4) MARAGSA: diin sa HULING pantig + may impit (^) sa dulo (hal. basâ = wet, punô = full, dugô = blood)!" },
        { label: "Step 2: Diptonggo, Klaster at Digrapo", text: "DIPTONGGO = patinig + malapatinig (w/y) sa IISANG pantig (aw, iw, ey, oy, uy — hal. a-raw, ba-hay, ka-hoy; BANTAY: 'ba-ya-ni' ay HINDI diptonggo dahil hiwalay ang y sa susunod na pantig!). KLASTER (Kambal-katinig) = 2 magkasunod na katinig sa isang pantig (trák, plá-to, brá-so). DIGRAPO = 'ng' (iisang tunog!)." },
        { label: "Step 3: 28 Titik ng Alfabetong Filipino (KWF)", text: "May 28 titik ang makabagong alfabeto: 20 mula sa Abakada + 8 hiram na titik (C, F, J, Ñ, Q, V, X, Z) para sa mga pantanging ngalan, katutubong wika (hal. 'vakul' ng Ivatan, 'ifun' ng Ibanag), at terminong teknikal/siyentipiko (oxygen, x-ray)!" }
      ],
      cheatCode: "Penultima: Malumay (smooth) vs Malumi (` impit). Huling pantig: Mabilis (´ smooth) vs Maragsa (^ impit)! Diptonggo = patinig+w/y sa IISANG pantig!",
      visualizerId: "filipinoWikaLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Alin sa apat na bigkas ang salitang 'basâ' (wet — may diin sa huling pantig AT may impit na tunog sa dulo)?", options: ["Maragsa (^)", "Malumay", "Malumi (`)", "Mabilis (´)"], answer: "Maragsa (^)", hint: "Huling pantig + may impit sa dulo = pakupya (^)!", whyEasy: "Maragsa = mabilis + impit! Halimbawa: basâ (wet), dugô (blood), punô (full)!" },
        { type: "mc", prompt: "Ano ang pagkakaiba ng 'bá-sa' (Malumay) at 'ba-sâ' (Maragsa)?", options: ["bása = magbasa (read); basâ = may tubig (wet)", "Pareho lang ang kahulugan", "bása = wet; basâ = read", "bása = lung; basâ = ember"], answer: "bása = magbasa (read); basâ = may tubig (wet)", hint: "Bigkasin nang malakas: 'Mag-BÁ-sa ng libro' vs 'Ba-SÂ ang damit'!", whyEasy: "Ang diin at impit ay ponemiko sa Filipino — nagbabago agad ang kahulugan!" },
        { type: "mc", prompt: "Aling salita ang may TUNAY na diptonggo (patinig + w/y sa iisang pantig)?", options: ["ba-hay", "ba-ya-ni", "a-wa", "la-yo"], answer: "ba-hay", hint: "Pantigin ang bawat salita! Saan magkasama ang patinig at y/w sa IISANG pantig?", whyEasy: "Sa 'ba-HAY', magkasama ang 'ay' sa huling pantig! Sa 'ba-ya-ni', napunta ang 'y' sa 'ya'!" },
        { type: "mc", prompt: "Ang salitang 'luhà' (tears — diin sa ikalawa mula sa huli AT may impit sa dulo) ay:", options: ["Malumi (`)", "Malumay", "Mabilis (´)", "Maragsa (^)"], answer: "Malumi (`)", hint: "Penultima + impit sa huling patinig = tuldik paiwa (`) sa huling patinig!", whyEasy: "Malumi = malumay na may impit sa dulo (luhà, batà, punò = tree)!" },
        { type: "input", prompt: "Ilan lahat ang titik sa Makabagong Alfabetong Filipino (20 Abakada + 8 hiram na titik)?", answer: "28", hint: "26 English letters + Ñ + NG!", whyEasy: "28 titik: A hanggang Z kasama ang Ñ at NG!" }
      ]
    },
    {
      id: "fil-bahagi-ng-pananalita",
      worldId: "filipino",
      order: 118,
      title: "Bahagi ng Pananalita, Aspekto & Pokus ng Pandiwa",
      icon: "⚙️",
      tagline: "Aspekto = Kilos (Naganap / Nagaganap / Magaganap). Pokus = Sino ang bida ('ang') sa pangungusap!",
      scaryVersion: "Tagalog morphosyntactic voice-focus alignment, verbal aspectual reduplication, and lexical categories.",
      easyTruth: "English verbs change for PAST/PRESENT/FUTURE; Filipino verbs ALSO change their prefix/infix (`um-`, `mag-`, `-in`, `i-`, `-an`) to spotlight WHO the 'star' (`ang`-phrase) of the sentence is! Find the word after `ang` / `si` — that instantly tells you the Pokus ng Pandiwa!",
      microSteps: [
        { label: "Step 1: Aspekto ng Pandiwa (3 + Katatapos)", text: "1) Perpektibo (Naganap na): 'kumain', 'nagsulat'. 2) Imperpektibo (Nagaganap pa — may pag-uulit ng unang pantig!): 'kumakain', 'nagsusulat'. 3) Kontemplatibo (Magaganap pa lang): 'kakain', 'magsusulat'. (+ Perpektibong Katatapos: 'kakakain' / 'kasusulat'!)" },
        { label: "Step 2: Pokus ng Pandiwa — Hanapin ang 'ANG / SI'!", text: "1) TAGAGANAP (Aktor — Sino gumawa?): 'Kumain SI Ana ng mangga.' (-um-, mag-). 2) LAYON (Gol — Ano ang ginawaan?): 'Kinain ni Ana ANG MANGGA.' (-in, i-). 3) GANAPAN (Lokatib — Saan?): 'Pinagkainan ni Ana ANG PLATO.' (-an). 4) TAGATANGGAP (Benepaktib — Para kanino?): 'Ipinagluto ni Ana SI Nanay.' (ipag-, i-). 5) GAMIT (Instrumental — Ano ang kasangkapan?): 'Ipinanghiwa niya ANG KUTSILYO.' (ipang-)." },
        { label: "Step 3: Pang-uri vs Pang-abay (Madalas na Lituhan!)", text: "PANG-URI (Adjective) = naglalarawan sa PANGNGALAN o PANGHALIP ('Mabilis ang BATA'). PANG-ABAY (Adverb) = naglalarawan sa PANDIWA, pang-uri, o kapwa pang-abay ('Mabilis TUMAKBO ang bata' — sumasagot sa paano, kailan, saan!)." }
      ],
      cheatCode: "Hanapin ang 'ANG/SI' para sa Pokus: Aktor (sino gumawa), Layon (ano ginawaan), Ganapan (saan), Gamit (ipang- kasangkapan)! Pang-uri → Noun; Pang-abay → Verb!",
      visualizerId: "filipinoWikaLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Sa pangungusap na 'Kinain ni Marco ANG MANGGA', ano ang Pokus ng Pandiwa?", options: ["Pokus sa Layon (Gol)", "Pokus sa Tagaganap (Aktor)", "Pokus sa Ganapan", "Pokus sa Gamit"], answer: "Pokus sa Layon (Gol)", hint: "Ano ang minarkahan ng 'ANG'? Ang MANGGA — iyon ang bagay na kinain!", whyEasy: "Kapag ang 'ang' ay ang bagay na tumatanggap ng kilos (-in / kinain), Pokus sa Layon ito!" },
        { type: "mc", prompt: "Sa 'Ipinanghiwa ng kusinero ng sibuyas ANG MATALIM NA KUTSILYO', ano ang Pokus ng Pandiwa?", options: ["Pokus sa Gamit (Instrumental)", "Pokus sa Aktor", "Pokus sa Ganapan", "Pokus sa Sanhi"], answer: "Pokus sa Gamit (Instrumental)", hint: "Tingnan ang panlaping 'ipinang-' at ang 'ang kutsilyo' (kasangkapan)!", whyEasy: "'Ipinang-' + kasangkapan ('ang kutsilyo') = Pokus sa Gamit!" },
        { type: "mc", prompt: "Aling pandiwa ang nasa Aspektong IMPERPEKTIBO (kasalukuyang nagaganap)?", options: ["nagsusulat", "nagsulat", "magsusulat", "kasusulat"], answer: "nagsusulat", hint: "May n- (nasimulan na) AT inulit ang unang pantig (su-sulat)!", whyEasy: "Nagsulat (tapos), Nagsusulat (ginagawa pa — Imperpektibo), Magsusulat (gagawin pa)!" },
        { type: "mc", prompt: "Sa pangungusap na 'Mahusay SUMAGOT ang mag-aaral', anong bahagi ng pananalita ang 'Mahusay'?", options: ["Pang-abay (Adverb — naglalarawan sa pandiwang 'sumagot')", "Pang-uri (Adjective)", "Pangngalan (Noun)", "Pangatnig (Conjunction)"], answer: "Pang-abay (Adverb — naglalarawan sa pandiwang 'sumagot')", hint: "Ano ang inilalarawan ng 'mahusay'? Ang kilos na 'sumagot'!", whyEasy: "Kapag kilos (pandiwa) ang inilalarawan (PAANO sumagot?), Pang-abay iyon!" },
        { type: "mc", prompt: "Sa 'Pinagtamnan ni Lolo ng palay ANG MALAWAK NA BUKID', ano ang Pokus ng Pandiwa?", options: ["Pokus sa Ganapan (Lokatib)", "Pokus sa Tagaganap", "Pokus sa Tagatanggap", "Pokus sa Layon"], answer: "Pokus sa Ganapan (Lokatib)", hint: "Ang 'ang malawak na bukid' ay isang LUGAR kung saan ginawa ang kilos!", whyEasy: "Pinag-...-an + lugar = Pokus sa Ganapan!" }
      ]
    },
    {
      id: "fil-ng-nang-din-rin-traps",
      worldId: "filipino",
      order: 119,
      title: "Wastong Gamit: Ng vs Nang, Din/Rin & Exam Traps",
      icon: "🎯",
      tagline: "NANG = kailan/paano/inuulit na kilos/upang; NG = pangngalan/nagmamay-ari. RIN/RAW pagkatapos ng patinig, W, Y!",
      scaryVersion: "Normative Filipino orthography, morphophonemic d→r alternation, and lexical minimal-pair precision.",
      easyTruth: "These 5 pairs appear on almost EVERY Philippine entrance exam (UPCAT, ACET, Civil Service, LET)! Once you know the 1-second test — e.g., replace 'nang' with 'para/noong/how', and check if the previous letter is a vowel/W/Y for 'rin/raw' — you will NEVER miss them again!",
      microSteps: [
        { label: "Step 1: NG vs NANG (Pinakasikat na Exam Trap!)", text: "Gamitin ang NANG sa 4 na kaso: (1) Katumbas ng 'noong' ('Nang dumating siya...'), (2) Katumbas ng 'para/upang' ('Mag-aral nang pumasa'), (3) Paraan/gaano ('Tumakbo nang mabilis'), (4) Inuulit na pandiwa ('Takbo nang takbo!'). Gamitin ang NG bago ang PANGNGALAN / may-ari ('Bumili ng tinapay', 'Aklat ng guro', 'Alas-otso ng umaga')." },
        { label: "Step 2: DIN/RIN at DAW/RAW (Patining + W/Y Rule!)", text: "RIN / RAW kapag ang sinusundang salita ay nagtatapos sa PATINIG (a,e,i,o,u) o malapatinig na W o Y ('ikaw rin', 'bahay raw', 'ako rin'). DIN / DAW kapag KATINIG ('lakad din', 'aral daw') — AT tandaan ang eksepsyon ng KWF: kung nagtatapos sa -ra/-ri/-raw/-ray, gamitin ang DIN/DAW para hindi mabuhol ang dila ('maaari din', 'araw daw')!" },
        { label: "Step 3: 5 Klasikong Pares (Pinto/Pintuan, Subukin/Subukan, Pahirin/Pahiran)", text: "PINTO = ang dahon/door panel na isinasara; PINTUAN = ang daanan/doorway! HAGDAN = stairs; HAGDANAN = stairwell space. SUBUKIN = testing quality ('Subukin ang sabon'); SUBUKAN = spying/observing secretly! PAHIRIN = wipe OFF ('Pahirin ang luha'); PAHIRAN = apply ON ('Pahiran ng mantikilya ang tinapay')!" }
      ],
      cheatCode: "NANG = noong / upang / paano / ulit-kilos; NG = noun/owner. RIN/RAW after vowel, W, Y (maliban sa -ri/-raw). Pahirin = wipe OFF; Pahiran = apply ON!",
      visualizerId: "filipinoWikaLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Piliin ang wasto: 'Nag-aral siya ___ mabuti upang makapasa sa pagsusulit.'", options: ["nang", "ng", "na ng", "nang ng"], answer: "nang", hint: "Sumasagot sa tanong na PAANO siya nag-aral!", whyEasy: "Kapag nagpapakita ng paraan (adverbial manner: how), laging NANG!" },
        { type: "mc", prompt: "Piliin ang wasto: 'Bumili si Marco ___ dalawang kilong mangga sa palengke.'", options: ["ng", "nang", "rin", "raw"], answer: "ng", hint: "Ang 'dalawang kilong mangga' ay PANGNGALAN (tuwirang layon)!", whyEasy: "Bago ang pangngalan (ano ang binili?), laging NG!" },
        { type: "mc", prompt: "Piliin ang wasto: 'Sasama ___ ba si Rosa sa lakbay-aral?' (pagkatapos ng 'Sasama')", options: ["rin", "din", "daw", "ng"], answer: "rin", hint: "Nagtatapos sa patinig na 'a' ang salitang 'Sasama'!", whyEasy: "Patinig (a, e, i, o, u), W, o Y → gamitin ang RIN / RAW!" },
        { type: "mc", prompt: "Alin ang wastong gamit ng PAHIRIN vs PAHIRAN?", options: ["Pahirin mo ang pawis sa noo; Pahiran mo ng jam ang tinapay.", "Pahiran mo ang pawis; Pahirin mo ng jam ang tinapay.", "Pareho lang ang ibig sabihin nila.", "Pahirin ay para lamang sa sahig."], answer: "Pahirin mo ang pawis sa noo; Pahiran mo ng jam ang tinapay.", hint: "Pahirin = alisin (wipe off); Pahiran = lagyan (spread on)!", whyEasy: "Tandaan: Pahir-IN = alis-IN; Pahir-AN = lagy-AN!" },
        { type: "mc", prompt: "Alin ang tamang pangungusap tungkol sa PINTO at PINTUAN?", options: ["Isara mo ang PINTO at huwag kang humarang sa PINTUAN.", "Isara mo ang PINTUAN at dumaan sa PINTO.", "Ang pinto ay bubong ng bahay.", "Walang pagkakaiba ang pinto at pintuan."], answer: "Isara mo ang PINTO at huwag kang humarang sa PINTUAN.", hint: "Pinto = door leaf; Pintuan = doorway/opening!", whyEasy: "Isinasara ang pinto (panel); dinadaanan ang pintuan (doorway)!" }
      ]
    },
    {
      id: "fil-tayutay-idyoma-sawikain",
      worldId: "filipino",
      order: 120,
      title: "Mga Tayutay, Sawikain (Idyoma) & Salawikain",
      icon: "🎭",
      tagline: "Simili (may 'tulad/parang') vs Metapora (direkta!) · Personipikasyon (kilos-tao) · Hyperbole (sobra) · Sawikain!",
      scaryVersion: "Filipino figurative rhetoric, metaphorical tropes, and paremiological folk idioms.",
      easyTruth: "Tayutay (Figures of Speech) make language vivid like paint! Just scan for 1 clue word: see 'parang/tulad/kawangis'? → Simili! Direct equation without 'parang'? → Metapora! Non-human acting human? → Personipikasyon! Wild exaggeration? → Hyperbole! Saying the sarcastic opposite? → Ironya!",
      microSteps: [
        { label: "Step 1: Ang 6 na Pinakamadalas na Tayutay", text: "1) PAGTUTULAD (Simili): may 'tulad ng, parang, tila, animo' ('Parang leon sa tapang'). 2) PAGWAWANGIS (Metapora): direktang paghahambing WALANG 'parang' ('Siya ay leon sa laban'). 3) PAGSASATAO (Personipikasyon): kilos-tao sa bagay ('Sumasayaw ang mga dahon sa hangin'). 4) PAGMAMALABIS (Hyperbole): sobrang eksaherado ('Bumaha ng luha'). 5) PAG-UYAM (Ironya): papuring may patama ('Ang galing mo — lagi kang huli!'). 6) ONOMATOPEYA: tunog ('tik-tak', 'dagundong')." },
        { label: "Step 2: Mga Klasikong Sawikain (Idyoma — Di-Literal!)", text: "Butas ang bulsa = walang pera · Nagbibilang ng poste = walang trabaho · Balat-sibuyas = madaling masaktan/sensitibo · Ilaw ng tahanan = ina · Haligi ng tahanan = ama · Ningas-kugon = masigasig lang sa simula · Bahag ang buntot = duwag · Makapal ang palad = masipag!" },
        { label: "Step 3: Sawikain vs Salawikain vs Bugtong", text: "SAWIKAIN (Idiom) = matalinghagang parirala ('bukas-palad' = matulungin). SALAWIKAIN (Proverb) = kasabihang may aral sa buhay ('Kung walang tiyaga, walang nilaga'). BUGTONG (Riddle) = palaisipang patula!" }
      ],
      cheatCode: "Simili = may 'parang/tila'; Metapora = direkta; Personipikasyon = kilos-tao; Hyperbole = sobra; Ironya = sarkastiko. Sawikain = idiom; Salawikain = aral!",
      visualizerId: "filipinoWikaLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "'Ngumiti ang araw at sumayaw ang mga alon sa dalampasigan.' Anong tayutay ito?", options: ["Pagsasatao (Personipikasyon)", "Pagtutulad (Simili)", "Pagmamalabis (Hyperbole)", "Pag-uyam (Ironya)"], answer: "Pagsasatao (Personipikasyon)", hint: "Ang araw at alon ay binigyan ng kilos ng tao (ngumiti, sumayaw)!", whyEasy: "Pagbibigay ng katangiang pantao sa walang buhay = Pagsasatao (Personipikasyon)!" },
        { type: "mc", prompt: "Ano ang kahulugan ng sawikaing 'nagbibilang ng poste'?", options: ["Walang trabaho", "Inhinyero ng kuryente", "Mayaman sa lupa", "Mahilig maglakbay"], answer: "Walang trabaho", hint: "Pakalat-kalat sa kalsada habang naghahanap ng hanapbuhay!", whyEasy: "'Nagbibilang ng poste' = walang trabaho; 'butas ang bulsa' = walang pera!" },
        { type: "mc", prompt: "Alin ang PAGWAWANGIS (Metapora) — direktang paghahambing na WALANG salitang 'parang' o 'tila'?", options: ["Ang ina ay ilaw ng tahanan.", "Tila ahas ang liko-likong daan.", "Parang rosas ang kanyang ngiti.", "Umiyak ang langit kagabi."], answer: "Ang ina ay ilaw ng tahanan.", hint: "Walang 'tila' o 'parang' — tuwirang tinawag na ilaw!", whyEasy: "Direktang pagtutumbas (A ay B) = Metapora (Pagwawangis)!" },
        { type: "mc", prompt: "'Namuti ang aking buhok sa kahihintay sa iyo!' Anong tayutay ito?", options: ["Pagmamalabis (Hyperbole)", "Onomatopeya", "Pagtutulad", "Pagsasatao"], answer: "Pagmamalabis (Hyperbole)", hint: "Sobrang eksaherasyon para idiin kung gaano katagal!", whyEasy: "Hindi naman totoong pumuti agad ang buhok — eksaherasyon = Hyperbole!" },
        { type: "mc", prompt: "Ano ang ibig sabihin ng 'ningas-kugon'?", options: ["Masigasig lang sa simula ngunit madaling magsawa", "Sobrang sipag hanggang matapos", "Mabilis magalit", "Laging maagap"], answer: "Masigasig lang sa simula ngunit madaling magsawa", hint: "Ang damong kugon ay malakas magliyab sa umpisa pero mabilis ding namamatay!", whyEasy: "Ningas-kugon = matinding sigla sa simula, nawawala agad kalaunan!" }
      ]
    },
    {
      id: "fil-pagbasa-panitikan-uri",
      worldId: "filipino",
      order: 121,
      title: "Pagbasa, Mga Uri ng Teksto & Pagsusuri",
      icon: "📖",
      tagline: "6 Uri ng Teksto: Impormatibo, Deskriptibo, Naratibo, Persuweysib, Argumentatibo, Prosidyural + Katotohanan vs Opinyon!",
      scaryVersion: "Filipino discourse typology, critical reading comprehension, and rhetorical inference analysis.",
      easyTruth: "Reading comprehension in Filipino is 100% structured! First ask: WHAT IS THE AUTHOR'S GOAL? Teaching facts? → Impormatibo. Painting imagery? → Deskriptibo. Telling a story? → Naratibo. Emotional persuasion/ad? → Persuweysib. Proving a stand with evidence? → Argumentatibo. Giving step-by-step instructions? → Prosidyural!",
      microSteps: [
        { label: "Step 1: Ang 6 na Uri ng Teksto (SHS Pagbasa at Pagsusuri)", text: "IMPORMATIBO = balita/ensiklopedya (bagong kaalaman, obhetibo). DESKRIPTIBO = paglalarawan gamit ang 5 pandama. NARATIBO = kuwento (may tauhan, tagpuan, banghay). PROSIDYURAL = hakbang-hakbang (resipi, manwal). PERSUWEYSIB = panghihikayat (patalastas — Ethos, Pathos, Logos). ARGUMENTATIBO = pagtatanggol ng posisyon gamit ang matibay na ebidensya at kontra-argumento!" },
        { label: "Step 2: Pangunahing Ideya, Hinuha (Inference) & Tono", text: "Pangunahing Ideya (Main Idea) = buod na pinag-uusapan ng buong talata (kadalasan nasa una o huling pangungusap). Hinuha (Inference) = lohikal na kongklusyon batay sa mga pahiwatig kahit hindi diretsahang sinabi! Tono = damdamin ng may-akda (seryoso, mapanuri, mapagbiro)." },
        { label: "Step 3: Katotohanan (Fact) vs Opinyon & Propaganda", text: "Katotohanan = mapapatunayan sa datos/dokumento ('Ang Pilipinas ay may mahigit 7,600 isla'). Opinyon = personal na pananaw ('Mas masarap ang adobo kaysa sinigang' — tingnan ang mga hudyat tulad ng 'sa tingin ko, pinakamaganda, dapat')." }
      ],
      cheatCode: "Persuweysib = humihikayat (damdamin/ad); Argumentatibo = ebidensya + lohika; Prosidyural = hakbang 1-2-3! Fact = napapatunayan; Opinyon = pananaw!",
      visualizerId: "filipinoWikaLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Anong uri ng teksto ang isang resipi ng Sinigang na may sunod-sunod na hakbang 1 hanggang 6?", options: ["Tekstong Prosidyural", "Tekstong Naratibo", "Tekstong Argumentatibo", "Tekstong Deskriptibo"], answer: "Tekstong Prosidyural", hint: "May malinaw na hakbang-hakbang (steps/procedure)!", whyEasy: "Mga resipi, manwal, at direksyon = Tekstong Prosidyural!" },
        { type: "mc", prompt: "Ano ang pangunahing pinagkaiba ng Tekstong PERSUWEYSIB at Tekstong ARGUMENTATIBO?", options: ["Persuweysib ay nakatuon sa panghihikayat (kadalasang emosyonal/patalastas); Argumentatibo ay nagpapatunay ng panig gamit ang ebidensya at lohika", "Parehong kathang-isip na kuwento", "Argumentatibo ay walang ebidensya", "Persuweysib ay puro numero lang"], answer: "Persuweysib ay nakatuon sa panghihikayat (kadalasang emosyonal/patalastas); Argumentatibo ay nagpapatunay ng panig gamit ang ebidensya at lohika", hint: "Ad campaign (Pathos) vs Debate paper na may datos at kontra-argumento!", whyEasy: "Ang Argumentatibo ay nakasalalay sa matibay na datos, pangangatwiran, at pagsagot sa kabilang panig!" },
        { type: "mc", prompt: "Alin sa mga sumusunod ang KATOTOHANAN (Fact) at HINDI opinyon?", options: ["Ang Saligang Batas ng 1987 ang kasalukuyang konstitusyon ng Pilipinas.", "Filipino ang pinakamagandang wika sa buong mundo.", "Mas masaya ang tag-init kaysa tag-ulan.", "Dapat baguhin ang lahat ng uniporme."], answer: "Ang Saligang Batas ng 1987 ang kasalukuyang konstitusyon ng Pilipinas.", hint: "Alin ang maaaring beripikahin sa opisyal na talaan at walang salitang 'pinakamaganda/mas masaya/dapat'?", whyEasy: "Mapapatunayan sa batas at kasaysayan — walang personal na pagkiling!" },
        { type: "mc", prompt: "Sa pagbasa, ano ang 'Paghihinuha' (Making an Inference)?", options: ["Pagbuo ng lohikal na kongklusyon mula sa mga pahiwatig sa teksto", "Pagbibilang ng bilang ng pantig", "Pagkopya ng eksaktong pamagat", "Paglaktaw sa mahihirap na salita"], answer: "Pagbuo ng lohikal na kongklusyon mula sa mga pahiwatig sa teksto", hint: "Reading between the lines gamit ang ebidensya + sariling kaalaman!", whyEasy: "Hinuha = matalinong hula na suportado ng mga clue sa binasa!" },
        { type: "mc", prompt: "Sa panghihikayat ni Aristotle (Tekstong Persuweysib), alin ang tumutukoy sa kredibilidad at karakter ng tagapagsalita?", options: ["Ethos", "Pathos", "Logos", "Mythos"], answer: "Ethos", hint: "Ethos = Ethics/Credibility; Pathos = Emotion; Logos = Logic!", whyEasy: "Ethos (kredibilidad), Pathos (damdamin), Logos (lohika/datos)!" }
      ]
    },
    {
      id: "fil-panitikang-pilipino-obra",
      worldId: "filipino",
      order: 122,
      title: "Panitikang Pilipino: Epiko, Balagtas, Rizal & Tula",
      icon: "📚",
      tagline: "Korido (8 pantig: Ibong Adarna) vs Awit (12 pantig: Florante at Laura) · Tanaga (7-7-7-7) vs Haiku (5-7-5) · Noli & El Fili!",
      scaryVersion: "Philippine literary canon, metrical romance prosody, and colonial-era allegorical narratives.",
      easyTruth: "Philippine literature spans ancient oral epics (Biag ni Lam-ang, Hudhud), classic Spanish-era romances (Ibong Adarna = 8 syllables; Florante at Laura = 12 syllables!), Rizal's nation-shaping novels (Noli = awakening/cancer; El Fili = simmering revolution!), and crisp Filipino poetic forms like the 7-7-7-7 Tanaga!",
      microSteps: [
        { label: "Step 1: Mga Epikong Bayan & Katutubong Tula", text: "Epiko = mahabang tulang pasalaysay ng kabayanihan: Biag ni Lam-ang (Ilocano), Hudhud ni Aliguyon (Ifugao — UNESCO heritage!), Ibalon (Bicol), Darangen (Maranao). Katutubong Tula: TANAGA = 4 taludtod × 7 pantig (7-7-7-7) na may tugma! (Huwag ipagkamali sa HAIKU ng Japan na 5-7-5!)" },
        { label: "Step 2: Korido vs Awit (Laging Tinatanong!)", text: "KORIDO = 8 pantig bawat taludtod, mabilis ang bigkas (hal. IBONG ADARNA — Don Juan, Berbanya). AWIT = 12 pantig bawat taludtod, marahan/madamdamin (hal. FLORANTE AT LAURA ni Francisco 'Balagtas' Baltazar — Ama ng Panulaang Tagalog, inialay kay 'Selya'!)." },
        { label: "Step 3: Mga Obra ni Rizal & Makabagong Manunulat", text: "NOLI ME TANGERE ('Huwag Mo Akong Salingin', 1887 Berlin) — Crisostomo Ibarra, Maria Clara, Elias, Sisa (inialay sa Inang Bayan). EL FILIBUSTERISMO ('Ang Paghahari ng Kasakiman', 1891 Ghent) — Simoun, Basilio, Isagani (inialay sa GOMBURZA!). Lope K. Santos = Banaag at Sikat & Ama ng Balarilang Tagalog!" }
      ],
      cheatCode: "Korido = 8 pantig (Ibong Adarna); Awit = 12 pantig (Florante at Laura — Balagtas). Tanaga = 7-7-7-7; Haiku = 5-7-5. Noli → Inang Bayan; El Fili → GOMBURZA!",
      visualizerId: "filipinoWikaLab",
      bruteforce: true,
      questions: [
        { type: "mc", prompt: "Ano ang sukat ng pantig ng KORIDO (Ibong Adarna) kumpara sa AWIT (Florante at Laura)?", options: ["Korido = 8 pantig; Awit = 12 pantig", "Korido = 12 pantig; Awit = 8 pantig", "Parehong 7 pantig", "Korido = 5 pantig; Awit = 14 pantig"], answer: "Korido = 8 pantig; Awit = 12 pantig", hint: "Tandaan: Mas maikli ang pantig ng mabilis na Korido (8), mas mahaba ang Awit (12)!", whyEasy: "Korido (8, mabilis: Ibong Adarna) vs Awit (12, mabagal: Florante at Laura)!" },
        { type: "mc", prompt: "Kanino inialay ni Dr. José Rizal ang nobelang 'El Filibusterismo'?", options: ["Sa tatlong paring martir na GOMBURZA", "Kay Leonor Rivera", "Kay Miguel López de Legazpi", "Sa Hari ng Espanya"], answer: "Sa tatlong paring martir na GOMBURZA", hint: "Ang Noli ay para sa Inang Bayan; ang mas madilim na El Fili ay para sa mga pinaslang noong 1872!", whyEasy: "Inialay ni Rizal ang El Filibusterismo sa alaala nina Gómez, Burgos, at Zamora (GOMBURZA)!" },
        { type: "mc", prompt: "Ano ang tamang sukat ng tradisyonal na Pilipinong tulang TANAGA?", options: ["4 taludtod na may 7 pantig bawat isa (7-7-7-7)", "3 taludtod na 5-7-5", "14 taludtod na may 10 pantig", "2 taludtod na 12-12"], answer: "4 taludtod na may 7 pantig bawat isa (7-7-7-7)", hint: "Katutubong tulang Tagalog bago pa dumating ang mga Espanyol — mas puno kaysa Haiku!", whyEasy: "Tanaga = 7-7-7-7 (4 linya, 7 pantig); Haiku = 5-7-5 (3 linya)!" },
        { type: "mc", prompt: "Aling epiko ng mga Ilocano ang tumatalakay sa batang ipinanganak na nakakapagsalita agad?", options: ["Biag ni Lam-ang", "Hudhud", "Ibalon", "Hinilawod"], answer: "Biag ni Lam-ang", hint: "Si Lam-ang ay naghanap sa kanyang ama at nagpakasal kay Ines Kannoyan!", whyEasy: "Biag ni Lam-ang ('Buhay ni Lam-ang') ang tanyag na epiko ng Ilocos!" },
        { type: "mc", prompt: "Sino ang kinikilalang 'Ama ng Balarilang Tagalog' at may-akda ng nobelang 'Banaag at Sikat'?", options: ["Lope K. Santos", "Francisco Balagtas", "Severino Reyes", "Amado V. Hernandez"], answer: "Lope K. Santos", hint: "Pinangunahan niya ang sistematisasyon ng balarila (grammar) ng wikang pambansa!", whyEasy: "Si Lope K. Santos ang Ama ng Balarilang Tagalog; si Balagtas ang Ama ng Panulaang Tagalog!" }
      ]
    },

    // ---------- WORLD 15: ABSTRACT SHAPES & SPATIAL REASONING (6 NODES) ----------
    {
      id: "abs-rotations-reflections",
      worldId: "abstract_shapes",
      order: 123,
      title: "Shape Rotations (90°/180°), Flips & Chirality",
      icon: "🔄",
      tagline: "Track ONE corner or dot! Rotation keeps handedness (same hand); Mirror Flip reverses it — impossible by rotation alone!",
      scaryVersion: "2D Euclidean rigid isometries (SO(2) rotations vs orientation-reversing reflections).",
      easyTruth: "Never try to rotate a whole busy shape in your head at once! Pick ONE unique landmark (like a dot or short flag arm) and spin ONLY that compass pointer: N → E → S → W is +90° Clockwise! And ALWAYS check Mirror Flip (chirality): if an L turns into a backwards ⅃, NO amount of spinning can fix it!",
      microSteps: [
        { label: "Step 1: The Clock-Compass Trick (90° CW vs CCW)", text: "Imagine a clock: 12 → 3 → 6 → 9 is Clockwise (+90° CW). 12 → 9 → 6 → 3 is Counterclockwise (−90° CCW). 180° flips Top ↔ Bottom AND Left ↔ Right simultaneously — and +270° CW is identical to −90° CCW!" },
        { label: "Step 2: Rotation vs Mirror Reflection (Chirality Trap!)", text: "Take an asymmetric letter like 'R' or 'L'. Spinning it flat on a table NEVER turns 'L' into '⅃'! A Reflection (Horizontal or Vertical flip) reverses handedness. On exams, 1 of 4 choices is almost ALWAYS a sneaky mirror-flip!" },
        { label: "Step 3: Symmetry Order Quick Count", text: "A regular n-gon (equilateral triangle n=3, square n=4, regular hexagon n=6) has BOTH n lines of reflection symmetry AND rotational symmetry of order n (minimum turn = 360° ÷ n)!" }
      ],
      cheatCode: "Track 1 landmark (N→E→S→W = +90° CW; +270° CW = −90° CCW). Check handedness FIRST to spot sneaky Mirror-Flip traps! Regular n-gon min turn = 360°/n.",
      visualizerId: "abstractShapesLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "The blue L-shape + amber dot rotates +90° Clockwise each box. Pick the matching 4th tile (?):",
          visualSvg: svgRotationStrip(0, 90, 3),
          options: ["Top-Right corner (270°)", "Bottom-Right corner (0°)", "Bottom-Left corner (90°)", "Top-Left corner (180°)"],
          optionSvgs: {
            "Top-Right corner (270°)": svgLTile(270, false),
            "Bottom-Right corner (0°)": svgLTile(0, false),
            "Bottom-Left corner (90°)": svgLTile(90, false),
            "Top-Left corner (180°)": svgLTile(180, false)
          },
          answer: "Top-Right corner (270°)",
          hint: "Trace ONLY the amber dot clockwise: Box 1 = Bottom-Right → Box 2 = Bottom-Left → Box 3 = Top-Left → Box 4 = ?",
          whyEasy: "Bottom-Right → Bottom-Left → Top-Left → Top-Right! Tracking 1 dot solves it in 2 seconds!"
        },
        { type: "mc", prompt: "Rotating a shape 270° Clockwise gives the EXACT SAME final orientation as rotating it:", options: ["90° Counterclockwise", "180° Clockwise", "90° Clockwise", "Horizontal Mirror Flip"], answer: "90° Counterclockwise", hint: "Full circle is 360°: going +270° CW leaves 90° the short way back!", whyEasy: "270° + 90° = 360°! Whenever a question says '270° CW', just turn 90° CCW!" },
        { type: "mc", prompt: "Can you turn the letter 'F' into its mirror image 'ꟻ' using ONLY 2D flat rotations (no lifting off the page)?", options: ["No — reflection reverses handedness (chirality)!", "Yes, rotate 180°", "Yes, rotate 90° CW", "Yes, rotate 270°"], answer: "No — reflection reverses handedness (chirality)!", hint: "Try spinning 'F' upside-down: the arms point left AND downward, not left AND upward!", whyEasy: "Rotations preserve orientation; flips reverse it — your #1 weapon on Abstract Odd-One-Out tests!" },
        { type: "input", prompt: "What is the smallest positive rotation angle (in degrees) that maps a regular HEXAGON (6 equal sides) onto itself?", answer: "60", hint: "Divide a full 360° circle by the number of equal sides (6)!", whyEasy: "360° ÷ 6 = 60°! (Square = 90°, Pentagon = 72°, Hexagon = 60°!)" },
        { type: "mc", prompt: "If you reflect a shape across a VERTICAL mirror AND then across a HORIZONTAL mirror, the combined result is identical to:", options: ["A 180° rotation!", "Back to original (0°)", "A 90° CW rotation", "A 45° tilt"], answer: "A 180° rotation!", hint: "Flip Left↔Right (x → −x) AND Flip Top↔Bottom (y → −y) → (−x, −y)!", whyEasy: "Two perpendicular mirror flips cancel chirality reversal and produce a pure 180° turn!" }
      ]
    },
    {
      id: "abs-shape-sequences-progression",
      worldId: "abstract_shapes",
      order: 124,
      title: "Visual Shape Sequences: Split Every Layer!",
      icon: "🧩",
      tagline: "Never stare at the whole picture! Track ONE trait at a time: (1) Sides/Count, (2) Position hop, (3) Shading toggle!",
      scaryVersion: "Multi-attribute visual inductive series and decoupled geometric state transitions.",
      easyTruth: "Abstract test makers look clever by changing 2 or 3 tiny things at once (outer shape gains +1 side, shading alternates dark/light, and an inner dot jumps +1 corner!). Don't look at all 3 together — isolate Layer 1 to cross out 2 wrong answers, then Layer 2 to win immediately!",
      microSteps: [
        { label: "Step 1: The 4 Universal Visual Series Rules", text: "1) COUNT / SIDES: Triangle(3) → Square(4) → Pentagon(5) → Hexagon(6). 2) POSITION HOP: dot moves 1 step, then 2 steps, then 3 steps clockwise (+1, +2, +3!). 3) SHADING CYCLE: Solid → Striped → Empty → Solid. 4) SIZE / NESTING: inner shape becomes the next box's outer shape!" },
        { label: "Step 2: Decouple & Eliminate (2-Pass Method)", text: "Pass 1: Check ONLY the easiest feature (like shading alternating Dark–Light–Dark–Light) → instantly eliminate half the choices! Pass 2: Check position or side count on the remaining choices → 100% accuracy in half the time!" },
        { label: "Step 3: Watch Alternating Dual-Tracks (1–3–5 vs 2–4–6)", text: "If adjacent boxes seem unrelated, check ODD boxes (1st, 3rd, 5th) separately from EVEN boxes (2nd, 4th, 6th) — interlaced sequences are a classic exam twist!" }
      ],
      cheatCode: "Split layers! Check (1) Shading cycle, (2) Side count, (3) Corner hop (+1 or +1,+2,+3), (4) Alternating Odd/Even tracks!",
      visualizerId: "abstractShapesLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Inspect BOTH side count AND shading in this visual series. Pick the matching 4th tile (?):",
          visualSvg: svgPolySequence([3, 4, 5]),
          options: ["Unshaded Hexagon (6 sides)", "Shaded Hexagon (6 sides)", "Unshaded Heptagon (7 sides)", "Shaded Pentagon (5 sides)"],
          optionSvgs: {
            "Unshaded Hexagon (6 sides)": svgPolyTile(6, false),
            "Shaded Hexagon (6 sides)": svgPolyTile(6, true),
            "Unshaded Heptagon (7 sides)": svgPolyTile(7, false),
            "Shaded Pentagon (5 sides)": svgPolyTile(5, true)
          },
          answer: "Unshaded Hexagon (6 sides)",
          hint: "Layer 1 (sides): 3 → 4 → 5 → ?. Layer 2 (fill): Shaded → Unshaded → Shaded → ?",
          whyEasy: "Sides add +1 (→ 6, Hexagon) and fill alternates (Shaded, Unshaded, Shaded → Unshaded)!"
        },
        { type: "mc", prompt: "A dot sits on a clock face: Box 1 = 12:00, Box 2 = 1:00 (+1), Box 3 = 3:00 (+2), Box 4 = 6:00 (+3). Where is it in Box 5?", options: ["10:00 (+4)", "9:00 (+3)", "11:00 (+5)", "8:00 (+2)"], answer: "10:00 (+4)", hint: "Check the jump sizes: +1, +2, +3... what is the next jump?", whyEasy: "Accelerating jumps (+1, +2, +3, +4): 6:00 + 4 hours = 10:00!" },
        { type: "mc", prompt: "Sequence of nested pairs: [Square inside Circle], [Triangle inside Square], [Pentagon inside Triangle]. Next box?", options: ["Hexagon inside Pentagon", "Circle inside Hexagon", "Square inside Pentagon", "Pentagon inside Hexagon"], answer: "Hexagon inside Pentagon", hint: "Notice how each box's INNER shape becomes the next box's OUTER shape!", whyEasy: "Inner promotes to Outer (Pentagon becomes outer), while a new shape sits inside!" },
        { type: "mc", prompt: "A grid alternates: Box 1 has 1 black tile, Box 2 has 4, Box 3 has 9, Box 4 has 16. How many black tiles in Box 5?", options: ["25 (5²)", "20", "24", "32"], answer: "25 (5²)", hint: "Recognize the visual square numbers: 1×1, 2×2, 3×3, 4×4...", whyEasy: "Visual square growth: 5 × 5 = 25 tiles!" },
        { type: "mc", prompt: "What is the fastest strategy when an abstract sequence changes shape, shading, AND rotation simultaneously?", options: ["Isolate ONE trait at a time to eliminate wrong choices fast", "Try to imagine all three changes at once", "Always guess the busiest figure", "Ignore shading completely"], answer: "Isolate ONE trait at a time to eliminate wrong choices fast", hint: "Decoupling reduces brain overload to trivial 1-step checks!", whyEasy: "Checking shading alone usually kills 2 options; checking rotation kills the 3rd!" }
      ]
    },
    {
      id: "abs-raven-matrices-logic",
      worldId: "abstract_shapes",
      order: 125,
      title: "3×3 Raven Matrices: Sudoku Rule & XOR Merging",
      icon: "⊞",
      tagline: "80% of 3×3 IQ/CET matrices obey just 3 rules: Distribution-of-3 (Sudoku), Additive Overlay, or XOR (overlaps CANCEL)!",
      scaryVersion: "3×3 Raven's Progressive Matrix inductive inference and Boolean set-difference overlays.",
      easyTruth: "Those intimidating 3×3 shape grids on NMAT, UPCAT, and IQ tests aren't magic — they almost always run left-to-right across EACH row (and top-to-bottom down each column) using one of 3 super clean rules: (1) Every row has 1 Circle, 1 Square, 1 Triangle; (2) Col 1 + Col 2 = Col 3; or (3) XOR: matching lines CANCEL OUT!",
      microSteps: [
        { label: "Step 1: Distribution-of-3 ('Mini Sudoku' Rule)", text: "Check Row 1 and Row 2: does EVERY row contain one Circle, one Square, and one Triangle (plus one Solid, one Striped, one Hollow)? Then Row 3 simply needs whichever shape & fill are MISSING!" },
        { label: "Step 2: Overlay Addition vs Subtraction", text: "ADDITION: Lay Box 1 on top of Box 2 → keep EVERY line to form Box 3! SUBTRACTION / AND: keep ONLY the lines that appear in BOTH Box 1 and Box 2!" },
        { label: "Step 3: The Famous XOR Rule ('Overlaps Vanish!')", text: "The #1 high-score secret on hard 3×3 matrices: stack Box 1 on Box 2 — any line/dot present in ONLY ONE stays; any line present in BOTH cancels out and disappears! (Cross ⊕ Horizontal = Vertical!)" }
      ],
      cheatCode: "Test 3×3 rows in exact order: (1) Missing-of-3 (Sudoku), (2) Col1 + Col2 (Add), (3) XOR (Same lines CANCEL, unique lines STAY)!",
      visualizerId: "abstractShapesLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Under the XOR Matrix Rule (matching lines CANCEL OUT, unique lines STAY): Cross (+) ⊕ Horizontal (−) = ?",
          visualSvg: svgXorMatrixPreview(),
          options: ["Vertical line (|)", "Horizontal line (−)", "Cross (+)", "Empty box"],
          optionSvgs: {
            "Vertical line (|)": svgXorTile("vert"),
            "Horizontal line (−)": svgXorTile("horiz"),
            "Cross (+)": svgXorTile("cross"),
            "Empty box": svgXorTile("empty")
          },
          answer: "Vertical line (|)",
          hint: "Both boxes share the Horizontal bar, so it CANCELS! What is left over?",
          whyEasy: "Horizontal cancels Horizontal, leaving ONLY the Vertical bar (|)!"
        },
        {
          type: "mc",
          prompt: "In a 3×3 Distribution-of-3 matrix, Row 3 already contains [Solid Circle] and [Striped Square]. Pick the missing 3rd tile:",
          options: ["Hollow Triangle", "Solid Triangle", "Striped Circle", "Hollow Square"],
          optionSvgs: {
            "Hollow Triangle": svgNestedTile("tri", "hollow", null, null),
            "Solid Triangle": svgNestedTile("tri", "solid", null, null),
            "Striped Circle": svgNestedTile("circle", "striped", null, null),
            "Hollow Square": svgNestedTile("square", "hollow", null, null)
          },
          answer: "Hollow Triangle",
          hint: "Each row needs 1 Circle/Square/Triangle AND 1 Solid/Striped/Hollow!",
          whyEasy: "Missing shape = Triangle; missing fill = Hollow → Hollow Triangle!"
        },
        { type: "mc", prompt: "Row 1 has dot counts [2, 3, 5]. Row 2 has [4, 1, 5]. Row 3 has [3, 4, ?]. How many dots go in the missing cell?", options: ["7", "1", "12", "6"], answer: "7", hint: "Check Col 1 + Col 2 across Row 1 (2+3=5) and Row 2 (4+1=5)!", whyEasy: "Simple additive row rule: 3 + 4 = 7 dots!" },
        { type: "mc", prompt: "Under an AND (Intersection) matrix rule, Box 1 has [Top, Left, Diagonal] lines and Box 2 has [Bottom, Left, Diagonal]. Box 3 shows:", options: ["Only Left + Diagonal (shared lines!)", "All 4 lines combined", "Only Top + Bottom (unique lines!)", "Nothing"], answer: "Only Left + Diagonal (shared lines!)", hint: "AND keeps strictly what appears in BOTH Box 1 AND Box 2!", whyEasy: "Shared features = Left & Diagonal. (Note: XOR would have kept Top & Bottom instead!)" },
        { type: "mc", prompt: "When stuck on a 3×3 matrix looking left-to-right across rows, what should you ALWAYS check next?", options: ["Check TOP-TO-BOTTOM down Columns (and diagonals!)", "Guess randomly immediately", "Only look at the center cell", "Count pixels"], answer: "Check TOP-TO-BOTTOM down Columns (and diagonals!)", hint: "Many 3×3 matrices run vertically down columns or diagonally!", whyEasy: "Checking both rows AND columns verifies your rule with 100% certainty!" }
      ]
    },
    {
      id: "abs-odd-one-out-analogies",
      worldId: "abstract_shapes",
      order: 126,
      title: "Visual Analogies (A : B :: C : ?) & Odd-One-Out",
      icon: "🔍",
      tagline: "Write the verb from A → B ('invert shading + swap inner/outer'), then apply that EXACT verb to C!",
      scaryVersion: "Proportional visual-relational mapping and structural invariant anomaly detection.",
      easyTruth: "Visual analogies (`A is to B as C is to ?`) are just 'spot the transformation recipe'! Name the exact operation that turned A into B (e.g., 'rotate 90° CW and flip black ↔ white'), then apply that exact recipe to C. For Odd-One-Out, check: (1) Mirror flip, (2) Side count parity, (3) Touching vs overlapping!",
      microSteps: [
        { label: "Step 1: Build the A → B 'Transformation Recipe'", text: "Common recipes: (a) Swap Inner ↔ Outer shapes (Small Circle inside Big Square → Small Square inside Big Circle!), (b) Invert Colors (Black ↔ White), (c) Add/Remove 1 side or cut in half, (d) Rotate 90°/180°." },
        { label: "Step 2: The 5 Classic Odd-One-Out Traps", text: "4 figures share ONE hidden rule while 1 breaks it: (1) 3 are rotations of the same shape, 1 is MIRROR-FLIPPED! (2) 3 have an EVEN number of intersections/sides, 1 is ODD! (3) 3 have the dot INSIDE the shape, 1 has it OUTSIDE! (4) 3 are divided into EQUAL areas, 1 is unequal!" },
        { label: "Step 3: Double-Check Symmetry & Count", text: "If all 4 figures look totally different, count: Total Sides, Closed Loops/Regions, or Lines of Symmetry! (Example: A, H, M, O have vertical mirror symmetry — while F or N does not!)" }
      ],
      cheatCode: "Analogies: State A → B as a crisp 2-word verb, apply to C. Odd-One-Out: Check Mirror-Flip FIRST, then Count/Symmetry/Inside-vs-Outside!",
      visualizerId: "abstractShapesLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Visual Analogy — Swap Inner↔Outer shapes AND invert shading: [Black Triangle in White Square] : [White Square in Black Triangle] :: [Black Circle in White Pentagon] : ?",
          options: ["Small White Pentagon inside Big Black Circle", "Small Black Pentagon inside Big White Circle", "Small White Circle inside Big Black Pentagon", "Big White Pentagon inside Big White Circle"],
          optionSvgs: {
            "Small White Pentagon inside Big Black Circle": svgNestedTile("circle", "solid", "pent", "hollow"),
            "Small Black Pentagon inside Big White Circle": svgNestedTile("circle", "hollow", "pent", "solid"),
            "Small White Circle inside Big Black Pentagon": svgNestedTile("pent", "solid", "circle", "hollow"),
            "Big White Pentagon inside Big White Circle": svgNestedTile("circle", "hollow", "pent", "hollow")
          },
          answer: "Small White Pentagon inside Big Black Circle",
          hint: "Recipe A → B: Swap Inner ↔ Outer shapes AND invert their shading!",
          whyEasy: "Pentagon shrinks inside (White), Circle grows outside (Black)!"
        },
        { type: "mc", prompt: "Odd-One-Out (Symmetry Check): Which capital letter does NOT have a vertical line of mirror symmetry? A, H, M, N", options: ["N", "A", "H", "M"], answer: "N", hint: "Fold each letter left-to-right down the middle — which one fails to match?", whyEasy: "A, H, and M mirror perfectly left-to-right; N has 180° rotational symmetry instead!" },
        { type: "mc", prompt: "Analogy: [Square (4 sides) with 4 dots inside] : [Square with 2 dots] :: [Hexagon (6 sides) with 6 dots] : ?", options: ["Hexagon with 3 dots", "Triangle with 3 dots", "Hexagon with 4 dots", "Octagon with 3 dots"], answer: "Hexagon with 3 dots", hint: "Shape stayed identical; dot count was HALVED!", whyEasy: "Keep the Hexagon and halve 6 dots → 3 dots!" },
        {
          type: "mc",
          prompt: "Visual Odd-One-Out (Chirality Check): Three tiles are pure rotations of the same L-shape; ONE tile is mirror-flipped! Tap the Odd-One-Out:",
          options: ["Tile D (Mirror-flipped!)", "Tile A (0°)", "Tile B (90° CW)", "Tile C (180°)"],
          optionSvgs: {
            "Tile D (Mirror-flipped!)": svgLTile(0, true),
            "Tile A (0°)": svgLTile(0, false),
            "Tile B (90° CW)": svgLTile(90, false),
            "Tile C (180°)": svgLTile(180, false)
          },
          answer: "Tile D (Mirror-flipped!)",
          hint: "Three tiles can be spun flat on paper into each other; check which L points backwards!",
          whyEasy: "Tiles A, B, C keep identical handedness under rotation — Tile D is horizontally mirrored!"
        },
        { type: "mc", prompt: "Odd-One-Out: [Equilateral Triangle], [Square], [Regular Pentagon], [Right Scalene Triangle]. Which breaks the rule?", options: ["Right Scalene Triangle (unequal sides!)", "Equilateral Triangle", "Square", "Regular Pentagon"], answer: "Right Scalene Triangle (unequal sides!)", hint: "Check whether all sides and angles are equal!", whyEasy: "The first three are regular polygons (all sides/angles equal); a scalene triangle has 3 unequal sides!" }
      ]
    },
    {
      id: "abs-3d-cube-folding-nets",
      worldId: "abstract_shapes",
      order: 127,
      title: "3D Cube Folding & Opposite-Face Nets",
      icon: "🎲",
      tagline: "The 'Skip-One-In-A-Row' Law: Opposite faces on a cube can NEVER touch side-by-side — eliminates 90% of wrong choices instantly!",
      scaryVersion: "Polyhedral hexomino net topological folding and opposite-face adjacency constraints.",
      easyTruth: "You do NOT need superhuman 3D imagination to solve cube-folding questions! Just use the Golden Opposite-Face Rule: on ANY straight strip of 3 squares `[A][B][C]`, **A and C ALWAYS fold opposite each other** (skip 1 in between)! Since opposite faces can NEVER be seen touching at a corner at the same time, any 3D cube showing both A and C is INSTANTLY impossible!",
      microSteps: [
        { label: "Step 1: Skip-One-In-A-Row Opposite Rule", text: "In a standard cross net: Top ↔ Bottom (skipping Center), Left ↔ Right (skipping Center), and Center ↔ Far-Bottom (skipping Bottom)! Every cube has exactly 3 opposite pairs." },
        { label: "Step 2: The Z-Shape Opposite Rule (Staircase Nets)", text: "What if squares zig-zag like a letter Z? The two ends of a 4-square Z-shape (top-left end and bottom-right end) ALSO fold directly opposite each other! There are exactly 11 valid 6-square cube nets in geometry." },
        { label: "Step 3: Instant Elimination on 3D Cube Views", text: "A 3D picture of a cube shows 3 adjacent faces meeting at 1 corner. Test EVERY option against your 3 opposite pairs: if ANY pair of opposites appears together on the same 3D drawing, CROSS IT OUT immediately!" }
      ],
      cheatCode: "Skip-1 in a straight line = OPPOSITE faces! Opposites can NEVER appear together on a 3D view of a cube (and 11 valid cube nets exist)!",
      visualizerId: "abstractShapesLab",
      bruteforce: true,
      questions: [
        {
          type: "mc",
          prompt: "Fold this cross net into a 3D cube. Which face ends up DIRECTLY OPPOSITE face 'A'?",
          visualSvg: svgCubeCrossNet(["A", "B", "C", "D", "E", "F"]),
          options: ["E", "C", "F", "B"],
          answer: "E",
          hint: "Look down the vertical strip A – C – E – F: skip ONE square from A!",
          whyEasy: "Skip C → A is opposite E! (And B↔D, C↔F!)"
        },
        {
          type: "mc",
          prompt: "Using the exact same cross net (A↔E, B↔D, C↔F), which 3D cube view showing 3 touching faces is IMPOSSIBLE?",
          visualSvg: svgCubeCrossNet(["A", "B", "C", "D", "E", "F"]),
          options: ["A, C, and E touching", "A, B, and C touching", "C, D, and E touching", "A, D, and F touching"],
          answer: "A, C, and E touching",
          hint: "Check which choice tries to show two OPPOSITE faces side-by-side!",
          whyEasy: "A and E are opposite faces — they can NEVER touch on the same corner of a cube!"
        },
        { type: "input", prompt: "On a standard 6-sided gaming die, every pair of OPPOSITE faces sums to 7. What number is opposite 2?", answer: "5", hint: "7 − 2 = ?", whyEasy: "Standard die opposite pairs: 1↔6, 2↔5, 3↔4 (all add to 7)!" },
        { type: "mc", prompt: "In a straight row of 4 connected squares [1][2][3][4] inside a cube net, which pairs are opposite each other?", options: ["1↔3 and 2↔4", "1↔2 and 3↔4", "1↔4 and 2↔3", "None are opposite"], answer: "1↔3 and 2↔4", hint: "Apply the Skip-One rule twice along the 4-square strip!", whyEasy: "Folding a 4-strip wraps into a square tube: 1 faces 3, and 2 faces 4!" },
        { type: "mc", prompt: "How many distinct 6-square unfolded nets (ignoring rotations/flips) can validly fold into a closed cube?", options: ["11 valid nets", "4 valid nets", "6 valid nets", "24 valid nets"], answer: "11 valid nets", hint: "There are 35 hexominoes in math, and exactly 11 of them fold into a cube!", whyEasy: "Classic spatial fact: 11 valid cube nets (never any 2×2 solid square block or 5-in-a-row strip)!" }
      ]
    },
    {
      id: "abs-paper-folding-spatial-views",
      worldId: "abstract_shapes",
      order: 128,
      title: "Paper Folding, Hole Punching & 3D Orthographic Views",
      icon: "📐",
      tagline: "Unfold BACKWARDS step-by-step like a mirror! Each fold DOUBLES the holes (unless punched right ON the crease!).",
      scaryVersion: "Iterative reflectional unfolding symmetry and orthographic multiview 3D projection.",
      easyTruth: "Paper-folding questions feel scary until you unfold ONE crease at a time in reverse! Every crease is simply a mirror line: reflect every existing hole across the last crease, then the crease before that! And for 3D block stacks, Top View counts columns, while Front/Side views show the TALLEST tower in each column!",
      microSteps: [
        { label: "Step 1: Unfold Backwards (Mirror Across Last Fold First!)", text: "Fold a square in half Vertically (2 layers), then Horizontally (4 layers), and punch 1 hole near the center corner → unfolds to 4 symmetric holes (or 1 bigger diamond right at the center if punched ON the vertex!). Each fold doubles holes: 1 fold → 2 holes, 2 folds → 4 holes, 3 folds → 8 holes!" },
        { label: "Step 2: The Crease-Edge Shortcut", text: "Punching a hole strictly INSIDE the folded area creates 2× separate holes when unfolded. Punching a semicircle RIGHT ON a folded crease unfolds into 1 full circle centered ON that crease!" },
        { label: "Step 3: 3D Orthographic Blueprints (Top / Front / Side)", text: "TOP VIEW = footprint (which grid squares have ≥ 1 block). FRONT VIEW = maximum height in each left-to-right column (short blocks behind tall blocks are hidden!). SIDE VIEW = maximum height in each front-to-back row!" }
      ],
      cheatCode: "Unfold BACKWARDS reflecting across each crease (n folds = up to 2ⁿ holes!). Orthographic Front/Side view ALWAYS shows the TALLEST block in that line of sight!",
      visualizerId: "abstractShapesLab",
      bruteforce: true,
      questions: [
        {
          type: "input",
          prompt: "A square paper is folded in half vertically, then in half horizontally (4 layers total). You punch 1 small hole strictly in the middle of the folded square (not touching any crease). How many holes appear when completely unfolded?",
          visualSvg: svgPaperFoldPrompt(2),
          answer: "4",
          hint: "2 folds create 2² = 4 stacked layers!",
          whyEasy: "1 punch goes through all 4 layers → 4 symmetric holes when unfolded!"
        },
        {
          type: "mc",
          prompt: "Fold a square paper ONCE down the vertical center, then punch a hole near the upper-right of the crease. Pick the unfolded sheet:",
          visualSvg: svgPaperFoldPrompt(1),
          options: ["Symmetric top-left & top-right", "Stacked vertically on one side", "Opposite diagonal corners", "Single hole only"],
          optionSvgs: {
            "Symmetric top-left & top-right": svgPaperFoldTile([[22, 18], [42, 18]]),
            "Stacked vertically on one side": svgPaperFoldTile([[42, 18], [42, 46]]),
            "Opposite diagonal corners": svgPaperFoldTile([[18, 18], [46, 46]]),
            "Single hole only": svgPaperFoldTile([[42, 18]])
          },
          answer: "Symmetric top-left & top-right",
          hint: "Unfolding mirrors the hole across the vertical crease line!",
          whyEasy: "A vertical fold mirrors Left ↔ Right at the exact same height and distance from the crease!"
        },
        { type: "mc", prompt: "A square paper is folded in half vertically, then horizontally, and you snip off the FOLDED CENTER CORNER (where both creases meet). When completely unfolded, what shape is cut out of the paper?", options: ["A diamond/square hole right in the DEAD CENTER of the paper!", "4 tiny notches on the 4 outer corners", "2 triangles on the top edge", "The paper splits in half"], answer: "A diamond/square hole right in the DEAD CENTER of the paper!", hint: "Where do the two center creases cross on the unfolded sheet? Right at the center!", whyEasy: "Snipping the double-folded center vertex opens into 1 centered diamond hole (classic snowflake trick)!" },
        { type: "mc", prompt: "Looking at the FRONT orthographic view of a 3D cube stack: Column 1 has a 1-cube block in front of a 3-cube tower. How tall does Column 1 appear in the Front View?", options: ["3 cubes tall (tallest block in that column!)", "1 cube tall", "4 cubes tall (1 + 3)", "2 cubes tall (average)"], answer: "3 cubes tall (tallest block in that column!)", hint: "From straight ahead, the taller tower rises behind the shorter block!", whyEasy: "Orthographic views always trace the MAXIMUM height along each line of sight!" },
        { type: "input", prompt: "A paper is folded cleanly in half 3 times (creating 2³ layers) and 1 interior hole is punched. How many holes appear when unfolded?", answer: "8", hint: "Compute 2 × 2 × 2!", whyEasy: "Each clean half-fold doubles the layers: 2³ = 8 holes!" }
      ]
    }
  ];

  DATA.NODES.push(...HUMANITIES_NODES);

  // ==================== 6 NEW TRAPS (PH HISTORY, FILIPINO & ABSTRACT) ====================
  DATA.GRADE12_TRAPS.push(
    {
      id: "trap-magellan-vs-legazpi",
      title: "1521 Magellan ≠ Start of Spanish Rule!",
      trapExpression: "1521 (Magellan)  vs  1565 (Legazpi)",
      wrongGuess: "Magellan colonized the Philippines in 1521",
      rightAnswer: "Legazpi began colonization in 1565 (44 yrs later!)",
      whyItHappens: "Magellan arrived in 1521 and died at Mactan — his expedition left! Permanent Spanish rule (333 years, 1565–1898) started when Miguel López de Legazpi settled Cebu in 1565.",
      quickRule: "1521 = First European Contact (Magellan/Lapu-Lapu). 1565 = Start of Spanish Colonization (Legazpi)!",
      quiz: {
        prompt: "Spanish colonial rule lasted 333 years starting in which year and under whom?",
        options: ["1565 — Miguel López de Legazpi", "1521 — Ferdinand Magellan", "1571 — Lapu-Lapu", "1898 — Emilio Aguinaldo"],
        answer: "1565 — Miguel López de Legazpi",
        explanation: "1565 + 333 = 1898! Legazpi established the first permanent Spanish settlement in Cebu (1565)."
      }
    },
    {
      id: "trap-jacinto-vs-mabini",
      title: "Brains of Katipunan vs Brains of Revolution",
      trapExpression: "Emilio Jacinto  ≠  Apolinario Mabini",
      wrongGuess: "Mabini wrote the Kartilya ng Katipunan",
      rightAnswer: "Jacinto = Katipunan (Kartilya); Mabini = Revolution (Malolos)",
      whyItHappens: "Both are called 'Brains of the...' so students swap them on UPCAT & Civil Service exams every year!",
      quickRule: "J → K (Jacinto → Katipunan/Kartilya). M → R (Mabini → Revolution/Republic)!",
      quiz: {
        prompt: "Match the title correctly: Who was the 'Brains of the Katipunan'?",
        options: ["Emilio Jacinto", "Apolinario Mabini", "Marcelo H. del Pilar", "Gregorio del Pilar"],
        answer: "Emilio Jacinto",
        explanation: "J is right next to K in the alphabet: Jacinto = Katipunan (Kartilya)!"
      }
    },
    {
      id: "trap-ng-vs-nang",
      title: "Filipino #1 Trap: NG vs NANG",
      trapExpression: "'Tumakbo ___ mabilis'  vs  'Bumili ___ tubig'",
      wrongGuess: "Using 'ng' for everything",
      rightAnswer: "Tumakbo NANG mabilis (paano); Bumili NG tubig (noun)",
      whyItHappens: "They sound identical when spoken fast! But 'nang' modifies verbs (manner, time, repeated action, upang) while 'ng' marks nouns/objects/possession.",
      quickRule: "Ask: Noun/owner? → NG. How/When/So-that/Repeated verb? → NANG!",
      quiz: {
        prompt: "Piliin ang tama: 'Kumain siya ___ mabilis upang hindi mahuli.'",
        options: ["nang", "ng", "rin", "daw"],
        answer: "nang",
        explanation: "'Mabilis' describes HOW he ate (pang-abay na pamaraan) → always NANG!"
      }
    },
    {
      id: "trap-din-rin-exception",
      title: "Filipino Din/Rin & Daw/Raw Rule",
      trapExpression: "'Ako rin'  vs  'Lakad din'  vs  'Maaari din'",
      wrongGuess: "Always use 'rin' after any vowel including 'ri'",
      rightAnswer: "Vowel/W/Y → RIN/RAW, EXCEPT -ra/-ri/-raw/-ray → DIN/DAW!",
      whyItHappens: "Saying 'maaari rin' or 'araw raw' collides two R sounds awkwardly, so KWF rules switch back to D ('maaari din', 'araw daw')!",
      quickRule: "Vowel/W/Y → Rin/Raw; Consonant or ending in -r/-ri/-raw → Din/Daw!",
      quiz: {
        prompt: "Alin ang wastong pares ayon sa tuntunin ng Din/Rin?",
        options: ["Ikaw rin; Aklat din", "Ikaw din; Aklat rin", "Ako din; Bahay din", "Tayo din; Sapatos rin"],
        answer: "Ikaw rin; Aklat din",
        explanation: "'Ikaw' ends in W → rin; 'Aklat' ends in consonant T → din!"
      }
    },
    {
      id: "trap-rotation-vs-mirror",
      title: "Abstract Shapes: Sneaky Mirror-Flip Trap",
      trapExpression: "Rotate 'L' 90°/180°/270°  ≠  Mirror '⅃'",
      wrongGuess: "Thinking a mirrored shape is just rotated 180°",
      rightAnswer: "Rotation NEVER flips handedness — mirror is a totally different shape!",
      whyItHappens: "Under time pressure, eyes match the silhouette and forget to check which side a hook or dot points toward!",
      quickRule: "Imagine walking along the shape from tail to tip: does the arm point LEFT or RIGHT? Rotations NEVER swap left/right!",
      quiz: {
        prompt: "An upright letter 'P' is rotated 180° flat on paper. Its loop is now at the bottom pointing:",
        options: ["Bottom-Left (like 'd')", "Bottom-Right (like 'b')", "Top-Left (like 'q')", "Top-Right (like 'P')"],
        answer: "Bottom-Left (like 'd')",
        explanation: "180° swaps Top→Bottom AND Right→Left, turning P into d (never b — 'b' is a vertical mirror flip)!"
      }
    },
    {
      id: "trap-cube-opposite-touch",
      title: "3D Cube Net Trap: Opposite Faces Touching",
      trapExpression: "Strip [1][2][3]  ⇒  1 and 3 are OPPOSITE",
      wrongGuess: "Picking a 3D cube showing both 1 and 3 on the same corner",
      rightAnswer: "Skip-1 faces fold OPPOSITE — they can NEVER touch!",
      whyItHappens: "Test-takers try to mentally fold all 6 faces at once instead of checking the 3 opposite pairs first.",
      quickRule: "List the 3 opposite pairs FIRST (skip 1 in a row) and instantly cross out any 3D option showing an opposite pair together!",
      quiz: {
        prompt: "In a cube net, if Star is opposite Circle, and Moon is opposite Sun, which 3D cube view MUST be eliminated?",
        options: ["A cube showing Star, Circle, and Moon together", "A cube showing Star, Moon, and Triangle", "A cube showing Circle, Sun, and Cross", "A cube showing Star, Sun, and Cross"],
        answer: "A cube showing Star, Circle, and Moon together",
        explanation: "Star and Circle are opposites — they can NEVER appear adjacent on the same 3D cube view!"
      }
    }
  );

  // ==================== 3 NEW DIAGNOSTIC QUESTIONS ====================
  DATA.DIAGNOSTIC_QUESTIONS.push(
    {
      id: "diag-ph-civics",
      topicLabel: "PH History & 1987 Constitution",
      targetNodeId: "ph-constitution-three-branches",
      prompt: "Under the 1987 Philippine Constitution, which principle determines citizenship by birth, and what vote overrides a Presidential veto?",
      options: ["Jus Sanguinis (blood) & 2/3 vote of both Houses", "Jus Soli (soil) & simple majority", "Jus Sanguinis & Supreme Court vote", "Property test & unanimous Senate"],
      answer: "Jus Sanguinis (blood) & 2/3 vote of both Houses",
      whyItMatters: "Philippine History & Civics form a core pillar of citizenship and entrance exams!"
    },
    {
      id: "diag-filipino-wika",
      topicLabel: "Filipino: Wika at Wastong Gamit",
      targetNodeId: "fil-ng-nang-din-rin-traps",
      prompt: "Piliin ang wastong pares: 'Sumulat siya ___ mabilis ___ liham para sa kanyang ina.'",
      options: ["nang ... ng", "ng ... nang", "nang ... nang", "ng ... ng"],
      answer: "nang ... ng",
      whyItMatters: "Mastering Ng vs Nang, Din/Rin, and Diin boosts Filipino reading & exam scores immediately!"
    },
    {
      id: "diag-abstract-shapes",
      topicLabel: "Abstract Shapes & Spatial Logic",
      targetNodeId: "abs-raven-matrices-logic",
      prompt: "In a 3×3 XOR visual matrix (matching lines cancel out), merging [Square + Diagonal] with [Diagonal only] leaves:",
      options: ["Square only (the matching Diagonal cancels!)", "Square + two Diagonals", "Diagonal only", "Empty box"],
      answer: "Square only (the matching Diagonal cancels!)",
      whyItMatters: "XOR merging, chirality checks, and Skip-1 cube nets crack IQ, NMAT & Civil Service abstract reasoning!"
    }
  );

  // ==================== 3 NEW SYNTHESIS BOSSES ====================
  DATA.SYNTHESIS_PROBLEMS.push(
    {
      id: "synth-ph-timeline-civics",
      title: "Archipelago Law & Timeline Chain",
      topics: ["PH History", "1987 Constitution", "Bill of Rights"],
      prompt: "Trace the legal chain: (1) Asia's first constitutional republic was inaugurated in Malolos in 1899. (2) After EDSA 1986, the 1987 Constitution restricted Martial Law to 60 days. If Congress passes a human-rights bill, the President vetoes it, and BOTH the Senate (18/24) and House (70%) vote to override — what happens?",
      options: ["It becomes LAW (both exceed 2/3 override threshold!)", "It dies because Presidential vetoes are final", "It goes to the Supreme Court for signature", "It waits 60 days under Martial Law"],
      answer: "It becomes LAW (both exceed 2/3 override threshold!)",
      stepsChain: [
        "Check Senate override threshold: 2/3 of 24 Senators = 16 votes → 18 ≥ 16 ✓!",
        "Check House override threshold: 2/3 = 66.7% → 70% ≥ 66.7% ✓!",
        "Because BOTH chambers reached ≥ 2/3, the Presidential veto is overridden and the bill becomes law!"
      ]
    },
    {
      id: "synth-filipino-mastery",
      title: "Wika + Tayutay + Panitikan Boss",
      topics: ["Wastong Gamit", "Tayutay", "Panitikan"],
      prompt: "Suriin ang pahayag: 'Sumasayaw ang mga dahon habang nagbabasa siya ___ tahimik ng Florante at Laura.' Tukuyin ang (1) tamang ng/nang, (2) tayutay, at (3) sukat ng akda!",
      options: ["nang · Personipikasyon · Awit (12 pantig)", "ng · Simili · Korido (8 pantig)", "nang · Metapora · Tanaga (7 pantig)", "ng · Hyperbole · Awit (12 pantig)"],
      answer: "nang · Personipikasyon · Awit (12 pantig)",
      stepsChain: [
        "Wastong Gamit: 'tahimik' answers PAANO siya nagbabasa → NANG!",
        "Tayutay: 'Sumasayaw ang mga dahon' gives human action to leaves → Personipikasyon (Pagsasatao)!",
        "Panitikan: Florante at Laura by Balagtas is an AWIT with 12 syllables per line!"
      ]
    },
    {
      id: "synth-abstract-triple-layer",
      title: "3-Layer Spatial Rotation + Folding Boss",
      topics: ["Rotations", "Paper Folding", "Cube Nets"],
      prompt: "Triple Spatial Check: (1) Rotate an arrow pointing North by +270° CW, then reflect vertically (Top↔Bottom). (2) Fold a paper in half TWICE and punch 1 interior hole. Results?",
      options: ["Arrow points WEST; 4 holes when unfolded", "Arrow points EAST; 2 holes when unfolded", "Arrow points SOUTH; 4 holes when unfolded", "Arrow points WEST; 2 holes when unfolded"],
      answer: "Arrow points WEST; 4 holes when unfolded",
      stepsChain: [
        "+270° CW is the same as −90° CCW: North turns to WEST!",
        "Reflecting vertically (Top↔Bottom) leaves a horizontal West arrow STILL pointing WEST!",
        "2 half-folds create 2² = 4 stacked layers → 1 interior punch yields 4 holes!"
      ]
    }
  );

  // ==================== 3 NEW BADGES ====================
  DATA.BADGES.push(
    {
      id: "ph_historian",
      emoji: "🇵🇭",
      title: "Archipelago Historian",
      description: "Conquer 3+ skills in Philippine History & Civics",
      check: (st) => DATA.NODES.filter((n) => n.worldId === "ph_history" && (st.nodeMastery[n.id] || 0) >= 1).length >= 3
    },
    {
      id: "filipino_makata",
      emoji: "📜",
      title: "Pantas ng Wika",
      description: "Conquer 3+ skills in Filipino (Wika at Pagbasa)",
      check: (st) => DATA.NODES.filter((n) => n.worldId === "filipino" && (st.nodeMastery[n.id] || 0) >= 1).length >= 3
    },
    {
      id: "spatial_visionary",
      emoji: "🔷",
      title: "Spatial Visionary",
      description: "Conquer 3+ Abstract Shapes & Visual Reasoning skills",
      check: (st) => DATA.NODES.filter((n) => n.worldId === "abstract_shapes" && (st.nodeMastery[n.id] || 0) >= 1).length >= 3
    }
  );

  // ==================== MEMORIZE VAULT REFERENCE DATA ====================
  DATA.MEMORIZE_DATA.phHistoryCards = [
    { era: "900 CE", title: "Laguna Copperplate Inscription", detail: "Oldest known written PH document (Kawi script, debt pardon) — proves literate pre-colonial trade!" },
    { era: "1521", title: "Magellan & Battle of Mactan", detail: "April 27, 1521: Lapu-Lapu defeated Magellan. First European contact (NOT start of colonization!)." },
    { era: "1565", title: "Legazpi Settles Cebu", detail: "True start of 333 years of Spanish colonial rule (Manila capital 1571; Galleon Trade)." },
    { era: "1872", title: "GOMBURZA Martyrdom", detail: "Execution of Gómez, Burgos, Zamora after Cavite Mutiny — ignited Rizal & Filipino nationalism." },
    { era: "1892–1896", title: "La Liga, KKK & Cry of Pugad Lawin", detail: "Rizal's Liga (reform) → Bonifacio's Katipunan (independence, Jacinto's Kartilya) → Aug 1896 Revolution." },
    { era: "June 12, 1898", title: "Philippine Independence (Kawit)", detail: "Proclaimed by Aguinaldo; Jan 23, 1899 Malolos Republic became Asia's FIRST constitutional republic!" },
    { era: "1898–1935", title: "Treaty of Paris → Commonwealth", detail: "$20M sale → Phil-Am War → Thomasites (1901) → Jones (1916) → Tydings-McDuffie (1934) → Quezon (1935)." },
    { era: "1942–1946", title: "WWII, Bataan & Third Republic", detail: "April 9, 1942 Fall of Bataan → Leyte 1944 → July 4, 1946 Independence (Roxas); Macapagal restored June 12!" },
    { era: "1972–1986", title: "Martial Law & EDSA People Power", detail: "Proc. 1081 (Sept 21, 1972) → Ninoy (1983) → Peaceful EDSA Revolution (Feb 22–25, 1986) → 1987 Constitution." },
    { era: "1987 Const.", title: "3 Branches & Checks/Balances", detail: "Congress (24 Sen + House), President (1×6yr, age 40+), SC (15 Justices, retire 70). 2/3 overrides veto!" },
    { era: "Article III", title: "Bill of Rights & Writs", detail: "Due Process, Miranda Rights, Presumed Innocent, No Double Jeopardy, Habeas Corpus, No Ex Post Facto." },
    { era: "Civics & ASEAN", title: "Jus Sanguinis, RA 7160 & ASEAN", detail: "Citizenship by blood; 18+ suffrage (0 literacy test); COA/COMELEC/CSC; UN (1945) & ASEAN (1967) founding member!" }
  ];

  DATA.MEMORIZE_DATA.filipinoCards = [
    { cat: "4 Diin", front: "Malumay vs Malumi (`)", back: "Parehong penultima ang diin: Malumay = tuloy-tuloy (bása = read); Malumi = may impit sa dulo (luhà, batà, punò)!" },
    { cat: "4 Diin", front: "Mabilis (´) vs Maragsa (^)", back: "Parehong HULING pantig: Mabilis = tuloy-tuloy (takbó); Maragsa = may impit sa dulo (basâ = wet, dugô)!" },
    { cat: "Wastong Gamit", front: "NG vs NANG", back: "NANG = noong / upang / paano / inuulit na pandiwa ('takbo nang takbo'). NG = pangngalan / may-ari ('bumili ng libro')!" },
    { cat: "Wastong Gamit", front: "RIN/RAW vs DIN/DAW", back: "RIN/RAW pagkatapos ng Patinig, W, Y ('ako rin, ikaw raw'). DIN/DAW pagkatapos ng Katinig o -ri/-raw ('lakad din, maaari din')!" },
    { cat: "Wastong Gamit", front: "Pahirin vs Pahiran · Pinto vs Pintuan", back: "Pahirin = wipe OFF (luha); Pahiran = apply ON (mantikilya). Pinto = door panel; Pintuan = doorway!" },
    { cat: "Pokus", front: "Pokus ng Pandiwa (Hanapin ang ANG/SI)", back: "Aktor (-um-/mag-), Layon (-in), Ganapan (pinag-...-an), Tagatanggap (ipag-), Gamit (ipang-)!" },
    { cat: "Tayutay", front: "Simili · Metapora · Personipikasyon · Hyperbole", back: "Simili = 'parang/tila'; Metapora = direkta; Personipikasyon = kilos-tao; Hyperbole = sobra; Ironya = sarkastiko!" },
    { cat: "Sawikain", front: "Klasikong Idyoma", back: "Butas bulsa (walang pera), Nagbibilang ng poste (walang trabaho), Balat-sibuyas (sensitibo), Ningas-kugon (simula lang)!" },
    { cat: "Panitikan", front: "Korido (8) vs Awit (12) · Tanaga (7-7-7-7)", back: "Ibong Adarna = Korido (8 pantig); Florante at Laura = Awit (12, Balagtas); Tanaga = 7-7-7-7; Haiku = 5-7-5!" },
    { cat: "Pagbasa", front: "6 Uri ng Teksto", back: "Impormatibo (datos), Deskriptibo (pandama), Naratibo (kuwento), Prosidyural (hakbang), Persuweysib (hikayat), Argumentatibo (ebidensya)!" }
  ];

  // ==================== PROCEDURAL QUESTION GENERATORS (20 NODES) ====================
  const prevGen = DATA.generateProceduralQuestion;
  DATA.generateProceduralQuestion = function (nodeId) {
    switch (nodeId) {
      case "ph-precolonial-spanish": {
        const bank = [
          { prompt: "What 900 CE artifact is the oldest known written document in the Philippines?", options: ["Laguna Copperplate Inscription", "Kartilya ng Katipunan", "Treaty of Paris", "Malolos Constitution"], answer: "Laguna Copperplate Inscription", hint: "Found in Laguna, written in ancient Kawi script!", whyEasy: "Proves organized pre-colonial law & trade in 900 CE!" },
          { prompt: "Who led the 1565 expedition that began permanent Spanish colonization in Cebu?", options: ["Miguel López de Legazpi", "Ferdinand Magellan", "Emilio Aguinaldo", "José Basco"], answer: "Miguel López de Legazpi", hint: "Arrived 44 years after Magellan's 1521 voyage!", whyEasy: "Legazpi founded Cebu (1565) and Manila (1571)!" },
          { prompt: "What fee could Filipino men pay to be exempted from Polo y Servicio forced labor?", options: ["Falla", "Cedula", "Bandala", "Tributo"], answer: "Falla", hint: "Only wealthy families could afford this exemption fee!", whyEasy: "Paying the 'falla' exempted a polista from 40 days of forced labor!" },
          { prompt: "Which pre-colonial Visayan/Tagalog alipin lived in their OWN house and owned property?", options: ["Aliping Namamahay", "Aliping Sagigilid", "Encomendero", "Peninsulares"], answer: "Aliping Namamahay", hint: "Bahay = house → Na-ma-ma-hay!", whyEasy: "Aliping Namamahay had their own home; Sagigilid lived in the master's household!" },
          { prompt: "The Manila–Acapulco Galleon Trade linked the Philippines across the Pacific with:", options: ["Mexico (New Spain)", "Japan", "Australia", "England"], answer: "Mexico (New Spain)", hint: "Acapulco is a Pacific port in Mexico!", whyEasy: "Silver from Mexico traded for Asian silk and spices via Manila for 250 years!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "ph-propaganda-katipunan-rev": {
        const bank = [
          { prompt: "Who was the FIRST editor of the Propaganda newspaper 'La Solidaridad'?", options: ["Graciano López Jaena", "Andrés Bonifacio", "Emilio Aguinaldo", "Antonio Luna"], answer: "Graciano López Jaena", hint: "Founded it in Barcelona in 1889 before Marcelo H. del Pilar took over!", whyEasy: "López Jaena was 1st editor; Marcelo H. del Pilar ('Plaridel') was 2nd!" },
          { prompt: "What was Marcelo H. del Pilar's famous pen name in La Solidaridad?", options: ["Plaridel", "Laong Laan", "Pingkian", "Taga-Ilog"], answer: "Plaridel", hint: "An anagram of his surname 'del Pilar'!", whyEasy: "del Pilar → Plaridel! (Rizal = Laong Laan/Dimasalang; Jacinto = Pingkian!)" },
          { prompt: "Who authored the 'Kartilya ng Katipunan' moral code?", options: ["Emilio Jacinto", "Apolinario Mabini", "José Palma", "Felipe Calderón"], answer: "Emilio Jacinto", hint: "Brains of the Katipunan!", whyEasy: "Jacinto wrote the 14 teachings of the Kartilya at age 19!" },
          { prompt: "Who composed the music of the Philippine National Anthem (Marcha Nacional Filipina)?", options: ["Julián Felipe", "José Palma", "Marcela Agoncillo", "Juan Luna"], answer: "Julián Felipe", hint: "Felipe composed the melody; José Palma wrote the Spanish lyrics ('Filipinas')!", whyEasy: "Julián Felipe = music; José Palma = lyrics; Marcela Agoncillo = sewed the flag!" },
          { prompt: "What symbolic act marked the Cry of Pugad Lawin (August 1896) launching the Revolution?", options: ["Tearing of cedulas (Spanish residence tax certificates)", "Signing the Treaty of Paris", "Opening Suez Canal", "Establishing Malolos"], answer: "Tearing of cedulas (Spanish residence tax certificates)", hint: "Rejecting Spanish taxation & authority openly!", whyEasy: "Tearing cedulas declared irreversible defiance against Spanish rule!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "ph-american-japanese-ww2": {
        const bank = [
          { prompt: "How much did the U.S. pay Spain for the Philippines under the 1898 Treaty of Paris?", options: ["$20 million", "$2 million", "$100 million", "$500 thousand"], answer: "$20 million", hint: "Signed Dec 10, 1898 without Filipino representation!", whyEasy: "$20 million — sparking the Philippine-American War in Feb 1899!" },
          { prompt: "Which young Filipino general died defending Tirad Pass (Dec 1899) to cover Aguinaldo's retreat?", options: ["Gregorio del Pilar", "Antonio Luna", "Miguel Malvar", "Macario Sakay"], answer: "Gregorio del Pilar", hint: "The 'Boy General' at age 24!", whyEasy: "Gen. Gregorio del Pilar held Tirad Pass with 60 riflemen!" },
          { prompt: "Which 1916 U.S. law promised eventual independence and created an all-Filipino legislature?", options: ["Jones Law (Philippine Autonomy Act)", "Tydings-McDuffie Act", "Treaty of Paris", "RA 7160"], answer: "Jones Law (Philippine Autonomy Act)", hint: "Replaced the Philippine Commission with the Philippine Senate!", whyEasy: "Jones Law (1916) came first; Tydings-McDuffie (1934) set the 10-year Commonwealth!" },
          { prompt: "Who served as President of the wartime Second Philippine Republic during WWII (1943–1945)?", options: ["José P. Laurel", "Manuel L. Quezon", "Manuel Roxas", "Ramon Magsaysay"], answer: "José P. Laurel", hint: "Quezon went into exile in the U.S. while Laurel stayed in Manila!", whyEasy: "José P. Laurel led the Japanese-era Second Republic; Quezon & Osmeña led the Commonwealth in exile!" },
          { prompt: "In what year did Filipino women win the right to vote (Women's Suffrage plebiscite)?", options: ["1937", "1898", "1972", "1986"], answer: "1937", hint: "During the Commonwealth era under the 1935 Constitution — among the first in Asia!", whyEasy: "Over 447,000 Filipino women voted YES in the historic April 30, 1937 plebiscite!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "ph-martial-law-edsa-modern": {
        const bank = [
          { prompt: "Which Philippine President was beloved as the 'Champion of the Masses' and opened Malacañang to ordinary citizens?", options: ["Ramon Magsaysay", "Carlos P. Garcia", "Manuel Roxas", "Elpidio Quirino"], answer: "Ramon Magsaysay", hint: "Wore barong tagalog at his inauguration and walked through barrios!", whyEasy: "Ramon Magsaysay (1953–1957) transformed grassroots governance!" },
          { prompt: "What crucial 1983 event galvanized mass peaceful opposition leading toward EDSA 1986?", options: ["Assassination of Sen. Benigno 'Ninoy' Aquino Jr.", "Signing of ASEAN", "Fall of Bataan", "Jones Law"], answer: "Assassination of Sen. Benigno 'Ninoy' Aquino Jr.", hint: "Occurred on the tarmac of Manila International Airport on Aug 21, 1983!", whyEasy: "Ninoy's return and assassination united millions for democratic restoration!" },
          { prompt: "Which President restored June 12 as official Philippine Independence Day (1962)?", options: ["Diosdado Macapagal", "Ramon Magsaysay", "Corazon Aquino", "Fidel V. Ramos"], answer: "Diosdado Macapagal", hint: "Moved it from July 4 back to Kawit's June 12, 1898!", whyEasy: "Macapagal's Proclamation No. 28 honored Filipinos' own 1898 declaration!" },
          { prompt: "Under the 1987 Constitution, what is the maximum initial duration of Martial Law without Congressional extension?", options: ["60 days", "6 months", "1 year", "6 years"], answer: "60 days", hint: "Plus Congress can revoke it AND the Supreme Court can review its factual basis!", whyEasy: "60-day cap + dual legislative/judicial checks prevent permanent authoritarianism!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "ph-constitution-three-branches": {
        const bank = [
          { prompt: "Which branch of Philippine government has the exclusive power of Judicial Review to strike down unconstitutional laws?", options: ["Judiciary (Supreme Court)", "Executive (President)", "Senate only", "COMELEC"], answer: "Judiciary (Supreme Court)", hint: "Interprets the Constitution as final arbiter!", whyEasy: "Article VIII grants the Supreme Court Judicial Review over all branches!" },
          { prompt: "How long is one term for a Philippine Senator, and how many consecutive terms max?", options: ["6 years, max 2 consecutive terms", "3 years, max 3 consecutive terms", "6 years, single term only", "4 years, unlimited"], answer: "6 years, max 2 consecutive terms", hint: "House Reps = 3 yrs × 3 max; Senators = 6 yrs × 2 max!", whyEasy: "Senators serve 6-year terms (max 2 straight = 12 yrs); President gets 1 single 6-yr term!" },
          { prompt: "Where MUST all revenue/taxation and budget (appropriations) bills ORIGINATE exclusively?", options: ["House of Representatives", "Senate", "Supreme Court", "Office of the Vice President"], answer: "House of Representatives", hint: "Power of the purse starts in the chamber closest to local districts (Article VI Sec. 24)!", whyEasy: "Appropriation, revenue, and tariff bills must originate in the House of Representatives!" },
          { prompt: "What mandatory retirement age applies to Supreme Court Justices in the Philippines?", options: ["70 years old", "60 years old", "65 years old", "Lifetime with no limit"], answer: "70 years old", hint: "Article VIII Sec. 11 sets judicial tenure during good behavior until age 70!", whyEasy: "Justices serve until age 70 to protect judicial independence without lifetime entrenchment!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "ph-bill-of-rights-civics": {
        const bank = [
          { prompt: "A baby is born in Tokyo to two Filipino parents. Under PH law (Jus Sanguinis), is the baby a natural-born Filipino citizen?", options: ["Yes — citizenship follows parents' bloodline!", "No — only babies born on Philippine soil qualify", "Only after turning 21", "Only after passing a court exam"], answer: "Yes — citizenship follows parents' bloodline!", hint: "Jus Sanguinis = right of blood!", whyEasy: "If your mother OR father is Filipino at your birth, you are a natural-born Filipino!" },
          { prompt: "Which Constitutional safeguard stops the government from trying you a SECOND time for the same crime after acquittal?", options: ["Protection against Double Jeopardy", "Writ of Amparo", "Eminent Domain", "Police Power"], answer: "Protection against Double Jeopardy", hint: "Article III Sec. 21: 'twice put in jeopardy of punishment for the same offense'!", whyEasy: "Once acquitted on the merits, the state cannot endlessly re-prosecute you for the same offense!" },
          { prompt: "When the government takes private land for a public highway (Eminent Domain), what MUST it pay the owner?", options: ["Just compensation (fair market value)", "Zero pesos", "Double the neighbor's tax", "Only a thank-you letter"], answer: "Just compensation (fair market value)", hint: "Article III Sec. 9: 'Private property shall not be taken for public use without...'", whyEasy: "Public use + Just Compensation are mandatory constitutional limits on Eminent Domain!" },
          { prompt: "What minimum age is required to vote in Philippine national and local elections?", options: ["18 years old", "21 years old", "16 years old", "25 years old"], answer: "18 years old", hint: "Article V Sec. 1 — with NO literacy or property test!", whyEasy: "18+ Filipino citizens with residency requirements have the full right of suffrage!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "ph-local-gov-taxes-civic-life": {
        const bank = [
          { prompt: "Which Constitutional Commission enforces merit-based recruitment and examinations for government employees?", options: ["Civil Service Commission (CSC)", "COA", "COMELEC", "BIR"], answer: "Civil Service Commission (CSC)", hint: "Central HR agency of the Philippine government!", whyEasy: "CSC guards merit and fitness in civil service; COA audits money; COMELEC runs elections!" },
          { prompt: "Under the PH TRAIN income tax law, what makes personal income tax PROGRESSIVE?", options: ["Higher income brackets pay higher tax percentages (low earners ≤ ₱250k pay 0%)", "Everyone pays the exact same flat ₱10,000", "Lower earners pay higher percentages", "Only corporations pay it"], answer: "Higher income brackets pay higher tax percentages (low earners ≤ ₱250k pay 0%)", hint: "Rate climbs progressively with ability to pay!", whyEasy: "Progressive tax scales up with income, unlike flat regressive consumption taxes!" },
          { prompt: "Before filing minor neighborhood disputes in court, RA 7160 requires mediation at which barangay body?", options: ["Katarungang Pambarangay (Lupon Tagapamayapa)", "Supreme Court", "Senate Blue Ribbon", "COMELEC"], answer: "Katarungang Pambarangay (Lupon Tagapamayapa)", hint: "Community amicable settlement system!", whyEasy: "Barangay mediation resolves local disputes peacefully and unclogs courts!" },
          { prompt: "Which autonomous regional government in Mindanao was created by the Bangsamoro Organic Law (2018)?", options: ["BARMM", "NCR", "CAR", "CALABARZON"], answer: "BARMM", hint: "Bangsamoro Autonomous Region in Muslim Mindanao!", whyEasy: "BARMM replaced ARMM with a parliamentary regional government!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "world-history-revolutions-civ": {
        const bank = [
          { prompt: "Which ancient Greek city-state pioneered direct citizen democracy?", options: ["Athens", "Sparta", "Babylon", "Carthage"], answer: "Athens", hint: "Also home to Socrates, Plato, and the Parthenon!", whyEasy: "Athens invented demokratia ('rule by the people'); Sparta was a military oligarchy!" },
          { prompt: "What date & year was ASEAN founded by 5 nations including the Philippines?", options: ["August 8, 1967", "June 12, 1898", "October 24, 1945", "February 25, 1986"], answer: "August 8, 1967", hint: "Signed via the Bangkok Declaration!", whyEasy: "Aug 8 is celebrated annually as ASEAN Day!" },
          { prompt: "Which movement (14th–17th century Italy) sparked a 'rebirth' of art, humanism, and empirical science?", options: ["The Renaissance", "The Ice Age", "Feudalism", "The Cold War"], answer: "The Renaissance", hint: "French word literally meaning 'rebirth'!", whyEasy: "Da Vinci, Galileo, and Gutenberg bridged the medieval era into modern science!" },
          { prompt: "What geopolitical standoff (1947–1991) pitted the U.S. and USSR in nuclear deterrence & the Space Race without direct war?", options: ["The Cold War", "World War I", "The Napoleonic Wars", "The Crusades"], answer: "The Cold War", hint: "Ended with the fall of the Berlin Wall (1989) and USSR dissolution (1991)!", whyEasy: "The Cold War also pushed moon landings and early internet (ARPANET) tech!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "fil-ponolohiya-baybay-diin": {
        const bank = [
          { prompt: "Tukuyin ang bigkas ng salitang 'dugô' (may diin sa huling pantig at impit sa dulo):", options: ["Maragsa (^)", "Malumay", "Malumi (`)", "Mabilis (´)"], answer: "Maragsa (^)", hint: "Huling pantig + tuldik pakupya (^) = ?", whyEasy: "Maragsa = huling pantig na may impit (dugô, basâ, punô)!" },
          { prompt: "Tukuyin ang bigkas ng 'takbó' (diin sa huling pantig, tuloy-tuloy at WALANG impit):", options: ["Mabilis (´)", "Maragsa (^)", "Malumay", "Malumi (`)"], answer: "Mabilis (´)", hint: "Huling pantig + tuloy-tuloy = tuldik pahilis (´)!", whyEasy: "Mabilis = mabilis na bigkas sa dulo nang walang biglang tigil (takbó, bulaklák)!" },
          { prompt: "Aling salita ang naglalaman ng KLASTER (kambal-katinig sa iisang pantig)?", options: ["plato (pl-)", "bahay", "araw", "ilog"], answer: "plato (pl-)", hint: "Hanapin ang 2 magkasunod na katinig sa simula o dulo ng isang pantig!", whyEasy: "'pl-' sa 'pla-to' ay klaster (tulad ng trak, braso, klase)!" },
          { prompt: "Ano ang kahulugan ng 'punò' (Malumi) vs 'punô' (Maragsa)?", options: ["punò = tree/trunk; punô = full", "punò = full; punô = tree", "Parehong tree", "punò = start; punô = empty"], answer: "punò = tree/trunk; punô = full", hint: "Bigkasin: 'Punò ng mangga' vs 'Punô ang baso'!", whyEasy: "Malumi (punò) = tree; Maragsa (punô) = full!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "fil-bahagi-ng-pananalita": {
        const bank = [
          { prompt: "'Nagluto SI Tatay ng adobo.' Ano ang Pokus ng Pandiwa?", options: ["Tagaganap (Aktor)", "Layon", "Ganapan", "Gamit"], answer: "Tagaganap (Aktor)", hint: "Sino ang minarkahan ng 'SI'? Si Tatay — siya ang gumawa ng kilos!", whyEasy: "Kapag ang simuno (SI/ANG) ang gumagawa ng kilos, Pokus sa Tagaganap (Aktor)!" },
          { prompt: "'Ipinagbili ni Ana ng regalo SI Lola.' Ano ang Pokus ng Pandiwa?", options: ["Tagatanggap (Benepaktib)", "Gamit", "Ganapan", "Aktor"], answer: "Tagatanggap (Benepaktib)", hint: "Si Lola ang makikinabang/tatanggap ng regalo!", whyEasy: "'Ipinag-' + taong pinaglaanan = Pokus sa Tagatanggap!" },
          { prompt: "Aling anyo ng 'basa' ang nasa Aspektong KONTEMPLATIBO (magaganap pa lamang)?", options: ["magbabasa", "nagbasa", "nagbabasa", "kababasa"], answer: "magbabasa", hint: "Hinaharap (future) — mag- + inulit na unang pantig!", whyEasy: "Nagbasa (tapos), Nagbabasa (ngayon), Magbabasa (bukas — Kontemplatibo)!" },
          { prompt: "Sa 'Mabagal na lumakad ang pagong', ano ang bahagi ng pananalita ng 'Mabagal'?", options: ["Pang-abay (naglalarawan sa pandiwang 'lumakad')", "Pang-uri", "Panghalip", "Pang-ukol"], answer: "Pang-abay (naglalarawan sa pandiwang 'lumakad')", hint: "Paano lumakad ang pagong?", whyEasy: "Inilalarawan nito ang pandiwa ('lumakad') → Pang-abay na pamaraan!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "fil-ng-nang-din-rin-traps": {
        const bank = [
          { prompt: "Piliin ang wasto: 'Tawa ___ tawa ang mga bata sa palabas!'", options: ["nang", "ng", "din", "raw"], answer: "nang", hint: "Inuulit na pandiwa (tawa + tawa)!", whyEasy: "Sa pagitan ng inuulit na pandiwa (takbo nang takbo, kain nang kain), laging NANG!" },
          { prompt: "Piliin ang wasto: 'Hiniram niya ang payong ___ kanyang kaibigan.'", options: ["ng", "nang", "rin", "daw"], answer: "ng", hint: "Nagpapakita ng pagmamay-ari (of her friend)!", whyEasy: "Pagmamay-ari / pangngalan → laging NG!" },
          { prompt: "Piliin ang wasto: 'Malakas ___ ang ulan kagabi.' (pagkatapos ng 'Malakas')", options: ["din", "rin", "raw", "nang"], answer: "din", hint: "Nagtatapos sa katinig na 's' ang 'Malakas'!", whyEasy: "Katinig → DIN / DAW! Patinig/W/Y → RIN / RAW!" },
          { prompt: "Piliin ang wasto: '___ mo kung masarap ang bagong kape.' (Test quality)", options: ["Subukin", "Subukan", "Pahiran", "Pahirin"], answer: "Subukin", hint: "Subuk-IN = suriin ang kalidad; Subuk-AN = manmanan nang palihim!", whyEasy: "Subukin = test quality; Subukan = spy/observe secretly!" },
          { prompt: "Piliin ang wasto: '___ dumating ang bagyo, handa na ang komunidad.' (Katumbas ng 'Noong')", options: ["Nang", "Ng", "Rin", "Din"], answer: "Nang", hint: "Katumbas ng 'noong' (when)!", whyEasy: "Kapag puwedeng palitan ng 'noong', laging NANG!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "fil-tayutay-idyoma-sawikain": {
        const bank = [
          { prompt: "'Kasing-linaw ng kristal ang tubig sa Palawan.' Anong tayutay?", options: ["Pagtutulad (Simili)", "Pagwawangis (Metapora)", "Pag-uyam", "Pagsasatao"], answer: "Pagtutulad (Simili)", hint: "May panandang 'kasing-' (paghahambing na di-tuwiran)!", whyEasy: "May 'kasing-, parang, tila, tulad' → Pagtutulad (Simili)!" },
          { prompt: "Ano ang ibig sabihin ng sawikaing 'balat-sibuyas'?", options: ["Sensitibo o madaling masaktan ang damdamin", "Makinis ang balat", "Mahilig magluto", "Matapang sa away"], answer: "Sensitibo o madaling masaktan ang damdamin", hint: "Tulad ng manipis na balat ng sibuyas!", whyEasy: "Balat-sibuyas = maramdamin/sensitibo!" },
          { prompt: "'Ang husay mo talaga — nakakuha ka ng zero sa madaling pagsusulit!' Anong tayutay?", options: ["Pag-uyam (Ironya)", "Pagtutulad", "Onomatopeya", "Pagsasatao"], answer: "Pag-uyam (Ironya)", hint: "Kunwari papuri pero kabaligtaran ang tunay na kahulugan!", whyEasy: "Sarkastikong papuri = Pag-uyam (Ironya)!" },
          { prompt: "Ano ang kahulugan ng sawikaing 'bukas-palad'?", options: ["Matulungin at mapagbigay", "Laging nakikipag-away", "Walang pambayad", "Tamad magtrabaho"], answer: "Matulungin at mapagbigay", hint: "Handang magbahagi nang bukal sa loob!", whyEasy: "Bukas-palad = mapagbigay; makapal ang palad = masipag!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "fil-pagbasa-panitikan-uri": {
        const bank = [
          { prompt: "Anong uri ng teksto ang isang artikulo sa ensiklopedya tungkol sa Bulkang Mayon?", options: ["Impormatibo", "Persuweysib", "Naratibo", "Prosidyural"], answer: "Impormatibo", hint: "Layuning magbigay ng obhetibong kaalaman at impormasyon!", whyEasy: "Datos at malinaw na paliwanag = Tekstong Impormatibo!" },
          { prompt: "Anong uri ng teksto ang isang maikling kuwento na may tauhan, tagpuan, at kasukdulan?", options: ["Naratibo", "Prosidyural", "Impormatibo", "Argumentatibo"], answer: "Naratibo", hint: "Nagsasalaysay ng sunod-sunod na pangyayari!", whyEasy: "Kuwento/salaysay = Tekstong Naratibo!" },
          { prompt: "Sa tatlong paraan ng panghihikayat (Ethos, Pathos, Logos), alin ang gumagamit ng datos at lohika?", options: ["Logos", "Pathos", "Ethos", "Sarkasmo"], answer: "Logos", hint: "Logos → Logic!", whyEasy: "Logos = lohika/estadistika; Pathos = emosyon; Ethos = kredibilidad!" },
          { prompt: "Alin ang nagpapakita ng OPINYON at hindi katotohanan?", options: ["Para sa akin, pinakamasarap ang kape sa Batangas.", "Ang Maynila ay kabisera ng Pilipinas.", "May 12 buwan sa isang taon.", "Tubig ay binubuo ng H₂O."], answer: "Para sa akin, pinakamasarap ang kape sa Batangas.", hint: "Hanapin ang panandang 'Para sa akin' at 'pinakamasarap'!", whyEasy: "Personal na panlasa at pananaw = Opinyon!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "fil-panitikang-pilipino-obra": {
        const bank = [
          { prompt: "Sino ang may-akda ng walang-kamatayang awit na 'Florante at Laura'?", options: ["Francisco 'Balagtas' Baltazar", "José Rizal", "Lope K. Santos", "Severino Reyes"], answer: "Francisco 'Balagtas' Baltazar", hint: "Pinagmulan ng salitang 'Balagtasan'!", whyEasy: "Si Balagtas ang sumulat ng Florante at Laura (Awit, 12 pantig)!" },
          { prompt: "Ano ang salin sa Filipino ng pamagat na 'Noli Me Tangere' ni Rizal?", options: ["Huwag Mo Akong Salingin", "Ang Paghahari ng Kasakiman", "Buhay ni Lam-ang", "Sa Aking mga Kabata"], answer: "Huwag Mo Akong Salingin", hint: "Mula sa Latin na 'Touch Me Not'!", whyEasy: "Noli Me Tangere = Huwag Mo Akong Salingin; El Fili = Ang Paghahari ng Kasakiman!" },
          { prompt: "Ilang pantig bawat taludtod ang KORIDO tulad ng 'Ibong Adarna'?", options: ["8 pantig", "12 pantig", "7 pantig", "14 pantig"], answer: "8 pantig", hint: "Mas maikli at mas mabilis bigkasin kaysa Awit (12)!", whyEasy: "Korido = 8 pantig; Awit = 12 pantig!" },
          { prompt: "Aling epiko ng mga Ifugao ang kinilala ng UNESCO bilang obra-maestra ng pasalitang pamana?", options: ["Hudhud", "Biag ni Lam-ang", "Ibong Adarna", "Florante at Laura"], answer: "Hudhud", hint: "Inaawit sa mga hagdang-hagdang palayan ng Ifugao!", whyEasy: "Ang Hudhud chants ng Ifugao ay UNESCO Intangible Cultural Heritage!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "abs-rotations-reflections": {
        const mode = randInt(0, 2);
        if (mode === 0) {
          const startDeg = pick([0, 90, 180, 270]);
          const stepDeg = pick([90, -90]);
          const targetDeg = (startDeg + 3 * stepDeg + 720) % 360;
          const cornerMap = {
            0: "Bottom-Right (0°)",
            90: "Bottom-Left (90°)",
            180: "Top-Left (180°)",
            270: "Top-Right (270°)"
          };
          const ans = cornerMap[targetDeg];
          const dirLabel = stepDeg === 90 ? "+90° Clockwise" : "90° Counterclockwise";
          return {
            type: "mc",
            prompt: `Starting at ${startDeg}°, each box turns ${dirLabel}. Pick the matching 4th tile (?):`,
            visualSvg: svgRotationStrip(startDeg, stepDeg, 3),
            options: shuffle(Object.values(cornerMap)),
            optionSvgs: {
              "Bottom-Right (0°)": svgLTile(0, false),
              "Bottom-Left (90°)": svgLTile(90, false),
              "Top-Left (180°)": svgLTile(180, false),
              "Top-Right (270°)": svgLTile(270, false)
            },
            answer: ans,
            hint: `Follow ONLY the amber dot stepping ${dirLabel} from Box 3!`,
            whyEasy: `One ${dirLabel} step past Box 3 lands cleanly at ${ans}!`
          };
        }
        if (mode === 1) {
          const baseDeg = pick([0, 90, 180, 270]);
          const ans = `Mirrored (${baseDeg}°)`;
          const o1 = `Rotated ${(baseDeg + 90) % 360}°`, o2 = `Rotated ${(baseDeg + 180) % 360}°`, o3 = `Rotated ${(baseDeg + 270) % 360}°`;
          return {
            type: "mc",
            prompt: `Chirality Hunt (${baseDeg}° base): Three tiles are flat rotations of the SAME L-shape; ONE is mirror-flipped! Pick the mirror trap:`,
            options: shuffle([ans, o1, o2, o3]),
            optionSvgs: {
              [ans]: svgLTile(baseDeg, true),
              [o1]: svgLTile((baseDeg + 90) % 360, false),
              [o2]: svgLTile((baseDeg + 180) % 360, false),
              [o3]: svgLTile((baseDeg + 270) % 360, false)
            },
            answer: ans,
            hint: "Spinning never reverses left vs right handedness — spot the backwards L!",
            whyEasy: "The mirrored tile reverses chirality and can NEVER match via flat rotation!"
          };
        }
        const nSides = pick([3, 4, 5, 6, 8, 9, 10, 12]);
        const minDeg = Math.round(360 / nSides);
        const distSet = Array.from(new Set([minDeg * 2, Math.round(minDeg / 2) || 15, minDeg + 15, minDeg + 30, minDeg + 45].filter((x) => x > 0 && x !== minDeg)));
        const distractors = shuffle(distSet).slice(0, 3);
        return {
          type: "mc",
          prompt: `What is the smallest positive rotation angle that maps a regular ${nSides}-sided polygon onto itself?`,
          visualSvg: svgPolyTile(nSides, true),
          options: shuffle([`${minDeg}°`, ...distractors.map((x) => `${x}°`)]),
          answer: `${minDeg}°`,
          hint: `Divide 360° by ${nSides} equal sides!`,
          whyEasy: `360° ÷ ${nSides} = ${minDeg}°!`
        };
      }

      case "abs-shape-sequences-progression": {
        const mode = randInt(0, 1);
        if (mode === 0) {
          const startSides = pick([3, 4, 5, 6]);
          const nextSides = startSides + 3;
          const polyNames = { 5: "Pentagon (5)", 6: "Hexagon (6)", 7: "Heptagon (7)", 8: "Octagon (8)", 9: "Nonagon (9)", 10: "Decagon (10)" };
          const ans = `Unshaded ${polyNames[nextSides]}`;
          const w1 = `Shaded ${polyNames[nextSides]}`;
          const w2 = `Unshaded ${polyNames[nextSides + 1] || polyNames[5]}`;
          const w3 = `Shaded ${polyNames[nextSides - 1] || polyNames[5]}`;
          return {
            type: "mc",
            prompt: `Side Progression (${startSides} → ${startSides + 1} → ${startSides + 2} → ?): Pick the matching 4th tile:`,
            visualSvg: svgPolySequence([startSides, startSides + 1, startSides + 2]),
            options: shuffle([ans, w1, w2, w3]),
            optionSvgs: {
              [ans]: svgPolyTile(nextSides, false),
              [w1]: svgPolyTile(nextSides, true),
              [w2]: svgPolyTile(polyNames[nextSides + 1] ? nextSides + 1 : 5, false),
              [w3]: svgPolyTile(polyNames[nextSides - 1] ? nextSides - 1 : 5, true)
            },
            answer: ans,
            hint: `Sides grow +1 (${nextSides} sides) and shading alternates Shaded → Unshaded → Shaded → ?`,
            whyEasy: `Next box has ${nextSides} sides and is Unshaded!`
          };
        }
        const k = randInt(4, 9);
        const ans = `${k * k} tiles (${k}²)`;
        return {
          type: "mc",
          prompt: `Square-Grid Series: Box 1 = 1 tile, Box 2 = 4, Box 3 = 9 ... How many tiles sit in Box ${k}?`,
          options: shuffle([ans, `${k * 2} tiles`, `${(k - 1) * (k - 1)} tiles`, `${k * k + k} tiles`]),
          answer: ans,
          hint: `Notice the perfect-square pattern n² for Box ${k}!`,
          whyEasy: `${k} × ${k} = ${k * k} tiles!`
        };
      }

      case "abs-raven-matrices-logic": {
        const bank = [
          {
            prompt: "3×3 XOR Rule (matching features cancel): [Circle + Dot] ⊕ [Dot only] = ?",
            options: ["Circle only", "Dot only", "Circle + Dot", "Empty box"],
            optionSvgs: { "Circle only": svgXorTile("circle"), "Dot only": svgXorTile("dot"), "Circle + Dot": svgXorTile("both"), "Empty box": svgXorTile("empty") },
            answer: "Circle only", hint: "The matching Dot cancels out!", whyEasy: "XOR keeps unique elements (Circle) and erases overlaps (Dot)!"
          },
          {
            prompt: "3×3 XOR Rule: Cross (+) ⊕ Horizontal (−) = ?",
            visualSvg: svgXorMatrixPreview(),
            options: ["Vertical (|)", "Horizontal (−)", "Cross (+)", "Empty box"],
            optionSvgs: { "Vertical (|)": svgXorTile("vert"), "Horizontal (−)": svgXorTile("horiz"), "Cross (+)": svgXorTile("cross"), "Empty box": svgXorTile("empty") },
            answer: "Vertical (|)", hint: "Horizontal cancels Horizontal!", whyEasy: "Only the Vertical bar survives!"
          },
          {
            prompt: "3×3 Sudoku Rule: Row 3 has [Solid Circle] and [Striped Square]. Pick the missing 3rd tile:",
            options: ["Hollow Triangle", "Solid Triangle", "Striped Circle", "Hollow Square"],
            optionSvgs: { "Hollow Triangle": svgNestedTile("tri", "hollow", null, null), "Solid Triangle": svgNestedTile("tri", "solid", null, null), "Striped Circle": svgNestedTile("circle", "striped", null, null), "Hollow Square": svgNestedTile("square", "hollow", null, null) },
            answer: "Hollow Triangle", hint: "Each row needs 1 of each shape and 1 of each fill!", whyEasy: "Missing shape = Triangle, missing fill = Hollow!"
          },
          {
            prompt: "3×3 XOR Rule: [Top + Bottom] ⊕ [Bottom + Left] = ?",
            options: ["Top + Left", "Bottom only", "Top + Bottom + Left", "Empty box"],
            optionSvgs: { "Top + Left": svgXorTile("topLeft"), "Bottom only": svgXorTile("bottom"), "Top + Bottom + Left": svgXorTile("threeLines"), "Empty box": svgXorTile("empty") },
            answer: "Top + Left", hint: "Bottom appears in BOTH, so Bottom cancels!", whyEasy: "Unique lines Top & Left survive; shared Bottom cancels!"
          }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, visualSvg: p.visualSvg, optionSvgs: p.optionSvgs, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "abs-odd-one-out-analogies": {
        const bank = [
          {
            prompt: "Visual Analogy: [Hollow Circle → Solid Circle] :: [Hollow Triangle → ?]",
            options: ["Solid Triangle", "Hollow Square", "Solid Circle", "Hollow Triangle"],
            optionSvgs: { "Solid Triangle": svgNestedTile("tri", "solid", null, null), "Hollow Square": svgNestedTile("square", "hollow", null, null), "Solid Circle": svgNestedTile("circle", "solid", null, null), "Hollow Triangle": svgNestedTile("tri", "hollow", null, null) },
            answer: "Solid Triangle", hint: "Rule: keep the same shape, invert Hollow → Solid!", whyEasy: "Apply the exact same fill-inversion verb to Triangle!"
          },
          {
            prompt: "Odd-One-Out (Vertical Mirror Symmetry): Which letter fails left-to-right symmetry? T, V, W, Z",
            options: ["Z", "T", "V", "W"], answer: "Z", hint: "Fold each letter down the vertical centerline!", whyEasy: "T, V, W are symmetric left-to-right; Z is chiral under vertical reflection!"
          },
          {
            prompt: "Visual Analogy: [Triangle (3) → Square (4)] :: [Pentagon (5) → ?]",
            options: ["Hexagon (6)", "Triangle (3)", "Pentagon (5)", "Square (4)"],
            optionSvgs: { "Hexagon (6)": svgPolyTile(6, true), "Triangle (3)": svgPolyTile(3, true), "Pentagon (5)": svgPolyTile(5, true), "Square (4)": svgPolyTile(4, true) },
            answer: "Hexagon (6)", hint: "Rule: add +1 side!", whyEasy: "5 + 1 = 6 sides (Hexagon)!"
          },
          {
            prompt: "Visual Odd-One-Out: Three L-tiles are rotations (0°, 90°, 180°); ONE is mirrored! Pick it:",
            options: ["Mirrored L-tile", "0° L-tile", "90° L-tile", "180° L-tile"],
            optionSvgs: { "Mirrored L-tile": svgLTile(0, true), "0° L-tile": svgLTile(0, false), "90° L-tile": svgLTile(90, false), "180° L-tile": svgLTile(180, false) },
            answer: "Mirrored L-tile", hint: "Check handedness/chirality!", whyEasy: "Mirrored chirality can NEVER be produced by flat rotations!"
          }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, optionSvgs: p.optionSvgs, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      case "abs-3d-cube-folding-nets": {
        const labels = shuffle(["1", "2", "3", "4", "5", "6"]);
        const pairs = [[labels[0], labels[4]], [labels[1], labels[3]], [labels[2], labels[5]]];
        const targetPair = pick(pairs);
        const askFace = targetPair[0];
        const ansFace = targetPair[1];
        const distractors = labels.filter((x) => x !== askFace && x !== ansFace);
        return {
          type: "mc",
          prompt: `Fold this cross net into a 3D cube. Which face is DIRECTLY OPPOSITE face '${askFace}'?`,
          visualSvg: svgCubeCrossNet(labels),
          options: shuffle([ansFace, distractors[0], distractors[1], distractors[2]]),
          answer: ansFace,
          hint: "Use Skip-One-In-A-Row along the straight strips of the cross net!",
          whyEasy: `Opposite pairs on this cross net: ${labels[0]}↔${labels[4]}, ${labels[1]}↔${labels[3]}, ${labels[2]}↔${labels[5]} → ${askFace} is opposite ${ansFace}!`
        };
      }

      case "abs-paper-folding-spatial-views": {
        const bank = [
          {
            prompt: "Fold square paper ONCE vertically + ONCE horizontally (4 layers) and punch 1 interior hole. Pick the unfolded sheet:",
            visualSvg: svgPaperFoldPrompt(2),
            options: ["4 symmetric holes", "2 top holes", "2 diagonal holes", "1 center hole"],
            optionSvgs: {
              "4 symmetric holes": svgPaperFoldTile([[20, 20], [44, 20], [20, 44], [44, 44]]),
              "2 top holes": svgPaperFoldTile([[20, 20], [44, 20]]),
              "2 diagonal holes": svgPaperFoldTile([[20, 20], [44, 44]]),
              "1 center hole": svgPaperFoldTile([[32, 32]])
            },
            answer: "4 symmetric holes", hint: "2 folds → 2² = 4 mirrored quadrants!", whyEasy: "1 interior punch through 4 layers unfolds into 4 symmetric holes!"
          },
          { prompt: "A paper is folded cleanly in half 3 times, then 1 interior hole is punched. Total holes when unfolded?", visualSvg: svgPaperFoldPrompt(2), options: ["8 holes", "6 holes", "4 holes", "3 holes"], answer: "8 holes", hint: "Double per fold: 2 → 4 → 8!", whyEasy: "2³ = 8 layers → 8 holes!" },
          {
            prompt: "Fold paper ONCE down the vertical center, punch 1 hole upper-right of the crease. Pick the unfolded sheet:",
            visualSvg: svgPaperFoldPrompt(1),
            options: ["2 mirrored top holes", "2 stacked right holes", "4 corner holes", "1 hole only"],
            optionSvgs: {
              "2 mirrored top holes": svgPaperFoldTile([[22, 18], [42, 18]]),
              "2 stacked right holes": svgPaperFoldTile([[42, 18], [42, 46]]),
              "4 corner holes": svgPaperFoldTile([[18, 18], [46, 18], [18, 46], [46, 46]]),
              "1 hole only": svgPaperFoldTile([[42, 18]])
            },
            answer: "2 mirrored top holes", hint: "Vertical fold mirrors Left ↔ Right!", whyEasy: "Unfolding mirrors the punch symmetrically across the vertical crease!"
          },
          { prompt: "In a 3D block stack, a column has heights [2, 5, 1] front-to-back. How tall does that column appear in the Front Orthographic View?", options: ["5 cubes tall", "2 cubes tall", "8 cubes tall", "1 cube tall"], answer: "5 cubes tall", hint: "Front View always shows the MAXIMUM height in that column!", whyEasy: "The 5-cube tower rises above the 2 and 1 blocks → height = 5!" }
        ];
        const p = pick(bank);
        return { type: "mc", prompt: p.prompt, visualSvg: p.visualSvg, optionSvgs: p.optionSvgs, options: shuffle(p.options), answer: p.answer, hint: p.hint, whyEasy: p.whyEasy };
      }

      default:
        return prevGen(nodeId);
    }
  };

  // ==================== 20 CURATED WORKED EXAMPLES ====================
  if (LATEX && typeof LATEX.registerWorkedExamples === "function") {
    LATEX.registerWorkedExamples({
      "ph-precolonial-spanish": {
        heroFormula: "$$900\\text{ CE Laguna Copperplate} \\to 1521\\text{ Contact} \\to 1565\\text{ Colonization} \\to 1872\\text{ GOMBURZA}$$",
        title: "Separating 1521 Contact vs 1565 Colonization",
        problemLatex: "$$\\text{How many years elapsed between Magellan (1521) and Legazpi (1565), and how long was Spanish rule?}$$",
        steps: [
          { label: "Separate first contact from permanent settlement", mathLatex: "$1565 - 1521 = \\mathbf{44\\text{ years gap}}$", plainWhy: "Magellan died at Mactan (1521); permanent Spanish governance only began under Legazpi in 1565!" },
          { label: "Calculate total Spanish colonial era (1565–1898)", mathLatex: "$1898 - 1565 = \\mathbf{333\\text{ years}}$", plainWhy: "That's the exact origin of the famous '333 years of Spanish rule' milestone!" },
          { label: "Pin the awakening catalyst (1872)", mathLatex: "$\\text{1872 Cavite Mutiny} \\to \\text{GOMBURZA} \\to \\text{Nationalism}$", plainWhy: "Gómez, Burgos, and Zamora's martyrdom galvanized Rizal and the reform generation!" }
        ],
        answerLatex: "$$44\\text{-yr gap}; \\quad 333\\text{ yrs (1565–1898)}; \\quad 1872\\text{ GOMBURZA}$$",
        commonTrap: "Never credit Magellan with colonizing the Philippines — Legazpi founded Cebu (1565) and Manila (1571)!"
      },
      "ph-propaganda-katipunan-rev": {
        heroFormula: "$$\\text{Propaganda (Reform/Pen)} \\to \\text{Katipunan (Independence/KKK)} \\to \\text{June 12, 1898} \\to \\text{Malolos 1899}$$",
        title: "Matching Leaders, Pen Names & Roles Without Mixing Them Up",
        problemLatex: "$$\\text{Distinguish Rizal, Del Pilar, Bonifacio, Jacinto, and Mabini}$$",
        steps: [
          { label: "Propaganda Reformers (La Solidaridad in Spain)", mathLatex: "$\\text{Jaena (1st ed.)},\\; \\text{Del Pilar (Plaridel)},\\; \\text{Rizal (Noli/El Fili)}$", plainWhy: "Sought peaceful representation and equality inside Spain first." },
          { label: "Katipunan Revolutionaries (Founded July 7, 1892)", mathLatex: "$\\text{Bonifacio (Supremo)} + \\text{Jacinto (Brains of KKK / Kartilya)}$", plainWhy: "Memory hook: J is next to K → Jacinto = Katipunan!" },
          { label: "First Republic Architects (1898–1899)", mathLatex: "$\\text{Aguinaldo (Pres.)} + \\text{Mabini (Brains of Revolution / PM)}$", plainWhy: "Malolos (Jan 23, 1899) became Asia's very first constitutional republic!" }
        ],
        answerLatex: "$$\\text{Jacinto = Katipunan; Mabini = Revolution; 1899 Malolos = 1st Asian Republic}$$",
        commonTrap: "Don't swap Emilio Jacinto (Brains of Katipunan) with Apolinario Mabini (Brains of Revolution)!"
      },
      "ph-american-japanese-ww2": {
        heroFormula: "$$1898\\text{ Paris (\\$20M)} \\to 1916\\text{ Jones} \\to 1934\\text{ Tydings-McDuffie} \\to 1935\\text{ Commonwealth} \\to 1946$$",
        title: "Tracing the Legal Countdown to 1946 Independence",
        problemLatex: "$$\\text{Order these 4 milestones: Bataan (1942), Tydings-McDuffie (1934), Thomasites (1901), Third Republic (1946)}$$",
        steps: [
          { label: "Early U.S. Civilian Rule & Public Education", mathLatex: "$1901\\text{ Thomasites} \\to 1916\\text{ Jones Law (Filipino Legislature)}$", plainWhy: "Public English education preceded legislative self-rule." },
          { label: "10-Year Independence Countdown", mathLatex: "$1934\\text{ Tydings-McDuffie} \\to 1935\\text{ Commonwealth (Quezon)}$", plainWhy: "Set a firm 10-year transition and 1935 Constitution (+ 1937 Women's Suffrage!)." },
          { label: "WWII Interruption & Formal Sovereignty", mathLatex: "$1942\\text{ Bataan} \\to 1944\\text{ Leyte} \\to \\mathbf{\\text{July 4, 1946 (Roxas)}}$", plainWhy: "Despite WWII devastation, the Third Republic launched right on schedule in 1946!" }
        ],
        answerLatex: "$$1901 \\to 1934 \\to 1942 \\to 1946$$",
        commonTrap: "Remember: Quezon was 1st Commonwealth President (1935), while Manuel Roxas was 1st Third Republic President (1946)!"
      },
      "ph-martial-law-edsa-modern": {
        heroFormula: "$$1962\\text{ June 12 Shift} \\to 1972\\text{ Proc. 1081} \\to 1986\\text{ EDSA} \\to 1987\\text{ Constitutional Guardrails}$$",
        title: "How EDSA 1986 Reshaped the 1987 Constitution",
        problemLatex: "$$\\text{Compare Martial Law powers before (1972) vs after the 1987 Constitution}$$",
        steps: [
          { label: "Identify the 1972 Martial Law mechanism", mathLatex: "$\\text{Proc. 1081 (Sept 21, 1972)} \\implies \\text{No fixed cap, Congress shuttered}$", plainWhy: "Lack of automatic time caps & checks enabled 14 years of unchecked rule." },
          { label: "Trace the peaceful democratic restoration", mathLatex: "$\\text{Ninoy (1983)} \\to \\text{Snap Election} \\to \\mathbf{\\text{EDSA (Feb 22–25, 1986)}}$", plainWhy: "Nonviolent solidarity restored democracy under Corazon Aquino." },
          { label: "Apply 1987 Constitution Safeguards (Art. VII Sec. 18)", mathLatex: "$\\le \\mathbf{60\\text{ days}} \\;+\\; \\text{Congress can revoke} \\;+\\; \\text{SC reviews factual basis}$", plainWhy: "Even during Martial Law, courts remain open and the Constitution stays supreme!" }
        ],
        answerLatex: "$$\\text{Max 60 days + Congressional Revocation + Supreme Court Review}$$",
        commonTrap: "Under the 1987 Constitution, Martial Law NEVER suspends the Constitution or shuts down civil courts!"
      },
      "ph-constitution-three-branches": {
        heroFormula: "$$\\text{Congress (24 Sen + House)} \\xleftrightarrow{\\text{Veto / 2/3 Override}} \\text{President (1×6yr)} \\xleftrightarrow{\\text{Judicial Review}} \\text{SC (15)}$$",
        title: "Tracing a Bill Becoming Law (Including Veto Override!)",
        problemLatex: "$$\\text{A bill passes Congress, the President vetoes it — exact votes needed to override?}$$",
        steps: [
          { label: "Check Senate 2/3 Supermajority", mathLatex: "$\\frac{2}{3} \\times 24\\text{ Senators} = \\mathbf{16\\text{ Senators}}$", plainWhy: "Two-thirds of all members of the Senate must vote to override." },
          { label: "Check House of Representatives 2/3 Supermajority", mathLatex: "$\\frac{2}{3}\\text{ of all House Members (voting separately)}$", plainWhy: "BOTH chambers must independently reach the 2/3 bar!" },
          { label: "Check the 30-Day Inaction Rule", mathLatex: "$\\text{No signature \& no veto for 30 days} \\implies \\mathbf{\\text{Lapses into Law!}}$", plainWhy: "Prevents a President from killing bills simply by ignoring them!" }
        ],
        answerLatex: "$$\\ge 16\\text{ Senators AND } \\ge 2/3\\text{ House} \\implies \\text{Law!}$$",
        commonTrap: "Tax & budget bills MUST start in the House of Representatives, never the Senate!"
      },
      "ph-bill-of-rights-civics": {
        heroFormula: "$$\\text{PH Citizenship} = \\text{Jus Sanguinis (Blood)} \\quad | \\quad \\text{Suffrage} = 18+\\text{ (0 Literacy/Property Test)}$$",
        title: "Evaluating Constitutional Rights in Real Scenarios",
        problemLatex: "$$\\text{Police arrest someone without warrant, question them without a lawyer, and deny bail}$$",
        steps: [
          { label: "Check Custodial Investigation (Article III Sec. 12)", mathLatex: "$\\text{No lawyer present} \\implies \\text{Any confession is } \\mathbf{\\text{INADMISSIBLE!}}$", plainWhy: "Miranda rights require silence + competent, independent counsel." },
          { label: "Check Unlawful Detention Remedy", mathLatex: "$\\text{Petition for } \\mathbf{\\text{Writ of Habeas Corpus}} \\;(\\text{'produce the body'})$", plainWhy: "Forces authorities to bring the detainee before a judge immediately!" },
          { label: "Check Trial Presumption", mathLatex: "$\\text{Presumed INNOCENT until proven guilty beyond reasonable doubt}$", plainWhy: "The burden of proof always rests on the prosecution!" }
        ],
        answerLatex: "$$\\text{Miranda Protects Confession; Habeas Corpus Checks Detention}$$",
        commonTrap: "Never confuse Jus Sanguinis (blood — used by PH!) with Jus Soli (soil/birthplace — used by U.S.)!"
      },
      "ph-local-gov-taxes-civic-life": {
        heroFormula: "$$\\text{RA 7160: Brgy} \\to \\text{City/Mun} \\to \\text{Province} \\quad | \\quad \\text{CSC (HR)} \\cdot \\text{COMELEC (Votes)} \\cdot \\text{COA (Audit)}$$",
        title: "Comparing Progressive Income Tax vs Regressive VAT",
        problemLatex: "$$\\text{Worker A earns ₱10,000/mo; Executive B earns ₱200,000/mo. Both buy ₱5,000 groceries (+₱600 VAT)}$$",
        steps: [
          { label: "Compute VAT % burden on Worker A", mathLatex: "$\\frac{600}{10{,}000} = \\mathbf{6.0\\%\\text{ of monthly income}}$", plainWhy: "Flat consumption taxes take a significant bite out of modest budgets." },
          { label: "Compute VAT % burden on Executive B", mathLatex: "$\\frac{600}{200{,}000} = \\mathbf{0.3\\%\\text{ of monthly income}}$", plainWhy: "Same ₱600 is 20× lighter as a percentage of income!" },
          { label: "Classify the Tax Type", mathLatex: "$\\text{Lower income pays higher \\% share} \\implies \\mathbf{\\text{REGRESSIVE TAX}}$", plainWhy: "That's why PH pairs VAT with Progressive Income Tax (≤ ₱250k/yr pays 0%)!" }
        ],
        answerLatex: "$$\\text{VAT = Regressive (6\\% vs 0.3\\%); Income Tax = Progressive}$$",
        commonTrap: "Flat-rate sales taxes are REGRESSIVE in economic burden even though the sticker rate (12%) looks identical!"
      },
      "world-history-revolutions-civ": {
        heroFormula: "$$\\text{Rivers (Writing)} \\to \\text{Greece/Rome} \\to \\text{Printing/Enlightenment} \\to \\text{UN (1945)} \\to \\text{ASEAN (1967)}$$",
        title: "Tracing How Enlightenment Ideas Reached the Philippines",
        problemLatex: "$$\\text{Connect Gutenberg (1440), Montesquieu (1748), Rizal (1887), and ASEAN (1967)}$$",
        steps: [
          { label: "Information Explosion (1440s)", mathLatex: "$\\text{Gutenberg Printing Press} \\implies \\text{Mass books \& scientific literacy}$", plainWhy: "Cheap printing let ideas cross oceans and borders rapidly." },
          { label: "Constitutional Philosophy (1700s → 1899)", mathLatex: "$\\text{Locke (Rights) + Montesquieu (3 Branches)} \\implies \\text{Malolos \& 1987 Const.}$", plainWhy: "Enlightenment separation of powers directly shaped Rizal and Philippine republics!" },
          { label: "Modern Regional Peace (1945 → 1967)", mathLatex: "$\\text{UN (1945)} + \\text{ASEAN (1967: PH, ID, MY, SG, TH)}$", plainWhy: "Philippines helped co-found both global and Southeast Asian multilateral order!" }
        ],
        answerLatex: "$$\\text{Printing} \\to \\text{Enlightenment Rights} \\to \\text{Modern Republics \& ASEAN}$$",
        commonTrap: "Remember the Philippines was an ORIGINAL founding member of both the UN (1945) and ASEAN (1967)!"
      },
      "fil-ponolohiya-baybay-diin": {
        heroFormula: "$$\\text{Penultima: Malumay (–) / Malumi (\\`)} \\quad | \\quad \\text{Huli: Mabilis (´) / Maragsa (\\^)}$$",
        title: "Pagtukoy sa 4 na Diin sa Salitang 'basa' at 'baga'",
        problemLatex: "$$\\text{Ihiwalay: bá-ga (ember), ba-gà (lung), ba-gá (really?), ba-sâ (wet)}$$",
        steps: [
          { label: "Suriin kung nasa Penultima o Huling pantig ang diin", mathLatex: "$\\text{bá-ga, ba-gà} = \\text{Penultima}; \\qquad \\text{ba-gá, ba-sâ} = \\text{Huling pantig}$", plainWhy: "Hinahati agad nito ang 4 na uri sa 2 malinaw na grupo!" },
          { label: "Pakinggan kung may biglang tigil (impit / glottal stop) sa dulo", mathLatex: "$\\text{Walang impit: Malumay / Mabilis}; \\qquad \\text{May impit: Malumi (\\`) / Maragsa (\\^)}$", plainWhy: "Subukang bigkasin sa lalamunan: 'ba-sâ' ay biglang humihinto sa dulo!" },
          { label: "Itugma ang apat na kategorya", mathLatex: "$\\text{bága (Malumay), bagà (Malumi), bagá (Mabilis), basâ (Maragsa)}$", plainWhy: "100% malinaw gamit ang 2×2 grid!" }
        ],
        answerLatex: "$$\\text{Malumay, Malumi, Mabilis, Maragsa}$$",
        commonTrap: "Ang salitang may diptonggo ay dapat nasa IISANG pantig ang patinig + w/y ('ba-hay' ✓, 'ba-ya-ni' ✗)!"
      },
      "fil-bahagi-ng-pananalita": {
        heroFormula: "$$\\text{Pokus} = \\text{Sino/Ano ang 'ANG/SI'?} \\quad | \\quad \\text{Aspekto} = \\text{Tapos / Ginagawa / Gagawin}$$",
        title: "1-Segundo na Pagtukoy ng Pokus ng Pandiwa",
        problemLatex: "$$\\text{A: 'Bumili si Ben ng sapatos.' vs B: 'Binili ni Ben ang sapatos.'}$$",
        steps: [
          { label: "Bilugan ang pariralang may 'ANG' o 'SI'", mathLatex: "$\\text{A: } \\mathbf{\\text{si Ben}} \\quad | \\quad \\text{B: } \\mathbf{\\text{ang sapatos}}$", plainWhy: "Laging ang 'ang/si' ang simuno (bida) ng pangungusap!" },
          { label: "Itanong ang papel ng bida sa kilos", mathLatex: "$\\text{Ben} = \\text{Tagaganap (Aktor)}; \\qquad \\text{sapatos} = \\text{Layon (binili)}$", plainWhy: "Awtomatikong lumalabas ang pokus nang walang hulaan!" },
          { label: "Kumpirmahin sa panlapi", mathLatex: "$\\text{b-UM-ili (Aktor)} \\quad | \\quad \\text{b-IN-ili (Layon)}$", plainWhy: "Ang panlapi at ang simuno ay laging magkasundo!" }
        ],
        answerLatex: "$$\\text{A = Tagaganap (Aktor); B = Layon (Gol)}$$",
        commonTrap: "Huwag ipagkamali ang Pang-uri (naglalarawan sa pangngalan) sa Pang-abay (naglalarawan sa pandiwa)!"
      },
      "fil-ng-nang-din-rin-traps": {
        heroFormula: "$$\\text{NANG} = \\text{Noong / Upang / Paano / Ulit-kilos} \\quad | \\quad \\text{NG} = \\text{Noun / Owner}$$",
        title: "Paglutas ng Ng/Nang at Din/Rin sa Iisang Pangungusap",
        problemLatex: "$$\\text{'Umalis ___ maaga si Liza upang bumili ___ bulaklak; sasama ___ si Joy.'}$$",
        steps: [
          { label: "Unang patlang: 'maaga' = PAANO/KAILAN umalis?", mathLatex: "$\\text{Pang-abay} \\implies \\mathbf{\\text{NANG}}\\text{ ('Umalis nang maaga')}$", plainWhy: "Naglalarawan sa pandiwang 'umalis' → NANG!" },
          { label: "Ikalawang patlang: 'bulaklak' = PANGNGALAN (ano ang binili?)", mathLatex: "$\\text{Pangngalan} \\implies \\mathbf{\\text{NG}}\\text{ ('bumili ng bulaklak')}$", plainWhy: "Tuwirang layon na pangngalan → NG!" },
          { label: "Ikatlong patlang: 'sasama' nagtatapos sa patinig 'a'", mathLatex: "$\\text{Patinig (a)} \\implies \\mathbf{\\text{RIN}}\\text{ ('sasama rin')}$", plainWhy: "Patinig, W, o Y → RIN/RAW!" }
        ],
        answerLatex: "$$\\text{nang} \\;\\cdot\\; \\text{ng} \\;\\cdot\\; \\text{rin}$$",
        commonTrap: "Kapag nagtatapos sa -ra/-ri/-raw/-ray (hal. 'maaari'), bumabalik sa DIN/DAW ('maaari din')!"
      },
      "fil-tayutay-idyoma-sawikain": {
        heroFormula: "$$\\text{Simili (parang)} \\;|\\; \\text{Metapora (direkta)} \\;|\\; \\text{Personipikasyon (kilos-tao)} \\;|\\; \\text{Hyperbole (sobra)}$$",
        title: "Mabilisang Clue-Scan para sa Mga Tayutay",
        problemLatex: "$$\\text{Suriin: 'Umiiyak ang mga ulap habang parang yelo ang hangin.'}$$",
        steps: [
          { label: "Unang bahagi: 'Umiiyak ang mga ulap'", mathLatex: "$\\text{Ulap (bagay)} + \\text{umiiyak (kilos-tao)} \\implies \\mathbf{\\text{Personipikasyon}}$", plainWhy: "Hindi totoong lumuluha ang ulap — binigyan ng kilos ng tao!" },
          { label: "Ikalawang bahagi: 'parang yelo ang hangin'", mathLatex: "$\\text{May panandang 'parang'} \\implies \\mathbf{\\text{Pagtutulad (Simili)}}$", plainWhy: "Kung inalis ang 'parang' ('Yelo ang hangin'), magiging Metapora ito!" },
          { label: "Tiyakin kung Sawikain vs Salawikain", mathLatex: "$\\text{Sawikain = parirala ('butas bulsa'); Salawikain = aral}$", plainWhy: "Hindi literal ang kahulugan ng sawikain!" }
        ],
        answerLatex: "$$\\text{Personipikasyon + Simili}$$",
        commonTrap: "Huwag laktawan ang maliit na salitang 'tila/parang/kawangis' — iyon lang ang pagitan ng Simili at Metapora!"
      },
      "fil-pagbasa-panitikan-uri": {
        heroFormula: "$$\\text{Layunin} \\implies \\text{Impormatibo / Deskriptibo / Naratibo / Prosidyural / Persuweysib / Argumentatibo}$$",
        title: "Paghihiwalay ng Persuweysib vs Argumentatibo",
        problemLatex: "$$\\text{Compare a skincare commercial vs a peer-reviewed climate policy essay}$$",
        steps: [
          { label: "Tukuyin ang pangunahing sandata ng patalastas", mathLatex: "$\\text{Emosyon (Pathos) + sikat na endorser (Ethos)} \\implies \\mathbf{\\text{Persuweysib}}$", plainWhy: "Layuning hikayatin ang mamimili agad-agad." },
          { label: "Tukuyin ang pangunahing sandata ng posisyong papel", mathLatex: "$\\text{Datos (Logos) + ebidensya + kontra-argumento} \\implies \\mathbf{\\text{Argumentatibo}}$", plainWhy: "Nakasalalay sa lohika at mapapatunayang ebidensya!" },
          { label: "Suriin kung Katotohanan o Opinyon", mathLatex: "$\\text{Datos = Fact}; \\qquad \\text{'Pinakamaganda/Dapat' = Opinyon}$", plainWhy: "Mahalaga sa mapanuring pagbasa laban sa fake news!" }
        ],
        answerLatex: "$$\\text{Commercial = Persuweysib; Evidence Essay = Argumentatibo}$$",
        commonTrap: "Ang Hinuha (Inference) ay laging nakabase sa mga clue sa teksto — hindi basta wild guess!"
      },
      "fil-panitikang-pilipino-obra": {
        heroFormula: "$$\\text{Korido} = 8\\text{ pantig} \\quad | \\quad \\text{Awit} = 12\\text{ pantig} \\quad | \\quad \\text{Tanaga} = 7\\text{–}7\\text{–}7\\text{–}7$$",
        title: "Pagkilala sa Sukat at Alay ng Mga Klasikong Obra",
        problemLatex: "$$\\text{Ihambing ang Ibong Adarna, Florante at Laura, Noli, at El Fili}$$",
        steps: [
          { label: "Bilangin ang pantig ng Florante at Laura", mathLatex: "$\\text{'Sa i-sang ma-di-lim gu-bat na ma-pang-law'} = \\mathbf{12\\text{ pantig (Awit!)}}$", plainWhy: "12 pantig bawat taludtod = Awit (Balagtas); 8 pantig = Korido (Ibong Adarna)!" },
          { label: "Itugma ang dalawang nobela ni Rizal", mathLatex: "$\\text{Noli (1887, Inang Bayan)} \\to \\text{El Fili (1891, GOMBURZA)}$", plainWhy: "Noli = kanser ng lipunan; El Fili = nagbabagang rebolusyon (Simoun)!" },
          { label: "Itugma ang katutubong tula", mathLatex: "$\\text{Tanaga (PH)} = 7\\text{-}7\\text{-}7\\text{-}7; \\qquad \\text{Haiku (JP)} = 5\\text{-}7\\text{-}5$", plainWhy: "Madalas na tanong sa panitikan!" }
        ],
        answerLatex: "$$\\text{Awit = 12; Korido = 8; Tanaga = 7-7-7-7; El Fili} \\to \\text{GOMBURZA}$$",
        commonTrap: "Huwag pagpalitin ang 8 pantig ng Korido at 12 pantig ng Awit!"
      },
      "abs-rotations-reflections": {
        heroFormula: "$$+90^{\\circ}\\text{ CW: } N\\to E\\to S\\to W, \\qquad +270^{\\circ}\\text{ CW} \\equiv -90^{\\circ}\\text{ CCW}$$",
        title: "Tracking 1 Landmark & Catching Mirror-Flip Traps",
        problemLatex: "$$\\text{Start: arrow points EAST with dot on its LEFT. Rotate }+270^{\\circ}\\text{ CW!}$$",
        steps: [
          { label: "Convert +270° CW into the easier −90° CCW turn", mathLatex: "$+270^{\\circ}\\text{ CW} \\equiv -90^{\\circ}\\text{ CCW}$", plainWhy: "Turning 90° backward is 3× faster and zero errors!" },
          { label: "Turn East −90° CCW", mathLatex: "$\\text{East} \\xrightarrow{-90^{\\circ}\\text{ CCW}} \\mathbf{\\text{North}}$", plainWhy: "Check a compass: 90° counterclockwise from East is straight North!" },
          { label: "Verify Chirality (Dot stays on the arrow's LEFT!)", mathLatex: "$\\text{Arrow pointing North} \\implies \\text{Dot on West (left) side}$", plainWhy: "Pure rotations NEVER flip a dot from the left side of an arrow to the right side!" }
        ],
        answerLatex: "$$\\text{Arrow North, Dot on Left (West) side}$$",
        commonTrap: "If a multiple-choice answer puts the dot on the RIGHT side of the arrow, it's a sneaky Mirror Flip — cross it out!"
      },
      "abs-shape-sequences-progression": {
        heroFormula: "$$\\text{Split Multi-Rule Series} = \\text{Layer 1 (Sides)} + \\text{Layer 2 (Fill)} + \\text{Layer 3 (Position)}$$",
        title: "Decoupling a 3-Layer Visual Pattern in 5 Seconds",
        problemLatex: "$$[\\text{Solid 3-gon, dot Top}] \\to [\\text{Hollow 4-gon, dot Right}] \\to [\\text{Solid 5-gon, dot Bottom}] \\to \\text{?}$$",
        steps: [
          { label: "Layer 1 — Count Polygon Sides", mathLatex: "$3 \\to 4 \\to 5 \\implies \\mathbf{6\\text{ (Hexagon)}}$", plainWhy: "Adds +1 side each step." },
          { label: "Layer 2 — Shading Toggle", mathLatex: "$\\text{Solid} \\to \\text{Hollow} \\to \\text{Solid} \\implies \\mathbf{\\text{Hollow}}$", plainWhy: "Alternates every box — immediately eliminates 2 wrong options!" },
          { label: "Layer 3 — Dot Clockwise Hop", mathLatex: "$\\text{Top} \\to \\text{Right} \\to \\text{Bottom} \\implies \\mathbf{\\text{Left}}$", plainWhy: "Dot steps +90° clockwise each box!" }
        ],
        answerLatex: "$$\\text{Hollow Hexagon with Dot on Left}$$",
        commonTrap: "Trying to compute all 3 layers in one glance causes errors — ALWAYS check one layer at a time!"
      },
      "abs-raven-matrices-logic": {
        heroFormula: "$$\\text{XOR Overlay: } (A \\oplus B) = \\text{Keep Unique Lines, CANCEL Overlapping Lines!}$$",
        title: "Solving a 3×3 XOR Raven Matrix Row",
        problemLatex: "$$\\text{Col 1: } [\\text{Top, Right, Center}] \\quad \\oplus \\quad \\text{Col 2: } [\\text{Right, Bottom, Center}] = \\text{?}$$",
        steps: [
          { label: "Spot features appearing in BOTH boxes", mathLatex: "$\\text{Shared: Right \& Center} \\implies \\mathbf{\\text{CANCEL OUT!}}$", plainWhy: "Under XOR, 1 + 1 = 0 (duplicates erase each other!)." },
          { label: "Keep features appearing in ONLY ONE box", mathLatex: "$\\text{Unique: Top (Col 1) \& Bottom (Col 2)} \\implies \\mathbf{\\text{SURVIVE!}}$", plainWhy: "1 + 0 = 1 and 0 + 1 = 1." },
          { label: "Confirm the exact same XOR rule on Row 1 & Row 2", mathLatex: "$\\text{Col 3} = [\\text{Top, Bottom}]$", plainWhy: "Once verified on Row 1 & Row 2, you have 100% certainty!" }
        ],
        answerLatex: "$$[\\text{Top + Bottom}]$$",
        commonTrap: "Always check whether Row 1 uses Addition (keep all), AND (keep shared), or XOR (cancel shared)!"
      },
      "abs-odd-one-out-analogies": {
        heroFormula: "$$A \\xrightarrow{\\text{Verb Recipe}} B \\implies C \\xrightarrow{\\text{Exact Same Recipe}} D$$",
        title: "Writing the Transformation Verb for A : B :: C : ?",
        problemLatex: "$$[\\text{Black Big Square + White Small Circle}] : [\\text{White Big Circle + Black Small Square}]$$",
        steps: [
          { label: "Identify Shape Swap", mathLatex: "$\\text{Outer Square} \\leftrightarrow \\text{Inner Circle}$", plainWhy: "The inner shape expands outside and the outer shape shrinks inside!" },
          { label: "Identify Color Rule", mathLatex: "$\\text{Square stays Black; Circle stays White}$", plainWhy: "Check carefully: did colors stick to the SHAPES or to the POSITIONS?" },
          { label: "Apply the exact rule to C", mathLatex: "$\\text{Swap sizes, keep each shape's color!}$", plainWhy: "Verifying whether color sticks to shape vs position beats the trickiest exam trap!" }
        ],
        answerLatex: "$$\\text{Sizes Swap + Colors Follow Their Rule}$$",
        commonTrap: "Always verify if shading stays attached to the SHAPE or stays attached to the INNER/OUTER POSITION!"
      },
      "abs-3d-cube-folding-nets": {
        heroFormula: "$$\\text{Strip } [A][B][C] \\implies A \\leftrightarrow C \\text{ (OPPOSITE — NEVER TOUCH!)}$$",
        title: "Eliminating Impossible 3D Cubes in 3 Seconds",
        problemLatex: "$$\\text{Cross Net: Vertical } [1, 2, 3, 4],\\; \\text{Wings } [5] \\text{ left of } 2,\\; [6] \\text{ right of } 2$$",
        steps: [
          { label: "Pair all 3 opposites using Skip-One", mathLatex: "$1 \\leftrightarrow 3, \\qquad 2 \\leftrightarrow 4, \\qquad 5 \\leftrightarrow 6$", plainWhy: "Every straight line of 3 squares makes the outer two opposite!" },
          { label: "Scan the 4 answer cubes for ANY opposite pair", mathLatex: "$\\text{Cube shows } (1, 3, 5)? \\implies \\mathbf{\\text{IMPOSSIBLE!}}$", plainWhy: "1 and 3 sit on opposite sides — they can NEVER share an edge or corner!" },
          { label: "Verify remaining valid cube's cyclic order", mathLatex: "$\\text{Check clockwise order around the 3-face corner}$", plainWhy: "Opposite-pair elimination alone kills 2–3 wrong answers immediately!" }
        ],
        answerLatex: "$$1\\leftrightarrow 3,\\; 2\\leftrightarrow 4,\\; 5\\leftrightarrow 6 \\text{ can NEVER touch}$$",
        commonTrap: "Don't waste 2 minutes mentally folding — ALWAYS write the 3 Skip-1 opposite pairs first!"
      },
      "abs-paper-folding-spatial-views": {
        heroFormula: "$$n\\text{ clean half-folds} \\implies 2^n\\text{ layers}; \\quad \\text{Unfold BACKWARDS across each crease!}$$",
        title: "Unfolding a Double-Folded Hole Punch Step-by-Step",
        problemLatex: "$$\\text{Fold Right→Left, then Top→Bottom; punch 1 hole at top-right of the small square}$$",
        steps: [
          { label: "Undo the LAST fold first (Bottom → Top)", mathLatex: "$\\text{Mirror hole across Horizontal center crease} \\implies 2\\text{ holes}$", plainWhy: "Always reverse folds in Last-In-First-Out (LIFO) order!" },
          { label: "Undo the FIRST fold next (Left → Right)", mathLatex: "$\\text{Mirror BOTH holes across Vertical center crease} \\implies \\mathbf{4\\text{ holes}}$", plainWhy: "Each crease reflects ALL existing holes across it!" },
          { label: "Count check", mathLatex: "$2^2 = 4\\text{ symmetric holes near the center!}$", plainWhy: "Double-check: 2 folds × 1 interior punch = 4 holes ✓!" }
        ],
        answerLatex: "$$4\\text{ symmetric holes clustered around the center}$$",
        commonTrap: "Unfolding in the wrong order or forgetting that holes ON a crease merge into 1 bigger hole!"
      }
    });
  }
})(typeof window !== "undefined" ? window : globalThis);
