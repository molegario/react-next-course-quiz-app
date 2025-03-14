import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import ResultsPanel from "./ResultsPanel";

const shuffleArray = (Arr) => {
  const newStack = [...Arr];
  let currentIndex = newStack.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    const tempValue = newStack[currentIndex];
    newStack[currentIndex] = newStack[randomIndex];
    newStack[randomIndex] = tempValue;
  }
  return newStack;
};

const getShuffledQuestions = () => {
  const shuffledQuestions = shuffleArray([...QUESTIONS]);
  const withShuffledAnswers = shuffledQuestions.map((question) => {
    const shuffledAnswers = shuffleArray(question.answers);
    return {
      ...question,
      answers: shuffledAnswers,
    };
  });
  return withShuffledAnswers;
};

const initialquestions = getShuffledQuestions();

const QuizPanel = () => {
  const [questions, setQuestions] = useState(initialquestions);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answeredState, setAnsweredState] = useState("");

  const activeQuestionIndex =
    answeredState === "" ? userAnswers.length : userAnswers.length - 1;
  const currentQuestion = questions[activeQuestionIndex];
  const quizCompleted = activeQuestionIndex === questions.length;

  const resetQuiz = () => {
    setQuestions(getShuffledQuestions());
    setUserAnswers([]);
    setAnsweredState("");
  };

  const handleSelectAnswer = useCallback(
    (ans) => {
      const question = questions[activeQuestionIndex];
      const questionSource = QUESTIONS.find((q) => q.id === question.id);
      const result = questionSource?.answers[0] === ans;

      setAnsweredState("answered");

      setUserAnswers((prevAnswers) => {
        return [
          ...prevAnswers,
          {
            questionId: question.id,
            answer: ans,
            result,
          },
        ];
      });

      setTimeout(() => {
        if (result) {
          setAnsweredState("answered_correct");
        } else {
          setAnsweredState("answered_wrong");
        }

        setTimeout(() => {
          setAnsweredState("");
        }, 2000);

      }, 1000);

    },
    [activeQuestionIndex]
  );

  const getClassState = useCallback(
    (ans) => {
      const question = questions[activeQuestionIndex];
      const qid = question.id;
      const answer = userAnswers.find((ua) => ua.questionId === qid);

      if (answer?.answer === ans) {
        if (answeredState === "answered") {
          return "selected";
        } else {
          return answer.result ? "correct" : "wrong";
        }
      } else {
        return "";
      }
    },
    [userAnswers, answeredState, activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

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