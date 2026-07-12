export default {
  id: 'step-by-step',
  title: 'Step-by-Step Tutor',
  description: 'Break any process, skill, or technique into clear numbered steps you can follow and practice.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'skillOrProcess',
      label: 'Skill or Process to Learn',
      type: 'text',
      placeholder: 'e.g., Solving quadratic equations / Writing a topic sentence / Balancing chemical equations',
      required: true,
      minLength: 5,
      maxLength: 120,
      helpText: 'What skill or process do you want broken down step by step?'
    },
    {
      name: 'studentGradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Controls vocabulary and depth of explanations.'
    },
    {
      name: 'subject',
      label: 'Subject Area',
      type: 'select',
      options: ['Mathematics', 'Science', 'English & Writing', 'History', 'Geography', 'Computer Science', 'Art & Music', 'General'],
      required: true,
      helpText: 'Choose the subject this skill belongs to.'
    },
    {
      name: 'specificDifficulty',
      label: 'Where are you getting stuck? (optional)',
      type: 'textarea',
      placeholder: 'e.g., I understand step 1 but get confused at step 3 when I need to factorise...',
      required: false,
      maxLength: 600,
      helpText: 'Optional — tell us where you lose the thread and we will focus extra attention there.'
    }
  ],

  buildPrompt(inputs) {
    const difficultyNote = inputs.specificDifficulty
      ? `\nSTUDENT'S SPECIFIC DIFFICULTY: "${inputs.specificDifficulty}"\nPay special attention to this point and slow down the explanation at this stage.`
      : '';

    return `
You are a master teacher who specialises in breaking processes into precise, learnable steps.

SKILL / PROCESS: ${inputs.skillOrProcess}
SUBJECT: ${inputs.subject}
STUDENT LEVEL: ${inputs.studentGradeLevel}
${difficultyNote}

RESPONSE STRUCTURE:

### Overview
One sentence explaining what this process achieves and why it matters.

### Prerequisites
A bullet list of 2-4 things the student should already know before starting.

### Step-by-Step Instructions
Number every step. For each step:
- **Step N: [Clear action title]**
  - What to do (imperative, precise language).
  - Why this step is necessary (1 sentence).
  - Common mistake to avoid at this step (if applicable).
  - Example showing the step applied to a worked sample problem.

### Worked Example (end-to-end)
Apply every step from start to finish on one complete, realistic example, clearly labelling each step.

### Practice It Yourself
One similar problem for the student to try independently (do NOT provide the answer inline — put it in a separate "Answer" spoiler section at the bottom).

RULES:
- Vocabulary must match a ${inputs.studentGradeLevel} student.
- Never skip or bundle steps together without explanation.
- Show all working and intermediate values in mathematical or scientific steps.
- Bold all key terms on first use.
`;
  }
};
