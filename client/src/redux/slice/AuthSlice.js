import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.token = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
  },
});

export const { setLoading, setToken, setSignupData } = authSlice.actions;
export default authSlice.reducer;
