function addTask() {

    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('dueDate').value;
    let urgency = document.getElementById('urgency').value;

    let task = {
        'title': title,
        'category': category,
        'description': description,
        'board-category': '',
        'createdAt': new Date().getDate(),
        'dueDate': dueDate,
        'urgency': urgency,
        'assignedTo': ''
    }
}

async function addTaskToDatabase(task) {
    console.log('Erstelle den Task: ', task);
    let savedTasks = await backend.getItem('backlog') || [];
    savedTasks.push(task);
    backend.setItem('backlog', savedTasks)
}