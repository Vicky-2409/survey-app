import mongoose from "mongoose";
import AdminModel from "../models/admin.model";
import dotenv from "dotenv";
import { connectDB } from "../config/database";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await AdminModel.findOne({
      email: "admin@gmail.com",
    });

    if (adminExists) {
      console.log("Admin user already exists");
    } else {
      const admin = new AdminModel({
        email: "admin@gmail.com",
        password: "Admin@123",
      });

      await admin.save();
      console.log("Admin user created successfully");
    }

    await mongoose.disconnect();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
};

seedAdmin();
