/* props {
  $container : 렌더링될 컨테이너 컴포넌트
  todoList : props로 내려주는 할일 목록
  setParentState : 컴포넌트 내에서 상태 변경이 일어날때 실행되는 부모 컴포넌트 리렌더링 함수
}*/
const Model = (props = { $container, todoList, setParentState }) => {
  // 글로벌 상태 세팅
  this.setup = () => {
    this.state = { [key]: value };
  };

  // UI구성
  this.template = () => {
    return ``;
  };

  // UI 렌더링
  this.render = () => {
    $container.innerHTML = this.template();
    this.addEvent();
  };

  // 상태 변경 후 렌더링
  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    setParentState();
  };

  //컴포넌트 이벤트 등록
  this.addEvent = () => {
    const $target = document.querySelector("");
    const $targets = document.querySelectorAll("");

    $target.addEventListener("click", (event) => {
      console.log("event");
    });
    $targets.forEach((ele) =>
      ele.addEventListener("click", (event) => {
        console.log("event");
      })
    );
  };
};
