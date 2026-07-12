export default {
  id: 'summarizer',
  title: 'Chapter Summarizer',
  description: 'Summarize a book chapter or textbook section into key takeaways, characters, and themes.',
  categoryType: 'text',
  requireCitations: true,
  fields: [
    {
      name: 'bookTitle',
      label: 'Book or Article Title',
      type: 'text',
      placeholder: 'e.g., Percy Jackson, To Kill a Mockingbird, or science textbook chapter',
      required: true
    },
    {
      name: 'chapterName',
      label: 'Chapter or Section',
      type: 'text',
      placeholder: 'e.g., Chapter 3: The Lightning Thief',
      required: true
    },
    {
      name: 'summaryFocus',
      label: 'What should we focus on?',
      type: 'select',
      options: ['Main Plot & Action', 'Character Development', 'Themes & Symbols', 'Vocabulary & Key Facts'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a literature teacher and study assistant. Summarize:
BOOK/ARTICLE: "${inputs.bookTitle}"
CHAPTER/SECTION: "${inputs.chapterName}"
FOCUS: ${inputs.summaryFocus}

INSTRUCTIONS:
1. Provide a concise three-sentence overview of the chapter.
2. Outline the 3-5 most critical events or facts that occur in this section.
3. List any key characters introduced or developed, explaining their role in this chapter.
4. Explain the main educational or literary takeaway (focusing on ${inputs.summaryFocus}).
5. Bullet points are preferred. Keep summaries accurate to the text and avoid speculation.
`;
  }
};
