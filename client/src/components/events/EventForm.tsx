import {
  Form,
  Params,
  json,
  redirect,
  useActionData,
  useMatches,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./EventForm.module.css";
import { type Event } from "./EventsList";
import { useDispatch } from "react-redux";
import { addEvent } from "../../store/eventsCounterSlice";
import { getAuthToken } from "../../utils/authJWT";
import { useRef } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import Button from "../Button";

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

  const title = useRef<HTMLInputElement | null>(null);
  const date = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLTextAreaElement | null>(null);
  const [scope, animate] = useAnimate();

  // needed only to add dispatch to the submit
  const matches = useMatches();
  const dispatch = useDispatch();
  function handleSubmit() {
    if (
      !title.current!.value.trim() ||
      !date.current!.value.trim() ||
      !description.current!.value.trim()
    ) {
      animate(
        "input, textarea",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    if (!data && matches[matches.length - 1].pathname.slice(-4) !== "edit")
      dispatch(addEvent());
  }

  return (
    <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
      <Form
        ref={scope}
        method={method}
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          ref={title}
          id="title"
          type="text"
          name="title"
          // required
          defaultValue={event ? event.title : ""}
        />
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          // required
          defaultValue={event ? event.image : ""}
        />
        <label htmlFor="date">Date</label>
        <input
          ref={date}
          id="date"
          type="datetime-local"
          name="date"
          // required
          defaultValue={formattedDate}
        />
        <label htmlFor="description">Description</label>
        <textarea
          ref={description}
          id="description"
          name="description"
          rows={5}
          // required
          defaultValue={event ? event.description : ""}
        />
        <div className={classes.actions}>
          <Button type="button" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </Button>
        </div>
      </Form>
      {data && data.errors && (
        <ul className={classes.errors}>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export type Action = {
  params?: Params<"id">;
  request: {
    method: string;
    formData: () => Promise<FormData>;
    url: string;
  };
};

export async function action({ request, params }: Action) {
  const data = await request.formData();
  const method = request.method;
  const token = getAuthToken();

  const eventData = {
    title: data.get("title"),
    image:
      data.get("image") ||
      "https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg",
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
        Authorization: "Bearer " + token,
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
