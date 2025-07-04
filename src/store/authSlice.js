import { createSlice } from "@reduxjs/toolkit";

// Step 1: Load initial state from localStorage
const storedAuth = localStorage.getItem("authState");
const initialState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      status: false,
      userData: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;

      // Step 2: Save to localStorage
      localStorage.setItem(
        "authState",
        JSON.stringify({ status: true, userData: action.payload })
      );
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;

      // Step 3: Clear from localStorage
      localStorage.setItem(
        "authState",
        JSON.stringify({ status: false, userData: null })
      );
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
