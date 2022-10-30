import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectionStr = process.env.MONGO_DB;

export const db = async () => {
  try {
    await mongoose.connect(connectionStr, { useNewUrlparser: true });
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};
