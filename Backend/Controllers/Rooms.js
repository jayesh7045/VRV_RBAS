import Room from "../Models/room.model.js"
export const getRoomsData = async(req, res)=>{
    try{
        const room = await Room.find({})
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
        const room = await Room.findOne({_id : roomid})
        console.log(room)
        res.send(room)
    }
    catch(err){
        return res.status(400).json({message : err});
    }
}
