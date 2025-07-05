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
};

// 수정된 데이터 리턴 함수
export const editData = (dataId, key, value, todoList) => {
  const targetItem = todoList.find((item) => item.id == dataId);
  const editData = {
    ...targetItem,
    [key]: value,
  };
  const targetIndex = todoList.indexOf(targetItem);
  todoList[targetIndex] = editData;

  return todoList;
};

// 랜덤 아이디 생성 함수
export const createDataId = () => {
  return Math.random().toString(16).substring(2, 8);
};
