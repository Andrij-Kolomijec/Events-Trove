import Footer from "../components/layout/Footer";
import trove from "/trove.svg";

export default function Home() {
  return (
    <>
      <div className="welcome">
        <h1>Welcome to the Events Trove!</h1>
        <p>
          Explore exciting events happening in our community and beyond. From
          cultural festivals to educational seminars, there's something for
          everyone.
        </p>
        <div>
          <h2>Subscribe to Stay in the Loop</h2>
          <p>
            Join our newsletter to receive updates when new events are added.
          </p>
        </div>
        <div>
          <h2>Enhanced Features with Login</h2>
          <p>
            By logging in, you can unlock additional features - add, edit, and
            remove events.
          </p>
        </div>
        <img src={trove} alt="The Trove" />
      </div>
      <Footer />
    </>
  );
}
