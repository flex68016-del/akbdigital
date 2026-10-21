# Portfolio AKB - ALY Koffi Brice

Site portfolio professionnel pour ALY Koffi Brice (AKB / Mr Brice), vidéaste, photographe, monteur vidéo et Community Manager basé à Lomé, Togo.

## 📋 Description

Ce site présente :
- L'identité et le parcours d'ALY Koffi Brice
- Les meilleures réalisations photo et vidéo
- Les services proposés (vidéo, photo, montage, community management)
- Les expériences professionnelles
- L'agence AKB Communication (distincte du portfolio personnel)
- Un formulaire de contact pour les demandes de devis

## 🎨 Design

- **Style** : Cinématographique, moderne et premium
- **Ambiance** : Ciel de nuit (bleu nuit profond avec dégradés bleu électrique vers bleu ciel)
- **Typographie** : Syne (titres) + Inter (texte)
- **Animations** : GSAP avec ScrollTrigger, Lenis (smooth scroll), SplitType

## 🏗️ Structure

```
portfolio/
├── index.html              # Page d'accueil
├── a-propos.html           # À propos
├── services.html           # Services
├── portfolio.html          # Portfolio
├── experiences.html        # Expériences
├── akb-communication.html  # Page agence
├── contact.html            # Contact
├── css/
│   ├── style.css          # Styles principaux
│   └── animations.css     # Animations CSS
├── js/
│   ├── main.js            # JavaScript principal
│   └── animations.js      # Animations GSAP
├── assets/
│   ├── images/            # Images (placeholders)
│   └── videos/            # Vidéos (placeholders)
└── README.md
```

## 🛠️ Technologies

- **HTML5** : Structure sémantique
- **CSS3** : Variables CSS, BEM, responsive design
- **JavaScript ES6+** : Vanilla JS
- **Librairies (CDN)** :
  - GSAP 3.12.2 (animations)
  - GSAP ScrollTrigger (scroll-based animations)
  - GSAP Flip (layout transitions)
  - Lenis 1.0.29 (smooth scroll)
  - SplitType (text splitting)

## 📱 Responsive

Le site est entièrement responsive et s'adapte à tous les écrans :
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## ♿ Accessibilité

- Navigation au clavier fonctionnelle
- Focus visible sur les éléments interactifs
- Respect de `prefers-reduced-motion`
- Balises sémantiques HTML5
- Attributs ARIA appropriés
- Alt text sur les images

## 🚀 Installation

1. Cloner le dépôt
2. Ouvrir `index.html` dans un navigateur
3. Les librairies sont chargées via CDN, pas besoin de npm

## 📝 Personnalisation

### Remplacer les placeholders

Les images et vidéos actuelles sont des placeholders. Remplacez-les par vos propres fichiers dans `assets/images/` et `assets/videos/`.

### Contenu à compléter

Certains contenus sont marqués `[À VÉRIFIER]` ou `[À COMPLÉTER]` :
- Noms de projets dans le portfolio
- Dates et durées dans les expériences
- Détails des expériences précédentes
- Liens vers les réseaux sociaux

### Formulaire de contact

Le formulaire est un placeholder. Connectez-le à :
- Formspree (https://formspree.io)
- EmailJS (https://www.emailjs.com)
- Un backend personnalisé

## 🎨 Palette de couleurs

```css
--bg: #050B1A          /* Fond principal */
--bg-2: #0B1630        /* Fond secondaire */
--text: #F4F8FF        /* Texte */
--blue: #1E6BFF        /* Bleu électrique */
--sky: #4DB8FF         /* Bleu ciel (accent) */
--sky-light: #A8DEFF   /* Ciel clair */
--muted: #8FA3BF       /* Texte secondaire */
--rec: #FF3B3B         /* Point REC */
```

## 📞 Contact

- **Tél/WhatsApp** : +228 93 39 53 77
- **Email** : alykoffibrice00@gmail.com
- **Localisation** : Lomé, Togo

## 📄 Licence

Tous droits réservés © ALY Koffi Brice
