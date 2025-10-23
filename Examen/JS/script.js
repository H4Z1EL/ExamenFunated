
const form = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const message = document.getElementById('message');


document.addEventListener('DOMContentLoaded', loadTasks);

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;

    if (!title || !date) return;

    const task = { title, date, priority, completed: false };
    addTaskToDOM(task);
    saveTask(task);

    form.reset();
    showMessage("¡Tarea añadida con éxito!");
});

function showMessage(text) {
    message.textContent = text;
    message.classList.remove('hidden');
    setTimeout(() => message.classList.add('hidden'), 2000);
}


function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.title} - ${task.date} (${task.priority})</span>`;
    taskList.appendChild(li);
}


function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToDOM);
}

function updateLocalStorage() {
    const items = Array.from(taskList.children).map(li => {
        const [titlePart, datePart, priorityPart] = li.firstChild.textContent.split(' - ');
        const [date, priority] = datePart.split(' (');
        return {
            title: titlePart.trim(),
            date: date.trim(),
            priority: priority.replace(')', '').trim(),
            completed: li.classList.contains('completed')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(items));
}
