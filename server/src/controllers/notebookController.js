import mongoose from 'mongoose';
import { HttpStatus } from '../constant/constants.js';
import { asyncErrorHandler, sendSuccessResponse, throwError } from '../helpers/index.js';
import { Note, Notebook, User } from '../schemaModels/model.js';

// Create a new notebook
export const createNotebook = asyncErrorHandler(async (req, res) => {
  const { name } = req.body;

  const authorId = req._id;

  if (!name || !authorId) {
    throwError({
      message: 'Notebook name and author ID are required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const author = await User.findById(authorId);

  if (!author) {
    throwError({
      message: 'Author not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  const notebook = new Notebook({
    name,
    author: authorId,
  });

  await notebook.save();

  sendSuccessResponse({
    res,
    message: 'Notebook created successfully',
    data: notebook,
  });
});

// Update a notebook
export const updateNotebook = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { name, sharedUserIds } = req.body;

  const notebook = await Notebook.findById(id);

  if (!notebook) {
    throwError({
      message: 'Notebook not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  if (name) {
    notebook.name = name;
  }

  if (sharedUserIds) {
    const sharedUsers = await User.find({ _id: { $in: sharedUserIds } });
    notebook.shared = sharedUsers.map((user) => user._id);
  }

  await notebook.save();

  sendSuccessResponse({
    res,
    message: 'Notebook updated successfully',
    data: notebook,
  });
});

// Get a single notebook by ID
export const getNotebookById = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;

  const notebook = await Notebook.findById(id).populate('shared');

  if (!notebook) {
    throwError({
      message: 'Notebook not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    data: notebook,
  });
});

// Delete a notebook and its associated notes
export const deleteNotebook = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;

  const notebook = await Notebook.findById(id);
  if (!notebook) {
    throwError({
      message: 'Notebook not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Delete all notes associated with the notebook
  await Note.deleteMany({ notebookId: id });

  // Delete the notebook itself
  await notebook.deleteOne();

  sendSuccessResponse({
    res,
    message: 'Notebook and all associated notes deleted successfully',
  });
});

// Share a notebook with additional users
export const shareNotebook = asyncErrorHandler(async (req, res) => {
  const { notebookId } = req.params;
  const { sharedUserIds } = req.body;

  if (!sharedUserIds || !Array.isArray(sharedUserIds)) {
    throwError({
      message: 'A list of user IDs to share with is required',
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

  const sharedUsers = await User.find({ _id: { $in: sharedUserIds } });

  if (sharedUsers.length !== sharedUserIds.length) {
    throwError({
      message: 'One or more users not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  notebook.shared = [
    ...new Set([...notebook.shared, ...sharedUsers.map((user) => user._id)]),
  ];

  await notebook.save();

  sendSuccessResponse({
    res,
    message: 'Notebook shared successfully',
    data: notebook,
  });
});

// Get notebooks by author ID
export const getNotebooksByAuthor = asyncErrorHandler(async (req, res) => {
  const authorId = req._id;

  console.log(authorId);

  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    throwError({
      message: 'Invalid author ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const notebooks = await Notebook.find({ author: authorId }).populate(
    'author shared'
  );

  if (!notebooks || notebooks.length === 0) {
    throwError({
      message: 'No notebooks found for this author',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    data: notebooks,
  });
});

// Get notebooks shared with a specific user by user ID
export const getNotebooksSharedWithUser = asyncErrorHandler(
  async (req, res) => {
    const userId = req._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throwError({
        message: 'Invalid user ID',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const notebooks = await Notebook.find({ shared: userId }).populate(
      'author shared'
    );

    if (!notebooks || notebooks.length === 0) {
      throwError({
        message: 'No notebooks found shared with this user',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    sendSuccessResponse({
      res,
      data: notebooks,
    });
  }
);

// Get all notebooks
export const getNotebooks = asyncErrorHandler(async (req, res) => {
  const notebooks = await Notebook.find().populate('author shared');

  sendSuccessResponse({
    res,
    data: notebooks,
  });
});
