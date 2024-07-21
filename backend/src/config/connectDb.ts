import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_CONNECTION_STRING: string = process.env
  .MONGODB_CONNECTION_STRING as string;

const connectDb = () => {
  mongoose
    .connect(MONGODB_CONNECTION_STRING)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
};

export default connectDb;
