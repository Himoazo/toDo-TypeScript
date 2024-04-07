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
    const todoArr = TodoListInit.getTodos();
    printTodos(todoArr);

    todoForm.addEventListener('submit', (event) => {
        
        const todoTextEl = todoText.value;
        const chosenPrioEl = parseInt(chosenPrio.value) as 1 | 2 | 3;
        const completedEl = false;
        
        
        /* console.log(todoTextEl, completedEl, chosenPrioEl); */
        const addTodoStatus = TodoListInit.addTodo(todoTextEl, chosenPrioEl);
        if(addTodoStatus == false){
            event.preventDefault(); 
            const error = document.getElementById("error") as HTMLParagraphElement;
            error.textContent = "Vänligen fyll i både text och prioritet";
        }else{
            const newTodo: Todo = { task: todoTextEl, completed: completedEl, priority: chosenPrioEl};
            TodoListInit.saveToLocalStorage(newTodo);
        }
    });
});

function printTodos(arr: Todo[]){
    const todoDiv = document.getElementById("todoDiv") as HTMLDivElement;
    const done = document.getElementById("done") as HTMLDivElement;
    
    arr.forEach((element, index) => {
        const todoItem: HTMLDivElement = document.createElement('div');
        const todoTask: HTMLParagraphElement = document.createElement('p');
        const todoPrio: HTMLParagraphElement = document.createElement('p');
        todoTask.textContent = element.task;
        todoPrio.textContent = element.priority.toString();
        const label = document.createElement("label");
        label.textContent = "Klart: "
        const checkbox: HTMLInputElement = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener("change", ()=>{
            TodoListInit.markTodoCompleted(index);
            document.location.reload();
        });
        checkbox.checked = element.completed;
        checkbox.disabled = element.completed;
        const deleteTodo: HTMLSpanElement = document.createElement('span');
        deleteTodo.textContent= "X";
        deleteTodo.addEventListener("click", ()=>{
            TodoListInit.deleteTodo(index);
            document.location.reload();
        });
        todoItem.appendChild(deleteTodo);
        label.appendChild(checkbox);
        todoItem.appendChild(label);
        todoItem.appendChild(todoPrio);
        todoItem.appendChild(todoTask);
        if(checkbox.checked == false){
            todoDiv.appendChild(todoItem);
        }else if(checkbox.checked == true){
            done.appendChild(todoItem);
        }
        
    });
}