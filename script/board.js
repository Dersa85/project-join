
let currentDraggedElement;

async function updateHTML(tasks = null) {
    if (tasks == null) {
        tasks = await backend.getItem('borderTasks') || [];
    }
    clearBoard();
    
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
    <div class="board-card" draggable="true" ondragstart="startDragging(${index})">
        <h6>${task['title']}</h6>
    </div>
    `;
    /*
    return `<div draggable="true" ondragstart="startDragging(${index})" class="card" style="width: 80%;margin-top: 25px;background-color: beige">
                <div class="card-body">
                    <h6 class="card-title" style="font-size: 1.05rem;">${task['title']}</h6>
                    <p class="card-text" style="font-size: 0.9rem;">Here can be icons</p>
                </div>
            </div>`;
    */
}