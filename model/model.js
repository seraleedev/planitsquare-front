const Model = ($container) => {
  // 글로벌 상태 세팅
  this.setup = () => {
    this.state = { [key]: value };
  };

  // UI구성
  this.template = () => {
    return ``;
  };

  // 마운트 시
  this.mounted = () => {
    console.log("mount action");
  };

  // UI 렌더링
  this.render = () => {
    this.$container.innerHTML = this.template();
    this.this.addEvent();
  };

  // 상태 변경 후 렌더링
  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
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
