const mongoose=require("mongoose");

const tokenSchema=mongoose.Schema({
    token:{type:String,required:true},
   
},{versionKey:false})

const TokenModel=mongoose.model("token",tokenSchema);

module.exports={TokenModel}