import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  
    },
    contact: {
      type: String,
      required: true,
      unique: true,  
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user', 'moderator'], 
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiration: {
      type: Date,
      required: false, 
    },
  },
  { timestamps: true } 
);

const User = mongoose.model('User', userSchema);

export default User;
