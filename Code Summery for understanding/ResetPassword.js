Resetpassword = async (req, res) => {
	try {
		const token = req.params.token;
		

		// decoding token to get same token as database stored token
         	const decodetoken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");


		const existinguser = await User.findOne({
           forgotPasswordExpiry:decodetoken,
		   forgotPasswordExpiry: { $gte: Date.now() }
		});

		if (!existinguser) {
			return res
				.status(400)
				.json({ message: "Token is invalid or expired" });
		}

		if (req.body.password !== req.body.confirmPassword) {
			return res.status(400).json({ message: "password did not match" });
		}

		existinguser.password = req.body.password;
		existinguser.forgotPasswordToken = undefined;
		existinguser.forgotPasswordExpiry = undefined;

		await existinguser.save();
		//->Tokencreate(existinguser, res);

		const newtoken = (existinguser, res) => {
			const option = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
	
			const Token = user.getJwtToken();
			user.password =undefined
			return res.status(200).cookie("token", Token, option).redirect("/userhome")
		};

		newtoken()
	} catch (error) {
		console.log(error);
	}
};

