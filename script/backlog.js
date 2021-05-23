


async function refreshBacklog() {
    let contentContainer = document.getElementById('accordion-container');
    let backlogTasks = await backend.getItem('backlogTasks') || [];
    contentContainer.innerHTML = '';
    for (let i = 0; i < backlogTasks.length; i++) {
        contentContainer.innerHTML += `
        <div class="accordion-item bg-main">
            <h2 class="accordion-header" id="heading-${i}">
            <button class="accordion-button collapsed item-button-border-${backlogTasks[i]['category']} urgency-${backlogTasks[i]['urgency']}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="true" aria-controls="collapse-${i}">
                ${createImgsForTask(backlogTasks[i])}
                ${backlogTasks[i]['title']}
            </button>
            </h2>
            <div id="collapse-${i}" class="accordion-collapse collapse" aria-labelledby="heading-${i}" data-bs-parent="#accordion-container">
                <div class="accordion-body">
                    <div class="item-detail">
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
    for (let i = 0; i < 3; i++) {
        if (assignedArray.length <= 3) {
            template += `<img class="accordion-img" src=${getImgPath(assignedArray[i])}></img>`;
        } else {
            template += `<img class="accordion-img" src="./img/empty.png"></img>`;
        }
    }
    return template;
}

function getImgPath(member) {
    if (member == 'Adam') {
        return './img/na.jpg';
    } else if (member == 'Mikail') {
        return './img/mikail.jpg';
    } else if (member == 'Alex') {
        return './img/alex.png';
    }
    console.log('Member:', member, 'has no Picture');
    return './img/empty.png';
}

function createDetailContent(jsonTask) {
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

function deleteConfirmTask() {
    document.getElementById('confirmTask').classList.add('d-none');
}

function onConfirmButtonPressed(index) {
    console.log('on Confirm Button pressed, Task index:', index);
    // TODO
}