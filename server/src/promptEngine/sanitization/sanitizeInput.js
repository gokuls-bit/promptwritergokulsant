import { detectUnsafeInput } from './detectUnsafeInput.js';

/**
 * Sanitizes and validates all prompt inputs from a request.
 * @param {object} inputs - The key-value inputs from the user
 * @returns {object} - The sanitized input object
 * @throws {Error} - If unsafe content is detected
 */
export function sanitizeInput(inputs) {
  if (!inputs || typeof inputs !== 'object') {
    return {};
  }

  const sanitized = {};

  for (const [key, value] of Object.entries(inputs)) {
    if (typeof value === 'string') {
      // 1. Safety check
      const safetyCheck = detectUnsafeInput(value);
      if (!safetyCheck.safe) {
        throw new Error(safetyCheck.reason);
      }

      // 2. Strip HTML tags to avoid HTML/Script injection
      let cleaned = value.replace(/<\/?[^>]+(>|$)/g, '');

      // 3. Length constraints (limit to 2000 chars per field)
      if (cleaned.length > 2000) {
        cleaned = cleaned.substring(0, 2000);
      }

      sanitized[key] = cleaned.trim();
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
