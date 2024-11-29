import bcrypt from "bcrypt";
import User from "../Models/User.model.js";
import generateToken from "../Utils/generateJWT.js";
import { OtpModel } from "../Models/OTP.model.js";
import { transporter, generateOTP } from "./otp.js";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET

// Signup User
export const SignupUser = async (req, res) => {
    const { name, email, contact, role = "user", password } = req.body;

    try {
        console.log("Checking if user exists...");
        const existingUser = await User.findOne({ email: new RegExp('^' + email + '$', 'i') });

        if (existingUser) {
            console.log("User already exists:", existingUser);
            return res.status(400).json({ message: "User already exists", success: false });
        }

        console.log("Generating OTP...");
        const emailOTP = generateOTP();
        const otpEntry = new OtpModel({ email, otp: emailOTP });

        console.log("Saving OTP to the database...");
        await otpEntry.save();

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Creating new user...");
        const newUser = new User({ name, email, contact, role, password: hashedPassword });

        console.log("Sending OTP email...");
        await transporter.sendMail({
            from: "jayeshwadhwani108@gmail.com", // Replace with your email
            to: email,
            subject: "Your OTP for Signup",
            html: `<p>Dear ${name},</p>
                   <p>Your OTP for signup is: <strong>${emailOTP}</strong></p>
                   <p>Please use this OTP to complete your signup process.</p>`,
        });

        console.log("Saving user to the database...");
        await newUser.save();

        const token = generateToken(newUser);

        console.log("Signup successful, sending response...");
        return res.status(201).json({
            data: newUser,
            message: "Email has been sent to your email address",
            token,
            success: true,
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Error registering user", success: false });
    }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        console.log(`Verifying OTP for email: ${email}`);
        const otpRecord = await OtpModel.findOne({ email });

        if (!otpRecord) {
            return res.status(404).json({ message: "No OTP found for this email", success: false });
        }

        // Securely compare OTP
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP", success: false });
        }

        console.log("OTP verified successfully");
        await OtpModel.deleteOne({ email }); // Cleanup OTP after verification
        return res.status(200).json({ message: "OTP verification successful", success: true });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) return res.status(404).json({ message: "User not found" });
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });
  
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided", success: false });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(403).json({ message: "Invalid token", success: false });
    }
};

export const getUserInfo = (req, res) => {
    const { role } = req.user; // Extracted from the JWT in verifyToken middleware
    res.status(200).json({ role });
};