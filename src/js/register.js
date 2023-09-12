import { register} from "../js/func/auth.js";
import { getAndShowNavbarMenusDekstop,getAndShowNavbarMenusMobile,showUserNameInNavbar } from "./func/shared.js";
const registerBtn = document.querySelector("#register-btn");



registerBtn.addEventListener("click", (event) => {
    console.log('Register.js');
  event.preventDefault();
  register();
});


window.addEventListener('load', () => {
  showUserNameInNavbar()
  getAndShowNavbarMenusMobile() 
  getAndShowNavbarMenusDekstop()

})