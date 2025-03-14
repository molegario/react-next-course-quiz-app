import QuizLogo from "../assets/quiz-logo.png";


const Header = () => {
  return <header>
    <img src={QuizLogo} alt="quiz logo" />
    <h1>ReactQuiz</h1>
  </header>;
};

export default Header;