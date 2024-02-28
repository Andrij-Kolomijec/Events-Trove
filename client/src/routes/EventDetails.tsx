import {
  Await,
  defer,
  json,
  useRouteLoaderData,
  Params,
} from "react-router-dom";
import { Suspense, useState } from "react";
import { loadAllEvents } from "./Events";
import EventItem from "../components/EventItem";
import EventsList, { type Event } from "../components/EventsList";

type RouteLoader = {
  event: Event;
  events: Event[];
};

export default function EventDetails() {
  const { event, events } = useRouteLoaderData("event-details") as RouteLoader;
  const [isEventLoaded, setIsEventLoaded] = useState(false);
  console.log(event);

  return (
    <>
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>Loading selected event...</p>
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
        fallback={<p style={{ textAlign: "center" }}>Loading events...</p>}
      >
        <Await resolve={events}>
          {(loadedEvents) => {
            return isEventLoaded && <EventsList events={loadedEvents} />;
          }}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(id: string) {
  const response = await fetch(`${import.meta.env.VITE_PORT_EVENTS}/${id}`);

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

export async function loader({ params }: { params: Params<"id"> }) {
  const id = params.id;

  // putting await in front of event(s) below makes the whole page wait
  // also populates the form on edit from some reason
  return await defer({
    event: loadEvent(id!),
    events: loadAllEvents(),
  });
}
