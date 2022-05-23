import { useEffect, useState } from 'react';
import useGame from '../hooks/useGame';
import Keypad from './Keypad';
import Modal from './Modal';
import WordGrid from './WordGrid';
import { wordleContent } from './Wordle.module.css';

const Wordle = ({ answer, fetchWord }) => {
  const {
    turn,
    isCorrect,
    isValid,
    currentGuess,
    infoHistory,
    usedKeys,
    newGame,
    keyboardHandler,
  } = useGame(answer);

  const [showWordle, setShowWordle] = useState(false);
  const closeWordle = async () => {
    await fetchWord();
    newGame();
    setShowWordle(false);
  };
  useEffect(() => {
    window.addEventListener('keyup', keyboardHandler);
    if (isCorrect || turn > 5) {
      setShowWordle(true);
      window.removeEventListener('keyup', keyboardHandler);
    }
    return () => {
      window.removeEventListener('keyup', keyboardHandler);
    };
  }, [keyboardHandler, isCorrect, turn]);
  return (
    <>
      <WordGrid
        infoHistory={infoHistory}
        currentGuess={currentGuess}
        turn={turn}
        isValid={isValid}
      />
      <Keypad usedKeys={usedKeys} />
      {showWordle && (
        <Modal close={closeWordle}>
          <div className={wordleContent}>
            <h1>{isCorrect ? 'You win' : 'Maybe next time'}</h1>
            <p>
              The wordle is <span>"{answer}"</span>
            </p>
            <div>Click anywhere to continue</div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Wordle;
