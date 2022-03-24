let { spawn } = require("child_process")
let childPY = spawn("python", ["this.py"], { shell: true })
childPY.stdout.pipe(process.stdout)
childPY.on("error", (err) => console.log(err.msg))
childPY.stdout.on("data", (data) => {
    console.log("done")
    childPY.stdin.write("hello how are you \n hello ")
})
childPY.on("close", (data) => console.log(data.toString(), "is entered"))
//childPY.on("spawn", () => {
//    childPY.stdin.write("This is good \n done is good thing ")
//    //childPY.stdin.end()
//})
module.exports=null

