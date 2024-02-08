import { requirementServices } from "../services/requirement/requirement.service.js";

export const setRequirement = async (req, res) => {
  const { id } = req.user;
  try {
    const userRequirement = await requirementServices.setRequirement({
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
    const userRequirement = await requirementServices.getRequirement(id);
    return res.status(201).send({ success: true, userRequirement });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};