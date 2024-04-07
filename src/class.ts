export interface Todo {
    task: string;
    completed: boolean;
    priority: 1 | 2 | 3;
}

 export class TodoList implements Todo{

    task: string;
    completed: boolean;
    priority: 1 | 2 | 3;

    constructor(task: string, completed: boolean, priority: 1 | 2 | 3){
        this.task = task;
        this.completed = completed;
        this.priority = priority;
    }

    todos: Todo[] = [];
    
    //metod för att lägga till nya todos med prioritet
    public addTodo(task: string, priority: number): boolean{
        if(task != "" && priority != null){
            return true
        }else{
            return false
        }
    }
    //metod för att markera todos som klara
    markTodoCompleted(todoIndex: number): void{
        const todoToUpdate = this.todos[todoIndex];
        todoToUpdate.completed = true;
        this.todos.splice(todoIndex, 1, todoToUpdate);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    //Tar bort en todo
    deleteTodo(todoIndex: number): void{
        this.todos.splice(todoIndex, 1);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    //metod för att hämta todos från LocalStorage
    loadFromLocalStorage(): void {
        let savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            return this.todos = JSON.parse(savedTodos);
        } 
    }
    //metod för att hämta hela listan av todos
    getTodos(): Todo[] {
        return this.todos;
    }
    //metod för att spara todos till LocalStorage
    saveToLocalStorage(todo: Todo): void {
        this.todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}