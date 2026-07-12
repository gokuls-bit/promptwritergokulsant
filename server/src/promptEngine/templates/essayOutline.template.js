export default {
  id: 'essay-outline',
  title: 'Essay Outline Builder',
  description: 'Build a detailed structured outline for any essay — from your thesis to your conclusion arguments.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'essayTopic',
      label: 'Essay Topic or Question',
      type: 'text',
      placeholder: 'e.g., "The causes of World War I" / "Should school uniforms be mandatory?"',
      required: true,
      minLength: 5,
      maxLength: 200,
      helpText: 'Paste the exact essay prompt or topic you have been given.'
    },
    {
      name: 'essayType',
      label: 'Essay Type',
      type: 'select',
      options: ['Argumentative / Persuasive', 'Expository / Informative', 'Compare & Contrast', 'Cause & Effect', 'Narrative / Personal', 'Analytical / Critical'],
      required: true,
      helpText: 'Select the essay format your teacher has asked for.'
    },
    {
      name: 'studentGradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Controls depth of argument and expected sophistication.'
    },
    {
      name: 'wordLimit',
      label: 'Approximate Word Limit',
      type: 'select',
      options: ['Short (200-400 words)', 'Medium (500-800 words)', 'Long (900-1500 words)', 'Extended (1500+ words)'],
      required: true,
      helpText: 'What word count has your teacher set?'
    }
  ],

  buildPrompt(inputs) {
    return `
You are an expert writing coach helping a ${inputs.studentGradeLevel} student build a strong essay outline.
Your job is to scaffold the essay structure — NOT to write the essay for the student.

ESSAY TOPIC / QUESTION: "${inputs.essayTopic}"
ESSAY TYPE: ${inputs.essayType}
STUDENT LEVEL: ${inputs.studentGradeLevel}
TARGET LENGTH: ${inputs.wordLimit}

CRITICAL — ACADEMIC INTEGRITY:
You are building an OUTLINE only. Do not write complete paragraphs or finished sentences for the body sections.
The student must write the actual content themselves using this outline as their roadmap.

PROVIDE THE FOLLOWING OUTLINE SECTIONS:

### 📝 Understanding the Question
- Restate the essay question in your own words (what is it actually asking?).
- Identify the key instruction word (e.g., "analyse", "argue", "describe") and explain what it requires.
- List 2-3 key concepts the student must understand to answer this well.

### 💡 Thesis Statement Draft
Write 1-2 example thesis sentences the student can adapt. The thesis must directly answer the question.

### 🏗️ Essay Structure Plan (${inputs.essayType})

**Introduction** (approximate ${inputs.wordLimit === 'Short (200-400 words)' ? '50-70' : inputs.wordLimit === 'Medium (500-800 words)' ? '80-120' : '100-150'} words)
- Hook idea suggestion (interesting fact, question, or quote to open with)
- Background context to establish (list 2-3 context points)
- Thesis placement

**Body Paragraph 1**
- Argument / Main Point: [suggest the strongest point to make here]
- Evidence needed: [what kind of facts, quotes, or examples to find]
- Analysis direction: [how to connect the evidence back to the thesis]

**Body Paragraph 2**
- Argument / Main Point: [second distinct angle]
- Evidence needed:
- Analysis direction:

**Body Paragraph 3** (if medium/long essay)
- Argument / Main Point:
- Evidence needed:
- Analysis direction:

${inputs.essayType === 'Argumentative / Persuasive' ? '**Counter-Argument Paragraph**\n- Acknowledge the opposing view briefly\n- Refutation strategy: [suggest how to rebut it]\n\n' : ''}**Conclusion**
- How to restate the thesis (without copying it word-for-word)
- 3 points to summarise
- Memorable closing thought suggestion

### ✅ Checklist Before Writing
- [ ] Do I understand what the question is asking?
- [ ] Is my thesis a clear, debatable/focused claim?
- [ ] Does every body paragraph relate back to the thesis?
- [ ] Have I planned evidence for every argument?
- [ ] Is my conclusion doing more than just repeating the introduction?
`;
  }
};
