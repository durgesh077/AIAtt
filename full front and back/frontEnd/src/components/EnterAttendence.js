import $ from "jquery"
import React,{useEffect, useRef} from "react";
import { MainFrame,ProfileModal } from "./EnterAttendance.styles";
import './extra.css'
let gridItems=[]
function random(upto){
    return Math.floor(Math.random()*10000)
}
let names=["durgesh","aayan","aditya","sanskar","sarthak","priya"]
let stt = [' ', 'P', 'A'];
let colors = ["#101522", "rgba(0, 255, 0, 0.6)", "rgba(255, 0, 0, 0.678)"]
for(let i=1;i<=63;i++){
    let cell=<div key={i}>{i}</div>
    gridItems.push(cell)
}    

function contextController(event,data){
    $(document.body).css({ filter: "brightness(80%)" })
    const modal=$(".modal")
    modal.html("");
    modal.css({border:"8px ridge navy",height:"400px"});
    if(!data){
        $(modal).append(
            `<span style="color:red;font-size:2em;padding:5px;text-align:center;">Data Not Loaded Yet!! &times;</span>`
        );
    }else
    $(modal).append(
        `<img src="//source.unsplash.com/random/300x200" style="margin:5px;border-radius:50%" height="200" width="80%"/>`,
        `<h1 style="font-size:2em;padding:5px;text-align:center;">Profile:${data.name}</h1>`,
        `<h2 style="font-size:2em;padding:5px;text-align:center;"> Roll No:${random()} </h2>`
    );
    
    window.addEventListener("click",(evt)=>{
        modal.css({height:0,border:"0"})
        evt.preventDefault();
        evt.stopPropagation();
        $(document.body).css({filter:"brightness(100%)"})
    },{once:true})
    return false;
}

export default function EnterAttendance(props){
    let refMainFrame=useRef(null);
    let refProfileModal=useRef(null);
    useEffect(()=>{
        let childs = $(refMainFrame.current).children();
        let students=40;
        for(let i=0;i<students;i++){
            let ch=childs[i];
            let status = random() % 3;
            let name = names[random() % names.length];
            let data = { name, status };
            $(ch).data("data", data).css("backgroundColor", colors[status])
            if($(ch).children().length===0)
                $(ch).append(`<pre>${stt[status]}</pre>`)
            $(ch).children().last().css({fontSize:"1.5em",textAlign:'center',padding:0,margin:0})


            $(ch).click(function(){
                let elem=$(this)
                let status = elem.data("data").status+1
                status%=3;
                elem.data("data").status=status
                elem.children().last().text(stt[status])
                elem.css({backgroundColor:colors[status]})
            })
            $(ch).contextmenu((event)=>{contextController(event,$(ch).data("data"));return false;})
        }
        
        for (let i = students; i < childs.length; i++) {
            let ch = childs[i];
            $(ch).css({animation:"none",border:"0"})
        }
        let modal = refProfileModal.current
        $(modal).addClass("modal")

        return ()=>{
            $(modal).removeClass("modal")
        }
    },[])
    return (
        <>
            <MainFrame ref={refMainFrame}>
                {gridItems}
            </MainFrame>
            <ProfileModal ref={refProfileModal}/>
        </>
    );
}









