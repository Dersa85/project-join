function createTask() {

    if (isfilled('description')) {

        let title = document.getElementById('title');
        let category = document.getElementById('category');
        let description = document.getElementById('description');
        let dueDate = document.getElementById('dueDate');
        let urgency = document.getElementById('urgency');

        resetValuesInBackedArray(); // hängt mit der toggle logik zusammen -> assignTo()

        let task = {
            'title': title.value,
            'category': category.value,
            'description': description.value,
            'createdAt': new Date().getTime(),
            'dueDate': dueDate.value,
            'urgency': urgency.value,
            'board-category': '',
            'assignedTo': assignedTo
        }

        addObjectToDatabase('backlogTasks', task);
        resetValues();

        removeAllUnderlinedProfiles();
        goBack(); // da unser Section-Slide-Container nur 2 Sections besitzt: wieder zur ersten gewandert. Sobald xSections > 2 Problem!
        showInfoBox('Task wurde erstellt!', 'success');
    } else {
        showInfoBox('Please enter value', 'warning');
    }
}

function resetValues() {
    title.value = '';
    dueDate.value = '';
    description.value = '';
    assignedTo = [];
}

async function resetValuesInBackedArray() {
    members = await getBackendArray('members');
    for (let i = 0; i <= 2; i++) { // fixed for loop: 3 times für den Anfang erst! Adam, Alex, Mikail => 3
        members[i]['alreadyAssigned'] = false;
        members[i]['indexOfArray'] = '';
    }
}

// ------------------------ AsignTo ----------------------------

let assignedTo = [];
let currentIndexNumber = 0;

function showProfilePicInBlockElement() {
    let container = document.getElementById('image-container');

    for (let i = 0; i <= 2; i++) { // fixed for loop: 3 times für den Anfang erst! Adam, Alex, Mikail => 3
        container.innerHTML += generateHtmlImageBox(i);
    }
}

function generateHtmlImageBox(i) {
    return `
    <div id="img-of-account-${i}" class="image-box">
        <img onclick="assignTo(${i})" class="profile-picture" src="${members[i]['picturePath']}">
    </div>
    `;
}

async function assignTo(index) {
    let members = await getBackendArray('members');
    let i = index; // make this within the function global
    let name = members[i]['name'];
    let alreadyAssigned = members[i]['alreadyAssigned']; // boolean

    if (!alreadyAssigned) {
        console.log(name + ' wurde ausgewählt');
        selectProfile(i, members, name);
    } else {
        console.log(name + ' wurde abgewählt');
        removeSelectedProfile(i, members, name);
    }
}

function selectProfile(i, array, name) {
    underlineChoosenProfile(i);
    array[i]['alreadyAssigned'] = true;

    assignedTo.push(name);
    array[i]['indexOfArray'] = currentIndexNumber;

    currentIndexNumber++;
}

async function removeSelectedProfile(i, array, name) {
    removeUnderlineAtChoosenProfile(i);
    array[i]['alreadyAssigned'] = false;

    let indexOfArray = array[i]['indexOfArray'];
    assignedTo.splice(indexOfArray, 1);
    correctIndexNumberInMemberObject(i);

    currentIndexNumber--;
}

async function correctIndexNumberInMemberObject(i) {

    let members = await getBackendArray('members');

    let value = members[i]['indexOfArray'];
    members[i]['indexOfArray'] = ''; // Leerung

    let valueOfNeighbour;

    members.forEach(member => {
        let valueOfNeighbour = member['indexOfArray'];

        if (value < valueOfNeighbour) {
            console.log('minus 1');
            member['indexOfArray'] = valueOfNeighbour - 1;
        }
    });

}

function underlineChoosenProfile(i) {
    document.getElementById('img-of-account-' + i).classList.add('profile-picture-under-border');
}

function removeUnderlineAtChoosenProfile(i) {
    document.getElementById('img-of-account-' + i).classList.remove('profile-picture-under-border');
}

function removeAllUnderlinedProfiles() {
    for (let i = 0; i <= 2; i++) { // fixed for-loop: 3 times für den Anfang erst! Adam, Alex, Mikail => 3
        removeUnderlineAtChoosenProfile(i);
    }
}

// ------------------------ Section-Slider ----------------------------

let x = 0; // translateX(x) of the block-section -> for the movement
let blocks = document.getElementsByClassName('block'); // the sections

function goFurther() {
    if (getLoggedUsername()) {
        if (isfilled('title') && isfilled('dueDate')) {

            // movement
            x -= 100;
            moveSections();

            // setting & changing card-footer buttons
            setCreateTaskBtn('create Task', 'createTask()');
            setGoBackBtn(generateHtmlGoBackBtn(), '|');

        } else {
            showInfoBox('Please enter value', 'warning');
        }
    } else {
        showInfoBox('Please login first', 'warning');
    }
}

function isfilled(id) {
    let value = document.getElementById(id).value;
    let lengthOfValue = value.length;
    if (lengthOfValue != 0) {
        return true;
    } else {
        return false;
    }
}

function goBack() {

    // movement
    x += 100;
    moveSections();

    // setting & changing card-footer buttons
    setCreateTaskBtn('go', 'goFurther()');
    setGoBackBtn('', '');
}

function moveSections() {
    for (let i = 0; i < blocks.length; i++) {
        translateX(i, x);
    }
}

function translateX(id, x) {
    document.getElementById('section-' + id).style.transform = `translateX(${x}%)`;
}

function setCreateTaskBtn(innerValue, onclickFunctionName) {
    let createTaskBtn = document.getElementById('create-task-btn');
    createTaskBtn.innerHTML = innerValue;
    createTaskBtn.setAttribute('onclick', onclickFunctionName);
}

function setGoBackBtn(innerValue1, innerValue2) {
    document.getElementById('i-want-go-back-please').innerHTML = innerValue1;
    document.getElementById('char').innerHTML = innerValue2;
}

function generateHtmlGoBackBtn() {
    return '<button onclick="goBack()" class="foooter-btn">back</button>';
}