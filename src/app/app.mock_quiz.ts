import { Quiz } from './quiz';

export const QUIZ: Quiz [] = [
{
      id: 1,
      question: "Plusieurs réponses possibles : que signifie le mot quiz?",
      answers: ["colle", "banane", "couscous", "oral"],
      win: ["true", "false", "false", "true"]

  },
  {
      id: 2,
      question: "Une réponse possible : La baleine bleue est le mamifère avec le plus gros coeur. Quel est son poid maximal ?",
      answers: ["6 tonnes", "60 kg", "600 kg", "100 kg"],
      win: ["false", "false", "true", "false"]

  },
  {
      id: 3,
      question: "Une réponse possible : Quelle est la capital de l'Ouganda ?",
      answers: ["Ketala", "Kampala", "Paris", "Kitala"],
      win: ["false", "true", "false", "false"]

  },
  {
      id: 4,
      question: "Une réponse possible : Combien de langues y a t-il dans le monde ?",
      answers: ["entre 500 et 1500", "entre 1500 et 3000", "entre 3OOO et 7000", "plus de 7000"],
      win: ["false", "false", "true", "false"]

  },
  {
      id: 5,
      question: "Plusieurs réponses possibles. Attention aux pièges : Qu'est-ce qui est vrai pour le Koala ?",
      answers: ["Le mâle est deux fois plus gros que la femelle", "Il parcourt 100 mètres par jour", "On le trouve en Tasmanie", "Il aime l'eucalyptus"],
      win: ["true", "true", "true", "true"]

  },
  {
      id: 6,
      question: "Une réponse possible. Combien de temps la guerre de cent ans a t-elle durée?",
      answers: ["100 ans", "plus de cent", "moins de cent ans", "aucune de ces réponses"],
      win: ["false", "true", "false", "false"]

  },
  {
      id: 7,
      question: "Une réponse possible. Quel est le plus grand pays au monde?",
      answers: ["l'australie", "l'alaska", "la Chine", "la russie"],
      win: ["false", "false", "false", "true"]

  },
  {
      id: 8,
      question: "Combien de rois la France a t'elle compté?",
      answers: ["38", "48", "58", "68"],
      win: ["false", "false", "false", "true"]

  },
  {
      id: 9,
      question: "Quel film n'a pas été réalisé par GUillermo del Toro?",
      answers: ["The Haunted Mansion", "Pacific Rim", "La désolation de Smaug et le Hobbit", "L'échine du diable"],
      win: ["false", "false", "true", "false"]

  },
  {
      id: 10,
      question: "Quel est l'intru dans les personnages de Game of Thrones?",
      answers: ["Missandei", "Meric", "Tomund", "Vère"],
      win: ["false", "true", "false", "false"]

  }
];
