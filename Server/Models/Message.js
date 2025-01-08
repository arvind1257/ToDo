import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    title :{type:String,required:true},
    note :{type:String,required:true},
    createdDate :{type:Date,default:new Date()},
    updatedDate :{type:Date,default:new Date()},
})

export default mongoose.model("Messages",messageSchema)