export default {
  id: 'poster',
  title: 'Poster Builder',
  description: 'Design the layout, text, colors, and graphical plans for educational posters.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'posterTopic',
      label: 'Poster Theme / Subject',
      type: 'text',
      placeholder: 'e.g., Earth Day Recycling / School Safety Rules / Math Formulas',
      required: true
    },
    {
      name: 'posterStyle',
      label: 'Design Aesthetics',
      type: 'select',
      options: ['Bright & Eye-catching (For Kids)', 'Modern & Minimalist', 'Retro/Vintage travel style', 'Bold & Informative'],
      required: true
    },
    {
      name: 'essentialMessage',
      label: 'Main Headline / Message (Optional)',
      type: 'text',
      placeholder: 'e.g., Save Water, Save Life!',
      required: false
    }
  ],
  buildPrompt(inputs) {
    const headline = inputs.essentialMessage ? `\nMain Headline: "${inputs.essentialMessage}"` : '';

    return `
You are a graphic designer and educational typographer. Help the student plan an educational poster.

THEME:
${inputs.posterTopic}
${headline}

STYLE:
${inputs.posterStyle}

INSTRUCTIONS:
1. Propose a "Color Palette" (with 3-4 specific color descriptions and color feelings).
2. Design a "Grid/Layout Diagram" describing where to place the title, subtitles, body text, and illustrations.
3. Suggest a large central "Visual Illustration/Graphic" idea.
4. Draft the exact "Text Copy" (Headline, Sub-headings, and 3 key bullet points).
5. Suggest the font types (e.g. bold sans-serif, friendly script) to use.
`;
  }
};
