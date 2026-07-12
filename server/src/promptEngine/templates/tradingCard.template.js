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
      required: true,
      minLength: 3,
      maxLength: 50,
      helpText: 'What is the name of your fictional character or item?'
    },
    {
      name: 'cardType',
      label: 'Card Type',
      type: 'select',
      options: ['Creature / Beast', 'Tech / Robot', 'Magic Spell', 'Legendary Hero'],
      required: true,
      helpText: 'What category or elemental type does this card belong to?'
    },
    {
      name: 'mainAbility',
      label: 'Main Special Ability',
      type: 'text',
      placeholder: 'e.g., Fire spin, double code compile, time freezing',
      required: true,
      minLength: 3,
      maxLength: 100,
      helpText: 'Describe the card\'s special move or primary effect.'
    },
    {
      name: 'powerLevel',
      label: 'Power Level',
      type: 'chip',
      options: ['Common (Basic stats)', 'Rare (Strong attributes)', 'Legendary (Epic power)'],
      required: true,
      helpText: 'How strong is this card relative to others?'
    }
  ],
  buildPrompt(inputs) {
    return `
You are a game designer for trading card games. Create a fictional, original trading card block.
- Character/Item Name: "${inputs.cardName}"
- Type: "${inputs.cardType}"
- Special Ability: "${inputs.mainAbility}"
- Power Tier/Level: "${inputs.powerLevel}"

INSTRUCTIONS:
Generate a valid JSON object matching the schema below.
- Do not output conversational preamble or wrapping text. Output only the JSON.
- Numbers must be actual integers between 0 and 100.
- Scale stats based on the power level (Legendary should have high stats like 80-99; Common should have basic stats like 20-50).
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
