import { editData, saveList } from "../util/index.js";

export default function TodoList(props) {
  const { $container, todoList, setParentState } = props;
  this.setup = () => {
    this.state = {
      todoList,
    };
  };

  this.template = () => {
    return this.state.todoList
      .map(
        (data) => `<li>
      <input type="checkbox" ${
        data.isCompleted ? "checked" : ""
      } class="checkbox" data-id="${data.id}" name="${data.id}-check"/>
      <input type="text" value="${data.name}" ${
          data.isCompleted ? "disabled readonly" : ""
        } name="${data.id}-text"/>
      <button ${data.isCompleted ? "disabled" : ""} class="edit-btn" data-id="${
          data.id
        }">수정</button>
      <button class="delete-btn" data-id="${data.id}">X</button>
    </li>
    `
      )
      .join("");
  };

  this.render = function () {
    $container.innerHTML = this.template();
    this.addEvent();
  };

  this.addEvent = () => {
    const Checkboxes = document.querySelectorAll(".checkbox");
    const EditBtn = document.querySelectorAll(".edit-btn");
    const DeleteBtn = document.querySelectorAll(".delete-btn");

    Checkboxes.forEach((ele) =>
      ele.addEventListener("change", (event) => checkTodo(event.target))
    );
    EditBtn.forEach((ele) =>
      ele.addEventListener("click", (event) => editTodo(event.target))
    );
    DeleteBtn.forEach((ele) =>
      ele.addEventListener("click", (event) => deleteTodo(event.target))
    );
  };

  this.setState = ({ newState }) => {
    this.state = { ...this.state, ...newState };
    setParentState();
  };

  // 체크박스 클릭 핸들러
  const checkTodo = (target) => {
    const dataId = target.getAttribute("data-id");
    const targetInput = target.nextElementSibling;
    const targetEditBtn = target.nextElementSibling.nextElementSibling;

    if (target.checked) {
      targetInput.disabled = true;
      targetInput.readOnly = true;
      targetEditBtn.disabled = true;
    } else {
      targetInput.disabled = false;
      targetInput.readOnly = false;
      targetEditBtn.disabled = false;
    }

    const newList = editData(
      dataId,
      "isCompleted",
      target.checked,
      this.state.todoList
    );

    saveList(newList);
    this.setState({ todoList: newList });
  };

  // 수정 버튼 클릭 핸들러
  const editTodo = (target) => {
    const dataId = target.getAttribute("data-id");
    const editValue = target.previousElementSibling.value;
    if (editValue == "") return;
    const newList = editData(dataId, "name", editValue, this.state.todoList);
    saveList(newList);
  };

  // 삭제 버튼 클릭 핸들러
  const deleteTodo = (target) => {
    const dataId = target.getAttribute("data-id");
    const filterList = this.state.todoList.filter((item) => item.id !== dataId);

    saveList(filterList);
    target.parentElement.remove();
    this.setState({ todoList: filterList, totalTodo: filterList.length });
  };

  this.setup();
  this.render();
}
