const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const taskDateInput = document.getElementById('task-date');
const taskTimeInput = document.getElementById('task-time');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = taskInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskTime = taskTimeInput.value;
    if (taskName && taskDate && taskTime) {
        const task = {
            name: taskName,
            date: new Date(`${taskDate}T${taskTime}:00`),
            timer: 0,
            snooze: false
        };
        tasks.push(task);
        renderTaskList();
        taskInput.value = '';
        taskDateInput.value = '';
        taskTimeInput.value = '';
    }
});

function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskHTML = `
            <li class="task">
                <span class="task-name">${task.name}</span>
                <span class="task-timer">${formatTimer(task.timer)}</span>
                <span class="task-date">${formatDate(task.date)}</span>
                <button class="snooze-btn" onclick="snoozeTask(${tasks.indexOf(task)})">Snooze</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });
}

function formatTimer(timer) {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}m ${seconds}s`;
}

function formatDate(date) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function snoozeTask(index) {
    tasks[index].snooze = true;
    setTimeout(() => {
        tasks[index].snooze = false;
        renderTaskList();
    }, 30000); // 30 seconds
}

setInterval(() => {
    tasks.forEach((task) => {
        if (!task.snooze) {
            task.timer++;
        }
    });
    renderTaskList();
}, 1000); // 1 second