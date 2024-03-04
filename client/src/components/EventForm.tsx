import {
  Form,
  Params,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./EventForm.module.css";
import { type Event } from "./EventsList";

type EventFormProps = {
  method: "get" | "post" | "put" | "delete" | "patch";
  event?: Event;
};

export default function EventForm({ method, event }: EventFormProps) {
  // returned from backend in case of validation error
  const data = useActionData() as { errors: string };

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function handleCancel() {
    navigate("..");
  }

  // adjust the datetime string based on the users's timezone offset
  let formattedDate;
  if (event) {
    const eventDate = new Date(event!.date);
    const clientTimezoneOffset = eventDate.getTimezoneOffset();
    const adjustedDate = new Date(
      eventDate.getTime() - clientTimezoneOffset * 60000
    );
    formattedDate = adjustedDate.toISOString().slice(0, 16);
  }

  return (
    <>
      <Form method={method} className={classes.form}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="datetime-local"
          name="date"
          required
          defaultValue={formattedDate}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={event ? event.description : ""}
        />
        <div className={classes.actions}>
          <button type="button" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
      {data && data.errors && (
        <ul className={classes.errors}>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export type Action = {
  params?: Params<"id">;
  request: { method: string; formData: () => Promise<FormData> };
};

export async function action({ request, params }: Action) {
  const data = await request.formData();
  const method = request.method;

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let id;
  if (method === "PATCH") {
    id = params!.id;
  }

  const response = await fetch(
    id
      ? import.meta.env.VITE_PORT_EVENTS + id
      : import.meta.env.VITE_PORT_EVENTS,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }
  );

  // invalid server validation
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not create event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}
