const express = require("express");
const {postModel} = require("../model/post.model")
const postRouter= express.Router();

postRouter.get("/",async (req,res)=>{
    try {
        let query={};
        const {device1,device2}=req.query
        if(device1){
            query.device=device1
        }else if(device2){
            query.device=device2
        }
        query.userId=req.body.userId
        const postData= await postModel.find(query)
        res.send(postData) 
    } catch (error) {
        res.send({"msg":error.message})
    }
})

postRouter.get("/top",async (req,res)=>{
    try {
        const postData= await postModel.find({userId:req.body.userId})
        res.send(postData) 
    } catch (error) {
        res.send({"msg":error.message})
    }
})

postRouter.post("/create",async (req,res)=>{
    try {
        await new postModel(req.body).save()
        res.send({"msg":"post created"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

postRouter.patch("/update/:id",async (req,res)=>{
    const post= await postModel.findOne({_id:req.params.id})
    try {
        if(post.userId===req.body.userId){
            await postModel.findByIdAndUpdate({_id:req.params.id},req.body)
            res.send({"msg":"post updateted"})
        }else{
            res.send({"msg":"you are not authorized"})
        }
    } catch (error) {
        res.send({"msg":error.message})
    }
})

postRouter.delete("/delete/:id",async (req,res)=>{
    const post= await postModel.findOne({_id:req.params.id})
    try {
        if(post.userId===req.body.userId){
            await postModel.findByIdAndDelete({_id:req.params.id})
            res.send({"msg":"post deleted"})
        }else{
            res.send({"msg":"you are not authorized"})
        }
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={postRouter}
