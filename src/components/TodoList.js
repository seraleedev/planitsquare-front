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
        (data) => `
     <li class="list-item">
          <label for="${data.id}-check" class="list-item-name">
            <input type="checkbox" ${
              data.isCompleted ? "checked" : ""
            } class="checkbox" data-id="${data.id}" id="${data.id}-check"/>
            <p class="${data.isCompleted ? "list-done" : ""}">${data.name}</p>
          </label>
          <div class="list-item-btn">
            <button ${
              data.isCompleted ? "disabled" : ""
            } class="edit-btn" data-id="${data.id}">수정</button>
            <button class="delete-btn" data-id="${data.id}">삭제</button>
          </div>
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
    const targetEditBtn =
      target.parentElement.nextElementSibling.firstElementChild;

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
    const valueNodeParent = target.parentElement.previousElementSibling;
    const valueNode = valueNodeParent.lastElementChild;

    const dataId = target.getAttribute("data-id");
    if (valueNode.nodeName == "P") {
      const input = document.createElement("input");
      const targetValue = valueNode.textContent;
      target.textContent = "저장";
      input.type = "text";
      input.value = targetValue;
      input.placeholder = "할일을 입력합니다.";
      valueNodeParent.insertBefore(input, valueNode);
      valueNode.remove();
    }

    if (valueNode.nodeName == "INPUT") {
      const pTag = document.createElement("p");
      const targetValue = valueNode.value;
      if (targetValue == "") return;

      target.textContent = "수정";
      pTag.textContent = targetValue;
      valueNodeParent.insertBefore(pTag, valueNode);
      valueNode.remove();

      const newList = editData(
        dataId,
        "name",
        targetValue,
        this.state.todoList
      );
      saveList(newList);
    }
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
