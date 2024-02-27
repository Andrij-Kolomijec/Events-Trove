import { Await, defer, json, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import classes from "./Events.module.css";

type Event = {
  title: string;
  date: Date;
  image: string;
  description: string;
};

export default function Events() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        <div className={classes.events}>Events</div>
      </Await>
    </Suspense>
  );
}

async function loadAllEvents() {
  const response = await fetch(import.meta.env.VITE_PORT_EVENTS);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function loader() {
  return defer({
    events: loadAllEvents(),
  });
}
