import WordRow from './WordRow';
import { grid } from './WordGrid.module.css';

const WordGrid = ({ infoHistory, currentGuess, turn, isValid }) => {
  return (
    <div className={grid}>
      {infoHistory.map((info, idx) => {
        if (idx === turn) {
          return <WordRow key={idx} guess={currentGuess} isValid={isValid} />;
        }
        return <WordRow key={idx} info={info} />;
      })}
    </div>
  );
};

export default WordGrid;
