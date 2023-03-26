const { fetch } = require('undici')
const Cart = require("../models/Cart")


// const Product = require("../models/AllProduct")

exports.Home = async (req, res) => {

	var TotalProduc0;
	var UserData;
	if(req.user !== undefined){
		UserData=req.user
		const CartId = req.user.id
		const cart = await Cart.find({userId:CartId})
	    TotalProduct = cart.length 

		
	}
	

	const data = await fetch("https://dummyjson.com/products");
	const data2 = await data.json();
	const pizza = data2.products;
	res.render("Home/Home", { pizza ,TotalProduct,});
};



exports.OverviewProduct = async (req, res) => {
	const productId = req.params.id;
	const response = await fetch(`https://dummyjson.com/products/${productId}`);
	const product = await response.json();

	res.render("Product/overview", { product });
};



// exports.OverviewProduct = async (req, res) => {
// 	const productId = req.params.id;
// 	const SeeProduct = await Product.findOne({ id: productId})
// 	// const product = await response.json();
//    
// 	// res.render("Product/overview", { product });
// };






// dynamic routes

// https://github.com/derRinat/expressroutes_urlmanager
// https://dev.to/reiallenramos/create-an-express-api-static-and-dynamic-routes-33lb
// https://dev.to/reiallenramos/create-an-express-api-static-and-dynamic-routes-33lb
