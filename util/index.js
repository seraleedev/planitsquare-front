export let todoListArray = [];

const Ul = document.querySelector("#todo-list");
const CountContainer = document.querySelector("#count-container");
const TODOLIST = "toDoList";

// 로컬스토리지 데이터 로드 함수
export const loadTodo = () => {
  const savedData = localStorage.getItem(TODOLIST);

  if (savedData != null) {
    const localTodoList = JSON.parse(savedData);
    todoListArray = localTodoList;
    todoListArray.forEach((item) => renderItem(item));
  }
  renderTodoCount();
};

// 데이터 추가시 로컬스토리지 저장 함수
const saveNewTodo = (data) => {
  todoListArray.push(data);
  localStorage.setItem(TODOLIST, JSON.stringify(todoListArray));
};

// 수정 데이터 저장함수
const saveEditList = (id, key, value) => {
  const targetItem = todoListArray.find((item) => item.id == id);
  const editData = {
    ...targetItem,
    [key]: value,
  };
  const targetIndex = todoListArray.indexOf(targetItem);
  todoListArray[targetIndex] = editData;
  localStorage.setItem(TODOLIST, JSON.stringify(todoListArray));
  renderTodoCount();
};

// 할일 추가 핸들러
export const submitNewData = (event) => {
  event.preventDefault();
  const addText = document.querySelector("#addText");
  const newData = {
    id: addText.value + Math.floor(Math.random() * 100).toString(),
    name: addText.value,
    isCompleted: false,
  };
  renderItem(newData);
  saveNewTodo(newData);
  addText.value = "";
  renderTodoCount();
};

// 삭제 버튼 클릭 핸들러
export const deleteTodo = (id) => {
  todoListArray = todoListArray.filter((item) => item.id !== id);
  localStorage.setItem(TODOLIST, JSON.stringify(todoListArray));
  Ul.innerHTML = "";
  todoListArray.forEach((item) => renderItem(item));
  renderTodoCount();
};

// 수정 버튼 클릭 핸들러
export const editTodo = (target, id) => {
  const newValue = target.previousSibling.value;
  saveEditList(id, "name", newValue);
};

// 체크박스 클릭 핸들러
const checkTodo = (target, id) => {
  const targetInput = target.nextSibling;
  const targetEditBtn = targetInput.nextSibling;

  if (target.checked) {
    targetInput.disabled = true;
    targetInput.readOnly = true;
    targetEditBtn.disabled = true;
  } else {
    targetInput.disabled = false;
    targetInput.readOnly = false;
    targetEditBtn.disabled = false;
  }

  saveEditList(id, "isCompleted", target.checked);
};

// 리스트 노드 생성
export const renderItem = (data) => {
  const Li = document.createElement("li");
  const Checkbox = document.createElement("input");
  Checkbox.type = "checkbox";
  Checkbox.checked = data.isCompleted;
  Checkbox.addEventListener("change", (event) =>
    checkTodo(event.target, data.id)
  );

  const Input = document.createElement("input");
  Input.type = "text";
  Input.value = data.name;
  Input.readOnly = data.isCompleted;
  Input.disabled = data.isCompleted;

  const EditBtn = document.createElement("button");
  EditBtn.textContent = "수정";
  EditBtn.addEventListener("click", (event) => editTodo(event.target, data.id));

  const DeleteBtn = document.createElement("button");
  DeleteBtn.textContent = "X";
  DeleteBtn.addEventListener("click", () => deleteTodo(data.id));

  Li.appendChild(Checkbox);
  Li.appendChild(Input);
  Li.appendChild(EditBtn);
  Li.appendChild(DeleteBtn);
  Ul.appendChild(Li);
};

// 카운트 노드 생성
export const renderTodoCount = () => {
  const completedTodo = todoListArray.filter((todo) => todo.isCompleted);
  CountContainer.innerHTML = `<p>전체: ${todoListArray.length}</p><p>완료: ${completedTodo.length}</p>`;
};
