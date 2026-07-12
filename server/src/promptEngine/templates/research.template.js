export default {
  id: 'research',
  title: 'Research Report Builder',
  description: 'Plan a scientific or historical research report, outline subtopics, and structure your sources.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'researchTopic',
      label: 'Research Topic',
      type: 'text',
      placeholder: 'e.g., Renewable Energy / Life of Marie Curie / Great Depression',
      required: true
    },
    {
      name: 'reportSections',
      label: 'Number of Sections',
      type: 'select',
      options: ['3 Sections', '5 Sections'],
      required: true
    },
    {
      name: 'gradeLevelGoal',
      label: 'Class Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a reference librarian and academic writing coach. Help the student outline a research paper.

TOPIC:
${inputs.researchTopic}

STRUCTURE:
${inputs.reportSections}

GRADE LEVEL:
${inputs.gradeLevelGoal}

INSTRUCTIONS:
1. Formulate 3 central research questions the student should answer in their paper.
2. Outline the paper structure section-by-section, showing:
   - Section Title
   - Key Sub-points (what questions or topics to cover here)
   - Important Keywords (what terms to search in Google or the library database)
3. Detail how to cite sources appropriately (focusing on school-appropriate simple citations).
4. Do not write any paragraphs for the final report; focus on structure and keywords.
`;
  }
};
