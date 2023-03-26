var PrettyError = require('pretty-error');
var pe = new PrettyError().start();

var {fetch} = require("undici")
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


/// ??  cart route
router.route("/cart").get(UserLoggedIn,UserCart)




// Delete Product Route //?
router.route("/delete/product/cart/").delete(UserLoggedIn,DeleteProduct)



// Check Out Route //?
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



/// ??  cart route
router.route("/category").get(async(_,res)=>{
 const data = await fetch('https://dummyjson.com/products/categories')
 const products = await fetch("https://dummyjson.com/products?limit=9")
 const allpro = await products.json()


 const allcategory = await data.json()


 var length =5;

 allcategory.map (async (e) =>{
    
    const NoOfProduct = await fetch(`https://dummyjson.com/products/category/${e}`)
    const AvailableProduct =await NoOfProduct.json()
 })

    return res.render("ExtraComponent/Category",{layout:false, allcategory ,allpro,length})
})




module.exports = router
