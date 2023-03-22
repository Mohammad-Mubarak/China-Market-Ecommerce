exports.home=(req,res)=>{
    res.status(200).json({
        message:"hey successfulll"
    })
}


exports.homedummy=(req,res)=>{
    res.status(200).json({
        message:"without any change and add we get second"
    })
}




// dynamic routes 

// https://github.com/derRinat/expressroutes_urlmanager
// https://dev.to/reiallenramos/create-an-express-api-static-and-dynamic-routes-33lb
// https://dev.to/reiallenramos/create-an-express-api-static-and-dynamic-routes-33lb