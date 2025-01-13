import messages from "../Models/Message.js"

export const PostMessage = async(req,res) => {
    try{
        if(req.body.title!="" && req.body.note!=""){
            await messages.create(req.body);
            res.status(200).send({status:200,message:"Note Created Successfully"});
        }
        else{
            res.status(400).send({status:400,message:"Some fields are missing"});
        }
    }   
    catch(err)
    {
        console.log(err)
        res.status(500).send({status:500,message:"Internal Server Error"});
    }
}

export const GetMessage = async(req,res) => {
    try{
        const list = await messages.find().sort({createdDate:-1})
        res.status(200).send(list)
    }   
    catch(err)
    {
        console.log(err)
        res.status(500).send({status:500,message:"Internal Server Error"})
    }
}

export const UpdateMessage = async(req,res) => {
    try{
        const id = req.params.id;
        const status = await messages.updateOne({_id:id},{...req.body})
        if(status.modifiedCount>0){
            res.status(200).send({status:200,message:"Note Updated Successfully"});
        }
        else{
            res.status(400).send({status:400,message:"Invalid ID"});
        }
        
    }   
    catch(err)
    {
        console.log(err)
        res.status(500).send({status:500,message:"Internal Server Error"})
    }
}

export const DeleteMessage = async(req,res) => {
    try{
        const id = req.params.id;
        const status = await messages.deleteOne({_id:id});
        if(status.deletedCount>0){
            res.status(200).send({status:200,message:"Note Deleted Successfully"});
        }
        else{
            res.status(400).send({status:400,message:"Invalid ID"});
        }
    }   
    catch(err)
    {
        console.log(err)
        res.status(500).send({status:500,message:"Internal Server Error"})
    }
}
