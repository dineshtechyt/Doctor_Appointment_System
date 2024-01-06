import express from "express";
import { requireSignIn } from "./../middlewares/authMiddleware.js";
import { getDoctorInfoController, updateDoctorController } from "../controllers/doctorController.js";
export const drouter = express.Router();
drouter.post("/getDoctorInfo", requireSignIn, getDoctorInfoController);
drouter.post("/updateInfo", requireSignIn, updateDoctorController);
