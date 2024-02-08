import express from 'express';
import { getUser, signin, signup, verifyOtp , getUsers, updateProfile, forgotPassword, updatePassword, resendOtp, userProfile} from '../controllers/user.controller.js';
import { isExist } from '../../middlewares/isExists.js';
import { verifyUser } from '../../middlewares/verifyUser.js';
import { upload } from '../../config/assets/multerConfigration.js';

const userRouter = express.Router();
userRouter.post('/auth/signup',isExist, signup);
userRouter.post('/auth/signin',isExist, signin);
userRouter.post('/verify/otp', verifyOtp);
userRouter.post('/resend/otp', resendOtp);
userRouter.get('/get_users',verifyUser, getUsers);
userRouter.get('/get_user/:id',verifyUser, getUser);
userRouter.post('/forgot/password', forgotPassword);
userRouter.put('/update/password', updatePassword);
userRouter.put('/update/profile', verifyUser, upload.single('profile'), updateProfile);
userRouter.get('/get_profile', verifyUser, userProfile);


export default userRouter;