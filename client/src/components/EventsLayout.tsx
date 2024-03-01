import { Link, Outlet } from "react-router-dom";
import classes from "./EventsLayout.module.css";

export default function EventsLayout() {
  return (
    <>
      <div className={classes.eventsLayout}>
        <Link to="new">New Event</Link>
      </div>
      <Outlet />
    </>
  );
}
