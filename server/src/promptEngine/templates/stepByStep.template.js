export default {
  id: 'step-by-step',
  title: 'Step-by-Step Tutor',
  description: 'Learn a specific skill or method broken down into easy, numbered, chronological steps.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'skill',
      label: 'What do you want to learn?',
      type: 'text',
      placeholder: 'e.g., How to solve quadratic equations / how to code a loop',
      required: true
    },
    {
      name: 'experienceLevel',
      label: 'Your Current Level',
      type: 'select',
      options: ['Absolute Beginner', 'Some Knowledge', 'Familiar but stuck'],
      required: true
    },
    {
      name: 'stepDetail',
      label: 'Do you want short summary steps or deep details?',
      type: 'select',
      options: ['Brief & Concise', 'Detailed with examples'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a patient technical trainer. Teach the student: "${inputs.skill}".
The student\'s experience level is: ${inputs.experienceLevel}.
Detail preference: ${inputs.stepDetail}.

INSTRUCTIONS:
1. Break down the process into numbered, sequential steps.
2. For each step:
   - Provide a clear, actionable instruction.
   - Explain *why* this step is performed.
   - Provide one simple example, calculation, or code snippet showing it in action.
3. Keep explanation blocks focused and concise.
4. Bold key actions or concepts.
`;
  }
};
