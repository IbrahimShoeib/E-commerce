const {Order,validationOfOrder} = require("../model/order")
const express=require("express")
router = express.Router()


/***
 * @desc get all order
 * @route api/order
 * @method get
 * @access public
 */
router.get("/",async(req,res) => {

    Order.findOne().then(order=>{
        res.status(200).json(order)
    }
    ).catch((error)=>{
        res.status(400).json({
            error:error.message
        })
    })

})
/***
 * @desc get order By Id
 * @route api/order/:id
 * @method get
 * @access public
 */

router.get("/:id",async(req,res) => {

    await Order.findById().then((order) =>{
        res.status(200).json(order)
    }
    ).catch((error)=>{
        res.status(400).json({
            error:error.message
        })
    })

})

/***
 * @desc add new order
 * @route api/order
 * @method post
 * @access public
 */
router.post("/",async(req,res) => {

    const order = await Order.findOne()

    try {
       const order =  new Order({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            street:req.body.street,
            country:req.body.country,
            zip:req.body.zip,
            statusOrder:req.body.statusOrder

        })
        const result = await order.save()
        res.status(200).json(result)

    } catch (error) {
        res.status(400).json({message:error.message})
    }
    } 
    )
/***
 * @desc update order by id
 * @route api/auth/login
 * @method post
 * @access public
 */
router.put("/:id",async(req,res) => {


      const updateOrder = await Order.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            street:req.body.street,
            country:req.body.country,
            zip:req.body.zip,
            statusOrder:req.body.statusOrder

        }},{new:true})
        res.status(200).json(updateOrder)

    })

/***
 * @desc delete order
 * @route api/order/:id
 * @method post
 * @access public
 */
router.delete("/:id",async(req,res) => {

    Order.findByIdAndDelete(req.params.id )

    .then(order=>{
        if(order){

              res.status(200).json({success:true ,message:"order has been deleted"})
        }else(

             res.status(404).json ({success:false ,message:"order Not Found"})
        )

        }).catch((error)=> {

            res.status(400).json ({
                success:false,
                message:error.message
            
            })

         })
})



module.exports = router