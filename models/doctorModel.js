import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
  },

  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  phone: {
    type: String,
    required: [true, "phone no is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "email is required"],
  },
  specialization: {
    type: String,
    required: [true, " specialization is trequired "],
  },
  experince: {
    type: String,
    required: [true, "experince is required"],
  },
  feePerConsultation: {
    type: String,
    required: [true, "fee is required"],
  },
  status:{
    type:String,
    default:'pending'

  },
  timings: {
    type: String,
    // required: [true, "work timing is required"],
  },
},{timestamps:true});

export const doctorModel = mongoose.model("doctors", doctorSchema);
