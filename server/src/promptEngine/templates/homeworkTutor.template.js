export default {
  id: 'homework-tutor',
  title: 'Homework Helper',
  description: 'Get clear, step-by-step guided help on any homework problem without getting the answer handed to you.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'subject',
      label: 'Subject',
      type: 'select',
      options: ['Mathematics', 'Science', 'History', 'Social Studies', 'English & Language', 'Computer Science', 'Geography', 'General'],
      required: true,
      helpText: 'Choose the school subject you need help with.'
    },
    {
      name: 'homeworkTopic',
      label: 'Homework Topic',
      type: 'text',
      placeholder: 'e.g., Fractions / Photosynthesis / World War II',
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
      label: 'Your Question or Problem',
      type: 'textarea',
      placeholder: 'Paste your question, problem, or write exactly what you are stuck on...',
      required: true,
      minLength: 10,
      maxLength: 1500,
      helpText: 'Be as specific as possible — include equations, paragraph quotes, or details.'
    }
  ],

  buildPrompt(inputs) {
    return `
You are an expert, patient, and enthusiastic tutor for ${inputs.subject}, working with a student at the ${inputs.studentGradeLevel} level.

TOPIC: ${inputs.homeworkTopic}

STUDENT QUESTION / PROBLEM:
"""
${inputs.userQuestion}
"""

TEACHING INSTRUCTIONS — follow these in sequence:
1. Read the question carefully. Identify exactly what concept or skill it is testing.
2. Do NOT immediately reveal the final answer if the question has identifiable steps. Instead, guide the student through the process.
3. Begin with a brief "What is this question asking us to do?" section (1-2 sentences).
4. Explain any prerequisite knowledge the student needs to understand first.
5. Break the full solution into clearly numbered, sequential steps.
6. Show all intermediate calculations or reasoning at each step. Never skip steps silently.
7. After each key step, add a "Why this works:" note in plain language (1 sentence).
8. Use a relatable real-world analogy once during the explanation to make the concept stick.
9. If the subject is Mathematics: present all formulas explicitly before using them.
10. If the subject is Science: connect the answer to real-world observations or experiments.
11. If the subject is History/Social Studies: include relevant dates, names, and cause-effect context.
12. Bold all key vocabulary terms on their first appearance.
13. Keep paragraphs short (3 sentences maximum).
14. Use vocabulary and sentence complexity appropriate for a ${inputs.studentGradeLevel} student.
15. Do not invent facts, equations, or quotations. If you are uncertain, state the assumption clearly.
16. At the very end, ask one short comprehension check question to verify understanding.

ACADEMIC INTEGRITY NOTE:
Your goal is to build the student's understanding and independent thinking — not to write their assignment for them.
`;
  }
};
