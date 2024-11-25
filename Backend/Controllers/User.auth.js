import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../Models/User.model.js"

export const Signup = async(req, res)=>{
    const {name, email, contact, role, password } = req.body;

    try{
        const user = User.findOne({email});
        if(user)
        {
            return res.status(400).json({message : "User Already Exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(
            {
                name, email, contact, role, password : hashedPassword
            }
        )
        await newUser.save();
        return res.send(201).json({message : "User Registered Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : "Error registering user"})
    }

}


export const loginUser=async (req, res)=>{
    try {
        const {name, email, contact, role, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a token or respond with user info (based on your application logic)
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

