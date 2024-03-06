import { useEffect } from "react";
import { Form, json, useActionData } from "react-router-dom";
import { Action } from "../components/events/EventForm";

type Data = {
  message?: string;
  error?: string;
};

export default function Unsubscribed() {
  const data = useActionData() as Data;

  useEffect(() => {
    if (data && data.message) {
      window.alert(data.message);
    } else if (data && data.error) {
      window.alert(data.error);
    }
  }, [data]);
  return (
    <h2 id="unsubscribed">
      To unsubscribe from the Events Trove newsletter click the button below.
      <Form method="delete">
        <button>Unsubscribe</button>
      </Form>
    </h2>
  );
}

export async function action({ params, request }: Action) {
  const id = params!.id;
  const response = await fetch(import.meta.env.VITE_PORT_NEWSLETTER + id, {
    method: request!.method,
  });

  if (response.status === 404) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not unsubscribe email." },
      {
        status: 500,
      }
    );
  }

  return { message: `Unsubscribed successfully!` };
}
