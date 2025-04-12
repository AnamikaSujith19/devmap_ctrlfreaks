document.addEventListener('DOMContentLoaded', function() {
  const taskList = document.getElementById('task-list');
  const taskInput = document.getElementById('task-input');
  const taskForm = document.getElementById('task-form');

  // Load tasks from localStorage
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Display saved tasks
  function displayTasks() {
    taskList.innerHTML = ''; // Clear the list before re-rendering
    savedTasks.forEach(task => {
      const li = document.createElement('li');
      li.classList.add(task.completed ? 'completed' : ''); // Add completed class if marked

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleComplete(task));

      const taskText = document.createElement('span');
      taskText.textContent = task.name;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(task));

      li.appendChild(checkbox);
      li.appendChild(taskText);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }

  // Add new task
  taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName) {
      const newTask = {
        name: taskName,
        completed: false,
      };
      savedTasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(savedTasks)); // Save to localStorage
      taskInput.value = ''; // Clear input
      displayTasks(); // Re-render task list
    }
  });

  // Toggle task completion
  function toggleComplete(task) {
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(savedTasks)); // Save updated tasks to localStorage
    displayTasks(); // Re-render task list
  }

  // Delete task
  function deleteTask(task) {
    const taskIndex = savedTasks.indexOf(task);
    if (taskIndex !== -1) {
      savedTasks.splice(taskIndex, 1); // Remove task from array
      localStorage.setItem('tasks', JSON.stringify(savedTasks)); // Save updated tasks to localStorage
      displayTasks(); // Re-render task list
    }
  }

  displayTasks(); // Initial render of tasks
});
