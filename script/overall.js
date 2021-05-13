

function init(page) {
    startBackend();
    generateNavbar(page);
}

//////////////////////  Backend   //////////////////////////

async function startBackend() {
    setURL('http://gruppe-76.developerakademie.com/smallest_backend_ever');
    await downloadFromServer();
}

async function addTaskToDatabase(task) {
    console.log(task);
}

//////////////////////  Navbar   //////////////////////////

function generateNavbar(page) {
    addBackgroundColor();
    addToInnerHtml();
    deleteTheBorder();
    addTheBorder(page);
}

function addToInnerHtml(){
    document.getElementById('nav-bar').innerHTML = `
    <a href="index.html"><img class="nav-logo" src="./img/joinlogo.png"></a>
    <a id="board" href="board.html" class="nav-element nav-element-lined">Board</a>
    <a id="backlog" href="backlog.html" class="nav-element nav-element-lined">Backlog</a>
    <a id="add-task" href="addTask.html" class="nav-element nav-element-lined">Add Task</a>
    <a id="help" href="help.html" class="nav-element nav-element-lined">Help</a>
    <img class="nav-profile-picture" src="./img/pp.jpg">
    `;
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

