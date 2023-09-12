/*new-courses */
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints:{
       
           640:{
            slidesPerView: 3,
          },
          1000:{
            slidesPerView: 4,
          }
    }
  });
 
 



  