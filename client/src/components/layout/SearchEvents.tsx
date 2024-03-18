import { type Event } from "../events/EventsList";
import dateFormatter from "../../utils/dateFormatter";
import { useRef } from "react";

type SearchEventsProps = {
  events: Event[];
  onChange: (events: Event[]) => void;
};

export default function SearchEvents({ events, onChange }: SearchEventsProps) {
  const lastChange = useRef<NodeJS.Timeout | null>();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (lastChange.current) clearTimeout(lastChange.current);

    const foundEvents = events.filter(
      (event) =>
        event.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        event.description
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        dateFormatter(event).includes(e.target.value)
    );

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      onChange(foundEvents);
    }, 500);
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
