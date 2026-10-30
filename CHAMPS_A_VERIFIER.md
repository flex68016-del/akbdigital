# Champs [À VÉRIFIER] à compléter avant publication

Ce document liste tous les éléments manquants ou à compléter dans le projet avant la publication en production.

---

## 📊 Résumé rapide

| Élément | État | Quantité |
|---------|------|----------|
| Images placeholders | ⚠️ À remplacer | 11 fichiers |
| Vidéo hero | ❌ Manquante | 1 fichier |
| Favicon | ❌ Manquants | 3 fichiers |
| Dates expériences | ⚠️ À vérifier | 6 dates |
| Crédits | ⚠️ À compléter | Plusieurs |
| Portfolio data | ⚠️ Placeholders | 12 projets |
| Liens sociaux | ⚠️ Placeholders | 4 liens |
| Slogan agence | ⚠️ À valider | 1 slogan |
| URL domaine | ⚠️ À remplacer | 8 fichiers |
| Formulaire contact | ⚠️ À configurer | 1 service |

---

## 🖼️ Images à remplacer (11 fichiers)

**Actuels dans `assets/images/` :**

| Fichier | État | Action |
|---------|------|--------|
| `hero-poster.jpg` | ✅ Présent | Vérifier qualité (1200×630) |
| `portrait-brice.jpg` | ✅ Présent | Vérifier qualité |
| `hero-placeholder.jpg` | ⚠️ Placeholder | Remplacer par vraie image |
| `about-placeholder.jpg` | ⚠️ Placeholder | Remplacer par vraie image |
| `bio-placeholder.jpg` | ⚠️ Placeholder | Remplacer par vraie image |
| `agency-placeholder.jpg` | ⚠️ Placeholder | Remplacer par vraie image |
| `portfolio-1-placeholder.jpg` | ⚠️ Placeholder | Remplacer par vraie image |
| `portfolio-2-placeholder.jpg` | ⚠️ Placeholder | Remplacer par vraie image |
| `portfolio-3-placeholder.jpg` | ⚠️ Placeholder | Remplacer par vraie image |
| `portfolio-4-placeholder.jpg` | ⚠️ Placeholder | Remplacer par vraie image |
| `portfolio-5-placeholder.jpg` | ⚠️ Placeholder | Remplacer par vraie image |
| `portfolio-6-placeholder.jpg` | ⚠️ Placeholder | Remplacer par vraie image |

**Dimensions recommandées :**
- Hero poster : 1200×630 minimum (pour Open Graph)
- Portfolio thumbnails : 800×600 (4:3) ou 1200×675 (16:9)
- Portrait : 400×400 minimum (carré)

---

## 🎬 Vidéos à ajouter (1 fichier)

**Dossier `assets/videos/` :**

| Fichier | État | Spécifications |
|---------|------|----------------|
| `hero-showreel.mp4` | ❌ Manquant | Boucle, muette, 10-30s, 1920×1080, WebM ou MP4 H.264 |

---

## 🔣 Favicon à créer (3 fichiers)

**Dossier `assets/icons/` :**

| Fichier | État | Dimensions |
|---------|------|-----------|
| `favicon-32x32.png` | ❌ Manquant | 32×32 |
| `favicon-16x16.png` | ❌ Manquant | 16×16 |
| `apple-touch-icon.png` | ❌ Manquant | 180×180 |

**Outil recommandé :** https://realfavicongenerator.net/

---

## 📅 Dates d'expériences (6 dates)

**Dans `experiences.html` et `js/experiences-data.js` :**

| Expérience | Date actuelle | Action |
|------------|--------------|--------|
| Midzo Tech / Mayo App | `[DATE À VÉRIFIER]` | Remplacer par vraie date |
| Le Roi Lapin | `[DATE À VÉRIFIER]` | Remplacer par vraie date |
| Démarcation artisanale | `[DATE À VÉRIFIER]` | Remplacer par vraie date |
| Dunenyo Zan | `[DATE À VÉRIFIER]` | Remplacer par vraie date |
| ADN | `[DATE À VÉRIFIER]` | Remplacer par vraie date |
| AKB Communication | `[DATE À VÉRIFIER]` | Remplacer par vraie date |

---

## 📝 Crédits et descriptions

**À compléter dans `experiences.html` :**
- `[CRÉDITS À VÉRIFIER]` pour chaque expérience
- Descriptions détaillées pour les projets marqués `[À COMPLÉTER]`

**Dans `js/portfolio-data.js` :**
- Remplacer les 12 projets placeholders par vos vraies réalisations
- Chaque projet doit avoir : id, titre, catégories, type, miniature, src, client

---

## 🔗 Liens réseaux sociaux (4 liens)

**Dans le footer de chaque page :**

| Réseau | Lien actuel | Action |
|--------|-------------|--------|
| Instagram | `#` | Remplacer par votre lien |
| Facebook | `#` | Remplacer par votre lien |
| YouTube | `#` | Remplacer par votre lien |
| TikTok | `#` | Remplacer par votre lien |

---

## 📢 Slogan agence

**Dans `akb-communication.html` :**
- `[SLOGAN À VALIDER]` - Actuellement "Votre image, notre vision."
- Action : Confirmer ou changer ce slogan

---

## 🌐 URL de domaine (8 fichiers)

**Dans les métadonnées SEO de chaque page :**

| Fichier | URL actuelle | Action |
|---------|--------------|--------|
| index.html | `https://akbdigital.com/` | Remplacer par vrai domaine |
| a-propos.html | `https://akbdigital.com/a-propos.html` | Remplacer par vrai domaine |
| services.html | `https://akbdigital.com/services.html` | Remplacer par vrai domaine |
| portfolio.html | `https://akbdigital.com/portfolio.html` | Remplacer par vrai domaine |
| experiences.html | `https://akbdigital.com/experiences.html` | Remplacer par vrai domaine |
| akb-communication.html | `https://akbdigital.com/akb-communication.html` | Remplacer par vrai domaine |
| contact.html | `https://akbdigital.com/contact.html` | Remplacer par vrai domaine |
| sitemap.xml | `https://akbdigital.com/` | Remplacer par vrai domaine |

---

## 📧 Configuration formulaire de contact

**Dans `contact.html` :**

Le formulaire utilise déjà **Web3Form** avec l'access key configurée.

**Action requise :**
- Vérifier que vous recevez les emails sur : koffibricealy@gmail.com
- Si l'access key doit être changée, la modifier dans `contact.html` (ligne ~271)

**Comment fonctionne Web3Form :**
- Gratuit et simple à utiliser
- Les messages arrivent directement sur votre email
- Pas besoin de configuration supplémentaire
- Anti-spam intégré

---

## ✅ Checklist avant publication

- [ ] Toutes les 11 images placeholders remplacées
- [ ] Vidéo hero-showreel.mp4 ajoutée
- [ ] 3 fichiers favicon créés
- [ ] Toutes les 6 dates d'expériences remplies
- [ ] Tous les crédits ajoutés
- [ ] Descriptions complétées
- [ ] 12 projets portfolio remplacés par vrais projets
- [ ] 4 liens réseaux sociaux remplacés
- [ ] Slogan agence validé
- [ ] URL de domaine remplacée dans les 8 fichiers
- [ ] Formulaire de contact configuré (Formspree ou EmailJS)
- [ ] Vérification du site sur mobile (360, 768 px)
- [ ] Vérification du site sur desktop (1024, 1280, 1440, 1920 px)
- [ ] Test du formulaire de contact
- [ ] Test de tous les liens internes
- [ ] Validation CSS : `node scripts/check-css.js`
- [ ] Hard refresh sur navigateur pour vérifier cache

---

## 📚 Notes supplémentaires

**Email actuel :** koffibricealy@gmail.com (à vérifier si correct)

**GitHub :** https://github.com/flex68016-del/akbdigital.git (à vérifier si correct)

**Vercel :** Site déployé sur https://akbdigital.vercel.app/ (à remplacer par vrai domaine)
