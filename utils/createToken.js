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

