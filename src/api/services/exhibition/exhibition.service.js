import { Exhibition } from "../../models/exhibition.model.js";

export const exhibitionServices = {

  async fetchProfile(_id) {
    return await Exhibition.findOne({ _id });
  },

  async getExhibition() {
    return await Exhibition.find();
  },

  async createProfile(data) {
    const newProfile = await Exhibition.create(data);
    return await newProfile.save();
  },

  async updateProfile(_id, profileData) {
    return await Exhibition.findByIdAndUpdate(_id, profileData, {
      new: true,
    });
  }
};
