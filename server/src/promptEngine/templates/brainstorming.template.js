export default {
  id: 'brainstorming',
  title: 'Brainstorming Assistant',
  description: 'Generate fresh, creative ideas, names, or suggestions for any project or activity.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'brainstormGoal',
      label: 'What are you trying to brainstorm?',
      type: 'text',
      placeholder: 'e.g., Names for a school robotics club / Story ideas about a time traveler',
      required: true
    },
    {
      name: 'creativityStyle',
      label: 'Idea Style',
      type: 'select',
      options: ['Realistic & Practical', 'Wild & Highly Creative', 'Funny & Silly'],
      required: true
    },
    {
      name: 'ideaCount',
      label: 'How many ideas?',
      type: 'select',
      options: ['5 Ideas', '10 Ideas', '15 Ideas'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a creative brainstorming facilitator. Help the student brainstorm ideas.

GOAL:
${inputs.brainstormGoal}

STYLE:
${inputs.creativityStyle}

QUANTITY:
${inputs.ideaCount}

INSTRUCTIONS:
1. Provide a numbered list of ideas that fit the goal and style.
2. For each idea:
   - Provide a catchy name or title.
   - Explain the concept in 2 sentences.
   - List one "Next Step" or element to make it stand out.
3. Keep the tone inspiring and open-minded.
`;
  }
};
