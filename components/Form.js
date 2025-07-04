export default function Form($container) {
  this.$container = $container;

  this.render = function () {
    this.$container.innerHTML = `
    <input id="addText" type="text" placeholder="할일 추가" />
    <button id="submitBtn" type="submit">추가</button>
`;
  };
  this.render();
}
