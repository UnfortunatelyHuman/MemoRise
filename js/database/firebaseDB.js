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
  add(subject, description) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Open your database first!");
      }

      //creating noteDetail obj
      const noteDetail = {
        subject: subject,
        description: description,
      };

      //to connect firebase collection
      const dbCollection = collection(this.db, "ListOfNotes");

      addDoc(dbCollection, ListOfNotes)
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

      // Getting the document reference
      const docReference = doc(this.db, "ListOfNotes", id);

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

  //to update notes
  //todo
}

export default new MemoRiseDB();
