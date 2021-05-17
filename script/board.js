let tasks = [{
    'id': 0,
    'title': 'todo',
    'category': 'todo'
}, {
    'id': 1,
    'title': 'progress',
    'category': 'progress'
}, {
    'id': 2,
    'title': 'testing',
    'category': 'testing'
}, {
    'id': 3,
    'title': 'done',
    'category': 'done'
}];

let currentDraggedElement;



function updateHTML() {
    let categorysID = ['todo', 'progress', 'testing', 'done'];

    for (let x = 0; x < categorysID.length; x++) {
        const y = categorysID[x];
        document.getElementById(y).innerHTML = '';
        document.getElementById(y).classList.remove('drag-area-highlight');

        let filteredArray = tasks.filter(t => t['category'] == `${y}`);

        for (let i = 0; i < filteredArray.length; i++) {
            const element = filteredArray[i];
            document.getElementById(y).innerHTML += generateTodoHTML(element);
        }
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    currentDraggedElement = id;
}

function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function generateTodoHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="card" style="width: 80%;margin-top: 25px;background-color: beige">
                <div class="card-body">
                    <h6 class="card-title" style="font-size: 1.05rem;">${element['title']}</h6>
                    <p class="card-text" style="font-size: 0.9rem;">Here can be icons</p>
                </div>
            </div>`;
}