// App configuration and static reference data.
const CURRENT_YEAR = new Date().getFullYear();
const APP_VERSION = new URL(import.meta.url).searchParams.get("v") || "dev";
const withVersion = (path) => `${path}?v=${encodeURIComponent(APP_VERSION)}`;
const { REGLAGES, validerReglages } = await import(withVersion("./reglages.js"));
const [{ createBasemapManager, applyBasemapTheme, validateBasemaps, waitForBasemapReady }, { initUtilityMenu }, { createThemedChart, refreshChartTheme }] = await Promise.all([
  import(withVersion("./maps/basemaps.js")), import(withVersion("./ui/menu.js")), import(withVersion("./charts/theme.js"))
]);
validerReglages();
const FEATURES = REGLAGES.fonctionnalites;
const MAP_SETTINGS = REGLAGES.carte;
const DATA_URL = withVersion(REGLAGES.fichiers.donnees);
const COUNTRY_DETAILS_URL = withVersion(REGLAGES.fichiers.detailsPays);
const I18N_URL = withVersion(REGLAGES.fichiers.traductions);
const LOGO_URL = withVersion(REGLAGES.fichiers.logo);
const ALL_YEARS = "all";
const MAX_ANIMATED_FLOWS = FEATURES.flux.animationsMaximum;
const FLOW_ANIMATION_ROTATION_MS = FEATURES.flux.rotationMs;
const MAP_DEFAULT_MIN_ZOOM = MAP_SETTINGS.zoomMinimum;
const MAP_NAVIGATION_MIN_ZOOM = MAP_SETTINGS.zoomMinimumNavigation;
const STANDARD_COLORS = REGLAGES.couleurs.standard;
const COLORBLIND_COLORS = REGLAGES.couleurs.daltonisme;
let EXILE_COLOR = STANDARD_COLORS.exile;
let HOSTED_COLOR = STANDARD_COLORS.hosted;
let BALANCED_COLOR = STANDARD_COLORS.balanced;
let MAP_FLOW_COLOR = STANDARD_COLORS.flow;
const FLOW_GRADIENT_PREFIX = "exil-flow-gradient-";
const MAX_COUNTRY_NETWORK_NODES = FEATURES.reseauPays.noeudsMaximum;
const UNKNOWN_COUNTRY = "Inconnu";
const SUPPORTED_LANGUAGES = REGLAGES.projet.langues;
const RSF_CARTOGRAPHY_I18N = {
  fr: {
    label: "RSF cartographie",
    title: "RSF cartographie",
    close: "Fermer",
    cards: [
      "Violences contre les journalistes dans le monde (édition 2025)",
      "Surveillance des violences contre les journalistes en Ukraine",
      "Surveillance des violences contre les journalistes dans la région des Grands Lacs africains",
      "Les journalistes sur les routes de l'exil (édition 2021 à 2025)"
    ]
  },
  en: {
    label: "RSF cartography",
    title: "RSF cartography",
    close: "Close",
    cards: [
      "Violence against journalists worldwide (2025 edition)",
      "Monitoring violence against journalists in Ukraine",
      "Monitoring violence against journalists in Africa's Great Lakes region",
      "Journalists on the routes of exile (2021 to 2025 edition)"
    ]
  },
  es: {
    label: "RSF cartografía",
    title: "RSF cartografía",
    close: "Cerrar",
    cards: [
      "Violencia contra periodistas en el mundo (edición 2025)",
      "Seguimiento de la violencia contra periodistas en Ucrania",
      "Seguimiento de la violencia contra periodistas en la región africana de los Grandes Lagos",
      "Periodistas en las rutas del exilio (edición 2021 a 2025)"
    ]
  }
};

const countryCoords = {
  "Afghanistan": [33.9391, 67.71],
  "Afrique du Sud": [-30.5595, 22.9375],
  "Albanie": [41.1533, 20.1683],
  "Algerie": [28.0339, 1.6596],
  "Algérie": [28.0339, 1.6596],
  "Allemagne": [51.1657, 10.4515],
  "Angola": [-11.2027, 17.8739],
  "Arabie Saoudite": [23.8859, 45.0792],
  "Argentine": [-38.4161, -63.6167],
  "Armenie": [40.0691, 45.0382],
  "Arménie": [40.0691, 45.0382],
  "Australie": [-25.2744, 133.7751],
  "Autriche": [47.5162, 14.5501],
  "Azerbaidjan": [40.1431, 47.5769],
  "Azerbaïdjan": [40.1431, 47.5769],
  "Bangladesh": [23.685, 90.3563],
  "Bahrein": [26.0667, 50.5577],
  "Bahreïn": [26.0667, 50.5577],
  "Belgique": [50.5039, 4.4699],
  "Belarus": [53.7098, 27.9534],
  "Bélarus": [53.7098, 27.9534],
  "Benin": [9.3077, 2.3158],
  "Bénin": [9.3077, 2.3158],
  "Birmanie": [21.9162, 95.956],
  "Bosnie-Herzégovine": [43.9159, 17.6791],
  "Brésil": [-14.235, -51.9253],
  "Bulgarie": [42.7339, 25.4858],
  "Burkina-Faso": [12.2383, -1.5616],
  "Burkina Faso": [12.2383, -1.5616],
  "Burundi": [-3.3731, 29.9189],
  "Cambodge": [12.5657, 104.991],
  "Cameroun": [7.3697, 12.3547],
  "Canada": [56.1304, -106.3468],
  "Chine": [35.8617, 104.1954],
  "Chypre": [35.1264, 33.4299],
  "Colombie": [4.5709, -74.2973],
  "Congo-Brazzaville": [-0.228, 15.8277],
  "Congo": [-0.228, 15.8277],
  "Costa Rica": [9.7489, -83.7534],
  "Cote d'Ivoire": [7.54, -5.5471],
  "Côte d'Ivoire": [7.54, -5.5471],
  "Cuba": [21.5218, -77.7812],
  "Danemark": [56.2639, 9.5018],
  "Djibouti": [11.8251, 42.5903],
  "Egypte": [26.8206, 30.8025],
  "Égypte": [26.8206, 30.8025],
  "El Salvador": [13.7942, -88.8965],
  "Équateur": [-1.8312, -78.1834],
  "Emirats Arabes Unis": [23.4241, 53.8478],
  "Émirats arabes unis": [23.4241, 53.8478],
  "Erythree": [15.1794, 39.7823],
  "Erythrée": [15.1794, 39.7823],
  "Espagne": [40.4637, -3.7492],
  "Eswatini": [-26.5225, 31.4659],
  "Etats-Unis": [37.0902, -95.7129],
  "Ethiopie": [9.145, 40.4897],
  "Finlande": [61.9241, 25.7482],
  "France": [46.2276, 2.2137],
  "Georgie": [42.3154, 43.3569],
  "Géorgie": [42.3154, 43.3569],
  "Ghana": [7.9465, -1.0232],
  "Grece": [39.0742, 21.8243],
  "Grèce": [39.0742, 21.8243],
  "Guatemala": [15.7835, -90.2308],
  "Guinee": [9.9456, -9.6966],
  "Guinée": [9.9456, -9.6966],
  "Haiti": [18.9712, -72.2852],
  "Haïti": [18.9712, -72.2852],
  "Honduras": [15.2, -86.2419],
  "Hong Kong": [22.3193, 114.1694],
  "Hong-Kong": [22.3193, 114.1694],
  "Inde": [20.5937, 78.9629],
  "Indonesie": [-0.7893, 113.9213],
  "Indonésie": [-0.7893, 113.9213],
  "Irak": [33.2232, 43.6793],
  "Iran": [32.4279, 53.688],
  "Irlande": [53.1424, -7.6921],
  "Israel": [31.0461, 34.8516],
  "Italie": [41.8719, 12.5674],
  "Jordanie": [30.5852, 36.2384],
  "Kazakhstan": [48.0196, 66.9237],
  "Kenya": [-0.0236, 37.9062],
  "Kirghizistan": [41.2044, 74.7661],
  "Kirghizstan": [41.2044, 74.7661],
  "Lettonie": [56.8796, 24.6032],
  "Liban": [33.8547, 35.8623],
  "Libye": [26.3351, 17.2283],
  "Lituanie": [55.1694, 23.8813],
  "Luxembourg": [49.8153, 6.1296],
  "Malaisie": [4.2105, 101.9758],
  "Malawi": [-13.2543, 34.3015],
  "Mali": [17.5707, -3.9962],
  "Maroc": [31.7917, -7.0926],
  "Mauritanie": [21.0079, -10.9408],
  "Mexique": [23.6345, -102.5528],
  "Moldavie": [47.4116, 28.3699],
  "Montenegro": [42.7087, 19.3744],
  "Monténégro": [42.7087, 19.3744],
  "Nepal": [28.3949, 84.124],
  "Népal": [28.3949, 84.124],
  "Nicaragua": [12.8654, -85.2072],
  "Niger": [17.6078, 8.0817],
  "Nigeria": [9.082, 8.6753],
  "Norvège": [60.472, 8.4689],
  "Nouvelle-Zelande": [-40.9006, 174.886],
  "Nouvelle-Zélande": [-40.9006, 174.886],
  "Oman": [21.4735, 55.9754],
  "Ouganda": [1.3733, 32.2903],
  "Ouzbekistan": [41.3775, 64.5853],
  "Ouzbékistan": [41.3775, 64.5853],
  "Pakistan": [30.3753, 69.3451],
  "Palestine": [31.9522, 35.2332],
  "Paraguay": [-23.4425, -58.4438],
  "Pays-Bas": [52.1326, 5.2913],
  "Perou": [-9.19, -75.0152],
  "Pérou": [-9.19, -75.0152],
  "Philippines": [12.8797, 121.774],
  "Pologne": [51.9194, 19.1451],
  "Portugal": [39.3999, -8.2245],
  "Qatar": [25.3548, 51.1839],
  "RCA": [6.6111, 20.9394],
  "République centrafricaine": [6.6111, 20.9394],
  "RDC": [-4.0383, 21.7587],
  "RD Congo": [-4.0383, 21.7587],
  "Rep.Tcheque": [49.8175, 15.473],
  "Rep.Tchèque": [49.8175, 15.473],
  "Royaume-Uni": [55.3781, -3.436],
  "Russie": [61.524, 105.3188],
  "Rwanda": [-1.9403, 29.8739],
  "Salvador": [13.7942, -88.8965],
  "Senegal": [14.4974, -14.4524],
  "Sénégal": [14.4974, -14.4524],
  "Serbie": [44.0165, 21.0059],
  "Sierra Leone": [8.4606, -11.7799],
  "Somalie": [5.1521, 46.1996],
  "Soudan": [12.8628, 30.2176],
  "Soudan du Sud": [6.877, 31.307],
  "Sri Lanka": [7.8731, 80.7718],
  "Suede": [60.1282, 18.6435],
  "Suède": [60.1282, 18.6435],
  "Suisse": [46.8182, 8.2275],
  "Syrie": [34.8021, 38.9968],
  "Tadjikistan": [38.861, 71.2761],
  "Taiwan": [23.6978, 120.9605],
  "Tanzanie": [-6.369, 34.8888],
  "Tchad": [15.4542, 18.7322],
  "Tchéquie": [49.8175, 15.473],
  "Thailande": [15.87, 100.9925],
  "Thaïlande": [15.87, 100.9925],
  "Togo": [8.6195, 0.8248],
  "Tunisie": [33.8869, 9.5375],
  "Turquie": [38.9637, 35.2433],
  "Ukraine": [48.3794, 31.1656],
  "Uruguay": [-32.5228, -55.7658],
  "Venezuela": [6.4238, -66.5897],
  "Vietnam": [14.0583, 108.2772],
  "Yemen": [15.5527, 48.5164],
  "Yémen": [15.5527, 48.5164],
  "Zimbabwe": [-19.0154, 29.1549]
};

const countryIsoCodes = {
  "Afghanistan": "AF",
  "Afrique du Sud": "ZA",
  "Albanie": "AL",
  "Algerie": "DZ",
  "Algérie": "DZ",
  "Allemagne": "DE",
  "Angola": "AO",
  "Arabie Saoudite": "SA",
  "Argentine": "AR",
  "Armenie": "AM",
  "Arménie": "AM",
  "Australie": "AU",
  "Autriche": "AT",
  "Azerbaidjan": "AZ",
  "Azerbaïdjan": "AZ",
  "Bangladesh": "BD",
  "Bahrein": "BH",
  "Bahreïn": "BH",
  "Belgique": "BE",
  "Belarus": "BY",
  "Bélarus": "BY",
  "Benin": "BJ",
  "Bénin": "BJ",
  "Birmanie": "MM",
  "Bosnie-Herzégovine": "BA",
  "Brésil": "BR",
  "Bulgarie": "BG",
  "Burkina-Faso": "BF",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cambodge": "KH",
  "Cameroun": "CM",
  "Canada": "CA",
  "Chine": "CN",
  "Chypre": "CY",
  "Colombie": "CO",
  "Congo-Brazzaville": "CG",
  "Congo": "CG",
  "Costa Rica": "CR",
  "Cote d'Ivoire": "CI",
  "Côte d'Ivoire": "CI",
  "Cuba": "CU",
  "Danemark": "DK",
  "Djibouti": "DJ",
  "Egypte": "EG",
  "Égypte": "EG",
  "El Salvador": "SV",
  "Équateur": "EC",
  "Emirats Arabes Unis": "AE",
  "Émirats arabes unis": "AE",
  "Erythree": "ER",
  "Erythrée": "ER",
  "Espagne": "ES",
  "Eswatini": "SZ",
  "Etats-Unis": "US",
  "Ethiopie": "ET",
  "Finlande": "FI",
  "France": "FR",
  "Georgie": "GE",
  "Géorgie": "GE",
  "Ghana": "GH",
  "Grece": "GR",
  "Grèce": "GR",
  "Guatemala": "GT",
  "Guinee": "GN",
  "Guinée": "GN",
  "Haiti": "HT",
  "Haïti": "HT",
  "Honduras": "HN",
  "Hong Kong": "HK",
  "Hong-Kong": "HK",
  "Inde": "IN",
  "Indonesie": "ID",
  "Indonésie": "ID",
  "Irak": "IQ",
  "Iran": "IR",
  "Irlande": "IE",
  "Israel": "IL",
  "Italie": "IT",
  "Jordanie": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kirghizistan": "KG",
  "Kirghizstan": "KG",
  "Lettonie": "LV",
  "Liban": "LB",
  "Libye": "LY",
  "Lituanie": "LT",
  "Luxembourg": "LU",
  "Malaisie": "MY",
  "Malawi": "MW",
  "Mali": "ML",
  "Maroc": "MA",
  "Mauritanie": "MR",
  "Mexique": "MX",
  "Moldavie": "MD",
  "Montenegro": "ME",
  "Monténégro": "ME",
  "Nepal": "NP",
  "Népal": "NP",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "Norvège": "NO",
  "Nouvelle-Zelande": "NZ",
  "Nouvelle-Zélande": "NZ",
  "Oman": "OM",
  "Ouganda": "UG",
  "Ouzbekistan": "UZ",
  "Ouzbékistan": "UZ",
  "Pakistan": "PK",
  "Palestine": "PS",
  "Paraguay": "PY",
  "Pays-Bas": "NL",
  "Perou": "PE",
  "Pérou": "PE",
  "Philippines": "PH",
  "Pologne": "PL",
  "Portugal": "PT",
  "Qatar": "QA",
  "RCA": "CF",
  "République centrafricaine": "CF",
  "RDC": "CD",
  "RD Congo": "CD",
  "Rep.Tcheque": "CZ",
  "Rep.Tchèque": "CZ",
  "Royaume-Uni": "GB",
  "Russie": "RU",
  "Rwanda": "RW",
  "Salvador": "SV",
  "Senegal": "SN",
  "Sénégal": "SN",
  "Serbie": "RS",
  "Sierra Leone": "SL",
  "Somalie": "SO",
  "Soudan": "SD",
  "Soudan du Sud": "SS",
  "Sri Lanka": "LK",
  "Suede": "SE",
  "Suède": "SE",
  "Suisse": "CH",
  "Syrie": "SY",
  "Tadjikistan": "TJ",
  "Taiwan": "TW",
  "Tanzanie": "TZ",
  "Tchad": "TD",
  "Tchéquie": "CZ",
  "Thailande": "TH",
  "Thaïlande": "TH",
  "Togo": "TG",
  "Tunisie": "TN",
  "Turquie": "TR",
  "Ukraine": "UA",
  "Uruguay": "UY",
  "Venezuela": "VE",
  "Vietnam": "VN",
  "Yemen": "YE",
  "Yémen": "YE",
  "Zimbabwe": "ZW"
};

const countryRegions = {
  "Afghanistan": "Asie-Pacifique",
  "Albanie": "UE Balkans",
  "Algérie": "MENA",
  "Allemagne": "UE Balkans",
  "Angola": "Afrique",
  "Arabie Saoudite": "MENA",
  "Argentine": "Amériques",
  "Arménie": "EEAC",
  "Australie": "Asie-Pacifique",
  "Azerbaïdjan": "EEAC",
  "Bangladesh": "Asie-Pacifique",
  "Bahrein": "MENA",
  "Bahreïn": "MENA",
  "Bélarus": "EEAC",
  "Belgique": "UE Balkans",
  "Bénin": "Afrique",
  "Birmanie": "Asie-Pacifique",
  "Bosnie-Herzégovine": "UE Balkans",
  "Brésil": "Amériques",
  "Bulgarie": "UE Balkans",
  "Burkina Faso": "Afrique",
  "Burundi": "Afrique",
  "Cambodge": "Asie-Pacifique",
  "Cameroun": "Afrique",
  "Canada": "Amériques",
  "Chine": "Asie-Pacifique",
  "Chypre": "UE Balkans",
  "Colombie": "Amériques",
  "Congo": "Afrique",
  "Costa Rica": "Amériques",
  "Côte d'Ivoire": "Afrique",
  "Cuba": "Amériques",
  "Danemark": "UE Balkans",
  "Djibouti": "Afrique",
  "Égypte": "MENA",
  "El Salvador": "Amériques",
  "Émirats arabes unis": "MENA",
  "Équateur": "Amériques",
  "Érythrée": "Afrique",
  "Espagne": "UE Balkans",
  "États-Unis": "Amériques",
  "Éthiopie": "Afrique",
  "Finlande": "UE Balkans",
  "France": "UE Balkans",
  "Géorgie": "EEAC",
  "Ghana": "Afrique",
  "Grèce": "UE Balkans",
  "Guatemala": "Amériques",
  "Guinée": "Afrique",
  "Haïti": "Amériques",
  "Honduras": "Amériques",
  "Hong-Kong": "Asie-Pacifique",
  "Inde": "Asie-Pacifique",
  "Indonésie": "Asie-Pacifique",
  "Irak": "MENA",
  "Iran": "MENA",
  "Irlande": "UE Balkans",
  "Israël": "MENA",
  "Italie": "UE Balkans",
  "Jordanie": "MENA",
  "Kazakhstan": "EEAC",
  "Kenya": "Afrique",
  "Kirghizstan": "EEAC",
  "Lettonie": "UE Balkans",
  "Liban": "MENA",
  "Libye": "MENA",
  "Lituanie": "UE Balkans",
  "Malaisie": "Asie-Pacifique",
  "Mali": "Afrique",
  "Maroc": "MENA",
  "Mauritanie": "Afrique",
  "Mexique": "Amériques",
  "Moldavie": "EEAC",
  "Monténégro": "UE Balkans",
  "Népal": "Asie-Pacifique",
  "Nicaragua": "Amériques",
  "Niger": "Afrique",
  "Nigeria": "Afrique",
  "Norvège": "UE Balkans",
  "Nouvelle-Zélande": "Asie-Pacifique",
  "Oman": "MENA",
  "Ouganda": "Afrique",
  "Ouzbekistan": "EEAC",
  "Ouzbékistan": "EEAC",
  "Pakistan": "Asie-Pacifique",
  "Palestine": "MENA",
  "Paraguay": "Amériques",
  "Pays-Bas": "UE Balkans",
  "Philippines": "Asie-Pacifique",
  "Pologne": "UE Balkans",
  "Portugal": "UE Balkans",
  "Qatar": "MENA",
  "RD Congo": "Afrique",
  "République centrafricaine": "Afrique",
  "Royaume-Uni": "UE Balkans",
  "Russie": "EEAC",
  "Rwanda": "Afrique",
  "Sénégal": "Afrique",
  "Serbie": "UE Balkans",
  "Sierra Leone": "Afrique",
  "Somalie": "Afrique",
  "Soudan": "Afrique",
  "Soudan du Sud": "Afrique",
  "Sri Lanka": "Asie-Pacifique",
  "Suède": "UE Balkans",
  "Suisse": "UE Balkans",
  "Syrie": "MENA",
  "Tadjikistan": "EEAC",
  "Taïwan": "Asie-Pacifique",
  "Tanzanie": "Afrique",
  "Tchad": "Afrique",
  "Tchéquie": "UE Balkans",
  "Thaïlande": "Asie-Pacifique",
  "Togo": "Afrique",
  "Tunisie": "MENA",
  "Turquie": "EEAC",
  "Ukraine": "EEAC",
  "Uruguay": "Amériques",
  "Venezuela": "Amériques",
  "Vietnam": "Asie-Pacifique",
  "Yémen": "MENA"
};

// Runtime state.
let rows = [];
let countryDetails = {};
let translations = {};
let currentLanguage = getInitialLanguage();
let map;
let flowLayer;
let markerLayer;
let regionLayer;
let yearlyChart;
let countryFlowChart;
let pressFreedomChart;
let basemaps;
let utilityMenuController;
let appBooted = false;
let loadingHideTimer = null;
let selectedCountry = null;
let selectedRegion = null;
let modalSelection = null;
let flowSlideIndex = 0;
let selectedDetailCountry = null;
let countrySlideIndex = 0;
let currentVisibleRelations = [];
let currentMaxRelationCount = 1;
let currentMarkerRoles = new Map();
let currentCountryCounts = new Map();
let currentCountryRoleCounts = new Map();
let currentMaxCountryCount = 1;
let currentRegionCountries = new Set();
let modalCurrentRelations = [];
let modalSelectedKey = "";
let animatedFlowOffset = 0;
let flowAnimationTimer = null;
let viewportResizeTimer = null;
let countryNetworkView = "diagram";
let pendingCountryListRelationKey = "";
let countryModalHistory = [];
let flowModalReturnState = null;
let markerFocusRole = null;
let simplifiedView = Boolean(FEATURES.vueSimplifiee.enabled && FEATURES.vueSimplifiee.actifParDefaut);
let navigationMode = Boolean(FEATURES.navigation.enabled && FEATURES.navigation.actifParDefaut);
let colorblindMode = Boolean(FEATURES.daltonisme.enabled && FEATURES.daltonisme.actifParDefaut);
let flowsHidden = !FEATURES.flux.enabled || !FEATURES.flux.actifParDefaut;
let darkTheme = false;
let flowLineRecords = new Map();
let elasticFlowDrag = null;
let elasticFlowPending = null;
let elasticFlowReleaseAt = 0;

// DOM references.
const yearSelect = document.querySelector("#yearSelect");
const countrySelect = document.querySelector("#countrySelect");
const regionSelect = document.querySelector("#regionSelect");
const languageToggle = document.querySelector("#languageToggle");
const languageButtons = [...document.querySelectorAll("[data-language]")];
const flowCount = document.querySelector("#flowCount");
const caseCount = document.querySelector("#caseCount");
const statsTitle = document.querySelector("#statsTitle");
const statsFlag = document.querySelector("#statsFlag");
const statsExiled = document.querySelector("#statsExiled");
const statsHosted = document.querySelector("#statsHosted");
const modal = document.querySelector("#flowModal");
const modalKicker = document.querySelector("#modalKicker");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const closeModal = document.querySelector("#closeModal");
const backFlowModal = document.querySelector("#backFlowModal");
const flowActionMenu = document.querySelector("#flowActionMenu");
const flowActionsToggle = document.querySelector("#flowActionsToggle");
const flowRelationsChart = document.querySelector("#flowRelationsChart");
const flowRelationsHeading = document.querySelector("#flowRelationsHeading");
const yearlyChartTitle = document.querySelector("#yearlyChartTitle");
const flowCarousel = document.querySelector("#flowCarousel");
const flowPrev = document.querySelector("#flowPrev");
const flowNext = document.querySelector("#flowNext");
const flowSlideLabel = document.querySelector("#flowSlideLabel");
const countryModal = document.querySelector("#countryModal");
const closeCountryModal = document.querySelector("#closeCountryModal");
const backCountryModal = document.querySelector("#backCountryModal");
const countryActionMenu = document.querySelector("#countryActionMenu");
const countryActionsToggle = document.querySelector("#countryActionsToggle");
const countryMoreLink = document.querySelector("#countryMoreLink");
const countryModalKicker = document.querySelector("#countryModalKicker");
const countryModalTitle = document.querySelector("#countryModalTitle");
const countryModalText = document.querySelector("#countryModalText");
const countryRelationsHeading = document.querySelector("#countryRelationsHeading");
const countryRelationYear = document.querySelector("#countryRelationYear");
const countryNetwork = document.querySelector("#countryNetwork");
const countryCarousel = document.querySelector("#countryCarousel");
const countryPrev = document.querySelector("#countryPrev");
const countryNext = document.querySelector("#countryNext");
const countrySlideLabel = document.querySelector("#countrySlideLabel");
const countryNetworkViewButtons = [...document.querySelectorAll("[data-network-view]")];
const statsPanel = document.querySelector(".stats-panel");
const statsHeadingToggle = document.querySelector("#statsHeadingToggle");
const focusRoleButtons = [...document.querySelectorAll("[data-focus-role]")];
const simplifiedViewButton = document.querySelector("[data-simplified-view]");
const clearFiltersButton = document.querySelector("#clearFiltersButton");
const legendFlow = document.querySelector("#legendFlow");
const legendHosted = document.querySelector("#legendHosted");
const legendExile = document.querySelector("#legendExile");
const networkLegendExile = document.querySelector("#networkLegendExile");
const networkLegendHosted = document.querySelector("#networkLegendHosted");
const countryFlowHeading = document.querySelector("#countryFlowHeading");
const pressFreedomHeading = document.querySelector("#pressFreedomHeading");
const loadingOverlay = document.querySelector("#loadingOverlay");
const loadingText = document.querySelector("#loadingText");
const loadingProgress = document.querySelector("#loadingProgress");
const loadingRetry = document.querySelector("#loadingRetry");
const utilityMenu = document.querySelector("#utilityMenu");
const utilityMenuToggle = document.querySelector("#utilityMenuToggle");
const navigationModeButton = document.querySelector("#navigationModeButton");
const colorblindModeButton = document.querySelector("#colorblindModeButton");
const darkThemeButton = document.querySelector("#darkThemeButton");
const hideFlowsButton = document.querySelector("#hideFlowsButton");
const tutorialOverlay = document.querySelector("#tutorialOverlay");
const tutorialFocus = document.querySelector("#tutorialFocus");
const tutorialStep = document.querySelector("#tutorialStep");
const tutorialTitle = document.querySelector("#tutorialTitle");
const tutorialText = document.querySelector("#tutorialText");
const tutorialNext = document.querySelector("#tutorialNext");
const tutorialSkip = document.querySelector("#tutorialSkip");
const tutorialReplay = document.querySelector("#tutorialReplay");
let tutorialIndex = 0;

// I18n and application bootstrap.
function getInitialLanguage() {
  const requested = new URLSearchParams(window.location.search).get("lang");
  return SUPPORTED_LANGUAGES.includes(String(requested).toLowerCase()) ? String(requested).toLowerCase() : REGLAGES.projet.langueParDefaut;
}

function sanitizeTranslations(data) {
  return data && typeof data === "object" && !Array.isArray(data) ? data : {};
}

function getNestedValue(source, key) {
  return key.split(".").reduce((value, part) => value?.[part], source);
}

function t(key, replacements = {}) {
  const fallback = getNestedValue(translations.fr || {}, key);
  const value = getNestedValue(translations[currentLanguage] || {}, key) ?? fallback ?? key;
  if (typeof value !== "string") return value;
  return value.replace(/\{(\w+)\}/g, (_, name) => replacements[name] ?? "");
}

function setLanguage(language, { updateUrl = false, rerender = false } = {}) {
  currentLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : REGLAGES.projet.langueParDefaut;
  document.documentElement.lang = currentLanguage;
  updateLanguageButtons();
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", currentLanguage);
    window.history.replaceState(null, "", url);
  }
  applyTranslations();
  basemaps?.setLanguage(currentLanguage);
  if (rerender && rows.length) {
    const selectedYear = getSelectedYearValue();
    hydrateYearSelect(selectedYear);
    hydrateRegionSelect(getSelectedYearValue());
    hydrateCountrySelect(getSelectedYearValue());
    renderForYear(getSelectedYearValue());
    if (modal.open && modalSelection) updateModalSelection(modalSelection);
    if (countryModal.open && selectedDetailCountry) displayCountryDetails(selectedDetailCountry, captureCountryModalState());
  }
}

function applyTranslations() {
  document.title = t("app.documentTitle");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("app.description"));
  document.querySelector("#map")?.setAttribute("aria-label", t("aria.map"));
  statsPanel?.setAttribute("aria-label", t("aria.filters"));
  statsTitle.textContent = t("app.title");
  languageToggle?.setAttribute("aria-label", t("aria.language"));
  document.querySelector(".utility-menu-field > span").textContent = t("aria.language");
  yearSelect?.setAttribute("aria-label", t("aria.year"));
  countrySelect?.setAttribute("aria-label", t("aria.country"));
  regionSelect?.setAttribute("aria-label", t("aria.region"));
  document.querySelector(".title-filter-grid")?.setAttribute("aria-label", t("aria.filterGrid"));
  document.querySelector(".focus-toggle")?.setAttribute("aria-label", t("aria.focus"));
  focusRoleButtons.forEach((button) => {
    button.textContent = button.dataset.focusRole === "hosted" ? t("filters.focusHosted") : t("filters.focusDeparted");
  });
  simplifiedViewButton.textContent = t("filters.simplified");
  clearFiltersButton.textContent = t("filters.clear");
  legendFlow.textContent = t("legend.flow");
  legendHosted.textContent = t("legend.hostedCountry");
  legendExile.textContent = t("legend.exileCountry");
  loadingText.textContent = t("loading.map");
  loadingRetry.textContent = t("loading.retry");
  utilityMenuToggle?.setAttribute("aria-label", utilityMenu?.classList.contains("open") ? t("aria.closeMenu") : t("aria.openMenu"));
  tutorialReplay?.setAttribute("aria-label", t("aria.tutorial"));
  tutorialReplay.textContent = t("buttons.tutorial");
  navigationModeButton.textContent = t("buttons.navigation");
  colorblindModeButton.textContent = t("buttons.colorblind");
  darkThemeButton.textContent = t("buttons.darkTheme");
  hideFlowsButton.textContent = t("buttons.hideFlows");
  tutorialSkip.textContent = t("tutorial.close");
  closeModal?.setAttribute("aria-label", t("aria.closeModal"));
  closeModal.textContent = t("buttons.close");
  flowActionsToggle?.setAttribute("aria-label", t("aria.modalActions"));
  closeCountryModal?.setAttribute("aria-label", t("aria.closeCountry"));
  closeCountryModal.textContent = t("buttons.close");
  countryActionsToggle?.setAttribute("aria-label", t("aria.modalActions"));
  flowPrev?.setAttribute("aria-label", t("aria.previousView"));
  flowNext?.setAttribute("aria-label", t("aria.nextView"));
  countryPrev?.setAttribute("aria-label", t("aria.previousView"));
  countryNext?.setAttribute("aria-label", t("aria.nextView"));
  backFlowModal.textContent = t("buttons.backMap");
  backCountryModal.textContent = t("buttons.backMap");
  countryMoreLink.textContent = t("buttons.more");
  flowRelationsHeading.textContent = t("flow.routesTitle");
  setFlowSlide(flowSlideIndex);
  countryRelationsHeading.textContent = t("country.relationsTitle");
  networkLegendExile.textContent = t("legend.exile");
  networkLegendHosted.textContent = t("legend.hosted");
  countryFlowHeading.textContent = t("country.flowsTitle");
  pressFreedomHeading.textContent = t("country.freedomTitle");
  setCountrySlide(countrySlideIndex);
  countryNetworkViewButtons.forEach((button) => {
    button.textContent = button.dataset.networkView === "diagram" ? t("country.diagram") : t("country.list");
  });
  updateStatsPanelAria();
  updateLanguageButtons();
  updateNavigationModeButton();
  updateColorblindModeButton();
  updateDarkThemeButton();
  updateHideFlowsButton();
  applyRsfCartographyTranslations();
  renderTutorialStep();
}

function applyRsfCartographyTranslations() {
  const strings = RSF_CARTOGRAPHY_I18N[currentLanguage] || RSF_CARTOGRAPHY_I18N.fr;
  const trigger = document.querySelector("#rsf-cartography-toggle");
  const title = document.querySelector("#rsf-cartography-title");
  const closeButton = document.querySelector("#rsf-cartography-close");

  if (trigger) trigger.textContent = strings.label;
  if (title) title.textContent = strings.title;
  if (closeButton) closeButton.setAttribute("aria-label", strings.close);

  document.querySelectorAll("#rsf-cartography-modal .rsf-cartography-link span").forEach((span, index) => {
    if (strings.cards[index]) span.textContent = strings.cards[index];
  });
}

function updateStatsPanelAria() {
  const collapsed = statsPanel?.classList.contains("collapsed");
  statsHeadingToggle?.setAttribute("aria-label", collapsed ? t("aria.showFilters") : t("aria.hideFilters"));
  statsHeadingToggle?.setAttribute("aria-expanded", String(!collapsed));
}

init();

async function init() {
  if (appBooted) return;
  appBooted = true;
  showLoadingOverlay(loadingText.textContent, { progress: true });
  loadingRetry.addEventListener("click", () => window.location.reload());
  try {
    applyBasemapTheme(validateBasemaps(MAP_SETTINGS.fonds));
    setLoadingProgress(10);
    initMap();
    // Gérer l'erreur immédiatement, même si les données chargent encore.
    const ready = waitForBasemapReady(basemaps.getActive().layer, { timeoutMs: MAP_SETTINGS.delaiChargementMaximum })
      .then(() => null, error => error);
    const dataReady = Promise.all([fetchJson(DATA_URL), fetchJson(COUNTRY_DETAILS_URL), fetchJson(I18N_URL)]);
    const [data, countryDetailsData, i18nData] = await dataReady;
    setLoadingProgress(55);
    rows = sanitizeRows(data);
    countryDetails = sanitizeCountryDetails(countryDetailsData);
    translations = sanitizeTranslations(i18nData);
    updateColorblindMode();
    setLanguage(currentLanguage);
    document.addEventListener("error", hideBrokenFlagImage, true);
    document.querySelector(".stats-logo").src = LOGO_URL;
    hydrateYearSelect();
    hydrateRegionSelect(getSelectedYearValue());
    hydrateCountrySelect(getSelectedYearValue());
    renderForYear(getSelectedYearValue());
    setupEventListeners();
    setLoadingProgress(85);
    const basemapError = await ready;
    if (basemapError) throw basemapError;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    setLoadingProgress(100);
    hideLoadingOverlay();
    maybeStartTutorial();
  } catch (error) {
    console.error(error);
    loadingOverlay.classList.add("is-error");
    const fallback = {
      fr: ["Impossible de charger la carte. Réessayez.", "Réessayer"],
      en: ["Unable to load the map. Please try again.", "Try again"],
      es: ["No se pudo cargar el mapa. Inténtelo de nuevo.", "Reintentar"]
    }[currentLanguage] || ["Impossible de charger la carte. Réessayez.", "Réessayer"];
    loadingText.textContent = translations[currentLanguage] ? t("loading.mapError") : fallback[0];
    loadingRetry.textContent = translations[currentLanguage] ? t("loading.retry") : fallback[1];
    loadingRetry.hidden = false;
  }
}

function setupEventListeners() {
  statsHeadingToggle.addEventListener("click", toggleStatsPanel);
  statsHeadingToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleStatsPanel();
    }
  });
  yearSelect.addEventListener("change", () => {
    hydrateRegionSelect(getSelectedYearValue());
    hydrateCountrySelect(getSelectedYearValue());
    renderForYear(getSelectedYearValue());
  });
  clearFiltersButton.addEventListener("click", clearCountryFilter);
  countrySelect.addEventListener("change", handleCountrySelectChange);
  regionSelect.addEventListener("change", handleRegionSelectChange);
  focusRoleButtons.forEach((button) => button.addEventListener("click", () => {
    markerFocusRole = markerFocusRole === button.dataset.focusRole ? null : button.dataset.focusRole;
    updateFocusRoleButtons();
    renderMarkerLayer();
    renderFlowLayer(false);
  }));
  simplifiedViewButton.addEventListener("click", () => {
    simplifiedView = !simplifiedView;
    updateSimplifiedViewButton();
    renderMarkerLayer();
    renderFlowLayer(false);
  });
  utilityMenuController = initUtilityMenu({
    ids: { menu: "utilityMenu", toggle: "utilityMenuToggle", panel: "utilityMenuPanel" },
    onChange: open => utilityMenuToggle.setAttribute("aria-label", open ? t("aria.closeMenu") : t("aria.openMenu"))
  });
  for (const [button, feature] of [[navigationModeButton, FEATURES.navigation], [colorblindModeButton, FEATURES.daltonisme],
    [hideFlowsButton, FEATURES.flux], [tutorialReplay, FEATURES.tutoriel], [simplifiedViewButton, FEATURES.vueSimplifiee]]) button.hidden = !feature.enabled;
  updateNavigationModeButton();
  updateSimplifiedViewButton();
  navigationModeButton.addEventListener("click", () => {
    navigationMode = !navigationMode;
    updateNavigationModeButton();
  });
  colorblindModeButton.addEventListener("click", () => {
    colorblindMode = !colorblindMode;
    updateColorblindMode({ rerender: true });
  });
  darkThemeButton.addEventListener("click", () => {
    basemaps.toggleTheme();
  });
  hideFlowsButton.addEventListener("click", () => {
    flowsHidden = !flowsHidden;
    updateHideFlowsButton();
    renderFlowLayer(false);
  });
  document.querySelector("#rsf-cartography-toggle")?.addEventListener("click", () => {
    closeUtilityMenu();
    openRsfCartographyModal();
  });
  languageToggle.addEventListener("click", (event) => event.stopPropagation());
  languageButtons.forEach((button) => button.addEventListener("click", () => {
    setLanguage(button.dataset.language, { updateUrl: true, rerender: true });
  }));
  flowActionsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleModalActionMenu(flowActionMenu, flowActionsToggle);
  });
  countryActionsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleModalActionMenu(countryActionMenu, countryActionsToggle);
  });
  document.addEventListener("click", (event) => {
    if (!flowActionMenu.contains(event.target)) closeModalActionMenu(flowActionMenu, flowActionsToggle);
    if (!countryActionMenu.contains(event.target)) closeModalActionMenu(countryActionMenu, countryActionsToggle);
  });
  closeModal.addEventListener("click", () => modal.close());
  backFlowModal.addEventListener("click", returnFromFlowModal);
  modal.addEventListener("close", () => closeModalActionMenu(flowActionMenu, flowActionsToggle));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
  flowPrev.addEventListener("click", () => setFlowSlide(flowSlideIndex - 1));
  flowNext.addEventListener("click", () => setFlowSlide(flowSlideIndex + 1));
  closeCountryModal.addEventListener("click", () => countryModal.close());
  backCountryModal.addEventListener("click", returnFromCountryModal);
  countryModal.addEventListener("close", () => closeModalActionMenu(countryActionMenu, countryActionsToggle));
  countryModal.addEventListener("click", (event) => {
    if (event.target === countryModal) countryModal.close();
  });
  countryPrev.addEventListener("click", () => setCountrySlide(countrySlideIndex - 1));
  countryNext.addEventListener("click", () => setCountrySlide(countrySlideIndex + 1));
  countryRelationYear.addEventListener("change", () => renderCountryNetwork(selectedDetailCountry, countryRelationYear.value));
  countryNetworkViewButtons.forEach((button) => button.addEventListener("click", () => {
    countryNetworkView = button.dataset.networkView;
    countryNetworkViewButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderCountryNetwork(selectedDetailCountry, countryRelationYear.value);
  }));
  tutorialReplay.addEventListener("click", () => {
    closeUtilityMenu();
    startTutorial();
  });
  tutorialNext.addEventListener("click", showNextTutorialStep);
  tutorialSkip.addEventListener("click", closeTutorial);
  window.addEventListener("resize", handleViewportResize);
}

function toggleModalActionMenu(menu, toggle) {
  const open = !menu.classList.contains("open");
  closeModalActionMenu(flowActionMenu, flowActionsToggle);
  closeModalActionMenu(countryActionMenu, countryActionsToggle);
  if (!open) return;
  menu.classList.add("open");
  toggle.setAttribute("aria-expanded", "true");
}

function closeModalActionMenu(menu, toggle) {
  menu?.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
}

function handleCountrySelectChange() {
  selectedCountry = countrySelect.value || null;
  if (selectedCountry) clearMarkerFocus();
  const currentYear = getSelectedYearValue();
  const availableYears = getAvailableYearsForCurrentCountry();
  const preferredYear = selectedCountry
    ? currentYear === ALL_YEARS || availableYears.includes(currentYear) ? currentYear : availableYears.at(-1)
    : currentYear;
  hydrateYearSelect(preferredYear);
  renderForYear(getSelectedYearValue());
}

function handleRegionSelectChange() {
  selectedRegion = regionSelect.value || null;
  if (selectedCountry && !getRowsForCountry(selectedCountry).some(rowMatchesSelectedRegion)) {
    selectedCountry = null;
  }
  hydrateYearSelect(getSelectedYearValue());
  hydrateCountrySelect(getSelectedYearValue());
  renderForYear(getSelectedYearValue());
}

// Data loading and sanitization.
function handleViewportResize() {
  positionTutorialFocus();
  if (viewportResizeTimer) window.clearTimeout(viewportResizeTimer);
  viewportResizeTimer = window.setTimeout(() => {
    map?.invalidateSize();
    if (modal.open) adjustModalTitleSelectWidths();
    yearlyChart?.resize();
    countryFlowChart?.resize();
    pressFreedomChart?.resize();
  }, 120);
}

async function fetchJson(url) {
  const response = await fetch(url, { credentials: "same-origin" });
  if (!response.ok) {
    throw new Error(`Impossible de charger ${url} (${response.status})`);
  }
  return response.json();
}

function sanitizeRows(data) {
  if (!Array.isArray(data)) return [];
  return data
    .map((row) => ({
      pays_depart: cleanText(row?.pays_depart, 80),
      pays_arrivee: cleanText(row?.pays_arrivee, 80),
      date: Number(row?.date)
    }))
    .filter(isUsableRow);
}

function sanitizeCountryDetails(data) {
  const sanitized = Object.create(null);
  const entries = Array.isArray(data)
    ? data.map((details, index) => [details?.Pays_FR || details?.ISO || String(index), details])
    : Object.entries(data || {});
  entries.forEach(([country, details]) => {
    const detail = sanitizeCountryDetailRecord(country, details);
    if (!detail) return;
    getCountryDetailAliases(country, details, detail).forEach((alias) => {
      registerCountryDetailAlias(sanitized, alias, detail);
    });
  });
  return sanitized;
}

function sanitizeCountryDetailRecord(country, details) {
  if (!details || typeof details !== "object" || Array.isArray(details)) return null;
  const names = {
    fr: cleanText(details.Pays_FR || details.name_fr || details.fr || country, 80),
    en: cleanText(details.Pays_EN || details.name_en || details.en || "", 80),
    es: cleanText(details.Pays_ES || details.name_es || details.es || "", 80)
  };
  const pressFreedomRank = getPressFreedomRank(details);
  return {
    iso: cleanText(details.ISO || details.iso || "", 12),
    names,
    description: cleanText(details.description, 900),
    url: getSafeExternalUrl(details.URL ?? details.url ?? details.Url ?? findFirstUrlValue(details)),
    pressFreedomRank,
    events: Array.isArray(details.events)
      ? details.events
        .map((event) => ({ year: Number(event?.year), label: cleanText(event?.label, 180) }))
        .filter((event) => Number.isInteger(event.year) && event.year >= 1982 && event.year <= CURRENT_YEAR && event.label)
      : []
  };
}

function getPressFreedomRank(details) {
  const pressFreedomRank = Object.create(null);
  Object.entries(details.pressFreedomRank || {}).forEach(([year, rank]) => {
    addPressFreedomRank(pressFreedomRank, year, rank);
  });
  Object.entries(details).forEach(([key, rank]) => {
    const match = /^classement_(\d{4})$/.exec(key);
    if (match) addPressFreedomRank(pressFreedomRank, match[1], rank);
  });
  return pressFreedomRank;
}

function addPressFreedomRank(pressFreedomRank, year, rank) {
  const numericYear = Number(year);
  const numericRank = Number(rank);
  if (rank !== null && rank !== "" && Number.isInteger(numericYear) && numericYear >= 2000 && numericYear <= CURRENT_YEAR && Number.isFinite(numericRank)) {
    pressFreedomRank[String(numericYear)] = numericRank;
  }
}

function getCountryDetailAliases(country, details, detail) {
  return [
    country,
    detail.iso,
    detail.names.fr,
    detail.names.en,
    detail.names.es,
    details?.Pays_FR,
    details?.Pays_EN,
    details?.Pays_ES
  ].filter(Boolean);
}

function registerCountryDetailAlias(sanitized, alias, detail) {
  const key = cleanText(alias, 80);
  if (!key || key === "__proto__") return;
  sanitized[key] = detail;
  sanitized[stripAccents(key)] = detail;
}

function findFirstUrlValue(details) {
  return Object.values(details).find((value) => typeof value === "string" && /^https?:\/\//i.test(value)) || "";
}

function cleanText(value, maxLength) {
  return String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, maxLength);
}

function getSafeExternalUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(String(value));
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function hideBrokenFlagImage(event) {
  if (event.target.matches?.(".country-marker img, .stats-flag img, .country-title-flag img")) {
    event.target.hidden = true;
  }
}

function showLoadingOverlay(message, { progress = false } = {}) {
  clearTimeout(loadingHideTimer);
  loadingText.textContent = message;
  loadingOverlay.hidden = false;
  loadingOverlay.classList.remove("is-error");
  loadingOverlay.classList.add("active");
  loadingProgress.hidden = !progress;
  loadingRetry.hidden = true;
}

function setLoadingProgress(value) {
  const percent = Math.min(100, Math.max(0, value));
  loadingProgress.setAttribute("aria-valuenow", String(percent));
  loadingProgress.querySelector("span").style.width = percent + "%";
}

function hideLoadingOverlay() {
  loadingOverlay.classList.remove("active");
  clearTimeout(loadingHideTimer);
  loadingHideTimer = window.setTimeout(() => { loadingOverlay.hidden = true; }, 200);
}

function runWithLoadingOverlay(message, callback) {
  showLoadingOverlay(message);
  requestAnimationFrame(() => {
    window.setTimeout(() => {
      try {
        callback();
      } finally {
        requestAnimationFrame(hideLoadingOverlay);
      }
    }, 30);
  });
}

const tutorialSteps = [
  {
    titleKey: "tutorial.steps.0.title",
    textKey: "tutorial.steps.0.text",
    target: () => document.querySelector(".filter-grid")
  },
  {
    titleKey: "tutorial.steps.1.title",
    textKey: "tutorial.steps.1.text",
    target: () => document.querySelector(".focus-toggle")
  },
  {
    titleKey: "tutorial.steps.2.title",
    textKey: "tutorial.steps.2.text",
    target: () => simplifiedViewButton
  },
  {
    titleKey: "tutorial.steps.3.title",
    textKey: "tutorial.steps.3.text",
    target: () => document.querySelector(".country-marker")
  },
  {
    titleKey: "tutorial.steps.4.title",
    textKey: "tutorial.steps.4.text",
    target: () => document.querySelector(".flow-base")
  },
  {
    titleKey: "tutorial.steps.5.title",
    textKey: "tutorial.steps.5.text",
    target: () => utilityMenu
  },
  {
    titleKey: "tutorial.steps.6.title",
    textKey: "tutorial.steps.6.text",
    target: () => document.querySelector(".legend")
  },
  {
    titleKey: "tutorial.steps.7.title",
    textKey: "tutorial.steps.7.text",
    target: () => clearFiltersButton.hidden ? statsPanel : clearFiltersButton
  }
];

// Tutorial overlay.
function maybeStartTutorial() {
  if (!FEATURES.tutoriel.enabled || !FEATURES.tutoriel.demarrageAutomatique) return;
  try {
    if (localStorage.getItem("exil-tutorial-seen") === "1") return;
  } catch {
    // Continue without persistence when storage is unavailable.
  }
  startTutorial();
}

function startTutorial() {
  if (!FEATURES.tutoriel.enabled) return;
  tutorialIndex = 0;
  tutorialOverlay.hidden = false;
  renderTutorialStep();
}

function showNextTutorialStep() {
  if (tutorialIndex >= tutorialSteps.length - 1) {
    closeTutorial();
    return;
  }
  tutorialIndex += 1;
  renderTutorialStep();
}

function renderTutorialStep() {
  const step = tutorialSteps[tutorialIndex];
  step.prepare?.();
  tutorialStep.textContent = `${tutorialIndex + 1} / ${tutorialSteps.length}`;
  tutorialTitle.textContent = t(step.titleKey);
  tutorialText.textContent = t(step.textKey);
  tutorialNext.textContent = tutorialIndex === tutorialSteps.length - 1 ? t("tutorial.finish") : t("tutorial.next");
  positionTutorialFocus();
}

function positionTutorialFocus() {
  if (tutorialOverlay.hidden) return;
  const target = tutorialSteps[tutorialIndex]?.target();
  const rect = target?.getBoundingClientRect();
  const visibleRect = getVisibleTutorialRect(rect);
  if (!visibleRect) {
    setTutorialFocusRect({ left: 18, top: 18, width: window.innerWidth - 36, height: window.innerHeight - 36 });
    positionTutorialCard(null);
    return;
  }
  const padding = 8;
  const focusRect = {
    left: clamp(visibleRect.left - padding, 6, window.innerWidth - 18),
    top: clamp(visibleRect.top - padding, 6, window.innerHeight - 18),
    width: Math.min(window.innerWidth - 12, visibleRect.width + padding * 2),
    height: Math.min(window.innerHeight - 12, visibleRect.height + padding * 2)
  };
  focusRect.width = Math.min(focusRect.width, window.innerWidth - focusRect.left - 6);
  focusRect.height = Math.min(focusRect.height, window.innerHeight - focusRect.top - 6);
  focusRect.right = focusRect.left + focusRect.width;
  focusRect.bottom = focusRect.top + focusRect.height;
  setTutorialFocusRect(focusRect);
  positionTutorialCard(focusRect);
}

function getVisibleTutorialRect(rect) {
  if (!rect || rect.width <= 0 || rect.height <= 0) return null;
  const left = clamp(rect.left, 0, window.innerWidth);
  const top = clamp(rect.top, 0, window.innerHeight);
  const right = clamp(rect.right, 0, window.innerWidth);
  const bottom = clamp(rect.bottom, 0, window.innerHeight);
  if (right - left < 4 || bottom - top < 4) return null;
  return { left, top, right, bottom, width: right - left, height: bottom - top };
}

function setTutorialFocusRect(rect) {
  tutorialFocus.style.left = `${Math.round(rect.left)}px`;
  tutorialFocus.style.top = `${Math.round(rect.top)}px`;
  tutorialFocus.style.width = `${Math.round(Math.max(0, rect.width))}px`;
  tutorialFocus.style.height = `${Math.round(Math.max(0, rect.height))}px`;
}

function positionTutorialCard(focusRect) {
  const compact = window.innerWidth <= 760 || window.innerHeight <= 560;
  const topSpace = focusRect ? focusRect.top : 0;
  const bottomSpace = focusRect ? window.innerHeight - focusRect.bottom : 0;
  tutorialOverlay.classList.toggle("card-top", compact && topSpace > bottomSpace);
  tutorialOverlay.classList.toggle("card-bottom", compact && topSpace <= bottomSpace);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function closeTutorial() {
  tutorialOverlay.hidden = true;
  try {
    localStorage.setItem("exil-tutorial-seen", "1");
  } catch {
    // The tutorial can still be reopened from the help button.
  }
}

// Map filters and derived data.
function isUsableRow(row) {
  return row.pays_depart
    && row.pays_arrivee
    && Number.isInteger(Number(row.date))
    && Number(row.date) >= 1982
    && Number(row.date) <= CURRENT_YEAR;
}

function getSelectedYearValue() {
  return yearSelect.value === ALL_YEARS ? ALL_YEARS : Number(yearSelect.value);
}

function getRowsForYear(year) {
  return getRowsForYearWithoutRegion(year).filter(rowMatchesSelectedRegion);
}

function getRowsForYearWithoutRegion(year) {
  return year === ALL_YEARS ? rows : rows.filter((row) => Number(row.date) === year);
}

function rowMatchesSelectedRegion(row) {
  return !selectedRegion || rowMatchesRegion(row, selectedRegion);
}

function rowMatchesRegion(row, region) {
  return getCountryRegion(row.pays_depart) === region || getCountryRegion(row.pays_arrivee) === region;
}

function getCountryRegion(country) {
  const details = getCountryDetails(country);
  return [
    country,
    stripAccents(country),
    details.names?.fr,
    stripAccents(details.names?.fr || ""),
    details.names?.en,
    stripAccents(details.names?.en || ""),
    details.names?.es,
    stripAccents(details.names?.es || "")
  ].map((key) => countryRegions[key]).find(Boolean) || "";
}

function getRegionDisplayName(region) {
  const translated = t(`regions.${region}`);
  return translated === `regions.${region}` ? region : translated;
}

function getLatestYear() {
  return getAvailableYears().at(-1);
}

function getEarliestYear() {
  return getAvailableYears()[0];
}

function getRowsForCountry(country) {
  return rows.filter((row) => row.pays_depart === country || row.pays_arrivee === country);
}

// Leaflet map rendering.
function initMap() {
  map = L.map("map", {
    minZoom: navigationMode ? MAP_NAVIGATION_MIN_ZOOM : MAP_DEFAULT_MIN_ZOOM,
    maxZoom: MAP_SETTINGS.zoomMaximum, zoomDelta: MAP_SETTINGS.zoomDelta, zoomSnap: MAP_SETTINGS.zoomSnap,
    scrollWheelZoom: MAP_SETTINGS.scrollWheelZoom, worldCopyJump: MAP_SETTINGS.worldCopyJump, zoomControl: false
  }).setView(MAP_SETTINGS.centreInitial, MAP_SETTINGS.zoomInitial);
  L.control.zoom({ position: "topleft" }).addTo(map);
  regionLayer = L.layerGroup().addTo(map);
  flowLayer = L.layerGroup().addTo(map);
  markerLayer = L.layerGroup().addTo(map);
  basemaps = createBasemapManager({ L, map, settings: MAP_SETTINGS, lang: currentLanguage, onChange: config => {
    applyBasemapTheme(config);
    darkTheme = config.theme === "dark";
    updateDarkThemeButton();
    updateColorblindMode({ rerender: Boolean(rows.length) });
    refreshChartTheme([yearlyChart, countryFlowChart, pressFreedomChart]);
  } });
  let flowZoomBoost = getFlowZoomBoost();
  let markerZoomBoost = getMarkerZoomBoost();
  map.on("zoomend", () => {
    // Leaflet repositionne les objets existants ; reconstruire seulement si leur taille change.
    const nextFlowBoost = getFlowZoomBoost();
    const nextMarkerBoost = getMarkerZoomBoost();
    if (nextFlowBoost !== flowZoomBoost) renderFlowLayer(false);
    if (nextMarkerBoost !== markerZoomBoost) renderMarkerLayer();
    flowZoomBoost = nextFlowBoost;
    markerZoomBoost = nextMarkerBoost;
  });
}

function toggleStatsPanel() {
  const collapsed = !statsPanel.classList.contains("collapsed");
  statsPanel.classList.toggle("collapsed", collapsed);
  updateStatsPanelAria();
}

function hydrateYearSelect(preferredValue) {
  const relevantRows = (selectedCountry ? getRowsForCountry(selectedCountry) : rows).filter(rowMatchesSelectedRegion);
  const years = [...new Set(relevantRows.map((row) => Number(row.date)))].sort((a, b) => a - b);
  const countsByYear = relevantRows.reduce((counts, row) => {
    const year = Number(row.date);
    counts.set(year, (counts.get(year) || 0) + 1);
    return counts;
  }, new Map());
  const requestedValue = preferredValue ?? years.at(-1);
  const selectedValue =
    requestedValue === ALL_YEARS || years.includes(Number(requestedValue)) ? requestedValue : years.at(-1);
  yearSelect.innerHTML = [
    `<option value="${ALL_YEARS}" ${selectedValue === ALL_YEARS ? "selected" : ""}>${escapeHtml(t("filters.since", { year: getEarliestYear() }))}</option>`,
    ...years
    .map((year, index) => {
      const selected = selectedValue === year || (!preferredValue && index === years.length - 1) ? "selected" : "";
      return `<option value="${year}" ${selected}>${year}</option>`;
    })
  ].join("");
}

function hydrateRegionSelect(year) {
  const scopedRows = getRowsForYearWithoutRegion(year);
  const regionCounts = scopedRows.reduce((counts, row) => {
    [getCountryRegion(row.pays_depart), getCountryRegion(row.pays_arrivee)]
      .filter(Boolean)
      .forEach((region) => counts.set(region, (counts.get(region) || 0) + 1));
    return counts;
  }, new Map());
  const regions = [...regionCounts.keys()].sort((a, b) => getRegionDisplayName(a).localeCompare(getRegionDisplayName(b), currentLanguage));
  if (selectedRegion && !regions.includes(selectedRegion)) {
    selectedRegion = null;
  }
  regionSelect.innerHTML = [
    `<option value="">${escapeHtml(t("filters.region"))}</option>`,
    ...regions.map((region) => `<option value="${escapeAttribute(region)}" ${region === selectedRegion ? "selected" : ""}>${escapeHtml(getRegionDisplayName(region))}</option>`)
  ].join("");
}

function hydrateCountrySelect(year) {
  const availableCountries = getCountriesForYear(year);
  const countryCounts = aggregateCountryCounts(getRowsForYear(year));
  if (selectedCountry && !availableCountries.includes(selectedCountry)) {
    selectedCountry = null;
  }

  countrySelect.innerHTML = [
    `<option value="">${escapeHtml(t("filters.country"))}</option>`,
    ...availableCountries.map((country) => {
      const selected = country === selectedCountry ? "selected" : "";
      return `<option value="${escapeAttribute(country)}" ${selected}>${escapeHtml(getCountryDisplayName(country))}</option>`;
    })
  ].join("");
}

function renderForYear(year) {
  const filtered = getRowsForYear(year);
  const relations = aggregateRelations(filtered);
  const visibleRelations = selectedCountry
    ? relations.filter((relation) => relation.origin === selectedCountry || relation.destination === selectedCountry)
    : relations;
  const visibleRows = selectedCountry
    ? filtered.filter((row) => row.pays_depart === selectedCountry || row.pays_arrivee === selectedCountry)
    : filtered;
  const maxCount = Math.max(...visibleRelations.map((relation) => relation.count), 1);
  const countryCounts = aggregateCountryCounts(visibleRows);
  const countryRoleCounts = aggregateCountryRoleCounts(visibleRows);
  const maxCountryCount = Math.max(...countryCounts.values(), 1);
  currentVisibleRelations = visibleRelations;
  currentMaxRelationCount = maxCount;
  currentCountryCounts = countryCounts;
  currentCountryRoleCounts = countryRoleCounts;
  currentMaxCountryCount = maxCountryCount;

  const markerRoles = new Map();
  visibleRelations.forEach((relation) => {
    markerRoles.set(relation.origin, addRole(markerRoles.get(relation.origin), "origin"));
    markerRoles.set(relation.destination, addRole(markerRoles.get(relation.destination), "exile"));
  });
  currentMarkerRoles = markerRoles;
  currentRegionCountries = selectedRegion
    ? new Set([...markerRoles.keys()].filter((country) => getCountryRegion(country) === selectedRegion))
    : new Set();

  renderRegionPolygon();
  renderMarkerLayer();
  renderFlowLayer();
  fitSelectedRegion();

  flowCount.textContent = t("metrics.flows", { count: visibleRelations.length });
  caseCount.textContent = selectedCountry ? t("metrics.linkedCases", { count: visibleRows.length }) : t("metrics.cases", { count: filtered.length });
  clearFiltersButton.hidden = !selectedCountry && !selectedRegion;
  renderJournalistStats(filtered);
}

function renderMarkerLayer() {
  markerLayer.clearLayers();
  currentMarkerRoles.forEach((role, country) => {
    const coords = getCoords(country);
    if (!coords) return;
    const countryCount = currentCountryCounts.get(country) || 0;
    const roleCounts = currentCountryRoleCounts.get(country);
    const markerShadow = getCountryRoleColor(roleCounts);
    const focusState = getMarkerFocusState(roleCounts, country);
    const markerSize = simplifiedView
      ? getSimplifiedMarkerSize(roleCounts, country)
      : getCountryMarkerSize(countryCount, currentMaxCountryCount, roleCounts, country);
    const markerClass = [
      "country-marker",
      simplifiedView ? "simplified" : "",
      country === selectedCountry ? "selected" : "",
      focusState === "dimmed" ? "dimmed" : ""
    ].filter(Boolean).join(" ");
    const markerContent = simplifiedView ? "" : `<span>${escapeHtml(getCountryFlag(country))}</span><img src="${escapeAttribute(getCountryFlagUrl(country))}" alt="">`;
    L.marker(coords, {
      icon: L.divIcon({
        className: "",
        html: `<div class="${markerClass}" title="${escapeAttribute(country)}" style="--marker-size:${markerSize}px; --marker-shadow:${markerShadow}; --marker-color:${markerShadow}">${markerContent}</div>`,
        iconSize: [markerSize, markerSize],
        iconAnchor: [markerSize / 2, markerSize / 2]
      })
    })
      .bindTooltip(`${escapeHtml(getCountryDisplayName(country))}: ${escapeHtml(t("metrics.cases", { count: countryCount }))}`, { direction: "top", offset: [0, -8] })
      .on("click", (event) => openCountryActionPopup(country, event.latlng))
      .addTo(markerLayer);
  });
}

function renderRegionPolygon() {
  regionLayer.clearLayers();
  if (!selectedRegion || currentRegionCountries.size < 2) return;
  const points = [...currentRegionCountries]
    .map((country) => ({ country, coords: getCoords(country) }))
    .filter((item) => item.coords);
  if (points.length < 2) return;
  const polygon = points.length < 3
    ? points.map((item) => item.coords)
    : getConvexHull(points.map((item) => ({ x: item.coords[1], y: item.coords[0] }))).map((point) => [point.y, point.x]);
  if (polygon.length < 2) return;
  const regionColor = getRegionRoleColor();
  L.polygon(polygon, {
    ...REGLAGES.stylesGeojson.region,
    color: REGLAGES.stylesGeojson.region.color || regionColor,
    fillColor: REGLAGES.stylesGeojson.region.fillColor || regionColor,
    interactive: false,
    className: "region-polygon"
  }).addTo(regionLayer);
}

function getRegionRoleColor() {
  if (!selectedRegion) return BALANCED_COLOR;
  const roleCounts = [...currentRegionCountries].reduce((counts, country) => {
    const countryCounts = currentCountryRoleCounts.get(country) || {};
    counts.departed += countryCounts.departed || 0;
    counts.hosted += countryCounts.hosted || 0;
    return counts;
  }, { departed: 0, hosted: 0 });
  return getCountryRoleColor(roleCounts);
}

function fitSelectedRegion() {
  if (!MAP_SETTINGS.ajusterVueAuRegion || !selectedRegion || currentRegionCountries.size < 2 || !map) return;
  const bounds = L.latLngBounds(
    [...currentRegionCountries]
      .map((country) => getCoords(country))
      .filter(Boolean)
  );
  if (!bounds.isValid()) return;
  map.fitBounds(bounds.pad(0.35), {
    animate: true,
    duration: 0.7,
    maxZoom: MAP_SETTINGS.zoomMaximumRegion
  });
}

function getConvexHull(points) {
  const unique = [...new Map(points.map((point) => [`${point.x},${point.y}`, point])).values()]
    .sort((a, b) => a.x - b.x || a.y - b.y);
  if (unique.length <= 2) return unique;

  const cross = (origin, a, b) => (a.x - origin.x) * (b.y - origin.y) - (a.y - origin.y) * (b.x - origin.x);
  const lower = [];
  unique.forEach((point) => {
    while (lower.length >= 2 && cross(lower.at(-2), lower.at(-1), point) <= 0) lower.pop();
    lower.push(point);
  });
  const upper = [];
  [...unique].reverse().forEach((point) => {
    while (upper.length >= 2 && cross(upper.at(-2), upper.at(-1), point) <= 0) upper.pop();
    upper.push(point);
  });
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

function updateFocusRoleButtons() {
  focusRoleButtons.forEach((button) => {
    const active = markerFocusRole === button.dataset.focusRole;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function updateSimplifiedViewButton() {
  simplifiedViewButton.classList.toggle("active", simplifiedView);
  simplifiedViewButton.setAttribute("aria-pressed", String(simplifiedView));
}

function updateLanguageButtons() {
  languageButtons.forEach((button) => {
    const active = button.dataset.language === currentLanguage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function closeUtilityMenu() {
  utilityMenuController?.close();
}

function openRsfCartographyModal() {
  const modal = document.querySelector("#rsf-cartography-modal");
  const closeButton = document.querySelector("#rsf-cartography-close");
  if (!modal) return;

  modal.hidden = false;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  closeButton?.focus();
}

function closeRsfCartographyModal() {
  const modal = document.querySelector("#rsf-cartography-modal");
  if (!modal) return;

  modal.hidden = true;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-close-rsf-cartography]").forEach((button) => {
  button.addEventListener("click", closeRsfCartographyModal);
});

document.addEventListener("keydown", (event) => {
  const modal = document.querySelector("#rsf-cartography-modal");
  if (event.key === "Escape" && modal && !modal.hidden) closeRsfCartographyModal();
});

function updateNavigationModeButton() {
  document.body.classList.toggle("navigation-mode", navigationMode);
  navigationModeButton.classList.toggle("active", navigationMode);
  navigationModeButton.setAttribute("aria-pressed", String(navigationMode));
  if (!map) return;
  map.setMinZoom(navigationMode ? MAP_NAVIGATION_MIN_ZOOM : MAP_DEFAULT_MIN_ZOOM);
  if (!navigationMode && map.getZoom() < MAP_DEFAULT_MIN_ZOOM) {
    map.setZoom(MAP_DEFAULT_MIN_ZOOM);
  }
}

function updateColorblindMode({ rerender = false } = {}) {
  const palette = darkTheme
    ? (colorblindMode ? REGLAGES.couleurs.daltonismeSombre : REGLAGES.couleurs.standardSombre)
    : (colorblindMode ? COLORBLIND_COLORS : STANDARD_COLORS);
  EXILE_COLOR = palette.exile;
  HOSTED_COLOR = palette.hosted;
  BALANCED_COLOR = palette.balanced;
  MAP_FLOW_COLOR = palette.flow;
  document.documentElement.style.setProperty("--origin", EXILE_COLOR);
  document.documentElement.style.setProperty("--hosted", HOSTED_COLOR);
  document.documentElement.style.setProperty("--balanced", BALANCED_COLOR);
  document.documentElement.style.setProperty("--flow", MAP_FLOW_COLOR);
  updateColorblindModeButton();
  if (!rerender || !rows.length) return;
  renderRegionPolygon();
  renderMarkerLayer();
  renderFlowLayer(false);
  if (modal.open && modalSelection) updateModalSelection(modalSelection);
  if (countryModal.open && selectedDetailCountry) displayCountryDetails(selectedDetailCountry, captureCountryModalState());
}

function updateColorblindModeButton() {
  if (!colorblindModeButton) return;
  colorblindModeButton.classList.toggle("active", colorblindMode);
  colorblindModeButton.setAttribute("aria-pressed", String(colorblindMode));
}

function updateDarkThemeButton() {
  if (!darkThemeButton) return;
  darkThemeButton.classList.toggle("active", darkTheme);
  darkThemeButton.setAttribute("aria-pressed", String(darkTheme));
}

function updateHideFlowsButton() {
  if (!hideFlowsButton) return;
  hideFlowsButton.classList.toggle("active", flowsHidden);
  hideFlowsButton.setAttribute("aria-pressed", String(flowsHidden));
}

function clearMarkerFocus() {
  markerFocusRole = null;
  updateFocusRoleButtons();
}

function addRole(current, next) {
  if (!current) return next;
  return current === next ? current : "both";
}

function aggregateRelations(data, { includeUnknownDestination = false } = {}) {
  const byRelation = new Map();

  data.forEach((row) => {
    const key = relationKey(row.pays_depart, row.pays_arrivee);
    const hasOriginCoords = Boolean(getCoords(row.pays_depart));
    const hasDestinationCoords = Boolean(getCoords(row.pays_arrivee));
    const canKeepUnknownDestination = includeUnknownDestination && isUnknownCountry(row.pays_arrivee);
    if (!hasOriginCoords || (!hasDestinationCoords && !canKeepUnknownDestination)) return;
    if (!byRelation.has(key)) {
      byRelation.set(key, {
        key,
        origin: row.pays_depart,
        destination: row.pays_arrivee,
        count: 0,
        years: new Map()
      });
    }

    const relation = byRelation.get(key);
    relation.count += 1;
    const year = Number(row.date);
    relation.years.set(year, (relation.years.get(year) || 0) + 1);
  });

  return [...byRelation.values()].sort((a, b) => b.count - a.count);
}

function aggregateCountryCounts(data) {
  const counts = new Map();
  data.forEach((row) => {
    if (!getCoords(row.pays_depart) || !getCoords(row.pays_arrivee)) return;
    counts.set(row.pays_depart, (counts.get(row.pays_depart) || 0) + 1);
    counts.set(row.pays_arrivee, (counts.get(row.pays_arrivee) || 0) + 1);
  });
  return counts;
}

function aggregateCountryRoleCounts(data) {
  const counts = new Map();
  data.forEach((row) => {
    if (!getCoords(row.pays_depart) || !getCoords(row.pays_arrivee)) return;
    const origin = counts.get(row.pays_depart) || { departed: 0, hosted: 0 };
    const destination = counts.get(row.pays_arrivee) || { departed: 0, hosted: 0 };
    origin.departed += 1;
    destination.hosted += 1;
    counts.set(row.pays_depart, origin);
    counts.set(row.pays_arrivee, destination);
  });
  return counts;
}

function renderJournalistStats(yearRows) {
  const selectedYear = getSelectedYearValue();
  const yearLabel = selectedYear === ALL_YEARS
    ? t("stats.since", { year: getEarliestYear() })
    : t("stats.in", { year: selectedYear });

  if (selectedRegion && !selectedCountry) {
    const departed = yearRows.filter((row) => getCountryRegion(row.pays_depart) === selectedRegion).length;
    const hosted = yearRows.filter((row) => getCountryRegion(row.pays_arrivee) === selectedRegion).length;
    statsFlag.hidden = true;
    statsFlag.innerHTML = "";
    statsExiled.hidden = departed === 0 && hosted > 0;
    statsExiled.textContent = departed > 0 ? getExiledSentence(yearLabel, departed, "regionDeparted") : "";
    statsHosted.hidden = hosted === 0;
    statsHosted.textContent = hosted ? getHostedSentence(yearLabel, hosted, "regionHosted") : "";
    return;
  }

  if (!selectedCountry) {
    statsFlag.hidden = true;
    statsFlag.innerHTML = "";
    statsExiled.hidden = false;
    statsExiled.textContent = getExiledSentence(yearLabel, yearRows.length, "globalDeparted");
    statsHosted.hidden = true;
    statsHosted.textContent = "";
    return;
  }

  const departed = yearRows.filter((row) => row.pays_depart === selectedCountry).length;
  const hosted = yearRows.filter((row) => row.pays_arrivee === selectedCountry).length;
  statsFlag.hidden = false;
  statsFlag.innerHTML = `<span>${escapeHtml(getCountryFlag(selectedCountry))}</span><img src="${escapeAttribute(getCountryFlagUrl(selectedCountry))}" alt="">`;
  statsExiled.hidden = departed === 0 && hosted > 0;
  statsExiled.textContent = departed > 0
    ? getExiledSentence(yearLabel, departed, "countryDeparted")
    : "";
  statsHosted.hidden = hosted === 0;
  statsHosted.textContent = hosted
    ? getHostedSentence(yearLabel, hosted, "countryHosted")
    : "";
}

function getExiledSentence(yearLabel, count, scopeKey) {
  return t("stats.exiled", {
    yearLabel,
    count,
    subject: t(count > 1 ? "stats.exiledSubjectPlural" : "stats.exiledSubjectSingular"),
    scope: t(`stats.scopes.${scopeKey}`)
  }).replace(/\s+\./g, ".");
}

function getHostedSentence(yearLabel, count, scopeKey) {
  return t("stats.hosted", {
    yearLabel,
    count,
    subject: t(count > 1 ? "stats.hostedSubjectPlural" : "stats.hostedSubjectSingular"),
    verb: t(count > 1 ? "stats.hostedVerbPlural" : "stats.hostedVerbSingular"),
    scope: t(`stats.scopes.${scopeKey}`),
    supported: t(count > 1 ? "stats.supportedPlural" : "stats.supportedSingular")
  });
}

// Country filters and country popup.
function openCountryActionPopup(country, latlng) {
  const displayName = getCountryDisplayName(country);
  const popup = L.popup({
    className: "country-action-popup",
    closeButton: true,
    autoPan: true,
    offset: [0, -10]
  })
    .setLatLng(latlng)
    .setContent(`
      <div class="country-action-card">
        <div class="country-action-title"><span>${getCountryFlag(country)}</span>${escapeHtml(displayName)}</div>
        ${selectedCountry === country ? `<button type="button" data-action="clear">${escapeHtml(t("popup.clear"))}</button>` : ""}
        <button type="button" data-action="filter">${escapeHtml(t("popup.filter"))}</button>
        <button type="button" data-action="details">${escapeHtml(t("popup.details"))}</button>
      </div>
    `)
    .openOn(map);

  setTimeout(() => {
    const root = popup.getElement();
    root?.querySelector('[data-action="filter"]')?.addEventListener("click", () => {
      applyCountryFilter(country);
      map.closePopup(popup);
    });
    root?.querySelector('[data-action="clear"]')?.addEventListener("click", () => {
      clearCountryFilter();
      map.closePopup(popup);
    });
    root?.querySelector('[data-action="details"]')?.addEventListener("click", () => {
      openCountryDetails(country);
      map.closePopup(popup);
    });
  }, 0);
}

function clearCountryFilter() {
  selectedCountry = null;
  selectedRegion = null;
  hydrateYearSelect(getSelectedYearValue());
  hydrateRegionSelect(getSelectedYearValue());
  hydrateCountrySelect(getSelectedYearValue());
  renderForYear(getSelectedYearValue());
}

function applyCountryFilter(country) {
  selectedCountry = country;
  clearMarkerFocus();
  const currentYear = getSelectedYearValue();
  const availableYears = getAvailableYearsForCurrentCountry();
  const preferredYear =
    currentYear === ALL_YEARS || availableYears.includes(currentYear) ? currentYear : availableYears.at(-1);
  hydrateYearSelect(preferredYear);
  countrySelect.value = selectedCountry || "";
  renderForYear(getSelectedYearValue());
}

// Flow rendering and interactions.
function drawRelation(relation, maxCount, animate = true) {
  const origin = getCoords(relation.origin);
  const destination = getCoords(relation.destination);
  const ratio = relation.count / maxCount;
  const intensity = Math.pow(ratio, 0.48);
  const zoomBoost = getFlowZoomBoost();
  const weight = getRelationWeight(relation, intensity, zoomBoost);
  const tooltip = `${escapeHtml(getCountryDisplayName(relation.origin))} -> ${escapeHtml(getCountryDisplayName(relation.destination))}: ${escapeHtml(t("metrics.cases", { count: relation.count }))}`;
  const flowOpacity = markerFocusRole ? REGLAGES.stylesFlux.opacityFocus : REGLAGES.stylesFlux.opacity;
  const streamOpacity = markerFocusRole ? REGLAGES.stylesFlux.streamOpacityFocus : REGLAGES.stylesFlux.streamOpacity;

  const baseLine = L.polyline([origin, destination], {
    color: MAP_FLOW_COLOR,
    weight,
    opacity: flowOpacity,
    lineCap: "round",
    className: "flow-base"
  }).addTo(flowLayer);
  disableSvgFocus(baseLine);
  annotateFlowElement(baseLine, relation);
  baseLine.bindTooltip(tooltip);
  baseLine.on("click", () => openRelationModalFromFlow(relation));

  let streamLine = null;
  const streamWeight = Math.max(1.3, weight * 0.18);
  if (animate) {
    streamLine = L.polyline([origin, destination], {
      color: MAP_FLOW_COLOR,
      weight: streamWeight,
      opacity: streamOpacity,
      lineCap: "round",
      dashArray: REGLAGES.stylesFlux.dashArray,
      className: "flow-stream"
    }).addTo(flowLayer);
    disableSvgFocus(streamLine);
    annotateFlowElement(streamLine, relation);
    streamLine.bindTooltip(tooltip);
    streamLine.on("click", () => openRelationModalFromFlow(relation));
  }

  const hitLine = L.polyline([origin, destination], {
    color: MAP_FLOW_COLOR,
    weight: getRelationHitWeight(relation, weight),
    opacity: 0.001,
    lineCap: "round",
    className: "flow-hitbox"
  }).addTo(flowLayer);
  disableSvgFocus(hitLine);
  annotateFlowElement(hitLine, relation);
  hitLine.bindTooltip(tooltip);
  hitLine.on("click", () => openRelationModalFromFlow(relation));

  const record = {
    relation,
    key: relation.key,
    baseLine,
    streamLine,
    hitLine,
    origin: L.latLng(origin),
    destination: L.latLng(destination),
    midpoint: getLatLngMidpoint(origin, destination),
    weight,
    streamWeight,
    baseOpacity: flowOpacity,
    streamOpacity
  };
  flowLineRecords.set(relation.key, record);
  applyFlowGradient(record);
  bindFlowLineInteractions(record);
}

function annotateFlowElement(layer, relation) {
  const element = layer.getElement?.();
  if (!element) return;
  element.dataset.relation = relation.key;
  element.dataset.origin = relation.origin;
  element.dataset.destination = relation.destination;
}

function disableSvgFocus(layer) {
  const element = layer.getElement?.();
  if (!element) return;
  element.setAttribute("focusable", "false");
  element.setAttribute("tabindex", "-1");
}

function applyFlowGradient(record) {
  const gradientId = createFlowGradient(record);
  if (!gradientId) return;
  [record.baseLine, record.streamLine].filter(Boolean).forEach((line) => {
    line.getElement?.()?.setAttribute("stroke", `url(#${gradientId})`);
  });
}

function createFlowGradient(record) {
  const svg = flowLayer.getPane()?.querySelector("svg");
  if (!svg || !map) return "";
  const defs = getFlowGradientDefs(svg);
  const gradientId = `${FLOW_GRADIENT_PREFIX}${hashString(record.key)}`;
  defs.querySelector(`#${gradientId}`)?.remove();
  const originPoint = map.latLngToLayerPoint(record.origin);
  const destinationPoint = map.latLngToLayerPoint(record.destination);
  const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  gradient.setAttribute("id", gradientId);
  gradient.setAttribute("gradientUnits", "userSpaceOnUse");
  gradient.setAttribute("x1", String(originPoint.x));
  gradient.setAttribute("y1", String(originPoint.y));
  gradient.setAttribute("x2", String(destinationPoint.x));
  gradient.setAttribute("y2", String(destinationPoint.y));
  [
    ["0%", EXILE_COLOR],
    ["100%", HOSTED_COLOR]
  ].forEach(([offset, color]) => {
    const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", color);
    gradient.appendChild(stop);
  });
  defs.appendChild(gradient);
  return gradientId;
}

function getFlowGradientDefs(svg) {
  let defs = svg.querySelector("defs.flow-gradient-defs");
  if (!defs) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.classList.add("flow-gradient-defs");
    svg.insertBefore(defs, svg.firstChild);
  }
  return defs;
}

function clearFlowGradients() {
  const defs = flowLayer?.getPane()?.querySelector("svg defs.flow-gradient-defs");
  if (defs) defs.replaceChildren();
}

function hashString(value) {
  let hash = 0;
  String(value).split("").forEach((char) => {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  });
  return hash.toString(36);
}

function openRelationModalFromFlow(relation) {
  if (Date.now() - elasticFlowReleaseAt < 260) return;
  openRelationModal(relation);
}

function bindFlowLineInteractions(record) {
  [record.baseLine, record.streamLine, record.hitLine].filter(Boolean).forEach((line) => {
    line.on("mousedown", (event) => startElasticFlowDrag(record, event));
  });
}

function setFlowHover(record, active) {
  if (elasticFlowDrag?.record === record) return;
  record.baseLine.setStyle({
    opacity: active ? Math.min(0.78, record.baseOpacity + 0.16) : record.baseOpacity
  });
  record.streamLine?.setStyle({
    opacity: active ? Math.min(1, record.streamOpacity + 0.05) : record.streamOpacity
  });
}

function startElasticFlowDrag(record, event) {
  if (!map) return;
  clearPendingElasticFlow();
  elasticFlowPending = {
    record,
    startPoint: map.latLngToLayerPoint(event.latlng),
    startClientPoint: L.point(event.originalEvent?.clientX ?? 0, event.originalEvent?.clientY ?? 0),
    gripPoint: map.latLngToLayerPoint(event.latlng),
    gripLatLng: event.latlng,
    timer: window.setTimeout(activatePendingElasticFlow, 1000)
  };
  document.addEventListener("mouseup", releaseElasticFlowDrag, { once: true });
}

function activatePendingElasticFlow() {
  if (!elasticFlowPending || !map) return;
  const pending = elasticFlowPending;
  elasticFlowPending = null;
  document.body.classList.add("elastic-flow-active");
  elasticFlowDrag = {
    record: pending.record,
    startPoint: pending.startPoint,
    gripPoint: pending.gripPoint,
    gripLatLng: pending.gripLatLng,
    currentControl: pending.gripLatLng
  };
  map.dragging.disable();
  pending.record.baseLine.closeTooltip();
  pending.record.streamLine?.closeTooltip();
  pending.record.hitLine?.closeTooltip();
  setFlowHover(pending.record, true);
  map.on("mousemove", updateElasticFlowDrag);
  map.once("mouseup", releaseElasticFlowDrag);
}

function updateElasticFlowDrag(event) {
  if (!elasticFlowDrag || !map) return;
  const dragPoint = map.latLngToLayerPoint(event.latlng);
  const delta = dragPoint.subtract(elasticFlowDrag.startPoint);
  const controlPoint = elasticFlowDrag.gripPoint.add(delta.multiplyBy(0.72));
  elasticFlowDrag.currentControl = map.layerPointToLatLng(controlPoint);
  setFlowControlPoint(elasticFlowDrag.record, elasticFlowDrag.currentControl);
}

function releaseElasticFlowDrag(event) {
  if (elasticFlowPending && !elasticFlowDrag) {
    const pending = elasticFlowPending;
    const endPoint = L.point(event?.clientX ?? pending.startClientPoint.x, event?.clientY ?? pending.startClientPoint.y);
    const moved = endPoint.distanceTo(pending.startClientPoint);
    clearPendingElasticFlow();
    if (moved < 8) openRelationModalFromFlow(pending.record.relation);
    return;
  }
  if (!elasticFlowDrag || !map) return;
  const drag = elasticFlowDrag;
  elasticFlowDrag = null;
  elasticFlowReleaseAt = Date.now();
  document.body.classList.remove("elastic-flow-active");
  map.off("mousemove", updateElasticFlowDrag);
  map.dragging.enable();
  animateFlowElasticRelease(drag.record, drag.currentControl, drag.gripLatLng);
  shakeConnectedFlows(drag.record);
}

function clearPendingElasticFlow() {
  if (!elasticFlowPending) return;
  window.clearTimeout(elasticFlowPending.timer);
  elasticFlowPending = null;
  document.body.classList.remove("elastic-flow-active");
}

function animateFlowElasticRelease(record, controlLatLng, restLatLng = record.midpoint) {
  const start = map.latLngToLayerPoint(controlLatLng);
  const rest = map.latLngToLayerPoint(restLatLng);
  const duration = 720;
  const startedAt = performance.now();
  const step = (now) => {
    if (!flowLineRecords.has(record.key)) return;
    const progress = Math.min(1, (now - startedAt) / duration);
    const envelope = Math.pow(1 - progress, 2.2);
    const wobble = Math.cos(progress * Math.PI * 8) * envelope;
    const point = rest.add(start.subtract(rest).multiplyBy(wobble));
    setFlowControlPoint(record, map.layerPointToLatLng(point));
    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }
    resetFlowLine(record);
    setFlowHover(record, false);
  };
  requestAnimationFrame(step);
}

function shakeConnectedFlows(sourceRecord) {
  const connected = [...flowLineRecords.values()].filter((record) =>
    record !== sourceRecord && (
      record.relation.origin === sourceRecord.relation.origin ||
      record.relation.origin === sourceRecord.relation.destination ||
      record.relation.destination === sourceRecord.relation.origin ||
      record.relation.destination === sourceRecord.relation.destination
    )
  );
  if (!connected.length) return;
  const duration = 680;
  const startedAt = performance.now();
  const step = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const envelope = Math.pow(1 - progress, 1.7);
    connected.forEach((record, index) => {
      if (!flowLineRecords.has(record.key)) return;
      const originPoint = map.latLngToLayerPoint(record.origin);
      const destinationPoint = map.latLngToLayerPoint(record.destination);
      const vector = destinationPoint.subtract(originPoint);
      const length = Math.max(1, Math.hypot(vector.x, vector.y));
      const perpendicular = L.point(-vector.y / length, vector.x / length);
      const amplitude = (5 + Math.min(8, record.weight * 0.45)) * envelope;
      const phase = progress * Math.PI * 10 + index * 0.8;
      const midpoint = map.latLngToLayerPoint(record.midpoint);
      const controlPoint = midpoint.add(perpendicular.multiplyBy(Math.sin(phase) * amplitude));
      setFlowControlPoint(record, map.layerPointToLatLng(controlPoint));
    });
    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }
    connected.forEach(resetFlowLine);
  };
  requestAnimationFrame(step);
}

function setFlowControlPoint(record, controlLatLng) {
  const latLngs = [record.origin, controlLatLng, record.destination];
  record.baseLine.setLatLngs(latLngs);
  record.streamLine?.setLatLngs(latLngs);
  record.hitLine?.setLatLngs(latLngs);
}

function resetFlowLine(record) {
  record.baseLine.setLatLngs([record.origin, record.destination]);
  record.baseLine.setStyle({ weight: record.weight, opacity: record.baseOpacity });
  record.streamLine?.setLatLngs([record.origin, record.destination]);
  record.streamLine?.setStyle({ weight: record.streamWeight, opacity: record.streamOpacity });
  record.hitLine?.setLatLngs([record.origin, record.destination]);
}

function getLatLngMidpoint(origin, destination) {
  return L.latLng((origin[0] + destination[0]) / 2, (origin[1] + destination[1]) / 2);
}

function getRelationHitWeight(relation, visibleWeight) {
  if (relation.count <= 1) return Math.max(18, visibleWeight + 12);
  if (relation.count <= 3) return Math.max(15, visibleWeight + 10);
  return Math.max(10, visibleWeight + 6);
}

function getRelationWeight(relation, intensity, zoomBoost) {
  if (relation.count === 1) {
    return Math.max(0.7, 0.95 * zoomBoost);
  }
  return (2.1 + intensity * 17) * zoomBoost;
}

function renderFlowLayer(resetRotation = true) {
  if (resetRotation) animatedFlowOffset = 0;
  clearPendingElasticFlow();
  document.body.classList.remove("elastic-flow-active");
  if (elasticFlowDrag) releaseElasticFlowDrag();
  flowLineRecords.clear();
  flowLayer.clearLayers();
  clearFlowGradients();
  if (markerFocusRole || flowsHidden) {
    if (flowAnimationTimer) {
      window.clearInterval(flowAnimationTimer);
      flowAnimationTimer = null;
    }
    return;
  }
  const relationCount = currentVisibleRelations.length;
  currentVisibleRelations.forEach((relation, index) =>
    drawRelation(relation, currentMaxRelationCount, !simplifiedView && shouldAnimateFlow(index, relationCount))
  );
  scheduleFlowAnimationRotation();
}

function shouldAnimateFlow(index, relationCount) {
  if (relationCount <= MAX_ANIMATED_FLOWS) return true;
  const relativeIndex = (index - animatedFlowOffset + relationCount) % relationCount;
  return relativeIndex < MAX_ANIMATED_FLOWS;
}

function scheduleFlowAnimationRotation() {
  if (flowAnimationTimer) {
    window.clearInterval(flowAnimationTimer);
    flowAnimationTimer = null;
  }
  if (simplifiedView) return;
  if (currentVisibleRelations.length <= MAX_ANIMATED_FLOWS) return;
  flowAnimationTimer = window.setInterval(() => {
    animatedFlowOffset = (animatedFlowOffset + MAX_ANIMATED_FLOWS) % currentVisibleRelations.length;
    renderFlowLayer(false);
  }, FLOW_ANIMATION_ROTATION_MS);
}

function getFlowZoomBoost() {
  if (!map) return 1;
  const maxZoom = map.getMaxZoom();
  const zoom = map.getZoom();
  if (zoom >= maxZoom) return 1.75;
  if (zoom >= maxZoom - 1) return 1.3;
  return 1;
}

// Flow detail modal.
function openRelationModal(relation) {
  flowModalReturnState = null;
  flowSlideIndex = 0;
  updateFlowModalBackButton();
  runWithLoadingOverlay(t("loading.flow"), () => {
    updateModalSelection({
      year: getSelectedYearValue(),
      origin: relation.origin,
      destination: relation.destination
    });
    modal.showModal();
  });
}

function updateModalSelection(selection) {
  const normalized = normalizeModalSelection(selection);
  modalSelection = normalized;

  const filtered = getRowsForYear(normalized.year);
  const relations = aggregateRelations(filtered, { includeUnknownDestination: true });
  const selected = relations.find((item) => item.key === relationKey(normalized.origin, normalized.destination));
  const allYearsRelation = aggregateRelations(
    rows.filter((row) => relationKey(row.pays_depart, row.pays_arrivee) === selected.key),
    { includeUnknownDestination: true }
  )[0] || selected;
  modalCurrentRelations = relations;
  modalSelectedKey = selected.key;

  modalKicker.textContent = t("flow.kicker");
  renderModalTitle(normalized, selected.count);
  modalText.textContent = t("flow.description");
  updateFlowRelationsHeading();

  renderFlowRelationsChart();
  renderYearlyChart(allYearsRelation);
  setFlowSlide(flowSlideIndex);
}

function updateFlowRelationsHeading() {
  const filterLabel = getFlowRelationsFilterLabel();
  flowRelationsHeading.textContent = filterLabel
    ? t("flow.routesFilteredTitle", { filter: filterLabel })
    : t("flow.routesTitle");
}

function getFlowRelationsFilterLabel() {
  if (selectedRegion) return t("flow.regionFilterLabel", { region: getRegionDisplayName(selectedRegion) });
  return "";
}

function normalizeModalSelection(selection) {
  const years = getAvailableYears();
  const year = selection.year === ALL_YEARS || years.includes(Number(selection.year)) ? selection.year : years.at(-1);
  const origins = getOriginsForYear(year);
  const origin = origins.includes(selection.origin) ? selection.origin : origins[0];
  const destinations = getDestinationsForYearOrigin(year, origin);
  const destination = destinations.includes(selection.destination) ? selection.destination : destinations[0];
  return { year, origin, destination };
}

function renderModalTitle(selection, count) {
  const modalTitleCopy = getFlowModalTitleCopy(selection.year, count);
  const yearOptions = [
    { value: ALL_YEARS, label: t("filters.since", { year: getEarliestYear() }), selected: selection.year === ALL_YEARS },
    ...getAvailableYears().map((year) => ({
    value: year,
    label: String(year),
    selected: year === selection.year
    }))
  ];
  const originOptions = getOriginsForYear(selection.year).map((origin) => ({
    value: origin,
    label: getCountryDisplayName(origin),
    selected: origin === selection.origin
  }));
  const destinationOptions = getDestinationsForYearOrigin(selection.year, selection.origin).map((destination) => ({
    value: destination,
    label: getCountryDisplayName(destination),
    selected: destination === selection.destination
  }));

  modalTitle.innerHTML = `
    ${t("flow.title", {
      prefix: modalTitleCopy.prefix,
      yearSelect: renderInlineSelect("modalYearSelect", t("flow.yearSelect"), yearOptions),
      count,
      subject: modalTitleCopy.subject,
      originSelect: renderInlineSelect("modalOriginSelect", t("flow.originSelect"), originOptions),
      destinationSelect: renderInlineSelect("modalDestinationSelect", t("flow.destinationSelect"), destinationOptions)
    })}
  `;

  document.querySelector("#modalYearSelect").addEventListener("change", (event) => {
    updateModalSelection({
      year: event.target.value === ALL_YEARS ? ALL_YEARS : Number(event.target.value),
      origin: modalSelection.origin,
      destination: modalSelection.destination
    });
  });

  document.querySelector("#modalOriginSelect").addEventListener("change", (event) => {
    updateModalSelection({
      year: modalSelection.year,
      origin: event.target.value,
      destination: modalSelection.destination
    });
  });

  document.querySelector("#modalDestinationSelect").addEventListener("change", (event) => {
    updateModalSelection({
      year: modalSelection.year,
      origin: modalSelection.origin,
      destination: event.target.value
    });
  });

  adjustModalTitleSelectWidths();
}

function getFlowModalTitleCopy(year, count) {
  return {
    prefix: year === ALL_YEARS ? "" : t("stats.in", { year: "" }).trimStart(),
    subject: t(count > 1 ? "flow.subjectPlural" : "flow.subjectSingular")
  };
}

function renderInlineSelect(id, label, options) {
  const selectKind = id === "modalYearSelect" ? "year" : id === "modalOriginSelect" ? "origin" : "destination";
  const htmlOptions = options
    .map((option) => {
      const selected = option.selected ? "selected" : "";
      return `<option value="${escapeAttribute(option.value)}" ${selected}>${escapeHtml(option.label)}</option>`;
    })
    .join("");
  return `<select id="${id}" class="modal-title-select modal-title-select-${selectKind}" aria-label="${escapeAttribute(label)}">${htmlOptions}</select>`;
}

function adjustModalTitleSelectWidths() {
  modalTitle.querySelectorAll(".modal-title-select").forEach((select) => {
    const selectedLabel = select.options[select.selectedIndex]?.textContent || "";
    const style = window.getComputedStyle(select);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const textWidth = measureTextWidth(selectedLabel, font);
    const horizontalPadding = Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.paddingRight);
    const borderWidth = Number.parseFloat(style.borderLeftWidth) + Number.parseFloat(style.borderRightWidth);
    const reserve = 12;
    const idealWidth = Math.ceil(textWidth + horizontalPadding + borderWidth + reserve);
    const viewportLimit = Math.max(86, Math.min(window.innerWidth - 96, select.id === "modalYearSelect" ? 150 : 250));
    select.style.setProperty("--select-width", `${Math.min(idealWidth, viewportLimit)}px`);
    select.title = selectedLabel;
  });
}

function measureTextWidth(text, font) {
  const canvas = measureTextWidth.canvas || (measureTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  return context.measureText(text).width;
}

function getAvailableYears() {
  return [...new Set(rows.map((row) => Number(row.date)))].sort((a, b) => a - b);
}

function getAvailableYearsForCurrentCountry() {
  const relevantRows = selectedCountry ? getRowsForCountry(selectedCountry) : rows;
  return [...new Set(relevantRows.map((row) => Number(row.date)))].sort((a, b) => a - b);
}

function getCountriesForYear(year) {
  const scopedRows = getRowsForYear(year);
  const countryCounts = aggregateCountryCounts(scopedRows);
  return [...countryCounts.keys()].sort((a, b) => sortCountriesByCountThenName(a, b, countryCounts));
}

function getOriginsForYear(year) {
  const counts = new Map();
  rows
    .filter((row) => (year === ALL_YEARS || Number(row.date) === year) && getCoords(row.pays_depart))
    .forEach((row) => counts.set(row.pays_depart, (counts.get(row.pays_depart) || 0) + 1));
  return [...counts.keys()].sort((a, b) => sortCountriesByCountThenName(a, b, counts));
}

function getDestinationsForYearOrigin(year, origin) {
  const counts = new Map();
  rows
    .filter((row) => (year === ALL_YEARS || Number(row.date) === year) && row.pays_depart === origin && (getCoords(row.pays_arrivee) || isUnknownCountry(row.pays_arrivee)))
    .forEach((row) => counts.set(row.pays_arrivee, (counts.get(row.pays_arrivee) || 0) + 1));
  return [...counts.keys()].sort((a, b) => sortCountriesByCountThenName(a, b, counts));
}

function sortCountriesByCountThenName(a, b, counts) {
  return (counts.get(b) || 0) - (counts.get(a) || 0) || getCountryDisplayName(a).localeCompare(getCountryDisplayName(b), currentLanguage);
}

function renderFlowRelationsChart() {
  const relations = modalCurrentRelations;
  const maxCount = Math.max(...modalCurrentRelations.map((relation) => relation.count), 1);

  flowRelationsChart.innerHTML = `
    <div class="flow-relation-list">
      ${relations
    .map((relation) => {
      const ratio = relation.count / maxCount;
      const isSelected = relation.key === modalSelectedKey;
      const color = isSelected ? EXILE_COLOR : MAP_FLOW_COLOR;
      const width = 28 + Math.pow(ratio, 0.62) * 72;
      const selected = isSelected ? " selected" : "";
      return `
        <button class="flow-relation-row${selected}" type="button" title="${escapeAttribute(t("metrics.cases", { count: relation.count }))}" data-relation="${escapeAttribute(relation.key)}">
          <span class="flow-row-count">${relation.count}</span>
          <span class="flow-country flow-origin">${escapeHtml(getCountryDisplayName(relation.origin))}</span>
          <span class="modal-flow-track" style="--flow-color:${color}; --flow-width:${width}%">
            <span class="modal-flow-base"></span>
            <span class="modal-flow-stream"></span>
          </span>
          <span class="flow-country flow-destination">${escapeHtml(getCountryDisplayName(relation.destination))}</span>
        </button>
      `;
    })
    .join("")}
    </div>
  `;

  flowRelationsChart.querySelectorAll(".flow-relation-row").forEach((row) => {
    row.addEventListener("click", () => {
      const relation = modalCurrentRelations.find((item) => item.key === row.dataset.relation);
      if (relation) updateModalSelection({
        year: modalSelection.year,
        origin: relation.origin,
        destination: relation.destination
      });
    });
  });

  scheduleSelectedFlowRelationCenter();
}

function renderYearlyChart(relation) {
  yearlyChart?.destroy();
  yearlyChartTitle.textContent = t("flow.yearlyTitle", { origin: relation.origin, destination: relation.destination });
  const years = [...relation.years.keys()].sort((a, b) => a - b);
  const track = document.querySelector("#yearlyChartTrack");
  track.style.width = `${Math.max(420, years.length * 44)}px`;

  yearlyChart = createThemedChart(Chart, document.querySelector("#yearlyChart"), {
    type: "bar",
    data: {
      labels: years,
      datasets: [
        {
          label: t("flow.caseLabel"),
          data: years.map((year) => relation.years.get(year)),
          backgroundColor: HOSTED_COLOR
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } }
      }
    }
  });
}

function centerSelectedFlowRelation() {
  const list = flowRelationsChart.querySelector(".flow-relation-list");
  const selected = list?.querySelector(".flow-relation-row.selected");
  if (!list || !selected) return;
  const listRect = list.getBoundingClientRect();
  const selectedRect = selected.getBoundingClientRect();
  const relativeTop = selectedRect.top - listRect.top + list.scrollTop;
  const topMargin = Math.min(48, Math.max(16, list.clientHeight * 0.18));
  list.scrollTop = Math.max(0, relativeTop - topMargin);
}

function scheduleSelectedFlowRelationCenter() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      centerSelectedFlowRelation();
      window.setTimeout(centerSelectedFlowRelation, 80);
    });
  });
}

// Country detail modal.
function openCountryDetails(country, { resetHistory = true, state = null } = {}) {
  if (resetHistory) countryModalHistory = [];
  displayCountryDetails(country, state);
}

function displayCountryDetails(country, state = null) {
  runWithLoadingOverlay(t("loading.country"), () => {
    selectedDetailCountry = country;
    countrySlideIndex = state?.slideIndex ?? 0;
    const details = getCountryDetails(country);
    const displayName = getCountryDisplayName(country, details);
    countryModalKicker.textContent = "";
    const flagUrl = getCountryFlagUrl(country);
    countryModalTitle.innerHTML = `<span class="country-title-flag"><span>${escapeHtml(getCountryFlag(country))}</span>${flagUrl ? `<img src="${escapeAttribute(flagUrl)}" alt="">` : ""}</span> ${escapeHtml(displayName)}`;
    countryModalText.textContent = t("country.description");
    countryNetworkView = state?.view ?? "diagram";
    countryNetworkViewButtons.forEach((button) => button.classList.toggle("active", button.dataset.networkView === countryNetworkView));
    const safeDetailsUrl = getSafeExternalUrl(details.url);
    countryMoreLink.hidden = !safeDetailsUrl;
    countryMoreLink.href = safeDetailsUrl || "#";
    countryMoreLink.rel = "noopener noreferrer";
    hydrateCountryRelationYear(country);
    if (state?.year && [...countryRelationYear.options].some((option) => option.value === String(state.year))) {
      countryRelationYear.value = String(state.year);
    }
    renderCountryNetwork(country, countryRelationYear.value);
    renderCountryFlowChart(country, details);
    renderPressFreedomChart(country, details);
    setCountrySlide(countrySlideIndex);
    updateCountryModalBackButton();
    if (!countryModal.open) countryModal.showModal();
  });
}

function captureCountryModalState() {
  return {
    country: selectedDetailCountry,
    year: countryRelationYear.value,
    view: countryNetworkView,
    slideIndex: countrySlideIndex
  };
}

function navigateToCountryDetails(country) {
  if (!country || country === selectedDetailCountry) return;
  countryModalHistory.push(captureCountryModalState());
  displayCountryDetails(country);
}

function returnFromCountryModal() {
  const previous = countryModalHistory.pop();
  if (!previous) {
    countryModal.close();
    return;
  }
  displayCountryDetails(previous.country, previous);
}

function returnFromFlowModal() {
  modal.close();
  if (!flowModalReturnState) return;
  const previous = flowModalReturnState;
  flowModalReturnState = null;
  displayCountryDetails(previous.country, previous);
}

function updateCountryModalBackButton() {
  const previous = countryModalHistory.at(-1);
  backCountryModal.textContent = previous ? t("buttons.backCountry", { country: getCountryDisplayName(previous.country) }) : t("buttons.backMap");
}

function updateFlowModalBackButton() {
  backFlowModal.textContent = flowModalReturnState
    ? t("buttons.backCountryFile", { country: getCountryDisplayName(flowModalReturnState.country) })
    : t("buttons.backMap");
}

function getCountryDetails(country) {
  return countryDetails[country] || countryDetails[stripAccents(country)] || countryDetails.default || {
    names: { fr: country, en: "", es: "" },
    description: "",
    url: "",
    pressFreedomRank: {},
    events: []
  };
}

function getCountryDisplayName(country, details = getCountryDetails(country)) {
  if (currentLanguage === "en" && details.names?.en) return details.names.en;
  if (currentLanguage === "es" && details.names?.es) return details.names.es;
  return details.names?.fr || country;
}

function hydrateCountryRelationYear(country) {
  const years = [...new Set(getRowsForCountry(country).map((row) => Number(row.date)))].sort((a, b) => a - b);
  const mapYear = getSelectedYearValue();
  const selectedYear = mapYear === ALL_YEARS || years.includes(Number(mapYear)) ? mapYear : years.at(-1);
  countryRelationYear.innerHTML = [
    `<option value="${ALL_YEARS}" ${selectedYear === ALL_YEARS ? "selected" : ""}>${escapeHtml(t("filters.since", { year: getEarliestYear() }))}</option>`,
    ...years.map((year) => `<option value="${year}" ${year === selectedYear ? "selected" : ""}>${year}</option>`)
  ].join("");
}

function renderCountryNetwork(country, yearValue) {
  const connected = getCountryNetworkConnections(country, yearValue);

  if (!connected.length) {
    countryNetwork.innerHTML = `<p class="empty-state">${escapeHtml(t("country.empty"))}</p>`;
    return;
  }

  if (countryNetworkView === "list") {
    renderCountryNetworkList(connected);
    return;
  }

  const diagramConnections = getVisibleCountryNetworkConnections(connected);
  const maxCount = Math.max(...diagramConnections.map((item) => item.count), 1);
  const center = 190;
  const radius = 142;
  const nodes = diagramConnections.map((item, index) => {
    const angle = (index / diagramConnections.length) * Math.PI * 2 - Math.PI / 2;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    const color = item.direction === "out" ? EXILE_COLOR : item.direction === "in" ? HOSTED_COLOR : BALANCED_COLOR;
    const stroke = 1 + Math.pow(item.count / maxCount, 0.55) * 5;
    const nodeRadius = 18 + Math.pow(item.count / maxCount, 0.55) * 10;
    const controlX = center + Math.cos(angle + 0.34) * radius * 0.42;
    const controlY = center + Math.sin(angle + 0.34) * radius * 0.42;
    return { ...item, x, y, color, stroke, nodeRadius, controlX, controlY };
  });

  countryNetwork.innerHTML = `
    <svg class="country-network-svg" viewBox="0 0 380 380" role="img" aria-label="${escapeAttribute(t("country.relationsTitle"))} ${escapeAttribute(getCountryDisplayName(country))}">
      <defs>
        ${nodes.filter((node) => node.relation).map((node) => `<clipPath id="networkFlagClip${nodes.indexOf(node)}"><circle cx="${node.x}" cy="${node.y}" r="${node.nodeRadius - 3}" /></clipPath>`).join("")}
        <clipPath id="networkCenterFlagClip"><circle cx="${center}" cy="${center}" r="33" /></clipPath>
      </defs>
      <circle cx="${center}" cy="${center}" r="128" class="network-guide" fill="none" stroke="#d7dfdc" stroke-width="1" stroke-dasharray="3 8" opacity="0.9" />
      ${nodes.map((node) => `<path class="network-link ${node.direction}" ${node.relation ? `data-relation="${escapeAttribute(node.relation.key)}"` : `data-other-relation="${escapeAttribute(node.hiddenConnections[0].relation.key)}"`} d="M ${center} ${center} Q ${node.controlX} ${node.controlY} ${node.x} ${node.y}" stroke="${node.color}" stroke-width="${node.stroke}" fill="none" opacity="0.72" />`).join("")}
      ${nodes.map((node, index) => `
        <g class="network-node" ${getNetworkNodeActionAttributes(node)} role="button" tabindex="0">
          <circle cx="${node.x}" cy="${node.y}" r="${node.nodeRadius + 5}" fill="${node.color}" opacity="0.1" />
          <circle class="network-node-disc" cx="${node.x}" cy="${node.y}" r="${node.nodeRadius}" fill="#fff" stroke="${node.color}" stroke-width="2.5" />
          ${node.relation ? renderNetworkFlag(node.country, node.x, node.y, (node.nodeRadius - 3) * 2, `networkFlagClip${index}`) : `<text class="network-other-label" x="${node.x}" y="${node.y + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="#16201d">+</text>`}
          <text class="network-country-name" x="${node.x}" y="${node.y + node.nodeRadius + 17}" text-anchor="middle" font-size="10" fill="#5f6b66">${escapeHtml(shortCountryName(getCountryDisplayName(node.country)))}</text>
          <text x="${node.x}" y="${node.y + node.nodeRadius + 30}" text-anchor="middle" font-size="9" fill="${node.color}">${escapeHtml(t("metrics.cases", { count: node.count }))}</text>
          <title>${escapeHtml(getCountryDisplayName(node.country))} - ${escapeHtml(t("metrics.cases", { count: node.count }))}</title>
        </g>
      `).join("")}
      <circle class="network-center-halo" cx="${center}" cy="${center}" r="48" fill="#16201d" opacity="0.08" />
      <circle class="network-center-disc" cx="${center}" cy="${center}" r="38" fill="#16201d" />
      ${renderNetworkFlag(country, center, center, 66, "networkCenterFlagClip")}
      <text class="network-country-name" x="${center}" y="${center + 58}" text-anchor="middle" font-size="11" fill="#16201d">${escapeHtml(shortCountryName(getCountryDisplayName(country)))}</text>
    </svg>
  `;
  bindCountryNetworkRelations();
}

function getNetworkNodeActionAttributes(node) {
  if (!node.relation) {
    return `data-other-relation="${escapeAttribute(node.hiddenConnections[0].relation.key)}"`;
  }
  if (isUnknownCountry(node.country)) {
    return `data-relation="${escapeAttribute(node.relation.key)}"`;
  }
  return `data-country="${escapeAttribute(node.country)}"`;
}

function getCountryNetworkConnections(country, yearValue) {
  const scopedRows = getRowsForCountry(country).filter((row) => yearValue === ALL_YEARS || Number(row.date) === Number(yearValue));
  return aggregateRelations(scopedRows, { includeUnknownDestination: true })
    .map((relation) => ({
      relation,
      country: relation.origin === country ? relation.destination : relation.origin,
      direction: relation.origin === country ? "out" : "in",
      count: relation.count
    }))
    .sort((a, b) => b.count - a.count);
}

function getVisibleCountryNetworkConnections(connected) {
  const visibleLimit = connected.length > MAX_COUNTRY_NETWORK_NODES ? MAX_COUNTRY_NETWORK_NODES - 1 : MAX_COUNTRY_NETWORK_NODES;
  const visibleConnections = connected.slice(0, visibleLimit);
  const hiddenConnections = connected.slice(visibleLimit);
  return hiddenConnections.length
    ? [...visibleConnections, {
      country: t("country.other"),
      direction: "other",
      count: hiddenConnections.reduce((sum, item) => sum + item.count, 0),
      hiddenConnections
    }]
    : visibleConnections;
}

function renderCountryNetworkList(connected) {
  const maxCount = Math.max(...connected.map((item) => item.count), 1);
  countryNetwork.innerHTML = `
    <div class="country-network-list">
      ${connected.map((item) => {
        const color = item.direction === "out" ? EXILE_COLOR : HOSTED_COLOR;
        const width = 28 + Math.pow(item.count / maxCount, 0.62) * 72;
        return `
          <button class="country-network-list-row" type="button" data-relation="${escapeAttribute(item.relation.key)}" title="${escapeAttribute(t("metrics.cases", { count: item.count }))}">
            <span class="flow-row-count">${item.count}</span>
            <span class="network-list-country network-list-origin">${escapeHtml(getCountryDisplayName(item.relation.origin))}</span>
            <span class="modal-flow-track" style="--flow-color:${color}; --flow-width:${width}%">
              <span class="modal-flow-base"></span>
              <span class="modal-flow-stream"></span>
            </span>
            <span class="network-list-country network-list-destination">${escapeHtml(getCountryDisplayName(item.relation.destination))}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;
  bindCountryNetworkRelations();
  centerPendingCountryListRelation();
}

function bindCountryNetworkRelations() {
  countryNetwork.querySelectorAll("[data-other-relation]").forEach((element) => {
    const openList = () => {
      pendingCountryListRelationKey = element.dataset.otherRelation;
      countryNetworkView = "list";
      countryNetworkViewButtons.forEach((button) => button.classList.toggle("active", button.dataset.networkView === countryNetworkView));
      renderCountryNetwork(selectedDetailCountry, countryRelationYear.value);
    };
    element.addEventListener("click", openList);
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openList();
      }
    });
  });
  countryNetwork.querySelectorAll("[data-country]").forEach((element) => {
    const openCountry = () => navigateToCountryDetails(element.dataset.country);
    element.addEventListener("click", openCountry);
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCountry();
      }
    });
  });
  countryNetwork.querySelectorAll("[data-relation]").forEach((element) => {
    const open = () => {
      const relation = aggregateRelations(
        getRowsForCountry(selectedDetailCountry).filter((row) => countryRelationYear.value === ALL_YEARS || Number(row.date) === Number(countryRelationYear.value)),
        { includeUnknownDestination: true }
      ).find((item) => item.key === element.dataset.relation);
      if (!relation) return;
      flowModalReturnState = captureCountryModalState();
      updateFlowModalBackButton();
      countryModal.close();
      runWithLoadingOverlay(t("loading.flow"), () => {
        flowSlideIndex = 0;
        updateModalSelection({
          year: countryRelationYear.value === ALL_YEARS ? ALL_YEARS : Number(countryRelationYear.value),
          origin: relation.origin,
          destination: relation.destination
        });
        modal.showModal();
      });
    };
    element.addEventListener("click", open);
    if (element.tagName.toLowerCase() !== "button") {
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      });
    }
  });
}

function centerPendingCountryListRelation() {
  if (!pendingCountryListRelationKey) return;
  const list = countryNetwork.querySelector(".country-network-list");
  const relation = [...(list?.querySelectorAll("[data-relation]") || [])]
    .find((element) => element.dataset.relation === pendingCountryListRelationKey);
  pendingCountryListRelationKey = "";
  if (!list || !relation) return;
  list.scrollTop = Math.max(0, relation.offsetTop - (list.clientHeight - relation.offsetHeight) / 2);
}

function renderNetworkFlag(country, x, y, size, clipId) {
  const url = getCountryFlagUrl(country);
  const code = countryIsoCodes[country] || countryIsoCodes[stripAccents(country)] || "";
  if (!url) {
    return `<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="900" fill="#16201d">${escapeHtml(code.toUpperCase() || getCountryFlag(country))}</text>`;
  }
  return `<image href="${escapeAttribute(url)}" x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clipId})" />`;
}

function renderCountryFlowChart(country, details) {
  countryFlowChart?.destroy();
  const years = getAvailableYears();
  const hosted = years.map((year) => rows.filter((row) => Number(row.date) === year && row.pays_arrivee === country).length);
  const departed = years.map((year) => rows.filter((row) => Number(row.date) === year && row.pays_depart === country).length);
  const eventYears = new Set((details.events || []).map((event) => Number(event.year)));

  countryFlowChart = createThemedChart(Chart, document.querySelector("#countryFlowChart"), {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: t("legend.hosted"),
          data: hosted,
          borderColor: HOSTED_COLOR,
          backgroundColor: HOSTED_COLOR,
          tension: 0.28
        },
        {
          label: t("legend.exile"),
          data: departed,
          borderColor: EXILE_COLOR,
          backgroundColor: EXILE_COLOR,
          tension: 0.28
        },
        {
          label: "Événement marquant",
          data: years.map((year, index) => eventYears.has(year) ? Math.max(hosted[index], departed[index], 1) : null),
          type: "scatter",
          pointStyle: "triangle",
          pointRadius: 7,
          borderColor: "#cc2d2d",
          backgroundColor: "#cc2d2d",
          showLine: false
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: getChartLegendOptions() },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    }
  });
}

function renderPressFreedomChart(country, details) {
  pressFreedomChart?.destroy();
  const displayName = getCountryDisplayName(country, details);
  const rankEntries = Object.entries(details.pressFreedomRank || {})
    .filter(([, rank]) => rank !== null && rank !== undefined)
    .sort(([a], [b]) => Number(a) - Number(b));
  const labels = rankEntries.map(([year]) => year);
  const values = rankEntries.map(([, rank]) => rank);

  pressFreedomChart = createThemedChart(Chart, document.querySelector("#pressFreedomChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: `${t("country.rank")} RSF - ${displayName}`,
        data: values,
        borderColor: "#cc2d2d",
        backgroundColor: "#cc2d2d",
        tension: 0.25
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: getChartLegendOptions(),
        tooltip: {
          callbacks: {
            label: (context) => t("country.rankTooltip", {
              country: displayName,
              rank: context.parsed.y
            })
          }
        }
      },
      scales: {
        y: {
          reverse: true,
          title: { display: true, text: t("country.rank") },
          ticks: { precision: 0 }
        }
      }
    }
  });
}

function getChartLegendOptions() {
  return {
    position: "bottom",
    labels: {
      boxWidth: 22,
      boxHeight: 3,
      color: "#5f6b66",
      padding: 14,
      usePointStyle: true,
      pointStyle: "line",
      font: {
        family: "Electrolize",
        size: 12,
        weight: "700"
      }
    }
  };
}

function setFlowSlide(nextIndex) {
  const slides = [...flowCarousel.querySelectorAll(".flow-slide")];
  if (!slides.length) return;
  flowSlideIndex = (nextIndex + slides.length) % slides.length;
  slides.forEach((slide, index) => slide.classList.toggle("active", index === flowSlideIndex));
  flowSlideLabel.textContent = flowSlideIndex === 0 ? t("flow.slides.routes") : t("flow.slides.yearly");
  setTimeout(() => {
    yearlyChart?.resize();
    centerSelectedFlowRelation();
  }, 50);
}

function setCountrySlide(nextIndex) {
  const slides = [...countryCarousel.querySelectorAll(".country-slide")];
  countrySlideIndex = (nextIndex + slides.length) % slides.length;
  slides.forEach((slide, index) => slide.classList.toggle("active", index === countrySlideIndex));
  countrySlideLabel.textContent = getCountrySlideLabel(countrySlideIndex);
  setTimeout(() => {
    countryFlowChart?.resize();
    pressFreedomChart?.resize();
  }, 50);
}

function getCountrySlideLabel(index) {
  const labels = [
    t("country.slides.relations"),
    t("country.slides.flows"),
    t("country.slides.freedom")
  ];
  return labels[index] || "";
}

// Formatting and small utilities.
function shortCountryName(country) {
  return country.length > 13 ? `${country.slice(0, 12)}…` : country;
}

function getCoords(country) {
  return countryCoords[country] || countryCoords[stripAccents(country)];
}

function isUnknownCountry(country) {
  return stripAccents(country).toLowerCase() === stripAccents(UNKNOWN_COUNTRY).toLowerCase();
}

function getCountryFlag(country) {
  if (isUnknownCountry(country)) return "?";
  const code = countryIsoCodes[country] || countryIsoCodes[stripAccents(country)];
  if (!code) return "⚑";
  return [...code.toUpperCase()]
    .map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)))
    .join("");
}

function getCountryFlagUrl(country) {
  if (isUnknownCountry(country)) return "";
  const code = countryIsoCodes[country] || countryIsoCodes[stripAccents(country)];
  return code ? `https://flagcdn.com/w80/${code.toLowerCase()}.png` : "";
}

function getPluralLabel(count, singular, plural) {
  return count > 1 ? plural : singular;
}

function getCountryMarkerSize(count, maxCount, roleCounts = {}, country = "") {
  const baseSize = count ? 18 + Math.pow(count / maxCount, 0.48) * 42 : 18;
  return baseSize * getMarkerFocusBoost(roleCounts, country) * getMarkerZoomBoost();
}

function getSimplifiedMarkerSize() {
  return 15 * getMarkerZoomBoost();
}

function getMarkerFocusBoost(roleCounts = {}, country = "") {
  const focusState = getMarkerFocusState(roleCounts, country);
  if (focusState === "highlighted") return 1.5;
  if (focusState === "dimmed") return 0.5;
  return 1;
}

function getMarkerFocusState(roleCounts = {}, country = "") {
  if (selectedRegion && getCountryRegion(country) !== selectedRegion) return "dimmed";
  if (!markerFocusRole) return "neutral";
  const departed = roleCounts.departed || 0;
  const hosted = roleCounts.hosted || 0;
  if (departed === hosted) return "dimmed";
  const majority = departed > hosted ? "departed" : "hosted";
  return majority === markerFocusRole ? "highlighted" : "dimmed";
}

function getMarkerZoomBoost() {
  if (!map) return 1;
  const maxZoom = map.getMaxZoom();
  const zoom = map.getZoom();
  if (zoom >= maxZoom) return 1.65;
  if (zoom >= maxZoom - 1) return 1.28;
  return 1;
}

function getCountryRoleColor(roleCounts = {}) {
  const departed = roleCounts.departed || 0;
  const hosted = roleCounts.hosted || 0;
  const total = departed + hosted;
  if (!total) return BALANCED_COLOR;
  const hostedRatio = hosted / total;
  return hostedRatio <= 0.5
    ? mixHexColors(EXILE_COLOR, BALANCED_COLOR, hostedRatio * 2)
    : mixHexColors(BALANCED_COLOR, HOSTED_COLOR, (hostedRatio - 0.5) * 2);
}

function mixHexColors(start, end, ratio) {
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  const startChannels = hexToRgb(start);
  const endChannels = hexToRgb(end);
  const channels = startChannels.map((channel, index) => Math.round(channel + (endChannels[index] - channel) * clampedRatio));
  return `rgb(${channels.join(", ")})`;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((index) => Number.parseInt(value.slice(index, index + 2), 16));
}

function stripAccents(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function relationKey(origin, destination) {
  return `${origin} - ${destination}`;
}
