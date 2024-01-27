const express=require("express")
const {
    User} = require("../model/user")
const bcrypt=require("bcrypt")
router=express.Router()

/***
 * @desc get All users
 * @route api/users
 * @method get
 * @access public
 */
router.get(("/"),async(req,res) => {

    User.find().select("-passwordHash")
     .then((user) => {

        res.status(200).json(user)

    }).catch((error)=> {
        res.status(400).json({
            status_code:1,
            message:"user is not Found",
            error:error.message
        })

    })
})
/***
 * @desc get user By id
 * @route api/users/id
 * @method get
 * @access public
 */
router.get(("/:id"),async(req,res) => {

    const user = await User.findById(req.params.id).select("-passwordHash").select("-password")
    if(!user){
        res.status(400).json({success:false,message :" users is not found"})
    }else{
        res.status(200).json({success:true,user})
    }
})

/***
 * @desc update Users
 * @router api/users/Id
 * @method Put
 * @access public
 */

router.put("/:id",(async(req,res) => {
    
    if(req.body.id = req.params.id){
        return res.status(201).json({message:`you are can't edit profile`})
    }

    const {error} = validationUpdateUser(req.body);

    if(error){

        return res.status(400).json({
                            status_code:-1,
                            message : error.details[0].message,
                            data:null
                        })

             }

    if(req.body.password){

          const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password ,salt);
            
            }
    
    const updateduser =await  User.findByIdAndUpdate(req.params.id ,{
        $set:{
            email:req.body.email,
            userName:req.body.userName,
            password:req.body.password
        }

    },{new:true});
   
             res.status(200).json(updateduser);
             
    

    })
    
  


 )

/***
 * @desc Delete Users
 * @router api/users/Id
 * @method Delete
 * @access public
 */

router.delete(("/:id"),async(req,res) => {

    const user = await User.findByIdAndDelete(req.params.id).select("-password");
    if (!user){
        res.status(400).json({message:" User is deleted"})
    }else {
        res.status(200).jsom({success:true  , message: " Id User is not Found"})
    }


})



module.exports = router