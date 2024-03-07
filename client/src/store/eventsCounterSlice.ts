import { createSlice } from "@reduxjs/toolkit";
import { fetchEventsData } from "./eventsActions";

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

  // when using createAsyncThunk

  extraReducers: (builder) => {
    builder.addCase(fetchEventsData.fulfilled, (state, action) => {
      state.total = action.payload;
    });
  },
});

export const { addEvent, removeEvent, replaceEvents } =
  eventCounterSlice.actions;

export default eventCounterSlice.reducer;
