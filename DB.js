

const mongoose = require('mongoose');

// Function to connect to MongoDB
async function connect() {
  try {

    const uri = 'mongodb+srv://khanhassan1032:tSSnKGAgwtV5vdWa@cluster0.n8i7gys.mongodb.net/bookMangement';


  

    // Connect to MongoDB
    await mongoose.connect(uri, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connect };
