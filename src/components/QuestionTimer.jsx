import { useEffect, useState } from "react";

const QuestionTimer = ({
  duration = 10 * 1000,
  onTimeOut = () => {},
}) => {
  const [timerRemaining, setTimeRemaining] = useState(duration);

  useEffect(
    () => {
      const timer = setTimeout(
        () => {
          onTimeOut();
        },
        duration
      );
      return () => {
        clearTimeout(timer);
      };
    },
    [onTimeOut, duration]
  );

  useEffect(
    () => {
      const intervalTimer = setInterval(
        () => {
          setTimeRemaining(
            prevTime => {
              return prevTime - 100;
            }
          );
        },
        100
      );
      return () => {
        clearInterval(intervalTimer);
      };
    },
    []
  );

  return <progress id="question-time" value={timerRemaining} max={duration} />;
};

export default QuestionTimer;