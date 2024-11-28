import bcrypt from "bcrypt"
import User from "../Models/User.model.js"
import generateToken from "../Utils/generateJWT.js"
import { OtpModel } from "../Models/OTP.model.js"
import { transporter, generateOTP } from "./otp.js";


export const SignupUser = async (req, res) => {
    const { name, email, contact, role, password } = req.body;

    try {
        console.log("Checking if user exists...");
        const user = await User.findOne({ email: new RegExp('^' + email + '$', 'i') });

        if (user) {
            console.log("User already exists:", user);
            return res.status(400).json({ message: "User Already Exists" }); // Ensure no further code executes
        }

        console.log("Generating OTP...");
        const emailOTP = generateOTP();
        const optmodel = new OtpModel({
            email,
            otp: emailOTP,
        });

        console.log("Saving OTP to the database...");
        await optmodel.save();

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Creating new user...");
        const newUser = new User({
            name,
            email,
            contact,
            role,
            password: hashedPassword,
        });

        console.log("Generating token...");
        const token = generateToken(newUser);

        console.log("Saving new user to the database...");
        
        await transporter.sendMail({
            from: "jayeshwadhwani108@gmail.com", // Replace with your email
            to: email,
            subject: "Your OTP for Signup",
            html: `<p>Dear ${name},</p>
                   <p>Your OTP for signup is: <strong>${emailOTP}</strong></p>
                   <p>Please use this OTP to complete your signup process.</p>`,
        });
        console.log("Signup successful, sending response...");
        await newUser.save();
        return res.status(201).json({
            message: "Email has been sent to your email address",
            token,
            success: true,
        }); 
    } catch (error) {
        console.error("Error during signup:", error);
        if (!res.headersSent) { // Check to avoid duplicate responses
            res.status(500).json({ message: "Error registering user" });
        }
    }
};



export const verify_otp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const userFound = await OtpModel.findOne({ email });
        if (userFound) {
            if (userFound.otp === otp) {
                return res.status(201).json({ message: "Signup Successful" });
            } else {
                return res.status(400).json({ message: "Invalid OTP" });
            }
        } else {
            return res.status(404).json({ message: "No OTP found for this email" });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res)=>{
    try { 
        const {email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user);
        res.status(200).json({ message: "Login successfull", token, success : true });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

