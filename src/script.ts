 interface Todo {
    task: string;
    completed: boolean;
    priority: 1 | 2 | 3;
}

 class TodoList implements Todo{

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

    const todoText = document.getElementById("todoText") as HTMLTextAreaElement;
    const chosenPrio = document.getElementById("priority") as HTMLSelectElement;
    const todoForm = document.getElementById("todoForm")! as HTMLFormElement;
    const todoTextEl = todoText.value;
    const chosenPrioEl = parseInt(chosenPrio.value) as 1 | 2 | 3;
    const completedEl = false;
    //instantiate klassen
    const TodoListInit = new TodoList(todoTextEl, completedEl, chosenPrioEl);

document.addEventListener('DOMContentLoaded', () => {
    
    TodoListInit.loadFromLocalStorage();
    console.log(TodoListInit.loadFromLocalStorage());
    const todoArr = TodoListInit.getTodos();
    printTodos(todoArr);

    todoForm.addEventListener('submit', (event) => {
        /* event.preventDefault();  */
        const todoTextEl = todoText.value;
        const chosenPrioEl = parseInt(chosenPrio.value) as 1 | 2 | 3;
        const completedEl = false;
        
        
        /* console.log(todoTextEl, completedEl, chosenPrioEl); */
        const addTodoStatus = TodoListInit.addTodo(todoTextEl, chosenPrioEl);
        if(addTodoStatus == true){
            const newTodo: Todo = { task: todoTextEl, completed: completedEl, priority: chosenPrioEl};
            /* console.log(newTodo); */
            TodoListInit.saveToLocalStorage(newTodo);
        }
    });
});

function printTodos(arr: Todo[]){
    const todoDiv = document.getElementById("printedTodos") as HTMLDivElement;
    
    arr.forEach((element, index) => {
        const todoItem: HTMLDivElement = document.createElement('div');
        const todoTask: HTMLParagraphElement = document.createElement('p');
        const todoPrio: HTMLParagraphElement = document.createElement('p');
        todoTask.textContent = element.task + " " + element.completed;
        todoPrio.textContent = element.priority.toString();
        const checkbox: HTMLInputElement = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener("change", ()=>{
            TodoListInit.markTodoCompleted(index);
        });
        checkbox.checked = element.completed;
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoPrio);
        todoItem.appendChild(todoTask);
        todoDiv.appendChild(todoItem);
    });
}