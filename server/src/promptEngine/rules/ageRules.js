/**
 * Returns rules tailored to the student's grade level.
 * @param {string} gradeLevel - elementary, middle, high, adult
 * @returns {string} - Injected instructions for age-level adaptation
 */
export function getAgeRules(gradeLevel) {
  const level = (gradeLevel || 'middle').toLowerCase();

  switch (level) {
    case 'elementary':
      return `
- Explain concepts using vocabulary suitable for an 8-to-10-year-old child (approx. 3rd to 5th grade).
- Use simple, direct sentences and avoid overly complex jargon.
- Explain any challenging words immediately in brackets.
- Keep the tone warm, highly encouraging, and patient.
- Use simple, relatable real-world analogies (e.g., comparing fractions to pizza slices).
- Keep paragraphs short (maximum 2-3 sentences).
`;
    case 'middle':
      return `
- Explain concepts using vocabulary suitable for an 11-to-13-year-old student (approx. 6th to 8th grade).
- Avoid overly child-like language, but do not use advanced graduate-level terms.
- Use a friendly, curious, and supportive tone.
- Define new academic terms clearly with brief examples.
- Use engaging, practical analogies.
- Keep explanation structures organized and easy to scan.
`;
    case 'high':
      return `
- Explain concepts using vocabulary suitable for a 14-to-15-year-old student (approx. 9th to 10th grade).
- Use proper academic terminology and analytical depth while keeping explanations clear and concise.
- Maintain an encouraging, intellectual, and mentoring tone.
- Do not oversimplify complex concepts, but provide clear definitions for advanced jargon.
- Suggest connections to broader contexts, real-world events, or scientific principles.
`;
    case 'adult':
    default:
      return `
- Explain concepts with the depth and terminology suitable for an advanced high school or college-level student.
- Keep the tone professional, direct, and academic.
- Focus on comprehensive reasoning, deep explanations, and detailed analysis.
`;
  }
}
