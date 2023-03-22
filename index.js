
require("dotenv").config()
const app = require("./app")
const PORT = process.env.PORT

const cloudinary= require("cloudinary").v2

// color full errors
const { color, log,white,gray, red, green, cyan, cyanBright } = require('console-log-colors');

var PrettyError = require('pretty-error');
// instantiate PrettyError, which can then be used to render error objects
var pe = new PrettyError().start();







//configration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret:process.env.CLOUD_SECRET
  });
  
  
 
app.listen(PORT,()=>{
    console.log(`Servr running on port ${PORT}`);
})