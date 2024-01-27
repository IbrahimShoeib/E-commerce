const {User,validateRegisterUser,validationLoginUser}=require("../model/user")
//import bycrpt

const bcrypt = require ("bcrypt")
//import token 
const jwt = require("jsonwebtoken")

const express=require("express")
router=express.Router()



/***
 * @desc Add New User
 * @route api/auth/register
 * @method post
 * @access public
 */
router.post("/register",async(req,res) => {

    const {error} = validateRegisterUser(req.body)
    if(error){
        res.status(400).json({message:error.message})
    }

    const user =await User.findOne({email:req.body.email})
    if(user){
        res.status(400).json({success:false,message :" users is already registerd"})


    }else{
        const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt)


        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            street:req.body.street,
            phone:req.body.phone
        })
        

        
        const token = user.generateToken()

        user.token = [token]

        user.save()


    const{password,...other} = user._doc

    res.status(200).json({...other,token});
    }
   

})

/***
 * @desc Login User
 * @route api/auth/login
 * @method post
 * @access public
 */

router.post("/login",async(req,res) => {

    const {error} = validationLoginUser(req.body);
    if (error){
        res.status(400).json({message : error.details[0].message})
    }
 
    let user = await User.findOne({email:req.body.email})
    if(!user){
        res.status(400).json({message :" invalied email"})
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password  , user.password)

    if(!isPasswordMatch){
        res.status(400).json({message :" invalied password"})
    }

    const token = user.generateToken()
     const {password,...other} = user._doc

    //  user.token.push(token)
     user.save()

     res.status(200).json({token,...other})
})


module.exports = router
