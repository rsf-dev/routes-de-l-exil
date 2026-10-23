# Carte Exil

Les parcours animés, les filtres année/pays/région, les drapeaux, le mode navigation, la vue simplifiée, le mode daltonisme et les fiches pays restent propres à cette carte.

## Réglages

`js/reglages.js` centralise les fichiers, langues, fonds, zooms, options, couleurs et styles des enveloppes de région et des flux. Les sept fonds communs sont disponibles : Clair, Sombre, Fiord, Liberty, Bright, Satellite et Relief. Une seule entrée `carte.fonds` doit avoir `actifParDefaut: true`. Le fond initial reste clair. Chaque entrée utilise `theme: "light"` ou `"dark"`.

Le bouton Thème sombre rappelle le dernier fond sombre ou clair choisi. Les panneaux, fiches pays, listes, menus, tutoriels et graphiques suivent le thème du fond. Les palettes standard et daltonisme ont chacune une variante sombre ; les drapeaux conservent leurs couleurs. Les fonds et le changement de langue ne réinitialisent pas les filtres ni les options.

Exil conserve sa représentation par flux et points pays. Les enveloppes de région calculées restent non interactives, sans highlight au survol. Leurs contours et remplissages sont configurables dans `stylesGeojson.region`. Les zooms ordinaires réutilisent les flux et les marqueurs existants ; ils sont redessinés uniquement aux seuils qui changent leur taille.

`fonctionnalites.tutoriel.demarrageAutomatique` vaut `false` : le tutoriel reste accessible dans le menu en FR, EN et ES. Chaque option conserve ses paramètres `enabled` et `actifParDefaut` lorsqu'ils s'appliquent.

Le chargement initial utilise un seul écran de progression, attend les données et les tuiles rendues, et propose Réessayer en cas d'erreur. Les fonds Carto et la double récupération du logo ont été retirés. Les archives ZIP et les données sont conservées.
