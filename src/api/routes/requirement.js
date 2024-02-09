import express from 'express';
import * as requirementController from '../controllers/requirement.controller.js';
import { verifyUser } from '../../middlewares/verifyUser.js';

const requirementRouter = express.Router();
requirementRouter.post('/set',verifyUser, requirementController.setRequirement);
requirementRouter.get('/get/:id',verifyUser, requirementController.getRequirement);
requirementRouter.get('/get_all',verifyUser, requirementController.getRequirements);
requirementRouter.put('/accept/:id',verifyUser, requirementController.acceptRequirement);

export default requirementRouter;