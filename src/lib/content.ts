// Tous les textes de la démo sont centralisés ici pour pouvoir les ajuster facilement.

export const BUSINESS = {
  name: "Marathon de Paris",
  initials: "MP",
  tagline: "COURSE À PIED",
};

export const CUSTOMER = {
  firstName: "Marie",
};

// Texte du lien cliquable affiché à la fin du message WhatsApp (à la place de l'URL brute).
export const REVIEW_LINK_LABEL = "Laisser mon avis";

export const WHATSAPP_MESSAGE = `Bonjour ${CUSTOMER.firstName} 👋

Bravo pour votre participation au ${BUSINESS.name} ! 🏅

Racontez-nous votre course en 30 secondes :`;

// Questions posées au participant, dans l'ordre. `answer` est ce qu'il « dit » au micro
// (affiché comme transcription en direct).
export const QUESTIONS = [
  {
    text: "Quelle animation vous a vraiment donné un coup de boost, au village ou pendant la course, et à quel endroit ou quel kilomètre ?",
    answer:
      "Alors au trentième kilomètre, la batucada sous le tunnel, franchement ça m'a reboostée ! Et au village, l'échauffement collectif en musique avant le départ, c'était top.",
  },
  {
    text: "Quelle marque présente sur l’événement avez-vous retenue, et avez-vous fait quelque chose avec elle, comme tester un produit ?",
    answer:
      "J'ai retenu Hydrafit. J'ai testé leur boisson de récupération à l'arrivée, et au village j'ai fait l'analyse de foulée sur leur stand.",
  },
  {
    text: "Reviendrez-vous l’an prochain ? Et si vous ne pouviez changer qu’une seule chose, ce serait laquelle ?",
    answer:
      "Oui, je reviens l'an prochain, c'est sûr ! Si je pouvais changer une seule chose, ce serait plus de points d'eau sur la deuxième moitié du parcours.",
  },
];

// L'avis rédigé par « l'IA » à partir des réponses.
export const GENERATED_REVIEW = `Une expérience incroyable sur le ${BUSINESS.name} ! Au 30e kilomètre, la batucada sous le tunnel m'a donné un vrai coup de boost, et l'échauffement collectif en musique au village a lancé la journée dans une super ambiance.

Côté partenaires, j'ai retenu Hydrafit : j'ai testé leur boisson de récupération à l'arrivée et fait une analyse de foulée sur leur stand.

Je reviendrai l'an prochain sans hésiter ! Seule suggestion : ajouter quelques points d'eau sur la seconde moitié du parcours.`;
