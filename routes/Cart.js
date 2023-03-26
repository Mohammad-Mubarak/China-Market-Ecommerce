var PrettyError = require('pretty-error');
var pe = new PrettyError().start();


const express = require("express")
const app = express()
const router = express.Router()

const Cart = require("../models/Cart")

// controllers
const {
    AddTOcart,
    UserCart,
    DeleteProduct

} = require("../controller/CartController")

// middleware importing
const {UserLoggedIn} = require('../middlewares/UserLoggedIn')
const {isAdmin} = require('../middlewares/isAdmin')





// Adding product route
router.route("/add/cart").post(UserLoggedIn,AddTOcart)


// router.route("/user/cart").get(UserLoggedIn,UserCart)

router.route("/cart").get(UserLoggedIn,UserCart)



router.route("/delete/product/cart/").delete(UserLoggedIn,DeleteProduct)



// Adding product route
router.route("/checkout").get(UserLoggedIn,async (req,res)=>{

    const CartId = req.user.id

    console.log("🧜‍♂️🦴 ~> file: Cart.js:46 ~> router.route ~> CartId:  :-> >", CartId)

    const cart = await Cart.find({userId:CartId})

    

    var TotalProduct = cart.length
    var total =0;
    cart.map(product=>{
         total+=product.price
    })


    res.render("Product/Check",{layout:false,cart,total,TotalProduct})
})




module.exports = router
