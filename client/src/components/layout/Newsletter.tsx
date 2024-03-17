import { useFetcher } from "react-router-dom";
import { useRef, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import { AnimatePresence } from "framer-motion";

export default function Newsletter() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [hasSubscribed, setHasSubscribed] = useState<boolean>();

  // useEffect(() => {
  //   if (state === "idle" && data && data.message) {
  //     window.alert(data.message);
  //     emailRef.current!.value = "";
  //   } else if (state === "idle" && data && data.error) {
  //     window.alert(data.error);
  //   }
  // }, [data, state]);

  function handleOpen() {
    setHasSubscribed(true);
  }

  function handleClose() {
    setHasSubscribed(false);
    if (data.message) emailRef.current!.value = "";
  }

  return (
    <>
      <AnimatePresence>
        {state === "idle" && data && hasSubscribed && (
          <Modal title="Subscription" onClose={handleClose}>
            {data.message ? data.message : data.error}
          </Modal>
        )}
      </AnimatePresence>
      <fetcher.Form method="post" action="/newsletter">
        <input
          ref={emailRef}
          id="newsletter"
          type="email"
          name="email"
          placeholder="Subscribe for the newsletter"
          aria-label="Newsletter subscription email input"
          // required
        />
        <Button className="signupButton" onClick={handleOpen}>
          Subscribe
        </Button>
        {/* <button className="signupButton">Subscribe</button> */}
      </fetcher.Form>
    </>
  );
}
