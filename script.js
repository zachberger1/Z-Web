// script.js

// Open the modal to add a task
function openModal() {
  document.getElementById('addTaskBackdrop').style.display = 'block';
}

// Close the modal to add a task
function closeAddTaskModal() {
  document.getElementById('addTaskBackdrop').style.display = 'none';
  document.getElementById('taskInput').value = '';
    document.getElementById('taskLocationInput').value = '';
    document.getElementById('taskDateTimeInput').value = '';
    document.getElementById('taskTransportationInput').value = '';
    document.getElementById('taskPickupTimeInput').value = '';
    document.getElementById('taskAssignedToInput').value = '';
    document.getElementById('taskNotsInput').value = '';
}

// Close all modals
function closeModals() {
  document.getElementById('modalBackdrop').style.display = 'none';
  document.getElementById('addTaskBackdrop').style.display = 'none';

  document.getElementById('taskInput').value = '';
    document.getElementById('taskLocationInput').value = '';
    document.getElementById('taskDateTimeInput').value = '';
    document.getElementById('taskTransportationInput').value = '';
    document.getElementById('taskPickupTimeInput').value = '';
    document.getElementById('taskAssignedToInput').value = '';
    document.getElementById('taskNotsInput').value = '';
}

// Add a task to the task list and save to local storage
function addTask() {
  const task = document.getElementById('taskInput').value;
  const location = document.getElementById('taskLocationInput').value;
  const dateTime = document.getElementById('taskDateTimeInput').value;
  const transportation = document.getElementById('taskTransportationInput').value;
  const pickupTime = document.getElementById('taskPickupTimeInput').value;
  const assignedTo = document.getElementById('taskAssignedToInput').value;
  const notes = document.getElementById('taskNotsInput').value;

  document.getElementById('taskInput').value = '';
  document.getElementById('taskLocationInput').value = '';
  document.getElementById('taskDateTimeInput').value = '';
  document.getElementById('taskTransportationInput').value = '';
  document.getElementById('taskPickupTimeInput').value = '';
  document.getElementById('taskAssignedToInput').value = '';
  document.getElementById('taskNotsInput').value = '';

  const taskItem = {
    task,
    location,
    dateTime,
    transportation,
    pickupTime,
    assignedTo,
    notes
  };

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskItem);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  appendTaskToDOM(taskItem);
  closeAddTaskModal();
}

// Append a task to the DOM
function appendTaskToDOM(taskItem) {
  const taskList = document.getElementById('taskList');

  const taskElement = document.createElement('div');
  taskElement.className = 'task-item';
  taskElement.innerHTML = `
      <h3>${taskItem.task}</h3>
      <button class="view-details-btn" onclick="viewTaskDetails('${taskItem.task}', '${taskItem.location}', '${taskItem.dateTime}', '${taskItem.transportation}', '${taskItem.pickupTime}', '${taskItem.assignedTo}', '${taskItem.notes}')">View Details</button> 

  `;

  taskList.appendChild(taskElement);
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Re-render the task list
  document.getElementById('taskList').innerHTML = '';
  tasks.forEach((taskItem, index) => appendTaskToDOM(taskItem, index));
}

// View task details in a modal
function viewTaskDetails(task, location, dateTime, transportation, pickupTime, assignedTo, notes) {
  document.getElementById('taskModalText').innerText = ` ${task}`;
  document.getElementById('taskLocationText').innerText = `Location: ${location}`;
  document.getElementById('taskDateTimeText').innerText = `Date and Time: ${dateTime}`;
  document.getElementById('taskTransportationText').innerText = `Transportation: ${transportation}`;
  document.getElementById('taskPickupTimeText').innerText = `Pickup Time: ${pickupTime}`;
  document.getElementById('taskAssignedToText').innerText = `Assigned To: ${assignedTo}`;
  document.getElementById('taskNotsText').innerText = `Notes: ${notes}`;

  document.getElementById('modalBackdrop').style.display = 'block';
}

// Load tasks from local storage and display them
function appendTaskToDOM(taskItem, index) {
  const taskList = document.getElementById('taskList');

  const taskElement = document.createElement('div');
  taskElement.className = 'task-item';
  taskElement.innerHTML = `
      <h2>${taskItem.task}</h2>
      <button class="view-details-btn" onclick="viewTaskDetails('${taskItem.task}', '${taskItem.location}', '${taskItem.dateTime}', '${taskItem.transportation}', '${taskItem.pickupTime}', '${taskItem.assignedTo}', '${taskItem.notes}')">View Details</button>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
  `;

  taskList.appendChild(taskElement);
}


// Load tasks from local storage and display them
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((taskItem, index) => appendTaskToDOM(taskItem, index));
}

// Load tasks from local storage when the page loads
window.onload = function() {
  loadTasks();
};


function navigateTo(page) {
  window.location.href = page;
}

function closeContactModal() {
  document.getElementById('addContactBackdrop').style.display = 'none';
  document.getElementById('friendNameInput').value = '';
  document.getElementById('friendPhoneInput').value = '';
}

function openContactModal(){
  document.getElementById('addContactBackdrop').style.display = 'flex';
}
document.addEventListener('DOMContentLoaded', () => {
  const contactList = document.getElementById('contactList');

  // Open the modal to add a contact
  

  // Close the modal to add a contact
  

  // Load contacts from local storage
  function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
      appendContactToDOM(contact, index);
    });
  }

  // Append a contact to the DOM
  function appendContactToDOM(contact, index) {
    const contactItem = document.createElement('div');
    contactItem.className = 'contact-item';
    contactItem.innerHTML = `
      <h2>${contact.name}</h2> 
      <p>Phone: ${contact.phone}</p>
      <button onclick="deleteContact(${index})">
        <img src="dealet.png" alt="Delete">
      </button>
    `;
    contactList.appendChild(contactItem);
  }
  
  // Add a contact to the contact list and save to local storage
  window.addContact = function () {
    const name = document.getElementById('friendNameInput').value;
    const phone = document.getElementById('friendPhoneInput').value;

    const contact = { name, phone };
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    appendContactToDOM(contact, contacts.length - 1);

    closeContactModal();
  };

  // Delete a contact
  window.deleteContact = function (index) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
  };

  // Initial load of contacts
  loadContacts();
});



