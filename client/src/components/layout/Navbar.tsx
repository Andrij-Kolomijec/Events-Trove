import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import Newsletter from "./Newsletter";

export default function Navbar() {
  return (
    <header className={classes.navbar}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${classes.active} active` : undefined
            }
            end
          >
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? `${classes.active} active` : undefined
            }
          >
            <p>Events</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/newsletter"
            className={({ isActive }) =>
              isActive ? `${classes.active} active` : undefined
            }
          >
            <p>Newsletter</p>
          </NavLink>
        </li>
      </ul>
      <Newsletter />
    </header>
  );
}
