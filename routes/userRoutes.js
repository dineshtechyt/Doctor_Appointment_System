import express from "express";
import mongoose from "mongoose";
import {
  applyDoctorController,
  authController,
  deleteAllNotification,
  getAllDoctorsController,
  getAllNotificationController,
  getDoctorByIdController,
  loginController,
  registerController,
} from "../controllers/userController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

export const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/info", requireSignIn, (req, res) => {
  console.log("hello ji");
  res.send("correct");
});
router.post("/getUserData", requireSignIn, authController);
router.post("/apply-doctor", requireSignIn, applyDoctorController);
router.post(
  "/get-all-notification",
  requireSignIn,
  getAllNotificationController
);
router.post("/delete-all-notification", requireSignIn, deleteAllNotification);
router.get("/getAllDoctors", requireSignIn, getAllDoctorsController);
router.post("/getSingleDoctor",requireSignIn,getDoctorByIdController)