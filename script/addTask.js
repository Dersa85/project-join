async function addTaskToDatabase(task) {
    console.log('Erstelle den Task: ', task);
    let savedTasks = await backend.getItem('backlog') || [];
    savedTasks.push(task);
    backend.setItem('backlog', savedTasks)
}