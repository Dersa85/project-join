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
        updateHTML();
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
    <div id="nav-bar-top">
        <a href="index.html"><img class="nav-logo" src="./img/joinlogo.png"></a>
        <a id="board" href="board.html" class="nav-element nav-element-lined">Board</a>
        <a id="backlog" href="backlog.html" class="nav-element nav-element-lined">Backlog</a>
        <a id="add-task" href="addTask.html" class="nav-element nav-element-lined">Add Task</a>
        <a id="help" href="help.html" class="nav-element nav-element-lined">Help</a>
    </div>
    ${addUsernameInNavbar()}
    `;
}

function addUsernameInNavbar() {
    if (getLoggedUsername()) {
        return `
            <div style="width: 100%; padding-left: 16px">
                <p style='color: white; font-size: 25px;'><b>${getLoggedUsername()}</b></p>
                <p style="color: white; font-size: 25px;"><span class='log-out' onclick="logOut()">(log out<span>)</p>
            </div>
        `;
    }
    return '';
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
            <div>
                <a class="closebtn" onclick="closeNav()">&times;</a>
                <a href="index.html">Login</a>
                <a href="board.html">Board</a>
                <a href="backlog.html">Backlog</a>
                <a href="addTask.html">Add Task</a>
                <a href="help.html">Help</a>
            </div>

            ${addUsernameInNavbar()}

        </div>

        <span style="font-size:30px;cursor:pointer;margin-left:8px;" onclick="openNav();">&#9776;</span>
    `;
}

function openNav() {
    document.getElementById("mySidenav").style.width = "70vw";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function dummy(event) {
    event.stopPropagation();
}


function showInfoBox(msg, type) {
    hiddenOldInformationBoxes();
    let titel = getTitel(type);
    let box = createBox(titel, msg, `info-box-bg-${type}`);
    document.body.appendChild(box);
    setTimeout(() => {
        document.body.removeChild(box);
    }, 3000);
}

function hiddenOldInformationBoxes() {
    let oldWarnings = document.getElementsByClassName('warning-box') || [];
    for (let i = 0; i < oldWarnings.length; i++) {
        oldWarnings[i].classList.add('d-none');
    }
}

function createBox(titel, msg, bgColor) {
    let box = document.createElement('div');
    box.classList.add('warning-box');
    box.classList.add(bgColor);
    box.innerHTML = `
        <h2 style="border-bottom: 1px solid black;">${titel}</h2>
        <p>${msg}</p>
    `;
    return box;
}

function getTitel(boxType) {
    if (boxType == 'warning') {
        return 'Warning !!!';
    } else if (boxType == 'success') {
        return 'Success';
    }
    return 'Information';
}

async function getMemberImgPath(name) {
    let members = await backend.getItem('members') || [];
    for (let i = 0; i < members.length; i++) {
        if (members[i]['name'] == name) {
            return members[i]['picturePath'];
        }
    }
}

function getLoggedUsername() {
    return sessionStorage.getItem('loginname');
}

function logOut() {
    sessionStorage.removeItem('loginname');
    location.reload();
}