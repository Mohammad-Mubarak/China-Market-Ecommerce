var PrettyError = require('pretty-error');
var pe = new PrettyError().start();


// user Model importing
const User = require("../models/user");

const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const sendEmail = require("../utils/emailhelper");
const crypto = require("crypto");

// import token creater
const Tokencreate = require("../utils/createToken");
const TokencreateVersion2 = require("../utils/createTokenVersion2");

// All Routes  Here--------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.sign = async (req, res) => {
	try {
		res.render("Auth/signupform");
	} catch (error) {
		
		res.status(500).send("Server Error");
	}
};

exports.signup = async (req, res) => {
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
		
	}
};

exports.login = async (req, res) => {
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
			return res.render("Auth/login",{
				isLogin:true,
				message:"You are not Registered"
			})
		}
		// trying to crpyt password
		const finaluser = await existingUser.isValidatedPassword(password);

		// if not match
		if (!finaluser) {
			
			return res.render("Auth/login",{
				isLogin:true,
				message:"wrong password"
			})
		}
		// token creating and sending to user
		// TokencreateVersion2(existingUser, res);
		Tokencreate(existingUser, res);
	} catch (error) {
		
		res.status(500).send("Server Error");
	}
};

exports.logout = async (req, res) => {
	try {
		res.cookie("token", null, {
			expires: new Date(Date.now()),
			http: true,
		});
		return res.redirect("/")
	} catch (error) {
		
		res.status(500).send("Server Error");
	}
};

exports.forgotpassword = async (req, res) => {
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

		const url = `${req.protocol}://${req.get(
			"host"
		)}/password/reset/${forgotpasstoken}`;

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
			res.status(200).redirect(url)

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
		
	}
};

exports.Resetpassword = async (req, res) => {
	try {
		// token recive after genrating from forgot password
		const token = req.params.token;

		// running same algorithm to decode the token to get actuall token stored in database
         	const decodetoken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");

         
         // geting the user with same token
		const existinguser = await User.findOne({
           forgotPasswordExpiry:decodetoken,
		   forgotPasswordExpiry: { $gte: Date.now() }
		});

		// if user not found 
		if (!existinguser) {
			return res
				.status(400)
				.json({ message: "Token is invalid or expired" });
		}

		// if found than check user password match or not
		if (req.body.password !== req.body.confirmPassword) {
			return res.status(400).json({ message: "password did not match" });
		}

		existinguser.password = req.body.password;
		existinguser.forgotPasswordToken = undefined;
		existinguser.forgotPasswordExpiry = undefined;

		// saving to database
	       await existinguser.save();
		//->Tokencreate(existinguser, res);
			const option = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			const Token =existinguser.getJwtToken();
			return res.status(200).cookie("token", Token, option).redirect("/")
	

	} catch (error) {
		
	}
};

exports.getLoggedInDetails = async (req, res) => {
	try {
		
		const user = await User.findById(req.user.id);

		console.log("🧜‍♂️🦴 ~> file: userController.js:221 ~> exports.getLoggedInDetails= ~> user:  :-> >", user)


		// return res.status(200).json({ user });

		res.render("Home/UserDetails",{user})



	} catch (error) {
		return res.status(500).json({ message: "something wrong go to home page" });
	}
};

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

exports.updateUserDetails = async (req, res) => {
	try {

		const q= req.body

		console.log("🧜‍♂️🦴 ~> file: userController.js:276 ~> exports.updateUserDetails= ~> q:  :-> >", q)

		// getting data from body
	
	
		var newdata ={
         email:req.body.email,
		 name:req.body.name
		}

	

         // checking file is available or not
		if(req.files){
			
			// geting user information
          let user =await User.findById(req.user.id)

		  // extracting user photo id
		  let photoId =user.photo.id

		  // deleting userphoto  from cloudinary
		  let responseByphto = await cloudinary.uploader.destroy(photoId)

		  // updating image 
		 const result = await cloudinary.uploader.upload(req.files.photo.tempFilePath, {
				folder: "ecommerce",
			});


			// adding new attriubte to data to update
			newdata.photo = {
				id:result.public_id,
				secure_url: result.secure_url
			}

		}

		// updating data
		const user= await User.findByIdAndUpdate(req.user.id,newdata,{
			new:true,
			runValidators:true
		})

		
		// return res.status(200).json({ user });
	
		res.render("Home/UserDetails",{user})

	} catch (error) {
		
	}



};



exports.GetAllusers = async (req, res) => {
	try {
  
		const allUsers = await User.find({})
		res.status(200).json({
			success: true,
			users: allUsers
		});

	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching users"
		});
	}
};


exports.SingleUser = async (req, res) => {
	try {
  
		const CurrentUser = await User.findById(req.params.id)

		if(!CurrentUser){
			return res.status(400).json({
				success: false,
				message:"User not found"
			})
		}

		res.status(200).json({
			success: true,
			users: CurrentUser 
		});

	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching users"
		});
	}
};

exports.adminUpdateSingleUser = async (req, res) => {
	try {

	// getting data from body
	var newdata ={
		email:req.body.email,
		name:req.body.name,
		role:req.body.role
	   }

	   // updating data
	   const updatedData = await User.findByIdAndUpdate(req.params.id,newdata,{
		   new:true,
		   runValidators:true
	   })


	   /// sending response
	   res.status(200).json({
		   message:"updated successfully",
		   userdata:updatedData
	   })

	
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching users"
		});
	}
};


exports.adminDeleteUser = async (req, res) => {
	try {

	 const user = await User.findById(req.params.id)

	 if(!user){
		return res.status(404).json({message: "User not found"})
	 }

	 const ImageId = user.photo.id

	 let responseByphto = await cloudinary.uploader.destroy(ImageId)

	 // removig the user
	 await User.findOneAndDelete(req.params.id)

	   /// sending response
	   res.status(200).json({
		   message:"Deleted successfully",
	   })

	
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching users"
		});
	}
};











exports.ManagerOnly = async (req, res) => {
	try {
  
		const allUsers = await User.find({role:"user"})
		res.status(200).json({
			success: true,
			users: allUsers
		});

	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching users"
		});
	}
};
