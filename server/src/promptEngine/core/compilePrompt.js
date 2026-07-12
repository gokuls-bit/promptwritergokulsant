import { templates } from './templateRegistry.js';
import { sanitizeInput } from '../sanitization/sanitizeInput.js';
import { getAgeRules } from '../rules/ageRules.js';
import { getEducationRules } from '../rules/educationRules.js';
import { getSubjectRules } from '../rules/subjectRules.js';
import { getOutputRules } from '../rules/outputRules.js';
import { getFormattingRules } from '../rules/formattingRules.js';
import { getSafetyRules } from '../rules/safetyRules.js';
import { getAcademicIntegrityRules } from '../rules/academicIntegrityRules.js';
import { getQualityRules } from '../rules/qualityRules.js';
import { calculateQualityScore } from './qualityScorer.js';

/**
 * Compiles a comprehensive, safe, and age-adapted AI prompt.
 * @param {string} categoryId - The ID of the template category
 * @param {object} inputs - The raw user input key-values
 * @param {string} gradeLevel - elementary, middle, high, adult
 * @returns {object} - { compiledPrompt, qualityScore, breakdown }
 */
export function compilePrompt(categoryId, inputs, gradeLevel = 'middle') {
  const template = templates[categoryId];
  if (!template) {
    throw new Error(`Template category "${categoryId}" not found.`);
  }

  // 1. Sanitize input & run safety scan (will throw error if unsafe word is found)
  const sanitizedInputs = sanitizeInput(inputs);

  // 2. Validate required fields
  for (const field of template.fields) {
    if (field.required && (sanitizedInputs[field.name] === undefined || sanitizedInputs[field.name] === '')) {
      throw new Error(`The field "${field.label}" is required.`);
    }
  }

  // 3. Generate core prompt body
  const coreBody = template.buildPrompt(sanitizedInputs);

  // 4. Gather rule layers
  const ageLayer = getAgeRules(gradeLevel);
  const educationLayer = getEducationRules();
  const subjectLayer = getSubjectRules(sanitizedInputs.subject || sanitizedInputs.topic || sanitizedInputs.projectName || sanitizedInputs.researchTopic);
  const academicIntegrityLayer = getAcademicIntegrityRules(template.id);
  const outputFormatLayer = getOutputRules(template.categoryType);
  const formattingLayer = getFormattingRules(template.requireCitations);
  const safetyLayer = getSafetyRules();
  const qualityLayer = getQualityRules();

  // 5. Assemble final prompt
  let finalPrompt = `==================================================
ROLE & CORE TASK:
==================================================
${coreBody.trim()}

==================================================
PEDAGOGICAL & LEARNING CONTEXT:
==================================================
${educationLayer.trim()}
${academicIntegrityLayer.trim()}

==================================================
STUDENT LEVEL & SUBJECT RULES:
==================================================
${ageLayer.trim()}
${subjectLayer ? subjectLayer.trim() : '- No subject-specific rules required.'}

==================================================
OUTPUT FORMAT & VISUAL STANDARDS:
==================================================
${outputFormatLayer.trim()}
${formattingLayer.trim()}

==================================================
STRICT SAFETY GUARDRAILS:
==================================================
${safetyLayer.trim()}

==================================================
FINAL QUALITY VERIFICATION:
==================================================
${qualityLayer.trim()}
==================================================`;

  // 6. Calculate quality score
  const { score, breakdown } = calculateQualityScore(finalPrompt, sanitizedInputs);

  return {
    compiledPrompt: finalPrompt,
    qualityScore: score,
    breakdown
  };
}
