const express= require("express")
const {userModel} = require("../model/users.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter= express.Router()

userRouter.post("/register", async (req,res)=>{
    const {name,email,gender,password,age,city}=req.body
    const user= await userModel.find({email});
     try {
        if(user.length==0){
            bcrypt.hash(password,4,async (err,hash)=>{
                if(err){
                    res.send({"msg":err.message})
                }else{
                    await new userModel({name,email,gender,password:hash,age,city}).save()
                    res.send({"msg":"new user has been register"})
                }
            })
        }else{
            res.send({"msg":"User already exist, please login"})
        }
     } catch (error) {
        res.send({"msg":error.message})
     }
})

userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const user= await userModel.find({email})
    try {
        if(user.length==1){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user[0]._id,name:user[0].name},"masai")
                    res.send({"msg":"user login succufully","token":token})
                }else{
                    res.send({"msg":err.message})
                }
            })
        }else{
            res.send({"msg":"please login first"})
        }
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={userRouter}


// {
//     "name":"shubham",
//     "email":"shubham@gmail.com",
//     "gender":"male",
//     "password":"shubham",
//     "age":22,
//     "city":"delhi"
// }


// {
//     "title":"dance",
//     "body":"modfllj",
//     "device":"Tablet",
//     "no_if_comments":"Number"
// }