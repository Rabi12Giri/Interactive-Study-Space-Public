import mongoose from 'mongoose';
import { STUDY_SESSION_STATUS } from '../../constant/constants.js';

const studySessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: false, // Optional field
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: false, // Can be null if the session is ongoing
    },
    pauses: [
      {
        start: {
          type: Date,
          required: true,
        },
        end: {
          type: Date,
          required: true,
        },
      },
    ],
    totalDuration: {
      type: Number, // Total duration in seconds
      required: false, // Calculated when the session ends
    },

    status: {
      type: String,
      enum: Object.values(STUDY_SESSION_STATUS),
      default: STUDY_SESSION_STATUS.ONGOING,
    },
  },
  { timestamps: true }
);

// Instance method to calculate total active time
studySessionSchema.methods.calculateTotalActiveTime = function () {
  const totalSessionTime = (this.endTime - this.startTime) / 1000; // in seconds
  const totalPauseTime = this.pauses.reduce((acc, pause) => {
    return acc + (pause.end - pause.start) / 1000; // in seconds
  }, 0);
  return totalSessionTime - totalPauseTime;
};

export default studySessionSchema;
