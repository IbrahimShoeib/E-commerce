const express = require("express")
const Catigorycontroler = require("../controler/catigoryControler")
router=express.Router()


//api/catigory
router.route("/")

    .get(Catigorycontroler.getCatigorise)
    .post(Catigorycontroler.creatNewCatigoryCatigory)

//api/catigory/:id
router.route("/:id")

    .get(Catigorycontroler.getCarigoryById)
    .put(Catigorycontroler.updateCatigory)
    .delete(Catigorycontroler.deleteCatigory)




module.exports= router
