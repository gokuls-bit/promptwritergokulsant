export default {
  id: 'school-project',
  title: 'School Project Builder',
  description: 'Plan a physical or digital school project, including materials, timeline, and layout guides.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'projectName',
      label: 'Project Concept',
      type: 'text',
      placeholder: 'e.g., Rainforest Diorama / Water Cycle Poster / Working Volcano model',
      required: true
    },
    {
      name: 'projectType',
      label: 'Project Format',
      type: 'select',
      options: ['Physical Model / Diorama', 'Trifold Poster Board', 'Video / Slide Presentation', 'Hands-on Experiment'],
      required: true
    },
    {
      name: 'timelineWeeks',
      label: 'Timeline to Complete',
      type: 'select',
      options: ['1 Week', '2 Weeks', '4 Weeks'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a creative school project consultant. Help the student organize and plan a school project.

PROJECT CONCEPT:
${inputs.projectName}

FORMAT:
${inputs.projectType}

TIMELINE:
${inputs.timelineWeeks}

INSTRUCTIONS:
1. Provide a comprehensive "Materials & Supplies List" (focus on cheap, recycled, or household items).
2. Outline a step-by-step assembly guide broken down into logical phases over the "${inputs.timelineWeeks}".
3. Describe a "Visual Layout Design" indicating where titles, text blocks, and models should be placed.
4. Include 2 "Safety Tips" or cleanliness rules for crafting.
`;
  }
};
