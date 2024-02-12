//Dom declaration
const taskList = document.getElementById("taskList");
const taskItem = document.getElementById("taskItem");
const addTaskButton = document.getElementById("addTaskButton");
const removeTaskButton = document.getElementById("removeTaskButton");
const filterButton = document.getElementById("filterButton");

// initalize items
taskList.innerHTML = "";

function addTask() {
// Implement task addition and DOM update
  const userInput = taskItem.value.trim();    
  if (taskItem.value.trim() !== "") {
  deleteTaskButton.disabled = false;
  }   else {
  deleteTaskButton.disabled = true;
  }
  const newTask = document.createElement("li");
  newTask.innerText = userInput;
  taskList.appendChild(taskItem);
} 

function removeTask() {
  const selectedTask = taskList.querySelector(".selected");
  // Check if the clicked element is a task item (adjust the logic based on your HTML structure)
  if (selectedTask.classList.contains("task")) {
    // Toggle the "selected" class on the clicked task
    selectedTask.classList.toggle("selected");

    // Check if there are any selected tasks
    const selectedTasks = taskList.querySelectorAll(".selected");

    // Update the deleteTaskButton's disabled state based on the presence of selected tasks
    deleteTaskButton.disabled = selectedTasks.length === 0;
  }
}


function updateTaskCount()
// Implement task count calculation and display
forEach(newTask)
taskList.length++


function displayTasks()
// Implement task display in the DOM


function filterTasksByCategory()
// Implement task filtering by category and DOM update


// Event Handlers
addTaskButton.addEventListener("click", addTask);
// Initializations


// Use OOP / Objects 
// sort()