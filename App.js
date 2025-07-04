import TodoList from "./components/TodoList.js";
import { model } from "./model/model.js";
import { submitNewData, loadTodo, todoList, loadNodes } from "./util/index.js";
import Form from "./components/Form.js";

function App() {
  const submitBtn = document.querySelector("#submitBtn");
  // container
  this.$form = document.querySelector("#inputForm");
  this.$listContainer = document.querySelector("#todo-list");

  this.todoData = [];
  this.todoListEle = null;
  this.formEle = null;

  this.init = () => {
    // this.todoData = model;
    loadNodes();
    loadTodo();

    // this.todoData = todoList;
    // this.formEle = new Form(this.$form);
    // this.todoListEle = new TodoList(this.$listContainer, this.todoData);
    submitBtn.addEventListener("click", submitNewData);
  };

  this.setState = () => {};

  this.init();
}

export default App;
