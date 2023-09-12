import { getAndShowCoursesDetail,submitComment,setScore } from "./func/course.js";
window.addEventListener("load",()=>{
const submitCommentBtn = document.querySelector("#submitCommentBtn");
submitCommentBtn.addEventListener("click", () => {
    console.log('Send Comment');
    submitComment()
    
  }),
getAndShowCoursesDetail()
setScore()

})