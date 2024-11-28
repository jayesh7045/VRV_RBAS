import express from "express"

import {SignupUser, loginUser, verify_otp} from "../Controllers/User.auth.js"



const router = express.Router();
router.post("/signup", SignupUser)
router.post("/login", loginUser)
router.post("/verify_otp", verify_otp)
export default router