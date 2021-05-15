let assignedTo = []; // array for assignTo() function
let currentIndexNumber = 0;

async function createTask() {

    let title = document.getElementById('title');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let dueDate = document.getElementById('dueDate');
    let urgency = document.getElementById('urgency');

    await resetValuesInBackedArray(); // hängt mit der toggle logik zusammen -> assignTo()

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

    removeAllUnderlinedProfiles()
}

function resetValues() {
    assignedTo = []; 
    title.value = '';
    description.value = '';
    dueDate.value = '';
}

async function resetValuesInBackedArray() {
    let members = await getBackendArray('members');
    for (let i = 0; i <= 2; i++) { // fixed for loop: 3 times für den Anfang erst! Adam, Alex, Mikail => 3
        members[i]['alreadyAssigned'] = false;
        members[i]['indexOfArray'] = '';
    }
}

function showProfilePicInBlockElement() {
    let container = document.getElementById('image-container');

    for (let i = 0; i <= 2; i++) { // fixed for loop: 3 times für den Anfang erst! Adam, Alex, Mikail => 3
        container.innerHTML += generateHtmlImageBox(i);
    }
}

function generateHtmlImageBox(i) {
    return `
    <div id="img-of-account-${i}" class="image-box">
        <img onclick="assignTo(${i})" class="profile-picture" src="./img/pp.jpg">
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
        console.log(name + ' is already choosen');
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

    await compareRightSide(i);
    await compareLeftSide(i);

    currentIndexNumber--;
}

async function compareRightSide(i) {
    let members = await getBackendArray('members');

    let value = members[i]['indexOfArray'];
    members[i]['indexOfArray'] = ''; // Leerung

    let neighbourindex = i + 1;
    let valueOfNeighbour;

    if (members[neighbourindex]) {

        for (let j = neighbourindex; j < members.length; j++) {
            valueOfNeighbour = members[j]['indexOfArray'];
            console.log('checking');
            console.log('Comparing ' + i + ' to ' + j);

            if (value < valueOfNeighbour) {
                console.log('minus 1 an dieser Stelle:' + j);
                console.log('Der Wert an der Stelle ' + j + ' beträgt: ' + valueOfNeighbour);
                console.log('Der neue Wert an der Stelle ' + j + ' beträgt: ' + (valueOfNeighbour - 1));
                members[j]['indexOfArray'] = (valueOfNeighbour - 1);
            }
        }

    } else {
        console.log('NeighbourIndex outside the array: Index ' + neighbourindex);
    }

}

async function compareLeftSide(i) {
    let members = await getBackendArray('members');

    let value = members[i]['indexOfArray'];
    members[i]['indexOfArray'] = ''; // Leerung

    let neighbourindex = i - 1;
    let valueOfNeighbour;

    if (members[neighbourindex]) {

        for (let j = neighbourindex; j >= 0; j--) {
            valueOfNeighbour = members[j]['indexOfArray'];
            console.log('checking');
            console.log('Comparing ' + i + ' to ' + j);

            if (value < valueOfNeighbour) {
                console.log('minus 1 an dieser Stelle:' + j);
                console.log('Der Wert an der Stelle ' + j + ' beträgt: ' + valueOfNeighbour);
                console.log('Der neue Wert an der Stelle ' + j + ' beträgt: ' + (valueOfNeighbour - 1));
                members[j]['indexOfArray'] = (valueOfNeighbour - 1);
            }
        }

    } else {
        console.log('NeighbourIndex outside the array: Index ' + neighbourindex);
    }

}

function underlineChoosenProfile(i) {
    document.getElementById('img-of-account-' + i).classList.add('profile-picture-under-border');
}

function removeUnderlineAtChoosenProfile(i) {
    document.getElementById('img-of-account-' + i).classList.remove('profile-picture-under-border');
}

function removeAllUnderlinedProfiles(){
    for (let i = 0; i <= 2; i++) { // fixed for loop: 3 times für den Anfang erst! Adam, Alex, Mikail => 3
        removeUnderlineAtChoosenProfile(i);
    }
}