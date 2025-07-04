import { loadTodo, checkTodo } from "../util/index.js";

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

  this.setState = (newList) => {
    this.state = { ...this.state, todoList: newList };
    this.render();
  };
  this.setEvent = () => {
    this.setState(loadTodo(this.state.todoList));
  };

  this.setEvent();
}
