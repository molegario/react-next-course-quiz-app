import { useEffect, useState, useContext, useRef } from "react";
import { QuizContext } from "../context/quiz-context";

const QuestionTimer = ({
  duration = 10 * 1000,
}) => {
  const timerRef = useRef();
  const intervalRef = useRef();
  const { handleSkipAnswer, answeredState } = useContext(QuizContext);
  const [timerRemaining, setTimeRemaining] = useState(duration);

  useEffect(
    () => {
      if (answeredState !== "") {
        clearTimeout(timerRef.current);
      }
    },
    [answeredState]
  )

  useEffect(() => {
    timerRef.current = setTimeout(() => handleSkipAnswer(), duration);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [handleSkipAnswer, duration]);

  useEffect(
    () => {
      intervalRef.current = setInterval(
        () => {
          setTimeRemaining(
            prevTime => {
              const newTime = prevTime - 100;
              if(newTime <= 0) {
                clearInterval(intervalRef.current);
              }
              return newTime < 0 ? 0 : newTime;
            }
          );
        },
        100
      );
      return () => {
        clearInterval(intervalRef.current);
      };
    },
    []
  );

  return <progress id="question-time" value={timerRemaining} max={duration} />;
};

export default QuestionTimer;