const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const User = require("../models/user");


exports.HomeCheck = async (req, res, next) => {
	const token =req.cookies.token
		if (!token && req.header("Authorization")) {
			token = req.header("Authorization").replace("Bearer ", "");
		  }
		  if (!token) {
			 next()
		  }

	try {
		const decode = jwt.verify(token, SECRET_KEY);
		req.user = await User.findById(decode.id);
		next()

	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({
				message: "Session Expired",
				error: error.message,
			});
		}
	}
};

