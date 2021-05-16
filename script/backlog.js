


async function refreshBacklog() {
    let contentContainer = document.getElementById('accordion-container');
    let backlogTasks = await backend.getItem('backlogTasks') || [];
    contentContainer.innerHTML = '';
    for (let i = 0; i < backlogTasks.length; i++) {
        contentContainer.innerHTML += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading-${i}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="true" aria-controls="collapse-${i}">
                ${backlogTasks[i]['title']}
                ${createImgsForTask(backlogTasks[i])}
            </button>
            </h2>
            <div id="collapse-${i}" class="accordion-collapse collapse" aria-labelledby="heading-${i}" data-bs-parent="#accordion-container">
                <div class="accordion-body">
                    <div class="d-flex">
                    ${createDetailContent(backlogTasks[i])}
                    </div>
                    <button class="btn btn-primary confirm-button" onclick="onConfirmButtonPressed(${i})">Confirm</button>
                </div>
            </div>
        </div>
        `;
    }
}

function createImgsForTask(jsonTask) {
    let assignedArray = jsonTask['assignedTo'];
    let template = ``;
    for (let i = 0; i < assignedArray.length; i++) {
        template += `
        <img class="accordion-img" src="./img/pp.jpg">
        `;
    }
    return template;
}


function createDetailContent(jsonTask) {
    let template = `
    <div>
        <p style="font-size: 0.75rem; color: blue;">Category:</p>
        <p>${jsonTask['category']}</p>
    </div>
    <div class="ms-3 border-start ps-3">
        <p style="font-size: 0.75rem; color: blue;">Due Date:</p>
        <p>${jsonTask['dueDate']}</p>
    </div>
    <div class="ms-3 border-start ps-3">
        <p style="font-size: 0.75rem; color: blue;">Urgency:</p>
        <p>${jsonTask['urgency']}</p>
    </div>
    <div class="ms-3 border-start ps-3 ">
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

function deleteConfirmTask() {
    document.getElementById('confirmTask').classList.add('d-none');
}

function onConfirmButtonPressed(index) {
    console.log('on Confirm Button pressed, Task index:', index);
    // TODO
}