
// noteRoute.js 
const express=require("express");
const noteRoute=express.Router();
const {NoteModel}=require("../model/noteModel.js");
const {auth}=require("../middleware/auth.js")


noteRoute.get("/",auth,async(req,res)=>{
    try {
        const allNotes=await NoteModel.find({userId:req.body.userId,user:req.body.user});
        res.send(allNotes)
    } catch (error) {
        console.log(error)
    }
})


noteRoute.post("/add",auth,async(req,res)=>{
    const {title,description,userId,user}=req.body;
    try {
        const newNote= new NoteModel({title,description,userId,user})
        console.log("reached to note post route")
        await newNote.save()
        res.status(200).send({ message:`New note ${title} created`, newNote})
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: "Something went wrong" })
    }
})


noteRoute.patch("/update/:noteId",auth,async(req,res)=>{
   
    try {
        const {noteId}=req.params
        const updateData=req.body
        await NoteModel.findByIdAndUpdate({_id:noteId},updateData)
       
        res.send("updated")
    } catch (error) {
        console.log(error)
    }
})


noteRoute.delete("/delete/:noteId",auth,async(req,res)=>{
  
    try {
        const {noteId}=req.params
        await NoteModel.findByIdAndDelete({_id:noteId})
        res.send("deleted")
    } catch (error) {
        console.log(error)
    }
})
module.exports={noteRoute}