var PrettyError = require('pretty-error');
var pe = new PrettyError().start();


const express = require("express")
const app = express()
const router = express.Router()


const Cart = require("../models/Cart") 

// controllers
const {testing,
    AddProduct,
    AddTOcart

} = require("../controller/ProductController")

// middleware importing //?
const {UserLoggedIn} = require('../middlewares/UserLoggedIn')
const {isAdmin} = require('../middlewares/isAdmin')


// Adding product route  //?
router.route("/add/product").post(UserLoggedIn,AddProduct)

// // Adding product route
// router.route("/addcartproduct").post(UserLoggedIn,AddTOcart)

// limit=10&skip=10  //?
router.route("/:limit/:skip").get((_,res)=>{
   const limit = res.params.limit
    const skip = res.params.skip

    res.render("Product/Check",{layout:false})
})







module.exports = router
