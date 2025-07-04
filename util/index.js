export let todoListArray = [];
export let completedTodo = todoListArray.filter((todo) => todo.isCompleted);
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
    id: addText.value + Math.floor(Math.random() * 100).toString(),
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

export const editTodo = (target, id) => {
  const newValue = target.previousSibling.value;
  const targetItem = todoListArray.find((item) => item.id == id);
  const targetIndex = todoListArray.indexOf(targetItem);
  const editData = {
    ...targetItem,
    name: newValue,
  };
  todoListArray[targetIndex] = editData;
  localStorage.setItem(TODOLIST, JSON.stringify(todoListArray));
};

export const renderItem = (data) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = data.name;
  input.readOnly = data.isCompleted;

  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  editBtn.textContent = "수정";
  deleteBtn.textContent = "X";
  editBtn.addEventListener("click", (event) => editTodo(event.target, data.id));
  deleteBtn.addEventListener("click", () => deleteTodo(data.id));
  li.appendChild(input);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  li.id = todoListArray.length + 1;
  ul.appendChild(li);
};
