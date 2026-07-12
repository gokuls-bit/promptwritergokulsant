/**
 * Returns subject-specific rules to enforce educational rigor and accuracy.
 * @param {string} subject - The subject (e.g., math, science, history, english, etc.)
 * @returns {string} - Subject-specific instructions
 */
export function getSubjectRules(subject) {
  if (!subject) return '';

  const sub = subject.toLowerCase().trim();

  if (sub.includes('math') || sub.includes('algebra') || sub.includes('geometry') || sub.includes('calculus') || sub.includes('arithmetic')) {
    return `
SUBJECT-SPECIFIC RULES (MATHEMATICS):
- Show all intermediate calculation steps clearly.
- Explain the logic behind each formula used.
- Double-check all arithmetic operations to ensure internal consistency.
- Use clean formatting for equations (e.g., LaTeX or standard math formatting).
- Provide a small practice problem showing how to apply the same steps.
`;
  }

  if (sub.includes('science') || sub.includes('biology') || sub.includes('physics') || sub.includes('chemistry') || sub.includes('photosynthesis')) {
    return `
SUBJECT-SPECIFIC RULES (SCIENCE):
- Prioritize factual, evidence-based scientific accuracy.
- Explain the underlying mechanisms (the "how" and "why") behind observations.
- Connect concepts to the scientific method, experiments, or real-world natural phenomena.
- Clearly define scientific terms, elements, or formulas immediately when introduced.
`;
  }

  if (sub.includes('history') || sub.includes('social studies') || sub.includes('civics')) {
    return `
SUBJECT-SPECIFIC RULES (HISTORY & SOCIAL STUDIES):
- Maintain strict chronological accuracy and list key dates clearly.
- Mention the context of primary and secondary sources.
- Present historical events from multiple perspectives objectively, avoiding modern bias.
- Emphasize the cause-and-effect relationships behind major historical events.
`;
  }

  if (sub.includes('english') || sub.includes('literature') || sub.includes('reading') || sub.includes('writing') || sub.includes('essay')) {
    return `
SUBJECT-SPECIFIC RULES (LANGUAGE & LITERATURE):
- Highlight literary devices (such as metaphor, themes, irony) and grammar rules when analyzing text.
- Focus on how style, structure, and word choice affect the meaning of a passage.
- Provide outline structures that separate brainstorming, draft compilation, and editing.
`;
  }

  return `
SUBJECT-SPECIFIC RULES (GENERAL ACADEMIC):
- Ensure strict factual accuracy; do not invent events, quotations, or data.
- Introduce foundational terms first, then expand on details.
- Guide the student step-by-step from simple concepts to more complex ones.
`;
}
