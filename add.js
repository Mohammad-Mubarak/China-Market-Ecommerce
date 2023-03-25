const MyProduct = require("./models/AllProduct")

const {fetch} = require("undici")
const express = require("express");
const app = express();

const DATA = require("./models/AllProduct")


// db connection done
require("./config/connection");


async function add() {
      const data = await fetch("https://dummyjson.com/products?limit=30&skip=60");
      const nowdata = await data.json();
      const val =nowdata.products
      val.map(async (e)=>{
        const added = await DATA(e)
       await   added.save()

      })
console.log("added successfully")
}
     
    
    add()