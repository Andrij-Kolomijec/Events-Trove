import Newsletter from "../components/Newsletter";
import { type Action } from "../components/EventForm";

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
  const data = await request!.formData();
  const email = data.get("email");

  console.log(email);
  return { message: "Sign-up successful!" };
}
