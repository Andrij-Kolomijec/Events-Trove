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

export default function EventItem({ event }: { event: Event }) {
  const submit = useSubmit();
  const dispatch = useDispatch();
  const data = useActionData() as { error: string; message: string };
  const token = useRouteLoaderData("root") as { token: string };

  // if <Form> was used, it would not trigger the confirmation
  function handleDelete() {
    const proceed = window.confirm(
      `You are about to delete event "${event.title}". Confirm to proceed.`
    );
    if (proceed) {
      // activates on the current path
      submit(null, { method: "delete" });
      dispatch(removeEvent());
    }
  }

  return (
    <article className={classes.event}>
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
            <button onClick={handleDelete}>Delete</button>
          </menu>
        )}
      </div>
      {data && data.error && <p className={classes.errors}> {data.message}</p>}
    </article>
  );
}
