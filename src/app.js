import { getTodos, addTodo } from "./actions/domOperations.js";
import "../styles/styles.scss";

const taskForm = document.getElementById('task-form');

window.onload = function(event) {
    getTodos();
}

taskForm.addEventListener('submit', addTodo);
