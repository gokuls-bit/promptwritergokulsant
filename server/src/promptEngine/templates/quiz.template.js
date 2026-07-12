export default {
  id: 'quiz',
  title: 'Quiz Generator',
  description: 'Generate practice quizzes to test your memory and study for tests.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'quizTopic',
      label: 'Topic of the Quiz',
      type: 'text',
      placeholder: 'e.g., Photosynthesis / Ancient Egypt / Fractions',
      required: true
    },
    {
      name: 'questionCount',
      label: 'Number of Questions',
      type: 'select',
      options: ['3 Questions', '5 Questions', '10 Questions'],
      required: true
    },
    {
      name: 'quizType',
      label: 'Question Type',
      type: 'select',
      options: ['Multiple Choice (A, B, C, D)', 'True or False', 'Fill in the Blank', 'Mixed Quiz'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a classroom teacher. Design a study quiz for a student.

TOPIC:
${inputs.quizTopic}

QUIZ SPECS:
- Total Questions: ${inputs.questionCount}
- Question Type: ${inputs.quizType}

INSTRUCTIONS:
1. Generate the questions and display them clearly with numbers.
2. For multiple choice questions, provide 4 options (A, B, C, D).
3. Do not display the answers immediately next to the questions.
4. Place a clear "ANSWER KEY" section at the very bottom of the response.
5. In the Answer Key, explain *why* the correct answer is right in one simple sentence.
`;
  }
};
