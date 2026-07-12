import homeworkTutor from '../templates/homeworkTutor.template.js';
import explainSimply from '../templates/explainSimply.template.js';
import stepByStep from '../templates/stepByStep.template.js';
import summarizer from '../templates/summarizer.template.js';
import cheatSheet from '../templates/cheatSheet.template.js';
import quiz from '../templates/quiz.template.js';
import flashcards from '../templates/flashcards.template.js';
import brainstorming from '../templates/brainstorming.template.js';
import essayOutline from '../templates/essayOutline.template.js';
import presentation from '../templates/presentation.template.js';
import schoolProject from '../templates/schoolProject.template.js';
import research from '../templates/research.template.js';
import scienceFair from '../templates/scienceFair.template.js';
import creativeWriting from '../templates/creativeWriting.template.js';
import storyCharacter from '../templates/storyCharacter.template.js';
import animeImage from '../templates/animeImage.template.js';
import generalImage from '../templates/generalImage.template.js';
import meme from '../templates/meme.template.js';
import tradingCard from '../templates/tradingCard.template.js';
import poster from '../templates/poster.template.js';
import speech from '../templates/speech.template.js';
import custom from '../templates/custom.template.js';

// Map containing all templates keyed by their ID
export const templates = {
  [homeworkTutor.id]: homeworkTutor,
  [explainSimply.id]: explainSimply,
  [stepByStep.id]: stepByStep,
  [summarizer.id]: summarizer,
  [cheatSheet.id]: cheatSheet,
  [quiz.id]: quiz,
  [flashcards.id]: flashcards,
  [brainstorming.id]: brainstorming,
  [essayOutline.id]: essayOutline,
  [presentation.id]: presentation,
  [schoolProject.id]: schoolProject,
  [research.id]: research,
  [scienceFair.id]: scienceFair,
  [creativeWriting.id]: creativeWriting,
  [storyCharacter.id]: storyCharacter,
  [animeImage.id]: animeImage,
  [generalImage.id]: generalImage,
  [meme.id]: meme,
  [tradingCard.id]: tradingCard,
  [poster.id]: poster,
  [speech.id]: speech,
  [custom.id]: custom
};

/**
 * Gets a list of metadata for all templates to send to the client.
 */
export function listTemplates() {
  return Object.values(templates).map(t => ({
    id: t.id,
    title: t.title,
    description: t.description,
    categoryType: t.categoryType,
    fields: t.fields
  }));
}
