import { mailSender } from "../../helpers/mailSender.js";
import { createToken } from "../../utils/user.js";
import { userServices } from "../services/user/user.service.js";
import fs from "fs";

export const signup = async (req, res, next) => {
  try {
    const user = await userServices.createUser(req.body);
    await mailSender(req.body.email);
    return res.status(201).send({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await userServices.fetchUserByEmail(req.body.email);
    const accessToken = await createToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    res.cookie("accessToken", accessToken);
    return res.status(200).send({ success: true, user });
  } catch (error) {
    res.status(501).send({ success: false, message: error.message });
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userServices.fetchUserById(id);
    return res.status(200).send({ success: true, user });
  } catch (error) {
    res.status(501).send({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userServices.fetchUsers();
    return res.status(200).send({ success: true, users });
  } catch (error) {
    res.status(501).send({ success: false, message: error.message });
  }
};

export const setRequirement = async (req, res) => {
  const { id } = req.user;
  try {
    const userRequirement = await userServices.setRequirement({
      ...req.body,
      userId: id,
    });
    return res.status(201).send({ success: true, userRequirement });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};

export const getRequirement = async (req, res) => {
  const { id } = req.user;
  try {
    const userRequirement = await userServices.getRequirement(id);
    return res.status(201).send({ success: true, userRequirement });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const otpData = await userServices.fetchOtp(req.body.otp);
    if (!otpData)
      return res.status(419).send({ success: false, message: "otp expired" });
    const user = await userServices.fetchUserByEmail(otpData.email);
    const accessToken = await createToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    res.cookie("accessToken", accessToken);
    return res.status(200).send({ success: true, user });
  } catch (error) {
    res.status(501).send({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res, next) => {
  if (!req.file) return res.status(404).send({ message: "No file selected" });
  const { id } = req.user;
  try {
    const profileData = await userServices.fetchProfile(id);
    let profile;
    if (!profileData) {
      profile = await userServices.createProfile({
        ...req.body,
        userId: id,
        profileImage: req.file.path,
      });
    } else {
      if (fs.existsSync(profileData.profileImage))
        fs.unlinkSync(profileData.profileImage);
      profile = await userServices.updateProfile(profileData._id, {
        ...req.body,
        profileImage: req.file.path,
      });
    }

    return res.status(201).send({ success: true, profile });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};

export const userProfile = async (req, res, next) => {
  const { id } = req.user;
  try {
    const profileData = await userServices.fetchProfile(id);
    return res.status(201).send({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};
