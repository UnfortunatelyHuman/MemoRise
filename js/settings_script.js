// Get elements from the settings page
const deleteButton = document.getElementById("delete-button");
const enableNotificationsCheckbox = document.getElementById(
  "enable-notifications"
);
//!Notification code
// Event listener for the delete button
deleteButton.addEventListener("click", () => {
  deleteAllData();
});

//!delete data code
// Function to delete all data
function deleteAllData() {
  localStorage.clear(); // Clear local storage or any other database
}
