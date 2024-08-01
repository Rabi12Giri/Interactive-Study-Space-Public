import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    fileNames: {
      type: [String], // Array of strings to store filenames
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    avgRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default resourceSchema;
