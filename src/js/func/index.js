
import { getUrlParam} from "./utils.js";
import { insertAdjacentHTML } from "./utils.js";


const getAndShowAllCourses = async () => {

 const coursesContainer = document.querySelector("#courses-container");

 const res = await fetch(`http://localhost:4000/v1/courses`);
 const courses = await res.json();
 

        insertAdjacentHTML(coursesContainer,courses)
 
 
 return courses;
};
const getAndShowPopularCourses = async () => {
 const popularCoursesWrapper = document.querySelector(
  "#popular-courses-wrapper"
 );

 const res = await fetch(`http://localhost:4000/v1/courses/popular`);
 const popularCourses = await res.json();

   insertAdjacentHTML(popularCoursesWrapper,popularCourses)  
 
 return popularCourses;
};
const getAndShowPresellCourses = async () => {
 const presellCoursesWrapper = document.querySelector(
  "#presell-courses-wrapper"
 );

 const res = await fetch(`http://localhost:4000/v1/courses/presell`);
 const presellCourses = await res.json();
   insertAdjacentHTML(presellCoursesWrapper,presellCourses)  

 return presellCourses;
};
const getAndShowArticle = async () => {
  const ArticleWrapper = document.querySelector(
   "#article-courses-wrapper"
  );
 
  const res = await fetch(`http://localhost:4000/v1/articles`);
  const Articles = await res.json();

 Articles.forEach((article) => {
  ArticleWrapper.insertAdjacentHTML(
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
 
  return Articles;
 };
const getsearchInput=()=>{
  const SerchInput=document.querySelector("#searchinput")
  const SerchInput_btn=document.querySelector("#searchinput-btn")
  SerchInput_btn.addEventListener("click",()=>{
    location.href=`search.html?value=${SerchInput.value.trim()}`
  })
}
export { getAndShowAllCourses, getAndShowPopularCourses, getAndShowPresellCourses, getAndShowArticle,getsearchInput}