# Shopping List App

A simple web application for managing a shopping list with Firebase Realtime Database integration.

## Features

- Add items to the shopping list.
- Check if an item already exists , shows a confirmation dialog before adding it to the list.
- Remove items from the list by clicking on them.
- Clear all items from the list.

## Technologies Used

- HTML
- CSS
- JavaScript
- Firebase Realtime Database

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/shopping-list-app.git

2. Open the project folder:
    cd shopping-list-app

3. Open the index.html file in your web browser.

4. Explore the features of the Shopping List App. 

  How to Use

- Enter a new item in the input field and press "Add to cart" to add it to the list.
- If the item already exists, a confirmation dialog will be shown before adding it to the list.
- Click on an item to remove it from the list.
- Click the "Clear All" button to remove all items from the list.

  Firebase Integration

- The app uses Firebase Realtime Database to store and retrieve the shopping list data.
- Update the Firebase configuration in `index.js` with your own Firebase project details.
 
 const appSettings = {
    databaseURL: "https://your-firebase-project.firebaseio.com/"
}

Acknowledgments

- Firebase - Backend infrastructure.
- @scrimba