import mycollection from "../Models/room.model.js"


export const getRoomsData = async(req, res)=>{
    try{
        const room = await mycollection.find({})
        console.log(room)
        res.send(room)
    }
    catch(error){
        return res.status(400).json({message : error});
    }
}

export const getRoomDataWithId = async(req, res)=>{
    const roomid = req.params.roomid
    console.log("Jayesh", roomid)
    try{
        const room = await mycollection.findOne({_id : roomid})
        console.log(room)
        res.send(room)
    }
    catch(err){
        return res.status(400).json({message : err});
    }
}

export const deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId; // Get room ID from route parameters

        // Check if the room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Delete the room
        await Room.findByIdAndDelete(roomId);
        return res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
