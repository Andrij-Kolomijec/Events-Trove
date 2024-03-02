import { NavLink, Outlet } from "react-router-dom";

export default function EventsLayout() {
  return (
    <>
      <div className="eventsLayout">
        <NavLink to="new" className="clickable">
          Create New Event
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}
