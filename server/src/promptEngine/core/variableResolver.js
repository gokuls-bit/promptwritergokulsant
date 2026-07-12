/**
 * Safely resolves placeholder variables inside a template string without using eval().
 * Supports both double curly braces (e.g., {{variableName}}) and standard JS-like template placeholders (e.g., ${variableName}).
 * 
 * @param {string} templateText - The template string with placeholder variables
 * @param {object} variables - Key-value pair variables to interpolate
 * @returns {string} - The fully resolved string
 */
export function resolveVariables(templateText, variables = {}) {
  if (!templateText || typeof templateText !== 'string') {
    return '';
  }

  let resolved = templateText;

  // Replace {{variableName}} placeholders
  resolved = resolved.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : '';
  });

  // Replace ${variableName} placeholders
  resolved = resolved.replace(/\$\{\s*([a-zA-Z0-9_]+)\s*\}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : '';
  });

  return resolved;
}
