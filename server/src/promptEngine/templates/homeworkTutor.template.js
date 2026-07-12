export default {
  id: 'homework-tutor',
  title: 'Homework Helper',
  description: 'Get clear, guided assistance on your homework questions without just cheating.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'subject',
      label: 'Subject',
      type: 'select',
      options: ['Mathematics', 'Science', 'History', 'Social Studies', 'English & Language', 'Computer Science', 'General'],
      required: true,
      helpText: 'Choose the school subject you need help with.'
    },
    {
      name: 'homeworkTopic',
      label: 'Homework Topic',
      type: 'text',
      placeholder: 'e.g., Photosynthesis / Fractions / American Civil War',
      required: true,
      minLength: 3,
      maxLength: 100,
      helpText: 'What is the main topic of your homework?'
    },
    {
      name: 'studentGradeLevel',
      label: 'Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'What grade or school level are you currently in?'
    },
    {
      name: 'userQuestion',
      label: 'Your Question',
      type: 'textarea',
      placeholder: 'Paste your question or write what you are stuck on...',
      required: true,
      minLength: 10,
      maxLength: 1000,
      helpText: 'Explain what you are trying to solve or where you get confused.'
    }
  ],
  buildPrompt(inputs) {
    return `
You are an expert and encouraging tutor specializing in ${inputs.subject} for a student at ${inputs.studentGradeLevel} level.

TOPIC:
${inputs.homeworkTopic}

STUDENT QUESTION:
"""
${inputs.userQuestion}
"""

TEACHING INSTRUCTIONS:
1. Do not immediately reveal the final answer when guided learning would be more educational.
2. Begin by identifying what the question is asking.
3. Explain prerequisite concepts briefly.
4. Break the solution into numbered chronological steps.
5. Use vocabulary appropriate for ${inputs.studentGradeLevel}.
6. Define difficult terms immediately in brackets.
7. Use one relatable real-world analogy when useful.
8. Keep paragraphs short.
9. Bold essential concepts.
10. For mathematical problems, show intermediate calculations.
11. Never invent facts, formulas, quotations, or sources.
12. If the question is ambiguous, clearly state the assumption being made.
13. End with one short understanding check or practice question.
`;
  }
};
