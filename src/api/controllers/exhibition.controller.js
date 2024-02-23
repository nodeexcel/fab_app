import { exhibitionServices } from "../services/exhibition/exhibition.service.js";
import fs from "fs";

export const setExhibition = async (req, res, next) => {
  try {
    const data = await exhibitionServices.createExhibition({
      ...req.body,
      imageURL:req.file ? `http://116.202.210.102:3005/images/${req.file.filename}` : "",
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
      const exbData = await exhibitionServices.fetchExhibition(id);
      const imgName = exbData.imageURL?.split('/')[4];
      const url = `http://116.202.210.102:3005/images/${req.file.filename}`
                
      if(fs.existsSync(`src/uploads/${imgName}`) && exbData.imageURL!== url) fs.unlinkSync(`src/uploads/${imgName}`);
      const updatedExb = await exhibitionServices.updateExhibition(id, {
        ...req.body,
        imageURL:url,
      });
      return res.status(201).send({ success: true, updatedExb });
    } else {
      const updatedExb = await exhibitionServices.updateExhibition(id, req.body);
      return res.status(201).send({ success: true, updatedExb });
    }
  } catch (error) {
    
    res.status(501).send({ success: false, message: error.message });
  }
};
