
import { isLogin, } from "./utils.js";
import { getMe } from "./auth.js";
const getAndShowNavbarMenusMobile = async () => {
    const menusWrapper = document.querySelector(".menus-wrapper");
   
    const res = await fetch(`http://localhost:4000/v1/menus`);
    const menus = await res.json();
   
    menus.forEach((menu) => {
   
     menusWrapper.insertAdjacentHTML(
      "beforeend",
      `
           <li class="w-[100%] lg:w-[100px] relative" x-data="{sub${menu._id}:false}">
           <span class="flex justify-between">
             <a  href=category.html?cat=${menu.href.slice(15)}> ${menu.title} </a>
             ${menu.submenus.length == 0 ? `` : `
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="lg:hidden ml-1 w-6 h-6 cursor-pointer" x-on:click="sub${menu._id} = !sub${menu._id}" x-bind:class="sub${menu._id} ? 'rotate-180' : ''">
             <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
           </svg>
           `}
             
           </span>
       
           <!--sub-menue-->
           ${menu.submenus.length == 0 ? `` : ` <ul class="sub-menue w-full  lg:w-auto flex flex-col gap-3 lg:flex-col lg:gap-1 "
           x-show="sub${menu._id}"
           x-transition:enter="transition ease-out duration-300"
           x-transition:enter-start="opacity-0 transform scale-95"
           x-transition:enter-end="opacity-100 transform scale-100"
           x-transition:leave="transition ease-in duration-300"
           x-transition:leave-start="opacity-100 transform scale-100"
           x-transition:leave-end="opacity-0 transform scale-95">
         ${menu.submenus.map(subs =>
   
       ` <li class="w-[100%] lg:w-[100px] flex justify-between lg:block mr-4 text-slate-400"><a class="" href="#">${subs.title}  </a></li>`
      ).join("")}
          
          
         </ul>`}
          
         </li>
         `
     );
    });
   
    return menus;
   };
   const getAndShowNavbarMenusDekstop = async () => {
    const menusWrapper = document.querySelector(".menus-wrapper-dekstop");
   
    const res = await fetch(`http://localhost:4000/v1/menus`);
    const menus = await res.json();


    menus.forEach((menu) => {
   
     menusWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <li class="w-[100%] lg:w-auto " x-data="{ subMobile${menu._id}: false }" x-on:mouseover="index=true"  x-on:mouseout="index=false">
           <span class="flex gap-1 mr-[44px] text-base w-auto items-center cursor-pointer"x-on:mouseover="subMobile${menu._id} = true ,index=true"   x-on:mouseout="subMobile${menu._id}= false">
             <a class="" href=category.html?cat=${menu.href.slice(15)} >${menu.title} </a>
             ${menu.submenus.length == 0 ? `` : 
             `       
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
             <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
           </svg>
           
           `}
   
    
   
             <svg
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               class="lg:hidden ml-1 w-6 h-6 cursor-pointer" x-on:click="sub=!sub" x-bind:class="sub ? 'rotate-180':'' ">
               <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
             </svg>
           </span>
       
           <!--sub-menu-->
           ${menu.submenus.length == 0 ? "" : ` 
            <ul  class="submenue-continer lg:absolute  flex flex-col gap-3 w-[180px] bg-gray-2  p-2 rounded-tl-xl rounded-br-xl " x-show="subMobile${menu._id}"
           x-on:mouseenter="subMobile${menu._id}= true" x-on:mouseleave="subMobile${menu._id} = false"
           x-transition:enter="transition ease-out duration-300"
           x-transition:enter-start="opacity-0 transform scale-95"
           x-transition:enter-end="opacity-100 transform scale-100"
           x-transition:leave="transition ease-in duration-300"
           x-transition:leave-start="opacity-100 transform scale-100"
           x-transition:leave-end="opacity-0 transform scale-95"
         >
         ${menu.submenus.map(subs =>
   
       ` <li class="w-[100%]"><a class="hover:text-orange-1 hover:mr-3 duration-300 font-ybakhbold" href="">${subs.title}   </a></li>`
      ).join("")}
          
       
         </ul>
         `
      }
         
       
         </li> 
         `
     );
    });
   
    return menus;
   };
   const showUserNameInNavbar = () => {
    const navbarProfileBox = document.querySelector("#profile");
    const isUserLogin = isLogin();
   
    if (isUserLogin) {
     getMe().then((data) => {
      navbarProfileBox.setAttribute("href", "userPanel.html");
      navbarProfileBox.innerHTML =  ` <div class="flex justify-between items-center flex-row-reverse gap-1 "> <span class="main-header__profile-text">${data.name} </span>   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" /></svg> </div>  `
     });
    } else {
     navbarProfileBox.setAttribute("href", "login.html");
     navbarProfileBox.innerHTML =
     
      ' <div class="flex justify-between items-center flex-row-reverse gap-1"> <span class="main-header__profile-text">ثبت نام / ورود</span>   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" /></svg> </div>  '
     
    }
   };
   export{getAndShowNavbarMenusDekstop,getAndShowNavbarMenusMobile,showUserNameInNavbar}