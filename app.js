const express= require("express");
require('dotenv').config({path:"./config.env"});
const {connectingDataBase} =require("./config/db")
const morgan = require("morgan")
const app = express();
connectingDataBase()
const Apierror=require("./utils/apiError")

//Middle were
app.use(morgan("dev"))
app.use(express.json())

//Routs
app.use("/api/product",require("./routes/product"))
app.use("/api/catigory",require("./routes/catigories"))
app.use("/api/order",require("./routes/orders"))
app.use("/api/auth",require("./routes/auth"))
app.use("/api/users",require("./routes/users"))
app.use("/api/subcatigory",require("./routes/subCatigory"))


//err handling
app.all("*",(req,res,next)=>{
    // const err = new Error(`can't find this route ${req.originalUrl}`)
    next(new Apierror (`can't find this route ${req.originalUrl}`,400))
})

//global handling midlle were
app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.status = err.status || "error"
    
        res.status(err.statusCode).json({
            statusCode:err.statusCode,
            message:err.message,
            err:err,
            stack:err.stack
        })
})


//Server
const PORT=process.env.PORT
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))