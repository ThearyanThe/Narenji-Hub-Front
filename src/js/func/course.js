
import { getUrlParam,getToken,showSwal } from "./utils.js";
import { convertEnNumberToPersian } from "../numberToPersian.js";


const getAndShowCoursesDetail = async () => {
    const courseyName = getUrlParam("name");
    const Title = document.querySelector("#Course-Title")
    const introDescription = document.querySelector("#Course-introDesc")
    const Description = document.querySelector("#Course-Desc")
    const Category = document.querySelector("#Course-Category")
    const Register = document.querySelector("#Course-Register")
    const Price = document.querySelector("#Course-Price")
    const Creator = document.querySelector("#Course-Creator")
    const Cover = document.querySelector("#Course-Cover")
    const Status = document.querySelector("#Course-Status")
    const Opinion = document.querySelector("#Course-opinion")
    const IntroTitle=document.querySelector("#intro-title")
    const IntroDesc=document.querySelector("#intro-desc")
    const SessionsCount=document.querySelector("#course-session")
    const Support=document.querySelector("#course-support")
    const sessionsWrapper=document.querySelector("#session-wrapper")
    const Location=document.querySelector("#location")
    const shortLink=document.querySelector("#shortlink")
    const CommentsWrapper=document.querySelector("#commentsWrapper")
    const res = await fetch(
        `http://localhost:4000/v1/courses/${courseyName}`
    );
    const course = await res.json();
  console.log(course);
    //related-course
getRelatedCourses(course)
   //copy-shortlink
   let myVar=shortLink.innerHTML.trim()
   shortLink.addEventListener("click",()=>{

    navigator.clipboard.writeText(myVar)
   })
    //Course-name
    Title.innerHTML = course.name
    //Course-description
    Description.innerHTML = course.description
    introDescription.innerHTML = course.description
    //Course-Category
    Category.innerHTML = course.categoryID.title
    //Course-Register
    if(course.isUserRegisteredToThisCourse){
      Register.innerHTML="شما دانشجوی دوره هستید"
    }
    else{
      Register.innerHTML="ثبت نام در دوره"
      Register.addEventListener("click",(event)=>{
      event.preventDefault()
      //free-course
      if (course.price == 0) {
        showSwal(
          "آیا از ثبت نام در دوره اطمینان دارید؟",
          "warning",
          ["نه", "آره"],
          async (result) => {
            if (result) {
              const res = await fetch(
                `http://localhost:4000/v1/courses/${course._id}/register`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ price: 0 }),
                }
              );
              const resp=res.json()
console.log(resp);
              if (res.ok) {
                showSwal(
                  "با موفقیت در دوره ثبت نام شدید",
                  "success",
                  "هورررراااا",
                  () => {
                    location.reload();
                  }
                );
              }
              else{
                showSwal(
                  " قبلا ثبت نام کردی ولی بک اند مشکل داشته و شما جزو ثبت نامی ها نشدید",
                  "warning",
                  "ok",
                  () => {
                    location.reload();
                  }
                );
              }
            }
          }
          
        );
      }
      else {
        showSwal(
          "آیا از ثبت نام در دوره اطمینان دارید؟",
          "warning",
          ["نه", "آره"],
          async (result) => {
            if (result) {
              showSwal(
                "آیا کد تخفیف دارید؟",
                "warning",
                ["نه", "آره"],
                async (result) => {
                  if (result) {
                    swal({
                      title: "کد تخفیف را وارد نمایید:",
                      content: "input",
                      button: "اعمال تخفیف",
                    }).then((code) => {
                      fetch(`http://localhost:4000/v1/offs/${code}`, {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${getToken()}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ course: course._id }),
                      })
                        .then((res) => {
                          if (res.status === 404) {
                            showSwal(
                              "کد تخفیف معتبر نمی‌باشد",
                              "error",
                              "ای بابا",
                              () => {}
                            );
                          } else if (res.status === 409) {
                            showSwal(
                              "مهلت استفاده از کد تخفیف به اتمام رسیده",
                              "error",
                              "ای بابا",
                              () => {}
                            );
                          }
                          return res.json();
                        })
                        .then((code) => {
                          console.log(code);

                          fetch(
                            `http://localhost:4000/v1/courses/${course._id}/register`,
                            {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${getToken()}`,
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ price: course.price - (course.price * code.percent / 100) }),
                            }
                          ).then((res) => {
                            if (res.ok) {
                              showSwal(
                                "با موفقیت در دوره ثبت نام شدید",
                                "success",
                                "هورررراااا",
                                () => {
                                  location.reload();
                                }
                              );
                            }
                          });
                        });
                    });
                  } else {
                    const res = await fetch(
                      `http://localhost:4000/v1/courses/${course._id}/register`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${getToken()}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ price: course.price }),
                      }
                    );

                    if (res.ok) {
                      showSwal(
                        "با موفقیت در دوره ثبت نام شدید",
                        "success",
                        "هورررراااا",
                        () => {
                          location.reload();
                        }
                      );
                    }
                  }
                }
              );
            }
          }
        );
      }
      })
    }
    //Course-Price
    Price.innerHTML = course.price ? convertEnNumberToPersian(course.price)+"تومان" : "رایگان " 
    //Course-Creator
    Creator.innerHTML = course.creator.name
    //Course-Cover
    Cover.innerHTML = `  <img class="w-full h-full rounded-md" src="http://localhost:4000/courses/covers/${course.cover}" >`
    //Course-Status
    Status.innerHTML = course.isComplete ? "به اتمام رسیده است" : "درحال برگزاری است"
        //Course-Opinion
       Opinion.innerHTML =convertEnNumberToPersian( course.comments.length)
        //Course-intro-title
        IntroTitle.innerHTML=course.name
         //Course-intro-desc
         IntroDesc.innerHTML=course.name
            //Course-session
       SessionsCount.innerHTML =convertEnNumberToPersian( course.sessions.length)
         //Course-support
         Support.innerHTML=course.support
          //Course-location
    Location.innerHTML ="دوره ها> " + course.categoryID.title+">"+course.name
              //Course-sessionWrapper
     
             let index = 1;
if(course.sessions.length){
    course.sessions.forEach(element => {
                
        sessionsWrapper.insertAdjacentHTML("beforeend",`
        <li class="flex items-center justify-between px-4 font-ybakhbold border-b-2 text-slate-400 bg-gray-2 border-gray-3 h-11 pr-2 hover:bg-gray-1 ">
            <div class="flex gap-1 items-center">
                <span class="border-2 border-slate-500 rounded-full h-7 w-7 flex justify-center items-center">${index}</span>
                <a href="episode.html?name=${course.shortName}&id=${element._id}"> ${element.title}</a>
            </div>
            <!--time-->
            <span> ${element.time}</span>
        </li>
    `)
   

    

     index++; 
 });
}
    else{
    
                
            sessionsWrapper.insertAdjacentHTML("beforeend",`
            <li class="flex items-center justify-between px-4 text-slate-400 font-ybakhbold border-b-2 border-gray-2 h-11 pr-2 hover:bg-slate-800 ">
                <div class="flex gap-1 items-center">
                    <span class=" gap-2 flex justify-center items-center"> هنوز جلسه ای بارگذاری نشده است <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 animate-bounce ">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
                  </svg>
                    </span>
                
                </div>
                <!--time-->

            </li>
        `)
         index++; 
    
    }    
   //comments
   if(course.comments.length){
   course.comments.forEach(element => {
                
    CommentsWrapper.insertAdjacentHTML("beforeend",`
    
    <div class="flex items-center  gap-1">
    <!-- photo -->
    <div class=" flex flex-col justify-center gap-1">
      <div class="flex items-center gap-2 ">
        <div class="bg-slate-500 rounded-full h-10 w-10 flex justify-center items-center ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-9 h-9">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

        </div>
        <!-- name -->
        <div class="flex flex-col text-xs">
          <a href="" class="">${element.creator.username}</a>
          <span class="font-ybakhfat">${element.createdAt.slice(0,10)}</span>
        </div>
      </div>
      <span
      ${element.creator.role="ADMIN"?` class="bg-yellow-300 text-[10px] h-4 w-10 flex justify-center items-center  rounded-sm text-yellow-700">مدرس</span>`:`   class="bg-orange-300  text-[10px] h-4 w-10 flex justify-center items-center  rounded-sm text-orange-1">دانشجو</span>`}
     
    </div>



  </div>
  <p class="w-full break-words text-xs">  ${element.body}</p>
  ${element.answerContent?`  
  <!--answer to comment-->
  <div
    class="mt-2 bg-gray-1 flex flex-col gap-3 font-ybakhbold text-xs lg:text-base text-slate-300 rounded-lg p-2 mr-6">
    <div class="flex  gap-2 ">
      <!-- photo -->
      <div class="flex items-center  gap-1">
        <!-- photo -->
        <div class=" flex flex-col justify-center gap-1">
          <div class="flex items-center gap-2 ">
            <div class="bg-slate-500 rounded-full h-10 w-10 flex justify-center items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-9 h-9">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

            </div>
            <!-- name -->
            <div class="flex flex-col text-xs">
              <a href="" class="">${element.answerContent.creator.username}</a>
              <span class="font-ybakhfat">${element.answerContent.createdAt.slice(0,10)}</span>
            </div>
          </div>
          <span
          ${element.answerContent.creator.role="ADMIN"?` class="bg-yellow-300 text-[10px] h-4 w-10 flex justify-center items-center  rounded-sm text-yellow-700">مدرس</span>`:`   class="bg-orange-300  text-[10px] h-4 w-10 flex justify-center items-center  rounded-sm text-orange-1">دانشجو</span>`}
        </div>



      </div>
      
    </div>
    <p class="w-full break-words text-xs">${element.answerContent.body}</p>
  </div>`:""}


`)
 index++; 
}
);}
else{
CommentsWrapper.insertAdjacentHTML("beforeend",
`               <span>هنوز کامنتی ثبت نشده است! <span class="text-yellow-400">اولین نفری باش که نظر میده(:</span></span>`)
}
    return course;
   
};


const getRelatedCourses=async(courseRelatedLocation)=>{
    const CourseRelatedWrapper = document.querySelector("#CourseRelatedWrapper")
    const Related = await fetch(
        `http://localhost:4000/v1/courses/related/${courseRelatedLocation.shortName}`);
    const RelatedCourses = await Related.json(); 

 
 RelatedCourses.forEach(element => {
                
    CourseRelatedWrapper.insertAdjacentHTML("beforeend",`
    <li  ><a class="flex items-center gap-2 text-sm text-slate-300 hover:text-orange-1 " href="course.html?name=${element.shortName}"><img class="w-14 h-10 rounded-md"  src="http://localhost:4000/courses/covers/${element.cover}" alt=""><span class="">  ${element.name}</span></a></li>
`)





});
    return RelatedCourses
}

let score = 5;
const setScore=()=> {
  const stars = document.querySelectorAll(".star");
  

  stars.forEach(star => {
    star.addEventListener("click", (event) => {
      score = event.target.dataset.key;
      for (let count = 0; count < stars.length; count++) {
        if (stars[count].getAttribute("data-key") <= score) {
          stars[count].classList.add("text-yellow-400");
        } else {
          stars[count].classList.remove("text-yellow-400");
        }
      }
     
    });
   
  });


}


const submitComment=async()=> {
  const commentTextareaElem = document.querySelector("#comment-textarea");
  const courseShortName = getUrlParam("name");

  
  
  const newCommentInfos = {
    body: commentTextareaElem.value.trim(),
    courseShortName,
    score, 
  };

  const res = await fetch(`http://localhost:4000/v1/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCommentInfos),
  });

  console.log(res);

  if (res.ok) {
    showSwal(
      "کامنت مورد نظر شما با موفقیت ثبت شد",
      "success",
      "خیلی هم عالی",
      () => {}
    );
  }
  else{
    showSwal(
      "چیزی ننوشتی!",
      "error",
      "حالا مینویسم",
      () => {}
    );
  }
}




export { getAndShowCoursesDetail,getRelatedCourses,submitComment,setScore }