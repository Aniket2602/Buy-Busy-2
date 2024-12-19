# E-commerce Application with React, Redux, and Firebase

This project is a full-stack e-commerce application built with React, Redux, Firebase, and Firestore. It provides functionality such as managing products, user authentication, order processing, and category-based filtering. Users can filter products, make purchases, and view their order history.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
  - [Authentication](#authentication)
  - [Product Management](#product-management)
  - [Real-time Data](#real-time-data)
  - [User Interaction](#user-interaction)
- [Screenshots](#screenshots)
- [State Management with Redux](#state-management-with-redux)
- [Firebase Integration](#firebase-integration)
  - [Firebase Services Used](#firebase-services-used)
  - [Firebase Setup](#firebase-setup)
- [Technologies Used](#technologies-used)
- [How to Install and Run the Project](#how-to-install-and-run-the-project)
- [Demo](#demo)
- [Author](#author)
- [Links](#links)

## Project Overview

This is a full-fledged e-commerce application that allows users to:

- Browse products and filter them by categories, price range, and search terms.
- Add products to the cart and modify quantities.
- Place orders and view order history.
- Register, log in, and manage their account using Firebase Authentication.

The project uses React for building the user interface, Redux Toolkit for state management, and Firebase for user authentication and Firestore for data storage.

## Features

### Authentication

- User signup and sign-in using email and password.
- User profile management (including name).
- Firebase authentication for managing users.

### Product Management

- Display products with search, category filter, and price range filter.
- Add and remove products from the cart.
- Cart and order management using Firebase Firestore.
- Real-time product data synchronization with Firestore.

### Real-time Data

- Sync cart and order data with Firestore in real time.
- Dynamic updates for cart and order details.
- Fetch product data from Firestore and display it instantly when available.

### User Interaction

- Notifications via React Toastify to display success or failure messages.
- User-friendly interfaces for cart management, product browsing, and profile updates.

## Screenshots

<hr>
<h3 style="text-align: center">Home page</h3>
<hr>

![Home Page Screenshot](https://drive.google.com/file/d/1MjkwgEHdjv4AUggocnDtfRqSnul-Nskj/view?usp=drive_link)

![Home Page Screenshot](https://drive.google.com/file/d/11eXb52kWI-XJMUWktzvEO8-4dqzDaKT5/view?usp=drive_link)

<br>

<hr>
<h3 style="text-align: center">Sign-Up Page</h3>
<hr>

![SignUp Page Screenshot](https://drive.google.com/file/d/1i79dGOvjhLfUHVPfEfLLt878bnrWKTyu/view?usp=drive_link)

<br>

<hr>
<h3 style="text-align: center">Sign-In Page</h3>
<hr>

![SignIn Page Screenshot](https://drive.google.com/file/d/1-F_1cedVJZlMWWNCRIb8LIoJC-SotIbb/view?usp=drive_link)

<br>

<hr>
<h3 style="text-align: center">Cart Page</h3>
<hr>

![Cart Page Screenshot](https://drive.google.com/file/d/1e0DLQ-C7PhW1Y_nlFjwDtC29F_ymUA9Y/view?usp=drive_link)

<br>

<hr>
<h3 style="text-align: center">Order Page</h3>
<hr>

![Order Page Screenshot](https://drive.google.com/file/d/1ZFQ6MoTxAZLXVe8NW5Vu51nThwWcnqpp/view?usp=drive_link)

<br>

## State Management with Redux

The app uses **Redux Toolkit** to manage the application state. The key slices are: **Product Slice**, **Cart Slice**, **Order Slice** and **Authentication Slice**.

## Firebase Integration

This project integrates **Firebase** for both user authentication and data storage.

### Firebase Services Used:

- **Firebase Authentication**: For user sign-up, login, and managing sessions.
- **Firestore**: For storing products and orders data.

### Firebase Setup:

1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
2. Add Firebase configuration details to `firebaseInit.js` in the `src/` directory. Ensure you enable Firebase Authentication (for email/password sign-in) and Firestore (for storing product and order data).

## Technologies Used

- **Frontend**: React, Redux , React Router, CSS
- **Backend**: Firebase (Firestore, Firebase Authentication)
- **State Management**: Redux Toolkit
- **Build Tools**: Webpack, Babel (via Create React App)

## How to Install and Run the Project

Follow these steps to get the project up and running locally:

1. **Install Dependencies**:

```bash
npm install
```

2. **Start the Development Server**:

```bash
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

## Author

[@Aniket2602](https://github.com/Aniket2602)
<br>
<br>

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aniket-sangale/)
