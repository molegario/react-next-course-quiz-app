import QuizCompletedImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import { QuizContext } from "../context/quiz-context.jsx";
import { useContext } from "react"; 

const ResultsPanel = () => {
  const {
    userAnswers,
    resetQuiz
  } = useContext(QuizContext);


  const answersWithQuestions = userAnswers.map(
    ua => {
      return {
        ...ua,
        question: QUESTIONS.find(
          q => q.id === ua.questionId
        )
      };
    }
  );

  const countSkipped = (userAnswers.filter(
    (ua) => ua.answer === null
  ))?.length;
  const percentageSkipped = countSkipped ? (countSkipped / userAnswers.length) * 100 : 0;

  const countCorrect = (userAnswers.filter(
    (ua) => ua.result
  ))?.length;
  const percentageCorrect = countCorrect ? (countCorrect / userAnswers.length) * 100 : 0;

  const countIncorrect = (userAnswers.filter(
    (ua) => ua.answer !== null && !ua.result
  ))?.length;
  const percentageIncorrect = countIncorrect ? (countIncorrect / userAnswers.length) * 100 : 0;

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
