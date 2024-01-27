const mongoose=require("mongoose")
const catigorySchema =new mongoose.Schema({
   name:{
    type:String,
    required:[true ,"catigory required"],
    unique:[true,"catigory must be unique"],
    minlenght:[3,"too short catigory name "],
    maxlenght:[32,"too short catigory name "],
    },
    // slug => a AND B =>A-ANA-B
    slug:{
        type:String,
        lowercase:true
    },
    image:{
        type:String
    }
},{timestamps:true},

)

const Catigory = mongoose.model("catigory",catigorySchema)



module.exports = Catigory
