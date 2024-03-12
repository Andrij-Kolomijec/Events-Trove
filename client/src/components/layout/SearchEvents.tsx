import { type Event } from "../events/EventsList";
import dateFormatter from "../../utils/dateFormatter";

type SearchEventsProps = {
  events: Event[];
  onChange: (events: Event[]) => void;
};

export default function SearchEvents({ events, onChange }: SearchEventsProps) {
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const foundEvents = events.filter(
      (event) =>
        event.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        event.description
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        dateFormatter(event).includes(e.target.value)
    );

    onChange(foundEvents);
  }

  return (
    <input
      id="searchBar"
      type="search"
      placeholder="Search events"
      onChange={handleSearch}
    />
  );
}
