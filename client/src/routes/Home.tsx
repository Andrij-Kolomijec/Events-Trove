import trove from "/trove.svg";

export default function Home() {
  return (
    <div className="welcome">
      <h1>Welcome to the Events Trove!</h1>
      <p>
        Explore exciting events happening in our community and beyond. From
        cultural festivals to educational seminars, there's something for
        everyone.
      </p>
      <div>
        <h2>Sign Up to Stay in the Loop</h2>
        <p>
          Join our newsletter to receive updates on the latest events. Be the
          first to know when new events are added and stay connected with our
          vibrant community.
        </p>
      </div>
      <div>
        <h2>Enhanced Features with Login</h2>
        <p>
          By logging in, you can unlock additional features. Add, edit, and
          remove events to tailor your experience. Personalize your event
          journey and contribute to our dynamic platform.
        </p>
      </div>
      <p>Discover, engage, and create memorable experiences with us!</p>
      <img src={trove} alt="The Trove" />
    </div>
  );
}
