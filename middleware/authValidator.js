const authValidator=(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.send ("Fill all the inputs")
    }
    next()
}

module.exports={authValidator}