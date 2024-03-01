import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";
import { Event } from "./EventsList";

export default function EventItem({ event }: { event: Event }) {
  const submit = useSubmit();

  // if <Form> was used, it would not trigger the confirmation
  function handleDelete() {
    const proceed = window.confirm("Confirm to proceed.");
    if (proceed) {
      // activates on the current path
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </menu>
    </article>
  );
}
