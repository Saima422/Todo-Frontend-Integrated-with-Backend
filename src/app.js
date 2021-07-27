const taskForm = document.getElementById('task-form');
const root = document.getElementById('root');

let taskarr = [];

window.onload = function() {
    previousArr = JSON.parse(localStorage.getItem('tasks'));
    if(previousArr != null){
        previousArr.forEach((item) => {
            displayOnDOM(createTaskEl(item));
            checkAllValues(item);
        });
        taskarr = [...previousArr];
        previousArr = [];
    }
    return ;
  };

const checkAllValues = (el) => {
    if(el.isCompleted){
        const completedObj = document.getElementById(el.taskId);
        let strValue = completedObj.childNodes[0];
        strValue.style = "text-decoration: line-through";

        const disableBtn = completedObj.childNodes[2];
        disableBtn.disabled = true;
        disableBtn.style.color = 'grey';

        const undobtn = completedObj.childNodes[3];
        undobtn.setAttribute('onclick', `undoComplete(event)`);
        undobtn.classList.remove('fas','fa-check-double');
        undobtn.classList.add('fas','fa-undo');
    }
    if(el.isEdited){
        const updateObj = document.getElementById(el.taskId);

        if(!updateObj.childNodes[0].value.includes(' -(edited)')){
            updateObj.childNodes[0].value += ' -(edited)';
        }
    }
    return ;
}

function TaskConstructor(desc){
    this.taskId = uuidv4();
    this.desc = desc;
    this.isCompleted = false;
    this.createdAt = getTime();
    this.isEdited = false;
}

const getTime = () => {
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours()+ ":" + today.getMinutes();
    var dateTime = `${time} ${date}`;

    return dateTime;
}

const validateInput = (validateStr) => {
    if(validateStr.trim() != ""){
        return validateStr.trim();
    }
    alert("Please enter a valid string.");
    throw new Error("Invalid String"); 
}

const setlocalStorage = () => {
    localStorage.setItem('tasks',JSON.stringify(taskarr));
}

const taskSubmission = (e) => {
    e.preventDefault();
    let taskInputValue = document.taskInput.task.value;

    taskInputValue = validateInput(taskInputValue);

    document.taskInput.task.value = "";
    const task = new TaskConstructor(taskInputValue);
    taskarr.push(task);
    setlocalStorage();
    const taskContainer = createTaskEl(task);
    displayOnDOM(taskContainer);
}

taskForm.addEventListener('submit', taskSubmission);


const createTaskEl = (task) => {
    const markup = document.createElement('div');
    markup.classList.add('task-container');
    markup.id = task.taskId;

    const input = document.createElement('input');
    input.classList.add('task-update-input');
    input.value = task.desc;
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
    btn1.setAttribute('onclick', `updateTodo(event)`);

    const btn2 = document.createElement('button');
    btn2.classList.add('btn', 'btn-complete');
    const i2 = document.createElement('i');
    btn2.classList.add('fa', 'fa-lg', 'fa-check-double');
    btn2.appendChild(i2);
    markup.appendChild(btn2);
    btn2.setAttribute('onclick', `completedTodo(event)`);

    const btn3 = document.createElement('button');
    btn3.classList.add('btn', 'btn-delete');
    const i3 = document.createElement('i');
    btn3.classList.add('fa', 'fa-lg', 'fa-trash');
    btn3.appendChild(i3);
    markup.appendChild(btn3);
    btn3.setAttribute('onclick', `deleteTodo(event)`);

    return markup;
};

const displayOnDOM = (taskContainer) => {
    root.appendChild(taskContainer);
}

const deleteTodo = (e) =>{
    const todoId = e.target.parentElement.id;

    let index = taskarr.findIndex(item => item.taskId === todoId);
    alert(`You are deleting "${taskarr[index].desc}"`);
    taskarr.splice(index, 1);
    setlocalStorage();

    const removeObj = document.getElementById(todoId);
    removeObj.remove();
}

const completedTodo = (e) => {
    const todoId = e.target.parentElement.id;

    let index = taskarr.findIndex(item => item.taskId === todoId);
    taskarr[index].isCompleted = true;
    setlocalStorage();

    const completedObj = document.getElementById(todoId);

    let strValue = completedObj.childNodes[0];
    strValue.style = "text-decoration: line-through";

    const disableBtn = completedObj.childNodes[2];
    disableBtn.disabled = true;
    disableBtn.style.color = 'grey';

    const undobtn = completedObj.childNodes[3];
    undobtn.setAttribute('onclick', `undoComplete(event)`);
    undobtn.classList.remove('fas','fa-check-double');
    undobtn.classList.add('fas','fa-undo');
}

const undoComplete = (e) => {
    const todoId = e.target.parentElement.id;

    let index = taskarr.findIndex(item => item.taskId === todoId);
    taskarr[index].isCompleted = false;
    setlocalStorage();

    const completedObj = document.getElementById(todoId);

    let strValue = completedObj.childNodes[0];
    strValue.style = "text-decoration: unset";

    const disableBtn = completedObj.childNodes[2];
    disableBtn.disabled = false;
    disableBtn.style.color = 'white';
    
    const undobtn = completedObj.childNodes[3];
    undobtn.setAttribute('onclick', `completedTodo(event)`);
    undobtn.classList.remove('fas','fa-undo');
    undobtn.classList.add('fas','fa-check-double');
} 

const updateTodo = (e) => {
    const todoId = e.target.parentElement.id;

    const updateObj = document.getElementById(todoId);

    let strValue = updateObj.childNodes[0];
    strValue.disabled = false;
    strValue.style.color = "black";

    const disableBtn = updateObj.childNodes[3];
    disableBtn.disabled = true;
    disableBtn.style.color = 'grey';

    const updatebtn = updateObj.childNodes[2];
    updatebtn.setAttribute('onclick', `confirmTodo(event)`);
    updatebtn.classList.remove('fa','fa-edit');
    updatebtn.classList.add('far','fa-check-circle');
}

const confirmTodo = (e) => {
    const todoId = e.target.parentElement.id;

    const updateObj = document.getElementById(todoId);

    let strValue = updateObj.childNodes[0];
    let valueUpdated = strValue.value;

    // value not getting trimmed********************************
    valueUpdated = validateInput(valueUpdated);    

    strValue.disabled = true;
    strValue.style.color = "white";

    const disableBtn = updateObj.childNodes[3];
    disableBtn.disabled = false;
    disableBtn.style.color = 'white';

    if(!updateObj.childNodes[0].value.includes(' -(edited)')){
        updateObj.childNodes[0].value += ' -(edited)';
    }

    let index = taskarr.findIndex(item => item.taskId === todoId);
    taskarr[index].isEdited = true;
    taskarr[index].desc = valueUpdated;
    setlocalStorage();

    const updatebtn = updateObj.childNodes[2];
    updatebtn.setAttribute('onclick', `updateTodo(event)`);
    updatebtn.classList.remove('far','fa-check-circle');
    updatebtn.classList.add('fa','fa-edit');
}