
require("dotenv").config();

const mongo=require("mongoose")
const mongo_url=process.env.MONGO_DB_URL

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

    
    
