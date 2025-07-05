const TODOLIST = "toDoList";

// 로컬스토리지 데이터 로드 함수
export const loadTodo = (todoList) => {
  const savedData = localStorage.getItem(TODOLIST);

  if (savedData != null) {
    const savedTodoList = JSON.parse(savedData);
    return savedTodoList;
  }
  return todoList;
};

// 전체 데이터 저장 함수
export const saveList = (newTodoList) => {
  localStorage.setItem(TODOLIST, JSON.stringify(newTodoList));
  location.reload();
};

// 추가 데이터 저장 함수
export const saveNewTodo = (data, todoList) => {
  todoList.push(data);
  localStorage.setItem(TODOLIST, JSON.stringify(todoList));
  location.reload();
};

// 삭제 데이터 저장 함수
export const saveDeleteList = (dataId, todoList) => {
  const filterList = todoList.filter((item) => item.id !== dataId);
  localStorage.setItem(TODOLIST, JSON.stringify(filterList));
  location.reload();
};

// 수정 데이터 저장 함수
export const saveEditList = (dataId, key, value, todoList, callBackFn) => {
  const targetItem = todoList.find((item) => item.id == dataId);
  const editData = {
    ...targetItem,
    [key]: value,
  };
  const targetIndex = todoList.indexOf(targetItem);
  todoList[targetIndex] = editData;
  localStorage.setItem(TODOLIST, JSON.stringify(todoList));
  if (callBackFn) callBackFn();
  location.reload();
};

// 랜덤 아이디 생성 함수
export const createDataId = () => {
  return Math.random().toString(16).substring(2, 8);
};
