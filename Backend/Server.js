import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import { connectDB } from "./DB/index.js";
import authRoutes from "./Routes/UserAuthRoutes.js"

dotenv.config();

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use('/api/auth/', authRoutes)
connectDB()
app.get("/", (req, res)=>{
    res.send("Server is Running");
})
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log("The Server is running on the port ", PORT)
})