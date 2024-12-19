import { Link, useNavigate } from "react-router-dom";
import "../signInAndSignUpStyle.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { asyncSignUp } from "../../../redux/reducers/authenticationReducer";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle sign up process
  const handleSignUp = async () => {
    if (!name || !email || !password) {
      toast.warning("Please fill in all fields!");
      return;
    }
    try {
      setIsSubmitting(true);
      await dispatch(asyncSignUp({ name, email, password }));
      clearInput();
      toast.success("Signup successful!");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to clear input fields
  const clearInput = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="sign-wrapper">
      <div className="sign-container signup-container">
        <h1 className="sign-header-container">Sign Up</h1>
        {/* Sign Up Form Section  */}
        <form
          className="sign-form-container"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="sign-footer-container">
          <span>Already have an account ?</span>
          <span className="sign-box">
            <Link to="/signin">Sign In Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
