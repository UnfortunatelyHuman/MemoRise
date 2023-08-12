import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Initialize Firebase with your configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiqkwPSAuSL9BIwDAf13GnZKFe0tQz7PA",
  authDomain: "pwa-project-2dd28.firebaseapp.com",
  projectId: "pwa-project-2dd28",
  storageBucket: "pwa-project-2dd28.appspot.com",
  messagingSenderId: "42139094469",
  appId: "1:42139094469:web:d9884f8537dd5574eecfac",
  measurementId: "G-5825CSMHHJ",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

// Get elements from the settings page
const deleteButton = document.getElementById("delete-button");

// Event listener for the delete button
deleteButton.addEventListener("click", () => {
  const collectionName = "ListOfNotes";
  if (window.confirm("Are you sure you want to delete all data?")) {
    deleteAllData(collectionName);
  }
});

// Function to check if a collection exists
async function doesCollectionExist(collectionName) {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking collection existence:", error);
    return false;
  }
}

// Function to delete all data from a collection
async function deleteAllData(collectionName) {
  try {
    const collectionExists = await doesCollectionExist(collectionName);
    if (collectionExists) {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      console.log(`All data deleted from collection: ${collectionName}`);
    } else {
      console.log(`Collection does not exist: ${collectionName}`);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

//functionality to show battery info
// Get references to DOM elements
const batteryIcon = document.querySelector(".battery-icon");
const batteryPercentage = document.querySelector(".battery-percentage");
const batteryStatus = document.querySelector(".battery-status");

// Check if Battery API is supported
if ("getBattery" in navigator) {
  navigator.getBattery().then((battery) => {
    // Initial update
    updateBatteryInfo(battery);

    // Update battery info on changes
    battery.addEventListener("levelchange", () => {
      updateBatteryInfo(battery);
    });

    battery.addEventListener("chargingchange", () => {
      updateBatteryInfo(battery);
    });
  });
} else {
  // Battery API is not supported
  batteryPercentageElement.textContent = "N/A";
  batteryStatusElement.textContent = "Not Available";
}

// Function to update battery information
function updateBatteryInfo(battery) {
  batteryIcon.textContent = battery.charging ? "🔌" : "🔋";
  batteryPercentage.textContent = `${Math.floor(battery.level * 100)}%`;
  batteryStatus.textContent = battery.charging ? "Charging" : "Not Charging";
}

//Network API code
const networkStatusElement = document.querySelector(".network-status");
const networkTypeElement = document.querySelector(".network-type");
const networkDownlinkElement = document.querySelector(".network-downlink");
const networkUplinkElement = document.querySelector(".network-uplink");

// Get initial network information
if (navigator.connection) {
  const connection = navigator.connection;
  updateNetworkInfo(connection);

  // Update network information when connection changes
  connection.addEventListener("change", () => {
    updateNetworkInfo(connection);
  });
} else {
  networkStatusElement.textContent = "Status: Not Available";
}

// Update network information
function updateNetworkInfo(connection) {
  networkStatusElement.textContent = `Status: ${connection.effectiveType}`;
  networkTypeElement.textContent = `Type: ${connection.type}`;
  networkDownlinkElement.textContent = `Downlink: ${connection.downlink} Mbps`;
  networkUplinkElement.textContent = `Uplink: ${connection.uplink} Mbps`;
}
