---
name: everylingo-maintainer
description: >-
  Token-efficient surgical runbook and copy-paste schemas for extending EveryLingo Studio
  (adding worlds, lessons, visual playgrounds, traps, formulas, speed gym sprints, or tutor tracks)
  without reading large curriculum files in full.
---

# EveryLingo Studio Maintainer Runbook

Always start by reading `/home/sibug/Math/everylingo_manifest.json` (~12 KB) to get exact counts, existing IDs, and line anchors before touching any code.

## 1. Adding New Lessons (Zero Full-File Reads Needed)
Prefer adding new lessons either to the matching modular expansion file (`everylingo_humanities_expansion.js`, `everylingo_tech_ai_expansion.js`, `everylingo_stem_laws_expansion.js`) or a new `everylingo_<domain>_expansion.js` (if new, register `<script>` in `index.html` AND in `verify_and_bundle.mjs`).

### Required Node Schema
```js
{
  id: "unique-kebab-id",
  worldId: "physics", // must exist in everylingo_manifest.json -> worlds
  order: 169,         // next sequential integer from manifest.counts.nodes + 1
  title: "Clear Lesson Title (supports `inline code`)",
  icon: "🔬",
  tagline: "One crisp plain-English summary line.",
  scaryVersion: "Formal textbook phrasing.",
  easyTruth: "Zero-jargon intuition.",
  microSteps: [
    { label: "Step 1: ...", text: "..." },
    { label: "Step 2: ...", text: "..." },
    { label: "Step 3: ...", text: "..." }
  ],
  cheatCode: "1-line exam cheat code.",
  visualizerId: "opticsConcaveConvexLab", // must exist in manifest.playgrounds
  bruteforce: true,
  questions: [
    // Exactly 5 questions; type: "mc" (4 unique options containing answer) or "input".
    // Optional fields: visualSvg: "<svg ...>...</svg>", codeBlock: "multiline code"
    { type: "mc", prompt: "...", options: ["A", "B", "C", "D"], answer: "A", hint: "...", whyEasy: "..." }
  ]
}
```

### Mandatory 4-Point Wiring Checklist for Every New Node
1. **Procedural generator**: Add `case "unique-kebab-id":` inside the file's `DATA.generateProceduralQuestion` wrapper returning `{ type: "mc", prompt, options: [4 unique], answer, hint, whyEasy }`.
2. **Worked example**: Register in `LATEX.registerWorkedExamples({ "unique-kebab-id": { heroFormula, title, problemLatex, steps: [3+], answerLatex, commonTrap } })`.
   - Use only supported LaTeX macros (`\frac`, `\binom`, `\sqrt`, `\sum`, `\int`, `\lim`, `\text`, `\texttt`, `\mathbf`, `\textit`, `\xrightarrow`, `\xleftrightarrow`, Greek letters, `\oplus`, `\approx`, `\le`, `\ge`, `\ne`, `\propto`). Never leave unknown `\cmd` tokens!
3. **Smart Tutor graph**: Add `"unique-kebab-id": { prereqs: [...], tier: 3..5, elo: 1200..1750, tag: "..." }` to `DEPENDENCY_GRAPH` in `tutor.js` (check `manifest.anchors.tutor` for exact line).
4. **Verifier counts**: Update expected counts in `verify_and_bundle.mjs` (`NODES.length`, `totalQuestions`, `bfNodes.length`, `graphKeys.length`, etc.) and run `node /home/sibug/Math/verify_and_bundle.mjs`.

## 2. Adding a New Interactive Visual Playground
Append a renderer function `function renderMyLab(container) { ... }` to `everylingo_playgrounds.js` (read only the last 30 lines via `manifest.files`) and register:
```js
VIZ.registry.myLabId = renderMyLab;
VIZ.list.push({ id: "myLabId", title: "22. My Lab Title", icon: "🧪", category: "physics" });
// Valid categories: "math" | "physics" | "stem" | "ai_code" | "humanities_shapes"
```
- Use CSS vars (`var(--ml-viz-green)`, `var(--ml-viz-blue)`, `var(--ml-viz-amber)`, `var(--ml-viz-plum)`, `var(--ml-viz-rose)`, `var(--ml-surface)`, `var(--ml-bg)`) — NEVER legacy neon hexes!

## 3. Adding Traps or Formula Cards
- **Trap**: Push to `DATA.GRADE12_TRAPS` with `{ id, title, trapExpression, wrongGuess, rightAnswer, whyItHappens, quickRule, quiz: { prompt, options: [4 unique], answer, explanation } }`.
- **Formula Card**: Push to `DATA.MEMORIZE_DATA.physicsLawsCards` / `scienceFormulas` / `codingCards` / `aiCards` — automatically indexed by Global Search (`Ctrl+K`)!

## 4. Verification & Re-Bundle Command
Always run:
```bash
node /home/sibug/Math/verify_and_bundle.mjs
```
This validates all schemas, procedural generators (20× per node), Speed Gym modes (20× per mode), LaTeX zero-leak checks, KWF diacritic checks, non-neon CSS checks, **auto-regenerates `everylingo_manifest.json`**, and writes `everylingo.standalone.html` + `mathlingo.standalone.html`.
