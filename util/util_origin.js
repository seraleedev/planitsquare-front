let todoList = [];

const Ul = document.querySelector("#todo-list");
const CountContainer = document.querySelector("#count-container");
const AllBtnContainer = document.querySelector("#allBtn");
const TODOLIST = "toDoList";

// 로컬스토리지 데이터 로드 함수
export const loadTodo = (todoList) => {
  const savedData = localStorage.getItem(TODOLIST);

  if (savedData != null) {
    const savedTodoList = JSON.parse(savedData);
    todoList = savedTodoList;
    todoList.forEach((item) => renderItem(item));
  }

  renderTodoCount();
  renderAllBtn();
};

// 데이터 추가시 로컬스토리지 저장 함수
const saveNewTodo = (data) => {
  todoList.push(data);
  localStorage.setItem(TODOLIST, JSON.stringify(todoList));
};

// 수정 데이터 저장함수
const saveEditList = (id, key, value) => {
  const targetItem = todoList.find((item) => item.id == id);
  const editData = {
    ...targetItem,
    [key]: value,
  };
  const targetIndex = todoList.indexOf(targetItem);
  todoList[targetIndex] = editData;
  localStorage.setItem(TODOLIST, JSON.stringify(todoList));
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
  todoList = todoList.filter((item) => item.id !== id);
  localStorage.setItem(TODOLIST, JSON.stringify(todoList));
  Ul.innerHTML = "";
  todoList.forEach((item) => renderItem(item));
  renderTodoCount();
};

// 수정 버튼 클릭 핸들러
export const editTodo = (target, id) => {
  const newValue = target.previousSibling.value;
  saveEditList(id, "name", newValue);
};

// 체크박스 클릭 핸들러
export const checkTodo = (target, id) => {
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

  // saveEditList(id, "isCompleted", target.checked);
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
  EditBtn.disabled = data.isCompleted;
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
  const completedTodo = todoList.filter((todo) => todo.isCompleted);
  CountContainer.innerHTML = `<span>전체: ${todoList.length}</span> <span>완료: ${completedTodo.length}</span>`;
};

// 전체 할일 핸들링 노드 생성
const renderAllBtn = () => {
  const AllCheckBtn = document.createElement("button");
  AllCheckBtn.innerText = "전체 완료";
  AllCheckBtn.addEventListener("click", CheckAll);
  const AllDeleteBtn = document.createElement("button");
  AllDeleteBtn.innerText = "전체 삭제";
  AllDeleteBtn.addEventListener("click", DeleteAll);

  AllBtnContainer.appendChild(AllCheckBtn);
  AllBtnContainer.appendChild(AllDeleteBtn);
};

// 전체 할일 완료하기
const CheckAll = () => {
  todoList = todoList.map((todo) => ({ ...todo, isCompleted: true }));
  localStorage.setItem(TODOLIST, JSON.stringify(todoList));
  todoList.forEach((item) => renderItem(item));
  renderTodoCount();
};

// 전체 할일 삭제하기
const DeleteAll = () => {
  todoList = [];
  localStorage.setItem(TODOLIST, JSON.stringify(todoList));
  Ul.innerHTML = "";
  renderTodoCount();
};
