import { useEffect, useState, useContext } from "react";
import { QuizContext } from "../context/quiz-context";

const QuestionTimer = ({
  duration = 10 * 1000,
}) => {
  const { handleSkipAnswer } = useContext(QuizContext);
  const [timerRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const timer = setTimeout(() => handleSkipAnswer(), duration);
    return () => {
      clearTimeout(timer);
    };
  }, [handleSkipAnswer, duration]);

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