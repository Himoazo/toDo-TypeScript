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
        const todoToUpdate = this.todos[todoIndex];
        todoToUpdate.completed = true;
        this.todos.splice(todoIndex, 1, todoToUpdate);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    deleteTodo(todoIndex: number): void{
        this.todos.splice(todoIndex, 1);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromLocalStorage(): void {
        let savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            return this.todos = JSON.parse(savedTodos);
        } 
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    saveToLocalStorage(todo: Todo): void {
        this.todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}