import Newsletter from "../components/layout/Newsletter";
import { type Action } from "../components/events/EventForm";
import { json } from "react-router-dom";
import { motion } from "framer-motion";

export default function NewsletterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="newsletter"
    >
      <h1>Join our newsletter!</h1>
      <p>You will be notified when a new event is added.</p>
      <Newsletter />
    </motion.div>
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
