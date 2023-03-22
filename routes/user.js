var PrettyError = require('pretty-error');
var pe = new PrettyError().start();



const express = require("express")
const app = express()
const router = express.Router()
const {
	sign,
	signup,
	login,
	logout,
	forgotpassword,
	Resetpassword,
	getLoggedInDetails,
	changePassword,
	updateUserDetails
} = require("../controller/userController")


const {UserLoggedIn} = require('../middlewares/UserLoggedIn')

// get and post route for signup
router.route("/register").get(sign)
router.route("/register").post(signup)


//login logout route 
router.route("/login").post(login)
router.route("/logout").get(logout)


// forgot password route
router.route("/forgotpassword").post(forgotpassword)
router.route("/password/reset/:token").post(Resetpassword)

// to get current user details
router.route("/userdashboard").get(UserLoggedIn,getLoggedInDetails)


// update old password
router.route("/password/update").post(UserLoggedIn,changePassword)

// update name email or profile pic
router.route("/update/user").post(UserLoggedIn,updateUserDetails)





module.exports = router