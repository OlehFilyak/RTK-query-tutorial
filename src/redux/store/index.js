import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "../helpers/pokemonAPI";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    devTools: process.env.NODE_ENV !== "production",
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export default store;
