import { configureStore } from "@reduxjs/toolkit";
import eventsCounterReducer from "./eventsCounterSlice";

const store = configureStore({
  reducer: { events: eventsCounterReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
