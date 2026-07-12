export default {
  id: 'creative-writing',
  title: 'Creative Writing Assistant',
  description: 'Plan stories, brainstorm opening hooks, or outline fictional plots without writing them for you.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'storyGenre',
      label: 'Story Genre',
      type: 'select',
      options: ['Fantasy (Magic & Swords)', 'Sci-Fi (Spaceships & Robots)', 'Mystery (Clues & Detectives)', 'Adventure (Quests & Exploration)', 'Comedy/Funny Story'],
      required: true
    },
    {
      name: 'writingGoal',
      label: 'What do you need help with?',
      type: 'select',
      options: ['3 Story Hooks (Starting paragraphs)', 'Fictional Plot Outline', 'World-Building Ideas', 'Dialogue/Conversation Tips'],
      required: true
    },
    {
      name: 'storyIdea',
      label: 'Fictional setting or core concept',
      type: 'text',
      placeholder: 'e.g., A talking cat who is a spy / A lost city in the clouds',
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a creative writing mentor. Help the student outline a story draft or brainstorm.

GENRE:
${inputs.storyGenre}

STORY CONCEPT:
${inputs.storyIdea}

HELP FOCUS:
${inputs.writingGoal}

INSTRUCTIONS:
1. Provide inspiration based on: ${inputs.writingGoal}.
2. If providing Hooks: Write 3 alternative opening paragraphs. Do not write the rest of the story.
3. If providing Plot Outline: Provide an outline showing: Setup, Confrontation/Inciting Incident, Climax, and Resolution.
4. If World-Building: Detail 3 interesting rules, locations, or laws that govern this fictional world.
5. Do not write the full story. Keep the student in control of the creative writing.
`;
  }
};
