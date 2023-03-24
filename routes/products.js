var PrettyError = require('pretty-error');
var pe = new PrettyError().start();


const express = require("express")
const app = express()
const router = express.Router()

// controllers
const {testing,
    AddProduct



} = require("../controller/ProductController")

// middleware importing
const {UserLoggedIn} = require('../middlewares/UserLoggedIn')
const {isAdmin} = require('../middlewares/isAdmin')


router.route("/p").get(testing)


// Adding product route
router.route("/add/product").post(UserLoggedIn,AddProduct)




module.exports = router
