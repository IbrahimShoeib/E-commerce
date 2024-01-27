const mongoose=require("mongoose")
const joi = require("joi")
const jwt = require("jsonwebtoken")

const userSchema =new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   street:{
    type:String,
    required:true
   },
   aparatment:{
    type:String,
    default:""
   },

   city:{
    type:String,
    default:""
   },
   zip:{
    type:String,
    default:""
   },
   country:{
    type:String,
    default:""
   },
   phone:{
    type:Number,
    required:true
   },
   isAdmin:{
    type:Boolean,
    default:false
    
   },
   token:{
    type:[]
   }
})
userSchema.methods.generateToken = function(){
    return jwt.sign({id : this._id , isAdmin: this.isAdmin,randomNumber : Math.random()},process.env.JWT_SECRET_KEY ,{expiresIn:"100d"})

     
 }

userSchema.virtual('id').get(function() {
    this,_id.toHexString();
})
userSchema.set('toJSON',{
    virtual:true
})

function validateRegisterUser(obj){
    
    const schema =joi.object({
        name:joi.string().min(2).max(20).required(),
        email:joi.string().min(10).required(),
        password:joi.string().min(2).required(),
        street:joi.string().min(2).max(14).required(),
        phone:joi.string().min(2).max(14).required()
    })
    return schema.validate(obj)
}
function validationLoginUser(obj){
    const schema= joi.object({
       email:joi.string().trim().min(5).max(100).required(),
       password:joi.string().min(6).required(),
    })
    return schema.validate(obj);
};

function validateOfAdmin(obj){
    

}

const User = mongoose.model("user",userSchema)



module.exports = {
    User,
    validateRegisterUser,
    validationLoginUser
}
