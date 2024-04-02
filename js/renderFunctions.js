/* const loginContainer = document.getElementById("loginContentContainer");
const signupContainer = document.getElementById("signUpWindowContainer");
const headerLogin = document.getElementById("headerLogin");
const headerSignup = document.getElementById("headerSignup"); */

function hideElement(id) {
    let el = document.getElementById(id);
    el.classList.add('d-none');
}

function showElement(id) {
    let el = document.getElementById(id);
    el.classList.remove('d-none');
    el.classList.add('d-flex');
}


function renderSignUpWindow() {
    hideElement('loginContentContainer');
    showElement('signupContentContainer');

    hideElement('headerSignup');
    showElement('headerLogin');
}

function renderLoginWindow() {
    hideElement('signupContentContainer');
    showElement('loginContentContainer');

    hideElement('headerLogin');
    showElement('headerSignup');
}

//   summary:

/* function renderSummaryPageHtml() {
  return ` 
   
   <div class="summaryHeader">
       <h1 class="summaryHeadline">Join 360</h1>
       <div class="dividerSummaryHeader"></div> 
       <span class="summarySpan">Key Metrics at Glance</span>
       <div class="dividerSummaryHeaderMobile"></div> 
       </div>
       <div class="toDoContent_container">
       <div class="smallToDo_container">
           <div class="smallToDo_containeer">
               <div class="dflexRow">
                  <div class="roundContainer">
                    <img src="./assets/img/editPen.svg" alt="toDoPen" class="summaryImgPen">
                  </div>
                   <div class="dflexColumn">
                       <h1 id="currentToDoNumber" class="summaryToDoTaskHeadlines"></h1>
                       <span class="summarySmallSpan">To-do</span>
                   </div>
               </div>
           </div>
           <div class="smallToDo_container">
               <div class="smallToDo_containeer">
                   <div class="dflexRow">
                   <div class="roundContainerDone">
                   <img src="./assets/img/Vector.svg" alt="toDoPen" class="summaryImgDone">
                 </div>
                       <div class="dflexColumn">
                           <h1 id="DoneToDos" class="summaryToDoTaskHeadlines"></h1>
                           <span class="summarySmallSpan">Done</span>
                       </div>
                   </div>
           </div>
       </div>
       </div>
       <div class="bigToDoAndGreetUser_container">
           <div class="bigToDo_container">
               <div class="urgenTaskContent_container">
                   <div class="urgentTask">
                       <img src="./assets/img/TaskUrgent.png" alt="urgentTask" class="summaryImg">
                       <div class="dflexColumn">
                           <h1 id="urgentToDos" class="summaryToDoTaskHeadlines"></h1>
                           <span class="summarySmallSpan">Urgent</span>
                       </div>
                   </div>
                   <div class="dividerUrgentTask"></div>
                   <div class="dflexColumn">
                       <h2 id="deadlineToDoDate" class="deadlineToDateStyle"></h2>
                       <span class="summarySmallSpan">Upcoming Deadline</span>
                   </div>
               </div>
           </div>
           <div class="greetUserContainer">
           <p id="greetUserHeadline">Good Morning</p>
           <p id="greetUserName">Test</p>
           </div>
       </div>
  
       <div class="taskOverview_container">
           <div class="smallTask_container">
               <div class="dflexColumn">
                   <h1 id="TasksInBoard" class="summaryToDoTaskHeadlines"></h1>
                   <span class="summarySmallSpan">Tasks in <br>
                       Board</span>
               </div>
           </div>
           <div class="smallTask_container">
               <div class="dflexColumn">
                   <h1 id="TaskInProgress" class="summaryToDoTaskHeadlines"></h1>
                   <span class="summarySmallSpan">Tasks In<br>
                       Progress</span>
               </div>
           </div>
           <div class="smallTask_container">
               <div class="dflexColumn">
                   <h1 id="TaskAwaitingFeedback" class="summaryToDoTaskHeadlines"></h1>
                   <span class="summarySmallSpan">Awaiting<br>
                       Feedback</span>
               </div>
           </div>
       </div>
   </div>
   </div>
  </div>`;
} */
