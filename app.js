const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const ExpressFileUpload = require("express-fileupload");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");


//? Importing middleware
const {UserLoggedIn} = require("./middlewares/UserLoggedIn")


//? love this debugger
// debugging eassy 
var PrettyError = require('pretty-error');
var pe = new PrettyError().start();






// db connection done
require("./config/connection");

//cookie and fileupload middleware
app.use(cookieParser());
app.use(
	ExpressFileUpload({
		useTempFiles: true,
		tempFileDir: "/images/",
	})
);

app.set("view engine", "ejs");

// common middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// setting static data
const staticpath =path.join(__dirname, "Public")

app.use(express.static(staticpath));




//  importing home route
const homerouter = require("./routes/home");

//  importing user route
const userrouter = require("./routes/user");

// morgan middleware
app.use(morgan("tiny"));

// setting route
app.use("/", homerouter);
app.use("/", userrouter);




// ALl Get Routes here

// get route for login 
app.get("/login", (req, res) => {
	res.render("login",{
		isLogin:false,
		message:"No Need"
	});
});

// get route for home
app.get("/userhome",(_,res)=>{
	res.sendFile(path.join(staticpath,"category.html"));
})

// app.get("/userhome", (req, res) => {
// 	res.render("Home");
// });

app.get("/password/update", (_, res) => {
	res.render("ChangePassword");
});


// Get route for login Updating details of user
app.get("/update/user",UserLoggedIn, (_, res) => {
	res.render("UpdateUser");
});


// get route for forgotten password
app.get("/forgotpassword",UserLoggedIn, (_, res) => {
	res.render("ForgottenPassword");
});


app.get("/password/reset/:token", (_, res) => {
	res.render("PasteLink");
});

app.get("/", (_, res) => {
	res.render("Front");
});








app.get("*", (_, res) => {
	res.render("Error");
});




module.exports = app;
