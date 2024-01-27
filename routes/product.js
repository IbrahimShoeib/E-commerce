const express=require("express")
const productControler =require("../controler/productControler")
router=express.Router()


    router.route("/")
    .get(productControler.getAllOrder)

    // .get("/:id")addNewProduct

    .post(productControler.addNewProduct)


router.route("/:id")
    .put(productControler.updateProduct)



.delete(productControler.deleteProduct)

module.exports= router