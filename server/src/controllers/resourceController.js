import mongoose from 'mongoose';
import { HttpStatus } from '../constant/constants.js';
import {
  asyncErrorHandler,
  sendSuccessResponse,
  throwError,
} from '../helpers/index.js';
import { Feedback, Resource } from '../schemaModels/model.js';
import deleteFile from '../utils/deleteFile.js';

export const createResource = asyncErrorHandler(async (req, res) => {
  const { title, description } = req.body;
  const uploadedBy = req.user._id;

  const fileNames = req?.files?.map((file) => file.filename);

  if (!title || !fileNames?.length) {
    throwError({
      message: 'Title and at least one file are required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const resource = new Resource({
    title,
    description,
    fileNames,
    uploadedBy,
  });

  await resource.save();

  sendSuccessResponse({
    res,
    message: 'Resource created successfully',
    data: resource,
  });
});

export const deleteResource = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;

  const resource = await Resource.findById(id);
  if (!resource) {
    throwError({
      message: 'Resource not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Delete associated files
  resource.fileNames.forEach((fileName) => deleteFile(fileName));

  await resource.deleteOne();

  sendSuccessResponse({
    res,
    message: 'Resource and associated files deleted successfully',
  });
});

export const getAllResources = asyncErrorHandler(async (req, res) => {
  const resources = await Resource.find()
    .sort({ createdAt: -1 })
    .populate('uploadedBy');

  sendSuccessResponse({
    res,
    data: resources,
  });
});

export const getResourcesByUserId = asyncErrorHandler(async (req, res) => {
  const userId = req._id; // Extract user ID from the request object

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throwError({
      message: 'Invalid user ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const resources = await Resource.find({ uploadedBy: userId }).populate(
    'uploadedBy'
  );

  if (!resources || resources.length === 0) {
    throwError({
      message: 'No resources found for this user',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    data: resources,
  });
});

// Function to calculate and update the average rating
async function updateResourceRating(resourceId) {
  const feedbacks = await mongoose.model('Feedback').find({ resourceId });
  if (feedbacks.length === 0) return;

  const avgRating =
    feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
    feedbacks.length;

  await Resource.findByIdAndUpdate(resourceId, { avgRating }, { new: true });
}

// Add feedback to a resource with a limit of 3 per user
export const addFeedback = asyncErrorHandler(async (req, res) => {
  const { resourceId, comment, rating } = req.body;

  const userId = req._id; // Assuming user ID is set by authentication middleware

  if (!resourceId || !comment || rating == null) {
    throwError({
      message: 'Resource ID, comment, and rating are required',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  if (!mongoose.Types.ObjectId.isValid(resourceId)) {
    throwError({
      message: 'Invalid resource ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const resource = await Resource.findById(resourceId);

  if (!resource) {
    throwError({
      message: 'Resource not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  // Check if user has already submitted 3 feedbacks
  const userFeedbackCount = await Feedback.countDocuments({
    resourceId,
    userId,
  });

  if (userFeedbackCount >= 3) {
    throwError({
      message:
        'You have reached the maximum number of feedbacks allowed for this resource',
      statusCode: HttpStatus.FORBIDDEN,
    });
  }

  const feedback = new Feedback({
    resourceId,
    userId,
    comment,
    rating,
  });

  await feedback.save();

  sendSuccessResponse({
    res,
    message: 'Feedback added successfully',
    data: feedback,
  });
});

// Get feedbacks by user ID
export const getFeedbacksByUserId = asyncErrorHandler(async (req, res) => {
  const userId = req._id; // Assuming user ID is set by authentication middleware

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throwError({
      message: 'Invalid user ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const feedbacks = await Feedback.find({ userId }).populate('resourceId');

  sendSuccessResponse({
    res,
    data: feedbacks,
  });
});

// Get feedback for a specific resource by resource ID
export const getFeedbackForResource = asyncErrorHandler(async (req, res) => {
  const { resourceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(resourceId)) {
    throwError({
      message: 'Invalid resource ID',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const feedbacks = await Feedback.find({ resourceId }).populate('userId');

  sendSuccessResponse({
    res,
    data: feedbacks,
  });
});
