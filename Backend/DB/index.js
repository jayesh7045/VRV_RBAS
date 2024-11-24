import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.URL)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(err){
        console.log("MongoDb connection error ", err.message);
        process.exit(1);
    }
    
}

