import bcrypt from "bcryptjs";
import { userModel } from "./../models/userModel.js";
import { doctorModel } from "./../models/doctorModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(200).send({
        success: true,
        message: "hii you are eamil already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    // console.log(user);
    if (!user) {
      res.status(400).send({
        success: false,
        message: "something is went wrong",
      });
    }
    res.status(200).send({
      success: true,
      message: "hii your data is save successfully",
      user,
    });
  } catch (error) {
    // console.log(error);
    res.status(200).send({
      message: "something went wrong",
      success: false,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(200).send({
        message: "here went wrong",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(200).send({
        message: "invlaid emIL AND PASSWRORD ",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      success: true,
      message: "login successsfully",
      token,
    });
  } catch (error) {
    res.status(400).send({
      message: "invlaid emIL AND PASSWRORD ",
      success: true,
    });
  }
};
export const authController = async (req, res) => {
  try {
    // console.log(req.body.userId)
    const { token } = req.body;
    // console.log(token);
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user uot found",
        success: true,
      });
    } else {
      // console.log(user)
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "error",
      success: false,
      error,
    });
  }
};

export const applyDoctorController = async (req, res) => {
  try {
    // console.log("    hello you  are in the ")
    const newDoctor = new doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    // console.log(newDoctor);
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;

    // console.log(notification);
    notification.push({
      type: "apply doctor request",
      message: `${newDoctor.firstName} has applied`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(200).send({
      success: true,
      message: "doctor account apply successfulyy",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "error",
      success: false,
      error,
    });
  }
};
export const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    // console.log(user)
    const seennotification = user.seenNotification;
    const notification = user.notification;

    seennotification.push({ ...notification });
    user.notification = [];
    user.seenNotification = notification;
    // console.log(user);
    const updatedUser = await user.save();

    res.status(200).send({
      success: true,
      message: "all notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "error",
      success: false,
      error,
    });
  }
};

export const deleteAllNotification = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "notification delete successful",
      data: updateUser,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "error",
      success: false,
      error,
    });
  }
};

export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "doctors list fetch successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({
      message: "error",
      success: false,
      error,
    });
  }
};
export const getDoctorByIdController = async (req, res) => {
  try {
    // console.log(req.body.doctorId)
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
  //  console.log(doctor)
    res.status(200).send({
      success: true,
      message: "single doc info fetched",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      message: "error",
      success: false,
      error,
    });
  }
};
