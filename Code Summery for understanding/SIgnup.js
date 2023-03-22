signup = async (req, res) => {
	try {
		let result;
		if (req.files) {
			let file = req.files.photo;
			result = await cloudinary.uploader.upload(file.tempFilePath, {
				folder: "ecommerce",
			});
		}

		const { email, name, password } = req.body;
		if (!email || !password || !name) {
			return res.send("some field is missing please send");
		}

		/// storing in database
		const saveuser = new User({
			email,
			name,
			password,
			photo: {
				id: result.public_id,
				secure_url: result.secure_url,
			},
		});
		const user = await saveuser.save();
		Tokencreate(user, res);
	} catch (error) {
		console.warn(error);
	}
};
