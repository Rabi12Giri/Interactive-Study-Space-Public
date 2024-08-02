import mongoose from 'mongoose';
import { HttpStatus } from '../constant/constants.js';
import { sendSuccessResponse } from '../helpers/index.js';
import { Note, Notebook } from '../schemaModels/model.js';
import { asyncErrorHandler, throwError } from '../helpers/index.js';
import deleteFile from '../utils/deleteFile.js';

// Create a new note
export const createNote = asyncErrorHandler(async (req, res) => {
  const { notebookId, title, content } = req.body;

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

  // Extract and store file names
  const images = req.files.map((file) => file.filename);

  const note = new Note({
    notebookId,
    title,
    content,
    images, // Store file names in the database
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
  const { title, content } = req.body;

  const note = await Note.findById(id);

  if (!note) {
    throwError({
      message: 'Note not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  if (title) note.title = title;
  if (content) note.content = content;

  // Handle image updates
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => file.filename);

    // Delete old images
    note.images.forEach((image) => deleteFile(image));

    // Update the note with new images
    note.images = newImages;
  }

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

  // Delete associated image files
  note.images.forEach((image) => deleteFile(image));

  // Delete the note document
  await note.deleteOne();

  sendSuccessResponse({
    res,
    message: 'Note and associated images deleted successfully',
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

  const notes = await Note.find({ notebookId });

  sendSuccessResponse({
    res,
    data: notes,
  });
});
