import express from "express";
import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connect("mongodb://0.0.0.0:27017/doctor");

    console.log(`mongodb connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
