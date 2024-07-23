const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userImage: {
    type: String, // Assuming it's a URL or file path
    required: false, // Set to true if required
  },
  weight: {
    type: Number,
    required: true,
  },
  weightUnit: {
    type: String,
    enum: ['kg', 'lbs'], // Adjust as needed
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'], // Adjust as needed
    required: true,
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'active', 'very active'], // Adjust as needed
    required: true,
  },
  climate: {
    type: String,
    enum: ['hot', 'cold', 'mild'], // Adjust as needed
    required: false, // Set to true if required
  },
});

// Check if the model already exists and use it, otherwise create a new model
module.exports = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
