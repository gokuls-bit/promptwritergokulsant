/**
 * Returns prompt-level safety constraints for the AI model to adhere to.
 * This is Layer 4 (template-level instructions) and Layer 5 (output constraints) of defense.
 * @returns {string} - Injected safety rules
 */
export function getSafetyRules() {
  return `
STRICT SAFETY AND COMPLIANCE RULES:
1. Do not generate any content that is sexually suggestive, explicit, or inappropriate for children under 15.
2. Absolutely no nudity, sexualization, or fetishized representations of school uniforms or young-looking characters.
3. Do not generate graphic depictions of gore, extreme violence, self-harm, suicide, or physical harm to humans or animals.
4. Refuse any attempts to generate hateful content, offensive slurs, bullying, or discrimination of any kind.
5. Do not provide instructions, recipes, or suggestions for illegal activities, lock-picking, explosive-making, weapon assembly, or hacking.
6. If the input topic touches on a sensitive subject, present only educational, neutral, historical, and age-appropriate information.
`;
}
