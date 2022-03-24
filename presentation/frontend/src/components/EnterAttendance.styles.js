import styled from 'styled-components';
export const MainFrame=styled.div`
    display:inline-grid;
    height:100vh;
    width:min(100vw,800px);
    background-color:dodgerblue;
    gap:4px;
    border:2px solid black;
    margin:3px;
    padding:8px;
    grid-template:repeat(9,1fr) / repeat(7,1fr);
    border-radius:6px;
    &> *{
        background-color:#3f3f3f;
        border:2px solid transparent;
        border-radius:3px;
        user-select:none;
        color:white;
        padding:3px;
        box-sizing:border-box;
        transition:all 0.3s;
        &:hover{
            border:2px solid cyan;
            animation: popColor 0.3s infinite;
            @keyframes popColor{
                0%{
                    box-shadow:2px 2px 4px red , -2px -2px 4px blue;
                }
                50%{
                    box-shadow:2px 2px 4px blue , -2px -2px 4px red;
                }
            }
        }
        &:active{
            filter:brightness(200%);
        }
    }
`

export const ProfileModal=styled.div`
        background-color:#3f3f3f;
        height:0px;
        width: min(400px,80vw);
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        z-index:1000;
        transition:all 1s;
        border-radius: 20px;
        border:0px ridge navy;
        overflow:auto;
        text-align:center;
        color:white;
        font-family:sans-serif;
`