import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import userReducer from "./slice/AuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
