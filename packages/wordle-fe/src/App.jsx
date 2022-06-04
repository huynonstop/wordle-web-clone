import { useState } from 'react';
import {
  app,
  appHeader,
  appTitle,
  htpButton,
  rcButton,
} from './App.module.css';
import HowToPlay from './components/HowToPlay';
import Modal from './components/Modal';
import Wordle from './components/Wordle';
import useAnswer from './hooks/useAnswer';
import helpIcon from './assets/icons8-help-48.png';
import Loader from './components/Loader';

const HowToPlayModal = ({ showHTP, onClose, onShow }) => {
  return (
    <>
      {showHTP && (
        <Modal close={onClose}>
          <HowToPlay />
        </Modal>
      )}
      <button className={htpButton} onClick={onShow}>
        <img src={helpIcon} alt="help-icon" />
      </button>
    </>
  );
};

function App() {
  const [{ answer, isLoading, error }, fetchWord] = useAnswer();
  const [showHTP, setShowHTP] = useState(false);
  return (
    <div className={app}>
      <header className={appHeader}>
        <div className={appTitle}>(Hello) Wordle</div>
      </header>
      {isLoading && <Loader />}
      {error && (
        <div className="flex flex-column items-center justify-center">
          <h2>Failed to connect to server</h2>
          <button onClick={fetchWord} className={rcButton}>
            Reconnect
          </button>
        </div>
      )}
      {answer && <Wordle answer={answer} fetchWord={fetchWord} />}
      <HowToPlayModal
        showHTP={showHTP}
        onShow={() => {
          setShowHTP(true);
        }}
        onClose={() => {
          setShowHTP(false);
        }}
      />
    </div>
  );
}

export default App;
