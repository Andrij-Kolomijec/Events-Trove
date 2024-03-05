import { useFetcher } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Newsletter() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
      emailRef.current!.value = "";
    } else if (state === "idle" && data && data.error) {
      window.alert(data.error);
    }
  }, [data, state]);

  return (
    <fetcher.Form method="post" action="/newsletter">
      <input
        ref={emailRef}
        id="newsletter"
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
