import { Link } from "react-router-dom";
import classes from "./EventsList.module.css";

export type Event = {
  _id: string;
  title: string;
  date: string;
  image: string;
  description: string;
};

export type EventsProps = {
  events: Event[];
};

export default function EventsList({ events }: EventsProps) {
  // const handleShowDetails = (fieldName) => (e) => {
  //   setState(prevState => ({
  //     ...prevState,
  //     [fieldName]: e.target.value
  //   }))
  // }

  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}></ul>
      {events.map((event: Event) => {
        return (
          <li className={classes.event} key={event._id}>
            <Link to={`/events/${event._id}`}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        );
      })}
    </div>
  );
}
