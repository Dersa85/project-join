
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

async function generateInfobox(index) {
    let tasks = await backend.getItem('borderTasks') || [];
    let task = await tasks[index];
    console.log('####', task);

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
        <h5>Days left: X</h5>
    </div>

    <div class="info-box-margin-left">
        <img class="accordion-img" src="./img/pp.jpg"></img>
        <img class="accordion-img" src="./img/pp.jpg"></img>
        <img class="accordion-img" src="./img/pp.jpg"></img>
    </div>

    <div class="overflow">
        <h5 class="color-titel" style="margin-top: 1em;">Description:</h5>
        <p class="info-box-margin-left detail-description-field">${task['description']}</p>

        <h5 class="color-titel">Comments:</h5>
        <div class="d-flex info-box-margin-left align-items-center mb-3 detail-comments-field">
            <h6 style="margin-bottom: 0;"><b>Write comment:</b></h6>
            <input style="margin-left: 16px" type="text"><button class="btn btn-primary">Add</button>
        </div>

        <div class="info-box-margin-left">
            <p><b>Alex:</b> Eine Nachricht von mir</p>
            <p><b>Alex:</b> Eine Nachricht von dir</p>
            <p><b>Alex:</b> Eine Nachricht von euch</p>
        </div>
    </div>
    `;
}

async function deleteTask(index){
    let tasks = await backend.getItem('borderTasks') || [];
    let task = await tasks[index];
    tasks = await tasks.splice(index,1);
    await backend.setItem('borderTasks') || [];
    updateHTML();
    closeInfobox();
    console.log(tasks);
}

function closeInfobox() {
    let infobox = document.getElementById('infobox');
    infobox.classList.add('d-none');
    infobox.innerHTML = '';
}