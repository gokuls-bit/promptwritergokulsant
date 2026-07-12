/**
 * Normalizes a student grade level string from any UI label
 * (e.g., "Middle School", "Class 10", "High School", "elementary")
 * into one of the four canonical compiler keys:
 * "elementary" | "middle" | "high" | "adult"
 *
 * @param {string} input - Raw grade level from UI or API request
 * @returns {string} - Normalized grade key
 */
export function normalizeGradeLevel(input) {
  if (!input || typeof input !== 'string') return 'middle';

  const lower = input.toLowerCase().trim();

  // Exact canonical keys (pass-through)
  if (lower === 'elementary') return 'elementary';
  if (lower === 'middle') return 'middle';
  if (lower === 'high') return 'high';
  if (lower === 'adult') return 'adult';

  // College / advanced patterns (check BEFORE high school to avoid substring collisions)
  if (
    lower.includes('college') ||
    lower.includes('university') ||
    lower === 'advanced' ||
    lower.includes('older student') ||
    lower === 'ages 16+'
  ) {
    return 'adult';
  }

  // High school / secondary (classes 9-12)  — use word-boundary-safe checks
  if (
    lower.includes('high school') ||
    lower.includes('secondary school') ||
    /\bclass\s*(9|10|11|12)\b/.test(lower) ||
    /\bgrade\s*(9|10|11|12)\b/.test(lower) ||
    lower === 'ages 14-15'
  ) {
    return 'high';
  }

  // Middle school (classes 6-8)
  if (
    lower.includes('middle school') ||
    /\bclass\s*[6-8]\b/.test(lower) ||
    /\bgrade\s*[6-8]\b/.test(lower) ||
    lower === 'ages 11-13'
  ) {
    return 'middle';
  }

  // Elementary (classes 1-5)
  if (
    lower.includes('elementary') ||
    lower.includes('primary') ||
    /\bclass\s*[1-5]\b/.test(lower) ||
    /\bgrade\s*[1-5]\b/.test(lower) ||
    lower === 'ages 8-10'
  ) {
    return 'elementary';
  }

  // Default fallback
  return 'middle';
}
