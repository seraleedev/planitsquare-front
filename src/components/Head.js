import { saveList } from "../util/index.js";

export default function Head(props) {
  const { $container, todoList, setParentState } = props;
  this.setup = () => {
    this.state = {
      todoList,
      completeTodo: props.todoList.filter((todo) => todo.isCompleted).length,
      totalTodo: props.todoList.length,
    };
  };

  this.template = () => {
    const { completeTodo, totalTodo } = this.state;
    return `<h1>Todo List</h1>
       <div class="count-container">
          <p>전체</p>
          <div class="count-container-button">
            <span>${totalTodo}개</span>
            <button id="allDelete">전부삭제</button>
          </div>
       </div>
       <div class="count-container">
          <p>완료된 일</p>
          <div class="count-container-button">
          <span>${completeTodo}개</span>
          <button id="allCheck">전부완료</button>
          </div>
   
       </div>
      `;
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
    setParentState();
  };

  // 전체 할일 완료하기
  const checkAll = () => {
    const newList = this.state.todoList.map((todo) => ({
      ...todo,
      isCompleted: true,
    }));

    saveList(newList);
    this.setState({ todoList: newList, completeTodo: newList.length });
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
