import { type Event } from "../components/EventsList";

export default function dateFormatter(eventItem: Event) {
  const formattedDate = new Date(eventItem.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formattedDate;
}
