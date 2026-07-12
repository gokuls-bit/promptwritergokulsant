/**
 * Returns subject-specific rules to enforce educational rigor and accuracy.
 * Covers: Mathematics, Science, History, Geography, Computer Science, English.
 * @param {string} subject - The subject or topic string (can be any freeform text)
 * @returns {string} - Subject-specific instructions to inject into the compiled prompt
 */
export function getSubjectRules(subject) {
  if (!subject) return '';

  const sub = subject.toLowerCase().trim();

  // ─── Mathematics ───────────────────────────────────────────────────────────
  if (sub.includes('math') || sub.includes('algebra') || sub.includes('geometry') ||
      sub.includes('calculus') || sub.includes('arithmetic') || sub.includes('statistics') ||
      sub.includes('trigonometry') || sub.includes('fraction') || sub.includes('equation') ||
      sub.includes('budget') || sub.includes('finance') || sub.includes('probability')) {
    return `
SUBJECT-SPECIFIC RULES (MATHEMATICS):
- Show ALL intermediate calculation steps — never skip a step silently.
- State every formula explicitly before applying it (e.g., "Area = length × width").
- Double-check all arithmetic for internal consistency before outputting.
- Use clean, unambiguous notation for equations. Prefer × over * and ÷ over / in prose.
- When units are involved (cm, kg, $, %), include them at every step and in the final answer.
- Provide one short worked example showing the same method on a fresh problem.
- If the student is asked to reason financially (budgets, percentages, interest), connect to real-life purchasing decisions.
`;
  }

  // ─── Science ────────────────────────────────────────────────────────────────
  if (sub.includes('science') || sub.includes('biology') || sub.includes('physics') ||
      sub.includes('chemistry') || sub.includes('photosynthesis') || sub.includes('ecosystem') ||
      sub.includes('experiment') || sub.includes('hypothesis') || sub.includes('atom') ||
      sub.includes('cell') || sub.includes('force') || sub.includes('energy') ||
      sub.includes('climate') || sub.includes('evolution')) {
    return `
SUBJECT-SPECIFIC RULES (SCIENCE):
- Prioritise factual, evidence-based scientific accuracy. Never invent data or studies.
- Explain the underlying mechanisms — the "how" and "why", not just "what happens".
- Connect concepts to the scientific method, real experiments, or natural phenomena students can observe.
- Define all scientific terms in plain language immediately on first use.
- When relevant, mention the SI units for measurements.
- Distinguish between hypothesis (prediction), theory (well-tested explanation), and law (observed pattern).
- Flag any areas of ongoing scientific debate or uncertainty — teach sceptical thinking.
`;
  }

  // ─── History & Social Studies ────────────────────────────────────────────────
  if (sub.includes('history') || sub.includes('social studies') || sub.includes('civics') ||
      sub.includes('war') || sub.includes('revolution') || sub.includes('empire') ||
      sub.includes('civilisation') || sub.includes('civilization') || sub.includes('politics')) {
    return `
SUBJECT-SPECIFIC RULES (HISTORY & SOCIAL STUDIES):
- Maintain strict chronological accuracy — list key dates and place events in sequence.
- Attribute ideas and quotations to specific historical figures or sources.
- Present historical events from multiple perspectives; avoid imposing modern values on historical actors.
- Emphasise cause-and-effect relationships between events.
- Distinguish between primary sources (original documents/artefacts) and secondary sources (analyses).
- Flag when an event is debated among historians; present the main interpretations.
`;
  }

  // ─── Geography & Environment ─────────────────────────────────────────────────
  if (sub.includes('geography') || sub.includes('environment') || sub.includes('climate change') ||
      sub.includes('map') || sub.includes('continent') || sub.includes('country') ||
      sub.includes('population') || sub.includes('ocean') || sub.includes('deforestation') ||
      sub.includes('sustainability')) {
    return `
SUBJECT-SPECIFIC RULES (GEOGRAPHY & ENVIRONMENTAL STUDIES):
- Distinguish between physical geography (landforms, climate) and human geography (population, economy).
- Use precise directional and locational language (north/south, latitude/longitude when relevant).
- Connect local observations to global patterns and vice versa.
- When discussing environmental issues, present scientific consensus while acknowledging socioeconomic complexity.
- Use up-to-date statistics from reliable sources (e.g., UN, World Bank, NASA) — if unavailable, use approximate figures and note the limitation.
- Encourage spatial thinking: suggest how maps, graphs, or diagrams could represent the concept.
`;
  }

  // ─── Computer Science ────────────────────────────────────────────────────────
  if (sub.includes('computer') || sub.includes('programming') || sub.includes('coding') ||
      sub.includes('python') || sub.includes('javascript') || sub.includes('algorithm') ||
      sub.includes('data structure') || sub.includes('binary') || sub.includes('network') ||
      sub.includes('software') || sub.includes('database') || sub.includes('cybersecurity')) {
    return `
SUBJECT-SPECIFIC RULES (COMPUTER SCIENCE):
- Show code examples using clean, readable formatting inside fenced code blocks with language labels.
- Explain WHY a solution works, not just HOW to write it — build computational thinking.
- Define computer science vocabulary (algorithm, variable, loop, function) clearly before use.
- When comparing approaches, discuss trade-offs (speed vs. memory, simplicity vs. power).
- Always highlight common bugs or edge cases to watch for.
- Emphasise readable code: use meaningful variable names, comments, and consistent indentation in examples.
- Do NOT write complete solutions to take-home programming assignments; scaffold and guide instead.
`;
  }

  // ─── English & Literature ────────────────────────────────────────────────────
  if (sub.includes('english') || sub.includes('literature') || sub.includes('reading') ||
      sub.includes('writing') || sub.includes('essay') || sub.includes('grammar') ||
      sub.includes('poem') || sub.includes('novel') || sub.includes('fiction') ||
      sub.includes('language')) {
    return `
SUBJECT-SPECIFIC RULES (ENGLISH & LITERATURE):
- Identify and name literary devices (metaphor, simile, foreshadowing, irony, tone, theme) with specific textual examples.
- Distinguish between what a text says (literal) and what it means (inferential/analytical).
- When analysing student writing: give specific, actionable feedback — not just "good" or "improve this".
- For grammar questions: state the rule clearly, give a correct example, and a corrected version of any incorrect example.
- For essay writing: prioritise scaffolding structure (thesis, evidence, analysis, conclusion) rather than writing the essay.
- For creative writing: suggest vivid sensory details, active verbs, and varied sentence structure.
`;
  }

  // ─── General Academic (fallback) ──────────────────────────────────────────────
  return `
SUBJECT-SPECIFIC RULES (GENERAL ACADEMIC):
- Ensure strict factual accuracy; do not invent events, quotations, formulas, or data.
- Introduce foundational terms and concepts first, then expand on details.
- Guide the student step-by-step from simple concepts to more complex ones.
- Encourage critical thinking by asking "why" and "what if" questions alongside explanations.
`;
}
