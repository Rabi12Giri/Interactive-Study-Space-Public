import express from 'express';
import {
  addFeedback,
  createResource,
  deleteResource,
  getAllResources,
  getFeedbackForResource,
  getFeedbacksByUserId,
  getResourcesByUserId,
} from '../controllers/resourceController.js';
import { authenticateToken } from '../middlewares/auth.js';
import upload from '../middlewares/fileUpload.js';

const resourceRouter = express.Router();

resourceRouter.use(authenticateToken);

// Route to create a new resource
resourceRouter.post('/', upload.array('images', 4), createResource);

// Route to get all resources sorted by recent dates
resourceRouter.get('/', getAllResources);

// Route to get resources by user ID (authenticated user's ID)
resourceRouter.get('/user', getResourcesByUserId);

resourceRouter.get('/user/feedbacks', getFeedbacksByUserId);

resourceRouter.get('/feedback/:resourceId', getFeedbackForResource);

resourceRouter.post('/feedback/:resourceId', addFeedback);

// Route to delete a resource by ID
resourceRouter.delete('/:id', deleteResource);

export default resourceRouter;
