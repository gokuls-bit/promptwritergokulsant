export default {
  id: 'meme',
  title: 'Meme Concept Builder',
  description: 'Design funny, relatable, school-friendly meme templates and captions for student life.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'memeTopic',
      label: 'What is the meme about?',
      type: 'text',
      placeholder: 'e.g., Staying up late studying / Forgetting your homework / Math class rules',
      required: true
    },
    {
      name: 'memeTemplate',
      label: 'Meme Template Style',
      type: 'select',
      options: ['Drake Hotline Bling (Dislike vs. Like)', 'Two Buttons (Hard Choice)', 'Expanding Brain (Increasingly complex ideas)', 'Distracted Boyfriend', 'General/Original Layout'],
      required: true
    },
    {
      name: 'humorTone',
      label: 'Humor Tone',
      type: 'select',
      options: ['Silly & Playful', 'Highly Relatable Student Life', 'Slightly Sarcastic (Clean)'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a funny school-humor meme creator. Design a clean, school-safe meme concept.

TOPIC:
${inputs.memeTopic}

TEMPLATE STYLE:
${inputs.memeTemplate}

TONE:
${inputs.humorTone}

INSTRUCTIONS:
1. Describe the "Meme Visual Layout" step-by-step (e.g., Panel 1 image description, Panel 2 image description).
2. Provide the "Caption Text" for each panel or section.
3. Explain the joke in 1 sentence (why students find this funny and relatable).
4. Keep the humor completely clean: no references to drugs, alcohol, relationships, or anything unsafe.
`;
  }
};
