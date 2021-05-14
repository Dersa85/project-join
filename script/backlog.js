


function refreshBacklog() {
    let contentContainer = document.getElementById('content-container');
    let backlogTasks = backend.getItem('backlog') || [];
    contentContainer.innerHTML = '';
    backlogTasks.forEach(task => {
        contentContainer.innerHTML += `
        <div class="d-flex margin-bottom-16 backlog-task border-large bg-main">
            <div class="d-flex width-20">
                <img class="margin-r-16" src="" alt="IMG">
                <div>
                    <p class="m-0">Einen Namen</p>
                    <p class="m-0">Eine Email Adresse</p>
                </div>
            </div>
            <p class="width-20 m-0 text-center">Marketing</p>
            <p class="width-60 m-0 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        `
    });
}