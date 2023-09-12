import { login } from "../js/func/auth.js";
import { getAndShowNavbarMenusDekstop,getAndShowNavbarMenusMobile } from "./func/shared.js";
const loginBtn = document.querySelector("#login-btn");



loginBtn.addEventListener("click", (event) => {
   
  event.preventDefault();
 login()

});
