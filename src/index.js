import './styles.css';
import {Todo,TodoList,createTodo} from './js/functions.js';

export const todoList = new TodoList();

todoList.todos.forEach(createTodo);