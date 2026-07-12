import { compilePrompt } from '../promptEngine/core/compilePrompt.js';
import { listTemplates } from '../promptEngine/core/templateRegistry.js';
import Prompt from '../models/Prompt.js';

/**
 * Returns list of all available prompt categories and their input schemas.
 */
export function getTemplates(req, res) {
  try {
    const list = listTemplates();
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
}

/**
 * Compiles a detailed prompt. Does not save to database yet.
 * Allows guest access.
 */
export function compile(req, res) {
  try {
    const { category, categoryId, inputs, gradeLevel } = req.body;
    const activeCategory = category || categoryId;

    if (!activeCategory || !inputs) {
      return res.status(400).json({ error: 'Category and inputs are required.' });
    }

    // Determine the grade level (logged-in user preferences vs. guest input)
    let finalGradeLevel = gradeLevel || 'middle';
    if (req.user && req.user.gradeLevel) {
      finalGradeLevel = req.user.gradeLevel;
    }

    const compilation = compilePrompt(activeCategory, inputs, finalGradeLevel);

    res.status(200).json({
      success: true,
      data: {
        prompt: compilation.compiledPrompt,
        qualityScore: compilation.qualityScore,
        suggestions: compilation.suggestions
      }
    });
  } catch (error) {
    // If the error comes from our safety layer or validation, return 400
    res.status(400).json({ error: error.message });
  }
}

/**
 * Saves a compiled prompt to database. Requires authentication.
 */
export async function savePrompt(req, res) {
  try {
    const { title, category, inputs, compiledPrompt, qualityScore } = req.body;

    if (!title || !category || !inputs || !compiledPrompt || qualityScore === undefined) {
      return res.status(400).json({ error: 'All prompt details (title, category, inputs, compiledPrompt, qualityScore) are required to save.' });
    }

    const newPrompt = new Prompt({
      userId: req.user.id,
      title: title.trim(),
      category,
      inputs,
      compiledPrompt,
      qualityScore,
      isSaved: true
    });

    await newPrompt.save();
    res.status(201).json(newPrompt);
  } catch (error) {
    console.error('Error saving prompt:', error);
    res.status(500).json({ error: 'Server error: Failed to save the prompt.' });
  }
}

/**
 * Gets the saved prompts for the logged-in user.
 * Supports search and category filter.
 */
export async function getUserPrompts(req, res) {
  try {
    const { search, category } = req.query;
    const query = { userId: req.user.id };

    if (category) {
      query.category = category;
    }

    if (search) {
      // Direct text search or regex-based search for simpler matching
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { compiledPrompt: { $regex: search, $options: 'i' } }
      ];
    }

    const prompts = await Prompt.find(query).sort({ createdAt: -1 });
    res.status(200).json(prompts);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    res.status(500).json({ error: 'Server error: Failed to retrieve history.' });
  }
}

/**
 * Deletes a saved prompt. Requires authentication.
 */
export async function deletePrompt(req, res) {
  try {
    const { id } = req.params;

    const prompt = await Prompt.findOne({ _id: id, userId: req.user.id });
    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found or access denied.' });
    }

    await Prompt.deleteOne({ _id: id });
    res.status(200).json({ message: 'Prompt deleted successfully.' });
  } catch (error) {
    console.error('Error deleting prompt:', error);
    res.status(500).json({ error: 'Server error: Failed to delete the prompt.' });
  }
}
