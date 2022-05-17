import words from '~/words.json';
import {Ruler} from './ruler';
import {Wordle} from './wordle';

const game = new Wordle(words);
console.log('Setup game engine');

export const getRandomWord = () => {
  return game.selectRandomWord();
};
export const check = (answer: string, word: string) => {
  return Ruler.wordDiff(answer, word);
};
export const isWordValid = (word:string) => {
  return game.isValid(word);
};

export interface CheckDTO {
  answer?: string,
  word?: string
}
