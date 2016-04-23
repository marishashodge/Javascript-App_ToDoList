//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first-button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTaskHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var createNewTaskElement = function(taskString) {
  //Create List Item 
  var listItem = document.createElement("li");
  
  //input (checkbox)
  var checkBox = document.createElement("input"); //checkbox
  //label
  var label = document.createElement("label");
  //input (text}
  var editInput = document.createElement("input");
  //button.edit
  var editButton = document.createElement("button");
   //button.delete
  var deleteButton = document.createElement("button");
  
  //Each element needs modifying
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
  
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  //Each element needs appending
  
  return listItem;
}

//Add a new task
var addTask = function() {
  console.log("Add task ...");
  //Create a new list item with the text from the #new-task
  //make sure you cannot save an empty taskInput
  if (taskInput.value == "") {
    
    alert("Please enter a valid input");
    
  }
    
  else {
    
    var listItem = createNewTaskElement(taskInput.value);
    
    //Append listItem to incompleteTaskHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);  
    
    //clear out the input after task is added
    taskInput.value = "";    
  };

}
//Edit an existing task

var editTask = function() {
  console.log("Edit task ...");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
 
  
  //If the class of the parent is .editMode
  if (containsClass) {
      
    //switch from .editMode
    this.innerText = "Edit";
    //label text become the input's value
    
    label.innerText = editInput.value;
      
      }    
  else {
    //switch to .editMode
    //make edit button say "Save"
    this.innerText = "Save";
    //input value becomes the label's text
    editInput.value = label.innerText;
 
};
  
    //Toggle.editMode on the parent
    listItem.classList.toggle("editMode");
  
} 

//Delete an existing task
var deleteTask = function() {
  console.log("Delete task ...");
  
  var listItem = this.parentNode; 
  var ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
  
}

//Mark a task as complete

  var taskCompleted = function() {
    console.log("Task completed ...");
      //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);  
}
//Mark a task as incomplete

var taskIncomplete = function() {
    console.log("Task Incomplete ...");
    //Append the tast list item to #incomplete-task
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);  
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events")
  
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind the editTask to edit button
  editButton.onclick = editTask;
  
  //bind the deleteTask to the delete button
  deleteButton.onclick = deleteTask;
  
  //bind checkBoxEventHandler to the checkbox
  checkBox.onchange = checkBoxEventHandler;
  
}

var ajaxRequest = function() {  
  console.log("AJAX request");  
}


  
//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);



//cycle over the incompleteTaskHolder ul items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted)
}

//cycle over the completeTaskHolder ul items
for (var i = 0; i < completedTaskHolder.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
    }



//change buttons to save and edit
