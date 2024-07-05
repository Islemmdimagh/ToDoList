document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const li = e.target.parentElement;
            taskList.removeChild(li);
            saveTasks();
        } else if (e.target.classList.contains('complete-btn')) {
            const li = e.target.parentElement;
            li.classList.toggle('completed');
            saveTasks();
        }
    });

    function addTask(text, completed = false) {
        const li = document.createElement('li');
        li.textContent = text;
        if (completed) {
            li.classList.add('completed');
        }
        const completeButton = document.createElement('button');
        completeButton.textContent = '';
        completeButton.className = 'complete-btn';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-btn';
        li.prepend(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.childNodes[1].textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => addTask(task.text, task.completed));
        }
    }
});
