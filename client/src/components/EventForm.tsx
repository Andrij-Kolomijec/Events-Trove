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
import { Event } from "./EventsList";

type EventFormProps = {
  method: "get" | "post" | "put" | "delete" | "patch";
  event?: Event | undefined;
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

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
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
