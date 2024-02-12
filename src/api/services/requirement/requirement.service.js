import { Requirement } from "../../models/requirement.model.js";
import fs from 'fs';

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
  
  async requirementStatus(id, files) {
    const progressPaths = files.map(file => file.path);
    const {acceptedBy} = await this.getRequirement(id)
     return await Requirement.findByIdAndUpdate(id, {acceptedBy:{progress:[...acceptedBy.progress ,...progressPaths]} }, { new: true });
  },
  
  async deleteRequirement(id, index) {
    const {acceptedBy} = await Requirement.findById(id);
    const imgPath = acceptedBy.progress[index]
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    const progress = acceptedBy.progress.filter((_, idx) => idx!=index)
    return await Requirement.findByIdAndUpdate(id, {acceptedBy:{progress}}, {new:true})
  }
};
