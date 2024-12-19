# E-commerce Application with React, Redux, and Firebase

This project is a full-stack e-commerce application built with React, Redux, Firebase, and Firestore. It provides functionality such as managing products, user authentication, order processing, and category-based filtering. Users can filter products, make purchases, and view their order history.

## Project Overview

This is a full-fledged e-commerce application that allows users to:

- Browse products and filter them by categories, price range, and search terms.
- Add products to the cart and modify quantities.
- Place orders and view order history.
- Register, log in, and manage their account using Firebase Authentication.

The project uses React for building the user interface, Redux Toolkit for state management, and Firebase for user authentication and Firestore for data storage.

## Features

- **Authentication**:

  - User signup and sign-in using email and password.
  - User profile management (including name).
  - Firebase authentication for managing users.

- **Product Management**:

  - Display products with search, category filter, and price range filter.
  - Add and remove products from the cart.
  - Cart and order management using Firebase Firestore.
  - Real-time product data synchronization with Firestore.

- **Real-time Data**:

  - Sync cart and order data with Firestore in real time.
  - Dynamic updates for cart and order details.
  - Fetch product data from Firestore and display it instantly when available.

- **User Interaction**:

  - Notifications via React Toastify to display success or failure messages.
  - User-friendly interfaces for cart management, product browsing, and profile updates.

  ## State Management with Redux

The app uses **Redux Toolkit** to manage the application state. The key slices are:

### **Product Slice**

- **State**: Holds `products`, `filterProducts`, `selectedCategories`, `searchTerm`, and `maxPriceRange`.
- **Actions**:
  - Set and filter products by search term, categories, and price range.
  - Fetch product data from Firebase Firestore.

### **Order Slice**

- **State**: Contains `userId`, `order`, and `isLoading` state.
- **Actions**:
  - Fetch and manage order history for the user.
  - Process and save new orders to Firestore.

### **Authentication Slice**

- **State**: Contains `userId` and `isAuthenticated`.
- **Actions**:
  - Manage user login, logout, and store user details in Firebase.

## Firebase Integration

This project integrates **Firebase** for both user authentication and data storage.

### Firebase Services Used:

- **Firebase Authentication**: For user sign-up, login, and managing sessions.
- **Firestore**: For storing products and orders data.

### Firebase Setup:

1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
2. Add Firebase configuration details to `firebaseInit.js` in the `src/` directory.
   - Ensure you enable Firebase Authentication (for email/password sign-in) and Firestore (for storing product and order data).

## Technologies Used

- **Frontend**: React, Redux, React Router, CSS
- **Backend**: Firebase (Firestore, Firebase Authentication)
- **State Management**: Redux Toolkit
- **Build Tools**: Webpack, Babel (via Create React App)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
