import { BLOCKED_KEYWORDS, BLOCKED_PATTERNS } from './blockedTerms.js';

/**
 * Checks if a string contains unsafe keywords or patterns.
 * @param {string} text - The input text to check
 * @returns {object} - { safe: boolean, reason: string | null }
 */
export function detectUnsafeInput(text) {
  if (!text || typeof text !== 'string') {
    return { safe: true };
  }

  const cleanedText = text.toLowerCase().trim();

  // Check exact/partial keyword matches
  for (const word of BLOCKED_KEYWORDS) {
    // Check if the word appears as a standalone word or sub-word (depending on safety strictness)
    // To prevent false positives (like "associate" for "ass"), we use word boundaries when possible, 
    // but for child safety, we err on the side of caution.
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(cleanedText)) {
      return {
        safe: false,
        reason: `Your input contains an inappropriate term: "${word}". Let's keep things clean and helpful for school!`
      };
    }
  }

  // Check regex patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(cleanedText)) {
      return {
        safe: false,
        reason: 'Your input matches a safety filter. Let\'s make sure we focus on school-friendly topics!'
      };
    }
  }

  return { safe: true };
}
