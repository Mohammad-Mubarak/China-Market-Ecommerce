logout = async (req, res) => {
	try {
		res.cookie("token", null, {
			expires: new Date(Date.now()),
			http: true,
		});
		return res.json({
			message: "logout Successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
};
