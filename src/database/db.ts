import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connection = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/miranda-database`);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};
