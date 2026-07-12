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
      placeholder: 'e.g., Renewable Energy / Home Budgets / Space Exploration',
      required: true,
      minLength: 3,
      maxLength: 100,
      helpText: 'What is the subject of your slide deck?'
    },
    {
      name: 'slideCount',
      label: 'Number of Slides',
      type: 'number',
      placeholder: 'e.g., 10',
      required: true,
      min: 3,
      max: 20,
      helpText: 'How many slides should the presentation contain? (Min: 3, Max: 20)'
    },
    {
      name: 'projectType',
      label: 'Presentation Type',
      type: 'select',
      options: ['Science Fair Report', 'History Biography', 'Book Review & Analysis', 'Business & Personal Finance', 'Creative Story Showcase'],
      required: true,
      helpText: 'What class or formatting style is this project for?'
    },
    {
      name: 'studentGradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Select your school level for age-appropriate language matching.'
    }
  ],
  buildPrompt(inputs) {
    return `
You are a public speaking and presentation expert. Help the student plan a slide presentation.
TOPIC: "${inputs.projectTopic}"
SLIDES: ${inputs.slideCount}
TYPE: ${inputs.projectType}
GRADE LEVEL: ${inputs.studentGradeLevel}

INSTRUCTIONS:
1. Generate exactly ${inputs.slideCount} slides in sequence.
2. For every slide, strictly output the following format:
   ---
   ## Slide [Number]: [Specific Slide Title]
   - **Core Point:** [One main sentence]
   - **Supporting Detail:** [Two bulleted details]
   - **Interesting Takeaway:** [One fascinating fact or quote]
   
   **Visual Idea:** [Describe a picture, diagram, map, or chart that would look great on this slide]
   **Speaking Notes:** [2 sentences of script for what the student should say out loud]
   ---
3. Use vocabulary suitable for a ${inputs.studentGradeLevel} student.
4. Keep the slide layout clean and avoid visual clutter.
`;
  }
};
