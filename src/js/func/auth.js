import { showSwal ,saveIntoLocalStorage , getToken} from "./utils.js";

const register = () => {
  const nameInput = document.querySelector("#name");
  const usernameInput = document.querySelector("#username");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const passwordInput = document.querySelector("#password-signup");
  const confirmpassword = document.querySelector("#confirmpassword");

  const newUserInfos = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: confirmpassword.value.trim(),
  };
  fetch(`http://localhost:4000/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfos),
  }).then(res => {
    console.log(res);
    if (res.status === 201) {
      showSwal(
        "ثبت نام با موفقیت انجام شد",
        "success",
        "ورود به پنل",
        result => {
          location.href = "index.html";
        }
      );
    }

    else if (res.status === 409) {
      showSwal(
        "نام کاربری یا ایمیل قبلا استفاده شده",
        "error",
        "تصحیح اطلاعات",
        () => { }
      );
    }
    else if (res.status === 400) {
      showSwal(
        "رمز عبور باید حداقل 8 کارکتر باشد",
        "error",
        "تصحیح اطلاعات",
        () => { }
      );
    }
    return res.json();

  }).then(result => {
    console.log(result);
    saveIntoLocalStorage("user", { token: result.accessToken });
  })

}

const login = () => {
  const identifierInput = document.querySelector("#identifier");
  const passwordInput = document.querySelector("#password-login");

  const userInfos = {
    identifier: identifierInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  fetch(`http://localhost:4000/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfos),
  })
    .then((res) => {
      if (res.status === 200) {
       
        showSwal(
          "  ورود موفقیت امیز بود",
          "success",
          "ورود به پنل",
          result => {
            location.href = "index.html";
         
          }

        );
       
      }
      console.log(res);

      return res.json();
    })
    .then((result) => {
      if (result.message === 'password is not correct') {
        showSwal("رمز نادرست است", "error", "  ویرایش اطلاعات", () => { });
      }
      else if (result === 'there is no user with this email or username') {
        showSwal("کاربری یافت نشد", "error", "  ویرایش اطلاعات", () => { });
      }
      saveIntoLocalStorage("user", { token: result.accessToken });
      console.log(result);
  

    });
}
const getMe = async () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  const res = await fetch(`http://localhost:4000/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  return data;
};
export { register, login ,getMe }