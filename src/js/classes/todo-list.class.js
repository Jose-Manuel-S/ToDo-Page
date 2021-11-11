import {Todo} from './todo.class'

export class TodoList {

    constructor(){

        this.cargarLocalStorage();

    }

    nuevoTodo (todo){

        this.todos.push(todo);
        this.guardarLocaStorage();

    }

    eliminarTodo( id ){

        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocaStorage();

    }

    marcarCompletado( id ){

       for(const todo of this.todos){
           if (todo.id == id){
               todo.completado = !todo.completado;
               break
           }
       }

    }

    contadorTodo(){

        let sum = 0;

        for(const todo of this.todos){
            if (todo.completado === false){
                sum = sum + 1;
            }
        }
        return sum;
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocaStorage();
    }

    guardarLocaStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo'))? JSON.parse(localStorage.getItem('todo')) : [];
        this.todos = this.todos.map(Todo.fromJson);
    }
}