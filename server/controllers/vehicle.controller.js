import Vehicle from "../models/vehicle.model.js";
import { uploadMediaToCloudinary } from "../utils/cloudinary.js";
import fs from "fs/promises";
export const addVehicle = async (req, res) => {
  const { carModel, price, phoneNumber } = req.body;
  const totalImages = req.files.length ? req.files.length : 0;
  const imagesArray = req.files;

  // for save the user reference to the vehicle here we need to authenticate  USER  by a authentication middleware first
  // but for now, let's assume we have the following  user's id in req.user._id
  //  and we also can populate the user details with its id to send in response

  const userId = "6745ce8af4b0708190eec0c7";

  try {
    if (!carModel || !price || !phoneNumber) {
      res.status(400).json({ message: "All fields are required" });
    }
    if (!imagesArray || imagesArray.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadedImages = [];

    for (const file of imagesArray) {
      const result = await uploadMediaToCloudinary(file);
      uploadedImages.push(result.secure_url);
    }
    const newVehicle = await Vehicle.create({
      carModel,
      price,
      phoneNumber,
      totalImages,
      images: uploadedImages,
      owner: userId,
    });

    for (const file of imagesArray) {
      await fs.unlink(file.path);
    }

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle: newVehicle,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    for (const file of imagesArray) {
      await fs.unlink(file.path).catch((err) => {
        console.error(`Failed to delete file ${file.path}:`, err.message);
      });
    }
  }
};
