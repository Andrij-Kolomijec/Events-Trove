import Newsletter from "../components/Newsletter";
import { type Action } from "../components/EventForm";
import classes from "./NewsletterPage.module.css";

export default function NewsletterPage() {
  return (
    <div className={classes.newsletter}>
      <h1>Join our newsletter!</h1>
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
