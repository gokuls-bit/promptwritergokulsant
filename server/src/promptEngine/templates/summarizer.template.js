export default {
  id: 'summarizer',
  title: 'Chapter Summarizer',
  description: 'Turn a long chapter, article, or set of notes into clear structured summaries you can actually study from.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'sourceText',
      label: 'Text to Summarize',
      type: 'textarea',
      placeholder: 'Paste the chapter, article, or notes here...',
      required: true,
      minLength: 30,
      maxLength: 3000,
      helpText: 'Paste the exact source text — the summary will never add invented facts beyond what you paste.'
    },
    {
      name: 'gradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Matches explanation depth and vocabulary to your level.'
    },
    {
      name: 'summaryLength',
      label: 'Summary Length',
      type: 'chip',
      options: ['Very Short (1 paragraph)', 'Standard (3 key sections)', 'Comprehensive (detailed study notes)'],
      required: true,
      helpText: 'How detailed do you need the summary to be?'
    },
    {
      name: 'format',
      label: 'Summary Format',
      type: 'select',
      options: ['Bullet Points & Key Themes', 'Chronological Timeline', 'Q&A Study Guide', 'Main Characters & Plot', 'Concept Map Outline'],
      required: true,
      helpText: 'How should the summary notes be structured?'
    }
  ],

  buildPrompt(inputs) {
    return `
You are an expert study skills coach who creates clear, reliable summaries for students.

STUDENT LEVEL: ${inputs.gradeLevel}
SUMMARY FORMAT: ${inputs.format}
DETAIL LEVEL: ${inputs.summaryLength}

SOURCE TEXT TO SUMMARIZE:
"""
${inputs.sourceText}
"""

CRITICAL RULE — ZERO FABRICATION:
You must ONLY use information that appears in the source text above.
Do NOT add extra facts, names, dates, quotes, or ideas that are not in the source material, even if you know them to be true.
If information is missing from the source, write "[Not covered in source]" rather than inventing it.

SUMMARY INSTRUCTIONS:
1. Begin with a one-sentence "Main Idea" statement.
2. Structure the rest of the response using the "${inputs.format}" format.
3. Scale detail to "${inputs.summaryLength}":
   - Very Short: main idea + 3-5 key bullet points only.
   - Standard: main idea + 3 themed sections with sub-points.
   - Comprehensive: full breakdown with all sections, key quotes, definitions, and a study Q&A at the end.
4. Bold all key terms, names, or dates from the source.
5. Use vocabulary accessible to a ${inputs.gradeLevel} student.
6. End with 3 questions the student should be able to answer after reading this summary.

OUTPUT LANGUAGE:
- Precise, scannable, and study-ready.
- Avoid re-stating the same point twice.
`;
  }
};
