/**
 * Returns output structure and visual presentation guidelines.
 * @param {string} categoryType - 'text', 'image', or 'json'
 * @returns {string} - Output guidelines
 */
export function getOutputRules(categoryType) {
  if (categoryType === 'image') {
    return `
OUTPUT FORMAT RULES (IMAGE GENERATION):
- Do not output explanations, greetings, or conversational filler.
- Provide a single, continuous, highly detailed prompt paragraph focusing on visual keywords.
- Break down the prompt description into: Subject, Dress/Details, Pose, Expression, Environment, Lighting, Color Palette, Camera Angle, Composition, and Artistic Medium/Sub-style.
- Keep the language descriptive, evocative, and direct.
`;
  }

  if (categoryType === 'json') {
    return `
OUTPUT FORMAT RULES (JSON OUTPUT):
- Return ONLY valid JSON.
- Do not wrap the JSON in conversational text or preamble.
- Follow the provided JSON schema exactly.
- All numerical attributes must be written as numbers (not strings).
- Ensure syntax correctness (closing brackets, proper quoting, valid commas).
`;
  }

  // Default: text prompts
  return `
OUTPUT FORMAT RULES (TEXT EXPLANATIONS):
- Use clean Markdown formatting for readability.
- Group the response into logical sections with clear ## headings.
- Use bullet points and numbered lists to break up dense paragraphs.
- Keep descriptions and explanations concise (aim for clarity rather than volume).
- Suggest a visual diagram, illustration idea, or map layout that would help the student visualize the topic (e.g., [VISUAL RECOMMENDATION: A sketch of...]).
`;
}
