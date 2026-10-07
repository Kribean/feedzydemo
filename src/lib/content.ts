// Tous les textes de la démo sont centralisés ici pour pouvoir les ajuster facilement.

export const BUSINESS = {
  name: "CleanEasy",
  tagline: "NETTOYAGE PROFESSIONNEL",
  category: "Service de nettoyage",
  address: "Paris 11e",
  website: "cleaneasy.fr",
};

export const CUSTOMER = {
  firstName: "Marie",
  fullName: "Marie Dupont",
  initials: "MD",
};

export const REVIEW_LINK = "https://feedzy-hub.com/r/cleaneasy";

export const WHATSAPP_MESSAGE = `Bonjour ${CUSTOMER.firstName} 👋

Merci d'être passée chez ${BUSINESS.name} ! Pour continuer à renforcer la qualité de nos services, nous avons besoin de vous 🙏

Laissez-nous un avis en 30 secondes via ce lien :`;

// Ce que le client « dit » au micro (affiché comme transcription en direct).
export const RAW_TRANSCRIPT =
  "Alors… bah franchement j'ai trouvé ça super. Ils sont venus faire le ménage de mon appart après mon déménagement, euh, ils étaient pile à l'heure, super sympas, et c'était vraiment nickel partout, même les vitres. Et en plus le prix était correct. Je recommande à cent pour cent !";

// L'avis rédigé par « l'IA ».
export const GENERATED_REVIEW = `Excellent service du début à la fin ! L'équipe ${BUSINESS.name} est intervenue pour le nettoyage de mon appartement après mon déménagement : ponctuelle, très sympathique et d'un grand professionnalisme.

Le résultat est impeccable, tout était parfaitement propre, jusqu'aux vitres. Et le rapport qualité-prix est excellent.

Je recommande ${BUSINESS.name} sans hésitation !`;

export const TRUSTPILOT_TITLE = "Un service impeccable, je recommande !";

export type ExistingReview = {
  name: string;
  initials: string;
  color: string;
  rating: number;
  when: string;
  text: string;
};

export const GOOGLE_REVIEWS: ExistingReview[] = [
  {
    name: "Thomas Lefèvre",
    initials: "T",
    color: "#7b1fa2",
    rating: 5,
    when: "il y a 2 semaines",
    text: "Très bonne équipe, réactive et efficace. Bureaux nickel tous les lundis matin.",
  },
  {
    name: "Sophie Martin",
    initials: "S",
    color: "#00897b",
    rating: 5,
    when: "il y a 1 mois",
    text: "Intervention rapide pour une fin de bail, l'état des lieux s'est très bien passé grâce à eux.",
  },
  {
    name: "Karim B.",
    initials: "K",
    color: "#e64a19",
    rating: 4,
    when: "il y a 2 mois",
    text: "Bon travail, petit retard à l'arrivée mais résultat au top.",
  },
];

export const TRUSTPILOT_REVIEWS: ExistingReview[] = [
  {
    name: "Julien R.",
    initials: "JR",
    color: "#dcdce6",
    rating: 5,
    when: "Il y a 5 jours",
    text: "Personnel souriant et travail minutieux. Je fais appel à eux tous les mois.",
  },
  {
    name: "Claire V.",
    initials: "CV",
    color: "#dcdce6",
    rating: 4,
    when: "Il y a 3 semaines",
    text: "Bonne prestation dans l'ensemble, prise de rendez-vous très simple.",
  },
];
