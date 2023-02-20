const jwt= require("jsonwebtoken")

const authorization=(req,res,next)=>{
    let token=req.headers.authorization
    if(token){
         jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userId=decoded.userId
                next()
            }else{
                res.send({"msg":"please login first"})
            }
         })
    }else{
        res.send({"msg":"please login first"})
    }
}

module.exports={authorization}