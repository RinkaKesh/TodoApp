const express=require("express");
const authRoute=express.Router();
const tokenRoute=express.Router();
require("dotenv").config();
const cookieParser=require("cookie-parser")
const {UserModel}=require("../model/userModel");
const {authValidator}=require("../middleware/authValidator.js")
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {blacklist}=require("../blacklist")
const { TokenModel}=require("../model/tokenModel.js")

authRoute.post("/register",async(req,res)=>{
    try {
         const {username,email,password}=req.body;
        //  console.log("reached")
         const isUserPresent=await UserModel.findOne({email})
         if(isUserPresent) {
          res.status(400).send({error:`user with Email ${email} already exist`})
         }

        else{bcrypt.hash(password,6,async function(err,hash){
            if(err){
                res.status(400).send({error: "Internal Server Error"})
                console.log(err)
            }else{
                const newUser=new UserModel({username,email,password:hash})
                await newUser.save()
                res.status(200).send({ message:`${username} Registered Successfully`})
            }
         })}
         
    } catch (error) {
        res.status(400).send({error: "Internal Server Error"});
        // console.log({message:"Error",error})
    }
})



authRoute.post("/login", authValidator, async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        const accessToken = jwt.sign(
          { userId: user._id, user: user.username },
          "k",
          { expiresIn: 600 }
        );
  
        const refreshToken = jwt.sign(
          { userId: user._id, user: user.username },
          "rk",
          { expiresIn: 1200 }
        );
  
        console.log(`accessToken:${accessToken}, refreshToken:${refreshToken}`);
  
        res.cookie("access-Token", accessToken);
        res.cookie("refresh-Token", refreshToken);
  
        res.status(200).send({ message:`${user.username} Logged in successfully`,accessToken, refreshToken });
        console.log("Logged in");
      } else {
        console.log("Wrong credentials");
        res.status(401).send({ error: "Wrong credentials" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  


  authRoute.get("/logout", async (req, res) => {
    try {
        const cookies = req.cookies;
        const accessToken = cookies["access-Token"];

        if (!accessToken) {
            return res.status(401).send({ "message": "Invalid token" });
        }

        
        const newToken = new TokenModel({ token: accessToken });
        await newToken.save();
        console.log("token saved to DB")


        res.clearCookie('access-Token');
        res.status(200).send({ "message": "User logout successful" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ "error": "Internal server error" });
    }
});

module.exports={authRoute}