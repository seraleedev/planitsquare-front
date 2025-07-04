export let todoListArray = [];
const ul = document.querySelector("#todo-list");
const TODOLIST = "toDoList";

export const loadTodo = () => {
  const savedData = localStorage.getItem(TODOLIST);

  if (savedData != null) {
    const localTodoList = JSON.parse(savedData);
    todoListArray = localTodoList;
    todoListArray.forEach((item) => renderItem(item));
  }
};

const saveTodo = (data) => {
  todoListArray.push(data);
  localStorage.setItem(TODOLIST, JSON.stringify(todoListArray));
};

export const submitData = (event) => {
  const addText = document.querySelector("#addText");
  event.preventDefault();
  const newData = {
    id: addText.value,
    name: addText.value,
    isCompleted: false,
  };
  renderItem(newData);
  saveTodo(newData);
  addText.value = "";
};

export const deleteTodo = (id) => {
  todoListArray = todoListArray.filter((item) => item.id !== id);
  localStorage.setItem(TODOLIST, JSON.stringify(todoListArray));
  ul.innerHTML = "";
  todoListArray.forEach((item) => renderItem(item));
};

export const renderItem = (data) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = data.name;
  input.readOnly = data.isCompleted;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => deleteTodo(data.id));
  li.appendChild(input);
  li.appendChild(deleteBtn);
  li.id = todoListArray.length + 1;
  ul.appendChild(li);
};
