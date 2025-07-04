import TodoList from "./components/TodoList_origin.js";
import { model } from "./model/model.js";
import { submitNewData, loadTodo } from "./util/index.js";
import Form from "./components/Form.js";
import Head from "./components/Head.js";

function App($container) {
  const submitBtn = document.querySelector("#submitBtn");

  // 글로벌 상태 세팅
  this.setup = () => {
    this.state = {
      todoList: [],
      completeTodo: 0,
      totalTodo: 0,
    };
  };

  // UI구성
  this.template = () => {
    return `<Header id="header"></Header>
    <form id="addForm"></form>
    <ul id="todo-list"></ul>`;
  };

  // 마운트 시
  this.mounted = () => {
    this.render();
    // loadTodo();
    const $header = document.querySelector("#header");
    const $form = document.querySelector("#addForm");
    const $todoList = document.querySelector("#todoList");

    new Head($header, this.state);
    new Form($form, this.state);
  };

  // UI 렌더링
  this.render = () => {
    $container.innerHTML = this.template();
  };

  //컴포넌트 내부 사용 이벤트
  this.setEvent = () => {};

  // 상태 변경 후 렌더링
  this.setState = (newState) => {
    this.state = { ...this.$state, ...newState };
    this.render();
  };

  //이벤트 등록
  this.addEvent = (eventType, selector, callBackFn) => {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closet(selector)) return false;
      callBackFn(event);
    });
  };

  // 초기 코드
  /*this.init = () => {
    this.todoData = todoList;
    this.todoListEle = new TodoList(this.$listContainer, this.todoData);
    submitBtn.addEventListener("click", submitNewData);
  };

   this.init();*/
  this.setup();
  this.mounted();
}

export default App;
