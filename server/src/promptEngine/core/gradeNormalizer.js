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

  // Explicit canonical keys (pass-through)
  if (lower === 'elementary') return 'elementary';
  if (lower === 'middle') return 'middle';
  if (lower === 'high') return 'high';
  if (lower === 'adult') return 'adult';

  // Elementary patterns
  if (
    lower.includes('elementary') ||
    lower.includes('primary') ||
    lower.includes('class 1') ||
    lower.includes('class 2') ||
    lower.includes('class 3') ||
    lower.includes('class 4') ||
    lower.includes('class 5') ||
    lower.includes('grade 1') ||
    lower.includes('grade 2') ||
    lower.includes('grade 3') ||
    lower.includes('grade 4') ||
    lower.includes('grade 5') ||
    lower === 'ages 8-10'
  ) {
    return 'elementary';
  }

  // Middle school patterns
  if (
    lower.includes('middle school') ||
    lower.includes('class 6') ||
    lower.includes('class 7') ||
    lower.includes('class 8') ||
    lower.includes('grade 6') ||
    lower.includes('grade 7') ||
    lower.includes('grade 8') ||
    lower === 'ages 11-13'
  ) {
    return 'middle';
  }

  // High school patterns
  if (
    lower.includes('high school') ||
    lower.includes('secondary school') ||
    lower.includes('class 9') ||
    lower.includes('class 10') ||
    lower.includes('class 11') ||
    lower.includes('class 12') ||
    lower.includes('grade 9') ||
    lower.includes('grade 10') ||
    lower.includes('grade 11') ||
    lower.includes('grade 12') ||
    lower === 'ages 14-15'
  ) {
    return 'high';
  }

  // College / advanced patterns
  if (
    lower.includes('college') ||
    lower.includes('university') ||
    lower.includes('advanced') ||
    lower.includes('older student') ||
    lower.includes('adult') ||
    lower === 'ages 16+'
  ) {
    return 'adult';
  }

  // Default fallback
  return 'middle';
}
