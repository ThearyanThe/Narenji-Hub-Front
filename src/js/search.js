import { getAndShowSearchCourses } from "./func/search.js"

window.addEventListener('load', () => {
   getAndShowSearchCourses().then(a=>{
    console.log(a);
   })
 
  
})
