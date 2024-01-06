import { doctorModel } from "./../models/doctorModel.js";

export const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "somethign went wrong" });
  }
};

export const updateDoctorController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "updated successFully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "something went wrong",
    });
  }
};
