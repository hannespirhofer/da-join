const currentTime = new Date();
let currentHour = currentTime.getHours();
let pageStatus = true;
tasks = [];

function init() {
  includeHTML()
    .then(() => {
      fetchTasks()
        .then(() => {
          initSummary();
        })
    })
    .catch((error) => {
      console.error('An error occurred: ', error);
    })
}

async function fetchTasks() {
  tasks = JSON.parse(await getItem("tasks"));
}

async function initSummary() {

  const currentUsername = getUser();
  updateGreetingMessage();
  updateUsername(currentUsername);
  changeHeaderInitials(currentUsername);
  updateSummaryNumbers();

  // implement update Header Initials (only G also when user is logged in)
  // fetching data from remote doesnt have initials


  changeDateUrgentTask();
}

function updateSummaryNumbers() {
  updateTodoQty();
  updateTaskinprogressQty();
  updateDoneQty();
  updateUrgentQty();
  updateAwaitingfeedbackQty();
  updateTasksinboardQty();
}

//OK
function getUser() {
  isGuest = JSON.parse(localStorage.getItem('guest'));
  if (isGuest) {
    return 'Guest';
  } else {
    const username = localStorage.getItem('username');
    if (username) {
      return username;
    } else {
      return 'Wizard';
    }
  }
}

//OK
function updateUsername(username) {
  const userField = document.getElementById("greetUserName");
  if (username) {
    userField.innerHTML = username;
  } else {
    userField.innerHTML = 'Guest';
  }
}

//OK
function updateGreetingMessage() {
  const changeMessage = document.getElementById("greetUserHeadline");
  if (currentHour < 12) {
    changeMessage.innerHTML = `Good Morning`;
  } else if (currentHour <= 17) {
    changeMessage.innerHTML = `Good afternoon`;
  } else {
    changeMessage.innerHTML = `Good Evening`;
  }
}

//OK
function changeHeaderInitials(username) {
  iconHolder = document.getElementById("currentUserinHeader");
  if (username) {
    initials = username[0].slice(0, 1);
    iconHolder.innerHTML = initials;
  }
}

//OK
function updateTodoQty() {
  let currentToDo = document.getElementById("currentToDoNumber");
  let todoCount = tasks.filter(
    (task) => task.progress === "todo"
  ).length;
  currentToDo.innerHTML = todoCount;
}

//OK
function updateTaskinprogressQty() {
  let taskInProgress = document.getElementById("TaskInProgress");
  let taskInProgressCount = tasks.filter(
    (task) => task.progress === "inprogress"
  ).length;
  taskInProgress.innerHTML = taskInProgressCount;
}

//OK
function updateDoneQty() {
  let tasksDone = document.getElementById("DoneToDos");
  let taskDoneCount = tasks.filter(
    (task) => task.progress === "done"
  ).length;
  tasksDone.innerHTML = taskDoneCount;
}

//OK
function updateUrgentQty() {
  let tasksUrgent = document.getElementById("urgentToDos");
  let taskUrgentCount = tasks.filter(
    (task) => task.priority === "urgent"
  ).length;
  tasksUrgent.innerHTML = taskUrgentCount;
}

//OK
function updateAwaitingfeedbackQty() {
  let tasksAwaitingFeedback = document.getElementById("TaskAwaitingFeedback");
  let awaitingFeedbackTasksCount = tasks.filter(
    (task) => task.progress === "awaitfeedback"
  ).length;
  tasksAwaitingFeedback.innerHTML = awaitingFeedbackTasksCount;
}

//OK
function updateTasksinboardQty() {
  let allCurrentTasks = tasks.length;
  let allCurrentTaskContainer = document.getElementById("TasksInBoard");
  allCurrentTaskContainer.innerHTML = allCurrentTasks;
}

//OK
/* function changeDateUrgentTask() {
  let dateContainer = document.getElementById("deadlineToDoDate");
  const urgentTasks = tasks.filter((task) => task.priority == "urgent");
  let closestUrgentTask; 

  if (tasks.length > 0) {
    closestTask = tasks.sort((a,b) => {      
      new Date(a.duedate) - new Date(b.duedate)
    });

    console.log(closestTask[0].duedate);

    dateContainer.innerHTML = closestTask;
  }
}*/

function changeDateUrgentTask() {
  let dateContainer = document.getElementById("deadlineToDoDate");
  arr = tasks;

  if (arr) {
    let dateArray = arr
      .filter((task) => task.duedate)
      .map((task) => ({ duedate: new Date(task.duedate) }));
    dateArray.sort((a, b) => a.duedate - b.duedate);

    if (dateArray.length > 0) {
      let nextDueDate = dateArray[0].duedate;

      if (isValidDate(nextDueDate)) {
        dateContainer.innerText = nextDueDate.toLocaleDateString();
      }
    } else {
      dateContainer.innerText = "No Deadline found";
    }
  } else {
    console.log("Error: arr is undefined");
  }
}

// Hilfsfunktion zum Check ob das Datum auch gültig ist
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// Hilfsfunktion zur Suche des nächsten gültigen Datums im dateArray
/* function findNextValidDate(dateArray) {
  for (let i = 1; i < dateArray.length; i++) {
    if (isValidDate(dateArray[i].duedate)) {
      return dateArray[i].duedate;
    }
  }
  return null;
} */

/* function checkIfUserIsLoggedin() {
  let guestUserLoggedIn = JSON.parse(localStorage.getItem("guest"));
  if (guestUserLoggedIn === true) {
    let greetUser = document.getElementById("greetUserName");
    greetUser.innerHTML = "";
  } else {
    getCurrentLoggedInUser();
  }
} */

/* function changeHeaderUserIconGuest() {
  let initialsDiv = document.querySelector(".header-profile-icon");
  let initialsDivMobile = document.getElementById("currentUserinHeader");
  initialsDiv.innerHTML = "GU";
  initialsDivMobile.innerHTML = "GU";
} */

/* function changeHeaderUserIconLoggedIn() {
  let initialsDiv = document.querySelector(".header-profile-icon");
  let initialsDivMobile = document.getElementById("currentUserinHeader");
  initialsDiv.innerHTML = finalinitals;
  initialsDivMobile.innerHTML = finalinitals;
} */

/* function getCurrentLoggedInUser() {
  let greetUser = document.getElementById("greetUserName");
  let userData = JSON.parse(localStorage.getItem("userName"));
  greetUser.innerHTML = `${userData}`;
} */

/* function getInitialsFromUserName() {
  let userData = JSON.parse(localStorage.getItem("userName"));
  console.log(userData);

  let dataInString = userData[0];
  let initials = dataInString.slice(0, 2);
  finalinitals = initials.toUpperCase();
} */