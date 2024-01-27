const Product = require("../model/product")


/***
 * @desc get All Catigory
 * @router api/catigory
 * @method get
 * @access public
 */
exports.getAllOrder=async(req,res) => {

    const ProductList = await Product.find()

    if(!ProductList){

       res.status(500).json({sucsess:false}) 
    }
    res.status(200).json(ProductList);

}
/***
 * @desc get Catigory by Id
 * @router api/catigory/id
 * @method get
 * @access public
 */

// exports.addNewProduct = async(req,res)=> {

//     Product.findById(req.params.id).then(Product=>{

//         if(Product){

//             res.status(200).json(Product)

//         }else{
//             res.status(404).json({message:"Product is not found"})
//         }
//      }).catch((error) => {
//         res.status(404).json({message:error.message})
//      })


// }

/***
 * @desc creat new Catigory
 * @router api/catigory
 * @method post
 * @access public
 */
exports.addNewProduct=async(req,res)=>{

    const product=await Product.find()
    if(!product) return res.status(400).json("invaild Catigory")

          new Product({

                images: req.body.images,
                brand: req.body.brand,
                price: req.body.brand,
                rating: req.body.rating,
                ifFeatured: req.body.ifFeatured,
                name: req.body.name,
                image:req.body.image,
                countInStock:req.body.countInStock,
                dateCreated:req.body.dateCreated,
                catigory:req.body.catigory,
                description:req.body.description,
                richdescription:req.body.richdescription,
        })

         product = await Product.save()
      if(!product){
        res.status(400).json("The product can't Created")
      }else{
        res.status(200).json(product)
      }


}

/***
 * @desc update a  Catigory by id
 * @router api/catigory
 * @method put
 * @access public
 */

exports.updateProduct = async(req,res)=> {

    Product.findByIdAndUpdate(req.params.id,{

            $set:{
                name: req.body.name,
                image: req.body.image,
                color: req.body.color
            }},{
                new:true
        }).then(Product =>{
            res.status(200).json(Product)

        }).catch((error)=> {
            res.status(404).json({success:false , message:error.message})

        })



}

/***
 * @desc delete Catigory by id
 * @router api/catigory
 * @method delete
 * @access public
 */

exports.deleteProduct = async(req,res) => {

    Product.findByIdAndDelete(req.params.id )

    .then(Product=>{
           if(Product){

                 res.status(200).json({success:true ,message:"Product has been deleted"})
           }else(

                res.status(404).json ({success:false ,message:"Product Not Found"})
           )

           }).catch((error)=> {

               res.status(400).json ({
                   success:false,
                   message:error.message
               })

            })
}


