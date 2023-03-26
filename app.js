const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const ExpressFileUpload = require("express-fileupload");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
var expressLayouts = require('express-ejs-layouts');

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
		tempFileDir:path.join(__dirname,"./images") 
	})
);



app.set("view engine", "ejs");

app.use(expressLayouts);

// common middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// setting static data
// const staticpath =path.join(__dirname, "Public")

app.use(express.static("public"));




//  importing user route
const productrouter = require("./routes/products");

//  importing home route
const homerouter = require("./routes/home");

//  importing cart route
const cartrouter = require("./routes/Cart");



//  importing user route
const userrouter = require("./routes/user");


/// setting global req which can access from views also
app.use((req, res, next) => {
	app.locals.req = req;
	next();
  });


// morgan middleware
app.use(morgan("tiny"));

// setting route
app.use("/", homerouter);
app.use("/", userrouter);
app.use("/", productrouter);
app.use("/", cartrouter);



// Error page Route
app.get("*",(_, res) => {
	res.render("Home/Error");
})












module.exports = app;
