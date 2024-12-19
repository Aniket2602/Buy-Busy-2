import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebaseInit";

// Initial state for authentication, fetched from localStorage if available
const initialStateAuth = JSON.parse(localStorage.getItem("authState")) || {
  user: { id: "", name: "", email: "" },
  isLoggedIn: false,
};

// Async thunk for signing up a user
export const asyncSignUp = createAsyncThunk(
  "authentication/signUp",
  async ({ name, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
  }
);

// Async thunk for signing in a use
export const asyncSignIn = createAsyncThunk(
  "authentication/signIn",
  async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  }
);

// Async thunk for getting current user details
export const asyncGetUserDetails = createAsyncThunk(
  "authentication/userDetails",
  (_, thunkAPI) => {
    const user = auth.currentUser;
    if (user !== null) {
      thunkAPI.dispatch(authActions.setUserDetails(user));
    }
  }
);

// Creating the slice for authentication-related actions and state
const authSlice = createSlice({
  name: "authentication",
  initialState: initialStateAuth,
  reducers: {
    setUserDetails: (state, action) => {
      const { uid, displayName, email } = action.payload;
      state.user.id = uid;
      state.user.name = displayName;
      state.user.email = email;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logOutUser: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("authState");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSignIn.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(asyncSignIn.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(asyncSignIn.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = authSlice.reducer; // Export the reducer function to use in the store
export const authActions = authSlice.actions; // Export the actions to use in components

// Selector to access authentication state
export const authSelector = (state) => state.authReducer;
