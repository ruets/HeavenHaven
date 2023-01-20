# SAÉ 3·01 (dépôt de rendu)

Ce dépôt est le dépôt de référence de votre équipe pour la SAÉ 3·01.
Vos rendus se feront en déposant tous les fichiers pertinents pour chaque itération ici.

Ce dépôt est initialement organisé comme suit :
```console
rendus
├── docs/
│   └── README.md
├── .gitattributes
├── .gitignore
└── README.md
```

**Vous déposerez vos rendus textuel au format `pdf` dans le dossier `docs/`.<br>
Tout document textuel dans un autre format ne sera pas considéré.**


##### Fichiers particuliers

Les deux fichiers `.gitattributes` et `.gitignore` sont liés à la configuration de git.<br>
Vous pouvez modifier le fichier `.gitignore` en fonction des technologies utilisées et de l'organisation du dépôt choisie.<br>
Il est vivement déconseillé de modifier le fichier `.gitattributes`.

# Architecture du projet
Notre dossier se situe dans le home de l'utilisateur bourguja.

```bash
cd /home/bourguja/projet/rendus/
```

Nous avons divisé notre projet en deux dossiers principaux:

# Le dossier Frontend

Il y a différentes configurations pour le lancement du serveur react.

**css**

Ce dossier contient tout ce qui est nécessaire pour la compilation du scss en css.

**pages**

Ce dossier contient toutes les pages disponibles rangées de la manière suivante : un dossier avec le nom de page qui contient les fichiers react et scss de la page en question.

```console
├── src/
│   └── pages/
│       └── Bidding/
│           └── BiddingPage.jsx
│              └── Bidding.scss
│       └── Islands/ 
│       └── NotFund/ 
│       └── .../ 

```

**components**

Ce dossier contient tout les composants utilisés sur les pages rangées de la même manière que le dossier **"pages"**.

```console
├── src/
│   └── components/
│       └── base/
│           └── Footer/
│              └── Footer.jsx 
│              └── Footer.scss
│           └── Header/
│           └── NavBar/
│       └── card/ 
│       └── cookies/ 
│       └── .../ 

```

**assets**

Ce dossier contient toutes les images, les conditions générales d'utilisation et d'autres documents. Il inclut aussi toute l'apparence initiale des différents éléments utilisés.

```console
├── assets/
│   └── components/
│       └── documents/
│           └── Terms-and-conditions-of-use-of-Heaven-Haven-website.pdf
│           └── TermsOfService.txt
│       └── img/ 
│           └── arrow-down-icon.svg
│           └── ...
│       └── scss/ 
│           └── style.scss

```

**config/config.json**

Ce fichier contient l'adresse de l'API.

**hooks/coockies/**

Ce dossier contient toutes les fonctions principales des coockies de leur création à leur suppression.

```console
├── hooks/
│   └── coockies/
│       └── getCookie.jsx
│       └── removeCookie.jsx
│       └── setCookie.jsx
```

# Le dossier Backend

Tout comme dans le dossier frontend, il y a aussi des dossiers de configuration.

**config/config.js**

Ce fichier contient deux variables globales : la première pour le port utilisé par l'API et la deuxième pour l'encryptage des tokens d'authentification.

**controllers**

Les fichiers des controlleurs de chaque page réalisent en réalité deux actions : la partie service avec la demande de requête et la partie controllers afin de traiter les requêtes. 

```console
├── controllers/
│   └── user.js
│   └── islands.js
│   └── auth.js
│   └── auction.js
```

**img**

Ce dossier contient toutes les images des îles enregistrées dans la base de données, sous la forme d'un dossier avec le nom de l'île qui contient toutes les images associées.

```console
├── img/
│   └── Little_Whale_Cay
│       └── freddy-g-EJKGW6Ekg5o-unsplash.jpg1674142472755.jpg
│       └── ...
```

**middleware**

Ce dossier contient tous les fichiers qui servent à conformer les requêtes de l'utilisateur juste avant d'appeler les controlleurs.

**model**

Tout la base de données avec les différentes migrations sont stockées ici.


```console
├── model/
│   └── migrations
│       └── 20230106083302_0_init
│       └── ...
│   └── schema.prisma
```

**node_modules**

Tous les modules installés et utilisés sont stockés ici.


```console
├── node_modules/
│   └── prop-types
│   └── for-each
│   └── callsites
│   └── ...
```

**routes**

Tous les fichiers qui font le lien entre l'url et les fonctions.

```console
├── controllers/
│   └── user.js
│   └── islands.js
│   └── auth.js
│   └── auction.js
```

**test**

Tous les fichiers qui permettent de tester la couche modèle de notre site.

```console
├── test/
│   └──  model/
│       └── auction_model.test.js
│       └── island_model.test.js
│       └── user_model.test.js
```

























