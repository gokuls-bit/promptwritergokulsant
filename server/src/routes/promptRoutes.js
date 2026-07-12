import express from 'express';
import { getTemplates, compile, savePrompt, getUserPrompts, deletePrompt } from '../controllers/promptController.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/templates', getTemplates);
router.post('/compile', optionalAuth, compile);
router.post('/save', requireAuth, savePrompt);
router.get('/history', requireAuth, getUserPrompts);
router.delete('/:id', requireAuth, deletePrompt);

export default router;
