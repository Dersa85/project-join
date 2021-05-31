
let currentDraggedElement;

async function updateHTML(tasks = null) {
    if (tasks == null) {
        tasks = await backend.getItem('borderTasks') || [];
    }
    clearBoard();
    console.log(tasks);

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let card = generateHTML(task, i);
        document.getElementById(task['board-category']).innerHTML += card;
    }
}

function clearBoard() {
    let categorysID = ['todo', 'progress', 'testing', 'done'];
    categorysID.forEach(category => {
        document.getElementById(category).innerHTML = '';
        document.getElementById(category).classList.remove('drag-area-highlight');
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    currentDraggedElement = id;
}

async function moveTo(category) {
    if (currentDraggedElement != null) {
        let tasks = await backend.getItem('borderTasks');
        tasks[currentDraggedElement]['board-category'] = category;
        await backend.setItem('borderTasks', tasks);
        currentDraggedElement = null;
        updateHTML(tasks);
    }
}

function highlight(id) {
    if (currentDraggedElement != null) {
        document.getElementById(id).classList.add('drag-area-highlight');
    }
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function generateHTML(task, index) {
    return `
    <div class="board-card" onclick="generateInfobox(${task, index})" draggable="true" ondragstart="startDragging(${index})">
        <h6>${task['title']}</h6>
        <div class="card-pp-container"></div>
    </div>
    `;
}

function getDaysLeft(dueDate) {
    let date = new Date(dueDate);
    let differenceDate = date - Date.now();
    let dayfactor = 1000*3600*24;

    return Math.floor(differenceDate/dayfactor);
}

async function generateInfobox(index) {
    let tasks = await backend.getItem('borderTasks') || [];
    let task = await tasks[index];

    let daysLeft = getDaysLeft(task['dueDate'])
    
    
    let infobox = document.getElementById('infobox');
    infobox.classList.remove('d-none');
    infobox.innerHTML = `
    <div class="d-flex justify-content-between mb-3" style="border-bottom: 2px solid black;">
        <h2 style="padding: 16px;">${task['title']}</h2>
        <div>
            <button onclick="deleteTask(${index})" class="btn btn-primary">Delete</button>
            <button onclick="closeInfobox()" class="btn btn-secondary">&#9587;</button>
        </div>
    </div>

    <div class="d-flex justify-content-between">
        <h5 class="color-titel">Assignet to:</h5>
        ${createDaysParagraph(daysLeft)}
    </div>

    <div id='images' class="info-box-margin-left">
        ${await getAssignedToImages(task['assignedTo'])}
    </div>

    <div class="overflow">
        <h5 class="color-titel" style="margin-top: 1em;">Description:</h5>
        <p class="info-box-margin-left detail-description-field">${task['description']}</p>

        <h5 class="color-titel">Comments:</h5>
        <div class="d-flex info-box-margin-left align-items-center mb-3 detail-comments-field">
            <h6 style="margin-bottom: 0;"><b>Write comment:</b></h6>
            <input id="comments-input" style="margin-left: 16px; margin-right: 16px;" type="text"><button onclick="addNewComments(${index})" class="btn btn-primary">Add</button>
        </div>

        <div class="info-box-margin-left detail-description-field">
            ${getCommentsParagraphs(task['comments'] || [])}
        </div>
    </div>
    `;
}


function getCommentsParagraphs(comments) {
    let template = '';
    comments.forEach(comment => {
        template += `<p style='word-break: break-word;'>${comment}</p>`
    });
    return template;
}


async function addNewComments(index) {
    let user = sessionStorage.getItem('loginname') || '&ltanonym&gt'; //b&gt;&lt;/b
    console.log(user);
    let newComments = document.getElementById('comments-input').value;
    let tasks = await backend.getItem('borderTasks');
    let allComments = tasks[index]['comments'] || [];
    allComments.push(`<b>${user}: </b>${newComments}`);
    tasks[index]['comments'] = allComments;
    await backend.setItem('borderTasks', tasks);
    generateInfobox(index);
}

function createDaysParagraph(days) {
    if (days >= 0) {
        return `<h5>Days left: ${days}</h5>`;
    } else {
        return `<h5>Days overdue: ${days*-1}</h5>`;
    }
}

async function getAssignedToImages(names) {
    let imgTemplate = '';
    for (let i = 0; i < names.length; i++) {
        let path = await getMemberImgPath(names[i]);
        imgTemplate += `<img class="accordion-img" src="${path}"></img>`;
    }
    return imgTemplate;
}

async function deleteTask(index) {
    let tasks = await backend.getItem('borderTasks') || [];
    let task = await tasks[index];
    tasks.splice(index, 1);
    await backend.setItem('borderTasks',tasks);
    updateHTML(tasks);
    closeInfobox();
}

function closeInfobox() {
    let infobox = document.getElementById('infobox');
    infobox.classList.add('d-none');
    infobox.innerHTML = '';
}