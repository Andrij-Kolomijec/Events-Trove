import { AppDispatch } from "./index";
import { replaceEvents } from "./eventsCounterSlice";

export const fetchEventsData = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const response = await fetch(import.meta.env.VITE_PORT_EVENTS);
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const eventData = await fetchData();
      dispatch(
        replaceEvents({
          total: eventData.events.length,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
