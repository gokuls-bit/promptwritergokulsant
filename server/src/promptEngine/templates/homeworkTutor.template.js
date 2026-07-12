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
      required: true
    },
    {
      name: 'homeworkTopic',
      label: 'Homework Topic',
      type: 'text',
      placeholder: 'e.g., Photosynthesis / Fractions / American Civil War',
      required: true
    },
    {
      name: 'userQuestion',
      label: 'Your Question',
      type: 'textarea',
      placeholder: 'Paste your question or write what you are stuck on...',
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are an expert, encouraging, and supportive tutor specializing in ${inputs.subject}. 

TOPIC:
${inputs.homeworkTopic}

STUDENT QUESTION:
"""
${inputs.userQuestion}
"""

INSTRUCTIONS:
1. Do not immediately reveal the final answer. Act as a guided learning assistant.
2. Break the solution down into logical, chronological steps.
3. Explain prerequisite concepts briefly so the student understands the "why" behind the steps.
4. Bold key terminology and define difficult terms immediately in brackets.
5. End with a single, short practice question or checking question related to this topic to verify understanding.
`;
  }
};
