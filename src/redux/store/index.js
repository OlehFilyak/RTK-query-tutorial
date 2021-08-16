import { configureStore } from "@reduxjs/toolkit";

const rootReducer = () => {
  return 0;
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
