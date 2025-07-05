import { saveList } from "../util/index.js";

export default function Head($container, props) {
  this.setup = () => {
    this.state = {
      ...props,
      completeTodo: props.todoList.filter((todo) => todo.isCompleted).length,
      totalTodo: props.todoList.length,
    };
  };

  this.template = () => {
    const { completeTodo, totalTodo } = this.state;
    return `<h1>Todo-list</h1>
      <div><button id="allCheck">전체 완료</button><button id="allDelete">전체 삭제</button></div>
      <div class="count-container"><span>전체: ${totalTodo}</span> <span>완료: ${completeTodo}</span></div>`;
  };

  this.render = function () {
    $container.innerHTML = this.template();
    this.addEvent();
  };

  this.addEvent = () => {
    const AllCheck = document.querySelector("#allCheck");
    const AllDelete = document.querySelector("#allDelete");

    AllCheck.addEventListener("click", () => checkAll());
    AllDelete.addEventListener("click", () => deleteAll());
  };

  this.setState = ({ newState }) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  // 전체 할일 완료하기
  const checkAll = () => {
    const newList = this.state.todoList.map((todo) => ({
      ...todo,
      isCompleted: true,
    }));

    saveList(newList);
    this.setState({
      todoList: newList,
      completeTodo: newList.length,
    });
  };

  // 전체 할일 삭제하기
  const deleteAll = () => {
    saveList([]);
    this.setState({
      todoList: [],
      completeTodo: 0,
      totalTodo: 0,
    });
  };

  this.setup();
  this.render();
}
