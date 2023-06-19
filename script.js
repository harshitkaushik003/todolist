// code for changing wallpapers
var body = document.getElementsByTagName('body');
var nav = document.getElementById('nav');
var bars = document.getElementById('bars-icon');
var themesList = document.getElementsByClassName('themes-list');

// this is a check for navbar bars 
// this will help in toggling the wallpaper list 
var navFlag = false;

bars.addEventListener('click', function(){
    navFlag = !navFlag;
    if(navFlag){
        nav.style = "height:250px";
    }else{
        nav.style = "height:40px";
    }

})


for(let i=0; i<themesList.length; i++){
    themesList[i].addEventListener('click', (event)=>{
        var wallpaper = themesList[i].innerHTML;
        body[0].style = `background-image: url("images/${wallpaper}.jpg")`;
    })
}

//main to do code

// the list of task initially empty 
var tasks = [];
const input = document.getElementById('todo-input');  
const counter = document.getElementById('count');
const taskList = document.getElementById('list');
const deleteButton = document.getElementsByClassName('delete');
const completeAllButton = document.getElementById('complete');
const uncompleteAllButton = document.getElementById('uncomplete');
const clearAll = document.getElementById('clear-all');
const addButton = document.getElementById('add-icon');

// this function will add task list to the DOM 
function addTaskDIV(task){
    const list = document.createElement('li');
    list.innerHTML = `
        <input class="custom-checkbox" id='${task.id}' type="checkbox" ${task.done ? 'checked': ''}>
        <label for='${task.id}'>${task.taskName}</label>
        <span class="cross"><i class="fa-solid fa-xmark delete" data-id="${task.id}"></i></span>
    `
    taskList.append(list);
    counter.innerHTML = tasks.length;
}

// rendering the list 
function renderList(){
    taskList.innerHTML = '';
    if(tasks.length == 0){
        counter.innerHTML = 0;
    }
    for(let i=0; i<tasks.length; i++){
        addTaskDIV(tasks[i]);
    }

}

// toggle task using checkbox 
function toggleTask(taskId){
    const task1 = tasks.filter(function(task){
        return task.id == taskId;
    });
    console.log(task1);
    if(task1.length > 0){
        console.log(task1);
        const currentTask = task1[0];
        currentTask.done = !currentTask.done;
        console.log(tasks);
        renderList();
        return;
    }

}

// delete task from list 
function deleteTask(taskId){
    const newTask = tasks.filter(element => element.id != taskId);
    tasks = newTask;
    renderList();
}

// adding task 
function addTask(task){
    tasks.push(task);
    renderList();
}

// handling click event 
function handleClickEvents(e){
    const target = e.target;
    if(target.className.split(" ")[2] === "delete"){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}


// handling keypress 
function handleKeyPress(e){
    if(e.key === 'Enter'){
        const taskName = e.target.value;
        if(!taskName){
            alert("Task List cannot be empty");
            return;
        }
        const task = {
            taskName,
            id : Date.now().toString(),
            done: false
        };
        e.target.value = '';
        addTask(task);
    }

}

// initializing everything 
input.addEventListener('keyup', handleKeyPress);
document.addEventListener('click', handleClickEvents);

// function to clear all the tasks 
clearAll.addEventListener('click', function(){
    tasks = [];
    renderList();
})


// function to complete all the tasks 
completeAllButton.addEventListener('click', function(){
    for(let i=0; i<tasks.length; i++){
        tasks[i].done = true;
    }
    renderList();
})

// function to uncomplete all the tasks 
uncompleteAllButton.addEventListener('click', function(){
    for(let i=0; i<tasks.length; i++){
        tasks[i].done = false;
    }
    renderList();

})

// for add button 
addButton.addEventListener('click', function(){
    const taskName = input.value;
    if(!taskName){
        alert("Task cannot be empty");
        return;
    }

    const task = {
        taskName, 
        id : Date.now().toString(),
        done: false     
    };
    input.value = '';
    addTask(task); 

})