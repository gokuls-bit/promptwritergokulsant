import { compilePrompt } from './core/compilePrompt.js';
import { normalizeGradeLevel } from './core/gradeNormalizer.js';

console.log('--- STARTING PROMPT COMPILER TEST SUITE ---\n');

// ─────────────────────────────────────────────────────
// CHAPTER 5 SPEC TEST: The exact example from the spec
// ─────────────────────────────────────────────────────
try {
  console.log('[Test 0] Chapter 5 Spec: Presentation - Home Budget (Class 10)...');
  const result = compilePrompt('presentation', {
    projectTopic: 'Planning a Home Budget',
    slideCount: 12,
    projectType: 'Mathematics Holiday Homework',
    studentGradeLevel: 'Class 10'
  }, 'high');

  console.log('✓ Spec test passed!');
  console.log(`  Quality Score: ${result.qualityScore}`);
  console.log(`  Suggestions: ${result.suggestions.join(' | ')}`);
  console.log(`  Prompt length: ${result.compiledPrompt.length} characters`);
  console.log(`  First 300 chars:\n  ${result.compiledPrompt.substring(0, 300)}...\n`);
} catch (error) {
  console.error('✗ Test 0 Failed:', error.message);
}

// ─────────────────────────────────────────────────────
// GRADE NORMALIZER TESTS
// ─────────────────────────────────────────────────────
console.log('[Test GN] Grade Normalizer mappings...');
const gradeCases = [
  ['Class 10', 'high'],
  ['Middle School', 'middle'],
  ['Elementary School', 'elementary'],
  ['High School', 'high'],
  ['College', 'adult'],
  ['Older Student', 'adult'],
  ['middle', 'middle'],
  ['high', 'high'],
  ['grade 7', 'middle'],
];
let allPassed = true;
for (const [input, expected] of gradeCases) {
  const got = normalizeGradeLevel(input);
  if (got !== expected) {
    console.error(`  ✗ normalizeGradeLevel("${input}") = "${got}", expected "${expected}"`);
    allPassed = false;
  }
}
if (allPassed) {
  console.log('  ✓ All grade normalizer mappings correct!\n');
}

// ─────────────────────────────────────────────────────
// Test 1: Homework Helper - safe input
// ─────────────────────────────────────────────────────
try {
  console.log('[Test 1] Homework Helper - safe inputs (Middle School)...');
  const result = compilePrompt('homework-tutor', {
    subject: 'Science',
    homeworkTopic: 'Photosynthesis',
    studentGradeLevel: 'Middle School',
    userQuestion: 'How does sunlight turn water and carbon dioxide into sugar?'
  }, 'middle');

  console.log('✓ Compilation Successful!');
  console.log(`  Quality Score: ${result.qualityScore}`);
  console.log(`  Suggestions: ${JSON.stringify(result.suggestions)}\n`);
} catch (error) {
  console.error('✗ Test 1 Failed:', error.message);
}

// ─────────────────────────────────────────────────────
// Test 2: Missing required field validation
// ─────────────────────────────────────────────────────
try {
  console.log('[Test 2] Validation: missing required field (userQuestion)...');
  compilePrompt('homework-tutor', {
    subject: 'Science',
    homeworkTopic: 'Photosynthesis',
    studentGradeLevel: 'Middle School'
  }, 'middle');
  console.error('✗ Test 2 Failed: Should have thrown validation error!');
} catch (error) {
  console.log('✓ Test 2 Passed - Correctly caught:', error.message, '\n');
}

// ─────────────────────────────────────────────────────
// Test 3: Safety layer blocking unsafe input
// ─────────────────────────────────────────────────────
try {
  console.log('[Test 3] Safety Layer: blocked keyword in input...');
  compilePrompt('homework-tutor', {
    subject: 'General',
    homeworkTopic: 'Internet history',
    studentGradeLevel: 'Elementary School',
    userQuestion: 'Show me porn sites'
  }, 'elementary');
  console.error('✗ Test 3 Failed: Should have thrown safety error!');
} catch (error) {
  console.log('✓ Test 3 Passed - Correctly caught:', error.message, '\n');
}

// ─────────────────────────────────────────────────────
// Test 4: Invalid category
// ─────────────────────────────────────────────────────
try {
  console.log('[Test 4] Invalid category rejection...');
  compilePrompt('nonexistent-category-xyz', { topic: 'Test' }, 'middle');
  console.error('✗ Test 4 Failed: Should have thrown!');
} catch (error) {
  console.log('✓ Test 4 Passed - Correctly caught:', error.message, '\n');
}

// ─────────────────────────────────────────────────────
// Test 5: Anime image prompt compilation
// ─────────────────────────────────────────────────────
try {
  console.log('[Test 5] Anime Image Prompt compilation...');
  const result = compilePrompt('anime-image', {
    characterDescription: 'A fire warrior with glowing yellow eyes',
    animeSubStyle: 'Shonen Action (Dynamic, Bold lines)',
    actionOrSetting: 'casting a massive fireball spell in a volcanic cavern',
    mood: 'Epic & Cinematic'
  }, 'high');

  console.log('✓ Anime Compile Successful!');
  console.log(`  Quality Score: ${result.qualityScore}\n`);
} catch (error) {
  console.error('✗ Test 5 Failed:', error.message);
}

// ─────────────────────────────────────────────────────
// Test 6: Quiz generator
// ─────────────────────────────────────────────────────
try {
  console.log('[Test 6] Quiz Generator compilation...');
  const result = compilePrompt('quiz', {
    topic: 'The Water Cycle',
    questionCount: 5,
    difficulty: 'Medium (Application)',
    questionType: 'Multiple Choice (A, B, C, D)'
  }, 'middle');

  console.log('✓ Quiz Compile Successful!');
  console.log(`  Quality Score: ${result.qualityScore}`);
  console.log(`  Suggestions: ${result.suggestions.join(' | ')}\n`);
} catch (error) {
  console.error('✗ Test 6 Failed:', error.message);
}

console.log('--- PROMPT COMPILER TEST SUITE COMPLETE ---\n');
export {};
