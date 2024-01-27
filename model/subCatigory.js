const mongoose = require("mongoose")

const subCatigorySchema= new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        unique:[true,"sub Catigory must be unique"],
        minlenght:[2, "to short subCatigory name"],
        maxlenght:[32,"to long subCatigory name"]
    },
    slug:{
        type:String,
        lowercase:true
    },
    catigory:{
        type:mongoose.Schema.ObjectId,
        ref:"Catigory",
        required:[true,"subcatigory must be belong to perant catigory"]
    }



},{timestamps:true})

const subCatigory = mongoose .model("subCatigory",subCatigorySchema)

module.exports= subCatigory