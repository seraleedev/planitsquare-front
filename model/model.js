export const model = [
  {
    name: "리액트 복습",
    isCompleted: true,
  },
  {
    name: "타입스크립트 공부",
    isCompleted: false,
  },
];

export function Model($container) {
  // 글로벌 상태 세팅
  const setup = () => {};

  // UI구성
  const template = () => {
    return ``;
  };

  // 마운트 시
  const mounted = () => {};

  // UI 렌더링
  const render = () => {
    this.$container.innerHTML = this.template();
    this.setEvent();
  };

  //컴포넌트 이벤트
  const setEvent = () => {};

  // 상태 변경 후 렌더링
  const setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  //이벤트 등록
  const addEvent = (eventType, selector, callBackFn) => {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closet(selector)) return false;
      callBackFn(event);
    });
  };

  return { setup, template, mounted, render, setEvent, setState, addEvent };
}
