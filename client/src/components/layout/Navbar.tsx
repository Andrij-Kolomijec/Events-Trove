import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./Navbar.module.css";
import Newsletter from "./Newsletter";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getAuthEmail } from "../../utils/authJWT";
import Button from "../Button";
import { motion } from "framer-motion";

export default function Navbar() {
  const total = useSelector((state: RootState) => state.events.total);
  const token = useRouteLoaderData("root");
  const email = getAuthEmail();

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
            <motion.p
              key={total}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              Events ({total})
            </motion.p>
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
        {!token ? (
          <li>
            <NavLink
              to="/authentication?mode=login"
              className={({ isActive }) =>
                isActive ? `${classes.active} active` : undefined
              }
            >
              <p>Login</p>
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <Form action="/logout" method="post">
                <Button>Logout</Button>
                <span>{email}</span>
              </Form>
            </li>
          </>
        )}
      </ul>
      <Newsletter />
    </header>
  );
}
