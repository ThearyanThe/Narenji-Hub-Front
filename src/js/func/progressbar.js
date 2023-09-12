
document.querySelector("#progressbarprecent").classList.add("w-0")
window.addEventListener("load",()=>{
    document.querySelector("#progressbarprecent").classList.remove("w-0")
    document.querySelector("#progressbarprecent").classList.add("duration-[6s]")
    document.querySelector("#progressbarprecent").classList.add("w-[55%]")
    document.querySelector("#progressbarprecent").innerHTML='44%'


})