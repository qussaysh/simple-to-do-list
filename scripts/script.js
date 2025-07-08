// Default tasks (used only if localStorage is empty)
let tasks = [

];

// DOM elements
const tasksContainer = document.getElementById("tasks");
const addButton = document.getElementById("add-btn");

// Load tasks from localStorage if available
function loadTasksFromLocalStorage() {
  const stored = localStorage.getItem("tasks");
  if (stored) tasks = JSON.parse(stored);
}

// Save current task list to localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render all tasks to the page
function renderTasks() {
  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const bgColor = task.isDone ? "#9EDF9C" : "#C0C9EE";
    const btColor = task.isDone ? "#AEEA94" : "#91C8E4"

    const content = `
      <div class="task" style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: ${bgColor};
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 6px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.1);
      ">
        <!-- Task Info -->
        <div style="width: 70%;">
          <h2 style="margin: 0;">${task.title}</h2>
          <div style="display: flex; align-items: center; gap: 5px;">
            <span class="material-symbols-outlined">calendar_today</span>
            <span style="font-weight: bold;">${task.date}</span>
          </div>
        </div>

        <!-- Task Actions -->
        <div style="display: flex; gap: 5px;">
          <button onclick="deleteTask(${index})" class="circular-btn" style="background: #f93535; color: white;">
            <span class="material-symbols-outlined">delete</span>
          </button>
          <button onclick="toggleTaskDone(${index})" class="circular-btn" style="background: ${btColor}; color: white;">
            <span class="material-symbols-outlined">check</span>
          </button>
          <button onclick="editTask(${index})" class="circular-btn" style="background: #4646e8; color: white;">
            <span class="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>
    `;

    tasksContainer.innerHTML += content;
  });
}

// Add a new task
function addTask() {
  const taskTitle = prompt("Enter task title:");
  if (taskTitle) {
    const newTask = {
      title: taskTitle,
      date: new Date().toLocaleDateString(),
      isDone: false
    };
    tasks.push(newTask);
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Delete a task by index
function deleteTask(index) {
  const confirmed = confirm(`Are you sure you want to delete the task: "${tasks[index].title}"?`);
  if (confirmed) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Edit a task title
function editTask(index) {
  const newTitle = prompt("Edit task title:", tasks[index].title);
  if (newTitle) {
    tasks[index].title = newTitle;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Toggle task completion
function toggleTaskDone(index) {
  tasks[index].isDone = !tasks[index].isDone;
  saveTasksToLocalStorage();
  renderTasks();
}

// Initial loading and rendering
loadTasksFromLocalStorage();
renderTasks();

// Add event listener to "Add Task" button
addButton.addEventListener("click", addTask);
