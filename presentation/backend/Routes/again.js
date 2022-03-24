const express = require("express")
const Router = express.Router()
Router.get("/",()=>console.log("in again.js"))

module.exports=Router