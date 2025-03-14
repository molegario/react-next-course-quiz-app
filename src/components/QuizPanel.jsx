import { useContext } from "react";
import QuestionTimer from "./QuestionTimer";
import ResultsPanel from "./ResultsPanel";
import { QuizContext } from "../context/quiz-context";

const QuizPanel = () => {
  const {
    userAnswers,
    answeredState,
    currentQuestion,
    quizCompleted,
    handleSelectAnswer,
    handleSkipAnswer,
    getClassState,
    resetQuiz,
  } = useContext(QuizContext);

  if (quizCompleted) {
    return <ResultsPanel userAnswers={userAnswers} resetQuiz={resetQuiz}/>;
  }

  return (
    <div id="quiz">
      <QuestionTimer
        key={currentQuestion.id}
        duration={10 * 1000}
        onTimeOut={() => handleSkipAnswer()}
      />
      <div id="question">
        <h2>{currentQuestion.text}</h2>
        <ul id="answers">
          {currentQuestion.answers.map((answer, idx) => (
            <li className="answer" key={`${currentQuestion.id}-${idx}`}>
              <button
                className={getClassState(answer)}
                onClick={() => handleSelectAnswer(answer)}
                disabled={quizCompleted || answeredState !== ""}
              >
                {answer}
              </button>
            </li>
          ))}
          <li className="answer">
            <button
              onClick={handleSkipAnswer}
              disabled={quizCompleted || answeredState !== ""}
            >
              Skip &#62; &#62;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default QuizPanel;