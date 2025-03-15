import QuizCompletedImg from "../assets/quiz-complete.png";
import { QuizContext } from "../context/quiz-context.jsx";
import { useContext } from "react"; 

const ResultsPanel = () => {
  const {
    resetQuiz,
    answersWithQuestions,
    percentageSkipped,
    percentageCorrect,
    percentageIncorrect,
  } = useContext(QuizContext);

  return (
    <>
      <div id="summary">
        <img src={QuizCompletedImg} alt="quiz completed" />
        <h2>Quiz Completed!</h2>
        <div id="summary-stats">
          <p>
            <span className="number">{percentageSkipped.toFixed(0)}%</span>
            <span className="text">skipped</span>
          </p>
          <p>
            <span className="number">{percentageCorrect.toFixed(0)}%</span>
            <span className="text">answered correctly</span>
          </p>
          <p>
            <span className="number">{percentageIncorrect.toFixed(0)}%</span>
            <span className="text">answered incorrectly</span>
          </p>
        </div>

        <ol>
          {answersWithQuestions.map((ua, idx) => (
            <li key={ua.questionId}>
              <h3>{idx + 1}</h3>
              <p className="question">
                {ua.question.text}
              </p>
              <p className={`user-answer ${ua.result ? "correct" : ua.answer === null ? "skipped" : "wrong"}`}>
                {ua.answer ?? "Skipped"}
              </p>
            </li>
          ))}
        </ol>
        <button onClick={() => resetQuiz()}>Try again</button>
      </div>
    </>
  );
};

export default ResultsPanel;
