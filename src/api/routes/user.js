import express from 'express';
import { getUser, signin, signup, verifyOtp , getUsers, updateProfile} from '../controllers/user.controller.js';
import { isExist } from '../../middlewares/isExists.js';
import { verifyUser } from '../../middlewares/verifyUser.js';
import { upload } from '../../config/assets/multerConfigration.js';

const userRouter = express.Router();
userRouter.post('/auth/signup',isExist, signup);
userRouter.post('/auth/signin',isExist, signin);
userRouter.post('/verify/otp', verifyOtp);
userRouter.get('/get_users',verifyUser, getUsers);
userRouter.get('/get_user/:id',verifyUser, getUser);
userRouter.put('/update/profile', verifyUser, upload.single('profile'), updateProfile);


export default userRouter;