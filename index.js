const express = require("express");
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/postes.route")
const {authorization} = require("./middleware/auth.middleware")
const cors= require("cors")
const app= express();

app.use(cors());
app.use(express.json());

app.use("/users",userRouter)
app.use(authorization)
app.use("/posts",postRouter)

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("connect to db");
    } catch (error) {
        console.log(error)   
    }
    console.log("server is running at port 8000")
})