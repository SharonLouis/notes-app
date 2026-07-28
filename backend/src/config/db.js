import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("URI =", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error(error);
  }
};