export default {
  id: 'explain-simply',
  title: 'Explain It Simply',
  description: 'Explain a complex concept using a fun, simple analogy (like video games, cooking, or sports).',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'topic',
      label: 'Concept/Topic',
      type: 'text',
      placeholder: 'e.g., Quantum physics, inflation, binary code',
      required: true,
      minLength: 3,
      maxLength: 100,
      helpText: 'What is the difficult idea you want explained?'
    },
    {
      name: 'gradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'We will tailor the vocabulary to this school level.'
    },
    {
      name: 'whatIsConfusing',
      label: 'What is confusing about it?',
      type: 'textarea',
      placeholder: 'e.g., I do not understand how the parts connect / how it fits together...',
      required: true,
      minLength: 5,
      maxLength: 500,
      helpText: 'Tell us exactly what part is giving you trouble.'
    },
    {
      name: 'preferredExampleType',
      label: 'Choose an Analogy Style',
      type: 'chip',
      options: ['Video Games', 'Cooking & Food', 'Sports', 'Animals & Nature', 'Superheroes'],
      required: true,
      helpText: 'Pick a theme you understand well so we can compare the concept to it.'
    }
  ],
  buildPrompt(inputs) {
    return `
You are a creative educator who specializes in explaining difficult things simply. Explain:
TOPIC: "${inputs.topic}"
GRADE LEVEL: ${inputs.gradeLevel}
WHAT IS CONFUSING: "${inputs.whatIsConfusing}"

INSTRUCTIONS:
1. Explain this concept using a central, extended analogy based on the theme of "${inputs.preferredExampleType}".
2. Adapt vocabulary to suit a ${inputs.gradeLevel} student.
3. Divide the response into:
   - "The Big Picture" (One sentence summary)
   - "The Analogy Explained" (Step-by-step comparison to ${inputs.preferredExampleType})
   - "Let's Check" (One easy check question)
`;
  }
};
