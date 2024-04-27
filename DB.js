const mongoose = require("mongoose");
import dotenv from 'dotenv';
dotenv.config()


async function connect() {
  try {
    
    await mongoose.connect(process.env.URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { connect };
