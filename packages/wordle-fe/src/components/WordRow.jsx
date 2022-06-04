import {
  invalid,
  filled,
  current,
  row,
  cell,
  gray,
  green,
  yellow,
} from './WordRow.module.css';
const STATE_COLOR = [gray, green, yellow];
const WordRow = ({ info, guess, isValid }) => {
  if (info) {
    return (
      <div className={row}>
        {info.map(({ char, state }, idx) => {
          return (
            <div
              className={`${cell} ${state && STATE_COLOR[state]}`}
              key={`${char}-${idx}`}
            >
              {char}
            </div>
          );
        })}
      </div>
    );
  }

  if (guess) {
    const letters = guess.split('');
    const emptyLetters = [...Array(5 - letters.length)];
    return (
      <div className={`${row} ${current} ${isValid ? '' : invalid}`}>
        {letters.map((char, idx) => {
          return (
            <div className={`${cell} ${filled}`} key={`${char}-${idx}`}>
              {char}
            </div>
          );
        })}
        {emptyLetters.map((_, idx) => (
          <div className={cell} key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className={row}>
      <div className={cell} />
      <div className={cell} />
      <div className={cell} />
      <div className={cell} />
      <div className={cell} />
    </div>
  );
};

export default WordRow;
