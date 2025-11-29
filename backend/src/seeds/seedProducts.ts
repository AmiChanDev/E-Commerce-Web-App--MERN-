import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product";
import { seedProducts } from "./productData";

dotenv.config();

const seedDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB connected");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert seed products
    await Product.insertMany(seedProducts);
    console.log(`✅ Successfully seeded ${seedProducts.length} products`);

    mongoose.connection.close();
    console.log("👋 Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
