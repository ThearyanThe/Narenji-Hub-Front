
import { showSwal } from "./utils.js";
const contact = () => {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const TextInput = document.querySelector(".text-area");
    
  
    const newUserInfos = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      body:TextInput.value.trim()
    };
    fetch(`http://localhost:4000/v1/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    }).then(res => {
      console.log(res);
      if (res.status === 201) {
        showSwal(
          "پیام شما با موفقیت ارسال شد",
          "success",
          "ورود به پنل",
          result => {
            location.href = "index.html";
          }
        );
      }
  
      else {
        showSwal(
          "پیام شما ارسال نشد!ورودی نا معتبر است",
          "error",
          "تصحیح اطلاعات",
          () => { }
        );
      }
    
      return res.json();
  
    }).then(result => {
      console.log(result);
     
    })
  
  }
  export{contact}