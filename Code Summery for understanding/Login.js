login = async (req, res) => {
	try {
		const {email, password} = req.body;


		// check for presence of email and password
		if (!email || !password) {
			return res.json({
				message: "please fill all data",
			});
		}
		// checking match or not
		const existingUser = await User.findOne({email}).select("+password");

		// agar nahi hai database mai
		if (!existingUser) {
			return res.json({
				message: "you are not registerd to our database",
			});
		}
		// trying to crpyt password
		const finaluser = await existingUser.isValidatedPassword(password);

		// if not match
		if (!finaluser) {
			res.json({
				message: "password not match",
			});
		}
		// token creating and sending to user
		TokencreateVersion2(existingUser, res);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};
