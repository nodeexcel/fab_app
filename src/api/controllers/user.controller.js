import { mailSender } from "../../helpers/mailSender.js";
import { createToken } from "../../utils/user.js";
import { userServices } from "../services/user/user.service.js";
import bcrypt from 'bcrypt'
import fs from 'fs';


export const signup = async(req, res, next)=> {
    try {
        await mailSender(req.body.email)
        return res.status(200).send({success:true, message:`otp for verify email has been send on ${req.body.email}`});
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}


export const signin = async(req, res, next)=> {
    try {
        const user = await userServices.fetchUserByEmail(req.body.email)
        const accessToken = await createToken({id:user._id, email:user.email, role:user.role})
        return res.status(200).send({success:true, user, accessToken});
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}


export const getUser = async(req, res, next)=> {
    const {id} = req.params;
    try {
        const user = await userServices.fetchUserById(id)
        return res.status(200).send({success:true, user});
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}


export const getUsers = async(req, res, next)=> {
    try {
        const users = await userServices.fetchUsers();
        return res.status(200).send({success:true, users});
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}


export const verifyOtp = async(req, res, next)=> {
    const {fullname, email, password, role, otp} = req.body;
    try {
        const otpData = await userServices.fetchOtp(otp);
        if(!otpData) 
          return res.status(419).send({success:false, message:"otp expired"});
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await userServices.createUser({fullname, email, password:hashedPassword, role})
        const accessToken = await createToken({id:user._id, email:user.email, role:user.role})
        return res.status(201).send({success:true, user, accessToken});
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}


export const resendOtp = async(req, res, next)=> {
    try {
        await mailSender(req.body.email)
        return res.status(201).send({success:true, message:"otp has been resend"});
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}


export const updateProfile= async(req, res, next)=>{
    if(!req.file) return res.status(404).send({message:"No file selected"})
    const {id} = req.user;
    try {
        const profileData = await userServices.fetchProfile(id);
        let profile;
        if(!profileData){
            profile = await userServices.createProfile({...req.body, userId:id, profileImage:req.file.path})
        }else{
            if (fs.existsSync(profileData.profileImage)) fs.unlinkSync(profileData.profileImage);
            profile = await userServices.updateProfile(profileData._id, {...req.body, profileImage:req.file.path})
        }

        return res.status(201).send({success:true, profile});
    } catch (error) {
        console.log(error)
        res.status(501).send({success:false, message:error.message});
    }
}


export const forgotPassword = async(req, res, next)=> {
    try {
        const user = await userServices.fetchUserByEmail(req.body.email);
        if(!user) return res.status(404).send({message:"Invalid email address"});
        return res.status(200).send({success:true});
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}


export const updatePassword = async(req, res, next)=> {
    const {password, confirmPassword} = req.body;
    try {
        if(password !== confirmPassword) return res.status(200).send({message:"password and confirm password do not match"});
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await userServices.updateUser(req.user.id, {password:hashedPassword});
        return res.status(200).send({success:true, updatedUser});
    } catch (error) {
        res.status(501).send({success:false, message:error.message});
    }
}