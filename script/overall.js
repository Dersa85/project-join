let members;

async function init(page = '') {
    await startBackend();
    generateNavbar(page);
    generateResponsiveNavbar();

    members = await getBackendArray('members');

    if (page == 'backlog') {
        await refreshBacklog();
    }
    else if (page == 'add-task') {
        showProfilePicInBlockElement();
    }
    else if (page == 'board') {
        await updateHTML();
    }
}

//////////////////////  Backend   //////////////////////////

async function startBackend() {
    setURL('http://gruppe-76.developerakademie.com/smallest_backend_ever');
    await downloadFromServer();
}

function getBackendArray(key) {
    return backend.getItem(key) || [];
}

function setBackendArray(key, array) {
    backend.setItem(key, array);
}

async function addObjectToDatabase(key, json) {
    let array = await getBackendArray(key);
    array.push(json);
    setBackendArray(key, array);
}

//////////////////////  Navbar   //////////////////////////

function generateNavbar(page) {
    addBackgroundColor();
    addToInnerHtml();
    deleteTheBorder();
    addTheBorder(page);
}

function addToInnerHtml() {
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
    if (page) {
        document.getElementById(page).classList.add('nav-element-lined');
    }
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

///////////// RESPONSIVE NAVBAR ////////////////////

function generateResponsiveNavbar() {
    document.getElementById('responsive-navbar').innerHTML = `
        <div id="mySidenav" class="sidenav">
            <a class="closebtn" onclick="closeNav()">&times;</a>
            <a href="index.html">Login</a>
            <a href="board.html">Board</a>
            <a href="backlog.html">Backlog</a>
            <a href="addTask.html">Add Task</a>
            <a href="help.html">Help</a>
        </div>

        <span style="font-size:30px;cursor:pointer;margin-left:8px;" onclick="openNav()">&#9776;</span>
    `;
}

function openNav() {
    document.getElementById("mySidenav").style.width = "70vw";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
