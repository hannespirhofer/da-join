let users = [];
let loggedInUser = [];
let guest = false;

async function init() {}

async function register(event) {
  event.preventDefault();

  const formdata = grabFormData();
  fetchUsers();
  users.push(formdata);
  setUsers();

  clearForm();
  successSignUpPopup();
  renderLoginWindow();
}

async function fetchUsers() {
  users = JSON.parse(await getItem('users'));
}

async function setUsers() {
  users = JSON.parse(await setItem('users'));
}

function clearForm() {
  document.getElementById('SignUpForm').reset();
}

function grabFormData() {
  let mailInput = document.getElementById("registerMailInput");
  let userName = document.getElementById("registerUserName");
  let registerPassword = document.getElementById("registerPassword");

  return {
    email: mailInput.value,
    name: userName.value,
    password: registerPassword.value,
  }
}


async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

async function checkLogin(event) {
  event.preventDefault();

  guest = false;
  localStorage.setItem('guest', JSON.stringify(guest));

  let userMail = document.getElementById('emailLoginField').value;
  let userPassword = document.getElementById('passwordLoginField').value;

  await loadUsers();
  let user = users.find(user => user.email === userMail);
  if (user && user.password === userPassword) {
    window.location.href = "summary.html";
    greetUserInSummary(user.email);
    localStorage.setItem('guest', false);
  } else {
    userNameOrPasswordIncorrect();
  }
}

function userNameOrPasswordIncorrect() {
  let invalidText = document.getElementById('invalidText');
  invalidText.innerHTML = `Wrong Username or Password!`;
}

//find current logged in User functions

function findUserNameByEmail(email) {
  const user = users.find(user => user.email === email);
  return user ? user.name : null;
}

async function greetUserInSummary(email) {
  const loggedInEmail = email;
  const name = findUserNameByEmail(loggedInEmail);
  localStorage.setItem("username", name);
}

//sign Up Logic

function openWithGuestLogin() {
  guest = true;
  localStorage.setItem('guest', JSON.stringify(guest));
  window.location.href = "summary.html";
}

function registeredLogin() {
  window.location.href = "index.html";
}

//password validation in SignUp

function checkPasswords() {
  let userName = document.getElementById('registerUserName').value;
  let userMail = document.getElementById('registerMailInput').value;
  let signUpPassword = document.getElementById('registerPassword').value;
  let signUpConfirmPassword = document.getElementById('confirmPassword').value;
  let signUpButton = document.getElementById('signUpButton');
  let passwordsFalse = document.getElementById('signUpPasswordCheckText');
  if (signUpPassword == signUpConfirmPassword && userName.length > 0 && userMail.length > 0) {
    signUpButton.disabled = false;
    passwordsFalse.innerHTML = '';
  } else {
    passwordsFalse.innerHTML = `Passwords does not match`;
    signUpButton.disabled = true;
  }
}

// pop up

function successSignUpPopup() {
  const popupContainer = document.getElementById('successRegistration');
  popupContainer.classList.remove('d-none');
  setTimeout(function () {
    popupContainer.classList.add('d-none');
  }, 4500);
}

/* function showLoginTimeout() {
  setTimeout(function() {
    renderLoginWindow();
  }, 1500);
} */