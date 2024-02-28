import { Outlet } from "react-router-dom";
import classes from "./EventsLayout.module.css";

export default function EventsLayout() {
  return (
    <>
      <div className={classes.eventsLayout}>
        <button>New Event</button>
      </div>
      <Outlet />
    </>
  );
}
