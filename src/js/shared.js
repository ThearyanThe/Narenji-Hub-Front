import {getAndShowNavbarMenusMobile,getAndShowNavbarMenusDekstop, showUserNameInNavbar} from './func/shared.js'

window.addEventListener('load', () => {
    showUserNameInNavbar()
    getAndShowNavbarMenusMobile() 
    getAndShowNavbarMenusDekstop()
 
  
})
