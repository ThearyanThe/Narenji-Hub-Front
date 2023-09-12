import { getAndShowAllCourses,getAndShowPopularCourses,getAndShowPresellCourses,getAndShowArticle,getsearchInput } from './func/index.js'

window.addEventListener('load', () => {
   getsearchInput()
    getAndShowAllCourses()
    getAndShowPopularCourses()
    getAndShowPresellCourses()
    getAndShowArticle()

  
})
