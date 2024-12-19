import { Link, useNavigate } from "react-router-dom";
import "../signInAndSignUpStyle.css";
import { useEffect, useState } from "react";
import {
  asyncGetUserDetails,
  asyncSignIn,
  authSelector,
} from "../../../redux/reducers/authenticationReducer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(authSelector);

  useEffect(() => {
    dispatch(asyncGetUserDetails());
  }, [isLoggedIn, dispatch]);

  // Function to handle the sign-in process
  const handleSignIn = async () => {
    if (!email || !password) {
      toast.warning("Please fill in all fields!");
      return;
    }
    try {
      setIsSubmitting(true);
      await dispatch(asyncSignIn({ email, password }));
      clearInput();
      toast.success("Signin successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to clear input fields
  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="sign-wrapper">
      <div className="sign-container">
        <h1 className="sign-header-container">Sign In</h1>
        {/* Sign In Form Section  */}
        <form
          className="sign-form-container"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="sign-footer-container">
          <span>Don't have an account ?</span>
          <span className="sign-box">
            <Link to="/signup">Sign Up Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
