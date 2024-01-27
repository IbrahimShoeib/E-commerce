const slug = require ("slugify")
const Catigory = require("../model/catigory")
const {verifyToken,verifyTokenAndAuthoraization,verifyTokenAndAuthoration} = require("../middleware/verify.Token")


/***
 * @desc get all catigory
 * @route api/catigory
 * @method get
 * @access public
 */
exports.getCatigorise =verifyTokenAndAuthoration,async(req,res) => {

    const catigory = await Catigory.find()
    try {

        res.status(200).json({success:true,catigory})

    } catch (error) {

        res.status(404).json({success:false,message:error})
    }
}
/***
 * @desc get catigory by id
 * @route api/catigory/:id
 * @method get
 * @access public
 */

exports.getCarigoryById=async(req,res)=>{

    const catigory = await Catigory.findById(req.params.id)
    
    try {
        if(catigory){
            res.status(200).json(catigory)

        }else{
            res.status(400).json({message:"Id Catigory is not defined"})
        }
    } catch (error) {
        res.status(404).json({message:error})
    
    }

}

/***
 * @desc Add new catigory
 * @route api/catigory
 * @method post
 * @access public
 */

exports.creatNewCatigoryCatigory = async(req,res) => {
    
    try{
        const catigory = new Catigory({
            name:req.body.name,
            slug:req.body.slug

        })  
        const result = await catigory.save()
        res.status(200).json({success:true,message:result})    }
    catch(error){

        res.status(404).json({success:false,message:error})
    }

}

/***
 * @desc update catigory by id
 * @route api/catigory/:id
 * @method put
 * @access public
 */
  
exports.updateCatigory=async(req,res)=> {

     
    try {
        
        const updatecatigory = await Catigory.findByIdAndUpdate((req.params.id),
        {
            $set:{
                name:req.body.name,
                slug:req.body.slug
            }
        }
        ,{
            new:true
        }
        )
        return res.status(200).json(updatecatigory)

    }
        
     catch (error) {
        res.status(404).json({message:error})

        
    }



}

/***
 * @desc delete catigory by id
 * @route api/catigory/:id
 * @method delete
 * @access public
 */
exports.deleteCatigory=async(req,res)=>{
        const catigory = await Catigory.findById(req.params.id)

        if(catigory){
          Catigory.findByIdAndDelete(req.params.id)

        res.status(200).json({message : "Catigory is deleted"})

        }else{
            res.status(404).json({message : "Catigory is notdefind"})


        }
   

}






