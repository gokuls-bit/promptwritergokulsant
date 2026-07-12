export default {
  id: 'flashcards',
  title: 'Flashcard Generator',
  description: 'Create a set of study flashcards with questions on the front and clear answers on the back.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'topic',
      label: 'Topic or Chapter',
      type: 'text',
      placeholder: 'e.g., Periodic Table Elements / Python Functions / Civil Rights Movement',
      required: true,
      minLength: 3,
      maxLength: 100,
      helpText: 'What topic should the flashcards cover?'
    },
    {
      name: 'cardCount',
      label: 'Number of Cards',
      type: 'number',
      placeholder: '10',
      required: true,
      min: 5,
      max: 20,
      helpText: 'How many flashcards? (Min: 5, Max: 20)'
    },
    {
      name: 'gradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Controls the vocabulary level of the answers.'
    },
    {
      name: 'focusArea',
      label: 'What to Focus On',
      type: 'chip',
      options: ['Key Definitions', 'Formulas & Facts', 'People & Dates', 'Processes & Steps', 'Mixed Coverage'],
      required: true,
      helpText: 'What aspect of the topic should the cards test?'
    }
  ],

  buildPrompt(inputs) {
    const count = inputs.cardCount || 10;
    return `
You are a learning specialist creating study flashcards for a ${inputs.gradeLevel} student.

TOPIC: ${inputs.topic}
NUMBER OF CARDS: ${count}
FOCUS: ${inputs.focusArea}

Generate exactly ${count} flashcards using this strict format for every card:

---
**Card [N]**
🔷 FRONT: [A clear, precise question or prompt]
🔶 BACK: [A concise, correct answer — 1-3 sentences maximum]
---

RULES FOR CARD QUALITY:
1. Every front must be a clear question or fill-in-the-blank prompt — not a statement.
2. Every back must directly and completely answer the front in 1-3 sentences maximum.
3. Backs must use vocabulary appropriate for a ${inputs.gradeLevel} student.
4. Cards must cover different aspects of "${inputs.topic}" — no repetition.
5. Focus "${inputs.focusArea}":
   - Key Definitions: front asks "What is X?", back defines it plainly.
   - Formulas & Facts: front shows context or asks for formula, back states it with units.
   - People & Dates: front asks who/when, back gives name + one-sentence significance.
   - Processes & Steps: front asks "What are the steps of X?", back gives numbered steps.
   - Mixed Coverage: distribute evenly across all types above.
6. Do not include trick cards or ambiguous questions.
7. Do not duplicate information from one card to another.
`;
  }
};
