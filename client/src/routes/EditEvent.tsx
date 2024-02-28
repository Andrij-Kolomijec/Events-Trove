import { useRouteLoaderData } from "react-router-dom";
import { type Event } from "../components/EventsList";
import EventForm from "../components/EventForm";

type EventData = {
  event: Event;
};

export default function EditEvent() {
  const { event } = useRouteLoaderData("event-details") as EventData;

  return <EventForm method="patch" event={event} />;
}
