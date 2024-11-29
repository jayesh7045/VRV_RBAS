import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "manager"], default: "user" },
    password: { type: String, required: true },
}, { timestamps: true });

const XVRUser = mongoose.model("XVRUser", userSchema);
export default XVRUser;
