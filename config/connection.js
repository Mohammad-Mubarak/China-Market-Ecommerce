// const mongoose = require('mongoose');

//  require("dotenv").config()

// const connectDB = ()=>{ 
// mongoose.connect(process.env.MONGO_DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(response=>{
//     console.log('MongoDB Connection Succeeded.')
// }).catch(error=>{
//     console.log('Error in DB connection: ' + error)
// });
// }


// module.exports = connectDB





require("dotenv").config();

const mongo=require("mongoose")
const mongo_url=process.env.MONGO_DB_URL
// const mongo_url="mongodb+srv://md:8800@cluster0.hzxrinb.mongodb.net/?retryWrites=true&w=majority"


// connecting to mongo db
   mongo.set('strictQuery', false)


    mongo.connect(mongo_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(
        console.log("succefully connected")
    ).catch(error=>{
        console.log("connection fail hogya re baba ")
        process.exit(1)
    }
    )

    
    