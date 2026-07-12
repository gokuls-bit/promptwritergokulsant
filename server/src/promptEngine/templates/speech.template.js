export default {
  id: 'speech',
  title: 'Speech Builder',
  description: 'Plan public speaking notes, outlines, attention hooks, and body posture tips for speeches.',
  categoryType: 'text',
  requireCitations: false,
  fields: [
    {
      name: 'speechTopic',
      label: 'Topic of your Speech',
      type: 'text',
      placeholder: 'e.g., Why we should recycle / running for student council / history of soccer',
      required: true
    },
    {
      name: 'speechLength',
      label: 'Target Length',
      type: 'select',
      options: ['1 Minute (Short introduction)', '3 Minutes (Standard speech)', '5 Minutes (Full presentation)'],
      required: true
    },
    {
      name: 'audience',
      label: 'Who is the audience?',
      type: 'select',
      options: ['My classmates', 'School assembly (all students)', 'Teachers & parents'],
      required: true
    }
  ],
  buildPrompt(inputs) {
    return `
You are a public speaking coach. Help the student organize and outline a speech.

TOPIC:
${inputs.speechTopic}

SPECS:
- Length: ${inputs.speechLength}
- Audience: ${inputs.audience}

INSTRUCTIONS:
1. Provide 2 alternative attention-grabbing "Opening Hooks" (questions, surprising facts, or short stories).
2. Outline the speech chronologically:
   - Introduction (Hook + Thesis statement)
   - Body Section 1 (Core argument/point with transition)
   - Body Section 2 (Supporting argument/point with transition)
   - Conclusion (Final summary call-to-action)
3. For each section, write "Delivery Cues" in brackets indicating posture, voice tone, or gesture (e.g., [Pause here and smile], [Raise voice slightly for emphasis]).
4. Keep paragraphs short and outline-based. Do not write the full speech. Focus on outlines and cues.
`;
  }
};
