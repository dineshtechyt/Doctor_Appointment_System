import { userModel } from "./../models/userModel.js";
import { doctorModel } from "./../models/doctorModel.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      message: "success",
      success: true,
      data: users,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "something is wrong",
      success: false,
    });
  }
};

export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});

    res.status(200).send({
      success: true,
      message: "successful",
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({
      message: "something is wrong",
      success: false,
    });
  }
};

export const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    // const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status })
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-requiest-updated",
      message: `your doctor request is ${status}`,
      onClickPath: "/notification",
    });

    // console.log("======"+doctor.status)    ;
    doctor.status === "pending" ? (user.isDoctor = "true") : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "account status updated",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      message: "something is wrong",
      success: false,
    });
  }
};
