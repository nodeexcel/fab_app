import { exhibitionServices } from "../services/exhibition/exhibition.service.js";
import fs from "fs";

export const setExhibition = async (req, res, next) => {
  try {
    const data = await exhibitionServices.createProfile({
      ...req.body,
      imageURL: req.file.path,
    });
    if (data) res.status(200).send({ message: "exhibition created", data });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};

export const updateExhibition = async (req, res, next) => {
  const id = req.params;
  try {
    const exbData = await exhibitionServices.fetchProfile(id);

    if (fs.existsSync(exbData.imageURL)) fs.unlinkSync(exbData.imageURL);
    const updatedExb = await exhibitionServices.updateProfile(id, {
      ...req.body,
      imageURL: req.file.path,
    });

    return res.status(201).send({ success: true, updatedExb });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};
