getLoggedInDetails = async (req, res) => {
	try {
		const user = await User.findOne(req.user.id);
		res.status(200).json({ user });
	} catch (error) {
		console.log(error);
	}
};
