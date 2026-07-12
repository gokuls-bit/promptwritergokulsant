export default {
  id: 'quiz',
  title: 'Quiz Generator',
  description: 'Generate a practice quiz with a separate answer key to test yourself before the real exam.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'topic',
      label: 'Quiz Topic',
      type: 'text',
      placeholder: 'e.g., The Water Cycle / Fractions / The French Revolution',
      required: true,
      minLength: 3,
      maxLength: 100,
      helpText: 'What topic should the quiz cover?'
    },
    {
      name: 'questionCount',
      label: 'Number of Questions',
      type: 'number',
      placeholder: '5',
      required: true,
      min: 3,
      max: 15,
      helpText: 'How many questions? (Min: 3, Max: 15)'
    },
    {
      name: 'difficulty',
      label: 'Difficulty Level',
      type: 'chip',
      options: ['Easy (Concept recall)', 'Medium (Application)', 'Hard (Analysis & evaluation)'],
      required: true,
      helpText: 'Easy = remember facts, Medium = apply knowledge, Hard = think critically.'
    },
    {
      name: 'questionType',
      label: 'Question Style',
      type: 'select',
      options: ['Multiple Choice (A, B, C, D)', 'True or False', 'Short Answer (1-2 sentences)', 'Fill in the Blank', 'Mixed Question Types'],
      required: true,
      helpText: 'What format should the questions be in?'
    }
  ],

  buildPrompt(inputs) {
    const count = inputs.questionCount || 5;
    return `
You are an experienced teacher creating a practice quiz.

TOPIC: ${inputs.topic}
TOTAL QUESTIONS: ${count}
DIFFICULTY: ${inputs.difficulty}
QUESTION FORMAT: ${inputs.questionType}

SECTION 1 — QUIZ QUESTIONS
Generate exactly ${count} questions. Number them clearly (Q1, Q2, ...).

Formatting rules per type:
- Multiple Choice: List options as (A) (B) (C) (D) on separate lines. Make all 4 options plausible.
- True or False: State a clear proposition. Do not make it obviously one-sided.
- Short Answer: Ask a question that requires a 1-2 sentence response demonstrating understanding.
- Fill in the Blank: Use ________ for the blank. Ensure only one correct answer fits.
- Mixed: Distribute types roughly evenly across the ${count} questions.

Difficulty calibration for "${inputs.difficulty}":
- Easy: Direct recall of definitions, facts, or simple identification.
- Medium: Applying a concept to a new situation or explaining a process.
- Hard: Comparing, evaluating, or analysing relationships between concepts.

Do NOT print answers in this section.

---

SECTION 2 — ANSWER KEY
After a clear dividing line (---), list every answer with:
- Question number
- Correct answer
- One-sentence explanation of why it is correct

ADDITIONAL RULES:
- Questions must cover different aspects of the topic — do not repeat the same idea twice.
- Write in clear, unambiguous language.
- Avoid trick questions unless difficulty is "Hard".
`;
  }
};
