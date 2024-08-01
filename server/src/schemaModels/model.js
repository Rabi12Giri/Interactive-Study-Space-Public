import mongoose from 'mongoose';
import notebookSchema from './schemas/notebookSchema.js';
import userSchema from './schemas/userSchema.js';
import noteSchema from './schemas/noteSchema.js';

export const User = mongoose.model('User', userSchema);
export const Notebook = mongoose.model('Notebook', notebookSchema);
export const Note = mongoose.model('Note', noteSchema);
