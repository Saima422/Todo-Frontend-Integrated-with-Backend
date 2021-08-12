
import { deleteTodo, completedTodo, updateTodo } from "../actions/domOperations.js";

const root = document.getElementById('root');


export const createTaskEl = (task) => {
    const markup = document.createElement('div');
    markup.classList.add('task-container');
    markup.id = task.taskId;

    const input = document.createElement('input');
    input.classList.add('task-update-input');
    input.value = task.content; 
    input.disabled = true;
    markup.appendChild(input);

    const para = document.createElement('p');
    para.classList.add('created-at');
    para.innerText = task.createdAt;
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

    displayOnDOM(markup);
};


const displayOnDOM = (taskContainer) => {
    root.appendChild(taskContainer);
}