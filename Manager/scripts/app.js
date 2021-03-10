var isItImportant = false;
var isDetailsVisible = true;
var serverUrl = "http://fsdi.azurewebsites.net/api";

function toggleDetailsVisibility() {
    if(isDetailsVisible) {
        $("#capture").hide();
        isDetailsVisible = false;
    }
    else {
        $("#capture").show();
        isDetailsVisible = true;
    }
}

function toggleImportant() {
    console.log("Icon clicked");

    if (!isItImportant) { // = is it off ?
        $("#iImportant").removeClass("far").addClass("fas");
        isItImportant = true;
    } else {
       isItImportant = false;
       $("#iImportant").removeClass("fas").addClass("far");
    }
    
}

function saveTask(){
    console.log("Save Clicked");

    let title = $("#txtTitle").val();
    var date = $("#txtDate").val();
    var status = $("#selStatus").val();
    var location = $("#txtLocation").val();
    var color = $("#txtColor").val();
    var desc = $("#txtDesc").val();

    var myTask = new Task(0, title, isItImportant, date, status, location, color, desc);

    // save to server
    $.ajax({
        url: serverUrl + '/tasks',
        type: "POST",
        data: JSON.stringify(myTask),
        contentType: "application/json",

        success: function(res) {
            console.log("Server says: ", res);

            // display res
            displayTask(res);
        },
        error: function(errorDet) {
            console.log("Error", errorDet)
        }
    });

    // clearForm();
    // $("#myForm").trigger("reset");

}

function clearForm() {

    // TODO 1: Clear Screen
    // to clear an input, set its val to '', xxxxx.val('');

    $(".form-control").val('');
}

function displayTask(task) {
    // TODO 2: - set the background color of the task to the color choosen by the user.

    // create syntax
    var syntax = 
    `<div class='task' style="#txtColor">
        <i class="far fa-star task-star task-section-sm"></i>
        <div class='task-desc'>
        <label>${task.id}</label>
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>
        <label class='tas-section'>${task.dueDate}</label>
        <label class='tas-section'>${task.location}</label>
        

        <div class='task-section-sm'>
            <i id="trash" class="far fa-trash-alt" onclick="deleteTask(${task.id})"></i>
        </div>
    
    </div>`;

    // append the syntax to existing HTML
    $("#tasks-list").append(syntax);
}

function retrieveData() {
    $.ajax({
        url: serverUrl + "/tasks",
        type:"GET",
        success: function(res) {
            console.log("retrieving", res);

            for(let i =0; i < res.length; i++) {
                let task = res[i];
                if(task.user === "Jay"){
                    displayTask(task);
                }
                
            }
        },
        error: function(errorDet) {
            console.log("Error retrieving", errorDet);
        }
    })
}

function deleteTask(id) {
    console.log("Should delete a task", id)
    
    // todo 3 - Delete Task (optional)

    // create an ajax request
    // url: serverUrl + '/task' + id

    // on success function -> remove it from the screen
}

function testRequest() {
    $.ajax({
        url: "https://restclass.azurewebsites.net/api/test",
        type: "GET",
        success: function(res) {
            console.log("Yay it worked!!", res);
        },
        error: function(errorDetails) {
            console.log("Looks like we have an error :(", errorDetails);
        }
    });
}

function init() {
    console.log("Task Manager");

    retrieveData();

    // events
    $("#iImportant").click(toggleImportant);
    $("#btnSave").click(saveTask);
    $("#btnDetails").click(toggleDetailsVisibility);
}

window.onload = init;


/*
Task
- Id
- Title
- Date & Time
- Importance
- Description
- Status
- Location
- Color
*/