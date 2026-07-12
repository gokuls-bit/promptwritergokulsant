export default {
  id: 'explain-simply',
  title: 'Explain It Simply',
  description: 'Explain a complex concept using a fun, simple analogy (like video games, cooking, or sports).',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'concept',
      label: 'Concept to Explain',
      type: 'text',
      placeholder: 'e.g., Quantum physics, inflation, photosynthesis, binary code',
      required: true
    },
    {
      name: 'analogyTheme',
      label: 'Choose an Analogy Theme',
      type: 'select',
      options: ['Video Games', 'Cooking/Food', 'Sports', 'Animals/Nature', 'Superheroes', 'Amusement Parks'],
      required: true
    },
    {
      name: 'additionalDetails',
      label: 'Any specific questions or points? (Optional)',
      type: 'text',
      placeholder: 'e.g., Explain why it is important',
      required: false
    }
  ],
  buildPrompt(inputs) {
    const concept = inputs.concept;
    const theme = inputs.analogyTheme;
    const details = inputs.additionalDetails ? `\nFocus specifically on: ${inputs.additionalDetails}` : '';

    return `
You are a creative educator who specializes in explaining difficult things in the simplest way possible.

CONCEPT:
${concept}
${details}

INSTRUCTIONS:
1. Explain this concept using a central, extended analogy based on the theme of "${theme}". For example, if the theme is "Video Games", explain the concept as if it were a leveling system, game mechanics, or a quest.
2. Break the explanation into:
   - "The Big Picture" (One sentence summary)
   - "The Analogy" (Explain step-by-step using the chosen theme)
   - "Why it Matters" (The practical real-world significance)
3. Keep the language very engaging, simple, and clear.
4. Bold key terms and provide definitions.
`;
  }
};
