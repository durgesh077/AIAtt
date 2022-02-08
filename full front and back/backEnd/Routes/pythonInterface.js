let router=require("Router")
const {spawn,exec}= require("child_process")
let sendPhoto2Python=spawn("python",['./python/this.py'],{shell:true})
sendPhoto2Python.stdout.on("data",data=>{
    console.log(data.toString())
});

sendPhoto2Python.stderr.on('data',data=>{
    console.log(data.toString())
})

sendPhoto2Python.on("spawn",()=>{
    console.log("now python is integrated")
})
sendPhoto2Python.on("error",error=>{
    console.log(error.message)
})

module.exports =function interface(data){
    sendPhoto2Python.stdin.write(JSON.stringify(data)+"\n")
}