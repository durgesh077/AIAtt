const {spawn,exec}= require("child_process")
let opened=false;
function  respawn() {
    let sendPhoto2Python=spawn("python",['./python/this.py'],{shell:true})
    sendPhoto2Python.stdout.on("data",data=>{
        console.log(data.toString())
    });
    sendPhoto2Python.stderr.on('data',data=>{
        console.log(data.toString())
    })
    
    sendPhoto2Python.on("spawn",()=>{
        opened=true;
        console.log("now python is integrated")
    })
    sendPhoto2Python.on("close",error=>{
        opened=false;
        console.log("Something was wrong ! \n Restarting....")
    })
    return sendPhoto2Python
}
let sendPhoto2Python=respawn()
module.exports =function interface(data){
    if(!opened)
     sendPhoto2Python=respawn()
    sendPhoto2Python.stdin.write(JSON.stringify(data)+"\n")
}