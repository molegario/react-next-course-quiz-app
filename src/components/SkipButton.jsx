import { useContext } from "react";
import { QuizContext } from "../context/quiz-context"; 

const SkipButton = () => {
  const {
    handleSkipAnswer,
    quizCompleted,
    answeredState,
  } = useContext(QuizContext);

  return (
    <li className="answer">
      <button
        onClick={handleSkipAnswer}
        disabled={quizCompleted || answeredState !== ""}
      >
        Skip &#62; &#62;
      </button>
    </li>
  );
};

export default SkipButton;