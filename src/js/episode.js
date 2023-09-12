import { getSessionDetails } from "./func/episode.js";
window.addEventListener("load",
getSessionDetails().then(data=>(console.log(data)))

)