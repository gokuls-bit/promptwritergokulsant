export default {
  id: 'cheat-sheet',
  title: 'Notes to Cheat Sheet',
  description: 'Turn your messy classroom notes or text into a neat, organized, and bold cheat sheet.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'topic',
      label: 'Main Subject/Topic',
      type: 'text',
      placeholder: 'e.g., Chemistry Periodic Table / French Revolution',
      required: true
    },
    {
      name: 'rawNotes',
      label: 'Paste Your Notes Here',
      type: 'textarea',
      placeholder: 'Paste your raw notes, definitions, or textbook pages...',
      required: true
    },
    {
      name: 'cheatSheetFormat',
      label: 'Preferred Layout style',
      type: 'select',
      options: ['Formulas & Definitions', 'Chronological Timeline', 'Q&A Flashcard Style', 'Key Facts & Bullets'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a study-skills coach. Convert the following messy notes into a highly structured study cheat sheet.

TOPIC:
${inputs.topic}

RAW NOTES:
"""
${inputs.rawNotes}
"""

INSTRUCTIONS:
1. Organize the notes based on the style: ${inputs.cheatSheetFormat}.
2. Use clear bold headings, tables, or lists to separate concepts.
3. Highlight critical formulas, terms, or dates in **bold text**.
4. Create at least one mnemonic device (e.g., acronyms) to help the student memorize key details.
5. Keep explanations extremely short (1-2 sentences maximum per concept) for quick scanning.
`;
  }
};
