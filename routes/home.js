const express = require('express')
const router = express.Router()

const {Home,OverviewProduct} = require("../controller/HomeController.js")
const {HomeCheck} = require("../middlewares/HomeUser")

// Home route
router.route("/").get(Home)

// Product overview 
router.route("/overview/:id").get(OverviewProduct);
 


// cart route
// router.route("/cart").get((_,res)=>{
//     res.render("Product/Cart",{layout:false})
  
// });
  

router.route("/user").get((_,res)=>{
    res.render("Auth/User")
  
})


module.exports = router


