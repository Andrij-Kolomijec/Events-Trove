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
import NewsletterPage, {
  action as subscribeAction,
} from "./routes/NewsletterPage";
import Unsubscribed, {
  action as unsubscribeAction,
} from "./routes/Unsubscribed";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchEventsData } from "./store/eventsActions";
import { type AppDispatch } from "./store";
import Authentication, {
  action as authenticate,
} from "./routes/Authentication";
import { action as logoutAction } from "./routes/Logout";
import { checkAuthLoader, tokenLoader } from "./utils/authJWT";
import EventsError from "./routes/EventsError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <EventsLayout />,
        errorElement: <EventsError />,
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
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEvent />,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: subscribeAction,
      },
      {
        path: "newsletter/:id",
        element: <Unsubscribed />,
        action: unsubscribeAction,
      },
      {
        path: "authentication",
        element: <Authentication />,
        action: authenticate,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  // does not load the data
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchEventsData());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
