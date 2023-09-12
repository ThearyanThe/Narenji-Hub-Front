import { getUrlParam,addParamToUrl,paginateItems } from "./utils.js";
import { insertAdjacentHTML ,SearchInArray} from "./utils.js";
window.addParamToUrl=addParamToUrl;

const getAndShowCategoryCourses = async () => {
  const categoryName = getUrlParam("cat");

  const CategoryTitle = document.querySelector("#Category-Title")
  const continer = document.querySelector("#category-courses-wrapper")
  const SelectionsFiltering = document.querySelectorAll(".filtering-list")
  const FilteringListDefault = document.querySelector(".filtering-list-default ")
  const Searching=document.querySelector(".searching")
  const paginationWrapper=document.querySelector("#paginationWrapper")
  const res = await fetch(
    `http://localhost:4000/v1/courses/category/${categoryName}`
  );
  const result = await res.json();
    /*pagination */
    let PageParam=getUrlParam("page")
    if(!PageParam){
      PageParam=1
    }
    /*get courses by pagination */
  const courses= paginateItems(result,4,paginationWrapper,PageParam)

  //Category title
  CategoryTitle.innerHTML = `   <div class="flex flex-col items-center mt-6 ">

      <div class="  flex justify-center w-[95%] lg:w-[85%]">
      
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="intro-icon w-5 h-5 md:w-8 md:h-8 text-orange-2">
          <path fill-rule="evenodd" d="M10.5 3.798v5.02a3 3 0 01-.879 2.121l-2.377 2.377a9.845 9.845 0 015.091 1.013 8.315 8.315 0 005.713.636l.285-.071-3.954-3.955a3 3 0 01-.879-2.121v-5.02a23.614 23.614 0 00-3 0zm4.5.138a.75.75 0 00.093-1.495A24.837 24.837 0 0012 2.25a25.048 25.048 0 00-3.093.191A.75.75 0 009 3.936v4.882a1.5 1.5 0 01-.44 1.06l-6.293 6.294c-1.62 1.621-.903 4.475 1.471 4.88 2.686.46 5.447.698 8.262.698 2.816 0 5.576-.239 8.262-.697 2.373-.406 3.092-3.26 1.47-4.881L15.44 9.879A1.5 1.5 0 0115 8.818V3.936z" clip-rule="evenodd" />
        </svg>

       
  
       <span class="  font-ybakhfat text-white  flex flex-col  md:text-2xl  w-[100%] mb-1  mr-1">
        <span class="intro-title relative pr-2 "> دوره های ${categoryName}</span>
  
        <span class="text-xs md:text-sm font-ybakh p-1"> دسته بندی تمام دوره های مربوطه
        </span>
       </span>
      </div>`
  if (courses.length) {
    insertAdjacentHTML(continer, courses)
  }
  else {

    continer.innerHTML = ` <div class="bg-red-500 text-white p-3 flex justify-center items-center w-full font-ybakhfat ">
             <span>دوره ای یافت نشد!</span>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
               <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
             </svg>
             
            </div>`


  }

  //show courses by filtering
  let outputarray = []
  
  SelectionsFiltering.forEach(SelectionFiltering => {
    SelectionFiltering.addEventListener('click', (event) => {
      const goal = event.target.innerHTML
      FilteringListDefault.innerHTML = ""
      FilteringListDefault.innerHTML = goal


      let DataKey = "defult"
      DataKey = event.target.dataset.key

      let CourseFilteringCopy = [...result]
   
      switch (DataKey) {

        case "free":
          outputarray = CourseFilteringCopy.filter(CoursesFiltering => CoursesFiltering.price == 0)
          break;
        case "money":
          outputarray = CourseFilteringCopy.filter(CoursesFiltering => CoursesFiltering.price != 0)
          break;
        case "new":
          outputarray = [...CourseFilteringCopy].reverse()
          break;
        case "defult":
          outputarray = CourseFilteringCopy

          break;
        default:
          outputarray = CourseFilteringCopy
          break;
      }
      continer.innerHTML = ""
      if (outputarray.length) {
  
        const navigationFilterresult= paginateItems(outputarray,4,paginationWrapper,PageParam)
        insertAdjacentHTML(continer, navigationFilterresult)
      }
      else {

        continer.innerHTML = ` <div class="bg-red-500 rounded-md text-white p-3 flex justify-center items-center w-full font-ybakhfat ">
       <span>دوره ای یافت نشد!</span>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
         <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
       </svg>
       
      </div>`


      }

    })

  })
//show courses by search
Searching.addEventListener('input',event=>{

 const ResultCourses=SearchInArray([...result],'name',event.target.value)
 continer.innerHTML = ""
 if(ResultCourses.length){
  insertAdjacentHTML(continer, ResultCourses)
 }
 else {

  continer.innerHTML = ` <div class="bg-red-500 text-white p-3 flex justify-center items-center w-full font-ybakhfat ">
 <span>دوره ای یافت نشد!</span>
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
   <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
 </svg>
 
</div>`


}
})
  return courses;
};
export { getAndShowCategoryCourses }