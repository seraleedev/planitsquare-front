import { loadTodo, checkTodo, renderItem } from "../util/index.js";

export default function TodoList($container, props) {
  this.setup = () => {
    this.state = {
      ...props,
    };
  };
  this.setup();
  this.template = () => {
    return this.state.todoList
      .map(
        (data) => `<li>
      <input type="checkbox" ${
        data.isCompleted ? "checked" : ""
      } class="checkbox">
      <input type="text" value="${data.name}" ${
          data.isCompleted ? "disabled" : ""
        }>
      <button ${
        data.isCompleted ? "disabled" : ""
      } class="editBtn">수정</button>
      <button>X</button>
    </li>
    `
      )
      .join("");
  };

  this.render = function () {
    $container.innerHTML = this.template();
  };

  this.render();

  const Checkboxes = document.querySelectorAll(".checkbox");

  Checkboxes.forEach((ele) =>
    ele.addEventListener("change", (event) => checkTodo(event.target))
  );
}
