import express from "express"
import { getRoomDataWithId, getRoomsData } from "../Controllers/Rooms.js";
const router = express.Router();
router.get("/getallrooms", getRoomsData)
router.get("/getallrooms/:roomid", getRoomDataWithId)
router.delete("/rooms/:roomid", verifyToken, authorizeRoles("admin"), deleteRoom);
export default router