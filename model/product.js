const mongoose = require ("mongoose");
const{Schema}=mongoose
const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlenght:5,
        maclenght:200
    },
    description:{
        type:String,
        required:true
    },
    richdescription:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    images:[{
        type:String,
}],
    brand:{
        type:String,
        default:""

    },
    price:{
        type:Number,
        default:0
    },
    catigory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"catigory",
        required:true
    }
   , countInStock:{
        type:Number,
        required:true,
        min:0,
        max:225
    },
    rating:{
        type:Number,
        default:0
    },
    ifFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now

    }
})

const Product = mongoose.model("product",productSchema)



module.exports = Product
