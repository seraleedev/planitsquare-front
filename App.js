import Form from "./components/Form.js";
import Head from "./components/Head.js";
import TodoList from "./components/TodoList.js";

function App($container) {
  this.setup = () => {
    this.state = {
      todoList: [],
    };
  };

  this.template = () => {
    return `<Header id="header"></Header>
    <form id="addForm"></form>
    <ul id="todoList"></ul>`;
  };

  this.mounted = () => {
    this.render();

    const $header = document.querySelector("#header");
    const $form = document.querySelector("#addForm");
    const $todoList = document.querySelector("#todoList");

    new Head($header, this.state);
    new Form($form, this.state);
    new TodoList($todoList, this.state);
  };

  this.render = () => {
    $container.innerHTML = this.template();
  };

  this.setup();
  this.mounted();
}

export default App;
