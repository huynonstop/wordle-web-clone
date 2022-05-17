import {RequestHandler} from 'express';
import {BadRequest} from './error/customError';
import {getRandomWord, check, CheckDTO, isWordValid} from './wordle/index';
export const getWord: RequestHandler = (req, res) => {
  const newWord = getRandomWord();
  res.json({
    word: newWord,
  });
};

export const checkAnswer: RequestHandler = (req, res, next) => {
  const {word, answer}: CheckDTO = req.query;
  if (!word || !isWordValid(word)) {
    return next(new BadRequest('INVALID_WORD'));
  }
  if (!answer) {
    return next(new BadRequest('INVALID_ANSWER'));
  }
  const [diffInfo, isFullMatch] = check(answer, word);
  res.json({
    diffInfo, isFullMatch,
  });
};
