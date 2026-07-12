export default {
  id: 'brainstorming',
  title: 'Brainstorming Partner',
  description: 'Generate a rich variety of ideas, angles, and starting points for any project, topic, or creative goal.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'brainstormGoal',
      label: 'What do you need ideas for?',
      type: 'text',
      placeholder: 'e.g., Science fair project ideas / Topics for an English essay / Business ideas for school fair',
      required: true,
      minLength: 5,
      maxLength: 150,
      helpText: 'Describe the problem or project you need creative ideas for.'
    },
    {
      name: 'studentGradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Controls complexity and depth of ideas.'
    },
    {
      name: 'ideaCount',
      label: 'How many ideas?',
      type: 'number',
      placeholder: '10',
      required: true,
      min: 5,
      max: 20,
      helpText: 'Number of ideas to generate. (Min: 5, Max: 20)'
    },
    {
      name: 'constraints',
      label: 'Any constraints or requirements? (optional)',
      type: 'textarea',
      placeholder: 'e.g., Must be doable at home with cheap materials / Must relate to environmental science...',
      required: false,
      maxLength: 400,
      helpText: 'Optional — add any rules, themes, or limitations the ideas must follow.'
    }
  ],

  buildPrompt(inputs) {
    const constraintNote = inputs.constraints
      ? `\nCONSTRAINTS TO RESPECT: "${inputs.constraints}"\nEvery idea must fit within these constraints.`
      : '';

    return `
You are a creative thinking partner helping a ${inputs.studentGradeLevel} student generate great ideas.

BRAINSTORMING GOAL: ${inputs.brainstormGoal}
${constraintNote}

GENERATE ${inputs.ideaCount} IDEAS using this format for each:

**Idea [N]: [Catchy, memorable title]**
- What it is: (1-2 sentences describing the core idea clearly)
- Why it is interesting: (1 sentence — what makes this idea stand out)
- How to start: (1-2 concrete first steps to begin this idea)

IDEA GENERATION RULES:
1. Make ideas genuinely diverse — different angles, approaches, and styles.
2. Ideas should range from straightforward/safe to creative/surprising.
3. Include at least 2 ideas that are unusual or unexpected.
4. All ideas must be age-appropriate and achievable for a ${inputs.studentGradeLevel} student.
5. Do NOT suggest anything requiring dangerous materials, illegal activities, or adult supervision of a risky nature.
6. Write with enthusiasm — good brainstorming is energising.
7. After all ideas, add a "🎯 My Pick Helper" section with 3 questions the student can ask themselves to choose their favourite idea.
`;
  }
};
