import mongoose from 'mongoose';

const notebookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Notebook name is required'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shared: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

export default notebookSchema;
