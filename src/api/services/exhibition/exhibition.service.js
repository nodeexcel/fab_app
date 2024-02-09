import { Exhibition } from "../../models/exhibition.model.js";

export const exhibitionServices = {

  async fetchExhibition(id) {
    return await Exhibition.findById(id);
  },

  async getExhibition() {
    return await Exhibition.find();
  },

  async createExhibition(data) {
    const newProfile = await Exhibition.create(data);
    return await newProfile.save();
  },

  async updateExhibition(_id, profileData) {
    return await Exhibition.findByIdAndUpdate(_id, profileData, {
      new: true,
    });
  }
};
