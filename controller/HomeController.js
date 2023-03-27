const { fetch } = require('undici')
const Cart = require("../models/Cart")


// const Product = require("../models/AllProduct")

// exports.Home = async (req, res) => {

// 	const page = req.query.page || 1;

// 	const pageNumber = req.query.page || 1;
// const itemsPerPage = 10;

// const startIndex = (pageNumber - 1) * itemsPerPage;
// const endIndex = startIndex + itemsPerPage;

// 	// const data = await fetch("https://dummyjson.com/products");
// 	const data = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${startIndex}`);
// 	const data2 = await data.json();

	
// 	const pizza = data2.products;

	
// 	res.render("Home/Home", { pizza });
	
// };

exports.Home = async (req, res) => {
	const page = req.query.page || 1;
	const itemsPerPage = 10;
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
  
	const data = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${startIndex}`);
	const data2 = await data.json();
	const pizza = data2.products;
  
	// calculate the total number of pages based on the total number of items
	const totalItems = data2.total;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
  
	res.render("Home/Home", { pizza, currentPage: page, totalPages });
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
