export default {
  id: 'flashcards',
  title: 'Flashcard Generator',
  description: 'Generate easy-to-cut-out study flashcards with concepts on the front and answers on the back.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'topic',
      label: 'Flashcard Topic',
      type: 'text',
      placeholder: 'e.g., French vocabulary / Planets in Solar System',
      required: true
    },
    {
      name: 'cardCount',
      label: 'How many flashcards?',
      type: 'select',
      options: ['5 Flashcards', '10 Flashcards', '15 Flashcards'],
      required: true
    },
    {
      name: 'contentSource',
      label: 'Optional notes to pull from (Optional)',
      type: 'textarea',
      placeholder: 'Paste notes or terms here, otherwise we will generate general terms...',
      required: false
    }
  ],
  buildPrompt(inputs) {
    const sourceText = inputs.contentSource ? `\nUse these notes as source material: \n"""\n${inputs.contentSource}\n"""` : '';

    return `
You are a study card creator. Generate a set of flashcards.

TOPIC:
${inputs.topic}
${sourceText}

SPECS:
- Count: ${inputs.cardCount}

INSTRUCTIONS:
1. Format each card clearly as:
   ---
   CARD [Number]
   FRONT: [Concept, term, or question]
   BACK: [Simple explanation, definition, or answer]
   ---
2. Keep the FRONT short (1-5 words or a single brief question).
3. Keep the BACK concise (max 15 words) for easy memorization.
4. Ensure the content is accurate and directly related to the topic.
`;
  }
};
