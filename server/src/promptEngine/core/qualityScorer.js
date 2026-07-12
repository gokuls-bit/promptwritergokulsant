/**
 * Calculates a quality score (0-100) and breakdown for a compiled prompt.
 * @param {string} compiledPrompt - The final compiled prompt text
 * @param {object} rawInputs - The user's raw input variables
 * @returns {object} - { score: number, breakdown: array }
 */
export function calculateQualityScore(compiledPrompt, rawInputs) {
  if (!compiledPrompt) {
    return { score: 0, breakdown: [] };
  }

  let score = 50; // Base score
  const breakdown = [];

  // Check 1: Input detail level (Max +10)
  let totalInputLength = 0;
  let inputFieldsCount = 0;
  for (const val of Object.values(rawInputs || {})) {
    if (typeof val === 'string') {
      totalInputLength += val.length;
      if (val.trim().length > 0) inputFieldsCount++;
    } else if (val !== undefined && val !== null) {
      inputFieldsCount++;
    }
  }

  if (totalInputLength > 80) {
    score += 10;
    breakdown.push({ criteria: 'Detail Richness', status: 'Excellent', description: 'Your input details are descriptive and clear (+10)' });
  } else if (totalInputLength > 30) {
    score += 7;
    breakdown.push({ criteria: 'Detail Richness', status: 'Good', description: 'Good level of input detail provided (+7)' });
  } else {
    score += 3;
    breakdown.push({ criteria: 'Detail Richness', status: 'Basic', description: 'Very brief inputs. Try adding more context for better results (+3)' });
  }

  // Check 2: Safety guardrails (Max +10)
  if (compiledPrompt.includes('STRICT SAFETY AND COMPLIANCE RULES')) {
    score += 10;
    breakdown.push({ criteria: 'Child Safety Filters', status: 'Active', description: 'Strict child safety and anti-NSFW rules are locked in (+10)' });
  } else {
    breakdown.push({ criteria: 'Child Safety Filters', status: 'Missing', description: 'Safety rules are missing (+0)' });
  }

  // Check 3: Academic Integrity (Max +10)
  if (compiledPrompt.includes('ACADEMIC INTEGRITY') || compiledPrompt.includes('TEACHING INSTRUCTIONS')) {
    score += 10;
    breakdown.push({ criteria: 'Academic Integrity Guardrails', status: 'Active', description: 'Active anti-cheating guidelines and guided learning scaffolded (+10)' });
  } else {
    breakdown.push({ criteria: 'Academic Integrity Guardrails', status: 'Missing', description: 'Academic integrity rules are missing (+0)' });
  }

  // Check 4: Age-Level Adaptation (Max +10)
  if (compiledPrompt.includes('grade') || compiledPrompt.includes('vocabulary suitable for') || compiledPrompt.includes('level')) {
    score += 10;
    breakdown.push({ criteria: 'Age-Level Adaptation', status: 'Active', description: 'Tone and vocabulary target instructions customized for your grade level (+10)' });
  } else {
    breakdown.push({ criteria: 'Age-Level Adaptation', status: 'Missing', description: 'Age-level vocabulary rules are missing (+0)' });
  }

  // Check 5: Formatting Standards (Max +10)
  if (compiledPrompt.includes('FORMATTING STANDARDS') || compiledPrompt.includes('Markdown')) {
    score += 10;
    breakdown.push({ criteria: 'Formatting Structure', status: 'Active', description: 'Markdown structural guidelines, headers, and bulleting configured (+10)' });
  } else {
    breakdown.push({ criteria: 'Formatting Structure', status: 'Missing', description: 'Formatting guidelines are missing (+0)' });
  }

  // Ensure score is clamped between 0 and 100
  score = Math.min(Math.max(score, 0), 100);

  return {
    score,
    breakdown
  };
}
