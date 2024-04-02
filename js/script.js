
function toggleLogOutMenu() {
  let logoutMenu = document.getElementById("logoutContent");
  if (logoutMenu.style.display === "none" || logoutMenu.style.display === "") {
    logoutMenu.style.display = "flex";
  } else {
    logoutMenu.style.display = "none";
  }
}
