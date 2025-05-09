import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,  // Тайм-аут на выбор сервера (30 секунд)
      socketTimeoutMS: 45000
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

export default connectDB;
