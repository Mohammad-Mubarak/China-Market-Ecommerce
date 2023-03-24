
/*


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
	updateUserDetails,
	GetAllusers,
	SingleUser,
	ManagerOnly
} = require("../controller/userController")


const {UserLoggedIn} = require('../middlewares/UserLoggedIn')
const {isAdmin} = require('../middlewares/isAdmin')

// get and post route for signup (//?)
router.route("/register").get(sign)
router.route("/register").post(signup)

//login logout route  (//?)
router.route("/login").post(login)
router.route("/logout").get(logout)

// forgot password route (//?)
router.route("/forgotpassword").post(forgotpassword)
router.route("/password/reset/:token").post(Resetpassword)


// to get current user details (//?)
router.route("/userdashboard").get(UserLoggedIn,getLoggedInDetails)


// update old password (//?)
router.route("/password/update").post(UserLoggedIn,changePassword)


// update name email or profile pic (//?)
router.route("/update/user").post(UserLoggedIn,updateUserDetails)


// Admin only Route  (//?)
router.route("/admin/user").get(UserLoggedIn, isAdmin("admin") ,GetAllusers)


// get only one user admin (//?)
router.route("/admin/user/:id").get(UserLoggedIn, isAdmin("admin") ,SingleUser)


// manager only Route  (//?)
router.route("/manager/user").get(UserLoggedIn, isAdmin("manager") ,ManagerOnly)


// All get routes
// login get route
router.route("/login").get((req, res) => {
	res.render("login",{
		isLogin:false,
		message:"No Need"
	});
})

// forgot password token 
router.route("/password/reset/:token").get((_, res) => {
	res.render("PasteLink");
})

// get route for forgotten password
router.route("/forgotpassword").get((_, res) => {
	res.render("ForgottenPassword");

})

// Get route for login Updating details of user
router.route("/update/user").get((_, res) => {
	res.render("UpdateUser");


})


// overview of prodcut
router.route("/product/details").get((_, res) => {
	res.render("overview");
})


// change password route
router.route("/password/update").get((_, res) => {
	res.render("ChangePassword");

})

// Error page Route
router.route("*").get((_, res) => {
	res.render("Error");
})


module.exports = router



*/