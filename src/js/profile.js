import { getAndShowUserInfosInEditPage,updateUser } from "./func/profile.js";
const changeProfileBtn=document.querySelector("#changeProfileBtn")
window.addEventListener("load",()=>{
    changeProfileBtn.addEventListener("click",(event)=>{
        event.preventDefault()
        updateUser()
    })
    getAndShowUserInfosInEditPage()
})