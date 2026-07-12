import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // null indicates a guest prompt
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  inputs: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  compiledPrompt: {
    type: String,
    required: true
  },
  qualityScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  isSaved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexing for faster history searching
promptSchema.index({ userId: 1, createdAt: -1 });
promptSchema.index({ userId: 1, title: 'text', compiledPrompt: 'text' });

const Prompt = mongoose.model('Prompt', promptSchema);
export default Prompt;
