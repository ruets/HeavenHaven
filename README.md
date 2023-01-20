# SAÉ 3·01 (dépôt de rendu)

# Instructions et guide d'utilisation :

Nous vous recommandons d'utiliser le navigateur Firefox, les consignes suivantes ont été créées pour ce navigateur.
Pour accéder à notre site, rendez-vous sur le lien suivant afin d'accepter le risque et de pouvoir poursuivre :<br>
[Lien ver l'api](https://192.168.14.210:3000)<br>

**Si votre navigateur affiche l'erreur "Error 404 Page Not Found" :
Cela signifie que notre serveur n'est pas lancé. Si c'est le cas, vous pouvez contacter Jaufret BOURGUET via l'adresse Mail : 
"jaufret.bourguet@etu.univ-grenoble-alpes.fr", au numéro : 07 83 73 53 00 ou encore via le Discord de la SAE.**

Si ce n'est pas le cas : 
Cliquez sur le bouton "Avancé" puis sur "Accepter le risque et poursuivre" <br>
Suite à cela, la page devrait afficher le message suivant : 
```bash
Cannot GET /
```
Vous pouvez passer à l'opération suivante. 
Fermez la page et utilisez le lien ci-dessous : <br>
[lien vers le notre site](https://192.168.14.210)

Nous vous fournissons le compte utilisateur suivant pour vous Log In : 
```bash
identifiant(email) : admin@hh.com
mot de passe : admin
```

Cependant, si vous souhaitez tester la création de compte, il vous sera nécessaire de posséder un compte parrain.
Voici un code parrain (créé à cette occasion) que vous pouvez utiliser :
```bash
code : 2baed993e49c000
``` 
Il va de soi que les codes parrains générés lors de la création d'un compte sont plus longs et complexes que ce-dernier.

Nous avons initialement prévu que les îles mises aux enchères via le formulaire de mise en vente n'apparaissent pas directement 
sur le site Web. 
En effet, nous devons pouvoir vérifier que les informations renseignées par l'utilisateur ne sont pas erronées et que son titre de propriété 
est authentique. Suite à cela, nous aurions apporté quelques légères modifications sur la page (tel que le changement de coordonnées de l'Iframe)
pour que la carte affichée soit la bonne. 
Or, vous remarquerez que toutes les îles que vous créez apparaissent directement, c'est volontaire, afin de vous permettre de tester l'utilisabilité selon vos convenances.

Seul le filtre de "Location" fonctionne. Le code du filtre de "Weather" est fonctionnel mais le lien avec la base de données n'a pas été bien réalisé. Et pour la troisième partie du filtre "Price" et "Surface" seule l'interface est fonctionnelle.



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

























