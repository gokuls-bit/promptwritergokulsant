export default {
  id: 'research',
  title: 'Research Report Helper',
  description: 'Get a structured research framework, key questions, and source guidance for any report topic.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'researchTopic',
      label: 'Research Topic',
      type: 'text',
      placeholder: 'e.g., Climate change effects on the Arctic / History of the internet / Black holes',
      required: true,
      minLength: 5,
      maxLength: 150,
      helpText: 'What is the topic you need to research and write about?'
    },
    {
      name: 'studentGradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Sets the expected depth of analysis and vocabulary.'
    },
    {
      name: 'reportLength',
      label: 'Report Length',
      type: 'select',
      options: ['Short (1-2 pages)', 'Medium (3-5 pages)', 'Long (6-10 pages)'],
      required: true,
      helpText: 'Approximate length expected by your teacher.'
    },
    {
      name: 'citationStyle',
      label: 'Citation Style',
      type: 'select',
      options: ['None required', 'APA', 'MLA', 'Chicago', 'Not sure — show me examples'],
      required: true,
      helpText: 'Which citation format has your teacher asked for?'
    }
  ],

  buildPrompt(inputs) {
    return `
You are an experienced academic research mentor helping a ${inputs.studentGradeLevel} student write a research report.

RESEARCH TOPIC: ${inputs.researchTopic}
STUDENT LEVEL: ${inputs.studentGradeLevel}
REPORT LENGTH: ${inputs.reportLength}
CITATION STYLE: ${inputs.citationStyle}

YOUR ROLE IS TO BUILD A RESEARCH FRAMEWORK — not to write the report for the student.

PROVIDE:

### 🔎 Understanding the Topic
- Background context (3-5 sentences) explaining why this topic matters.
- Key vocabulary: list 5-8 terms the student must understand and define in the report.
- Scope: clearly describe what the report SHOULD and SHOULD NOT cover given the length "${inputs.reportLength}".

### ❓ Key Research Questions
Generate 6-8 guiding questions the report should answer. These should drive the research process.

### 🏗️ Recommended Report Structure
Provide a detailed outline appropriate for "${inputs.reportLength}":
- **Introduction** — what to include (hook, background, thesis/purpose statement)
- **Section 1: [Topic]** — what sub-questions this section addresses
- **Section 2: [Topic]** — ...
- **Section 3+** (if applicable)
- **Conclusion** — how to synthesise findings, not just repeat them
- **References** section format using ${inputs.citationStyle} style

### 📚 Research Source Strategy
List specific types of reliable sources for "${inputs.researchTopic}":
- Primary sources (if applicable)
- Secondary sources (books, textbooks, databases)
- Online sources to trust (and types to avoid)
- One example search query for each of 3 key sub-topics

### 📝 ${inputs.citationStyle !== 'None required' ? `Citation Guide (${inputs.citationStyle})` : 'Referencing Tips'}
${inputs.citationStyle === 'None required' ? 'Even without a formal style, show the student how to keep track of sources.' : `Show the correct ${inputs.citationStyle} format for: a book, a website, and a journal article. Use placeholder details so the student can fill them in.`}

### ✅ Research Checklist
- [ ] Have I answered all the key research questions?
- [ ] Are all my sources reliable?
- [ ] Have I cited every piece of information I did not write myself?
- [ ] Is my report within the length target "${inputs.reportLength}"?
`;
  }
};
