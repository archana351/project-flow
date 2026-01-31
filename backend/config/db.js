const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Using local MongoDB connection
    // Make sure MongoDB is running on your machine
    await mongoose.connect('mongodb://localhost:27017/project-flow', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
