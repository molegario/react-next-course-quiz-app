import { createContext, useCallback, useReducer } from "react";
import QUESTIONS from "../questions";

export const QuizContext = createContext({
  questionSource: [],
  questions: [],
  userAnswers: [],
  answeredState: "",
  activeQuestionIndex: 0,
  currentQuestion: {},
  quizCompleted: false,
  handleSelectAnswer: () => {},
  handleSkipAnswer: () => {},
  getClassState: () => {},
  resetQuiz: () => {},
});

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

const quizReducer = (state, action) => {
  if (action.type === "RESET_QUIZ") {
    return {
      ...state,
      questions: getShuffledQuestions(),
      userAnswers: [],
      answeredState: "",
    };
  }

  if (action.type === "ADD_USER_ANSWER") {
    const questions = [...state.questions];
    const question = questions[action.payload.activequestionindex];
    const questionSource = QUESTIONS.find((q) => q.id === question.id);
    const result = questionSource?.answers[0] === action.payload.answer;

    return {
      ...state,
      userAnswers: [
        ...state.userAnswers,
        {
          questionId: question.id,
          answer: action.payload.answer,
          result,
        },
      ],
    };
  }

  if (action.type === "UPDATE_ANSWERED") {
    return {
      ...state,
      answeredState: action.payload.answerstatus,
    };
  }

  return { ...state };
};

const QuizContextProvider = ({ children }) => {

  const [quizState, quizStateReducer] = useReducer(quizReducer, {
    questions: getShuffledQuestions(),
    userAnswers: [],
    answeredState: "",
  });

  const activeQuestionIndex = quizState.answeredState === "" ? quizState.userAnswers.length : quizState.userAnswers.length - 1;
  const currentQuestion = quizState.questions[activeQuestionIndex];
  const quizCompleted = activeQuestionIndex === quizState.questions.length;

  const handleSelectAnswer = useCallback(
    (ans) => {
      const question = quizState.questions[activeQuestionIndex];
      const questionSource = QUESTIONS.find((q) => q.id === question.id);
      const result = questionSource?.answers[0] === ans;

      quizStateReducer({ type: "UPDATE_ANSWERED", payload: { answerstatus: "answered" } });

      quizStateReducer({
        type: "ADD_USER_ANSWER",
        payload: {
          activequestionindex: activeQuestionIndex,
          answer: ans,
        },
      });

      setTimeout(() => {
        if (result) {
          quizStateReducer({ type: "UPDATE_ANSWERED", payload: { answerstatus: "answered_correct" } });
        } else {
          quizStateReducer({ type: "UPDATE_ANSWERED", payload: { answerstatus: "answered_wrong" } });
        }

        setTimeout(() => {
          quizStateReducer({ type: "UPDATE_ANSWERED", payload: { answerstatus: "" } });
        }, 2000);

      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  const getClassState = useCallback(
    (ans) => {
      const question = quizState.questions[activeQuestionIndex];
      const qid = question.id;
      const answer = quizState.userAnswers.find((ua) => ua.questionId === qid);

      if (answer?.answer === ans) {
        if (quizState.answeredState === "answered") {
          return "selected";
        } else {
          return answer.result ? "correct" : "wrong";
        }
      }
    },
    [activeQuestionIndex, quizState.answeredState, quizState.userAnswers]
  );

  const resetQuiz = () => {
    quizStateReducer({ type: "RESET_QUIZ" });
  };

  const quizCtx = {
    questionSource: QUESTIONS,
    questions: quizState.questions,
    userAnswers: quizState.userAnswers,
    answeredState: quizState.answeredState,
    activeQuestionIndex,
    currentQuestion,
    quizCompleted,
    handleSelectAnswer,
    handleSkipAnswer,
    getClassState,
    resetQuiz,
  };

  return (
    <QuizContext.Provider value={quizCtx}>{children}</QuizContext.Provider>
  );
};

export default QuizContextProvider;