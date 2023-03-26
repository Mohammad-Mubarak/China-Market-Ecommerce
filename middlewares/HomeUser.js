const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const User = require("../models/user");


exports.HomeCheck = async (req, res, next) => {
	const token =req.cookies.token

		if (!token && req.header("Authorization")) {
			token = req.header("Authorization").replace("Bearer ", "");
		  }
		  if (!token) {
		  return  res.end()
		  }

	try {
		const decode = jwt.verify(token, SECRET_KEY);
		req.user = await User.findById(decode.id);
		console.log("🧜‍♂️🦴 ~> file: HomeUser.js:20 ~> exports.HomeCheck= ~> user:  :-> >", req.user)
		next()

	} catch (error) {
			return res.redirect("/")
	}
};

