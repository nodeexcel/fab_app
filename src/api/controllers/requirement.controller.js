import { ackSender } from "../../helpers/sendAck.js";
import { requirementServices } from "../services/requirement/requirement.service.js";
import { userServices } from "../services/user/user.service.js";

export const setRequirement = async (req, res) => {
  const { id } = req.user;
  try {
    const userRequirement = await requirementServices.setRequirement({
      ...req.body,
      userId:id,
      isAccepted:false
    });
    return res.status(201).send({ success: true, userRequirement });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};


export const getRequirement = async (req, res) => {
  const {id} = req.params;
  try {
    const userRequirement = await requirementServices.getRequirement(id);
    return res.status(201).send({ success: true, userRequirement });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};


export const acceptRequirement = async (req, res) => {
  const { id } = req.params;
  try {
    const userRequirement = await requirementServices.updateRequirement(id, req.user);
    const user= await userServices.fetchUserById(userRequirement.userId)
    console.log(user.email, req.user);
    await ackSender(user.email,req.user );
    return res.status(201).send({ success: true, userRequirement });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};


export const getRequirements = async (req, res) => {
  try {
    const userRequirements = await requirementServices.getRequirements();
    return res.status(201).send({ success: true, userRequirements });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};