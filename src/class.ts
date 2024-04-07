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
    
    addTodo(todo: Todo): void{
        this.todos.push(todo);
        this.saveToLocalStorage(this.todos);
    }

    markTodoCompleted(todoIndex: number): void{
        //(metod för att markera todos som klara)
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    saveToLocalStorage(todos: Todo[]): void {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    loadFromLocalStorage(): void {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } /* else {
            return []; 
        } */
    }
    
}

