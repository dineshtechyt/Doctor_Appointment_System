import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { changeAccountStatusController, getAllDoctorsController, getAllUsersController } from "../controllers/adminController.js";
export const arouter = express.Router();

arouter.get("/getAllUsers", requireSignIn, getAllUsersController);
arouter.get("/getAllDoctors", requireSignIn, getAllDoctorsController);
arouter.post("/changeAcoountStatus",requireSignIn,changeAccountStatusController)