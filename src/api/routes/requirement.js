import express from 'express';
import * as requirementController from '../controllers/requirement.controller.js';
import { isAdmin, verifyUser } from '../../middlewares/verifyUser.js';
import { upload } from '../../config/assets/multerConfigration.js';

const requirementRouter = express.Router();
requirementRouter.post('/set',verifyUser, requirementController.setRequirement);
requirementRouter.get('/get/:id',verifyUser, requirementController.getRequirement);
requirementRouter.get('/get_all',verifyUser, requirementController.getPendingRequirements);
requirementRouter.put('/accept/:id',verifyUser, requirementController.acceptRequirement);
requirementRouter.get('/accepted',verifyUser, requirementController.getAcceptedRequirements);
requirementRouter.get('/all/fetch',verifyUser,isAdmin, requirementController.getAllRequirements);

requirementRouter.put('/remove/:id',verifyUser, requirementController.deleteRequirement);
requirementRouter.put('/status/:id',verifyUser, upload.array("progress",5), requirementController.requirementStatus);

export default requirementRouter;