document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const todoList = document.getElementById("todoList");
  const tasks = getTasks();
  todoList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleTask(index);

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => deleteTask(index);
    deleteBtn.style.border = "none";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.cursor = "pointer";

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.appendChild(checkbox);
    left.appendChild(span);

    li.appendChild(left);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function getTasks() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}
