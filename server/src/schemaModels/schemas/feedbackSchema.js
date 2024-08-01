import mongoose from 'mongoose';
import { Resource } from '../model.js';

const feedbackSchema = new mongoose.Schema(
  {
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware to update average rating on resource after feedback is added or updated
feedbackSchema.post('save', async function (doc) {
  await updateResourceRating(doc.resourceId);
});

// Middleware to update average rating on resource after feedback is removed
feedbackSchema.post('remove', async function (doc) {
  await updateResourceRating(doc.resourceId);
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

export default feedbackSchema;
