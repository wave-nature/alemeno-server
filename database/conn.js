import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Add this option for better compatibility
    });

    console.log(`DB is connected ✅`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
  }
}
