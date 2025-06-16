document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from local storage when the page loads
  loadTasks();

  // Event listener for the "Add Task" button click
  addButton.addEventListener("click", () => {
    // Get the task text from the input field and trim whitespace
    const taskText = taskInput.value.trim();
    // Check if the task text is not empty
    if (taskText !== "") {
      addTask(taskText); // Add the task
      taskInput.value = ""; // Clear the input field
    } else {
      // Use a custom message box instead of alert() for better UX
      showMessageBox("Please enter a task.");
    }
  });

  // Event listener for the "keypress" event on the task input field
  taskInput.addEventListener("keypress", (event) => {
    // Check if the pressed key is "Enter"
    if (event.key === "Enter") {
      // Get the task text from the input field and trim whitespace
      const taskText = taskInput.value.trim();
      // Check if the task text is not empty
      if (taskText !== "") {
        addTask(taskText); // Add the task
        taskInput.value = ""; // Clear the input field
      } else {
        // Use a custom message box instead of alert()
        showMessageBox("Please enter a task.");
      }
    }
  });

  /**
   * Adds a new task to the list and optionally saves it to local storage.
   * @param {string} taskText - The text content of the task.
   * @param {boolean} save - Whether to save the task to local storage (default is true).
   */
  function addTask(taskText, save = true) {
    // Create a new list item (li) element
    const li = document.createElement("li");
    li.textContent = taskText; // Set its text content

    // Create a new button element for removing the task
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove"; // Set button text
    removeBtn.classList.add("remove-btn"); // Add a class name for styling using classList.add

    // Assign an onclick event to the remove button
    removeBtn.onclick = function () {
      taskList.removeChild(li); // Remove the li element from the taskList
      removeFromStorage(taskText); // Remove the task from local storage
    };

    li.appendChild(removeBtn); // Append the remove button to the li element
    taskList.appendChild(li); // Append the li element to the taskList

    // Clear the task input field
    taskInput.value = "";

    // If 'save' is true, save the task to local storage
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  function removeFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    storedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  function showMessageBox(message) {
    console.log("Message Box:", message);
  }
});
