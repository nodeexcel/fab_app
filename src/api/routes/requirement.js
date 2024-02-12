import express from 'express';
import * as requirementController from '../controllers/requirement.controller.js';
import { isAdmin, verifyUser } from '../../middlewares/verifyUser.js';

const requirementRouter = express.Router();
requirementRouter.post('/set',verifyUser, requirementController.setRequirement);
requirementRouter.get('/get/:id',verifyUser, requirementController.getRequirement);
requirementRouter.get('/get_all',verifyUser, requirementController.getPendingRequirements);
requirementRouter.put('/accept/:id',verifyUser, requirementController.acceptRequirement);
requirementRouter.get('/accepted',verifyUser, requirementController.getAcceptedRequirements);
requirementRouter.get('/all/fetch',verifyUser,isAdmin, requirementController.getAllRequirements);


export default requirementRouter;