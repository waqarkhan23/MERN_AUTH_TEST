import { Router } from "express";
import { addVehicle } from "../controllers/vehicle.controller.js";
import upload from "../middleware/multer.js";

const vehicleRouter = Router();

vehicleRouter.post(
  "/vehicleInformation",
  upload.array("images", 10),
  addVehicle
);

export default vehicleRouter;
