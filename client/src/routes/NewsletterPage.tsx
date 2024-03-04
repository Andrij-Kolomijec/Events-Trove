import Newsletter from "../components/Newsletter";
import { type Action } from "../components/EventForm";
import { json } from "react-router-dom";

export default function NewsletterPage() {
  return (
    <div className="newsletter">
      <h1>Join our newsletter!</h1>
      <p>You will be notified when a new event is added.</p>
      <Newsletter />
    </div>
  );
}

export async function action({ request }: Action) {
  const data = await request.formData();
  const method = request.method;

  const email = { email: data.get("email") };

  const response = await fetch(import.meta.env.VITE_PORT_NEWSLETTER, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not subscribe provided email." },
      {
        status: 500,
      }
    );
  }

  return { message: `Email ${email.email} subscribed successfully!` };
}
