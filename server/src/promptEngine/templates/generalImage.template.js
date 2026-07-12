export default {
  id: 'general-image',
  title: 'General Image Prompt',
  description: 'Build descriptive visual prompts for general image generation (watercolor, 3D render, claymation).',
  categoryType: 'image',
  requireCitations: false,
  fields: [
    {
      name: 'subjectDescription',
      label: 'What is the main subject?',
      type: 'text',
      placeholder: 'e.g., A futuristic treehouse / A fluffy baby dragon playing with a ball',
      required: true
    },
    {
      name: 'artStyle',
      label: 'Artistic Medium / Style',
      type: 'select',
      options: ['Watercolor Painting', '3D Digital Render (Octane Render style)', 'Claymation / Plasticine Model', 'Vibrant Pencil Sketch', 'Stained Glass Art'],
      required: true
    },
    {
      name: 'lightingColor',
      label: 'Lighting & Color Palette',
      type: 'select',
      options: ['Golden Hour (Warm, orange glows)', 'Neon/Cyberpunk (Fluorescent blues & pinks)', 'Soft Pastel Colors', 'Monochrome / Black and White'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
Create a detailed image-generation prompt describing:
- Subject: A stunning, high-quality visualization of ${inputs.subjectDescription}.
- Style: Rendered in a distinct ${inputs.artStyle} medium.
- Atmosphere/Lighting: Features ${inputs.lightingColor} ambient illumination.
- Composition: Centered focus, high detail fidelity, clean composition, crisp edges, child-friendly themes.

SAFETY RESTRICTIONS:
- No gore, no scary or creepy content, no nudity, no suggestive elements.
- Keep the generated artwork clean and school-appropriate.
`;
  }
};
