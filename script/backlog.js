


async function refreshBacklog() {
    let contentContainer = document.getElementById('accordion-container');
    let backlogTasks = await backend.getItem('backlogTasks') || [];
    contentContainer.innerHTML = '';
    for (let i = 0; i < backlogTasks.length; i++) {
        contentContainer.innerHTML += `
        <div class="accordion-item bg-main">
            <h2 class="accordion-header" id="heading-${i}">
            <button class="accordion-button collapsed item-button-border-${backlogTasks[i]['category']} urgency-${backlogTasks[i]['urgency']}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="true" aria-controls="collapse-${i}">
                ${await getAssignedImgs(backlogTasks[i]['assignedTo'])}
                ${backlogTasks[i]['title']}
            </button>
            </h2>
            <div id="collapse-${i}" class="accordion-collapse collapse" aria-labelledby="heading-${i}" data-bs-parent="#accordion-container">
                <div class="accordion-body">
                    <div class="item-detail">
                    ${createDetailContent(backlogTasks[i])}
                    </div>
                    <button class="btn btn-primary confirm-button" onclick="onConfirmButtonPressed(${i})">Show details</button>
                </div>
            </div>
        </div>
        `;
    }
}

function createDetailContent(jsonTask) {

    let img = document.createElement('img');
    img.setAttribute('data-titel', 'todo');
    img.setAttribute('content', 'Beschreibung');
    let titel = img.getAttribute('data-titel');
    let template = `
    <div>
        <p style="font-size: 0.75rem; color: blue;">Category:</p>
        <p>${jsonTask['category']}</p>
    </div>
    <div class="item-detail-content">
        <p style="font-size: 0.75rem; color: blue;">Due Date:</p>
        <p>${jsonTask['dueDate']}</p>
    </div>
    <div class="item-detail-content">
        <p style="font-size: 0.75rem; color: blue;">Urgency:</p>
        <p>${jsonTask['urgency']}</p>
    </div>
    <div class="item-detail-content">
        <p style="font-size: 0.75rem; color: blue;">Description:</p>
        <p>${jsonTask['description']}</p>
    </div>
    `;
    return template;
}


/////////////// confirm task /////////////////

function showConfirmTask() {
    document.getElementById('confirmTask').classList.remove('d-none');
}

function closeConfirmTask() {
    document.getElementById('confirmTask').classList.add('d-none');
}

async function onConfirmButtonPressed(index) {
    showConfirmTask();
    let task = await backend.getItem('backlogTasks')[index];
    let createAt = millisecoundsToDateString(task['createdAt']);
    document.getElementById('exampleModalLabel').innerText = task['title'];
    document.getElementById('detail-content').innerHTML = `
        <div>
            <p><b>Assigned to:</b> ${await getAssignedImgs(task['assignedTo'])}</p>
            <p><b>Category:</b> ${task['category']}</p>
            <p><b>Created at:</b> ${createAt}</p>
            <p><b>Due Date:</b> ${task['dueDate']}</p>
            <p><b>Urgency:</b> ${task['urgency']}</p>
            <p><b>Description:</b> ${task['description']}</p>
        </div>
    `;
    document.getElementById('accept-button').setAttribute('onclick', 'acceptTask(' + index + ')');
    document.getElementById('delete-button').setAttribute('onclick', 'deleteTask(' + index + ')');

}

function millisecoundsToDateString(ms) {
    let date = new Date(ms);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getUTCDate()}`
}

async function deleteTask(index) {
    extractFromBacklogTask(index);
    closeConfirmTask();
    refreshBacklog();
}

async function getAssignedImgs(names) {
    if (names.length == 0) {
        return '';
    }
    let returnContent = '';
    for (let i = 0; i < 3; i++) {
        if (names.length > i) {
            let path = await getMemberImgPath(names[i]);
            returnContent += `<img class='accordion-img' src='${path}'>`;
        } else {
            returnContent += `<img class='accordion-img' src='${'img/empty.png'}'>`;
        }
    }
    return returnContent;
}

async function acceptTask(id) {
    let transferTask = await extractFromBacklogTask(id);
    let borderTasks = await backend.getItem('borderTasks') || [];
    transferTask['board-category'] = 'todo';
    borderTasks.push(transferTask);
    backend.setItem('borderTasks', borderTasks);
    closeConfirmTask();
    refreshBacklog();
}

async function extractFromBacklogTask(id) {
    let backlogTasks = await backend.getItem('backlogTasks');
    let task = backlogTasks[id];
    backlogTasks.splice(id, 1);
    backend.setItem('backlogTasks', backlogTasks);
    return task;
}