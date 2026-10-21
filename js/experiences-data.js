// Données des expériences et projets supplémentaires
// Ajoutez de nouveaux projets ici pour les inclure dynamiquement dans la page expériences

const experiencesData = [
    {
        id: 7,
        client: "Nom du client",
        role: "Rôle dans le projet",
        subtitle: "Nom du projet",
        description: "Description détaillée du projet et des responsabilités.",
        tags: ["Vidéo", "Photo", "Montage", "CM"],
        date: "[DATE À VÉRIFIER]",
        credits: "[CRÉDITS À VÉRIFIER]",
        gallery: [
            "assets/images/placeholder-4-3.svg",
            "assets/images/placeholder-1-1.svg",
            "assets/images/placeholder-16-9.svg"
        ]
    }
];

// Exporter les données pour utilisation dans animations.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = experiencesData;
}
