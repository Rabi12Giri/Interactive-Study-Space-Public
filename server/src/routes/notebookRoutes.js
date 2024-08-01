import express from 'express';
import {
  createNotebook,
  deleteNotebook,
  getNotebookById,
  getNotebooks,
  getNotebooksByAuthor,
  getNotebooksSharedWithUser,
  shareNotebook,
  updateNotebook,
} from '../controllers/notebookController.js';

import { authenticateToken } from '../middlewares/auth.js';

const notebookRouter = express.Router();

// Apply the authenticateToken middleware to all routes below
notebookRouter.use(authenticateToken);

// Routes for retrieving notebooks
notebookRouter.get('/author', getNotebooksByAuthor); // Get notebooks by author ID
notebookRouter.get('/shared', getNotebooksSharedWithUser); // Get notebooks shared with a user

// Notebook routes
notebookRouter.post('/', createNotebook); // Create a new notebook
notebookRouter.get('/', getNotebooks); // Get all notebooks
notebookRouter.put('/:id', updateNotebook); // Update a notebook by ID
notebookRouter.get('/:id', getNotebookById); // Get a single notebook by ID
notebookRouter.delete('/:id', deleteNotebook); // Delete a notebook by ID
notebookRouter.post('/:notebookId/share', shareNotebook); // Share a notebook

export default notebookRouter;
