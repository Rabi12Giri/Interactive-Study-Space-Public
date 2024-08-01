import mongoose from 'mongoose';
import feedbackSchema from './schemas/feedbackSchema.js';
import notebookSchema from './schemas/notebookSchema.js';
import noteSchema from './schemas/noteSchema.js';
import resourceSchema from './schemas/resourceSchema.js';
import userSchema from './schemas/userSchema.js';
import studySessionSchema from './schemas/studySessionSchema.js';

export const User = mongoose.model('User', userSchema);
export const Notebook = mongoose.model('Notebook', notebookSchema);
export const Note = mongoose.model('Note', noteSchema);
export const Resource = mongoose.model('Resource', resourceSchema);
export const Feedback = mongoose.model('Feedback', feedbackSchema);
export const StudySession = mongoose.model('StudySession', studySessionSchema);
