import { Requirement } from "../../models/requirement.model.js";

export const requirementServices = {
  async setRequirement(data) {
    const userRequirement = await Requirement.create(data);
    return await userRequirement.save();
  },

  async updateRequirement(requirementId, user) {
    return await Requirement.findByIdAndUpdate(requirementId ,{isAccepted:true, acceptedBy:{...user}}, {new:true});
  },

  async getRequirement(id) {
    return await Requirement.findById(id);
  },

  async getRequirements() {
    return await Requirement.find({ isAccepted:false});
  },
};
