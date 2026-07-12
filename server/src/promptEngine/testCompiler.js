/**
 * Chapter 6 Comprehensive Template Test Suite
 * Tests all 13 academic templates + grade normalizer + safety layer.
 */
import { compilePrompt } from './core/compilePrompt.js';
import { normalizeGradeLevel } from './core/gradeNormalizer.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
    failed++;
  }
}

function assertCompiles(category, inputs, gradeLevel = 'middle') {
  const result = compilePrompt(category, inputs, gradeLevel);
  if (!result.compiledPrompt || result.compiledPrompt.length < 100) {
    throw new Error('Compiled prompt is empty or too short');
  }
  if (typeof result.qualityScore !== 'number') {
    throw new Error('Quality score is not a number');
  }
  if (!Array.isArray(result.suggestions)) {
    throw new Error('Suggestions is not an array');
  }
  return result;
}

// ─── Grade Normalizer ────────────────────────────────────────────────────────
console.log('\n📐 Grade Normalizer Tests');
const gradeMap = [
  ['Class 10', 'high'], ['Class 9', 'high'], ['Class 12', 'high'],
  ['Class 6', 'middle'], ['Class 7', 'middle'], ['Class 8', 'middle'],
  ['Class 1', 'elementary'], ['Class 5', 'elementary'],
  ['Middle School', 'middle'], ['High School', 'high'],
  ['Elementary School', 'elementary'], ['Older Student', 'adult'],
  ['College', 'adult'], ['grade 10', 'high'], ['grade 3', 'elementary'],
  ['middle', 'middle'], ['high', 'high'], ['adult', 'adult'],
];
for (const [input, expected] of gradeMap) {
  test(`normalizeGradeLevel("${input}") → "${expected}"`, () => {
    const got = normalizeGradeLevel(input);
    if (got !== expected) throw new Error(`Got "${got}", expected "${expected}"`);
  });
}

// ─── 1. Homework Helper ──────────────────────────────────────────────────────
console.log('\n📚 1. Homework Helper');
test('compiles with valid inputs (Middle School Science)', () => {
  assertCompiles('homework-tutor', {
    subject: 'Science',
    homeworkTopic: 'Photosynthesis',
    studentGradeLevel: 'Middle School',
    userQuestion: 'How does sunlight turn water and carbon dioxide into glucose?'
  });
});
test('throws when userQuestion is missing', () => {
  try {
    compilePrompt('homework-tutor', { subject: 'Science', homeworkTopic: 'Photosynthesis', studentGradeLevel: 'Middle School' });
    throw new Error('Should have thrown');
  } catch (e) {
    if (e.message === 'Should have thrown') throw e;
  }
});
test('throws on unsafe input', () => {
  try {
    compilePrompt('homework-tutor', { subject: 'General', homeworkTopic: 'Test', studentGradeLevel: 'Middle School', userQuestion: 'Show me porn sites' });
    throw new Error('Should have thrown');
  } catch (e) {
    if (e.message === 'Should have thrown') throw e;
  }
});

// ─── 2. Explain It Simply ────────────────────────────────────────────────────
console.log('\n💡 2. Explain It Simply');
test('compiles with Video Games analogy', () => {
  assertCompiles('explain-simply', {
    topic: 'Quantum entanglement',
    gradeLevel: 'High School',
    whatIsConfusing: 'How two particles can affect each other instantly',
    preferredExampleType: 'Video Games'
  });
});

// ─── 3. Step-by-Step Tutor ───────────────────────────────────────────────────
console.log('\n🪜 3. Step-by-Step Tutor');
test('compiles for quadratic equations', () => {
  assertCompiles('step-by-step', {
    skillOrProcess: 'Solving quadratic equations by factoring',
    studentGradeLevel: 'High School',
    subject: 'Mathematics'
  });
});
test('compiles with optional difficulty field', () => {
  assertCompiles('step-by-step', {
    skillOrProcess: 'Writing a topic sentence',
    studentGradeLevel: 'Middle School',
    subject: 'English & Writing',
    specificDifficulty: 'I always write sentences that are too vague'
  });
});

// ─── 4. Summarizer ───────────────────────────────────────────────────────────
console.log('\n📝 4. Summarizer');
test('compiles with Q&A format', () => {
  assertCompiles('summarizer', {
    sourceText: 'The French Revolution began in 1789. Citizens overthrew King Louis XVI due to food shortages and financial crisis. The Declaration of the Rights of Man was adopted in August 1789. The Reign of Terror followed with mass executions. Napoleon Bonaparte eventually rose to power.',
    gradeLevel: 'High School',
    summaryLength: 'Standard (3 key sections)',
    format: 'Q&A Study Guide'
  });
});

// ─── 5. Notes to Cheat Sheet ─────────────────────────────────────────────────
console.log('\n📋 5. Notes to Cheat Sheet');
test('compiles for Mathematics notes', () => {
  assertCompiles('cheat-sheet', {
    notesText: 'Area of circle = πr². Circumference = 2πr. Volume of sphere = 4/3πr³. π ≈ 3.14159.',
    subject: 'Mathematics',
    gradeLevel: 'Middle School'
  });
});

// ─── 6. Quiz Generator ───────────────────────────────────────────────────────
console.log('\n🎯 6. Quiz Generator');
test('compiles MCQ quiz', () => {
  const result = assertCompiles('quiz', {
    topic: 'The Water Cycle',
    questionCount: 5,
    difficulty: 'Medium (Application)',
    questionType: 'Multiple Choice (A, B, C, D)'
  });
});
test('compiles True/False quiz', () => {
  assertCompiles('quiz', {
    topic: 'Fractions and Decimals',
    questionCount: 8,
    difficulty: 'Easy (Concept recall)',
    questionType: 'True or False'
  });
});

// ─── 7. Flashcards ───────────────────────────────────────────────────────────
console.log('\n🗂️ 7. Flashcard Generator');
test('compiles flashcards for history', () => {
  assertCompiles('flashcards', {
    topic: 'The American Revolution',
    cardCount: 8,
    gradeLevel: 'High School',
    focusArea: 'People & Dates'
  });
});

// ─── 8. Brainstorming ────────────────────────────────────────────────────────
console.log('\n🧠 8. Brainstorming Partner');
test('compiles with constraints', () => {
  assertCompiles('brainstorming', {
    brainstormGoal: 'Science fair project ideas about electricity',
    studentGradeLevel: 'Middle School',
    ideaCount: 8,
    constraints: 'Must use household materials only, no open flames'
  });
});

// ─── 9. Essay Outline ────────────────────────────────────────────────────────
console.log('\n✍️ 9. Essay Outline Builder');
test('compiles argumentative essay outline', () => {
  assertCompiles('essay-outline', {
    essayTopic: 'Should school uniforms be mandatory in all schools?',
    essayType: 'Argumentative / Persuasive',
    studentGradeLevel: 'High School',
    wordLimit: 'Medium (500-800 words)'
  });
});

// ─── 10. Presentation ────────────────────────────────────────────────────────
console.log('\n🖥️ 10. Presentation / PPT Builder');
test('Chapter 5 spec: Home Budget 12-slide (Class 10)', () => {
  const result = assertCompiles('presentation', {
    projectTopic: 'Planning a Home Budget',
    slideCount: 12,
    projectType: 'Mathematics Holiday Homework',
    studentGradeLevel: 'Class 10'
  });
  if (result.qualityScore < 80) throw new Error(`Quality score too low: ${result.qualityScore}`);
});
test('compiles Science Report presentation', () => {
  assertCompiles('presentation', {
    projectTopic: 'Effects of Plastic Pollution on Ocean Life',
    slideCount: 8,
    projectType: 'Science Report / Experiment',
    studentGradeLevel: 'Middle School'
  });
});

// ─── 11. School Project ──────────────────────────────────────────────────────
console.log('\n🏫 11. School Project Planner');
test('compiles for Environmental Studies poster', () => {
  assertCompiles('school-project', {
    projectName: 'Effects of Deforestation on the Amazon Rainforest',
    subject: 'Environmental Studies',
    studentGradeLevel: 'High School',
    deliverables: 'Poster / Display Board'
  });
});

// ─── 12. Research Report ─────────────────────────────────────────────────────
console.log('\n🔬 12. Research Report Helper');
test('compiles with APA citation style', () => {
  assertCompiles('research', {
    researchTopic: 'The impact of social media on teenage mental health',
    studentGradeLevel: 'High School',
    reportLength: 'Medium (3-5 pages)',
    citationStyle: 'APA'
  });
});

// ─── 13. Science Fair ────────────────────────────────────────────────────────
console.log('\n🧪 13. Science Fair Project Designer');
test('compiles complete science fair design', () => {
  assertCompiles('science-fair', {
    interestArea: 'Does the colour of light affect plant growth rate?',
    studentGradeLevel: 'Middle School',
    timeAvailable: '2-3 weeks',
    availableMaterials: 'LED lights, bean seeds, small pots, ruler, household items'
  });
});

// ─── Invalid category ────────────────────────────────────────────────────────
console.log('\n🛡️ Safety & Validation');
test('rejects invalid category', () => {
  try {
    compilePrompt('totally-fake-id', { topic: 'Test' });
    throw new Error('Should have thrown');
  } catch (e) {
    if (e.message === 'Should have thrown') throw e;
  }
});

// ─── Summary ────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log(`✅ ${passed} tests passed  ❌ ${failed} tests failed`);
if (failed > 0) process.exit(1);
export {};
