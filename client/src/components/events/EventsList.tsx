import { NavLink, useParams } from "react-router-dom";
import classes from "./EventsList.module.css";
import dateFormatter from "../../utils/dateFormatter";

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
  const { id } = useParams();
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.length > 0 ? (
          events.map((event: Event) => {
            return (
              <li className={classes.event} key={event._id}>
                <NavLink to={`/events/${event._id}`}>
                  <div className={classes.imageContainer}>
                    <img src={event.image} alt={event.title} />
                  </div>
                  <div className={classes.content}>
                    <h2>{event.title}</h2>
                    <time>{dateFormatter(event)}</time>
                  </div>
                  {!id && (
                    <div className={classes.description}>
                      {event.description}
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })
        ) : (
          <h2>There are not any events planned, yet.</h2>
        )}
      </ul>
    </div>
  );
}
