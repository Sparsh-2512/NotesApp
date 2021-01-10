console.log("Welcome to magic notes");
showNotes();
let addBtn = document.getElementById('addBtn');
// add notes
addBtn.addEventListener('click', e => {
    let note = document.getElementById('note');
    let title = document.getElementById('title');
    if(note.value!='' && title.value!='')
    {
        // a object literal containing note title and note
        let myObj = {
            noteTitle: title.value,
            noteContent: note.value
        }
        let notes = localStorage.getItem("notes");
        if (notes === null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        // pushing the object into notesObj array which will inturn be stores in form of a string in the localStorage
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        title.value = '';
        note.value = '';
        showNotes();
    }
    else
    {
        alert('Enter both note and title!');
    }
});

// showNotes
function showNotes() {
    let notes = localStorage.getItem("notes");
    let html = "";
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // iterating through the notesObj array which is an array of objects(title,note), to get note title and content to use in html to be displayed
    notesObj.forEach((element, index) => {
        html +=
            `<div class="card m-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.noteTitle}</h5>
            <p class="card-text">${element.noteContent}</p>
            <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-danger">Delete</button>
        </div>
        </div>`
    });
    let notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = html;
}

// deleting note
function deleteNode(index) {
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    // deleting the object with provided index from the notesObj array and then updating the localStorage
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}