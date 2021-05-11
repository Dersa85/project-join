let tasksDb = [];





function getAllTasks() {
    return tasksDb;
}

function addTask(task) {
    tasksDb.push(task);
}

function init() {
    generateNavbar();
}

function generateNavbar() {
    document.getElementById('nav-bar').classList.add('bg-sec'); // add the background color
    document.getElementById('nav-bar').innerHTML = `
    <a href="#"><img class="nav-logo" src="./img/joinlogo.png"></a>
    <a href="#" class="nav-element">Board</a>
    <a href="#" class="nav-element">Backlog</a>
    <a href="#" class="nav-element">Add Task</a>
    <a href="#" class="nav-element">Help</a>
    <img class="nav-profile-picture" src="./img/pp.jpg">
    `;
}