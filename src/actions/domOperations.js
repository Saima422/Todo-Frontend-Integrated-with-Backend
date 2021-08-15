import { apiRequest } from "../apiCalls/taskApi.js";
import { createTaskEl } from "../components/task.js";

// const url = "http://192.168.0.105:3000/tasks";
const url = "https://rocky-ocean-88181.herokuapp.com/tasks";
let obj;


export const getTodos = async () => {
    let resData = await apiRequest(`${url}`);
    resData.forEach((item) => {
        createTaskEl(item);
    });
}


const getTime = () => {
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours()+ ":" + today.getMinutes();
    var dateTime = `${time} ${date}`;

    return dateTime;
}


export const addTodo = async (event) => {
    event.preventDefault();
    let taskInputValue = document.taskInput.task.value;
    document.taskInput.task.value = "";

    obj = {
        method: 'POST',
        body: JSON.stringify({content: taskInputValue, createdAt: getTime(), updatedAt: ""}),
        headers: {
            "Content-Type": "application/json"
        } 
    }

    const resData = await apiRequest(`${url}`, obj);
    createTaskEl(resData);
}


export const deleteTodo = (e) => {
    obj = {
        method: 'DELETE'
    }
    const todoId = e.target.parentElement.id;
    const removeObj = document.getElementById(todoId);
    alert(`You are Deleting Task "${removeObj.childNodes[0].value}"`);
    apiRequest(`${url}/${todoId}`, obj);
    removeObj.remove();
}


export const updateCall = (event, valueUpdated, createTime, time, bool) => {

    obj = {
        method: 'POST',
        body: JSON.stringify({content: valueUpdated, createdAt: createTime, updatedAt: time, isComplete: bool}),
        headers: {
            "Content-Type": "application/json"
        } 
    }
    const todoId = event.target.parentElement.id;
    apiRequest(`${url}/${todoId}`, obj);
}

export const updateTodo = (e) => {
    const todoId = e.target.parentElement.id;

    const updateObj = document.getElementById(todoId);

    let strValue = updateObj.childNodes[0];
    strValue.disabled = false;
    if(updateObj.childNodes[0].value.includes(' -(edited)')){
        updateObj.addEdit = true;
        updateObj.childNodes[0].value = updateObj.childNodes[0].value.replace(' -(edited)','').trim();
    }
    strValue.style.color = "black";

    const disableBtn = updateObj.childNodes[3];
    disableBtn.disabled = true;
    disableBtn.style.color = 'grey';

    const updatebtn = updateObj.childNodes[2];
    updatebtn.removeEventListener('click', updateTodo);
    updatebtn.addEventListener('click', confirmTodo);
    updatebtn.classList.remove('fa','fa-edit');
    updatebtn.classList.add('far','fa-check-circle');
}

const confirmTodo = (e) => {
    const todoId = e.target.parentElement.id;

    const updateObj = document.getElementById(todoId);

    let strValue = updateObj.childNodes[0];
    let valueUpdated = strValue.value;

    strValue.disabled = true;
    strValue.style.color = "white";

    const disableBtn = updateObj.childNodes[3];
    disableBtn.disabled = false;
    disableBtn.style.color = 'white';

    if(!updateObj.childNodes[0].value.includes(' -(edited)') && updateObj.isEdited){
        updateObj.childNodes[0].value = updateObj.childNodes[0].value.trim() + ' -(edited)';
        valueUpdated = updateObj.childNodes[0].value;
    }
    else if(updateObj.addEdit){
        updateObj.childNodes[0].value = updateObj.childNodes[0].value.trim() + ' -(edited)';
    }
    else{
        updateObj.childNodes[0].value = updateObj.childNodes[0].value.trim();
        valueUpdated = updateObj.childNodes[0].value;
    }

    let createTime = e.target.parentElement.childNodes[1].innerText;
    let presentTime = getTime();

    if(updateObj.isEdited){
        updateCall(e, valueUpdated, createTime, presentTime, false);
        console.log("api call");
        updateObj.isEdited = false;
    }


    e.target.parentElement.childNodes[1].innerText = presentTime;
   
    const updatebtn = updateObj.childNodes[2];
    updatebtn.removeEventListener('click', confirmTodo);
    updatebtn.addEventListener('click', updateTodo);
    updatebtn.classList.remove('far','fa-check-circle');
    updatebtn.classList.add('fa','fa-edit');
}


export const completedTodo = (e) => {
    const todoId = e.target.parentElement.id;
    let createTime = e.target.parentElement.childNodes[1].innerText;
    let presentTime = getTime();
    let valueUpdated = e.target.parentElement.childNodes[0].value;

    updateCall(e, valueUpdated, createTime, presentTime, true);

    e.target.parentElement.childNodes[1].innerText = presentTime;

    const completedObj = document.getElementById(todoId);

    let strValue = completedObj.childNodes[0];
    strValue.style = "text-decoration: line-through";

    const disableBtn = completedObj.childNodes[2];
    disableBtn.disabled = true;
    disableBtn.style.color = 'grey';

    const undobtn = completedObj.childNodes[3];
    undobtn.removeEventListener('click', completedTodo);
    undobtn.addEventListener('click', undoComplete);
    undobtn.classList.remove('fas','fa-check-double', 'undone');
    undobtn.classList.add('fas','fa-undo', 'done');
}

export const undoComplete = (e) => {
    const todoId = e.target.parentElement.id;
    let createTime = e.target.parentElement.childNodes[1].innerText;
    let presentTime = getTime();
    let valueUpdated = e.target.parentElement.childNodes[0].value;

    updateCall(e, valueUpdated, createTime, presentTime, false);

    e.target.parentElement.childNodes[1].innerText = presentTime;

    const completedObj = document.getElementById(todoId);

    let strValue = completedObj.childNodes[0];
    strValue.style = "text-decoration: unset";

    const disableBtn = completedObj.childNodes[2];
    disableBtn.disabled = false;
    disableBtn.style.color = 'white';
    
    const undobtn = completedObj.childNodes[3];
    undobtn.removeEventListener('click', undoComplete);
    undobtn.addEventListener('click', completedTodo);
    undobtn.classList.remove('fas','fa-undo', 'done');
    undobtn.classList.add('fas','fa-check-double', 'undone');
} 