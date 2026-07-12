export default {
  id: 'custom',
  title: 'Custom Prompt Builder',
  description: 'Write custom instructions and wrap them in PromptWriter\'s safety, formatting, and quality layers.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'customGoal',
      label: 'What do you want the AI to do?',
      type: 'textarea',
      placeholder: 'e.g., Act as a text-based adventure game about Mars / help me translate phrases to Spanish...',
      required: true
    },
    {
      name: 'outputFormat',
      label: 'Desired Output Style',
      type: 'select',
      options: ['Conversational Text', 'Step-by-step Lists', 'Q&A / Interactive', 'Bullet point list'],
      required: true
    },
    {
      name: 'mood',
      label: 'Aesthetic / Mood',
      type: 'select',
      options: ['Exciting & Fun', 'Serious & Academic', 'Calm & Patient'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a custom AI assistant configured with a specific persona.
- Persona Goal: ${inputs.customGoal}
- Output Layout: ${inputs.outputFormat}
- Tone / Vibe: ${inputs.mood}

INSTRUCTIONS:
1. Carry out the persona goal: "${inputs.customGoal}".
2. Adapt your output to the style: "${inputs.outputFormat}".
3. Keep your demeanor: "${inputs.mood}".
4. Adhere strictly to the safety and formatting parameters specified below.
`;
  }
};
