// Fonds, options et palettes de la carte Exil.
// Un seul fond actifParDefaut: true ; theme: "light" ou "dark".
// Les flux restent le mode de représentation d'Exil ; les régions sont des enveloppes calculées.
// Couleurs de région null : utiliser la couleur du rôle accueil/exil.
export const REGLAGES = {
  projet: {
    langueParDefaut: "fr",
    langues: [
      "fr",
      "en",
      "es"
    ]
  },
  fichiers: {
    donnees: "data/baseexil.json",
    detailsPays: "data/country-details.json",
    traductions: "data/i18n.json",
    logo: "assets/logo.svg"
  },
  carte: {
    centreInitial: [
      28,
      28
    ],
    zoomInitial: 3,
    zoomMinimum: 3,
    zoomMinimumNavigation: 2,
    zoomMaximum: 8,
    zoomDelta: 1,
    zoomSnap: 1,
    scrollWheelZoom: true,
    worldCopyJump: true,
    zoomMaximumRegion: 5,
    ajusterVueAuRegion: true,
    delaiChargementMaximum: 30000,
    attribution: "<a href=\"https://openfreemap.org/\" target=\"_blank\" rel=\"noopener noreferrer\">OpenFreeMap</a> &copy; <a href=\"https://www.openmaptiles.org/\" target=\"_blank\" rel=\"noopener noreferrer\">OpenMapTiles</a> Data from <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\" rel=\"noopener noreferrer\">OpenStreetMap</a>",
    fonds: [
      {
        id: "positron",
        labels: {
          fr: "Clair",
          en: "Light",
          es: "Claro"
        },
        type: "maplibre",
        url: "https://tiles.openfreemap.org/styles/positron",
        options: {
          attributionControl: false
        },
        theme: "light",
        actifParDefaut: true
      },
      {
        id: "dark",
        labels: {
          fr: "Sombre",
          en: "Dark",
          es: "Oscuro"
        },
        type: "maplibre",
        url: "https://tiles.openfreemap.org/styles/dark",
        options: {
          attributionControl: false
        },
        theme: "dark",
        actifParDefaut: false
      },
      {
        id: "fiord",
        labels: {
          fr: "Fiord",
          en: "Fiord",
          es: "Fiord"
        },
        type: "maplibre",
        url: "https://tiles.openfreemap.org/styles/fiord",
        options: {
          attributionControl: false
        },
        theme: "dark",
        actifParDefaut: false
      },
      {
        id: "liberty",
        labels: {
          fr: "Liberty",
          en: "Liberty",
          es: "Liberty"
        },
        type: "maplibre",
        url: "https://tiles.openfreemap.org/styles/liberty",
        options: {
          attributionControl: false
        },
        theme: "light",
        actifParDefaut: false
      },
      {
        id: "bright",
        labels: {
          fr: "Bright",
          en: "Bright",
          es: "Bright"
        },
        type: "maplibre",
        url: "https://tiles.openfreemap.org/styles/bright",
        options: {
          attributionControl: false
        },
        theme: "light",
        actifParDefaut: false
      },
      {
        id: "satellite",
        labels: {
          fr: "Satellite",
          en: "Satellite",
          es: "Satélite"
        },
        type: "raster",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        options: {
          maxNativeZoom: 23
        },
        theme: "dark",
        attribution: "Tiles &copy; Esri",
        actifParDefaut: false
      },
      {
        id: "relief",
        labels: {
          fr: "Relief",
          en: "Relief",
          es: "Relieve"
        },
        type: "raster",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
        options: {
          maxNativeZoom: 13
        },
        theme: "light",
        attribution: "Tiles &copy; Esri",
        actifParDefaut: false
      }
    ]
  },
  fonctionnalites: {
    tutoriel: {
      enabled: true,
      demarrageAutomatique: false
    },
    navigation: {
      enabled: true,
      actifParDefaut: false
    },
    daltonisme: {
      enabled: true,
      actifParDefaut: false
    },
    vueSimplifiee: {
      enabled: true,
      actifParDefaut: false
    },
    flux: {
      enabled: true,
      actifParDefaut: true,
      animationsMaximum: 20,
      rotationMs: 5000
    },
    reseauPays: {
      noeudsMaximum: 14
    }
  },
  couleurs: {
    standard: {
      exile: "#B60038",
      hosted: "#278957",
      balanced: "#E5B82E",
      flow: "#2B6F9D"
    },
    daltonisme: {
      exile: "#D55E00",
      hosted: "#0072B2",
      balanced: "#CC79A7",
      flow: "#005A8D"
    },
    standardSombre: {
      exile: "#ff789b",
      hosted: "#68d5a0",
      balanced: "#f8d36a",
      flow: "#8bd7ff"
    },
    daltonismeSombre: {
      exile: "#ffb36d",
      hosted: "#80c9ff",
      balanced: "#e8a4dc",
      flow: "#a5ddff"
    }
  },
  stylesGeojson: {
    region: {
      color: null,
      weight: 1.5,
      opacity: 0.42,
      fillColor: null,
      fillOpacity: 0.075
    }
  },
  stylesFlux: {
    opacity: 0.5,
    opacityFocus: 0.18,
    streamOpacity: 0.95,
    streamOpacityFocus: 0.22,
    dashArray: "1 18 3 42"
  }
};

export function validerReglages(settings = REGLAGES) {
  if (!settings.projet.langues.includes(settings.projet.langueParDefaut)) throw new Error("Langue initiale invalide.");
  if (settings.carte.zoomMinimumNavigation > settings.carte.zoomMinimum || settings.carte.zoomMinimum > settings.carte.zoomMaximum) throw new Error("Zooms invalides.");
  return true;
}
