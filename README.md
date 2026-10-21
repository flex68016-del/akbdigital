# Portfolio AKB - ALY Koffi Brice

Portfolio professionnel d'ALY Koffi Brice (AKB), vidéaste, photographe, monteur vidéo et Community Manager basé à Lomé, Togo.

## 🎯 À propos

ALY Koffi Brice, également connu sous le nom de AKB ou Mr Brice, est un créatif passionné par l'image et la communication digitale. Basé à Lomé, Togo, il offre ses services de production audiovisuelle et de gestion de communauté aux entreprises, marques et particuliers.

## 🌐 Coordonnées

- **Téléphone / WhatsApp** : +228 93 39 53 77
- **Email** : koffibricealy@gmail.com
- **Localisation** : Lomé, Togo
- **GitHub** : https://github.com/flex68016-del/akbdigital.git

## 🛠️ Stack Technique

- **HTML5**, **CSS3**, **JavaScript (ES6+)**
- **Aucun framework** - Pure Vanilla JS
- **Librairies CDN** :
  - GSAP 3.12.2 (animation)
  - GSAP ScrollTrigger (scroll-based animations)
  - GSAP Flip (FLIP animations)
  - Lenis (smooth scroll)
  - SplitType (text splitting)

## 📁 Structure du projet

```
/
├── index.html                  # Page d'accueil
├── a-propos.html               # À propos
├── services.html               # Services
├── portfolio.html              # Portfolio avec filtres
├── experiences.html            # Expériences professionnelles
├── akb-communication.html       # Page agence AKB Communication
├── contact.html                 # Formulaire de contact
├── 404.html                    # Page 404 personnalisée
├── sitemap.xml                  # Sitemap SEO
├── robots.txt                   # Robots.txt
├── css/
│   ├── style.css               # Design system et styles principaux
│   └── animations.css          # Animations CSS
├── js/
│   ├── main.js                 # Navigation, Lenis, interactions
│   ├── animations.js           # Animations GSAP centralisées
│   ├── portfolio-data.js        # Données du portfolio
│   └── experiences-data.js      # Données des expériences
└── assets/
    ├── images/                  # Images du site
    ├── videos/                   # Vidéos
    ├── icons/                    # Icônes
    └── fonts/                    # Polices (facultatif)
```

## 🚀 Installation et développement

1. Clonez le dépôt :
```bash
git clone https://github.com/flex68016-del/akbdigital.git
cd akbdigital
```

2. Ouvrez `index.html` dans votre navigateur pour voir le site.

3. Pour le développement, serveur local :
```bash
python -m http.server 8000
# ou
npx serve
```

## � Éléments manquants à compléter avant publication

### 🖼️ Images (11 fichiers JPG à remplacer)

**Actuels dans `assets/images/` :**
- ✅ `hero-poster.jpg` - Poster vidéo hero (présent)
- ✅ `portrait-brice.jpg` - Photo de profil (présent)
- ⚠️ `hero-placeholder.jpg` - Image hero (placeholder)
- ⚠️ `about-placeholder.jpg` - Image À propos (placeholder)
- ⚠️ `bio-placeholder.jpg` - Image bio (placeholder)
- ⚠️ `agency-placeholder.jpg` - Image agence (placeholder)
- ⚠️ `portfolio-1-placeholder.jpg` à `portfolio-6-placeholder.jpg` - 6 images portfolio (placeholders)

**Dimensions recommandées :**
- Hero poster : 1200×630 minimum (pour Open Graph)
- Portfolio thumbnails : 800×600 (4:3) ou 1200×675 (16:9)
- Portrait : 400×400 minimum (carré)

### 🎬 Vidéos (1 fichier à ajouter)

**Dossier `assets/videos/` :**
- ❌ `hero-showreel.mp4` - Vidéo showreel du hero (boucle, muette, format WebM ou MP4)

**Recommandations :**
- Durée : 10-30 secondes (boucle)
- Format : WebM (préféré) ou MP4 H.264
- Résolution : 1920×1080
- Audio : Muète (le site a sa propre musique)

### 🔣 Favicon (3 fichiers à créer)

**Dossier `assets/icons/` :**
- ❌ `favicon-32x32.png` - Favicon 32×32
- ❌ `favicon-16x16.png` - Favicon 16×16
- ❌ `apple-touch-icon.png` - Icon Apple Touch (180×180)

**Outils recommandés :**
- https://realfavicongenerator.net/ (génère tous les formats)
- ou utilisez le logo AKB comme base

### 📅 Dates d'expériences (6 dates à vérifier)

**Dans `experiences.html` et `js/experiences-data.js` :**
- Midzo Tech / Mayo App : `[DATE À VÉRIFIER]`
- Le Roi Lapin : `[DATE À VÉRIFIER]`
- Démarcation artisanale : `[DATE À VÉRIFIER]`
- Dunenyo Zan : `[DATE À VÉRIFIER]`
- ADN : `[DATE À VÉRIFIER]`
- AKB Communication : `[DATE À VÉRIFIER]`

### 📝 Crédits et descriptions

**À compléter dans `experiences.html` :**
- `[CRÉDITS À VÉRIFIER]` pour chaque expérience
- Descriptions détaillées pour les projets marqués `[À COMPLÉTER]`

**Dans `js/portfolio-data.js` :**
- Remplacer les 12 projets placeholders par vos vraies réalisations
- Chaque projet doit avoir : id, titre, catégories, type, miniature, src, client

### 🔗 Liens réseaux sociaux (4 liens à remplacer)

**Dans le footer de chaque page :**
- Instagram : `#` → Votre lien Instagram
- Facebook : `#` → Votre lien Facebook
- YouTube : `#` → Votre lien YouTube
- TikTok : `#` → Votre lien TikTok

### 📢 Slogan agence

**Dans `akb-communication.html` :**
- `[SLOGAN À VALIDER]` - Actuellement "Votre image, notre vision."
- Confirmez ou changez ce slogan

### 🌐 URL de domaine

**Dans les métadonnées SEO de chaque page (8 fichiers) :**
- `https://akbdigital.com/` → Votre nom de domaine réel

**Fichiers concernés :**
- index.html, a-propos.html, services.html, portfolio.html
- experiences.html, akb-communication.html, contact.html
- sitemap.xml, robots.txt

### 📧 Configuration formulaire de contact

**Dans `contact.html` :**
- Choisir entre Formspree ou EmailJS
- Remplacer les identifiants placeholder par vos vrais identifiants
- Voir section détaillée ci-dessous

## �📝 Personnalisation avant publication

### 1. Remplacer les médias

Les fichiers placeholder doivent être remplacés par vos vraies images et vidéos.

**Images à remplacer dans `assets/images/` :**
- `hero-placeholder.jpg` → Image hero de fond
- `about-placeholder.jpg` → Image section À propos
- `bio-placeholder.jpg` → Image bio
- `agency-placeholder.jpg` → Image agence AKB Communication
- `portfolio-1-placeholder.jpg` à `portfolio-6-placeholder.jpg` → 6 images portfolio

**Images présentes (à vérifier) :**
- `hero-poster.jpg` - Poster vidéo hero (1200×630 minimum pour OG)
- `portrait-brice.jpg` - Photo de profil

**Vidéo à ajouter dans `assets/videos/` :**
- `hero-showreel.mp4` - Vidéo de showreel du hero (boucle, muette, 10-30s)

**Favicon à créer dans `assets/icons/` :**
- `favicon-32x32.png` - Favicon 32×32
- `favicon-16x16.png` - Favicon 16×16
- `apple-touch-icon.png` - Icon Apple Touch (180×180)

**Outil recommandé :** https://realfavicongenerator.net/

### 3. Ajouter des réalisations au portfolio

Éditez `js/portfolio-data.js` et ajoutez vos projets dans le tableau `portfolioData` :

```javascript
{
    id: 13,
    titre: "Nom du projet",
    categories: ["Événements", "Marques"],
    type: "video",
    miniature: "assets/images/votre-miniature.jpg",
    src: "assets/videos/votre-video.mp4",
    client: "Nom du client"
}
```

### 4. Compléter les informations expériences

Dans `js/experiences-data.js`, ajoutez vos expériences supplémentaires ou éditez le HTML de `experiences.html` pour :

- Remplacer `[DATE À VÉRIFIER]` par les vraies dates
- Compléter les descriptions des postes encore vides
- Ajouter `[CRÉDITS À VÉRIFIER]` pour les collaborations

### 5. Mettre à jour les liens réseaux sociaux

Dans le footer de chaque page, remplacez les liens placeholder par vos vrais comptes :
- Instagram
- Facebook
- YouTube
- TikTok

### 6. Configurer le formulaire de contact

Le formulaire dans `contact.html` utilise Formspree ou EmailJS. Configurez l'un des deux (voir détails dans `CHAMPS_A_VERIFIER.md`).

## 🌐 Déploiement

### Option 1 : GitHub Pages (gratuit)

1. Pushez votre code sur GitHub :
```bash
git add .
git commit -m "feat: publication ready"
git push origin main
```

2. Allez sur GitHub → Settings → Pages
3. Activez GitHub Pages
4. Sélectionnez la branche `main`
5. Votre site sera disponible à `https://flex68016-del.github.io/akbdigital/`

### Option 2 : Netlify (gratuit)

1. Connectez-vous sur https://app.netlify.com
2. Cliquez sur "Add new site" → "Import from Git"
3. Connectez votre compte GitHub
4. Sélectionnez le dépôt `akbdigital`
5. Netlify déploiera automatiquement votre site

### Option 3 : Vercel (gratuit)

1. Installez Vercel CLI :
```bash
npm install -g vercel
```

2. Déployez :
```bash
vercel
```

## 🔍 SEO et Performance

Le site est optimisé pour :
- **SEO** : Métadonnées uniques par page, mots-clés ciblés (vidéaste Lomé, photographe Togo, etc.)
- **Performance** : Lazy loading, deferred scripts, optimisé pour 3G/4G
- **Accessibilité** : Navigation clavier, focus visible, WCAG AA, skip-link
- **Mots-clés ciblés** : vidéaste Lomé, photographe Lomé, monteur vidéo Togo, community manager Lomé, agence de communication Lomé

## ✅ Validation CSS

Le projet inclut un script de validation pour vérifier l'équilibre des accolades CSS :

```bash
node scripts/check-css.js
```

Ce script échouera si les accolades sont déséquilibrées, évitant les erreurs CSS en production.

## 📝 License

Ce projet est la propriété de ALY Koffi Brice. Tous droits réservés.

## 📧 Contact

Pour toute question ou collaboration, contactez :
- Email : koffibricealy@gmail.com
- WhatsApp : +228 93 39 53 77

## 📚 Documentation supplémentaire

Pour une liste détaillée de tous les champs à compléter, voir `CHAMPS_A_VERIFIER.md`.
