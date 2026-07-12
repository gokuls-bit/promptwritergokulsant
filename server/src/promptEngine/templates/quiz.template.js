export default {
  id: 'quiz',
  title: 'Quiz Generator',
  description: 'Generate practice quizzes to test your memory and study for tests.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'topic',
      label: 'Quiz Topic',
      type: 'text',
      placeholder: 'e.g., Water Cycle / Ancient Egypt / Fractions',
      required: true,
      minLength: 3,
      maxLength: 100,
      helpText: 'What topic should the quiz cover?'
    },
    {
      name: 'questionCount',
      label: 'Number of Questions',
      type: 'number',
      placeholder: 'e.g., 5',
      required: true,
      min: 3,
      max: 15,
      helpText: 'How many questions should the quiz have? (Min: 3, Max: 15)'
    },
    {
      name: 'difficulty',
      label: 'Difficulty level',
      type: 'chip',
      options: ['Easy (Concept recall)', 'Medium (Application)', 'Hard (Challenge questions)'],
      required: true,
      helpText: 'Choose the difficulty tier of the quiz questions.'
    },
    {
      name: 'questionType',
      label: 'Question Style',
      type: 'select',
      options: ['Multiple Choice (A, B, C, D)', 'True or False', 'Fill in the Blank', 'Mixed Questions'],
      required: true,
      helpText: 'What kind of questions should we generate?'
    }
  ],
  buildPrompt(inputs) {
    return `
You are a classroom teacher. Design a practice quiz.
TOPIC: ${inputs.topic}
QUESTIONS: ${inputs.questionCount}
DIFFICULTY: ${inputs.difficulty}
TYPE: ${inputs.questionType}

INSTRUCTIONS:
1. Generate exactly ${inputs.questionCount} questions matching the style: "${inputs.questionType}".
2. Set the reasoning level to: "${inputs.difficulty}".
3. Display the questions numbered in sequence. Do not print the answers directly next to them.
4. Place a clean "ANSWER KEY" section at the very bottom of the response, explaining the correct logic in 1 sentence.
`;
  }
};
