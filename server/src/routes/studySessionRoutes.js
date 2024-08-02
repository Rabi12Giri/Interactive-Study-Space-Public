import express from 'express';
import {
  createStudySession,
  pauseStudySession,
  resumeStudySession,
  endStudySession,
  getStudySessionsByUserId,
  deleteStudySession,
  getSessionBySessionId,
} from '../controllers/studySessionController.js';
import { authenticateToken } from '../middlewares/auth.js';

const studySessionRouter = express.Router();

studySessionRouter.use(authenticateToken);

// Route to create a new study session
studySessionRouter.post('/', createStudySession);

// Route to get all study sessions by user ID
studySessionRouter.get('/user', getStudySessionsByUserId);

// Route to pause a study session
studySessionRouter.post('/:sessionId/pause', pauseStudySession);

// Route to resume a study session
studySessionRouter.post('/:sessionId/resume', resumeStudySession);

// Route to end a study session
studySessionRouter.post('/:sessionId/end', endStudySession);

studySessionRouter.delete('/:sessionId', deleteStudySession);

studySessionRouter.get('/:sessionId', getSessionBySessionId);

export default studySessionRouter;
