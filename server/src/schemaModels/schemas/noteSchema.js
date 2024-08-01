import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notebook',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export default noteSchema;
