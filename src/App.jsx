import Header from './components/Header';
import QuizPanel from './components/QuizPanel';
import QuizContextProvider from './context/quiz-context';

function App() {
  return (
    <>
      <Header />
      <main>
        <QuizContextProvider>
          <QuizPanel />
        </QuizContextProvider>
      </main>
    </>
  );
}

export default App;
