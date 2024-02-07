import express from 'express';
// import { getUser, signin, signup, verifyOtp , getUsers, updateProfile, userRequirement} from '../controllers/user.controller.js';
import * as userController from '../controllers/user.controller.js';
import { isExist } from '../../middlewares/isExists.js';
import { verifyUser } from '../../middlewares/verifyUser.js';
import { upload } from '../../config/assets/multerConfigration.js';

const userRouter = express.Router();
userRouter.post('/auth/signup',isExist, userController.signup);
userRouter.post('/auth/signin',isExist, userController.signin);
userRouter.post('/verify/otp', userController.verifyOtp);
userRouter.get('/get_users',verifyUser, userController.getUsers);
userRouter.get('/get_user/:id',verifyUser, userController.getUser);
userRouter.get('/requirement',verifyUser, userController.getRequirement);
userRouter.post('/requirement',verifyUser, userController.setRequirement);
userRouter.put('/update/profile', verifyUser, upload.single('profile'), userController.updateProfile);
userRouter.get('/get_profile', verifyUser, userController.userProfile);


export default userRouter;