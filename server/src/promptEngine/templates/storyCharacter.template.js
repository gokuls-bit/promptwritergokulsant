export default {
  id: 'story-character',
  title: 'Story Character Builder',
  description: 'Design characters for your stories, including their backstory, personality quirks, and special skills.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'characterRole',
      label: 'Character Role',
      type: 'select',
      options: ['Main Hero', 'Mysterious Villain', 'Funny Sidekick', 'Wise Mentor/Helper'],
      required: true
    },
    {
      name: 'specialAbility',
      label: 'Special Ability or Talent',
      type: 'text',
      placeholder: 'e.g., Controls water, extremely smart, can talk to animals',
      required: true
    },
    {
      name: 'personality',
      label: 'Personality Quirks',
      type: 'text',
      placeholder: 'e.g., Brave but clumsy / Sarcastic but loyal / Very shy',
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a novelist and character designer. Help the student build a character profile.

ROLE:
${inputs.characterRole}

TALENT/POWER:
${inputs.specialAbility}

PERSONALITY:
${inputs.personality}

INSTRUCTIONS:
1. Generate a character profile containing:
   - "Full Name & Nickname"
   - "Physical Appearance" (Describe clothing, hair, stature)
   - "Backstory Summary" (3 sentences on where they came from)
   - "Core Strength" (How they use: ${inputs.specialAbility})
   - "Fascinating Weakness/Flaw" (To make them interesting)
   - "A Catchphrase or Signature Quote"
2. Keep the description vivid, child-friendly, and engaging.
`;
  }
};
