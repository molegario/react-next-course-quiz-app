import { useEffect, useState, useContext, useRef } from "react";
import { QuizContext } from "../context/quiz-context";

const QuestionTimer = ({
  duration = 10 * 1000,
}) => {
  const timerRef = useRef();
  const { handleSkipAnswer, answeredState } = useContext(QuizContext);
  const [timerRemaining, setTimeRemaining] = useState(duration);

  let timer = duration;

  if (answeredState === 'answered') {
    timer = 1000;
  }

  if (answeredState === 'answered_wrong' || answeredState === 'answered_correct') {
    timer = 2000;
  }

  useEffect(() => {
    if (timer === duration) { //only set the timeout timer if timer is at first stage (timer = duration)
      timerRef.current = setTimeout(() => handleSkipAnswer(), timer);
    } else { //reset interval timer to new timer value (stage 2 & 3)
      setTimeRemaining(timer);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined; //prevent re-clearing of timerRef.current
      }
    };
  }, [handleSkipAnswer, timer, duration]);

  useEffect(
    () => {
      const intervalTimer = setInterval(
        () => {
          setTimeRemaining(
            prevTime => {
              const newTime = prevTime - 100;
              return newTime < 0 ? 0 : newTime; //clamps countdown to 0
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

  return <progress id="question-time" value={timerRemaining} max={timer} className={answeredState !== '' ? 'answered' : undefined} />;
};

export default QuestionTimer;