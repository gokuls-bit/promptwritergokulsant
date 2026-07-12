import { templates } from './templateRegistry.js';
import { sanitizeInput } from '../sanitization/sanitizeInput.js';
import { resolveVariables } from './variableResolver.js';
import { normalizeGradeLevel } from './gradeNormalizer.js';
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
 * Pipeline-based compiler that builds structured, safe prompts.
 * Follows the 13 steps defined in Chapter 5.
 * 
 * @param {string} categoryId - The template category identifier
 * @param {object} rawInputs - Key-value pair inputs from the client
 * @param {string} studentGradeLevel - Target grade level (elementary, middle, high, adult)
 * @returns {object} - { compiledPrompt, qualityScore, suggestions }
 */
export function compilePrompt(categoryId, rawInputs = {}, studentGradeLevel = 'middle') {
  const suggestions = [];

  // Step 1: Validate category existence
  const template = templates[categoryId];
  if (!template) {
    throw new Error(`Category "${categoryId}" is invalid or not registered in our registry.`);
  }

  // Step 2: Validate required fields
  for (const field of template.fields) {
    if (field.required && (rawInputs[field.name] === undefined || rawInputs[field.name] === null || rawInputs[field.name] === '')) {
      throw new Error(`The field "${field.label}" is required.`);
    }
  }

  // Step 3: Normalize input values (e.g. clamp numeric slide counts, clean spaces)
  const normalizedInputs = { ...rawInputs };
  for (const field of template.fields) {
    const val = normalizedInputs[field.name];
    if (field.type === 'number' && val !== undefined && val !== '') {
      let num = parseInt(val, 10);
      if (isNaN(num)) num = field.min || 1;
      if (field.min !== undefined && num < field.min) num = field.min;
      if (field.max !== undefined && num > field.max) num = field.max;
      normalizedInputs[field.name] = num;
    }
  }

  // Step 4: Sanitize input (uses Layer 2 blocked terms blocklist check)
  const sanitizedInputs = sanitizeInput(normalizedInputs);

  // Step 5: Find template in registry (obtained in step 1 as template)

  // Step 6: Apply category template & resolve variables safely
  let coreBody = template.buildPrompt(sanitizedInputs);
  // Safely interpolate any remaining raw placeholders
  coreBody = resolveVariables(coreBody, sanitizedInputs);

  // Step 7: Inject age/education rules
  // Normalize grade from any UI label (e.g. "Class 10", "Middle School") to compiler key
  const rawGrade = sanitizedInputs.studentGradeLevel || sanitizedInputs.gradeLevel || studentGradeLevel;
  const finalGrade = normalizeGradeLevel(rawGrade);
  const ageLayer = getAgeRules(finalGrade);
  const educationLayer = getEducationRules();

  // Step 8: Inject subject rules when available
  const subjectTerm = sanitizedInputs.subject || sanitizedInputs.topic || sanitizedInputs.projectTopic || sanitizedInputs.projectName || sanitizedInputs.researchTopic || '';
  const subjectLayer = getSubjectRules(subjectTerm);

  // Step 9: Inject formatting rules
  const formattingLayer = getFormattingRules(template.requireCitations);

  // Step 10: Inject academic-integrity rules when applicable
  const academicIntegrityLayer = getAcademicIntegrityRules(template.id);

  // Step 11: Inject safety constraints
  const safetyLayer = getSafetyRules();

  // Step 12: Inject final quality checklist
  const qualityLayer = getQualityRules();

  // Step 13: Assemble prompt & compute quality score + suggestions
  const outputFormatLayer = getOutputRules(template.categoryType);

  const finalPrompt = `==================================================
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

  const { score } = calculateQualityScore(finalPrompt, sanitizedInputs);

  // Generate constructive suggestions dynamically based on details
  let totalTextLength = 0;
  for (const val of Object.values(sanitizedInputs)) {
    if (typeof val === 'string') totalTextLength += val.length;
  }

  if (totalTextLength < 40) {
    suggestions.push('Add more detail to your topic input for a richer context.');
  }
  if (!sanitizedInputs.subject && categoryId === 'homework-tutor') {
    suggestions.push('Provide a specific class subject to get custom mathematical or scientific equations rules.');
  }
  if (categoryId === 'presentation' && sanitizedInputs.slideCount < 6) {
    suggestions.push('Increase your slide count to 8 or 10 slides for deeper, more comprehensive coverage.');
  }
  if (categoryId === 'trading-card' && String(sanitizedInputs.mainAbility).length < 20) {
    suggestions.push('Expand your character\'s special move details to generate cooler ability stats.');
  }

  if (suggestions.length === 0) {
    suggestions.push('Great prompt! You have filled out all the details. Copy it to ChatGPT or Gemini!');
  }

  return {
    compiledPrompt: finalPrompt,
    qualityScore: score,
    suggestions
  };
}
