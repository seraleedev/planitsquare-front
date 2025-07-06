import { editData, saveList } from "../util/util.js";

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
       <div class="list-item-head">
          <input type="checkbox" class="checkbox" data-id="${data.id}" id="${
          data.id
        }-check"/>     
       
         <p class="list-item-name ${
           data.isCompleted ? "list-done" : ""
         }" data-id="${data.id}">${data.name}</p>
        </div>
          
        <div class="list-item-btn">  
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
    const ItemName = document.querySelectorAll(".list-item-name");
    const DeleteBtn = document.querySelectorAll(".delete-btn");

    Checkboxes.forEach((ele) =>
      ele.addEventListener("change", (event) => checkTodo(event.target))
    );
    ItemName.forEach((ele) =>
      ele.addEventListener("click", (event) => toggleDone(event.target))
    );
    DeleteBtn.forEach((ele) =>
      ele.addEventListener("click", (event) => deleteTodo(event.target))
    );
  };

  this.setState = ({ newState }) => {
    this.state = { ...this.state, ...newState };
    setParentState();
  };

  // 할일 클릭시 완료 핸들러
  const toggleDone = (target) => {
    const dataId = target.getAttribute("data-id");
    target.classList.toggle("list-done");

    const newList = editData(
      dataId,
      "isCompleted",
      target.classList.contains("list-done"),
      this.state.todoList
    );

    saveList(newList);
    this.setState({ todoList: newList });
  };

  // 체크박스 클릭 핸들러
  const checkTodo = (target) => {
    const targetParent = target.parentElement;
    const targetName = target.nextElementSibling;
    const originText = targetName.textContent || targetName.value;
    const btnBox = targetParent.nextElementSibling;
    const dataId = target.getAttribute("data-id");
    const isDone = targetName.classList.contains("list-done");

    // p를 input으로 전환
    if (targetName.nodeName == "P") {
      const input = document.createElement("input");
      const editBtn = document.createElement("button");

      editBtn.className = "edit-btn";
      editBtn.textContent = "저장";
      editBtn.setAttribute("data-id", dataId);
      editBtn.disabled = isDone;

      input.type = "text";
      input.value = originText;
      input.readOnly = isDone;
      input.className = isDone ? "list-done" : "";
      input.placeholder = "할일을 입력합니다.";

      editBtn.addEventListener("click", () => editTodo(editBtn));
      targetParent.insertBefore(input, targetName);
      btnBox.insertBefore(editBtn, btnBox.firstElementChild);
      targetName.remove();
      return;
    }

    // input을 p로 전환
    if (targetName.nodeName == "INPUT") {
      const pTag = document.createElement("p");
      const editBtn = btnBox.firstElementChild;
      const newValue = targetName.value;

      pTag.textContent = newValue == "" ? originText : newValue;
      pTag.setAttribute("data-id", dataId);
      pTag.classList.add("list-item-name");
      if (isDone) pTag.classList.add("list-done");

      pTag.addEventListener("click", (event) => toggleDone(event.target));
      targetParent.insertBefore(pTag, targetName);
      targetName.remove();
      editBtn.remove();
      return;
    }
  };

  // 저장 버튼 클릭 핸들러
  const editTodo = (target) => {
    const targetInput =
      target.parentElement.previousElementSibling.lastElementChild;
    const dataId = target.getAttribute("data-id");

    if (targetInput.value == "") return;

    const newList = editData(
      dataId,
      "name",
      targetInput.value,
      this.state.todoList
    );

    saveList(newList);
    this.setState({ todoList: newList });
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
