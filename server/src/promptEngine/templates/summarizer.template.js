export default {
  id: 'summarizer',
  title: 'Chapter Summarizer',
  description: 'Summarize a book chapter, notes, or textbook section into key takeaways, characters, and themes.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'sourceText',
      label: 'Text to Summarize',
      type: 'textarea',
      placeholder: 'Paste the book chapter, article, or textbook section here...',
      required: true,
      minLength: 20,
      maxLength: 2000,
      helpText: 'Paste the notes or article you want us to summarize.'
    },
    {
      name: 'summaryLength',
      label: 'Summary length',
      type: 'chip',
      options: ['Very Short (1 paragraph)', 'Standard (3 key sections)', 'Comprehensive (detailed notes)'],
      required: true,
      helpText: 'Select how long the final summary should be.'
    },
    {
      name: 'gradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Matches explanation depth to your school grade level.'
    },
    {
      name: 'format',
      label: 'Summary Format',
      type: 'select',
      options: ['Chronological Timeline', 'Bullet Points & Themes', 'Q&A Study Guide', 'Main Characters & Plot'],
      required: true,
      helpText: 'How should the summary notes be laid out?'
    }
  ],
  buildPrompt(inputs) {
    return `
You are an expert academic tutor. Summarize the following source text.
GRADE LEVEL: ${inputs.gradeLevel}
FORMAT: ${inputs.format}
LENGTH DETAIL: ${inputs.summaryLength}

SOURCE TEXT:
"""
${inputs.sourceText}
"""

INSTRUCTIONS:
1. Provide a clear summary of the source text using the structure: "${inputs.format}".
2. Scale explanation and complexity to a ${inputs.gradeLevel} level.
3. Keep the output aligned to the length constraint: "${inputs.summaryLength}".
4. Highlight important terminology, formulas, or historical dates in **bold text**.
`;
  }
};
