import {countChar} from '../utils';

export enum CharState {
  BLACK = 0,
  GREEN = 1,
  YELLOW = 2,
}

export interface DiffInfo {
  char: string
  state: CharState
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
        state: CharState.BLACK,
      };
      if (answerCount[guessChar]) {
        diffInfo.state = guessChar === answerChar ?
          CharState.GREEN :
          CharState.YELLOW,
        answerCount[guessChar] -= 1;
      }
      isFullMatch = isFullMatch && (diffInfo.state === CharState.GREEN);
      rs.push(diffInfo);
    }
    return [rs, isFullMatch];
  }
}
