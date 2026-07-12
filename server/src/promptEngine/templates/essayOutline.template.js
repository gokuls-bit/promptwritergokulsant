export default {
  id: 'essay-outline',
  title: 'Essay Outline Builder',
  description: 'Plan your essay structure, thesis statement, and paragraph flow. Does not write the essay for you.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'essayTopic',
      label: 'Essay Topic / Question',
      type: 'text',
      placeholder: 'e.g., Should school uniforms be mandatory? / Impact of plastics on oceans',
      required: true
    },
    {
      name: 'essayType',
      label: 'Essay Type',
      type: 'select',
      options: ['Persuasive (Argue a point)', 'Informational (Explain facts)', 'Narrative (Tell a story)', 'Compare and Contrast'],
      required: true
    },
    {
      name: 'outlineSize',
      label: 'Length / Structure',
      type: 'select',
      options: ['Simple (3-Paragraph Outline)', 'Standard (5-Paragraph Outline)', 'Long / Comprehensive Outline'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a writing coach. Help the student organize an essay outline.

TOPIC:
${inputs.essayTopic}

TYPE:
${inputs.essayType}

STRUCTURE:
${inputs.outlineSize}

INSTRUCTIONS:
1. Brainstorm 3 different thesis statement options (arguments) the student could make.
2. Outline the essay structure block-by-block (Introduction, Body Paragraphs, Conclusion) matching the "${inputs.outlineSize}".
3. For each paragraph block, outline:
   - Topic Sentence Goal (what to prove/explain)
   - Supporting Evidence Ideas (what facts/arguments to search for)
   - Transition Tip (how to flow to the next paragraph)
4. Do not write full paragraphs or complete text for the essay. Focus entirely on outlines, bullet points, and planning scaffolding.
`;
  }
};
