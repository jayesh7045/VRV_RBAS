import dotenv from "dotenv"
import nodemailer from "nodemailer"
import crypto from "crypto"
dotenv.config();
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.PASSWORD,
    },
  });

export const generateOTP=()=> {
    return crypto.randomInt(100000, 999999).toString();
  }

