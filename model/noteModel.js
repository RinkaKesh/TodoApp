
//noteModel.js

const mongoose=require("mongoose");

const noteSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    userId:{type:String,required:true},
    user:{type:String,required:true},
    createdOn:{type:Date,default:Date.now},
    updatedOn:{type:Date,default:null}
},
{versionKey:false})

const NoteModel=mongoose.model("note",noteSchema);

module.exports={NoteModel}