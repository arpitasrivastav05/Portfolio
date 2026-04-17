    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const showAllBtn = document.getElementById('showAllBtn');
    const showActiveBtn = document.getElementById('showActiveBtn');
    const showCompletedBtn = document.getElementById('showCompletedBtn');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const listTitle = document.getElementById('listTitle');
    const editTitleBtn = document.getElementById('editTitleBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    let title = localStorage.getItem('todoTitle') || 'To-Do List';

    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function saveTitle() {
      localStorage.setItem('todoTitle', title);
    }

    function renderTasks() {
      listTitle.textContent = title;
      taskList.innerHTML = '';

      const filteredTasks = tasks.filter((task) => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
      });

      emptyState.style.display = filteredTasks.length ? 'none' : 'block';
      emptyState.textContent = tasks.length ? 'No tasks in this filter.' : 'No tasks yet. Add one above.';

      filteredTasks.forEach((task) => {
        const actualIndex = tasks.indexOf(task);
        const li = document.createElement('li');

        const left = document.createElement('div');
        left.className = 'task-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(actualIndex));

        const span = document.createElement('span');
        span.textContent = task.text;
        span.className = `task-text ${task.completed ? 'completed' : ''}`;

        const buttons = document.createElement('div');
        buttons.className = 'task-buttons';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(actualIndex));

        left.appendChild(checkbox);
        left.appendChild(span);
        buttons.appendChild(deleteBtn);
        li.appendChild(left);
        li.appendChild(buttons);
        taskList.appendChild(li);
      });
    }

    function addTask() {
      const text = taskInput.value.trim();
      if (!text) return;

      tasks.push({ text, completed: false });
      taskInput.value = '';
      saveTasks();
      renderTasks();
    }

    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }

    function clearCompleted() {
      tasks = tasks.filter(task => !task.completed);
      saveTasks();
      renderTasks();
    }

    function editTitle() {
      const updatedTitle = prompt('Edit your list name:', title);
      if (updatedTitle === null) return;

      const trimmedTitle = updatedTitle.trim();
      if (!trimmedTitle) {
        alert('List name cannot be empty.');
        return;
      }

      title = trimmedTitle;
      saveTitle();
      renderTasks();
    }

    function setFilter(filter) {
      currentFilter = filter;
      renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
    showAllBtn.addEventListener('click', () => setFilter('all'));
    showActiveBtn.addEventListener('click', () => setFilter('active'));
    showCompletedBtn.addEventListener('click', () => setFilter('completed'));
    clearCompletedBtn.addEventListener('click', clearCompleted);
    editTitleBtn.addEventListener('click', editTitle);
    taskInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') addTask();
    });

    renderTasks();

