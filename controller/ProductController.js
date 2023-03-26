const cloudinary = require("cloudinary").v2;


// import Product module 
const Product = require("../models/product")



exports.testing = (req, res) => {
	res.render("overview")
};

// adding product 
exports.AddProduct = async (req, res) => {
	try {

      
		const Images = [];

      // checking for image provided or not
		if (!req.files) {
			return res.json({
				message: "files required please send",
			});
		}

		if (req.files) {
         // images is provided in multiple files in array format
			for (let i = 0; i < req.files.photos.length; i++) {

            // uploading image in cloundinary
				const UploadedImage = await cloudinary.uploader.upload(
					req.files.photos[i].tempFilePath,
					{
						folder: "products",
					}
				);

            // making obj to stoe url and id
				const imageData = {
					id: UploadedImage.public_id,
					secure_url: UploadedImage.secure_url,
				};
            // pusing to object for images where multiple image store
				Images.push(imageData);
			}
		}

		req.body.photos = Images;
		req.body.user = req.user.id;

      // creating object
		const ProductAdded = await Product.create(req.body);

		res.status(200).json({
			sucess: true,
			ProductAdded,
		});
	} catch (error) {
		res.json({
			sucess: false,
			message: "error sending request",
		});
	}
};



exports.Pagination = async (req, res) => {
	try {

      



		res.status(200).json({
			sucess: true,
		
		});
	} catch (error) {
		res.json({
			sucess: false,
			message: "error sending request",
		});
	}
};

