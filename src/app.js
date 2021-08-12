import { getTodos, addTodo } from "./actions/domOperations.js";

const taskForm = document.getElementById('task-form');

window.onload = function(event) {
    getTodos();
}

taskForm.addEventListener('submit', addTodo);
