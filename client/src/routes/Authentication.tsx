import {
  Form,
  Link,
  json,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import classes from "./Authentication.module.css";
import { type Action } from "../components/events/EventForm";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/Button";

export default function Authentication() {
  const data = useActionData() as { error: string };
  const navigation = useNavigation();
  const [searchParams /*, setSearchParams*/] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const email = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);

  function handleGuestLogin() {
    email.current!.value = "guest@test.org";
    pass.current!.value = import.meta.env.VITE_PORT_GUEST;
  }

  return (
    <motion.div
      // layout
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Form method="post" className={classes.authForm}>
        <div className={classes.input}>
          <label htmlFor="username">Email (username)</label>
          <input
            ref={email}
            name="email"
            id="username"
            type="email"
            autoComplete="on"
            required
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="password">Password</label>
          <input
            ref={pass}
            name="password"
            id="password"
            type="password"
            autoComplete="off"
            required
          />
        </div>
        <AnimatePresence>
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={classes.input}
            >
              <label htmlFor="passwordConfirm">Confirm password</label>
              <input
                name="passwordConfirm"
                id="passwordConfirm"
                type="password"
                autoComplete="off"
                required
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div layout className={classes.buttons}>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : isLogin ? "Log In" : "Sign Up"}
          </Button>
          <AnimatePresence>
            {isLogin && (
              <Button onClick={handleGuestLogin}>Log in as a Guest</Button>
            )}
          </AnimatePresence>
        </motion.div>
        {isLogin ? (
          <p>
            Don't have an account? <br /> Click{" "}
            <Link className="clickable" to="?mode=signup">
              here
            </Link>{" "}
            to sign up.
          </p>
        ) : (
          <p>
            Already have an account? <br /> Click{" "}
            <Link className="clickable" to="?mode=login">
              here
            </Link>{" "}
            to log in.
          </p>
        )}
      </Form>
      {data && data.error && <p className={classes.errors}> {data.error}</p>}
    </motion.div>
  );
}

type AuthData = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  passwordConfirm?: FormDataEntryValue | null;
};

export async function action({ request }: Action) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData: AuthData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode === "signup") {
    authData.passwordConfirm = data.get("passwordConfirm");
  }

  const response = await fetch(
    import.meta.env.VITE_PORT_AUTHENTICATION + mode,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    }
  );

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not authenticate user." },
      {
        status: 500,
      }
    );
  }

  const resData = await response.json();
  const token = resData.token;
  const email = resData.email;

  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/events");
}
