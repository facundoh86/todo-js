import {Todo, TodoList} from './class';
import { crearTodoHtml } from './js/components';

import './styles.css';


export const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHtml(todo));


todoList.todos[2].imprimirClass();

console.log('todos', todoList.todos);

//const tarea = new Todo('Aprender JS');


//todoList.nuevoTodo(tarea);


//crearTodoHtml (tarea);

//console.log(todoList);

//localStorage.setItem('key', 'aABC123');
//sessionStorage.setItem('key', 'aABC123');

//setTimeout(()=> {
//    localStorage.removeItem('key');
//},1500)