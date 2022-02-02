import react from 'react'
import './camera.css'
let constraint={
            video:{
                height:{max:1200},
                width:{max:1200},
                aspectRatio: { ideal:window.innerHeight > window.innerWidth? 1.4:1/1.4},
                facingMode:"environment"
            }
        }
export default class CameraPage extends react.Component{
    constructor(props){
        super(props)
        this.handleCorrectShutter=this.handleCorrectShutter.bind(this)
        this.handleWrongShutter=this.handleWrongShutter.bind(this)
    }
    componentDidMount(){
        this.videoDoc = document.querySelector("#livePhoto video")
        
        try{
        navigator.mediaDevices.getUserMedia(constraint).then(stream=>{
            window.stream=stream;
            this.videoDoc.srcObject=stream
        }).catch(err=>console.log(err.message))
    } catch{
        console.log("media not supported on insecure devices")
        }
    }

    handleCorrectShutter(){
        let videoDoc = document.querySelector("#livePhoto video")
        let canvas=document.getElementById("cnv")
        let img=document.getElementById('canvas');
        const a=document.createElement("a")
        canvas.width = videoDoc.width
        canvas.height = videoDoc.height
        canvas.getContext("2d").drawImage(videoDoc, 0, 0,videoDoc.height,videoDoc.width)
        canvas.toBlob(blob=>{
            img.src=canvas.toDataURL()
            img.style.width = videoDoc.videoWidth+"px"
            img.style.height = videoDoc.videoHeight+"px"
            a.href=URL.createObjectURL(blob);
            a.download="downlod.png"
            //a.click();
            videoDoc.parentElement.style.height="0"
            videoDoc.srcObject.getTracks()[0].stop()
        })
    }
    handleWrongShutter(){
        try {
            navigator.mediaDevices.getUserMedia(constraint).then(stream => {
                window.stream = stream;
                this.videoDoc.srcObject = stream
                let img = document.getElementById('canvas');
                let videoDoc = document.querySelector("#livePhoto video")
                videoDoc.srcObject = window.stream
                img.style.height = 0
                videoDoc.parentElement.style.height = "70vh"
            }).catch(err => console.log(err.message))
        } catch {
            console.log("media not supported on insecure devices")
        }

    }
    render(){
        return (
            <>
            <img id="canvas"></img>
            <canvas id="cnv" height="800" width="800" style={{display:"none"}}></canvas>
            <div id="livePhoto">
              <video poster="logo192.png" width="100%" height="100%" autoPlay></video>
            </div>
              <div id="shutter">
                <div className="correctShutter" onClick={this.handleCorrectShutter}>
                        <span> &#10004;</span>
                </div>
                <div className="wrongShutter" onClick={this.handleWrongShutter}>
                        <span> 	&#10060;</span>
                </div>
              </div>
            </>
        );
    }
}