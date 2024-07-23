import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,  
    default: null,
  },
  weightUnit: {
    type: String,  
    default: null,
  },
  age: {
    type: Number, 
    default: null,
  },
  gender: {
    type: String,  
    default: null,
  },
  activityLevel: {
    type: String, 
    default: null,
  },
  climate: {
    type: String,  
    default: null,
  },
}, {
  timestamps: true,  
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema, 'register');

export default User;
