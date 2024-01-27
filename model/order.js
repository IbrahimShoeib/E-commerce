
const mongoose = require("mongoose")
const joi = require("joi")
const orderSchema =new mongoose.Schema({
 

        name:{
            type:String,
            rrquired:true,
        },email:{
            type:String,
            rquired:true,
        },phone:{
            type:String,
            rquired:true,
        },street:{
            type:String,
            rrquired:true,
        },country:{
            type:String,
            rquired:true,
        },zip:{
            type:String,
            rquired:true,
        },statusOrder:{
            type:String,
            rquired:true,
        }
})

const Order = mongoose.model("order",orderSchema)

function validationOfOrder(obj){

    const schema=joi.object({
        name:joi.string().trim().min(2).max(50).required(),
        email:joi.string().trim().min(10).max(50).required(),
        phone:joi.string().trim().min(8).max(20).required(),
        street:joi.string().trim().min(3).max(100).required(),
        country:joi.string().trim().min(2).max(10).required(),
        zip:joi.string().trim().min(3).max(8).required(),
        statusOrder:joi.string().trim().min(1).max(100).required()
    })
    return schema.validate(obj)
}


module.exports= {
    Order,
    validationOfOrder
}