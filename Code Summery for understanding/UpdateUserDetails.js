exports.updateUserDetails = async (req, res) => {
	try {

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
		const updatedData = await User.findByIdAndUpdate(req.user.id,newdata,{
			new:true,
			runValidators:true
		})


		/// sending response
		res.status(200).json({
			message:"updated successfully",
			userdata:updatedData
		})


	} catch (error) {
		
	}
};
