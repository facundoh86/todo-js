import { Todo } from "../class";
import { todoList } from '../index';

//REFERENCIA AL HTML
const divTodoList = document.querySelector('.todo-list');
const textInput = document.querySelector('.new-todo');
const btnDelete = document.querySelector('.clear-completed');
const ulfilter = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro')


export const crearTodoHtml = (todo) => {
    const htmlTodo =
        `<li class=${(todo.completado) ? completed : ''} data-id=${todo.id}>
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? checked : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
                <input class="edit" value="Create a TodoMVC template">
        </li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

textInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && textInput.value.length > 0) {
        const nuevoTodo = new Todo(textInput.value);
        todoList.nuevoTodo(nuevoTodo);
        console.log(todoList);
        crearTodoHtml(nuevoTodo);
        textInput.value = '';
    }
})

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute("data-id");
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

    console.log(todoId);

})

btnDelete.addEventListener('click', ()=> {
        todoList.eliminarCompletados();

        for(let i = divTodoList.children.length -1; i >= 0; i-- ){
            const element = divTodoList.children[i];
            if(element.classList.contains('completed')){
                divTodoList.removeChild(element);
            }
        }
});

ulfilter.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if(!filtro ){return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
       elemento.classList.remove('hidden');
       const completado = elemento.classList.contains('completed');
       switch (filtro) {
           case 'Pendientes':
               if(completado){
                   elemento.classList.add('hidden');
               }
               break;
           case 'Completados':
               if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
           default:
               break;
       }
    }

})