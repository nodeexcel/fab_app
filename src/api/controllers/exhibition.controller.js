import { exhibitionServices } from "../services/exhibition/exhibition.service.js";
import fs from "fs";

export const setExhibition = async (req, res, next) => {
  try {
    const data = await exhibitionServices.createExhibition({
      ...req.body,
      imageURL:req.file ? req.file.path : "",
    });
    if (data) res.status(200).send({ message: "exhibition created", data });
  } catch (error) {
    
    res.status(501).send({ success: false, message: error.message });
  }
};

export const getExhibition = async (req, res, next) => {
  try {
    const exhibition = await exhibitionServices.getExhibition();
    res.status(200).send({ message: "Exhibitions", exhibition });
  } catch (error) {

    res.status(501).send({ success: false, message: error.message });
  }
};

export const updateExhibition = async (req, res, next) => {
  const id = req.params;
  try {
    if (req.file) {
      const exbData = await exhibitionServices.fetchExhibution(id);

      if (fs.existsSync(exbData.imageURL)) fs.unlinkSync(exbData.imageURL);
      const updatedExb = await exhibitionServices.updateExhibution(id, {
        ...req.body,
        imageURL: req.file.path,
      });
      return res.status(201).send({ success: true, updatedExb });
    } else {
      const updatedExb = await exhibitionServices.updateExhibution(id, req.body);
      return res.status(201).send({ success: true, updatedExb });
    }
  } catch (error) {
    
    res.status(501).send({ success: false, message: error.message });
  }
};
