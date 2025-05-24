// Get elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Add task on button click
addTaskBtn.addEventListener("click", addTask);

// Also add task on Enter key
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("task-btns");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = () => {
        li.classList.toggle("completed");
        saveTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnContainer);

    taskList.appendChild(li);

    taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        taskInput.value = task.text;
        addTask();
        if (task.completed) {
            taskList.lastChild.classList.add("completed");
        }
    });
    taskInput.value = "";
}

loadTasks();
document.getElementById("clearAllBtn").addEventListener("click", () => {
    taskList.innerHTML = "";
    saveTasks();
});
document.getElementById("date").textContent = new Date().toLocaleDateString();