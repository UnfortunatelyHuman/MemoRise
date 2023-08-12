// import MemoRiseDB from "../js/database/firebaseDB";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
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
//creating database
class MemoRiseDB {
  constructor() {
    this.db = null;
    this.isAvailable = false;
  }

  //to open database
  open() {
    console.log("Open");
    return new Promise((resolve, reject) => {
      const firebaseConfig = {
        apiKey: "AIzaSyCiqkwPSAuSL9BIwDAf13GnZKFe0tQz7PA",
        authDomain: "pwa-project-2dd28.firebaseapp.com",
        projectId: "pwa-project-2dd28",
        storageBucket: "pwa-project-2dd28.appspot.com",
        messagingSenderId: "42139094469",
        appId: "1:42139094469:web:d9884f8537dd5574eecfac",
        measurementId: "G-5825CSMHHJ",
      };

      try {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        if (db) {
          this.db = db;
          this.isAvailable = true;
          resolve();
        } else {
          reject("Firebase database not available");
        }
      } catch (error) {
        reject("Firebase Error: ", error);
      }
    });
  }
  //to add notes to database
  add(note) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Open your database first!");
      }

      //creating noteDetail obj
      const noteDetail = {
        description: note.description,
        subject: note.subject,
      };

      //to connect firebase collection
      const dbCollection = collection(this.db, "ListOfNotes");

      addDoc(dbCollection, noteDetail)
        .then((docReference) => {
          resolve();
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }

  //to get all list
  getAll() {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Open your database first!");
      }

      //to connect firebase collection
      const dbCollection = collection(this.db, "ListOfNotes");
      getDocs(dbCollection)
        .then((snapshot) => {
          const allNotes = [];
          snapshot.forEach((childSnap) => {
            const data = childSnap.data();
            data.id = childSnap.id;

            //Adding data after adding id to the array
            allNotes.push(data);

            resolve(allNotes);
          });
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }

  //to remove notes from the database table
  removeNotes(id) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Open your database first!");
      }

      console.log("removenotes:", id);
      // Getting the document reference
      const docReference = doc(this.db, "ListOfNotes", id);

      console.log("removenotes ref:", docReference);
      //to delete document from firestore
      deleteDoc(docReference)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }

  //to update notes in database
  updateNote(id, subject, description) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Open your database first!");
      }

      const noteRef = doc(this.db, "ListOfNotes", id);

      const updatedData = {
        subject: subject,
        description: description,
      };

      updateDoc(noteRef, updatedData)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }
}
const memoRiseDB = new MemoRiseDB();

console.log(memoRiseDB);
/*firebase code starts here*/
memoRiseDB
  .open()
  .then(() => {
    memoRiseDB
      .getAll()
      .then((result) => {
        console.log(result);
        addNoteToList(result);
      })
      .catch((error) => {
        errorMessage.textContent = `Failed to display data from the database ${error}`;
      });
  })
  .catch((error) => {
    console.log("Database Error: " + error);
  });
/**Firebase Code Ends here */

/*** code for index.html starts here */
const notesList = document.getElementById("notes-list");
const addButton = document.getElementById("add-button");
const sideMenu = document.getElementById("side-menu");
const sideMenuRight = document.getElementById("side-menu-right");
const newNoteText = document.getElementById("new-note-text");
const saveButton = document.getElementById("save-button");
const saveButtonRight = document.getElementById("save-button-right");
const noteSubjectInput = document.getElementById("note-subject");
const noteDescriptionInput = document.getElementById("note-description");
const noteSubjectInputRight = document.getElementById("note-subject-right");
const noteDescriptionInputRight = document.getElementById(
  "note-description-right"
);
const cancelButton = document.getElementById("cancel-button");
const cancelButtonRight = document.getElementById("cancel-button-right");
const errorMessage = document.getElementById("errorMessage");

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
      description: newNoteDescription,
      subject: newNoteSubject,
    };

    memoRiseDB
      .add(newNote)
      .then(() => {
        // After a short delay, perform the page reload
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        errorMessage.textContent = `Failed to add data to the database: ${error}`;
      });
    noteSubjectInput.value = "";
    noteDescriptionInput.value = "";
  }
  sideMenu.classList.remove("open");
});

//!
//function to dynamically add note card to html
function addNoteToList(note) {
  note.forEach((note) => {
    //creating card
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");

    //creating subject h3
    const noteSubject = document.createElement("h3");
    noteSubject.classList.add("note-subject");
    noteSubject.textContent = note.subject;
    noteCard.appendChild(noteSubject);

    //creating p element for description
    const noteDescription = document.createElement("p");
    noteDescription.classList.add("note-description");
    noteDescription.textContent = note.description;
    noteCard.appendChild(noteDescription);
    notesList.appendChild(noteCard);

    //creating edit button
    // Creating edit button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "Edit";
    noteCard.appendChild(editButton);
    // Event listener for the edit button
    editButton.addEventListener("click", () => {
      openEditForm(note);
    });

    //creating delete btn
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    noteCard.appendChild(deleteButton);
    if (noteCard.hasChildNodes) {
      console.log("noteCard has child");
      deleteButton.addEventListener("click", () => {
        memoRiseDB
          .removeNotes(note.id)
          .then(() => {
            noteCard.remove();
            // window.location.reload();
          })
          .catch((error) => {
            console.log("Unable to delete data", error);
          });
        console.log("Removed");
      });
    }
    // Clear error message
    document.getElementById("errorMessage").textContent = "";
  });
}

//opens sidebar to edit note
function openEditForm(note) {
  // Display the form with the note's details
  noteSubjectInputRight.value = note.subject;
  noteDescriptionInputRight.value = note.description;

  // Show the save button for editing
  saveButtonRight.textContent = "Save Edit";
  saveButtonRight.addEventListener("click", () => {
    saveEditedNote(note.id);
  });
  sideMenuRight.classList.add("open");
}

//save edited note in firbase database
function saveEditedNote(noteId) {
  console.log("SAVE EDITED:", noteId);
  const editedSubject = noteSubjectInputRight.value.trim();
  const editedDescription = noteDescriptionInputRight.value.trim();

  if (editedSubject && editedDescription) {
    // Update note data in the database
    memoRiseDB
      .updateNote(noteId, editedSubject, editedDescription)
      .then(() => {
        // Clear input fields and close the edit form
        noteSubjectInputRight.value = "";
        noteDescriptionInputRight.value = "";
        saveButtonRight.textContent = "Save";
        sideMenuRight.classList.remove("open");
        // After a short delay, perform the page reload
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  }
}

// Event listener for the "Cancel" button in the side menu
cancelButton.addEventListener("click", () => {
  sideMenu.classList.remove("open");
  noteSubjectInput.value = "";
  noteDescriptionInput.value = "";
});

// Event listener for the "Cancel" button in the right side menu
cancelButtonRight.addEventListener("click", () => {
  closeRightSidebar();
});
// Function to close the right side bar
function closeRightSidebar() {
  sideMenuRight.classList.remove("open");
  noteSubjectInputRight.value = "";
  noteDescriptionInputRight.value = "";
}
// Event listener for clicks outside the right side menu
document.addEventListener("click", (event) => {
  const isClickInsideSideMenuRight = sideMenuRight.contains(event.target);
  const isClickOnEditButton = event.target.classList.contains("edit-button");
  const isClickOnSaveButtonRight = saveButtonRight.contains(event.target);

  if (
    !isClickInsideSideMenuRight &&
    !isClickOnEditButton &&
    !isClickOnSaveButtonRight
  ) {
    closeRightSidebar(); // Close the right sidebar if clicked outside
  }
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

/*** code for index.html ends here*/
