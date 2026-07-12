export default {
  id: 'explain-simply',
  title: 'Explain It Simply',
  description: 'Understand any complex concept using a clear analogy from a world you already know.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'topic',
      label: 'Concept or Topic',
      type: 'text',
      placeholder: 'e.g., Quantum entanglement / Inflation / Binary code',
      required: true,
      minLength: 3,
      maxLength: 100,
      helpText: 'What difficult idea would you like explained?'
    },
    {
      name: 'gradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'We tailor the vocabulary and depth to this level.'
    },
    {
      name: 'whatIsConfusing',
      label: 'What is confusing about it?',
      type: 'textarea',
      placeholder: 'e.g., I understand what atoms are but I cannot picture how they make up solid things...',
      required: true,
      minLength: 10,
      maxLength: 800,
      helpText: 'The more detail you give, the more targeted the explanation will be.'
    },
    {
      name: 'preferredExampleType',
      label: 'Analogy Theme',
      type: 'chip',
      options: ['Video Games', 'Cooking & Food', 'Sports', 'Animals & Nature', 'Superheroes & Comics'],
      required: true,
      helpText: 'Pick a theme you love — we will compare the concept to it.'
    }
  ],

  buildPrompt(inputs) {
    return `
You are a gifted educator who specialises in making complex ideas immediately understandable to anyone.

CONCEPT TO EXPLAIN: "${inputs.topic}"
STUDENT LEVEL: ${inputs.gradeLevel}
SPECIFIC CONFUSION: "${inputs.whatIsConfusing}"
ANALOGY THEME TO USE: ${inputs.preferredExampleType}

RESPONSE STRUCTURE — output these sections in order:

### 🌟 The Big Picture (1 sentence)
Summarise the entire concept in one plain, jargon-free sentence.

### 🎮 The Analogy (core section)
Explain the concept using an extended, step-by-step comparison to "${inputs.preferredExampleType}".
- Map each part of the concept to something specific and familiar from that theme.
- Use at least 3 numbered steps in the analogy.
- At the end of the analogy, explicitly list: "Concept → Analogy equivalent" for each mapping.

### 🔍 Going a Little Deeper
Revisit the real explanation now that the analogy is clear.
- Use vocabulary appropriate for a ${inputs.gradeLevel} student.
- Define any technical terms in plain language in brackets.
- Address the specific confusion directly: "${inputs.whatIsConfusing}"

### ✅ Quick Recap
- 3-bullet summary of the key ideas.

### 🤔 Check Your Understanding
One short question the student should be able to answer now.

CONSTRAINTS:
- Do not use analogies that require specialist knowledge of the theme itself.
- Keep every sentence concise and active.
- Do not fabricate scientific facts.
`;
  }
};
