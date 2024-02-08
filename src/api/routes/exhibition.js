import express from 'express';
import * as exhibitionController from '../controllers/exhibition.controller.js';
import { verifyUser,isAdmin } from '../../middlewares/verifyUser.js';
import { upload } from '../../config/assets/multerConfigration.js';

const exhibitionRouter = express.Router();

exhibitionRouter.post('/create',verifyUser,isAdmin,upload.single('imageURL'),exhibitionController.setExhibition);
exhibitionRouter.put('/update/:_id',verifyUser,isAdmin,upload.single('imageURL'),exhibitionController.updateExhibition);

export default exhibitionRouter;