var PrettyError = require('pretty-error');
var pe = new PrettyError().start();


const express = require("express")
const app = express()
const router = express.Router()

// controllers
const {testing,
    AddProduct,
    AddTOcart

} = require("../controller/ProductController")

// middleware importing
const {UserLoggedIn} = require('../middlewares/UserLoggedIn')
const {isAdmin} = require('../middlewares/isAdmin')




// Adding product route
router.route("/add/product").post(UserLoggedIn,AddProduct)


// // Adding product route
// router.route("/addcartproduct").post(UserLoggedIn,AddTOcart)




// Adding product route
router.route("/checkout").get((_,res)=>{
    res.render("Product/Check",{layout:false})
})







module.exports = router
