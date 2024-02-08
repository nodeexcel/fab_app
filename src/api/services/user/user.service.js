import { Otp } from "../../models/otp.model.js";
import { User } from "../../models/user.model.js";
import { Profile } from "../../models/userProfile.model.js";

export const userServices = {
  async createUser(userData) {
    const newUser = await User.create(userData);
    return await newUser.save();
  },

  async fetchUserById(userId) {
    return await User.findById(userId);
  },

  async fetchUsers() {
    return await User.find();
  },

  async fetchUserByEmail(email) {
    return await User.findOne({ email });
  },

  async addOtp(otpData) {
    const otp = await Otp.create(otpData);
    await otp.save();
  },

  async fetchOtp(otp) {
    return await Otp.findOne({ otp });
  },

  async removeOtp(otpData) {
    await Otp.deleteOne({ where: { otp: otpData.otp } });
  },

  async createProfile(profileData) {
    const newProfile = await Profile.create(profileData);
    return await newProfile.save();
  },

  async updateProfile(profileId, profileData) {
    return await Profile.findByIdAndUpdate(profileId, profileData, {
      new: true,
    });
  },

  async fetchProfile(userId) {
    console.log(userId);
    return await Profile.findOne({ userId });
  },
};
