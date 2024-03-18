import { Form, json, useActionData } from "react-router-dom";
import { Action } from "../components/events/EventForm";
import Button from "../components/Button";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import { useState } from "react";

type Data = {
  message?: string;
  error?: string;
};

export default function Unsubscribed() {
  const data = useActionData() as Data;
  const [unsubscribe, setUnsubscribe] = useState(false);

  return (
    <>
      <AnimatePresence>
        {data && unsubscribe && (
          <Modal
            title="Cancel subscription"
            onClose={() => setUnsubscribe(false)}
          >
            {data.message ? data.message : data.error}
          </Modal>
        )}
      </AnimatePresence>
      <h2 id="unsubscribed">
        To unsubscribe from the Events Trove newsletter click the button below.
        <Form method="delete">
          <Button onClick={() => setUnsubscribe(true)}>Unsubscribe</Button>
        </Form>
      </h2>
    </>
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
