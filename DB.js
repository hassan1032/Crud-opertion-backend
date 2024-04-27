import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()


async function connect() {
  try {
    
    await mongoose.connect(process.env.URL);
    console.log(" The  Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connect()
