const express = require('express')
const router = express.Router()

const {home,homedummy} = require("../controller/HomeController.js")

const { fetch } = require('undici')

// Home route
router.route("/").get(async (_, res) => {
	const data = await fetch('https://dummyjson.com/products')
	const data2 = await data.json()
   const pizza = data2.products
	  res.render("Home",{pizza});
  })


module.exports = router


