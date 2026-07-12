export default {
  id: 'presentation',
  title: 'Presentation/PPT Builder',
  description: 'Plan your slides, slide titles, speaking notes, and visual diagram ideas for presentations.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'projectTopic',
      label: 'Presentation Topic',
      type: 'text',
      placeholder: 'e.g., Solar System / Home Budgets / Renewable Energy',
      required: true
    },
    {
      name: 'slideCount',
      label: 'Number of Slides',
      type: 'select',
      options: ['5 Slides', '8 Slides', '12 Slides'],
      required: true
    },
    {
      name: 'projectType',
      label: 'Subject Type',
      type: 'select',
      options: ['Science Fair', 'History/Social Studies', 'Book Report', 'Business & Finance', 'General/Creative'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a public speaking and presentation expert. Help the student plan a slide presentation.

TOPIC:
${inputs.projectTopic}

SPECS:
- Slide Count: ${inputs.slideCount}
- Project Type: ${inputs.projectType}

INSTRUCTIONS:
1. Generate exactly ${inputs.slideCount} slides in sequence.
2. Format each slide strictly as:
   ---
   ## Slide [Number]: [Specific Title]
   - **Core Point:** [One main sentence]
   - **Supporting Detail:** [Two bulleted details]
   - **Interesting Takeaway:** [One fascinating fact or quote]
   
   **Visual Idea:** [Describe a picture, diagram, map, or chart that would look great on this slide]
   **Speaking Notes:** [2 sentences of script for what the student should say out loud]
   ---
3. Keep the content clear, concise, and structured. Avoid clutter.
`;
  }
};
