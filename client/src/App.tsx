import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import MainLayout from "./components/layout/MainLayout";
import ErrorPage from "./routes/ErrorPage";
import Events, { loader as eventsLoader } from "./routes/Events";
import EventsLayout from "./components/layout/EventsLayout";
import EventDetails, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./routes/EventDetails";
import EditEvent from "./routes/EditEvent";
import NewEvent from "./routes/NewEvent";
import { action as manipulateEventAction } from "./components/events/EventForm";
import NewsletterPage, { action as subscribe } from "./routes/NewsletterPage";
import Unsubscribed, { action as unsubscribe } from "./routes/Unsubscribed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader,
          },
          {
            path: ":id",
            id: "event-details",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetails />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEvent />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEvent />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: subscribe,
      },
      {
        path: "newsletter/:id",
        element: <Unsubscribed />,
        action: unsubscribe,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
