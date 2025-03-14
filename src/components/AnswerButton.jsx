import { useContext } from "react";
import { QuizContext } from "../context/quiz-context";

const AnswerButton = ({ answer }) => {
  const {
    handleSelectAnswer,
    quizCompleted,
    answeredState,
    getClassState,
  } = useContext(QuizContext);

  return (
    <li className="answer">
      <button
        className={getClassState(answer)}
        onClick={() => handleSelectAnswer(answer)}
        disabled={quizCompleted || answeredState !== ""}
      >
        {answer}
      </button>
    </li>
  );
};

export default AnswerButton;