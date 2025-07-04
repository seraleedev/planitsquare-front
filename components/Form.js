export default function Form($container, props) {
  this.setup = () => {
    this.state = {
      ...props,
      newValue: "",
    };
  };

  this.template = () => {
    const { newValue } = this.state;
    return `
      <input id="addText" type="text" placeholder="할일 추가하기" value="${newValue}"/>
      <button id="submitBtn">추가</button>
      `;
  };

  this.render = function () {
    $container.innerHTML = this.template();
  };

  this.setup();
  this.render();
}
