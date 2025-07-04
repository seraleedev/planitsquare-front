export default function TodoList($container, props) {
  this.setup = () => {
    this.state = {
      ...props,
    };
  };

  this.template = () => {
    return `<li>
      <input type="checkbox">
      <input type="text">
      <button>수정</button>
      <button>X</button>
    </li>
    `;
  };

  this.render = function () {
    $container.innerHTML = this.template();
  };

  this.setup();
  this.render();
}
