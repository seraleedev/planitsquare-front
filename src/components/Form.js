import { createDataId, saveList } from "../util/util.js";

export default function Form(props) {
  const { $container, todoList, setParentState } = props;
  this.setup = () => {
    this.state = {
      todoList,
    };
  };

  this.template = () => {
    return `
      <input id="addText" type="text" placeholder="여기에 할일을 작성합니다."/>
      <button id="submitBtn">추가</button>
      `;
  };

  this.render = function () {
    $container.innerHTML = this.template();
    this.addEvent();
  };

  this.addEvent = () => {
    const submitBtn = document.querySelector("#submitBtn");
    submitBtn.addEventListener("click", (event) => submitNewData(event));
  };

  // 할일 추가 핸들러
  const submitNewData = (event) => {
    const addText = document.querySelector("#addText");
    if (addText.value == "") return event.preventDefault();
    event.preventDefault();
    const newData = {
      id: createDataId(),
      name: addText.value,
      isCompleted: false,
    };
    this.state.todoList.push(newData);
    saveList(this.state.todoList);
    addText.value = "";
    setParentState();
  };

  this.setup();
  this.render();
}
