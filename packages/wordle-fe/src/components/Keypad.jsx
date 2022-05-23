import { useState } from 'react';
import { LETTER_LIST } from '../config';
import { key, keypad, gray, green, yellow } from './Keypad.module.css';
const STATE_COLOR = [gray, green, yellow];

const Keypad = ({ usedKeys }) => {
  const [letters, setLetters] = useState(LETTER_LIST);
  return (
    <div className={keypad}>
      {letters.map((l) => {
        const color =
          usedKeys[l.key] === undefined ? '' : STATE_COLOR[usedKeys[l.key]];
        return (
          <div className={`${key} ${color}`} key={l.key}>
            {l.key}
          </div>
        );
      })}
    </div>
  );
};
export default Keypad;
