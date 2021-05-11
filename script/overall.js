let tasksDb = [];





function getAllTasks() {
    return tasksDb;
}

function addTask(task) {
    tasksDb.push(task);
}

function init(page) {
    generateNavbar(page);
}

//////////////////////  Navbar   //////////////////////////

function generateNavbar(page) {
    addBackgroundColor();
    document.getElementById('nav-bar').innerHTML = `
    <a href="#"><img class="nav-logo" src="./img/joinlogo.png"></a>
    <a id="board" href="#" class="nav-element nav-element-lined">Board</a>
    <a id="backlog" href="#" class="nav-element nav-element-lined">Backlog</a>
    <a id="add-task" href="#" class="nav-element nav-element-lined">Add Task</a>
    <a id="help" href="#" class="nav-element nav-element-lined">Help</a>
    <img class="nav-profile-picture" src="./img/pp.jpg">
    `;
    deleteTheBorder();
    addTheBorder(page);
}

function addTheBorder(page) {
    document.getElementById(page).classList.add('nav-element-lined');
}

function deleteTheBorder() {
    let pages = ['board', 'backlog', 'add-task', 'help'];
    for (let i = 0; i < pages.length; i++) {
        document.getElementById(pages[i]).classList.remove('nav-element-lined');
    }
}

function addBackgroundColor() {
    document.getElementById('nav-bar').classList.add('bg-sec');
}