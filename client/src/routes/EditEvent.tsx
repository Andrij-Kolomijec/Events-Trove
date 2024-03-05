import { Await, useRouteLoaderData } from "react-router-dom";
import { type Event } from "../components/events/EventsList";
import EventForm from "../components/events/EventForm";

type EventData = {
  event: Event;
};

export default function EditEvent() {
  const { event } = useRouteLoaderData("event-details") as EventData;

  return (
    <Await resolve={event}>
      {(loadedEvent) => <EventForm method="patch" event={loadedEvent} />}
    </Await>
  );
}
