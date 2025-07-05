import { loadTodo } from "./util/index.js";
import Form from "./components/Form.js";
import Head from "./components/Head.js";
import TodoList from "./components/TodoList.js";

function App($container) {
  // 글로벌 상태 세팅
  this.setup = () => {
    this.state = {
      todoList: [],
    };
  };

  // UI구성
  this.template = () => {
    return `<Header id="header"></Header>
    <form id="addForm"></form>
    <ul id="todoList"></ul>`;
  };

  // 마운트 시
  this.mounted = () => {
    this.setState();

    const $header = document.querySelector("#header");
    const $form = document.querySelector("#addForm");
    const $todoList = document.querySelector("#todoList");

    new Head($header, this.state);
    new Form($form, this.state);
    new TodoList($todoList, this.state);
  };

  // UI 렌더링
  this.render = () => {
    $container.innerHTML = this.template();
  };

  //컴포넌트 이벤트
  this.setEvent = () => {};

  // 상태 변경
  this.setState = () => {
    this.state = { ...this.state, todoList: loadTodo(this.state.todoList) };
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
