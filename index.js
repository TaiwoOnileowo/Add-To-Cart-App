// inport firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// get the database url
const appSettings = {
  databaseURL:
    "https://playground-a5039-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);

// create a shopping list database
const shoppingListInDB = ref(database, "shoppingList");

// get the required html documents
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
const clearAllBtn = document.getElementById("clear-allbtn");

// event listener to listen for clicks
addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value.trim();

  if (inputValue !== "") {
    // Check if the value already exists in the database
    checkValueExists(inputValue)
      .then((exists) => {
        //  If it does, use SweetAlert2 framework to show a custom confirmation dialog
        if (exists) {
          Swal.fire({
            title: "Oops..that item already exists in the list.",
            text: "Do you still want to add it?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              // If the user confirms, push the value to the database
              push(shoppingListInDB, inputValue);
              clearInputFieldEl();
              displayClearAllBtn();
            } else {
              // If the user cancels, clear the input field
              clearInputFieldEl();
            }
          });
        } else {
          // If the value doesn't exist, push it to the database
          push(shoppingListInDB, inputValue);
          clearInputFieldEl();
          displayClearAllBtn();
        }
      })
      .catch((error) => {
        // in the case of an error in the promise chain
        console.error("Error checking value:", error);
      });
  }
});

// Event listener to check for the enter key pressed after an input
inputFieldEl.addEventListener("keydown", function (event) {
  let inputValue = inputFieldEl.value.trim();

  if (event.key === "Enter" && inputValue !== "") {
    event.preventDefault(); // Prevent the default Enter key behavior
    // Check if the value already exists in the database
    checkValueExists(inputValue)
      .then((exists) => {
        //  If it does, use SweetAlert2 framework to show a custom confirmation dialog
        if (exists) {
          Swal.fire({
            title: "Oops..that item already exists in the list.",
            text: "Do you still want to add it?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              // If the user confirms, push the value to the database
              push(shoppingListInDB, inputValue);
              clearInputFieldEl();
              displayClearAllBtn();
            } else {
              // If the user cancels, clear the input field
              clearInputFieldEl();
            }
          });
        } else {
          // If the value doesn't exist, push it to the database
          push(shoppingListInDB, inputValue);
          clearInputFieldEl();
          displayClearAllBtn();
        }
      })
      .catch((error) => {
        // in the case of an error in the promise chain
        console.error("Error checking value:", error);
      });
  }
});

// When the clear all button is clicked
clearAllBtn.addEventListener("click", function () {
  let exactLocationOfItemInDB = ref(database, "shoppingList");
  remove(exactLocationOfItemInDB);
});

hideClearAllBtn();

// Get a snapshot of the items in the database and display it to the shopping list
onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let shoppingListitemsArray = Object.entries(snapshot.val());

    DeleteShoppingListitem();

    for (let i = 0; i < shoppingListitemsArray.length; i++) {
      let currentItem = shoppingListitemsArray[i];
      //   let currentItemID = currentItem[0];
      //   let currentItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    }
    displayClearAllBtn();
  } else {
    hideClearAllBtn();
    shoppingListEl.innerHTML = "No items here... yet";
  }
});

// Function to check if a value exists in the database
function checkValueExists(value) {
  // Create a promise to handle asynchronous database check
  return new Promise((resolve, reject) => {
    onValue(
      shoppingListInDB,
      (snapshot) => {
        if (snapshot.exists()) {
          const values = snapshot.val();
          const valueExists = Object.values(values).includes(value);
          resolve(valueExists);
        } else {
          resolve(false); // If the snapshot doesn't exist, value doesn't exist
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// Function to delete shoppinglist items
function DeleteShoppingListitem() {
  shoppingListEl.innerHTML = "";
}

// Function to display clear all button
function displayClearAllBtn() {
  clearAllBtn.style.display = "block";
}

// Function to hide clear all button
function hideClearAllBtn() {
  clearAllBtn.style.display = "none";
}

// Function to clear the input field
function clearInputFieldEl() {
  inputFieldEl.value = "";
}

// Function to append the shopping list item to the shopping list
function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newItem = document.createElement("li");

  newItem.textContent = itemValue;

  newItem.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`); // get the exact location of the newEl from the database when clicked

    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newItem);
}
