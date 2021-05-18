let assignedTo = []; // array for assignTo() function
let currentIndexNumber = 0;

function createTask() {

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
}

function resetValues() {
    assignedTo = [];
    title.value = '';
    description.value = '';
    dueDate.value = '';
}

async function resetValuesInBackedArray() {
    members = await getBackendArray('members');
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
    for (let i = 0; i <= 2; i++) { // fixed for loop: 3 times für den Anfang erst! Adam, Alex, Mikail => 3
        removeUnderlineAtChoosenProfile(i);
    }
}

let x = 0;

function goFurther() {
    if (x > - 200) {
        x -= 100;
        for (let i = 0; i < 3; i++) {
            translateX(i, x);
        }
    } else {
        console.log('X beträgt: ' + x + ' Bei noch einer Ausführung überhaupt keine Section mehr zu sehen');
    }
}

function goBack() {
    if (x < 0) {
        x += 100;
        for (let i = 0; i < 3; i++) {
            translateX(i, x);
        }
    } else {
        console.log('X beträgt: ' + x + ' Bei noch einer Ausführung überhaupt keine Section mehr zu sehen');
    }

}

function translateX(id, x) {
    document.getElementById('section-' + id).style.transform = `translateX(${x}%)`;
}