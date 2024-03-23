const express=require("express");
const { connection } = require("./connection/db.js");
const app=express();
app.use(express.json());
const cors=require("cors");
require("dotenv").config();
const cookieParser=require("cookie-parser")
const PORT=process.env.port;
const {authRoute}=require("./route/authRoute.js")
const {noteRoute}=require("./route/noteRoute.js")



app.use(cors({
   origin:"http://127.0.0.1:5173",
   credentials:true
}))



app.use(cookieParser())

app.use(authRoute)

app.use("/note",noteRoute)




app.listen(PORT,async()=>{
   try {
    await connection
    console.log(`server is running on port ${PORT}`);
    
   } catch (error) {
    console.log("error in connection to DB",error,error.message);
   }
})