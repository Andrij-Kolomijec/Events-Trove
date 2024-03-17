import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import classes from "./EventsList.module.css";
import dateFormatter from "../../utils/dateFormatter";
import SearchEvents from "../layout/SearchEvents";
import { motion } from "framer-motion";

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
  const [displayedEvents, setDisplayedEvents] = useState(events);

  const { id } = useParams();

  return (
    <div className={classes.events}>
      <div className={classes.header}>
        <h1>All Events</h1>
        <SearchEvents events={events} onChange={setDisplayedEvents} />
      </div>
      <motion.ul
        variants={{
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
          // hidden: { opacity: 0, y: 0 }, // not necessary
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={classes.list}
      >
        {events.length > 0 ? (
          displayedEvents.map((event: Event) => {
            return (
              <motion.li
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5 },
                  },
                }}
                exit={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
                className={classes.event}
                key={event._id}
              >
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
              </motion.li>
            );
          })
        ) : (
          <h2>There are not any events planned, yet.</h2>
        )}
      </motion.ul>
    </div>
  );
}
