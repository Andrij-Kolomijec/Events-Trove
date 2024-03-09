import { ReactNode, useEffect, useRef, useState } from "react";
import classes from "./Slideshow.module.css";

const delay = 5000;

type SlideshowProps = {
  content: ReactNode[];
};

export default function Slideshow({ content }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === content.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, content]);

  return (
    <div className={classes.slideshow}>
      <div
        className={classes.slideshowSlider}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {content.map((text, index) => (
          <div className={classes.slide} key={index}>
            {text}
          </div>
        ))}
      </div>

      <div className={classes.slideshowDots}>
        {content.map((_, idx) => (
          <div
            key={idx}
            className={`${classes.slideshowDot} ${
              index === idx ? classes.active : ""
            }`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
