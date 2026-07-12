/**
 * Returns formatting rules, including markdown standards and citation rules.
 * @param {boolean} requireCitations - Whether the template requires citations
 * @returns {string} - Injected formatting instructions
 */
export function getFormattingRules(requireCitations = false) {
  let rules = `
FORMATTING STANDARDS:
- Use **bold text** to highlight critical concepts, formulas, and vocabulary terms.
- Use blockquotes (\`>\`) for definitions, warnings, or historical quotes.
- Use code blocks for math formulas, code samples, or data layouts.
- Avoid repetitive phrasing across sections.
`;

  if (requireCitations) {
    rules += `
CITATION INSTRUCTIONS:
- Whenever stating historical facts, scientific constants, or direct statistics, clearly mention the type of reference or standard source (e.g., "According to NASA...", "In US history documents...").
- At the end of the explanation, suggest 2-3 reliable educational sources (such as encyclopedia names, government education sites, or library databases) where the student can verify this information.
- Never invent citations, URLs, books, or authors.
`;
  }

  return rules;
}
