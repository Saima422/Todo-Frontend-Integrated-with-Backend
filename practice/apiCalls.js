// import { apiRequest } from "../apiCalls/taskApi.js";
// import { createTaskEl } from "../components/task.js";

// const url = "http://192.168.0.105:3000/tasks";
// let obj;

// export const getTodos = async () => {
//     let resData = await apiRequest(`${url}`);
//     resData.forEach((item) => {
//         createTaskEl(item);
//     });
// }

// const getTime = () => {
//     var today = new Date();
//     var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
//     var time = today.getHours()+ ":" + today.getMinutes();
//     var dateTime = `${time} ${date}`;

//     return dateTime;
// }

// export const addTodo = async (event) => {
//     event.preventDefault();
//     let taskInputValue = document.taskInput.task.value;
//     document.taskInput.task.value = "";

//     obj = {
//         method: 'POST',
//         body: JSON.stringify({content: taskInputValue, createdAt: getTime(), updatedAt: ""}),
//         headers: {
//             "Content-Type": "application/json"
//         } 
//     }

//     const resData = await apiRequest(`${url}`, obj);
//     // console.log(resData);
//     createTaskEl(resData);
// }

// export const updateCall = (event) => {
//     let taskInputValue = document.taskInput.task.value;
//     document.taskInput.task.value = "";

//     obj = {
//         method: 'POST',
//         body: JSON.stringify({content: taskInputValue, createdAt:"saome time", updatedAt: getTime(), isComplete: true}),
//         headers: {
//             "Content-Type": "application/json"
//         } 
//     }
//     apiRequest(`${url}`, obj);
// }

// export const deleteTodo = (e) => {
//     obj = {
//         method: 'DELETE'
//     }
//     const todoId = e.target.parentElement.id;
//     const removeObj = document.getElementById(todoId);
//     console.log(removeObj.childNodes[0].value);
//     alert(`You are Deleting Task "${removeObj.childNodes[0].value}"`);
//     apiRequest(`${url}/${todoId}`, obj);
//     removeObj.remove();
// }