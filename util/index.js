export let todoListArray = [];
const TODOLIST = "toDoList";

export const loadTodo = () => {
  const savedData = localStorage.getItem(TODOLIST);

  if (savedData != null) {
    const myTodoList = JSON.parse(savedData);
    todoListArray = myTodoList;
    renderTodoItem(todoListArray);
  }
};

const saveTodo = (text) => {
  const obj = {
    id: todoListArray.length + 1,
    name: text,
    isCompleted: false,
  };
  todoListArray.push(obj);
  localStorage.setItem(TODOLIST, JSON.stringify(todoListArray));
};

export const submitData = (event) => {
  const addText = document.querySelector("#addText");
  event.preventDefault();
  const newTodo = addText.value;
  saveTodo(newTodo);
  renderTodoItem(todoListArray);
  addText.value = "";
};

export const renderTodoItem = (data) => {
  const listContainer = document.querySelector("#todo-list");
  const list = `<ul>${data
    .map(
      (todo) =>
        `<li>${
          todo.isCompleted
            ? `<p>${todo.name}</p>`
            : `<input type='text' value="${todo.name}"/>`
        } <button type="button" >X</button></li>`
    )
    .join("")}</ul>`;

  listContainer.innerHTML = list;
};
