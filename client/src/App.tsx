import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import MainLayout from "./components/MainLayout";
import ErrorPage from "./routes/ErrorPage";
import Events, { loader as eventsLoader } from "./routes/Events";
import Newsletter from "./routes/Newsletter";
import EventsLayout from "./components/EventsLayout";
import EventDetails, {
  loader as eventDetailLoader,
} from "./routes/EventDetails";
import EditEvent from "./routes/EditEvent";
import NewEvent from "./routes/NewEvent";

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
              },
              {
                path: "edit",
                element: <EditEvent />,
              },
            ],
          },
          {
            path: "new",
            element: <NewEvent />,
          },
        ],
      },
      {
        path: "newsletter",
        element: <Newsletter />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
