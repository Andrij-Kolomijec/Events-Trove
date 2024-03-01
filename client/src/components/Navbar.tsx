import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import Newsletter from "./Newsletter";

export default function Navbar() {
  return (
    <header className={classes.navbar}>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Events
        </NavLink>
        <NavLink
          to="/newsletter"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          Newsletter
        </NavLink>
      </nav>
      <Newsletter />
    </header>
  );
}
