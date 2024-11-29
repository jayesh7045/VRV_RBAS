import express from "express"
import { getUserInfo } from "../Controllers/User.auth.js";
import { getRoomDataWithId, getRoomsData, deleteRoom } from "../Controllers/Rooms.js";
import { verifyToken } from "../Controllers/User.auth.js";
import { authorize } from "../Middlewares/UserAuth.js";
const router = express.Router();
router.get("/getallrooms", getRoomsData)
router.get("/userinfo", verifyToken, getUserInfo)
router.get("/getallrooms/:roomid", getRoomDataWithId)
router.delete("/rooms", verifyToken, authorize("admin"), deleteRoom);
export default router