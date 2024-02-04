/* The html so you can edit the task */

function editTask(index) {
    removeDNone('popUpEdit');
    addDNone('popUpTaskBig');
    let popUp = document.getElementById('popUpEdit');
    let currentTask = tasks[index];
    popUp.innerHTML = '';
    renderAllInformationsEditTask(index, currentTask, popUp);
}


async function closeTaskEdit() {
    clearPrioButtonsEdit();
    selectedContactsAssignedTo = [];
    await closeTaskBig();
    addDNone('popUpEdit');
}


function clearPrioButtonsEdit() {
    for (let i = 0; i < prioButtons.length; i++) {
        prioButtons[i]['toggled'] = false;
    }
}


function renderAllInformationsEditTask(index, currentTask, popUp) {
    popUp.innerHTML += renderPopUpCardEdit(index);
    renderTitleEdit(index);
    renderDescriptionEdit(index);
    renderDateEdit(index);
    renderPrioEdit(index);
    renderInitialsSelectedEdit();
    getSubtasksEdit(index);
    console.log(subtasks);
    renderSubtasksEdit();
}


function renderTitleEdit(index) {
    let titleInput = document.getElementById('titleInputEdit');
    let title = tasks[index]['title'];
    console.log(title);
    titleInput.value = title;
}


function renderDescriptionEdit(index) {
    let descriptionInput = document.getElementById('descriptionInputEdit');
    let description = tasks[index]['description'];
    descriptionInput.value = description;
}


function renderDateEdit(index) {
    let dateInput = document.getElementById('dateInputEdit');
    let date = tasks[index]['duedate'];
    dateInput.value = date;
    colorFontInput('dateInputEdit');
}


function renderPrioEdit(index) {
    let prio = tasks[index]['priority'];
    for (let i = 0; i < prioButtons.length; i++) {
        const prioButtonsName = prioButtons[i]['name'];
        if (prioButtonsName === prio) {
            prioButtons[i]['toggled'] = true;
            setBackgroundColorPrioButton(i);
        }
    }
}


function getSubtasksEdit(index) {
    subtasks = [];
    let subtaskArray = tasks[index]['subtasks'];
    for (let i = 0; i < subtaskArray.length; i++) {
        const subtask = subtaskArray[i]['name'];
        subtasks.push(subtask);
    }
}


function setBackgroundColorPrioButton(i) {
    const selectedButton = getField(`prioButtonEdit${i+1}`);
    const selectedImgPrioColor = getField(`prioColorEdit${i+1}`);
    const selectedImgPrioWhite = getField(`prioWhiteEdit${i+1}`);
    const selectedPrio = getField(`prio${i+1}`);
    const selectedPrioName = selectedPrio.innerHTML.toLowerCase();
    selectedButton.classList.toggle(`${selectedPrioName}`);
    selectedButton.classList.toggle('prioTextWhite');
    selectedImgPrioColor.classList.toggle('d-none');
    selectedImgPrioWhite.classList.toggle('d-none');
}


async function saveAndCloseEdit(index) {
    const inputFields = collectInputFieldsEdit(index);
    renderContactIds();
    controlIfDescriptionEmtpy(inputFields.description);
    let task = createTaskInstanceEdit(inputFields);
    console.log(task);
    console.log(index);
    tasksAssignedTo[index] = task;
    tasks = tasksAssignedTo;
    console.log(tasksAssignedTo);
    console.log(tasks);
    await closeTaskEdit();
}


function collectInputFieldsEdit(index) {
    let taskId = tasks[index]['taskid'];
    let title = getField('titleInputEdit').value;
    let description = getField('descriptionInputEdit').value;
    let category = tasks[index]['category'];
    let dueDate = getField('dateInputEdit').value;
    let progress = tasks[index]['progress'];
    let priority = getPriority();
    
    return {taskId, title, description, category, dueDate, progress, priority};
}


function createTaskInstanceEdit({taskId, title, description, category, dueDate, progress, priority}) {
    return {
        "taskid": taskId,
        "title": title,
        "description": description,
        "category": category,
        "subtasks": subtasks,
        "contactids": selectedContactsAssignedToIds,
        "priority": priority,
        "progress": progress,
        "duedate": dueDate
    };
}


function renderPopUpCardEdit(index) {
    return /*html*/`
        <img class="close-button-pu-edit" src="./assets/img/close-img.png" onclick="closeTaskEdit()">
        <form onsubmit="saveAndCloseEdit(${index}); return false">
            <div class="field-container-pu-edit">

                <div class="title">
                    <label class="title-label-pu-edit">Title<span class="star">*</span><br>
                        <input id="titleInputEdit" class="inputField focus title-input-pu-edit" type="text" placeholder="Enter a title" onkeyup="checkValueTitle('titleInputEdit', 'titleRequiredContainerEdit')" required>
                    </label>
                    <div id="titleRequiredContainerEdit" class="title-required d-none">This field is required</div>
                </div>

                <div class="description desc-pu-edit">
                    <label class="description-label-pu-edit">Description<br>
                        <div class="desc-input-container desc-input-container-pu-edit">
                            <textarea id="descriptionInputEdit" class="focus" placeholder="Enter a Description"></textarea>
                        </div>
                    </label>
                </div>
                
                <div class="due-date">
                    <label>Due date<span class="star">*</span><br>
                        <div class="d-d-input-container d-d-input-container-pu-edit" id="dateInputContainer">
                            <input id="dateInputEdit" type="date" class="inputField focus color-date-input-gray date-input-pu-edit" onclick="minMaxDate('dateInputEdit')" onkeyup="checkValueDueDate('dateInputEdit', 'dateRequiredContainerEdit')" onchange="colorFontInput('dateInputEdit'), checkValueDueDate('dateInputEdit', 'dateRequiredContainerEdit')" required> 
                        </div>
                    </label>
                    <div id="dateRequiredContainerEdit" class="date-required d-none">This field is required</div>
                </div>

                <div class="prio">
                    <label>Priority<br>
                        <div class="button-prio-container button-prio-container-edit">
                            <div class="button-prio" id="prioButtonEdit1" onclick="setPrio(1, 'prioButtonEdit', 'prioColorEdit', 'prioWhiteEdit', 'prioEdit')"><span class="prio-name" id="prioEdit1">Urgent</span><img src="./assets/img/img-urgent.png" id="prioColorEdit1"><img class="d-none" src="./assets/img/img-urgent-white.png" id="prioWhiteEdit1"></div>
                            <div class="button-prio" id="prioButtonEdit2" onclick="setPrio(2, 'prioButtonEdit', 'prioColorEdit', 'prioWhiteEdit', 'prioEdit')"><span class="prio-name" id="prioEdit2">Medium</span><img src="./assets/img/img-medium.png" id="prioColorEdit2"><img class="d-none" src="./assets/img/img-medium-white.png" id="prioWhiteEdit2"></div>
                            <div class="button-prio" id="prioButtonEdit3" onclick="setPrio(3, 'prioButtonEdit', 'prioColorEdit', 'prioWhiteEdit', 'prioEdit')"><span class="prio-name" id="prioEdit3">Low</span><img src="./assets/img/img-low.png" id="prioColorEdit3"><img class="d-none" src="./assets/img/img-low-white.png" id="prioWhiteEdit3"></div>
                        </div>
                    </label>
                </div>

                <div class="assigned-to assigned-to-edit">
                    <label>Assigned to<br>
                        <div class="a-t-input-container a-t-input-container-edit" id="aTInputContainerEdit">
                            <input class="inputField" placeholder="Select contacts to assign" id="assignedToInputEdit" onfocus="inputAssignedToFocus('aTInputContainerEdit')" onblur="inputAssignedToBlur('aTInputContainerEdit')" onkeyup="filterNamesEdit()">
                            <img src="./assets/img/arrow-drop-down.png" class="arrow-drop-down" id="arrowAssignedToEdit" onclick="toggleAssignedToDropDownEdit()">
                        </div>
                    </label>
                    <div id="assignedToDropDownEdit" class="assigned-to-drop-down at-drop-down-edit d-none">
                        <div id="assignedToDropDownWrapperEdit" class="assigned-to-drop-down-wrapper">
                        </div>
                    </div>
                    <div id="contactsSelectedContainerEdit" class="contacts-selected-container contacts-selected-container-edit">
                    </div>
                </div>

                <div class="subtasks subtasks-edit">
                    <label>Subtasks<br>
                        <div class="subtasks-container subtasks-container-edit" id="subtaskContainerEdit">
                        <input type="text" placeholder="Add new Subtask" class="inputField input-field-subtask-edit" id="subtaskInputEdit" onfocus="inputSubtaskFocusEdit()" oninput="inputSubtaskEdit()" onblur="inputSubtaskBlurEdit()">
                        <img src="./assets/img/plus-black.png" class="plus-img" id="plusImgEdit" onclick="addSubtaskEdit()">
                        <div class="insert-subtask-tool-container d-none" id="insertSubtaskToolContainerEdit">
                            <img src="./assets/img/close-img.png" class="close-img" onclick="deleteInputSubtaskEdit()">
                            <div class="tool-separator"></div>
                            <img src="./assets/img/check-black.png" class="check-black-img" onclick="saveInputSubtaskEdit()">
                        </div>
                        </div>
                    </label>
                    <div id="addedSubtasksContainerEdit" class="added-subtasks-container added-subtasks-container-edit">
                    </div>
                </div>

            </div>
            <button class="ok-button" type="submit">Ok<img src="./assets/img/check.png"></button>
        </form>
    `;
}