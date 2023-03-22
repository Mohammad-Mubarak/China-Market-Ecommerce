forgotpassword = async (req, res) => {
	try {
		const { email } = req.body;

		const userdata = await User.findOne({ email });

		if (!userdata) {
			return res.json({
				message: "you are not in our database please register",
			});
		}

		//get token from user model methods
		const forgotpasstoken = userdata.getForgotPasswordToken();

		// save user fields in DB
		await userdata.save({ validateBeforeSave: false });

		const url = `${req.protocol}://${req.get("host")}/password/reset/${forgotpasstoken}`;

		// craft a message
		const message = `copy paste this link in your URL and hit enter \n\n ${url}`;

		// attempt to send email
		try {
			const option = {
				email,
				subject: "to reset your password",
				message,
			};

			await sendEmail(option);

		////	res.status(200).json({
		////		message: "check email to reset password",
		//->	});

			res.status(200).redirect("/password/reset/:token")

		} catch (error) {
			// reset user fields if things goes wrong
			userdata.forgotPasswordToken = undefined;
			userdata.forgotPasswordExpiry = undefined;
			await userdata.save({ validateBeforeSave: false });

			// send error response
			return res.status(300).json({
				message: "issue occurs ",
			});
		}
	} catch (error) {
		console.log(error);
	}
};

