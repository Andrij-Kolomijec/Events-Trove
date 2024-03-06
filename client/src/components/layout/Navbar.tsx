import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import Newsletter from "./Newsletter";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Navbar() {
  const total = useSelector((state: RootState) => state.events.total);

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
            <p>Events ({total})</p>
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
