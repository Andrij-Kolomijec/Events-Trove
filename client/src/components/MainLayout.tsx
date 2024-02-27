import { Outlet } from "react-router-dom";
import classes from "./MainLayout.module.css";
import Navbar from "./Navbar";

// type MainLayoutProps = {};

export default function MainLayout() {
  return (
    <div className={classes.main}>
      <Navbar />
      <Outlet />
    </div>
  );
}
