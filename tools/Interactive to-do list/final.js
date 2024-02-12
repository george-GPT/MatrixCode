//  1.1 | 1.2 | 1.3 | Declare variables referencing the HTML elements using DOM Manipulation
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
// 2.1 Function to for adding task
function addTask() {
// 2.2  Declare a variable for taskText that gets value of trimmed taskInput 
const taskText = taskInput.value.trim();
// 2.3  Open an if statement checking if the input is not empty, and then executes if that check is met..
    if (taskText !== "") {
// 2.4  Declare variable with dom manipulation to createElement "li" listITem
        const listItem = document.createElement("li");
// 2.5  Declare variable with dom manipulation to createElement "button" deleteButton
        const deleteButton = document.createElement("button");
// 2.6  Use dom manipulation to set a label for deleteButton
        deleteButton.innerText = "Delete";
// 2.7  Use dom manipulation to set a CSS className for styling deletButton
        deleteButton.className = "delete-Button";
// 2.8 Add an EventListener to deleteButton, attaching a click event and function
        deleteButton.addEventListener("click", function(){
// 2.9  subtask to perform the deleteTask function to listItem (deleteTask is declared later)
        deleteTask(listItem); 
// 2.91 close the deletebutton event listener function 
        });
// 3.1 sets the user's input as the content of the task text (DOM manipulation)
        listItem.innerText = taskText;
// 3.2. appendChild() to add deleteButton as a child element to listItem 
        listItem.appendChild(deleteButton);
// 3.3 .appendChild() to set lisItem as a child of taskList
        taskList.appendChild(listItem);
// 3.4 clear value of taskInput so the field is empty for new items
        taskInput.value = "";
// 3.5 close the function & if statement
        }
}
// 4.1 Function to handle deleteTask applying this action to listITem
function deleteTask(listItem) {
// 4.2 sub-argument for taskList that removes child listItem
    taskList.removeChild(listItem);
// 4.3 close the function
}
// 5.1 function to setup event listeners
function setUpEventListeners() {
// 5.2 sub argument that attaches click event to addTaskBtn, executing addTask function
    addTaskBtn.addEventListener("click", addTask);
// 5.3 attach keyup event to taskInput that creates an anonymous function that executes an event
    taskInput.addEventListener("keyup", function (event) {
// 5.4 sub argument that states if event.key is enter, then...
        if (event.key === "Enter") {
// 5.5 perform addTask function        
            addTask();
// 5.5 close the if statement, then the function then the initial function
        }
    });
}
// 5.6 set up event listeners
setUpEventListeners();