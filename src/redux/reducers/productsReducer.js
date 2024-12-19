import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseInit";
import { collection, getDocs } from "firebase/firestore";

// Initial state for the products slice
const initialStateProduct = {
  products: [],
  filterProducts: [],
  selectedCategories: [],
  searchTerm: "",
  maxPriceRange: 90000,
  isLoading: false,
};

// Async thunk to fetch product data from Firestore
export const asyncGetProductDataFromDB = createAsyncThunk(
  "home/fetchProducts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  }
);

// Slice to manage products and filtering
const productsSlice = createSlice({
  name: "home",
  initialState: initialStateProduct,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setMaxPriceRange: (state, action) => {
      state.maxPriceRange = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = state.selectedCategories.includes(
        action.payload
      )
        ? state.selectedCategories.filter((c) => c !== action.payload)
        : [...state.selectedCategories, action.payload];
    },
    setFilterSearch: (state) => {
      state.filterProducts = state.products.filter((product) => {
        const matchedSearch = product.name
          .toLowerCase()
          .includes(state.searchTerm.toLowerCase());

        const matchedCategory =
          state.selectedCategories.length === 0 ||
          state.selectedCategories.includes(product.category);

        const matchedPrice = product.price <= state.maxPriceRange;

        return matchedSearch && matchedCategory && matchedPrice;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetProductDataFromDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncGetProductDataFromDB.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filterProducts = action.payload;
        state.isLoading = false;
      })
      .addCase(asyncGetProductDataFromDB.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Export the reducer and actions from the slice
export const productsReducer = productsSlice.reducer;
export const productseActions = productsSlice.actions;

// Selector to access the products state in components
export const productsSelector = (state) => state.productsReducer;
