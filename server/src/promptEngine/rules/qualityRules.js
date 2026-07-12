/**
 * Returns a final quality assurance checklist for the AI model.
 * @returns {string} - Final quality check rules
 */
export function getQualityRules() {
  return `
FINAL QUALITY CHECKLIST:
Before displaying the final response, verify and adjust the content against this checklist:
- Is the vocabulary and tone fully appropriate for the requested student age/grade level?
- Are the explanations logically ordered with clear step-by-step guidance?
- Are calculations, dates, and formulas internally consistent and factually accurate?
- Does the response encourage active student learning and engagement rather than just providing a direct copy-paste answer?
- Are all safety, NSFW, and academic integrity boundaries strictly respected?
`;
}
