const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const HIDDEN_CLASSNAME = "hidden"; // string만 포함된 변수는 대문자로 쓰는게 관습;
const USERNAME_KEY = "username"; // string을 반복적으로 사용할 경우 변수로 선언하는게 좋음;
const saveUserName = localStorage.getItem(USERNAME_KEY);

function preventReload(event) {
  if (saveUserName !== null) {
    loginForm.classList.add(HIDDEN_CLASSNAME);
  }
}
preventReload();

function onLoginSubmit(event) {
  event.preventDefault();
  console.log("Form submitted"); // 이벤트가 정상적으로 호출되는지 확인
  console.log(loginInput.value); // 입력 값이 제대로 전달되는지 확인
  loginForm.classList.add(HIDDEN_CLASSNAME);
  console.log(loginForm.classList); // hidden 클래스가 제대로 추가되었는지 확인
  const userName = loginInput.value;
  localStorage.setItem(USERNAME_KEY, userName); // 로컬에 저장
  paintGreetings(userName);
}

function paintGreetings(userName) {
  const date = new Date(); // 현재 날짜와 시간을 가져옴
  const hours = date.getHours(); // 현재 시간을 가져옴

  if (hours >= 0 && hours < 5) {
    greeting.innerText = `Bonne nuit, ${userName} !`;
  } else if (hours >= 5 && hours < 19) {
    greeting.innerText = `Bonjour, ${userName} !`;
  } else if (hours >= 19 && hours < 24) {
    greeting.innerText = `Bonsoir, ${userName} !`;
  }
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

if (saveUserName === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(saveUserName); // 유저정보 로컬 스토리지에서 옴
}
