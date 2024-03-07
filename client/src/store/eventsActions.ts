// import { AppDispatch } from "./index";
// import { replaceEvents } from "./eventsCounterSlice";

import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchEventsData = () => {
//   return async (dispatch: AppDispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(import.meta.env.VITE_PORT_EVENTS);
//       if (!response.ok) {
//         throw new Error("Could not fetch events data!");
//       }
//       const data = await response.json();
//       return data;
//     };

//     try {
//       const eventData = await fetchData();
//       dispatch(
//         replaceEvents({
//           total: eventData.events.length || 0,
//         })
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

//  Same effect as above

export const fetchEventsData = createAsyncThunk(
  "events/fetchEventsData",
  async (_, { /*dispatch,*/ rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_PORT_EVENTS);
      if (!response.ok) {
        throw new Error("Could not fetch events data!");
      }
      const data = await response.json();
      return data.events.length || 0;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
