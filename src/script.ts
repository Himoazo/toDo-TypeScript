 interface Todo {
    task: string;
    completed: boolean;
    priority: 1 | 2 | 3;
}

 class TodoList implements Todo{

    task: string;
    completed: boolean;
    priority: 1 | 2 | 3;

    constructor(task: string, completed: false, priority: 1 | 2 | 3){
        this.task = task;
        this.completed = completed;
        this.priority = priority;
    }

    todos: Todo[] = [];
    
    public addTodo(task: string, priority: number): boolean{
        if(task != "" && priority != null){
            return true
        }else{
            return false
        }
    }

    /* this.todos.push(todo);
        this.saveToLocalStorage(this.todos); */

    markTodoCompleted(todoIndex: number): void{
        //(metod för att markera todos som klara)
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    saveToLocalStorage(todo: TodoList): void {
        this.todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    loadFromLocalStorage(): void {
        let savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } 
    }
}

const todoText = document.getElementById("todoText") as HTMLTextAreaElement;
const chosenPrio = document.getElementById("priority") as HTMLSelectElement;

const todoTextEl = todoText.value;
const chosenPrioEl = parseInt(chosenPrio.value) as 1 | 2 | 3;


const TodoListInit = new TodoList(todoTextEl, false, chosenPrioEl);
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById("todoForm")! as HTMLFormElement;
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        TodoListInit.addTodo(todoTextEl, chosenPrioEl);
    });
});
