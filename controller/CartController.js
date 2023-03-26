const Cart = require("../models/Cart")
const Toastify = require("toastify-js")



exports.AddTOcart = async (req, res) => {
	try {
        
           req.body.userId = req.user.id 
          const newcart = new Cart(req.body)
           const data=  await  newcart.save()

            res.redirect("/")

	} catch (error) {
		res.json({
			sucess: false,
			message: "error sending request",
		});
	}
};

exports.UserCart = async (req, res) => {
	try {
           const CartId = req.user.id
           const cart = await Cart.find({userId:CartId})
           var TotalProduct = cart.length
           var total =0;
           cart.map(product=>{
                total+=product.price
           })

		 
           res.render("Product/Cart",{layout:false, total,cart,TotalProduct})

        //    res.render("Product/Carts",{layout:false, total,cart,TotalProduct})


	} catch (error) {
		res.json({
			sucess: false,
			message: "error sending request",
		});
	}
};



exports.DeleteProduct = async (req, res) => {
	try {
        const Id = req.body._id
        const DeleteDone = await Cart.deleteOne({_id: Id})
        res.redirect("/user/cart")
        
	} catch (error) {
		res.json({
			sucess: false,
			message: "kuch dikkat ayi h",
		});
	}
};

