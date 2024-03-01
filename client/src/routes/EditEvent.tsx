import { Await, useRouteLoaderData } from "react-router-dom";
import { type Event } from "../components/EventsList";
import EventForm from "../components/EventForm";

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
