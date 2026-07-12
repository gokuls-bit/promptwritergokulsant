export default {
  id: 'school-project',
  title: 'School Project Planner',
  description: 'Plan a complete school project from structure to research sources to timeline.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'projectName',
      label: 'Project Title or Topic',
      type: 'text',
      placeholder: 'e.g., Effects of Deforestation / Model of the Solar System / My Heritage Culture',
      required: true,
      minLength: 5,
      maxLength: 150,
      helpText: 'What is your project topic or the title given by your teacher?'
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'select',
      options: ['Science', 'Social Studies / History', 'Geography', 'Mathematics', 'English & Literature', 'Computer Science', 'Environmental Studies', 'General'],
      required: true,
      helpText: 'Which subject class is this project for?'
    },
    {
      name: 'studentGradeLevel',
      label: 'Your Grade Level',
      type: 'select',
      options: ['Elementary School', 'Middle School', 'High School', 'Older Student'],
      required: true,
      helpText: 'Controls depth, vocabulary, and research expectations.'
    },
    {
      name: 'deliverables',
      label: 'What will you submit?',
      type: 'chip',
      options: ['Written Report', 'Poster / Display Board', 'Model or Physical Exhibit', 'Oral Presentation', 'Video or Slideshow'],
      required: true,
      helpText: 'What format does your teacher expect for the final project?'
    }
  ],

  buildPrompt(inputs) {
    return `
You are an expert academic project planner and mentor.

PROJECT TOPIC: ${inputs.projectName}
SUBJECT: ${inputs.subject}
STUDENT LEVEL: ${inputs.studentGradeLevel}
DELIVERABLE FORMAT: ${inputs.deliverables}

GENERATE A COMPLETE PROJECT PLAN:

### 📋 Project Overview
- Topic summary (2-3 sentences explaining the subject and why it matters)
- Central question or thesis the project should answer

### 🎯 Learning Objectives
List 3-5 things the student should be able to demonstrate after completing this project.

### 🏗️ Recommended Project Structure
Based on the deliverable format "${inputs.deliverables}", outline all sections/components:
- For each section: give it a name, explain what it should contain, and estimate its length/size.

### 🔍 Research Directions
List 5-7 specific sub-questions or angles to research. For each, suggest:
- What to look for
- What type of source would be most reliable (e.g., textbook, government website, scientific journal)

### 📅 Suggested Timeline
Break the project into weekly milestones assuming a 2-3 week deadline:
- Week 1: [tasks]
- Week 2: [tasks]
- Final days: [tasks]

### 📚 Source Suggestions
List 3-5 categories of reliable sources appropriate for a ${inputs.studentGradeLevel} student researching "${inputs.projectName}".

### ✅ Quality Checklist
Before submitting, the student should verify:
- [ ] Does it answer the central question?
- [ ] Are all facts from reliable sources?
- [ ] Is it appropriate for ${inputs.studentGradeLevel} level?
- [ ] Is the format (${inputs.deliverables}) completed fully?
- [ ] Has it been proofread?
`;
  }
};
