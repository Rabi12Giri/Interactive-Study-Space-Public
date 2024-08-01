import mongoose from 'mongoose';
import { HttpStatus } from '../constant/constants.js';
import { sendSuccessResponse } from '../helpers/index.js';
import { Note, Notebook } from '../schemaModels/model.js';
import { asyncErrorHandler, throwError } from '../helpers/index.js';

// Create a new note
export const createNote = asyncErrorHandler(async (req, res) => {
  const { notebookId, title, content, images } = req.body;

  if (!notebookId || !title || !content) {
    throwError({
      message: 'Notebook ID, title, and content are required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const notebook = await Notebook.findById(notebookId);
  if (!notebook) {
    throwError({
      message: 'Notebook not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  const note = new Note({
    notebookId,
    title,
    content,
    images, // Optional field for note images
  });

  await note.save();

  sendSuccessResponse({
    res,
    message: 'Note created successfully',
    data: note,
  });
});

// Update a note
export const updateNote = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, images } = req.body;

  const note = await Note.findById(id);
  if (!note) {
    throwError({
      message: 'Note not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  if (title) note.title = title;
  if (content) note.content = content;
  if (images) note.images = images;

  await note.save();

  sendSuccessResponse({
    res,
    message: 'Note updated successfully',
    data: note,
  });
});

// Delete a note
export const deleteNote = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id);
  if (!note) {
    throwError({
      message: 'Note not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  await note.deleteOne();

  sendSuccessResponse({
    res,
    message: 'Note deleted successfully',
  });
});

// Get all notes by notebook ID
export const getNotesByNotebookId = asyncErrorHandler(async (req, res) => {
  const { notebookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(notebookId)) {
    throwError({
      message: 'Invalid notebook ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const notes = await Note.find({ notebookId }).populate('notebookId');

  if (!notes || notes.length === 0) {
    throwError({
      message: 'No notes found for this notebook',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    data: notes,
  });
});
