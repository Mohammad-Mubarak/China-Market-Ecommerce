const Tokencreate = (user, res) => {
	const option = {
		expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	const Token = user.getJwtToken();
	res.setHeader('Authorization', `Bearer ${Token}`);
    user.password =undefined
	return res.status(200).cookie("token", Token, option).redirect("/")
};

module.exports = Tokencreate


// const Tokencreate = (user, res) => {
// 	const option = {
// 		expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
// 		httpOnly: true,
// 	};

// 	const Token = user.getJwtToken();
// 	res.setHeader('Authorization', `Bearer ${Token}`);
//     user.password =undefined
//     res.status(200).redirect("/")

//     // Create a new response to send the cookie separately
//     const cookieResponse = res.status(200).cookie("token", Token, option);
//     return cookieResponse;
// };

// module.exports = Tokencreate
