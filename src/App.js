import Form from "./components/Form.js";
import Head from "./components/Head.js";
import TodoList from "./components/TodoList.js";
import { loadTodo } from "./util/util.js";

function App({ $container }) {
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

  this.render = () => {
    $container.innerHTML = this.template();
    const $header = document.querySelector("#header");
    const $form = document.querySelector("#addForm");
    const $todoList = document.querySelector("#todoList");

    new Head({
      $container: $header,
      todoList: this.state.todoList,
      setParentState: this.setState,
    });
    new Form({
      $container: $form,
      todoList: this.state.todoList,
      setParentState: this.setState,
    });
    new TodoList({
      $container: $todoList,
      todoList: this.state.todoList,
      setParentState: this.setState,
    });
  };

  this.setState = () => {
    this.state = { ...this.state, todoList: loadTodo(this.state.todoList) };
    this.render();
  };

  this.setup();
  this.setState();
}

export default App;
