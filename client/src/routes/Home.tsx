import Slideshow from "../components/layout/Slideshow";
import trove from "/trove.svg";

const welcomeContent = [
  <>
    <h1>Welcome to the Events Trove!</h1>
    <p>
      Explore exciting events happening in our community and beyond. From
      cultural festivals to educational seminars, there's something for
      everyone.
    </p>
  </>,
  <>
    <h2>Subscribe to Stay in the Loop</h2>
    <p>Join our newsletter to receive updates when new events are added.</p>
  </>,
  <>
    <h2>Enhanced Features with Login</h2>
    <p>
      By logging in, you can unlock additional features - add, edit, and remove
      events.
    </p>
  </>,
];

export default function Home() {
  return (
    <>
      <div className="welcome">
        <Slideshow content={welcomeContent} />
        <img src={trove} alt="The Trove" />
      </div>
    </>
  );
}
