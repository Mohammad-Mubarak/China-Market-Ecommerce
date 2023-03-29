// // add to cart functionality done
// function addcartproduct(data) {
   
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
//     cart.map(val=>{
//       console.log(val);
//     })
  
  
//     let index = cart.findIndex(item =>{
//       console.log(item.id)
//       item.id === data.id
//     });
  
  
//     if (index !== -1) {
//       cart[index].quantity += data.quantity;
//       cart[index].price += data.price;
//     } else {
//       cart.push(data);
//     }
    
//     localStorage.setItem("cart", JSON.stringify(cart));
    
//   }
  
















app.get("/md",(req, res) => {
	
  
  if (req.headers.authorization || req.headers.authorization.startsWith('Bearer ')) {
    // If the JWT token is present in the Authorization header
    const token = req.headers.authorization.substring(7);
    console.log(token)
    } else if (req.cookies || req.cookies.token) {
    // If the JWT token is present in a cookie
    const token = req.cookies.token;
    // ...Do something with the token...
    console.log(token)
    res.render("Auth/login")
    } else {
    // If the JWT token is not present in either the Authorization header or a cookie
    // ...Handle the error or redirect the user to a login page...
    console.log("user not logged in")
    }

    
  })
  