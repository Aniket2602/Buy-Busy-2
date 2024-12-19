import Navbar from "./components/navbar/Navbar";
import Page404 from "./components/errorPage/ErrorPage";
import Home from "./pages/home/Home";
import SignIn from "./pages/signInAndsignUp/signIn/SignIn";
import SignUp from "./pages/signInAndsignUp/signUp/SignUp";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./redux/store";
import { authSelector } from "./redux/reducers/authenticationReducer";

function App() {
  // PrivateRoute ensures that certain routes are accessible only to logged-in users
  const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useSelector(authSelector);

    // If the user is not logged in, redirect them to the home page
    if (!isLoggedIn) {
      return <Navigate to="/" replace={true} />;
    }
    return children; // If logged in, render the protected content
  };

  // Defining the browser router with different routes in the application
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Page404 />,
      children: [
        { index: true, element: <Home /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        {
          path: "userscart/:userId/mycart",
          element: (
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          ),
        },
        {
          path: "usersorder/:userId/myorder",
          element: (
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      {/* Provides the Redux store to all child components */}
      <RouterProvider router={browserRouter} /> {/* Manages route navigation */}
      <ToastContainer />
    </Provider>
  );
}

export default App;
