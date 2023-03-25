const { fetch } = require('undici')

exports.Home = async (req, res) => {
	const data = await fetch("https://dummyjson.com/products");
	const data2 = await data.json();
	const pizza = data2.products;
	res.render("Home/Home", { pizza });
};

exports.OverviewProduct = async (req, res) => {
	const productId = req.params.id;
	const response = await fetch(`https://dummyjson.com/products/${productId}`);
	const product = await response.json();

	res.render("Product/overview", { product });
};





// dynamic routes

// https://github.com/derRinat/expressroutes_urlmanager
// https://dev.to/reiallenramos/create-an-express-api-static-and-dynamic-routes-33lb
// https://dev.to/reiallenramos/create-an-express-api-static-and-dynamic-routes-33lb
