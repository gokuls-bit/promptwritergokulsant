export default {
  id: 'cheat-sheet',
  title: 'Notes to Cheat Sheet',
  description: 'Convert a wall of notes into a compact, scannable reference card you can use to study before a test.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'notesText',
      label: 'Your Notes or Key Content',
      type: 'textarea',
      placeholder: 'Paste your class notes, textbook snippets, or a topic outline here...',
      required: true,
      minLength: 20,
      maxLength: 3000,
      helpText: 'Paste the raw content you want turned into a revision card.'
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'select',
      options: ['Mathematics', 'Science', 'History & Social Studies', 'English & Literature', 'Geography', 'Computer Science', 'General'],
      required: true,
      helpText: 'Helps apply the right formatting style for the subject.'
    },
    {
      name: 'gradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Adjusts vocabulary and depth.'
    }
  ],

  buildPrompt(inputs) {
    return `
You are an expert at distilling complex information into clear, exam-ready revision cards.

SUBJECT: ${inputs.subject}
STUDENT LEVEL: ${inputs.gradeLevel}

SOURCE NOTES:
"""
${inputs.notesText}
"""

CREATE A CHEAT SHEET using this structure:

# [Topic Name] — Quick Reference Card

## ⚡ Key Definitions
| Term | Plain-English Definition |
|------|--------------------------|
| ... | ... |

## 📌 Core Concepts (3-7 bullet points, one idea per bullet)
- ...

## 🔢 Formulas / Dates / Key Facts (only if relevant to the subject)
- ...

## 🔗 How It Connects (optional — show how concepts link to each other)
- ...

## 🚨 Common Mistakes to Avoid
- ...

## 🎯 Three Things to Remember for the Exam
1. ...
2. ...
3. ...

RULES:
- Only use facts from the provided source notes — do NOT add new invented information.
- Keep every line short and scannable — this is a reference card, not an essay.
- Use bold, tables, and bullet points for maximum visual clarity.
- Simplify vocabulary for a ${inputs.gradeLevel} student.
`;
  }
};
