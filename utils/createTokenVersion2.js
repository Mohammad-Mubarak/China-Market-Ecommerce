const TokencreateVersion2 = (user, res) => {
	const option = {
		expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	const Token = user.getJwtToken();
    user.password =undefined
	return res.status(200).cookie("token", Token, option).redirect("/userhome")
};

module.exports = TokencreateVersion2