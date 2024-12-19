import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseInit";
import { authActions } from "./authenticationReducer";

// Initial state of the cart - loaded from localStorage or default values
const initialStateCart = {
  userId: localStorage.getItem("userId") || "",
  totalPrice: 0,
  productsInCart: [],
  isLoading: false,
};

// Thunk to fetch cart data from Firestore
export const asyncGetCartDataFromDB = createAsyncThunk(
  "cart/fetchCartData",
  async () => {
    const querySnapshot = await getDocs(collection(db, "cart"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  }
);

// Thunk to add a product to the cart in Firestore
export const asyncAddProductsToCart = createAsyncThunk(
  "cart/addProduct",
  async (cartItemData, thunkAPI) => {
    const { userId, name, price, imageUrl } = cartItemData;
    const newCartItem = {
      userId,
      name,
      price,
      imageUrl,
      qty: 1,
    };
    const docRef = await addDoc(collection(db, "cart"), newCartItem);
    thunkAPI.dispatch(
      cartActions.addProductToCart({ id: docRef.id, ...newCartItem })
    );
  }
);

// Thunk to increase the quantity of a product in the cart
export const asyncIncreaseQtyOfProduct = createAsyncThunk(
  "cart/updateQty",
  async (cartItemData, thunkAPI) => {
    const updatedCartItem = { ...cartItemData, qty: cartItemData.qty + 1 };
    await setDoc(doc(db, "cart", updatedCartItem.id), updatedCartItem);
    thunkAPI.dispatch(cartActions.increaseQtyOfProduct(updatedCartItem));
  }
);

// Thunk to decrease the quantity of a product in the cart
export const asyncDecreaseQtyOfProduct = createAsyncThunk(
  "cart/decreaseQty",
  async (cartItemData, thunkAPI) => {
    const updatedCartItem = { ...cartItemData, qty: cartItemData.qty - 1 };
    await setDoc(doc(db, "cart", updatedCartItem.id), updatedCartItem);
    thunkAPI.dispatch(cartActions.decreaseQtyOfProduct(updatedCartItem));
  }
);

// Thunk to remove a product from the cart in Firestore
export const asyncRemoveProductFromCart = createAsyncThunk(
  "cart/removeProduct",
  async (productId, thunkAPI) => {
    await deleteDoc(doc(db, "cart", productId));
    thunkAPI.dispatch(cartActions.removeProductFromCart(productId));
  }
);

// Thunk to remove all products from the cart in Firestore
export const asyncRemoveAllProducts = createAsyncThunk(
  "cart/removeAllProduct",
  async (productsInCart, thunkAPI) => {
    await Promise.all(
      productsInCart.map(async (product) => {
        await deleteDoc(doc(db, "cart", product.id));
      })
    );
    thunkAPI.dispatch(cartActions.removeAllProduct());
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    addProductToCart: (state, action) => {
      state.productsInCart = [...state.productsInCart, action.payload];
      state.totalPrice += action.payload.price;
    },
    increaseQtyOfProduct: (state, action) => {
      const index = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.productsInCart[index] = {
          ...state.productsInCart[index],
          qty: action.payload.qty,
        };
      }
      state.totalPrice += state.productsInCart[index].price;
    },
    decreaseQtyOfProduct: (state, action) => {
      const index = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.productsInCart[index] = {
          ...state.productsInCart[index],
          qty: action.payload.qty,
        };
      }
      state.totalPrice -= state.productsInCart[index].price;
    },
    removeProductFromCart: (state, action) => {
      const index = state.productsInCart.findIndex(
        (product) => product.id === action.payload
      );
      state.totalPrice -=
        state.productsInCart[index].price * state.productsInCart[index].qty;
      state.productsInCart = state.productsInCart.filter(
        (product) => product.id !== action.payload
      );
    },
    removeAllProduct: (state) => {
      state.productsInCart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authActions.setUserDetails, (state, action) => {
        state.userId = action.payload.uid;
        localStorage.setItem("userId", action.payload.uid);
      })
      .addCase(asyncGetCartDataFromDB.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(asyncGetCartDataFromDB.fulfilled, (state, action) => {
        state.productsInCart = [
          ...action.payload.filter(
            (product) => product.userId === state.userId
          ),
        ];
        state.totalPrice = state.productsInCart.reduce(
          (sum, product) => sum + product.price * product.qty,
          0
        );
        state.isLoading = false;
      })
      .addCase(asyncGetCartDataFromDB.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Export the reducer and actions
export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

// Selector to access the cart state
export const cartSelector = (state) => state.cartReducer;
