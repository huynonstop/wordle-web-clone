import {countChar} from './utils';

export enum Color {
  BLACK = 0,
  GREEN = 1,
  YELLOW = 2,
}

export interface DiffInfo {
  char: string
  color: Color
}

export type WordDiffInfo = DiffInfo[]

export class Ruler {
  static maxAttempt = 6;

  static checkGuessAttempt(count: number) {
    if (count >= this.maxAttempt) return false;
    return true;
  }

  static checkValidWord(words: Set<string>, guess: string) {
    return words.has(guess);
  }

  static wordDiff(answer: string, guess: string): [WordDiffInfo, boolean] {
    const answerCount = countChar(answer);
    const rs: WordDiffInfo = [];
    let isFullMatch = true;
    for (let i = 0; i < guess.length; i ++) {
      const guessChar = guess[i];
      const answerChar = answer[i];
      const diffInfo = {
        char: guessChar,
        color: Color.BLACK,
      };
      if (answerCount[guessChar]) {
        diffInfo.color = guessChar === answerChar ? Color.GREEN : Color.YELLOW,
        answerCount[guessChar] -= 1;
      }
      isFullMatch = isFullMatch && (diffInfo.color === Color.GREEN);
      rs.push(diffInfo);
    }
    return [rs, isFullMatch];
  }
}
