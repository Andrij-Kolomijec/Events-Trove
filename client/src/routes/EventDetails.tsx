import {
  Await,
  defer,
  json,
  useRouteLoaderData,
  redirect,
} from "react-router-dom";
import classes from "./EventDetails.module.css";
import { Suspense, useState } from "react";
import { loadAllEvents } from "./Events";
import EventItem from "../components/EventItem";
import EventsList, { type Event } from "../components/EventsList";
import { type Action } from "../components/EventForm";

type RouteLoader = {
  event: Event;
  events: Event[];
};

export default function EventDetails() {
  const { event, events } = useRouteLoaderData("event-details") as RouteLoader;
  const [isEventLoaded, setIsEventLoaded] = useState(false);

  return (
    <div className={classes.events}>
      <Suspense
        fallback={
          <p className={classes.loaderLeft}>Loading selected event...</p>
        }
      >
        <Await resolve={event}>
          {(loadedEvent) => {
            setIsEventLoaded(true);
            return <EventItem event={loadedEvent} />;
          }}
        </Await>
      </Suspense>
      <Suspense
        fallback={<p className={classes.loaderRight}>Loading events...</p>}
      >
        <Await resolve={events}>
          {(loadedEvents) => {
            return isEventLoaded && <EventsList events={loadedEvents} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}

async function loadEvent(id: string) {
  const response = await fetch(import.meta.env.VITE_PORT_EVENTS + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export function loader({ params }: Action) {
  const id = params!.id;

  // putting await in front of event(s) below makes the whole page wait
  // also reason for <Await> usage - to resolve a promise
  return defer({
    event: loadEvent(id!),
    events: loadAllEvents(),
  });
}

export async function action({ params, request }: Action) {
  const id = params!.id;
  const response = await fetch(import.meta.env.VITE_PORT_EVENTS + id, {
    method: request!.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}
