import {Ruler, WordDiffInfo} from './ruler';
import {random} from './utils';

enum GameMessage {
  GAME_OVER = 'GAME_OVER',
  GAME_INVALID = 'GAME_INVALID',
  INVALID_WORD = 'INVALID_WORD',
}

const InfoColor = [
  '\x1b[0m',
  '\x1b[32m',
  '\x1b[33m',
];

export const renderWordInfo = (info: WordDiffInfo) => {
  const res:string[] = [];
  for (const {char, color} of info) {
    res.push(InfoColor[color]);
    res.push(char);
  }
  console.log(...res, '\x1b[0m');
};

export class Wordle {
  wordsSet: Set<string>;
  words: string[];
  attempt: number = 0;
  guessWords: string[] = [];
  guessInfos: WordDiffInfo[] = [];
  gameStart: boolean = false;
  answer: string | null = null;
  isWin: boolean | null = null;

  constructor(words: string[]) {
    this.words = words;
    this.wordsSet = new Set(words);
  }

  startGame() {
    this.attempt = 0;
    this.guessWords = [];
    this.guessInfos = [];
    this.gameStart = true;
    this.answer = this.selectRandomWord();
  }

  finishGame(isWin: boolean) {
    this.gameStart = false;
    this.isWin = isWin;
  }

  isRunning() {
    return this.gameStart;
  }

  getGameState() {
    return {
      attempt: this.attempt,
      guessWords: [...this.guessWords],
      isWin: !this.gameStart && this.isWin,
    };
  }

  selectRandomWord() {
    const n = this.words.length;
    const r = random(0, n);
    return this.words[r];
  }

  tryGuess(guess: string) {
    if (!this.gameStart || this.answer === null) {
      throw new Error(GameMessage.GAME_INVALID);
    }
    if (!Ruler.checkValidWord(this.wordsSet, guess)) {
      throw new Error(GameMessage.INVALID_WORD);
    }
    const [guessInfo, isFullMatch] = Ruler.wordDiff(this.answer, guess);
    this.attempt += 1;
    this.guessWords.push(guess);
    this.guessInfos.push(guessInfo);
    if (isFullMatch || !Ruler.checkGuessAttempt(this.attempt)) {
      this.finishGame(isFullMatch);
      return false;
    }
    return true;
  }
}
