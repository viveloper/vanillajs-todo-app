class TodoApp {
  constructor() {
    this.state = {
      todos: [],
      user: {
        username: '아무개'
      }
    };
    this.el = document.querySelector('.app');
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  toggleCompleted(id) {
    const newState = {
      ...this.state,
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        } else {
          return todo;
        }
      })
    };
    this.setState(newState);
  }

  removeTodo(id) {
    const newState = {
      ...this.state,
      todos: this.state.todos.filter(todo => todo.id !== id)
    };
    this.setState(newState);
  }

  bindEvents() {
    const todoInputEl = document.querySelector('.todo-input');
    todoInputEl.addEventListener('keyup', e => {
      if (e.which === 13) {
        const newState = {
          ...this.state,
          todos: [
            ...this.state.todos,
            {
              id: new Date().getTime().toString(),
              text: e.target.value,
              completed: false
            }
          ]
        };
        this.setState(newState);
        e.target.value = '';
      }
    });

    const todoCheckboxElements = document.querySelectorAll('.todo-checkbox');
    if (todoCheckboxElements && todoCheckboxElements.length) {
      todoCheckboxElements.forEach(el => {
        el.addEventListener('click', () => {
          this.toggleCompleted(el.dataset.id);
        });
      });
    }

    const todoBtnDeleteElements = document.querySelectorAll('.btn-delete');
    if (todoBtnDeleteElements && todoBtnDeleteElements.length) {
      todoBtnDeleteElements.forEach(el => {
        el.addEventListener('click', () => {
          this.removeTodo(el.dataset.id);
        });
      });
    }
  }

  render() {
    const totalCount = this.state.todos.length;
    const completedCount = this.state.todos.filter(
      todo => todo.completed === true
    ).length;
    const unCompletedCount = totalCount - completedCount;

    const templateTodoList = this.state.todos.reduce((html, todo, index) => {
      return (
        html +
        `
        <li class="todo-list-item ${todo.completed ? 'completed-todo' : ''}">
          <input type="checkbox" ${
            todo.completed ? 'checked' : ''
          } class="todo-checkbox" data-id="${todo.id}" />
          <p class="todo-text">${todo.text}</p>
          <button type="button" class="btn-delete" data-id="${
            todo.id
          }">X</button>
        </li>
      `
      );
    }, '');

    const template = `
      <header class="header">
      <div class="header-center">
        <span class="logo">LOGO</span>
        <span class="header-title">할 일 목록</span>
        <span class="user">${this.state.user.username}</span>
      </div>
      </header>
      <section class="todo">
      <div class="todo-center">
        <input
          type="text"
          name="todo"
          class="todo-input"
          placeholder="할 일을 입력하세요"
        />
        <div class="todo-info">
          <p>
            할 일: <span style="color:green">${totalCount}건</span>
            완료: <span style="color:blue">${completedCount}건</span>
            미완료: <span style="color:red">${unCompletedCount}건</span>
          </p>
        </div>
        <ul class="todo-list">
          ${templateTodoList}
        </ul>
      </div>
      </section>
    `;
    this.el.innerHTML = template;

    this.bindEvents();
  }
}

const todoApp = new TodoApp();
todoApp.render();
