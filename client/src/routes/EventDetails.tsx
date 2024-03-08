import {
  Await,
  defer,
  json,
  useRouteLoaderData,
  redirect,
} from "react-router-dom";
import classes from "./EventDetails.module.css";
import { Suspense } from "react";
import { loadAllEvents } from "./Events";
import EventItem from "../components/events/EventItem";
import EventsList, { type Event } from "../components/events/EventsList";
import { type Action } from "../components/events/EventForm";
import { getAuthToken } from "../utils/authJWT";

type RouteLoader = {
  event: Event;
  events: Event[];
};

export default function EventDetails() {
  const { event, events } = useRouteLoaderData("event-details") as RouteLoader;
  // const [isEventLoaded, setIsEventLoaded] = useState(false);

  return (
    <div className={classes.events}>
      <Suspense
        fallback={
          <div className={classes.loaderLeft}>
            <span className="loader"></span>
          </div>
        }
      >
        <Await resolve={event}>
          {(loadedEvent) => {
            return <EventItem event={loadedEvent} />;
          }}
        </Await>
      </Suspense>
      <Suspense
        fallback={
          <div className={classes.loaderRight}>
            <span className="loader"></span>
          </div>
        }
      >
        <Await resolve={events}>
          {(loadedEvents) => {
            return <EventsList events={loadedEvents} />;
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
  const token = getAuthToken();

  const response = await fetch(import.meta.env.VITE_PORT_EVENTS + id, {
    method: request!.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  // if (response.status === 422 || response.status === 401) {
  //   return response;
  // }

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
