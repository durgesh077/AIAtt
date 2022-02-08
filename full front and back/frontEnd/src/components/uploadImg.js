export default async function uploadImg(name,data){
    let fd = new FormData()
    fd.append("img", data)
    fd.append("name", name)
    let res = await fetch("/base64", {
        method: "POST",
        body: fd
    });
    res = await res.text() 
}