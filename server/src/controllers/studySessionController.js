import mongoose from 'mongoose';
import { HttpStatus, STUDY_SESSION_STATUS } from '../constant/constants.js';
import {
  asyncErrorHandler,
  throwError,
  sendSuccessResponse,
} from '../helpers/index.js';
import { StudySession } from '../schemaModels/model.js';

// Create a new study session
export const createStudySession = asyncErrorHandler(async (req, res) => {
  const userId = req._id; // Assuming user ID is set by authentication middleware
  const { title } = req.body;

  // Check if there is an ongoing session for the user
  const existingSession = await StudySession.findOne({
    userId,
    status: {
      $in: [STUDY_SESSION_STATUS.ONGOING, STUDY_SESSION_STATUS.PAUSED],
    },
  });

  if (existingSession) {
    throwError({
      message:
        'You already have an ongoing or paused study session. Please complete it before starting a new one.',
      statusCode: HttpStatus.CONFLICT,
    });
  }

  const studySession = new StudySession({
    userId,
    title,
    startTime: new Date(),
    status: STUDY_SESSION_STATUS.ONGOING,
  });

  await studySession.save();

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.CREATED,
    message: 'Study session created successfully',
    data: studySession,
  });
});

// Pause a study session
export const pauseStudySession = asyncErrorHandler(async (req, res) => {
  const { sessionId } = req.params;
  const studySession = await StudySession.findById(sessionId);

  if (!studySession || studySession.status !== STUDY_SESSION_STATUS.ONGOING) {
    throwError({
      message: 'Session not found or already paused/completed',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  studySession.pauses.push({ start: new Date(), end: new Date() }); // Initialize pause
  studySession.status = STUDY_SESSION_STATUS.PAUSED;

  await studySession.save();

  res.json({
    message: 'Study session paused successfully',
    data: studySession,
  });
});

// Resume a study session
export const resumeStudySession = asyncErrorHandler(async (req, res) => {
  const { sessionId } = req.params;
  const studySession = await StudySession.findById(sessionId);

  if (!studySession || studySession.status !== STUDY_SESSION_STATUS.PAUSED) {
    throwError({
      message: 'Session not found or not paused',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  const lastPause = studySession.pauses[studySession.pauses.length - 1];
  if (lastPause && !lastPause.end) {
    lastPause.end = new Date(); // End the pause
  }
  studySession.status = STUDY_SESSION_STATUS.ONGOING;

  await studySession.save();

  res.json({
    message: 'Study session resumed successfully',
    data: studySession,
  });
});

// End a study session
export const endStudySession = asyncErrorHandler(async (req, res) => {
  const { sessionId } = req.params;
  const studySession = await StudySession.findById(sessionId);

  if (!studySession || studySession.status === STUDY_SESSION_STATUS.COMPLETED) {
    throwError({
      message: 'Session not found or already completed',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  if (studySession.status === STUDY_SESSION_STATUS.PAUSED) {
    const lastPause = studySession.pauses[studySession.pauses.length - 1];
    if (lastPause && !lastPause.end) {
      lastPause.end = new Date(); // End the pause
    }
  }

  studySession.endTime = new Date();
  studySession.totalDuration = studySession.calculateTotalActiveTime();
  studySession.status = STUDY_SESSION_STATUS.COMPLETED;

  await studySession.save();

  res.json({
    message: 'Study session ended successfully',
    data: studySession,
  });
});

// Get all study sessions by user ID
export const getStudySessionsByUserId = asyncErrorHandler(async (req, res) => {
  const userId = req._id; // Assuming user ID is set by authentication middleware

  const studySessions = await StudySession.find({ userId });

  sendSuccessResponse({
    res,
    data: studySessions,
  });
});

// Delete a study session
export const deleteStudySession = asyncErrorHandler(async (req, res) => {
  const { sessionId } = req.params;
  const userId = req._id; // Assuming user ID is set by authentication middleware

  const studySession = await StudySession.findOneAndDelete({
    _id: sessionId,
    userId,
  });

  if (!studySession) {
    throwError({
      message:
        'Study session not found or you do not have permission to delete it',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    message: 'Study session deleted successfully',
  });
});

// Delete a study session
export const getSessionBySessionId = asyncErrorHandler(async (req, res) => {
  const { sessionId } = req.params;

  if (!mongoose.isValidObjectId(sessionId)) {
    throwError({
      message: 'Invalid session id provided',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const studySession = await StudySession.findById(sessionId);

  if (!studySession) {
    throwError({
      message: 'Study session not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  sendSuccessResponse({
    res,
    data: studySession,
    message: 'Study session deleted successfully',
  });
});
