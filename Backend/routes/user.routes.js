const express = require("express")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.models")
const bcrypt = require("bcrypt")


// REGISTER ROUTE
userRouter.post("/signup",async (req,res)=>{
    const {pass} = req.body
    try{
        bcrypt.hash(pass, 5, async(err, hash)=>{
            // Store hash in your password DB.
            if(hash){
                const user = new UserModel({...req.body,pass:hash})
                await user.save()
                res.status(200).send({"msg":"User has been registered"})
            }else{
                res.status(400).send({"Error":err})
            }
        });
        
    }catch(err){
        res.status(400).send({"Error":err})
    }
})


// LOGIN ROUTE
userRouter.post("/signin",async (req,res)=>{
    const {email,pass} = req.body;
    const user = await UserModel.findOne({email})
    try{
        bcrypt.compare(pass, user.pass, (err, result)=>{
            if(result){
                var token = jwt.sign({ posted_by : user.name,user_id:user._id }, 'sarim')
                res.status(200).send({"msg":"Login Successfull","token":token,"username":user.name})
            }else{
                res.status(400).send({"Error":err})
            }
        });

    }catch(error){
        res.status(400).send({"Error":error})
    }
})


module.exports=userRouter