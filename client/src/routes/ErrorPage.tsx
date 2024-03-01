import classes from "./ErrorPage.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ErrorPage() {
  const [time, setTime] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate(-1);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000); // so it does not update every 1000th of a second
    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <>
      <Navbar />
      <div className={classes.error}>
        <h1>Something went wrong</h1>
        <h3>
          You will be redirected to the previous page in {time}{" "}
          {time === 1 ? "second" : "seconds"}.
        </h3>
      </div>
    </>
  );
}

export default ErrorPage;
