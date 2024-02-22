const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const taskLocationInput = document.getElementById('taskLocationInput');
const taskDateTimeInput = document.getElementById('taskDateTimeInput');
const taskTransportationInput = document.getElementById('taskTransportationInput');
const taskPickupTimeInput = document.getElementById('taskPickupTimeInput');
const taskAssignedToInput = document.getElementById('taskAssignedToInput'); // New input field
const taskNotsInput = document.getElementById('taskNotsInput'); // New input field
const modalBackdrop = document.getElementById('modalBackdrop');
const addTaskBackdrop = document.getElementById('addTaskBackdrop');
const taskModal = document.getElementById('taskModal');
const taskModalText = document.getElementById('taskModalText');
const taskLocationText = document.getElementById('taskLocationText');
const taskDateTimeText = document.getElementById('taskDateTimeText');
const taskTransportationText = document.getElementById('taskTransportationText');
const taskPickupTimeText = document.getElementById('taskPickupTimeText');
const taskAssignedToText = document.getElementById('taskAssignedToText'); // New text element

function openModal() {
  addTaskBackdrop.style.display = 'flex';
}

function closeModals() {
  addTaskBackdrop.style.display = 'none';
  modalBackdrop.style.display = 'none';
  taskInput.value = '';
  taskLocationInput.value = '';
  taskDateTimeInput.value = '';
  taskTransportationInput.value = '';
  taskPickupTimeInput.value = '';
  taskAssignedToInput.value = '';
  taskNotsInput.value = ''; // Clear notes input
}

function closeAddTaskModal() {
  addTaskBackdrop.style.display = 'none';
  taskInput.value = '';
  taskLocationInput.value = '';
  taskDateTimeInput.value = '';
  taskTransportationInput.value = '';
  taskPickupTimeInput.value = '';
  taskAssignedToInput.value = '';
  taskNotsInput.value = ''; // Clear notes input
}

function addTask() {
  const taskText = taskInput.value.trim();
  const taskLocation = taskLocationInput.value.trim();
  const taskDateTime = taskDateTimeInput.value;
  const taskTransportation = taskTransportationInput.value.trim();
  const taskPickupTime = taskPickupTimeInput.value;
  const taskAssignedTo = taskAssignedToInput.value.trim();
  const taskNots = taskNotsInput.value.trim(); // Get notes value
  if (taskText !== '') {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.innerHTML = `
      <span>${taskText}</span>
      <button class="delete-btn" onclick="deleteTask(event)">Delete</button>
      <button class="details-btn" onclick="openTaskModal(event, '${taskText}', '${taskLocation}', '${taskDateTime}', '${taskTransportation}', '${taskPickupTime}', '${taskAssignedTo}', '${taskNots}')">Details</button>
    `;
    taskList.appendChild(taskElement);

    saveTaskToLocalStorage({
      text: taskText,
      location: taskLocation,
      dateTime: taskDateTime,
      transportation: taskTransportation,
      pickupTime: taskPickupTime,
      assignedTo: taskAssignedTo,
      notes: taskNots // Save notes value to local storage
    });

    closeAddTaskModal();
  }
}

function openTaskModal(event, taskText, taskLocation, taskDateTime, taskTransportation, taskPickupTime, taskAssignedTo, taskNots) {
  event.stopPropagation();

  taskModalText.innerText = `Task: ${taskText}`;
  taskLocationText.innerText = `Location: ${taskLocation}`;
  taskDateTimeText.innerText = `Date and Time: ${taskDateTime}`;
  taskTransportationText.innerText = `Transportation: ${taskTransportation}`;
  taskPickupTimeText.innerText = `Pickup Time: ${taskPickupTime}`;
  taskAssignedToText.innerText = `Assigned To: ${taskAssignedTo}`;
  taskNotsText.innerText = `Notes: ${taskNots}`; // Display notes value
  modalBackdrop.style.display = 'flex';
}

function deleteTask(event) {
  event.stopPropagation();

  const taskElement = event.target.closest('.task');
  const taskText = taskElement.querySelector('span').innerText;

  taskElement.remove();

  removeTaskFromLocalStorage(taskText);
}

function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  for (const task of tasks) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(event)">Delete</button>
      <button class="details-btn" onclick="openTaskModal(event, '${task.text}', '${task.location}', '${task.dateTime}', '${task.transportation}', '${task.pickupTime}', '${task.assignedTo}', '${task.notes}')">Details</button>
    `;
    taskList.appendChild(taskElement);
  }
}

loadTasksFromLocalStorage();

let stopwatchInterval;
let stopwatchSeconds = 0;

function updateClocks() {
  // Get current time in different time zones
  const israelTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" });
  const newYorkTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  const losAngelesTime = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

  // Update clock elements
  document.getElementById("israelClock").querySelector("p").innerText = israelTime;
  document.getElementById("newYorkClock").querySelector("p").innerText = newYorkTime;
  document.getElementById("losAngelesClock").querySelector("p").innerText = losAngelesTime;
}

function updateStopwatchDisplay() {
  const hours = Math.floor(stopwatchSeconds / 3600);
  const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
  const seconds = stopwatchSeconds % 60;
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  document.getElementById("stopwatch-display").innerText = formattedTime;
}

function startStopwatch() {
  stopwatchInterval = setInterval(function () {
    stopwatchSeconds++;
    updateStopwatchDisplay();
  }, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  stopwatchSeconds = 0;
  updateStopwatchDisplay();
  clearInterval(stopwatchInterval);
}

// Update clocks every second
setInterval(updateClocks, 1000);

// Initial update
updateClocks();

function generateCalendar() {
  const calendarBody = document.getElementById('calendar-body');
  calendarBody.innerHTML = ''; // Clear previous content

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyCell = document.createElement('td');
    calendarBody.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const calendarDay = document.createElement('td');
    calendarDay.textContent = day;

    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      calendarDay.classList.add('current-day');
    }

    calendarBody.appendChild(calendarDay);

    if ((firstDayOfMonth + day - 1) % 7 === 6) {
      const newRow = document.createElement('tr');
      calendarBody.appendChild(newRow);
    }
  }
}

// Remaining JavaScript code remains unchanged
