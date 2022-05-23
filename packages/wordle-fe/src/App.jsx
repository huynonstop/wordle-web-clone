import { useState } from 'react';
import { app, appHeader, appTitle, htpButton } from './App.module.css';
import HowToPlay from './components/HowToPlay';
import Modal from './components/Modal';
import Wordle from './components/Wordle';
import useAnswer from './hooks/useAnswer';
import helpIcon from './assets/icons8-help-48.png';

function App() {
  const [answer, fetchWord] = useAnswer();
  const [showHTP, setShowHTP] = useState(false);
  return (
    <div className={app}>
      <header className={appHeader}>
        <div className={appTitle}>(Hello) Wordle {answer}</div>
      </header>
      {answer && <Wordle answer={answer} fetchWord={fetchWord} />}
      {showHTP && (
        <Modal
          close={() => {
            setShowHTP(false);
          }}
        >
          <HowToPlay />
        </Modal>
      )}
      <button
        className={htpButton}
        onClick={() => {
          setShowHTP(true);
        }}
      >
        <img src={helpIcon} alt="help-icon" />
      </button>
    </div>
  );
}

export default App;
