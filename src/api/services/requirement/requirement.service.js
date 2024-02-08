import { Requirement } from "../../models/requirement.model.js";

export const requirementServices = {
  async setRequirement(data) {
    const userRequirement = await Requirement.create(data);
    return await userRequirement.save();
  },

  async getRequirement(userId) {
    return await Requirement.findOne({ userId });
  },
};
