# Portfolio AKB - ALY Koffi Brice

Portfolio professionnel d'ALY Koffi Brice (AKB), vidéaste, photographe, monteur vidéo et Community Manager basé à Lomé, Togo.

## 🎯 À propos

ALY Koffi Brice, également connu sous le nom de AKB ou Mr Brice, est un créatif passionné par l'image et la communication digitale. Basé à Lomé, Togo, il offre ses services de production audiovisuelle et de gestion de communauté aux entreprises, marques et particuliers.

## 🌐 Coordonnées

- **Téléphone / WhatsApp** : +228 93 39 53 77
- **Email** : alykoffibrice00@gmail.com
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

## 📝 Personnalisation avant publication

### 1. Remplacer les médias

Les fichiers placeholder doivent être remplacés par vos vraies images et vidéos :

**Images à ajouter dans `assets/images/` :**
- `hero-poster.jpg` - Image de fond du hero (1200×630 minimum)
- `portrait-brice.jpg` - Photo de profil
- Images portfolio - Remplacer les placeholders `portfolio-X-placeholder.jpg`
- `favicon-32x32.png` - Favicon 32×32
- `favicon-16x16.png` - Favicon 16×16
- `apple-touch-icon.png` - Icon Apple Touch (180×180)

**Vidéo à ajouter dans `assets/videos/` :**
- `hero-showreel.mp4` - Vidéo de showreel du hero (boucle, muette)

### 2. Configurer le formulaire de contact

Le formulaire dans `contact.html` utilise soit Formspree soit EmailJS. Configurez l'un des deux :

**Option A : Formspree (plus simple)**
1. Créez un compte sur https://formspree.io
2. Créez un nouveau formulaire
3. Copiez votre Form ID
4. Dans `contact.html` ligne ~210, remplacez :
   ```javascript
   const FORMSPREE_ID = 'VOTRE_FORM_ID';
   ```
5. Décommentez le bloc Formspree (lignes ~230-247)

**Option B : EmailJS (plus de personnalisation)**
1. Créez un compte sur https://www.emailjs.com
2. Créez un Email Service (ex: Gmail)
3. Créez un Email Template avec les variables : `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`
4. Copiez vos identifiants
5. Dans `contact.html` lignes ~214-216, remplacez :
   ```javascript
   const EMAILJS_SERVICE_ID = 'VOTRE_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID';
   const EMAILJS_PUBLIC_KEY = 'VOTRE_PUBLIC_KEY';
   ```
6. Ajoutez le script EmailJS dans le `<head>` de toutes les pages :
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
7. Décommentez le bloc EmailJS (lignes ~249-262)

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

### 6. Champs [À VÉRIFIER] à compléter

**Dates d'expériences (`experiences.html`) :**
- Midzo Tech / Mayo App : [DATE À VÉRIFIER]
- Le Roi Lapin : [DATE À VÉRIFIER]
- Démarcation artisanale : [DATE À VÉRIFIER]
- Dunenyo Zan : [DATE À VÉRIFIER]
- ADN : [DATE À VÉRIFIER]
- AKB Communication : [DATE À VÉRIFIER]

**Crédits et mentions :**
- [CRÉDITS À VÉRIFIER] dans les projets portfolio
- [CRÉDITS À VÉRIFIER] dans les expériences

**Slogan agence (`akb-communication.html`) :**
- [SLOGAN À VALIDER] : Votre image, notre vision

**URL GitHub :**
- Vérifiez que `https://github.com/flex68016-del/akbdigital.git` est correct

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

## 📝 License

Ce projet est la propriété de ALY KKoffi Brice. Tous droits réservés.

## 📧 Contact

Pour toute question ou collaboration, contactez :
- Email : alykoffibrice00@gmail.com
- WhatsApp : +228 93 39 53 77
