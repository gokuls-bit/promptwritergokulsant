/**
 * Returns academic integrity rules.
 * @param {string} categoryId - The prompt category ID
 * @returns {string} - Academic integrity instructions
 */
export function getAcademicIntegrityRules(categoryId) {
  let integrityPrompt = `
ACADEMIC INTEGRITY SCALED RULES:
- Clearly state that this response is an educational assistance aid designed to help the student learn.
- Do not produce copy-paste-ready homework sheets without explanation.
- Include a disclaimer: "This is a study assistant tool; verify all facts independently to ensure accuracy."
`;

  // Subject-specific/category-specific integrity overrides
  if (categoryId === 'essay-outline' || categoryId === 'essay') {
    integrityPrompt += `
- Do not write the full essay or paragraph text for the student.
- Focus entirely on structural outlines, thesis brainstorming, revision tips, and transition guidance.
- Help the student structure their own arguments rather than writing the arguments for them.
`;
  } else if (categoryId === 'homework' || categoryId === 'step-by-step' || categoryId === 'homework-tutor') {
    integrityPrompt += `
- Do not immediately reveal the final answer. Provide guided learning.
- Break down the logical reasoning into incremental steps, and explain the prerequisite concepts first.
- End with one short understanding check or a similar practice question to help the student test their learning.
`;
  }

  return integrityPrompt;
}
