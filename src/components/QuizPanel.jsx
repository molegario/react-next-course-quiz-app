import { useContext } from "react";
import QuestionTimer from "./QuestionTimer";
import ResultsPanel from "./ResultsPanel";
import { QuizContext } from "../context/quiz-context";
import SkipButton from "./SkipButton";
import AnswerButton from "./AnswerButton";

const QuizPanel = () => {
  const {
    currentQuestion,
    quizCompleted,
  } = useContext(QuizContext);

  if (quizCompleted) {
    return <ResultsPanel />;
  }

  return (
    <div id="quiz">
      <QuestionTimer
        key={currentQuestion.id}
        duration={10 * 1000}
      />
      <div id="question">
        <h2>{currentQuestion.text}</h2>
        <ul id="answers">
          {currentQuestion.answers.map((answer, idx) => (
            <AnswerButton answer={answer} key={`${currentQuestion.id}-${idx}`} />
          ))}
          <SkipButton />
        </ul>
      </div>
    </div>
  );
};

export default QuizPanel;