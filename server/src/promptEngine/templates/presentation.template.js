export default {
  id: 'presentation',
  title: 'Presentation / PPT Builder',
  description: 'Plan your slides with titles, talking points, visual ideas, and speaker notes — ready to build in PowerPoint or Google Slides.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'projectTopic',
      label: 'Presentation Topic',
      type: 'text',
      placeholder: 'e.g., Planning a Home Budget / Renewable Energy / The Solar System',
      required: true,
      minLength: 3,
      maxLength: 120,
      helpText: 'What is the subject of your presentation?'
    },
    {
      name: 'slideCount',
      label: 'Number of Slides',
      type: 'number',
      placeholder: '10',
      required: true,
      min: 3,
      max: 20,
      helpText: 'How many slides should the presentation have? (Min: 3, Max: 20)'
    },
    {
      name: 'projectType',
      label: 'Presentation Purpose',
      type: 'select',
      options: [
        'Mathematics Holiday Homework',
        'Science Report / Experiment',
        'History Biography / Timeline',
        'Geography & Environment',
        'English Literature Analysis',
        'General Class Assignment',
        'School Science Fair',
        'Personal Finance & Life Skills'
      ],
      required: true,
      helpText: 'What is the occasion or class this is for?'
    },
    {
      name: 'studentGradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Adjusts complexity, vocabulary, and argument depth.'
    }
  ],

  buildPrompt(inputs) {
    const count = inputs.slideCount || 10;
    return `
You are an expert presentation coach and visual communication specialist.

TOPIC: ${inputs.projectTopic}
PURPOSE: ${inputs.projectType}
TOTAL SLIDES: ${count}
STUDENT LEVEL: ${inputs.studentGradeLevel}

GENERATE EXACTLY ${count} SLIDES. Use this parseable Markdown format for EVERY slide:

---
## Slide [N]: [Specific, Descriptive Slide Title]

- **Core Point:** [The single most important idea on this slide — 1 clear sentence]
- **Supporting Detail 1:** [A fact, statistic, or explanation that backs up the core point]
- **Supporting Detail 2:** [A second piece of supporting evidence or elaboration]
- **Interesting Takeaway:** [A surprising fact, real-world connection, or thought-provoking note]

**Visual Idea:** [Describe a specific chart, diagram, image, map, or graphic that would reinforce this slide's message. Be specific — e.g., "A pie chart showing percentage breakdown of household expenses"]

**Speaker Notes:** [2-3 sentences the student should say out loud when presenting this slide. Written in first person, conversational tone.]
---

SLIDE STRUCTURE GUIDANCE:
- Slide 1: Title slide — include topic, student name placeholder, and purpose/class.
- Slide 2: Agenda / Overview — list what the presentation will cover.
- Slides 3 to ${count - 2}: Core content slides covering different aspects of "${inputs.projectTopic}".
- Slide ${count - 1}: Summary / Key Takeaways.
- Slide ${count}: References / Bibliography placeholder.

CONTENT RULES:
- Each slide must cover a distinct sub-topic — do not repeat the same idea across slides.
- Content must be accurate and appropriate for a ${inputs.studentGradeLevel} student.
- For "${inputs.projectType}", include subject-relevant data, examples, and perspectives.
- Vocabulary must be appropriate for ${inputs.studentGradeLevel} level.
- Visual ideas must be specific and buildable with free tools (Google Slides, Canva, PowerPoint).
- Speaker notes must be written in natural spoken language — not bullet points.
`;
  }
};
