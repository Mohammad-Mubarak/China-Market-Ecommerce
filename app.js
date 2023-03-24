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
		debug: true,
		useTempFiles: true,
		tempFileDir:path.join(__dirname,"./images") 
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




//  importing user route
const productrouter = require("./routes/products");

//  importing home route
const homerouter = require("./routes/home");


//  importing user route
const userrouter = require("./routes/user");








// morgan middleware
app.use(morgan("tiny"));

// setting route
app.use("/", homerouter);
app.use("/", userrouter);
app.use("/", productrouter);








module.exports = app;
