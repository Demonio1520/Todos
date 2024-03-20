import {todoList} from '../index';

// Create a Todo
export class Todo {
    static fromJson({homework,id,completed,created}) {
        const temTodo = new Todo(homework);
        temTodo.id = id;
        temTodo.completed = completed;
        temTodo.created = created;

        return temTodo;
    }

    constructor(homework) {
        this.homework = homework;
        this.id = new Date().getTime();
        this.completed = false;
        this.created = new Date();
    }
}

// Type of Todos
export class TodoList {
    constructor() {
        this.loadLocalStorage();
    }

    newTodo(homework) {
        this.todos.push(homework);
        this.saveLocalStorage();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter( todo => todo.id != id)
        this.saveLocalStorage();
    }

    markCompleted(id) {
        for(const todo of this.todos) {
            if (todo.id == id) {
                todo.completed = !todo.completed;
                this.saveLocalStorage();
                break;
            }
        }
    }

    deleteCompleted() {
        this.todos = this.todos.filter( todo => !todo.completed);
        this.saveLocalStorage();
    }

    saveLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }
    loadLocalStorage() {
        (localStorage.getItem('todo')) ?
        this.todos = JSON.parse(localStorage.getItem('todo')) :
        this.todos = [];

        this.todos = this.todos.map(Todo.fromJson);
    }
}

// Create a Todo on the HTML
export const createTodo = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completed) ? 'completed' : ''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completed) ? 'checked' : ''}>
        <label>${todo.homework}</label>
        <button class="destroy"></button>
    </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div;
}

// HTML Class
const divTodoList = document.querySelector('.todo-list'),
txtInput = document.querySelector('.new-todo'),
btnDelete = document.querySelector('.clear-completed'),
ulFilters = document.querySelector('.filters'),
anchorFilters = document.querySelectorAll('.filtro');

// Events

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode == 13 && txtInput.value.length > 0) {
        const newTodo = new Todo(txtInput.value);
        todoList.newTodo(newTodo);
        createTodo(newTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const eventName = event.target.localName;
    const eventElement = event.target.parentElement.parentElement;
    const eventId = eventElement.getAttribute('data-id');

    if (eventName.includes('input')) {
        todoList.markCompleted(eventId);
        eventElement.classList.toggle('completed');
    } else if (eventName.includes('button')) {
        todoList.deleteTodo(eventId);
        divTodoList.removeChild(eventElement);
    }
});

btnDelete.addEventListener('click', () => {
    for(let i = divTodoList.children.length -1; i >= 0; i--) {
        todoList.deleteCompleted();
        const element = divTodoList.children[i];
        
        if(element.classList.contains('completed')) {
            divTodoList.removeChild(element);
        }
    }
});

ulFilters.addEventListener('click', (event) => {
    const filter = event.target.text;
    if (!filter) return;
    anchorFilters.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const element of divTodoList.children) {
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch(filter) {
            case 'Pendientes':
                if (completed) {
                    element.classList.add('hidden');
                }
            break;
            case 'Completados':
                if (!completed) {
                    element.classList.add('hidden');
                }
            break;
        }
    }
});