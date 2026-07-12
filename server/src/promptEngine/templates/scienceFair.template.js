export default {
  id: 'science-fair',
  title: 'Science Fair Idea Generator',
  description: 'Generate safe, cool, and structured science experiments with hypotheses and variable plans.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'interestArea',
      label: 'Scientific Topic of Interest',
      type: 'text',
      placeholder: 'e.g., Magnetism / Plant growth / Water filters / Baking chemistry',
      required: true
    },
    {
      name: 'difficultyLevel',
      label: 'Difficulty & Scale',
      type: 'select',
      options: ['Easy (Done in 1-2 days)', 'Medium (Takes 1 week)', 'Advanced (Needs multiple weeks)'],
      required: true
    },
    {
      name: 'setupLocation',
      label: 'Where will you do it?',
      type: 'select',
      options: ['At Home (Kitchen/Garden)', 'In the Classroom Lab', 'Outdoors'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a science fair advisor. Propose a structured, safe science experiment for a student.

INTEREST:
${inputs.interestArea}

LEVEL:
${inputs.difficultyLevel}

LOCATION:
${inputs.setupLocation}

INSTRUCTIONS:
1. Propose one specific, catchy experiment title.
2. Formulate the "Hypothesis" (If-Then statement) the student will test.
3. Define the experiment variables:
   - Independent Variable (what you change)
   - Dependent Variable (what you measure)
   - Control Variables (what stays the same)
4. List materials needed (accessible, everyday items).
5. Outline the experimental procedure steps.
6. Provide a "Safety Checklist" outlining safety rules for the experiment.
`;
  }
};
