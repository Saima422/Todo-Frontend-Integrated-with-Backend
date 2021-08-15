
import { deleteTodo, completedTodo, updateTodo, undoComplete } from "../actions/domOperations.js";

const root = document.getElementById('root');


export const createTaskEl = (task) => {
    const markup = document.createElement('div');
    markup.classList.add('task-container');
    markup.id = task.taskId;
    markup.isEdited = false;

    const input = document.createElement('input');
    input.classList.add('task-update-input');
    input.value = task.content; 
    input.disabled = true;
    input.addEventListener('change', () => {
        markup.isEdited = true;
    })
    markup.appendChild(input);

    const para = document.createElement('p');
    para.classList.add('created-at');
    if(task.updatedAt != ""){
        para.innerText = task.updatedAt;
    }
    else{
        para.innerText = task.createdAt;
    }
    markup.appendChild(para);

    const btn1 = document.createElement('button');
    btn1.classList.add('btn', 'btn-update');
    const i1 = document.createElement('i');
    btn1.classList.add('fa', 'fa-lg', 'fa-edit');
    btn1.appendChild(i1);
    markup.appendChild(btn1);
    btn1.addEventListener('click', updateTodo);

    const btn2 = document.createElement('button');
    btn2.classList.add('btn', 'btn-complete');
    const i2 = document.createElement('i');
    btn2.classList.add('fa', 'fa-lg', 'fa-check-double', 'undone');
    btn2.appendChild(i2);
    markup.appendChild(btn2);
    btn2.addEventListener('click', completedTodo);

    const btn3 = document.createElement('button');
    btn3.classList.add('btn', 'btn-delete');
    const i3 = document.createElement('i');
    btn3.classList.add('fa', 'fa-lg', 'fa-trash');
    btn3.appendChild(i3);
    markup.appendChild(btn3);
    btn3.addEventListener('click', deleteTodo);

    if(task.isComplete){
        input.style.textDecoration = "line-through";
        btn1.disabled = true;
        btn1.style.color = 'grey';
        btn2.removeEventListener('click', completedTodo);
        btn2.addEventListener('click', undoComplete);
        btn2.classList.remove('fas','fa-check-double', 'undone');
        btn2.classList.add('fas','fa-undo', 'done');
    }
    
    displayOnDOM(markup);
};


const displayOnDOM = (taskContainer) => {
    root.appendChild(taskContainer);
}