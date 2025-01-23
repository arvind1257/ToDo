import users from "../Models/User.js"
import  jwt  from "jsonwebtoken"
export const LoginProcess = async(req,res) => {
    try{
        console.log(req.body)
        let User = await users.findOne({email:req.body.email,password:req.body.password})
        if(User){
            const token = jwt.sign({...User},"test",{expiresIn:"24h"})
            res.send({
                status:200,
                message:"Login Successfully",
                token,
                User
            })
        } 
        else{
            res.send({
                status:400,
                message:"Invalid Email or Password"
            })
        }
    }
    catch(err){
        console.log(err);
        res.send({status:500,message:"Internal Server Error"});
    }
}

export const getUser = async(req,res) => {
    try{
        let User = await users.findOne({_id:req.params.id})
        if(User){
            res.send({status:200,userList:User})
        } 
        else{
            res.send({
                status:400,
                message:"Invalid"
            })
        }
    }
    catch(err){
        console.log(err);
        res.send({status:500,message:"Internal Server Error"});
    }
}

export const getUserAll = async(req,res) => {
    try{
        let User = await users.find()
        let temp = [];
        User.map((item)=>{
            temp.push({
                name:item.name,
                _id:item._id,
                email:item.email
            })
            return true;
        })
        if(User.length>0){
            res.send({status:200,userList:temp})
        } 
        else{
            res.send({
                status:400,
                message:"Invalid"
            })
        }
    }
    catch(err){
        console.log(err);
        res.send({status:500,message:"Internal Server Error"});
    }
}

export const SignupProcess = async(req,res) => {
    try{
        if(req.body.name && req.body.email && req.body.password && req.body.confirm && req.body.password==req.body.confirm && req.body.role){
            const ex_user = await users.find({email:req.body.email})
            if(ex_user.length==0){
                await users.create(req.body);
                res.send({
                    status:200,
                    message:"SignUp Successfully"
                })
            }
            else{
                res.send({
                    status:400,
                    message:"An User Exist with this Email ID."
                })
            }
        } 
        else{
            res.send({
                status:400,
                message:"Kindly fill all the details."
            })
        }
    }
    catch(err){
        console.log(err);
        res.send({status:500,message:"Internal Server Error"});
    }
}

export const LogoutProcess = async(req,res) => {
    
}
