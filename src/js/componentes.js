import { Todo } from "./classes/todo.class";
import { todoList } from "../index.js";

//Referencias al HTML
const divTodoList  = document.querySelector('.todo-list');
const txtImput     = document.querySelector('.new-todo');
const btnBorrar    = document.querySelector('.clear-completed');
const ulFitros     = document.querySelector('.filters');
const contador     = document.querySelector('.todo-count');

export const crearTodoHTML = (todo) => {

    const htmltodo = `
    <li class="${ (todo.completado)? 'completed': '' }" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado)? 'checked': '' }>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;
    const div = document.createElement('div');
    div.innerHTML = htmltodo;

    //divTodoList
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

export const contadorTodos = ()=>{

    console.log(contador.children);
    console.log(contador.children.item(0));
    contador.children.item(0).innerHTML = `<strong>${todoList.contadorTodo()}</strong>`;
}



const btnTodos = ()=>{
    for( let i = divTodoList.children.length - 1; i >= 0; i--){

        const elemento = divTodoList.children[i];
        console.log(elemento);
        divTodoList.removeChild(elemento);
    }

    todoList.todos.forEach(crearTodoHTML);
}

//Eventos
txtImput.addEventListener('keyup',( evento )=>{

    if( evento.keyCode === 13 && txtImput.value.length > 0){
        const nuevoTodo = new Todo(txtImput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        txtImput.value = '';

    }
    contadorTodos();
});

divTodoList.addEventListener('click', (evento)=>{

    const nombreElemento = evento.target.localName;
    const todoElemento   = evento.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');
    
    if (nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
    contadorTodos();

});

btnBorrar.addEventListener('click', ()=>{

    todoList.eliminarCompletados();
    
    for( let i = divTodoList.children.length - 1; i >= 0; i--){

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
    contadorTodos();

});

ulFitros.addEventListener('click', (event)=>{
    
    const obj = event.target.innerText;

    console.log(event);

    if(obj === 'Todos'){;
        btnTodos();

    }else{
        btnTodos();
        for( let i = divTodoList.children.length - 1; i >= 0; i--){

            const elemento = divTodoList.children[i];
            console.log(elemento);
            if (obj === 'Pendientes' && elemento.classList.contains('completed')){
                divTodoList.removeChild(elemento);
            }else if(obj === 'Completados' && !elemento.classList.contains('completed')){
                divTodoList.removeChild(elemento);
            }
        }

    }
    contadorTodos();

});
