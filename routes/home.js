const express = require('express')
const router = express.Router()

const {home,homedummy} = require("../controller/HomeController.js")

router.route('/Raftar').get(home)
router.route('/home').get(homedummy)



module.exports = router


