import { convertEnNumberToPersian } from "../numberToPersian.js";

const showSwal = (title, icon, buttons, callback) => {
    swal({
      title,
      icon,
      buttons,
    }).then(result => callback(result));
  };
  const saveIntoLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
  };
  const getToken = () => {
    const userInfos = JSON.parse(localStorage.getItem("user"));
    return userInfos ? userInfos.token : null;
  };
  const isLogin = () => {
    const userInfos = localStorage.getItem("user");
    return userInfos ? true : false;
  };
  const getUrlParam = (key) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  };
  const insertAdjacentHTML=(wrapper,array)=>{
    array.map((course) => {
      wrapper.insertAdjacentHTML(
       "beforeend",
       `
       <div  class=" w-[47%] md:w-[31%] lg:w-[24%] bg-gray-3  rounded-xl overflow-hidden " id="courses-container" >
      <a href="course.html?name=${course.shortName}">
      <!--photo-->
      <div class="img relative">
      <img src="../../../Narenji-Hub-Backend/public/courses/covers/${course.cover}">
      ${course.discount?` <div class="bg-orange-1 h-4 w-10  lg:h-8 lg:w-14 text-[10px] lg:text-base  rounded-sm flex justify-center items-center  absolute top-2 right-2  font-ybakhbold text-white"> <span>%</span>  ${convertEnNumberToPersian(course.discount)}  </div>`:""}
     
    </div>
    <div class="">
      <div class="mx-1 ">
        <!--title-->
        <div class="px-1 md:px-2 py-1">
          <h1 class="font-ybakhfat text-right text-[10px] md:text-base text-white">  ${course.name}</h1>
        </div>
        
        <!--rate-and-teacher-->
      <div class="flex items-center justify-between px-1 py-1 md:px-2 flex-row-reverse ">
        <!--rate-->
        <div class="flex text-amber-400 text-sm">
          ${Array(5 - course.courseAverageScore)
        .fill(0)
        .map(
         (score) =>
          '<img src="../../media/img/star.svg" alt="" class="w-[14px] h-[14px] lg:w-auto lg:h-auto">'
        )
        .join("")}
          ${Array(course.courseAverageScore)
        .fill(0)
        .map(
         (score) =>
    
          '<img src="../../media/img/star_fill.svg" alt="" class="w-[14px] h-[14px] lg:w-auto lg:h-auto">'
        )
        .join("")}
       
                    
          </div>
<!--teacher-->
    <div class="flex items-center gap-1 font-ybakhbold text-white text-[10px]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" text-slate-300 w-4 h-4 md:w-5 md:h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
      
      <span class="text-white "> ${course.creator}</span>
    </div>
      </div>
      <!--price and student-->
      <div  class=" flex items-center justify-between  flex-row-reverse px-1 md:px-2 pt-2">
        <!--price-->
        <div class="flex gap-2 ">
        ${course.price!=0 && course.discount?` <del class="text-orange-1">
        <div>
             <span   class=" font-ybakhbold text-[10px] md:text-base text-white">${course.price === 0 ? "رایگان" :convertEnNumberToPersian(course.price)}</span>
             <span   class=" font-ybakhbold text-[10px] md:text-base text-slate-400 ">${course.price === 0 ? "" :"تومان"}</span>
       </div>
       </del>`:`
       <div>
            <span   class=" font-ybakhbold text-[10px] md:text-base text-white">${course.price === 0 ? "رایگان" :convertEnNumberToPersian(course.price)}</span>
            <span   class=" font-ybakhbold text-[10px] md:text-base text-slate-400 ">${course.price === 0 ? "" :"تومان"}</span>
      </div>
        `}
       
      <!--discount-->
      ${course.price!=0&&course.discount?`   <div class=" animate-pulse ">
      <span   class=" font-ybakhbold text-[10px] md:text-base text-white "> ${convertEnNumberToPersian((course.price)-((course.discount/100)*course.price))}</span>
      <span   class=" font-ybakhbold text-[10px] md:text-base text-slate-400 ">تومان</span>
      </div>`:""}
   
</div>
<!--student-->
<div class="text-[10px] flex gap-1 items-center text-white ">
 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 md:w-5 md:h-5 mb-[0.5px]">
    <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
  </svg>
  
  
  <span class="font-ybakhbold text-[10px] md:text-base ">${convertEnNumberToPersian(course.registers) }</span>
</div>
      </div>
      <!--visit-info-->
      <div class=" flex justify-center h-12 md:h-16 border-t-2 border-orange-1 text-[10px] md:text-base text-orange-1">
        <a class="flex gap-2 items-center font-ybakhfat" href=""> 
          مشاهده اطلاعات دوره 
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
  };
  const SearchInArray=(array,searchproperty,searchvalue)=>{
let output=array.filter(item=>item[searchproperty].includes(searchvalue))
return output
  };
  const addParamToUrl = (param, value) => {

    let url = new URL(location.href)
    let searchParams = url.searchParams
  
    searchParams.set(param, value)
    url.search = searchParams.toString()
    location.href = url.toString()
   
  }
  const paginateItems = (array, itemsPerPage, paginateParentElem, currentPage) => {
    let endIndex = itemsPerPage * currentPage
    let startIndex = endIndex - itemsPerPage
    let paginatedItems = array.slice(startIndex, endIndex)
    let paginatedCount = Math.ceil(array.length / itemsPerPage)
  
    for(let i = 1 ; i < paginatedCount + 1 ; i++) {
      paginateParentElem.insertAdjacentHTML('beforeend', `
      ${Number(currentPage) ==i?`
      <li class=" rounded-md cursor-pointer  bg-gray-2 text-orange-1">
      
      <a class="h-9 w-9 flex justify-center items-center" onclick="addParamToUrl('page',${i})">${convertEnNumberToPersian(i)}</a>
      </li>
      
      `:`
      <li class="h-9 w-9 rounded-md flex justify-center cursor-pointer items-center bg-orange-1 hover:bg-gray-2 hover:text-orange-1">
      
      <a class="h-9 w-9 flex justify-center items-center" onclick="addParamToUrl('page',${i})">${convertEnNumberToPersian(i)}</a>
      </li>
      `}
     
      `)
    }
    return paginatedItems
  }
  export{showSwal , saveIntoLocalStorage , getToken , isLogin,getUrlParam , insertAdjacentHTML,SearchInArray,paginateItems,addParamToUrl}



 