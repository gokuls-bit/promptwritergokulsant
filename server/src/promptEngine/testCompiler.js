import { compilePrompt } from './core/compilePrompt.js';
import { templates } from './core/templateRegistry.js';

console.log('--- STARTING PROMPT COMPILER TEST ---');

// Test case 1: Successful compilation of homework helper
try {
  console.log('\n[Test 1] Testing Homework Helper compilation with safe inputs...');
  const result = compilePrompt('homework-tutor', {
    subject: 'Science',
    homeworkTopic: 'Photosynthesis',
    userQuestion: 'How does sunlight turn water and carbon dioxide into sugar?'
  }, 'middle');

  console.log('✓ Compilation Successful!');
  console.log(`Quality Score: ${result.qualityScore}`);
  console.log('Breakdown:', JSON.stringify(result.breakdown, null, 2));
  console.log('\nFirst 200 characters of compiled prompt:');
  console.log(result.compiledPrompt.substring(0, 300) + '...\n');
} catch (error) {
  console.error('✗ Test 1 Failed:', error.message);
}

// Test case 2: Validation check (missing required field)
try {
  console.log('[Test 2] Testing field validation (missing userQuestion)...');
  compilePrompt('homework-tutor', {
    subject: 'Science',
    homeworkTopic: 'Photosynthesis'
  }, 'middle');
  console.error('✗ Test 2 Failed: Should have thrown validation error!');
} catch (error) {
  console.log('✓ Test 2 Passed: Correctly caught error:', error.message);
}

// Test case 3: Unsafe input detection (Layer 2 safety check)
try {
  console.log('\n[Test 3] Testing Safety Layer with blocked keyword (porn)...');
  compilePrompt('homework-tutor', {
    subject: 'General',
    homeworkTopic: 'Internet history',
    userQuestion: 'Show me porn sites'
  }, 'elementary');
  console.error('✗ Test 3 Failed: Should have thrown safety error!');
} catch (error) {
  console.log('✓ Test 3 Passed: Correctly caught safety breach:', error.message);
}

// Test case 4: Anime prompt compiler check
try {
  console.log('\n[Test 4] Testing Anime Image Prompt compilation...');
  const result = compilePrompt('anime-image', {
    characterDescription: 'A fire warrior with glowing yellow eyes',
    animeSubStyle: 'Shonen Action (Dynamic, Bold lines)',
    actionOrSetting: 'casting a massive fireball spell in a volcanic cavern',
    mood: 'Epic & Cinematic'
  }, 'high');

  console.log('✓ Anime Compile Successful!');
  console.log(`Quality Score: ${result.qualityScore}`);
} catch (error) {
  console.error('✗ Test 4 Failed:', error.message);
}

console.log('\n--- PROMPT COMPILER TEST COMPLETED ---');
export {};
