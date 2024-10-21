import { clsx, type ClassValue } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectToDB = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) {
      return true;
    }
    const { connection } = await mongoose.connect(
      process.env.MONGO_URI as string,
      { dbName: "nextAuth" }
    );

    console.log("Connected", connection);
  } catch (error) {
    throw new Error("Error while connecting");
  }
};