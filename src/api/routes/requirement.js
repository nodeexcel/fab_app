import express from 'express';
import * as requirementController from '../controllers/requirement.controller.js';
import { verifyUser } from '../../middlewares/verifyUser.js';

const requirementRouter = express.Router();
requirementRouter.post('/set',verifyUser, requirementController.setRequirement);
requirementRouter.get('/get',verifyUser, requirementController.getRequirement);

export default requirementRouter;