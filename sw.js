// Primer Studio Offline-First Service Worker
// Cache version is auto-stamped by verify_and_bundle.mjs
const CACHE_NAME = "primer-studio-v3.1.0-086c98f";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./primer-icon.svg",
  "./primer-icon-192.png",
  "./primer-icon-512.png",
  "./styles.css",
  "./curriculum.js",
  "./science_curriculum.js",
  "./exam_expansion.js",
  "./latex_tutorial.js",
  "./shs_handouts_expansion.js",
  "./everylingo_humanities_expansion.js",
  "./everylingo_tech_ai_expansion.js",
  "./everylingo_stem_laws_expansion.js",
  "./everylingo_earth_econ_phil_expansion.js",
  "./everylingo_coding_engine.js",
  "./everylingo_coding_curriculum.js",
  "./everylingo_exam_curriculum.js",
  "./everylingo_code_forge.js",
  "./everylingo_exam_mode.js",
  "./primer_whiteboard.js",
  "./primer_work_studio.js",
  "./primer_my_vault.js",
  "./primer_constellation.js",
  "./tutor.js",
  "./visualizers.js",
  "./everylingo_playgrounds.js",
  "./memorize.js",
  "./build_info.js",
  "./app.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("primer-studio-") && k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Network-first for live local/PWA freshness, falling back to offline cache seamlessly
  const cleanUrl = url.pathname;
  event.respondWith(
    fetch(req)
      .then((resp) => {
        if (resp && resp.status === 200 && resp.type === "basic") {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(cleanUrl, copy)).catch(() => {});
        }
        return resp;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
