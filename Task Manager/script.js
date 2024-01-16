    // script.js

    document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    function toggleTask() {
        const taskItem = this.parentNode;
        taskItem.classList.toggle('completed');
    }

    function removeTask() {
        const taskItem = this.parentNode;
        taskList.removeChild(taskItem);
    }

    document.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    });


function addTask() {
    const taskText = taskInput.value.trim();
    // console.log("kkk")
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', toggleTask);

        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;
        taskTextElement.className = 'span';

        const deleteButton = document.createElement('span');
        deleteButton.className = 'deleteButton';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', removeTask);

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(deleteButton);



        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}
function toggleTask() {
    const taskItem = this.parentNode;
    taskItem.classList.toggle('completed');
}

function removeTask() {
    const taskItem = this.parentNode;
    taskList.removeChild(taskItem);
}

document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
