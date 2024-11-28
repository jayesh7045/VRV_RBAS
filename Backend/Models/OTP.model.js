import mongoose from "mongoose";
const OtpSchema = new mongoose.Schema({
    email : {
        type : String,
        required :true
    },
    otp:{
        type : String, 
        required: true
    }
})
export const OtpModel = mongoose.model("otp", OtpSchema);