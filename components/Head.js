export default function Head($container, props) {
  this.setup = () => {
    this.state = {
      ...props,
    };
  };

  this.template = () => {
    const { completeTodo, totalTodo } = this.state;
    return `<h1>Todo-list</h1>
      <div id="allBtn"><button>전체 완료</button><button>전체 삭제</button></div>
      <div id="count-container"><span>전체: ${totalTodo}</span> <span>완료: ${completeTodo}</span></div>`;
  };

  this.render = function () {
    $container.innerHTML = this.template();
  };

  this.setup();
  this.render();
}
