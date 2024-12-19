import { useDispatch, useSelector } from "react-redux";
import "./navbarStyle.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  authActions,
  authSelector,
} from "../../redux/reducers/authenticationReducer";
import { toast } from "react-toastify";

function Navbar() {
  const { user, isLoggedIn } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    try {
      dispatch(authActions.logOutUser());
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {/* Navbar left part */}
      <div className="navbar-container">
        <div className="navbar-left-part">
          <img
            src="https://i.pinimg.com/736x/79/a2/a6/79a2a6e91fa2dbc3085d7b85b4c2bc78.jpg"
            alt="BuyBusy Logo"
          />
          <h1>BuyBusy</h1>
          {isLoggedIn && <p>Welcome, {user.name} !</p>}
        </div>

        {/* Navbar right part */}
        <div className="navbar-right-part">
          <div className="navbar-details-wrapper">
            <NavLink to="/" className="nav-link">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2549/2549900.png"
                alt="Home Logo"
              />
              <h4>Home</h4>
            </NavLink>
          </div>
          {isLoggedIn ? (
            <>
              <div className="navbar-details-wrapper border-left-style">
                <NavLink
                  to={`/usersorder/${user.id}/myorder`}
                  className="nav-link"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6133/6133937.png"
                    alt="My Order Logo"
                  />
                  <h4>My Order</h4>
                </NavLink>
              </div>
              <div className="navbar-details-wrapper border-left-style">
                <NavLink
                  to={`/userscart/${user.id}/mycart`}
                  className="nav-link"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/833/833314.png"
                    alt="Cart Logo"
                  />
                  <h4>Cart</h4>
                </NavLink>
              </div>
              <div
                className="navbar-details-wrapper border-left-style"
                onClick={handleLogOut}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5509/5509651.png"
                  alt="LogOut Logo"
                />
                <h4>SignOut</h4>
              </div>
            </>
          ) : (
            <div className="navbar-details-wrapper border-left-style">
              <NavLink to="/signin" className="nav-link">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/15725/15725038.png"
                  alt="SignIn Logo"
                />
                <h4>SignIn</h4>
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
