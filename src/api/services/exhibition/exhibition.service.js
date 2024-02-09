import { Exhibition } from "../../models/exhibition.model.js";

export const exhibitionServices = {

  async fetchExhibution(id) {
    return await Exhibition.findById(id);
  },

  async createExhibution(data) {
    const newProfile = await Exhibition.create(data);
    return await newProfile.save();
  },

  async updateExhibution(_id, profileData) {
    return await Exhibition.findByIdAndUpdate(_id, profileData, {
      new: true,
    });
  }
};
