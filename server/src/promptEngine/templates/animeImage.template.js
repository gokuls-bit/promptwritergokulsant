export default {
  id: 'anime-image',
  title: 'Anime/Manga Image Prompt',
  description: 'Design highly detailed prompts for generating beautiful anime-style illustrations.',
  categoryType: 'image',
  requireCitations: false,
  fields: [
    {
      name: 'characterDescription',
      label: 'Describe your Character',
      type: 'text',
      placeholder: 'e.g., A boy with messy red hair and goggles / A girl with star pattern hair',
      required: true
    },
    {
      name: 'animeSubStyle',
      label: 'Anime Style',
      type: 'select',
      options: ['Studio Ghibli (Whimsical, Hand-drawn)', 'Shonen Action (Dynamic, Bold lines)', 'Chibi (Cute, Small, Big eyes)', '90s Retro Anime (Cyberpunk, Soft colors)', 'Modern Cel-Shaded'],
      required: true
    },
    {
      name: 'actionOrSetting',
      label: 'What is happening or setting?',
      type: 'text',
      placeholder: 'e.g., Reading a floating book in a library / Standing under cherry blossom trees',
      required: true
    },
    {
      name: 'mood',
      label: 'Mood / Atmosphere',
      type: 'select',
      options: ['Happy & Bright', 'Epic & Cinematic', 'Cozy & Peaceful', 'Mysterious & Magical'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
Create a detailed image-generation prompt based on these parameters:
- Subject: A polished ${inputs.animeSubStyle} anime-inspired illustration of ${inputs.characterDescription}.
- Action/Setting: The character is ${inputs.actionOrSetting}.
- Mood: ${inputs.mood}.
- Aesthetics: Dynamic composition, expressive pose, clean linework, detailed cel shading, cinematic lighting, coherent anatomy, atmospheric environment, high visual clarity.

SAFETY RESTRICTIONS:
- No sexual content, no nudity, no suggestive posing of young-looking characters.
- Keep the illustration fully G-rated and child-safe.
`;
  }
};
