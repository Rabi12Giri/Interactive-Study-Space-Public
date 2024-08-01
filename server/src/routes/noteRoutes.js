import express from 'express';
import {
    createNote,
    deleteNote,
    getNotesByNotebookId,
    updateNote
} from '../controllers/noteController.js';
import { authenticateToken } from '../middlewares/auth.js';

const noteRouter = express.Router();

// Apply the authenticateToken middleware to all routes
noteRouter.use(authenticateToken);

// Route to create a new note
noteRouter.post('/', createNote);

// Route to get all notes by notebook ID
noteRouter.get('/notebook/:notebookId', getNotesByNotebookId);

// Route to update a note by ID
noteRouter.put('/:id', updateNote);

// Route to delete a note by ID
noteRouter.delete('/:id', deleteNote);

export default noteRouter;
