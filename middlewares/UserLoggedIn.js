const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const User = require("../models/user");


exports.UserLoggedIn = async (req, res, next) => {
	const token =req.cookies.token
	 // if token not found in cookies, check if header contains Auth field
		if (!token && req.header("Authorization")) {
			token = req.header("Authorization").replace("Bearer ", "");
		  }
		  if (!token) {
			// return res.json({message:"Login first to access this page"});
			return res.render("Auth/login",{
				isLogin: true,
				message: "Login first to access this page",
				
			})
		  }

	try {
		const decode = jwt.verify(token, SECRET_KEY);
		req.user = await User.findById(decode.id);
		next();
		
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			// return res.status(401).json({
			// 	message: "Session Expired",
			// 	error: error.message,
			// });
			return res.render("Auth/login")
		}
	}
};

