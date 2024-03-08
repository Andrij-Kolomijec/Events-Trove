import { NavLink, Outlet, useRouteLoaderData } from "react-router-dom";

export default function EventsLayout() {
  const token = useRouteLoaderData("root");

  return (
    <>
      {token && (
        <div className="eventsLayout">
          <NavLink to="new" className="newEvent clickable">
            Create New Event
          </NavLink>
        </div>
      )}
      <Outlet />
    </>
  );
}
