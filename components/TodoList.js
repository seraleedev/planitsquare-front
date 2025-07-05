import { saveEditList, saveDeleteList } from "../util/index.js";

export default function TodoList($container, props) {
  this.setup = () => {
    this.state = {
      ...props,
    };
  };

  this.template = () => {
    return this.state.todoList
      .map(
        (data) => `<li>
      <input type="checkbox" ${
        data.isCompleted ? "checked" : ""
      } class="checkbox" data-id="${data.id}" name="${data.id}-check"/>
      <input type="text" value="${data.name}" ${
          data.isCompleted ? "disabled readonly" : ""
        } name="${data.id}-text"/>
      <button ${data.isCompleted ? "disabled" : ""} class="edit-btn" data-id="${
          data.id
        }">수정</button>
      <button class="delete-btn" data-id="${data.id}">X</button>
    </li>
    `
      )
      .join("");
  };

  this.render = function () {
    $container.innerHTML = this.template();
    this.event();
  };

  this.addEvent = () => {
    const Checkboxes = document.querySelectorAll(".checkbox");
    const EditBtn = document.querySelectorAll(".edit-btn");
    const DeleteBtn = document.querySelectorAll(".delete-btn");

    Checkboxes.forEach((ele) =>
      ele.addEventListener("change", (event) => checkTodo(event.target))
    );
    EditBtn.forEach((ele) =>
      ele.addEventListener("click", (event) => editTodo(event.target))
    );
    DeleteBtn.forEach((ele) =>
      ele.addEventListener("click", (event) => deleteTodo(event.target))
    );
  };

  // 체크박스 클릭 핸들러
  const checkTodo = (target) => {
    const dataId = target.getAttribute("data-id");
    const targetInput = target.nextElementSibling;
    const targetEditBtn = target.nextElementSibling.nextElementSibling;

    if (target.checked) {
      targetInput.disabled = true;
      targetInput.readOnly = true;
      targetEditBtn.disabled = true;
    } else {
      targetInput.disabled = false;
      targetInput.readOnly = false;
      targetEditBtn.disabled = false;
    }

    saveEditList(dataId, "isCompleted", target.checked, this.state.todoList);
  };

  // 수정 버튼 클릭 핸들러
  const editTodo = (target) => {
    const dataId = target.getAttribute("data-id");
    const editValue = target.previousElementSibling.value;
    if (editValue == "") return;
    saveEditList(dataId, "name", editValue, this.state.todoList);
  };

  // 삭제 버튼 클릭 핸들러
  const deleteTodo = (target) => {
    const dataId = target.getAttribute("data-id");
    saveDeleteList(dataId, this.state.todoList);
    target.parentElement.remove();
  };

  this.setup();
  this.render();
}
