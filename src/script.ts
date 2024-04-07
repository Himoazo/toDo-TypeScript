import { Todo } from "./class";
import { TodoList } from "./class";

//Läser in värden från formen
const todoText = document.getElementById("todoText") as HTMLTextAreaElement;
const chosenPrio = document.getElementById("priority") as HTMLSelectElement;
const todoForm = document.getElementById("todoForm")! as HTMLFormElement;
const todoTextEl = todoText.value;
const chosenPrioEl = parseInt(chosenPrio.value) as 1 | 2 | 3;
const completedEl = false;
//instantiate klassen
const TodoListInit = new TodoList(todoTextEl, completedEl, chosenPrioEl);

document.addEventListener('DOMContentLoaded', () => {
    
    TodoListInit.loadFromLocalStorage(); //Tar fram todos från localstorage
    const todoArr = TodoListInit.getTodos(); //Hämtar todos
    printTodos(todoArr); //Skriver ut todos till DOM

    todoForm.addEventListener('submit', (event) => {
        
        const todoTextEl = todoText.value;
        const chosenPrioEl = parseInt(chosenPrio.value) as 1 | 2 | 3;
        const completedEl = false;
       
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

//Funktion som skriver ut sparade todos till DOM
function printTodos(arr: Todo[]){
    const todoDiv = document.getElementById("todoDiv") as HTMLDivElement;
    const done = document.getElementById("done") as HTMLDivElement;
    
    arr.forEach((element, index) => {
        const todoItem: HTMLDivElement = document.createElement('div');
        todoItem.classList.add('itemTodo');
        const todoTask: HTMLParagraphElement = document.createElement('p');
        todoTask.classList.add('taskTodo');
        const todoPrio: HTMLParagraphElement = document.createElement('p');
        todoPrio.classList.add('prio');
        todoTask.textContent = element.task;
        todoPrio.textContent = "(Prio: " + element.priority.toString() + ")";
        const label = document.createElement("label");
        label.classList.add('checkLabel');
        label.textContent = "Klart: "
        const checkbox: HTMLInputElement = document.createElement('input');
        checkbox.classList.add('checkInput');
        checkbox.type = 'checkbox';
        checkbox.addEventListener("change", ()=>{
            TodoListInit.markTodoCompleted(index);
            document.location.reload();
        });
        checkbox.checked = element.completed;
        checkbox.disabled = element.completed;
        const deleteTodo: HTMLSpanElement = document.createElement('span');
        deleteTodo.classList.add('cansel');
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
        //Skickar todo till passande Div beroende på avklarat/Ej avklarat
        if(checkbox.checked == false){
            todoDiv.appendChild(todoItem);
        }else if(checkbox.checked == true){
            done.appendChild(todoItem);
        }
    });
}