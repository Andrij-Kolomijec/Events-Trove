import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

export default function Newsletter() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form method="post" action="/newsletter">
      <input
        type="email"
        name="email"
        placeholder="Sign up for the newsletter"
        aria-label="Sign up for the newsletter"
        required
      />
      <button className="signupButton">Sign up</button>
    </fetcher.Form>
  );
}
