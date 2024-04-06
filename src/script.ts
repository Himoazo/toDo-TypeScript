interface Todo {
    task: string;
    completed: boolean;
    priority: number;
}

class TodoList implements Todo{

    task: string;
    completed: boolean;
    priority: number;

    constructor(task: string, completed: boolean, priority: number){
        this.task = task;
        this.completed = completed;
        this.priority = priority;
    }

    todos: Todo[] = [];


    
    addTodo(task: string, priority: number): boolean{
        if(task && priority){
            return true;
        }else{
            return false;
        }
        
    }
    markTodoCompleted(todoIndex: number): void{
        //(metod för att markera todos som klara)
    }

    getTodos(): Todo[] {
        return
    }

    
}