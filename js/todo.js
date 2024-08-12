const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  // JSON.stringify는 자바스크립트 object를 string으로 바꿔줌(array, object 모두 가능)
  // todos를 localStorage에 저장
  // localStorage는 string만 저장 가능
}

function deleteToDo(event) {
  const li = event.target.parentElement; // target = button, parentElement = li
  li.remove(); // li를 삭제
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // toDos 배열에서 li.id와 같지 않은 것만 남김
  saveToDos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text; // span에 newTodo를 넣음
  const button = document.createElement("button");
  button.innerText = "✕";
  button.addEventListener("click", deleteToDo);
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.addEventListener("click", doneToDo);

  // appendChild는 마지막에 추가
  li.appendChild(span); // li 안에 span을 넣음
  li.appendChild(button); // li 안에 button을 넣음
  toDoList.appendChild(li); // toDoList에 li를 넣음
  li.prepend(checkBox);

  li.addEventListener("dblclick", editToDo);
}
function editToDo(event, newTodo) {
  console.log("edit to do ... soon !");
}

function doneToDo(event) {
  const checkBox = event.target;
  if (checkBox.checked) {
    const todoContent = checkBox.parentElement.querySelector("span");
    todoContent.style.textDecoration = "line-through";
  } else if (checkBox.checked === false) {
    const todoContent = checkBox.parentElement.querySelector("span");
    todoContent.style.textDecoration = "none";
  }
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value; // input.value를 새로운 변수에 복사
  toDoInput.value = ""; // todo input을 비워줌
  const newTodoObj = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newTodoObj); // toDos 배열에 newToDo를 추가 []
  paintTodo(newTodoObj); // 새로운 변수를 paintTodo 함수에 전달
  saveToDos();
}
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos); // string을 object로 바꿔줌
  toDos = parsedToDos; // 예전에 저장된 todos를 불러옴
  parsedToDos.forEach(paintTodo); // forEach는 배열의 각 요소에 대해 함수를 실행
}
