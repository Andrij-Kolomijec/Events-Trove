import { Await, defer, json, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import EventsList, { type EventsProps } from "../components/EventsList";

export default function Events() {
  const { events } = useLoaderData() as EventsProps;

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export async function loadAllEvents() {
  const response = await fetch(import.meta.env.VITE_PORT_EVENTS);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    // without defer - just return response
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadAllEvents(),
  });
}
