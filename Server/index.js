import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import messageRoutes from "./Routes/Message.js"

const app = express();
app.use(express.json({limit:"30mb",extended:"true"}))
app.use(cors())

app.get('/',(req,res)=>{
    res.send("This is the backend of ToDo application.");
})

app.use('/message',messageRoutes)

const PORT = 5000;

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://arvindmm760:arvind1234@mycluster.bl5hz.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster/ToDo")
.then(() => app.listen(5000,() => console.log("successfully Connected")))
.catch((err) => console.log(err.message))

