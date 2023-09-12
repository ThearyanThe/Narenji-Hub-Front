
import { getUrlParam,insertAdjacentHTML } from "./utils.js";
import { paginateItems } from "./utils.js";
const getAndShowAllCourses = async () => {
    const coursesContainer = document.querySelector("#all-courses-wrapper");
    const paginationWrapper=document.querySelector("#paginationWrapper")
    const res = await fetch(`http://localhost:4000/v1/courses`);
    const result = await res.json();
        /*pagination */
        let PageParam=getUrlParam("page")
        if(!PageParam){
          PageParam=1
        }
        /*get courses by pagination */
      const courses= paginateItems(result,4,paginationWrapper,PageParam)
    
    console.log(courses);
     /*corses */
    if(courses.length){
      
           insertAdjacentHTML(coursesContainer,courses)  
    }
    else {

       coursesContainer.innerHTML = ` <div class="bg-red-500 text-white p-3 rounded-md flex justify-center items-center w-full font-ybakhfat ">
       <span>دوره ای یافت نشد!</span>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
         <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
       </svg>
       
      </div>`


      }   
    
  
    return courses;
   };
   export{getAndShowAllCourses}