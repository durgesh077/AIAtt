import { useState, useEffect } from "react";
import * as fas from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './camera.css'
import uploadImg from "./uploadImg";
function startCamera() {
    const video = document.getElementById("video")
    let ratioInPortrait = video.clientHeight / video.clientWidth
    let constraint = {
        video: {
            width: { max: 1200 },
            aspectRatio: (window.innerHeight > window.innerWidth) ? ratioInPortrait : 1 / ratioInPortrait,
            facingMode: 'environment'
        }
    }
    navigator.mediaDevices.getUserMedia(constraint).then(stream => {
        video.srcObject = stream;
    })
}

function Video(props) {
    useEffect(() => {
        if(props.state){
        startCamera()
        }
    })
    return (
        <>
            <video id="video" poster="logo192.png" style={styles.Video} autoPlay ></video>
        </>
    )
}


function ShutterButton(props) {
    function handleClickTick(){
        let video=document.getElementById('video')
        uploadImg(new Date().toString()+"_"+Math.floor(Math.random()*10000),video.poster)
    }
    function handleClickCancel() {
        props.stateChanger(1-props.state)
    }
    return (
        <>
            <div style={styles.ShutterButton}>
                <p className="block tick" onClick={()=>setTimeout(handleClickTick,300)}> <FontAwesomeIcon icon={fas.faCheck} style={{ fontSize: "200%", color: 'blue' }} /></p>
                <p className="capture cancel" onClick={() => setTimeout(handleClickCancel, 300)}><FontAwesomeIcon icon={fas.faTimes} style={{ fontSize: "100%" }} /></p>
            </div>
        </>
    );
}


function CapturePhoto(props) {
    function handleTakePhoto() {
        let canvas = document.getElementById('canvas')
        let ctx = canvas.getContext("2d")
        let video = document.getElementById('video')
        let X = canvas.width = video.videoWidth;
        let Y = canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, X, Y, 0, 0, X, Y);
        if (props.state){
            video.srcObject.getTracks()[0].stop()
            video.srcObject=null
            video.poster=canvas.toDataURL()
        }
        props.stateChanger(1-props.state)
    }
    function handleCancelPhoto(){
        let video = document.getElementById('video')
        if (video.srcObject) {
            video.srcObject.getTracks()[0].stop()
            video.srcObject = null
        }
        props.exitDispatch(1)
    }
    return (
        <div style={styles.ShutterButton}>
            <div className="capture shot" onClick={()=>setTimeout(handleTakePhoto,300)}></div>
            <p className="capture cancel" onClick={() => setTimeout(handleCancelPhoto, 300)}><FontAwesomeIcon icon={fas.faTimes} style={{ fontSize: "100%" }} /></p>
        </div>
    );
}

function Camera(props) {
    let [voi, chVoi] = useState(1)
    if(props.exitState)
       return null;
    let Comp;

    if (voi){
        Comp=(
        <CapturePhoto exitDispatch={props.exitDispatch} stateChanger={chVoi} state={voi} />
        );
    }
    else{
    Comp=(
        <ShutterButton stateChanger={chVoi} state={voi}/>
    );
    }
    return (
        <>
        <div style={styles.VideoWrapper} id="VideoWrapper">
            <Video state={voi}/>
        </div>
        {Comp}
        </>
    );
}


export default function Main(props) {
    let [exit,exitDispatch]=useState(0)
    if(exit){
     return null;
    }
    else{
    return (
        <>
            <div id="Main" style={styles.Main}>
                <Camera exitDispatch={exitDispatch} exitState={exit}/>
            </div>
            <canvas id="canvas" width="100" height="100" style={{display:'none'}}></canvas>
        </>
    );
    }
}


const styles = {
    Main: {
        border: "2px groove black",
        boxShadow: "0 0 9px 2px gray",
        height: "100vh",
        maxWidth: "400px",
        boxSizing: "border-box",
        borderRadius: "7px",
        display: "flex",
        flexFlow: "column nowrap",
        padding:"2px"
    },
    ShutterButton: {
        border: "2px solid black",
        marginTop: 2,
        display: 'grid',
        backgroundColor: 'dodgerBlue',
        gridTemplate: "100px / auto auto",
        border: '2px solid black',
        alignContent: 'center',
        borderRadius: '10px'
    },
    Video: {
        height: "100%",
        width: "100%",
        boxSizing: 'content-box'
    },
    VideoWrapper: {
        position:"relative",
        flex: 8.5,
        width: '100%',
        borderBottom: "2px solid #3f3f3f",
        backgroundColor: 'gray',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        objectFit: "contain",
        overflow: "hidden"
    },

}