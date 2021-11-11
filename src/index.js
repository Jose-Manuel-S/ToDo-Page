import './styles.css';
import {Todo, TodoList} from './js/classes/index.js';
import { crearTodoHTML, contadorTodos } from './js/componentes';

export const todoList = new TodoList();

console.log(todoList);
todoList.todos.forEach(crearTodoHTML);

contadorTodos();