/* ==========================================================================
   PRIMER STUDIO — Personal Sync Engine (v3.1.0)
   100% Offline-First, Zero-Backend, Personal Cross-Device Sync:
   1. Private GitHub Gist 1-Click Smart Sync (Pull + Merge + Push)
   2. Compressed Instant Sync Links (#primer-sync=gz.<base64url>) via native gzip
   3. Lossless Smart State Merge across Laptop, Phone & Tablet
   SECURITY INVARIANT: GitHub PAT is stored ONLY in localStorage ("primer_v1_sync_cfg")
   and is NEVER exported into JSON backups, Save Codes, Sync Links, or Gists.
   ========================================================================== */
(function (global) {
  "use strict";

  const SYNC_CFG_KEY = "primer_v1_sync_cfg";
  const DEFAULT_FILENAME = "primer-studio-sync.json";
  const HASH_PREFIX = "#primer-sync=";
  const FORBIDDEN_EXPORT_KEYS = [
    "syncToken",
    "githubToken",
    "pat",
    "gistToken",
    "_syncCfg",
    "primer_v1_sync_cfg"
  ];

  let autoSyncTimer = null;
  let syncInFlight = false;

  function detectDeviceLabel() {
    try {
      const ua = (typeof navigator !== "undefined" && navigator.userAgent) ? navigator.userAgent : "";
      if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "Tablet";
      if (/iPhone|Android.*Mobile|Mobile/i.test(ua)) return "Phone";
      if (/Android/i.test(ua)) return "Tablet";
      if (/Macintosh|Mac OS/i.test(ua)) return "Mac";
      if (/Windows/i.test(ua)) return "Windows PC";
      if (/Linux/i.test(ua)) return "Linux Laptop";
    } catch (_e) {}
    return "My Device";
  }

  function defaultConfig() {
    return {
      token: "",
      gistId: "",
      gistFilename: DEFAULT_FILENAME,
      deviceLabel: detectDeviceLabel(),
      autoSync: false,
      lastSyncedAt: null,
      lastSyncAction: "",
      lastSyncError: "",
      githubLogin: ""
    };
  }

  function loadConfig() {
    const base = defaultConfig();
    try {
      const storage = typeof window !== "undefined" && window.localStorage ? window.localStorage : null;
      const raw = storage ? storage.getItem(SYNC_CFG_KEY) : null;
      if (!raw) return base;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return base;
      return Object.assign(base, {
        token: typeof parsed.token === "string" ? parsed.token.trim() : "",
        gistId: typeof parsed.gistId === "string" ? normalizeGistId(parsed.gistId) : "",
        gistFilename: (typeof parsed.gistFilename === "string" && parsed.gistFilename.trim()) ? parsed.gistFilename.trim() : DEFAULT_FILENAME,
        deviceLabel: (typeof parsed.deviceLabel === "string" && parsed.deviceLabel.trim()) ? parsed.deviceLabel.trim().slice(0, 40) : base.deviceLabel,
        autoSync: Boolean(parsed.autoSync),
        lastSyncedAt: parsed.lastSyncedAt || null,
        lastSyncAction: typeof parsed.lastSyncAction === "string" ? parsed.lastSyncAction : "",
        lastSyncError: typeof parsed.lastSyncError === "string" ? parsed.lastSyncError : "",
        githubLogin: typeof parsed.githubLogin === "string" ? parsed.githubLogin : ""
      });
    } catch (_e) {
      return base;
    }
  }

  function saveConfig(patch) {
    const next = Object.assign(loadConfig(), patch || {});
    next.token = String(next.token || "").trim();
    next.gistId = normalizeGistId(next.gistId || "");
    next.gistFilename = String(next.gistFilename || DEFAULT_FILENAME).trim() || DEFAULT_FILENAME;
    next.deviceLabel = String(next.deviceLabel || detectDeviceLabel()).trim().slice(0, 40) || "My Device";
    next.autoSync = Boolean(next.autoSync);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(SYNC_CFG_KEY, JSON.stringify(next));
      }
    } catch (_e) {}
    return next;
  }

  function clearConfig() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(SYNC_CFG_KEY);
      }
    } catch (_e) {}
    return defaultConfig();
  }

  function normalizeGistId(input) {
    const raw = String(input || "").trim();
    if (!raw) return "";
    // Accept full gist URL like https://gist.github.com/user/abc123def456
    const m = raw.match(/gist\.github\.com\/(?:[^/]+\/)?([a-f0-9]{16,64})/i);
    if (m) return m[1];
    return raw.replace(/[^a-zA-Z0-9_-]/g, "");
  }

  function isConfigured(cfg) {
    const c = cfg || loadConfig();
    return Boolean(c.token && c.token.length >= 10);
  }

  function sanitizeStateForExport(state) {
    const src = state && typeof state === "object" ? state : {};
    let copy;
    try {
      copy = JSON.parse(JSON.stringify(src));
    } catch (_e) {
      copy = Object.assign({}, src);
    }
    for (const k of FORBIDDEN_EXPORT_KEYS) {
      if (k in copy) delete copy[k];
    }
    return copy;
  }

  function summarizeState(state) {
    const s = state && typeof state === "object" ? state : {};
    const nodeMastery = s.nodeMastery && typeof s.nodeMastery === "object" ? s.nodeMastery : {};
    const masteredCount = Object.values(nodeMastery).filter((v) => Number(v) >= 1).length;
    const decks = Array.isArray(s.userDecks) ? s.userDecks : [];
    const cardCount = decks.reduce((sum, d) => sum + (Array.isArray(d && d.cards) ? d.cards.length : 0), 0);
    const notesObj = s.userNotes && typeof s.userNotes === "object" ? s.userNotes : {};
    const noteCount = Object.keys(notesObj).length;
    const bookmarkCount = Array.isArray(s.userBookmarks) ? s.userBookmarks.length : 0;
    const examCount = Array.isArray(s.examHistory) ? s.examHistory.length : 0;
    const forgeCount = s.forgeSolved && typeof s.forgeSolved === "object" ? Object.keys(s.forgeSolved).length : 0;
    const derivationCount = s.derivationsSolved && typeof s.derivationsSolved === "object" ? Object.keys(s.derivationsSolved).length : 0;
    return {
      xp: Number(s.xp || 0),
      gems: Number(s.gems || 0),
      dailyStreak: Number(s.dailyStreak || s.streak || 1),
      masteredCount,
      deckCount: decks.length,
      cardCount,
      noteCount,
      bookmarkCount,
      examCount,
      forgeCount,
      derivationCount
    };
  }

  function mergeNumericMapMax(a, b) {
    const out = {};
    const oa = a && typeof a === "object" ? a : {};
    const ob = b && typeof b === "object" ? b : {};
    for (const k of Object.keys(oa)) {
      const v = Number(oa[k] || 0);
      if (!Number.isNaN(v)) out[k] = v;
    }
    for (const k of Object.keys(ob)) {
      const v = Number(ob[k] || 0);
      if (!Number.isNaN(v)) out[k] = Math.max(out[k] || 0, v);
    }
    return out;
  }

  function mergeTruthyObjectMap(a, b) {
    const out = {};
    const oa = a && typeof a === "object" ? a : {};
    const ob = b && typeof b === "object" ? b : {};
    const keys = new Set([...Object.keys(oa), ...Object.keys(ob)]);
    for (const k of keys) {
      const va = oa[k];
      const vb = ob[k];
      if (va && !vb) {
        out[k] = va;
      } else if (vb && !va) {
        out[k] = vb;
      } else if (va && vb) {
        if (typeof va === "object" && typeof vb === "object") {
          const ta = Number(va.at || va.updatedAt || va.solvedAt || 0);
          const tb = Number(vb.at || vb.updatedAt || vb.solvedAt || 0);
          const mergedObj = Object.assign({}, tb >= ta ? va : vb, tb >= ta ? vb : va);
          if (typeof va.count === "number" || typeof vb.count === "number") {
            mergedObj.count = Math.max(Number(va.count || 0), Number(vb.count || 0));
          }
          if (typeof va.bestScore === "number" || typeof vb.bestScore === "number") {
            mergedObj.bestScore = Math.max(Number(va.bestScore || 0), Number(vb.bestScore || 0));
          }
          out[k] = mergedObj;
        } else {
          out[k] = typeof va === "number" && typeof vb === "number" ? Math.max(va, vb) : (va || vb);
        }
      }
    }
    return out;
  }

  function mergeStringArrayUnion(a, b) {
    const out = [];
    const seen = new Set();
    for (const list of [Array.isArray(a) ? a : [], Array.isArray(b) ? b : []]) {
      for (const item of list) {
        const key = String(item);
        if (!seen.has(key)) {
          seen.add(key);
          out.push(item);
        }
      }
    }
    return out;
  }

  function mergeNotes(localNotes, remoteNotes) {
    const out = {};
    const la = localNotes && typeof localNotes === "object" ? localNotes : {};
    const rb = remoteNotes && typeof remoteNotes === "object" ? remoteNotes : {};
    const keys = new Set([...Object.keys(la), ...Object.keys(rb)]);
    for (const k of keys) {
      const a = la[k];
      const b = rb[k];
      if (a && !b) {
        out[k] = a;
      } else if (b && !a) {
        out[k] = b;
      } else if (a && b) {
        const ta = Number(a.updatedAt || 0);
        const tb = Number(b.updatedAt || 0);
        out[k] = tb > ta ? b : a;
      }
    }
    return out;
  }

  function mergeDecks(localDecks, remoteDecks) {
    const la = Array.isArray(localDecks) ? localDecks : [];
    const rb = Array.isArray(remoteDecks) ? remoteDecks : [];
    const byId = new Map();

    function mergeCardLists(cardsA, cardsB) {
      const map = new Map();
      const order = [];
      for (const c of [...(Array.isArray(cardsA) ? cardsA : []), ...(Array.isArray(cardsB) ? cardsB : [])]) {
        if (!c || typeof c !== "object") continue;
        const cid = c.id || `${c.front || ""}::${c.back || ""}`;
        if (!map.has(cid)) {
          map.set(cid, c);
          order.push(cid);
        } else {
          const prev = map.get(cid);
          const prevScore = Number(prev.reps || 0) * 1e12 + Number(prev.lastReviewed || prev.updatedAt || 0);
          const nextScore = Number(c.reps || 0) * 1e12 + Number(c.lastReviewed || c.updatedAt || 0);
          map.set(cid, nextScore > prevScore ? c : prev);
        }
      }
      return order.map((id) => map.get(id));
    }

    for (const d of la) {
      if (!d || typeof d !== "object") continue;
      const id = d.id || `deck:${d.title || Math.random()}`;
      byId.set(id, Object.assign({}, d, { cards: Array.isArray(d.cards) ? d.cards.slice() : [] }));
    }
    for (const d of rb) {
      if (!d || typeof d !== "object") continue;
      const id = d.id || `deck:${d.title || Math.random()}`;
      if (!byId.has(id)) {
        byId.set(id, Object.assign({}, d, { cards: Array.isArray(d.cards) ? d.cards.slice() : [] }));
      } else {
        const prev = byId.get(id);
        const newerMeta = Number(d.updatedAt || 0) > Number(prev.updatedAt || 0) ? d : prev;
        byId.set(id, Object.assign({}, prev, newerMeta, {
          cards: mergeCardLists(prev.cards, d.cards)
        }));
      }
    }
    return Array.from(byId.values());
  }

  function mergeExamHistory(localHist, remoteHist) {
    const la = Array.isArray(localHist) ? localHist : [];
    const rb = Array.isArray(remoteHist) ? remoteHist : [];
    const seen = new Map();
    for (const item of [...la, ...rb]) {
      if (!item || typeof item !== "object") continue;
      const key = item.id || `${item.examId || ""}:${item.at || item.date || item.timestamp || ""}:${item.pct || 0}:${item.correct || 0}`;
      if (!seen.has(key)) seen.set(key, item);
    }
    return Array.from(seen.values())
      .sort((x, y) => Number(y.at || y.timestamp || 0) - Number(x.at || x.timestamp || 0))
      .slice(0, 120);
  }

  function mergeMistakes(localList, remoteList) {
    const la = Array.isArray(localList) ? localList : [];
    const rb = Array.isArray(remoteList) ? remoteList : [];
    const seen = new Set();
    const out = [];
    for (const m of [...la, ...rb]) {
      if (!m || typeof m !== "object") continue;
      const key = `${m.nodeId || ""}::${m.prompt || ""}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(m);
      }
    }
    return out.slice(0, 120);
  }

  function mergeTelemetry(a, b) {
    const ta = a && typeof a === "object" ? a : null;
    const tb = b && typeof b === "object" ? b : null;
    if (!ta && !tb) return undefined;
    if (!ta) return tb;
    if (!tb) return ta;
    const out = Object.assign({}, ta);
    out.eloRating = Math.max(Number(ta.eloRating || 1000), Number(tb.eloRating || 1000));
    if (ta.domainElo || tb.domainElo) {
      out.domainElo = mergeNumericMapMax(ta.domainElo, tb.domainElo);
    }
    if (ta.nodeStats || tb.nodeStats) {
      const nsA = ta.nodeStats || {};
      const nsB = tb.nodeStats || {};
      const ns = {};
      const keys = new Set([...Object.keys(nsA), ...Object.keys(nsB)]);
      for (const k of keys) {
        const sa = nsA[k];
        const sb = nsB[k];
        if (sa && !sb) ns[k] = sa;
        else if (sb && !sa) ns[k] = sb;
        else if (sa && sb) {
          const newer = Number(sb.lastSeen || 0) > Number(sa.lastSeen || 0) ? sb : sa;
          ns[k] = Object.assign({}, newer, {
            attempts: Math.max(Number(sa.attempts || 0), Number(sb.attempts || 0)),
            correct: Math.max(Number(sa.correct || 0), Number(sb.correct || 0)),
            reps: Math.max(Number(sa.reps || 0), Number(sb.reps || 0)),
            lastSeen: Math.max(Number(sa.lastSeen || 0), Number(sb.lastSeen || 0))
          });
        }
      }
      out.nodeStats = ns;
    }
    return out;
  }

  function mergeStates(localState, remoteState, defaultState) {
    const def = defaultState && typeof defaultState === "object" ? defaultState : {};
    const loc = sanitizeStateForExport(Object.assign({}, def, localState || {}));
    const rem = sanitizeStateForExport(Object.assign({}, def, remoteState || {}));
    const merged = Object.assign({}, def, loc);

    merged.xp = Math.max(Number(loc.xp || 0), Number(rem.xp || 0));
    merged.gems = Math.max(Number(loc.gems || 0), Number(rem.gems || 0));
    merged.streak = Math.max(Number(loc.streak || 1), Number(rem.streak || 1));
    merged.dailyStreak = Math.max(Number(loc.dailyStreak || 1), Number(rem.dailyStreak || 1));
    merged.streakFreezes = Math.max(Number(loc.streakFreezes || 0), Number(rem.streakFreezes || 0));
    merged.bestCombo = Math.max(Number(loc.bestCombo || 0), Number(rem.bestCombo || 0));
    merged.resolvedMistakesCount = Math.max(Number(loc.resolvedMistakesCount || 0), Number(rem.resolvedMistakesCount || 0));
    merged.hearts = Math.max(Number(loc.hearts || 0), Number(rem.hearts || 0));

    if (loc.lastStudiedDate && rem.lastStudiedDate) {
      merged.lastStudiedDate = String(rem.lastStudiedDate) > String(loc.lastStudiedDate) ? rem.lastStudiedDate : loc.lastStudiedDate;
    } else {
      merged.lastStudiedDate = loc.lastStudiedDate || rem.lastStudiedDate || null;
    }

    merged.studyLog = mergeNumericMapMax(loc.studyLog, rem.studyLog);
    merged.nodeMastery = mergeNumericMapMax(loc.nodeMastery, rem.nodeMastery);
    merged.multMastered = mergeNumericMapMax(loc.multMastered, rem.multMastered);
    merged.gymBest = mergeNumericMapMax(loc.gymBest, rem.gymBest);

    merged.trapBusted = mergeTruthyObjectMap(loc.trapBusted, rem.trapBusted);
    merged.synthSolved = mergeTruthyObjectMap(loc.synthSolved, rem.synthSolved);
    merged.forgeSolved = mergeTruthyObjectMap(loc.forgeSolved, rem.forgeSolved);
    merged.derivationsSolved = mergeTruthyObjectMap(loc.derivationsSolved, rem.derivationsSolved);

    // Keep user's code edits across quests (prefer non-empty; if both exist prefer local unless remote is solved and local isn't)
    const codeOut = Object.assign({}, rem.forgeCode || {}, loc.forgeCode || {});
    for (const qid of Object.keys(rem.forgeCode || {})) {
      if (rem.forgeSolved && rem.forgeSolved[qid] && !(loc.forgeSolved && loc.forgeSolved[qid])) {
        codeOut[qid] = rem.forgeCode[qid];
      }
    }
    merged.forgeCode = codeOut;

    merged.badges = mergeStringArrayUnion(loc.badges, rem.badges);
    merged.ownedThemes = mergeStringArrayUnion(loc.ownedThemes, rem.ownedThemes);
    merged.ownedAccessories = mergeStringArrayUnion(loc.ownedAccessories, rem.ownedAccessories);
    merged.userBookmarks = mergeStringArrayUnion(loc.userBookmarks, rem.userBookmarks);
    merged.diagnosticCracks = mergeStringArrayUnion(loc.diagnosticCracks, rem.diagnosticCracks);
    if (!merged.diagnosticNodeId && rem.diagnosticNodeId) merged.diagnosticNodeId = rem.diagnosticNodeId;
    if (!merged.diagnosticSummary && rem.diagnosticSummary) merged.diagnosticSummary = rem.diagnosticSummary;

    merged.userNotes = mergeNotes(loc.userNotes, rem.userNotes);
    merged.userDecks = mergeDecks(loc.userDecks, rem.userDecks);
    merged.examHistory = mergeExamHistory(loc.examHistory, rem.examHistory);
    merged.mistakes = mergeMistakes(loc.mistakes, rem.mistakes);

    const mergedTel = mergeTelemetry(loc.telemetry, rem.telemetry);
    if (mergedTel) merged.telemetry = mergedTel;

    return sanitizeStateForExport(merged);
  }

  // ==================== COMPRESSED SYNC LINK (NATIVE GZIP + BASE64URL) ====================

  function bytesToBase64Url(bytes) {
    let bin = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    const b64 = (typeof window !== "undefined" && window.btoa)
      ? window.btoa(bin)
      : Buffer.from(bytes).toString("base64");
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function base64UrlToBytes(b64url) {
    let b64 = String(b64url || "").replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4 !== 0) b64 += "=";
    if (typeof window !== "undefined" && window.atob) {
      const bin = window.atob(b64);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    }
    return new Uint8Array(Buffer.from(b64, "base64"));
  }

  async function gzipCompressString(str) {
    const rawBytes = new TextEncoder().encode(str);
    if (typeof CompressionStream === "undefined") {
      return { codec: "b64", payload: bytesToBase64Url(rawBytes), rawBytes: rawBytes.length, encodedBytes: rawBytes.length };
    }
    const cs = new CompressionStream("gzip");
    const writer = cs.writable.getWriter();
    writer.write(rawBytes);
    writer.close();
    const compressedBuf = await new Response(cs.readable).arrayBuffer();
    const compBytes = new Uint8Array(compressedBuf);
    return { codec: "gz", payload: bytesToBase64Url(compBytes), rawBytes: rawBytes.length, encodedBytes: compBytes.length };
  }

  async function gzipDecompressToString(b64url) {
    if (typeof DecompressionStream === "undefined") {
      throw new Error("This browser does not support gzip sync links. Use JSON Export or GitHub Gist Sync instead.");
    }
    const compBytes = base64UrlToBytes(b64url);
    const ds = new DecompressionStream("gzip");
    const writer = ds.writable.getWriter();
    writer.write(compBytes);
    writer.close();
    const rawBuf = await new Response(ds.readable).arrayBuffer();
    return new TextDecoder().decode(rawBuf);
  }

  async function encodeCompressedToken(state) {
    const clean = sanitizeStateForExport(state);
    const envelope = {
      v: 1,
      ts: Date.now(),
      dev: loadConfig().deviceLabel,
      state: clean
    };
    const json = JSON.stringify(envelope);
    const res = await gzipCompressString(json);
    const token = `${res.codec}.${res.payload}`;
    return {
      token,
      codec: res.codec,
      rawChars: json.length,
      tokenChars: token.length,
      ratioPct: Math.max(0, Math.round((1 - token.length / Math.max(1, json.length)) * 100))
    };
  }

  async function encodeCompressedLink(state, baseUrl) {
    const enc = await encodeCompressedToken(state);
    let base = baseUrl;
    if (!base && typeof window !== "undefined" && window.location) {
      base = `${window.location.origin}${window.location.pathname}`;
    }
    const url = (base && !base.startsWith("null")) ? `${base}${HASH_PREFIX}${enc.token}` : `${HASH_PREFIX}${enc.token}`;
    return Object.assign({}, enc, { url });
  }

  async function decodeSyncPayload(rawInput) {
    let txt = String(rawInput || "").trim();
    if (!txt) throw new Error("Empty sync payload.");
    const hashIdx = txt.indexOf(HASH_PREFIX);
    if (hashIdx >= 0) {
      txt = txt.slice(hashIdx + HASH_PREFIX.length).trim();
    }
    let parsed = null;
    if (txt.startsWith("gz.")) {
      const jsonStr = await gzipDecompressToString(txt.slice(3));
      parsed = JSON.parse(jsonStr);
    } else if (txt.startsWith("b64.")) {
      const bytes = base64UrlToBytes(txt.slice(4));
      parsed = JSON.parse(new TextDecoder().decode(bytes));
    } else if (txt.startsWith("{")) {
      parsed = JSON.parse(txt);
    } else {
      // Legacy Save Code format (window.btoa(unescape(encodeURIComponent(json))))
      const decoded = decodeURIComponent(escape((typeof window !== "undefined" && window.atob) ? window.atob(txt) : Buffer.from(txt, "base64").toString("binary")));
      parsed = JSON.parse(decoded);
    }
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid sync payload object.");
    }
    // Unwrap envelope if present
    if (parsed.state && typeof parsed.state === "object") {
      return {
        state: sanitizeStateForExport(parsed.state),
        updatedAt: parsed.updatedAt || parsed.ts || null,
        deviceLabel: parsed.deviceLabel || parsed.dev || "Another Device",
        summary: summarizeState(parsed.state)
      };
    }
    return {
      state: sanitizeStateForExport(parsed),
      updatedAt: null,
      deviceLabel: "Save Code / JSON",
      summary: summarizeState(parsed)
    };
  }

  function extractIncomingHashSync() {
    try {
      if (typeof window === "undefined" || !window.location) return null;
      const h = window.location.hash || "";
      if (!h.startsWith(HASH_PREFIX)) return null;
      const payload = h.slice(HASH_PREFIX.length).trim();
      // Scrub hash immediately so reload doesn't re-prompt
      if (window.history && window.history.replaceState) {
        const cleanUrl = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(null, "", cleanUrl);
      }
      return payload || null;
    } catch (_e) {
      return null;
    }
  }

  // ==================== PRIVATE GITHUB GIST 1-CLICK SYNC ====================

  function githubHeaders(token) {
    return {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json"
    };
  }

  async function githubFetchJson(url, opts) {
    if (typeof fetch !== "function") {
      throw new Error("Fetch API unavailable in this environment.");
    }
    let resp;
    try {
      resp = await fetch(url, opts);
    } catch (_netErr) {
      throw new Error("Network unavailable — you're offline. Local progress is safe; try syncing again when back online.");
    }
    let data = null;
    try {
      data = await resp.json();
    } catch (_e) {}
    if (!resp.ok) {
      const apiMsg = data && data.message ? data.message : `HTTP ${resp.status}`;
      if (resp.status === 401) throw new Error("GitHub rejected the token (401 Unauthorized). Check that your Personal Access Token is valid and not expired.");
      if (resp.status === 403) throw new Error(`GitHub denied permission (403): ${apiMsg}. Make sure the token has Gists: Read & Write permission.`);
      if (resp.status === 404) throw new Error("Gist not found (404). Verify the Gist ID or clear Gist ID to create a fresh private sync Gist.");
      throw new Error(`GitHub Sync error (${resp.status}): ${apiMsg}`);
    }
    return data;
  }

  async function testGistConnection(cfgOverride) {
    const cfg = Object.assign(loadConfig(), cfgOverride || {});
    if (!cfg.token) throw new Error("Paste a GitHub Personal Access Token (Gists scope) first.");
    const user = await githubFetchJson("https://api.github.com/user", {
      method: "GET",
      headers: githubHeaders(cfg.token)
    });
    let gistInfo = null;
    if (cfg.gistId) {
      const gist = await githubFetchJson(`https://api.github.com/gists/${encodeURIComponent(cfg.gistId)}`, {
        method: "GET",
        headers: githubHeaders(cfg.token)
      });
      gistInfo = {
        id: gist.id,
        isPrivate: !gist.public,
        updatedAt: gist.updated_at,
        files: Object.keys(gist.files || {})
      };
    }
    saveConfig({ githubLogin: user.login || "", lastSyncError: "" });
    return {
      login: user.login || "GitHub User",
      gistInfo
    };
  }

  async function pullFromGist(cfgOverride) {
    const cfg = Object.assign(loadConfig(), cfgOverride || {});
    if (!cfg.token) throw new Error("GitHub token is missing.");
    if (!cfg.gistId) throw new Error("No Gist ID configured yet. Push once from your main device first, then paste that Gist ID here.");
    const gist = await githubFetchJson(`https://api.github.com/gists/${encodeURIComponent(cfg.gistId)}`, {
      method: "GET",
      headers: githubHeaders(cfg.token)
    });
    const files = gist.files || {};
    const targetFile = files[cfg.gistFilename] || Object.values(files).find((f) => f && /\.json$/i.test(f.filename || ""));
    if (!targetFile) {
      throw new Error(`Gist ${cfg.gistId} has no JSON sync file (${cfg.gistFilename}).`);
    }
    let rawContent = targetFile.content;
    if (targetFile.truncated && targetFile.raw_url) {
      const rawResp = await fetch(targetFile.raw_url);
      rawContent = await rawResp.text();
    }
    const parsed = JSON.parse(rawContent);
    const remoteState = (parsed && parsed.state && typeof parsed.state === "object") ? parsed.state : parsed;
    const clean = sanitizeStateForExport(remoteState);
    const updatedAt = parsed.updatedAt || gist.updated_at || new Date().toISOString();
    return {
      gistId: gist.id,
      gistUrl: gist.html_url || `https://gist.github.com/${gist.id}`,
      isPrivate: !gist.public,
      updatedAt,
      deviceLabel: parsed.deviceLabel || "Cloud Gist",
      summary: summarizeState(clean),
      state: clean
    };
  }

  async function pushToGist(state, cfgOverride) {
    const cfg = Object.assign(loadConfig(), cfgOverride || {});
    if (!cfg.token) throw new Error("Paste a GitHub Personal Access Token (Gists scope) first.");
    const build = (typeof window !== "undefined" && window.PRIMER_BUILD) ? window.PRIMER_BUILD : { version: "3.1.0" };
    const cleanState = sanitizeStateForExport(state);
    const nowIso = new Date().toISOString();
    const envelope = {
      schemaVersion: 1,
      app: "Primer Studio",
      appVersion: build.version || "3.1.0",
      updatedAt: nowIso,
      deviceLabel: cfg.deviceLabel || detectDeviceLabel(),
      summary: summarizeState(cleanState),
      state: cleanState
    };
    const body = {
      description: "Primer Studio — Personal Learning OS Sync Snapshot (Private)",
      files: {
        [cfg.gistFilename || DEFAULT_FILENAME]: {
          content: JSON.stringify(envelope, null, 2)
        }
      }
    };

    let gist;
    let created = false;
    if (cfg.gistId) {
      gist = await githubFetchJson(`https://api.github.com/gists/${encodeURIComponent(cfg.gistId)}`, {
        method: "PATCH",
        headers: githubHeaders(cfg.token),
        body: JSON.stringify(body)
      });
    } else {
      body.public = false; // ALWAYS private!
      gist = await githubFetchJson("https://api.github.com/gists", {
        method: "POST",
        headers: githubHeaders(cfg.token),
        body: JSON.stringify(body)
      });
      created = true;
    }

    const updatedCfg = saveConfig({
      gistId: gist.id,
      lastSyncedAt: nowIso,
      lastSyncAction: created ? "created" : "pushed",
      lastSyncError: ""
    });

    return {
      created,
      gistId: gist.id,
      gistUrl: gist.html_url || `https://gist.github.com/${gist.id}`,
      isPrivate: !gist.public,
      updatedAt: nowIso,
      config: updatedCfg
    };
  }

  async function smartSyncWithGist(localState, defaultState, cfgOverride) {
    const cfg = Object.assign(loadConfig(), cfgOverride || {});
    if (!cfg.token) throw new Error("Paste a GitHub Personal Access Token (Gists scope) first.");
    let finalState = sanitizeStateForExport(localState);
    let pulledFrom = null;
    if (cfg.gistId) {
      try {
        const pulled = await pullFromGist(cfg);
        finalState = mergeStates(finalState, pulled.state, defaultState);
        pulledFrom = pulled;
      } catch (err) {
        saveConfig({ lastSyncError: err.message });
        throw err;
      }
    }
    const pushed = await pushToGist(finalState, cfg);
    saveConfig({
      gistId: pushed.gistId,
      lastSyncedAt: pushed.updatedAt,
      lastSyncAction: pulledFrom ? "merged" : (pushed.created ? "created" : "pushed"),
      lastSyncError: ""
    });
    return {
      mergedState: finalState,
      pulledFrom,
      pushed,
      gistId: pushed.gistId,
      gistUrl: pushed.gistUrl,
      updatedAt: pushed.updatedAt,
      action: pulledFrom ? "merged" : (pushed.created ? "created" : "pushed")
    };
  }

  function scheduleAutoSync(getStateFn, defaultState, onMergedFn, onStatusFn) {
    const cfg = loadConfig();
    if (!cfg.autoSync || !cfg.token || !cfg.gistId) return;
    if (typeof navigator !== "undefined" && navigator.onLine === false) return;
    if (autoSyncTimer) clearTimeout(autoSyncTimer);
    autoSyncTimer = setTimeout(async () => {
      if (syncInFlight) return;
      const latestCfg = loadConfig();
      if (!latestCfg.autoSync || !latestCfg.token || !latestCfg.gistId) return;
      if (typeof navigator !== "undefined" && navigator.onLine === false) return;
      syncInFlight = true;
      try {
        const current = getStateFn();
        const res = await smartSyncWithGist(current, defaultState, latestCfg);
        if (onMergedFn) onMergedFn(res.mergedState);
        if (onStatusFn) onStatusFn({ ok: true, res });
      } catch (err) {
        saveConfig({ lastSyncError: err.message || "Auto-sync failed" });
        if (onStatusFn) onStatusFn({ ok: false, error: err.message || "Auto-sync failed" });
      } finally {
        syncInFlight = false;
      }
    }, 12000);
  }

  global.PRIMER_SYNC = {
    SYNC_CFG_KEY,
    DEFAULT_FILENAME,
    HASH_PREFIX,
    detectDeviceLabel,
    loadConfig,
    saveConfig,
    clearConfig,
    normalizeGistId,
    isConfigured,
    sanitizeStateForExport,
    summarizeState,
    mergeStates,
    encodeCompressedToken,
    encodeCompressedLink,
    decodeSyncPayload,
    extractIncomingHashSync,
    testGistConnection,
    pullFromGist,
    pushToGist,
    smartSyncWithGist,
    scheduleAutoSync
  };
})(typeof window !== "undefined" ? window : globalThis);
