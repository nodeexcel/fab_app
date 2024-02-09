import { exhibitionServices } from "../services/exhibition/exhibition.service.js";
import fs from "fs";

export const setExhibition = async (req, res, next) => {
  if(!req.file) return res.status(404).send("file not selected")
  try {
    const data = await exhibitionServices.createExhibution({
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
    console.log(error);
    res.status(501).send({ success: false, message: error.message });
  }
};
