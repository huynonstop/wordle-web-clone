import { useState } from 'react';
import { WORDLE_API } from '../config';

const checkWord = async (word, answer) => {
  try {
    const res = await fetch(WORDLE_API + `check?word=${word}&answer=${answer}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const useGame = (answer) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [wordHistory, setWordHistory] = useState([]);
  const [infoHistory, setInfoHistory] = useState([...Array(6)]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [usedKeys, setUsedKeys] = useState({});

  const validGuessHandler = (data) => {
    const { word, diffInfo, isFullMatch } = data;
    if (isFullMatch) {
      setIsCorrect(true);
    }
    // console.log(data);
    setInfoHistory((pre) => {
      const newHistory = [...pre];
      newHistory[turn] = diffInfo;
      return newHistory;
    });
    setWordHistory((pre) => {
      return [...pre, word];
    });
    setTurn((pre) => pre + 1);
    setUsedKeys((pre) => {
      const newUsedKeys = { ...pre };
      diffInfo.forEach(({ char, state }) => {
        const preState = newUsedKeys[char];
        if (state === 1) {
          newUsedKeys[char] = 1;
          return;
        }
        if (state === 2 && preState !== 1) {
          newUsedKeys[char] = 2;
          return;
        }
        if (state === 0 && preState !== 1 && preState !== 2) {
          newUsedKeys[char] = 0;
          return;
        }
      });
      return newUsedKeys;
    });
    setCurrentGuess('');
  };

  const keyboardHandler = async (e) => {
    setIsValid(true);
    const alphabetRegex = /^[A-Za-z]$/;
    const key = e.key;
    if (alphabetRegex.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((pre) => pre + key);
      }
      return;
    }
    if (key === 'Backspace') {
      setCurrentGuess((pre) => pre.slice(0, -1));
      return;
    }
    if (key === 'Enter') {
      if (turn > 5) {
        return;
      }
      if (wordHistory.includes(currentGuess)) {
        setIsValid(false);
        return;
      }
      const data = await checkWord(currentGuess, answer);
      if (!data.isValid) {
        setIsValid(false);
        return;
      }
      validGuessHandler(data);
      return;
    }
  };

  const newGame = () => {
    setTurn(0);
    setCurrentGuess('');
    setWordHistory([]);
    setInfoHistory([...Array(6)]);
    setIsCorrect(false);
    setIsValid(true);
    setUsedKeys({});
  };

  return {
    turn,
    isCorrect,
    usedKeys,
    isValid,
    currentGuess,
    wordHistory,
    infoHistory,
    keyboardHandler,
    newGame,
  };
};

export default useGame;
