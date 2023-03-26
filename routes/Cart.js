var PrettyError = require('pretty-error');
var pe = new PrettyError().start();


const express = require("express")
const app = express()
const router = express.Router()


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





module.exports = router
