import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    
    hostel_name: {
            type:String,
            required:true
        },
        no_of_person : {
            type: String,
            required:true
        },
        rent:{
            type:String,
            required:true
        },
        imageurls : [],
        type:{
            type:String,
            required : true 
        },
        washing_machine_availability:{
            type: String, 
            required : true
        },
        wifi_availability : {
            type: String
        },
        address : {
            type: String
        },
        duration:{
            type: String
        },
        deposit_amount:{
            type: String
        },
        view : {
            type : String,
            required: true
        }
},{
    timestamps : true,
})
const mycollection = mongoose.model('mycollection', roomSchema)
export default mycollection