import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
const generateToken = (user) => {
    const payload = {
        email: user.email,
        role: user.role, 
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
export default generateToken 