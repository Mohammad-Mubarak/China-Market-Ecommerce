exports.changePassword = async (req, res) => {
	try {
		const userId=req.user.id
		const user = await User.findById(userId).select("+password");

		



		// checking with old password 
		const isCorrectPassword =await user.isValidatedPassword(
			req.body.OldPassword
		)

		


		if (!isCorrectPassword) {
			return res.json({
				message: "Password is incorrect or Not Match",
			});
		}

		user.password = req.body.Password;

		
		await user.save();
		// generating token again
		Tokencreate(user, res);
	} catch (error) {
		
	}
};

