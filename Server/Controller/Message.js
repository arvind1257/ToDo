import messages from "../Models/Message.js"

export const PostMessage = async(req,res) => {
    try{
        if(req.body.title!="" && req.body.note!=""){
            await messages.create(req.body);
            res.status(200).send("Note Created Successfully");
        }
        else{
            res.status(400).send("Some fields are missing");
        }
    }   
    catch(err)
    {
        console.log(err)
        res.status(500).send("Internal Server Error");
    }
}

export const GetMessage = async(req,res) => {
    try{
        const list = await messages.find()
        res.status(200).send(list)
    }   
    catch(err)
    {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

export const UpdateMessage = async(req,res) => {
    try{
        const id = req.params.id;
        const status = await messages.updateOne({_id:id},{...req.body,updatedDate:new Date().getTime()})
        if(status.modifiedCount>0){
            res.status(200).send("Note Updated Successfully");
        }
        else{
            res.status(400).send("Invalid ID");
        }
        
    }   
    catch(err)
    {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

export const DeleteMessage = async(req,res) => {
    try{
        const id = req.params.id;
        const status = await messages.deleteOne({_id:id});
        if(status.deletedCount>0){
            res.status(200).send("Note Deleted Successfully");
        }
        else{
            res.status(400).send("Invalid ID");
        }
    }   
    catch(err)
    {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}
