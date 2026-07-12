export default {
  id: 'science-fair',
  title: 'Science Fair Project Designer',
  description: 'Design a complete, original science fair experiment with hypothesis, method, variables, and safety notes.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'interestArea',
      label: 'Area of Interest',
      type: 'text',
      placeholder: 'e.g., Plants and light / Bridges and weight / Water filtration / Sound waves',
      required: true,
      minLength: 3,
      maxLength: 100,
      helpText: 'What general topic or phenomenon are you curious about?'
    },
    {
      name: 'studentGradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Controls experiment complexity and required analysis depth.'
    },
    {
      name: 'availableMaterials',
      label: 'What materials do you have access to? (optional)',
      type: 'textarea',
      placeholder: 'e.g., household items, school lab equipment, garden / outdoor space...',
      required: false,
      maxLength: 400,
      helpText: 'Optional — tell us your constraints and we will design accordingly.'
    },
    {
      name: 'timeAvailable',
      label: 'Time Available for Project',
      type: 'select',
      options: ['1-2 days (quick demo)', '1 week', '2-3 weeks', '1 month or more'],
      required: true,
      helpText: 'How long do you have to complete and present the project?'
    }
  ],

  buildPrompt(inputs) {
    const materialsNote = inputs.availableMaterials
      ? `\nAVAILABLE MATERIALS / CONSTRAINTS: "${inputs.availableMaterials}"\nDesign the experiment to work within these constraints.`
      : '';

    return `
You are an expert science fair mentor and educator.

AREA OF INTEREST: ${inputs.interestArea}
STUDENT LEVEL: ${inputs.studentGradeLevel}
TIME AVAILABLE: ${inputs.timeAvailable}
${materialsNote}

DESIGN A COMPLETE SCIENCE FAIR PROJECT with these required sections:

### 🔬 Project Title
A clear, specific, testable title in the format: "The Effect of [Variable] on [Measurable Outcome]"

### ❓ Research Question
One precise, testable question the experiment will answer.

### 📚 Background Research Summary
5-7 bullet points of key scientific concepts the student should research before starting.

### 💡 Hypothesis
A clear IF-THEN-BECAUSE hypothesis statement:
"IF [independent variable change], THEN [predicted measurable effect], BECAUSE [scientific reasoning]."

### 🧪 Materials List
A specific, itemised list of all materials needed. Include quantities.

### 📊 Variables
- **Independent Variable (what you change):** [specific description]
- **Dependent Variable (what you measure):** [specific description + how to measure it]
- **Controlled Variables (what you keep the same):** [list 3-5 controlled variables]

### 📋 Procedure
Number every step. Be precise enough that someone else could repeat this experiment exactly.
Include at least 3 trials for reliability.

### 🛡️ Safety Considerations
- List all potential safety hazards relevant to this experiment.
- Required safety equipment (goggles, gloves, adult supervision, etc.)
- How to dispose of materials safely.
- Emergency procedure if something goes wrong.

### 📈 Data Collection Table
Design a blank data table template the student can fill in with:
- Trial number column
- Independent variable column
- Dependent variable column(s)
- Average/Result column

### 📉 Expected Observations & Possible Results
- What results would SUPPORT the hypothesis?
- What results would DISPROVE the hypothesis?
- What would be an inconclusive result?

### 🎯 Display Board Suggestions
Outline what should go on the display board for the fair presentation.

### 📝 Bibliography Starters
List 3-5 types of reliable sources to research the science behind this experiment.
`;
  }
};
