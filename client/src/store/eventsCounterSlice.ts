import { createSlice } from "@reduxjs/toolkit";

type CounterSlice = {
  total: number;
};

const initialState: CounterSlice = {
  total: 0,
};

const eventCounterSlice = createSlice({
  name: "eventCounter",
  initialState,
  reducers: {
    replaceEvents(state, action) {
      state.total = action.payload.total;
    },
    addEvent(state) {
      state.total++;
    },
    removeEvent(state) {
      state.total--;
    },
  },
});

export const { addEvent, removeEvent, replaceEvents } =
  eventCounterSlice.actions;

export default eventCounterSlice.reducer;
