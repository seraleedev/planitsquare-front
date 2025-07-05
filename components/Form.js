import { createDataId, saveNewTodo } from "../util/index.js";

export default function Form($container, props) {
  this.setup = () => {
    this.state = {
      ...props,
    };
  };

  this.template = () => {
    return `
      <input id="addText" type="text" placeholder="할일 추가하기"/>
      <button id="submitBtn">추가</button>
      `;
  };

  this.render = function () {
    $container.innerHTML = this.template();
    this.event();
  };

  this.event = () => {
    const submitBtn = document.querySelector("#submitBtn");
    submitBtn.addEventListener("click", (event) => submitNewData(event));
  };

  // 할일 추가 핸들러
  const submitNewData = (event) => {
    const addText = document.querySelector("#addText");
    if (addText.value == "") return event.preventDefault();

    const newData = {
      id: createDataId(),
      name: addText.value,
      isCompleted: false,
    };

    saveNewTodo(newData, this.state.todoList);
    addText.value = "";
  };

  this.setup();
  this.render();
}
