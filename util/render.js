// 렌더링 함수
export const reRendering = (component, props) => {
  const $component = document.getElementById(component.name || "");
  if (!$component) return;

  const componentInstance = null;
  $component.outerHTML = componentInstance;
};

export const createComponent = (component, props) => {
  const prevComp = currentComp;
};
