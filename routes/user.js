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
	adminDeleteUser,
	adminUpdateSingleUser,
	ManagerOnly
} = require("../controller/userController")


const {UserLoggedIn} = require('../middlewares/UserLoggedIn')
const {isAdmin} = require('../middlewares/isAdmin')

// get and post route for signup (//?)
router.route("/register").get(sign).post(signup)

//login get and postt route  (//?)
router.route("/login").post(login).get((req, res) => {
	res.render("Auth/login",{
		isLogin:false,
		message:"No Need"
	});
})

// logout route 
router.route("/logout").get(logout)


// forgot password Post and get route (//?)
router.route("/forgotpassword").post(forgotpassword).get((_, res) => {
	res.render("Auth/ForgottenPassword");

})

// Rest passowrd with token
router.route("/password/reset/:token").post(Resetpassword)



// to get current user details (//?)
router.route("/userdashboard").get(UserLoggedIn,getLoggedInDetails)


// user update name email or profile pic (//?)
router.route("/update/user").post(UserLoggedIn,updateUserDetails).get(UserLoggedIn,(_, res) => {
	res.render("Auth/User");
})


// Admin only Route  (//?)
router.route("/admin/user").get(UserLoggedIn, isAdmin("admin") ,GetAllusers)


// get only one user admin (//?)
// Admin can update Single User ALso (//?)
// user can delete user also (//?)
router.route("/admin/user/:id")
.get(UserLoggedIn, isAdmin("admin") ,SingleUser)
.put(UserLoggedIn, isAdmin("admin") ,adminUpdateSingleUser)
.delete(UserLoggedIn, isAdmin("admin") ,adminDeleteUser)




// manager only Route  (//?)
router.route("/manager/user").get(UserLoggedIn, isAdmin("manager") ,ManagerOnly)




// forgot password token 
router.route("/password/reset/:token").get((_, res) => {
	res.render("Auth/PasteLink");
})



// overview of prodcut
router.route("/product/details").get((_, res) => {
	res.render("overview");
})





// update old password (//?)
router.route("/password/update").post(UserLoggedIn,changePassword)
.get((_, res) => {
	res.render("Auth/ChangePassword");

})




// / change password route
router.route("/t").get((_, res) => {
	res.render("c");

})











module.exports = router