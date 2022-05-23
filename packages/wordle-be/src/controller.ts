import {RequestHandler} from 'express';
import {getRandomWord, check, CheckDTO, isWordValid} from './wordle/index';
export const getWord: RequestHandler = (req, res) => {
  const newWord = getRandomWord();
  res.json({
    word: newWord,
  });
};

export const checkAnswer: RequestHandler = (req, res) => {
  const {word, answer}: CheckDTO = req.query;
  if (!word || !isWordValid(word)) {
    return res.json({
      word,
      isValid: false,
    });
  }
  if (!answer) {
    return res.json({
      word,
      isValid: true,
    });
  }
  const [diffInfo, isFullMatch] = check(answer, word);
  res.json({
    word,
    isValid: true,
    diffInfo,
    isFullMatch,
  });
};
