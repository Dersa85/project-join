
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
    <div class="board-card" onclick="generateInfobox()" draggable="true" ondragstart="startDragging(${index})">
        <h6>${task['title']}</h6>
        <div class="card-pp-container"></div>
    </div>
    `;
}

function generateInfobox(title, description, p1,p2,p3) {
    let infobox = document.getElementById('infobox');
    infobox.classList.remove('d-none');
    infobox.innerHTML = `
        <button onclick="closeInfobox()" class="close-button btn">&#9587;</button>
        <h2 style="border-bottom: 1px solid black; padding: 16px;">${title}</h2>
        <div>
            <img alt="${p1}"></img>
            <img alt="${p2}"></img>
            <img alt="${p3}"></img>
        </div>
        <p>${description}</p>
        <h4>Comments</h4>
        <p>dsajfkdsajdkflskl</p>
        <p>dsajfkdsajdkflskl</p>
        <p>dsajfkdsajdkflskl</p>
        <h4>add Comment</h4>
        <input placeholder="Write a comment" type="text">
        <button>Save</button>
    `;
}

function closeInfobox(){
    let infobox = document.getElementById('infobox');
    infobox.classList.add('d-none');
    infobox.innerHTML='';
}