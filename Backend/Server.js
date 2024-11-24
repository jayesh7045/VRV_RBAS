import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.send("Server is Running");
})
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log("The Server is running on the port ", PORT)
})