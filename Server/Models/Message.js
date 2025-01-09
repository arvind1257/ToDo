import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    title :{type:String,required:true},
    note :{type:String,required:true},
    createdDate :{type:Number,default:new Date().getTime()},
    updatedDate :{type:Number,default:new Date().getTime()},
})

export default mongoose.model("Messages",messageSchema)