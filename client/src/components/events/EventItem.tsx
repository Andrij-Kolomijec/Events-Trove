import {
  Link,
  useActionData,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import classes from "./EventItem.module.css";
import { Event } from "./EventsList";
import dateFormatter from "../../utils/dateFormatter";
import { useDispatch } from "react-redux";
import { removeEvent } from "../../store/eventsCounterSlice";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import Modal from "../Modal";
import { useState } from "react";

export default function EventItem({ event }: { event: Event }) {
  const submit = useSubmit();
  const dispatch = useDispatch();
  const data = useActionData() as { error: string; message: string };
  const token = useRouteLoaderData("root") as { token: string };
  const [toDelete, setToDelete] = useState<boolean>();

  function handleDelete() {
    submit(null, { method: "delete" });
    dispatch(removeEvent());
  }

  function handleCancelDeletion() {
    setToDelete(false);
  }

  const buttonStyle = {
    backgroundColor: "#000000",
    color: "#faebd7",
    margin: "0 1rem",
  };

  return (
    <>
      <AnimatePresence>
        {toDelete && (
          <Modal title="Deletion confirmation" onClose={handleCancelDeletion}>
            <p>You are about to delete event "{event.title}".</p>
            <p>Confirm to proceed.</p>
            <Button
              style={buttonStyle}
              onClick={handleCancelDeletion}
              bgColor="#ffb85c"
              color="#000000"
            >
              Cancel
            </Button>
            <Button
              style={buttonStyle}
              onClick={handleDelete}
              bgColor="#ffb85c"
              color="#000000"
            >
              Confirm
            </Button>
          </Modal>
        )}
      </AnimatePresence>
      <motion.article
        key={event.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={classes.event}
      >
        <img src={event.image} alt={event.title} />
        <div className={classes.content}>
          <h1>{event.title}</h1>
          <time>
            <i>{dateFormatter(event)}</i>
          </time>
          <p>{event.description}</p>

          {token && (
            <menu className={classes.actions}>
              <Link to="edit" className="clickable">
                Edit
              </Link>
              <Button onClick={() => setToDelete(true)}>Delete</Button>
            </menu>
          )}
        </div>
        {data && data.error && (
          <p className={classes.errors}> {data.message}</p>
        )}
      </motion.article>
    </>
  );
}
