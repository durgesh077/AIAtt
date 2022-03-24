const express=require("express")
const Router=express.Router()
const again=require("../Routes/again.js")
//Router.use("/new",again)
Router.get("/new",(req,res,next)=>{
    res.redirect("/dm")
})
module.exports = Router