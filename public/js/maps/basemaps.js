export function validateBasemaps(fonds) {
  if (!Array.isArray(fonds) || !fonds.length) throw new Error("Aucun fond de carte configuré.");
  const ids = new Set();
  for (const fond of fonds) {
    if (!fond.id || ids.has(fond.id)) throw new Error("Identifiant de fond manquant ou dupliqué : " + fond.id);
    ids.add(fond.id);
    if (!["maplibre", "raster"].includes(fond.type) || !fond.url) throw new Error("Source de fond invalide : " + fond.id);
    if (!["light", "dark"].includes(fond.theme)) throw new Error("Le thème du fond " + fond.id + " doit être light ou dark.");
  }
  const defaults = fonds.filter(fond => fond.actifParDefaut);
  if (defaults.length !== 1) throw new Error("Un seul fond doit être actif par défaut.");
  for (const lang of ["fr", "en", "es"]) {
    const labels = fonds.map(fond => fond.labels?.[lang] || fond.labels?.fr || fond.id);
    if (new Set(labels).size !== labels.length) throw new Error("Libellés de fonds dupliqués pour " + lang);
  }
  return defaults[0];
}

export function applyBasemapTheme(fond, { document: page = globalThis.document } = {}) {
  const requested = typeof fond === "string" ? fond : fond?.theme;
  const theme = requested === "dark" ? "dark" : "light";
  page.body.classList.toggle("theme-dark", theme === "dark");
  page.body.classList.toggle("theme-light", theme === "light");
  page.body.classList.remove("dark-map-theme");
  page.body.dataset.mapTheme = theme;
  if (typeof fond === "object" && fond?.id) page.body.dataset.basemap = fond.id;
  return theme;
}

export function createBasemapLayer(fond, { L, settings }) {
  const url = String(fond.url).replaceAll("{apiKey}", encodeURIComponent(settings.cleCarto || ""));
  const attribution = fond.attribution || settings.attribution;
  const options = { ...(fond.options || {}) };
  if (fond.type === "raster") {
    return L.tileLayer(url, { maxZoom: settings.zoomMaximum, attribution, ...options });
  }
  if (typeof L.maplibreGL !== "function") throw new Error("Le plugin MapLibre GL Leaflet est requis pour OpenFreeMap.");
  const layer = L.maplibreGL({
    style: url, attribution, interactive: false, updateInterval: 16, fadeDuration: 0, ...options
  });
  layer.getAttribution = () => attribution;
  return layer;
}

export function createBasemapControl({ L, map, entries, lang }) {
  const layers = Object.fromEntries(entries.map(({ config, layer }) => [
    config.labels?.[lang] || config.labels?.fr || config.id, layer
  ]));
  return L.control.layers(layers, null, { position: "bottomright" }).addTo(map);
}

export function waitForBasemapReady(layer, { timeoutMs = 30000 } = {}) {
  const gl = layer.getMaplibreMap?.();
  const target = gl || layer;
  const readyEvent = gl ? "idle" : "load";
  const errorEvent = gl ? "error" : "tileerror";
  const isReady = gl
    ? () => gl.loaded() && gl.areTilesLoaded() && !gl.isMoving()
    : () => !layer.isLoading();

  return new Promise((resolve, reject) => {
    const requestFrame = globalThis.requestAnimationFrame?.bind(globalThis) || (callback => setTimeout(callback, 0));
    const cancelFrame = globalThis.cancelAnimationFrame?.bind(globalThis) || clearTimeout;
    let frame = null;
    let settled = false;
    const finish = error => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (frame !== null) cancelFrame(frame);
      target.off(readyEvent, check);
      target.off(errorEvent, fail);
      if (error) reject(error);
      else resolve();
    };
    const check = () => {
      if (settled || frame !== null || !isReady()) return;
      // Deux images laissent le navigateur peindre les tuiles et les sources GeoJSON.
      frame = requestFrame(() => {
        frame = requestFrame(() => {
          frame = null;
          if (isReady()) finish();
        });
      });
    };
    const fail = event => finish(event.error || new Error("Impossible de charger le fond de carte."));
    const timer = setTimeout(() => finish(new Error("Délai de chargement du fond de carte dépassé.")), timeoutMs);
    target.on(readyEvent, check);
    target.on(errorEvent, fail);
    check();
  });
}


export function createBasemapManager({ L, map, settings, lang = "fr", onChange = () => {} }) {
  const initial = validateBasemaps(settings.fonds);
  const entries = settings.fonds.map(config => ({ config, layer: createBasemapLayer(config, { L, settings }) }));
  let active = null;
  let control = null;
  let language = lang;
  let lastLight = entries.find(({ config }) => config.theme === "light")?.config.id;
  let lastDark = entries.find(({ config }) => config.theme === "dark")?.config.id;
  for (const entry of entries) {
    entry.layer.on("add", () => {
      active = entry;
      if (entry.config.theme === "dark") lastDark = entry.config.id;
      else lastLight = entry.config.id;
      onChange(entry.config);
    });
  }
  const select = id => {
    const entry = entries.find(item => item.config.id === id);
    if (!entry) throw new Error("Fond inconnu : " + id);
    if (entry === active) return entry.layer;
    if (active) map.removeLayer(active.layer);
    entry.layer.addTo(map);
    return entry.layer;
  };
  const setLanguage = next => {
    language = next;
    if (control) map.removeControl(control);
    control = entries.length > 1 ? createBasemapControl({ L, map, entries, lang: language }) : null;
  };
  select(initial.id);
  setLanguage(language);
  return {
    getActive: () => active,
    select,
    setLanguage,
    toggleTheme: () => {
      const id = active?.config.theme === "dark" ? lastLight : lastDark;
      return id ? select(id) : active?.layer;
    }
  };
}
