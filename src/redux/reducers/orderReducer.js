import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseInit";
import { authActions } from "./authenticationReducer";

// Initial state for the order slice
const initialStateOrder = {
  userId: localStorage.getItem("userId") || "",
  order: [],
  isLoading: false,
};

// Async thunk to fetch order data from Firestore
export const asyncGetOrderDataFromDB = createAsyncThunk(
  "order/fetchOrderData",
  async () => {
    const querySnapshot = await getDocs(collection(db, "order"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  }
);

// Async thunk to handle purchasing items and creating an order
export const asyncPurchaseItems = createAsyncThunk(
  "order/purchaseItems",
  async (purchaseData, thunkAPI) => {
    const { cartData, userId } = purchaseData;

    // Prepare order data
    const newOrderData = {
      date: new Date().toISOString().slice(0, 10),
      userId,
      totalPrice: cartData.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
      ),
      itemOrdered: cartData.map((item) => ({
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
    };

    // Add the order to the Firestore collection
    await addDoc(collection(db, "order"), newOrderData);

    // updating the state
    thunkAPI.dispatch(orderActions.setNewOrder(newOrderData));
  }
);

// Slice for managing the order state
const orderSlice = createSlice({
  name: "order",
  initialState: initialStateOrder,
  reducer: {
    setNewOrder: (state, action) => {
      state.order = [action.payload, ...state.order];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authActions.setUserDetails, (state, action) => {
        state.userId = action.payload.uid;
        localStorage.setItem("userId", action.payload.uid);
      })
      .addCase(asyncGetOrderDataFromDB.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(asyncGetOrderDataFromDB.fulfilled, (state, action) => {
        state.order = [
          ...action.payload.filter((order) => order.userId === state.userId),
        ];
        state.isLoading = false;
      })
      .addCase(asyncGetOrderDataFromDB.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Export the reducer and actions from the slice
export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;

// Selector to access the order state in components
export const orderSelector = (state) => state.orderReducer;
