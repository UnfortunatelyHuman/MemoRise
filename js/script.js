//service worker code
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js", { scope: "/" })
    .then((reg) => {
      console.log("Registered: Service Worker");
    })
    .catch((err) => {
      console.log("Error:", err);
    });
} else {
  console.log("Not Supported in the browser");
}

/*** code for index.html starts here */
const notesList = document.getElementById("notes-list");
const addButton = document.getElementById("add-button");
const sideMenu = document.getElementById("side-menu");
const newNoteText = document.getElementById("new-note-text");
const saveButton = document.getElementById("save-button");
const noteSubjectInput = document.getElementById("note-subject");
const noteDescriptionInput = document.getElementById("note-description");
const cancelButton = document.getElementById("cancel-button");

// Function to create and add note elements to the list
function addNoteToList(noteText) {
  const noteElement = document.createElement("div");
  noteElement.classList.add("note");
  noteElement.textContent = noteText;
  notesList.appendChild(noteElement);
}

// Event listener for the "Add" button to open the side menu
addButton.addEventListener("click", () => {
  sideMenu.classList.add("open");
});

// Event listener for the "Save" button in the side menu
saveButton.addEventListener("click", () => {
  const newNoteSubject = noteSubjectInput.value.trim();
  const newNoteDescription = noteDescriptionInput.value.trim();

  if (newNoteSubject && newNoteDescription) {
    const newNote = {
      subject: newNoteSubject,
      description: newNoteDescription,
    };

    addNoteToList(newNote);
    //! saveNoteToLocalStorage(newNote);

    noteSubjectInput.value = "";
    noteDescriptionInput.value = "";
  }
  sideMenu.classList.remove("open");
});

//!
//function to dynamically add note card to html
function addNoteToList(note) {
  const noteCard = document.createElement("div");
  noteCard.classList.add("note-card");
  noteCard.innerHTML = `
    <h3 class="note-subject">${note.subject}</h3>
    <p class="note-description">${note.description}</p>
    <button class="delete-button">Delete</button>
  `;

  const deleteButton = noteCard.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteNoteCard(noteCard);
    //! deleteNoteFromLocalStorage(note);
  });

  notesList.appendChild(noteCard);
}
//function to delete card
function deleteNoteCard(noteCard) {
  notesList.removeChild(noteCard);
}

// Event listener for the "Cancel" button in the side menu
cancelButton.addEventListener("click", () => {
  sideMenu.classList.remove("open");
  noteSubjectInput.value = "";
  noteDescriptionInput.value = "";
});

// Event listener for clicks outside the side menu
document.addEventListener("click", (event) => {
  const isClickInsideSideMenu = sideMenu.contains(event.target);
  const isClickOnAddButton = addButton.contains(event.target);
  const isClickOnSaveButton = saveButton.contains(event.target);

  if (!isClickInsideSideMenu && !isClickOnAddButton && !isClickOnSaveButton) {
    sideMenu.classList.remove("open");
  }
});

// // Load sample notes on app startup (for demonstration purposes)
// function loadSampleNotes() {
//   const sampleNotes = [
//     "Buy groceries",
//     "Prepare presentation",
//     "Go for a run",
//     "Call mom",
//     "Read a book",
//   ];

//   sampleNotes.forEach((note) => addNoteToList(note));
// }

// // Load sample notes on app startup for demonstration purposes
// loadSampleNotes();
//!code for storage
// Load existing notes from Local Storage on app startup
// function loadNotesFromLocalStorage() {
//   const notes = JSON.parse(localStorage.getItem("notes")) || [];
//   notes.forEach((note) => addNoteToList(note));
// }
// //function to delete card from storage
// // function deleteNoteFromLocalStorage(note) {
// //   const notes = getNotesFromLocalStorage();
// //   const updatedNotes = notes.filter(
// //     (existingNote) =>
// //       existingNote.subject !== note.subject ||
// //       existingNote.description !== note.description
// //   );
// //   saveNotesToLocalStorage(updatedNotes);
// // }

// loadNotesFromLocalStorage();
/*** code for index.html ends here*/
