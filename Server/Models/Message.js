import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    title :{type:String,required:true},
    note :{type:String,required:true},
    createdDate :{type:Number,default:new Date().getTime()},
    updatedDate :{type:Number,default:new Date().getTime()},
    user:{type:String,required:true},
    taskStatus:{type:String,default:"Not Started"},
    deadLine:{type:Number,required:true}
})

export default mongoose.model("Messages",messageSchema)