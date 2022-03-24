const express=require("express")
const multer=require('multer')
const cors= require('cors')
const path=require('path')
const base64Img=require("base64-img")
const dm= require("./Routes/dm")

const interfaceWithPython=require('./Routes/pythonInterface.js')

const app=express()
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname, "public", "files"))
    },
    filename:(req,file,cb)=>{
        console.log(file)
         cb(null,file.originalname)
    }
})

const upload=multer({storage:storage})
app.use(cors())
app.use(express.static(path.join(__dirname,"public")))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontPages/index.html"))
})
app.post("/files", upload.fields([{ name: "photo1", maxCount: 2 }]),(req,res)=>{
    console.log(req.files.photo1)
    res.send("done is very good thing")
})
 
app.post("/base64",upload.none(),(req,res)=>{
    let body=req.body
    interfaceWithPython({name:body.name,img64base:body.img,height:body.height,width:body.width})
    res.send("done")
})

app.use("/dm",dm)
app.listen(5000)