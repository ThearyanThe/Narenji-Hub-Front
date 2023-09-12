
import { getUrlParam,insertAdjacentHTML } from "./utils.js";
const getAndShowSearchCourses = async () => {
    const coursesContainer = document.querySelector("#search-courses-wrapper");
    const articlesContainer = document.querySelector("#search-article-wrapper");
    const searchkey=getUrlParam("value")
    const res = await fetch(`http://localhost:4000/v1/search/${searchkey}`);
    const courses = await res.json();
     /*corses */
    if(courses.allResultCourses.length){
      
           insertAdjacentHTML(coursesContainer,courses.allResultCourses)  
    }
    else {

       coursesContainer.innerHTML = ` <div class="bg-red-500 text-white p-3 rounded-md flex justify-center items-center w-full font-ybakhfat ">
       <span>دوره ای یافت نشد!</span>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
         <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
       </svg>
       
      </div>`


      }    
    
    /*articles */
    if(courses.allResultArticles.length){
        courses.allResultArticles.map((article) => {
            articlesContainer.insertAdjacentHTML(
             "beforeend",
             `
             <div class="w-[47%] md:w-[31%] lg:w-[24%] bg-gray-3 rounded-lg  overflow-hidden " >
             <a href="">
             <!--photo-->
             <div class="img">
             <img src=http://localhost:4000/courses/covers/${article.cover
        }
           </div>
           <div class="">
             <div class="mx-1">
               <!--title-->
               <div class="px-1 md:px-2 py-1">
                 <h1 class="font-ybakhfat text-right text-xs md:text-base text-white"> ${article.title}</h1>
                 <p class="font-ybakh text-right text-[10px] md:text-xs text-slate-300">${article.description}</p>
               </div>
               
            
          
    
       
             <!--visit-info-->
             <div class=" flex justify-center h-12 md:h-16 border-t-2 border-orange-1 text-xs md:text-base text-orange-1">
               <a class="flex gap-2 items-center font-ybakhfat" href=""> 
               بیشتر بخوانید
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                   <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clip-rule="evenodd" />
                 </svg>
                 
           
               </a>
             </div>
             </div>
             </div>
     
            
           </a>
           </div>
           `
            );
         
           });
    }
    else {

       articlesContainer.innerHTML = ` <div class="bg-red-500 text-white p-3 rounded-md flex justify-center items-center w-full font-ybakhfat ">
       <span>مقاله ای ای یافت نشد!</span>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
         <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
       </svg>
       
      </div>`


      }   
    return courses;
   };
   export{getAndShowSearchCourses}