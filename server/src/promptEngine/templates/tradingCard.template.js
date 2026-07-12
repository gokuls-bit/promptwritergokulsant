export default {
  id: 'trading-card',
  title: 'Custom Trading Card',
  description: 'Design a fictional trading card (like Pokémon or Magic) in a strict JSON format.',
  categoryType: 'json',
  requireCitations: false,
  fields: [
    {
      name: 'cardName',
      label: 'Card Character Name',
      type: 'text',
      placeholder: 'e.g., SparkTurtle / RoboHelper / CyberDragon',
      required: true
    },
    {
      name: 'cardType',
      label: 'Card Type',
      type: 'select',
      options: ['Creature / Beast', 'Tech / Robot', 'Magic Spell', 'Legendary Hero'],
      required: true
    },
    {
      name: 'mainAbility',
      label: 'Main Special Ability',
      type: 'text',
      placeholder: 'e.g., Fire spin, double code compile, time freezing',
      required: true
    },
    {
      name: 'powerTier',
      label: 'Power Tier',
      type: 'select',
      options: ['Common (Basic stats)', 'Rare (Strong attributes)', 'Legendary (Epic power)'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a game designer for trading card games. Create a fictional, original trading card block.
- Character/Item Name: "${inputs.cardName}"
- Type: "${inputs.cardType}"
- Special Ability: "${inputs.mainAbility}"
- Power Tier: "${inputs.powerTier}"

INSTRUCTIONS:
Generate a valid JSON object matching the schema below.
- Do not output conversational preamble or wrapping text. Output only the JSON.
- Numbers must be actual integers between 0 and 100.
- Scale stats based on the power tier (Legendary should have high stats like 80-99; Common should have basic stats like 20-50).
- Create original fictional details; do not copy copyrighted cards directly.

JSON SCHEMA:
{
  "cardTitle": "A creative title based on the name",
  "catchphrase": "A cool 1-sentence catchphrase for the character",
  "stats": {
    "attack": 0,
    "defense": 0,
    "speed": 0
  },
  "abilityDescription": "Detailed 2-sentence description of the ability and its effect in game terms",
  "imagePrompt": "Detailed visual image prompt describing this card character in action for an image generator"
}
`;
  }
};
